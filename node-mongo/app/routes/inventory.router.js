module.exports = function(app){
    var inventories = require('../controllers/inventory.controller')
    app.post('/api/event', inventories.createInventory);
    app.get('/api/event/:id', inventories.getInventory);
    app.get('/api/events', inventories.inventories);
    app.get('/api/events/:userid', inventories.myInventories);
    app.put('/api/event/:id', inventories.updateInventory);
    app.delete('/api/event/:id', inventories.deleteInventory);
}