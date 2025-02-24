import { TransactionService } from './transaction.service';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    getTransactions(): {
        id: number;
        title: string;
        desc: string;
        amount: number;
        transactionDate: string;
        userId: number;
    }[];
    getTransactionById(id: number): {
        id: number;
        title: string;
        desc: string;
        amount: number;
        transactionDate: string;
        userId: number;
    };
    createTransaction(transaction: any): any;
    deleteTransaction(id: number): {
        id: number;
        title: string;
        desc: string;
        amount: number;
        transactionDate: string;
        userId: number;
    }[];
}
