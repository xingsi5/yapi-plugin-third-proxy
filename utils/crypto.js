var Crypto = require('crypto-js')
module.exports = {
  enCryptoByDes:function(params){
      // 第一步字符串化
    let key = Crypto.enc.Utf8.parse('L5IRTNDW')
    let iv = Crypto.enc.Hex.parse('0102030405060708')
    let paramsStr = typeof params === 'string'?params: JSON.stringify(params)
    paramsStr = Crypto.enc.Utf8.parse(paramsStr)
    paramsStr = Crypto.DES.encrypt(paramsStr, key, {
      iv
    })
    return  paramsStr.toString()
  },
  deCryptoByDes(str){
    let key = Crypto.enc.Utf8.parse('L5IRTNDW')
    let iv = Crypto.enc.Hex.parse('0102030405060708')
    str = Crypto.DES.encrypt(str, key, {
      iv
    })
    return str.toString()
  }
}