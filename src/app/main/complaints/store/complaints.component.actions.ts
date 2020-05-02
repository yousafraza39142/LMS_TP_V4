import {Action} from '@ngrx/store';
import {ComplaintModel} from '../complaint.model';

export const STORE_INFORMATION = 'STORE_INFORMATION';

export class StoreInformation implements Action {
  readonly type = STORE_INFORMATION;
  constructor(public payload: ComplaintModel) {
  }
}

export type ComplaintsComponentActions = StoreInformation;
