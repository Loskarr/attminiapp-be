"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
let TransactionService = class TransactionService {
    constructor() {
        this.transactions = [
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
    }
    getTransaction() {
        return this.transactions;
    }
    getTransactionById(id) {
        return this.transactions.find(transaction => transaction.id == id);
    }
    createTransaction(transaction) {
        this.transactions.push(transaction);
        return transaction;
    }
    deleteTransaction(id) {
        this.transactions = this.transactions.filter(transaction => transaction.id != id);
        return this.transactions;
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)()
], TransactionService);
//# sourceMappingURL=transaction.service.js.map