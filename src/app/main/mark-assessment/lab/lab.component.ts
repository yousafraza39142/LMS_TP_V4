import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  OnUploadProjectClicked() {
    this.router.navigate(['upload'], {relativeTo: this.route});
  }

  OnStudentsLabClicked() {
    this.router.navigate(['students-lab'], {relativeTo: this.route});
  }
}
