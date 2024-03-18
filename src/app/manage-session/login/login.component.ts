import { AlertService } from './../../.services/alert.service';
import { Response } from './../../.models/response';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/.services/user.service';
import { LoadingManagerService } from 'src/app/.models/loadingService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private loadingManagerService: LoadingManagerService,
    private router: Router
  ) {}
  reactiveForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });
  onLogin() {
    if (this.reactiveForm.valid) {
      this.loadingManagerService.startLoading();
      this.userService
        .login(
          this.reactiveForm.get('username').value,
          this.reactiveForm.get('password').value
        )
        .pipe()
        .subscribe((response: Response) => {
          this.loadingManagerService.stopLoading();
          if (response.code < 0) {
            this.alertService.showErrorMessage(response.message);
          } else {
            this.router.navigate(['/home']);
          }
        });
    }
  }
}
