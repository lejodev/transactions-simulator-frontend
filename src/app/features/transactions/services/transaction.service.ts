import { Injectable } from '@angular/core';
import { TransactionRepository } from '../../../core/repositories/transactions/transaction.repository';
import { Transaction } from '../models/transaction.model';
import { transactionDto } from '../models/transactionsdto.model';
import { Observable, of } from 'rxjs';
import { Cus } from '../../../core/services/cus/cus.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {



  constructor(
    private transactionRepository: TransactionRepository,
    private cusService: Cus) { }

  getTransactions(): Observable<Transaction[]> {
    return of(this.transactionRepository.getTransactions());
  }

  private generateId(): string {
    return crypto.randomUUID();
  }

  saveTransaction(transactionDto: transactionDto): void {

    const rawCus = transactionDto.user.name
    const encryptedCus = this.cusService.encrypt(rawCus);

    const transaction: Transaction = {
      id: this.generateId(),
      amount: transactionDto.amount,
      date: new Date(),
      user: transactionDto.user,
      cus: encryptedCus
    };

    this.transactionRepository.saveTransaction(transaction);
  }

  revealCus(cus: string): string {
    return this.cusService.decrypt(cus);
  }

}

