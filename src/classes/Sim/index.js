import fetch from "node-fetch"
import server from "./../../helpers/server"
import Endpoint from "./../Endpoint"

const Sim = function(_data, _api = {}){
    this.api = _api
    this.parse(_data)
}

Sim.prototype.parse = function(data = {}){
    Object.keys(data).forEach(key => {
        if (key == "endpoint") return this[key] = new Endpoint(data[key], this.api)
        this[key] = data[key]
    })
}

/**
 * @param  {} data
 * https://portal.whereversim.com/api/doc/whereverSIM-API-collapsible.html#sims-sim-operations-patch
 * Update SIM
 * @returns Sim - updated sim
 */
Sim.prototype.update = function(data) {
    return new Promise((resolve, reject) => {
        server.safe(fetch(server.base_url + `/api/v1/sim/${Number(this.id)}`, {
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
 * @param  {} config={}
 * https://portal.whereversim.com/api/doc/whereverSIM-API-collapsible.html#sims-events-of-a-sim
 * @returns list of events, filtered, sorted and paged according to query parameters.
 */
Sim.prototype.events = function(config = {}){
    return server.safe(fetch(server.base_url + `/api/v1/sim/${this.id}/events?${server.params(config)}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${this.api.auth_token}`
        },
        method: "GET"
    }))
}

export default Sim
