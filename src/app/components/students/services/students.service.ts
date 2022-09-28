import { Injectable } from '@angular/core';
import { studentsList } from '../utils/constants';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResourceService } from 'src/app/services/resources';
import { Student } from '../interfaces/models';

const ENDPOINT = 'students';

@Injectable({
  providedIn: 'root',
})
export class StudentsService extends ResourceService {
  constructor(http: HttpClient) {
    super(http, ENDPOINT);
  }

  getAllStudents() {
    let studentsArray = studentsList;
    return studentsArray;
  }

  getAllStudent() {
    return super.getResources(null, 'students/getAllStudent').pipe(
      map((response: any) => {
        let studentsArray: any[] = response;
        // studentsArray.map(value => {
        //   value.full_name = `${value.first_name} ${value.last_name}`;
        // });
        return studentsArray as Student[];
      })
    );
  }
  getAllCourseStudent(courseId) {
    return super
      .getResources(null, 'students/findStudentsUnderCourse', true, {
        id: courseId,
      })
      .pipe(
        map((response: any) => {
          let studentsArray: any[] = response;

          return studentsArray as Student[];
        })
      );
  }

  getTotalStudents() {
    return super.getResources(null, 'students/countStudent');
  }

  getById() {
    return this.getOneResource(
      `students/findStudentById/${localStorage['student_id']}`
    ).pipe(
      map((response: any) => {
        let studentInfo: any = response;
        return studentInfo;
      })
    );
  }
  getStudentsUnderModule(moduleId) {
    return super
      .getResources(
        null,
        `studentResults/retrieveAllStudentsUnderResults/${moduleId}`
      )

      .pipe(
        map((response: any) => {
          let studentsArray: any = response;

          return studentsArray;
        })
      );
  }

  getStudentsModule(moduleId) {
    return super
      .getResources(null, `students/findStudentsUnderModule`, true, {
        id: moduleId,
      })

      .pipe(
        map((response: any) => {
          let studentsArray: any = response;

          return studentsArray;
        })
      );
  }
  getStudentAfterFetch(moduleId) {
    return super
      .getResources(
        null,
        `studentResults/findAllStudentsUnderResults/${moduleId}`
      )
      .pipe(
        map((response: any) => {
          let studentsArray: any[] = response;
          // studentsArray.map(value => {
          //   value.full_name = `${value.first_name} ${value.last_name}`;
          // });
          return studentsArray as Student[];
        })
      );
  }
  getStudentStats() {
    return super.getResources(null, 'students/getAllStudent').pipe(
      map((response: any) => {
        let responseArray: any[] = response;
        let activeArray = responseArray.filter((m) => m.status == 'Active');
        let inactiveArray = responseArray.filter((m) => m.status == 'InActive');

        return {
          total: responseArray.length,
          active: activeArray.length,
          inactive: inactiveArray.length,
        };
      })
    );
  }

  getStudentInfoIdAndCourse(studentId, courseId) {
    return super
      .getResources(null, `students/selectingFromStudentForResults`, true, {
        student_id: studentId,
        course_id: courseId,
      })
      .pipe(
        map((response: any) => {
          let resultsArray: any = response;

          return resultsArray;
        })
      );
  }

  sendWelcomeEmail() {
    return super
      .getResources(
        null,
        'students/sendingStudentsWelcomeEmailAfterBeingAdmitted'
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
