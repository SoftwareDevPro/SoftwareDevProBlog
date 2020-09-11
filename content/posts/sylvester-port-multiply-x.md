---
title: "Sylvester Port Multiply X"
date: 2020-09-11T15:56:14-07:00
draft: true
---

In the fifth installment we added the map, add, and subtract instance methods.  The map function created a new vector mapping the new values with the function passed to the method.  The add method added the current vector and passed vector to create a new vector, and the subtract method subtracted the current vector from the passed vector to create a new vector.  In this segment we add the multiply and x methods.  The multiply method creates a new vector consisting of elements where the passed argument is multipled by each vector element, and the x method is simply an alias of the multiply method.

New Methods:

```

  # Returns the result of multiplying the elements of the vector by the argument
  multiply: (k) ->
    (k * x for x in @elements)


  # Alias for multiply
  x: (k) -> 
    return @multiply(k);

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

Vector.create = (els) ->
  v = new Vector()
  v.setElements(els)
  return v

```

Details:
The multiply method here uses the CoffeeScript list comprehension notation (seen in other languages such as Python) to return a new array containing each element in the current vector mulitplied by the argument.  The x method simply invokes the multiply method.

Sylvester Library Website:
http://sylvester.jcoglan.com/

