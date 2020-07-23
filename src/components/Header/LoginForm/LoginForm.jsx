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
        title={<h3 className="modal-title text-center">Login</h3>}
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
              "Password",
              <LockOutlined />,
              "password"
            )}
            <div className="input-group text-center mb-3 justify-content-center">
              Are you member?
              <span className="text-primary ml-1 cursor-point" onClick={() => registerModal(true)}>
                Register
              </span>
            </div>
            <div className="input-group">
              <Button htmlType="submit" type="primary" size="large" block>
                Login
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
    email: string().required("Email is required").email("Email is invalid"),
    password: string()
      .required("Password is required")
      .min(3, "Password must have min 3 characters"),
  }),

  handleSubmit: (values, { resetForm, setFieldValue, setFieldError, props, setSubmitting }) => {
    setFieldValue("spinning", true);
    api
      .post(`users/login`, values)
      .then((res) => {
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
          title: "Signed in successfully",
          footer: `Welcome ${jwtDecode(res.data.token).fullName}`,
        });
      })
      .catch((err) => {
        setSubmitting(false);
        setFieldError("email", err.response.data);
        setFieldError("password", err.response.data);
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
