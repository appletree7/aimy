import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {TeilService} from '../../entities/teil';
import {Principal, ResponseWrapper} from '../../shared';
import {Teil} from '../../entities/teil';
import {BestellungService} from '../../entities/bestellung';
import {ArbeitsplatzService} from '../../entities/arbeitsplatz';
import {Fertigungsauftrag, FertigungsauftragService} from '../../entities/fertigungsauftrag';
import {Modus, ModusService} from '../../entities/modus';

@Component({
  selector: 'jhi-abschluss',
  templateUrl: './abschluss.component.html',
  styles: []
})
export class AbschlussComponent implements OnInit, OnDestroy {
    xmlstring: string;
    currentAccount: any;
    eventSubscriber: Subscription;
    teil: Teil;
    modus: Modus;
    modi = [];
    kaufteile = [];
    teils = [];
    teile = [];
    fertigungsauftrag: Fertigungsauftrag;
    fertigungsauftraege = [];
    bestellungen = [];
    arbeitsplaetze = [];
    periode = parseInt(localStorage.getItem('aktuelleperiode'), 10);
    lohnkosten = parseFloat(localStorage.getItem('lohnkosten'));
    maschinenkosten = parseFloat(localStorage.getItem('maschinenkosten'));
    lagerkosten = parseFloat(localStorage.getItem('lagerkosten'));
    beschaffungskosten = parseFloat(localStorage.getItem('beschaffungskosten'));
    gesamtkosten = this.lohnkosten + this.maschinenkosten + this.lagerkosten + this.beschaffungskosten;
    gesamtertrag: number;
    gesamtgewinn: number;
    gewinnproStueck: number;
  constructor(
      private jhiAlertService: JhiAlertService,
      private eventManager: JhiEventManager,
      private principal: Principal,
      private teilService: TeilService,
      private bestellungService: BestellungService,
      private modusService: ModusService,
      private arbeitsplatzService: ArbeitsplatzService,
      private fertigungsauftragService: FertigungsauftragService
  ) { }

    loadAll() {
        let criteria = [
            {key: 'periode.equals', value: localStorage.getItem('aktuelleperiode')}
        ];
        this.fertigungsauftragService.query({
            size: 1000000,
            criteria
        })
            .subscribe((res: ResponseWrapper) => {
                this.fertigungsauftraege = res.json;
            }, (res: ResponseWrapper) => this.onError(res.json));

        criteria = [
            {key: 'periode.equals', value: localStorage.getItem('aktuelleperiode')}
        ];
        this.fertigungsauftragService.query({
            size: 1000000,
            criteria
        }).subscribe((res: ResponseWrapper) => {
                this.fertigungsauftraege = res.json;
            }, (res: ResponseWrapper) => this.onError(res.json));

        criteria = [
            {key: 'teiltyp.in', value: 'KAUFTEIL'},
            {key: 'periode.equals', value: localStorage.getItem('aktuelleperiode')}
        ];
        this.teilService.query({
            size: 1000000,
            criteria
        }).subscribe((response: ResponseWrapper) => {
            this.kaufteile = response.json;
        }, (res: ResponseWrapper) => this.onError(res.json));

        this.modusService.query({
            size: 1000000,
            criteria
        }).subscribe((response: ResponseWrapper) => {
            this.modi = response.json;
        }, (res: ResponseWrapper) => this.onError(res.json));
    }

  ngOnInit() {
      this.principal.identity().then((account) => {
          this.currentAccount = account;
      });
      let criteria = [
          {key: 'teiltyp.equals', value: 'PRODUKT'},
          {key: 'periode.equals', value: localStorage.getItem('aktuelleperiode')}
      ];
      this.teilService.query({
          size: 1000000,
          criteria
      })
          .subscribe((res: ResponseWrapper) => {
              this.teils = res.json;
              const vertriebswunsch_array = [];
              for (const teil of this.teils) {
                  vertriebswunsch_array.push(teil.vertriebswunsch);
              }
              const gesamtverkaufsmenge =  vertriebswunsch_array.reduce((a, b) => a + b, 0);
              this.gesamtertrag =  gesamtverkaufsmenge * 200;
              this.gesamtgewinn = this.gesamtertrag - this.gesamtkosten;
              this.gewinnproStueck = this.gesamtgewinn / gesamtverkaufsmenge;
          }, (res: ResponseWrapper) => this.onError(res.json));
      criteria = [
          {key: 'teiltyp.in', value: 'PRODUKT'},
          {key: 'teiltyp.in', value: 'ERZEUGNIS'},
          {key: 'periode.equals', value: localStorage.getItem('aktuelleperiode')}
      ];
      this.teilService.query({
          size: 1000000,
          criteria
      })
          .subscribe((res: ResponseWrapper) => {
              this.teile = res.json;
          }, (res: ResponseWrapper) => this.onError(res.json));
      criteria = [
          {key: 'periode.equals', value: localStorage.getItem('aktuelleperiode')}
      ];
      this.bestellungService.query({
          size: 1000000,
          criteria
      })
          .subscribe((res: ResponseWrapper) => {
              this.bestellungen = res.json;
          }, (res: ResponseWrapper) => this.onError(res.json));
      this.loadAll();
      criteria = [
          {key: 'periode.equals', value: localStorage.getItem('aktuelleperiode')}
      ];
      this.arbeitsplatzService.query({
          size: 1000000,
          criteria
      })
          .subscribe((res: ResponseWrapper) => {
              this.arbeitsplaetze = res.json;
          }, (res: ResponseWrapper) => this.onError(res.json));
      this.registerChangeInFertigungsauftrags();
  }

    previousState() {
        window.history.back();
    }

    createXMLStructure() {
        const doc = document.implementation.createDocument('', '', null);
        const input = doc.createElement('input');
        doc.appendChild(input);
        const qualitycontrol = doc.createElement('qualitycontrol');
        input.appendChild(qualitycontrol);
        qualitycontrol.setAttribute('type', 'no');
        qualitycontrol.setAttribute('losequantity', '0');
        qualitycontrol.setAttribute('delay', '0');
        const sellwish = doc.createElement('sellwish');
        input.appendChild(sellwish);
        for (const teil of this.teils) {
            const item = doc.createElement('item');
            sellwish.appendChild(item);
            if (teil.nummer !== null) {
                item.setAttribute('article', teil.nummer.toString());
            } else {
                item.setAttribute('article', '');
            }
            if (teil.vertriebswunsch !== null) {
                item.setAttribute('quantity', teil.vertriebswunsch.toString());
            } else {
                item.setAttribute('quantity', '0');
            }
        }
        const selldirect = doc.createElement('selldirect');
        input.appendChild(selldirect);
        for (const teil of this.teils) {
            const item2 = doc.createElement('item');
            selldirect.appendChild(item2);
            if (teil.nummer !== null) {
                item2.setAttribute('article', teil.nummer.toString());
            } else {
                item2.setAttribute('article', '');
            }
            if (teil.direktverkaufmenge !== null) {
                item2.setAttribute('quantity', teil.direktverkaufmenge.toString());
            } else {
                item2.setAttribute('quantity', '0');
            }
            if (teil.direktverkaufspreis !== null) {
                item2.setAttribute('price', teil.direktverkaufspreis.toString());
            } else {
                item2.setAttribute('price', '0');
            }
            if (teil.strafe !== null) {
                item2.setAttribute('penalty', teil.strafe.toString());
            } else {
                item2.setAttribute('penalty', '0');
            }
        }
        const orderlist = doc.createElement('orderlist');
        input.appendChild(orderlist);
        for (const bestellung of this.bestellungen) {
            if (bestellung.kaufmenge !== 0 && bestellung.auftragsmenge !== null) {
                const order = doc.createElement('order');
                orderlist.appendChild(order);
                this.teil = this.kaufteile.find((teil) => (teil.id === bestellung.kaufteil.id));
                this.modus = this.modi.find((modus) => (modus.id === bestellung.modus.id));
                if (this.teil.nummer !== null || this.teil.nummer !== undefined) {
                    order.setAttribute('article', this.teil.nummer.toString());
                } else {
                    order.setAttribute('article', '');
                }
                    order.setAttribute('quantity', bestellung.kaufmenge.toString());
                if (bestellung.modus !== null) {
                    order.setAttribute('modus', this.modus.nummer.toString());
                } else {
                    order.setAttribute('modus', '');
                }
            }
        }
        const productionlist = doc.createElement('productionlist');
        input.appendChild(productionlist);
        for (const fertigungsauftrag of this.fertigungsauftraege) {
            if (fertigungsauftrag.auftragsmenge !== 0 && fertigungsauftrag.auftragsmenge !== null) {
                const production = doc.createElement('production');
                productionlist.appendChild(production);
                this.teil = this.teile.find((teil) => (teil.id === fertigungsauftrag.herstellteil.id));
                if (this.teil.nummer !== null || this.teil.nummer !== undefined) {
                    production.setAttribute('article', this.teil.nummer.toString());
                } else {
                    production.setAttribute('article', '');
                }
                    production.setAttribute('quantity', fertigungsauftrag.auftragsmenge.toString());
            }
        }
        const workingtimelist = doc.createElement('workingtimelist');
        input.appendChild(workingtimelist);
        for (const arbeitsplatz of this.arbeitsplaetze) {
            const workingtime = doc.createElement('workingtime');
            workingtimelist.appendChild(workingtime);
            if (arbeitsplatz.nummer !== null) {
                workingtime.setAttribute('station', arbeitsplatz.nummer.toString());
            } else {
                workingtime.setAttribute('station', '');
            }
            if (arbeitsplatz.schicht !== null) {
                workingtime.setAttribute('shift', arbeitsplatz.schicht.toString());
            } else {
                workingtime.setAttribute('shift', '');
            }
            if (arbeitsplatz.ueberstunden !== null) {
                workingtime.setAttribute('overtime', arbeitsplatz.ueberstunden.toString());
            } else {
                workingtime.setAttribute('overtime', '');
            }
        }

        const parser = new XMLSerializer();
        this.xmlstring = parser.serializeToString(doc);

    }

    export() {
      this.createXMLStructure();
        const file = new File([this.xmlstring],
            'Input_Periode_' + localStorage.getItem('aktuelleperiode') + '.xml', {type: 'application/xml;charset=utf-8'});
        const element = document.createElement('a');
        element.href = URL.createObjectURL(file);
        element.setAttribute('download', file.name);
        document.body.appendChild(element);
         element.click();
  }
    registerChangeInFertigungsauftrags() {
        this.eventSubscriber = this.eventManager.subscribe('fertigungsauftragListModification', () => this.loadAll());
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    private onSaveError() {
      console.log('Fehler beim Speichern der Daten')
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
