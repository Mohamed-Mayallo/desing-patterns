interface Beverage {
    cost(): number,
    description(): string
}

interface BeverageAddOn extends Beverage {
    beverage: Beverage
}

class DarkRoast implements Beverage {
    cost(): number {
        return 4
    }

    description(): string {
        return 'Dart Roast'
    }
}

class Mocha implements BeverageAddOn {
    beverage: Beverage

    constructor(beverage: Beverage) {
        this.beverage = beverage
    }

    cost(): number {
        return 1 + this.beverage.cost()
    }

    description(): string {
        return this.beverage.description() + ', Mocha'
    }
}

const darkRoast = new DarkRoast()
console.log(`Cost: ${darkRoast.cost()}, Description: ${darkRoast.description()}`)

const darkRoastWithMocha = new Mocha(darkRoast)
console.log(`Cost: ${darkRoastWithMocha.cost()}, Description: ${darkRoastWithMocha.description()}`)

const darkRoastWithDoubleMocha = new Mocha(darkRoastWithMocha)
console.log(`Cost: ${darkRoastWithDoubleMocha.cost()}, Description: ${darkRoastWithDoubleMocha.description()}`)
