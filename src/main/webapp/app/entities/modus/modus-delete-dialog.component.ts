import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Modus } from './modus.model';
import { ModusPopupService } from './modus-popup.service';
import { ModusService } from './modus.service';

@Component({
    selector: 'jhi-modus-delete-dialog',
    templateUrl: './modus-delete-dialog.component.html'
})
export class ModusDeleteDialogComponent {

    modus: Modus;

    constructor(
        private modusService: ModusService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.modusService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'modusListModification',
                content: 'Deleted an modus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-modus-delete-popup',
    template: ''
})
export class ModusDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private modusPopupService: ModusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modusPopupService
                .open(ModusDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
