// See mit-license.txt for license info

import { Model } from 'falcor';
import extract from './extract';

const noop = () => {};

class SyncModel extends Model {

  getValueSync(path) {
    this.getValue(path).then(noop);
    return extract(this, path);
  }
}

module.exports = SyncModel;
