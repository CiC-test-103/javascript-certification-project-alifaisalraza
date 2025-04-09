// Necessary Imports, DO NOT REMOVE
const { LinkedList } = require("./LinkedList");
const { Student } = require('./Student')
const readline = require('readline');

// Initialize terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Creates the Student Management System as a Linked List
/**
 * studentManagementSystem is the object that the main() function will be modifying
 */
const studentManagementSystem = new LinkedList();

// Display available commands
function main() {
  console.log(`
      Available Commands:
      - add [name] [year] [email] [specialization]: Add a student
      - remove [email]: Remove a student by email
      - display: Show all students
      - find [email]: Find a student by email
      - save: Save the current linked list to the specified file
      - load [fileName]: Load a linked list from a file
      - clear: Clear the current linked list
      - q: Quit the terminal
  `);
}

// Command handling logic
async function handleCommand(command) {
  const [operation, ...args] = command.trim().split(' ');

  switch (operation) {
    case 'add':
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (code is given)
       *   - Use implemented functions in LinkedList to add the Student, and display the updated LinkedList
       */
        console.log('Adding student...')
        const [name, year, email, specialization] = args
        // --------> WRITE YOUR CODE BELOW
        if (name && year && email && specialization) {
          try {
            const newStudent = new Student(name, year, email, specialization);
            studentManagementSystem.addStudent(newStudent);
            console.log(`Updated List: ${studentManagementSystem.displayStudents()}`);
          } catch (err) {
            console.error(err.message);
          }
        } else {
          console.log("missing mandatory fields; please enter student name, year, email and specialization.");
        }

        
        // --------> WRITE YOUR CODE ABOVE
        break;

    case 'remove':
      /**
       * TODO:
       *  Removes a particular student by email
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (removeEmail)
       *   - Use implemented functions in LinkedList to remove the Student, and display the updated LinkedList
       */
      console.log('Removing student...')
      // --------> WRITE YOUR CODE BELOW
      const [removeEmail] = args;
      if (removeEmail) {
        try {
        studentManagementSystem.removeStudent(removeEmail);
        console.log(`Updated List: ${studentManagementSystem.displayStudents()}`);
        } catch (err) {
        console.error(err.message);
        }
      } else {
        console.log("email is mandatory. please enter student email.");
      }      
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'display':
      /**
       * TODO:
       *  Displays the students in the Linked List
       *  You will need to do the following:
       *   - Use implemneted functions in LinkedList to display the student
       */
      console.log('Displaying students...')
      // --------> WRITE YOUR CODE BELOW
      try {
        console.log(`Updated List: ${studentManagementSystem.displayStudents()}`);
      } catch (err) {
        console.error (err.message);
      }
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'find':
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (findEmail)
       *   - Use implemented functions in LinkedList to grab the Student
       *   - Use implemented functions in Student to display if found, otherwise, state "Student does not exist"
       */
      console.log('Finding student...')
      // --------> WRITE YOUR CODE BELOW
      const [findEmail] = args;
      if (findEmail) {
        try {
          const studentFound = studentManagementSystem.findStudent(findEmail);
          if (studentFound === -1) {
            console.log("There are no records for provided email; please provide a valid email.");
          } else {
            console.log(`${studentFound.getString()}`);
          }
        } catch (err) {
          console.error (err.message);
        }
      } else {
        console.log("email is mandatory. please enter student email.");
      }
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'save':
      /**
       * TODO:
       *  Saves the current LinkedList to a specified JSON file
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (saveFileName)
       *   - Use implemented functions in LinkedList to save the data
       */
      console.log('Saving data...')
      // --------> WRITE YOUR CODE BELOW
      const [saveFileName] = args;
      if (saveFileName) {
        try {
          await studentManagementSystem.saveToJson(saveFileName);
          console.log (`file ${saveFileName} created successfully`);
        } catch (err) {
          console.error(err.message);
        }
      }
      else {
        console.log("file Name is mandatory. please enter file name.");
      }
      break;
      // --------> WRITE YOUR CODE ABOVE

    case "load":
      /**
       * TODO:
       *  Loads data from specified JSON file into current Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (loadFileName)
       *   - Use implemented functions in LinkedList to save the data, and display the updated LinkedList
       */
      console.log('Loading data...')
      // --------> WRITE YOUR CODE BELOW
      const [loadFileName] = args
      if (loadFileName) {
        studentManagementSystem.clearStudents();
        try { 
          await studentManagementSystem.loadFromJSON(loadFileName);
          console.log(`data loaded successfully; updated List: ${studentManagementSystem.displayStudents()}`);
        } catch (err) {
          console.error(`${err.message};Please rectify the error and try again`);
        }
      } else {
        console.log("file Name is mandatory. please enter file name.");
      }
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'clear':
      /**
       * TODO:
       *  Clears all data in the Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Use implemented functions in LinkedList to clear the data
       */
      console.log('Clearing data...')
      // --------> WRITE YOUR CODE BELOW
      studentManagementSystem.clearStudents();
      try {
        console.log(`${studentManagementSystem.displayStudents()}`);
      } catch (err) {
        console.error (err.message);
      }

      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'q':
        console.log('Exiting...');
        rl.close();
        break;

    default:
        console.log('Unknown command. Type "help" for a list of commands.');
        break;
  }
}

// Start terminal-based interaction (DO NOT MODIFY)
console.log('Welcome to the Student Management System!');
main();
rl.on('line', async (input) => {
  if (input.trim().toLowerCase() === 'help') {
    main();
  } else {
      await handleCommand(input);
  }
});
rl.on('close', () => {
  console.log('Goodbye!');
});
