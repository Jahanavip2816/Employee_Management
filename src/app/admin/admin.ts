import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent {
  employees = [
    { name: 'Jahanavi', workMode: 'Work From Home', hours: '9AM - 6PM', status: 'Completed API integration', attendance: 'Present' },
    { name: 'Rahul', workMode: 'Office', hours: '10AM - 7PM', status: 'On leave request', attendance: 'On Leave' }
  ];

  constructor(private router: Router) {}

  approve(emp: any) { alert(emp.name + " Approved"); }
  reject(emp: any) { alert(emp.name + " Rejected"); }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
