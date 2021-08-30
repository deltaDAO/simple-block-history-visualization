import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import _ from 'lodash';
import { container } from './ChartData.module.css'
import { BackgroundColor } from 'chalk';

export default function ChartData ({title, data}) {
    const blocks = data

    const [blockData, setBlockData] = useState({})

    const readableHash = (hash, chars = 3) => `${hash.substr(0, chars)}...${hash.substr(hash.length - chars)}`
    const random_rgb_val = () => Math.round (Math.random () * 255);
    const random_rgb = (r = 1, g = 1, b = 1) => `rgb(${r ? random_rgb_val() : 0}, ${g ? random_rgb_val() : 0}, ${b ? random_rgb_val() : 0})`

    useEffect(() => {
        let miners = []
        const grouped = _.groupBy(blocks, block => {
            if(!miners.includes(block.miner)){
                 miners.push(block.miner)
            }
            return format(new Date(block.timestamp * 1000), 'dd.MM - HH:00')
        })
        const keys = Object.keys(grouped)
        const values = Object.values(grouped).map(group => group.reduce((pv, cv) => pv += cv.transactions.length, 0))

        const groupedByMiner = miners.map(miner => Object.values(grouped).map(group => group.reduce((pv, cv) => cv.miner === miner ? pv += cv.transactions.length : pv, 0)))

        
        let datasets = [{
            label: 'Overall',
            data: values,
            borderColor: '#000094',
            tension: 0.2
        }]

        groupedByMiner.map((group, i) => {
            datasets.push({
                label: `Miner ${readableHash(miners[i])}`,
                data: group,
                borderColor: random_rgb(1, 1, 0),
                title: miners[i]
            })
        })

        setBlockData({
            labels: keys,
            datasets: datasets
        })
    }, [])

    return(
        <div className={container}>
            <h1>{title}</h1>
            <div>
                <Line data={blockData} />
            </div>
        </div>
    )
}