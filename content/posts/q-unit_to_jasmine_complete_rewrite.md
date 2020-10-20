---
title: "Q-unit to Jasmine Complete Re-write"
date: 2020-10-20T16:06:22-07:00
draft: true
---

In the previous conversions, we wrote test methods using the synchronous test methods from the Q-unit library.  Following that, I converted those synchronous methods to asynchronous test methods one at a time. Rather then take the one-by-one approach before in converting the test methods to a Jasmine test format, I'm going to do the updates in this one blog post, and make updates as I go (if updates need to be made).  One of the key differences is the split into three files: the main test file, the spec file which contains the actual unit tests, and the Vector source code.

Main Jasmine Test File:

```

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
  "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <title>Vector Testing Done with Jasmine Spec Runner</title>

  <link rel="shortcut icon" type="image/png" href="lib/jasmine-1.3.1/jasmine_favicon.png">
  <link rel="stylesheet" type="text/css" href="lib/jasmine-1.3.1/jasmine.css">
  <script type="text/javascript" src="lib/jasmine-1.3.1/jasmine.js"></script>
  <script type="text/javascript" src="lib/jasmine-1.3.1/jasmine-html.js"></script>

  <!-- include source files here... -->
  <script type="text/javascript" src="src/Vector.js"></script>

  <!-- include spec files here... -->
  <script type="text/javascript" src="spec/VectorSpec.js"></script>

  <script type="text/javascript">
    (function() {
      var jasmineEnv = jasmine.getEnv();
      jasmineEnv.updateInterval = 1000;

      var htmlReporter = new jasmine.HtmlReporter();

      jasmineEnv.addReporter(htmlReporter);

      jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
      };

      var currentWindowOnload = window.onload;

      window.onload = function() {
        if (currentWindowOnload) {
          currentWindowOnload();
        }
        execJasmine();
      };

      function execJasmine() {
        jasmineEnv.execute();
      }

    })();
  </script>

</head>

<body>
</body>
</html>

```

src/Vector.js file:

```

var Sylvester, Vector, square, v1, v10, v11, v12, v13, v2, v3, v4, v5, v6, v7, v8, v9;

Sylvester = {
  version: '0.1.3',
  precision: 1e-6
};

Vector = (function() {

  function Vector() {
    this.elements = [];
  }

  Vector.prototype.setElements = function(els) {
    this.elements = (els.elements || els).slice();
    return this;
  };

  Vector.prototype.dimensions = function() {
    return this.elements.length;
  };

  Vector.prototype.inspect = function() {
    return '[' + this.elements.join(', ') + ']';
  };

  Vector.prototype.dup = function() {
    return Vector.create(this.elements);
  };

  Vector.prototype.e = function(i) {
    if (i < 1 || i > this.elements.length) {
      null;
    }
    return this.elements[i - 1];
  };

  Vector.prototype.eql = function(vector) {
    var V, n;
    n = this.elements.length;
    V = vector.elements || vector;
    if (n !== V.length) {
      return false;
    }
    if (n === 0) {
      return true;
    }
    while (true) {
      if (Math.abs(this.elements[n - 1] - V[n - 1]) > Sylvester.precision) {
        return false;
      }
      if (--n === 0) {
        break;
      }
    }
    return true;
  };

  Vector.prototype.each = function(fn) {
    var i, k, n, _results;
    n = this.elements.length;
    k = n;
    _results = [];
    while (true) {
      i = k - n;
      fn(this.elements[i], i + 1);
      if (--n === 0) {
        break;
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Vector.prototype.map = function(fn) {
    var els;
    els = [];
    this.each(function(x, i) {
      return els.push(fn(x, i));
    });
    return Vector.create(els);
  };

  Vector.prototype.add = function(vector) {
    var V;
    V = vector.elements || vector;
    if (this.elements.length !== V.length) {
      return null;
    }
    return this.map(function(x, i) {
      return x + V[i - 1];
    });
  };

  Vector.prototype.subtract = function(vector) {
    var V;
    V = vector.elements || vector;
    if (this.elements.length !== V.length) {
      return null;
    }
    return this.map(function(x, i) {
      return x - V[i - 1];
    });
  };

  Vector.prototype.multiply = function(k) {
    var x, _i, _len, _ref, _results;
    _ref = this.elements;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      x = _ref[_i];
      _results.push(k * x);
    }
    return _results;
  };

  Vector.prototype.x = function(k) {
    return this.multiply(k);
  };

  Vector.prototype.dot = function(vector) {
    var V, n, product;
    V = vector.elements || vector;
    product = 0;
    n = this.elements.length;
    if (n !== V.length) {
      return null;
    }
    while (true) {
      product += this.elements[n - 1] * V[n - 1];
      if (--n === 0) {
        break;
      }
    }
    return product;
  };

  Vector.prototype.cross = function(vector) {
    var A, B;
    B = vector.elements || vector;
    if (this.elements.length !== 3 || B.length !== 3) {
      return null;
    }
    A = this.elements;
    return Vector.create([(A[1] * B[2]) - (A[2] * B[1]), (A[2] * B[0]) - (A[0] * B[2]), (A[0] * B[1]) - (A[1] * B[0])]);
  };

  Vector.prototype.angleFrom = function(vector) {
    var V, dot, i, k, mod1, mod2, n, theta;
    V = vector.elements || vector;
    n = this.elements.length;
    k = n;
    i = 0;
    if (n !== V.length) {
      return null;
    }
    dot = 0;
    mod1 = 0;
    mod2 = 0;
    this.each(function(x, i) {
      dot += x * V[i - 1];
      mod1 += x * x;
      return mod2 += V[i - 1] * V[i - 1];
    });
    mod1 = Math.sqrt(mod1);
    mod2 = Math.sqrt(mod2);
    if (mod1 * mod2 === 0) {
      return null;
    }
    theta = dot / (mod1 * mod2);
    if (theta < -1) {
      theta = -1;
    }
    if (theta > 1) {
      theta = 1;
    }
    return Math.acos(theta);
  };

  Vector.prototype.isParallelTo = function(vector) {
    var angle;
    angle = this.angleFrom(vector);
    if (angle === null) {
      return null;
    }
    return angle <= Sylvester.precision;
  };

  Vector.prototype.isAntiparallelTo = function(vector) {
    var angle;
    angle = this.angleFrom(vector);
    if (angle === null) {
      return null;
    }
    return Math.abs(angle - Math.PI) <= Sylvester.precision;
  };

  Vector.prototype.isPerpendicularTo = function(vector) {
    var dot, _ref;
    dot = this.dot(vector);
    return (_ref = dot === null) != null ? _ref : {
      "null": Math.abs(dot) <= Sylvester.precision
    };
  };

  Vector.prototype.distanceFrom = function(obj) {
    var V, sum;
    if (obj.anchor) {
      return obj.distanceFrom(this);
    }
    V = obj.elements || obj;
    if (V.length !== this.elements.length) {
      return null;
    }
    sum = 0;
    this.each(function(x, i) {
      var part;
      part = x - V[i - 1];
      return sum += part * part;
    });
    return Math.sqrt(sum);
  };

  Vector.prototype.round = function() {
    return this.map(function(x) {
      return Math.round(x);
    });
  };

  Vector.prototype.snapTo = function(x) {
    return this.map(function(y) {
      var _ref;
      return (_ref = Math.abs(y - x) <= Sylvester.precision) != null ? _ref : {
        x: y
      };
    });
  };

  Vector.prototype.indexOf = function(x) {
    var i, index, k, n;
    index = null;
    n = this.elements.length;
    k = n;
    while (true) {
      i = k - n;
      if (index === null && this.elements[i] === x) {
        index = i + 1;
      }
      if (--n === 0) {
        break;
      }
    }
    return index;
  };

  Vector.prototype.max = function() {
    var i, k, m, n;
    m = 0;
    n = this.elements.length;
    k = n;
    while (true) {
      i = k - n;
      if (Math.abs(this.elements[i]) > Math.abs(m)) {
        m = this.elements[i];
      }
      if (--n === 0) {
        break;
      }
    }
    return m;
  };

  Vector.prototype.modulus = function() {
    return Math.sqrt(this.dot(this));
  };

  Vector.prototype.to3D = function() {
    var V;
    V = this.dup();
    switch (V.elements.length) {
      case 3:
        break;
      case 2:
        V.elements.push(0);
        break;
      default:
        return null;
    }
    return V;
  };

  Vector.prototype.toUnitVector = function() {
    var r;
    r = this.modulus();
    if (r === 0) {
      return this.dup();
    }
    return this.map(function(x) {
      return x / r;
    });
  };

  return Vector;

})();

Vector.create = function(els) {
  var v;
  v = new Vector();
  v.setElements(els);
  return v;
};

Vector.Random = function(n) {
  var elements;
  elements = [];
  while (true) {
    elements.push(Math.random());
    if (--n === 0) {
      break;
    }
  }
  return Vector.create(elements);
};

Vector.Zero = function(n) {
  var elements;
  elements = [];
  while (true) {
    elements.push(0);
    if (--n === 0) {
      break;
    }
  }
  return Vector.create(elements);
};

Vector.i = Vector.create([1, 0, 0]);

Vector.j = Vector.create([0, 1, 0]);

Vector.k = Vector.create([0, 0, 1]);

v1 = new Vector();

v1.setElements([1, 2, 3]);

v2 = v1.dup();

v3 = new Vector();

v4 = new Vector();

square = function(x) {
  return x * x;
};

v5 = v1.map(square);

v6 = v5.add(v5);

v7 = v6.subtract(v1.multiply(2));

v8 = v6.dot(v7);

v9 = v6.cross(v7);

v10 = new Vector();

v10.setElements([2, 10]);

v11 = new Vector();

v11.setElements([100, 200, 300]);

v12 = new Vector();

v12.setElements([1, 1]);

v13 = new Vector();

v13.setElements([-1, 11]);

spec/VectorSpec.js file:

describe('Vector Zero Dimension Test', function() {
 it('zero dimension test', function() {
  v1 = new Vector();
  expect(v1.dimensions()).toEqual(0);
 });
});

describe('Vector Inspect Test', function() {
 it("vector.inspect", function()  {
   v1 = new Vector();
   v1.setElements([ 1, 2, 3]);
  expect("[1, 2, 3]").toEqual(v1.inspect());
 });
});

describe('Vector i Test', function() {
 it("vector.i", function()  {
  expect("[1, 0, 0]").toEqual(Vector.i.inspect());
 });
});

describe('Vector j Test', function() {
 it("vector.j", function()  {
  expect("[0, 1, 0]").toEqual(Vector.j.inspect());
 });
});

describe('Vector k Test', function() {
 it("vector.k", function()  {
  expect("[0, 0, 1]").toEqual(Vector.k.inspect());
 });
});

describe('Vector e Test', function() {
 it("vector.e", function()  {
   v1 = new Vector();
   v1.setElements([ 1, 2, 3]);
  expect(undefined).toEqual(v1.e(0));
  expect(1).toEqual(v1.e(1));
  expect(2).toEqual(v1.e(2));
  expect(3).toEqual(v1.e(3));
  expect(undefined).toEqual(v1.e(4));
 });
});

describe('Vector dup Test', function() {
 it("vector.dup", function()  {
   v1 = new Vector();
   v1.setElements([ 1, 2, 3]);
   v2 = v1.dup();
  expect(true).toEqual(v1.eql(v2));
 });
});

describe('Vector eql Test', function() {
 it("vector.eql", function()  {
   v1 = new Vector();
   v1.setElements([ 1, 2, 3]);
   v2 = v1.dup();
   v2.setElements([ 2, 4, 6]);
  expect(false).toEqual(v1.eql(v2));
 });
});

describe('Vector multiply Test', function() {
 it("vector.multiply", function()  {
  v1 = new Vector();
   v1.setElements([ 1, 2, 3]);
   v2 = v1.multiply(10);
  expect(10).toEqual(v2[0]);
  expect(20).toEqual(v2[1]);
  expect(30).toEqual(v2[2]);
 });
});


describe('Vector x Test', function() {
 it("vector.x", function()  {
  v1 = new Vector();
   v1.setElements([ 1, 2, 3]);
   v2 = v1.x(0.5)
  expect(0.5).toEqual(v2[0]);
  expect(1).toEqual(v2[1]);
  expect(1.5).toEqual(v2[2]);   
 });
});

describe('Vector each Test', function() {
 it("vector.each", function()  {
  
  v1 = new Vector();
   v1.setElements([ 1, 2, 3]);
   
   v1.each(function(x) {
      x * 10;
   });
   
  expect(3).toEqual(v1.dimensions());
  expect(1).toEqual(v1.e(1));
  expect(2).toEqual(v1.e(2));
  expect(3).toEqual(v1.e(3));   
 });
});

describe('Vector map Test', function() {
 it("vector.map", function()  {
  
  v1 = new Vector();
   v1.setElements([ 1, 2, 3]);
   
   v2 = v1.map(function (x) { return x * x });
   
  expect(v2.e(1)).toEqual(1);
  expect(v2.e(2)).toEqual(4);
  expect(v2.e(3)).toEqual(9);
 });
});

describe('Vector add Test', function() {
 it("vector.add", function()  {
  
  v1 = new Vector();
   v1.setElements([ 1, 2, 3]);
   
  v2 = new Vector();
   v2.setElements([ 1, 2, 3]);
   
   v3 = v1.add(v2);

   expect(3).toEqual(v3.dimensions());
  expect(v3.e(1)).toEqual(2);
  expect(v3.e(2)).toEqual(4);
  expect(v3.e(3)).toEqual(6);   
 });
});

describe('Vector subtract Test', function() {
 it("vector.subtract", function()  {
  
  v1 = new Vector();
   v1.setElements([ 1, 2, 3]);
   
  v2 = new Vector();
   v2.setElements([ 2, 4, 6]);
   
   v3 = v1.subtract(v2);

   expect(3).toEqual(v3.dimensions());
  expect(v3.e(1)).toEqual(-1);
  expect(v3.e(2)).toEqual(-2);
  expect(v3.e(3)).toEqual(-3);      
 });
});

describe('Vector dot Test', function() {
 it("vector.dot", function()  {
 
   v1 = new Vector();
   v1.setElements([ 1, 2, 3]);
   
   v2 = v1.map(function(x) { return x * x });
  v3 = v1.add(v2);
  v4 = v3.subtract(v1.multiply(2));
   v6 = v3.dot(v4);
  
  expect(84).toEqual(v6);
 });
});

describe('Vector cross Test', function() {
 it("vector.cross", function()  {
   
   v1 = new Vector();
   v1.setElements([ 1, 2, 3]);
  
   v2 = v1.map(function(x) { return x * x }); 
  v3 = v5.add(v2)
  v4 = v3.subtract(v1.multiply(2))
  v5 = v3.cross(v4)

   expect(v5.e(1)).toEqual(24);
  expect(v5.e(2)).toEqual(-24);
  expect(v5.e(3)).toEqual(8);  
 });
});

describe('Vector angleFrom Test', function() {
 it("vector.angleFrom", function()  {
  
  v12 = new Vector();
  v12.setElements([1, 1]);
  v13 = new Vector();
  v13.setElements([-1, 11]);
  
  expect(0.8760580505981935).toEqual(v12.angleFrom(v13));  
 });
});

describe('Vector isParallelTo Test', function() {
 it("vector.isParallelTo", function()  {
   v1 = new Vector();
   v1.setElements([ 1, 2, 3]);
   v2 = v1.dup();
  expect(true).toEqual(v1.isParallelTo(v2));  
 });
});

describe('Vector isAntiparallelTo Test', function() {
 it("vector.isAntiparallelTo", function()  {
   v1 = new Vector();
   v1.setElements([ 1, 2, 3]);
   v2 = v1.dup();
  expect(false).toEqual(v1.isAntiparallelTo(v2));  
 });
});

describe('Vector isPerpendicularTo Test', function() {
 it("vector.isPerpendicularTo", function()  {
   v1 = new Vector();
   v1.setElements([ 1, 2, 3]);
   v2 = v1.dup();
  expect(false).toEqual(v1.isPerpendicularTo(v2));  
 });
});

describe('Vector distanceFrom Test', function() {
 it("vector.distanceFrom", function()  {
   v1 = new Vector();
   v1.setElements([ 1, 2, 3]);
   v11 = new Vector()
   v11.setElements([100, 200, 300])   
  expect(370.4240812906202).toEqual(v1.distanceFrom(v11));  
 });
});

describe('Vector round Test', function() {
 it("vector.round", function()  {  
   v1 = new Vector();
   v1.setElements([ 1, 2, 3]);
  square = function(x) { return x * x };
   v5 = v1.map(square);
  v6 = v5.add(v5)
  v7 = v6.subtract(v1.multiply(2))
  v9 = v6.cross(v7).toUnitVector().round();

   expect(v9.e(1)).toEqual(1);  
  expect(v9.e(2)).toEqual(-1);  
  expect(v9.e(3)).toEqual(0);    
 });
});

describe('Vector snapTo Test', function() {
 it("vector.snapTo", function()  {
 
   v1 = new Vector();
   v1.setElements([ 1, 2, 3]);
   result = v1.snapTo(1)
   
  expect(true).toEqual(result.e(1));  
  expect(false).toEqual(result.e(2));  
  expect(false).toEqual(result.e(3));     
   
   v2 = v1.dup();
   result = v2.snapTo(2)
   
  expect(false).toEqual(result.e(1));  
  expect(true).toEqual(result.e(2));  
  expect(false).toEqual(result.e(3));        
 });
});

describe('Vector indexOf Test', function() {
 it("vector.indexOf", function()  {
 
   v1 = new Vector();
   v1.setElements([ 1, 2, 3]);
  square = function(x) { return x * x };
   v5 = v1.map(square);
  v6 = v5.add(v5)
  v7 = v6.subtract(v1.multiply(2))
  v9 = v6.cross(v7)

   expect(v9.indexOf(24)).toEqual(1);  
  expect(v9.indexOf(-24)).toEqual(2);  
  expect(v9.indexOf(8)).toEqual(3);    
 });
});

describe('Vector max Test', function() {
 it("vector.max", function()  {
  v1 = new Vector();
   v1.setElements([ 2, 4, 6]);
  expect(v1.max()).toEqual(6);  
   v1.setElements([ -5, 2, 4, 6, -1]);
  expect(v1.max()).toEqual(6);  
 });
});

describe('Vector modulus Test', function() {
 it("vector.modulus", function()  {  
   v1 = new Vector();
   v1.setElements([ 1, 2, 3]);
  square = function(x) { return x * x };
   v5 = v1.map(square);
  v6 = v5.add(v5)
  v7 = v6.subtract(v1.multiply(2))
  v9 = v6.cross(v7) 
  
  expect(34.87119154832539).toEqual(v9.modulus());  
 });
});

describe('Vector to3D Test', function() {
 it("vector.to3D", function()  {
   v1 = Vector.Random(2);
   expect(2).toEqual(v1.dimensions());  
   v2 = v1.to3D()
   expect(3).toEqual(v2.dimensions());  
   
   expect(true).toEqual(v2.e(1) >= 0 && v2.e(1) <= 1);  
   expect(true).toEqual(v2.e(2) >= 0 && v2.e(2) <= 1);  
   expect(true).toEqual(v2.e(3) == 0);     
 });
});

describe('Vector toUnitVector Test', function() {
 it("vector.toUnitVector", function()  {
  
   v1 = new Vector();
   v1.setElements([ 1, 2, 3]);
  square = function(x) { return x * x };
   v5 = v1.map(square);
  v6 = v5.add(v5)
  v7 = v6.subtract(v1.multiply(2))
  v9 = v6.cross(v7).toUnitVector();
  
   expect(v9.e(1)).toEqual(0.6882472016116852);     
   expect(v9.e(2)).toEqual(-0.6882472016116852);     
   expect(v9.e(3)).toEqual(0.22941573387056174);  
 });
});

describe('Vector Random Test', function() {
 it("vector.Random", function()  {
   v1 = Vector.Random(5);   
   expect(5).toEqual(v1.dimensions());  
   expect(true).toEqual(v1.e(1) >= 0 && v1.e(1) <= 1);  
   expect(true).toEqual(v1.e(2) >= 0 && v1.e(2) <= 1);  
   expect(true).toEqual(v1.e(3) >= 0 && v1.e(3) <= 1);  
   expect(true).toEqual(v1.e(4) >= 0 && v1.e(4) <= 1);  
   expect(true).toEqual(v1.e(5) >= 0 && v1.e(5) <= 1);   
 });
});

describe('Vector Zero Test', function() {
 it("vector.Zero", function()  {
   v1 = Vector.Zero(5);
   expect(5).toEqual(v1.dimensions());  
   expect(0).toEqual(v1.e(1));  
   expect(0).toEqual(v1.e(2));  
   expect(0).toEqual(v1.e(3));  
   expect(0).toEqual(v1.e(4));  
   expect(0).toEqual(v1.e(5));     
 });
});

```

Jasmine Home Page:
http://pivotal.github.io/jasmine/

Jasmine Framework Description:
http://en.wikipedia.org/wiki/Jasmine_(JavaScript_framework)

List of Unit Testing Frameworks:
http://en.wikipedia.org/wiki/List_of_unit_testing_frameworks#JavaScript

Q-unit Testing Framework:
http://qunitjs.com/



