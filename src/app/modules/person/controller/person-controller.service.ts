import { Injectable } from '@angular/core';
import { IPerson } from '../../../models/person-model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { IAddressResponse } from '../../../models/address-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppValidators } from '../../../core/utils/app-validator';
import { ProviderApiService } from '../../../core/providers/provider-api.service';
import { AppRemovers } from '../../../core/utils/app-removers';
import { AppUtils } from '../../../core/utils/app-utils';

@Injectable({
  providedIn: 'root',
})
export class PersonControllerService {
  public baseUrl = environment.baseUrl;
  public personPath = environment.personPath;

  public listPerson: IPerson[] = [];

  constructor(private http: HttpClient, public form: FormBuilder, public provider: ProviderApiService) { }

  public cepLoading: boolean = false;
  public createLoading: boolean = false;
  public updateLoading: boolean = false;

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
      document: AppRemovers.removeDocMask(form.value.document),
      email: form.value.email,
      phoneNumber: AppRemovers.removePhoneMask(form.value.phoneNumber),
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

  public updatePerson(id: string, form: FormGroup) {
    let person: IPerson = {
      id: id,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      document: AppRemovers.removeDocMask(form.value.document),
      email: form.value.email,
      phoneNumber: AppRemovers.removePhoneMask(form.value.phoneNumber),
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
    return this.http.put<IPerson>(this.baseUrl + this.personPath, person);
  }

  public getCep() {
    let cep = this.personForm.get("zipcode");
    if (cep?.valid) {
      this.cepLoading = true;
      this.provider.getCep(cep.value).subscribe({
        next: (val: IAddressResponse) => {
          this.personForm.get("street")!.setValue(val.logradouro);
          if (val.complemento != null) {
            this.personForm.get("extraLine")!.setValue(val.complemento);
          }
          this.personForm.get("neighborhood")!.setValue(val.bairro);
          this.personForm.get("city")!.setValue(val.localidade);
          this.personForm.get("state")!.setValue(val.uf);
          this.cepLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.cepLoading = false;
        },
      })
    } else {
      cep?.markAsTouched();
    }
  }

  public fillFormValues(person: IPerson) {
    this.personForm.get("firstName")!.setValue(person.firstName);
    this.personForm.get("lastName")!.setValue(person.lastName);
    this.personForm.get("document")!.setValue(AppUtils.addFormatCPF(person.document));
    this.personForm.get("email")!.setValue(person.email);
    this.personForm.get("phoneNumber")!.setValue(AppUtils.addFormatPhoneNumber(person.phoneNumber));
    this.personForm.get("dateOfBirth")!.setValue(person.dateOfBirth);
    this.personForm.get("zipcode")!.setValue(AppUtils.addFormatCEP(person.address.zipCode));
    this.personForm.get("street")!.setValue(person.address.street);
    this.personForm.get("extraLine")!.setValue(person.address.extraLine);
    this.personForm.get("neighborhood")!.setValue(person.address.neighborhood);
    this.personForm.get("city")!.setValue(person.address.city);
    this.personForm.get("state")!.setValue(person.address.state);
    this.personForm.get("number")!.setValue(person.address.number);
  }

  public actionsAfterSubmit() {
    this.getPersons();
    this.personForm.clearValidators();
    this.personForm.reset();
  }
}
