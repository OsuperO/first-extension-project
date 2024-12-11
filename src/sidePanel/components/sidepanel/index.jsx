/*
 * @Author: = dengyy
 * @Date: 2024-08-12 10:37:21
 * @LastEditors: = 2906177060@qq.com
 * @LastEditTime: 2024-08-20 10:35:49
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
    dealMessage();
  }, []);

  const [prefixUrl, setPrefixUrl] = useState("");
  const [backData, setBackData] = useState("");

  // 接收消息
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.todo) {
      case 'UPDATE_SIDEPANEL':
        // 在面板中更新数据
        console.log("【Message received in sidePanel】更新数据", message.data);
        // 可选：发送响应
        sendResponse({ status: 'success' });
        break;
      case "found_target_page":
        console.log("【Message received in sidePanel】发现页面:", message.data);
        break;
      default:
        break;
    }
});


  const dealMessage = async () => {
    let prefixUrl = chrome.i18n.getMessage('PREFIX_URL');
    setPrefixUrl(prefixUrl);

    // 向background页面发送消息
    const backData = await chrome.runtime.sendMessage({
      todo: 'sidePanelGetData',
      data: "hello, I'm sidePanel",
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

  const { count } = useSelector(state => state.counterModel);
  const dispatch = useDispatch();

  const increment = () => {
    dispatch.counterModel.increment(1);
  };
  const incrementAsync = () => {
    dispatch.counterModel.incrementAsync(2);
  };

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
            <p>The count is { count }</p>
            <button onClick = { increment }> + 1 </button>
            <button onClick = { incrementAsync }> Async + 2</button>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}
