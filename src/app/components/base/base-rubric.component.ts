import { takeUntil } from 'rxjs/operators';
import { RubricInterface } from '../../object-interfaces/rubric.interface';
import { OnInit } from '@angular/core';
import { BaseComponent } from './base.component';
import { select, Store } from '@ngrx/store';
import { RubricsStateInterface } from '../../store/rubrics.state';

export abstract class BaseRubricComponent extends BaseComponent implements OnInit {
    public rubric: RubricInterface | undefined;
    public connected: boolean = true;

    protected constructor(protected store: Store<RubricsStateInterface>) {
        super();
    }

    public ngOnInit(): void {
        this.store.pipe(takeUntil(this.ngUnsubscribe))
            .pipe(select('rubrics'))
            .subscribe((state: RubricsStateInterface) => {
                this.rubric = state.currentRubric;
                this.connected = state.connected;
            });
    }
}
