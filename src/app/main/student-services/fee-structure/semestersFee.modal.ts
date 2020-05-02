import {SemesterFeeModal} from './semesterFee.modal';

export class SemestersFeeModal {
  public noOfSemesters: number;
  public semestersFee: SemesterFeeModal[];
  constructor(noOfSemester: number, semestersFee: SemesterFeeModal[]) {
    this.noOfSemesters = noOfSemester;
    this.semestersFee = semestersFee;
  }
}
