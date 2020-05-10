import {Component, OnInit} from '@angular/core';
import * as fromApp from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import {TimeTableModal} from './time-table.modal';
import {SlideInFromLeft} from '../../transitions';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class TimeTableComponent implements OnInit {

  public timetableData: TimeTableModal;
  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.store.select('fromTimeTable').subscribe(
      state => {
        this.timetableData = state.timetable;
      }
    );
  }

}
