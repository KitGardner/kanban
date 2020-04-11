export class Board {
  constructor({
    id = "",
    name = "",
    description = "",
    creator = {}
  } = {}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.creator = creator;
  }
}