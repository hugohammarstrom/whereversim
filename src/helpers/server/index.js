import chalk from "chalk"

export default {
    base_url: "https://portal.whereversim.com",
    safe: (fetch) => {
        return new Promise((resolve, reject) => {
            fetch.then(response => {
                if(response.status == 200){
                    return resolve(response.json())
                } else if(response.status == 204){
                    return resolve({})
                } else if(response.status == 201){
                    return resolve(response)
                } else {
                    response.json().then(json => {
                        reject(json)
                    }).catch(_ => {
                        console.log(chalk.white.bgRed(`${response.statusText}: ${response.url}`))
                        reject({
                            url: response.url,
                            status: response.status,
                            statusText: response.statusText,
                        })
                    })
                }
            })
        })
    },
    params: (config) => {
        return Object.keys(config).reduce((prev, curr) => {
            return prev + `${curr}=${config[curr]}&`
        }, "").slice(0, -1)
    }
}
