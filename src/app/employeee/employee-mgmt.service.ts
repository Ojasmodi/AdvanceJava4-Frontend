import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeMgmtService {

  private url: String = 'http://localhost:8080/api/v1';

  constructor(public http: HttpClient) {
  }

  public editEmployee(empData, empId) {
    return this.http.put(`${this.url}/employee/update/${empId}`, empData);
  }

  public getEmployeeById(empId) {
    return this.http.get(`${this.url}/employee/get/${empId}`);
  }

  public getAllEmployees(): any {
    return this.http.get(`${this.url}/employee/all`);
  }

  public addEmployee(data) {
    return this.http.post(`${this.url}/employee/add`, data);
  }

}
