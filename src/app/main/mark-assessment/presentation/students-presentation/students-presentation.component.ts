import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PresentationData, PresentationTable} from '../store/presentation.component.reducer';
import {CourseModal} from '../../../../shared/course.modal';
import {SectionModal} from '../../../../shared/SectionModal';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';
import {PresentationModal} from '../../../../shared/PresentationModal';
import {SlideInFromLeft} from '../../../../transitions';
import {AssignmentModal} from '../../../../shared/AssignmentModal';
import {AssignmentApiService} from '../../assignments/assignment-services/assignment-api.service';
import {MarkAssessmentService} from '../../mark-assessment.service';
import {AssessmentTypes} from '../../../../shared/AssessmentTypes';
import {AssessmentTable} from '../../assignments/student-assignment/student-assignment.component';

@Component({
  selector: 'app-students-presentation',
  templateUrl: './students-presentation.component.html',
  styleUrls: ['./students-presentation.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class StudentsPresentationComponent implements OnInit {
  totalMarks: number;
  studentsPresTable: Array<AssessmentTable>;
  presentations: Array<AssignmentModal>;
  courses: Array<CourseModal>;
  sections: Array<SectionModal>;
  @ViewChild('c') selectCourse: ElementRef;
  @ViewChild('s') selectSection: ElementRef;
  @ViewChild('pre') selectedPresentation: ElementRef;
  @ViewChild('marks') marksInp: ElementRef;

  constructor(private store: Store<AppState>,
              private assignmentApiService: AssignmentApiService,
              private markAssessmentService: MarkAssessmentService) {
    this.courses = new Array<CourseModal>();
    this.sections = new Array<SectionModal>();
    this.presentations = new Array<AssignmentModal>();
    this.studentsPresTable = new Array<AssessmentTable>();
  }

  ngOnInit(): void {

    this.markAssessmentService.getCourseForTeacher(JSON.parse(localStorage.getItem('teacherInfo')).FM_ID).subscribe(
      data => {
        // @ts-ignore
        for (const course: { SUB_NM: string } of data) {
          this.courses.push(new CourseModal(course.SUB_NM));
        }
        if (this.courses.length > 0) {
          // tslint:disable-next-line:max-line-length
          this.markAssessmentService.getSectionsForTeacherinCourse(JSON.parse(localStorage.getItem('teacherInfo')).FM_ID, this.courses[0].courseTitle).subscribe(
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
                  AssessmentTypes.PRESENTATION).subscribe(
                  presentations => {
                    // @ts-ignore
                    for (const presentation of presentations) {
                      this.presentations.push(new PresentationModal(presentation.ASSIGNMENT_TITLE));
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

  OnSubmit() {
    for (const s of this.studentsPresTable) {
      this.studentsPresTable.pop();
    }

    if (this.selectSection.nativeElement.value === '' ||
      this.selectCourse.nativeElement.value === '' ||
      this.selectedPresentation.nativeElement.value === '') {
      return;
    }

    this.assignmentApiService.getAssignmentsListOfStudents(this.selectSection.nativeElement.value,
      this.selectCourse.nativeElement.value, this.selectedPresentation.nativeElement.value, AssessmentTypes.PRESENTATION).subscribe(
      students => {
        const list = students as AssessmentTable[];
        if (list.length > 0) {
          this.totalMarks = students[0].ASS_TOT_MRKS;
        }
        // @ts-ignore
        for (const std of students) {
          console.log(std);
          this.studentsPresTable.push(std);
        }
      }
    );
  }

  OnCourseChange(c: HTMLSelectElement, s: HTMLSelectElement) {
    // Clear previous sections
    for (const sec of this.sections) {
      this.sections.pop();
    }

    // Fetch New Sections on Course Change
    this.markAssessmentService.getSectionsForTeacherinCourse(JSON.parse(localStorage.getItem('teacherInfo')).FM_ID, c.value).subscribe(
      section => {
        // @ts-ignore
        for (const sec: { SECTION: string } of section) {
          this.sections.push(new SectionModal(sec.SECTION));
        }

        // Clear Assignments List for new Incoming Assignments
        this.clearPresentations();

        console.log('Course Change New:', this.sections[0].sectionTitle, c.value);


        if (this.sections.length > 0) {
          console.log('called');
          // tslint:disable-next-line:max-line-length
          console.log('Course Change:', this.sections[0].sectionTitle, c.value);
          // tslint:disable-next-line:max-line-length
          this.assignmentApiService.getAssignmentList(this.sections[0].sectionTitle, this.selectCourse.nativeElement.value, AssessmentTypes.PRESENTATION).subscribe(
            presentations => {
              // @ts-ignore
              for (const presentation of presentations) {
                this.presentations.push(new PresentationModal(presentation.ASSIGNMENT_TITLE));
              }
            }
          );
        }



      }
    );
  }

  OnSectionChange(s: HTMLSelectElement) {
    // Clear Assignments Drop Down
    this.clearPresentations();

    console.log();
    console.log(this.selectCourse);
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    this.assignmentApiService.getAssignmentList(this.selectSection.nativeElement.value, this.selectCourse.nativeElement.value, AssessmentTypes.PRESENTATION).subscribe(
      presentations => {
        // @ts-ignore
        for (const assignment of presentations) {
          this.presentations.push(new AssignmentModal(assignment.ASSIGNMENT_TITLE));
        }
      }
    );
  }

  OnMarksChange(param: { std: AssessmentTable; marks: string }) {
    let marks = parseInt(param.marks, 0);
    if (marks > this.totalMarks) {
      marks = this.totalMarks;
      this.marksInp.nativeElement.value = this.totalMarks;
    } else if (marks < 0) {
      marks = 0;
      this.marksInp.nativeElement.value = 0;
    } else if (isNaN(marks)) {
      marks = 0;
      this.marksInp.nativeElement.value = 0;
    }
    console.log(param.std, param.marks);
    // tslint:disable-next-line:max-line-length
    console.log(this.selectSection.nativeElement.value, this.selectedPresentation.nativeElement.value, this.selectCourse.nativeElement.value);
    // tslint:disable-next-line:max-line-length
    this.markAssessmentService.markAssessment(param.std.YEAR, param.std.C_CODE, param.std.D_ID, param.std.MAJ_ID, param.std.RN, this.selectCourse.nativeElement.value, this.selectSection.nativeElement.value, this.selectedPresentation.nativeElement.value, AssessmentTypes.PRESENTATION, marks)
      .subscribe(
        data => {
        }
      );
  }

  clearPresentations() {
    for (const pres of this.presentations) {
      this.presentations.pop();
    }
  }

}
