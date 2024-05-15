class OrdersManager {
  constructor() {
    this.ordenesGuardadas = [];
  }

  create(data) {
    this.ordenesGuardadas.push(data);
    return data; // Opcional: Devolver la orden creada
  }

  read() {
    return this.ordenesGuardadas;
  }

  readOne(uid) {
    return this.ordenesGuardadas.filter((orden) => orden.uid === uid);
  }

  upDate(oid, quantity, state) {
    const ordenEncontradaIndex = this.ordenesGuardadas.findIndex(
      (orden) => orden.pid === oid
    );
    if (ordenEncontradaIndex !== -1) {
      if (quantity !== undefined) {
        this.ordenesGuardadas[ordenEncontradaIndex].quantity = quantity;
      }
      if (state !== undefined) {
        this.ordenesGuardadas[ordenEncontradaIndex].state = state;
      }
    }
  }

  destroy(oid) {
    this.ordenesGuardadas = this.ordenesGuardadas.filter(
      (orden) => orden.pid !== oid
    );
  }
}

const ordenManager = new OrdersManager(); // Corregimos el nombre de la clase
export default ordenManager;
