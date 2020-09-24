export class CategorySearchValues {
  title: string = null;
}

export class PrioritySearchValues {
  title: string = null;
}

export class TaskSearchValues {

  //Нач значение по умолчанию
  title = '';
  completed: number = null;
  priorityId: number = null;
  categoryId: number = null;
  pageNumber = 0;
  pageSize = 5;

  //Сортировка
  sortColumn = 'title';
  sortDirection = 'asc';

}


