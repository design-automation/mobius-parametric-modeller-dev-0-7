import { TTri, TVert, TEdge, TWire, TFace,
    TColl, IGeomData, TPoint, TPline, TPgon, Txyz, IGeomArrays, IGeomCopy, TAttribDataTypes, IGeomPack, TPosi, TPlane, EEntType } from './common';
import { GIGeom } from './GIGeom';
import { deepCopy } from '../util/copy';

/**
 * Class for geometry.
 */
export class GIGeomIO {
    private _geom: GIGeom;
    private _geom_arrays: IGeomArrays;
    /**
     * Constructor
     */
    constructor(geom: GIGeom, geom_arrays: IGeomArrays) {
        this._geom = geom;
        this._geom_arrays = geom_arrays;
    }


    /**
     * Adds data to this model from another model.
     * The existing data in the model is not deleted.
     * Both models may have deleted items, resulting in undefined values.
     * @param geom_arrays The geom_arrays of the other model.
     */
    public merge(geom_arrays: IGeomArrays): void {
        // ======================================================================
        // update down arrays
        // points
        _mergeEntArrays(this._geom_arrays.dn_points_verts, geom_arrays.dn_points_verts, EEntType.POINT);
        // plines
        _mergeEntArrays(this._geom_arrays.dn_plines_wires, geom_arrays.dn_plines_wires, EEntType.PLINE);
        // pgons
        _mergeEntArrays(this._geom_arrays.dn_pgons_faces, geom_arrays.dn_pgons_faces, EEntType.PGON);
        // colls
        _mergeEntArrays(this._geom_arrays.dn_colls_objs, geom_arrays.dn_colls_objs, EEntType.COLL);
        // vertices
        _mergeEntArrays(this._geom_arrays.dn_verts_posis, geom_arrays.dn_verts_posis, EEntType.VERT);
        // triangles
        _mergeEntArrays(this._geom_arrays.dn_tris_verts, geom_arrays.dn_tris_verts, EEntType.TRI);
        // edges
        _mergeEntArrays(this._geom_arrays.dn_edges_verts, geom_arrays.dn_edges_verts, EEntType.EDGE);
        // wires
        _mergeEntArrays(this._geom_arrays.dn_wires_edges, geom_arrays.dn_wires_edges, EEntType.WIRE);
        // faces
        _mergeEntArrays(this._geom_arrays.dn_faces_wirestris, geom_arrays.dn_faces_wirestris, EEntType.FACE);

        // ======================================================================
        // update up arrays
        // update posis to verts (they can be undefined or [])
        // this array is used to capture deleted posis
        _mergePosisArrays(this._geom_arrays.up_posis_verts, geom_arrays.up_posis_verts);
        // update verts to tris
        _mergeEntArrays(this._geom_arrays.up_verts_tris, geom_arrays.up_verts_tris, EEntType.VERT);
        // update tris to faces
        _mergeEntArrays(this._geom_arrays.up_tris_faces, geom_arrays.up_tris_faces, EEntType.TRI);
        // update verts to edges
        _mergeEntArrays(this._geom_arrays.up_verts_edges, geom_arrays.up_verts_edges, EEntType.VERT);
        // update edges to wires
        _mergeEntArrays(this._geom_arrays.up_edges_wires, geom_arrays.up_edges_wires, EEntType.EDGE);
        // update wires to faces
        _mergeEntArrays(this._geom_arrays.up_wires_faces, geom_arrays.up_wires_faces, EEntType.WIRE);
        // update verts to points
        _mergeEntArrays(this._geom_arrays.up_verts_points, geom_arrays.up_verts_points, EEntType.VERT);
        // update wires to plines
        _mergeEntArrays(this._geom_arrays.up_wires_plines, geom_arrays.up_wires_plines, EEntType.WIRE);
        // update faces to pgons
        _mergeEntArrays(this._geom_arrays.up_faces_pgons, geom_arrays.up_faces_pgons, EEntType.FACE);
        // update points to colls
        _mergeEntArrays(this._geom_arrays.up_points_colls, geom_arrays.up_points_colls, EEntType.POINT);
        // update plines to colls
        _mergeEntArrays(this._geom_arrays.up_plines_colls, geom_arrays.up_plines_colls, EEntType.PLINE);
        // update pgons to colls
        _mergeEntArrays(this._geom_arrays.up_pgons_colls, geom_arrays.up_pgons_colls, EEntType.PGON);
    }
    /**
     * Adds data to this model from another model.
     * The existing data in the model is not deleted.
     * Both models may have deleted items, resulting in undefined values.
     * @param geom_arrays The geom_arrays of the other model.
     */
    public merge2(geom_arrays: IGeomArrays): Map<number, number>[] {
        // get lengths of existing entities before we start adding stuff
        // const num_posis: number = this._geom_arrays.num_posis;
        const num_posis: number = this._geom_arrays.up_posis_verts.length;
        const num_verts: number = this._geom_arrays.dn_verts_posis.length;
        const num_tris: number = this._geom_arrays.dn_tris_verts.length;
        const num_edges: number = this._geom_arrays.dn_edges_verts.length;
        const num_wires: number = this._geom_arrays.dn_wires_edges.length;
        const num_faces: number = this._geom_arrays.dn_faces_wirestris.length;
        const num_points: number = this._geom_arrays.dn_points_verts.length;
        const num_plines: number = this._geom_arrays.dn_plines_wires.length;
        const num_pgons: number = this._geom_arrays.dn_pgons_faces.length;
        const num_colls: number = this._geom_arrays.dn_colls_objs.length;

        // for the down arrays, it is important the values are never undefined
        // if anything is deleted, then the value should be undefined
        // undefined cannot be exported as json

        // ======================================================================
        // update down arrays
        // and at the same time get maps for entities

        // positions
        const posis_map: Map<number, number> = new Map();
        for (let posi_i = 0; posi_i < geom_arrays.up_posis_verts.length; posi_i++) { // posis uses up array
            posis_map.set(posi_i, posi_i + num_posis);
        }
        // vertices
        const verts_map: Map<number, number> = new Map();
        for (let vert_i = 0; vert_i < geom_arrays.dn_verts_posis.length; vert_i++) {
            const new_vert_i: number = vert_i + num_verts;
            verts_map.set(vert_i, new_vert_i);
            const posi_i: TVert = geom_arrays.dn_verts_posis[vert_i];
            if (posi_i === null) {
                this._geom_arrays.dn_verts_posis[new_vert_i] = null;
            } else {
                this._geom_arrays.dn_verts_posis[new_vert_i] = posi_i + num_posis as TPosi;
            }
        }
        // triangles
        const tris_map: Map<number, number> = new Map();
        for (let tri_i = 0; tri_i < geom_arrays.dn_tris_verts.length; tri_i++) {
            const new_tri_i: number = tri_i + num_tris;
            tris_map.set(tri_i, tri_i + num_tris);
            const verts_i: TTri = geom_arrays.dn_tris_verts[tri_i];
            if (verts_i === null) {
                this._geom_arrays.dn_tris_verts[new_tri_i] = null;
            } else {
                this._geom_arrays.dn_tris_verts[new_tri_i] = verts_i.map(vert_i => vert_i + num_verts) as TTri;
            }
        }
        // edges
        const edges_map: Map<number, number> = new Map();
        for (let edge_i = 0; edge_i < geom_arrays.dn_edges_verts.length; edge_i++) {
            const new_edge_i: number = edge_i + num_edges;
            edges_map.set(edge_i, new_edge_i);
            const verts_i: TEdge = geom_arrays.dn_edges_verts[edge_i];
            if (verts_i === null) {
                this._geom_arrays.dn_edges_verts[new_edge_i] = null;
            } else {
                this._geom_arrays.dn_edges_verts[new_edge_i] = verts_i.map(vert_i => vert_i + num_verts) as TEdge;
            }
        }
        // wires
        const wires_map: Map<number, number> = new Map();
        for (let wire_i = 0; wire_i < geom_arrays.dn_wires_edges.length; wire_i++) {
            const new_wire_i: number = wire_i + num_wires;
            wires_map.set(wire_i, new_wire_i);
            const edges_i: TWire = geom_arrays.dn_wires_edges[wire_i];
            if (edges_i === null) {
                this._geom_arrays.dn_wires_edges[new_wire_i] = null;
            } else {
                this._geom_arrays.dn_wires_edges[new_wire_i] = edges_i.map(edge_i => edge_i + num_edges) as TWire;
            }
        }
        // faces
        const faces_map: Map<number, number> = new Map();
        for (let face_i = 0; face_i < geom_arrays.dn_faces_wirestris.length; face_i++) {
            const new_face_i: number = face_i + num_faces;
            faces_map.set(face_i, new_face_i);
            const wires_tris_i: TFace = geom_arrays.dn_faces_wirestris[face_i];
            if (wires_tris_i === null) {
                this._geom_arrays.dn_faces_wirestris[new_face_i] = null;
            } else {
                this._geom_arrays.dn_faces_wirestris[new_face_i] = [
                    wires_tris_i[0].map(wire_i => wire_i + num_wires),
                    wires_tris_i[1].map(tri_i => tri_i + num_tris)
                ] as TFace;
            }
        }
        // points
        const points_map: Map<number, number> = new Map();
        for (let point_i = 0; point_i < geom_arrays.dn_points_verts.length; point_i++) {
            const new_point_i: number = point_i + num_points;
            points_map.set(point_i, new_point_i);
            const vert_i: TPoint = geom_arrays.dn_points_verts[point_i];
            if (vert_i === null) {
                this._geom_arrays.dn_points_verts[new_point_i] = null;
            } else {
                this._geom_arrays.dn_points_verts[new_point_i] = vert_i + num_verts as TPoint;
            }
        }
        // plines
        const plines_map: Map<number, number> = new Map();
        for (let pline_i = 0; pline_i < geom_arrays.dn_plines_wires.length; pline_i++) {
            const new_pline_i: number = pline_i + num_plines;
            plines_map.set(pline_i, new_pline_i);

            const wire_i: TPline = geom_arrays.dn_plines_wires[pline_i];
            if (wire_i === null) {
                this._geom_arrays.dn_plines_wires[new_pline_i] = null;
            } else {
                this._geom_arrays.dn_plines_wires[new_pline_i] = wire_i + num_wires as TPline;
            }
        }
        // pgons
        const pgons_map: Map<number, number> = new Map();
        for (let pgon_i = 0; pgon_i < geom_arrays.dn_pgons_faces.length; pgon_i++) {
            const new_pgon_i: number = pgon_i + num_pgons;
            pgons_map.set(pgon_i, new_pgon_i);
            const face_i: TPgon = geom_arrays.dn_pgons_faces[pgon_i];
            if (face_i === null) {
                this._geom_arrays.dn_pgons_faces[new_pgon_i] = null;
            } else {
                this._geom_arrays.dn_pgons_faces[new_pgon_i] = face_i + num_faces as TPgon;
            }
        }
        // colls
        const colls_map: Map<number, number> = new Map();
        for (let coll_i = 0; coll_i < geom_arrays.dn_colls_objs.length; coll_i++) {
            const new_coll_i: number = coll_i + num_colls;
            colls_map.set(coll_i, new_coll_i);
            const objs_i: TColl = geom_arrays.dn_colls_objs[coll_i];
            if (objs_i === null) {
                this._geom_arrays.dn_colls_objs[new_coll_i] = null;
            } else {
                this._geom_arrays.dn_colls_objs[new_coll_i] = [
                    objs_i[0] === -1 ? -1 : objs_i[0] + num_colls,
                    objs_i[1].map(point_i => point_i + num_points),
                    objs_i[2].map(pline_i => pline_i + num_plines),
                    objs_i[3].map(pgon_i => pgon_i + num_pgons)
                ] as TColl;
            }
        }

        // create data to return
        const geom_maps: Map<number, number>[] = [
            posis_map,
            verts_map, edges_map, wires_map, faces_map,
            points_map, plines_map, pgons_map, colls_map
        ];

        // ======================================================================
        // update up arrays

        // undefined = no value
        // in typescript, undefined behaves in strange ways, try this
        //     const x = [0, undefined, 2, , 4];
        //     for (const i of x) { console.log("i in for loop:", i);}
        //     x.forEach(i => console.log("i in foreach loop:", i) );
        // for the undefined values, explicitly setting the value to undefined is not the same as not setting it at all
        // with a foreach loop, if there is no value, then it skips it completley
        // in this case, we want to make sure there is no value

        // update posis to verts (they can be null or [])
        // this array is used to capture deleted posis
        for (let posi_i = 0; posi_i < geom_arrays.up_posis_verts.length; posi_i++) {
            const verts_i: number[] = geom_arrays.up_posis_verts[posi_i];
            if (verts_i === undefined) {
                continue;
            } else if (verts_i === null) {
                this._geom_arrays.up_posis_verts[posis_map.get(posi_i)] = null;
            } else {
                const new_verts_i: number[] = verts_i.map( vert_i => verts_map.get(vert_i));
                this._geom_arrays.up_posis_verts[posis_map.get(posi_i)] = new_verts_i;
            }
        }
        // update verts to tris
        for (let vert_i = 0; vert_i < geom_arrays.up_verts_tris.length; vert_i++) {
            const tris_i: number[] = geom_arrays.up_verts_tris[vert_i];
            if (tris_i === undefined || tris_i === null) {
                continue;
            } else if (tris_i === null) {
                this._geom_arrays.up_verts_tris[verts_map.get(vert_i)] = null;
            } else {
                const new_tris_i: number[] = tris_i.map( tri_i => tris_map.get(tri_i));
                this._geom_arrays.up_verts_tris[verts_map.get(vert_i)] = new_tris_i;
            }
        }
        // update tris to faces
        for (let tri_i = 0; tri_i < geom_arrays.up_tris_faces.length; tri_i++) {
            const face_i: number = geom_arrays.up_tris_faces[tri_i];
            if (face_i === undefined || face_i === null) {
                continue;
            } else if (face_i === null) {
                this._geom_arrays.up_tris_faces[tris_map.get(tri_i)] = null;
            } else {
                const new_face_i: number = faces_map.get(face_i);
                this._geom_arrays.up_tris_faces[tris_map.get(tri_i)] = new_face_i;
            }
        }
        // update verts to edges
        for (let vert_i = 0; vert_i < geom_arrays.up_verts_edges.length; vert_i++) {
            const edges_i: number[] = geom_arrays.up_verts_edges[vert_i];
            if (edges_i === undefined || edges_i === null) {
                continue;
            } else if (edges_i === null) {
                this._geom_arrays.up_verts_edges[verts_map.get(vert_i)] = null;
            } else {
                const new_edges_i: number[] = edges_i.map( edge_i => edges_map.get(edge_i));
                this._geom_arrays.up_verts_edges[verts_map.get(vert_i)] = new_edges_i;
            }
        }
        // update edges to wires
        for (let edge_i = 0; edge_i < geom_arrays.up_edges_wires.length; edge_i++) {
            const wire_i: number = geom_arrays.up_edges_wires[edge_i];
            if (wire_i === undefined || wire_i === null) {
                continue;
            } else if (wire_i === null) {
                this._geom_arrays.up_edges_wires[edges_map.get(edge_i)] = null;
            } else {
                const new_wire_i: number = wires_map.get(wire_i);
                this._geom_arrays.up_edges_wires[edges_map.get(edge_i)] = new_wire_i;
            }
        }
        // update wires to faces
        for (let wire_i = 0; wire_i < geom_arrays.up_wires_faces.length; wire_i++) {
            const face_i: number = geom_arrays.up_wires_faces[wire_i];
            if (face_i === undefined || face_i === null) {
                continue;
            } else if (face_i === null) {
                this._geom_arrays.up_wires_faces[wires_map.get(wire_i)] = null;
            } else {
                const new_face_i: number = faces_map.get(face_i);
                this._geom_arrays.up_wires_faces[wires_map.get(wire_i)] = new_face_i;
            }
        }
        // update verts to points
        for (let vert_i = 0; vert_i < geom_arrays.up_verts_points.length; vert_i++) {
            const point_i: number = geom_arrays.up_verts_points[vert_i];
            if (point_i === undefined || point_i === null) {
                continue;
            } else if (point_i === null) {
                this._geom_arrays.up_verts_points[verts_map.get(vert_i)] = null;
            } else {
                const new_point_i: number = points_map.get(point_i);
                this._geom_arrays.up_verts_points[verts_map.get(vert_i)] = new_point_i;
            }
        }
        // update wires to plines
        for (let wire_i = 0; wire_i < geom_arrays.up_wires_plines.length; wire_i++) {
            const pline_i: number = geom_arrays.up_wires_plines[wire_i];
            if (pline_i === undefined || pline_i === null) {
                continue;
            } else if (pline_i === null) {
                this._geom_arrays.up_wires_plines[wires_map.get(wire_i)] = null;
            } else {
                const new_pline_i: number = plines_map.get(pline_i);
                this._geom_arrays.up_wires_plines[wires_map.get(wire_i)] = new_pline_i;
            }
        }
        // update faces to pgons
        for (let face_i = 0; face_i < geom_arrays.up_faces_pgons.length; face_i++) {
            const pgon_i: number = geom_arrays.up_faces_pgons[face_i];
            if (pgon_i === undefined || pgon_i === null) {
                continue;
            } else if (pgon_i === null) {
                this._geom_arrays.up_faces_pgons[faces_map.get(face_i)] = null;
            } else {
                const new_pgon_i: number = pgons_map.get(pgon_i);
                this._geom_arrays.up_faces_pgons[faces_map.get(face_i)] = new_pgon_i;
            }
        }
        // update points to colls
        for (let point_i = 0; point_i < geom_arrays.up_points_colls.length; point_i++) {
            const colls_i: number[] = geom_arrays.up_points_colls[point_i];
            if (colls_i === undefined || colls_i === null) {
                continue;
            } else if (colls_i === null) {
                this._geom_arrays.up_points_colls[points_map.get(point_i)] = null;
            } else {
                const new_colls_i: number[] = colls_i.map(coll_i => colls_map.get(coll_i));
                this._geom_arrays.up_points_colls[points_map.get(point_i)] = new_colls_i;
            }
        }
        // update plines to colls
        for (let pline_i = 0; pline_i < geom_arrays.up_plines_colls.length; pline_i++) {
            const colls_i: number[] = geom_arrays.up_plines_colls[pline_i];
            if (colls_i === undefined || colls_i === null) {
                continue;
            } else if (colls_i === null) {
                this._geom_arrays.up_plines_colls[plines_map.get(pline_i)] = null;
            } else {
                const new_colls_i: number[] = colls_i.map(coll_i => colls_map.get(coll_i));
                this._geom_arrays.up_plines_colls[plines_map.get(pline_i)] = new_colls_i;
            }
        }
        // update pgons to colls
        for (let pgon_i = 0; pgon_i < geom_arrays.up_pgons_colls.length; pgon_i++) {
            const colls_i: number[] = geom_arrays.up_pgons_colls[pgon_i];
            if (colls_i === undefined || colls_i === null) {
                continue;
            } else if (colls_i === null) {
                this._geom_arrays.up_pgons_colls[pgons_map.get(pgon_i)] = null;
            } else {
                const new_colls_i: number[] = colls_i.map(coll_i => colls_map.get(coll_i));
                this._geom_arrays.up_pgons_colls[pgons_map.get(pgon_i)] = new_colls_i;
            }
        }
        // return the maps
        return geom_maps;
    }

    /**
     * Adds data to this model from another model.
     * The existing data in the model is not deleted.
     * Both models may have deleted entities, resulting in null values.
     * The deleted entities in the other model are filtered out (i.e. not merged).
     * @param geom_arrays The geom_arrays of the other model.
     */
    public mergeAndPurge(geom_arrays: IGeomArrays): Map<number, number>[] {
        // get lengths of existing entities before we start adding stuff
        // const num_posis: number = this._geom_arrays.num_posis;
        const num_posis: number = this._geom_arrays.up_posis_verts.length;
        const num_verts: number = this._geom_arrays.dn_verts_posis.length;
        const num_tris: number = this._geom_arrays.dn_tris_verts.length;
        const num_edges: number = this._geom_arrays.dn_edges_verts.length;
        const num_wires: number = this._geom_arrays.dn_wires_edges.length;
        const num_faces: number = this._geom_arrays.dn_faces_wirestris.length;
        const num_points: number = this._geom_arrays.dn_points_verts.length;
        const num_plines: number = this._geom_arrays.dn_plines_wires.length;
        const num_pgons: number = this._geom_arrays.dn_pgons_faces.length;
        const num_colls: number = this._geom_arrays.dn_colls_objs.length;

        // for the down arrays, it is important the values are never undefined
        // undefined cannot be exported as json
        // if anything is deleted, then the value should be null

        // ======================================================================

        // get maps for entities skipping deleted

        // positions
        const posis_map: Map<number, number> = new Map();
        let posis_count = 0;
        for (let posi_i = 0; posi_i < geom_arrays.up_posis_verts.length; posi_i++) { // posis uses up array
            if (geom_arrays.up_posis_verts[posi_i] === undefined || geom_arrays.up_posis_verts[posi_i] === null) {
                continue;
            } else {
                posis_map.set(posi_i, posis_count + num_posis);
                posis_count += 1;
            }
        }

        // vertices
        const verts_map: Map<number, number> = new Map();
        let vert_count = 0;
        for (let vert_i = 0; vert_i < geom_arrays.dn_verts_posis.length; vert_i++) {
            if (geom_arrays.dn_verts_posis[vert_i] === undefined || geom_arrays.dn_verts_posis[vert_i] === null) {
                continue;
            } else {
                verts_map.set(vert_i, vert_count + num_verts);
                vert_count += 1;
            }
        }

        // triangles
        const tris_map: Map<number, number> = new Map();
        let tris_count = 0;
        for (let tri_i = 0; tri_i < geom_arrays.dn_tris_verts.length; tri_i++) {
            if (geom_arrays.dn_tris_verts[tri_i] === undefined || geom_arrays.dn_tris_verts[tri_i] === null) {
                continue;
            } else {
                tris_map.set(tri_i, tris_count + num_tris);
                tris_count += 1;
            }
        }

        // edges
        const edges_map: Map<number, number> = new Map();
        let edges_count = 0;
        for (let edge_i = 0; edge_i < geom_arrays.dn_edges_verts.length; edge_i++) {
            if (geom_arrays.dn_edges_verts[edge_i] === undefined || geom_arrays.dn_edges_verts[edge_i] === null) {
                continue;
            } else {
                edges_map.set(edge_i, edges_count + num_edges);
                edges_count += 1;
            }
        }

        // wires
        const wires_map: Map<number, number> = new Map();
        let wires_count = 0;
        for (let wire_i = 0; wire_i < geom_arrays.dn_wires_edges.length; wire_i++) {
            if (geom_arrays.dn_wires_edges[wire_i] === undefined || geom_arrays.dn_wires_edges[wire_i] === null) {
                continue;
            } else {
                wires_map.set(wire_i, wires_count + num_wires);
                wires_count += 1;
            }
        }

        // faces
        const faces_map: Map<number, number> = new Map();
        let faces_count = 0;
        for (let face_i = 0; face_i < geom_arrays.dn_faces_wirestris.length; face_i++) {
            if (geom_arrays.dn_faces_wirestris[face_i] === undefined || geom_arrays.dn_faces_wirestris[face_i] === null) {
                continue;
            } else {
                faces_map.set(face_i, faces_count + num_faces);
                faces_count += 1;
            }
        }

        // points
        const points_map: Map<number, number> = new Map();
        let points_count = 0;
        for (let point_i = 0; point_i < geom_arrays.dn_points_verts.length; point_i++) {
            if (geom_arrays.dn_points_verts[point_i] === undefined || geom_arrays.dn_points_verts[point_i] === null) {
                continue;
            } else {
                points_map.set(point_i, points_count + num_points);
                points_count += 1;
            }
        }

        // plines
        const plines_map: Map<number, number> = new Map();
        let plines_count = 0;
        for (let pline_i = 0; pline_i < geom_arrays.dn_plines_wires.length; pline_i++) {
            if (geom_arrays.dn_plines_wires[pline_i] === undefined || geom_arrays.dn_plines_wires[pline_i] === null) {
                continue;
            } else {
                plines_map.set(pline_i, plines_count + num_plines);
                plines_count += 1;
            }
        }

        // pgons
        const pgons_map: Map<number, number> = new Map();
        let pgons_count = 0;
        for (let pgon_i = 0; pgon_i < geom_arrays.dn_pgons_faces.length; pgon_i++) {
            if (geom_arrays.dn_pgons_faces[pgon_i] === undefined || geom_arrays.dn_pgons_faces[pgon_i] === null) {
                continue;
            } else {
                pgons_map.set(pgon_i, pgons_count + num_pgons);
                pgons_count += 1;
            }
        }

        // colls
        const colls_map: Map<number, number> = new Map();
        let colls_count = 0;
        for (let coll_i = 0; coll_i < geom_arrays.dn_colls_objs.length; coll_i++) {
            if (geom_arrays.dn_colls_objs[coll_i] === undefined || geom_arrays.dn_colls_objs[coll_i] === null) {
                continue;
            } else {
                colls_map.set(coll_i, colls_count + num_colls);
                colls_count += 1;
            }
        }

        // create data to return
        const geom_maps: Map<number, number>[] = [
            posis_map,
            verts_map, edges_map, wires_map, faces_map,
            points_map, plines_map, pgons_map, colls_map
        ];

        // ======================================================================
        // update down arrays

        // add vertices to model
        for (const posi_i of geom_arrays.dn_verts_posis) {
            if (posi_i === undefined || posi_i === null) {
                continue;
            } else {
                const new_vert: TVert = posis_map.get(posi_i) as TVert;
                this._geom_arrays.dn_verts_posis.push( new_vert );
            }
        }
        // add triangles to model
        for (const verts_i of geom_arrays.dn_tris_verts) {
            if (verts_i === undefined || verts_i === null) {
                continue;
            } else {
                const new_triangle: TTri = verts_i.map(vert_i => verts_map.get(vert_i)) as TTri;
                this._geom_arrays.dn_tris_verts.push( new_triangle );
            }
        }
        // add edges to model
        for (const verts_i of geom_arrays.dn_edges_verts) {
            if (verts_i === undefined || verts_i === null) {
                continue;
            } else {
                const new_edge: TEdge = verts_i.map(vert_i => verts_map.get(vert_i)) as TEdge;
                this._geom_arrays.dn_edges_verts.push( new_edge );
            }
        }
        // add wires to model
        for (const edges_i of geom_arrays.dn_wires_edges) {
            if (edges_i === undefined || edges_i === null) {
                continue;
            } else {
                const new_wire: TWire = edges_i.map(edge_i => edges_map.get(edge_i)) as TWire;
                this._geom_arrays.dn_wires_edges.push( new_wire );
            }
        }
        // add faces to model
        for (const wires_tris_i of geom_arrays.dn_faces_wirestris) {
            if (wires_tris_i === undefined || wires_tris_i === null) {
                continue;
            } else {
                const new_face: TFace = [
                    wires_tris_i[0].map( wire_i => wires_map.get(wire_i)),
                    wires_tris_i[1].map( tri_i => tris_map.get(tri_i))
                ] as TFace;
                this._geom_arrays.dn_faces_wirestris.push( new_face );
            }
        }
        // add points to model
        for (const vert_i of geom_arrays.dn_points_verts) {
            if (vert_i === undefined || vert_i === null) {
                continue;
            } else {
                const new_point: TPoint = verts_map.get(vert_i) as TPoint;
                this._geom_arrays.dn_points_verts.push( new_point );
            }
        }
        // add plines to model
        for (const wire_i of geom_arrays.dn_plines_wires) {
            if (wire_i === undefined || wire_i === null) {
                continue;
            } else {
                const new_pline: TPline = wires_map.get(wire_i) as TPline;
                this._geom_arrays.dn_plines_wires.push( new_pline );
            }
        }
        // add pgons to model
        for (const face_i of geom_arrays.dn_pgons_faces) {
            if (face_i === undefined || face_i === null) {
                continue;
            } else {
                const new_pgon: TPgon = faces_map.get(face_i) as TPgon;
                this._geom_arrays.dn_pgons_faces.push( new_pgon );
            }
        }
        // add collections to model
        for (const coll of geom_arrays.dn_colls_objs) {
            if (coll === undefined || coll === null) {
                continue;
            } else {
                const parent: number = (coll[0] === -1) ? -1 : colls_map.get(coll[0]);
                const coll_points_i: number[] = coll[1].map( point_i => points_map.get(point_i));
                const coll_plines_i: number[] = coll[2].map( pline_i => plines_map.get(pline_i));
                const coll_pgons_i: number[] = coll[3].map( pgon_i => pgons_map.get(pgon_i));
                const new_coll: TColl = [parent, coll_points_i, coll_plines_i, coll_pgons_i];
                this._geom_arrays.dn_colls_objs.push( new_coll );
            }
        }

        // ======================================================================
        // update up arrays

        // undefined = no value
        // in typescript, undefined behaves in strange ways, try this
        //     const x = [0, undefined, 2, , 4];
        //     for (const i of x) { console.log("i in for loop:", i);}
        //     x.forEach(i => console.log("i in foreach loop:", i) );
        // for the undefined values, explicitly setting the value to undefined is not the same as not setting it at all
        // with a foreach loop, if there is no value, then it skips it completley
        // in this case, we want to make sure there is no value

        // update posis to verts (they can be null or [])
        // this array is used to capture deleted posis
        for (let posi_i = 0; posi_i < geom_arrays.up_posis_verts.length; posi_i++) {
            const verts_i: number[] = geom_arrays.up_posis_verts[posi_i];
            if (verts_i === undefined || verts_i === null) {
                continue;
            } else {
                const new_verts_i: number[] = verts_i.map( vert_i => verts_map.get(vert_i));
                this._geom_arrays.up_posis_verts[posis_map.get(posi_i)] = new_verts_i;
            }
        }
        // update verts to tris
        for (let vert_i = 0; vert_i < geom_arrays.up_verts_tris.length; vert_i++) {
            const tris_i: number[] = geom_arrays.up_verts_tris[vert_i];
            if (tris_i === undefined || tris_i === null) {
                continue;
            } else {
                const new_tris_i: number[] = tris_i.map( tri_i => tris_map.get(tri_i));
                this._geom_arrays.up_verts_tris[verts_map.get(vert_i)] = new_tris_i;
            }
        }
        // update tris to faces
        for (let tri_i = 0; tri_i < geom_arrays.up_tris_faces.length; tri_i++) {
            const face_i: number = geom_arrays.up_tris_faces[tri_i];
            if (face_i === undefined || face_i === null) {
                continue;
            } else {
                const new_face_i: number = faces_map.get(face_i);
                this._geom_arrays.up_tris_faces[tris_map.get(tri_i)] = new_face_i;
            }
        }
        // update verts to edges
        for (let vert_i = 0; vert_i < geom_arrays.up_verts_edges.length; vert_i++) {
            const edges_i: number[] = geom_arrays.up_verts_edges[vert_i];
            if (edges_i === undefined || edges_i === null) {
                continue;
            } else {
                const new_edges_i: number[] = edges_i.map( edge_i => edges_map.get(edge_i));
                this._geom_arrays.up_verts_edges[verts_map.get(vert_i)] = new_edges_i;
            }
        }
        // update edges to wires
        for (let edge_i = 0; edge_i < geom_arrays.up_edges_wires.length; edge_i++) {
            const wire_i: number = geom_arrays.up_edges_wires[edge_i];
            if (wire_i === undefined || wire_i === null) {
                continue;
            } else {
                const new_wire_i: number = wires_map.get(wire_i);
                this._geom_arrays.up_edges_wires[edges_map.get(edge_i)] = new_wire_i;
            }
        }
        // update wires to faces
        for (let wire_i = 0; wire_i < geom_arrays.up_wires_faces.length; wire_i++) {
            const face_i: number = geom_arrays.up_wires_faces[wire_i];
            if (face_i === undefined || face_i === null) {
                continue;
            } else {
                const new_face_i: number = faces_map.get(face_i);
                this._geom_arrays.up_wires_faces[wires_map.get(wire_i)] = new_face_i;
            }
        }
        // update verts to points
        for (let vert_i = 0; vert_i < geom_arrays.up_verts_points.length; vert_i++) {
            const point_i: number = geom_arrays.up_verts_points[vert_i];
            if (point_i === undefined || point_i === null) {
                continue;
            } else {
                const new_point_i: number = points_map.get(point_i);
                this._geom_arrays.up_verts_points[verts_map.get(vert_i)] = new_point_i;
            }
        }
        // update wires to plines
        for (let wire_i = 0; wire_i < geom_arrays.up_wires_plines.length; wire_i++) {
            const pline_i: number = geom_arrays.up_wires_plines[wire_i];
            if (pline_i === undefined || pline_i === null) {
                continue;
            } else {
                const new_pline_i: number = plines_map.get(pline_i);
                this._geom_arrays.up_wires_plines[wires_map.get(wire_i)] = new_pline_i;
            }
        }
        // update faces to pgons
        for (let face_i = 0; face_i < geom_arrays.up_faces_pgons.length; face_i++) {
            const pgon_i: number = geom_arrays.up_faces_pgons[face_i];
            if (pgon_i === undefined || pgon_i === null) {
                continue;
            } else {
                const new_pgon_i: number = pgons_map.get(pgon_i);
                this._geom_arrays.up_faces_pgons[faces_map.get(face_i)] = new_pgon_i;
            }
        }
        // update points to colls
        for (let point_i = 0; point_i < geom_arrays.up_points_colls.length; point_i++) {
            const colls_i: number[] = geom_arrays.up_points_colls[point_i];
            if (colls_i === undefined || colls_i === null) {
                continue;
            } else {
                const new_colls_i: number[] = colls_i.map(coll_i => colls_map.get(coll_i));
                this._geom_arrays.up_points_colls[points_map.get(point_i)] = new_colls_i;
            }
        }
        // update plines to colls
        for (let pline_i = 0; pline_i < geom_arrays.up_plines_colls.length; pline_i++) {
            const colls_i: number[] = geom_arrays.up_plines_colls[pline_i];
            if (colls_i === undefined || colls_i === null) {
                continue;
            } else {
                const new_colls_i: number[] = colls_i.map(coll_i => colls_map.get(coll_i));
                this._geom_arrays.up_plines_colls[plines_map.get(pline_i)] = new_colls_i;
            }
        }
        // update pgons to colls
        for (let pgon_i = 0; pgon_i < geom_arrays.up_pgons_colls.length; pgon_i++) {
            const colls_i: number[] = geom_arrays.up_pgons_colls[pgon_i];
            if (colls_i === undefined || colls_i === null) {
                continue;
            } else {
                const new_colls_i: number[] = colls_i.map(coll_i => colls_map.get(coll_i));
                this._geom_arrays.up_pgons_colls[pgons_map.get(pgon_i)] = new_colls_i;
            }
        }
        // return teh maps
        return geom_maps;
    }
    /**
     * Sets the data in this model from JSON data.
     * The existing data in the model is deleted.
     * @param geom_data The JSON data
     */
    public setData(geom_data: IGeomData): IGeomPack {
        // update the down arrays
        // add vertices to model
        this._geom_arrays.dn_verts_posis = [];
        for (let i = 0; i < geom_data.verts.length; i++) {
            this._geom_arrays.dn_verts_posis[geom_data.verts_i[i]] = geom_data.verts[i];
        }
        // add triangles to model
        this._geom_arrays.dn_tris_verts = [];
        for (let i = 0; i < geom_data.tris.length; i++) {
            this._geom_arrays.dn_tris_verts[geom_data.tris_i[i]] = geom_data.tris[i];
        }
        // add edges to model
        this._geom_arrays.dn_edges_verts = [];
        for (let i = 0; i < geom_data.edges.length; i++) {
            this._geom_arrays.dn_edges_verts[geom_data.edges_i[i]] = geom_data.edges[i];
        }
        // add wires to model
        this._geom_arrays.dn_wires_edges = [];
        for (let i = 0; i < geom_data.wires.length; i++) {
            this._geom_arrays.dn_wires_edges[geom_data.wires_i[i]] = geom_data.wires[i];
        }
        // add faces to model
        this._geom_arrays.dn_faces_wirestris = [];
        for (let i = 0; i < geom_data.faces.length; i++) {
            this._geom_arrays.dn_faces_wirestris[geom_data.faces_i[i]] = geom_data.faces[i];
        }
        // add points to model
        this._geom_arrays.dn_points_verts = [];
        for (let i = 0; i < geom_data.points.length; i++) {
            this._geom_arrays.dn_points_verts[geom_data.points_i[i]] = geom_data.points[i];
        }
        // add lines to model
        this._geom_arrays.dn_plines_wires = [];
        for (let i = 0; i < geom_data.plines.length; i++) {
            this._geom_arrays.dn_plines_wires[geom_data.plines_i[i]] = geom_data.plines[i];
        }
        // add pgons to model
        this._geom_arrays.dn_pgons_faces = [];
        for (let i = 0; i < geom_data.pgons.length; i++) {
            this._geom_arrays.dn_pgons_faces[geom_data.pgons_i[i]] = geom_data.pgons[i];
        }
        // add collections to model
        this._geom_arrays.dn_colls_objs = [];
        for (let i = 0; i < geom_data.colls.length; i++) {
            this._geom_arrays.dn_colls_objs[geom_data.colls_i[i]] = geom_data.colls[i];
        }
        // set selected
        this._geom.selected = geom_data.selected;
        // ========================================================================================
        // update the up arrays
        // posis->verts, create empty []
        this._geom_arrays.up_posis_verts = [];
        for (let i = 0; i < geom_data.posis_i.length; i++) {
            this._geom_arrays.up_posis_verts[geom_data.posis_i[i]] = [];
        }
        // posis->verts
        this._geom_arrays.dn_verts_posis.forEach( (posi_i, vert_i) => { // val, index
            this._geom_arrays.up_posis_verts[posi_i].push(vert_i);
        });
        // verts->tris, one to many
        this._geom_arrays.up_verts_tris = [];
        this._geom_arrays.dn_tris_verts.forEach( (vert_i_arr, tri_i) => { // val, index
            vert_i_arr.forEach( vert_i => {
                if (this._geom_arrays.up_verts_tris[vert_i] === undefined) {
                    this._geom_arrays.up_verts_tris[vert_i] = [];
                }
                this._geom_arrays.up_verts_tris[vert_i].push(tri_i);
            });
        });
        // verts->edges, one to two
        // order is important
        this._geom_arrays.up_verts_edges = [];
        this._geom_arrays.dn_edges_verts.forEach( (vert_i_arr, edge_i) => { // val, index
            vert_i_arr.forEach( (vert_i, index) => {
                if (this._geom_arrays.up_verts_edges[vert_i] === undefined) {
                    this._geom_arrays.up_verts_edges[vert_i] = [];
                }
                if (index === 0) {
                    this._geom_arrays.up_verts_edges[vert_i].push(edge_i);
                } else if (index === 1) {
                    this._geom_arrays.up_verts_edges[vert_i].splice(0, 0, edge_i);
                }
                if (index > 1) {
                    throw new Error('Import data error: Found an edge with more than two vertices.');
                }
            });
        });
        // edges->wires
        this._geom_arrays.up_edges_wires = [];
        this._geom_arrays.dn_wires_edges.forEach( (edge_i_arr, wire_i) => { // val, index
            edge_i_arr.forEach( edge_i => {
                this._geom_arrays.up_edges_wires[edge_i] = wire_i;
            });
        });
        // wires->faces, tris->faces, faces->wirestris
        this._geom_arrays.up_wires_faces = [];
        this._geom_arrays.up_tris_faces = [];
        this._geom_arrays.dn_faces_wirestris.forEach( (face, face_i) => { // val, index
            const [wire_i_arr, tri_i_arr] = face;
            wire_i_arr.forEach( wire_i => {
                this._geom_arrays.up_wires_faces[wire_i] = face_i;
            });
            tri_i_arr.forEach( tri_i => {
                this._geom_arrays.up_tris_faces[tri_i] = face_i;
            });
        });
        // points, lines, polygons
        this._geom_arrays.up_verts_points = [];
        this._geom_arrays.dn_points_verts.forEach( (vert_i, point_i) => { // val, index
            this._geom_arrays.up_verts_points[vert_i] = point_i;
        });
        this._geom_arrays.up_wires_plines = [];
        this._geom_arrays.dn_plines_wires.forEach( (wire_i, line_i) => { // val, index
            this._geom_arrays.up_wires_plines[wire_i] = line_i;
        });
        this._geom_arrays.up_faces_pgons = [];
        this._geom_arrays.dn_pgons_faces.forEach( (face_i, pgon_i) => { // val, index
            this._geom_arrays.up_faces_pgons[face_i] = pgon_i;
        });
        // collections of points, polylines, polygons
        this._geom_arrays.up_points_colls = [];
        this._geom_arrays.up_plines_colls = [];
        this._geom_arrays.up_pgons_colls = [];
        this._geom_arrays.dn_colls_objs.forEach( (coll, coll_i) => { // val, index
            const [parent, point_i_arr, pline_i_arr, pgon_i_arr] = coll;
            point_i_arr.forEach( point_i => {
                if (this._geom_arrays.up_points_colls[point_i] === undefined) {
                    this._geom_arrays.up_points_colls[point_i] = [coll_i];
                } else {
                    this._geom_arrays.up_points_colls[point_i].push(coll_i);
                }
            });
            pline_i_arr.forEach( pline_i => {
                if (this._geom_arrays.up_plines_colls[pline_i] === undefined) {
                    this._geom_arrays.up_plines_colls[pline_i] = [coll_i];
                } else {
                    this._geom_arrays.up_plines_colls[pline_i].push(coll_i);
                }
            });
            pgon_i_arr.forEach( pgon_i => {
                if (this._geom_arrays.up_pgons_colls[pgon_i] === undefined) {
                    this._geom_arrays.up_pgons_colls[pgon_i] = [coll_i];
                } else {
                    this._geom_arrays.up_pgons_colls[pgon_i].push(coll_i);
                }
            });
        });
        // return data
        return {
            posis_i: geom_data.posis_i,
            points_i: geom_data.points_i,
            plines_i: geom_data.plines_i,
            pgons_i: geom_data.pgons_i,
            colls_i: geom_data.colls_i
        };
    }
    /**
     * Returns the JSON data for this model.
     */
    public getData(): IGeomData {
        const data: IGeomData = {
            posis_i: [],
            verts: [], verts_i: [],
            tris: [], tris_i: [],
            edges: [], edges_i: [],
            wires: [], wires_i: [],
            faces: [], faces_i: [],
            points: [], points_i: [],
            plines: [], plines_i: [],
            pgons: [], pgons_i: [],
            colls: [], colls_i: [],
            selected: this._geom.selected
        };
        this._geom_arrays.up_posis_verts.forEach( (ent, i) => {
            data.posis_i.push(i);
        });
        this._geom_arrays.dn_verts_posis.forEach( (ent, i) => {
            data.verts.push(ent);
            data.verts_i.push(i);
        });
        this._geom_arrays.dn_tris_verts.forEach( (ent, i) => {
            data.tris.push(ent);
            data.tris_i.push(i);
        });
        this._geom_arrays.dn_edges_verts.forEach( (ent, i) => {
            data.edges.push(ent);
            data.edges_i.push(i);
        });
        this._geom_arrays.dn_wires_edges.forEach( (ent, i) => {
            data.wires.push(ent);
            data.wires_i.push(i);
        });
        this._geom_arrays.dn_faces_wirestris.forEach( (ent, i) => {
            data.faces.push(ent);
            data.faces_i.push(i);
        });
        this._geom_arrays.dn_points_verts.forEach( (ent, i) => {
            data.points.push(ent);
            data.points_i.push(i);
        });
        this._geom_arrays.dn_plines_wires.forEach( (ent, i) => {
            data.plines.push(ent);
            data.plines_i.push(i);
        });
        this._geom_arrays.dn_pgons_faces.forEach( (ent, i) => {
            data.pgons.push(ent);
            data.pgons_i.push(i);
        });
        this._geom_arrays.dn_colls_objs.forEach( (ent, i) => {
            data.colls.push(ent);
            data.colls_i.push(i);
        });
        return data;
    }
}

// utility function
function _mergeEntArrays(arr1: any[], arr2: any[], type: EEntType): void {
    // for (let i = 0; i < arr2.length; i++) {
    //     if (arr2[i] !== undefined && arr2[i] !== null) {
    //         if (arr1[i] !== undefined && arr1[i] !== null) {
    //             throw new Error('Conflict merging ' + _getEntTypeStr(type) + '.'); 
    //             // + JSON.stringify(arr1) + JSON.stringify(arr2));
    //         }
    //         arr1[i] = _deepCopy(arr2[i]);
    //     }
    // }
    // for (const i in arr2) {
    //     if (arr2[i] !== undefined && arr2[i] !== null) {
    //         if (arr1[i] !== undefined && arr1[i] !== null) {
    //             throw new Error('Conflict merging ' + _getEntTypeStr(type) + '.'); 
    //             // + JSON.stringify(arr1) + JSON.stringify(arr2));
    //         }
    //         arr1[i] = _deepCopy(arr2[i]);
    //     }
    // }
    // for (const i in arr2) { // forin loop
    //     if (arr2[i] !== undefined) {
    //         if (arr1[i] !== undefined) {
    //             throw new Error('Conflict merging ' + _getEntTypeStr(type) + '.'); 
    //             // + JSON.stringify(arr1) + JSON.stringify(arr2));
    //         }
    //         arr1[i] = _deepCopy(arr2[i]);
    //     }
    // }
    arr2.forEach( (ent, ent_i) => {
        if (arr1[ent_i] !== undefined) {
            throw new Error('Conflict merging ' + _getEntTypeStr(type) + '.');
        }
        arr1[ent_i] = _deepCopy(ent);
    });
}
function _mergePosisArrays(arr1: any[], arr2: any[]): void {
    // for (let i = 0; i < arr2.length; i++) {
    //     if (arr2[i] !== undefined && arr2[i] !== null) {
    //         if (arr1[i] !== undefined && arr1[i] !== null) {
    //             const verts_i_set: Set<number> = new Set(arr1[i]);
    //             for (const vert_i of arr2[i]) {
    //                 verts_i_set.add(vert_i);
    //             }
    //             arr1[i] = Array.from(verts_i_set);
    //         }
    //         arr1[i] = _deepCopy(arr2[i]);
    //     }
    // }
    // for (const i in arr2) {
    //     if (arr2[i] !== undefined && arr2[i] !== null) {
    //         if (arr1[i] !== undefined && arr1[i] !== null) {
    //             const verts_i_set: Set<number> = new Set(arr1[i]);
    //             for (const vert_i of arr2[i]) {
    //                 verts_i_set.add(vert_i);
    //             }
    //             arr1[i] = Array.from(verts_i_set);
    //         }
    //         arr1[i] = _deepCopy(arr2[i]);
    //     }
    // }
    // for (const i in arr2) { // forin loop
    //     if (arr2[i] !== undefined) {
    //         if (arr1[i] !== undefined) {
    //             const verts_i_set: Set<number> = new Set(arr1[i]);
    //             for (const vert_i of arr2[i]) {
    //                 verts_i_set.add(vert_i);
    //             }
    //             arr1[i] = Array.from(verts_i_set);
    //         }
    //         arr1[i] = _deepCopy(arr2[i]);
    //     }
    // }
    arr2.forEach( (verts_i, posi_i) => {
        if (arr1[posi_i] !== undefined) {
            const verts_i_set: Set<number> = new Set(arr1[posi_i]);
            for (const vert_i of verts_i) {
                verts_i_set.add(vert_i);
            }
            arr1[posi_i] = Array.from(verts_i_set);
        } else {
            arr1[posi_i] = _deepCopy(verts_i);
        }
    });
}
function _deepCopy(data: any) {
    if (Array.isArray(data)) {
        const copy = [];
        for (let i = 0, len = data.length; i < len; i++) {
            copy[i] = _deepCopy(data[i]);
        }
        return copy;
    }
    return data;
}
function _getEntTypeStr(ent_type_str: EEntType): string {
    switch (ent_type_str) {
        case EEntType.POSI:
            return 'positions';
        case EEntType.VERT:
            return 'vertices';
        case EEntType.TRI:
            return 'triangles';
        case EEntType.EDGE:
            return 'edges';
        case EEntType.WIRE:
            return 'wires';
        case EEntType.FACE:
            return 'faces';
        case EEntType.POINT:
            return 'points';
        case EEntType.PLINE:
            return 'polylines';
        case EEntType.PGON:
            return 'polygons';
        case EEntType.COLL:
            return 'collections';
    }
}
