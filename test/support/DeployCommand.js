export class DeployCommand {
  constructor (pool, depositDeadline, withdrawDeadline) {
    this.pool = pool
    this.depositDeadline = depositDeadline
    this.withdrawDeadline = withdrawDeadline
  }

  async check (model) {
    return true
  }

  async run (model, real) {
    real.deploy(this.pool, this.depositDeadline, this.withdrawDeadline)
    model.deploy(this.pool, this.depositDeadline, this.withdrawDeadline)
  }

  toString () {
    return `deploy(${this.pool}, ${this.depositDeadline}, {this.withdrawDeadline})`
  }
}
