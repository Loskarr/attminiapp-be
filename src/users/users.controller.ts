import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags,ApiOperation, ApiBody,ApiParam  } from '@nestjs/swagger';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse } from '@nestjs/swagger';
import {UserDTO} from './users.dto';
import e from 'express';

@Controller('users')
@ApiTags('users')

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users', description: 'Use to get all users information' })
  @ApiCreatedResponse({ description: 'The record has been successfully created.', content: {
    'application/json': {
      examples: {
        created_user: {
          summary: 'Response after get all users information',
          value: [{
   
                  "id": 1,
                  "name": "John Doe",
                  "age": 25
          },
          {

                  "id": 2,
                  "name": "Jane Doe",
                  "age": 26
          }
        
        ],
        },
      },
    },
  },})
  getUsers() {
    return this.usersService.getUser();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user', description: 'Use to get a specific user information by id' })
  @ApiParam({ name: 'id', type: Number, examples: {
   id_1: {
      value: 1,
      description: `Get user with id = 1`,
    },
    id_2: {
      value: 2,
      description: `Get user with id = 2`,
    },
  },})
  @ApiCreatedResponse({ description: 'The record has been successfully created.', content: {
    'application/json': {
      examples: {
        created_user: {
          summary: 'Response after get user information',
          value: {
            "id": 1,
            "name": "John Doe",
            "age": 25
          },
        },
      },
    },
  }})
  getUserById(@Param('id') id: number){
    return this.usersService.getUserById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Add user', description: 'Use to add new user' })
  @ApiBody({ 
    
    type: UserDTO,

    examples:{
      example1: {
        value:{
          id: 3,
          name: 'John Doe',
          age: 25
        } as UserDTO,
      }
    }
   })
   @ApiCreatedResponse({ description: 'The record has been successfully created.', content: {

    'application/json': {
      examples: {
        created_user: {
          summary: 'Response after create new user',
          value: {
            id: 3,
            name: 'John Doe',
            age: 25
          },
        },
      },
    },
   }})
  addUser(@Body() user: UserDTO) {
    return this.usersService.createUser(user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user', description: 'Use to delete a specific user by id' })
  @ApiParam({ name: 'id', type: Number, examples: {
    id_1: {
       value: 1,
       description: `Delete user with id = 1`,
     },
     id_2: {
       value: 2,
       description: `Delete user with id = 2`,
     },
   },})
   @ApiCreatedResponse({ description: 'The record has been successfully deleted.', content: {
    'application/json': {
      examples: {
        created_user: {
          summary: 'Response after delete user',
          value: [{
   
                  "id": 2,
                  "name": "Jane Doe",
                  "age": 26
          }
        
        ],
        },
      },
    },
   }})
  deleteUser(@Param('id') id: number){
    return this.usersService.deleteUser(id);
  }
}
