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