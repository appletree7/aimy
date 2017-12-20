import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AimySharedModule } from '../../shared';
import {
    TeilService,
    TeilPopupService,
    TeilComponent,
    TeilDetailComponent,
    TeilDialogComponent,
    TeilPopupComponent,
    TeilDeletePopupComponent,
    TeilDeleteDialogComponent,
    teilRoute,
    teilPopupRoute,
} from './';

const ENTITY_STATES = [
    ...teilRoute,
    ...teilPopupRoute,
];

@NgModule({
    imports: [
        AimySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TeilComponent,
        TeilDetailComponent,
        TeilDialogComponent,
        TeilDeleteDialogComponent,
        TeilPopupComponent,
        TeilDeletePopupComponent,
    ],
    entryComponents: [
        TeilComponent,
        TeilDialogComponent,
        TeilPopupComponent,
        TeilDeleteDialogComponent,
        TeilDeletePopupComponent,
    ],
    providers: [
        TeilService,
        TeilPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AimyTeilModule {}
