import React, { useEffect, useState } from "react";
import _ from "lodash";
import { graphql, useStaticQuery } from "gatsby";

const contentQuery = graphql`
  {
    content: file(relativePath: { regex: "/blockHistory.json/" }) {
      childContentJson {
        blocks {
          node
          transactions
        }
      }
    }
  }
`;
export default function TotalTransactions() {
  const data = useStaticQuery(contentQuery);
  const { blocks } = data.content.childContentJson;

  const [transactionData, setTransactionData] = useState({
    amountTransactionsByNode: [],
    totalTransactions: 0,
  });

  useEffect(() => {
    let nodes = [];

    const transactionsByNode = _.groupBy(blocks, (block) => {
      //Find unique nodes
      if (!nodes.includes(block.node)) nodes.push(block.node);
      return block.node;
    });
    const transactionCounts = new Map();

    for (const node of nodes) {
      // add up transactions
      let transactionCount = transactionsByNode[node].reduce(
        (pv, cv) => (pv += cv.transactions.length),
        0
      );

      transactionCounts.set(node, transactionCount);
    }

    let counts = [];
    let totalTransactions = 0;
    transactionCounts.forEach((value, key) => {
      let countObj = {};
      countObj.address = key;
      countObj.amount = value;
      totalTransactions = totalTransactions + value;
      counts.push(countObj);
    });

    setTransactionData({
      amountTransactionsByNode: counts,
      totalTransactions: totalTransactions,
    });
  }, []);
  return (
    <div id="data" className="mb-8">
      <h2>Total transactions: {transactionData.totalTransactions}</h2>
      <h2>Total transactions by node:</h2>
      <ul>
        {transactionData.amountTransactionsByNode.map((count) => {
          return (
            <li key={count.address}>
              {count.address} - {count.amount}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
