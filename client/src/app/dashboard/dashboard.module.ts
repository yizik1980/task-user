import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { WeeklyBoardComponent } from '../components/weekly-board/weekly-board.component';
import { DayCardComponent } from '../components/day-card/day-card.component';
import { TaskCreationDialogComponent } from '../components/task-creation-dialog/task-creation-dialog.component';
import { TaskViewDialogComponent } from '../components/task-view-dialog/task-view-dialog.component';
import { TaskEditDialogComponent } from '../components/task-edit-dialog/task-edit-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    WeeklyBoardComponent,
    DayCardComponent,
    TaskCreationDialogComponent,
    TaskViewDialogComponent,
    TaskEditDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {}
