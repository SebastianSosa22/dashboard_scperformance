import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  IconDashboard,
  IconCalendary,
  IconOrders,
  IconBoxes,
  IconUsers,
  IconCar,
  IconMoney,
  IconReports,
  IconConfig
} from '../Assets/Icons';

const menuItems = [
  {
    path: "/Dashboard",
    icon: <IconDashboard />,
    name: "Dashboard",
    subItems: [ // Submenús para "Citas/Agendamientos"
      { path: "/appointments/new", name: "Nueva Cita" },
      { path: "/appointments/list", name: "Listado de Citas" },
      { path: "/appointments/calendar", name: "Calendario" },
    ],
  },
  {
    path: "/Appointments",
    icon: <IconCalendary />,
    name: "Citas/Agendamientos",
    subItems: [ // Submenús para "Citas/Agendamientos"
      { path: "/appointments/new", name: "Nueva Cita" },
      { path: "/appointments/list", name: "Listado de Citas" },
      { path: "/appointments/calendar", name: "Calendario" },
    ],
  },
  { path: "/work-orders", icon: <IconOrders />, name: "Órdenes de Trabajo" },
  { path: "/inventory", icon: <IconBoxes />, name: "Inventario" },
  { path: "/customers", icon: <IconUsers />, name: "Clientes" },
  { path: "/vehicles", icon: <IconCar />, name: "Vehículos" },
  { path: "/finances", icon: <IconMoney />, name: "Finanzas" },
  { path: "/reports", icon: <IconReports />, name: "Reportes/Análisis" },
  { path: "/settings", icon: <IconConfig />, name: "Configuración" }
];

const MenuContainer = styled.nav`
  height: 100vh;
  width: 250px;
  background-color: #FFFFFF;
  position: fixed;
  left: ${({ isOpen }) => (isOpen ? '0' : '-200px')};
  top: 0;
  transition: left 0.5s;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-top: 40px;
  z-index: 10;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  color: black;
  text-decoration: none;
  padding: 10px 15px;
  gap: 10px;

  &:hover {
    color: #fff;
    background-color: #37A03C;
  }
`;

const MenuToggle = styled.div`
  position: fixed;
  top: 10px;
  left: ${({ isOpen }) => (isOpen ? '210px' : '10px')}; // Posición inicial fija para abrir el menú.
  cursor: pointer;
  z-index: 11;
  transition: left 0.5s ease; // Transición suave para la posición horizontal.
  display: flex; // Mostrar ícono incluso cuando el menú está cerrado.

  svg {
    fill: currentColor;
    width: 30px;
    height: 30px;
    transition: transform 0.5s; // Transición suave para la rotación del ícono.
    transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'rotate(0)'}; // Rota el ícono cuando el menú está abierto.
  }
`;



const SubMenu = ({ subItems, isOpen }) => {
  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      {subItems.map((subItem) => (
        <StyledLink key={subItem.name} to={subItem.path} style={{ paddingLeft: '65px' }}>
          {subItem.name}
        </StyledLink>
      ))}
    </div>
  );
};

function Menu() {
  const [isOpen, setIsOpen] = useState(true);

  const [subMenuOpen, setSubMenuOpen] = useState({});



  const toggleSubMenu = (itemName) => {
    setSubMenuOpen((prev) => ({ ...prev, [itemName]: !prev[itemName] }));
  };

  return (
    <>
      <MenuToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        )}
      </MenuToggle>
      <MenuContainer isOpen={isOpen}>
        {menuItems.map((item) => (
          <React.Fragment key={item.name}>
            <div onClick={() => item.subItems ? toggleSubMenu(item.name) : null}>
              <StyledLink to={item.path}>
                <span style={{ display: 'flex', alignItems: 'center', flexDirection: isOpen ? 'row' : 'row-reverse', gap: '10px' }}>
                  {item.icon}
                  <span>{item.name}</span>
                </span>
              </StyledLink>
            </div>
            {item.subItems && <SubMenu subItems={item.subItems} isOpen={subMenuOpen[item.name]} />}
          </React.Fragment>
        ))}

      </MenuContainer>
    </>
  );
}

export default Menu;