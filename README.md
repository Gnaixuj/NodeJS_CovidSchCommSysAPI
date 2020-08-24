# CovidSchCommSysAPI

### What does it do?
A personal project of developing a set of API endpoints for teachers to perform administrative functions for their classes

### What technologies are used?
- NodeJS
- ExpressJS
- Mongoose
- MongoDB

### List of Endpoints
1. Register one or more students to a specified teacher
   - Endpoint: POST /api/register
   - Headers: Content-Type: application/json
   - Success Res Status: HTTP 204
   - Sample Req Body:
   ```
   {
     "teacher": "teacheralpha@email.com"
     "students":
       [
         "studentbravo@email.com",
         "studentcharlie@email.com"
       ]
   }
   ```
   
2. Retrieve a list of students common to a given list of teachers
   - Endpoint: GET /api/commonstudents
   - Success Res Status: HTTP 200
   - Sample Req Body: GET /api/commonstudents?teacher=teacheralpha%40email.com&teacherbravo%40email.com
   - Sample Res Body:
   ```
   {
     "students":
       [
         "commonstudent_1@email.com,
         "commonstudent_2@email.com,
         "student_of_teacher_alpha@email.com",
         "student_of_teacher_bravo@email.com"
       ]
   }
   ```
   
3. Suspend a specified student
   - Endpoint: POST /api/suspend
   - Headers: Content-Type: application/json
   - Success Res Status: HTTP 204
   - Sample Req Body:
   ```
   {
     "student": student_to_be_suspended@email.com
   }
   ```

4. Retrieve a list of students who can receive a given notification
   - To receive notification from e.g. teacheralpha, a student:
     - Must not be suspended
     - And is registered under teacheralpha
   - Endpoint: POST /api/retrievefornotifications
   - Headers: Content-Type: application/json
   - Success Res Status: HTTP 200
   - Sample Req Body: 
   ```
   {
     "teacher": "teacheralpha@email.com"'
     "notification": "Assignment 1 due next Friday"
   }
   ```
   - Sample Res Body:
   ```
   {
     "recipients":
       [
         "studentbravo@email.com",
         "studentcharlie@email.com"
       ]
   }
   ```
