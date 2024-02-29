import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './components/boards/boards.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/service/auth-guard.service';
import { BoardsService } from '../shared/services/boards.service';
import { SharedModule } from '../shared/modules/inlineform/shared.module';


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
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [BoardsService]
})
export class BoardsModule { }
