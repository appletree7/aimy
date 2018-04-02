import { BaseEntity } from './../../shared';

export const enum Teiltyp {
    'PRODUKT',
    'ERZEUGNIS',
    'KAUFTEIL'
}

export class Teil implements BaseEntity {
    constructor(
        public id?: number,
        public teiltyp?: Teiltyp,
        public periode?: number,
        public nummer?: number,
        public istmenge?: number,
        public startmenge?: number,
        public prozentsatz?: number,
        public lagerpreis?: number,
        public lagerwert?: number,
        public sicherheitsbestand?: number,
        public vertriebswunsch?: number,
        public gesamtproduktionsmenge?: number,
        public direktverkaufmenge?: number,
        public direktverkaufspreis?: number,
        public strafe?: number,
        public subkomponentes?: BaseEntity[],
    ) {
    }
}
