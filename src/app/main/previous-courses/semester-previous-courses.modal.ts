import {PreviousCourseModal} from './previous-course.modal';

export class SemesterPreviousCoursesModal {
  public semesterNo: number;
  public semesterCourses: PreviousCourseModal[];
  constructor(semesterNo: number, semesterCourses: PreviousCourseModal[]) {
    this.semesterNo = semesterNo;
    this.semesterCourses = semesterCourses;
  }
}
