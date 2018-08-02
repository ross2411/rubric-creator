import { Component, OnInit } from '@angular/core';
import { BaseRubricComponent } from '../../components/base/base-rubric.component';
import { Store } from '@ngrx/store';
import { RubricsStateInterface } from '../../store/rubrics.state';
import { GetRubric, SetBreadcrumbs, SetPageTitle } from '../../store/rubrics.actions';
import { BreadcrumbInterface } from '../../object-interfaces/breadcrumb.interface';

@Component({
    selector: 'rc-create-rubric',
    templateUrl: './edit-rubric.component.html',
})
export class EditRubricComponent extends BaseRubricComponent implements OnInit {
    private breadcrumbs: Array<BreadcrumbInterface> = [
        {
            path: '/',
            selected: false,
            text: 'Home',
        },
        {
            path: '/rubrics',
            selected: false,
            text: 'Rubrics',
        },
        {
            path: undefined,
            selected: true,
            text: 'Create',
        },
    ];
    private title: string = 'Create New Rubric | Rubric Creator';

    constructor(protected store: Store<RubricsStateInterface>) {
        super(store);
    }

    public ngOnInit(): void {
        this.store.dispatch(new SetPageTitle(this.title));
        this.store.dispatch(new SetBreadcrumbs(this.breadcrumbs));
        this.store.dispatch(new GetRubric());
        super.ngOnInit();
    }
}
