class Anuncio{
    constructor(id, titulo, descripcion, precio){
        this.id = id;
        this.titulo = titulo;
        this.transaccion = "venta";
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

export default Anuncio;