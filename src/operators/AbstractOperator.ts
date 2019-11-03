import {PAst} from '../ast/PAst';

export abstract class AbstractOperator extends PAst {

  name: string;

  constructor(p?: PAst) {
    super(p);
  }

  abstract validate(def: any): boolean;

}
