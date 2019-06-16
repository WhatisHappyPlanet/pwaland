import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
// import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const IndexPage = () => {

  const { allPwaJson } = useStaticQuery(
    graphql`
      query {
        allPwaJson {
          edges {
            node {
              title
              link
              icon
            }
          }
        }
      }
    `
  )


  const edges = allPwaJson.edges

  console.log(edges)

  return (
    <Layout>
      <SEO title="Home" />
      <section className="wrap">
        {
          edges.map(({node}, index) => (
            <a href={node.link} className="box" key={index}>
              <img src={node.icon} alt={node.title}/>
              <span>{node.title}</span>
            </a>
          ))
        }

      </section>
    </Layout>
  )
} 

export default IndexPage
