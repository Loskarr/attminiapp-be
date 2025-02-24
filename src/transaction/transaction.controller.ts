import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiTags,ApiOperation, ApiBody, ApiParam  } from '@nestjs/swagger';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse } from '@nestjs/swagger';
import {TransactionDTO} from './transaction.dto';

@Controller('transaction')
@ApiTags('transaction')

export class TransactionController {

    constructor(private readonly transactionService: TransactionService) {}

    @Get()
    @ApiOperation({ summary: 'Get all transactions', description: 'Use to get all transactions information' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', content: {
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
    },}})
    getTransactions() {
        return this.transactionService.getTransaction();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get transaction', description: 'Use to get a specific transaction information by id' })
    @ApiParam({ name: 'id', type: Number, examples: {
      id_1: {
        value: 1,
        description: `Get transaction with id = 1`,
      },
      id_2: {
        value: 2,
        description: `Get transaction with id = 2`,
      },
    },})
    @ApiCreatedResponse({ description: 'The record has been successfully created.', content: {
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
    },})
    getTransactionById(@Param('id') id: number){
        return this.transactionService.getTransactionById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create transaction', description: 'Use to create a new transaction' })
    @ApiBody({ 
      type: TransactionDTO,
      examples:{
        example1: {
          value:{
            id: 3,
            title: 'Transaction 3',
            desc: 'Transaction 3 description',
            amount: 300,
            transactionDate: '2020-09-03',
            userId: 1
          } as TransactionDTO,
        }
      }
    })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', content: {
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
    },})
    createTransaction(@Body() transaction){
        return this.transactionService.createTransaction(transaction);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete transaction', description: 'Use to delete a specific transaction by id' })
    @ApiParam({ name: 'id', type: Number, examples: {
      id_1: {
        value: 1,
        description: `Delete transaction with id = 1`,
      },
      id_2: {
        value: 2,
        description: `Delete transaction with id = 2`,
      },
    },})
    @ApiCreatedResponse({ description: 'The record has been successfully created.', content: {
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
    },}})
    deleteTransaction(@Param('id') id: number){
        return this.transactionService.deleteTransaction(id);
    }
}
