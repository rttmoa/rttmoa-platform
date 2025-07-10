import https from 'https'
import qs from 'querystring'

// 验证码：其中num是要生成随机数的个数，min,max一般是0和9
export const createRandom = (num: number) => {
    // 丢弃小数部分,保留整数部分
    return parseInt(String(Math.random() * 1000000))
}

var EARTH_RADIUS = 6378.137 //地球半径  
//将用角度表示的角转换为近似相等的用弧度表示的角 java Math.toRadians  
function rad (d: number) {
    return d * Math.PI / 180.0
}
// 计算两个经纬度距离差值
/** 
 * 个坐标点的距离 
 * @param lng1  经度1 
 * @param lat1  纬度1 
 * @param lng2  经度2 
 * @param lat2  纬度2 
 * @return 距离（米） 
 */
export const getDistance = (lng1: any, lat1: any, lng2: any, lat2: any) => {
    var radLat1 = rad(lat1)
    var radLat2 = rad(lat2)
    var a = radLat1 - radLat2
    var b = rad(lng1) - rad(lng2)
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
        + Math.cos(radLat1) * Math.cos(radLat2)
        * Math.pow(Math.sin(b / 2), 2)))
    s = s * EARTH_RADIUS
    // s = Math.round(s * 10000) / 10000; // 千米
    s = Math.round(s * 10000) / 10 // 米
    return s
}

// 获取百度ai 的 access_token
export const getBaiDuAiAccessToken = async function () {
    // console.log(base64img);
    const param = qs.stringify({
        'grant_type': 'client_credentials',
        'client_id': '7qTvj7o33RaoQsa4dw5UBZh7',
        'client_secret': 'DtyDUoRgvyACaBDWjnw9bK83ypUmDwVi'
    })

    return new Promise((resolve, reject) => {
        // 获得token
        https.get(
            {
                hostname: 'aip.baidubce.com',
                path: '/oauth/2.0/token?' + param,
                agent: false
            },
            function (res) {
                // console.log(typeof chunk);
                // 在标准输出中查看运行结果
                // res.pipe(process.stdout);
                res.on('data', (chunk) => {
                    try {
                        let resobj = JSON.parse(chunk.toString('utf-8'))
                        resolve(resobj.access_token)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
        )
    })
}

// 识别图片是否是人脸
// access_token: 百度ai接口的access_token   
export const checkImage = async function (access_token: string, base64Image: any, imageType: any) {
    const postData = qs.stringify({
        'image': base64Image,
        'image_type': imageType
    })

    return new Promise((resolve, reject) => {
        let req = https.request(
            {
                host: 'aip.baidubce.com',
                path: '/rest/2.0/face/v3/detect?access_token=' + access_token,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData)
                }
            },
            function (res) {
                // console.log(typeof chunk);
                // 在标准输出中查看运行结果
                // res.pipe(process.stdout);
                res.on('data', (chunk) => {
                    try {
                        let resobj = JSON.parse(chunk.toString('utf-8'))
                        // console.log(resobj)
                        // 如果不是人脸，则返回：参考：https://ai.baidu.com/docs#/Face-Detect-V3/b7203cd6
                        /**
                         * 失败：
                         *  "error_code": 222202,
                            "error_msg": "pic not has face",
                            "log_id": 744193232085663500,
                            "timestamp": 1573208566,
                            "cached": 0,
                            "result": null

                            成功：
                            "error_code": 0,
                            "error_msg": "SUCCESS",
                         */
                        if (resobj && resobj.error_code == 222202) {
                            resolve(false) //不是人脸
                        }
                        else if (resobj && resobj.error_code == 0) {
                            resolve(true)  // 是人脸
                        } else {
                            resolve('人脸识别异常')
                        }

                    } catch (e) {
                        reject(e.message)
                    }
                })
            }
        )

        req.write(postData)
        req.end()

    })
}