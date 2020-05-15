import React from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <center>
      <h3>
        🦕 Deno adalah JavaScript dan TypeScript Runtime yang menggunakan V8 dan
        Rust dibuat oleh Ryan Dahl dan juga Creator dari Node
      </h3>
      <p>
        Official{" "}
        <a
          href="https://deno.land/v1"
          style={{ textDecoration: "none", color: "darkorchid" }}
          target="_blank"
        >
          Versi 1.0
        </a>{" "}
        🎉✌
      </p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
    </center>
  </Layout>
)

export default IndexPage
