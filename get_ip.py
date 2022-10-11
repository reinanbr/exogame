import requests as rq

def getIpInfo(ip):
    try:
        ipInfo = rq.get(f'https://ipapi.co/{ip}/json/')
        ipInfo = ipInfo.json()
        res = {'city':ipInfo['city'],}
    except:
        pass
        return False
    