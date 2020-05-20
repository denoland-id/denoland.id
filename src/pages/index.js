import React from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <center>
      <h3 className="text-red-500">
        <div className="text-gray-700 text-2xl mt-3">
          <span role="img" aria-label="deno">
            🦕
          </span>{" "}
          Deno adalah JavaScript dan TypeScript Runtime yang menggunakan V8 dan
          Rust dibuat oleh Ryan Dahl dan juga Creator dari Node
        </div>
      </h3>
      <p>
        <a
          href="https://deno.land/v1"
          style={{ textDecoration: "none", color: "darkorchid" }}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl"
        >
          <img
            alt="deno-license"
            src="	https://img.shields.io/github/v/release/denoland/deno"
            className="mr-2 mt-5"
          />
        </a>{" "}
        <span role="img" aria-label="cheers">
          🎉✌
        </span>
      </p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <div className="flex justify-center p-2">
        <img
          alt="deno-license"
          src="	https://img.shields.io/github/license/denoland/deno"
          className="mr-2"
        />
        <img
          alt="deno-stars"
          src="	https://img.shields.io/github/stars/denoland/deno"
          className="mr-2"
        />
        <img
          alt="deno-forks"
          src="	https://img.shields.io/github/forks/denoland/deno"
          className="mr-2"
        />
        <a
          href="https://github.com/denoland/deno/issues"
          style={{ textDecoration: "none", color: "darkorchid" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            alt="deno-issues"
            src="	https://img.shields.io/github/issues/denoland/deno"
          />
        </a>
      </div>
    </center>
  </Layout>
)

export default IndexPage
