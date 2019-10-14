import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserMgmtService {

  private url: String = 'http://localhost:8080/api/v1';

  constructor(public http: HttpClient, private cookieService: CookieService,
    public toastrService: ToastrService, public router: Router) {
  }

  // function for signin with username and password 
  public signinFunction(data): any {
    return this.http.post(`${this.url}/users/login`, data);
  }

  // function to logout user 
  public logout(): any {
    this.cookieService.delete('authToken');
    this.cookieService.delete('userName');
    this.toastrService.success("Logged out successfully.")
    this.router.navigate(['/']);
  } // end logout function

  // function to handle errors during http call
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    } // end condition *if
    return Observable.throw(errorMessage);
  }  // END handleError
}
