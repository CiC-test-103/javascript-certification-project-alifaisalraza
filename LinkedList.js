// Necessary Imports (you will need to use this)
const { Student } = require('./Student')

/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data               // Student
  next               // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head              // Object
  tail              // Object
  length            // Number representing size of LinkedList


  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {
    // TODO
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(newStudent) {
    // TODO
    const newNode = new Node(newStudent);

    /* if linked list is empty, then assign both head and tail to new student node; else only shift tail to new node. */
    if (this.length === 0) {
      this.head = this.tail = newNode;
      this.head.next = this.tail.next = null;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
      this.tail.next = null;
    }

    // increment size of linked list.
    this.length += 1;

    return;

  }

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    // TODO

    /* linked list check */
    if (this.length === 0) {
      throw new Error("There are currently no students inside the list; please add some students to perform this operation.");
    }

    let currNode = this.head;
    let prevNode = null;
    
    // traverse through the linked list to check for student occurrance.
    while (currNode) {
      
      if (currNode.data.getEmail() === email) {              //student match occurs.     
        /* 
           If match occurs at the top of linked list; move the head to the second node.
           If match occurs at the tail; move the tail to penultimate node.
           If match occurs in middle; connect the node one before matching node to one after.
        */
        if (currNode === this.head) {
          this.head = currNode.next;
        } else if (currNode === this.tail) {
          this.tail = prevNode;
          this.tail.next = null;
        } else {
          prevNode.next = currNode.next;
        }
        
        this.length -= 1;                                //reduce linked list size by 1.
    
        return;
      
      }

      //if match is not found with current node; then move to next node.
      prevNode = currNode;
      currNode = currNode.next;  
    
    }
    
    //whole list is travered. No occurrance detected.
    throw new Error ("There are no records for provided email; please provide a valid email");

  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    // TODO

    /* linked list check */
    if (this.length === 0) {
      throw new Error ("There are currently no students inside the list; please add some students to perform this operation.");
    }

    let currNode = this.head;
    
    // traverse through the linked list to check for student occurrance.
    while (currNode) {
      if (currNode.data.getEmail() === email) {              //student match occurs.
        return currNode.data;
        }
      
      currNode = currNode.next;
      
    }

    return -1;

  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  clearStudents() {
    // TODO 
    this.head = null;
    this.tail = null;
    this.length = 0;

  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    // TODO
    
    /* linked list check */
    if (this.length === 0) {
      throw new Error("Student Management System is currently empty; needs addition of students to perform other operations.");
    }

    let studentNames = [];
    
    for (let currNode = this.head; currNode; currNode = currNode.next) {
      studentNames.push(currNode.data.getName());
    }

    return studentNames.join(', ');

  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  #sortStudentsByName(students) {
    // TODO
    return students.sort((a, b) => a.getName().localeCompare(b.getName()));;

  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    // TODO
    /* linked list check */
    if (this.length === 0) {
      throw new Error ("There are currently no students inside the list; please add some students to perform this operation.");
    }

    let students = [];
    
    for (let currNode = this.head; currNode; currNode = currNode.next) {
      if(currNode.data.getSpecialization() === specialization){
        students.push(currNode.data);
      }
      
    }

    if (students.length === 0) {
      throw new Error ("There are no records for provided specialization; please provide a valid specialization");
    }

    return this.#sortStudentsByName(students);

  }

  /**
   * REQUIRES:  minYear (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minYear, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByminYear(minYear) {
    // TODO
    /* linked list check */
    if (this.length === 0) {
      throw new Error ("There are currently no students inside the list; please add some students to perform this operation.");
    }
    
    let students = [];
    
    for (let currNode = this.head; currNode; currNode = currNode.next) {
      if(currNode.data.getYear() >= minYear){
        students.push(currNode.data);
      }
      
    }

    if (students.length === 0) {
      throw new Error ("There are no records for provided year; please provide a valid year");
    }
    
    return this.#sortStudentsByName(students);
    
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  async saveToJson(fileName) {
    // TODO
     /* linked list check */
     if (this.length === 0) {
      throw new Error ("There are currently no students inside the list; please add some students to perform this operation.");
    }

    let students = [];
    
    for (let currNode = this.head; currNode; currNode = currNode.next) {
      students.push(currNode.data);
    }

    // Convert list to array, then to JSON string
    const jsonString = JSON.stringify(students, null, 2);

    const fs = require('fs/promises');

    // Write to a file
    await fs.writeFile(fileName, jsonString, 'utf-8');

    return;

  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName) {
    // TODO
    // Read the file content
    const fs = require('fs/promises');
    
    try {
      const data = await fs.readFile(fileName, 'utf-8');
      const students = JSON.parse(data);  // Parse the JSON string to an array of objects
      this.clearStudents(); 
      for (const student of students) {
        const studentInstance = new Student(student.name, student.year, student.email, student.specialization);
        this.addStudent(studentInstance);
      }
    } catch (err) {
      throw new Error (err.message);  // Catch and log Error
    }
    return;
  }

}


module.exports = { LinkedList }
