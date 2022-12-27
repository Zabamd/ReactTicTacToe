import "./Field.css";

export default function Field({ value, clickAction }) {
  return (
    <button className="field" onClick={clickAction}>
      {value}
    </button>
  );
}
