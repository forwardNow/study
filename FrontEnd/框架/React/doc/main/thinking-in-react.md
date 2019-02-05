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