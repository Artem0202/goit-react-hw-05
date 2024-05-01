import { Field, Form, Formik } from "formik";
import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";
import { IoIosSearch } from "react-icons/io";

const notify = () => toast.error("Please fill in the field!");

export default function SearchBar({ onSearch }) {
  return (
    <div className={css.search}>
      <Toaster position="top-right" reverseOrder={false} />
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, actions) => {
          if (values.query == 0) {
            notify();
          }
          onSearch(values.query);
          actions.resetForm();
        }}
      >
        <Form className={css.form}>
          <div className={css.field}>
            <Field
              className={css.input}
              type="text"
              name="query"
              autoComplete="off"
              autoFocus
              placeholder="Search movies"
            />
            <button className={css.button} type="submit">
              <IoIosSearch /> Search
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
