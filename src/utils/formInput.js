import React from "react";
import { Form, Input, Icon } from "antd";
import { Field } from "formik";

const formInput = (
  touched,
  errors,
  value,
  label,
  iconType,
  inputType = "text"
) => {
  return (
    <Form.Item
      validateStatus={touched && errors && "error"}
      help={touched && errors}
    >
      <label className="mb-0">{label}</label>
      <Field
        name={value}
        render={({ field }) => (
          <Input
            suffix={
              <Icon
                type={iconType}
                style={{
                  color: "rgba(0,0,0,.25)"
                }}
              />
            }
            type={inputType}
            size="large"
            placeholder="Enter your value..."
            {...field}
          />
        )}
      />
    </Form.Item>
  );
};

export default formInput;
