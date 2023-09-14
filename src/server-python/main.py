from typing import Optional, List
from fastapi import FastAPI, BackgroundTasks, UploadFile, Depends, File
from starlette.responses import RedirectResponse
from input.newscene import NewSceneFromFile, BigTerrainData
import os
import uvicorn
from utils.shadercreator import create_shader_from_file, create_shader, CreateShaderCommand, BigTerrainToCreateData
from db.db import *
from db.models.Scene import Scene
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins
)

@app.get("/")
async def redirect():
    """
    Redirect to API documentation
    """
    return RedirectResponse(url='/docs')

@app.post("/scenes", status_code=201)
async def create(background_tasks: BackgroundTasks,
                 file: Optional[UploadFile] = File(None),
                 scene: NewSceneFromFile = Depends(NewSceneFromFile),
                 db: Session = Depends(get_db)
                 ):
    """
    Returns id of scene immediately.
    Then, file of shader and material is creating asynchronously.
    """
    '''
    Body example:
    {
      "internal_values": "0.0,0.25|0.25,0.51|0.51,0.81|0.81,1.1", // [[0.0, 0.25], [0.25, 0.51], [0.51, 0.81], [0.81, 1.1]]
      "colors": "0,1.0,0.9372559|0.78039215686274,0.917647,0.2745|0.98431372549,0.98431372549,0.58|0.6235294117647,0.5,0.4392156862745",
                 //[[0, 1.0, 0.9372559], [0.78039215686274, 0.917647, 0.2745],[0.98431372549, 0.98431372549, 0.58], [0.6235294117647, 0.5, 0.4392156862745]],
      "big_terrain_data": {
        "dim_x_y_z": 1,
        "block_width": 64.0,
        "points_per_dimention": 64.0,
        "max_spheres": 100
      },
      "final_big_terrain_data": {
        "dim_x_y_z": 1,
        "block_width": 4,
        "points_per_dimention": 64.0,
        "max_spheres": 100
      },
      "subdivision_level": 1
    }
    '''
    created_scene = Scene(name = scene.name, description = scene.description)
    db.add(created_scene)
    db.commit()

    big_terrain_from_file_data = BigTerrainToCreateData.from_input_data(scene.big_terrain_data)  # BigTerrainToCreateData(1, 64, 64.0, 100)
    final_big_terrain_data = BigTerrainToCreateData.from_input_data(scene.final_big_terrain_data)  # BigTerrainToCreateData(1, 4, 64.0, 100)
    command = CreateShaderCommand(scene, file, created_scene.id,
                                  big_terrain_from_file_data, final_big_terrain_data)
    if (file is not None):
        background_tasks.add_task(create_shader_from_file, command)
    else:
        # random BigTerrain
        background_tasks.add_task(create_shader, command)

    return {"message": "New scene is creating", "id": created_scene.id}


@app.get("/scenes/{id}")
def find_scene(id: str, db: Session = Depends(get_db)):
    """
    Returns processed data
    """
    return db.query(Scene).filter(Scene.id == id).first()

@app.get("/scenes")
def find_all_scene(db: Session = Depends(get_db)):
    """
    Returns all scenes
    """
    return db.query(Scene).all()


@app.delete('/scenes/{id}')
def delete_scene(id:str, db: Session = Depends(get_db)):
   try:
      db.query(Scene).filter(Scene.id == id).delete()
      db.commit()
   except Exception as e:
      raise Exception(e)
   return {"delete status": "success"}


if __name__ == '__main__':
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    print("¡Creación exitosa de la DB!\n")
    uvicorn.run("main:app", port=8000, reload=True, access_log=False)  # http://127.0.0.1:8000
    
