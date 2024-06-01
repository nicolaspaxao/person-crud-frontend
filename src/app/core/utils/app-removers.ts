export class AppRemovers {
  static removePhoneMask(val: string): string {
    return val.replace("-", '').replace(" ", '').replace("(", '').replace(")", '');
  }

  static removeDocMask(val: string): string {
    return val.replaceAll(/\./g, '').replace("-", '');
  }
}
