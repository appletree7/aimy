/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AimyTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ArbeitsplatzDetailComponent } from '../../../../../../main/webapp/app/entities/arbeitsplatz/arbeitsplatz-detail.component';
import { ArbeitsplatzService } from '../../../../../../main/webapp/app/entities/arbeitsplatz/arbeitsplatz.service';
import { Arbeitsplatz } from '../../../../../../main/webapp/app/entities/arbeitsplatz/arbeitsplatz.model';

describe('Component Tests', () => {

    describe('Arbeitsplatz Management Detail Component', () => {
        let comp: ArbeitsplatzDetailComponent;
        let fixture: ComponentFixture<ArbeitsplatzDetailComponent>;
        let service: ArbeitsplatzService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AimyTestModule],
                declarations: [ArbeitsplatzDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ArbeitsplatzService,
                    JhiEventManager
                ]
            }).overrideTemplate(ArbeitsplatzDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ArbeitsplatzDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArbeitsplatzService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Arbeitsplatz(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.arbeitsplatz).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
