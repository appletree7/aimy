import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Modus } from './modus.model';
import { ModusPopupService } from './modus-popup.service';
import { ModusService } from './modus.service';
import { Bestellung, BestellungService } from '../bestellung';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-modus-dialog',
    templateUrl: './modus-dialog.component.html'
})
export class ModusDialogComponent implements OnInit {

    modus: Modus;
    isSaving: boolean;

    bestellungs: Bestellung[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private modusService: ModusService,
        private bestellungService: BestellungService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bestellungService.query()
            .subscribe((res: ResponseWrapper) => { this.bestellungs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.modus.id !== undefined) {
            this.subscribeToSaveResponse(
                this.modusService.update(this.modus));
        } else {
            this.subscribeToSaveResponse(
                this.modusService.create(this.modus));
        }
    }

    private subscribeToSaveResponse(result: Observable<Modus>) {
        result.subscribe((res: Modus) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Modus) {
        this.eventManager.broadcast({ name: 'modusListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBestellungById(index: number, item: Bestellung) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-modus-popup',
    template: ''
})
export class ModusPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private modusPopupService: ModusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modusPopupService
                    .open(ModusDialogComponent as Component, params['id']);
            } else {
                this.modusPopupService
                    .open(ModusDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
