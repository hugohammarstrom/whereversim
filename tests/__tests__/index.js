const WhereverSim = require("./../../index")

describe("WhereverSim API", () => {
    let API = new WhereverSim()
    test("happy path", () => {
        expect(API).toBeInstanceOf(WhereverSim)
    })

    test("auth no app_token", async () => {
        expect(() => API.authenticate()).toThrow("No Application token provided")
    })

    test("no auth", () => {
        expect(API.authenticate("test")).rejects.toMatchObject({status: 401})
    })
})