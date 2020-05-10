import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SlideInFromLeft} from '../../../transitions';

@Component({
  selector: 'app-answer-queries',
  templateUrl: './answer-queries.component.html',
  styleUrls: ['./answer-queries.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class AnswerQueriesComponent implements OnInit {
  show: boolean;

  constructor() {
    this.show = false;
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.show = true;
    }
  }

  onClose() {
    this.show = false;
  }
}
