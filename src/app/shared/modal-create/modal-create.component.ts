import { Component } from '@angular/core';
import { InputCustomComponent } from '../input-custom/input-custom.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppUtils } from '../../core/utils/app-utils';
import { IPerson } from '../../models/person-model';
import { PersonControllerService } from '../../modules/person/controller/person-controller.service';
import { IAddressResponse } from '../../models/address-response';

@Component({
  selector: 'app-modal-create',
  standalone: true,
  imports: [InputCustomComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './modal-create.component.html',
  styleUrl: './modal-create.component.scss'
})
export class ModalCreateComponent {
  ngOnInit() {
    window.onclick = function (event) {
      let modal = document.querySelector<HTMLElement>(".modal-create");
      if (event.target == modal && modal != null) {
        modal.style.display = "none"
      }
    }
  }

  constructor(
    public form: FormBuilder,
    public personController: PersonControllerService
  ) { }

  public closeModal() {
    AppUtils.closeModel(".modal-create");
  }

  public createForm: FormGroup = this.form.group({
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    document: [null, [Validators.required]],
    email: [null, [Validators.required]],
    phoneNumber: [null, [Validators.required]],
    dateOfBirth: [null, [Validators.required]],
    zipcode: [null, [Validators.required, Validators.maxLength(9)]],
    street: [null, Validators.required],
    extraLine: [''],
    neighborhood: [null, Validators.required],
    city: [null, Validators.required],
    state: [null, [Validators.required, Validators.maxLength(2)]]
  })


  public onSubmit(): void {
    if (this.createForm.valid) {
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
          state: this.createForm.value.state
        },
      };
      try {
        this.personController.createPerson(person);
      } catch (error) {
        alert(error);
      }
    }
  }

  public getCep() {
    let cep: string = this.createForm.value.zipcode;
    if (cep.length == 8 || cep.length == 9) {
      this.personController.getCep(cep).subscribe({
        next: (val: IAddressResponse) => {
          console.log(val);

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
