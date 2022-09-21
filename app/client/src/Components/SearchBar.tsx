import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import ky from 'ky';

export const FullTextSearchBar = () => (
  <div>
    <Formik
      initialValues={{ search: "" }}
      onSubmit={async values => {
        await new Promise(resolve => setTimeout(resolve, 500));
        alert(JSON.stringify(values, null, 2));
      }}
      validationSchema={Yup.object().shape({
        search: Yup.string().required()
      })}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <label htmlFor="Search" style={{ display: "block" }}>
              Search
            </label>
            <input
              id="search"
              placeholder="Search the titles and abstracts of papers"
              type="text"
              value={values.search}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.search && touched.search
                  ? "text-input error"
                  : "text-input"
              }
            />
            {errors.search && touched.search && (
              <div className="input-feedback">{errors.search}</div>
            )}

            <button
              type="button"
              className="outline"
              onClick={handleReset}
              disabled={!dirty || isSubmitting}
            >
              Clear
            </button>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        );
      }}
    </Formik>
  </div>
);