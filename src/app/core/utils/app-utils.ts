import { formatNumber } from "@angular/common";
import { FormGroup } from "@angular/forms";
import { formatCEP, formatCPF } from "@brazilian-utils/brazilian-utils";

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

  static addFormatCPF(val: string): string {
    return formatCPF(val);
  }

  static addFormatCEP(val: string): string {
    return formatCEP(val);
  }

  static addFormatPhoneNumber(val: string): string {
    const padrao = /(\d{2})(\d{5})(\d{4})/;
    const substituir = (match: string, p1: string, p2: string, p3: string) => {
      return `(${p1}) ${p2}-${p3}`;
    };
    const textoFormatado = val.replace(padrao, substituir);
    return textoFormatado;
  }

  static closeModal(modalId: string) {
    let btnSubmit = document.querySelector<HTMLButtonElement>(`.id-${modalId}`);
    btnSubmit!.setAttribute('data-modal-hide', modalId)
    btnSubmit?.click();
  }
}
