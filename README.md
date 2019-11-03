# node-allgemein-projection

Implemetation of mongo-like projections for objects. (@see: https://docs.mongodb.com/manual/reference/operator/aggregation/)

## Install 

```bash
npm i @allgemein/projection
```

## Example

```typescript
import {projection} from '@allgemein/projection'; 

const projDef = {surname: '$author.name'};
const input = {author: {name: 'Franz'}};
const res = projection(projDef, input);
// => {surname: 'Franz'}

```

## Operators

### String

**substr** 
```typescript
const projDef = {
  initial:{
    $substr: ['$author.name',0,1]
  }        
};
const input = {author: {name: 'Franz'}};
const res = projection(projDef, input);
// => {initial: 'F'}
```

**toInt** 
```typescript
const projDef = {
  calc:{
    $toInt: '$sum'
  }        
};
const input = {sum: '1'};
const res = projection(projDef, input);
// => {sum: 1}
```

**toFloat** 
```typescript
const projDef = {
  calc:{
    $toFloat: '$sum'
  }        
};
const input = {sum: '1.5'};
const res = projection(projDef, input);
// => {sum: 1.5}
```

**toLower** 
```typescript
const projDef = {
  str:{
    $toLower: '$text'
  }        
};
const input = {text: 'Hallo wOrld'};
const res = projection(projDef, input);
// => {str: 'hallo world'}
```

**toUpper** 
```typescript
const projDef = {
  str:{
    $toUpper: '$text'
  }        
};
const input = {text: 'Hallo wOrld'};
const res = projection(projDef, input);
// => {str: 'HALLO WORLD'}
```


### Array


**map**
```typescript
const def = {
  myvar: {
    $map: {
      input: '$items',
      as: 'i',
      in: {number: '$$i'}
    }
  }
};
const input = {
  items: ['1', '2', '3']
};

const p = new Projection(def);
const output = p.transform(input);
// => {myvar: [{number: '1'},{number: '2'},{number: '3'}]}
```

**first**

TODO

**last**

TODO
