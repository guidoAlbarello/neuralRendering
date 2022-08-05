import numpy as np
import noise
import pandas as pd
def generate_terrain(shape):
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

    return terrain



# con 11 tardo 14 seg
# con 12 tardo 24.520941019058228 segundos
# con 13 tardo 40.093600034713745 segundos
# con 14 tardo 63.02473187446594 segundos
# con 15 tardo 96.49892687797546 segundos

x_total = 1
y_total = 20
z_total = 20
shape = (x_total, y_total, z_total)
sdf = np.zeros(shape)
# sdf = [ [ [None] * x_total ] *y_total ] *z_total
terrain = generate_terrain(shape)


# def get_distance_to_NO_internal_value(x, y, z, internal_value):
#     value_of_point = terrain[x][y][z]
#     distance = None
#     if internal_value[0] <= value_of_point <= internal_value[1]:
#         distance_of_point = get_distance(x, y, z, internal_value)
#         if distance_of_point is not None and distance_of_point != 0:
#             if distance_of_point < 0: # is distance of internal point to the exterior
#                 distance = distance_of_point - 1
#             else: # is distance of external point to an internal point
#                 if distance_of_point == 1:
#                     distance = distance_of_point - 2
#                 else:
#                     print("get_distance_to_NO_internal_value: hubo un caso donde es MAYOR a cero y no es 1: point {} value:{}".format([x,y,z], distance_of_point))
#     else:
#         # print("get_distance_to_NO_internal_value: la distancia de {} es 1".format(point))
#         distance = -1
#         sdf[x][y][z] = -distance
#         # print("get_distance_to_NO_internal_value: sdf[{}][{}][{}] = {}".format(point[0],point[1],point[2],sdf[point[0]][point[1]][point[2]]))
#     # print("get_distance_to_NO_internal_value: point: {} , distance: {}".format(point, distance))
#     return distance
#
#
# def get_distance_to_internal_value(x, y, z, internal_value):
#     value_of_point = terrain[x][y][z]
#     distance = None
#     if internal_value[0] <= value_of_point <= internal_value[1]:
#         # print("get_distance_to_internal_value: la distancia de {} es -1".format(point))
#         distance = 1
#         sdf[x][y][z] = -distance
#         # print("get_distance_to_internal_value: sdf[{}][{}][{}] = {}".format(point[0],point[1],point[2],sdf[point[0]][point[1]][point[2]]))
#     else:
#         distance_of_point = get_distance(x, y, z, internal_value)
#         if distance_of_point is not None and distance_of_point != 0:
#             if distance_of_point < 0: # is distance of internal point to the exterior
#                 if distance_of_point == -1:
#                     distance = distance_of_point + 2
#                 else:
#                     print("get_distance_to_internal_value: hubo un caso donde es menor a cero y no es -1: point {} value:{}".format([x,y,z], distance_of_point))
#             else: # is distance of external point to an internal point
#                 distance = distance_of_point + 1
#     return distance




def max_set(set1, set2): # set = {([x,y,z], sdf_value), ([x,y,z], sdf_value)}
    if set1 == set():
        return set2
    if set2 == set():
        return set1

    # print("max_set. Set 1: {} - Set 2: {}".format(set1, set2))

    value_set1 = next(iter(set1))
    value_set2 = next(iter(set2))
    if value_set1[1] > value_set2[1]:
        return set1
    if value_set2[1] > value_set1[1]:
        return set2
    return set1.union(set2)

def min_set(set1, set2): # set = {([x,y,z], sdf_value), ([x,y,z], sdf_value)}
    if set1 == set():
        return set2
    if set2 == set():
        return set1

    value_set1 = next(iter(set1))
    value_set2 = next(iter(set2))
    if value_set1[1] < value_set2[1]:
        return set1
    if value_set2[1] < value_set1[1]:
        return set2
    return set1.union(set2)

def is_internal_value(value_of_XYZ, internal_value):
    return internal_value[0] <= value_of_XYZ <= internal_value[1]

def get_distance_to_NO_internal_value_plane(i_interval, j_interval, k_interval, internal_value, point):
    point_sdf_internal = set() #-float("inf") # TODO: setearle un valor inicial, sino el min_set y max_set van a tener problemas
    point_sdf_external = set()
    some_point_does_not_know_his_value = False
    for i in i_interval:
        for j in j_interval:
            for k in k_interval:
                if x_total>i>=0 and y_total>j>=0 and z_total>k>=0 and ([i,j,k] != point):
                    # print("get_distance_to_NO_internal_value: pre point GET DISTANCE: {}, {}, {}".format(i, j, k))
                    sdf_value = sdf[i][j][k]

                    if sdf_value != 0 and sdf_value is not None:
                        if sdf_value < 0:
                            point_sdf_internal = max_set(point_sdf_internal, set([((i,j,k),sdf_value)]))
                        else:
                            point_sdf_external = min_set(point_sdf_external, set([((i,j,k),sdf_value)]))
                    else:
                        if is_internal_value(terrain[i][j][k], internal_value):
                            some_point_does_not_know_his_value = True
                        else:
                            sdf_value = -1
                            sdf[i][j][k] = sdf_value
                            point_sdf_internal = max_set(point_sdf_internal, set([((i,j,k), sdf_value)]))

    return point_sdf_internal, point_sdf_external, some_point_does_not_know_his_value

def get_distance_to_NO_internal_value(x, y, z, internal_value):
    level = 1
    while True: # while  points is empty
        # planos z
        z_point_sdf_internal, z_point_sdf_external, z_some_point_does_not_know_his_value = get_distance_to_NO_internal_value_plane(range(x-level, x+level+1), range(y-level, y+level+1), [z-level, z+level], internal_value, [x,y,z])

        # planos y
        y_point_sdf_internal, y_point_sdf_external, y_some_point_does_not_know_his_value = get_distance_to_NO_internal_value_plane(range(x-level, x+level+1), [y-level, y+level], range(z-level, z+level+1), internal_value, [x,y,z])

        # planos x
        x_point_sdf_internal, x_point_sdf_external, x_some_point_does_not_know_his_value = get_distance_to_NO_internal_value_plane([x-level, x+level], range(y-level, y+level+1), range(z-level, z+level+1), internal_value, [x,y,z])

        point_sdf_internal = max_set(max_set(x_point_sdf_internal, y_point_sdf_internal), z_point_sdf_internal)
        point_sdf_external = min_set(min_set(x_point_sdf_external, y_point_sdf_external), z_point_sdf_external)
        some_point_does_not_know_his_value = x_some_point_does_not_know_his_value or y_some_point_does_not_know_his_value or z_some_point_does_not_know_his_value

        # si hay alguno internal con sdf value -1 --> devolver esos puntos
        if point_sdf_internal!=set() and next(iter(point_sdf_internal))[1] == -1:
            return point_sdf_internal

        if some_point_does_not_know_his_value:
            level += 1
        else:
            return point_sdf_external



def get_distance_to_internal_value_plane(i_interval, j_interval, k_interval, internal_value, point):
    point_sdf_internal = set() #-float("inf") # TODO: setearle un valor inicial, sino el min_set y max_set van a tener problemas
    point_sdf_external = set()
    some_point_does_not_know_his_value = False
    for i in i_interval:
        for j in j_interval:
            for k in k_interval:
                if x_total>i>=0 and y_total>j>=0 and z_total>k>=0 and ([i,j,k] != point):
                    # print("get_distance_to_internal_value: pre point GET DISTANCE: {}, {}, {}".format(i, j, k))
                    sdf_value = sdf[i][j][k]

                    if sdf_value != 0 and sdf_value is not None:
                        if sdf_value < 0:
                            point_sdf_internal = max_set(point_sdf_internal, set([((i,j,k),sdf_value)]))
                        else:
                            point_sdf_external = min_set(point_sdf_external, set([((i,j,k),sdf_value)]))
                    else:
                        if is_internal_value(terrain[i][j][k], internal_value):
                            sdf_value = 1
                            sdf[i][j][k] = sdf_value
                            point_sdf_external = min_set(point_sdf_external, set([((i,j,k),sdf_value)]))
                        else:
                            some_point_does_not_know_his_value = True

    return point_sdf_internal, point_sdf_external, some_point_does_not_know_his_value

def get_distance_to_internal_value(x, y, z, internal_value):
    level = 1
    while True: # while  points is empty
        # planos z
        z_point_sdf_internal, z_point_sdf_external, z_some_point_does_not_know_his_value = get_distance_to_internal_value_plane(range(x-level, x+level+1), range(y-level, y+level+1), [z-level, z+level], internal_value, [x,y,z])

        # planos y
        y_point_sdf_internal, y_point_sdf_external, y_some_point_does_not_know_his_value = get_distance_to_internal_value_plane(range(x-level, x+level+1), [y-level, y+level], range(z-level, z+level+1), internal_value, [x,y,z])

        # planos x
        x_point_sdf_internal, x_point_sdf_external, x_some_point_does_not_know_his_value = get_distance_to_internal_value_plane([x-level, x+level], range(y-level, y+level+1), range(z-level, z+level+1), internal_value, [x,y,z])

        point_sdf_internal = max_set(max_set(x_point_sdf_internal, y_point_sdf_internal), z_point_sdf_internal)
        point_sdf_external = min_set(min_set(x_point_sdf_external, y_point_sdf_external), z_point_sdf_external)
        some_point_does_not_know_his_value = x_some_point_does_not_know_his_value or y_some_point_does_not_know_his_value or z_some_point_does_not_know_his_value

        # si hay alguno internal con sdf value 1 --> devolver esos puntos
        if point_sdf_external!=set() and next(iter(point_sdf_external))[1] == 1:
            return point_sdf_external

        if some_point_does_not_know_his_value:
            level += 1
        else:
            return point_sdf_internal



from math import sqrt
def distanceSquared3D(point, other): # point = (x,y,z)
    # print("distanceSquared3D: point: {} - other: {}".format(point, other))
    return int(sqrt((point[0]-other[0])**2 + (point[1]-other[1])**2 + (point[2]-other[2])**2))

def distanceAmountCells3D(point, other): # point = (x,y,z)
    dx = abs(point[0] - other[0])
    dy = abs(point[1] - other[1])
    dz = abs(point[2] - other[2])
    return max([dx, dy, dz])

def distancePlusSdfForInternalValue(point_with_sdf, current_point): # point_with_sdf = ((x,y,z), sdf_value) # point_with_sdf = ((x,y,z), distance)
    # no es solo calcular las ditancias, sino que tambien hay que sumarle la sdf del punto en caso de ser interno
    # print("distancePlusSdfForInternalValue: point_with_sdf: {} - current_point: {}".format(point_with_sdf, current_point))
    point = point_with_sdf[0]
    sdf_of_point = sdf[point[0]][point[1]][point[2]] # point_with_sdf[1]
    if sdf_of_point < 0: distance_to_plus = 0
    else: distance_to_plus = sdf_of_point

    return int(distanceAmountCells3D(point, current_point) + distance_to_plus)


def set_sdf_to_internal_values_plane(i_interval, j_interval, k_interval, internal_value, point, points):
    points_to_recalculate = set() # TODO: recalcularlos
    for i in i_interval:
        for j in j_interval:
            for k in k_interval:
                if x_total>i>=0 and y_total>j>=0 and z_total>k>=0 and ([i,j,k] != point):
                    # print(i,j,k)
                    value_of_IJK = terrain[i][j][k]
                    IJK_is_internal_value = is_internal_value(value_of_IJK, internal_value)
                    if IJK_is_internal_value:
                        current_point = (i,j,k)
                        distances = list(map(
                            lambda point_with_sdf: distancePlusSdfForInternalValue(point_with_sdf, current_point),
                            points
                        ))
                        min_distance = min(distances)
                        if min_distance <= 2: # TODO: en el  futuro recalcular
                            sdf[i][j][k] = min_distance
                            # print("set_sdf_to_internal_values: sdf[{}]: {}".format([i,j,k], sdf[i][j][k]))
                        if min_distance > 2:
                            points_to_recalculate.add(current_point)

    return points_to_recalculate


def set_sdf_to_internal_values(x, y, z, points, internal_value): # points = {((x,y,z), sdf_value), ((x,y,z), sdf_value)}
    # print("set_sdf_to_internal_values: Points: {}".format(points))
    level = int(distanceAmountCells3D(next(iter(points))[0], (x,y,z)))
    sdf[x][y][z] = distancePlusSdfForInternalValue(next(iter(points)), (x,y,z))
    # print("set_sdf_to_internal_values: points: {} - level: {} - sdf[{}]: {}".format(points, level, [x,y,z], sdf[x][y][z]))
    level -= 1
    while level>0: # while  points is empty
        # planos z
        z_points_to_recalculate = set_sdf_to_internal_values_plane(range(x-level, x+level+1), range(y-level, y+level+1), [z-level, z+level], internal_value, [x,y,z], points)

        # planos y
        y_points_to_recalculate = set_sdf_to_internal_values_plane(range(x-level, x+level+1), [y-level, y+level], range(z-level, z+level+1), internal_value, [x,y,z], points)

        # planos x
        x_points_to_recalculate = set_sdf_to_internal_values_plane([x-level, x+level], range(y-level, y+level+1), range(z-level, z+level+1), internal_value, [x,y,z], points)

        points_to_recalculate = z_points_to_recalculate.union(y_points_to_recalculate).union(x_points_to_recalculate) # TODO: recalcularlos
        level -= 1



def distancePlusSdfForNoInternalValue(point_with_sdf, current_point): # point_with_sdf = ((x,y,z), sdf_value) # point_with_sdf = ((x,y,z), distance)
    # no es solo calcular las ditancias, sino que tambien hay que sumarle la sdf del punto en caso de ser interno
    point = point_with_sdf[0]
    sdf_of_point = sdf[point[0]][point[1]][point[2]] # point_with_sdf[1]
    if sdf_of_point < 0: distance_to_plus = - sdf_of_point
    else: distance_to_plus = 0

    return int(distanceAmountCells3D(point, current_point) + distance_to_plus)

def set_sdf_to_NO_internal_values_plane(i_interval, j_interval, k_interval, internal_value, point, points):
    points_to_recalculate = set() # TODO: recalcularlos
    for i in i_interval:
        for j in j_interval:
            for k in k_interval:
                if x_total>i>=0 and y_total>j>=0 and z_total>k>=0 and ([i,j,k] != point):
                    value_of_IJK = terrain[i][j][k]
                    IJK_is_internal_value = is_internal_value(value_of_IJK, internal_value)
                    if not IJK_is_internal_value:
                        current_point = (i,j,k)
                        distances = list(map(
                            lambda point_with_sdf: distancePlusSdfForNoInternalValue(point_with_sdf, current_point),
                            points
                        ))
                        min_distance = min(distances)

                        if min_distance <= 2: # TODO: en el  futuro recalcular
                            sdf[i][j][k] = - min_distance

                        if min_distance > 2:
                            points_to_recalculate.add(current_point)

    return points_to_recalculate

def set_sdf_to_NO_internal_values(x, y, z, points, internal_value): # points = {((x,y,z), sdf_value), ((x,y,z), sdf_value)}
    # print("set_sdf_to_internal_values: Points: {}".format(points))
    level = distanceSquared3D(next(iter(points))[0], (x,y,z))
    sdf[x][y][z] = - distancePlusSdfForNoInternalValue(next(iter(points)), (x,y,z))
    # print("set_sdf_to_NO_internal_values: points: {} - distance: {} - sdf[{}]: {}".format(points, level, [x,y,z], sdf[x][y][z]))
    level -= 1
    while level>0: # while  points is empty
        # planos z
        z_points_to_recalculate = set_sdf_to_NO_internal_values_plane(range(x-level, x+level+1), range(y-level, y+level+1), [z-level, z+level], internal_value, [x,y,z], points)

        # planos y
        y_points_to_recalculate = set_sdf_to_NO_internal_values_plane(range(x-level, x+level+1), [y-level, y+level], range(z-level, z+level+1), internal_value, [x,y,z], points)

        # planos x
        x_points_to_recalculate = set_sdf_to_NO_internal_values_plane([x-level, x+level], range(y-level, y+level+1), range(z-level, z+level+1), internal_value, [x,y,z], points)

        points_to_recalculate = z_points_to_recalculate.union(y_points_to_recalculate).union(x_points_to_recalculate) # TODO: recalcularlos

        level -= 1



def get_distance(x, y, z, internal_value):
    # print("\nGET DISTANCE POINT [{},{},{}]".format(x,y,z))
    initial_sdf_value = sdf[x][y][z]
    if initial_sdf_value is not None and initial_sdf_value != 0:
        # print("la distancia de [{}, {}, {}] es {}".format(x,y,z, initial_sdf_value))
        return initial_sdf_value

    # points = set() # {([x,y,z], sdf_value), ([x,y,z], sdf_value)}

    value_of_XYZ = terrain[x][y][z]
    XYZ_is_internal_value = is_internal_value(value_of_XYZ, internal_value)

    if XYZ_is_internal_value:
        points = get_distance_to_NO_internal_value(x, y, z, internal_value)
        set_sdf_to_internal_values(x, y, z, points, internal_value)
    else:
        points = get_distance_to_internal_value(x,y,z, internal_value)
        set_sdf_to_NO_internal_values(x, y, z, points, internal_value)

    return sdf[x][y][z]

# Be Right Back
# KTLO
# Keep The Lights On

import time
def calculate_sdf(shape, internalValue):
    initial_time=time.time()
    # TODO: empezar de un punto random?
    for i in range(shape[0]):
        # print("se calcula la distancia de para i = {}".format(i))
        for j in range(shape[1]):
            for k in range(shape[2]):
                get_distance(i, j, k, internalValue)
    end_time=time.time()
    print("Calcular la sdf de una matrix tardo {} segundos para el valor interno {}".format(end_time-initial_time, internalValue))
    return sdf

#if __name__ == '__main__':
internalValues = [[0.00,0.04]] # [[0.00,0.081], [0.082,0.17], [0.18,0.27], [0.28,0.4]]
# TODO: for internalValue in internalValues save sdf
# print(sdf)
# terrain = [[[0.0, 0.03258603, 0.0618329,  0.0824457,  0.09786684],
#             [0.00326539, 0.03349958, 0.06179116, 0.08256891, 0.09873772],
#             [0.01080146, 0.03402521, 0.06090566, 0.08273219, 0.09871391],
#             [0.01496741, 0.03328978, 0.05984878, 0.08213428, 0.09722163],
#             [0.01769297, 0.03253883, 0.05857638, 0.08192541, 0.0978224 ]]]
np.save('big_terrain_50_matrix.npy', terrain)
print(terrain)
print("Calculating SDF")
final_sdf = calculate_sdf(shape, internalValues[0])

print(final_sdf)
np.save('big_terrain_50_sdf_matrix.npy', final_sdf)