import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  TodoList,
  TodolistImage,
} from '../models';
import {TodoListRepository} from '../repositories';

export class TodoListTodolistImageController {
  constructor(
    @repository(TodoListRepository) protected todoListRepository: TodoListRepository,
  ) { }

  @get('/todo-lists/{id}/todolist-image', {
    responses: {
      '200': {
        description: 'TodoList has one TodolistImage',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TodolistImage),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TodolistImage>,
  ): Promise<TodolistImage> {
    return this.todoListRepository.image(id).get(filter);
  }

  @post('/todo-lists/{id}/todolist-image', {
    responses: {
      '200': {
        description: 'TodoList model instance',
        content: {'application/json': {schema: getModelSchemaRef(TodolistImage)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TodoList.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodolistImage, {
            title: 'NewTodolistImageInTodoList',
            exclude: ['id'],
            optional: ['todoListId']
          }),
        },
      },
    }) todolistImage: Omit<TodolistImage, 'id'>,
  ): Promise<TodolistImage> {
    return this.todoListRepository.image(id).create(todolistImage);
  }

  @patch('/todo-lists/{id}/todolist-image', {
    responses: {
      '200': {
        description: 'TodoList.TodolistImage PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodolistImage, {partial: true}),
        },
      },
    })
    todolistImage: Partial<TodolistImage>,
    @param.query.object('where', getWhereSchemaFor(TodolistImage)) where?: Where<TodolistImage>,
  ): Promise<Count> {
    return this.todoListRepository.image(id).patch(todolistImage, where);
  }

  @del('/todo-lists/{id}/todolist-image', {
    responses: {
      '200': {
        description: 'TodoList.TodolistImage DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TodolistImage)) where?: Where<TodolistImage>,
  ): Promise<Count> {
    return this.todoListRepository.image(id).delete(where);
  }
}
