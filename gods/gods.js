
const selectGod = godId => godList => godList.filter(god => god.id == godId)

const pickGods = obj => obj.gods

const addGod = newGod => godList => [
    ...godList,
    Object.assign({}, { id: godList.length + 1 }, newGod)
]
//   { id: godList.length + 1, ...newGod }

const makeGodsObject = godsList => ({ gods: godsList })

const makeGodFromRequest = req => ({
    name: req.body.name,
    tag: req.body.tag
})

module.exports = {
    addGod,
    selectGod,
    pickGods,
    makeGodsObject,
    makeGodFromRequest
}
