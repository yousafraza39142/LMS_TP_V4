import {GradeTypeModal} from './grade-type.modal';

export class GradeBookModal {
  public assignments: GradeTypeModal[];
  public quizes: GradeTypeModal[];
  public midTerm: GradeTypeModal[];
  public finalTerm: GradeTypeModal[];
  public classActivity: GradeTypeModal[];
  constructor(assignments: GradeTypeModal[], quizes: GradeTypeModal[], midTerm: GradeTypeModal[], finalTerm: GradeTypeModal[],
              classActivity: GradeTypeModal[]) {
    this.assignments = assignments;
    this.quizes = quizes;
    this.midTerm = midTerm;
    this.finalTerm = finalTerm;
    this.classActivity = classActivity;
  }
}
