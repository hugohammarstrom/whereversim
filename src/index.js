import fetch from "node-fetch"
import server from "./helpers/server"
import routes from "./routes"
import chalk from 'chalk'


const WhereverSim = function(_token){
    this.setupRoutes()
    this.startReauth()
    this.authenticated = false
    if (_token) this.app_token = _token
}

WhereverSim.prototype.authenticate = function(_token, config = {}){
    if (_token) this.app_token = _token
    if (!this.app_token) throw new Error("No Application token provided")
    if (!config.nologging) console.log(chalk.black.bgYellow.bold("WhereverSim: Authenticating..."))
    return new Promise((resolve, reject) => {
        server.safe(fetch(server.base_url + "/api/v1/authenticate", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                application_token: this.app_token
            }) 
        }))
            .then(json => {
                if (json.auth_token){
                    this.auth_token = json.auth_token
                    this.authenticated = true
                    if (!config.nologging) console.log(chalk.white.bgGreen.bold("WhereverSim: Authenticated"))
                    resolve(this)
                } else reject(new Error("No auth_token received"))
            }).catch(e => reject(e))
    })
}

WhereverSim.prototype.startReauth = function(interval = 360000){
    if (this.authenticated = false) return 
    this.reauth = setInterval(async () => {
        let auth = await this.authenticate(null, {nologging: true})
    }, interval)
}

WhereverSim.prototype.stopReauth = function(){
    clearInterval(this.reauth)
}

WhereverSim.prototype.setupRoutes = function(){
    WhereverSim.prototype.routes.api = this
    Object.keys(WhereverSim.prototype.routes).forEach(key => {
        WhereverSim.prototype.routes[key].api = this
    })
}

WhereverSim.prototype.routes = {
    print: function() {console.log(Object.keys(this.api.routes))},
    application_token: routes.application_token,
    sim: routes.sim,
    endpoint: routes.endpoint
}

export default WhereverSim