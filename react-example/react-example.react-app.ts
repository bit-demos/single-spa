import { ReactAppOptions } from '@teambit/react';
import { Netlify } from '@teambit/cloud-providers.deployers.netlify';
import { singleSpaReactWebpackTransformer } from '@bit-foundations/apps.single-spa.react.webpack-transformer';
;

const netlify = new Netlify({
  /* the netlify access token. recommended to use as an env variable. */
  accessToken: process.env.NETLIFY_AUTH_TOKEN as string,
  /* the team owning the site on Netlify (the team's slug) */
  team: 'teambit',
  /* your site name on Netlify. */
  siteName: 'single-spa-react-example',
});

const opts: any = {
  orgName: "teambit-singlespa",
  projectName: "react-example",
  orgPackagesAsExternal: true,
  rootDirectoryLevel: 1,
  webpackConfigEnv: {
      standalone: false,
  },
  standaloneOptions: {},
};

export const SingleSpaReactApp: ReactAppOptions = {
  /* the name of the app (used only by Bit) */
  name: 'react-example',
  /* an entry file for the bundler (used in dev and prod) */
  entry: [require.resolve("./teambit-singlespa-react-example")],
  /* webpack transformers to modify this app's default webpack config */
  webpackTransformers: [singleSpaReactWebpackTransformer(opts), (config) => {
    console.log(config.raw)
    return config;
  }],
  /**
   * netlify is used for deployment but can be replaced by other
   * compatible deployers
   * */
  deploy: netlify.deploy.bind(netlify),
};

export default SingleSpaReactApp;
