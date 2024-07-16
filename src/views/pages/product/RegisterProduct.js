import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormTextarea,
    CRow,
} from '@coreui/react'
import Select from 'react-select';
import { getModels } from '../../../services/modelos';
import { getSizes } from '../../../services/tallas';
import { getColors } from '../../../services/colores';
import { getBrands } from '../../../services/marcas';
import { useForm } from '../../../hooks/useForms';
import { initialForm } from './config';
import validate from './validateForm';
import { postImportacion, postProductos } from '../../../services/productos';
import { toast } from 'react-toastify';
import { Modal } from '../../../components/modal/Modal';
import useModals from '../../../hooks/useModal';

const RegisterProduct = () => {
    const [modelos, setModelos] = useState({});
    const [tallas, setTallas] = useState({});
    const [colores, setColores] = useState({});
    const [marcas, setMarcas] = useState({});
    const [isOpenModal, openModal, closeModal] = useModals();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const formValidations = validate();

    const {
        nombre,
        idMarca,
        idModelo,
        idTalla,
        idColor,
        precioVenta,
        imagen,

        nombreValid,
        idMarcaValid,
        idModeloValid,
        idTallaValid,
        idColorValid,
        precioVentaValid,
        imagenValid,

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
        imagen !== "" && data.append("imagen", imagen);

        add(data);
    };

    const add = async (data) => {
        try {
            let response = await postProductos(data);
            if (response.status === 200) {
                onResetForm();
                setFormSubmitted(false)
                toast.success("Agregado con exito", {
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

    const handleImportacion = async (event) => {
        try {
            const file = event.target.files[0];
            if (file) {
                const data = new FormData();
                data.append('excel', file);

                // Aquí puedes realizar la solicitud POST con axios
                const response = await postImportacion(data);
                if (response.status === 200) {
                    toast.success("Importación exitosa", {
                        position: "bottom-right",
                    });
                    closeModal();
                }
            }
        } catch (error) {
            console.log('error :>> ', error);
        }

    };

    return (
        <>
            <CRow className='justify-content-center'>
                <CCol xs={6}>
                    <CCard className="mb-4">
                        <CCardBody>
                            <div className='text-end p-3'>
                                <CButton color="success" className="px-4" type='button' onClick={openModal}>
                                    Importacion masiva
                                </CButton>
                            </div>
                            <CForm onSubmit={handleForm}>
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
                                <div className='text-end p-3'>
                                    <CButton color="primary" className="px-4" type='submit'>
                                        Guardar
                                    </CButton>
                                </div>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <Modal
                openModal={openModal}
                isOpen={isOpenModal}
                closeModal={closeModal}
                size={"modal-md"}
                title={""}
            >
                <div className="mb-3">
                    <CFormLabel >Excel para la importación masiva</CFormLabel>
                    <CFormInput type="file" name='imagen' onChange={handleImportacion} accept=".xls,.xlsx" />
                </div>

            </Modal>
        </>
    )
}

export default RegisterProduct