import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineformComponent } from './components/inlineform/inlineform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TopbarComponent } from './components/topbar/topbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    InlineformComponent,
    TopbarComponent
  ],
  exports: [
     InlineformComponent,
     TopbarComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class SharedModule { }
