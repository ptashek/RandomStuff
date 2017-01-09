package com.ptashek.minefield.processor;

import com.google.gson.Gson;
import java.io.InputStreamReader;

/**
 * Created by Lukasz Szmit on 07/01/2017.
 */
public class Transaction {

  private Long userId;
  private String currencyFrom;
  private String currencyTo;
  private Double amountSell;
  private Double amountBuy;
  private Double rate;
  private String timePlacedRaw;
  private String originatingCountry;

  public static Transaction fromJSON(InputStreamReader reader) {
    return new Gson().fromJson(reader, Transaction.class);
  }

  public Long getUserId() {
    return userId;
  }

  public String getCurrencyFrom() {
    return currencyFrom;
  }

  public String getCurrencyTo() {
    return currencyTo;
  }

  public Double getAmountSell() {
    return amountSell;
  }

  public Double getRate() {
    return rate;
  }

  public String getTimePlacedRaw() {
    return timePlacedRaw;
  }

  public String getOriginatingCountry() {
    return originatingCountry;
  }
}
