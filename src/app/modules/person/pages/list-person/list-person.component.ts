import { Component, } from '@angular/core';
import { PersonControllerService as PersonController } from '../../controller/person-controller.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAddressResponse } from '../../../../models/address-response';
import { IPerson } from '../../../../models/person-model';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AppUtils } from '../../../../core/utils/app-utils';
import { InputCustomComponent } from "../../../../shared/input-custom/input-custom.component";

@Component({
  selector: 'app-list-person',
  standalone: true,
  providers: [provideNgxMask()],
  templateUrl: './list-person.component.html',
  styleUrl: './list-person.component.scss',
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe, InputCustomComponent]
})
export class ListPersonComponent {

  public get utils() { return AppUtils }

  constructor(
    public personController: PersonController,
    public form: FormBuilder
  ) { }

  ngOnInit() {
    this.personController.getPersons();
  }

  public createForm: FormGroup = this.form.group({
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    document: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    phoneNumber: [null, [Validators.required, Validators.pattern(/^\d{2}9\d{8}$/)]],
    dateOfBirth: [null, [Validators.required]],
    zipcode: [null, [Validators.required, Validators.maxLength(9), Validators.pattern(/^\d{8}$/)]],
    street: [null, Validators.required],
    extraLine: [''],
    neighborhood: [null, Validators.required],
    city: [null, Validators.required],
    state: [null, [Validators.required, Validators.maxLength(2)]],
    number: [null, [Validators.required]],
  })

  public onSubmit(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
    } else {
      let person: IPerson = {
        firstName: this.createForm.value.firstName,
        lastName: this.createForm.value.lastName,
        document: this.createForm.value.document,
        email: this.createForm.value.email,
        phoneNumber: this.createForm.value.phoneNumber,
        dateOfBirth: this.createForm.value.dateOfBirth,
        address: {
          zipCode: this.createForm.value.zipcode,
          street: this.createForm.value.street,
          extraLine: this.createForm.value.extraLine,
          neighborhood: this.createForm.value.neighborhood,
          city: this.createForm.value.city,
          state: this.createForm.value.state,
          number: this.createForm.value.number
        },
      };
      this.personController.createPerson(person).subscribe({
        next: (value) => {
          this.personController.getPersons();
          this.createForm.clearValidators();
          this.createForm.reset();
        },
        error: () => {
          alert("Ocorreu um erro ao cadastrar, verifique os dados inseridos.")
        }
      });
    }
  }

  public getCep() {
    let cep: string = this.createForm.value.zipcode;
    if (cep != null && cep.length == 8) {
      this.personController.getCep(cep).subscribe({
        next: (val: IAddressResponse) => {
          this.createForm.get("street")!.setValue(val.logradouro);
          this.createForm.get("extraLine")!.setValue(val.complemento);
          this.createForm.get("neighborhood")!.setValue(val.bairro);
          this.createForm.get("city")!.setValue(val.localidade);
          this.createForm.get("state")!.setValue(val.uf);
        }
      })
    }
  }
}
