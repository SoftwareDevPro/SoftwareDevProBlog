---
title: "Sylvester Port -  isParallelTo, isAntiparallelTo, isPerpendicularTo"
date: 2020-09-13T14:05:36-07:00
draft: true
---

In the seventh installment we added the dot, cross, and angleFrom methods.  The dot method computed the scalar product of two vectors (of equal dimensions).  The cross method computed the vector product of two vectors (in 3-dimensional space).  The angleFrom method computed the angle between two vectors.  In this segment we add three new methods isParallelTo, isAntiparallelTo, and isPerpendicularTo.  The isParallelTo method determines whether the current vector is parallel to the passed vector.  The isAntiparallelTo method determines whether the current vector is anti-parallel to the passed vector, and isPerpendicularTo method determines whether the current vector is perpendicular to the passed vector.

New Methods:

```

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

```

Vector Class To Date:

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


Vector.create = (els) ->
  v = new Vector()
  v.setElements(els)
  return v

```

Details:
The isParallelTo method does a quick check to see if the angle between the two vectors is null object, and returns null if it is, otherwise it looks at the difference between the angle and the precision value.  The isAntiparallelTo method does the same check, and then a calculation comparing the result against the precision value.  Lastly, isPerpendicularTo method computes the dot value, and compares it to the precision value.

Sylvester Library Website:
http://sylvester.jcoglan.com/

