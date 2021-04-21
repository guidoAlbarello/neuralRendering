import noise
import numpy as np
import matplotlib.pyplot as plt


def plot_dataframe(dataframe):
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
    sctt = ax.scatter3D(x, y, z, alpha=0.8, c=dataframe.ravel(), cmap='terrain', marker='o')

    plt.title("Terrain plot")
    ax.set_xlabel('X-axis', fontweight='bold')
    ax.set_ylabel('Y-axis', fontweight='bold')
    ax.set_zlabel('Z-axis', fontweight='bold')
    fig.colorbar(sctt, ax=ax, shrink=0.5, aspect=5)

    # show plot
    plt.show()


# Press the green button in the gutter to run the script.
if __name__ == '__main__':

    shape = (20, 20, 20)
    scale = 100.0
    octaves = 6
    persistence = 0.5
    lacunarity = 2.0

    world = np.zeros(shape)

    for i in range(shape[0]):
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
                world[i][j][k] = density

    plot_dataframe(world)
