import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {

  constructor(private router: Router) { }

  employee = {
    id: 0, // unique id for editing
    name: '',
    email:'',
    workMode: 'Office',
    hours: '',
    status: '',
    attendance: 'Present',
    file: ''
  };

  submissions: any[] = [];

  ngOnInit() {
    // Load only submissions for this user
    const allSubmissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.submissions = allSubmissions.filter((s: any) => s.email === currentUser.email);
  }

  submitWork() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.employee.id = Date.now(); // unique id
    this.employee['email'] = currentUser.email;

    const allSubmissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    allSubmissions.push({ ...this.employee });
    localStorage.setItem('submissions', JSON.stringify(allSubmissions));

    alert("Work Submitted Successfully ✅");

    // Auto-logout after submit
    localStorage.removeItem('currentUser');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  editWork(submission: any) {
    // Load submission into form
    this.employee = { ...submission };
  }

  updateWork() {
    const allSubmissions = JSON.parse(localStorage.getItem('submissions') || '[]');

    const index = allSubmissions.findIndex((s: any) => s.id === this.employee.id);
    if (index !== -1) {
      allSubmissions[index] = { ...this.employee };
      localStorage.setItem('submissions', JSON.stringify(allSubmissions));
      alert("Work Updated Successfully ✅");

      // Clear form
      this.employee = { id: 0, name: '', email:'', workMode: 'Office', hours: '', status: '', attendance: 'Present', file: '' };
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.employee.file = file.name;
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
