import {baseURL} from '../Constants'


export function socket(id) {
    let socket = new WebSocket(`wss://${baseURL}/ws/chat/${id}/`)
    return socket
}

export function orderSocket() {
    let socket = new WebSocket(`wss://${baseURL}/ws/orders/`)
    return socket
}

export function socketBoy(id) {
    let socket = new WebSocket(`wss://${baseURL}/ws/deliveryboys/${id}/`)
    return socket
}
