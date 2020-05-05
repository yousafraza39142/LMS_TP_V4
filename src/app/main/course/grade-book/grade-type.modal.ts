export class GradeTypeModal {
  public gradeType: string;
  public obtainedMarks: string;
  public totalMarks: string;
  constructor(gradeType: string, obtainedMarks: string, totalMarks: string) {
    this.gradeType = gradeType;
    this.obtainedMarks = obtainedMarks;
    this.totalMarks = totalMarks;
  }
}
