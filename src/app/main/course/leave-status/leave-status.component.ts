import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../../store/app.reducers';
import {Store} from '@ngrx/store';
import {LeaveStatusModal} from './leave-status.modal';
import {AbsentteeModal} from './absenttee.modal';
import {CourseModal} from '../course.modal';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-leave-status',
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.css']
})
export class LeaveStatusComponent implements OnInit {
  public absenttee: AbsentteeModal[] = [];
  public leaveStatus: LeaveStatusModal;
  public present: string;
  public absent: string;
  constructor(private store: Store<fromApp.AppState>,
              private http: HttpClient) { }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.http.get('http://localhost:12345/api/CourseAbsenttee/CourseAbsentteeBySubCode?YEAR=2016&D_ID=1&MAJ_ID=1&C_CODE=1&RN=1&SUB_CODE=SUB_CODE_A')
      .subscribe(
        s => {
          for (const index in s) {
            this.absenttee[index] = new AbsentteeModal(s[index].DA_DATE);
          }
        }
      );
    this.http.get('http://localhost:12345/api/CourseAttendance/CourseAttendanceBySubCode?YEAR=2016&D_ID=1&MAJ_ID=1&C_CODE=1&RN=1')
      .subscribe(
        s => {
          this.present = s[0].PRESENT;
          this.absent = s[0].ABSENT;
          this.leaveStatus = new LeaveStatusModal(s[0].PRESENT, s[0].ABSENT, this.absenttee);
        }
      );
    this.store.select('fromCourse').subscribe(
      state => {
        state.leaveStatus = this.leaveStatus;
      }
    );
  }

}
