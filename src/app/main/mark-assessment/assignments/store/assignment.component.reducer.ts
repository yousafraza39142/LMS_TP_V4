import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {AssigmentsComponentActions, STORE_DATA} from './assigments.component.actions';
import {AssignmentModal} from '../../../../shared/AssignmentModal';

// tslint:disable-next-line:class-name
export interface student_assignments_table {
  rollNo: string;
  name: string;
  downloadPath: string;
  group: string;
  marks_obtained: number;
}


export interface AssignmentData {
  assignments: AssignmentModal[];
  students_assignments: student_assignments_table[];
  total_marks: number;
}

export interface State {
  data: AssignmentData;
}


const initailState: State = {
  data: {
    assignments: [
      new AssignmentModal('Assignment 1'),
      new AssignmentModal('Assignment 2'),
      new AssignmentModal('Assignment 3'),
      new AssignmentModal('Assignment 4')
    ],
    students_assignments: [
      {rollNo: '0200-BSCS-17', name: 'Yousaf', group: 'Group 1', downloadPath: null, marks_obtained: 9},
      {rollNo: '0200-BSCS-17', name: 'Danial', group: 'Group 2', downloadPath: null, marks_obtained: 8},
      {rollNo: '0200-BSCS-17', name: 'Asif', group: 'Group 3', downloadPath: null, marks_obtained: 4},
      {rollNo: '0200-BSCS-17', name: 'Saqlain', group: 'Group 2', downloadPath: null, marks_obtained: 6},
      {rollNo: '0200-BSCS-17', name: 'Bilal', group: 'Group 1', downloadPath: null, marks_obtained: 8}
    ],
    total_marks: 10
  }
};

export function AssignmentComponentReducer(
  state = initailState,
  action: AssigmentsComponentActions) {
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

