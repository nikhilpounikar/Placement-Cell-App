# Placement-Cell-App
A full stack, app used for reviewing Placement situation of students enrollered in various courses

Tech Stack
Node , Express, Mongodb , EJS , javaScript , html, css

How to setup the project on local system
Clone this project
Start by installing npm if you don't have it already.
Navigate to Project Directory.
After reaching the project directory you have to run the following the command.

     npm install 
     npm start || nodemon index.js

HomePage / Employee View ==> List of studensts
Sign-Up
Sign-In
Add Student form
Add Batch form
Inteview List
Add Interview
Mapped Student and Interview


Folder Structure
Placement-Cell-App    
    |               |--->css
    |--->assets---->|--->images
    |             
    |
    |               |--->flashMiddleware.js
    |--->config---->|--->mongoose.js
    |               |--->passport-local-Stradegy.js
    |               |--->enviromment.js
    |
    |                  |-->batch_controller.js
    |--->controllers-->|-->csv_generation_controller.js
    |                  |-->employee_controller.js
    |                  |-->home_controller.js
    |                  |-->interview_controller.js
    |                  |-->result_controller.js
    |                  |-->student_controller.js
    |
    |               |-->Batch.js
    |--->models---->|-->Employee.js
    |               |-->Interview.js
    |               |-->Result.js
    |               |-->STudent.js
    |
    |              
    |               |-->batch_route.js
    |--->routes---->|-->employee_route.js
    |               |-->index_route.js
    |               |-->interview_route.js
    |               |-->result_route.js
    |               |-->student_route.js
    |
    |              |--->_header.ejs
    |              |---> batch_form.ejs
    |              |---> dashboard.ejs
    |              |---> employee_login.ejs
    |--->views---->|--->employee_registration.ejs
    |              |--->interview_form.ejs
    |              |--->interview_table.ejs
    |              |--->layouts.ejs
    |              |--->student_form.ejs
    |              |--->student_interview_page.ejs
    |              |--->student_table_by_interview.ejs
    |
    |-->node_modules
    |--> index.js
    |--> package-lock.json
    |-->package.json
    