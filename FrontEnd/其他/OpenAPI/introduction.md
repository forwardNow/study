# 介绍

OpenAPI 规范是 [Open API Initiative](https://www.openapis.org/)（一个 Linux 基金会合作项目）中的社区驱动的开放规范。

OpenAPI 规范（OAS）定义了 [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer) 的标准，与编程语言无关的接口描述，允许人和计算机发现和理解服务的功能，而无需访问源代码、附加文档或检查网络包。 通过 OpenAPI 正确定义后，客户可以使用最少量的实现逻辑来理解远程服务并与之交互。 与低级编程的接口描述类似，OpenAPI 规范消除了调用服务时的猜测。

（机器可读的）API 定义文档的用例包括但不限于：交互式文档; 文档、客户端、服务端的代码生成; 测试用例的自动化。 OpenAPI 文档描述了 API 的服务，并以 YAML 或 JSON 格式表示。 这些文档可以静态生成和提供，也可以从应用程序动态生成。

OpenAPI 规范不要求重写现有 API。 它不需要将任何软件绑定到服务。 但是，它确实需要在 OpenAPI 规范的结构中描述服务的功能。 并非所有服务都可以由 OpenAPI 描述 - 此规范并非旨在涵盖 REST API 的每种可能风格。 OpenAPI 规范没有强制要求特定的开发过程，例如设计优先或代码优先。 它确实通过与 REST API 建立清晰的交互来促进这两种技术。

这个 GitHub 项目是 OpenAPI 的起点。 在这里，您将找到有关 OpenAPI 规范所需的信息，简单示例以及有关该项目的基本信息。

## 1. 当前版本

OpenAPI 规范的当前版本是 [OpenAPI 规范3.0.1](https://github.com/OAI/OpenAPI-Specification/blob/v3.0.1/versions/3.0.1.md)
。

### 1.1. 未来版本

[3.0.1](https://github.com/OAI/OpenAPI-Specification/tree/v3.0.1)  - 下一个补丁版本。 应针对此分支提交补丁级别修复（拼写错误，澄清等）。

### 1.2. 之前的版本

此仓库还包含：

* [OpenAPI 规范 2.0](https://github.com/OAI/OpenAPI-Specification/blob/v3.0.1/versions/2.0.md)（它在重命名为“OpenAPI 规范”之前与 Swagger 2.0 规范相同），以及 
* Swagger 1.2 规范
* Swagger 2.0 规范

此仓库中的每个文件夹（例如示例和模式）都应包含与规范的当前版本和先前版本相关的文件夹。

## 2. 查看

如果您只是希望看到它工作，请查看[当前示例的列表](https://github.com/OAI/OpenAPI-Specification/blob/v3.0.1/examples/v3.0)。

## 3. 工具和库

想看看如何创建自己的 OpenAPI 定义，呈现它或以其他方式使用它？ 查看不断增长的 [3.0 实现列表](https://github.com/OAI/OpenAPI-Specification/blob/v3.0.1/IMPLEMENTATIONS.md)。

## 4. 参与

[开发指南](https://github.com/OAI/OpenAPI-Specification/blob/v3.0.1/DEVELOPMENT.md)中描述了当前 OpenAPI 规范的开发过程。 开发下一版本的 OpenAPI 规范由[技术指导委员会（TSC）](https://www.openapis.org/participate/how-to-contribute/governance#TDC)指导。 这组提交者带来了他们的 API 专业知识，包含来自社区的反馈，并酌情扩展了提交者组。 未来规范的所有开发活动都将作为功能执行并合并到此分支中。 在发布未来规范后，该分支将合并为 master。

TSC 每周召开一次网络会议，审查公开拉取请求，并讨论与不断发展的 OpenAPI 规范相关的未决问题。 参与每周电话会议和预定的工作会议对社区开放。 您可以在线查看 [TSC 日历](https://oai-technicalsteeringcommittee.groups.io/g/main/calendar)，并使用 [iCal 链接](https://oai-technicalsteeringcommittee.groups.io/g/main/ics/860119/668774333/feed.ics)将其导入日历。

Open API Initiative 鼓励个人和公司参与。 如果您想参与 OpenAPI 规范的演变，请考虑采取以下措施：

* 查看[当前的规范](https://github.com/OAI/OpenAPI-Specification/blob/v3.0.1/versions/3.0.1.md)。 可读性好的 markdown 文件是规范的来源。
* 查看[开发](https://github.com/OAI/OpenAPI-Specification/blob/v3.0.1/DEVELOPMENT.md)过程，以便了解规范的演变过程。
* 检查问题并提取请求，看看是否有人已经记录了您的想法或对规范的反馈。 您可以通过向现有问题或 PR 添加注释来关注现有评论。
* 创建一个 issue 来描述新的问题。 如果可能，提出解决方案。

并非所有反馈都能得到满足，并且可能存在支持或反对适合规范的变更的可靠论据。

## 5. 许可

看 [License (Apache-2.0)](https://github.com/OAI/OpenAPI-Specification/blob/master/LICENSE)