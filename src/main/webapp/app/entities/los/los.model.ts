import { BaseEntity } from './../../shared';

export class Los implements BaseEntity {
    constructor(
        public id?: number,
        public periode?: number,
        public menge?: number,
        public durchlaufzeit?: number,
        public kosten?: number,
        public nummer?: number,
    ) {
    }
}
