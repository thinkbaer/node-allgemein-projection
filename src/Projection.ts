import * as _ from 'lodash';
import {PAst} from './ast/PAst';
import {ValueRef} from './ast/ValueRef';
import {Value} from './ast/Value';
import {POperator} from './ast/POperator';
import {PObject} from './ast/PObject';
import {PArray} from './ast/PArray';

export class Projection {

  root: PAst = null;

  constructor(def: any) {
    this.interprete(def);
  }

  static interprete(def: any, p?: PAst) {
    if (_.isString(def)) {
      const isRef = def.match(/^\$(.+)/);
      if (isRef) {
        return new ValueRef(isRef[1], p);
      } else {
        return new Value(def, p);
      }
    } else if (_.isArray(def)) {
      return new PArray(def, p);
    } else if (_.isObjectLike(def)) {
      const k = _.keys(def);
      if (k.length === 1 && /^\$/.test(k[0])) {
        return new POperator(def, p);
      } else {
        return new PObject(def, p);
      }

    }
    throw new Error(`not yet implemented for ${def}`);
  }

  interprete(def: any) {
    this.root = Projection.interprete(def);
  }

  transform(input: any) {
    return this.root.transform(input);
  }

}




