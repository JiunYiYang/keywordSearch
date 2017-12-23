# -*- coding: utf-8 -*-
import sys, json
import urllib.request as ur
import ast
# import urllib.parse as up
# from urllib.parse import quote

KEYWORDS_Moz = sys.stdin.read().splitlines()
ELE2 = []

result = ur.urlopen('https://moz.com/explorer/api/2.2.7/keyword/suggestions/' + KEYWORDS_Moz[0] + '?locale=en-US&strategy=default')
resultJson = json.loads(result.read())
resultJsonClean = resultJson['suggestions']

for item in resultJsonClean:
    ELE2.append(item['keyword'])
print(json.dumps(ELE2, ensure_ascii=False))
