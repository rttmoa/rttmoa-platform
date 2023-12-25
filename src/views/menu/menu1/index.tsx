/* eslint-disable no-multiple-empty-lines */
/* eslint-disable prettier/prettier */
import { Card } from "antd";
import * as Utils from '@/utils'
import * as Is from "@/utils/is";



const Menu1: React.FC = () => {

  // console.log(Utils.getTimeState()); 
  // console.log(Utils.randomNum(0, 5)); // [0, 5)
  // console.log(Utils.setStyleProperty("--hooks-colorBgSider", "red"));
  // console.log(Utils.convertToSixDigitHexColor("#1f1f1f"||"#fff"));
  // console.log(Utils.getBrowserLang()); // zh
  console.log(Utils);
  console.log(Is);

  // 测试 Utils
  return (
    <Card title="我是Menu 1"></Card>
  );
};

export default Menu1;
