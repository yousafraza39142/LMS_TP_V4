import {QueryModal} from '../query-modal';
import * as ComplaintsComponentActions from '../../complaints/store/complaints.component.actions';

export interface State {
  queries: QueryModal[];
}

const initialState: State = {
  queries: [
    new QueryModal('Yousaf', '200-BSCS-17',
      'Sir Suffyan', 'Could the paper be extended to Thursday'),
    new QueryModal('Yousaf', '200-BSCS-17',
      'Sir Suffyan', 'Could the paper be extended to Thursday'),
    new QueryModal('Yousaf', '200-BSCS-17',
      'Sir Suffyan', 'Could the paper be extended to Thursday'),
    new QueryModal('Yousaf', '200-BSCS-17',
      'Sir Suffyan', 'Could the paper be extended to Thursday'),
    new QueryModal('Yousaf', '200-BSCS-17',
      'Sir Suffyan', 'Could the paper be extended to Thursday')
  ]
};

export function StudentQueriesReducer(
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
