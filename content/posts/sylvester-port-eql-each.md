---
title: "Sylvester Port, Vector - eql, each"
date: 2020-09-11T10:12:49-07:00
draft: true
---

In the third installment, we added dup, e, and create methods.  The dup method duplicated the current Vector object and returned it.  The e method returned the i'th element from the current Vector, and the create method added is an class method which creates a new Vector based on the array passed in, and returns it.  In this segment, we add the eql and each methods.  The eql method returns a true or false value based on whether or not the passed Vector is equal to the current one.  The each method loops through the current Vector's elements array applying the passed function on each element.

New Methods:

```

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


Vector.create = (els) ->
  v = new Vector()
  v.setElements(els)
  return v


```

Details:
The eql method pulls the lengths of the two elements arrays, and returns false immediately if the two lengths are not equal. Additionally, it returns true immediately the length is 0; this prevents an infinite loop from occurring.  Lastly, the eql method loops through each array value comparing for the difference between each array value minus the Sylvester precision value.  The each method simply loops through each value in the local object's elements array and applies the passed function (fn) to it.

Sylvester Library Website:
http://sylvester.jcoglan.com/

