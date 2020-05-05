import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import {GradeBookModal} from './grade-book.modal';
import {GradeTypeModal} from './grade-type.modal';
import {LeaveStatusModal} from '../leave-status/leave-status.modal';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-grade-book',
  templateUrl: './grade-book.component.html',
  styleUrls: ['./grade-book.component.css']
})
export class GradeBookComponent implements OnInit {
  public gradebook: GradeBookModal;
  public midTermMarks: GradeTypeModal;
  public finalTermMarks: GradeTypeModal;
  public finaltermObtMarks: string;
  public finaltermTotalMarks: string;
  public midtermTotalMarks: string;
  public midtermObtMarks: string;
  constructor(private store: Store<fromApp.AppState>,
              private http: HttpClient) { }

  ngOnInit() {
    // for the final term marks
    // tslint:disable-next-line:max-line-length
      this.http.get('http://localhost:12345/api/FinalTermMarks/FinalTermMarksBySubCode?year=2016&dep_id=1&maj_id=1&c_code=1&rn=1&sub_code=SUB_CODE_A')
        .subscribe(
          s => {
            this.finaltermObtMarks = s[0].MRKS_SS_FINAL;
            this.finaltermTotalMarks = s[0].MAX_MRKS_FINAL;
            this.finalTermMarks = new GradeTypeModal('final Term', s[0].MRKS_SS_FINAL, s[0].MAX_MRKS_FINAL);
          }
        );
      // mid term marks
    // tslint:disable-next-line:max-line-length
      this.http.get('http://localhost:12345/api/MidTermMarks/MidTermMarksBySubCode?year=2016&dep_id=1&maj_id=1&c_code=1&rn=1&sub_code=SUB_CODE_A')
      .subscribe(
        s => {
          this.midtermObtMarks = s[0].MRKS_SS_MID;
          this.midtermTotalMarks = s[0].MAX_MRKS_MID;
          this.midTermMarks = new GradeTypeModal('mid Term', s[0].MRKS_SS_MID, s[0].MAX_MRKS_MID);
        }
      );
      this.store.select('fromCourse').subscribe(
      state => {
        this.gradebook = state.gradeBook;
      }
    );
  }

}
