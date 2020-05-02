import {ComplaintModel} from '../complaint.model';
import * as ComplaintsComponentActions from './complaints.component.actions';

export interface State {
  information: ComplaintModel;
}

const initialState: State = {
  information: new ComplaintModel('null',
    'null',
    'null',
    'null',
    'null',
    'null',
    'null',
    false,
    false)
};

export function ComplaintsComponentReducer(
  state = initialState,
  action: ComplaintsComponentActions.ComplaintsComponentActions) {
   switch (action.type) {
    case ComplaintsComponentActions.STORE_INFORMATION:
      return {
        ...state,
        information: action.payload
      };
  }
}
