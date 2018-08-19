import fetch from "node-fetch"
import server from "./../../helpers/server"
import Sim from "./../../classes/Sim"

export default {
    /**
     * @param  {} id
     * https://portal.whereversim.com/api/doc/whereverSIM-API-collapsible.html#sims-sim-operations-get
     * @return Sim - single sim
     */ 
    byId: function(id) {
        return new Promise((resolve, reject) => {
            if(!id) throw new Error("No id specifed")
            return server.safe(fetch(server.base_url + `/api/v1/sim/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${this.api.auth_token}`
                },
                method: "GET"
            })).then(res => {
                resolve(new Sim(res, this.api))
            }).catch(reject)
        })
    },
    /**
     * @param  {} config={}
     * https://portal.whereversim.com/api/doc/whereverSIM-API-collapsible.html#sims-sim-collection
     * @return [Sim] - List of sims
     */
    all: function(config = {}){
        return new Promise((resolve, reject) => {
            server.safe(fetch(server.base_url + `/api/v1/sim?${server.params(config)}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${this.api.auth_token}`
                },
                method: "GET"
            }))
            .then(res => {
                resolve(res.map(e => new Sim(e, this.api)))
            }).catch(reject)
        })
    },
    /**
     * @param  {} config={}
     * https://portal.whereversim.com/api/doc/whereverSIM-API-collapsible.html#sims-sim-status
     * @returns List of all available sim statuses
     */
    status: function(config = {}){
        return server.safe(fetch(server.base_url + `/api/v1/sim/status?${server.params(config)}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${this.api.auth_token}`
            },
            method: "GET"
        }))
    },
    /**
     * Not yet implemented
     */
    post: () => {
        throw new Error("Not implemented yet")
    }
}