import React, { PureComponent } from "react";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { ModalCustom } from "../styled";
import { Button, Spin } from "antd";
import { object, string } from "yup";
import { withFormik } from "formik";
import { connect } from "react-redux";
import api from "../../../api";
import jwtDecode from "jwt-decode";
import formInput from "../../../utils/formInput";
import { authLogin } from "../../../redux/actions/auth";
import setAuthToken from "../../../utils/setAuthToken";
import Swal from "sweetalert2";

class LoginForm extends PureComponent {
  render() {
    const {
      signInVisible,
      errors,
      touched,
      loginModal,
      registerModal,
      handleSubmit,
      isSubmitting,
    } = this.props;

    return (
      <ModalCustom
        title={<h3 className="modal-title text-center">Đăng nhập</h3>}
        footer={[null, null]}
        visible={signInVisible}
        onCancel={() => loginModal(false)}
      >
        <Spin spinning={isSubmitting} tip="Loading...">
          <form onSubmit={handleSubmit}>
            {formInput(touched.email, errors.email, "email", "Email", <MailOutlined />)}
            {formInput(
              touched.password,
              errors.password,
              "password",
              "Mật khẩu",
              <LockOutlined />,
              "password"
            )}
            <div className="input-group text-center mb-3 justify-content-center">
              Chưa có tài khoản?
              <span className="text-primary ml-1 cursor-point" onClick={() => registerModal(true)}>
                Đăng ký
              </span>
            </div>
            <div className="input-group">
              <Button htmlType="submit" type="primary" size="large" block>
                Đăng nhập
              </Button>
            </div>
          </form>
        </Spin>
      </ModalCustom>
    );
  }
}

const withFormikHOC = withFormik({
  mapPropsToValues() {
    return {
      email: "",
      password: "",
    };
  },

  validationSchema: object().shape({
    email: string().required("Chưa nhập email").email("Email không đúng định dạng"),
    password: string().required("Chưa nhập mật khẩu").min(3, "Mật khẩu phải có ít nhất 3 ký tự"),
  }),

  handleSubmit: (values, { resetForm, setFieldValue, setFieldError, props, setSubmitting }) => {
    setFieldValue("spinning", true);
    api
      .post(`users/login`, values)
      .then((res) => {
        if (res.data.status === 400) {
          return Promise.reject({ message: res.data.message });
        }
        setSubmitting(false);
        setAuthToken(res.data.token);
        resetForm();
        props.loginModal(false);
        props.authLogin(res.data.token);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-start",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Đăng nhập thành công",
          footer: `Chào mừng ${jwtDecode(res.data.token).fullName}`,
        });
      })
      .catch((err) => {
        setSubmitting(false);
        err.message.includes("Email")
          ? setFieldError("email", err.message)
          : setFieldError("password", err.message);
      });
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    authLogin: (payload) => {
      dispatch(authLogin(payload));
    },
  };
};

export default connect(null, mapDispatchToProps)(withFormikHOC(LoginForm));
