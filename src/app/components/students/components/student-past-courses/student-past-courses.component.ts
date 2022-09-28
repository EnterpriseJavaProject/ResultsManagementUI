import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Course } from 'src/app/components/courses/interfaces/model';
import { CoursesService } from 'src/app/components/courses/services/course.service';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../interfaces/models';
import { PastStudentsService } from '../../services/past-students.service';

@Component({
  selector: 'app-student-past-courses',
  templateUrl: './student-past-courses.component.html',
  styleUrls: ['./student-past-courses.component.scss'],
})
export class StudentPastCoursesComponent implements OnInit {
  data: any[];
  tableData: any[];
  condata: any;
  studentInfo: Student | undefined;

  displayedColumns: string[] = [
    'course_name',
    'course_level',
    'course_start_date',
    'course_end_date',

    'action',
  ];
  dataSource: MatTableDataSource<Course> = new MatTableDataSource([]);
  constructor(
    private courseService: CoursesService,
    private router: Router,
    private studentService: StudentsService,
    private pastService: PastStudentsService
  ) {}
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.loadPastCourses();
    this.loadInfo();
  }

  loadCourse() {
    this.courseService
      .getStudentsCourses(localStorage['student_id'])
      .subscribe((results) => {
        this.tableData = results.filter((stud) => stud.status === 'Active');
        this.dataSource = new MatTableDataSource(this.tableData);
      });
  }
  loadPastCourses() {
    this.courseService
      .getStudentsPastCourses(localStorage['student_id'])
      .subscribe((results) => {
        this.tableData = results.filter((stud) => stud.status === 'Active');
        this.dataSource = new MatTableDataSource(this.tableData);
      });
  }
  async loadInfo() {
    this.pastService
      .findPastStudentByStudentId(localStorage['student_id'])
      .subscribe((results) => {
        this.studentInfo = results;
      });
    // this.studentService.getAllStudent().subscribe((result) => {
    //   this.studentInfo = result.find((a) => a.id == localStorage['student_id']);
    //   console.log(this.studentInfo);
    // });
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    setTimeout(() => (this.dataSource.paginator = this.paginator));
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async viewGrade() {
    await (localStorage.setItem('past_cors', this.studentInfo.course_id),
    localStorage.setItem('past_stud', this.studentInfo.student_id));
    return this.router.navigate(['/student-past-result']);
  }

  viewCourse(element) {
    this.router.navigate(['/course-info']);
    localStorage.setItem('course_id', element.id);
  }
}
