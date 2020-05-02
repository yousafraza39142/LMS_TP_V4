import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main.component';
import {ComplaintsComponent} from './complaints/complaints.component';
import {HomeComponent} from './home/home.component';
import {PreviousCoursesComponent} from './previous-courses/previous-courses.component';
import {TeacherAssesmentComponent} from './teacher-assesment/teacher-assesment.component';
import {TimeTableComponent} from './time-table/time-table.component';
import {CompleteTranscriptComponent} from './examination/complete-transcript/complete-transcript.component';
import {SemesterTranscriptComponent} from './examination/semester-transcript/semester-transcript.component';
import {DateSheetComponent} from './examination/date-sheet/date-sheet.component';
import {FeeStructureComponent} from './student-services/fee-structure/fee-structure.component';
import {StudentInformationComponent} from './student-services/student-information/student-information.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: 'complaints', component: ComplaintsComponent },
      { path: 'course', loadChildren: () => import(`./course/course.module`).then(m => m.CourseModule) },
      { path: 'completeTranscript', component: CompleteTranscriptComponent },
      { path: 'semesterTranscript', component: SemesterTranscriptComponent },
      { path: 'dateSheet', component: DateSheetComponent },
      { path: 'home', component: HomeComponent },
      { path: 'previousCourses', component: PreviousCoursesComponent },
      { path: 'feeStructure', component: FeeStructureComponent },
      { path: 'studentInformation', component: StudentInformationComponent },
      { path: 'teacherAssessment', component: TeacherAssesmentComponent },
      { path: 'timeTable', component: TimeTableComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
