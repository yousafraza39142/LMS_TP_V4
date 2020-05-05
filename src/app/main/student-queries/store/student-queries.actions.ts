import {Action} from '@ngrx/store';
import {TimeTableModal} from '../../time-table/time-table.modal';

export const STORE_TEACHER_RESPONSE = 'STORE_TEACHER_RESPONSE';


export class StoreTeacherResponse implements Action {
  readonly type = STORE_TEACHER_RESPONSE;
  constructor(public payload: TimeTableModal) {
  }
}
export type StudentQueriesActions = StoreTeacherResponse;
