export interface User{
    user_id:string;
    name:string;
    email:string;
    role:string;
    password:string;
    specialization_area:string;
}

export interface loginUserDetails{
    user_id: string,
    name: string,
    email: string,
    role: string,
    specialization_area:string;
    isWelcomed: boolean,
}