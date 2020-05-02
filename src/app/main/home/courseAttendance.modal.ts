export class CourseAttendanceModal {
  public courseTitle: string;
  public absents: number;
  public presents: number;

  constructor(courseTitle: string, absents: number, presents: number) {
    this.courseTitle = courseTitle;
    this.absents = absents;
    this.presents = presents;
  }
}
