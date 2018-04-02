import { BaseEntity } from './../../shared';

export const enum Bestellstatus {
    'GELIEFERT',
    'UNTERWEGS'
}

export class Bestellung implements BaseEntity {
    constructor(
        public id?: number,
        public periode?: number,
        public nummer?: number,
        public lieferzeit?: number,
        public kaufmenge?: number,
        public materialkosten?: number,
        public bestellkosten?: number,
        public gesamtkosten?: number,
        public stueckkosten?: number,
        public bestellstatus?: Bestellstatus,
        public modus?: BaseEntity,
        public kaufteil?: BaseEntity,
    ) {
    }
}
