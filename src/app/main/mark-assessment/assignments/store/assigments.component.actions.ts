import {Action} from '@ngrx/store';
import {AssignmentData} from './assignment.component.reducer';

export const STORE_DATA = 'STORE_DATA';

export class StoreData implements Action {
  readonly type = STORE_DATA;

  constructor(public payload: AssignmentData) {
  }
}

export type AssigmentsComponentActions = StoreData;
