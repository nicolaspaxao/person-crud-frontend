import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.scss',
  imports: [LoadingSpinnerComponent, CommonModule]
})
export class PrimaryButtonComponent {
  @Input() isLoading: boolean = false;
  @Input() title: string = '';
  @Input() inputType: string = 'button';
  @Input() height: string = '';
  @Output() onTap: EventEmitter<any> = new EventEmitter;

  public onClick() {
    this.onTap.emit();
  }
}
