package com.ptashek.minefield.server;

import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.util.concurrent.RejectedExecutionHandler;
import java.util.concurrent.ThreadPoolExecutor;

/**
 * Created by Lukasz Szmit on 07/01/2017.
 */

/* Implements logic for handling requests not fitting into the request queue */
public class RejectedExecutionHandlerActual implements RejectedExecutionHandler {

  private static byte[] responseBytes = "Try again: 120".getBytes();

  @Override
  public void rejectedExecution(Runnable runnable, ThreadPoolExecutor executor) {
    try {
      final HttpExchange httpExchange = (HttpExchange) runnable;
      /*
        429 = Too many requests.
        Sent with "Try again: x", the client should retry after x seconds.
        Provided, of course, it has its own logic to handle this state.
      */
      httpExchange.sendResponseHeaders(429, responseBytes.length);

      final OutputStream responseBody = httpExchange.getResponseBody();
      responseBody.write(responseBytes);
      responseBody.close();

      executor.remove(runnable);
      System.out.println("Rejected");
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
