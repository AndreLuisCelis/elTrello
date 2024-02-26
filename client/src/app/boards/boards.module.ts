import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './components/boards/boards.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/service/auth-guard.service';


const routes: Routes = [ {
  path:'boards',
  component: BoardsComponent,
  canActivate: [AuthGuardService]
}]

@NgModule({
  declarations: [
    BoardsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BoardsModule { }
