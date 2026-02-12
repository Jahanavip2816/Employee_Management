import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) =>
      u.email === this.email && u.password === this.password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('role', user.role);

      if (user.role === 'Admin') this.router.navigate(['/admin']);
      else this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid Credentials');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
