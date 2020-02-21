import React, { PureComponent } from "react";
import { ModalCustom } from "../styled";
import { object, string, ref } from "yup";
import { withFormik, Field } from "formik";
import { Form, Button, DatePicker, Spin } from "antd";
import formInput from "../../../utils/formInput";
import swal from "sweetalert";
import api from "../../../api";

const FormItem = Form.Item;

class RegisterForm extends PureComponent {
  render() {
    const {
      registerVisible,
      errors,
      touched,
      loginModal,
      registerModal,
      handleSubmit,
      setFieldValue,
      isSubmitting
    } = this.props;

    return (
      <ModalCustom
        title={
          <>
            <h3 className="modal-title text-center">Register</h3>
            <p className="text-center mb-0">
              Do you have account?{" "}
              <span
                className="cursor-point text-primary"
                onClick={() => loginModal(true)}
              >
                Login
              </span>
            </p>
          </>
        }
        footer={[null, null]}
        visible={registerVisible}
        onCancel={() => registerModal(false)}
      >
        <Spin spinning={isSubmitting} tip="Loading...">
          <form onSubmit={handleSubmit}>
            {formInput(touched.email, errors.email, "email", "Email", "mail")}

            {formInput(
              touched.fullName,
              errors.fullName,
              "fullName",
              "Full name",
              "user"
            )}
            <div className="row">
              <div className="col-6">
                {formInput(
                  touched.password,
                  errors.password,
                  "password",
                  "Password",
                  "lock",
                  "password"
                )}
              </div>
              <div className="col-6">
                {formInput(
                  touched.password2,
                  errors.password2,
                  "password2",
                  "Verify password",
                  "lock",
                  "password"
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                {formInput(
                  touched.phoneNumber,
                  errors.phoneNumber,
                  "phoneNumber",
                  "Phone number",
                  "phone"
                )}
              </div>
              <div className="col-6">
                <FormItem
                  validateStatus={
                    touched.dayOfBirth && errors.dayOfBirth && "error"
                  }
                  help={touched.dayOfBirth && errors.dayOfBirth}
                >
                  <label className="mb-0">Date of birth</label>
                  <DatePicker
                    format="DD/MM/YYYY"
                    size="large"
                    className="d-block"
                    name="dayOfBirth"
                    onChange={(string, value) => {
                      setFieldValue("dayOfBirth", value ? value : "");
                    }}
                  />
                </FormItem>
              </div>
            </div>

            <div className="input-group mt-3">
              <Button htmlType="submit" type="primary" size="large" block>
                Register
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
      fullName: "",
      password: "",
      password2: "",
      phoneNumber: "",
      dayOfBirth: ""
    };
  },
  validationSchema: object().shape({
    email: string()
      .required("Email is required")
      .email("Email is invalid"),
    fullName: string().required("Full name is required"),
    password: string()
      .required("Password is required")
      .min(3, "Password must have min 3 characters"),
    password2: string()
      .required("Verify password is required")
      .oneOf([ref("password"), null], "Passwords must match"),
    phoneNumber: string().required("Phone number is required"),
    dayOfBirth: string().required("Date of birth is required")
  }),
  handleSubmit: (
    values,
    { resetForm, props, setFieldError, setSubmitting }
  ) => {
    api
      .post(`/users`, values)
      .then(res => {
        console.log("thanhcong");
        setSubmitting(false);
        swal({
          text: res.data.statusText,
          icon: "success",
          buttons: false,
          timer: 1500
        }).then(() => {
          resetForm();
          props.registerModal(false);
        });
      })
      .catch(err => {
        console.log("errs");
        setSubmitting(false);
        swal({
          text: "Some error has occurred!",
          icon: "error",
          buttons: false,
          timer: 1500
        });
        setFieldError("email", err.response.data.email);
        setFieldError("phoneNumber", err.response.data.phoneNumber);
      });
  }
});

export default withFormikHOC(RegisterForm);
