import styled from "styled-components";
import { Wrapper } from "../../styled";

export const Avatar = styled(Wrapper)`
  .info {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    padding: 8px 16px;
  }

  .name {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const UploadAvatar = styled.div`
  position: relative;
  width: 108px;
  height: 108px;
  margin: 0 auto 8px auto;
  border: 1px dashed #d9d9d9;
  border-radius: 100%;
  padding: 4px;

  label {
    width: 100%;
    height: 100%;
  }

  img {
    border-radius: 100%;
    width: 100%;
    height: 100%;
  }

  .btn-upload {
    background-color: #fafafa;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    opacity: ${(props) => (props.isLoading ? 1 : 0)};
    transition: opacity 0.2s ease-in-out;
    pointer-events: none;
  }

  &:hover {
    .btn-upload {
      opacity: 0.5;
    }
  }
`;
