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
      "colors": [[0, 1.0, 239 / 255.0], [199 / 255.0, 234 / 255.0, 70 / 255.0],
                         [251 / 255.0, 251 / 255.0, 148 / 255.0], [159 / 255.0, 129 / 255.0, 112 / 255.0]],
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
      }
    }
    '''
    # create scene id
    id = create_id()

    shader_generated_code_file_path = shader_file_path.replace("{id}", id)
    material_generated_code_file_path = material_file_path.replace("{id}", id)
    big_terrain_from_file_data = BigTerrainToCreateData.from_input_data(scene.big_terrain_data)  # BigTerrainToCreateData(1, 64, 64.0, 100)
    final_big_terrain_data = BigTerrainToCreateData.from_input_data(scene.final_big_terrain_data)  # BigTerrainToCreateData(1, 4, 64.0, 100)
    command = CreateShaderCommand(scene, id, shader_generated_code_file_path, material_generated_code_file_path,
                                  big_terrain_from_file_data, final_big_terrain_data)
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

    return {"shader": generated_shader_file_path, "material": generated_material_file_path}


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


def _download(file_path, downloaded_filename):
    """
    Download file for given path.
    """
    return FileResponse(path = file_path, media_type='application/octet-stream',filename=downloaded_filename)


if __name__ == '__main__':
    uvicorn.run("main:app", port=8000, reload=True, access_log=False)  # http://127.0.0.1:8000
