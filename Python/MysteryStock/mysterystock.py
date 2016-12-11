'''
	Problem:
        Given an array of stock prices, each representing a different timestamp
        and ordered by time in ascending order, find the biggest profit
        (or smallest loss) one could make, provided that stock must be bought
        before it can be sold, and no buy/sell operation may occurr within the same
        time slot.

        Example:

        [35, 41, 17, 8, 5, 26, 29, 47, 20, 44, 38, 11, 14, 23, 32]
        Buy at 5 to sell at 47, for total profit of 42

        [11, 47, 8, 20, 5, 35, 17, 23, 26, 29, 41, 32, 38, 14, 44]
        But at 5 to sell at 44, for total profit of 39

        This is unlikely to win TopCoder, but it works.

	Author: Lukasz Szmit
	License: MIT
'''
from random import shuffle

def find_max_profit(prices):
    size = len(prices)

    # Cover some of the most basic cases upfront
    if size == 0:
        return (0, 0, 0)
    elif size == 1:
        return (prices[0], prices[0], 0)
    elif size == 2:
        return (prices[0], prices[1], prices[1] - prices[0])

    # current sell price index
    current_idx = 1
    # init buy and sell price to the first two values
    buy_price = prices[0]
    sell_price = prices[1]
    # init current best profit
    best_profit = sell_price - buy_price
    '''
        best buy price is a price that is lower than the current buy price,
        and one we may have seen earlier in the price list lookup
    '''
    best_buy = buy_price
    best_buy_idx = 0

    # loop through all available prices, skipping first index as it's processed
    for idx, price in enumerate(prices):
        if idx == 0:
            continue
        '''
            current price is lower than best buy - store it, along with its index
            we will use that index later to decide if we can use the best buy price
        '''
        if price < best_buy:
            best_buy_idx = idx
            best_buy = price

        profit = price - buy_price
        '''
            if new profit is better, and we're further up than the last sell price
            store the current price as the new sell price, update profit and index
        '''
        if profit > best_profit and idx > current_idx:
            current_idx = idx
            sell_price = price
            best_profit = profit

        # new price lower than current buy price, and we're not past end of list
        if price < buy_price and idx + 1 < size:
            # take next price, see if we can get a better profit this way
            profit = prices[idx + 1] - price
            # got better profit - update buy and sell price, and its index
            if profit > best_profit:
                current_index = idx + 1
                best_profit = profit
                buy_price = price
                sell_price = prices[idx + 1]
        '''
            check if we might still get a better profit using best buy -
            but only if best buy is not the current price since
            we can't buy and sell in the same time slot
        '''
        profit = price - best_buy
        if profit > best_profit and best_buy_idx != idx:
            sell_price = price
            buy_price = best_buy
            best_profit = profit

    # last ditch attempt to get maximum profit, if best buy was seen earlier
    if best_buy_idx < current_idx:
        return (best_buy, sell_price, sell_price - best_buy)
    else:
        return (buy_price, sell_price, best_profit)


def _test_find_max_profit():
    test_data = [
        {
            "buy": 5,
            "sell": 47,
            "profit": 42,
            "prices":
            [35, 41, 17, 8, 5, 26, 29, 47, 20, 44, 38, 11, 14, 23, 32],
        },
        {
            "buy": 5,
            "sell": 44,
            "profit": 39,
            "prices":
            [11, 47, 8, 20, 5, 35, 17, 23, 26, 29, 41, 32, 38, 14, 44],
        },
        {
            "buy": 14,
            "sell": 47,
            "profit": 33,
            "prices":
            [14, 41, 47, 38, 35, 44, 5, 23, 8, 26, 11, 32, 29, 20, 17],
        },
        {
            "buy": 5,
            "sell": 41,
            "profit": 36,
            "prices":
            [47, 29, 44, 11, 23, 32, 5, 20, 35, 26, 38, 17, 14, 8, 41],
        },
        {
            "buy": 5,
            "sell": 4,
            "profit": -1,
            "prices": [5, 4, 3, 2, 1],
        },
        {
            "buy": 0,
            "sell": 0,
            "profit": 0,
            "prices": [],
        },
        {
            "buy": 2,
            "sell": 1,
            "profit": -1,
            "prices": [2, 1],
        },
        {
            "buy": 1,
            "sell": 1,
            "profit": 0,
            "prices": [1],
        },
    ]

    for test_run, data in enumerate(test_data):
        (buy, sell, profit) = find_max_profit(data["prices"])
        print("Buy: {b}, Sell: {s}, Best profit: {p}".format(
            b=buy, s=sell, p=profit))
        if buy == data["buy"] and sell == data["sell"] and profit == data[
                "profit"]:
            status = "OK"
        else:
            status = "Failed"
        print("Test run {t} => {s}\n".format(t=test_run + 1, s=status))


if __name__ == "__main__":
    _test_find_max_profit()
