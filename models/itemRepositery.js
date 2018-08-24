


class Item {
    constructor(id, type, name, price) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.price = price;
    }
}


class ItemRepository {
    constructor() {
        this.items = new Map([
            [1, new Item(1, 'Fruit', 'Apple', '100')],
            [2, new Item(2, 'Snack', 'Mars', '250')],
            [3, new Item(3, 'Juice', 'Pepsi', '280')],
            [4, new Item(4, 'Alcohol', 'Jack Daniels', '10000')]
        ]);
    }
 
    getById(id) {
        return this.items.get(id);
    }
 
    getAll() {
        return Array.from(this.items.values());
    }
 
    remove() {
        const keys = Array.from(this.items.keys());
        this.items.delete(keys[keys.length - 1]);
    }

    update(item) {
        if(this.getById(item.id) !== undefined) {
            this.items[item.id] = item;
        }
        else {
            console.log(' The following item will be created');
            this.addItem()
        }
    }

    addItem(item) {
        if(this.getById(item.id) == undefined) {
            this.items.set(item.id, new Item(item.id, item.type, item.name, item.price));
        }
        else {
            console.log(' Existing item will be updated. \n');
            this.update(item);
        }
    }
}
 
const ItRe = new ItemRepository();
 
module.exports = ItRe;