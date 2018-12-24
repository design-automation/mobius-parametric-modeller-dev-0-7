import { GIModel } from '@libs/geo-info/GIModel';
import { EAttribNames, TId, EEntityTypeStr, Txyz} from '@libs/geo-info/common';
import { idBreak } from '@libs/geo-info/id';
import { __merge__ } from './_model';

/**
 * Adds a new position to the model.
 * @param __model__
 * @param coords XYZ coordinates as a list of three numbers.
 * @returns New position if successful, null if unsuccessful or on error.
 * @example position1 = make.Position([1,2,3])
 *
 * Creates a position with coordinates x=1, y=2, z=3.
 */
export function Position(__model__: GIModel, coords: Txyz): TId {
    const posi_id: TId = __model__.geom.add.addPosition();
    __model__.attribs.add.setAttribValue(posi_id, EAttribNames.COORDS, coords);
    return posi_id;
}
/**
 * Adds a new point to the model.
 * @param __model__
 * @param position Position of point.
 * @returns New point if successful, null if unsuccessful or on error.
 * @example point1 = make.Point(position1)
 *
 * Creates a point at position1.
 */
export function Point(__model__: GIModel, positions: TId|TId[]): TId {
    for (const position of positions) {
        const [entity_str, index] = idBreak(position);
        const posi_i: number = __model__.geom.query.navAnyToPosi(EEntityTypeStr[entity_str], index)[0];
        return __model__.geom.add.addPointByIndex(posi_i) + EEntityTypeStr.POINT;
    }
}
/**
 * Adds a new polyline to the model.
 * @param __model__
 * @param positions List of positions.
 * @returns New polyline if successful, null if unsuccessful or on error.
 * @example polyline1 = make.Polyline([position1,position2,position3])
 *
 * Creates an open polyline with vertices position1, position2, position3 in sequence.
 */
export function Polyline(__model__: GIModel, positions: TId|TId[]): TId {
    throw new Error("Not implemented."); return null;
    // return __model__.geom.add.addPline(positions);
}
/**
 * Adds a new polygon to the model.
 * @param __model__
 * @param positions List of positions.
 * @returns New polygon if successful, null if unsuccessful or on error.
 * @example polygon1 = make.Polygon([position1,position2,position3])
 *
 * Creates a polygon with vertices position1, position2, position3 in sequence.
 */
export function Polygon(__model__: GIModel, positions: TId|TId[]): TId {
    throw new Error("Not implemented."); return null;
    // return __model__.geom.add.addPgon(positions);
}
/**
 * Adds a new collection to the model.
 * @param __model__
 * @param objects List of points, polylines, polygons.
 * @returns New collection if successful, null if unsuccessful or on error.
 * @example collection1 = make.Collection([point1,polyine1,polygon1])
 *
 * Creates a collection containing point1, polyline1, polygon1.
 */
export function Collection(__model__: GIModel, objects: TId|TId[]): TId {
    throw new Error("Not implemented."); return null;
    // return __model__.geom.add.addColl(objects);
}
/**
 * Adds a new plane to the model (from a location and normal vector) or (from two vectors).
 * @param __model__
 * @param locationOrVector Position, point, vertex on plane; or a first vector or list of three coordinates.
 * @param vector Vector or list of three coordinates.
 * @returns New plane if successful, null if unsuccessful or on error.
 * @example plane1 = make.Plane(position1, vector1)
 *
 * Creates a plane with position1 on it and normal = vector1.
 *
 * @example plane2 = make.Plane(vector1,vector2)
 *
 * Creates a plane with vector1 and vector2 on it, and normal = cross product of both vectors.
 */
export function PlaneVisible(__model__: GIModel, locationOrVector: TId|Txyz, vector: TId|Txyz): TId {
    throw new Error("Not implemented."); return null;
}
/**
 * VectorVisible
 * @param __model__
 */
export function VectorVisible(__model__: GIModel, locationOrVector: TId|Txyz, vector: TId|Txyz): TId {
    throw new Error("Not implemented."); return null;
}
/**
 * Adds a new copy to the model.
 * @param __model__
 * @param objects Position, vertex, edge, wire, face, point, polyline, polygon, collection to be copied.
 * @returns New copy if successful, null if unsuccessful or on error.
 * @example copy1 = make.Copy([position1,polyine1,polygon1])
 *
 * Creates a list containing a copy of the objects in sequence of input.
 */
export function Copy(__model__: GIModel, objects: TId|TId[]): TId|TId[] {
    throw new Error("Not implemented."); return null;
}
