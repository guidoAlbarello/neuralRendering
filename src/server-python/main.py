from fastapi import FastAPI, HTTPException, BackgroundTasks
from input.newscene import NewSceneFromFile
from utils.idcreator import create_id
from fastapi.responses import FileResponse
import os
import uvicorn
from utils.shadercreator import create_shader, CreateShaderCommand


app = FastAPI()

shader_file_path = "./scene-files/{id}/raymarcher.glsl"
material_file_path = "./scene-files/{id}/RaymarcherMaterial.js"


@app.post("/scenes", status_code=201)
async def create(scene: NewSceneFromFile, background_tasks: BackgroundTasks):
    # create scene id
    id = create_id()
    shader_generated_code_file_path = shader_file_path.replace("{id}", id)
    material_generated_code_file_path = material_file_path.replace("{id}", id)
    command = CreateShaderCommand(scene, id, shader_generated_code_file_path, material_generated_code_file_path)
    background_tasks.add_task(create_shader, command)

    return {"message": "New scene is creating", "id": id}


@app.get("/scenes/{id}")
def find_scene(id: str):
    generated_shader_file_path = shader_file_path.replace("{id}", id)
    generated_material_file_path = material_file_path.replace("{id}", id)
    return {"shader": generated_shader_file_path, "material": generated_material_file_path}


@app.get("/scenes/{id}/shader", response_class=FileResponse)
def read_shader(id: str):
    """
    If shader was created, it is returned
    """
    #shader_file_path = "/Users/lemoncash/Documents/neuralRendering/old/research/training/dummy/FinalShaderGenerator/generatedCode/raymarcher.glsl" # f"./scene-files/{id}/raymarcher.glsl"
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
    #material_file_path = "/Users/lemoncash/Documents/neuralRendering/old/research/training/dummy/FinalShaderGenerator/generatedCode/RaymarcherMaterial.js" # f"./scene-files/{id}/raymarcher.glsl"
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
