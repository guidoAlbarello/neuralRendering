import pandas as pd
def csv_to_dataframe(file_name):
    return pd.read_csv(file_name)
dataframe = csv_to_dataframe('./files/warped_terrain_sdf.csv')

import numpy as np
import noise
import pandas as pd
def generate_terrain(x: int, y: int, z: int):
    print("generate_3D_terrain")
    shape = (x, y, z)
    scale = 100.0
    octaves = 6
    persistence = 0.5
    lacunarity = 2.0
    
    terrain = np.zeros(shape)

    for i in range(shape[0]):
        for j in range(shape[1]):
            for k in range(shape[2]):
                density = noise.pnoise3(i / scale,
                                        j / scale,
                                        k / scale,
                                        octaves=octaves,
                                        persistence=persistence,
                                        lacunarity=lacunarity,
                                        repeatx=1024,
                                        repeaty=1024,
                                        repeatz=1024,
                                        base=42)
                terrain[i][j][k] = density
                
                
    return terrain

import numpy as np

'''Terrain with rows of density'''
def generate_striped_terrain(x: int, y: int, z: int):
    shape = (x, y, z)
    scale = 2.0
    octaves = 6
    persistence = 0.5
    lacunarity = 2.0

    world = np.zeros(shape)

    for i in range(shape[0]):
        for j in range(shape[1]):
            for k in range(shape[2]):
                density = i
                world[i][j][k] = density

    return world

terrain = generate_terrain(20,20,20)

import matplotlib.pyplot as plt
def plot_3D(dataframe: np.ndarray, density) -> None:
    print("plot_3D")
    x = np.arange(dataframe.shape[0])[:, None, None]
    y = np.arange(dataframe.shape[1])[None, :, None]
    z = np.arange(dataframe.shape[2])[None, None, :]
    x, y, z = np.broadcast_arrays(x, y, z)

    # Creating figure fig = plt.figure(figsize=(20, 13))
    fig = plt.figure()
    ax = plt.axes(projection="3d")

    # Add x, y gridlines
    ax.grid(b=True, color='grey', linestyle='-.', linewidth=0.3, alpha=0.2)

    # Creating plot
    sctt = ax.scatter3D(x, y, z, alpha=0.8, c=density, cmap='terrain', marker='o')

    plt.title("Terrain plot")
    ax.set_xlabel('X-axis', fontweight='bold')
    ax.set_ylabel('Y-axis', fontweight='bold')
    ax.set_zlabel('Z-axis', fontweight='bold')
    fig.colorbar(sctt, ax=ax, shrink=0.5, aspect=5)

    # show plot
    plt.show()

plot_3D(terrain, terrain.ravel())

import pandas as pd
def using_multiindex(A, columns):
    scale = 0.05
    shape = A.shape
    index = pd.MultiIndex.from_product([list(map(lambda number: number * scale, range(s))) for s in shape], names=columns)
    df = pd.DataFrame(index=index).reset_index()
    df['density'] = A.ravel()
    return df

dataframe_terrain = using_multiindex(terrain, list('xyz'))

from math import sqrt


def distanceSquared3D(point, other):
    return sqrt((point[0]-other[0])**2 + (point[1]-other[1])**2 + (point[2]-other[2])**2)


def getDistance(x, y, z, realInternalValue, internalValue = [0,1], columns = ['x','y','z','lineid']):
    coords = dataframe[columns]
    #print("internalValue: {} - realInternalValue: {}".format(internalValue, realInternalValue))
    
    realInternalValueIsAnInternalValue = internalValue[0] <= realInternalValue <= internalValue[1]
    #print(realInternalValueIsAnInternalValue)
    if realInternalValueIsAnInternalValue:
        # filtrar coords: quedarme con los distintos a internalValue
        coords = coords[~coords[columns[3]].between(internalValue[0], internalValue[1])]
    else:
        # filtrar coords: quedarme con los de igual a internalValue
        coords = coords[coords[columns[3]].between(internalValue[0], internalValue[1])]
    
    distances = coords.apply(lambda row: distanceSquared3D((x,y,z),(float(row[columns[0]]), float(row[columns[1]]), float(row[columns[2]]))), axis=1)
       
    min_distance = distances.min()
    if realInternalValueIsAnInternalValue:
        return -(min_distance)
    
    #print(min_distance)
    return min_distance
        
    
def dataframe_to_sdf(dataframe, internalValue = [0,1], columns = ['x','y','z','lineid']): #columns = [x, y, z, faultid, lineid]
    dataframe["distance"] = dataframe.apply(lambda x: getDistance(x[columns[0]], x[columns[1]], x[columns[2]], x[columns[3]], internalValue, columns), axis=1)
    return dataframe

import time

def calculate_sdf(dataframe_terrain, internalValue):
    initial_time=time.time()
    columns = ['x','y', 'z', 'density']
    #dataframe = dataframe_terrain
    sdf = dataframe_to_sdf(dataframe_terrain, internalValue, columns)
    end_time=time.time()
    print("Calcularlo con 'map' tardo {} segundos para el valor interno {}".format(end_time-initial_time, internalValue))
    return sdf

def save_sdf(sdf, file_name):
    sdf.to_csv (file_name, index = False, header=True)

internalValues = [[0.00,0.081], [0.082,0.17], [0.18,0.27], [0.28,0.4]]

for index, internalValue in enumerate(internalValues):
    sdf = calculate_sdf(dataframe_terrain, internalValue)
    save_sdf(sdf, r'./files/{}_warped_terrain_sdf.csv'.format(index))

from math import sqrt

def distanceSquared3D(point, other):
    return sqrt((point[0]-other[0])**2 + (point[1]-other[1])**2 + (point[2]-other[2])**2)

def isInSphere(spheres, point):
    for sphere in spheres:
        if distanceSquared3D(point, sphere[0])< sphere[1]:
            return True
    return False

def makeSpheres(dataframe, max_spheres): #dataframe = (x,y,z,density,distance)
    coordinates_spheres = [] #[(Point,r)]
    for i in range(len(dataframe)):
        #print(i)
        distance = dataframe.iloc[i].distance
        if (distance < 0 and len(coordinates_spheres) < max_spheres):
            #print()
            coord = [dataframe.iloc[i].y, dataframe.iloc[i].x, dataframe.iloc[i].z]
            if(not isInSphere(coordinates_spheres, coord)):
                coordinates_spheres.append([coord, -distance])

    return coordinates_spheres

def generateSpheres(dataframe, max_spheres, do_loop, use_brightness_level):
    sort_dataframe = dataframe.sort_values(["distance"])#, ascending=False)
    spheresPoints = makeSpheres(sort_dataframe, max_spheres)
    # plot(circles, use_brightness_level, do_loop)
    return spheresPoints

def getValueOfIndex(array, index):
    return array[index]

def getX(array):
    return getValueOfIndex(array, 0)

def getY(array):
    return getValueOfIndex(array, 1)

def getZ(array):
    return getValueOfIndex(array, 2)

def generateShader(spheres, idx):    
    f = "float soil{0}SDF(vec3 inputPoint) {{\nreturn ".format(idx)
    sphere = spheres[0]
    x_max=1
    y_max=1
    z_max=1
    r_max=1
    prev = "sphereSDF(inputPoint, vec3({0}, {1}, {2}), {3})".format(sphere[0][0]/x_max, sphere[0][1]/y_max, sphere[0][2]/z_max, float(sphere[1]/r_max))
    if (len(spheres) > 1):
        for i in range(1,len(spheres)):
            sphere = spheres[i]
            opt = "smoothUnion(sphereSDF(inputPoint, vec3({0}, {1}, {2}), {3}), {4})".format(sphere[0][0]/x_max, sphere[0][1]/y_max, sphere[0][2]/z_max, float(sphere[1]/r_max), prev)
            prev = opt
        f += opt
    else:
        f += prev
    f += ";\n}\n\n"
    return f

finalShaderString = "float smoothUnion(float a, float b) {\n    float k = 0.1;\n float h = max( k-abs(a-b), 0.0 )/k;\nreturn min( a, b ) - h*h*k*(1.0/4.0); }\nfloat sphereSDF(vec3 p, vec3 pos, float r) { return length(pos - p) - r; }\n\n"

for i in range(len(internalValues)):
    dataframe = csv_to_dataframe(r'./files/{}_warped_terrain_sdf.csv'.format(i))
    max_number_of_spheres = 150
    spheres = generateSpheres(dataframe, max_number_of_spheres, do_loop=False, use_brightness_level=True)
    finalShaderString = finalShaderString + generateShader(spheres, i)
    print('\n \n \n')

print (finalShaderString)

text_file = open("shader.glsl", "wt")
n = text_file.write(finalShaderString)
text_file.close()