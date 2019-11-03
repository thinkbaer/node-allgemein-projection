import {PAst} from './PAst';

export abstract class PValue extends PAst {

  value: any;

  constructor(value: string, p?: PAst) {
    super(p);
    this.value = value;
  }
}
