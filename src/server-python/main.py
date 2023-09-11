from typing import Optional, List
from fastapi import FastAPI, HTTPException, BackgroundTasks, UploadFile, Depends, File, Form
from starlette.responses import RedirectResponse
from input.newscene import NewSceneFromFile, BigTerrainData
from utils.idcreator import create_id
from fastapi.responses import FileResponse
import os
import uvicorn
from utils.shadercreator import create_shader_from_path, create_shader_from_file, create_shader, CreateShaderCommand, BigTerrainToCreateData
from db.db import *
from db.models.Scene import Scene


app = FastAPI()
# pip install python-multipart
# pip install -r requirements.txt

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
      "file_path": "string",
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
    # create scene id
    # id = create_id()
    created_scene = Scene(name = scene.name, description = scene.description)
    db.add(created_scene)
    db.commit()

    # shader_generated_code_file_path = shader_file_path.replace("{id}", id)
    # material_generated_code_file_path = material_file_path.replace("{id}", id)
    # model_generated_code_file_path = model_file_path.replace("{id}", id)
    big_terrain_from_file_data = BigTerrainToCreateData.from_input_data(scene.big_terrain_data)  # BigTerrainToCreateData(1, 64, 64.0, 100)
    final_big_terrain_data = BigTerrainToCreateData.from_input_data(scene.final_big_terrain_data)  # BigTerrainToCreateData(1, 4, 64.0, 100)
    command = CreateShaderCommand(scene, file, created_scene.id,
                                  big_terrain_from_file_data, final_big_terrain_data)
    if (file is not None):
        background_tasks.add_task(create_shader_from_file, command)
    elif(scene.file_path is not None):
        background_tasks.add_task(create_shader_from_path, command)
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



@app.get("/scenes/{id}/shader", response_class=FileResponse)
def read_shader(id: str):
    """
    If shader was created, it is returned
    """
    generated_shader_file_path = shader_file_path.replace("{id}", id)
    if os.path.isfile(generated_shader_file_path):
        response = download(generated_shader_file_path, "raymarcher.glsl")
        return response

    raise HTTPException(status_code=404, detail="Shader not found")


@app.get("/scenes/{id}/material", response_class=FileResponse)
def read_material(id: str):
    """
    If material was created, it is returned
    """
    generated_material_file_path = material_file_path.replace("{id}", id)
    if os.path.isfile(generated_material_file_path):
        return _download(generated_material_file_path, "RaymarcherMaterial.js")

    raise HTTPException(status_code=404, detail="Material not found")

@app.get("/scenes/{id}/model", response_class=FileResponse)
def read_material(id: str):
    """
    If model was created, it is returned
    """
    generated_model_file_path = model_file_path.replace("{id}", id)
    if os.path.isfile(generated_model_file_path):
        return _download(generated_model_file_path, "Model.js")

    raise HTTPException(status_code=404, detail="Model not found")


def _download(file_path, downloaded_filename):
    """
    Download file for given path.
    """
    return FileResponse(path = file_path, media_type='application/octet-stream',filename=downloaded_filename)


if __name__ == '__main__':
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    print("¡Creación exitosa de la DB!\n")
    uvicorn.run("main:app", port=8000, reload=True, access_log=False)  # http://127.0.0.1:8000
    
