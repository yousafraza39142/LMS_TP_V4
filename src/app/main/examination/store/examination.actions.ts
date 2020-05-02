import {Action} from '@ngrx/store';
import {SemesterDateSheetModal} from '../date-sheet/semester-date-sheet.modal';
import {SemesterTranscriptModal} from '../semester-transcript/semester-transcript.modal';
import {CompleteTranscriptModal} from '../complete-transcript/complete-transcript.modal';

export const SET_DATE_SHEET = 'SET_DATE_SHEET';
export const SET_SEMESTER_TRANSCRIPT = 'SET_SEMESTER_TRANSCRIPT';
export const SET_COMPLETE_TRANSCRIPT = 'SET_COMPLETE_TRANSCRIPT';

export class SetDateSheet implements Action {
  readonly type = SET_DATE_SHEET;
  constructor(public payload: SemesterDateSheetModal) {
  }
}
export class SetSemesterTranscript implements  Action {
  readonly type = SET_SEMESTER_TRANSCRIPT;
  constructor(public payload: SemesterTranscriptModal) {
  }
}
export class SetCompleteTranscript implements Action {
  readonly type = SET_COMPLETE_TRANSCRIPT;
  constructor(public payload: CompleteTranscriptModal) {
  }
}
export type examinationActions =
  SetDateSheet
  | SetSemesterTranscript
  | SetCompleteTranscript;
