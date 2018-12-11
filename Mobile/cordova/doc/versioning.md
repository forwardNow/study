# 平台和插件版本控制

从版本 4.3.0 开始，Cordova 提供了保存和恢复平台和插件的功能。

此功能允许开发人员将其应用程序保存并恢复到已知状态，而无需检入所有平台和插件源代码。

添加平台或插件时，有关应用程序平台和插件版本的详细信息会自动保存在 `config.xml` 和 `package.json` 中。 假设您知道正确的标签和语法，可以通过直接编辑 `package.json` 或 `config.xml` 来添加平台或插件。 以这种方式无法移除插件或平台。 添加和删除插件和平台的推荐方法是使用命令行 cordova命令 `cordova plugin add|remove ...` 和 `cordova platform add|remove ...` 以避免任何不同步问题。

当发出 '`cordova prepare`' 时，“恢复”步骤会自动发生，利用先前保存在 `config.xml` 和 `package.json` 文件中的信息。

略。