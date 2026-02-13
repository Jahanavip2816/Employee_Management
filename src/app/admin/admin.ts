import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent {
  constructor(private router: Router) { }

  employees: any[] = JSON.parse(localStorage.getItem('submissions') || '[]');

  approve(emp: any) {
    emp.actionStatus = 'Approved';
    this.saveSubmissions();
  }

  reject(emp: any) {
    emp.actionStatus = 'Rejected';
    this.saveSubmissions();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  saveSubmissions() {
    localStorage.setItem('submissions', JSON.stringify(this.employees));
  }
}
