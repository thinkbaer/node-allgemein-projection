import {suite, test} from 'mocha-typescript';
import {expect} from 'chai';
import {Projection} from '../../src/Projection';


const testString = 'Das ist ein hallo von Welt programm.';
const testString_AlphaNum = 'Das ist ein Hallo 12 von Welt 2 programm.';


@suite('functional/projection_cls')
class ProjectionSpec {

  @test
  async 'plain string definition'() {
    const def = 'hallo';
    const input = {
      someGiven: 'data'
    };

    const p = new Projection(def);
    const output = p.transform(input);
    expect(output).to.be.eq('hallo');
  }


  @test
  async 'plain reference string definition'() {
    const def = '$someGiven';
    const input = {
      someGiven: 'data'
    };

    const p = new Projection(def);
    const output = p.transform(input);
    expect(output).to.be.eq('data');
  }

  @test
  async 'object reference definition'() {
    const def = {myvar: '$someGiven'};
    const input = {
      someGiven: 'data'
    };

    const p = new Projection(def);
    const output = p.transform(input);
    expect(output).to.be.deep.eq({myvar: 'data'});
  }

  @test
  async 'object static value definition'() {
    const def = {myvar: 'someGiven'};
    const input = {
      someGiven: 'data'
    };

    const p = new Projection(def);
    const output = p.transform(input);
    expect(output).to.be.deep.eq({myvar: 'someGiven'});
  }


  @test
  async 'command: map'() {
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
    expect(output).to.be.deep.eq({myvar: [{number: '1'}, {number: '2'}, {number: '3'}]});
  }


  @test
  async 'command: first'() {
    const def = {
      myvar: {
        $first: '$items'
      }
    };
    const input = {
      items: ['1', '2', '3']
    };

    const p = new Projection(def);
    const output = p.transform(input);
    expect(output).to.be.deep.eq({myvar: '1'});
  }

  @test
  async 'command: last'() {
    const def = {
      myvar: {
        $last: '$items'
      }
    };
    const input = {
      items: ['1', '2', '3']
    };

    const p = new Projection(def);
    const output = p.transform(input);
    expect(output).to.be.deep.eq({myvar: '3'});
  }

  @test
  async 'command: toInt'() {
    const def = {
      myvar: {
        $toInt: '$items'
      }
    };
    const input = {
      items: '1'
    };

    const p = new Projection(def);
    const output = p.transform(input);
    expect(output).to.be.deep.eq({myvar: 1});
  }

  @test
  async 'command: toFloat'() {
    const def = {
      myvar: {
        $toFloat: '$items'
      }
    };
    const input = {
      items: '1.5'
    };

    const p = new Projection(def);
    const output = p.transform(input);
    expect(output).to.be.deep.eq({myvar: 1.5});
  }

}

