import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {MidTermComponentActions, STORE_DATA} from './mid-term.component.actions';
import {AssignmentModal} from '../../../../shared/AssignmentModal';

// tslint:disable-next-line:class-name
export interface studentMidtermTable {
  rollNo: string;
  name: string;
  downloadPath: string;
  marks_obtained: number;
}


export interface MidtermData {
  students_mid_term: studentMidtermTable[];
  total_marks: number;
}

export interface State {
  data: MidtermData;
}


const initailState: State = {
  data: {
    students_mid_term: [
      {rollNo: '0200-BSCS-17', name: 'Yousaf', downloadPath: null, marks_obtained: 9},
      {rollNo: '0200-BSCS-17', name: 'Danial', downloadPath: null, marks_obtained: 8},
      {rollNo: '0200-BSCS-17', name: 'Asif', downloadPath: null, marks_obtained: 4},
      {rollNo: '0200-BSCS-17', name: 'Saqlain', downloadPath: null, marks_obtained: 6},
      {rollNo: '0200-BSCS-17', name: 'Bilal', downloadPath: null, marks_obtained: 8}
    ],
    total_marks: 20
  }
};

export function MidTermComponentReducer(
  state = initailState,
  action: MidTermComponentActions) {
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

