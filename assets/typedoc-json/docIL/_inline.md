# ## isNum  
* **Description:** Returns true if the value is a number, false otherwise.  
* **Parameters:**  
  * *v:* 
  
  
# ## isInt  
* **Description:** Returns true if the value is a integer, false otherwise.  
* **Parameters:**  
  * *v:* 
  
  
# ## isFlt  
* **Description:** Returns true if the value is a floating point number, false otherwise.  
* **Parameters:**  
  * *v:* 
  
  
# ## isBool  
* **Description:** Returns true if the value is a boolean, false otherwise.  
* **Parameters:**  
  * *v:* 
  
  
# ## isStr  
* **Description:** Returns true if the value is a string, false otherwise.  
* **Parameters:**  
  * *v:* 
  
  
# ## isList  
* **Description:** Returns true if the value is a list, false otherwise.  
* **Parameters:**  
  * *v:* 
  
  
# ## isDict  
* **Description:** Returns true if the value is a dictionary, false otherwise.  
* **Parameters:**  
  * *v:* 
  
  
# ## isVec2  
* **Description:** Returns true if the value is a list of two numbers, false otherwise.  
* **Parameters:**  
  * *v:* 
  
  
# ## isVec3  
* **Description:** Returns true if the value is a list of three numbers, false otherwise.  
* **Parameters:**  
  * *v:* 
  
  
# ## isCol  
* **Description:** Returns true if the value is a list of three numbers in the range [0, 1], false otherwise.  
* **Parameters:**  
  * *v:* 
  
  
# ## isRay  
* **Description:** Returns true if the value is a ray, false otherwise.  
* **Parameters:**  
  * *v:* 
  
  
# ## isPln  
* **Description:** Returns true if the value is a plane, false otherwise.  
* **Parameters:**  
  * *v:* 
  
  
# ## isNaN  
* **Description:** Returns true is the value is not a number (NaN), false otherwise.  
* **Parameters:**  
  * *v:* 
  
  
# ## isNull  
* **Description:** Returns true is the value is null, false otherwise.  
* **Parameters:**  
  * *v:* 
  
  
# ## isUndef  
* **Description:** Returns true is the value is undefined, false otherwise.  
* **Parameters:**  
  * *v:* 
  
  
# ## strRepl  
* **Description:** Replace all instances of specified search string with a new string. The search string can be a regular expression.  
* **Parameters:**  
  * *str:*   
  * *search_str:*   
  * *new_str:* 
  
  
# ## strUpp  
* **Description:** Converts all the alphabetic characters in a string to uppercase.  
* **Parameters:**  
  * *str:* 
  
  
# ## strLow  
* **Description:** Converts all the alphabetic characters in a string to lowercase.  
* **Parameters:**  
  * *str:* 
  
  
# ## strTrim  
* **Description:** Removes the leading and trailing white space and line terminator characters from a string.  
* **Parameters:**  
  * *str:* 
  
  
# ## strTrimR  
* **Description:** Removes whitespace from the right end of a string.  
* **Parameters:**  
  * *str:* 
  
  
# ## strTrimL  
* **Description:** Removes whitespace from the left end of a string.  
* **Parameters:**  
  * *str:* 
  
  
# ## strSub  
* **Description:** Gets a substring beginning at the specified location.
Gets a substring beginning at the specified location and having the specified length.  
* **Parameters:**  
  * *str:*   
  * *from:*   
  * *length:* 
  
  
# ## strStarts  
* **Description:** Returns true if the string s1 starts with s2, false otherwise.  
* **Parameters:**  
  * *str:*   
  * *starts:* 
  
  
# ## strEnds  
* **Description:** Returns true if the string s1 ends with s2, false otherwise.  
* **Parameters:**  
  * *str:*   
  * *ends:* 
  
  
# ## strPadL  
* **Description:** Pads the start of the s1 string with white spaces so that the resulting string reaches a given length.
Pads the start of the s1 string with the s2 string so that the resulting string reaches a given length.  
* **Parameters:**  
  * *str:*   
  * *max:*   
  * *fill:* 
  
  
# ## strPadR  
* **Description:** Pads the end of the s1 string with white spaces so that the resulting string reaches a given length.
Pads the end of the s1 string with the s2 string so that the resulting string reaches a given length.  
* **Parameters:**  
  * *str:*   
  * *max:*   
  * *fill:* 
  
  
# ## isApprox  
* **Description:** Returns true if the absolute difference between the two numbers is less than the tolerance, t  
* **Parameters:**  
  * *n1:*   
  * *n2:*   
  * *t:* 
  
  
# ## isIn  
* **Description:** Returns v1 < v2 < v3.  
* **Parameters:**  
  * *v1:*   
  * *v2:*   
  * *v3:* 
  
  
# ## isWithin  
* **Description:** Returns v1 <= v2 <= v3.  
* **Parameters:**  
  * *v1:*   
  * *v2:*   
  * *v3:* 
  
  
# ## min  
* **Description:** Returns the smallest of the given numbers.  
* **Parameters:**  
  * *list:* A list of numbers, or a sequence of numbers
  
  
# ## max  
* **Description:** Returns the largest  of the given numbers.  
* **Parameters:**  
  * *list:* A list of numbers, or a sequence of numbers.
  
  
# ## pow  
* **Description:** Returns a number representing the given base taken to the power of the given exponent.  
* **Parameters:**  
  * *base:* A number or list of numbers.  
  * *exp:* The exponent used to raise the base.
  
  
# ## sqrt  
* **Description:** Returns the square root of the given number. If the number is negative, NaN is returned.  
* **Parameters:**  
  * *num:* A number or list of numbers.
  
  
# ## exp  
* **Description:** Returns a number representing e raised to the power of x, where e is Euler's number and x is the argument.  
* **Parameters:**  
  * *num:* A number or list of numbers.
  
  
# ## log  
* **Description:** Returns the natural logarithm (base e) of the given number. If the number is negative, NaN is returned.  
* **Parameters:**  
  * *base:* A number or list of numbers.
  
  
# ## round  
* **Description:** The value of the given number rounded to the nearest integer.  
* **Parameters:**  
  * *num:* A number or list of numbers.  
  * *dec_pla:* The number of decimal places.
  
  
# ## sigFig  
* **Description:** Returns the value of the given number converted to the specified number of significant figures.  
* **Parameters:**  
  * *num:* A number or list of numbers.  
  * *sig_figs:* The number of significant figures.
  
  
# ## ceil  
* **Description:** Returns the smallest integer greater than or equal to the given number.  
* **Parameters:**  
  * *num:* A number or list of numbers.
  
  
# ## floor  
* **Description:** Returns the largest integer less than or equal to the specified number.  
* **Parameters:**  
  * *num:* A number or list of numbers.
  
  
# ## abs  
* **Description:** Returns the absolute value of the given number.  
* **Parameters:**  
  * *num:* A number or list of numbers.
  
  
# ## sin  
* **Description:** Returns the sine of the given number.  
* **Parameters:**  
  * *num:* A number or list of numbers (in radians).
  
  
# ## asin  
* **Description:** Returns the arcsine (in radians) of the given number if it's between -1 and 1; otherwise, NaN.  
* **Parameters:**  
  * *num:* A number or list of numbers between -1 and 1.
  
  
# ## sinh  
* **Description:** Returns the hyperbolic sine (in radians) of the given number.  
* **Parameters:**  
  * *num:* A number or list of numbers (in radians).
  
  
# ## asinh  
* **Description:** Returns the hyperbolic arcsine of the given number.  
* **Parameters:**  
  * *num:* A number or list of numbers.
  
  
# ## cos  
* **Description:** Returns the cosine of the given number.  
* **Parameters:**  
  * *num:* A number or list of numbers (in radians).
  
  
# ## acos  
* **Description:** Returns the arc-cosine (in radians) of the given number between -1 and 1; otherwise, NaN.  
* **Parameters:**  
  * *num:* A number or list of numbers between -1 and 1.
  
  
# ## cosh  
* **Description:** Returns the hyperbolic sine (in radians) of the given number.  
* **Parameters:**  
  * *num:* A number or list of numbers (in radians).
  
  
# ## acosh  
* **Description:** Returns the hyperbolic arc-cosine of the given number. If the number is less than 1, NaN.  
* **Parameters:**  
  * *num:* A number or list of numbers.
  
  
# ## tan  
* **Description:** Returns the tangent of the given number.  
* **Parameters:**  
  * *num:* A number or list of numbers (in radians).
  
  
# ## atan  
* **Description:** Returns the arc-tangent (in radians) of the given number.  
* **Parameters:**  
  * *num:* A number or list of numbers between -1 and 1.
  
  
# ## tanh  
* **Description:** Returns the hyperbolic tangent of the given number.  
* **Parameters:**  
  * *num:* A number or list of numbers (in radians).
  
  
# ## atanh  
* **Description:** Returns the hyperbolic arc-tangent of the given number.  
* **Parameters:**  
  * *num:* A number or list of numbers.
  
  
# ## atan2  
* **Description:** Returns the angle in radians (in [-π,π]) between the positive x-axis and the ray from (0,0) to the point  
* **Parameters:**  
  * *xy:*   
  
# ## boolean  
* **Description:** To be completed...  
* **Parameters:**  
  * *val:* 
  
  
# ## number  
* **Description:** To be completed...  
* **Parameters:**  
  * *val:* 
  
  
# ## string  
* **Description:** To be completed...  
* **Parameters:**  
  * *val:* 
  
  
# ## mad  
* **Description:** Returns the median absolute deviation of the list  
* **Parameters:**  
  * *list:* 
  
  
# ## mean  
* **Description:** Returns the mean value of the list  
* **Parameters:**  
  * *list:* 
  
  
# ## median  
* **Description:** Returns the median of the list  
* **Parameters:**  
  * *list:* 
  
  
# ## mode  
* **Description:** Returns the mode of the list  
* **Parameters:**  
  * *list:* 
  
  
# ## prod  
* **Description:** Returns the product of all values in a list  
* **Parameters:**  
  * *list:* 
  
  
# ## std  
* **Description:** Returns the standard deviation of the list  
* **Parameters:**  
  * *list:* 
  
  
# ## sum  
* **Description:** Returns the sum of all values in a list  
* **Parameters:**  
  * *list:* 
  
  
# ## hypot  
* **Description:** Returns the hypotenuse of all values in a list  
* **Parameters:**  
  * *list:* 
  
  
# ## norm  
* **Description:** Returns the norm of a list  
* **Parameters:**  
  * *list:* 
  
  
# ## square  
* **Description:** Returns the square of the number  
* **Parameters:**  
  * *list:* 
  
  
# ## cube  
* **Description:** Returns the cube of the number  
* **Parameters:**  
  * *list:* 
  
  
# ## remap  
* **Description:** Maps a number from the d1 domain to the d2 domain.  
* **Parameters:**  
  * *num:*   
  * *d1:*   
  * *d2:* 
  
  
# ## distance  
* **Description:** Returns the Euclidean distance between two xyzs, c1 and c2'
Returns the Euclidean distance between an xyz c and an infinite ray r'
Returns the Euclidean distance between an xyz c and an infinite plane p'  
* **Parameters:**  
  * *c1:*   
  * *c2:* 
  
  
# ## distanceM  
* **Description:** Returns the Manhattan distance between two xyzs, c1 and c2
Returns the Manhattan distance between an xyz c and an infinite ray r'
Returns the Manhattan distance between an xyz c and an infinite plane p'  
* **Parameters:**  
  * *c1:*   
  * *c2:* 
  
  
# ## distanceMS  
* **Description:** Returns the Manhattan squared distance between two xyzs, c1 and c2
Returns the Manhattan squared distance between an xyz c and an infinite ray r'
Returns the Manhattan squared distance between an xyz c and an infinite plane p'  
* **Parameters:**  
  * *c1:*   
  * *c2:* 
  
  
# ## intersect  
* **Description:** Returns the intersection xyz between two rays, where...
['intersect(r1, r2)', 'Returns the intersection xyz between two infinite rays'],
['intersect(r1, r2, m)', 'Returns the intersection xyz between two rays, where ' +
'if m=2, rays are infinite in both directions, ' +
'if m=1 rays are infinite in one direction, ' +
'and if m=0, rays are not infinite.'],
['intersect(r, p)', 'Returns the intersection xyz between an infinite ray r and an infinite plane p'],
['intersect(r, p, m)', 'Returns the intersection xyz between a ray r and an infinite plane p, where ' +
'if m=2, the ray is infinite in both directions, ' +
'if m=1 the ray is infinite in one direction, ' +
'and if m=0, the ray is not infinite.'],  
* **Parameters:**  
  * *r1:*   
  * *r2:*   
  * *met:* 
  
  
# ## project  
* **Description:** Returns the xyz from projecting an xyz c onto an infinite ray r...
['project(c, r)', 'Returns the xyz from projecting an xyz c onto an infinite ray r'],
['project(c, r, m)', 'Returns the xyz from projecting an xyz c onto an infinite ray r, where ' +
'if m=2, the ray is infinite in both directions, ' +
'if m=1 the ray is infinite in one direction, ' +
'and if m=0, the ray is not infinite.'],
['project(c, p)', 'Returns the xyz from projecting an xyz c onto an infinite plane p']  
* **Parameters:**  
  * *c:*   
  * *r:*   
  * *met:* 
  
  
# ## range  
* **Description:** Generates a list of integers, from start to end, with a step size of 1
Generates a list of integers, from start to end, with a specified step size  
* **Parameters:**  
  * *start:*   
  * *end:*   
  * *step:* 
  
  
# ## isList  
* **Description:** undefined  
* **Parameters:**  
  * *list:* 
  
  
# ## len  
* **Description:** Returns the number of items in the list  
* **Parameters:**  
  * *list:* 
  
  
# ## listLen  
* **Description:** Returns the number of items in the list  
* **Parameters:**  
  * *list:* 
  
  
# ## listCount  
* **Description:** Returns the number of times the value is in the list  
* **Parameters:**  
  * *list:*   
  * *val:* 
  
  
# ## listCopy  
* **Description:** Returns a copy of the list  
* **Parameters:**  
  * *list:* 
  
  
# ## listRep  
* **Description:** Returns a new list that repeats the contents of the input list n times.  
* **Parameters:**  
  * *list:*   
  * *n:* 
  
  
# ## listLast  
* **Description:** Returns the last item in a list  
* **Parameters:**  
  * *list:* 
  
  
# ## listGet  
* **Description:** Returns the item in the list specified by index, either a positive or negative integer  
* **Parameters:**  
  * *list:*   
  * *index:* 
  
  
# ## listFind  
* **Description:** Returns the index of the first occurence of the value in the list, or -1 if not found  
* **Parameters:**  
  * *list:*   
  * *val:* 
  
  
# ## listHas  
* **Description:** Returns true if the list contains the value, false otherwise  
* **Parameters:**  
  * *list:*   
  * *val:* 
  
  
# ## listJoin  
* **Description:** Joins two lists into a single list  
* **Parameters:**  
  * *list1:*   
  * *list2:* 
  
  
# ## listFlat  
* **Description:** Returns a copy of the nested list, flattened to a depth of 1
Returns a copy of the nested list, reduced to the specified depth  
* **Parameters:**  
  * *list:*   
  * *depth:* 
  
  
# ## listSlice  
* **Description:** Return a sub-list from the list  
* **Parameters:**  
  * *list:*   
  * *start:*   
  * *end:* 
  
  
# ## listCull  
* **Description:** Returns a new list of all the values that evaluate to true.
Returns a new list of all the values in list1 that evaluate to true in list2.  
* **Parameters:**  
  * *list:*   
  * *list2:* 
  
  
# ## listZip  
* **Description:** Converts a set of lists from rows into columns, based on the shortest list  
* **Parameters:**  
  * *lists:* 
  
  
# ## listZip2  
* **Description:** Converts a set of lists from rows into columns, based on the longest list  
* **Parameters:**  
  * *lists:* 
  
  
# ## setMake  
* **Description:** Generates a list of unique items.  
* **Parameters:**  
  * *list:* 
  
  
# ## setUni  
* **Description:** Generates a list of unique items from the union of the two input lists.  
* **Parameters:**  
  * *list1:*   
  * *list2:* 
  
  
# ## setInt  
* **Description:** Generates a list of unique items from the intersection of the two input lists.  
* **Parameters:**  
  * *list1:*   
  * *list2:* 
  
  
# ## setDif  
* **Description:** Generates a list of unique items from the difference of the two input lists.  
* **Parameters:**  
  * *list1:*   
  * *list2:* 
  
  
# ## vecAdd  
* **Description:** Adds two vectors  
* **Parameters:**  
  * *v1:*   
  * *v2:*   
  * *norm:* 
  
  
# ## vecSub  
* **Description:** Subtracts v2 from v1  
* **Parameters:**  
  * *v1:*   
  * *v2:*   
  * *norm:* 
  
  
# ## vecDiv  
* **Description:** Divides a vector by a numbe  
* **Parameters:**  
  * *v:*   
  * *num:* 
  
  
# ## vecMult  
* **Description:** Multiplies a vector by a number  
* **Parameters:**  
  * *v:*   
  * *num:* 
  
  
# ## vecSum  
* **Description:** Add multiple vectors  
* **Parameters:**  
  * *v:* 
  
  
# ## vecLen  
* **Description:** Calculates the magnitude of a vector  
* **Parameters:**  
  * *v:* 
  
  
# ## vecSetLen  
* **Description:** Sets the magnitude of a vector  
* **Parameters:**  
  * *v:*   
  * *num:* 
  
  
# ## vecNorm  
* **Description:** Sets the magnitude of a vector to 1  
* **Parameters:**  
  * *v:* 
  
  
# ## vecRev  
* **Description:** Reverses the direction of a vector  
* **Parameters:**  
  * *v:* 
  
  
# ## vecFromTo  
* **Description:** Creates a vector between two points  
* **Parameters:**  
  * *v1:*   
  * *v2:* 
  
  
# ## vecAng  
* **Description:** Calculate the angle (0 to PI) between two vectors  
* **Parameters:**  
  * *v1:*   
  * *v2:* 
  
  
# ## vecAng2  
* **Description:** Calculate the angle (0 to 2PI) between two vectors, relative to the plane normal  
* **Parameters:**  
  * *v1:*   
  * *v2:*   
  * *v3:* 
  
  
# ## vecDot  
* **Description:** Calculates the dot product of two vectors  
* **Parameters:**  
  * *v1:*   
  * *v2:* 
  
  
# ## vecCross  
* **Description:** Calculates the cross product of two vectors  
* **Parameters:**  
  * *v1:*   
  * *v2:* 
  
  
# ## vecEqual  
* **Description:** Returns true if the difference between two vectors is smaller than a specified tolerance  
* **Parameters:**  
  * *v1:*   
  * *v2:*   
  * *tol:* 
  
  
# ## vecLtoG  
* **Description:** Transforms a vector from a local coordinate system define by plane "p" to the global coordinate system.  
* **Parameters:**  
  * *v:*   
  * *p:* 
  
  
# ## vecGtoL  
* **Description:** Transforms a vector from the global coordinate system to a local coordinate system define by plane "p".  
* **Parameters:**  
  * *v:*   
  * *p:* 
  
  
# ## plnMake  
* **Description:** Creates a plane from an origin "o", an "x" axis vector, and any other vector in the "xy" plane.  
* **Parameters:**  
  * *origin:*   
  * *x_vec:*   
  * *xy_vec:* 
  
  
# ## plnCopy  
* **Description:** Make a copy of the plane "p"  
* **Parameters:**  
  * *pln:* 
  
  
# ## plnMove  
* **Description:** Move the plane "p" relative to the global X, Y, and Z axes, by vector "v".  
* **Parameters:**  
  * *pln:*   
  * *vec:* 
  
  
# ## plnRot  
* **Description:** Rotate the plane "p" around the ray "r", by angle "a" (in radians).  
* **Parameters:**  
  * *pln:*   
  * *ray:*   
  * *ang:* 
  
  
# ## plnLMove  
* **Description:** Move the plane "p" relative to the local X, Y, and Z axes, by vector "v".  
* **Parameters:**  
  * *pln:*   
  * *vec:* 
  
  
# ## plnLRotX  
* **Description:** Rotate the plane "p" around the local X axis, by angle "a" (in radians).  
* **Parameters:**  
  * *pln:*   
  * *ang:* 
  
  
# ## plnLRotY  
* **Description:** Rotate the plane "p" around the local Y axis, by angle "a" (in radians).  
* **Parameters:**  
  * *pln:*   
  * *ang:* 
  
  
# ## plnLRotZ  
* **Description:** Rotate the plane "p" around the local Z axis, by angle "a" (in radians).  
* **Parameters:**  
  * *pln:*   
  * *ang:* 
  
  
# ## rayMake  
* **Description:** Creates a ray from an origin "o" and a direction vector "d".
Creates a ray from an origin "o", a direction vector "d", and length "l".  
* **Parameters:**  
  * *origin:*   
  * *dir:*   
  * *len:* 
  
  
# ## rayCopy  
* **Description:** Make a copy of the ray "r"  
* **Parameters:**  
  * *ray:* 
  
  
# ## rayMove  
* **Description:** Move the ray "r" relative to the global X, Y, and Z axes, by vector "v".  
* **Parameters:**  
  * *ray:*   
  * *vec:* 
  
  
# ## rayRot  
* **Description:** Rotate the ray "r1" around the ray "r2", by angle "a" (in radians).  
* **Parameters:**  
  * *ray1:*   
  * *ray2:*   
  * *ang:* 
  
  
# ## rayLMove  
* **Description:** Move the ray "r" relative to the ray direction vector, by distance "d".  
* **Parameters:**  
  * *ray:*   
  * *dist:* 
  
  
# ## rayFromPln  
* **Description:** Create a ray from a plane "p", with the same origin and with a direction along the plane z axis.  
* **Parameters:**  
  * *pln:* 
  
  
# ## rayLtoG  
* **Description:** Transforms a ray from a local coordinate system define by plane "p" to the global coordinate system.  
* **Parameters:**  
  * *r:*   
  * *p:* 
  
  
# ## rayGtoL  
* **Description:** Transforms a ray from the global coordinate system to a local coordinate system define by plane "p".  
* **Parameters:**  
  * *r:*   
  * *p:* 
  
  
# ## colFalse  
* **Description:** Creates a colour from a value in the range between min and max.  
* **Parameters:**  
  * *vals:*   
  * *min:*   
  * *max:* 
  
  
# ## colScale  
* **Description:** Creates a colour from a value in the range between min and max, given a Brewer color scale.  
* **Parameters:**  
  * *vals:*   
  * *min:*   
  * *max:*   
  * *scale:* 
  
  
# ## radToDeg  
* **Description:** Converts radians to degrees.  
* **Parameters:**  
  * *rad:* 
  
  
# ## degToRad  
* **Description:** Converts degrees to radians.  
* **Parameters:**  
  * *deg:* 
  
  
# ## numToStr  
* **Description:** Converts the number to a string, with commas, e.g. 1,234,567
Converts the number to a string, with commas, where "d" specifies the number of fraction digits, e.g. 1,234.00.
Converts the number to a string, where "d" specifies the number of fraction digits, and "l" specifies the locale, e.g. "en-GB", "fi-FI", "in-IN", "pt-BR", etc'  
* **Parameters:**  
  * *num:*   
  * *frac_digits:*   
  * *locale:* 
  
  
# ## rand  
* **Description:** Returns a random number in the specified range
Returns a random number in the specified range, given a numeric seed  
* **Parameters:**  
  * *min:*   
  * *max:*   
  * *seed:* 
  
  
# ## randInt  
* **Description:** Returns a random integer in the specified range
Returns a random integer in the specified range, given a numeric seed  
* **Parameters:**  
  * *min:*   
  * *max:*   
  * *seed:* 
  
  
# ## randPick  
* **Description:** Returns a random set of items from the list
Returns a random set of items from the list, given a numeric seed  
* **Parameters:**  
  * *list:*   
  * *num:*   
  * *seed:* 
  
  
