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
import { TeilService } from '../../entities/teil/teil.service';
import { Arbeitsplatz, ArbeitsplatzService } from '../../entities/arbeitsplatz';
import { Fertigungsauftrag, FertigungsauftragService  } from '../../entities/fertigungsauftrag';
//Um Berechtigungen Prüfen zu können 
import { ITEMS_PER_PAGE, Principal, User, UserService, ResponseWrapper } from '../../shared'; 
 
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
    
    teils: Teil[]; 
    teile_erzeugnis_produkt;
    account: any;
    arbeitsplaetze: Arbeitsplatz[];  
    currentAccount: any;
    eventSubscriber: Subscription;
    fertigungsauftraege_wartend_und_in_bearbeitung: Fertigungsauftrag[]; 
    fertigungsauftraege: Fertigungsauftrag[]; 
    
    
     
    constructor(
        private eventManager: JhiEventManager, 
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private teilService: TeilService, 
        private fertigungsauftragService: FertigungsauftragService,
        private arbeitsplatzService: ArbeitsplatzService,
        private route: ActivatedRoute,
        
    ){}
 
    ngOnInit() { 
        this.principal.identity().then((account) => {
            this.account = account;
        }); 
        
        this.teilService.query()
            .subscribe((res: ResponseWrapper) => { 
                this.teils = res.json;
                this.teile_erzeugnis_produkt = this.teils.filter( function(teil){      
                let teiltypen = teil.teiltyp.toString();
                console.log(teiltypen); 
    
                if (teiltypen == 'PRODUKT' || teiltypen == 'ERZEUGNIS'){
                    return (teil);
                }
                });
                // Alle Teile, die den Teiltyp "PRODUKT" und "ERZEUGNIS" besitzen, werden ausgegeben:       
                res.json = this.teile_erzeugnis_produkt; 
                console.log(this.teile_erzeugnis_produkt);
                
                
                this.arbeitsplatzService.query()
                .subscribe((res2: ResponseWrapper) => { 
                // if (this.teil.nummer != null && this.teil.nummer == "1"){
                    this.arbeitsplaetze = res2.json;
                    console.log(this.arbeitsplaetze.toString());
                

                this.fertigungsauftragService.query()
                .subscribe((res3: ResponseWrapper) => { 
 
                    this.fertigungsauftraege = res3.json;
                    console.log("  aaaaaaaaaaaaaaaaaaaaaaa  "+this.fertigungsauftraege);
                
                    //sucht alle fertigungsaufträge raus, die den Status "wartend" und "bearbeitend" haben
                    this.fertigungsauftraege_wartend_und_in_bearbeitung = this.fertigungsauftraege.filter(function(fa_wartend_und_in_bearbeitung){
    
                    let auftragsstatuse = fa_wartend_und_in_bearbeitung.auftragsstatus.toString();
                    //console.log(auftragsstatuse);

                 
                    if (auftragsstatuse == 'WARTEND' || auftragsstatuse == 'ANGEFANGEN')//|| auftragsstatuse == 'BEARBEITEND'
                    return (fa_wartend_und_in_bearbeitung)});
      
                
                    res3.json = this.fertigungsauftraege_wartend_und_in_bearbeitung; 
                    console.log("  aaaaaaaaaaaaaaaaaaaaaaa2  "+this.fertigungsauftraege);
                
                    for (let i = 0; i < this.fertigungsauftraege_wartend_und_in_bearbeitung.length; i++){
                        console.log(" Aufträge wartend und in Bearbeitung  "+ this.fertigungsauftraege_wartend_und_in_bearbeitung[i].toString()); 
                    };





                
                this.matrixberechnung (this.arbeitsplaetze, this.teile_erzeugnis_produkt, this.fertigungsauftraege_wartend_und_in_bearbeitung); 
                
                
                
                
                
                
                },(res3: ResponseWrapper) => this.onError(res3.json));
                },(res2: ResponseWrapper) => this.onError(res2.json));                
                },(res : ResponseWrapper) => this.onError(res.json));
        
    };
    
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    } 
 
     
    public matrixberechnung (arbeitsplaetze: Arbeitsplatz[], teile_erzeugnis_produkt: Teil[], fertigungsauftraege_wartend_und_in_bearbeitung: Fertigungsauftrag[]){
        
        console.log("Funktion wird aufgerufen");
        let kapazitaetsbedarf_neu; 
        let zaheler_teile_ruestzeit_mulitplikator; 
        let erhoehung; 
        let anzeige;
        let ruestzeit_neu;  
        let gesamt_kapazitaet_pro_arbeitsplatz; 
        let kapazitaetsbedarf_alt; 
        let ruestzeit_alt;     
        let erhoehung_kapbedarf_alt; 
        let zaheler_teile_ruestzeit_mulitplikator_alt;
        
        //initalisieren der Variablen, damit sie nicht undefined sind.
        kapazitaetsbedarf_neu = 0;
        ruestzeit_neu = 0; 
        zaheler_teile_ruestzeit_mulitplikator = 0; 
        gesamt_kapazitaet_pro_arbeitsplatz = 0; 
        kapazitaetsbedarf_alt = 0; 
        ruestzeit_alt = 0; 
        erhoehung_kapbedarf_alt = 0;
        zaheler_teile_ruestzeit_mulitplikator_alt = 0;  

        
        arbeitsplaetze.forEach(function (arbeitsplatz){
            console.log("Arbeitsplatz "+arbeitsplatz.toString());
                    
            teile_erzeugnis_produkt.forEach(function (teil){
                 
                if(arbeitsplatz.nummer == 1){
                   
                    if(teil.nummer == '49' || teil.nummer == '54' || teil.nummer == '29') {
                        console.log("Forschleife wird durchlaufen: "+ "  Arbeitsplatznr: "+ arbeitsplatz.nummer+ "  teil.nummer : "+ teil.nummer + " kapazitaetsbedarf: " + kapazitaetsbedarf_neu);
                        erhoehung = teil.istmenge * 6; 
                        console.log("Erhöhung: "+ erhoehung+ " kapazitaetsbedarf vorher:  "+ kapazitaetsbedarf_neu); 
                        kapazitaetsbedarf_neu = kapazitaetsbedarf_neu + erhoehung; 
                        console.log("kapazitaetsbedarf" + kapazitaetsbedarf_neu); 
                        if (teil.istmenge != 0){
                            zaheler_teile_ruestzeit_mulitplikator = zaheler_teile_ruestzeit_mulitplikator + 1;
                        }                         
                    }
                    ruestzeit_neu = 20 * zaheler_teile_ruestzeit_mulitplikator; 
                    console.log(" Arbeitsplatz: " + arbeitsplatz.nummer + " kapazitaetsbedarf_neu " + kapazitaetsbedarf_neu+ " ruestzeit_neu "+ruestzeit_neu + " Kap.bed.");

                    console.log("Teilid: "+teil.id + " + Teil.nummer: " + teil.nummer );
                    //Berechnung des Rückstands der Vorperiode
                    fertigungsauftraege_wartend_und_in_bearbeitung.forEach(function(fa){
                        console.log("Fertigungsaufträge in Beabeitung werden jetzt durchlaufen: " );
                        
                        console.log("Fertigungsauftrag Herstellteilid: "+ fa.herstellteil.toString() );
                        //würde ich sehr gerne auf teil.nummer ändern.
                        if (fa.herstellteil.id == teil.id){
                            if(teil.nummer == '49' || teil.nummer == '54' || teil.nummer == '29'){
                                erhoehung_kapbedarf_alt = fa.auftragsmenge*6;
                                kapazitaetsbedarf_alt = kapazitaetsbedarf_alt + erhoehung_kapbedarf_alt; 
                                console.log("kapazitaetsbedarf_alt: " + fa.auftragsmenge ); 
                                zaheler_teile_ruestzeit_mulitplikator_alt = zaheler_teile_ruestzeit_mulitplikator_alt+1;
                            }
                        }

                    }); 
                    ruestzeit_alt = 20* zaheler_teile_ruestzeit_mulitplikator_alt;   
                    gesamt_kapazitaet_pro_arbeitsplatz = kapazitaetsbedarf_neu + ruestzeit_neu + kapazitaetsbedarf_alt+ ruestzeit_alt;   
                }
                if(arbeitsplatz.nummer == 2){
                    if(teil.nummer == '50' || teil.nummer == '55' || teil.nummer == '30'){

                    }
                }
                
                
                if(arbeitsplatz.nummer == 3){
                    if(teil.nummer == '51'){
                        //Rüstzeit wird anders berechnet 

                    }
                    if(teil.nummer == '55' || teil.nummer == '30'){

                    }
                }
            
                
                    
                    
            });        
        });
    }

} 
