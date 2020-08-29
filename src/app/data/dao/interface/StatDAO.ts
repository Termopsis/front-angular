import {CommonDAO} from './CommonDAO';
import {Stat} from '../../../model/Stat';
import {Observable} from 'rxjs';

export interface StatDAO {

  getOverAllStat(): Observable<Stat>;

}
