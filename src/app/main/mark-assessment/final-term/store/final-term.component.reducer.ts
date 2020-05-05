import {FinalTermComponentActions, STORE_DATA} from './final-term.component.actions';

// tslint:disable-next-line:class-name
export interface studentFinaltermTable {
  rollNo: string;
  name: string;
  downloadPath: string;
  marks_obtained: number;
}


export interface FinalTermData {
  students_final_term: studentFinaltermTable[];
  total_marks: number;
}

export interface State {
  data: FinalTermData;
}


const initailState: State = {
  data: {
    students_final_term: [
      {rollNo: '0200-BSCS-17', name: 'Yousaf', downloadPath: null, marks_obtained: 9},
      {rollNo: '0200-BSCS-17', name: 'Danial', downloadPath: null, marks_obtained: 8},
      {rollNo: '0200-BSCS-17', name: 'Asif', downloadPath: null, marks_obtained: 4},
      {rollNo: '0200-BSCS-17', name: 'Saqlain', downloadPath: null, marks_obtained: 6},
      {rollNo: '0200-BSCS-17', name: 'Bilal', downloadPath: null, marks_obtained: 8}
    ],
    total_marks: 60
  }
};

export function FinalTermComponentReducer(
  state = initailState,
  action: FinalTermComponentActions) {
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

