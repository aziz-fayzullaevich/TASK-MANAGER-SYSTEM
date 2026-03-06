export type GenderUser = 'male' | 'female';

export type Profile = {
    id: number;
    username: string;
    birthDate:  string;
    age: number;
    gender: GenderUser;
    phone: string;
    email: string;
    image: string;
    address:{
        address: string;
        city: string;
        state: string;
    }
};