import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-final-term',
  templateUrl: './final-term.component.html',
  styleUrls: ['./final-term.component.css']
})
export class FinalTermComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  OnCreateFinalTermClicked() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }


  OnStudentsFinaltermClicked() {
    this.router.navigate(['students-final-term'], {relativeTo: this.route});
  }
}
