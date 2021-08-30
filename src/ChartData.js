import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import _ from 'lodash';
import { container } from './ChartData.module.css'
import { graphql, useStaticQuery } from "gatsby";

const contentQuery = graphql`
{
    content: file(relativePath: {regex: "/blockHistory.json/"}) {
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
export default function ChartData () {
    const data = useStaticQuery(contentQuery)
    const { blocks } = data.content.childContentJson

    const [blockData, setBlockData] = useState({})

    const graphTension = 0.2

    //Helper functions to improve readability of the chart
    const readableHash = (hash, chars = 3) => `${hash.substr(0, chars)}...${hash.substr(hash.length - chars)}`
    const random_rgb_val = () => Math.round (Math.random () * 255);
    const random_rgb = (r = 1, g = 1, b = 1) => `rgb(${r ? random_rgb_val() : 0}, ${g ? random_rgb_val() : 0}, ${b ? random_rgb_val() : 0})`

    useEffect(() => {
        let miners = []
        const groupedByHour = _.groupBy(blocks, block => {
            //Find unique miners
            if(!miners.includes(block.miner)) miners.push(block.miner)
            //Create timestamp for each hour
            return format(new Date(block.timestamp * 1000), 'dd.MM - HH:00')
        })

        const timeStamps = Object.keys(groupedByHour)
        const overallValues = Object.values(groupedByHour).map(group => 
            //summarize transaction count of each hourly group
            group.reduce((pv, cv) => pv += cv.transactions.length, 0)
        )

        const groupedByMiner = miners.map(miner => 
            Object.values(groupedByHour).map(group => 
                //summarize transaction count per group & hour, while filtering for a given miner
                group.reduce((pv, cv) => cv.miner === miner ? pv += cv.transactions.length : pv, 0)
            )
        )
        
        //initialize with overall data
        let datasets = [{
            label: 'Overall',
            data: overallValues,
            borderColor: '#000094',
            tension: graphTension
        }]

        //add miner specific data
        groupedByMiner.map((group, i) => {
            datasets.push({
                label: `Miner ${readableHash(miners[i])}`,
                data: group,
                borderColor: random_rgb(1, 1, 0),
                tension: graphTension
            })
        })

        setBlockData({
            labels: timeStamps,
            datasets: datasets
        })
    }, [])

    return(
        <div className={container}>
            <h1>Gaia-X Test Network Hackathon Transactions / Hour</h1>
            <div>
                <Line data={blockData} />
            </div>
        </div>
    )
}