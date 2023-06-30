from pydantic import BaseModel
from typing import Optional
from fastapi import UploadFile


class BigTerrainData(BaseModel):
    dim_x_y_z: int
    block_width: float
    points_per_dimention: float
    max_spheres: int


class NewSceneFromFile(BaseModel):
    internal_values: list[list[float]]  # [[0, 1],[1,2]]
    colors: list[list[float]]  # [[1.0,1.0,1.0], [...]]
    file_path: Optional[str]
    file: Optional[UploadFile]
    big_terrain_data: BigTerrainData
    final_big_terrain_data: BigTerrainData
