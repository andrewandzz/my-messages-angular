import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AccountService } from '../services/account.service';

@Injectable()
export class UserLoggedInGuard implements CanActivate {
  private readonly accountService: AccountService;
  private readonly router: Router;

  public constructor(accountService: AccountService, router: Router) {
    this.accountService = accountService;
    this.router = router;
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.accountService.isLoggedIn()
      .pipe(switchMap(isLoggedIn => {
        if (isLoggedIn) {
          return of(true);
        } else {
          return of(this.router.createUrlTree(['/login']));
        }
      }))
  }

}
