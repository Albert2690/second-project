const myArray = [1, 2, 3, 4, 5];

let  x = -121
var isPalindrome = function(x) {
   let n =x.toString()
    for(let i =0;i<n.length;i++){
        if(n[i]!==n[n.length-(1+i)]){
            return false
        }
    }
    return true
};

console.log(isPalindrome(x))