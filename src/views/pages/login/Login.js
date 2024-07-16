import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import validate from './validateForm'
import { useForm } from '../../../hooks/useForms'
import { initialForm } from './config'
import { AuthContext } from '../../../context/auth/AuthContext'
import { postAuth } from '../../../services/auth'
import { toast } from 'react-toastify'

const Login = () => {

  const { login } = useContext(AuthContext);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navigate = useNavigate();
  const formValidations = validate();

  const {
    formState,
    user,
    password,
    onInputChange,
    isFormValid,
    userValid,
    passwordValid,
  } = useForm(initialForm, formValidations);

  const handleLogin = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    const { user, password } = formState;

    postAuth({ user, password }).then(
      ({ data, message = null, status }) => {
        if (status === 200) {
          console.log('data :>> ', data);
          const { USU_nombres, USU_apellidos, USU_id } = data.usuario[0];
          const token = data.token;
          const nombres = USU_nombres + " " + USU_apellidos;
          const rutaInicio = "/producto/tabla";

          login({ nombres, token, USU_id });

          setTimeout(() => {
            navigate(rutaInicio, {
              replace: true,
            });
          }, 1000);
        } else {
          if (status === 401) {
            toast.error(
              "el usuario ingresado no cuenta con credenciales correctas",
              {
                position: "bottom-right",
              }
            );
          } else {
            toast.error(`Ocurrio un error en el servidor`, {
              position: "bottom-right",
            });
          }
        }
      }
    );
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1 className='text-center'>Login</h1>
                    <CInputGroup className="mb-2">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Usuario" type="text" value={user} name="user" onChange={onInputChange} autoComplete="username" />
                    </CInputGroup>
                    <div>
                      {!!userValid && formSubmitted && <p className="text-sm text-danger mb-0">{userValid}</p>}
                    </div>
                    <CInputGroup className="mb-2">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Contraseña"
                        value={password} name="password" onChange={onInputChange}
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <div>
                      {!!passwordValid && formSubmitted && <p className="text-sm text-danger mb-0">{passwordValid}</p>}
                    </div>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type='submit'>
                          Ingresar
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
