import axios from 'axios';

const address = 'http://localhost:8080'

export default class ContestAPI {
    async addNewParticipant( name, email, phoneNumber ) {
        const response = await axios.post( `${address}/newParticipant`, {name, email, phoneNumber})
        return response
    }

    async addNewParticipantWithReferralLink ( name, email, phoneNumber, refId ) {
        const response = await axios.post( `${address}/newParticipant/`, {name, email, phoneNumber}, { params: {refId}})
        return response
    }

    async getWinnersList () {
        const response = await axios.get( `${address}/winners`)
        return response
    }

    async findParticipantByEmail ( email ) {
        const response = await axios.get( `${address}/find`, { params: {email} })
        return response
    }
}