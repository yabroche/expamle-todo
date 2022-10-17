import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {TodoList, TodoListRelations, Todo, TodolistImage} from '../models';
import {TodoRepository} from './todo.repository';
import {TodolistImageRepository} from './todolist-image.repository';

export class TodoListRepository extends DefaultCrudRepository<
  TodoList,
  typeof TodoList.prototype.id,
  TodoListRelations
> {

  public readonly todos: HasManyRepositoryFactory<Todo, typeof TodoList.prototype.id>;

  public readonly image: HasOneRepositoryFactory<TodolistImage, typeof TodoList.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TodoRepository') protected todoRepositoryGetter: Getter<TodoRepository>, @repository.getter('TodolistImageRepository') protected todolistImageRepositoryGetter: Getter<TodolistImageRepository>,
  ) {
    super(TodoList, dataSource);
    this.image = this.createHasOneRepositoryFactoryFor('image', todolistImageRepositoryGetter);
    this.registerInclusionResolver('image', this.image.inclusionResolver);
    this.todos = this.createHasManyRepositoryFactoryFor('todos', todoRepositoryGetter,);
    this.registerInclusionResolver('todos', this.todos.inclusionResolver);

  }
  public findByTitle(title: string) {
    return this.findOne({where: {title}});
  }

}
