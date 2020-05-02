import {SubjectTranscriptModal} from './subject-transcript.modal';
export class SemesterTranscriptModal {
  public semesterNo: number;
  public creditHoursForCGPA: number;
  public semesterGradePoints: number;
  public SGPA: number;
  public semesterSubjects: SubjectTranscriptModal[];
  constructor(semesterNo: number, creditHoursForCGPA: number, semesterGradePoints: number, SGPA: number,
              semesterSubjects: SubjectTranscriptModal[]) {
    this.semesterNo = semesterNo;
    this.creditHoursForCGPA = creditHoursForCGPA;
    this.semesterGradePoints = semesterGradePoints;
    this.SGPA = SGPA;
    this.semesterSubjects = semesterSubjects;
  }
}
