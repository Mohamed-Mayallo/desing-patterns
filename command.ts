interface Command {
  execute(): void;
  undo(): void;
}

class LightOnCommand implements Command {
  private lightReceiver: LightReceiver;

  constructor(lightReceiver: LightReceiver) {
    this.lightReceiver = lightReceiver;
  }

  execute() {
    this.lightReceiver.on();
  }

  undo() {
    this.lightReceiver.off();
  }
}

class LightOffCommand implements Command {
  private lightReceiver: LightReceiver;

  constructor(lightReceiver: LightReceiver) {
    this.lightReceiver = lightReceiver;
  }

  execute() {
    this.lightReceiver.off();
  }

  undo() {
    this.lightReceiver.on();
  }
}

class LightReceiver {
  on() {
    console.log('ON');
  }

  off() {
    console.log('OFF');
  }
}

class RemoteControlInvoker {
  private lightOnCommand: Command;
  private lightOffCommand: Command;

  constructor(lightOnCommand: Command, lightOffCommand: Command) {
    this.lightOnCommand = lightOnCommand;
    this.lightOffCommand = lightOffCommand;
  }

  pressOnButton() {
    this.lightOnCommand.execute();
  }

  undoOnButton() {
    this.lightOnCommand.undo();
  }

  pressOffButton() {
    this.lightOffCommand.execute();
  }

  undoOffButton() {
    this.lightOffCommand.undo();
  }
}

const lightReceiver = new LightReceiver();
const lightOnCommand = new LightOnCommand(lightReceiver);
const lightOffCommand = new LightOffCommand(lightReceiver);
const remoteControlInvoker = new RemoteControlInvoker(
  lightOnCommand,
  lightOffCommand
);
remoteControlInvoker.pressOnButton();
remoteControlInvoker.undoOnButton();
remoteControlInvoker.pressOffButton();
remoteControlInvoker.undoOffButton();
