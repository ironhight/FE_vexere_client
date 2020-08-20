import React, { PureComponent } from "react";
import { ModalCustom } from "../styled";
import { MailOutlined, UserOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { object, string, ref } from "yup";
import { withFormik } from "formik";
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
      isSubmitting,
    } = this.props;
    
    return (
      <ModalCustom
        title={
          <>
            <h3 className="modal-title text-center">Đăng ký</h3>
            <p className="text-center mb-0">
              Chưa có tài khoản?{" "}
              <span className="cursor-point text-primary" onClick={() => loginModal(true)}>
                Đăng nhập
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
            {formInput(touched.email, errors.email, "email", "Email", <MailOutlined />)}

            {formInput(touched.fullName, errors.fullName, "fullName", "Tên", <UserOutlined />)}
            <div className="row">
              <div className="col-6">
                {formInput(
                  touched.password,
                  errors.password,
                  "password",
                  "Mật khẩu",
                  <LockOutlined />,
                  "password"
                )}
              </div>
              <div className="col-6">
                {formInput(
                  touched.password2,
                  errors.password2,
                  "password2",
                  "Nhập lại mật khẩu",
                  <LockOutlined />,
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
                  "Số điện thoại",
                  <PhoneOutlined />
                )}
              </div>
              <div className="col-6">
                <FormItem
                  validateStatus={touched.dayOfBirth && errors.dayOfBirth && "error"}
                  help={touched.dayOfBirth && errors.dayOfBirth}
                >
                  <label className="mb-0">Ngày sinh</label>
                  <DatePicker
                    format="YYYY-MM-DD"
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
                Đăng ký
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
      dayOfBirth: "",
    };
  },
  validationSchema: object().shape({
    email: string().required("Chưa nhập email").email("Email không đúng định dạng"),
    fullName: string().required("Chưa nhập tên"),
    password: string().required("Chưa nhập mật khẩu").min(3, "Mật khẩu phải có ít nhất 3 ký tự"),
    password2: string()
      .required("Chưa nhập lại mật khẩu")
      .oneOf([ref("password"), null], "Mật khẩu nhập lại không khớp"),
    phoneNumber: string().required("Chưa nhập số điện thoại"),
    dayOfBirth: string().required("Chưa nhập ngày sinh"),
  }),
  handleSubmit: (values, { resetForm, props, setFieldError, setSubmitting }) => {
    api
      .post(`/users`, values)
      .then((res) => {
        console.log("thanhcong");
        setSubmitting(false);
        swal({
          text: "Tạo mới người dùng thành công!",
          icon: "success",
          buttons: false,
          timer: 1500,
        }).then(() => {
          resetForm();
          props.registerModal(false);
        });
      })
      .catch((err) => {
        console.log("errs");
        setSubmitting(false);
        swal({
          text: "Đã có lỗi xảy ra",
          icon: "error",
          buttons: false,
          timer: 1500,
        });
        setFieldError("email", err.response.data.email);
        setFieldError("phoneNumber", err.response.data.phoneNumber);
      });
  },
});

export default withFormikHOC(RegisterForm);
