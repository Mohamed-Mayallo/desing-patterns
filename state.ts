interface State {
  insertQuarter(): void;
  ejectQuarter(): void;
  dispense(): void;
  turnCrank(): void;
}

class HasQuarterState implements State {
  private gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter(): void {
    console.log('You can’t insert another quarter');
  }

  ejectQuarter(): void {
    console.log('Quarter returned');
    this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
  }

  dispense(): void {
    console.log('No gumball dispensed');
  }

  turnCrank(): void {
    console.log('You turned...');
    this.gumballMachine.setState(this.gumballMachine.getSoldState());
  }
}

class NoQuarterState implements State {
  private gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter(): void {
    console.log('You have inserted a quarter.');
    this.gumballMachine.setState(this.gumballMachine.getHasQuarterState());
  }

  ejectQuarter(): void {
    console.log('You haven’t inserted a quarter.');
  }

  dispense(): void {
    console.log('You need to pay first.');
  }

  turnCrank(): void {
    console.log('You turned, but there’s no quarter.');
  }
}

class SoldState implements State {
  private gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter(): void {
    console.log("Please wait, we're already giving you a gumball");
  }

  ejectQuarter(): void {
    console.log('Sorry, you already turned the crank');
  }

  dispense(): void {
    this.gumballMachine.releaseBall();
    if (this.gumballMachine.getGumballCount() > 0)
      this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
    else this.gumballMachine.setState(this.gumballMachine.getSoldOutState());
  }

  turnCrank(): void {
    console.log("Turning twice doesn't get you another gumball!");
  }
}

class SoldOutState implements State {
  private gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter(): void {
    console.log('The machine is sold out.');
  }

  ejectQuarter(): void {
    console.log('You haven’t inserted a quarter yet.');
  }

  dispense(): void {
    console.log('No gumball dispensed.');
  }

  turnCrank(): void {
    console.log('There are no gumballs.');
  }
}

class GumballMachine {
  private state: State;

  private gumballCount = 0;

  private hasQuarterState: State;
  private noQuarterState: State;
  private soldState: State;
  private soldOutState: State;

  constructor(gumballCount: number) {
    this.hasQuarterState = new HasQuarterState(this);
    this.noQuarterState = new NoQuarterState(this);
    this.soldState = new SoldState(this);
    this.soldOutState = new SoldOutState(this);

    this.gumballCount = gumballCount;

    if (this.gumballCount > 0) this.state = this.noQuarterState;
    else this.state = this.soldOutState;
  }

  public setState(state: State) {
    this.state = state;
  }

  public getHasQuarterState() {
    return this.hasQuarterState;
  }

  public getNoQuarterState() {
    return this.noQuarterState;
  }

  public getSoldState() {
    return this.soldState;
  }

  public getSoldOutState() {
    return this.soldOutState;
  }

  public releaseBall() {
    console.log('A gumball comes rolling out the slot...');
    if (this.gumballCount > 0) this.gumballCount = this.gumballCount - 1;
  }

  public getGumballCount() {
    return this.gumballCount;
  }

  public insertQuarter() {
    this.state.insertQuarter();
  }

  public ejectQuarter() {
    this.state.ejectQuarter();
  }

  public turnCrank() {
    this.state.turnCrank();
  }

  public dispense() {
    this.state.dispense();
  }
}

const gumballMachine = new GumballMachine(5);

console.log('Gumball count: ' + gumballMachine.getGumballCount());

gumballMachine.insertQuarter();
gumballMachine.turnCrank();
gumballMachine.dispense();

console.log('Gumball count: ' + gumballMachine.getGumballCount());
