from pydantic import BaseModel
from typing import Optional


class NewSceneFromFile(BaseModel):
    internal_values: list[list[float]]  # [[0, 1],[1,2]]
    colors: list[list[float]]  # [[1.0,1.0,1.0], [...]]
    file_path: Optional[str]
