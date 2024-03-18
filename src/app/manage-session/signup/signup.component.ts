import { LoadingManagerService } from './../../.models/loadingService';
import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/.services/alert.service';
import { UserService } from 'src/app/.services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private userService: UserService,
    private destroyRef: DestroyRef,
    private loadingManagerService: LoadingManagerService,
    private alertService: AlertService
  ) {}
  reactiveForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    repetedPassword: new FormControl(null, Validators.required),
    terms: new FormControl(null, Validators.requiredTrue),
  });
  onRegister() {
    if (this.reactiveForm.valid) {
      this.loadingManagerService.startLoading();
      if (
        this.reactiveForm.get('password').value !=
        this.reactiveForm.get('repetedPassword').value
      ) {
        this.loadingManagerService.stopLoading();
        this.alertService.showErrorMessage('PASSWORD_NOT_EQUALS');
      } else
        this.userService
          .register(
            this.reactiveForm.get('email').value,
            this.reactiveForm.get('password').value
          )
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((response) => {
            this.loadingManagerService.stopLoading();
            if (response.code < 0) {
              this.alertService.showErrorMessage(response.message);
            } else {
              this.alertService.showSuccessMessage(response.message);
            }
          });
    }
  }
}
