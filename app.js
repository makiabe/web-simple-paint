/*
 * Browser Paint — vanilla JavaScript, local-only canvas editor.
 * Images are read with FileReader. No fetch, upload, analytics, or external runtime.
 * The small homepage preview is extracted artwork, not the live editor.
 */
(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const SVG = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const FONT = '-apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, "Noto Sans CJK JP", sans-serif';
  const SAMPLE_IMAGE = 'data:image/webp;base64,UklGRqImAABXRUJQVlA4IJYmAAAwuwCdASoTAcwAPikSh0KhoQn0oyAMAUJYwC6wkfXv2M7vkPvJPdN8z/B77Fbfl89U+bn/r+uTzH+g350vs59031Mf2T0XerH3qXGe5SjZrXn+B/guRBEp8H/6HHDty3YninqItA3xq9On2QG1ZiCTbh5HTwTRS+AL20DAuPxadQcG3BlECsVPYUFVp+9DjVIJe2GUfF5XGef2P074eCUeriViYRfGyQ5kzVq9B4wk4Dh4wrMkV/eApz/nT0ZT27h9HJnAbG8N2JQI2APPq44TmMBKMgIIBinTG5856r5jB/UWp8gectQpZJrkk8f3nWO8oW6tpRkFCDaapq6lJ8vHXET4Nh/kr2ShtiM6vO9Z8x33XsrDFvK9OOSoBPtEdG8mfhb2we0hEttyj0eydQhV9LkVy2oJ7dh1dP2vOOge4WwhVCnWJhm3gqWdmlESJm+dMagTEbt1XPWpw8Yj5tHQEdFu5PbbdR17fGV+nShSL/FrD6c/pfh20JIdfo+4YzZHD6QdG64ydS32D8AcXU0gvl3XFqxPUISkpLsC8DeYzzxH+9EfV3aKXdtz+SP0s8IjcnPnUQyAn4vT9GZqKnw+q+W/KHnTsyAzIGjueTCbZ9D4VOCozwqsZ89XJkOp2SRRJ8o05Fz9dPIR8jNoJ+tXz08kyPfoMURygCWVmfdQa93J4YQIzMO0JW4KhYpTT6VsxLcPYtxN26auVI7M1llZmkace2AkX4rEyXmyrhYxzryQKSkVLduC7Wbgmdoc8ZkjmYDJhwVHnQovnR/Kxi0zz1Gl2RBU/LblCKq/zo/jLicxUwpz1AKaF6aE8H9KJZ0Hm/nVFSVxnV3+uz0x3ylF+sNqa4rM7tl78F/5SkhNWjypJRHRvJei4p5FkECooM0D0ZNYOsnKztKMYCHyzW/ATD6nAiHnzV2qARdNftCq2IuyouD/hLEqP7TCe7MXEWa/yJxYERp5Hh+RE3TMO8lAECC39MGJGE0Sk1YzymjgPtqU5v/Tw+XCfap6ElwjDgQRBSJsv+XviODHuubA67kDTGhgobL2Y8tOJ9zJzkSApZ7WJondHcQoevfaul/lIc6QQiHJyJ7pg3FBd0smV1MsMVvaVG8k5MagS6WHazx5Q+gLGvIRMXDwZq87fnfvpxVBVHAoRQoMkO2LO3fk4dP76hJN9ZDLwszsyDU0f+6z19qkMdxdC0QFU8tmIqC4hc2GUqHe+YbBSHYiz89KmiwMClRPILd9nDIakosX79PzpiIfKxTVJNtKrdPTkhQGnJuepboh2AgupFTWOMfc1mpoe10rJmwkLpS0fBIKk1nIgeo0YWEavsxSjMGrMLb9LW6BzsFyFUF1Q+aFhPvckIyzbtu80Fs7bIzvX2j/OyyDQIu48eaTPfAg1eJWlCz0f6ZgX8QifDvwMg7uEM5/rqv0EY+S4yeEuHew5CdfQUEWOtpE9bINEo+Lgf/gotbByw3TPMx9v7ub4JzcUMsTkEwi4pif2e//309wSeLRsdy9ROjtMR9j9LiRec2ft3a7JVPYAM4H8k0xMEH89NQvHm1juLJL+JL7C+6gwXuVERmOk7ROgyWJTanqlYXIgG7cCdg9hAZUzQ5fpWfUcdbWmvHA6RSARek//bxPZKzY4OSaWIf5ZpFPelq7Waf8POl1vTr+p4lXxOlJZoUidXWOJTgDR2eEi/R0dNBQalpCiBugyYQr/4/AAZRNOFP8pK3aM2sNHywCb+qGjkGgbUwNByRs7wQ/IRLbr1fjzirZo3OOmqGYpbzOf61OIPuBx4ne8Qk7EGNASxXC5nb8qSQAtu2I3Qpy98qJg1S/31J0RKu1cC7Zk2Dp5SJ1dk6gEA8updz+zfqTlpZcbb3rgBLYaABqYGjz/toARIzTmbKKR3opNGJ+VsUTrP0BEHU+AQwU4tFBwDlw36/mfzoS+yn4LzJWwArcGqbAJaSm2RmrjfTqxLO4vYKp0ZvaZ5m3z6Irv7RWIux5RNgmMjpwnp0mwVS9uQAA/voxP/6HXuzvuBNYWIBkb9EqkYyEsexUHsBp+/+YMMqiOP+S2MrjIbf/hb7vC3cnwd12p1mhcNg1OhP9xsBqfXqMZERrB/tZfGM1YigcQ9QqzD0t3W+/tyNi4DMoT5m0AlzutsjmD1GBSkKulBAH/iFYsVLojOfF+2myyEOaYZYYCjnZZQy0wSfOIixpfLbV+ozDmiw8cZ/PD6nR0metUYq9EfcumjdTbLYLl8FFW+fbiaCtS9Gq6/xc0Q7Vl2xKJit7CgiBIVm1ZjggT4BPt9as48EMHvMFmX2MVLu7nDZv+4GSJmd/Y4OoxjupAUKm5VuGeNTLKIGQ9/7cOriJ5kZuflWKfowh6ZEe8LABDDAiDBKBYPZN4OMSCjEOSUARXj6jdbxDc0zQrA9SFMsxe5Y7Bqx/9dUXwO4tqeAvxO8QTSicrHhIlJ0zaui+sKu6PK59bVrbVuE1LrKI0GQTwxYbQrv8UavGbqc4CKg/gUS8LtRyCnB2P5G1dW8xaGyDwix9o3RppULBjooZVGMvU2sXfNT6eJBCJ4+NJi849Zdojc+jXB30FcXDrMj+gCDj9nuaZKGtHnqkbPjtZzUlLZSZDCvz9LrUUg4FYy8iQVtV4Fm3Z5wh59rBM28CH02Qzem2XwDskaHIa/KLOUpnvj15q1iCknCswI0mje9STAVyx6PYjZ8jYd/re32HWKwpSPAeCqaBiXPUCwE7FB50u4CBU2+vjCdKhE6b/w18XLLXgGRLloC1/8aM9ZQ7LoNm1xhOouWYu2WRqAlyKAgGpHDRlQVUIwnc5wjuk616yb5Xz9XI2UbzJSV0fwSVeE//YgB0KGiYXzNgGCQnQ+1vPt5gd69lpwT82BrSY3CTbjuX57zQrD4lN3iRgj7LATbDKxLVAuhEOyQ+XjckG/gOi5Ajh10PuYRyzvT0By7EoPJx02VYB+kp8zK4g6BUBGAJypfaxXcqWryGZ5epA5Bsh07Y6kEeu391KZRz6PZFpWi4hvyPTgWO6eY0te9wCzvrLG1pKa4nsJR9XfTPuEgbIqvK/zTojouO0zMdUVEca3LROKniRq4nPuetODB+2VI71YRzppqVhVp5behVZEr4wlaaUA51TAzLFTYKlJgLuIjfScsXMakckTIkcxZpJtXjGIgvhFcgOf/eYrUzv2TWkRpbe5WXdzYnZWzA6mOu2PzzltxsMTlzQ9/UloJteb8YsN4W5+j2pNHKJBhFP/CE/MAVK9UWTlKsQ92KnvgQ48De2x30222YYe2RWNMNOmM2gGc7uz3ukt2t6+5Rupu0sWaEqysonpKa3Mwca3aHDEx92n+rOeC+z7FYP2j/92AW+sWvrnrOlRNrGG5u6MRNCSYhCdh7gTc+wlKnUpLj3KxhRftYxkR2UfTX83tBQ3wzwlRpOraMz8zAGMpYBKpEWfcS/HmY2sdgtg/Yif1l6sADuRdstBcVjyFhCfwyjmFwdALdpMmSmTDkCQENdmCYEenxQvHtfyJezQSLmCVfJguPR9MLrNPf+0HAYPnb1iT/VPOT1MbVCjgSwpw89n/TGX28MiOyiHJm8mmj/JEQnRTQ42IWA1JEytCNRuIh9ENJ5cDEbE8Fwz9OJADT+2mhYD+dkTxWd23H/Vrr2Wfct6vpr3EJfbsnzdiBkDHa0epFRn0ltNXIdXNbbek+sbCrZiVw9TeX1IuvDkV54gK+xWPXK+m5rh8sHidE3jWg16U6Sd8uwxVUMtr1QkDIwPA/eu5U43ZvkLcGKx0i7bOiYHsR3qvdX9eS4Nmo37ex6/v0oRDAER75aYNnSzdWAWOseMwF9CTtz0bRt+9hWkfVEOXdW6+1a6Vx/crZlbivkkUHem2Mc9z0HlnFPJNRQxwGgGx0Tr9WFxUX57LyqcGKiRmhvVRfO7VKIWNgASp2EiKf5veg9FIFouFUPXsxHdAZqthl7+SyKCvnFyO4JJzYDCZNoT9Khl1+9+cxzUT7wi+PHnCLNZohyHa5bBAZPBdHA/275H8svXnqKKegiMOj2A1RgOM4dHEv+5TItxKIM6OfYwlV2yCzbQT+ytgAXoHXTXh7Rsa1YIXv7ve+cPOXOh3O0kaLO1HonCwqCgaEHBTxrc/8yzQCVSXj68gGyMuZ2vVkfO5U6XJxSHGafXWdr/oE0s5uiGYVLmS4oq+x0J2i4Sao1dYTSeaxWrcfgCP/H3WhQgwGG/69RID8pGKlgVh6/2AkO2ohFt9UlT00XlC9FNOaIYCfbXxWozk/v3WrnAsaj8i7U/pdunPxONyi9ykWBSj5inDQg7+nB2/mQyARpET06sQ6Lb/Oki989txY0c7aeju3Ip5aSzHZtEYHGgh7wtL+pR6tMD9gOkVTtMdEAkcrChYKzoX2mNzVD89/w2sbp/mPnwllZGFMplsaQgHMXpfXQ0CrbOec53AxVn0hqCRP0rzyEPZXTb+3L9y5tj64j8G+2sL53zrTjGTqvFbmYWOWoEc94udP4ZLtxf3v/LY98U5Z6cy7meAK88KCt76Bnlj80xZD7DCgWxMe/vP24SGSkExkAlHuBh/jxC1XsKOXlbZU/7v1ILGMuIFqjqWisKLgBnAR9Ax1W+ELIfZPrLd3aj8rZCujWV4ThMLWwyDKZog3qfkIq+/j/a8XNeKxxq0Q+0803maJxd/2dppfQHEuB5PgMwi+R4Xgz4dUae7ElWmrv3T5dyLGqycc/mq3M9jgT8zJu3PWCh4EnPcEXlsJ7ELad9Zs8qQfBLaksMiijfDsyM+ws5h0PnIiY8fx2qL/TmSiMFh0ae1r2EY0q6UGy3VolmV4ik9/ckZCnSr0RLpYnxI+SGrA82X1DhHfkx/MP7d3uPbI2wUCoa6imWUAj5aZMebCoKQjDD28wsN4SyArGbBj+oEXIUGVv2uGdRT3DLTypOnPDrmFDnlyWpb1HTsybtVIgxzlEOSliJCaBHu8U3zlGoXM1KpKH132DQz2DxHk4VySbycImJkmzcZn8d6e+euiXjbIdyV5jSF72BpKMEamMtWIcHyatW+iKOKLPeeFOlZiGbaE461Gn/pHeptWWJIxs9avkOF/pFrgkyFhzweXEm6rHzOHiV/i920COLuck6p6mjNuKdPI2gfwoV0NqhRz3iNkjZgyfpVuFQWQKDGK8++suXTpokOniryqYc/E0R+3QyvY5lA+O/MpmoWDjXYq7OiE5Gew6hL2fRo2pQMV3VesIUX/HTOmfQnbTdrj1nJdPYhsf12MeYOZRSqc8rUpN1Y/bV4MQQ3yRJoOP8oeIZ7ZdmEyuJo5c+Smih07TY/rFs6KSU4q6ORD30WAxgj3uwZcEsiM7Uj7Fng+MfHh8wr8Iyb2jwhIqAfBH275ZFJZDQOiSvh1XpkXh2Vm5DogJo84aJvGDTxYKneJgCZ74TEm8/kpF5gbL1sS/pWEB+R6x4e0M5g6frY2CTy9AHXsuDCIcgQeFKwIln5Q1ZpuVnawwCrMVoLvs6CG6pzvEKU/TOCSyDmxfS698+BS/whsSd8fWwrhVJn0bZFYRaX3K1ZagauLDzrIgPj1kVvrDU+r5VnrOcctl6s7BbzW5gNM5Gy9vDUpBTSG0ONlLDuLebmlQ1sB1sXAH6OC7s5Dayn+UbUy6UHS2GuKtiDhmyPNrCDJZHs72qd2H2qsXbOWVzl2Cf+05Z81DkqW/XGXLbz36tr1rZZqf9cTQ0aoE/8T5rVNOZZmgnDgd7BSXs2f4YJFOYYUp7FWhP7hvxuadojSuhQ9eb7IPgv3+0TOQjd0zDm4B4C3duu06ZHgSsXJ0yMuTJ+Ww1+C1BC9lI4+jxnkTYSBQDmDLN+r7In/GNmiFu6XZ97EfihOw/wLtbHAXDiDfpEnZAALE5WUWuN2A0j2G6j2kENfHnlibd0Nmqi3066NvG5JjfIWDaqzNQNQll7YcUxk+dCOviCui/xLf0oTdXt8IffvvxgPrWKdWxWnIR8KZpXhAZNE24y2bI5eVoIt2N+zrPn7XJOrC5u3bKW8DOruJ2jXJIb5hdGHWOMWa4WPTU/hVEp9UjPyJKSc6hmXXVttUZZOLFENpJsU8YOqKG5lgeysB84th13Oicx3GoGFyLJSfdV0d0J2SGRxNv2dKBnEQc+jOgo7EUEKCSuA3VuRMPuJjyalUdSNIOG2+zNVGZGhWGT39Yc/qWaQy1ZFvnP62wiMa9i7pWJX7240IEMqpGk1zBuIRrKPLOul8mdrnwTi6RPo7zXEKZZwk6sbFf6UItfy0wD+/gm3IgIOqo6krevBOyl0EC6+TmQ7JUR6oG274KauPXmGz7gNtvId2LxLvfza1JDa2Q42xZg5hUIMlcHVIU6fXeYiuaQwcGE4cUTz1n5nTaFxSx+om6iQjEOyifjPIptLEOKPbrzC/Nu7LhtBgu8764SIeZXFhkVdFQiUfT329z99CPtTlgjFMiDYaha2TPxT7lh6NRtERdssvToxnfkW4NzSg4YsjJLsAth59H+nD/DW6Z8VlbxpsO/w48HsnExl2pATB6Xp/przsRHqj+/1d1OsReWyxY+jH4aML3fq+VipkqAQX5rUxunwM8W5Z8396aYRBcQjN+d631X4Xj++eXqiGyQ7WKjdwSTqRXPUDdQIl7XHyYwXwrKHa4zLEjFSExumf4EIrxAAfho3tDfbbeoriIPJQDw6n2mwzhHVWKaOToIolWC3NiL9l8Y+Lau8jkABcexml5femXTKFRe2tEl2sOy1e1qsMY43S+EYVmZjKJb9x6Whs39j9qRlV2VmNqKUE4izHKfm26S1SFtx2OugdVyxQdfZQ+nwsJXPm5t+Ahb8cfpE+hKW+1t6LzICCJvUYbxhKTZcv3blRhPSPgzzvBPoNkMIi17v0eP0cEFy88G88sG+zEG3R6IOYyP41vQxwps+P4OurlYBzho43IP+x28wLxQN9TJ+qWYUtyJvWk7xkjVryRZWY1wC2WddpUVXon/Ss5w8D9KL5wDWgkp6ZsBLp2eL0RePHZVAoMtD9U/LuWpSNUWdDFuTGV5X5/DZa6U0fuUEHw2OT5NjxLJ1Ytn+IG8fVVb3EEW/OkrkIaX1fJc7vVtXZCl0hOj9qTWRKNqImHLnnRZZe7cuZW7+K9v9s+yDgAB9yMM2V1a2zvnARe0lPFHBeULtYhtOaBg7WBH2zTUwyJ6vgVKeXh7LSAotMJqcex+Jm6TDhHMOUVw46wmfg6AFUor5R7Cssq2KPQtMgz14v7AWmUC1mW9Qj3lkCaofsblkq47EhrzZ5Q3M+LZJu4zNB3gR+gQaJo6F0mis+ZqXlVLhjxwnLozPMBr+ZoC/LOcMK9hfWh4YgIRPkRm4mOMWSZnHLAPEoDjcj+1iQNNkseSdenvZ8I//0VaABcANsYR9frsrelL1YZYrTZAfKXARo+3H9/YDblbx2eikAfJ5NfPtk4lnUmEuNdMH1F/uhYPhkSDfHypEiQX1C0VjFaIM61xAXdu2gDUwJ8XTb6xLTzrn8AQX14qp8eTdGEYRMJhq7fN0OZQtp9Gz6UbRglE4yOhxJFpCoE75DQfy+L42v0wv+8P8t8H1u5wpNWuFQK6BSfog3cxMmgOTXyamESaKj59Kv978peysuShpq6iOL0wkKSW4b8FkhP+eUMIABLKcXrX3cycXx//tG1m6XQhOvKBcQ1EX1KHdF3P9NtcamF896iQ8xaczfIlFbB4gBWLtblOCm0EPray64dXjKolO4UusfChvlzgBDWnFM8eDnmxOgSIbuKiY0WH7Q4qeNavBDJ8O+4eDGgOqREDxyiIo/dLy+VLTZP+Jx1/+GlXMWMX2lk5ZgQKQfxcGUcVx6xsem82RbSd9vAuKBTAmiwBoVssyI3r9C8HGtRqgL2u843mv/7MdLipSLF2/94QuCvTd51Tu2FXlyZQ0Yri0TR/x7VbfOGvU3Y5OF08Q8vnX5j6MPr6kdNi7E/DlRjWXfaI8KJT2dn9VUfGWukenRai/4DV52ibz4ZTjF/v47k74V79fOYcTdnYRJoj3P1aHslVme9teKbHujtaDumKPEsDKSTxPW4h1zOYNfVnBIqYXdXMKboZZ8ri+m+Vvzbq6S9W0nNbHbOwwDBVBucXFKhsf8Te/yHUABxn4XI2GttVJjkHfJYLHxO8jsFz3eVJjxY+jHgi4iOQI3yr+h/lMlEKB1E4oU7h6luIXfpZDenkj7reUy3so+ytyD1oz/+EtELkXrcVxpI4sdS0yx1OpmInj/Le4IH6SNSLlEkyTEUmlKhoPvYHnS27qCLYSAuOog157idLf2Xzy2uB/rdBD+Zf+Lzq2wlPztxEuW/mTHTQk09r09B2tb0Dwxpnvk4Iq35TqpU+Gkk+TaV0EUP8uUltGyyd8e1dt/ZG+TobPDvV1cssJIqb/cMcYtabG8nwG6Xj9CdN2v6oWj+To/WamBNYAKNKF6ojgL4HpMWuMpOzpWvxGpQWhPxsPbuzjzV8ttLQff1YvxneoWZDJ2oHMIphzWD7aRV+uCTCmtCssxpb6sxJNH8lau6ImScd5Ss08xXogGCga/mp4Hy2j30ot2IoNtwG1h897gTVNgIGN+Z2Nrs/4dTTpGL/7lx2CjkXOSf03o1i+sM5XOsCOKecyKBdfdfMJCZjNz1vDxuat+xGiXkyVdHNezYm2PqRpqnRpcrgTPOLYHFNs6x4ao8GVrBQL2OxZGmUfr5Dkg6tmaTM9wZP55ga61RvgAmN6JiqmBOMVP2hRFPKjDneRa84IyXxCAetrO5wF9YtWkWP/XDAcXYoSMIl9ys7xkrpuRLLNOyPt1/eA0B31t3x6sokYWCw4pl/2T9bYZ8vN/0cCAZhh9KCeJhsjIrD9+80RcX6Cxld5Y3pxAjcmzgzzFBIngh8ccY/WLHugz56mCW74/uYwmN6LprdYgP5IojpTID5/X/p/Yax2U/CC18g6yo3FwXXCO6MB4nXGJIFqLoP/vl3UPpzoSimNlwVgWaugdgvd/jOOcIc3tEVwRPvEH6DJeMZG0vnL8wdWeZyqPF5MX5v76ojWw3n2eOTdyG7Ia5ULSjDbz4xMH45GoceyuNIfFoaAJf45R9eXVsk540VIB3GqJ2nKlzlJx/SzVDnnIpG31+vj5GWkLyYrERPar6iL3Faak+rZCNdPel98/bCWYxphjAIP12rWDC2PO9LJKb/b+e0zzv+AbsBT6yLUNiXoOTYGNb+0GtudPObGtMt1a2IrItTW6iYs91nz+R2Yf4gGy6VZHNEXD2d/lZ75fXl+iWh/onX3Ym2gcA4PLOJ2R5RfnThHZhnLv6Cbxrx+5+NrEmzlYjZLHh/vo6i8+5/tc7+SR3YtuHejE9CiyjfXBJUTCO9xNRexFpxbiyA86Qo4BcY7q9RiUkRKaJsW3bIgxk7/xHR1ZF5iY9CNzdxaIpQ0mbqyIZqVnw/5CPwSMuixMns8ESST/CLNJH4UcZWaJFVCBa8PIVz22yJnoH0PUbzKVw8QF5CC1zpRPDun3yFjo9VjwoxkC6RMDQRZlLf2jgTG/5YiPIowIR0XpYRHujqrnw1FPO6X2vdhLDOFQFvgQL4JERQvEuSr1j6e2AZwbXSmjlD5UzYoy9mtSxm7ZJ+0WAnFIkU46qoZWQ+TI02SaKAatwEFSUV0inSvtyp4c6hgkqMNXFQ6MsukrSVq8SR5FTGIt/EcAuHQ/rcpVy3cPLK15L2Rb+gj9cH/CtNfr2bsssBLKhrEF1gbeCYuH3aiAJbYDihHjQfgwR1HviAx63V27upxXEkqEBIJdSZi0CRNQPOWCmpn1itl4yi+CQ8SkBYJIwrtzHPE73rqZDNMFGGAAuw6kvBhOP5YXosY317yNnfet+OFc++77ZvooTvmLlBr7+ZXjBnMLUMMt7w9rV6SRKXImuKuQU8QVpbE9dflIgC9Y9u7F5jcmD5wKOryDjYirm/NInzCxkLBLytNY/GPD0nWvvklB9uk8UTAltBnXqZBWAMocxe9ntdhnN5oYj0/LRtj9xWn0qgeA1iwrXzF2qTe+9nctfLnpSFUqGrLRnSCI3tvG92ely7ryCqMml/ZODAdcDF7e8EuQsMUJK78sz5m8roIfJaJVps7ACgvlC/U/19r5tY4nksblr4HmXs0+7fneh3vK85M0sTl0TXcnjGEwldQlTZejQTrjg+iROHKnBjet6xz9547r+NmaTZ19y9Qo65mbBZ2007bRlWWBje4LKPrmF9DBQb331sV759yIpN2QtwLCbrdAYoCROCahN+GieO1nAzK88L/u55C6UAlRLrrD30A3pAhsVJqAscR5PC6bYcAe1AWPs+q7pqqeG+VwSncBvtq25zTBodUZOGADwta0fbvTERWwHgXKuMiMT830lg58l4SDka5/puaGV75ogtXUQT5H9rogENfgou+k5bsxz0VIo7cUDJ7XjBLxmm1FFPAt7cQI9hUdYQtUsjmMKvd6Qb00/gTur+XMTgiVfSy4+2gQKYuaWv6z2YfWsoygtkxTNCrgcW0MGWU13PGitamU0KH8UX9NnlY/WSL2T9TOxAxkLHvuXeDA4It0nL4TFYmwnBWnvu2mStX8bIZ6U4hr52yCcVA7mP/BKXcF0hhNnfrG43shTvY9hnCmAKgmnPasT7BHaENvWnJxARdz2LRBMQ69G+l2Pjoja7rATjtbtj1WKi5CdATiuFhpJzMyzgXP1nJp24YN20xur7dqI6vBQgzkGGoQrB2sUs8kvd9RBBtxD7dzuKayxtQ/AQ+pqzFlWdIZ6bRq9d6hIO/TKlG0tUmCLDSAYUaLIkV50O4/RkAgjz9JDkzKKVSi1SfbwH+HbFvjPV2wHpxsQ/NO/AOfo/sDhuqrwpihrFocD04/3RoIkr/zTfnVCTLEQMMgXwson3Z49uwh/CoKnK/mKhqSMMxF8EOC0uFa/9/E34IADKXvBOgzb5rbz4bDsFuodN8/XClSAgsNr7Xrooq7Fw8MyiS44lykQrmrr1BEBBYOCYNMpa+sDhIpz/ucRGpbtIb6sma2qkbqOOa9tR3amXTtLbkL1wun+7o9+JZb2g48SArjvD42MvN5XeNyhgXfNeTySJQd8SiymGPKKJY01U2isbFTkuezA1cbl4NsUaQIarvw4c7NWrzNBsvsdzwUAdaiRVdn6i/3PdGeytT1KLXfrbC8lwTJ2cbVEV92Y/Gg4i2HJ00TSYh6/sv7yu5Ig8a9efsZZWwnJ8ip33fnMLfkEKdmMit9cXTlHoGhKiGD9SNb0wbHiDeXjPojtu1QXYZTOWhphfRQxnfWXm5/7SD/qhjqsJaXpUDCWzZMOGmuZmFx6UKVrxGCK4JPUSkkTWsdzYwDBPlUwVLCxW2szFxKNkVvtqnhfO8g0EXMKqqsD9M7Zye6cyVM8NqWh5bePCT5/vP/NpbZ2uCQlrjBBbUSpugUrBzr3DtTl/i77DI1QAhiZYIdNF8ydsyMldaDF4e54y+AtWjp7gpWGObgpUVAHC/hbC5HtWi7a9+ewEztLQWrSSuDPApcq1/6BPhe361iq2CgysuoEfn6kK/o8tj9iZxl2ljCFcDDHYzLzA8dtc1nR8zM2z/gABf1Hr0fkwxuylbzkxGTE14JjscuWysdGi04newQ5s4lWK6+2FfxXG90OOb50ZoVBTmzbnaxKQiSDUlkF13Q9+qZnTpACTtEWdNtZS0Ua517TavdEtzm3GKz4UbZ69b6eHG7GKFa/HoJQgSyNlQt6opohyjpWks3zjJD8c/TdtXfROSdU2S0+6Imbtl2lqmFzflx2FiKkyS5HMRvYPz65oTvOtAr7dI6Sd7z2X8cnnWQCxMjLbVIVm2OFV7YRDAB9ccm20eOuYpT4gLOHxv1SJ2h3cxfHKFbt2OIKbZcW+X8kVhIEoe7RZ0G7MdpizWE5ephQedFAHionvSTB+YsMaPGHpv5yr7vMjQ5SogwHP2NDFwAJkjTJYEUwYWaUh7sx38Jm8dAq6smZ2B7gYXnD91kkRf+lGJgIXpjXwqDLYddPKmxV/qOxA1HrD8HpfIBDg7+fBMecqYUGUbqC3QkLvPDcS6xomYBSgCkaNBHoc5XEQZ2k26JbuVcrberaJVbMSHwATNop3fyu0dHfolbTj9QMq7N7n6HC0Z876PPrf+gdCdlbZP+c30mU7tWpd//s0WEU8k7qrylmzr+5D7tZ6kl11XPHgKWB+nR/6Hzkpny8xcVoZSfuqRRjtOj9iJnM32OHJZE4ep8tKDjCHrioM5vMye1CIHbSG1rSqYucfla/qBHruus+qrmVZLsd3BlFQuNu7yLreJ0+u+jVXcXMiZwflZh7zesGWiJ/nIG8T/jGVRTyivBmbcCf+oKqtQ6kDn6ns/mwA3ZL2qSsP+UXAB4s57iG+m5ksHuPO/pa9m1UVE3EX+PR+Xyml4uqy/eXZD+eVBRDJxHfzH5g02WgKHbj6n4rLsjZHay9qW9K3m3wfxPFQpFyHa+O3hwWjkkoTAh8e504l1NLO78D/w3rXScMhqLBer9GGJ3w0a7NdPSZXLRx5LLwuAVpSagnTjbRbDzNEGKRQVGSvVqFZ90itQklq3kJFYbeE+fObWKuvsiHesupkn072TlG+IVDHUaLDY26QIH+W6yPGiWMTi7g1gti+QA6NoLZ8nd6thicrGgnpYbMEKWJGo5MKd+7IO1vPgv8lQ8zeRddd/5gYEjUoyHF9a6N3W0MJtPdD0e5FzY0/9VOv4CYknbpF0oFHT5saCL49IDIholgh1B+FYHrTX7DWwckZxbqmYAUxpJVo+fl6Ax0nsJLaQLZApzQ1x8OrU4fh3Xfpcj9U/2sGc8q7EI2YfvDsJUsp1P4y45fF7lM5YUT2Zj4lxprUCo7URL53Wp+idR52Qw0wEFIdFMgD80A7SmSLfn2uJYp3WzJj7Kf5307XWkz4y338j2Aq/y30Jp+0XubLF/DIzXzzNmS4+zgLaEvPTYK7rF7whWWltZ6cfNZ+or6OpYp+k/WaDEsVX4DtChx4A5NlQQrCrP1/tXWY4XxM8Bm1Th6/D8pgNp0xVt6EUiBa1nADTV/ty8TYwMCpEASJJ7bqPyW5dKudv+PyN8vDNS4yTV1riTABz9uIjLIOG+iiit1JDvIzo3VAWzo2+oGbksIcUYcnfCa7WvCI+eLEQMQmWzRZcLkNOae6wvOs1by50uX/H4sbC0AAAAA==';
  const MAX_PIXELS = 16_777_216; // Keep original pixels; reject, never silently downsample.
  const MAX_DIMENSION = 16_384;
  const MAX_LAYERS = 120;
  const MAX_HISTORY = 31;
  const MAX_FILE_BYTES = 50 * 1024 * 1024;
  const names = {move:'移動',select:'四角形選択',lasso:'自由選択',pen:'ペン',brush:'ブラシ',eraser:'消しゴム',fill:'塗りつぶし',rect:'四角形',ellipse:'円・楕円',arrow:'矢印',text:'文字',crop:'切り抜き',raster:'画像',path:'描画'};
  const cache = new Map();
  const editor = $('#editor-dialog');
  const resumeButton=document.createElement('button');resumeButton.className='resume-button';resumeButton.id='resume-editor';resumeButton.hidden=true;resumeButton.innerHTML=SVG('pen')+'編集中のキャンバスに戻る';document.body.appendChild(resumeButton);
  const canvas = $('#paint-canvas');
  const overlay = $('#overlay-canvas');
  const ctx = canvas.getContext('2d');
  const ox = overlay.getContext('2d');
  let doc = null;
  let selectedId = null;
  let selection = null;
  let tool = 'move';
  let zoom = 1;
  let grid = false;
  let gesture = null;
  let history = [];
  let historyIndex = -1;
  let dirty = false;
  let internalClipboard = null;
  let toastTimer;
  let color = '#ff4e79';
  let stroke = 6;
  let shapeFilled = false;
  let nextOpacity = 1;
  let ioBusy = false;
  let fitFrame = 0;
  let selectionScope = 'merged';
  let historyUI = [];
  let pasteTimer = 0;
  let pasteSequence = 0;
  let clipboardSequence = 0;
  let keyboardCopyToken = null;

  function validDimensions(w, h) {
    return Number.isInteger(w) && Number.isInteger(h) && w > 0 && h > 0 &&
      w <= MAX_DIMENSION && h <= MAX_DIMENSION && w * h <= MAX_PIXELS;
  }
  function dimensionError() {
    return new Error('画像は縮小せずに読み込みます。各辺16,384px・合計16,777,216画素以内にしてください。キャンバス拡張後もこの上限が適用されます。');
  }
  function currentUI() { return {selectedId, selection: selection ? structuredClone(selection) : null, tool}; }
  function rememberHistoryUI() { if (historyIndex >= 0) historyUI[historyIndex] = currentUI(); }
  function focusCanvas() { if (editor.open) overlay.focus({preventScroll:true}); }
  function canEditNow() { return Boolean(doc && editor.open && $$('dialog[open]').at(-1) === editor && !ioBusy); }
  function growCanvasForImage(w, h) {
    const width = Math.max(doc.width, w), height = Math.max(doc.height, h);
    if (!validDimensions(width, height)) throw dimensionError();
    if (width === doc.width && height === doc.height) return false;
    doc.width = width; doc.height = height;
    resizeCanvases();
    return true;
  }
  function selectionPolygon(shape) {
    if (shape.kind === 'lasso' && shape.points?.length > 2) return shape.points;
    return [[shape.x,shape.y],[shape.x+shape.w,shape.y],[shape.x+shape.w,shape.y+shape.h],[shape.x,shape.y+shape.h]];
  }
  // Masks are in normalized object coordinates, so text/shapes stay editable,
  // and masks follow an object's move, rotation and resize. No flattening needed.
  function localPolygon(o, shape) {
    return selectionPolygon(shape).map(([x,y]) => {
      const q=objectLocal(o,{x,y}); return [q.x/o.w,q.y/o.h];
    });
  }
  function maskPath(target, points, o) {
    target.moveTo(points[0][0]*o.w, points[0][1]*o.h);
    for (let i=1;i<points.length;i++) target.lineTo(points[i][0]*o.w,points[i][1]*o.h);
    target.closePath();
  }
  function applyObjectMasks(target, o) {
    for (const polygon of o.clips || []) {
      target.beginPath(); maskPath(target,polygon,o); target.clip('evenodd');
    }
    for (const polygon of o.cutouts || []) {
      let extent=1_000_000;
      for(const [x,y] of polygon) extent=Math.max(extent,Math.abs(x*o.w)+100,Math.abs(y*o.h)+100);
      target.beginPath(); target.rect(-extent,-extent,extent*2,extent*2);
      maskPath(target,polygon,o); target.clip('evenodd');
    }
  }


  function toast(message, duration = 4500) {
    const el = $('#toast');
    clearTimeout(toastTimer);
    const host = $$('dialog[open]').at(-1) || document.body;
    host.appendChild(el);
    el.textContent = message;
    el.classList.add('visible');
    toastTimer = setTimeout(() => el.classList.remove('visible'), duration);
  }
  function closeDialog(dialog) { if (dialog?.open) dialog.close(); }
  function showDialog(dialog) { if (!dialog.open) dialog.showModal(); }
  function uid() { return globalThis.crypto?.randomUUID?.() || `layer-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`; }
  function clamp(n, lo, hi) { return Math.min(hi, Math.max(lo, n)); }
  function active() { return doc?.objects.find(o => o.id === selectedId); }
  function makeCanvas(w, h) { const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h)); return c; }
  function base(type, extra = {}) { return { id: uid(), type, name: names[type] || 'レイヤー', x: 0, y: 0, w: 1, h: 1, rotation: 0, opacity: nextOpacity, visible: true, locked: false, ...extra }; }
  function rasterFromCanvas(c, name = '画像', extra = {}) {
    const src = c.toDataURL('image/png');
    cache.set(src, c);
    return base('raster', {name, w:c.width, h:c.height, src, opacity:1, ...extra});
  }
  function ensureImage(src) {
    if (cache.has(src)) return Promise.resolve(cache.get(src));
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => { cache.set(src, img); resolve(img); };
      img.onerror = () => reject(new Error('画像を読み込めませんでした。PNG / JPEG / WebP などの画像を選んでください。'));
      img.src = src;
    });
  }
  function readFile(file) {
    if (file.size > MAX_FILE_BYTES) return Promise.reject(new Error('50 MB以下のファイルを選んでください。'));
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error('ファイルを読み込めませんでした。'));
      reader.readAsDataURL(file);
    });
  }
  function drawObject(target, o) {
    if (!o.visible || o.opacity <= 0) return;
    target.save();
    target.globalAlpha = o.opacity;
    target.translate(o.x + o.w / 2, o.y + o.h / 2);
    target.rotate((o.rotation || 0) * Math.PI / 180);
    target.translate(-o.w / 2, -o.h / 2);
    applyObjectMasks(target, o);
    target.strokeStyle = o.color || '#ff4e79';
    target.fillStyle = o.color || '#ff4e79';
    target.lineWidth = o.stroke || 6;
    target.lineCap = 'round';
    target.lineJoin = 'round';
    if (o.type === 'raster') {
      const img = cache.get(o.src);
      if (img) target.drawImage(img, 0, 0, o.w, o.h);
    } else if (o.type === 'path') {
      target.scale(o.w / (o.baseW || o.w), o.h / (o.baseH || o.h));
      if (o.erase) target.globalCompositeOperation = 'destination-out';
      target.beginPath();
      const pts = o.points || [];
      if (pts.length === 1) { target.arc(pts[0][0], pts[0][1], (o.stroke || 6) / 2, 0, Math.PI * 2); target.fill(); }
      else if (pts.length > 1) { target.moveTo(...pts[0]); for (let i = 1; i < pts.length; i++) target.lineTo(...pts[i]); target.stroke(); }
    } else if (o.type === 'rect' || o.type === 'ellipse') {
      target.beginPath();
      if (o.type === 'rect') target.rect(0, 0, o.w, o.h);
      else target.ellipse(o.w / 2, o.h / 2, Math.max(.1, o.w / 2), Math.max(.1, o.h / 2), 0, 0, Math.PI * 2);
      if (o.filled) target.fill();
      target.stroke();
    } else if (o.type === 'arrow') {
      const x1 = o.flipX ? o.w : 0, y1 = o.flipY ? o.h : 0;
      const x2 = o.flipX ? 0 : o.w, y2 = o.flipY ? 0 : o.h;
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const size = Math.min(Math.hypot(o.w,o.h) * .5, Math.max(16, (o.stroke || 6) * 3.5));
      target.beginPath(); target.moveTo(x1,y1); target.lineTo(x2,y2); target.stroke();
      target.beginPath(); target.moveTo(x2,y2);
      target.lineTo(x2-size*Math.cos(angle-.48),y2-size*Math.sin(angle-.48));
      target.lineTo(x2-size*Math.cos(angle+.48),y2-size*Math.sin(angle+.48));
      target.closePath(); target.fill();
    } else if (o.type === 'text') {
      target.scale(o.w / (o.baseW || o.w), o.h / (o.baseH || o.h));
      target.font = `700 ${o.fontSize || 48}px ${FONT}`;
      target.textBaseline = 'top';
      String(o.text || '').split('\n').forEach((line, i) => target.fillText(line, 0, i * (o.fontSize || 48) * 1.35));
    }
    target.restore();
  }
  function renderDocument(target) {
    target.clearRect(0,0,target.canvas.width,target.canvas.height);
    doc?.objects.forEach(o => drawObject(target,o));
    // White documents erase to white; transparent documents retain real alpha.
    if (doc?.backgroundColor) {
      target.save(); target.globalCompositeOperation='destination-over';
      target.fillStyle=doc.backgroundColor; target.fillRect(0,0,doc.width,doc.height); target.restore();
    }
  }
  function render() { if (!doc) return; renderDocument(ctx); renderOverlay(); }
  function pathSelection(target, sel) {
    target.beginPath();
    if (sel.kind === 'lasso' && sel.points?.length > 2) {
      target.moveTo(...sel.points[0]);
      sel.points.slice(1).forEach(p => target.lineTo(...p));
      target.closePath();
    } else { target.rect(sel.x,sel.y,sel.w,sel.h); }
  }
  function renderOverlay() {
    ox.clearRect(0,0,overlay.width,overlay.height);
    if (!doc) return;
    ox.save();
    if (grid && zoom >= .15) {
      const spacing = 20;
      ox.strokeStyle = '#6586a42a'; ox.lineWidth = .5 / zoom;
      ox.beginPath();
      for (let x=0;x<=doc.width;x+=spacing){ox.moveTo(x,0);ox.lineTo(x,doc.height);}
      for (let y=0;y<=doc.height;y+=spacing){ox.moveTo(0,y);ox.lineTo(doc.width,y);}
      ox.stroke();
    }
    if (selection) {
      ox.lineWidth = 1.4 / zoom; ox.strokeStyle = '#ffffff'; ox.setLineDash([]);
      pathSelection(ox,selection); ox.stroke();
      ox.strokeStyle = '#247bff'; ox.setLineDash([5/zoom,4/zoom]); pathSelection(ox,selection); ox.stroke();
      if (selection.kind==='lasso' && gesture?.mode==='selection') { ox.fillStyle='#4097ff14';ox.fill(); }
    } else {
      const o = active();
      if (o && o.visible && ['move','text'].includes(tool)) {
        ox.translate(o.x+o.w/2,o.y+o.h/2); ox.rotate((o.rotation||0)*Math.PI/180); ox.translate(-o.w/2,-o.h/2);
        ox.lineWidth=1.2/zoom;ox.strokeStyle='#fff';ox.strokeRect(0,0,o.w,o.h);
        ox.strokeStyle='#1f78ff';ox.setLineDash([4/zoom,3/zoom]);ox.strokeRect(0,0,o.w,o.h);ox.setLineDash([]);
        if (!o.locked) {
          const size=6/zoom;
          [[0,0],[o.w,0],[o.w,o.h],[0,o.h]].forEach(([x,y])=>{ox.fillStyle='#fff';ox.fillRect(x-size/2,y-size/2,size,size);ox.strokeStyle='#1f78ff';ox.strokeRect(x-size/2,y-size/2,size,size);});
        }
      }
    }
    ox.restore();
    $('#selection-status').textContent = selection ? `${Math.round(selection.w)} × ${Math.round(selection.h)} px 選択中` : `${names[tool]}ツール`;
    $('#apply-crop').hidden = !selection;
    $('#crop-selection').disabled = !selection;
  }
  function resizeCanvases() {
    canvas.width=overlay.width=doc.width;canvas.height=overlay.height=doc.height;
    $('#document-size').textContent=`${doc.width} × ${doc.height} px`;
    $('#editor-file-name').textContent=doc.name || '無題のキャンバス';
    setZoom(zoom);
  }
  function setZoom(value) {
    if (!doc) return;
    zoom=clamp(value,.05,4);
    const wrap=$('#canvas-wrap');wrap.style.width=`${doc.width*zoom}px`;wrap.style.height=`${doc.height*zoom}px`;
    $('#zoom-reset').textContent=`${Math.round(zoom*100)}%`;
    renderOverlay();
  }
  function fitCanvas() {
    if (!doc || !editor.open) return;
    const area=$('#canvas-area');const mobile=window.innerWidth<=760;
    setZoom(Math.min(1,(area.clientWidth-(mobile?50:96))/doc.width,(area.clientHeight-(mobile?65:104))/doc.height));
  }
  function openEditor() {
    showDialog(editor);
    resumeButton.hidden=true;
    document.body.style.overflow='hidden';
    cancelAnimationFrame(fitFrame);fitFrame=requestAnimationFrame(()=>{resizeCanvases();fitCanvas();render();refreshUI();});
  }
  function newDocument(width,height,transparent=false,name='無題のキャンバス') {
    const c=makeCanvas(width,height);
    if(!transparent){const cctx=c.getContext('2d');cctx.fillStyle='#ffffff';cctx.fillRect(0,0,width,height);}
    const o=rasterFromCanvas(c,'背景',{isBackground:true});
    doc={version:2,width,height,name,backgroundColor:transparent?null:'#ffffff',objects:[o]};selectedId=null;selection=null;gesture=null;history=[];historyUI=[];historyIndex=-1;
    setTool('move');commit(false);openEditor();
  }
  function commit(markDirty=true) {
    if(!doc)return;
    const snapshot=JSON.stringify(doc);
    if(history[historyIndex]!==snapshot){
      history=history.slice(0,historyIndex+1);historyUI=historyUI.slice(0,historyIndex+1);history.push(snapshot);historyUI.push(currentUI());
      while(history.length>MAX_HISTORY || (history.length>2 && history.reduce((sum,s)=>sum+s.length,0)>64_000_000)){history.shift();historyUI.shift();}
      historyIndex=history.length-1;
    }
    if(markDirty)dirty=true;
    refreshUI();render();
  }
  function cancelGesture() {
    if(!gesture)return false;
    const g=gesture;gesture=null;
    if(g.beforeDoc)doc=JSON.parse(g.beforeDoc);
    if(g.beforeUI){selectedId=g.beforeUI.selectedId;selection=g.beforeUI.selection;tool=g.beforeUI.tool;}
    if(g.pointerId!==undefined&&overlay.hasPointerCapture(g.pointerId))overlay.releasePointerCapture(g.pointerId);
    resizeCanvases();setTool(tool);refreshUI();render();return true;
  }
  function historyMove(delta) {
    if(ioBusy)return;
    if(gesture && cancelGesture())return;
    const next=historyIndex+delta;if(next<0||next>=history.length)return;
    historyIndex=next;doc=JSON.parse(history[next]);gesture=null;
    const ui=historyUI[next] || {};
    selectedId=doc.objects.some(o=>o.id===ui.selectedId)?ui.selectedId:null;
    selection=ui.selection?structuredClone(ui.selection):null;
    tool=ui.tool || 'move';
    setTool(tool);resizeCanvases();dirty=true;refreshUI();render();
  }
  function refreshUI() {
    if(!doc)return;
    $('#undo').disabled=historyIndex<=0;$('#redo').disabled=historyIndex>=history.length-1;
    const list=$('#layer-list');list.replaceChildren();
    [...doc.objects].reverse().forEach(o=>{
      const row=document.createElement('div');row.className=`layer-item${o.id===selectedId?' selected':''}${o.visible?'':' hidden-layer'}`;row.dataset.layerId=o.id;
      row.setAttribute('role','button');row.tabIndex=0;row.setAttribute('aria-label',`${o.name}${o.locked?'（ロック中）':''}`);
      const eye=document.createElement('button');eye.className='icon-button';eye.innerHTML=SVG('eye');eye.title=o.visible?'非表示にする':'表示する';eye.setAttribute('aria-label',eye.title);eye.style.opacity=o.visible?'1':'.4';
      eye.addEventListener('click',e=>{e.stopPropagation();o.visible=!o.visible;commit();});
      const thumb=document.createElement('span');thumb.className='layer-thumb';
      if(o.type==='raster'){const im=document.createElement('img');im.src=o.src;im.alt='';thumb.appendChild(im);}else thumb.innerHTML=SVG(o.type==='path'?(o.erase?'eraser':'pen'):o.type);
      const label=document.createElement('span');label.className='layer-name';label.textContent=o.name;
      const lock=document.createElement('button');lock.className='icon-button';lock.innerHTML=SVG(o.locked?'lock':'unlock');lock.title=o.locked?'ロックを解除':'レイヤーをロック';lock.setAttribute('aria-label',lock.title);lock.style.opacity=o.locked?'1':'.35';
      lock.addEventListener('click',e=>{e.stopPropagation();o.locked=!o.locked;commit();});
      const choose=()=>{selectedId=o.id;selection=null;refreshUI();renderOverlay();};
      row.addEventListener('click',choose);row.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose();}});
      row.append(eye,thumb,label,lock);list.appendChild(row);
    });
    syncProperties();
  }
  function syncProperties() {
    const o=active();
    $('#selected-properties').classList.toggle('show',Boolean(o));
    $('#text-properties').classList.toggle('show',tool==='text'||o?.type==='text');
    $('#item-opacity').value=Math.round((o?.opacity??nextOpacity)*100);$('#opacity-output').value=`${$('#item-opacity').value}%`;
    if(o){$('#item-width').value=Math.round(o.w);$('#item-height').value=Math.round(o.h);$('#item-rotation').value=Math.round(o.rotation||0);$('#rotation-output').value=`${Math.round(o.rotation||0)}°`;}
    if(o?.type==='text'&&document.activeElement!==$('#text-content')){$('#text-content').value=o.text;$('#font-size').value=o.fontSize;}
    $('#paint-color').value=color;
    $('#canvas-background').value=doc.backgroundColor?'white':'transparent';
    $('#selection-scope').value=selectionScope;
    $$('.swatches button').forEach(b=>b.classList.toggle('active',b.dataset.color===color));
  }
  function setTool(value) {
    tool=value;
    if(!['select','lasso','crop','move'].includes(tool))selection=null;
    $$('.tool').forEach(b=>{b.classList.toggle('active',b.dataset.tool===tool);b.setAttribute('aria-pressed',String(b.dataset.tool===tool));});
    overlay.style.cursor=tool==='move'?'default':tool==='text'?'text':'crosshair';
    const hints={move:'ドラッグで移動。四隅のハンドルでサイズを変更できます。',select:'見えている画像を四角く選択。内側をドラッグして移動、Ctrl / ⌘ + X で切り取れます。',lasso:'囲んだ形のままコピー・切り取り・移動できます。標準では見えている画像全体が対象です。',crop:'範囲を選んで Enter、または「選択範囲で切り抜く」を押してください。',text:'右の欄に文字を入力して、キャンバスをクリックしてください。',eraser:'下にあるレイヤーを消します。後から描いたレイヤーには影響しません。',fill:'クリックした位置と同じ色でつながる範囲を塗りつぶします。'};
    $('#canvas-hint').textContent=hints[tool]||'キャンバスをドラッグして描きます。Shift を押すと円・正方形にできます。';
    if(doc){syncProperties();renderOverlay();}
  }
  function point(event) {
    const r=overlay.getBoundingClientRect();const x=(event.clientX-r.left)*doc.width/r.width,y=(event.clientY-r.top)*doc.height/r.height;
    const unconstrained=gesture&&['move','resize','selection-drag'].includes(gesture.mode);
    return {x:unconstrained?x:clamp(x,0,doc.width),y:unconstrained?y:clamp(y,0,doc.height)};
  }
  function objectLocal(o,p) {
    const a=-(o.rotation||0)*Math.PI/180,dx=p.x-(o.x+o.w/2),dy=p.y-(o.y+o.h/2);
    return {x:dx*Math.cos(a)-dy*Math.sin(a)+o.w/2,y:dx*Math.sin(a)+dy*Math.cos(a)+o.h/2};
  }
  function hitObject(p) {
    const hit=makeCanvas(1,1),hc=hit.getContext('2d',{willReadFrequently:true});
    return [...doc.objects].reverse().find(o=>{
      if(!o.visible||o.locked||o.isBackground||o.erase)return false;
      const q=objectLocal(o,p),pad=Math.max(4/zoom,(o.stroke||0)/2);
      if(q.x< -pad||q.y< -pad||q.x>o.w+pad||q.y>o.h+pad)return false;
      hc.clearRect(0,0,1,1);hc.save();hc.translate(-Math.floor(p.x),-Math.floor(p.y));drawObject(hc,o);hc.restore();
      return hc.getImageData(0,0,1,1).data[3]>8;
    });
  }
  function selectionContains(p) {
    if(!selection)return false;
    if(selection.kind==='lasso'){ox.save();pathSelection(ox,selection);const result=ox.isPointInPath(p.x,p.y,'evenodd');ox.restore();return result;}
    return p.x>=selection.x&&p.y>=selection.y&&p.x<=selection.x+selection.w&&p.y<=selection.y+selection.h;
  }
  function selectionBounds(sel=selection) {
    if(!sel)return null;
    const x=clamp(Math.floor(sel.x),0,doc.width),y=clamp(Math.floor(sel.y),0,doc.height);
    const right=clamp(Math.ceil(sel.x+sel.w),0,doc.width),bottom=clamp(Math.ceil(sel.y+sel.h),0,doc.height);
    if(right<=x||bottom<=y)return null;
    return {x,y,w:right-x,h:bottom-y};
  }
  function objectBounds(o) {
    const a=(o.rotation||0)*Math.PI/180;
    const w=Math.abs(o.w*Math.cos(a))+Math.abs(o.h*Math.sin(a))+(o.stroke||0)*2;
    const h=Math.abs(o.w*Math.sin(a))+Math.abs(o.h*Math.cos(a))+(o.stroke||0)*2;
    return {kind:'rect',x:o.x+o.w/2-w/2,y:o.y+o.h/2-h/2,w,h};
  }
  function selectionPiece() {
    const o=active();
    if(!selection&&(!o||!o.visible)){toast('コピー・切り取りする範囲をドラッグで選択してください。Ctrl / ⌘ + A で全体を選べます。');return null;}
    const merged=Boolean(selection && selectionScope==='merged');
    if(!merged&&(!o||!o.visible)){toast('対象のレイヤーを選んでください。');return null;}
    const shape=selection||objectBounds(o),b=selectionBounds(shape);
    if(!b){toast('キャンバス内の範囲を選択してください。');return null;}
    const c=makeCanvas(b.w,b.h),cx=c.getContext('2d');
    cx.translate(-b.x,-b.y);pathSelection(cx,shape);cx.clip('evenodd');
    if(merged){
      doc.objects.forEach(item=>drawObject(cx,item));
      if(doc.backgroundColor){cx.save();cx.globalCompositeOperation='destination-over';cx.fillStyle=doc.backgroundColor;cx.fillRect(0,0,doc.width,doc.height);cx.restore();}
    }else drawObject(cx,o);
    return {canvas:c,bounds:b,shape:structuredClone(shape),layerId:merged?null:o.id,merged};
  }
  function regionTargets(piece) {
    const b=piece.bounds;
    return doc.objects.filter(o=>{
      if(!o.visible || (!piece.merged&&o.id!==piece.layerId))return false;
      const q=objectBounds(o);
      return q.x<b.x+b.w&&q.y<b.y+b.h&&q.x+q.w>b.x&&q.y+q.h>b.y;
    });
  }
  function canRemovePiece(piece, makeFloating=false) {
    if(regionTargets(piece).some(o=>o.locked)){toast('範囲内にロックされたレイヤーがあります。解除するか、選択対象を「選択中のレイヤーのみ」に変更してください。',6500);return false;}
    if(makeFloating&&doc.objects.length>=MAX_LAYERS){toast('レイヤー数の上限に達しました。不要なレイヤーを削除してください。');return false;}
    return true;
  }
  function removeRegion(piece,makeFloating=false) {
    if(!canRemovePiece(piece,makeFloating))return null;
    for(const o of regionTargets(piece)){
      (o.cutouts ||= []).push(localPolygon(o,piece.shape));
    }
    let floating=null;
    if(makeFloating){
      floating=rasterFromCanvas(piece.canvas,'切り取った部分',{x:piece.bounds.x,y:piece.bounds.y});
      doc.objects.push(floating);selectedId=floating.id;
    }else selectedId=null;
    selection=null;
    return floating;
  }
  function addObject(o) {
    if(doc.objects.length>=MAX_LAYERS){toast('レイヤーは120枚までです。不要なレイヤーを削除してください。');return false;}
    doc.objects.push(o);selectedId=o.id;return true;
  }
  function normalizedPath(o) {
    const pad=(o.stroke||6)/2+1;
    const minX=Math.min(...o.points.map(p=>p[0]))-pad,minY=Math.min(...o.points.map(p=>p[1]))-pad;
    const maxX=Math.max(...o.points.map(p=>p[0]))+pad,maxY=Math.max(...o.points.map(p=>p[1]))+pad;
    o.points=o.points.map(([x,y])=>[x-minX,y-minY]);o.x+=minX;o.y+=minY;o.w=o.baseW=Math.max(1,maxX-minX);o.h=o.baseH=Math.max(1,maxY-minY);
  }
  function measureText(o) {
    ctx.save();ctx.font=`700 ${o.fontSize}px ${FONT}`;const lines=String(o.text).split('\n');
    o.w=o.baseW=Math.max(4,...lines.map(t=>ctx.measureText(t).width+4));o.h=o.baseH=Math.max(o.fontSize*1.35,lines.length*o.fontSize*1.35);ctx.restore();
  }
  function beginPointer(e) {
    if(!canEditNow()||e.button!==0)return;if(gesture)cancelGesture();e.preventDefault();focusCanvas();
    rememberHistoryUI();
    const beforeDoc=JSON.stringify(doc),beforeUI=currentUI();
    const startGesture=value=>{gesture={...value,beforeDoc,beforeUI,pointerId:e.pointerId};overlay.setPointerCapture(e.pointerId);};
    const p=point(e);
    if(['select','lasso','crop'].includes(tool)||(tool==='move'&&selection)){
      p.x=Math.round(p.x);p.y=Math.round(p.y);
      if(selection&&selectionContains(p)&&tool!=='crop'){
        startGesture({mode:'selection-drag',start:p,moved:false});return;
      }
      if(!active())selectedId=hitObject(p)?.id||doc.objects.at(-1)?.id;
      selection={kind:tool==='lasso'?'lasso':'rect',x:p.x,y:p.y,w:0,h:0,points:[[p.x,p.y]]};
      startGesture({mode:'selection',start:p});renderOverlay();return;
    }
    if(tool==='move'){
      const o=active();
      if(o&&!o.locked&&!(o.rotation||0)){
        const corners=[[o.x,o.y,'nw'],[o.x+o.w,o.y,'ne'],[o.x+o.w,o.y+o.h,'se'],[o.x,o.y+o.h,'sw']];
        const corner=corners.find(([x,y])=>Math.hypot(p.x-x,p.y-y)<9/zoom);
        if(corner){startGesture({mode:'resize',start:p,corner:corner[2],initial:{x:o.x,y:o.y,w:o.w,h:o.h},object:o});return;}
      }
      const hit=hitObject(p);selectedId=hit?.id||null;selection=null;refreshUI();renderOverlay();
      if(hit)startGesture({mode:'move',start:p,initial:{x:hit.x,y:hit.y},object:hit});return;
    }
    if(tool==='text'){
      const text=$('#text-content').value||'ここに注釈',fontSize=clamp(Number($('#font-size').value)||48,8,400);
      const o=base('text',{x:p.x,y:p.y,text,fontSize,color,name:text.split('\n')[0].slice(0,20)});measureText(o);
      if(addObject(o)){setTool('move');commit();}return;
    }
    if(tool==='fill'){floodFill(Math.floor(p.x),Math.floor(p.y));return;}
    let o;
    if(['pen','brush','eraser'].includes(tool))o=base('path',{x:p.x,y:p.y,w:1,h:1,points:[[0,0]],baseW:1,baseH:1,color,stroke:tool==='brush'?stroke*2:stroke,erase:tool==='eraser',name:names[tool],opacity:tool==='brush'?nextOpacity*.6:nextOpacity});
    else o=base(tool,{x:p.x,y:p.y,w:1,h:1,color,stroke,filled:shapeFilled});
    if(!addObject(o))return;
    startGesture({mode:'draw',start:p,object:o});refreshUI();render();
  }
  function movePointer(e) {
    if(!gesture||!doc)return;e.preventDefault();const p=point(e),g=gesture;
    if(g.mode==='selection'){
      p.x=Math.round(p.x);p.y=Math.round(p.y);
      if(selection.kind==='lasso'){
        const last=selection.points.at(-1);
        if(Math.hypot(p.x-last[0],p.y-last[1])>1/zoom)selection.points.push([p.x,p.y]);
        const xs=selection.points.map(v=>v[0]),ys=selection.points.map(v=>v[1]);selection.x=Math.min(...xs);selection.y=Math.min(...ys);selection.w=Math.max(...xs)-selection.x;selection.h=Math.max(...ys)-selection.y;
      }else{selection.x=Math.min(g.start.x,p.x);selection.y=Math.min(g.start.y,p.y);selection.w=Math.abs(p.x-g.start.x);selection.h=Math.abs(p.y-g.start.y);}
      renderOverlay();return;
    }
    if(g.mode==='selection-drag'){
      if(!g.moved&&Math.hypot(p.x-g.start.x,p.y-g.start.y)>2/zoom){const piece=selectionPiece();if(!piece)return;const floating=removeRegion(piece,true);if(!floating)return;g.object=floating;g.initial={x:floating.x,y:floating.y};g.moved=true;refreshUI();}
      if(g.moved){g.object.x=Math.round(g.initial.x+p.x-g.start.x);g.object.y=Math.round(g.initial.y+p.y-g.start.y);render();}return;
    }
    if(g.mode==='move'){g.object.x=Math.round(g.initial.x+p.x-g.start.x);g.object.y=Math.round(g.initial.y+p.y-g.start.y);render();return;}
    if(g.mode==='resize'){
      const i=g.initial,dx=p.x-g.start.x,dy=p.y-g.start.y;
      let w=Math.max(4,i.w+(g.corner.includes('e')?dx:-dx));let h=Math.max(4,i.h+(g.corner.includes('s')?dy:-dy));
      if(e.shiftKey){h=w*i.h/i.w;}
      g.object.w=w;g.object.h=h;g.object.x=g.corner.includes('w')?i.x+i.w-w:i.x;g.object.y=g.corner.includes('n')?i.y+i.h-h:i.y;
      render();return;
    }
    if(g.mode==='draw'){
      const o=g.object;
      if(o.type==='path'){
        const pts=e.getCoalescedEvents?.()||[e];
        (pts.length?pts:[e]).forEach(event=>{const q=point(event);if(o.points.length<100000)o.points.push([q.x-o.x,q.y-o.y]);});
      }else{
        let dx=p.x-g.start.x,dy=p.y-g.start.y;
        if(e.shiftKey&&['rect','ellipse'].includes(o.type)){const size=Math.max(Math.abs(dx),Math.abs(dy));dx=Math.sign(dx||1)*size;dy=Math.sign(dy||1)*size;}
        o.x=Math.min(g.start.x,g.start.x+dx);o.y=Math.min(g.start.y,g.start.y+dy);o.w=Math.max(1,Math.abs(dx));o.h=Math.max(1,Math.abs(dy));o.flipX=dx<0;o.flipY=dy<0;
      }
      render();
    }
  }
  function endPointer(e) {
    if(!gesture)return;
    const g=gesture;gesture=null;
    if(g.pointerId!==undefined&&overlay.hasPointerCapture(g.pointerId))overlay.releasePointerCapture(g.pointerId);
    if(g.mode==='selection'){
      if(selection&&(selection.w<1||selection.h<1))selection=null;
      if(selection?.kind==='rect'){const b=selectionBounds();if(b)Object.assign(selection,b);else selection=null;}
      renderOverlay();return;
    }
    if(g.mode==='selection-drag'&&!g.moved)return;
    if(g.mode==='draw'&&g.object.type==='path')normalizedPath(g.object);
    if(g.mode==='selection-drag')setTool('move');
    commit();
  }
  overlay.addEventListener('pointerdown',beginPointer);
  overlay.addEventListener('pointermove',movePointer);
  overlay.addEventListener('pointerup',endPointer);
  overlay.addEventListener('pointercancel',()=>cancelGesture());
  overlay.addEventListener('lostpointercapture',()=>{if(gesture)cancelGesture();});

  overlay.addEventListener('dblclick',e=>{if(tool!=='move')return;const o=hitObject(point(e));if(o?.type==='text'){selectedId=o.id;setTool('text');refreshUI();$('#text-content').focus();$('#text-content').select();}});

  function floodFill(x,y) {
    if(x>=doc.width||y>=doc.height)return;
    const w=doc.width,h=doc.height,total=w*h,src=ctx.getImageData(0,0,w,h),data=src.data;
    const seed=y*w+x,off=seed*4,origin=[data[off],data[off+1],data[off+2],data[off+3]];
    const rgb=[1,3,5].map(start=>parseInt(color.slice(start,start+2),16));
    if(origin.every((v,i)=>Math.abs(v-(i===3?255:rgb[i]))<2)){toast('選んだ色と同じ色です。');return;}
    const seen=new Uint8Array(total),queue=new Uint32Array(total),result=new ImageData(w,h);let head=0,tail=1;
    queue[0]=seed;seen[seed]=1;
    const matches=index=>{const j=index*4;return Math.abs(data[j]-origin[0])<=24&&Math.abs(data[j+1]-origin[1])<=24&&Math.abs(data[j+2]-origin[2])<=24&&Math.abs(data[j+3]-origin[3])<=24;};
    const put=index=>{if(!seen[index]&&matches(index)){seen[index]=1;queue[tail++]=index;}};
    while(head<tail){const index=queue[head++],j=index*4;result.data[j]=rgb[0];result.data[j+1]=rgb[1];result.data[j+2]=rgb[2];result.data[j+3]=255;
      const px=index%w;if(px>0)put(index-1);if(px<w-1)put(index+1);if(index>=w)put(index-w);if(index<total-w)put(index+w);
    }
    const c=makeCanvas(w,h);c.getContext('2d').putImageData(result,0,0);
    if(addObject(rasterFromCanvas(c,'塗りつぶし',{opacity:nextOpacity})))commit();
  }
  async function importFiles(files) {
    if(ioBusy)return;
    const list=[...files].filter(f=>/^image\/(png|jpeg|webp|gif|bmp|x-ms-bmp)$/.test(f.type)||/\.(png|jpe?g|webp|gif|bmp)$/i.test(f.name));
    if(!list.length){toast('PNG / JPEG / WebP / GIF / BMP の画像を選んでください。');return;}
    const adding=editor.open&&Boolean(doc);
    if(!adding&&doc&&dirty&&!confirm('現在の編集を閉じて、別の画像を開きますか？ 未保存の変更は失われます。'))return;
    if(gesture)endPointer();
    ioBusy=true;
    try{
      for(let n=0;n<list.length;n++){
        if((adding||n>0)&&doc.objects.length>=MAX_LAYERS)throw new Error('レイヤーは120枚までです。');
        const file=list[n],data=await readFile(file),img=await ensureImage(data);
        const w=img.naturalWidth||img.width,h=img.naturalHeight||img.height;
        if(!validDimensions(w,h))throw dimensionError();
        if((adding||n>0)&&!validDimensions(Math.max(doc.width,w),Math.max(doc.height,h)))throw dimensionError();
        const c=makeCanvas(w,h);c.getContext('2d').drawImage(img,0,0);
        const o=rasterFromCanvas(c,file.name||'貼り付けた画像',{x:0,y:0});
        if(!adding&&n===0){
          const pixels=c.getContext('2d').getImageData(0,0,w,h).data;
          let hasAlpha=false;for(let i=3;i<pixels.length;i+=4){if(pixels[i]<255){hasAlpha=true;break;}}
          doc={version:2,width:w,height:h,name:file.name||'貼り付けた画像',backgroundColor:hasAlpha?null:'#ffffff',objects:[o]};
          selectedId=o.id;selection=null;history=[];historyUI=[];historyIndex=-1;setTool('move');commit(false);dirty=false;openEditor();
        }else{
          rememberHistoryUI();
          const grew=growCanvasForImage(w,h);
          addObject(o);selection=null;setTool('move');commit();
          if(grew){fitCanvas();toast(`原寸 ${w} × ${h} px で貼り付け、キャンバスを ${doc.width} × ${doc.height} px に拡大しました。`);}
          else toast(`原寸 ${w} × ${h} px で貼り付けました。ドラッグで移動できます。`);
          $('#canvas-area').scrollTo(0,0);focusCanvas();
        }
        if(/\.gif$/i.test(file.name)||file.type==='image/gif')toast('GIFは静止画として読み込みます。アニメーションは保持されません。',6000);
      }
      closeDialog($('#new-dialog'));
    }catch(err){toast(err.message||'画像を開けませんでした。');}
    finally{ioBusy=false;$('#image-input').value='';}
  }
  async function pasteFromClipboard(sequence=++pasteSequence) {
    if(ioBusy)return;
    if(internalClipboard&&!internalClipboard.systemSynced&&!internalClipboard.eventMarkerWritten&&editor.open){pasteInternal();return;}
    try{
      if(!navigator.clipboard?.read)throw new Error('unavailable');
      const items=await navigator.clipboard.read();
      if(sequence!==pasteSequence)return;
      for(const item of items){
        const type=item.types.find(t=>t.startsWith('image/'));
        if(type){const blob=await item.getType(type);if(sequence!==pasteSequence)return;
          await importFiles([new File([blob],'貼り付けた画像.png',{type})]);return;}
      }
      if(internalClipboard){
        for(const item of items){
          if(item.types.includes('text/html')){
            const html=await (await item.getType('text/html')).text();
            if(sequence!==pasteSequence)return;
            if(html.includes(`data-browser-paint="${internalClipboard.token}"`)){pasteInternal();return;}
          }
        }
      }
      // A successful read containing text must NOT paste stale internal image data.
      toast('クリップボードに画像がありません。画像をコピーしてから貼り付けてください。');
    }catch{
      if(sequence!==pasteSequence)return;
      if(internalClipboard&&editor.open){pasteInternal();return;}
      showInfo('paste');
    }
  }
  function writeClipboardMarker(event, clip) {
    if(!event.clipboardData)return false;
    try{
      event.clipboardData.setData('text/x-browser-paint',clip.token);
      event.clipboardData.setData('text/html',`<img src="${clip.src}" data-browser-paint="${clip.token}" alt="">`);
      event.preventDefault();clip.eventMarkerWritten=true;return true;
    }catch{return false;}
  }
  function writeLegacyMarker(clip) {
    // Last-resort fallback for file:// and older browsers. Modern PNG clipboard
    // write is always attempted first. The legacy path is internal/HTML only.
    if(!document.execCommand)return false;
    let written=false;
    const listener=e=>{e.stopImmediatePropagation();written=writeClipboardMarker(e,clip);};
    document.addEventListener('copy',listener,true);
    try{const ok=document.execCommand('copy');clip.eventMarkerWritten=Boolean(ok&&written);return clip.eventMarkerWritten;}
    catch{return false;}
    finally{document.removeEventListener('copy',listener,true);}
  }
  async function systemCopy(c, token) {
    try{
      if(!navigator.clipboard?.write||!globalThis.ClipboardItem)throw new Error('unavailable');
      // Call write in the initiating user gesture; Safari accepts a promised blob.
      const blob=new Promise((resolve,reject)=>c.toBlob(b=>b?resolve(b):reject(new Error('画像を作成できません。')),'image/png'));
      await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);
      if(internalClipboard?.token===token)internalClipboard.systemSynced=true;
      toast('画像をコピーしました。他のアプリにも貼り付けできます。');
      return true;
    }catch{
      if(internalClipboard?.token===token){
        internalClipboard.systemSynced=false;
        if(!internalClipboard.eventMarkerWritten)writeLegacyMarker(internalClipboard);
      }
      toast('アプリ内にコピーしました。Ctrl / ⌘ + V または「貼り付け」で使えます。外部へのコピーはブラウザの許可が必要です。',6500);
      return false;
    }
  }
  async function copySelection(cut=false, clipboardEvent=null) {
    if(!canEditNow())return;
    if(gesture)endPointer();
    const piece=selectionPiece();if(!piece)return;
    if(cut&&!canRemovePiece(piece))return;
    const token=`${uid()}-${++clipboardSequence}`;
    internalClipboard={src:piece.canvas.toDataURL('image/png'),w:piece.canvas.width,h:piece.canvas.height,token,systemSynced:false};
    cache.set(internalClipboard.src,piece.canvas);
    if(clipboardEvent)writeClipboardMarker(clipboardEvent,internalClipboard);
    if(cut){
      rememberHistoryUI();
      if(selection)removeRegion(piece,false);
      else{doc.objects=doc.objects.filter(item=>item.id!==piece.layerId);selectedId=null;}
      selection=null;commit();
    }
    await systemCopy(piece.canvas,token);
  }
  function pasteInternal() {
    if(!internalClipboard||ioBusy)return;
    const {src,w,h}=internalClipboard;
    if(!doc){newDocument(w,h,true);}
    if(doc.objects.length>=MAX_LAYERS){toast('レイヤーは120枚までです。');return;}
    try{
      if(gesture)endPointer();
      rememberHistoryUI();
      const grew=growCanvasForImage(w,h);
      const o=base('raster',{src,w,h,x:0,y:0,name:'貼り付けた部分',opacity:1});
      if(addObject(o)){
        selection=null;setTool('move');commit();
        if(!editor.open)openEditor();else if(grew)fitCanvas();
        $('#canvas-area').scrollTo(0,0);focusCanvas();
        toast(grew?'コピーした画像を原寸で貼り付け、キャンバスを拡大しました。':'コピーした画像を貼り付けました。ドラッグで移動できます。');
      }
    }catch(err){toast(err.message);}
  }
  function deleteSelection(layerOnly=false) {
    if(!canEditNow())return;
    if(gesture)endPointer();
    const o=active();
    if(selection&&!layerOnly){
      const piece=selectionPiece();if(!piece||!canRemovePiece(piece))return;
      rememberHistoryUI();removeRegion(piece,false);
    }else{
      if(!o)return;if(o.locked){toast('レイヤーがロックされています。');return;}
      rememberHistoryUI();doc.objects=doc.objects.filter(item=>item.id!==o.id);selectedId=null;
    }
    selection=null;commit();
  }
  function duplicateSelection() {
    if(!canEditNow())return;
    rememberHistoryUI();
    if(selection){
      const piece=selectionPiece();if(!piece)return;
      const o=rasterFromCanvas(piece.canvas,'選択範囲の複製',{x:piece.bounds.x+20,y:piece.bounds.y+20});
      if(addObject(o)){selection=null;setTool('move');commit();}return;
    }
    const o=active();if(!o){toast('複製する範囲・レイヤーを選んでください。');return;}
    const copy=structuredClone(o);copy.id=uid();copy.name=`${o.name} のコピー`;copy.x+=20;copy.y+=20;copy.locked=false;copy.isBackground=false;
    if(addObject(copy))commit();
  }
  function applyCrop() {
    if(!canEditNow()||!selection){toast('切り抜く範囲を選んでください。');return;}
    const b=selectionBounds();if(!b)return;
    rememberHistoryUI();
    // Persist the crop mask, so later enlargement cannot reveal discarded pixels.
    const shape={kind:'rect',...b};
    for(const o of doc.objects){(o.clips ||= []).push(localPolygon(o,shape));o.x-=b.x;o.y-=b.y;}
    doc.width=b.w;doc.height=b.h;selection=null;selectedId=null;
    resizeCanvases();fitCanvas();commit();toast('選択範囲の大きさに切り抜きました。Ctrl / ⌘ + Z で戻せます。');
  }

  async function downloadBlob(blob,name) {
    if(!blob)throw new Error('保存用の画像を作成できませんでした。');
    const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.style.display='none';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
  }
  function cleanFilename(name) { return (name||'my-paint').replace(/[\\/:*?"<>|\u0000-\u001F]/g,'_').replace(/\.(png|jpe?g|webp|paint\.json|json)$/i,'').slice(0,100)||'my-paint'; }
  function openExport() {if(!doc)return;$('#export-name').value=cleanFilename(doc.name==='無題のキャンバス'?'my-paint':doc.name);showDialog($('#export-dialog'));}
  async function exportImage(e) {
    e.preventDefault();if(!doc)return;
    const format=$('#export-format').value,c=makeCanvas(doc.width,doc.height),cx=c.getContext('2d');
    try{
      renderDocument(cx);
      if(format==='jpeg'){cx.globalCompositeOperation='destination-over';cx.fillStyle='#fff';cx.fillRect(0,0,c.width,c.height);}
      const blob=await new Promise(resolve=>c.toBlob(resolve,`image/${format}`,.94));
      if(!blob)throw new Error('この形式で保存できませんでした。PNGをお試しください。');
      const actual=blob.type.split('/')[1]||'png';const ext=actual==='jpeg'?'jpg':actual;
      await downloadBlob(blob,`${cleanFilename($('#export-name').value)}.${ext}`);closeDialog($('#export-dialog'));dirty=false;
      toast(actual!==format?'このブラウザは指定形式に対応していないため、PNGで保存しました。':'画像を保存しました。編集を再開するにはプロジェクト保存もご利用ください。');
    }catch(err){toast(err.message||'画像を保存できませんでした。');}
  }
  function saveProject() {
    if(!doc)return;
    const blob=new Blob([JSON.stringify({application:'BrowserPaint',...doc})],{type:'application/json'});
    downloadBlob(blob,`${cleanFilename(doc.name)}.paint.json`).then(()=>{dirty=false;toast('プロジェクトを保存しました。「新規作成」から再度開けます。');}).catch(err=>toast(err.message));
  }
  async function loadProject(file) {
    if(!file)return;
    if(doc&&dirty&&!confirm('現在の編集を閉じて、保存したプロジェクトを開きますか？'))return;
    try{
      if(file.size>MAX_FILE_BYTES)throw new Error('50 MB以下のプロジェクトを選んでください。');
      const data=JSON.parse(await file.text());
      if(data.application!=='BrowserPaint'||![1,2].includes(data.version)||!Array.isArray(data.objects))throw new Error('ブラウザペイントのプロジェクトファイルではありません。');
      if(!Number.isInteger(data.width)||!Number.isInteger(data.height)||data.width<1||data.height<1||data.width>MAX_DIMENSION||data.height>MAX_DIMENSION||data.width*data.height>MAX_PIXELS||data.objects.length>MAX_LAYERS)throw new Error('キャンバスの大きさ、またはレイヤー数が上限を超えています。');
      const allowed=['raster','path','rect','ellipse','arrow','text'];
      const ids=new Set();
      for(const o of data.objects){
        if(!allowed.includes(o.type)||typeof o.id!=='string'||ids.has(o.id)||typeof o.name!=='string'||o.name.length>300)throw new Error('プロジェクト内のレイヤー情報が不正です。');
        ids.add(o.id);
        for(const key of ['x','y','w','h','rotation','opacity'])if(!Number.isFinite(o[key]))throw new Error('レイヤーの数値データが不正です。');
        if(o.w<=0||o.h<=0||o.w>MAX_DIMENSION||o.h>MAX_DIMENSION||Math.abs(o.x)>100000||Math.abs(o.y)>100000||o.opacity<0||o.opacity>1)throw new Error('レイヤーの大きさが不正です。');
        for(const field of ['cutouts','clips']){
          if(o[field]!==undefined&&(!Array.isArray(o[field])||o[field].length>10000||o[field].some(poly=>!Array.isArray(poly)||poly.length<3||poly.length>100000||poly.some(point=>!Array.isArray(point)||point.length!==2||point.some(n=>!Number.isFinite(n)||Math.abs(n)>1000000)))))throw new Error('選択範囲のマスクデータが不正です。');
        }
        if(o.color&&!/^#[0-9a-f]{6}$/i.test(o.color))throw new Error('色データが不正です。');
        if(o.stroke!==undefined&&(!Number.isFinite(o.stroke)||o.stroke<1||o.stroke>200))throw new Error('線幅が不正です。');
        if(o.type==='raster'){
          if(typeof o.src!=='string'||!/^data:image\/(png|jpeg|webp|gif|bmp);base64,[a-z0-9+/=]+$/i.test(o.src))throw new Error('画像はプロジェクトに埋め込まれている必要があります。');
          const image=await ensureImage(o.src);if(image.width*image.height>MAX_PIXELS)throw new Error('埋め込み画像が大きすぎます。');
        }
        if(o.type==='path'&&(!Array.isArray(o.points)||o.points.length>100000||o.points.some(p=>!Array.isArray(p)||p.length!==2||p.some(n=>!Number.isFinite(n)||Math.abs(n)>100000))||!Number.isFinite(o.baseW)||!Number.isFinite(o.baseH)||o.baseW<=0||o.baseH<=0))throw new Error('描画データが不正です。');
        if(o.type==='text'&&(typeof o.text!=='string'||o.text.length>10000||!Number.isFinite(o.fontSize)||o.fontSize<8||o.fontSize>400))throw new Error('文字データが不正です。');
      }
      doc={version:2,width:data.width,height:data.height,name:typeof data.name==='string'?data.name.slice(0,200):'プロジェクト',backgroundColor:data.backgroundColor==='#ffffff'?'#ffffff':null,objects:data.objects};selectedId=null;selection=null;gesture=null;history=[];historyUI=[];historyIndex=-1;setTool('move');commit(false);dirty=false;closeDialog($('#new-dialog'));openEditor();toast('プロジェクトを読み込みました。');
    }catch(err){toast(err instanceof SyntaxError?'JSONファイルを読み込めませんでした。保存した .paint.json を選んでください。':err.message);}
    finally{$('#project-input').value='';}
  }
  async function openSample() {
    if(doc&&dirty&&!confirm('現在の編集を閉じて、サンプルを開きますか？'))return;
    try{
      const img=await ensureImage(SAMPLE_IMAGE);newDocument(1000,720,false,'sample');
      const c=makeCanvas(img.width,img.height);c.getContext('2d').drawImage(img,0,0);
      const photo=rasterFromCanvas(c,'サンプル写真',{x:145,y:105,w:650,h:482});addObject(photo);
      const text=base('text',{name:'かわいい！',text:'かわいい！',fontSize:54,x:660,y:54,color:'#ff4e79',rotation:-10});measureText(text);addObject(text);
      addObject(base('arrow',{name:'注釈の矢印',x:670,y:172,w:128,h:72,flipX:true,flipY:false,color:'#ff4e79',stroke:7}));
      addObject(base('ellipse',{name:'ここに注目',x:409,y:248,w:220,h:211,color:'#ff4e79',stroke:6,filled:false}));
      selectedId=photo.id;history=[];historyUI=[];historyIndex=-1;commit(false);dirty=false;openEditor();
    }catch(err){toast(err.message);}
  }

  const infoPages={
    how:`<span class="dialog-eyebrow">HOW TO USE</span><h2 id="info-title">3ステップで、伝わる一枚に。</h2><div class="instruction-step"><span>1</span><div><h3>まずは画像を開く</h3><p>画像をドロップするか、クリップボードから貼り付けます。「新規作成」なら白いキャンバスから始められます。</p></div></div><div class="instruction-step"><span>2</span><div><h3>選んで、動かして、書き込む</h3><p>選択ツールで画像の一部分を囲み、内側をドラッグして移動。ペン・文字・円・矢印で注釈を加えられます。</p></div></div><div class="instruction-step"><span>3</span><div><h3>できあがったら保存</h3><p>PNG / JPEG / WebPで画像を保存。続きから編集する場合は「プロジェクト保存」でレイヤーを含めて保存します。</p></div></div><button class="solid-button full-width dialog-cta" data-info-start>さっそく始める ${SVG('arrow')}</button>`,
    faq:`<span class="dialog-eyebrow">QUESTIONS & ANSWERS</span><h2 id="info-title">よくある質問</h2><details open><summary>画像はサーバーに送られますか？</summary><p>いいえ。読み込み・描画・保存はすべてお使いのブラウザ内で行います。このアプリには画像をアップロードする処理やアクセス解析を組み込んでいません。</p></details><details><summary>インストールやアカウント登録は必要ですか？</summary><p>必要ありません。HTMLを開くだけで使えます。インターネットに接続せずに基本編集も利用できます。</p></details><details><summary>貼り付けがうまくできません。</summary><p>画像をコピーした後、このページ上で Ctrl + V（Macは ⌘ + V）を押してください。貼り付けボタンはブラウザの権限設定やHTTPS接続状況により使えないことがあります。ファイル選択やドロップでも読み込めます。</p></details><details><summary>どんなファイルを読み込めますか？</summary><p>PNG / JPEG / WebP / GIF / BMPに対応しています。GIFは静止画として扱います。画像を勝手に縮小せず、キャンバスより大きい場合は原寸で収まるようにキャンバスを拡張します。各辺16,384px・合計16,777,216画素、1ファイル50 MBを上限とし、超える場合は読み込み前に案内します。</p></details><details><summary>文字や矢印はあとから変更できますか？</summary><p>移動ツールかレイヤー一覧で対象を選び、プロパティから色やサイズ・回転を変更できます。文字はダブルクリックで編集できます。切り取った部分は画像になりますが、元の文字・図形はマスクで処理し、編集情報を維持します。</p></details><details><summary>編集内容は自動保存されますか？</summary><p>このバージョンでは自動保存しません。終了前に画像、または編集を続けるためのプロジェクトを保存してください。プロジェクトは「新規作成」→「保存したプロジェクトを開く」で再開できます。</p></details><details><summary>ホームのプレビューと実際の編集画面は同じですか？</summary><p>ホームの小さなプレビューは、ご提供いただいたデザイン画像から切り出した完成イメージです。クリックすると、操作できる基本編集版が開きます。自動背景除去や生成AIなどは搭載していません。</p></details>`,
    paste:`<span class="dialog-eyebrow">PASTE AN IMAGE</span><h2 id="info-title">キーボードから貼り付け</h2><p>ブラウザからクリップボードを直接読み取れませんでした。画像をコピーして、このウィンドウを閉じてから <kbd>Ctrl</kbd> + <kbd>V</kbd>（Macは <kbd>⌘</kbd> + <kbd>V</kbd>）を押してください。</p><p>ブラウザの権限設定によっては貼り付けボタンが使えない場合があります。「画像を開く」やドラッグ＆ドロップも利用できます。</p><button class="solid-button full-width dialog-cta" data-close>閉じて貼り付ける</button>`,
    editor:`<span class="dialog-eyebrow">QUICK GUIDE</span><h2 id="info-title">編集の使い方</h2><p><strong>画像の一部を動かす：</strong>「選択」または「自由選択」で囲み、内側をドラッグします。標準ではレイヤーの選択状態に関係なく、見えている範囲全体を切り離して移動します。Ctrl / ⌘ + X で切り取り、V で貼り付けできます。</p><p><strong>文字や図形を直す：</strong>移動ツールで選択し、四隅をドラッグするか、右側の色・サイズ・回転を調整します。文字はダブルクリックでも編集できます。</p><table class="key-table"><tbody><tr><td>元に戻す / やり直す</td><td>Ctrl / ⌘ + Z ／ Y または Shift + Z</td></tr><tr><td>コピー / 切り取り / 貼り付け</td><td>Ctrl / ⌘ + C / X / V</td></tr><tr><td>複製 / 全体を選択</td><td>Ctrl / ⌘ + D / A</td></tr><tr><td>画像保存 / プロジェクト保存</td><td>Ctrl / ⌘ + S / Shift + S</td></tr><tr><td>選択解除 / 削除</td><td>Escape / Delete</td></tr><tr><td>移動 / 選択 / 自由選択</td><td>V / M / L</td></tr><tr><td>ペン / ブラシ / 消しゴム</td><td>P / B / E</td></tr><tr><td>四角形 / 円 / 矢印 / 文字</td><td>R / O / A / T</td></tr><tr><td>キャンバスを選択範囲で切り抜く</td><td>Ctrl / ⌘ + Shift + X ／ 切り抜きツールで Enter</td></tr><tr><td>選択した部分を1px / 10px移動</td><td>矢印 / Shift + 矢印</td></tr></tbody></table><p class="fine-print">選択対象は標準で「見えている画像全体」です。右側で「選択中のレイヤーのみ」にも変更できます。切り取りや消しゴムで消した場所は、白背景では白、透明背景では透明になります。元に戻す履歴は最大30手、使用メモリに応じて調整します。PCブラウザでの操作を推奨します。</p>`
  };
  const featureInfo={
    clipboard:['クリップボードから、すぐ編集。','画像をコピーしたら Ctrl + V（Macは ⌘ + V）。スクリーンショットやコピーした画像を直接開けます。貼り付けボタンにはブラウザの許可が必要な場合があります。'],
    selection:['好きなかたちに、選んで。','「選択」で四角く囲むか、「自由選択」で輪郭を描くように囲みます。標準では、現在見えている画像全体が編集対象です。右側でレイヤーのみの選択にも変更できます。'],
    move:['切って、動かして、もう一枚。','選択した範囲の内側をドラッグして移動できます。「コピー」「切り取り」「複製」も使えます。元の文字や図形の編集情報は維持され、切り取った部分は画像として動かせます。'],
    annotation:['ここ！を、わかりやすく。','ペン、ブラシ、円、四角形、矢印、文字が使えます。色や線の太さ、透明度を変えて、伝えたい場所をマークしてください。文字や図形は後から移動・編集できます。'],
    layers:['重ねる順番も、思いのまま。','画像・描画・文字・図形をレイヤーとして管理します。前面・背面への並び替え、表示の切り替え、ロックに対応。最大120レイヤーまで扱えます。'],
    history:['間違えても、だいじょうぶ。','Ctrl + Z（Macは ⌘ + Z）で元に戻し、Shift を加えるとやり直せます。履歴は最大30手。大きな画像を扱う場合は、使用メモリに応じて履歴数を減らします。'],
    export:['できあがりを、好きな形式で。','PNGを標準に、JPEG・WebPでも保存できます。PNG / WebPは透明背景に対応。JPEGでは透明な部分が白になります。形式によってはブラウザの対応状況によりPNGで保存します。'],
    project:['今日はここまで。また続きから。','「プロジェクト保存」で画像やレイヤー、文字・図形を .paint.json ファイルに保存。「新規作成」から保存したプロジェクトを読み込めます。自動保存ではないため、終了前に保存してください。']
  };
  function showInfo(page) {$('#info-content').innerHTML=infoPages[page]||infoPages.how;showDialog($('#info-dialog'));}
  function showFeature(key){const f=featureInfo[key];if(!f)return;$('#info-content').innerHTML=`<span class="dialog-eyebrow">FEATURES</span><h2 id="info-title">${f[0]}</h2><p>${f[1]}</p><button class="solid-button full-width dialog-cta" data-info-sample>サンプルで試してみる ${SVG('arrow')}</button>`;showDialog($('#info-dialog'));}

  document.addEventListener('click',e=>{
    const close=e.target.closest('[data-close]');if(close){closeDialog(close.closest('dialog'));return;}
    const info=e.target.closest('[data-info]');if(info){showInfo(info.dataset.info);return;}
    const feature=e.target.closest('[data-feature]');if(feature){showFeature(feature.dataset.feature);return;}
    if(e.target.closest('[data-info-start]')){closeDialog($('#info-dialog'));showDialog($('#new-dialog'));return;}
    if(e.target.closest('[data-info-sample]')){closeDialog($('#info-dialog'));openSample();return;}
    const action=e.target.closest('[data-action]');if(action){
      if(action.dataset.action==='new')showDialog($('#new-dialog'));
      else if(action.dataset.action==='open')$('#image-input').click();
      else if(action.dataset.action==='paste')pasteFromClipboard();
      else if(action.dataset.action==='open-project')$('#project-input').click();
    }
  });
  $$('.small-dialog,.info-dialog').forEach(dialog=>dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}));
  $('#new-form').addEventListener('submit',e=>{
    e.preventDefault();const w=Math.round(Number($('#new-width').value)),h=Math.round(Number($('#new-height').value));
    if(!validDimensions(w,h)){toast(dimensionError().message);return;}
    if(doc&&dirty&&!confirm('新しいキャンバスを作成しますか？ 現在の未保存の編集は失われます。'))return;
    closeDialog($('#new-dialog'));newDocument(w,h,$('#transparent-bg').checked);dirty=false;
  });
  $$('[data-size]').forEach(b=>b.addEventListener('click',()=>{const [w,h]=b.dataset.size.split(',');$('#new-width').value=w;$('#new-height').value=h;$$('[data-size]').forEach(el=>el.classList.toggle('active',el===b));}));
  $('#image-input').addEventListener('change',e=>importFiles(e.target.files));
  $('#project-input').addEventListener('change',e=>loadProject(e.target.files[0]));
  $('#dropzone').addEventListener('click',()=>$('#image-input').click());
  let dragDepth=0;
  document.addEventListener('dragenter',e=>{if([...e.dataTransfer.types].includes('Files')){e.preventDefault();dragDepth++;$('#dropzone').classList.add('drag-over');}});
  document.addEventListener('dragover',e=>{if([...e.dataTransfer.types].includes('Files')){e.preventDefault();e.dataTransfer.dropEffect='copy';}});
  document.addEventListener('dragleave',e=>{dragDepth=Math.max(0,dragDepth-1);if(!dragDepth)$('#dropzone').classList.remove('drag-over');});
  document.addEventListener('drop',e=>{e.preventDefault();dragDepth=0;$('#dropzone').classList.remove('drag-over');if(e.dataTransfer.files.length)importFiles(e.dataTransfer.files);});
  function isTyping(el){
    if(!el)return false;
    if(el.isContentEditable||el.closest?.('[contenteditable]:not([contenteditable="false"])'))return true;
    if(el.matches?.('textarea'))return true;
    return Boolean(el.matches?.('input')&&['text','search','email','url','tel','password','number'].includes(el.type));
  }
  document.addEventListener('paste',e=>{
    if(isTyping(e.target))return;
    const top=$$('dialog[open]').at(-1);
    if(top&&top!==editor&&top!==$('#info-dialog'))return;
    clearTimeout(pasteTimer);++pasteSequence;
    const files=[...(e.clipboardData?.items||[])].filter(item=>item.kind==='file'&&item.type.startsWith('image/')).map(item=>item.getAsFile()).filter(Boolean);
    if(!files.length)files.push(...[...(e.clipboardData?.files||[])].filter(f=>f.type.startsWith('image/')));
    if(files.length){e.preventDefault();closeDialog($('#info-dialog'));importFiles(files);}
    else if(editor.open&&internalClipboard&&(
      e.clipboardData?.getData('text/x-browser-paint')===internalClipboard.token ||
      e.clipboardData?.getData('text/html').includes(`data-browser-paint="${internalClipboard.token}"`) ||
      !internalClipboard.systemSynced&&!internalClipboard.eventMarkerWritten
    )){e.preventDefault();pasteInternal();}
    else if(editor.open)toast('画像をコピーしてから貼り付けてください。文字の貼り付けは文字入力欄で行えます。');
  });
  for(const name of ['copy','cut'])document.addEventListener(name,e=>{
    if(isTyping(e.target)||!canEditNow())return;
    e.preventDefault();
    if(keyboardCopyToken&&internalClipboard?.token===keyboardCopyToken){
      writeClipboardMarker(e,internalClipboard);keyboardCopyToken=null;return;
    }
    copySelection(name==='cut',e);
  });
  function nudgeSelection(key,step) {
    if(selection){
      const piece=selectionPiece();if(!piece||!canRemovePiece(piece,true))return;
      rememberHistoryUI();removeRegion(piece,true);setTool('move');
    }else rememberHistoryUI();
    const o=active();if(!o||o.locked)return;
    if(key==='ArrowLeft')o.x-=step;if(key==='ArrowRight')o.x+=step;
    if(key==='ArrowUp')o.y-=step;if(key==='ArrowDown')o.y+=step;
    commit();
  }
  document.addEventListener('keydown',e=>{
    if(e.isComposing||e.keyCode===229||e.altKey||isTyping(e.target))return;
    const key=e.key.toLowerCase(),mod=e.ctrlKey||e.metaKey;
    if(!editor.open||$$('dialog[open]').at(-1)!==editor)return;
    if(ioBusy){if(mod||['Delete','Backspace','Enter','Escape'].includes(e.key))e.preventDefault();return;}
    if(mod){
      if(key==='z'){e.preventDefault();historyMove(e.shiftKey?1:-1);}
      else if(key==='y'){e.preventDefault();historyMove(1);}
      else if(key==='s'){e.preventDefault();if(gesture)endPointer();e.shiftKey?saveProject():openExport();}
      else if(key==='c'||key==='x'){
        if(e.repeat){e.preventDefault();return;}
        if(key==='x'&&e.shiftKey){e.preventDefault();applyCrop();return;}
        // Mutate synchronously: rapid X -> Z / V must not race a timer. The
        // following native event only writes the marker, never cuts twice.
        const previousToken=internalClipboard?.token;
        copySelection(key==='x');
        if(internalClipboard?.token!==previousToken){
          const token=keyboardCopyToken=internalClipboard.token;
          setTimeout(()=>{if(keyboardCopyToken===token)keyboardCopyToken=null;},0);
        }else e.preventDefault();
      }
      else if(key==='v'){
        if(e.repeat){e.preventDefault();return;}
        if(internalClipboard&&!internalClipboard.systemSynced&&!internalClipboard.eventMarkerWritten){e.preventDefault();pasteInternal();}
        else{
          clearTimeout(pasteTimer);const seq=++pasteSequence;
          pasteTimer=setTimeout(()=>{if(seq===pasteSequence)pasteFromClipboard(seq);},220);
        }
      }
      else if(key==='d'){e.preventDefault();duplicateSelection();}
      else if(key==='a'){e.preventDefault();if(gesture)endPointer();setTool('select');selection={kind:'rect',x:0,y:0,w:doc.width,h:doc.height};renderOverlay();}
      else if(key==='o'){e.preventDefault();$('#image-input').click();}
      else if(key==='+'||key==='='){e.preventDefault();setZoom(zoom*1.2);}
      else if(key==='-'){e.preventDefault();setZoom(zoom/1.2);}
      else if(key==='0'){e.preventDefault();setZoom(1);}
      return;
    }
    if(e.key==='Escape'){
      e.preventDefault();e.stopPropagation();
      if(!cancelGesture()){selection=null;selectedId=null;refreshUI();renderOverlay();}
      return;
    }
    if(e.key==='Delete'||e.key==='Backspace'){e.preventDefault();deleteSelection();return;}
    if(e.key==='Enter'){
      e.preventDefault();if(gesture)endPointer();
      if(tool==='crop'&&selection)applyCrop();else{selection=null;selectedId=null;refreshUI();renderOverlay();}
      return;
    }
    const shortcuts={v:'move',m:'select',l:'lasso',p:'pen',b:'brush',e:'eraser',f:'fill',r:'rect',o:'ellipse',a:'arrow',t:'text',c:'crop'};
    if(shortcuts[key]){e.preventDefault();if(gesture)endPointer();setTool(shortcuts[key]);return;}
    if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();nudgeSelection(e.key,e.shiftKey?10:1);}
  });

  $('#try-sample').addEventListener('click',openSample);
  $('#editor-close').addEventListener('click',()=>editor.close());$('#editor-home').addEventListener('click',()=>editor.close());
  editor.addEventListener('close',()=>{document.body.style.overflow='';document.body.appendChild($('#toast'));resumeButton.hidden=!doc;});
  resumeButton.addEventListener('click',openEditor);
  editor.addEventListener('cancel',e=>{e.preventDefault();if(!cancelGesture()){selection=null;selectedId=null;refreshUI();renderOverlay();}});
  $('#undo').addEventListener('click',()=>historyMove(-1));$('#redo').addEventListener('click',()=>historyMove(1));
  $('#copy-selection').addEventListener('click',()=>copySelection());$('#cut-selection').addEventListener('click',()=>copySelection(true));$('#duplicate').addEventListener('click',duplicateSelection);
  $('#delete-selection').addEventListener('click',()=>deleteSelection());$('#layer-delete').addEventListener('click',()=>deleteSelection(true));
  $('#save-project').addEventListener('click',saveProject);$('#export-open').addEventListener('click',openExport);$('#export-form').addEventListener('submit',exportImage);
  $('#apply-crop').addEventListener('click',applyCrop);
  $('#crop-selection').addEventListener('click',()=>{if(selection)applyCrop();else setTool('crop');});
  $('#selection-scope').addEventListener('change',e=>{selectionScope=e.target.value;focusCanvas();renderOverlay();});
  $('#canvas-background').addEventListener('change',e=>{if(!doc)return;rememberHistoryUI();doc.backgroundColor=e.target.value==='white'?'#ffffff':null;commit();focusCanvas();});
  $('#zoom-in').addEventListener('click',()=>setZoom(zoom*1.2));$('#zoom-out').addEventListener('click',()=>setZoom(zoom/1.2));$('#zoom-reset').addEventListener('click',()=>setZoom(1));$('#zoom-fit').addEventListener('click',fitCanvas);
  $('#toggle-grid').addEventListener('click',()=>{grid=!grid;$('#toggle-grid').setAttribute('aria-pressed',String(grid));renderOverlay();});
  $('#canvas-area').addEventListener('wheel',e=>{if(e.ctrlKey||e.metaKey){e.preventDefault();setZoom(zoom*(e.deltaY<0?1.08:1/1.08));}},{passive:false});
  $$('.tool').forEach(b=>b.addEventListener('click',()=>setTool(b.dataset.tool)));
  $('#add-layer').addEventListener('click',()=>{if(!doc)return;const c=makeCanvas(doc.width,doc.height);if(addObject(rasterFromCanvas(c,'透明レイヤー')))commit();});
  function reorder(delta){const o=active();if(!o)return;if(o.locked){toast('ロックを解除してから並び替えてください。');return;}const i=doc.objects.indexOf(o),to=i+delta;if(to<0||to>=doc.objects.length)return;[doc.objects[i],doc.objects[to]]=[doc.objects[to],doc.objects[i]];commit();}
  $('#layer-up').addEventListener('click',()=>reorder(1));$('#layer-down').addEventListener('click',()=>reorder(-1));
  function changeColor(value,save=true){color=value;const o=active();if(o&&!o.locked&&o.type!=='raster'&&(tool==='move'||(tool==='text'&&o.type==='text')))o.color=color;$('#paint-color').value=color;$$('.swatches button').forEach(b=>b.classList.toggle('active',b.dataset.color===color));if(doc){if(save)commit();else render();}}
  $('#paint-color').addEventListener('input',e=>changeColor(e.target.value,false));$('#paint-color').addEventListener('change',()=>{if(doc)commit();});
  $$('[data-color]').forEach(b=>b.addEventListener('click',()=>changeColor(b.dataset.color)));
  $('#stroke-size').addEventListener('input',e=>{stroke=Number(e.target.value);$('#stroke-output').value=`${stroke} px`;const o=active();if(o&&!o.locked&&o.type!=='raster'&&o.type!=='text'&&tool==='move'){o.stroke=stroke;render();}});
  $('#stroke-size').addEventListener('change',()=>{if(doc)commit();});
  $('#shape-filled').addEventListener('change',e=>{shapeFilled=e.target.checked;const o=active();if(o&&!o.locked&&['rect','ellipse'].includes(o.type)&&tool==='move'){o.filled=shapeFilled;commit();}});
  $('#item-opacity').addEventListener('input',e=>{nextOpacity=Number(e.target.value)/100;$('#opacity-output').value=`${e.target.value}%`;const o=active();if(o&&!o.locked){o.opacity=nextOpacity;render();}});
  $('#item-opacity').addEventListener('change',()=>{if(doc)commit();});
  $('#item-rotation').addEventListener('input',e=>{const o=active();if(o&&!o.locked){o.rotation=Number(e.target.value);$('#rotation-output').value=`${e.target.value}°`;render();}});
  $('#item-rotation').addEventListener('change',()=>{if(doc)commit();});
  ['width','height'].forEach(key=>$('#item-'+key).addEventListener('change',e=>{const o=active(),v=Number(e.target.value);if(o&&!o.locked&&Number.isFinite(v)&&v>=1&&v<=MAX_DIMENSION){o[key==='width'?'w':'h']=v;commit();}else syncProperties();}));
  $('#text-content').addEventListener('input',e=>{const o=active();if(o?.type==='text'&&!o.locked){o.text=e.target.value.slice(0,10000);o.name=o.text.split('\n')[0].slice(0,20)||'文字';measureText(o);render();}});
  $('#text-content').addEventListener('change',()=>{if(active()?.type==='text')commit();});
  $('#font-size').addEventListener('input',e=>{const o=active();if(o?.type==='text'&&!o.locked){o.fontSize=clamp(Number(e.target.value)||48,8,400);measureText(o);render();}});
  $('#font-size').addEventListener('change',()=>{if(active()?.type==='text')commit();});


  window.addEventListener('resize',()=>{if(editor.open){cancelAnimationFrame(fitFrame);fitFrame=requestAnimationFrame(fitCanvas);}});
  window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue='';}});
})();
