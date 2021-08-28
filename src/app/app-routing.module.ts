import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseModuleInfoComponent } from './components/course-module/course-module-info/course-module-info.component';
import { CourseModuleListComponent } from './components/course-module/course-module-list/course-module-list.component';
import { CoursesInfoComponent } from './components/course/courses-info/courses-info.component';
import { CoursesListComponent } from './components/course/courses-list/courses-list.component';
import { LecturesInfoComponent } from './components/lecture/lectures-info/lectures-info.component';
import { LecturesListComponent } from './components/lecture/lectures-list/lectures-list.component';
import { LoginComponent } from './components/login/login.component';
import { RecordsComponent } from './components/records/records.component';
import { StudentsInfoComponent } from './components/student/students-info/students-info.component';
import { StudentsListComponent } from './components/student/students-list/students-list.component';
import { UploadGradeComponent } from './components/upload-grade/upload-grade.component';

const routes: Routes = [
  {path: 'login' , component: LoginComponent , pathMatch: 'full'},
  {path: 'students-list' , component: StudentsListComponent , pathMatch: 'full'},
  {path: 'courses-list' , component: CoursesListComponent , pathMatch: 'full'},
  {path: 'staff-list' , component: LecturesListComponent , pathMatch: 'full'},
  {path: 'course-info' , component: CoursesInfoComponent , pathMatch: 'full'},
  {path: 'staff-info' , component: LecturesInfoComponent , pathMatch: 'full'},
  {path: 'student-info' , component: StudentsInfoComponent , pathMatch: 'full'},
  {path: 'module-info' , component: CourseModuleInfoComponent , pathMatch: 'full'},
  {path: 'module-list' , component: CourseModuleListComponent , pathMatch: 'full'},
  {path: 'upload-grade' , component: UploadGradeComponent , pathMatch: 'full'},
  {path: 'records' , component: RecordsComponent , pathMatch: 'full'},


  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
