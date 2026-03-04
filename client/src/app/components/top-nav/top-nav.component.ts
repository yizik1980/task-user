import { CommonModule } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { Router } from "@angular/router";
import { JWTPayload } from "@shared/models";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-top-nav",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./top-nav.component.html",
  styleUrl: "./top-nav.component.css",
})
export class TopNavComponent {
  router = inject(Router);
  authService = inject(AuthService);
  @Input()
  currentUser: JWTPayload = {} as JWTPayload;

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
