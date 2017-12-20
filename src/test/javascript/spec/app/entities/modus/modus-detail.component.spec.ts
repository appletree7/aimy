/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AimyTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ModusDetailComponent } from '../../../../../../main/webapp/app/entities/modus/modus-detail.component';
import { ModusService } from '../../../../../../main/webapp/app/entities/modus/modus.service';
import { Modus } from '../../../../../../main/webapp/app/entities/modus/modus.model';

describe('Component Tests', () => {

    describe('Modus Management Detail Component', () => {
        let comp: ModusDetailComponent;
        let fixture: ComponentFixture<ModusDetailComponent>;
        let service: ModusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AimyTestModule],
                declarations: [ModusDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ModusService,
                    JhiEventManager
                ]
            }).overrideTemplate(ModusDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ModusDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModusService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Modus(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.modus).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
