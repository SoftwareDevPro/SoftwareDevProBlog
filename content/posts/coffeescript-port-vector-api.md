---
title: "Coffeescript Port Vector Api"
date: 2020-09-04T09:00:43-07:00
draft: true
---

The first object we are looking at the Vector class (an Object is instance of a given class in Object-Orientated terminology).  The Sylvester provided Vector class models the notion of a vector in any number of dimensions (e.g. (1, 2, 3) would be a 3-dimensional vector).  As you can see from the API below, there is quite a few methods, all that operate around the elements array.  Class methods are those that are intended to be used without an instance of a class (i.e. an object), and instance methods are those that are intended to be used with an instance of an object (e.g. one created via new).

Class Methods:

* create
* i, j, k
* Random
* Zero

Instance Variables:

* elements

Instance Methods:

* add
* angleFrom
* cross
* dimensions
* distanceFrom
* dot
* dup
* e
* each
* eql
* indexOf
* inspect
* isAntiparallelTo
* isPerpendicularTo
* liesIn
* liesOn
* map
* max
* modulus
* multiply
* reflectionIn
* rotate
* round
* setElements
* snapTo
* subtract
* to3D
* toDiagonalMatrix
* toUnitVector
* x

For the first go aroud we are going to wait on implementing the following methods because of dependencies on other classes:

* liesIn [plane class]
* liesOn [plane class]
* toDiagonalMatrix [matrix class]
* reflectionIn [plane/line class]
* rotate [Matrix class]

Sylvester Vector API:

http://sylvester.jcoglan.com/api/vector.html