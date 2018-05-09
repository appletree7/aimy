import { Component, OnInit } from '@angular/core';

import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Teil } from '../../entities/teil';
import {Capacity} from '../../entities/anzeige/capacity_planning.model';
import { TeilService } from '../../entities/teil';
import { Arbeitsplatz, ArbeitsplatzService } from '../../entities/arbeitsplatz';
import { Fertigungsauftrag, FertigungsauftragService  } from '../../entities/fertigungsauftrag';
import {Principal, ResponseWrapper} from '../../shared';
import * as d3 from 'd3';

@Component({
    selector: 'jhi-capacity-planning',
    templateUrl: './capacity_planning.component.html',
})
export class CapacityPlanningComponent implements OnInit {

    isSaving: boolean;
    teils: Teil[];
    teile: Teil[];
    teil: Teil;
    account: any;
    arbeitsplatz: Arbeitsplatz;
    capacity: Capacity;
    arbeitsplaetze: Arbeitsplatz[];
    currentAccount: any;
    fertigungsauftraege: Fertigungsauftrag[];
    fertigungsauftraege_alt: Fertigungsauftrag[];
    ruestvorgaenge_teil_array_neu = [];
    ruestvorgaenge_teil_array_alt = [];
    kapazitaetsauslastung_arbeitsplatz = [];
    kapazitaetsangebot;
    kapazitaetsangebot_array = [];
    leerzeit: number;
    maschinenkosten: number;
    maschinenstillstandkosten: number;
    lohnkosten: number;
    lohnleerkosten: number;
    capacity_array = [];

    constructor(
        private eventManager: JhiEventManager,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private teilService: TeilService,
        private fertigungsauftragService: FertigungsauftragService,
        private arbeitsplatzService: ArbeitsplatzService
    ) {}

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });

        this.isSaving = false;

        const criteria = [
            {key: 'periode.equals', value: parseInt(localStorage.getItem('aktuelleperiode'), 10)}
        ];

        this.arbeitsplatzService.query({
            size: 1000000,
            criteria
        }).subscribe((res: ResponseWrapper) => {
            this.arbeitsplaetze = res.json;
            if (this.arbeitsplaetze.length === 0) {
                this.capacity = new Capacity(undefined, 1, 0, 0,
                    0, 0, undefined, undefined, undefined,
                     parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 2, 0, 0,
                    0, 0, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 3, 0, 0,
                    0, 0, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 4, 0, 0,
                    0, 0, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 6, 0, 0,
                    0, 0, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 7, 0, 0,
                    0, 0, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 8, 0, 0,
                    0, 0, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 9, 0, 0,
                    0, 0, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 10, 0, 0,
                    0, 0, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 11, 0, 0,
                    0, 0, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 12, 0, 0,
                    0, 0, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 13, 0, 0,
                    0, 0, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 14, 0, 0,
                    0, 0, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 15, 0, 0,
                    0, 0, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
            } else {
                for (const arbeitsplatz of this.arbeitsplaetze) {
                    this.capacity_array.push(
                        new Capacity(undefined, arbeitsplatz.nummer, 0, 0,
                            0, 0, undefined, undefined, undefined,
                            arbeitsplatz.periode));
                }
                this.capacity_array.sort((a, b) => a.arbeitsplatznummer - b.arbeitsplatznummer);
            }

        }, (res: ResponseWrapper) => this.onError(res.json));

        this.berechneRuestzeitenundKapazitaeten();

    };

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    berechneKapzitaetsbedarfneu() {

        const criteria = [
            {key: 'teiltyp.in', value: 'PRODUKT'},
            {key: 'teiltyp.in', value: 'ERZEUGNIS'},
            {key: 'periode.equals', value: parseInt(localStorage.getItem('aktuelleperiode'), 10)}
        ];

        this.teilService.query({
            size: 1000000,
            criteria
        }).subscribe((res: ResponseWrapper) => {
            this.teils = res.json;

            for (let i = 0; i < this.capacity_array.length; i++) {

                const kapazitaetsbedarf_arbeitsplatz = [];

                for (let j = 0; j < this.teils.length; j++) {

                    if (this.capacity_array[i].arbeitsplatznummer === 1) {

                        if (this.teils[j].nummer === 49 || this.teils[j].nummer === 54 || this.teils[j].nummer === 29) {
                            kapazitaetsbedarf_arbeitsplatz.push(this.teils[j].gesamtproduktionsmenge * 6);
                        }

                        this.capacity_array[i].kapazitaetsbedarf_neu = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 2) {

                        if (this.teils[j].nummer === 50 || this.teils[j].nummer === 55 || this.teils[j].nummer === 30) {
                            kapazitaetsbedarf_arbeitsplatz.push(this.teils[j].gesamtproduktionsmenge * 5);
                        }

                        this.capacity_array[i].kapazitaetsbedarf_neu = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 3) {

                        if (this.teils[j].nummer === 31 || this.teils[j].nummer === 56) {
                            kapazitaetsbedarf_arbeitsplatz.push(this.teils[j].gesamtproduktionsmenge * 6);
                        }

                        if (this.teils[j].nummer === 51) {
                            kapazitaetsbedarf_arbeitsplatz.push(this.teils[j].gesamtproduktionsmenge * 5);
                        }

                        this.capacity_array[i].kapazitaetsbedarf_neu = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 4) {

                        if (this.teils[j].nummer === 2 || this.teils[j].nummer === 3) {
                            kapazitaetsbedarf_arbeitsplatz.push(this.teils[j].gesamtproduktionsmenge * 7);
                        }

                        if (this.teils[j].nummer === 1) {
                            kapazitaetsbedarf_arbeitsplatz.push(this.teils[j].gesamtproduktionsmenge * 6);
                        }

                        this.capacity_array[i].kapazitaetsbedarf_neu = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 6) {

                        if (this.teils[j].nummer === 18 || this.teils[j].nummer === 19 || this.teils[j].nummer === 20) {
                            kapazitaetsbedarf_arbeitsplatz.push(this.teils[j].gesamtproduktionsmenge * 3);
                        }

                        if (this.teils[j].nummer === 16) {
                            kapazitaetsbedarf_arbeitsplatz.push(this.teils[j].gesamtproduktionsmenge * 2);
                        }

                        this.capacity_array[i].kapazitaetsbedarf_neu = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 7) {

                        if (this.teils[j].nummer === 10 || this.teils[j].nummer === 11 || this.teils[j].nummer === 12
                            || this.teils[j].nummer === 13 || this.teils[j].nummer === 14 || this.teils[j].nummer === 15
                            || this.teils[j].nummer === 18 || this.teils[j].nummer === 19 || this.teils[j].nummer === 20
                            || this.teils[j].nummer === 26) {
                            kapazitaetsbedarf_arbeitsplatz.push(this.teils[j].gesamtproduktionsmenge * 2);
                        }

                        this.capacity_array[i].kapazitaetsbedarf_neu = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 8) {

                        if (this.teils[j].nummer === 10 || this.teils[j].nummer === 13) {
                            kapazitaetsbedarf_arbeitsplatz.push(this.teils[j].gesamtproduktionsmenge);
                        }

                        if (this.teils[j].nummer === 11 || this.teils[j].nummer === 12
                            || this.teils[j].nummer === 14 || this.teils[j].nummer === 15) {
                            kapazitaetsbedarf_arbeitsplatz.push(this.teils[j].gesamtproduktionsmenge * 2);
                        }

                        if (this.teils[j].nummer === 18 || this.teils[j].nummer === 19 || this.teils[j].nummer === 20) {
                            kapazitaetsbedarf_arbeitsplatz.push(this.teils[j].gesamtproduktionsmenge * 3);
                        }

                        this.capacity_array[i].kapazitaetsbedarf_neu = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 9) {

                        if (this.teils[j].nummer === 10 || this.teils[j].nummer === 11 || this.teils[j].nummer === 12 ||
                            this.teils[j].nummer === 13 || this.teils[j].nummer === 14 || this.teils[j].nummer === 15) {
                            kapazitaetsbedarf_arbeitsplatz.push(this.teils[j].gesamtproduktionsmenge * 3);
                        }

                        if (this.teils[j].nummer === 18 || this.teils[j].nummer === 19 || this.teils[j].nummer === 20) {
                            kapazitaetsbedarf_arbeitsplatz.push(this.teils[j].gesamtproduktionsmenge * 2);
                        }

                        this.capacity_array[i].kapazitaetsbedarf_neu = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 10) {

                        if (this.teils[j].nummer === 4 || this.teils[j].nummer === 5 || this.teils[j].nummer === 6
                            || this.teils[j].nummer === 7 || this.teils[j].nummer === 8 || this.teils[j].nummer === 9) {
                            kapazitaetsbedarf_arbeitsplatz.push(this.teils[j].gesamtproduktionsmenge * 4);
                        }

                        this.capacity_array[i].kapazitaetsbedarf_neu = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 11) {

                        if (this.teils[j].nummer === 4 || this.teils[j].nummer === 5 || this.teils[j].nummer === 6
                            || this.teils[j].nummer === 7 || this.teils[j].nummer === 8 || this.teils[j].nummer === 9) {
                            kapazitaetsbedarf_arbeitsplatz.push(this.teils[j].gesamtproduktionsmenge * 3);
                        }

                        this.capacity_array[i].kapazitaetsbedarf_neu = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 12) {

                        if (this.teils[j].nummer === 10 || this.teils[j].nummer === 11 || this.teils[j].nummer === 12
                            || this.teils[j].nummer === 13 || this.teils[j].nummer === 14 || this.teils[j].nummer === 15) {
                            kapazitaetsbedarf_arbeitsplatz.push(this.teils[j].gesamtproduktionsmenge * 3);
                        }

                        this.capacity_array[i].kapazitaetsbedarf_neu = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 13) {

                        if (this.teils[j].nummer === 10 || this.teils[j].nummer === 11 || this.teils[j].nummer === 12
                            || this.teils[j].nummer === 13 || this.teils[j].nummer === 14 || this.teils[j].nummer === 15) {
                            kapazitaetsbedarf_arbeitsplatz.push(this.teils[j].gesamtproduktionsmenge * 2);
                        }

                        this.capacity_array[i].kapazitaetsbedarf_neu = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 14) {

                        if (this.teils[j].nummer === 16) {
                            kapazitaetsbedarf_arbeitsplatz.push(this.teils[j].gesamtproduktionsmenge * 3);
                        }

                        this.capacity_array[i].kapazitaetsbedarf_neu = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 15) {

                        if (this.teils[j].nummer === 17 || this.teils[j].nummer === 26) {
                            kapazitaetsbedarf_arbeitsplatz.push(this.teils[j].gesamtproduktionsmenge * 3);
                        }

                        this.capacity_array[i].kapazitaetsbedarf_neu = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                }
            }

        }, (res: ResponseWrapper) => this.onError(res.json), () => {
            this.berechneKapzitaetsbedarfalt();
            this.berechneRuestzeitneu();
        });
    }

    berechneRuestzeitneu() {

        const criteria = [
            {key: 'periode.equals', value: parseInt(localStorage.getItem('aktuelleperiode'), 10)}
        ];

        this.fertigungsauftragService.query({
            size: 1000000,
            criteria
        }).subscribe((res: ResponseWrapper) => {
            this.fertigungsauftraege = res.json;
            this.fertigungsauftraege.sort((a, b) => a.nummer - b.nummer);

            for (let i = 0; i < this.capacity_array.length; i++) {

                const ruestzeit_arbeitsplatz = [];

                for (let j = 0; j < this.fertigungsauftraege.length; j++) {

                    this.teil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[j].herstellteil.id));

                    if (this.capacity_array[i].arbeitsplatznummer === 1) {

                        if (this.teil.nummer === 49 || this.teil.nummer === 54
                            || this.teil.nummer === 29) {

                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_neu.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[i].ruestvorgaenge * 20);

                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 2) {

                        if (this.teil.nummer === 50 || this.teil.nummer === 55) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_neu.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[i].ruestvorgaenge * 30);

                        }

                        if (this.teil.nummer === 30) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_neu.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[i].ruestvorgaenge * 20);
                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);
                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 3) {

                        if (this.teil.nummer === 31 || this.teil.nummer === 56
                            || this.teil.nummer === 51) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_neu.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[i].ruestvorgaenge * 20);
                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 4) {

                        if (this.teil.nummer === 1 || this.teil.nummer === 3) {

                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_neu.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[i].ruestvorgaenge * 30);

                        }

                        if (this.teil.nummer === 2) {

                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_neu.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[i].ruestvorgaenge * 20);

                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 6) {

                        if (this.teil.nummer === 18 || this.teil.nummer === 19
                            || this.teil.nummer === 20 || this.teil.nummer === 16) {

                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_neu.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[i].ruestvorgaenge * 15);

                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 7) {

                        if (this.teil.nummer === 10 || this.teil.nummer === 11
                            || this.teil.nummer === 12 || this.teil.nummer === 13
                            || this.teil.nummer === 14 || this.teil.nummer === 15
                            || this.teil.nummer === 18 || this.teil.nummer === 19
                            || this.teil.nummer === 20) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_neu.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }

                                ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[i].ruestvorgaenge * 20);
                            }
                        }

                        if (this.teil.nummer === 26) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_neu.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[i].ruestvorgaenge * 30);
                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 8) {

                        if (this.teil.nummer === 10 || this.teil.nummer === 11 ||
                            this.teil.nummer === 12 || this.teil.nummer === 13
                            || this.teil.nummer === 14 || this.teil.nummer === 15) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_neu.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[i].ruestvorgaenge * 15);
                        }

                        if (this.teil.nummer === 18 || this.teil.nummer === 20) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_neu.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[i].ruestvorgaenge * 20);
                        }

                        if (this.teil.nummer === 19) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_neu.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[i].ruestvorgaenge * 25);
                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 9) {

                        if (this.teil.nummer === 10 || this.teil.nummer === 11 ||
                            this.teil.nummer === 12 || this.teil.nummer === 13
                            || this.teil.nummer === 14 || this.teil.nummer === 15
                            || this.teil.nummer === 18 || this.teil.nummer === 20) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_neu.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[i].ruestvorgaenge * 15);
                        }

                        if (this.teil.nummer === 19) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_neu.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[i].ruestvorgaenge * 20);

                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 10) {

                        if (this.teil.nummer === 4 || this.teil.nummer === 5
                            || this.teil.nummer === 6 || this.teil.nummer === 7
                            || this.teil.nummer === 8 || this.teil.nummer === 9) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_neu.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[i].ruestvorgaenge * 20);
                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 11) {

                        if (this.teil.nummer === 4 || this.teil.nummer === 5) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_neu.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[i].ruestvorgaenge * 10);
                        }

                        if (this.teil === 6 || this.teil.nummer === 7
                            || this.teil.nummer === 8 || this.teil.nummer === 9) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_neu.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[i].ruestvorgaenge * 20);
                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 12) {

                        if (this.teil.nummer === 10 || this.teil.nummer === 11
                            || this.teil.nummer === 12 || this.teil.nummer === 13
                            || this.teil.nummer === 14 || this.teil.nummer === 15) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_neu.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            ruestzeit_arbeitsplatz.push(0);

                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 13) {

                        if (this.teil.nummer === 10 || this.teil.nummer === 11
                            || this.teil.nummer === 12 || this.teil.nummer === 13
                            || this.teil.nummer === 14 || this.teil.nummer === 15) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_neu.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            ruestzeit_arbeitsplatz.push(0);
                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);
                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 14) {

                        if (this.teil.nummer === 16) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_neu.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            ruestzeit_arbeitsplatz.push(0);
                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 15) {

                        if (this.teil.nummer === 17 || this.teil.nummer === 26) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_neu.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_neu.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                           ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[i].ruestvorgaenge * 15);
                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                }

            }

            console.log(this.ruestvorgaenge_teil_array_neu);

            const ruestvorgaengegroupsum = d3.nest()
                .key((d) => d.arbeitsplatz)
                .rollup(function(v) { return d3.sum(v, function(d) { return d.ruestvorgaenge; }); })
                .entries(this.ruestvorgaenge_teil_array_neu);

            const ruestvorgaengegroup = d3.nest()
                .key((d) => d.arbeitsplatz)
                .entries(this.ruestvorgaenge_teil_array_neu);

            console.log(ruestvorgaengegroup);

            const ruestvorgaengearbeitsplatz = [];

            for (const element of ruestvorgaengegroupsum) {
                ruestvorgaengearbeitsplatz.push(element.value);
                console.log('Arbeitsplatz ' + element.key + ' Rüstvorgänge neu: ' + element.value);
            }

            const ruestvorgaegene_gesamt = ruestvorgaengearbeitsplatz.reduce((a, b) => a + b, 0);
            console.log('Rüstvorgänge Periode gesamt neu: ' + ruestvorgaegene_gesamt);

        }, (res: ResponseWrapper) => this.onError(res.json));

    }

    berechneKapzitaetsbedarfalt() {

        let criteria = [
            {key: 'teiltyp.in', value: 'PRODUKT'},
            {key: 'teiltyp.in', value: 'ERZEUGNIS'},
            {key: 'periode.lessThan', value: parseInt(localStorage.getItem('aktuelleperiode'), 10)}
        ];

        this.teilService.query({
            size: 1000000,
            criteria
        }).subscribe((res: ResponseWrapper) => {
            this.teile = res.json;

        }, (res: ResponseWrapper) => this.onError(res.json), () => {

            // Angefangene Aufträge auch?
            criteria = [
                {key: 'auftragsstatus.equals', value: 'WARTEND'},
                {key: 'periode.lessThan', value: parseInt(localStorage.getItem('aktuelleperiode'), 10)}
            ];

            this.fertigungsauftragService.query({
                size: 1000000,
                criteria
            }).subscribe((res: ResponseWrapper) => {
                this.fertigungsauftraege_alt = res.json;
                this.fertigungsauftraege_alt.sort((a, b) => a.periode - b.periode || a.nummer - b.nummer);
                console.log(this.fertigungsauftraege_alt);

                for (let i = 0; i < this.capacity_array.length; i++) {

                    const kapazitaetsbedarf_arbeitsplatz = [];

                    for (let j = 0; j < this.fertigungsauftraege_alt.length; j++) {
                        this.teil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[j].herstellteil.id));

                        if (this.capacity_array[i].arbeitsplatznummer === 1) {

                            if (this.teil.nummer === 49 || this.teil.nummer === 54 || this.teil.nummer === 29) {
                                kapazitaetsbedarf_arbeitsplatz.push((this.fertigungsauftraege_alt[j].warteliste_menge
                                    + this.fertigungsauftraege_alt[j].inBearbeitung_menge) * 6);
                            }

                            this.capacity_array[i].kapazitaetsbedarf_alt = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                        }

                        if (this.capacity_array[i].arbeitsplatznummer === 2) {

                            if (this.teil.nummer === 50 || this.teil.nummer === 55 || this.teil.nummer === 30) {
                                kapazitaetsbedarf_arbeitsplatz.push((this.fertigungsauftraege_alt[j].warteliste_menge
                                    + this.fertigungsauftraege_alt[j].inBearbeitung_menge) * 5);
                            }

                            this.capacity_array[i].kapazitaetsbedarf_alt = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                        }

                        if (this.capacity_array[i].arbeitsplatznummer === 3) {

                            if (this.teil.nummer === 31 || this.teil.nummer === 56) {
                                kapazitaetsbedarf_arbeitsplatz.push((this.teil.warteliste_menge + this.teil.inBearbeitung_menge) * 6);
                            }

                            if (this.teile[j].nummer === 51) {
                                kapazitaetsbedarf_arbeitsplatz.push((this.fertigungsauftraege_alt[j].warteliste_menge
                                    + this.fertigungsauftraege_alt[j].inBearbeitung_menge) * 5);
                            }

                            this.capacity_array[i].kapazitaetsbedarf_alt = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                        }

                        if (this.capacity_array[i].arbeitsplatznummer === 4) {

                            if (this.teil.nummer === 2 || this.teil.nummer === 3) {
                                kapazitaetsbedarf_arbeitsplatz.push((this.fertigungsauftraege_alt[j].warteliste_menge
                                    + this.fertigungsauftraege_alt[j].inBearbeitung_menge) * 7);
                            }

                            if (this.teil.nummer === 1) {
                                kapazitaetsbedarf_arbeitsplatz.push((this.fertigungsauftraege_alt[j].warteliste_menge
                                    + this.fertigungsauftraege_alt[j].inBearbeitung_menge) * 6);
                            }

                            this.capacity_array[i].kapazitaetsbedarf_alt = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                        }

                        if (this.capacity_array[i].arbeitsplatznummer === 6) {

                            if (this.teil.nummer === 18 || this.teil.nummer === 19 || this.teil.nummer === 20) {
                                kapazitaetsbedarf_arbeitsplatz.push((this.fertigungsauftraege_alt[j].warteliste_menge
                                    + this.fertigungsauftraege_alt[j].inBearbeitung_menge) * 3);
                            }

                            if (this.teil.nummer === 16) {
                                kapazitaetsbedarf_arbeitsplatz.push((this.fertigungsauftraege_alt[j].warteliste_menge
                                    + this.fertigungsauftraege_alt[j].inBearbeitung_menge) * 2);
                            }

                            this.capacity_array[i].kapazitaetsbedarf_alt = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                        }

                        if (this.capacity_array[i].arbeitsplatznummer === 7) {

                            if (this.teil.nummer === 10 || this.teil.nummer === 11 || this.teil.nummer === 12
                                || this.teil.nummer === 13 || this.teil.nummer === 14 || this.teil.nummer === 15
                                || this.teil.nummer === 18 || this.teil.nummer === 19 || this.teil.nummer === 20
                                || this.teil.nummer === 26) {
                                kapazitaetsbedarf_arbeitsplatz.push((this.fertigungsauftraege_alt[j].warteliste_menge
                                    + this.fertigungsauftraege_alt[j].inBearbeitung_menge) * 2);
                            }

                            this.capacity_array[i].kapazitaetsbedarf_alt = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                        }

                        if (this.capacity_array[i].arbeitsplatznummer === 8) {

                            if (this.teil.nummer === 10 || this.teil.nummer === 13) {
                                kapazitaetsbedarf_arbeitsplatz.push((this.fertigungsauftraege_alt[j].warteliste_menge
                                    + this.fertigungsauftraege_alt[j].inBearbeitung_menge));
                            }

                            if (this.teil.nummer === 11 || this.teil.nummer === 12
                                || this.teil.nummer === 14 || this.teil.nummer === 15) {
                                kapazitaetsbedarf_arbeitsplatz.push((this.fertigungsauftraege_alt[j].warteliste_menge
                                    + this.fertigungsauftraege_alt[j].inBearbeitung_menge) * 2);
                            }

                            if (this.teil.nummer === 18 || this.teil.nummer === 19 || this.teil.nummer === 20) {
                                kapazitaetsbedarf_arbeitsplatz.push((this.fertigungsauftraege_alt[j].warteliste_menge
                                    + this.fertigungsauftraege_alt[j].inBearbeitung_menge) * 3);
                            }

                            this.capacity_array[i].kapazitaetsbedarf_alt = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                        }

                        if (this.capacity_array[i].arbeitsplatznummer === 9) {

                            if (this.teil.nummer === 10 || this.teil.nummer === 11 || this.teil.nummer === 12 ||
                                this.teil.nummer === 13 || this.teil.nummer === 14 || this.teil.nummer === 15) {
                                kapazitaetsbedarf_arbeitsplatz.push((this.fertigungsauftraege_alt[j].warteliste_menge
                                    + this.fertigungsauftraege_alt[j].inBearbeitung_menge) * 3);
                            }

                            if (this.teil.nummer === 18 || this.teil.nummer === 19 || this.teil.nummer === 20) {
                                kapazitaetsbedarf_arbeitsplatz.push((this.fertigungsauftraege_alt[j].warteliste_menge
                                    + this.fertigungsauftraege_alt[j].inBearbeitung_menge) * 2);
                            }

                            this.capacity_array[i].kapazitaetsbedarf_alt = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                        }

                        if (this.capacity_array[i].arbeitsplatznummer === 10) {

                            if (this.teil.nummer === 4 || this.teil.nummer === 5 || this.teil.nummer === 6
                                || this.teil.nummer === 7 || this.teil.nummer === 8 || this.teil.nummer === 9) {
                                kapazitaetsbedarf_arbeitsplatz.push((this.fertigungsauftraege_alt[j].warteliste_menge
                                    + this.fertigungsauftraege_alt[j].inBearbeitung_menge) * 4);
                            }

                            this.capacity_array[i].kapazitaetsbedarf_alt = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                        }

                        if (this.capacity_array[i].arbeitsplatznummer === 11) {

                            if (this.teil.nummer === 4 || this.teil.nummer === 5 || this.teil.nummer === 6
                                || this.teil.nummer === 7 || this.teil.nummer === 8 || this.teil.nummer === 9) {
                                kapazitaetsbedarf_arbeitsplatz.push((this.fertigungsauftraege_alt[j].warteliste_menge
                                    + this.fertigungsauftraege_alt[j].inBearbeitung_menge) * 3);
                            }

                            this.capacity_array[i].kapazitaetsbedarf_alt = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                        }

                        if (this.capacity_array[i].arbeitsplatznummer === 12) {

                            if (this.teil.nummer === 10 || this.teil.nummer === 11 || this.teil.nummer === 12
                                || this.teil.nummer === 13 || this.teil.nummer === 14 || this.teil.nummer === 15) {
                                kapazitaetsbedarf_arbeitsplatz.push((this.fertigungsauftraege_alt[j].warteliste_menge
                                    + this.fertigungsauftraege_alt[j].inBearbeitung_menge) * 3);
                            }

                            this.capacity_array[i].kapazitaetsbedarf_alt = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                        }

                        if (this.capacity_array[i].arbeitsplatznummer === 13) {

                            if (this.teil.nummer === 10 || this.teil.nummer === 11 || this.teil.nummer === 12
                                || this.teil.nummer === 13 || this.teil.nummer === 14 || this.teil.nummer === 15) {
                                kapazitaetsbedarf_arbeitsplatz.push((this.fertigungsauftraege_alt[j].warteliste_menge
                                    + this.fertigungsauftraege_alt[j].inBearbeitung_menge) * 2);
                            }

                            this.capacity_array[i].kapazitaetsbedarf_alt = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                        }

                        if (this.capacity_array[i].arbeitsplatznummer === 14) {

                            if (this.teil.nummer === 16) {
                                kapazitaetsbedarf_arbeitsplatz.push((this.fertigungsauftraege_alt[j].warteliste_menge
                                    + this.fertigungsauftraege_alt[j].inBearbeitung_menge) * 3);
                            }

                            this.capacity_array[i].kapazitaetsbedarf_alt = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                        }

                        if (this.capacity_array[i].arbeitsplatznummer === 15) {

                            if (this.teil.nummer === 17 || this.teil.nummer === 26) {
                                kapazitaetsbedarf_arbeitsplatz.push((this.fertigungsauftraege_alt[j].warteliste_menge
                                    + this.fertigungsauftraege_alt[j].inBearbeitung_menge) * 3);
                            }

                            this.capacity_array[i].kapazitaetsbedarf_alt = kapazitaetsbedarf_arbeitsplatz.reduce((a, b) => a + b, 0);

                        }

                    }
                }

            }, (res: ResponseWrapper) => this.onError(res.json), () => {
                this.berechneRuestzeitalt();
            });

        });
        }

    berechneRuestzeitalt() {

       // Angefangene Aufträge auch?
        const criteria = [
            {key: 'auftragsstatus.equals', value: 'WARTEND'},
            {key: 'periode.lessThan', value: parseInt(localStorage.getItem('aktuelleperiode'), 10)}
        ];

        this.fertigungsauftragService.query({
            size: 1000000,
            criteria
        }).subscribe((res: ResponseWrapper) => {
            this.fertigungsauftraege_alt = res.json;
            this.fertigungsauftraege_alt.sort((a, b) => a.periode - b.periode || a.nummer - b.nummer);

            for (let i = 0; i < this.capacity_array.length; i++) {

                const ruestzeit_arbeitsplatz = [];

                for (let j = 0; j < this.fertigungsauftraege_alt.length; j++) {

                    this.teil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[j].herstellteil.id));

                    if (this.capacity_array[i].arbeitsplatznummer === 1) {

                        if (this.teil.nummer === 49 || this.teil.nummer === 54
                            || this.teil.nummer === 29) {

                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_alt.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            if (this.ruestvorgaenge_teil_array_alt[i] !== undefined) {
                                ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_alt[i].ruestvorgaenge * 20);
                            } else {
                                ruestzeit_arbeitsplatz.push(0);
                            }
                        }

                        this.capacity_array[i].ruestzeit_alt = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 2) {

                        if (this.teil.nummer === 50 || this.teil.nummer === 55) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_alt.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            if (this.ruestvorgaenge_teil_array_alt[i] !== undefined) {
                                ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_alt[i].ruestvorgaenge * 30);
                            } else {
                                ruestzeit_arbeitsplatz.push(0);
                            }
                        }

                        if (this.teil.nummer === 30) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_alt.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            if (this.ruestvorgaenge_teil_array_alt[i] !== undefined) {
                                ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_alt[i].ruestvorgaenge * 20);
                            } else {
                                ruestzeit_arbeitsplatz.push(0);
                            }
                        }

                        this.capacity_array[i].ruestzeit_alt = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);
                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 3) {

                        if (this.teil.nummer === 31 || this.teil.nummer === 56
                            || this.teil.nummer === 51) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_alt.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            if (this.ruestvorgaenge_teil_array_alt[i] !== undefined) {
                                ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_alt[i].ruestvorgaenge * 20);
                            } else {
                                ruestzeit_arbeitsplatz.push(0);
                            }
                        }

                        this.capacity_array[i].ruestzeit_alt = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 4) {

                        if (this.teil.nummer === 1 || this.teil.nummer === 3) {

                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_alt.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            if (this.ruestvorgaenge_teil_array_alt[i] !== undefined) {
                                ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_alt[i].ruestvorgaenge * 30);
                            } else {
                                ruestzeit_arbeitsplatz.push(0);
                            }
                        }

                        if (this.teil.nummer === 2) {

                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_alt.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            if (this.ruestvorgaenge_teil_array_alt[i] !== undefined) {
                                ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_alt[i].ruestvorgaenge * 20);
                            } else {
                                ruestzeit_arbeitsplatz.push(0);
                            }
                        }

                        this.capacity_array[i].ruestzeit_alt = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 6) {

                        if (this.teil.nummer === 18 || this.teil.nummer === 19
                            || this.teil.nummer === 20 || this.teil.nummer === 16) {

                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_alt.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            if (this.ruestvorgaenge_teil_array_alt[i] !== undefined) {
                                ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_alt[i].ruestvorgaenge * 15);
                            } else {
                                ruestzeit_arbeitsplatz.push(0);
                            }
                        }

                        this.capacity_array[i].ruestzeit_alt = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 7) {

                        if (this.teil.nummer === 10 || this.teil.nummer === 11
                            || this.teil.nummer === 12 || this.teil.nummer === 13
                            || this.teil.nummer === 14 || this.teil.nummer === 15
                            || this.teil.nummer === 18 || this.teil.nummer === 19
                            || this.teil.nummer === 20) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_alt.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }

                                if (this.ruestvorgaenge_teil_array_alt[i] !== undefined) {
                                    ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_alt[i].ruestvorgaenge * 20);
                                } else {
                                    ruestzeit_arbeitsplatz.push(0);
                                }
                            }
                        }

                        if (this.teil.nummer === 26) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_alt.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            if (this.ruestvorgaenge_teil_array_alt[i] !== undefined) {
                                ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_alt[i].ruestvorgaenge * 30);
                            } else {
                                ruestzeit_arbeitsplatz.push(0);
                            }
                        }

                        this.capacity_array[i].ruestzeit_alt = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 8) {

                        if (this.teil.nummer === 10 || this.teil.nummer === 11 ||
                            this.teil.nummer === 12 || this.teil.nummer === 13
                            || this.teil.nummer === 14 || this.teil.nummer === 15) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_alt.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            if (this.ruestvorgaenge_teil_array_alt[i] !== undefined) {
                                ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_alt[i].ruestvorgaenge * 15);
                            } else {
                                ruestzeit_arbeitsplatz.push(0);
                            }
                        }

                        if (this.teil.nummer === 18 || this.teil.nummer === 20) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_alt.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            if (this.ruestvorgaenge_teil_array_alt[i] !== undefined) {
                                ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_alt[i].ruestvorgaenge * 20);
                            } else {
                                ruestzeit_arbeitsplatz.push(0);
                            }
                        }

                        if (this.teil.nummer === 19) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_alt.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            if (this.ruestvorgaenge_teil_array_alt[i] !== undefined) {
                                ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_alt[i].ruestvorgaenge * 25);
                            } else {
                                ruestzeit_arbeitsplatz.push(0);
                            }
                        }

                        this.capacity_array[i].ruestzeit_alt = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 9) {

                        if (this.teil.nummer === 10 || this.teil.nummer === 11 ||
                            this.teil.nummer === 12 || this.teil.nummer === 13
                            || this.teil.nummer === 14 || this.teil.nummer === 15
                            || this.teil.nummer === 18 || this.teil.nummer === 20) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_alt.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            if (this.ruestvorgaenge_teil_array_alt[i] !== undefined) {
                                ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_alt[i].ruestvorgaenge * 15);
                            } else {
                                ruestzeit_arbeitsplatz.push(0);
                            }
                        }

                        if (this.teil.nummer === 19) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_alt.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            if (this.ruestvorgaenge_teil_array_alt[i] !== undefined) {
                                ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_alt[i].ruestvorgaenge * 20);
                            } else {
                                ruestzeit_arbeitsplatz.push(0);
                            }
                        }

                        this.capacity_array[i].ruestzeit_alt = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 10) {

                        if (this.teil.nummer === 4 || this.teil.nummer === 5
                            || this.teil.nummer === 6 || this.teil.nummer === 7
                            || this.teil.nummer === 8 || this.teil.nummer === 9) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_alt.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            if (this.ruestvorgaenge_teil_array_alt[i] !== undefined) {
                                ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_alt[i].ruestvorgaenge * 20);
                            } else {
                                ruestzeit_arbeitsplatz.push(0);
                            }
                        }

                        this.capacity_array[i].ruestzeit_alt = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 11) {

                        if (this.teil.nummer === 4 || this.teil.nummer === 5) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_alt.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            if (this.ruestvorgaenge_teil_array_alt[i] !== undefined) {
                                ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_alt[i].ruestvorgaenge * 10);
                            } else {
                                ruestzeit_arbeitsplatz.push(0);
                            }

                        }

                        if (this.teil === 6 || this.teil.nummer === 7
                            || this.teil.nummer === 8 || this.teil.nummer === 9) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_alt.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            if (this.ruestvorgaenge_teil_array_alt[i] !== undefined) {
                                ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_alt[i].ruestvorgaenge * 20);
                            } else {
                                ruestzeit_arbeitsplatz.push(0);
                            }
                        }

                        this.capacity_array[i].ruestzeit_alt = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 12) {

                        if (this.teil.nummer === 10 || this.teil.nummer === 11
                            || this.teil.nummer === 12 || this.teil.nummer === 13
                            || this.teil.nummer === 14 || this.teil.nummer === 15) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_alt.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            ruestzeit_arbeitsplatz.push(0);

                        }

                        this.capacity_array[i].ruestzeit_alt = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 13) {

                        if (this.teil.nummer === 10 || this.teil.nummer === 11
                            || this.teil.nummer === 12 || this.teil.nummer === 13
                            || this.teil.nummer === 14 || this.teil.nummer === 15) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_alt.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            ruestzeit_arbeitsplatz.push(0);
                        }

                        this.capacity_array[i].ruestzeit_alt = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);
                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 14) {

                        if (this.teil.nummer === 16) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_alt.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            ruestzeit_arbeitsplatz.push(0);
                        }

                        this.capacity_array[i].ruestzeit_alt = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 15) {

                        if (this.teil.nummer === 17 || this.teil.nummer === 26) {
                            if (j === 0) {
                                this.ruestvorgaenge_teil_array_alt.push(new Object({
                                    nummer: this.teil.nummer,
                                    ruestvorgaenge: 1,
                                    arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                }));
                            } else {
                                const altesTeil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[j - 1].herstellteil.id));

                                if (altesTeil.nummer === this.teil.nummer) {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 0,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                } else {
                                    this.ruestvorgaenge_teil_array_alt.push(new Object({
                                        nummer: this.teil.nummer,
                                        ruestvorgaenge: 1,
                                        arbeitsplatz: this.capacity_array[i].arbeitsplatznummer
                                    }));
                                }
                            }

                            if (this.ruestvorgaenge_teil_array_alt[i] !== undefined) {
                                ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_alt[i].ruestvorgaenge * 15);
                            } else {
                                ruestzeit_arbeitsplatz.push(0);
                            }
                        }

                        this.capacity_array[i].ruestzeit_alt = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                }

            }

            console.log(this.ruestvorgaenge_teil_array_alt);

            const ruestvorgaengegroupsum = d3.nest()
                .key((d) => d.arbeitsplatz)
                .rollup(function(v) { return d3.sum(v, function(d) { return d.ruestvorgaenge; }); })
                .entries(this.ruestvorgaenge_teil_array_alt);

            const ruestvorgaengegroup = d3.nest()
                .key((d) => d.arbeitsplatz)
                .entries(this.ruestvorgaenge_teil_array_alt);

            console.log(ruestvorgaengegroup);

            const ruestvorgaengearbeitsplatz = [];

            for (const element of ruestvorgaengegroupsum) {
                ruestvorgaengearbeitsplatz.push(element.value);
                console.log('Arbeitsplatz ' + element.key + ' Rüstvorgänge alt: ' + element.value);
            }

            const ruestvorgaegene_gesamt = ruestvorgaengearbeitsplatz.reduce((a, b) => a + b, 0);
            console.log('Rüstvorgänge Periode gesamt alt: ' + ruestvorgaegene_gesamt);

        }, (res: ResponseWrapper) => this.onError(res.json), () => {
            this.berechneGesamtKapazitaetsbedarf();
        });

    }

    async berechneRuestzeitenundKapazitaeten() {

        this.berechneKapzitaetsbedarfneu();
    }

   berechneGesamtKapazitaetsbedarf() {

               for (let i = 0; i < this.capacity_array.length; i++) {
                   this.capacity_array[i].gesamter_kapazitaetsbedarf = this.capacity_array[i].kapazitaetsbedarf_neu
                       + this.capacity_array[i].ruestzeit_neu + this.capacity_array[i].kapazitaetsbedarf_alt + this.capacity_array[i].ruestzeit_alt;
               }

          this.berechneSichtundUeberstunden();

   }

    berechneSichtundUeberstunden() {

       /* this.berechneGesamtKapazitaetsbedarf().then(() => {*/

            for (let i = 0; i < this.capacity_array.length; i++) {

                if (this.capacity_array[i].gesamter_kapazitaetsbedarf <= 2400) {
                    this.capacity_array[i].schichten = 1;
                    this.capacity_array[i].ueberstunden = 0;
                }

                if (this.capacity_array[i].gesamter_kapazitaetsbedarf > 2400 && this.capacity_array[i].gesamter_kapazitaetsbedarf <= 3600) {
                    this.capacity_array[i].schichten = 1;
                    this.capacity_array[i].ueberstunden = (this.capacity_array[i].gesamter_kapazitaetsbedarf - 2400) / 5;
                }

                if (this.capacity_array[i].gesamter_kapazitaetsbedarf > 3600 && this.capacity_array[i].gesamter_kapazitaetsbedarf <= 4800) {
                    this.capacity_array[i].schichten = 2;
                    this.capacity_array[i].ueberstunden = 0;
                }

                if (this.capacity_array[i].gesamter_kapazitaetsbedarf > 4800 && this.capacity_array[i].gesamter_kapazitaetsbedarf <= 6000) {
                    this.capacity_array[i].schichten = 2;
                    this.capacity_array[i].ueberstunden = (this.capacity_array[i].gesamter_kapazitaetsbedarf - 4800) / 5;
                }

                if (this.capacity_array[i].gesamter_kapazitaetsbedarf > 6000 && this.capacity_array[i].gesamter_kapazitaetsbedarf <= 7200) {
                    this.capacity_array[i].schichten = 3;
                    this.capacity_array[i].ueberstunden = 0;
                }

                }

                this.berechneKapazitaetsauslastung();

    }

    berechneKapazitaetsauslastung() {

        const kapazitaetsangebot_arbeitsplatz = [];

        for (let i = 0; i < this.capacity_array.length; i++) {

            if (this.capacity_array[i].schichten === 1) {
                this.kapazitaetsangebot = 2400 + this.capacity_array[i].ueberstunden * 5;
                this.kapazitaetsangebot_array.push(this.kapazitaetsangebot);
                let kapazitaetsauslastung = (this.capacity_array[i].gesamter_kapazitaetsbedarf / this.kapazitaetsangebot);
                kapazitaetsauslastung = parseFloat(kapazitaetsauslastung.toFixed(3));
                this.capacity_array[i].kapazitaetsauslastung = kapazitaetsauslastung;
                kapazitaetsangebot_arbeitsplatz.push(this.kapazitaetsangebot);
                this.kapazitaetsauslastung_arbeitsplatz.push(kapazitaetsauslastung);
            }

            if (this.capacity_array[i].schichten === 2) {
                this.kapazitaetsangebot = 4800 + this.capacity_array[i].ueberstunden * 5;
                this.kapazitaetsangebot_array.push(this.kapazitaetsangebot);
                let kapazitaetsauslastung = (this.capacity_array[i].gesamter_kapazitaetsbedarf / this.kapazitaetsangebot);
                kapazitaetsauslastung = parseFloat(kapazitaetsauslastung.toFixed(3));
                this.capacity_array[i].kapazitaetsauslastung = kapazitaetsauslastung;
                kapazitaetsangebot_arbeitsplatz.push(this.kapazitaetsangebot);
                this.kapazitaetsauslastung_arbeitsplatz.push(kapazitaetsauslastung);
            }

            if (this.capacity_array[i].schichten === 3) {
                this.kapazitaetsangebot = 7200;
                this.kapazitaetsangebot_array.push(this.kapazitaetsangebot);
                let kapazitaetsauslastung = (this.capacity_array[i].gesamter_kapazitaetsbedarf / this.kapazitaetsangebot);
                kapazitaetsauslastung = parseFloat(kapazitaetsauslastung.toFixed(3));
                this.capacity_array[i].kapazitaetsauslastung = kapazitaetsauslastung;
                kapazitaetsangebot_arbeitsplatz.push(this.kapazitaetsangebot);
                this.kapazitaetsauslastung_arbeitsplatz.push(kapazitaetsauslastung);
            }

        }

        console.log('Kapazitaetsangebot Arbeitsplätze:' + kapazitaetsangebot_arbeitsplatz);
        console.log('Kapazitaetsauslastung Arbeitsplätze:' + this.kapazitaetsauslastung_arbeitsplatz);

        this.berechneMaschinenkostenundLohnkosten();

    }

    berechneMaschinenkostenundLohnkosten() {

        const variable_maschinenkosten_array = [0.05, 0.05, 0.05, 0.05, 0.30, 0.30, 0.30, 0.80, 0.30, 0.30, 0.30, 0.50, 0.05, 0.05];
        const fixe_maschinenkosten_array = [0.01, 0.01, 0.01, 0.01, 0.10, 0.10, 0.10, 0.25, 0.10, 0.10, 0.10, 0.15, 0.01, 0.01];

        const leerzeit_array = [];
        const maschinenkosten_array = [];
        const maschinenstillstandkosten_array = [];
        const lohnkosten_array = [];
        const lohnleerkosten_array = [];

        for (let i = 0; i < this.capacity_array.length; i++) {
            const leerzeit_arbeitsplatz = this.kapazitaetsangebot_array[i] - this.capacity_array[i].gesamter_kapazitaetsbedarf;
            leerzeit_array.push(leerzeit_arbeitsplatz);
            const maschinenkosten = this.kapazitaetsangebot_array[i] * variable_maschinenkosten_array[i];
            maschinenkosten_array.push(maschinenkosten);
            const maschinenstillstandkosten = leerzeit_arbeitsplatz * fixe_maschinenkosten_array[i];
            maschinenstillstandkosten_array.push(maschinenstillstandkosten);
            if (this.capacity_array[i].schichten === 1) {
                const lohnkosten = 2400 * 0.45 + ((this.capacity_array[i].ueberstunden) * 5) * 0.90;
                const lohnleerkosten = leerzeit_arbeitsplatz * 0.45;
                lohnkosten_array.push(lohnkosten);
                lohnleerkosten_array.push(lohnleerkosten);
            }
            if (this.capacity_array[i].schichten === 2) {
                const lohnkosten = 2400 * 0.45 + 2400 * 0.55 + ((this.capacity_array[i].ueberstunden) * 5) * 0.90;
                const lohnleerkosten = leerzeit_arbeitsplatz * 0.55;
                lohnkosten_array.push(lohnkosten);
                lohnleerkosten_array.push(lohnleerkosten);
            }
            if (this.capacity_array[i].schichten === 3) {
                const lohnkosten = 2400 * 0.45 + 2400 * 0.55 + 2400 * 0.70;
                const lohnleerkosten = leerzeit_arbeitsplatz * 0.70;
                lohnkosten_array.push(lohnkosten);
                lohnleerkosten_array.push(lohnleerkosten);
            }
        }

        console.log('Leerzeit Arbeitsplätze: ' + leerzeit_array);
        console.log('Maschinenkosten Arbeitsplätze: ' + maschinenkosten_array);
        console.log('Maschinenstillstandkosten Arbeitsplätze: ' + maschinenstillstandkosten_array);
        console.log('Lohnkosten Arbeitsplätze: ' + lohnkosten_array);
        console.log('Lohnleerkosten Arbeitsplätze: ' + lohnleerkosten_array);

        this.leerzeit = leerzeit_array.reduce((a, b) => a + b, 0);
        this.maschinenkosten = maschinenkosten_array.reduce((a, b) => a + b, 0);
        localStorage.setItem('maschinenkosten', this.maschinenkosten.toString());
        this.maschinenstillstandkosten = maschinenstillstandkosten_array.reduce((a, b) => a + b, 0);
        this.lohnkosten = lohnkosten_array.reduce((a, b) => a + b, 0);
        localStorage.setItem('lohnkosten', this.lohnkosten.toString());
        this.lohnleerkosten = lohnleerkosten_array.reduce((a, b) => a + b, 0);

        console.log('Leerzeit Arbeitsplätze gesamt: ' + this.leerzeit);
        console.log('Maschinenkosten Arbeitsplätze gesamt: ' + this.maschinenkosten);
        console.log('Maschinenstillstandkosten Arbeitsplätze gesamt: ' + this.maschinenstillstandkosten);
        console.log('Lohnkosten Arbeitsplätze gesamt: ' + this.lohnkosten);
        console.log('Lohnleerkosten Arbeitsplätze gesamt: ' + this.lohnleerkosten);

    }

    saveArbeitsplatz() {

        const criteria = [
            {key: 'periode.equals', value: parseInt(localStorage.getItem('aktuelleperiode'), 10)}
        ];

        this.arbeitsplatzService.query({
            size: 1000000,
            criteria
        })
            .subscribe((res: ResponseWrapper) => {
                this.arbeitsplaetze = res.json;
                let i;
                for (i = 0; i < this.capacity_array.length; i++) {
                    this.arbeitsplatz = this.arbeitsplaetze.find((arbeitsplatz) => (arbeitsplatz.nummer === this.capacity_array[i].arbeitsplatznummer)
                        && arbeitsplatz.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10));
                    if (this.arbeitsplatz !== undefined) {
                        this.arbeitsplatz.schicht = this.capacity_array[i].schichten;
                        this.arbeitsplatz.ueberstunden = this.capacity_array[i].ueberstunden;
                        this.arbeitsplatzService.update(this.arbeitsplatz).subscribe((respond: Arbeitsplatz) =>
                            console.log(respond), () => this.onSaveError());
                    } else {
                        this.arbeitsplatz = new Arbeitsplatz(undefined, parseInt(localStorage.getItem('aktuelleperiode'), 10),
                            this.capacity_array[i].arbeitsplatznummer, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, this.capacity_array[i].schichten, this.capacity_array[i].ueberstunden)
                        this.arbeitsplatzService.create(this.arbeitsplatz).subscribe((respond: Arbeitsplatz) =>
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
