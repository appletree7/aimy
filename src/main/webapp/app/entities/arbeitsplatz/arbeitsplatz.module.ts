import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AimySharedModule } from '../../shared';
import {
    ArbeitsplatzService,
    ArbeitsplatzPopupService,
    ArbeitsplatzComponent,
    ArbeitsplatzDetailComponent,
    ArbeitsplatzDialogComponent,
    ArbeitsplatzPopupComponent,
    ArbeitsplatzDeletePopupComponent,
    ArbeitsplatzDeleteDialogComponent,
    arbeitsplatzRoute,
    arbeitsplatzPopupRoute,
    ArbeitsplatzResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...arbeitsplatzRoute,
    ...arbeitsplatzPopupRoute,
];

@NgModule({
    imports: [
        AimySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ArbeitsplatzComponent,
        ArbeitsplatzDetailComponent,
        ArbeitsplatzDialogComponent,
        ArbeitsplatzDeleteDialogComponent,
        ArbeitsplatzPopupComponent,
        ArbeitsplatzDeletePopupComponent,
    ],
    entryComponents: [
        ArbeitsplatzComponent,
        ArbeitsplatzDialogComponent,
        ArbeitsplatzPopupComponent,
        ArbeitsplatzDeleteDialogComponent,
        ArbeitsplatzDeletePopupComponent,
    ],
    providers: [
        ArbeitsplatzService,
        ArbeitsplatzPopupService,
        ArbeitsplatzResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AimyArbeitsplatzModule {}
