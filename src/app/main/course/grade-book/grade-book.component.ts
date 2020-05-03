import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import {GradeBookModal} from './grade-book.modal';

@Component({
  selector: 'app-grade-book',
  templateUrl: './grade-book.component.html',
  styleUrls: ['./grade-book.component.css']
})
export class GradeBookComponent implements OnInit {
  public gradebook: GradeBookModal;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select('fromCourse').subscribe(
      state => {
        this.gradebook = state.gradeBook;
      }
    );
  }

}
