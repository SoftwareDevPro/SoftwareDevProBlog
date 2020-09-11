---
title: "Sylvester Port - dot, cross, angleFrom"
date: 2020-09-11T16:00:30-07:00
draft: true
---

In the sixth installment we added the multiply and x instance methods.  The multiply method received an argument and multiplied each element in the vector by the argument, and returned the result.  The x method was simply an alias of the multiply method.  In this segment we add the dot, cross, and angleFrom methods. The dot method returns the scalar (i.e. a number) of the vector with the passed vector.  The cross method, returns the vector product (i.e. the result is a product) of the vector with the argument passed.  The angleFrom method returns the angle between the current vector, and the passed vector.

In mathematical terms, the cross product of two vectors (in 3 dimensions) results in a 3-dimensional vector that is perpendicular to both vectors.  The dot product in mathematics with respect to vectors takes two equal length vectors, and returns a single number by multiplying the corresponding entries in each vector, and then summing those products.

New Methods:

```

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

Vector.create = (els) ->
  v = new Vector()
  v.setElements(els)
  return v

```

Details:
The dot method does a quick check to verify that both vectors have the same size, and returns null if that isn't the case.  If they are equal it loops through the current vector's elements, and the passed vectors elements, and summing the multiplication of the element at the current vector index.  The cross product method does also does a quick check, this time to see if both vectors are 3 dimensional, returning null if that is not the case.  If it is the case, it performs the mathematical operation to return the vector cross product.  Lastly, the angleFrom performs a bunch of math to return the angle between the current vector, and passed vector.

Sylvester Library Website:
http://sylvester.jcoglan.com/

Cross Product Description:
http://en.wikipedia.org/wiki/Cross_product 

Dot Product Description:
http://en.wikipedia.org/wiki/Dot_product 


