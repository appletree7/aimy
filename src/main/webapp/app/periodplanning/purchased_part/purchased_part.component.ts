import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { PurchasedPart } from '../../entities/anzeige/purchased_part.model';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Teil, Teiltyp } from '../../entities/teil';
import { Bestellung, Bestellstatus } from '../../entities/bestellung';
import { TeilService } from '../../entities/teil';
import { BestellungService } from '../../entities/bestellung';
import { Modus } from '../../entities/modus';
import { ModusService } from '../../entities/modus';
import { Principal, ResponseWrapper } from '../../shared';
import * as d3 from 'd3';

@Component({
    selector: 'jhi-purchased-part',

    templateUrl: './purchased_part.component.html',

})
export class PurchasedPartComponent implements OnInit {

    teil: Teil;
    alle_teile: Teil[];
    kaufteile: Teil[];
    kaufteile_mehere_Perioden: Teil[];
    teils: Teil[];
    modus: Modus;
    modi: Modus[];
    kaufteile_vorperiode: Teil[];
    bedarfdurchschnittKaufteil = [];
    account: any;
    currentAccount: any;
    eventSubscriber: Subscription;

    lieferdauer_array: Array<number>;
    kaufteile_array = [21, 22, 23, 24, 25, 27, 28, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 52, 53, 57, 58, 59];
    lagerbestand__kaufteile_periode0 = [300, 300, 300, 6100, 3600, 1800, 4500, 2700, 900, 22000, 3600, 900, 900, 300, 900, 900, 900,
    1800, 1900, 2700, 900, 900, 900, 1800, 600, 22000, 600, 22000, 1800];
    preis__kaufteile_periode0 = [5.00, 6.50, 6.50, 0.06, 0.06, 0.10, 1.20, 0.75, 22.00, 0.10, 1.00, 8.00, 1.50, 1.50, 1.50, 2.50, 0.06,
        0.10, 5.00, 0.50, 0.06, 0.10, 3.50, 1.50, 22.00, 0.10, 22.00, 0.10, 0.15];
    hoechstbestand = [300, 300, 300, 6100, 3600, 1800, 4500, 2700, 900, 22000, 3600, 900, 900, 300, 900, 900, 900,
        1800, 1900, 2700, 900, 900, 900, 1800, 600, 22000, 600, 22000, 1800];
    kaufteile_lieferdauer_max_array = [];

    sicherheitszeit_array: Array<number>;
    lieferdauer_max_array: any;
    diskontmenge_array: any;
    verwendung_array: any;
    bestellkosten_array: any;
    lagerwert_gesamt: number;
    lagerkostensatz: number;
    sicherheitsbestand_array = [];
    bestellpunkt_array = [];
    reichweite_array = [];
    modusnummerkaufteil = [];
    optBestellmenge = [];
    bestellmenge = [];
    gesamtes_array = [];
    empfohlene_neue_Bestellungen_array = [];

    einstandspreis = [];
    alte_bestellungen = [];
    alte_bestellungen_kaufteil_array = [];
    diskontpreis
    bestellungen = [];
    bestellungen_DB = [];
    bestellung: Bestellung;
    isSaving: boolean;
    kaufteil: Teil;
    teiltyp: Teiltyp.KAUFTEIL;
    lagerkosten: number;
    bestellkosten: number;
    materialkosten: number;
    beschaffungskosten: number;
    diskontmenge_teil_array = [];

    constructor(
        private eventManager: JhiEventManager,
        private teilService: TeilService,
        private bestellungService: BestellungService,
        private modusService: ModusService,
        private jhiAlertService: JhiAlertService,
        private principal: Principal
    ) { }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.isSaving = false;

        this.lieferdauer_max_array = [2.2, 2.1, 1.4, 3.5, 1.1, 1.1, 2.1, 2.6, 2.4, 1.9, 2.6, 1.3, 1.8, 2.1, 1.8, 1.9, 1.1, 1.5, 2.5,
            1.2, 2.0, 1.2, 1.2, 1.2, 2.0, 1.8, 2.0, 2.1, 0.9];
        this.lieferdauer_array = [1.8, 1.7, 1.2, 3.2, 0.9, 0.9, 1.7, 2.1, 1.9, 1.6, 2.2, 1.2, 1.5, 1.7, 1.5, 1.7, 0.9, 1.2, 2.0,
            1.0, 1.7, 0.9, 1.1, 1.0, 1.6, 1.6, 1.7, 1.6, 0.7];
        this.sicherheitszeit_array = [0.4, 0.4, 0.2, 0.3, 0.2, 0.2, 0.4, 0.5, 0.5, 0.3, 0.4, 0.1, 0.3, 0.4, 0.3, 0.2, 0.2, 0.3, 0.5,
            0.2, 0.3, 0.3, 0.1, 0.2, 0.4, 0.2, 0.3, 0.5, 0.2];
        this.diskontmenge_array = [300, 300, 300, 6100, 3600, 1800, 4500, 2700, 900, 22000, 3600, 900, 900, 300, 1800, 900, 900, 1800,
            2700, 900, 900, 900, 900, 1800, 600, 22000, 600, 22000, 1800];
        this.verwendung_array = [[1, 0, 0], [0, 1, 0], [0, 0, 1], [7, 7, 7], [4, 4, 4], [2, 2, 2], [4, 5, 6], [3, 3, 3], [0, 0, 2], [0, 0, 72],
            [4, 4, 4], [1, 1, 1], [1, 1, 1], [1, 1, 1], [2, 2, 2], [1, 1, 1], [1, 1, 1 ], [2, 2, 2], [1, 1, 1], [3, 3, 3], [1, 1, 1],
            [1, 1, 1], [1, 1, 1], [2, 2, 2], [2, 0, 0], [72, 0, 0], [0, 2, 0], [0, 72, 0], [2, 2, 2]];
        this.bestellkosten_array = [50.00, 50.00, 50.00, 100.00, 50.00, 75.00, 50.00, 50.00, 75.00, 50.00, 75.00, 100.00, 50.00, 50.00,
            75.00, 50.00, 50.00, 50.00, 75.00, 50.00, 50.00, 50.00, 50.00, 75.00, 50.00, 50.00, 50.00, 50.00, 50.00];

        for (let i = 0; i < this.kaufteile_array.length; i++) {
            this.diskontmenge_teil_array.push(new Object({
                nummer: this.kaufteile_array[i],
                kaufpreis0: this.preis__kaufteile_periode0[i],
                diskontmenge: this.diskontmenge_array[i],
            }))
        }

        this.modusService.query({
            size: 1000000,
        }).subscribe((res: ResponseWrapper) => {
            this.modi = res.json;
        }, (res: ResponseWrapper) => this.onError(res.json));

       const criteria = [
            {key: 'teiltyp.in', value: 'KAUFTEIL'},
            {key: 'periode.equals', value: parseInt(localStorage.getItem('aktuelleperiode'), 10)}
        ];

        this.teilService.query({
            size: 1000000,
            criteria
        }).subscribe((res3: ResponseWrapper) => {
            this.kaufteile = res3.json;
            if (this.kaufteile.length === 0) {
                for (const kaufteil of this.kaufteile_array) {
                    this.teil = new Teil(undefined, Teiltyp.KAUFTEIL, parseInt(localStorage.getItem('aktuelleperiode'), 10),
                        kaufteil, undefined, undefined, undefined, undefined,
                        undefined, undefined, undefined, undefined,
                        undefined, undefined, undefined,
                        undefined, undefined, undefined,
                        undefined, undefined, undefined);
                    this.teilService.create(this.teil).subscribe((respond: Teil) =>
                        console.log(respond), () => this.onSaveError());
                }

            }
            this.kaufteile.sort((a, b) => a.nummer - b.nummer)
        }, (res3: ResponseWrapper) => this.onError(res3.json));

        this.berechnedurchscnittlichenVerbrauch();

    }

    berechnedurchscnittlichenVerbrauch() {

        let criteria = [
            {key: 'teiltyp.in', value: 'PRODUKT'},
            {key: 'periode.equals', value: parseInt(localStorage.getItem('aktuelleperiode'), 10)}
        ];

        this.teilService.query({
            size: 1000000,
            criteria
        }).subscribe((res: ResponseWrapper) => {
            this.teils = res.json;
            this.teils.sort((a, b) => a.nummer - b.nummer);

            criteria = [
                {key: 'teiltyp.in', value: 'KAUFTEIL'},
                {key: 'periode.equals', value: parseInt(localStorage.getItem('aktuelleperiode'), 10) - 1}
            ];

            this.teilService.query({
                size: 1000000,
                criteria
            }).subscribe((res2: ResponseWrapper) => {
                this.kaufteile_vorperiode = res2.json;
                this.kaufteile_vorperiode.sort((a, b) => a.nummer - b.nummer);

                if (this.kaufteile_vorperiode.length !== 0) {

                    const bedarfKaufteil = [];

                    for (let i = 0; i < this.kaufteile_vorperiode.length; i++) {

                        this.gesamtes_array.push(new PurchasedPart(undefined, this.kaufteile_vorperiode[i].nummer, undefined,
                            undefined, undefined, undefined, undefined, undefined));

                        this.gesamtes_array[i].diskontmenge = this.diskontmenge_array[i];

                        this.gesamtes_array[i].bestand = this.kaufteile_vorperiode[i].istmenge;

                        this.gesamtes_array[i].hoechstbestand = this.hoechstbestand[i];

                        if (this.kaufteile_vorperiode[i].teiltyp.toString() === 'KAUFTEIL') {
                            bedarfKaufteil.push(new Object(
                                {
                                    nummer: this.kaufteile_vorperiode[i].nummer,
                                    bedarf: 0,
                                    bedarf_naechste: 0,
                                    bedarf_uebernaechste: 0,
                                    bedarf_ueberuebernaechste: 0
                                }));
                        }

                        for (let j = 0; j < this.teils.length; j++) {
                            bedarfKaufteil[i].bedarf = this.verwendung_array[i][0] * this.teils[0].gesamtproduktionsmenge
                                + this.verwendung_array[i][1] * this.teils[1].gesamtproduktionsmenge + this.verwendung_array[i][2] * this.teils[2].gesamtproduktionsmenge;
                            bedarfKaufteil[i].bedarf_naechste = this.verwendung_array[i][0] * this.teils[0].vertriebswunsch_naechste
                                + this.verwendung_array[i][1] * this.teils[1].vertriebswunsch_naechste + this.verwendung_array[i][2] * this.teils[2].vertriebswunsch_naechste;
                            bedarfKaufteil[i].bedarf_uebernaechste = this.verwendung_array[i][0] * this.teils[0].vertriebswunsch_uebernaechste
                                + this.verwendung_array[i][1] * this.teils[1].vertriebswunsch_uebernaechste +
                                this.verwendung_array[i][2] * this.teils[2].vertriebswunsch_uebernaechste;
                            bedarfKaufteil[i].bedarf_ueberuebernaechste = this.verwendung_array[i][0] * this.teils[0].vertriebswunsch_ueberuebernaechste
                                + this.verwendung_array[i][1] * this.teils[1].vertriebswunsch_ueberuebernaechste
                                + this.verwendung_array[i][2] * this.teils[2].vertriebswunsch_ueberuebernaechste;
                        }

                        if (this.lieferdauer_max_array[i] <= 1) {
                            this.bedarfdurchschnittKaufteil.push(new Object(
                                {nummer: this.kaufteile_vorperiode[i].nummer, bedarfavg: bedarfKaufteil[i].bedarf}))
                        } else if (this.lieferdauer_max_array[i] > 1 && this.lieferdauer_max_array[i] <= 2) {
                            const durschnittbedarf = Math.round((bedarfKaufteil[i].bedarf + bedarfKaufteil[i].bedarf_naechste) / 2);
                            this.bedarfdurchschnittKaufteil.push(new Object(
                                {nummer: this.kaufteile_vorperiode[i].nummer, bedarfavg: durschnittbedarf}))
                        } else if (this.lieferdauer_max_array[i] > 2 && this.lieferdauer_max_array[i] <= 3) {
                            const durschnittbedarf = Math.round((bedarfKaufteil[i].bedarf + bedarfKaufteil[i].bedarf_naechste
                                + bedarfKaufteil[i].bedarf_uebernaechste) / 3);
                            this.bedarfdurchschnittKaufteil.push(new Object(
                                {nummer: this.kaufteile_vorperiode[i].nummer, bedarfavg: durschnittbedarf}))
                        } else if (this.lieferdauer_max_array[i] > 3) {
                            const durschnittbedarf = Math.round((bedarfKaufteil[i].bedarf
                                + bedarfKaufteil[i].bedarf_naechste + bedarfKaufteil[i].bedarf_uebernaechste
                                + bedarfKaufteil[i].bedarf_ueberuebernaechste) / 4);
                            this.bedarfdurchschnittKaufteil.push(new Object(
                                {nummer: this.kaufteile_vorperiode[i].nummer, bedarfavg: durschnittbedarf}))
                        }

                        this.gesamtes_array[i].durchschnittbedarf = this.bedarfdurchschnittKaufteil[i].bedarfavg;

                    }

                    console.log('durchschnittlicher Bedarf Kaufteil Array:');

                    console.log(this.bedarfdurchschnittKaufteil);

                } else {

                    const bedarfKaufteil = [];

                    for (let i = 0; i < this.kaufteile_array.length; i++) {

                        this.gesamtes_array.push(new PurchasedPart(undefined, this.kaufteile_array[i], undefined,
                            undefined, undefined, undefined, undefined, undefined));

                        this.gesamtes_array[i].diskontmenge = this.diskontmenge_array[i];

                        this.gesamtes_array[i].bestand = this.lagerbestand__kaufteile_periode0[i];

                        bedarfKaufteil.push(new Object(
                                {
                                    nummer: this.kaufteile_array[i],
                                    bedarf: 0,
                                    bedarf_naechste: 0,
                                    bedarf_uebernaechste: 0,
                                    bedarf_ueberuebernaechste: 0
                                }));

                        for (let j = 0; j < this.teils.length; j++) {
                            bedarfKaufteil[i].bedarf = this.verwendung_array[i][0] * this.teils[0].gesamtproduktionsmenge
                                + this.verwendung_array[i][1] * this.teils[1].gesamtproduktionsmenge + this.verwendung_array[i][2] * this.teils[2].gesamtproduktionsmenge;
                            bedarfKaufteil[i].bedarf_naechste = this.verwendung_array[i][0] * this.teils[0].vertriebswunsch_naechste
                                + this.verwendung_array[i][1] * this.teils[1].vertriebswunsch_naechste + this.verwendung_array[i][2] * this.teils[2].vertriebswunsch_naechste;
                            bedarfKaufteil[i].bedarf_uebernaechste = this.verwendung_array[i][0] * this.teils[0].vertriebswunsch_uebernaechste
                                + this.verwendung_array[i][1] * this.teils[1].vertriebswunsch_uebernaechste +
                                this.verwendung_array[i][2] * this.teils[2].vertriebswunsch_uebernaechste;
                            bedarfKaufteil[i].bedarf_ueberuebernaechste = this.verwendung_array[i][0] * this.teils[0].vertriebswunsch_ueberuebernaechste
                                + this.verwendung_array[i][1] * this.teils[1].vertriebswunsch_ueberuebernaechste
                                + this.verwendung_array[i][2] * this.teils[2].vertriebswunsch_ueberuebernaechste;
                        }

                        if (this.lieferdauer_max_array[i] <= 1) {
                            this.bedarfdurchschnittKaufteil.push(new Object(
                                {nummer: this.kaufteile_array[i], bedarfavg: bedarfKaufteil[i].bedarf}))
                        } else if (this.lieferdauer_max_array[i] > 1 && this.lieferdauer_max_array[i] <= 2) {
                            const durschnittbedarf = Math.round((bedarfKaufteil[i].bedarf + bedarfKaufteil[i].bedarf_naechste) / 2);
                            this.bedarfdurchschnittKaufteil.push(new Object(
                                {nummer: this.kaufteile_array[i], bedarfavg: durschnittbedarf}))
                        } else if (this.lieferdauer_max_array[i] > 2 && this.lieferdauer_max_array[i] <= 3) {
                            const durschnittbedarf = Math.round((bedarfKaufteil[i].bedarf + bedarfKaufteil[i].bedarf_naechste
                                + bedarfKaufteil[i].bedarf_uebernaechste) / 3);
                            this.bedarfdurchschnittKaufteil.push(new Object(
                                {nummer: this.kaufteile_array[i], bedarfavg: durschnittbedarf}))
                        } else if (this.lieferdauer_max_array[i] > 3) {
                            const durschnittbedarf = Math.round((bedarfKaufteil[i].bedarf
                                + bedarfKaufteil[i].bedarf_naechste + bedarfKaufteil[i].bedarf_uebernaechste
                                + bedarfKaufteil[i].bedarf_ueberuebernaechste) / 4);
                            this.bedarfdurchschnittKaufteil.push(new Object(
                                {nummer: this.kaufteile_array[i], bedarfavg: durschnittbedarf}))
                        }

                        this.gesamtes_array[i].durchschnittbedarf = this.bedarfdurchschnittKaufteil[i].bedarfavg;

                    }

                    console.log('durchschnittlicher Bedarf Kaufteil Array:');

                    console.log(this.bedarfdurchschnittKaufteil);
                }

            }, (res2: ResponseWrapper) => this.onError(res2.json), () => {
                this.bestimmeBestellmodus();
            });

        }, (res: ResponseWrapper) => this.onError(res.json));

    }

    bestimmeBestellmodus() {

            if (this.kaufteile_vorperiode.length !== 0) {

                const durchscnittlicherLagerbestand_Array_Kaufteil = [];

                for (let i = 0; i < this.kaufteile_vorperiode.length; i++) {
                    const durchscnittlicherLagerbestand = (this.kaufteile_vorperiode[i].startmenge + this.kaufteile_vorperiode[i].istmenge) / 2;
                    durchscnittlicherLagerbestand_Array_Kaufteil.push(durchscnittlicherLagerbestand);
                    let lagerreichweite = (durchscnittlicherLagerbestand / this.bedarfdurchschnittKaufteil[i].bedarfavg);
                    lagerreichweite = parseFloat(lagerreichweite.toFixed(2));
                    this.gesamtes_array[i].lagerreichweite = lagerreichweite;
                    this.reichweite_array.push(lagerreichweite);
                    if (this.reichweite_array[i] > this.lieferdauer_max_array[i]) {
                        this.modusnummerkaufteil.push(5); // Normal
                    } else {
                        this.modusnummerkaufteil.push(4); // Eil
                    }
                }

                console.log('durchschnittlicher Lagerbestand Array Kaufteil: ' + durchscnittlicherLagerbestand_Array_Kaufteil);
                console.log('Lagerreichweite Array: ' + this.reichweite_array);
                console.log('Bestellmodus Array: ' + this.modusnummerkaufteil);

            } else {

                const durchscnittlicherLagerbestand_Array_Kaufteil = [];

                for (let i = 0; i < this.kaufteile_array.length; i++) {
                    const durchscnittlicherLagerbestand = this.lagerbestand__kaufteile_periode0[i];
                    durchscnittlicherLagerbestand_Array_Kaufteil.push(durchscnittlicherLagerbestand);
                    let lagerreichweite = (durchscnittlicherLagerbestand / this.bedarfdurchschnittKaufteil[i].bedarfavg);
                    lagerreichweite = parseFloat(lagerreichweite.toFixed(2));
                    this.gesamtes_array[i].lagerreichweite = lagerreichweite;
                    this.reichweite_array.push(lagerreichweite);
                    if (this.reichweite_array[i] > this.lieferdauer_max_array[i]) {
                        this.modusnummerkaufteil.push(5); // Normal
                    } else {
                        this.modusnummerkaufteil.push(4); // Eil
                    }
                }

                console.log('durchschnittlicher Lagerbestand Array Kaufteil: ' + durchscnittlicherLagerbestand_Array_Kaufteil);
                console.log('Lagerreichweite Array: ' + this.reichweite_array);
                console.log('Bestellmodus Array: ' + this.modusnummerkaufteil);

            }

        this.berechneSicherheitsbestandundBestellpunkt();

    }

    berechneSicherheitsbestandundBestellpunkt() {

                for (let i = 0; i < this.bedarfdurchschnittKaufteil.length; i++) {
                    if (this.modusnummerkaufteil[i] === 5) {
                        const sicherheitsbestand = Math.round(this.bedarfdurchschnittKaufteil[i].bedarfavg * this.sicherheitszeit_array[i]);
                        this.sicherheitsbestand_array.push(sicherheitsbestand);
                        const bestellpunkt = Math.round(this.bedarfdurchschnittKaufteil[i].bedarfavg * (this.lieferdauer_array[i] + 1.2 + this.sicherheitszeit_array[i]));
                        this.bestellpunkt_array.push(bestellpunkt)
                    }
                    if (this.modusnummerkaufteil[i] === 4) {
                        const sicherheitsbestand = Math.round(this.bedarfdurchschnittKaufteil[i].bedarfavg * 0);
                        this.sicherheitsbestand_array.push(sicherheitsbestand);
                        const bestellpunkt = Math.round(this.bedarfdurchschnittKaufteil[i].bedarfavg * ((this.lieferdauer_array[i] * 0.5) + 1.2 + 0));
                        this.bestellpunkt_array.push(bestellpunkt)
                    }

                    this.gesamtes_array[i].sicherheitsbestand = this.sicherheitsbestand_array[i];
                    this.gesamtes_array[i].bestellpunkt = this.bestellpunkt_array[i];
                }

                console.log('Sicherheitsbestand Array: ' + this.sicherheitsbestand_array);
                console.log('Bestellpunkt Array: ' + this.bestellpunkt_array);

        this.loeseBestellungenaus();

    }

    loeseBestellungenaus() {

        let criteria = [
            {key: 'bestellstatus.in', value: 'UNTERWEGS'},
            {key: 'periode.in', value: parseInt(localStorage.getItem('aktuelleperiode'), 10) - 1},
            {key: 'periode.in', value: parseInt(localStorage.getItem('aktuelleperiode'), 10) - 2},
            {key: 'periode.in', value: parseInt(localStorage.getItem('aktuelleperiode'), 10) - 3},
            {key: 'periode.in', value: parseInt(localStorage.getItem('aktuelleperiode'), 10) - 4}
        ];

        this.bestellungService.query({
            size: 1000000,
            criteria
        }).subscribe((res: ResponseWrapper) => {
            this.alte_bestellungen = res.json;

            criteria = [
                {key: 'teiltyp.in', value: 'KAUFTEIL'},
                {key: 'periode.in', value: parseInt(localStorage.getItem('aktuelleperiode'), 10) - 1},
                {key: 'periode.in', value: parseInt(localStorage.getItem('aktuelleperiode'), 10) - 2},
                {key: 'periode.in', value: parseInt(localStorage.getItem('aktuelleperiode'), 10) - 3},
                {key: 'periode.in', value: parseInt(localStorage.getItem('aktuelleperiode'), 10) - 4}
            ];

            this.teilService.query({
                size: 1000000,
                criteria
            }).subscribe((res2: ResponseWrapper) => {
                this.kaufteile_mehere_Perioden = res2.json;

                for (let i = 0; i < this.alte_bestellungen.length; i++) {
                    this.teil = this.kaufteile_mehere_Perioden.find((teil) => teil.id === this.alte_bestellungen[i].kaufteil.id);
                    this.alte_bestellungen_kaufteil_array.push(new Object({
                        kaufteil: this.teil.nummer,
                        kaufmenge: this.alte_bestellungen[i].kaufmenge,
                    }));
                }
                const alteBestellunggroup = d3.nest()
                    .key((d) => d.kaufteil)
                    .rollup( function(v) { return d3.sum(v, function(d) { return d.kaufmenge; }); })
                    .entries(this.alte_bestellungen_kaufteil_array);

                this.alte_bestellungen_kaufteil_array = [];

                for (const kaufteilnummer of this.kaufteile_array) {
                    this.alte_bestellungen_kaufteil_array.push(new Object({
                        kaufteil: kaufteilnummer,
                        kaufmenge: 0
                    }));
                }

                for (let i = 0; i < this.kaufteile_array.length; i++) {
                    const kaufteil = alteBestellunggroup.find((teil) => parseInt(teil.key, 10) === this.kaufteile_array[i]);
                    if (kaufteil !== undefined) {
                        this.alte_bestellungen_kaufteil_array[i].kaufmenge = kaufteil.value;
                    }
                }

                this.alte_bestellungen_kaufteil_array.sort((a, b) => a.kaufteil - b.kaufteil);
                for (let i = 0; i < this.gesamtes_array.length; i++) {
                    this.gesamtes_array[i].menge_alteBestellung = this.alte_bestellungen_kaufteil_array[i].kaufmenge;
                }
                console.log('Kaufteilmengen von alten Bestellungen: ');
                console.log(this.alte_bestellungen_kaufteil_array);

            }, (res2: ResponseWrapper) => this.onError(res2.json), () => {
                const keysneueBestellungen = [];

                if (this.kaufteile_vorperiode.length !== 0) {

                    for (let i = 0; i < this.kaufteile_vorperiode.length; i++) {
                        // const kaufteil_Bestellungalt = this.alte_bestellungen_kaufteil_array((kaufteil) => kaufteil.nummer === this.kaufteile_vorperiode[i]);
                        if (this.kaufteile_vorperiode[i].istmenge + this.alte_bestellungen_kaufteil_array[i].kaufmenge <
                            this.bestellpunkt_array[i]) { // + alte Bestellungen!!!
                            if (this.modusnummerkaufteil[i] === 5 && this.lagerwert_gesamt <= 250000.00) {
                                this.optBestellmenge.push(Math.round(Math.sqrt((200 * this.bedarfdurchschnittKaufteil[i].bedarfavg * this.bestellkosten_array[i])
                                    / (this.kaufteile_vorperiode[i].lagerpreis * this.lagerkostensatz))));
                                keysneueBestellungen.push(i);

                                this.modus = this.modi.find((modus) => modus.nummer === 5);
                                this.teil = this.kaufteile.find((teil) => (teil.nummer === this.kaufteile[i].nummer)
                                    && (teil.periode === (parseInt(localStorage.getItem('aktuelleperiode'), 10))));
                                this.bestellung = new Bestellung(undefined, parseInt(localStorage.getItem('aktuelleperiode'), 10), undefined,
                                    undefined, undefined, undefined, undefined,
                                    undefined, undefined, Bestellstatus.UNTERWEGS, this.modus, this.teil);
                                this.empfohlene_neue_Bestellungen_array.push(this.bestellung);
                            } else if (this.modusnummerkaufteil[i] === 5 && this.lagerwert_gesamt > 250000.00) {
                                this.optBestellmenge.push(Math.round(Math.sqrt((200 * this.bedarfdurchschnittKaufteil[i].bedarfavg * this.bestellkosten_array[i])
                                    / (this.kaufteile_vorperiode[i].lagerpreis * this.lagerkostensatz))));
                                keysneueBestellungen.push(i);

                                this.modus = this.modi.find((modus) => modus.nummer === 5);
                                this.teil = this.kaufteile.find((teil) => (teil.nummer === this.kaufteile[i].nummer)
                                    && (teil.periode === (parseInt(localStorage.getItem('aktuelleperiode'), 10))));
                                this.bestellung = new Bestellung(undefined, parseInt(localStorage.getItem('aktuelleperiode'), 10), undefined,
                                    undefined, undefined, undefined, undefined,
                                    undefined, undefined, Bestellstatus.UNTERWEGS, this.modus, this.teil);
                                this.empfohlene_neue_Bestellungen_array.push(this.bestellung);
                            } else if (this.modusnummerkaufteil[i] === 4 && this.lagerwert_gesamt <= 250000.00) {
                                this.optBestellmenge.push(Math.round(Math.sqrt((200 * this.bedarfdurchschnittKaufteil[i].bedarfavg * (this.bestellkosten_array[i] * 10))
                                    / (this.kaufteile_vorperiode[i].lagerpreis * this.lagerkostensatz))));
                                keysneueBestellungen.push(i);

                                this.modus = this.modi.find((modus) => modus.nummer === 4);
                                this.teil = this.kaufteile.find((teil) => (teil.nummer === this.kaufteile[i].nummer)
                                    && (teil.periode === (parseInt(localStorage.getItem('aktuelleperiode'), 10))));
                                this.bestellung = new Bestellung(undefined, parseInt(localStorage.getItem('aktuelleperiode'), 10), undefined,
                                    undefined, undefined, undefined, undefined,
                                    undefined, undefined, Bestellstatus.UNTERWEGS, this.modus, this.teil);
                                this.empfohlene_neue_Bestellungen_array.push(this.bestellung);
                            } else if (this.modusnummerkaufteil[i] === 4 && this.lagerwert_gesamt > 250000.00) {
                                this.optBestellmenge.push(Math.round(Math.sqrt((200 * this.bedarfdurchschnittKaufteil[i].bedarfavg * (this.bestellkosten_array[i] * 10))
                                    / (this.kaufteile_vorperiode[i].lagerpreis * this.lagerkostensatz))));
                                keysneueBestellungen.push(i);

                                this.modus = this.modi.find((modus) => modus.nummer === 4);
                                this.teil = this.kaufteile.find((teil) => (teil.nummer === this.kaufteile[i].nummer)
                                    && (teil.periode === (parseInt(localStorage.getItem('aktuelleperiode'), 10))));
                                this.bestellung = new Bestellung(undefined, parseInt(localStorage.getItem('aktuelleperiode'), 10), undefined,
                                    undefined, undefined, undefined, undefined,
                                    undefined, undefined, Bestellstatus.UNTERWEGS, this.modus, this.teil);
                                this.empfohlene_neue_Bestellungen_array.push(this.bestellung);
                            }
                        }
                    }

                } else {

                    for (let i = 0; i < this.kaufteile_array.length; i++) {
                        if (this.lagerbestand__kaufteile_periode0[i] + this.alte_bestellungen_kaufteil_array[i].kaufmenge < this.bestellpunkt_array[i]) {
                            if (this.modusnummerkaufteil[i] === 5 && this.lagerwert_gesamt <= 250000.00) {
                                this.optBestellmenge.push(Math.round(Math.sqrt((200 * this.bedarfdurchschnittKaufteil[i].bedarfavg * this.bestellkosten_array[i])
                                    / (this.preis__kaufteile_periode0[i] * this.lagerkostensatz))));
                                keysneueBestellungen.push(i);

                                this.modus = this.modi.find((modus) => modus.nummer === 5);
                                this.teil = this.kaufteile.find((teil) => (teil.nummer === this.kaufteile[i].nummer)
                                    && (teil.periode === (parseInt(localStorage.getItem('aktuelleperiode'), 10))));
                                this.bestellung = new Bestellung(undefined, parseInt(localStorage.getItem('aktuelleperiode'), 10), undefined,
                                    undefined, undefined, undefined, undefined,
                                    undefined, undefined, Bestellstatus.UNTERWEGS, this.modus, this.teil);
                                this.empfohlene_neue_Bestellungen_array.push(this.bestellung);
                            } else if (this.modusnummerkaufteil[i] === 5 && this.lagerwert_gesamt > 250000.00) {
                                this.optBestellmenge.push(Math.round(Math.sqrt((200 * this.bedarfdurchschnittKaufteil[i].bedarfavg * this.bestellkosten_array[i])
                                    / (this.preis__kaufteile_periode0[i] * this.lagerkostensatz))));
                                keysneueBestellungen.push(i);

                                this.modus = this.modi.find((modus) => modus.nummer === 5);
                                this.teil = this.kaufteile.find((teil) => (teil.nummer === this.kaufteile[i].nummer)
                                    && (teil.periode === (parseInt(localStorage.getItem('aktuelleperiode'), 10))));
                                this.bestellung = new Bestellung(undefined, parseInt(localStorage.getItem('aktuelleperiode'), 10), undefined,
                                    undefined, undefined, undefined, undefined,
                                    undefined, undefined, Bestellstatus.UNTERWEGS, this.modus, this.teil);
                                this.empfohlene_neue_Bestellungen_array.push(this.bestellung);
                            } else if (this.modusnummerkaufteil[i] === 4 && this.lagerwert_gesamt <= 250000.00) {
                                this.optBestellmenge.push(Math.round(Math.sqrt((200 * this.bedarfdurchschnittKaufteil[i].bedarfavg * (this.bestellkosten_array[i] * 10))
                                    / (this.preis__kaufteile_periode0[i] * this.lagerkostensatz))));
                                keysneueBestellungen.push(i);

                                this.modus = this.modi.find((modus) => modus.nummer === 4);
                                this.teil = this.kaufteile.find((teil) => (teil.nummer === this.kaufteile[i].nummer)
                                    && (teil.periode === (parseInt(localStorage.getItem('aktuelleperiode'), 10))));
                                this.bestellung = new Bestellung(undefined, parseInt(localStorage.getItem('aktuelleperiode'), 10), undefined,
                                    undefined, undefined, undefined, undefined,
                                    undefined, undefined, Bestellstatus.UNTERWEGS, this.modus, this.teil);
                                this.empfohlene_neue_Bestellungen_array.push(this.bestellung);
                            } else if (this.modusnummerkaufteil[i] === 4 && this.lagerwert_gesamt > 250000.00 ) {
                                this.optBestellmenge.push(Math.round(Math.sqrt((200 * this.bedarfdurchschnittKaufteil[i].bedarfavg * (this.bestellkosten_array[i] * 10))
                                    / (this.preis__kaufteile_periode0[i] * this.lagerkostensatz))));
                                keysneueBestellungen.push(i);

                                this.modus = this.modi.find((modus) => modus.nummer === 4);
                                this.teil = this.kaufteile.find((teil) => (teil.nummer === this.kaufteile[i].nummer)
                                    && (teil.periode === (parseInt(localStorage.getItem('aktuelleperiode'), 10))));
                                this.bestellung = new Bestellung(undefined, parseInt(localStorage.getItem('aktuelleperiode'), 10), undefined,
                                    undefined, undefined, undefined, undefined,
                                    undefined, undefined, Bestellstatus.UNTERWEGS, this.modus, this.teil);
                                this.empfohlene_neue_Bestellungen_array.push(this.bestellung);
                            }

                        }
                    }

                }

                if (this.kaufteile_vorperiode.length !== 0) {
                    for (let i = 0; i < keysneueBestellungen.length; i++) {
                        if (this.kaufteile_vorperiode[keysneueBestellungen[i]].istmenge + this.optBestellmenge[i]
                            + this.alte_bestellungen_kaufteil_array[keysneueBestellungen[i]].kaufmenge >
                            this.hoechstbestand[keysneueBestellungen[i]]) { // + alte Bestellungen
                            this.bestellmenge.push(this.hoechstbestand[keysneueBestellungen[i]] - this.kaufteile_vorperiode[keysneueBestellungen[i]].istmenge
                                - this.alte_bestellungen_kaufteil_array[keysneueBestellungen[i]].kaufmenge);
                        } else {
                            this.bestellmenge.push(this.optBestellmenge[i]);
                        }
                    }
                } else {
                    for (let i = 0; i < keysneueBestellungen.length; i++) {
                        if (this.lagerbestand__kaufteile_periode0[keysneueBestellungen[i]] + this.optBestellmenge[i]
                            + this.alte_bestellungen_kaufteil_array[keysneueBestellungen[i]].kaufmenge >
                            this.hoechstbestand[keysneueBestellungen[i]]) {
                            this.bestellmenge.push(this.hoechstbestand[keysneueBestellungen[i]] - this.lagerbestand__kaufteile_periode0[keysneueBestellungen[i]]
                                - this.alte_bestellungen_kaufteil_array[keysneueBestellungen[i]].kaufmenge);
                        } else {
                            this.bestellmenge.push(this.optBestellmenge[i]);
                        }
                    }
                }

                for (let i = 0; i < this.bestellmenge.length; i++) {
                    this.empfohlene_neue_Bestellungen_array[i].kaufmenge = this.bestellmenge[i];
                }

                this.empfohlene_neue_Bestellungen_array = this.empfohlene_neue_Bestellungen_array.filter((bestellung) =>
                    bestellung.kaufmenge > 0);

                let bestellnummer = 1;

                for (let i = 0; i < this.empfohlene_neue_Bestellungen_array.length; i++) {
                    this.empfohlene_neue_Bestellungen_array[i].nummer = bestellnummer;
                    bestellnummer = bestellnummer + 1;
                }

                console.log('optimale Bestellmenge Array: ' + this.optBestellmenge);
                console.log('wirkliche Bestellmenge Array: ' + this.bestellmenge);
                console.log('empfohlene neue Bestellungen Array: ');
                console.log(this.empfohlene_neue_Bestellungen_array);

                criteria = [
                    {key: 'periode.equals', value: parseInt(localStorage.getItem('aktuelleperiode'), 10)}
                ];

                this.bestellungService.query({
                    size: 1000000,
                    criteria
                }).subscribe((res2: ResponseWrapper) => {
                    this.bestellungen = res2.json;
                    this.bestellungen.sort((a, b) => a.nummer - b.nummer);
                    if (this.bestellungen.length === 0) {
                        for (const bestellung of this.empfohlene_neue_Bestellungen_array) {
                            this.bestellungen.push(bestellung);
                        }
                    }
                    const bestellkosten_array = [];
                    const materialkosten_array = [];
                    for (let i = 0; i < this.bestellungen.length; i++) {
                        this.teil = this.kaufteile.find((teil) => teil.id === this.bestellungen[i].kaufteil.id);
                        this.modus = this.modi.find((modus) => modus.id === this.bestellungen[i].modus.id);
                        if (this.modus.nummer === 5) {
                            if (this.teil.nummer === 21 || this.teil.nummer === 22 || this.teil.nummer === 22 ||
                                this.teil.nummer === 25 || this.teil.nummer === 28 || this.teil.nummer === 32
                                || this.teil.nummer === 34 || this.teil.nummer === 37 || this.teil.nummer === 38
                                || this.teil.nummer === 40 || this.teil.nummer === 41 || this.teil.nummer === 42
                                || this.teil.nummer === 44 || this.teil.nummer === 45 || this.teil.nummer === 46
                                || this.teil.nummer === 47 || this.teil.nummer === 52 || this.teil.nummer === 53
                                || this.teil.nummer === 57 || this.teil.nummer === 58 || this.teil.nummer === 59) {
                                const bestellkosten = 50;
                                bestellkosten_array.push(bestellkosten);
                            } else if (this.teil.nummer === 27 || this.teil.nummer === 33 || this.teil.nummer === 35 ||
                                this.teil.nummer === 39 || this.teil.nummer === 43 || this.teil.nummer === 48) {
                                const bestellkosten = 75;
                                bestellkosten_array.push(bestellkosten);
                            } else if (this.teil.nummer === 24 || this.teil.nummer === 36) {
                                const bestellkosten = 100;
                                bestellkosten_array.push(bestellkosten);
                            }
                        } else if (this.modus.nummer === 4) {
                            if (this.teil.nummer === 21 || this.teil.nummer === 22 || this.teil.nummer === 22 ||
                                this.teil.nummer === 25 || this.teil.nummer === 28 || this.teil.nummer === 32
                                || this.teil.nummer === 34 || this.teil.nummer === 37 || this.teil.nummer === 38
                                || this.teil.nummer === 40 || this.teil.nummer === 41 || this.teil.nummer === 42
                                || this.teil.nummer === 44 || this.teil.nummer === 45 || this.teil.nummer === 46
                                || this.teil.nummer === 47 || this.teil.nummer === 52 || this.teil.nummer === 53
                                || this.teil.nummer === 57 || this.teil.nummer === 58 || this.teil.nummer === 59) {
                                const bestellkosten = 500;
                                bestellkosten_array.push(bestellkosten);
                            } else if (this.teil.nummer === 27 || this.teil.nummer === 33 || this.teil.nummer === 35 ||
                                this.teil.nummer === 39 || this.teil.nummer === 43 || this.teil.nummer === 48) {
                                const bestellkosten = 750;
                                bestellkosten_array.push(bestellkosten);
                            } else if (this.teil.nummer === 24 || this.teil.nummer === 36) {
                                const bestellkosten = 1000;
                                bestellkosten_array.push(bestellkosten);
                            }
                        }
                        const teil1 = this.diskontmenge_teil_array.find((teil3) => teil3.nummer === this.teil.nummer);
                        if (this.kaufteile_vorperiode.length !== 0) {
                            if (this.bestellungen[i].kaufmenge >= teil1.diskontmenge) {
                                const altesteil = this.kaufteile_vorperiode.find((teil2) => teil2.nummer === this.teil.nummer);
                                const einstandspreis = altesteil.lagerpreis * 0.90;
                                const materialkosten = einstandspreis * this.bestellungen[i].kaufmenge;
                                materialkosten_array.push(materialkosten);
                            } else {
                                const altesteil = this.kaufteile_vorperiode.find((teil) => teil.nummer === this.teil.nummer);
                                const materialkosten = altesteil.lagerpreis * this.bestellungen[i].kaufmenge;
                                materialkosten_array.push(materialkosten);
                            }
                        } else {
                            if (this.bestellungen[i].kaufmenge >= teil1.diskontmenge) {
                                const einstandspreis = teil1.kaufpreis0 * 0.90;
                                const materialkosten = einstandspreis * this.bestellungen[i].kaufmenge;
                                materialkosten_array.push(materialkosten);
                            } else {
                                const materialkosten = teil1.kaufpreis0 * this.bestellungen[i].kaufmenge;
                                materialkosten_array.push(materialkosten);
                            }
                        }
                    }

                    console.log('Bestellkosten Bestellungen: ' + bestellkosten_array);
                    console.log('Materialkosten Bestellungen: ' + materialkosten_array);
                    this.bestellkosten = bestellkosten_array.reduce((a, b) => a + b, 0);
                    this.materialkosten = materialkosten_array.reduce((a, b) => a + b, 0);
                    console.log('Bestellkosten Bestellungen gesamt: ' + this.bestellkosten);
                    console.log('Materialkosten Bestellungen gesamt: ' + this.materialkosten);
                    this.beschaffungskosten = this.bestellkosten + this.materialkosten;
                    console.log('Beschaffungskosten gesamt: ' + this.beschaffungskosten);
                    localStorage.setItem('beschaffungskosten', this.beschaffungskosten.toString());
                }, (res2: ResponseWrapper) => this.onError(res2.json));

            });

        }, (res: ResponseWrapper) => this.onError(res.json), );

        criteria = [
            {key: 'periode.equals', value: parseInt(localStorage.getItem('aktuelleperiode'), 10) - 1}
        ];

        this.teilService.query({
            size: 1000000,
            criteria
        }).subscribe((res: ResponseWrapper) => {
            this.alle_teile = res.json;
            const lagerwert_array = [];
            if (this.alle_teile.length !== 0) {
                for (const teil of this.alle_teile) {
                    lagerwert_array.push(teil.lagerwert);
                    this.lagerwert_gesamt = lagerwert_array.reduce((a, b) => a + b, 0);
                }
                if (this.lagerwert_gesamt > 250000) {
                    const differenz = this.lagerwert_gesamt - 250000;
                    this.lagerkosten = (250000 * 0.006) + 5000 + (differenz * 0.006);
                    localStorage.setItem('lagerkosten', this.lagerkosten.toString());
                    this.lagerkostensatz = (this.lagerkosten / this.lagerwert_gesamt) * 100;
                    console.log('Lagerkostensatz_Periode: ' + this.lagerkostensatz);
                } else {
                    this.lagerkostensatz = 0.6;
                    console.log('Lagerkostensatz_Periode: ' + this.lagerkostensatz);
                }
            } else {
                this.lagerwert_gesamt = 291355.00;
                if (this.lagerwert_gesamt > 250000) {
                    const differenz = this.lagerwert_gesamt - 250000;
                    this.lagerkosten = (250000 * 0.006) + 5000 + (differenz * 0.006);
                    localStorage.setItem('lagerkosten', this.lagerkosten.toString());
                    this.lagerkostensatz = (this.lagerkosten / this.lagerwert_gesamt) * 100;
                    console.log('Lagerkostensatz_Periode: ' + this.lagerkostensatz);
                } else {
                    this.lagerkostensatz = 0.6;
                    console.log('Lagerkostensatz_Periode: ' + this.lagerkostensatz);
                }
            }
        }, (res: ResponseWrapper) => this.onError(res.json));
    }

    changeListener($event): void {
        $event = this.isSaving = true;
        this.save();
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    };

    public save() {
        this.saveBestellung();
        this.isSaving = true;
    };

    public saveBestellung() {

        const criteria = [
            {key: 'periode.equals', value: parseInt(localStorage.getItem('aktuelleperiode'), 10)}
        ];

        this.bestellungService.query({
            size: 1000000,
            criteria
        })
            .subscribe((res: ResponseWrapper) => {
                this.bestellungen_DB = res.json;
                let i;
                for (i = 0; i < this.bestellungen.length; i++) {
                    this.bestellung = this.bestellungen_DB.find((bestellung) => (bestellung.nummer === this.bestellungen[i].nummer)
                        && bestellung.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10));
                    if (this.bestellung !== undefined) {
                        this.bestellung.kaufteil = this.bestellungen[i].kaufteil;
                        this.bestellung.modus = this.bestellungen[i].modus;
                        this.bestellung.kaufmenge = this.bestellungen[i].kaufmenge;
                        this.bestellung.bestellstatus = this.bestellungen[i].bestellstatus;
                        this.bestellungService.update(this.bestellung).subscribe((respond: Bestellung) =>
                            console.log(respond), () => this.onSaveError());
                    } else {
                        this.bestellung = new Bestellung(undefined, parseInt(localStorage.getItem('aktuelleperiode'), 10),
                            this.bestellungen[i].nummer, undefined, this.bestellungen[i].kaufmenge,
                            undefined, undefined, undefined, undefined, this.bestellungen[i].bestellstatus,
                            this.bestellungen[i].modus, this.bestellungen[i].kaufteil);
                        this.bestellungService.create(this.bestellung).subscribe((respond: Bestellung) =>
                            console.log(respond), () => this.onSaveError());
                    }
                }
            }, (respond: ResponseWrapper) => this.onError(respond.json));

        this.isSaving = true;

    }

    private onSaveError() {
        this.isSaving = false;
    }

    previousState() {
        window.history.back();
    }

}
