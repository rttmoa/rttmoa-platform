/* eslint-disable prettier/prettier */
import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { aseParamZH, privateKeyEN, publicKeyEN, reaParamZH } from "./cryptoStr";
import CryptoJS, { AES, enc } from "crypto-js";
import JSEncrypt from "jsencrypt";

// crypto-js是谷歌开发的加密算法类库: https://blog.csdn.net/qq_45859826/article/details/124790850
// 规则：公钥加密，私钥解密，这是规则！
// JSEncrypt 加密解密：https://www.ab62.cn/article/23609.html
const Crypto = () => {
  const [aesData, setAesData] = useState(""); // AES 明文
  const [aesKey, setAesKey] = useState(""); // AES Key
  const [aesEncryptData, setAesEncryptData] = useState(""); // AES 密文
  const [aesDecryptData, setAesDecryptData] = useState(""); // AES 解密

  const [reaData, setReaData] = useState("");
  const [reaEncryptData, setReaEncryptData] = useState("");
  const [reaDecryptData, setReaDecryptData] = useState("");

  useEffect(() => {
    function handleAES() {
      setAesKey(CryptoJS.lib.WordArray.random(32).toString()); // cbad2a954fc5849ce05aa23a92c9474bbd90104d3ffa7b19b26c94a1ba472c23
      // const aseParameter = CryptoJS.lib.WordArray.random(80000 / 4).toString()
      const aesEncrypt = AES.encrypt(aseParamZH, aesKey).toString();
      setAesData(aseParamZH);
      setAesEncryptData(aesEncrypt);
      const aesDecrypted = AES.decrypt(aesEncrypt, aesKey).toString(enc.Utf8);
      setAesDecryptData(aesDecrypted);
    }
    handleAES();
    function handleREA() {
      const encrypt = new JSEncrypt();
      encrypt.setPrivateKey(publicKeyEN);
      const reaEncrypt = encrypt.encrypt(reaParamZH) as string;
      setReaData(reaParamZH); // set REA加密明文
      setReaEncryptData(reaEncrypt); // set REA加密密文
      const decrypt = new JSEncrypt();
      decrypt.setPrivateKey(privateKeyEN);
      const uncrypted = decrypt.decrypt(reaEncrypt) as string;
      setReaDecryptData(uncrypted);
    }
    handleREA();
  }, []);
  return (
    <>
      <Card>
        <section style={{ wordBreak: "break-all" }}>
          <h4>
            <b>AES加密明文：</b>
            <span>{aesData}</span>
          </h4>
          <h4>
            <b>AES加密密钥：</b>
            <span>{aesKey}</span>
          </h4>
          <h4>
            <b>AES加密密文：</b>
            {aesEncryptData}
          </h4>
          <h4>
            <b>AES解密文件：</b>
            {aesDecryptData}
          </h4>
          <hr />
          <br />
          <h4>
            <b>REA加密明文：</b>
            {reaData}
          </h4>
          <h4>
            <b>REA加密密文：</b>
            {reaEncryptData}
          </h4>
          <h4>
            <b>REA解密文件：</b>
            {reaDecryptData}
          </h4>
        </section>
      </Card>
    </>
  );
};

export default Crypto;
