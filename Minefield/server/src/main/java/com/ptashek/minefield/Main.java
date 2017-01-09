package com.ptashek.minefield;

import java.io.IOException;
import com.ptashek.minefield.server.Server;


public final class Main {

  private static Server server;

  public static void main(String[] args) {
    /* Add our own shutdown hook, to help with server cleanup */
    Runtime.getRuntime().addShutdownHook(getShutdownHook());
    try {
      server = new Server();
      /* port could be configurable via args */
      server.start(8080);
    } catch (IOException e) {
      e.printStackTrace();
      System.exit(255);
    }
  }

  private static Thread getShutdownHook() {
    return new Thread(new Runnable() {
      @Override
      public void run() {
        System.out.print("Shutting down... ");
        if (server != null) {
          try {
            server.stop();
          } catch (IOException e) {
            e.printStackTrace();
          }
        }
        System.out.println("bye!");
      }
    });
  }
}
