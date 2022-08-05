import numpy as np
import noise
import pandas as pd
def generate_terrain(shape):
    print("generate_3D_terrain")
    scale = 100.0
    octaves = 6
    persistence = 0.5
    lacunarity = 2.0

    terrain = np.zeros(shape)

    for i in range(shape[0]):
        # print ("Density[{}]: {}".format(i, i))
        for j in range(shape[1]):
            for k in range(shape[2]):
                density = noise.pnoise3(i / scale,
                                        j / scale,
                                        k / scale,
                                        octaves=octaves,
                                        persistence=persistence,
                                        lacunarity=lacunarity,
                                        repeatx=1024,
                                        repeaty=1024,
                                        repeatz=1024,
                                        base=42)
                terrain[i][j][k] = density

    print ("Finishing creating terrain.")

    return terrain




x_total = 1
y_total = 6
z_total = 6
shape = (x_total, y_total, z_total)
sdf = np.zeros(shape)
# sdf = [ [ [None] * x_total ] *y_total ] *z_total
terrain = generate_terrain(shape)


def get_distance_to_NO_internal_value(point, internal_value, filter_points):
    value_of_point = terrain[point[0]][point[1]][point[2]]
    distance = None
    if internal_value[0] <= value_of_point <= internal_value[1]:
        distance_of_point = get_distance(point[0],point[1],point[2], internal_value, filter_points)
        if distance_of_point is not None and distance_of_point != 0:
            if distance_of_point < 0: # is distance of internal point to the exterior
                distance = distance_of_point - 1
            else: # is distance of external point to an internal point
                if distance_of_point == 1:
                    distance = distance_of_point - 2
                else:
                    print("get_distance_to_NO_internal_value: hubo un caso donde es MAYOR a cero y no es 1: point {} value:{}".format(point, distance_of_point))
    else:
        # print("get_distance_to_NO_internal_value: la distancia de {} es 1".format(point))
        distance = -1
        sdf[point[0]][point[1]][point[2]] = -distance
        # print("get_distance_to_NO_internal_value: sdf[{}][{}][{}] = {}".format(point[0],point[1],point[2],sdf[point[0]][point[1]][point[2]]))
    # print("get_distance_to_NO_internal_value: point: {} , distance: {}".format(point, distance))
    return distance


def get_distance_to_internal_value(point, internal_value, filter_points):
    value_of_point = terrain[point[0]][point[1]][point[2]]
    distance = None
    if internal_value[0] <= value_of_point <= internal_value[1]:
        # print("get_distance_to_internal_value: la distancia de {} es -1".format(point))
        distance = 1
        sdf[point[0]][point[1]][point[2]] = -distance
        # print("get_distance_to_internal_value: sdf[{}][{}][{}] = {}".format(point[0],point[1],point[2],sdf[point[0]][point[1]][point[2]]))
    else:
        distance_of_point = get_distance(point[0],point[1],point[2], internal_value, filter_points)
        if distance_of_point is not None and distance_of_point != 0:
            if distance_of_point < 0: # is distance of internal point to the exterior
                if distance_of_point == -1:
                    distance = distance_of_point + 2
                else:
                    print("get_distance_to_internal_value: hubo un caso donde es menor a cero y no es -1: point {} value:{}".format(point, distance_of_point))
            else: # is distance of external point to an internal point
                distance = distance_of_point + 1
    return distance




def max_set(set1, set2): # set = {([x,y,z], sdf_value), ([x,y,z], sdf_value)}
    value_set1 = next(iter(set1))
    value_set2 = next(iter(set2))
    if value_set1[1] > value_set2[1]:
        return set1
    elif value_set2[1] > value_set1[1]:
        return set2
    return set1.union(set2)

def min_set(set1, set2): # set = {([x,y,z], sdf_value), ([x,y,z], sdf_value)}
    value_set1 = next(iter(set1))
    value_set2 = next(iter(set2))
    if value_set1[1] < value_set2[1]:
        return set1
    elif value_set2[1] < value_set1[1]:
        return set2
    return set1.union(set2)

def is_internal_value(value_of_XYZ, internal_value):
    return internal_value[0] <= value_of_XYZ <= internal_value[1]

def get_distance_to_NO_internal_value(x, y, z, internal_value):
    point_sdf_internal = set() #-float("inf")
    point_sdf_external = set() # float("inf")
    distance = 1
    while True: # while  points is empty
        some_point_does_not_know_his_value = False
        for i in [x-distance, x, x+distance]:
            for j in [y-distance, y, y+distance]:
                for k in [z-distance, z, z+distance]:
                    if x_total>i>=0 and y_total>j>=0 and z_total>k>=0 and ([i,j,k] != [x,y,z]):
                        # print("pre point GET DISTANCE: {}, {}, {}".format(i, j, k))
                        sdf_value = sdf[i][j][k]

                        if sdf_value != 0 and sdf_value is not None:
                            if sdf_value < 0:
                                point_sdf_internal = max_set(point_sdf_internal, set([(i,j,k),sdf_value]))
                            else:
                                point_sdf_external = min_set(point_sdf_external, set([(i,j,k),sdf_value]))
                        else:
                            if is_internal_value(terrain[i][j][k], internal_value):
                                some_point_does_not_know_his_value = True
                            else:
                                sdf_value = -1
                                sdf[i][j][k] = sdf_value
                                point_sdf_internal = max_set(point_sdf_internal, set([(i,j,k), sdf_value]))

        # si hay alguno internal con sdf value -1 --> devolver esos puntos
        if next(iter(point_sdf_internal))[1] == -1:
            return point_sdf_internal

        if some_point_does_not_know_his_value:
            distance += 1
        else:
            return point_sdf_external


def get_distance_to_internal_value(x, y, z, internal_value):
    point_sdf_internal = set() #-float("inf")
    point_sdf_external = set() # float("inf")
    distance = 1
    while True: # while  points is empty
        some_point_does_not_know_his_value = False
        for i in [x-distance, x, x+distance]:
            for j in [y-distance, y, y+distance]:
                for k in [z-distance, z, z+distance]:
                    if x_total>i>=0 and y_total>j>=0 and z_total>k>=0 and ([i,j,k] != [x,y,z]):
                        # print("pre point GET DISTANCE: {}, {}, {}".format(i, j, k))
                        sdf_value = sdf[i][j][k]

                        if sdf_value != 0 and sdf_value is not None:
                            if sdf_value < 0:
                                point_sdf_internal = max_set(point_sdf_internal, set([(i,j,k),sdf_value]))
                            else:
                                point_sdf_external = min_set(point_sdf_external, set([(i,j,k),sdf_value]))
                        else:
                            if is_internal_value(terrain[i][j][k], internal_value):
                                sdf_value = 1
                                sdf[i][j][k] = sdf_value
                                point_sdf_external = min_set(point_sdf_external, set([(i,j,k),sdf_value]))
                            else:
                                some_point_does_not_know_his_value = True

        # si hay alguno internal con sdf value -1 --> devolver esos puntos
        if next(iter(point_sdf_external))[1] == 1:
            return point_sdf_external

        if some_point_does_not_know_his_value:
            distance += 1
        else:
            return point_sdf_internal



def get_distance(x, y, z, internal_value, filter_points = set()):
    # print("\nGET DISTANCE POINT [{},{},{}]".format(x,y,z))
    initial_sdf_value = sdf[x][y][z]
    if initial_sdf_value is not None and initial_sdf_value != 0:
        # print("la distancia de [{}, {}, {}] es {}".format(x,y,z, initial_sdf_value))
        return initial_sdf_value

    # points = set() # {([x,y,z], sdf_value), ([x,y,z], sdf_value)}

    value_of_XYZ = terrain[x][y][z]
    is_internal_value = is_internal_value(value_of_XYZ, internal_value)

    if is_internal_value:
        points = get_distance_to_NO_internal_value(x, y, z)
    else:
        points = get_distance_to_internal_value(x,y,z)





    # print("[{},{},{}] - value_of_XYZ {} - is internal value? {}".format(x, y, z, value_of_XYZ, is_internal_value))
    if points == set() and point_sdf_internal == -float("inf") and point_sdf_external == float("inf"): # points_sdf == []: # VER QUE SIGNIFICA QUE ESTA LISTA ESTE VACIA
        # SI LOS DOS POINTS SON INF SIGNIFICA QUE EL PUNTO NO SE TOCA CON NINGUN EXTERNO NI INTERNO (INGUNO A EVALUAR)
        return None
    # QUE PASA SI UNO DE LOS POINTS ES INF PERO EL OTRO NO? --> EVALUAR ESTE CASO ## evaluado (check)
    # print("filter_points: {}".format(filter_points))
    distances = []
    if is_internal_value:
        if point_sdf_external == 1:
            sdf[x][y][z] = -1
        else:
            filter_points.add((x, y, z))
            # print("filter_points: {}".format(filter_points))
            # print(new_filter_points)

            # print("is_internal_value, point_sdf_internal: {}".format(point_sdf_internal))
            # print("is_internal_value, point_sdf_external: {}".format(point_sdf_external))
            # print("is_internal_value, points: {}".format(points))
            for point in points:
                distance = get_distance_to_NO_internal_value(point, internal_value, filter_points)
                if distance == -1:
                    # print("es -1")
                    distances = [distance]
                    break
                distances.append(distance)
            # distances = list(map(
            #     lambda point: get_distance_to_NO_internal_value(point, internal_value, new_filter_points)
            #     ,points
            # ))
            internal_distances_not_None = list(filter(lambda distance: distance is not None and distance != 0, distances)) # + points_sdf
            # print("distances_not_None: {}".format(distances_not_None))
            if internal_distances_not_None == [] and point_sdf_internal == -float("inf") and point_sdf_external == float("inf"): # points_sdf == []: # VER QUE SIGNIFICA QUE ESTA LISTA ESTE VACIA
                # SI LOS DOS POINTS SON INF SIGNIFICA QUE EL PUNTO NO SE TOCA CON NINGUN EXTERNO NI INTERNO (INGUNO A EVALUAR)
                return None

            distances_around = internal_distances_not_None
            if point_sdf_internal != -float("inf"):
                distances_around += [point_sdf_internal-1]
            if point_sdf_external != float("inf"):
                distances_around += [-point_sdf_external]
            sdf[x][y][z] = max(distances_around)
    else:
        if point_sdf_internal == -1:
            sdf[x][y][z] = 1
        else:
            # print("is_external_value, point_sdf_internal: {}".format(point_sdf_internal))
            # print("is_external_value, point_sdf_external: {}".format(point_sdf_external))
            # print("is_external_value, points: {}".format(points))
            # new_filter_points = filter_points.add((x, y, z))
            filter_points.add((x, y, z))
            # print(new_filter_points)
            for point in points:
                distance = get_distance_to_internal_value(point, internal_value, filter_points)
                if distance == 1:
                    # print("es 1")
                    distances = [distance]
                    break
                distances.append(distance)
            # distances = list(map(
            #     lambda point: get_distance_to_internal_value(point, internal_value, new_filter_points)
            #     ,points
            # ))
            external_distances_not_None = list(filter(lambda distance: distance is not None and distance != 0, distances)) # + points_sdf
            # print("distances_not_None: {}".format(distances_not_None))
            if external_distances_not_None == [] and point_sdf_internal == -float("inf") and point_sdf_external == float("inf"): # points_sdf == []: # VER QUE SIGNIFICA QUE ESTA LISTA ESTE VACIA
                # SI LOS DOS POINTS SON INF SIGNIFICA QUE EL PUNTO NO SE TOCA CON NINGUN EXTERNO NI INTERNO (INGUNO A EVALUAR)
                return None

            distances_around = external_distances_not_None
            if point_sdf_internal != -float("inf"):
                distances_around += [-point_sdf_internal]
            if point_sdf_external != float("inf"):
                distances_around += [point_sdf_external+1]
            sdf[x][y][z] = min(distances_around)

    # print("get_distance: sdf[{}][{}][{}] = {}".format(x,y,z,sdf[x][y][z]))
    return sdf[x][y][z]


import time
def calculate_sdf(shape, internalValue):
    initial_time=time.time()
    # TODO: empezar de un punto random?
    for i in range(shape[0]):
        # print("se calcula la distancia de para i = {}".format(i))
        for j in range(shape[1]):
            for k in range(shape[2]):
                get_distance(i, j, k, internalValue, set())
    end_time=time.time()
    print("Calcular la sdf de una matrix tardo {} segundos para el valor interno {}".format(end_time-initial_time, internalValue))
    return sdf

#if __name__ == '__main__':
internalValues = [[0.00,0.04]] # [[0.00,0.081], [0.082,0.17], [0.18,0.27], [0.28,0.4]]
# TODO: for internalValue in internalValues save sdf
# print(sdf)
# terrain = [[[0.0, 0.03258603, 0.0618329,  0.0824457,  0.09786684],
#             [0.00326539, 0.03349958, 0.06179116, 0.08256891, 0.09873772],
#             [0.01080146, 0.03402521, 0.06090566, 0.08273219, 0.09871391],
#             [0.01496741, 0.03328978, 0.05984878, 0.08213428, 0.09722163],
#             [0.01769297, 0.03253883, 0.05857638, 0.08192541, 0.0978224 ]]]
np.save('big_terrain_50_matrix.npy', terrain)
# print(terrain)
print("Calculating SDF")
final_sdf = calculate_sdf(shape, internalValues[0])

print(final_sdf)
np.save('big_terrain_50_sdf_matrix.npy', final_sdf)