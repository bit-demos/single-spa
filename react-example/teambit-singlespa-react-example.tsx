import React from "react";
import ReactDOM from "react-dom";
import singleSpaCss from 'single-spa-css';
import singleSpaReact from "single-spa-react";
import { ReactExampleApp } from "./app";

// Bit bundles locally without miniCssExtract, so dont use the webpackExtractedCss feature locally
const shouldWebpackExtractedCss = process.env.NODE_ENV != "development";

const cssLifecycles = singleSpaCss({
  // required: a list of CSS URLs to load
  // can be omitted if webpackExtractedCss is set to true, do not specify Webpack extracted css files here
  cssUrls: [],

  // optional: defaults to false. This controls whether extracted CSS files from Webpack
  // will automatically be loaded. This requires using the ExposeRuntimeCssAssetsPlugin,
  // which is documented below.
  webpackExtractedCss: shouldWebpackExtractedCss,

  // optional: defaults to true. Indicates whether the <link> element for the CSS will be
  // unmounted when the single-spa microfrontend is unmounted.
  shouldUnmount: true,

  // optional: defaults to 5000. The number of milliseconds to wait on the <link> to load
  // before failing the mount lifecycle.
  timeout: 5000,

  // optional: defaults to a standard <link rel="stylesheet" href="/main.css"> element
  // Customize the creation of the link element that is used by single-spa-css by providing a
  // function. For example, for setting the cross-origin or other HTML attributes on the <link>
  createLink(url) {
    const linkEl = document.createElement('link');
    linkEl.rel = 'stylesheet';
    linkEl.href = url;
    return linkEl;
  },
});

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: ReactExampleApp,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return <div>Some sort of error happened</div>;
  },
});

// Export an array of lifecycles to integrate with a framework's
// single-spa lifecycles. The order matters.
export const bootstrap = [
  cssLifecycles.bootstrap,
  lifecycles.bootstrap
]

export const mount = [
  // The CSS lifecycles should be before your framework's mount lifecycle,
  // to avoid a Flash of Unstyled Content (FOUC)
  cssLifecycles.mount,
  lifecycles.mount
]

export const unmount = [
  // The CSS lifecycles should be after your framework's unmount lifecycle,
  // to avoid a Flash of Unstyled Content (FOUC)
  lifecycles.unmount,
  cssLifecycles.unmount
]
