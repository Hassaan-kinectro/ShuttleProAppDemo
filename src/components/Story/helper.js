import {DemoUser, Demo2, Demo1} from '../../utils/imagesPath';
import {convertImageTobase64} from '../../utils/urlParser';
export const statusData = [
  {
    id: 1,
    img: DemoUser,
    text: 'this is status text 1',
    date: '22 Feb 2018 | 02:18 PM',
    name: 'workspace 1',
    statusData: [
      {
        id: 1,
        img: DemoUser,
        text: 'this is status text 1',
      },
      {
        id: 2,
        img: Demo1,
        text: 'this is status text 2',
      },
    ],
  },
  {
    id: 2,
    img: DemoUser,
    text: 'this is status text 1',
    date: '22 Feb 2018 | 02:18 PM',
    name: 'workspace 2',
    statusData: [
      {
        id: 1,
        img: Demo2,
        text: 'this is status text 1',
      },
      {
        id: 2,
        img: Demo1,
        text: 'this is status text 2',
      },
    ],
  },
  {
    id: 3,
    img: DemoUser,
    text: 'this is status text 1',
    date: '22 Feb 2018 | 02:18 PM',
    name: 'workspace 3',
    statusData: [
      {
        id: 1,
        img: Demo2,
        text: 'this is status text 1',
      },
      {
        id: 2,
        img: Demo1,
        text: 'this is status text 2',
      },
    ],
  },
  {
    id: 4,
    img: DemoUser,
    text: 'this is status text 1',
    date: '22 Feb 2018 | 02:18 PM',
    name: 'workspace 3',
    statusData: [
      {
        id: 1,
        img: Demo2,
        text: 'this is status text 1',
      },
      {
        id: 2,
        img: Demo1,
        text: 'this is status text 2',
      },
    ],
  },
  {
    id: 5,
    img: DemoUser,
    text: 'this is status text 1',
    date: '22 Feb 2018 | 02:18 PM',
    name: 'workspace 3',
    statusData: [
      {
        id: 1,
        img: Demo2,
        text: 'this is status text 1',
      },
      {
        id: 2,
        img: Demo1,
        text: 'this is status text 2',
      },
    ],
  },
  {
    id: 6,
    img: DemoUser,
    text: 'this is status text 1',
    date: '22 Feb 2018 | 02:18 PM',
    name: 'workspace 3',
    statusData: [
      {
        id: 1,
        img: Demo2,
        text: 'this is status text 1',
      },
      {
        id: 2,
        img: Demo1,
        text: 'this is status text 2',
      },
    ],
  },
  {
    id: 7,
    img: DemoUser,
    text: 'this is status text 1',
    date: '22 Feb 2018 | 02:18 PM',
    name: 'workspace 3',
    statusData: [
      {
        id: 1,
        img: Demo2,
        text: 'this is status text 1',
      },
      {
        id: 2,
        img: Demo1,
        text: 'this is status text 2',
      },
    ],
  },
];
let base64Images;
export const handleConvert = async imageUrl => {
  base64Images = [];
  for (const image of imageUrl) {
    const base64 = await convertImageTobase64(image);
    base64Images.push(base64);
  }
  return base64Images;
};
