import { Component, OnInit } from '@angular/core';
import { BaseRubricComponent } from '../../components/base/base-rubric.component';
import { Store } from '@ngrx/store';
import { RubricsStateInterface } from '../../store/rubrics.state';
import { GetRubric } from '../../store/rubrics.actions';

@Component({
    selector: 'rc-create-rubric',
    styleUrls: ['./create-rubric.component.css'],
    templateUrl: './create-rubric.component.html',
})
export class CreateRubricComponent extends BaseRubricComponent implements OnInit {

    constructor(protected store: Store<RubricsStateInterface>) {
        super(store);
    }

    public ngOnInit(): void {
        this.store.dispatch(new GetRubric());
        super.ngOnInit();
    }
}