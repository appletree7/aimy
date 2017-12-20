import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Kennzahlen } from './kennzahlen.model';
import { KennzahlenPopupService } from './kennzahlen-popup.service';
import { KennzahlenService } from './kennzahlen.service';

@Component({
    selector: 'jhi-kennzahlen-delete-dialog',
    templateUrl: './kennzahlen-delete-dialog.component.html'
})
export class KennzahlenDeleteDialogComponent {

    kennzahlen: Kennzahlen;

    constructor(
        private kennzahlenService: KennzahlenService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.kennzahlenService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'kennzahlenListModification',
                content: 'Deleted an kennzahlen'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-kennzahlen-delete-popup',
    template: ''
})
export class KennzahlenDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private kennzahlenPopupService: KennzahlenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.kennzahlenPopupService
                .open(KennzahlenDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
