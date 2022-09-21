import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import ky from 'ky';
import { atom, useRecoilState } from "recoil";
import { textSearchResultsAtom } from "../App";



export function FullTextSearchBar(): JSX.Element {
  const [textSearchResults, setTextSearchResults] = useRecoilState(textSearchResultsAtom);

  return (<div>
  <Formik
    initialValues={{ search: "" }}
    onSubmit={async values => {
      const json = await ky.post('http://127.0.0.1:8000/full-text-search', {json: {searchString: values.search}}).json();
      setTextSearchResults(json["results"] as never[]);
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
</div>)
}
