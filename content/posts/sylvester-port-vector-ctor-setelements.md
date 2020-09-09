---
title: "Sylvester Port, Vector - constructor, setElements"
date: 2020-09-08T13:59:59-07:00
draft: true
---

For our first part of the Vector class development in coffeescript, we are going to focus on the constructor and setElements methods.  Before we get started, the original Sylvester Javascript library was developed by someone else (James Coglan), the copyright from the top of the file is given below, with a link to the website below:

Copyright Notice:
```
// === Sylvester ===
// Vector and Matrix mathematics modules for JavaScript
// Copyright (c) 2007 James Coglan
// 
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
// THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

Vector Class: 

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
```

Details:
The first part of the class following the copyright notice is a map, which contains the version number of the Sylvester library, and the precision used in the library.  The precision number is used throughout the Vector class and other parts of the library.  The declaration of the class is straightforward.  The constructor simply creates an instance variable called elements which contains the values that model the vector, and the setElements method takes the passed in array, and sets the local class instance variable to that.  The setElements method then returns the instance of the current object which can be used for chaining method calls.

Sylvester Library Website:
http://sylvester.jcoglan.com/
