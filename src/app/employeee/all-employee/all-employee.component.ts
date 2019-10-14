import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeMgmtService } from '../employee-mgmt.service';
import { UserMgmtService } from '../../user-mgmt.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-all-employee',
  templateUrl: './all-employee.component.html',
  styleUrls: ['./all-employee.component.css']
})
export class AllEmployeeComponent implements OnInit {

  public title: string = "Employee Management Portal";

  allEmployee = [];
  userName: string;

  constructor(public empService: EmployeeMgmtService, public toastrService: ToastrService,
    public router: Router, 
    public userManagementService: UserMgmtService, public cookieService: CookieService) {
  }

  ngOnInit() {
    this.userName=this.cookieService.get("username")
    this.checkStatus();
    this.getAllEmployees();
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


  // function to get all Employees 
  getAllEmployees = () => {
    this.empService.getAllEmployees().subscribe((data) => {
      if (data != null) {
        this.allEmployee = data;
     }
     else
     this.toastrService.error("Error got in receiving all employees. ")
    },
      err => {
        this.toastrService.error("Some error occured.")
      }
    );
  };  

  // function for navigating to edit Employee component
  public editEmployee = (id) => {
    this.router.navigate(['edit', id])
  }

  // function to logout user
  public logout = () => {
        this.userManagementService.logout()
  }
}
