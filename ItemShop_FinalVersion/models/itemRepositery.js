



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
        return new Promise((resolve, reject) => {
            if(!id) {
                reject();
            }
            else {
                resolve(this.items.get(id));
            }
        });
    }
 
    getAll() {
        return new Promise((resolve) => {
            resolve(Array.from(this.items.values()));
        });
    }
 
    remove(id) {
        return new Promise((resolve, reject) => {
            if(!id || !this.items.has(id)) {
                reject();
            }
            else {
                this.items.delete(id)
                resolve();
            }
        });
    }

    update(item) {
        return new Promise((resolve, reject) => {
            if(!item.id || !item.type || !item.name || !item.price || !this.items.has(id)) {
                reject();
            }
            else {        
                this.items[item.id] = item;
                resolve();
            }
        });
    }

    addItem(item) {
        return new Promise((resolve, reject) => {
            const id = Math.round((Math.random()+1)*100000);;
            if(this.items.has(id) || !item.type || !item.name || !item.price) {
                console.log('false' + id);
                reject();
            }
            else {
            
            this.items.set(id, new Item(id, item.type, item.name, item.price));
            console.log('true' + id);
            resolve(id);
            }
        });
    }
}
 
const ItRe = new ItemRepository();
 
export default ItRe;
