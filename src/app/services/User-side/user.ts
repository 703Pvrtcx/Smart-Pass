export interface User {
    uid: string;
    email: string;
    displayName: string;
    
    firstname: string; //+
    lastname: string; //+
    gender: string; //+
    roleId: number;

    photoURL: string;
    emailVerified: boolean;
    created_at: string;
    verified_at: string;
 }