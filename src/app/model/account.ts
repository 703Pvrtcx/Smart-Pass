class Account {
    id: string;
    firstname:string;
    lastname: string;
    email:string;
    phone:string;
    gender:string;  
    roleId: number;
    createdDate: string;

    constructor(){
        this.firstname = "";
        this.lastname = "";
        this.gender = "";
        this.createdDate = Date.now().toString();
        this.roleId = 3;
        this.phone = "012 874 8743";
    }
}

