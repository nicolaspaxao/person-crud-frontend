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
import { AppClassCombo } from '../../../../core/utils/app-class-combo';
import { IPerson } from '../../../../models/person-model';

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
  public get classes() { return AppClassCombo }

  public personId: string = '';

  constructor(public controller: PersonController) { }

  ngOnInit() {
    this.controller.getPersons()
  }

  public onCreate(): void {
    if (this.controller.personForm.invalid) {
      this.controller.personForm.markAllAsTouched();
    } else {
      try {
        this.controller.createLoading = true;
        this.controller.createPerson(this.controller.personForm).subscribe({
          next: () => {
            this.utils.closeModal('create-modal')
            this.controller.actionsAfterSubmit();
            this.controller.createLoading = false;
          },
          error: (err: HttpErrorResponse) => {
            alert(err.error.errorMessage);
            this.controller.createLoading = false;
          }
        });
      } catch (e) {
        this.controller.createLoading = false;
      }
    }
  }


  public onUpdate(): void {
    if (this.controller.personForm.invalid) {
      this.controller.personForm.markAllAsTouched();
    } else {
      try {
        this.controller.updateLoading = true;
        this.controller.updatePerson(this.personId, this.controller.personForm).subscribe({
          next: () => {
            this.utils.closeModal('edit-modal')
            this.controller.actionsAfterSubmit();
            this.controller.updateLoading = false;
          },
          error: (err: HttpErrorResponse) => {
            alert(err.error.errorMessage);
            this.controller.updateLoading = false;
          }
        });
      } catch (e) {
        this.controller.updateLoading = false;
      }
    }
  }

  public onDelete(id: string) {
    this.controller.deletePerson(id).subscribe({
      next: () => {
        this.controller.getPersons();
      }
    })
  }

  public onEdit(person: IPerson) {
    this.personId = '';
    this.personId = person.id!;
    this.controller.personForm.reset();
    this.controller.fillFormValues(person);
  }

  public clearForm() {
    this.controller.personForm.reset();
  }
}
