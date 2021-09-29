import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleInfoComponent } from './components/course-modules/components/module-info/module-info.component';
import { ModuleListComponent } from './components/course-modules/components/module-list/module-list.component';
import { CourseInfoComponent } from './components/courses/components/course-info/course-info.component';
import { CourseListComponent } from './components/courses/components/course-list/course-list.component';
import { DashboardViewComponent } from './components/dashboard/components/dashboard-view/dashboard-view.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReportsListComponent } from './components/reports/components/reports-list/reports-list.component';
import { SearchGradeComponent } from './components/search/components/search-grade/search-grade.component';
import { StaffInfoComponent } from './components/staff/components/staff-info/staff-info.component';
import { StaffListComponent } from './components/staff/components/staff-list/staff-list.component';
import { StudentsInfoComponent } from './components/students/components/students-info/students-info.component';
import { StudentsListComponent } from './components/students/components/students-list/students-list.component';
import { StudentsResultComponent } from './components/students/components/students-result/students-result.component';
import { UploadGradeComponent } from './components/upload-grade/components/upload-grade/upload-grade.component';
import { UsersListComponent } from './components/users/components/users-list/users-list.component';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './interfaces/all-models';

const routes: Routes = [
  {path: 'login' , component: LoginComponent , pathMatch: 'full'},
  {path: 'students-list' , component: StudentsListComponent , pathMatch: 'full'},
  {path: 'courses-list' , component: CourseListComponent , pathMatch: 'full'},
  {path: 'staff-list' , component: StaffListComponent , pathMatch: 'full'},
  {path: 'course-info' , component: CourseInfoComponent , pathMatch: 'full'},
  {path: 'staff-info' , component: StaffInfoComponent , pathMatch: 'full'},
  {path: 'student-info' , component: StudentsInfoComponent , pathMatch: 'full'},
  {path: 'module-info' , component: ModuleInfoComponent , pathMatch: 'full'},
  {path: 'module-list' , component: ModuleListComponent , pathMatch: 'full'},
  {path: 'upload-grade' , component: UploadGradeComponent , pathMatch: 'full'},
  {path: 'reports' , component: ReportsListComponent , pathMatch: 'full'},
  {path: 'dashboard' , component: DashboardViewComponent , pathMatch: 'full', canActivate:[AuthGuard]},
  // {path: 'profile' , component: UserProfileComponent , pathMatch: 'full'},
  {path: 'student-result' , component: StudentsResultComponent , pathMatch: 'full'},
  {path: 'search-grade' , component: SearchGradeComponent , pathMatch: 'full'},
  {path: 'users-list' , component: UsersListComponent , pathMatch: 'full'},

  
  { path: '', redirectTo: '/login', pathMatch: 'full' },
   { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
