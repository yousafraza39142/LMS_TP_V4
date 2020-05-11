import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromCourseUpload from './store/course-upload.actions';
import {CourseUpload, UploadResponse} from './store/course-upload.reducer';
import {SlideInFromLeft} from '../../transitions';

@Component({
  selector: 'app-course-upload',
  templateUrl: './course-upload.component.html',
  styleUrls: ['./course-upload.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class CourseUploadComponent implements OnInit {
  show: boolean;
  uploadResponse: UploadResponse;
  info: CourseUpload;
  private file: any;

  constructor(private store: Store<fromApp.AppState>) {
    this.show = false;
  }

  ngOnInit(): void {
    this.store.select('fromCourseUpload').subscribe(
      state => {
        this.info = state.info;
      }
    );
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.show = true;
    } else {
      this.show = false;
      this.uploadResponse = {
        course: form.value.course,
        section: form.value.section,
        title: form.value.title,
        filePath: form.value.filePath,
      };
      this.store.dispatch(new fromCourseUpload.StoreInformation(this.uploadResponse));
      setTimeout(() => {
        this.store.select('fromCourseUpload').subscribe(
          state => {
            console.log(state.response);
          }
        );
      }, 2000);
    }
  }

  onClose() {
    this.show = false;
  }
}
