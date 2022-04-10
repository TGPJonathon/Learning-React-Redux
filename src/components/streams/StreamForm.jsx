import React, { useState, useEffect } from "react";
import { Form, Field, FormSpy } from "react-final-form";
import { useDispatch } from "react-redux";

import { updateFormState } from "../../reducers/formSlice";

const FormStateToRedux = ({ form }) => {
  const dispatch = useDispatch();
  const updateForm = (form, state) => {
    dispatch(updateFormState({ form, state }));
  };
  return <FormSpy onChange={(state) => updateForm(form, state)} />;
};

const renderFields = (label, input, meta) => {
  return (
    <div className={meta.error && meta.touched ? "field error" : ""}>
      <label>{label}</label>
      <input {...input} type="text" placeholder={label} />
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </div>
  );
};

const StreamForm = (props) => {
  const [mounted, setMounted] = useState(false);
  const [initialValues, setInitialValues] = useState(false);

  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };

  useEffect(() => {
    setMounted(true);
    if (props.initialValues) {
      setInitialValues(true);
    }
  }, [props.initialValues]);

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit, form, submitting, pristine }) => (
        <form className="ui form" onSubmit={handleSubmit}>
          {mounted && <FormStateToRedux form="StreamForm" />}
          <div className="field">
            <Field
              name="title"
              validate={required}
              initialValue={initialValues ? props.initialValues.title : ""}
            >
              {({ input, meta }) => renderFields("Title", input, meta)}
            </Field>
          </div>
          <div className="field">
            <Field
              name="description"
              validate={required}
              initialValue={
                initialValues ? props.initialValues.description : ""
              }
            >
              {({ input, meta }) => renderFields("Description", input, meta)}
            </Field>
          </div>
          <button className="ui button primary">Submit</button>
        </form>
      )}
    </Form>
  );
};

const required = (value) => (value ? undefined : "Gotta Type Something");

export default StreamForm;
