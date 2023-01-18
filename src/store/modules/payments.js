
import { LocalStorage, Loading, Dialog, Platform, date } from 'quasar'

import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

import { handleMpesaC2bPayment } from 'e2payments'

const state = {
    serverUrl: 'https://e2payments.explicador.co.mz',
    // Testes em produção
    credentials: {
        walletId: PUT_YOUR_OWN_WALLET_ID_HERE, //Carteira de testes gerais
    //    
        CLIENT_ID: 'YOUR_OWN_CLIENT_ID',
        CLIENT_SECRET: 'YOUR_OWN_CLIENT_SECRET'
    }
}

const mutations = {
}

const getters = {
}

const actions = {
    handlePayment  ({ state, dispatch }, payload) {
        console.log('handlePayment', payload)

        let paymentPayload = {
            ... state.credentials,
            amount:     payload.amount, // money to discount in costomer wallet
            phone:      payload.phone, // number phone of costomer. 9 digits
            reference:  payload.reference, // number phone of costomer. 9 digits
            fromApp: 'quasar-payments'
        }

        dispatch('handleOtherPayment', paymentPayload)
    },

    handleOtherPayment ({ dispatch }, paymentPayload) {
        console.log('handleOtherPayment', paymentPayload)

        Loading.show()

        return handleMpesaC2bPayment(paymentPayload).then(response => {

            Loading.hide()
            return response.status === 200 || response.status === 201

        }).catch(error => {
            Loading.hide()
            return false
        })
    }
}

export default {
    namespaced: true,
    mutations,
    actions,
    getters,
    state
}
