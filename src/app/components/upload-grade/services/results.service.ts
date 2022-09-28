import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResourceService } from 'src/app/services/resources';

const ENDPOINT = 'studentResults';

@Injectable({
  providedIn: 'root',
})
export class ResultsService extends ResourceService {
  constructor(http: HttpClient) {
    super(http, ENDPOINT);
  }

  getResultByStudentId(studentId) {
    return super
      .getResources(null, `studentResults/findResultsByStudentID`, true, {
        student_id: studentId,
      })
      .pipe(
        map((response: any) => {
          let resultsArray: any = response;

          return resultsArray;
        })
      );
  }

  getResultByStudentIdAndCourse(studentId, courseId) {
    return super
      .getResources(
        null,
        `studentResults/findStudentResultsByStudentIdAndCourseId`,
        true,
        {
          student_id: studentId,
          course_id: courseId,
        }
      )
      .pipe(
        map((response: any) => {
          let resultsArray: any = response;

          return resultsArray;
        })
      );
  }

  getPastResultByStudentIdAndCourse(studentId, courseId) {
    return super
      .getResources(
        null,
        `studentResults/findPastStudentResultsByStudentIDandCourseID`,
        true,
        {
          student_id: studentId,
          course_id: courseId,
        }
      )
      .pipe(
        map((response: any) => {
          let resultsArray: any = response;

          return resultsArray;
        })
      );
  }
}
