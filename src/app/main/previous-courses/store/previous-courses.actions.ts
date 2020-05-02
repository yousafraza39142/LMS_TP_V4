import {Action} from '@ngrx/store';
import {SemesterPreviousCoursesModal} from '../semester-previous-courses.modal';

export const SET_PREVIOUS_COURSES = 'SET_PREVIOUS_COURSES';

export class SetPreviousCourses implements Action {
  readonly type = SET_PREVIOUS_COURSES;
  constructor(public payload: SemesterPreviousCoursesModal) {
  }
}
export type PreviousCoursesActions = SetPreviousCourses;
