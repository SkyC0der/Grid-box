const Index = require('./index');

describe('single line grids', () => {
  test('Should accept an initial game grid', () => {
    const grid = ['jefblpepre'];
    const challenge = new Index(grid);

    expect(challenge instanceof Index).toEqual(true);
  });

  test('can accept a target search word', () => {
    const grid = ['jefblpepre'];
    const challenge = new Index(grid);

    expect(challenge.find(['glasnost'])).toEqual({ glasnost: undefined });
  });

  test('should locate a word written left to right', () => {
    const grid = ['clojurermt'];
    const expectedResults = {
      clojure: {
        start: [1, 1],
        end: [1, 7],
      },
    };
    const challenge = new Index(grid);

    expect(challenge.find(['clojure'])).toEqual(expectedResults);
  });

  test('can locate a left to right word in a different position', () => {
    const grid = ['mtclojurer'];
    const expectedResults = {
      clojure: {
        start: [1, 3],
        end: [1, 9],
      },
    };
    const challenge = new Index(grid);

    expect(challenge.find(['clojure'])).toEqual(expectedResults);
  });

  test('can locate a different left to right word', () => {
    const grid = ['coffeelplx'];
    const expectedResults = {
      coffee: {
        start: [1, 1],
        end: [1, 6],
      },
    };
    const challenge = new Index(grid);

    expect(challenge.find(['coffee'])).toEqual(expectedResults);
  });
  test('can locate that different left to right word in a different position', () => {
    const grid = ['xcoffeezlp'];
    const expectedResults = {
      coffee: {
        start: [1, 2],
        end: [1, 7],
      },
    };
    const challenge = new Index(grid);

    expect(challenge.find(['coffee'])).toEqual(expectedResults);
  });
});

describe('multi line grids', () => {
  test('can locate a left to right word in a two line grid', () => {
    const grid = [
      'jefblpepre',
      'clojurermt',
    ];

    const expectedResults = {
      clojure: {
        start: [2, 1],
        end: [2, 7],
      },
    };

    const challenge = new Index(grid);

    expect(challenge.find(['clojure'])).toEqual(expectedResults);
  });
  test('can locate a left to right word in a different position in a two line grid', () => {
    const grid = [
      'jefblpepre',
      'tclojurerm',
    ];
    const expectedResults = {
      clojure: {
        start: [2, 2],
        end: [2, 8],
      },
    };
    const challenge = new Index(grid);

    expect(challenge.find(['clojure'])).toEqual(expectedResults);
  });
  test('can locate a left to right word in a three line grid', () => {
    const grid = [
      'camdcimgtc',
      'jefblpepre',
      'clojurermt',
    ];
    const expectedResults = {
      clojure: {
        start: [3, 1],
        end: [3, 7],
      },
    };
    const challenge = new Index(grid);

    expect(challenge.find(['clojure'])).toEqual(expectedResults);
  });

  test('can locate a left to right word in a ten line grid', () => {
    const grid = [
      'jefblpepre',
      'camdcimgtc',
      'oivokprjsm',
      'pbwasqroua',
      'rixilelhrs',
      'wolcqlirpc',
      'screeaumgr',
      'alxhpburyi',
      'jalaycalmp',
      'clojurermt',
    ];

    const expectedResults = {
      clojure: {
        start: [10, 1],
        end: [10, 7],
      },
    };
    const challenge = new Index(grid);

    expect(challenge.find(['clojure'])).toEqual(expectedResults);
  });

  test('can locate a left to right word in a different position in a ten line grid', () => {
    const grid = [
      'jefblpepre',
      'camdcimgtc',
      'oivokprjsm',
      'pbwasqroua',
      'rixilelhrs',
      'wolcqlirpc',
      'screeaumgr',
      'alxhpburyi',
      'clojurermt',
      'jalaycalmp',
    ];

    const expectedResults = {
      clojure: {
        start: [9, 1],
        end: [9, 7],
      },
    };
    const challenge = new Index(grid);

    expect(challenge.find(['clojure'])).toEqual(expectedResults);
  });
  test('can locate a different left to right word in a ten line grid', () => {
    const grid = [
      'jefblpepre',
      'camdcimgtc',
      'oivokprjsm',
      'pbwasqroua',
      'rixilelhrs',
      'wolcqlirpc',
      'screeaumgr',
      'alxhpburyi',
      'clojurermt',
      'jalaycalmp',
    ];
    const expectedResults = {
      scree: {
        start: [7, 1],
        end: [7, 5],
      },
    };
    const challenge = new Index(grid);

    expect(challenge.find(['scree'])).toEqual(expectedResults);
  });
});


describe('can find multiple words', () => {
  test('can find two words written left to right', () => {
    const grid = [
      'aefblpepre',
      'camdcimgtc',
      'oivokprjsm',
      'pbwasqroua',
      'rixilelhrs',
      'wolcqlirpc',
      'screeaumgr',
      'alxhpburyi',
      'jalaycalmp',
      'clojurermt',
      'xjavamtzlp',
    ];
    const expectedResults = {
      clojure: {
        start: [10, 1],
        end: [10, 7],
      },
      java: {
        start: [11, 2],
        end: [11, 5],
      },
    };
    const challenge = new Index(grid);

    expect(challenge.find(['java', 'clojure'])).toEqual(expectedResults);
  });
});

describe('different directions', () => {
  test('should locate a single word written right to left', () => {
    const grid = ['rixilelhrs'];
    const expectedResults = {
      elixir: {
        start: [1, 6],
        end: [1, 1],
      },
    };
    const challenge = new Index(grid);

    expect(challenge.find(['elixir'])).toEqual(expectedResults);
  });
  test('should locate multiple words written in different horizontal directions', () => {
    const grid = [
      'jefblpepre',
      'camdcimgtc',
      'oivokprjsm',
      'pbwasqroua',
      'rixilelhrs',
      'wolcqlirpc',
      'screeaumgr',
      'alxhpburyi',
      'jalaycalmp',
      'clojurermt',
    ];
    const expectedResults = {
      clojure: {
        start: [10, 1],
        end: [10, 7],
      },
      elixir: {
        start: [5, 6],
        end: [5, 1],
      },
    };
    const challenge = new Index(grid);

    expect(challenge.find(['elixir', 'clojure'])).toEqual(expectedResults);
  });
});

describe('vertical directions', () => {
  test('should locate words written top to bottom', () => {
    const grid = [
      'jefblpepre',
      'camdcimgtc',
      'oivokprjsm',
      'pbwasqroua',
      'rixilelhrs',
      'wolcqlirpc',
      'screeaumgr',
      'alxhpburyi',
      'jalaycalmp',
      'clojurermt',
    ];
    const expectedResults = {
      clojure: {
        start: [10, 1],
        end: [10, 7],
      },
      elixir: {
        start: [5, 6],
        end: [5, 1],
      },
      ecmascript: {
        start: [1, 10],
        end: [10, 10],
      },
    };
    const challenge = new Index(grid);

    expect(challenge.find(['elixir', 'clojure', 'ecmascript'])).toEqual(expectedResults);
  });
  test('should locate words written bottom to top', () => {
    const grid = [
      'jefblpepre',
      'camdcimgtc',
      'oivokprjsm',
      'pbwasqroua',
      'rixilelhrs',
      'wolcqlirpc',
      'screeaumgr',
      'alxhpburyi',
      'jalaycalmp',
      'clojurermt',
    ];
    const expectedResults = {
      clojure: {
        start: [10, 1],
        end: [10, 7],
      },
      elixir: {
        start: [5, 6],
        end: [5, 1],
      },
      ecmascript: {
        start: [1, 10],
        end: [10, 10],
      },
      rust: {
        start: [5, 9],
        end: [2, 9],
      },
    };
    const challenge = new Index(grid);

    expect(challenge.find(['elixir', 'clojure', 'ecmascript', 'rust'])).toEqual(expectedResults);
  });
  test('should locate words written top left to bottom right', () => {
    const grid = [
      'jefblpepre',
      'camdcimgtc',
      'oivokprjsm',
      'pbwasqroua',
      'rixilelhrs',
      'wolcqlirpc',
      'screeaumgr',
      'alxhpburyi',
      'jalaycalmp',
      'clojurermt',
    ];
    const expectedResults = {
      clojure: {
        start: [10, 1],
        end: [10, 7],
      },
      elixir: {
        start: [5, 6],
        end: [5, 1],
      },
      ecmascript: {
        start: [1, 10],
        end: [10, 10],
      },
      rust: {
        start: [5, 9],
        end: [2, 9],
      },
      java: {
        start: [1, 1],
        end: [4, 4],
      },
    };
    const challenge = new Index(grid);

    expect(challenge.find([
      'clojure',
      'elixir',
      'ecmascript',
      'rust',
      'java',
    ])).toEqual(expectedResults);
  });
  test('should locate words written bottom right to top left', () => {
    const grid = [
      'jefblpepre',
      'camdcimgtc',
      'oivokprjsm',
      'pbwasqroua',
      'rixilelhrs',
      'wolcqlirpc',
      'screeaumgr',
      'alxhpburyi',
      'jalaycalmp',
      'clojurermt',
    ];

    const expectedResults = {
      clojure: {
        start: [10, 1],
        end: [10, 7],
      },
      elixir: {
        start: [5, 6],
        end: [5, 1],
      },
      ecmascript: {
        start: [1, 10],
        end: [10, 10],
      },
      rust: {
        start: [5, 9],
        end: [2, 9],
      },
      java: {
        start: [1, 1],
        end: [4, 4],
      },
      lua: {
        start: [9, 8],
        end: [7, 6],
      },
    };
    const challenge = new Index(grid);

    expect(challenge.find([
      'clojure',
      'elixir',
      'ecmascript',
      'rust',
      'java',
      'lua',
    ])).toEqual(expectedResults);
  });
  test('should locate words written bottom left to top right', () => {
    const grid = [
      'jefblpepre',
      'camdcimgtc',
      'oivokprjsm',
      'pbwasqroua',
      'rixilelhrs',
      'wolcqlirpc',
      'screeaumgr',
      'alxhpburyi',
      'jalaycalmp',
      'clojurermt',
    ];
    const expectedResults = {
      clojure: {
        start: [10, 1],
        end: [10, 7],
      },
      elixir: {
        start: [5, 6],
        end: [5, 1],
      },
      ecmascript: {
        start: [1, 10],
        end: [10, 10],
      },
      rust: {
        start: [5, 9],
        end: [2, 9],
      },
      java: {
        start: [1, 1],
        end: [4, 4],
      },
      lua: {
        start: [9, 8],
        end: [7, 6],
      },
      lisp: {
        start: [6, 3],
        end: [3, 6],
      },
    };

    const challenge = new Index(grid);

    expect(challenge.find([
      'clojure',
      'elixir',
      'ecmascript',
      'rust',
      'java',
      'lua',
      'lisp',
    ])).toEqual(expectedResults);
  });
  test('should locate words written top right to bottom left', () => {
    const grid = [
      'jefblpepre',
      'camdcimgtc',
      'oivokprjsm',
      'pbwasqroua',
      'rixilelhrs',
      'wolcqlirpc',
      'screeaumgr',
      'alxhpburyi',
      'jalaycalmp',
      'clojurermt',
    ];

    const expectedResults = {
      clojure: {
        start: [10, 1],
        end: [10, 7],
      },
      elixir: {
        start: [5, 6],
        end: [5, 1],
      },
      ecmascript: {
        start: [1, 10],
        end: [10, 10],
      },
      rust: {
        start: [5, 9],
        end: [2, 9],
      },
      java: {
        start: [1, 1],
        end: [4, 4],
      },
      lua: {
        start: [9, 8],
        end: [7, 6],
      },
      lisp: {
        start: [6, 3],
        end: [3, 6],
      },
      ruby: {
        start: [6, 8],
        end: [9, 5],
      },
    };
    const challenge = new Index(grid);

    expect(challenge.find([
      'clojure',
      'elixir',
      'ecmascript',
      'rust',
      'java',
      'lua',
      'lisp',
      'ruby',
    ])).toEqual(expectedResults);
  });
});
