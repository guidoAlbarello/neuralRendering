from pydantic import BaseModel
from typing import Optional
from fastapi import Form
from typing import List
import json

def form_body(cls):
    cls.__signature__ = cls.__signature__.replace(
        parameters=[
            arg.replace(default=Form(None))
            for arg in cls.__signature__.parameters.values()
        ]
    )
    return cls


class BigTerrainData(BaseModel):
    dim_x_y_z: int
    block_width: float
    points_per_dimention: float
    max_spheres: int



@form_body
class NewSceneFromFile(BaseModel):
    name: str
    description: Optional[str]
    internal_values: Optional[List[List[float]]] # [[0, 1],[1,2]]
    colors: Optional[List[List[float]]] # [[1.0,1.0,1.0], [...]]
    big_terrain_data: BigTerrainData
    final_big_terrain_data: BigTerrainData
    subdivision_level: int

    def __init__(self, name: str, description: Optional[str], internal_values: str, colors: str, big_terrain_data: str = None, final_big_terrain_data: str = None, subdivision_level: int = 1):
        super().__init__(
            name = name,
            description = description,
            internal_values = self._parse_list_of_floats(internal_values), 
            colors = self._parse_list_of_floats(colors),
            big_terrain_data = self._parse_big_terrain_data(big_terrain_data), 
            final_big_terrain_data = self._parse_big_terrain_data(final_big_terrain_data), 
            subdivision_level=subdivision_level
        )

    def _parse_list_of_floats(self, list_of_string: List[str]): # colors = ["1.0,1.0,1.0", "..."]
        return [[float(string_to_float) for string_to_float in string.split(",")] for string in list_of_string.split("|")]
    
    def _parse_big_terrain_data(self, big_terrain: str):
        return json.loads(big_terrain, object_hook=lambda d: BigTerrainData(**d))


