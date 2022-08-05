import json
from enum import Enum

class SquashFunction(Enum):
    IDENTITY = 1
    LOGISTIC = 2
    TANH = 3
    RELU = 4

    def supportedValues():
        return SquashFunction.IDENTITY.name + '|' + SquashFunction.LOGISTIC.name + '|' + SquashFunction.TANH.name + '|' + SquashFunction.RELU.name + '|'

    def validate(object):
        if type(object) is not SquashFunction:
            return 'Invalid squashing function type. Supported types are: ' + SquashFunction.supportedValues()  


def arrayToList(array):
    newList = []
    for element in array:
        newList.append(element.tolist())
    return newList

def toJson(squashFunction, weights, bias, filename):
    SquashFunction.validate(squashFunction)

    with open(filename, 'w') as f:
        json.dump({
            'squash_function': squashFunction.name,
            'weights': arrayToList(weights),
            'bias': arrayToList(bias)
        }, f)

def toTestShader(squashFunction, weights, bias, filename):
    SquashFunction.validate(squashFunction)
    if squashFunction != SquashFunction.RELU:
        return 'Invalid squash function. Only relu supported at the moment.'
    
    weights = arrayToList(weights)
    bias = arrayToList(bias)

    argName = 'inputPoint'
    
    input = ['inputPoint.x', 'inputPoint.y']
    for k in range(len(weights)):
        output = []
        for i in range(len(weights[k][0])):
            linearCombination = ''
            for j in range(len(input)):
                linearCombination += '{0} * {1} + '.format(input[j], weights[k][j][i]) 
            output.append(('relu({0}{1})').format(linearCombination, bias[k][i]))
        input = output  
    netFunction = input[0]

    evaluateNet = ('float evaluateNet(vec2 {0}) {{\n\t return {1};\n}}').format(argName, netFunction)
    relu = ('float relu(float value) {\n\t return max(0.0, value);\n}')
    shaderCode = ('{0}\n\n{1}').format(relu, evaluateNet)
    with open(filename, 'w') as f:
        f.write(shaderCode)