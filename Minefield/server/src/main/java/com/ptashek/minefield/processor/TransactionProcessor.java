package com.ptashek.minefield.processor;

import com.aol.cyclops.control.ReactiveSeq;
import com.aol.cyclops.data.async.Queue;
import com.aol.cyclops.data.async.QueueFactories;
import com.aol.cyclops.data.async.wait.WaitStrategy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.Locale;
import java.util.concurrent.ConcurrentHashMap;
import com.ptashek.minefield.server.Server;
import com.ptashek.minefield.stats.Stats;

/**
 * Created by Lukasz Szmit on 08/01/2017.
 */
/* Processes input data, ships it to output queue */
public class TransactionProcessor implements Runnable {

  private Gson gson;
  private Queue<Transaction> input;
  private Queue<String> output;
  private ConcurrentHashMap<String, ConcurrentHashMap<String, Stats>> data;


  public TransactionProcessor() {
    gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

    input = QueueFactories.<Transaction>boundedNonBlockingQueue(Server.MAX_THREADS,
        WaitStrategy.yieldWait()).build();
    output = QueueFactories.<String>boundedNonBlockingQueue(Server.MAX_THREADS,
        WaitStrategy.yieldWait()).build();
    data = new ConcurrentHashMap<>();
  }

  public void run() {
    input.stream().forEach(this::processTransaction);
  }

  public ReactiveSeq<String> getOutputStream() {
    return output.stream();
  }

  public boolean offer(Transaction transaction) {
    return input.offer(transaction);
  }

  private void processTransaction(Transaction transaction) {
    final String currencyPair = String.format(
        Locale.ENGLISH, "%s/%s",
        transaction.getCurrencyFrom(),
        transaction.getCurrencyTo()
    );
    final String country = transaction.getOriginatingCountry();
    final ConcurrentHashMap<String, Stats> statsCache = data
        .getOrDefault(currencyPair, new ConcurrentHashMap<>());

    final Stats stats = statsCache.getOrDefault(country, new Stats())
        .bumpTransactionCount()
        .appendFxRate(transaction.getRate())
        .addTransactionSize(transaction.getAmountSell());

    statsCache.put(country, stats);
    data.put(currencyPair, statsCache);

    output.add(gson.toJson(data));
  }
}
