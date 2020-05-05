import {CourseModal} from '../../../shared/course.modal';
import {SectionModal} from '../../../shared/SectionModal';
import * as  fromMarkAssesmentActions from './marks-assesment.actions';

export interface State {
  courses: CourseModal[];
  sections: SectionModal[];
}

const initialState: State = {
  courses: [
    new CourseModal('English'),
    new CourseModal('Urdu'),
    new CourseModal('Math'),
    new CourseModal('Chinese'),
    new CourseModal('Pk.Studies')
  ],
  sections: [
    new SectionModal('Section A'),
    new SectionModal('Section B'),
    new SectionModal('Section C'),
    new SectionModal('Section E1'),
    new SectionModal('Section E2')
  ]
};

export function MarkAssessmentReducer(
  state = initialState,
  action: (fromMarkAssesmentActions.MarksAssesmentActions)) {
  switch (action.type) {
    case fromMarkAssesmentActions.STORE_DATA:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}
