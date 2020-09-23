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
    if(category.id === null || category.id === 0){
      category.id = this.getLastIdCategory();
    }

    TestData.categories.push(category);

    return of(category);
  }

  private getLastIdCategory(): number{
    return Math.max.apply(Math, TestData.categories.map(category => category.id))+1;
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
    return of(TestData.categories.filter(
      cat => cat.title.toUpperCase().includes(title.toUpperCase()))
      .sort((c1,c2) => c1.title.localeCompare(c2.title)));
  }

}
