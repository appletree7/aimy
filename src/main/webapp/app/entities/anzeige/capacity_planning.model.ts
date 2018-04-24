import { BaseEntity } from '../../shared';

export class Capacity implements BaseEntity {

    constructor(
        public id?: number,
        public arbeitsplatznummer?: number,
        public kapazitaetsbedarf_neu?: number,
        public ruestzeit_neu?: number,
        public kapazitaetsbedarf_alt?: number,
        public ruestzeit_alt?: number,
        public gesamter_kapazitaetsbedarf?: number,
        public schichten?: number,
        public ueberstunden?: number,
        public periode?: number
    ) {}
}
