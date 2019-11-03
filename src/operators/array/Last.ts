import * as _ from 'lodash';
import {AbstractOperator} from '../AbstractOperator';
import {PAst} from '../../ast/PAst';
import {Projection} from '../../Projection';

export class Last extends AbstractOperator {

  static NAME = 'last';

  name = Last.NAME;

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
    return _.last(res);
  }
}
