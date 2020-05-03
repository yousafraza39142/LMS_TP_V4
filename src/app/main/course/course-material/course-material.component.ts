import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../../store/app.reducers';
import {Store} from '@ngrx/store';
import {CourseMaterialModal} from './course-material.modal';

@Component({
  selector: 'app-course-material',
  templateUrl: './course-material.component.html',
  styleUrls: ['./course-material.component.css']
})
export class CourseMaterialComponent implements OnInit {
  public courseMaterial: CourseMaterialModal[];
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select('fromCourse').subscribe(
      state => {
        this.courseMaterial = state.courseMaterial;
      }
    );
  }

}
