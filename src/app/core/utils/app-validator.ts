import { Validators } from "@angular/forms";

export class AppValidators {
  static get emailValidator(): Validators {
    return Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  }
  static get zipCodeValidator(): Validators {
    return Validators.pattern(/^\d{8}$/);
  }
  static get phoneNumberValidator(): Validators {
    return Validators.pattern(/^\d{2}9\d{8}$/);
  }
}
