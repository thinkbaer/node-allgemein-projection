import * as _ from 'lodash';
import {AbstractOperator} from '../AbstractOperator';
import {PAst} from '../../ast/PAst';
import {Projection} from '../../Projection';

/**
 * @see https://docs.mongodb.com/manual/reference/operator/aggregation/map/#exp._S_map
 *
 * Example:
 * {  _id: 0,
 *    date: "$date",
 *    tempsStep1:
 *              { $map:
 *                 {
 *                   input: "$temps",
 *                   as: "tempInCelsius",
 *                   in: { $multiply: [ "$$tempInCelsius", 9/5 ] }
 *                }
 *             }
 * }
 */
export class Map extends AbstractOperator {

  static NAME = 'map';

  name = Map.NAME;

  input: PAst;

  as: string;

  in: PAst;

  validate(def: any): boolean {
    if (_.isObjectLike(def) &&
      _.has(def, 'input') &&
      _.has(def, 'as') &&
      _.has(def, 'in')) {
      this.input = Projection.interprete(def.input, this);
      this.as = def.as;
      this.in = Projection.interprete(def.in, this);
      return true;
    }
    return false;
  }

  transform(input: any): any {
    const res = this.input.transform(input);
    if (_.isArray(res)) {
      return res.map(x => {
        const item = {};
        item['$' + this.as] = x;
        return this.in.transform(item);
      });
    } else {
      return null;
    }
  }
}
