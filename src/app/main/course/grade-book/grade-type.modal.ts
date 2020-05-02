export class GradeTypeModal {
  public gradeType: string;
  public date: string;
  public obtainedMarks: number;
  public totalMarks: number;
  constructor(gradeType: string, date: string, obtainedMarks: number, totalMarks: number) {
    this.gradeType = gradeType;
    this.date = date;
    this.obtainedMarks = obtainedMarks;
    this.totalMarks = totalMarks;
  }
}
