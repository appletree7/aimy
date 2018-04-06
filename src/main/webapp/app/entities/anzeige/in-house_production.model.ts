import { BaseEntity } from './../../shared';

export class InHouse implements BaseEntity {
    
    constructor(
        public id?: number,
        public nummer?: string,
        public vertriebswunsch?: number,
        public sicherheitsbestand?: number,
        public bestand_vorperiode?: number,
        public auftraege_in_warteliste?: number,
        public auftraege_in_bearbeitung?: number,
        public produktionsauftraege?: number,
        public periode?: number
    ) {}
}
