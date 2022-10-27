import numpy as np
import noise
import pandas as pd
import time

from traitlets import Undefined
from MinDistanceFinder import MinDistanceFinder

def generate_terrain(shape, storeFile = False):
    print("generate_3D_terrain")
    scale = 100.0
    octaves = 6
    persistence = 0.5
    lacunarity = 2.0

    terrain = np.zeros(shape)

    for i in range(shape[0]):
        # print ("Density[{}]: {}".format(i, i))
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
    if (storeFile):
        fileName = 'big_terrain_{0}_{1}_{2}_matrix.npy'.format(shape[0], shape[1], shape[2] )
        print ("Creating file:" + fileName)
        np.save(fileName, terrain)
        print ("Terrain stored successfully.")

    return terrain

def calculate_sdf(terrain, shape, internalValue, storeFile = False):
    if (terrain is None):
        terrain = np.load('big_terrain_{0}_{1}_{2}_matrix.npy'.format(shape[0], shape[1], shape[2]))

    sdf = np.zeros(shape)
    distance_finder = MinDistanceFinder(terrain, sdf, internalValue)
    initial_time=time.time()
    for i in range(shape[0]):
        for j in range(shape[1]):
            for k in range(shape[2]):
                distance_finder.get_distance(i, j, k)
    end_time=time.time()
    print("Calcular la sdf de una matrix tardo {} segundos para el valor interno {}".format(end_time-initial_time, internalValue))

    if (storeFile):
        fileName = 'big_terrainset_{0}_{1}_{2}_sdf.npy'.format(shape[0], shape[1], shape[2] )
        print ("Creating file:" + fileName)
        np.save(fileName, sdf)
        print ("SDF file stored successfully.")

    return sdf