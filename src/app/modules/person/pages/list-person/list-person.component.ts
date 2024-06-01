import { Component, } from '@angular/core';
import { PersonControllerService as PersonController } from '../../controller/person-controller.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAddressResponse } from '../../../../models/address-response';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AppUtils } from '../../../../core/utils/app-utils';
import { PrimaryButtonComponent } from "../../../../shared/components/primary-button/primary-button.component";
import { ModalComponent } from "../../../../shared/components/modal/modal.component";
import { CustomInputComponent } from '../../../../shared/components/custom-input/custom-input.component';
import { PersonModalComponent } from "../../../../shared/widgets/person-modal/person-modal.component";
import { IErrorResponse } from '../../../../models/error-response';

@Component({
  selector: 'app-list-person',
  standalone: true,
  providers: [provideNgxMask()],
  templateUrl: './list-person.component.html',
  styleUrl: './list-person.component.scss',
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe, CustomInputComponent, PrimaryButtonComponent, ModalComponent, PersonModalComponent]
})
export class ListPersonComponent {
  public get utils() { return AppUtils }

  constructor(public personController: PersonController) { }

  ngOnInit() { }

  public onSubmit(): void {
    if (this.personController.personForm.invalid) {
      this.personController.personForm.markAllAsTouched();
    } else {
      try {
        this.personController.createLoading = true;
        this.personController.createPerson(this.personController.personForm).subscribe({
          next: (value) => {
            this.personController.actionsAfterCreatePerson();
            this.personController.createLoading = false;
          },
          error: (err: HttpErrorResponse) => {
            alert(err.error.errorMessage);
            this.personController.createLoading = false;
          }
        });
      } catch (e) {
        this.personController.createLoading = false;
      }
    }
  }

  public clearForm() {
    this.personController.personForm.reset();
  }
}
