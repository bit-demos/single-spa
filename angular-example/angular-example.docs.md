---
labels: ['angular', 'typescript', 'apps', 'single-spa']
description: 'An Angular single-spa application example.'
---

# Angular Single-Spa Application Example

Fork this component (click on the Use button top-right, and select the `fork` tab), and then run `bit use <component-id>` to add it to the workspace as an app component.

Things to note when editing according to your app/MFE content:

1. The `template` in the main.single-spa.ts file needs to be the same as the component selector - this is essentially what is going to be rendered when your app is inserted into the consuming single-spa setup.
1. You can call the main.single-spa.ts whatever you like, but always make sure that the `main` file in the `angularOptions` object in the `ng-app.ts` file matches the name and location of this main file. The same with the files section in `tsconfig.app.json`.
1. The customWebpackConfig section of the `angularOptions` is key for the single-spa-angular webpack function. 

## Build, Test and Deploy

Once you have implemented your application's code and compilation passes, run `bit build <component-id>`. (you can run a general `bit build` but it's just quicker to run only for your component). You should see an output in the terminal of a single file, named as in the note below.  

To view the output bundle, go to the workspace capsule (run `bit capsule list`) and it should be under the `public` folder inside your component's files in the capsule.  


To test your app inside a single-spa root application, run `bit run <app-name>`. Note down the localhost port and file name of the generated bundle (main.js by default) and add the component to the import map in your single-spa root app with `http://localhost:<port>/<file_name>.js`.  
Note: only the dev bundle is called `main.js`. The production bundle main file will be according to the `libraryName` setting in your angularOptions object. 
(This is due to how we've configured the webpack transformer. If you have a specific need for greater control over the bundle name then please fork the transformer and configure the `output.filename` to whatever you need it to be.)

Deployment - if you want to deploy the app automatically (bit will do this when you tag the component), add a `deploy` function to the appOptions object. You can take [this component](https://bit.cloud/teambit/cloud-providers/deployers/netlify) as an example of how to build a deploy function for a bit app-type component.