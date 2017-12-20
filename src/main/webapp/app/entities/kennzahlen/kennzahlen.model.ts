import { BaseEntity } from './../../shared';

export class Kennzahlen implements BaseEntity {
    constructor(
        public id?: number,
        public periode?: number,
        public name?: string,
        public aktuell?: number,
        public durchschnitt?: number,
        public gesamt?: number,
    ) {
    }
}
