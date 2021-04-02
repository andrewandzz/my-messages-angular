import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { ConfirmBoxComponent } from './components/confirm-box/confirm-box.component';
import { HeaderComponent } from './components/header/header.component';
import { UserLoggedInGuard } from './guards/user-logged-in.guard';
import { UserNotLoggedInGuard } from './guards/user-not-logged-in.guard';
import { AccountService } from './services/account.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    ConfirmBoxComponent,
    HeaderComponent
  ],
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    AccountService,
    UserLoggedInGuard,
    UserNotLoggedInGuard
  ],
  exports: [
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    ConfirmBoxComponent,
    HeaderComponent,
    AppRoutingModule
  ]
})
export class SharedModule { }
