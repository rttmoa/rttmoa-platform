import "./index.less";
import { useEffect, useState } from "react";
import { Divider, Typography, Tag, BackTop, Radio, Space } from "antd";
import clsx from "clsx";

const List: React.FC = () => {
  const { Title, Paragraph, Text } = Typography;
  const [radioValue, setRadioValue] = useState<string>("red"); // 单选框的值
  const [conStacker1, setconStacker1] = useState<any>({});
  const [conStacker2, setconStacker2] = useState<any>({});
  const [conStacker3, setconStacker3] = useState<any>({});
  const [conStacker4, setconStacker4] = useState<any>({});
  const [conStacker5, setconStacker5] = useState<any>({});
  const [conStacker6, setconStacker6] = useState<any>({});
  const [conStacker7, setconStacker7] = useState<any>({});
  const [conStacker8, setconStacker8] = useState<any>({});
  const [signObj, setSignObj] = useState<any>({});
  useEffect(() => {
    // const loc_1054 = document.getElementsByClassName("loc_1054");
    // console.log(loc_1054);
    // loc_1053[0].innerHTML = "222"
    // loc_1054[0]['style'].backgroundColor = "green"

    // const globalSign = [{}, {}, {} ....] // ! 获取全部PLC信号
    setInterval(() => {
      console.log("循环获取PLC数据");
      fetch("http://10.13.31.10:1880/getData")
        .then(res => {
          return res.json();
        })
        .then(docs => {
          // console.log(docs)
          if (docs && docs.message == "成功") {
            setSignObj(docs.results as any);
            setconStacker1(docs.conStacker1);
            setconStacker2(docs.conStacker2);
            setconStacker3(docs.conStacker3);
            setconStacker4(docs.conStacker4);
            setconStacker5(docs.conStacker5);
            setconStacker6(docs.conStacker6);
            setconStacker7(docs.conStacker7);
            setconStacker8(docs.conStacker8);
          }
        });
    }, 3500);
  }, []);
  // console.log(signObj)
  // console.log(conStacker1)
  // console.log(conStacker2)
  // console.log(signObj.sendIsPallet1060)
  return (
    <div className="app">
      <div className="card">
        {/* 标题及标签部分 */}
        <Title level={2}>仓储控制出入库管理实时查看</Title>
        <Paragraph style={{ marginLeft: 30 }}>
          <Tag color="red" className="tag">
            环穿
          </Tag>
          <Tag color="cyan" className="tag">
            输送机
          </Tag>
          <Tag color="cyan" className="tag">
            堆垛机
          </Tag>
        </Paragraph>

        {/* ---------- TODO: 每一个描述内容的盒子 ----------------------------------- */}
        <div className="content">
          <div className="str">
            {conStacker1 && (
              <div
                className={clsx(
                  conStacker1.getStatus === 0
                    ? "stackerGreen"
                    : conStacker1.getStatus === 1
                    ? "stackerRed"
                    : conStacker1.getStatus === 2
                    ? "stackerYellow"
                    : undefined,
                  "stacker1"
                )}
              ></div>
            )}
            {conStacker2 && (
              <div
                className={clsx(
                  conStacker2.getStatus === 0
                    ? "stackerGreen"
                    : conStacker2.getStatus === 1
                    ? "stackerRed"
                    : conStacker2.getStatus === 2
                    ? "stackerYellow"
                    : undefined,
                  "stacker2"
                )}
              ></div>
            )}
            {conStacker3 && (
              <div
                className={clsx(
                  conStacker3.getStatus === 0
                    ? "stackerGreen"
                    : conStacker3.getStatus === 1
                    ? "stackerRed"
                    : conStacker3.getStatus === 2
                    ? "stackerYellow"
                    : undefined,
                  "stacker3"
                )}
              ></div>
            )}
            {conStacker4 && (
              <div
                className={clsx(
                  conStacker4.getStatus === 0
                    ? "stackerGreen"
                    : conStacker4.getStatus === 1
                    ? "stackerRed"
                    : conStacker4.getStatus === 2
                    ? "stackerYellow"
                    : undefined,
                  "stacker4"
                )}
              ></div>
            )}
            {conStacker5 && (
              <div
                className={clsx(
                  conStacker5.getStatus === 0
                    ? "stackerGreen"
                    : conStacker5.getStatus === 1
                    ? "stackerRed"
                    : conStacker5.getStatus === 2
                    ? "stackerYellow"
                    : undefined,
                  "stacker5"
                )}
              ></div>
            )}
            {conStacker6 && (
              <div
                className={clsx(
                  conStacker6.getStatus === 0
                    ? "stackerGreen"
                    : conStacker6.getStatus === 1
                    ? "stackerRed"
                    : conStacker6.getStatus === 2
                    ? "stackerYellow"
                    : undefined,
                  "stacker6"
                )}
              ></div>
            )}
            {conStacker7 && (
              <div
                className={clsx(
                  conStacker7.getStatus === 0
                    ? "stackerGreen"
                    : conStacker7.getStatus === 1
                    ? "stackerRed"
                    : conStacker7.getStatus === 2
                    ? "stackerYellow"
                    : undefined,
                  "stacker7"
                )}
              ></div>
            )}
            {conStacker8 && (
              <div
                className={clsx(
                  conStacker8.getStatus === 0
                    ? "stackerGreen"
                    : conStacker8.getStatus === 1
                    ? "stackerRed"
                    : conStacker8.getStatus === 2
                    ? "stackerYellow"
                    : undefined,
                  "stacker8"
                )}
              ></div>
            )}
          </div>
          {/* TODO: 左侧输送线 */}
          <div>
            <div className="small loc_1056">1056</div>
            <div className="small loc_1055">1055</div>
            <div className="small loc_1054">1054</div>
            <div className="small loc_1057">1057</div>
            <div className="small loc_1058">1058</div>
            <div className="small loc_1059">1059</div>
            <div
              className="small loc_1060"
              style={signObj && signObj.sendIsPallet1060 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1060
            </div>
          </div>
          <div>
            <div
              className="small loc_1061"
              style={signObj && signObj.getIsPallet1061 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1061
            </div>
            <div
              className="small loc_1067"
              style={signObj && signObj.getIsPallet1067 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1067
            </div>
          </div>
          <div>
            <div
              className="small loc_1068"
              style={signObj && signObj.sendIsPallet1068 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1068
            </div>
            <div
              className="small loc_1079"
              style={signObj && signObj.getIsPallet1079 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1079
            </div>
          </div>
          {/* TODO: 中间输送线 */}
          <div>
            <div
              className="middle loc_1051"
              style={signObj && signObj.sendIsPallet1051 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1051
            </div>
            <div
              className="middle loc_1050"
              style={signObj && signObj.getIsPallet1050 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1050
            </div>
            <div
              className="middle loc_1047"
              style={signObj && signObj.sendIsPallet1047 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1047
            </div>
            <div
              className="middle loc_1046"
              style={signObj && signObj.getIsPallet1046 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1046
            </div>
            <div
              className="middle loc_1043"
              style={signObj && signObj.sendIsPallet1043 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1043
            </div>
            <div
              className="middle loc_1042"
              style={signObj && signObj.getIsPallet1042 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1042
            </div>
            <div
              className="middle loc_1039"
              style={signObj && signObj.sendIsPallet1039 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1039
            </div>
            <div
              className="middle loc_1038"
              style={signObj && signObj.getIsPallet1038 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1038
            </div>

            <div
              className="middle loc_1035"
              style={signObj && signObj.sendIsPallet1035 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1035
            </div>
            <div
              className="middle loc_1034"
              style={signObj && signObj.getIsPallet1034 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1034
            </div>
            <div
              className="middle loc_1031"
              style={signObj && signObj.sendIsPallet1031 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1031
            </div>
            <div
              className="middle loc_1030"
              style={signObj && signObj.getIsPallet1030 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1030
            </div>
            <div
              className="middle loc_1027"
              style={signObj && signObj.sendIsPallet1027 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1027
            </div>
            <div
              className="middle loc_1026"
              style={signObj && signObj.getIsPallet1026 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1026
            </div>
            <div
              className="middle loc_1023"
              style={signObj && signObj.sendIsPallet1023 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1023
            </div>
            <div
              className="middle loc_1022"
              style={signObj && signObj.getIsPallet1022 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1022
            </div>

            <div
              className="middle loc_1052"
              style={signObj && signObj.getIsPallet1052 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1052
            </div>
            <div
              className="middle loc_1049"
              style={signObj && signObj.sendIsPallet1049 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1049
            </div>
            <div
              className="middle loc_1048"
              style={signObj && signObj.getIsPallet1048 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1048
            </div>
            <div
              className="middle loc_1045"
              style={signObj && signObj.sendIsPallet1045 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1045
            </div>
            <div
              className="middle loc_1044"
              style={signObj && signObj.getIsPallet1044 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1044
            </div>
            <div
              className="middle loc_1041"
              style={signObj && signObj.sendIsPallet1041 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1041
            </div>
            <div
              className="middle loc_1040"
              style={signObj && signObj.getIsPallet1040 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1040
            </div>
            <div
              className="middle loc_1037"
              style={signObj && signObj.sendIsPallet1037 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1037
            </div>

            <div
              className="middle loc_1036"
              style={signObj && signObj.getIsPallet1036 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1036
            </div>
            <div
              className="middle loc_1033"
              style={signObj && signObj.sendIsPallet1033 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1033
            </div>
            <div
              className="middle loc_1032"
              style={signObj && signObj.getIsPallet1032 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1032
            </div>
            <div
              className="middle loc_1029"
              style={signObj && signObj.sendIsPallet1029 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1029
            </div>
            <div
              className="middle loc_1028"
              style={signObj && signObj.getIsPallet1028 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1028
            </div>
            <div
              className="middle loc_1025"
              style={signObj && signObj.sendIsPallet1025 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1025
            </div>
            <div
              className="middle loc_1024"
              style={signObj && signObj.getIsPallet1024 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1024
            </div>
            <div
              className="middle loc_1021"
              style={signObj && signObj.sendIsPallet1021 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1021
            </div>
          </div>
          {/* TODO: 右侧输送线 */}
          <div>
            <div
              className="small loc_1001"
              style={signObj && signObj.sendIsPallet1001 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1001
            </div>
            <div
              className="small loc_1002"
              style={signObj && signObj.getIsPallet1002 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1002
            </div>
            <div
              className="small loc_1003"
              style={signObj && signObj.sendIsPallet1003 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1003
            </div>
            <div
              className="small loc_1004"
              style={signObj && signObj.getIsPallet1004 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1004
            </div>
            <div
              className="small loc_1005"
              style={signObj && signObj.sendIsPallet1005 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1005
            </div>
            <div
              className="small loc_1006"
              style={signObj && signObj.getIsPallet1006 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1006
            </div>
            <div
              className="small loc_1008"
              style={signObj && signObj.getIsPallet1002 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1008
            </div>
            <div
              className="small loc_1007"
              style={signObj && signObj.sendIsPallet1007 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1007
            </div>
            <div
              className="small loc_1010"
              style={signObj && signObj.getIsPallet1010 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1010
            </div>
            <div
              className="small loc_1009"
              style={signObj && signObj.sendIsPallet1009 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1009
            </div>

            <div
              className="small loc_1011"
              style={signObj && signObj.sendIsPallet1011 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1011
            </div>
            <div
              className="small loc_1012"
              style={signObj && signObj.getIsPallet1012 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1012
            </div>
            <div
              className="small loc_1016"
              style={signObj && signObj.getIsPallet1016 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1016
            </div>
            <div
              className="small loc_1015"
              style={signObj && signObj.sendIsPallet1015 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1015
            </div>

            <div
              className="middle loc_1017"
              style={signObj && signObj.sendIsPallet1017 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1017
            </div>
            <div
              className="small loc_1018"
              style={signObj && signObj.getIsPallet1018 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1018
            </div>
            <div
              className="small loc_1019"
              style={signObj && signObj.sendIsPallet1019 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1019
            </div>
            <div
              className="small loc_1020"
              style={signObj && signObj.getIsPallet1020 === 1 ? { backgroundColor: "red" } : undefined}
            >
              1020
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
