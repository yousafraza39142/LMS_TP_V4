import { Component, OnInit } from '@angular/core';
import {SlideInFromLeft} from '../../../transitions';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class QueriesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
