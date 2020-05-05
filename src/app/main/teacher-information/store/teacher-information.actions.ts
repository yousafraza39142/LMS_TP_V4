import {Action} from '@ngrx/store';
import {TeacherInformationModel} from '../teacher-information.model';

export const SET_STUDENT_INFORMATION = 'SET_STUDENT_INFORMATION';
export class SetStudentInformation implements Action {
  readonly type = SET_STUDENT_INFORMATION;
  constructor(public payload: TeacherInformationModel) {
  }
}

export type TeacherInformationActions = SetStudentInformation;
