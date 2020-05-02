import {ActionReducerMap} from '@ngrx/store';
import * as fromStudentService from '../main/student-services/store/student-services.reducer';
import * as fromExamination from '../main/examination/store/examination.reducer';
import * as fromPreviousCourses from '../main/previous-courses/store/previous-courses.reducer';
import * as fromCourse from '../main/course/store/course.reducer';
import * as fromHome from '../main/home/store/home.reducer';
import * as fromTimeTable from '../main/time-table/store/time-table.reducer';
import * as fromComplaints from '../main/complaints/store/complaints.component.reducer';

export interface AppState {
  fromStudentService: fromStudentService.State;
  fromExamination: fromExamination.State;
  fromPreviousCourses: fromPreviousCourses.State;
  fromCourse: fromCourse.State;
  fromHome: fromHome.State;
  fromTimeTable: fromTimeTable.State;
  fromComplaints: fromComplaints.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  fromStudentService: fromStudentService.studentServicesreducer,
  fromExamination: fromExamination.examinationReducer,
  fromPreviousCourses: fromPreviousCourses.previousCoursesReducer,
  fromCourse: fromCourse.courseReducer,
  fromHome: fromHome.homeReducer,
  fromTimeTable: fromTimeTable.TimeTableReducer,
  fromComplaints: fromComplaints.ComplaintsComponentReducer
};
