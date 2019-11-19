import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnInit {
  errors: string[] = [];
  isLoading = false;
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {}

  async register(f: NgForm) {
    this.errors = [];
    this.isLoading = true;
    if (f.value.password !== f.value.passwordConfirm) {
      this.errors.push('Las contraseñas no coinciden. \n');
      this.isLoading = false;
      return;
    }

    await this.authService.emailAndPasswordSignup(f.value).then(resp => {
      if (resp.code === 'auth/weak-password') {
        this.errors.push('La contraseña debe ser de almenos 6 caracteres.');
        this.isLoading = false;
        return;
      }

      if (resp.code === 'auth/email-already-in-use') {
        this.errors.push(
          'El email ya esta ocupado por otra cuenta, intent con otro.'
        );
        this.isLoading = false;
        return;
      }
    });
  }
}
