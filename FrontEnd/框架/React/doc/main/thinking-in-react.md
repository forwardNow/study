# 在 React 中思考

在我们看来，React 是使用 JavaScript 构建大型、快速 Web 应用程序的首选方式。 它在 Facebook 和 Instagram 上的表现非常好。

React 的许多重要部分之一就是它如何让你在构建应用程序时考虑应用程序。 在本文档中，我们将引导您完成使用 React 构建可搜索产品数据表的思考过程。

## 1. 从模拟开始

想象一下，我们已经有了一个 JSON API 和一个来自我们设计师的模拟器。 模拟看起来像这样：

![https://reactjs.org/static/thinking-in-react-mock-1071fbcc9eed01fddc115b41e193ec11-4dd91.png](https://reactjs.org/static/thinking-in-react-mock-1071fbcc9eed01fddc115b41e193ec11-4dd91.png)

我们的 JSON API 返回一些如下所示的数据：

```javascript
[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
```

## 2. 第 1 步：将 UI 分解为组件层次结构

您要做的第一件事是在模拟中的每个组件（和子组件）周围绘制框，并为它们提供所有名称。 如果您正在与设计师合作，他们可能已经这样做了，所以请与他们交谈！ 他们的 Photoshop 图层名称最终可能是您的 React 组件的名称！

但是你怎么知道组件应该是什么呢？ 只需使用相同的技术来决定是否应该创建新的函数或对象。 一种这样的技术是[单一责任原则](https://en.wikipedia.org/wiki/Single_responsibility_principle)，即理想情况下，一个组件应该只做一件事。 如果它最终增长，它应该被分解成更小的子组件。

由于您经常向用户显示 JSON 数据模型，因此您会发现如果您的模型构建正确，您的 UI（以及您的组件结构）将很好地映射。 这是因为 UI 和数据模型倾向于遵循相同的信息体系结构，这意味着将 UI 分离到组件中的工作通常是微不足道的。 只需将其分解为完全代表数据模型的一部分即可。

![https://reactjs.org/static/thinking-in-react-components-eb8bda25806a89ebdc838813bdfa3601-82965.png](https://reactjs.org/static/thinking-in-react-components-eb8bda25806a89ebdc838813bdfa3601-82965.png)

你会在这里看到我们的简单应用程序中有五个组件。 我们将每个组件所代表的数据用斜体显示出来。

1. **FilterableProductTable**（橙色）：包含整个示例
2. **SearchBar**（蓝色）：接收所有*用户输入*
3. **ProductTable**（绿色）：根据用户输入显示和过滤*数据集合*
4. **ProductCategoryRow**（青绿色）：显示每个*类别*的标题
5. **ProductRow**（红色）：为每个*产品*显示一行

如果你看一下 `ProductTable`，你会发现表头（包含“Name”和“Price”标签）不是它自己的组件。 这是一个偏好的问题，并且无论如何都有争论。 对于此示例，我们将其作为 `ProductTable` 的一部分保留，因为它是渲染数据集合的一部分，这是 `ProductTable` 的职责。 但是，如果这个标题变得复杂（即如果我们要添加可供选择的排序），那么将它作为自己的 `ProductTableHeader` 组件肯定是有意义的。

现在我们已经在 mock 中识别了组件，让我们将它们排列成层次结构。 这很简单。 出现在模拟中另一个组件中的组件应在层次结构中显示为子项：

* `FilterableProductTable`
  * `SearchBar`
  * `ProductTable`
    * `ProductCategoryRow`
    * `ProductRow`

## 3. 第 2 步：在 React 中构建静态版本

请参阅 CodePen 上的 [Thinking In React: Step 2](https://codepen.io/gaearon/pen/BwWzwm)。

```html
<div id="container">
    <!-- This element's contents will be replaced with your component. -->
</div>
<style>
body {
  padding: 5px;
}
</style>
```

```jsx
class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ProductTable products={this.props.products} />
      </div>
    );
  }
}


const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);
```

现在您已经拥有了组件层次结构，现在是时候实现您的应用了。 最简单的方法是构建一个版本，该版本采用您的数据模型并渲染 UI 但没有交互性。 最好将这些过程解耦，因为构建静态版本需要大量的打字而且不需要思考，添加交互性需要大量的思考而不需要大量的打字。 我们会明白为什么。

要构建渲染数据模型的应用程序的静态版本，您需要构建可重用其他组件并使用 props 传递数据的组件。 props 是一种将数据从父级传递给子级的方法。 如果您熟悉 state 的概念，请不要使用 state 来构建此静态版本。 state 仅保留用于交互性，即随时间变化的数据。 由于这是应用程序的静态版本，因此您不需要它。

您可以自上而下或自下而上构建。 也就是说，您可以从构建层次结构中较高的组件开始（即从 `FilterableProductTable` 开始）或者在其中较低的组件（`ProductRow`）。 在更简单的示例中，自上而下通常更容易，而在大型项目中，更容易自下而上并在构建时编写测试。

在此步骤结束时，您将拥有一个可重用组件库，用于呈现您的数据模型。 组件只有 `render()` 方法，因为这是应用程序的静态版本。 层次结构顶部的组件（`FilterableProductTable`）将您的数据模型作为 prop。 如果您对基础数据模型进行了更改并再次调用 `ReactDOM.render()`，则将更新 UI。 很容易看出你的 UI 是如何更新的以及在哪里进行更改，因为没有什么复杂的事情发生。 React 的单向数据流（也称为单向绑定）可以保持模块化和高效。

如果您在执行此步骤时需要帮助，请参阅 [React 文档](https://reactjs.org/docs/)。

### 3.1. 简短的插曲：props 与 state

React 中有两种类型的“模型”数据：props 和 state。 理解两者之间的区别很重要; 如果您不确定区别是什么，请浏览[官方的 React 文档](https://reactjs.org/docs/interactivity-and-dynamic-uis.html)。

## 4. 第 3 步：确定 UI 状态的最小（但完整）表示

要使 UI 具有交互性，您需要能够触发对基础数据模型的更改。使 React 的状态会让这变得简单。

要正确构建应用程序，首先需要考虑应用程序所需的最小可变状态集。 这里的关键是 [DRY：不要重复自己](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)。 找出应用程序所需状态的绝对最小表示，并按需计算所需的其他所有内容。 例如，如果您正在构建 TODO 列表，只需保留 TODO 项目的数组; 不要为计数保留单独的状态变量。 相反，当您想要渲染 TODO 计数时，只需获取 TODO 项数组的长度即可。

想想我们的示例应用程序中的所有数据。 我们有：

* 原始产品清单
* 用户输入的搜索文本
* 复选框的值
* 已过滤的产品列表

让我们检查每一个，找出哪个是 state。 只需询问每个数据有关的三个问题：

1. 它是通过 props 从父组件那里传来的吗？ 如果是这样，它可能不是状态。
2. 它会随着时间的推移而保持不变？如果是这样，它可能不是状态。
3. 您可以根据组件中的任何其他状态或 props 来计算它吗？ 如果是这样，那就不是状态。

原始产品列表作为 props 传递，因此不是状态。 搜索文本和复选框似乎是状态，因为它们随时间变化并且无法从任何事物计算得来。 最后，过滤的产品列表不是状态，因为它可以通过将原始产品列表与搜索文本和复选框的值组合来计算。

最后，我们的状态是：

* 用户输入的搜索文本
* 复选框的值

## 5. 第 4 步：确定你的 state 应该存放的地方

```html
<div id="container">
    <!-- This element's contents will be replaced with your component. -->
</div>
<style>
body {
  padding: 5px;
}
</style>
```

```jsx
class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name}
        />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={filterText} />
        <p>
          <input
            type="checkbox"
            checked={inStockOnly} />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}


const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);
```

好的，所以我们已经确定了最小的 app 状态集。 接下来，我们需要确定哪个组件拥有此状态。

请记住：React 是关于组件层次结构中的单向数据流。 可能不会立即清楚哪个组件应该拥有哪个状态。 对于新手来说，这通常是最具挑战性的部分，因此请按照以下步骤来弄清楚：

对于您的应用程序中的每个 state：

* 弄清楚每个组件通过 state 渲染的内容。
* 找到公共所有者组件（在层次结构中需要状态的所有组件上方的单个组件）。
* 公共所有者或层次结构中较高层的其他组件应该拥有该状态。
* 如果找不到拥有状态的组件，只需创建一个新组件来保存状态，并将其添加到公共所有者组件上方的层次结构中的某个位置。

让我们为我们的应用程序应用这个策略：

* `ProductTable` 需要根据状态过滤产品列表，`SearchBar` 需要显示搜索文本和检查状态。
* 公共所有者组件是 `FilterableProductTable`。
* 从概念上讲，过滤器文本和检查值存在于 `FilterableProductTable` 中是有意义的

很酷，所以我们决定我们的 state 存在于 `FilterableProductTable`。 首先，将一个实例属性 `this.state = {filterText：''，inStockOnly：false}` 添加到 `FilterableProductTable` 的构造函数中，以反映应用程序的初始状态。 然后，将 `filterText` 和 `inStockOnly` 传递给 `ProductTable` 和 `SearchBar` 作为 prop。 最后，使用这些 props 过滤 `ProductTable` 中的行，并在 `SearchBar` 中设置表单域的值。

您可以开始了解应用程序的行为：将 `filterText` 设置为 `"ball"` 并刷新您的应用程序。 您将看到数据表已正确更新。

## 6. 第 5 步：添加反向数据流

```jsx
class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name}
        />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }
  
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  
  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }
  
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleInStockChange}
          />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}


const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);
```

到目前为止，我们已经构建了一个应用程序，可以正确呈现 props 和 state 向下流动的层次结构。 现在是时候以另一种方式支持数据流动：层次结构深处的表单组件需要更新 `FilterableProductTable` 中的状态。

React 使这个数据流明确，以便于理解程序的工作方式，但它确实需要比传统的双向数据绑定更多的输入。

如果您尝试键入或选中示例当前版本中的框，您将看到 React 忽略您的输入。 这是故意的，因为我们将输入的值 prop 设置为始终等于从 `FilterableProductTable` 传入的状态。

让我们考虑一下我们想要发生什么。 我们希望确保每当用户更改表单时，我们都会更新状态以反映用户输入。 由于组件应该只更新它们自己的状态，`FilterableProductTable` 会将回调传递给 `SearchBar`，只要状态应该更新，它就会触发。 我们可以在输入上使用 `onChange` 事件来通知它。 `FilterableProductTable` 传递的回调将调用 `setState()`，并且应用程序将更新。

虽然这听起来很复杂，但它实际上只是几行代码。 而且您的数据在整个应用程序中的流动非常明确。