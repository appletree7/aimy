import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AimySharedModule } from '../../shared';
import {
    FertigungsauftragService,
    FertigungsauftragPopupService,
    FertigungsauftragComponent,
    FertigungsauftragDetailComponent,
    FertigungsauftragDialogComponent,
    FertigungsauftragPopupComponent,
    FertigungsauftragDeletePopupComponent,
    FertigungsauftragDeleteDialogComponent,
    fertigungsauftragRoute,
    fertigungsauftragPopupRoute,
    FertigungsauftragResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...fertigungsauftragRoute,
    ...fertigungsauftragPopupRoute,
];

@NgModule({
    imports: [
        AimySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FertigungsauftragComponent,
        FertigungsauftragDetailComponent,
        FertigungsauftragDialogComponent,
        FertigungsauftragDeleteDialogComponent,
        FertigungsauftragPopupComponent,
        FertigungsauftragDeletePopupComponent,
    ],
    entryComponents: [
        FertigungsauftragComponent,
        FertigungsauftragDialogComponent,
        FertigungsauftragPopupComponent,
        FertigungsauftragDeleteDialogComponent,
        FertigungsauftragDeletePopupComponent,
    ],
    providers: [
        FertigungsauftragService,
        FertigungsauftragPopupService,
        FertigungsauftragResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AimyFertigungsauftragModule {}
