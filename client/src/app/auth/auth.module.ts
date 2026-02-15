import { NgModule } from '@angular/core';
import { LoginComponent } from '../components/login.component';
import { SignupComponent } from '../components/signup.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    AuthRoutingModule,
    LoginComponent,
    SignupComponent
  ]
})
export class AuthModule {}
