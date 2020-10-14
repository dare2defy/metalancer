// Tests Multihop SOR vs static allPools.json file.
// Includes timing data.
import * as sor from '../src';
import { assert, expect } from 'chai';
import { Swap } from '../src/types';
import { BigNumber } from '../src/utils/bignumber';
import {
    formatAndFilterPools,
    filterPools,
    testSwapsExactIn,
    testSwapsExactOut,
    fullSwap,
    alterPools,
} from './utils';
import { BONE } from '../src/bmath';
import { utils } from 'ethers';

const allPools = require('./allPools.json');
const disabledTokens = require('./disabled-tokens.json');

const WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'; // WETH lower case
const DAI = '0x6b175474e89094c44da98b954eedeac495271d0f'; // DAI lower case
const ANT = '0x960b236a07cf122663c4303350609a66a7b288c0'; // ANT lower case
const USDC = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'; // USDC lower case
const MKR = '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2'; // MKR lower case
const OCEAN = '0x985dd3d42de1e256d09e1c10f112bccb8015ad41';

let allPoolsCorrect, allPoolsWrong;

describe('Tests Multihop SOR vs static allPools.json', () => {
    it('Saved pool check - without disabled filter', async () => {
        // Uses saved pools @25/05/20.
        assert.equal(allPools.pools.length, 64, 'Should be 64 pools');
        let allTokensSet;
        // Converts Subgraph string format to Wei/Bnum format
        [allTokensSet, allPoolsCorrect] = formatAndFilterPools(
            JSON.parse(JSON.stringify(allPools))
        );

        assert.equal(allTokensSet.size, 42, 'Should be 42 token sets'); // filter excludes duplicates
        assert.equal(
            allPoolsCorrect.pools.length,
            50,
            'Should be 50 pools with non-zero balance'
        );

        allPoolsWrong = JSON.parse(JSON.stringify(allPools));
        allPoolsWrong = alterPools(allPoolsWrong); // Creates incorrect token balances

        expect(allPools).to.not.eql(allPoolsWrong);
        expect(allPoolsCorrect).to.not.eql(allPoolsWrong);
        let at;
        [at, allPoolsWrong] = formatAndFilterPools(
            allPoolsWrong,
            disabledTokens.tokens
        );
    });

    it('Saved pool check - with disabled filter', async () => {
        // Uses saved pools @25/05/20.
        assert.equal(allPools.pools.length, 64, 'Should be 64 pools');
        let allTokensSet;
        // Converts Subgraph string format to Wei/Bnum format
        [allTokensSet, allPoolsCorrect] = formatAndFilterPools(
            JSON.parse(JSON.stringify(allPools)),
            disabledTokens.tokens
        );

        assert.equal(allTokensSet.size, 39, 'Should be 39 token sets'); // filter excludes duplicates
        assert.equal(
            allPoolsCorrect.pools.length,
            50,
            'Should be 48 pools with non-zero balance'
        );
    });

    it('getTokenPairsMultiHop - Should return direct & multihop partner tokens', async () => {
        let allTokensSet;
        // Converts Subgraph string format to Wei/Bnum format
        [allTokensSet, allPoolsCorrect] = formatAndFilterPools(
            JSON.parse(JSON.stringify(allPools)),
            disabledTokens.tokens
        );

        let [directTokenPairsSET, allTokenPairsSET] = sor.getTokenPairsMultiHop(
            DAI,
            allTokensSet
        );

        assert.equal(
            directTokenPairsSET.length,
            16,
            'Should have 16 direct tokens'
        );

        assert.equal(
            allTokenPairsSET.length,
            33,
            'Should be 33 multi-hop tokens'
        );
    });

    it('filterPoolsWithTokensDirect - DAI/ANT Pools with local disabled list', async () => {
        const directPools = sor.filterPoolsWithTokensDirect(
            allPoolsCorrect.pools,
            DAI,
            ANT,
            { isOverRide: true, disabledTokens: disabledTokens.tokens }
        );

        assert.equal(
            Object.keys(directPools).length,
            0,
            'Should have 0 direct pools'
        );
    });

    it('filterPoolsWithTokensDirect - DAI/OCEAN Pools with no disabled list', async () => {
        const directPools = sor.filterPoolsWithTokensDirect(
            allPoolsCorrect.pools,
            DAI,
            OCEAN,
            { isOverRide: true, disabledTokens: [] }
        );

        assert.equal(
            Object.keys(directPools).length,
            1,
            'Should have 1 direct pools with no disabled'
        );
    });

    it('filterPoolsWithTokensDirect - DAI/OCEAN Pools with disabled list', async () => {
        const directPools = sor.filterPoolsWithTokensDirect(
            allPoolsCorrect.pools,
            DAI,
            OCEAN,
            { isOverRide: true, disabledTokens: disabledTokens.tokens }
        );

        assert.equal(
            Object.keys(directPools).length,
            0,
            'Should have 0 direct pools'
        );
    });

    it('filterPoolsWithTokensDirect - WETH/ANT Pools', async () => {
        const directPools = sor.filterPoolsWithTokensDirect(
            allPoolsCorrect.pools,
            WETH,
            ANT,
            { isOverRide: true, disabledTokens: disabledTokens.tokens }
        );
        assert.equal(
            Object.keys(directPools).length,
            0,
            'Should have 0 direct pools'
        );
    });

    it('filterPoolsWithTokensDirect - WETH/DAI Pools', async () => {
        let directPools = sor.filterPoolsWithTokensDirect(
            allPoolsCorrect.pools,
            WETH,
            DAI,
            { isOverRide: true, disabledTokens: disabledTokens.tokens }
        );
        assert.equal(
            Object.keys(directPools).length,
            10,
            'Should have 10 direct pools'
        );
        directPools = sor.filterPoolsWithTokensDirect(
            allPoolsCorrect.pools,
            DAI,
            WETH,
            { isOverRide: true, disabledTokens: disabledTokens.tokens }
        );
        assert.equal(
            Object.keys(directPools).length,
            10,
            'Should have 10 direct pools'
        );
    });

    it('Get multihop pools - WETH>DAI', async () => {
        let poolsTokenIn, poolsTokenOut, directPools, hopTokens;
        [directPools, hopTokens, poolsTokenIn, poolsTokenOut] = sor.filterPools(
            allPoolsCorrect.pools,
            WETH,
            DAI,
            {
                isOverRide: true,
                disabledTokens: disabledTokens.tokens,
            }
        );

        let mostLiquidPoolsFirstHop, mostLiquidPoolsSecondHop;
        [
            mostLiquidPoolsFirstHop,
            mostLiquidPoolsSecondHop,
        ] = sor.sortPoolsMostLiquid(
            WETH,
            DAI,
            hopTokens,
            poolsTokenIn,
            poolsTokenOut
        );

        let pools, pathData;
        [pools, pathData] = sor.parsePoolData(
            directPools,
            WETH,
            DAI,
            mostLiquidPoolsFirstHop,
            mostLiquidPoolsSecondHop,
            hopTokens
        );

        assert.equal(
            mostLiquidPoolsFirstHop.length,
            4,
            'Should have 4 mostLiquidPoolsFirstHop'
        );
        assert.equal(
            mostLiquidPoolsSecondHop.length,
            4,
            'Should have 4 mostLiquidPoolsSecondHop'
        );
        assert.equal(hopTokens.length, 4, 'Should have 4 hopTokens');
        assert.equal(
            Object.keys(pools).length,
            16,
            'Should have 16 multi-hop pools'
        );
    });

    it('Full Multihop SOR, WETH>DAI, swapExactIn', async () => {
        const amountIn = new BigNumber(1).times(BONE);
        const swapType = 'swapExactIn';
        const noPools = 4;
        const tokenIn = WETH;
        const tokenOut = DAI;

        let swapsCorrect: Swap[][], totalAmtOutCorrect: BigNumber;
        [swapsCorrect, totalAmtOutCorrect] = fullSwap(
            allPoolsCorrect,
            tokenIn,
            tokenOut,
            swapType,
            noPools,
            amountIn,
            disabledTokens
        );

        let swapsWrong: Swap[][], totalAmtOutWrong: BigNumber;
        [swapsWrong, totalAmtOutWrong] = fullSwap(
            allPoolsWrong, // This would represent pools using balances from incorrect Subgraph
            tokenIn,
            tokenOut,
            swapType,
            noPools,
            amountIn,
            disabledTokens
        );

        let swapsCorrected: Swap[][], totalAmtOutCorrected: BigNumber;
        [swapsCorrected, totalAmtOutCorrected] = sor.checkSwapsExactIn(
            JSON.parse(JSON.stringify(swapsWrong)),
            tokenIn,
            tokenOut,
            amountIn,
            totalAmtOutWrong,
            allPoolsCorrect // This would represent pools using correct on-chain balances
        );

        assert.equal(swapsCorrect.length, 3, 'Should have 3 swaps.');
        let diff = totalAmtOutCorrect.minus(totalAmtOutCorrected);
        console.log(`Diff Out: ${diff.toString()}`);

        testSwapsExactIn(
            swapsCorrected,
            tokenIn,
            tokenOut,
            amountIn,
            totalAmtOutCorrected,
            allPoolsCorrect
        );

        testSwapsExactIn(
            swapsCorrect,
            tokenIn,
            tokenOut,
            amountIn,
            totalAmtOutCorrect,
            allPoolsCorrect
        );
    });

    it('Full Multihop SOR, WETH>DAI, swapExactOut', async () => {
        const amountOut = new BigNumber(1000).times(BONE);
        const swapType = 'swapExactOut';
        const noPools = 4;
        const tokenIn = WETH;
        const tokenOut = DAI;

        let swapsCorrect: Swap[][], totalAmtInCorrect: BigNumber;
        [swapsCorrect, totalAmtInCorrect] = fullSwap(
            allPoolsCorrect,
            tokenIn,
            tokenOut,
            swapType,
            noPools,
            amountOut,
            disabledTokens
        );

        assert.equal(swapsCorrect.length, 4, 'Should have 4 swaps.');
        testSwapsExactOut(
            swapsCorrect,
            tokenIn,
            tokenOut,
            amountOut,
            totalAmtInCorrect,
            allPoolsCorrect
        );

        let swapsWrong: Swap[][], totalAmtInWrong: BigNumber;
        [swapsWrong, totalAmtInWrong] = fullSwap(
            allPoolsWrong, // This would represent pools using balances from incorrect Subgraph
            tokenIn,
            tokenOut,
            swapType,
            noPools,
            amountOut,
            disabledTokens
        );

        expect(swapsCorrect).to.not.eql(swapsWrong);
        expect(totalAmtInCorrect).to.not.eql(totalAmtInWrong);

        let swapsCorrected: Swap[][], totalAmtInCorrected: BigNumber;
        [swapsCorrected, totalAmtInCorrected] = sor.checkSwapsExactOut(
            JSON.parse(JSON.stringify(swapsWrong)),
            tokenIn,
            tokenOut,
            amountOut,
            totalAmtInWrong,
            allPoolsCorrect // This would represent pools using correct on-chain balances
        );

        testSwapsExactOut(
            swapsCorrected,
            tokenIn,
            tokenOut,
            amountOut,
            totalAmtInCorrected,
            allPoolsCorrect
        );

        let diff = totalAmtInCorrect.minus(totalAmtInCorrected);
        console.log(`Diff In: ${diff.toString()}`);
    });

    it('Full Multihop SOR, DAI>ANT, swapExactIn - No Disabled Tokens, should have swap', async () => {
        const amountIn = new BigNumber(1).times(BONE);
        const swapType = 'swapExactIn';
        const noPools = 4;
        const tokenIn = DAI;
        const tokenOut = ANT;

        let disabledTokens = { tokens: [] };
        let swaps: Swap[][], totalAmtOut: BigNumber;
        [swaps, totalAmtOut] = fullSwap(
            allPoolsCorrect,
            tokenIn,
            tokenOut,
            swapType,
            noPools,
            amountIn,
            disabledTokens
        );

        assert.equal(swaps.length, 1, 'Should have 1 swaps.');
        testSwapsExactIn(
            swaps,
            tokenIn,
            tokenOut,
            amountIn,
            totalAmtOut,
            allPoolsCorrect
        );
    });

    it('Full Multihop SOR, DAI>ANT, swapExactIn - Disabled Tokens, should not have swap', async () => {
        const amountIn = new BigNumber(1).times(BONE);
        const swapType = 'swapExactIn';
        const noPools = 4;
        const tokenIn = DAI;
        const tokenOut = ANT;

        let swaps: Swap[][], totalAmtOut: BigNumber;
        [swaps, totalAmtOut] = fullSwap(
            allPoolsCorrect,
            tokenIn,
            tokenOut,
            swapType,
            noPools,
            amountIn,
            disabledTokens
        );

        assert.equal(swaps.length, 0, 'Should have 0 swaps.');
        assert.equal(
            utils.formatEther(totalAmtOut.toString()),
            '0.0',
            'Total Out Should Match'
        );
    });

    it('Full Multihop SOR, WETH>ANT, swapExactIn', async () => {
        const amountIn = new BigNumber(1).times(BONE);
        const swapType = 'swapExactIn';
        const noPools = 4;
        const tokenIn = WETH;
        const tokenOut = ANT;

        let swaps: Swap[][], totalAmtOut: BigNumber;
        [swaps, totalAmtOut] = fullSwap(
            allPoolsCorrect,
            tokenIn,
            tokenOut,
            swapType,
            noPools,
            amountIn,
            disabledTokens
        );

        assert.equal(swaps.length, 0, 'Should have 0 swaps.');
        assert.equal(
            utils.formatEther(totalAmtOut.toString()),
            '0.0',
            'Total Out Should Match'
        );
    });

    it('Full Multihop SOR, WETH>ANT, swapExactOut', async () => {
        const amountOut = new BigNumber(1000).times(BONE);
        const swapType = 'swapExactOut';
        const noPools = 4;
        const tokenIn = WETH;
        const tokenOut = ANT;

        let swaps: Swap[][], totalAmtIn: BigNumber;
        [swaps, totalAmtIn] = fullSwap(
            allPoolsCorrect,
            tokenIn,
            tokenOut,
            swapType,
            noPools,
            amountOut,
            disabledTokens
        );

        assert.equal(swaps.length, 0, 'Should have 0 swaps.');
        assert.equal(
            utils.formatEther(totalAmtIn.toString()),
            '0.0',
            'Total Out Should Match'
        );
    });

    it('Full Multihop SOR, USDC>MKR, swapExactIn', async () => {
        const amountIn = new BigNumber('1000000'); // 1 USDC
        const swapType = 'swapExactIn';
        const noPools = 4;
        const tokenIn = USDC;
        const tokenOut = MKR;

        let swapsCorrect: Swap[][], totalAmtOutCorrect: BigNumber;
        [swapsCorrect, totalAmtOutCorrect] = fullSwap(
            allPoolsCorrect,
            tokenIn,
            tokenOut,
            swapType,
            noPools,
            amountIn,
            disabledTokens
        );

        assert.equal(swapsCorrect.length, 2, 'Should have 2 swaps.');
        testSwapsExactIn(
            swapsCorrect,
            tokenIn,
            tokenOut,
            amountIn,
            totalAmtOutCorrect,
            allPoolsCorrect
        );

        let swapsWrong: Swap[][], totalAmtOutWrong: BigNumber;
        [swapsWrong, totalAmtOutWrong] = fullSwap(
            allPoolsWrong, // This would represent pools using balances from incorrect Subgraph
            tokenIn,
            tokenOut,
            swapType,
            noPools,
            amountIn,
            disabledTokens
        );

        let swapsCorrected: Swap[][], totalAmtOutCorrected: BigNumber;
        [swapsCorrected, totalAmtOutCorrected] = sor.checkSwapsExactIn(
            JSON.parse(JSON.stringify(swapsWrong)),
            tokenIn,
            tokenOut,
            amountIn,
            totalAmtOutWrong,
            allPoolsCorrect // This would represent pools using correct on-chain balances
        );

        testSwapsExactIn(
            swapsCorrected,
            tokenIn,
            tokenOut,
            amountIn,
            totalAmtOutCorrected,
            allPoolsCorrect
        );

        let diff = totalAmtOutCorrect.minus(totalAmtOutCorrected);
        console.log(`Diff Out: ${diff.toString()}`);
    });

    it('Full Multihop SOR, USDC>MKR, swapExactOut', async () => {
        const amountOut = new BigNumber(10).times(BONE);
        const swapType = 'swapExactOut';
        const noPools = 4;
        const tokenIn = USDC;
        const tokenOut = MKR;

        let swapsCorrect: Swap[][], totalAmtInCorrect: BigNumber;
        [swapsCorrect, totalAmtInCorrect] = fullSwap(
            allPoolsCorrect,
            tokenIn,
            tokenOut,
            swapType,
            noPools,
            amountOut,
            disabledTokens
        );

        assert.equal(swapsCorrect.length, 2, 'Should have 2 swaps.');
        testSwapsExactOut(
            swapsCorrect,
            tokenIn,
            tokenOut,
            amountOut,
            totalAmtInCorrect,
            allPoolsCorrect
        );

        let swapsWrong: Swap[][], totalAmtInWrong: BigNumber;
        [swapsWrong, totalAmtInWrong] = fullSwap(
            allPoolsWrong, // This would represent pools using balances from incorrect Subgraph
            tokenIn,
            tokenOut,
            swapType,
            noPools,
            amountOut,
            disabledTokens
        );

        expect(swapsCorrect).to.not.eql(swapsWrong);
        expect(totalAmtInCorrect).to.not.eql(totalAmtInWrong);

        let swapsCorrected: Swap[][], totalAmtInCorrected: BigNumber;
        [swapsCorrected, totalAmtInCorrected] = sor.checkSwapsExactOut(
            JSON.parse(JSON.stringify(swapsWrong)),
            tokenIn,
            tokenOut,
            amountOut,
            totalAmtInWrong,
            allPoolsCorrect // This would represent pools using correct on-chain balances
        );

        testSwapsExactOut(
            swapsCorrected,
            tokenIn,
            tokenOut,
            amountOut,
            totalAmtInCorrected,
            allPoolsCorrect
        );

        let diff = totalAmtInCorrect.minus(totalAmtInCorrected);
        console.log(`Diff In: ${diff.toString()}`);
    });

    it('Full Multihop SOR, Should still complete multihop with disabled token pool', async () => {
        const amountOut = new BigNumber(10).times(BONE);
        const swapType = 'swapExactOut';
        const noPools = 4;
        const tokenIn = '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a1';
        const tokenOut = '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a4';

        let swapsCorrect: Swap[][], totalAmtInCorrect: BigNumber;
        [swapsCorrect, totalAmtInCorrect] = fullSwap(
            allPoolsCorrect,
            tokenIn,
            tokenOut,
            swapType,
            noPools,
            amountOut,
            disabledTokens
        );

        assert.equal(swapsCorrect.length, 1, 'Should have 1 swaps.');
        testSwapsExactOut(
            swapsCorrect,
            tokenIn,
            tokenOut,
            amountOut,
            totalAmtInCorrect,
            allPoolsCorrect
        );

        let swapsWrong: Swap[][], totalAmtInWrong: BigNumber;
        [swapsWrong, totalAmtInWrong] = fullSwap(
            allPoolsWrong, // This would represent pools using balances from incorrect Subgraph
            tokenIn,
            tokenOut,
            swapType,
            noPools,
            amountOut,
            disabledTokens
        );

        expect(swapsCorrect).to.not.eql(swapsWrong);
        expect(totalAmtInCorrect).to.not.eql(totalAmtInWrong);

        let swapsCorrected: Swap[][], totalAmtInCorrected: BigNumber;
        [swapsCorrected, totalAmtInCorrected] = sor.checkSwapsExactOut(
            JSON.parse(JSON.stringify(swapsWrong)),
            tokenIn,
            tokenOut,
            amountOut,
            totalAmtInWrong,
            allPoolsCorrect // This would represent pools using correct on-chain balances
        );

        testSwapsExactOut(
            swapsCorrected,
            tokenIn,
            tokenOut,
            amountOut,
            totalAmtInCorrected,
            allPoolsCorrect
        );

        let diff = totalAmtInCorrect.minus(totalAmtInCorrected);
        console.log(`Diff In: ${diff.toString()}`);
    });
});
