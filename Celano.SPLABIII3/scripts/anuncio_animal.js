import Anuncio from "./anuncio.js";

class Mascota extends Anuncio{
    constructor(id, titulo, descripcion, precio, animal, raza, fecha, vacuna, castrado){
        super(id, titulo, descripcion, precio);
        this.animal = animal;
        this.raza = raza;
        this.fecha_de_nacimiento = fecha;
        this.vacuna = vacuna;
        this.castrado = castrado;
    }
}

export default Mascota;