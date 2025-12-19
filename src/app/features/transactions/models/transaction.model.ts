import { User } from "../../users/models/user.model";

export interface Transaction {
    id: string;
    amount: number;
    date: Date;
    user: User;
    cus: string;
}