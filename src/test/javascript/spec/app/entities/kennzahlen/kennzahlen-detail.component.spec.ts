/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AimyTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { KennzahlenDetailComponent } from '../../../../../../main/webapp/app/entities/kennzahlen/kennzahlen-detail.component';
import { KennzahlenService } from '../../../../../../main/webapp/app/entities/kennzahlen/kennzahlen.service';
import { Kennzahlen } from '../../../../../../main/webapp/app/entities/kennzahlen/kennzahlen.model';

describe('Component Tests', () => {

    describe('Kennzahlen Management Detail Component', () => {
        let comp: KennzahlenDetailComponent;
        let fixture: ComponentFixture<KennzahlenDetailComponent>;
        let service: KennzahlenService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AimyTestModule],
                declarations: [KennzahlenDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    KennzahlenService,
                    JhiEventManager
                ]
            }).overrideTemplate(KennzahlenDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KennzahlenDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KennzahlenService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Kennzahlen(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.kennzahlen).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
