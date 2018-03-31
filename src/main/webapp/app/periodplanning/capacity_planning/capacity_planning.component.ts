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
import {Capacity} from '../../entities/anzeige/capacity_planning.model';
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
    capacity_array: Capacity[]; 
    
    
     
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
      
                
                    
                    console.log("  aaaaaaaaaaaaaaaaaaaaaaa2  "+this.fertigungsauftraege);
                
                    for (let i = 0; i < this.fertigungsauftraege_wartend_und_in_bearbeitung.length; i++){
                        console.log(" Aufträge wartend und in Bearbeitung  "+ this.fertigungsauftraege_wartend_und_in_bearbeitung[i].toString()); 
                    };

                    this.capacity_array = this.matrixberechnung (this.arbeitsplaetze, this.teile_erzeugnis_produkt, this.fertigungsauftraege_wartend_und_in_bearbeitung);              
                    
                    
                    res3.json = this.fertigungsauftraege_wartend_und_in_bearbeitung; 
                    //res3.json = this.capacity_array;
                    
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
        let zaheler_teile_ruestzeit_mulitplikator_zwei; 
        let erhoehung_zwei; 
        let erhoehung_kapbedarf_alt_zwei; 
        let ueberstunden_pro_tag; 
        let schichten;
        let capacity = new Capacity;
        let capacity_array = new Array; 
        
        //initalisieren der Variablen, damit sie nicht undefined sind.
        kapazitaetsbedarf_neu = 0;
        ruestzeit_neu = 0; 
        zaheler_teile_ruestzeit_mulitplikator = 0; 
        gesamt_kapazitaet_pro_arbeitsplatz = 0; 
        kapazitaetsbedarf_alt = 0; 
        ruestzeit_alt = 0; 
        erhoehung_kapbedarf_alt = 0;
        zaheler_teile_ruestzeit_mulitplikator_alt = 0;  
        zaheler_teile_ruestzeit_mulitplikator_zwei = 0; 
        erhoehung_zwei = 0; 
        erhoehung_kapbedarf_alt_zwei = 0; 
        ueberstunden_pro_tag = 0; 
        schichten = 1;
        

        
        arbeitsplaetze.forEach(function (arbeitsplatz){
            console.log("Arbeitsplatz " + arbeitsplatz.nummer.toString());
                    
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
                    ruestzeit_alt = 20*zaheler_teile_ruestzeit_mulitplikator_alt;   
                    gesamt_kapazitaet_pro_arbeitsplatz = kapazitaetsbedarf_neu + ruestzeit_neu + kapazitaetsbedarf_alt+ ruestzeit_alt;
                    
                    
                    // ueberstunden_pro_tag // schichten
                    
                    if(gesamt_kapazitaet_pro_arbeitsplatz > 24000){
                        
                        
                    }
                    
                     
                    capacity.arbeitsplatznummer = arbeitsplatz.nummer; 
                    capacity.kapazitaetsbedarf_neu = kapazitaetsbedarf_neu;
                    capacity.ruestzeit_neu = ruestzeit_neu;
                    capacity.kapazitaetsbedarf_alt = kapazitaetsbedarf_alt;
                    capacity.ruestzeit_alt = ruestzeit_alt;
                    capacity.gesamter_kapazitaetsbedarf = gesamt_kapazitaet_pro_arbeitsplatz; 
                    capacity.schichten = schichten;
                    capacity.ueberstunden = ueberstunden_pro_tag;
                    
                    
                    console.log("MEIN NEUES OOOOOOOOOBJEKT: "+ " Arbeitplatznr: "+ capacity.arbeitsplatznummer.toString() + " Kap.bed.neu "+ capacity.kapazitaetsbedarf_neu + 
                    " ruestzeit_neu " + capacity.ruestzeit_neu + " kapazitaetsbedarf_alt: "+ capacity.kapazitaetsbedarf_alt + " ruestzeit_alt  "+  capacity.ruestzeit_alt + "  gesamter_kapazitaetsbedarf: " + capacity.gesamter_kapazitaetsbedarf 
                    + " schichten: "+ capacity.schichten + " ueberstunden "+ capacity.ueberstunden ); 
                      
                     
                    
                    //capacity_array.push(capacity);
                     
                     //console.log("MEIN NEUES AAAAAARRRRAAAAAAAY: "+capacity_array.toString());    
                }

                
                
                
                //Arbeitsplatz2
                if(arbeitsplatz.nummer == 2){
                    
                    //Durchlaufen aller Teile die in diesem Arbeitsplatz bearbeitet werden 
                    if(teil.nummer == '50' || teil.nummer == '55' || teil.nummer == '30'){
                        console.log("Forschleife wird durchlaufen: "+ "  Arbeitsplatznr: "+ arbeitsplatz.nummer+ "  teil.nummer : "+ teil.nummer + " kapazitaetsbedarf: " + kapazitaetsbedarf_neu);
                        erhoehung = teil.istmenge * 5; 
                        console.log("Erhöhung: "+ erhoehung+ " kapazitaetsbedarf vorher:  "+ kapazitaetsbedarf_neu); 
                        
                        //Berechnung des kapazitaetsbedarf_neu:
                        kapazitaetsbedarf_neu = kapazitaetsbedarf_neu + erhoehung; 
                        console.log("kapazitaetsbedarf" + kapazitaetsbedarf_neu); 
                        
                        //Berechnung der Rüstzeitmultiplikatoren: 
                        if (teil.istmenge != 0){
                            if (teil.nummer == '50' || teil.nummer == '55'){
                                zaheler_teile_ruestzeit_mulitplikator = zaheler_teile_ruestzeit_mulitplikator + 1;
                            }
                            if (teil.nummer == '30'){
                                zaheler_teile_ruestzeit_mulitplikator_zwei = 1;
                            }
                        }                         
                    }
                    // Berechnung der Rüstzeit
                    ruestzeit_neu = 30 * zaheler_teile_ruestzeit_mulitplikator + 20 * zaheler_teile_ruestzeit_mulitplikator_zwei; 
                    console.log(" Arbeitsplatz: " + arbeitsplatz.nummer + " kapazitaetsbedarf_neu " + kapazitaetsbedarf_neu+ " ruestzeit_neu "+ruestzeit_neu + " Kap.bed.");
                                        
                    // Berechnung des Rückstands der Vorperiode:
                    fertigungsauftraege_wartend_und_in_bearbeitung.forEach(function(fa){
                        console.log("Fertigungsaufträge in Beabeitung werden jetzt durchlaufen: " );
                        
                        console.log("Fertigungsauftrag Herstellteilid: "+ fa.herstellteil.toString() );
                        
                        //Berechnung des alten Kap_bed.:
                        // würde ich sehr gerne auf teil.nummer ändern.
                        if (fa.herstellteil.id == teil.id){
                            if(teil.nummer == '50' || teil.nummer == '55' || teil.nummer == '30'){
                                erhoehung_kapbedarf_alt = fa.auftragsmenge * 5;
                                
                                // Berechnung des kapazitaetsbedarf_alt: 
                                kapazitaetsbedarf_alt = kapazitaetsbedarf_alt + erhoehung_kapbedarf_alt; 
                                console.log("kapazitaetsbedarf_alt: " + fa.auftragsmenge ); 
                                
                                // Berechnung der Rüstzeit_alt:
                                if (teil.nummer == '50' || teil.nummer == '55'){
                                zaheler_teile_ruestzeit_mulitplikator = zaheler_teile_ruestzeit_mulitplikator + 1;
                                }
                                if (teil.nummer == '30'){
                                    zaheler_teile_ruestzeit_mulitplikator_zwei = 1;
                                } 
                            }
                        }
                    }); 
                    ruestzeit_alt = 30*zaheler_teile_ruestzeit_mulitplikator_alt + 20 * zaheler_teile_ruestzeit_mulitplikator_zwei;   
                    gesamt_kapazitaet_pro_arbeitsplatz = kapazitaetsbedarf_neu + ruestzeit_neu + kapazitaetsbedarf_alt+ ruestzeit_alt;       
                }
                
                
                if(arbeitsplatz.nummer == 3){
                    console.log("Forschleife wird durchlaufen: "+ "  Arbeitsplatznr: "+ arbeitsplatz.nummer+ "  teil.nummer : "+ teil.nummer + " kapazitaetsbedarf: " + kapazitaetsbedarf_neu);
                        
                    if(teil.nummer == '51'){
                       erhoehung = teil.istmenge * 5; 
                       console.log("Erhöhung: "+ erhoehung); 
                    }
                    if(teil.nummer == '56' || teil.nummer == '31'){
                       erhoehung_zwei = teil.istmenge * 6; 
                       console.log("Erhöhung_2: "+ erhoehung_zwei);
                    }
   
                    //Berechnung des kapazitaetsbedarf_neu:
                    kapazitaetsbedarf_neu = kapazitaetsbedarf_neu + erhoehung; 
                    console.log("kapazitaetsbedarf" + kapazitaetsbedarf_neu); 
                        
                    //Berechnung der Rüstzeitmultiplikatoren: 
                    if (teil.istmenge != 0){
                        if (teil.nummer == '51' || teil.nummer == '56' || teil.nummer == '31'){
                            zaheler_teile_ruestzeit_mulitplikator = zaheler_teile_ruestzeit_mulitplikator + 1;
                        }                         
                    }
                    // Berechnung der Rüstzeit
                    ruestzeit_neu = 20 * zaheler_teile_ruestzeit_mulitplikator; 
                    console.log(" Arbeitsplatz: " + arbeitsplatz.nummer + " kapazitaetsbedarf_neu " + kapazitaetsbedarf_neu+ " ruestzeit_neu "+ruestzeit_neu + " Kap.bed.");
                                        
                    // Berechnung des Rückstands der Vorperiode:
                    fertigungsauftraege_wartend_und_in_bearbeitung.forEach(function(fa){
                        console.log("Fertigungsaufträge in Beabeitung werden jetzt durchlaufen: " );
                        
                        console.log("Fertigungsauftrag Herstellteilid: "+ fa.herstellteil.toString() );
                        
                        //Berechnung des alten Kap_bed.:
                        // würde ich sehr gerne auf teil.nummer ändern.
                        if (fa.herstellteil.id == teil.id){
                            if (teil.nummer == '56' || teil.nummer == '31'){
                                erhoehung_kapbedarf_alt = fa.auftragsmenge * 6;
                            } 
                            if (teil.nummer == '51'){
                                erhoehung_kapbedarf_alt_zwei = fa.auftragsmenge * 5;
                            }                              
                            // Berechnung des kapazitaetsbedarf_alt: 
                            kapazitaetsbedarf_alt = kapazitaetsbedarf_alt + erhoehung_kapbedarf_alt + erhoehung_kapbedarf_alt_zwei; 
                            console.log("kapazitaetsbedarf_alt: " + fa.auftragsmenge ); 
                                
                            // Berechnung der Rüstzeit_alt:
                            if (teil.nummer == '51' || teil.nummer == '56' || teil.nummer == '31'){
                            zaheler_teile_ruestzeit_mulitplikator = zaheler_teile_ruestzeit_mulitplikator + 1;
                            } 
                            
                        }
                    }); 
                    ruestzeit_alt = 20*zaheler_teile_ruestzeit_mulitplikator_alt;   
                    gesamt_kapazitaet_pro_arbeitsplatz = kapazitaetsbedarf_neu + ruestzeit_neu + kapazitaetsbedarf_alt+ ruestzeit_alt;      
            } 
            
            
            if(arbeitsplatz.nummer == 4){
                    console.log("Forschleife wird durchlaufen: "+ "  Arbeitsplatznr: "+ arbeitsplatz.nummer+ "  teil.nummer : "+ teil.nummer + " kapazitaetsbedarf: " + kapazitaetsbedarf_neu);
                        
                    if(teil.nummer == '51'){
                       erhoehung = teil.istmenge * 5; 
                       console.log("Erhöhung: "+ erhoehung); 
                    }
                    if(teil.nummer == '56' || teil.nummer == '31'){
                       erhoehung_zwei = teil.istmenge * 6; 
                       console.log("Erhöhung_2: "+ erhoehung_zwei);
                    }
   
                    //Berechnung des kapazitaetsbedarf_neu:
                    kapazitaetsbedarf_neu = kapazitaetsbedarf_neu + erhoehung; 
                    console.log("kapazitaetsbedarf" + kapazitaetsbedarf_neu); 
                        
                    //Berechnung der Rüstzeitmultiplikatoren: 
                    if (teil.istmenge != 0){
                        if (teil.nummer == '51' || teil.nummer == '56' || teil.nummer == '31'){
                            zaheler_teile_ruestzeit_mulitplikator = zaheler_teile_ruestzeit_mulitplikator + 1;
                        }                         
                    }
                    // Berechnung der Rüstzeit
                    ruestzeit_neu = 20 * zaheler_teile_ruestzeit_mulitplikator; 
                    console.log(" Arbeitsplatz: " + arbeitsplatz.nummer + " kapazitaetsbedarf_neu " + kapazitaetsbedarf_neu+ " ruestzeit_neu "+ruestzeit_neu + " Kap.bed.");
                                        
                    // Berechnung des Rückstands der Vorperiode:
                    fertigungsauftraege_wartend_und_in_bearbeitung.forEach(function(fa){
                        console.log("Fertigungsaufträge in Beabeitung werden jetzt durchlaufen: " );
                        
                        console.log("Fertigungsauftrag Herstellteilid: "+ fa.herstellteil.toString() );
                        
                        //Berechnung des alten Kap_bed.:
                        // würde ich sehr gerne auf teil.nummer ändern.
                        if (fa.herstellteil.id == teil.id){
                            if (teil.nummer == '56' || teil.nummer == '31'){
                                erhoehung_kapbedarf_alt = fa.auftragsmenge * 6;
                            } 
                            if (teil.nummer == '51'){
                                erhoehung_kapbedarf_alt_zwei = fa.auftragsmenge * 5;
                            }                              
                            // Berechnung des kapazitaetsbedarf_alt: 
                            kapazitaetsbedarf_alt = kapazitaetsbedarf_alt + erhoehung_kapbedarf_alt + erhoehung_kapbedarf_alt_zwei; 
                            console.log("kapazitaetsbedarf_alt: " + fa.auftragsmenge ); 
                                
                            // Berechnung der Rüstzeit_alt:
                            if (teil.nummer == '51' || teil.nummer == '56' || teil.nummer == '31'){
                            zaheler_teile_ruestzeit_mulitplikator = zaheler_teile_ruestzeit_mulitplikator + 1;
                            } 
                            
                        }
                    }); 
                    ruestzeit_alt = 20*zaheler_teile_ruestzeit_mulitplikator_alt;   
                    gesamt_kapazitaet_pro_arbeitsplatz = kapazitaetsbedarf_neu + ruestzeit_neu + kapazitaetsbedarf_alt+ ruestzeit_alt;      
            }
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
                    
            }); 
            
                            
            console.log("MEIN NEUES OOOOOOOOOBJEKT_EEEENDEEEEEEEE: "+ " Arbeitplatznr: "+ capacity.arbeitsplatznummer.toString() + " Kap.bed.neu "+ capacity.kapazitaetsbedarf_neu + 
            " ruestzeit_neu " + capacity.ruestzeit_neu + " kapazitaetsbedarf_alt: "+ capacity.kapazitaetsbedarf_alt + " ruestzeit_alt  "+  capacity.ruestzeit_alt + "  gesamter_kapazitaetsbedarf: " + capacity.gesamter_kapazitaetsbedarf 
            + " schichten: "+ capacity.schichten + " ueberstunden "+ capacity.ueberstunden ); 
            
            
            capacity_array.push(capacity);
            console.log("hat geklappt"); 
            
            
                   
        });
        
        
        
        return capacity_array; 
    }






} 
