import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';

const modules = [
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatMenuModule,
  MatListModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatFormFieldModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }
