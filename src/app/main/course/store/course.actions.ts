import {Action} from '@ngrx/store';
import {CourseModal} from '../course.modal';
import {CourseOutlineModal} from '../course-outline/course-outline.modal';
import {SubmitAssignmentModal} from '../submit-assignment/submit-assignment.modal';
import {GradeBookModal} from '../grade-book/grade-book.modal';
import {LeaveStatusModal} from '../leave-status/leave-status.modal';
import {AskQuestionModal} from '../ask-question/ask-question.modal';
import {AnnouncementModal} from '../../home/announcement.modal';

export const  SET_ALLOCATED_COURSES = 'SET_ALLOCATED_COURSES';
export const SET_COURSE_OUTLINE = 'SET_COURSE_OUTLINE';
export const SET_COURSE_MATERIAL = 'SET_COURSE_MATERIAL';
export const SET_SUBMIT_ASSIGNMENT = 'SET_SUBMIT_ASSIGNMENT';
export const SET_GRADE_BOOK = 'SET_GRADE_BOOK';
export const SET_ATTENDANCE = 'SET_ATTENDANCE';
export const ASK_QUESTION = 'ASK_QUESTION';
export const SET_ANNOUNCEMENTS = 'SET_ANNOUNCEMENTS';


export class SetAllocatedCourses implements Action {
  readonly type = SET_ALLOCATED_COURSES;
  constructor(public payload: CourseModal[]) {
  }
}
export class SetCourseOutline implements Action {
  readonly type = SET_COURSE_OUTLINE;
  constructor(public payload: CourseOutlineModal) {
  }
}
export class SetCourseMaterial implements Action {
  readonly type = SET_COURSE_MATERIAL;
  constructor(public payload) {
  }
}
export class SetSubmitAssignment implements Action {
  readonly type = SET_SUBMIT_ASSIGNMENT;
  constructor(public payload: SubmitAssignmentModal[]) {
  }
}
export class SetGradeBook implements Action {
  readonly type = SET_GRADE_BOOK;
  constructor(public payload: GradeBookModal) {
  }
}
export class SetAttendance implements Action {
  readonly type = SET_ATTENDANCE;
  constructor(public payload: LeaveStatusModal) {
  }
}
export class GetAskQuestion implements Action {
  readonly type = ASK_QUESTION;
  constructor(public payload: AskQuestionModal) {
  }
}
export class SetAnnouncements implements Action {
  readonly  type = SET_ANNOUNCEMENTS;
  constructor(public payload: AnnouncementModal[]) {
  }
}
export type CourseActions =
  SetAllocatedCourses
  | SetCourseOutline
  | SetCourseMaterial
  | SetSubmitAssignment
  | SetGradeBook
  | SetAttendance
  | GetAskQuestion
  | SetAnnouncements;
