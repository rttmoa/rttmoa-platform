/* eslint-disable no-multiple-empty-lines */
/* eslint-disable prettier/prettier */
import React from "react";

import * as uts from "@/utils/is";
import { randomHex } from "@/utils/common";

export default function Utils() {
  console.log("========  Utils IS ========");
  // console.log(uts.isFunction(() => {}), uts.isFunction(123));
  // console.log(uts.isDef(undefined), uts.isDef(null));
  // console.log(uts.isUnDef(undefined), uts.isUnDef(null));
  // console.log(uts.isObject({}), uts.isObject(null));
  // console.log(
  //   // uts.isPromise( Promise.resolve(1) )
  //   uts.isElement( document.createElement("a") )
  // );
  // console.log(!!document.createElement("a").tagName)
  console.log(randomHex());

  return (
    <>
      <b>Utils</b>
    </>
  );
}
