import { AngularAppOptions, BrowserOptions, DevServerOptions } from '@teambit/angular-apps';
import { singleSpaAngularTranformer } from '@bit-foundations/apps.single-spa.angular.webpack-transformer';

const appName = "angular-example";

const angularOptions: BrowserOptions & DevServerOptions = {
  customWebpackConfig: {
    libraryName: appName,
    libraryTarget: "system",
    excludeAngularDependencies: true
  },
  main: 'src/main.single-spa.ts',
  polyfills: 'src/polyfills.ts',
  index: 'src/index.html',
  tsConfig: 'tsconfig.app.json',
  assets: ['src/assets'],
  styles: ['src/styles.scss'],
};

export const AngularExampleOptions: AngularAppOptions = {
  /**
   * Name of the app in Bit CLI.
   */
  name: appName,
  sourceRoot: 'src',
  /**
   * Angular options for `bit build`
   */
  angularBuildOptions: angularOptions,

  /**
   * Angular options for `bit run`
   */
  angularServeOptions: angularOptions,

  webpackTransformers: [singleSpaAngularTranformer(angularOptions)]
};

export default AngularExampleOptions;
