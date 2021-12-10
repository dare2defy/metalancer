import { Contract } from '@ethersproject/contracts';
import { BaseProvider } from '@ethersproject/providers';
import { Pools, Pool, SubGraphPools, Token } from './types';
import * as bmath from './bmath';

export async function getAllPoolDataOnChain(
    pools: SubGraphPools,
    multiAddress: string,
    provider: BaseProvider
): Promise<Pools> {
    if (pools.pools.length === 0) throw Error('There are no pools.');
    console.log(pools);
    console.log('export async function getAllPoolDataOnChain');

    let addresses = [];
    let total = 0;

    for (let i = 0; i < pools.pools.length; i++) {
        let pool = pools.pools[i];

        addresses.push([pool.id]);
        total++;
        pool.tokens.forEach(token => {
            addresses[i].push(token.address);
            total++;
        });
    }

    const poolAbi = require('./abi/BPool_ABI.json');

    let j = 0;
    let onChainPools: Pools = { pools: [] };

    for (let i = 0; i < pools.pools.length; i++) {
        let tokens: Token[] = [];

        const poolContract = new Contract(pools.pools[i].id, poolAbi, provider);
        let tokensList = await poolContract.getCurrentTokens();
        let swapFee = await poolContract.getSwapFee();
        let isFinal = await poolContract.isFinalized();
        let getTotalDenormalizedWeight = await poolContract.getTotalDenormalizedWeight();
        if (!isFinal) {
            continue;
        }

        let p: Pool = {
            id: pools.pools[i].id,
            swapFee: bmath.bnum(swapFee),
            totalWeight: bmath.bnum(getTotalDenormalizedWeight),
            tokens: tokens,
            tokensList: tokensList,
        };

        for (let j = 0; j < pools.pools[i].tokens.length; j++) {
            let token = pools.pools[i].tokens[j];
            let denormWeight = await poolContract.getDenormalizedWeight(
                token.address
            );
            let bal = await poolContract.getBalance(token.address);
            p.tokens.push({
                address: token.address,
                balance: bmath.bnum(bal),
                decimals: Number(token.decimals),
                denormWeight: bmath.scale(bmath.bnum(token.denormWeight), 18),
            });
        }
        onChainPools.pools.push(p);
    }
    console.log('onchain pools');
    console.log(onChainPools);
    return onChainPools;
}
