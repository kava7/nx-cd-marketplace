import argparse
import json
import sys
import time
import warnings
from datetime import datetime, timedelta

import numpy as np
import pandas as pd

import requests as _requests
import yfinance as yf

warnings.simplefilter(action="ignore", category=FutureWarning)


# --- GFW patch (same as before) ---
def _is_yahoo_blocked() -> bool:
    try:
        resp = _requests.get(
            "https://query2.finance.yahoo.com/v8/finance/chart/AAPL",
            params={"range": "5d", "interval": "1d"},
            headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            },
            timeout=10,
        )
        return resp.json().get("chart", {}).get("result") is None
    except Exception:
        return True


_USE_PATCH = _is_yahoo_blocked()

if _USE_PATCH:
    try:
        from curl_cffi import requests as _curl_requests
    except ImportError:
        _curl_requests = None

    def _patched_download(tickers, period="1y", interval="1d", **kwargs):
        ticker = tickers[0] if isinstance(tickers, list) else tickers
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
        url = f"https://query2.finance.yahoo.com/v8/finance/chart/{ticker}"
        params = {"range": period if period != "730d" else "2y", "interval": interval}

        try:
            kw = {"url": url, "params": params, "headers": headers, "timeout": 30}
            if _curl_requests is not None:
                kw["impersonate"] = "chrome120"
                resp = _curl_requests.get(**kw)
            else:
                resp = _requests.get(**kw)
            result = resp.json().get("chart", {}).get("result")
            if not result:
                return pd.DataFrame()
            data = result[0]
            df = pd.DataFrame(
                {
                    "Open": data["indicators"]["quote"][0]["open"],
                    "High": data["indicators"]["quote"][0]["high"],
                    "Low": data["indicators"]["quote"][0]["low"],
                    "Close": data["indicators"]["quote"][0]["close"],
                    "Volume": data["indicators"]["quote"][0]["volume"],
                },
                index=pd.to_datetime(data["timestamp"], unit="s"),
            )
            df.index.name = "Date"
            if isinstance(tickers, list) or kwargs.get("group_by") == "ticker":
                df.columns = pd.MultiIndex.from_product([[ticker], df.columns])
            return df
        except Exception as e:
            print(f"patch download fail: {e}", file=sys.stderr)
            return pd.DataFrame()

    yf.download = _patched_download
    print("Yahoo Finance blocked — using curl_cffi patch", file=sys.stderr)
else:
    print("Yahoo Finance reachable — using yfinance directly", file=sys.stderr)


# --- Ticker lists ---
def get_us_target_tickers():
    return [
        "KHC",
        "DUK",
        "MRK",
        "CL",
        "VZ",
        "BMY",
        "SO",
        "JNJ",
        "MDLZ",
        "KO",
        "PG",
        "T",
        "PEP",
        "GILD",
        "PM",
        "LMT",
        "MO",
        "ABBV",
        "XOM",
        "EXC",
        "AMGN",
        "PFE",
        "MCD",
        "UNH",
        "IBM",
        "TMUS",
        "AMT",
        "ABT",
        "MDT",
        "KMI",
        "CVX",
        "LLY",
        "NEE",
        "WMT",
        "GD",
        "COP",
        "CVS",
        "BRK-B",
        "RTX",
        "CMCSA",
        "LIN",
        "UNP",
        "COST",
        "HON",
        "MMM",
        "CSCO",
        "TMO",
        "AIG",
        "LOW",
        "NKE",
        "HD",
        "XEL",
        "AEP",
        "ED",
        "D",
        "ETR",
        "AWK",
        "WEC",
        "ES",
        "CMS",
        "ATO",
        "NI",
        "CNP",
        "FE",
        "PNW",
        "PPL",
        "AES",
        "EIX",
        "EVRG",
        "LNT",
        "SRE",
        "CAG",
        "GIS",
        "K",
        "HSY",
        "CPB",
        "SJM",
        "MKC",
        "HRL",
        "CLX",
        "KMB",
        "EL",
        "CHD",
        "TSN",
        "KR",
        "SYY",
        "VRTX",
        "REGN",
        "BIIB",
        "ZTS",
        "DXCM",
        "HUM",
        "CI",
        "ELV",
        "MCK",
        "CAH",
        "ABC",
        "O",
        "NNN",
        "WPC",
        "VICI",
        "ADC",
        "AVB",
        "ESS",
        "EQR",
        "MAA",
        "UDR",
        "CPT",
        "ARE",
        "PSA",
        "EXR",
        "CUBE",
        "DLR",
        "EQIX",
        "WM",
        "RSG",
        "ITW",
        "NOC",
        "LHX",
        "AON",
        "MMC",
        "PGR",
        "TRV",
        "CB",
        "ALL",
        "AJG",
        "CINF",
        "AFL",
        "PRU",
        "AAPL",
        "MSFT",
        "GOOGL",
        "GOOG",
        "META",
        "NFLX",
        "ADBE",
        "CRM",
        "ORCL",
        "PYPL",
        "V",
        "MA",
        "TXN",
        "SBUX",
        "INTC",
        "JPM",
        "BAC",
        "WFC",
        "GS",
        "MS",
        "C",
        "BLK",
        "AXP",
        "COF",
        "USB",
        "BK",
        "SCHW",
        "SPG",
        "CAT",
        "FDX",
        "UPS",
        "ACN",
        "GE",
        "EMR",
        "DE",
        "DIS",
        "GM",
        "F",
        "TGT",
        "BKNG",
        "NOW",
        "UBER",
        "LYFT",
        "SQ",
        "SNOW",
        "DDOG",
        "ZS",
        "CRWD",
        "PANW",
        "FTNT",
        "NET",
        "MDB",
        "TEAM",
        "ZM",
        "DOCU",
        "OKTA",
        "TWLO",
        "SPLK",
        "WDAY",
        "AVGO",
        "MRVL",
        "LRCX",
        "KLAC",
        "AMAT",
        "ASML",
        "SNPS",
        "CDNS",
        "ON",
        "MCHP",
        "ADI",
        "NXPI",
        "SWKS",
        "QRVO",
        "ISRG",
        "IDXX",
        "ALGN",
        "ILMN",
        "EXAS",
        "FIS",
        "FISV",
        "GPN",
        "INTU",
        "ADP",
        "PAYX",
        "EBAY",
        "ETSY",
        "W",
        "CHWY",
        "DASH",
        "ABNB",
        "EXPE",
        "MAR",
        "HLT",
        "H",
        "DOW",
        "DD",
        "ECL",
        "APD",
        "SHW",
        "PPG",
        "NEM",
        "FCX",
        "SLB",
        "HAL",
        "BKR",
        "EOG",
        "PXD",
        "DVN",
        "OXY",
        "MPC",
        "VLO",
        "PSX",
        "TJX",
        "ROST",
        "DG",
        "DLTR",
        "BBY",
        "ORLY",
        "AZO",
        "AAP",
        "PLD",
        "CCI",
        "SBAC",
        "ICE",
        "CME",
        "NDAQ",
        "MSCI",
        "SPGI",
        "MCO",
        "NVDA",
        "AMD",
        "TSLA",
        "AMZN",
        "QCOM",
        "BA",
        "GME",
        "AMC",
        "BB",
        "NOK",
        "CLOV",
        "WISH",
        "PLTR",
        "SOFI",
        "HOOD",
        "RIVN",
        "LCID",
        "MSTR",
        "COIN",
        "MARA",
        "RIOT",
        "CLSK",
        "HUT",
        "BITF",
        "CIFR",
        "IONQ",
        "RGTI",
        "QUBT",
        "SOUN",
        "UPST",
        "AI",
        "PATH",
        "SMCI",
        "BNTX",
        "NVAX",
        "NKTR",
        "SRPT",
        "ARCT",
        "INO",
        "OCGN",
        "VXRT",
        "NIO",
        "XPEV",
        "LI",
        "GOEV",
        "WKHS",
        "MULN",
        "EVGO",
        "SPCE",
        "RKLB",
        "ASTR",
        "RDW",
        "ACHR",
        "RBLX",
        "U",
        "DKNG",
        "PENN",
        "CHDN",
        "RSI",
        "GENI",
        "TLRY",
        "CGC",
        "ACB",
        "SNDL",
        "CRON",
        "HEXO",
        "OGI",
        "PLUG",
        "FCEL",
        "BE",
        "RUN",
        "ENPH",
        "SEDG",
        "NOVA",
        "ARRY",
        "BABA",
        "JD",
        "PDD",
        "BIDU",
        "TME",
        "BILI",
        "IQ",
        "FUTU",
        "TIGR",
        "SHOP",
        "SNAP",
        "PINS",
        "SPOT",
        "TTD",
        "ROKU",
        "CRSP",
        "EDIT",
        "NTLA",
        "BEAM",
        "IRBT",
        "RXRX",
        "AAOI",
        "COMM",
        "PL",
        "VOR",
        "EVLV",
        "BW",
        "DDC",
        "STRO",
        "GNS",
        "LPRO",
        "HUMA",
        "SKYE",
        "CTMX",
        "SNBR",
        "PRPH",
        "GLXY",
        "HIPO",
        "CABA",
        "PBM",
        "AUUD",
        "MP",
        "ASTS",
        "OPEN",
        "HIMS",
        "VRT",
        "VST",
        "NVO",
        "DUOL",
        "LITM",
        "LAES",
        "FFIE",
        "PDYN",
        "CRCL",
        "BMNR",
        "SBET",
        "DXYZ",
        "DJT",
        "BLSH",
        "SERV",
        "DPST",
        "QMCO",
        "MPB",
        "OKLO",
        "ALAB",
        "NBIS",
        "TEM",
        "FFAI",
        "RDDT",
        "OSCR",
        "NVTS",
        "EH",
        "HOLO",
        "UVXY",
        "CRWV",
        "NMAX",
        "VAPE",
        "SMR",
        "ONDS",
        "JOBY",
        "CVNA",
        "KC",
    ]


def get_jp_target_tickers():
    return ["TM", "HMC", "SONY", "MUFG", "SMFG", "MFG", "NMR", "NSANY"]


def get_hk_target_tickers():
    return ["TCEHY", "BABA", "JD", "PDD", "BIDU", "NTES", "XPEV", "NIO", "LI", "BEKE"]


def get_tickers(market: str):
    if market == "us":
        return get_us_target_tickers()
    elif market == "jp":
        return get_jp_target_tickers()
    elif market == "hk":
        return get_hk_target_tickers()
    raise ValueError(f"Unknown market: {market}")


# --- NX/CD Signal logic (unchanged) ---
length_ema_short = 12
length_ema_long = 26
length_ema_signal = 9


def get_cd_signals(df_input: pd.DataFrame) -> pd.DataFrame:
    df = df_input.copy()
    df["close"] = df["close"].astype(float)

    def ema(s, l):
        return s.ewm(span=l, adjust=False).mean()

    df["D"] = ema(df["close"], length_ema_short) - ema(df["close"], length_ema_long)
    df["A"] = ema(df["D"], length_ema_signal)
    df["M"] = (df["D"] - df["A"]) * 2

    cols = [
        "N1",
        "MM1",
        "CC1",
        "DIFL1",
        "CC2",
        "DIFL2",
        "CC3",
        "DIFL3",
        "AAA",
        "BBB",
        "CCC",
        "JJJ",
        "DXDX",
    ]
    for col in cols:
        df[col] = False if col in ["AAA", "BBB", "CCC", "JJJ", "DXDX"] else np.nan
        if isinstance(df.iloc[0].get(col), bool):
            df[col] = df[col].astype(bool)

    m_cd = (df["M"].shift(1) >= 0) & (df["M"] < 0)
    m_cu = (df["M"].shift(1) <= 0) & (df["M"] > 0)

    for i in range(1, len(df)):
        try:
            s_d = m_cd.iloc[: i + 1]
            if s_d.any():
                df.loc[df.index[i], "N1"] = i - df.index.get_loc(s_d[s_d].index[-1])
        except IndexError:
            pass

        try:
            s_u = m_cu.iloc[: i + 1]
            if s_u.any():
                df.loc[df.index[i], "MM1"] = i - df.index.get_loc(s_u[s_u].index[-1])
        except IndexError:
            pass

        n1 = df.at[df.index[i], "N1"]
        mm1 = df.at[df.index[i], "MM1"]

        if pd.notna(n1):
            l = int(n1) + 1
            w = df.iloc[max(0, i - l + 1) : i + 1]
            df.loc[df.index[i], "CC1"] = w["close"].min()
            df.loc[df.index[i], "DIFL1"] = w["D"].min()
        else:
            df.loc[df.index[i], "CC1"] = df.at[df.index[i], "close"]
            df.loc[df.index[i], "DIFL1"] = df.at[df.index[i], "D"]

        if pd.notna(mm1):
            o = int(mm1) + 1
            if i - o >= 0:
                prev_idx = df.index[i - o]
                df.loc[df.index[i], "CC2"] = df.at[prev_idx, "CC1"]
                df.loc[df.index[i], "DIFL2"] = df.at[prev_idx, "DIFL1"]
                df.loc[df.index[i], "CC3"] = df.at[prev_idx, "CC2"]
                df.loc[df.index[i], "DIFL3"] = df.at[prev_idx, "DIFL2"]
            else:
                c, d = df.at[df.index[i], "close"], df.at[df.index[i], "D"]
                df.loc[df.index[i], "CC2"] = c
                df.loc[df.index[i], "DIFL2"] = d
                df.loc[df.index[i], "CC3"] = c
                df.loc[df.index[i], "DIFL3"] = d
        else:
            c, d = df.at[df.index[i], "close"], df.at[df.index[i], "D"]
            df.loc[df.index[i], "CC2"] = c
            df.loc[df.index[i], "DIFL2"] = d
            df.loc[df.index[i], "CC3"] = c
            df.loc[df.index[i], "DIFL3"] = d

        m_p = df.at[df.index[i - 1], "M"]
        d_c = df.at[df.index[i], "D"]

        aaa = (
            (df.at[df.index[i], "CC1"] < df.at[df.index[i], "CC2"])
            & (df.at[df.index[i], "DIFL1"] > df.at[df.index[i], "DIFL2"])
            & (m_p < 0)
            & (d_c < 0)
        )
        bbb = (
            (df.at[df.index[i], "CC1"] < df.at[df.index[i], "CC3"])
            & (df.at[df.index[i], "DIFL1"] < df.at[df.index[i], "DIFL2"])
            & (df.at[df.index[i], "DIFL1"] > df.at[df.index[i], "DIFL3"])
            & (m_p < 0)
            & (d_c < 0)
        )
        ccc = (aaa | bbb) & (d_c < 0)

        c_p = df.at[df.index[i - 1], "CCC"]
        d_p = df.at[df.index[i - 1], "D"]
        jjj = c_p & (abs(d_p) >= abs(d_c) * 1.01)
        j_p = df.at[df.index[i - 1], "JJJ"]

        df.loc[df.index[i], "AAA"] = aaa
        df.loc[df.index[i], "BBB"] = bbb
        df.loc[df.index[i], "CCC"] = ccc
        df.loc[df.index[i], "JJJ"] = jjj
        df.loc[df.index[i], "DXDX"] = not j_p and jjj

    return df


# --- Timeframe config ---
TIMEFRAME_CONFIG = {
    "4h": {"period": "2mo", "interval": "60m", "scan_days": 2, "label": "4小时抄底"},
    "daily": {"period": "1y", "interval": "1d", "scan_days": 2, "label": "日级别抄底"},
    "weekly": {
        "period": "3y",
        "interval": "1wk",
        "scan_days": 2,
        "label": "周级别抄底",
    },
}


def run_screener(max_stocks=None, market="us", timeframe="daily"):
    found_signals = []
    tickers = get_tickers(market)
    tf_config = TIMEFRAME_CONFIG[timeframe]

    if max_stocks:
        tickers = tickers[:max_stocks]

    scan_start_date = datetime.now() - timedelta(days=tf_config["scan_days"])
    n_stocks = len(tickers)
    print(
        f"Scanning {n_stocks} {market.upper()} stocks [{timeframe}]...", file=sys.stderr
    )

    for i, ticker in enumerate(tickers):
        try:
            df_raw = yf.download(
                ticker,
                period=tf_config["period"],
                interval=tf_config["interval"],
                progress=False,
                auto_adjust=False,
            )
            time.sleep(0.05)

            if df_raw is None or df_raw.empty:
                continue

            if isinstance(df_raw.columns, pd.MultiIndex):
                df_raw.columns = df_raw.columns.get_level_values(0)
            df_raw.columns = [str(c).lower() for c in df_raw.columns]

            df_raw.index = pd.to_datetime(df_raw.index)
            if df_raw.index.tz is not None:
                df_raw.index = df_raw.index.tz_localize(None)

            if "close" not in df_raw.columns:
                continue

            if len(df_raw) < 50:
                continue

            result_df = get_cd_signals(df_raw)
            recent_signals = result_df[result_df.index >= scan_start_date]
            triggered = recent_signals[recent_signals["DXDX"] == True]

            if not triggered.empty:
                for timestamp, row in triggered.iterrows():
                    found_signals.append(
                        {
                            "ticker": ticker,
                            "timeframe": tf_config["label"],
                            "signal_date": timestamp.strftime("%Y-%m-%d"),
                            "signal": "抄底",
                            "level": timeframe,
                            "close": float(row["close"])
                            if pd.notna(row.get("close"))
                            else None,
                        }
                    )

            if (i + 1) % 50 == 0:
                print(
                    f"  [{i + 1}/{n_stocks}] {ticker} — signals so far: {len(found_signals)}",
                    file=sys.stderr,
                )

        except Exception as e:
            print(f"  [{i + 1}/{n_stocks}] {ticker} — ERROR: {e}", file=sys.stderr)
            continue

    return found_signals


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="NX/CD Screener")
    parser.add_argument("--market", choices=["us", "jp", "hk"], default="us")
    parser.add_argument(
        "--timeframe", choices=["4h", "daily", "weekly"], default="daily"
    )
    parser.add_argument("--max-stocks", type=int, default=None)
    args = parser.parse_args()

    signals = run_screener(
        max_stocks=args.max_stocks, market=args.market, timeframe=args.timeframe
    )
    print(json.dumps(signals, ensure_ascii=False))
