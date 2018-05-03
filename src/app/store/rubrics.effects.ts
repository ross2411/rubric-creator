import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { CreateRubric, CreateRubricSuccess, GetRubric, GetRubrics, RubricsActionTypes } from './rubrics.actions';
import { Action } from '@ngrx/store';
import { DisplayableErrorInterface } from '../object-interfaces/displayable-error.interface';
import { BackendDataService } from '../data-services/backend-data.service';
import { emptyRubric, RubricInterface } from '../object-interfaces/rubric.interface';
import { Router } from '@angular/router';

function _generateDisplayableError(error?: object): DisplayableErrorInterface {
    return {message: 'Whoops! Something went wrong and data could not be loaded. Try refreshing the page.'};
}

@Injectable()
export class RubricsEffects {
    @Effect()
    public getRubric: Observable<Action> = this.actions
        .ofType<GetRubric>(RubricsActionTypes.GetRubric)
        .mergeMap(action => {
            if (action.payload !== undefined) {
                // Get rubric by uuid
                return this.backendData.getRubric(action.payload)
                    .map(data => ({
                        payload: data,
                        type: RubricsActionTypes.GetRubricSuccess,
                    }))
                    .catch(err => of({
                        payload: _generateDisplayableError(err),
                        type: RubricsActionTypes.GetRubricError,
                    }));
            } else {
                // Or generate an empty rubric
                return of({
                    payload: emptyRubric,
                    type: RubricsActionTypes.GetRubricSuccess,
                });
            }
        });

    @Effect()
    public getRubrics: Observable<Action> = this.actions
        .ofType<GetRubrics>(RubricsActionTypes.GetRubrics)
        .mergeMap(action => {
            return this.backendData.getRubrics()
                .map(data => ({
                    payload: data,
                    type: RubricsActionTypes.GetRubricsSuccess,
                }))
                .catch(err => of({
                    payload: _generateDisplayableError(err),
                    type: RubricsActionTypes.GetRubricsError,
                }));
        });

    @Effect()
    public createRubric: Observable<Action> = this.actions
        .ofType<CreateRubric>(RubricsActionTypes.CreateRubric)
        .mergeMap(action => {
            return this.backendData.createRubric(action.payload)
                .map(data => ({
                    payload: data,
                    type: RubricsActionTypes.CreateRubricSuccess,
                }))
                .catch(err => of({
                    payload: _generateDisplayableError(err),
                    type: RubricsActionTypes.CreateRubricError,
                }));
        });

    @Effect({dispatch: false})
    public createRubricSuccess: Observable<Action> = this.actions
        .ofType<CreateRubricSuccess>(RubricsActionTypes.CreateRubricSuccess)
        .do(action => void this.router.navigateByUrl(`/rubrics/${action.payload.uuid}`));

    constructor(
        private backendData: BackendDataService,
        private actions: Actions,
        private router: Router
    ) {}
}
