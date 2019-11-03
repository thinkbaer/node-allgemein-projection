import {Projection} from './Projection';

export * from './operators/Operators';
export * from './Projection';


/**
 *
 *
 * Includes:
 *  { <field>: 1 }
 *
 * Exclude:
 *  { <field>: 0 }
 *
 * Include by reference:
 *  { <field1>: '$<field2>' }
 *
 * $$REMOVE - in aggregation expressions to conditionally suppress a field.
 *
 *
 * Conditionally Exclude Fields
 * - {
 *        title: 1,
 *        "author.first": 1,
 *        "author.last" : 1,
 *        "author.middle": {
 *           $cond: {
 *              if: { $eq: [ "", "$author.middle" ] },
 *              then: "$$REMOVE",
 *              else: "$author.middle"
 *           }
 *        }
 *
 *
 *
 * Include Computed Fields
 *  - { prefix: { $substr: [ "$isbn", 0, 3 ] }}
 *
 * Commands:
 *
 * - $last: <array_ref>
 * - $first: <array_ref>
 * - $sum: <number_ref>
 * - $toUpper: string_ref
 * - $toLower: string_ref
 */


export function projection(def: any, input: any, output: any = {}) {
  const p = new Projection(def);
  return p.transform(input);

  // const keys = _.keys(def);
  // for (const k of keys) {
  //   const $def = def[k];
  //   const command = k.match(/^\$(.+)/);
  //   if (command) {
  //
  //
  //     const params = resolve($def, input);
  //     let first = null;
  //     if (_.isArray(params)) {
  //       first = params.shift();
  //     } else {
  //       first = params;
  //     }
  //
  //     switch (command[1]) {
  //       case 'substr':
  //         if (!_.isString(first)) {
  //           throw new Error('wrong parameters');
  //         }
  //         return first.substr.apply(first, params);
  //       case 'toLower':
  //         if (!_.isString(first)) {
  //           throw new Error('wrong parameters');
  //         }
  //         return first.toLocaleLowerCase.apply(first);
  //       case 'toUpper':
  //         if (!_.isString(first)) {
  //           throw new Error('wrong parameters');
  //         }
  //         return first.toLocaleUpperCase.apply(first);
  //       default:
  //         throw new Error('can\'t resolve command: ' + command[1]);
  //     }
  //   } else {
  //     resolve($def, input, output, k);
  //   }
  //
  // }
  //
  // return output;
}

//
// function lookup(ref: string, input: any) {
//   let lookup = ref.match(/^\$(.+)/);
//   if (lookup) {
//     // get path to object
//     lookup = <any>lookup[1];
//     return _.get(input, lookup);
//   } else {
//     return ref;
//   }
// }
//
//
// function resolve($def: any, input: any, output?: any, k?: string | number) {
//   let v: any = null;
//   let clear = false;
//
//   if (_.isString($def)) {
//     // direct key access
//     v = lookup($def, input);
//   } else if (_.isNumber($def) && ($def === 1 || $def === 0)) {
//     if (k && _.has(input, k)) {
//       if ($def === 1) {
//         v = _.get(input, k);
//       } else {
//         clear = true;
//       }
//     } else {
//       v = $def;
//     }
//   } else if (_.isArray($def)) {
//     v = [];
//     for (let i = 0; i < $def.length; i++) {
//       resolve($def[i], input, v, i);
//     }
//   } else if (_.isObjectLike($def)) {
//     v = projection_fn($def, input);
//   } else {
//     v = $def;
//   }
//
//   if (output && (!_.isNull(k) || !_.isUndefined(k))) {
//     if (clear) {
//       _.unset(output, k);
//     } else {
//       _.set(output, k, v);
//     }
//   }
//   return v;
//
// }
//

