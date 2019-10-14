import { Component, OnInit } from '@angular/core';
import { EmployeeMgmtService } from '../employee-mgmt.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserMgmtService } from 'src/app/user-mgmt.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  empName: any;
  empLocation: any;
  empEmail: any;
  empDOB: any;
  public title: string = "Employee Management Portal";
  userName: string;

  constructor(public empService: EmployeeMgmtService, public toastrService: ToastrService,
    public router: Router,
    public userManagementService: UserMgmtService, public cookieService: CookieService) {
  }

  ngOnInit() {
    this.userName=this.cookieService.get("username")
    this.checkStatus();
  }

  // function to check whether user is logged in or not
  public checkStatus = () => {
    if (this.cookieService.get('authToken') === undefined || this.cookieService.get('authToken') === '' ||
      this.cookieService.get('authToken') === null) {
      this.toastrService.error("Please login first.");
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }

  // function to add employee
  addEmployee = () => {
    if (!this.empName || this.empName.trim().length == 0) {
      this.toastrService.warning("Enter employee name!")
    }
    else if (!this.empLocation || this.empLocation.trim().length == 0) {
      this.toastrService.warning("Enter Location!")
    }
    else if (!this.empEmail || this.empEmail.trim().length == 0) {
      this.toastrService.warning("Enter Email!")
    }

    else if (!this.empDOB || this.empDOB.trim().length == 0) {
      this.toastrService.warning("Select Date of birth!")
    }

    else {
      let empData = {
        empName: this.empName,
        empLocation: this.empLocation,
        empEmail: this.empEmail,
        empDOB: this.empDOB
      }
      this.empService.addEmployee(empData).subscribe((apiResponse) => {
        if (apiResponse !== null) {
          this.toastrService.show("Employee added successfully.");
          this.viewAllEmployees()
        }
        else {
          this.toastrService.error("Some error occured while adding employee.")
        }
      }, (err) => {
        this.toastrService.error("Some error occured.")
      })
    }
  }

  viewAllEmployees() {
    this.router.navigate(['/dashboard']);
  }

  // function to logout user
  public logout = () => {
    this.cookieService.delete('authToken');
    this.cookieService.delete('userName');
    this.toastrService.success("Logged out successfully.")
    this.router.navigate(['/']);
  }

}
