# Single Spa With Bit Components (Apps)

This example repo demonstrates how to create single-spa applications with bit, including locally rendering inside a root application.

It contains a react application and an angular application, rendered together in a separate root application. You'll notice that there is little or no actual configuration required in the components themselves - they each use a shareable bundling configuration to create the single-spa output. And they contain a deploy function so you don't need to manage separate deploy pipelines.

We'll run through some more details below, but first some quick background on single-spa and Bit.

## Single-spa tooling

Single-Spa applications offer the ability to run multiple applications - or Micro-Frontends - alongside each other as in-browser modules, independent of the tech-stack used to create those MFEs. 

But singles-pa applications can be fiddly to create. Each requires its own tooling and bundling configuration, and while there are packages which assist with that it is still a non-trivial.

Furthermore, testing these applications together can involve configuring and coordinating multiple dev servers across different repos and tech stacks.

## Single-spa and Bit

With bit, each app-type components contains its own webpack configuration, and as each Bit component is a standalone entity you can produce multiple single-spa applications in the same workspace.

And with sharable single-spa webpack configurations per tech-stack, which can be consumed like any other npm package, you can configure the tooling once per tech-stack (react, Angular etc) and create as many single-spa apps as you like.

# Demo Project Contents

This project contains two separate workspaces.

1. The Bit workspace, containing a React single-spa app-component and an Angular single-spa app-component
1. A root config single-spa application, for demonstrating a single-spa application running the above components in tandem

## Tl;Dr

The following steps are to quickly run the two applications and render them in the root-config app:
1. Navigate to the `root-config` directory and run `npm i` and then `npm run start`. You should see the root-config app starting up.
1. In a separate terminal, navigate to the `bit-single-spa-sample-apps` folder, and run `bit install`, then `bit compile` (twice) and then `bit build`. 
1. Once the build has succeeded, you can verify that the correct single-spa outputs have been created by running `bit capsule list` and navigate to the workspace capsule. 
Inside the folder for the react example, the app output will be inside the `artifacts/app` folder.
For the Angular app, it's under the `public` folder.
1. Open two terminals, run `bit run <app-name>` for the two applications (run `bit app list` to get the app names).
1. Note down the port numbers and adjust the import-map entries in the root-config app's `index.ejs` file as necessary.
1. Open a browser to the localhost port of the root-config app, and you should now see both Angular and React applications on the page

## More Detail

## React

Beyond creating your react component/application, these are the steps to create a react single-spa application with Bit:
1. We use [`single-spa-react`](https://single-spa.js.org/docs/ecosystem-react/) to create the single-spa output from our application/component, including the required `mount`, `unmount` and `bootstrap` functions.
2. This output must then be fed into the bundler (we're currently using webpack) as the entry file - our webpack transformer expects this file to be named `<org-name>-<project_name>`, from the `opts` object in the react-app.ts file.
3. The .react-app.ts file is where you configure your app component. Here you add the webpack configuration (transformer), and add your `opts` to configure the single-spa application. The main opts fields to look out for are orgName (which is used by single-spa to determine that this component should be an external, runtime, dependency, and should be **different** to your bit org name) and project name, which is essentially the name of your application.
4. To test locally, run `bit run <app-name>` and note down both the port number and output file. This should be configured inside your root-config app's index.ejs file (see below)

## Angular

1. We use [`single-spa-angular`](https://single-spa.js.org/docs/ecosystem-angular/) to create the single-spa Angular output as above with react.
1. Similar to the react application above, the central file is the `ng-app.ts` file. Here you can configure the path to the main single-spa file, where the single-spa output of your Angular application is created.
1. Here you configure the Angular Options for your application, including the path to the single-spa entry file (***NOT*** the entry file of your application - the single-spa entry will point to that).
1. Here you also add the webpack configuration (transformer) as above. 
1. Again, as with the react version to test locally just run `bit run <app-name>` and note down the port and file name. This will also be added to the root-config application below.

## Root Config Single-Spa app

We used single-spa's own tools for [creating a root config](https://single-spa.js.org/docs/getting-started-overview#quick-start) application. 

To add locally-running applications, add entries into the import-map in the root-config's `index.ejs` file, and add them to the html template.
See how we have added these to our sample root-config app.

You will also notice the angular and react dependencies. For each you must use the systemjs/UMD bundle for the relevant version of the framework. The [ESM Bundle project](https://medium.com/@joeldenning/an-esm-bundle-for-any-npm-package-5f850db0e04d) contains relevant outputs for pretty much any framework and version you're likely to use (though it doesn't have for all minor/patch versions, so you may have to search a bit).

We use the latest react UMD output, and have created the required import-map for Angular 13 in our root-config application for compatibility with our demo applications.
