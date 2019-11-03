import {PValue} from './PValue';

export class Unset extends PValue {

  transform(input: any): any {
    return null;
  }
}
