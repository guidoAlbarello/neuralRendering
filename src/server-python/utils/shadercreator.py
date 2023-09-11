from typing import Optional
from utils.bigterrain import BigTerrain
from utils.generic import csv_to_dataframe
from input.newscene import NewSceneFromFile
from input.newscene import BigTerrainData
# from io import StringIO
from io import BytesIO
import pandas as pd
from fastapi import UploadFile, Depends
from db.db import get_db, Session
from db.models.Scene import Scene, SceneStatus


class BigTerrainToCreateData:
    def __init__(self, dim_x_y_z: int, block_width: int, points_per_dimention: float, max_spheres: int):
        self.dim_x_y_z = dim_x_y_z
        self.block_width = block_width
        self.points_per_dimention = points_per_dimention
        self.max_spheres = max_spheres

    @classmethod
    def from_input_data(cls, data: BigTerrainData):
        return cls(data.dim_x_y_z, data.block_width, data.points_per_dimention, data.max_spheres)


class CreateShaderCommand:
    def __init__(self, scene: NewSceneFromFile, file: Optional[UploadFile], id: str,
                 big_terrain_from_file_data: BigTerrainToCreateData,
                 final_big_terrain_data: BigTerrainToCreateData,
                 shader_generated_code_file_path: str = None, material_generated_code_file_path: str = None,
                 model_generated_code_file_path: str = None):
        self.scene = scene
        self.file = file
        self.scene_id = id
        self.shader_generated_code_file_path = shader_generated_code_file_path
        self.material_generated_code_file_path = material_generated_code_file_path
        self.model_generated_code_file_path = model_generated_code_file_path
        self.big_terrain_from_file_data = big_terrain_from_file_data
        self.final_big_terrain_data = final_big_terrain_data


def create_shader_from_path(command: CreateShaderCommand):
    # Read file
    big_terrain_from_file = command.big_terrain_from_file_data
    print(command.big_terrain_from_file_data)
    density_cube = BigTerrain(big_terrain_from_file.dim_x_y_z, big_terrain_from_file.dim_x_y_z, big_terrain_from_file.dim_x_y_z,
                              big_terrain_from_file.block_width, big_terrain_from_file.points_per_dimention,
                              big_terrain_from_file.max_spheres, command.scene.internal_values, command.scene.colors)
    scene_df = csv_to_dataframe(command.scene.file_path)
    density_cube.terrain_octants_matrix.append([])
    density_cube.terrain_octants_matrix[0].append([])
    density_cube.terrain_octants_matrix[0][0].append(scene_df)

    # Create final big terrain
    final_big_terrain = command.final_big_terrain_data
    subdivided_terrain = BigTerrain(final_big_terrain.dim_x_y_z, final_big_terrain.dim_x_y_z, final_big_terrain.dim_x_y_z,
                                    final_big_terrain.block_width, final_big_terrain.points_per_dimention,
                                    final_big_terrain.max_spheres, command.scene.internal_values, command.scene.colors)
    subdivided_terrain.generate_from_density_cube(density_cube, command.scene.subdivision_level)
    subdivided_terrain.calculate_sdf()
    subdivided_terrain.compute_edits()
    subdivided_terrain.build_bvh()

    if command.model_generated_code_file_path is not None:
        subdivided_terrain.generate_model(command.model_generated_code_file_path)
    elif command.shader_generated_code_file_path is not None and command.material_generated_code_file_path is not None:
        # Generate shader and material
        subdivided_terrain.generate_shader_with_textures(command.shader_generated_code_file_path,
                                                     command.material_generated_code_file_path)
    else:
        subdivided_terrain.generate_model()



def create_shader_from_file(command: CreateShaderCommand):
    db = Session()
    saved_scene = db.query(Scene).filter(Scene.id == command.scene_id).first()
    saved_scene.status = SceneStatus.PROCESSING.name
    db.commit()
    # Read file
    big_terrain_from_file = command.big_terrain_from_file_data
    density_cube = BigTerrain(big_terrain_from_file.dim_x_y_z, big_terrain_from_file.dim_x_y_z, big_terrain_from_file.dim_x_y_z,
                              big_terrain_from_file.block_width, big_terrain_from_file.points_per_dimention,
                              big_terrain_from_file.max_spheres, command.scene.internal_values, command.scene.colors)

    # csv_to_dataframe
    csv_data = command.file.file.read() # .decode("utf-8")
    # csv_string_io = StringIO(csv_data)
    csv_buffer = BytesIO(csv_data)
    scene_df = pd.read_csv(csv_buffer)
    csv_buffer.close()
    command.file.file.close()

    density_cube.terrain_octants_matrix.append([])
    density_cube.terrain_octants_matrix[0].append([])
    density_cube.terrain_octants_matrix[0][0].append(scene_df)

    # Create final big terrain
    final_big_terrain = command.final_big_terrain_data
    subdivided_terrain = BigTerrain(final_big_terrain.dim_x_y_z, final_big_terrain.dim_x_y_z, final_big_terrain.dim_x_y_z,
                                    final_big_terrain.block_width, final_big_terrain.points_per_dimention,
                                    final_big_terrain.max_spheres, command.scene.internal_values, command.scene.colors)
    subdivided_terrain.generate_from_density_cube(density_cube, command.scene.subdivision_level)
    subdivided_terrain.calculate_sdf()
    subdivided_terrain.compute_edits()
    subdivided_terrain.build_bvh()

    saved_scene.status = SceneStatus.PENDING_TO_SAVE_DATA.name
    db.commit()


    if command.model_generated_code_file_path is not None:
        subdivided_terrain.generate_model(command.model_generated_code_file_path)
    elif command.shader_generated_code_file_path is not None and command.material_generated_code_file_path is not None:
        # Generate shader and material
        subdivided_terrain.generate_shader_with_textures(command.shader_generated_code_file_path,
                                                         command.material_generated_code_file_path)
    else:
        config_parameters = subdivided_terrain.generate_model()
        saved_scene.status = SceneStatus.PROCESSED.name
        saved_scene.processed_data = config_parameters
        db.commit()
        


def create_shader(command: CreateShaderCommand):
    # density_cube = BigTerrain(1,1,1,64, 64.0, 100)
    big_terrain_from_file = command.big_terrain_from_file_data
    density_cube = BigTerrain(big_terrain_from_file.dim_x_y_z, big_terrain_from_file.dim_x_y_z, big_terrain_from_file.dim_x_y_z,
                              big_terrain_from_file.block_width, big_terrain_from_file.points_per_dimention,
                              big_terrain_from_file.max_spheres, command.scene.internal_values, command.scene.colors)
    density_cube.generate_big_terrain()


    # subdivided_terrain = BigTerrain(1,1,1,4, 64.0, 100)
    final_big_terrain = command.final_big_terrain_data
    subdivided_terrain = BigTerrain(final_big_terrain.dim_x_y_z, final_big_terrain.dim_x_y_z, final_big_terrain.dim_x_y_z,
                                    final_big_terrain.block_width, final_big_terrain.points_per_dimention,
                                    final_big_terrain.max_spheres, command.scene.internal_values, command.scene.colors)

    subdivided_terrain.generate_from_density_cube(density_cube, command.scene.subdivision_level)
    subdivided_terrain.calculate_sdf()
    subdivided_terrain.compute_edits()
    subdivided_terrain.build_bvh()

    if command.model_generated_code_file_path is not None:
        subdivided_terrain.generate_model(command.model_generated_code_file_path)
    elif command.shader_generated_code_file_path is not None and command.material_generated_code_file_path is not None:
        # Generate shader and material
        subdivided_terrain.generate_shader_with_textures(command.shader_generated_code_file_path,
                                                         command.material_generated_code_file_path)
    else:
        subdivided_terrain.generate_model()
