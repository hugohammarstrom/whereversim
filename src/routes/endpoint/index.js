import fetch from "node-fetch"
import server from "./../../helpers/server"
import Endpoint from "./../../classes/Endpoint"

export default {
    /**
     * @param  {} id
     * https://portal.whereversim.com/api/doc/whereverSIM-API-collapsible.html#endpoint-single-endpoint-operations-get
     * @returns Endpoint - single endpoint
     */
    byId: function(id) {
        return new Promise((resolve, reject) => {
            if(!id) throw new Error("No id specifed")
            return server.safe(fetch(server.base_url + `/api/v1/endpoint/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${this.api.auth_token}`
                },
                method: "GET"
            })).then(res => {
                resolve(new Endpoint(res, this.api))
            }).catch(reject)
        })
    },
    /**
     * @param  {} config={}
     * https://portal.whereversim.com/api/doc/whereverSIM-API-collapsible.html#endpoint-endpoint-collection
     * @returns [Endpoint] - List of endpoints
     */
    all: function(config = {}){
        return new Promise((resolve, reject) => {
            server.safe(fetch(server.base_url + `/api/v1/endpoint?${server.params(config)}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${this.api.auth_token}`
                },
                method: "GET"
            }))
            .then(res => {
                resolve(res.map(e => new Endpoint(e, this.api)))
            }).catch(reject)
        })
    },
    /**
     * @param  {} data
     * Name (String required), Status (Object required), Service profile (Object required), Tariff profile (Object required)
     * https://portal.whereversim.com/api/doc/whereverSIM-API-collapsible.html#endpoint-endpoint-creation
     * @returns Endpoint
     */
    create: function(data){
        return new Promise((resolve, reject) => {
            return server.safe(fetch(server.base_url + `/api/v1/endpoint`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${this.api.auth_token}`
                },
                method: "POST",
                body: JSON.stringify(data)
            })).then(res => {
                let location
                for (var h of res.headers){
                    if (h[0] == "location"){
                        location = h[1]
                    }
                }
                let id = location.split("/").last()
                this.byId(id)
                    .then(resolve)
                    .catch(reject)
            }).catch(reject)
        })
    },


    /**
     * @param  {} config={}
     * https://portal.whereversim.com/api/doc/whereverSIM-API-collapsible.html#endpoint-endpoint-status
     * @returns List of all available endpoint statuses
     */
    status: function(config = {}){
        return server.safe(fetch(server.base_url + `/api/v1/endpoint/status?${server.params(config)}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${this.api.auth_token}`
            },
            method: "GET"
        }))
    },
}

Array.prototype.last = function(){
    return this[this.length-1]
}