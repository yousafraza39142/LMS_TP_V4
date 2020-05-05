import {Action} from '@ngrx/store';
import {UploadResponse} from './course-upload.reducer';
export const STORE_INFORMATION = 'STORE_INFORMATION';

export class StoreInformation implements Action {
  readonly type = STORE_INFORMATION;
  constructor(public payload: UploadResponse) {
  }
}

export type courseUploadActions = StoreInformation;
