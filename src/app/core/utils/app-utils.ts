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
      'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500': this.isInputError(form, val),
      'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white': !this.isInputError(form, val)
    }
  }
}
