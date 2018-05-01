import { BaseEntity } from './../../shared';

export const enum Auftragstatus {
    'ANGEFANGEN',
    'WARTEND',
    'BEENDET'
}

export class Fertigungsauftrag implements BaseEntity {
    constructor(
        public id?: number,
        public periode?: number,
        public nummer?: number,
        public auftragsmenge?: number,
        public kosten?: number,
        public durchschnittlichestueckkosten?: number,
        public auftragsstatus?: Auftragstatus,
        public begonnen?: string,
        public beendet?: string,
        public dlzminimal?: number,
        public dlzFaktor?: number,
        public bearbeitungszeitmin?: number,
        public warteliste_menge?: number,
        public inBearbeitung_menge?: number,
        public herstellteil?: BaseEntity,
    ) {
    }
}
