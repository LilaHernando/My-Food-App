import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getDiets, postRecipe } from "../../actions/index";
import { Link } from "react-router-dom";
import s from "./create.module.css";

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
    <div className={s.mainWrapper}>
      <div className={s.blur}>
        <section className={s.contentWrapper}>
          <div>
            <Link to="/home">
              <button className={s.backButton}>Home</button>
            </Link>
          </div>
          <br />
          <h1 className={s.title}>Let's create your own recipe!</h1>
          <form className={s.formWrapper} onSubmit={(e) => handleSubmit(e)}>
            <div className={s.boxWrapper}>
              <label className={s.label}>name:</label>
              <input
                className={s.nameInput}
                type="text"
                name="name"
                value={state.name}
                placeholder="Write a name for your recipe..."
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            {errors.name && <h5 className="errorMessage">{errors.name}</h5>}
            <div className={s.boxWrapper}>
              <label className={s.label}>Summary</label>
              <input
                className={s.nameInput}
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
            <div className={s.boxWrapper}>
              <label className={s.label}>HealthScore</label>
              <input
                className={s.nameInput}
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
            <div className={s.boxWrapper}>
              <label className={s.label}>Image</label>
              <input
                className={s.nameInput}
                type="url"
                name="image"
                value={state.image}
                placeholder="image url"
                onChange={handleInputChange}
              />
            </div>
            {errors.image && <h5 className="errorMessage">{errors.image}</h5>}
            <div className={s.boxWrapper}>
              <label className={s.label}>Step by step</label>
              <input
                className={s.nameInput}
                type="text"
                name="steps"
                value={state.steps}
                placeholder="steps"
                onChange={handleInputChange}
              />
            </div>
            {errors.steps && <h5 className="errorMessage">{errors.steps}</h5>}
            <div className={s.boxWrapper}>
              <label className={s.label}>Type of diet</label>
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
            <div className={s.submitButtonWrapper}>
              {state.name && state.summary ? (
                <button className={s.submitButton} type="submit">
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
