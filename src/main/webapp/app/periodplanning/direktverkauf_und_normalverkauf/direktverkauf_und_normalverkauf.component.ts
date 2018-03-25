import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Teil} from '../../entities/teil/teil.model';
import {TeilService} from '../../entities/teil/teil.service';
import {Principal, ResponseWrapper} from '../../shared';
import {Teiltyp} from '../../entities/teil';
import {PeriodStartComponent} from '../';

@Component({
  selector: 'jhi-direktverkauf-und-normalverkauf',
  templateUrl: './direktverkauf_und_normalverkauf.component.html',
  styles: []
})
export class DirektverkaufUndNormalverkaufComponent implements OnInit {
    isSaving: boolean;
    teil: Teil;
    teils: Teil[];
    currentAccount: any;
    eventSubscriber: Subscription;

  constructor( private teilService: TeilService,
               private jhiAlertService: JhiAlertService,
               private eventManager: JhiEventManager,
               private principal: Principal) {
  }

    ngOnInit() {
      this.principal.identity().then((account) => {
          this.currentAccount = account;
      });
      this.teilService.query()
          .subscribe((res: ResponseWrapper) => {
              this.teils = res.json;
              this.teils = this.teils.filter((teil) => teil.teiltyp === Teiltyp.PRODUKT && teil.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10));
          }, (res: ResponseWrapper) => this.onError(res.json));
  }

    previousState() {
        window.history.back();
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}