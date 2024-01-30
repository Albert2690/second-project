const myArray = [1, 2, 3, 4, 5];
let arr =[]
const arrayAsString = myArray.join('');

const numbber = Number(arrayAsString)+1
 const stringg = numbber.toString()

 for(let i =0;i<stringg.length;i++){
    arr.push(Number(stringg[i]))
 }
console.log(arr); // Output: "1, 2, 3, 4, 5"