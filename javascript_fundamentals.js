
// if(true){
//     let a=5

//     console.log(a)  let have a block scope
// }

// it can be reassigned but cannot be redecalred and  is hoisted to undefined 


// if (true) {
// const b = 5;

// console.log(a)  const also have a block scope
// }

/// const cannot be reassigned as well redeclared and it is also hoisted to undefined


// function fun() {
//     let b = 5;
//     console.log(b)
// }

// fun()

// console.log(b)  particular variable is not accessible 


//Data types in javascript

// In Javascript there are mainly two types of Data types - primitive and non primitive.
// Primitive types are immutable and are stored by value
//Non-primitive types are mutable and stored by reference

//* primitive includes 

// 1) Number 
// 2) String 
// 3)Boolean

// * non premitive includes 

// 1) function
// 2) Object
// 3) Arrays

//operators in js

// let a=5 
// assignment operator


// let x = 5;
// let y = 2;
// let z = x + y;
//addition operator

// let x = 5;
// let y = 2;
// let z = x * y;
//multiplication

// if(age<21)
//Comparison operator

//conditional operator

// let age=15;

// if(age<18){
//     console.log("You Are Eligible for Driving Licence");
// }else{
//  console.log("You Are Not Eligible for Driving Licence");
// }


//switch case

// let signal = "red";
// let message=""

// switch (signal) {
//     case "red":
//         message="Please stop immediately";
//         break;

//     case "yellow":
//         message= "Please be slow";
//         break;


//     case "Green":
//         message= "Please go";
//         break;

//     default:
//         message="Signal is not working properly"

// }


// console.log(message)


// Loops

// for(let i=0;i<6;i++){
//     console.log("Hello World")
// }
//for loop

// let user={
// name:"Pratik",
// email:"zajampratik@gmail.com",
// isVerified:true
// }

// for(key in user){
// console.log(key,user[key])
// }

//for in loops


// let numbers=[5,141,2,1,3];

// numbers.forEach((ele,index)=>{
// console.log(ele)
// })


// function sum(a,b){
//   return a+b

// }

// console.log(sum(5,9))

//normal functions

// let sum = (a, b) => {
//    return  a + b
// }

// console.log(sum(5,7))

// let array=[5,7,9,79,7];

// let obj={
//     name:"Pratik",
//     email:"zajampratik@gmail.com",
//     location:"Mumbai"
// }
//obj

// let obj={
//     name:"Pratik",
//     email:"zajampratik@gmail.com",
//     location:"Mumbai"
// }


// const {name,email,location}=obj

// console.log(name)
// object Destructuring

// let array1=[2,5,7,8];
// let array2=[...array1,4152,3,1,2];

// console.log(array2)

// function sum(...numbers){
//     let total=0;

//     for(let i=0;i<numbers.length;i++){
//         total+=numbers[i]
//     }
//     return total
// }

// console.log(sum(5,6,4,6))
// spread operator



// let array=[1,5,7,9,7,5];

// let newArray=array.map((ele)=>(
//     ele*2
// ));

// console.log(newArray)

// map


// let array=[1,5,7,9,7,5];

// let newArray=array.filter((ele)=>(
//     ele>5
// ));

// console.log(newArray)

// filter


//  let array=[1,5,7,9,7,5];

//  let sum=array.reduce((acc,curr)=>{
//     acc=acc+curr
//     return acc
//  },0)

//  console.log(sum)
//reduce

// function outer(){
// let counter=0

// return function inner(){
//     counter++
//     return counter
// }

// }

// let counter=outer();

// console.log(counter())
// console.log(counter())

//closures

// let promise = new Promise((resolve, reject) => {

//     let success = true;

//     setTimeout(() => {
//         if (success) {
//             resolve("Promise got resolved");
//         } else {
//             reject("Promise got rejected");
//         }
//     }, 200)
// })

// promise.then((success) => {
//     console.log(success)
// }).catch((failure) => {
//     console.log(failure)
// })


// function sendOtp(callback) {

//     let otp = 51
//     console.log("otp has been send")
//     callback(otp)
// }


// function verifyOtp(otp){
//     console.log(otp,"otp has been verified")
// }

// console.log(sendOtp(verifyOtp))

//callback


// async function apiCall() {
//     try {
      
//         let response = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
   
//     } catch (error) {
//         console.log(error.message)
//     }

// }

//async/await error handling using try catch


// let name="Pratik Zajam"

// console.log(`Hi, I am ${name}`)

//template literals




// export function add(a,b){
    // return a+b
// }

//modules


// const user = {
//   id: 1,
//   name: "Pratik",
//   contact: {
//     email: "pratik@gmail.com",
//     phone: {
//       countryCode: "+91",
//       number: "9876543210"
//     }
//   },
//   address: {
//     city: "Mumbai",
//     state: "Maharashtra",
//     pincode: 400001
//   }
// };

// console.log(user?.contact?.email)

//optional chaining



// let value=null
// const port = value ?? 5000;
// console.log(port)
//nullish coalescing





// class Car{
//     constructor(name,year){
//         this.name=name;
//         this.year=year;
//     }
// }

// const newCar= new Car("Suzuki",2025);
// console.log(newCar)

//classes


















































