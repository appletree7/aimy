//Referenz zu einem bereits offenem Fenster - um Instanzen zu übergeben, die in diesem Fenster befüllt werden 
//import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Response } from '@angular/http'; 
import { PurchasedPart } from '../../entities/anzeige/purchased_part.model';
 
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
 
//import { ActivatedRoute, Router } from '@angular/router'; 
 //Wird benötigt, wenn Buttons angeklickt werden 
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster'; 
 
import { Teil, Teiltyp } from '../../entities/teil/teil.model';
import { Bestellung, Bestellstatus } from '../../entities/bestellung/bestellung.model';
import { TeilService } from '../../entities/teil/teil.service';
import { BestellungService } from '../../entities/bestellung/bestellung.service';
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
    
    bestellungen: Bestellung[]; 
    bestellung: Bestellung; 
    isSaving: boolean;
    kaufteil: Teil; 
    teiltyp: Teiltyp.KAUFTEIL; 
    
     kaufteil_mit_purchased_part: Teil; 
    
 
    //produktionsprogramm_naechste_periode: Number []; 
    //this.angangsbestand_vorperiode: any; 
    
    constructor(
        private eventManager: JhiEventManager, 
        private teilService: TeilService,
        private bestellungService: BestellungService,
        private jhiAlertService: JhiAlertService,    
        private principal: Principal
    ) {} 
        
 
    ngOnInit() { 
        this.principal.identity().then((account) => {
            this.account = account;
        }); 
        this.isSaving = false;
     
           
            this.teilService.query({
                   size: 1000000,
            })
            .subscribe((res3: ResponseWrapper) => { 
                
                this.teils = res3.json;
                let produktionsprogramm = new Array; 
                let anfangsbestand_vorperiode = new Array;
                
                
                this.alle_kaufteile = this.teils.filter( function(teil){
                        
                    var teiltypen = teil.teiltyp.toString();
                    console.log("Teiltyp: "+teiltypen); 
 
 
                    if (teil.nummer == 1 || teil.nummer == 2 || teil.nummer == 3 ){
                        console.log("Teil :"+ teil.nummer );                         
                        if(teil.vertriebswunsch == undefined){
                           //UNBEDINGT AUF 0 ÄNDERN!!!!! 
                           teil.vertriebswunsch = 100; 
                           console.log("VT_WUNSCH :"+ teil.vertriebswunsch);
                        }  
                        
                        produktionsprogramm.push(teil.vertriebswunsch);  
                        console.log(produktionsprogramm.toString()); 
 
                    };    
 
                    if (teiltypen == 'KAUFTEIL') {  
                        anfangsbestand_vorperiode.push(teil.istmenge);
                        console.log("Bestand Vorperiode: " + anfangsbestand_vorperiode.toString()); 
 
                        return (teil);  
                    }; 
 
                });
                
                
 
                
                //Beispielhaft für Kaufteile 21,22,23:        
                this.lieferdauer_max_array = [2.2, 2.1, 1.4, 3.5, 1.1, 1.1, 2.1, 2.6, 2.4, 1.9, 2.6, 1.3, 1.8, 2.1, 1.8, 1.9, 1.1, 1.5, 2.5, 1.2, 2.0, 1.2, 1.2, 1.2, 2.0, 1.8, 2.0, 2.1, 0.9]
                this.diskontmenge_array = [300,300,300,6100,3600, 1800,4500,2700,900,2200,3600,900,900,300,1800,900,900,1800,2700,900,900,900,900,1800,600,22000,600,22000,1800]
                this.verwendung_array = [[1,0,0],[0,1,0],[0,0,1],[7,7,7],[4,4,4],[2,2,2],[4,5,6],[3,3,3],[0,0,2],[0,0,72],[4,4,4],[1,1,1],[1,1,1],[1,1,1],[2,2,2],[1,1,1],[1,1,1],[2,2,2],[1,1,1],[3,3,3],[1,1,1],[1,1,1],[1,1,1],[2,2,2],[2,0,0],[72,0,0],[0,2,0],[0,72,0],[2,2,2]]                                  
                //
                //                                
                //this.produktionsprogramm_periode_1 = [teil.vertriebswunsch für Teil 1,teil.vertriebswunsch für Teil 2, teil.vertriebswunsch für Teil3 ];     
                
                
                
                //falls Produktionsprogramm nächste Periode < Anfangsbestand, dann bestellen: 
                // Was hier noch alles rein muss: this.anfangsbestand_vorperiode + produktionsprogramm
                this.gesamtes_array = this.bruttobedarf_berechnen(this.alle_kaufteile, this.lieferdauer_max_array, this.diskontmenge_array, this.verwendung_array, produktionsprogramm);
                
                                // Alle Teile, die den Teiltyp "Kaufteil" besitzen, werden ausgegeben:       
                res3.json = this.alle_kaufteile; 
                //console.log(this.alle_kaufteile);
                
 
                
                
                
                
                
                },(res3: ResponseWrapper) => this.onError(res3.json));   
        
        
              
    } 
    
    
    changeListener($event): void {
        $event = this.isSaving = true;
        this.save(this.gesamtes_array);
    }
    
    
    
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    };

    
    public bruttobedarf_berechnen(alle_kaufteile: Teil[], lieferdauer_max_array: any, diskontmenge_array: any, verwendung_array:Number[], produktionsprogramm: any) { 
        
 
        
        console.log("Funktion: bruttobedarf_berechnen wird aufgerufen ");
 
        let purchasedpart_anzeige_array = new Array(); 
        let durchlauf = 1;
        let bruttobedarf = 0; 
        
        alle_kaufteile.sort( function (a,b){
            if (a.nummer > b.nummer) {
                return 1;
            }
            if (a.nummer < b.nummer) {
             return -1;
            }
            // a muss gleich b sein
            return 0;         
        });
          
   
        alle_kaufteile.forEach(function(kaufteil){
            
            console.log("Teil: "+kaufteil.nummer);
            let purchasedpart = new PurchasedPart;
            purchasedpart.nummer = kaufteil.nummer.toString();
            purchasedpart.bestand = kaufteil.istmenge;
            purchasedpart.bruttobedarf = 0; 
            purchasedpart.periode = parseInt(localStorage.getItem('aktuelleperiode'), 10);
 
            for (let i = 0; i < durchlauf ; i++){
                lieferdauer_max_array[i]; 
                console.log("lieferdauer_max_array[i]: "+lieferdauer_max_array[i]);
                purchasedpart.lieferdauer = lieferdauer_max_array[i];
                lieferdauer_max_array.shift(); 
                
                diskontmenge_array[i]; 
                console.log("diskontmenge_array[i]: "+ diskontmenge_array[i]);  
                purchasedpart.diskontmenge = diskontmenge_array[i];
                diskontmenge_array.shift();  
                                        
                        
                        
                        for (let j = 0; j < 3; j++){
                            console.log("verwendung_array[i][j]: "+ verwendung_array[i][j]);
                            //console.log("Forschleife wird durchlaufen Runde: "+ produkt_produktionsprogramm );
                            //console.log("i: "+i+" j "+j+"  Produktionsprogramm-nr: "+produkt_produktionsprogramm); 
                            //console.log("verwendung_array[i][j]: "+ verwendung_array[i][j] + " Produkt_produktionsprogramm" + produktionsprogramm[produkt_produktionsprogramm] );
                            //console.log(" bruttobedarf - davor - sollte 0 sein "+x);
                            bruttobedarf = verwendung_array[i][j] * produktionsprogramm[j]; //produkt_produktionsprogramm]; 
                            purchasedpart.bruttobedarf = purchasedpart.bruttobedarf + bruttobedarf;
                            
                            console.log("!!!!!!!!!! bruttobedarf_pro Runde - berechnung "+ verwendung_array[i][j] + "*" + produktionsprogramm[j]);//produkt_produktionsprogramm]);
                            console.log("!!!!!!!!!! bruttobedarf_pro Runde "+ bruttobedarf);
                            
                         }
                        console.log("!!!!!!!!!!:) bruttobedarf_pro TEIL "+ purchasedpart.bruttobedarf);       
                    //}  
                                             
                
                verwendung_array.shift();
                 
 
                    console.log("purchasedpart.bestand: " + purchasedpart.bestand + " purchasedpart.lieferdauer "+purchasedpart.lieferdauer +" purchasedpart.bruttobedarf "+purchasedpart.bruttobedarf)
                    
                    let puffer = purchasedpart.bruttobedarf*1.6;
                    console.log("Puffer: "+puffer)
      
                    if (purchasedpart.bestand*purchasedpart.lieferdauer > puffer){
                        purchasedpart.bestellung = 0; 
                        purchasedpart.art= "-"; 
                    }
                    
                    if (purchasedpart.bestand - (purchasedpart.lieferdauer* purchasedpart.bruttobedarf) < 0){
                        purchasedpart.bestellung = purchasedpart.bruttobedarf; 
                        purchasedpart.art= "N"; 
                    }else {
                        purchasedpart.bestellung = 0; 
                        purchasedpart.art= "-"; 
                    }
                    
                    /*
                    if( purchasedpart.bestand*purchasedpart.lieferdauer > purchasedpart.bruttobedarf && purchasedpart.bestand*purchasedpart.lieferdauer < puffer) {
                        purchasedpart.bestellung = purchasedpart.bruttobedarf; 
                        //purchasedpart.bestellung = Math.ceil(purchasedpart.bruttobedarf); 
                        purchasedpart.art= "N"; 
                    }
                    */

                    if( purchasedpart.bestand < purchasedpart.bruttobedarf) {
                        purchasedpart.bestellung = Math.ceil(purchasedpart.bruttobedarf* Math.round(purchasedpart.lieferdauer)); 
                        purchasedpart.art= "F"; 
                    }
                    if( purchasedpart.bestand*purchasedpart.lieferdauer < purchasedpart.bruttobedarf) {
                        purchasedpart.bestellung = Math.ceil((purchasedpart.bruttobedarf*1.3)); 
                        purchasedpart.art= "F"; 
                    }    
            
            } 
            purchasedpart_anzeige_array.push(purchasedpart); 
            //durchlauf = durchlauf+1;         
        });
     
        console.log("Gesamtes Array: "+ purchasedpart_anzeige_array.toString());
        
        return purchasedpart_anzeige_array; 
        
        
    }; 
    
    
    
    public save(gesamtes_array: any) { 
        
        console.log("save() wird aufgerufen ");
        
        //Anpassen der aktuellen Teile 
        //this.saveTeil(); 
        //Neue_Bestellungen_anlegen 
        this.saveBestellung(gesamtes_array); 
        
        this.isSaving = true;
        //this.message = 'Speicherung der Daten erfolgreich'; 
         
    };   
     
    
    
    
    
    
    
    public saveBestellung(gesamtes_array: any){ 
        
        console.log("saveBestellung()wird aufgerufen ");
        
        this.bestellungService.query({
            size: 1000000,
        })
            .subscribe((res: ResponseWrapper) => {
                this.bestellungen = res.json;
                
                
                
                this.teilService.query({
                   size: 1000000,
                })
                   .subscribe((res: ResponseWrapper) => {
                    this.teils = res.json;
                    
                    let j = 0; 
                
                    
                    for(let i = 0; i < this.gesamtes_array.length; i++){
                        

                        
                        console.log("this.gesamtes_array Array wird durchlaufen. "+ this.gesamtes_array[i].nummer.toString() + " bestellung "+ this.gesamtes_array[i].bestellung);
                        
                        this.bestellung = this.gesamtes_array.find((bestellung) => bestellung.periode === parseInt(localStorage.getItem("aktuelle Periode"))&& bestellung.nummer === this.gesamtes_array[i].nummer);
                        if(this.bestellung !== undefined){
                            
                            console.log(" Bestellung ist nicht undefined ");
                            this.bestellung.kaufmenge = 0; //this.gesamtes_array.bestellung,
                            //this.bestellung.kaufteil.id  = this.sucheKaufteil(this.bestellung);  //this.gesamtes_array // Query durchlaufen
 
                            this.bestellungService.update(this.bestellung)
                                                  .subscribe((respond: Bestellung) =>
                            console.log(respond), () => this.onSaveError());
                        }
                        else{
                            
                            //if(this.gesamtes_array[i].bestellung !== 0){
                            if(this.gesamtes_array[i].bestellung !== 0){
                                
                                console.log(" Else-Schleife wird durchlaufen: " +this.gesamtes_array[i].nummer);
   
                                    //for(let i = 0; i <this.teils.length; i++){
                                                         

                                        console.log("Teile - Forschleife wird durchlaufen ");
                                        
                                        console.log("this.gesamtes_array[i].nummer: "+this.gesamtes_array[i].nummer + "   this.teils[j].nummer.toString(): "+this.teils[i].nummer.toString() );                                                      
                                                                                                                                                                    
                                        // hier ist der Fehler 
                                
                                let j = 0;   
                                  
                                for (j= 0; j < this.teils.length; j++){
                                    console.log("Durchlauf NR: "+j);
                                    if (this.gesamtes_array[i].nummer === this.teils[j].nummer.toString()){
                                        console.log(" In der Schleifeeeee this.gesamtes_array[i].nummer: "+this.gesamtes_array[i].nummer + "   this.teils[j].nummer.toString(): "+this.teils[j].nummer.toString() );
                                        
                                                    this.kaufteil_mit_purchased_part = this.teils[i];
                                                    console.log("sollte klappen");
                                                    j = 1000; 
                                                    console.log("FKT beedet "+ j);
                                                
                                    } 
                                    
                                    console.log("j wird um 1 erhöht"+j);
                                }
                                console.log("Forschleife beendet");
                                    this.bestellung = new Bestellung(undefined, parseInt(this.gesamtes_array[i].periode) , undefined, undefined, parseInt(this.gesamtes_array[i].bestellung), undefined, undefined, 
                                                                     undefined, undefined, undefined , undefined,  this.kaufteil_mit_purchased_part); // Kaufteil
                                                                                         //Bestellstatus.UNTERWEGS
                                    //parseInt(localStorage.getItem("aktuelle Periode"))
                                    console.log("Was gespeichert wird in bestellung: " + "akt.Periode: " + this.gesamtes_array[i].periode + " Bestellung: " + this.gesamtes_array[i].bestellung + " Bestellstatus: " + Bestellstatus.UNTERWEGS.toString() + "Kaufteil.nummer : " + this.kaufteil_mit_purchased_part.nummer); 

                                    this.bestellungService.create(this.bestellung)
                                                          .subscribe((respond: Bestellung) =>
                                    console.log(respond), () => this.onSaveError()); 


                                    console.log(" Teil wurde gepeichert ");  
                                   
                            }
 
                                                   
                        }
                    }
        }, (respond: ResponseWrapper) => this.onError(respond.json)); 
        }, (respond: ResponseWrapper) => this.onError(respond.json));
        
    }
    
    private onSaveError() {
        this.isSaving = false;
    }
    
     
     
     
    public sucheKaufteil(bestellung?: Bestellung){ 
        
        console.log("suche Kaufteil() wird aufgerufen ");
        
        let kaufteil: Teil; 
        
        this.teilService.query({
            size: 1000000,
        })
        .subscribe((res: ResponseWrapper) => {
                this.teils = res.json;
        
                //this.bestellungen.forEach(function (bestellung) {
                    
                    //this.gesamtes_array.forEach(function (kaufteil) {
                    for(let i = 0; i <this.teils.length; i++){
                        
                        if (bestellung.periode == this.teils[i].periode && bestellung.nummer == this.teils[i].nummer){
                            if(this.bestellung !== undefined){
                                kaufteil = this.teils[i];
                                return kaufteil;
                                
                                /*
                                this.kaufteil.teiltyp = this.teiltyp; 
                                this.kaufteil.istmenge = undefined;
                                this.kaufteil.startmenge = undefined; 
                                this.kaufteil.prozentsatz = undefined;
                                this.kaufteil.lagerpreis = undefined;
                                this.kaufteil.lagerwert = undefined;
                                this.kaufteil.sicherheitsbestand = undefined;
                                this.kaufteil.vertriebswunsch = undefined;
                                this.kaufteil.gesamtproduktionsmenge = undefined;
                                this.kaufteil.direktverkaufmenge = undefined;
                                this.kaufteil.strafe = undefined;
                                this.kaufteil.subkomponentes = undefined
                                */
                            }
                            
                            /*
                            this.teilService.update(this.kaufteil)
                                                  .subscribe((respond: Teil) =>
                            console.log(respond), () => this.onSaveError());
                            */

                        }else{
                            kaufteil = undefined; 
                            return kaufteil;
                        }      
                    };      
        }, (respond: ResponseWrapper) => this.onError(respond.json));
    }
    
    public sucheKaufteil_mit_purchased_part(purchased_part: PurchasedPart){ 
        
        console.log("sucheKaufteil_mit_purchased_part wird aufgerufen "); 
        this.kaufteil_mit_purchased_part;
        //kaufteil = new Teil;       
        
        this.teilService.query({
            size: 1000000,
        })
        .subscribe((res: ResponseWrapper) => {
                this.teils = res.json;
        
                //this.bestellungen.forEach(function (bestellung) {
                    
                    //this.gesamtes_array.forEach(function (kaufteil) {
                    for(let i = 0; i <this.teils.length; i++){
                        
                        console.log("sucheKaufteil_mit_purchased_part - Forschleide wird durchlaufen "); 
                        
                        if (purchased_part.nummer == this.teils[i].nummer.toString()){
                            if( this.kaufteil_mit_purchased_part !== undefined){
                                 this.kaufteil_mit_purchased_part = this.teils[i];
                                 /*
                                kaufteil.teiltyp = Teiltyp.KAUFTEIL;
                                kaufteil.istmenge = undefined;
                                kaufteil.startmenge = undefined; 
                                kaufteil.prozentsatz = undefined;
                                kaufteil.lagerpreis = undefined;
                                kaufteil.lagerwert = undefined;
                                kaufteil.sicherheitsbestand = undefined;
                                kaufteil.vertriebswunsch = undefined;
                                kaufteil.gesamtproduktionsmenge = undefined;
                                kaufteil.direktverkaufmenge = undefined;
                                kaufteil.strafe = undefined;
                                kaufteil.subkomponentes = undefined
                                */
                                
                                return  this.kaufteil_mit_purchased_part;
                            }
                        }else{
                            this.kaufteil_mit_purchased_part = undefined; 
                            
                            /*
                            kaufteil.teiltyp = Teiltyp.KAUFTEIL;
                                kaufteil.istmenge = undefined;
                                kaufteil.startmenge = undefined; 
                                kaufteil.prozentsatz = undefined;
                                kaufteil.lagerpreis = undefined;
                                kaufteil.lagerwert = undefined;
                                kaufteil.sicherheitsbestand = undefined;
                                kaufteil.vertriebswunsch = undefined;
                                kaufteil.gesamtproduktionsmenge = undefined;
                                kaufteil.direktverkaufmenge = undefined;
                                kaufteil.strafe = undefined;
                                kaufteil.subkomponentes = undefined
                             */   
                             
                            return  this.kaufteil_mit_purchased_part;
                        }      
                    }      
        }, (respond: ResponseWrapper) => this.onError(respond.json));
    }
    
    
    previousState() {
        window.history.back();
    }
        
          
}