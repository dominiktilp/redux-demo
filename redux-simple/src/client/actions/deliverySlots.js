import fetch from 'isomorphic-fetch'
import {
  REQUEST_DELIVERY_SLOTS,
  RECEIVE_DELIVERY_SLOTS } from './types'

const URL = 'http://localhost:3000/api'

const mapDeliverySlot = (deliverySlot) => {
  return deliverySlot
}

const requestDeliverySlots = (date, postCode) => {
  return {
    type: REQUEST_DELIVERY_SLOTS,
    date,
    postCode
  }
}

const receiveDeliverySlots = (date, postCode, json) => {
  var deliverySlots = json.data.deliverySlots.map(mapDeliverySlot)
  return {
    type: RECEIVE_DELIVERY_SLOTS,
    date,
    postCode,
    deliverySlots
  }
}

export const fetchDeliverySlots = (date, postCode) => {
  return (dispatch) => {
    dispatch(requestDeliverySlots(date, postCode))
    return fetch(`${URL}/delivery-slots`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(receiveDeliverySlots(date, postCode, json))
      })
  }
}
