
class A {
    name = "Hello";
    size = 2;
    getName = () => {
        return this.name;
    };
    getSize = () => {
        return this.size;
    };
    setName = (val) => {
        this.name = val;
    };
    setSize = (val) => {
        this.size = val;
    };
}

class ImmutableA {
    constructor(executer) {
        let newA = new A();
        let modifiers = {};
        for (let i in newA) {
            if (typeof newA[i] !== "function") {
                continue;
            }
            if (i.startsWith("set")) {
                modifiers[i] = newA[i].bind(newA);
            } else {
                this[i] = newA[i].bind(newA);
            }
        }
        executer(modifiers);
    }
}

const newA = new ImmutableA(({ setSize, setName }) => {
    setName("Hi all");
    setSize(5);
});
console.log(newA.getName()); // Hi all
console.log(newA.getSize()); // 5
newA.setName("any"); // TypeError: newA.setName is not a function
