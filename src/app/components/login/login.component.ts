import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../shared/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  private readonly accountService: AccountService;
  private readonly router: Router;

  public constructor(accountService: AccountService, router: Router) {
    this.accountService = accountService;
    this.router = router;
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    });
  }

  public handleButtonClick(): void {
    if (this.form.invalid) {
      return;
    }

    this.accountService.login(this.form.value.name, this.form.value.password)
      .subscribe(result => {
        this.form.setErrors({ 'invalid': true });
        if (result) {
          this.router.navigate(['/']);
        } else {
          this.form.controls.password.setErrors({ incorrect: true });
        }
      });
  }

  public getLoginErrorMessage(): string {
    const messages = {
      required: 'You have to enter your login name.'
    }

    const error = Object.getOwnPropertyNames(this.form.controls.name.errors)[0];

    return messages[error];
  }

  public getPasswordErrorMessage(): string {
    const messages = {
      required: 'You have to enter your password.',
      incorrect: 'Login and password combination is incorrect.'
    }

    const error = Object.getOwnPropertyNames(this.form.controls.password.errors)[0];

    return messages[error];
  }
}
