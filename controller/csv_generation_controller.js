// Import required modules
const json2csv = require("json2csv").parse;
const fs = require("fs-extra");

// Function to generate CSV data for a student's interviews
module.exports.generateCSVForStudent = async function (students) {
  try {
    // Define the fields for the CSV columns
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

    // Initialize an array to store CSV data
    const data = [];

    // Loop through each student
    for (let student of students) {

      // Loop through each interview of the student
      for(let interview of student.interviews){

        // Loop through each result of the interview
        for(let result of interview.results){

          // Check if the current result corresponds to the current interview and student
          if(interview.id == result.interview && result.student == student.id){

            // Create a temporary student object with selected data for CSV
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

            // Add the temporary student object to the data array
            data.push(tempStudent);
          }
          
        }
        
      }
    }

    // Generate CSV data using json2csv library
    const csv = json2csv(data, { fields });

    // Create a filename for the CSV file
    const filename = `interviews.csv`;

    // Write the CSV data to a file
    await fs.writeFile(filename, csv);

    // Return the generated filename
    return filename;

  } catch (error) {
    // If any error occurs, throw it to be caught and handled by the caller
    throw error;
  }
};
