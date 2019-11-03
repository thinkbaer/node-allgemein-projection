import * as _ from 'lodash';
import {AbstractOperator} from '../AbstractOperator';
import {PAst} from '../../ast/PAst';
import {Projection} from '../../Projection';

export class First extends AbstractOperator {

  static NAME = 'first';

  name = First.NAME;

  value: PAst;

  validate(def: any): boolean {
    if (_.isString(def)) {
      this.value = Projection.interprete(def, this);
      return true;
    }
    return false;
  }

  transform(input: any): any {
    const res = <any[]>this.value.transform(input);
    return _.first(res);
  }
}
