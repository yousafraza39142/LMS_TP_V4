import * as StudentServicesActions from '../store/student-services.actions';
import {StudentInformationModel} from '../student-information/student-information.model';
import {SemesterFeeModal} from '../fee-structure/semesterFee.modal';
import {SemestersFeeModal} from '../fee-structure/semestersFee.modal';

export interface State {
  studentInformation: StudentInformationModel;
  semestersFee: SemestersFeeModal;
}

const initialState: State = {
  studentInformation: new StudentInformationModel('0263-bscs-2016', 'saqlain', 'ghulam',
    '33202-5654879465', 465421324, 'lahore', 3.9, 'BSCS', '7th',
    60, 48, '8/12/2020', 'active', '654654213sads'),
  semestersFee: new SemestersFeeModal(2, [
    new SemesterFeeModal(4654654, 10, 10000, 5000, 50, 152, 25800,
      '2/25/15', '2/15/12'),
    new SemesterFeeModal(464564654, 20, 20000, 7000, 150, 150, 75800,
      '2/25/15', '2/15/12')
  ])
};

export function studentServicesreducer(
  state = initialState,
  action: StudentServicesActions.StudentServicesActions) {
  switch (action.type) {
    case 'SET_STUDENT_INFORMATION': {
      return {
        ...state,
        studentInformation: action.payload
      };
    }
    case 'SET_SEMESTERS_FEES': {
      return {
        ...state,
        semestersFee: action.payload
      };
    }
    default:
      return state;
  }

}
