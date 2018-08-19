export default (fn, noVerbose = true) => {
    let cth = () => {}
    if (!noVerbose) cth = console.log
    fn.catch(cth)
}