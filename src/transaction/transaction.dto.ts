import { ApiTags,ApiOperation, ApiBody,ApiParam,  } from '@nestjs/swagger';

export class TransactionDTO {
    id: number;
    title: string;
    desc: string;
    amount: number;
    transactionDate: string;
    userId: number;
}