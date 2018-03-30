 //Referenz zu einem bereits offenem Fenster - um Instanzen zu übergeben, die in diesem Fenster befüllt werden 
//import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Response } from '@angular/http'; 
 
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
 
//import { ActivatedRoute, Router } from '@angular/router'; 
 //Wird benötigt, wenn Buttons angeklickt werden 
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster'; 

import { Teil } from '../../entities/teil/teil.model';
import { TeilService } from '../../entities/teil/teil.service';
import { Arbeitsplatz, ArbeitsplatzService } from '../../entities/arbeitsplatz'; 
 //Um Berechtigungen Prüfen zu können 
//import { ITEMS_PER_PAGE, Principal, User, UserService, ResponseWrapper } from '../../shared'; 
 
 //import { KaufteileService } from './kaufteile.service'; 
 //import { userService } from './kaufteile.service';

import { ITEMS_PER_PAGE, Principal, User, UserService, ResponseWrapper } from '../../shared';  
 
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
    teils: Teil[]; 
    account: any;
    arbeitsplatzs: Arbeitsplatz[];  
    currentAccount: any;
    eventSubscriber: Subscription;
    
    alle_kaufteile: Teil[];
    lieferdauer_max_array: any; 
    diskontmenge_array: any;
    verwendung_array : any; 
    gesamtes_array: any; 
    anfangsbestand_vorperiode: any; 
    //produktionsprogramm_naechste_periode: Number []; 
    //this.angangsbestand_vorperiode: any; 
    
    constructor(
        private eventManager: JhiEventManager, 
        private teilService: TeilService,
        private jhiAlertService: JhiAlertService,
        private principal: Principal
    ) {} 
        
 
    ngOnInit() { 
        this.principal.identity().then((account) => {
            this.account = account;
        }); 
        
     this.teilService.query()
            .subscribe((res3: ResponseWrapper) => { 
                
                this.teils = res3.json;
                let produktionsprogramm = new Array; 
                let anfangsbestand_vorperiode = new Array;
                
                
                this.alle_kaufteile = this.teils.filter( function(teil){
                        
                    var teiltypen = teil.teiltyp.toString();
                    console.log("Teiltyp: "+teiltypen); 


                    if (teil.nummer == "1" || teil.nummer == "2" || teil.nummer == "3" ){
                        console.log("Teil :"+ teil.nummer ); 
                        produktionsprogramm.push("Vertriebswunsch: "+teil.vertriebswunsch);     
                        console.log(produktionsprogramm.toString()); 

                    };

                    if (teiltypen == 'KAUFTEIL') {  
                        anfangsbestand_vorperiode.push(teil.istmenge);
                        console.log("Bestand Vorperiode: " + anfangsbestand_vorperiode.toString()); 

                        return (teil);  
                    }; 

                });
                
                

                
                //Beispielhaft für Kaufteile 21,22,23:        
                this.lieferdauer_max_array = [2.2, 2.1, 1.4]; //
                this.diskontmenge_array = [300,300,300]; 
                this.verwendung_array = [[1,0,0],[0,1,0],[0,0,1]]; 
                //
                //                                
                //this.produktionsprogramm_periode_1 = [teil.vertriebswunsch für Teil 1,teil.vertriebswunsch für Teil 2, teil.vertriebswunsch für Teil3 ];     
                
                
                
                //falls Produktionsprogramm nächste Periode < Anfangsbestand, dann bestellen: 
                // Was hier noch alles rein muss: this.anfangsbestand_vorperiode + produktionsprogramm
                this.gesamtes_array = this.bruttobedarf_berechnen(this.alle_kaufteile, this.lieferdauer_max_array, this.diskontmenge_array, this.verwendung_array, anfangsbestand_vorperiode, produktionsprogramm);
                
                
                
                // Alle Teile, die den Teiltyp "Kaufteil" besitzen, werden ausgegeben:       
                res3.json = this.alle_kaufteile; 
                //console.log(this.alle_kaufteile);
                

                
                
                
                
                
                },(res3: ResponseWrapper) => this.onError(res3.json));   
        
        
              
    } 
    
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    };
 
     
    //hier Funktionen einbauen:  
     
    Zuordnen_der_Felder() {} //oder kann man das oben machen?? 
     
         
   
     
     
    Produktionsprogramm_der_nächsten_drei_Perioden(){} 
     

    public bruttobedarf_berechnen(alle_kaufteile: Teil[], lieferdauer_max_array: Number[], diskontmenge_array: Number[], verwendung_array:Number[], anfangsbestand_vorperiode: Number[], produktionsprogramm: Number[]) { 
        
        console.log("Funktion: bruttobedarf_berechnen wird aufgerufen ");

        var gesamtes_array = new Array(); 
        alle_kaufteile.forEach(function(kaufteil){
            lieferdauer_max_array.forEach(function(ld){
                verwendung_array.forEach(function(verwendung){
                    diskontmenge_array.forEach(function(diskontmenge){
                        anfangsbestand_vorperiode.forEach(function(anfangsbestand_vorperiode){
                            for(let i= 0; i < alle_kaufteile.length; i++ ){
                                gesamtes_array[i] = [kaufteil, ld, verwendung, diskontmenge, anfangsbestand_vorperiode];
                            } 
                            console.log("Funktion Gesamt-Array_pro_Schleife: "+ gesamtes_array.toString());
                        });
                    });   
                });         
            });         
        });
     
        console.log("Gesamtes Array: "+ gesamtes_array.toString());
        
        return gesamtes_array; 
        
        
    }; 
     
     
    Bestellmenge_ermitteln() { 
         
        //komplex!! 
         
    }       
}
