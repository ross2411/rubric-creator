import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditRubricTableBodyComponent } from './edit-rubric-table-body.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { rubricsReducer } from '../../store/rubrics.reducer';
import { getInitialState } from '../../store/rubrics.state';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('EditRubricTableBodyComponent', () => {
    let component: EditRubricTableBodyComponent;
    let fixture: ComponentFixture<EditRubricTableBodyComponent>;

    beforeEach(async(() => {
        void TestBed.configureTestingModule({
            declarations: [EditRubricTableBodyComponent],
            imports: [
                FormsModule,
                StoreModule.forRoot(
                    {rubrics: rubricsReducer},
                    {initialState: getInitialState}
                ),
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditRubricTableBodyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    xit('should create', () => {
        expect(component).toBeTruthy();
    });
});