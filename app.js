#!/usr/bin/env node

const yargs = require('yargs')
const chalk = require('chalk')
const notes = require('./notes')
console.clear()



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

        },
        time: {
            describe: 'The time of note added'
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

yargs.command({
    command: 'clearlist',
    describe: 'clears the lists so that it\'s empty',
    handler(argv) {
        notes.clearNotes()
    }
})

yargs.parse()

//-----------------