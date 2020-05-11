import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';
import {LabModal} from '../../../../shared/LabModal';
import {studentLabsTable} from '../store/lab.component.reducer';
import {SlideInFromLeft} from '../../../../transitions';
import {AssessmentTable} from '../../assignments/student-assignment/student-assignment.component';
import {AssignmentApiService} from '../../assignments/assignment-services/assignment-api.service';
import {MarkAssessmentService} from '../../mark-assessment.service';
import {AssignmentModal} from '../../../../shared/AssignmentModal';
import {AssessmentTypes} from '../../../../shared/AssessmentTypes';

@Component({
  selector: 'app-students-lab',
  templateUrl: './students-lab.component.html',
  styleUrls: ['./students-lab.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class StudentsLabComponent implements OnInit {
  totalMarks: number;
  studentsLabTable: Array<AssessmentTable>;
  labs: Array<LabModal>;
  courses: Array<CourseModal>;
  sections: Array<SectionModal>;
  @ViewChild('c') selectCourse: ElementRef;
  @ViewChild('s') selectSection: ElementRef;
  @ViewChild('l') selectLab: ElementRef;

  constructor(private store: Store<AppState>,
              private assignmentApiService: AssignmentApiService,
              private markAssessmentService: MarkAssessmentService) {
    this.courses = new Array<CourseModal>();
    this.sections = new Array<SectionModal>();
    this.labs = new Array<LabModal>();
    this.studentsLabTable = new Array<AssessmentTable>();
  }
  ngOnInit(): void {
    /*this.store.select('fromLab').subscribe(
      state => {
        this.totalMarks = state.data.total_marks;
        this.studentsLabTable = state.data.students_labs;
        this.labs = state.data.labs;
  }
    );
    this.store.select('fromMarkAssessment').subscribe(
      state => {
        this.courses = state.courses;
        this.sections = state.sections;
      }
    );*/
    this.markAssessmentService.getCourseForTeacher(1).subscribe(
      data => {
        // @ts-ignore
        for (const course: { SUB_NM: string } of data) {
          this.courses.push(new CourseModal(course.SUB_NM));
        }
        if (this.courses.length > 0) {
          this.markAssessmentService.getSectionsForTeacherinCourse(1, this.courses[0].courseTitle).subscribe(
            section => {
              // @ts-ignore
              for (const sec: { SECTION: string } of section) {
                this.sections.push(new SectionModal(sec.SECTION));
              }
              if (this.sections.length > 0) {
                console.log('Course', this.courses[0]);
                console.log('section', this.sections[0]);
                this.assignmentApiService.getAssignmentList(this.sections[0].sectionTitle,
                  this.courses[0].courseTitle,
                  AssessmentTypes.LAB).subscribe(
                  labs => {
                    // @ts-ignore
                    for (const lab of labs) {
                      this.labs.push(new LabModal(lab.ASSIGNMENT_TITLE));
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }

  onSubmit(form: NgForm) {
    this.assignmentApiService.getAssignmentsListOfStudents(this.selectSection.nativeElement.value,
      this.selectCourse.nativeElement.value, this.selectLab.nativeElement.value, AssessmentTypes.LAB).subscribe(
      students => {
        console.log(students);
        const list = students as AssessmentTable[];
        if (list.length > 0) {
          this.totalMarks = students[0].ASS_TOT_MRKS;
        }
        // @ts-ignore
        for (const std of students) {
          console.log(std);
          this.studentsLabTable.push(std);
        }
      }
    );
  }

  OnCourseChange(c: HTMLSelectElement) {
    // Clear previous sections
    for (const sec of this.sections) {
      this.sections.pop();
    }

    // Fetch New Sections on Course Change
    this.markAssessmentService.getSectionsForTeacherinCourse(1, c.value).subscribe(
      section => {
        // @ts-ignore
        for (const sec: { SECTION: string } of section) {
          this.sections.push(new SectionModal(sec.SECTION));
        }
      }
    );

    this.clearLab();
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    this.assignmentApiService.getAssignmentList(this.selectSection.nativeElement.value, this.selectCourse.nativeElement.value, AssessmentTypes.LAB).subscribe(
      labs => {
        // @ts-ignore
        for (const lab of labs) {
          this.labs.push(new LabModal(lab.ASSIGNMENT_TITLE));
        }
      }
    );
  }


  OnSectionChange(s: HTMLSelectElement) {
    // Clear Assignments Drop Down
    this.clearLab();

    console.log();
    console.log(this.selectCourse);
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    this.assignmentApiService.getAssignmentList(this.selectSection.nativeElement.value, this.selectCourse.nativeElement.value, AssessmentTypes.LAB).subscribe(
      labs => {
        // @ts-ignore
        for (const lab of labs) {
          this.labs.push(new LabModal(lab.ASSIGNMENT_TITLE));
        }
      }
    );
  }

  private clearLab() {
    for (const lab of this.labs) {
      this.labs.pop();
    }
  }
}
