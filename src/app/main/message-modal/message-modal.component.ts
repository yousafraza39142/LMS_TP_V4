import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PasswordService} from '../change-password/password.service';
import {NgForm} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent implements OnInit {

  msg: string;

  constructor(private passwordService: PasswordService) {
    this.msg = '';
  }

  @Input() message = 'Null';
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
