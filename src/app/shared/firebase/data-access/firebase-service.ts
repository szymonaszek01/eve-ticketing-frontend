import { Injectable } from '@angular/core';
import { Service } from '../../shared/data-access/service';
import { Auth } from '../../../public/auth/models/auth';
import { FirebaseRes } from '../models/firebase-res';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService extends Service<Auth> {

  upload(file: File, entity: string, id: number, field: string, update: boolean): Observable<FirebaseRes> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    let params = new HttpParams();
    params = params.appendAll({entity, id, field, update});
    return this.http.post<FirebaseRes>(
      environment.apiUrl + environment.firebaseApiUrl + '/upload',
      formData,
      {params}
    );
  }
}
