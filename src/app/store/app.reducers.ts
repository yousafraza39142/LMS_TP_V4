// @ts-ignore
import {ActionReducerMap} from '@ngrx/store';
import * as fromTeacherInformation from '../main/teacher-information/store/teacher-information.reducer';
import * as fromTimeTable from '../main/time-table/store/time-table.reducer';
import * as fromCourseUpload from '../main/course-upload/store/course-upload.reducer';
import * as fromAssignment from '../main/mark-assessment/assignments/store/assignment.component.reducer';
import * as  fromMarkAssessment from '../main/mark-assessment/store/mark-assessment.reducer';
import * as  fromProject from '../main/mark-assessment/project/store/project.component.reducer';
import * as  fromPresentation from '../main/mark-assessment/presentation/store/presentation.component.reducer';
import * as  fromLab from '../main/mark-assessment/lab/store/lab.component.reducer';
import * as  fromMidterm from '../main/mark-assessment/mid-term/store/mid-term.component.reducer';
import * as  fromFinalTerm from '../main/mark-assessment/final-term/store/final-term.component.reducer';

export interface AppState {
  fromTeacherInformation: fromTeacherInformation.State;
  fromTimeTable: fromTimeTable.State;
  fromCourseUpload: fromCourseUpload.State;
  fromAssignment: fromAssignment.State;
  fromMarkAssessment: fromMarkAssessment.State;
  fromProject: fromProject.State;
  fromPresentation: fromPresentation.State;
  fromLab: fromLab.State;
  fromMidterm: fromMidterm.State;
  fromFinalTerm: fromFinalTerm.State;
}

export const appReducers: ActionReducerMap<AppState> = {
    fromTeacherInformation: fromTeacherInformation.teacherInformationReducer,
    fromTimeTable: fromTimeTable.TimeTableReducer,
    fromCourseUpload: fromCourseUpload.CourseUploadReducer,
    fromAssignment: fromAssignment.AssignmentComponentReducer,
    fromMarkAssessment: fromMarkAssessment.MarkAssessmentReducer,
    fromProject: fromProject.ProjectComponentReducer,
    fromPresentation: fromPresentation.PresentationComponentReducer,
    fromLab: fromLab.LabComponentReducer,
    fromMidterm: fromMidterm.MidTermComponentReducer,
    fromFinalTerm: fromFinalTerm.FinalTermComponentReducer
  }
;
