import * as React from "react"
import ChartData from "../ChartData"
import { graphql, useStaticQuery } from "gatsby";

const contentQuery = graphql`
{
    content: file(relativePath: {regex: "/results.json/"}) {
      childContentJson {
        blocks {
          currentBlockNumber
          miner
          timestamp
          transactions
        }
      }
    }
  }
`

export default function IndexPage(){    
  const data = useStaticQuery(contentQuery)
  const { blocks } = data.content.childContentJson

  return (
    <main>
      <title>Gaia-X Test Network Hackathon Visualization</title>
      
      <ChartData title="Gaia-X Test Network Hackathon Transactions / Hour" data={blocks}/>
    </main>
  )
}
