import React from "react";
import { render } from "react-dom";
import { withFormik, Form, Field } from "formik";
import Yup from "yup";

const App = ({ values, errors, touched, isSubmitting }) => (
  <Form>
    <div>
      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field type="email" name="email" placeholder="Email" />
    </div>
    <div>
      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field type="password" name="password" placeholder="Password" />
    </div>
    <lable>
      <Field type="checkbox" name="newsletter" checked={values.newsletter} />
      join our newsletter
    </lable>
    <Field component="select" name="plan">
      <option />
      <option value="premium">Premium</option>
      <option value="free">Free</option>
    </Field>
    <button disabled={isSubmitting}>Submit</button>
  </Form>
);

const FormikApp = withFormik({
  mapPropsToValues({ email, password, newsletter, plan }) {
    return {
      email: email || "",
      password: password || "",
      newsletter: newsletter || false,
      plan: plan || ""
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("email you entered is not valid")
      .required("you need to inter a password"),
    password: Yup.string()
      .min(7, "your password is not long enough")
      .required("password is needed")
  }),
  handleSubmit(values, { resetForm, setError, setSubmitting }) {
    setTimeout(() => {
      if (values.email === "ameerkabir@yahoo.com") {
        setError({ email: "the email is already taken valid" });
      } else {
        resetForm();
      }
      setSubmitting(false);
    }, 2000);
  }
})(App);
render(<FormikApp />, document.getElementById("root"));
