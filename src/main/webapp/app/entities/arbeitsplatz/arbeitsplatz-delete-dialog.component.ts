import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Arbeitsplatz } from './arbeitsplatz.model';
import { ArbeitsplatzPopupService } from './arbeitsplatz-popup.service';
import { ArbeitsplatzService } from './arbeitsplatz.service';

@Component({
    selector: 'jhi-arbeitsplatz-delete-dialog',
    templateUrl: './arbeitsplatz-delete-dialog.component.html'
})
export class ArbeitsplatzDeleteDialogComponent {

    arbeitsplatz: Arbeitsplatz;

    constructor(
        private arbeitsplatzService: ArbeitsplatzService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.arbeitsplatzService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'arbeitsplatzListModification',
                content: 'Deleted an arbeitsplatz'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-arbeitsplatz-delete-popup',
    template: ''
})
export class ArbeitsplatzDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private arbeitsplatzPopupService: ArbeitsplatzPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.arbeitsplatzPopupService
                .open(ArbeitsplatzDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
