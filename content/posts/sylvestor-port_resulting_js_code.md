---
title: "Sylvestor Port - Resulting Javascript Code"
date: 2020-09-16T10:49:10-07:00
draft: true
---

This is the final segment for the port of the Vector class from JavaScript to CoffeeScript (minus a few methods we'll add later that involve other classes in the Sylvester Library).  I've included the resulting Javascript (as output by coffeescript.org), and the CoffeeScript version of the Vector class.  In the next segment, I'll include real basic test code to verify the functionality didn't change between languages.

Resulting JavaScript from CoffeeScript:

```

var Sylvester, Vector;


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
    } else {
      return this.map(function(x) {
        return x / r;
      });
    }
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


Finished CoffeeScript Vector Class:

Sylvester = {
  version: '0.1.3',
  precision: 1e-6
};


class Vector
  constructor: ->
    @elements = []
  
  # Set vector's elements from an array
  setElements: (els) ->
    @elements = (els.elements || els).slice()
    return this

  # Returns the number of elements the vector has
  dimensions: ->
    @elements.length


  # Returns a string representation of the vector
  inspect: () ->
    '[' + @elements.join(', ') + ']'  

  # Returns a copy of the vector
  dup: ->
    return Vector.create(@elements)
  
  # Returns element i of the vector
  e: (i) ->
    null if (i < 1 || i > @elements.length)
    @elements[i-1]


  # Returns true iff the vector is equal to the argument
  eql: (vector) ->
    n = @elements.length
    V = vector.elements || vector
    return false if n != V.length
    return true if n == 0
    loop
      return false if (Math.abs(@elements[n-1] - V[n-1]) > Sylvester.precision)
      break if --n == 0
    return true


  # Calls the iterator for each element of the vector in turn
  each: (fn) ->
    n = @elements.length
    k = n
    loop
      i = k - n
      fn(@elements[i], i + 1)
      break if --n == 0

  # Maps the vector to another vector according to the given function
  map: (fn) ->
    els = [];
    @each((x, i) ->
      els.push(fn(x, i));
    );
    return Vector.create(els);


  # Returns the result of adding the argument to the vector
  add: (vector) ->
    V = vector.elements || vector
    return null if @elements.length != V.length
    return @map((x, i) -> x + V[i-1]; );


  # Returns the result of subtracting the argument from the vector
  subtract: (vector) ->
    V = vector.elements || vector  
    return null if @elements.length != V.length
    return @map((x, i) -> x - V[i-1]; );


  # Returns the result of multiplying the elements of the vector by the argument
  multiply: (k) ->
    (k * x for x in @elements)


  # Alias for multiply
  x: (k) -> 
    return @multiply(k);

  # Returns the scalar product of the vector with the argument
  # Both vectors must have equal dimensionality
  dot: (vector) ->
    V = vector.elements || vector
    product = 0
    n = this.elements.length
    return null if n != V.length
    loop
      product += @elements[n - 1] * V[n - 1]
      break if --n == 0
    return product

  # Returns the vector product of the vector with the argument
  # Both vectors must have dimensionality 3
  cross: (vector) ->
    B = vector.elements || vector
    return null if (@elements.length != 3 || B.length != 3)
    A = @elements
    return Vector.create([
      (A[1] * B[2]) - (A[2] * B[1]),
      (A[2] * B[0]) - (A[0] * B[2]),
      (A[0] * B[1]) - (A[1] * B[0])
    ])

  # Returns the angle between the vector and the argument (also a vector)
  angleFrom: (vector) ->
    V = vector.elements || vector
    n = @elements.length
    k = n
    i = 0
    return null if n != V.length
    dot = 0
    mod1 = 0
    mod2 = 0
    # Work things out in parallel to save time
    @each((x, i) -> 
      dot += x * V[i-1]
      mod1 += x * x
      mod2 += V[i-1] * V[i-1]
    )
    mod1 = Math.sqrt(mod1)
    mod2 = Math.sqrt(mod2)
    return null if (mod1 * mod2 == 0)
    theta = dot / (mod1*mod2);
    theta = -1 if theta < -1
    theta = 1 if theta > 1
    return Math.acos(theta);

  # Returns true iff the vector is parallel to the argument
  isParallelTo: (vector) ->
    angle = @angleFrom(vector)
    return null if (angle == null)
    angle <= Sylvester.precision

  # Returns true iff the vector is antiparallel to the argument
  isAntiparallelTo: (vector) ->
    angle = @angleFrom(vector);
    return null if (angle == null)
    (Math.abs(angle - Math.PI) <= Sylvester.precision)

   # Returns true iff the vector is perpendicular to the argument
  isPerpendicularTo: (vector) ->
    dot = @dot(vector)
    (dot == null) ? null : (Math.abs(dot) <= Sylvester.precision)

  # Returns the vector's distance from the argument, when considered as a point in space
  distanceFrom: (obj) ->
    return obj.distanceFrom(this) if (obj.anchor)
    V = obj.elements || obj
    return null if (V.length != @elements.length)
    sum = 0
    @each((x, i) ->
      part = x - V[i-1]
      sum += part * part
    )
    Math.sqrt(sum)

  # Returns the result of rounding the elements of the vector
  round: ->
    return @map((x) -> Math.round(x) )

  # Returns a copy of the vector with elements set to the given value if they
  # differ from it by less than Sylvester.precision  
  snapTo: (x) ->
   return @map((y) -> 
     Math.abs(y - x) <= Sylvester.precision ? x : y)


  # Returns the index of the first match found
  indexOf: (x) ->
    index = null
    n = @elements.length
    k = n
    loop
      i = k - n
      if (index == null && @elements[i] == x)
        index = i + 1
      break if --n == 0
    index

  # Returns the (absolute) largest element of the vector
  max: () ->
    m = 0
    n = @elements.length
    k = n
    loop
      i = k - n
      m = @elements[i] if Math.abs(this.elements[i]) > Math.abs(m)
      break if --n == 0
    return m

  # Returns the modulus ('length') of the vector
  modulus: () ->
    Math.sqrt(@dot(this))

  # Utility to make sure vectors are 3D. If they are 2D, a zero z-component is added
  to3D: () ->
    V = @dup()
    switch (V.elements.length)
      when 3
        break
      when 2
        V.elements.push(0)
       else
         return null
    V

  # Returns a new vector created by normalizing the receiver
  toUnitVector: () ->
    r = @modulus()
    if r == 0 then return @dup() else @map((x) -> x / r )


Vector.create = (els) ->
  v = new Vector()
  v.setElements(els)
  return v

# Random vector of size n
Vector.Random = (n) ->
  elements = [];
  loop
    elements.push(Math.random())
    break if --n == 0
  return Vector.create(elements)

# Vector filled with zeros
Vector.Zero = (n) ->
  elements = []
  loop
    elements.push(0)
    break if --n == 0
  return Vector.create(elements)

# i, j, k unit vectors
Vector.i = Vector.create([1,0,0])
Vector.j = Vector.create([0,1,0])
Vector.k = Vector.create([0,0,1])

```

Sylvester Library Website:
http://sylvester.jcoglan.com/

CoffeeScript Website:
http://coffeescript.org/ 