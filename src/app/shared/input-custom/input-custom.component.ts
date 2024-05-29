import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-input-custom',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgxMaskDirective, NgxMaskPipe, CommonModule],
  templateUrl: './input-custom.component.html',
  styleUrl: './input-custom.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCustomComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputCustomComponent),
      multi: true
    }
  ]
})
export class InputCustomComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() mask: string = '';
  @Input() formName: string = '';


  value: any;
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

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.type === 'email') {
      return Validators.email(control);
    } else if (this.formName === 'phoneNumber') {
      const pattern = /^\(\d{2}\) 9\d{4}-\d{4}$/;
      return pattern.test(control.value) ? null : { invalidPhoneNumber: true };
    } else if (this.formName === 'zipcode') {
      const pattern = /^\d{5}-\d{3}$/;
      return pattern.test(control.value) ? null : { invalidCep: true };
    } else if (this.formName === 'number') {
      const pattern = /^\d{5}-\d{3}$/;
      return pattern.test(control.value) ? null : { invalidCep: true };
    }
    return null;
  }

  getClass(): string {
    let control = new FormControl(this.value);
    if (control.touched) {
      return control.valid ? 'input-success' : 'input-error';
    }
    return '';
  }

  handleInputChange(event: any): void {
    const value = event.target.value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
