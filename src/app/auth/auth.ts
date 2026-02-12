import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('role');
  }
}
