import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { UserService } from "./services/user.service";
import { TaskService } from "./services/task.service";
import { AuthService } from "./services/auth.service";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { DialogComponent } from "./components/dialog/dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
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
