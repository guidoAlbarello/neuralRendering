from fastapi import FastAPI, HTTPException, BackgroundTasks, UploadFile
from starlette.responses import RedirectResponse
from input.newscene import NewSceneFromFile
from utils.idcreator import create_id
from fastapi.responses import FileResponse
import os
import uvicorn
from utils.shadercreator import create_shader_from_path, create_shader_from_file, create_shader, CreateShaderCommand, BigTerrainToCreateData


app = FastAPI()

shader_file_path = "./scene-files/{id}/raymarcher.glsl"
material_file_path = "./scene-files/{id}/RaymarcherMaterial.js"
model_file_path = "./scene-files/{id}/Model.js"

@app.get("/")
async def redirect():
    """
    Redirect to API documentation
    """
    return RedirectResponse(url='/docs')

@app.post("/scenes", status_code=201)
async def create(scene: NewSceneFromFile, background_tasks: BackgroundTasks):
    """
    Returns id of scene immediately.
    Then, file of shader and material is creating asynchronously.
    """
    '''
    Body example:
    {
      "internal_values": [[0.0, 0.25], [0.25, 0.51], [0.51, 0.81], [0.81, 1.1]],
      "colors": [[0, 1.0, 0.9372559], 
                 [0.78039215686274, 0.917647, 0.2745],
                 [0.98431372549, 0.98431372549, 0.58], 
                 [0.6235294117647, 0.5, 0.4392156862745]],
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
    id = create_id()

    shader_generated_code_file_path = shader_file_path.replace("{id}", id)
    material_generated_code_file_path = material_file_path.replace("{id}", id)
    model_generated_code_file_path = model_file_path.replace("{id}", id)
    big_terrain_from_file_data = BigTerrainToCreateData.from_input_data(scene.big_terrain_data)  # BigTerrainToCreateData(1, 64, 64.0, 100)
    final_big_terrain_data = BigTerrainToCreateData.from_input_data(scene.final_big_terrain_data)  # BigTerrainToCreateData(1, 4, 64.0, 100)
    command = CreateShaderCommand(scene, id,
                                  big_terrain_from_file_data, final_big_terrain_data,
                                  shader_generated_code_file_path, material_generated_code_file_path,
                                  model_generated_code_file_path)
    if (scene.file is not None):
        background_tasks.add_task(create_shader_from_file, command)
    elif(scene.file_path is not None):
        background_tasks.add_task(create_shader_from_path, command)
    else:
        # random BigTerrain
        background_tasks.add_task(create_shader, command)

    return {"message": "New scene is creating", "id": id}


@app.get("/scenes/{id}")
def find_scene(id: str):
    """
    Returns path of file fragment shader and material if exists, else returns null
    """
    generated_shader_abs_file_path = os.path.abspath(shader_file_path.replace("{id}", id))
    generated_shader_file_path = generated_shader_abs_file_path if os.path.isfile(generated_shader_abs_file_path) else None

    generated_material_abs_file_path = os.path.abspath(material_file_path.replace("{id}", id))
    generated_material_file_path = generated_material_abs_file_path if os.path.isfile(generated_material_abs_file_path) else None

    generated_model_abs_file_path = os.path.abspath(model_file_path.replace("{id}", id))
    generated_model_file_path = generated_model_abs_file_path if os.path.isfile(generated_model_abs_file_path) else None

    return {"shader": generated_shader_file_path,
            "material": generated_material_file_path,
            "model": generated_model_file_path}


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
    uvicorn.run("main:app", port=8000, reload=True, access_log=False)  # http://127.0.0.1:8000
