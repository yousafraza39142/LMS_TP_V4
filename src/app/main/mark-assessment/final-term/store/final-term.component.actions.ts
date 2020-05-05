import {Action} from '@ngrx/store';
import {FinalTermData} from './final-term.component.reducer';
export const STORE_DATA = 'STORE_DATA';

export class StoreData implements Action {
  readonly type = STORE_DATA;

  constructor(public payload: FinalTermData) {
  }
}

export type FinalTermComponentActions = StoreData;
