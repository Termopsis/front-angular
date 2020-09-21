import {CategoryDAO} from 'src/app/data/dao/interface/CategoryDAO';
import {Category} from 'src/app/model/Category';
import {Observable, of} from 'rxjs';
import {TestData} from 'src/app/data/testData';

export class CategoryService implements CategoryDAO{

  findAll(): Observable<Category[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Observable<Category> {
        throw new Error("Method not implemented.");
    }

  get(id: number): Observable<Category> {
    return undefined;
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }


  add(category: Category): Observable<Category> {
    return undefined;
  }

  delete(id: number): Observable<Category> {

    //Нужно удалить категории во всех задачах которые её использовали
    //В БД это делается автоматом
    TestData.tasks.forEach(task =>{
      if (task.category && task.category.id === id){
        task.category = null;
      }
    });

    const categoryTmp = TestData.categories.find(c => c.id == id);
    TestData.categories.splice(TestData.categories.indexOf(categoryTmp),1);
    return of(categoryTmp);
  }

  update(category: Category): Observable<Category> {

    const categoryTmp = TestData.categories.find(c => c.id === category.id);
    TestData.categories.splice(TestData.categories.indexOf(categoryTmp), 1,category);

    return of(category);
  }


  search(title: string): Observable<Category[]> {
    return undefined;
  }

}
