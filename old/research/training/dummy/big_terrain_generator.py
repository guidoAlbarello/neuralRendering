import pandas as pd
def csv_to_dataframe(file_name):
    return pd.read_csv(file_name)
#dataframe = csv_to_dataframe('./files/warped_terrain_sdf.csv')

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
        print ("Density[{}]: {}".format(i, i))
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

    print ("Finishing creating terrain.")

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

from numpy import genfromtxt
import os.path
if os.path.isfile('big_terrain_sample.csv'):
    print ('Loading csv...')
    terrain = genfromtxt('big_terrain_sample.csv', delimiter=',')
else:
    print ('Creating terrain...')
    terrain = generate_terrain(512, 512, 512)

import pandas as pd
def using_multiindex(A, columns):
    scale = 0.05
    shape = A.shape
    index = pd.MultiIndex.from_product([list(map(lambda number: number * scale, range(s))) for s in shape], names=columns)
    df = pd.DataFrame(index=index).reset_index()
    df['density'] = A.ravel()
    return df

print ('Creating dataframe...')
dataframe_terrain = using_multiindex(terrain, list('xyz'))

print ('Creating csv...')
dataframe_terrain.to_csv('big_terrain_sample.csv', index = False, header = True)
print ('End csv...')
from math import sqrt


def distanceSquared3D(point, other):
    return sqrt((point[0]-other[0])*2 + (point[1]-other[1])*2 + (point[2]-other[2])*2)


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

#internalValues = [[0.00,0.081], [0.082,0.17], [0.18,0.27], [0.28,0.4]]

#for index, internalValue in enumerate(internalValues):
#    sdf = calculate_sdf(dataframe_terrain, internalValue)
#    save_sdf(sdf, r'./files/{}_warped_big_terrain_sdf.csv'.format(index))