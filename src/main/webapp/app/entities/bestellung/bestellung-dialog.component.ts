import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Bestellung } from './bestellung.model';
import { BestellungPopupService } from './bestellung-popup.service';
import { BestellungService } from './bestellung.service';
import { Modus, ModusService } from '../modus';
import { Teil, TeilService } from '../teil';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-bestellung-dialog',
    templateUrl: './bestellung-dialog.component.html'
})
export class BestellungDialogComponent implements OnInit {

    bestellung: Bestellung;
    isSaving: boolean;

    moduses: Modus[];

    teils: Teil[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bestellungService: BestellungService,
        private modusService: ModusService,
        private teilService: TeilService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.modusService.query({
            size: 1000000
        })
            .subscribe((res: ResponseWrapper) => { this.moduses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        const criteria = [
            {key: 'teiltyp.in', value: 'KAUFTEIL'}
        ];
        this.teilService.query({
            size: 1000000,
            criteria
        })
            .subscribe((res: ResponseWrapper) => { this.teils = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bestellung.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bestellungService.update(this.bestellung));
        } else {
            this.subscribeToSaveResponse(
                this.bestellungService.create(this.bestellung));
        }
    }

    private subscribeToSaveResponse(result: Observable<Bestellung>) {
        result.subscribe((res: Bestellung) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Bestellung) {
        this.eventManager.broadcast({ name: 'bestellungListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackModusById(index: number, item: Modus) {
        return item.id;
    }

    trackTeilById(index: number, item: Teil) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-bestellung-popup',
    template: ''
})
export class BestellungPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bestellungPopupService: BestellungPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bestellungPopupService
                    .open(BestellungDialogComponent as Component, params['id']);
            } else {
                this.bestellungPopupService
                    .open(BestellungDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
