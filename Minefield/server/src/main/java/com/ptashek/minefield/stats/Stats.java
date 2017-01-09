package com.ptashek.minefield.stats;

import com.google.gson.annotations.Expose;
import java.math.BigDecimal;
import java.math.BigInteger;

/**
 * Created by Lukasz Szmit on 08/01/2017.
 */
final public class Stats {

  /* Exposed to Gson */
  @Expose
  private BigInteger transactionCount;
  @Expose
  private BigDecimal avgExchangeRate;
  @Expose
  private BigDecimal avgTransactionSize;


  /* Not exposed to Gson */
  private BigDecimal fxRateSum;
  private BigDecimal sellLotSum;

  public Stats() {
    /*
      Because doing math on primitives is meh,
      plus these can hold "arbitrary" values.

      Performance is worse, but worth the trade-off.
    */
    transactionCount = BigInteger.ZERO;
    avgExchangeRate = BigDecimal.ZERO;
    avgTransactionSize = BigDecimal.ZERO;
    fxRateSum = BigDecimal.ZERO;
    sellLotSum = BigDecimal.ZERO;
  }

  public Stats bumpTransactionCount() {
    transactionCount = transactionCount.add(BigInteger.ONE);
    return this;
  }

  public Stats appendFxRate(Double fxRate) {
    if (!transactionCount.equals(BigInteger.ZERO)) {
      fxRateSum = fxRateSum.add(BigDecimal.valueOf(fxRate));
      avgExchangeRate = fxRateSum.divide(
          BigDecimal.valueOf(transactionCount.doubleValue()),
          BigDecimal.ROUND_UNNECESSARY
      );
    }
    return this;
  }

  public Stats addTransactionSize(Double transactionSize) {
    if (!transactionCount.equals(BigInteger.ZERO)) {
      sellLotSum = sellLotSum.add(BigDecimal.valueOf(transactionSize));
      avgTransactionSize = sellLotSum.divide(
          BigDecimal.valueOf(transactionCount.doubleValue()),
          BigDecimal.ROUND_UNNECESSARY
      );
    }
    return this;
  }
}
