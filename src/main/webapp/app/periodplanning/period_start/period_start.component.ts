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
import {Los, LosService} from '../../entities/los';
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
    los: Los;
    lose: Los[];
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
        private losService: LosService,
        private modusService: ModusService,
        private kennzahlService: KennzahlenService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.isSaving = false;
   }

    changeListener($event): void {
        this.isSaving = false;
        this.readFile($event.target);
    }

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

    save() {
        if (this.aktuelleperiode !== undefined) {
            localStorage.setItem('aktuelleperiode', this.aktuelleperiode.toString());
        }
        if (this.xml !== undefined) {
            this.periode = parseInt(this.xml.getElementsByTagName('results')[0].getAttribute('period'), 10);
            this.saveModus();
            this.saveTeil();
            this.saveArbeitsplatz();
            // this.saveLos();
            this.saveKennzahl();

            this.isSaving = true;
        }
    }

    saveTeilSubkomponente() {
        this.teilService.query({
            size: 1000000
        })
            .subscribe((res: ResponseWrapper) => {
                this.teils = res.json;
                let teilSubkomponenten = [];
                for (const teil of this.teils) {
                    if (teil.nummer === 1) {
                        teilSubkomponenten = this.teils.filter((teil1) => ((teil1.nummer === 51)
                            || (teil1.nummer === 26))
                            && (teil1.periode === this.periode));
                        teil.subkomponentes = teilSubkomponenten;
                        this.teilService.update(teil).subscribe((respond: Teil) =>
                            console.log(respond), () => this.onSaveError());
                    } else if (teil.nummer === 2) {
                        teilSubkomponenten = this.teils.filter((teil1) => ((teil1.nummer === 56)
                            || (teil.nummer === 26)) && (teil.periode === this.periode));
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
            }, (respond: ResponseWrapper) => this.onError(respond.json));
    }

    saveModus() {
        this.modusService.query({
            size: 1000000
        }).subscribe((res: ResponseWrapper) => {
            this.moduse = res.json;
            if (this.moduse.length === 0) {
                this.modus = new Modus(undefined, 'Sonderbestellung', 1.0, 0.1,
                0.4, 0.0, 1.0, 0.0, 2.5,
                    1.0, 2.0);
                this.modusService.create(this.modus).subscribe((respond: Modus) =>
                    console.log(respond), () => this.onSaveError());
                this.modus = new Modus(undefined, 'Billiganbieter', 3.0, 0.5, 1.3,
                    2.0, 0.9, 10.0, 0.8,
                    0.8, 0.8);
                this.modusService.create(this.modus).subscribe((respond: Modus) =>
                    console.log(respond), () => this.onSaveError());
                this.modus = new Modus(undefined, 'JIT ', 0.0, 0.0,
                    0.5, 0.0, 1.0, 0.0, 1.2,
                    1.0, 3.0);
                this.modusService.create(this.modus).subscribe((respond: Modus) =>
                    console.log(respond), () => this.onSaveError());
                this.modus = new Modus(undefined, 'Eil ', 0.0, 0.0,
                    0.5, 0.0, 1.0, 0.0, 1.0,
                    1.0, 10.0);
                this.modusService.create(this.modus).subscribe((respond: Modus) =>
                    console.log(respond), () => this.onSaveError());
                this.modus = new Modus(undefined, 'Normal ', 0.0, 0.0,
                    1.0, 1.0, 1.0, 0.0, 1.0,
                    0.9, 1.0);
                this.modusService.create(this.modus).subscribe((respond: Modus) =>
                    console.log(respond), () => this.onSaveError());
            }
        }, (respond: ResponseWrapper) => this.onError(respond.json), () => this.saveBestellung(this.moduse, undefined));
    }

    saveTeil() {
            this.teilService.query({
                size: 1000000
            })
                .subscribe((res: ResponseWrapper) => {
                    this.teils = res.json;
                    const teile = this.xml.getElementsByTagName('warehousestock')[0].getElementsByTagName('article');
                    let i;
                    for (i = 0; i < teile.length; i++) {
                        if (this.teils !== undefined && this.teils.length !== 0 && (this.teils[i].nummer !== undefined ||
                                this.teils[i].periode !== undefined)) {
                            this.teil = this.teils.find((teil) => (teil.nummer === (parseInt(teile[i].getAttribute('id'), 10)))
                                && (teil.periode === this.periode));
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
                            this.teilService.update(this.teil).subscribe((respond: Teil) =>
                                console.log(respond), () => this.onSaveError());
                        } else {
                            if (parseInt(teile[i].getAttribute('id'), 10) <= 3) {
                                    this.teil = new Teil(undefined, Teiltyp.PRODUKT, this.periode, parseInt(teile[i].getAttribute('id'), 10),
                                        parseInt(teile[i].getAttribute('amount'), 10), parseInt(teile[i].getAttribute('startamount'), 10),
                                        parseFloat(teile[i].getAttribute('pct')), parseFloat(teile[i].getAttribute('price')),
                                        parseFloat(teile[i].getAttribute('stockvalue')), undefined, undefined,
                                        undefined, undefined, undefined, undefined, undefined);
                            } else if (((parseInt(teile[i].getAttribute('id'), 10) > 3)
                                    && (parseInt(teile[i].getAttribute('id'), 10) < 21))
                                || (this.teil.nummer === 26)
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
                                        undefined, undefined, undefined, undefined, undefined);
                            } else {
                                    this.teil = new Teil(undefined, Teiltyp.KAUFTEIL, this.periode , parseInt(teile[i].getAttribute('id'), 10),
                                        parseInt(teile[i].getAttribute('amount'), 10), parseInt(teile[i].getAttribute('startamount'), 10),
                                        parseFloat(teile[i].getAttribute('pct')), parseFloat(teile[i].getAttribute('price')),
                                        parseFloat(teile[i].getAttribute('stockvalue')), undefined, undefined,
                                        undefined, undefined, undefined, undefined,  undefined)
                            }
                            this.teilService.create(this.teil).subscribe((respond: Teil) =>
                                console.log(respond), () => this.onSaveError());
                        }
                    }
                }, (respond: ResponseWrapper) => this.onError(respond.json),
                    () => {
                    this.saveBestellung(undefined, this.teils);
                    this.saveTeilSubkomponente();
                    this.saveFertigungsauftrag(this.teils);
                });
        }

     saveBestellung(moduse: Array<Modus>, kaufteile?: Array<Teil>) {
        this.bestellungService.query({
            size: 1000000
        })
            .subscribe((res: ResponseWrapper) => {
                this.bestellungen = res.json;
                const bestellungen = this.xml.getElementsByTagName('inwardstockmovement')[0].getElementsByTagName('order');
                let i;
                for (i = 0; i < bestellungen.length; i++) {
                    if (this.bestellungen !== undefined && this.bestellungen.length !== 0 && (this.bestellungen[i].nummer !== undefined
                        || this.bestellungen[i].periode !== undefined)) {
                        this.bestellung = this.bestellungen.find((bestellung) => (bestellung.nummer ===
                            (parseInt(bestellungen[i].getAttribute('id'), 10))) && bestellung.periode ===
                            parseInt(bestellungen[i].getAttribute('orderperiod'), 10));
                        this.bestellung.lieferzeit = parseInt(bestellungen[i].getAttribute('time'), 10);
                        this.bestellung.kaufmenge = parseInt(bestellungen[i].getAttribute('amount'), 10);
                        this.bestellung.materialkosten = parseFloat(bestellungen[i].getAttribute('materialcosts'));
                        this.bestellung.bestellkosten = parseFloat(bestellungen[i].getAttribute('ordercosts'));
                        this.bestellung.gesamtkosten = parseFloat(bestellungen[i].getAttribute('entirecosts'));
                        this.bestellung.stueckkosten = parseFloat(bestellungen[i].getAttribute('piececosts'));
                        this.bestellung.bestellstatus = Bestellstatus.GELIEFERT;
                        if (kaufteile !== undefined) {
                        this.teil = kaufteile.find((teil) => (teil.nummer === parseInt(bestellungen[i].getAttribute('article'), 10))
                            && (teil.periode === parseInt(bestellungen[i].getAttribute('orderperiod'), 10)));
                        this.bestellung.kaufteil = this.teil;
                        }
                        if (moduse !== undefined) {
                            this.modus = moduse.find((modus) => (modus.id === parseInt(bestellungen[i].getAttribute('mode'), 10)));
                            this.bestellung.modus = this.modus;
                        }
                        this.bestellungService.update(this.bestellung).subscribe((respond: Bestellung) =>
                            console.log(respond), () => this.onSaveError());
                    } else {
                        if (moduse !== undefined) {
                            this.modus = moduse.find((modus) => (modus.id === parseInt(bestellungen[i].getAttribute('mode'), 10)));
                        }
                        if (kaufteile !== undefined) {
                            this.teil = kaufteile.find((teil) => (teil.nummer === parseInt(bestellungen[i].getAttribute('article'), 10))
                                && (teil.periode === parseInt(bestellungen[i].getAttribute('orderperiod'), 10)));
                        }
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
                const futurebestellungen = this.xml.getElementsByTagName('futureinwardstockmovement')[0].getElementsByTagName('order');
                for (i = 0; i < futurebestellungen.length; i++) {
                    if (this.bestellungen !== undefined && this.bestellungen.length !== 0 && (this.bestellungen[i].nummer !== undefined
                        || this.bestellungen[i].periode !== undefined)) {
                        this.bestellung = this.bestellungen.find((bestellung) => bestellung.nummer ===
                            (parseInt(futurebestellungen[i].getAttribute('id'), 10)) && bestellung.periode ===
                            parseInt(futurebestellungen[i].getAttribute('orderperiod'), 10));
                        this.bestellung.lieferzeit = parseInt(bestellungen[i].getAttribute('time'), 10);
                        this.bestellung.kaufmenge = parseInt(bestellungen[i].getAttribute('amount'), 10);
                        this.bestellung.bestellstatus = Bestellstatus.UNTERWEGS;
                        if (kaufteile !== undefined) {
                            this.teil = kaufteile.find((teil) => (teil.nummer === parseInt(futurebestellungen[i].getAttribute('article'), 10))
                                && (teil.periode === parseInt(futurebestellungen[i].getAttribute('orderperiod'), 10)));
                            this.bestellung.kaufteil = this.teil;
                        }
                        if (moduse !== undefined) {
                            this.modus = moduse.find((modus) => (modus.id === parseInt(bestellungen[i].getAttribute('mode'), 10)));
                            this.bestellung.modus = this.modus;
                        }
                        this.bestellungService.update(this.bestellung).subscribe((respond: Bestellung) =>
                            console.log(respond), () => this.onSaveError());
                    } else {
                        if (kaufteile !== undefined) {
                            this.teil = kaufteile.find((teil) => (teil.nummer === parseInt(futurebestellungen[i].getAttribute('article'), 10))
                                && (teil.periode === parseInt(futurebestellungen[i].getAttribute('orderperiod'), 10)));
                        }
                        if (moduse !== undefined) {
                            this.modus = moduse.find((modus) => (modus.id === parseInt(bestellungen[i].getAttribute('mode'), 10)));
                        }
                        this.bestellung = new Bestellung(undefined, parseInt(futurebestellungen[i].getAttribute('orderperiod'), 10),
                            parseInt(futurebestellungen[i].getAttribute('id'), 10),
                            undefined, parseInt(futurebestellungen[i].getAttribute('amount'), 10),
                            undefined, undefined, undefined, undefined,
                            Bestellstatus.UNTERWEGS, this.modus, this.teil);
                        this.bestellungService.create(this.bestellung).subscribe((respond: Bestellung) =>
                            console.log(respond), () => this.onSaveError());
                    }
                }
            }, (respond: ResponseWrapper) => this.onError(respond.json));

    }

    saveArbeitsplatz() {

        this.arbeitsplatzService.query({
            size: 1000000
        })
            .subscribe((res: ResponseWrapper) => {
                this.arbeitsplaetze = res.json;
                let i;
                // && this.arbeitsplaetze[i].periode !== undefined
                const arbeitsplaetze = this.xml.getElementsByTagName('idletimecosts')[0].getElementsByTagName('workplace');
                for (i = 0; i < arbeitsplaetze.length; i++) {
                    if (this.arbeitsplaetze !== undefined && this.arbeitsplaetze.length !== 0
                        && (this.arbeitsplaetze[i].nummer !== undefined || this.arbeitsplaetze[i].periode !== undefined)) {
                        // && parseInt(arbeitsplaetze[i].getAttribute("period"))
                        this.arbeitsplatz = this.arbeitsplaetze.find((arbeitsplatz) => (arbeitsplatz.nummer ===
                            (parseInt(arbeitsplaetze[i].getAttribute('id'), 10))) && arbeitsplatz.periode ===
                            this.periode);
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
            size: 1000000
        })
            .subscribe((res: ResponseWrapper) => {
                this.arbeitsplaetze = res.json;
                let i;
                const arbeitsplaetze2 = this.xml.getElementsByTagName('waitinglistworkstations')[0].getElementsByTagName('workplace');
                for ( i = 0; i < arbeitsplaetze2.length; i++) {
                    if (this.arbeitsplaetze !== undefined && this.arbeitsplaetze.length !== 0
                        && (this.arbeitsplaetze[i].nummer !== undefined || this.arbeitsplaetze[i].periode !== undefined)) {
                        // && parseInt(arbeitsplaetze2[i].getAttribute("period"))
                        this.arbeitsplatz = this.arbeitsplaetze.find((arbeitsplatz) => (arbeitsplatz.nummer ===
                            (parseInt(arbeitsplaetze2[i].getAttribute('id'), 10))) && arbeitsplatz.periode ===
                            this.periode);
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
                        // && this.arbeitsplaetze[i].periode !== undefined
                        for (i = 0; i < arbeitsplaetze3.length; i++) {
                            if (this.arbeitsplaetze !== undefined && this.arbeitsplaetze.length !== 0
                                && (this.arbeitsplaetze[i].nummer !== undefined || this.arbeitsplaetze[i].periode !== undefined)) {
                                // && arbeitsplatz.periode === parseInt(arbeitsplaetze3[i].getAttribute("period")))
                                this.arbeitsplatz = this.arbeitsplaetze.find((arbeitsplatz) => (arbeitsplatz.nummer ===
                                    (parseInt(arbeitsplaetze3[i].getAttribute('id'), 10))) && arbeitsplatz.periode ===
                                    parseInt(arbeitsplaetze3[i].getAttribute('period'), 10));
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

    saveFertigungsauftrag(teile?: Array<Teil>) {

       this.fertigungsauftragService.query({
           size: 1000000
       })
            .subscribe((res: ResponseWrapper) => {
                this.fertigungsauftraege = res.json;
                const fertigungsauftraege = this.xml.getElementsByTagName('completedorders')[0].getElementsByTagName('order');
                let i;
                for (i = 0; i < fertigungsauftraege.length; i++) {
                    if (this.fertigungsauftraege !== undefined && this.fertigungsauftraege.length !== 0
                    && this.fertigungsauftraege[i].nummer !== undefined && this.fertigungsauftraege[i].periode !== undefined) {
                        this.fertigungsauftrag = this.fertigungsauftraege.find((fertigungsauftrag) => (fertigungsauftrag.nummer ===
                            (parseInt(fertigungsauftraege[i].getAttribute('id'), 10))) && fertigungsauftrag.periode ===
                            parseInt(fertigungsauftraege[i].getAttribute('period'), 10));
                        if (this.fertigungsauftrag.begonnen !== null) {
                            this.fertigungsauftrag.auftragsstatus = Auftragstatus.BEENDET;
                        } else {
                            this.fertigungsauftrag.auftragsstatus = Auftragstatus.ANGEFANGEN;
                        }
                        this.fertigungsauftrag.auftragsmenge = parseInt(fertigungsauftraege[i].getAttribute('quantity'), 10);
                        this.fertigungsauftrag.kosten = parseFloat(fertigungsauftraege[i].getAttribute('cost'));
                        this.fertigungsauftrag.durchschnittlichestueckkosten =  parseFloat(fertigungsauftraege[i].getAttribute('averageunitcosts'));
                        this.teil = teile.find((teil) => (teil.nummer === parseInt(fertigungsauftraege[i].getAttribute('item'), 10))
                            && (teil.periode === parseInt(fertigungsauftraege[i].getAttribute('period'), 10)));
                        this.fertigungsauftrag.herstellteil = this.teil;
                        this.fertigungsauftragService.update(this.fertigungsauftrag).subscribe((respond: Fertigungsauftrag) =>
                            console.log(respond), () => this.onSaveError());
                    } else {
                        if (fertigungsauftraege[i].getAttribute('starttime') !== null) {
                            this.teil = teile.find((teil) => (teil.nummer === parseInt(fertigungsauftraege[i].getAttribute('item'), 10))
                                && (teil.periode === parseInt(fertigungsauftraege[i].getAttribute('period'), 10)));
                            this.fertigungsauftrag = new Fertigungsauftrag(undefined, parseInt(fertigungsauftraege[i].getAttribute('period'), 10),
                                parseInt(fertigungsauftraege[i].getAttribute('id'), 10), parseInt(fertigungsauftraege[i].getAttribute('quantity'), 10),
                                parseFloat(fertigungsauftraege[i].getAttribute('cost')), parseFloat(fertigungsauftraege[i].getAttribute('averageunitcosts')),
                                Auftragstatus.BEENDET, undefined, undefined, undefined, undefined, undefined, this.teil);
                        } else {
                            this.teil = this.teils.find((teil) => (teil.nummer === parseInt(fertigungsauftraege[i].getAttribute('item'), 10))
                                && (teil.periode === parseInt(fertigungsauftraege[i].getAttribute('period'), 10)));
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
                    size: 1000000
                })
                    .subscribe((res: ResponseWrapper) => {
                        this.fertigungsauftraege = res.json;
                        let i;
                        const fertigungsauftraege2 = this.xml.getElementsByTagName('cycletimes')[0].getElementsByTagName('order');
                        for (i = 0; i < fertigungsauftraege2.length; i++) {
                            if (this.fertigungsauftraege !== undefined && this.fertigungsauftraege.length !== 0
                                && this.fertigungsauftraege[i].nummer !== undefined && this.fertigungsauftraege[i].periode !== undefined) {
                                this.fertigungsauftrag = this.fertigungsauftraege.find((fertigungsauftrag) => (fertigungsauftrag.nummer ===
                                    (parseInt(fertigungsauftraege2[i].getAttribute('id'), 10))) && fertigungsauftrag.periode ===
                                    parseInt(fertigungsauftraege2[i].getAttribute('period'), 10));
                                this.fertigungsauftrag.begonnen = fertigungsauftraege2[i].getAttribute('starttime');
                                if (this.fertigungsauftrag.begonnen !== null) {
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
                                if (fertigungsauftraege2[i].getAttribute('starttime') !== null) {
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

    saveLos() {
        this.fertigungsauftragService.query({
            size: 1000000
        })
            .subscribe((res: ResponseWrapper) => {
                this.fertigungsauftraege = res.json;
                if (this.fertigungsauftraege.length !== 0 && this.fertigungsauftraege.length !== undefined) {
                    let i;
                    let j;
                    for (i = 0; i < this.fertigungsauftraege.length; i++) {
                        const lose = this.xml.getElementsByTagName('completedorders')[0].getElementsByTagName('order')[i].getElementsByTagName('batch');
                        this.losService.query()
                            .subscribe((response: ResponseWrapper) => {
                                this.lose = response.json;
                                for (j = 0; j < lose.length; j++) {
                                    if (this.lose !== undefined && this.lose.length !== 0
                                        && this.lose[j].nummer !== undefined && this.lose[j].periode !== undefined) {
                                        /*this.los = this.lose.find((los) => los.nummer === (parseInt(lose[j].getAttribute('id'), 10))
                                            && (los.periode === this.periode) && (los.fertigungsauftrag.id === this.fertigungsauftrag.id));*/
                                        this.los.menge = parseInt(lose[j].getAttribute('amount'), 10);
                                        this.los.durchlaufzeit = parseInt(lose[j].getAttribute('cycletime'), 10);
                                        this.los.kosten = parseFloat(lose[j].getAttribute('cost'));
                                        this.losService.update(this.los).subscribe((respond: Los) =>
                                            console.log(respond), () => this.onSaveError());
                                    } else {
                                        this.los = new Los(undefined, this.periode, parseInt(lose[j].getAttribute('id'), 10),
                                            parseInt(lose[j].getAttribute('amount'), 10), parseInt(lose[j].getAttribute('cycletime'), 10),
                                            parseFloat(lose[j].getAttribute('cost')));
                                        this.losService.create(this.los).subscribe((respond: Los) =>
                                            console.log(respond), () => this.onSaveError());
                                    }
                                }
                            }, (response: ResponseWrapper) => this.onError(response.json));
                    }
                }
        }, (res: ResponseWrapper) => this.onError(res.json));
    }
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
        this.kennzahlService.query(
            {
                size: 1000000
            }
        )
            .subscribe((response: ResponseWrapper) => {
                this.kennzahlen = response.json;
                    if (this.kennzahlen !== undefined && this.kennzahlen.length !== 0) {
                       /* this.kennzahl = this.kennzahlen.find((kennzahl) => kennzahl.name === (parseInt(lose[j].getAttribute('id'), 10)) && (kennzahl.periode === this.periode));
                        this.kennzahl.aktuell = 0;
                        this.kennzahl.durchschnitt = 0;
                        this.kennzahl.gesamt = 0;
                        this.kennzahlService.update(this.kennzahl).subscribe((respond: Kennzahlen) =>
                            console.log(respond), (respond: Response) => this.onSaveError());*/
                    } else {
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

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
