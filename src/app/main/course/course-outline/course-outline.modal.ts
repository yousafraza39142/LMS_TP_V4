import {BookModal} from './book.modal';
import {ExamTypeModal} from './exam-type.modal';

export class CourseOutlineModal {
  public courseReq: string;
  public objective: string[];
  public referenceBooks: BookModal[];
  public assessmentAndEvaluation: ExamTypeModal[];
  public weekContent: string[];
  constructor(courseReq: string, objective: string[], referenceBooks: BookModal[], assessmentAndEvaluation: ExamTypeModal[],
              weekContent: string[]) {
    this.courseReq = courseReq;
    this.objective = objective;
    this.referenceBooks = referenceBooks;
    this.assessmentAndEvaluation = assessmentAndEvaluation;
    this.weekContent = weekContent;
  }
}
