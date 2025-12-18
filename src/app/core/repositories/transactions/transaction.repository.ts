import { Injectable } from "@angular/core";
import { Transaction } from "../../../features/transactions/models/transaction.model";

@Injectable({
    providedIn: 'root'
})
export class TransactionRepository {

    private readonly localStorageKey = 'transactions';

    getTransactions(): Transaction[] {
        const transactionsJson = localStorage.getItem(this.localStorageKey);
        return transactionsJson ? JSON.parse(transactionsJson) : [];
    }

    saveTransaction(transaction: Transaction): void {
        const transactions = this.getTransactions();
        transactions.unshift(transaction);
        localStorage.setItem(this.localStorageKey, JSON.stringify(transactions));
    }

}