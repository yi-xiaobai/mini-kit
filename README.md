# mini-tool

the mini tool



## Installing

> $	npm install  mini-tool



## Examples

```js
var Mini = require('mini-tool/mini');
var Ding = require('mini-tool/ding')

// init ding
const ding = new Ding({
    SECRET:"xxx", // if you have
    DING_ROOT_URL:"https://oapi.dingtalk.com" // domain name
})

const mini = new Mini({
    KEY:"xxx",		// personal Alipay management platform 
    TOOLID:"xxx"	// personal Alipay management platform 
})

// the first step：minidev auth
mini.auth()

// the second step：minidev.preview or minidev upload
mini.preview("your appId","your project path","your need params")

mini.upload("your appId","your project path","your need params")

// the third step：ding custom message
ding.customSendMsg("your ding token",{
    'msgtype': 'markdown',	// message type
    'at': {},	// 
    'markdown': {},	// markdown grammar
})
```

