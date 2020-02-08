const fs = require('fs')
const chalk = require('chalk')


const newNote = chalk.rgb(34, 171, 220)
const errorCol = chalk.rgb(255, 0, 0)
const removed = chalk.rgb(58, 162, 84)
const info = chalk.rgb(255, 255, 240)
const titleCol = chalk.rgb(124, 216, 65)
const bodyCol = chalk.rgb(239, 64, 175)
const timeCol = chalk.rgb(250, 218, 94)


// capitalise function to capitalise body of all entries when returned in list
const bodycapitalized = (s) => {
    if (typeof s !== 'string') {
        return ''
    } else {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
}

const addNote = (title, body, time) => {
    const notes = loadNotes()

    const duplicateNote = notes.find((note) => {
            return note.title === title
        })
        // find() returns the first value of first element that satisfies provided testing function
    if (!duplicateNote) {

        notes.push({
            title: title,
            body: body,
            time: Date()
        })

        saveNotes(notes)
        console.log(newNote('new note added'))

    } else {
        console.log(errorCol('note title already exists'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notes2 = notes.filter((note) => {
        return note.title !== title
    })


    if (notes.length > notes2.length) {
        saveNotes(notes2)
        console.log(removed(`${title} has been removed...`))
    } else {
        console.log(errorCol('no note found'))

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

const clearNotes = () => {
    fs.writeFileSync('notes.json', [])
    console.log(info('The list has been cleared'))
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(info('Your Notes'))

    notes.forEach((note) => {
        console.log(titleCol(note.title.toUpperCase()))
        console.log(bodyCol(bodycapitalized(note.body)))

        console.log(timeCol(`added on ${note.time}`))
    })


}

const readNote = (title) => {
    const notes = loadNotes()
    const notetoRead = notes.find((Anote) => {
        return Anote.title === title
    })


    if (notetoRead) {
        console.log(titleCol(notetoRead.title.toUpperCase()))
        console.log(bodyCol(bodycapitalized(notetoRead.body)))
        console.log(timeCol(`added on ${note.time}`))

    } else {
        console.log(errorCol(' this note does not exist yet'))
    }
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
    clearNotes: clearNotes

}