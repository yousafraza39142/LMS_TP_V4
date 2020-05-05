import {Action} from '@ngrx/store';
import {ProjectData} from './project.component.reducer';

export const STORE_DATA = 'STORE_DATA';

export class StoreData implements Action {
  readonly type = STORE_DATA;

  constructor(public payload: ProjectData) {
  }
}

export type ProjectComponentActions = StoreData;
