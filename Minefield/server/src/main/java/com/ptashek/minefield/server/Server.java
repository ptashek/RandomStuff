package com.ptashek.minefield.server;

import com.aol.cyclops.control.ReactiveSeq;
import com.ptashek.minefield.processor.TransactionProcessor;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import com.ptashek.minefield.processor.Transaction;

/**
 * Created by Lukasz Szmit on 07/01/2017.
 */
/* main server component */
public final class Server {

  public static int MIN_THREADS = 5;
  public static int MAX_THREADS = 25;

  private static Charset utf8 = Charset.forName("UTF-8");

  private HttpServer httpServer;

  /* monitors server thread pool, outputs some basic stats */
  private PoolMonitor poolMonitor;

  /* processes incoming data, pushes it to output stream */
  private TransactionProcessor transactionProcessor;

  public Server() throws IOException {

    /*
      Main server thread pool, with MIN_THREADS initial capacity, MAX_TREADS at most.
      Scaling is done magically on demand.

      Threads are spun-down after 30s idle.
      Requests not fitting into the blocking input queue are rejected with custom logic.
     */
    final ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(
        MIN_THREADS,
        MAX_THREADS,
        30L,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(MAX_THREADS),
        new RejectedExecutionHandlerActual()
    );

    poolMonitor = new PoolMonitor(threadPoolExecutor, 2000, TimeUnit.MILLISECONDS);
    transactionProcessor = new TransactionProcessor();

    httpServer = HttpServer.create();
    httpServer.setExecutor(threadPoolExecutor);

    /* digests incoming data stream */
    httpServer.createContext("/post/", getTransactionHandler());
    /* serves clients stream */
    httpServer.createContext("/get/", getFrontendHandler());
  }

  public void start(int port) throws IOException {
    new Thread(poolMonitor).start();
    new Thread(transactionProcessor).start();
    httpServer.bind(new InetSocketAddress(port), MAX_THREADS);
    httpServer.start();
  }

  public void stop() throws IOException {
    poolMonitor.stop();
    httpServer.stop(1);
  }

  private HttpHandler getTransactionHandler() {
    return new HttpHandler() {
      @Override
      public void handle(HttpExchange httpExchange) throws IOException {
        String response = "Invalid request";
        int responseCode = 500;
        switch (httpExchange.getRequestMethod()) {
          case "POST":
            final Transaction transaction = Transaction.fromJSON(
                new InputStreamReader(httpExchange.getRequestBody(), utf8)
            );
            if (transactionProcessor.offer(transaction)) {
              response = "OK";
              responseCode = 200;
            } else {
              response = "Try again: 30";
            }
            break;

          case "HEAD":
            response = "";
            responseCode = 200;

          default:
            break;
        }
        httpExchange.getRequestBody().close();
        if (response.length() > 0) {
          httpExchange.sendResponseHeaders(responseCode, response.getBytes().length);
          final OutputStream responseStream = httpExchange.getResponseBody();
          responseStream.write(response.getBytes());
          responseStream.close();
        } else {
          httpExchange.sendResponseHeaders(200, -1);
        }
      }
    };
  }

  private HttpHandler getFrontendHandler() {
    return new HttpHandler() {
      @Override
      public void handle(HttpExchange httpExchange) throws IOException {
        String response = "Invalid request";
        int responseCode = 500;
        /* explicit close, since we won't need it (streamed data) */
        httpExchange.getRequestBody().close();
        switch (httpExchange.getRequestMethod()) {
          case "GET":
            /* Add cross-origin header, otherwise browsers have a security issue */
            ArrayList<String> corsHeader = new ArrayList<>(1);
            corsHeader.add("*");
            Headers headers = httpExchange.getResponseHeaders();
            headers.put("Access-Control-Allow-Origin", corsHeader);
            /* chunked output baby! */
            httpExchange.sendResponseHeaders(200, 0);

            OutputStream responseBody = httpExchange.getResponseBody();
            /*
              Stream transaction stats as they come in.
              This never stops, unless the client does.
              Each iteration will serve at least one well-formed JSON string, if available.
             */
            ReactiveSeq<String> t = transactionProcessor.getOutputStream();
            for (String s : t) {
              try {
                responseBody.write(s.getBytes());
                responseBody.write("\n".getBytes());
                responseBody.flush();
              } catch (IOException e) {
                httpExchange.close();
                return;
              }
            }
            responseBody.close();
            break;

          case "HEAD":
            response = "";
            responseCode = 200;

          default:
            break;
        }
        if (response.length() > 0) {
          httpExchange.sendResponseHeaders(responseCode, response.getBytes().length);
          final OutputStream responseStream = httpExchange.getResponseBody();
          responseStream.write(response.getBytes());
          responseStream.close();
        } else {
          httpExchange.sendResponseHeaders(200, -1);
        }
      }
    };
  }
}
