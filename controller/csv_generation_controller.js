const json2csv = require('json2csv').parse;
const fs = require('fs-extra');

// Function to generate CSV data for a student's interviews
module.exports.generateCSVForStudent = async function(interviews){
  try {
    const fields = ['Name', 'Email', 'Collage', 'Status', 'React Score', 'Web Development Score', 'DSA Score'];

    const data = [];

    for (const interview of interviews) {

        for(let student of interview.students){

            let tempStudent = {
                'Name': student.name,
                'Email': student.email,
                'Collage': student.collage,
                'Status': student.status,
                'React Score': student.reactScore,
                'Web Development Score': student.webDevelopmentScore,
                'DSA Score': student.dsaScore,
              };
            data.push(tempStudent);
        }
    }

    const csv = json2csv(data, { fields });

    // Create a filename based on student's email
    const filename = `interviews.csv`;

    // Write the CSV data to a file
    await fs.writeFile(filename, csv);

    return csv;

   // return filename;
  } catch (error) {
    throw error;
  }
};

