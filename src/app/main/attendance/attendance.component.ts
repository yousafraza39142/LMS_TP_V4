import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
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
