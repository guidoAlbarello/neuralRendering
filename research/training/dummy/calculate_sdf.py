

def csv_to_dataframe(file_name):
    return pd.read_csv(file_name)


def distanceSquared3D(point, other):
#     print("Soy el proceso {}".format(os.getpid()))
    return (point[0]-other[0])**2+ (point[1]-other[1])**2 + (point[2]-other[2])**2

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

def getDistanceMejorado(x, y, z, notInternalCoords, internalCoords, realInternalValue, internalValue = [0,1], columns = ['x','y','z','lineid']):
    coords = dataframe[columns]
#     print("internalValue: {} - realInternalValue: {}".format(internalValue, realInternalValue))

    realInternalValueIsAnInternalValue = internalValue[0] <= realInternalValue <= internalValue[1]
#     print(realInternalValueIsAnInternalValue)

#     print(mp.cpu_count())
#     with mp.Pool(4) as pool:
#         distances = pool.map(
#             lambda row: distanceSquared3D((x,y,z),(float(row[columns[0]]), float(row[columns[1]]), float(row[columns[2]]))),
#             coords
#         )
#     distances = coords.apply(lambda row: distanceSquared3D((x,y,z),(float(row[columns[0]]), float(row[columns[1]]), float(row[columns[2]]))), axis=1)

    distances = coords.apply(
        lambda row:
            distanceSquared3D((x,y,z),(float(row[columns[0]]), float(row[columns[1]]), float(row[columns[2]]))), axis=1
    )

    min_distance = distances.min()
#     print("min_distance")
    if realInternalValueIsAnInternalValue:
        return -(min_distance)

#     print(min_distance)
    return min_distance

def dataframe_to_sdf(dataframe, internalValue = [0,1], columnNames = ['x','y','z','lineid']): #columns = [x, y, z, faultid, lineid]
    coords = dataframe[columnNames]
    # filtrar coords: quedarme con los distintos a internalValue
    notInternalCoords = coords[~coords[columnNames[3]].between(internalValue[0], internalValue[1])]
    # filtrar coords: quedarme con los de igual a internalValue
    internalCoords = coords[coords[columnNames[3]].between(internalValue[0], internalValue[1])]

    print (len(coords.index))
    dataframe["distance"] = coords.apply_parallel(
        lambda x: getDistanceMejorado(x[columnNames[0]], x[columnNames[1]], x[columnNames[2]], notInternalCoords, internalCoords, x[columnNames[3]], internalValue, columnNames)
        , num_processes=8
    )
    return dataframe




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




if __name__ == '__main__':
    import os
    import time
    import multiprocessing as mp
    from math import sqrt
    import pandas as pd
#     pip install multiprocesspandas
    from multiprocesspandas import applyparallel

    print("Reading dataframe")
    dataframe = csv_to_dataframe('./big_terrain_sample.csv')
#     dataframe = csv_to_dataframe('./files/warped_terrain_sdf.csv')
    print("dataframe ready")

    internalValues = [[0.00,0.081]] # [[0.00,0.081], [0.082,0.17], [0.18,0.27], [0.28,0.4]]

    print("Starting calculation")
    for index, internalValue in enumerate(internalValues):
       sdf = calculate_sdf(dataframe, internalValue)
       print("SDF calculated")
       print("saving...")
#        save_sdf(sdf, r'./files/{}_test_sdf.csv'.format(index))
       save_sdf(sdf, r'./files/{}_warped_big_terrain_sdf.csv'.format(index))
       print("finish index {}".format(index))