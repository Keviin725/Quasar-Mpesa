
import { LocalStorage, Loading, Dialog, Platform, date } from 'quasar'

import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

import { handleMpesaC2bPayment } from 'e2payments'

const state = {
    serverUrl: 'https://e2payments.explicador.co.mz',
    // Testes em produção
    credentials: {
        walletId: 693794, //Carteira de testes gerais
    //    walletId: 132722, //Carteira em produção de Mawonelo
        CLIENT_ID: '9613e115-c047-410b-9691-d6de5c3bbc11',
        CLIENT_SECRET: 'lzP6tY0o93dBpqVdEFKoUgDjthzBLfk9NViqYyDY'
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
