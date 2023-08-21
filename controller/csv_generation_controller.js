const json2csv = require("json2csv").parse;
const fs = require("fs-extra");

// Function to generate CSV data for a student's interviews
module.exports.generateCSVForStudent = async function (students) {
  try {
    const fields = [
      "Student Id",
      "Name",
      "Email",
      "Collage",
      "Status",
      "React Score",
      "Web Development Score",
      "DSA Score",
      "Interview Date",
      "Company",
      "Result",
    ];

    const data = [];

    for (let student of students) {

      for(let interview of student.interviews){

        for(let result of interview.results){

          if(interview.id == result.interview && result.student == student.id){
            let tempStudent = {
              "Student Id": student.id,
              Name: student.name,
              Email: student.email,
              Collage: student.collage,
              Status: student.status,
              "React Score": student.reactScore,
              "Web Development Score": student.webDevelopmentScore,
              "DSA Score": student.dsaScore,
              "Interview Date":interview.date,
              "Company":interview.companyName,
              "Result":result.status,
            };
            data.push(tempStudent);
          }
          
        }
        
      }
     
      //data.push(tempStudent);
    }

    const csv = json2csv(data, { fields });

    // Create a filename based on student's email
    const filename = `interviews.csv`;

    // Write the CSV data to a file
    await fs.writeFile(filename, csv);

    return filename;

    // return filename;
  } catch (error) {
    throw error;
  }
};
