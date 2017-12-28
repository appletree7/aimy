import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 
import { RouterModule } from '@angular/router'; 

import { AimySharedModule } from '../shared'; 


import { periodplanningState  } from './periodplanning.route'; 
import { PurchasedPartComponent } from './purchased_part/purchased_part.component'; 

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
 //Auflistung der Klassen di egebraucht werden  
        PurchasedPartComponent, 
        //KaufteileService 
    ], 
    entryComponents: [ 
        //Auflisten der Klasse, die als erstes gezeigt werden soll, wenn Sie aufgerufen wird und den Pfad durchläuft. 
        PurchasedPartComponent 
    ], 
    providers: [ 
        //unterstützende Services auflisten. 
    ], 
    //eigenes SChema für die Seite. 
    schemas: [CUSTOM_ELEMENTS_SCHEMA] 
}) 
 
export class AimyPeriodPlanningModule {} 
