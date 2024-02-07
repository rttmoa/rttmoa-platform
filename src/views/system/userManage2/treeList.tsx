import { Tree } from "antd";
import React, { useState } from "react";
const { TreeNode } = Tree;

export default function TreeList({ trees, curDeptCode, onSelect }: any) {
  // console.log(trees, curDeptCode, onSelect);
  const [defaultExpandedKeys, setdefaultExpandedKeys] = useState(["370202230001"]);
  const [deptCode, setdeptCode] = useState(curDeptCode);
  const [expandedKeys, setexpandedKeys] = useState([]);

  const handleOnSelect = (info: any, Nodes: any) => {
    console.log("infooooo", info, Nodes);
    const { selectedNodes = [] } = Nodes;
    const [{ key, title, children }] = selectedNodes;
    if (title) {
      onSelect && onSelect(info, title);
    } else {
      onSelect && onSelect();
    }
  };

  const loop = (data = []) =>
    data.map((item: any) => {
      if (item.children && item.children.length) {
        return (
          <TreeNode key={item.deptCode} title={item.deptName}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.deptCode} title={item.deptName} />;
    });
  const treeNodes = loop(trees);

  return (
    <div>
      <Tree
        onSelect={handleOnSelect} // 点击树节点触发(点击而不是展开)
        onExpand={(expandedKeys: any) => {
          setexpandedKeys(expandedKeys);
        }} // 展开/收起节点时触发
        defaultExpandedKeys={defaultExpandedKeys} // 默认展开指定的树节点
        selectedKeys={[deptCode]} // 选中复选框的树节点
      >
        {treeNodes}
      </Tree>
    </div>
  );
}
