

import { Component, OnInit } from '@angular/core'; 
 //Referenz zu einem bereits offenem Fenster - um Instanzen zu übergeben, die in diesem Fenster befüllt werden 
//import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 
 
 
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
 
//import { ActivatedRoute, Router } from '@angular/router'; 
 //Wird benötigt, wenn Buttons angeklickt werden 
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster'; 
 
 //Um Berechtigungen Prüfen zu können 
//import { ITEMS_PER_PAGE, Principal, User, UserService, ResponseWrapper } from '../../shared'; 
 
 //import { KaufteileService } from './kaufteile.service'; 
 //import { userService } from './kaufteile.service'; 
 
@Component({ 
    selector: 'jhi-capacity_planning', 
     //Auswahlmenue in der Navigationsleiste 
    templateUrl: './capacity_planning.component.html', 
     //Fenstergröße --> hier: Standard 
     //styles: [] 
}) 
export class CapacityPlanningComponent implements OnInit { 
    //Variablen, die ich benötige hier definieren:  
    
     
    constructor() {} 
        private eventManager: JhiEventManager; 
 
    ngOnInit() { 
           
    } 
 
     
    //hier Funktionen einbauen:  

} 
