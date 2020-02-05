// const validator = require('validator')
const yargs = require('yargs')
const chalk = require('chalk')
const notes = require('./notes')
console.clear()

// const good = chalk.underline.magenta;
// const bad = chalk.underline.red;
// const other = chalk.bgYellow.black;
// console.log(good('Broski'))
// console.log(other('Brahstein'))
// console.log(bad('Errorstein'))

// customize yargs version
yargs.version('1.1.0')
    // setting up yargs to work with commands, add, read, list, delete
    // create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Contents of note',
            demandOption: true,
            type: 'string'

        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'removes a notes from list',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'read',
    describe: 'read a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'displays the list of notes',
    handler(argv) {
        notes.listNotes()
    }
})

yargs.parse()

//-----------------

const square = (x) => {
    return x * x
}