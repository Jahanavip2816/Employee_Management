import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {
  employee = { name: '', workMode: 'Office', hours: '', status: '', attendance: 'Present', file: '' };
  employeesList: any[] = [];

  constructor(private router: Router) {}

  submitWork() {
    this.employeesList.push({ ...this.employee });
    localStorage.setItem('employeesList', JSON.stringify(this.employeesList));
    alert("Work Submitted Successfully ✅");
    this.employee = { name: '', workMode: 'Office', hours: '', status: '', attendance: 'Present', file: '' };
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) this.employee.file = file.name;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
