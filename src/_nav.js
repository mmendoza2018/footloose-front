import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Modulos',
  },
  {
    component: CNavGroup,
    name: 'Productos',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Agregar',
        to: '/producto/registro',
      },
      {
        component: CNavItem,
        name: 'Gestion',
        to: '/producto/tabla',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Manytenimientos',
  },
  {
    component: CNavGroup,
    name: 'Modelos',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Registro',
        to: '/',
        disabled: true, 
      },
      {
        component: CNavItem,
        name: 'Gestion',
        to: '/',
        disabled: true, 
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Marcas',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Registro',
        to: '/',
        disabled: true, 
      },
      {
        component: CNavItem,
        name: 'Gestion',
        to: '/',
        disabled: true, 
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Tallas',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Registro',
        to: '/',
        disabled: true, 
      },
      {
        component: CNavItem,
        name: 'Gestion',
        to: '/',
        disabled: true, 
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Colores',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Registro',
        to: '/',
        disabled: true, 
      },
      {
        component: CNavItem,
        name: 'Gestion',
        to: '/',
        disabled: true, 
      },
    ],
  },
]

export default _nav
