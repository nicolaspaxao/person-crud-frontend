import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @ViewChild('closeBtn') closeBtn?: ElementRef;

  @Input() modalId?: string;
  @Input() modalTitle?: string;

  ngOnInit() {
    document.querySelector<HTMLElement>("#close-btn")!.setAttribute('data-modal-hide', this.modalId!)
  }

}
