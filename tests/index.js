import WhereverSim from "./../src/index"
import skipRejection from "./../src/helpers/skipRejection"

let API = new WhereverSim("123")

skipRejection(
    API.authenticate()
)

process.on('unhandledRejection', error => {
    // Will print "unhandledRejection err is not defined"
    console.log('unhandledRejection', error);
});

