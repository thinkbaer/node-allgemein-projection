# node-allgemein-projection

Implemetation of mongo-like projections for objects.

```typescript
import {projection} from '@allgemein/projection'; 

const projDef = {surname: '$author.name'};
const input = {author:{name: 'Franz'}};
const res = projection(projDef, input);
// => {surname: 'Franz'}

```


