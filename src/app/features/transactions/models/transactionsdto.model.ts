import { User } from "../../users/models/user.model";

export interface transactionDto {
    amount: number;
    user: User;
}