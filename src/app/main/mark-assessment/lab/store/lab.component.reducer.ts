import {LabComponentActions, STORE_DATA} from './lab.component.actions';
import {LabModal} from '../../../../shared/LabModal';


// tslint:disable-next-line:class-name
export interface studentLabsTable {
  rollNo: string;
  name: string;
  downloadPath: string;
  group: string;
  marks_obtained: number;
}

export interface LabData {
  labs: LabModal[];
  students_labs: studentLabsTable[];
  total_marks: number;
}

export interface State {
  data: LabData;
}


const initailState: State = {
  data: {
    labs: [
      new LabModal('Lab 1'),
      new LabModal('Lab 2'),
      new LabModal('Lab 3'),
    ],
    students_labs: [
      {rollNo: '0200-BSCS-17', name: 'Yousaf', group: 'Group 1', downloadPath: null, marks_obtained: 9},
      {rollNo: '0200-BSCS-17', name: 'Danial', group: 'Group 2', downloadPath: null, marks_obtained: 8},
      {rollNo: '0200-BSCS-17', name: 'Asif', group: 'Group 3', downloadPath: null, marks_obtained: 4},
      {rollNo: '0200-BSCS-17', name: 'Saqlain', group: 'Group 2', downloadPath: null, marks_obtained: 6},
      {rollNo: '0200-BSCS-17', name: 'Bilal', group: 'Group 1', downloadPath: null, marks_obtained: 8}
    ],
    total_marks: 10
  }
};

export function LabComponentReducer(
  state = initailState,
  action: LabComponentActions) {
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

