import {PresentationComponentActions, STORE_DATA} from './presentation.component.actions';
import {PresentationModal} from '../../../../shared/PresentationModal';


export interface PresentationTable {
  rollNo: string;
  name: string;
  downloadPath: string;
  marks_obtained: number;
}

export interface PresentationData {
  students_presentation: PresentationTable[];
  totalMarks: number;
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
    ],
    students_presentation: [
      {rollNo: '0200-BSCS-17', name: 'Yousaf', downloadPath: null, marks_obtained: 9},
      {rollNo: '0200-BSCS-17', name: 'Danial', downloadPath: null, marks_obtained: 8},
      {rollNo: '0200-BSCS-17', name: 'Asif', downloadPath: null, marks_obtained: 4},
      {rollNo: '0200-BSCS-17', name: 'Saqlain', downloadPath: null, marks_obtained: 6},
      {rollNo: '0200-BSCS-17', name: 'Bilal', downloadPath: null, marks_obtained: 8}
    ],
    totalMarks: 10
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

