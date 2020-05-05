import * as StudentServicesActions from './teacher-information.actions';
import {TeacherInformationModel} from '../teacher-information.model';

export interface State {
  teacherInformation: TeacherInformationModel;
}

const initialState: State = {
  teacherInformation: new TeacherInformationModel('0263-bscs-2016', 'saqlain', 'ghulam',
    '33202-5654879465', 465421324, 'lahore'),
};

export function teacherInformationReducer(
  state = initialState,
  action: StudentServicesActions.TeacherInformationActions) {
  switch (action.type) {
    case 'SET_STUDENT_INFORMATION': {
      return {
        ...state,
        studentInformation: action.payload
      };
    }
    default:
      return state;
  }

}
