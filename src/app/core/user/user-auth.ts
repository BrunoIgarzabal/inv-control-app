export interface UserLogin {
    email: string;
    password: string;
}

export interface UserAuthenticated {
    sub: string;
    roles: Roles[];
}

interface Roles {
    authority: string;
}
