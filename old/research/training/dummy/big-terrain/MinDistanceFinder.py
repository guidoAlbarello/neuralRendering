
from InternalValueDistanceFinderStrategy import InternalValueDistanceFinderStrategy
from ExternalValueDistanceFinderStrategy import ExternalValueDistanceFinderStrategy

class MinDistanceFinder:
    def __init__(self, terrain, sdf, internal_value) -> None:
        self.sdf = sdf
        self.terrain = terrain
        self.internal_value = internal_value
        self.internalStrategy = InternalValueDistanceFinderStrategy(sdf, terrain, internal_value)
        self.externalStrategy = ExternalValueDistanceFinderStrategy(sdf, terrain, internal_value)
        
    def _is_internal_value(self, value_of_XYZ):
        return self.internal_value[0] <= value_of_XYZ <= self.internal_value[1]
    
    def get_distance(self, x, y, z):
        initial_sdf_value = self.sdf[x][y][z]
        if initial_sdf_value is not None and initial_sdf_value != 0:
            return initial_sdf_value

        value_of_XYZ = self.terrain[x][y][z]

        finder_strategy = self.internalStrategy if self._is_internal_value(value_of_XYZ) else self.externalStrategy
        
        points = finder_strategy.get_distance_to_different_point_value(x,y,z)
        finder_strategy.set_sdf_values(x, y, z, points)
        
        return self.sdf[x][y][z]