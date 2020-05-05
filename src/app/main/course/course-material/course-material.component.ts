import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../../store/app.reducers';
import {Store} from '@ngrx/store';
import {CourseMaterialModal} from './course-material.modal';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-course-material',
  templateUrl: './course-material.component.html',
  styleUrls: ['./course-material.component.css']
})
export class CourseMaterialComponent implements OnInit {
  public courseMaterial: CourseMaterialModal[] = [];
  constructor(private store: Store<fromApp.AppState>,
              private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:12345/api/CourseMaterials/CourseMaterialsBySubCode?dep_id=1&maj_id=1&c_code=1&sub_code=SUB_CODE_A')
      .subscribe(
        s => {
          for (const index in s) {
            this.courseMaterial[index] = new CourseMaterialModal(s[index].CM_TITLE, s[index].FILENAME, s[index].FILEPATH);
          }
        }
      );
    this.store.select('fromCourse').subscribe(
      state => {
        state.courseMaterial = this.courseMaterial;
      }
    );
  }

}
