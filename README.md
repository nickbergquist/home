# nab
an example in ASP.NET Core v.1.1

## Building CSS/JS

Pre-compiled SASS and Javascript files are located in ```/Assets``` and the gulp build process deploys all output files to ```/wwwroot/css``` and ```/wwwroot/js``` respectively.

### Gulp default task - development build

Running ```gulp``` in a CLI opened in the same directory as ```gulpfile.js``` will run the default gulp task which can also be run from Task Runner Explorer if using Visual Studio.

```gulp.task('default', ['dev-build', 'watch']);```  
```gulp.task('dev-build', ['dev-css', 'dev-scripts']);```

The gulp ```default``` task runs the ```dev-build``` task which applies SASS linting and compiles all SASS files into one CSS file adding source-maps and incorporating post-processing tasks. 

All processed CSS/JS is instantiated in the build directories detailed above. The ```default``` task also runs the gulp ```watch``` task so that changes to any of the SASS or ```/Assets/js/main``` JS files will result in automated independent builds of the SASS or JS.

The gulp default task provides a development build; there is no file minification other than of static resources that are the same for all build environments.

**Note**:  
        (i) There are a couple of small static Javascript files used for media-query detection that are also copied across from ```/Assets/static``` to the ```/wwwroot/js``` directory during the gulp build process when in ASP.NET Core '*Development*' environment. If in '*Staging*' or '*Production*' environments these static files are delivered concatenated and minified with the main Javascript file used. One of these files, ```enquire.js``` - [https://www.npmjs.com/package/enquire.js](https://www.npmjs.com/package/enquire.js), is now available as a dependency via npm or bower and this is an alternative source.  
        (ii) both builds generate conditional resource files that are made available under ```/wwwroot/css``` and ```/wwwroot/js``` but only required in specific MVC views.

### Gulp task - production build

Running ```pub-build``` performs the same build process but source-maps are excluded from the generated CSS and the latter is minified. The Javascript static files and the main Javascript file are concatenated and minified as one single file. To save compression time on the server all processed files are pre HTTP-compressed as gzip files without the *.gz extension. ASP.NET Core middleware to compress the HTTP response is also active in the project ```Startup.cs```

```gulp.task('pub-build', ['pub-css', 'pub-scripts']);```

The filenames of the files generated reflect the production build i.e., ```main.min.css``` and ```site.min.js``` etc. although these are actually gzip equivalents and have their response headers set as so (also in ```Startup.cs```):

```Context.Response.Headers["Content-Type"] = "text/css";```  
```Context.Response.Headers["Content-Encoding"] = "gzip";```

At present there is as yet no fallback included for very old user-agents that cannot decompress gzip files.

### Gulp task - SASS theming

The SASS files within ```/Assets/sass/themes/``` are excluded from the usual compilation builds in the ```gulpconfig.json``` but a given SASS theme file can be applied in the gulp ```theme``` task.

1. Add a new SASS theme file in the ```/Assets/sass/themes/``` folder. There is no need to create the file as a SASS partial because files in this directory are ignored during normal SASS compilation and naming is therefore simplified. 

    **Note**:
    Application of a SASS theme stylesheet works by importing the default ```main.scss``` file into the theme file, using the CSS cascade to override relevent variables stored in the ```/Assets/sass/utils/_variables.scss``` file with equivalent variables containing alternate property values in the theme file. 

2. Run the gulp ```theme``` task in a CLI as a parameter, the name of the theme, is required. The format required is:

    ```gulp theme --name name-of-theme```

    The ```name``` parameter (in this case 'name-of-theme') must match the name of the theme file without the *.scss suffix and there is a check to this effect incorporated. This enables multiple theme files to be saved in the ```/Assets/sass/themes/``` directory that may be compiled individually.

3. the gulp ```theme``` task creates a standard file ```main.css``` in the ```/wwwroot/css/``` folder. This is currently unminified but there is a commented pipe instruction that can be uncommented to correct this pending further refactoring... ;-)


## Testing AngularJS app

Run unit tests:

```npm run unit-tests```

Run end-to-end tests:

```npm run e2e-tests```

There's also a npm script to update the webdrivers if necessary in package.json