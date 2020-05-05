import {Action} from '@ngrx/store';
import {LabData} from './lab.component.reducer';
export const STORE_DATA = 'STORE_DATA';

export class StoreData implements Action {
  readonly type = STORE_DATA;

  constructor(public payload: LabData) {
  }
}

export type LabComponentActions = StoreData;
