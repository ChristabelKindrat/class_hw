enum Role {
    ADMIN = 'admin',
    MODERATOR = 'moderator',
    USER = 'user'
}

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

abstract class User implements IUser {
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    protected role: Role;

    protected constructor ( firstName: string, lastName: string, email: string, password: string, role: Role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role
    }

    abstract editProfile(firstName: string, lastName: string, email: string, password: string): void;

    abstract viewInfo(): string;
}
//У цьому прикладі видно один з основних принципів ООП - Encapsulation, я створила клас User, який має protected поле role.
// Клас забезпечує обмежені можливості з властивістю role, що дозволяє зберігати дані внутрішнього стану класу незмінними.

type level = 1 | 2 | 3;

interface IAdmin extends IUser {
    accessLevel: level;
}

class Admin extends User implements IAdmin {
    public accessLevel: level;

    constructor(fistName: string, lastName: string, email: string, password: string, role: Role, accessLevel: level) {
        super(fistName, lastName, email, password, role);
        this.accessLevel = accessLevel;
    }

    public editProfile(firstName, lastName, email, password): void {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public viewInfo(): string {
        return `Admin: ${this.firstName} ${this.lastName} ${this.email} ${this.role}`;
    }

    public setAccessLevel(accessLevel: level): void {
        this.accessLevel = accessLevel;
    }

    public getAccessLevel(): number {
        return this.accessLevel;
    }
}
//Тут демонструється принцип ООП - Inheritance, я створила два класи: Admin та User. Клас Admin успадковує властивості та методи від класу User,
// що дозволяє нам використовувати методи editProfile(),viewInfo() в класі Admin.


interface IModerator extends IUser {
    numberOfReports: number;
}

class Moderator extends User implements IModerator {
    public numberOfReports: number;

    constructor(fistName: string, lastName: string, email: string, password: string, role: Role, numberOfReports: number) {
        super(fistName, lastName, email, password, role);
        this.numberOfReports = numberOfReports;
    }

    public editProfile(firstName, lastName, email): void {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public viewInfo(): string {
        return `Moderator: ${this.firstName} ${this.lastName} ${this.email} ${this.role}`;
    }

    public setNumberOfReports(numberOfReports): void {
        this.numberOfReports = numberOfReports;
    }

    public getNumberOfReports(): number {
        return this.numberOfReports;
    }
}
//Тут описаний приклад Поліморфізму. Я маю два класи: Admin та Moderator, які мають метод editProfile() наслідуваний з класу User.
// Ми можемо використовувати цей метод для обох класів, але він виконується по-різному залежно від класу, до якого застосовується.

let admin1 = new Admin('Khrystyna', 'Kindrat', 'christabelkril@gmail.com', 'K2309', Role.ADMIN, 2);
console.log(admin1.viewInfo()); //Admin: Khrystyna Kindrat christabelkril@gmail.com ADMIN
admin1.editProfile('Ivan', 'Myk', 'ivanmyk20@gmail.com', 'V2012');
admin1.setAccessLevel(1);
console.log(admin1.getAccessLevel()); //1

let moderator1 = new Moderator('Ivan', 'Ostap', 'ivanostap28@gmail.com', 'V2802', Role.MODERATOR, 1);
console.log(moderator1.viewInfo()); //Moderator: Ivan Ostap ivanostap28@gmail.com MODERATOR
moderator1.editProfile('Andriy', 'Unknown', 'andriy00@gmail.com');
moderator1.setNumberOfReports(4);
console.log(moderator1.getNumberOfReports()); //4

