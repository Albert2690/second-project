var countWords = function(words1, words2) {
    let arr= words1.map((elem)=>{
        let sum =0
        for(let i=0;i<elem.length;i++){
            sum +=elem.charCodeAt(i)
        }
        return sum
    })
    console.log(arr)
    let arr1= words2.map((elem)=>{
        let sum =0
        for(let i=0;i<elem.length;i++){
            sum +=elem.charCodeAt(i)
        }
        return sum
    })
    console.log(arr1)
    let set1 = new Set()
    let set2 = new Set()
    for(let i=0;i<words1.length;i++){
        for(let j=i+1;j<words1.length;j++){
            if(words1[i]!==words1[j]){
                set1.add(words1[i])
            }
        }
    }
    for(let k=0;k<words2.length;k++){
        for(let n=k+1;n<words2.length;n++){
            if(words2[k]!==words2[n]){
                set2.add(words2[k])
            }
        }
    }


console.log(set1)
console.log(set2)

   


 let count = words1.filter((word)=>set1.has(word)&&set2.has(word))
 
 return count.length
   
 
};

let words1 = ["leetcode","is","amazing","as","is"]
let words2 = ["amazing","leetcode","is"]

console.log(countWords(words1,words2))