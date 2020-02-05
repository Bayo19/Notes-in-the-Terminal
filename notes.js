const fs = require('fs')
const chalk = require('chalk')

let getNotes = (note) => {
    return 'Your notes ...'
}

const addNote = (title, body) => {
    const notes = loadNotes()
        // const duplicateNotes = notes.filter((note) => {
        //     return note.title === title
        // })
    const duplicateNote = notes.find((note) => {
            return note.title === title
        })
        // find() returns the first value of first element that satisfies provided testing function

    if (!duplicateNote) {

        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log(chalk.green('new note added'))

    } else {
        console.log(chalk.red('note title already exists'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notes2 = notes.filter((note) => {
        return note.title !== title
    })


    if (notes.length > notes2.length) {
        saveNotes(notes2)
        console.log(chalk.green(`${title} has been removed...`))
    } else {
        console.log(chalk.red('no note found'))

    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}


const loadNotes = () => {
    try {

        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch (e) {

        return []

    }

}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.yellow('Your Notes'))

    notes.forEach((note) => {
        console.log(chalk.blue(note.title.toUpperCase()))
        console.log(chalk.magenta(note.body))
    })


}

const readNote = (title) => {
    const notes = loadNotes()
    const notetoRead = notes.find((Anote) => {
        return Anote.title === title
    })

    const bodycapitalized = (s) => {
        if (typeof s !== 'string') {
            return ''
        } else {
            return s.charAt(0).toUpperCase() + s.slice(1)
        }
    }

    if (notetoRead) {
        console.log(chalk.yellow(notetoRead.title.toUpperCase()))
        console.log(bodycapitalized(notetoRead.body))
    } else {
        console.log(chalk.red(' this note does not exist yet'))
    }
}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote

}