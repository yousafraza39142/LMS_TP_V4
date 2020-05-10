import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SlideInFromLeft} from '../../transitions';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class AttendanceComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  OnCreateAttendanceClicked() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  onAnswerQueriesClicked() {
    this.router.navigate(['student-attendance'], {relativeTo: this.route});
  }
}
