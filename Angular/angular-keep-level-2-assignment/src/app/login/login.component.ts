import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {RouterService} from '../services/router.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required]);

    public bearerToken: any;
    public submitMessage: string;

    constructor(private authService: AuthenticationService, public routerService: RouterService) {
    }

    loginSubmit() {
      this.authService.authenticateUser({
        username: this.username.value,
        password: this.password.value
      })
      .subscribe(
        res => {
          this.bearerToken = res['token'];
          this.authService.setBearerToken(this.bearerToken);
          this.routerService.routeToDashboard();
        },
        err => {
          if (err.status === 403) {
            this.submitMessage = err.error.message;
          } else {
            this.submitMessage = err.message;
          }
        }
      );
    }

    getUserNameErrorMessage() {
      return this.username.hasError('required') ? 'You must enter a value' : '';
    }
    getPasswordErrorMessage() {
     return this.password.hasError('required') ? 'You must enter a value' : '';
   }
}
