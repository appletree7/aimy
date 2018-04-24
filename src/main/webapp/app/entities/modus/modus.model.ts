import { BaseEntity } from './../../shared';

export class Modus implements BaseEntity {
    constructor(
        public id?: number,
        public nummer?: number,
        public name?: string,
        public bearbeitungsfaktor?: number,
        public bearbeitungsabweichung?: number,
        public lieferfaktor?: number,
        public lieferabweichung?: number,
        public mengenfakor?: number,
        public mengenabweichung?: number,
        public preisfaktor?: number,
        public diskontfaktor?: number,
        public bestellkostenfaktor?: number,
    ) {
    }
}
