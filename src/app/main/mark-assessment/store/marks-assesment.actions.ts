import {Action} from '@ngrx/store';
import {AssignmentData} from '../assignments/store/assignment.component.reducer';
import {State} from './mark-assessment.reducer';

export const STORE_DATA = 'STORE_DATA';

export class StoreData implements Action {
  readonly type = STORE_DATA;

  constructor(public payload: State) {
  }
}

export type MarksAssesmentActions = StoreData;
