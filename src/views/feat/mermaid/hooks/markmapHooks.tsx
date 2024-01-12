import React, { useEffect, useRef } from "react";
import { Transformer } from "markmap-lib";
import { Markmap } from "markmap-view";

const MarkmapHooks = ({ markmap }: any) => {
  const refSvg = useRef<any>(null);
  const refMm = useRef<any>(null);
  const transFormer = new Transformer();

  useEffect(() => {
    const mm = Markmap.create(refSvg.current);
    refMm.current = mm;
    return () => {
      mm.destroy();
    };
  }, []);

  useEffect(() => {
    const mm = refMm.current;
    const { root } = transFormer.transform(markmap);
    mm.setData(root);
    mm.fit();
  }, [markmap]);

  return (
    <>
      <svg style={{ width: "100%", minHeight: 400 }} ref={refSvg} />
    </>
  );
};

export default MarkmapHooks;
