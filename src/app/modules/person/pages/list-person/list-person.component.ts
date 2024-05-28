import { Component, } from '@angular/core';
import { PersonControllerService as PersonController } from '../../controller/person-controller.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ModalCreateComponent } from '../../../../shared/modal-create/modal-create.component';

@Component({
  selector: 'app-list-person',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ModalCreateComponent],
  templateUrl: './list-person.component.html',
  styleUrl: './list-person.component.scss'
})
export class ListPersonComponent {
  constructor(public personController: PersonController) {

  }

  ngOnInit() {
    this.personController.getPersons();
  }
}
