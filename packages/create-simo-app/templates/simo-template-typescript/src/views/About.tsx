/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";

export default function About() {
  return (
    <h3>
      {/* @ts-ignore */}
      <a target="_blank" href={DOC_URL}>
        @chrissong/simo-cli
      </a>
      ：统一项目初始化、本地开发和打包一体化的脚手架工具。
    </h3>
  );
}
