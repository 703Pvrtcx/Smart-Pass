class Account {
    userID: string;
    email:string;
    firstname:string;
    lastname: string;
    roleId: number;
    gender:string; 
    phone:string;
    displayName: string;
    photoURL: string;
    created_at: Date;
    updated_at: Date;

    constructor(){
        this.firstname = "";
        this.lastname = "";
        this.gender = "";
        this.created_at = new Date;
        this.roleId = 3;
        this.phone = "012 000 0000";
    }
}

