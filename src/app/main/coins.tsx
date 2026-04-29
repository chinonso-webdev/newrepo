function getDetials(userinfo: any, price: any) {
  let coins = [
    {
      name: "Bitcon",
      image: "/btc.png",
      short: "BTC",
      price: extractPrice(price, "BTC"),
      changePercent: 0.00089,
      amount: userinfo?.balance.BTC,
      priceAmount: getPriceAmounts(
        userinfo?.balance.BTC as number,
        extractPrice(price, "BTC")
      ),
    },
    {
      name: "Etherium",
      short: "ETH",
      image: "/eth.png",
      price: extractPrice(price, "ETH"),
      changePercent: 0.00089,
      amount: userinfo?.balance.ETH,
      priceAmount: getPriceAmounts(
        userinfo?.balance.ETH as number,
        extractPrice(price, "ETH")
      ),
    },
    {
      name: "XLM",
      short: "XLM",
      image: "/xlm.png",
      price: extractPrice(price, "XLM"),
      changePercent: 0.00089,
      amount: userinfo?.balance.XLM,
      priceAmount: getPriceAmounts(
        userinfo?.balance.XLM as number,
        extractPrice(price, "XLM")
      ),
    },
    {
      name: "Ripple",
      short: "XRP",
      image: "/xrp.png",
      price: extractPrice(price, "XRP"),
      changePercent: 0.00089,
      amount: userinfo?.balance.XRP,
      priceAmount: getPriceAmounts(
        userinfo?.balance.XRP as number,
        extractPrice(price, "XRP")
      ),
    },
    {
      name: "USDT",
      short: "TRC",
      image: "/usdt.png",
      price: extractPrice(price, "USDT"),
      changePercent: 0.00089,
      amount: userinfo?.balance.USDT,
      priceAmount: getPriceAmounts(
        userinfo?.balance.USDT as number,
        extractPrice(price, "USDT")
      ),
    },
    {
      name: "Binance Coin",
      short: "BNB",
      image: "/bnb.png",
      price: extractPrice(price, "BNB"),
      changePercent: 0.00089,
      amount: userinfo?.balance.BNB,
      priceAmount: getPriceAmounts(
        userinfo?.balance.BNB as number,
        extractPrice(price, "BNB")
      ),
    },
    {
      name: "Cardano",
      short: "ADA",
      image: "/ada.png",
      price: extractPrice(price, "ADA"),
      changePercent: 0.00089,
      amount: userinfo?.balance.ADA,
      priceAmount: getPriceAmounts(
        userinfo?.balance.ADA as number,
        extractPrice(price, "ADA")
      ),
    },
    {
      name: "Doge Coin",
      short: "DOGE",
      image: "/doge.png",
      price: extractPrice(price, "DOGE"),
      changePercent: 0.00089,
      amount: userinfo?.balance.DOGE,
      priceAmount: getPriceAmounts(
        userinfo?.balance.DOGE as number,
        extractPrice(price, "DOGE")
      ),
    },
    {
      name: "Litecoin",
      short: "LTC",
      image: "/ltc.png",
      price: extractPrice(price, "LTC"),
      changePercent: 0.00089,
      amount: userinfo?.balance.LTC,
      priceAmount: getPriceAmounts(
        userinfo?.balance.LTC as number,
        extractPrice(price, "LTC")
      ),
    },
    {
      name: "SHIBA INU (SHIBA)",
      short: "SHIB",
      image: "/shib.png",
      price: extractPrice(price, "SHIB"),
      changePercent: 0.00089,
      amount: userinfo?.balance.SHIB,
      priceAmount: getPriceAmounts(
        userinfo?.balance.SHIB as number,
        extractPrice(price, "SHIB")
      ),
    },
    {
      name: "POLYGON",
      short: "MATIC",
      image: "/matic.png",
      price: extractPrice(price, "MATIC"),
      changePercent: 0.00089,
      amount: userinfo?.balance.MATIC,
      priceAmount: getPriceAmounts(
        userinfo?.balance.MATIC as number,
        extractPrice(price, "MATIC")
      ),
    },
    {
      name: "FANTOM",
      short: "FTM",
      image: "/ftm.png",
      price: extractPrice(price, "FTM"),
      changePercent: 0.00089,
      amount: userinfo?.balance.FTM,
      priceAmount: getPriceAmounts(
        userinfo?.balance.FTM as number,
        extractPrice(price, "FTM")
      ),
    },

    {
      name: "ALGORAND",
      short: "ALGO",
      image: "/algo.png",
      price: extractPrice(price, "ALGO"),
      changePercent: 0.00089,
      amount: userinfo?.balance.ALGO,
      priceAmount: getPriceAmounts(
        userinfo?.balance.ALGO as number,
        extractPrice(price, "ALGO")
      ),
    },
    {
      name: "PEPE",
      short: "PEPE",
      image: "/pepe.png",
      price: extractPrice(price, "PEPE"),
      changePercent: 0.00089,
      amount: userinfo?.balance.PEPE,
      priceAmount: getPriceAmounts(
        userinfo?.balance.PEPE as number,
        extractPrice(price, "PEPE")
      ),
    },
    {
      name: "SOLANA",
      short: "SOL",
      image: "/solena.png",
      price: extractPrice(price, "SOL"),
      changePercent: 0.00089,
      amount: userinfo?.balance.SOL,
      priceAmount: getPriceAmounts(
        userinfo?.balance.SOL as number,
        extractPrice(price, "SOL")
      ),
    },
  ];

  return coins;
}

let Total = (userinfo: any, prices: any) => {
  return prices.length > 0
    ? getDetials(userinfo, prices).reduce(
        (acc, coins) => acc + coins.priceAmount,
        0
      )
    : 0;
};

function extractPrice(prices: [], coin: any) {
  let price = 0;
  if (prices.length > 0) {
    prices.map((e: { asset_id: any; price_usd: number }) => {
      if (e.asset_id === coin) {
        price = e.price_usd as number;
      }
    });
  }
  return price || 0;
}

function getPriceAmounts(c: number, p: number) {
  if (c) {
    return c * p;
  } else {
    return 0 * p;
  }
}

export { Total, getDetials };
