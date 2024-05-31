import { Component, } from '@angular/core';
import { PersonControllerService as PersonController } from '../../controller/person-controller.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAddressResponse } from '../../../../models/address-response';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AppUtils } from '../../../../core/utils/app-utils';
import { CustomInputComponent } from "../../../../shared/custom-input/custom-input.component";
import { PrimaryButtonComponent } from "../../../../shared/primary-button/primary-button.component";
import { ModalComponent } from "../../../../shared/modal/modal.component";

@Component({
  selector: 'app-list-person',
  standalone: true,
  providers: [provideNgxMask()],
  templateUrl: './list-person.component.html',
  styleUrl: './list-person.component.scss',
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe, CustomInputComponent, PrimaryButtonComponent, ModalComponent]
})
export class ListPersonComponent {
  public cepLoading = false;
  public createLoading = false;

  public get utils() { return AppUtils }

  constructor(public personController: PersonController) { }

  ngOnInit() { }

  public onSubmit(): void {
    if (this.personController.personForm.invalid) {
      this.personController.personForm.markAllAsTouched();
    } else {
      this.createLoading = true;
      this.personController.createPerson(this.personController.personForm).subscribe({
        next: (value) => {
          this.personController.actionsAfterCreatePerson();
          this.createLoading = false;
        },
        error: () => {
          this.createLoading = false;
          alert("Ocorreu um erro ao cadastrar, verifique os dados inseridos.")
        }
      });
    }
  }

  public getCep() {
    let cep = this.personController.personForm.get("zipcode");
    if (cep?.valid) {
      this.cepLoading = true;
      this.personController.getCep(cep.value).subscribe({
        next: (val: IAddressResponse) => {
          this.personController.personForm.get("street")!.setValue(val.logradouro);
          this.personController.personForm.get("extraLine")!.setValue(val.complemento);
          this.personController.personForm.get("neighborhood")!.setValue(val.bairro);
          this.personController.personForm.get("city")!.setValue(val.localidade);
          this.personController.personForm.get("state")!.setValue(val.uf);
          this.cepLoading = false;
        },
        error: (err) => {
          this.cepLoading = false;
        },
      })

    } else {
      cep?.markAsTouched();
    }
  }

  public clearForm() {
    this.personController.personForm.reset();
  }
}
