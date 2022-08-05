import numpy as np
import noise

def generate_terrain():
    shape = (20, 20, 20)
    scale = 5.0
    octaves = 6
    persistence = 0.5
    lacunarity = 2.0

    world = np.zeros(shape)

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
                world[i][j][k] = density

    #plot_dataframe(world)
    return world

terrain = generate_terrain()

import pandas as pd
def using_multiindex(A, columns):
    shape = A.shape
    index = pd.MultiIndex.from_product([range(s)for s in shape], names=columns)
    df = pd.DataFrame({'density': A.flatten()}, index=index).reset_index()
    return df

dataframe_terrain = using_multiindex(terrain, list('xyz'))

from math import sqrt


def distanceSquared3D(point, other):
    return sqrt((point[0]-other[0])**2 + (point[1]-other[1])**2 + (point[2]-other[2])**2)


def getDistance(x, y, z, realInternalValue, internalValue = [0,1], columns = ['x','y','z','lineid']):
    coords = dataframe[columns]
    #print("internalValue: {} - realInternalValue: {}".format(internalValue, realInternalValue))
    
    realInternalValueIsAnInternalValue = internalValue[0] <= realInternalValue <= internalValue[1]
    print(realInternalValueIsAnInternalValue)
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

initial_time=time.time()
internalValue = [0.3,0.34]#dataframe_terrain.iloc[1].density
columns = ['x','y', 'z', 'density']
dataframe = dataframe_terrain
sdf = dataframe_to_sdf(dataframe_terrain, internalValue, columns)
end_time=time.time()
print("Calcularlo con 'map' tardo {} segundos".format(end_time-initial_time))

from math import sqrt

def distanceSquared3D(point, other):
    return sqrt((point[0]-other[0])**2 + (point[1]-other[1])**2 + (point[2]-other[2])**2)

def isInSphere(spheres, point):
    for sphere in spheres:
        if distanceSquared3D(point, sphere[0])< sphere[1]:
            return True
    return False

def spheres(dataframe, max_spheres): #dataframe = (x,y,z,density,distance)
    coordinates_spheres = [] #[(Point,r)]
    for i in range(len(dataframe)):
        print(i)
        distance = dataframe.iloc[i].distance
        if (distance > 0 and len(coordinates_spheres) < max_spheres):
            print()
            coord = (dataframe.iloc[i].x, dataframe.iloc[i].y, dataframe.iloc[i].z)
            if(not isInSphere(coordinates_spheres, coord)):
                coordinates_spheres.append((coord, distance))

    return coordinates_spheres

def generateSpheres(dataframe, max_spheres, do_loop, use_brightness_level):
    spheresPoints = spheres(dataframe, max_spheres)
    # plot(circles, use_brightness_level, do_loop)
    return spheresPoints

def generateShader(circles):
    f = "float sphereSD(vec3 p, vec3 pos, float r) { return length(pos - p) - r; }\nfloat sceneSDF(vec3 inputPoint) {\nreturn "
    circle = circles[0]
    prev = "sphereSD(inputPoint, vec3({0}, {1}, {3}), {2})".format(circle[0][0], circle[0][1], float(circle[1]), circle[0][2])
    for i in range(1,len(circles)):
        circle = circles[i]
        opt = "min(sphereSD(inputPoint, vec3({0}, {1}, {4}), {2}), {3})".format(circle[0][0], circle[0][1], float(circle[1]), prev, circle[0][2])
        prev = opt
    f += opt
    f += ";\n}"
    return f

spheres = generateSpheres(dataframe, 10, do_loop=False, use_brightness_level=True)
print(generateShader(spheres))