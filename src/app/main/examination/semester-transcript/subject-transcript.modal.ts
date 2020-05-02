export class SubjectTranscriptModal {
  public courseCode: string;
  public courseTitle: string;
  public creditHour: number;
  public gradePoints: number;
  public grade: string;
  constructor(courseCode: string, courseTitle: string, creditHour: number, gradePoints: number, grade: string) {
    this.courseCode = courseCode;
    this.courseTitle = courseTitle;
    this.creditHour = creditHour;
    this.gradePoints = gradePoints;
    this.grade = grade;
  }
}
