import { Component, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs/Rx';

import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Teil, Teiltyp } from '../../entities/teil';
import {Capacity} from '../../entities/anzeige/capacity_planning.model';
import { TeilService } from '../../entities/teil';
import { Arbeitsplatz, ArbeitsplatzService } from '../../entities/arbeitsplatz';
import { Fertigungsauftrag, FertigungsauftragService  } from '../../entities/fertigungsauftrag';
import {Principal, ResponseWrapper} from '../../shared';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'jhi-capacity-planning',
    templateUrl: './capacity_planning.component.html',
})
export class CapacityPlanningComponent implements OnInit {

    isSaving: boolean;
    teils: Teil[];
    teil: Teil;
    account: any;
    arbeitsplatz: Arbeitsplatz;
    capacity: Capacity;
    arbeitsplaetze: Arbeitsplatz[];
    arbeitsplaetze_vorperiode: Arbeitsplatz[];
    currentAccount: any;
    fertigungsauftraege: Fertigungsauftrag[];
    fertigungsauftraege_alt: Fertigungsauftrag[];
    ruestvorgaenge_teil_array_neu = [];
    ruestvorgaenge_teil_array_alt = [];

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
                this.capacity = new Capacity(undefined, 1, undefined, undefined,
                    undefined, undefined, undefined, undefined, undefined,
                     parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 2, undefined, undefined,
                    undefined, undefined, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 3, undefined, undefined,
                    undefined, undefined, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 4, undefined, undefined,
                    undefined, undefined, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 6, undefined, undefined,
                    undefined, undefined, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 7, undefined, undefined,
                    undefined, undefined, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 8, undefined, undefined,
                    undefined, undefined, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 9, undefined, undefined,
                    undefined, undefined, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 10, undefined, undefined,
                    undefined, undefined, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 11, undefined, undefined,
                    undefined, undefined, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 12, undefined, undefined,
                    undefined, undefined, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 13, undefined, undefined,
                    undefined, undefined, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 14, undefined, undefined,
                    undefined, undefined, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
                this.capacity = new Capacity(undefined, 15, undefined, undefined,
                    undefined, undefined, undefined, undefined, undefined,
                    parseInt(localStorage.getItem('aktuelleperiode'), 10));
                this.capacity_array.push(this.capacity);
            } else {
                for (const arbeitsplatz of this.arbeitsplaetze) {
                    this.capacity_array.push(
                        new Capacity(undefined, arbeitsplatz.nummer, undefined, undefined,
                            undefined, undefined, undefined, undefined, undefined,
                            arbeitsplatz.periode));
                }
            }

            this.berechneSichtundUeberstunden();

        }, (res: ResponseWrapper) => this.onError(res.json));

    };

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    async berechneKapzitaetsbedarfneu() {

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

        }, (res: ResponseWrapper) => this.onError(res.json));
    }

    async berechneRuestzeitneu() {

        const criteria = [
            {key: 'periode.equals', value: parseInt(localStorage.getItem('aktuelleperiode'), 10)}
        ];

        this.fertigungsauftragService.query({
            size: 1000000,
            criteria
        }).subscribe((res: ResponseWrapper) => {
            this.fertigungsauftraege = res.json;

            // this.fertigungsauftraege.sort((a,b) => a.herstellteil.id-b.herstellteil.id);

           /* for (let i = 0; i < this.teils.length; i++) {
                this.ruestvorgaenge_teil_array_neu.push(new Object({
                    nummer: this.teils[i].nummer,
                    ruestvorgaenge: 0,
                    rüstvorgänge_array: []
                }));

                this.teil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[i].herstellteil.id));

                if (this.teils[i].nummer=this.teil.nummer) {*/

                    for (let j = 0; j < this.fertigungsauftraege.length; j++) {

                        // Sind die Rüstvorgänge richtig berechnet

                        this.teil = this.teils.find((teil) => (teil.id === this.fertigungsauftraege[j].herstellteil.id));

                        this.ruestvorgaenge_teil_array_neu.push(new Object({
                            nummer: this.teil.nummer,
                            ruestvorgaenge: 1
                            // rüstvorgänge_array: []
                        }));

                        // this.ruestvorgaenge_teil_array_neu[j].rüstvorgänge_array.push(1);

                        // this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge = this.ruestvorgaenge_teil_array_neu[j].rüstvorgänge_array.reduce((a, b) => a + b, 0);

                    }

            // this.ruestvorgaenge_teil_array_neu =  _lodash.groupBy(this.ruestvorgaenge_teil_array_neu, 'nummer')

            /*    }

            }*/

            console.log(this.ruestvorgaenge_teil_array_neu);

            for (let i = 0; i < this.capacity_array.length; i++) {

                const ruestzeit_arbeitsplatz = [];

                for (let j = 0; j < this.ruestvorgaenge_teil_array_neu.length; j++) {

                    if (this.capacity_array[i].arbeitsplatznummer === 1) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 49 || this.ruestvorgaenge_teil_array_neu[j].nummer === 54
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 29) {
                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 20);
                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 2) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 50 || this.ruestvorgaenge_teil_array_neu[j].nummer === 55) {
                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 30);
                        }

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 30) {
                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 20);
                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 3) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 31 || this.ruestvorgaenge_teil_array_neu[j].nummer === 56
                            || this.ruestvorgaenge_teil_array_neu[j].numer === 51) {
                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 20);
                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 4) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 1 || this.ruestvorgaenge_teil_array_neu[j].nummer === 3) {
                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 30);
                        }

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 2) {
                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 20);
                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 6) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 18 || this.ruestvorgaenge_teil_array_neu[j].nummer === 19
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 20 || this.ruestvorgaenge_teil_array_neu[j].nummer === 16) {
                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 15);
                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 7) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 10 || this.ruestvorgaenge_teil_array_neu[j].nummer === 11
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 12 || this.ruestvorgaenge_teil_array_neu[j].nummer === 13
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 14 || this.ruestvorgaenge_teil_array_neu[j].nummer === 15
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 18 || this.ruestvorgaenge_teil_array_neu[j].nummer === 19
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 20) {
                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 20);
                        }

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 26) {
                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 30);
                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 8) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 10 || this.ruestvorgaenge_teil_array_neu[j].nummer === 11 ||
                            this.ruestvorgaenge_teil_array_neu[j].nummer === 12 || this.ruestvorgaenge_teil_array_neu[j].nummer === 13
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 14 || this.ruestvorgaenge_teil_array_neu[j].nummer === 15) {
                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 15);
                        }

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 18 || this.ruestvorgaenge_teil_array_neu[j].nummer === 20) {
                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 20);
                        }

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 19) {
                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 25);
                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 9) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 10 || this.ruestvorgaenge_teil_array_neu[j].nummer === 11 ||
                            this.ruestvorgaenge_teil_array_neu[j].nummer === 12 || this.ruestvorgaenge_teil_array_neu[j].nummer === 13
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 14 || this.ruestvorgaenge_teil_array_neu[j].nummer === 15
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 18 || this.ruestvorgaenge_teil_array_neu[j].nummer === 20) {
                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 15);
                        }

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 19) {
                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 20);
                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 10) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 4 || this.ruestvorgaenge_teil_array_neu[j].nummer === 5
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 6 || this.ruestvorgaenge_teil_array_neu[j].nummer === 7
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 8 || this.ruestvorgaenge_teil_array_neu[j].nummer === 9) {
                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 20);
                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 11) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 4 || this.ruestvorgaenge_teil_array_neu[j].nummer === 5) {
                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 10);
                        }

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 6 || this.ruestvorgaenge_teil_array_neu[j].nummer === 7
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 8 || this.ruestvorgaenge_teil_array_neu[j].nummer === 9) {
                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 20);
                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 12) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 10 || this.ruestvorgaenge_teil_array_neu[j].nummer === 11
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 12 || this.ruestvorgaenge_teil_array_neu[j].nummer === 13
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 14 || this.ruestvorgaenge_teil_array_neu[j].nummer === 15) {
                            ruestzeit_arbeitsplatz.push(0);
                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 13) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 10 || this.ruestvorgaenge_teil_array_neu[j].nummer === 11
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 12 || this.ruestvorgaenge_teil_array_neu[j].nummer === 13
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 14 || this.ruestvorgaenge_teil_array_neu[j].nummer === 15) {
                            ruestzeit_arbeitsplatz.push(0);
                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 14) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 16) {
                            ruestzeit_arbeitsplatz.push(0);
                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 15) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 17 || this.ruestvorgaenge_teil_array_neu[j].nummer === 26) {
                            ruestzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 15);
                        }

                        this.capacity_array[i].ruestzeit_neu = ruestzeit_arbeitsplatz.reduce((a, b) => a + b, 0);

                    }

                }
            }

        }, (res: ResponseWrapper) => this.onError(res.json));

    }

    async berechneKapzitaetsbedarfalt() {

        const criteria = [
            {key: 'periode.equals', value: parseInt(localStorage.getItem('aktuelleperiode'), 10) - 1}
        ];

        this.arbeitsplatzService.query({
            size: 1000000,
            criteria
        }).subscribe((res: ResponseWrapper) => {
            this.arbeitsplaetze_vorperiode = res.json;
            for (let i = 0; i < this.capacity_array.length; i++) {
                this.arbeitsplatz = this.arbeitsplaetze_vorperiode.find((arbeitsplatz) =>
                    (arbeitsplatz.nummer === this.capacity_array[i].arbeitsplatznummer));
                this.capacity_array[i].kapazitaetsbedarf_alt = this.arbeitsplatz.restzeitbedarf_in_bearbeitung
                    + this.arbeitsplatz.restzeitbedarf;
            }
        }, (res: ResponseWrapper) => this.onError(res.json));

    }

    async berechneRuestzeitalt() {
        for (let i = 0; i < this.capacity_array.length; i++) {
            this.capacity_array[i].ruestzeit_alt = 0;
        }

    }

   /* async berechneRuestzeitalt() {

        const criteria = [
            {key: 'auftragsstatus.in', value: 'ANGEFANGEN'},
            {key: 'periode.equals', value: parseInt(localStorage.getItem('aktuelleperiode'), 10) - 1}
        ];

        this.fertigungsauftragService.query({
            size: 1000000,
            criteria
        }).subscribe((res: ResponseWrapper) => {
            this.fertigungsauftraege_alt = res.json;

            console.log(this.teils);

            // Sind die Rüstvorgänge richtig berechnet muss noch teile gruppieren
            for (let i = 0; i < this.fertigungsauftraege_alt.length; i++) {

                this.teil = this.teile.find((teil) => (teil.id === this.fertigungsauftraege_alt[i].herstellteil.id));
                this.ruestvorgaenge_teil_array_alt.push(new Object({nummer: this.teil.nummer, ruestvorgaenge: 1}));

            }

            for (let i = 0; i < this.capacity_array.length; i++) {

                const rüstzeit_arbeitsplatz = [];

                for (let j = 0; j < this.ruestvorgaenge_teil_array_alt.length; j++) {

                    if (this.capacity_array[i].arbeitsplatznummer === 1) {

                        if (this.ruestvorgaenge_teil_array_alt[j].nummer === 49 || this.ruestvorgaenge_teil_array_alt[j].nummer === 54
                            || this.ruestvorgaenge_teil_array_alt[j].nummer === 29) {
                            rüstzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_alt[j].ruestvorgaenge * 20);
                        }

                        this.capacity_array[i].ruestzeit_neu = rüstzeit_arbeitsplatz.reduce((a,b) => a +b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 2) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 50 ||this.ruestvorgaenge_teil_array_neu[j].nummer === 55) {
                            rüstzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 30);
                        }

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 30) {
                            rüstzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 20);
                        }

                        this.capacity_array[i].ruestzeit_neu = rüstzeit_arbeitsplatz.reduce((a,b) => a +b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 3) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 31 || this.ruestvorgaenge_teil_array_neu[j].nummer === 56
                            || this.ruestvorgaenge_teil_array_neu[j].numer === 51) {
                            rüstzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 20);
                        }

                        this.capacity_array[i].ruestzeit_neu = rüstzeit_arbeitsplatz.reduce((a,b) => a +b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 4) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 1 || this.ruestvorgaenge_teil_array_neu[j].nummer === 3) {
                            rüstzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 30);
                        }

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 2) {
                            rüstzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 20);
                        }

                        this.capacity_array[i].ruestzeit_neu = rüstzeit_arbeitsplatz.reduce((a,b) => a +b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 6) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 18 || this.ruestvorgaenge_teil_array_neu[j].nummer === 19
                            ||this.ruestvorgaenge_teil_array_neu[j].nummer === 20 || this.ruestvorgaenge_teil_array_neu[j].nummer === 16) {
                            rüstzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 15);
                        }

                        this.capacity_array[i].ruestzeit_neu = rüstzeit_arbeitsplatz.reduce((a,b) => a +b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 7) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 10 || this.ruestvorgaenge_teil_array_neu[j].nummer === 11
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 12 || this.ruestvorgaenge_teil_array_neu[j].nummer === 13
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 14 || this.ruestvorgaenge_teil_array_neu[j].nummer === 15
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 18 || this.ruestvorgaenge_teil_array_neu[j].nummer === 19
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 20) {
                            rüstzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 20);
                        }

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 26) {
                            rüstzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 30);
                        }

                        this.capacity_array[i].ruestzeit_neu = rüstzeit_arbeitsplatz.reduce((a,b) => a +b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 8) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 10 || this.ruestvorgaenge_teil_array_neu[j].nummer === 11 ||
                            this.ruestvorgaenge_teil_array_neu[j].nummer === 12 || this.ruestvorgaenge_teil_array_neu[j].nummer === 13
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 14 || this.ruestvorgaenge_teil_array_neu[j].nummer === 15) {
                            rüstzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 15);
                        }

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 18 || this.ruestvorgaenge_teil_array_neu[j].nummer === 20) {
                            rüstzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 20);
                        }

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 19) {
                            rüstzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 25);
                        }

                        this.capacity_array[i].ruestzeit_neu = rüstzeit_arbeitsplatz.reduce((a,b) => a +b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 9) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 10 || this.ruestvorgaenge_teil_array_neu[j].nummer === 11 ||
                            this.ruestvorgaenge_teil_array_neu[j].nummer === 12 || this.ruestvorgaenge_teil_array_neu[j].nummer === 13
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 14 || this.ruestvorgaenge_teil_array_neu[j].nummer === 15
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 18 || this.ruestvorgaenge_teil_array_neu[j].nummer === 20) {
                            rüstzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 15);
                        }

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 19) {
                            rüstzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 20);
                        }

                        this.capacity_array[i].ruestzeit_neu = rüstzeit_arbeitsplatz.reduce((a,b) => a +b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 10) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 4 || this.ruestvorgaenge_teil_array_neu[j].nummer === 5
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 6 || this.ruestvorgaenge_teil_array_neu[j].nummer === 7
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 8 || this.ruestvorgaenge_teil_array_neu[j].nummer === 9) {
                            rüstzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 20);
                        }

                        this.capacity_array[i].ruestzeit_neu = rüstzeit_arbeitsplatz.reduce((a,b) => a +b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 11) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 4 || this.ruestvorgaenge_teil_array_neu[j].nummer === 5) {
                            rüstzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 10);
                        }

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 6 || this.ruestvorgaenge_teil_array_neu[j].nummer === 7
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 8 || this.ruestvorgaenge_teil_array_neu[j].nummer === 9) {
                            rüstzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 20);
                        }

                        this.capacity_array[i].ruestzeit_neu = rüstzeit_arbeitsplatz.reduce((a,b) => a +b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 12) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 10 || this.ruestvorgaenge_teil_array_neu[j].nummer === 11
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 12 || this.ruestvorgaenge_teil_array_neu[j].nummer === 13
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 14 || this.ruestvorgaenge_teil_array_neu[j].nummer === 15) {
                            rüstzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 0);
                        }

                        this.capacity_array[i].ruestzeit_neu = rüstzeit_arbeitsplatz.reduce((a,b) => a +b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 13) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 10 || this.ruestvorgaenge_teil_array_neu[j].nummer === 11
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 12 || this.ruestvorgaenge_teil_array_neu[j].nummer === 13
                            || this.ruestvorgaenge_teil_array_neu[j].nummer === 14 || this.ruestvorgaenge_teil_array_neu[j].nummer === 15) {
                            rüstzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 0);
                        }

                        this.capacity_array[i].ruestzeit_neu = rüstzeit_arbeitsplatz.reduce((a,b) => a +b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 14) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 16) {
                            rüstzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 0);
                        }

                        this.capacity_array[i].ruestzeit_neu = rüstzeit_arbeitsplatz.reduce((a,b) => a +b, 0);

                    }

                    if (this.capacity_array[i].arbeitsplatznummer === 15) {

                        if (this.ruestvorgaenge_teil_array_neu[j].nummer === 17 || this.ruestvorgaenge_teil_array_neu[j].nummer === 26) {
                            rüstzeit_arbeitsplatz.push(this.ruestvorgaenge_teil_array_neu[j].ruestvorgaenge * 15);
                        }

                        this.capacity_array[i].ruestzeit_neu = rüstzeit_arbeitsplatz.reduce((a,b) => a +b, 0);

                    }

                }
            }

        }, (res: ResponseWrapper) => this.onError(res.json));

    }*/

    async berechneRuestzeitenundKapazitaeten() {

        await this.berechneKapzitaetsbedarfneu();

        await this.berechneRuestzeitneu();

        await this.berechneKapzitaetsbedarfalt();

        await this.berechneRuestzeitalt();

    }

   async berechneGesamtKapazitaetsbedarf() {

       this.berechneRuestzeitenundKapazitaeten();

       /*await this.berechneRuestzeitenundKapazitaeten().then( () => {
           for (let i=0; i < this.capacity_array.length; i++) {
               this.capacity_array[i].gesamter_kapazitaetsbedarf = this.capacity_array[i].kapazitaetsbedarf_neu
                   + this.capacity_array[i].ruestzeit_neu + this.capacity_array[i].kapazitaetsbedarf_alt + this.capacity_array[i].ruestzeit_alt;
               console.log(this.capacity_array[i]);
           }
       });*/

      setTimeout( () => {
           for (let i = 0; i < this.capacity_array.length; i++) {
               this.capacity_array[i].gesamter_kapazitaetsbedarf = this.capacity_array[i].kapazitaetsbedarf_neu
                   + this.capacity_array[i].ruestzeit_neu + this.capacity_array[i].kapazitaetsbedarf_alt + this.capacity_array[i].ruestzeit_alt;
           }
       }, 500);

   }

    berechneSichtundUeberstunden() {

        this.berechneGesamtKapazitaetsbedarf();

       /* this.berechneGesamtKapazitaetsbedarf().then(() => {*/

        setTimeout( () => {
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

        // })
        }, 500);

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
