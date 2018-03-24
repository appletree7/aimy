import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Principal, ResponseWrapper} from '../../shared';
import {Arbeitsplatz} from '../../entities/arbeitsplatz/arbeitsplatz.model';
import {TeilService} from '../../entities/teil/teil.service';
import {Teil, Teiltyp} from '../../entities/teil/teil.model';
import {Bestellstatus, Bestellung} from '../../entities/bestellung';
import {BestellungService} from '../../entities/bestellung/bestellung.service';
import {ArbeitsplatzService} from '../../entities/arbeitsplatz/arbeitsplatz.service';
import {Fertigungsauftrag} from '../../entities/fertigungsauftrag/fertigungsauftrag.model';
import {Auftragstatus, FertigungsauftragService} from '../../entities/fertigungsauftrag';
import {Los, LosService} from '../../entities/los';

@Component({
    selector: 'jhi-period-start',
    templateUrl: './period_start.component.html'
})
export class PeriodStartComponent implements OnInit {
    message: string;
    isSaving: boolean;
    teil: Teil;
    teils: Teil[];
    bestellung: Bestellung;
    bestellungen: Bestellung[];
    arbeitsplatz: Arbeitsplatz;
    arbeitsplaetze: Arbeitsplatz[];
    fertigungsauftrag: Fertigungsauftrag;
    fertigungsauftraege: Fertigungsauftrag[];
    los: Los;
    lose: Los[];
    // kennzahl: Kennzahlen
    text: string;
    xml: Document;
    currentAccount: any;
    eventSubscriber: Subscription;
    aktuelleperiode: number;
    periode: number;

    constructor(
        private teilService: TeilService,
        private bestellungService: BestellungService,
        private arbeitsplatzService: ArbeitsplatzService,
        private fertigungsauftragService: FertigungsauftragService,
        private losService: LosService,
        // private kennzahlService: KennzahlenService,
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
        reader.onloadend = (e) => {
            this.text = reader.result;
            const parser = new DOMParser();
            this.xml = parser.parseFromString(this.text, 'text/xml');
        };
            reader.readAsText(file);
    }

    save() {
        if(this.aktuelleperiode !== undefined) {
            localStorage.setItem('aktuelleperiode', this.aktuelleperiode.toString());
        }
        if(this.xml !== undefined) {
            this.periode = parseInt(this.xml.getElementsByTagName('results')[0].getAttribute('period'), 10)
            this.saveTeil();
            this.saveBestellung();
            this.saveArbeitsplatz();
            this.saveFertigungsauftrag();
            // Kennzahlen
            /*  for (let kennzahl of this.json.results.cycletimes.result.general) {
                  this.fertigungsauftrag = new Fertigungsauftrag(undefined, auftrag._attributes.period, auftrag._attributes.id,
                  undefined, undefined, undefined, undefined, auftrag._attributes.starttime, auftrag._attributes.finishtime,
                  auftrag._attributes.cycletimemin);
                  this.fertigungsauftragService.create(this.fertigungsauftrag).subscribe((res: Fertigungsauftrag) =>
                      console.log(this.fertigungsauftrag), (res: Response) => this.onSaveError());
              }*/
            this.isSaving = true;
            this.message = 'Speicherung der Daten erfolgreich';
        }
    }

    saveTeil() {
        this.teilService.query()
            .subscribe((res: ResponseWrapper) => {
                this.teils = res.json;
                const teile = this.xml.getElementsByTagName('warehousestock')[0].getElementsByTagName('article');
                let i;
                for (i = 0; i < teile.length; i++) {
                    if (this.teils !== undefined && this.teils.length !== 0 && (this.teils[i].nummer !== undefined || this.teils[i].periode !== undefined)) {
                        this.teil = this.teils.find((teil) => teil.nummer === teile[i].getAttribute('id') && teil.periode === this.periode);
                        if(parseInt(this.teil.nummer, 10) <= 3){
                            this.teil.teiltyp = Teiltyp.PRODUKT;
                        } else if(((parseInt(this.teil.nummer, 10) > 3) && (parseInt(this.teil.nummer, 10) < 21)) || ((parseInt(this.teil.nummer, 10) > 28) && (parseInt(this.teil.nummer, 10) < 32)) || ((parseInt(this.teil.nummer, 10) > 48) && (parseInt(this.teil.nummer, 10) < 52)) || ((parseInt(this.teil.nummer, 10) > 53) && (parseInt(this.teil.nummer, 10) < 57))){
                            this.teil.teiltyp = Teiltyp.ERZEUGNIS;
                        } else {
                            this.teil.teiltyp = Teiltyp.KAUFTEIL;
                        }
                        // this.teil.nummer = teile[i].getAttribute("id");
                        this.teil.istmenge = parseInt(teile[i].getAttribute('amount'), 10);
                        this.teil.startmenge = parseInt(teile[i].getAttribute('startamount'), 10);
                        this.teil.prozentsatz = parseFloat(teile[i].getAttribute('pct'));
                        this.teil.lagerpreis = parseFloat(teile[i].getAttribute('price'));
                        this.teil.lagerwert = parseFloat(teile[i].getAttribute('stockvalue'));
                        // this.teil.arbeitsplatz
                        this.teilService.update(this.teil).subscribe((respond: Teil) =>
                            console.log(respond), (respond: Response) => this.onSaveError());
                    } else {
                        if(parseInt(teile[i].getAttribute('id'), 10) <= 3){
                            this.teil = new Teil(undefined, Teiltyp.PRODUKT, teile[i].getAttribute('id'),
                                parseInt(teile[i].getAttribute('amount'), 10), parseInt(teile[i].getAttribute('startamount'), 10),
                                parseFloat(teile[i].getAttribute('pct')), parseFloat(teile[i].getAttribute('price')),
                                parseFloat(teile[i].getAttribute('stockvalue')), undefined, undefined,
                                this.periode, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
                        } else if(((parseInt(teile[i].getAttribute('id'), 10) > 3) && (parseInt(teile[i].getAttribute('id'), 10) < 21)) || ((parseInt(teile[i].getAttribute('id'), 10) > 28) && (parseInt(teile[i].getAttribute('id'), 10) < 32)) || ((parseInt(teile[i].getAttribute('id'), 10) > 48) && (parseInt(teile[i].getAttribute('id'), 10) < 52)) || ((parseInt(teile[i].getAttribute('id'), 10) > 53) && (parseInt(teile[i].getAttribute('id'), 10) < 57))){
                            this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, teile[i].getAttribute('id'),
                                parseInt(teile[i].getAttribute('amount'), 10), parseInt(teile[i].getAttribute('startamount'), 10),
                                parseFloat(teile[i].getAttribute('pct')), parseFloat(teile[i].getAttribute('price')),
                                parseFloat(teile[i].getAttribute('stockvalue')), undefined, undefined,
                                this.periode, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
                        } else {
                            this.teil = new Teil(undefined, Teiltyp.KAUFTEIL, teile[i].getAttribute('id'),
                                parseInt(teile[i].getAttribute('amount'), 10), parseInt(teile[i].getAttribute('startamount'), 10),
                                parseFloat(teile[i].getAttribute('pct')), parseFloat(teile[i].getAttribute('price')),
                                parseFloat(teile[i].getAttribute('stockvalue')), undefined, undefined,
                                this.periode, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
                        }
                        this.teilService.create(this.teil).subscribe((respond: Teil) =>
                            console.log(respond), (respond: Response) => this.onSaveError());
                    }
                }
            }, (respond: ResponseWrapper) => this.onError(respond.json));

        }

    saveBestellung() {
        this.bestellungService.query()
            .subscribe((res: ResponseWrapper) => {
                this.bestellungen = res.json;
                const bestellungen = this.xml.getElementsByTagName('inwardstockmovement')[0].getElementsByTagName('order');
                let i;
                for (i = 0; i < bestellungen.length; i++) {
                    if (this.bestellungen !== undefined && this.bestellungen.length !== 0 && this.bestellungen[i].nummer !== undefined
                        && this.bestellungen[i].periode !== undefined) {
                        this.bestellung = this.bestellungen.find((bestellung) => bestellung.nummer ===
                            (parseInt(bestellungen[i].getAttribute('id'), 10)) && bestellung.periode ===
                            parseInt(bestellungen[i].getAttribute('orderperiod'), 10));
                        this.bestellung.lieferzeit = parseInt(bestellungen[i].getAttribute('time'), 10);
                        this.bestellung.kaufmenge = parseInt(bestellungen[i].getAttribute('amount'), 10);
                        this.bestellung.materialkosten = parseFloat(bestellungen[i].getAttribute('materialcosts'));
                        this.bestellung.bestellkosten = parseFloat(bestellungen[i].getAttribute('ordercosts'));
                        this.bestellung.gesamtkosten = parseFloat(bestellungen[i].getAttribute('entirecosts'));
                        this.bestellung.stueckkosten = parseFloat(bestellungen[i].getAttribute('piececosts'));
                        this.bestellungService.update(this.bestellung).subscribe((respond: Bestellung) =>
                            console.log(respond), (respond: Response) => this.onSaveError());
                    } else {
                        this.bestellung = new Bestellung(undefined, parseInt(bestellungen[i].getAttribute('orderperiod'), 10),
                            parseInt(bestellungen[i].getAttribute('id'), 10), undefined,
                            parseInt(bestellungen[i].getAttribute('time'), 10), parseInt(bestellungen[i].getAttribute('amount'), 10),
                            undefined, parseFloat(bestellungen[i].getAttribute('materialcosts')),
                            parseFloat(bestellungen[i].getAttribute('ordercosts')),
                            parseFloat(bestellungen[i].getAttribute('entirecosts')),
                            parseFloat(bestellungen[i].getAttribute('piececosts')),
                            Bestellstatus.GELIEFERT, undefined, undefined);
                        this.bestellungService.create(this.bestellung).subscribe((respond: Bestellung) =>
                            console.log(respond), (respond: Response) => this.onSaveError());
                    }
                }
                const futurebestellungen = this.xml.getElementsByTagName('futureinwardstockmovement')[0].getElementsByTagName('order');
                for (i = 0; i < futurebestellungen.length; i++) {
                    if (this.bestellungen !== undefined && this.bestellungen.length !== 0 && this.bestellungen[i].nummer !== undefined
                        && this.bestellungen[i].periode !== undefined) {
                        this.bestellung = this.bestellungen.find((bestellung) => bestellung.nummer ===
                            (parseInt(futurebestellungen[i].getAttribute('id'), 10)) && bestellung.periode ===
                            parseInt(futurebestellungen[i].getAttribute('orderperiod'), 10));
                        this.bestellung.lieferzeit = parseInt(bestellungen[i].getAttribute('time'), 10);
                        this.bestellung.kaufmenge = parseInt(bestellungen[i].getAttribute('amount'), 10);
                        this.bestellungService.update(this.bestellung).subscribe((respond: Bestellung) =>
                            console.log(respond), (respond: Response) => this.onSaveError());
                    } else {
                        this.bestellung = new Bestellung(undefined, parseInt(futurebestellungen[i].getAttribute('orderperiod'), 10),
                            parseInt(futurebestellungen[i].getAttribute('id'), 10), undefined,
                            undefined, parseInt(futurebestellungen[i].getAttribute('amount'), 10),
                            undefined, undefined, undefined,
                            undefined, undefined,
                            Bestellstatus.UNTERWEGS, undefined, undefined);
                        this.bestellungService.create(this.bestellung).subscribe((respond: Bestellung) =>
                            console.log(respond), (respond: Response) => this.onSaveError());
                    }
                }

            }, (respond: ResponseWrapper) => this.onError(respond.json));

    }

    saveArbeitsplatz() {

        this.arbeitsplatzService.query()
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
                            console.log(respond), (respond: Response) => this.onSaveError());
                    } else {
                        this.arbeitsplatz = new Arbeitsplatz(undefined, this.periode, parseInt(arbeitsplaetze[i].getAttribute('id'), 10),
                            undefined, parseInt(arbeitsplaetze[i].getAttribute('setupevents'), 10),
                            parseInt(arbeitsplaetze[i].getAttribute('idletime'), 10),
                            parseFloat(arbeitsplaetze[i].getAttribute('wageidletimecosts')),
                            parseFloat(arbeitsplaetze[i].getAttribute('wagecosts')),
                            parseFloat(arbeitsplaetze[i].getAttribute('machineidletimecosts')), undefined, undefined,
                            undefined);
                        this.arbeitsplatzService.create(this.arbeitsplatz).subscribe((respond: Arbeitsplatz) =>
                            console.log(respond), (respond: Response) => this.onSaveError());
                    }
                }
            }, (respond: ResponseWrapper) => this.onError(respond.json), ()=> {

        this.arbeitsplatzService.query()
            .subscribe((res: ResponseWrapper) => {
                this.arbeitsplaetze = res.json;
                let i;
                // verbessern
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
                            console.log(respond), (respond: Response) => this.onSaveError());
                    } else {
                        this.arbeitsplatz = new Arbeitsplatz(undefined, this.periode, parseInt(arbeitsplaetze2[i].getAttribute('id'), 10),
                            parseInt(arbeitsplaetze2[i].getAttribute('timeneed'), 10), undefined, undefined,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined);
                        this.arbeitsplatzService.create(this.arbeitsplatz).subscribe((respond: Arbeitsplatz) =>
                            console.log(respond), (respond: Response) => this.onSaveError());
                    }
                }
            }, (respond: ResponseWrapper) => this.onError(respond.json), () => {

                this.arbeitsplatzService.query()
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
                                    console.log(respond), (respond: Response) => this.onSaveError());
                            } else {
                                this.arbeitsplatz = new Arbeitsplatz(undefined, parseInt(arbeitsplaetze3[i].getAttribute('period'), 10),
                                    parseInt(arbeitsplaetze3[i].getAttribute('id'), 10), undefined, undefined,
                                    undefined, undefined, undefined, undefined,
                                    parseInt(arbeitsplaetze3[i].getAttribute('timeneed'), 10), undefined, undefined);
                                this.arbeitsplatzService.create(this.arbeitsplatz).subscribe((respond: Arbeitsplatz) =>
                                    console.log(respond), (respond: Response) => this.onSaveError());
                            }
                        }
                    }, (respond: ResponseWrapper) => this.onError(respond.json));
                } );
            } );

    }

    saveFertigungsauftrag() {

       this.fertigungsauftragService.query()
            .subscribe((res: ResponseWrapper) => {
                this.fertigungsauftraege = res.json;
                const fertigungsauftraege = this.xml.getElementsByTagName("completedorders")[0].getElementsByTagName("order");
                let i;
                let j;
                for (i = 0; i < fertigungsauftraege.length; i++) {
                    if(this.fertigungsauftraege !== undefined && this.fertigungsauftraege.length !== 0
                    && this.fertigungsauftraege[i].nummer !== undefined && this.fertigungsauftraege[i].periode !== undefined) {
                        this.fertigungsauftrag = this.fertigungsauftraege.find((fertigungsauftrag) => fertigungsauftrag.nummer ===
                        (parseInt(fertigungsauftraege[i].getAttribute("id")) && parseInt(fertigungsauftraege[i].getAttribute("period"))));
                        this.fertigungsauftrag.auftragsmenge = parseInt(fertigungsauftraege[i].getAttribute("quantity"));
                        this.fertigungsauftrag.kostenprolos = parseFloat(fertigungsauftraege[i].getAttribute("cost"));
                        this.fertigungsauftrag.durchschnittlichestueckkosten =  parseFloat(fertigungsauftraege[i].getAttribute("averageunitcosts"));
                        this.fertigungsauftrag.auftragsstatus = Auftragstatus.BEENDET;
                        this.fertigungsauftragService.update(this.fertigungsauftrag).subscribe((respond: Fertigungsauftrag) =>
                            console.log(respond), (respond: Response) => this.onSaveError());;
                    } else {
                        this.fertigungsauftrag = new Fertigungsauftrag(undefined, parseInt(fertigungsauftraege[i].getAttribute("period")),
                        parseInt(fertigungsauftraege[i].getAttribute("quantity")),
                        parseFloat(fertigungsauftraege[i].getAttribute("cost")),
                        parseFloat(fertigungsauftraege[i].getAttribute("averageunitcosts")), Auftragstatus.BEENDET, undefined,
                            undefined, undefined, undefined,  parseInt(fertigungsauftraege[i].getAttribute("id")));
                        this.fertigungsauftragService.create(this.fertigungsauftrag).subscribe((respond: Fertigungsauftrag) =>
                            console.log(respond), (respond: Response) => this.onSaveError());
                        const lose = this.xml.getElementsByTagName("completedorders")[0].getElementsByTagName("order")[i].
                        getElementsByTagName("batch")

                        this.losService.query()
                            .subscribe((res: ResponseWrapper) => {
                                this.lose = res.json;
                                for (j = 0; j < lose.length;j ++) {
                                    if(this.fertigungsauftraege !== undefined && this.fertigungsauftraege.length !== 0
                                    && this.fertigungsauftraege[i].nummer !== undefined && this.fertigungsauftraege[i].periode !== undefined) {
                                        this.los = this.lose.find((los) => los.nummer === parseInt(lose[i].getAttribute("id")) && los.periode === parseInt(lose[i].getAttribute("id")));
                                        this.los.menge = parseInt(lose[j].getAttribute("amount"));
                                        this.los.durchlaufzeit = parseInt(lose[j].getAttribute("cycletime"));
                                        this.los.kosten = parseFloat(lose[j].getAttribute("cost"));
                                        this.losService.update(this.los).subscribe((respond: Los) =>
                                            console.log(respond), (respond: Response) => this.onSaveError());;
                                    }
                                    else {
                                        this.los = new Los(undefined, this.periode, parseInt(lose[j].getAttribute("amount")),
                                        parseInt(lose[j].getAttribute("cycletime")), parseFloat(lose[j].getAttribute("cost")), parseInt(lose[j].getAttribute("id")));
                                        this.losService.create(this.los).subscribe((respond: Los) =>
                                        console.log(respond), (respond: Response) => this.onSaveError());
                                    }
                            }
                                }, (res: ResponseWrapper) => this.onError(res.json));
                    }
                }
            }, (res: ResponseWrapper) => this.onError(res.json), () => {

                this.fertigungsauftragService.query()
                    .subscribe((res: ResponseWrapper) => {
                        var i;
                        const fertigungsauftraege2 = this.xml.getElementsByTagName("cycletimes")[0].getElementsByTagName("order");
                        for (i = 0; i < fertigungsauftraege2.length; i++) {
                            if (this.fertigungsauftraege !== undefined && this.fertigungsauftraege.length !== 0
                                && this.fertigungsauftraege[i].nummer !== undefined && this.fertigungsauftraege[i].periode !== undefined) {
                                this.fertigungsauftrag = this.fertigungsauftraege.find((fertigungsauftrag) => fertigungsauftrag.nummer ===
                                    (parseInt(fertigungsauftraege2[i].getAttribute("id")) && parseInt(fertigungsauftraege2[i].getAttribute("period"))));
                                this.fertigungsauftrag.begonnen = fertigungsauftraege2[i].getAttribute("starttime");
                                this.fertigungsauftrag.beendet = fertigungsauftraege2[i].getAttribute("finishtime");
                                this.fertigungsauftrag.dlzminimal = parseInt(fertigungsauftraege2[i].getAttribute("cycletimemin"));
                                this.fertigungsauftrag.dlzFaktor = parseFloat(fertigungsauftraege2[i].getAttribute("cycletimefactor"));
                                this.fertigungsauftragService.update(this.fertigungsauftrag).subscribe((respond: Fertigungsauftrag) =>
                                    console.log(respond), (respond: Response) => this.onSaveError());
                            } else {
                                this.fertigungsauftrag = new Fertigungsauftrag(undefined, parseInt(fertigungsauftraege2[i].getAttribute("period")),
                                    undefined, undefined, undefined, undefined,
                                    fertigungsauftraege2[i].getAttribute("starttime"), fertigungsauftraege2[i].getAttribute("finishtime"),
                                    parseInt(fertigungsauftraege2[i].getAttribute("cycletimemin")), parseFloat(fertigungsauftraege2[i].getAttribute("cycletimefactor")), parseInt(fertigungsauftraege2[i].getAttribute("id")));
                                this.fertigungsauftragService.create(this.fertigungsauftrag).subscribe((respond: Fertigungsauftrag) =>
                                    console.log(respond), (respond: Response) => this.onSaveError());
                            }
                        }

                    }, (res: ResponseWrapper) => this.onError(res.json));
            });

    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
