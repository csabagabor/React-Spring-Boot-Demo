import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpAppClientService from "../../../../api/signup/SignUpAppClientService";
import styles from "../../../../css/Forms.module.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [checked, setCheckBoxChecked] = useState("other");
  const [error, setError] = useState(false);
  const [info, setInfo] = useState({
    username: "",
    fullName: "",
    role: "USER",
    email: "",
    password: "",
    repeatpassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!info.username) {
      errors.username = "Required";
    } else if (info.username.length < 5) {
      errors.username = "Minimum 5 char";
    }

    if (!info.fullName) {
      errors.fullName = "Required";
    } else if (info.fullName.length < 2 || info.fullName.length > 20) {
      errors.fullName = "2 to 20 char";
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(info.email)) {
      errors.email = "Invalid email address";
    }

    if (!info.password) {
      errors.password = "Required";
    }
    if (!info.repeatpassword) {
      errors.repeatpassword = "Repeate";
    }
    if (info.password !== info.repeatpassword) {
      errors.repeatpassword = "Passwords don't match";
    }

    return errors;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    let errors = validate(info);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log(info);
      setLoading(true);
      await SignUpAppClientService(info)
        .then((response) => {
          if (response.status === 201) {
            navigate("/login");
          }
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
        });
    } else {
      console.log(errors);
    }
  };

  return (
    <>
      <main className={styles.form_style}>
        <h2>Sign up</h2>
        {error && (
          <div className={styles.errors}>
            This username or email already exist.
          </div>
        )}

        <form className={styles.signup_form} onSubmit={submitHandler}>
          <section className={styles.form_field}>
            <input
              id="name"
              onChange={(e) => setInfo({ ...info, username: e.target.value })}
              type="text"
              name="name"
            />
            <label htmlFor="name" className={styles.label_name}>
              <span className={styles.content_name}>Username</span>
              {errors.username && (
                <small className={styles.errors}>{errors.username}</small>
              )}
            </label>
          </section>

          <section className={styles.form_field}>
            <input
              id="fullName"
              type="text"
              name="fullName"
              onChange={(e) => setInfo({ ...info, fullName: e.target.value })}
            />
            <label htmlFor="fullName" className={styles.label_name}>
              <span className={styles.content_name}>Full Name</span>
              {errors.fullName && (
                <small className={styles.errors}>{errors.fullName}</small>
              )}
            </label>
          </section>

          <section className={styles.form_field}>
            <label id="role" className={styles.label_name}>
              <span className={styles.content_name}>Role</span>
            </label>
          </section>

          <section className={styles.checkbox_choice_section}>
            <input
              onClick={() => setCheckBoxChecked("ADMIN")}
              onChange={(e) => setInfo({ ...info, role: "ADMIN" })}
              checked={checked === "ADMIN"}
              type="checkbox"
              id="checkbox1"
            />
            <label className={styles.checkbox} htmlFor="checkbox1">
              ADMIN
            </label>
            <input
              onClick={() => setCheckBoxChecked("USER")}
              onChange={(e) => setInfo({ ...info, role: "USER" })}
              checked={checked === "USER"}
              type="checkbox"
              id="checkbox2"
            />
            <label className={styles.checkbox} htmlFor="checkbox2">
              USER
            </label>
          </section>

          <section className={styles.form_field}>
            <input
              id="email"
              name="email"
              type="email"
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
            />
            <label htmlFor="email" className={styles.label_name}>
              <span className={styles.content_name}>Email</span>
              {errors.email && (
                <small className={styles.errors}>{errors.email}</small>
              )}
            </label>
          </section>

          <section className={styles.form_field}>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => setInfo({ ...info, password: e.target.value })}
            />

            <label htmlFor="password" className={styles.label_name}>
              <span className={styles.content_name}>Password</span>
              {errors.password && (
                <small className={styles.errors}>{errors.password}</small>
              )}
            </label>
          </section>

          <section className={styles.form_field}>
            <input
              id="repassword"
              name="repassword"
              type="password"
              onChange={(e) =>
                setInfo({ ...info, repeatpassword: e.target.value })
              }
            />

            <label htmlFor="repassword" className={styles.label_name}>
              {!errors.repeatpassword && (
                <span className={styles.content_name}>Confirm Password</span>
              )}
              {errors.repeatpassword && (
                <small className={styles.errors}>{errors.repeatpassword}</small>
              )}
            </label>
          </section>

          <section className={styles.form_field}>

            {!loading && (
              <button id="button" type="submit" className={styles.button}>
                Sign up
              </button>
            )}
          </section>
        </form>
      </main>


    </>
  );
};

export default SignUp;
