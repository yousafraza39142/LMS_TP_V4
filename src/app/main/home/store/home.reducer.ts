import * as homeActions from '../store/home.actions';
import {CourseAttendanceModal} from '../courseAttendance.modal';
import {ProgressReportModal} from '../progress-report-modal';
import {AnnouncementModal} from '../announcement.modal';

export interface State {
  semesterAttendance: CourseAttendanceModal[];
  progressReport: ProgressReportModal;
  announcements: AnnouncementModal[];
}

const initialState: State = {
  semesterAttendance: [
    new CourseAttendanceModal('programming fundamental', 2, 30),
    new CourseAttendanceModal('OOP', 10, 36),
    new CourseAttendanceModal('OOAD', 4, 43),
    new CourseAttendanceModal('artifical intelligance', 5, 33),
    new CourseAttendanceModal('DSA', 6, 23)
  ],
  progressReport: new ProgressReportModal([1.2, 4.0, 3.2, 3.5, 3.1, 2.9, 3.1, 3.8]),
  announcements: [
    new AnnouncementModal('Chuttian hi Chuttian', 'This month all of GCU faculty' +
      ' has gone wild and have declared month long leave enjoy M.F.', 'Surprise M.F.'),
    new AnnouncementModal('Chuttian hi Chuttian', 'This month all of GCU faculty' +
      ' has gone wild and have declared month long leave enjoy M.F.', 'Surprise M.F.'),
    new AnnouncementModal('Chuttian hi Chuttian', 'This month all of GCU faculty' +
      ' has gone wild and have declared month long leave enjoy M.F.', 'Surprise M.F.'),
    new AnnouncementModal('Chuttian hi Chuttian', 'This month all of GCU faculty' +
      ' has gone wild and have declared month long leave enjoy M.F.', 'Surprise M.F.'),
    new AnnouncementModal('Chuttian hi Chuttian', 'This month all of GCU faculty' +
      ' has gone wild and have declared month long leave enjoy M.F.', 'Surprise M.F.'),
    new AnnouncementModal('Chuttian hi Chuttian', 'This month all of GCU faculty' +
      ' has gone wild and have declared month long leave enjoy M.F.', 'Surprise M.F.')
  ]
};

export function homeReducer(
  state = initialState,
  action: homeActions.HomeActions
) {
  switch (action.type) {
    case 'SET_SEMESTER_ATTENDANCE': {
      return {
        ...state,
        semesterAttendance: action.payload
      };
    }
    case homeActions.SET_OVERALL_PROGRESS:
      return{
        ...state,
        progressReport : action.payload
      };
    case homeActions.SET_ANNOUNCEMENTS: {
      return {
        ...state,
        announcements: action.payload
      };
    }
    default:
      return state;
  }
}
