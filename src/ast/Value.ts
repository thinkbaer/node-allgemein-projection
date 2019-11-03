import {PValue} from './PValue';

export class Value extends PValue {

  transform(input: any) {
    return this.value;
  }
}
