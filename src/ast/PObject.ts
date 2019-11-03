import * as _ from 'lodash';
import {PAst} from './PAst';
import {Projection} from '../Projection';
import {ValueRef} from './ValueRef';
import {Unset} from './Unset';

export class PObject extends PAst {

  children: { [k: string]: PAst } = {};

  keys: string[];


  constructor(kv: any, p?: PAst) {
    super(p);
    this.interprete(kv);
  }

  interprete(kv: any) {
    this.keys = _.keys(kv);
    for (const k of this.keys) {
      const v = kv[k];
      if (_.isNumber(v) && (v === 1 || v === 0)) {
        if (v === 1) {
          this.children[k] = new ValueRef(k, this);
        } else {
          this.children[k] = new Unset(k, this);
          // unset already done
        }
      } else {
        this.children[k] = Projection.interprete(v, this);
      }

    }
  }


  transform(input: any) {
    const out = {};
    for (const k of this.keys) {
      const v = this.children[k];
      if (v instanceof Unset) {
        _.unset(out, k);
      } else {
        _.set(out, k, v.transform(input));
      }

    }
    return out;
  }
}
