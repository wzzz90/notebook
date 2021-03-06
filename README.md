# 基于vue2.0+vuex+localStorage开发的本地记事本

> 本文采用vue2.0+vuex+vue-router+vuex-localstorage+sass+webpack，实现一个本地存储的记事本。兼容PC端和移动端。该项目参考https://segmentfault.com/a/1190000008199523  进行了一些个人的修改

## 功能说明

- 支持登录与注销
- 支持回车添加事件
- 支持事件状态切换（支持多选）
	- 添加事件 -> 进入未完成列表
	- 未完成 -> 已完成
	- 未完成 -> 已取消
	- 已完成 -> 未完成
	- 已取消 -> 未完成(点击恢复按钮)
- 支持筛选事件
- 支持编辑事件
- 支持删除事件
- 支持清空所有事件
- 支持本地化存储
- 支持折叠面板
- 支持切换主题颜色
- 支持导出/导入数据

## 安装步骤
本项目是使用vue-cli脚手架生成的项目，项目代码可以到我的github上clone下来。clone下来之后可进入文件目录

	git clone https://github.com/wzzz90/notebook.git
	cd notepad
	npm install
	npm run dev

	// 如果 node-sass 安装失败，可使用 cnpm 安装
	npm install cnpm -g --registry=https://registry.npm.taobao.org
	cnpm -v 			// 查看cnpm版本号确认安装成功
	cnpm install node-sass -D
	

## 主要功能与实现

### 1.登录功能

结合路由实现登录与注销功能

### 2.折叠面板

点击时候获取div高度值，赋值给style.height，然后再改变高度为0，这样transition才会生效。

### 3.切换状态

利用vuex进行状态管理，把所有事件和状态存储在store对象中，在组件中通过计算属性获得事件，因此就有了实时性。

### 4.本地存储

使用的是vuex-localstorage，将store中的数据存储到localstorage中。

### 5.父子组件间的通讯
	
组件实例的作用域是孤立的。这意味着不能并且不应该在子组件的模板内直接引用父组件的数据。

	1）父组件可以使用 props 把数据传给子组件。
	2）子组件可以使用 $emit 触发父组件的自定义事件。


### 6.筛选功能

在返回所有事件的计算属性上，使用过滤器( filter )，进行对 type 和 content 的筛选，返回符合条件的事件。

### 7.切换主题

使用vuex管理主题状态，并进行模块化管理，用localStorage永久存储选中的主题颜色。

### 8.数据的导出和导入
