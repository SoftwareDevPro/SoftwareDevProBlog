---
title: "Sylvester Port to3d, toUnitVector"
date: 2020-09-15T10:15:45-07:00
draft: true
---

In the tenth installment we added three new instance methods, indexOf, max, and modulus.  The indexOf method returned the first index into the vector of the passed argument, or null if it could not be found.  The max method returns the (absolute value) largest element of the current vector, and the modulus returns the 'length' of the vector.  In this segment, we add the to3D and toUnitVector methods.  The to3D method makes a vector 3-dimensional and returns a copy when the current vector is 2-D, and the toUnitVector returns the unit vector for the current vector.

New Methods:

```

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

```

Details:
The to3D method simply duplicates the current vector, and then returns the vector if its already 3 dimensional, otherwise if its 2 dimensional it adds a 3 element of 0, otherwise null is returned.  The toUnitVector simply normalizes the vector and returns it.

Sylvester Library Website:
http://sylvester.jcoglan.com/

