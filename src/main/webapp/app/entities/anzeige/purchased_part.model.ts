import { BaseEntity } from '../../shared';

export class PurchasedPart implements BaseEntity {

    constructor(
        public id?: number,
        public nummer?: number,
        public bestand?: number,
        public menge_alteBestellung?: number,
        public hoechstbestand?: number,
        public diskontmenge?: number,
        public lagerreichweite?: number,
        public durchschnittbedarf?: number,
        public periode?: number,
        public sicherheitsbestand?: number,
        public bestellpunkt?: number
    ) {}
}
