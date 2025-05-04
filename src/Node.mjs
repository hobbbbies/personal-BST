export default class Node {
  constructor(value = null, left = null, right = null) {
    this._value = value;
    this._left = left;
    this._right = right;
  }
  
  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
  }

  get next() {
    return this._next;
  }

  get left() {
    return this._left;
  }

  set left(val) {
    this._left = val;
  }

  get right() {
    return this._right;
  }

  set right(val) {
    this._right = val;
  } 
}
