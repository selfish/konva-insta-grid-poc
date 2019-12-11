class Grider {

  constructor(canvas) {
    this._cols = 3;
    this._rows = 3;
    this._canvas = canvas;
  }

  get rows() {
    return this._rows
  }

  set rows(count) {
    this._rows = count;
  }

  get cols() {
    return this._cols;
  }

  set cols(count) {
    this._cols = count;
  }

  //get images
}

export default Grider
