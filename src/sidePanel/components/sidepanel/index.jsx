/*
 * @Author: = dengyy
 * @Date: 2024-08-12 10:37:21
 * @LastEditors: = 2906177060@qq.com
 * @LastEditTime: 2024-08-19 17:27:15
 * @FilePath: \first-extension-project\src\sidePanel\components\sidepanel\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* global chrome */
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';


export default function SidePanel() {
  useEffect(() => {
    // dealMessage();
  }, []);

  const [prefixUrl, setPrefixUrl] = useState("");
  const [backData, setBackData] = useState("");
  // const [count, setCount] = useState(0);

  const dealMessage = async () => {
    let prefixUrl = chrome.i18n.getMessage('PREFIX_URL');
    setPrefixUrl(prefixUrl);

    // 向background页面发送消息
    console.log("向background发送消息sidePanelGetData");
    const backData = await chrome.runtime.sendMessage({
      action: 'sidePanelGetData',
      data: {},
    });
    setBackData(backData);
  };

  const getStreet = () => {
    console.log("点击按钮");

    const api = '/api/common/getStreetList';
    // 发送 POST 请求
    axios.post(`${prefixUrl}${api}`, {}, {
      headers: { "Api-Token": "jjhlamceawfbcnckml" },
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // const increment = () => {
  //   setCount(count+1)
  // }
  // const incrementAsync = () => {
  //   setCount(count+1)
  // }

    // 使用 useSelector 从 store 中获取数据
    const count = useSelector((state) => state.count);
    // const count = 1;

    // 使用 useDispatch 获取 dispatch 函数
    const dispatch = useDispatch();
  

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Grid container spacing={0} sx={{
        padding: 0,
        margin: 0,
        width: "100vw",
      }}>
        <Box sx={{
          display: "inline-block",
          width: `calc(100% - 50px - 1%)`,
          marginBottom: "1%",
          marginTop: "1%",
          marginLeft: "1%",
        }}>
          <h1>
            This is a test page
          </h1>
          <Box>
            <button onClick={getStreet}>
              发送请求
            </button>
            <p>
              {prefixUrl}
            </p>
            <p>
              {backData}
            </p>
          </Box>
          <Box>
            <p>
              The count is { count }
            </p>
            {/* <button onClick={ count + 1 }>+1</button>
            <button onClick={ count + 2 }>Async+2</button> */}
            {/* <button onClick={ increment(1) }>+1</button>
            <button onClick={ incrementAsync(2) }>Async+2</button> */}
            <button onClick={ dispatch.count.increment(1) }>+1</button>
            <button onClick={ dispatch.count.incrementAsync(2) }>Async+2</button>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}
