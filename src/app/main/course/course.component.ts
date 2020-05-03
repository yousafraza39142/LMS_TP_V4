import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    $('ul.navbar-nav > li.nav-item').on('click', () => {
      $('.navbar-collapse').collapse('hide');
    });
  }

  OnAnnouncementClicked() {
    this.router.navigate(['annoucement'], {relativeTo: this.route});
  }

  OnCourseOutlineClicked() {
    this.router.navigate(['courseOutline'], {relativeTo: this.route});
  }

  OnCourseMaterialClicked() {
    this.router.navigate(['courseMaterial'], {relativeTo: this.route});
  }

  OnSubmitAssignmentClicked() {
    this.router.navigate(['submitAssignment'], {relativeTo: this.route});
  }

  OnGradeBookClicked() {
    this.router.navigate(['gradeBook'], {relativeTo: this.route});
  }

  OnLeaveStatusClicked() {
    this.router.navigate(['leaveStatus'], {relativeTo: this.route});
  }

  OnAskQuestionClicked() {
    this.router.navigate(['askQuestion'], {relativeTo: this.route});
  }
}
