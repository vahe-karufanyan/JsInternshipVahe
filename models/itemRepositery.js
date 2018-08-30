



class Item {
    constructor(type, name, price) {
        this.type = type;
        this.name = name;
        this.price = price;
    }
}


class ItemRepository {
    constructor() {
        this.items = new Map([
            [1, new Item('Fruit', 'Apple', '100')],
            [2, new Item('Snack', 'Mars', '250')],
            [3, new Item('Juice', 'Pepsi', '280')],
            [4, new Item('Alcohol', 'Jack Daniels', '10000')]
        ]);
    }
 
    getById(id) {
        
        return new Promise((resolve, reject) => {
            
            if(!id || !this.items.has(parseInt(id))) {
                reject();
            } else {
                resolve(this.items.get(parseInt(id)));
            }
        });
    }
 
    getAll() {
        return new Promise((resolve) => {
            resolve(Array.from(this.items.entries()));
        });
    }
 
    remove(id) {
        return new Promise((resolve, reject) => {
            if(!id || !this.items.has(parseInt(id))) {
                reject();
            } else {
                this.items.delete(parseInt(id))
                resolve();
            }
        });
    }

    update(itemId, item) {
        return new Promise((resolve, reject) => {
            if((!itemId && !item.type && !item.name && !item.price) || !this.items.has(parseInt(itemId))) {
                reject();
            } else {
                console.log(itemId + '  ' + item.type + '  ' + item.name + '  ' + item.price);
                const oldItem = this.items.get(parseInt(itemId));
                if(item.type) {
                    this.items.set(parseInt(itemId) , new Item(item.type, oldItem.name, oldItem.price));
                    oldItem.type = item.type;
                }
                if(item.name) {
                    this.items.set(parseInt(itemId) , new Item(oldItem.type, item.name, oldItem.price));
                    oldItem.name = item.name;
                }
                if(item.price) {
                    this.items.set(parseInt(itemId) , new Item(oldItem.type, oldItem.name, item.price));
                    oldItem.price = item.price;
                }
                resolve(oldItem);
            }
        });
    }

    addItem(item) {
        return new Promise((resolve, reject) => {
            const id = Math.round((Math.random()+1)*100000);;
            if(this.items.has(parseInt(id)) || !item.type || !item.name || !item.price) {
                reject();
            } else {
            this.items.set(id, new Item(item.type, item.name, item.price));
            resolve(id);
            }
        });
    }
}
 
const ItRe = new ItemRepository();
 
export default ItRe;