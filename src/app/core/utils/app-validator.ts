import { Validators } from "@angular/forms";

export class AppValidators {
  static get emailValidator(): Validators {
    return Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  }
  static get zipCodeValidator(): Validators {
    return Validators.pattern(/^\d{5}-\d{3}$/);
  }
  static get phoneNumberValidator(): Validators {
    return Validators.pattern(/^\(\d{2}\) 9\d{4}-\d{4}$/);
  }
  static get cpfValidator(): Validators {
    return Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
  }

}
