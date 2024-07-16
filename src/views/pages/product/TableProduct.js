import { useCallback, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { CButton, CCard, CCardBody, CForm, CFormLabel, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormInput } from '@coreui/react';
import { getProductos } from '../../../services/productos';
import useModals from '../../../hooks/useModal';
import { Modal } from '../../../components/modal/Modal';
import Formulario from './Formulario';
import { initialForm } from './config';
import PdfGenerator from '../../../components/reporte-pdf/PdfGenerator';
import { PDFViewer } from '@react-pdf/renderer';


function TableProduct() {
  const [isOpenModal, openModal, closeModal] = useModals();
  const [isOpenModalPDF, openModalPDF, closeModalPDF] = useModals();
  const [filteredData, setFilteredData] = useState([]); // Estado para los datos filtrados
  const [data, setData] = useState([]);
  const [dataForm, setdataForm] = useState(initialForm);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    getProductoDB();
  }, []);


  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase().trim();
    const filtered = data.filter(item =>
      item.PROD_nombre.toLowerCase().includes(value)// Filtrar por título
    );
    setFilteredData(filtered);
  };

  const updateRow = useCallback((updatedRow) => {
    setData(prevData => prevData.map(item => item.PROD_id === updatedRow.PROD_id ? updatedRow : item));
    setFilteredData(prevData => prevData.map(item => item.PROD_id === updatedRow.PROD_id ? updatedRow : item));
  }, []);

  const removeRow = useCallback((rowToRemove) => {
    setData(prevData => prevData.filter(item => item.PROD_id !== rowToRemove.PROD_id));
    setFilteredData(prevData => prevData.filter(item => item.PROD_id !== rowToRemove.PROD_id));
  }, []);

  const getProductoDB = async () => {
    try {
      let response = await getProductos();
      const productosActivos = response.data.filter(producto => producto.PROD_estado === 1);
      setData(productosActivos)
      setFilteredData(productosActivos)
    } catch (error) {
      console.log('error :>> ', error);
    }

  }

  const exportToExcel = () => {

    const exportFields = ['PROD_id', 'PROD_nombre', 'PROD_precio_venta', "MAR_descripcion", "MOD_descripcion", "TALL_descripcion", "COL_descripcion"];

    // Filtra los datos para incluir solo los campos seleccionados
    const filteredExportData = filteredData.map(item => {
      const filteredItem = {};
      exportFields.forEach(field => {
        filteredItem[field] = item[field];
      });
      return filteredItem;
    });

    const ws = XLSX.utils.json_to_sheet(filteredExportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Filtered Data');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(dataBlob, 'filtered_data.xlsx');
  };

  const columns = [
    {
      name: 'ID',
      selector: row => row.PROD_id,
    },
    {
      name: 'Nombre',
      selector: row => row.PROD_nombre,
    },
    {
      name: 'Precio',
      selector: row => row.PROD_precio_venta,
    },
    {
      name: 'Imagen',
      cell: row => <img src={`data:image/png;base64,${row.imageBase64}`} alt="Imagen" style={{ width: '50px', height: '50px' }} />,
    },
    {
      name: 'Marca',
      selector: row => row.MAR_descripcion,
    },
    {
      name: 'Modelo',
      selector: row => row.MOD_descripcion,
    },
    {
      name: 'Color',
      selector: row => row.COL_descripcion,
    },
    {
      name: 'Talla',
      selector: row => row.TALL_descripcion,
    },
    {
      name: 'Acciones',
      cell: row => (
        <CDropdown>
          <CDropdownToggle color="info" size="sm">Acciones</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => updateButton(row)} style={{ cursor: "pointer" }}>Editar</CDropdownItem>
            <CDropdownItem style={{ cursor: "pointer" }} onClick={() => handleGeneratePdf(row)}>PDF</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      ),
    },
  ];

  const handleGeneratePdf = (product) => {
    setSelectedProduct(product); 
    openModalPDF()// Establece el producto seleccionado para generar el PDF
    // Aquí podrías abrir un modal o directamente llamar a la generación del PDF
    // Dependiendo de cómo esté implementado tu componente PdfGenerator
  };

  const updateButton = (data) => {
    openModal();
    setdataForm({
      id: data.PROD_id,
      nombre: data.PROD_nombre,
      idMarca: { value: data.MAR_id01, label: data.MAR_descripcion },
      idModelo: { value: data.MOD_id01, label: data.MOD_descripcion },
      idTalla: { value: data.TALL_id01, label: data.TALL_descripcion },
      idColor: { value: data.COL_id01, label: data.COL_descripcion },
      precioVenta: data.PROD_precio_venta,
      imagen: data.PROD_imagen,
      estado: data.PROD_estado
    });

  }

  return (
    <div className="bg-body-tertiary min-vh-100 align-items-center">
      <div className='d-flex justify-content-between mb-3'>
        <CButton color="success" className="px-4" type='submit' onClick={exportToExcel}>
          Export excel
        </CButton>
        <CFormInput placeholder="Busque su producto" style={{ width: "200px" }} type="text" onChange={handleFilter} />
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
      />
      <Modal
        openModal={openModal}
        isOpen={isOpenModal}
        closeModal={closeModal}
        size={"modal-sm"}
        title={"Actualizar"}
      >
        <Formulario initialForm={dataForm} closeModal={closeModal} updateRow={updateRow} removeRow={removeRow} />
      </Modal>
      <Modal
        openModal={openModalPDF}
        isOpen={isOpenModalPDF}
        closeModal={closeModalPDF}
        size={"modal-md"}
        title={""}>
        {selectedProduct && <PDFViewer height={500} width={"100%"}>
          <PdfGenerator product={selectedProduct} />
        </PDFViewer>}
      </Modal>

    </div>
  );
};

export default TableProduct