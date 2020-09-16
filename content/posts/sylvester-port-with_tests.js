---
title: "Sylvester Port With_tests"
date: 2020-09-16T12:24:07-07:00
draft: true
---

In the last installment for the port of the Vector class, I included the finished CoffeeScript version of the Vector class with the resulting JavaScript code.  Every good developer also tests their own code, so in this installed I have the finished CoffeeScript vector class with very basic (simple alerts) tests.  A better test setup would be one that uses some sort of testing framework such as Selenium or Cucumber.   To run the tests, simply uncomment out the lines with alert in them to execute and see the result.

Finished CoffeeScript Vector Class with Tests:

```

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
        break
       else
         return null
    V


  # Returns a new vector created by normalizing the receiver
  toUnitVector: () ->
    r = @modulus()
    return @dup() if r == 0
    return @map((x) -> x / r )


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


# [ random_number]
#alert(Vector.Random(1).inspect())
# [0, 0, 0, 0]
#alert(Vector.Zero(4).inspect())


#[1,0,0]
#alert(Vector.i.inspect())
#[0,1,0]
#alert(Vector.j.inspect())
#[0,0,1]
#alert(Vector.k.inspect())


v1 = new Vector();


# 0
#alert(v1.dimensions());


v1.setElements([ 1, 2, 3]);


# [1, 2, 3] 
#alert(v1.inspect());


# 3
#alert(v1.dimensions());


# undefined
#alert(v1.e(0));
# 1
#alert(v1.e(1));
# 2
#alert(v1.e(2));
# 3
#alert(v1.e(3));
# undefined
#alert(v1.e(4));


v2 = v1.dup();
# [1, 2, 3] 
#alert(v2.inspect());
# 3
#alert(v2.dimensions());


v3 = new Vector()
v4 = new Vector()
# false
#alert(v1.eql(v3));
# true
#alert(v1.eql(v2));
# true
#alert(v3.eql(v4));


# 2,4,6
#alert(v1.multiply(2));
# 2,4,6
#alert(v1.x(2));
# [1,2,3]
#alert(v1.inspect())


square = (x) -> x * x;
v5 = v1.map(square);
# [1,4,9]
#alert(v5.inspect())


v6 = v5.add(v5)
# [2,8,18]
#alert(v6.inspect())


v7 = v6.subtract(v1.multiply(2))
# [0,4,12]
#alert(v7.inspect())


v8 = v6.dot(v7)
#[2,8,18][0,4,12]
#alert(v6.inspect() + '|' + v7.inspect())
#248 
#alert(v8)


v9 = v6.cross(v7)
# [24, -24, 8]
#alert(v9.inspect())
# 34.87119154832539
#alert(v9.modulus())
#[0.6882472016116852,-0.6882472016116852,0.22941573357056174]
#alert(v9.toUnitVector().inspect())
#[1,-1,0]
#alert(v9.toUnitVector().round().inspect())


#[true,false,false]
#alert(v1.snapTo(1).inspect())
#[false,true,false]
#alert(v2.snapTo(2).inspect())


v10 = new Vector()
v10.setElements([2, 10])
#alert(v10.inspect())
#[2,10,0]
#alert(v10.to3D().inspect())
#[2,10,0]
#alert(v10.to3D().to3D().inspect())


# 24
#alert(v9.max())


# 1
#alert(v9.indexOf(24))
# 2
#alert(v9.indexOf(-24))
# 3
#alert(v9.indexOf(8))
# null
#alert(v9.indexOf(999))


v11 = new Vector()
v11.setElements([100, 200, 300])
#370.4240812906202
#alert(v1.distanceFrom(v11))


v12 = new Vector()
v12.setElements([1, 1])
v13 = new Vector()
v13.setElements([-1, 11])
# 0.8760580505981935
#alert(v12.angleFrom(v13))


# false
#alert(v1.isAntiparallelTo(v2))
# true
#alert(v1.isParallelTo(v2))
# false
#alert(v1.isPerpendicularTo(v2))

```

Sylvester Library Website:
http://sylvester.jcoglan.com/

CoffeeScript Website:
http://coffeescript.org/
