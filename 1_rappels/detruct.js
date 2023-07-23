const objTest = {
    userName:"Machin",
    age:45,
    country:"Germany"
}

const { userName,age } = objTest;

console.log(userName,age);

//changeant les noms
const { userName:pseudo,age:ageDate } = objTest;
console.log(pseudo);

const numbers = {
    num1: 50,
    num2: 465,
    num3: 89,
    num4: 213
}

//const foo = numbers => numbers.num1 + numbers.num2 + numbers.num3;

const foo = ({ num1,num2,num3 }) => num1 + num2 + num3;

console.log(foo(numbers));

const [student, ...notes] = ["Adrien",10,10,12,15,17,9];

console.log(student,notes);