import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { AppComponent } from "./app.component";
import { UserService } from "./services/user.service";
import { TaskService } from "./services/task.service";
import { AuthService } from "./services/auth.service";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { LoginComponent } from "./components/login.component";
import { SignupComponent } from "./components/signup.component";
import { WeeklyBoardComponent } from "./components/weekly-board/weekly-board.component";
import { DialogComponent } from "./components/dialog/dialog.component";
import { DayCardComponent } from "./components/day-card/day-card.component";
import { TaskCreationDialogComponent } from "./components/task-creation-dialog/task-creation-dialog.component";
import { TaskViewDialogComponent } from "./components/task-view-dialog/task-view-dialog.component";
import { TaskEditDialogComponent } from "./components/task-edit-dialog/task-edit-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    WeeklyBoardComponent,
    DialogComponent,
    DayCardComponent,
    TaskCreationDialogComponent,
    TaskViewDialogComponent,
    TaskEditDialogComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    LoginComponent,
    SignupComponent,
  ],
  providers: [
    UserService,
    TaskService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
