import {CourseModal} from '../../../shared/course.modal';
import {SectionModal} from '../../../shared/SectionModal';
import * as fromCourseUploadActions from './course-upload.actions';

export interface CourseUpload {
  courses: CourseModal[];
  sections: SectionModal[];
}

export interface UploadResponse {
  course: string;
  section: string;
  title: string;
  filePath: string;
}

export interface State {
  info: CourseUpload;
  response: UploadResponse;
}

const initialState: State = {
  info: {
    courses: [
      new CourseModal('English'),
      new CourseModal('Urdu'),
      new CourseModal('Math')
    ],
    sections: [
      new SectionModal('Section A'),
      new SectionModal('Section B'),
      new SectionModal('Section C'),
      new SectionModal('Section E1'),
      new SectionModal('Section E2')
    ]
  },
  response: {
    course: null,
    section: null,
    title: null,
    filePath: null
  }
};

export function CourseUploadReducer(
  state: State = initialState,
  action: fromCourseUploadActions.courseUploadActions) {
  switch (action.type) {
    case fromCourseUploadActions.STORE_INFORMATION:
      return {
        ...state,
        response: {
          course: action.payload.course,
          section: action.payload.section,
          title: action.payload.title,
          filePath: action.payload.filePath
        }
      };
    default:
      return state;
  }
}
