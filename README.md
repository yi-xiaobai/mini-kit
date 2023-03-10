# mini-kit

the mini kit

## Installation

```bash
$ npm install mini-kit
```

## Examples

```js
var Mini = require("mini-kit").mini;
var Ding = require("mini-kit").ding;

// init ding
const ding = new Ding({
  SECRET: "xxx", // if you have
  DING_ROOT_URL: "https://oapi.dingtalk.com", // domain name
});

// init mini
const mini = new Mini({
  KEY: "xxx", // personal Alipay management platform
  TOOLID: "xxx", // personal Alipay management platform
});

// the first step：minidev auth after you authorize it to preview or upload
await mini.auth();

// the second step：minidev.preview or minidev upload
await mini.preview("your appId", "your project path", "your need params");

await mini.upload("your appId", "your project path", "your need params");

// the third step：ding custom message
ding.customSendMsg("your ding token", {
  msgtype: "markdown", // message type
  at: {}, //
  markdown: {}, // markdown grammar
});
```

## Documentation

mini-kit basic method to use

### Utility methods

- [auth()](#auth)
- [preview()](#preview)
- [upload()](#upload)
- [remoteDebug()](#remoteDebug)
- [build()](#build)
- [customSendMsg()](#customSendMsg)



### auth()

> ```ts
> auth() => null
> ```

Initializes minidev's run authorization information.

```js
const Mini = require("mini-kit").mini;

const MiniOptions = {
  KEY: "xxx",
  TOOLID: "xxx",
};
const mini = new Mini(MiniOptions);

await mini.auth();
```

### preview()

> ```ts
> preview(appId: string, project: string, params?: Object) => Object
> ```

The mini program will be constructed and then pushed to the open platform of Alipay mini program to generate the mini program available for mobile Alipay APP, and the preview two-dimensional code will be displayed in the terminal.

```js
const Mini = require("mini-kit").mini;

const MiniOptions = {
  KEY: "xxx",
  TOOLID: "xxx",
};
const mini = new Mini(MiniOptions);

await mini.auth();

const { qrcodeUrl, version } = await mini.preview(
  "your appId",
  "your project path",
  null
);
```


### upload()

> ```ts
> upload(appId: string, project: string, params?: Object) => Object
> ```

The small program will be built on an open platform. Due to the control and stability requirements of the production environment, this build process may take more time than local development. Please wait.

```js
const Mini = require("mini-kit").mini;

const MiniOptions = {
  KEY: "xxx",
  TOOLID: "xxx",
};
const mini = new Mini(MiniOptions);

await mini.auth();

await mini.upload('your appId', 'your project path', null);
```


### remoteDebug()

> ```ts
> remoteDebug(appId: string, project: string, params?: Object) => Object
> ```

Build small program and initiate real machine debugging.

```js
const Mini = require("mini-kit").mini;

const MiniOptions = {
  KEY: "xxx",
  TOOLID: "xxx",
};
const mini = new Mini(MiniOptions);

await mini.auth();

await mini.remoteDebug('your appId', 'your project path', null);
```


### build()

> ```ts
> build(project: string, params?: Object) => Object
> ```

Small program source code build small program, generating small program runtime product package.

```js
const Mini = require("mini-kit").mini;

await Mini.build('your project path', null);
```


### customSendMsg()

> ```ts
> customSendMsg(access_token: string, params?: Object) => Object
> ```

Small program source code build small program, generating small program runtime product package.

```js
const Ding = require("mini-kit").ding;

const DingOptions = {
    "DING_ROOT_URL": "https://oapi.dingtalk.com",
    "SECRET": "xxx",
}
const ding = new Ding(DingOptions)

await ding.customSendMsg('your ding access_token', {
        'msgtype': 'markdown',
        'at': {},
        'markdown': {},
    });
```
