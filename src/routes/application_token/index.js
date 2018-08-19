import fetch from "node-fetch"
import server from "./../../helpers/server"


export default {
    get: function() {
        return server.safe(fetch(server.base_url + "/api/v1/application_token", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${this.api.auth_token}`
            },
            method: "GET"
        }))
    },
    post: () => {
        throw new Error("Not implemented yet")
    }
}