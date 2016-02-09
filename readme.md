# Falcor Sync Model

Falcor is great, but by default it forces you to choose between two alternatives:

**A unified model** - Falcor `Model#get()` and `Model#getValue()` return promises, regardless of whether a value is cached. Thus, the location of data is abstracted away. All code that reads a Falcor model can be written in the same way. Data can live on the cloud, or directly on the client, or can be moved from the client to the cloud, without changing any client-side code. Hence the catchphrase *one model everywhere*.

**Synchronous rendering** - As of early 2016, current versions of Angular and React only render synchronously, having no built-in way to render promises. Users of those frameworks are forced to keep a data store that duplicates the contents of the cache; rendering synchronously from that instead. Meanwhile, code must be written to keep the store in sync with the cache and vice versa. This completely negates the benefits of having a unified model.

## What about asynchronous rendering?

Could rendering be somehow made asynchronous, at least in future versions of popular frameworks? It's possible in principle, but delaying rendering pending async operations could arguably hurt the user experience since the fact that something is loading is, itself, a piece of information we want to render to the user. Asynchronous rendering should address this issue in order to be successful.

## API

**falcor-sync-model** extends `Falcor.Model`, adding a single `getValueSync()` method. It has the same arguments as `Falcor.Model#getValue()` except returns a value synchronously instead of returning a promise. If the value isn't found in the cache at that instant, it's requested from the model's data source (if provided) as a side effect. If/when that resolves, the cache is updated and the model's `onChange` event handler will be called (if provided). Typically, that will in turn trigger a re-render of your app which will render the newest contents of the cache.

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
