const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find(criteria).toArray()
        _sort(toys, filterBy.sortBy)
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.findOne({ '_id': ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    console.log('added');
    try {
        const collection = await dbService.getCollection('toy')
        const {ops} = await collection.insertOne(toy)
        return ops[0]
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}
async function update(toy) {
    try {
        var id = ObjectId(toy._id)
        delete toy._id
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ "_id": id }, { $set: { ...toy } })
        toy._id = id
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toyId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.name) {
        const txtCriteria = { $regex: filterBy.name , $options: 'i' }
        criteria.$or = [
            {
                name: txtCriteria
            }
        ]
    }
    if(filterBy.stock) {
        criteria.inStock = { $eq: JSON.parse(filterBy.stock) }
    }
    if(filterBy.labels) {
        criteria.labels = { $in: filterBy.labels }
    }
        return criteria
}

function _sort(toys, sortBy){
    if(!sortBy) return

    switch(sortBy){
        case 'createdAt':
            toys.sort((t1, t2) => t1.createdAt - t2.createdAt)
            break
        case 'name':
            toys.sort((t1, t2) => t1.name.localeCompare(t2.name))
            break
        case 'price':
            toys.sort((t1, t2) => t1.price - t2.price)
            break
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}