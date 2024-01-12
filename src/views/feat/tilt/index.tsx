import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
// import Tilt from "react-parallax-tilt";

const Tilt = () => {
  return (
    <>
      <Card>
        <h3>
          参考Demo：
          <Link target="_blank" to={"https://mkosir.github.io/react-parallax-tilt"}>
            react-parallax-tilt
          </Link>
        </h3>
        {/* <section>
          <h3>Welcome to react tilt!</h3>
          <section style={{ width: 200, height: 200 }}>
            <Tilt tiltMaxAngleX={40} tiltMaxAngleY={40} perspective={1000} scale={1.1} glareEnable={true}>
              <img src={TestPng} alt="wkylin.w" width="200" height="200" />
            </Tilt>
          </section>
        </section> */}
      </Card>
    </>
  );
};

export default Tilt;
