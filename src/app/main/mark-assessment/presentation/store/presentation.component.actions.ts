import {Action} from '@ngrx/store';
import {PresentationData} from './presentation.component.reducer';
export const STORE_DATA = 'STORE_DATA';

export class StoreData implements Action {
  readonly type = STORE_DATA;

  constructor(public payload: PresentationData) {
  }
}

export type PresentationComponentActions = StoreData;
