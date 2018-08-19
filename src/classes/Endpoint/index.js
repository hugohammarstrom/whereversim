import fetch from "node-fetch"
import server from "./../../helpers/server"
import Sim from "./../Sim"

const Endpoint = function(_data, _api = {}){
    this.api = _api
    this.parse(_data)
}

Endpoint.prototype.parse = function(data = {}){
    Object.keys(data).forEach(key => {
        this[key] = data[key]
    })
}

/**
 * @param  {} data
 * Deletes an endpoint and all its child entities.
 * https://portal.whereversim.com/api/doc/whereverSIM-API-collapsible.html#endpoint-single-endpoint-operations-delete
 * @returns null if success
 */

Endpoint.prototype.delete = function(data) {
    return new Promise((resolve, reject) => {
        server.safe(fetch(server.base_url + `/api/v1/endpoint/${Number(this.id)}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${this.api.auth_token}`
            },
            method: "DELETE",
        })).then(res => {
            resolve(null)
        }).catch(reject)
    }) 
}

/**
 * @param  {} data
 * https://portal.whereversim.com/api/doc/whereverSIM-API-collapsible.html#endpoint-single-endpoint-operations-patch
 * @return Endpoint - updated endpoint
 */
Endpoint.prototype.update = function(data) {
    return new Promise((resolve, reject) => {
        server.safe(fetch(server.base_url + `/api/v1/endpoint/${Number(this.id)}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${this.api.auth_token}`
            },
            method: "PATCH",
            body: JSON.stringify(data)
        })).then(res => {
            resolve(Object.assign(this, data))
        }).catch(reject)
    })   
}

/**
 * https://portal.whereversim.com/api/doc/whereverSIM-API-collapsible.html#endpoint-accessing-endpoint-connectivity-status
 * @returns connectivity status
 */
Endpoint.prototype.connectivity = function() {
    return server.safe(fetch(server.base_url + `/api/v1/endpoint/${Number(this.id)}/connectivity`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${this.api.auth_token}`
        },
        method: "GET"
    }))
}
/**
 * https://portal.whereversim.com/api/doc/whereverSIM-API-collapsible.html#endpoint-accessing-endpoint-statistics
 * @returns Stats for endpoint
 */
Endpoint.prototype.stats = function(){
    return server.safe(fetch(server.base_url + `/api/v1/endpoint/${Number(this.id)}/stats`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${this.api.auth_token}`
        },
        method: "GET"
    }))
}

export default Endpoint