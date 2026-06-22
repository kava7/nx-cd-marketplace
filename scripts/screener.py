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


def _is_yahoo_blocked() -> bool:
    """Quick check if Yahoo Finance API is reachable (not blocked by GFW)."""
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


# Only apply the monkey-patch if Yahoo Finance is blocked (e.g. running in China).
# On GitHub Actions (US servers), yfinance works out of the box.
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
    print(
        f"Yahoo Finance blocked — using curl_cffi patch ({len(yf.download.__name__)} chars)",
        file=sys.stderr,
    )
else:
    print("Yahoo Finance reachable — using yfinance directly", file=sys.stderr)


# --- 选股列表 (美股) ---
def get_us_target_tickers():
    return [
        "AAL",
        "AAOI",
        "AAPL",
        "ABQQ",
        "ABTC",
        "ABVE",
        "ACDC",
        "ACHR",
        "ADBE",
        "ADCT",
        "AEVA",
        "AGAE",
        "AIOT",
        "ALAB",
        "AMC",
        "AMZN",
        "APLD",
        "APP",
        "APPS",
        "ARCT",
        "ARM",
        "ARRY",
        "ASII",
        "ASTL",
        "ASTS",
        "ATOM",
        "AVGO",
        "BAC",
        "BAX",
        "BBBY",
        "BBY",
        "BE",
        "BIDU",
        "BKKT",
        "BKR",
        "BLSH",
        "BMNR",
        "BNAI",
        "BURU",
        "BW",
        "BYRG",
        "CABA",
        "CARM",
        "CBDD",
        "CBDL",
        "CC",
        "CCCC",
        "CETX",
        "CHGG",
        "CIFR",
        "CLOV",
        "CMPX",
        "COIN",
        "COMM",
        "COSM",
        "COTY",
        "CRCL",
        "CRCW",
        "CRDV",
        "CRM",
        "CRNC",
        "CRSR",
        "CSIQ",
        "CVNA",
        "CWH",
        "CYPH",
        "DAVA",
        "DBRG",
        "DD",
        "DDOG",
        "DIS",
        "DKNG",
        "DNA",
        "DOCU",
        "DOW",
        "DXCM",
        "ECEZ",
        "ECX",
        "EDIT",
        "ELTP",
        "ENZC",
        "ESPR",
        "EVEX",
        "EVLV",
        "EYPT",
        "FIVE",
        "FLY",
        "FMC",
        "FONU",
        "FTEG",
        "FTEL",
        "FTNT",
        "GCLT",
        "GE",
        "GEN",
        "GHAV",
        "GLXY",
        "GNS",
        "GOOG",
        "GPRO",
        "GTCH",
        "GXXM",
        "HAL",
        "HIMS",
        "HIPH",
        "HMBL",
        "HOOD",
        "HUMA",
        "HUN",
        "HUT",
        "IBRX",
        "ICBU",
        "IDGC",
        "IMTL",
        "INND",
        "INTC",
        "IONQ",
        "IPIX",
        "IQ",
        "IRBT",
        "JMIA",
        "JOBY",
        "JPM",
        "KLAR",
        "KOPN",
        "KSS",
        "KTTA",
        "LAR",
        "LCID",
        "LRCX",
        "LULU",
        "LVVV",
        "LXRX",
        "LYFT",
        "MCHP",
        "META",
        "MGNI",
        "MGNX",
        "MJLB",
        "MRNA",
        "MRVL",
        "MSAI",
        "MSTR",
        "MU",
        "MVST",
        "NAVN",
        "NBIS",
        "NE",
        "NFLX",
        "NG",
        "NIO",
        "NKE",
        "NNE",
        "NPHC",
        "NTRR",
        "NUGN",
        "NVAX",
        "NVTS",
        "NXXT",
        "OCLG",
        "ODYC",
        "OKLO",
        "OMDA",
        "OPEN",
        "OPTI",
        "OPTT",
        "ORBS",
        "OSCR",
        "OUST",
        "OVID",
        "OZSC",
        "PANW",
        "PATH",
        "PCT",
        "PCTL",
        "PCVX",
        "PDD",
        "PGY",
        "PL",
        "PLRZ",
        "PLTR",
        "PRCH",
        "PRPH",
        "PRZO",
        "PSTV",
        "PYPL",
        "Q",
        "QBTS",
        "QCOM",
        "QS",
        "QSI",
        "RANI",
        "RBLX",
        "RCAT",
        "RDDT",
        "RDW",
        "REKR",
        "RGTI",
        "RIOT",
        "RIVN",
        "RKLB",
        "ROKU",
        "RUBI",
        "RVYL",
        "RXO",
        "RXRX",
        "SABR",
        "SBET",
        "SBUX",
        "SCHW",
        "SEI",
        "SEII",
        "SERV",
        "SHOP",
        "SIRI",
        "SKYT",
        "SLNH",
        "SLS",
        "SMCI",
        "SMR",
        "SNOW",
        "SNTX",
        "SNWR",
        "SOFI",
        "SOUN",
        "SPCE",
        "STRL",
        "SUIG",
        "TEM",
        "THER",
        "TNGX",
        "TNYA",
        "TOI",
        "TROX",
        "TRSI",
        "TRWD",
        "TSE",
        "TSSI",
        "TTCM",
        "TTD",
        "U",
        "UAVS",
        "UBER",
        "UMAC",
        "UPS",
        "UPST",
        "USB",
        "UVSE",
        "VERI",
        "VFC",
        "VNET",
        "VRT",
        "VSH",
        "VSME",
        "VTRS",
        "W",
        "WFC",
        "WHLR",
        "WSC",
        "XCPL",
        "XRX",
    ]


# 2. 参数设置 (日级别)
SCAN_DAYS = 2
TIME_FRAME_DESCRIPTION = "日级别"
DATA_PERIOD = "1y"
INTERVAL = "1d"

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


def run_screener(max_stocks=None):
    found_signals = []
    top_stocks_to_scan = get_us_target_tickers()
    if max_stocks:
        top_stocks_to_scan = top_stocks_to_scan[:max_stocks]

    scan_start_date = datetime.now() - timedelta(days=SCAN_DAYS)

    n_stocks = len(top_stocks_to_scan)
    print(f"Scanning {n_stocks} stocks...", file=sys.stderr)

    for i, ticker in enumerate(top_stocks_to_scan):
        try:
            df_raw = yf.download(
                ticker,
                period=DATA_PERIOD,
                interval=INTERVAL,
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
                            "timeframe": TIME_FRAME_DESCRIPTION,
                            "signal_date": timestamp.strftime("%Y-%m-%d"),
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
    max_stocks = int(sys.argv[1]) if len(sys.argv) > 1 else None
    signals = run_screener(max_stocks=max_stocks)
    print(json.dumps(signals, ensure_ascii=False))
