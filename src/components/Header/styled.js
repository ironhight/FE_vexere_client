import styled from "styled-components";
import { Modal, InputNumber, DatePicker } from "antd";

export const HeaderContainer = styled.header`
  background-color: ${props => props.theme.headerColor};
  position: sticky;
  top: 0;
  z-index: 999;

  .logo {
    width: auto;
    height: 35px;
  }

  .login-link:hover {
    color: var(--primary-color) !important;
  }
`;

export const ModalCustom = styled(Modal)`
  .ant-modal-footer {
    display: none;
  }
`;

export const InputNumberCustom = styled(InputNumber)`
  display: block !important;
  width: 100% !important;
`;

export const DatePickerCustom = styled(DatePicker)`
  display: block !important;
`;
