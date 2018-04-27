import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Teil, Teiltyp } from '../../entities/teil';
import { InHouse } from '../../entities/anzeige/in-house_production.model';
import { TeilService } from '../../entities/teil';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-in-house-production',
     // Auswahlmenue in der Navigationsleiste
    templateUrl: './in-house_production.component.html',
     // Fenstergröße --> hier: Standard
     // styles: []
})
export class InHouseProductionComponent implements OnInit {

    // Variablen, die ich benötige hier definieren:
    // Anmerkungen: nach DB update (Bei Entität Fertigungsaufträge - Herstellid wird auf die selbstgenerierteId referenziert.
    // Besser wäre die Nummer anzugeben)
                 // Bei Subkomponente sollte eine Liste angegeben werden (hier auch wieder auf ID referenziert,
    // aber das hab ich schon im Programm umgesetzt das ist nicht so schlimm)

    isSaving: boolean;
    teils: Teil[];
    teile: Teil[];
    lagerbestand_teile__periode0 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 300, 300, 100, 100, 100, 300, 100, 100,
    100, 100, 100, 100, 100, 100, 100];
    account: any;
    currentAccount: any;
    eventSubscriber: Subscription;
    teil: Teil;
    inhouse_anzeige_array = [];

    constructor(
        // private in_house_productionService: TeilService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private teilService: TeilService,

    ) {}

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });

        this.isSaving = false;
        let criteria = [
            {key: 'teiltyp.in', value: 'PRODUKT'},
            {key: 'teiltyp.in', value: 'ERZEUGNIS'},
            {key: 'periode.equals', value: parseInt(localStorage.getItem('aktuelleperiode'), 10)}
        ];

        this.teilService.query({
            size: 1000000,
            criteria
        }).subscribe((res: ResponseWrapper) => {
                // if (this.teil.nummer != null && this.teil.nummer == "1"){
                this.teils = res.json;
            if (this.teils.length !== 0) {
                for (let i = 0; i < this.teils.length; i++) {
                    this.teil = this.teils.find((teil) => (teil.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10))
                        && teil.nummer === this.teils[i].nummer);
                    if (this.teils.length <= 3) {
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 4,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 5,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 6,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 7,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 8,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 9,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 10,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 11,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 12,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 13,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 14,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 15,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 16,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 17,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 18,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 19,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 20,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 26,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 49,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 54,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 29,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 50,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 55,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 30,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 51,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 56,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                        this.teil = new Teil(undefined, Teiltyp.ERZEUGNIS, parseInt(localStorage.getItem('aktuelleperiode'), 10), 31,
                            undefined, undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined, undefined,
                            undefined, undefined, undefined);
                        this.teils.push(this.teil);
                    }
                }
            }

            this.teils.sort((a, b) => a.nummer - b.nummer);
            for (const teil of this.teils) {
                    this.inhouse_anzeige_array.push(
                        new InHouse(undefined, teil.teiltyp, teil.nummer, teil.direktverkaufmenge, teil.vertriebswunsch,
                            undefined, teil.sicherheitsbestand, undefined, undefined,
                            undefined, teil.gesamtproduktionsmenge, teil.periode))
            }
            for (let i = 0; i < this.teils.length; i++) {
                if (this.teils[i].direktverkaufmenge !== undefined && this.teils[i].direktverkaufmenge !== null) {
                    this.inhouse_anzeige_array[i].direktverkaufsmenge = this.teils[i].direktverkaufmenge;
                } else {
                    this.inhouse_anzeige_array[i].direktverkaufsmenge = 0;
                }
                if (this.teils[i].sicherheitsbestand !== undefined && this.teils[i].sicherheitsbestand !== null) {
                    // this.inhouse_anzeige_array[i].sicherheitsbestand = 0;
                } else {
                    this.inhouse_anzeige_array[i].sicherheitsbestand = 0;
                }

                this.inhouse_anzeige_array[i].auftraege_in_warteliste = 0;
                this.inhouse_anzeige_array[i].auftraege_in_bearbeitung = 0;
                this.inhouse_anzeige_array[i].warteliste_subkomponente = 0;
                this.inhouse_anzeige_array[i].bestand_vorperiode = this.lagerbestand_teile__periode0[i];
                this.inhouse_anzeige_array[i].produktionsauftraege = this.inhouse_anzeige_array[i].vertriebswunsch +
                    this.inhouse_anzeige_array[i].direktverkaufsmenge + this.inhouse_anzeige_array[i].warteliste_subkomponente
                    + this.inhouse_anzeige_array[i].sicherheitsbestand
                    - this.inhouse_anzeige_array[i].bestand_vorperiode - this.inhouse_anzeige_array[i].auftraege_in_warteliste
                    - this.inhouse_anzeige_array[i].auftraege_in_bearbeitung;
                if (this.inhouse_anzeige_array[i].produktionsauftraege < 0) {
                    this.inhouse_anzeige_array[i].produktionsauftraege = 0;
                }

                const index51 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 51)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[i].nummer === 1) {
                    this.inhouse_anzeige_array[index51].vertriebswunsch = this.inhouse_anzeige_array[i].produktionsauftraege;
                    this.inhouse_anzeige_array[index51].warteliste_subkomponente = this.inhouse_anzeige_array[i].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index51].produktionsauftraege = this.inhouse_anzeige_array[index51].vertriebswunsch +
                        this.inhouse_anzeige_array[index51].direktverkaufsmenge + this.inhouse_anzeige_array[index51].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index51].sicherheitsbestand
                        - this.inhouse_anzeige_array[index51].bestand_vorperiode - this.inhouse_anzeige_array[index51].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index51].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index51].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index51].produktionsauftraege = 0;
                    }
                }
                const index26 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 26)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[i].nummer === 1 || this.inhouse_anzeige_array[i].nummer === 2
                    || this.inhouse_anzeige_array[i].nummer === 3) {
                    const index1 = this.inhouse_anzeige_array.findIndex((teili) => (teili.nummer === 1)
                        && (teili.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    const index2 = this.inhouse_anzeige_array.findIndex((teili) => (teili.nummer === 2)
                        && (teili.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    const index3 = this.inhouse_anzeige_array.findIndex((teili) => (teili.nummer === 3)
                        && (teili.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    this.inhouse_anzeige_array[index26].vertriebswunsch = this.inhouse_anzeige_array[index1].produktionsauftraege
                        + this.inhouse_anzeige_array[index2].produktionsauftraege + this.inhouse_anzeige_array[index3].produktionsauftraege;
                    this.inhouse_anzeige_array[index26].warteliste_subkomponente = this.inhouse_anzeige_array[index1].auftraege_in_warteliste
                        + this.inhouse_anzeige_array[index2].auftraege_in_warteliste + this.inhouse_anzeige_array[index3].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index26].produktionsauftraege = this.inhouse_anzeige_array[index26].vertriebswunsch +
                        this.inhouse_anzeige_array[index26].direktverkaufsmenge + this.inhouse_anzeige_array[index26].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index26].sicherheitsbestand
                        - this.inhouse_anzeige_array[index26].bestand_vorperiode - this.inhouse_anzeige_array[index26].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index26].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index26].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index26].produktionsauftraege = 0;
                    }
                }
                const index56 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 56)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[i].nummer === 2) {
                    this.inhouse_anzeige_array[index56].vertriebswunsch = this.inhouse_anzeige_array[i].produktionsauftraege;
                    this.inhouse_anzeige_array[index56].warteliste_subkomponente = this.inhouse_anzeige_array[i].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index56].produktionsauftraege = this.inhouse_anzeige_array[index56].vertriebswunsch +
                        this.inhouse_anzeige_array[index56].direktverkaufsmenge + this.inhouse_anzeige_array[index56].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index56].sicherheitsbestand
                        - this.inhouse_anzeige_array[index56].bestand_vorperiode - this.inhouse_anzeige_array[index56].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index56].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index56].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index56].produktionsauftraege = 0;
                    }

                }
                const index31 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 31)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[i].nummer === 3) {
                    this.inhouse_anzeige_array[index31].vertriebswunsch = this.inhouse_anzeige_array[i].produktionsauftraege;
                    this.inhouse_anzeige_array[index31].warteliste_subkomponente = this.inhouse_anzeige_array[i].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index31].produktionsauftraege = this.inhouse_anzeige_array[index31].vertriebswunsch +
                        this.inhouse_anzeige_array[index31].direktverkaufsmenge + this.inhouse_anzeige_array[index31].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index31].sicherheitsbestand
                        - this.inhouse_anzeige_array[index31].bestand_vorperiode - this.inhouse_anzeige_array[index31].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index31].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index31].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index31].produktionsauftraege = 0;
                    }
                }

                const index16 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 16)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[index51].nummer === 51 || this.inhouse_anzeige_array[index56].nummer === 56
                    || this.inhouse_anzeige_array[index31].nummer === 31) {

                    this.inhouse_anzeige_array[index16].vertriebswunsch = this.inhouse_anzeige_array[index51].produktionsauftraege
                        + this.inhouse_anzeige_array[index56].produktionsauftraege + this.inhouse_anzeige_array[index31].produktionsauftraege;
                    this.inhouse_anzeige_array[index16].warteliste_subkomponente = this.inhouse_anzeige_array[index51].auftraege_in_warteliste
                        + this.inhouse_anzeige_array[index56].auftraege_in_warteliste + this.inhouse_anzeige_array[index31].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index16].produktionsauftraege = this.inhouse_anzeige_array[index16].vertriebswunsch +
                        this.inhouse_anzeige_array[index16].direktverkaufsmenge + this.inhouse_anzeige_array[index16].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index16].sicherheitsbestand
                        - this.inhouse_anzeige_array[index16].bestand_vorperiode - this.inhouse_anzeige_array[index16].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index16].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index16].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index16].produktionsauftraege = 0;
                    }

                }
                const index17 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 17)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[index51].nummer === 51 || this.inhouse_anzeige_array[index56].nummer === 56
                    || this.inhouse_anzeige_array[index31].nummer === 31) {

                    this.inhouse_anzeige_array[index17].vertriebswunsch = this.inhouse_anzeige_array[index51].produktionsauftraege
                        + this.inhouse_anzeige_array[index56].produktionsauftraege + this.inhouse_anzeige_array[index31].produktionsauftraege;
                    this.inhouse_anzeige_array[index17].warteliste_subkomponente = this.inhouse_anzeige_array[index51].auftraege_in_warteliste
                        + this.inhouse_anzeige_array[index56].auftraege_in_warteliste + this.inhouse_anzeige_array[index31].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index17].produktionsauftraege = this.inhouse_anzeige_array[index17].vertriebswunsch +
                        this.inhouse_anzeige_array[index17].direktverkaufsmenge + this.inhouse_anzeige_array[index17].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index17].sicherheitsbestand
                        - this.inhouse_anzeige_array[index17].bestand_vorperiode - this.inhouse_anzeige_array[index17].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index17].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index17].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index17].produktionsauftraege = 0;
                    }
                }
                const index50 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 50)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[index51].nummer === 51) {
                    this.inhouse_anzeige_array[index50].vertriebswunsch = this.inhouse_anzeige_array[index51].produktionsauftraege;
                    this.inhouse_anzeige_array[index50].warteliste_subkomponente = this.inhouse_anzeige_array[index51].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index50].produktionsauftraege = this.inhouse_anzeige_array[index50].vertriebswunsch +
                        this.inhouse_anzeige_array[index50].direktverkaufsmenge + this.inhouse_anzeige_array[index50].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index50].sicherheitsbestand
                        - this.inhouse_anzeige_array[index50].bestand_vorperiode - this.inhouse_anzeige_array[index50].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index50].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index50].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index50].produktionsauftraege = 0;
                    }
                }
                const index55 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 55)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[index56].nummer === 56) {
                    this.inhouse_anzeige_array[index55].vertriebswunsch = this.inhouse_anzeige_array[index56].produktionsauftraege;
                    this.inhouse_anzeige_array[index55].warteliste_subkomponente = this.inhouse_anzeige_array[index56].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index55].produktionsauftraege = this.inhouse_anzeige_array[index55].vertriebswunsch +
                        this.inhouse_anzeige_array[index55].direktverkaufsmenge + this.inhouse_anzeige_array[index55].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index55].sicherheitsbestand
                        - this.inhouse_anzeige_array[index55].bestand_vorperiode - this.inhouse_anzeige_array[index55].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index55].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index55].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index55].produktionsauftraege = 0;
                    }
                }
                const index30 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 30)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[index31].nummer === 31) {
                    this.inhouse_anzeige_array[index30].vertriebswunsch = this.inhouse_anzeige_array[index31].produktionsauftraege;
                    this.inhouse_anzeige_array[index30].warteliste_subkomponente = this.inhouse_anzeige_array[index31].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index30].produktionsauftraege = this.inhouse_anzeige_array[index30].vertriebswunsch +
                        this.inhouse_anzeige_array[index30].direktverkaufsmenge + this.inhouse_anzeige_array[index30].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index30].sicherheitsbestand
                        - this.inhouse_anzeige_array[index30].bestand_vorperiode - this.inhouse_anzeige_array[index30].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index30].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index30].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index30].produktionsauftraege = 0;
                    }
                }

                const index4 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 4)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[index50].nummer === 50) {
                    this.inhouse_anzeige_array[index4].vertriebswunsch = this.inhouse_anzeige_array[index50].produktionsauftraege;
                    this.inhouse_anzeige_array[index4].warteliste_subkomponente = this.inhouse_anzeige_array[index50].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index4].produktionsauftraege = this.inhouse_anzeige_array[index4].vertriebswunsch +
                        this.inhouse_anzeige_array[index4].direktverkaufsmenge + this.inhouse_anzeige_array[index4].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index4].sicherheitsbestand
                        - this.inhouse_anzeige_array[index4].bestand_vorperiode - this.inhouse_anzeige_array[index4].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index4].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index4].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index4].produktionsauftraege = 0;
                    }
                }
                const index10 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 10)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[index50].nummer === 50) {
                    this.inhouse_anzeige_array[index10].vertriebswunsch = this.inhouse_anzeige_array[index50].produktionsauftraege;
                    this.inhouse_anzeige_array[index10].warteliste_subkomponente = this.inhouse_anzeige_array[index50].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index10].produktionsauftraege = this.inhouse_anzeige_array[index10].vertriebswunsch +
                        this.inhouse_anzeige_array[index10].direktverkaufsmenge + this.inhouse_anzeige_array[index10].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index10].sicherheitsbestand
                        - this.inhouse_anzeige_array[index10].bestand_vorperiode - this.inhouse_anzeige_array[index10].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index10].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index10].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index10].produktionsauftraege = 0;
                    }
                }
                const index49 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 49)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[index50].nummer === 50) {
                    this.inhouse_anzeige_array[index49].vertriebswunsch = this.inhouse_anzeige_array[index50].produktionsauftraege;
                    this.inhouse_anzeige_array[index49].warteliste_subkomponente = this.inhouse_anzeige_array[index50].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index49].produktionsauftraege = this.inhouse_anzeige_array[index49].vertriebswunsch +
                        this.inhouse_anzeige_array[index49].direktverkaufsmenge + this.inhouse_anzeige_array[index49].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index49].sicherheitsbestand
                        - this.inhouse_anzeige_array[index49].bestand_vorperiode - this.inhouse_anzeige_array[index49].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index49].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index49].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index49].produktionsauftraege = 0;
                    }
                }

                const index5 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 5)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[index55].nummer === 55) {
                    this.inhouse_anzeige_array[index5].vertriebswunsch = this.inhouse_anzeige_array[index55].produktionsauftraege;
                    this.inhouse_anzeige_array[index5].warteliste_subkomponente = this.inhouse_anzeige_array[index55].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index5].produktionsauftraege = this.inhouse_anzeige_array[index5].vertriebswunsch +
                        this.inhouse_anzeige_array[index5].direktverkaufsmenge + this.inhouse_anzeige_array[index5].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index5].sicherheitsbestand
                        - this.inhouse_anzeige_array[index5].bestand_vorperiode - this.inhouse_anzeige_array[index5].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index5].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index5].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index5].produktionsauftraege = 0;
                    }
                }
                const index11 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 11)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[index55].nummer === 55) {
                    this.inhouse_anzeige_array[index11].vertriebswunsch = this.inhouse_anzeige_array[index55].produktionsauftraege;
                    this.inhouse_anzeige_array[index11].warteliste_subkomponente = this.inhouse_anzeige_array[index55].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index11].produktionsauftraege = this.inhouse_anzeige_array[index11].vertriebswunsch +
                        this.inhouse_anzeige_array[index11].direktverkaufsmenge + this.inhouse_anzeige_array[index11].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index11].sicherheitsbestand
                        - this.inhouse_anzeige_array[index11].bestand_vorperiode - this.inhouse_anzeige_array[index11].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index11].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index11].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index11].produktionsauftraege = 0;
                    }
                }
                const index54 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 54)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[index55].nummer === 55) {
                    this.inhouse_anzeige_array[index54].vertriebswunsch = this.inhouse_anzeige_array[index55].produktionsauftraege;
                    this.inhouse_anzeige_array[index54].warteliste_subkomponente = this.inhouse_anzeige_array[index55].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index54].produktionsauftraege = this.inhouse_anzeige_array[index54].vertriebswunsch +
                        this.inhouse_anzeige_array[index54].direktverkaufsmenge + this.inhouse_anzeige_array[index54].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index54].sicherheitsbestand
                        - this.inhouse_anzeige_array[index54].bestand_vorperiode - this.inhouse_anzeige_array[index54].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index54].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index54].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index54].produktionsauftraege = 0;
                    }
                }
                const index6 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 6)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[index30].nummer === 30) {
                    this.inhouse_anzeige_array[index6].vertriebswunsch = this.inhouse_anzeige_array[index30].produktionsauftraege;
                    this.inhouse_anzeige_array[index6].warteliste_subkomponente = this.inhouse_anzeige_array[index30].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index6].produktionsauftraege = this.inhouse_anzeige_array[index6].vertriebswunsch +
                        this.inhouse_anzeige_array[index6].direktverkaufsmenge + this.inhouse_anzeige_array[index6].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index6].sicherheitsbestand
                        - this.inhouse_anzeige_array[index6].bestand_vorperiode - this.inhouse_anzeige_array[index6].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index6].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index6].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index6].produktionsauftraege = 0;
                    }
                }
                const index12 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 12)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[index30].nummer === 30) {
                    this.inhouse_anzeige_array[index12].vertriebswunsch = this.inhouse_anzeige_array[index30].produktionsauftraege;
                    this.inhouse_anzeige_array[index12].warteliste_subkomponente = this.inhouse_anzeige_array[index30].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index12].produktionsauftraege = this.inhouse_anzeige_array[index12].vertriebswunsch +
                        this.inhouse_anzeige_array[index12].direktverkaufsmenge + this.inhouse_anzeige_array[index12].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index12].sicherheitsbestand
                        - this.inhouse_anzeige_array[index12].bestand_vorperiode - this.inhouse_anzeige_array[index12].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index12].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index12].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index12].produktionsauftraege = 0;
                    }

                }
                const index29 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 29)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[index30].nummer === 30) {
                    this.inhouse_anzeige_array[index29].vertriebswunsch = this.inhouse_anzeige_array[index30].produktionsauftraege;
                    this.inhouse_anzeige_array[index29].warteliste_subkomponente = this.inhouse_anzeige_array[i].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index29].produktionsauftraege = this.inhouse_anzeige_array[index29].vertriebswunsch +
                        this.inhouse_anzeige_array[index29].direktverkaufsmenge + this.inhouse_anzeige_array[index29].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index29].sicherheitsbestand
                        - this.inhouse_anzeige_array[index29].bestand_vorperiode - this.inhouse_anzeige_array[index29].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index29].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index29].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index29].produktionsauftraege = 0;
                    }
                }

                const index7 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 7)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[index49].nummer === 49) {
                    this.inhouse_anzeige_array[index7].vertriebswunsch = this.inhouse_anzeige_array[index49].produktionsauftraege;
                    this.inhouse_anzeige_array[index7].warteliste_subkomponente = this.inhouse_anzeige_array[index49].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index7].produktionsauftraege = this.inhouse_anzeige_array[index7].vertriebswunsch +
                        this.inhouse_anzeige_array[index7].direktverkaufsmenge + this.inhouse_anzeige_array[index7].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index7].sicherheitsbestand
                        - this.inhouse_anzeige_array[index7].bestand_vorperiode - this.inhouse_anzeige_array[index7].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index7].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index7].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index7].produktionsauftraege = 0;
                    }
                }
                const index13 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 13)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[index49].nummer === 49) {
                    this.inhouse_anzeige_array[index13].vertriebswunsch = this.inhouse_anzeige_array[index49].produktionsauftraege;
                    this.inhouse_anzeige_array[index13].warteliste_subkomponente = this.inhouse_anzeige_array[index49].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index13].produktionsauftraege = this.inhouse_anzeige_array[index13].vertriebswunsch +
                        this.inhouse_anzeige_array[index13].direktverkaufsmenge + this.inhouse_anzeige_array[index13].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index13].sicherheitsbestand
                        - this.inhouse_anzeige_array[index13].bestand_vorperiode - this.inhouse_anzeige_array[index13].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index13].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index13].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index13].produktionsauftraege = 0;
                    }

                }
                const index18 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 18)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[index49].nummer === 49) {
                    this.inhouse_anzeige_array[index18].vertriebswunsch = this.inhouse_anzeige_array[index49].produktionsauftraege;
                    this.inhouse_anzeige_array[index18].warteliste_subkomponente = this.inhouse_anzeige_array[index49].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index18].produktionsauftraege = this.inhouse_anzeige_array[index18].vertriebswunsch +
                        this.inhouse_anzeige_array[index18].direktverkaufsmenge + this.inhouse_anzeige_array[index18].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index18].sicherheitsbestand
                        - this.inhouse_anzeige_array[index18].bestand_vorperiode - this.inhouse_anzeige_array[index18].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index18].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index18].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index18].produktionsauftraege = 0;
                    }
                }
                const index8 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 8)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[index54].nummer === 54) {
                    this.inhouse_anzeige_array[index8].vertriebswunsch = this.inhouse_anzeige_array[index54].produktionsauftraege;
                    this.inhouse_anzeige_array[index8].warteliste_subkomponente = this.inhouse_anzeige_array[index54].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index8].produktionsauftraege = this.inhouse_anzeige_array[index8].vertriebswunsch +
                        this.inhouse_anzeige_array[index8].direktverkaufsmenge + this.inhouse_anzeige_array[index8].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index8].sicherheitsbestand
                        - this.inhouse_anzeige_array[index8].bestand_vorperiode - this.inhouse_anzeige_array[index8].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index8].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index8].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index8].produktionsauftraege = 0;
                    }
                }
                const index14 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 14)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[index54].nummer === 54) {
                    this.inhouse_anzeige_array[index14].vertriebswunsch = this.inhouse_anzeige_array[index54].produktionsauftraege;
                    this.inhouse_anzeige_array[index14].warteliste_subkomponente = this.inhouse_anzeige_array[index54].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index14].produktionsauftraege = this.inhouse_anzeige_array[index14].vertriebswunsch +
                        this.inhouse_anzeige_array[index14].direktverkaufsmenge + this.inhouse_anzeige_array[index14].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index14].sicherheitsbestand
                        - this.inhouse_anzeige_array[index14].bestand_vorperiode - this.inhouse_anzeige_array[index14].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index14].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index14].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index14].produktionsauftraege = 0;
                    }
                }
                const index19 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 19)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[index54].nummer === 54) {
                    this.inhouse_anzeige_array[index19].vertriebswunsch = this.inhouse_anzeige_array[index54].produktionsauftraege;
                    this.inhouse_anzeige_array[index19].warteliste_subkomponente = this.inhouse_anzeige_array[index54].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index19].produktionsauftraege = this.inhouse_anzeige_array[index19].vertriebswunsch +
                        this.inhouse_anzeige_array[index19].direktverkaufsmenge + this.inhouse_anzeige_array[index19].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index19].sicherheitsbestand
                        - this.inhouse_anzeige_array[index19].bestand_vorperiode - this.inhouse_anzeige_array[index19].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index19].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index19].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index19].produktionsauftraege = 0;
                    }
                }
                const index9 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 9)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[index29].nummer === 29) {
                    this.inhouse_anzeige_array[index9].vertriebswunsch = this.inhouse_anzeige_array[index29].produktionsauftraege;
                    this.inhouse_anzeige_array[index9].warteliste_subkomponente = this.inhouse_anzeige_array[index29].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index9].produktionsauftraege = this.inhouse_anzeige_array[index9].vertriebswunsch +
                        this.inhouse_anzeige_array[index9].direktverkaufsmenge + this.inhouse_anzeige_array[index9].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index9].sicherheitsbestand
                        - this.inhouse_anzeige_array[index9].bestand_vorperiode - this.inhouse_anzeige_array[index9].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index9].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index9].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index9].produktionsauftraege = 0;
                    }
                }
                const index15 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 15)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[index29].nummer === 29) {
                    this.inhouse_anzeige_array[index15].vertriebswunsch = this.inhouse_anzeige_array[index29].produktionsauftraege;
                    this.inhouse_anzeige_array[index15].warteliste_subkomponente = this.inhouse_anzeige_array[index29].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index15].produktionsauftraege = this.inhouse_anzeige_array[index15].vertriebswunsch +
                        this.inhouse_anzeige_array[index15].direktverkaufsmenge + this.inhouse_anzeige_array[index15].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index15].sicherheitsbestand
                        - this.inhouse_anzeige_array[index15].bestand_vorperiode - this.inhouse_anzeige_array[index15].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index15].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index15].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index15].produktionsauftraege = 0;
                    }
                }
                const index20 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 20)
                    && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                if (this.inhouse_anzeige_array[index29].nummer === 29) {
                    this.inhouse_anzeige_array[index20].vertriebswunsch = this.inhouse_anzeige_array[index29].produktionsauftraege;
                    this.inhouse_anzeige_array[index20].warteliste_subkomponente = this.inhouse_anzeige_array[index29].auftraege_in_warteliste;
                    this.inhouse_anzeige_array[index20].produktionsauftraege = this.inhouse_anzeige_array[index20].vertriebswunsch +
                        this.inhouse_anzeige_array[index20].direktverkaufsmenge + this.inhouse_anzeige_array[index20].warteliste_subkomponente
                        + this.inhouse_anzeige_array[index20].sicherheitsbestand
                        - this.inhouse_anzeige_array[index20].bestand_vorperiode - this.inhouse_anzeige_array[index20].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[index20].auftraege_in_bearbeitung;
                    if (this.inhouse_anzeige_array[index20].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[index20].produktionsauftraege = 0;
                    }
                }

            }

            }, (res: ResponseWrapper) => this.onError(res.json), () => {

            criteria = [
                {key: 'teiltyp.in', value: 'PRODUKT'},
                {key: 'teiltyp.in', value: 'ERZEUGNIS'},
                {key: 'periode.equals', value: parseInt(localStorage.getItem('aktuelleperiode'), 10) - 1}
            ];
        this.teilService.query({
            size: 1000000,
            criteria
        }).subscribe((res: ResponseWrapper) => {

            this.teile = res.json;
                for (let i = 0; i < this.inhouse_anzeige_array.length; i++) {
                        this.teil = this.teile.find((teil) => (teil.nummer === this.inhouse_anzeige_array[i].nummer));
                        if (this.teil.istmenge !== undefined) {
                            this.inhouse_anzeige_array[i].bestand_vorperiode = this.teil.istmenge;
                        } else {
                            this.inhouse_anzeige_array[i].bestand_vorperiode = 0;
                        }
                        if (this.inhouse_anzeige_array[i].warteliste_subkomponente !== undefined
                            && this.inhouse_anzeige_array[i].warteliste_subkomponente !== null) {
                        } else {
                            this.inhouse_anzeige_array[i].warteliste_subkomponente = 0;
                        }
                        if (this.teil.warteliste_menge !== undefined && this.teil.warteliste_menge !== null) {
                            this.inhouse_anzeige_array[i].auftraege_in_warteliste = this.teil.warteliste_menge;
                        } else {
                            this.inhouse_anzeige_array[i].auftraege_in_warteliste = 0;
                        }
                        if (this.teil.inBearbeitung_menge !== undefined && this.teil.inBearbeitung_menge !== null) {
                            this.inhouse_anzeige_array[i].auftraege_in_bearbeitung = this.teil.inBearbeitung_menge;
                        } else {
                            this.inhouse_anzeige_array[i].auftraege_in_bearbeitung = 0;
                        }

                    this.inhouse_anzeige_array[i].produktionsauftraege = this.inhouse_anzeige_array[i].vertriebswunsch +
                        this.inhouse_anzeige_array[i].direktverkaufsmenge + this.inhouse_anzeige_array[i].warteliste_subkomponente
                        + this.inhouse_anzeige_array[i].sicherheitsbestand
                        - this.inhouse_anzeige_array[i].bestand_vorperiode - this.inhouse_anzeige_array[i].auftraege_in_warteliste
                        - this.inhouse_anzeige_array[i].auftraege_in_bearbeitung;

                    if (this.inhouse_anzeige_array[i].produktionsauftraege < 0) {
                        this.inhouse_anzeige_array[i].produktionsauftraege = 0;
                    }

                    const index51 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 51)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[i].nummer === 1) {
                        this.inhouse_anzeige_array[index51].vertriebswunsch = this.inhouse_anzeige_array[i].produktionsauftraege;
                        this.inhouse_anzeige_array[index51].warteliste_subkomponente = this.inhouse_anzeige_array[i].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index51].produktionsauftraege = this.inhouse_anzeige_array[index51].vertriebswunsch +
                            this.inhouse_anzeige_array[index51].direktverkaufsmenge + this.inhouse_anzeige_array[index51].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index51].sicherheitsbestand
                            - this.inhouse_anzeige_array[index51].bestand_vorperiode - this.inhouse_anzeige_array[index51].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index51].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index51].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index51].produktionsauftraege = 0;
                        }
                    }
                    const index26 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 26)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[i].nummer === 1 || this.inhouse_anzeige_array[i].nummer === 2
                        || this.inhouse_anzeige_array[i].nummer === 3) {
                        const index1 = this.inhouse_anzeige_array.findIndex((teili) => (teili.nummer === 1)
                            && (teili.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                        const index2 = this.inhouse_anzeige_array.findIndex((teili) => (teili.nummer === 2)
                            && (teili.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                        const index3 = this.inhouse_anzeige_array.findIndex((teili) => (teili.nummer === 3)
                            && (teili.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                        this.inhouse_anzeige_array[index26].vertriebswunsch = this.inhouse_anzeige_array[index1].produktionsauftraege
                            + this.inhouse_anzeige_array[index2].produktionsauftraege + this.inhouse_anzeige_array[index3].produktionsauftraege;
                        this.inhouse_anzeige_array[index26].warteliste_subkomponente = this.inhouse_anzeige_array[index1].auftraege_in_warteliste
                            + this.inhouse_anzeige_array[index2].auftraege_in_warteliste + this.inhouse_anzeige_array[index3].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index26].produktionsauftraege = this.inhouse_anzeige_array[index26].vertriebswunsch +
                            this.inhouse_anzeige_array[index26].direktverkaufsmenge + this.inhouse_anzeige_array[index26].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index26].sicherheitsbestand
                            - this.inhouse_anzeige_array[index26].bestand_vorperiode - this.inhouse_anzeige_array[index26].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index26].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index26].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index26].produktionsauftraege = 0;
                        }
                    }
                    const index56 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 56)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[i].nummer === 2) {
                        this.inhouse_anzeige_array[index56].vertriebswunsch = this.inhouse_anzeige_array[i].produktionsauftraege;
                        this.inhouse_anzeige_array[index56].warteliste_subkomponente = this.inhouse_anzeige_array[i].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index56].produktionsauftraege = this.inhouse_anzeige_array[index56].vertriebswunsch +
                            this.inhouse_anzeige_array[index56].direktverkaufsmenge + this.inhouse_anzeige_array[index56].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index56].sicherheitsbestand
                            - this.inhouse_anzeige_array[index56].bestand_vorperiode - this.inhouse_anzeige_array[index56].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index56].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index56].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index56].produktionsauftraege = 0;
                        }

                    }
                    const index31 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 31)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[i].nummer === 3) {
                        this.inhouse_anzeige_array[index31].vertriebswunsch = this.inhouse_anzeige_array[i].produktionsauftraege;
                        this.inhouse_anzeige_array[index31].warteliste_subkomponente = this.inhouse_anzeige_array[i].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index31].produktionsauftraege = this.inhouse_anzeige_array[index31].vertriebswunsch +
                            this.inhouse_anzeige_array[index31].direktverkaufsmenge + this.inhouse_anzeige_array[index31].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index31].sicherheitsbestand
                            - this.inhouse_anzeige_array[index31].bestand_vorperiode - this.inhouse_anzeige_array[index31].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index31].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index31].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index31].produktionsauftraege = 0;
                        }
                    }

                    const index16 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 16)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[index51].nummer === 51 || this.inhouse_anzeige_array[index56].nummer === 56
                        || this.inhouse_anzeige_array[index31].nummer === 31) {

                        this.inhouse_anzeige_array[index16].vertriebswunsch = this.inhouse_anzeige_array[index51].produktionsauftraege
                            + this.inhouse_anzeige_array[index56].produktionsauftraege + this.inhouse_anzeige_array[index31].produktionsauftraege;
                        this.inhouse_anzeige_array[index16].warteliste_subkomponente = this.inhouse_anzeige_array[index51].auftraege_in_warteliste
                            + this.inhouse_anzeige_array[index56].auftraege_in_warteliste + this.inhouse_anzeige_array[index31].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index16].produktionsauftraege = this.inhouse_anzeige_array[index16].vertriebswunsch +
                            this.inhouse_anzeige_array[index16].direktverkaufsmenge + this.inhouse_anzeige_array[index16].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index16].sicherheitsbestand
                            - this.inhouse_anzeige_array[index16].bestand_vorperiode - this.inhouse_anzeige_array[index16].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index16].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index16].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index16].produktionsauftraege = 0;
                        }

                    }
                    const index17 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 17)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[index51].nummer === 51 || this.inhouse_anzeige_array[index56].nummer === 56
                        || this.inhouse_anzeige_array[index31].nummer === 31) {

                        this.inhouse_anzeige_array[index17].vertriebswunsch = this.inhouse_anzeige_array[index51].produktionsauftraege
                            + this.inhouse_anzeige_array[index56].produktionsauftraege + this.inhouse_anzeige_array[index31].produktionsauftraege;
                        this.inhouse_anzeige_array[index17].warteliste_subkomponente = this.inhouse_anzeige_array[index51].auftraege_in_warteliste
                            + this.inhouse_anzeige_array[index56].auftraege_in_warteliste + this.inhouse_anzeige_array[index31].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index17].produktionsauftraege = this.inhouse_anzeige_array[index17].vertriebswunsch +
                            this.inhouse_anzeige_array[index17].direktverkaufsmenge + this.inhouse_anzeige_array[index17].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index17].sicherheitsbestand
                            - this.inhouse_anzeige_array[index17].bestand_vorperiode - this.inhouse_anzeige_array[index17].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index17].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index17].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index17].produktionsauftraege = 0;
                        }
                    }
                    const index50 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 50)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[index51].nummer === 51) {
                        this.inhouse_anzeige_array[index50].vertriebswunsch = this.inhouse_anzeige_array[index51].produktionsauftraege;
                        this.inhouse_anzeige_array[index50].warteliste_subkomponente = this.inhouse_anzeige_array[index51].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index50].produktionsauftraege = this.inhouse_anzeige_array[index50].vertriebswunsch +
                            this.inhouse_anzeige_array[index50].direktverkaufsmenge + this.inhouse_anzeige_array[index50].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index50].sicherheitsbestand
                            - this.inhouse_anzeige_array[index50].bestand_vorperiode - this.inhouse_anzeige_array[index50].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index50].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index50].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index50].produktionsauftraege = 0;
                        }
                    }
                    const index55 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 55)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[index56].nummer === 56) {
                        this.inhouse_anzeige_array[index55].vertriebswunsch = this.inhouse_anzeige_array[index56].produktionsauftraege;
                        this.inhouse_anzeige_array[index55].warteliste_subkomponente = this.inhouse_anzeige_array[index56].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index55].produktionsauftraege = this.inhouse_anzeige_array[index55].vertriebswunsch +
                            this.inhouse_anzeige_array[index55].direktverkaufsmenge + this.inhouse_anzeige_array[index55].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index55].sicherheitsbestand
                            - this.inhouse_anzeige_array[index55].bestand_vorperiode - this.inhouse_anzeige_array[index55].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index55].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index55].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index55].produktionsauftraege = 0;
                        }
                    }
                    const index30 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 30)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[index31].nummer === 31) {
                        this.inhouse_anzeige_array[index30].vertriebswunsch = this.inhouse_anzeige_array[index31].produktionsauftraege;
                        this.inhouse_anzeige_array[index30].warteliste_subkomponente = this.inhouse_anzeige_array[index31].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index30].produktionsauftraege = this.inhouse_anzeige_array[index30].vertriebswunsch +
                            this.inhouse_anzeige_array[index30].direktverkaufsmenge + this.inhouse_anzeige_array[index30].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index30].sicherheitsbestand
                            - this.inhouse_anzeige_array[index30].bestand_vorperiode - this.inhouse_anzeige_array[index30].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index30].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index30].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index30].produktionsauftraege = 0;
                        }
                    }

                    const index4 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 4)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[index50].nummer === 50) {
                        this.inhouse_anzeige_array[index4].vertriebswunsch = this.inhouse_anzeige_array[index50].produktionsauftraege;
                        this.inhouse_anzeige_array[index4].warteliste_subkomponente = this.inhouse_anzeige_array[index50].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index4].produktionsauftraege = this.inhouse_anzeige_array[index4].vertriebswunsch +
                            this.inhouse_anzeige_array[index4].direktverkaufsmenge + this.inhouse_anzeige_array[index4].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index4].sicherheitsbestand
                            - this.inhouse_anzeige_array[index4].bestand_vorperiode - this.inhouse_anzeige_array[index4].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index4].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index4].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index4].produktionsauftraege = 0;
                        }
                    }
                    const index10 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 10)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[index50].nummer === 50) {
                        this.inhouse_anzeige_array[index10].vertriebswunsch = this.inhouse_anzeige_array[index50].produktionsauftraege;
                        this.inhouse_anzeige_array[index10].warteliste_subkomponente = this.inhouse_anzeige_array[index50].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index10].produktionsauftraege = this.inhouse_anzeige_array[index10].vertriebswunsch +
                            this.inhouse_anzeige_array[index10].direktverkaufsmenge + this.inhouse_anzeige_array[index10].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index10].sicherheitsbestand
                            - this.inhouse_anzeige_array[index10].bestand_vorperiode - this.inhouse_anzeige_array[index10].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index10].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index10].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index10].produktionsauftraege = 0;
                        }
                    }
                    const index49 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 49)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[index50].nummer === 50) {
                        this.inhouse_anzeige_array[index49].vertriebswunsch = this.inhouse_anzeige_array[index50].produktionsauftraege;
                        this.inhouse_anzeige_array[index49].warteliste_subkomponente = this.inhouse_anzeige_array[index50].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index49].produktionsauftraege = this.inhouse_anzeige_array[index49].vertriebswunsch +
                            this.inhouse_anzeige_array[index49].direktverkaufsmenge + this.inhouse_anzeige_array[index49].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index49].sicherheitsbestand
                            - this.inhouse_anzeige_array[index49].bestand_vorperiode - this.inhouse_anzeige_array[index49].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index49].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index49].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index49].produktionsauftraege = 0;
                        }
                    }

                    const index5 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 5)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[index55].nummer === 55) {
                        this.inhouse_anzeige_array[index5].vertriebswunsch = this.inhouse_anzeige_array[index55].produktionsauftraege;
                        this.inhouse_anzeige_array[index5].warteliste_subkomponente = this.inhouse_anzeige_array[index55].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index5].produktionsauftraege = this.inhouse_anzeige_array[index5].vertriebswunsch +
                            this.inhouse_anzeige_array[index5].direktverkaufsmenge + this.inhouse_anzeige_array[index5].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index5].sicherheitsbestand
                            - this.inhouse_anzeige_array[index5].bestand_vorperiode - this.inhouse_anzeige_array[index5].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index5].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index5].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index5].produktionsauftraege = 0;
                        }
                    }
                    const index11 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 11)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[index55].nummer === 55) {
                        this.inhouse_anzeige_array[index11].vertriebswunsch = this.inhouse_anzeige_array[index55].produktionsauftraege;
                        this.inhouse_anzeige_array[index11].warteliste_subkomponente = this.inhouse_anzeige_array[index55].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index11].produktionsauftraege = this.inhouse_anzeige_array[index11].vertriebswunsch +
                            this.inhouse_anzeige_array[index11].direktverkaufsmenge + this.inhouse_anzeige_array[index11].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index11].sicherheitsbestand
                            - this.inhouse_anzeige_array[index11].bestand_vorperiode - this.inhouse_anzeige_array[index11].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index11].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index11].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index11].produktionsauftraege = 0;
                        }
                    }
                    const index54 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 54)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[index55].nummer === 55) {
                        this.inhouse_anzeige_array[index54].vertriebswunsch = this.inhouse_anzeige_array[index55].produktionsauftraege;
                        this.inhouse_anzeige_array[index54].warteliste_subkomponente = this.inhouse_anzeige_array[index55].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index54].produktionsauftraege = this.inhouse_anzeige_array[index54].vertriebswunsch +
                            this.inhouse_anzeige_array[index54].direktverkaufsmenge + this.inhouse_anzeige_array[index54].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index54].sicherheitsbestand
                            - this.inhouse_anzeige_array[index54].bestand_vorperiode - this.inhouse_anzeige_array[index54].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index54].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index54].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index54].produktionsauftraege = 0;
                        }
                    }
                    const index6 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 6)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[index30].nummer === 30) {
                        this.inhouse_anzeige_array[index6].vertriebswunsch = this.inhouse_anzeige_array[index30].produktionsauftraege;
                        this.inhouse_anzeige_array[index6].warteliste_subkomponente = this.inhouse_anzeige_array[index30].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index6].produktionsauftraege = this.inhouse_anzeige_array[index6].vertriebswunsch +
                            this.inhouse_anzeige_array[index6].direktverkaufsmenge + this.inhouse_anzeige_array[index6].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index6].sicherheitsbestand
                            - this.inhouse_anzeige_array[index6].bestand_vorperiode - this.inhouse_anzeige_array[index6].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index6].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index6].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index6].produktionsauftraege = 0;
                        }
                    }
                    const index12 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 12)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[index30].nummer === 30) {
                        this.inhouse_anzeige_array[index12].vertriebswunsch = this.inhouse_anzeige_array[index30].produktionsauftraege;
                        this.inhouse_anzeige_array[index12].warteliste_subkomponente = this.inhouse_anzeige_array[index30].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index12].produktionsauftraege = this.inhouse_anzeige_array[index12].vertriebswunsch +
                            this.inhouse_anzeige_array[index12].direktverkaufsmenge + this.inhouse_anzeige_array[index12].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index12].sicherheitsbestand
                            - this.inhouse_anzeige_array[index12].bestand_vorperiode - this.inhouse_anzeige_array[index12].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index12].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index12].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index12].produktionsauftraege = 0;
                        }

                    }
                    const index29 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 29)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[index30].nummer === 30) {
                        this.inhouse_anzeige_array[index29].vertriebswunsch = this.inhouse_anzeige_array[index30].produktionsauftraege;
                        this.inhouse_anzeige_array[index29].warteliste_subkomponente = this.inhouse_anzeige_array[i].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index29].produktionsauftraege = this.inhouse_anzeige_array[index29].vertriebswunsch +
                            this.inhouse_anzeige_array[index29].direktverkaufsmenge + this.inhouse_anzeige_array[index29].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index29].sicherheitsbestand
                            - this.inhouse_anzeige_array[index29].bestand_vorperiode - this.inhouse_anzeige_array[index29].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index29].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index29].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index29].produktionsauftraege = 0;
                        }
                    }

                    const index7 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 7)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[index49].nummer === 49) {
                        this.inhouse_anzeige_array[index7].vertriebswunsch = this.inhouse_anzeige_array[index49].produktionsauftraege;
                        this.inhouse_anzeige_array[index7].warteliste_subkomponente = this.inhouse_anzeige_array[index49].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index7].produktionsauftraege = this.inhouse_anzeige_array[index7].vertriebswunsch +
                            this.inhouse_anzeige_array[index7].direktverkaufsmenge + this.inhouse_anzeige_array[index7].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index7].sicherheitsbestand
                            - this.inhouse_anzeige_array[index7].bestand_vorperiode - this.inhouse_anzeige_array[index7].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index7].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index7].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index7].produktionsauftraege = 0;
                        }
                    }
                    const index13 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 13)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[index49].nummer === 49) {
                        this.inhouse_anzeige_array[index13].vertriebswunsch = this.inhouse_anzeige_array[index49].produktionsauftraege;
                        this.inhouse_anzeige_array[index13].warteliste_subkomponente = this.inhouse_anzeige_array[index49].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index13].produktionsauftraege = this.inhouse_anzeige_array[index13].vertriebswunsch +
                            this.inhouse_anzeige_array[index13].direktverkaufsmenge + this.inhouse_anzeige_array[index13].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index13].sicherheitsbestand
                            - this.inhouse_anzeige_array[index13].bestand_vorperiode - this.inhouse_anzeige_array[index13].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index13].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index13].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index13].produktionsauftraege = 0;
                        }

                    }
                    const index18 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 18)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[index49].nummer === 49) {
                        this.inhouse_anzeige_array[index18].vertriebswunsch = this.inhouse_anzeige_array[index49].produktionsauftraege;
                        this.inhouse_anzeige_array[index18].warteliste_subkomponente = this.inhouse_anzeige_array[index49].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index18].produktionsauftraege = this.inhouse_anzeige_array[index18].vertriebswunsch +
                            this.inhouse_anzeige_array[index18].direktverkaufsmenge + this.inhouse_anzeige_array[index18].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index18].sicherheitsbestand
                            - this.inhouse_anzeige_array[index18].bestand_vorperiode - this.inhouse_anzeige_array[index18].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index18].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index18].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index18].produktionsauftraege = 0;
                        }
                    }
                    const index8 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 8)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[index54].nummer === 54) {
                        this.inhouse_anzeige_array[index8].vertriebswunsch = this.inhouse_anzeige_array[index54].produktionsauftraege;
                        this.inhouse_anzeige_array[index8].warteliste_subkomponente = this.inhouse_anzeige_array[index54].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index8].produktionsauftraege = this.inhouse_anzeige_array[index8].vertriebswunsch +
                            this.inhouse_anzeige_array[index8].direktverkaufsmenge + this.inhouse_anzeige_array[index8].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index8].sicherheitsbestand
                            - this.inhouse_anzeige_array[index8].bestand_vorperiode - this.inhouse_anzeige_array[index8].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index8].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index8].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index8].produktionsauftraege = 0;
                        }
                    }
                    const index14 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 14)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[index54].nummer === 54) {
                        this.inhouse_anzeige_array[index14].vertriebswunsch = this.inhouse_anzeige_array[index54].produktionsauftraege;
                        this.inhouse_anzeige_array[index14].warteliste_subkomponente = this.inhouse_anzeige_array[index54].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index14].produktionsauftraege = this.inhouse_anzeige_array[index14].vertriebswunsch +
                            this.inhouse_anzeige_array[index14].direktverkaufsmenge + this.inhouse_anzeige_array[index14].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index14].sicherheitsbestand
                            - this.inhouse_anzeige_array[index14].bestand_vorperiode - this.inhouse_anzeige_array[index14].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index14].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index14].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index14].produktionsauftraege = 0;
                        }
                    }
                    const index19 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 19)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[index54].nummer === 54) {
                        this.inhouse_anzeige_array[index19].vertriebswunsch = this.inhouse_anzeige_array[index54].produktionsauftraege;
                        this.inhouse_anzeige_array[index19].warteliste_subkomponente = this.inhouse_anzeige_array[index54].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index19].produktionsauftraege = this.inhouse_anzeige_array[index19].vertriebswunsch +
                            this.inhouse_anzeige_array[index19].direktverkaufsmenge + this.inhouse_anzeige_array[index19].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index19].sicherheitsbestand
                            - this.inhouse_anzeige_array[index19].bestand_vorperiode - this.inhouse_anzeige_array[index19].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index19].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index19].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index19].produktionsauftraege = 0;
                        }
                    }
                    const index9 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 9)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[index29].nummer === 29) {
                        this.inhouse_anzeige_array[index9].vertriebswunsch = this.inhouse_anzeige_array[index29].produktionsauftraege;
                        this.inhouse_anzeige_array[index9].warteliste_subkomponente = this.inhouse_anzeige_array[index29].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index9].produktionsauftraege = this.inhouse_anzeige_array[index9].vertriebswunsch +
                            this.inhouse_anzeige_array[index9].direktverkaufsmenge + this.inhouse_anzeige_array[index9].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index9].sicherheitsbestand
                            - this.inhouse_anzeige_array[index9].bestand_vorperiode - this.inhouse_anzeige_array[index9].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index9].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index9].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index9].produktionsauftraege = 0;
                        }
                    }
                    const index15 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 15)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[index29].nummer === 29) {
                        this.inhouse_anzeige_array[index15].vertriebswunsch = this.inhouse_anzeige_array[index29].produktionsauftraege;
                        this.inhouse_anzeige_array[index15].warteliste_subkomponente = this.inhouse_anzeige_array[index29].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index15].produktionsauftraege = this.inhouse_anzeige_array[index15].vertriebswunsch +
                            this.inhouse_anzeige_array[index15].direktverkaufsmenge + this.inhouse_anzeige_array[index15].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index15].sicherheitsbestand
                            - this.inhouse_anzeige_array[index15].bestand_vorperiode - this.inhouse_anzeige_array[index15].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index15].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index15].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index15].produktionsauftraege = 0;
                        }
                    }
                    const index20 = this.inhouse_anzeige_array.findIndex((teil1) => (teil1.nummer === 20)
                        && (teil1.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)));
                    if (this.inhouse_anzeige_array[index29].nummer === 29) {
                        this.inhouse_anzeige_array[index20].vertriebswunsch = this.inhouse_anzeige_array[index29].produktionsauftraege;
                        this.inhouse_anzeige_array[index20].warteliste_subkomponente = this.inhouse_anzeige_array[index29].auftraege_in_warteliste;
                        this.inhouse_anzeige_array[index20].produktionsauftraege = this.inhouse_anzeige_array[index20].vertriebswunsch +
                            this.inhouse_anzeige_array[index20].direktverkaufsmenge + this.inhouse_anzeige_array[index20].warteliste_subkomponente
                            + this.inhouse_anzeige_array[index20].sicherheitsbestand
                            - this.inhouse_anzeige_array[index20].bestand_vorperiode - this.inhouse_anzeige_array[index20].auftraege_in_warteliste
                            - this.inhouse_anzeige_array[index20].auftraege_in_bearbeitung;
                        if (this.inhouse_anzeige_array[index20].produktionsauftraege < 0) {
                            this.inhouse_anzeige_array[index20].produktionsauftraege = 0;
                        }
                    }

                }

        }, (res: ResponseWrapper) => this.onError(res.json));

        });
    };

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    public save() {
        this.saveTeil();
        this.isSaving = true;
    };

    public saveTeil() {

        const criteria = [
            {key: 'teiltyp.in', value: 'PRODUKT'},
            {key: 'teiltyp.in', value: 'ERZEUGNIS'},
            {key: 'periode.equals', value: localStorage.getItem('aktuelleperiode')}
        ];

        this.teilService.query({
            size: 1000000,
            criteria
        })
            .subscribe((res: ResponseWrapper) => {
                this.teile = res.json;
                let i;
                for (i = 0; i < this.inhouse_anzeige_array.length; i++) {
                    this.teil = this.teile.find((teil) => (teil.nummer === this.inhouse_anzeige_array[i].nummer)
                        && teil.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10));
                    if (this.teil !== undefined) {
                        this.teil.gesamtproduktionsmenge = this.inhouse_anzeige_array[i].produktionsauftraege;
                        this.teil.vertriebswunsch = this.inhouse_anzeige_array[i].vertriebswunsch;
                        this.teil.sicherheitsbestand = this.inhouse_anzeige_array[i].sicherheitsbestand;
                        this.teilService.update(this.teil).subscribe((respond: Teil) =>
                            console.log(respond), () => this.onSaveError());
                    } else {
                        this.teil = new Teil(undefined, this.inhouse_anzeige_array[i].teiltyp, parseInt(localStorage.getItem('aktuelleperiode'), 10),
                            this.inhouse_anzeige_array[i].nummer, undefined, undefined, undefined, undefined,
                            undefined, this.inhouse_anzeige_array[i].sicherheitsbestand, this.inhouse_anzeige_array[i].vertriebswunsch,
                            this.inhouse_anzeige_array[i].produktionsauftraege, undefined, undefined,
                            undefined, undefined);
                        this.teilService.create(this.teil).subscribe((respond: Teil) =>
                            console.log(respond), () => this.onSaveError());
                    }
                }
            }, (respond: ResponseWrapper) => this.onError(respond.json));

    }

    private onSaveError() {
        this.isSaving = false;
    }

    previousState() {
        window.history.back();
    }

    berechneProduktionsauftraege() {

        for (let i = 0; i < this.inhouse_anzeige_array.length; i++) {
            this.inhouse_anzeige_array[i].produktionsauftraege = this.inhouse_anzeige_array[i].vertriebswunsch +
                this.inhouse_anzeige_array[i].direktverkaufsmenge + this.inhouse_anzeige_array[i].warteliste_subkomponente
                + this.inhouse_anzeige_array[i].sicherheitsbestand
                - this.inhouse_anzeige_array[i].bestand_vorperiode - this.inhouse_anzeige_array[i].auftraege_in_warteliste
                - this.inhouse_anzeige_array[i].auftraege_in_bearbeitung;
            if (this.inhouse_anzeige_array[i].produktionsauftraege < 0) {
                this.inhouse_anzeige_array[i].produktionsauftraege = 0;
            }
        }
    }

}
