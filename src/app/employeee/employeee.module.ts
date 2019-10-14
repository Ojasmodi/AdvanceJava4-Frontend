import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllEmployeeComponent } from './all-employee/all-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AllEmployeeComponent, EditEmployeeComponent, AddEmployeeComponent],
  imports: [
    CommonModule,BrowserAnimationsModule,HttpClientModule,
    FormsModule,ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: 'dashboard', component: AllEmployeeComponent},
      { path: 'edit/:id', component: EditEmployeeComponent },
      { path: 'add', component: AddEmployeeComponent },
    ]),
  ]
})
export class EmployeeeModule { }
