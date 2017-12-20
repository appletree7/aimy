/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AimyTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { BestellungDetailComponent } from '../../../../../../main/webapp/app/entities/bestellung/bestellung-detail.component';
import { BestellungService } from '../../../../../../main/webapp/app/entities/bestellung/bestellung.service';
import { Bestellung } from '../../../../../../main/webapp/app/entities/bestellung/bestellung.model';

describe('Component Tests', () => {

    describe('Bestellung Management Detail Component', () => {
        let comp: BestellungDetailComponent;
        let fixture: ComponentFixture<BestellungDetailComponent>;
        let service: BestellungService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AimyTestModule],
                declarations: [BestellungDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    BestellungService,
                    JhiEventManager
                ]
            }).overrideTemplate(BestellungDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BestellungDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BestellungService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Bestellung(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.bestellung).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
