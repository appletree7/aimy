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
        public auftragsmenge?: number,
        public kostenprolos?: number,
        public durchschnittlichestueckkosten?: number,
        public auftragsstatus?: Auftragstatus,
        public begonnen?: string,
        public beendet?: string,
        public dlzminimal?: number,
        public dlzFaktor?: number,
        public nummer?: number,
        public los?: BaseEntity,
        public herstellteil?: BaseEntity,
    ) {
    }
}
