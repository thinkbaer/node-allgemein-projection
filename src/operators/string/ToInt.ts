import * as _ from 'lodash';
import {AbstractOperator} from '../AbstractOperator';
import {PAst} from '../../ast/PAst';
import {Projection} from '../../Projection';

export class ToInt extends AbstractOperator {

  static NAME = 'toInt';

  name = ToInt.NAME;

  value: PAst;

  validate(def: any): boolean {
    if (_.isString(def)) {
      this.value = Projection.interprete(def, this);
      return true;
    }
    return false;
  }

  transform(input: any): any {
    const res = <string>this.value.transform(input);
    return parseInt(res, 0);
  }
}
