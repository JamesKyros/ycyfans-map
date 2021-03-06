import * as React from 'react';
import EchartsReact from 'echarts-for-react';
// import echarts from 'echarts';

import './index.scss';

require('echarts-wordcloud');


// 热词云图
class HotWords extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      option: {},
    };
  }

  componentDidMount() {
    const data = [];
    this.getOtionTem(data);
  }

  componentWillUnmount() {

  }

  getOtionTem = () => {
    const str1 = 'data:image/jpeg;base64,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';
    const str2 = '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';
    const str3 = 'FVPjLbLb1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8ArgAHHb62DgbxxPSiacbVLVP7nJiPtfy1+cfl4Ox7uVmuICn2r6TnaHqV3T9Qx6rGTan61NXdx5xPjE+azm8tl6dvHTfU5NPqsq3H93yqaearc+U+dPnHybd6ylsRVVm13Dt/UNs6rc07UrPoXafrUVxPNNynwqpnxj/qWyS9QaoUAAAAAAAAAAAAAAAAAAAAAAAO4AEmdnPZjd1+q3q2s26rWl0zzbtd1WT/AEo9viONa/AYPZ92cZO7L1ObmessaNRVzNcdKr8x92j2edSxlmxaxrFuxZt027VumKaKKKeKaYjuiI8jWmYr54ODi6bhWcPCx6MfHs0+jbtW44imGR3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMgA0m59raduzSasHULfdPpWr1PSu1V/FH6x4t2svEBU3dW1NS2jqs4efRE0Vc1Wb9EfUvU+ce3zjwWe1/b+nbl0q5p+pWIuWqutNUdK7dXhVTPhLaXrHtgKiul3lsvUdnal6jJibuJcmfo+VTH1bkeU+VUeMN0l7EVzQogAAAAAAAAAAAAAAPYjnuAH55jxniPNNPZv2Wcep1zceP9bpXj4VyO7yrrj8qfmM9a/gMLs47La8/1Wt7hsTRifax8OunibvlVXHhT5R4+5OfHBrTgV5TRTRTFFNNNNMRERFMcREeXD0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYOsaPg69pd3TtRx6b2Ndj61M98T4TE+Ex5s4nr4Aq9vnYuds3UPrTVf027VP0fK47/5avKqPx8Fl9R03D1fAvYOfj0X8a9Ho10Vx0n+kx5tZrrKXgKduz37sDK2dmeut+lkaVer4s5HjRP8ABX5T5T4t3OddRXGHHDoQAAAAAAH6t0VXLlNuiiquuqYppppjmapnuiIAHkRNUxERMzM8cRHMp+7NuzGnQotaxrVuK9Uqj0rViesY8ec+df5DPWhWJ2b9ltOm+p1zcFmmrM6V4+JXHMWf5qo8avKPD3pajnz6mtOEU8OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfDNwsXUcO7h5tm3exrtPo127kcxVD7gCtXaD2eZO0curLxKa7+j3a/3d3vmzM/cr/SfFY/LxMfOxLuLlWqL1i7TNNy3XHMVR5S1zrrIFN/F3naF2d5G0suczCpuX9HuVfUrmOZsT4UV/pPj727nOuorg30x7F3KyLeNj2qrt65VFFFuiOZqme6Ih0dQeWbVy/eos2bdVy7XMU0UURzNUz3RELDdnPZpZ2xbp1LVKaL2r109I76caJjrEedXnPyGVvRXz7N+zS3tyKNV1aii5q9UfUonrTjRPl51ec+HdCSfn8TV65A6eAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPlkYtjNxb2Pk2qbti5TNNduuOaaomO6YABwWx9l6Lomua3l41iqu9jZk4+PVdq9L1VHoxP1fb1457+B1aAkEcgPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/2Q==';
    const data = {
      value: [{
        name: '哈哈农夫',
        value: 89,
      },
      {
        name: '杨超越锦鲤',
        value: 168,
      },
      {
        name: '超越被亲',
        value: 77,
      },
      {
        name: '火箭101',
        value: 101,
      },
      {
        name: 'Helllo ycy',
        value: 121,
      },
      {
        name: '腾讯课堂',
        value: 140,
      },
      {
        name: '二师兄',
        value: 99,
      },
      {
        name: '折丝',
        value: 98,
      },
      {
        name: '超越知乎',
        value: 78,
      },
      {
        name: '超越后援会',
        value: 89,
      },
      {
        name: '超越广州演唱会',
        value: 156,
      },
      {
        name: '杨超越锦鲤',
        value: 121,
      },
      {
        name: '月芽',
        value: 133,
      },
      {
        name: '程序员设计大赛',
        value: 168,
      },
      {
        name: '杨超越世界杯抽签',
        value: 114,
      },
      {
        name: '杨超越微博',
        value: 88,
      },
      {
        name: '杨超越身高',
        value: 54,
      },
      {
        name: '杨超越体重',
        value: 56,
      },
      {
        name: '国际篮联男篮篮球世界杯',
        value: 101,
      },
      {
        name: '粉丝大数据地图可视化',
        value: 111,
      },
      {
        name: '超粉联盟',
        value: 131,
      },
      {
        name: '杨超越',
        value: 666,
      },
      ],
      // heart
      image: str1 + str2 + str3,
    };
    const maskImg = new Image();
    maskImg.src = data.image;
    const option = {
      // grid: {
      //   left: '16%',
      //   right: '4%',
      //   bottom: '8%',
      //   top: '20%',
      //   height: '60%',
      //   containLabel: true,
      // },
      tooltip: {
        show: false,
      },
      series: [{
        type: 'wordCloud',
        gridSize: 1,
        sizeRange: [12, 55],
        rotationRange: [-45, 0, 45, 90],
        maskImage: maskImg,
        textStyle: {
          normal: {
            color() {
              return `rgb(${
                Math.round(Math.random() * 255)
              }, ${Math.round(Math.random() * 255)
              }, ${Math.round(Math.random() * 255)})`;
            },
          },
        },
        left: 'center',
        top: '25%',
        right: null,
        bottom: null,
        width: '70%',
        height: '80%',
        data: data.value,
      }],
    };
    this.setState({
      option,
    });
  }

  render() {
    const { option } = this.state;
    if (Object.keys(option).length === 0) {
      return <div />;
    }
    return (
      <div className="hot-words">
        <div className="hot-words-title">热词云图展示</div>
        <EchartsReact option={option} style={{ height: '90%', width: '100%' }} />
      </div>
    );
  }
}

export default HotWords;
