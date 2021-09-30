const cors = require('cors')
const express = require('express')
const app = express()
app.use(express.json(), cors( {origin: '*'} ))
const port = 8080
const { Client } = require('pg')
const client = new Client({host: 'localhost', port: 5001, database: 'participants', user: 'root', password: 'changeme' })

async function main () {
    await client.connect()
    app.post('/newParticipant/', newParticipant )
    app.get('/winners', generateWinnersData  )
    app.get('/find', findParticipantIdByEmail )
    app.listen(port, () => console.log(`Contest server running on port ${port}!`))
}

async function newParticipant(req, res) {
    try {
        const createdUserId = await insertNewParticipant( req.body )
        const refId = req.query.refId
        if ( refId !== undefined ) {
            await addPointToParticipant( refId )
        }
        res.status(201).json(createdUserId).send()
        return
    } catch ( err ) {
        console.log( err )
        res.status(500).send()
        return
    }
    
}

async function generateWinnersData (req, res) {
    try {
        const response = await client.query(
            'SELECT * FROM participants ORDER BY points DESC LIMIT 10'
        )
        res.status(200).json(response.rows).send()
    } catch ( err ) {
        console.log( err )
        res.status(500).send()
        return
    }
}

async function findParticipantIdByEmail (req, res) {
    try {
        const participantEmail = req.query.email
        const response = await client.query(
            'SELECT participants_id FROM participants WHERE email = $1',
            [participantEmail]
        )
        res.status(200).json(response.rows[0].participants_id).send()
    } catch ( err ) {
        console.log( err )
        res.status(500).send()
        return
    }
}

async function addPointToParticipant ( participantId ) {
    await client.query(
        'UPDATE participants SET points = points + 1 WHERE participants_id = $1',
        [participantId]
    )
}

async function insertNewParticipant( participantData ) {
    let values = [participantData.name, participantData.email, participantData.phoneNumber]
    const queryResult = await client.query( 
        'INSERT INTO participants(participants_name, email, phone_number, points) VALUES ($1, $2, $3, 1) RETURNING participants_id', 
        values
    )
    return queryResult.rows[0].participants_id
}

main()