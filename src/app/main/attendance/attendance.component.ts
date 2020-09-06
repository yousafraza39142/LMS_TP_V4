import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SlideInFromLeft} from '../../transitions';
import {AttendanceService} from './attendance-services/attendance.service';
import {CourseModal} from '../../shared/course.modal';
import {SectionModal} from '../../shared/SectionModal';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class AttendanceComponent implements OnInit {

  courses: Array<CourseModal>;
  sections: Array<SectionModal>;

  constructor(private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {

  }
  OnCreateAttendanceClicked() {
    // this.router.navigate(['create'], {relativeTo: this.route});
  }

  onAnswerQueriesClicked() {
    // this.router.navigate(['student-attendance'], {relativeTo: this.route});
  }

  fetchSections() {
  }
}
