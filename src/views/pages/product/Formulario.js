import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CForm, CFormLabel, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormInput, CFormSelect } from '@coreui/react';
import validate from './validateForm';
import { useForm } from '../../../hooks/useForms';
import Select from 'react-select';
import { getModels } from '../../../services/modelos';
import { getSizes } from '../../../services/tallas';
import { getColors } from '../../../services/colores';
import { getBrands } from '../../../services/marcas';
import { putProductos } from '../../../services/productos';
import { toast } from 'react-toastify';

const Formulario = ({ initialForm, addItem, updateRow, removeRow, closeModal }) => {
    const [modelos, setModelos] = useState({});
    const [tallas, setTallas] = useState({});
    const [colores, setColores] = useState({});
    const [marcas, setMarcas] = useState({});

    const [formSubmitted, setFormSubmitted] = useState(false);
    const formValidations = validate();
    const action = initialForm.imagen === "" ? "ADD" : "UPDATE";

    const {
        id,
        nombre,
        idMarca,
        idModelo,
        idTalla,
        idColor,
        precioVenta,
        imagen,
        estado,

        nombreValid,
        idMarcaValid,
        idModeloValid,
        idTallaValid,
        idColorValid,
        precioVentaValid,
        imagenValid,
        estadoValid,

        formState,
        isFormValid,
        onInputChange,
        onResetForm,
        setFormState,
    } = useForm(initialForm, formValidations);


    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const [modelsData, sizesData, colorsData, brandsData] = await Promise.all([
                getModels(),
                getSizes(),
                getColors(),
                getBrands()
            ]);

            const newModelsData = modelsData.data.map(({ MOD_id, MOD_descripcion }) => ({
                value: MOD_id,
                label: MOD_descripcion
            }));

            const newSizesData = sizesData.data.map(({ TALL_id, TALL_descripcion }) => ({
                value: TALL_id,
                label: TALL_descripcion
            }));

            const newColorsData = colorsData.data.map(({ COL_id, COL_descripcion }) => ({
                value: COL_id,
                label: COL_descripcion
            }));

            const newBrandsData = brandsData.data.map(({ MAR_id, MAR_descripcion }) => ({
                value: MAR_id,
                label: MAR_descripcion
            }));

            setModelos(newModelsData);
            setTallas(newSizesData);
            setColores(newColorsData);
            setMarcas(newBrandsData);

        } catch (error) {
            console.log('error :>> ', error);
        }
    }

    const handleForm = async (event, action) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        const data = new FormData();

        data.append("nombre", formState.nombre);
        data.append("idMarca", formState.idMarca.value);
        data.append("idModelo", formState.idModelo.value);
        data.append("idTalla", formState.idTalla.value);
        data.append("idColor", formState.idColor.value);
        data.append("precioVenta", formState.precioVenta);
        if (action !== "ADD") data.append("estado", formState.estado);
        imagen !== "" && data.append("imagen", imagen);

        //add(data);
        if (action === "ADD") {
            add(data);
        } else {
            update(data);

        }
    };

    const update = async (data) => {
        try {
            let response = await putProductos(id, data);
            if (response.status === 200) {
                onResetForm();
                closeModal();
                updateRow(response.data)
                if (response.data.PROD_estado === 0) {
                    removeRow(response.data);
                }
                toast.success("Actualizado con exito", {
                    position: "bottom-right",
                });
            } else {
                toast.error("ocurrio un error", {
                    position: "bottom-right",
                });
            }
        } catch (error) {
            console.log('error :>> ', error);
        }
    }

    const handleSelectChange = (value, name) => {
        formState[name] = value;
        setFormState((valueForm) => ({ ...valueForm, formState }));
    };

    return (
        <CCard className="mb-4">
            <CCardBody>
                <CForm onSubmit={(event) => handleForm(event, action)}>
                    <div className="mb-2">
                        <CFormLabel htmlFor="exampleFormControlInput1">Nombre</CFormLabel>
                        <CFormInput
                            type="text"
                            id="exampleFormControlInput1"
                            name="nombre"
                            value={nombre}
                            onChange={onInputChange}

                        />
                    </div>
                    <div>
                        {!!nombreValid && formSubmitted && <p className="text-sm text-danger mb-0">{nombreValid}</p>}
                    </div>
                    <div className="mb-2">
                        <CFormLabel htmlFor="exampleFormControlTextarea1">Precio</CFormLabel>
                        <CFormInput
                            type="number"
                            id="exampleFormControlInput1"
                            name="precioVenta"
                            value={precioVenta}
                            onChange={onInputChange}
                        />
                    </div>
                    <div>
                        {!!precioVentaValid && formSubmitted && <p className="text-sm text-danger mb-0">{precioVentaValid}</p>}
                    </div>
                    <div>
                        <CFormLabel htmlFor="exampleFormControlTextarea1">Modelo</CFormLabel>
                        <Select
                            value={idModelo}
                            onChange={(option) => handleSelectChange(option, 'idModelo')}
                            options={modelos}
                            placeholder="Selecciona una opción"
                        />
                    </div>
                    <div>
                        {!!idModeloValid && formSubmitted && <p className="text-sm text-danger mb-0">{idModeloValid}</p>}
                    </div>
                    <div>
                        <CFormLabel htmlFor="exampleFormControlTextarea1">Marca</CFormLabel>
                        <Select
                            value={idMarca}
                            onChange={(option) => handleSelectChange(option, 'idMarca')}
                            options={marcas}
                            placeholder="Selecciona una opción"
                        />
                    </div>
                    <div>
                        {!!idMarcaValid && formSubmitted && <p className="text-sm text-danger mb-0">{idMarcaValid}</p>}
                    </div>
                    <div>
                        <CFormLabel htmlFor="exampleFormControlTextarea1">Talla</CFormLabel>
                        <Select
                            value={idTalla}
                            onChange={(option) => handleSelectChange(option, 'idTalla')}
                            options={tallas}
                            placeholder="Selecciona una opción"
                        />
                    </div>
                    <div>
                        {!!idTallaValid && formSubmitted && <p className="text-sm text-danger mb-0">{idTallaValid}</p>}
                    </div>
                    <div>
                        <CFormLabel htmlFor="exampleFormControlTextarea1">Color</CFormLabel>
                        <Select
                            value={idColor}
                            onChange={(option) => handleSelectChange(option, 'idColor')}
                            options={colores}
                            placeholder="Selecciona una opción"
                        />
                    </div>
                    <div>
                        {!!idColorValid && formSubmitted && <p className="text-sm text-danger mb-0">{idColorValid}</p>}
                    </div>
                    <div className="mb-3">
                        <CFormLabel >Imagen</CFormLabel>
                        <CFormInput type="file" name='imagen' onChange={onInputChange} accept=".png, .jpg, .jpeg" />
                    </div>
                    <div>
                        {!!imagenValid && formSubmitted && <p className="text-sm text-danger mb-0">{imagenValid}</p>}
                    </div>

                    <CFormSelect aria-label="Default select example" name='estado' value={estado} onChange={onInputChange}>
                        <option value="1">Activo</option>
                        <option value="0">Eliminar</option>
                    </CFormSelect>
                    <div className='text-end p-3'>
                        <CButton color="primary" className="px-4" type='submit'>
                            Guardar
                        </CButton>
                    </div>
                </CForm>
            </CCardBody>
        </CCard>
    )
}

export default Formulario
