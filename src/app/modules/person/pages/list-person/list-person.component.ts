import { Component, } from '@angular/core';
import { PersonControllerService as PersonController } from '../../controller/person-controller.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAddressResponse } from '../../../../models/address-response';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AppUtils } from '../../../../core/utils/app-utils';

@Component({
  selector: 'app-list-person',
  standalone: true,
  providers: [provideNgxMask()],
  templateUrl: './list-person.component.html',
  styleUrl: './list-person.component.scss',
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe,]
})
export class ListPersonComponent {

  public get utils() { return AppUtils }

  constructor(public personController: PersonController) { }

  ngOnInit() {
    this.personController.getPersons();
  }

  public onSubmit(): void {
    if (this.personController.personForm.invalid) {
      this.personController.personForm.markAllAsTouched();
    } else {
      this.personController.createPerson(this.personController.personForm).subscribe({
        next: (value) => {
          this.personController.actionsAfterCreatePerson();
        },
        error: () => {
          alert("Ocorreu um erro ao cadastrar, verifique os dados inseridos.")
        }
      });
    }
  }

  public getCep() {
    let cep: string = this.personController.personForm.value.zipcode;
    if (cep != null && cep.length == 8) {
      this.personController.getCep(cep).subscribe({
        next: (val: IAddressResponse) => {
          this.personController.personForm.get("street")!.setValue(val.logradouro);
          this.personController.personForm.get("extraLine")!.setValue(val.complemento);
          this.personController.personForm.get("neighborhood")!.setValue(val.bairro);
          this.personController.personForm.get("city")!.setValue(val.localidade);
          this.personController.personForm.get("state")!.setValue(val.uf);
        }
      })
    }
  }
}
