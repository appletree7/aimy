import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AimySharedModule } from '../../shared';
import {
    ModusService,
    ModusPopupService,
    ModusComponent,
    ModusDetailComponent,
    ModusDialogComponent,
    ModusPopupComponent,
    ModusDeletePopupComponent,
    ModusDeleteDialogComponent,
    modusRoute,
    modusPopupRoute,
} from './';

const ENTITY_STATES = [
    ...modusRoute,
    ...modusPopupRoute,
];

@NgModule({
    imports: [
        AimySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ModusComponent,
        ModusDetailComponent,
        ModusDialogComponent,
        ModusDeleteDialogComponent,
        ModusPopupComponent,
        ModusDeletePopupComponent,
    ],
    entryComponents: [
        ModusComponent,
        ModusDialogComponent,
        ModusPopupComponent,
        ModusDeleteDialogComponent,
        ModusDeletePopupComponent,
    ],
    providers: [
        ModusService,
        ModusPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AimyModusModule {}
