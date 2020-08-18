from sklearn.neural_network import MLPClassifier
import formatter

X = [[0., 0.], [1., 1.]]
y = [0, 1]
clf = MLPClassifier(solver='lbfgs', alpha=1e-5, hidden_layer_sizes=(5, 2), random_state=1)
clf.fit(X, y)
formatter.toTestShader(formatter.SquashFunction.RELU, clf.coefs_, clf.intercepts_, './net.glsl')
