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
        public nummer?: string,
        public istmenge?: number,
        public startmenge?: number,
        public prozentsatz?: number,
        public lagerpreis?: number,
        public lagerwert?: number,
        public sicherheitsbestand?: number,
        public vertriebswunsch?: number,
        public fertigungsauftrags?: BaseEntity[],
        public subkomponente?: BaseEntity,
        public arbeitsplatz?: BaseEntity,
    ) {
    }
}
