import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

export class FormValidation{

  static equalsTo(otherField: string){
    const validator = (formControl: FormControl) => {
      if(otherField == null) {
        throw new Error('É necessario informar um campo');
      }
      const field = (<FormGroup>formControl.root).get(otherField);

      if(field?.value !== formControl.value) {
        return {equalsTo : true}
      }

      return null;
    };
    return validator;
  }

}
