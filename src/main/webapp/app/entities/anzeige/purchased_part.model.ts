import { BaseEntity } from './../../shared';

export class PurchasedPart implements BaseEntity {
    
    constructor(
        public id?: number,
        public nummer?: string,
        public bestand?: number,
        public lieferdauer?: number,
        public diskontmenge?: number,
        public bruttobedarf?: number,
        public bestellung?: number,
        public art?: string,
        public periode?: number
    ) {}
}
