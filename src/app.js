const app = {
  title: 'Indecision App',
  subtitle: 'some info',
  options: []
};
const appRoot = document.getElementById('app');

const onFormSubmit = e => {
  e.preventDefault();
  const option = e.target.elements.option.value;
  if (option) {
    app.options.push(option);
    e.target.elements.option.value = '';
    render();
  }
};

const onRemoveAll = () => {
  app.options = [];
  render();
};

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  if (option) alert(option);
};

const render = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>Age: {app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'here your options' : 'No options'}</p>
      <button disabled={!app.options.length} onClick={onMakeDecision}>What should I do?</button>
      <button onClick={onRemoveAll}>Remove All</button>
      <br />

      <ol>
        {app.options.map((p, i) => {
          return <li key={i}>{p}</li>;
        })}
      </ol>
      <form onSubmit={onFormSubmit}>
        <input text="text" name="option" />
        <button>Add Option</button>
      </form>
    </div>
  );

  ReactDOM.render(template, appRoot);
};

render();
