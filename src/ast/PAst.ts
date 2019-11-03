import * as _ from 'lodash';

export abstract class PAst {

  parent: PAst;

  constructor(p: PAst) {
    this.parent = p;
  }



  abstract transform(input: any): any;
}
