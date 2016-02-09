// See mit-license.txt for license info

import { Model } from 'falcor';
import extract from './extract';

const noop = () => {};

class SyncModel extends Model {

  getValueSync(path) {
    this.getValue(path).then(noop);
    return extract(this, path);
  }

  _clone(opts) {
    var clone = new SyncModel(this);
    for (var key in opts) {
      var value = opts[key];
      if (value === 'delete') {
        delete clone[key];
      } else {
        clone[key] = value;
      }
    }
    clone.setCache = void 0;
    return clone;
  }
}

module.exports = SyncModel;
