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
  priority_id: number = null;
  category_id: number = null;
  pageNumber = 0;
  pageSize = 5;

  //Сортировка
  sortColumn = 'title';
  sortDirection = 'asc';

}


