import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {TodoList, TodolistImage} from '../models';
import {TodolistImageRepository} from '../repositories';

export class TodoListImageController {
  constructor(
    @repository(TodolistImageRepository)
    public todolistImageRepository: TodolistImageRepository,
  ) { }

  @post('/todolist-images')
  @response(200, {
    description: 'TodolistImage model instance',
    content: {'application/json': {schema: getModelSchemaRef(TodolistImage)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodolistImage, {
            title: 'NewTodolistImage',
            exclude: ['id'],
          }),
        },
      },
    })
    todolistImage: Omit<TodolistImage, 'id'>,
  ): Promise<TodolistImage> {
    return this.todolistImageRepository.create(todolistImage);
  }

  @get('/todolist-images/count')
  @response(200, {
    description: 'TodolistImage model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TodolistImage) where?: Where<TodolistImage>,
  ): Promise<Count> {
    return this.todolistImageRepository.count(where);
  }

  @get('/todolist-images')
  @response(200, {
    description: 'Array of TodolistImage model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TodolistImage, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TodolistImage) filter?: Filter<TodolistImage>,
  ): Promise<TodolistImage[]> {
    return this.todolistImageRepository.find(filter);
  }

  @patch('/todolist-images')
  @response(200, {
    description: 'TodolistImage PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodolistImage, {partial: true}),
        },
      },
    })
    todolistImage: TodolistImage,
    @param.where(TodolistImage) where?: Where<TodolistImage>,
  ): Promise<Count> {
    return this.todolistImageRepository.updateAll(todolistImage, where);
  }

  @get('/todolist-images/{id}')
  @response(200, {
    description: 'TodolistImage model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TodolistImage, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TodolistImage, {exclude: 'where'}) filter?: FilterExcludingWhere<TodolistImage>
  ): Promise<TodolistImage> {
    return this.todolistImageRepository.findById(id, filter);
  }

  @patch('/todolist-images/{id}')
  @response(204, {
    description: 'TodolistImage PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodolistImage, {partial: true}),
        },
      },
    })
    todolistImage: TodolistImage,
  ): Promise<void> {
    await this.todolistImageRepository.updateById(id, todolistImage);
  }

  @put('/todolist-images/{id}')
  @response(204, {
    description: 'TodolistImage PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() todolistImage: TodolistImage,
  ): Promise<void> {
    await this.todolistImageRepository.replaceById(id, todolistImage);
  }

  @del('/todolist-images/{id}')
  @response(204, {
    description: 'TodolistImage DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todolistImageRepository.deleteById(id);
  }

  @get('/todolist-images/{id}/todo-list', {
    responses: {
      '200': {
        description: 'TodoList belonging to TodolistImage',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TodoList)},
          },
        },
      },
    },
  })
  async getTodoList(
    @param.path.number('id') id: typeof TodolistImage.prototype.id,
  ): Promise<TodoList> {
    return this.todolistImageRepository.todoList(id);
  }
}


