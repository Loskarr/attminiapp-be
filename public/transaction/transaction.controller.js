"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const transaction_service_1 = require("./transaction.service");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
const transaction_dto_1 = require("./transaction.dto");
let TransactionController = class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    getTransactions() {
        return this.transactionService.getTransaction();
    }
    getTransactionById(id) {
        return this.transactionService.getTransactionById(id);
    }
    createTransaction(transaction) {
        return this.transactionService.createTransaction(transaction);
    }
    deleteTransaction(id) {
        return this.transactionService.deleteTransaction(id);
    }
};
exports.TransactionController = TransactionController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all transactions', description: 'Use to get all transactions information' }),
    (0, swagger_2.ApiCreatedResponse)({ description: 'The record has been successfully created.', content: {
            'application/json': {
                examples: {
                    created_transaction: {
                        summary: 'Response after get all transactions information',
                        value: [{
                                "id": 1,
                                "title": "Transaction 1",
                                "desc": "Transaction 1 description",
                                "amount": 100,
                                "transactionDate": "2020-09-01",
                                "userId": 1
                            },
                            {
                                "id": 2,
                                "title": "Transaction 2",
                                "desc": "Transaction 2 description",
                                "amount": 200,
                                "transactionDate": "2020-09-02",
                                "userId": 1
                            }
                        ],
                    },
                },
            },
        } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "getTransactions", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get transaction', description: 'Use to get a specific transaction information by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, examples: {
            id_1: {
                value: 1,
                description: `Get transaction with id = 1`,
            },
            id_2: {
                value: 2,
                description: `Get transaction with id = 2`,
            },
        }, }),
    (0, swagger_2.ApiCreatedResponse)({ description: 'The record has been successfully created.', content: {
            'application/json': {
                examples: {
                    created_transaction: {
                        summary: 'Response after get transaction information',
                        value: {
                            "id": 1,
                            "title": "Transaction 1",
                            "desc": "Transaction 1 description",
                            "amount": 100,
                            "transactionDate": "2020-09-01",
                            "userId": 1
                        },
                    },
                },
            },
        }, }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "getTransactionById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create transaction', description: 'Use to create a new transaction' }),
    (0, swagger_1.ApiBody)({
        type: transaction_dto_1.TransactionDTO,
        examples: {
            example1: {
                value: {
                    id: 3,
                    title: 'Transaction 3',
                    desc: 'Transaction 3 description',
                    amount: 300,
                    transactionDate: '2020-09-03',
                    userId: 1
                },
            }
        }
    }),
    (0, swagger_2.ApiCreatedResponse)({ description: 'The record has been successfully created.', content: {
            'application/json': {
                examples: {
                    created_transaction: {
                        summary: 'Response after create new transaction',
                        value: {
                            "id": 3,
                            "title": "Transaction 3",
                            "desc": "Transaction 3 description",
                            "amount": 300,
                            "transactionDate": "2020-09-03",
                            "userId": 1
                        },
                    },
                },
            },
        }, }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "createTransaction", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete transaction', description: 'Use to delete a specific transaction by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, examples: {
            id_1: {
                value: 1,
                description: `Delete transaction with id = 1`,
            },
            id_2: {
                value: 2,
                description: `Delete transaction with id = 2`,
            },
        }, }),
    (0, swagger_2.ApiCreatedResponse)({ description: 'The record has been successfully created.', content: {
            'application/json': {
                examples: {
                    created_transaction: {
                        summary: 'Response after delete transaction',
                        value: [{
                                "id": 1,
                                "title": "Transaction 1",
                                "desc": "Transaction 1 description",
                                "amount": 100,
                                "transactionDate": "2020-09-01",
                                "userId": 1
                            },
                            {
                                "id": 2,
                                "title": "Transaction 2",
                                "desc": "Transaction 2 description",
                                "amount": 200,
                                "transactionDate": "2020-09-02",
                                "userId": 1
                            }
                        ],
                    },
                },
            },
        } }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "deleteTransaction", null);
exports.TransactionController = TransactionController = __decorate([
    (0, common_1.Controller)('transaction'),
    (0, swagger_1.ApiTags)('transaction'),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionController);
//# sourceMappingURL=transaction.controller.js.map