import { Injectable } from '@angular/core';
import { IPerson } from '../../../models/person-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonControllerService {
  public baseUrl = environment.baseUrl;
  public personPath = environment.personPath;

  public listPerson: IPerson[] = [];

  constructor(private http: HttpClient) { }

  public getPersons() {
    this.http.get<IPerson[]>(this.baseUrl + this.personPath).subscribe({
      next: (value: IPerson[]) => {
        this.listPerson = value;
      },
      error: (err) => {
        throw new Error(err);
      },
    })
  }
}
