import { Component, OnInit } from '@angular/core';
import { UserMgmtService } from '../../user-mgmt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;
  public title: string = "Employee Management Portal";

  constructor(public _route: ActivatedRoute, public router: Router, private toastr: ToastrService,
    private appService: UserMgmtService, private cookieService: CookieService,
  ) {
  }

  ngOnInit() {
  }

  // function for sign-in  with username and password
  public signin = () => {
    if (!this.username || this.username.trim().length == 0) {
      this.toastr.warning('Enter username')
    }
    else if (!this.password || this.password.trim().length == 0) {
      this.toastr.warning('Enter password')
    }
    else {
      let data={
        username:this.username,
        password:this.password
      }
      this.appService.signinFunction(data)
        .subscribe((apiResponse) => {
          if (apiResponse!= null) {
            this.cookieService.set('authToken', apiResponse.id);
            this.cookieService.set('username', apiResponse.username);
            this.toastr.show('Login Successful');
            this.router.navigate(['/dashboard']);
          } else {
            this.toastr.error("Username or password error")
          }
        }, (err) => {
          this.toastr.error('Some error occured.')
        });
    }
  }
}
