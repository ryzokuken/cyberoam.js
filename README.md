# cyberoam.js

A JavaScript library for accessing cyberoam

## Installation

```
$ npm install cyberoam --save
```

## Usage

```js
const cyberoam = require('cyberoam');

cyberoam.login(username, password)
  .then(() => { ... })
  .catch((errorMessage) => { ... });

cyberoam.logout(state.username)
  .then(() => { ... })
  .catch((errorMessage) => { ... });

// You don't really want to do anything if it's already live
cyberoam.checkLiveStatus(username)
  .catch(() => { ... });
```

## Setup (for contributors)

```
$ git clone https://github.com/ryzokuken/cyberoam.js.git
$ cd cyberoam.js
$ npm install
```

## License

GPL-3.0 © [Ujjwal Sharma](https://ryzokuken.github.io)
