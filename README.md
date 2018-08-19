# whereversim
WhereverSim API

## Installation

```
npm i -s @hugohammarstrom/whereversim
```

## Example

```js
import WhereverSim from "@hugohammarstrom/whereversim"

let API = new WhereverSim("whereversim_token")
API.authenticate()
  .then(console.log)
  .catch(console.error)

API.routes.endpoint.byId("endpoint_id")
  .then(endpoint => {
    //Do something with endpoint
  })
```

## Skip promise rejection

Promise rejection can be skipped with the global function ```skipRejection()```
```js
  skipRejection(API.authenticate())
  
  skipRejection(
    API.authenticate()
      .then(console.log)
  )
```


WhereverSim API
