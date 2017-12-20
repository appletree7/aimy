import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AimySharedModule } from '../../shared';
import {
    BestellungService,
    BestellungPopupService,
    BestellungComponent,
    BestellungDetailComponent,
    BestellungDialogComponent,
    BestellungPopupComponent,
    BestellungDeletePopupComponent,
    BestellungDeleteDialogComponent,
    bestellungRoute,
    bestellungPopupRoute,
} from './';

const ENTITY_STATES = [
    ...bestellungRoute,
    ...bestellungPopupRoute,
];

@NgModule({
    imports: [
        AimySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BestellungComponent,
        BestellungDetailComponent,
        BestellungDialogComponent,
        BestellungDeleteDialogComponent,
        BestellungPopupComponent,
        BestellungDeletePopupComponent,
    ],
    entryComponents: [
        BestellungComponent,
        BestellungDialogComponent,
        BestellungPopupComponent,
        BestellungDeleteDialogComponent,
        BestellungDeletePopupComponent,
    ],
    providers: [
        BestellungService,
        BestellungPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AimyBestellungModule {}
