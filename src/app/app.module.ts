import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {FlexLayoutModule} from "@angular/flex-layout";
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table'; 
import {MatPaginatorModule } from '@angular/material/paginator'; 
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import {MatRadioModule,MAT_RADIO_DEFAULT_OPTIONS} from '@angular/material/radio'; 
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatNativeDateModule} from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TokenInterceptorComponent } from './services/token-interceptor/token-interceptor.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { StudentsListComponent } from './components/student/students-list/students-list.component';
import { StudentsFormComponent } from './components/student/students-form/students-form.component';
import { StudentsInfoComponent } from './components/student/students-info/students-info.component';
import { LecturesInfoComponent } from './components/lecture/lectures-info/lectures-info.component';
import { LecturesListComponent } from './components/lecture/lectures-list/lectures-list.component';
import { LecturesFormComponent } from './components/lecture/lectures-form/lectures-form.component';
import { CoursesFormComponent } from './components/course/courses-form/courses-form.component';
import { CoursesListComponent } from './components/course/courses-list/courses-list.component';
import { CoursesInfoComponent } from './components/course/courses-info/courses-info.component';
import { CourseModuleListComponent } from './components/course-module/course-module-list/course-module-list.component';
import { CourseModuleFormComponent } from './components/course-module/course-module-form/course-module-form.component';
import { CourseModuleInfoComponent } from './components/course-module/course-module-info/course-module-info.component';
import { ConfirmationComponentComponent } from './components/confirmation-component/confirmation-component.component';
import { UploadGradeComponent } from './components/upload-grade/upload-grade.component';
import { RecordsComponent } from './components/records/records.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    DashboardComponent,
    SidebarComponent,
    StudentsListComponent,
    StudentsFormComponent,
    StudentsInfoComponent,
    LecturesInfoComponent,
    LecturesListComponent,
    LecturesFormComponent,
    CoursesFormComponent,
    CoursesListComponent,
    CoursesInfoComponent,
    CourseModuleListComponent,
    CourseModuleFormComponent,
    CourseModuleInfoComponent,
    ConfirmationComponentComponent,
    UploadGradeComponent,
    RecordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDividerModule,
    MatSidenavModule,
    MatDialogModule,
    MatRadioModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule

  ],
  providers: [MatDatepickerModule,DatePipe,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', floatLabel : 'auto' }},
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'accent' },
  },
    // {
    //   provide: MatDialogRef,
    //   useValue: {}
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorComponent,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
