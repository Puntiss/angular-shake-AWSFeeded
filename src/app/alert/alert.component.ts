import { AlertMsg, AlertService } from './../.services/alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  constructor(private alertService: AlertService) {}

  errorMessage: string = '';
  successMessage: string = '';

  ngOnInit() {
    this.alertService.onMessage.subscribe((response: AlertMsg) => {
      if (response.type === 'ERROR') {
        this.errorMessage = response.msg;
        setInterval(() => (this.errorMessage = ''), 5000);
      } else if (response.type === 'SUCCESS') {
        this.successMessage = response.msg;
        setInterval(() => (this.successMessage = ''), 5000);
      }
    });
  }
}
