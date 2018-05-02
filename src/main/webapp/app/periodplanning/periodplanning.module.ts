import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AimySharedModule } from '../shared';

import { periodplanningState } from './periodplanning.route';
import { PurchasedPartComponent } from './purchased_part/purchased_part.component';
import { InHouseProductionComponent } from './in-house_production/in-house_production.component';
import { CapacityPlanningComponent } from './capacity_planning/capacity_planning.component';
import { PeriodStartComponent } from './period_start/period_start.component';
import { DirektverkaufUndNormalverkaufComponent } from './direktverkauf_und_normalverkauf/direktverkauf_und_normalverkauf.component';
import {AbschlussComponent} from './abschluss/abschluss.component';
import { ReihenfolgeUndLosgroeßensplittingComponent } from './reihenfolge_und_losgroeßensplitting/reihenfolge_und_losgroeßensplitting.component';

/*
import {
    periodplanningState,
    PurchasedPartComponent
    //KaufteileService
 } from './';
*/

@NgModule({
    imports: [
        AimySharedModule,
        RouterModule.forRoot(periodplanningState, { useHash: true }),
    ],
    declarations: [
 // Auflistung der Klassen die gebraucht werden
        PurchasedPartComponent,
        InHouseProductionComponent,
        CapacityPlanningComponent,
        PeriodStartComponent,
        DirektverkaufUndNormalverkaufComponent,
        AbschlussComponent,
        ReihenfolgeUndLosgroeßensplittingComponent
        // KaufteileService
    ],
    entryComponents: [
        // Auflisten der Klasse, die als erstes gezeigt werden soll, wenn Sie aufgerufen wird und den Pfad durchläuft.
        PurchasedPartComponent,
        InHouseProductionComponent,
        CapacityPlanningComponent,
        PeriodStartComponent,
        DirektverkaufUndNormalverkaufComponent,
        AbschlussComponent,
        ReihenfolgeUndLosgroeßensplittingComponent
    ],
    providers: [
        // unterstützende Services auflisten.
    ],
    // eigenes SChema für die Seite.
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AimyPeriodPlanningModule {}
