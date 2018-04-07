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
                    console.log("Alle arbeitsplätze: "+ this.arbeitsplaetze.toString());


                this.fertigungsauftragService.query()
                .subscribe((res3: ResponseWrapper) => {

                    this.fertigungsauftraege = res3.json;
                    console.log("Fertigungsaufträge: "+this.fertigungsauftraege);

                    //sucht alle fertigungsaufträge raus, die den Status "wartend" und "bearbeitend" haben
                    this.fertigungsauftraege_wartend_und_in_bearbeitung = this.fertigungsauftraege.filter(function(fa_wartend_und_in_bearbeitung){

                    let auftragsstatuse = fa_wartend_und_in_bearbeitung.auftragsstatus.toString();
                    //console.log(auftragsstatuse);


                    if (auftragsstatuse == 'WARTEND' || auftragsstatuse == 'ANGEFANGEN')//|| auftragsstatuse == 'BEARBEITEND'
                    return (fa_wartend_und_in_bearbeitung)
                    
                    
                    });


                    for (let i = 0; i < this.fertigungsauftraege_wartend_und_in_bearbeitung.length; i++){
                        console.log(" Aufträge wartend und in Bearbeitung  "+ this.fertigungsauftraege_wartend_und_in_bearbeitung[i].toString());
                    };

                    this.capacity_array = this.matrixberechnung (this.arbeitsplaetze, this.teile_erzeugnis_produkt, this.fertigungsauftraege_wartend_und_in_bearbeitung);
                    
                    
                    //nach Arbeitsplätzen sortieren
                    this.capacity_array.sort( function (a,b){                   
                        if (a.arbeitsplatznummer > b.arbeitsplatznummer) {
                            return 1;
                        }
                        if (a.arbeitsplatznummer < b.arbeitsplatznummer) {
                         return -1;
                        }
                        // a muss gleich b sein
                        return 0;         
                    });                    
                    
                    
                    
                    let durchlauf = 1;
                    let restzeitbedarf_ruestzeit_7;
                    let restzeitbedarf_ruestzeit_8;
                    let restzeitbedarf_ruestzeit_9_15
                    let restzeitbedarf_ruestzeit_11;
                    let restzeitbedarf_ruestzeit_12;
                    let restzeitbedarf_ruestzeit_6;

                    let restzeitbedarf_kapazitaet_7;
                    let restzeitbedarf_kapazitaet_8;
                    let restzeitbedarf_kapazitaet_9_15
                    let restzeitbedarf_kapazitaet_11;
                    let restzeitbedarf_kapazitaet_12;
                    let restzeitbedarf_kapazitaet_6;

                    for (let i = 0; i < 6; i++){
                        this.capacity_array.forEach(function (arbeitsplatz){

                            console.log("Durchlauf: " + durchlauf + "  Arbeitsplatz:" + arbeitsplatz.arbeitsplatznummer +
                             "    kapazitaetsbedarf_alt:" + arbeitsplatz.kapazitaetsbedarf_alt.toString() +
                            + " rarbeitsplatz.ruestzeit_alt:  " + arbeitsplatz.ruestzeit_alt.toString()
                            + "  arbeitsplatz.gesamter_kapazitaetsbedarf: " + arbeitsplatz.gesamter_kapazitaetsbedarf.toString());


                        if(durchlauf == 1){
                            if (arbeitsplatz.arbeitsplatznummer == 10){
                                restzeitbedarf_kapazitaet_11 = arbeitsplatz.kapazitaetsbedarf_alt;
                                console.log("Restzeit- Kap : "+ restzeitbedarf_kapazitaet_11);
                                restzeitbedarf_ruestzeit_11 = arbeitsplatz.ruestzeit_alt;
                                console.log("Restzeit - Rüstzeit: "+ arbeitsplatz.ruestzeit_alt);
                            }
                            if (arbeitsplatz.arbeitsplatznummer == 13){
                                restzeitbedarf_kapazitaet_12 = arbeitsplatz.kapazitaetsbedarf_alt;
                                restzeitbedarf_ruestzeit_12 = arbeitsplatz.ruestzeit_alt;
                            }
                            if (arbeitsplatz.arbeitsplatznummer == 6){
                                restzeitbedarf_kapazitaet_6 = arbeitsplatz.kapazitaetsbedarf_alt;
                                restzeitbedarf_ruestzeit_6 = arbeitsplatz.ruestzeit_alt;
                            }
                        }
                        if(durchlauf == 2){
                            if (arbeitsplatz.arbeitsplatznummer == 11){
                                console.log("Zweiter Durchlauf für ABPL 11 durchlaufen");
                                arbeitsplatz.kapazitaetsbedarf_alt = arbeitsplatz.kapazitaetsbedarf_alt + restzeitbedarf_kapazitaet_11;
                                arbeitsplatz.ruestzeit_alt = arbeitsplatz.ruestzeit_alt + restzeitbedarf_ruestzeit_11;
                                arbeitsplatz.gesamter_kapazitaetsbedarf = arbeitsplatz.kapazitaetsbedarf_neu + arbeitsplatz.ruestzeit_neu + arbeitsplatz.kapazitaetsbedarf_alt + arbeitsplatz.ruestzeit_alt;
                            }
                            if (arbeitsplatz.arbeitsplatznummer == 12){
                                arbeitsplatz.kapazitaetsbedarf_alt = arbeitsplatz.kapazitaetsbedarf_alt + restzeitbedarf_kapazitaet_12;
                                arbeitsplatz.ruestzeit_alt = arbeitsplatz.ruestzeit_alt + restzeitbedarf_ruestzeit_12;
                                arbeitsplatz.gesamter_kapazitaetsbedarf = arbeitsplatz.kapazitaetsbedarf_neu + arbeitsplatz.ruestzeit_neu + arbeitsplatz.kapazitaetsbedarf_alt + arbeitsplatz.ruestzeit_alt;
                                restzeitbedarf_kapazitaet_8 = arbeitsplatz.kapazitaetsbedarf_alt;
                                restzeitbedarf_ruestzeit_8 = arbeitsplatz.ruestzeit_alt;
                                console.log("Arbeitsplatz 12: restzeitbedarf_kapazitaet_8: "+restzeitbedarf_kapazitaet_8 +"   restzeitbedarf_ruestzeit_8:  " +restzeitbedarf_ruestzeit_8);
                            }
                            if (arbeitsplatz.arbeitsplatznummer == 14){
                                arbeitsplatz.kapazitaetsbedarf_alt = arbeitsplatz.kapazitaetsbedarf_alt + restzeitbedarf_kapazitaet_6;
                                arbeitsplatz.ruestzeit_alt = arbeitsplatz.ruestzeit_alt + restzeitbedarf_ruestzeit_6;
                                arbeitsplatz.gesamter_kapazitaetsbedarf = arbeitsplatz.kapazitaetsbedarf_neu + arbeitsplatz.ruestzeit_neu + arbeitsplatz.kapazitaetsbedarf_alt + arbeitsplatz.ruestzeit_alt;
                                console.log("Arbeitsplatz 14: restzeitbedarf_kapazitaet_6: "+restzeitbedarf_kapazitaet_6 +"   restzeitbedarf_ruestzeit_6:  " +restzeitbedarf_ruestzeit_6);
                            }
                        }
                        if(durchlauf == 3){
                            if (arbeitsplatz.arbeitsplatznummer == 8){
                                arbeitsplatz.kapazitaetsbedarf_alt = arbeitsplatz.kapazitaetsbedarf_alt + restzeitbedarf_kapazitaet_6 + restzeitbedarf_kapazitaet_8;
                                arbeitsplatz.ruestzeit_alt = arbeitsplatz.ruestzeit_alt + restzeitbedarf_kapazitaet_6 + restzeitbedarf_ruestzeit_8;
                                arbeitsplatz.gesamter_kapazitaetsbedarf = arbeitsplatz.kapazitaetsbedarf_neu + arbeitsplatz.ruestzeit_neu + arbeitsplatz.kapazitaetsbedarf_alt + arbeitsplatz.ruestzeit_alt;
                                console.log("Arbeitsplatz 8: arbeitsplatz.kapazitaetsbedarf_alt: "+arbeitsplatz.kapazitaetsbedarf_alt +"   rarbeitsplatz.ruestzeit_alt:  " + arbeitsplatz.ruestzeit_alt + "  arbeitsplatz.gesamter_kapazitaetsbedarf: " +arbeitsplatz.gesamter_kapazitaetsbedarf);
                                restzeitbedarf_kapazitaet_7 = arbeitsplatz.kapazitaetsbedarf_alt;
                                restzeitbedarf_ruestzeit_7 = arbeitsplatz.ruestzeit_alt;
                            }
                        }
                        if(durchlauf == 4){
                            if (arbeitsplatz.arbeitsplatznummer == 7){
                                arbeitsplatz.kapazitaetsbedarf_alt = arbeitsplatz.kapazitaetsbedarf_alt + restzeitbedarf_kapazitaet_7;
                                arbeitsplatz.ruestzeit_alt = arbeitsplatz.ruestzeit_alt + restzeitbedarf_ruestzeit_7;
                                arbeitsplatz.gesamter_kapazitaetsbedarf = arbeitsplatz.kapazitaetsbedarf_neu + arbeitsplatz.ruestzeit_neu + arbeitsplatz.kapazitaetsbedarf_alt + arbeitsplatz.ruestzeit_alt;
                                restzeitbedarf_kapazitaet_9_15 = arbeitsplatz.kapazitaetsbedarf_alt;
                                restzeitbedarf_ruestzeit_9_15 = arbeitsplatz.ruestzeit_alt;
                            }
                        }
                        if(durchlauf == 5){
                            if (arbeitsplatz.arbeitsplatznummer == 9){
                                arbeitsplatz.kapazitaetsbedarf_alt = arbeitsplatz.kapazitaetsbedarf_alt + restzeitbedarf_kapazitaet_9_15;
                                arbeitsplatz.ruestzeit_alt = arbeitsplatz.ruestzeit_alt + restzeitbedarf_ruestzeit_9_15;
                                arbeitsplatz.gesamter_kapazitaetsbedarf = arbeitsplatz.kapazitaetsbedarf_neu + arbeitsplatz.ruestzeit_neu + arbeitsplatz.kapazitaetsbedarf_alt + arbeitsplatz.ruestzeit_alt;
                            }
                            if (arbeitsplatz.arbeitsplatznummer == 15){
                                arbeitsplatz.kapazitaetsbedarf_alt = arbeitsplatz.kapazitaetsbedarf_alt + restzeitbedarf_kapazitaet_9_15;
                                arbeitsplatz.ruestzeit_alt = arbeitsplatz.ruestzeit_alt + restzeitbedarf_ruestzeit_9_15;
                                arbeitsplatz.gesamter_kapazitaetsbedarf = arbeitsplatz.kapazitaetsbedarf_neu + arbeitsplatz.ruestzeit_neu + arbeitsplatz.kapazitaetsbedarf_alt + arbeitsplatz.ruestzeit_alt;
                            }

                        }
                    });
                        durchlauf = durchlauf+1;
                    }



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
        let ueberstunden;
        let erhoehung_drei;
        let zaheler_teile_ruestzeit_mulitplikator_drei;
        let erhoehung_kapbedarf_alt_drei;
        let zaheler_teile_ruestzeit_mulitplikator_alt_zwei;
        let zaheler_teile_ruestzeit_mulitplikator_alt_drei;


            //muss man am Schull rauslöschen, aber grad ists praktisch zu sehen, obs was rechnet:



        arbeitsplaetze.forEach(function (arbeitsplatz){
            console.log("Arbeitsplatz " + arbeitsplatz.nummer.toString());

            //initalisieren der Variablen, damit sie nicht undefined sind.
            let capacity = new Capacity;
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
            ueberstunden = 0;
            erhoehung_drei = 0;
            zaheler_teile_ruestzeit_mulitplikator_drei = 0;
            erhoehung_kapbedarf_alt_drei = 0;
            zaheler_teile_ruestzeit_mulitplikator_alt_zwei = 0;
            zaheler_teile_ruestzeit_mulitplikator_alt_drei = 0;

            teile_erzeugnis_produkt.forEach(function (teil){
                
                console.log("teile_erzeugnis_produkt: teil-Nr: "+teil.nummer); 

                if(arbeitsplatz.nummer == 1){

                    if(teil.nummer == 49 || teil.nummer == 54 || teil.nummer == 29) {
                        erhoehung = teil.istmenge * 6;
                        kapazitaetsbedarf_neu = kapazitaetsbedarf_neu + erhoehung;
                        if (teil.istmenge != 0){
                            zaheler_teile_ruestzeit_mulitplikator = zaheler_teile_ruestzeit_mulitplikator + 1;
                        }
                    }
                    ruestzeit_neu = 20 * zaheler_teile_ruestzeit_mulitplikator;
                    
                    
                    if(fertigungsauftraege_wartend_und_in_bearbeitung == null){
                        console.log("wtf");
                    }
                    console.log(" halooooooo  " );

                    //Berechnung des Rückstands der Vorperiode
                    fertigungsauftraege_wartend_und_in_bearbeitung.forEach(function(fa){
                        
                        console.log("fertigungsauftraege_wartend_und_in_bearbeitung"+ fa.toString());
                        
                        console.log("MAL ACHTEN!!!!!   fa.herstellteil: "+fa.herstellteil + "  teil.nummer: "+teil.nummer); 
                        //würde ich sehr gerne auf teil.nummer ändern.
                        if (fa.herstellteil != null){
                            console.log(" Herstellteil ist definiert"); 
                            if (fa.herstellteil == teil.nummer){
                                if(teil.nummer == 49 || teil.nummer == 54 || teil.nummer == 29){
                                    erhoehung_kapbedarf_alt = fa.auftragsmenge*6;
                                    
                                    console.log("Mein neuer Kap.bedarf: "+erhoehung_kapbedarf_alt); 
                                    
                                    kapazitaetsbedarf_alt = kapazitaetsbedarf_alt + erhoehung_kapbedarf_alt;
                                    zaheler_teile_ruestzeit_mulitplikator_alt = zaheler_teile_ruestzeit_mulitplikator_alt+1;
                                }
                            }
                        }
                    });
                    ruestzeit_alt = 20*zaheler_teile_ruestzeit_mulitplikator_alt;
                    gesamt_kapazitaet_pro_arbeitsplatz = kapazitaetsbedarf_neu + ruestzeit_neu + kapazitaetsbedarf_alt+ ruestzeit_alt;

                    if(gesamt_kapazitaet_pro_arbeitsplatz > 2400){
                        schichten = (gesamt_kapazitaet_pro_arbeitsplatz/2400);
                        schichten = parseInt(schichten);
                        ueberstunden = gesamt_kapazitaet_pro_arbeitsplatz - schichten*2400;
                        ueberstunden_pro_tag = ueberstunden/5;
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

                }


                //Arbeitsplatz2
                if(arbeitsplatz.nummer == 2){

                    //Durchlaufen aller Teile die in diesem Arbeitsplatz bearbeitet werden
                    if(teil.nummer == 50 || teil.nummer == 55 || teil.nummer == 30){

                        erhoehung = teil.istmenge * 5;
                        //Berechnung des kapazitaetsbedarf_neu:
                        kapazitaetsbedarf_neu = kapazitaetsbedarf_neu + erhoehung;


                        //Berechnung der Rüstzeitmultiplikatoren:
                        if (teil.istmenge != 0){
                            if (teil.nummer == 50 || teil.nummer == 55){
                                zaheler_teile_ruestzeit_mulitplikator = zaheler_teile_ruestzeit_mulitplikator + 1;
                            }
                            if (teil.nummer == 30){
                                zaheler_teile_ruestzeit_mulitplikator_zwei = 1;
                            }
                        }
                    }
                    // Berechnung der Rüstzeit
                    ruestzeit_neu = 30 * zaheler_teile_ruestzeit_mulitplikator + 20 * zaheler_teile_ruestzeit_mulitplikator_zwei;


                    // Berechnung des Rückstands der Vorperiode:
                    fertigungsauftraege_wartend_und_in_bearbeitung.forEach(function(fa){


                        //Berechnung des alten Kap_bed.:
                        // würde ich sehr gerne auf teil.nummer ändern.
                        if (fa.herstellteil != null){
                            console.log(" Herstellteil ist definiert"); 

                            if (fa.herstellteil == teil.nummer){
                                if(teil.nummer == 50 || teil.nummer == 55 || teil.nummer == 30){
                                    erhoehung_kapbedarf_alt = fa.auftragsmenge * 5;

                                    // Berechnung des kapazitaetsbedarf_alt:
                                    kapazitaetsbedarf_alt = kapazitaetsbedarf_alt + erhoehung_kapbedarf_alt;

                                    // Berechnung der Rüstzeit_alt:
                                    if (teil.nummer == 50 || teil.nummer == 55){
                                    zaheler_teile_ruestzeit_mulitplikator_alt = zaheler_teile_ruestzeit_mulitplikator_alt + 1;
                                    }
                                    if (teil.nummer == 30){
                                        zaheler_teile_ruestzeit_mulitplikator_alt_zwei = 1;
                                    }
                                }
                            }
                        }
                    });
                    ruestzeit_alt = 30 * zaheler_teile_ruestzeit_mulitplikator_alt + 20 * zaheler_teile_ruestzeit_mulitplikator_alt_zwei;
                    gesamt_kapazitaet_pro_arbeitsplatz = kapazitaetsbedarf_neu + ruestzeit_neu + kapazitaetsbedarf_alt+ ruestzeit_alt;


                    if(gesamt_kapazitaet_pro_arbeitsplatz > 2400) {
                        schichten = (gesamt_kapazitaet_pro_arbeitsplatz/2400);
                        schichten = parseInt(schichten);
                        ueberstunden = gesamt_kapazitaet_pro_arbeitsplatz - schichten*2400;
                        ueberstunden_pro_tag = ueberstunden/5;
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


                if(arbeitsplatz.nummer == 3){
                    console.log("Forschleife wird durchlaufen: "+ "  Arbeitsplatznr: "+ arbeitsplatz.nummer+ "  teil.nummer : "+ teil.nummer + " kapazitaetsbedarf: " + kapazitaetsbedarf_neu);

                    if(teil.nummer == 51){
                       erhoehung = teil.istmenge * 5;
                       console.log("Erhöhung: "+ erhoehung);
                    }
                    if(teil.nummer == 56 || teil.nummer == 31){
                       erhoehung_zwei = teil.istmenge * 6;
                       console.log("Erhöhung_2: "+ erhoehung_zwei);
                    }

                    //Berechnung des kapazitaetsbedarf_neu:
                    kapazitaetsbedarf_neu = kapazitaetsbedarf_neu + erhoehung + erhoehung_zwei;
                    console.log("kapazitaetsbedarf" + kapazitaetsbedarf_neu);

                    //Berechnung der Rüstzeitmultiplikatoren:
                    if (teil.istmenge != 0){
                        if (teil.nummer == 51 || teil.nummer == 56 || teil.nummer == 31){
                            zaheler_teile_ruestzeit_mulitplikator = zaheler_teile_ruestzeit_mulitplikator + 1;
                        }
                    }
                    // Berechnung der Rüstzeit
                    ruestzeit_neu = 20 * zaheler_teile_ruestzeit_mulitplikator;
                    console.log(" Arbeitsplatz: " + arbeitsplatz.nummer + " kapazitaetsbedarf_neu " + kapazitaetsbedarf_neu+ " ruestzeit_neu "+ruestzeit_neu + " Kap.bed.");

                    // Berechnung des Rückstands der Vorperiode:
                    fertigungsauftraege_wartend_und_in_bearbeitung.forEach(function(fa){
                        console.log("Fertigungsaufträge in Beabeitung werden jetzt durchlaufen: " );

                        //Berechnung des alten Kap_bed.:
                        // würde ich sehr gerne auf teil.nummer ändern.
                        if (fa.herstellteil != null){
                            console.log(" Herstellteil ist definiert");
                            if (fa.herstellteil == teil.nummer){
                                if (teil.nummer == 56 || teil.nummer == 31){
                                    erhoehung_kapbedarf_alt = fa.auftragsmenge * 6;
                                }
                                if (teil.nummer == 51){
                                    erhoehung_kapbedarf_alt_zwei = fa.auftragsmenge * 5;
                                }
                                // Berechnung des kapazitaetsbedarf_alt:
                                kapazitaetsbedarf_alt = kapazitaetsbedarf_alt + erhoehung_kapbedarf_alt + erhoehung_kapbedarf_alt_zwei;
                                console.log("kapazitaetsbedarf_alt: " + fa.auftragsmenge );

                                // Berechnung der Rüstzeit_alt:
                                if (teil.nummer == 51 || teil.nummer == 56 || teil.nummer == 31){
                                    zaheler_teile_ruestzeit_mulitplikator_alt = zaheler_teile_ruestzeit_mulitplikator_alt + 1;
                                }
                            }
                        }
                    });
                    ruestzeit_alt = 20*zaheler_teile_ruestzeit_mulitplikator_alt;
                    gesamt_kapazitaet_pro_arbeitsplatz = kapazitaetsbedarf_neu + ruestzeit_neu + kapazitaetsbedarf_alt+ ruestzeit_alt;


                    if(gesamt_kapazitaet_pro_arbeitsplatz > 2400) {
                        schichten = (gesamt_kapazitaet_pro_arbeitsplatz/2400);
                        schichten = parseInt(schichten);
                        ueberstunden = gesamt_kapazitaet_pro_arbeitsplatz - schichten*2400;
                        ueberstunden_pro_tag = ueberstunden/5;
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

            }


            if(arbeitsplatz.nummer == 4){
                    console.log("Forschleife wird durchlaufen: "+ "  Arbeitsplatznr: "+ arbeitsplatz.nummer+ "  teil.nummer : "+ teil.nummer + " kapazitaetsbedarf: " + kapazitaetsbedarf_neu);

                    if(teil.nummer == 1){
                       erhoehung = teil.istmenge * 6;
                       console.log("Erhöhung: "+ erhoehung);
                    }
                    if(teil.nummer == 2 || teil.nummer == 3){
                       erhoehung_zwei = teil.istmenge * 7;
                       console.log("Erhöhung_2: "+ erhoehung_zwei);
                    }

                    //Berechnung des kapazitaetsbedarf_neu:
                    kapazitaetsbedarf_neu = kapazitaetsbedarf_neu + erhoehung + erhoehung_zwei;
                    console.log("kapazitaetsbedarf" + kapazitaetsbedarf_neu);

                    //Berechnung der Rüstzeitmultiplikatoren:
                    if (teil.istmenge != 0){
                        if (teil.nummer == 1 || teil.nummer == 3){
                            zaheler_teile_ruestzeit_mulitplikator = zaheler_teile_ruestzeit_mulitplikator + 1;
                        }
                        if (teil.nummer == 2){
                            zaheler_teile_ruestzeit_mulitplikator_zwei = zaheler_teile_ruestzeit_mulitplikator_zwei + 1;
                        }
                    }
                    // Berechnung der Rüstzeit
                    ruestzeit_neu = 30 * zaheler_teile_ruestzeit_mulitplikator + 20*zaheler_teile_ruestzeit_mulitplikator_zwei;
                    console.log(" Arbeitsplatz: " + arbeitsplatz.nummer + " kapazitaetsbedarf_neu " + kapazitaetsbedarf_neu+ " ruestzeit_neu "+ruestzeit_neu + " Kap.bed.");

                    // Berechnung des Rückstands der Vorperiode:
                    fertigungsauftraege_wartend_und_in_bearbeitung.forEach(function(fa){
                        console.log("Fertigungsaufträge in Beabeitung werden jetzt durchlaufen: " );

                        //Berechnung des alten Kap_bed.:
                        // würde ich sehr gerne auf teil.nummer ändern.
                    
                        if (fa.herstellteil != null){
                            console.log(" Herstellteil ist definiert");
                            if (fa.herstellteil == teil.nummer){
                                if (teil.nummer == 1){
                                    erhoehung_kapbedarf_alt = fa.auftragsmenge * 6;
                                }
                                if (teil.nummer == 2 ||teil.nummer == 3){
                                    erhoehung_kapbedarf_alt_zwei = fa.auftragsmenge * 7;
                                }
                                // Berechnung des kapazitaetsbedarf_alt:
                                kapazitaetsbedarf_alt = kapazitaetsbedarf_alt + erhoehung_kapbedarf_alt + erhoehung_kapbedarf_alt_zwei;
                                console.log("kapazitaetsbedarf_alt: " + fa.auftragsmenge );

                                // Berechnung der Rüstzeit_alt:
                                if (teil.nummer == 1 || teil.nummer == 3){
                                    zaheler_teile_ruestzeit_mulitplikator_alt = zaheler_teile_ruestzeit_mulitplikator + 1;
                                }
                                if (teil.nummer == 2) {
                                    zaheler_teile_ruestzeit_mulitplikator_alt_zwei = zaheler_teile_ruestzeit_mulitplikator_alt_zwei + 1;
                                }

                            }
                        }
                    });
                    ruestzeit_alt = 30*zaheler_teile_ruestzeit_mulitplikator_alt + 20*zaheler_teile_ruestzeit_mulitplikator_zwei ;
                    gesamt_kapazitaet_pro_arbeitsplatz = kapazitaetsbedarf_neu + ruestzeit_neu + kapazitaetsbedarf_alt+ ruestzeit_alt;

                    if(gesamt_kapazitaet_pro_arbeitsplatz > 2400) {
                        schichten = (gesamt_kapazitaet_pro_arbeitsplatz/2400);
                        schichten = parseInt(schichten);
                        ueberstunden = gesamt_kapazitaet_pro_arbeitsplatz - schichten*2400;
                        ueberstunden_pro_tag = ueberstunden/5;
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

            }

            if(arbeitsplatz.nummer == 5){
                capacity.arbeitsplatznummer = arbeitsplatz.nummer;
                capacity.kapazitaetsbedarf_neu = 0;
                capacity.ruestzeit_neu = 0;
                capacity.kapazitaetsbedarf_alt = 0;
                capacity.ruestzeit_alt = 0;
                capacity.gesamter_kapazitaetsbedarf = 0;
                capacity.schichten = 0;
                capacity.ueberstunden = 0;
            }

            if (arbeitsplatz.nummer == 6){
                console.log("Forschleife wird durchlaufen: "+ "  Arbeitsplatznr: "+ arbeitsplatz.nummer+ "  teil.nummer : "+ teil.nummer + " kapazitaetsbedarf: " + kapazitaetsbedarf_neu);

                    if(teil.nummer == 16){
                       erhoehung = teil.istmenge * 2;
                       console.log("Erhöhung: "+ erhoehung);
                    }
                    if(teil.nummer == 18 || teil.nummer == 19|| teil.nummer == 20){
                       erhoehung_zwei = teil.istmenge * 3;
                       console.log("Erhöhung_2: "+ erhoehung_zwei);
                    }

                    //Berechnung des kapazitaetsbedarf_neu:
                    kapazitaetsbedarf_neu = kapazitaetsbedarf_neu + erhoehung + erhoehung_zwei;
                    console.log("kapazitaetsbedarf" + kapazitaetsbedarf_neu);

                    //Berechnung der Rüstzeitmultiplikatoren:
                    if (teil.istmenge != 0){
                        if (teil.nummer == 16 || teil.nummer == 18 || teil.nummer == 19|| teil.nummer == 20){
                            zaheler_teile_ruestzeit_mulitplikator = zaheler_teile_ruestzeit_mulitplikator + 1;
                        }
                    }
                    // Berechnung der Rüstzeit
                    ruestzeit_neu = 15 * zaheler_teile_ruestzeit_mulitplikator;
                    console.log(" Arbeitsplatz: " + arbeitsplatz.nummer + " kapazitaetsbedarf_neu " + kapazitaetsbedarf_neu+ " ruestzeit_neu "+ruestzeit_neu + " Kap.bed.");

                    // Berechnung des Rückstands der Vorperiode:
                    fertigungsauftraege_wartend_und_in_bearbeitung.forEach(function(fa){
                        console.log("Fertigungsaufträge in Beabeitung werden jetzt durchlaufen: " );

                        //Berechnung des alten Kap_bed.:
                        // würde ich sehr gerne auf teil.nummer ändern.
                        if (fa.herstellteil != null){
                            console.log(" Herstellteil ist definiert");
                            if (fa.herstellteil == teil.nummer){
                                if (teil.nummer == 16){
                                    erhoehung_kapbedarf_alt = fa.auftragsmenge * 2;
                                }
                                if (teil.nummer == 18 || teil.nummer == 19|| teil.nummer == 20){
                                    erhoehung_kapbedarf_alt_zwei = fa.auftragsmenge * 3;
                                }
                                // Berechnung des kapazitaetsbedarf_alt:
                                kapazitaetsbedarf_alt = kapazitaetsbedarf_alt + erhoehung_kapbedarf_alt + erhoehung_kapbedarf_alt_zwei;
                                console.log("kapazitaetsbedarf_alt: " + fa.auftragsmenge );

                                // Berechnung der Rüstzeit_alt:
                                if (teil.nummer == 16 || teil.nummer == 18 || teil.nummer == 19|| teil.nummer == 20){
                                    zaheler_teile_ruestzeit_mulitplikator_alt = zaheler_teile_ruestzeit_mulitplikator_alt + 1;
                                }
                            }
                        }
                    });
                    ruestzeit_alt = 15 * zaheler_teile_ruestzeit_mulitplikator_alt;
                    gesamt_kapazitaet_pro_arbeitsplatz = kapazitaetsbedarf_neu + ruestzeit_neu + kapazitaetsbedarf_alt+ ruestzeit_alt;


                    if(gesamt_kapazitaet_pro_arbeitsplatz > 2400) {
                        schichten = (gesamt_kapazitaet_pro_arbeitsplatz/2400);
                        schichten = parseInt(schichten);
                        ueberstunden = gesamt_kapazitaet_pro_arbeitsplatz - schichten*2400;
                        ueberstunden_pro_tag = ueberstunden/5;
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

            }

            if (arbeitsplatz.nummer == 13){
                if(teil.nummer == 10 || teil.nummer == 11 ||teil.nummer == 12 ||teil.nummer == 13 ||teil.nummer == 14 ||teil.nummer == 15) {
                    console.log("Forschleife wird durchlaufen: "+ "  Arbeitsplatznr: "+ arbeitsplatz.nummer+ "  teil.nummer : "+ teil.nummer + " kapazitaetsbedarf: " + kapazitaetsbedarf_neu);
                    erhoehung = teil.istmenge * 2;
                    kapazitaetsbedarf_neu = kapazitaetsbedarf_neu + erhoehung;
                }
                    ruestzeit_neu = 0;
                    console.log(" Arbeitsplatz: " + arbeitsplatz.nummer + " kapazitaetsbedarf_neu " + kapazitaetsbedarf_neu+ " ruestzeit_neu "+ruestzeit_neu + " Kap.bed.");

                    console.log("Teilid: "+teil.id + " + Teil.nummer: " + teil.nummer );
                    //Berechnung des Rückstands der Vorperiode
                    fertigungsauftraege_wartend_und_in_bearbeitung.forEach(function(fa){
                        console.log("Fertigungsaufträge in Beabeitung werden jetzt durchlaufen: " );

                        //würde ich sehr gerne auf teil.nummer ändern.
                        if (fa.herstellteil != null){
                            console.log(" Herstellteil ist definiert");
                            if (fa.herstellteil == teil.nummer){
                                if(teil.nummer == 10 || teil.nummer == 11 ||teil.nummer == 12 ||teil.nummer == 13 ||teil.nummer == 14 ||teil.nummer == 15){
                                    erhoehung_kapbedarf_alt = fa.auftragsmenge*2;
                                    kapazitaetsbedarf_alt = kapazitaetsbedarf_alt + erhoehung_kapbedarf_alt;
                                }
                            }
                        }

                    });
                    ruestzeit_alt = 0;
                    gesamt_kapazitaet_pro_arbeitsplatz = kapazitaetsbedarf_neu + ruestzeit_neu + kapazitaetsbedarf_alt+ ruestzeit_alt;

                    if(gesamt_kapazitaet_pro_arbeitsplatz > 2400){
                        schichten = (gesamt_kapazitaet_pro_arbeitsplatz/2400);
                        schichten = parseInt(schichten);
                        ueberstunden = gesamt_kapazitaet_pro_arbeitsplatz - schichten*2400;
                        ueberstunden_pro_tag = ueberstunden/5;
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

            }

            //AB HIER AUFPASSEN!!!!
            if (arbeitsplatz.nummer == 12){
                if(teil.nummer == 10 || teil.nummer == 11 ||teil.nummer == 12 ||teil.nummer == 13 ||teil.nummer == 14 ||teil.nummer == 15) {
                    console.log("Forschleife wird durchlaufen: "+ "  Arbeitsplatznr: "+ arbeitsplatz.nummer+ "  teil.nummer : "+ teil.nummer + " kapazitaetsbedarf: " + kapazitaetsbedarf_neu);
                    erhoehung = teil.istmenge * 3;
                    kapazitaetsbedarf_neu = kapazitaetsbedarf_neu + erhoehung;
                }
                    ruestzeit_neu = 0;
                    console.log(" Arbeitsplatz: " + arbeitsplatz.nummer + " kapazitaetsbedarf_neu " + kapazitaetsbedarf_neu+ " ruestzeit_neu "+ruestzeit_neu + " Kap.bed.");

                    console.log("Teilid: "+teil.id + " + Teil.nummer: " + teil.nummer );
                    //Berechnung des Rückstands der Vor<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                    fertigungsauftraege_wartend_und_in_bearbeitung.forEach(function(fa){
                        console.log("Fertigungsaufträge in Beabeitung werden jetzt durchlaufen: " );

                        //würde ich sehr gerne auf teil.nummer ändern.
                        if (fa.herstellteil != null){
                            console.log(" Herstellteil ist definiert");
                        if (fa.herstellteil == teil.nummer){
                            if(teil.nummer == 10 || teil.nummer == 11 ||teil.nummer == 12 ||teil.nummer == 13 ||teil.nummer == 14 ||teil.nummer == 15){
                                erhoehung_kapbedarf_alt = fa.auftragsmenge*3;
                                kapazitaetsbedarf_alt = kapazitaetsbedarf_alt + erhoehung_kapbedarf_alt;
                            }
                        }}

                    });
                    ruestzeit_alt = 0;
                    gesamt_kapazitaet_pro_arbeitsplatz = kapazitaetsbedarf_neu + ruestzeit_neu + kapazitaetsbedarf_alt+ ruestzeit_alt;

                    if(gesamt_kapazitaet_pro_arbeitsplatz > 2400){
                        schichten = (gesamt_kapazitaet_pro_arbeitsplatz/2400);
                        schichten = parseInt(schichten);
                        ueberstunden = gesamt_kapazitaet_pro_arbeitsplatz - schichten*2400;
                        ueberstunden_pro_tag = ueberstunden/5;
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
            }

            if (arbeitsplatz.nummer == 8){
               console.log("Forschleife wird durchlaufen: "+ "  Arbeitsplatznr: "+ arbeitsplatz.nummer+ "  teil.nummer : "+ teil.nummer + " kapazitaetsbedarf: " + kapazitaetsbedarf_neu);

                if(teil.nummer == 10 || teil.nummer == 13) {
                    erhoehung = teil.istmenge * 1;
                }
                if(teil.nummer == 11 || teil.nummer == 12|| teil.nummer == 14|| teil.nummer == 15) {
                    erhoehung_zwei = teil.istmenge * 2;
                }

                if(teil.nummer == 18 || teil.nummer == 19|| teil.nummer == 20) {
                    erhoehung_drei = teil.istmenge * 3;
                }

                    //Berechnung des kapazitaetsbedarf_neu:
                    kapazitaetsbedarf_neu = kapazitaetsbedarf_neu + erhoehung + erhoehung_zwei + erhoehung_drei;
                    console.log("kapazitaetsbedarf" + kapazitaetsbedarf_neu);

                    //Berechnung der Rüstzeitmultiplikatoren:
                    if (teil.istmenge != 0){
                        if (teil.nummer == 10 || teil.nummer == 13|| teil.nummer == 11 || teil.nummer == 12|| teil.nummer == 14|| teil.nummer == 15) {
                            zaheler_teile_ruestzeit_mulitplikator = zaheler_teile_ruestzeit_mulitplikator + 1;
                        }
                        if (teil.nummer == 18 || teil.nummer == 19|| teil.nummer == 20){
                            zaheler_teile_ruestzeit_mulitplikator_zwei = zaheler_teile_ruestzeit_mulitplikator_zwei + 1;
                        }
                        if (teil.nummer == 19){
                            zaheler_teile_ruestzeit_mulitplikator_drei = zaheler_teile_ruestzeit_mulitplikator_drei + 1;
                        }

                    }
                    // Berechnung der Rüstzeit
                    ruestzeit_neu = 15 * zaheler_teile_ruestzeit_mulitplikator + 20 * zaheler_teile_ruestzeit_mulitplikator_zwei + 25 * zaheler_teile_ruestzeit_mulitplikator_drei;
                    console.log(" Arbeitsplatz: " + arbeitsplatz.nummer + " kapazitaetsbedarf_neu " + kapazitaetsbedarf_neu+ " ruestzeit_neu "+ruestzeit_neu + " Kap.bed.");

                    // Berechnung des Rückstands der Vorperiode:
                    fertigungsauftraege_wartend_und_in_bearbeitung.forEach(function(fa){
                        console.log("Fertigungsaufträge in Beabeitung werden jetzt durchlaufen: " );

                        //Berechnung des alten Kap_bed.:
                        // würde ich sehr gerne auf teil.nummer ändern.
                    if (fa.herstellteil != null){
                            console.log(" Herstellteil ist definiert");
                            if (fa.herstellteil == teil.nummer){
                                if (teil.nummer == 10 || teil.nummer == 13){
                                    erhoehung_kapbedarf_alt = fa.auftragsmenge * 1;
                                }
                                if (teil.nummer == 11 || teil.nummer == 12|| teil.nummer == 14|| teil.nummer == 15){
                                    erhoehung_kapbedarf_alt_zwei = fa.auftragsmenge * 2;
                                }
                                if ( teil.nummer == 18 || teil.nummer == 19|| teil.nummer == 20){
                                    erhoehung_kapbedarf_alt_drei = fa.auftragsmenge * 3;
                                }
                            }
                    }

                            // Berechnung des kapazitaetsbedarf_alt:
                            kapazitaetsbedarf_alt = kapazitaetsbedarf_alt + erhoehung_kapbedarf_alt + erhoehung_kapbedarf_alt_zwei + erhoehung_kapbedarf_alt_drei;
                            console.log("kapazitaetsbedarf_alt: " + fa.auftragsmenge );

                            // Berechnung der Rüstzeit_alt:
                            if (teil.nummer == 18 || teil.nummer == 20){
                                zaheler_teile_ruestzeit_mulitplikator_alt = zaheler_teile_ruestzeit_mulitplikator_alt + 1;
                            }
                            if (teil.nummer == 10 || teil.nummer == 11 || teil.nummer == 12|| teil.nummer == 13 || teil.nummer == 14|| teil.nummer == 15){
                                zaheler_teile_ruestzeit_mulitplikator_alt_zwei = zaheler_teile_ruestzeit_mulitplikator_alt_zwei + 1;
                            }
                            if (teil.nummer == 19){
                                zaheler_teile_ruestzeit_mulitplikator_alt_drei = zaheler_teile_ruestzeit_mulitplikator_alt_drei + 1;
                            }

                        
                    });
                    ruestzeit_alt = 20 * zaheler_teile_ruestzeit_mulitplikator_alt + 15 * zaheler_teile_ruestzeit_mulitplikator_alt_zwei + 25* zaheler_teile_ruestzeit_mulitplikator_alt_drei;
                    gesamt_kapazitaet_pro_arbeitsplatz = kapazitaetsbedarf_neu + ruestzeit_neu + kapazitaetsbedarf_alt+ ruestzeit_alt;


                    if(gesamt_kapazitaet_pro_arbeitsplatz > 2400) {
                        schichten = (gesamt_kapazitaet_pro_arbeitsplatz/2400);
                        schichten = parseInt(schichten);
                        ueberstunden = gesamt_kapazitaet_pro_arbeitsplatz - schichten*2400;
                        ueberstunden_pro_tag = ueberstunden/5;
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


            }


            if(arbeitsplatz.nummer == 7){
                console.log("Forschleife wird durchlaufen: "+ "  Arbeitsplatznr: "+ arbeitsplatz.nummer+ "  teil.nummer : "+ teil.nummer + " kapazitaetsbedarf: " + kapazitaetsbedarf_neu);

                if(teil.nummer == 10 || teil.nummer == 11 || teil.nummer == 12|| teil.nummer == 13 || teil.nummer == 14|| teil.nummer == 15|| teil.nummer == 18 || teil.nummer == 19|| teil.nummer == 20|| teil.nummer == 26) {
                    erhoehung = teil.istmenge * 2;
                    console.log("Erhöhung: "+ erhoehung);
                }

                    //Berechnung des kapazitaetsbedarf_neu:
                    kapazitaetsbedarf_neu = kapazitaetsbedarf_neu + erhoehung;
                    console.log("kapazitaetsbedarf" + kapazitaetsbedarf_neu);

                    //Berechnung der Rüstzeitmultiplikatoren:
                    if (teil.istmenge != 0){
                        if (teil.nummer == 26) {
                            zaheler_teile_ruestzeit_mulitplikator = zaheler_teile_ruestzeit_mulitplikator + 1;
                        }
                        if (teil.nummer == 10 || teil.nummer == 11 || teil.nummer == 12|| teil.nummer == 13 || teil.nummer == 14|| teil.nummer == 15|| teil.nummer == 18 || teil.nummer == 19|| teil.nummer == 20){
                            zaheler_teile_ruestzeit_mulitplikator_zwei = zaheler_teile_ruestzeit_mulitplikator_zwei + 1;
                        }

                    }
                    // Berechnung der Rüstzeit
                    ruestzeit_neu = 30 * zaheler_teile_ruestzeit_mulitplikator + 20 * zaheler_teile_ruestzeit_mulitplikator_zwei;
                    console.log(" Arbeitsplatz: " + arbeitsplatz.nummer + " kapazitaetsbedarf_neu " + kapazitaetsbedarf_neu+ " ruestzeit_neu "+ruestzeit_neu + " Kap.bed.");

                    // Berechnung des Rückstands der Vorperiode:
                    fertigungsauftraege_wartend_und_in_bearbeitung.forEach(function(fa){
                        console.log("Fertigungsaufträge in Beabeitung werden jetzt durchlaufen: " );

                        //Berechnung des alten Kap_bed.:
                        // würde ich sehr gerne auf teil.nummer ändern.
                        
                        if (fa.herstellteil != null){
                                console.log(" Herstellteil ist definiert");    
                            if (fa.herstellteil == teil.nummer){
                                if (teil.nummer == 10 || teil.nummer == 11 || teil.nummer == 12|| teil.nummer == 13 || teil.nummer == 14|| teil.nummer == 15|| teil.nummer == 18 || teil.nummer == 19|| teil.nummer == 20|| teil.nummer == 26){
                                    erhoehung_kapbedarf_alt = fa.auftragsmenge * 2;
                                }

                                // Berechnung des kapazitaetsbedarf_alt:
                                kapazitaetsbedarf_alt = kapazitaetsbedarf_alt + erhoehung_kapbedarf_alt;
                                console.log("kapazitaetsbedarf_alt: " + fa.auftragsmenge );

                                // Berechnung der Rüstzeit_alt:
                                if (teil.nummer == 26){
                                    zaheler_teile_ruestzeit_mulitplikator_alt = zaheler_teile_ruestzeit_mulitplikator_alt + 1;
                                }
                                if (teil.nummer == 10 || teil.nummer == 11 || teil.nummer == 12|| teil.nummer == 13 || teil.nummer == 14|| teil.nummer == 15|| teil.nummer == 18 || teil.nummer == 19|| teil.nummer == 20){
                                    zaheler_teile_ruestzeit_mulitplikator_alt_zwei = zaheler_teile_ruestzeit_mulitplikator_alt_zwei + 1;
                                }

                            }
                        }
                    });
                    ruestzeit_alt = 30 * zaheler_teile_ruestzeit_mulitplikator_alt + 20* zaheler_teile_ruestzeit_mulitplikator_alt_zwei;
                    gesamt_kapazitaet_pro_arbeitsplatz = kapazitaetsbedarf_neu + ruestzeit_neu + kapazitaetsbedarf_alt+ ruestzeit_alt;


                    if(gesamt_kapazitaet_pro_arbeitsplatz > 2400) {
                        schichten = (gesamt_kapazitaet_pro_arbeitsplatz/2400);
                        schichten = parseInt(schichten);
                        ueberstunden = gesamt_kapazitaet_pro_arbeitsplatz - schichten*2400;
                        ueberstunden_pro_tag = ueberstunden/5;
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



            }

            if (arbeitsplatz.nummer == 9){
            console.log("Forschleife wird durchlaufen: "+ "  Arbeitsplatznr: "+ arbeitsplatz.nummer+ "  teil.nummer : "+ teil.nummer + " kapazitaetsbedarf: " + kapazitaetsbedarf_neu);

                if(teil.nummer == 10 || teil.nummer == 11 || teil.nummer == 12|| teil.nummer == 13 || teil.nummer == 14|| teil.nummer == 15) {
                    erhoehung = teil.istmenge * 3;
                    console.log("Erhöhung: "+ erhoehung);
                }
                if(teil.nummer == 18 || teil.nummer == 19|| teil.nummer == 20) {
                    erhoehung_zwei = teil.istmenge * 2;
                    console.log("Erhöhung_zwei: "+ erhoehung_zwei);
                }

                    //Berechnung des kapazitaetsbedarf_neu:
                    kapazitaetsbedarf_neu = kapazitaetsbedarf_neu + erhoehung + erhoehung_zwei;
                    console.log("kapazitaetsbedarf" + kapazitaetsbedarf_neu);

                    //Berechnung der Rüstzeitmultiplikatoren:
                    if (teil.istmenge != 0){
                        if (teil.nummer == 19) {
                            zaheler_teile_ruestzeit_mulitplikator = zaheler_teile_ruestzeit_mulitplikator + 1;
                        }
                        if (teil.nummer == 10 || teil.nummer == 11 || teil.nummer == 12|| teil.nummer == 13 || teil.nummer == 14|| teil.nummer == 15|| teil.nummer == 18 || teil.nummer == 20){
                            zaheler_teile_ruestzeit_mulitplikator_zwei = zaheler_teile_ruestzeit_mulitplikator_zwei + 1;
                        }

                    }
                    // Berechnung der Rüstzeit
                    ruestzeit_neu = 20 * zaheler_teile_ruestzeit_mulitplikator + 15 * zaheler_teile_ruestzeit_mulitplikator_zwei;
                    console.log(" Arbeitsplatz: " + arbeitsplatz.nummer + " kapazitaetsbedarf_neu " + kapazitaetsbedarf_neu+ " ruestzeit_neu "+ruestzeit_neu + " Kap.bed.");

                    // Berechnung des Rückstands der Vorperiode:
                    fertigungsauftraege_wartend_und_in_bearbeitung.forEach(function(fa){
                        console.log("Fertigungsaufträge in Beabeitung werden jetzt durchlaufen: " );

                        //Berechnung des alten Kap_bed.:
                        // würde ich sehr gerne auf teil.nummer ändern.
                    if (fa.herstellteil != null){
                            console.log(" Herstellteil ist definiert");
                        if (fa.herstellteil == teil.nummer){
                            if (teil.nummer == 10 || teil.nummer == 11 || teil.nummer == 12|| teil.nummer == 13 || teil.nummer == 14|| teil.nummer == 15){
                                erhoehung_kapbedarf_alt = fa.auftragsmenge * 3;
                            }
                            if ( teil.nummer == 18 || teil.nummer == 19|| teil.nummer == 20){
                                erhoehung_kapbedarf_alt = fa.auftragsmenge * 2;
                            }

                            // Berechnung des kapazitaetsbedarf_alt:
                            kapazitaetsbedarf_alt = kapazitaetsbedarf_alt + erhoehung_kapbedarf_alt;
                            console.log("kapazitaetsbedarf_alt: " + fa.auftragsmenge );

                            // Berechnung der Rüstzeit_alt:
                            if (teil.nummer == 19){
                                zaheler_teile_ruestzeit_mulitplikator_alt = zaheler_teile_ruestzeit_mulitplikator + 1;
                            }
                            if (teil.nummer == 10 || teil.nummer == 11 || teil.nummer == 12|| teil.nummer == 13 || teil.nummer == 14|| teil.nummer == 15|| teil.nummer == 18 || teil.nummer == 20){
                                zaheler_teile_ruestzeit_mulitplikator_alt_zwei = zaheler_teile_ruestzeit_mulitplikator_alt_zwei + 1;
                            }

                        }
                    }
                    });
                    ruestzeit_alt = 20 * zaheler_teile_ruestzeit_mulitplikator_alt + 15* zaheler_teile_ruestzeit_mulitplikator_alt_zwei;
                    gesamt_kapazitaet_pro_arbeitsplatz = kapazitaetsbedarf_neu + ruestzeit_neu + kapazitaetsbedarf_alt+ ruestzeit_alt;


                    if(gesamt_kapazitaet_pro_arbeitsplatz > 2400) {
                        schichten = (gesamt_kapazitaet_pro_arbeitsplatz/2400);
                        schichten = parseInt(schichten);
                        ueberstunden = gesamt_kapazitaet_pro_arbeitsplatz - schichten*2400;
                        ueberstunden_pro_tag = ueberstunden/5;
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


            }
            if (arbeitsplatz.nummer == 10){
                console.log("Forschleife wird durchlaufen: "+ "  Arbeitsplatznr: "+ arbeitsplatz.nummer+ "  teil.nummer : "+ teil.nummer + " kapazitaetsbedarf: " + kapazitaetsbedarf_neu);

                if(teil.nummer == 4 || teil.nummer == 5 || teil.nummer == 6|| teil.nummer == 7 || teil.nummer == 8|| teil.nummer == 9) {
                    erhoehung = teil.istmenge * 4;

                    //Berechnung des kapazitaetsbedarf_neu:
                    kapazitaetsbedarf_neu = kapazitaetsbedarf_neu + erhoehung;

                    //Berechnung der Rüstzeitmultiplikatoren:
                    if (teil.istmenge != 0){
                        zaheler_teile_ruestzeit_mulitplikator = zaheler_teile_ruestzeit_mulitplikator + 1;
                    }
                }
                    // Berechnung der Rüstzeit
                ruestzeit_neu = 20 * zaheler_teile_ruestzeit_mulitplikator;
                console.log(" Arbeitsplatz: " + arbeitsplatz.nummer + " kapazitaetsbedarf_neu " + kapazitaetsbedarf_neu+ " ruestzeit_neu "+ruestzeit_neu + " Kap.bed.");

                // Berechnung des Rückstands der Vorperiode:
                fertigungsauftraege_wartend_und_in_bearbeitung.forEach(function(fa){
                    console.log("Fertigungsaufträge in Beabeitung werden jetzt durchlaufen: " );

                    //Berechnung des alten Kap_bed.:
                    // würde ich sehr gerne auf teil.nummer ändern.
                
                if (fa.herstellteil != null){
                            console.log(" Herstellteil ist definiert");
                    if (fa.herstellteil == teil.nummer){
                        if (teil.nummer == 4 || teil.nummer == 5 || teil.nummer == 6|| teil.nummer == 7 || teil.nummer == 8|| teil.nummer == 9){
                            erhoehung_kapbedarf_alt = fa.auftragsmenge * 4;
                        }
                        // Berechnung des kapazitaetsbedarf_alt:
                        kapazitaetsbedarf_alt = kapazitaetsbedarf_alt + erhoehung_kapbedarf_alt;
                        console.log("kapazitaetsbedarf_alt: " + fa.auftragsmenge );

                        // Berechnung der Rüstzeit_alt:
                        if (teil.nummer == 4 || teil.nummer == 5 || teil.nummer == 6|| teil.nummer == 7 || teil.nummer == 8|| teil.nummer == 9){
                            zaheler_teile_ruestzeit_mulitplikator_alt = zaheler_teile_ruestzeit_mulitplikator_alt + 1;
                       }

                    }
                }
                });
                    ruestzeit_alt = 20 * zaheler_teile_ruestzeit_mulitplikator_alt;
                    gesamt_kapazitaet_pro_arbeitsplatz = kapazitaetsbedarf_neu + ruestzeit_neu + kapazitaetsbedarf_alt+ ruestzeit_alt;


                    if(gesamt_kapazitaet_pro_arbeitsplatz > 2400) {
                        schichten = (gesamt_kapazitaet_pro_arbeitsplatz/2400);
                        schichten = parseInt(schichten);
                        ueberstunden = gesamt_kapazitaet_pro_arbeitsplatz - schichten*2400;
                        ueberstunden_pro_tag = ueberstunden/5;
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

            }
            if (arbeitsplatz.nummer == 11){
                console.log("Forschleife wird durchlaufen: "+ "  Arbeitsplatznr: "+ arbeitsplatz.nummer+ "  teil.nummer : "+ teil.nummer + " kapazitaetsbedarf: " + kapazitaetsbedarf_neu);

                if(teil.nummer == 4 || teil.nummer == 5 || teil.nummer == 6|| teil.nummer == 7 || teil.nummer == 8|| teil.nummer == 9) {
                    erhoehung = teil.istmenge * 4;
                    console.log("Erhöhung: "+ erhoehung);
                }

                    //Berechnung des kapazitaetsbedarf_neu:
                    kapazitaetsbedarf_neu = kapazitaetsbedarf_neu + erhoehung;
                    console.log("kapazitaetsbedarf" + kapazitaetsbedarf_neu);

                    //Berechnung der Rüstzeitmultiplikatoren:
                    if (teil.istmenge != 0){
                        if (teil.nummer == 4 || teil.nummer == 5) {
                            zaheler_teile_ruestzeit_mulitplikator = zaheler_teile_ruestzeit_mulitplikator + 1;
                        }
                        if (teil.nummer == 6 || teil.nummer == 7 || teil.nummer == 8|| teil.nummer == 9){
                            zaheler_teile_ruestzeit_mulitplikator_zwei = zaheler_teile_ruestzeit_mulitplikator_zwei + 1;
                        }

                    }
                    // Berechnung der Rüstzeit
                    ruestzeit_neu = 10 * zaheler_teile_ruestzeit_mulitplikator + 20 * zaheler_teile_ruestzeit_mulitplikator_zwei;
                    console.log(" Arbeitsplatz: " + arbeitsplatz.nummer + " kapazitaetsbedarf_neu " + kapazitaetsbedarf_neu+ " ruestzeit_neu "+ruestzeit_neu + " Kap.bed.");

                    // Berechnung des Rückstands der Vorperiode:
                    fertigungsauftraege_wartend_und_in_bearbeitung.forEach(function(fa){
                        console.log("Fertigungsaufträge in Beabeitung werden jetzt durchlaufen: " );

                        //Berechnung des alten Kap_bed.:
                        // würde ich sehr gerne auf teil.nummer ändern.
                    if (fa.herstellteil != null){
                            console.log(" Herstellteil ist definiert");
                        if (fa.herstellteil == teil.nummer){
                            if (teil.nummer == 4 || teil.nummer == 5 || teil.nummer == 6|| teil.nummer == 7 || teil.nummer == 8|| teil.nummer == 9){
                                erhoehung_kapbedarf_alt = fa.auftragsmenge * 3;
                            }

                            // Berechnung des kapazitaetsbedarf_alt:
                            kapazitaetsbedarf_alt = kapazitaetsbedarf_alt + erhoehung_kapbedarf_alt;
                            console.log("kapazitaetsbedarf_alt: " + fa.auftragsmenge );

                            // Berechnung der Rüstzeit_alt:
                            if (teil.nummer == 4 || teil.nummer == 5){
                                zaheler_teile_ruestzeit_mulitplikator_alt = zaheler_teile_ruestzeit_mulitplikator_alt + 1;
                            }
                            if (teil.nummer == 6|| teil.nummer == 7 || teil.nummer == 8|| teil.nummer == 9){
                                zaheler_teile_ruestzeit_mulitplikator_alt_zwei = zaheler_teile_ruestzeit_mulitplikator_alt_zwei + 1;
                            }

                        }
                        
                    }    
                    });
                    ruestzeit_alt = 10 * zaheler_teile_ruestzeit_mulitplikator_alt + 20* zaheler_teile_ruestzeit_mulitplikator_alt_zwei;
                    gesamt_kapazitaet_pro_arbeitsplatz = kapazitaetsbedarf_neu + ruestzeit_neu + kapazitaetsbedarf_alt+ ruestzeit_alt;


                    if(gesamt_kapazitaet_pro_arbeitsplatz > 2400) {
                        schichten = (gesamt_kapazitaet_pro_arbeitsplatz/2400);
                        schichten = parseInt(schichten);
                        ueberstunden = gesamt_kapazitaet_pro_arbeitsplatz - schichten*2400;
                        ueberstunden_pro_tag = ueberstunden/5;
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

            }
            if (arbeitsplatz.nummer == 14){
                if(teil.nummer == 16) {
                    console.log("Forschleife wird durchlaufen: "+ "  Arbeitsplatznr: "+ arbeitsplatz.nummer+ "  teil.nummer : "+ teil.nummer + " kapazitaetsbedarf: " + kapazitaetsbedarf_neu);
                    erhoehung = teil.istmenge * 3;
                    kapazitaetsbedarf_neu = kapazitaetsbedarf_neu + erhoehung;
                }
                    ruestzeit_neu = 0;
                    console.log(" Arbeitsplatz: " + arbeitsplatz.nummer + " kapazitaetsbedarf_neu " + kapazitaetsbedarf_neu+ " ruestzeit_neu "+ruestzeit_neu + " Kap.bed.");

                    console.log("Teilid: "+teil.id + " + Teil.nummer: " + teil.nummer );
                    //Berechnung des Rückstands der Vorperiode
                    fertigungsauftraege_wartend_und_in_bearbeitung.forEach(function(fa){
                        console.log("Fertigungsaufträge in Beabeitung werden jetzt durchlaufen: " );

                        //würde ich sehr gerne auf teil.nummer ändern.
                    if(fa.herstellteil != null){
                        if (fa.herstellteil == teil.nummer){
                            if(teil.nummer == 16){
                                erhoehung_kapbedarf_alt = fa.auftragsmenge*3;
                                kapazitaetsbedarf_alt = kapazitaetsbedarf_alt + erhoehung_kapbedarf_alt;
                            }
                        }
                    }

                    });
                    ruestzeit_alt = 0;
                    gesamt_kapazitaet_pro_arbeitsplatz = kapazitaetsbedarf_neu + ruestzeit_neu + kapazitaetsbedarf_alt+ ruestzeit_alt;

                    if(gesamt_kapazitaet_pro_arbeitsplatz > 2400){
                        schichten = (gesamt_kapazitaet_pro_arbeitsplatz/2400);
                        schichten = parseInt(schichten);
                        ueberstunden = gesamt_kapazitaet_pro_arbeitsplatz - schichten*2400;
                        ueberstunden_pro_tag = ueberstunden/5;
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





            }


            if (arbeitsplatz.nummer == 15){

                if(teil.nummer == 17 || teil.nummer == 26) {
                        console.log("Forschleife wird durchlaufen: "+ "  Arbeitsplatznr: "+ arbeitsplatz.nummer+ "  teil.nummer : "+ teil.nummer + " kapazitaetsbedarf: " + kapazitaetsbedarf_neu);
                        erhoehung = teil.istmenge * 3;
                        kapazitaetsbedarf_neu = kapazitaetsbedarf_neu + erhoehung;
                        console.log("kapazitaetsbedarf" + kapazitaetsbedarf_neu);
                        if (teil.istmenge != 0){
                            zaheler_teile_ruestzeit_mulitplikator = zaheler_teile_ruestzeit_mulitplikator + 1;
                        }
                    }
                    ruestzeit_neu = 15 * zaheler_teile_ruestzeit_mulitplikator;
                    console.log(" Arbeitsplatz: " + arbeitsplatz.nummer + " kapazitaetsbedarf_neu " + kapazitaetsbedarf_neu+ " ruestzeit_neu "+ruestzeit_neu + " Kap.bed.");

                    console.log("Teilid: "+teil.id + " + Teil.nummer: " + teil.nummer );
                    //Berechnung des Rückstands der Vorperiode
                    fertigungsauftraege_wartend_und_in_bearbeitung.forEach(function(fa){
                        console.log("Fertigungsaufträge in Beabeitung werden jetzt durchlaufen: " );

                        //würde ich sehr gerne auf teil.nummer ändern.
                        if (fa.herstellteil != null){
                            console.log(" Herstellteil ist definiert");
                            if (fa.herstellteil == teil.nummer){
                                if(teil.nummer == 17 || teil.nummer == 26){
                                    erhoehung_kapbedarf_alt = fa.auftragsmenge*3;
                                    kapazitaetsbedarf_alt = kapazitaetsbedarf_alt + erhoehung_kapbedarf_alt;
                                    zaheler_teile_ruestzeit_mulitplikator_alt = zaheler_teile_ruestzeit_mulitplikator_alt+1;
                                }
                            }
                        }

                    });
                    ruestzeit_alt = 15 * zaheler_teile_ruestzeit_mulitplikator_alt;
                    gesamt_kapazitaet_pro_arbeitsplatz = kapazitaetsbedarf_neu + ruestzeit_neu + kapazitaetsbedarf_alt+ ruestzeit_alt;

                    if(gesamt_kapazitaet_pro_arbeitsplatz > 2400){
                        schichten = (gesamt_kapazitaet_pro_arbeitsplatz/2400);
                        schichten = parseInt(schichten);
                        ueberstunden = gesamt_kapazitaet_pro_arbeitsplatz - schichten*2400;
                        ueberstunden_pro_tag = ueberstunden/5;
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



            }












            });


            console.log("MEIN NEUES OOOOOOOOOBJEKT_EEEENDEEEEEEEE: "+ " Arbeitplatznr: "+ capacity.arbeitsplatznummer + " Kap.bed.neu "+ capacity.kapazitaetsbedarf_neu +
            " ruestzeit_neu " + capacity.ruestzeit_neu + " kapazitaetsbedarf_alt: "+ capacity.kapazitaetsbedarf_alt + " ruestzeit_alt  "+  capacity.ruestzeit_alt + "  gesamter_kapazitaetsbedarf: " + capacity.gesamter_kapazitaetsbedarf
            + " schichten: "+ capacity.schichten + " ueberstunden "+ capacity.ueberstunden );


            capacity_array.push(capacity);
            console.log("hat geklappt");



        });



        return capacity_array;
    }


}
