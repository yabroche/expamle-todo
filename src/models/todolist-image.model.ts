import {belongsTo, Entity, model, property} from '@loopback/repository';
import {TodoList} from './todo-list.model';

@model()
export class TodolistImage extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  value: string;

  @belongsTo(() => TodoList)
  todoListId: number;

  constructor(data?: Partial<TodolistImage>) {
    super(data);
  }
}

export interface TodolistImageRelations {
  // describe navigational properties here
}

export type TodolistImageWithRelations = TodolistImage & TodolistImageRelations;
