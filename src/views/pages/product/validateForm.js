const validate = () => {

    return  {
      nombre: [ (value) => value.length >= 3, 'El Producto no es correcto'],
      idMarca: [ (value) => value!="", 'La marca no es valida'],
      idModelo: [ (value) => value!="", 'El modelo no es valido'],
      idTalla: [ (value) => value!="", 'La talla no es valida'],
      idColor: [ (value) => value!="", 'El color no es valido'],
      precioVenta: [ (value) => value.length >= 1, 'El precioVenta no es valido'],
    }

};
export default validate;


