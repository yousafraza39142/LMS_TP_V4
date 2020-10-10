import {Component, OnInit} from '@angular/core';
import * as fromApp from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import {TimeTableModal} from './time-table.modal';
import {SlideInFromLeft} from '../../transitions';
import {baseUrl} from '../attendance/attendance-services/attendance.service';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

// tslint:disable-next-line:class-name
export interface timeTable {
  DAY: string;
  END_TIME: null;
  ROOM_NM: string;
  SECTION: string;
  START_TIME: string;
  SUB_NM: string;
}


@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class TimeTableComponent implements OnInit {

  public timetableData: [timeTable[], timeTable[], timeTable[], timeTable[], timeTable[]];

  constructor(private httpService: HttpClient) {
  }

  ngOnInit() {
    this.getTimeTable(JSON.parse(localStorage.getItem('teacherInfo')).FM_ID, 11).pipe(map(
      (value: timeTable[]) => {
        console.log(value);
        const monday = value.filter(value1 => !!value1.DAY.toLowerCase().match('monday'));
        const tuesday = value.filter(value1 => !!value1.DAY.toLowerCase().match('tuesday'));
        const wednesday = value.filter(value1 => !!value1.DAY.toLowerCase().match('wednesday'));
        const thursday = value.filter(value1 => !!value1.DAY.toLowerCase().match('thursday'));
        const friday = value.filter(value1 => !!value1.DAY.toLowerCase().match('friday'));

        return [monday, tuesday, wednesday, thursday, friday];
      })).subscribe(
      (value: [timeTable[], timeTable[], timeTable[], timeTable[], timeTable[]]) => {
        this.timetableData = value;
      }
    );
  }

  getTimeTable(FM_ID: number, C_CODE: number) {
    const url = `${baseUrl}/api/TeacherTimeTable/getTeacherTimeTable?FM_ID=${FM_ID}&C_CODE=${C_CODE}`;

    return this.httpService.get(url);
  }

}
