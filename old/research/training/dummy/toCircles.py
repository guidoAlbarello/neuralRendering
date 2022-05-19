from numpy import asarray
import numpy as np
from ast import literal_eval
from math import sqrt
'''
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def distance(self, other):
        return sqrt((self.x-other.x)**2 + (self.y-other.y)**2)
'''

def distance(point, other):
    return sqrt((point[0]-other[0])**2 + (point[1]-other[1])**2)

def isInCicrle(circles, point):
    for circle in circles:
        if distance(point, circle[0])< circle[1]:
            return True
    return False

def toDistanceInPixels(number):
    return number/(width * height)

def cirles(coordinates_file, distances_file, width, height):
    with open(coordinates_file) as f:
        coordinates = [literal_eval(line) for line in f]
    coordinates = asarray(coordinates[0])
    print(coordinates)

    with open(distances_file) as f:
        distances = [literal_eval(line) for line in f]
    distances = asarray(distances[0])
    distances = list(map(toDistanceInPixels, distances))

    #print(len(coordinates))
    #print(len(distances))
    coordinates_circles = [] #[(Point,r)]
    for i in range(len(distances)):
        coord = (coordinates[i][0], coordinates[i][1])
        if(not isInCicrle(coordinates_circles, coord)):
            coordinates_circles.append((coord, distances[i]))

    return coordinates_circles


if __name__ == "__main__":
    coordinates_file = "./files/coordinates.txt"
    distances_file = "./files/distances.txt"
    width = 702
    height = 711
    circles = cirles(coordinates_file, distances_file, width, height)
    print(circles)