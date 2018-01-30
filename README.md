# cyberoam.js

A JavaScript library for accessing cyberoam

## Installation

```
$ npm install cyberoam --save
```

## Usage

```js
const Cyberoam = require('cyberoam');

// For information about the object, see the "options" section below
const options = { ... };

const cyberoam = new Cyberoam(options);

cyberoam.login(username, password)
  .then(() => { ... })
  .catch((errorMessage) => { ... });

cyberoam.logout(username)
  .then(() => { ... })
  .catch((errorMessage) => { ... });

// You don't really want to do anything if it's already live
cyberoam.checkLiveStatus(username)
  .catch(() => { ... });
```

## Options

You may wish to provide any of the following options when creating an object of type Cyberoam. Any options skipped out will be replaced by their respective default values.

1. `loginURL`

  > The URL for the login/logout page at cyberoam.

  **Default Value**: `"http://172.16.68.6:8090/login.xml"`

2. `liveURL`

  > The URL for the live page at cyberoam.

  **Default Value**: `"http://172.16.68.6:8090/live"`

3. `loginMessage`

  > The message that is returned upon successful login.

  **Default Value**: `"You have successfully logged into JIIT Internet Server.`

4. `logoutMessage`

  > The message that is returned upon successful login.

  **Default Value**: `"You have successfully logged off from JIIT Internet Server."`

## Setup (for contributors)

```
$ git clone https://github.com/ryzokuken/cyberoam.js.git
$ cd cyberoam.js
$ npm install
```

## License

GPL-3.0 © [Ujjwal Sharma](https://ryzokuken.github.io)
