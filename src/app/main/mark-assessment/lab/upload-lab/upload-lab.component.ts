import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';

@Component({
  selector: 'app-upload-lab',
  templateUrl: './upload-lab.component.html',
  styleUrls: ['./upload-lab.component.css']
})
export class UploadLabComponent implements OnInit {

  courses: CourseModal[];
  sections: SectionModal[];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('fromMarkAssessment').subscribe(
      state => {
        // console.log(state);
        this.courses = state.courses;
        this.sections = state.sections;
      }
    );
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
