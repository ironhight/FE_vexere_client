import styled from "styled-components";
import FooterImg from "../../assets/images/footer-bg.jpg";

export const FooterBg = styled.div`
  background-image: url(${FooterImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom center;
  padding-bottom: 18%;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;

    @media screen and (min-width: 1200px) {
      max-width: 1140px;
    }

    * {
      color: #fff;
    }
  }
`;

export const FooterContent = styled.div`
  background-color: #16283a;
  padding: 32px 0;

  ul {
    margin: 0 -16px;
  }

  li {
    float: left;
    padding: 0 16px;
  }

  a {
    color: #fff;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: var(--primary);
    }
  }
`;
