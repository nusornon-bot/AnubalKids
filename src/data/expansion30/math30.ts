import { Question } from '../../types';

export const EXPANSION_30_MATH: Question[] = [
  {
    "id": "exp30-math-k1-01",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "นับจำนวนแอปเปิ้ลสีแดงในภาพ: 🍎 🍎 🍎 มีกี่ผลเอ่ย?",
      "en": "Count the red apples: 🍎 🍎 🍎 How many are there?",
      "zh": "数一数图中的红苹果：🍎 🍎 🍎 一共有几个？"
    },
    "illustration": "🍎 🍎 🍎",
    "illustrationSubtitle": {
      "th": "นับผลไม้แสนอร่อย",
      "en": "Count delicious apples",
      "zh": "数一数好吃的红苹果"
    },
    "options": [
      {
        "id": "opt-3",
        "label": {
          "th": "3 ผล (สาม)",
          "en": "3 apples",
          "zh": "3 个 (三个)"
        },
        "icon": "3️⃣"
      },
      {
        "id": "opt-2",
        "label": {
          "th": "2 ผล (สอง)",
          "en": "2 apples",
          "zh": "2 个"
        },
        "icon": "2️⃣"
      },
      {
        "id": "opt-5",
        "label": {
          "th": "5 ผล (ห้า)",
          "en": "5 apples",
          "zh": "5 个"
        },
        "icon": "5️⃣"
      }
    ],
    "correctOptionId": "opt-3",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! 1, 2, 3 มีแอปเปิ้ลทั้งหมด 3 ผลจ้ะ",
      "en": "Correct! 1, 2, 3 - there are 3 red apples!",
      "zh": "完全正确！一、二、三，一共有 3 个红苹果！"
    }
  },
  {
    "id": "exp30-math-k1-02",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "รูปทรงเรขาคณิตรูปใดมีลักษณะกลมมนไม่มีเหลี่ยม? \"⭕\"",
      "en": "Which shape is perfectly round with no corners? \"⭕\"",
      "zh": "哪一种几何图形是圆溜溜、没有任何尖角的？“⭕”"
    },
    "illustration": "⭕ ⚽ 🍩 ✨",
    "illustrationSubtitle": {
      "th": "รูปทรงกลมมนรอบตัว",
      "en": "Round circle shape",
      "zh": "寻找圆形物品"
    },
    "options": [
      {
        "id": "opt-triangle",
        "label": {
          "th": "รูปสามเหลี่ยม",
          "en": "Triangle",
          "zh": "三角形"
        },
        "icon": "🔺"
      },
      {
        "id": "opt-circle",
        "label": {
          "th": "รูปวงกลม (Circle)",
          "en": "Circle",
          "zh": "圆形 (Circle)"
        },
        "icon": "⭕"
      },
      {
        "id": "opt-square",
        "label": {
          "th": "รูปสี่เหลี่ยม",
          "en": "Square",
          "zh": "正方形"
        },
        "icon": "🟩"
      }
    ],
    "correctOptionId": "opt-circle",
    "explanation": {
      "th": "เก่งมากจ้ะ! วงกลม เหมือนลูกบอลหรือโดนัท ไม่มีมุมแหลมเลยจ้ะ",
      "en": "Great job! A circle is round with zero sharp corners!",
      "zh": "太棒了！圆形像甜甜圈和足球一样圆滚滚，没有棱角！"
    }
  },
  {
    "id": "exp30-math-k1-03",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "สัตว์ตัวใดมีขนาด \"ใหญ่ที่สุด\"? 🐘 🐁 🐜",
      "en": "Which animal is the BIGGEST? 🐘 🐁 🐜",
      "zh": "哪一只小动物的体型是“最大的”？🐘 🐁 🐜"
    },
    "illustration": "🐘 〰️ 🐁 〰️ 🐜",
    "illustrationSubtitle": {
      "th": "เปรียบเทียบขนาด ใหญ่ - เล็ก",
      "en": "Compare big and small sizes",
      "zh": "对比动物体型大小"
    },
    "options": [
      {
        "id": "opt-mouse",
        "label": {
          "th": "หนูตัวเล็ก",
          "en": "Mouse",
          "zh": "小老鼠"
        },
        "icon": "🐁"
      },
      {
        "id": "opt-ant",
        "label": {
          "th": "มดตัวจิ๋ว",
          "en": "Ant",
          "zh": "小蚂蚁"
        },
        "icon": "🐜"
      },
      {
        "id": "opt-elephant",
        "label": {
          "th": "ช้างตัวใหญ่",
          "en": "Elephant (Biggest)",
          "zh": "大象（最大）"
        },
        "icon": "🐘"
      }
    ],
    "correctOptionId": "opt-elephant",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ช้างตัวโตที่สุด เมื่อเทียบกับหนูและมดจ้ะ",
      "en": "Awesome! The elephant is much bigger than the mouse and ant!",
      "zh": "太棒了！大象比起老鼠和蚂蚁庞大得多！"
    }
  },
  {
    "id": "exp30-math-k1-04",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "เปรียบเทียบความยาว: ไม้บรรทัด 📏 กับ ดินสอสั้น ✏️ สิ่งใด \"ยาวกว่า\"?",
      "en": "Which item is LONGER: Ruler 📏 or short pencil ✏️?",
      "zh": "比一比长度：长尺子 📏 和 短铅笔 ✏️，哪一个更长？"
    },
    "illustration": "📏 -------------------\n✏️ ------",
    "illustrationSubtitle": {
      "th": "เปรียบเทียบความยาว สั้น-ยาว",
      "en": "Compare long vs short",
      "zh": "长短概念对比"
    },
    "options": [
      {
        "id": "opt-ruler",
        "label": {
          "th": "ไม้บรรทัด (ยาวกว่า)",
          "en": "Ruler (Longer)",
          "zh": "尺子（更长）"
        },
        "icon": "📏"
      },
      {
        "id": "opt-pencil",
        "label": {
          "th": "ดินสอสั้น",
          "en": "Pencil",
          "zh": "短铅笔"
        },
        "icon": "✏️"
      },
      {
        "id": "opt-equal",
        "label": {
          "th": "ยาวเท่ากันพอดี",
          "en": "Same length",
          "zh": "一样长"
        },
        "icon": "🤝"
      }
    ],
    "correctOptionId": "opt-ruler",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! ไม้บรรทัดมีความยาวมากกว่าดินสอแท่งสั้นจ้ะ",
      "en": "Correct! The ruler is longer than the pencil!",
      "zh": "回答正确！长长的直尺比削短的铅笔更长！"
    }
  },
  {
    "id": "exp30-math-k1-05",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "มือข้างหนึ่งของหนู มีนิ้วมือทั้งหมด \"กี่นิ้ว\" เอ่ย? 🖐️",
      "en": "How many fingers are on one of your hands? 🖐️",
      "zh": "小朋友的一只小手上面一共有几根手指头？🖐️"
    },
    "illustration": "🖐️ (1, 2, 3, 4, 5)",
    "illustrationSubtitle": {
      "th": "นับนิ้วมือของเรา",
      "en": "Count fingers on one hand",
      "zh": "数数小手的手指"
    },
    "options": [
      {
        "id": "opt-3",
        "label": {
          "th": "3 นิ้ว",
          "en": "3 fingers",
          "zh": "3 根"
        },
        "icon": "3️⃣"
      },
      {
        "id": "opt-5",
        "label": {
          "th": "5 นิ้ว (ห้านิ้ว)",
          "en": "5 fingers",
          "zh": "5 根 (五根手指)"
        },
        "icon": "🖐️"
      },
      {
        "id": "opt-10",
        "label": {
          "th": "10 นิ้ว (สองข้าง)",
          "en": "10 fingers",
          "zh": "10 根"
        },
        "icon": "🔟"
      }
    ],
    "correctOptionId": "opt-5",
    "explanation": {
      "th": "เก่งมากจ้ะ! โป้ง ชี้ กลาง นาง ก้อย มือข้างหนึ่งมี 5 นิ้วจ้ะ",
      "en": "Great job! One hand has 5 fingers!",
      "zh": "真棒！大拇指食指中指无名指小指，一只手有 5 根手指！"
    }
  },
  {
    "id": "exp30-math-k1-06",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "ชิ้นพิซซ่านี้ 🍕 มีลักษณะคล้ายรูปทรงเรขาคณิตใด?",
      "en": "Which geometric shape looks like a slice of pizza? 🍕",
      "zh": "一块香喷喷的切片披萨 🍕 最像哪种几何图形？"
    },
    "illustration": "🍕 🔺 📐",
    "illustrationSubtitle": {
      "th": "รูปทรงสามเหลี่ยม 3 มุม",
      "en": "Triangle shape 3 corners",
      "zh": "三角形的 3 个尖角"
    },
    "options": [
      {
        "id": "opt-circle",
        "label": {
          "th": "รูปวงกลม",
          "en": "Circle",
          "zh": "圆形"
        },
        "icon": "⭕"
      },
      {
        "id": "opt-square",
        "label": {
          "th": "รูปสี่เหลี่ยม",
          "en": "Square",
          "zh": "正方形"
        },
        "icon": "🟦"
      },
      {
        "id": "opt-triangle",
        "label": {
          "th": "รูปสามเหลี่ยม",
          "en": "Triangle",
          "zh": "三角形 (Triangle)"
        },
        "icon": "🔺"
      }
    ],
    "correctOptionId": "opt-triangle",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! พิซซ่า 1 ชิ้นมี 3 ด้าน 3 มุม เป็นรูปสามเหลี่ยมจ้ะ",
      "en": "Correct! A pizza slice has 3 sides and 3 points, like a triangle!",
      "zh": "回答完全正确！切开的一角披萨有三个角，是三角形！"
    }
  },
  {
    "id": "exp30-math-k1-07",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "เปรียบเทียบจำนวน: ลูกโป่งสีฟ้า 🎈 🎈 กับ ลูกโป่งสีแดง 🎈 ฝั่งไหนมี \"มากกว่า\"?",
      "en": "Compare count: 2 Blue balloons 🎈🎈 vs 1 Red balloon 🎈. Which has MORE?",
      "zh": "比一比数量：2个蓝气球 🎈🎈 和 1个红气球 🎈，哪一边“更多”？"
    },
    "illustration": "🎈 🎈 (2)  VS  🎈 (1)",
    "illustrationSubtitle": {
      "th": "เปรียบเทียบ มากกว่า - น้อยกว่า",
      "en": "More vs fewer comparison",
      "zh": "多少比较认知"
    },
    "options": [
      {
        "id": "opt-blue-2",
        "label": {
          "th": "ลูกโป่ง 2 ลูก (มากกว่า)",
          "en": "2 balloons (More)",
          "zh": "2个气球的一边（更多）"
        },
        "icon": "🎈"
      },
      {
        "id": "opt-red-1",
        "label": {
          "th": "ลูกโป่ง 1 ลูก",
          "en": "1 balloon",
          "zh": "1个气球的一边"
        },
        "icon": "🎈"
      },
      {
        "id": "opt-equal",
        "label": {
          "th": "เท่ากันเลย",
          "en": "They are equal",
          "zh": "一样多"
        },
        "icon": "⚖️"
      }
    ],
    "correctOptionId": "opt-blue-2",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! 2 ย่อมมากกว่า 1 เสมอนะคร้าบ",
      "en": "Awesome! 2 is greater than 1!",
      "zh": "太棒了！2个气球显然比1个气球更多！"
    }
  },
  {
    "id": "exp30-math-k1-08",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "สิ่งใดมีลักษณะเป็น \"คู่\" ที่เวลาใช้งานต้องใส่พร้อมกัน 2 ข้าง?",
      "en": "Which item comes in a PAIR worn on both sides?",
      "zh": "哪一件生活物品是成双成对、必须两只一起穿戴的？"
    },
    "illustration": "👟 👟 🧦 🧦 ✨",
    "illustrationSubtitle": {
      "th": "การจับคู่สิ่งของที่เป็นคู่",
      "en": "Matching pairs of items",
      "zh": "配对成双成对的概念"
    },
    "options": [
      {
        "id": "opt-hat",
        "label": {
          "th": "หมวก 1 ใบ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Hat",
          "zh": "一顶帽子"
        },
        "icon": "🧢"
      },
      {
        "id": "opt-shoes",
        "label": {
          "th": "รองเท้า 1 คู่ (ข้างซ้าย + ข้างขวา)",
          "en": "Pair of shoes",
          "zh": "一双鞋子 (左脚+右脚)"
        },
        "icon": "👟"
      },
      {
        "id": "opt-shirt",
        "label": {
          "th": "เสื้อ 1 ตัว โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Shirt",
          "zh": "一件上衣"
        },
        "icon": "👕"
      }
    ],
    "correctOptionId": "opt-shoes",
    "explanation": {
      "th": "เก่งมากจ้ะ! รองเท้ามี 2 ข้าง ซ้าย-ขวา รวมเรียกว่า 1 คู่จ้ะ",
      "en": "Super! Shoes come in pairs of two for our left and right feet!",
      "zh": "答对了！鞋子有左右两只，组合成“一双”！"
    }
  },
  {
    "id": "exp30-math-k1-09",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "รถยนต์คันนี้ 🚗 มีล้อสำหรับวิ่งทั้งหมด \"กี่ล้อ\" เอ่ย?",
      "en": "How many wheels does a standard car have? 🚗",
      "zh": "一辆普通的小汽车 🚗 一共有几个车轮在地上滚动？"
    },
    "illustration": "🚗 🛞 🛞 🛞 🛞",
    "illustrationSubtitle": {
      "th": "นับจำนวนล้อรถยนต์",
      "en": "Count car wheels",
      "zh": "汽车轮子数量认知"
    },
    "options": [
      {
        "id": "opt-2",
        "label": {
          "th": "2 ล้อ",
          "en": "2 wheels",
          "zh": "2 个轮子"
        },
        "icon": "2️⃣"
      },
      {
        "id": "opt-1",
        "label": {
          "th": "1 ล้อ",
          "en": "1 wheel",
          "zh": "1 个轮子"
        },
        "icon": "1️⃣"
      },
      {
        "id": "opt-4",
        "label": {
          "th": "4 ล้อ (สี่ล้อ)",
          "en": "4 wheels",
          "zh": "4 个车轮 (四轮)"
        },
        "icon": "4️⃣"
      }
    ],
    "correctOptionId": "opt-4",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! รถยนต์ทั่วไปมี 4 ล้อ ช่วยให้ทรงตัวและวิ่งได้มั่นคงจ้ะ",
      "en": "Correct! Standard cars have 4 sturdy wheels!",
      "zh": "完全正确！普通小轿车有四个车轮平稳行驶！"
    }
  },
  {
    "id": "exp30-math-k1-10",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "ลูกเป็ดว่ายน้ำ 2 ตัว 🦆 🦆 มีลูกเป็ดตัวใหม่ว่ายมาเพิ่มอีก 1 ตัว 🦆 รวมเป็นกี่ตัว?",
      "en": "2 ducks swimming 🦆🦆 + 1 duck joins 🦆. How many ducks in total?",
      "zh": "小池塘里有2只小鸭 🦆🦆，又游来1只小鸭 🦆，现在一共有几只？"
    },
    "illustration": "🦆 🦆 + 🦆 = ❓",
    "illustrationSubtitle": {
      "th": "การรวมจำนวนง่ายๆ ไม่เกิน 5",
      "en": "Simple addition up to 5",
      "zh": "5以内看图加法"
    },
    "options": [
      {
        "id": "opt-3",
        "label": {
          "th": "3 ตัว (สาม)",
          "en": "3 ducks",
          "zh": "3 只小鸭 (三)"
        },
        "icon": "3️⃣"
      },
      {
        "id": "opt-2",
        "label": {
          "th": "2 ตัว",
          "en": "2 ducks",
          "zh": "2 只"
        },
        "icon": "2️⃣"
      },
      {
        "id": "opt-4",
        "label": {
          "th": "4 ตัว",
          "en": "4 ducks",
          "zh": "4 只"
        },
        "icon": "4️⃣"
      }
    ],
    "correctOptionId": "opt-3",
    "explanation": {
      "th": "เก่งที่สุด! 2 รวมกับ 1 ได้ 3 (2 + 1 = 3) จ้า",
      "en": "Splendid! 2 + 1 = 3 friendly ducks swimming!",
      "zh": "太棒了！2 只小鸭加上 1 只小鸭，一共是 3 只小鸭！"
    }
  },
  {
    "id": "exp30-math-k2-01",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "ทายแบบรูปซ้ำ (Pattern): 🔴 🟡 🔴 🟡 🔴 ... ตัวถัดไปคือสีอะไร?",
      "en": "What color comes next in this pattern: 🔴 🟡 🔴 🟡 🔴 ... ?",
      "zh": "规律排列题：🔴 🟡 🔴 🟡 🔴 ... 下一个圆圈是什么颜色？"
    },
    "illustration": "🔴 🟡 🔴 🟡 🔴 ❓",
    "illustrationSubtitle": {
      "th": "แบบรูปสีสลับกัน แดง-เหลือง",
      "en": "Alternating color pattern",
      "zh": "红黄交替规律模式"
    },
    "options": [
      {
        "id": "opt-red",
        "label": {
          "th": "สีแดง 🔴",
          "en": "Red 🔴",
          "zh": "红色 🔴"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-yellow",
        "label": {
          "th": "สีเหลือง 🟡",
          "en": "Yellow 🟡",
          "zh": "黄色 🟡"
        },
        "icon": "🟡"
      },
      {
        "id": "opt-blue",
        "label": {
          "th": "สีน้ำเงิน 🔵",
          "en": "Blue 🔵",
          "zh": "蓝色 🔵"
        },
        "icon": "🔵"
      }
    ],
    "correctOptionId": "opt-yellow",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! สลับแดง-เหลือง-แดง-เหลือง ตัวถัดจากสีแดงคือ สีเหลืองจ้ะ",
      "en": "Correct! The sequence alternates red and yellow, so yellow comes next!",
      "zh": "完全正确！红黄红黄交替出现，红色的下一个是黄色！"
    }
  },
  {
    "id": "exp30-math-k2-02",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "คุณแม่มีคุกกี้ 5 ชิ้น 🍪 🍪 🍪 🍪 🍪 น้องทานไป 2 ชิ้น เหลือคุกกี้กี่ชิ้น?",
      "en": "Mom had 5 cookies 🍪. You ate 2. How many cookies are left?",
      "zh": "妈妈烤了 5 块小饼干 🍪，小明吃掉了 2 块，还剩下几块饼干？"
    },
    "illustration": "🍪 🍪 🍪 ❌ ❌",
    "illustrationSubtitle": {
      "th": "การลบจำนวน: 5 หักออก 2",
      "en": "Subtraction: 5 minus 2",
      "zh": "5 减去 2 的实物减法"
    },
    "options": [
      {
        "id": "opt-2",
        "label": {
          "th": "2 ชิ้น",
          "en": "2 cookies",
          "zh": "2 块"
        },
        "icon": "2️⃣"
      },
      {
        "id": "opt-4",
        "label": {
          "th": "4 ชิ้น",
          "en": "4 cookies",
          "zh": "4 块"
        },
        "icon": "4️⃣"
      },
      {
        "id": "opt-3",
        "label": {
          "th": "3 ชิ้น (5 - 2 = 3)",
          "en": "3 cookies",
          "zh": "3 块 (5 - 2 = 3)"
        },
        "icon": "3️⃣"
      }
    ],
    "correctOptionId": "opt-3",
    "explanation": {
      "th": "เก่งมากจ้ะ! มี 5 กินไป 2 เหลือ 3 ชิ้น (5 - 2 = 3)",
      "en": "Great job! 5 minus 2 leaves 3 yummy cookies!",
      "zh": "真棒！5 减去吃掉的 2 块，还剩下 3 块饼干！"
    }
  },
  {
    "id": "exp30-math-k2-03",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "เปรียบเทียบน้ำหนักบนตาชั่ง: ลูกแตงโม 🍉 กับ สตรอว์เบอร์รี 🍓 ฝั่งไหน \"หนักกว่า\"?",
      "en": "On a balance scale: Watermelon 🍉 vs Strawberry 🍓. Which is HEAVIER?",
      "zh": "放在天平秤上称重：大西瓜 🍉 与 小草莓 🍓，哪一个“更重”？"
    },
    "illustration": "🍉 ⬇️ ⚖️ ⬆️ 🍓",
    "illustrationSubtitle": {
      "th": "เปรียบเทียบน้ำหนัก หนักกว่า-เบากว่า",
      "en": "Weight comparison heavy vs light",
      "zh": "轻重天平秤对比"
    },
    "options": [
      {
        "id": "opt-watermelon",
        "label": {
          "th": "แตงโม (หนักกว่า ตาชั่งเอียงลง)",
          "en": "Watermelon (Heavier)",
          "zh": "大西瓜（更重，沉下去）"
        },
        "icon": "🍉"
      },
      {
        "id": "opt-strawberry",
        "label": {
          "th": "สตรอว์เบอร์รี โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Strawberry",
          "zh": "小草莓"
        },
        "icon": "🍓"
      },
      {
        "id": "opt-equal",
        "label": {
          "th": "หนักเท่ากัน โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Same weight",
          "zh": "一样重"
        },
        "icon": "⚖️"
      }
    ],
    "correctOptionId": "opt-watermelon",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! แตงโมผลใหญ่มีน้ำหนักมากกว่าสตรอว์เบอร์รีลูกเล็กจ้ะ",
      "en": "Awesome! A large watermelon is much heavier than a tiny strawberry!",
      "zh": "太棒了！巨大的西瓜比起小草莓要重得多！"
    }
  },
  {
    "id": "exp30-math-k2-04",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "นับจุดบนลูกเต๋าสองลูก: ลูกแรกมี 4 จุด ⚃ ลูกที่สองมี 3 จุด ⚂ รวมเป็นกี่จุด?",
      "en": "Count dice dots: 4 dots ⚃ + 3 dots ⚂ = How many dots in total?",
      "zh": "数一数两颗骰子：第一颗有4个点 ⚃，第二颗有3个点 ⚂，一共有几个点？"
    },
    "illustration": "⚃ (4)  +  ⚂ (3)  =  ❓",
    "illustrationSubtitle": {
      "th": "การบวกเลขจำนวนไม่เกิน 10",
      "en": "Dice dots addition up to 10",
      "zh": "10以内看图点数加法"
    },
    "options": [
      {
        "id": "opt-6",
        "label": {
          "th": "6 จุด",
          "en": "6 dots",
          "zh": "6 个点"
        },
        "icon": "6️⃣"
      },
      {
        "id": "opt-7",
        "label": {
          "th": "7 จุด (4 + 3 = 7)",
          "en": "7 dots",
          "zh": "7 个点 (4 + 3 = 7)"
        },
        "icon": "7️⃣"
      },
      {
        "id": "opt-8",
        "label": {
          "th": "8 จุด",
          "en": "8 dots",
          "zh": "8 个点"
        },
        "icon": "8️⃣"
      }
    ],
    "correctOptionId": "opt-7",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! 4 บวกกับ 3 ได้เท่ากับ 7 จุดจ้ะ",
      "en": "Correct! 4 + 3 equals 7 dots!",
      "zh": "完全正确！4 个点加上 3 个点，合起来正好是 7 个点！"
    }
  },
  {
    "id": "exp30-math-k2-05",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "รูปสี่เหลี่ยมจัตุรัส ⏹️ มีด้านทั้งหมดกี่ด้าน และมีมุมทั้งหมดกี่มุม?",
      "en": "How many sides and corners does a square have? ⏹️",
      "zh": "一个规则的正方形 ⏹️ 一共有几条边和几个角？"
    },
    "illustration": "⏹️ 4 ด้าน 4 มุม",
    "illustrationSubtitle": {
      "th": "คุณสมบัติของรูปสี่เหลี่ยม",
      "en": "Properties of a square",
      "zh": "正方形的边和角特征"
    },
    "options": [
      {
        "id": "opt-3",
        "label": {
          "th": "3 ด้าน และ 3 มุม",
          "en": "3 sides & 3 corners",
          "zh": "3 条边 3 个角"
        },
        "icon": "3️⃣"
      },
      {
        "id": "opt-0",
        "label": {
          "th": "ไม่มีด้านเลย (กลมมน)",
          "en": "No sides (round)",
          "zh": "没有边"
        },
        "icon": "⭕"
      },
      {
        "id": "opt-4",
        "label": {
          "th": "4 ด้าน และ 4 มุมเท่ากัน",
          "en": "4 sides & 4 corners",
          "zh": "4 条边和 4 个角"
        },
        "icon": "4️⃣"
      }
    ],
    "correctOptionId": "opt-4",
    "explanation": {
      "th": "เก่งมากจ้ะ! สี่เหลี่ยมจัตุรัสมี 4 ด้านเท่ากัน และมี 4 มุมฉากจ้ะ",
      "en": "Great job! A square has 4 equal straight sides and 4 corners!",
      "zh": "真棒！正方形有 4 条相等的边和 4 个直角！"
    }
  },
  {
    "id": "exp30-math-k2-06",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "เรียงลำดับจำนวนจาก \"น้อยไปหามาก\": ตัวเลขใดควรอยู่ลำดับแรกสุด? [ 2, 7, 5 ]",
      "en": "Order from LEAST to GREATEST: Which comes first? [ 2, 7, 5 ]",
      "zh": "按“从小到大”的顺序排列：[ 2, 7, 5 ] 哪一个数字排在最前面？"
    },
    "illustration": "2️⃣ ➡️ 5️⃣ ➡️ 7️⃣",
    "illustrationSubtitle": {
      "th": "เรียงลำดับค่าน้อยไปมาก",
      "en": "Ordering least to greatest",
      "zh": "按从小到大升序排序"
    },
    "options": [
      {
        "id": "opt-2",
        "label": {
          "th": "2 (น้อยที่สุด)",
          "en": "2 (Least)",
          "zh": "2（数值最小）"
        },
        "icon": "2️⃣"
      },
      {
        "id": "opt-5",
        "label": {
          "th": "5",
          "en": "5",
          "zh": "5"
        },
        "icon": "5️⃣"
      },
      {
        "id": "opt-7",
        "label": {
          "th": "7 (มากที่สุด)",
          "en": "7",
          "zh": "7"
        },
        "icon": "7️⃣"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! 2 น้อยที่สุด ตามด้วย 5 และ 7 ตามลำดับ",
      "en": "Correct! 2 is the smallest, so it comes first: 2, 5, 7!",
      "zh": "完全正确！2 在这组数字中最小，排在最开头！"
    }
  },
  {
    "id": "exp30-math-k2-07",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "บอกตำแหน่งสิ่งของ: ในภาพนี้ น้องกระต่าย 🐰 อยู่ \"ข้างใน\" หรือ \"ข้างนอก\" กล่อง 📦?",
      "en": "Spatial position: Is the bunny 🐰 INSIDE or OUTSIDE the box 📦?",
      "zh": "空间方位：图里的小白兔 🐰 是在箱子 📦 的“里面”还是“外面”？"
    },
    "illustration": "📦\n🐰 (กระต่ายยืนข้างนอกกล่อง)",
    "illustrationSubtitle": {
      "th": "ตำแหน่ง ข้างใน - ข้างนอก",
      "en": "Spatial relations inside vs outside",
      "zh": "空间认知 里面与外面"
    },
    "options": [
      {
        "id": "opt-inside",
        "label": {
          "th": "อยู่ข้างในกล่อง",
          "en": "Inside the box",
          "zh": "在箱子里面"
        },
        "icon": "📦"
      },
      {
        "id": "opt-outside",
        "label": {
          "th": "อยู่ข้างนอกกล่อง",
          "en": "Outside the box",
          "zh": "在箱子外面"
        },
        "icon": "👉"
      },
      {
        "id": "opt-under",
        "label": {
          "th": "อยู่ใต้กล่อง",
          "en": "Under the box",
          "zh": "在箱子底下"
        },
        "icon": "⬇️"
      }
    ],
    "correctOptionId": "opt-outside",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! กระต่ายยืนอยู่ข้างนอก ไม่ได้มุดเข้าไปในกล่อง",
      "en": "Awesome! The bunny is standing outside beside the box!",
      "zh": "太棒了！小白兔站在箱子外面，并没有躲进去！"
    }
  },
  {
    "id": "exp30-math-k2-08",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "เติมตัวเลขที่หายไปในการนับเพิ่มทีละหนึ่ง: 6, 7, ❓, 9, 10",
      "en": "Fill in the missing number counting by one: 6, 7, ❓, 9, 10",
      "zh": "按顺序数一数，问号处应该填入几：6, 7, ❓, 9, 10"
    },
    "illustration": "6️⃣ ➡️ 7️⃣ ➡️ ❓ ➡️ 9️⃣ ➡️ 🔟",
    "illustrationSubtitle": {
      "th": "นับต่อทีละ 1 ถึง 10",
      "en": "Count forward by 1s up to 10",
      "zh": "连续正数数训练"
    },
    "options": [
      {
        "id": "opt-5",
        "label": {
          "th": "5",
          "en": "5",
          "zh": "5"
        },
        "icon": "5️⃣"
      },
      {
        "id": "opt-11",
        "label": {
          "th": "11",
          "en": "11",
          "zh": "11"
        },
        "icon": "🔢"
      },
      {
        "id": "opt-8",
        "label": {
          "th": "8 (แปด)",
          "en": "8 (Eight)",
          "zh": "8 (八)"
        },
        "icon": "8️⃣"
      }
    ],
    "correctOptionId": "opt-8",
    "explanation": {
      "th": "เก่งมากจ้ะ! นับต่อจาก 7 ก็คือ 8 จ้า (6, 7, 8, 9, 10)",
      "en": "Great job! 8 comes right after 7: 6, 7, 8, 9, 10!",
      "zh": "真棒！7 的后面接的是数字 8！"
    }
  },
  {
    "id": "exp30-math-k2-09",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "เปรียบเทียบปริมาตรน้ำ: แก้วน้ำเต็มแก้ว 🥛 กับ แก้วน้ำมีน้ำครึ่งแก้ว แก้วไหนมีน้ำ \"มากกว่า\"?",
      "en": "Compare capacity: Full glass 🥛 vs Half-full glass. Which holds MORE liquid?",
      "zh": "比一比容量：一杯满满的水 🥛 和 半杯水，哪一杯水“更多”？"
    },
    "illustration": "🥛 (เต็มแก้ว)  VS  🥛 (ครึ่งแก้ว)",
    "illustrationSubtitle": {
      "th": "เปรียบเทียบปริมาตร เต็ม - ครึ่งแก้ว",
      "en": "Full vs half-full comparison",
      "zh": "液体容量多少对比"
    },
    "options": [
      {
        "id": "opt-full",
        "label": {
          "th": "แก้วที่มีน้ำเต็มแก้ว (มากกว่า)",
          "en": "Full glass (More)",
          "zh": "装满水的那一杯（更多）"
        },
        "icon": "🥛"
      },
      {
        "id": "opt-half",
        "label": {
          "th": "แก้วที่มีน้ำครึ่งแก้ว",
          "en": "Half glass",
          "zh": "装半杯水的那一杯"
        },
        "icon": "🥤"
      },
      {
        "id": "opt-empty",
        "label": {
          "th": "แก้วเปล่า โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Empty glass",
          "zh": "空杯子"
        },
        "icon": "🫙"
      }
    ],
    "correctOptionId": "opt-full",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! น้ำเต็มแก้วย่อมมีปริมาณมากกว่าน้ำครึ่งแก้วเสมอจ้ะ",
      "en": "Correct! A full glass contains more water than a half-filled glass!",
      "zh": "完全正确！装得满满的一杯水比起半杯水要多得多！"
    }
  },
  {
    "id": "exp30-math-k2-10",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "มีดินสอสี 4 แท่ง ✏️ คุณครูให้อีก 4 แท่ง ✏️ ตอนนี้หนูมีดินสอสีทั้งหมดกี่แท่ง?",
      "en": "You have 4 colored pencils ✏️. Teacher gives you 4 more. How many in total?",
      "zh": "小红有 4 支彩笔 ✏️，老师又奖给她 4 支，现在一共有几支？"
    },
    "illustration": "✏️ ✏️ ✏️ ✏️ + ✏️ ✏️ ✏️ ✏️ = ❓",
    "illustrationSubtitle": {
      "th": "การบวกจำนวนเท่ากัน (ดับเบิล): 4 + 4",
      "en": "Double addition: 4 + 4",
      "zh": "看图加法计算 4 + 4"
    },
    "options": [
      {
        "id": "opt-6",
        "label": {
          "th": "6 แท่ง",
          "en": "6 pencils",
          "zh": "6 支"
        },
        "icon": "6️⃣"
      },
      {
        "id": "opt-8",
        "label": {
          "th": "8 แท่ง (4 + 4 = 8)",
          "en": "8 pencils",
          "zh": "8 支彩笔 (4 + 4 = 8)"
        },
        "icon": "8️⃣"
      },
      {
        "id": "opt-10",
        "label": {
          "th": "10 แท่ง",
          "en": "10 pencils",
          "zh": "10 支"
        },
        "icon": "🔟"
      }
    ],
    "correctOptionId": "opt-8",
    "explanation": {
      "th": "ยอดเยี่ยมมาก! 4 บวกกับ 4 รวมกันได้ 8 แท่งพอดีเลยจ้ะ",
      "en": "Super! 4 plus 4 equals 8 colorful pencils in total!",
      "zh": "太棒了！4 加上 4，合起来正好是 8 支彩笔！"
    }
  },
  {
    "id": "exp30-math-k3-01",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "โจทย์ปัญหา: ในฟาร์มมีเป็ด 8 ตัว 🦆 บินหนีไป 3 ตัว เหลือนกเป็ดในฟาร์มกี่ตัว?",
      "en": "Math story: 8 ducks in a pond 🦆. 3 fly away. How many remain?",
      "zh": "看图应用题：池塘里有 8 只鸭子 🦆，扑棱棱飞走了 3 只，还剩几只？"
    },
    "illustration": "🦆 🦆 🦆 🦆 🦆  (หนีไป: 💨 🦆 🦆 🦆)",
    "illustrationSubtitle": {
      "th": "โจทย์ปัญหาการลบเลข: 8 - 3",
      "en": "Subtraction story: 8 - 3",
      "zh": "减法情境应用题 8 - 3"
    },
    "options": [
      {
        "id": "opt-4",
        "label": {
          "th": "4 ตัว",
          "en": "4 ducks",
          "zh": "4 只"
        },
        "icon": "4️⃣"
      },
      {
        "id": "opt-6",
        "label": {
          "th": "6 ตัว",
          "en": "6 ducks",
          "zh": "6 只"
        },
        "icon": "6️⃣"
      },
      {
        "id": "opt-5",
        "label": {
          "th": "5 ตัว (8 - 3 = 5)",
          "en": "5 ducks",
          "zh": "5 只 (8 - 3 = 5)"
        },
        "icon": "5️⃣"
      }
    ],
    "correctOptionId": "opt-5",
    "explanation": {
      "th": "ยอดเยี่ยมมาก! 8 ลบด้วย 3 เหลือเท่ากับ 5 ตัวจ้า",
      "en": "Spot on! 8 minus 3 leaves 5 ducks in the pond!",
      "zh": "太棒了！8 减去飞走的 3 只，池塘里还剩 5 只鸭子！"
    }
  },
  {
    "id": "exp30-math-k3-02",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "การดูนาฬิกา: เข็มสั้นชี้ที่เลข 9 เข็มยาวชี้ตรงที่เลข 12 ตรงกับเวลาใด?",
      "en": "Clock reading: Short hand at 9, long hand at 12. What time is it?",
      "zh": "钟表认知：时针指在数字 9，分针指在数字 12，表示几点整？"
    },
    "illustration": "🕘 (เข็มสั้นชี้ 9, เข็มยาวชี้ 12)",
    "illustrationSubtitle": {
      "th": "การบอกเวลาตรงชั่วโมง",
      "en": "Telling time on the hour",
      "zh": "认识整点时间"
    },
    "options": [
      {
        "id": "opt-9",
        "label": {
          "th": "9 นาฬิกาตรง (9:00 น.)",
          "en": "9 o’clock",
          "zh": "9 点整 (9:00)"
        },
        "icon": "🕘"
      },
      {
        "id": "opt-12",
        "label": {
          "th": "12 นาฬิกาตรง",
          "en": "12 o’clock",
          "zh": "12 点整"
        },
        "icon": "🕛"
      },
      {
        "id": "opt-3",
        "label": {
          "th": "3 นาฬิกาตรง",
          "en": "3 o’clock",
          "zh": "3 点整"
        },
        "icon": "🕒"
      }
    ],
    "correctOptionId": "opt-9",
    "explanation": {
      "th": "เก่งกาจมาก! เข็มสั้นบอกชั่วโมงชี้เลข 9 เข็มยาวชี้เลข 12 คือ 9:00 น. พอดีจ้ะ",
      "en": "Brilliant! The short hour hand at 9 and long minute hand at 12 means 9 o’clock!",
      "zh": "精彩！时针指着 9，分针正对 12，正好是 9 点整！"
    }
  },
  {
    "id": "exp30-math-k3-03",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "การแบ่งส่วนเท่ากัน: เค้กวันเกิด 1 ก้อน 🎂 แบ่งให้เพื่อน 2 คนเท่าๆ กัน เรียกว่าอะไร?",
      "en": "Fractions concept: Dividing 1 cake equally between 2 friends is called?",
      "zh": "均分概念：将一整只大蛋糕 🎂 平分给两个小朋友，每人分到多少？"
    },
    "illustration": "🎂 ➡️ 🍰 + 🍰 (แบ่งครึ่ง)",
    "illustrationSubtitle": {
      "th": "เศษส่วน: การแบ่งครึ่ง (1/2)",
      "en": "Equal halves concept",
      "zh": "对半分与二分之一概念"
    },
    "options": [
      {
        "id": "opt-quarter",
        "label": {
          "th": "หนึ่งในสี่ส่วน โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "One quarter",
          "zh": "四分之一"
        },
        "icon": "🧁"
      },
      {
        "id": "opt-half",
        "label": {
          "th": "ครึ่งหนึ่ง (1 ส่วนจาก 2 ส่วนเท่ากัน)",
          "en": "One half (1/2)",
          "zh": "一半 / 二分之一 (1/2)"
        },
        "icon": "🍰"
      },
      {
        "id": "opt-whole",
        "label": {
          "th": "หนึ่งก้อนเต็ม โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Whole cake",
          "zh": "整整一大块"
        },
        "icon": "🎂"
      }
    ],
    "correctOptionId": "opt-half",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! แบ่ง 1 ชิ้นออกเป็น 2 ส่วนเท่ากัน แต่ละคนจะได้ \"ครึ่งหนึ่ง\" (1/2)",
      "en": "Correct! Splitting evenly in two gives each person one half (1/2)!",
      "zh": "完全正确！将整体均分为两份，每一份叫做“一半”（二分之一）！"
    }
  },
  {
    "id": "exp30-math-k3-04",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "โจทย์บวกเลขสองหลักง่ายๆ: 10 + 5 เท่ากับเท่าใด?",
      "en": "Simple addition: What is 10 + 5?",
      "zh": "基础进阶加法：10 + 5 等于多少？"
    },
    "illustration": "🔟  +  🖐️  =  ❓",
    "illustrationSubtitle": {
      "th": "การรวมหลักสิบกับหลักหน่วย",
      "en": "Tens plus ones addition",
      "zh": "整十加个位计算"
    },
    "options": [
      {
        "id": "opt-12",
        "label": {
          "th": "12",
          "en": "12",
          "zh": "12"
        },
        "icon": "🔢"
      },
      {
        "id": "opt-20",
        "label": {
          "th": "20",
          "en": "20",
          "zh": "20"
        },
        "icon": "🔢"
      },
      {
        "id": "opt-15",
        "label": {
          "th": "15 (สิบห้า)",
          "en": "15",
          "zh": "15 (十五)"
        },
        "icon": "🔢"
      }
    ],
    "correctOptionId": "opt-15",
    "explanation": {
      "th": "เก่งมากจ้ะ! 1 สิบ กับ 5 หน่วย รวมกันได้ 15 พอดีจ้ะ",
      "en": "Great job! 10 plus 5 equals 15!",
      "zh": "真棒！一个十加上五个一，合起来就是 15！"
    }
  },
  {
    "id": "exp30-math-k3-05",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "การแข่งวิ่ง: มะลิเข้าเส้นชัยคนแรก ต่อด้วยกานต์ และต้นกล้า ต้นกล้าได้อันดับที่เท่าใด?",
      "en": "Running race: Mali finished 1st, Karn 2nd, Tonkla 3rd. What is Tonkla’s place?",
      "zh": "赛跑比赛：玛丽第一名到达终点，阿甘第二，小树苗第三。小树苗是第几名？"
    },
    "illustration": "🥇 มะลิ  🥈 กานต์  🥉 ต้นกล้า",
    "illustrationSubtitle": {
      "th": "ลำดับที่ 1, 2, 3",
      "en": "Ordinal numbers 1st, 2nd, 3rd",
      "zh": "序数概念 第一、第二、第三"
    },
    "options": [
      {
        "id": "opt-third",
        "label": {
          "th": "อันดับที่ 3 (เหรียญทองแดง)",
          "en": "3rd place",
          "zh": "第 3 名 (季军铜牌)"
        },
        "icon": "🥉"
      },
      {
        "id": "opt-first",
        "label": {
          "th": "อันดับที่ 1",
          "en": "1st place",
          "zh": "第 1 名"
        },
        "icon": "🥇"
      },
      {
        "id": "opt-second",
        "label": {
          "th": "อันดับที่ 2",
          "en": "2nd place",
          "zh": "第 2 名"
        },
        "icon": "🥈"
      }
    ],
    "correctOptionId": "opt-third",
    "explanation": {
      "th": "ยอดเยี่ยมมาก! คนที่หนึ่ง มะลิ, คนที่สอง กานต์, ต้นกล้าจึงได้อันดับที่ 3 จ้า",
      "en": "Awesome! Tonkla finished in 3rd place behind Mali and Karn!",
      "zh": "太棒了！第一是玛丽，第二是阿甘，小树苗获得了第 3 名！"
    }
  },
  {
    "id": "exp30-math-k3-06",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "รูปทรงเรขาคณิต 3 มิติ: ลูกฟุตบอล ⚽ มีรูปทรงเรขาคณิต 3 มิติตรงกับข้อใด?",
      "en": "3D Geometry: What 3D solid shape is a soccer ball ⚽?",
      "zh": "立体几何认知：圆滚滚的足球 ⚽ 属于哪种立体三维几何图形？"
    },
    "illustration": "⚽ 🌍 🔮",
    "illustrationSubtitle": {
      "th": "รูปทรงเรขาคณิตสามมิติ",
      "en": "3D geometric spheres",
      "zh": "三维球体形态特征"
    },
    "options": [
      {
        "id": "opt-cylinder",
        "label": {
          "th": "ทรงกระบอก (เหมือนกระป๋อง)",
          "en": "Cylinder",
          "zh": "圆柱体"
        },
        "icon": "🥫"
      },
      {
        "id": "opt-sphere",
        "label": {
          "th": "ทรงกลม (Sphere)",
          "en": "Sphere",
          "zh": "球体 (Sphere)"
        },
        "icon": "⚽"
      },
      {
        "id": "opt-cube",
        "label": {
          "th": "ทรงลูกบาศก์ (กล่องสี่เหลี่ยม)",
          "en": "Cube",
          "zh": "正方体"
        },
        "icon": "📦"
      }
    ],
    "correctOptionId": "opt-sphere",
    "explanation": {
      "th": "ถูกต้องที่สุด! ลูกบอลมีรูปทรงกลมสามมิติ กลิ้งได้ทุกทิศทาง",
      "en": "Correct! A soccer ball is a 3D sphere that rolls freely!",
      "zh": "完全正确！可以向各个方向滚动的足球属于三维“球体”！"
    }
  },
  {
    "id": "exp30-math-k3-07",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "สังเกตความสัมพันธ์แบบรูปอนุกรม: 2, 4, 6, 8, ❓ ตัวเลขถัดไปคือเลขใด?",
      "en": "Number pattern counting by 2s: 2, 4, 6, 8, ❓ What comes next?",
      "zh": "规律找数字（每次加2）：2, 4, 6, 8, ❓ 问号处应该是哪一个数？"
    },
    "illustration": "2️⃣ ➡️ 4️⃣ ➡️ 6️⃣ ➡️ 8️⃣ ➡️ ❓",
    "illustrationSubtitle": {
      "th": "การนับเพิ่มทีละ 2 (เลขคู่)",
      "en": "Skip counting by 2s pattern",
      "zh": "每次递增 2 的等差规律"
    },
    "options": [
      {
        "id": "opt-9",
        "label": {
          "th": "9 โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "9",
          "zh": "9"
        },
        "icon": "9️⃣"
      },
      {
        "id": "opt-12",
        "label": {
          "th": "12 โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "12",
          "zh": "12"
        },
        "icon": "🔢"
      },
      {
        "id": "opt-10",
        "label": {
          "th": "10 (นับเพิ่มทีละ 2)",
          "en": "10",
          "zh": "10 (每次加 2)"
        },
        "icon": "🔟"
      }
    ],
    "correctOptionId": "opt-10",
    "explanation": {
      "th": "เก่งกาจมาก! 2, 4, 6, 8 บวกเพิ่มอีก 2 ได้ 10 จ้า",
      "en": "Brilliant! Counting by twos: 2, 4, 6, 8, and the next is 10!",
      "zh": "太厉害了！每次跳数增加 2：2, 4, 6, 8，下一个正好是 10！"
    }
  },
  {
    "id": "exp30-math-k3-08",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "การใช้เงินเหรียญ: หนูมีเหรียญห้าบาท 1 เหรียญ 🪙 และเหรียญสองบาท 1 เหรียญ รวมเป็นเงินกี่บาท?",
      "en": "Coin values: You have a 5-baht coin 🪙 + 2-baht coin. Total amount?",
      "zh": "钱币计算：小明有 1 枚 5 铢硬币 🪙 和 1 枚 2 铢硬币，一共是多少钱？"
    },
    "illustration": "🪙 5 บาท + 🪙 2 บาท = ❓ บาท",
    "illustrationSubtitle": {
      "th": "การรวมค่าเงินเหรียญไทย",
      "en": "Thai currency coin addition",
      "zh": "泰币面值看图相加"
    },
    "options": [
      {
        "id": "opt-7",
        "label": {
          "th": "7 บาท (5 + 2 = 7)",
          "en": "7 Baht",
          "zh": "7 铢 (5 + 2 = 7)"
        },
        "icon": "💰"
      },
      {
        "id": "opt-6",
        "label": {
          "th": "6 บาท",
          "en": "6 Baht",
          "zh": "6 铢"
        },
        "icon": "🪙"
      },
      {
        "id": "opt-10",
        "label": {
          "th": "10 บาท",
          "en": "10 Baht",
          "zh": "10 铢"
        },
        "icon": "💵"
      }
    ],
    "correctOptionId": "opt-7",
    "explanation": {
      "th": "ยอดเยี่ยมมาก! 5 บาท บวกกับ 2 บาท รวมเป็น 7 บาทจ้ะ",
      "en": "Awesome! 5 + 2 equals 7 Baht in total!",
      "zh": "太棒了！5 铢加上 2 铢，合起来等于 7 铢！"
    }
  },
  {
    "id": "exp30-math-k3-09",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "สมมาตร (Symmetry): ภาพผีเสื้อกางปีก 🦋 ปีกข้างซ้ายและปีกข้างขวา มีลักษณะอย่างไร?",
      "en": "Symmetry: How do the left and right wings of a butterfly 🦋 compare?",
      "zh": "对称图形认知：展翅高飞的蝴蝶 🦋，左侧翅膀与右侧翅膀有什么特点？"
    },
    "illustration": "🦋 (แกนสมมาตรตรงกลาง)",
    "illustrationSubtitle": {
      "th": "แกนสมมาตร เท่ากันทั้งสองข้าง",
      "en": "Symmetry axis identical mirror wings",
      "zh": "左右完全对称轴"
    },
    "options": [
      {
        "id": "opt-different",
        "label": {
          "th": "ขนาดไม่เท่ากันเลย โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Completely different sizes",
          "zh": "一边极大一边极小"
        },
        "icon": "❌"
      },
      {
        "id": "opt-mirror",
        "label": {
          "th": "เหมือนกันและเท่ากันทุกประการ (สมมาตร)",
          "en": "Identical mirror images (Symmetric)",
          "zh": "两边图案大小完全对称一致"
        },
        "icon": "🦋"
      },
      {
        "id": "opt-one-wing",
        "label": {
          "th": "มีปีกแค่ข้างเดียว โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Only has one wing",
          "zh": "只有单侧一边翅膀"
        },
        "icon": "🪶"
      }
    ],
    "correctOptionId": "opt-mirror",
    "explanation": {
      "th": "ถูกต้องที่สุด! ผีเสื้อมีความสมมาตร ปีกซ้ายและปีกขวามีขนาด ลวดลาย และรูปทรงเหมือนกันราวกับส่องกระจก",
      "en": "Correct! A butterfly exhibits bilateral symmetry, with matching mirror-image wings!",
      "zh": "完全正确！蝴蝶是典型的大自然对称生物，左右翅膀形态大小完全镜像对称！"
    }
  },
  {
    "id": "exp30-math-k3-10",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "โจทย์ปัญหาผสม: มีลูกอม 10 เม็ด 🍬 แบ่งให้เพื่อนไป 4 เม็ด แล้วคุณครูให้อีก 2 เม็ด ตอนนี้มีลูกอมกี่เม็ด?",
      "en": "Two-step math: 10 candies 🍬. Give 4 to friend (10-4=6). Teacher gives 2 (6+2=8). How many now?",
      "zh": "两步加减应用：小华有 10 颗糖 🍬，分给朋友 4 颗，老师又奖了 2 颗，现在有几颗？"
    },
    "illustration": "🍬 10 ➡️ -4 ➡️ +2 = ❓",
    "illustrationSubtitle": {
      "th": "โจทย์ระคนบวกลบสองขั้นตอน",
      "en": "Two-step addition & subtraction",
      "zh": "连续加减两步思考"
    },
    "options": [
      {
        "id": "opt-6",
        "label": {
          "th": "6 เม็ด โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "6 candies",
          "zh": "6 颗"
        },
        "icon": "🍬"
      },
      {
        "id": "opt-12",
        "label": {
          "th": "12 เม็ด โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "12 candies",
          "zh": "12 颗"
        },
        "icon": "🍬"
      },
      {
        "id": "opt-8",
        "label": {
          "th": "8 เม็ด (10 - 4 = 6, 6 + 2 = 8)",
          "en": "8 candies",
          "zh": "8 颗 (10 - 4 = 6, 6 + 2 = 8)"
        },
        "icon": "🍬"
      }
    ],
    "correctOptionId": "opt-8",
    "explanation": {
      "th": "สุดยอดอัจฉริยะตัวน้อย! มี 10 หักให้เพื่อน 4 เหลือ 6 แล้วได้เพิ่มอีก 2 จึงเป็น 8 เม็ดจ้า",
      "en": "Splendid young mathematician! 10 - 4 = 6, then 6 + 2 = 8 candies!",
      "zh": "算得太棒了！10 颗分给朋友 4 颗剩 6 颗，再加上老师奖励的 2 颗，一共是 8 颗糖果！"
    }
  }
];
