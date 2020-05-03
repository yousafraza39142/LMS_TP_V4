import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() message = 'Fuck';
  // tslint:disable-next-line:no-output-native
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  ngOnInit(): void {
    setTimeout(() => {
      $('.backdrop').css('opacity', '1');
    }, 50);
  }
}
