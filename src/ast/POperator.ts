import {PAst} from './PAst';
import * as _ from 'lodash';
import {Operators} from '..';
import {AbstractOperator} from '../operators/AbstractOperator';

export class POperator extends PAst {

  operator: AbstractOperator;

  name: string;


  constructor(kv: any, p?: PAst) {
    super(p);
    this.interprete(kv);
  }

  interprete(kv: any) {
    const keys = _.keys(kv);
    if (keys.length === 1 && /^\$/.test(keys[0])) {
      const match = keys[0].match(/^\$(.+)/);

      this.name = match[1];
      const def = kv[keys[0]];
      this.operator = Operators.create(this.name, this);
      if (!this.operator.validate(def)) {
        throw new Error(`operator ${this.name} has no valid definition ${def}`);
      }
    } else {
      throw new Error(`object has not an operator schema`);
    }
  }


  transform(input: any) {
    return this.operator.transform(input);
  }
}




