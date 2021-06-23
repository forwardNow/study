# UE4

## 1. 安装

下载： 

  * 官网： https://www.unrealengine.com/zh-CN/

## 2. 修改缓存路径

默认（公共）缓存位置：

* C:\Users\“用户名”\AppData\Local\UnrealEngine\Common\DerivedDataCache
* 所有项目共用，会占用非常多的空间

设置某个引擎的缓存位置：

* 会将 DerivedDataCache 保存到单独的项目里
* 修改 D:\install\EpicGames\UE_4.26\Engine\Config\BaseEngine.ini 文件

  ```text
  修改 [InstalledDerivedDataBackendGraph] 的 Local 变量：

    之前：

      Local=(Type=FileSystem, ..., Path="%ENGINEVERSIONAGNOSTICUSERDIR%DerivedDataCache",..)
  
    之后：

      Local=(Type=FileSystem, ..., Path="%GAMEDIR%DerivedDataCache",..)
  ```
