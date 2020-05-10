import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SlideInFromLeft} from '../../../transitions';

@Component({
  selector: 'app-mid-term',
  templateUrl: './mid-term.component.html',
  styleUrls: ['./mid-term.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class MidTermComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  OnCreateMidTermClicked() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  OnStudentsMidtermClicked() {
    this.router.navigate(['students-mid-term'], {relativeTo: this.route});
  }
}
