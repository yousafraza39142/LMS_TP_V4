import {AbsentteeModal} from './absenttee.modal';

export class LeaveStatusModal {
  public presents: number;
  public absents: number;
  public absentDetails: AbsentteeModal[];
  constructor(presents: number, absents: number, absentDetails: AbsentteeModal[]) {
    this.presents = presents;
    this.absents = absents;
    this.absentDetails = absentDetails;
  }
}
