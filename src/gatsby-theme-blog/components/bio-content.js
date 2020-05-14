import React, { Fragment } from "react"
import { Styled } from "theme-ui"

/**
 * Change the content to add your own bio
 */

export default () => (
  <Fragment>
    Hi, lihat juga{" "}
    <Styled.a href="https://doc.deno.land/" target="_blank">
      dokumentasi
    </Styled.a>{" "}
    lengkap, dan berbagai{" "}
    <Styled.a href="https://github.com/denoland/deno/issues">issues</Styled.a>
  </Fragment>
)
