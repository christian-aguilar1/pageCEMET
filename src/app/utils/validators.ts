import { AbstractControl } from "@angular/forms";

export class MyValidators {
  static bothRequired(control: AbstractControl) {
    const name = control.root.value.name;
    const email = control.root.value.email;
    if (typeof name === "string" && typeof email === "string") {
      if (name.length === 0 && email.length === 0) {
        return null;
      } else if (name.length > 0 && email.length > 0) {
        return null;
      } else if (name.length === 0 && email.length > 0) {
        console.log(name, name.length, "falta nombre")
        return { 'nameRequired': true };
      } else if (name.length > 0 && email.length === 0) {
        console.log(email, email.length, "falta email")
        return { 'emailRequired': true };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
