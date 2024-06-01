import { CommonModule } from '@angular/common';
import { Component, DoCheck, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() modalId?: string;
  @Input() modalTitle?: string;


  ngAfterViewInit() {
    document.querySelector<HTMLElement>(`.id-${this.modalId!}`)!.setAttribute('data-modal-hide', this.modalId!)
  }

}
