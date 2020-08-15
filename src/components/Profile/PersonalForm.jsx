import React, { Component } from "react";
import { object, string } from "yup";
import { Formik, Field } from "formik";
import { Form, Input, Button, Icon, DatePicker, Spin } from "antd";
import moment from "moment";
import _ from "lodash";
import { updateAdmin } from "../../redux/actions/users.action";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { MailOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";

const FormItem = Form.Item;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

class PersonalForm extends Component {
  render() {
    const { id, email, fullName, phoneNumber, dayOfBirth, updateAdmin } = this.props;
    return (
      <Formik
        enableReinitialize={true}
        initialValues={{
          email: email,
          fullName: fullName,
          phoneNumber: phoneNumber,
          dayOfBirth: moment(dayOfBirth, "DD/MM/YYYY"),
        }}
        validationSchema={object().shape({
          email: string().required("Email is required").email("Email is invalid"),
          fullName: string().required("Full name is required"),
          phoneNumber: string()
            .matches(phoneRegExp, "Phone number is not valid")
            .required("Phone number is required"),
          dayOfBirth: string().required("Day of birth is required"),
        })}
        onSubmit={(values, { setFieldError, setSubmitting }) => {
          updateAdmin(
            id,
            values,
            () => {
              setSubmitting(false);
            },
            (err) => {
              _.map(Object.keys(err.response.data), (field) => {
                setFieldError(field, err.response.data[field]);
              });
            }
          );
        }}
        render={({ touched, errors, setFieldValue, values, handleSubmit, isSubmitting }) => (
          <Spin spinning={isSubmitting}>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-3 text-right">
                  <label className="mb-0 ant-form-item-required">E-mail</label>
                </div>
                <div className="col-9">
                  <FormItem
                    validateStatus={touched.email && errors.email && "error"}
                    help={touched.email && errors.email}
                  >
                    <Field
                      name="email"
                      render={({ field }) => (
                        // <MailOutlined />
                        <Input
                          suffix={
                            <MailOutlined
                              type="mail"
                              style={{
                                color:
                                  touched.email && errors.email ? "#f5222d" : "rgba(0,0,0,.25)",
                              }}
                            />
                          }
                          type="email"
                          size="large"
                          placeholder="Enter your email..."
                          {...field}
                        />
                      )}
                    />
                  </FormItem>
                </div>
              </div>
              <div className="row">
                <div className="col-3 text-right">
                  <label className="mb-0 ant-form-item-required">Tên đầy đủ</label>
                </div>
                <div className="col-9">
                  <FormItem
                    validateStatus={touched.fullName && errors.fullName && "error"}
                    help={touched.fullName && errors.fullName}
                  >
                    <Field
                      name="fullName"
                      render={({ field }) => (
                        <Input
                          suffix={
                            <UserOutlined
                              type="user"
                              style={{
                                color:
                                  touched.fullName && errors.fullName
                                    ? "#f5222d"
                                    : "rgba(0,0,0,.25)",
                              }}
                            />
                          }
                          type="text"
                          size="large"
                          placeholder="Enter your name..."
                          {...field}
                        />
                      )}
                    />
                  </FormItem>
                </div>
              </div>

              <div className="row">
                <div className="col-3 text-right">
                  <label className="mb-0 ant-form-item-required">Số điện thoại</label>
                </div>
                <div className="col-9">
                  <FormItem
                    validateStatus={touched.phoneNumber && errors.phoneNumber && "error"}
                    help={touched.phoneNumber && errors.phoneNumber}
                  >
                    <Field
                      name="phoneNumber"
                      render={({ field }) => (
                        <Input
                          suffix={
                            <PhoneOutlined
                              type="phone"
                              style={{
                                color:
                                  touched.phoneNumber && errors.phoneNumber
                                    ? "#f5222d"
                                    : "rgba(0,0,0,.25)",
                              }}
                            />
                          }
                          type="text"
                          size="large"
                          placeholder="Enter your phone number..."
                          {...field}
                        />
                      )}
                    />
                  </FormItem>
                </div>
              </div>

              <div className="row">
                <div className="col-3 text-right">
                  <label className="mb-0 ant-form-item-required">Ngày sinh nhật</label>
                </div>
                <div className="col-9">
                  <FormItem
                    validateStatus={touched.dayOfBirth && errors.dayOfBirth && "error"}
                    help={touched.dayOfBirth && errors.dayOfBirth}
                  >
                    <DatePicker
                      value={values.dayOfBirth}
                      format="DD/MM/YYYY"
                      size="large"
                      className="d-block"
                      name="dayOfBirth"
                      onChange={(value) =>
                        setFieldValue("dayOfBirth", value === null ? undefined : value)
                      }
                    />
                  </FormItem>
                </div>
              </div>

              <div className="row">
                <div className="col-6 offset-3">
                  <Button htmlType="submit" type="primary" size="large">
                    Cập nhật
                  </Button>
                </div>
              </div>
            </form>
          </Spin>
        )}
      />
    );
  }
}

export default connect(null, { updateAdmin })(withRouter(PersonalForm));
