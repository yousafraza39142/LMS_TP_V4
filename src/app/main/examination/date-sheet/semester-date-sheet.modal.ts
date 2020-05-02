import {DateSheetModal} from './date-sheet.modal';
export class SemesterDateSheetModal {
  public subjects: DateSheetModal[];
  constructor(subjects: DateSheetModal[]) {
    this.subjects = subjects;
  }
}
