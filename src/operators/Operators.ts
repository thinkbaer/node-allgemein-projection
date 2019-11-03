import {Substr} from './string/Substr';
import {PAst} from '../ast/PAst';
import {ToUpper} from './string/ToUpper';
import {ToLower} from './string/ToLower';
import {ToInt} from './string/ToInt';
import {ToFloat} from './string/ToFloat';
import {Map} from './array/Map';
import {First} from './array/First';
import {Last} from './array/Last';

export class Operators {
  static operators: { [k: string]: Function } = {};

  static install(name: string, opertor: Function) {
    Operators.operators[name] = opertor;
  }

  static create(name: string, p?: PAst) {
    if (this.operators[name]) {
      return Reflect.construct(this.operators[name], [p]);
    } else {
      throw new Error(`no such operator ${name} defined`);
    }
  }
}

/*
 *  String operators
 */
Operators.install(Substr.NAME, Substr);
Operators.install(ToUpper.NAME, ToUpper);
Operators.install(ToLower.NAME, ToLower);
Operators.install(ToInt.NAME, ToInt);
Operators.install(ToFloat.NAME, ToFloat);

/*
 *  Array operators
 */
Operators.install(Map.NAME, Map);
Operators.install(First.NAME, First);
Operators.install(Last.NAME, Last);
