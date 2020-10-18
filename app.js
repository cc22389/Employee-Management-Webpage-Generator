const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idList = [];

function appMenu() {

    function createManager() {
        console.log("Time to build your team!");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "Name of manager?"
            },
            {
                type: "input",
                name: "managerID",
                message: "Manager's ID?"
            },
            {
                type: "input",
                name: "managerEmail",
                message: "Manager's email?"
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "Manager's office number?"
            }
        ]).then(function(answers) {
            const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            idList.push(answers.managerID);
            createTeam();
        });
    }

    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberRole",
                message: "What is your team member's position?",
                choices: [
                    "Engineer",
                    "Intern",
                    "No more team members to add"
                ]
            }
        ]).then(function(input) {
            switch(input.memberRole) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                default:
                    buildTeam();
            }
        });
    }

    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "Engineer's name?"
            },
            {
                type: "input",
                name: "engineerID",
                message: "Engineer's ID?"
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "Engineers email?"
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "Engineer's GitHub username?"
            }
        ]).then(function(answers) {
            const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(engineer);
            idList.push(answers.engineerID);
            createTeam();
        })
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "Intern's name?"
            },
            {
                type: "input",
                name: "internID",
                message: "Intern's ID?"
            },
            {
                type: "input",
                name: "internEmail",
                message: "Intern's email?",
            },
            {
                type: "input",
                name: "internSchool",
                message: "Intern's school?"
            }
        ]).then(function(answers) {
            const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
            teamMembers.push(intern);
            idList.push(answers.internID);
            createTeam();
        });
    }

    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
          fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
      
            
    }

    createManager ();
}

appMenu();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
