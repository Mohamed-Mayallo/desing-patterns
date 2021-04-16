interface Duck {
    fly(): void
    quack(): void
}

class MallardDuck implements Duck {
    fly(): void {
        console.log('fly')
    }

    quack(): void {
        console.log('quack')
    }
}

interface Turkey {
    gobble(): void
    fly(): void
}

class WildTurkey implements Turkey {
    gobble(): void {
        console.log('gobble')
    }
    
    fly(): void {
        console.log('fly')
    }
}

class TurkeyAdapter implements Duck {
    turkey: Turkey
    
    constructor(turkey: Turkey) {
        this.turkey = turkey
    }

    fly(): void {
        this.turkey.fly()
    }

    quack(): void {
        this.turkey.gobble()    
    }
}

const mallardDuck = new MallardDuck()
mallardDuck.fly()
mallardDuck.quack()

const wildTurkey = new WildTurkey() 
wildTurkey.fly()
wildTurkey.gobble()

const turkeyAdapter = new TurkeyAdapter(wildTurkey)
turkeyAdapter.fly()
turkeyAdapter.quack()
