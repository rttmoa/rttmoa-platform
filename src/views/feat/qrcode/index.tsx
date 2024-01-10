import { Button, Card, Input, Space } from "antd";
import React, { useState } from "react";
import QRCode from "qrcode";

// ! node-qrcode: https://github.com/soldair/node-qrcode?tab=readme-ov-file#qr-code-options
const QrCode = () => {
  const [url, setUrl] = useState("");
  const [qr, setQr] = useState("");
  const GenerateQRCode = () => {
    QRCode.toDataURL(
      url,
      {
        width: 800,
        margin: 2,
        color: {}
      },
      (err: any, urls: string) => {
        console.log(urls);
        if (err) return console.error(err);
        setQr(urls);
      }
    );
  };
  const RandomGenerateQRCode = () => {
    QRCode.toDataURL(
      Math.random().toString().substring(3) + "点击随机生成文本信息",
      {
        width: 800,
        margin: 5,
        color: {}
      },
      (err: any, urls: string) => {
        console.log(urls);
        if (err) return console.error(err);
        setQr(urls);
      }
    );
  };
  return (
    <>
      <Card>
        <h2>QR Generator</h2>
        <Space>
          <Input
            placeholder="https://google.com"
            value={url}
            onChange={e => {
              setUrl(e.target.value);
            }}
          />
          <Button onClick={GenerateQRCode}>Generate</Button>
          <Button onClick={RandomGenerateQRCode}>Random Generate</Button>
        </Space>
        <section>
          {qr && (
            <Space>
              <img src={qr} alt="QRCode" width={300} />
              <Button type="link" href={qr} download={`${+new Date()}.png`}>
                DownLoad
              </Button>
            </Space>
          )}
        </section>
      </Card>
    </>
  );
};

export default QrCode;
