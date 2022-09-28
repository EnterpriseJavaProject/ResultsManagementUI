package com.aiti.java.project.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.aiti.java.project.entities.StudentResults;

public interface StudentResultsRepositry extends JpaRepository<StudentResults, Long> {
	
	
	// TOTAL NUMBER OF STUDENTS RESULTS UPLOADED
	@Query(value="SELECT count(students_results.marks) FROM students_results INNER JOIN modules ON  students_results.module_name = modules.module_name where students_results.module_name = modules.module_name and students_results.marks >= 1 and modules.id = ?" , nativeQuery = true )
	String totalNumberOfStudentResultsUploadedUnderEachModule(Long module_id);
	
	
	
	// FIND RESULTS BY ID
	@Query(value="SELECT DISTINCT students_results.id, students_results.name, students_results.student_id, students_results.course_id, students_results.module_name, students_results.module_name, students_results.staff_name, students_results.marks, students_results.status, students_results.created_at, students_results.updated_at FROM students_results where students_results.id = ?  GROUP by students_results.id ORDER BY students_results.id" , nativeQuery = true )
	List<StudentResults> findResultsById(Long id);
	
	
	
	// FIND ALL STUDENTS UNDER RESULTS TABLE
	@Query(value="SELECT DISTINCT students_results.id, students_results.name, students_results.student_id, students_results.course_id, students_results.module_name, students_results.module_name, students_results.staff_name, students_results.marks, students_results.status, students_results.created_at, students_results.updated_at FROM students_results INNER JOIN modules ON  students_results.module_name = modules.module_name and students_results.staff_name = modules.staff_name where students_results.module_name = modules.module_name and students_results.staff_name = modules.staff_name and modules.id = ?  GROUP by students_results.id ORDER BY modules.id" , nativeQuery = true )
	List<StudentResults> findAllStudentsUnderResults(Long module_id);
	
	
	
	
	
//	// FIND REULTS BY STUDENT ID AND COURSE ID
	@Query(value="SELECT DISTINCT students_results.id, students_results.name, students_results.student_id, students_results.course_id, students_results.module_name, students_results.module_name, students_results.staff_name, students_results.marks, students_results.status, students_results.created_at, students_results.updated_at FROM students_results inner join students on students_results.student_id = students.student_id and students_results.course_id = students.course_id where students_results.student_id = students.student_id and students_results.course_id = students.course_id and students.fees = 'Full Payment' and students_results.student_id = ? and students_results.course_id = ?" , nativeQuery = true )
	List<StudentResults> findResultsByStudentID(String student_id, int course_id);
	
	
	
	
	
	
	
//	// FIND PAST STUDENT RESULTS BY STUDENT ID AND COURSE ID
	@Query(value="SELECT students_results.id, students_results.name, students_results.student_id, students_results.course_id, students_results.module_name, students_results.module_name, students_results.staff_name, students_results.marks, students_results.status, students_results.created_at, students_results.updated_at FROM students_results inner join past_students on students_results.student_id = past_students.student_id and students_results.course_id = past_students.course_id where students_results.student_id = past_students.student_id and students_results.course_id = past_students.course_id and past_students.fees = 'Full Payment' and students_results.student_id = ? and students_results.course_id = ?" , nativeQuery = true )
	List<StudentResults> findPastStudentResultsByStudentIDandCourseID(String student_id, int course_id);
	
	
	
	
	
	
//	// FIND REULTS BY PAST STUDENT ID
	@Query(value="SELECT DISTINCT students_results.id, students_results.name, students_results.student_id, students_results.course_id, students_results.module_name, students_results.module_name, students_results.staff_name, students_results.marks, students_results.status, students_results.created_at, students_results.updated_at FROM students_results inner join past_students on students_results.student_id = past_students.student_id and students_results.course_id = past_students.course_id where students_results.student_id = past_students.student_id and students_results.course_id = past_students.course_id and past_students.fees = 'Full Payment' and students_results.student_id = ? GROUP by students_results.id ORDER BY students_results.id" , nativeQuery = true )
	List<StudentResults> findPastStudentResultsByStudentID(String student_id);
	
	
	
//	// FIND REULTS BY STUDENT NAME
	@Query(value="SELECT DISTINCT students_results.id, students_results.name, students_results.student_id, students_results.course_id, students_results.module_name, students_results.module_name, students_results.staff_name, students_results.marks, students_results.status, students_results.created_at, students_results.updated_at FROM students_results where students_results.name = ?  GROUP by students_results.id ORDER BY students_results.id" , nativeQuery = true )
	List<StudentResults> findResultsByStudentName(String student_name);
	
	
	
	
	
	
	
	
	
//	// FIND REULTS BY COURSE NAME
	@Query(value="SELECT DISTINCT students_results.id, students_results.name, students_results.student_id, students_results.course_id, students_results.module_name, students_results.module_name, students_results.staff_name, students_results.marks, students_results.status, students_results.created_at, students_results.updated_at FROM students_results where students_results.course_id = ?  GROUP by students_results.id ORDER BY students_results.id" , nativeQuery = true )
	List<StudentResults> findResultsByCourseId(String course_name);
	
	
	
	
	
	
	
//	// FIND REULTS BY MODULE NAME
	@Query(value="SELECT DISTINCT students_results.id, students_results.name, students_results.student_id, students_results.course_id, students_results.module_name, students_results.module_name, students_results.staff_name, students_results.marks, students_results.status, students_results.created_at, students_results.updated_at FROM students_results where students_results.module_name = ?  GROUP by students_results.id ORDER BY students_results.id" , nativeQuery = true )
	List<StudentResults> findResultsByModuleName(String module_name);
	
	
	
	
	
	
	
//	// FIND REULTS BY STAFF NAME
	@Query(value="SELECT DISTINCT students_results.id, students_results.name, students_results.student_id, students_results.course_id, students_results.module_name, students_results.module_name, students_results.staff_name, students_results.marks, students_results.status, students_results.created_at, students_results.updated_at FROM students_results where students_results.staff_name = ?  GROUP by students_results.id ORDER BY students_results.id" , nativeQuery = true )
	List<StudentResults> findResultsByStaffName(String staff_name);
	
	
	

	
	
	// COUNT ALL RESULTS
	
	@Query(value="select count(*) from students_results", nativeQuery=true)
	public String countResults();
	
	
	
	
	

	
	
	@Query(value="SELECT DISTINCT students.name, students.student_id, students_results.marks FROM students INNER JOIN students_results on students.student_id = students_results.studentid INNER JOIN modules ON students_results.courseName = modules.course_name and students_results.moduleName = modules.module_name and students_results.staffName = modules.staff_name where students_results.courseName = modules.course_name and students_results.moduleName = modules.module_name and students_results.staffName = modules.staff_name and modules.id = ?  GROUP by students_results.id ORDER BY students_results.id", nativeQuery=true)
	ArrayList<Object> findStudentNameStudentIdAndMarks(Long id);
	
	
	
	
	
	
	
	
	
	
	// METHOD TO INSERT INTO RESULTS TABLE AND SELECT FROM STUDENT TBALE
	@Modifying
	@Query
	(value="INSERT into students_results(students_results.name,students_results.student_id,students_results.course_id) SELECT DISTINCT students.name, students.student_id, students.course_id FROM students INNER JOIN modules ON students.course_id = modules.course_id where students.course_id = modules.course_id and modules.id = ?  GROUP by students.student_id ORDER BY modules.id", nativeQuery=true)
	public List<StudentResults> insertIntoResults(Long id);
	
	

	
	

	
	
	
	
	// METHOD TO SEARCH FOR STUDENT RESULTS
	@Query
	(value="SELECT DISTINCT students_results.id, students_results.name, students_results.student_id, students_results.course_id, students_results.module_name, students_results.module_name, students_results.staff_name, students_results.marks, students_results.status, students_results.created_at, students_results.updated_at FROM students_results INNER JOIN students on students_results.student_id = students.student_id INNER JOIN modules ON  students_results.module_name = modules.module_name and students_results.course_id = modules.course_id where students_results.module_name = modules.module_name and students_results.student_id = students.student_id and students_results.course_id = modules.course_id and students_results.student_id = ?  GROUP by students_results.id ORDER BY modules.id", nativeQuery=true)
	public StudentResults[] searchStudentFinalResults(String student_id);
	
	
	
	
	
	
	
	
	
	
	
}