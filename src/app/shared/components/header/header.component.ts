import { Component, Input } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() public logInButton: boolean;
  @Input() public logOutButton: boolean;
  @Input() public registerButton: boolean;

  private readonly accountService: AccountService;

  public constructor(accountService: AccountService) {
    this.accountService = accountService;
    this.logInButton = false;
    this.logOutButton = false;
    this.registerButton = false;
  }

  public handleLogOutClick() {
    this.accountService.logout();

    // if we don't redirect the user to login page this way (with reloading the page),
    // then the token in sessionStorage will not completely remove (for some reason)
    // and the next user can log in causing the server to think this is the previous user
    window.location.href = 'login';
  }
}
