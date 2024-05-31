import { Injectable } from '@angular/core';
import { IPerson } from '../../../models/person-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { IAddressResponse } from '../../../models/address-response';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppValidators } from '../../../core/utils/app-validator';

@Injectable({
  providedIn: 'root',
})
export class PersonControllerService {
  public baseUrl = environment.baseUrl;
  public personPath = environment.personPath;
  public providerPath = environment.providerPath;

  public listPerson: IPerson[] = [];

  constructor(private http: HttpClient, public form: FormBuilder) { }

  public personForm: FormGroup = this.form.group({
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    document: [null, [Validators.required, AppValidators.cpfValidator]],
    email: [null, [Validators.required, AppValidators.emailValidator]],
    phoneNumber: [null, [Validators.required, Validators.maxLength(15), AppValidators.phoneNumberValidator]],
    dateOfBirth: [null, [Validators.required]],
    zipcode: [null, [Validators.required, Validators.maxLength(9), AppValidators.zipCodeValidator]],
    street: [null, Validators.required],
    extraLine: [''],
    neighborhood: [null, Validators.required],
    city: [null, Validators.required],
    state: [null, [Validators.required, Validators.maxLength(2)]],
    number: [null, [Validators.required]],
  })

  public getPersons() {
    this.http.get<IPerson[]>(this.baseUrl + this.personPath).subscribe({
      next: (value: IPerson[]) => { this.listPerson = value },
    })
  }

  public createPerson(form: FormGroup) {
    let person: IPerson = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      document: form.value.document,
      email: form.value.email,
      phoneNumber: form.value.phoneNumber,
      dateOfBirth: form.value.dateOfBirth,
      address: {
        zipCode: form.value.zipcode,
        street: form.value.street,
        extraLine: form.value.extraLine,
        neighborhood: form.value.neighborhood,
        city: form.value.city,
        state: form.value.state,
        number: form.value.number
      },
    };
    return this.http.post<IPerson>(this.baseUrl + this.personPath, person);
  }

  public getCep(cep: string): Observable<IAddressResponse> {
    return this.http.get<IAddressResponse>(this.baseUrl + this.providerPath + `/cep/${cep}`);
  }

  public actionsAfterCreatePerson() {
    this.getPersons();
    this.personForm.clearValidators();
    this.personForm.reset();
  }
}
