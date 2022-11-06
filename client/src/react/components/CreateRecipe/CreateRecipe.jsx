import React from "react";
import { useDispatch } from "react-redux";

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const [input, setInput] = React.useState({
    name: "",
    summary: "",
    healthScore: "",
    steps: "",
    image: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      //actions.createRecipe(input)
      );
  };

  return (
    <div>
      <div>Create your own recipe!</div>
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type={"text"}
            name="name"
            value={input.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Summary</label>
          <input
            type={"text"}
            name="summary"
            value={input.summary}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Health Score</label>
          <input
            type={"number"}
            name="healthScore"
            value={input.healthScore}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Steps</label>
          <input
            type={"text"}
            name="steps"
            value={input.steps}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Image</label>
          <input
            type={"url"}
            name="image"
            value={input.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type={"submit"}>Let's create it!</button>
        </div>
      </form>
    </div>
  );
}
