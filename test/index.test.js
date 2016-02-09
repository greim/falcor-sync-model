// See mit-license.txt for license info

/* eslint-env mocha */

import SyncModel from '../src';
import assert from 'assert';
import { Model } from 'falcor';

describe('falcor-sync-model', () => {

  it('should inherit methods', () => {
    const model = new SyncModel();
    assert.strictEqual(typeof model.get, 'function');
    assert.strictEqual(typeof model.getValue, 'function');
    assert.strictEqual(typeof model.set, 'function');
    assert.strictEqual(typeof model.call, 'function');
  });

  it('should getValue', async function() {
    const cache = { a: 'b' };
    const model = new SyncModel({ cache });
    assert.strictEqual(await model.getValue('a'), 'b');
  });

  it('should getValueSync', async function() {
    const cache = { a: 'b' };
    const model = new SyncModel({ cache });
    assert.strictEqual(model.getValueSync('a'), 'b');
  });

  it('should getValueSync undefined', async function() {
    const cache = { a: 'b' };
    const model = new SyncModel({ cache });
    assert.strictEqual(model.getValueSync('c'), undefined);
  });

  it('should use a datasource', async function() {
    const cache = { a: 'b' };
    const source = new Model({ cache }).asDataSource();
    const model = new SyncModel({ source });
    await model.getValue('a');
    assert.strictEqual(model.getValueSync('a'), 'b');
  });

  it('should batch', async function() {
    const model = new SyncModel().batch();
    assert.strictEqual(typeof model.getValueSync, 'function');
  });

  it('should unbatch', async function() {
    const model = new SyncModel().unbatch();
    assert.strictEqual(typeof model.getValueSync, 'function');
  });

  it('should boxValues', async function() {
    const model = new SyncModel().boxValues();
    assert.strictEqual(typeof model.getValueSync, 'function');
  });

  it('should unboxValues', async function() {
    const model = new SyncModel().unboxValues();
    assert.strictEqual(typeof model.getValueSync, 'function');
  });

  it('should treatErrorsAsValues', async function() {
    const model = new SyncModel().treatErrorsAsValues();
    assert.strictEqual(typeof model.getValueSync, 'function');
  });

  it('should withoutDataSource', async function() {
    const model = new SyncModel().withoutDataSource();
    assert.strictEqual(typeof model.getValueSync, 'function');
  });

  it('should import both in CJS and ES6', () => {
    const cjsModule = require('../src');
    assert.strictEqual(SyncModel, cjsModule);
  });
});
