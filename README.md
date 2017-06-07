# nab
gulp-sass in ASP.NET Core

## Building CSS/JS

Pre-compiled SASS and Javascript files are located in ```/Assets``` and the gulp build process deploys all output files to ```/wwwroot/css/``` and ```/wwwroot/js```

### Gulp default task

Running ```gulp``` in a CLI, in the same directory as ```gulpfile.js``` will run the default gulp task which can also be run from Task Runner Exlorer if using Visual Studio.



**Note**: 
There are a couple of small static Javascript files used for media-query detection that are also copied across from /Assets to the ```/wwwroot/js``` directory during the gulp build process when in ASP.NET Core 'Development' environment. If in 'Staging' or 'Production' environments these static files are delivered concatenated and minified with the main Javascript file used. One of these files, enquire.js ['https://www.npmjs.com/package/enquire.js'](https://www.npmjs.com/package/enquire.js), is now available as a dependency via npm or bower and this is an alternative future source.

