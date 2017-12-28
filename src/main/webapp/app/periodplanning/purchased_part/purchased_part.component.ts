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
    selector: 'jhi-purchased_part', 
     //Auswahlmenue in der Navigationsleiste 
    templateUrl: './purchased_part.component.html', 
     //Fenstergröße --> hier: Standard 
     //styles: [] 
}) 
export class PurchasedPartComponent implements OnInit { 
    //Variablen, die ich benötige hier definieren:  
    private kaufteilid;  
    private bestand; 
    private max_lieferdauer; 
    private diskontmenge; 
    private bestellmenge; 
    private bestellart; 
    
     
    constructor() {} 
        private eventManager: JhiEventManager; 
 
    ngOnInit() { 
           
    } 
 
     
    //hier Funktionen einbauen:  
     
    Zuordnen_der_Felder() {} //oder kann man das oben machen?? 
     
         
   
     
     
    Produktionsprogramm_der_nächsten_drei_Perioden(){} 
     
     
    bruttobedarf_berechnen() { 
         
        //Matrixmuliplikation 
    } 
     
     
    Bestellmenge_ermitteln() { 
         
        //komplex!! 
         
    } 
     
         
         
         
         
         
         
} 


