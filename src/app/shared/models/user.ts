export interface User {
   uid: string;
   email: string;
   displayName: string;
   // photoURL: string;
   emailVerified: boolean;
    roles: Roles; //how do i import it to be used by User
}

export interface Roles {
   Student: boolean;
   Admin: boolean;
   Lecturer: boolean;
}

// it should help fetch data in user-profile component