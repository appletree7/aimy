import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Principal, ResponseWrapper} from '../../shared';
import {Arbeitsplatz} from '../../entities/arbeitsplatz';
import {TeilService} from '../../entities/teil';
import {Teil, Teiltyp} from '../../entities/teil';
import {Bestellstatus, Bestellung} from '../../entities/bestellung';
import {BestellungService} from '../../entities/bestellung';
import {ArbeitsplatzService} from '../../entities/arbeitsplatz';
import {Fertigungsauftrag} from '../../entities/fertigungsauftrag';
import {Auftragstatus, FertigungsauftragService} from '../../entities/fertigungsauftrag';
import {Modus, ModusService} from '../../entities/modus';
import {Kennzahlen, KennzahlenService} from '../../entities/kennzahlen';

@Component({
    selector: 'jhi-period-start',
    templateUrl: './period_start.component.html'
})
export class PeriodStartComponent implements OnInit {
    isSaving: boolean;
    teil: Teil;
    teils = [];
    bestellung: Bestellung;
    bestellungen = [];
    arbeitsplatz: Arbeitsplatz;
    arbeitsplaetze = [];
    fertigungsauftrag: Fertigungsauftrag;
    fertigungsauftraege = [];
    modus: Modus;
    moduse = [];
    kennzahl: Kennzahlen;
    kennzahlen = [];
    text: string;
    xml: Document;
    currentAccount: any;
    eventSubscriber: Subscription;
    aktuelleperiode: number;
    periode: number;
    // maxRequestsize = Number.MAX_SAFE_INTEGER;

    constructor(
        private teilService: TeilService,
        private bestellungService: BestellungService,
        private arbeitsplatzService: ArbeitsplatzService,
        private fertigungsauftragService: FertigungsauftragService,
        private modusService: ModusService,
        private kennzahlService: KennzahlenService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.isSaving = false;

        this.modusService.query({
            size: 1000000
        }).subscribe((res: ResponseWrapper) => {
            this.moduse = res.json;
            if (this.moduse.length === 0) {
                this.modus = new Modus(undefined, 1, 'Sonderbestellung', 1.0, 0.1,
                    0.4, 0.0, 1.0, 0.0, 2.5,
                    1.0, 2.0);
                this.modusService.create(this.modus).subscribe((respond: Modus) =>
                    console.log(respond), () => this.onSaveError());
                this.modus = new Modus(undefined, 2, 'Billiganbieter', 3.0, 0.5, 1.3,
                    2.0, 0.9, 10.0, 0.8,
                    0.8, 0.8);
                this.modusService.create(this.modus).subscribe((respond: Modus) =>
                    console.log(respond), () => this.onSaveError());
                this.modus = new Modus(undefined, 3, 'JIT ', 0.0, 0.0,
                    0.5, 0.0, 1.0, 0.0, 1.2,
                    1.0, 3.0);
                this.modusService.create(this.modus).subscribe((respond: Modus) =>
                    console.log(respond), () => this.onSaveError());
                this.modus = new Modus(undefined, 4, 'Eil ', 0.0, 0.0,
                    0.5, 0.0, 1.0, 0.0, 1.0,
                    1.0, 10.0);
                this.modusService.create(this.modus).subscribe((respond: Modus) =>
                    console.log(respond), () => this.onSaveError());
                this.modus = new Modus(undefined, 5, 'Normal ', 0.0, 0.0,
                    1.0, 1.0, 1.0, 0.0, 1.0,
                    0.9, 1.0);
                this.modusService.create(this.modus).subscribe((respond: Modus) =>
                    console.log(respond), () => this.onSaveError());
            }
        }, (respond: ResponseWrapper) => this.onError(respond.json), () => this.saveTeil(this.moduse));
   }

    changeListener($event): void {
        this.isSaving = false;
        this.readFile($event.target);
    }

    /**
     * Liest die Xml-Datei als String ein.
     * @param fileinput
     */
    readFile(fileinput: any): void {
        const reader = new FileReader();
        const file: File = fileinput.files[0];
        reader.onloadend = () => {
            this.text = reader.result;
            const parser = new DOMParser();
            this.xml = parser.parseFromString(this.text, 'text/xml');
        };
            reader.readAsText(file);
    }

    /**
     * Führt die verschiedenen Speichermethoden aus und speichert die aktuelle Periode
     */
    save() {
        if (this.aktuelleperiode !== undefined) {
            localStorage.setItem('aktuelleperiode', this.aktuelleperiode.toString());
        }
        if (this.xml !== undefined) {
            this.periode = parseInt(this.xml.getElementsByTagName('results')[0].getAttribute('period'), 10);
            this.saveTeil(this.moduse);
            this.saveArbeitsplatz();
            this.saveKennzahl();

            this.isSaving = true;
        }
    }

    /**
     * Speichert die Subkomponenten zu einem Teil
     */
    saveTeilSubkomponente(modi: Array<Modus>) {

        this.teilService.query({
            size: 1000000
        })
            .subscribe((res: ResponseWrapper) => {
                this.teils = res.json;
                let teilSubkomponenten = [];
                for (const teil of this.teils) {
                    if (teil.nummer === 1) {
                        teilSubkomponenten = this.teils.filter((teil1) => ((teil1.nummer === 51)
                            || (teil1.nummer === 26)) && (teil1.periode === this.periode));
                        teil.subkomponentes = teilSubkomponenten;
                        this.teilService.update(teil).subscribe((respond: Teil) =>
                            console.log(respond), () => this.onSaveError());
                    } else if (teil.nummer === 2) {
                        teilSubkomponenten = this.teils.filter((teil1) => ((teil1.nummer === 56)
                            || (teil1.nummer === 26)) && (teil1.periode === this.periode));
                        teil.subkomponentes = teilSubkomponenten;
                        this.teilService.update(teil).subscribe((respond: Teil) =>
                            console.log(respond), () => this.onSaveError());
                    } else if (teil.nummer === 3) {
                        teilSubkomponenten = this.teils.filter((teil1) => ((teil1.nummer === 31)
                            || (teil1.nummer === 26))
                            && (teil1.periode === this.periode));
                        teil.subkomponentes = teilSubkomponenten;
                        this.teilService.update(teil).subscribe((respond: Teil) =>
                            console.log(respond), () => this.onSaveError());
                    } else if (teil.nummer === 51) {
                        teilSubkomponenten = this.teils.filter((teil1) => ((teil1.nummer === 16) ||
                            (teil1.nummer === 17) || (teil1.nummer === 50)) && (teil1.periode === this.periode));
                        teil.subkomponentes = teilSubkomponenten;
                        this.teilService.update(teil).subscribe((respond: Teil) =>
                            console.log(respond), () => this.onSaveError());
                    } else if (teil.nummer === 56) {
                        teilSubkomponenten = this.teils.filter((teil1) => ((teil1.nummer === 16) ||
                            (teil1.nummer === 17) || (teil1.nummer === 55)) && (teil1.periode === this.periode));
                        teil.subkomponentes = teilSubkomponenten;
                        this.teilService.update(teil).subscribe((respond: Teil) =>
                            console.log(respond), () => this.onSaveError());
                    } else if (teil.nummer === 31) {
                        teilSubkomponenten = this.teils.filter((teil1) => ((teil1.nummer === 16) ||
                            (teil1.nummer === 17) || (teil1.nummer === 30)) && (teil1.periode === this.periode));
                        teil.subkomponentes = teilSubkomponenten;
                        this.teilService.update(teil).subscribe((respond: Teil) =>
                            console.log(respond), () => this.onSaveError());
                    } else if (teil.nummer === 50) {
                        teilSubkomponenten = this.teils.filter((teil1) =>  ((teil1.nummer === 4) ||
                            (teil1.nummer === 10) || (teil1.nummer === 49)) && (teil1.periode === this.periode));
                        teil.subkomponentes = teilSubkomponenten;
                        this.teilService.update(teil).subscribe((respond: Teil) =>
                            console.log(respond), () => this.onSaveError());
                    } else if (teil.nummer === 55) {
                        teilSubkomponenten = this.teils.filter((teil1) =>  ((teil1.nummer === 5) ||
                            (teil1.nummer === 11) || (teil1.nummer === 54)) && (teil1.periode === this.periode));
                        teil.subkomponentes = teilSubkomponenten;
                        this.teilService.update(teil).subscribe((respond: Teil) =>
                            console.log(respond), () => this.onSaveError());
                    } else if (teil.nummer === 30) {
                        teilSubkomponenten = this.teils.filter((teil1) =>  ((teil1.nummer === 6) ||
                            (teil1.nummer === 12) || (teil1.nummer === 29)) && (teil1.periode === this.periode));
                        teil.subkomponentes = teilSubkomponenten;
                        this.teilService.update(teil).subscribe((respond: Teil) =>
                            console.log(respond), () => this.onSaveError());
                    } else if (teil.nummer === 49) {
                        teilSubkomponenten = this.teils.filter((teil1) =>  ((teil1.nummer === 7) ||
                            (teil1.nummer === 13) || (teil1.nummer === 18)) && (teil1.periode === this.periode));
                        teil.subkomponentes = teilSubkomponenten;
                        this.teilService.update(teil).subscribe((respond: Teil) =>
                            console.log(respond), () => this.onSaveError());
                    } else if (teil.nummer === 54) {
                        teilSubkomponenten = this.teils.filter((teil1) =>  ((teil1.nummer === 8) ||
                            (teil1.nummer === 14) || (teil1.nummer === 19)) && (teil1.periode === this.periode));
                        teil.subkomponentes = teilSubkomponenten;
                        this.teilService.update(teil).subscribe((respond: Teil) =>
                            console.log(respond), () => this.onSaveError());
                    } else if (teil.nummer === 29) {
                        teilSubkomponenten = this.teils.filter((teil1) =>  ((teil1.nummer === 9) ||
                            (teil1.nummer === 15) || (teil1.nummer === 20)) && (teil1.periode === this.periode));
                        teil.subkomponentes = teilSubkomponenten;
                        this.teilService.update(teil).subscribe((respond: Teil) =>
                            console.log(respond), () => this.onSaveError());
                    }
                }
            }, (respond: ResponseWrapper) => this.onError(respond.json),
                () => {
                    this.saveBestellung(modi, this.teils);
                    this.saveFertigungsauftrag(this.teils);
                });
    }

    /**
     * Speichert die 5 Bestellmodi
     */
    saveModus() {
        /*this.modusService.query({
            size: 1000000
        }).subscribe((res: ResponseWrapper) => {
            this.moduse = res.json;
            if (this.moduse.length === 0) {
                this.modus = new Modus(undefined, 1, 'Sonderbestellung', 1.0, 0.1,
                0.4, 0.0, 1.0, 0.0, 2.5,
                    1.0, 2.0);
                this.modusService.create(this.modus).subscribe((respond: Modus) =>
                    console.log(respond), () => this.onSaveError());
                this.modus = new Modus(undefined, 2, 'Billiganbieter', 3.0, 0.5, 1.3,
                    2.0, 0.9, 10.0, 0.8,
                    0.8, 0.8);
                this.modusService.create(this.modus).subscribe((respond: Modus) =>
                    console.log(respond), () => this.onSaveError());
                this.modus = new Modus(undefined, 3, 'JIT ', 0.0, 0.0,
                    0.5, 0.0, 1.0, 0.0, 1.2,
                    1.0, 3.0);
                this.modusService.create(this.modus).subscribe((respond: Modus) =>
                    console.log(respond), () => this.onSaveError());
                this.modus = new Modus(undefined, 4, 'Eil ', 0.0, 0.0,
                    0.5, 0.0, 1.0, 0.0, 1.0,
                    1.0, 10.0);
                this.modusService.create(this.modus).subscribe((respond: Modus) =>
                    console.log(respond), () => this.onSaveError());
                this.modus = new Modus(undefined, 5, 'Normal ', 0.0, 0.0,
                    1.0, 1.0, 1.0, 0.0, 1.0,
                    0.9, 1.0);
                this.modusService.create(this.modus).subscribe((respond: Modus) =>
                    console.log(respond), () => this.onSaveError());
            }
        }, (respond: ResponseWrapper) => this.onError(respond.json), () => this.saveTeil(this.moduse));*/
    }

    /**
     * Speichert die Teile der aktuelle Periode
     */
    saveTeil(modi: Array<Modus>) {

        const criteria = [
            {key: 'periode.equals', value: this.periode}
        ];

            this.teilService.query({
                size: 1000000,
                criteria
            })
                .subscribe((res: ResponseWrapper) => {
                    this.teils = res.json;
                    const teile = this.xml.getElementsByTagName('warehousestock')[0].getElementsByTagName('article');
                    const inBearbeitung = this.xml.getElementsByTagName('ordersinwork')[0].getElementsByTagName('workplace');
                    const workplace = this.xml.getElementsByTagName('waitinglistworkstations')[0].getElementsByTagName('workplace');
                    const missingpart = this.xml.getElementsByTagName('waitingliststock')[0].getElementsByTagName('missingpart');
                    let i;
                    for (i = 0; i < teile.length; i++) {
                        this.teil = this.teils.find((teil) => (teil.nummer === (parseInt(teile[i].getAttribute('id'), 10)))
                            && teil.periode === this.periode);
                        if (this.teil !== undefined) {
                            if (this.teil.nummer <= 3) {
                                this.teil.teiltyp = Teiltyp.PRODUKT;
                            } else if (((this.teil.nummer > 3) && (this.teil.nummer < 21))
                                || ((this.teil.nummer > 28) && (this.teil.nummer < 32))
                                || (this.teil.nummer === 26)
                                || ((this.teil.nummer > 48) && (this.teil.nummer < 52))
                                || ((this.teil.nummer > 53) && (this.teil.nummer < 57))) {
                                this.teil.teiltyp = Teiltyp.ERZEUGNIS;
                            } else {
                                this.teil.teiltyp = Teiltyp.KAUFTEIL;
                            }
                            this.teil.istmenge = parseInt(teile[i].getAttribute('amount'), 10);
                            this.teil.startmenge = parseInt(teile[i].getAttribute('startamount'), 10);
                            this.teil.prozentsatz = parseFloat(teile[i].getAttribute('pct'));
                            this.teil.lagerpreis = parseFloat(teile[i].getAttribute('price'));
                            this.teil.lagerwert = parseFloat(teile[i].getAttribute('stockvalue'));
                            let j;
                            for (j = 0; j < inBearbeitung.length; j++) {
                                if (this.teil.nummer === parseInt(inBearbeitung[j].getAttribute('item'), 10)) {
                                    this.teil.inBearbeitung_menge = parseInt(inBearbeitung[j].getAttribute('amount'), 10);
                                }
                            }
                            let k;
                            const wartelistesameteil = [];
                            for (k = 0; k < workplace.length; k++) {
                                const waitinglistworkstation = workplace[k].getElementsByTagName('waitinglist');
                                let l;
                                for (l = 0; l < waitinglistworkstation.length; l++) {
                                    if (this.teil.nummer === parseInt(waitinglistworkstation[l].getAttribute('item'), 10)) {
                                        wartelistesameteil.push(parseInt(waitinglistworkstation[l].getAttribute('amount'), 10))
                                    }
                                }
                            }
                            let m;
                            for (m = 0; m < missingpart.length; m++) {
                                const waitinglistmaterial = missingpart[m].getElementsByTagName('waitinglist');
                                let n;
                                for (n = 0; n < waitinglistmaterial.length; n++) {
                                    if (this.teil.nummer === parseInt(waitinglistmaterial[n].getAttribute('item'), 10)) {
                                        wartelistesameteil.push(parseInt(waitinglistmaterial[n].getAttribute('amount'), 10))
                                    }
                                }
                            }
                            this.teil.warteliste_menge = wartelistesameteil.reduce((a, b) => a + b, 0);
                            this.teilService.update(this.teil).subscribe((respond: Teil) =>
                                console.log(respond), () => this.onSaveError());
                        } else {
                            if (parseInt(teile[i].getAttribute('id'), 10) <= 3) {
                                    this.teil = new Teil(undefined, Teiltyp.PRODUKT, this.periode, parseInt(teile[i].getAttribute('id'), 10),
                                        parseInt(teile[i].getAttribute('amount'), 10), parseInt(teile[i].getAttribute('startamount'), 10),
                                        parseFloat(teile[i].getAttribute('pct')), parseFloat(teile[i].getAttribute('price')),
                                        parseFloat(teile[i].getAttribute('stockvalue')), undefined, undefined,
                                        undefined, undefined,
                                        undefined, undefined, undefined,
                                        undefined, undefined, undefined, undefined, undefined);
                                let j;
                                for (j = 0; j < inBearbeitung.length; j++) {
                                    if (this.teil.nummer === parseInt(inBearbeitung[j].getAttribute('item'), 10)) {
                                        this.teil.inBearbeitung_menge = parseInt(inBearbeitung[j].getAttribute('amount'), 10);
                                    }
                                }
                                let k;
                                const wartelistesameteil = [];
                                for (k = 0; k < workplace.length; k++) {
                                    const waitinglistworkstation = workplace[k].getElementsByTagName('waitinglist');
                                    let l;
                                    for (l = 0; l < waitinglistworkstation.length; l++) {
                                        if (this.teil.nummer === parseInt(waitinglistworkstation[l].getAttribute('item'), 10)) {
                                            wartelistesameteil.push(parseInt(waitinglistworkstation[l].getAttribute('amount'), 10))
                                        }
                                    }
                                }
                                let m;
                                for (m = 0; m < missingpart.length; m++) {
                                    const waitinglistmaterial = missingpart[m].getElementsByTagName('waitinglist');
                                    let n;
                                    for (n = 0; n < waitinglistmaterial.length; n++) {
                                        if (this.teil.nummer === parseInt(waitinglistmaterial[n].getAttribute('item'), 10)) {
                                            wartelistesameteil.push(parseInt(waitinglistmaterial[n].getAttribute('amount'), 10))
                                        }
                                    }
                                }
                                this.teil.warteliste_menge = wartelistesameteil.reduce((a, b) => a + b, 0);
                            } else if (((parseInt(teile[i].getAttribute('id'), 10) > 3)
                                    && (parseInt(teile[i].getAttribute('id'), 10) < 21))
                                || (parseInt(teile[i].getAttribute('id'), 10) === 26)
                                || ((parseInt(teile[i].getAttribute('id'), 10) > 28)
                                    && (parseInt(teile[i].getAttribute('id'), 10) < 32))
                                || ((parseInt(teile[i].getAttribute('id'), 10) > 48)
                                    && (parseInt(teile[i].getAttribute('id'), 10) < 52))
                                || ((parseInt(teile[i].getAttribute('id'), 10) > 53)
                                    && (parseInt(teile[i].getAttribute('id'), 10) < 57))) {
                                    this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, this.periode, parseInt(teile[i].getAttribute('id'), 10),
                                        parseInt(teile[i].getAttribute('amount'), 10), parseInt(teile[i].getAttribute('startamount'), 10),
                                        parseFloat(teile[i].getAttribute('pct')), parseFloat(teile[i].getAttribute('price')),
                                        parseFloat(teile[i].getAttribute('stockvalue')), undefined, undefined,
                                        undefined, undefined, undefined,
                                        undefined, undefined, undefined, undefined, undefined, undefined, undefined);
                                let j;
                                for (j = 0; j < inBearbeitung.length; j++) {
                                    if (this.teil.nummer === parseInt(inBearbeitung[j].getAttribute('item'), 10)) {
                                        this.teil.inBearbeitung_menge = parseInt(inBearbeitung[j].getAttribute('amount'), 10);
                                    }
                                }
                                let k;
                                const wartelistesameteil = [];
                                for (k = 0; k < workplace.length; k++) {
                                    const waitinglistworkstation = workplace[k].getElementsByTagName('waitinglist');
                                    let l;
                                    for (l = 0; l < waitinglistworkstation.length; l++) {
                                        if (this.teil.nummer === parseInt(waitinglistworkstation[l].getAttribute('item'), 10)) {
                                            wartelistesameteil.push(parseInt(waitinglistworkstation[l].getAttribute('amount'), 10))
                                        }
                                    }
                                }
                                let m;
                                for (m = 0; m < missingpart.length; m++) {
                                    const waitinglistmaterial = missingpart[m].getElementsByTagName('waitinglist');
                                    let n;
                                    for (n = 0; n < waitinglistmaterial.length; n++) {
                                        if (this.teil.nummer === parseInt(waitinglistmaterial[n].getAttribute('item'), 10)) {
                                            wartelistesameteil.push(parseInt(waitinglistmaterial[n].getAttribute('amount'), 10))
                                        }
                                    }
                                }
                                this.teil.warteliste_menge = wartelistesameteil.reduce((a, b) => a + b, 0);
                            } else {
                                    this.teil = new Teil(undefined, Teiltyp.KAUFTEIL, this.periode , parseInt(teile[i].getAttribute('id'), 10),
                                        parseInt(teile[i].getAttribute('amount'), 10), parseInt(teile[i].getAttribute('startamount'), 10),
                                        parseFloat(teile[i].getAttribute('pct')), parseFloat(teile[i].getAttribute('price')),
                                        parseFloat(teile[i].getAttribute('stockvalue')), undefined, undefined,
                                        undefined, undefined, undefined,
                                        undefined,  undefined, undefined, undefined, undefined, undefined, undefined);
                                let j;
                                for (j = 0; j < inBearbeitung.length; j++) {
                                    if (this.teil.nummer === parseInt(inBearbeitung[j].getAttribute('item'), 10)) {
                                        this.teil.inBearbeitung_menge = parseInt(inBearbeitung[j].getAttribute('amount'), 10);
                                    }
                                }
                                let k;
                                const wartelistesameteil = [];
                                for (k = 0; k < workplace.length; k++) {
                                    const waitinglistworkstation = workplace[k].getElementsByTagName('waitinglist');
                                    let l;
                                    for (l = 0; l < waitinglistworkstation.length; l++) {
                                        if (this.teil.nummer === parseInt(waitinglistworkstation[l].getAttribute('item'), 10)) {
                                            wartelistesameteil.push(parseInt(waitinglistworkstation[l].getAttribute('amount'), 10))
                                        }
                                    }
                                }
                                let m;
                                for (m = 0; m < missingpart.length; m++) {
                                    const waitinglistmaterial = missingpart[m].getElementsByTagName('waitinglist');
                                    let n;
                                    for (n = 0; n < waitinglistmaterial.length; n++) {
                                        if (this.teil.nummer === parseInt(waitinglistmaterial[n].getAttribute('item'), 10)) {
                                            wartelistesameteil.push(parseInt(waitinglistmaterial[n].getAttribute('amount'), 10))
                                        }
                                    }
                                }
                                this.teil.warteliste_menge = wartelistesameteil.reduce((a, b) => a + b, 0);
                            }
                            this.teilService.create(this.teil).subscribe((respond: Teil) =>
                                console.log(respond), () => this.onSaveError());
                        }
                    }
                }, (respond: ResponseWrapper) => this.onError(respond.json),
                    () => {
                    this.saveTeilSubkomponente(modi);
                });
        }

    /**
     * Speichert die Bestellungen der aktuellen Periode
     * @param {Array<Modus>} moduse Die Bestellmodi
     * @param {Array<Teil>} kaufteile Die Kaufteile
     */
    saveBestellung(moduse: Array<Modus>, kaufteile?: Array<Teil>) {

         let criteria;

         if (this.periode === 1) {
             criteria = [
                 {key: 'periode.in', value: this.periode}
             ];
         } else if (this.periode === 2) {
             criteria = [
                 {key: 'periode.in', value: this.periode - 1},
                 {key: 'periode.in', value: this.periode}
             ];
         } else if (this.periode === 3) {
             criteria = [
                 {key: 'periode.in', value: this.periode - 2},
                 {key: 'periode.in', value: this.periode - 1},
                 {key: 'periode.in', value: this.periode}
             ];
         } else {
             criteria = [
                 {key: 'periode.in', value: this.periode - 3},
                 {key: 'periode.in', value: this.periode - 2},
                 {key: 'periode.in', value: this.periode - 1},
                 {key: 'periode.in', value: this.periode}
             ];
         }

        this.bestellungService.query({
            size: 1000000,
            criteria
        })
            .subscribe((res: ResponseWrapper) => {
                this.bestellungen = res.json;
                const bestellungen = this.xml.getElementsByTagName('inwardstockmovement')[0].getElementsByTagName('order');
                let i;
                for (i = 0; i < bestellungen.length; i++) {
                    this.bestellung = this.bestellungen.find((bestellung) => (bestellung.nummer ===
                        (parseInt(bestellungen[i].getAttribute('id'), 10))) && bestellung.periode ===
                        parseInt(bestellungen[i].getAttribute('orderperiod'), 10));
                        if ( kaufteile !== undefined) {
                            this.teil = kaufteile.find((teil) => (teil.nummer === parseInt(bestellungen[i].getAttribute('article'), 10))
                                && (teil.periode === (parseInt(bestellungen[i].getAttribute('orderperiod'), 10))));
                        }
                        if (moduse !== undefined) {
                            this.modus = moduse.find((modus) => (modus.id === parseInt(bestellungen[i].getAttribute('mode'), 10)));
                        }
                    if (this.bestellung !== undefined) {
                        this.bestellung.lieferzeit = parseInt(bestellungen[i].getAttribute('time'), 10);
                        this.bestellung.kaufmenge = parseInt(bestellungen[i].getAttribute('amount'), 10);
                        this.bestellung.materialkosten = parseFloat(bestellungen[i].getAttribute('materialcosts'));
                        this.bestellung.bestellkosten = parseFloat(bestellungen[i].getAttribute('ordercosts'));
                        this.bestellung.gesamtkosten = parseFloat(bestellungen[i].getAttribute('entirecosts'));
                        this.bestellung.stueckkosten = parseFloat(bestellungen[i].getAttribute('piececosts'));
                        this.bestellung.bestellstatus = Bestellstatus.GELIEFERT;
                        if (this.teil !== undefined) {
                            this.bestellung.kaufteil = this.teil;
                         } else if (this.modus !== undefined) {
                        this.bestellung.modus = this.modus;
                        }
                        this.bestellungService.update(this.bestellung).subscribe((respond: Bestellung) =>
                            console.log(respond), () => this.onSaveError());
                    } else {
                        this.bestellung = new Bestellung(undefined, parseInt(bestellungen[i].getAttribute('orderperiod'), 10),
                                parseInt(bestellungen[i].getAttribute('id'), 10), parseInt(bestellungen[i].getAttribute('time'), 10),
                                parseInt(bestellungen[i].getAttribute('amount'), 10), parseFloat(bestellungen[i].getAttribute('materialcosts')),
                                parseFloat(bestellungen[i].getAttribute('ordercosts')), parseFloat(bestellungen[i].getAttribute('entirecosts')),
                                parseFloat(bestellungen[i].getAttribute('piececosts')),
                                Bestellstatus.GELIEFERT, this.modus, this.teil);
                        this.bestellungService.create(this.bestellung).subscribe((respond: Bestellung) =>
                                console.log(respond), () => this.onSaveError());
                    }
                }

            }, (respond: ResponseWrapper) => this.onError(respond.json), () =>

                this.bestellungService.query({
                    size: 1000000,
                    criteria
                })
                    .subscribe((res: ResponseWrapper) => {
                        this.bestellungen = res.json;
                        const futurebestellungen = this.xml.getElementsByTagName('futureinwardstockmovement')[0].getElementsByTagName('order');
                        let i;
                        for (i = 0; i < futurebestellungen.length; i++) {
                            this.bestellung = this.bestellungen.find((bestellung) => bestellung.nummer ===
                                (parseInt(futurebestellungen[i].getAttribute('id'), 10)) && bestellung.periode ===
                                parseInt(futurebestellungen[i].getAttribute('orderperiod'), 10));
                            if (kaufteile !== undefined) {
                                this.teil = kaufteile.find((teil) => (teil.nummer === parseInt(futurebestellungen[i].getAttribute('article'), 10))
                                    && (teil.periode === (parseInt(futurebestellungen[i].getAttribute('orderperiod'), 10))));
                            } else if (moduse !== undefined) {
                                this.modus = moduse.find((modus) => (modus.id === parseInt(futurebestellungen[i].getAttribute('mode'), 10)));
                            }
                            if (this.bestellung !== undefined) {
                                this.bestellung.lieferzeit = parseInt(futurebestellungen[i].getAttribute('time'), 10);
                                this.bestellung.kaufmenge = parseInt(futurebestellungen[i].getAttribute('amount'), 10);
                                this.bestellung.bestellstatus = Bestellstatus.UNTERWEGS;
                                if (this.teil !== undefined) {
                                    this.bestellung.kaufteil = this.teil;
                                } else if (this.modus !== undefined) {
                                    this.bestellung.modus = this.modus;
                                }
                                this.bestellungService.update(this.bestellung).subscribe((respond: Bestellung) =>
                                    console.log(respond), () => this.onSaveError());
                            } else {
                                this.bestellung = new Bestellung(undefined, parseInt(futurebestellungen[i].getAttribute('orderperiod'), 10),
                                    parseInt(futurebestellungen[i].getAttribute('id'), 10),
                                    undefined, parseInt(futurebestellungen[i].getAttribute('amount'), 10),
                                    undefined, undefined, undefined, undefined,
                                    Bestellstatus.UNTERWEGS, this.modus, this.teil);
                                this.bestellungService.create(this.bestellung).subscribe((respond: Bestellung) =>
                                    console.log(respond), () => this.onSaveError());
                            }
                        }

                    }, (respond: ResponseWrapper) => this.onError(respond.json))

            );

    }

    /**
     * Speicher die Arbeitsplätze der aktuellen Periode
     */
    saveArbeitsplatz() {

        const criteria = [
            {key: 'periode.equals', value: this.periode}
        ];

        this.arbeitsplatzService.query({
            size: 1000000,
            criteria
        })
            .subscribe((res: ResponseWrapper) => {
                this.arbeitsplaetze = res.json;
                let i;
                // && this.arbeitsplaetze[i].periode !== undefined
                const arbeitsplaetze = this.xml.getElementsByTagName('idletimecosts')[0].getElementsByTagName('workplace');
                for (i = 0; i < arbeitsplaetze.length; i++) {
                    this.arbeitsplatz = this.arbeitsplaetze.find((arbeitsplatz) => (arbeitsplatz.nummer ===
                        (parseInt(arbeitsplaetze[i].getAttribute('id'), 10))) && arbeitsplatz.periode ===
                        this.periode);
                    if (this.arbeitsplatz !== undefined) {
                        this.arbeitsplatz.ruestvorgaenge = parseInt(arbeitsplaetze[i].getAttribute('setupevents'), 10);
                        this.arbeitsplatz.leerzeit = parseInt(arbeitsplaetze[i].getAttribute('idletime'), 10);
                        this.arbeitsplatz.lohnleerkosten = parseFloat(arbeitsplaetze[i].getAttribute('wageidletimecosts'));
                        this.arbeitsplatz.lohnkosten = parseFloat(arbeitsplaetze[i].getAttribute('wagecosts'));
                        this.arbeitsplatz.maschinenstillstandkosten = parseFloat(arbeitsplaetze[i].getAttribute('machineidletimecosts'));
                        this.arbeitsplatzService.update(this.arbeitsplatz).subscribe((respond: Arbeitsplatz) =>
                            console.log(respond), () => this.onSaveError());
                    } else {
                        this.arbeitsplatz = new Arbeitsplatz(undefined, this.periode, parseInt(arbeitsplaetze[i].getAttribute('id'), 10),
                            undefined, parseInt(arbeitsplaetze[i].getAttribute('setupevents'), 10),
                            parseInt(arbeitsplaetze[i].getAttribute('idletime'), 10),
                            parseFloat(arbeitsplaetze[i].getAttribute('wageidletimecosts')),
                            parseFloat(arbeitsplaetze[i].getAttribute('wagecosts')),
                            parseFloat(arbeitsplaetze[i].getAttribute('machineidletimecosts')), undefined, undefined,
                            undefined);
                        this.arbeitsplatzService.create(this.arbeitsplatz).subscribe((respond: Arbeitsplatz) =>
                            console.log(respond), () => this.onSaveError());
                    }
                }
            }, (respond: ResponseWrapper) => this.onError(respond.json), () => {

        this.arbeitsplatzService.query({
            size: 1000000,
            criteria
        })
            .subscribe((res: ResponseWrapper) => {
                this.arbeitsplaetze = res.json;
                let i;
                const arbeitsplaetze2 = this.xml.getElementsByTagName('waitinglistworkstations')[0].getElementsByTagName('workplace');
                for ( i = 0; i < arbeitsplaetze2.length; i++) {
                    this.arbeitsplatz = this.arbeitsplaetze.find((arbeitsplatz) => (arbeitsplatz.nummer ===
                        (parseInt(arbeitsplaetze2[i].getAttribute('id'), 10))) && arbeitsplatz.periode ===
                        this.periode);
                    if (this.arbeitsplatz !== undefined) {
                        this.arbeitsplatz.restzeitbedarf = parseInt(arbeitsplaetze2[i].getAttribute('timeneed'), 10);
                        this.arbeitsplatzService.update(this.arbeitsplatz).subscribe((respond: Arbeitsplatz) =>
                            console.log(respond), () => this.onSaveError());
                    } else {
                        this.arbeitsplatz = new Arbeitsplatz(undefined, this.periode, parseInt(arbeitsplaetze2[i].getAttribute('id'), 10),
                            parseInt(arbeitsplaetze2[i].getAttribute('timeneed'), 10), undefined, undefined,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined);
                        this.arbeitsplatzService.create(this.arbeitsplatz).subscribe((respond: Arbeitsplatz) =>
                            console.log(respond), () => this.onSaveError());
                    }
                }
            }, (respond: ResponseWrapper) => this.onError(respond.json), () => {

                this.arbeitsplatzService.query({
                    size: 1000000
                })
                    .subscribe((res: ResponseWrapper) => {
                        this.arbeitsplaetze = res.json;
                        const arbeitsplaetze3 = this.xml.getElementsByTagName('ordersinwork')[0].getElementsByTagName('workplace');
                        let i;
                        for (i = 0; i < arbeitsplaetze3.length; i++) {
                            this.arbeitsplatz = this.arbeitsplaetze.find((arbeitsplatz) => (arbeitsplatz.nummer ===
                                (parseInt(arbeitsplaetze3[i].getAttribute('id'), 10))) && arbeitsplatz.periode ===
                                parseInt(arbeitsplaetze3[i].getAttribute('period'), 10));
                            if (this.arbeitsplatz !== undefined) {
                                this.arbeitsplatz.restzeitbedarf_in_bearbeitung = parseInt(arbeitsplaetze3[i].getAttribute('timeneed'), 10);
                                this.arbeitsplatzService.update(this.arbeitsplatz).subscribe((respond: Arbeitsplatz) =>
                                    console.log(respond), () => this.onSaveError());
                            } else {
                                this.arbeitsplatz = new Arbeitsplatz(undefined, parseInt(arbeitsplaetze3[i].getAttribute('period'), 10),
                                    parseInt(arbeitsplaetze3[i].getAttribute('id'), 10), undefined, undefined,
                                    undefined, undefined, undefined, undefined,
                                    parseInt(arbeitsplaetze3[i].getAttribute('timeneed'), 10), undefined, undefined);
                                this.arbeitsplatzService.create(this.arbeitsplatz).subscribe((respond: Arbeitsplatz) =>
                                    console.log(respond), () => this.onSaveError());
                            }
                        }
                    }, (respond: ResponseWrapper) => this.onError(respond.json));
                } );
            } );

    }

    /**
     * Speichert die Fertigungsaufträge der aktuellen Periode
     * @param {Array<Teil>} teile Die Bauteile
     */
    saveFertigungsauftrag(teile?: Array<Teil>) {

        let criteria;

        if (this.periode === 1) {
            criteria = [
                {key: 'periode.in', value: this.periode}
            ];
        } else if (this.periode === 2) {
            criteria = [
                {key: 'periode.in', value: this.periode - 1},
                {key: 'periode.in', value: this.periode}
            ];
        } else if (this.periode === 3) {
            criteria = [
                {key: 'periode.in', value: this.periode - 2},
                {key: 'periode.in', value: this.periode - 1},
                {key: 'periode.in', value: this.periode}
            ];
        } else {
            criteria = [
                {key: 'periode.in', value: this.periode - 3},
                {key: 'periode.in', value: this.periode - 2},
                {key: 'periode.in', value: this.periode - 1},
                {key: 'periode.in', value: this.periode}
            ];
        }

       this.fertigungsauftragService.query({
           size: 1000000,
           criteria
       })
            .subscribe((res: ResponseWrapper) => {
                this.fertigungsauftraege = res.json;
                const fertigungsauftraege = this.xml.getElementsByTagName('completedorders')[0].getElementsByTagName('order');
                let i;
                for (i = 0; i < fertigungsauftraege.length; i++) {
                    this.fertigungsauftrag = this.fertigungsauftraege.find((fertigungsauftrag) => (fertigungsauftrag.nummer ===
                        (parseInt(fertigungsauftraege[i].getAttribute('id'), 10))) && fertigungsauftrag.periode ===
                        parseInt(fertigungsauftraege[i].getAttribute('period'), 10));
                    this.teil = teile.find((teil) => (teil.nummer === parseInt(fertigungsauftraege[i].getAttribute('item'), 10))
                        && (teil.periode === parseInt(fertigungsauftraege[i].getAttribute('period'), 10)));
                    if (this.fertigungsauftrag !== undefined) {
                        this.fertigungsauftrag.auftragsmenge = parseInt(fertigungsauftraege[i].getAttribute('quantity'), 10);
                        this.fertigungsauftrag.kosten = parseFloat(fertigungsauftraege[i].getAttribute('cost'));
                        this.fertigungsauftrag.durchschnittlichestueckkosten =  parseFloat(fertigungsauftraege[i].getAttribute('averageunitcosts'));
                        if (this.fertigungsauftrag.begonnen !== null && this.fertigungsauftrag.begonnen !== undefined) {
                            this.fertigungsauftrag.auftragsstatus = Auftragstatus.BEENDET;
                        } else {
                            this.fertigungsauftrag.auftragsstatus = Auftragstatus.ANGEFANGEN;
                        }
                        if (this.teil !== undefined) {
                            this.fertigungsauftrag.herstellteil = this.teil;
                        }
                        this.fertigungsauftragService.update(this.fertigungsauftrag).subscribe((respond: Fertigungsauftrag) =>
                            console.log(respond), () => this.onSaveError());
                    } else {
                        if (fertigungsauftraege[i].getAttribute('starttime') !== undefined && fertigungsauftraege[i].getAttribute('starttime') !== null) {
                            this.fertigungsauftrag = new Fertigungsauftrag(undefined, parseInt(fertigungsauftraege[i].getAttribute('period'), 10),
                                parseInt(fertigungsauftraege[i].getAttribute('id'), 10), parseInt(fertigungsauftraege[i].getAttribute('quantity'), 10),
                                parseFloat(fertigungsauftraege[i].getAttribute('cost')), parseFloat(fertigungsauftraege[i].getAttribute('averageunitcosts')),
                                Auftragstatus.BEENDET, undefined, undefined, undefined, undefined, undefined, this.teil);
                        } else {
                            this.fertigungsauftrag = new Fertigungsauftrag(undefined, parseInt(fertigungsauftraege[i].getAttribute('period'), 10),
                                parseInt(fertigungsauftraege[i].getAttribute('id'), 10),
                                parseInt(fertigungsauftraege[i].getAttribute('quantity'), 10),
                                parseFloat(fertigungsauftraege[i].getAttribute('cost')),
                                parseFloat(fertigungsauftraege[i].getAttribute('averageunitcosts')), Auftragstatus.ANGEFANGEN,
                                undefined, undefined, undefined,
                                undefined, undefined, this.teil);
                        }
                        this.fertigungsauftragService.create(this.fertigungsauftrag).subscribe((respond: Fertigungsauftrag) =>
                            console.log(respond), () => this.onSaveError());
                    }
                }
            }, (res: ResponseWrapper) => this.onError(res.json), () => {

                this.fertigungsauftragService.query({
                    size: 1000000,
                    criteria
                })
                    .subscribe((res: ResponseWrapper) => {
                        this.fertigungsauftraege = res.json;
                        let i;
                        const fertigungsauftraege2 = this.xml.getElementsByTagName('cycletimes')[0].getElementsByTagName('order');
                        for (i = 0; i < fertigungsauftraege2.length; i++) {
                            this.fertigungsauftrag = this.fertigungsauftraege.find((fertigungsauftrag) => (fertigungsauftrag.nummer ===
                                (parseInt(fertigungsauftraege2[i].getAttribute('id'), 10))) && fertigungsauftrag.periode ===
                                parseInt(fertigungsauftraege2[i].getAttribute('period'), 10));
                            if (this.fertigungsauftrag !== undefined) {
                                this.fertigungsauftrag.begonnen = fertigungsauftraege2[i].getAttribute('starttime');
                                if (this.fertigungsauftrag.begonnen !== null && this.fertigungsauftrag.begonnen !== undefined) {
                                    this.fertigungsauftrag.auftragsstatus = Auftragstatus.BEENDET;
                                } else {
                                    this.fertigungsauftrag.auftragsstatus = Auftragstatus.ANGEFANGEN;
                                }
                                this.fertigungsauftrag.beendet = fertigungsauftraege2[i].getAttribute('finishtime');
                                this.fertigungsauftrag.dlzminimal = parseInt(fertigungsauftraege2[i].getAttribute('cycletimemin'), 10);
                                this.fertigungsauftrag.dlzFaktor = parseFloat(fertigungsauftraege2[i].getAttribute('cycletimefactor'));
                                this.fertigungsauftragService.update(this.fertigungsauftrag).subscribe((respond: Fertigungsauftrag) =>
                                    console.log(respond), () => this.onSaveError());
                            } else {
                                if (fertigungsauftraege2[i].getAttribute('starttime') !== undefined && fertigungsauftraege2[i].getAttribute('starttime') !== null) {
                                    this.fertigungsauftrag = new Fertigungsauftrag(undefined, parseInt(fertigungsauftraege2[i].getAttribute('period'), 10),
                                        undefined, undefined, undefined, undefined,
                                        Auftragstatus.BEENDET, fertigungsauftraege2[i].getAttribute('starttime'), fertigungsauftraege2[i].getAttribute('finishtime'),
                                        parseInt(fertigungsauftraege2[i].getAttribute('cycletimemin'), 10),
                                        parseFloat(fertigungsauftraege2[i].getAttribute('cycletimefactor')),
                                        parseInt(fertigungsauftraege2[i].getAttribute('id'), 10));
                                } else {
                                    this.fertigungsauftrag = new Fertigungsauftrag(undefined, parseInt(fertigungsauftraege2[i].getAttribute('period'), 10),
                                        parseInt(fertigungsauftraege2[i].getAttribute('id'), 10), undefined, undefined, undefined,
                                        Auftragstatus.ANGEFANGEN, fertigungsauftraege2[i].getAttribute('starttime'), fertigungsauftraege2[i].getAttribute('finishtime'),
                                        parseInt(fertigungsauftraege2[i].getAttribute('cycletimemin'), 10),
                                        parseFloat(fertigungsauftraege2[i].getAttribute('cycletimefactor')), undefined, undefined);
                                }
                                this.fertigungsauftragService.create(this.fertigungsauftrag).subscribe((respond: Fertigungsauftrag) =>
                                    console.log(respond), () => this.onSaveError());
                            }
                        }

                    }, (res: ResponseWrapper) => this.onError(res.json));
            });

    }

    /**
     * Speichert die aktuellen Kennzahlen der aktuellen Periode
     */
    saveKennzahl() {

        const capacity = this.xml.getElementsByTagName('result')[0].getElementsByTagName('general')[0].getElementsByTagName('capacity');
        const possiblecapacity = this.xml.getElementsByTagName('result')[0].getElementsByTagName('general')[0].getElementsByTagName('possiblecapacity');
        const relpossiblenormalcapacity = this.xml.getElementsByTagName('result')[0].getElementsByTagName('general')[0].getElementsByTagName('relpossiblenormalcapacity');
        const productivetime = this.xml.getElementsByTagName('result')[0].getElementsByTagName('general')[0].getElementsByTagName('productivetime');
        const effiency = this.xml.getElementsByTagName('result')[0].getElementsByTagName('general')[0].getElementsByTagName('effiency');
        const sellwish = this.xml.getElementsByTagName('result')[0].getElementsByTagName('general')[0].getElementsByTagName('sellwish');
        const salesquantity = this.xml.getElementsByTagName('result')[0].getElementsByTagName('general')[0].getElementsByTagName('salesquantity');
        const deliveryreliability = this.xml.getElementsByTagName('result')[0].getElementsByTagName('general')[0].getElementsByTagName('deliveryreliability');
        const idletime = this.xml.getElementsByTagName('result')[0].getElementsByTagName('general')[0].getElementsByTagName('idletime');
        const idletimecosts = this.xml.getElementsByTagName('result')[0].getElementsByTagName('general')[0].getElementsByTagName('idletimecosts');
        const storevalue = this.xml.getElementsByTagName('result')[0].getElementsByTagName('general')[0].getElementsByTagName('storevalue');
        const storagecosts = this.xml.getElementsByTagName('result')[0].getElementsByTagName('general')[0].getElementsByTagName('storagecosts');
        const defectivegoodsquantity = this.xml.getElementsByTagName('result')[0].getElementsByTagName('defectivegoods')[0].getElementsByTagName('quantity');
        const defectivegoodscost = this.xml.getElementsByTagName('result')[0].getElementsByTagName('defectivegoods')[0].getElementsByTagName('costs');
        const normalsalesalesprice = this.xml.getElementsByTagName('result')[0].getElementsByTagName('normalsale')[0].getElementsByTagName('salesprice');
        const normalsaleprofit = this.xml.getElementsByTagName('result')[0].getElementsByTagName('normalsale')[0].getElementsByTagName('profit');
        const normalsaleprofitperunit = this.xml.getElementsByTagName('result')[0].getElementsByTagName('normalsale')[0].getElementsByTagName('profitperunit');
        const directsaleprofit = this.xml.getElementsByTagName('result')[0].getElementsByTagName('directsale')[0].getElementsByTagName('profit');
        const directsalecontractpenalty = this.xml.getElementsByTagName('result')[0].getElementsByTagName('directsale')[0].getElementsByTagName('contractpenalty');
        const marketplacesaleprofit = this.xml.getElementsByTagName('result')[0].getElementsByTagName('marketplacesale')[0].getElementsByTagName('profit');
        const summaryprofit = this.xml.getElementsByTagName('result')[0].getElementsByTagName('summary')[0].getElementsByTagName('profit');
        const criteria = [
            {key: 'periode.equals', value: this.periode}
        ];
        this.kennzahlService.query(
            {
                size: 1000000,
                criteria
            }
        )
            .subscribe((response: ResponseWrapper) => {
                this.kennzahlen = response.json;
                    if (this.kennzahlen === undefined || this.kennzahlen.length === 0) {
                        this.kennzahl = new Kennzahlen(undefined, this.periode, 'Kapazität',
                            parseFloat(capacity[0].getAttribute('current')), parseFloat(capacity[0].getAttribute('average')),
                            parseFloat(capacity[0].getAttribute('all')));
                        this.kennzahlService.create(this.kennzahl).subscribe((respond: Kennzahlen) =>
                            console.log(respond), () => this.onSaveError());
                        this.kennzahl = new Kennzahlen(undefined, this.periode, 'mögliche Kapazität',
                            parseFloat(possiblecapacity[0].getAttribute('current')),  parseFloat(possiblecapacity[0].getAttribute('average')),
                            parseFloat(possiblecapacity[0].getAttribute('all')));
                        this.kennzahlService.create(this.kennzahl).subscribe((respond: Kennzahlen) =>
                            console.log(respond), () => this.onSaveError());
                        this.kennzahl = new Kennzahlen(undefined, this.periode, 'relative Kapazität',
                            parseFloat(relpossiblenormalcapacity[0].getAttribute('current')), parseFloat(relpossiblenormalcapacity[0].getAttribute('average')),
                            parseFloat(relpossiblenormalcapacity[0].getAttribute('all')));
                        this.kennzahlService.create(this.kennzahl).subscribe((respond: Kennzahlen) =>
                            console.log(respond), () => this.onSaveError());
                        this.kennzahl = new Kennzahlen(undefined, this.periode, 'Produktivzeit',
                            parseFloat(productivetime[0].getAttribute('current')), parseFloat(productivetime[0].getAttribute('average')),
                            parseFloat(productivetime[0].getAttribute('all')));
                        this.kennzahlService.create(this.kennzahl).subscribe((respond: Kennzahlen) =>
                            console.log(respond), () => this.onSaveError());
                        this.kennzahl = new Kennzahlen(undefined, this.periode, 'Effizienz',
                            parseFloat(effiency[0].getAttribute('current')), parseFloat(effiency[0].getAttribute('average')),
                            parseFloat(effiency[0].getAttribute('all')));
                        this.kennzahlService.create(this.kennzahl).subscribe((respond: Kennzahlen) =>
                            console.log(respond), () => this.onSaveError());
                        this.kennzahl = new Kennzahlen(undefined, this.periode, 'Vertriebwunsch',
                            parseFloat(sellwish[0].getAttribute('current')), parseFloat(sellwish[0].getAttribute('average')),
                            parseFloat(sellwish[0].getAttribute('all')));
                        this.kennzahlService.create(this.kennzahl).subscribe((respond: Kennzahlen) =>
                            console.log(respond), () => this.onSaveError());
                        this.kennzahl = new Kennzahlen(undefined, this.periode, 'verkaufte Menge',
                            parseFloat(salesquantity[0].getAttribute('current')), parseFloat(salesquantity[0].getAttribute('average')),
                            parseFloat(salesquantity[0].getAttribute('all')));
                        this.kennzahlService.create(this.kennzahl).subscribe((respond: Kennzahlen) =>
                            console.log(respond), () => this.onSaveError());
                        this.kennzahl = new Kennzahlen(undefined, this.periode, 'Lieferzuverläsigkeit',
                            parseFloat(deliveryreliability[0].getAttribute('current')),
                            parseFloat(deliveryreliability[0].getAttribute('average')),
                            parseFloat(deliveryreliability[0].getAttribute('all')));
                        this.kennzahlService.create(this.kennzahl).subscribe((respond: Kennzahlen) =>
                            console.log(respond), () => this.onSaveError());
                        this.kennzahl = new Kennzahlen(undefined, this.periode, 'Leerzeit',
                            parseFloat(idletime[0].getAttribute('current')), parseFloat(idletime[0].getAttribute('average')),
                            parseFloat(idletime[0].getAttribute('all')));
                        this.kennzahlService.create(this.kennzahl).subscribe((respond: Kennzahlen) =>
                            console.log(respond), () => this.onSaveError());
                        this.kennzahl = new Kennzahlen(undefined, this.periode, 'Leerzeitkosten',
                            parseFloat(idletimecosts[0].getAttribute('current')), parseFloat(idletimecosts[0].getAttribute('average')),
                            parseFloat(idletimecosts[0].getAttribute('all')));
                        this.kennzahlService.create(this.kennzahl).subscribe((respond: Kennzahlen) =>
                            console.log(respond), () => this.onSaveError());
                        this.kennzahl = new Kennzahlen(undefined, this.periode, 'Lagerwert',
                            parseFloat(storevalue[0].getAttribute('current')), parseFloat(storevalue[0].getAttribute('average')),
                            parseFloat(storevalue[0].getAttribute('all')));
                        this.kennzahlService.create(this.kennzahl).subscribe((respond: Kennzahlen) =>
                            console.log(respond), () => this.onSaveError());
                        this.kennzahl = new Kennzahlen(undefined, this.periode, 'Lagerkosten',
                            parseFloat(storagecosts[0].getAttribute('current')), parseFloat(storagecosts[0].getAttribute('average')),
                            parseFloat(storagecosts[0].getAttribute('all')));
                        this.kennzahlService.create(this.kennzahl).subscribe((respond: Kennzahlen) =>
                            console.log(respond), () => this.onSaveError());
                        this.kennzahl = new Kennzahlen(undefined, this.periode, 'Ausschussmenge',
                            parseFloat(defectivegoodsquantity[0].getAttribute('current')), parseFloat(defectivegoodsquantity[0].getAttribute('average')),
                            parseFloat(defectivegoodsquantity[0].getAttribute('all')));
                        this.kennzahlService.create(this.kennzahl).subscribe((respond: Kennzahlen) =>
                            console.log(respond), () => this.onSaveError());
                        this.kennzahl = new Kennzahlen(undefined, this.periode, 'Ausschusskosten',
                            parseFloat(defectivegoodscost[0].getAttribute('current')), parseFloat(defectivegoodscost[0].getAttribute('average')),
                            parseFloat(defectivegoodscost[0].getAttribute('all')));
                        this.kennzahlService.create(this.kennzahl).subscribe((respond: Kennzahlen) =>
                            console.log(respond), () => this.onSaveError());
                        this.kennzahl = new Kennzahlen(undefined, this.periode, 'Normalverkaufspreis',
                            parseFloat( normalsalesalesprice[0].getAttribute('current')), parseFloat( normalsalesalesprice[0].getAttribute('average')),
                            parseFloat( normalsalesalesprice[0].getAttribute('all')));
                        this.kennzahlService.create(this.kennzahl).subscribe((respond: Kennzahlen) =>
                            console.log(respond), () => this.onSaveError());
                        this.kennzahl = new Kennzahlen(undefined, this.periode, 'Normalverkaufsgewinn',
                            parseFloat(normalsaleprofit[0].getAttribute('current')), parseFloat(normalsaleprofit[0].getAttribute('average')),
                            parseFloat(normalsaleprofit[0].getAttribute('all')));
                        this.kennzahlService.create(this.kennzahl).subscribe((respond: Kennzahlen) =>
                            console.log(respond), () => this.onSaveError());
                        this.kennzahl = new Kennzahlen(undefined, this.periode, 'Normalverkaufsgewinn pro Stück',
                            parseFloat(normalsaleprofitperunit[0].getAttribute('current')),
                            parseFloat(normalsaleprofitperunit[0].getAttribute('average')),
                            parseFloat(normalsaleprofitperunit[0].getAttribute('all')));
                        this.kennzahlService.create(this.kennzahl).subscribe((respond: Kennzahlen) =>
                            console.log(respond), () => this.onSaveError());
                        this.kennzahl = new Kennzahlen(undefined, this.periode, 'Direktverkaufsgewinn',
                            parseFloat(directsaleprofit[0].getAttribute('current')), parseFloat(directsaleprofit[0].getAttribute('average')),
                            parseFloat(directsaleprofit[0].getAttribute('all')));
                        this.kennzahlService.create(this.kennzahl).subscribe((respond: Kennzahlen) =>
                            console.log(respond), () => this.onSaveError());
                        this.kennzahl = new Kennzahlen(undefined, this.periode, 'Vertragsstrafe',
                            parseFloat(directsalecontractpenalty[0].getAttribute('current')),
                            parseFloat(directsalecontractpenalty[0].getAttribute('average')),
                            parseFloat(directsalecontractpenalty[0].getAttribute('all')));
                        this.kennzahlService.create(this.kennzahl).subscribe((respond: Kennzahlen) =>
                            console.log(respond), () => this.onSaveError());
                        this.kennzahl = new Kennzahlen(undefined, this.periode, 'Marktplatzgewinn',
                            parseFloat(marketplacesaleprofit[0].getAttribute('current')),
                            parseFloat(marketplacesaleprofit[0].getAttribute('average')),
                            parseFloat(marketplacesaleprofit[0].getAttribute('all')));
                        this.kennzahlService.create(this.kennzahl).subscribe((respond: Kennzahlen) =>
                            console.log(respond), () => this.onSaveError());
                        this.kennzahl = new Kennzahlen(undefined, this.periode, 'Gesamtgewinn',
                            parseFloat(summaryprofit[0].getAttribute('current')), parseFloat(summaryprofit[0].getAttribute('average')),
                            parseFloat(summaryprofit[0].getAttribute('all')));
                        this.kennzahlService.create(this.kennzahl).subscribe((respond: Kennzahlen) =>
                            console.log(respond), () => this.onSaveError());
                    }
            }, (response: ResponseWrapper) => this.onError(response.json));
    }

    /**
     *
     */
    private onSaveError() {
        this.isSaving = false;
    }

    /**
     *
     * @param error
     */
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
