import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {TeilService} from '../../entities/teil/teil.service';
import {Principal, ResponseWrapper} from '../../shared';
import {Teil, Teiltyp} from '../../entities/teil';
import {Bestellung, BestellungService} from '../../entities/bestellung';
import {Arbeitsplatz, ArbeitsplatzService} from '../../entities/arbeitsplatz';

@Component({
  selector: 'jhi-abschluss',
  templateUrl: './abschluss.component.html',
  styles: []
})
export class AbschlussComponent implements OnInit {
    xmlstring: string;
    currentAccount: any;
    eventSubscriber: Subscription;
    teils: Teil[];
    bestellungen: Bestellung[];
    arbeitsplaetze: Arbeitsplatz[];

  constructor(
      private jhiAlertService: JhiAlertService,
      private eventManager: JhiEventManager,
      private principal: Principal,
      private teilService: TeilService,
      private bestellungService: BestellungService,
      private arbeitsplatzService: ArbeitsplatzService
  ) { }

  ngOnInit() {
      this.principal.identity().then((account) => {
          this.currentAccount = account;
      });
      this.teilService.query()
          .subscribe((res: ResponseWrapper) => {
              this.teils = res.json;
              this.teils = this.teils.filter((teil) => (teil.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10)) && (teil.teiltyp === Teiltyp.PRODUKT));
          }, (res: ResponseWrapper) => this.onError(res.json));
      this.bestellungService.query()
          .subscribe((res: ResponseWrapper) => {
              this.bestellungen = res.json;
              this.bestellungen = this.bestellungen.filter((bestellung) => bestellung.nummer <= 3);
          }, (res: ResponseWrapper) => this.onError(res.json));
      this.arbeitsplatzService.query()
          .subscribe((res: ResponseWrapper) => {
              this.arbeitsplaetze = res.json;
              this.arbeitsplaetze = this.arbeitsplaetze.filter((arbeitsplatz ) => arbeitsplatz.nummer <= 3);
          }, (res: ResponseWrapper) => this.onError(res.json));
  }

    previousState() {
        window.history.back();
    }

    createXMLStructure() {
        const doc = document.implementation.createDocument('', '', null);
        const input = doc.createElement('input');
        doc.appendChild(input)
        const sellwish = doc.createElement('sellwish');
        input.appendChild(sellwish)
        for (const teil of this.teils) {
            const item = doc.createElement('item');
            sellwish.appendChild(item);
            item.setAttribute('article', teil.nummer);
            item.setAttribute('quantity', teil.vertriebswunsch.toString());
        }
        const selldirect = doc.createElement('selldirect');
        input.appendChild(selldirect);
        const item2 = doc.createElement('item');
        selldirect.appendChild(item2);
        for (const teil of this.teils) {
            item2.setAttribute('article', teil.nummer);
            item2.setAttribute('quantity', '');
            item2.setAttribute('price', '');
            item2.setAttribute('penalty', '');
        }
        const orderlist = doc.createElement('orderlist');
        input.appendChild(orderlist);
        for (const bestellung of this.bestellungen) {
            const order = doc.createElement('order');
            orderlist.appendChild(order);
            order.setAttribute('article', '');
            order.setAttribute('quantity', bestellung.kaufmenge.toString());
            order.setAttribute('modus', '');
        }
        const productionlist = doc.createElement('productionlist');
        input.appendChild(productionlist);
        for (const teil of this.teils) {
            const production = doc.createElement('production');
            productionlist.appendChild(production)
            production.setAttribute('article', teil.nummer);
            production.setAttribute('quantity', '');
        }
        const workingtimelist = doc.createElement('workingtimelist');
        input.appendChild(workingtimelist);
        for (const arbeitsplatz of this.arbeitsplaetze) {
            const workingtime = doc.createElement('workingtime');
            workingtimelist.appendChild(workingtime);
            workingtime.setAttribute('station', arbeitsplatz.nummer.toString());
            workingtime.setAttribute('shift', '');
            workingtime.setAttribute('overtime', '');
        }

        const parser = new XMLSerializer();
        this.xmlstring = parser.serializeToString(doc);

    }

    save() {
      this.createXMLStructure();
        const file = new File([this.xmlstring], 'periode.xml', {type: 'application/xml;charset=utf-8'});
        const element = document.createElement('a');
        const url = URL.createObjectURL(file);
        element.href = url;
        element.setAttribute('download', file.name);
        document.body.appendChild(element);
         element.click();
  }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
