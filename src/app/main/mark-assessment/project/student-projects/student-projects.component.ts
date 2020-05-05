import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';
import {ProjectModal} from '../../../../shared/ProjectModal';
import {studentProjectsTable} from '../store/project.component.reducer';

@Component({
  selector: 'app-student-projects',
  templateUrl: './student-projects.component.html',
  styleUrls: ['./student-projects.component.css']
})
export class StudentProjectsComponent implements OnInit {
  totalMarks: number;
  studentsProjectTable: studentProjectsTable[];
  projects: ProjectModal[];
  courses: CourseModal[];
  sections: SectionModal[];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select('fromProject').subscribe(
      state => {
        this.totalMarks = state.data.total_marks;
        this.studentsProjectTable = state.data.students_projects;
        this.projects = state.data.projects;
      }
    );
    this.store.select('fromMarkAssessment').subscribe(
      state => {
        console.log(state);
        this.courses = state.courses;
        this.sections = state.sections;
      }
    );
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
