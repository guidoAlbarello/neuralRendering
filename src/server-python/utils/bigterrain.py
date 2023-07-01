from utils.generic import distance_squared_3D, generate_spheres, smooth_union, sphere_sdf, make_offset
import numpy as np
import matplotlib.pyplot as plt
import noise
import re
import pandas as pd
import os


class OctreeNode:
    def __init__(self, bounding_box, center, depth):
        self.children = []
        self.bounding_box = bounding_box
        self.center = center
        self.depth = depth
        self.sphere_data = None


class BigTerrain:
    def __init__(self, dim_x, dim_y, dim_z, block_width, points_per_dimention, max_spheres):
        # Each terrain is compound of a matrix full of terrains
        self.terrain_octants_matrix = []
        self.sdfs_per_octant_matrix = []
        self.spheres_per_octant_matrix = []
        self.block_width = block_width
        self.dim_x = dim_x
        self.dim_y = dim_y
        self.dim_z = dim_z
        self.points_per_dimention = points_per_dimention
        self.max_spheres_per_block = max_spheres
        self.internalValues = [[0.0, 0.25], [0.25, 0.51], [0.51, 0.81], [0.81, 1.1]]
        self.bvh = None
        self.bvh_depth = -1
        self.bvh_cube_position_map = {}

    def set_points_per_dimention(self, points):
        self.points_per_dimention = points

    def get_block(self, x, y, z):
        return self.terrain_octants_matrix[x][y][z]

    def get_block_hue(self, x, y, z):
        hue = [1.0, 1.0, 1.0]
        return hue

    def hash_cube(self, center):
        return "{},{},{}".format(round(center[0], 5), round(center[1], 5), round(center[2], 5))

    def generate_flat_density(self, i, j, k):
        density = 0
        height = j / float(self.block_width)
        if (height >= self.internalValues[0][0] and height < self.internalValues[0][1]):
            density = self.internalValues[0][0]
        if (height >= self.internalValues[1][0] and height < self.internalValues[1][1]):
            density = self.internalValues[1][0]
        if (height >= self.internalValues[2][0] and height < self.internalValues[2][1]):
            density = self.internalValues[2][0]
        if (height >= self.internalValues[3][0] and height < self.internalValues[3][1]):
            density = self.internalValues[3][0]
        return density

    def generate_spherical_density(self, i, j, k):
        sphere_center = [self.block_width / 2.0, self.block_width / 2.0, self.block_width / 2.0]
        point = [i, j, k]
        r = 50
        distance_squared = (point[0] - sphere_center[0]) ** 2 + (point[1] - sphere_center[1]) ** 2 + (
                    point[2] - sphere_center[2]) ** 2
        if distance_squared <= r ** 2:
            # solid sphere density
            return self.internalValues[3][0]
        else:
            # water density
            return self.internalValues[0][0]

    def generate_perlin_density(self, i, j, k):
        scale = float(self.block_width)
        return noise.pnoise3(i / scale, j / scale,
                             k / scale,
                             octaves=3,
                             persistence=0.5,
                             lacunarity=2.0,
                             repeatx=512,
                             repeaty=512,
                             repeatz=512,
                             base=42)

    def generate_density(self, i, j, k, block_idx):
        return self.generate_perlin_density(i, j, k)
        if block_idx % 8 == 0:
            return self.generate_flat_density(i, j, k)
        if block_idx % 8 == 1:
            return self.generate_spherical_density(i, j, k)
        if block_idx % 8 == 2:
            return self.internalValues[3][0]
        if block_idx % 8 == 3:
            return self.internalValues[2][0]
        if block_idx % 8 == 4:
            return self.internalValues[3][0]
        if block_idx % 8 == 5:
            return self.internalValues[0][0]
        if block_idx % 8 == 6:
            return -1
        if block_idx % 8 == 7:
            return self.internalValues[1][0]

    # TODO: Allow not complete octrees. O sea, que no todos los niveles tengan que estar completos. Lo cual es equivalente
    # a tener octantes con mas niveles de subdivisiones que otros.
    def generate_from_density_cube(self, density_cube, subdivision_level):
        self.bvh_depth = subdivision_level
        # Subdivision level starts at 0 for root node.
        # Each level of the tree splits the axix in 2, that's why we have 2 as base. The 8 children are computed by the product
        # of 2 divisions in 3 dimensions. 2 * 2 * 2 = 8 Nice :)
        divisions_per_dimention = 2 ** (subdivision_level)
        self.block_width = density_cube.block_width / float(divisions_per_dimention)

        self.dim_x = divisions_per_dimention
        self.dim_y = divisions_per_dimention
        self.dim_z = divisions_per_dimention

        self.points_per_dimention = int(density_cube.points_per_dimention / divisions_per_dimention)
        if (density_cube.points_per_dimention % divisions_per_dimention != 0):
            print("Warning: Subdivision level is not a multiple of points per dimention in original cube.")

        # First block. TODO: Refactor to not generate a big terrain before.
        density_cube_data = density_cube.terrain_octants_matrix[0][0][0]

        for i in range(self.dim_x):
            self.terrain_octants_matrix.append([])
            for j in range(self.dim_y):
                self.terrain_octants_matrix[i].append([])
                for k in range(self.dim_z):
                    cube_center = [self.block_width / 2.0 + i * self.block_width,
                                   self.block_width / 2.0 + j * self.block_width,
                                   self.block_width / 2.0 + k * self.block_width]
                    self.bvh_cube_position_map[self.hash_cube(cube_center)] = [i, j, k]
                    terrain = []
                    for x in range(self.points_per_dimention):
                        for y in range(self.points_per_dimention):
                            for z in range(self.points_per_dimention):
                                index = (z + k * self.points_per_dimention) + (
                                            y + j * self.points_per_dimention) * density_cube.points_per_dimention + (
                                                    x + i * self.points_per_dimention) * density_cube.points_per_dimention ** 2
                                point = density_cube_data.loc[index]
                                terrain.append([point['x'], point['y'], point['z'], point['density']])

                    self.terrain_octants_matrix[i][j].append(pd.DataFrame(np.array(terrain),
                                                                          columns=['x', 'y', 'z', 'density']))

    def build_bvh(self):
        # Build root node.
        box_width = 2 ** self.bvh_depth * self.block_width / 2.0
        bbox = [box_width, box_width, box_width]
        center = [box_width, box_width, box_width]
        root = OctreeNode(bbox, center, 0)

        # Build tree
        stack = []
        stack.append(root)
        while len(stack) > 0:
            # Fifo order.
            currentNode = stack.pop(0)
            if (currentNode.depth == self.bvh_depth):
                s_idx = self.bvh_cube_position_map[self.hash_cube(currentNode.center)]
                currentNode.sphere_data = self.spheres_per_octant_matrix[s_idx[0]][s_idx[1]][s_idx[2]]
                continue

            child_depth = currentNode.depth + 1
            # Generate children
            for i in range(8):
                box_width = 2 ** (self.bvh_depth - child_depth) * self.block_width / 2.0
                bbox = [box_width, box_width, box_width]

                if i == 0:
                    center = [currentNode.center[0] - box_width, currentNode.center[1] - box_width,
                              currentNode.center[2] - box_width]
                if i == 1:
                    center = [currentNode.center[0] - box_width, currentNode.center[1] - box_width,
                              currentNode.center[2] + box_width]
                if i == 2:
                    center = [currentNode.center[0] - box_width, currentNode.center[1] + box_width,
                              currentNode.center[2] - box_width]
                if i == 3:
                    center = [currentNode.center[0] - box_width, currentNode.center[1] + box_width,
                              currentNode.center[2] + box_width]
                if i == 4:
                    center = [currentNode.center[0] + box_width, currentNode.center[1] - box_width,
                              currentNode.center[2] - box_width]
                if i == 5:
                    center = [currentNode.center[0] + box_width, currentNode.center[1] - box_width,
                              currentNode.center[2] + box_width]
                if i == 6:
                    center = [currentNode.center[0] + box_width, currentNode.center[1] + box_width,
                              currentNode.center[2] - box_width]
                if i == 7:
                    center = [currentNode.center[0] + box_width, currentNode.center[1] + box_width,
                              currentNode.center[2] + box_width]

                childNode = OctreeNode(bbox, center, child_depth)
                currentNode.children.append(childNode)
                stack.append(childNode)

        # Store bvh
        self.bvh = root

    def generate_block(self, offset, block_idx):
        terrain = []
        size = float(self.block_width)
        step = size / self.points_per_dimention
        cube_discretization = np.arange(0, self.block_width, step)
        for i in cube_discretization:
            for j in cube_discretization:
                for k in cube_discretization:
                    terrain.append([i + offset['x'], j + offset['y'], k + offset['z'],
                                    self.generate_density(i, j, k, block_idx)])

        dataframe = pd.DataFrame(np.array(terrain), columns=['x', 'y', 'z', 'density'])
        return dataframe

    def generate_big_terrain(self):
        block_idx = 0
        for i in range(self.dim_x):
            self.terrain_octants_matrix.append([])
            for j in range(self.dim_y):
                self.terrain_octants_matrix[i].append([])
                for k in range(self.dim_z):
                    block = self.generate_block(
                        make_offset(i * self.block_width, j * self.block_width, k * self.block_width), block_idx)
                    self.terrain_octants_matrix[i][j].append(block)
                    block_idx = block_idx + 1

    def get_color_from_density(self, density):
        if density < 0:
            return [0.0, 0.0, 0.0]
        if (density >= self.internalValues[0][0] and density < self.internalValues[0][1]):
            return [0, 1.0, 239 / 255.0]
        if (density >= self.internalValues[1][0] and density < self.internalValues[1][1]):
            return [199 / 255.0, 234 / 255.0, 70 / 255.0]
        if (density >= self.internalValues[2][0] and density < self.internalValues[2][1]):
            return [251 / 255.0, 251 / 255.0, 148 / 255.0]
        if (density >= self.internalValues[3][0] and density < self.internalValues[3][1]):
            return [159 / 255.0, 129 / 255.0, 112 / 255.0]

    def get_neighbors(self, density_object_cube, position):
        e = density_object_cube.index[position]
        plane_size = self.block_width * self.block_width

        # Plane 1 (x == 0)
        # [x, y, z], [x,y, z+1], [x, y, z+2]
        # [x, y+1, z], [x,y+1, z+1], [x, y+1, z+2]
        # [x, y+2, z], [x,y+2, z+1], [x, y+2, z+2]

        # Plane 2 (x == 1)
        # [x+1, y, z], [x+1,y, z+1], [x+1, y, z+2]
        # [x+1, y+1, z], [x+1,y+1, z+1], [x+1, y+1, z+2]
        # [x+1, y+2, z], [x+1,y+2, z+1], [x+1, y+2, z+2]

        # Plane 3 (x == 2)
        # [x+2, y, z], [x+2,y, z+1], [x+2, y, z+2]
        # [x+2, y+1, z], [x+2,y+1, z+1], [x+2, y+1, z+2]
        # [x+2, y+2, z], [x+2,y+2, z+1], [x+2, y+2, z+2]

        all_posible_neighbors = [
            # Plane
            e - 1, e + 1,  # Left/Right
            e - 1 - self.block_width, e - self.block_width, e + 1 - self.block_width,  # Bottom
            e - 1 + self.block_width, e + self.block_width, e + 1 + self.block_width,  # Up
            # Plane - 1
            e - plane_size,  # Center
            e - 1 - plane_size, e + 1 - plane_size,  # Left/Right
            e - 1 - self.block_width - plane_size, e - self.block_width - plane_size,
            e + 1 - self.block_width - plane_size,  # Bottom
            e - 1 + self.block_width - plane_size, e + self.block_width - plane_size,
            e + 1 + self.block_width - plane_size,  # Up
            # Plane + 1
            e + plane_size,  # Center
            e - 1 + plane_size, e + 1 + plane_size,  # Left/Right
            e - 1 - self.block_width + plane_size, e - self.block_width + plane_size,
            e + 1 - self.block_width + plane_size,  # Bottom
            e - 1 + self.block_width + plane_size, e + self.block_width + plane_size,
            e + 1 + self.block_width + plane_size  # Up
        ]

        neighbors = []
        for n in all_posible_neighbors:
            if n in density_object_cube.index:
                neighbors.append([n, density_object_cube.index.get_loc(n)])

        # [[index, position_in_dataframe], ...]
        return neighbors

    def look_for_frontiers(self, density_object_cube):
        INFINITE_DISTANCE = 9999999999999
        TO_PROCESS_DISTANCE = -1
        distances = [INFINITE_DISTANCE] * len(density_object_cube)

        neighbors_per_node_cache = [[]] * len(density_object_cube)
        next_frontier_nodes_set = set()
        frontier_level = 1
        for i in range(len(density_object_cube)):
            if neighbors_per_node_cache[i] == []:
                neighbors = self.get_neighbors(density_object_cube, i)
                neighbors_per_node_cache[i] = neighbors
            else:
                neighbors = neighbors_per_node_cache[i]

            if len(neighbors) != 26:
                # If I don't have 26 neighbors then at least 1 is missing, that means I'm border.
                # Check later how to differentiate diagonal and direct neighbors for the correction factor.
                distances[i] = frontier_level
                for n in neighbors:
                    # Calculate neighbors of neighbor.
                    if neighbors_per_node_cache[n[1]] == []:
                        neighbors_of_neighbor = self.get_neighbors(density_object_cube, n[1])
                        neighbors_per_node_cache[n[1]] = neighbors_of_neighbor
                    else:
                        neighbors_of_neighbor = neighbors_per_node_cache[n[1]]

                    # Filter borders.
                    if len(neighbors_of_neighbor) != 26:
                        distances[n[1]] = frontier_level

                    # If it's a neighbor of a border, only add the ones who haven't been calculated yet.
                    if distances[n[1]] == INFINITE_DISTANCE:
                        distances[n[1]] = TO_PROCESS_DISTANCE
                        next_frontier_nodes_set.add(n[1])

        # All neighbors are computed and frontier delimited.
        # Now iterate for all of distance 2, all of distance 3 and so forth. N**3 * N/2
        # Distance column is the way to tell if the node has been computed or not.

        while True:
            frontier_level = frontier_level + 1
            current_frontier_nodes_set = next_frontier_nodes_set
            next_frontier_nodes_set = set()
            while current_frontier_nodes_set:
                i = current_frontier_nodes_set.pop()
                if neighbors_per_node_cache[i] == []:
                    neighbors = self.get_neighbors(density_object_cube, i)
                    neighbors_per_node_cache[i] = neighbors
                else:
                    neighbors = neighbors_per_node_cache[i]

                distances[i] = frontier_level
                for n in neighbors:
                    # Only add to next frontiers nodes which has infinite distance.
                    # This way we discard frontiers and TO_PROCESS nodes.
                    if distances[n[1]] == INFINITE_DISTANCE:
                        distances[n[1]] = TO_PROCESS_DISTANCE
                        next_frontier_nodes_set.add(n[1])
            if not next_frontier_nodes_set:
                break

        # Just verify that all distances are processed.
        errors = 0
        for d in distances:
            if d == INFINITE_DISTANCE or d == TO_PROCESS_DISTANCE:
                errors = errors + 1

        print("Errors: {}".format(errors))

        step = float(self.block_width) / self.points_per_dimention
        return list(map(lambda x: x * step, distances))

    def calculate_sdf_for_block(self, block):
        # For now lets assume that sdfs are conex blocks and we only have 4 internal values.
        sdf_water = block[(block.density >= self.internalValues[0][0]) & (block.density < self.internalValues[0][1])]
        sdf_grass = block[(block.density >= self.internalValues[1][0]) & (block.density < self.internalValues[1][1])]
        sdf_meadow = block[(block.density >= self.internalValues[2][0]) & (block.density < self.internalValues[2][1])]
        sdf_rock = block[(block.density >= self.internalValues[3][0]) & (block.density < self.internalValues[3][1])]

        # Calculate distances.

        sdf_water['distance'] = self.look_for_frontiers(sdf_water)
        sdf_grass['distance'] = self.look_for_frontiers(sdf_grass)
        sdf_meadow['distance'] = self.look_for_frontiers(sdf_meadow)
        sdf_rock['distance'] = self.look_for_frontiers(sdf_rock)

        return [sdf_water, sdf_grass, sdf_meadow, sdf_rock]

    def calculate_sdf(self):
        for i in range(self.dim_x):
            self.sdfs_per_octant_matrix.append([])
            for j in range(self.dim_y):
                self.sdfs_per_octant_matrix[i].append([])
                for k in range(self.dim_z):
                    self.sdfs_per_octant_matrix[i][j].append(
                        self.calculate_sdf_for_block(self.terrain_octants_matrix[i][j][k]))

    def compute_edits_for_block(self, sdfs):
        return [[generate_spheres(sdfs[0], self.max_spheres_per_block), [0, 1.0, 239 / 255.0]],
                [generate_spheres(sdfs[1], self.max_spheres_per_block), [199 / 255.0, 234 / 255.0, 70 / 255.0]],
                [generate_spheres(sdfs[2], self.max_spheres_per_block), [251 / 255.0, 251 / 255.0, 148 / 255.0]],
                [generate_spheres(sdfs[3], self.max_spheres_per_block), [159 / 255.0, 129 / 255.0, 112 / 255.0]]]

    def compute_edits(self):
        for i in range(self.dim_x):
            self.spheres_per_octant_matrix.append([])
            for j in range(self.dim_y):
                self.spheres_per_octant_matrix[i].append([])
                for k in range(self.dim_z):
                    self.spheres_per_octant_matrix[i][j].append(
                        self.compute_edits_for_block(self.sdfs_per_octant_matrix[i][j][k]))

    def get_total_spheres(self):
        total_spheres = 0
        for i in range(self.dim_x):
            for j in range(self.dim_y):
                for k in range(self.dim_z):
                    for w in range(4):
                        total_spheres = total_spheres + len(self.spheres_per_octant_matrix[i][j][k][w][0])

        return total_spheres

    def plot_edits_for_block(self, fig, all_spheres):
        for set_of_spheres in all_spheres:
            spheres = set_of_spheres[0]
            color = set_of_spheres[1]
            for sphere in spheres:
                ax = fig.gca(projection='3d')
                r = sphere[1]
                c = sphere[0]

                # draw sphere
                u, v = np.mgrid[0:2 * np.pi:50j, 0:np.pi:50j]
                x = r * np.cos(u) * np.sin(v)
                y = r * np.sin(u) * np.sin(v)
                z = r * np.cos(v)

                ax.plot_surface(x - c[0], y - c[2], z - c[1], color=color)

    def plot_edits(self):
        fig = plt.figure(figsize=(15, 15))

        for i in range(self.dim_x):
            for j in range(self.dim_y):
                for k in range(self.dim_z):
                    spheres = self.spheres_per_octant_matrix[i][j][k]
                    self.plot_edits_for_block(fig, spheres)

        # show plot
        plt.show()

    def plot_block(self, fig, ax, dataframe, block_color_hue) -> None:
        vmin = min(dataframe['density'])
        vmax = max(dataframe['density'])

        color = list(map(self.get_color_from_density, dataframe['density']))
        color = list(
            map(lambda x: [block_color_hue[0] * x[0], block_color_hue[1] * x[1], block_color_hue[2] * x[2]], color))

        # Creating plot
        sctt = ax.scatter3D(dataframe['x'], dataframe['z'], dataframe['y'], alpha=0.8, c=color,
                            norm=plt.Normalize(vmin=vmin, vmax=vmax),
                            marker='o')

        plt.title("Terrain plot")
        plt.xlim(0, self.dim_x * self.block_width)
        plt.ylim(0, self.dim_z * self.block_width)
        ax.set_zlim(0, self.dim_y * self.block_width)
        ax.set_xlabel('X-axis', fontweight='bold')
        ax.set_ylabel('Z-axis', fontweight='bold')
        ax.set_zlabel('Y-axis', fontweight='bold')

    def plot(self):
        # Creating figure fig = plt.figure(figsize=(20, 13))
        fig = plt.figure(figsize=(15, 15))
        ax = plt.axes(projection="3d")

        # Add x, y gridlines
        ax.grid(b=True, color='grey', linestyle='-.', linewidth=0.3, alpha=0.2)
        for i in range(self.dim_x):
            for j in range(self.dim_y):
                for k in range(self.dim_z):
                    dataframe = self.terrain_octants_matrix[i][j][k]
                    block_color_hue = self.get_block_hue(i, j, k)
                    self.plot_block(fig, ax, dataframe, block_color_hue)

        # show plot
        plt.show()

    def replace_parameters(self, line, config):
        match = re.search("\$\{.*\}", line)
        if match is None:
            return line
        else:
            return match.string.replace(match.group(), config[match.group()])

    def node_to_string(self, node):
        return "{{\n\t\t\tbbox:new THREE.Vector3({},{},{}),\n\t\t\tcenter: new THREE.Vector3({},{},{}),\n\t\t\tdepth: {}\n\t\t}}".format(
            node.bounding_box[0], node.bounding_box[1], node.bounding_box[2], node.center[0], node.center[1],
            node.center[2], node.depth)

    def leaf_data_to_string(self, start_sdf1, start_sdf2,
                            start_sdf3,
                            start_sdf4, end_sdf):
        return "{{\n\t\t\tstart_sdf1: {},\n\t\t\tstart_sdf2: {},\n\t\t\tstart_sdf3: {},\n\t\t\tstart_sdf4: {},\n\t\t\tend_sdf: {}\n\t\t}}".format(
            start_sdf1,
            start_sdf2,
            start_sdf3,
            start_sdf4, end_sdf)

    def generate_shader_with_textures(self, shader_generated_code_file_path='./generatedCode/raymarcher.glsl',
                                      material_generated_code_file_path='./generatedCode/RaymarcherMaterial.js'):
        CONFIG_PARAMETERS_SHADER = {
            '${MAX_SPHERES_PER_OCTANT}': str(self.max_spheres_per_block),
            '${MAX_TREE_DEPTH}': str(self.bvh_depth),
            '${AMOUNT_OF_NODES_IN_TREE}': str(int((8 ** (self.bvh_depth + 1) - 1) / 7)),
            '${AMOUNT_OF_LEAVES_IN_TREE}': str(8 ** self.bvh_depth),
            '${TOTAL_SPHERES}': str(self.get_total_spheres()),
            '${SDF1_COLOR}': '0.0, 1.0, 239.0/255.0',
            '${SDF2_COLOR}': '199.0/255.0, 234.0/255.0, 70.0/255.0',
            '${SDF3_COLOR}': '251.0/255.0, 251.0/255.0, 148.0/255.0',
            '${SDF4_COLOR}': '159.0/255.0, 129.0/255.0, 112.0/255.0',
            '${SMOOTH_UNION_K}': '10.0'
        }

        with open('./templates/shaders/fragmentShaders/raymarcher_with_texture.glsl') as f:
            lines = f.readlines()
            lines_to_write = map(lambda x: self.replace_parameters(x, CONFIG_PARAMETERS_SHADER), lines)
            os.makedirs(os.path.dirname(shader_generated_code_file_path), exist_ok=True)
            with open(shader_generated_code_file_path, 'w') as fw:
                fw.writelines(lines_to_write)

        nodes = []
        leaf_data = []
        spheres = []

        stack = []
        stack.append(self.bvh)
        spheres_pointer = 0
        texture_pointer = 0
        while len(stack) > 0:
            currentNode = stack.pop(0)
            # Add nodes.
            nodes.append(self.node_to_string(currentNode))

            # Fifo order. Leaf nodes are traversed in order.
            if (currentNode.depth == self.bvh_depth):
                # Add spheres.
                start_sdf1 = spheres_pointer
                c = start_sdf1
                for s in currentNode.sphere_data[0][0]:
                    spheres.append("data[{}] = {}; data[{}] = {}; data[{}] = {}; data[{}] = {};"
                                   .format(texture_pointer, s[0][0],
                                           texture_pointer + 1, s[0][1],
                                           texture_pointer + 2, s[0][2],
                                           texture_pointer + 3, s[1]))
                    c = c + 1
                    texture_pointer += 4

                start_sdf2 = c
                for s in currentNode.sphere_data[1][0]:
                    spheres.append("data[{}] = {}; data[{}] = {}; data[{}] = {}; data[{}] = {};"
                                   .format(texture_pointer, s[0][0],
                                           texture_pointer + 1, s[0][1],
                                           texture_pointer + 2, s[0][2],
                                           texture_pointer + 3, s[1]))
                    c = c + 1
                    texture_pointer += 4

                start_sdf3 = c
                for s in currentNode.sphere_data[2][0]:  # Add slice fro msphere_pointer
                    spheres.append("data[{}] = {}; data[{}] = {}; data[{}] = {}; data[{}] = {};"
                                   .format(texture_pointer, s[0][0],
                                           texture_pointer + 1, s[0][1],
                                           texture_pointer + 2, s[0][2],
                                           texture_pointer + 3, s[1]))
                    c = c + 1
                    texture_pointer += 4

                start_sdf4 = c
                for s in currentNode.sphere_data[3][0]:
                    spheres.append("data[{}] = {}; data[{}] = {}; data[{}] = {}; data[{}] = {};"
                                   .format(texture_pointer, s[0][0],
                                           texture_pointer + 1, s[0][1],
                                           texture_pointer + 2, s[0][2],
                                           texture_pointer + 3, s[1]))
                    c = c + 1
                    texture_pointer += 4

                spheres_pointer = c

                # Generate leaf_data.
                leaf_data.append(self.leaf_data_to_string(start_sdf1,
                                                          start_sdf2,
                                                          start_sdf3,
                                                          start_sdf4, c))
            else:
                # Traverse children
                for i in range(8):
                    stack.append(currentNode.children[i])

        # Join strings.
        nodes_string = ','.join(nodes)
        leaf_data_string = ','.join(leaf_data)
        spheres_string = '\n'.join(spheres)

        CONFIG_PARAMETERS_MATERIAL = {
            '${NODES}': nodes_string,
            '${LEAF_DATA}': leaf_data_string,
            '${SPHERES_DATA}': spheres_string,
            '${TOTAL_SPHERES}': str(self.get_total_spheres())
        }

        with open('./templates/materials/RaymarcherMaterialWithTexture.js') as f:
            lines = f.readlines()
            lines_to_write = map(lambda x: self.replace_parameters(x, CONFIG_PARAMETERS_MATERIAL), lines)
            os.makedirs(os.path.dirname(material_generated_code_file_path), exist_ok=True)
            with open(material_generated_code_file_path, 'w') as fw:
                fw.writelines(lines_to_write)

    def generate_shader_with_uniform_arrays(self):
        CONFIG_PARAMETERS_SHADER = {
            '${MAX_SPHERES_PER_OCTANT}': str(self.max_spheres_per_block),
            '${MAX_TREE_DEPTH}': str(self.bvh_depth),
            '${AMOUNT_OF_NODES_IN_TREE}': str(int((8 ** (self.bvh_depth + 1) - 1) / 7)),
            '${AMOUNT_OF_LEAVES_IN_TREE}': str(8 ** self.bvh_depth),
            '${TOTAL_SPHERES}': str(self.get_total_spheres()),
            '${SDF1_COLOR}': '0.0, 1.0, 239.0/255.0',
            '${SDF2_COLOR}': '199.0/255.0, 234.0/255.0, 70.0/255.0',
            '${SDF3_COLOR}': '251.0/255.0, 251.0/255.0, 148.0/255.0',
            '${SDF4_COLOR}': '159.0/255.0, 129.0/255.0, 112.0/255.0',
            '${SMOOTH_UNION_K}': '10.0'
        }

        with open('./templates/shaders/fragmentShaders/raymarcher.glsl') as f:
            lines = f.readlines()
            lines_to_write = map(lambda x: self.replace_parameters(x, CONFIG_PARAMETERS_SHADER), lines)
            with open('./generatedCode/raymarcher.glsl', 'w') as fw:
                fw.writelines(lines_to_write)

        nodes = []
        leaf_data = []
        spheres = []

        stack = []
        stack.append(self.bvh)
        spheres_pointer = 0
        while len(stack) > 0:
            currentNode = stack.pop(0)
            # Add nodes.
            nodes.append(self.node_to_string(currentNode))

            # Fifo order. Leaf nodes are traversed in order.
            if (currentNode.depth == self.bvh_depth):
                # Add spheres.
                start_sdf1 = spheres_pointer
                c = start_sdf1
                for s in currentNode.sphere_data[0][0]:
                    spheres.append("new THREE.Vector4({}, {}, {}, {})".format(s[0][0], s[0][1], s[0][2], s[1]))
                    c = c + 1

                start_sdf2 = c
                for s in currentNode.sphere_data[1][0]:
                    spheres.append("new THREE.Vector4({}, {}, {}, {})".format(s[0][0], s[0][1], s[0][2], s[1]))
                    c = c + 1

                start_sdf3 = c
                for s in currentNode.sphere_data[2][0]:  # Add slice fro msphere_pointer
                    spheres.append("new THREE.Vector4({}, {}, {}, {})".format(s[0][0], s[0][1], s[0][2], s[1]))
                    c = c + 1

                start_sdf4 = c
                for s in currentNode.sphere_data[3][0]:
                    spheres.append("new THREE.Vector4({}, {}, {}, {})".format(s[0][0], s[0][1], s[0][2], s[1]))
                    c = c + 1

                spheres_pointer = c

                # Generate leaf_data.
                leaf_data.append(self.leaf_data_to_string(start_sdf1,
                                                          start_sdf2,
                                                          start_sdf3,
                                                          start_sdf4, c))
            else:
                # Traverse children
                for i in range(8):
                    stack.append(currentNode.children[i])

        # Join strings.
        nodes_string = ','.join(nodes)
        leaf_data_string = ','.join(leaf_data)
        spheres_string = ',\n\t\t\t'.join(spheres)

        CONFIG_PARAMETERS_MATERIAL = {
            '${NODES}': nodes_string,
            '${LEAF_DATA}': leaf_data_string,
            '${SPHERES}': spheres_string
        }

        with open('./templates/materials/RaymarcherMaterial.js') as f:
            lines = f.readlines()
            lines_to_write = map(lambda x: self.replace_parameters(x, CONFIG_PARAMETERS_MATERIAL), lines)
            with open('./generatedCode/RaymarcherMaterial.js', 'w') as fw:
                fw.writelines(lines_to_write)

    def evaluate_edits_error_per_block(self, block, i, j, k):
        s = 0
        total_points = 0
        misclassified_points = 0
        for sdf in block:
            spheres = self.spheres_per_octant_matrix[i][j][k][s][0]
            for index, point in sdf.iterrows():
                total_points = total_points + 1
                is_inside_sphere = False
                for sphere in spheres:
                    if distance_squared_3D(point, sphere[0]) < sphere[1] ** 2:
                        is_inside_sphere = True
                        break
                if not is_inside_sphere:
                    misclassified_points = misclassified_points + 1
            s = s + 1
        print("For Block [{}][{}][{}], {}/{} points where successfully classified. Error: {}%.".format(i, j, k,
                                                                                                       total_points - misclassified_points,
                                                                                                       total_points,
                                                                                                       misclassified_points / float(
                                                                                                           total_points) * 100))
        return [total_points, misclassified_points]

    def evaluate_edits_error(self):
        errors = []
        for i in range(self.dim_x):
            for j in range(self.dim_y):
                for k in range(self.dim_z):
                    block = self.sdfs_per_octant_matrix[i][j][k]
                    errors.append(self.evaluate_edits_error_per_block(block, i, j, k))
        return errors
        # for each point in octant check whether color is the same asigned. How many points classifies ok.
        # For that check that each point in spheres per octant list has the same color assigned.

    def point_is_inside_spheres_by_sdf_with_smooth_union(self, i, j, k, s, point):
        spheres = self.spheres_per_octant_matrix[i][j][k][s][0]
        dist = sphere_sdf(point, spheres[0])
        for sphere in spheres[1::]:
            dist = smooth_union(sphere_sdf(point, sphere), dist)
            if dist <= 0:
                # If dist is negative, then point is inside sphere
                # If dist is zero, then point is on the surface of the sphere
                return True
            # If dist is positive, then point is outside sphere
        return False

    def evaluate_edits_error_per_block_with_smooth_union(self, i, j, k):
        s = 0
        total_points = 0
        misclassified_points = 0
        block = self.sdfs_per_octant_matrix[i][j][k]
        for sdf in block:
            # spheres = self.spheres_per_octant_matrix[i][j][k][s][0]
            for index, point in sdf.iterrows():
                # print(point)
                total_points = total_points + 1
                spheres = self.spheres_per_octant_matrix[i][j][k][s][0]
                is_inside_sphere = self.point_is_inside_spheres_by_sdf_with_smooth_union(i, j, k, s, point)
                if not is_inside_sphere:
                    misclassified_points = misclassified_points + 1
            s = s + 1
        print("For Block [{}][{}][{}], {}/{} points where successfully classified. Error: {}%.".format(i, j, k,
                                                                                                       total_points - misclassified_points,
                                                                                                       total_points,
                                                                                                       misclassified_points / float(
                                                                                                           total_points) * 100))
        return [total_points, misclassified_points]

    def evaluate_edits_error_with_smooth_union(self):
        errors = []
        for i in range(self.dim_x):
            for j in range(self.dim_y):
                for k in range(self.dim_z):
                    # block = self.sdfs_per_octant_matrix[i][j][k]
                    errors.append(self.evaluate_edits_error_per_block_with_smooth_union(i, j, k))
        return errors
        # for each point in octant check whether color is the same asigned. How many points classifies ok.
        # For that check thateach point in spheres per octant list has the same color assigned.
