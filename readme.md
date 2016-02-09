# Falcor Sync Model

## The dilemma

**A unified data store** - Falcor `Model#get()` and `Model#getValue()` return promises, regardless of whether a value is cached. This allows all code that reads a Falcor model to be written in the same way, regardless of where the data lives.

**Synchronous rendering** - Unfortunately, current versions of Angular and React can't render promises. Using Falcor thus requires keeping a separate data store which duplicates the contents of the cache, and writing code to keep the two in sync.

## The solution

The goal of this lib is to allow a Falcor model to be used directly as a data store, by providing a way to read the model synchronously and still have it sync to its data source. As long as synchronous reads are only used for rendering, this won't interfere with Falcor's *unified model* ethic.

## API

**falcor-sync-model** extends `Falcor.Model` by adding a single `getValueSync()` method which takes the same arguments as `Falcor.Model#getValue()`. The value is returned synchronously, and causes the model to load data from its datasource as a side effect.

## Example

```js
var SyncModel = require('falcor-sync-model');
var HttpDataSource = require('falcor-http-datasource');

var App = React.createClass({

  getInitialState() {
    return {
      store: new SyncModel({
        onChange: () => this.forceUpdate(),
        source: new HttpDataSource('/model.json')
      })
    }
  },

  render() {
    return <div>
      Hello {this.store.getValueSync('self.name')}!
    </div>
  }
});
```

## Installation

```
npm install falcor-sync-model
```
