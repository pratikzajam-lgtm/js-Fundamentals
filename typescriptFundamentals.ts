
//differnt ts types for type safety

let userName: string = "pratik";
let age: number = 25;
let isLoggedIn: boolean = true;

//object types

interface person {
    name: string,
    email: string,
    age: number
}


let person: person = {
    name: "Pratik zajam",
    email: "zajampatik@gmail.com",
    age: 25
}

//array types

let fruits: string[] = ["banana", "mango", "jackfruits", "nanobanana"];

console.log(fruits);


//union values

let userAge: string | number = 15


//optional paramaters and readonly usage

interface User {
    readonly id: number
    name: string,
    email?: string
}

let User: User = {
    id: 12345,
    name: "pratik",
    email: "zajampratik@gmail.com"
}

let user1: User = {
    id: 564,
    name: "Pratik zajam"
}


//intersection in typescript


interface admin {
    name: string
}


interface role {
    type: string
}


type user = admin & role;

let newUser: user = {
    name: "pratik",
    type: "admin"
}


console.log(newUser)


//Function types

function add(num1: number, num2: number): number {
    return num1 + num2
}


console.log(add(5, 7))


//classes and access modifiers

class Person {
    name: string;
    age: number

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age
    }
}


let newPerson = new Person("Pratik", 25);
let newPerson1 = new Person("khot", 30);

//access modifiers

class BankAccount {
    public accountHolder: string;
    private balance: number


    constructor(accountHolder: string, balance: number) {
        this.accountHolder = accountHolder,
            this.balance = balance
    }

    public getBalance(): number {
        return this.balance
    }


}


let myBankAccountDetails = new BankAccount("Pratik Zajam", 55);


console.log(myBankAccountDetails.getBalance());








































