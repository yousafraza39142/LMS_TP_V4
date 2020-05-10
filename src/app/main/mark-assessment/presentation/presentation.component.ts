import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SlideInFromLeft} from '../../../transitions';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class PresentationComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  OnCreatePresentationClicked() {
    this.router.navigate(['create'], {relativeTo: this.route})
  }

  OnStudentsPresentationClicked() {
    this.router.navigate(['students-presentation'], {relativeTo: this.route})
  }
}
