import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getDiets, postRecipe } from "../../actions/index";
import styles from "./create.module.css";

export function validate(state) {
  let errors = {};
  if (!state.name) {
    errors.name = "* Your recipe must have a name";
  } else if (!state.summary) {
    errors.summary = "* What is your recipe about?";
  } else if (
    !state.healthiness ||
    state.healthiness > 100 ||
    state.healthiness < 0
  ) {
    errors.healthiness = "HealthScore must be a number between 0 and 100";
  } else if (!state.image) {
    errors.image = "* Add an image to your recipe";
  } else if (!state.steps) {
    errors.steps = "* Teach us how to do it!";
  }
  return errors;
}

export default function PostRecipe() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.types);

  const [errors, setErrors] = useState({});
  const [state, setState] = useState({
    name: "",
    summary: "",
    healthiness: "",
    image: "",
    steps: "",
    diets: [],
  });

  function handleInputChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    setErrors(validate(state));
  }
  function handleCheck(e) {
    if (e.target.checked) {
      setState({
        ...state,
        diets: [...state.diets, e.target.value],
      });
    }
  }

  function handleSubmit(e) {
    dispatch(postRecipe(state));
    setState({
      name: "",
      summary: "",
      healthiness: "",
      image: "",
      steps: "",
      diets: [],
    });
    alert("RECIPE CREATED");
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getDiets());
  }, []);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.blur}>
        <section className={styles.contentWrapper}>
          <h1 className={styles.title}>Let's create your own recipe!</h1>
          <form
            className={styles.formWrapper}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className={styles.boxWrapper}>
              <label className={styles.label}>name:</label>
              <input
                className={styles.nameInput}
                type="text"
                name="name"
                value={state.name}
                placeholder="Write a name for your recipe..."
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            {errors.name && <h5 className="errorMessage">{errors.name}</h5>}
            <div className={styles.boxWrapper}>
              <label className={styles.label}>Summary</label>
              <input
                className={styles.nameInput}
                type="text"
                name="summary"
                value={state.summary}
                placeholder="Summary"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            {errors.summary && (
              <h5 className="errorMessage">{errors.summary}</h5>
            )}
            <div className={styles.boxWrapper}>
              <label className={styles.label}>HealthScore</label>
              <input
                className={styles.nameInput}
                type="text"
                name="healthiness"
                value={state.healthiness}
                placeholder="HealthScore"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            {errors.healthiness && (
              <h5 className="errorMessage">{errors.healthiness}</h5>
            )}
            <div className={styles.boxWrapper}>
              <label className={styles.label}>Image</label>
              <input
                className={styles.nameInput}
                type="url"
                name="image"
                value={state.image}
                placeholder="image url"
                onChange={handleInputChange}
              />
            </div>
            {errors.image && <h5 className="errorMessage">{errors.image}</h5>}
            <div className={styles.boxWrapper}>
              <label className={styles.label}>Step by step</label>
              <input
                className={styles.nameInput}
                type="text"
                name="steps"
                value={state.steps}
                placeholder="steps"
                onChange={handleInputChange}
              />
            </div>
            {errors.steps && <h5 className="errorMessage">{errors.steps}</h5>}
            <div className={styles.boxWrapper}>
              <label className={styles.label}>Type of diet</label>
              {diets?.map((d) => {
                return (
                  <span key={d.name}>
                    <input
                      key={d.id}
                      type="checkbox"
                      value={d.name}
                      name={d.name}
                      onChange={(e) => handleCheck(e)}
                    />
                    {d.name}
                  </span>
                );
              })}
            </div>
            <div className={styles.submitButtonWrapper}>
              {state.name && state.summary ? (
                <button className={styles.submitButton} type="submit">
                  Create recipe!
                </button>
              ) : null}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
