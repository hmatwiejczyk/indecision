const app = {
  title: 'Indecision App',
  subtitle: 'some info',
  options: ['One', 'Two']
};

const template = (
  <div>
    <h1>{app.title}</h1>
    {app.subtitle && <p>Age: {app.subtitle}</p>}
    <p>{app.options.length > 0 ? 'here your options' : 'No options'}</p>
    <ol>
      <li>Item one</li>
      <li>Item two</li>
    </ol>
    <form>
      <input text="text" name="option" />
      <button>Add Option</button>
    </form>
  </div>
);

const appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
