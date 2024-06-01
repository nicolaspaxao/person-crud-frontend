import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { AppUtils } from '../../../core/utils/app-utils';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [NgxMaskDirective, NgxMaskPipe, ReactiveFormsModule, CommonModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomInputComponent),
    multi: true
  }]
})
export class CustomInputComponent implements ControlValueAccessor {

  @Input() label: string = 'Label';
  @Input() inputType: string = 'text';
  @Input() useMask?: boolean;
  @Input() placeHolder: string = 'Text';
  @Input() mask?: string;
  @Input() inputId: string = '';
  @Input() form?: FormGroup;
  @Input() inputDisable?: boolean;
  @Input() errorMessage: string = 'Campo requirido'

  public get utils() { return AppUtils }

  value: any;
  disabled = false;
  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInputChange(event: any): void {
    const value = event.target.value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
