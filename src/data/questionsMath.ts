import { Question } from '../types';

/**
 * คลังแบบทดสอบ: การคิดรวบยอดและการคิดคำนวณ (Math Thinking) จำนวน 90 ข้อ
 * ครบ 3 ระดับชั้น (อ.1 - อ.3) ระดับความยากละ 10 ข้อ (ง่าย, ปานกลาง, ท้าทาย)
 * กระจายตำแหน่งคำตอบถูกต้อง A, B, C อย่างสมดุลเท่าเทียมกัน
 */
export const QUESTIONS_MATH: Question[] = [
  {
    "id": "k1-mat-e1",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "นับจำนวนแอปเปิ้ลสีแดงในภาพ: มีแอปเปิ้ลกี่ผล? 🍎 🍎",
      "en": "Count the red apples: How many apples are there? 🍎 🍎",
      "zh": "数一数图片中的红苹果：一共有几个苹果？🍎 🍎"
    },
    "illustration": "🍎 🍎",
    "illustrationSubtitle": {
      "th": "นับจำนวน 1 ถึง 2",
      "en": "Count 1 to 2",
      "zh": "数数 1 到 2"
    },
    "options": [
      {
        "id": "opt-k1-mat-e1-1",
        "label": {
          "th": "2 ผล",
          "en": "2 apples",
          "zh": "2 个"
        },
        "icon": "✌️"
      },
      {
        "id": "opt-k1-mat-e1-2",
        "label": {
          "th": "1 ผล",
          "en": "1 apple",
          "zh": "1 个"
        },
        "icon": "☝️"
      },
      {
        "id": "opt-k1-mat-e1-3",
        "label": {
          "th": "3 ผล",
          "en": "3 apples",
          "zh": "3 个"
        },
        "icon": "👌"
      }
    ],
    "correctOptionId": "opt-k1-mat-e1-1",
    "explanation": {
      "th": "เก่งมากครับ! หนึ่ง สอง มีแอปเปิ้ล 2 ผลจ้ะ",
      "en": "Great job! 1, 2 apples!",
      "zh": "太棒了！数一数是 2 个苹果。"
    }
  },
  {
    "id": "k1-mat-e2",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "รูปทรงเรขาคณิตรูปใดมีลักษณะเป็น \"วงกลม\"? 🔴",
      "en": "Which shape is a \"Circle\"? 🔴",
      "zh": "哪一个形状是圆溜溜的“圆形”？🔴"
    },
    "illustration": "🔴 📐 🔴",
    "illustrationSubtitle": {
      "th": "รูปทรงเรขาคณิตพื้นฐาน",
      "en": "Circle shape",
      "zh": "几何圆形"
    },
    "options": [
      {
        "id": "opt-k1-mat-e2-1",
        "label": {
          "th": "สามเหลี่ยม 🔺",
          "en": "Triangle",
          "zh": "三角形"
        },
        "icon": "🔺"
      },
      {
        "id": "opt-k1-mat-e2-2",
        "label": {
          "th": "วงกลม 🔴",
          "en": "Circle",
          "zh": "圆形"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k1-mat-e2-3",
        "label": {
          "th": "สี่เหลี่ยม 🟦",
          "en": "Square",
          "zh": "正方形"
        },
        "icon": "🟦"
      }
    ],
    "correctOptionId": "opt-k1-mat-e2-2",
    "explanation": {
      "th": "วงกลมกลมเกลี้ยง ไม่มีเหลี่ยมมุม เก่งมากครับ!",
      "en": "Correct! A circle is round with no corners.",
      "zh": "答对了！圆形没有棱角。"
    }
  },
  {
    "id": "k1-mat-e3",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "สัตว์ตัวใดมีขนาด \"ใหญ่ที่สุด\"? 🐘 🆚 🐭",
      "en": "Which animal is the \"Biggest\"? 🐘 🆚 🐭",
      "zh": "哪一种动物的体型“最大”？🐘 🆚 🐭"
    },
    "illustration": "🐘 🐭 🐱",
    "illustrationSubtitle": {
      "th": "เปรียบเทียบขนาด ใหญ่-เล็ก",
      "en": "Compare size: Big vs Small",
      "zh": "比较大小"
    },
    "options": [
      {
        "id": "opt-k1-mat-e3-1",
        "label": {
          "th": "หนูตัวเล็ก",
          "en": "Little mouse",
          "zh": "小老鼠"
        },
        "icon": "🐭"
      },
      {
        "id": "opt-k1-mat-e3-2",
        "label": {
          "th": "แมวเหมียว",
          "en": "Cat",
          "zh": "小猫"
        },
        "icon": "🐱"
      },
      {
        "id": "opt-k1-mat-e3-3",
        "label": {
          "th": "ช้างตัวโต",
          "en": "Big elephant",
          "zh": "大象"
        },
        "icon": "🐘"
      }
    ],
    "correctOptionId": "opt-k1-mat-e3-3",
    "explanation": {
      "th": "ช้างมีตัวใหญ่ที่สุดเลย เก่งมากครับ!",
      "en": "Right! The elephant is the biggest.",
      "zh": "答对啦！大象体型最大。"
    }
  },
  {
    "id": "k1-mat-e4",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "นับจำนวนกล้วยหอมสีเหลือง: มีกล้วยกี่ผล? 🍌 🍌 🍌",
      "en": "Count the yellow bananas: How many bananas are there? 🍌 🍌 🍌",
      "zh": "数一数黄黄的香蕉：一共有几根香蕉？🍌 🍌 🍌"
    },
    "illustration": "🍌 🍌 🍌",
    "illustrationSubtitle": {
      "th": "นับจำนวน 1 ถึง 3",
      "en": "Count 1 to 3",
      "zh": "数数 1 到 3"
    },
    "options": [
      {
        "id": "opt-k1-mat-e4-1",
        "label": {
          "th": "3 ผล",
          "en": "3 bananas",
          "zh": "3 根"
        },
        "icon": "👌"
      },
      {
        "id": "opt-k1-mat-e4-2",
        "label": {
          "th": "1 ผล",
          "en": "1 banana",
          "zh": "1 根"
        },
        "icon": "☝️"
      },
      {
        "id": "opt-k1-mat-e4-3",
        "label": {
          "th": "2 ผล",
          "en": "2 bananas",
          "zh": "2 根"
        },
        "icon": "✌️"
      }
    ],
    "correctOptionId": "opt-k1-mat-e4-1",
    "explanation": {
      "th": "หนึ่ง สอง สาม มีกล้วย 3 ผล ยอดเยี่ยมครับ!",
      "en": "Awesome! 1, 2, 3 bananas!",
      "zh": "真棒！一共有 3 根香蕉。"
    }
  },
  {
    "id": "k1-mat-e5",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "ต้นไม้ต้นใดมีผลไม้ \"มากกว่า\"? 🌳 (3 ผล) 🆚 🌳 (1 ผล)",
      "en": "Which tree has \"More\" fruits? 🌳 (3 fruits) vs 🌳 (1 fruit)",
      "zh": "哪一棵树上的果子“更多”？🌳 (3颗) 🆚 🌳 (1颗)"
    },
    "illustration": "🍎🍎🍎 🆚 🍎",
    "illustrationSubtitle": {
      "th": "เปรียบเทียบ มากกว่า-น้อยกว่า",
      "en": "Compare: More vs Less",
      "zh": "比较多与少"
    },
    "options": [
      {
        "id": "opt-k1-mat-e5-1",
        "label": {
          "th": "ต้นไม้ที่มี 1 ผล",
          "en": "Tree with 1 fruit",
          "zh": "只有1颗果子的树"
        },
        "icon": "🌳"
      },
      {
        "id": "opt-k1-mat-e5-2",
        "label": {
          "th": "ต้นไม้ที่มี 3 ผล",
          "en": "Tree with 3 fruits",
          "zh": "结了3颗果子的树"
        },
        "icon": "🌳"
      },
      {
        "id": "opt-k1-mat-e5-3",
        "label": {
          "th": "เท่ากัน",
          "en": "Equal",
          "zh": "一样多"
        },
        "icon": "⚖️"
      }
    ],
    "correctOptionId": "opt-k1-mat-e5-2",
    "explanation": {
      "th": "3 ผล ย่อมมากกว่า 1 ผล เก่งมากครับ!",
      "en": "Correct! 3 is more than 1.",
      "zh": "答对了！3 颗果子比 1 颗更多。"
    }
  },
  {
    "id": "k1-mat-e6",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "รูปทรงใดมีลักษณะเป็น \"สามเหลี่ยม\" เหมือนหลังคาบ้าน? 🔺",
      "en": "Which shape is a \"Triangle\" like a house roof? 🔺",
      "zh": "哪一个形状是像屋顶一样的“三角形”？🔺"
    },
    "illustration": "🔺 🏠 🔺",
    "illustrationSubtitle": {
      "th": "สามเหลี่ยมมี 3 มุม 3 ด้าน",
      "en": "Triangle shape",
      "zh": "三角形"
    },
    "options": [
      {
        "id": "opt-k1-mat-e6-1",
        "label": {
          "th": "สี่เหลี่ยม 🟦",
          "en": "Square",
          "zh": "正方形"
        },
        "icon": "🟦"
      },
      {
        "id": "opt-k1-mat-e6-2",
        "label": {
          "th": "วงกลม 🟡",
          "en": "Circle",
          "zh": "圆形"
        },
        "icon": "🟡"
      },
      {
        "id": "opt-k1-mat-e6-3",
        "label": {
          "th": "สามเหลี่ยม 🔺",
          "en": "Triangle",
          "zh": "三角形"
        },
        "icon": "🔺"
      }
    ],
    "correctOptionId": "opt-k1-mat-e6-3",
    "explanation": {
      "th": "สามเหลี่ยมมี 3 ด้าน 3 มุม ถูกต้องนะคร้าบ!",
      "en": "Correct! A triangle has 3 sides.",
      "zh": "太棒了！三角形有三条边三个角。"
    }
  },
  {
    "id": "k1-mat-e7",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "เปรียบเทียบความสูง: สัตว์ชนิดใด \"สูงกว่า\"? 🦒 🆚 🐶",
      "en": "Compare height: Which animal is \"Taller\"? 🦒 🆚 🐶",
      "zh": "比较身高：哪一种动物“更高”？🦒 🆚 🐶"
    },
    "illustration": "🦒 🆚 🐶",
    "illustrationSubtitle": {
      "th": "สูงกว่า กับ เตี้ยกว่า",
      "en": "Tall vs Short",
      "zh": "比较高矮"
    },
    "options": [
      {
        "id": "opt-k1-mat-e7-1",
        "label": {
          "th": "ยีราฟคอยาว",
          "en": "Tall giraffe",
          "zh": "长颈鹿"
        },
        "icon": "🦒"
      },
      {
        "id": "opt-k1-mat-e7-2",
        "label": {
          "th": "ลูกสุนัข",
          "en": "Puppy",
          "zh": "小狗"
        },
        "icon": "🐶"
      },
      {
        "id": "opt-k1-mat-e7-3",
        "label": {
          "th": "สูงเท่ากัน",
          "en": "Same height",
          "zh": "一样高"
        },
        "icon": "⚖️"
      }
    ],
    "correctOptionId": "opt-k1-mat-e7-1",
    "explanation": {
      "th": "ยีราฟมีคอยาว จึงสูงกว่าสุนัขมาก เก่งมากครับ!",
      "en": "Right! The giraffe is taller!",
      "zh": "答对啦！长颈鹿长得最高。"
    }
  },
  {
    "id": "k1-mat-e8",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "สิ่งของชนิดใดมี \"น้ำหนักเบากว่า\"? 🎈 🆚 🪨",
      "en": "Which item is \"Lighter\"? 🎈 🆚 🪨",
      "zh": "哪一样东西“更轻”？🎈 🆚 🪨"
    },
    "illustration": "🎈 🆚 🪨",
    "illustrationSubtitle": {
      "th": "หนัก กับ เบา",
      "en": "Heavy vs Light",
      "zh": "轻与重"
    },
    "options": [
      {
        "id": "opt-k1-mat-e8-1",
        "label": {
          "th": "ก้อนหินใหญ่",
          "en": "Big rock",
          "zh": "大石头"
        },
        "icon": "🪨"
      },
      {
        "id": "opt-k1-mat-e8-2",
        "label": {
          "th": "ลูกโป่งสวรรค์",
          "en": "Balloon",
          "zh": "轻飘飘的气球"
        },
        "icon": "🎈"
      },
      {
        "id": "opt-k1-mat-e8-3",
        "label": {
          "th": "หนักเท่ากัน",
          "en": "Same weight",
          "zh": "一样重"
        },
        "icon": "⚖️"
      }
    ],
    "correctOptionId": "opt-k1-mat-e8-2",
    "explanation": {
      "th": "ลูกโป่งลอยลมได้เพราะมีน้ำหนักเบามาก เก่งมากครับ!",
      "en": "Correct! The balloon is much lighter.",
      "zh": "答对了！气球比石头轻很多。"
    }
  },
  {
    "id": "k1-mat-e9",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "รูปภาพลูกบอล ⚽ มีรูปทรงเรขาคณิตแบบใด?",
      "en": "What shape is this soccer ball ⚽?",
      "zh": "这个足球 ⚽ 是什么几何形状？"
    },
    "illustration": "⚽ ⚽ ⚽",
    "illustrationSubtitle": {
      "th": "ลูกบอลกลม",
      "en": "Ball shape",
      "zh": "球体圆形"
    },
    "options": [
      {
        "id": "opt-k1-mat-e9-1",
        "label": {
          "th": "สี่เหลี่ยม",
          "en": "Square",
          "zh": "正方形"
        },
        "icon": "🟦"
      },
      {
        "id": "opt-k1-mat-e9-2",
        "label": {
          "th": "สามเหลี่ยม",
          "en": "Triangle",
          "zh": "三角形"
        },
        "icon": "🔺"
      },
      {
        "id": "opt-k1-mat-e9-3",
        "label": {
          "th": "ทรงกลม / วงกลม",
          "en": "Sphere / Circle",
          "zh": "圆形 / 球形"
        },
        "icon": "⚽"
      }
    ],
    "correctOptionId": "opt-k1-mat-e9-3",
    "explanation": {
      "th": "ลูกบอลมีรูปทรงกลมกลิ้งไปมาได้ ถูกต้องครับ!",
      "en": "Right! Balls are round spheres.",
      "zh": "答对啦！足球是圆圆的。"
    }
  },
  {
    "id": "k1-mat-e10",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "ตัวเลข \"1\" ในภาพ ตรงกับจำนวนนิ้วมือข้อใด? ☝️",
      "en": "Which hand shows number \"1\"? ☝️",
      "zh": "手势中哪一个代表数字“1”？☝️"
    },
    "illustration": "1️⃣ ☝️ 1️⃣",
    "illustrationSubtitle": {
      "th": "ตัวเลขอารบิก 1",
      "en": "Number 1",
      "zh": "数字 1"
    },
    "options": [
      {
        "id": "opt-k1-mat-e10-1",
        "label": {
          "th": "ชู 1 นิ้ว ☝️",
          "en": "1 finger",
          "zh": "竖起 1 根手指"
        },
        "icon": "☝️"
      },
      {
        "id": "opt-k1-mat-e10-2",
        "label": {
          "th": "ชู 2 นิ้ว ✌️",
          "en": "2 fingers",
          "zh": "竖起 2 根手指"
        },
        "icon": "✌️"
      },
      {
        "id": "opt-k1-mat-e10-3",
        "label": {
          "th": "ชู 3 นิ้ว 🤟",
          "en": "3 fingers",
          "zh": "竖起 3 根手指"
        },
        "icon": "🤟"
      }
    ],
    "correctOptionId": "opt-k1-mat-e10-1",
    "explanation": {
      "th": "เลขหนึ่ง ชูนิ้วชี้ 1 นิ้ว ถูกต้องเลยครับ!",
      "en": "Awesome! One finger up means 1.",
      "zh": "太棒了！1 根手指代表 1。"
    }
  },
  {
    "id": "k1-mat-m1",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "นับจำนวนดาวสีทอง: มีดาวทั้งหมดกี่ดวง? ⭐ ⭐ ⭐ ⭐",
      "en": "Count the gold stars: How many stars are there? ⭐ ⭐ ⭐ ⭐",
      "zh": "数一数金色的小星星：一共有几颗小星星？⭐ ⭐ ⭐ ⭐"
    },
    "illustration": "⭐ ⭐ ⭐ ⭐",
    "illustrationSubtitle": {
      "th": "นับจำนวน 1 ถึง 4",
      "en": "Count 1 to 4",
      "zh": "数数 1 到 4"
    },
    "options": [
      {
        "id": "opt-k1-mat-m1-1",
        "label": {
          "th": "3 ดวง",
          "en": "3 stars",
          "zh": "3 颗"
        },
        "icon": "3️⃣"
      },
      {
        "id": "opt-k1-mat-m1-2",
        "label": {
          "th": "4 ดวง",
          "en": "4 stars",
          "zh": "4 颗"
        },
        "icon": "4️⃣"
      },
      {
        "id": "opt-k1-mat-m1-3",
        "label": {
          "th": "5 ดวง",
          "en": "5 stars",
          "zh": "5 颗"
        },
        "icon": "5️⃣"
      }
    ],
    "correctOptionId": "opt-k1-mat-m1-2",
    "explanation": {
      "th": "หนึ่ง สอง สาม สี่ มีดาว 4 ดวง เก่งมากครับ!",
      "en": "Correct! There are 4 stars.",
      "zh": "答对啦！数一数是 4 颗星星。"
    }
  },
  {
    "id": "k1-mat-m2",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "นับจำนวนนิ้วมือในหนึ่งฝ่ามือ 🖐️ มีนิ้วมือกี่นิ้ว?",
      "en": "Count fingers on one hand 🖐️: How many fingers?",
      "zh": "数一数一只小手 🖐️ 上一共有几根手指？"
    },
    "illustration": "🖐️ 🖐️ 🖐️",
    "illustrationSubtitle": {
      "th": "นิ้วมือ 5 นิ้ว",
      "en": "5 fingers",
      "zh": "5 根手指"
    },
    "options": [
      {
        "id": "opt-k1-mat-m2-1",
        "label": {
          "th": "3 นิ้ว",
          "en": "3 fingers",
          "zh": "3 根"
        },
        "icon": "3️⃣"
      },
      {
        "id": "opt-k1-mat-m2-2",
        "label": {
          "th": "4 นิ้ว",
          "en": "4 fingers",
          "zh": "4 根"
        },
        "icon": "4️⃣"
      },
      {
        "id": "opt-k1-mat-m2-3",
        "label": {
          "th": "5 นิ้ว",
          "en": "5 fingers",
          "zh": "5 根"
        },
        "icon": "5️⃣"
      }
    ],
    "correctOptionId": "opt-k1-mat-m2-3",
    "explanation": {
      "th": "หนึ่งฝ่ามือของหนูมี 5 นิ้ว ยอดเยี่ยมครับ!",
      "en": "Right! We have 5 fingers on one hand.",
      "zh": "答对了！一只手有 5 根手指。"
    }
  },
  {
    "id": "k1-mat-m3",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "อนุกรมรูปทรงสลับกัน: 🔴 🟦 🔴 🟦 ชิ้นต่อไปคืออะไร?",
      "en": "Pattern: 🔴 🟦 🔴 🟦 What comes next?",
      "zh": "找规律：🔴 🟦 🔴 🟦 接下来的图形是什么？"
    },
    "illustration": "🔴 🟦 🔴 🟦 ❓",
    "illustrationSubtitle": {
      "th": "แบบรูปซ้ำสองสี",
      "en": "Repeating pattern",
      "zh": "红蓝交替规律"
    },
    "options": [
      {
        "id": "opt-k1-mat-m3-1",
        "label": {
          "th": "วงกลมสีแดง 🔴",
          "en": "Red circle 🔴",
          "zh": "红色圆形 🔴"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k1-mat-m3-2",
        "label": {
          "th": "สี่เหลี่ยมสีฟ้า 🟦",
          "en": "Blue square 🟦",
          "zh": "蓝色正方形 🟦"
        },
        "icon": "🟦"
      },
      {
        "id": "opt-k1-mat-m3-3",
        "label": {
          "th": "สามเหลี่ยมสีเขียว 🔺",
          "en": "Green triangle 🔺",
          "zh": "绿色三角形 🔺"
        },
        "icon": "🔺"
      }
    ],
    "correctOptionId": "opt-k1-mat-m3-1",
    "explanation": {
      "th": "แดง ฟ้า แดง ฟ้า ชิ้นต่อไปคือสีแดง 🔴 เก่งมากครับ!",
      "en": "Correct! Red comes next in the pattern.",
      "zh": "太棒啦！接下来是红色圆形 🔴。"
    }
  },
  {
    "id": "k1-mat-m4",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "เปรียบเทียบความยาว: สิ่งของใด \"ยาวกว่า\"? 📏 (ไม้บรรทัด) 🆚 ✏️ (เศษดินสอสั้น)",
      "en": "Compare length: Which item is \"Longer\"? 📏 vs ✏️",
      "zh": "比较长短：哪一件物品“更长”？📏 🆚 ✏️"
    },
    "illustration": "📏 🆚 ✏️",
    "illustrationSubtitle": {
      "th": "ยาวกว่า กับ สั้นกว่า",
      "en": "Long vs Short",
      "zh": "长与短"
    },
    "options": [
      {
        "id": "opt-k1-mat-m4-1",
        "label": {
          "th": "เศษดินสอที่เหลาจนกุด",
          "en": "Short stub pencil",
          "zh": "用短的铅笔头"
        },
        "icon": "✏️"
      },
      {
        "id": "opt-k1-mat-m4-2",
        "label": {
          "th": "ไม้บรรทัดยาว",
          "en": "Long ruler",
          "zh": "长尺子"
        },
        "icon": "📏"
      },
      {
        "id": "opt-k1-mat-m4-3",
        "label": {
          "th": "ยาวเท่ากัน",
          "en": "Equal",
          "zh": "一样长"
        },
        "icon": "⚖️"
      }
    ],
    "correctOptionId": "opt-k1-mat-m4-2",
    "explanation": {
      "th": "ไม้บรรทัดยาวกว่าเศษดินสอสั้น เก่งมากครับ!",
      "en": "Correct! The ruler is longer.",
      "zh": "答对啦！长尺子比短铅笔头长。"
    }
  },
  {
    "id": "k1-mat-m5",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "สิ่งของใดต่อไปนี้มี \"สีแดง\"? 🍓 🍌 🥦",
      "en": "Which item is \"Red\"? 🍓 🍌 🥦",
      "zh": "下列哪一样水果蔬菜是“红色”的？🍓 🍌 🥦"
    },
    "illustration": "🍓 🍌 🥦",
    "illustrationSubtitle": {
      "th": "แยกแยะสีพื้นฐาน",
      "en": "Identify colors",
      "zh": "辨识颜色"
    },
    "options": [
      {
        "id": "opt-k1-mat-m5-1",
        "label": {
          "th": "กล้วยหอม",
          "en": "Banana",
          "zh": "香蕉"
        },
        "icon": "🍌"
      },
      {
        "id": "opt-k1-mat-m5-2",
        "label": {
          "th": "บรอกโคลี",
          "en": "Broccoli",
          "zh": "西蓝花"
        },
        "icon": "🥦"
      },
      {
        "id": "opt-k1-mat-m5-3",
        "label": {
          "th": "สตรอว์เบอร์รี",
          "en": "Strawberry",
          "zh": "草莓"
        },
        "icon": "🍓"
      }
    ],
    "correctOptionId": "opt-k1-mat-m5-3",
    "explanation": {
      "th": "สตรอว์เบอร์รีสุกมีสีแดงสดใส เก่งมากครับ!",
      "en": "Right! Strawberries are red!",
      "zh": "答对了！草莓是红色的。"
    }
  },
  {
    "id": "k1-mat-m6",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "กล่องของขวัญ 🎁 มีรูปทรงเรขาคณิตคล้ายกับรูปใด?",
      "en": "Which shape does this gift box 🎁 resemble?",
      "zh": "这个礼品盒 🎁 看起来最像哪一种几何图形？"
    },
    "illustration": "🎁 🟦 🎁",
    "illustrationSubtitle": {
      "th": "ทรงสี่เหลี่ยมลูกบาศก์",
      "en": "Square / Cube shape",
      "zh": "正方形 / 立方体"
    },
    "options": [
      {
        "id": "opt-k1-mat-m6-1",
        "label": {
          "th": "สี่เหลี่ยม 🟦",
          "en": "Square",
          "zh": "正方形 🟦"
        },
        "icon": "🟦"
      },
      {
        "id": "opt-k1-mat-m6-2",
        "label": {
          "th": "วงกลม 🟡",
          "en": "Circle",
          "zh": "圆形 🟡"
        },
        "icon": "🟡"
      },
      {
        "id": "opt-k1-mat-m6-3",
        "label": {
          "th": "สามเหลี่ยม 🔺",
          "en": "Triangle",
          "zh": "三角形 🔺"
        },
        "icon": "🔺"
      }
    ],
    "correctOptionId": "opt-k1-mat-m6-1",
    "explanation": {
      "th": "กล่องของขวัญมีด้านเป็นรูปสี่เหลี่ยม เก่งมากครับ!",
      "en": "Spot on! The gift box has square faces.",
      "zh": "太棒了！礼盒面是正方形。"
    }
  },
  {
    "id": "k1-mat-m7",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "ตัวเลขอารบิก \"3\" ตรงกับตัวเลขไทยตัวใด?",
      "en": "Which Thai numeral corresponds to Arabic numeral \"3\"?",
      "zh": "阿拉伯数字“3”对应哪一个泰语传统数字？"
    },
    "illustration": "3️⃣ 🇹🇭 3️⃣",
    "illustrationSubtitle": {
      "th": "ตัวเลขอารบิกและเลขไทย",
      "en": "Arabic & Thai numerals",
      "zh": "阿拉伯数字与泰语数字"
    },
    "options": [
      {
        "id": "opt-k1-mat-m7-1",
        "label": {
          "th": "๑ (หนึ่ง)",
          "en": "One (1)",
          "zh": "๑ (数字1)"
        },
        "icon": "1️⃣"
      },
      {
        "id": "opt-k1-mat-m7-2",
        "label": {
          "th": "๓ (สาม)",
          "en": "Three (3)",
          "zh": "๓ (数字3)"
        },
        "icon": "3️⃣"
      },
      {
        "id": "opt-k1-mat-m7-3",
        "label": {
          "th": "๕ (ห้า)",
          "en": "Five (5)",
          "zh": "๕ (数字5)"
        },
        "icon": "5️⃣"
      }
    ],
    "correctOptionId": "opt-k1-mat-m7-2",
    "explanation": {
      "th": "เลข 3 อารบิก ตรงกับ เลข ๓ ไทย เก่งมากครับ!",
      "en": "Correct! 3 corresponds to ๓ in Thai.",
      "zh": "答对啦！3 对应泰文数字 ๓。"
    }
  },
  {
    "id": "k1-mat-m8",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "มีส้ม 1 ผล 🍊 คุณแม่ให้อีก 1 ผล 🍊 รวมมีส้มกี่ผล?",
      "en": "You have 1 orange 🍊. Mom gives you 1 more 🍊. How many in total?",
      "zh": "你手里有 1 个橙子 🍊，妈妈又给了你 1 个 🍊。一共有几个橙子？"
    },
    "illustration": "🍊 + 🍊",
    "illustrationSubtitle": {
      "th": "การรวมกลุ่มสิ่งของ",
      "en": "Adding 1 + 1",
      "zh": "加法 1 + 1"
    },
    "options": [
      {
        "id": "opt-k1-mat-m8-1",
        "label": {
          "th": "1 ผล",
          "en": "1 orange",
          "zh": "1 个"
        },
        "icon": "1️⃣"
      },
      {
        "id": "opt-k1-mat-m8-2",
        "label": {
          "th": "3 ผล",
          "en": "3 oranges",
          "zh": "3 个"
        },
        "icon": "3️⃣"
      },
      {
        "id": "opt-k1-mat-m8-3",
        "label": {
          "th": "2 ผล",
          "en": "2 oranges",
          "zh": "2 个"
        },
        "icon": "2️⃣"
      }
    ],
    "correctOptionId": "opt-k1-mat-m8-3",
    "explanation": {
      "th": "1 รวมกับ 1 ได้ 2 ผล เก่งมากครับ!",
      "en": "Awesome! 1 + 1 = 2 oranges.",
      "zh": "太棒了！1 加 1 等于 2。"
    }
  },
  {
    "id": "k1-mat-m9",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "สิ่งของชนิดใดมีรูปทรงเป็น \"รูปหัวใจ\"? 💖",
      "en": "Which item has a \"Heart\" shape? 💖",
      "zh": "下列哪一样物品是可爱的“爱心形”？💖"
    },
    "illustration": "💖 🍫 💖",
    "illustrationSubtitle": {
      "th": "รูปทรงหัวใจสื่อความรัก",
      "en": "Heart shape",
      "zh": "心形"
    },
    "options": [
      {
        "id": "opt-k1-mat-m9-1",
        "label": {
          "th": "ช็อกโกแลตรูปหัวใจ 💖",
          "en": "Heart chocolate",
          "zh": "心形巧克力"
        },
        "icon": "💖"
      },
      {
        "id": "opt-k1-mat-m9-2",
        "label": {
          "th": "นาฬิกาแขวนกลม 🕒",
          "en": "Round clock",
          "zh": "圆挂钟"
        },
        "icon": "🕒"
      },
      {
        "id": "opt-k1-mat-m9-3",
        "label": {
          "th": "สมุดโน้ตสี่เหลี่ยม 📒",
          "en": "Square notebook",
          "zh": "方笔记本"
        },
        "icon": "📒"
      }
    ],
    "correctOptionId": "opt-k1-mat-m9-1",
    "explanation": {
      "th": "รูปหัวใจสื่อถึงความรัก เก่งมากครับ!",
      "en": "Correct! The chocolate has a heart shape.",
      "zh": "答对了！巧克力是心形的。"
    }
  },
  {
    "id": "k1-mat-m10",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "มีลูกอม 2 เม็ด 🍬 🍬 กินไป 1 เม็ด 😋 จะเหลือกี่เม็ด?",
      "en": "You have 2 candies 🍬 🍬. You eat 1 😋. How many are left?",
      "zh": "你有 2 颗糖果 🍬 🍬，吃掉了 1 颗 😋，还剩下几颗？"
    },
    "illustration": "🍬 🍬 - 🍬",
    "illustrationSubtitle": {
      "th": "การเอาออก (ลบ)",
      "en": "Taking away 1",
      "zh": "减法 2 减 1"
    },
    "options": [
      {
        "id": "opt-k1-mat-m10-1",
        "label": {
          "th": "2 เม็ด",
          "en": "2 candies",
          "zh": "2 颗"
        },
        "icon": "2️⃣"
      },
      {
        "id": "opt-k1-mat-m10-2",
        "label": {
          "th": "1 เม็ด",
          "en": "1 candy",
          "zh": "1 颗"
        },
        "icon": "1️⃣"
      },
      {
        "id": "opt-k1-mat-m10-3",
        "label": {
          "th": "0 เม็ด",
          "en": "0 candies",
          "zh": "0 颗"
        },
        "icon": "0️⃣"
      }
    ],
    "correctOptionId": "opt-k1-mat-m10-2",
    "explanation": {
      "th": "มี 2 กินไป 1 เหลือ 1 เม็ด เก่งมากครับ!",
      "en": "Right! 2 - 1 = 1 candy left.",
      "zh": "答对啦！2 减 1 剩下 1 颗糖。"
    }
  },
  {
    "id": "k1-mat-h1",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "เรียงลำดับจำนวนจาก \"น้อยไปหามาก\": 1, 2, ... ตัวเลขต่อไปคือเลขใด?",
      "en": "Order from smallest to largest: 1, 2, ... What is next?",
      "zh": "从小到大按顺序排列数字：1, 2, ... 接下来的数字是几？"
    },
    "illustration": "1️⃣ ➡️ 2️⃣ ➡️ ❓",
    "illustrationSubtitle": {
      "th": "เรียงลำดับตัวเลข 1 ถึง 3",
      "en": "Count up order",
      "zh": "升序数数"
    },
    "options": [
      {
        "id": "opt-k1-mat-h1-1",
        "label": {
          "th": "4",
          "en": "Four",
          "zh": "4"
        },
        "icon": "4️⃣"
      },
      {
        "id": "opt-k1-mat-h1-2",
        "label": {
          "th": "0",
          "en": "Zero",
          "zh": "0"
        },
        "icon": "0️⃣"
      },
      {
        "id": "opt-k1-mat-h1-3",
        "label": {
          "th": "3",
          "en": "Three",
          "zh": "3"
        },
        "icon": "3️⃣"
      }
    ],
    "correctOptionId": "opt-k1-mat-h1-3",
    "explanation": {
      "th": "หนึ่ง สอง แล้วก็ สาม ยอดเยี่ยมมากครับ!",
      "en": "Spot on! 1, 2, then 3.",
      "zh": "太棒了！1, 2, 接下来是 3。"
    }
  },
  {
    "id": "k1-mat-h2",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "ในจานมีคุกกี้ 3 ชิ้น 🍪 🍪 🍪 เพิ่มเข้ามาอีก 1 ชิ้น 🍪 รวมมีคุกกี้กี่ชิ้น?",
      "en": "3 cookies on a plate 🍪 🍪 🍪. Add 1 more 🍪. How many now?",
      "zh": "盘子里有 3 块饼干 🍪 🍪 🍪，又拿来 1 块 🍪。现在一共有几块？"
    },
    "illustration": "🍪🍪🍪 + 🍪",
    "illustrationSubtitle": {
      "th": "3 บวก 1 เท่ากับเท่าไร",
      "en": "3 + 1 = ?",
      "zh": "加法 3 加 1"
    },
    "options": [
      {
        "id": "opt-k1-mat-h2-1",
        "label": {
          "th": "4 ชิ้น",
          "en": "4 cookies",
          "zh": "4 块"
        },
        "icon": "4️⃣"
      },
      {
        "id": "opt-k1-mat-h2-2",
        "label": {
          "th": "5 ชิ้น",
          "en": "5 cookies",
          "zh": "5 块"
        },
        "icon": "5️⃣"
      },
      {
        "id": "opt-k1-mat-h2-3",
        "label": {
          "th": "2 ชิ้น",
          "en": "2 cookies",
          "zh": "2 块"
        },
        "icon": "2️⃣"
      }
    ],
    "correctOptionId": "opt-k1-mat-h2-1",
    "explanation": {
      "th": "3 ชิ้น รวมกับ 1 ชิ้น เป็น 4 ชิ้น เก่งมากครับ!",
      "en": "Correct! 3 + 1 = 4 cookies.",
      "zh": "答对啦！3 加 1 等于 4。"
    }
  },
  {
    "id": "k1-mat-h3",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "รูปภาพใดแสดงจำนวนสิ่งของที่ \"เท่ากัน\" (2 ชิ้นเท่ากัน)? ⚖️",
      "en": "Which pair has an \"Equal\" amount (2 = 2)? ⚖️",
      "zh": "哪一组物品的数量是“一样多”（相等）的？⚖️"
    },
    "illustration": "⚖️ 🍎🍎 🆚 🍊🍊",
    "illustrationSubtitle": {
      "th": "การเปรียบเทียบความเท่ากัน",
      "en": "Equal quantities",
      "zh": "数量相等"
    },
    "options": [
      {
        "id": "opt-k1-mat-h3-1",
        "label": {
          "th": "แอปเปิ้ล 3 ผล กับ ส้ม 1 ผล",
          "en": "3 apples and 1 orange",
          "zh": "3个苹果和1个橙子"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k1-mat-h3-2",
        "label": {
          "th": "แอปเปิ้ล 2 ผล กับ ส้ม 2 ผล",
          "en": "2 apples and 2 oranges",
          "zh": "2个苹果和2个橙子"
        },
        "icon": "⚖️"
      },
      {
        "id": "opt-k1-mat-h3-3",
        "label": {
          "th": "แอปเปิ้ล 1 ผล กับ ส้ม 4 ผล",
          "en": "1 apple and 4 oranges",
          "zh": "1个苹果和4个橙子"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k1-mat-h3-2",
    "explanation": {
      "th": "2 เท่ากับ 2 สองฝั่งเท่ากันพอดี เก่งมากครับ!",
      "en": "Right! 2 apples equals 2 oranges.",
      "zh": "答对了！2 个苹果等于 2 个橙子。"
    }
  },
  {
    "id": "k1-mat-h4",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "รูปทรงใดมี \"มุมแหลม 3 มุม\" และ \"ด้าน 3 ด้าน\"? 📐",
      "en": "Which shape has 3 sharp corners and 3 straight sides? 📐",
      "zh": "哪一个几何形状具有“3 个尖尖的角”和“3 条直直的边”？📐"
    },
    "illustration": "📐 🔺 📐",
    "illustrationSubtitle": {
      "th": "คุณสมบัติของรูปทรง",
      "en": "3 corners and 3 sides",
      "zh": "三角形特征"
    },
    "options": [
      {
        "id": "opt-k1-mat-h4-1",
        "label": {
          "th": "วงรี",
          "en": "Oval",
          "zh": "椭圆形"
        },
        "icon": "🥚"
      },
      {
        "id": "opt-k1-mat-h4-2",
        "label": {
          "th": "สี่เหลี่ยมผืนผ้า",
          "en": "Rectangle",
          "zh": "长方形"
        },
        "icon": "🧱"
      },
      {
        "id": "opt-k1-mat-h4-3",
        "label": {
          "th": "สามเหลี่ยม 🔺",
          "en": "Triangle",
          "zh": "三角形 🔺"
        },
        "icon": "🔺"
      }
    ],
    "correctOptionId": "opt-k1-mat-h4-3",
    "explanation": {
      "th": "สามเหลี่ยม มี 3 ด้านและ 3 มุม ถูกต้องครับ!",
      "en": "Spot on! Triangles have 3 sides and 3 angles.",
      "zh": "答对啦！三角形有3个角和3条边。"
    }
  },
  {
    "id": "k1-mat-h5",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "สิ่งของใดอยู่ใน \"ตำแหน่งข้างบน\" บนโต๊ะ? 💡 (โคมไฟบนโต๊ะ) 🆚 🗑️ (ถังขยะใต้โต๊ะ)",
      "en": "Which item is \"On top\" of the table? 💡 vs 🗑️",
      "zh": "哪一件物品摆放在桌子的“上面”？💡 🆚 🗑️"
    },
    "illustration": "💡 🛋️ 🗑️",
    "illustrationSubtitle": {
      "th": "ทิศทาง ตำแหน่ง ข้างบน-ข้างล่าง",
      "en": "Position: Above vs Below",
      "zh": "位置：上面与下面"
    },
    "options": [
      {
        "id": "opt-k1-mat-h5-1",
        "label": {
          "th": "โคมไฟตั้งโต๊ะ 💡",
          "en": "Desk lamp on table",
          "zh": "桌上的台灯 💡"
        },
        "icon": "💡"
      },
      {
        "id": "opt-k1-mat-h5-2",
        "label": {
          "th": "ถังขยะใต้โต๊ะ 🗑️",
          "en": "Trash can under table",
          "zh": "桌下的垃圾桶"
        },
        "icon": "🗑️"
      },
      {
        "id": "opt-k1-mat-h5-3",
        "label": {
          "th": "พรมปูพื้น",
          "en": "Rug on floor",
          "zh": "地上的地毯"
        },
        "icon": "🟫"
      }
    ],
    "correctOptionId": "opt-k1-mat-h5-1",
    "explanation": {
      "th": "โคมไฟวางอยู่ข้างบนโต๊ะ เก่งมากครับ!",
      "en": "Correct! The lamp is on top of the table.",
      "zh": "太棒了！台灯摆在桌子上面。"
    }
  },
  {
    "id": "k1-mat-h6",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "อนุกรมขนาด: 🟢 (เล็ก) ➡️ 🟢 (กลาง) ➡️ ลูกต่อไปควรเป็นขนาดใด?",
      "en": "Size pattern: 🟢 (Small) ➡️ 🟢 (Medium) ➡️ What is next?",
      "zh": "尺寸规律：🟢 (小) ➡️ 🟢 (中) ➡️ 接下来的球应该是什么尺寸？"
    },
    "illustration": "🟢 🟢 ❓",
    "illustrationSubtitle": {
      "th": "เรียงลำดับขนาด เล็ก กลาง ใหญ่",
      "en": "Small, Medium, Large",
      "zh": "从小到大排列"
    },
    "options": [
      {
        "id": "opt-k1-mat-h6-1",
        "label": {
          "th": "ขนาดเล็กจิ๋ว",
          "en": "Tiny",
          "zh": "微小"
        },
        "icon": "▫️"
      },
      {
        "id": "opt-k1-mat-h6-2",
        "label": {
          "th": "ขนาดใหญ่โต 🟢",
          "en": "Large circle",
          "zh": "大号圆球 🟢"
        },
        "icon": "🟢"
      },
      {
        "id": "opt-k1-mat-h6-3",
        "label": {
          "th": "ขนาดเล็กเท่าเดิม",
          "en": "Small again",
          "zh": "还是小号"
        },
        "icon": "🟢"
      }
    ],
    "correctOptionId": "opt-k1-mat-h6-2",
    "explanation": {
      "th": "เล็ก กลาง แล้วก็ ใหญ่ ยอดเยี่ยมมากครับ!",
      "en": "Right! Small, medium, then large.",
      "zh": "答对了！小、中、接下来是大号。"
    }
  },
  {
    "id": "k1-mat-h7",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "ลูกโป่งมี 4 ลูก 🎈 🎈 🎈 🎈 ลอยแตกไป 1 ลูก 💥 เหลือลูกโป่งกี่ลูก?",
      "en": "You have 4 balloons 🎈. 1 pops 💥. How many are left?",
      "zh": "手里有 4 个气球 🎈，破掉了 1 个 💥。还剩下几个气球？"
    },
    "illustration": "🎈🎈🎈🎈 - 💥",
    "illustrationSubtitle": {
      "th": "4 ลบ 1 เหลือเท่าไร",
      "en": "4 - 1 = ?",
      "zh": "减法 4 减 1"
    },
    "options": [
      {
        "id": "opt-k1-mat-h7-1",
        "label": {
          "th": "1 ลูก",
          "en": "1 balloon",
          "zh": "1 个"
        },
        "icon": "1️⃣"
      },
      {
        "id": "opt-k1-mat-h7-2",
        "label": {
          "th": "2 ลูก",
          "en": "2 balloons",
          "zh": "2 个"
        },
        "icon": "2️⃣"
      },
      {
        "id": "opt-k1-mat-h7-3",
        "label": {
          "th": "3 ลูก",
          "en": "3 balloons",
          "zh": "3 个"
        },
        "icon": "3️⃣"
      }
    ],
    "correctOptionId": "opt-k1-mat-h7-3",
    "explanation": {
      "th": "4 หักออก 1 เหลือ 3 ลูก เก่งมากครับ!",
      "en": "Awesome! 4 - 1 = 3 balloons.",
      "zh": "太棒了！4 减 1 剩下 3 个气球。"
    }
  },
  {
    "id": "k1-mat-h8",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "สัตว์ชนิดใดมีจำนวนขา \"มากที่สุด\"? 🐟 (0 ขา) 🐥 (2 ขา) 🐶 (4 ขา)",
      "en": "Which animal has the \"Most\" legs? 🐟 (0) vs 🐥 (2) vs 🐶 (4)",
      "zh": "下列哪一种动物的腿“最多”？🐟 (0条) 🐥 (2条) 🐶 (4条)"
    },
    "illustration": "🐟 🐥 🐶",
    "illustrationSubtitle": {
      "th": "นับจำนวนขาเปรียบเทียบ",
      "en": "Compare number of legs",
      "zh": "比较腿的数量"
    },
    "options": [
      {
        "id": "opt-k1-mat-h8-1",
        "label": {
          "th": "สุนัข (มี 4 ขา)",
          "en": "Dog (4 legs)",
          "zh": "小狗（有 4 条腿）"
        },
        "icon": "🐶"
      },
      {
        "id": "opt-k1-mat-h8-2",
        "label": {
          "th": "ลูกเจี๊ยบ (มี 2 ขา)",
          "en": "Chick (2 legs)",
          "zh": "小鸡（有 2 条腿）"
        },
        "icon": "🐥"
      },
      {
        "id": "opt-k1-mat-h8-3",
        "label": {
          "th": "ปลา (มี 0 ขา)",
          "en": "Fish (0 legs)",
          "zh": "鱼（没有腿）"
        },
        "icon": "🐟"
      }
    ],
    "correctOptionId": "opt-k1-mat-h8-1",
    "explanation": {
      "th": "สุนัขมี 4 ขา มากกว่าไก่และปลา ถูกต้องครับ!",
      "en": "Correct! Dogs have 4 legs.",
      "zh": "答对啦！小狗有 4 条腿最多。"
    }
  },
  {
    "id": "k1-mat-h9",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "สิ่งของใดอยู่ใน \"ตำแหน่งข้างใน\" ตะกร้า? 🧺",
      "en": "Which item is \"Inside\" the basket? 🧺",
      "zh": "哪样东西放在果篮的“里面”？🧺"
    },
    "illustration": "🧺 🍎 🧺",
    "illustrationSubtitle": {
      "th": "ข้างใน กับ ข้างนอก",
      "en": "Inside vs Outside",
      "zh": "里面与外面"
    },
    "options": [
      {
        "id": "opt-k1-mat-h9-1",
        "label": {
          "th": "นกที่บินอยู่บนฟ้า",
          "en": "Bird in sky",
          "zh": "天上的小鸟"
        },
        "icon": "🐦"
      },
      {
        "id": "opt-k1-mat-h9-2",
        "label": {
          "th": "ผลแอปเปิ้ลที่นอนอยู่ในตะกร้า 🍎",
          "en": "Apple inside basket",
          "zh": "篮子里的苹果 🍎"
        },
        "icon": "🍎"
      },
      {
        "id": "opt-k1-mat-h9-3",
        "label": {
          "th": "ก้อนหินข้างสนาม",
          "en": "Rock outside",
          "zh": "地上的石头"
        },
        "icon": "🪨"
      }
    ],
    "correctOptionId": "opt-k1-mat-h9-2",
    "explanation": {
      "th": "แอปเปิ้ลอยู่ในตะกร้า เก่งมากครับ!",
      "en": "Right! The apple is inside the basket.",
      "zh": "答对了！苹果在篮子里面。"
    }
  },
  {
    "id": "k1-mat-h10",
    "grade": "K1",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "ตัวเลข \"5\" มีค่าเท่ากับจำนวนสิ่งของข้อใด?",
      "en": "Number \"5\" has the same count as which item group?",
      "zh": "数字“5”代表的数量等于下列哪一组？"
    },
    "illustration": "5️⃣ 🖐️ 5️⃣",
    "illustrationSubtitle": {
      "th": "ค่าของจำนวน 5",
      "en": "Value of number 5",
      "zh": "数字 5 的数值"
    },
    "options": [
      {
        "id": "opt-k1-mat-h10-1",
        "label": {
          "th": "ดาว 2 ดวง ⭐⭐",
          "en": "2 stars",
          "zh": "2 颗星星"
        },
        "icon": "⭐⭐"
      },
      {
        "id": "opt-k1-mat-h10-2",
        "label": {
          "th": "ดินสอ 3 แท่ง ✏️✏️✏️",
          "en": "3 pencils",
          "zh": "3 支铅笔"
        },
        "icon": "✏️"
      },
      {
        "id": "opt-k1-mat-h10-3",
        "label": {
          "th": "ลูกบอล 5 ลูก ⚽⚽⚽⚽⚽",
          "en": "5 balls",
          "zh": "5 个皮球"
        },
        "icon": "⚽"
      }
    ],
    "correctOptionId": "opt-k1-mat-h10-3",
    "explanation": {
      "th": "ลูกบอล 5 ลูก มีค่าเท่ากับเลข 5 ยอดเยี่ยมครับ!",
      "en": "Awesome! 5 soccer balls match number 5.",
      "zh": "太棒啦！5 个足球等于数字 5。"
    }
  },
  {
    "id": "k2-mat-e1",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "นับจำนวนเป็ดน้อยว่ายน้ำ: มีเป็ดทั้งหมดกี่ตัว? 🦆 🦆 🦆 🦆 🦆 🦆",
      "en": "Count swimming ducks: How many ducks are there? 🦆 (6 ducks)",
      "zh": "数一数游泳的小鸭子：一共有几只鸭子？🦆 (6只)"
    },
    "illustration": "🦆 🦆 🦆 🦆 🦆 🦆",
    "illustrationSubtitle": {
      "th": "นับจำนวน 1 ถึง 6",
      "en": "Count 1 to 6",
      "zh": "数数 1 到 6"
    },
    "options": [
      {
        "id": "opt-k2-mat-e1-1",
        "label": {
          "th": "6 ตัว",
          "en": "6 ducks",
          "zh": "6 只"
        },
        "icon": "6️⃣"
      },
      {
        "id": "opt-k2-mat-e1-2",
        "label": {
          "th": "5 ตัว",
          "en": "5 ducks",
          "zh": "5 只"
        },
        "icon": "5️⃣"
      },
      {
        "id": "opt-k2-mat-e1-3",
        "label": {
          "th": "7 ตัว",
          "en": "7 ducks",
          "zh": "7 只"
        },
        "icon": "7️⃣"
      }
    ],
    "correctOptionId": "opt-k2-mat-e1-1",
    "explanation": {
      "th": "นับได้ 6 ตัว เก่งมากครับ!",
      "en": "Great! 6 swimming ducks.",
      "zh": "答对啦！数一数是 6 只小鸭。"
    }
  },
  {
    "id": "k2-mat-e2",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "การบวกเลข: 2 + 2 มีค่าเท่ากับเท่าไร? ✌️ + ✌️",
      "en": "Addition: What is 2 + 2? ✌️ + ✌️",
      "zh": "基础加法运算：2 + 2 等于几？✌️ + ✌️"
    },
    "illustration": "✌️ + ✌️ = ❓",
    "illustrationSubtitle": {
      "th": "2 บวก 2",
      "en": "2 plus 2",
      "zh": "加法 2 + 2"
    },
    "options": [
      {
        "id": "opt-k2-mat-e2-1",
        "label": {
          "th": "3",
          "en": "Three",
          "zh": "3"
        },
        "icon": "3️⃣"
      },
      {
        "id": "opt-k2-mat-e2-2",
        "label": {
          "th": "4",
          "en": "Four",
          "zh": "4"
        },
        "icon": "4️⃣"
      },
      {
        "id": "opt-k2-mat-e2-3",
        "label": {
          "th": "5",
          "en": "Five",
          "zh": "5"
        },
        "icon": "5️⃣"
      }
    ],
    "correctOptionId": "opt-k2-mat-e2-2",
    "explanation": {
      "th": "2 รวมกับ 2 ได้ 4 เก่งมากครับ!",
      "en": "Correct! 2 + 2 = 4.",
      "zh": "答对了！2 + 2 = 4。"
    }
  },
  {
    "id": "k2-mat-e3",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "รูปทรงใดมี \"4 ด้านเท่ากัน\" และ \"4 มุมฉาก\"? 🟦",
      "en": "Which shape has 4 equal sides and 4 square corners? 🟦",
      "zh": "哪一个几何图形具有“4 条相等的边”和“4 个直角”？🟦"
    },
    "illustration": "🟦 📐 🟦",
    "illustrationSubtitle": {
      "th": "รูปสี่เหลี่ยมจัตุรัส",
      "en": "Square with 4 equal sides",
      "zh": "正方形特征"
    },
    "options": [
      {
        "id": "opt-k2-mat-e3-1",
        "label": {
          "th": "สามเหลี่ยม",
          "en": "Triangle",
          "zh": "三角形"
        },
        "icon": "🔺"
      },
      {
        "id": "opt-k2-mat-e3-2",
        "label": {
          "th": "วงกลม",
          "en": "Circle",
          "zh": "圆形"
        },
        "icon": "🟡"
      },
      {
        "id": "opt-k2-mat-e3-3",
        "label": {
          "th": "สี่เหลี่ยมจัตุรัส 🟦",
          "en": "Square",
          "zh": "正方形 🟦"
        },
        "icon": "🟦"
      }
    ],
    "correctOptionId": "opt-k2-mat-e3-3",
    "explanation": {
      "th": "สี่เหลี่ยมจัตุรัสมี 4 ด้านเท่ากันพอดี ยอดเยี่ยมครับ!",
      "en": "Right! A square has 4 equal sides.",
      "zh": "太棒了！正方形四边相等。"
    }
  },
  {
    "id": "k2-mat-e4",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "ตัวเลขใดมีค่า \"มากที่สุด\" ในกลุ่มนี้? 3, 7, 5",
      "en": "Which number is the \"Largest\"? 3, 7, 5",
      "zh": "下列数字中哪一个“最大”？3, 7, 5"
    },
    "illustration": "3️⃣ 7️⃣ 5️⃣",
    "illustrationSubtitle": {
      "th": "เปรียบเทียบค่าของตัวเลข",
      "en": "Largest number",
      "zh": "找出最大数"
    },
    "options": [
      {
        "id": "opt-k2-mat-e4-1",
        "label": {
          "th": "7",
          "en": "Seven (Largest)",
          "zh": "7（最大）"
        },
        "icon": "7️⃣"
      },
      {
        "id": "opt-k2-mat-e4-2",
        "label": {
          "th": "3",
          "en": "Three",
          "zh": "3"
        },
        "icon": "3️⃣"
      },
      {
        "id": "opt-k2-mat-e4-3",
        "label": {
          "th": "5",
          "en": "Five",
          "zh": "5"
        },
        "icon": "5️⃣"
      }
    ],
    "correctOptionId": "opt-k2-mat-e4-1",
    "explanation": {
      "th": "เลข 7 มีค่ามากที่สุดในกลุ่มนี้ เก่งมากครับ!",
      "en": "Correct! 7 is the largest number.",
      "zh": "答对啦！7 是最大的数字。"
    }
  },
  {
    "id": "k2-mat-e5",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "การลบเลข: 3 - 1 มีค่าเท่ากับเท่าไร? 🍎 🍎 🍎 หักออก 1 ผล",
      "en": "Subtraction: What is 3 - 1? 🍎",
      "zh": "减法运算：3 - 1 等于几？🍎 🍎 🍎 拿走 1 个"
    },
    "illustration": "🍎🍎🍎 - 🍎",
    "illustrationSubtitle": {
      "th": "3 ลบ 1",
      "en": "3 minus 1",
      "zh": "减法 3 减 1"
    },
    "options": [
      {
        "id": "opt-k2-mat-e5-1",
        "label": {
          "th": "1",
          "en": "One",
          "zh": "1"
        },
        "icon": "1️⃣"
      },
      {
        "id": "opt-k2-mat-e5-2",
        "label": {
          "th": "2",
          "en": "Two",
          "zh": "2"
        },
        "icon": "2️⃣"
      },
      {
        "id": "opt-k2-mat-e5-3",
        "label": {
          "th": "3",
          "en": "Three",
          "zh": "3"
        },
        "icon": "3️⃣"
      }
    ],
    "correctOptionId": "opt-k2-mat-e5-2",
    "explanation": {
      "th": "3 หักออก 1 เหลือ 2 ถูกต้องครับ!",
      "en": "Right! 3 - 1 = 2.",
      "zh": "答对了！3 减 1 等于 2。"
    }
  },
  {
    "id": "k2-mat-e6",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "สิ่งของใดต่อไปนี้มีลักษณะเป็น \"ทรงกระบอก\" (กลิ้งได้และตั้งได้)? 🥫",
      "en": "Which item is a \"Cylinder\" (can roll and stand)? 🥫",
      "zh": "哪一样物品是既能滚动又能立起来的“圆柱体”？🥫"
    },
    "illustration": "🥫 🛢️ 🥫",
    "illustrationSubtitle": {
      "th": "รูปทรงเรขาคณิต 3 มิติ",
      "en": "Cylinder shape",
      "zh": "圆柱体"
    },
    "options": [
      {
        "id": "opt-k2-mat-e6-1",
        "label": {
          "th": "ลูกเต๋าสี่เหลี่ยม 🎲",
          "en": "Cube dice",
          "zh": "正方体骰子"
        },
        "icon": "🎲"
      },
      {
        "id": "opt-k2-mat-e6-2",
        "label": {
          "th": "กรวยไอศกรีม 🍦",
          "en": "Cone",
          "zh": "圆锥冰淇淋"
        },
        "icon": "🍦"
      },
      {
        "id": "opt-k2-mat-e6-3",
        "label": {
          "th": "กระป๋องนมทรงกระบอก 🥫",
          "en": "Cylinder can",
          "zh": "圆柱体奶罐 🥫"
        },
        "icon": "🥫"
      }
    ],
    "correctOptionId": "opt-k2-mat-e6-3",
    "explanation": {
      "th": "กระป๋องมีหน้าตัดกลม ลำตัวตรง เป็นทรงกระบอก เก่งมากครับ!",
      "en": "Awesome! Cans are cylinders.",
      "zh": "太棒啦！易拉罐是圆柱体。"
    }
  },
  {
    "id": "k2-mat-e7",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "ตัวเลขไทย \"๗\" มีค่าตรงกับตัวเลขอารบิกตัวใด?",
      "en": "Which Arabic numeral corresponds to Thai numeral \"๗\"?",
      "zh": "泰文传统数字“๗”对应哪一个阿拉伯数字？"
    },
    "illustration": "๗ 🇹🇭 7️⃣",
    "illustrationSubtitle": {
      "th": "เลข ๗ ไทย",
      "en": "Thai numeral 7",
      "zh": "泰文数字 7"
    },
    "options": [
      {
        "id": "opt-k2-mat-e7-1",
        "label": {
          "th": "7",
          "en": "Seven (7)",
          "zh": "7"
        },
        "icon": "7️⃣"
      },
      {
        "id": "opt-k2-mat-e7-2",
        "label": {
          "th": "4",
          "en": "Four (4)",
          "zh": "4"
        },
        "icon": "4️⃣"
      },
      {
        "id": "opt-k2-mat-e7-3",
        "label": {
          "th": "9",
          "en": "Nine (9)",
          "zh": "9"
        },
        "icon": "9️⃣"
      }
    ],
    "correctOptionId": "opt-k2-mat-e7-1",
    "explanation": {
      "th": "เลข ๗ ไทย ตรงกับเลข 7 อารบิก เก่งมากครับ!",
      "en": "Correct! ๗ is Thai number 7.",
      "zh": "答对啦！๗ 就是数字 7。"
    }
  },
  {
    "id": "k2-mat-e8",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "มีช็อกโกแลต 4 ชิ้น 🍫 แบ่งให้เพื่อน 2 ชิ้น 🍫 🍫 จะเหลือกี่ชิ้น?",
      "en": "You have 4 chocolates 🍫. You give 2 to a friend. How many left?",
      "zh": "你有 4 块巧克力 🍫，分给好朋友 2 块 🍫 🍫，还剩下几块？"
    },
    "illustration": "🍫🍫🍫🍫 - 🍫🍫",
    "illustrationSubtitle": {
      "th": "4 ลบ 2 เหลือเท่าไร",
      "en": "4 - 2 = ?",
      "zh": "减法 4 减 2"
    },
    "options": [
      {
        "id": "opt-k2-mat-e8-1",
        "label": {
          "th": "1 ชิ้น",
          "en": "1 piece",
          "zh": "1 块"
        },
        "icon": "1️⃣"
      },
      {
        "id": "opt-k2-mat-e8-2",
        "label": {
          "th": "2 ชิ้น",
          "en": "2 pieces",
          "zh": "2 块"
        },
        "icon": "2️⃣"
      },
      {
        "id": "opt-k2-mat-e8-3",
        "label": {
          "th": "3 ชิ้น",
          "en": "3 pieces",
          "zh": "3 块"
        },
        "icon": "3️⃣"
      }
    ],
    "correctOptionId": "opt-k2-mat-e8-2",
    "explanation": {
      "th": "4 ลบ 2 เหลือ 2 ชิ้น เก่งมากครับ!",
      "en": "Right! 4 - 2 = 2 chocolates.",
      "zh": "答对了！4 减 2 剩下 2 块。"
    }
  },
  {
    "id": "k2-mat-e9",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "รูปภาพ \"ดวงดาวบนท้องฟ้า\" ⭐ มีกี่แฉก?",
      "en": "How many points does a classic star ⭐ have?",
      "zh": "标准的卡通小星星 ⭐ 通常有几个尖角（芒）？"
    },
    "illustration": "⭐ ⭐ ⭐",
    "illustrationSubtitle": {
      "th": "นับแฉกของรูปดาว",
      "en": "5 points star",
      "zh": "五角星尖角"
    },
    "options": [
      {
        "id": "opt-k2-mat-e9-1",
        "label": {
          "th": "3 แฉก",
          "en": "3 points",
          "zh": "3 个角"
        },
        "icon": "3️⃣"
      },
      {
        "id": "opt-k2-mat-e9-2",
        "label": {
          "th": "4 แฉก",
          "en": "4 points",
          "zh": "4 个角"
        },
        "icon": "4️⃣"
      },
      {
        "id": "opt-k2-mat-e9-3",
        "label": {
          "th": "5 แฉก",
          "en": "5 points",
          "zh": "5 个角"
        },
        "icon": "5️⃣"
      }
    ],
    "correctOptionId": "opt-k2-mat-e9-3",
    "explanation": {
      "th": "รูปดาวทั่วไปมี 5 แฉก ถูกต้องนะคร้าบ!",
      "en": "Awesome! Classic stars have 5 points.",
      "zh": "太棒了！五角星有 5 个角。"
    }
  },
  {
    "id": "k2-mat-e10",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "การบวกเลข: 3 + 2 ได้ผลลัพธ์เท่ากับเท่าไร? 🍎🍎🍎 + 🍎🍎",
      "en": "Addition: What is 3 + 2? 🍎",
      "zh": "加法运算：3 + 2 的结果是几？🍎🍎🍎 + 🍎🍎"
    },
    "illustration": "🍎🍎🍎 + 🍎🍎",
    "illustrationSubtitle": {
      "th": "3 บวก 2",
      "en": "3 plus 2",
      "zh": "加法 3 加 2"
    },
    "options": [
      {
        "id": "opt-k2-mat-e10-1",
        "label": {
          "th": "5",
          "en": "Five (5)",
          "zh": "5"
        },
        "icon": "5️⃣"
      },
      {
        "id": "opt-k2-mat-e10-2",
        "label": {
          "th": "4",
          "en": "Four (4)",
          "zh": "4"
        },
        "icon": "4️⃣"
      },
      {
        "id": "opt-k2-mat-e10-3",
        "label": {
          "th": "6",
          "en": "Six (6)",
          "zh": "6"
        },
        "icon": "6️⃣"
      }
    ],
    "correctOptionId": "opt-k2-mat-e10-1",
    "explanation": {
      "th": "3 รวมกับ 2 ได้ 5 เก่งมากครับ!",
      "en": "Correct! 3 + 2 = 5.",
      "zh": "答对啦！3 加 2 等于 5。"
    }
  },
  {
    "id": "k2-mat-m1",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "การเปรียบเทียบ: ข้อใดถูกต้องระหว่าง 5 กับ 8? ⚖️",
      "en": "Comparison: Which statement is true between 5 and 8?",
      "zh": "比大小：关于数字 5 和 8，哪一句话是正确的？⚖️"
    },
    "illustration": "5️⃣ 🆚 8️⃣",
    "illustrationSubtitle": {
      "th": "มากกว่า หรือ น้อยกว่า",
      "en": "Compare 5 and 8",
      "zh": "比较 5 和 8"
    },
    "options": [
      {
        "id": "opt-k2-mat-m1-1",
        "label": {
          "th": "5 มากกว่า 8",
          "en": "5 is greater than 8",
          "zh": "5 大于 8"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-mat-m1-2",
        "label": {
          "th": "5 น้อยกว่า 8",
          "en": "5 is less than 8",
          "zh": "5 小于 8"
        },
        "icon": "✅"
      },
      {
        "id": "opt-k2-mat-m1-3",
        "label": {
          "th": "5 เท่ากับ 8",
          "en": "5 equals 8",
          "zh": "5 等于 8"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-mat-m1-2",
    "explanation": {
      "th": "5 มีค่าน้อยกว่า 8 เก่งมากครับ!",
      "en": "Spot on! 5 is less than 8.",
      "zh": "答对了！5 小于 8。"
    }
  },
  {
    "id": "k2-mat-m2",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "อนุกรมรูปทรง: ○  ○ □ ○ ... รูปต่อไปคือรูปใด?",
      "en": "Shape pattern: Circle, Square, Circle, Square, Circle... What is next?",
      "zh": "形状规律：圆形、正方形、圆形、正方形、圆形... 接下来的图形是？"
    },
    "illustration": "⚪ 🟦 ⚪ 🟦 ⚪ ❓",
    "illustrationSubtitle": {
      "th": "แบบรูปสลับรูปทรง",
      "en": "Alternating shapes",
      "zh": "圆方交替规律"
    },
    "options": [
      {
        "id": "opt-k2-mat-m2-1",
        "label": {
          "th": "สามเหลี่ยม 🔺",
          "en": "Triangle",
          "zh": "三角形"
        },
        "icon": "🔺"
      },
      {
        "id": "opt-k2-mat-m2-2",
        "label": {
          "th": "ดาว ⭐",
          "en": "Star",
          "zh": "星星"
        },
        "icon": "⭐"
      },
      {
        "id": "opt-k2-mat-m2-3",
        "label": {
          "th": "สี่เหลี่ยม 🟦",
          "en": "Square",
          "zh": "正方形 🟦"
        },
        "icon": "🟦"
      }
    ],
    "correctOptionId": "opt-k2-mat-m2-3",
    "explanation": {
      "th": "วงกลม สี่เหลี่ยม สลับกัน ชิ้นต่อไปคือสี่เหลี่ยม เก่งมากครับ!",
      "en": "Right! Square comes next.",
      "zh": "答对啦！接下来是正方形 🟦。"
    }
  },
  {
    "id": "k2-mat-m3",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "มีเงินเหรียญบาท 5 เหรียญ 🪙 ซื้อขนมไป 3 บาท 🍬 จะเหลือเงินกี่บาท?",
      "en": "You have 5 Baht coins 🪙. You spend 3 Baht for candy 🍬. How much left?",
      "zh": "你有 5 枚一铢硬币 🪙，买零食花了 3 铢 🍬。还剩下几铢？"
    },
    "illustration": "🪙🪙🪙🪙🪙 - 🍬",
    "illustrationSubtitle": {
      "th": "5 ลบ 3",
      "en": "5 minus 3",
      "zh": "减法 5 减 3"
    },
    "options": [
      {
        "id": "opt-k2-mat-m3-1",
        "label": {
          "th": "2 บาท",
          "en": "2 Baht",
          "zh": "2 铢"
        },
        "icon": "2️⃣"
      },
      {
        "id": "opt-k2-mat-m3-2",
        "label": {
          "th": "1 บาท",
          "en": "1 Baht",
          "zh": "1 铢"
        },
        "icon": "1️⃣"
      },
      {
        "id": "opt-k2-mat-m3-3",
        "label": {
          "th": "3 บาท",
          "en": "3 Baht",
          "zh": "3 铢"
        },
        "icon": "3️⃣"
      }
    ],
    "correctOptionId": "opt-k2-mat-m3-1",
    "explanation": {
      "th": "5 ลบ 3 เหลือ 2 บาท เก่งมากครับ!",
      "en": "Correct! 5 - 3 = 2 Baht.",
      "zh": "太棒了！5 减 3 剩下 2 铢。"
    }
  },
  {
    "id": "k2-mat-m4",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "การบวกเลข: 4 + 4 ได้ผลลัพธ์เท่ากับเท่าไร?",
      "en": "Addition: What is 4 + 4?",
      "zh": "加法运算：4 + 4 等于几？"
    },
    "illustration": "4️⃣ + 4️⃣ = ❓",
    "illustrationSubtitle": {
      "th": "4 บวก 4",
      "en": "4 plus 4",
      "zh": "加法 4 加 4"
    },
    "options": [
      {
        "id": "opt-k2-mat-m4-1",
        "label": {
          "th": "7",
          "en": "Seven",
          "zh": "7"
        },
        "icon": "7️⃣"
      },
      {
        "id": "opt-k2-mat-m4-2",
        "label": {
          "th": "8",
          "en": "Eight",
          "zh": "8"
        },
        "icon": "8️⃣"
      },
      {
        "id": "opt-k2-mat-m4-3",
        "label": {
          "th": "9",
          "en": "Nine",
          "zh": "9"
        },
        "icon": "9️⃣"
      }
    ],
    "correctOptionId": "opt-k2-mat-m4-2",
    "explanation": {
      "th": "4 รวมกับ 4 ได้ 8 เก่งมากครับ!",
      "en": "Awesome! 4 + 4 = 8.",
      "zh": "答对了！4 + 4 = 8。"
    }
  },
  {
    "id": "k2-mat-m5",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "แบ่งพิซซ่าถาดกลม 🍕 ออกเป็น \"2 ส่วนเท่าๆ กัน\" เรียกว่าอะไร?",
      "en": "Cut a round pizza 🍕 into 2 equal parts. What is each part called?",
      "zh": "把一个圆形披萨 🍕 均等切成两半，每一半叫作什么？"
    },
    "illustration": "🍕 ✂️ 🍕",
    "illustrationSubtitle": {
      "th": "การแบ่งครึ่งเท่ากัน",
      "en": "Half / Equal parts",
      "zh": "均分一半"
    },
    "options": [
      {
        "id": "opt-k2-mat-m5-1",
        "label": {
          "th": "หนึ่งในสี่",
          "en": "One quarter",
          "zh": "四分之一"
        },
        "icon": "¼"
      },
      {
        "id": "opt-k2-mat-m5-2",
        "label": {
          "th": "หนึ่งชิ้นใหญ่",
          "en": "One big piece",
          "zh": "一大块"
        },
        "icon": "🍕"
      },
      {
        "id": "opt-k2-mat-m5-3",
        "label": {
          "th": "ครึ่งหนึ่ง (1/2)",
          "en": "One half",
          "zh": "一半 (二分之一)"
        },
        "icon": "½"
      }
    ],
    "correctOptionId": "opt-k2-mat-m5-3",
    "explanation": {
      "th": "แบ่งออกเป็น 2 ส่วนเท่ากัน เรียกว่า ครึ่งหนึ่ง ถูกต้องครับ!",
      "en": "Right! Half means 2 equal parts.",
      "zh": "答对啦！均分两半叫作一半（二分之一）。"
    }
  },
  {
    "id": "k2-mat-m6",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "ตัวเลขใดอยู่ \"ตรงกลาง\" ระหว่าง 6 กับ 8? 6, ..., 8",
      "en": "Which number is \"in the middle\" between 6 and 8? 6, ..., 8",
      "zh": "数字 6 和 8 “中间”的数字是几？6, ..., 8"
    },
    "illustration": "6️⃣ ➡️ ❓ ➡️ 8️⃣",
    "illustrationSubtitle": {
      "th": "ตัวเลขที่อยู่ระหว่างกลาง",
      "en": "Number between 6 and 8",
      "zh": "中间数"
    },
    "options": [
      {
        "id": "opt-k2-mat-m6-1",
        "label": {
          "th": "7",
          "en": "Seven",
          "zh": "7"
        },
        "icon": "7️⃣"
      },
      {
        "id": "opt-k2-mat-m6-2",
        "label": {
          "th": "5",
          "en": "Five",
          "zh": "5"
        },
        "icon": "5️⃣"
      },
      {
        "id": "opt-k2-mat-m6-3",
        "label": {
          "th": "9",
          "en": "Nine",
          "zh": "9"
        },
        "icon": "9️⃣"
      }
    ],
    "correctOptionId": "opt-k2-mat-m6-1",
    "explanation": {
      "th": "6 แล้วก็ 7 แล้วก็ 8 ยอดเยี่ยมครับ!",
      "en": "Spot on! 7 is between 6 and 8.",
      "zh": "太棒啦！中间是 7。"
    }
  },
  {
    "id": "k2-mat-m7",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "การชั่งน้ำหนักบนตาชั่งสองแขน: แขนข้างที่ \"จมลงต่ำกว่า\" หมายถึงอะไร? ⚖️",
      "en": "Balance scale: The side that sinks lower means what? ⚖️",
      "zh": "天平称重：往下沉的那一端代表什么？⚖️"
    },
    "illustration": "⚖️ ⬇️ ⚖️",
    "illustrationSubtitle": {
      "th": "หลักการทำงานของตาชั่ง",
      "en": "Heavier side sinks",
      "zh": "天平较重端下沉"
    },
    "options": [
      {
        "id": "opt-k2-mat-m7-1",
        "label": {
          "th": "สิ่งของฝั่งนั้นเบากว่า",
          "en": "Lighter",
          "zh": "那边更轻"
        },
        "icon": "🪶"
      },
      {
        "id": "opt-k2-mat-m7-2",
        "label": {
          "th": "สิ่งของฝั่งนั้นหนักกว่า",
          "en": "Heavier",
          "zh": "那边更重"
        },
        "icon": "🪨"
      },
      {
        "id": "opt-k2-mat-m7-3",
        "label": {
          "th": "ทั้งสองฝั่งเท่ากัน",
          "en": "Equal",
          "zh": "两边一样重"
        },
        "icon": "⚖️"
      }
    ],
    "correctOptionId": "opt-k2-mat-m7-2",
    "explanation": {
      "th": "สิ่งของที่หนักกว่าจะถ่วงตาชั่งให้จมลงต่ำ เก่งมากครับ!",
      "en": "Correct! The heavier side tips down.",
      "zh": "答对了！较重的一端会往下沉。"
    }
  },
  {
    "id": "k2-mat-m8",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "นับเพิ่มทีละ 1: 5, 6, 7, ... ตัวเลขต่อไปคือเลขใด?",
      "en": "Count up by 1: 5, 6, 7, ... What is next?",
      "zh": "每次加 1 接着数：5, 6, 7, ... 接下来的数字是几？"
    },
    "illustration": "5️⃣ 6️⃣ 7️⃣ ❓",
    "illustrationSubtitle": {
      "th": "นับต่อทีละหนึ่ง",
      "en": "Count forward",
      "zh": "按顺序接着数"
    },
    "options": [
      {
        "id": "opt-k2-mat-m8-1",
        "label": {
          "th": "9",
          "en": "Nine",
          "zh": "9"
        },
        "icon": "9️⃣"
      },
      {
        "id": "opt-k2-mat-m8-2",
        "label": {
          "th": "10",
          "en": "Ten",
          "zh": "10"
        },
        "icon": "🔟"
      },
      {
        "id": "opt-k2-mat-m8-3",
        "label": {
          "th": "8",
          "en": "Eight",
          "zh": "8"
        },
        "icon": "8️⃣"
      }
    ],
    "correctOptionId": "opt-k2-mat-m8-3",
    "explanation": {
      "th": "5, 6, 7 แล้วก็ 8 ถูกต้องครับ!",
      "en": "Right! 8 comes after 7.",
      "zh": "答对啦！7 后面是 8。"
    }
  },
  {
    "id": "k2-mat-m9",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "มีไข่ไก่ 6 ฟอง 🥚 ทำไข่เจียวไป 2 ฟอง 🍳 จะเหลือไข่ไก่กี่ฟอง?",
      "en": "You have 6 eggs 🥚. You cook 2 eggs 🍳. How many eggs left?",
      "zh": "盒子里有 6 枚鸡蛋 🥚，煎蛋用了 2 枚 🍳。还剩下几枚鸡蛋？"
    },
    "illustration": "🥚🥚🥚🥚🥚🥚 - 🍳🍳",
    "illustrationSubtitle": {
      "th": "6 ลบ 2",
      "en": "6 minus 2",
      "zh": "减法 6 减 2"
    },
    "options": [
      {
        "id": "opt-k2-mat-m9-1",
        "label": {
          "th": "4 ฟอง",
          "en": "4 eggs",
          "zh": "4 枚"
        },
        "icon": "4️⃣"
      },
      {
        "id": "opt-k2-mat-m9-2",
        "label": {
          "th": "3 ฟอง",
          "en": "3 eggs",
          "zh": "3 枚"
        },
        "icon": "3️⃣"
      },
      {
        "id": "opt-k2-mat-m9-3",
        "label": {
          "th": "5 ฟอง",
          "en": "5 eggs",
          "zh": "5 枚"
        },
        "icon": "5️⃣"
      }
    ],
    "correctOptionId": "opt-k2-mat-m9-1",
    "explanation": {
      "th": "6 หักออก 2 เหลือ 4 ฟอง เก่งมากครับ!",
      "en": "Correct! 6 - 2 = 4 eggs.",
      "zh": "太棒了！6 减 2 剩下 4 枚鸡蛋。"
    }
  },
  {
    "id": "k2-mat-m10",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "การบวกเลข: 5 + 5 มีค่าเท่ากับเท่าไร? 🖐️ + 🖐️",
      "en": "Addition: What is 5 + 5? 🖐️ + 🖐️",
      "zh": "加法运算：5 + 5 等于几？🖐️ + 🖐️"
    },
    "illustration": "🖐️ + 🖐️ = ❓",
    "illustrationSubtitle": {
      "th": "นิ้วมือสองข้างรวมกัน",
      "en": "5 plus 5",
      "zh": "两只手合起来 5+5"
    },
    "options": [
      {
        "id": "opt-k2-mat-m10-1",
        "label": {
          "th": "9",
          "en": "Nine",
          "zh": "9"
        },
        "icon": "9️⃣"
      },
      {
        "id": "opt-k2-mat-m10-2",
        "label": {
          "th": "10",
          "en": "Ten",
          "zh": "10"
        },
        "icon": "🔟"
      },
      {
        "id": "opt-k2-mat-m10-3",
        "label": {
          "th": "8",
          "en": "Eight",
          "zh": "8"
        },
        "icon": "8️⃣"
      }
    ],
    "correctOptionId": "opt-k2-mat-m10-2",
    "explanation": {
      "th": "นิ้วมือสองข้าง 5 + 5 รวมเป็น 10 นิ้ว ยอดเยี่ยมครับ!",
      "en": "Awesome! 5 + 5 = 10.",
      "zh": "答对了！5 + 5 = 10。"
    }
  },
  {
    "id": "k2-mat-h1",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "เรียงลำดับจำนวนจาก \"มากไปหาน้อย\": 9, 7, 5, ... เลขต่อไปคือเลขใด?",
      "en": "Order from largest to smallest: 9, 7, 5, ... What is next (counting down by 2)?",
      "zh": "从大到小规律倒数：9, 7, 5, ... 接下来的数字是几？"
    },
    "illustration": "9️⃣ ➡️ 7️⃣ ➡️ 5️⃣ ➡️ ❓",
    "illustrationSubtitle": {
      "th": "นับลดทีละ 2",
      "en": "Count down by 2",
      "zh": "每次递减 2"
    },
    "options": [
      {
        "id": "opt-k2-mat-h1-1",
        "label": {
          "th": "4",
          "en": "Four",
          "zh": "4"
        },
        "icon": "4️⃣"
      },
      {
        "id": "opt-k2-mat-h1-2",
        "label": {
          "th": "2",
          "en": "Two",
          "zh": "2"
        },
        "icon": "2️⃣"
      },
      {
        "id": "opt-k2-mat-h1-3",
        "label": {
          "th": "3",
          "en": "Three",
          "zh": "3"
        },
        "icon": "3️⃣"
      }
    ],
    "correctOptionId": "opt-k2-mat-h1-3",
    "explanation": {
      "th": "ลดลงทีละ 2: 9, 7, 5 แล้วก็ 3 เก่งมากครับ!",
      "en": "Spot on! Counting down by 2 gives 3.",
      "zh": "太棒了！每次减 2，接下来是 3。"
    }
  },
  {
    "id": "k2-mat-h2",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "โจทย์ปัญหา: ในสวนมีนกเกาะอยู่ 5 ตัว 🐦 บินมาเพิ่มอีก 3 ตัว 🐦 รวมมีนกกี่ตัว?",
      "en": "Word problem: 5 birds in a tree. 3 more birds join. How many birds in total?",
      "zh": "应用题：树上有 5 只小鸟 🐦，又飞来了 3 只 🐦。一共有几只小鸟？"
    },
    "illustration": "🐦 (5) + 🐦 (3)",
    "illustrationSubtitle": {
      "th": "5 บวก 3",
      "en": "5 plus 3",
      "zh": "加法 5 加 3"
    },
    "options": [
      {
        "id": "opt-k2-mat-h2-1",
        "label": {
          "th": "8 ตัว",
          "en": "8 birds",
          "zh": "8 只"
        },
        "icon": "8️⃣"
      },
      {
        "id": "opt-k2-mat-h2-2",
        "label": {
          "th": "7 ตัว",
          "en": "7 birds",
          "zh": "7 只"
        },
        "icon": "7️⃣"
      },
      {
        "id": "opt-k2-mat-h2-3",
        "label": {
          "th": "9 ตัว",
          "en": "9 birds",
          "zh": "9 只"
        },
        "icon": "9️⃣"
      }
    ],
    "correctOptionId": "opt-k2-mat-h2-1",
    "explanation": {
      "th": "5 รวมกับ 3 ได้ 8 ตัว เก่งมากครับ!",
      "en": "Correct! 5 + 3 = 8 birds.",
      "zh": "答对啦！5 加 3 等于 8 只鸟。"
    }
  },
  {
    "id": "k2-mat-h3",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "รูปทรงสี่เหลี่ยมผืนผ้า 🧱 แตกต่างจากสี่เหลี่ยมจัตุรัสอย่างไร?",
      "en": "How does a rectangle 🧱 differ from a square?",
      "zh": "长方形 🧱 和正方形有什么不同？"
    },
    "illustration": "🧱 🆚 🟦",
    "illustrationSubtitle": {
      "th": "เปรียบเทียบสี่เหลี่ยมสองชนิด",
      "en": "Rectangle vs Square",
      "zh": "长方形与正方形"
    },
    "options": [
      {
        "id": "opt-k2-mat-h3-1",
        "label": {
          "th": "ไม่มีมุมฉากเลย",
          "en": "Has no corners",
          "zh": "没有直角"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-mat-h3-2",
        "label": {
          "th": "มีด้านยาว 2 ด้าน และด้านสั้น 2 ด้าน",
          "en": "Has 2 long & 2 short sides",
          "zh": "有两条长边和两条短边"
        },
        "icon": "🧱"
      },
      {
        "id": "opt-k2-mat-h3-3",
        "label": {
          "th": "มีด้าน 3 ด้าน",
          "en": "Has 3 sides",
          "zh": "有3条边"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-mat-h3-2",
    "explanation": {
      "th": "สี่เหลี่ยมผืนผ้ามีด้านยาว 2 ด้าน และด้านกว้างสั้น 2 ด้าน เก่งมากครับ!",
      "en": "Right! A rectangle has 2 longer and 2 shorter sides.",
      "zh": "答对了！长方形有两条对边较长，两条对边较短。"
    }
  },
  {
    "id": "k2-mat-h4",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "โจทย์ปัญหา: มีลูกโป่ง 8 ลูก 🎈 ลอยหายไปบนฟ้า 3 ลูก ☁️ เหลือลูกโป่งกี่ลูก?",
      "en": "Word problem: You have 8 balloons 🎈. 3 float away into the clouds ☁️. How many left?",
      "zh": "应用题：手里有 8 个气球 🎈，飞走了 3 个 ☁️。还剩下几个气球？"
    },
    "illustration": "🎈 (8) - ☁️ (3)",
    "illustrationSubtitle": {
      "th": "8 ลบ 3",
      "en": "8 minus 3",
      "zh": "减法 8 减 3"
    },
    "options": [
      {
        "id": "opt-k2-mat-h4-1",
        "label": {
          "th": "4 ลูก",
          "en": "4 balloons",
          "zh": "4 个"
        },
        "icon": "4️⃣"
      },
      {
        "id": "opt-k2-mat-h4-2",
        "label": {
          "th": "6 ลูก",
          "en": "6 balloons",
          "zh": "6 个"
        },
        "icon": "6️⃣"
      },
      {
        "id": "opt-k2-mat-h4-3",
        "label": {
          "th": "5 ลูก",
          "en": "5 balloons",
          "zh": "5 个"
        },
        "icon": "5️⃣"
      }
    ],
    "correctOptionId": "opt-k2-mat-h4-3",
    "explanation": {
      "th": "8 หักออก 3 เหลือ 5 ลูก เก่งมากครับ!",
      "en": "Awesome! 8 - 3 = 5 balloons.",
      "zh": "太棒啦！8 减 3 剩下 5 个气球。"
    }
  },
  {
    "id": "k2-mat-h5",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "นาฬิกาเข็มสั้นชี้ที่เลข 3 เข็มยาวชี้ที่เลข 12 🕒 หมายถึงเวลาใด?",
      "en": "Clock: Short hand at 3, long hand at 12 🕒. What time is it?",
      "zh": "时钟短针指着 3，长针指着 12 🕒，现在是几点钟？"
    },
    "illustration": "🕒 ⏰ 🕒",
    "illustrationSubtitle": {
      "th": "การดูเวลาบนหน้าปัดนาฬิกา",
      "en": "Read analog clock: 3 o'clock",
      "zh": "认识时钟：3点整"
    },
    "options": [
      {
        "id": "opt-k2-mat-h5-1",
        "label": {
          "th": "3 นาฬิกา (3 โมงตรง)",
          "en": "3 o'clock",
          "zh": "3 点整"
        },
        "icon": "🕒"
      },
      {
        "id": "opt-k2-mat-h5-2",
        "label": {
          "th": "12 นาฬิกา",
          "en": "12 o'clock",
          "zh": "12 点整"
        },
        "icon": "🕛"
      },
      {
        "id": "opt-k2-mat-h5-3",
        "label": {
          "th": "6 นาฬิกา",
          "en": "6 o'clock",
          "zh": "6 点整"
        },
        "icon": "🕕"
      }
    ],
    "correctOptionId": "opt-k2-mat-h5-1",
    "explanation": {
      "th": "เข็มสั้นชี้เลข 3 เข็มยาวชี้เลข 12 คือ 3 นาฬิกาตรง เก่งมากครับ!",
      "en": "Correct! It is 3 o'clock.",
      "zh": "答对啦！是 3 点整。"
    }
  },
  {
    "id": "k2-mat-h6",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "การบวกเลขสามจำนวน: 1 + 2 + 3 มีผลลัพธ์เท่ากับเท่าไร?",
      "en": "Add three numbers: 1 + 2 + 3 = ?",
      "zh": "连加运算：1 + 2 + 3 等于几？"
    },
    "illustration": "1️⃣ + 2️⃣ + 3️⃣ = ❓",
    "illustrationSubtitle": {
      "th": "บวกเลข 3 จำนวน",
      "en": "Sum of 1+2+3",
      "zh": "三个数连加"
    },
    "options": [
      {
        "id": "opt-k2-mat-h6-1",
        "label": {
          "th": "5",
          "en": "Five",
          "zh": "5"
        },
        "icon": "5️⃣"
      },
      {
        "id": "opt-k2-mat-h6-2",
        "label": {
          "th": "6",
          "en": "Six",
          "zh": "6"
        },
        "icon": "6️⃣"
      },
      {
        "id": "opt-k2-mat-h6-3",
        "label": {
          "th": "7",
          "en": "Seven",
          "zh": "7"
        },
        "icon": "7️⃣"
      }
    ],
    "correctOptionId": "opt-k2-mat-h6-2",
    "explanation": {
      "th": "1+2 ได้ 3 แล้วบวกอีก 3 ได้ 6 ยอดเยี่ยมครับ!",
      "en": "Right! (1 + 2) + 3 = 6.",
      "zh": "答对了！1+2=3，再加3等于 6。"
    }
  },
  {
    "id": "k2-mat-h7",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "สิ่งของใดต่อไปนี้ \"ไม่มีเหลี่ยมหรือมุมเลย\"? 🟡 🆚 🔺 🆚 🟦",
      "en": "Which shape has ZERO corners and angles? 🟡 vs 🔺 vs 🟦",
      "zh": "下列哪一个图形“完全没有尖角，也没有棱边”？🟡 🆚 🔺 🆚 🟦"
    },
    "illustration": "🟡 📐 🟡",
    "illustrationSubtitle": {
      "th": "คุณสมบัติของวงกลม",
      "en": "Zero corners",
      "zh": "零角的圆形"
    },
    "options": [
      {
        "id": "opt-k2-mat-h7-1",
        "label": {
          "th": "สามเหลี่ยม (มี 3 มุม)",
          "en": "Triangle (3 angles)",
          "zh": "三角形（有3个角）"
        },
        "icon": "🔺"
      },
      {
        "id": "opt-k2-mat-h7-2",
        "label": {
          "th": "สี่เหลี่ยม (มี 4 มุม)",
          "en": "Square (4 corners)",
          "zh": "正方形（有4个角）"
        },
        "icon": "🟦"
      },
      {
        "id": "opt-k2-mat-h7-3",
        "label": {
          "th": "วงกลม (ไม่มีมุมเลย)",
          "en": "Circle (0 corners)",
          "zh": "圆形（0个角）"
        },
        "icon": "🟡"
      }
    ],
    "correctOptionId": "opt-k2-mat-h7-3",
    "explanation": {
      "th": "วงกลมมีเส้นโค้งกลม ไม่มีมุมหรือเหลี่ยมเลย เก่งมากครับ!",
      "en": "Spot on! Circles have zero corners.",
      "zh": "太棒了！圆形没有任何角。"
    }
  },
  {
    "id": "k2-mat-h8",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "เหรียญเงิน 5 บาท 🪙 1 เหรียญ มีค่าเท่ากับเหรียญ 1 บาทกี่เหรียญ?",
      "en": "One 5-Baht coin 🪙 has the same value as how many 1-Baht coins?",
      "zh": "1 枚 5 铢硬币 🪙 的价值等于几枚 1 铢硬币？"
    },
    "illustration": "🪙 (5 บาท) = 🪙...?",
    "illustrationSubtitle": {
      "th": "ค่าเงินเหรียญไทย",
      "en": "Value of 5 Baht coin",
      "zh": "硬币面额换算"
    },
    "options": [
      {
        "id": "opt-k2-mat-h8-1",
        "label": {
          "th": "5 เหรียญ",
          "en": "5 coins",
          "zh": "5 枚"
        },
        "icon": "5️⃣"
      },
      {
        "id": "opt-k2-mat-h8-2",
        "label": {
          "th": "2 เหรียญ",
          "en": "2 coins",
          "zh": "2 枚"
        },
        "icon": "2️⃣"
      },
      {
        "id": "opt-k2-mat-h8-3",
        "label": {
          "th": "10 เหรียญ",
          "en": "10 coins",
          "zh": "10 枚"
        },
        "icon": "🔟"
      }
    ],
    "correctOptionId": "opt-k2-mat-h8-1",
    "explanation": {
      "th": "เหรียญ 5 บาท มีค่าเท่ากับเหรียญ 1 บาท 5 เหรียญ เก่งมากครับ!",
      "en": "Correct! A 5-Baht coin equals five 1-Baht coins.",
      "zh": "答对啦！等于 5 枚 1 铢硬币。"
    }
  },
  {
    "id": "k2-mat-h9",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "อนุกรมตัวเลข: 2, 4, 6, ... ตัวเลขต่อไปคือเลขใด?",
      "en": "Number pattern: 2, 4, 6, ... What is next (counting up by 2)?",
      "zh": "数字规律：2, 4, 6, ... 接下来的数字是几（每次加 2）？"
    },
    "illustration": "2️⃣ 4️⃣ 6️⃣ ❓",
    "illustrationSubtitle": {
      "th": "นับเพิ่มทีละ 2",
      "en": "Count by 2s",
      "zh": "偶数规律数数"
    },
    "options": [
      {
        "id": "opt-k2-mat-h9-1",
        "label": {
          "th": "7",
          "en": "Seven",
          "zh": "7"
        },
        "icon": "7️⃣"
      },
      {
        "id": "opt-k2-mat-h9-2",
        "label": {
          "th": "8",
          "en": "Eight",
          "zh": "8"
        },
        "icon": "8️⃣"
      },
      {
        "id": "opt-k2-mat-h9-3",
        "label": {
          "th": "9",
          "en": "Nine",
          "zh": "9"
        },
        "icon": "9️⃣"
      }
    ],
    "correctOptionId": "opt-k2-mat-h9-2",
    "explanation": {
      "th": "เพิ่มทีละ 2: 2, 4, 6 แล้วก็ 8 ยอดเยี่ยมครับ!",
      "en": "Right! 2, 4, 6, 8.",
      "zh": "答对了！每次加 2，接下来是 8。"
    }
  },
  {
    "id": "k2-mat-h10",
    "grade": "K2",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "ถังน้ำใบใหญ่จุได้ 10 ลิตร 🪣 มีน้ำอยู่แล้ว 7 ลิตร ต้องเติมอีกกี่ลิตรจึงจะเต็ม?",
      "en": "A 10-liter bucket 🪣 has 7 liters of water. How many more liters to fill it?",
      "zh": "一个 10 升的大水桶 🪣 已经装了 7 升水。还需要倒入几升水才能装满？"
    },
    "illustration": "🪣 (7/10 ลิตร) + 💧",
    "illustrationSubtitle": {
      "th": "10 ลบ 7",
      "en": "10 minus 7",
      "zh": "求补数 10 减 7"
    },
    "options": [
      {
        "id": "opt-k2-mat-h10-1",
        "label": {
          "th": "2 ลิตร",
          "en": "2 liters",
          "zh": "2 升"
        },
        "icon": "2️⃣"
      },
      {
        "id": "opt-k2-mat-h10-2",
        "label": {
          "th": "4 ลิตร",
          "en": "4 liters",
          "zh": "4 升"
        },
        "icon": "4️⃣"
      },
      {
        "id": "opt-k2-mat-h10-3",
        "label": {
          "th": "3 ลิตร",
          "en": "3 liters",
          "zh": "3 升"
        },
        "icon": "3️⃣"
      }
    ],
    "correctOptionId": "opt-k2-mat-h10-3",
    "explanation": {
      "th": "10 ลบ 7 ต้องเติมอีก 3 ลิตร เก่งมากครับ!",
      "en": "Awesome! 10 - 7 = 3 liters.",
      "zh": "太棒啦！10 减 7 还需要 3 升水。"
    }
  },
  {
    "id": "k3-mat-e1",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "การบวกเลขในใจ: 7 + 3 ได้ผลลัพธ์เท่ากับเท่าไร?",
      "en": "Mental math: What is 7 + 3?",
      "zh": "心算加法：7 + 3 等于几？"
    },
    "illustration": "7️⃣ + 3️⃣ = ❓",
    "illustrationSubtitle": {
      "th": "คู่สิบ (ผลรวมเป็น 10)",
      "en": "Make 10",
      "zh": "凑十法 7 + 3"
    },
    "options": [
      {
        "id": "opt-k3-mat-e1-1",
        "label": {
          "th": "10",
          "en": "Ten (10)",
          "zh": "10"
        },
        "icon": "🔟"
      },
      {
        "id": "opt-k3-mat-e1-2",
        "label": {
          "th": "9",
          "en": "Nine (9)",
          "zh": "9"
        },
        "icon": "9️⃣"
      },
      {
        "id": "opt-k3-mat-e1-3",
        "label": {
          "th": "11",
          "en": "Eleven (11)",
          "zh": "11"
        },
        "icon": "1️⃣1️⃣"
      }
    ],
    "correctOptionId": "opt-k3-mat-e1-1",
    "explanation": {
      "th": "7 รวมกับ 3 ได้ 10 เต็มสิบพอดี เก่งมากครับ!",
      "en": "Correct! 7 + 3 = 10.",
      "zh": "答对了！7 加 3 刚好等于 10。"
    }
  },
  {
    "id": "k3-mat-e2",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "การลบเลข: 10 - 4 ได้ผลลัพธ์เท่ากับเท่าไร?",
      "en": "Subtraction: What is 10 - 4?",
      "zh": "减法运算：10 - 4 等于几？"
    },
    "illustration": "🔟 - 4️⃣ = ❓",
    "illustrationSubtitle": {
      "th": "10 ลบ 4",
      "en": "10 minus 4",
      "zh": "减法 10 减 4"
    },
    "options": [
      {
        "id": "opt-k3-mat-e2-1",
        "label": {
          "th": "5",
          "en": "Five",
          "zh": "5"
        },
        "icon": "5️⃣"
      },
      {
        "id": "opt-k3-mat-e2-2",
        "label": {
          "th": "6",
          "en": "Six",
          "zh": "6"
        },
        "icon": "6️⃣"
      },
      {
        "id": "opt-k3-mat-e2-3",
        "label": {
          "th": "7",
          "en": "Seven",
          "zh": "7"
        },
        "icon": "7️⃣"
      }
    ],
    "correctOptionId": "opt-k3-mat-e2-2",
    "explanation": {
      "th": "10 ลบออก 4 เหลือ 6 ถูกต้องครับ!",
      "en": "Right! 10 - 4 = 6.",
      "zh": "答对啦！10 减 4 等于 6。"
    }
  },
  {
    "id": "k3-mat-e3",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "ตัวเลข \"15\" ประกอบด้วยเลขในหลักสิบและหลักหน่วยอย่างไร?",
      "en": "In the number 15, what are the tens and ones digits?",
      "zh": "数字“15”的十位和个位分别由什么组成？"
    },
    "illustration": "1️⃣5️⃣ 🧮 1️⃣5️⃣",
    "illustrationSubtitle": {
      "th": "หลักสิบและหลักหน่วย",
      "en": "Tens and Ones",
      "zh": "十位数与个位数"
    },
    "options": [
      {
        "id": "opt-k3-mat-e3-1",
        "label": {
          "th": "1 สิบ กับ 2 หน่วย",
          "en": "1 ten & 2 ones",
          "zh": "1个十和2个一"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-mat-e3-2",
        "label": {
          "th": "1 สิบ กับ 0 หน่วย",
          "en": "1 ten & 0 ones",
          "zh": "1个十和0个一"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-mat-e3-3",
        "label": {
          "th": "1 สิบ กับ 5 หน่วย",
          "en": "1 ten & 5 ones",
          "zh": "1个十和5个一"
        },
        "icon": "1️⃣5️⃣"
      }
    ],
    "correctOptionId": "opt-k3-mat-e3-3",
    "explanation": {
      "th": "15 คือ 1 สิบ รวมกับ 5 หน่วย เก่งมากครับ!",
      "en": "Spot on! 15 is 1 ten and 5 ones.",
      "zh": "太棒了！15 代表 1 个十和 5 个一。"
    }
  },
  {
    "id": "k3-mat-e4",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "การบวกเลขสองหลักง่ายๆ: 10 + 6 เท่ากับเท่าไร?",
      "en": "Simple addition: What is 10 + 6?",
      "zh": "两位数基础加法：10 + 6 等于几？"
    },
    "illustration": "🔟 + 6️⃣ = ❓",
    "illustrationSubtitle": {
      "th": "10 บวก 6",
      "en": "10 plus 6",
      "zh": "加法 10 加 6"
    },
    "options": [
      {
        "id": "opt-k3-mat-e4-1",
        "label": {
          "th": "16",
          "en": "Sixteen (16)",
          "zh": "16"
        },
        "icon": "1️⃣6️⃣"
      },
      {
        "id": "opt-k3-mat-e4-2",
        "label": {
          "th": "15",
          "en": "Fifteen (15)",
          "zh": "15"
        },
        "icon": "1️⃣5️⃣"
      },
      {
        "id": "opt-k3-mat-e4-3",
        "label": {
          "th": "17",
          "en": "Seventeen (17)",
          "zh": "17"
        },
        "icon": "1️⃣7️⃣"
      }
    ],
    "correctOptionId": "opt-k3-mat-e4-1",
    "explanation": {
      "th": "10 รวมกับ 6 ได้ 16 เก่งมากครับ!",
      "en": "Correct! 10 + 6 = 16.",
      "zh": "答对啦！10 + 6 = 16。"
    }
  },
  {
    "id": "k3-mat-e5",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "เหรียญ 10 บาท 🪙 1 เหรียญ แลกเป็นเหรียญ 5 บาทได้กี่เหรียญ?",
      "en": "One 10-Baht coin 🪙 can be exchanged for how many 5-Baht coins?",
      "zh": "1 枚 10 铢硬币 🪙 可以兑换几枚 5 铢硬币？"
    },
    "illustration": "🪙 (10 บาท) = 🪙 (5 บาท) x ?",
    "illustrationSubtitle": {
      "th": "การแลกเงินเหรียญ",
      "en": "Exchange 10 Baht for 5 Baht",
      "zh": "钱币等额兑换"
    },
    "options": [
      {
        "id": "opt-k3-mat-e5-1",
        "label": {
          "th": "1 เหรียญ",
          "en": "1 coin",
          "zh": "1 枚"
        },
        "icon": "1️⃣"
      },
      {
        "id": "opt-k3-mat-e5-2",
        "label": {
          "th": "2 เหรียญ",
          "en": "2 coins",
          "zh": "2 枚"
        },
        "icon": "2️⃣"
      },
      {
        "id": "opt-k3-mat-e5-3",
        "label": {
          "th": "3 เหรียญ",
          "en": "3 coins",
          "zh": "3 枚"
        },
        "icon": "3️⃣"
      }
    ],
    "correctOptionId": "opt-k3-mat-e5-2",
    "explanation": {
      "th": "5 บาท 2 เหรียญ รวมเป็น 10 บาท เก่งมากครับ!",
      "en": "Right! Two 5-Baht coins equal 10 Baht.",
      "zh": "答对了！可以换 2 枚 5 铢硬币。"
    }
  },
  {
    "id": "k3-mat-e6",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "ในหนึ่งสัปดาห์มีกี่วัน? 📅 (อาทิตย์ ถึง เสาร์)",
      "en": "How many days are in one week? 📅",
      "zh": "一个星期（周日到周六）一共有几天？📅"
    },
    "illustration": "📅 🗓️ 📅",
    "illustrationSubtitle": {
      "th": "จำนวนวันในหนึ่งสัปดาห์",
      "en": "7 days in a week",
      "zh": "一周有七天"
    },
    "options": [
      {
        "id": "opt-k3-mat-e6-1",
        "label": {
          "th": "5 วัน",
          "en": "5 days",
          "zh": "5 天"
        },
        "icon": "5️⃣"
      },
      {
        "id": "opt-k3-mat-e6-2",
        "label": {
          "th": "6 วัน",
          "en": "6 days",
          "zh": "6 天"
        },
        "icon": "6️⃣"
      },
      {
        "id": "opt-k3-mat-e6-3",
        "label": {
          "th": "7 วัน",
          "en": "7 days",
          "zh": "7 天"
        },
        "icon": "7️⃣"
      }
    ],
    "correctOptionId": "opt-k3-mat-e6-3",
    "explanation": {
      "th": "หนึ่งสัปดาห์มี 7 วัน ยอดเยี่ยมครับ!",
      "en": "Awesome! There are 7 days in a week.",
      "zh": "太棒啦！一个星期有 7 天。"
    }
  },
  {
    "id": "k3-mat-e7",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "การลบเลข: 9 - 5 ได้ผลลัพธ์เท่ากับเท่าไร?",
      "en": "Subtraction: What is 9 - 5?",
      "zh": "减法运算：9 - 5 等于几？"
    },
    "illustration": "9️⃣ - 5️⃣ = ❓",
    "illustrationSubtitle": {
      "th": "9 ลบ 5",
      "en": "9 minus 5",
      "zh": "减法 9 减 5"
    },
    "options": [
      {
        "id": "opt-k3-mat-e7-1",
        "label": {
          "th": "4",
          "en": "Four (4)",
          "zh": "4"
        },
        "icon": "4️⃣"
      },
      {
        "id": "opt-k3-mat-e7-2",
        "label": {
          "th": "3",
          "en": "Three (3)",
          "zh": "3"
        },
        "icon": "3️⃣"
      },
      {
        "id": "opt-k3-mat-e7-3",
        "label": {
          "th": "5",
          "en": "Five (5)",
          "zh": "5"
        },
        "icon": "5️⃣"
      }
    ],
    "correctOptionId": "opt-k3-mat-e7-1",
    "explanation": {
      "th": "9 หักออก 5 เหลือ 4 เก่งมากครับ!",
      "en": "Correct! 9 - 5 = 4.",
      "zh": "答对啦！9 减 5 等于 4。"
    }
  },
  {
    "id": "k3-mat-e8",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "รูปเรขาคณิตสามมิติลูกเต๋า 🎲 มีรูปทรงแบบใด?",
      "en": "What 3D geometric shape is a playing die 🎲?",
      "zh": "游戏骰子 🎲 属于哪一种立体几何图形？"
    },
    "illustration": "🎲 🧊 🎲",
    "illustrationSubtitle": {
      "th": "ทรงลูกบาศก์",
      "en": "Cube 3D shape",
      "zh": "正方体/立方体"
    },
    "options": [
      {
        "id": "opt-k3-mat-e8-1",
        "label": {
          "th": "ทรงกลม",
          "en": "Sphere",
          "zh": "球体"
        },
        "icon": "⚽"
      },
      {
        "id": "opt-k3-mat-e8-2",
        "label": {
          "th": "ทรงลูกบาศก์ (สี่เหลี่ยมด้านเท่า)",
          "en": "Cube",
          "zh": "正方体 / 立方体 🎲"
        },
        "icon": "🎲"
      },
      {
        "id": "opt-k3-mat-e8-3",
        "label": {
          "th": "ทรงกระบอก",
          "en": "Cylinder",
          "zh": "圆柱体"
        },
        "icon": "🥫"
      }
    ],
    "correctOptionId": "opt-k3-mat-e8-2",
    "explanation": {
      "th": "ลูกเต๋าเป็นทรงลูกบาศก์ที่มี 6 หน้าเท่ากัน เก่งมากครับ!",
      "en": "Right! A die is a cube.",
      "zh": "答对了！骰子是正方体。"
    }
  },
  {
    "id": "k3-mat-e9",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "การบวกเลข: 6 + 6 มีผลลัพธ์เท่ากับเท่าไร?",
      "en": "Addition: What is 6 + 6 (doubles)?",
      "zh": "同数相加：6 + 6 等于几？"
    },
    "illustration": "6️⃣ + 6️⃣ = ❓",
    "illustrationSubtitle": {
      "th": "บวกเลขซ้ำ 6 บวก 6",
      "en": "Doubles: 6 + 6",
      "zh": "加法 6 加 6"
    },
    "options": [
      {
        "id": "opt-k3-mat-e9-1",
        "label": {
          "th": "10",
          "en": "Ten",
          "zh": "10"
        },
        "icon": "🔟"
      },
      {
        "id": "opt-k3-mat-e9-2",
        "label": {
          "th": "11",
          "en": "Eleven",
          "zh": "11"
        },
        "icon": "1️⃣1️⃣"
      },
      {
        "id": "opt-k3-mat-e9-3",
        "label": {
          "th": "12",
          "en": "Twelve",
          "zh": "12"
        },
        "icon": "1️⃣2️⃣"
      }
    ],
    "correctOptionId": "opt-k3-mat-e9-3",
    "explanation": {
      "th": "6 บวก 6 ได้ 12 ยอดเยี่ยมมากครับ!",
      "en": "Spot on! 6 + 6 = 12.",
      "zh": "太棒了！6 + 6 = 12。"
    }
  },
  {
    "id": "k3-mat-e10",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 1,
    "question": {
      "th": "ตัวเลขใดมีค่า \"น้อยที่สุด\" ในกลุ่มนี้? 12, 8, 15",
      "en": "Which number is the \"Smallest\"? 12, 8, 15",
      "zh": "下列数字中哪一个“最小”？12, 8, 15"
    },
    "illustration": "1️⃣2️⃣ 8️⃣ 1️⃣5️⃣",
    "illustrationSubtitle": {
      "th": "เปรียบเทียบหาค่าน้อยที่สุด",
      "en": "Find smallest number",
      "zh": "找出最小数"
    },
    "options": [
      {
        "id": "opt-k3-mat-e10-1",
        "label": {
          "th": "8",
          "en": "Eight (Smallest)",
          "zh": "8（最小）"
        },
        "icon": "8️⃣"
      },
      {
        "id": "opt-k3-mat-e10-2",
        "label": {
          "th": "12",
          "en": "Twelve",
          "zh": "12"
        },
        "icon": "1️⃣2️⃣"
      },
      {
        "id": "opt-k3-mat-e10-3",
        "label": {
          "th": "15",
          "en": "Fifteen",
          "zh": "15"
        },
        "icon": "1️⃣5️⃣"
      }
    ],
    "correctOptionId": "opt-k3-mat-e10-1",
    "explanation": {
      "th": "8 มีค่าน้อยที่สุด เก่งมากครับ!",
      "en": "Correct! 8 is the smallest.",
      "zh": "答对啦！8 是最小的数字。"
    }
  },
  {
    "id": "k3-mat-m1",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "โจทย์ปัญหา: คุณแม่ซื้อนมกล่องมา 8 กล่อง 🥛 ดื่มไปแล้ว 3 กล่อง จะเหลือนมกี่กล่อง?",
      "en": "Word problem: Mom bought 8 milk cartons 🥛. You drank 3. How many cartons left?",
      "zh": "应用题：妈妈买了 8 盒牛奶 🥛，喝了 3 盒，还剩下几盒牛奶？"
    },
    "illustration": "🥛 (8) - 🥛 (3)",
    "illustrationSubtitle": {
      "th": "8 ลบ 3",
      "en": "8 minus 3",
      "zh": "减法 8 减 3"
    },
    "options": [
      {
        "id": "opt-k3-mat-m1-1",
        "label": {
          "th": "4 กล่อง",
          "en": "4 cartons",
          "zh": "4 盒"
        },
        "icon": "4️⃣"
      },
      {
        "id": "opt-k3-mat-m1-2",
        "label": {
          "th": "5 กล่อง",
          "en": "5 cartons",
          "zh": "5 盒"
        },
        "icon": "5️⃣"
      },
      {
        "id": "opt-k3-mat-m1-3",
        "label": {
          "th": "6 กล่อง",
          "en": "6 cartons",
          "zh": "6 盒"
        },
        "icon": "6️⃣"
      }
    ],
    "correctOptionId": "opt-k3-mat-m1-2",
    "explanation": {
      "th": "8 ลบ 3 เหลือนม 5 กล่อง เก่งมากครับ!",
      "en": "Correct! 8 - 3 = 5 cartons.",
      "zh": "答对啦！8 减 3 剩下 5 盒。"
    }
  },
  {
    "id": "k3-mat-m2",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "การบวกเลขสองหลักกับหนึ่งหลัก: 12 + 5 มีค่าเท่ากับเท่าไร?",
      "en": "Addition: What is 12 + 5?",
      "zh": "两位数加一位数：12 + 5 等于几？"
    },
    "illustration": "1️⃣2️⃣ + 5️⃣ = ❓",
    "illustrationSubtitle": {
      "th": "12 บวก 5",
      "en": "12 plus 5",
      "zh": "加法 12 加 5"
    },
    "options": [
      {
        "id": "opt-k3-mat-m2-1",
        "label": {
          "th": "16",
          "en": "Sixteen",
          "zh": "16"
        },
        "icon": "1️⃣6️⃣"
      },
      {
        "id": "opt-k3-mat-m2-2",
        "label": {
          "th": "18",
          "en": "Eighteen",
          "zh": "18"
        },
        "icon": "1️⃣8️⃣"
      },
      {
        "id": "opt-k3-mat-m2-3",
        "label": {
          "th": "17",
          "en": "Seventeen",
          "zh": "17"
        },
        "icon": "1️⃣7️⃣"
      }
    ],
    "correctOptionId": "opt-k3-mat-m2-3",
    "explanation": {
      "th": "12 รวมกับ 5 ได้ 17 เก่งมากครับ!",
      "en": "Right! 12 + 5 = 17.",
      "zh": "答对了！12 + 5 = 17。"
    }
  },
  {
    "id": "k3-mat-m3",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "เครื่องมือชนิดใดใช้สำหรับ \"วัดความยาว\" ของสมุดหนังสือ? 📏",
      "en": "Which tool is used to \"measure length\" of a book? 📏",
      "zh": "哪一种工具用来“测量长度”？📏"
    },
    "illustration": "📏 📐 📏",
    "illustrationSubtitle": {
      "th": "เครื่องมือวัดความยาว",
      "en": "Measurement tool for length",
      "zh": "测量长度的工具"
    },
    "options": [
      {
        "id": "opt-k3-mat-m3-1",
        "label": {
          "th": "ไม้บรรทัด 📏",
          "en": "Ruler",
          "zh": "尺子 📏"
        },
        "icon": "📏"
      },
      {
        "id": "opt-k3-mat-m3-2",
        "label": {
          "th": "ตาชั่งสองแขน ⚖️",
          "en": "Balance scale",
          "zh": "天平"
        },
        "icon": "⚖️"
      },
      {
        "id": "opt-k3-mat-m3-3",
        "label": {
          "th": "นาฬิกาจับเวลา ⏱️",
          "en": "Stopwatch",
          "zh": "秒表"
        },
        "icon": "⏱️"
      }
    ],
    "correctOptionId": "opt-k3-mat-m3-1",
    "explanation": {
      "th": "ไม้บรรทัดใช้สำหรับวัดความยาวเป็นเซนติเมตร เก่งมากครับ!",
      "en": "Correct! Rulers measure length.",
      "zh": "答对啦！尺子用来测量长度。"
    }
  },
  {
    "id": "k3-mat-m4",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "มีขนมเค้ก 1 ชิ้น ตัดแบ่งครึ่ง แล้วตัดแบ่งครึ่งอีกครั้ง ได้เค้กกี่ชิ้นเท่าๆ กัน? 🍰",
      "en": "Cut a cake into halves, then cut each half in half. How many equal pieces? 🍰",
      "zh": "一块蛋糕切成两半，再把每一半都均等切开，一共得到几块等大的蛋糕？🍰"
    },
    "illustration": "🍰 ✂️ 🍰",
    "illustrationSubtitle": {
      "th": "การแบ่งเศษส่วน 1/4",
      "en": "Fraction: 4 quarters",
      "zh": "四等分"
    },
    "options": [
      {
        "id": "opt-k3-mat-m4-1",
        "label": {
          "th": "2 ชิ้น",
          "en": "2 pieces",
          "zh": "2 块"
        },
        "icon": "2️⃣"
      },
      {
        "id": "opt-k3-mat-m4-2",
        "label": {
          "th": "4 ชิ้น",
          "en": "4 pieces",
          "zh": "4 块"
        },
        "icon": "4️⃣"
      },
      {
        "id": "opt-k3-mat-m4-3",
        "label": {
          "th": "6 ชิ้น",
          "en": "6 pieces",
          "zh": "6 块"
        },
        "icon": "6️⃣"
      }
    ],
    "correctOptionId": "opt-k3-mat-m4-2",
    "explanation": {
      "th": "ตัดแบ่ง 2 ส่วนแล้วแบ่งอีก ได้ 4 ชิ้นเท่าๆ กัน (หนึ่งในสี่) เก่งมากครับ!",
      "en": "Awesome! 2 halves cut again make 4 equal pieces.",
      "zh": "答对了！一共得到 4 块等大的蛋糕。"
    }
  },
  {
    "id": "k3-mat-m5",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "อนุกรมตัวเลข: 5, 10, 15, ... ตัวเลขต่อไปคือเลขใด?",
      "en": "Number pattern: 5, 10, 15, ... What is next (counting by 5s)?",
      "zh": "数字规律：5, 10, 15, ... 接下来的数字是几（每次加 5）？"
    },
    "illustration": "5️⃣ 🔟 1️⃣5️⃣ ❓",
    "illustrationSubtitle": {
      "th": "นับเพิ่มทีละ 5",
      "en": "Count by 5s",
      "zh": "5的倍数规律"
    },
    "options": [
      {
        "id": "opt-k3-mat-m5-1",
        "label": {
          "th": "18",
          "en": "Eighteen",
          "zh": "18"
        },
        "icon": "1️⃣8️⃣"
      },
      {
        "id": "opt-k3-mat-m5-2",
        "label": {
          "th": "19",
          "en": "Nineteen",
          "zh": "19"
        },
        "icon": "1️⃣9️⃣"
      },
      {
        "id": "opt-k3-mat-m5-3",
        "label": {
          "th": "20",
          "en": "Twenty",
          "zh": "20"
        },
        "icon": "2️⃣0️⃣"
      }
    ],
    "correctOptionId": "opt-k3-mat-m5-3",
    "explanation": {
      "th": "เพิ่มทีละ 5: 5, 10, 15 แล้วก็ 20 เก่งมากครับ!",
      "en": "Spot on! Counting by 5s gives 20.",
      "zh": "太棒啦！接下来的数字是 20。"
    }
  },
  {
    "id": "k3-mat-m6",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "โจทย์ปัญหา: ดินสอแท่งละ 3 บาท ✏️ ซื้อ 2 แท่ง ต้องจ่ายเงินกี่บาท?",
      "en": "Word problem: Pencils cost 3 Baht each ✏️. How much for 2 pencils?",
      "zh": "应用题：铅笔每支 3 铢 ✏️，买 2 支铅笔一共需要付多少铢？"
    },
    "illustration": "✏️ (3) + ✏️ (3)",
    "illustrationSubtitle": {
      "th": "3 บวก 3",
      "en": "3 + 3 = 6",
      "zh": "连加 3 + 3"
    },
    "options": [
      {
        "id": "opt-k3-mat-m6-1",
        "label": {
          "th": "6 บาท",
          "en": "6 Baht",
          "zh": "6 铢"
        },
        "icon": "6️⃣"
      },
      {
        "id": "opt-k3-mat-m6-2",
        "label": {
          "th": "5 บาท",
          "en": "5 Baht",
          "zh": "5 铢"
        },
        "icon": "5️⃣"
      },
      {
        "id": "opt-k3-mat-m6-3",
        "label": {
          "th": "7 บาท",
          "en": "7 Baht",
          "zh": "7 铢"
        },
        "icon": "7️⃣"
      }
    ],
    "correctOptionId": "opt-k3-mat-m6-1",
    "explanation": {
      "th": "3 + 3 เท่ากับ 6 บาท เก่งมากครับ!",
      "en": "Correct! 3 + 3 = 6 Baht.",
      "zh": "答对啦！3 + 3 = 6 铢。"
    }
  },
  {
    "id": "k3-mat-m7",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "การลบเลข: 15 - 5 ได้ผลลัพธ์เท่ากับเท่าไร?",
      "en": "Subtraction: What is 15 - 5?",
      "zh": "减法运算：15 - 5 等于几？"
    },
    "illustration": "1️⃣5️⃣ - 5️⃣ = ❓",
    "illustrationSubtitle": {
      "th": "15 ลบ 5",
      "en": "15 minus 5",
      "zh": "减法 15 减 5"
    },
    "options": [
      {
        "id": "opt-k3-mat-m7-1",
        "label": {
          "th": "9",
          "en": "Nine",
          "zh": "9"
        },
        "icon": "9️⃣"
      },
      {
        "id": "opt-k3-mat-m7-2",
        "label": {
          "th": "10",
          "en": "Ten",
          "zh": "10"
        },
        "icon": "🔟"
      },
      {
        "id": "opt-k3-mat-m7-3",
        "label": {
          "th": "11",
          "en": "Eleven",
          "zh": "11"
        },
        "icon": "1️⃣1️⃣"
      }
    ],
    "correctOptionId": "opt-k3-mat-m7-2",
    "explanation": {
      "th": "15 หักออก 5 เหลือ 10 พอดี เก่งมากครับ!",
      "en": "Right! 15 - 5 = 10.",
      "zh": "答对了！15 减 5 等于 10。"
    }
  },
  {
    "id": "k3-mat-m8",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "เข็มสั้นชี้ระหว่างเลข 4 กับ 5 เข็มยาวชี้เลข 6 🕟 หมายถึงเวลาใด?",
      "en": "Clock: Short hand between 4 and 5, long hand at 6 🕟. What time is it?",
      "zh": "时钟短针指在 4 和 5 之间，长针指着 6 🕟，现在是几点几分？"
    },
    "illustration": "🕟 ⏰ 🕟",
    "illustrationSubtitle": {
      "th": "การบอกเวลาครึ่งชั่วโมง (30 นาที)",
      "en": "Half past four (4:30)",
      "zh": "认读时钟：4点半"
    },
    "options": [
      {
        "id": "opt-k3-mat-m8-1",
        "label": {
          "th": "4 นาฬิกาตรง",
          "en": "4:00",
          "zh": "4 点整"
        },
        "icon": "🕓"
      },
      {
        "id": "opt-k3-mat-m8-2",
        "label": {
          "th": "5 นาฬิกาตรง",
          "en": "5:00",
          "zh": "5 点整"
        },
        "icon": "🕔"
      },
      {
        "id": "opt-k3-mat-m8-3",
        "label": {
          "th": "4 นาฬิกา 30 นาที (4 โมงครึ่ง)",
          "en": "4:30 (half past 4)",
          "zh": "4 点 30 分（4点半）"
        },
        "icon": "🕟"
      }
    ],
    "correctOptionId": "opt-k3-mat-m8-3",
    "explanation": {
      "th": "เข็มยาวชี้เลข 6 คือ 30 นาที เป็นเวลา 4 โมงครึ่ง ยอดเยี่ยมครับ!",
      "en": "Awesome! It shows 4:30 (half past 4).",
      "zh": "太棒了！是 4 点半。"
    }
  },
  {
    "id": "k3-mat-m9",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "โจทย์ระคน: มีส้ม 10 ผล 🍊 กินไป 2 ผล 😋 แล้วคุณพ่อให้อีก 3 ผล 🍊 รวมมีส้มกี่ผล?",
      "en": "Mixed operation: You have 10 oranges. Eat 2, then dad gives you 3. How many now?",
      "zh": "混合运算题：有 10 个橙子，吃掉 2 个，爸爸又给了 3 个。现在一共有几个？"
    },
    "illustration": "(10 - 2) + 3",
    "illustrationSubtitle": {
      "th": "10 ลบ 2 บวก 3",
      "en": "Mixed math: (10-2)+3",
      "zh": "混合运算 (10-2)+3"
    },
    "options": [
      {
        "id": "opt-k3-mat-m9-1",
        "label": {
          "th": "11 ผล",
          "en": "11 oranges",
          "zh": "11 个"
        },
        "icon": "1️⃣1️⃣"
      },
      {
        "id": "opt-k3-mat-m9-2",
        "label": {
          "th": "10 ผล",
          "en": "10 oranges",
          "zh": "10 个"
        },
        "icon": "🔟"
      },
      {
        "id": "opt-k3-mat-m9-3",
        "label": {
          "th": "12 ผล",
          "en": "12 oranges",
          "zh": "12 个"
        },
        "icon": "1️⃣2️⃣"
      }
    ],
    "correctOptionId": "opt-k3-mat-m9-1",
    "explanation": {
      "th": "10 ลบ 2 เหลือ 8 แล้วบวกอีก 3 รวมเป็น 11 ผล เก่งมากครับ!",
      "en": "Correct! 10 - 2 = 8, then 8 + 3 = 11 oranges.",
      "zh": "答对啦！10-2=8，8+3=11 个橙子。"
    }
  },
  {
    "id": "k3-mat-m10",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 2,
    "question": {
      "th": "รูปทรงเรขาคณิตรูปใดมี \"6 เหลี่ยม 6 ด้าน\" เหมือนรังผึ้ง? 🐝",
      "en": "Which polygon has 6 sides and 6 corners like a honeycomb? 🐝",
      "zh": "哪一个几何图形具有“6 条边和 6 个角”，长得像蜂巢一样？🐝"
    },
    "illustration": "🐝 ⬡ 🐝",
    "illustrationSubtitle": {
      "th": "รูปหกเหลี่ยม",
      "en": "Hexagon (6 sides)",
      "zh": "六边形"
    },
    "options": [
      {
        "id": "opt-k3-mat-m10-1",
        "label": {
          "th": "รูปห้าเหลี่ยม",
          "en": "Pentagon (5 sides)",
          "zh": "五边形"
        },
        "icon": "⬠"
      },
      {
        "id": "opt-k3-mat-m10-2",
        "label": {
          "th": "รูปหกเหลี่ยม ⬡",
          "en": "Hexagon (6 sides)",
          "zh": "六边形 ⬡"
        },
        "icon": "⬡"
      },
      {
        "id": "opt-k3-mat-m10-3",
        "label": {
          "th": "รูปแปดเหลี่ยม",
          "en": "Octagon (8 sides)",
          "zh": "八边形"
        },
        "icon": "🛑"
      }
    ],
    "correctOptionId": "opt-k3-mat-m10-2",
    "explanation": {
      "th": "รังผึ้งประกอบด้วยรูปหกเหลี่ยมที่มี 6 ด้าน เก่งมากครับ!",
      "en": "Right! Honeycombs are made of hexagons.",
      "zh": "答对了！蜂巢是六边形。"
    }
  },
  {
    "id": "k3-mat-h1",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "โจทย์ตรรกะ: มดแดงวิ่งเร็วกว่าเต่า 🐜 แต่เต่าวิ่งเร็วกว่าหอยทาก 🐌 ใครวิ่งเร็วที่สุด?",
      "en": "Logic: Ant is faster than turtle 🐜. Turtle is faster than snail 🐌. Who is fastest?",
      "zh": "逻辑推理：红蚂蚁比乌龟跑得快 🐜，乌龟又比蜗牛跑得快 🐌。谁跑得最快？"
    },
    "illustration": "🐜 🆚 🐢 🆚 🐌",
    "illustrationSubtitle": {
      "th": "การเปรียบเทียบเชิงตรรกะ",
      "en": "Logic reasoning: Who is fastest?",
      "zh": "逻辑比快慢"
    },
    "options": [
      {
        "id": "opt-k3-mat-h1-1",
        "label": {
          "th": "หอยทาก",
          "en": "Snail",
          "zh": "蜗牛"
        },
        "icon": "🐌"
      },
      {
        "id": "opt-k3-mat-h1-2",
        "label": {
          "th": "เต่า",
          "en": "Turtle",
          "zh": "乌龟"
        },
        "icon": "🐢"
      },
      {
        "id": "opt-k3-mat-h1-3",
        "label": {
          "th": "มดแดง",
          "en": "Ant",
          "zh": "红蚂蚁"
        },
        "icon": "🐜"
      }
    ],
    "correctOptionId": "opt-k3-mat-h1-3",
    "explanation": {
      "th": "มดแดง เร็วกว่าเต่า และเต่าเร็วกว่าหอยทาก มดแดงจึงเร็วที่สุด เก่งมากครับ!",
      "en": "Spot on! The ant is the fastest.",
      "zh": "太棒了！红蚂蚁跑得最快。"
    }
  },
  {
    "id": "k3-mat-h2",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "โจทย์ปัญหา: ในห้องเรียนมีนักเรียนชาย 6 คน 👦 นักเรียนหญิง 7 คน 👧 รวมมีนักเรียนกี่คน?",
      "en": "Word problem: Classroom has 6 boys 👦 and 7 girls 👧. How many students in total?",
      "zh": "应用题：班级里有 6 名男生 👦 和 7 名女生 👧。一共有多少名学生？"
    },
    "illustration": "👦 (6) + 👧 (7)",
    "illustrationSubtitle": {
      "th": "6 บวก 7",
      "en": "6 plus 7",
      "zh": "加法 6 加 7"
    },
    "options": [
      {
        "id": "opt-k3-mat-h2-1",
        "label": {
          "th": "13 คน",
          "en": "13 students",
          "zh": "13 名"
        },
        "icon": "1️⃣3️⃣"
      },
      {
        "id": "opt-k3-mat-h2-2",
        "label": {
          "th": "12 คน",
          "en": "12 students",
          "zh": "12 名"
        },
        "icon": "1️⃣2️⃣"
      },
      {
        "id": "opt-k3-mat-h2-3",
        "label": {
          "th": "14 คน",
          "en": "14 students",
          "zh": "14 名"
        },
        "icon": "1️⃣4️⃣"
      }
    ],
    "correctOptionId": "opt-k3-mat-h2-1",
    "explanation": {
      "th": "6 + 7 เท่ากับ 13 คน ถูกต้องครับ!",
      "en": "Correct! 6 + 7 = 13 students.",
      "zh": "答对啦！6 + 7 = 13 名学生。"
    }
  },
  {
    "id": "k3-mat-h3",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "เหรียญ 10 บาท 2 เหรียญ 🪙🪙 รวมเป็นเงินกี่บาท?",
      "en": "What is the total value of two 10-Baht coins 🪙🪙?",
      "zh": "2 枚 10 铢硬币 🪙🪙 加在一起是多少铢？"
    },
    "illustration": "🪙(10) + 🪙(10)",
    "illustrationSubtitle": {
      "th": "10 บวก 10",
      "en": "10 plus 10",
      "zh": "加法 10 加 10"
    },
    "options": [
      {
        "id": "opt-k3-mat-h3-1",
        "label": {
          "th": "15 บาท",
          "en": "15 Baht",
          "zh": "15 铢"
        },
        "icon": "1️⃣5️⃣"
      },
      {
        "id": "opt-k3-mat-h3-2",
        "label": {
          "th": "20 บาท",
          "en": "20 Baht",
          "zh": "20 铢"
        },
        "icon": "2️⃣0️⃣"
      },
      {
        "id": "opt-k3-mat-h3-3",
        "label": {
          "th": "25 บาท",
          "en": "25 Baht",
          "zh": "25 铢"
        },
        "icon": "2️⃣5️⃣"
      }
    ],
    "correctOptionId": "opt-k3-mat-h3-2",
    "explanation": {
      "th": "10 + 10 เท่ากับ 20 บาท เก่งมากครับ!",
      "en": "Right! 10 + 10 = 20 Baht.",
      "zh": "答对了！10 + 10 = 20 铢。"
    }
  },
  {
    "id": "k3-mat-h4",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "ถ้านำลูกบาศก์ไม้ 🧊 มาวางซ้อนกัน 3 ชั้น ชั้นละ 2 ลูก จะมีลูกบาศก์ทั้งหมดกี่ลูก?",
      "en": "Stack blocks: 3 layers, 2 blocks on each layer. How many blocks in total?",
      "zh": "积木搭建：搭了 3 层，每一层有 2 块积木。一共有多少块积木？"
    },
    "illustration": "🧊 3 ชั้น x 2 ลูก",
    "illustrationSubtitle": {
      "th": "2 บวกกัน 3 ครั้ง (2x3)",
      "en": "3 layers of 2 blocks",
      "zh": "积木乘法启蒙 3x2"
    },
    "options": [
      {
        "id": "opt-k3-mat-h4-1",
        "label": {
          "th": "5 ลูก",
          "en": "5 blocks",
          "zh": "5 块"
        },
        "icon": "5️⃣"
      },
      {
        "id": "opt-k3-mat-h4-2",
        "label": {
          "th": "7 ลูก",
          "en": "7 blocks",
          "zh": "7 块"
        },
        "icon": "7️⃣"
      },
      {
        "id": "opt-k3-mat-h4-3",
        "label": {
          "th": "6 ลูก",
          "en": "6 blocks",
          "zh": "6 块"
        },
        "icon": "6️⃣"
      }
    ],
    "correctOptionId": "opt-k3-mat-h4-3",
    "explanation": {
      "th": "2 + 2 + 2 เท่ากับ 6 ลูก เก่งมากครับ!",
      "en": "Awesome! 2 + 2 + 2 = 6 blocks.",
      "zh": "太棒啦！一共是 6 块积木。"
    }
  },
  {
    "id": "k3-mat-h5",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "จำนวนใดเป็น \"เลขคู่\" (หารสองลงตัว จับคู่ได้พอดี)? 4, 7, 9",
      "en": "Which number is an \"Even number\" (divisible by 2)? 4, 7, 9",
      "zh": "下列哪一个数字是成双成对的“偶数/双数”？4, 7, 9"
    },
    "illustration": "4️⃣ 🆚 7️⃣ 🆚 9️⃣",
    "illustrationSubtitle": {
      "th": "เลขคู่และเลขคี่",
      "en": "Even vs Odd numbers",
      "zh": "奇数与偶数"
    },
    "options": [
      {
        "id": "opt-k3-mat-h5-1",
        "label": {
          "th": "4 (จับคู่ได้ 2 คู่พอดี)",
          "en": "4 (Even number)",
          "zh": "4（能均分成2对）"
        },
        "icon": "4️⃣"
      },
      {
        "id": "opt-k3-mat-h5-2",
        "label": {
          "th": "7 (เหลือเศษ 1)",
          "en": "7 (Odd)",
          "zh": "7（奇数）"
        },
        "icon": "7️⃣"
      },
      {
        "id": "opt-k3-mat-h5-3",
        "label": {
          "th": "9 (เหลือเศษ 1)",
          "en": "9 (Odd)",
          "zh": "9（奇数）"
        },
        "icon": "9️⃣"
      }
    ],
    "correctOptionId": "opt-k3-mat-h5-1",
    "explanation": {
      "th": "เลข 4 แบ่งเป็นคู่ได้พอดี จึงเป็นเลขคู่ เก่งมากครับ!",
      "en": "Correct! 4 is an even number.",
      "zh": "答对啦！4 是偶数。"
    }
  },
  {
    "id": "k3-mat-h6",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "โจทย์ปัญหา: มีเงิน 20 บาท ซื้อไอศกรีม 12 บาท 🍦 จะได้รับเงินทอนกี่บาท?",
      "en": "Word problem: You have 20 Baht. You buy ice cream for 12 Baht 🍦. What is your change?",
      "zh": "应用题：你有 20 铢，买了一个 12 铢的冰淇淋 🍦。收银员应该找给你几铢零钱？"
    },
    "illustration": "2️⃣0️⃣ - 1️⃣2️⃣ = ❓",
    "illustrationSubtitle": {
      "th": "20 ลบ 12",
      "en": "20 minus 12",
      "zh": "减法 20 减 12"
    },
    "options": [
      {
        "id": "opt-k3-mat-h6-1",
        "label": {
          "th": "7 บาท",
          "en": "7 Baht",
          "zh": "7 铢"
        },
        "icon": "7️⃣"
      },
      {
        "id": "opt-k3-mat-h6-2",
        "label": {
          "th": "8 บาท",
          "en": "8 Baht",
          "zh": "8 铢"
        },
        "icon": "8️⃣"
      },
      {
        "id": "opt-k3-mat-h6-3",
        "label": {
          "th": "9 บาท",
          "en": "9 Baht",
          "zh": "9 铢"
        },
        "icon": "9️⃣"
      }
    ],
    "correctOptionId": "opt-k3-mat-h6-2",
    "explanation": {
      "th": "20 ลบ 12 ได้เงินทอน 8 บาท เก่งมากครับ!",
      "en": "Right! 20 - 12 = 8 Baht change.",
      "zh": "答对了！应该找回 8 铢零钱。"
    }
  },
  {
    "id": "k3-mat-h7",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "รูปทรงกระบอก 🥫 มีด้านบนและด้านล่างเป็นรูปทรงเรขาคณิตใด?",
      "en": "What 2D shape are the top and bottom faces of a cylinder 🥫?",
      "zh": "圆柱体 🥫 的顶部和底面是什么平面几何形状？"
    },
    "illustration": "🥫 🟡 🥫",
    "illustrationSubtitle": {
      "th": "หน้าตัดของทรงกระบอก",
      "en": "Faces of a cylinder",
      "zh": "圆柱体顶底面"
    },
    "options": [
      {
        "id": "opt-k3-mat-h7-1",
        "label": {
          "th": "สี่เหลี่ยม",
          "en": "Square",
          "zh": "正方形"
        },
        "icon": "🟦"
      },
      {
        "id": "opt-k3-mat-h7-2",
        "label": {
          "th": "สามเหลี่ยม",
          "en": "Triangle",
          "zh": "三角形"
        },
        "icon": "🔺"
      },
      {
        "id": "opt-k3-mat-h7-3",
        "label": {
          "th": "วงกลม 🟡",
          "en": "Circle",
          "zh": "圆形 🟡"
        },
        "icon": "🟡"
      }
    ],
    "correctOptionId": "opt-k3-mat-h7-3",
    "explanation": {
      "th": "ด้านบนและล่างของทรงกระบอกเป็นวงกลม เก่งมากครับ!",
      "en": "Spot on! The top and bottom are circles.",
      "zh": "太棒了！圆柱体的顶面和底面都是圆形。"
    }
  },
  {
    "id": "k3-mat-h8",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "ลำดับที่: ถ้าหนูวิ่งเข้าเส้นชัยเป็นคนที่ 3 🥉 หนูได้อันดับที่เท่าไร?",
      "en": "Ordinal numbers: If you cross the finish line 3rd 🥉, what place are you?",
      "zh": "序数词：如果你第 3 个冲过终点线 🥉，你获得了第几名？"
    },
    "illustration": "🥇 🥈 🥉",
    "illustrationSubtitle": {
      "th": "อันดับที่ (ลำดับที่)",
      "en": "Ordinal: 3rd place",
      "zh": "第几名/序数词"
    },
    "options": [
      {
        "id": "opt-k3-mat-h8-1",
        "label": {
          "th": "อันดับที่ 3",
          "en": "3rd place",
          "zh": "第 3 名"
        },
        "icon": "🥉"
      },
      {
        "id": "opt-k3-mat-h8-2",
        "label": {
          "th": "อันดับที่ 1",
          "en": "1st place",
          "zh": "第 1 名"
        },
        "icon": "🥇"
      },
      {
        "id": "opt-k3-mat-h8-3",
        "label": {
          "th": "อันดับที่ 2",
          "en": "2nd place",
          "zh": "第 2 名"
        },
        "icon": "🥈"
      }
    ],
    "correctOptionId": "opt-k3-mat-h8-1",
    "explanation": {
      "th": "เข้าเส้นชัยคนที่สาม คือ อันดับที่ 3 ยอดเยี่ยมครับ!",
      "en": "Correct! 3rd person to finish is in 3rd place.",
      "zh": "答对啦！是第 3 名。"
    }
  },
  {
    "id": "k3-mat-h9",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "อนุกรมตัวเลข: 10, 20, 30, ... ตัวเลขต่อไปคือเลขใด?",
      "en": "Number pattern: 10, 20, 30, ... What comes next (counting by 10s)?",
      "zh": "数字规律：10, 20, 30, ... 接下来的数字是几（每次加 10）？"
    },
    "illustration": "🔟 2️⃣0️⃣ 3️⃣0️⃣ ❓",
    "illustrationSubtitle": {
      "th": "นับเพิ่มทีละ 10",
      "en": "Count by 10s",
      "zh": "整十递增规律"
    },
    "options": [
      {
        "id": "opt-k3-mat-h9-1",
        "label": {
          "th": "35",
          "en": "Thirty-five",
          "zh": "35"
        },
        "icon": "3️⃣5️⃣"
      },
      {
        "id": "opt-k3-mat-h9-2",
        "label": {
          "th": "40",
          "en": "Forty",
          "zh": "40"
        },
        "icon": "4️⃣0️⃣"
      },
      {
        "id": "opt-k3-mat-h9-3",
        "label": {
          "th": "50",
          "en": "Fifty",
          "zh": "50"
        },
        "icon": "5️⃣0️⃣"
      }
    ],
    "correctOptionId": "opt-k3-mat-h9-2",
    "explanation": {
      "th": "เพิ่มทีละ 10: 10, 20, 30 แล้วก็ 40 เก่งมากครับ!",
      "en": "Right! Counting by 10s gives 40.",
      "zh": "答对了！接下来是 40。"
    }
  },
  {
    "id": "k3-mat-h10",
    "grade": "K3",
    "subject": "math",
    "skillCode": "2",
    "difficulty": 3,
    "question": {
      "th": "ถ้าวันนี้เป็น \"วันพุธ\" 🟢 พรุ่งนี้จะเป็นวันอะไร?",
      "en": "If today is Wednesday 🟢, what day will tomorrow be?",
      "zh": "如果今天是“星期三” 🟢，那么明天会是星期几？"
    },
    "illustration": "📅 พุธ ➡️ พฤหัสบดี 📅",
    "illustrationSubtitle": {
      "th": "วันทั้งเจ็ดในหนึ่งสัปดาห์",
      "en": "Days of the week: Tomorrow",
      "zh": "七天星期顺序"
    },
    "options": [
      {
        "id": "opt-k3-mat-h10-1",
        "label": {
          "th": "วันอังคาร",
          "en": "Tuesday",
          "zh": "星期二"
        },
        "icon": "💗"
      },
      {
        "id": "opt-k3-mat-h10-2",
        "label": {
          "th": "วันศุกร์",
          "en": "Friday",
          "zh": "星期五"
        },
        "icon": "💙"
      },
      {
        "id": "opt-k3-mat-h10-3",
        "label": {
          "th": "วันพฤหัสบดี",
          "en": "Thursday",
          "zh": "星期四"
        },
        "icon": "🧡"
      }
    ],
    "correctOptionId": "opt-k3-mat-h10-3",
    "explanation": {
      "th": "วันพุธแล้วต่อด้วยวันพฤหัสบดี ถูกต้องที่สุดครับ!",
      "en": "Awesome! Thursday comes after Wednesday.",
      "zh": "太棒啦！星期三过后是星期四。"
    }
  }
];
