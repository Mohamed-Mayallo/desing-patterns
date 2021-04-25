abstract class MenuComponent {
  getName() {
    throw new Error('Not supported');
  }

  getDescription() {
    throw new Error('Not supported');
  }

  getPrice() {
    throw new Error('Not supported');
  }

  isVegetarian() {
    throw new Error('Not supported');
  }

  print() {
    throw new Error('Not supported');
  }

  addChild(child: MenuComponent) {
    throw new Error('Not supported');
  }

  removeChild(child: MenuComponent) {
    throw new Error('Not supported');
  }
}

class MenuItem extends MenuComponent {
  private name: string;
  private description: string;
  private price: number;

  constructor(name: string, description: string, price: number) {
    super();

    this.name = name;
    this.description = description;
    this.price = price;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getPrice() {
    return this.price;
  }

  print() {
    return `\n ${this.name}, ${this.description}, ${this.price}`;
  }
}

class Menu extends MenuComponent {
  private children: MenuComponent[] = [];

  private name: string;
  private description: string;

  constructor(name: string, description: string) {
    super();

    this.name = name;
    this.description = description;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  print() {
    let res = `\n ${this.name}, ${this.description} \n`;
    this.children.map((ch) => (res += `\n ${ch.print()} \n`));
    return res;
  }

  addChild(child: MenuComponent) {
    this.children.push(child);
  }

  removeChild(child: MenuComponent) {
    const childIndex = this.children.findIndex((ch) => ch === child);
    if (childIndex >= 0) this.children.splice(childIndex, 1);
  }
}

const allMenus = new Menu('ALL MENU', 'All menu description');

const dinerMenu = new Menu('DINER MENU', 'Diner menu description');
const breakfastMenu = new Menu('BREAKFAST MENU', 'Breakfast menu description');
const dessertMenu = new Menu('DESSERT MENU', 'Dessert menu description');

const pastaMenuItem = new MenuItem(
  'Pasta',
  'Spaghetti with Marinara Sauce, and a slice of sourdough bread',
  3.89
);
const applePieMenuItem = new MenuItem(
  'Apple Pie',
  'Apple pie with a flakey crust, topped with vanilla ice cream',
  1.59
);
const ketchupMenuItem = new MenuItem('Ketchup', 'Ketchup description', 1.2);
const mayonnaiseMenuItem = new MenuItem(
  'Mayonnaise',
  'Mayonnaise description',
  1.59
);

allMenus.addChild(dinerMenu);
allMenus.addChild(breakfastMenu);

dinerMenu.addChild(ketchupMenuItem);
dinerMenu.addChild(dessertMenu);
breakfastMenu.addChild(applePieMenuItem);
breakfastMenu.addChild(mayonnaiseMenuItem);
dessertMenu.addChild(pastaMenuItem);

console.log(allMenus.print());
