/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import classnames from 'classnames'
import useStyles from 'isomorphic-style-loader/useStyles'
import { useEffect, useState } from 'react'
import largeImage from './assets/artificial-intelligence-machine.jpg'
import checkUrl, { ReactComponent as CheckSvg } from './assets/check.svg'
import exampleJson from './assets/example.json'
import exampleText from './assets/example.txt'
import smallImage from './assets/positive-vote.png'
import styles from './Home.scss'

const Home = () => {
  useStyles(styles)

  const [textContent, setTextContent] = useState('')

  useEffect(() => {
    ;(async () => {
      const result = await fetch(exampleText)
      const text = await result.text()

      setTextContent(text)
    })()
  }, [])

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1>React.js News</h1>
        <h2>i18n test</h2>

        <h2 className="bg-blue-500 p-5">svg test</h2>
        <div className={styles.flex}>
          {/* svg tag as react component */}
          <CheckSvg className={styles.check} />
          {/* svg tag as react component and modify svg */}
          <CheckSvg className={classnames(styles.check, styles.red)} />
          {/* image tag */}
          <img src={checkUrl} alt="check" className={styles.check} />
          {/* div tag with css background image */}
          <div className={styles['check-div']} />
        </div>
        <h2>loader test</h2>
        <h3>large image</h3>
        <div className={styles.flex}>
          <div
            className={classnames(
              styles['large-image'],
              styles['background-image'],
            )}
          />
          <img
            src={largeImage}
            alt=""
            className={classnames(styles['large-image'])}
          />
        </div>
        <h3>small image</h3>
        <div className={styles.flex}>
          <div
            className={classnames(
              styles['small-image'],
              styles['background-image'],
            )}
          />
          <img
            src={smallImage}
            alt=""
            className={classnames(styles['small-image'])}
          />
        </div>
        <h3>json</h3>
        {JSON.stringify(exampleJson)}
        <h3>txt</h3>
        {textContent}
        <h2>postcss loader test:</h2>
        <h3 className={styles.hoverable}>hover me!</h3>
      </div>
    </div>
  )
}

Home.propTypes = {}

export default Home
