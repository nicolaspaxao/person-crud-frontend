import { Injectable } from '@angular/core';
import { IPerson } from '../../../models/person-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { IAddressResponse } from '../../../models/address-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonControllerService {
  public baseUrl = environment.baseUrl;
  public personPath = environment.personPath;
  public providerPath = environment.providerPath;

  public listPerson: IPerson[] = [];

  constructor(private http: HttpClient) { }

  public getPersons() {
    this.http.get<IPerson[]>(this.baseUrl + this.personPath).subscribe({
      next: (value: IPerson[]) => {
        this.listPerson = value;
      },
      error: (err) => {
        alert(err.error.detail)
      },
    })
  }

  public createPerson(person: IPerson) {
    this.http.post<IPerson>(this.baseUrl + this.personPath, person).subscribe({
      next: (value: IPerson) => {
        if (value.id != null) {
          this.getPersons();
        }
      },
      error: (err) => {
        console.log(err);
        if (err.status == 500 || err.status == 404) {
          alert(err.error.errorMessage)
        } else {
          alert(err.error.detail)
        }
      },
    })
  }

  public getCep(cep: string): Observable<IAddressResponse> {
    return this.http.get<IAddressResponse>(this.baseUrl + this.providerPath + `/cep/${cep}`);
  }
}
