import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {PresentationComponentActions, STORE_DATA} from './presentation.component.actions';
import {AssignmentModal} from '../../../../shared/AssignmentModal';
import {PresentationModal} from '../../../../shared/PresentationModal';

export interface PresentationData {
  presentations: PresentationModal[];
}

export interface State {
  data: PresentationData;
}


const initailState: State = {
  data: {
    presentations: [
      new PresentationModal('Presentation 1'),
      new PresentationModal('Presentation 1'),
      new PresentationModal('Presentation 1'),
      new PresentationModal('Presentation 1'),
    ]
  }
};

export function PresentationComponentReducer(
  state = initailState,
  action: PresentationComponentActions) {
  switch (action.type) {
    case STORE_DATA:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}

