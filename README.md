## What is it?
It is a "Moon Sugar", library for snowfall on your website.

## Where I can see demo?

You can see [demo in here](https://hawkeyepierce89.github.io/Moon-Sugar/).

## How work with this?
To initialize "Moon Sugar" you need add this library to your project:
````html
//old school
<script src="moon-sugar.min.js"></script>
`````

````javascript
//new school
//TODO: make a normal import
import * as moonSugar from 'moon-sugar';
`````

Add element for snowflakes in your HTML

````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

    <div class="moonSugar"></div>
</body>
</html>
`````

And run this:

````javascript
moonSugar.init();
`````

You also need to add styles:

````CSS
.moonSugar {
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
}
.moonSugar-item {
    position: absolute;
    left: 0;
    top: 0;
    will-change: transform;
    width: 14px;
    height: 14px;
    background: url("path-to-image") center center/14px 14px no-repeat;
}
`````

## What options can I use?

You can use in init-method next options:

- element

Root element. It's may be **Element** (example: _document.querySelector(".moonSugar")_) or **String** (example: _".moonSugar"_).

Default: _document.querySelector(".moonSugar")_

- classNameSnowflow

Class name for snowflake. **String** (example: _"moonSugar-item"_)

Default: _"moonSugar-item"_

- countFlakesInSecons

How many to generate snowflakes per second. **Number** (example: _10_). Attention: a large number can cause performance problems.

Default: _5_

- countFlakeTypes

How many to generate types of snowflakes. **Number** (example: _5_).

Default: _1_

In this case you can set different types of snowflakes:

````CSS
.moonSugar-item[data-type="0"] {
    background-image: url("path-to-image-0");
}
.moonSugar-item[data-type="1"] {
    background-image: url("path-to-image-1");
}
.moonSugar-item[data-type="2"] {
    background-image: url("path-to-image-2");
}
.moonSugar-item[data-type="3"] {
    background-image: url("path-to-image-3");
}
.moonSugar-item[data-type="4"] {
    background-image: url("path-to-image-4");
}
`````

## Where I can get images for snow?

For example, you can get it [from this](https://www.flaticon.com/packs/snowflakes).

Or you can install npm package

`````
npm install moon-sugar
`````

## Thankfulness

Many thanks [@inflashwetrust](https://twitter.com/inflashwetrust) for the mathematical logic of flying snowflakes and help in professional development.