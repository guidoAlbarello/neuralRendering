from DistanceFinderStrategy import DistanceFinderStrategy

class ExternalValueDistanceFinderStrategy(DistanceFinderStrategy):
    def __init__(self, sdf, terrain, internal_value):
        self.sdf = sdf
        self.terrain = terrain
        self.internal_value = internal_value

    def _get_points_with_min_distance(self, some_point_does_not_know_his_value, point_sdf_external, point_sdf_internal):
        # si hay alguno internal con sdf value -1 --> devolver esos puntos
        if point_sdf_external!=set() and next(iter(point_sdf_external))[1] == 1:
            return point_sdf_external

        if some_point_does_not_know_his_value:
            return None
        return point_sdf_internal
    
    def _verfy_if_some_point_does_not_know_his_value(self, i, j, k, point_sdf_external, point_sdf_internal, some_point_does_not_know_his_value):
        if self._is_internal_value(self.terrain[i][j][k]):
            sdf_value = 1
            self.sdf[i][j][k] = sdf_value
            point_sdf_external = self.min_set(point_sdf_external, set([((i,j,k),sdf_value)]))
        else:
            some_point_does_not_know_his_value = True
        
        return some_point_does_not_know_his_value, point_sdf_external, point_sdf_internal

    def _set_min_distance(self, i, j, k, min_distance):
        self.sdf[i][j][k] = - min_distance

    def _distance_plus_sdf_for_different_value(self, point_with_sdf, current_point): # point_with_sdf = ((x,y,z), sdf_value) # point_with_sdf = ((x,y,z), distance)
        # no es solo calcular las ditancias, sino que tambien hay que sumarle la sdf del punto en caso de ser interno
        point = point_with_sdf[0]
        sdf_of_point = self.sdf[point[0]][point[1]][point[2]] # point_with_sdf[1]
        if sdf_of_point < 0: distance_to_plus = -sdf_of_point
        else: distance_to_plus = 0

        return -int(self.distanceAmountCells3D(point, current_point) + distance_to_plus)