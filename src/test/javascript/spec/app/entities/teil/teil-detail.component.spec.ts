/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AimyTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TeilDetailComponent } from '../../../../../../main/webapp/app/entities/teil/teil-detail.component';
import { TeilService } from '../../../../../../main/webapp/app/entities/teil/teil.service';
import { Teil } from '../../../../../../main/webapp/app/entities/teil/teil.model';

describe('Component Tests', () => {

    describe('Teil Management Detail Component', () => {
        let comp: TeilDetailComponent;
        let fixture: ComponentFixture<TeilDetailComponent>;
        let service: TeilService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AimyTestModule],
                declarations: [TeilDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TeilService,
                    JhiEventManager
                ]
            }).overrideTemplate(TeilDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TeilDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeilService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Teil(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.teil).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
