import {Action} from '@ngrx/store';
import {TimeTableModal} from '../time-table.modal';

export const STORE_TIME_TABLE = 'STORE_TIME_TABLE';


export class StoreTimeTable implements Action {
  readonly type = STORE_TIME_TABLE;
  constructor(public payload: TimeTableModal) {
  }
}
export type timeTableActions = StoreTimeTable;
