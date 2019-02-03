# 提升状态

通常，有几个组件需要反映相同的变化数据。 我们建议将共享状态提升到最近的共同祖先。 让我们看看这是如何运作的。

在本节中，我们将创建一个温度计算器，用于计算水在给定温度下是否会沸腾。

我们将从一个名为 `BoilingVerdict` 的组件开始。 它接受 `celsius` 属性，并打印水是否沸腾：

```javascript
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
```

接下来，我们将创建一个名为 `Calculator` 的组件。 它渲染一个 `<input>`，允许您输入温度，并将其值保存在 `this.state.temperature` 中。

此外，它为当前输入值渲染 `BoilingVerdict`。

```jsx
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />

        <BoilingVerdict
          celsius={parseFloat(temperature)} />

      </fieldset>
    );
  }
}
```

[在 CodePen 上试一试](https://codepen.io/gaearon/pen/ZXeOBm?editors=0010)

## 1. 添加第二个输入

我们的新要求是，除了摄氏度输入外，我们还提供华氏度输入，并保持同步。

我们可以从 `Calculator` 中提取 `TemperatureInput` 组件。 我们将为它添加一个新的 `scale` prop ，可以是 `"c"` 或 `"f"`：

```jsx
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

我们现在可以更改 `Calculator` 以呈现两个单独的温度输入：

```jsx
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```

[在 CodePen 上试一试](https://codepen.io/gaearon/pen/jGBryx?editors=0010)

我们现在有两个输入，但是当您在其中一个输入温度时，另一个不会更新。 这与我们的要求相矛盾：我们希望让它们保持同步。

我们也无法从 `Calculator` 中显示 `BoilingVerdict`。 `Calculator` 不知道当前温度，因为它隐藏在 `TemperatureInput` 内。

## 2. 编写转换函数

首先，我们将编写两个函数来将摄氏度转化为华氏度以及从华氏度转换为摄氏度：

```jsx
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

这两个函数转换数字。 我们将编写另一个函数，它将字符串温度和转换器函数作为参数并返回一个字符串。 我们将使用它来根据其他输入计算一个输入的值。

它在无效温度上返回一个空字符串，并将输出四舍五入到小数点后三位：

```jsx
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

比如：

```jsx
tryConvert('abc', toCelsius);      // ''
tryConvert('10.22', toFahrenheit): // '50.396'
```

## 3. 提升状态

目前，两个 `TemperatureInput` 组件都独立地将其值保持在本地状态：

```jsx
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...  
```

但是，我们希望这两个输入彼此同步。 当我们更新摄氏度输入时，华氏度输入应反映转换后的温度，反之亦然。

在 React 中，共享状态是通过将其移动到需要它的组件的最近共同祖先来完成的。 这称为“提升状态”。 我们将从 `TemperatureInput` 中删除本地状态，然后将其移动到 `Calculator` 中。

如果 `Calculator` 拥有共享状态，它将成为两个输入中当前温度的“真实来源”。 它可以指示它们两者具有彼此一致的值。 由于两个 `TemperatureInput` 组件的 props 都来自同一个父 `Calculator` 组件，因此这两个输入将始终保持同步。

让我们一步一步看看它是如何工作的。

首先，我们将使用 `TemperatureInput` 组件中的 `this.props.temperature` 替换 `this.state.temperature`。 现在，让我们假装 `this.props.temperature` 已经存在，虽然我们将来需要从计算器传递它：

```jsx
render() {
  // Before: const temperature = this.state.temperature;
  const temperature = this.props.temperature;
  // ...
```

我们知道 pros 是只读的。 当 `temperature` 存在于本地状态时，`TemperatureInput` 可以调用 `this.setState()` 来更改它。 但是，现在 `temperature` 来自父级的 prop，`TemperatureInput` 无法控制它。

在 React 中，通常通过使组件“受控”来解决。 就像 DOM `<input>` 接受 `value` 和 `onChange` prop 一样，自定义 `TemperatureInput` 也可以接受来自其父 `Calculator` 的 `temperature` 和 `onTemperatureChange` prop。

现在，当 `TemperatureInput` 想要更新其温度时，它会调用 `this.props.onTemperatureChange`：

```jsx
  handleChange(e) {
    // Before: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
    // ...
```

>注意：
>
>自定义组件中的 `temperature` 或 `onTemperatureChange` prop 名称没有特殊含义。 我们可以将它们称为其他任何东西，例如将它们命名为 `value` 和 `onChange`，这是一种常见的约定。

`onTemperatureChange` prop 将与父 `Calculator` 组件的 `temperature` prop 一起提供。 它将通过修改自己的本地状态来处理更改，从而使用新值重新渲染两个输入。 我们将很快研究新的 `Calculator` 实现。

在深入研究 `Calculator` 中的更改之前，让我们回顾一下对 `TemperatureInput` 组件的更改。 我们从中删除了本地状态，而不是读取 `this.state.temperature`，我们现在读取 `this.props.temperature`。 我们现在调用 `this.props.onTemperatureChange()`，而不是在我们想要进行更改时调用 `this.setState()`，它将由 `Calculator` 提供：

```jsx
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

现在让我们转向 `Calculator` 组件。

我们将当前输入的 `temperature` 和 `scale` 存储在本地状态。 这是我们从输入中“提升”的状态，它将成为两者的“真理来源”。 它是我们为了渲染两个输入而需要知道的所有数据的最小表示。

例如，如果我们在摄制输入中输入 37，则 `Calculator` 组件的状态将为：

```jsx
{
  temperature: '37',
  scale: 'c'
}
```

如果我们稍后将华氏度字段编辑为 212，则 `Calculator` 的状态将为：

```jsx
{
  temperature: '212',
  scale: 'f'
}
```

我们可以存储两个输入的值，但结果证明是不必要的。 存储最近更改的输入的值及其表示的 scale 就足够了。 然后我们可以根据当前的 `temperature` 和 `scale` 来推断其他输入的值。

输入保持同步，因为它们的值是从相同的状态计算的：

```jsx
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />

        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />

        <BoilingVerdict
          celsius={parseFloat(celsius)} />

      </div>
    );
  }
}
```

[在 CodePen 上试一试](https://codepen.io/gaearon/pen/WZpxpz?editors=0010)

现在，无论您编辑哪个输入，`Calculator` 中的 `this.state.temperature` 和 `this.state.scale` 都会更新。 其中一个输入按原样获取值，因此保留任何用户输入，并始终根据它重新计算另一个输入值。

让我们回顾一下编辑输入时会发生什么：

* React 在 DOM `<input>` 上调用指定为 `onChange` 的函数。 在我们的例子中，这是 `TemperatureInput` 组件中的 `handleChange` 方法。
* `TemperatureInput` 组件中的 `handleChange` 方法使用新的所需值调用 `this.props.onTemperatureChange()`。 它的 prop，包括 `onTemperatureChange`，由其父组件 `Calculator` 提供。
* 当它先前渲染时，`Calculator` 指定摄氏温度 `TemperatureInput` 的 `onTemperatureChange` 是 `Calculator` 的 `handleCelsiusChange` 方法，而华氏温度输入的 `onTemperatureChange` 是 `Calculator` 的 `handleFahrenheitChange` 方法。 因此，根据我们编辑的输入，调用这两个 `Calculator` 方法中的任何一个。
* 在这些方法中，`Calculator` 组件要求 React 通过使用新输入值和我们刚刚编辑的输入的当前比例调用 `this.setState()` 来重新渲染自身。
* React 调用 `Calculator` 组件的 `render` 方法来了解 UI 应该是什么样子。 根据当前 temperature 和有效 scale 重新计算两个输入的值。 这里进行温度转换。
* React 使用 `Calculator` 指定的新 prop 调用各个 `TemperatureInput` 组件的 `render` 方法。 它了解他们的 UI 应该是什么样子。
* React 调用 `BoilingVerdict` 组件的 `render` 方法，将摄氏温度作为其 prop 传递。
* React DOM 使用沸腾判定更新 DOM 并匹配所需的输入值。 我们刚刚编辑的输入接收其当前值，另一个输入更新为转换后的温度。

每次更新都会执行相同的步骤，因此输入保持同步。