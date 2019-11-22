import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  error: string;
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.user$) {
      this.router.navigate(['/inventory']);
    }
  }

  loginWithEmailAndPassword(f: NgForm) {
    this.isLoading = true;
    this.authService.emailAndPasswordSingin(f.value).then(resp => {
      this.isLoading = false;
      if (resp === undefined) {
        return;
      }

      this.error = this.handleLoginErrors(resp.code);
    });
  }

  handleLoginErrors(code: string) {
    if (code === 'auth/wrong-password') {
      return 'Credenciales incorrectas';
    }

    if (code === 'auth/user-not-found') {
      return 'Credenciales incorrectas';
    }

    if (code === 'auth/too-many-requests') {
      return 'Muchos intentos fallidos intente más tarde';
    }
  }
}
