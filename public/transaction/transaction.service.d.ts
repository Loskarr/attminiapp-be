export declare class TransactionService {
    transactions: {
        id: number;
        title: string;
        desc: string;
        amount: number;
        transactionDate: string;
        userId: number;
    }[];
    getTransaction(): {
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
