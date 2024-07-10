// Name: Celline Maccabee

// all the calculations are done here.
// calculation
function operations(calculation, operandA, operandB)
{
  switch (calculation) 
  {
    // Addition
    case '+':
      return operandA + operandB; // if A = 10, B = 5 , A + B = 15
    // Subtraction
    case '-':
      return operandA - operandB;
    // Multiplication
    case '*':
      return operandA * operandB;
    // Division
    case '/':
      return operandA / operandB;
    // modulus
    case '%':
      return operandA % operandB;
    // Power, Exponentiation
    case '^':
      return Math.pow(operandA, operandB);
    // when an invalid operator is used
    default:
      throw new Error('operator is not valid')
  }
}


function postfix(expression, table) {
    // initialize an array for postfix.
    const symbolResultStack = [];
  
    for (let char of expression) {
      // if it is a number, push it into the stack
      if (!isNaN(char)) 
      {
        symbolResultStack.push(parseFloat(char));
      } 
      // if the char in table is a variable, push it onto the symbolResultStack
      else if (char in table) 
      {
        symbolResultStack.push(table[char]);
      } 
      else 
      {
        // pop the number 2 and number 1 from the stack
        const number2 = symbolResultStack.pop();
        const number1 = symbolResultStack.pop();
        // do the operation 
        const output = operations(char, number1, number2);
        // push the output into the stack
        symbolResultStack.push(output);
      }
    }
  
    return symbolResultStack[0];
  }

const reading = require('readline');

// rtl = read the line
const rtl = reading.createInterface({
    input: process.stdin,
    output: process.stdout
})

const symbolTable = { 'A': 0, 'B': 0, 'C': 0 };

// assigning the number INTO the letter
function variableLetterIN(callback)
{
    // array
    const letters = ['A', 'B', 'C'];

    function variableLetterIn(num)
    {
        // anymore number to assign to the letter
        // if num is less than the length of the letters
        if (num < letters.length)
        {
            rtl.question(`Assign value for ${letters[num]}: `, (value) =>  // ask to assign the number to the letter
            {
                symbolTable[letters[num]] = parseFloat(value);
                // next number to assign to the variable letter
                variableLetterIn(num + 1);
            });
        }
        else 
        {
            // when the number have been assigned to the letter it will display this message
            console.log('Values assigned!');
            callback(); // callback = go back to the menu
            // after the value has been assigned, it will go back to the main menu for the next step to be done.
        }
    }

    variableLetterIn(0);
}

// postfix expression
function postfixEx(callback)
{
    rtl.question('Enter your preferred Postfix Expression: ', (numIn) =>
    {
        // expVar = expression variables
        // split to an array (variable expression)
        const expVar = numIn.split(' ');
        const result = postfix(expVar, symbolTable);
        console.log(`Result: ${result}`);
        callback(); 
    })
}

function showTable(callback)
{
  console.log('Symbol Table: ');
  for (const letter in symbolTable) // for each letter in the symbol table
  {
    console.log(`${letter}: ${symbolTable[letter]}`); // print the  letter and the symboltable
  }
  callback(); // call it back
}

function menuOption() // the menu
{
  // option given
    console.log('Option: ');
    console.log('1. Assign the values to the letters');
    console.log('2. Postfix Expression Evaluation');
    console.log('3. Show the Symbol Table');
    console.log('4. Quit');

    // ask the user to input a number from the given option (1-4)
    rtl.question('Please choose a number: ', (choice) => 
    {
        switch (choice)
        {
            case '1':
                variableLetterIN(menuOption); // when option one is chosen, it will go to variableLetterIN which will ask the user to assign a value to a letter.
                break;
            case '2':
                postfixEx(menuOption); // when 2 is chosen, it will go to postfixEx function and ask the user to input whatever expression they want with the operations they want to use.
                break;
            case '3':
              showTable(menuOption); // show that the number assigned to the letter is still the same
              break;
            case '4':
                rtl.close(); // close the menu and go back to the terminal 
                break;
            default:
                console.log('Please choose the correct option :)');
                menuOption();
                break;
        }
    });
}

menuOption(); // loop to the start again, showing the main menu option.

