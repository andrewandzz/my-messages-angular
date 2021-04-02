import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;

  private readonly accountService: AccountService;
  private readonly router: Router;

  public constructor(
    accountService: AccountService,
    router: Router
  ) {
    this.accountService = accountService;
    this.router = router;
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  public handleButtonClick(): void {
    if (this.form.invalid) {
      return;
    }

    this.accountService.register(this.form.value.login, this.form.value.password)
      .pipe(
        catchError(err => {
          if (err.status === 409) {
            this.form.controls.login.setErrors({ exists: true });
          }

          return of();
        })
      ).subscribe(_ => this.login());
  }

  public getLoginErrorMessage(): string {
    const messages = {
      required: 'You have to create your login name.',
      minlength: 'Too short login name. It should contain 3+ characters.',
      maxlength: 'Too long login name. Try to come up with a shorter one.',
      exists: 'This login name already exists. Try to come up with another one.'
    };

    const error = Object.getOwnPropertyNames(this.form.controls.login.errors)[0];

    return messages[error];
  }

  public getPasswordErrorMessage(): string {
    const messages = {
      required: 'You have to create a password.',
      minlength: 'Too short password. It should contain 6+ characters.'
    };

    const error = Object.getOwnPropertyNames(this.form.controls.password.errors)[0];

    return messages[error];
  }

  private login(): void {
    this.accountService.login(this.form.value.login, this.form.value.password)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/']);
        }
      })
  }
}