<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{name}}</title>
    <style>
        body {
            padding: 40px;
        }

        a {
            display: block;
            margin: 10px 0;
            font-size: 24px;
        }
    </style>
</head>
<body>
{{#each files}}
    <a href="{{../dir}}/{{this}}">{{this}}</a>
{{/each}}
</body>
</html>
