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
- [getList()](#getList)
- [getUploadedVersion()](#getUploadedVersion)
- [deleteVersion()](#deleteVersion)
- [setExperience()](#setExperience)
- [cancelExperience()](#cancelExperience)
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

**Restrictions on use**：**Need to complete authorization**

```js
const Mini = require("mini-kit").mini;

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

**Restrictions on use**：**Need to complete authorization**

```js
const Mini = require("mini-kit").mini;

await mini.upload("your appId", "your project path", null);
```

### remoteDebug()

> ```ts
> remoteDebug(appId: string, project: string, params?: Object) => Object
> ```

Build small program and initiate real machine debugging.

**Restrictions on use**：**Need to complete authorization**

```js
const Mini = require("mini-kit").mini;

await mini.remoteDebug("your appId", "your project path", null);
```

### getList()

> ```ts
> getList(params?: Object) => Array<{}>
> ```

Gets a list of small programs.

**Restrictions on use**：**Need to complete authorization**

```js
const Mini = require("mini-kit").mini;

const List = await mini.getList({ clientType: "xxx" });
```

### getUploadedVersion()

> ```ts
> getUploadedVersion(appId: string, params?: Object) => Promise<string>;
> ```

Get the latest uploaded version of the applet.

**Restrictions on use**：**Need to complete authorization**

```js
const Mini = require("mini-kit").mini;

const versionString = await mini.getUploadedVersion("your appId", {
  clientType: "xxx",
});
```

### deleteVersion()

> ```ts
> deleteVersion(appId: string, version: string, params?: Object) ==> Promise<void>;
> ```

Delete specified version.

**Restrictions on use**：**Need to complete authorization**

```js
const Mini = require("mini-kit").mini;

await mini.deleteVersion("your appId", "0.0.0", { clientType: "xxx" });
```

### setExperience()

> ```ts
> setExperience(appId: string, version: string, params?: Object) => <{qrCodeUrl: string}>
> ```

Sets a version of an applet to the Experience version.

**Restrictions on use**：**Need to complete authorization**

```js
const Mini = require("mini-kit").mini;

const { qrCodeUrl } = await mini.setExperience("your appId", "0.0.0", {
  clientType: "xxx",
});
```

### cancelExperience()

> ```ts
> cancelExperience(appId: string, version: string, params?: Object) => Promise<void>
> ```

Cancel experience version.

**Restrictions on use**：**Need to complete authorization**

```js
const Mini = require("mini-kit").mini;

await mini.cancelExperience("your appId", "0.0.0", { clientType: "xxx" });
```

### build()

> ```ts
> build(project: string, params?: Object) => Object
> ```

Small program source code build small program, generating small program runtime product package.

```js
const Mini = require("mini-kit").mini;

await Mini.build("your project path", null);
```

### customSendMsg()

> ```ts
> customSendMsg(access_token: string, params?: Object) => void
> ```

Small program source code build small program, generating small program runtime product package.

```js
const Ding = require("mini-kit").ding;

const DingOptions = {
  DING_ROOT_URL: "https://oapi.dingtalk.com",
  SECRET: "xxx",
};
const ding = new Ding(DingOptions);

await ding.customSendMsg("your ding access_token", {
  msgtype: "markdown",
  at: {},
  markdown: {},
});
```
