import {expect} from 'chai';
import {suite, test} from 'mocha-typescript';
import {projection} from '../../src/projection';


const testString = 'Das ist ein hallo von Welt programm.';
const testString_AlphaNum = 'Das ist ein Hallo 12 von Welt 2 programm.';


@suite('functional/projection')
class ProjectionSpec {


  @test
  async 'exclude field'() {
    const def = {someGiven: 0};
    const input = {
      someGiven: 'data'
    };
    const projected = projection(def, input);
    expect(projected).to.be.deep.eq({});
  }

  @test
  async 'include field'() {
    const def = {someGiven: 1};
    const input = {
      someGiven: 'data'
    };
    const projected = projection(def, input);
    expect(projected).to.be.deep.eq(input);
  }

  @test
  async 'include static field'() {
    const def = {some: 'content'};
    const input = {
      someGiven: 'data'
    };
    const projected = projection(def, input);
    expect(projected).to.be.deep.eq(def);
  }


  @test
  async 'rename field'() {
    const def = {myVar: '$someGiven'};
    const input = {
      someGiven: 'data'
    };
    const projected = projection(def, input);
    expect(projected).to.be.deep.eq({myVar: 'data'});

  }

  @test
  async 'deep rename field'() {
    const def = {'myVar.content': '$someGiven'};
    const input = {
      someGiven: 'data'
    };
    const projected = projection(def, input);
    expect(projected).to.be.deep.eq({myVar: {content: 'data'}});

  }

  @test
  async 'deep rename field (unlinked)'() {
    const def = {
      myVar: {
        content: '$someGiven'
      }
    };
    const input = {
      someGiven: 'data'
    };
    const projected = projection(def, input);
    expect(projected).to.be.deep.eq({myVar: {content: 'data'}});
  }

  @test
  async 'command: substr'() {
    let def = {
      myVar: {
        $substr: ['$someGiven', 1, 2]
      }
    };
    let input = {
      someGiven: 'data'
    };
    let projected = projection(def, input);
    expect(projected).to.be.deep.eq({myVar: 'at'});

    def = {
      myVar: {
        $substr: ['$someGiven', 2, 2]
      }
    };
    input = {
      someGiven: 'data'
    };
    projected = projection(def, input);
    expect(projected).to.be.deep.eq({myVar: 'ta'});

    def = {
      myVar: {
        $substr: ['someGiven', 4, 4]
      }
    };
    input = {
      someGiven: 'data'
    };
    projected = projection(def, input);
    expect(projected).to.be.deep.eq({myVar: 'Give'});
  }

  @test
  async 'command: toLower'() {
    const def = {
      myVar: {
        $toLower: '$someGiven'
      }
    };
    const input = {
      someGiven: 'dATa'
    };
    const projected = projection(def, input);
    expect(projected).to.be.deep.eq({myVar: 'data'});

  }

  @test
  async 'command: toUpper'() {
    const def = {
      myVar: {
        $toUpper: '$someGiven'
      }
    };
    const input = {
      someGiven: 'dATa'
    };
    const projected = projection(def, input);
    expect(projected).to.be.deep.eq({myVar: 'DATA'});

  }

  @test
  async 'references in array'() {
    const def = {'myVar': ['$some1', '$some2', '$some3']};
    const input = {
      some1: 'data1',
      some2: 'data2',
      some3: 'data3'
    };
    const projected = projection(def, input);
    expect(projected).to.be.deep.eq({myVar: ['data1', 'data2', 'data3']});

  }

}

