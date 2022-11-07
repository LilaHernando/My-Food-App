import React from "react";
//import { useDispatch } from "react-redux";

export default function CreateRecipe() {
  //const dispatch = useDispatch();
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
    //e.preventDefault();
    // dispatch();
    //actions.createRecipe(input)
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
            max={10}
            min={1} //controlado con js?
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
          <label>
            Diet
            <br />
            <label>Ketogenic</label>
            <input type={"checkbox"} name="diet" onChange={handleChange} />
            <br />
            <label>Vegetarian</label>
            <input type={"checkbox"} name="diet" onChange={handleChange} />
            <br />
            <label>Gluten Free</label>
            <input type={"checkbox"} name="diet" onChange={handleChange} />
            <br />
            <label>Lacto Vegetarian</label>
            <input type={"checkbox"} name="diet" onChange={handleChange} />
            <br />
            <label>Ovo Vegetarian</label>
            <input type={"checkbox"} name="diet" onChange={handleChange} />
            <br />
            <label>Vegan</label>
            <input type={"checkbox"} name="diet" onChange={handleChange} />
            <br />
            <label>Pescetarian</label>
            <input type={"checkbox"} name="diet" onChange={handleChange} />
            <br />
            <label>Paleo</label>
            <input type={"checkbox"} name="diet" onChange={handleChange} />
            <br />
            <label>Primal</label>
            <input type={"checkbox"} name="diet" onChange={handleChange} />
            <br />
            <label>Low Fodmap</label>
            <input type={"checkbox"} name="diet" onChange={handleChange} />
            <br />
            <label>Whole 30</label>
            <input type={"checkbox"} name="diet" onChange={handleChange} />
          </label>
        </div>
        <br />

        <div>
          <button type={"submit"}>Let's create it!</button>
        </div>
      </form>
    </div>
  );
}
