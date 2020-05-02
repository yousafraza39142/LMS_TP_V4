import {Action} from '@ngrx/store';
import {CourseAttendanceModal} from '../courseAttendance.modal';
import {ProgressReportModal} from '../progress-report-modal';
import {AnnouncementModal} from '../announcement.modal';

export const SET_SEMESTER_ATTENDANCE = 'SET_SEMESTER_ATTENDANCE';
export const SET_OVERALL_PROGRESS = 'SET_OVERALL_PROGRESS';
export const SET_ANNOUNCEMENTS = 'SET_ANNOUNCEMENTS';

export class SetSemesterAttendance implements Action {
  readonly type = SET_SEMESTER_ATTENDANCE;

  constructor(public payload: CourseAttendanceModal[]) {
  }
}

export class SetOverallProgress implements Action {
  readonly type = SET_OVERALL_PROGRESS;

  constructor(public payload: ProgressReportModal) {
  }
}

export class SetAnnouncements implements Action {
  readonly  type = SET_ANNOUNCEMENTS;
  constructor(public payload: AnnouncementModal[]) {
  }
}
export type HomeActions = SetSemesterAttendance
                          | SetOverallProgress
                          | SetAnnouncements;
