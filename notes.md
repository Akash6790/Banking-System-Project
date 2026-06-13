---> React JS <--
-> React JS is a JS library which is used to develop a SPA.

--> Diff between SPA and MPA

--> Single Page Application
1.Having only one html page
2.Rendering time is very less
3.It will continue the request
4.Example:Instagra,Gmail,Linkdin

--> Multi Page Application
1.Having only multiple html pages
2.Rendering time is more
3.It will start from the scratch
4.Example:W3Schools,Javapoint,etc..

--> Diff between Library and Framework

--> Library
1.library is a collection of predefined codes.
2.Rules are less
3.Examples: React JS,Moment JS,JQuery

--> Framwork
1.Framework is a collection of library
2.Rules are more
3.Examples: Angular JS,Vue JS,Next JS

--> History of React JS <--
-> React JS was introduced by facebook company in 2011 by Jorden Walke
-> React JS has been used by facebook for 2 years
-> Recat Js has been used by instagram in 2012
-> They declared React JS has open sourece in May 2013

--> Features Of React JS
1.React JS is a JS library
2.Component Based Architecture
3.Open Source language
4.It is used to build SPA
5.Declartive
6.Unidirectional / one way data binding
7.It follows virtual dom

--> Instalation of react project
1.create vite@latest   -> to install latest version of vite way of react project
2.project-name         -> need to enter a project name
3.select a framework   -> select REACT [3rd option]
4.select a varient     -> select JAVASCRIPT [3rd option]
5.cd projectName       -> enter into particular project
6.npm install          -> to install node modules
7.npm run dev          -> to start the development server

--> Virtual DOM Concept <--

--> Real DOM
-> Real DOM is the document at the end users can see it.

--> Virtual DOM
-> Virtual DOM is a copy of real DOM,it can also called as a clone copy of Real DOM

--> NOTE <--
-> Whatever the updates u do in react component will not reflect on real dom or on UI directly
-> It does all the manipulation in Virtual DOM itself and then renders those changes in the real dom

--> Reconciliation
-> The process of virtual dom comparing with the real dom and rendering all updated components into Real DOM  is called as reconcialiation

--> Diffing Algorithm
-> to achive reconcialiation process we use an algorithm is called as diffing algorithm

--> Patching
-> the process of updating missing node in dom tree is called as patching

---> React Internal Libraries <--
1.React
    ->It is a core library of react
    -> it contains functionalities to manage and maintain components, states and handling events
    -> import React from 'react

2.ReactDOM
    -> It is responsible for rendering the components into UI / into DOM tree
    -> import ReactDOM from 'react-dom/client'

---> Methods <--

1.CreateRoot()
    -> this method acts as a bridge connector between index.html and main.jsx files

2.render()
    -> It is used to render all the react elements into DOM
    -> It will render only string / jsx / components

---> Folder Structure <--
node-modules
public
src
package.json
package.lock.json
index.html

index.html
        -> entry point to project

node-modules
    -> all the pre-defined code are present in this folder (***do not touch***)

public
    -> it contains all media which is required for react app

package.json and package.lock.json
    -> These are two files where it is considered as directories of the react folder.
    -> It will give you all the information about libraries present in the project.

src
    -> It is a source folder where we are going to write the code.
    -> Inside src folder you have to maintain two important files i.e.
    1.main.jsx -> it is a root file
    2.App.jsx  -> it is a parent /top level component

-----> JSX <----
-> JSX stands for JavascriptXML.
-> It is a combination of Javascript and XML.
-> It is a template language.
-> JSX looks like html but not html.
-> It is more stricter than html.
-> It is used to create component.
-> React always uses component.

---> Rules of JSX <---

1.JSX always return only one element.
    -> If we have more than one element, we have to enclose in one parent element along with parenthesis.
    -> We can also use <Fragment></Fragment>  or <></>

1. Elements are case sensitive
2. We can use JS code in JSX by using expression
3. Common keywords in js and html will be changed in jsx
    ->for --> htmlFor
    ->class ->className
4. Every element should be closes
    -> paired way <hr></hr>
    -> self clossing way <hr/>

-----> Components <-----
-> Components are the core building blocks of react application [UI]
-> Components are nothing but block of code,we have to export and import to make it reusuability.
-> Web pages are divided into multiple components and then we will be joinig together in the parent component [App.jsx]
-> Components are reusable.

---> Rules of Component <---
1.Component names should start with capital letter only.
2.Component file should have to be saved with an extension of .jsx
3.We can represent components in 2 ways
    -> Paired tag <App></App>
    -> Self closing tag </App>

----> Types of component <---
1.Class based component [statefull component]
2.Function based component [stateless component]

---> NOTE <--
1.In CBC, there is a one built in property called state.So CBC are called as Statefull Component

2.In CBC, there is a no property called state.So FBC are called as Stateless Component

-------> PROPS <------
-> In short we call properties as props.
-> Props are objects in react js.
-> Props are used to share the information between the components.
-> Props is a way of sharing data from one component to another coponent [Parent to Child]
-> Props follows unidirectional flow i.e from parent component to child component.
-> Props are immutalble,it means once data is passed from parent component it can't be changed in child component.

---> Props Children <---
-> It is a way of sending JSX elements from parent component to child component
-> If we pass any Children, In props default key will be created as children and all JSX elements store in this.

---> Default Props <---
-> If the data has not been sent then the component will consider this data.
-> The defaultProps in a react property that allows you to set default values for objects.

---> Props Drilling <--
-> It is a process of sending data from one component to another component and so on...

---------> STATES <-------
-> In react states are used to hold the data and store the data in components level
-> States are like JS Object
-> States are mutable in nature
-> States are present only in Class based Component
-> States can hold or store two types of data
    1.null
    2.object
-> We can declare/define a state in 2 ways
    1.constructor
    2.state object

--------> Hooks <--------
-> Hooks are use to utilize the feature of CBC in FBC
-> Hooks are introduced in react verson 16.8
-> Hooks are always starts with keyword "use"

--> NOTE <--
-> to utilize states in FBC we use hooks i.e, useState

-----> React CSS <-----
-> CSS are used to apply the colors and effects to web pages
-> In react we can add css in multiple ways
    1.Inline CSS
    2.Global CSS
    3.Module CSS

1.Inline CSS
-> It is a type of CSS which will apply individually inside one particular tags using “style” attribute.
-> The CSS properties should be written inside an expression in the form of “Object”.

2.Global CSS
-> It is a type of CSS which we will use to maintain one CSS file for entire react project.
-> It will target all the components.
-> We have to create a separate file inside “src” with an extension of “.css” and write all the styles.

3.Module CSS
-> We will be creating a separate CSS file for each component
-> The respective styles required for the particular component will be written their respective CSS files.
-> Whenever we are using module CSS we have to create CSS file with an extension “.module.css”. Ex- “filename.module.css”

---------> REFS <-------
-> Refs are references
-> Refs are inbuilt object in React JS
-> By default refs contains default key value pair {current:undefined}
-> It is used to target JSX element in React JS
-> Refs always uses Real DOM
-> In CBC we use createRef for refs
-> IN FBC we use useRef for refs
-> Do not over use refs

--> Practical Usage of refs
-> Form Handling
-> Animations
-> Media tags

---------> Forms <-------
-> Forms are used to collect the user informations
-> We have type 2 types of forms
    1.Controlled Forms
    2.Uncontrolled Forms
-> We can have controlled and uncontrolled forms in both CBC and FBC

1.Controlled Forms
    -> Forms which is developed using onChange() and state is called as controlled forms

2.Controlled Forms
    ->  Forms which is developed using refs  is called as controlled forms

---------> Context API <-------
-> Basically, Props drilling is a process of sending data from one component to other component to another component to another component and so on.
-> What if we have 1000's of component?
-> So, to rectify this problem, ContextApi came into picture
-> It will directly send the data without help of intermediate components.

---> Steps:
1.We have to create context api [createContext()]
2.Provider
3.Consumer/useContext() hook

Step1:
-> import createContext from react.
-> use the createContext() method, This returns a context object that can be used to provide and consume values.

Step2:
-> Use <ContextName.Provider></ContextName.Provider> component.
-> In between wraap all the child components to which you  want to send the data .
-> Data can be transferred in value prop.
-> Now data can be consumned by wrapped components and its children and grandchildren and so on.

Step3:
-> Use useContext() hook, It directly consume the value.

---------> Higher Order Component <-------
-> HOC is a component that recives another component as an argument and returns that particular component.
-> It is an alternative for props drilling.
-> HOC will return  one function in that we have to specify what to render into UI by using return keyword.

---------> useEffect() Hook <-------
-> useEffect() hook is used to control side effects in react components
-> Side Effects can be fetching data, or directly updating something in the DOM or timer
-> useEffect accepts two arguments
    1.Function
    2.dependencyArray
-> React Will keep track of variables present in dependency Array, if there are any changes then it will invoke the function.

--------------> Axios <----------------
-> By using axios we can communicate with server
-> Axios supports HTTP requests
    1.Get  -> to get the data/fetch the data from the server.
    2.Post -> to send the data/create the data.
    3.Put/Patch -> to modify the data.
    4.Delete -> to remove the data.
-> Axios always return a promise.

-------------> Routing <----------------------
-> Routing is a process of navigating between the components through URL and without having a full page reload.
-> It is used to create SPA.

Why Routing?
-> As react helps to design SPA we have only one web page.
-> This react app consists of multiple components with different informations.
-> To navigate between these components we have to use react-router.

How to use?
-> Install a library that belong to routing
    * npm install react-router-dom@latest
-> Next you have to import necessary components from the library such as BrowserRouter,Routes, Route,Link and NavLink and use them in our react components to define the routes.

1.BrowserRouter
-> BrowserRouter is the parent component that wraps the entire application and enables navigation using URLs.

2.Routes
-> Routes acts as a container for multiple Route components and displays the component that matches the current URL.

3.Route
-> Route is used to map a URL path to a specific component.

4.Link
-> Link is used for navigation in React applications. It changes the URL without reloading the page.

5.NavLink
-> NavLink is used for navigation and can automatically identify the active route, making it useful for menus and navigation bars.

Note : Some Important hooks in routing
1.useNavigate() : useNavigate is used when we want to navigate to another page after performing an action such as login, registration, form submission, or button click.

2.useLocation() : useLocation is used to access details of the current route such as pathname, state, and search parameters.

-----------------------------------------------> THANK YOU <----------------------------------------------------

-----------------------------------------------> PRAJWAL C <----------------------------------------------------