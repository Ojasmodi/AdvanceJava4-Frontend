import { Component, OnInit } from '@angular/core';
import { EmployeeMgmtService } from '../employee-mgmt.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { UserMgmtService } from 'src/app/user-mgmt.service';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  private empName;
  private empLocation;
  private empEmail;
  private empDOB;
  private empId;
  private currentEmployee;
  public title: string = "Employee Management Portal";
  userName: string;


  constructor(public empService: EmployeeMgmtService, public toastrService: ToastrService,
    public router: Router, public route: ActivatedRoute,
    public userManagementService: UserMgmtService, public cookieService: CookieService) {
  }

  ngOnInit() {
    this.userName=this.cookieService.get("username")
    this.checkStatus();
    this.empId=this.route.snapshot.paramMap.get('id');
    this.empService.getEmployeeById(this.empId).subscribe(
      data => {
        this.currentEmployee = data;
        this.empName=this.currentEmployee.empName;
        this.empLocation=this.currentEmployee.empLocation;
        this.empDOB=this.currentEmployee.empDOB;
        this.empDOB=new Date(this.empDOB).toISOString().split('T')[0]
        this.empEmail=this.currentEmployee.empEmail;
      },
      error => {
        console.log(error.errorMessage);
      }
    )

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

  // function to update employee
  editEmployee = () => {
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
      let empData={
        empName:this.empName,
        empLocation:this.empLocation,
        empEmail:this.empEmail,
        empDOB:this.empDOB
      }
      this.empService.editEmployee(empData,this.empId).subscribe((apiResponse) => {
          this.toastrService.success("Employee updated successfully.");
          this.viewAllEmployees()
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
    this.userManagementService.logout();
   
}

}
