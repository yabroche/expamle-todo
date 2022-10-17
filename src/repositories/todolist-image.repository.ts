import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {TodolistImage, TodolistImageRelations, TodoList} from '../models';
import {TodoListRepository} from './todo-list.repository';

export class TodolistImageRepository extends DefaultCrudRepository<
  TodolistImage,
  typeof TodolistImage.prototype.id,
  TodolistImageRelations
> {

  public readonly todoList: BelongsToAccessor<TodoList, typeof TodolistImage.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TodoListRepository') protected todoListRepositoryGetter: Getter<TodoListRepository>,
  ) {
    super(TodolistImage, dataSource);
    this.todoList = this.createBelongsToAccessorFor('todoList', todoListRepositoryGetter,);
    this.registerInclusionResolver('todoList', this.todoList.inclusionResolver);
  }
}
