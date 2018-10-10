# @thinkful/zapdos

Content and program structure build tool for Thinkful

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@thinkful/zapdos.svg)](https://npmjs.org/package/@thinkful/zapdos)
[![Downloads/week](https://img.shields.io/npm/dw/@thinkful/zapdos.svg)](https://npmjs.org/package/@thinkful/zapdos)
[![License](https://img.shields.io/npm/l/@thinkful/zapdos.svg)](https://github.com/Thinkful/zapdos/blob/master/package.json)

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
  <!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g @thinkful/zapdos
$ zapdos COMMAND
running command...
$ zapdos (-v|--version|version)
@thinkful/zapdos/0.0.1 darwin-x64 node-v8.12.0
$ zapdos --help [COMMAND]
USAGE
  $ zapdos COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`zapdos uuids`](#zapdos-uuids)
- [`zapdos help [COMMAND]`](#zapdos-help-command)

## `zapdos uuids`

```
USAGE
  $ zapdos uuids

OPTIONS
  -l, --libraryDir=libraryDir    [default: library] Directory containing library
  -m, --modulesDir=modulesDir    [default: modules] Directory containing module files
  -p, --programsDir=programsDir  [default: programs] Directory containing program files
  -s, --strict                   Run in strict mode

DESCRIPTION
  Loads all the `content.md` files in the library directory and all `.yaml`
  files in the module and program directories and adds a new uuid to any file
  without one.
```

_See code: [src/commands/uuids.js](https://github.com/Thinkful/zapdos/blob/v0.0.1/src/commands/uuids.js)_

## `zapdos build:module`

Build a module

```
USAGE
  $ zapdos build:module --name [name]

OPTIONS
  -l, --libraryDir=libraryDir  [default: library] Directory containing library
  -m, --modulesDir=modulesDir  [default: modules] Directory containing module files
  -n, --name=name              (required) Name of module to build (eg [name] in /modules/[name].yaml)

DESCRIPTION
  Loads a module's \`.yaml\` file and adds checkpoint objects from the library.
```

_See code: [src/commands/build/module.js](https://github.com/Thinkful/zapdos/blob/v0.0.1/src/commands/build/module.js)_

## `zapdos build:modules`

Build all modules

```
USAGE
  $ zapdos build:modules

OPTIONS
  -l, --libraryDir=libraryDir  [default: library] Directory containing library
  -m, --modulesDir=modulesDir  [default: modules] Directory containing module files

DESCRIPTION
  Loads all module `.yaml` files and add checkpoint objects from the library
  to them.
```

_See code: [src/commands/build/modules.js](https://github.com/Thinkful/zapdos/blob/v0.0.1/src/commands/build/modules.js)_

## `zapdos build:program`

Build a program

```
USAGE
  $ zapdos build:program

OPTIONS
  -l, --libraryDir=libraryDir    [default: library] Directory containing library
  -m, --modulesDir=modulesDir    [default: modules] Directory containing module files

  -n, --name=name                (required) Name of program to build (eg [name] in
                                 /programs/[name].yaml)

  -p, --programsDir=programsDir  [default: programs] Directory containing program files

DESCRIPTION
  Loads a program's `.yaml` file and adds modules objects from the modules
  directory and checkpoint objects from the library.
```

_See code: [src/commands/build/program.js](https://github.com/Thinkful/zapdos/blob/v0.0.1/src/commands/build/program.js)_

## `zapdos build:programs`

Build all programs

```
USAGE
  $ zapdos build:programs

OPTIONS
  -l, --libraryDir=libraryDir    [default: library] Directory containing library
  -m, --modulesDir=modulesDir    [default: modules] Directory containing module files
  -p, --programsDir=programsDir  [default: programs] Directory containing program files

DESCRIPTION
  Loads each program `.yaml` file and adds modules objects from the modules
  directory and checkpoint objects from the library to them.
```

_See code: [src/commands/build/programs.js](https://github.com/Thinkful/zapdos/blob/v0.0.1/src/commands/build/programs.js)_

## `zapdos help [COMMAND]`

display help for zapdos

```
USAGE
  $ zapdos help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.2/src/commands/help.js)_

<!-- commandsstop -->
