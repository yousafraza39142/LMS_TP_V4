import {Action} from '@ngrx/store';
import {StudentInformationModel} from '../student-information/student-information.model';
import {SemestersFeeModal} from '../fee-structure/semestersFee.modal';

export const SET_STUDENT_INFORMATION = 'SET_STUDENT_INFORMATION';
export const SET_SEMESTERS_FEE = 'SET_SEMESTERS_FEES';
export class SetStudentInformation implements Action {
  readonly type = SET_STUDENT_INFORMATION;
  constructor(public payload: StudentInformationModel) {
  }
}
export class SetSemestersFee implements Action {
  readonly type = SET_SEMESTERS_FEE;
  constructor(public payload: SemestersFeeModal) {
  }
}

export type StudentServicesActions =
  SetStudentInformation
  | SetSemestersFee;
