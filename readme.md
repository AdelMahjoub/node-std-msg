# std-msg
----
## Install
`$ npm install --save std-msg `

## Usage

`const StdMsg = require('std-msg');`

### Instance with default options

`const msg  = new StdMsg();`

### Instance with custom options

`const msg = new StdMsg(options)`

where options is an object in this format :

```
// The values below are the default options
 options = {
  separators: {
    char: '-',
    length: 100,
    color: 'yellow',
    style: 'dim'
  },
  labels: {
    color: 'red',
    style: 'bold'
  },
  outputs: {
    spacing: 12,
    color: 'cyan',
    style: 'dim'
  }
};
```
**Colors properties are one of :** `['black'  , 'red'  , 'green'  , 'yellow'  , 'blue'     , 'magenta'  , 'cyan'  , 'white'        , 'gray', 'grey']`

**Styles properties are one of**: `['reset'  , 'bold' , 'dim'    , 'italic'  , 'underline', 'inverse'  , 'hidden', 'strikethrough'                ];`

#### Example :
```
const StdMsg = require('std-msg');

const fs = require('fs');
const path = require('path');

const options = {
  labels:{ color: 'magenta' },
  separators: { color: 'cyan' },
  outputs: {color: 'green'}
};

// errMsg is instanciated with default options
const errMsg = new StdMsg();

// infoMsg is instanciated with the options object above
const infoMsg = new StdMsg(options);

// let's check if this file exists
fs.stat(path.join(__dirname, 'test'), (err, stats) => {
  if(err) {
    throw new Error(errMsg.render(err));
  }
  console.log(infoMsg.render(stats));
});
}

/*
 Console output if the file do not exists
*/
Error:
----------------------------------------------------------------------------------------------------
ENOENT: no such file or directory, stat '/home/user/desktop/experiments/std-msg/test'
----------------------------------------------------------------------------------------------------
ERRNO       -2
----------------------------------------------------------------------------------------------------
CODE        ENOENT
----------------------------------------------------------------------------------------------------
SYSCALL     stat
----------------------------------------------------------------------------------------------------
PATH        /home/user/desktop/experiments/std-msg/test
----------------------------------------------------------------------------------------------------

/*
 Console output if the file exits
*/
----------------------------------------------------------------------------------------------------
DEV         2058
----------------------------------------------------------------------------------------------------
MODE        33188
----------------------------------------------------------------------------------------------------
NLINK       1
----------------------------------------------------------------------------------------------------
UID         1000
----------------------------------------------------------------------------------------------------
GID         1000
----------------------------------------------------------------------------------------------------
RDEV        0
----------------------------------------------------------------------------------------------------
BLKSIZE     4096
----------------------------------------------------------------------------------------------------
INO         5123892
----------------------------------------------------------------------------------------------------
SIZE        0
----------------------------------------------------------------------------------------------------
BLOCKS      0
----------------------------------------------------------------------------------------------------
ATIME       2017-09-08T14:57:38.325Z
----------------------------------------------------------------------------------------------------
MTIME       2017-09-08T14:55:24.865Z
----------------------------------------------------------------------------------------------------
CTIME       2017-09-08T14:55:24.865Z
----------------------------------------------------------------------------------------------------
BIRTHTIME   2017-09-08T14:55:24.865Z
----------------------------------------------------------------------------------------------------
_CHECKMODEPROPERTY      { [Function]
  [length]: 1,
  [name]: '',
  [prototype]: { [constructor]: [Circular] } }
----------------------------------------------------------------------------------------------------
ISDIRECTORY { [Function]
  [length]: 0,
  [name]: '',
  [prototype]: { [constructor]: [Circular] } }
----------------------------------------------------------------------------------------------------
ISFILE      { [Function]
  [length]: 0,
  [name]: '',
  [prototype]: { [constructor]: [Circular] } }
----------------------------------------------------------------------------------------------------
ISBLOCKDEVICE { [Function]
  [length]: 0,
  [name]: '',
  [prototype]: { [constructor]: [Circular] } }
----------------------------------------------------------------------------------------------------
ISCHARACTERDEVICE     { [Function]
  [length]: 0,
  [name]: '',
  [prototype]: { [constructor]: [Circular] } }
----------------------------------------------------------------------------------------------------
ISSYMBOLICLINK  { [Function]
  [length]: 0,
  [name]: '',
  [prototype]: { [constructor]: [Circular] } }
----------------------------------------------------------------------------------------------------
ISFIFO      { [Function]
  [length]: 0,
  [name]: '',
  [prototype]: { [constructor]: [Circular] } }
----------------------------------------------------------------------------------------------------
ISSOCKET    { [Function]
  [length]: 0,
  [name]: '',
  [prototype]: { [constructor]: [Circular] } }
----------------------------------------------------------------------------------------------------
```