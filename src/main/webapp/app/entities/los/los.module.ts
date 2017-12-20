import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AimySharedModule } from '../../shared';
import {
    LosService,
    LosPopupService,
    LosComponent,
    LosDetailComponent,
    LosDialogComponent,
    LosPopupComponent,
    LosDeletePopupComponent,
    LosDeleteDialogComponent,
    losRoute,
    losPopupRoute,
} from './';

const ENTITY_STATES = [
    ...losRoute,
    ...losPopupRoute,
];

@NgModule({
    imports: [
        AimySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LosComponent,
        LosDetailComponent,
        LosDialogComponent,
        LosDeleteDialogComponent,
        LosPopupComponent,
        LosDeletePopupComponent,
    ],
    entryComponents: [
        LosComponent,
        LosDialogComponent,
        LosPopupComponent,
        LosDeleteDialogComponent,
        LosDeletePopupComponent,
    ],
    providers: [
        LosService,
        LosPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AimyLosModule {}
