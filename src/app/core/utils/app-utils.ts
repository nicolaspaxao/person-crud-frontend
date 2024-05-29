import { FormGroup } from "@angular/forms";

export class AppUtils {
  static isInputError(form: FormGroup, val: string) {
    return form.get(val)?.invalid && form.get(val)?.touched;
  }
  static isInputSucess(form: FormGroup, val: string) {
    return form.get(val)?.valid;
  }

  static checkInput(form: FormGroup, val: string) {
    return {
      'input-error': this.isInputError(form, val),
      'input-success': this.isInputSucess(form, val)
    }
  }
}
