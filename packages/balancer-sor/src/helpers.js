import BigNumber from 'bignumber.js';

BigNumber.config({ DECIMAL_PLACES: 18 });

export const getSpotPrice = balancer => {
    let inRatio = balancer.balanceIn.div(balancer.weightIn);
    let outRatio = balancer.balanceOut.div(balancer.weightOut);
    let spotPrice = inRatio
        .div(outRatio)
        .div(BigNumber(1).minus(balancer.swapFee));
    return spotPrice;
};

export const getSlippageLinearizedSpotPriceAfterSwap = (balancer, swapType) => {
    let weightIn = balancer.weightIn;
    let weightOut = balancer.weightOut;
    let balanceIn = balancer.balanceIn;
    let balanceOut = balancer.balanceOut;
    let swapFee = balancer.swapFee;
    if (swapType === 'swapExactIn') {
        return BigNumber(1)
            .minus(swapFee)
            .times(weightIn.div(weightOut))
            .decimalPlaces(18)
            .plus(BigNumber(1))
            .div(balanceIn);
    } else {
        return weightOut
            .div(
                BigNumber(1)
                    .minus(swapFee)
                    .times(weightIn)
                    .decimalPlaces(18)
            )
            .plus(BigNumber(1))
            .div(balanceOut);
    }
};

export const getSlippageLinearizedEffectivePriceSwap = (balancer, swapType) => {
    let weightIn = balancer.weightIn;
    let weightOut = balancer.weightOut;
    let balanceIn = balancer.balanceIn;
    let balanceOut = balancer.balanceOut;
    let swapFee = balancer.swapFee;
    if (swapType == 'swapExactIn') {
        return BigNumber(1)
            .minus(swapFee)
            .times(weightIn.div(weightOut).plus(BigNumber(1)))
            .decimalPlaces(18)
            .div(
                BigNumber(2)
                    .times(balanceIn)
                    .decimalPlaces(18)
            );
    } else {
        return weightOut
            .div(weightIn)
            .plus(BigNumber(1))
            .div(
                BigNumber(2)
                    .times(balanceOut)
                    .decimalPlaces(18)
            );
    }
};

export const getLinearizedOutputAmountSwap = (balancer, swapType, amount) => {
    let spotPrice = getSpotPrice(balancer); // TODO
    let slippageLinearizedEp = getSlippageLinearizedEffectivePriceSwap(
        balancer,
        swapType
    );

    if (swapType == 'swapExactIn') {
        let amountIn = BigNumber(amount);
        return amountIn.div(
            spotPrice
                .times(
                    BigNumber(1).plus(
                        slippageLinearizedEp.times(amountIn).decimalPlaces(18)
                    )
                )
                .decimalPlaces(18)
        );
    } else {
        let amountOut = BigNumber(amount);
        return amountOut
            .times(
                spotPrice
                    .times(
                        BigNumber(1).plus(
                            slippageLinearizedEp
                                .times(amountOut)
                                .decimalPlaces(18)
                        )
                    )
                    .decimalPlaces(18)
            )
            .decimalPlaces(18);
    }
};
