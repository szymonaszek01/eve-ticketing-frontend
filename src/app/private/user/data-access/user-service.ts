import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/shared/data-access/base-service';
import { User } from '../../../shared/shared/models/user';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { UserFilter } from '../models/user-filter';
import { Page } from '../../../shared/shared/models/page';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User, UserFilter> {

  private userList: User[] = [{
    id: 1,
    email: 'jan.kowalski@gmail.com',
    createdAt: new Date(),
    firstname: 'Jan',
    lastname: 'Kowalski',
    phoneNumber: '+48800800800',
    role: 'USER'
  }];

  create(user: User): Observable<User> {
    return of<User>(this.userList[0]).pipe(delay(3000));
  }

  delete(id: number): Observable<void> {
    return of<void>().pipe(delay(3000));
  }

  getAll(page: number, size: number, filter: UserFilter | undefined, sort: string[] | undefined): Observable<Page<User>> {
    let params = new HttpParams();
    params = params.appendAll({page, size, ...filter});
    sort?.forEach(value => (params = params.append('sort', value)));
    return this.http.get<Page<User>>(environment.apiUrl + environment.authUserApiUrl + '/all', {params}).pipe(
      map(response => ({
        ...response,
        content: response.content.map(user => this.toCamelCase(user)).map(user => ({
          ...user,
          createdAt: new Date(user.createdAt),
        }))
      })),
      catchError(error => throwError(error))
    );
  }

  getOne(id: number): Observable<User> {
    return this.http.get(environment.apiUrl + environment.authUserApiUrl + '/id/' + encodeURIComponent(id)).pipe(
      map(response => {
        const user: User = this.toCamelCase(response);
        return {...user, createdAt: new Date(user.createdAt)};
      }),
      catchError(error => throwError(error))
    );
  }

  update(user: User): Observable<User> {
    return of<User>(this.userList[0]).pipe(delay(3000));
  }
}
