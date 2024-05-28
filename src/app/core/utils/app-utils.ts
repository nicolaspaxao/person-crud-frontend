export class AppUtils {
  static openModel(modalRef: string) {
    let modal = document.querySelector<HTMLElement>(modalRef);
    if (modal != null) {
      modal.style.display = "flex"
    }
  }

  static closeModel(modalRef: string) {
    let modal = document.querySelector<HTMLElement>(modalRef);
    if (modal != null) {
      modal.style.display = "none"
    }
  }
}
