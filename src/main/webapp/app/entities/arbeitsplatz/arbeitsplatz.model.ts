import { BaseEntity } from './../../shared';

export class Arbeitsplatz implements BaseEntity {
    constructor(
        public id?: number,
        public periode?: number,
        public nummer?: number,
        public restzeitbedarf?: number,
        public ruestvorgaenge?: number,
        public leerzeit?: number,
        public lohnleerkosten?: number,
        public lohnkosten?: number,
        public maschinenstillstandkosten?: number,
        public restzeitbedarf_in_bearbeitung?: number,
        public schicht?: number,
        public ueberstunden?: number,
        public teils?: BaseEntity[],
    ) {
    }
}
