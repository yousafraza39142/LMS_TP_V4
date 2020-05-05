import {Action} from '@ngrx/store';
import {MidtermData} from './mid-term.component.reducer';
export const STORE_DATA = 'STORE_DATA';

export class StoreData implements Action {
  readonly type = STORE_DATA;

  constructor(public payload: MidtermData) {
  }
}

export type MidTermComponentActions = StoreData;
