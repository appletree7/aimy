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
        public vertriebswunsch_naechste?: number,
        public vertriebswunsch_uebernaechste?: number,
        public vertriebswunsch_ueberuebernaechste?: number,
        public gesamtproduktionsmenge?: number,
        public direktverkaufmenge?: number,
        public direktverkaufspreis?: number,
        public strafe?: number,
        public warteliste_menge?: number,
        public inBearbeitung_menge?: number,
    ) {
    }
}
