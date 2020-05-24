import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeatherAlt, faArrowCircleRight,  } from '@fortawesome/free-solid-svg-icons'
import { faNodeJs } from '@fortawesome/free-brands-svg-icons'
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Functional</>,
    imageUrl: faArrowCircleRight,
    description: (
      <>
        Light-Arrow is designed to enable referentially transparent and composable asynchronous code
      </>
    ),
  },
  {
    title: <>Light</>,
    imageUrl: faFeatherAlt,
    description: (
      <>
        This library is small and based mainly around a single data type called an Arrow, which has a small API without too many concepts to learn
      </>
    ),
  },
  {
    title: <>Express</>,
    imageUrl: faNodeJs,
    description: (
      <>
        This module also exposes bindings for express and enables writing typesafe routes and middlewares
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imageUrl && (
        <div className="text--center">
          <FontAwesomeIcon className={styles.featureImage} icon={imageUrl} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/Arrow')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
