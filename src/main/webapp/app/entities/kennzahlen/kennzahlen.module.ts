import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AimySharedModule } from '../../shared';
import {
    KennzahlenService,
    KennzahlenPopupService,
    KennzahlenComponent,
    KennzahlenDetailComponent,
    KennzahlenDialogComponent,
    KennzahlenPopupComponent,
    KennzahlenDeletePopupComponent,
    KennzahlenDeleteDialogComponent,
    kennzahlenRoute,
    kennzahlenPopupRoute,
    KennzahlenResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...kennzahlenRoute,
    ...kennzahlenPopupRoute,
];

@NgModule({
    imports: [
        AimySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        KennzahlenComponent,
        KennzahlenDetailComponent,
        KennzahlenDialogComponent,
        KennzahlenDeleteDialogComponent,
        KennzahlenPopupComponent,
        KennzahlenDeletePopupComponent,
    ],
    entryComponents: [
        KennzahlenComponent,
        KennzahlenDialogComponent,
        KennzahlenPopupComponent,
        KennzahlenDeleteDialogComponent,
        KennzahlenDeletePopupComponent,
    ],
    providers: [
        KennzahlenService,
        KennzahlenPopupService,
        KennzahlenResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AimyKennzahlenModule {}
