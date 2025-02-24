import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
    transactions = [
        {
            id: 1,
            title: 'Salary',
            desc: 'Monthly salary',
            amount: 100000,
            transactionDate: '2021-07-01',
            userId: 1
        },
        {
            id: 2,
            title: 'Rent',
            desc: 'Monthly rent',
            amount: 50000,
            transactionDate: '2021-07-01',
            userId: 1
        }
    ];
    getTransaction() {
        return this.transactions;
    }
    getTransactionById(id: number) {
        return this.transactions.find(transaction => transaction.id == id);
    }
    createTransaction(transaction) {
        this.transactions.push(transaction);
        return transaction;
    }
    deleteTransaction(id: number) {
        this.transactions = this.transactions.filter(transaction => transaction.id != id);
        return this.transactions;
    }
}
