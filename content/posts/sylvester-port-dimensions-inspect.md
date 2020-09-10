---
title: "Sylvester Port Dimensions Inspect"
date: 2020-09-09T18:13:23-07:00
draft: true
---

In the first installment of our porting the Vector class from Javascript to CoffeeScript, we started with the Sylvester map at the beginning of the source, and then created the class with a constructor, and the setElements  instance method. In this installment, we add on to the class with the dimensions and inspect instance methods.  The dimensions method simply returns the number of elements the vector has, and the inspect method gives a string representation of the current object.

New Methods:
```
  # Returns the number of elements the vector has
  dimensions: ->
    @elements.length


  # Returns a string representation of the vector
  inspect: () ->
    '[' + @elements.join(', ') + ']'  
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
```

Details:
The dimensions method as mentioned simply returns the number of elements the vector has.  Notice that the 'return' keyword is optional.  Just like Ruby, in CoffeeScript, the last thing gets returned from the method.  The inspect method omits the return keyword as well, and simply concatenates elements in the internal array together joining them with a comma.

Sylvester Library Website:
http://sylvester.jcoglan.com/

