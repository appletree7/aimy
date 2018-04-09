import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Response } from '@angular/http'; 
import { PurchasedPart } from '../../entities/anzeige/purchased_part.model';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster'; 
import { Teil, Teiltyp } from '../../entities/teil/teil.model';
import { Bestellung, Bestellstatus } from '../../entities/bestellung/bestellung.model';
import { TeilService } from '../../entities/teil/teil.service';
import { BestellungService } from '../../entities/bestellung/bestellung.service';
import { Modus } from '../../entities/modus/modus.model';
import { ModusService } from '../../entities/modus/modus.service';
import { Arbeitsplatz, ArbeitsplatzService } from '../../entities/arbeitsplatz'; 
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
    modi : Modus[];  
    modus_mit_purchased_part: Modus;
    hoechste_nummer: number; 
    
    
 
    //produktionsprogramm_naechste_periode: Number []; 
    //this.angangsbestand_vorperiode: any; 
    
    constructor(
        private eventManager: JhiEventManager, 
        private teilService: TeilService,
        private bestellungService: BestellungService,
        private modusService: ModusService,
        private jhiAlertService: JhiAlertService,    
        private principal: Principal
    ) {} 
        
 
    ngOnInit() { 
        this.principal.identity().then((account) => {
            this.account = account;
        }); 
        this.isSaving = false;
        this.hoechste_nummer = 0;
     
           
            this.teilService.query({
                   size: 1000000,
            })
            .subscribe((res3: ResponseWrapper) => { 
                
                this.teils = res3.json;
                let produktionsprogramm = new Array; 
                let anfangsbestand_vorperiode = new Array;
                
                
                this.alle_kaufteile = this.teils.filter( function(teil){
                        
                    let teiltypen = teil.teiltyp.toString();
                    let alte_periode : number;                    
                    alte_periode = parseInt(localStorage.getItem('aktuelleperiode'), 10);
                    alte_periode = alte_periode - 1; 
                    
                    if (teil.nummer == 1 && teil.periode == parseInt(localStorage.getItem('aktuelleperiode'), 10)|| teil.nummer == 2 && teil.periode == parseInt(localStorage.getItem('aktuelleperiode'), 10) || teil.nummer == 3 && teil.periode == parseInt(localStorage.getItem('aktuelleperiode'), 10) ){
                        if(teil.vertriebswunsch == undefined){
                           teil.vertriebswunsch = 100; 
                        }  
                        produktionsprogramm.push(teil.vertriebswunsch);  
                    };    
 
                    if (teiltypen == 'KAUFTEIL' && teil.periode == alte_periode ) {  
                        anfangsbestand_vorperiode.push(teil.istmenge);
                        return (teil);  
                    }; 
 
                });
                
                
 
                
                //Beispielhaft für Kaufteile 21,22,23:        
                this.lieferdauer_max_array = [2.2, 2.1, 1.4, 3.5, 1.1, 1.1, 2.1, 2.6, 2.4, 1.9, 2.6, 1.3, 1.8, 2.1, 1.8, 1.9, 1.1, 1.5, 2.5, 1.2, 2.0, 1.2, 1.2, 1.2, 2.0, 1.8, 2.0, 2.1, 0.9]
                this.diskontmenge_array = [300,300,300,6100,3600, 1800,4500,2700,900,2200,3600,900,900,300,1800,900,900,1800,2700,900,900,900,900,1800,600,22000,600,22000,1800]
                this.verwendung_array = [[1,0,0],[0,1,0],[0,0,1],[7,7,7],[4,4,4],[2,2,2],[4,5,6],[3,3,3],[0,0,2],[0,0,72],[4,4,4],[1,1,1],[1,1,1],[1,1,1],[2,2,2],[1,1,1],[1,1,1],[2,2,2],[1,1,1],[3,3,3],[1,1,1],[1,1,1],[1,1,1],[2,2,2],[2,0,0],[72,0,0],[0,2,0],[0,72,0],[2,2,2]]                                  
                             
                //this.produktionsprogramm_periode_1 = [teil.vertriebswunsch für Teil 1,teil.vertriebswunsch für Teil 2, teil.vertriebswunsch für Teil3 ];     
                //falls Produktionsprogramm nächste Periode < Anfangsbestand, dann bestellen: 
                // Was hier noch alles rein muss: this.anfangsbestand_vorperiode + produktionsprogramm
                this.gesamtes_array = this.bruttobedarf_berechnen(this.alle_kaufteile, this.lieferdauer_max_array, this.diskontmenge_array, this.verwendung_array, produktionsprogramm);
                
                // Alle Teile, die den Teiltyp "Kaufteil" besitzen, werden ausgegeben:       
                res3.json = this.alle_kaufteile; 
                
                },(res3: ResponseWrapper) => this.onError(res3.json));   
        
        
              
    } 
    
    
    changeListener($event): void {
        $event = this.isSaving = true;
        this.save();
    }
    
    
    
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    };

    
    public bruttobedarf_berechnen(alle_kaufteile: Teil[], lieferdauer_max_array: any, diskontmenge_array: any, verwendung_array:Number[], produktionsprogramm: any) { 
 
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

            let purchasedpart = new PurchasedPart;
            purchasedpart.nummer = kaufteil.nummer.toString();
            purchasedpart.bestand = kaufteil.istmenge;
            purchasedpart.bruttobedarf = 0; 
            purchasedpart.periode = parseInt(localStorage.getItem('aktuelleperiode'), 10);
 
            for (let i = 0; i < durchlauf ; i++){
                lieferdauer_max_array[i]; 
                purchasedpart.lieferdauer = lieferdauer_max_array[i];
                lieferdauer_max_array.shift(); 
                
                diskontmenge_array[i];   
                purchasedpart.diskontmenge = diskontmenge_array[i];
                diskontmenge_array.shift();  
                                        
                        
                        
                        for (let j = 0; j < 3; j++){
                            bruttobedarf = verwendung_array[i][j] * produktionsprogramm[j]; //produkt_produktionsprogramm]; 
                            purchasedpart.bruttobedarf = purchasedpart.bruttobedarf + bruttobedarf;

                            
                         }

                    verwendung_array.shift();
                 
 
                    console.log("purchasedpart.bestand: " + purchasedpart.bestand + " purchasedpart.lieferdauer "+purchasedpart.lieferdauer +" purchasedpart.bruttobedarf "+purchasedpart.bruttobedarf)
                    
                    let puffer = purchasedpart.bruttobedarf*1.6;
                    console.log("Puffer: "+puffer)
      
                    if (purchasedpart.bestand*purchasedpart.lieferdauer > puffer){
                        purchasedpart.bestellung = 0; 
                        purchasedpart.art= "-";
                        purchasedpart.modus_id = 0;
                        
                    }
                    
                    if (purchasedpart.bestand - (purchasedpart.lieferdauer* purchasedpart.bruttobedarf) < 0){
                        purchasedpart.bestellung = purchasedpart.bruttobedarf; 
                        purchasedpart.art= "N";                        
                        purchasedpart.modus_id = 2; 
                    }else {
                        purchasedpart.bestellung = 0; 
                        purchasedpart.art= "-"; 
                        purchasedpart.modus_id = 0;
                    }

                    if( purchasedpart.bestand < purchasedpart.bruttobedarf) {
                        purchasedpart.bestellung = Math.ceil(purchasedpart.bruttobedarf* Math.round(purchasedpart.lieferdauer)); 
                        purchasedpart.art= "E"; 
                        purchasedpart.modus_id = 5; 
                    }
                    if( purchasedpart.bestand*purchasedpart.lieferdauer < purchasedpart.bruttobedarf) {
                        purchasedpart.bestellung = Math.ceil((purchasedpart.bruttobedarf*1.3)); 
                        purchasedpart.art= "E";
                        purchasedpart.modus_id = 5;  
                    }               
            } 
            purchasedpart_anzeige_array.push(purchasedpart); 
            //durchlauf = durchlauf+1;         
        });      
        return purchasedpart_anzeige_array; 
    }; 
    
    
    
    public save() { 
        //Anpassen der aktuellen Teile 
        //this.saveTeil(); 
        //Neue_Bestellungen_anlegen 
        this.saveBestellung();       
        this.isSaving = true;         
    };   
     

    public saveBestellung(){ 
        
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
                        
                    this.modusService.query({
                         size: 1000000,
                     })
                         .subscribe((res: ResponseWrapper) => {
                             this.modi = res.json;
                    
                    let j = 0;                                  
                    for(let i = 0; i < this.gesamtes_array.length; i++){
                        
                            for(let i = 0; i < this.bestellungen.length; i++){
                                if(this.hoechste_nummer < this.bestellungen[i].nummer)
                                    this.hoechste_nummer = this.bestellungen[i].nummer;
                            }
                            this.hoechste_nummer = this.hoechste_nummer + 1;
                        
                        console.log("this.gesamtes_array Array wird durchlaufen. "+ this.gesamtes_array[i].nummer.toString() + " bestellung "+ this.gesamtes_array[i].bestellung);
                        
                        this.bestellung = this.gesamtes_array.find((bestellung) => bestellung.periode === parseInt(localStorage.getItem("aktuellepriode"))&& bestellung.nummer === this.gesamtes_array[i].nummer);
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
                                
                                let j = 0;  
                                let k = 0;                                  
                                for (j= 0; j < this.teils.length; j++){
                                    if (this.gesamtes_array[i].nummer === this.teils[j].nummer.toString()){                                        
                                                    this.kaufteil_mit_purchased_part = this.teils[i];
                                                    j = 1000;                                                 
                                    } 
                                }
                                for (k= 0; k < this.modi.length; k++){
                                    console.log("Durchlauf NR: "+k);
                                    if (this.gesamtes_array[i].modus_id === this.modi[k].id){                                       
                                        this.modus_mit_purchased_part = this.modi[k];
                                        k = 1000; 
                                                
                                    } 
                                }
                                    this.bestellung = new Bestellung(undefined, parseInt(this.gesamtes_array[i].periode) , this.hoechste_nummer, undefined, parseInt(this.gesamtes_array[i].bestellung), undefined, undefined, 
                                                                     undefined, undefined, Bestellstatus.UNTERWEGS, this.modus_mit_purchased_part ,  this.kaufteil_mit_purchased_part); // Kaufteil

                                    this.bestellungService.create(this.bestellung)
                                                          .subscribe((respond: Bestellung) =>
                                    console.log(respond), () => this.onSaveError()); 
                                    console.log(" Teil wurde gepeichert ");                                    
                            }                         
                        }
                    }
        }, (respond: ResponseWrapper) => this.onError(respond.json));
        }, (respond: ResponseWrapper) => this.onError(respond.json)); 
        }, (respond: ResponseWrapper) => this.onError(respond.json));
        
    }    
    private onSaveError() {
        this.isSaving = false;
    }      
    previousState() {
        window.history.back();
    }
}