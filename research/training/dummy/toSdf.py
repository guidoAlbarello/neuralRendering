from PIL import Image
from numpy import asarray
import numpy
import itertools
import threading

def loadImage(imageFileName):
    image = Image.open(imageFileName)
    data = asarray(image)
    print(type(data))
    print(data.shape)

    coordenadas = []
    valores = []
    height = len(data)
    width = len(data[0])

    for row in range(len(data)):
        for col in range(len(data[row])):
            coordenadas.append([col/float(width), row/float(height)])
            valores.append(1 if data[row][col][0] != 0 else 0)
    return coordenadas, valores, data

def getIndexes(distance):
    values = list(range(-distance,distance+1))
    result = list(map(lambda v: (v,distance), values))
    result += list(map(lambda v: (-distance, v), values))
    result += list(map(lambda v: (v,-distance), values))
    result += list(map(lambda v: (distance, v), values))
    return set(result)

def getDistance(data, row, col, distance = 0):
    '''Get distance to pixel without value 0'''
    height = len(data)
    width = len(data[0])
    indexes = getIndexes(distance)
    # print(indexes)
    for index in indexes:
        if row+index[0] < height and col+index[1] < width:
            if data[row+index[0]][col+index[1]][0] != 0:
                return distance
    return getDistance(row, col, distance+1)

def getDistance2(data, row, col, distance = 0):
    '''Get distance to the first pixel with different value'''
    height = len(data)
    width = len(data[0])
    indexes = getIndexes(distance)
    value = data[row][col][0]
    for index in indexes:
        if row+index[0] < height and col+index[1] < width:
            if data[row+index[0]][col+index[1]][0] != value:
                return distance
    return getDistance2(data, row, col, distance+1)



################################### WITHOUT THREADS #######################################

def imageToSdf(imageFileName):
    # print("COMENZO")
    image = Image.open(imageFileName)
    data = asarray(image)

    coordinates = []
    distances = []
    values = []
    height = len(data)
    width = len(data[0])

    for row in range(len(data)):
        print(row)
        for col in range(len(data[row])):
            coordinates.append([col/float(width), row/float(height)])
            values.append(-1 if data[row][col][0] != 0 else 0)
            distance = 0
            cond = True
            print(data[row][col][0])
            while cond:
                indexes = getIndexes(distance)
                # print(indexes)
                for index in indexes:
                    if row+index[0] < height and col+index[1] < width:
                        # print(data[row+index[0]][col+index[1]][0])
                        if data[row+index[0]][col+index[1]][0] != 0:
                            cond = False
                distance += 1
            distances.append(distance)

            #distances.append(getDistance(data, row, col))

    print(distances)
    return coordinates, distances, values

def imageToSdf2(imageFileName, internalValue):
    print("empezo")
    image = Image.open(imageFileName)
    data = asarray(image)

    coordinates = []
    distances = []
    values = []
    height = len(data)
    width = len(data[0])

    for row in range(height):
        for col in range(width):
            #print("row: {}, col: {}, MaxRow:{}, MaxCol:{}".format(row,col, height, width))
            coordinates.append([col/float(width), row/float(height)])
            values.append(-1 if data[row][col][0] != 0 else 0)

            # Search distance to pixel with different value
            drow = 0
            dcol = -1
            y = row
            x = col
            pixelValue = data[row][col]
            for i in range(max(height, width)**2):
                if (-height/2 < y <= height/2) and (-width/2 < x <= width/2):
                    if (data[y][x] != pixelValue).any():
                        break

                y_row = y-row
                x_col = x-col
                if y_row == x_col or (y_row < 0 and y_row == -x_col) or (y_row > 0 and y_row == 1-x_col):
                    drow, dcol = -dcol, drow
                x, y = x+dcol, y+drow
            distance = max(abs(y-row), abs(x-col))
            if (pixelValue == internalValue).all():
                distance = -distance
            #print(distance)
            distances.append(distance)

    print(distances)
    return coordinates, distances, values

#internalValue = numpy.array([255, 255, 255, 255], numpy.uint8)
#imageToSdf2("./densityMap.png", internalValue)



#################################### THREADS ##############################################

def compare(color, internalColor, isInternal):
    return (color != internalColor).any() if isInternal else (color == internalColor).all()

def dataToSdf(data, internalValue, coordinates, distances, values, heightInit, heightEnd):
    height = len(data)
    width = len(data[0])
    for row in range(heightInit, heightEnd):
        for col in range(width):
            print("row: {}, col: {}, MaxRow:{}, MaxCol:{}".format(row, col, height, width))
            coordinates.append([col/float(width), row/float(height)])
            values.append(-1 if data[row][col][0] != 0 else 0)

            # Search distance to pixel with different value
            drow = 0
            dcol = -1
            y = row
            x = col
            pixelValue = data[row][col]

            isInternal = False
            if (pixelValue == internalValue).all():
                isInternal = True

            for i in range(max(height, width)**2):
                if (-height/2 < y <= height/2) and (-width/2 < x <= width/2):
                    if compare(data[y][x], internalValue, isInternal):
                        break
                y_row = y-row
                x_col = x-col
                if y_row == x_col or (y_row < 0 and y_row == -x_col) or (y_row > 0 and y_row == 1-x_col):
                    drow, dcol = -dcol, drow
                x, y = x+dcol, y+drow

            distance = max(abs(y-row), abs(x-col))
            if (pixelValue == internalValue).all():
                distance = -(distance-1)
            #print(distance)
            distances.append(distance)

    print(distances)

def imageToSdfThreads(imageFileName, internalValue, Nthreads):
    print("empezo")
    image = Image.open(imageFileName)
    data = asarray(image)
    coordinates = [[]]*Nthreads
    distances = [[]]*Nthreads
    values = [[]]*Nthreads

    Nheight = int(len(data)/Nthreads)

    threads = list()
    for i in range(Nthreads):
        heightInit = Nheight*i
        heightEnd = Nheight*(i+1)
        if i == Nthreads-1:
            heightEnd += Nheight%Nthreads
        t = threading.Thread(target=dataToSdf, args=(data, internalValue, coordinates[i], distances[i], values[i], heightInit, heightEnd,))
        threads.append(t)
        t.start()

    for t in threads:
        t.join()

    coordinates = list(itertools.chain.from_iterable(coordinates))
    distances = list(itertools.chain.from_iterable(distances))
    values = list(itertools.chain.from_iterable(values))
    print("############ FIN #############")
    print("coordinates: {}".format(coordinates))
    print("distances: {}".format(distances))
    print("values: {}".format(values))

    coordinatesFile =open("coordinates.txt", "a")
    coordinatesFile.write(coordinates)
    coordinatesFile.write('\n')
    coordinatesFile.close()

    distancesFile =open("distances.txt", "a")
    distancesFile.write(distances)
    distancesFile.write('\n')
    distancesFile.close()

    valuesFile =open("values.txt", "a")
    valuesFile.write(values)
    valuesFile.write('\n')
    valuesFile.close()

    return coordinates, distances, values

internalValue = numpy.array([255, 255, 255, 255], numpy.uint8)
imageToSdfThreads("./densityMap.png", internalValue, 4)