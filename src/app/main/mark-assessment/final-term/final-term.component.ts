import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SlideInFromLeft} from '../../../transitions';

@Component({
  selector: 'app-final-term',
  templateUrl: './final-term.component.html',
  styleUrls: ['./final-term.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class FinalTermComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

}
