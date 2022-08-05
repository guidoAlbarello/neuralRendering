import noise
import numpy as np
import matplotlib.pyplot as plt

def plot_3D(dataframe: np.ndarray) -> None:
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
    sctt = ax.scatter3D(x, y, z, alpha=0.8, c=dataframe.ravel(), cmap='terrain', marker='o')

    plt.title("Terrain plot")
    ax.set_xlabel('X-axis', fontweight='bold')
    ax.set_ylabel('Y-axis', fontweight='bold')
    ax.set_zlabel('Z-axis', fontweight='bold')
    fig.colorbar(sctt, ax=ax, shrink=0.5, aspect=5)

    # show plot
    plt.show()

def plot_2D(dataframe: np.ndarray) -> None:
    print("plot_2D")
    lin_x = np.linspace(0,1,dataframe.shape[0],endpoint=False)
    lin_y = np.linspace(0,1,dataframe.shape[1],endpoint=False)
    x,y = np.meshgrid(lin_x,lin_y)
    
    fig = plt.figure()
    ax = fig.add_subplot(111, projection="3d")

    # Creating plot
    sctt = ax.plot_surface(x, y, dataframe, cmap='terrain')

    plt.title("Terrain plot")
    ax.set_xlabel('X-axis', fontweight='bold')
    ax.set_ylabel('Y-axis', fontweight='bold')
    ax.set_zlabel('Z-axis', fontweight='bold')
    fig.colorbar(sctt, ax=ax, shrink=0.5, aspect=5)

    # show plot
    plt.show()


# Press the green button in the gutter to run the script.
def generate_3D_terrain(x: int, y: int, z: int) -> np.ndarray:
    print("generate_3D_terrain")
    shape = (x, y, z)
    scale = 100.0
    octaves = 6
    persistence = 0.5
    lacunarity = 2.0

    terrain = np.zeros(shape)

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
                terrain[i][j][k] = density
    return terrain

def generate_2D_terrain(x: int, y: int) -> np.ndarray:
    print("generate_2D_terrain")
    shape = (x, y)
    scale = 100.0
    octaves = 6
    persistence = 0.5
    lacunarity = 2.0

    terrain = np.zeros(shape)

    for i in range(shape[0]):
        for j in range(shape[1]):
            density = noise.pnoise2(i / scale,
                                    j / scale,
                                    octaves=octaves,
                                    persistence=persistence,
                                    lacunarity=lacunarity,
                                    repeatx=1024,
                                    repeaty=1024,
                                    base=42)
            terrain[i][j] = density
    return terrain

def plot_overhead_view(terrain: np.ndarray) -> None:
    print("plot_overhead_view")
    plt.imshow(terrain,cmap='terrain')
    plt.show()
    return

if __name__ == '__main__':
    print("main")
    x = 20
    y = 20
    z = 20

    terrain3D = generate_3D_terrain(x, y, z)
    terrain2D = generate_2D_terrain(x, y)

    plot_overhead_view(terrain2D)
    plot_2D(terrain2D)

    plot_3D(terrain3D)
