// Esse componente vai ser um coringa de cada campo dos meus formularios

export function FormField(props) {
  return (
    <div className="mb-3">
      <label htmlFor={props.id}>{props.label}</label>

      <input
        className="form-control"
        type={props.type}
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        required={props.required}
        pattern={props.pattern}
        readOnly={props.readOnly}
      />
    </div>
  );
}
