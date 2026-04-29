'use client'
import CoinCard from '@/components/coincard';
import Hero from '@/components/hero';
// import Loader from '@/components/loading';
import Logout from '@/components/logout';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CiWallet } from 'react-icons/ci';
import { FaRegCopy } from 'react-icons/fa6';
import coinPrices, { CoinPrices } from '@/libs/prices';

const HomePage: React.FC<any> = ({ userInfoString }) => {
  const [userInfo, _] = useState(JSON.parse(userInfoString))
  const [loading, isLoading] = useState(true);
  const [prices, setPrices] = useState<any>([])
  const coins = ['BTC', 'ETH', 'XLM', 'XRP', 'USDT', 'BNB', 'ADA', 'DOGE', 'LTC', 'SHIB', 'ALGO', 'PEPE', 'SOL'];

  useEffect(() => {
    const getPrices = async () => {
      try {
        const urls = coins.map(coin => `https://api.coinconvert.net/convert/${coin}/usd?amount=1`);
        const responses = await Promise.all(urls.map(url => axios.get(url)));
        const formattedPrices = responses.map((response, index) => {
          const coin = coins[index];
          const keys = Object.keys(response.data);
          const usdKey = keys.find(key => key !== 'status' && key !== coin);
          return {
            asset_id: coin,
            price_usd: usdKey ? response.data[usdKey] : 0
          };
        });
        setPrices(formattedPrices);
        isLoading(false)
      } catch (err: any) {
       isLoading(false)
      }
    }
    getPrices()
  }, [])



  function extractPrice(coin: any) {
    let price = 0;
    if (prices.length > 0) {
      prices.map((e: { asset_id: any; price_usd: number }) => {
        if (e.asset_id === coin) {
          price = e.price_usd as number;
        }
      });
    }
    return price;
  }

  function getPriceAmounts(c: number, p: number) {
    if (c) {
      return c * p
    } else {
      return 0 * p
    }

  }

  const coinsThem = [
    {
      name: "Bitcoin",
      image: "/btc.png",
      short: "BTC",
      network: 'btc',
      price: extractPrice("BTC"),
      changePercent: 0.00089,
      amount: userInfo?.balance?.BTC || 0,
      priceAmount: getPriceAmounts(
        userInfo?.balance?.BTC as number || 0,
        extractPrice("BTC")
      ),
    },
    {
      name: "Ethereum",
      image: "/eth.png",
      short: "ETH",
      network: 'eth',
      price: extractPrice("ETH"),
      changePercent: 0.00089,
      amount: userInfo?.balance?.ETH || 0,
      priceAmount: getPriceAmounts(
        userInfo?.balance?.ETH as number || 0,
        extractPrice("ETH")
      ),
    },
    {
      name: "Stellar",
      image: "/xlm.png",
      short: "XLM",
      network: 'xlm',
      price: extractPrice("XLM"),
      changePercent: 0.00089,
      amount: userInfo?.balance?.XLM || 0,
      priceAmount: getPriceAmounts(
        userInfo?.balance?.XLM as number || 0,
        extractPrice("XLM")
      ),
    },
    {
      name: "Ripple",
      image: "/xrp.png",
      short: "XRP",
      network: 'xrp',
      price: extractPrice("XRP"),
      changePercent: 0.00089,
      amount: userInfo?.balance?.XRP || 0,
      priceAmount: getPriceAmounts(
        userInfo?.balance?.XRP as number || 0,
        extractPrice("XRP")
      ),
    },
    {
      name: "Tether",
      image: "/usdt.png",
      short: "USDT",
      network: 'erc20',
      price: extractPrice("USDT"),
      changePercent: 0.00089,
      amount: userInfo?.balance?.USDTerc20 || 0,
      priceAmount: getPriceAmounts(
        userInfo?.balance?.USDTerc20 as number || 0,
        extractPrice("USDT")
      ),
    },
    {
      name: "Binance Coin",
      image: "/bnb.png",
      short: "BNB",
      network: 'bnb',
      price: extractPrice("BNB"),
      changePercent: 0.00089,
      amount: userInfo?.balance?.BNB || 0,
      priceAmount: getPriceAmounts(
        userInfo?.balance?.BNB as number || 0,
        extractPrice("BNB")
      ),
    },
    {
      name: "Cardano",
      image: "/ada.png",
      short: "ADA",
      network: 'ada',
      price: extractPrice("ADA"),
      changePercent: 0.00089,
      amount: userInfo?.balance?.ADA || 0,
      priceAmount: getPriceAmounts(
        userInfo?.balance?.ADA as number || 0,
        extractPrice("ADA")
      ),
    },
    {
      name: "Dogecoin",
      image: "/doge.png",
      short: "DOGE",
      network: 'doge',
      price: extractPrice("DOGE"),
      changePercent: 0.00089,
      amount: userInfo?.balance?.DOGE || 0,
      priceAmount: getPriceAmounts(
        userInfo?.balance?.DOGE as number || 0,
        extractPrice("DOGE")
      ),
    },
    {
      name: "Litecoin",
      image: "/ltc.png",
      short: "LTC",
      network: 'ltc',
      price: extractPrice("LTC"),
      changePercent: 0.00089,
      amount: userInfo?.balance?.LTC || 0,
      priceAmount: getPriceAmounts(
        userInfo?.balance?.LTC as number || 0,
        extractPrice("LTC")
      ),
    },
    {
      name: "Shiba Inu",
      image: "/shib.png",
      short: "SHIB",
      network: 'erc20',
      price: extractPrice("SHIB"),
      changePercent: 0.00089,
      amount: userInfo?.balance?.SHIB || 0,
      priceAmount: getPriceAmounts(
        userInfo?.balance?.SHIB as number || 0,
        extractPrice("SHIB")
      ),
    },
    {
      name: "Algorand",
      image: "/algo.png",
      short: "ALGO",
      network: 'algo',
      price: extractPrice("ALGO"),
      changePercent: 0.00089,
      amount: userInfo?.balance?.ALGO || 0,
      priceAmount: getPriceAmounts(
        userInfo?.balance?.ALGO as number || 0,
        extractPrice("ALGO")
      ),
    },
    {
      name: "Pepe",
      image: "/pepe.png",
      short: "PEPE",
      network: 'erc20',
      price: extractPrice("PEPE"),
      changePercent: 0.00089,
      amount: userInfo?.balance?.PEPE || 0,
      priceAmount: getPriceAmounts(
        userInfo?.balance?.PEPE as number || 0,
        extractPrice("PEPE")
      ),
    },
    {
      name: "Solana",
      image: "/sol.png",
      short: "SOL",
      network: 'sol',
      price: extractPrice("SOL"),
      changePercent: 0.00089,
      amount: userInfo?.balance?.SOL || 0,
      priceAmount: getPriceAmounts(
        userInfo?.balance?.SOL as number || 0,
        extractPrice("SOL")
      ),
    },
  ];

  const Total =
    prices.length > 0
      ? coinsThem.reduce((acc, coins) => acc + coins.priceAmount, 0)
      : null;

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen" >
      <div className="flex space-x-2 animate-pulse">
        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
      </div>
    </div >
  }



  return <div className="md:px-20 pb-20 pt-5">
    <div className="w-full bg-gradient-to-br from-blue-500 to-blue-700 rounded-md md:px-10 px-2 py-5 text-gray-100">
      <div className="flex justify-between font-bold text-sm">
        <div className="">
          Total Balance
        </div>

        <Link className="flex" href={'/main/connect-wallet'}>

          <CiWallet className='text-xl' />

          <div className="ml-1">Connect Wallet</div>
        </Link>
      </div>

      <div className="mt-5 grid md:grid-cols-2">
        <div className="">
          <div className="text-xs flex">Wallet ID <span className='font-bold ml-1'> 0x***</span> <FaRegCopy className='ml-1' /></div>
          <div className="text-let text-2xl font-bold">${Total !== null ? (
            (Math.round((Total + Number.EPSILON) * 100) / 100).toLocaleString()
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

          }</div>
        </div>



      </div>
    </div>
    <div className="w-full mx-auto pb-5 pt-10 clear-both">
      {coinsThem.map((data, index) => {
        return (
          <div key={index} className='my-4 w-full rounded-lg bg-white shadow shadow-blue-200 md:p-5 py-5 px-2'>
            <CoinCard props={data} />
          </div>
        );
      })}
    </div>
  </div>
};

export default HomePage;
