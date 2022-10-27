class DistanceFinderStrategy:
    def __init__(self, sdf, terrain, internal_value):
        self.sdf = sdf
        self.terrain = terrain
        self.internal_value = internal_value

    def get_distance_to_different_point_value(self, x,y,z):
        level = 1
        while True: # while  points is empty
            # planos z
            z_point_sdf_internal, z_point_sdf_external, z_some_point_does_not_know_his_value = self.get_distance_to_different_value_plane(range(x-level, x+level+1), range(y-level, y+level+1), [z-level, z+level], [x,y,z])

            # planos y
            y_point_sdf_internal, y_point_sdf_external, y_some_point_does_not_know_his_value = self.get_distance_to_different_value_plane(range(x-level, x+level+1), [y-level, y+level], range(z-level, z+level+1), [x,y,z])

            # planos x
            x_point_sdf_internal, x_point_sdf_external, x_some_point_does_not_know_his_value = self.get_distance_to_different_value_plane([x-level, x+level], range(y-level, y+level+1), range(z-level, z+level+1), [x,y,z])

            point_sdf_internal = self.max_set(self.max_set(x_point_sdf_internal, y_point_sdf_internal), z_point_sdf_internal)
            point_sdf_external = self.min_set(self.min_set(x_point_sdf_external, y_point_sdf_external), z_point_sdf_external)
            some_point_does_not_know_his_value = x_some_point_does_not_know_his_value or y_some_point_does_not_know_his_value or z_some_point_does_not_know_his_value

            points_with_min_distance = self._get_points_with_min_distance(some_point_does_not_know_his_value, point_sdf_external, point_sdf_internal)
            if( points_with_min_distance != None ):
                return points_with_min_distance
            level += 1
   
    def get_distance_to_different_value_plane(self, i_interval, j_interval, k_interval, point):
        point_sdf_internal = set() #-float("inf") # TODO: setearle un valor inicial, sino el min_set y max_set van a tener problemas
        point_sdf_external = set()
        some_point_does_not_know_his_value = False

        x_total = self.terrain.shape[0]
        y_total = self.terrain.shape[1]
        z_total = self.terrain.shape[2]
        for i in i_interval:
            for j in j_interval:
                for k in k_interval:
                    if x_total>i>=0 and y_total>j>=0 and z_total>k>=0 and ([i,j,k] != point):
                        # print("get_distance_to_internal_value: pre point GET DISTANCE: {}, {}, {}".format(i, j, k))
                        sdf_value = self.sdf[i][j][k]

                        if sdf_value != 0 and sdf_value is not None:
                            if sdf_value < 0:
                                point_sdf_internal = self.max_set(point_sdf_internal, set([((i,j,k),sdf_value)]))
                            else:
                                point_sdf_external = self.min_set(point_sdf_external, set([((i,j,k),sdf_value)]))
                        else:
                            some_point_does_not_know_his_value, point_sdf_external, point_sdf_internal = self._verfy_if_some_point_does_not_know_his_value(i, j, k, point_sdf_external, point_sdf_internal, some_point_does_not_know_his_value)

        return point_sdf_internal, point_sdf_external, some_point_does_not_know_his_value

    def set_sdf_values(self, x, y, z, points):
        level = int(self.distanceAmountCells3D(next(iter(points))[0], (x,y,z)))
        self.sdf[x][y][z] = self._distance_plus_sdf_for_different_value(next(iter(points)), (x,y,z))
        # print("set_sdf_to_internal_values: points: {} - level: {} - sdf[{}]: {}".format(points, level, [x,y,z], sdf[x][y][z]))
        level -= 1
        while level>0: # while  points is empty
            # planos z
            z_points_to_recalculate = self.set_sdf_values_by_plane(range(x-level, x+level+1), range(y-level, y+level+1), [z-level, z+level], [x,y,z], points)

            # planos y
            y_points_to_recalculate = self.set_sdf_values_by_plane(range(x-level, x+level+1), [y-level, y+level], range(z-level, z+level+1), [x,y,z], points)

            # planos x
            x_points_to_recalculate = self.set_sdf_values_by_plane([x-level, x+level], range(y-level, y+level+1), range(z-level, z+level+1), [x,y,z], points)

            points_to_recalculate = z_points_to_recalculate.union(y_points_to_recalculate).union(x_points_to_recalculate) # TODO: recalcularlos
            level -= 1

    def set_sdf_values_by_plane(self, i_interval, j_interval, k_interval, point, points):
        points_to_recalculate = set() # TODO: recalcularlos
        
        x_total = self.terrain.shape[0]
        y_total = self.terrain.shape[1]
        z_total = self.terrain.shape[2]

        for i in i_interval:
            for j in j_interval:
                for k in k_interval:
                    if x_total>i>=0 and y_total>j>=0 and z_total>k>=0 and ([i,j,k] != point):
                        # print(i,j,k)
                        value_of_IJK = self.terrain[i][j][k]
                        IJK_is_internal_value = self._is_internal_value(value_of_IJK)
                        if IJK_is_internal_value:
                            current_point = (i,j,k)
                            distances = list(map(
                                lambda point_with_sdf: self._distance_plus_sdf_for_different_value(point_with_sdf, current_point),
                                points
                            ))
                            min_distance = min(distances)
                            if min_distance <= 2: # TODO: en el  futuro recalcular
                                self._set_min_distance(i, j, k, min_distance)
                                # print("set_sdf_to_internal_values: sdf[{}]: {}".format([i,j,k], sdf[i][j][k]))
                            if min_distance > 2:
                                points_to_recalculate.add(current_point)

        return points_to_recalculate

    def _is_internal_value(self, value_of_XYZ):
        return self.internal_value[0] <= value_of_XYZ <= self.internal_value[1]

    def _get_points_with_min_distance(self, some_point_does_not_know_his_value, point_sdf_external, point_sdf_internal):
        raise Exception("Not defined")

    def _verfy_if_some_point_does_not_know_his_value(self, i, j, k, point_sdf_external, point_sdf_internal, some_point_does_not_know_his_value):
        raise Exception("Not defined")

    def _distance_plus_sdf_for_different_value(self, point_with_sdf, current_point): # point_with_sdf = ((x,y,z), sdf_value) # point_with_sdf = ((x,y,z), distance)
        raise Exception("Not defined")

    def _set_min_distance(self, i, j, k, min_distance):
        raise Exception("Not defined")

    def max_set(self, set1, set2): # set = {([x,y,z], sdf_value), ([x,y,z], sdf_value)}
        if set1 == set():
            return set2
        if set2 == set():
            return set1

        # print("max_set. Set 1: {} - Set 2: {}".format(set1, set2))

        value_set1 = next(iter(set1))
        value_set2 = next(iter(set2))
        if value_set1[1] > value_set2[1]:
            return set1
        if value_set2[1] > value_set1[1]:
            return set2
        return set1.union(set2)

    def min_set(self, set1, set2): # set = {([x,y,z], sdf_value), ([x,y,z], sdf_value)}
        if set1 == set():
            return set2
        if set2 == set():
            return set1

        value_set1 = next(iter(set1))
        value_set2 = next(iter(set2))
        if value_set1[1] < value_set2[1]:
            return set1
        if value_set2[1] < value_set1[1]:
            return set2
        return set1.union(set2)

    def distanceAmountCells3D(self, point, other): # point = (x,y,z)
        dx = abs(point[0] - other[0])
        dy = abs(point[1] - other[1])
        dz = abs(point[2] - other[2])
        return max([dx, dy, dz])