import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import {SemestersFeeModal} from './semestersFee.modal';
@Component({
  selector: 'app-fee-structure',
  templateUrl: './fee-structure.component.html',
  styleUrls: ['./fee-structure.component.css']
})
export class FeeStructureComponent implements OnInit {
  public semestersFee: SemestersFeeModal;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('fromStudentService').subscribe(
      state => {
        this.semestersFee = state.semestersFee;
      }
    );
  }

}
