import * as _ from 'lodash';
import {AbstractOperator} from '../AbstractOperator';
import {PAst} from '../../ast/PAst';
import {Projection} from '../../Projection';

export class Substr extends AbstractOperator {

  static NAME = 'substr';

  name = Substr.NAME;

  value: PAst;

  args: any[] = [];


  validate(def: any): boolean {
    if (_.isArray(def) && def.length > 0 && def.length <= 3) {

      const v = def.shift();
      if (_.isString(v)) {
        this.value = Projection.interprete(v, this);
      }

      if (!this.value) {
        return false;
      }

      this.args = def;
      return true;
    }
    return false;
  }

  transform(input: any): any {
    const res = <string>this.value.transform(input);
    return res.substr.apply(res, this.args);
  }
}
