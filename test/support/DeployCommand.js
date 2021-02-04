import { Command } from 'fast-check'

export class DeployCommand {
  constructor(pool, depositDeadline, withdrawDeadline) {
    this.pool = pool
    this.depositDeadline = depositDeadline
    this.withdrawDeadline = withdrawDeadline
  }

  check(model) {
    return true
  }

  run(model, real) {
    real.deploy(this.pool, this.depositDeadline, this.withdrawDeadline)
    model.deploy(this.pool, this.depositDeadline, this.withdrawDeadline)
  }

  toString() {
    return `deploy(${this.pool}, ${this.depositDeadline}, {this.withdrawDeadline})`
  }
}
