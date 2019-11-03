import * as _ from 'lodash';
import {PValue} from './PValue';

export class ValueRef extends PValue {

  transform(input: any) {
    return _.get(input, this.value);
  }
}
