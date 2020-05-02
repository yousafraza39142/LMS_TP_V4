import * as PreviousCoursesActions from '../store/previous-courses.actions';
import {SemesterPreviousCoursesModal} from '../semester-previous-courses.modal';
import {PreviousCourseModal} from '../previous-course.modal';

export interface State {
  previousSemesterCourses: SemesterPreviousCoursesModal[];
}
const initialState: State = {
  previousSemesterCourses: [
    new SemesterPreviousCoursesModal(1, [
      new PreviousCourseModal('human interaction', 'CS 2210'),
      new PreviousCourseModal('computer interaction', 'CS 3210'),
      new PreviousCourseModal('computer communication', 'CS 3215'),
    ]),
    new SemesterPreviousCoursesModal(2, [
      new PreviousCourseModal('OOAD', 'CS 2210'),
      new PreviousCourseModal('OOP', 'CS 3210'),
      new PreviousCourseModal('software engineering', 'CS 3215'),
    ])
  ]
};

export function previousCoursesReducer(
  state = initialState,
  action: PreviousCoursesActions.PreviousCoursesActions
) {
  switch (action.type) {
    case 'SET_PREVIOUS_COURSES': {
      return {
        ...state,
        previousSemesterCourses: [action.payload]
      };
    }
    default:
      return state;
  }
}
