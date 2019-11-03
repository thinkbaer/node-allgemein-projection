import {PAst} from './PAst';
import {Projection} from '../Projection';

export class PArray extends PAst {

  items: PAst[] = [];


  constructor(kv: any[], p?: PAst) {
    super(p);
    this.interprete(kv);
  }

  interprete(kv: any) {
    for (let i = 0; i < kv.length; i++) {
      this.items[i] = Projection.interprete(kv[i], this);
    }
  }


  transform(input: any) {
    const arr = [];
    for (let i = 0; i < this.items.length; i++) {
      const v = this.items[i];
      arr[i] = v.transform(input);
    }
    return arr;
  }
}


