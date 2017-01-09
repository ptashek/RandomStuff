package com.ptashek.minefield.server;

import java.util.Locale;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

/* This could be used for writing data to some monitoring system */
public final class PoolMonitor implements Runnable {

  private boolean keepGoing = true;
  private ThreadPoolExecutor threadPoolExecutor;
  private long interval;

  public PoolMonitor(ThreadPoolExecutor executor, long interval, TimeUnit intervalUnit) {
    threadPoolExecutor = executor;

    switch (intervalUnit) {
      case MILLISECONDS:
        this.interval = interval;
        break;

      case SECONDS:
        this.interval = interval * 1000;
        break;

      default:
        this.interval = 5000;
        break;
    }
  }

  public void stop() {
    keepGoing = false;
  }

  @Override
  public void run() {
    while (keepGoing) {
      System.out.println(String
          .format(
              Locale.ENGLISH,
              "\"{'active_tasks':'%d', 'completed_tasks':'%d', 'total_tasks':'%d', 'thread_pool_size':'%d'}\"",
              threadPoolExecutor.getActiveCount(),
              threadPoolExecutor.getTaskCount(),
              threadPoolExecutor.getCompletedTaskCount(),
              threadPoolExecutor.getPoolSize()
          )
      );
      try {
        Thread.sleep(interval);
      } catch (InterruptedException e) {
        stop();
        e.printStackTrace();
      }
    }
  }
}
