---
title: "Sylvester Port - dup, e, create"
date: 2020-09-10T11:26:36-07:00
draft: true
---

In the second installment we built on our previous work, and added the dimensions and inspect instance methods.  So, to date we have a Vector class with a very basic constructor, setElements, dimensions, and inspect methods.  In this segment, we add the dup, e, and create methods.    The dup method simple duplicates the current Vector and returns it.  The e method returns the i'th element of the current Vector object.  The create method creates a new Vector, sets the local instance elements to the array passed, and returns the new Vector.

New Methods:

```

  # Returns a copy of the vector
  dup: ->
    return Vector.create(@elements)
  
  # Returns element i of the vector
  e: (i) ->
    null if (i < 1 || i > @elements.length)
    @elements[i-1]
  

Vector.create = (els) ->
  v = new Vector()
  v.setElements(els)
  return v


Vector Class To Date:

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
  

Vector.create = (els) ->
  v = new Vector()
  v.setElements(els)
  return v

```

Details:
The dup method is extremely simple, it duplicates the current object and returns it.  The e method does a quick check to see if the requested index is within bounds, and returns null if it isn't.  Lastly the create method is not an instance method, its a class method, which means it can be invoked without an instance of the object.  It is similar in functionality to the dup method; however dup must be invoked on an instance object.  Also note the indentation on the create method which removes it from the internal class definition.

Sylvester Library Website:
http://sylvester.jcoglan.com/

