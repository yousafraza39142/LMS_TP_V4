import * as examinationActions from '../store/examination.actions';
import {SemesterDateSheetModal} from '../date-sheet/semester-date-sheet.modal';
import {DateSheetModal} from '../date-sheet/date-sheet.modal';
import {SemesterTranscriptModal} from '../semester-transcript/semester-transcript.modal';
import {SubjectTranscriptModal} from '../semester-transcript/subject-transcript.modal';
import {CompleteTranscriptModal} from '../complete-transcript/complete-transcript.modal';

export interface State {
  semesterDateSheet: SemesterDateSheetModal;
  semesterTranscript: SemesterTranscriptModal;
  completeTranscript: CompleteTranscriptModal;
}
const initialState: State = {
  semesterDateSheet: new SemesterDateSheetModal(
    [
      new DateSheetModal('12/10/12', 'friday', '12.00 pm-2.00 pm', 'human computer intraction'),
      new DateSheetModal('22/10/12', 'monday', '12.00 pm-2.00 pm', 'artifical intelligance')
    ]
  ),
  semesterTranscript: new SemesterTranscriptModal(1, 23, 18.5, 3.78,
    [
      new SubjectTranscriptModal('cs-2201', 'artifical inttelligance', 40, 18.5, 'A+'),
      new SubjectTranscriptModal('cs-2202', 'human inttelligance', 30, 28.5, 'B+'),
    ]),
  completeTranscript: new CompleteTranscriptModal(40, 50, 60, 3.78,
    [
      new SemesterTranscriptModal(1, 23, 18.5, 3.78,
        [
          new SubjectTranscriptModal('cs-2201', 'artifical inttelligance', 40, 18.5, 'A+'),
          new SubjectTranscriptModal('cs-2202', 'human inttelligance', 30, 28.5, 'B+'),
        ]),
      new SemesterTranscriptModal(2, 28, 28.5, 3.08,
        [
          new SubjectTranscriptModal('cs-3201', 'Data Structure', 45, 19.5, 'C+'),
          new SubjectTranscriptModal('cs-3202', 'object oriented ', 80, 38.5, 'D+'),
        ])
    ])
};

export function examinationReducer(
  state = initialState,
  action: examinationActions.examinationActions
) {
  switch (action.type) {
    case 'SET_DATE_SHEET': {
      return {
        ...state,
        semesterDateSheet: action.payload
      };
    }
    case 'SET_SEMESTER_TRANSCRIPT': {
      return {
        ...state,
        semesterTranscript: action.payload
      };
    }
    case 'SET_COMPLETE_TRANSCRIPT': {
      return {
        ...state,
        completeTranscript: action.payload
      };
    }
    default:
      return state;
  }
}
