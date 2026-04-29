import Hero from "@/components/hero";
// import Loader from "@/components/loading";
import Logout from "@/components/logout";
import { authOptions } from "@/libs/auth";
import dbConnect from "@/libs/dbConnect";
import { getServerSession } from "next-auth";
import User from "@/model/user";
import userstake from "@/model/userstake";

interface DATATYPE {
  _id: string;
  name: string;
  coin: string;
  amount: number;
  rate: number;
  duration: number;
  confirmed: string;
  user: string;
  completedOn: string;
  createdOn: string;
}

export default async function Stake() {
  const Userresponce = (await getServerSession(authOptions)) as any;
  await dbConnect();
  const userInfo = await User.findOne({
    email: Userresponce?.user?.email,
  }).exec();

  const stakes = await userstake
    .find<DATATYPE>({
      user: Userresponce?.user?.id,
    })
    .exec();

  let prices: any[] = [
    {
      asset_id: "BTC",
      name: "Bitcoin",
      type_is_crypto: 1,
      data_quote_start: "2014-02-24T00:00:00.0000000Z",
      data_quote_end: "2024-08-24T00:00:00.0000000Z",
      data_orderbook_start: "2014-02-24T17:43:05.0000000Z",
      data_orderbook_end: "2023-07-07T00:00:00.0000000Z",
      data_trade_start: "2010-07-17T00:00:00.0000000Z",
      data_trade_end: "2024-08-24T00:00:00.0000000Z",
      data_symbols_count: 242283,
      volume_1hrs_usd: 99749505194.71,
      volume_1day_usd: 21680133222122.51,
      volume_1mth_usd: 2075605622751853.5,
      price_usd: 63955.769921136016,
      id_icon: "4caf2b16-a017-4e26-a348-2cea69c34cba",
      chain_addresses: [[Object], [Object]],
      data_start: "2010-07-17",
      data_end: "2024-08-24",
    },
    {
      asset_id: "LTC",
      name: "Litecoin",
      type_is_crypto: 1,
      data_quote_start: "2014-04-21T00:00:00.0000000Z",
      data_quote_end: "2024-08-24T00:00:00.0000000Z",
      data_orderbook_start: "2014-04-20T15:06:34.0000000Z",
      data_orderbook_end: "2023-07-07T00:00:00.0000000Z",
      data_trade_start: "2013-05-19T00:00:00.0000000Z",
      data_trade_end: "2024-08-24T00:00:00.0000000Z",
      data_symbols_count: 13624,
      volume_1hrs_usd: 47925201.82,
      volume_1day_usd: 446344868.07,
      volume_1mth_usd: 300598760576.44,
      price_usd: 65.20659945826978,
      id_icon: "a201762f-1499-41ef-9b84-e0742cd00e48",
      data_start: "2013-05-19",
      data_end: "2024-08-24",
    },
    {
      asset_id: "XRP",
      name: "Ripple",
      type_is_crypto: 1,
      data_quote_start: "2014-08-01T00:00:00.0000000Z",
      data_quote_end: "2024-08-24T00:00:00.0000000Z",
      data_orderbook_start: "2014-07-31T13:05:46.0000000Z",
      data_orderbook_end: "2023-07-07T00:00:00.0000000Z",
      data_trade_start: "2013-11-25T00:00:00.0000000Z",
      data_trade_end: "2024-08-24T00:00:00.0000000Z",
      data_symbols_count: 18957,
      volume_1hrs_usd: 59023072.15,
      volume_1day_usd: 755060135.96,
      volume_1mth_usd: 122349557880.28,
      price_usd: 0.6023179130601075,
      id_icon: "ba90bcb0-cafb-4801-ac5d-d310f47d6411",
      data_start: "2013-11-25",
      data_end: "2024-08-24",
    },
    {
      asset_id: "USDT",
      name: "Tether",
      type_is_crypto: 1,
      data_quote_start: "2016-06-12T00:00:00.0000000Z",
      data_quote_end: "2024-08-24T00:00:00.0000000Z",
      data_orderbook_start: "2016-06-12T11:53:38.1680117Z",
      data_orderbook_end: "2023-07-07T00:00:00.0000000Z",
      data_trade_start: "2013-12-27T00:00:00.0000000Z",
      data_trade_end: "2024-08-24T00:00:00.0000000Z",
      data_symbols_count: 218639,
      volume_1hrs_usd: 225442735411229070000,
      volume_1day_usd: 1.6922584868016994e21,
      volume_1mth_usd: 8.215393250567503e22,
      price_usd: 1.0003906970889898,
      id_icon: "5ed65416-963e-4e57-998a-3c302da8936e",
      chain_addresses: [[Object], [Object]],
      data_start: "2013-12-27",
      data_end: "2024-08-24",
    },
    {
      asset_id: "DOGE",
      name: "DogeCoin",
      type_is_crypto: 1,
      data_quote_start: "2014-08-01T00:00:00.0000000Z",
      data_quote_end: "2024-08-24T00:00:00.0000000Z",
      data_orderbook_start: "2014-07-31T13:05:46.0000000Z",
      data_orderbook_end: "2023-07-07T00:00:00.0000000Z",
      data_trade_start: "2014-02-21T00:00:00.0000000Z",
      data_trade_end: "2024-08-24T00:00:00.0000000Z",
      data_symbols_count: 13979,
      volume_1hrs_usd: 24462617.25,
      volume_1day_usd: 305390754806.55,
      volume_1mth_usd: 8763336524954.77,
      price_usd: 0.10925779277702177,
      id_icon: "63e240f3-047f-41c7-9179-6784bc719f63",
      data_start: "2014-02-21",
      data_end: "2024-08-24",
    },
    {
      asset_id: "ETH",
      name: "Ethereum",
      type_is_crypto: 1,
      data_quote_start: "2015-08-08T00:00:00.0000000Z",
      data_quote_end: "2024-08-24T00:00:00.0000000Z",
      data_orderbook_start: "2015-08-07T14:50:38.1774950Z",
      data_orderbook_end: "2023-07-07T00:00:00.0000000Z",
      data_trade_start: "2015-08-07T00:00:00.0000000Z",
      data_trade_end: "2024-08-24T00:00:00.0000000Z",
      data_symbols_count: 203005,
      volume_1hrs_usd: 419505840.27,
      volume_1day_usd: 28714205991.35,
      volume_1mth_usd: 6.62588569537177e23,
      price_usd: 2757.002942045476,
      id_icon: "604ae453-3d9f-4ad0-9a48-9905cce617c2",
      chain_addresses: [[Object], [Object]],
      data_start: "2015-08-07",
      data_end: "2024-08-24",
    },
    {
      asset_id: "XLM",
      name: "Stellar Lumens",
      type_is_crypto: 1,
      data_quote_start: "2016-02-06T00:00:00.0000000Z",
      data_quote_end: "2024-08-24T00:00:00.0000000Z",
      data_orderbook_start: "2016-02-05T16:06:41.5570000Z",
      data_orderbook_end: "2023-07-07T00:00:00.0000000Z",
      data_trade_start: "2016-10-17T00:00:00.0000000Z",
      data_trade_end: "2024-08-24T00:00:00.0000000Z",
      data_symbols_count: 1515,
      volume_1hrs_usd: 3843844.25,
      volume_1day_usd: 3827692210.11,
      volume_1mth_usd: 182423166233.2,
      price_usd: 0.10087584610029768,
      id_icon: "99ab21c6-46f0-4f17-b919-a433eeeb816d",
      data_start: "2016-02-05",
      data_end: "2024-08-24",
    },
    {
      asset_id: "BNB",
      name: "Binance Coin",
      type_is_crypto: 1,
      data_quote_start: "2017-03-20T00:00:00.0000000Z",
      data_quote_end: "2024-08-24T00:00:00.0000000Z",
      data_orderbook_start: "2017-03-19T01:03:17.3570790Z",
      data_orderbook_end: "2023-07-07T00:00:00.0000000Z",
      data_trade_start: "2017-01-14T00:00:00.0000000Z",
      data_trade_end: "2024-08-24T00:00:00.0000000Z",
      data_symbols_count: 11287,
      volume_1hrs_usd: 65127141.93,
      volume_1day_usd: 2067145105.62,
      volume_1mth_usd: 150049773198.91,
      price_usd: 574.7698575935639,
      chain_addresses: [[Object]],
      data_start: "2017-01-14",
      data_end: "2024-08-24",
    },
    {
      asset_id: "PEPE",
      name: "PepeCoin",
      type_is_crypto: 1,
      data_quote_start: "2017-06-19T00:00:00.0000000Z",
      data_quote_end: "2024-08-24T00:00:00.0000000Z",
      data_orderbook_start: "2017-06-18T07:46:26.3549222Z",
      data_orderbook_end: "2023-07-07T00:00:00.0000000Z",
      data_trade_start: "2017-06-16T00:00:00.0000000Z",
      data_trade_end: "2024-08-24T00:00:00.0000000Z",
      data_symbols_count: 167,
      volume_1hrs_usd: 44427595.81,
      volume_1day_usd: 618713918.74,
      volume_1mth_usd: 34902442133.89,
      price_usd: 0.000009099881461350922,
      id_icon: "7e5dddf0-e41e-46b1-8281-a0cdb03cfb31",
      chain_addresses: [[Object], [Object]],
      data_start: "2017-06-16",
      data_end: "2024-08-24",
    },
    {
      asset_id: "ADA",
      name: "Cardano",
      type_is_crypto: 1,
      data_quote_start: "2017-09-30T00:00:00.0000000Z",
      data_quote_end: "2024-08-24T00:00:00.0000000Z",
      data_orderbook_start: "2017-09-29T07:11:06.6463948Z",
      data_orderbook_end: "2023-07-07T00:00:00.0000000Z",
      data_trade_start: "2017-10-01T00:00:00.0000000Z",
      data_trade_end: "2024-08-24T00:00:00.0000000Z",
      data_symbols_count: 3751,
      volume_1hrs_usd: 9784706.87,
      volume_1day_usd: 203540770.39,
      volume_1mth_usd: 27555677488.58,
      price_usd: 0.38258282344784156,
      id_icon: "2701173b-1b77-40f2-8693-9659359e225c",
      data_start: "2017-09-29",
      data_end: "2024-08-24",
    },
    {
      asset_id: "SOL",
      name: "SOL",
      type_is_crypto: 1,
      data_quote_start: "2018-01-17T00:00:00.0000000Z",
      data_quote_end: "2024-08-24T00:00:00.0000000Z",
      data_orderbook_start: "2018-01-16T20:27:45.6566380Z",
      data_orderbook_end: "2023-07-07T00:00:00.0000000Z",
      data_trade_start: "2018-01-13T00:00:00.0000000Z",
      data_trade_end: "2024-08-24T00:00:00.0000000Z",
      data_symbols_count: 44106,
      volume_1hrs_usd: 173073979.18,
      volume_1day_usd: 2468745562.16,
      volume_1mth_usd: 279262422318.16,
      price_usd: 157.91430597442618,
      data_start: "2018-01-13",
      data_end: "2024-08-24",
    },
    {
      asset_id: "FTM",
      name: "FTM",
      type_is_crypto: 1,
      data_quote_start: "2018-07-24T00:00:00.0000000Z",
      data_quote_end: "2024-08-24T00:00:00.0000000Z",
      data_orderbook_start: "2018-07-23T19:37:39.8035059Z",
      data_orderbook_end: "2023-07-07T00:00:00.0000000Z",
      data_trade_start: "2018-10-29T00:00:00.0000000Z",
      data_trade_end: "2024-08-24T00:00:00.0000000Z",
      data_symbols_count: 261,
      volume_1hrs_usd: 6505904.78,
      volume_1day_usd: 152122601.67,
      volume_1mth_usd: 12787267175.96,
      price_usd: 0.48944108605971753,
      chain_addresses: [[Object]],
      data_start: "2018-07-23",
      data_end: "2024-08-24",
    },
    {
      asset_id: "MATIC",
      name: "MATIC",
      type_is_crypto: 1,
      data_quote_start: "2019-04-09T00:00:00.0000000Z",
      data_quote_end: "2024-08-24T00:00:00.0000000Z",
      data_orderbook_start: "2019-04-08T15:19:02.7190000Z",
      data_orderbook_end: "2023-07-07T00:00:00.0000000Z",
      data_trade_start: "2019-04-24T00:00:00.0000000Z",
      data_trade_end: "2024-08-24T00:00:00.0000000Z",
      data_symbols_count: 13418,
      volume_1hrs_usd: 14445316.24,
      volume_1day_usd: 297222339.02,
      volume_1mth_usd: 12684390866.07,
      price_usd: 0.5339045365128594,
      chain_addresses: [[Object], [Object]],
      data_start: "2019-04-08",
      data_end: "2024-08-24",
    },
    {
      asset_id: "ALGO",
      name: "Algorand",
      type_is_crypto: 1,
      data_quote_start: "2019-06-19T00:00:00.0000000Z",
      data_quote_end: "2024-08-24T00:00:00.0000000Z",
      data_orderbook_start: "2019-06-19T16:48:37.3186922Z",
      data_orderbook_end: "2023-07-07T00:00:00.0000000Z",
      data_trade_start: "2019-06-21T00:00:00.0000000Z",
      data_trade_end: "2024-08-24T00:00:00.0000000Z",
      data_symbols_count: 287,
      volume_1hrs_usd: 824306.67,
      volume_1day_usd: 17969796.16,
      volume_1mth_usd: 1842146607.91,
      price_usd: 0.14335096115635987,
      data_start: "2019-06-19",
      data_end: "2024-08-24",
    },
    {
      asset_id: "SHIB",
      name: "Shiba Inu",
      type_is_crypto: 1,
      data_quote_start: "2021-02-01T00:00:00.0000000Z",
      data_quote_end: "2024-08-24T00:00:00.0000000Z",
      data_orderbook_start: "2022-01-01T00:00:00.0000000Z",
      data_orderbook_end: "2023-07-07T00:00:00.0000000Z",
      data_trade_start: "2021-04-17T00:00:00.0000000Z",
      data_trade_end: "2024-08-24T00:00:00.0000000Z",
      data_symbols_count: 377,
      volume_1hrs_usd: 2822522315.42,
      volume_1day_usd: 38439998466.05,
      volume_1mth_usd: 2179219051530.96,
      price_usd: 0.00001507238366230901,
      chain_addresses: [[Object]],
      data_start: "2021-02-01",
      data_end: "2024-08-24",
    },
  ];
  //   try {
  //     const apiKey = "5B04AC9E-E22C-4666-9036-8CA5D880105A";
  //     const baseUrl = "https://rest.coinapi.io/v1/";
  //     const endpointPath = "assets";
  //     const filter_symbol_id =
  //       "BTC;ETH;XLM;XRP;USDT;BNB;ADA;DOGE;LTC;SHIB;MATIC;FTM;ALGO;PEPE;SOL";
  //     const limit = 10;
  //     const headers = {
  //       "X-CoinAPI-Key": apiKey,
  //     };
  //     const responce = await axios.get(
  //       `${baseUrl}${endpointPath}?filter_asset_id=${filter_symbol_id}&limit=${limit}`,
  //       {
  //         headers,
  //       }
  //     );
  //     prices = responce.data;
  //   } catch (err: any) {
  //     console.log(err);
  //   }

  function extractPrice(coin: any) {
    let price = 0;
    if (prices.length > 0) {
      prices.map((e) => {
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

  const coinsThem = [
    {
      name: "Bitcon",
      image: "/btc.png",
      short: "BTC",
      price: extractPrice("BTC"),
      changePercent: 0.00089,
      amount: userInfo?.balance.BTC,
      priceAmount: getPriceAmounts(
        userInfo?.balance.BTC as number,
        extractPrice("BTC")
      ),
    },
    {
      name: "Etherium",
      short: "ETH",
      image: "/eth.png",
      price: extractPrice("ETH"),
      changePercent: 0.00089,
      amount: userInfo?.balance.ETH,
      priceAmount: getPriceAmounts(
        userInfo?.balance.ETH as number,
        extractPrice("ETH")
      ),
    },
    {
      name: "XLM",
      short: "XLM",
      image: "/xlm.png",
      price: extractPrice("XLM"),
      changePercent: 0.00089,
      amount: userInfo?.balance.XLM,
      priceAmount: getPriceAmounts(
        userInfo?.balance.XLM as number,
        extractPrice("XLM")
      ),
    },
    {
      name: "Ripple",
      short: "XRP",
      image: "/xrp.png",
      price: extractPrice("XRP"),
      changePercent: 0.00089,
      amount: userInfo?.balance.XRP,
      priceAmount: getPriceAmounts(
        userInfo?.balance.XRP as number,
        extractPrice("XRP")
      ),
    },
    {
      name: "USDT",
      short: "TRC",
      image: "/usdt.png",
      price: extractPrice("USDT"),
      changePercent: 0.00089,
      amount: userInfo?.balance.USDT,
      priceAmount: getPriceAmounts(
        userInfo?.balance.USDT as number,
        extractPrice("USDT")
      ),
    },
    {
      name: "Binance Coin",
      short: "BNB",
      image: "/bnb.png",
      price: extractPrice("BNB"),
      changePercent: 0.00089,
      amount: userInfo?.balance.BNB,
      priceAmount: getPriceAmounts(
        userInfo?.balance.BNB as number,
        extractPrice("BNB")
      ),
    },
    {
      name: "Cardano",
      short: "ADA",
      image: "/ada.png",
      price: extractPrice("ADA"),
      changePercent: 0.00089,
      amount: userInfo?.balance.ADA,
      priceAmount: getPriceAmounts(
        userInfo?.balance.ADA as number,
        extractPrice("ADA")
      ),
    },
    {
      name: "Doge Coin",
      short: "DOGE",
      image: "/doge.png",
      price: extractPrice("DOGE"),
      changePercent: 0.00089,
      amount: userInfo?.balance.DOGE,
      priceAmount: getPriceAmounts(
        userInfo?.balance.DOGE as number,
        extractPrice("DOGE")
      ),
    },
    {
      name: "Litecoin",
      short: "LTC",
      image: "/ltc.png",
      price: extractPrice("LTC"),
      changePercent: 0.00089,
      amount: userInfo?.balance.LTC,
      priceAmount: getPriceAmounts(
        userInfo?.balance.LTC as number,
        extractPrice("LTC")
      ),
    },
    {
      name: "SHIBA INU (SHIBA)",
      short: "SHIB",
      image: "/shib.png",
      price: extractPrice("SHIB"),
      changePercent: 0.00089,
      amount: userInfo?.balance.SHIB,
      priceAmount: getPriceAmounts(
        userInfo?.balance.SHIB as number,
        extractPrice("SHIB")
      ),
    },
    {
      name: "POLYGON",
      short: "MATIC",
      image: "/matic.png",
      price: extractPrice("MATIC"),
      changePercent: 0.00089,
      amount: userInfo?.balance.MATIC,
      priceAmount: getPriceAmounts(
        userInfo?.balance.MATIC as number,
        extractPrice("MATIC")
      ),
    },
    {
      name: "FANTOM",
      short: "FTM",
      image: "/ftm.png",
      price: extractPrice("FTM"),
      changePercent: 0.00089,
      amount: userInfo?.balance.FTM,
      priceAmount: getPriceAmounts(
        userInfo?.balance.FTM as number,
        extractPrice("FTM")
      ),
    },

    {
      name: "ALGORAND",
      short: "ALGO",
      image: "/algo.png",
      price: extractPrice("ALGO"),
      changePercent: 0.00089,
      amount: userInfo?.balance.ALGO,
      priceAmount: getPriceAmounts(
        userInfo?.balance.ALGO as number,
        extractPrice("ALGO")
      ),
    },
    {
      name: "PEPE",
      short: "PEPE",
      image: "/pepe.png",
      price: extractPrice("PEPE"),
      changePercent: 0.00089,
      amount: userInfo?.balance.PEPE,
      priceAmount: getPriceAmounts(
        userInfo?.balance.PEPE as number,
        extractPrice("PEPE")
      ),
    },
    {
      name: "SOLANA",
      short: "SOL",
      image: "/solena.png",
      price: extractPrice("SOL"),
      changePercent: 0.00089,
      amount: userInfo?.balance.SOL,
      priceAmount: getPriceAmounts(
        userInfo?.balance.SOL as number,
        extractPrice("SOL")
      ),
    },
  ];

  const Total =
    prices.length > 0
      ? coinsThem.reduce((acc, coins) => acc + coins.priceAmount, 0)
      : null;

  async function handleShowYeild(data: DATATYPE, index: number) {
    let endDate = new Date(data.completedOn);
    let today = new Date(Date.now());
    if (today > endDate) {
      try {
        const user = await User.findById(data.user);
        user.balance[data.coin] =
          user.balance[data.coin] +
          (data.amount + data.amount * (data.rate / 100));
        await user.save();
        await userstake.findByIdAndDelete(data._id);
      } catch (err) {
        console.log(err);
      }
    } else {
      let timeDifference = endDate.getTime() - today.getTime();
      let daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      return (
        <div className="w-full rounded-xl shadow pb-4" key={index}>
          <div className="h-8 flex justify-center items-center text-white font-semibold bg-gradient-to-tr from-gray-700 to-gray-900 rounded-t-xl">
            {data.name}
          </div>
          <div className="text-center flex justify-center mt-5">
            <div className="font-thin text-4xl">{data.rate}%</div>
            <div className="text-xs mt-auto uppercase">yeild</div>
          </div>
          <div className="flex justify-between px-2 text-gray-700 mt-5">
            <div className="">Coin :</div>
            <div className="">{data.coin}</div>
          </div>
          <div className="flex justify-between px-2 text-gray-800 mt-4">
            <div className="">Amount:</div>
            <div className="">
              {data.amount} <span className="text-xs">{data.coin}</span>
            </div>
          </div>

          <div className="flex justify-between px-2 text-gray-800 mt-4">
            <div className="">Duration:</div>
            <div className="">{data.duration}</div>
          </div>

          <div className="flex justify-between px-2 text-gray-800 mt-4">
            <div className="">Started:</div>
            <div className="">
              {new Date(data.createdOn).toISOString().split("T")[0]}
            </div>
          </div>

          <div className="flex justify-between px-2 text-gray-800 mt-4">
            <div className="">Ends On:</div>
            <div className="">
              {new Date(data.completedOn).toISOString().split("T")[0]}
            </div>
          </div>

          <div className="flex justify-between px-2 text-gray-800 mt-4">
            <div className="">Ends In:</div>
            <div className="">
              {daysDifference} <span className="text-xs">Days</span>
            </div>
          </div>

          <div className="flex justify-between px-2 text-gray-800 mt-4">
            <div className="">Today{"'"}s Yeild:</div>
            <div className="">
              {parseFloat(
                String((data.rate / 100 / data.duration) * data.amount)
              ).toFixed(5)}{" "}
              <span className="text-xs">{data.coin}</span>
            </div>
          </div>

          <div
            className={`flex transition-all justify-between px-2 text-gray-800 mt-4`}
          >
            <div className="">Total Yeild:</div>
            <div className="">
              {(data.rate / 100) * data.amount}{" "}
              <span className="text-xs">{data.coin}</span>
            </div>
          </div>
        </div>
      );
    }
  }
  return (
    <>
      <div className="h-44 bg-gray-950 w-full text-white float-left mx-auto px-4">
        <Logout />
        <div className="w-full bg-gray-950 mt-12 rounded-lg p-5">
          <div className="text-white font-semibold text-xl">
            <div className="">Total Balance</div>
            <div className="pb-5">
              {Total ? (
                Math.round((Total + Number.EPSILON) * 100) / 100
              ) :
                // <Loader size={"30"} speed={"2"} color={"white"} />
                <div
                  className="inline-block h-2 w-2 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                  role="status">
                  <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                  >Loading...</span
                  >
                </div>
              }
            </div>
          </div>
          <div className="bg-white w-full h-[0.5px]"></div>

          <Hero coinsThem={coinsThem} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5 pt-40 clear-both px-4 md:px-2 md:pb-10">
        {stakes.length > 0 ? (
          stakes.map((data, index) => handleShowYeild(data, index))
        ) : (
          <div className="col-span-3 h-[60vh] flex justify-center items-center text-4xl font-bold">
            <div className="text-center font-thin -mt-4">
              No Tokens Locked Yet{" "}
              <small>Select a token To Lock and Start Yeilding</small>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
