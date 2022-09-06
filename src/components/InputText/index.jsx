import "./InputText.css";

export default function InputText({
  placeholder,
  id,
  value,
  type = "text",
  onChange = null,
  errorMsj = null,
}) {
  return (
    <label className="text-field" htmlFor={id}>
      <span>{placeholder}</span>
      <input type={type} id={id} name={id} value={value} onChange={onChange} />
      <div className="text-field__error-message">{errorMsj}</div>
    </label>
  );
}
