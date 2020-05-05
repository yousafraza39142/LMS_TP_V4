import {AbsentteeModal} from './absenttee.modal';

export class LeaveStatusModal {
  public presents: string;
  public absents: string;
  public absentDetails: AbsentteeModal[];
  constructor(presents: string, absents: string, absentDetails: AbsentteeModal[]) {
    this.presents = presents;
    this.absents = absents;
    this.absentDetails = absentDetails;
  }
}
