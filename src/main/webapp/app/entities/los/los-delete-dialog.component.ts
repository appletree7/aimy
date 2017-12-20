import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Los } from './los.model';
import { LosPopupService } from './los-popup.service';
import { LosService } from './los.service';

@Component({
    selector: 'jhi-los-delete-dialog',
    templateUrl: './los-delete-dialog.component.html'
})
export class LosDeleteDialogComponent {

    los: Los;

    constructor(
        private losService: LosService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.losService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'losListModification',
                content: 'Deleted an los'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-los-delete-popup',
    template: ''
})
export class LosDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private losPopupService: LosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.losPopupService
                .open(LosDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
