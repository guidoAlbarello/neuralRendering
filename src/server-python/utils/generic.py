import pandas as pd


def csv_to_dataframe(file_name):
    return pd.read_csv(file_name)


def distance_squared_3D(point, other):
    return (point[0]-other[0])**2 + (point[1]-other[1])**2 + (point[2]-other[2])**2


def sphere_is_in_sphere(spheres, point, radio):
    for sphere in spheres:
        if distance_squared_3D(point, sphere[0]) < sphere[1]**2:
            return True
    return False


# take second element for sort
# def take_second(elem):
#    return elem[1]


def make_spheres(dataframe, max_spheres): #dataframe = (x,y,z,density,distance)
    coordinates_spheres = [] #[(Point,r)]

    for i in range(len(dataframe)):
        distance = dataframe.iloc[i].distance
        if (len(coordinates_spheres) < max_spheres):
            coord = [dataframe.iloc[i].x, dataframe.iloc[i].y, dataframe.iloc[i].z]
            is_in_sphere = sphere_is_in_sphere(coordinates_spheres, coord, distance)
            if(not is_in_sphere):
                coordinates_spheres.append([coord, distance])

    return coordinates_spheres


def generate_spheres(dataframe, max_spheres):
    sort_dataframe = dataframe.sort_values(by="distance", ascending=False)
    spheres_points = make_spheres(sort_dataframe, max_spheres)
    return spheres_points


def smooth_union(d1, d2):
    k = 10
    h = max(k - abs(d1 - d2), 0.0)/k
    return min(d1, d2) - h*h*k*(1.0/4.0)


def sphere_sdf(point, sphere):
    return sqrt(distance_squared_3D(point, sphere[0])) - sphere[1]