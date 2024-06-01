import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomInputComponent } from "../../components/custom-input/custom-input.component";
import { PrimaryButtonComponent } from "../../components/primary-button/primary-button.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PersonControllerService } from '../../../modules/person/controller/person-controller.service';

@Component({
  selector: 'app-person-modal',
  standalone: true,
  templateUrl: './person-modal.component.html',
  styleUrl: './person-modal.component.scss',
  imports: [CommonModule, ReactiveFormsModule, CustomInputComponent, PrimaryButtonComponent, ModalComponent]
})
export class PersonModalComponent {
  @Input() formGroupRef?: FormGroup;

  @Input() modalId?: string;
  @Input() modalTitle?: string;
  @Input() buttonSubmitTitle?: string = 'Confirmar';
  @Input() buttonSubmitLoading: boolean = false;
  @Input() disableDocument?: boolean = false;

  @Output() submitEvent: EventEmitter<any> = new EventEmitter<any>;

  constructor(public person: PersonControllerService) { }

  public onSubmit() {
    this.submitEvent.emit();
  }

  public getCep() {
    this.person.getCep();
  }
}
