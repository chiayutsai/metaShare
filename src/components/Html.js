/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import PropTypes from 'prop-types'
import environments from '../../tools/environments.config'

/* eslint-disable react/no-danger */

const Html = ({ title, description, styles, scripts }) => (
  <html className="no-js" lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.version = ${JSON.stringify(environments.version)};
              var querycdn = new URL(window.location).searchParams.get("cdnurl") || "";
              var publicpath = "${environments.publicPath}";
              ${
                environments.cdnUrlPathVariable
              } = querycdn.replace(/\\/$/, "") + publicpath.replace(querycdn ? "." : "", "");
              `,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
              // Single Page Apps for GitHub Pages
              // MIT License
              // https://github.com/rafgraph/spa-github-pages
              // This script checks to see if a redirect is present in the query string,
              // converts it back into the correct url and adds it to the
              // browser's history using window.history.replaceState(...),
              // which won't cause the browser to attempt to load the new url.
              // When the single page app is loaded further down in this file,
              // the correct url will be waiting in the browser's history for
              // the single page app to route accordingly.
              (function(l) {
                if (l.search[1] === '/' ) {
                  var decoded = l.search.slice(1).split('&').map(function(s) {
                    return s.replace(/~and~/g, '&')
                  }).join('?');
                  window.history.replaceState(null, null,
                      l.pathname.slice(0, -1) + decoded + l.hash
                  );
                }
              }(window.location))
              `,
        }}
      />
      {scripts.map(script => (
        <link key={script} rel="preload" href={script} as="script" />
      ))}
      <link rel="apple-touch-icon" href="/icon.png" />
      <link
        rel="stylesheet"
        href={`${
          environments.isDebug ? '' : '/metaShare'
        }/swiper-bundle.min.css`}
      />
      {styles.map(style => (
        <style
          key={style.id}
          id={style.id}
          dangerouslySetInnerHTML={{ __html: style.cssText }}
        />
      ))}
    </head>
    <body>
      <div id="app" />
      {scripts.map(script => (
        <script key={script} src={script} />
      ))}
      {environments.analytics.googleTrackingId && (
        <script
          dangerouslySetInnerHTML={{
            __html:
              'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
              `ga('create','${environments.analytics.googleTrackingId}','auto');ga('send','pageview')`,
          }}
        />
      )}
      {environments.analytics.googleTrackingId && (
        <script
          src="https://www.google-analytics.com/analytics.js"
          async
          defer
        />
      )}
    </body>
  </html>
)

Html.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  styles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      cssText: PropTypes.string.isRequired,
    }).isRequired,
  ),
  scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
}

Html.defaultProps = {
  styles: [],
  scripts: [],
}

export default Html
