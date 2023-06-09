//https://promotion.waimai.meituan.com/lottery/limitcouponcomponent/getTime

const timeminus = 15
const timeminusmil = timeminus*1000
const path1 = "/lottery/limitcouponcomponent/getTime"
const path2 = "/lottery/limitcouponcomponent/info"
if ($request.url.indexOf(path1) != -1) {
    let obj = JSON.parse($response.body)
    obj.data = obj.data + timeminusmil
    $notify(`已提前${timeminus}秒`)
    $done({
        body: JSON.stringify(obj)
    });
}

if ($request.url.indexOf(path2) != -1) {
    let obj = JSON.parse($response.body)
    if (obj.data.hasOwnProperty("couponInfo")) {
        console.log("美团 couponinfo start-------------")
        let keys = Object.keys(obj.data.couponInfo);
        let firstKey = keys[0];
        obj.data.couponInfo[firstKey].couponStartTime = obj.data.couponInfo[firstKey].couponStartTime-timeminus;
        obj.data.ts = obj.data.ts +  timeminus
        console.log("美团 couponinfo done-------------")
        $done({
            body: JSON.stringify(obj)
        });
    } else {
        $done({
            body: JSON.stringify($response.body)
        });
    }
}


$done({
        body: JSON.stringify($response.body)
    });
