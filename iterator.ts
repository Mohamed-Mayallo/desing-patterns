class MenuItem {
  name: string;
  description: string;
  price: number;
}

class MenuItemAsObject {
  [key: number]: MenuItem;
}

interface CreateIterator {
  createIterator(): void;
}

class DinerMenu implements CreateIterator {
  private items: MenuItem[];

  constructor(items: MenuItem[]) {
    this.items = items;
  }

  createIterator(): MyIterator {
    return new DinerMenuIterator(this.items);
  }
}

class BreakfastMenu implements CreateIterator {
  private items: MenuItemAsObject;

  constructor(items: MenuItemAsObject) {
    this.items = items;
  }

  createIterator(): MyIterator {
    return new BreakfastMenuIterator(this.items);
  }
}

interface MyIterator {
  hasNext(): boolean;
  next(): MenuItem;
}

class DinerMenuIterator implements MyIterator {
  private position = 0;
  private items: MenuItem[];

  constructor(items: MenuItem[]) {
    this.items = items;
  }

  hasNext(): boolean {
    return this.items.length > this.position;
  }

  next(): MenuItem {
    const item = this.items[this.position];
    this.position++;
    return item;
  }
}

class BreakfastMenuIterator implements MyIterator {
  private position = 0;
  private items: MenuItemAsObject;

  constructor(items: MenuItemAsObject) {
    this.items = items;
  }

  hasNext(): boolean {
    return Object.keys(this.items).length > this.position;
  }

  next(): MenuItem {
    const item = this.items[this.position];
    this.position++;
    return item;
  }
}

class Waiter {
  private dinerMenu: DinerMenu;
  private breakfastMenu: BreakfastMenu;

  constructor(dinerMenu: DinerMenu, breakfastMenu: BreakfastMenu) {
    this.dinerMenu = dinerMenu;
    this.breakfastMenu = breakfastMenu;
  }

  printItems() {
    const dinerMenuIterator = this.dinerMenu.createIterator();
    const breakfastMenuIterator = this.breakfastMenu.createIterator();

    console.log('DINER: \n');
    this.printProcess(dinerMenuIterator);
    console.log('BREAKFAST: \n');
    this.printProcess(breakfastMenuIterator);
  }

  private printProcess(iterator: MyIterator) {
    let items = '';
    while (iterator.hasNext()) {
      const item = iterator.next();
      items += ` Name: ${item.name}, Description: ${item.description}, Price: ${item.price} \n`;
    }
    console.log(items);
  }
}

const dinerMenu = new DinerMenu([
  { name: 'first', description: 'first desc', price: 10 },
  { name: 'second', description: 'second desc', price: 20 },
  { name: 'third', description: 'third desc', price: 30 }
]);

const breakfastMenu = new BreakfastMenu({
  '0': { name: 'fourth', description: 'fourth desc', price: 15 },
  '1': { name: 'fifth', description: 'fifth desc', price: 25 },
  '2': { name: 'sixth', description: 'sixth desc', price: 35 }
});

const waiter = new Waiter(dinerMenu, breakfastMenu);
waiter.printItems();
