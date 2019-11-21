import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import undefined = require('firebase/empty-import');

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
    console.log(f.value);
    this.isLoading = true;
    this.authService.emailAndPasswordSingin(f.value).then(resp => {
      this.isLoading = false;
      if (resp === undefined) {
        return;
      }

      if (resp.code === 'auth/wrong-password') {
        return this.error = 'Credenciales incorrectas';
      }

      if (resp.code === 'auth/user-not-found') {
        return this.error = 'Credenciales incorrectas';
      }

      if (resp.code === 'auth/too-many-requests') {
        return this.error = 'Muchos intentos fallidos intente más tarde';
      }
    });
  }
}
