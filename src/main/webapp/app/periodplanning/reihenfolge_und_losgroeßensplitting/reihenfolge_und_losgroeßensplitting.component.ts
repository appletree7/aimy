import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {TeilService} from '../../entities/teil';
import {Principal, ResponseWrapper} from '../../shared';
import {Teil} from '../../entities/teil';
import {Fertigungsauftrag, FertigungsauftragService} from '../../entities/fertigungsauftrag';

@Component({
    selector: 'jhi-reihenfolge-und-losgroesssensplitting',
    templateUrl: './reihenfolge_und_losgroeßensplitting.component.html',
    styles: []
})
export class ReihenfolgeUndLosgroeßensplittingComponent implements OnInit, OnDestroy {
    currentAccount: any;
    eventSubscriber: Subscription;
    teil: Teil;
    teils = [];
    fertigungsauftrag: Fertigungsauftrag;
    fertigungsauftraege = [];
    fertigungsauftraege2 = [];
    isSplitted: boolean;

    constructor(
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private teilService: TeilService,
        private fertigungsauftragService: FertigungsauftragService
    ) { }

    loadAll() {
        let criteria = [
            {key: 'periode.equals', value: localStorage.getItem('aktuelleperiode')}
        ];
        this.fertigungsauftragService.query({
            size: 1000000,
            criteria
        })
            .subscribe((res: ResponseWrapper) => {
                this.fertigungsauftraege = res.json;

                    if (this.fertigungsauftraege.length === 0) {
                    criteria = [
                        {key: 'teiltyp.in', value: 'PRODUKT'},
                        {key: 'teiltyp.in', value: 'ERZEUGNIS'},
                        {key: 'periode.equals', value: localStorage.getItem('aktuelleperiode')}
                    ];
                    this.teilService.query({
                        size: 1000000,
                        criteria
                    })
                        .subscribe((response: ResponseWrapper) => {
                            this.teils = response.json;
                            let i = 0;
                            for (const teil of this.teils) {
                                i = i + 1;
                                if (teil.gesamtproduktionsmenge > 0) {
                                    this.fertigungsauftrag = new Fertigungsauftrag(undefined, parseInt(localStorage.getItem('aktuelleperiode'), 10), i,
                                        parseInt(teil.gesamtproduktionsmenge, 10), undefined, undefined,
                                        undefined, undefined, undefined, undefined, undefined,
                                        undefined, undefined, undefined, teil);
                                    this.fertigungsauftraege.push(this.fertigungsauftrag);
                                }
                            }

                            for (const fertigungsauftrag of this.fertigungsauftraege) {
                                if (fertigungsauftrag.id !== undefined) {
                                    this.isSplitted = false;
                                } else {
                                    this.isSplitted = true;
                                }
                            }
                        }, (response: ResponseWrapper) => this.onError(response.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));

    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
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
                this.teils = res.json;
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.loadAll();
        this.registerChangeInFertigungsauftrags();
    }

    previousState() {
        window.history.back();
    }

    split() {

        for (const fertigungsauftrag of this.fertigungsauftraege) {
            this.fertigungsauftragService.delete(fertigungsauftrag.id).subscribe();
        }

        let criteria = [
            {key: 'periode.equals', value: localStorage.getItem('aktuelleperiode')}
        ];

        setTimeout(() => {

            this.fertigungsauftragService.query({
                size: 1000000,
                criteria
            })
                .subscribe((res: ResponseWrapper) => {
                    this.fertigungsauftraege = res.json;

                    if (this.fertigungsauftraege.length === 0) {
                        criteria = [
                            {key: 'teiltyp.in', value: 'PRODUKT'},
                            {key: 'teiltyp.in', value: 'ERZEUGNIS'},
                            {key: 'periode.equals', value: localStorage.getItem('aktuelleperiode')}
                        ];
                        this.teilService.query({
                            size: 1000000,
                            criteria
                        }).subscribe((response: ResponseWrapper) => {
                            this.teils = response.json;
                            let i = 0;
                            for (const teil of this.teils) {
                                i = i + 1;
                                if (teil.nummer === 17 || teil.nummer === 26 || teil.nummer === 4
                                    || teil.nummer === 5 || teil.nummer === 6 || teil.nummer === 7
                                    || teil.nummer === 8 || teil.nummer === 9) {
                                    const auftragsmenge = Math.round(teil.gesamtproduktionsmenge / 2);
                                    if (auftragsmenge > 0) {
                                        this.fertigungsauftrag = new Fertigungsauftrag(undefined, parseInt(localStorage.getItem('aktuelleperiode'), 10), i,
                                            parseInt(auftragsmenge.toFixed(2), 10), undefined, undefined,
                                            undefined, undefined, undefined, undefined,
                                            undefined, undefined, undefined, undefined, teil);
                                        this.fertigungsauftraege.push(this.fertigungsauftrag);
                                        this.fertigungsauftraege.push(this.fertigungsauftrag);
                                    }
                                } else if (teil.nummer === 10 || teil.nummer === 11 || teil.nummer === 12
                                    || teil.nummer === 13 || teil.nummer === 14 || teil.nummer === 15
                                    || teil.nummer === 18 || teil.nummer === 19 || teil.nummer === 20) {
                                    const auftragsmenge = Math.round(teil.gesamtproduktionsmenge / 3);
                                    if (auftragsmenge > 0) {
                                        this.fertigungsauftrag = new Fertigungsauftrag(undefined, parseInt(localStorage.getItem('aktuelleperiode'), 10), i,
                                            parseInt(auftragsmenge.toFixed(2), 10), undefined, undefined,
                                            undefined, undefined, undefined, undefined,
                                            undefined, undefined, undefined, undefined, teil);
                                        this.fertigungsauftraege.push(this.fertigungsauftrag);
                                        this.fertigungsauftraege.push(this.fertigungsauftrag);
                                        this.fertigungsauftraege.push(this.fertigungsauftrag);
                                    }
                                } else {
                                    const auftragsmenge = teil.gesamtproduktionsmenge;
                                    if (auftragsmenge > 0) {
                                        this.fertigungsauftrag = new Fertigungsauftrag(undefined, parseInt(localStorage.getItem('aktuelleperiode'), 10), i,
                                            auftragsmenge, undefined, undefined,
                                            undefined, undefined, undefined, undefined,
                                            undefined, undefined, undefined, undefined, teil);
                                        this.fertigungsauftraege.push(this.fertigungsauftrag);
                                    }
                                }
                            }

                            console.log(this.fertigungsauftraege);

                            for (const fertigungsauftrag of this.fertigungsauftraege) {
                                if (fertigungsauftrag.id !== undefined) {
                                    this.fertigungsauftragService.update(fertigungsauftrag).subscribe((respond: Fertigungsauftrag) =>
                                        console.log(respond), () => this.onSaveError());
                                } else {
                                    this.fertigungsauftragService.create(fertigungsauftrag).subscribe((respond: Fertigungsauftrag) =>
                                        console.log(respond), () => this.onSaveError());
                                }
                            }

                            // this.isSplitted = true;

                        }, (response: ResponseWrapper) => this.onError(response.json));

                    }
                }, (res: ResponseWrapper) => this.onError(res.json));

        }, 500);

        criteria = [
            {key: 'periode.equals', value: localStorage.getItem('aktuelleperiode')}
        ];

        this.fertigungsauftragService.query({
            size: 1000000,
            criteria
        })
            .subscribe((res: ResponseWrapper) => {
                this.fertigungsauftraege = res.json;
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    berechneBearbeitungszeitmin() {
        for (const fertigungsauftrag of this.fertigungsauftraege) {
            this.teil = this.teils.find((teil) => (teil.id === fertigungsauftrag.herstellteil.id));
            if (fertigungsauftrag.id !== undefined) {
                if ((this.teil.nummer >= 4) && (this.teil.nummer <= 9)) {
                    fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 4 + fertigungsauftrag.auftragsmenge * 3;
                } else if ((this.teil.nummer === 10) || (this.teil.nummer === 13)) {
                    fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 2 + fertigungsauftrag.auftragsmenge
                        + fertigungsauftrag.auftragsmenge * 3 + fertigungsauftrag.auftragsmenge * 3 + +fertigungsauftrag.auftragsmenge * 2;
                } else if ((this.teil.nummer === 11) || (this.teil.nummer === 12)
                    || (this.teil.nummer === 14) || (this.teil.nummer === 15)) {
                    fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 2 + fertigungsauftrag.auftragsmenge * 2
                        + fertigungsauftrag.auftragsmenge * 3 + fertigungsauftrag.auftragsmenge * 3 + +fertigungsauftrag.auftragsmenge * 2;
                } else if ((this.teil.nummer === 16)) {
                    fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 2 + fertigungsauftrag.auftragsmenge * 3;
                } else if ((this.teil.nummer === 17)) {
                    fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 3;
                } else if ((this.teil.nummer >= 18) && (this.teil.nummer <= 20)) {
                    fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 3 + fertigungsauftrag.auftragsmenge * 2
                        + fertigungsauftrag.auftragsmenge * 3 + fertigungsauftrag.auftragsmenge * 2;
                } else if ((this.teil.nummer === 26)) {
                    fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 2 + fertigungsauftrag.auftragsmenge * 3;
                } else if ((this.teil.nummer === 49) || (this.teil.nummer === 54)
                    || (this.teil.nummer === 29) || (this.teil.nummer === 56)
                    || (this.teil.nummer === 31) || (this.teil.nummer === 1)) {
                    fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 6
                } else if ((this.teil.nummer === 50) || (this.teil.nummer === 55)
                    || (this.teil.nummer === 30) || (this.teil.nummer === 51)) {
                    fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 5
                } else if ((this.teil.nummer === 2) || (this.teil.nummer === 3)) {
                    fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 7
                }
                this.fertigungsauftragService.update(fertigungsauftrag).subscribe((respond: Fertigungsauftrag) =>
                    console.log(respond), () => this.onSaveError());
            } else {
                if ((this.teil.nummer >= 4) && (this.teil.nummer <= 9)) {
                    fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 4 + fertigungsauftrag.auftragsmenge * 3;
                } else if ((this.teil.nummer === 10) || (this.teil.nummer === 13)) {
                    fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 2 + fertigungsauftrag.auftragsmenge
                        + fertigungsauftrag.auftragsmenge * 3 + fertigungsauftrag.auftragsmenge * 3 + +fertigungsauftrag.auftragsmenge * 2;
                } else if ((this.teil.nummer === 11) || (this.teil.nummer === 12)
                    || (this.teil.nummer === 14) || (this.teil.nummer === 15)) {
                    fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 2 + fertigungsauftrag.auftragsmenge * 2
                        + fertigungsauftrag.auftragsmenge * 3 + fertigungsauftrag.auftragsmenge * 3 + +fertigungsauftrag.auftragsmenge * 2;
                } else if ((this.teil.nummer === 16)) {
                    fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 2 + fertigungsauftrag.auftragsmenge * 3;
                } else if ((this.teil.nummer === 17)) {
                    fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 3;
                } else if ((this.teil.nummer >= 18) && (this.teil.nummer <= 20)) {
                    fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 3 + fertigungsauftrag.auftragsmenge * 2
                        + fertigungsauftrag.auftragsmenge * 3 + fertigungsauftrag.auftragsmenge * 2;
                } else if ((this.teil.nummer === 26)) {
                    fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 2 + fertigungsauftrag.auftragsmenge * 3;
                } else if ((this.teil.nummer === 49) || (this.teil.nummer === 54)
                    || (this.teil.nummer === 29) || (this.teil.nummer === 56)
                    || (this.teil.nummer === 31) || (this.teil.nummer === 1)) {
                    fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 6
                } else if ((this.teil.nummer === 50) || (this.teil.nummer === 55)
                    || (this.teil.nummer === 30) || (this.teil.nummer === 51)) {
                    fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 5
                } else if ((this.teil.nummer === 2) || (this.teil.nummer === 3)) {
                    fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 7
                }
            this.fertigungsauftragService.create(fertigungsauftrag).subscribe((respond: Fertigungsauftrag) =>
                console.log(respond), () => this.onSaveError());
        }
        }
    }

    sortLOZ() {
            this.fertigungsauftraege.sort((a, b) => a.bearbeitungszeitmin - b.bearbeitungszeitmin);
            this.fertigungsauftraege.reverse();
            let i = 1;
            for (const fertigungsauftrag1 of this.fertigungsauftraege) {
                fertigungsauftrag1.nummer = i;
                this.fertigungsauftragService.update(fertigungsauftrag1).subscribe((respond: Fertigungsauftrag) =>
                    console.log(respond), () => this.onSaveError());
                i = i + 1;
            }
    }

    sortKOZ() {
            this.fertigungsauftraege.sort((a, b) => a.bearbeitungszeitmin - b.bearbeitungszeitmin);
            let i = 1;
            for (const fertigungsauftrag1 of this.fertigungsauftraege) {
                fertigungsauftrag1.nummer = i;
                this.fertigungsauftragService.update(fertigungsauftrag1).subscribe((respond: Fertigungsauftrag) =>
                    console.log(respond), () => this.onSaveError());
                i = i + 1;
            }
    }

    registerChangeInFertigungsauftrags() {
        this.eventSubscriber = this.eventManager.subscribe('fertigungsauftragListModification', () => this.loadAll());
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    private onSaveError() {
        console.log('Fehler beim Speichern der Daten')
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
