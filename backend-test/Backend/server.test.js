const server = require('./server')

test( 'creates new participant without referral', done => {
    const participantData = { name: 'Raf', email: 'email', phoneNumber: '9988552244' }
    const response = server.insertNewParticipant( participantData )
    expect( response.status() ).toBe(200)
})