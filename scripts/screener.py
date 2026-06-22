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
        "A",
        "AA",
        "AAL",
        "AAOI",
        "AAPL",
        "ABAT",
        "ABQQ",
        "ABSI",
        "ABTC",
        "ABVE",
        "ACAD",
        "ACDC",
        "ACHR",
        "ACVA",
        "ADBE",
        "ADCT",
        "ADPT",
        "ADTX",
        "AEO",
        "AESI",
        "AEVA",
        "AFRM",
        "AGAE",
        "AGL",
        "AIIO",
        "AIOT",
        "AIRE",
        "AKAN",
        "ALAB",
        "ALB",
        "ALGN",
        "ALIT",
        "ALKT",
        "ALLO",
        "ALLY",
        "ALSN",
        "ALTO",
        "AMC",
        "AMKR",
        "AMLX",
        "AMPL",
        "AMPX",
        "AMTM",
        "AMZE",
        "AMZN",
        "ANET",
        "ANF",
        "ANNX",
        "APA",
        "APG",
        "APH",
        "APLD",
        "APLS",
        "APLT",
        "APP",
        "APPS",
        "APRU",
        "APTV",
        "ARCT",
        "ARM",
        "AROC",
        "ARRY",
        "ARWR",
        "ASAN",
        "ASB",
        "ASBP",
        "ASII",
        "ASO",
        "ASPI",
        "ASST",
        "ASTL",
        "ASTS",
        "ATAI",
        "ATCH",
        "ATOM",
        "AUB",
        "AUR",
        "AUTL",
        "AVDL",
        "AVGO",
        "AVPT",
        "AVXL",
        "AXP",
        "AXTA",
        "AXTI",
        "BAC",
        "BAM",
        "BAX",
        "BBAI",
        "BBBY",
        "BBIO",
        "BBWI",
        "BBY",
        "BE",
        "BEAT",
        "BEN",
        "BFLY",
        "BGC",
        "BHVN",
        "BIDU",
        "BILI",
        "BK",
        "BKKT",
        "BKR",
        "BLDR",
        "BLMN",
        "BLSH",
        "BMBL",
        "BMEA",
        "BMNR",
        "BN",
        "BNAI",
        "BORR",
        "BROS",
        "BRZE",
        "BSFC",
        "BTBT",
        "BTCS",
        "BTDR",
        "BTSG",
        "BURU",
        "BW",
        "BX",
        "BXP",
        "BYND",
        "BYRG",
        "BZ",
        "CABA",
        "CADE",
        "CAI",
        "CAL",
        "CAN",
        "CAPR",
        "CARG",
        "CARM",
        "CARR",
        "CAT",
        "CATV",
        "CAVA",
        "CBDD",
        "CBDL",
        "CC",
        "CCCC",
        "CCL",
        "CDE",
        "CDNS",
        "CDW",
        "CETX",
        "CFG",
        "CFLT",
        "CGNX",
        "CHA",
        "CHGG",
        "CHPT",
        "CHRS",
        "CHYM",
        "CIFR",
        "CLDX",
        "CLF",
        "CLOV",
        "CLVT",
        "CMBM",
        "CMC",
        "CMI",
        "CMPS",
        "CMPX",
        "CNDT",
        "CNH",
        "CNM",
        "CNXC",
        "CODI",
        "COGT",
        "COHR",
        "COIN",
        "COLB",
        "COMM",
        "CORZ",
        "COSM",
        "COTY",
        "COUR",
        "CPNG",
        "CRBG",
        "CRCL",
        "CRCW",
        "CRDO",
        "CRDV",
        "CRGY",
        "CRH",
        "CRI",
        "CRM",
        "CRMD",
        "CRNC",
        "CRSR",
        "CRVS",
        "CSIQ",
        "CSTM",
        "CTRI",
        "CVLT",
        "CVNA",
        "CWH",
        "CWK",
        "CXM",
        "CYPH",
        "CZR",
        "DAL",
        "DAN",
        "DAVA",
        "DAWN",
        "DAY",
        "DBRG",
        "DD",
        "DDL",
        "DDOG",
        "DECK",
        "DELL",
        "DFDV",
        "DFLI",
        "DINO",
        "DIS",
        "DK",
        "DKNG",
        "DKS",
        "DNA",
        "DNOW",
        "DNUT",
        "DOCS",
        "DOCU",
        "DOW",
        "DRCT",
        "DRNK",
        "DT",
        "DV",
        "DXC",
        "DXCM",
        "DYN",
        "EB",
        "ECEZ",
        "ECVT",
        "ECX",
        "EDIT",
        "EFX",
        "ELAN",
        "ELF",
        "ELTP",
        "EMN",
        "EMR",
        "ENTG",
        "ENVX",
        "ENZC",
        "EOSE",
        "EQH",
        "EQX",
        "ESI",
        "ESPR",
        "ESTC",
        "ETN",
        "EVEX",
        "EVLV",
        "EVTL",
        "EXEL",
        "EXPE",
        "EYE",
        "EYPT",
        "FAT",
        "FBIN",
        "FDX",
        "FHN",
        "FIBK",
        "FIGR",
        "FIGS",
        "FITB",
        "FITY",
        "FIVE",
        "FLEX",
        "FLNC",
        "FLUT",
        "FLY",
        "FLYW",
        "FMC",
        "FNB",
        "FND",
        "FONU",
        "FORZ",
        "FOUR",
        "FOXO",
        "FRMI",
        "FRSH",
        "FSLR",
        "FSLY",
        "FTEG",
        "FTEL",
        "FTI",
        "FTNT",
        "FTRE",
        "FULT",
        "FUN",
        "FYNN",
        "GANX",
        "GAP",
        "GBTG",
        "GCLT",
        "GE",
        "GEHC",
        "GEN",
        "GERN",
        "GEVO",
        "GFS",
        "GH",
        "GHAV",
        "GLOB",
        "GLW",
        "GLXY",
        "GNS",
        "GOGO",
        "GOOG",
        "GORO",
        "GOSS",
        "GPCR",
        "GPN",
        "GPRO",
        "GRAB",
        "GRLF",
        "GSAT",
        "GTCH",
        "GTLB",
        "GTM",
        "GTX",
        "GXXM",
        "HAIN",
        "HAL",
        "HAS",
        "HAYW",
        "HBAN",
        "HDSN",
        "HIMS",
        "HIMX",
        "HIPH",
        "HL",
        "HMBL",
        "HOOD",
        "HP",
        "HPE",
        "HPQ",
        "HUBG",
        "HUMA",
        "HUN",
        "HUT",
        "HWH",
        "HWM",
        "IAS",
        "IBKR",
        "IBRX",
        "ICBU",
        "ICTY",
        "IDGC",
        "IE",
        "IMMX",
        "IMTL",
        "INDI",
        "INND",
        "INO",
        "INTC",
        "INVZ",
        "IONQ",
        "IONS",
        "IOT",
        "IP",
        "IPIX",
        "IQ",
        "IR",
        "IRBT",
        "IREN",
        "IRM",
        "ISRG",
        "ITRM",
        "IVP",
        "IVVD",
        "IVZ",
        "IXHL",
        "J",
        "JAMF",
        "JANX",
        "JBI",
        "JCI",
        "JFBR",
        "JHX",
        "JMIA",
        "JOBY",
        "JPM",
        "JPTE",
        "KD",
        "KEY",
        "KGS",
        "KKR",
        "KLAR",
        "KNX",
        "KODK",
        "KOPN",
        "KSS",
        "KTOS",
        "KTTA",
        "KULR",
        "KURA",
        "LAB",
        "LAC",
        "LAR",
        "LAZR",
        "LBRT",
        "LCID",
        "LEVI",
        "LFMD",
        "LFWD",
        "LITE",
        "LMND",
        "LNC",
        "LRCX",
        "LSCC",
        "LTH",
        "LTNC",
        "LU",
        "LULU",
        "LUMN",
        "LUNR",
        "LUV",
        "LVVV",
        "LX",
        "LXRX",
        "LYB",
        "LYFT",
        "M",
        "MAC",
        "MAR",
        "MAT",
        "MBC",
        "MBLY",
        "MC",
        "MCHP",
        "MET",
        "META",
        "METC",
        "MGM",
        "MGNI",
        "MGNX",
        "MIR",
        "MIST",
        "MJLB",
        "MMM",
        "MODG",
        "MOS",
        "MPC",
        "MRNA",
        "MRVL",
        "MSAI",
        "MSTR",
        "MTSI",
        "MTVA",
        "MU",
        "MVST",
        "MWWC",
        "NAKA",
        "NAMS",
        "NAVN",
        "NBIS",
        "NBRI",
        "NCNO",
        "NE",
        "NEOM",
        "NEXT",
        "NFE",
        "NFLX",
        "NG",
        "NIO",
        "NKE",
        "NMRK",
        "NN",
        "NNDM",
        "NNE",
        "NNOX",
        "NOG",
        "NOV",
        "NPHC",
        "NRGV",
        "NRIX",
        "NSP",
        "NTAP",
        "NTNX",
        "NTRR",
        "NTSK",
        "NU",
        "NUAI",
        "NUE",
        "NUGN",
        "NUVB",
        "NVAX",
        "NVCR",
        "NVST",
        "NVTS",
        "NXDR",
        "NXPI",
        "NXT",
        "NXXT",
        "OC",
        "OCGN",
        "OCLG",
        "OCUL",
        "ODFL",
        "ODYC",
        "OII",
        "OKLO",
        "OLN",
        "OLPX",
        "OMDA",
        "OMI",
        "ONB",
        "ONON",
        "OPEN",
        "OPTI",
        "OPTT",
        "OPTU",
        "ORBS",
        "ORIC",
        "OS",
        "OSCR",
        "OTLK",
        "OUST",
        "OVID",
        "OVV",
        "OWL",
        "OZSC",
        "PANW",
        "PATH",
        "PBF",
        "PBI",
        "PCT",
        "PCTL",
        "PCVX",
        "PD",
        "PDD",
        "PEB",
        "PGY",
        "PII",
        "PK",
        "PL",
        "PLAY",
        "PLRX",
        "PLRZ",
        "PLTR",
        "PNC",
        "POET",
        "POWI",
        "PRAX",
        "PRCH",
        "PRME",
        "PRO",
        "PRPH",
        "PRZO",
        "PSNL",
        "PSTG",
        "PSTV",
        "PSX",
        "PTEN",
        "PTLO",
        "PTON",
        "PYPL",
        "Q",
        "QBTS",
        "QCOM",
        "QFIN",
        "QS",
        "QSI",
        "RANI",
        "RBLX",
        "RBRK",
        "RCAT",
        "RDDT",
        "RDW",
        "REKR",
        "RELY",
        "RERE",
        "RES",
        "RF",
        "RGTI",
        "RIOT",
        "RIVN",
        "RJF",
        "RKLB",
        "RNA",
        "RNWF",
        "ROKU",
        "RONN",
        "RR",
        "RRX",
        "RUBI",
        "RUM",
        "RVPH",
        "RVYL",
        "RXO",
        "RXRX",
        "RZLT",
        "RZLV",
        "S",
        "SABR",
        "SAIL",
        "SANA",
        "SARO",
        "SATS",
        "SBET",
        "SBH",
        "SBLK",
        "SBUX",
        "SCCO",
        "SCHW",
        "SE",
        "SEE",
        "SEI",
        "SEII",
        "SEMR",
        "SERV",
        "SES",
        "SFRX",
        "SG",
        "SGHC",
        "SGML",
        "SHAK",
        "SHC",
        "SHMN",
        "SHOP",
        "SIG",
        "SIRI",
        "SKYT",
        "SLDP",
        "SLG",
        "SLNH",
        "SLS",
        "SM",
        "SMCI",
        "SMR",
        "SMRT",
        "SMX",
        "SNDK",
        "SNOW",
        "SNPS",
        "SNSE",
        "SNTX",
        "SNWR",
        "SOC",
        "SOFI",
        "SOUN",
        "SPCE",
        "SPOT",
        "SPR",
        "SPT",
        "SRFM",
        "SRPT",
        "STEK",
        "STLD",
        "STNE",
        "STRL",
        "STT",
        "STUB",
        "STX",
        "SUIG",
        "SURY",
        "SVRA",
        "SW",
        "SXC",
        "SYF",
        "SYM",
        "TDIC",
        "TDUP",
        "TE",
        "TEL",
        "TEM",
        "TER",
        "TERN",
        "TFC",
        "TGL",
        "THER",
        "THO",
        "TKMO",
        "TLN",
        "TNGX",
        "TNYA",
        "TOI",
        "TOST",
        "TPR",
        "TREX",
        "TRMB",
        "TROW",
        "TROX",
        "TRSI",
        "TRU",
        "TRWD",
        "TRX",
        "TSE",
        "TSHA",
        "TSSI",
        "TT",
        "TTCM",
        "TTD",
        "TTMI",
        "TUYA",
        "TVTX",
        "TWG",
        "TWST",
        "TXHE",
        "TXT",
        "TXTM",
        "U",
        "UA",
        "UAL",
        "UAMY",
        "UAVS",
        "UBER",
        "UDMY",
        "UEC",
        "ULCC",
        "UMAC",
        "UPS",
        "UPST",
        "UPWK",
        "UPXI",
        "USB",
        "USNL",
        "UVSE",
        "VCIG",
        "VERA",
        "VERI",
        "VFC",
        "VFF",
        "VG",
        "VIAV",
        "VIK",
        "VKTX",
        "VLO",
        "VLY",
        "VNET",
        "VNO",
        "VOYG",
        "VPLM",
        "VRT",
        "VSCO",
        "VSH",
        "VSME",
        "VSTS",
        "VTRS",
        "VTYX",
        "VYX",
        "W",
        "WDAY",
        "WDC",
        "WFC",
        "WHLR",
        "WKHS",
        "WLK",
        "WOOF",
        "WRBY",
        "WSC",
        "WSM",
        "WT",
        "WULF",
        "WVE",
        "XCPL",
        "XLO",
        "XP",
        "XRAY",
        "XRX",
        "XYZ",
        "YETI",
        "YMM",
        "YYAI",
        "ZETA",
        "ZIM",
        "ZION",
        "ZS",
        "ZSPC",
        "ZUMZ",
    ]


# 2. 参数设置 (日级别)
SCAN_DAYS = 14
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
