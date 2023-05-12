from SdfUtils import generate_terrain
from SdfUtils import calculate_sdf
from multiprocessing import Process

import numpy as np
import matplotlib.pyplot as plt
import signal
import sys


def plot_3D(dataframe: np.ndarray, density) -> None:
        print("plot_3D")
        x = np.arange(dataframe.shape[0])[:, None, None]
        y = np.arange(dataframe.shape[1])[None, :, None]
        z = np.arange(dataframe.shape[2])[None, None, :]
        x, y, z = np.broadcast_arrays(x, y, z)

        # Creating figure fig = plt.figure(figsize=(20, 13))
        fig = plt.figure()
        ax = plt.axes(projection="3d")

        # Add x, y gridlines
        ax.grid(b=True, color='grey', linestyle='-.', linewidth=0.3, alpha=0.2)

        # Creating plot
        sctt = ax.scatter3D(x, y, z, alpha=0.8, c=density, cmap='terrain', marker='o')

        plt.title("Terrain plot")
        ax.set_xlabel('X-axis', fontweight='bold')
        ax.set_ylabel('Y-axis', fontweight='bold')
        ax.set_zlabel('Z-axis', fontweight='bold')
        fig.colorbar(sctt, ax=ax, shrink=0.5, aspect=5)

        # show plot
        plt.show()

def signal_handler(sig, frame):
    print('You pressed Ctrl+C!')
    sys.exit(0)

if __name__ == '__main__':   
    signal.signal(signal.SIGINT, signal_handler)
    
    x_total = 3
    y_total = 3
    z_total = 3
    shape = (x_total, y_total, z_total)

    terrain = generate_terrain(shape, True)
    internalValues = [[0.00,0.04]] # [[0.00,0.081], [0.082,0.17], [0.18,0.27], [0.28,0.4]]

    sdf = calculate_sdf(terrain, shape, internalValues[0], True)

    print(sdf)
    """
    print(sdf)

    p = Process(target=plot_3D, args=(terrain, terrain.ravel()))
    p.start()
    
    plot_3D(sdf, sdf.ravel())
    p.join()
   """
