import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.css']
})
export class LogInFormComponent implements OnInit {

  emailRegEx = /(?!(^[.-].*|[^@]*[.-]@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}/

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
    ) { }

  logForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegEx)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])

  })

  onSubmit() {
    this.adminService.adminLoginAuth(this.logForm.value).subscribe({
      next: (res) => {
        // alert('Welcome Admin');
        alert("Welcome back " + this.logForm.controls['email'].value);
        console.log(res);
        localStorage.setItem('token', res.data.token);
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.log(err);
        alert(`Error Logging in`);
      }
    });
    
    console.warn(this.logForm.value);
  }

  errorAlertEmail(){
    return this.logForm.controls['email'].invalid && this.logForm.controls['email'].hasError('required') && (this.logForm.controls['email'].dirty || this.logForm.controls['email'].touched) ? "Email is required" : 
    this.logForm.controls['email'].hasError('pattern') ? 'Invalid Email Address' : '' 
  }

  errorAlertPass(){
    return this.logForm.controls['password'].invalid && this.logForm.controls['password'].hasError('required') && (this.logForm.controls['password'].dirty || this.logForm.controls['password'].touched) ? "Password is required" : this.logForm.controls['password'].hasError('minlength') ? 'Password must be at least 8 characters' : ''
  }

  ngOnInit(): void {
  }

}
