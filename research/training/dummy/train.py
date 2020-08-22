from sklearn.neural_network import MLPClassifier
import formatter
from PIL import Image
from numpy import asarray
import itertools

def showPlot(array):
    i = 0
    for e in array:
        if i % 100 == 0:
            print(e)
        else:
            print(e, end='')
        i += 1


def loadImage():
    image = Image.open('densityMap.png')
    data = asarray(image)
    print(type(data))
    print(data.shape)

    X = []
    y = []
    height = len(data)
    width = len(data[0])

    for row in range(len(data)):
        for col in range(len(data[row])):
            X.append([col/float(width), row/float(height)])
            y.append(1 if data[row][col][0] != 0 else 0)
    return X, y


def makeQuad():
    Y = []
    X = []
    rows = 100
    cols = 100
    for i in range(rows):
        for j in range(cols):
            X.append([j/cols, i/rows])
            if i >= 50 and i < 90 and j > 30 and j < 60:
                Y.append(0)
            else:
                Y.append(1)
    return X, Y

def makeCircle():
    Y = []
    X = []
    rows = 100
    cols = 100
    for x, y in itertools.product(range(rows), range(cols)):
        coordX = x/cols
        coordY = y/rows
        X.append([coordX, coordY])
        ecuacion = (coordX-0.5)**2 + (coordY-0.5)**2
        if ecuacion <= 0.25**2:
            Y.append(1)
        else:
            Y.append(0)
    return X, Y


X, y = makeCircle()
clf = MLPClassifier(solver='lbfgs', alpha=1e-5,
                    hidden_layer_sizes=(16, 16, 4), random_state=1, max_iter=400)
clf.fit(X, y)
print(clf.predict([[0.5, 1.0]]))
formatter.toTestShader(formatter.SquashFunction.RELU,
                       clf.coefs_, clf.intercepts_, './net.glsl')

# ([711][702][4]) [ row1: [[R,G,B,A], .. [R,G,B,A]], row2: [[R,G,B,A], .. [R,G,B,A]], row3: [[R,G,B,A], .. [R,G,B,A]] ]
# X= [[coordX, CoordY], [coordX, CoordY],[coordX, CoordY] ,[coordX, CoordY] ,[coordX, CoordY], [coordX, CoordY]] (711x702)
#  y = [RGBA, RGBA, RGBA, RGBA]
