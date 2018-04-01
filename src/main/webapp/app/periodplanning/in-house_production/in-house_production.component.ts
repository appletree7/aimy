import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute,  Router, Params } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
//Referenz zu einem bereits offenem Fenster - um Instanzen zu übergeben, die in diesem Fenster befüllt werden 
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
 //Wird benötigt, wenn Buttons angeklickt werden 
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Teil, Teiltyp } from '../../entities/teil/teil.model';
import { InHouse } from '../../entities/anzeige/in-house_production.model';
import { TeilService } from '../../entities/teil/teil.service';
import { InHouseProductionService } from './in-house_production.service';

import { Arbeitsplatz, ArbeitsplatzService } from '../../entities/arbeitsplatz';
import { Fertigungsauftrag, FertigungsauftragService  } from '../../entities/fertigungsauftrag';
 
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
 
 //Um Berechtigungen Prüfen zu können 
import { ITEMS_PER_PAGE, Principal, User, UserService, ResponseWrapper } from '../../shared'; 

@Component({ 
    selector: 'jhi-in-house_production', 
     // Auswahlmenue in der Navigationsleiste 
    templateUrl: './in-house_production.component.html', 
     // Fenstergröße --> hier: Standard 
     // styles: [] 
}) 
export class InHouseProductionComponent implements OnInit { 

    // Variablen, die ich benötige hier definieren:  
    
    
    //Anmerkungen: nach DB update (Bei Entität Fertigungsaufträge - Herstellid wird auf die selbstgenerierteId referenziert. Besser wäre die Nummer anzugeben) 
                 // Bei Subkomponente sollte eine Liste angegeben werden (hier auch wieder auf ID referenziert, aber das hab ich schon im Programm umgesetzt das ist nicht so schlimm)
    
    
    
    teils: Teil[]; 
    account: any;
    arbeitsplatzs: Arbeitsplatz[];  
    currentAccount: any;
    eventSubscriber: Subscription;
    teil: Teil;
    fertigungsauftraege: Fertigungsauftrag[]; 
    fertigungsauftrag : Fertigungsauftrag;
    wanted: Teil[];
    wantedfewartend : Fertigungsauftrag[];
    wantedfebearbeitend: Fertigungsauftrag[];    
    wartelistezuherstellteil: Number[]; 

    string: string; 
    number: number;
    
    nummer: string; 
    
    
    anzahl_auftraege_in_warteliste: any; 
    anzahl_auftraege_in_bearbeitung: any; 
    // für die HTML-Seite
    anzeige: any; 
    //inhouse: InHouse; 
    inhouse_anzeige_array: InHouse[]; 
    


     
    constructor(
        // private in_house_productionService: TeilService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private teilService: TeilService, 
        private fertigungsauftragService: FertigungsauftragService,
        private route: ActivatedRoute,     
        
    ) {} 
     
    ngOnInit() { 
        this.principal.identity().then((account) => {
            this.account = account;
        });  
        
        this.teilService.query()
            .subscribe((res: ResponseWrapper) => { 
                // if (this.teil.nummer != null && this.teil.nummer == "1"){
                this.teils = res.json;
 
                 // let wanted = this.teils.filter( function(teil){return (teil.nummer == '1');} );

                this.wanted = this.teils.filter( function(teil){
                        
                let teiltypen = teil.teiltyp.toString();
                console.log(teiltypen); 
                    
                if (teiltypen == 'PRODUKT' || teiltypen == 'ERZEUGNIS')
                    return (teil);});
                
                // Alle Teile, die den Teiltyp "PRODUKT" und "ERZEUGNIS" besitzen, werden ausgegeben:       
                res.json = this.wanted; 
                //console.log(this.wanted);

            
            //Aufsuchen aller Fertigungsaufträge    
            this.fertigungsauftragService.query()
            .subscribe((res2: ResponseWrapper) => { 
                
            this.fertigungsauftraege = res2.json;
                
            //sucht alle fertigungsaufträge raus, die den Status wartend haben
            this.wantedfewartend = this.fertigungsauftraege.filter(function(fertigungsauftragwartend){
    
                let auftragsstatuse = fertigungsauftragwartend.auftragsstatus.toString();
                //console.log(auftragsstatuse);

                 
                if (auftragsstatuse == 'WARTEND')//|| auftragsstatuse == 'BEARBEITEND'
                return (fertigungsauftragwartend);});
                
 
            //sucht alle fertigungsaufträge raus, die den Status bearbeitend haben    
            this.wantedfebearbeitend = this.fertigungsauftraege.filter(function(fertigungsauftragbearbeitend){
    
                let auftragsstatuse = fertigungsauftragbearbeitend.auftragsstatus.toString();
                //console.log(auftragsstatuse);
                    
                if (auftragsstatuse == 'ANGEFANGEN')
                return (fertigungsauftragbearbeitend);});
                            
                
                res2.json = this.wantedfewartend ; 
                //console.log(this.wantedfewartend);
                //console.log("BEARBEITENDE AUFTRÄGE: "+ this.wantedfebearbeitend);
                //console.log("BEARBEITENDE AUFTRÄGE: " + this.wantedfebearbeitend.toString());
                
             
             //console.log("Antwort 1 : " + this.wanted + " + Antwort 2 : " +  this.wantedfewartend +' hats geklappt?');
             //console.log("JSON:   Antwort 1 : " + res + " + Antwort 2 : " +  res2 +' hats geklappt?');  

             //Aufträge Warteliste
             this.anzahl_auftraege_in_warteliste = this.anzahl_fertigungsauftraege_zu_herstellteil_warteliste(this.wanted, this.wantedfewartend); 
             //Aufträge in Bearbeitung
             this.anzahl_auftraege_in_bearbeitung = this.anzahl_fertigungsauftraege_zu_herstellteil_bearbeitungsliste(this.wanted, this.wantedfebearbeitend); 
 
             
             //Anzeige der HTML-Seite
             this.inhouse_anzeige_array = this.anzeige_html_seite(this.wanted, this.anzahl_auftraege_in_warteliste, this.anzahl_auftraege_in_bearbeitung);
             
                
             console.log("MEIN AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARRRAAAAAAAAAAAAAAAAAAAAAAY: "+this.inhouse_anzeige_array.toString());
             
             
            for (let i = 0; i< this.inhouse_anzeige_array.length; i++ ){
                console.log("Meine Anzeige: + Nummer: " + this.inhouse_anzeige_array[i].nummer + "  VT-Wunsch: "+ this.inhouse_anzeige_array[i].vertriebswunsch + " Sicherheitsbestand:  "+ this.inhouse_anzeige_array[i].sicherheitsbestand + 
                    + " bestand_vorperiode:  " + this.inhouse_anzeige_array[i].bestand_vorperiode +  " auftraege_in_warteliste:  " + this.inhouse_anzeige_array[i].auftraege_in_warteliste +
                    " auftraege_in_bearbeitung:  " + this.inhouse_anzeige_array[i].auftraege_in_bearbeitung + " produktionsauftraege:  " + this.inhouse_anzeige_array[i].produktionsauftraege
                    ); 
            }
             
             
             
             //hier nochmal drüber gehen!!!!
             res = this.anzeige;
             
             
                   
            ;}, (res2: ResponseWrapper) => this.onError(res2.json));
    
            },(res: ResponseWrapper) => this.onError(res.json));
            

    
    }; 

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    } 
    
    
    // Listet alle Fertigungsaufträge zu einem Herstellteil auf, die den Status "wartend" besitzen:
    public anzahl_fertigungsauftraege_zu_herstellteil_warteliste (wanted: Teil[], wantedfewartend: Fertigungsauftrag[]){ 

        console.log("Funktion anzahl_fertigungsauftraege_zu_herstellteil wird aufgerufen ");
        
        // Variablen für Aufträge in Warteliste zu einem Teil herauszubekommen:
        let warteliste_eines_teils_zu_herstellteilmenge = [[this.string, this.number]]; 
        let array_warteliste_eines_teils_zu_herstellteilmenge = new Array;
        let warteliste_eines_teils_zu_herstellteilmenge_nur_Anzahl = [[this.number]];
        let array_warteliste_eines_teils_zu_herstellteilmenge_nur_Anzahl = new Array; 
        
           
        wanted.forEach(function(teil){
                
            console.log(teil);
            let alle_fertigungsauftraege_wartend_für_ein_teil = 0; 
            
            
             wantedfewartend.forEach(function(fertigungsauftragwartend){ 
                console.log(fertigungsauftragwartend);
                if (teil.nummer == fertigungsauftragwartend.herstellteil.id){
                     
                    console.log(teil.nummer);
                    console.log(fertigungsauftragwartend.herstellteil.id);
                    console.log(fertigungsauftragwartend.auftragsmenge);
                    
                        
                    alle_fertigungsauftraege_wartend_für_ein_teil = alle_fertigungsauftraege_wartend_für_ein_teil + fertigungsauftragwartend.auftragsmenge; 
                        
                        
                    console.log ("Fertigungsauftrag erstellt/addiert  ");  

 
            }
            //return console.log("hat geklappt :-) ");
            }); 

            warteliste_eines_teils_zu_herstellteilmenge = [
                [teil.nummer, alle_fertigungsauftraege_wartend_für_ein_teil]
            ];

            warteliste_eines_teils_zu_herstellteilmenge_nur_Anzahl = [[alle_fertigungsauftraege_wartend_für_ein_teil]];
            
            // console.log ("!!!! neuer Schritt " +alle_fertigungsauftraege_wartend_für_ein_teil );
            
            //let prüfen = warteliste_eines_teils_zu_herstellteilmenge.toString();
            //console.log ("Wert zu String machen: " + prüfen);

            array_warteliste_eines_teils_zu_herstellteilmenge.push(warteliste_eines_teils_zu_herstellteilmenge);
            
            array_warteliste_eines_teils_zu_herstellteilmenge_nur_Anzahl.push(warteliste_eines_teils_zu_herstellteilmenge_nur_Anzahl);
            
            
            //let prüfen2 =  array_warteliste_eines_teils_zu_herstellteilmenge_nur_Anzahl.toString();
            //console.log ("Wert zu String machen ARRAYYYY : " + prüfen2);
            
            
        });
        //Ausgabe des Arrays um für Warteliste rauszubekommen
        console.log(" !!!!!!!! Warteliste_eines_teils_zu_herstellteilmenge: ");
        for (let i = 0; i < array_warteliste_eines_teils_zu_herstellteilmenge_nur_Anzahl.length; i++)
        {
            console.log("I: "+array_warteliste_eines_teils_zu_herstellteilmenge_nur_Anzahl[i]);
        }
        
        
        return array_warteliste_eines_teils_zu_herstellteilmenge_nur_Anzahl; 
        
        
        
    };
    
    
    
    
    
    
    
    
    
    //Listet alle Fertigungsaufträge zu einem Herstellteil auf, die den Status "angefangen" besitzen:
    public anzahl_fertigungsauftraege_zu_herstellteil_bearbeitungsliste (wanted: Teil[], wantedfebearbeitend: Fertigungsauftrag[] ){ 

        console.log("Funktion anzahl_fertigungsauftraege_zu_herstellteil_bearbeitungsliste wird aufgerufen ");
        
        
        //Variablen für Aufträge in Bearbeitung zu einem Teil herauszubekommen:
        let bearbeitungsliste_eines_teils_zu_herstellteilmenge = [[this.string, this.number]];
        let bearbeitungsliste_eines_teils_zu_herstellteilmenge_nur_Anzahl = [[this.number]]; 
        
        let array_bearbeitungsliste_eines_teils_zu_herstellteilmenge = new Array;
        let array_bearbeitungsliste_eines_teils_zu_herstellteilmenge_nur_Anzahl = new Array; 

           
        wanted.forEach(function(teil){
                
            console.log(teil);
            let alle_fertigungsauftraege_bearbeitend_für_ein_teil = 0;
            
            
             wantedfebearbeitend.forEach(function(fertigungsauftragbearbeitend){ 
                console.log(fertigungsauftragbearbeitend);
                if (teil.nummer == fertigungsauftragbearbeitend.herstellteil.id){
                     
                    console.log(teil.nummer);
                    console.log(fertigungsauftragbearbeitend.herstellteil.id);
                    console.log(fertigungsauftragbearbeitend.auftragsmenge);
                    
                        
                    alle_fertigungsauftraege_bearbeitend_für_ein_teil = alle_fertigungsauftraege_bearbeitend_für_ein_teil + fertigungsauftragbearbeitend.auftragsmenge; 
                        
                        
                    //console.log ("Fertigungsauftrag bearbeitend erstellt/addiert  ");  

 
            }
            //return console.log("hat geklappt :-) ");
            }); 

            bearbeitungsliste_eines_teils_zu_herstellteilmenge = [
                [teil.nummer,  alle_fertigungsauftraege_bearbeitend_für_ein_teil]
            ];
            
            bearbeitungsliste_eines_teils_zu_herstellteilmenge_nur_Anzahl = [[alle_fertigungsauftraege_bearbeitend_für_ein_teil]]; 
            
            //let prüfen = bearbeitungsliste_eines_teils_zu_herstellteilmenge.toString();
            //console.log ("Wert zu String machen: " + prüfen);

            array_bearbeitungsliste_eines_teils_zu_herstellteilmenge.push(bearbeitungsliste_eines_teils_zu_herstellteilmenge);
            
            array_bearbeitungsliste_eines_teils_zu_herstellteilmenge_nur_Anzahl.push(bearbeitungsliste_eines_teils_zu_herstellteilmenge_nur_Anzahl);
            
            //let prüfen2 =  array_bearbeitungsliste_eines_teils_zu_herstellteilmenge_nur_Anzahl.toString();
            //console.log ("Wert zu String machen ARRAYYYY: " + prüfen2);
            
            
        });
        //Ausgabe des Arrays um für Bearbeitungsliste rauszubekommen
        //console.log("Bearbeitungsliste_eines_teils_zu_herstellteilmenge: ");
        for (let i = 0; i < array_bearbeitungsliste_eines_teils_zu_herstellteilmenge_nur_Anzahl.length; i++)
        {
            //console.log("I: " + array_bearbeitungsliste_eines_teils_zu_herstellteilmenge_nur_Anzahl[i]);
        }
        return array_bearbeitungsliste_eines_teils_zu_herstellteilmenge_nur_Anzahl; 
   
    };
    

    
    public anzeige_html_seite (wanted: Teil[], anzahl_auftraege_in_warteliste: any, anzahl_auftraege_in_bearbeitung: any) {
        
        console.log("Funktion wird aufgerufen");
        
        let produktionsauftraege = 0; 
        let auftraege_wartend_zu_herstellteil; 
        let auftraege_bearbeitend_zu_herstellteil;
        let zaehler = 1; 
        let durchlauf = 1; 
        let durchlauf2 = 1; 
        let vertriebswunsch_subkomponente;
        let zweite_teile_tabelle = wanted; 
         
        let inhouse_anzeige_array = new Array; 
        
        

         wanted.forEach(function(teil){
             
            let inhouse = new InHouse;
 
            inhouse.nummer = teil.nummer;
            
            if (teil.nummer == "1" || teil.nummer == "2" || teil.nummer == "3"){
                console.log(" Sollte nur bei P1, P2, P3 durchlaufen werden! " + teil.vertriebswunsch);
                if (teil.vertriebswunsch == null) {
                    teil.vertriebswunsch = 0; 
                    inhouse.vertriebswunsch = 0;
                }
                else {
                    inhouse.vertriebswunsch = teil.vertriebswunsch;
                }
            }
            else {
                console.log(" Sollte nur bei Subkomponenten durchlaufen werden! " + " Teilenummer : " + teil.nummer +
                            " Teil.vertriebswunsch/ hier kann auch noch null stehen: "+ teil.vertriebswunsch);
                // Funktion für Subkomponenten aufrufen!!!
                //let vertriebswunsch_subkomponenten = this.algorithmus_Produktionsplan_auf_Subkomponenten_Vertriebswunsch_übertragen(teil, produktionsauftraege);
                
                let teilenummer_subkomponente = teil.id; 
                 console.log("teilenummer_subkomponente" + teilenummer_subkomponente); 
                
                // !!!!! muss angepasst werden, wenn Unterkomponenten zu einer Liste gemacht wird!!
                  
                zweite_teile_tabelle.forEach(function(teil){
                   
                    if (teil.subkomponente != null)
                    {
                        let subkomponenten = teil.subkomponente.id; 
                   
                        if (subkomponenten == teilenummer_subkomponente.toString()) {
                            console.log("!!!!! Prüfung hat geklappt");
                            console.log("teilenummer_subkomponente " + teilenummer_subkomponente +" teil.subkomponente: "+ subkomponenten.toString());
                            vertriebswunsch_subkomponente = produktionsauftraege;
                            console.log("vertriebswunsch_subkomponente (sollte Produktionsauftaege entsprechen vonübergeordneter Komponente entsprechen):  " + vertriebswunsch_subkomponente); 
                        }
                    
                    }   
                });  
                
                console.log("Probe nicht durchlaufen - teilenummer_subkomponente " + teilenummer_subkomponente);
                console.log("teil.vertriebswunsch: " + teil.vertriebswunsch + "teil.vertriebswunsch: "+teil.vertriebswunsch ); 
                
                if (teil.vertriebswunsch == null && vertriebswunsch_subkomponente == 0 ) {
                    console.log("sollte nur durchlaufen werden wenn vertiebswunsch_Subkomponente = 0 sein"); 
                    teil.vertriebswunsch = 0; 
                    inhouse.vertriebswunsch = 0;
                }
                else {
                    console.log("sollte bei Teile-Nr 26,16,4,7 durchlaufen werden.");
                    teil.vertriebswunsch = vertriebswunsch_subkomponente;
                    inhouse.vertriebswunsch = vertriebswunsch_subkomponente;
                }
            }
            
  
            if (teil.sicherheitsbestand == null) {
                teil.sicherheitsbestand = 0; 
                inhouse.sicherheitsbestand = 0; 
            }
            else {
                inhouse.sicherheitsbestand = teil.sicherheitsbestand; 
            }
            if (teil.istmenge == null){
                teil.istmenge = 0; 
                inhouse.bestand_vorperiode = 0; 
            } 
            else {
                inhouse.bestand_vorperiode = teil.istmenge;
            }
            

            // && i < anzahl_auftraege_in_warteliste.length-1
            
            for (let i = 0; i < anzahl_auftraege_in_warteliste.length; i++) {
                console.log("Forschleife für Warteliste wird durchlaufen "); 
                if (durchlauf == zaehler)
                {
                    if( anzahl_auftraege_in_warteliste != null)
                    {
                    // console.log("Durchlauf Nr "+durchlauf + "zaehler: " + zaehler + " Element in der Liste : "+ anzahl_auftraege_in_warteliste[i]);

                    inhouse.auftraege_in_warteliste = anzahl_auftraege_in_warteliste[i]; 



                    // console.log("Element wird hinzugefügt: "+ anzahl_auftraege_in_warteliste[i]); 
                
                    // console.log(anzahl_auftraege_in_warteliste[i].toString());
                    
                    auftraege_wartend_zu_herstellteil = anzahl_auftraege_in_warteliste[i]; 
                    
                    // console.log("erstes Element wuird gleich entfernt :"+ anzahl_auftraege_in_warteliste[i]);
                    anzahl_auftraege_in_warteliste.shift(); 
                    
                    
                    // console.log("i :"+ i);
                    durchlauf++; 
                    // console.log("Durchlaufsnummer ehöht: " +durchlauf);
                    // console.log("For Schleife durchgelaufen. ");
                    }
                    
                }
            }
            
            for (let i = 0; i < anzahl_auftraege_in_bearbeitung.length; i++) {
                console.log("Forschleife für Bearbeitungsliste wird durchlaufen ");
                if (durchlauf2 == zaehler)
                {
                    if( anzahl_auftraege_in_bearbeitung != null)
                    {
                    // console.log("Durchlauf Nr "+durchlauf + "zaehler: " + zaehler + " Element in der Liste : "+ anzahl_auftraege_in_warteliste[i]);
                    inhouse.auftraege_in_bearbeitung = anzahl_auftraege_in_bearbeitung[i]; 
                    
                    
                    // console.log("Element wird hinzugefügt: "+ anzahl_auftraege_in_warteliste[i]); 
                
                    // console.log(anzahl_auftraege_in_warteliste[i].toString());
                    
                    auftraege_bearbeitend_zu_herstellteil = anzahl_auftraege_in_bearbeitung[i]; 
                    
                    //console.log("erstes Element wuird gleich entfernt :"+ aanzahl_auftraege_in_bearbeitung[i]);
                    anzahl_auftraege_in_bearbeitung.shift(); 
                    
                    
                    //console.log("i :"+ i);
                    durchlauf2++; 
                    //console.log("Durchlaufsnummer ehöht: " +durchlauf);
                    //console.log("For Schleife durchgelaufen. ");
                    }
                    
                }
            }
 
            zaehler++; 
            //console.log("zaehler :"+ zaehler);
             
            
            //Berechnung der Produktionsaufträge für die nächste Periode: 
            produktionsauftraege = teil.vertriebswunsch + teil.sicherheitsbestand - teil.istmenge - auftraege_wartend_zu_herstellteil - auftraege_bearbeitend_zu_herstellteil; 
            
            if(produktionsauftraege <0)
                produktionsauftraege = 0; 
            
            console.log("BERECHNUNG FOLGT"); 
            console.log("Produktionsauftraege :"+  produktionsauftraege + "Vertiebswunsch"+ teil.vertriebswunsch + "Sicherheitsbestand"+teil.sicherheitsbestand + "Bestand_Vorperiode"+teil.istmenge +"Aufträge Warteschlange"+ auftraege_wartend_zu_herstellteil +"Aufträge Bearbeitung"+ auftraege_bearbeitend_zu_herstellteil)

            inhouse.produktionsauftraege = produktionsauftraege; 
            

            console.log("!!!!!!!!! Zeile ENDE !!!!!!! "); 
            
            
            inhouse_anzeige_array.push(inhouse);
             
            }); 

            console.log("!!!!!!!!! FUNKTION ENDE !!!!!!! "); 
            
            
            
            

            
            return inhouse_anzeige_array; //inhouse
            
            
         };
             
}; 
