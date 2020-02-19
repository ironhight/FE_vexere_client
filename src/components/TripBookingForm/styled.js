import styled from "styled-components";
import { DatePicker, InputNumber, Button } from "antd";

export const DatePickerCustom = styled(DatePicker)`
  display: block !important;
`;

export const InputNumberCustom = styled(InputNumber)`
  display: block !important;
  width: 100% !important;
`;

export const ButtonCustom = styled(Button)`
  display: flex !important;
  align-items: center;
  justify-content: center;
`;

export const TripBookingContainer = styled.div`
  height: calc(100vh - 51px);
  display: flex;
  align-items: center;
  justify-content: center;

  .trip-booking__form {
    padding: 16px;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 8px;
  }
`;
