from utils.bigterrain import BigTerrain
from utils.generic import csv_to_dataframe
from input.newscene import NewSceneFromFile


class CreateShaderCommand:
    def __init__(self, scene: NewSceneFromFile, id: str,
                 shader_generated_code_file_path: str, material_generated_code_file_path: str):
        self.scene = scene
        self.scene_id = id
        self.shader_generated_code_file_path = shader_generated_code_file_path
        self.material_generated_code_file_path = material_generated_code_file_path


def create_shader(command: CreateShaderCommand):
    # Read file
    density_cube = BigTerrain(1,1,1,64, 64.0, 100)
    volcano = csv_to_dataframe(command.scene.file_path)
    density_cube.terrain_octants_matrix.append([])
    density_cube.terrain_octants_matrix[0].append([])
    density_cube.terrain_octants_matrix[0][0].append(volcano)

    # Create final big terrain
    subdivided_terrain = BigTerrain(1,1,1,4, 64.0, 100)
    subdivided_terrain.generateFromDensityCube(density_cube, 0)
    subdivided_terrain.calculateSdf()
    subdivided_terrain.computeEdits()
    subdivided_terrain.buildBVH()
    # Generate shader and material
    subdivided_terrain.generateShaderWithTextures(command.shader_generated_code_file_path, command.material_generated_code_file_path)