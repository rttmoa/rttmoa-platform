/* eslint-disable prettier/prettier */
import { Card, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { ContainerStyled, MasonicStyled, HeaderStyled, CardStyled } from "./styled";
import { useWindowScroll } from "react-use";
import { Masonry } from "masonic";
import catName from "cat-names";
import cats from "./cat";

let id = 0;
let randomChoice = (CATs: any[]) => CATs[Math.floor(Math.random() * CATs.length)];
const CatDetail: React.FC = () => {
  const cardRef = useRef<any>(null);
  const [item, setItem] = useState(() => {
    // 构建网格项的数据
    return Array.from(Array(100), () => ({
      id: id++,
      name: catName.random(),
      src: randomChoice(cats)
    }));
  });
  useEffect(() => {
    window.addEventListener(
      "scroll",
      function () {
        // console.log(cardRef.current?.scrollTop);
      },
      true
    );
  }, []);

  console.log(cardRef.current?.scrollTop);
  return (
    <>
      <Card className="mb10" style={{}} ref={cardRef}>
        <Header />
        <ContainerStyled>
          <MasonicStyled>
            <Masonry items={item} columnGutter={8} columnWidth={172} overscanBy={5} render={FakeCard} />
          </MasonicStyled>
        </ContainerStyled>
      </Card>
    </>
  );
};

function Header() {
  const { x, y } = useWindowScroll();
  useEffect(() => {
    window.addEventListener("scroll", function () {
      console.log("1111");
    });
  }, []);
  return (
    <HeaderStyled minify={"false"}>
      <span role="img" aria-hidden="true">
        🧱
      </span>
      MASONIC
    </HeaderStyled>
  );
}

function FakeCard({ data: { id, name, src } }: any) {
  return (
    <CardStyled>
      <img src={src} alt="失败" style={{}} />
      <span children={name} />
    </CardStyled>
  );
}

export default CatDetail;
