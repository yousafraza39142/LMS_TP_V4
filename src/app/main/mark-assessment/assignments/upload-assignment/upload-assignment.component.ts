import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';
import {AssignmentData} from '../store/assignment.component.reducer';
import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {SlideInFromLeft} from '../../../../transitions';

@Component({
  selector: 'app-upload-assignment',
  templateUrl: './upload-assignment.component.html',
  styleUrls: ['./upload-assignment.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class UploadAssignmentComponent implements OnInit {
  data: AssignmentData;
  courses: CourseModal[];
  sections: SectionModal[];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select('fromAssignment').subscribe(
      state => {
        console.log(state.data.assignments);
        this.data = state.data;
      }
    );
    this.store.select('fromMarkAssessment').subscribe(
      state => {
        console.log(state);
        this.courses = state.courses;
        this.sections = state.sections;
      }
    );

    // if Wanna dispatch own courses
    /*this.info = {
      courses: [
        new CourseModal('YOousaf'),
        new CourseModal('Dani'),
        new CourseModal('Math'),
        new CourseModal('Chinese'),
        new CourseModal('Pk.Std')
      ],
        sections: [
        new SectionModal('Section Dani'),
        new SectionModal('Section B'),
        new SectionModal('Section C'),
        new SectionModal('Section E1'),
        new SectionModal('Section Ali')
      ]
    };*/
    // this.store.dispatch(new fromAssignmentActions.StoreData(this.info));
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
