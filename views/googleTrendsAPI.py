from pytrends.request import TrendReq
import time
import sys
import os
import json
from random import randint
import numpy as np
import pandas as pd
from pandas import DataFrame

KEYWORDS = sys.stdin.read().splitlines()

# Login to Google. Only need to run this once, the rest of requests will use the same session.
pytrend = TrendReq(hl='en-US', tz=360)
# pytrend2 = TrendReq(hl='zh-TW', tz=360)

# Create payload and capture API tokens. Only needed for interest_over_time(), interest_by_region() & related_queries()
pytrend.build_payload(kw_list=[KEYWORDS[0]], cat=0, timeframe='today 12-m', geo='US', gprop='')
# pytrend2.build_payload(kw_list=['influencer', 'journalist'], cat=0, timeframe='today 12-m', geo='TW', gprop='')

# Interest Over Time
preload = json.loads(pytrend.interest_over_time().get(KEYWORDS[0]).to_json(orient='table'))['data']
print(json.dumps(preload))
