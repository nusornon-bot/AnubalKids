import { Question } from '../types';

/**
 * คลังแบบทดสอบ: การคิดแก้ปัญหาและตัดสินใจ (Problem Solving) จำนวน 90 ข้อ
 * ครบ 3 ระดับชั้น (อ.1 - อ.3) ระดับความยากละ 10 ข้อ (ง่าย, ปานกลาง, ท้าทาย)
 * กระจายตำแหน่งคำตอบถูกต้อง A, B, C อย่างสมดุลเท่าเทียมกัน
 */
export const QUESTIONS_PROBLEM_SOLVING: Question[] = [
  {
    "id": "k1-ps-e1",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เมื่อหนูรู้สึก \"กระหายน้ำ\" 💧 หนูควรเลือกดื่มสิ่งใด?",
      "en": "When you feel thirsty 💧, what should you drink?",
      "zh": "当你感到口渴口干 💧 时，应该喝什么？"
    },
    "illustration": "💧 🥛 💧",
    "illustrationSubtitle": {
      "th": "แก้ปัญหาความกระหายน้ำ",
      "en": "Quench thirst",
      "zh": "口渴喝水"
    },
    "options": [
      {
        "id": "opt-k1-ps-e1-1",
        "label": {
          "th": "น้ำเปล่าสะอาด",
          "en": "Clean water",
          "zh": "干净的白开水"
        },
        "icon": "🥛"
      },
      {
        "id": "opt-k1-ps-e1-2",
        "label": {
          "th": "น้ำยาล้างจาน",
          "en": "Dish soap",
          "zh": "洗洁精"
        },
        "icon": "🧼"
      },
      {
        "id": "opt-k1-ps-e1-3",
        "label": {
          "th": "สีน้ำวาดรูป",
          "en": "Paint",
          "zh": "水彩颜料"
        },
        "icon": "🎨"
      }
    ],
    "correctOptionId": "opt-k1-ps-e1-1",
    "explanation": {
      "th": "น้ำเปล่าสะอาดช่วยดับกระหายและดีต่อสุขภาพที่สุด เก่งมากครับ!",
      "en": "Clean water is the healthiest way to quench thirst!",
      "zh": "答对了！口渴时要喝干净的水。"
    }
  },
  {
    "id": "k1-ps-e2",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เมื่อท้องฟ้ามี \"ฝนตกหนัก\" 🌧️ ถ้าต้องเดินออกไปข้างนอก หนูต้องใช้อุปกรณ์ใด?",
      "en": "When it rains heavily 🌧️, what tool do you need to go outside?",
      "zh": "当下起大雨 🌧️ 必须外出时，你需要使用什么防雨工具？"
    },
    "illustration": "🌧️ ☔ 🌧️",
    "illustrationSubtitle": {
      "th": "ป้องกันตัวจากฝน",
      "en": "Rain protection",
      "zh": "防雨工具"
    },
    "options": [
      {
        "id": "opt-k1-ps-e2-1",
        "label": {
          "th": "แว่นกันแดด",
          "en": "Sunglasses",
          "zh": "太阳镜"
        },
        "icon": "🕶️"
      },
      {
        "id": "opt-k1-ps-e2-2",
        "label": {
          "th": "ร่มกันฝน หรือ เสื้อกันฝน",
          "en": "Umbrella or Raincoat",
          "zh": "雨伞或雨衣"
        },
        "icon": "☔"
      },
      {
        "id": "opt-k1-ps-e2-3",
        "label": {
          "th": "พัดลมมือถือ",
          "en": "Mini fan",
          "zh": "小风扇"
        },
        "icon": "🪭"
      }
    ],
    "correctOptionId": "opt-k1-ps-e2-2",
    "explanation": {
      "th": "กางร่มหรือใส่เสื้อกันฝนช่วยไม่ให้เราเปียกฝนจนเป็นหวัด เก่งมากครับ!",
      "en": "Correct! An umbrella keeps you dry.",
      "zh": "答对啦！打伞或穿雨衣可以防雨。"
    }
  },
  {
    "id": "k1-ps-e3",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เมื่อรับประทานอาหารเสร็จแล้ว มีเศษอาหารเลอะรอบปาก 👄 หนูควรทำอย่างไร?",
      "en": "After eating, food gets on your mouth 👄. What should you do?",
      "zh": "吃完饭后嘴角沾了饭粒油渍 👄，你应该怎么做？"
    },
    "illustration": "👄 🧻 👄",
    "illustrationSubtitle": {
      "th": "เช็ดทำความสะอาดปาก",
      "en": "Clean mouth",
      "zh": "擦拭嘴巴"
    },
    "options": [
      {
        "id": "opt-k1-ps-e3-1",
        "label": {
          "th": "เอาแขนเสื้อเช็ดปาก",
          "en": "Wipe with sleeve",
          "zh": "用衣服袖子擦"
        },
        "icon": "👕"
      },
      {
        "id": "opt-k1-ps-e3-2",
        "label": {
          "th": "ปล่อยทิ้งไว้ไม่ต้องเช็ด",
          "en": "Leave it dirty",
          "zh": "不管它放任变脏"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k1-ps-e3-3",
        "label": {
          "th": "ใช้กระดาษทิชชูหรือผ้าสะอาดเช็ดปาก",
          "en": "Wipe with tissue/napkin",
          "zh": "用餐巾纸或干净手帕擦拭"
        },
        "icon": "🧻"
      }
    ],
    "correctOptionId": "opt-k1-ps-e3-3",
    "explanation": {
      "th": "ใช้ทิชชูเช็ดปากให้สะอาดเรียบร้อย เก่งมากครับ!",
      "en": "Right! Use a tissue to wipe your mouth cleanly.",
      "zh": "太棒了！用餐巾纸擦嘴最讲卫生。"
    }
  },
  {
    "id": "k1-ps-e4",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เมื่อของเล่นตกอยู่ใต้โต๊ะแล้วมือหนูเอื้อมไม่ถึง 🧸 หนูควรแก้ปัญหาอย่างไร?",
      "en": "Toy is under the table and you cannot reach it 🧸. What should you do?",
      "zh": "玩具掉到桌子底下拿不到 🧸，你应该怎么解决？"
    },
    "illustration": "🧸 🙋 🧸",
    "illustrationSubtitle": {
      "th": "ขอความช่วยเหลืออย่างเหมาะสม",
      "en": "Ask for help",
      "zh": "礼貌求助"
    },
    "options": [
      {
        "id": "opt-k1-ps-e4-1",
        "label": {
          "th": "บอกคุณครูหรือผู้ปกครองให้ช่วยหยิบให้",
          "en": "Ask teacher/parent for help",
          "zh": "请老师或爸爸妈妈帮忙拿"
        },
        "icon": "🙋"
      },
      {
        "id": "opt-k1-ps-e4-2",
        "label": {
          "th": "ร้องไห้เสียงดังลั่นห้อง",
          "en": "Cry loudly",
          "zh": "在地上大哭大闹"
        },
        "icon": "😭"
      },
      {
        "id": "opt-k1-ps-e4-3",
        "label": {
          "th": "ทุบทำลายโต๊ะ",
          "en": "Bang table",
          "zh": "用力砸桌子"
        },
        "icon": "💥"
      }
    ],
    "correctOptionId": "opt-k1-ps-e4-1",
    "explanation": {
      "th": "พูดจาไพเราะขอให้ผู้ใหญ่ช่วยหยิบ เป็นวิธีที่ดีมากครับ!",
      "en": "Spot on! Politely asking an adult for help is great.",
      "zh": "答对了！礼貌请长辈帮忙解决。"
    }
  },
  {
    "id": "k1-ps-e5",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "อุปกรณ์ใดใช้สำหรับ \"กวาดเศษผงบนพื้นห้อง\" ให้สะอาด? 🧹",
      "en": "Which tool is used to \"sweep dust off the floor\"? 🧹",
      "zh": "哪一种工具是用来“清扫地板上的灰尘碎屑”的？🧹"
    },
    "illustration": "🧹 🗑️ 🧹",
    "illustrationSubtitle": {
      "th": "เครื่องมือทำความสะอาดบ้าน",
      "en": "Cleaning tool: Broom",
      "zh": "清扫地面工具"
    },
    "options": [
      {
        "id": "opt-k1-ps-e5-1",
        "label": {
          "th": "ช้อนส้อมกินข้าว",
          "en": "Fork & spoon",
          "zh": "勺子叉子"
        },
        "icon": "🍴"
      },
      {
        "id": "opt-k1-ps-e5-2",
        "label": {
          "th": "ไม้กวาด",
          "en": "Broom",
          "zh": "扫把 / 扫帚"
        },
        "icon": "🧹"
      },
      {
        "id": "opt-k1-ps-e5-3",
        "label": {
          "th": "แปรงสีฟัน",
          "en": "Toothbrush",
          "zh": "牙刷"
        },
        "icon": "🪥"
      }
    ],
    "correctOptionId": "opt-k1-ps-e5-2",
    "explanation": {
      "th": "ไม้กวาดใช้กวาดเศษผงลงที่โกยขยะ เก่งมากครับ!",
      "en": "Correct! A broom is used to sweep floors.",
      "zh": "答对啦！扫把用来扫地。"
    }
  },
  {
    "id": "k1-ps-e6",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เมื่อหนูเล่นของเล่นในห้องเสร็จแล้ว 🧩 สิ่งที่ควรทำต่อไปคืออะไร?",
      "en": "When you finish playing with toys 🧩, what should you do next?",
      "zh": "在教室里玩完积木玩具 🧩 之后，接下来应该怎么做？"
    },
    "illustration": "🧩 📦 🧩",
    "illustrationSubtitle": {
      "th": "เก็บของเล่นเข้าที่",
      "en": "Put toys away",
      "zh": "收拾玩具整理归位"
    },
    "options": [
      {
        "id": "opt-k1-ps-e6-1",
        "label": {
          "th": "ทิ้งของเล่นเกลื่อนพื้นแล้ววิ่งหนี",
          "en": "Leave on floor",
          "zh": "扔在地板上不管跑掉"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k1-ps-e6-2",
        "label": {
          "th": "เหยียบของเล่นให้พัง",
          "en": "Step on toys",
          "zh": "用脚踩碎玩具"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k1-ps-e6-3",
        "label": {
          "th": "ช่วยกันเก็บของเล่นใส่กล่องเข้าที่ให้เรียบร้อย",
          "en": "Pack toys neatly into boxes",
          "zh": "大家一起把玩具收进收纳箱放好"
        },
        "icon": "📦"
      }
    ],
    "correctOptionId": "opt-k1-ps-e6-3",
    "explanation": {
      "th": "เล่นเสร็จแล้วต้องเก็บเข้าที่ เพื่อความเป็นระเบียบและปลอดภัย เก่งมากครับ!",
      "en": "Awesome! Packing toys keeps the room tidy and safe.",
      "zh": "太棒了！玩完玩具主动收拾归位。"
    }
  },
  {
    "id": "k1-ps-e7",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เมื่อมีอาการ \"ง่วงนอนมาก\" ในเวลากลางคืน 😴 หนูควรทำสิ่งใด?",
      "en": "When you feel very sleepy at night 😴, what should you do?",
      "zh": "晚上感到非常困倦 😴 时，你应该做什么？"
    },
    "illustration": "😴 🛌 😴",
    "illustrationSubtitle": {
      "th": "การพักผ่อนนอนหลับ",
      "en": "Go to sleep",
      "zh": "按时睡觉休息"
    },
    "options": [
      {
        "id": "opt-k1-ps-e7-1",
        "label": {
          "th": "เข้านอนพักผ่อนบนเตียง",
          "en": "Go to sleep in bed",
          "zh": "上床安心睡觉休息"
        },
        "icon": "🛌"
      },
      {
        "id": "opt-k1-ps-e7-2",
        "label": {
          "th": "เปิดทีวีดูเสียงดังทั้งคืน",
          "en": "Watch TV loudly",
          "zh": "大声开电视看通宵"
        },
        "icon": "📺"
      },
      {
        "id": "opt-k1-ps-e7-3",
        "label": {
          "th": "วิ่งเล่นในสนามมืดๆ",
          "en": "Run outside in dark",
          "zh": "跑到黑漆漆的院子里疯跑"
        },
        "icon": "🏃"
      }
    ],
    "correctOptionId": "opt-k1-ps-e7-1",
    "explanation": {
      "th": "การนอนหลับพักผ่อนให้เพียงพอช่วยให้ร่างกายเติบโตแข็งแรง เก่งมากครับ!",
      "en": "Right! Sleep helps your body grow strong.",
      "zh": "答对了！早点上床睡觉保证健康成长。"
    }
  },
  {
    "id": "k1-ps-e8",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "ภาพเงาดำในภาพนี้ 👤 คือเงาของสัตว์ชนิดใด? (มีหูยาวและชอบกระโดด) 🐇",
      "en": "Whose shadow is this? (Long ears and hops) 🐇",
      "zh": "观察这个长着长耳朵、爱蹦蹦跳跳的动物黑影 👤，它是谁的影子？🐇"
    },
    "illustration": "👤 🐇 👤",
    "illustrationSubtitle": {
      "th": "สังเกตเงาของสัตว์",
      "en": "Match shadow",
      "zh": "辨认影子"
    },
    "options": [
      {
        "id": "opt-k1-ps-e8-1",
        "label": {
          "th": "ช้างตัวใหญ่",
          "en": "Elephant",
          "zh": "大象"
        },
        "icon": "🐘"
      },
      {
        "id": "opt-k1-ps-e8-2",
        "label": {
          "th": "กระต่ายหูยาว",
          "en": "Rabbit with long ears",
          "zh": "长耳朵小兔子"
        },
        "icon": "🐇"
      },
      {
        "id": "opt-k1-ps-e8-3",
        "label": {
          "th": "เต่ากระดองแข็ง",
          "en": "Turtle",
          "zh": "小乌龟"
        },
        "icon": "🐢"
      }
    ],
    "correctOptionId": "opt-k1-ps-e8-2",
    "explanation": {
      "th": "เงาหูยาวๆ คือเจ้ากระต่ายน้อย เก่งมากครับ!",
      "en": "Correct! The long-eared shadow is a rabbit.",
      "zh": "答对啦！长耳朵影子是小兔子。"
    }
  },
  {
    "id": "k1-ps-e9",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เมื่อหนูทำ \"น้ำหวานหกใส่โต๊ะ\" 🧃 หนูควรทำอย่างไรเป็นอันดับแรก?",
      "en": "When you accidentally spill juice on the table 🧃, what should you do first?",
      "zh": "不小心把果汁洒在桌面上 🧃 时，第一步应该怎么做？"
    },
    "illustration": "🧃 🧻 🧃",
    "illustrationSubtitle": {
      "th": "ทำความสะอาดคราบน้ำหก",
      "en": "Wipe spilled juice",
      "zh": "擦拭洒出的果汁"
    },
    "options": [
      {
        "id": "opt-k1-ps-e9-1",
        "label": {
          "th": "วิ่งหนีไปแอบ",
          "en": "Run and hide",
          "zh": "立刻逃跑躲起来"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k1-ps-e9-2",
        "label": {
          "th": "เอานิ้วไปจิ้มเล่นบนโต๊ะ",
          "en": "Play with the mess",
          "zh": "用手指在脏水里涂抹玩耍"
        },
        "icon": "👉"
      },
      {
        "id": "opt-k1-ps-e9-3",
        "label": {
          "th": "ใช้ผ้าหรือกระดาษทิชชูรีบเช็ดโต๊ะให้แห้ง",
          "en": "Wipe dry with cloth/tissue",
          "zh": "拿抹布或纸巾快速擦干擦净"
        },
        "icon": "🧻"
      }
    ],
    "correctOptionId": "opt-k1-ps-e9-3",
    "explanation": {
      "th": "รีบเช็ดโต๊ะให้แห้งสะอาด ป้องกันการลื่นและไม่ให้มดตอม เก่งมากครับ!",
      "en": "Spot on! Wiping it up quickly prevents slips and ants.",
      "zh": "太棒了！迅速拿抹布擦干净。"
    }
  },
  {
    "id": "k1-ps-e10",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "อุปกรณ์ใดใช้สำหรับ \"ตักซุปต้มจืดร้อนๆ\" เข้าปากได้อย่างปลอดภัย? 🥣",
      "en": "Which cutlery is used to safely eat hot soup? 🥣",
      "zh": "吃热腾腾的鲜美汤面清汤 🥣 时，用什么餐具最合适？"
    },
    "illustration": "🥣 🥄 🥣",
    "illustrationSubtitle": {
      "th": "เลือกใช้ช้อนตักน้ำซุป",
      "en": "Eating tool: Spoon",
      "zh": "喝汤的餐具"
    },
    "options": [
      {
        "id": "opt-k1-ps-e10-1",
        "label": {
          "th": "ช้อน",
          "en": "Spoon",
          "zh": "小勺子 🥄"
        },
        "icon": "🥄"
      },
      {
        "id": "opt-k1-ps-e10-2",
        "label": {
          "th": "มีดปลายแหลม",
          "en": "Sharp knife",
          "zh": "尖锐的餐刀"
        },
        "icon": "🔪"
      },
      {
        "id": "opt-k1-ps-e10-3",
        "label": {
          "th": "ตะเกียบแหลมคม",
          "en": "Toothpick",
          "zh": "牙签"
        },
        "icon": "🥢"
      }
    ],
    "correctOptionId": "opt-k1-ps-e10-1",
    "explanation": {
      "th": "ใช้ช้อนตักน้ำแกงซดรับประทานได้ปลอดภัย เก่งมากครับ!",
      "en": "Right! Spoons are for eating soup safely.",
      "zh": "答对了！用勺子喝汤安全又方便。"
    }
  },
  {
    "id": "k1-ps-m1",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "สิ่งของใดในตัวเลือกนี้ \"ไม่เข้าพวก\" กับกลุ่มผลไม้? 🍎 🍌 ⚽",
      "en": "Which item does NOT belong in the fruit group? 🍎 🍌 ⚽",
      "zh": "下列哪一件物品“不属于”水果大类？🍎 🍌 ⚽"
    },
    "illustration": "🍎 🍌 ⚽",
    "illustrationSubtitle": {
      "th": "การจัดหมวดหมู่สิ่งของ",
      "en": "Odd one out: Not a fruit",
      "zh": "找出不合群的一项"
    },
    "options": [
      {
        "id": "opt-k1-ps-m1-1",
        "label": {
          "th": "แอปเปิ้ล",
          "en": "Apple",
          "zh": "苹果"
        },
        "icon": "🍎"
      },
      {
        "id": "opt-k1-ps-m1-2",
        "label": {
          "th": "ลูกฟุตบอล (ของเล่น)",
          "en": "Soccer ball (Toy)",
          "zh": "足球（玩具/运动器材）"
        },
        "icon": "⚽"
      },
      {
        "id": "opt-k1-ps-m1-3",
        "label": {
          "th": "กล้วยหอม",
          "en": "Banana",
          "zh": "香蕉"
        },
        "icon": "🍌"
      }
    ],
    "correctOptionId": "opt-k1-ps-m1-2",
    "explanation": {
      "th": "ลูกฟุตบอลเป็นของเล่น ไม่ใช่ผลไม้ จึงไม่เข้าพวก เก่งมากครับ!",
      "en": "Correct! The soccer ball is a toy, not a fruit.",
      "zh": "答对啦！足球是玩具，不是水果。"
    }
  },
  {
    "id": "k1-ps-m2",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "ก่อนจะรับประทานอาหารว่างแสนอร่อย 🥪 หนูควรปฏิบัติสิ่งใดก่อน?",
      "en": "Before eating a yummy snack 🥪, what should you do first?",
      "zh": "在吃美味的小点心 🥪 之前，第一件事应该做什么？"
    },
    "illustration": "🥪 🧼 🥪",
    "illustrationSubtitle": {
      "th": "ล้างมือก่อนหยิบอาหาร",
      "en": "Wash hands before eating",
      "zh": "餐前洗手卫生"
    },
    "options": [
      {
        "id": "opt-k1-ps-m2-1",
        "label": {
          "th": "เอามือไปจับดินทราย",
          "en": "Play with sand",
          "zh": "用脏手去挖沙土"
        },
        "icon": "🟤"
      },
      {
        "id": "opt-k1-ps-m2-2",
        "label": {
          "th": "ขยี้ตาแรงๆ",
          "en": "Rub eyes",
          "zh": "用力揉眼睛"
        },
        "icon": "👀"
      },
      {
        "id": "opt-k1-ps-m2-3",
        "label": {
          "th": "ล้างมือให้สะอาดด้วยน้ำและสบู่",
          "en": "Wash hands with soap & water",
          "zh": "用洗手液和清水把小手洗干净"
        },
        "icon": "🧼"
      }
    ],
    "correctOptionId": "opt-k1-ps-m2-3",
    "explanation": {
      "th": "ล้างมือให้สะอาดก่อนหยิบอาหารเข้าปาก ป้องกันเชื้อโรค เก่งมากครับ!",
      "en": "Awesome! Washing hands stops germs.",
      "zh": "太棒了！吃东西前一定要用肥皂洗手。"
    }
  },
  {
    "id": "k1-ps-m3",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "เมื่อเห็นสิ่งของมีคม เช่น \"กรรไกรปลายแหลมหรือมีด\" ✂️ วางอยู่ เด็กๆ ควรทำอย่างไร?",
      "en": "When you see sharp scissors or knives ✂️ lying around, what should you do?",
      "zh": "当看到剪刀或锋利刀具 ✂️ 放在桌边时，小朋友应该怎么做？"
    },
    "illustration": "✂️ ⚠️ ✂️",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยจากของมีคม",
      "en": "Sharp object safety",
      "zh": "避免触碰锋利利器"
    },
    "options": [
      {
        "id": "opt-k1-ps-m3-1",
        "label": {
          "th": "ไม่หยิบมาเล่น และบอกคุณครูหรือผู้ปกครอง",
          "en": "Do not play with it; tell an adult",
          "zh": "不拿来玩耍，并告诉老师或大人"
        },
        "icon": "🙋"
      },
      {
        "id": "opt-k1-ps-m3-2",
        "label": {
          "th": "หยิบมาวิ่งเล่นแกว่งไปมา",
          "en": "Wave it running",
          "zh": "拿起来边跑边挥舞"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k1-ps-m3-3",
        "label": {
          "th": "เอามาจิ้มเพื่อน",
          "en": "Poke friends",
          "zh": "拿去戳其他小伙伴"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k1-ps-m3-1",
    "explanation": {
      "th": "ของมีคมอันตรายมาก ห้ามนำมาเล่นเด็ดขาด เก่งมากครับ!",
      "en": "Right! Sharp tools are dangerous, never play with them.",
      "zh": "答对了！利器极度危险，绝对不能玩耍。"
    }
  },
  {
    "id": "k1-ps-m4",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "ลำดับเหตุการณ์ 3 ขั้นตอน: (1) ตื่นนอน (2) ล้างหน้าแปรงฟัน (3) เดินทางไปโรงเรียน 🎒 ลำดับใดถูกต้อง?",
      "en": "Order 3 steps: (1) Wake up (2) Brush teeth (3) Go to school. What is the correct order?",
      "zh": "晨起生活作息 3 步顺序：(1) 起床 (2) 洗脸刷牙 (3) 出发去学校。正确顺序是？"
    },
    "illustration": "⏰ 🪥 🎒",
    "illustrationSubtitle": {
      "th": "ลำดับเหตุการณ์ในชีวิตประจำวัน",
      "en": "Daily routine sequence",
      "zh": "作息逻辑排序"
    },
    "options": [
      {
        "id": "opt-k1-ps-m4-1",
        "label": {
          "th": "ไปโรงเรียน -> ตื่นนอน -> แปรงฟัน",
          "en": "School -> Wake -> Brush",
          "zh": "去学校 -> 起床 -> 刷牙"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k1-ps-m4-2",
        "label": {
          "th": "ตื่นนอน -> ล้างหน้าแปรงฟัน -> ไปโรงเรียน",
          "en": "Wake up -> Brush teeth -> Go to school",
          "zh": "起床 -> 洗脸刷牙 -> 出发去学校"
        },
        "icon": "✅"
      },
      {
        "id": "opt-k1-ps-m4-3",
        "label": {
          "th": "แปรงฟัน -> ไปโรงเรียน -> ตื่นนอน",
          "en": "Brush -> School -> Wake",
          "zh": "刷牙 -> 去学校 -> 起床"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k1-ps-m4-2",
    "explanation": {
      "th": "ตื่นนอนก่อน ทำความสะอาดร่างกาย แล้วจึงไปโรงเรียน ยอดเยี่ยมครับ!",
      "en": "Correct! Wake up, brush teeth, then go to school.",
      "zh": "答对啦！先起床，刷牙洗脸整理好，再去上学。"
    }
  },
  {
    "id": "k1-ps-m5",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "เมื่อเดินสะดุดหกล้มแล้วมีแผลถลอกเล็กน้อยที่หัวเข่า 🩹 ควรบอกใครเป็นคนแรก?",
      "en": "When you trip and scrape your knee slightly 🩹, who should you tell first?",
      "zh": "在操场不小心摔倒擦破了膝盖 🩹，应该首先告诉谁？"
    },
    "illustration": "🩹 👩‍🏫 🩹",
    "illustrationSubtitle": {
      "th": "การขอความช่วยเหลือเมื่อบาดเจ็บ",
      "en": "Tell teacher/adult when hurt",
      "zh": "擦伤求助老师"
    },
    "options": [
      {
        "id": "opt-k1-ps-m5-1",
        "label": {
          "th": "แอบไปนั่งร้องไห้คนเดียวในห้องมืด",
          "en": "Hide alone in dark",
          "zh": "自己躲在阴暗角落哭泣"
        },
        "icon": "😭"
      },
      {
        "id": "opt-k1-ps-m5-2",
        "label": {
          "th": "ทำเป็นไม่สนใจปล่อยให้แผลสกปรก",
          "en": "Ignore the wound",
          "zh": "不管不顾让伤口沾满污泥"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k1-ps-m5-3",
        "label": {
          "th": "บอกคุณครูหรือผู้ปกครองให้ช่วยทำแผลล้างยา",
          "en": "Tell teacher/parent to clean and bandage",
          "zh": "告诉老师或家长帮忙清洗伤口贴创口贴"
        },
        "icon": "👩‍🏫"
      }
    ],
    "correctOptionId": "opt-k1-ps-m5-3",
    "explanation": {
      "th": "บอกคุณครูทันทีเพื่อทำความสะอาดแผลอย่างถูกวิธี เก่งมากครับ!",
      "en": "Spot on! Always tell an adult so they can clean the scrape.",
      "zh": "太棒了！立刻告诉老师处理消毒伤口。"
    }
  },
  {
    "id": "k1-ps-m6",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "ถ้าหนูต้องการ \"ติดกระดาษผลงานศิลปะ\" ลงบนสมุด 📄 ควรใช้อุปกรณ์ใด?",
      "en": "To stick an art paper onto your notebook 📄, what tool should you use?",
      "zh": "要把画好的画纸牢固地贴在美术本上 📄，应该用什么工具？"
    },
    "illustration": "📄 🧴 📄",
    "illustrationSubtitle": {
      "th": "เลือกใช้อุปกรณ์ติดกระดาษ",
      "en": "Sticking tool: Glue",
      "zh": "粘贴纸张的工具"
    },
    "options": [
      {
        "id": "opt-k1-ps-m6-1",
        "label": {
          "th": "กาวน้ำ หรือ กาวแท่ง",
          "en": "Glue liquid or stick",
          "zh": "胶水或固体胶 🧴"
        },
        "icon": "🧴"
      },
      {
        "id": "opt-k1-ps-m6-2",
        "label": {
          "th": "น้ำยาล้างห้องน้ำ",
          "en": "Toilet cleaner",
          "zh": "洁厕灵"
        },
        "icon": "🧼"
      },
      {
        "id": "opt-k1-ps-m6-3",
        "label": {
          "th": "น้ำมันพืช",
          "en": "Cooking oil",
          "zh": "食用植物油"
        },
        "icon": "🍳"
      }
    ],
    "correctOptionId": "opt-k1-ps-m6-1",
    "explanation": {
      "th": "กาวช่วยยึดติดกระดาษเข้าด้วยกัน เก่งมากครับ!",
      "en": "Right! Glue sticks paper together neatly.",
      "zh": "答对了！胶水或固体胶最适合贴纸张。"
    }
  },
  {
    "id": "k1-ps-m7",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "เมื่อหนูต้องการข้ามถนนอย่างปลอดภัย ควรข้ามตรงจุดใด? 🦓",
      "en": "Where should you cross the street safely with an adult? 🦓",
      "zh": "在外出过马路时，应该选择在什么安全地点走过？🦓"
    },
    "illustration": "🦓 🚸 🦓",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยบนท้องถนน",
      "en": "Cross at zebra crossing",
      "zh": "斑马线过马路安全"
    },
    "options": [
      {
        "id": "opt-k1-ps-m7-1",
        "label": {
          "th": "วิ่งตัดหน้ารถยนต์ที่กำลังแล่นเร็ว",
          "en": "Run in front of cars",
          "zh": "直接在飞驰的汽车前乱穿马路"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k1-ps-m7-2",
        "label": {
          "th": "ทางม้าลาย หรือ สะพานลอยคนข้าม",
          "en": "Zebra crossing or Footbridge",
          "zh": "走斑马线或人行过街天桥"
        },
        "icon": "🦓"
      },
      {
        "id": "opt-k1-ps-m7-3",
        "label": {
          "th": "กระโดดข้ามเกาะกลางถนนคนเดียว",
          "en": "Jump street divider",
          "zh": "独自跨越马路中间隔离护栏"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k1-ps-m7-2",
    "explanation": {
      "th": "ข้ามทางม้าลายหรือสะพานลอยโดยจับมือผู้ใหญ่เสมอ เก่งมากครับ!",
      "en": "Correct! Always use zebra crossings or overpasses.",
      "zh": "答对啦！走斑马线并拉紧大人的手最安全。"
    }
  },
  {
    "id": "k1-ps-m8",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "สัตว์ชนิดใด \"อาศัยอยู่ในน้ำ\" ว่ายน้ำตลอดเวลา? 🐟 🆚 🐕 🆚 🐥",
      "en": "Which animal \"lives in water\" and swims all the time? 🐟 vs 🐕 vs 🐥",
      "zh": "下列哪一种小动物“生活在水中”，整天游来游去？🐟 🆚 🐕 🆚 🐥"
    },
    "illustration": "🐟 💦 🐟",
    "illustrationSubtitle": {
      "th": "แหล่งที่อยู่อาศัยของสัตว์น้ำ",
      "en": "Aquatic animal",
      "zh": "水生动物"
    },
    "options": [
      {
        "id": "opt-k1-ps-m8-1",
        "label": {
          "th": "สุนัข",
          "en": "Dog",
          "zh": "小狗"
        },
        "icon": "🐕"
      },
      {
        "id": "opt-k1-ps-m8-2",
        "label": {
          "th": "ลูกไก่",
          "en": "Chick",
          "zh": "小鸡"
        },
        "icon": "🐥"
      },
      {
        "id": "opt-k1-ps-m8-3",
        "label": {
          "th": "ปลา",
          "en": "Fish",
          "zh": "小鱼 🐟"
        },
        "icon": "🐟"
      }
    ],
    "correctOptionId": "opt-k1-ps-m8-3",
    "explanation": {
      "th": "ปลาหายใจด้วยเหงือกและอาศัยอยู่ในน้ำ เก่งมากครับ!",
      "en": "Right! Fish live and swim in water.",
      "zh": "太棒了！小鱼生活在水里。"
    }
  },
  {
    "id": "k1-ps-m9",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "สิ่งของใดต่อไปนี้ใช้สำหรับ \"สวมใส่เท้า\" ก่อนเดินออกไปนอกบ้าน? 👟",
      "en": "What item do we wear on our feet before stepping outdoors? 👟",
      "zh": "出门走路之前，我们要把什么穿戴在双脚上？👟"
    },
    "illustration": "👟 🧦 👟",
    "illustrationSubtitle": {
      "th": "ของใช้สำหรับเท้า",
      "en": "Wear shoes",
      "zh": "穿鞋出行防护"
    },
    "options": [
      {
        "id": "opt-k1-ps-m9-1",
        "label": {
          "th": "รองเท้าและถุงเท้า",
          "en": "Shoes and socks",
          "zh": "鞋子与袜子 👟"
        },
        "icon": "👟"
      },
      {
        "id": "opt-k1-ps-m9-2",
        "label": {
          "th": "หมวกแก๊ป",
          "en": "Cap",
          "zh": "帽子"
        },
        "icon": "🧢"
      },
      {
        "id": "opt-k1-ps-m9-3",
        "label": {
          "th": "ถุงมือกันหนาว",
          "en": "Gloves",
          "zh": "手套"
        },
        "icon": "🧤"
      }
    ],
    "correctOptionId": "opt-k1-ps-m9-1",
    "explanation": {
      "th": "ใส่รองเท้าช่วยปกป้องเท้าจากของมีคมและสิ่งสกปรกบนพื้น เก่งมากครับ!",
      "en": "Correct! Shoes protect your feet.",
      "zh": "答对了！穿好鞋袜能保护双脚不受伤。"
    }
  },
  {
    "id": "k1-ps-m10",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "เมื่อมีคนแปลกหน้าชวนไปเที่ยวหรือยื่นขนมให้ 🍬 เด็กๆ ควรทำอย่างไร?",
      "en": "Stranger offers candy or asks you to go with them 🍬. What should you do?",
      "zh": "如果有不认识的陌生人突然给你糖果 🍬 还要带你走，应该怎么做？"
    },
    "illustration": "🍬 🛑 🍬",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยจากคนแปลกหน้า",
      "en": "Stranger danger",
      "zh": "对陌生人保持警惕"
    },
    "options": [
      {
        "id": "opt-k1-ps-m10-1",
        "label": {
          "th": "รีบรับขนมแล้วเดินตามเขาไปทันที",
          "en": "Take candy & follow",
          "zh": "开心地拿零食并跟着走"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k1-ps-m10-2",
        "label": {
          "th": "ปฏิเสธเสียงดังว่า \"ไม่ไปครับ/ค่ะ\" แล้วรีบวิ่งไปหาพ่อแม่หรือครู",
          "en": "Say \"NO!\" loudly and run to parents/teacher",
          "zh": "大声拒绝“我不去！”，迅速跑向老师或家长身边"
        },
        "icon": "🛑"
      },
      {
        "id": "opt-k1-ps-m10-3",
        "label": {
          "th": "ยืนยิ้มรอให้เขาอุ้ม",
          "en": "Wait to be carried",
          "zh": "站着傻笑等对方抱走"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k1-ps-m10-2",
    "explanation": {
      "th": "ปฏิเสธคนแปลกหน้าทันที และรีบไปหาผู้ใหญ่ที่คุ้นเคย ปลอดภัยที่สุดครับ!",
      "en": "Spot on! Say NO and run to your trusted adults.",
      "zh": "答对啦！坚决拒绝陌生人并立刻求助监护人。"
    }
  },
  {
    "id": "k1-ps-h1",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "สาเหตุและผล: ถ้าวางแก้วน้ำไว้ \"ริมขอบโต๊ะพอดี\" 🥛 อาจเกิดผลเสียอย่างไร?",
      "en": "Cause & effect: If a water glass is placed right on the table edge 🥛, what might happen?",
      "zh": "因果关系：如果把装满水的玻璃杯放在“桌子边缘正边上” 🥛，可能会发生什么危险？"
    },
    "illustration": "🥛 ⚠️ 🥛",
    "illustrationSubtitle": {
      "th": "การวางสิ่งของให้ปลอดภัย",
      "en": "Glass on edge risk",
      "zh": "物品摆放安全"
    },
    "options": [
      {
        "id": "opt-k1-ps-h1-1",
        "label": {
          "th": "แก้วน้ำจะกลายร่างเป็นของเล่น",
          "en": "Turns into toy",
          "zh": "杯子会变成玩具"
        },
        "icon": "🧸"
      },
      {
        "id": "opt-k1-ps-h1-2",
        "label": {
          "th": "น้ำในแก้วจะเพิ่มขึ้นเอง",
          "en": "Water increases",
          "zh": "杯里的水会自己变多"
        },
        "icon": "✨"
      },
      {
        "id": "opt-k1-ps-h1-3",
        "label": {
          "th": "อาจถูกปัดตกแตกเสียหายและน้ำหกเลอะเทอะ",
          "en": "Might get knocked off, break & spill",
          "zh": "可能会被碰倒摔碎，水流一地"
        },
        "icon": "💥"
      }
    ],
    "correctOptionId": "opt-k1-ps-h1-3",
    "explanation": {
      "th": "แก้วริมโต๊ะตกแตกง่าย ควรวางเลื่อนเข้ามาด้านในโต๊ะ เก่งมากครับ!",
      "en": "Correct! Push cups inward so they do not fall.",
      "zh": "答对了！杯子容易碰碎，应往桌中间挪。"
    }
  },
  {
    "id": "k1-ps-h2",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "เมื่อเพื่อนกำลังเล่นชิงช้าอยู่อย่างสนุกสนาน 🎪 ถ้าหนูอยากเล่นบ้าง ควรทำอย่างไร?",
      "en": "Friend is swinging on the swing 🎪 and you want to play too. What should you do?",
      "zh": "小伙伴正在开心地荡秋千 🎪，你也想玩，应该怎么做？"
    },
    "illustration": "🎪 ⏳ 🎪",
    "illustrationSubtitle": {
      "th": "การรอคอยและการเข้าแถว",
      "en": "Wait your turn patiently",
      "zh": "耐心排队等待轮流玩"
    },
    "options": [
      {
        "id": "opt-k1-ps-h2-1",
        "label": {
          "th": "ยืนรอต่อคิวอย่างใจเย็น หรือพูดขอต่อคิวเล่นเมื่อเพื่อนเล่นเสร็จ",
          "en": "Wait in line patiently or ask politely for next turn",
          "zh": "在一旁耐心排队等待，或者礼貌询问等轮流"
        },
        "icon": "⏳"
      },
      {
        "id": "opt-k1-ps-h2-2",
        "label": {
          "th": "วิ่งไปผลักเพื่อนให้ตกชิงช้า",
          "en": "Push friend off",
          "zh": "跑过去把好朋友推下秋千"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k1-ps-h2-3",
        "label": {
          "th": "แย่งเชือกชิงช้ามาทันที",
          "en": "Grab swing ropes",
          "zh": "冲上去硬抢秋千绳索"
        },
        "icon": "💥"
      }
    ],
    "correctOptionId": "opt-k1-ps-h2-1",
    "explanation": {
      "th": "เข้าคิวรออย่างมีมารยาท เป็นเด็กดีที่น่าชื่นชม เก่งมากครับ!",
      "en": "Awesome! Waiting your turn is fair and kind.",
      "zh": "太棒了！耐心排队礼貌轮流玩。"
    }
  },
  {
    "id": "k1-ps-h3",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "สิ่งของใดในตัวเลือกนี้จัดอยู่ในกลุ่ม \"เครื่องใช้ไฟฟ้าที่ห้ามเอามือเปียกไปสัมผัส\"? 🔌",
      "en": "Which item is an electrical appliance that you must NEVER touch with wet hands? 🔌",
      "zh": "下列哪一样物品属于“严禁湿手触碰”的危险电器设施？🔌"
    },
    "illustration": "🔌 ⚡ 🔌",
    "illustrationSubtitle": {
      "th": "อันตรายจากไฟฟ้าดูด",
      "en": "Electrical shock hazard",
      "zh": "防触电安全常识"
    },
    "options": [
      {
        "id": "opt-k1-ps-h3-1",
        "label": {
          "th": "หมอนหนุนนอน",
          "en": "Pillow",
          "zh": "睡觉枕头"
        },
        "icon": "🛌"
      },
      {
        "id": "opt-k1-ps-h3-2",
        "label": {
          "th": "ปลั๊กไฟและสายไฟ 🔌",
          "en": "Electric plug & wire",
          "zh": "插头插座和电线 🔌"
        },
        "icon": "🔌"
      },
      {
        "id": "opt-k1-ps-h3-3",
        "label": {
          "th": "ตุ๊กตาผ้าห่ม",
          "en": "Teddy bear",
          "zh": "毛绒玩具布娃娃"
        },
        "icon": "🧸"
      }
    ],
    "correctOptionId": "opt-k1-ps-h3-2",
    "explanation": {
      "th": "ปลั๊กไฟมีกระแสไฟฟ้า อันตรายมาก ห้ามสัมผัสเด็ดขาด เก่งมากครับ!",
      "en": "Correct! Never touch electrical plugs with wet hands.",
      "zh": "答对啦！插座极度危险，湿手严禁触碰。"
    }
  },
  {
    "id": "k1-ps-h4",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "เมื่อคุณครูกำลังเล่านิทานหน้าชั้นเรียน 📖 มารยาทการฟังที่ดีคือข้อใด?",
      "en": "When the teacher is telling a story in class 📖, what is good listening manner?",
      "zh": "当老师在讲台前讲精彩故事 📖 时，哪一种倾听表现是有礼貌的？"
    },
    "illustration": "📖 👂 📖",
    "illustrationSubtitle": {
      "th": "มารยาทการเป็นผู้ฟังที่ดี",
      "en": "Good listening etiquette",
      "zh": "认真倾听的好习惯"
    },
    "options": [
      {
        "id": "opt-k1-ps-h4-1",
        "label": {
          "th": "วิ่งกระโดดข้ามโต๊ะเพื่อน",
          "en": "Jump on tables",
          "zh": "在教室桌子上爬来跳去"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k1-ps-h4-2",
        "label": {
          "th": "ลุกขึ้นตะโกนร้องเพลงแข่งกับครู",
          "en": "Shout & sing",
          "zh": "站起来大吼大叫跟老师攀比声音"
        },
        "icon": "📢"
      },
      {
        "id": "opt-k1-ps-h4-3",
        "label": {
          "th": "ตั้งใจฟัง มองที่คุณครู และไม่คุยเสียงดังรบกวนผู้อื่น",
          "en": "Listen attentively, look at teacher, do not talk loudly",
          "zh": "专心倾听，眼睛看着老师，不大声喧哗打扰"
        },
        "icon": "👂"
      }
    ],
    "correctOptionId": "opt-k1-ps-h4-3",
    "explanation": {
      "th": "ตั้งใจฟังและให้เกียรติผู้พูด เป็นนิสัยที่น่ารักมากครับ!",
      "en": "Right! Listening attentively is polite and respectful.",
      "zh": "答对了！认真听讲不插嘴打扰大家。"
    }
  },
  {
    "id": "k1-ps-h5",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "เมื่อดินสอวาดเขียนปลายทู่จนวาดเส้นไม่ได้ ✏️ หนูควรใช้อุปกรณ์ใดแก้ปัญหา?",
      "en": "Pencil tip is blunt and cannot draw ✏️. What tool solves this?",
      "zh": "彩色铅笔的笔尖变钝断掉了无法画画 ✏️，应该用什么工具解决？"
    },
    "illustration": "✏️ ⚙️ ✏️",
    "illustrationSubtitle": {
      "th": "อุปกรณ์เหลาดินสอ",
      "en": "Pencil sharpener",
      "zh": "削铅笔的卷笔刀"
    },
    "options": [
      {
        "id": "opt-k1-ps-h5-1",
        "label": {
          "th": "กบเหลาดินสอ",
          "en": "Pencil sharpener",
          "zh": "卷笔刀 / 削笔器"
        },
        "icon": "⚙️"
      },
      {
        "id": "opt-k1-ps-h5-2",
        "label": {
          "th": "ไม้บรรทัด",
          "en": "Ruler",
          "zh": "直尺"
        },
        "icon": "📏"
      },
      {
        "id": "opt-k1-ps-h5-3",
        "label": {
          "th": "ยางลบดินสอ",
          "en": "Eraser",
          "zh": "橡皮擦"
        },
        "icon": "🧼"
      }
    ],
    "correctOptionId": "opt-k1-ps-h5-1",
    "explanation": {
      "th": "ใช้กบเหลาดินสอเหลาให้แหลมพอดี เก่งมากครับ!",
      "en": "Correct! A pencil sharpener sharpens pencils.",
      "zh": "答对啦！用卷笔刀把笔尖削好。"
    }
  },
  {
    "id": "k1-ps-h6",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "สิ่งของชนิดใด \"ลอยน้ำได้\" บนผิวน้ำ? 🪨 (หินหนัก) 🆚 🦆 (เป็ดพลาสติก)",
      "en": "Which item floats on top of the water? 🪨 (heavy stone) vs 🦆 (rubber duck)",
      "zh": "下列哪一样物品放在水盆里会“漂浮在水面上”？🪨 🆚 🦆"
    },
    "illustration": "🦆 💦 🪨",
    "illustrationSubtitle": {
      "th": "การจมและการลอยน้ำ",
      "en": "Sink vs Float",
      "zh": "沉与浮"
    },
    "options": [
      {
        "id": "opt-k1-ps-h6-1",
        "label": {
          "th": "ก้อนหินใหญ่ก้อนทึบ",
          "en": "Solid rock",
          "zh": "沉重的大石块"
        },
        "icon": "🪨"
      },
      {
        "id": "opt-k1-ps-h6-2",
        "label": {
          "th": "เป็ดพลาสติกเป่าลม 🦆",
          "en": "Rubber plastic duck",
          "zh": "空心塑料小黄鸭 🦆"
        },
        "icon": "🦆"
      },
      {
        "id": "opt-k1-ps-h6-3",
        "label": {
          "th": "ช้อนเหล็กหนัก",
          "en": "Heavy iron spoon",
          "zh": "沉沉的不锈钢铁勺"
        },
        "icon": "🥄"
      }
    ],
    "correctOptionId": "opt-k1-ps-h6-2",
    "explanation": {
      "th": "เป็ดพลาสติกมีอากาศข้างในและน้ำหนักเบา จึงลอยน้ำได้ เก่งมากครับ!",
      "en": "Awesome! The plastic duck floats on water.",
      "zh": "太棒了！塑料充气小鸭能浮在水面上。"
    }
  },
  {
    "id": "k1-ps-h7",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "ถ้าเปิดก๊อกน้ำอ่างล้างมือทิ้งไว้จนเต็ม 🚰 ผลเสียที่จะเกิดขึ้นคือข้อใด?",
      "en": "If you leave the sink tap running continuously 🚰, what bad thing happens?",
      "zh": "如果洗完手忘记关水龙头，任由水哗哗地流 🚰，会产生什么不良后果？"
    },
    "illustration": "🚰 💧 🚰",
    "illustrationSubtitle": {
      "th": "การประหยัดน้ำและป้องกันน้ำท่วม",
      "en": "Water wastage hazard",
      "zh": "节约用水与防溢水"
    },
    "options": [
      {
        "id": "opt-k1-ps-h7-1",
        "label": {
          "th": "พื้นห้องจะกลายเป็นสวนสนุก",
          "en": "Becomes theme park",
          "zh": "地板会变成游乐场"
        },
        "icon": "🎡"
      },
      {
        "id": "opt-k1-ps-h7-2",
        "label": {
          "th": "ก๊อกน้ำจะพ่นเงินออกมา",
          "en": "Tap spits money",
          "zh": "水龙头里会长出金币"
        },
        "icon": "🪙"
      },
      {
        "id": "opt-k1-ps-h7-3",
        "label": {
          "th": "น้ำจะล้นอ่างท่วมพื้นและสิ้นเปลืองน้ำ",
          "en": "Water overflows & wastes",
          "zh": "水漫出洗手池淹湿地面，浪费宝贵水资源"
        },
        "icon": "💧"
      }
    ],
    "correctOptionId": "opt-k1-ps-h7-3",
    "explanation": {
      "th": "ปิดก๊อกน้ำให้สนิททุกครั้ง ช่วยประหยัดน้ำและพื้นไม่ลื่น เก่งมากครับ!",
      "en": "Right! Turn off taps to save water and prevent overflows.",
      "zh": "答对了！洗完手务必随手拧紧水龙头。"
    }
  },
  {
    "id": "k1-ps-h8",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "เมื่อเดินอยู่ในห้างสรรพสินค้าแล้วพลัดหลงกับคุณพ่อคุณแม่ 🏬 หนูควรทำอย่างไร?",
      "en": "If you get lost from your parents in a shopping mall 🏬, what should you do?",
      "zh": "在繁华的大商场里不小心和爸爸妈妈走散了 🏬，应该怎么做？"
    },
    "illustration": "🏬 👮 🏬",
    "illustrationSubtitle": {
      "th": "การแก้ปัญหาเมื่อพลัดหลง",
      "en": "Lost in public safety",
      "zh": "走失应急求助办法"
    },
    "options": [
      {
        "id": "opt-k1-ps-h8-1",
        "label": {
          "th": "ยืนรอที่จุดเดิม หรือเดินไปขอความช่วยเหลือจากพนักงานประชาสัมพันธ์/รปภ.",
          "en": "Stay where you are or ask mall info desk/guard",
          "zh": "原地等待不要乱跑，或者向商场穿着制服的保安/前台阿姨求助"
        },
        "icon": "👮"
      },
      {
        "id": "opt-k1-ps-h8-2",
        "label": {
          "th": "เดินร้องไห้ออกไปนอกถนนใหญ่คนเดียว",
          "en": "Walk out to big street alone",
          "zh": "独自跑出商场大马路上瞎逛"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k1-ps-h8-3",
        "label": {
          "th": "เดินตามคนแปลกหน้าขึ้นรถไป",
          "en": "Follow stranger into car",
          "zh": "跟路过陌生的怪叔叔上车走"
        },
        "icon": "🚗"
      }
    ],
    "correctOptionId": "opt-k1-ps-h8-1",
    "explanation": {
      "th": "ยืนรอที่เดิมและบอกเจ้าหน้าที่ประจำห้าง เป็นวิธีที่ปลอดภัยที่สุด เก่งมากครับ!",
      "en": "Spot on! Stay put or ask uniform security/info desk.",
      "zh": "太棒了！呆在原地或向身穿制服的商场工作人员求助。"
    }
  },
  {
    "id": "k1-ps-h9",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "สิ่งของชนิดใดใช้สำหรับ \"ทำความสะอาดฟัน\" หลังอาหารและก่อนนอน? 🪥",
      "en": "Which item is used to clean teeth after meals and before bed? 🪥",
      "zh": "早晚及饭后用来“清洁牙齿缝隙、刷掉牙菌斑”的工具是哪一个？🪥"
    },
    "illustration": "🪥 🦷 🪥",
    "illustrationSubtitle": {
      "th": "สุขอนามัยในช่องปาก",
      "en": "Teeth hygiene",
      "zh": "口腔清洁工具"
    },
    "options": [
      {
        "id": "opt-k1-ps-h9-1",
        "label": {
          "th": "ไม้กวาดห้อง",
          "en": "Broom",
          "zh": "扫把"
        },
        "icon": "🧹"
      },
      {
        "id": "opt-k1-ps-h9-2",
        "label": {
          "th": "แปรงสีฟันและยาสีฟัน",
          "en": "Toothbrush & paste",
          "zh": "牙刷与含氟儿童牙膏 🪥"
        },
        "icon": "🪥"
      },
      {
        "id": "opt-k1-ps-h9-3",
        "label": {
          "th": "หวีแปรงผม",
          "en": "Comb",
          "zh": "梳头发的梳子"
        },
        "icon": "🪮"
      }
    ],
    "correctOptionId": "opt-k1-ps-h9-2",
    "explanation": {
      "th": "แปรงฟันอย่างน้อยวันละ 2 ครั้ง ฟันสะอาดแข็งแรงไม่ผุ เก่งมากครับ!",
      "en": "Correct! Toothbrush and paste keep teeth healthy.",
      "zh": "答对啦！用牙刷牙膏认真刷牙保护牙齿。"
    }
  },
  {
    "id": "k1-ps-h10",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "เมื่อหนูทำขนมหกเลอะพื้นห้อง 🍪 ควรทำความสะอาดตามลำดับอย่างไร?",
      "en": "Cookie crumbs spilled on floor 🍪. What is the right cleanup step?",
      "zh": "不小心把饼干碎渣掉在地板上了 🍪，应该按什么正确步骤清理？"
    },
    "illustration": "🍪 🧹 🗑️",
    "illustrationSubtitle": {
      "th": "ขั้นตอนการทำความสะอาดพื้น",
      "en": "Cleanup sequence",
      "zh": "清扫打扫步骤"
    },
    "options": [
      {
        "id": "opt-k1-ps-h10-1",
        "label": {
          "th": "ปล่อยทิ้งไว้ให้มดมากัด",
          "en": "Leave for ants",
          "zh": "留着吸引大蚂蚁来咬人"
        },
        "icon": "🐜"
      },
      {
        "id": "opt-k1-ps-h10-2",
        "label": {
          "th": "เอาเท้าเหยียบขยี้ให้แบนติดพื้น",
          "en": "Smash with foot",
          "zh": "用脚把碎屑踩扁碾碎在地板上"
        },
        "icon": "🦶"
      },
      {
        "id": "opt-k1-ps-h10-3",
        "label": {
          "th": "ใช้ไม้กวาดกวาดเศษขนมใส่ที่ตัก แล้วนำไปทิ้งลงถังขยะ",
          "en": "Sweep crumbs into dustpan and dump in trash",
          "zh": "用扫把扫进撮箕，倒入有盖垃圾桶"
        },
        "icon": "🧹"
      }
    ],
    "correctOptionId": "opt-k1-ps-h10-3",
    "explanation": {
      "th": "กวาดเศษขนมลงถังขยะทันที ห้องจะสะอาดและไม่มีมด เก่งมากครับ!",
      "en": "Awesome! Sweep crumbs into dustpan, then trash.",
      "zh": "答对了！立刻拿扫把扫进垃圾桶里。"
    }
  },
  {
    "id": "k2-ps-e1",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เมื่อสภาพอากาศหนาวเย็น มีลมพัดแรง ❄️ หนูควรเลือกสวมใส่เสื้อผ้าแบบใด?",
      "en": "When weather is very cold and windy ❄️, what clothes should you wear?",
      "zh": "当天气非常寒冷、刮起大风 ❄️ 时，应该选择穿什么样的衣服？"
    },
    "illustration": "❄️ 🧥 ❄️",
    "illustrationSubtitle": {
      "th": "การเลือกเสื้อผ้าตามสภาพอากาศ",
      "en": "Cold weather clothes",
      "zh": "根据气候选衣服"
    },
    "options": [
      {
        "id": "opt-k2-ps-e1-1",
        "label": {
          "th": "เสื้อแขนยาวและเสื้อกันหนาวหนานุ่ม",
          "en": "Long sleeve & warm jacket",
          "zh": "保暖长袖毛衣或厚羽绒外套 🧥"
        },
        "icon": "🧥"
      },
      {
        "id": "opt-k2-ps-e1-2",
        "label": {
          "th": "ชุดว่ายน้ำตัวบาง",
          "en": "Swimsuit",
          "zh": "单薄的泳衣"
        },
        "icon": "🩱"
      },
      {
        "id": "opt-k2-ps-e1-3",
        "label": {
          "th": "เสื้อกล้ามบางเฉียบ",
          "en": "Tank top",
          "zh": "薄薄的无袖背心"
        },
        "icon": "🎽"
      }
    ],
    "correctOptionId": "opt-k2-ps-e1-1",
    "explanation": {
      "th": "สวมเสื้อกันหนาวช่วยให้อบอุ่น ไม่เป็นหวัด เก่งมากครับ!",
      "en": "Correct! Warm jackets protect you from cold.",
      "zh": "答对了！穿厚厚保暖的衣服防寒感冒。"
    }
  },
  {
    "id": "k2-ps-e2",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เมื่อต้องการทิ้ง \"เปลือกกล้วยและเศษอาหาร\" 🍌 🍲 ควรทิ้งลงในถังขยะประเภทใด?",
      "en": "Where should you throw banana peels and food waste? 🍌 🍲",
      "zh": "吃剩下的香蕉皮和剩菜剩饭 🍌 🍲 应该扔进哪种分类垃圾桶？"
    },
    "illustration": "🍌 🗑️ 🍌",
    "illustrationSubtitle": {
      "th": "การคัดแยกขยะเศษอาหาร",
      "en": "Organic food waste bin",
      "zh": "有机厨余垃圾桶"
    },
    "options": [
      {
        "id": "opt-k2-ps-e2-1",
        "label": {
          "th": "ทิ้งลงแม่น้ำลำคลอง",
          "en": "Throw in river",
          "zh": "扔进河道水塘里"
        },
        "icon": "🌊"
      },
      {
        "id": "opt-k2-ps-e2-2",
        "label": {
          "th": "ถังขยะเปียก / ขยะอินทรีย์",
          "en": "Organic wet waste bin",
          "zh": "绿色湿垃圾 / 厨余垃圾桶"
        },
        "icon": "🗑️"
      },
      {
        "id": "opt-k2-ps-e2-3",
        "label": {
          "th": "โยนออกนอกหน้าต่าง",
          "en": "Throw out window",
          "zh": "随手扔出窗外"
        },
        "icon": "🪟"
      }
    ],
    "correctOptionId": "opt-k2-ps-e2-2",
    "explanation": {
      "th": "เศษอาหารเป็นขยะอินทรีย์ นำไปทำปุ๋ยหมักได้ เก่งมากครับ!",
      "en": "Right! Food waste goes into organic waste bins.",
      "zh": "答对啦！厨余剩饭扔进湿垃圾桶。"
    }
  },
  {
    "id": "k2-ps-e3",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เมื่อเพื่อนแบ่งปันของเล่นให้หนูเล่นด้วยกัน 🧸 คำพูดที่หนูควรกล่าวคือคำว่าอะไร?",
      "en": "A friend shares toys with you 🧸. What polite word should you say?",
      "zh": "小伙伴主动分享好玩的玩具给你一起玩 🧸，你应当真诚地说什么礼貌用语？"
    },
    "illustration": "🧸 🤝 🧸",
    "illustrationSubtitle": {
      "th": "การกล่าวขอบคุณเมื่อได้รับน้ำใจ",
      "en": "Say thank you",
      "zh": "礼貌表达感谢"
    },
    "options": [
      {
        "id": "opt-k2-ps-e3-1",
        "label": {
          "th": "ฉันเก่งกว่าเธอ",
          "en": "I am better",
          "zh": "我比你厉害多了"
        },
        "icon": "😜"
      },
      {
        "id": "opt-k2-ps-e3-2",
        "label": {
          "th": "เอามาอีกเยอะๆ",
          "en": "Give me more",
          "zh": "快再拿多一点给我"
        },
        "icon": "🤲"
      },
      {
        "id": "opt-k2-ps-e3-3",
        "label": {
          "th": "ขอบคุณครับ / ขอบคุณค่ะ",
          "en": "Thank you!",
          "zh": "谢谢你！(ขอบคุณครับ/ค่ะ)"
        },
        "icon": "🙏"
      }
    ],
    "correctOptionId": "opt-k2-ps-e3-3",
    "explanation": {
      "th": "กล่าวคำว่า \"ขอบคุณ\" เสมอเมื่อผู้อื่นมีน้ำใจช่วยเหลือ เก่งมากครับ!",
      "en": "Spot on! Saying \"Thank you\" shows politeness and gratitude.",
      "zh": "太棒了！礼貌说“谢谢你”。"
    }
  },
  {
    "id": "k2-ps-e4",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "การใส่รองเท้าให้ถูกต้อง: รองเท้าข้างซ้ายและข้างขวาควรสังเกตอย่างไร? 👟",
      "en": "How to tell left and right shoes apart correctly? 👟",
      "zh": "怎样正确区分和穿戴左脚与右脚的鞋子？👟"
    },
    "illustration": "👟 👣 👟",
    "illustrationSubtitle": {
      "th": "การสวมรองเท้าถูกข้าง",
      "en": "Put shoes on correct feet",
      "zh": "分清左右鞋子"
    },
    "options": [
      {
        "id": "opt-k2-ps-e4-1",
        "label": {
          "th": "หันหัวรองเท้าเข้าหากันเป็นทรงโค้งรับรูปเท้า",
          "en": "Curves face inward matching feet shape",
          "zh": "把两只鞋子的内侧弧线相对，对准自己的双脚形状"
        },
        "icon": "👟"
      },
      {
        "id": "opt-k2-ps-e4-2",
        "label": {
          "th": "ใส่ข้างไหนก็ได้เหมือนกันหมด",
          "en": "Does not matter",
          "zh": "随便穿哪只都可以，不需要看"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-ps-e4-3",
        "label": {
          "th": "หันหัวรองเท้าบิดออกไปข้างนอกคนละทาง",
          "en": "Curves point completely outward away",
          "zh": "把鞋尖完全朝向外侧反方向歪着穿"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-ps-e4-1",
    "explanation": {
      "th": "สวมรองเท้าให้ถูกข้าง ช่วยให้เดินสบายและเท้าไม่เจ็บ เก่งมากครับ!",
      "en": "Right! Shoes curve inward to fit your feet.",
      "zh": "答对啦！两只鞋的弧线要自然对齐脚型。"
    }
  },
  {
    "id": "k2-ps-e5",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เมื่อเพื่อนเดินสะดุดล้มลงกับพื้น 👧 การกระทำที่แสดงความมีน้ำใจคือข้อใด?",
      "en": "Friend trips and falls down 👧. What is the kindest action?",
      "zh": "好朋友在操场不小心摔倒在地上 👧，最暖心友善的举动是哪一个？"
    },
    "illustration": "👧 🤝 👧",
    "illustrationSubtitle": {
      "th": "การช่วยเหลือเพื่อนเมื่อเดือดร้อน",
      "en": "Help friend up",
      "zh": "关怀帮助摔倒的同学"
    },
    "options": [
      {
        "id": "opt-k2-ps-e5-1",
        "label": {
          "th": "หัวเราะเยาะเย้ยเสียงดัง",
          "en": "Laugh at them",
          "zh": "站在旁边大声嘲笑指指点点"
        },
        "icon": "😆"
      },
      {
        "id": "opt-k2-ps-e5-2",
        "label": {
          "th": "เข้าไปช่วยพยุงและถามด้วยความเป็นห่วงว่า \"เป็นอะไรไหม\"",
          "en": "Help them up and ask kindly if they are okay",
          "zh": "走上前扶起他，关切地问“你疼不疼？要紧吗？”"
        },
        "icon": "🤝"
      },
      {
        "id": "opt-k2-ps-e5-3",
        "label": {
          "th": "วิ่งหนีไปเล่นที่อื่น",
          "en": "Run away",
          "zh": "看一眼然后自己跑开不管"
        },
        "icon": "🏃"
      }
    ],
    "correctOptionId": "opt-k2-ps-e5-2",
    "explanation": {
      "th": "ช่วยพยุงเพื่อนและถามไถ่ เป็นเพื่อนที่ดีมากครับ!",
      "en": "Awesome! Helping them up shows great empathy.",
      "zh": "太棒了！友爱同学，主动上前搀扶关怀。"
    }
  },
  {
    "id": "k2-ps-e6",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เมื่อไฟสัญญาณจราจรสำหรับคนข้ามถนนเป็น \"รูปคนสีแดงยืนนิ่ง\" 🔴 หมายถึงสิ่งใด?",
      "en": "Pedestrian traffic light shows a \"red standing person\" 🔴. What does it mean?",
      "zh": "人行道信号灯亮起“红色静止小人” 🔴 时，代表什么规则？"
    },
    "illustration": "🔴 🛑 🔴",
    "illustrationSubtitle": {
      "th": "สัญญาณไฟจราจรคนข้าม",
      "en": "Red light: Stop",
      "zh": "红灯停绿灯行"
    },
    "options": [
      {
        "id": "opt-k2-ps-e6-1",
        "label": {
          "th": "ให้ลงไปนั่งเล่นกลางถนน",
          "en": "Sit in middle",
          "zh": "走到马路正中间坐下玩"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-ps-e6-2",
        "label": {
          "th": "ให้รีบวิ่งข้ามทันที",
          "en": "Run fast across",
          "zh": "立刻拼命奔跑过马路"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k2-ps-e6-3",
        "label": {
          "th": "ให้หยุดรอ ห้ามข้ามถนนเด็ดขาด",
          "en": "Stop and wait, do not cross",
          "zh": "停步在路边等待，绝对不可过马路"
        },
        "icon": "🛑"
      }
    ],
    "correctOptionId": "opt-k2-ps-e6-3",
    "explanation": {
      "th": "ไฟแดงคนข้ามต้องหยุดรอ ให้ไฟเขียวคนเดินก่อนจึงข้ามได้ เก่งมากครับ!",
      "en": "Correct! Red means stop and wait safely.",
      "zh": "答对了！红灯停，等待绿灯才能安全通过。"
    }
  },
  {
    "id": "k2-ps-e7",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เมื่อทำงานศิลปะระบายสีน้ำเสร็จแล้ว 🎨 สิ่งที่ควรทำกับพู่กันคือข้อใด?",
      "en": "Finished painting with watercolors 🎨. What should you do with brushes?",
      "zh": "用水彩颜料画完画 🎨 后，应该怎样处理画笔？"
    },
    "illustration": "🎨 🖌️ 🎨",
    "illustrationSubtitle": {
      "th": "การดูแลรักษาอุปกรณ์ศิลปะ",
      "en": "Clean paintbrushes",
      "zh": "清洗保养美术画笔"
    },
    "options": [
      {
        "id": "opt-k2-ps-e7-1",
        "label": {
          "th": "ล้างพู่กันในน้ำสะอาด เช็ดให้แห้งแล้วเก็บเข้าที่",
          "en": "Wash with water, wipe dry & store",
          "zh": "在清水里涮洗干净，吸干水分收纳好 🖌️"
        },
        "icon": "🖌️"
      },
      {
        "id": "opt-k2-ps-e7-2",
        "label": {
          "th": "โยนทิ้งลงถังขยะทันที",
          "en": "Throw away",
          "zh": "直接扔进垃圾桶不要了"
        },
        "icon": "🗑️"
      },
      {
        "id": "opt-k2-ps-e7-3",
        "label": {
          "th": "ป้ายสีเลอะโต๊ะเล่น",
          "en": "Paint on table",
          "zh": "把残余颜料乱抹在课桌上"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-ps-e7-1",
    "explanation": {
      "th": "ล้างพู่กันให้สะอาด ขนพู่กันจะไม่แข็งและใช้ต่อได้นาน เก่งมากครับ!",
      "en": "Right! Washing brushes keeps them soft and reusable.",
      "zh": "答对啦！清洗画笔晾干收纳，下次继续用。"
    }
  },
  {
    "id": "k2-ps-e8",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เมื่อคุณครูมอบหมายให้นำสมุดการบ้านกลับไปทำที่บ้าน 📚 สิ่งที่ควรทำคือข้อใด?",
      "en": "Teacher assigns homework in your notebook 📚. What should you do?",
      "zh": "老师布置了家庭作业 📚，带回家后应该怎么做？"
    },
    "illustration": "📚 ✍️ 📚",
    "illustrationSubtitle": {
      "th": "ความรับผิดชอบต่องานที่ได้รับมอบหมาย",
      "en": "Do homework responsibly",
      "zh": "按时认真完成作业"
    },
    "options": [
      {
        "id": "opt-k2-ps-e8-1",
        "label": {
          "th": "แอบเอาไปซ่อนใต้เตียงไม่ให้ใครเห็น",
          "en": "Hide under bed",
          "zh": "偷偷藏在床底下装作没作业"
        },
        "icon": "🙈"
      },
      {
        "id": "opt-k2-ps-e8-2",
        "label": {
          "th": "ตั้งใจทำการบ้านให้เสร็จเรียบร้อยแล้วเก็บใส่กระเป๋า",
          "en": "Complete homework diligently and pack in schoolbag",
          "zh": "认真把作业做完，放进书包准备明天交"
        },
        "icon": "✍️"
      },
      {
        "id": "opt-k2-ps-e8-3",
        "label": {
          "th": "ฉีกกระดาษสมุดพับเครื่องบินเล่น",
          "en": "Tear into airplanes",
          "zh": "把作业本撕烂折成纸飞机扔着玩"
        },
        "icon": "✈️"
      }
    ],
    "correctOptionId": "opt-k2-ps-e8-2",
    "explanation": {
      "th": "ทำการบ้านให้เรียบร้อยฝึกความรับผิดชอบ เก่งมากครับ!",
      "en": "Awesome! Completing homework builds great responsibility.",
      "zh": "太棒了！按时保质完成作业培养好习惯。"
    }
  },
  {
    "id": "k2-ps-e9",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "ถ้าหนูสังเกตเห็น \"น้ำนองเต็มพื้นหน้าห้องน้ำ\" 💦 หนูควรเดินอย่างไร?",
      "en": "Water puddle on floor outside restroom 💦. How should you walk?",
      "zh": "看到洗手间门口地面上有一大滩积水 💦，你应该怎样走路？"
    },
    "illustration": "💦 🚶 💦",
    "illustrationSubtitle": {
      "th": "การระมัดระวังพื้นลื่น",
      "en": "Walk carefully on wet floor",
      "zh": "小心地滑防跌倒"
    },
    "options": [
      {
        "id": "opt-k2-ps-e9-1",
        "label": {
          "th": "วิ่งแข่งกระโดดข้ามน้ำแรงๆ",
          "en": "Run and jump fast",
          "zh": "飞快奔跑大步起跳跨过水坑"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k2-ps-e9-2",
        "label": {
          "th": "เอาเท้าไถลเป็นสเก็ตบอร์ด",
          "en": "Slide like skateboard",
          "zh": "把湿地板当溜冰场滑行"
        },
        "icon": "🛹"
      },
      {
        "id": "opt-k2-ps-e9-3",
        "label": {
          "th": "เดินอย่างช้าๆ ระมัดระวัง เพื่อไม่ให้ลื่นล้ม",
          "en": "Walk slowly and carefully to avoid slipping",
          "zh": "放慢脚步，格外小心地绕开或慢走，防止滑倒"
        },
        "icon": "🚶"
      }
    ],
    "correctOptionId": "opt-k2-ps-e9-3",
    "explanation": {
      "th": "พื้นเปียกน้ำทำให้ลื่นล้มได้ง่าย ต้องเดินช้าๆ และระวัง เก่งมากครับ!",
      "en": "Correct! Walk slowly to prevent slipping on wet tiles.",
      "zh": "答对了！小心地滑，慢步走防摔伤。"
    }
  },
  {
    "id": "k2-ps-e10",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เมื่อหนูเผลอทำ \"แก้วน้ำตกแตก\" มีเศษแก้วคมๆ กระจายบนพื้น 💥 ควรทำอย่างไร?",
      "en": "Accidentally broke a glass into sharp shards 💥. What should you do?",
      "zh": "不小心把玻璃杯摔碎在地上，到处都是尖锐玻璃渣 💥，应该怎么做？"
    },
    "illustration": "💥 🥛 💥",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยจากเศษแก้วแตก",
      "en": "Broken glass safety",
      "zh": "碎玻璃危险防划伤"
    },
    "options": [
      {
        "id": "opt-k2-ps-e10-1",
        "label": {
          "th": "ไม่เอามือไปจับ และรีบบอกผู้ใหญ่ให้มาช่วยกวาดเก็บ",
          "en": "Do not touch shards; tell an adult to clean up",
          "zh": "绝对不要用手去抓，立刻喊大人拿扫把清扫"
        },
        "icon": "🙋"
      },
      {
        "id": "opt-k2-ps-e10-2",
        "label": {
          "th": "ใช้มือเปล่าหยิบเศษแก้วขึ้นมาเล่น",
          "en": "Pick shards with bare hands",
          "zh": "光着手直接去抓尖锐的玻璃碎片玩"
        },
        "icon": "🩸"
      },
      {
        "id": "opt-k2-ps-e10-3",
        "label": {
          "th": "เดินเหยียบย่ำด้วยเท้าเปล่า",
          "en": "Walk barefoot on it",
          "zh": "光着脚丫踩在碎玻璃渣上跳舞"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-ps-e10-1",
    "explanation": {
      "th": "เศษแก้วบาดมือได้ ห้ามหยิบเองเด็ดขาด ต้องให้ผู้ใหญ่เก็บกวาด เก่งมากครับ!",
      "en": "Right! Broken glass cuts easily; never touch with bare hands.",
      "zh": "答对啦！千万不要用手抓，请大人用工具清扫。"
    }
  },
  {
    "id": "k2-ps-m1",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "ถ้าเปิดก๊อกน้ำทิ้งไว้จนน้ำล้นอ่าง 🚰 วิธีแก้ปัญหาที่ดีที่สุดและรวดเร็วที่สุดคือข้อใด?",
      "en": "Sink is overflowing with water 🚰. What is the quickest solution?",
      "zh": "洗手盆里的水快要满溢出来了 🚰，最迅速关键的解决办法是什么？"
    },
    "illustration": "🚰 🛑 🚰",
    "illustrationSubtitle": {
      "th": "การปิดก๊อกน้ำแก้ปัญหาน้ำล้น",
      "en": "Turn off tap",
      "zh": "立刻拧紧水龙头"
    },
    "options": [
      {
        "id": "opt-k2-ps-m1-1",
        "label": {
          "th": "ยืนปรบมือเชียร์ให้น้ำไหลเร็วขึ้น",
          "en": "Clap cheering",
          "zh": "站在一旁拍手鼓劲让水流得更急"
        },
        "icon": "👏"
      },
      {
        "id": "opt-k2-ps-m1-2",
        "label": {
          "th": "รีบเดินไปหมุนปิดก๊อกน้ำให้สนิท",
          "en": "Quickly turn the tap tightly off",
          "zh": "立刻伸手把水龙头完全拧紧关掉"
        },
        "icon": "🛑"
      },
      {
        "id": "opt-k2-ps-m1-3",
        "label": {
          "th": "วิ่งไปหยิบแก้วน้ำมาตักสาดใส่เพื่อน",
          "en": "Splash friends",
          "zh": "拿水杯舀水往其他同学身上泼"
        },
        "icon": "💦"
      }
    ],
    "correctOptionId": "opt-k2-ps-m1-2",
    "explanation": {
      "th": "รีบปิดก๊อกน้ำเป็นอันดับแรกทันที เก่งมากครับ!",
      "en": "Correct! Shutting off the tap stops the overflow.",
      "zh": "答对了！第一时间先拧紧关掉水龙头。"
    }
  },
  {
    "id": "k2-ps-m2",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "เมื่อมีเพื่อนในกลุ่มต้องการใช้สีไม้กล่องเดียวกับหนู 🎨 หนูควรทำอย่างไร?",
      "en": "A classmate needs colored pencils from your shared box 🎨. What should you do?",
      "zh": "同桌小朋友需要用彩笔，而铅笔盒只有一盒 🎨，应该怎么做？"
    },
    "illustration": "🎨 🤝 🎨",
    "illustrationSubtitle": {
      "th": "การแบ่งปันและใช้ของร่วมกัน",
      "en": "Share supplies nicely",
      "zh": "互相分享文具"
    },
    "options": [
      {
        "id": "opt-k2-ps-m2-1",
        "label": {
          "th": "กอดกล่องสีไว้คนเดียวไม่ยอมให้ใครจับ",
          "en": "Hog the box",
          "zh": "把整盒彩笔死死抱住，谁都不给碰"
        },
        "icon": "😡"
      },
      {
        "id": "opt-k2-ps-m2-2",
        "label": {
          "th": "หักไส้สีไม้ทิ้งทั้งหมด",
          "en": "Break pencils",
          "zh": "把所有的彩笔芯全都故意折断"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-ps-m2-3",
        "label": {
          "th": "วางกล่องสีไว้ตรงกลางแล้วผลัดกันหยิบใช้ด้วยความเอื้อเฟื้อ",
          "en": "Place box in the middle and share nicely",
          "zh": "把彩笔盒放在课桌中间，大家轮流分享使用"
        },
        "icon": "🤝"
      }
    ],
    "correctOptionId": "opt-k2-ps-m2-3",
    "explanation": {
      "th": "การแบ่งปันและใช้ของร่วมกันทำให้เรียนสนุกและมีเพื่อนรัก เก่งมากครับ!",
      "en": "Awesome! Sharing supplies makes everyone happy.",
      "zh": "太棒了！放在中间大家友好轮流分享。"
    }
  },
  {
    "id": "k2-ps-m3",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "ในการเล่นเครื่องเล่นในสนามเด็กเล่น เช่น \"กระดานลื่น\" 🛝 กฎความปลอดภัยที่ถูกต้องคือข้อใด?",
      "en": "Safety rule for the playground slide 🛝: What is correct?",
      "zh": "在操场玩儿童滑滑梯 🛝 时，正确的安全规则是哪一项？"
    },
    "illustration": "🛝 👧 🛝",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยในการเล่นกระดานลื่น",
      "en": "Slide safety rules",
      "zh": "滑滑梯安全规则"
    },
    "options": [
      {
        "id": "opt-k2-ps-m3-1",
        "label": {
          "th": "นั่งหันหน้าตรง ลื่นลงมาทีละคน และไม่ผลักเพื่อนข้างหลัง",
          "en": "Sit facing forward, slide one by one, no pushing",
          "zh": "双脚朝前坐稳，一个接一个按序滑下，绝不推挤"
        },
        "icon": "✅"
      },
      {
        "id": "opt-k2-ps-m3-2",
        "label": {
          "th": "ปีนสวนทางขึ้นจากปลายกระดานลื่น",
          "en": "Climb up the slide part",
          "zh": "从滑梯出口反方向向上攀爬"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-ps-m3-3",
        "label": {
          "th": "ยืนเต้นบนขอบกระดานลื่นข้างบน",
          "en": "Dance on top edges",
          "zh": "站在高高的滑梯扶手上跳舞"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-ps-m3-1",
    "explanation": {
      "th": "ลื่นลงมาทีละคนตามลำดับ ช่วยป้องกันอุบัติเหตุตกกระดานลื่น เก่งมากครับ!",
      "en": "Correct! Slide down one at a time safely.",
      "zh": "答对啦！一人一个按顺序坐着滑下最安全。"
    }
  },
  {
    "id": "k2-ps-m4",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "ถ้ารู้สึกปวดศีรษะ ตัวร้อนผ่าว และครั่นเนื้อครั่นตัวในห้องเรียน 🤒 ควรทำอย่างไร?",
      "en": "You feel a headache, fever, and chills in the classroom 🤒. What should you do?",
      "zh": "在教室上课时感到头痛、身上发烫发烧、浑身无力 🤒，应该怎么做？"
    },
    "illustration": "🤒 👩‍⚕️ 🤒",
    "illustrationSubtitle": {
      "th": "การแจ้งอาการป่วยเมื่อไม่สบาย",
      "en": "Report feeling sick",
      "zh": "生病及时报告老师"
    },
    "options": [
      {
        "id": "opt-k2-ps-m4-1",
        "label": {
          "th": "ทนนั่งเงียบๆ ไม่บอกใครจนอาการแย่ลง",
          "en": "Stay quiet",
          "zh": "默默忍着不吭声，直到晕倒"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-ps-m4-2",
        "label": {
          "th": "รีบยกมือบอกคุณครู เพื่อพาไปห้องพยาบาลหรือติดต่อผู้ปกครอง",
          "en": "Raise hand and tell teacher to go to infirmary",
          "zh": "立刻举手告诉老师，由老师带去医务室量体温或通知家长"
        },
        "icon": "🙋"
      },
      {
        "id": "opt-k2-ps-m4-3",
        "label": {
          "th": "วิ่งออกไปตากแดดเล่นฟุตบอล",
          "en": "Run under hot sun",
          "zh": "跑去烈日下暴晒踢足球"
        },
        "icon": "⚽"
      }
    ],
    "correctOptionId": "opt-k2-ps-m4-2",
    "explanation": {
      "th": "บอกคุณครูทันทีเพื่อวัดไข้และดูแลรักษาอย่างถูกต้อง เก่งมากครับ!",
      "en": "Spot on! Tell your teacher immediately when sick.",
      "zh": "太棒了！举手告诉老师，及时测量体温治疗。"
    }
  },
  {
    "id": "k2-ps-m5",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "กล่องนมดื่มหมดแล้ว 🧃 ก่อนทิ้งลงถังรีไซเคิล ควรจัดการกล่องนมอย่างไร?",
      "en": "Finished milk carton 🧃. How should you prepare it before recycling?",
      "zh": "喝完的纸盒牛奶 🧃，在扔进可回收垃圾桶前应该如何处理？"
    },
    "illustration": "🧃 ♻️ 🧃",
    "illustrationSubtitle": {
      "th": "การพับกล่องนมรีไซเคิล",
      "en": "Flatten milk cartons",
      "zh": "压扁奶盒便于回收"
    },
    "options": [
      {
        "id": "opt-k2-ps-m5-1",
        "label": {
          "th": "เหยียบให้ระเบิดเสียงดังในห้อง",
          "en": "Stomp to make bang",
          "zh": "放在走廊里用力跺脚踩爆制造噪音"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-ps-m5-2",
        "label": {
          "th": "โยนข้ามห้องให้ลงถังขยะเล่น",
          "en": "Throw across room",
          "zh": "像投篮一样隔空扔来扔去"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-ps-m5-3",
        "label": {
          "th": "รีดนมให้หมด ดึงมุมกล่องแล้วพับให้แบนเพื่อประหยัดพื้นที่",
          "en": "Drink all, unfold corners, flatten to save space",
          "zh": "吸尽残奶，剪开或折平压扁，节省垃圾桶空间"
        },
        "icon": "♻️"
      }
    ],
    "correctOptionId": "opt-k2-ps-m5-3",
    "explanation": {
      "th": "พับกล่องนมให้แบนช่วยลดปริมาณขยะและรีไซเคิลได้ง่ายขึ้น เก่งมากครับ!",
      "en": "Awesome! Flattening cartons saves space for recycling.",
      "zh": "答对了！把奶盒压扁折叠，利于回收降耗。"
    }
  },
  {
    "id": "k2-ps-m6",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "ก่อนจะเดินข้ามทางม้าลาย 🦓 มีข้อปฏิบัติที่ปลอดภัยข้อใดบ้าง?",
      "en": "Before crossing a zebra crossing 🦓, what safety action should you take?",
      "zh": "在斑马线过马路前 🦓，应该做好哪些安全观察动作？"
    },
    "illustration": "👀 🦓 👀",
    "illustrationSubtitle": {
      "th": "มองซ้ายมองขวาก่อนข้ามถนน",
      "en": "Look left and right",
      "zh": "一停二看三通过"
    },
    "options": [
      {
        "id": "opt-k2-ps-m6-1",
        "label": {
          "th": "หยุดมองทางขวา ทางซ้าย ให้แน่ใจว่ารถหยุดสนิทแล้วจึงเดินข้าม",
          "en": "Stop, look right and left, ensure cars stopped completely",
          "zh": "停在路边，左右两边仔细看清车辆完全停稳后再通过"
        },
        "icon": "👀"
      },
      {
        "id": "opt-k2-ps-m6-2",
        "label": {
          "th": "หลับตาวิ่งข้ามทันทีโดยไม่มองถนน",
          "en": "Close eyes & sprint",
          "zh": "闭上眼睛直接低头狂奔过马路"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-ps-m6-3",
        "label": {
          "th": "เล่นโทรศัพท์มือถือขณะเดินข้าม",
          "en": "Play on phone",
          "zh": "边低头玩手机边慢吞吞走过马路"
        },
        "icon": "📱"
      }
    ],
    "correctOptionId": "opt-k2-ps-m6-1",
    "explanation": {
      "th": "มองขวา มองซ้าย ให้รถหยุดสนิทและจูงมือผู้ใหญ่ข้าม เก่งมากครับ!",
      "en": "Right! Look both ways and cross with an adult.",
      "zh": "答对啦！左顾右看，确认车辆停稳再过。"
    }
  },
  {
    "id": "k2-ps-m7",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "สิ่งของเครื่องใช้ใดในบ้านที่มี \"ความร้อนสูงมาก\" และเด็กๆ ห้ามเอามือไปแตะ? ♨️",
      "en": "Which household item gets VERY HOT ♨️ and must never be touched by kids?",
      "zh": "下列哪一样家用设施工作时“温度极高” ♨️，儿童绝对不可用手乱摸？"
    },
    "illustration": "♨️ ⚠️ ♨️",
    "illustrationSubtitle": {
      "th": "อันตรายจากความร้อนและของร้อน",
      "en": "Burn hazard: Hot iron / Stove",
      "zh": "防烫伤安全常识"
    },
    "options": [
      {
        "id": "opt-k2-ps-m7-1",
        "label": {
          "th": "หนังสือการ์ตูนนิทาน",
          "en": "Comic book",
          "zh": "彩色童话故事书"
        },
        "icon": "📚"
      },
      {
        "id": "opt-k2-ps-m7-2",
        "label": {
          "th": "เตารีดผ้าที่กำลังเสียบปลั๊ก หรือ เตาแก๊ส ♨️",
          "en": "Electric iron / Gas stove",
          "zh": "通电加热的电熨斗或燃气灶 ♨️"
        },
        "icon": "♨️"
      },
      {
        "id": "opt-k2-ps-m7-3",
        "label": {
          "th": "ผ้าห่มนุ่มนอน",
          "en": "Soft blanket",
          "zh": "睡觉盖的软毛毯"
        },
        "icon": "🛏️"
      }
    ],
    "correctOptionId": "opt-k2-ps-m7-2",
    "explanation": {
      "th": "เตารีดและเตาแก๊สร้อนจัด อาจลวกผิวหนังพุพองได้ ห้ามเข้าใกล้ เก่งมากครับ!",
      "en": "Correct! Stoves and irons cause severe burns.",
      "zh": "答对了！通电熨斗和炉灶极烫，严防烫伤。"
    }
  },
  {
    "id": "k2-ps-m8",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "เมื่อมีเพื่อนเผลอเดินชนหนูจนของเล่นหลุดมือ 🧸 และเพื่อนรีบพูดว่า \"ขอโทษนะ\" หนูควรตอบอย่างไร?",
      "en": "Friend accidentally bumps into you and says \"I am so sorry!\" 🧸. How should you respond?",
      "zh": "同学不小心撞了你一下玩具掉了 🧸，对方立刻诚恳说“对不起”，你该如何回应？"
    },
    "illustration": "🧸 🙏 🧸",
    "illustrationSubtitle": {
      "th": "การให้อภัยและมารยาททางสังคม",
      "en": "Forgiveness: \"It's okay\"",
      "zh": "宽容原谅“没关系”"
    },
    "options": [
      {
        "id": "opt-k2-ps-m8-1",
        "label": {
          "th": "ทุบของเล่นเพื่อนให้พังบ้าง",
          "en": "Break their toy",
          "zh": "抢过对方的玩具用力摔在地上报复"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-ps-m8-2",
        "label": {
          "th": "ต่อยตีเพื่อนเพื่อแก้แค้น",
          "en": "Punch them",
          "zh": "挥拳打对方一顿出气报复"
        },
        "icon": "🥊"
      },
      {
        "id": "opt-k2-ps-m8-3",
        "label": {
          "th": "บอกเพื่อนว่า \"ไม่เป็นไรจ้ะ คราวหน้าเดินระวังนะ\"",
          "en": "Say \"It's okay, please be careful next time\"",
          "zh": "微笑着说“没关系，下次走路注意一点就好啦”"
        },
        "icon": "🤝"
      }
    ],
    "correctOptionId": "opt-k2-ps-m8-3",
    "explanation": {
      "th": "ให้อภัยเมื่อเพื่อนขอโทษอย่างจริงใจ เป็นมิตรภาพที่ดีงาม เก่งมากครับ!",
      "en": "Awesome! Forgiving your friend keeps friendships strong.",
      "zh": "太棒了！懂得原谅，说一句“没关系”。"
    }
  },
  {
    "id": "k2-ps-m9",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "เมื่อจามหรือไอในที่สาธารณะ 🤧 หนูควรปฏิบัติตัวอย่างไรเพื่อไม่ให้เชื้อโรคแพร่กระจาย?",
      "en": "When coughing or sneezing in public 🤧, what should you do to stop germs?",
      "zh": "在公共场合打喷嚏或咳嗽 🤧 时，怎样做才能有效阻止飞沫和病菌传播？"
    },
    "illustration": "🤧 🧻 🤧",
    "illustrationSubtitle": {
      "th": "การไอจามอย่างถูกสุขอนามัย",
      "en": "Cough & sneeze hygiene",
      "zh": "咳嗽打喷嚏礼仪"
    },
    "options": [
      {
        "id": "opt-k2-ps-m9-1",
        "label": {
          "th": "ใช้ทิชชูหรือข้อพับแขนเสื้อปิดปากและจมูก",
          "en": "Cover with tissue or elbow fold",
          "zh": "用纸巾或弯曲的手肘内侧遮住口鼻 🧻"
        },
        "icon": "🧻"
      },
      {
        "id": "opt-k2-ps-m9-2",
        "label": {
          "th": "หันหน้าไปจามใส่หน้าเพื่อนตรงๆ",
          "en": "Sneeze in friend's face",
          "zh": "转过头正对着同学的脸用力打喷嚏"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-ps-m9-3",
        "label": {
          "th": "อ้าปากกว้างไอเสียงดังลั่น",
          "en": "Cough widely with open mouth",
          "zh": "张大嘴巴冲着空气大声咳嗽"
        },
        "icon": "📢"
      }
    ],
    "correctOptionId": "opt-k2-ps-m9-1",
    "explanation": {
      "th": "ใช้ทิชชูหรือข้อศอกปิดปากเวลาไอจาม ช่วยป้องกันเชื้อโรคแพร่สู่ผู้อื่น เก่งมากครับ!",
      "en": "Right! Cover your mouth with a tissue or your elbow.",
      "zh": "答对啦！用纸巾或肘部遮挡口鼻。"
    }
  },
  {
    "id": "k2-ps-m10",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "พืชในกระถางหน้าห้องเรียนมี \"ใบเหี่ยวเฉาและดินแห้งผาก\" 🥀 หนูคิดว่าควรช่วยอย่างไร?",
      "en": "Potted plant has wilted leaves and dry soil 🥀. What does it need?",
      "zh": "教室门口小花盆里的植物“绿叶发蔫枯萎，泥土干裂” 🥀，应该怎样拯救它？"
    },
    "illustration": "🥀 🚿 🪴",
    "illustrationSubtitle": {
      "th": "การดูแลรดน้ำต้นไม้",
      "en": "Water thirsty plants",
      "zh": "给干渴植物浇水"
    },
    "options": [
      {
        "id": "opt-k2-ps-m10-1",
        "label": {
          "th": "เด็ดใบไม้ทิ้งให้หมดต้น",
          "en": "Pluck all leaves",
          "zh": "把枯叶全拔光折断茎杆"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-ps-m10-2",
        "label": {
          "th": "นำบัวรดน้ำมารดน้ำในดินให้ชุ่มชื้นพอดี",
          "en": "Water the soil with watering can",
          "zh": "拿小水壶给盆栽泥土浇适量的水 🚿"
        },
        "icon": "🚿"
      },
      {
        "id": "opt-k2-ps-m10-3",
        "label": {
          "th": "เอาดินทรายแห้งมาทับให้จม",
          "en": "Cover with dry sand",
          "zh": "抓一大把干燥泥沙把它活埋"
        },
        "icon": "🟤"
      }
    ],
    "correctOptionId": "opt-k2-ps-m10-2",
    "explanation": {
      "th": "รดน้ำที่โคนต้นไม้ ต้นไม้จะดูดน้ำไปเลี้ยงลำต้นจนสดชื่น เก่งมากครับ!",
      "en": "Spot on! Water helps thirsty plants recover.",
      "zh": "太棒了！给泥土浇适量清水，植物就会重现生机。"
    }
  },
  {
    "id": "k2-ps-h1",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "ถ้าหนูและเพื่อนสร้างปราสาทไม้บล็อกสูงมาก 🏰 แต่ปราสาทเริ่มเอียงจะล้ม ควรทำอย่างไร?",
      "en": "Wooden block tower is leaning and about to collapse 🏰. What should you do?",
      "zh": "搭好的高大积木城堡 🏰 摇晃倾斜快要倒塌了，应该采取什么明智举措？"
    },
    "illustration": "🏰 🪵 🏰",
    "illustrationSubtitle": {
      "th": "การป้องกันอันตรายจากของล้ม",
      "en": "Block tower balance",
      "zh": "积木倒塌防砸伤"
    },
    "options": [
      {
        "id": "opt-k2-ps-h1-1",
        "label": {
          "th": "เอามือไปผลักให้ล้มใส่เท้าเพื่อน",
          "en": "Push it on friend's feet",
          "zh": "用力一推把积木推倒砸到同学脚上"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-ps-h1-2",
        "label": {
          "th": "ร้องกรี๊ดแล้วทุบทำลายไม้บล็อก",
          "en": "Scream & smash",
          "zh": "尖叫着砸坏所有积木块"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-ps-h1-3",
        "label": {
          "th": "ถอยห่างออกมาเพื่อความปลอดภัย แล้วค่อยๆ ช่วยกันรื้อวางฐานให้กว้างขึ้น",
          "en": "Step back safely, rebuild with wider base",
          "zh": "主动后退一步确保安全，再一起把底座加宽稳固重搭"
        },
        "icon": "🤝"
      }
    ],
    "correctOptionId": "opt-k2-ps-h1-3",
    "explanation": {
      "th": "ถอยออกมาให้ปลอดภัย และสร้างฐานใหม่ให้กว้างมั่นคง เก่งมากครับ!",
      "en": "Correct! Step back for safety and build a wider base.",
      "zh": "答对了！先保证安全，加宽稳固底座重新搭建。"
    }
  },
  {
    "id": "k2-ps-h2",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "การคัดแยกขยะ: \"กระป๋องน้ำอัดลมอลูมิเนียมและขวดพลาสติกใส\" 🥫 🍼 จัดเป็นขยะประเภทใด?",
      "en": "Recycling: Aluminum cans and clear plastic bottles 🥫 🍼 belong to which waste category?",
      "zh": "垃圾分类：易拉罐铝罐与透明塑料饮料瓶 🥫 🍼 属于哪一类垃圾？"
    },
    "illustration": "🥫 ♻️ 🍼",
    "illustrationSubtitle": {
      "th": "ขยะรีไซเคิลขายได้",
      "en": "Recyclable waste",
      "zh": "可回收物"
    },
    "options": [
      {
        "id": "opt-k2-ps-h2-1",
        "label": {
          "th": "ขยะรีไซเคิล (นำกลับมาแปรรูปใช้ใหม่ได้)",
          "en": "Recyclables (can be remade)",
          "zh": "可回收物（可循环再生利用）♻️"
        },
        "icon": "♻️"
      },
      {
        "id": "opt-k2-ps-h2-2",
        "label": {
          "th": "ขยะอันตรายมีพิษร้ายแรง",
          "en": "Hazardous toxic waste",
          "zh": "有害有毒危险品垃圾"
        },
        "icon": "☣️"
      },
      {
        "id": "opt-k2-ps-h2-3",
        "label": {
          "th": "ขยะเศษอาหารเน่าเสีย",
          "en": "Decomposed food waste",
          "zh": "腐烂易臭的厨余垃圾"
        },
        "icon": "🦴"
      }
    ],
    "correctOptionId": "opt-k2-ps-h2-1",
    "explanation": {
      "th": "ขวดพลาสติกและกระป๋องนำไปรีไซเคิลเป็นสิ่งของใหม่ได้ เก่งมากครับ!",
      "en": "Right! Cans and bottles can be recycled.",
      "zh": "答对啦！属于可以变废为宝的可回收物。"
    }
  },
  {
    "id": "k2-ps-h3",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "เมื่ออยู่ในรถยนต์ส่วนบุคคลหรือรถตู้โรงเรียน 🚗 กฎความปลอดภัยสำคัญที่สุดคือข้อใด?",
      "en": "When riding in a car or school van 🚗, what is the most important safety rule?",
      "zh": "乘坐私家车或校车 🚗 时，最重要的乘车安全铁则是哪一项？"
    },
    "illustration": "🚗 💺 🚗",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยในการนั่งรถ",
      "en": "Car seatbelt safety",
      "zh": "乘车系好安全带"
    },
    "options": [
      {
        "id": "opt-k2-ps-h3-1",
        "label": {
          "th": "ปีนเล่นบนเบาะหลังและเปิดประตูรถเล่น",
          "en": "Climb on seats & open door",
          "zh": "在座位上跳来跳去，并随意拉开车门锁"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-ps-h3-2",
        "label": {
          "th": "คาดเข็มขัดนิรภัย นั่งนิ่งๆ และไม่ยื่นแขนศีรษะออกนอกหน้าต่าง",
          "en": "Fasten seatbelt, sit still, no heads/hands out window",
          "zh": "系紧安全带坐好，严禁将头手伸出窗外"
        },
        "icon": "💺"
      },
      {
        "id": "opt-k2-ps-h3-3",
        "label": {
          "th": "ส่งเสียงกรี๊ดดังๆ แกล้งคนขับรถ",
          "en": "Scream at driver",
          "zh": "对着正在专心开车的司机大吼大叫"
        },
        "icon": "📢"
      }
    ],
    "correctOptionId": "opt-k2-ps-h3-2",
    "explanation": {
      "th": "คาดเข็มขัดนิรภัยและไม่ยื่นอวัยวะออกนอกรถ ปลอดภัยที่สุด เก่งมากครับ!",
      "en": "Correct! Fastening seatbelts saves lives.",
      "zh": "答对了！系好安全带，手头绝不伸出窗外。"
    }
  },
  {
    "id": "k2-ps-h4",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "ถ้าทำสีไม้ตกลงพื้นแล้วเพื่อนข้างๆ ไม่ทันมองกำลังจะเดินมาเหยียบ 🖍️ ควรทำอย่างไร?",
      "en": "Colored pencil dropped on floor; friend is about to step on it 🖍️. What should you do?",
      "zh": "画笔掉在地上，旁边的小伙伴没留神正要踩上去 🖍️，你应该怎么做？"
    },
    "illustration": "🖍️ ⚠️ 🖍️",
    "illustrationSubtitle": {
      "th": "การเตือนภัยและป้องกันอุบัติเหตุ",
      "en": "Warn friend & pick up",
      "zh": "提醒同伴防滑倒"
    },
    "options": [
      {
        "id": "opt-k2-ps-h4-1",
        "label": {
          "th": "หยิบดินสออีกแท่งมาปาใส่",
          "en": "Throw more pencils",
          "zh": "再扔几支笔过去故意让他滑倒"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-ps-h4-2",
        "label": {
          "th": "แอบดูเพื่อรอดูเพื่อนลื่นล้มหัวฟาดพื้น",
          "en": "Wait for them to slip",
          "zh": "抱着看热闹心态等他滑倒摔跤出丑"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-ps-h4-3",
        "label": {
          "th": "รีบพูดเตือนเพื่อนว่า \"ระวังเหยียบสีนะ\" แล้วช่วยกันก้มเก็บ",
          "en": "Warn \"Watch out!\" and pick it up quickly",
          "zh": "立刻大声提醒“小心脚下有笔！”，快速捡起"
        },
        "icon": "🙋"
      }
    ],
    "correctOptionId": "opt-k2-ps-h4-3",
    "explanation": {
      "th": "ส่งเสียงเตือนเพื่อนด้วยความหวังดี ช่วยป้องกันอุบัติเหตุ เก่งมากครับ!",
      "en": "Awesome! Warning your friend stops slips and falls.",
      "zh": "太棒了！及时出声提醒，防止踩到摔倒。"
    }
  },
  {
    "id": "k2-ps-h5",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "เมื่อเกิดเหตุการณ์ \"ไฟไหม้มีควันลอยเต็มห้อง\" 🔥 วิธีเอาตัวรอดเบื้องต้นคือข้อใด?",
      "en": "Emergency: Fire with smoke filling the room 🔥. How to evacuate safely?",
      "zh": "火灾紧急避险：房间里起火冒出浓烟 🔥 时，正确的初步自救逃生动作是？"
    },
    "illustration": "🔥 🏃 💨",
    "illustrationSubtitle": {
      "th": "การหนีไฟอย่างปลอดภัย",
      "en": "Fire evacuation: Crawl low under smoke",
      "zh": "火灾低姿弯腰捂口鼻逃生"
    },
    "options": [
      {
        "id": "opt-k2-ps-h5-1",
        "label": {
          "th": "ก้มตัวหมอบต่ำ ใช้ผ้าชุบน้ำปิดจมูกปาก คลานหนีออกทางหนีไฟอย่างรวดเร็ว",
          "en": "Stay low, cover nose with wet cloth, crawl out exit",
          "zh": "用湿毛巾捂住口鼻，压低身体弯腰贴近地面爬向安全出口"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k2-ps-h5-2",
        "label": {
          "th": "ยืนกระโดดสูดควันไฟเข้าปอดลึกๆ",
          "en": "Jump and breathe smoke",
          "zh": "站得高高的大口大口吸浓烟"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-ps-h5-3",
        "label": {
          "th": "วิ่งเข้าไปแอบในตู้เสื้อผ้าที่ล็อคประตู",
          "en": "Hide in wardrobe",
          "zh": "跑进衣柜反锁柜门躲起来"
        },
        "icon": "🚪"
      }
    ],
    "correctOptionId": "opt-k2-ps-h5-1",
    "explanation": {
      "th": "ควันไฟลอยขึ้นที่สูง การหมอบต่ำช่วยให้มีอากาศหายใจ เก่งมากครับ!",
      "en": "Correct! Smoke rises; crawling low keeps you safe.",
      "zh": "答对了！弯腰低姿捂口鼻逃生。"
    }
  },
  {
    "id": "k2-ps-h6",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "เมื่อหนูต้องการเลือกผลไม้ที่ \"สุกพร้อมรับประทาน\" กล้วยควรมีลักษณะใด? 🍌",
      "en": "To pick a ripe banana ready to eat 🍌, what color should it be?",
      "zh": "挑选一根成熟香甜、可以直接食用的香蕉 🍌，它应该呈现什么特征？"
    },
    "illustration": "🍌 🟢 🟡",
    "illustrationSubtitle": {
      "th": "การสังเกตความสุกของผลไม้",
      "en": "Ripe fruit: Yellow banana",
      "zh": "判断香蕉成熟度"
    },
    "options": [
      {
        "id": "opt-k2-ps-h6-1",
        "label": {
          "th": "เปลือกสีเขียวเข้ม แข็งและฝาดมาก",
          "en": "Dark green, hard & bitter",
          "zh": "深绿色外皮、硬邦邦且发涩"
        },
        "icon": "🟢"
      },
      {
        "id": "opt-k2-ps-h6-2",
        "label": {
          "th": "เปลือกสีเหลืองทองสดใส เนื้อนุ่มหอมหวาน",
          "en": "Bright golden yellow, soft & sweet",
          "zh": "金黄色外皮、果肉软甜香浓 🍌"
        },
        "icon": "🟡"
      },
      {
        "id": "opt-k2-ps-h6-3",
        "label": {
          "th": "เปลือกเน่าเละมีราดำขึ้นเต็มไปหมด",
          "en": "Rotten black mold",
          "zh": "发黑发霉软烂流汁变质"
        },
        "icon": "🟤"
      }
    ],
    "correctOptionId": "opt-k2-ps-h6-2",
    "explanation": {
      "th": "กล้วยสุกจะมีเปลือกสีเหลือง หอมหวานรับประทานอร่อย เก่งมากครับ!",
      "en": "Right! Yellow bananas are sweet and ripe.",
      "zh": "答对啦！金黄色的香蕉熟透香甜。"
    }
  },
  {
    "id": "k2-ps-h7",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "เมื่อต้องใช้กรรไกรสำหรับเด็กตัดกระดาษ ✂️ ข้อควรระวังสำคัญคือข้อใด?",
      "en": "When using safety scissors ✂️, what is the most important rule?",
      "zh": "使用儿童安全剪刀剪纸 ✂️ 时，最重要的安全守则是什么？"
    },
    "illustration": "✂️ 📄 ✂️",
    "illustrationSubtitle": {
      "th": "การใช้กรรไกรอย่างปลอดภัย",
      "en": "Scissors safety",
      "zh": "安全用剪刀"
    },
    "options": [
      {
        "id": "opt-k2-ps-h7-1",
        "label": {
          "th": "เอากรรไกรไปตัดผมหรือเสื้อผ้าเพื่อนเล่น",
          "en": "Cut friend's hair/clothes",
          "zh": "拿剪刀剪同学的头发或撕剪校服"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-ps-h7-2",
        "label": {
          "th": "ถือกรรไกรวิ่งเล่นไล่จับรอบห้อง",
          "en": "Run chasing with scissors",
          "zh": "手里拿着尖剪刀跟同学追逐打闹"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k2-ps-h7-3",
        "label": {
          "th": "ตัดกระดาษบนโต๊ะอย่างระมัดระวัง ไม่นำปลายกรรไกรชี้ใส่เพื่อนหรือวิ่งถือ",
          "en": "Cut on table carefully, never point or run with scissors",
          "zh": "在桌上专心剪纸，绝不拿刀尖指人，严禁拿着剪刀跑跳"
        },
        "icon": "✅"
      }
    ],
    "correctOptionId": "opt-k2-ps-h7-3",
    "explanation": {
      "th": "ส่งกรรไกรโดยหันด้ามจับให้ผู้อื่น และไม่วิ่งถือกรรไกร เก่งมากครับ!",
      "en": "Spot on! Never run with scissors or point them at others.",
      "zh": "太棒了！专注剪纸，绝不用剪刀追逐打闹。"
    }
  },
  {
    "id": "k2-ps-h8",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "ถ้าเปิดตู้เย็นแล้วพบกล่องนมที่ \"มีกลิ่นเปรี้ยวบูดและกล่องบวมเต่ง\" 🥛 ควรทำอย่างไร?",
      "en": "Milk carton smells sour and is puffed up swollen 🥛. What should you do?",
      "zh": "打开冰箱发现有一盒牛奶“散发酸臭变质气味，且盒子鼓包鼓起” 🥛，应该怎么做？"
    },
    "illustration": "🥛 ❌ 🥛",
    "illustrationSubtitle": {
      "th": "การสังเกตอาหารบูดเสีย",
      "en": "Spoiled food detection",
      "zh": "变质食物不可食用"
    },
    "options": [
      {
        "id": "opt-k2-ps-h8-1",
        "label": {
          "th": "ห้ามดื่มเด็ดขาด และบอกผู้ปกครองให้นำไปทิ้ง เพราะนมบูดเสียแล้ว",
          "en": "Do not drink! Tell parent to throw it away; it is spoiled",
          "zh": "绝对不能饮用！告诉家长扔掉，因为牛奶已酸败变质"
        },
        "icon": "🛑"
      },
      {
        "id": "opt-k2-ps-h8-2",
        "label": {
          "th": "ดื่มให้หมดกล่องเพื่อไม่ให้เหลือทิ้ง",
          "en": "Drink it all anyway",
          "zh": "大口全部喝光避免浪费"
        },
        "icon": "🤮"
      },
      {
        "id": "opt-k2-ps-h8-3",
        "label": {
          "th": "เอานมบูดไปเทให้ลูกแมวกิน",
          "en": "Feed to kitten",
          "zh": "倒给小奶猫喝"
        },
        "icon": "🐱"
      }
    ],
    "correctOptionId": "opt-k2-ps-h8-1",
    "explanation": {
      "th": "นมบูดมีเชื้อแบคทีเรียอันตราย ดื่มแล้วท้องเสีย ห้ามดื่มเด็ดขาด เก่งมากครับ!",
      "en": "Correct! Spoiled swollen milk causes food poisoning.",
      "zh": "答对了！胀包变酸的牛奶已变质，绝不可喝。"
    }
  },
  {
    "id": "k2-ps-h9",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "เมื่อคุณครูขออาสาสมัครช่วย \"แจกสมุดแบบฝึกหัดให้เพื่อนทุกคน\" 📚 เด็กดีควรทำอย่างไร?",
      "en": "Teacher asks for volunteers to hand out exercise books 📚. What should you do?",
      "zh": "老师在班里问：“谁愿意主动帮忙把作业本发给所有小朋友？” 📚，好孩子应该？"
    },
    "illustration": "📚 🙋 📚",
    "illustrationSubtitle": {
      "th": "จิตอาสาช่วยเหลือผู้อื่น",
      "en": "Volunteer to help class",
      "zh": "积极主动当热心小助手"
    },
    "options": [
      {
        "id": "opt-k2-ps-h9-1",
        "label": {
          "th": "แกล้งนอนหลับไม่สนใจใคร",
          "en": "Pretend to sleep",
          "zh": "趴在桌上装睡不管不理"
        },
        "icon": "😴"
      },
      {
        "id": "opt-k2-ps-h9-2",
        "label": {
          "th": "ยกมืออาสาด้วยความกระตือรือร้นและช่วยแจกอย่างเป็นระเบียบ",
          "en": "Eagerly volunteer and distribute books neatly",
          "zh": "举起小手积极报名，井井有条地帮老师发本子"
        },
        "icon": "🙋"
      },
      {
        "id": "opt-k2-ps-h9-3",
        "label": {
          "th": "วิ่งไปแย่งสมุดมาปาเล่น",
          "en": "Grab & throw books",
          "zh": "冲上去抢过本子在地上乱扔"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-ps-h9-2",
    "explanation": {
      "th": "การมีจิตอาสาช่วยงานส่วนรวม เป็นคุณธรรมที่น่าภาคภูมิใจ เก่งมากครับ!",
      "en": "Awesome! Volunteering to help is wonderful citizenship.",
      "zh": "太棒了！热心当老师的小帮手，乐于助人。"
    }
  },
  {
    "id": "k2-ps-h10",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "ถ้าเพื่อนในห้องนั่งเศร้าซึมและไม่มีของเล่นเล่นด้วย 😢 หนูควรทำอย่างไร?",
      "en": "A classmate is sitting sadly with no toys to play 😢. What should you do?",
      "zh": "看到有位小伙伴孤独难过地坐在角落里，手里没有任何玩具 😢，你应该？"
    },
    "illustration": "😢 🤝 🧸",
    "illustrationSubtitle": {
      "th": "การแสดงความเห็นอกเห็นใจและชวนเพื่อนเล่น",
      "en": "Invite sad friend to play",
      "zh": "关心孤独的同伴"
    },
    "options": [
      {
        "id": "opt-k2-ps-h10-1",
        "label": {
          "th": "เดินไปผลักให้ล้ม",
          "en": "Push them",
          "zh": "走过去推倒他"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-ps-h10-2",
        "label": {
          "th": "ชี้หน้าล้อเลียนว่าไม่มีเพื่อนคบ",
          "en": "Mock them for being alone",
          "zh": "在旁边指手画脚起哄嘲笑他没朋友"
        },
        "icon": "😜"
      },
      {
        "id": "opt-k2-ps-h10-3",
        "label": {
          "th": "เดินเข้าไปชวนด้วยรอยยิ้มว่า \"มาเล่นของเล่นด้วยกันไหมจ๊ะ\"",
          "en": "Walk up with a smile: \"Do you want to play together?\"",
          "zh": "走上前微笑着说：“我们一起玩积木好吗？”"
        },
        "icon": "🤝"
      }
    ],
    "correctOptionId": "opt-k2-ps-h10-3",
    "explanation": {
      "th": "ชวนเพื่อนที่เหงามาเล่นด้วยกัน ทำให้ทุกคนมีความสุข เก่งมากครับ!",
      "en": "Right! Inviting lonely friends brings joy to everyone.",
      "zh": "答对啦！主动邀请孤独的朋友一起玩耍。"
    }
  },
  {
    "id": "k3-ps-e1",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "ถังขยะ \"สีแดง\" 🔴 ตามมาตรฐานการคัดแยกขยะ มีไว้สำหรับทิ้งสิ่งของใด?",
      "en": "Standard RED trash bin 🔴: What items should be discarded here?",
      "zh": "标准分类垃圾桶中的“红色垃圾桶” 🔴，是专门用来投放什么垃圾的？"
    },
    "illustration": "🔴 ☣️ 🔴",
    "illustrationSubtitle": {
      "th": "ถังขยะอันตรายสีแดง",
      "en": "Hazardous waste bin",
      "zh": "红色有害垃圾桶"
    },
    "options": [
      {
        "id": "opt-k3-ps-e1-1",
        "label": {
          "th": "ขยะอันตราย เช่น ถ่านไฟฉาย หลอดไฟ กระป๋องยาฆ่าแมลง 🔋",
          "en": "Hazardous waste: Batteries, lightbulbs, sprays",
          "zh": "有害垃圾（废电池、废灯管、杀虫剂罐）🔋"
        },
        "icon": "☣️"
      },
      {
        "id": "opt-k3-ps-e1-2",
        "label": {
          "th": "เศษผักและเปลือกผลไม้",
          "en": "Vegetable scraps",
          "zh": "蔬菜叶子果皮"
        },
        "icon": "🥬"
      },
      {
        "id": "opt-k3-ps-e1-3",
        "label": {
          "th": "กระดาษสมุดใช้แล้ว",
          "en": "Waste paper",
          "zh": "旧作业纸张"
        },
        "icon": "📄"
      }
    ],
    "correctOptionId": "opt-k3-ps-e1-1",
    "explanation": {
      "th": "ถังสีแดงใส่ขยะอันตรายที่มีสารพิษหรือสารเคมี เก่งมากครับ!",
      "en": "Correct! Red bins are for hazardous/toxic items.",
      "zh": "答对了！红色垃圾桶装有害垃圾（电池、灯管等）。"
    }
  },
  {
    "id": "k3-ps-e2",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "ถังขยะ \"สีน้ำเงิน\" 🔵 ตามมาตรฐาน มีไว้สำหรับทิ้งขยะประเภทใด?",
      "en": "Standard BLUE trash bin 🔵: What kind of waste goes here?",
      "zh": "标准分类垃圾桶中的“蓝色垃圾桶” 🔵，主要用来投放什么垃圾？"
    },
    "illustration": "🔵 🗑️ 🔵",
    "illustrationSubtitle": {
      "th": "ถังขยะทั่วไปสีน้ำเงิน",
      "en": "General waste bin",
      "zh": "蓝色其他/一般垃圾桶"
    },
    "options": [
      {
        "id": "opt-k3-ps-e2-1",
        "label": {
          "th": "แก้วน้ำแตกแหลมคม",
          "en": "Broken glass",
          "zh": "锋利碎玻璃"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k3-ps-e2-2",
        "label": {
          "th": "ขยะทั่วไป เช่น ซองขนม ถุงพลาสติกเปื้อน กล่องโฟม",
          "en": "General waste: Snack wrappers, soiled plastics, foam",
          "zh": "其他/一般垃圾（零食塑料袋、污损塑料、泡沫盒）"
        },
        "icon": "🗑️"
      },
      {
        "id": "opt-k3-ps-e2-3",
        "label": {
          "th": "สารเคมีติดไฟง่าย",
          "en": "Flammable chemicals",
          "zh": "易燃易爆化学品"
        },
        "icon": "🔥"
      }
    ],
    "correctOptionId": "opt-k3-ps-e2-2",
    "explanation": {
      "th": "ถังสีน้ำเงินคือขยะทั่วไปที่ไม่สามารถนำไปรีไซเคิลได้ เก่งมากครับ!",
      "en": "Right! Blue bins are for non-recyclable general waste.",
      "zh": "答对啦！蓝色垃圾桶投放普通干垃圾/其他垃圾。"
    }
  },
  {
    "id": "k3-ps-e3",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เมื่อมี \"เลือดกำเดาไหล\" ออกจากรูจมูก 👃 การปฐมพยาบาลเบื้องต้นที่ถูกต้องคือข้อใด?",
      "en": "Nosebleed occurs 👃. What is the correct immediate first-aid step?",
      "zh": "流鼻血 👃 时，正确的初步急救应急止血姿势是哪一项？"
    },
    "illustration": "👃 🩸 👃",
    "illustrationSubtitle": {
      "th": "การปฐมพยาบาลเลือดกำเดาไหล",
      "en": "Nosebleed first aid",
      "zh": "流鼻血正确急救"
    },
    "options": [
      {
        "id": "opt-k3-ps-e3-1",
        "label": {
          "th": "เอาเศษกระดาษสกปรกยัดเข้าไปในรูจมูกลึกๆ",
          "en": "Stuff dirty tissue deep into nose",
          "zh": "找脏纸巾用力塞进鼻孔最深处"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-ps-e3-2",
        "label": {
          "th": "แหงนหน้าขึ้นฟ้าตรงๆ เพื่อให้เลือดไหลลงคอ",
          "en": "Tilt head way back so blood flows down throat",
          "zh": "仰起头冲着天花板，让血咽进食道胃里"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-ps-e3-3",
        "label": {
          "th": "นั่งก้มหน้าลงเล็กน้อย แล้วใช้มือบีบปีกจมูกเบาๆ 5-10 นาที หายใจทางปาก",
          "en": "Sit leaning slightly forward, pinch nostrils 5-10 mins, breathe via mouth",
          "zh": "身体微微前倾低头，用手指轻轻捏住鼻翼5-10分钟，用嘴呼吸"
        },
        "icon": "✅"
      }
    ],
    "correctOptionId": "opt-k3-ps-e3-3",
    "explanation": {
      "th": "ก้มหน้าเล็กน้อยและบีบปีกจมูก ห้ามแหงนหน้าเพราะเลือดจะสำลักลงปอด เก่งมากครับ!",
      "en": "Correct! Lean forward and pinch nostrils; do not tilt back.",
      "zh": "答对了！微微低头前倾捏住鼻翼止血，切忌仰头。"
    }
  },
  {
    "id": "k3-ps-e4",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "หมายเลขโทรศัพท์ฉุกเฉินสำหรับ \"แจ้งเหตุดับเพลิง ไฟไหม้\" ของประเทศไทย คือเบอร์ใด? 🚒",
      "en": "Thailand emergency hotline for reporting fires (Firefighters)? 🚒",
      "zh": "泰国报警与消防急救常识：发生火灾拨打的火警消防电话是哪一个？🚒"
    },
    "illustration": "🚒 📞 🚒",
    "illustrationSubtitle": {
      "th": "เบอร์โทรฉุกเฉินดับเพลิง 199",
      "en": "Fire emergency hotline 199",
      "zh": "泰国火警电话 199"
    },
    "options": [
      {
        "id": "opt-k3-ps-e4-1",
        "label": {
          "th": "199 (ดับเพลิงและกู้ภัย)",
          "en": "199 (Fire & Rescue)",
          "zh": "199（消防与紧急救援）🚒"
        },
        "icon": "🚒"
      },
      {
        "id": "opt-k3-ps-e4-2",
        "label": {
          "th": "1111",
          "en": "1111",
          "zh": "1111"
        },
        "icon": "📞"
      },
      {
        "id": "opt-k3-ps-e4-3",
        "label": {
          "th": "1234",
          "en": "1234",
          "zh": "1234"
        },
        "icon": "📞"
      }
    ],
    "correctOptionId": "opt-k3-ps-e4-1",
    "explanation": {
      "th": "199 คือสายด่วนดับเพลิงและกู้ภัยทั่วไทย เก่งมากครับ!",
      "en": "Right! 199 is the Thailand Fire Emergency hotline.",
      "zh": "答对啦！泰国火警电话是 199。"
    }
  },
  {
    "id": "k3-ps-e5",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เมื่อมีเพื่อนเกิดอาการ \"สำลักอาหารอย่างรุนแรงจนพูดไม่ได้\" 🗣️ ควรทำอย่างไรทันที?",
      "en": "Friend is choking severely on food and cannot breathe/speak 🗣️. What to do immediately?",
      "zh": "同学吃东西严重被食物噎住气管，无法说话和呼吸 🗣️，应立刻怎么做？"
    },
    "illustration": "🗣️ 🆘 🗣️",
    "illustrationSubtitle": {
      "th": "การช่วยเหลือคนสำลักอาหาร",
      "en": "Choking emergency assistance",
      "zh": "气道异物梗阻急救求助"
    },
    "options": [
      {
        "id": "opt-k3-ps-e5-1",
        "label": {
          "th": "ตบหัวเพื่อนแรงๆ ให้ตื่น",
          "en": "Slap their head",
          "zh": "用力猛拍他的脑门"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k3-ps-e5-2",
        "label": {
          "th": "รีบส่งเสียงตะโกนเรียกคุณครูหรือผู้ใหญ่ที่มีความรู้มาช่วยทำ Heimlich ทันที",
          "en": "Immediately call teacher/adult trained in Heimlich",
          "zh": "立刻大声呼喊老师或校医过来实施海姆立克急救法"
        },
        "icon": "🙋"
      },
      {
        "id": "opt-k3-ps-e5-3",
        "label": {
          "th": "ยัดน้ำตามเข้าไปเยอะๆ",
          "en": "Force drink water",
          "zh": "强行把大杯水灌进喉咙里"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-ps-e5-2",
    "explanation": {
      "th": "เรียกผู้ใหญ่ทันทีเพื่อให้การช่วยเหลืออย่างถูกวิธีและปลอดภัย เก่งมากครับ!",
      "en": "Awesome! Alert teachers/adults immediately for choking relief.",
      "zh": "太棒了！立刻呼叫专业老师急救，抢抓黄金时间。"
    }
  },
  {
    "id": "k3-ps-e6",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "ถังขยะ \"สีเหลือง\" 🟡 มีไว้สำหรับทิ้งขยะประเภทใด?",
      "en": "Standard YELLOW trash bin 🟡: What items should be discarded here?",
      "zh": "标准分类垃圾桶中的“黄色垃圾桶” 🟡，专门用来投放什么垃圾？"
    },
    "illustration": "🟡 ♻️ 🟡",
    "illustrationSubtitle": {
      "th": "ถังขยะรีไซเคิลสีเหลือง",
      "en": "Recycle bin: Yellow",
      "zh": "黄色可回收垃圾桶"
    },
    "options": [
      {
        "id": "opt-k3-ps-e6-1",
        "label": {
          "th": "ถ่านไฟฉายเก่า",
          "en": "Old batteries",
          "zh": "废弃旧电池"
        },
        "icon": "🔋"
      },
      {
        "id": "opt-k3-ps-e6-2",
        "label": {
          "th": "ซากปลาทูเน่า",
          "en": "Rotten fish",
          "zh": "腐烂鱼骨头"
        },
        "icon": "🐟"
      },
      {
        "id": "opt-k3-ps-e6-3",
        "label": {
          "th": "ขยะรีไซเคิล เช่น กระดาษ ขวดพลาสติก โลหะ แก้ว",
          "en": "Recyclables: Paper, plastic, metal, glass",
          "zh": "可回收垃圾（废纸箱、塑料瓶、金属易拉罐、玻璃瓶）♻️"
        },
        "icon": "♻️"
      }
    ],
    "correctOptionId": "opt-k3-ps-e6-3",
    "explanation": {
      "th": "ถังขยะสีเหลืองคือขยะรีไซเคิล นำไปขายและแปรรูปได้ เก่งมากครับ!",
      "en": "Correct! Yellow bins collect recyclables.",
      "zh": "答对啦！黄色垃圾桶收集可回收物品。"
    }
  },
  {
    "id": "k3-ps-e7",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เมื่อเดินผ่านสุนัขที่ไม่คุ้นเคยและสุนัขกำลังส่งเสียงขู่ 🐕 ข้อควรปฏิบัติคือข้อใด?",
      "en": "Unfamiliar dog is growling at you 🐕. What is the safest reaction?",
      "zh": "在路上遇到陌生凶猛的恶犬对你低吼 🐕，最安全的避险做法是哪一项？"
    },
    "illustration": "🐕 🛑 🐕",
    "illustrationSubtitle": {
      "th": "การปฏิบัติตนเมื่อเจอสุนัขดุ",
      "en": "Dog safety: Stand calm",
      "zh": "遇到恶犬安全防范"
    },
    "options": [
      {
        "id": "opt-k3-ps-e7-1",
        "label": {
          "th": "ยืนนิ่งๆ ไม่สบตาโดยตรง ไม่วิ่งหนี และค่อยๆ ถอยห่างอย่างช้าๆ",
          "en": "Stand still, don't make direct eye contact, don't run, back away slowly",
          "zh": "保持冷静站稳，不与狗对视，绝不转身狂奔，慢慢倒退离开"
        },
        "icon": "🛑"
      },
      {
        "id": "opt-k3-ps-e7-2",
        "label": {
          "th": "ส่งเสียงกรี๊ดแล้ววิ่งหนีสุดชีวิต",
          "en": "Scream & sprint away",
          "zh": "尖叫着转身撒腿就跑"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k3-ps-e7-3",
        "label": {
          "th": "เอาก้อนหินปาใส่สุนัข",
          "en": "Throw rocks at it",
          "zh": "捡起大石头用力砸向恶犬挑衅"
        },
        "icon": "🪨"
      }
    ],
    "correctOptionId": "opt-k3-ps-e7-1",
    "explanation": {
      "th": "การวิ่งหนีจะกระตุ้นให้สุนัขวิ่งไล่กัด ควรยืนนิ่งๆ และถอยช้าๆ เก่งมากครับ!",
      "en": "Spot on! Running triggers chase instincts; stay calm.",
      "zh": "太棒了！不要狂跑挑衅，冷静缓慢后撤。"
    }
  },
  {
    "id": "k3-ps-e8",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เมื่ออยู่ในสถานที่ที่มีควันพิษหรือฝุ่น PM 2.5 หนาแน่น 🌫️ ควรป้องกันตนเองอย่างไร?",
      "en": "In heavy smoke or severe PM 2.5 air pollution 🌫️, how to protect yourself?",
      "zh": "当身处重度雾霾或 PM 2.5 空气污染严重 🌫️ 的环境中，应怎样防护？"
    },
    "illustration": "🌫️ 😷 🌫️",
    "illustrationSubtitle": {
      "th": "การป้องกันฝุ่น PM 2.5",
      "en": "Air pollution protection: Mask",
      "zh": "雾霾防范：佩戴口罩"
    },
    "options": [
      {
        "id": "opt-k3-ps-e8-1",
        "label": {
          "th": "อ้าปากสูดหายใจลึกๆ นอกบ้าน",
          "en": "Breathe deeply outside",
          "zh": "大口喘粗气畅快呼吸室外雾霾"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-ps-e8-2",
        "label": {
          "th": "สวมหน้ากากอนามัยป้องกันฝุ่น (เช่น N95 หรือหน้ากากที่แนบสนิท) และหลีกเลี่ยงกิจกรรมกลางแจ้ง",
          "en": "Wear certified particle mask (N95) and avoid outdoor activities",
          "zh": "佩戴贴合严密的防尘口罩（如N95），尽量留在室内避免剧烈户外运动"
        },
        "icon": "😷"
      },
      {
        "id": "opt-k3-ps-e8-3",
        "label": {
          "th": "ถอดเสื้อผ้าวิ่งเล่นกลางแจ้ง",
          "en": "Run naked outdoors",
          "zh": "光着膀子在浓霾里跑马拉松"
        },
        "icon": "🏃"
      }
    ],
    "correctOptionId": "opt-k3-ps-e8-2",
    "explanation": {
      "th": "สวมหน้ากากอนามัยช่วยกรองฝุ่นจิ๋วไม่ให้เข้าสู่ปอด เก่งมากครับ!",
      "en": "Right! Masks filter fine dust from entering your lungs.",
      "zh": "答对了！戴好口罩，减少室外暴露。"
    }
  },
  {
    "id": "k3-ps-e9",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เมื่อพบเห็นสายไฟฟ้าขาดตกลงมาพาดอยู่บนพื้นดิน ⚡ สิ่งที่ต้องทำคือข้อใด?",
      "en": "You see a broken power cable lying on the wet ground ⚡. What must you do?",
      "zh": "看到高压电线断裂掉落在潮湿地面上 ⚡，必须怎样做？"
    },
    "illustration": "⚡ ⚠️ ⚡",
    "illustrationSubtitle": {
      "th": "อันตรายจากสายไฟแรงสูงขาด",
      "en": "Downed power line danger",
      "zh": "断裂高压电线防触电"
    },
    "options": [
      {
        "id": "opt-k3-ps-e9-1",
        "label": {
          "th": "เอาน้ำไปราดใส่สายไฟ",
          "en": "Pour water on it",
          "zh": "端一盆水浇在断电线上"
        },
        "icon": "💦"
      },
      {
        "id": "opt-k3-ps-e9-2",
        "label": {
          "th": "เดินไปหยิบสายไฟมาม้วนเล่น",
          "en": "Pick up and coil wire",
          "zh": "走过去把电线捡起来当跳绳玩"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-ps-e9-3",
        "label": {
          "th": "อยู่ห่างๆ อย่างน้อย 8-10 เมตร ห้ามเข้าใกล้เด็ดขาด และรีบแจ้งผู้ใหญ่",
          "en": "Stay at least 8-10 meters away, never touch, alert adults",
          "zh": "远离至少8-10米，严禁靠近触碰，立刻报告大人通知电力局"
        },
        "icon": "⚠️"
      }
    ],
    "correctOptionId": "opt-k3-ps-e9-3",
    "explanation": {
      "th": "สายไฟขาดอาจมีกระแสไฟฟ้ารั่วถึงดิน อันตรายถึงชีวิต ห้ามเข้าใกล้ เก่งมากครับ!",
      "en": "Correct! Keep far away from downed power lines.",
      "zh": "答对啦！远离断线并立刻报警。"
    }
  },
  {
    "id": "k3-ps-e10",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เมื่อใช้งานเครื่องคอมพิวเตอร์หรือแท็บเล็ตติดต่อกันนาน 30 นาที 💻 ข้อควรปฏิบัติคือข้อใด?",
      "en": "Using tablet/computer for 30 minutes 💻. What healthy habit should you do?",
      "zh": "连续使用平板电脑或电脑屏幕学习 30 分钟 💻 后，健康的护眼护身习惯是？"
    },
    "illustration": "💻 👀 🌳",
    "illustrationSubtitle": {
      "th": "การพักสายตาและป้องกันสายตาสั้น",
      "en": "Screen time break: Rest eyes",
      "zh": "科学用眼：休息远眺"
    },
    "options": [
      {
        "id": "opt-k3-ps-e10-1",
        "label": {
          "th": "พักสายตามองออกไปที่ต้นไม้สีเขียวไกลๆ 20 วินาที และลุกยืดเส้นยืดสาย",
          "en": "Rest eyes looking at distant green trees for 20s and stretch",
          "zh": "让眼睛休息，远眺 6 米外的绿色景物 20 秒，并站起舒展筋骨"
        },
        "icon": "🌳"
      },
      {
        "id": "opt-k3-ps-e10-2",
        "label": {
          "th": "เล่นเกมส์ต่อไปอีก 5 ชั่วโมงไม่กระพริบตา",
          "en": "Play 5 more hours without blinking",
          "zh": "继续拼命狂打游戏 5 小时不眨眼"
        },
        "icon": "🎮"
      },
      {
        "id": "opt-k3-ps-e10-3",
        "label": {
          "th": "เอาจอแนบติดกับลูกตา",
          "en": "Hold screen closer to eyes",
          "zh": "把屏幕贴在眼皮上死死盯着看"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-ps-e10-1",
    "explanation": {
      "th": "กฎ 20-20-20 ช่วยพักกล้ามเนื้อตา ป้องกันสายตาสั้น เก่งมากครับ!",
      "en": "Awesome! Taking eye breaks preserves good eyesight.",
      "zh": "太棒了！劳逸结合，远眺绿植保护视力。"
    }
  },
  {
    "id": "k3-ps-m1",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "ลำดับขั้นตอนการปลูกต้นทานตะวัน: (1) รดน้ำดูแล (2) เพาะเมล็ดลงดิน (3) ดอกทานตะวันบาน 🌻 ลำดับที่ถูกต้องคือข้อใด?",
      "en": "Sunflower planting steps: (1) Water & care (2) Plant seed (3) Blooms 🌻. Correct order?",
      "zh": "向日葵种植 3 步顺序：(1) 浇水照料 (2) 播种入土 (3) 盛开花朵 🌻。正确生长顺序是？"
    },
    "illustration": "🌱 🌻 🌱",
    "illustrationSubtitle": {
      "th": "ลำดับการเจริญเติบโตของพืช",
      "en": "Plant growth sequence",
      "zh": "植物生长顺序"
    },
    "options": [
      {
        "id": "opt-k3-ps-m1-1",
        "label": {
          "th": "ดอกบาน -> เพาะเมล็ด -> รดน้ำ",
          "en": "Bloom -> Seed -> Water",
          "zh": "盛开花朵 -> 播种入土 -> 浇水照料"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-ps-m1-2",
        "label": {
          "th": "เพาะเมล็ดลงดิน -> รดน้ำดูแล -> ดอกบานสวยงาม",
          "en": "Plant seed -> Water & care -> Flower blooms",
          "zh": "播种入土 -> 浇水照料 -> 盛开花朵"
        },
        "icon": "🌻"
      },
      {
        "id": "opt-k3-ps-m1-3",
        "label": {
          "th": "รดน้ำ -> ดอกบาน -> เพาะเมล็ด",
          "en": "Water -> Bloom -> Seed",
          "zh": "浇水照料 -> 盛开花朵 -> 播种入土"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-ps-m1-2",
    "explanation": {
      "th": "เพาะเมล็ด รดน้ำจนงอก และออกดอกบานสะพรั่ง เก่งมากครับ!",
      "en": "Correct! Seed, nurture, then bloom.",
      "zh": "答对了！先播种，悉心浇水照料，最后开出灿烂花朵。"
    }
  },
  {
    "id": "k3-ps-m2",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "เมื่อต้องทำงานศิลปะกลุ่มร่วมกันกับเพื่อน 4 คน 🎨 เพื่อให้งานเสร็จทันเวลาและสวยงาม ควรทำอย่างไร?",
      "en": "Group art project with 4 friends 🎨. To finish on time beautifully, what should you do?",
      "zh": "4 位小朋友合作完成一幅大型美术壁画 🎨，为了按时高质量完成，应该怎么做？"
    },
    "illustration": "🎨 🤝 🎨",
    "illustrationSubtitle": {
      "th": "การทำงานเป็นทีมและการแบ่งหน้าที่",
      "en": "Teamwork & task delegation",
      "zh": "团队合作与任务分工"
    },
    "options": [
      {
        "id": "opt-k3-ps-m2-1",
        "label": {
          "th": "นั่งทะเลาะกันจนหมดเวลา",
          "en": "Argue until time runs out",
          "zh": "为了谁当组长一直吵架到下课"
        },
        "icon": "😡"
      },
      {
        "id": "opt-k3-ps-m2-2",
        "label": {
          "th": "แย่งกระดาษแผ่นเดียวมาทำคนเดียว",
          "en": "Hog whole paper",
          "zh": "把唯一的大画纸抢走，只准自己一个人画"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-ps-m2-3",
        "label": {
          "th": "ร่วมกันวางแผน แบ่งหน้าที่ตามความถนัด เช่น คนหนึ่งวาดโครง คนหนึ่งลงสี",
          "en": "Plan together, divide tasks (e.g. one sketches, one colors)",
          "zh": "大家一起商量分工，有的画草图，有的涂色，互相紧密配合"
        },
        "icon": "🤝"
      }
    ],
    "correctOptionId": "opt-k3-ps-m2-3",
    "explanation": {
      "th": "การแบ่งงานและช่วยเหลือกันทำให้งานสำเร็จด้วยดี เก่งมากครับ!",
      "en": "Awesome! Division of labor and teamwork brings success.",
      "zh": "太棒了！团队协作，明确分工效率最高。"
    }
  },
  {
    "id": "k3-ps-m3",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "ถ้าเปิดตู้เก็บของเล่นแล้วพบว่า \"ไม่มีอุปกรณ์ลูกบอล\" แต่ทุกคนอยากเล่นเกมโยนรับ 🎾 หนูจะแก้ปัญหาด้วยความคิดสร้างสรรค์อย่างไร?",
      "en": "No ball in toy cupboard, but everyone wants to play catch 🎾. Creative solution?",
      "zh": "柜子里没有球，但大家特别想玩抛接球游戏 🎾，你会如何富有创造力地解决？"
    },
    "illustration": "🎾 💡 🎾",
    "illustrationSubtitle": {
      "th": "การแก้ปัญหาอย่างยืดหยุ่น",
      "en": "Creative problem solving: DIY ball",
      "zh": "就地取材创造性解决问题"
    },
    "options": [
      {
        "id": "opt-k3-ps-m3-1",
        "label": {
          "th": "นำเศษกระดาษใช้แล้วมาขยำเป็นก้อนกลม พันด้วยเทปใสให้แน่นเป็นลูกบอลทดแทน",
          "en": "Crumple scrap paper into a ball and wrap with tape to play catch",
          "zh": "把废纸揉成紧实的圆球，用透明胶带缠紧做成环保纸球玩 🎾"
        },
        "icon": "🎾"
      },
      {
        "id": "opt-k3-ps-m3-2",
        "label": {
          "th": "นั่งร้องไห้ทุบพื้น",
          "en": "Cry and throw tantrum",
          "zh": "坐在地上打滚大哭大闹"
        },
        "icon": "😭"
      },
      {
        "id": "opt-k3-ps-m3-3",
        "label": {
          "th": "วิ่งไปแย่งลูกบอลของห้องอื่น",
          "en": "Steal other class's ball",
          "zh": "跑到隔壁班级强行偷抢皮球"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-ps-m3-1",
    "explanation": {
      "th": "ประดิษฐ์ลูกบอลกระดาษขึ้นมาเล่นแทน เป็นการแก้ปัญหาที่ฉลาดมากครับ!",
      "en": "Right! Making a paper ball shows wonderful creativity.",
      "zh": "答对啦！用废纸团做成环保小球，既聪明又好玩。"
    }
  },
  {
    "id": "k3-ps-m4",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "เมื่อมีเพื่อนในห้องไม่ยอมทำตามกฎกติกาการเล่นเกม 🎲 เช่น พยายามโกงทอยลูกเต๋า ควรแก้ปัญหาอย่างไร?",
      "en": "A player tries to cheat the dice roll 🎲 in a board game. Best way to solve?",
      "zh": "玩飞行棋桌面游戏时，有小伙伴不遵守规则，偷偷作弊挪动骰子点数 🎲，应该如何解决？"
    },
    "illustration": "🎲 ⚖️ 🎲",
    "illustrationSubtitle": {
      "th": "การรักษากฎกติกาและการตักเตือนด้วยเหตุผล",
      "en": "Fair play rule enforcement",
      "zh": "遵守公平竞争规则"
    },
    "options": [
      {
        "id": "opt-k3-ps-m4-1",
        "label": {
          "th": "ต่อยหน้าเพื่อนแล้วล้มกระดานเกมทิ้ง",
          "en": "Punch them & flip board",
          "zh": "挥拳打人并把棋盘砸烂掀翻"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k3-ps-m4-2",
        "label": {
          "th": "เตือนเพื่อนด้วยคำพูดสุภาพถึงกฎกติกาความซื่อสัตย์ เพื่อให้เล่นสนุกร่วมกันได้อย่างยุติธรรม",
          "en": "Politely remind them of fair-play rules so everyone enjoys honestly",
          "zh": "态度温和坚定地提醒规则：“游戏要讲诚信，遵守规则才真正好玩”"
        },
        "icon": "⚖️"
      },
      {
        "id": "opt-k3-ps-m4-3",
        "label": {
          "th": "ทำโกงตามเพื่อนบ้าง",
          "en": "Cheat even more",
          "zh": "自己跟着也作弊耍赖乱改点数"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-ps-m4-2",
    "explanation": {
      "th": "ชี้แจงกติกาด้วยความสุภาพ เพื่อความยุติธรรมและมิตรภาพ เก่งมากครับ!",
      "en": "Spot on! Calmly reminding friends about fair rules preserves games.",
      "zh": "太棒了！以理服人，温和提醒公平比赛规则。"
    }
  },
  {
    "id": "k3-ps-m5",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "เมื่อสังเกตเห็นก๊อกน้ำในโรงเรียน \"ปิดไม่สนิท มีน้ำหยดติ๋งๆ ตลอดเวลา\" 💧 หนูควรทำอย่างไร?",
      "en": "School water tap is dripping continuously 💧. What should you do?",
      "zh": "发现学校花园里的水龙头没有关紧，正不停地往下滴水 💧，你应该怎么做？"
    },
    "illustration": "💧 🚰 💧",
    "illustrationSubtitle": {
      "th": "การช่วยดูแลรักษาสมบัติส่วนรวม",
      "en": "Care for public utilities",
      "zh": "保护校园公共水资源"
    },
    "options": [
      {
        "id": "opt-k3-ps-m5-1",
        "label": {
          "th": "ทำเป็นมองไม่เห็นเพราะไม่ใช่เรื่องของตนเอง",
          "en": "Ignore completely",
          "zh": "假装完全没看见，反正不是自己家里的水"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-ps-m5-2",
        "label": {
          "th": "เปิดก๊อกน้ำให้พุ่งแรงสุดแล้ววิ่งหนี",
          "en": "Open it fully & run",
          "zh": "故意把水阀拧到最大喷水，然后大笑着跑掉"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k3-ps-m5-3",
        "label": {
          "th": "ลองช่วยหมุนปิดให้แน่นสนิท ถ้าก๊อกชำรุดให้รีบแจ้งคุณครูหรือภารโรงให้มาซ่อมแซม",
          "en": "Try to turn it off tightly; if broken, report to teacher/janitor",
          "zh": "主动上前轻轻拧紧；如果坏了漏水，立刻报告老师或后勤师傅修理"
        },
        "icon": "🚰"
      }
    ],
    "correctOptionId": "opt-k3-ps-m5-3",
    "explanation": {
      "th": "ช่วยปิดหรือแจ้งผู้ใหญ่ซ่อมแซม แสดงถึงความเป็นพลเมืองที่มีจิตสาธารณะ เก่งมากครับ!",
      "en": "Correct! Turn it off or report leaks to save water.",
      "zh": "答对啦！随手关紧或主动报修，节约每一滴水。"
    }
  },
  {
    "id": "k3-ps-m6",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "ถ้าหนูต้องเดินทางไปทัศนศึกษาต่างจังหวัดกับโรงเรียน 🚌 สิ่งที่ควรเตรียมใส่กระเป๋าไปคือข้อใด?",
      "en": "Going on a school field trip 🚌. What essential items should you pack?",
      "zh": "准备参加学校组织的户外研学春游 🚌，书包里最应该准备哪些必需品？"
    },
    "illustration": "🎒 🧢 💧",
    "illustrationSubtitle": {
      "th": "การจัดเตรียมสัมภาระสำหรับกิจกรรมนอกสถานที่",
      "en": "Field trip packing",
      "zh": "研学旅行出行准备"
    },
    "options": [
      {
        "id": "opt-k3-ps-m6-1",
        "label": {
          "th": "กระติกน้ำดื่มประจำตัว หมวกกันแดด ยาประจำตัว และทิชชูสะอาด",
          "en": "Personal water bottle, sun cap, personal medicine, clean tissues",
          "zh": "自己的水壶、遮阳帽、常备常用药、纸巾和备用口罩 🧢"
        },
        "icon": "🎒"
      },
      {
        "id": "opt-k3-ps-m6-2",
        "label": {
          "th": "ของเล่นชิ้นใหญ่หนักๆ 10 ชิ้น",
          "en": "10 heavy toys",
          "zh": "10个沉甸甸的大型玩具"
        },
        "icon": "🧸"
      },
      {
        "id": "opt-k3-ps-m6-3",
        "label": {
          "th": "เครื่องเล่นเกมส์เปิดเสียงดัง",
          "en": "Loud gaming console",
          "zh": "插电的大型游戏机"
        },
        "icon": "🎮"
      }
    ],
    "correctOptionId": "opt-k3-ps-m6-1",
    "explanation": {
      "th": "เตรียมสิ่งของจำเป็นเพื่อสุขภาพและความปลอดภัยตลอดการเดินทาง เก่งมากครับ!",
      "en": "Right! Water, cap, and medicine are essentials.",
      "zh": "答对了！水壶、遮阳帽和卫生防护用品最实用。"
    }
  },
  {
    "id": "k3-ps-m7",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "เมื่อห้องเรียนมี \"ขยะล้นเกลื่อนกลาดหลังทำกิจกรรม\" 🧹 สมาชิกในห้องควรแก้ปัญหาอย่างไร?",
      "en": "Classroom is messy with scraps after activity 🧹. What should everyone do?",
      "zh": "手工课结束后，教室地面和桌子上堆满了碎纸等垃圾 🧹，大家应该？"
    },
    "illustration": "🧹 🗑️ 🧹",
    "illustrationSubtitle": {
      "th": "ความร่วมมือทำความสะอาดห้องเรียน",
      "en": "Clean up classroom together",
      "zh": "集体合作清扫整理"
    },
    "options": [
      {
        "id": "opt-k3-ps-m7-1",
        "label": {
          "th": "เกี่ยงกันว่าไม่ใช่ขยะของฉัน แล้วเดินหนีกลับบ้าน",
          "en": "Blame each other & leave",
          "zh": "互相推卸责任说“这不是我丢的”，甩手走人"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k3-ps-m7-2",
        "label": {
          "th": "ทุกคนร่วมมือกัน คนละไม้คนละมือ กวาดและเก็บขยะลงถังให้ห้องสะอาดเอี่ยม",
          "en": "Everyone works together, each helping sweep and clean into bins",
          "zh": "所有人团结合作，你扫地、我捡纸屑，齐心协力恢复整洁"
        },
        "icon": "🧹"
      },
      {
        "id": "opt-k3-ps-m7-3",
        "label": {
          "th": "เตะขยะไปซ่อนไว้ใต้โต๊ะครู",
          "en": "Kick trash under desk",
          "zh": "把垃圾全都踢进讲台桌子底下藏起来"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-ps-m7-2",
    "explanation": {
      "th": "ร่วมมือร่วมใจกัน ห้องเรียนจะสะอาดเรียบร้อยรวดเร็ว เก่งมากครับ!",
      "en": "Awesome! Teamwork makes cleaning quick and easy.",
      "zh": "太棒了！齐心协力，教室瞬间焕然一新。"
    }
  },
  {
    "id": "k3-ps-m8",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "ถ้าเพื่อนหยิบของใช้ของหนูไปโดยไม่ได้ขออนุญาตก่อน ✏️ วิธีแก้ปัญหาที่ดีที่สุดคือข้อใด?",
      "en": "A classmate took your pencil without asking ✏️. Best solution?",
      "zh": "同学未经你同意，随手拿走了你的彩色铅笔 ✏️，最成熟有效的解决方式是？"
    },
    "illustration": "✏️ 🗣️ ✏️",
    "illustrationSubtitle": {
      "th": "การสื่อสารด้วยเหตุผล",
      "en": "Assertive polite communication",
      "zh": "摆事实讲道理礼貌沟通"
    },
    "options": [
      {
        "id": "opt-k3-ps-m8-1",
        "label": {
          "th": "แอบไปขโมยของเพื่อนคืนมาชิ้นใหญ่กว่า",
          "en": "Steal their things secretly",
          "zh": "暗中偷走对方更贵重的东西报仇"
        },
        "icon": "🥷"
      },
      {
        "id": "opt-k3-ps-m8-2",
        "label": {
          "th": "แย่งคืนมาแล้วด่าทอเสียงดัง",
          "en": "Snatch back & yell insults",
          "zh": "一把夺过来，破口大骂污言秽语"
        },
        "icon": "😡"
      },
      {
        "id": "opt-k3-ps-m8-3",
        "label": {
          "th": "พูดคุยบอกเพื่อนอย่างสุภาพว่า \"นี่เป็นของฉันนะ คราวหน้าจะยืมให้บอกขออนุญาตก่อนนะ\"",
          "en": "Politely say: \"This is mine, please ask before borrowing next time\"",
          "zh": "心平气和地对他说：“这是我的铅笔，下次想用请先问我一声同意好吗”"
        },
        "icon": "🗣️"
      }
    ],
    "correctOptionId": "opt-k3-ps-m8-3",
    "explanation": {
      "th": "สื่อสารอย่างสร้างสรรค์และมีเหตุผล ช่วยให้เข้าใจกันโดยไม่ทะเลาะ เก่งมากครับ!",
      "en": "Spot on! Calm assertive communication resolves issues peacefully.",
      "zh": "太棒了！摆事实讲道理，既守住边界又维护友谊。"
    }
  },
  {
    "id": "k3-ps-m9",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "เมื่อต้องเลือกอาหารรับประทานในมื้อกลางวัน 🍱 เมนูใดมีคุณค่าทางโภชนาการครบ 5 หมู่ที่สุด?",
      "en": "Choosing lunch 🍱: Which meal provides complete 5 food groups nutrition?",
      "zh": "在学校食堂自选午餐 🍱 时，哪一套营养搭配最均衡、涵盖五大营养素？"
    },
    "illustration": "🍱 🥗 🍲",
    "illustrationSubtitle": {
      "th": "อาหารหลัก 5 หมู่ที่มีประโยชน์",
      "en": "Balanced 5 food groups meal",
      "zh": "健康五大类均衡营养膳食"
    },
    "options": [
      {
        "id": "opt-k3-ps-m9-1",
        "label": {
          "th": "ข้าวสวย ต้มจืดเต้าหู้หมูสับ ผัดผักรวมมิตร และผลไม้สดส้มโอ 🍊",
          "en": "Rice, minced pork tofu soup, mixed stir-fry veggies, fresh fruit",
          "zh": "白米饭、豆腐肉沫清汤、清炒时蔬、新鲜水果拼盘 🍊"
        },
        "icon": "🍱"
      },
      {
        "id": "opt-k3-ps-m9-2",
        "label": {
          "th": "ขนมกรุบกรอบรสเค็มจัด 3 ซอง กับน้ำอัดลม 🥤",
          "en": "3 bags of salty chips & soda",
          "zh": "3大包高油高盐薯片膨化食品加冰可乐 🥤"
        },
        "icon": "🍟"
      },
      {
        "id": "opt-k3-ps-m9-3",
        "label": {
          "th": "อมลูกกวาดหวานสีรุ้ง 10 เม็ด",
          "en": "10 rainbow candies",
          "zh": "吃 10 颗五颜六色的高糖硬糖果充饥"
        },
        "icon": "🍬"
      }
    ],
    "correctOptionId": "opt-k3-ps-m9-1",
    "explanation": {
      "th": "รับประทานอาหารครบ 5 หมู่ ร่างกายจะเจริญเติบโต แข็งแรง และสมองปลอดโปร่ง เก่งมากครับ!",
      "en": "Correct! A balanced meal with veggies, proteins, and fruits is best.",
      "zh": "答对了！荤素搭配、有菜有果最健康。"
    }
  },
  {
    "id": "k3-ps-m10",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "ถ้ารองเท้าผ้าใบของหนูเปียกน้ำฝนจนชื้นแฉะ 👟 วิธีดูแลรองเท้าที่ถูกต้องคือข้อใด?",
      "en": "Sneakers got soaked in rain 👟. How should you dry and care for them?",
      "zh": "运动帆布鞋在雨天被雨水浸湿湿透了 👟，正确的打理烘干保养办法是？"
    },
    "illustration": "👟 ☀️ 👟",
    "illustrationSubtitle": {
      "th": "การดูแลรักษารองเท้าเปียกชื้น",
      "en": "Drying wet shoes properly",
      "zh": "正确打理雨水浸湿的鞋子"
    },
    "options": [
      {
        "id": "opt-k3-ps-m10-1",
        "label": {
          "th": "เอาไปใส่ในเตาไมโครเวฟเพื่ออบให้แห้งเร็วๆ",
          "en": "Put in microwave oven",
          "zh": "直接放进微波炉里高火加热烘烤"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k3-ps-m10-2",
        "label": {
          "th": "ถอดซักล้างให้สะอาด ยัดกระดาษหนังสือพิมพ์ดูดความชื้น แล้วนำไปผึ่งลมในที่ร่มมีแดดรำไร",
          "en": "Wash clean, stuff with paper to absorb dampness, dry in airy shaded spot",
          "zh": "清洗干净后塞入废报纸吸湿定型，放在通风阴凉处晾干 👟"
        },
        "icon": "👟"
      },
      {
        "id": "opt-k3-ps-m10-3",
        "label": {
          "th": "ใส่ทั้งที่เปียกชื้นต่อไปทั้งวันจนเท้าเหม็นอับชื้น",
          "en": "Wear wet all day",
          "zh": "继续整天捂着穿湿鞋，任由双脚发白发臭"
        },
        "icon": "🦨"
      }
    ],
    "correctOptionId": "opt-k3-ps-m10-2",
    "explanation": {
      "th": "ผึ่งลมและซับความชื้น ช่วยป้องกันเชื้อราและรองเท้าไม่เสียรูป เก่งมากครับ!",
      "en": "Awesome! Stuffing paper and air-drying preserves shoes safely.",
      "zh": "太棒了！塞纸吸湿、通风晾干，避免发霉滋生细菌。"
    }
  },
  {
    "id": "k3-ps-h1",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "ปัญหาเชิงตรรกะ: ถ้าเพื่อนบอกว่า \"สิ่งมีชีวิตทุกชนิดต้องใช้น้ำในการดำรงชีวิต\" 💧 ข้อใดเป็นหลักฐานยืนยันความจริงนี้?",
      "en": "Logic proof: \"All living things need water to survive\" 💧. What proves this true?",
      "zh": "科学逻辑验证题：“所有活着的生命都需要水来维持生存” 💧。哪一项能证实这一真理？"
    },
    "illustration": "💧 🌱 🐶",
    "illustrationSubtitle": {
      "th": "ตรรกะทางวิทยาศาสตร์เรื่องสิ่งมีชีวิต",
      "en": "Logic evidence: Living things need water",
      "zh": "科学事实求证"
    },
    "options": [
      {
        "id": "opt-k3-ps-h1-1",
        "label": {
          "th": "รถยนต์เติมน้ำเปล่าแทนน้ำมันแล้ววิ่งได้",
          "en": "Cars run on water instead of fuel",
          "zh": "汽车不加油只倒纯净水就能高速行驶"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-ps-h1-2",
        "label": {
          "th": "ก้อนหินและโต๊ะไม้ชอบดื่มน้ำทุกวัน",
          "en": "Rocks & desks drink water daily",
          "zh": "石头和桌子每天都要大口喝水才能长大"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-ps-h1-3",
        "label": {
          "th": "ทั้งคน สัตว์ และต้นไม้ ถ้าขาดน้ำเป็นเวลานานจะเหี่ยวเฉาและเสียชีวิตในที่สุด",
          "en": "Humans, animals, and plants will wilt and die if deprived of water",
          "zh": "无论是人、动物还是植物，若长期断水都会枯萎死亡"
        },
        "icon": "✅"
      }
    ],
    "correctOptionId": "opt-k3-ps-h1-3",
    "explanation": {
      "th": "สิ่งมีชีวิตทั้งพืช คน และสัตว์ ล้วนต้องการน้ำในการดำรงชีวิต เก่งมากครับ!",
      "en": "Spot on! All living organisms require water for biology.",
      "zh": "答对了！人和动植物生命活动都绝对离不开水。"
    }
  },
  {
    "id": "k3-ps-h2",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "การประหยัดพลังงานในห้องเรียน: เมื่อทุกคนเดินออกจากห้องเรียนไปทานข้าว 💡 สิ่งที่ควรทำคือข้อใด?",
      "en": "Saving energy: Everyone leaves the classroom for lunch 💡. What should be done?",
      "zh": "节能环保行为：全班同学离开教室前往食堂吃午饭 💡 时，最后离开前应该？"
    },
    "illustration": "💡 🚪 🔌",
    "illustrationSubtitle": {
      "th": "การประหยัดพลังงานไฟฟ้า",
      "en": "Save electricity: Turn off lights",
      "zh": "离开教室随手关灯关风扇"
    },
    "options": [
      {
        "id": "opt-k3-ps-h2-1",
        "label": {
          "th": "ปิดสวิตช์ไฟ ปิดพัดลม และปิดเครื่องปรับอากาศก่อนออกจากห้องทุกครั้ง",
          "en": "Turn off lights, fans, and AC before leaving the room",
          "zh": "随手关闭所有照明电灯、风扇及空调电源，再锁好门窗"
        },
        "icon": "💡"
      },
      {
        "id": "opt-k3-ps-h2-2",
        "label": {
          "th": "เปิดไฟและแอร์ทิ้งไว้ให้ห้องเย็นเล่นทั้งวัน",
          "en": "Leave AC running empty",
          "zh": "全开着灯光和最高风速空调，任由空房间空转"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-ps-h2-3",
        "label": {
          "th": "เปิดหน้าต่างทิ้งไว้ตอนเปิดแอร์",
          "en": "Open windows while AC on",
          "zh": "把窗户大开着却同时开着强冷空调"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-ps-h2-1",
    "explanation": {
      "th": "ปิดไฟและแอร์เมื่อไม่ใช้งาน ช่วยประหยัดค่าไฟและลดโลกร้อน เก่งมากครับ!",
      "en": "Correct! Switching off unused appliances saves earth and energy.",
      "zh": "答对了！随手关灯关电，节约用电保护地球。"
    }
  },
  {
    "id": "k3-ps-h3",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "เมื่อต้องตัดสินใจเลือกระหว่าง \"ซื้อของเล่นพลาสติกใหม่ที่ราคาแพง\" กับ \"ออมเงินหยอดกระปุกไว้เรียนหนังสือ\" 🪙 สิ่งใดแสดงถึงความคิดรอบคอบ?",
      "en": "Deciding: Buy an expensive plastic toy vs Save coins in piggy bank for future education 🪙?",
      "zh": "消费理财与理性决策：在“买昂贵的塑料新玩具”和“把零钱存进存钱罐为上学做准备” 🪙 之间，哪种选择体现了深思熟虑？"
    },
    "illustration": "🪙 🐖 🧸",
    "illustrationSubtitle": {
      "th": "การออมเงินและการตัดสินใจทางการเงิน",
      "en": "Smart financial decision: Saving",
      "zh": "合理消费与储蓄美德"
    },
    "options": [
      {
        "id": "opt-k3-ps-h3-1",
        "label": {
          "th": "เอาเงินทั้งหมดไปซื้อขนมกินให้หมดในวันเดียว",
          "en": "Spend all on junk food in 1 day",
          "zh": "把所有的压岁钱零花钱一天之内全买零食挥霍一空"
        },
        "icon": "🍟"
      },
      {
        "id": "opt-k3-ps-h3-2",
        "label": {
          "th": "เก็บออมเงินส่วนใหญ่ไว้ เพื่อใช้ในสิ่งที่จำเป็นและมีประโยชน์ในอนาคต",
          "en": "Save most money for necessary and valuable future needs",
          "zh": "有节制地储蓄积累大部分零钱，用于未来真正重要的教育和应急"
        },
        "icon": "🪙"
      },
      {
        "id": "opt-k3-ps-h3-3",
        "label": {
          "th": "ขอยืมเงินเพื่อนมาซื้อของเล่น",
          "en": "Borrow debt from friends",
          "zh": "自己没钱就强行向同桌借钱买玩具"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-ps-h3-2",
    "explanation": {
      "th": "การรู้จักอดออมและใช้จ่ายอย่างคุ้มค่า เป็นทักษะชีวิตที่ยอดเยี่ยมมากครับ!",
      "en": "Awesome! Saving money shows wise planning and maturity.",
      "zh": "太棒了！从小懂得储蓄规划，具有长远的大智慧。"
    }
  },
  {
    "id": "k3-ps-h4",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "ถ้าเพื่อนร่วมกลุ่มสองคน \"ทะเลาะกันเรื่องใครจะได้ถือป้ายชื่อกลุ่ม\" 📋 ในฐานะเพื่อนที่ดี หนูควรช่วยแก้ปัญหาอย่างไร?",
      "en": "Two group members argue over who holds the group placard 📋. As a good friend, how to resolve it?",
      "zh": "合作小组里两位同伴为“谁来举小组代表牌” 📋 争得面红耳赤，作为小组核心，你该如何化解矛盾？"
    },
    "illustration": "📋 🤝 ⚖️",
    "illustrationSubtitle": {
      "th": "การไกล่เกลี่ยความขัดแย้งอย่างสันติ",
      "en": "Mediate conflict fairly",
      "zh": "和平协商化解分歧"
    },
    "options": [
      {
        "id": "opt-k3-ps-h4-1",
        "label": {
          "th": "ฉีกป้ายทิ้งเพื่อไม่ให้มีใครได้ถือ",
          "en": "Tear placard in half",
          "zh": "一把抢过来当场撕得粉碎，让大家都拿不成"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k3-ps-h4-2",
        "label": {
          "th": "ยุยงให้ชกต่อยกัน คนชนะได้ถือ",
          "en": "Tell them to fight physically",
          "zh": "在旁边煽风点火：“谁打赢了谁就拿，打架定胜负！”"
        },
        "icon": "🥊"
      },
      {
        "id": "opt-k3-ps-h4-3",
        "label": {
          "th": "เสนอให้ผลัดกันถือคนละครึ่งทาง หรือเป่ายิ้งฉุบเพื่อหาข้อตกลงที่ทั้งสองฝ่ายยอมรับด้วยรอยยิ้ม",
          "en": "Suggest taking turns holding it halfway, or rock-paper-scissors to agree happily",
          "zh": "建议两人一人举一半路程轮流来，或通过石头剪刀布公平决定，双方握手言和"
        },
        "icon": "🤝"
      }
    ],
    "correctOptionId": "opt-k3-ps-h4-3",
    "explanation": {
      "th": "เสนอทางเลือกที่ยุติธรรม เช่น ผลัดกันคนละครึ่งเวลา เป็นการแก้ปัญหาอย่างสันติ เก่งมากครับ!",
      "en": "Correct! Proposing turns or fair games resolves disputes nicely.",
      "zh": "答对了！协商轮流举牌，用智慧化解冲突。"
    }
  },
  {
    "id": "k3-ps-h5",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "การทดลองวิทยาศาสตร์ปฐมวัย: เมื่อเอา \"แม่เหล็ก\" 🧲 ไปดูดสิ่งของต่างๆ สิ่งใดที่แม่เหล็กจะดูดติดขึ้นมาได้?",
      "en": "Science experiment: When bringing a magnet 🧲 close, which item will it attract?",
      "zh": "科学探究实验：拿一块磁铁 🧲 靠近各种生活用品，下列哪一样能被磁铁牢牢吸住？"
    },
    "illustration": "🧲 📎 🧲",
    "illustrationSubtitle": {
      "th": "แรงดึงดูดของแม่เหล็กกับเหล็ก",
      "en": "Magnetism attracts iron clips",
      "zh": "磁铁吸引铁磁性金属"
    },
    "options": [
      {
        "id": "opt-k3-ps-h5-1",
        "label": {
          "th": "คลิปหนีบกระดาษที่ทำจากเหล็ก 📎",
          "en": "Iron paperclip 📎",
          "zh": "铁质金属回形针 📎"
        },
        "icon": "📎"
      },
      {
        "id": "opt-k3-ps-h5-2",
        "label": {
          "th": "ใบไม้สดสีเขียว",
          "en": "Fresh green leaf",
          "zh": "新鲜的绿色植物树叶"
        },
        "icon": "🍃"
      },
      {
        "id": "opt-k3-ps-h5-3",
        "label": {
          "th": "ยางลบดินสอที่ทำจากยาง",
          "en": "Rubber eraser",
          "zh": "橡胶橡皮擦"
        },
        "icon": "🧼"
      }
    ],
    "correctOptionId": "opt-k3-ps-h5-1",
    "explanation": {
      "th": "แม่เหล็กมีแรงดึงดูดสารจำพวกเหล็ก เช่น คลิปหนีบกระดาษ เก่งมากครับ!",
      "en": "Spot on! Magnets attract iron metals like paperclips.",
      "zh": "太棒了！磁铁具有磁性，能吸附铁制回形针。"
    }
  },
  {
    "id": "k3-ps-h6",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "การใช้น้ำอย่างรู้คุณค่า: เมื่อแปรงฟันในตอนเช้า 🪥 วิธีประหยัดน้ำที่ดีที่สุดคือข้อใด?",
      "en": "Saving water: When brushing your teeth in the morning 🪥, what is the best practice?",
      "zh": "珍惜水资源：早晨刷牙洗漱 🪥 时，哪一种用水方式最节水科学？"
    },
    "illustration": "🪥 🥛 🚰",
    "illustrationSubtitle": {
      "th": "การประหยัดน้ำขณะแปรงฟัน",
      "en": "Save water while brushing: Cup",
      "zh": "用杯子接水刷牙节水"
    },
    "options": [
      {
        "id": "opt-k3-ps-h6-1",
        "label": {
          "th": "เปิดก๊อกน้ำให้ไหลทิ้งลงท่อตลอดเวลาที่แปรงฟัน",
          "en": "Leave tap running full blast throughout",
          "zh": "刷牙3分钟期间，任由水龙头哗哗流向水管"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-ps-h6-2",
        "label": {
          "th": "ใช้แก้วรองน้ำไว้สำหรับบ้วนปาก และปิดก๊อกน้ำขณะกำลังแปรงฟัน",
          "en": "Use a cup to hold rinse water and turn tap off while brushing",
          "zh": "用口杯接水漱口，在刷牙时始终把水龙头随手关好 🥛"
        },
        "icon": "🥛"
      },
      {
        "id": "opt-k3-ps-h6-3",
        "label": {
          "th": "ไม่แปรงฟันเลยเพื่อประหยัดน้ำ",
          "en": "Never brush teeth",
          "zh": "索性连牙都不刷了来省水"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-ps-h6-2",
    "explanation": {
      "th": "การใช้แก้วรองน้ำช่วยประหยัดน้ำได้หลายลิตรในแต่ละครั้ง เก่งมากครับ!",
      "en": "Correct! Using a cup prevents liters of clean water from wasting.",
      "zh": "答对了！用口杯接水刷牙，节水效果显著。"
    }
  },
  {
    "id": "k3-ps-h7",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "ถ้าหนูสังเกตเห็นว่า \"เพื่อนร่วมห้องแอบหยิบเงินของเพื่อนคนอื่นไปใส่กระเป๋า\" 🪙 สิ่งที่ถูกต้องที่ควรทำคือข้อใด?",
      "en": "You see a classmate secretly taking money from another's bag 🪙. Right thing to do?",
      "zh": "亲眼目睹班上有同学趁人不备，悄悄把别人的零花钱装进自己的口袋 🪙，最正义正确的做法是？"
    },
    "illustration": "🪙 🙋 🏫",
    "illustrationSubtitle": {
      "th": "ความซื่อสัตย์สุจริตและความยุติธรรม",
      "en": "Integrity: Report theft confidentially",
      "zh": "坚守正义与诚实底线"
    },
    "options": [
      {
        "id": "opt-k3-ps-h7-1",
        "label": {
          "th": "ชวนเพื่อนคนอื่นไปรุมทำร้ายเขา",
          "en": "Mob and beat them",
          "zh": "召集其他小伙伴在放学路上围殴他"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-ps-h7-2",
        "label": {
          "th": "ขอแบ่งเงินครึ่งหนึ่งเพื่อแลกกับการไม่บอกใคร",
          "en": "Ask for half cut as bribe",
          "zh": "跑过去威胁对方分自己一半钱作为封口费"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-ps-h7-3",
        "label": {
          "th": "รีบไปบอกคุณครูประจำชั้นเป็นการส่วนตัว เพื่อให้คุณครูจัดการอย่างถูกต้องและอบรมเพื่อน",
          "en": "Privately report to teacher so they can handle it properly and guide student",
          "zh": "第一时间私下悄悄报告班主任老师，由老师出面调查教育处理"
        },
        "icon": "🙋"
      }
    ],
    "correctOptionId": "opt-k3-ps-h7-3",
    "explanation": {
      "th": "บอกคุณครูอย่างตรงไปตรงมา ช่วยปกป้องความถูกต้องและช่วยเตือนสติเพื่อน เก่งมากครับ!",
      "en": "Awesome! Privately reporting to teachers ensures justice and guidance.",
      "zh": "太棒了！报告老师公正处理，既有原则又具智慧。"
    }
  },
  {
    "id": "k3-ps-h8",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "เมื่อมีผู้ใหญ่ที่ไม่รู้จักมาชวนคุยหน้าโรงเรียนและบอกว่า \"พ่อแม่ให้มารับกลับบ้านแทน\" 🚗 หนูควรตรวจสอบอย่างไร?",
      "en": "Stranger outside school says \"Your parents sent me to pick you up\" 🚗. How to verify safely?",
      "zh": "校门口有不认识的陌生人开着车热情对你说：“我是你爸妈的好朋友，他们忙让我来接你回家” 🚗，你该如何核实防骗？"
    },
    "illustration": "🚗 🛑 👩‍🏫",
    "illustrationSubtitle": {
      "th": "การป้องกันการถูกลักพาตัว",
      "en": "Anti-abduction safety check",
      "zh": "防拐骗核实铁律"
    },
    "options": [
      {
        "id": "opt-k3-ps-h8-1",
        "label": {
          "th": "ไม่เดินตามเด็ดขาด และรีบวิ่งกลับเข้าไปบอกคุณครูประจำชั้นให้โทรศัพท์เช็คกับพ่อแม่ทันที",
          "en": "Never go! Run back to tell teacher to call parents immediately",
          "zh": "坚决不上车不跟对方走！立刻跑回传达室找老师打电话向爸妈亲口求证"
        },
        "icon": "🛑"
      },
      {
        "id": "opt-k3-ps-h8-2",
        "label": {
          "th": "รีบเปิดประตูรถขึ้นไปนั่งทันทีเพราะอยากกลับบ้านเร็วๆ",
          "en": "Hop in car right away",
          "zh": "听信对方，迫不及待拉开车门上车跟对方走"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-ps-h8-3",
        "label": {
          "th": "ขอให้เขาซื้อขนมให้ก่อนแล้วค่อยขึ้นรถ",
          "en": "Ask for candy first",
          "zh": "跟陌生人讨价还价，先买大包零食再上车"
        },
        "icon": "🍬"
      }
    ],
    "correctOptionId": "opt-k3-ps-h8-1",
    "explanation": {
      "th": "ห้ามไปกับคนแปลกหน้าทุกกรณี ให้ครูโทรศัพท์ตรวจสอบกับพ่อแม่ก่อนเสมอ เก่งมากครับ!",
      "en": "Correct! Never leave with strangers without direct teacher/parent confirmation.",
      "zh": "答对啦！坚决不跟陌生人走，必须经由老师电话亲口核准。"
    }
  },
  {
    "id": "k3-ps-h9",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "เมื่อเกิดฝนฟ้าคะนอง มีฟ้าแลบและฟ้าร้องดังสนั่น ⚡🌩️ สถานที่ใด \"อันตรายที่สุดและห้ามไปอยู่\"?",
      "en": "Severe thunderstorm with lightning and thunder ⚡🌩️. Which place is MOST DANGEROUS?",
      "zh": "雷雨大作、电闪雷鸣 ⚡🌩️ 的恶劣天气下，下列哪一个地点“最危险，绝对禁止停留躲避”？"
    },
    "illustration": "⚡ 🌳 ⚡",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยเมื่อเกิดพายุฟ้าคะนอง",
      "en": "Thunderstorm: Under lone tree danger",
      "zh": "防雷击避险常识"
    },
    "options": [
      {
        "id": "opt-k3-ps-h9-1",
        "label": {
          "th": "ภายในอาคารตึกที่มีสายล่อฟ้าและประตูปิดมิดชิด 🏢",
          "en": "Inside closed building with lightning rod",
          "zh": "关好门窗、装有避雷设施的水泥教学楼内部 🏢"
        },
        "icon": "🏢"
      },
      {
        "id": "opt-k3-ps-h9-2",
        "label": {
          "th": "ใต้ต้นไม้ใหญ่โดดเดี่ยวกลางทุ่งโล่ง หรือ สระน้ำกลางแจ้ง 🌳",
          "en": "Under a tall lone tree in open field or in open pool",
          "zh": "旷野中孤立的高大树木下，或空旷露天水池中 🌳"
        },
        "icon": "⚡"
      },
      {
        "id": "opt-k3-ps-h9-3",
        "label": {
          "th": "ภายในรถยนต์ที่ปิดหน้าต่างมิดชิด 🚗",
          "en": "Inside closed car",
          "zh": "关紧车窗玻璃的密闭汽车内 🚗"
        },
        "icon": "🚗"
      }
    ],
    "correctOptionId": "opt-k3-ps-h9-2",
    "explanation": {
      "th": "ฟ้าผ่ามักเล็งลงจุดสูงสุด เช่น ต้นไม้ใหญ่โดดเดี่ยว ห้ามหลบใต้ต้นไม้เด็ดขาด เก่งมากครับ!",
      "en": "Spot on! Lightning strikes tall solitary objects like big trees.",
      "zh": "太棒了！雷电极易击中孤树高点，绝对不可在树下避雨。"
    }
  },
  {
    "id": "k3-ps-h10",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "การลดขยะพลาสติกเพื่อรักษาสิ่งแวดล้อม: เมื่อไปซื้อของที่ร้านสะดวกซื้อ 🛍️ วิธีที่ช่วยลดโลกร้อนได้ดีที่สุดคือข้อใด?",
      "en": "Reducing plastic waste: When shopping at a convenience store 🛍️, what is the best eco-friendly habit?",
      "zh": "减少白色塑料垃圾、保护地球家园：去便利店或超市购物 🛍️ 时，最好的环保减塑行动是？"
    },
    "illustration": "🛍️ 🎒 🛍️",
    "illustrationSubtitle": {
      "th": "การใช้ถุงผ้าลดภาวะโลกร้อน",
      "en": "Bring reusable cloth bags",
      "zh": "自备环保布袋减少塑料袋"
    },
    "options": [
      {
        "id": "opt-k3-ps-h10-1",
        "label": {
          "th": "โยนถุงพลาสติกลงท่อระบายน้ำ",
          "en": "Throw bags down drain",
          "zh": "把塑料袋随手塞进下水道水沟里堵塞管道"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-ps-h10-2",
        "label": {
          "th": "ขอถุงพลาสติก 10 ใบมาใส่ของชิ้นละถุง",
          "en": "Ask for 10 bags",
          "zh": "买一件小东西就要一个大塑料袋，要上十几个塑料袋"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-ps-h10-3",
        "label": {
          "th": "นำถุงผ้าหรือกระเป๋าผ้าใช้ซ้ำไปใส่ของเอง ปฏิเสธการรับถุงพลาสติกแบบใช้ครั้งเดียวทิ้ง",
          "en": "Bring your own reusable cloth bag and refuse single-use plastic bags",
          "zh": "随身自备可重复使用的环保布袋，主动拒绝一次性塑料袋 🛍️"
        },
        "icon": "🛍️"
      }
    ],
    "correctOptionId": "opt-k3-ps-h10-3",
    "explanation": {
      "th": "พกถุงผ้าช่วยลดขยะพลาสติกหลายพันล้านใบ และช่วยปกป้องสัตว์ทะเล เก่งมากครับ!",
      "en": "Awesome! Carrying reusable cloth bags protects marine life and nature.",
      "zh": "答对了！随身自备环保袋，拒绝一次性白色塑料污染。"
    }
  }
];
