import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {TeilService} from '../../entities/teil';
import {Principal, ResponseWrapper} from '../../shared';
import {Teil} from '../../entities/teil';
import {BestellungService} from '../../entities/bestellung';
import {ArbeitsplatzService} from '../../entities/arbeitsplatz';
import {Fertigungsauftrag, FertigungsauftragService} from '../../entities/fertigungsauftrag';

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
    teils = [];
    teile = [];
    fertigungsauftrag: Fertigungsauftrag;
    fertigungsauftraege = [];
    fertigungsauftraege2 = [];
    bestellungen = [];
    arbeitsplaetze = [];

  constructor(
      private jhiAlertService: JhiAlertService,
      private eventManager: JhiEventManager,
      private principal: Principal,
      private teilService: TeilService,
      private bestellungService: BestellungService,
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
                if (this.fertigungsauftraege.length === 0) {
                    criteria = [
                        {key: 'teiltyp.in', value: 'PRODUKT'},
                        {key: 'teiltyp.in', value: 'ERZEUGNIS'},
                        {key: 'periode.equals', value: localStorage.getItem('aktuelleperiode')}
                    ];
                    this.teilService.query({
                        size: 1000000,
                        criteria
                    })
                        .subscribe((response: ResponseWrapper) => {
                            this.teile = response.json;
                            let i = 0;
                            for (const teil of this.teile) {
                                i = i + 1;
                                this.fertigungsauftrag = new Fertigungsauftrag(undefined, parseInt(localStorage.getItem('aktuelleperiode'), 10), i,
                                    parseFloat(teil.gesamtproduktionsmenge), undefined, undefined,
                                    undefined, undefined, undefined, undefined, undefined,
                                    undefined,  teil);
                                this.fertigungsauftraege.push(this.fertigungsauftrag);
                            }
                            /*for (const fertigungsauftrag of this.fertigungsauftraege) {
                                if (fertigungsauftrag.id !== null) {
                                    this.fertigungsauftragService.update(fertigungsauftrag).subscribe((respond: Fertigungsauftrag) =>
                                        console.log(respond), () => this.onSaveError());
                                } else {
                                    this.fertigungsauftragService.create(fertigungsauftrag).subscribe((respond: Fertigungsauftrag) =>
                                        console.log(respond), () => this.onSaveError());
                                }
                            }*/
                        }, (response: ResponseWrapper) => this.onError(response.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));

        criteria = [
            {key: 'periode.equals', value: localStorage.getItem('aktuelleperiode')}
        ];
        this.fertigungsauftragService.query({
            size: 1000000,
            criteria
        })
            .subscribe((res: ResponseWrapper) => {
                this.fertigungsauftraege = res.json;
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
        // console.log(qualitycontrol);
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
                item.setAttribute('article', teil.vertriebswunsch.toString());
            } else {
                item.setAttribute('article', '');
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
                item2.setAttribute('quantity', '');
            }
            if (teil.direktverkaufspreis !== null) {
                item2.setAttribute('price', teil.direktverkaufspreis.toString());
            } else {
                item2.setAttribute('price', '');
            }
            if (teil.strafe !== null) {
                item2.setAttribute('penalty', teil.strafe.toString());
            } else {
                item2.setAttribute('penalty', '');
            }
        }
        const orderlist = doc.createElement('orderlist');
        input.appendChild(orderlist);
        for (const bestellung of this.bestellungen) {
            const order = doc.createElement('order');
            orderlist.appendChild(order);
            this.teil = this.teile.find((teil) => (teil.id === bestellung.kaufteil.id));
            if (this.teil.nummer !== null || this.teil.nummer !== undefined) {
                order.setAttribute('article', this.teil.nummer.toString());
            } else {
                order.setAttribute('article', '');
            }
            if (bestellung.kaufmenge !== null) {
                order.setAttribute('quantity', bestellung.kaufmenge.toString())
            } else {
                order.setAttribute('quantity', '')
            }
            if (bestellung.modus !== null) {
                order.setAttribute('modus',  bestellung.modus.id.toString());
            } else {
                order.setAttribute('modus',  '');
            }
        }
        const productionlist = doc.createElement('productionlist');
        input.appendChild(productionlist);
        for (const fertigungsauftrag of this.fertigungsauftraege) {
            const production = doc.createElement('production');
            productionlist.appendChild(production);
            this.teil = this.teile.find((teil) => (teil.id === fertigungsauftrag.herstellteil.id));
            if (this.teil.nummer !== null || this.teil.nummer !== undefined) {
                production.setAttribute('article', this.teil.nummer.toString());
            } else {
                production.setAttribute('article', '');
            }
            if (fertigungsauftrag.auftragsmenge !== null) {
                production.setAttribute('quantity', fertigungsauftrag.auftragsmenge.toString());
            } else {
                production.setAttribute('quantity', '');
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

  split() {
      let criteria = [
          {key: 'periode.equals', value: localStorage.getItem('aktuelleperiode')}
      ];
      this.fertigungsauftragService.query({
          size: 1000000,
          criteria
      })
          .subscribe((res: ResponseWrapper) => {
              // this.fertigungsauftraege = res.json;
              this.fertigungsauftraege = [];
              criteria = [
                  {key: 'teiltyp.in', value: 'PRODUKT'},
                  {key: 'teiltyp.in', value: 'ERZEUGNIS'},
                  {key: 'periode.equals', value: localStorage.getItem('aktuelleperiode')}
              ];
                  this.teilService.query({
                      size: 1000000,
                      criteria
                  })
                      .subscribe((response: ResponseWrapper) => {
                          this.teile = response.json;
                              let i = 0;
                              for (const teil of this.teile) {
                                  i = i + 1;
                                  if (teil.nummer === 17 || teil.nummer === 26 || teil.nummer === 4
                                      || teil.nummer === 5 || teil.nummer === 6 || teil.nummer === 7
                                      || teil.nummer === 8 || teil.nummer === 9) {
                                      const auftragsmenge = teil.gesamtproduktionsmenge / 2;
                                      this.fertigungsauftrag = new Fertigungsauftrag(undefined, parseInt(localStorage.getItem('aktuelleperiode'), 10), i,
                                          parseInt(auftragsmenge.toFixed(2), 10), undefined, undefined,
                                          undefined, undefined, undefined, undefined,
                                          undefined, undefined, teil);
                                      this.fertigungsauftraege.push(this.fertigungsauftrag);
                                      this.fertigungsauftraege.push(this.fertigungsauftrag);
                                  } else if (teil.nummer === 10 || teil.nummer === 11 || teil.nummer === 12
                                      || teil.nummer === 13 || teil.nummer === 14 || teil.nummer === 15
                                      || teil.nummer === 18 || teil.nummer === 19 || teil.nummer === 20) {
                                      const auftragsmenge = teil.gesamtproduktionsmenge / 3;
                                      this.fertigungsauftrag = new Fertigungsauftrag(undefined, parseInt(localStorage.getItem('aktuelleperiode'), 10), i,
                                          parseInt(auftragsmenge.toFixed(2), 10), undefined, undefined,
                                          undefined, undefined, undefined, undefined,
                                          undefined, undefined, teil);
                                      this.fertigungsauftraege.push(this.fertigungsauftrag);
                                      this.fertigungsauftraege.push(this.fertigungsauftrag);
                                      this.fertigungsauftraege.push(this.fertigungsauftrag);
                                  } else {
                                      this.fertigungsauftrag = new Fertigungsauftrag(undefined, parseInt(localStorage.getItem('aktuelleperiode'), 10), i,
                                          teil.gesamtproduktionsmenge, undefined, undefined,
                                          undefined, undefined, undefined, undefined,
                                          undefined, undefined, teil);
                                      this.fertigungsauftraege.push(this.fertigungsauftrag);
                                  }
                              }
                              for (const fertigungsauftrag of this.fertigungsauftraege) {
                                  if (fertigungsauftrag.id !== null) {
                                      this.fertigungsauftragService.update(fertigungsauftrag).subscribe((respond: Fertigungsauftrag) =>
                                          console.log(respond), () => this.onSaveError());
                                  } else {
                                      this.fertigungsauftragService.create(fertigungsauftrag).subscribe((respond: Fertigungsauftrag) =>
                                          console.log(respond), () => this.onSaveError());
                                  }
                              }
                      }, (response: ResponseWrapper) => this.onError(response.json));
          }, (res: ResponseWrapper) => this.onError(res.json));

      criteria = [
          {key: 'periode.equals', value: localStorage.getItem('aktuelleperiode')}
      ];
      this.fertigungsauftragService.query({
          size: 1000000,
          criteria
      })
          .subscribe((res: ResponseWrapper) => {
              this.fertigungsauftraege = res.json;
          }, (res: ResponseWrapper) => this.onError(res.json));
  }

    sort() {
      for (const fertigungsauftrag of this.fertigungsauftraege) {
          this.teil = this.teile.find((teil) => (teil.id === fertigungsauftrag.herstellteil.id));
              if ((this.teil.nummer >= 4) && (this.teil.nummer <= 9)) {
                        fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 4 + fertigungsauftrag.auftragsmenge * 3;
              } else if ((this.teil.nummer === 10) || (this.teil.nummer === 13)) {
                        fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 2 + fertigungsauftrag.auftragsmenge
                            + fertigungsauftrag.auftragsmenge * 3 + fertigungsauftrag.auftragsmenge * 3 + + fertigungsauftrag.auftragsmenge * 2;
              } else if ((this.teil.nummer === 11) || (this.teil.nummer === 12)
                        || (this.teil.nummer === 14) || (this.teil.nummer === 15)) {
                        fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 2 + fertigungsauftrag.auftragsmenge * 2
                            + fertigungsauftrag.auftragsmenge * 3 + fertigungsauftrag.auftragsmenge * 3 + + fertigungsauftrag.auftragsmenge * 2;
              } else if ((this.teil.nummer === 16)) {
                        fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 2 + fertigungsauftrag.auftragsmenge * 3;
              } else if ((this.teil.nummer === 17)) {
                        fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 3;
              } else if ((this.teil.nummer >= 18) && (this.teil.nummer <= 20)) {
                        fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 3 + fertigungsauftrag.auftragsmenge * 2
                            + fertigungsauftrag.auftragsmenge * 3 + fertigungsauftrag.auftragsmenge * 2;
              } else if ((this.teil.nummer === 26)) {
                        fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 2 + fertigungsauftrag.auftragsmenge * 3;
              } else if ((this.teil.nummer === 49) || (this.teil.nummer === 54)
                        || (this.teil.nummer === 29) || (this.teil.nummer === 56)
                            || (this.teil.nummer === 31) || (this.teil.nummer === 1)) {
                        fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 6
              } else if ((this.teil.nummer === 50) || (this.teil.nummer === 55)
                        || (this.teil.nummer === 30) || (this.teil.nummer === 51)) {
                        fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 5
              } else if ((this.teil.nummer === 2) || (this.teil.nummer === 3)) {
                        fertigungsauftrag.bearbeitungszeitmin = fertigungsauftrag.auftragsmenge * 7
              }
              this.fertigungsauftragService.update(fertigungsauftrag).subscribe((respond: Fertigungsauftrag) =>
                        console.log(respond), () => this.onSaveError());
      }

        this.fertigungsauftraege.sort((a, b) => a.bearbeitungszeitmin - b.bearbeitungszeitmin);
        let i = 1;
        for (const fertigungsauftrag of this.fertigungsauftraege) {
            fertigungsauftrag.nummer = i;
            this.fertigungsauftragService.update(fertigungsauftrag).subscribe((respond: Fertigungsauftrag) =>
                console.log(respond), () => this.onSaveError());
            i = i + 1;
        }
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
