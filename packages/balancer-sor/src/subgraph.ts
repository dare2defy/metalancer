import fetch from 'isomorphic-fetch';
import { utils } from 'ethers';
import * as bmath from './bmath';
import { PoolPairData, Path } from './types';
import { BigNumber } from './utils/bignumber';

const SUBGRAPH_URL =
    process.env.REACT_APP_SUBGRAPH_URL ||
    'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer';

// LEGACY FUNCTION - Keep Input/Output Format
export async function getPoolsWithTokens(tokenIn, tokenOut) {
    // GraphQL is case-sensitive
    // Always use checksum addresses
    tokenIn = utils.getAddress(tokenIn);
    tokenOut = utils.getAddress(tokenOut);

    const query = `
      query ($tokens: [Bytes!]) {
          pools (first: 1000, where: {tokensList_contains: $tokens, publicSwap: true, active: true}) {
            id
            publicSwap
            swapFee
            totalWeight
            tokensList
            tokens {
              id
              address
              balance
              decimals
              symbol
              denormWeight
            }
          }
        }
    `;

    const variables = {
        tokens: [tokenIn, tokenOut],
    };

    const response = await fetch(SUBGRAPH_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const { data } = await response.json();
    return data;
}

// LEGACY FUNCTION - Keep Input/Output Format
export async function getTokenPairs(token) {
    // GraphQL is case-sensitive
    // Always use checksum addresses
    token = utils.getAddress(token);

    const query = `
      query ($token: [Bytes!]) {
          pools (first: 1000, where: {tokensList_contains: $token, publicSwap: true, active: true}) {
            tokensList
          }
        }
    `;

    const variables = {
        token: [token],
    };

    const response = await fetch(SUBGRAPH_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const { data } = await response.json();
    return data;
}

// Returns all public pools
export async function getAllPublicSwapPools(SubgraphUrl: string = '') {
    const query = `
      {
          pools (first: 1000, where: {publicSwap: true, active: true}) {
            id
            swapFee
            totalWeight
            publicSwap
            tokens {
              id
              address
              balance
              decimals
              symbol
              denormWeight
            }
            tokensList
          }
      }
    `;

    const response = await fetch(
        SubgraphUrl === '' ? SUBGRAPH_URL : SubgraphUrl,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
            }),
        }
    );

    const { data } = await response.json();
    return data;
}

export async function getFilteredPools(
    tokenIn,
    tokenOut,
    SubgraphUrl: string = ''
) {
    tokenIn = utils.getAddress(tokenIn);
    tokenOut = utils.getAddress(tokenOut);

    let query = `
      {
          poolIn: pools (first: 1000, where: { tokensList_contains: ["${tokenIn}"], publicSwap: true, active: true}) {
            id
            swapFee
            totalWeight
            publicSwap
            tokens {
              id
              address
              balance
              decimals
              symbol
              denormWeight
            }
            tokensList
          },

          poolOut: pools (first: 1000, where: { tokensList_contains: ["${tokenOut}"], publicSwap: true, active: true}) {
            id
            swapFee
            totalWeight
            publicSwap
            tokens {
              id
              address
              balance
              decimals
              symbol
              denormWeight
            }
            tokensList
          }
      }
    `;

    const response = await fetch(
        SubgraphUrl === '' ? SUBGRAPH_URL : SubgraphUrl,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
            }),
        }
    );

    const { data } = await response.json();

    // Remove any duplicate pools
    let joined = data.poolIn.concat(data.poolOut);
    var exclusivePools = joined.reduce((accumalator, current) => {
        if (!accumalator.some(item => item.id === current.id)) {
            accumalator.push(current);
        }
        return accumalator;
    }, []);

    return { pools: exclusivePools };
}
