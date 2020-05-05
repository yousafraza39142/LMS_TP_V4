import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  OnUploadAssignmentClicked() {
    this.router.navigate(['upload'], {relativeTo: this.route});
  }

  OnStudentAssignmentsCicked() {
    this.router.navigate(['students-assignments'], {relativeTo: this.route});
  }
}
