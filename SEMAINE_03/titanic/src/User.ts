
export enum Status {
    On,
    Off,
}

export interface User {
    id: number;
    name: string;
    email: string;
    password?: string;
    status?: Status;
}