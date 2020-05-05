import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import * as fromProjectComponentActions from './project.component.actions';
import {ProjectModal} from '../../../../shared/ProjectModal';

// tslint:disable-next-line:class-name
export interface studentProjectsTable {
  rollNo: string;
  name: string;
  downloadPath: string;
  group: string;
  marks_obtained: number;
}


export interface ProjectData {
  projects: ProjectModal[];
  students_projects: studentProjectsTable[];
  total_marks: number;
}

export interface State {
  data: ProjectData;
}


const initialState: State = {
  data: {
    projects: [
      new ProjectModal('Project 1'),
      new ProjectModal('Project 2'),
      new ProjectModal('Project 3'),
      new ProjectModal('Project 4')
    ],
    students_projects: [
      {rollNo: '0200-BSCS-17', name: 'Yousaf', group: 'Group 1', downloadPath: null, marks_obtained: 9},
      {rollNo: '0200-BSCS-17', name: 'Danial', group: 'Group 2', downloadPath: null, marks_obtained: 8},
      {rollNo: '0200-BSCS-17', name: 'Asif', group: 'Group 3', downloadPath: null, marks_obtained: 4},
      {rollNo: '0200-BSCS-17', name: 'Saqlain', group: 'Group 2', downloadPath: null, marks_obtained: 6},
      {rollNo: '0200-BSCS-17', name: 'Bilal', group: 'Group 1', downloadPath: null, marks_obtained: 8}
    ],
    total_marks: 10
  }
};

export function ProjectComponentReducer(
  state = initialState,
  action: fromProjectComponentActions.ProjectComponentActions) {
  switch (action.type) {
    case fromProjectComponentActions.STORE_DATA:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}

