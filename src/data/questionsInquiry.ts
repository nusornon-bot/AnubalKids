import { Question } from '../types';

/**
 * คลังแบบทดสอบ: การสืบเสาะและวิทยาศาสตร์ (Scientific Inquiry) จำนวน 90 ข้อ
 * ครบ 3 ระดับชั้น (อ.1 - อ.3) ระดับความยากละ 10 ข้อ (ง่าย, ปานกลาง, ท้าทาย)
 * กระจายตำแหน่งคำตอบถูกต้อง A, B, C อย่างสมดุลเท่าเทียมกัน
 */
export const QUESTIONS_INQUIRY: Question[] = [
  {
    "id": "k1-inq-e1",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "อวัยวะใดของร่างกายที่เด็กๆ ใช้สำหรับ \"มองดูสิ่งต่างๆ รอบตัว\"? 👀",
      "en": "Which body organ do children use to \"SEE\" things around them? 👀",
      "zh": "我们身体上的哪一个器官是用来“观看四周精彩世界”的？👀"
    },
    "illustration": "👀 👁️ 👀",
    "illustrationSubtitle": {
      "th": "ประสาทสัมผัสทั้งห้า: การมองเห็น",
      "en": "Sense of sight: Eyes",
      "zh": "五官感觉：眼睛看世界"
    },
    "options": [
      {
        "id": "opt-k1-inq-e1-1",
        "label": {
          "th": "ดวงตา 2 ข้าง 👀",
          "en": "Two eyes",
          "zh": "双眼 👀"
        },
        "icon": "👀"
      },
      {
        "id": "opt-k1-inq-e1-2",
        "label": {
          "th": "ใบหู",
          "en": "Ears",
          "zh": "耳朵"
        },
        "icon": "👂"
      },
      {
        "id": "opt-k1-inq-e1-3",
        "label": {
          "th": "จมูก",
          "en": "Nose",
          "zh": "鼻子"
        },
        "icon": "👃"
      }
    ],
    "correctOptionId": "opt-k1-inq-e1-1",
    "explanation": {
      "th": "เราใช้ดวงตามองเห็นสีสัน รูปทรง และสิ่งต่างๆ เก่งมากครับ!",
      "en": "Correct! We see the world with our eyes.",
      "zh": "答对了！我们用明亮的双眼观察世界。"
    }
  },
  {
    "id": "k1-inq-e2",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "เราใช้อวัยวะใดสำหรับ \"ฟังเสียงดนตรีและเสียงพูดคุย\"? 👂",
      "en": "Which body organ do we use to \"HEAR\" music and talking? 👂",
      "zh": "我们用身体的哪一个器官来“倾听美妙音乐和说话声”？👂"
    },
    "illustration": "👂 🎶 👂",
    "illustrationSubtitle": {
      "th": "ประสาทสัมผัส: การได้ยิน",
      "en": "Sense of hearing: Ears",
      "zh": "听觉器官：耳朵听声音"
    },
    "options": [
      {
        "id": "opt-k1-inq-e2-1",
        "label": {
          "th": "ลิ้น",
          "en": "Tongue",
          "zh": "舌头"
        },
        "icon": "👅"
      },
      {
        "id": "opt-k1-inq-e2-2",
        "label": {
          "th": "ใบหู 2 ข้าง 👂",
          "en": "Two ears",
          "zh": "双耳 👂"
        },
        "icon": "👂"
      },
      {
        "id": "opt-k1-inq-e2-3",
        "label": {
          "th": "หัวเข่า",
          "en": "Knees",
          "zh": "膝盖"
        },
        "icon": "🦵"
      }
    ],
    "correctOptionId": "opt-k1-inq-e2-2",
    "explanation": {
      "th": "หูทั้งสองข้างมีไว้รับฟังเสียงรอบตัว เก่งมากครับ!",
      "en": "Right! We hear sounds and melodies with our ears.",
      "zh": "答对啦！耳朵帮助我们聆听声音。"
    }
  },
  {
    "id": "k1-inq-e3",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "ในเวลา \"กลางวัน\" บนท้องฟ้าจะสว่างไสวเพราะมีสิ่งใดส่องแสง? ☀️",
      "en": "During \"Daytime\", what bright celestial body lights up the sky? ☀️",
      "zh": "在明亮的“白天”，天空中照耀大地、带来光明的星球是？☀️"
    },
    "illustration": "☀️ 🌤️ ☀️",
    "illustrationSubtitle": {
      "th": "ดวงอาทิตย์ในเวลากลางวัน",
      "en": "Sun during daytime",
      "zh": "白天的太阳公公"
    },
    "options": [
      {
        "id": "opt-k1-inq-e3-1",
        "label": {
          "th": "ดวงดาวระยิบระยับ",
          "en": "Twinkling stars",
          "zh": "闪烁的小星星"
        },
        "icon": "⭐"
      },
      {
        "id": "opt-k1-inq-e3-2",
        "label": {
          "th": "ดวงจันทร์เสี้ยว",
          "en": "Crescent moon",
          "zh": "弯弯的月亮"
        },
        "icon": "🌙"
      },
      {
        "id": "opt-k1-inq-e3-3",
        "label": {
          "th": "ดวงอาทิตย์ ☀️",
          "en": "The Sun",
          "zh": "太阳 ☀️"
        },
        "icon": "☀️"
      }
    ],
    "correctOptionId": "opt-k1-inq-e3-3",
    "explanation": {
      "th": "ดวงอาทิตย์ให้แสงสว่างและความอบอุ่นในเวลากลางวัน เก่งมากครับ!",
      "en": "Spot on! The sun shines brightly during daytime.",
      "zh": "太棒了！太阳在白天为大地带来光明和温暖。"
    }
  },
  {
    "id": "k1-inq-e4",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "สิ่งใดในตัวเลือกนี้จัดเป็น \"สิ่งมีชีวิตที่ต้องการอาหารและน้ำ\"? 🌱 🆚 🪨 🆚 🚗",
      "en": "Which item is a \"LIVING THING\" that needs food and water? 🌱 vs 🪨 vs 🚗",
      "zh": "下列哪一样属于“需要呼吸、喝水和营养的活着的生命”？🌱 🆚 🪨 🆚 🚗"
    },
    "illustration": "🌱 🪨 🚗",
    "illustrationSubtitle": {
      "th": "สิ่งมีชีวิตและสิ่งไม่มีชีวิต",
      "en": "Living vs Non-living",
      "zh": "生物与非生物"
    },
    "options": [
      {
        "id": "opt-k1-inq-e4-1",
        "label": {
          "th": "ต้นไม้และดอกไม้ 🌱",
          "en": "Plants & flowers",
          "zh": "花草树木植物 🌱"
        },
        "icon": "🌱"
      },
      {
        "id": "opt-k1-inq-e4-2",
        "label": {
          "th": "ก้อนหินริมทาง 🪨",
          "en": "Roadside rocks",
          "zh": "路边的石头 🪨"
        },
        "icon": "🪨"
      },
      {
        "id": "opt-k1-inq-e4-3",
        "label": {
          "th": "รถยนต์ของเล่น 🚗",
          "en": "Toy car",
          "zh": "玩具小汽车 🚗"
        },
        "icon": "🚗"
      }
    ],
    "correctOptionId": "opt-k1-inq-e4-1",
    "explanation": {
      "th": "พืชเป็นสิ่งมีชีวิต ต้องรดน้ำและต้องการแสงแดดเติบโต เก่งมากครับ!",
      "en": "Correct! Plants are living things that grow.",
      "zh": "答对了！植物是有生命的，需要喝水和阳光。"
    }
  },
  {
    "id": "k1-inq-e5",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "เราใช้อวัยวะใดในการ \"ดมกลิ่นหอมของดอกไม้\"? 👃",
      "en": "Which organ do we use to \"SMELL\" fragrant flowers? 👃",
      "zh": "我们用哪一个五官器官来“闻花朵的芳香”？👃"
    },
    "illustration": "👃 🌸 👃",
    "illustrationSubtitle": {
      "th": "ประสาทสัมผัส: การดมกลิ่น",
      "en": "Sense of smell: Nose",
      "zh": "嗅觉器官：鼻子闻气味"
    },
    "options": [
      {
        "id": "opt-k1-inq-e5-1",
        "label": {
          "th": "ดวงตา",
          "en": "Eyes",
          "zh": "眼睛"
        },
        "icon": "👀"
      },
      {
        "id": "opt-k1-inq-e5-2",
        "label": {
          "th": "จมูก 👃",
          "en": "Nose",
          "zh": "鼻子 👃"
        },
        "icon": "👃"
      },
      {
        "id": "opt-k1-inq-e5-3",
        "label": {
          "th": "มือ",
          "en": "Hands",
          "zh": "双手"
        },
        "icon": "🖐️"
      }
    ],
    "correctOptionId": "opt-k1-inq-e5-2",
    "explanation": {
      "th": "จมูกใช้สูดดมกลิ่นและหายใจ เก่งมากครับ!",
      "en": "Awesome! Our nose detects scents and smells.",
      "zh": "答对啦！鼻子用来闻气味和呼吸。"
    }
  },
  {
    "id": "k1-inq-e6",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "ในเวลา \"กลางคืน\" มืดมิด บนท้องฟ้ามักปรากฏสิ่งใด? 🌙 ⭐",
      "en": "At \"Night\", what can you see in the dark sky? 🌙 ⭐",
      "zh": "在漆黑宁静的“夜晚”，深蓝的天空中通常会出现什么？🌙 ⭐"
    },
    "illustration": "🌙 ⭐ 🌃",
    "illustrationSubtitle": {
      "th": "ท้องฟ้าเวลากลางคืน",
      "en": "Night sky: Moon & stars",
      "zh": "夜晚的月亮和星星"
    },
    "options": [
      {
        "id": "opt-k1-inq-e6-1",
        "label": {
          "th": "ดวงอาทิตย์จ้า",
          "en": "Blazing sun",
          "zh": "烈日当空"
        },
        "icon": "☀️"
      },
      {
        "id": "opt-k1-inq-e6-2",
        "label": {
          "th": "สายรุ้งตอนเที่ยง",
          "en": "Midday rainbow",
          "zh": "正午彩虹"
        },
        "icon": "🌈"
      },
      {
        "id": "opt-k1-inq-e6-3",
        "label": {
          "th": "ดวงจันทร์และดวงดาว 🌙 ⭐",
          "en": "Moon and stars",
          "zh": "月亮和闪烁的星星 🌙 ⭐"
        },
        "icon": "🌙"
      }
    ],
    "correctOptionId": "opt-k1-inq-e6-3",
    "explanation": {
      "th": "กลางคืนมีดวงจันทร์และดวงดาวส่องประกายระยิบระยับ เก่งมากครับ!",
      "en": "Right! The moon and stars illuminate the night sky.",
      "zh": "太棒了！夜空中有温柔的月亮和星星。"
    }
  },
  {
    "id": "k1-inq-e7",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "สัตว์ชนิดใดร้องเสียงว่า \"เหมียว เหมียว\"? 🐱",
      "en": "Which animal makes the sound \"Meow Meow\"? 🐱",
      "zh": "哪一种可爱的小动物发出“喵喵喵”的叫声？🐱"
    },
    "illustration": "🐱 🐾 🐱",
    "illustrationSubtitle": {
      "th": "เสียงร้องของสัตว์เลี้ยง",
      "en": "Animal sounds: Cat",
      "zh": "动物叫声：小猫喵喵叫"
    },
    "options": [
      {
        "id": "opt-k1-inq-e7-1",
        "label": {
          "th": "แมวเหมียว 🐱",
          "en": "Cat",
          "zh": "小猫咪 🐱"
        },
        "icon": "🐱"
      },
      {
        "id": "opt-k1-inq-e7-2",
        "label": {
          "th": "สุนัขโฮ่งๆ 🐶",
          "en": "Dog",
          "zh": "小狗"
        },
        "icon": "🐶"
      },
      {
        "id": "opt-k1-inq-e7-3",
        "label": {
          "th": "เป็ดก้าบๆ 🦆",
          "en": "Duck",
          "zh": "小鸭"
        },
        "icon": "🦆"
      }
    ],
    "correctOptionId": "opt-k1-inq-e7-1",
    "explanation": {
      "th": "แมวน้อยร้องเหมียวๆ คลอเคลียน่ารัก เก่งมากครับ!",
      "en": "Correct! Cats meow sweetly.",
      "zh": "答对了！小猫咪会喵喵叫。"
    }
  },
  {
    "id": "k1-inq-e8",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "ส่วนใดของต้นไม้ที่ทำหน้าที่ \"หยั่งลึกลงในดิน\" คอยดูดน้ำและสารอาหาร? 🪴",
      "en": "Which part of the plant anchors deep in the soil and absorbs water? 🪴",
      "zh": "植物的哪一部分“深深扎在泥土里”，负责吸收水分和养分？🪴"
    },
    "illustration": "🪴 🌱 🪴",
    "illustrationSubtitle": {
      "th": "ส่วนประกอบของพืช: ราก",
      "en": "Plant parts: Roots",
      "zh": "植物的器官：根系"
    },
    "options": [
      {
        "id": "opt-k1-inq-e8-1",
        "label": {
          "th": "ผลไม้บนกิ่ง",
          "en": "Fruits on branch",
          "zh": "树枝上的果实"
        },
        "icon": "🍎"
      },
      {
        "id": "opt-k1-inq-e8-2",
        "label": {
          "th": "รากของต้นไม้ 🪴",
          "en": "Roots of the plant",
          "zh": "植物的根系 🪴"
        },
        "icon": "🪴"
      },
      {
        "id": "opt-k1-inq-e8-3",
        "label": {
          "th": "ดอกไม้สีสวย",
          "en": "Flower petals",
          "zh": "花瓣"
        },
        "icon": "🌸"
      }
    ],
    "correctOptionId": "opt-k1-inq-e8-2",
    "explanation": {
      "th": "รากต้นไม้อยู่ใต้ดิน คอยยึดลำต้นและดูดน้ำเลี้ยงต้นไม้ เก่งมากครับ!",
      "en": "Awesome! Roots absorb moisture from the earth.",
      "zh": "答对啦！植物的根在土里吸收水分。"
    }
  },
  {
    "id": "k1-inq-e9",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "เมื่อเราสัมผัส \"ก้อนน้ำแข็ง\" 🧊 มือของเราจะรู้สึกอย่างไร?",
      "en": "When touching an \"Ice cube\" 🧊, how does your hand feel?",
      "zh": "当我们用手去摸冰凉的“小冰块” 🧊 时，手会有什么感觉？"
    },
    "illustration": "🧊 🥶 🧊",
    "illustrationSubtitle": {
      "th": "การรับรู้ความเย็นและอุณหภูมิ",
      "en": "Temperature sense: Cold ice",
      "zh": "冷热感觉：冰块很冷"
    },
    "options": [
      {
        "id": "opt-k1-inq-e9-1",
        "label": {
          "th": "รู้สึกร้อนผ่าวเหมือนไฟ",
          "en": "Hot like fire",
          "zh": "像火一样烫手"
        },
        "icon": "🔥"
      },
      {
        "id": "opt-k1-inq-e9-2",
        "label": {
          "th": "รู้สึกเผ็ดร้อน",
          "en": "Spicy hot",
          "zh": "感到辣辣的"
        },
        "icon": "🌶️"
      },
      {
        "id": "opt-k1-inq-e9-3",
        "label": {
          "th": "รู้สึกเย็นเฉียบ 🧊",
          "en": "Very cold",
          "zh": "感到冰凉刺骨 🧊"
        },
        "icon": "🧊"
      }
    ],
    "correctOptionId": "opt-k1-inq-e9-3",
    "explanation": {
      "th": "น้ำแข็งมีอุณหภูมิต่ำ สัมผัสแล้วเย็นสดชื่น เก่งมากครับ!",
      "en": "Spot on! Ice feels cold and chilly.",
      "zh": "太棒了！冰块摸起来冰冰凉凉的。"
    }
  },
  {
    "id": "k1-inq-e10",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "เราใช้อวัยวะใดในการ \"ลิ้มรสอาหาร\" ว่าหวาน เปรี้ยว หรือเค็ม? 👅",
      "en": "Which body organ tastes sweetness, sourness, or saltiness? 👅",
      "zh": "我们用嘴里的哪一个器官来“品尝食物的酸甜苦咸”？👅"
    },
    "illustration": "👅 🍦 👅",
    "illustrationSubtitle": {
      "th": "ประสาทสัมผัส: การรับรส",
      "en": "Sense of taste: Tongue",
      "zh": "味觉器官：舌头尝味道"
    },
    "options": [
      {
        "id": "opt-k1-inq-e10-1",
        "label": {
          "th": "ลิ้น 👅",
          "en": "Tongue",
          "zh": "舌头 👅"
        },
        "icon": "👅"
      },
      {
        "id": "opt-k1-inq-e10-2",
        "label": {
          "th": "จมูก",
          "en": "Nose",
          "zh": "鼻子"
        },
        "icon": "👃"
      },
      {
        "id": "opt-k1-inq-e10-3",
        "label": {
          "th": "เล็บมือ",
          "en": "Fingernails",
          "zh": "指甲"
        },
        "icon": "💅"
      }
    ],
    "correctOptionId": "opt-k1-inq-e10-1",
    "explanation": {
      "th": "ลิ้นมีตุ่มรับรสคอยบอกรสชาติแสนอร่อย เก่งมากครับ!",
      "en": "Correct! Our tongue tastes delicious flavors.",
      "zh": "答对了！舌头用来品尝各种美味。"
    }
  },
  {
    "id": "k1-inq-m1",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "เมื่อมีแดดส่องกระทบตัวเรากลางแจ้ง จะเกิดสิ่งสีดำทอดยาวบนพื้น สิ่งนั้นเรียกว่าอะไร? 👤",
      "en": "When sunlight shines on you outdoors, what dark shape appears on the ground? 👤",
      "zh": "当阳光在户外照在我们身上时，地面上投射出长长黑黑的身影，那叫作什么？👤"
    },
    "illustration": "👤 ☀️ 👤",
    "illustrationSubtitle": {
      "th": "การเกิดเงาจากแสงกระทบวัตถุ",
      "en": "Light and shadows",
      "zh": "光与影子的形成"
    },
    "options": [
      {
        "id": "opt-k1-inq-m1-1",
        "label": {
          "th": "รุ้งกินน้ำ",
          "en": "Rainbow",
          "zh": "天上的彩虹"
        },
        "icon": "🌈"
      },
      {
        "id": "opt-k1-inq-m1-2",
        "label": {
          "th": "เงา 👤",
          "en": "Shadow",
          "zh": "影子 👤"
        },
        "icon": "👤"
      },
      {
        "id": "opt-k1-inq-m1-3",
        "label": {
          "th": "ก้อนเมฆฝน",
          "en": "Raincloud",
          "zh": "乌云"
        },
        "icon": "☁️"
      }
    ],
    "correctOptionId": "opt-k1-inq-m1-2",
    "explanation": {
      "th": "เมื่อร่างกายบังแสงแดด จะเกิดเงาบนพื้นดิน เก่งมากครับ!",
      "en": "Right! When you block light, you make a shadow.",
      "zh": "答对啦！身体挡住光线就会形成影子。"
    }
  },
  {
    "id": "k1-inq-m2",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "สัตว์ชนิดใด \"มีปีกและสามารถบินได้บนท้องฟ้า\"? 🕊️ 🆚 🐢 🆚 🐘",
      "en": "Which animal has wings and can fly in the sky? 🕊️ vs 🐢 vs 🐘",
      "zh": "下列哪一种小动物“长着羽毛翅膀，能在天空中自由翱翔”？🕊️ 🆚 🐢 🆚 🐘"
    },
    "illustration": "🕊️ ☁️ 🕊️",
    "illustrationSubtitle": {
      "th": "สัตว์ปีกที่บินได้",
      "en": "Flying animals: Birds",
      "zh": "会飞的鸟类"
    },
    "options": [
      {
        "id": "opt-k1-inq-m2-1",
        "label": {
          "th": "เต่าคลานต้วมเตี้ยม",
          "en": "Turtle",
          "zh": "慢吞吞的乌龟"
        },
        "icon": "🐢"
      },
      {
        "id": "opt-k1-inq-m2-2",
        "label": {
          "th": "ช้างหูใหญ่",
          "en": "Elephant",
          "zh": "大象"
        },
        "icon": "🐘"
      },
      {
        "id": "opt-k1-inq-m2-3",
        "label": {
          "th": "นกพิราบ 🕊️",
          "en": "Pigeon bird",
          "zh": "飞翔的鸽子/小鸟 🕊️"
        },
        "icon": "🕊️"
      }
    ],
    "correctOptionId": "opt-k1-inq-m2-3",
    "explanation": {
      "th": "นกมีปีกและขน ช่วยให้พยุงตัวบินบนอากาศได้ เก่งมากครับ!",
      "en": "Awesome! Birds have wings to fly high.",
      "zh": "太棒了！小鸟长着翅膀能飞翔。"
    }
  },
  {
    "id": "k1-inq-m3",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "เมื่อนำ \"ก้อนน้ำแข็ง\" 🧊 วางทิ้งไว้กลางแดดร้อนๆ จะเกิดการเปลี่ยนแปลงอย่างไร?",
      "en": "Leave an ice cube 🧊 under hot sunlight. What happens to it?",
      "zh": "把一块晶莹剔透的冰块 🧊 放在火辣辣的太阳下暴晒，它会发生什么变化？"
    },
    "illustration": "🧊 ☀️ 💧",
    "illustrationSubtitle": {
      "th": "การละลายของน้ำแข็งเมื่อได้รับความร้อน",
      "en": "Ice melts into water",
      "zh": "冰受热融化成水"
    },
    "options": [
      {
        "id": "opt-k1-inq-m3-1",
        "label": {
          "th": "ละลายกลายเป็นหยดน้ำเหลว 💧",
          "en": "Melts into liquid water",
          "zh": "受热融化变成一滩水 💧"
        },
        "icon": "💧"
      },
      {
        "id": "opt-k1-inq-m3-2",
        "label": {
          "th": "กลายเป็นลูกกวาดหลากสี",
          "en": "Turns into candy",
          "zh": "变成五彩糖果"
        },
        "icon": "🍬"
      },
      {
        "id": "opt-k1-inq-m3-3",
        "label": {
          "th": "แข็งตัวใหญ่ขึ้นเป็นก้อนหิน",
          "en": "Turns into a rock",
          "zh": "变得更大更硬变成大石头"
        },
        "icon": "🪨"
      }
    ],
    "correctOptionId": "opt-k1-inq-m3-1",
    "explanation": {
      "th": "ความร้อนจากแสงแดดทำให้น้ำแข็งละลายกลายเป็นน้ำ เก่งมากครับ!",
      "en": "Correct! Heat makes solid ice melt into liquid water.",
      "zh": "答对了！冰块受热会融化变成水。"
    }
  },
  {
    "id": "k1-inq-m4",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "สัตว์ชนิดใดอาศัยอยู่ในดิน คอยพรวนดินให้ร่วนซุย? 🪱",
      "en": "Which little animal lives underground in the soil and burrows tunnels? 🪱",
      "zh": "哪一种小动物常年生活在湿润泥土里，帮大自然松土？🪱"
    },
    "illustration": "🪱 🪴 🪱",
    "illustrationSubtitle": {
      "th": "สิ่งมีชีวิตใต้ดิน: ไส้เดือนดิน",
      "en": "Soil creature: Earthworm",
      "zh": "土壤小助手：蚯蚓"
    },
    "options": [
      {
        "id": "opt-k1-inq-m4-1",
        "label": {
          "th": "ผีเสื้อแสนสวย",
          "en": "Butterfly",
          "zh": "花蝴蝶"
        },
        "icon": "🦋"
      },
      {
        "id": "opt-k1-inq-m4-2",
        "label": {
          "th": "ไส้เดือนดิน 🪱",
          "en": "Earthworm",
          "zh": "蚯蚓 🪱"
        },
        "icon": "🪱"
      },
      {
        "id": "opt-k1-inq-m4-3",
        "label": {
          "th": "ยีราฟคอยาว",
          "en": "Giraffe",
          "zh": "长颈鹿"
        },
        "icon": "🦒"
      }
    ],
    "correctOptionId": "opt-k1-inq-m4-2",
    "explanation": {
      "th": "ไส้เดือนช่วยพรวนดิน ทำให้พืชเจริญเติบโตได้ดี เก่งมากครับ!",
      "en": "Spot on! Earthworms help loosen and aerate the soil.",
      "zh": "太棒了！蚯蚓在地下钻洞，帮泥土松土透气。"
    }
  },
  {
    "id": "k1-inq-m5",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "สิ่งของใดต่อไปนี้ \"ลอยน้ำได้\" เมื่อหย่อนลงในกะละมังน้ำ? 🍃 🆚 🪨",
      "en": "Which item \"FLOATS\" on top of water in a basin? 🍃 vs 🪨",
      "zh": "把下列物品放进水盆里，哪一样会“轻飘飘地漂浮在水面上”？🍃 🆚 🪨"
    },
    "illustration": "🍃 💦 🪨",
    "illustrationSubtitle": {
      "th": "การลอยน้ำของวัตถุที่มีน้ำหนักเบา",
      "en": "Floating objects: Dry leaf",
      "zh": "物体的浮沉：干树叶漂浮"
    },
    "options": [
      {
        "id": "opt-k1-inq-m5-1",
        "label": {
          "th": "ก้อนหินทึบหนัก",
          "en": "Heavy rock",
          "zh": "沉甸甸的石头"
        },
        "icon": "🪨"
      },
      {
        "id": "opt-k1-inq-m5-2",
        "label": {
          "th": "เหรียญสตางค์เหล็ก",
          "en": "Metal coin",
          "zh": "金属铁硬币"
        },
        "icon": "🪙"
      },
      {
        "id": "opt-k1-inq-m5-3",
        "label": {
          "th": "ใบไม้แห้งใบเบา 🍃",
          "en": "Light dry leaf",
          "zh": "轻盈干枯的树叶 🍃"
        },
        "icon": "🍃"
      }
    ],
    "correctOptionId": "opt-k1-inq-m5-3",
    "explanation": {
      "th": "ใบไม้แห้งมีน้ำหนักเบา จึงลอยอยู่บนผิวน้ำได้ เก่งมากครับ!",
      "en": "Right! Light dry leaves float easily on water.",
      "zh": "答对啦！干枯树叶比重小，能浮在水面上。"
    }
  },
  {
    "id": "k1-inq-m6",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "ลูกสุนัขตัวเล็กๆ 🐶 เติบโตมาจากสัตว์ชนิดใด?",
      "en": "A cute puppy 🐶 grows up to be which animal?",
      "zh": "毛茸茸的小狗崽 🐶 长大以后会变成什么动物？"
    },
    "illustration": "🐶 ➡️ 🐕",
    "illustrationSubtitle": {
      "th": "การเจริญเติบโตของสัตว์เลี้ยง",
      "en": "Growth: Puppy to adult dog",
      "zh": "动物生长：幼犬长成大狗"
    },
    "options": [
      {
        "id": "opt-k1-inq-m6-1",
        "label": {
          "th": "สุนัขตัวโต (หมา) 🐕",
          "en": "Adult dog",
          "zh": "大狗成犬 🐕"
        },
        "icon": "🐕"
      },
      {
        "id": "opt-k1-inq-m6-2",
        "label": {
          "th": "แม่เป็ด",
          "en": "Mother duck",
          "zh": "鸭妈妈"
        },
        "icon": "🦆"
      },
      {
        "id": "opt-k1-inq-m6-3",
        "label": {
          "th": "แม่แมว",
          "en": "Mother cat",
          "zh": "猫妈妈"
        },
        "icon": "🐱"
      }
    ],
    "correctOptionId": "opt-k1-inq-m6-1",
    "explanation": {
      "th": "ลูกสุนัขดื่มนมแม่และเติบโตเป็นสุนัขตัวเต็มวัย เก่งมากครับ!",
      "en": "Awesome! Puppies grow into full adult dogs.",
      "zh": "太棒了！小狗幼崽长大后成为成年大狗。"
    }
  },
  {
    "id": "k1-inq-m7",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "เมื่อมี \"ลมพัดแรง\" 🍃 สิ่งใดแสดงให้เห็นว่าลมกำลังพัดอยู่?",
      "en": "When there is \"strong wind\" 🍃, how can we observe it?",
      "zh": "当周围“刮起阵阵大风” 🍃 时，观察哪种现象能证明起风了？"
    },
    "illustration": "🍃 🌳 🍃",
    "illustrationSubtitle": {
      "th": "การสังเกตการเคลื่อนที่ของอากาศ (ลม)",
      "en": "Observing wind effects",
      "zh": "观察风的作用：树叶摇摆"
    },
    "options": [
      {
        "id": "opt-k1-inq-m7-1",
        "label": {
          "th": "ก้อนหินลุกขึ้นกระโดด",
          "en": "Rocks jumping",
          "zh": "地上的大石头跳起舞来"
        },
        "icon": "🪨"
      },
      {
        "id": "opt-k1-inq-m7-2",
        "label": {
          "th": "ยอดไม้และใบไม้แกว่งไกวสะบัดไปมา 🍃",
          "en": "Tree tops and leaves sway wildly",
          "zh": "高高的树梢和满树绿叶摇摆摆动 🍃"
        },
        "icon": "🍃"
      },
      {
        "id": "opt-k1-inq-m7-3",
        "label": {
          "th": "พื้นปูนละลายกลายเป็นน้ำ",
          "en": "Concrete melts",
          "zh": "水泥地面融化变成水"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k1-inq-m7-2",
    "explanation": {
      "th": "เรามองไม่เห็นตัวลม แต่เห็นใบไม้ปลิวไหวตามแรงลม เก่งมากครับ!",
      "en": "Correct! We see the wind moving branches and leaves.",
      "zh": "答对了！风吹动树枝落叶沙沙摇摆。"
    }
  },
  {
    "id": "k1-inq-m8",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "สัตว์ชนิดใดออกลูกเป็น \"ไข่\"? 🐔 🆚 🐶 🆚 🐱",
      "en": "Which animal lays \"EGGS\"? 🐔 vs 🐶 vs 🐱",
      "zh": "下列哪一种动物是通过“下蛋/生蛋”来繁衍后代的？🐔 🆚 🐶 🆚 🐱"
    },
    "illustration": "🐔 🥚 🐔",
    "illustrationSubtitle": {
      "th": "สัตว์ที่ออกลูกเป็นไข่",
      "en": "Egg-laying animals: Hen",
      "zh": "卵生动物：母鸡下蛋"
    },
    "options": [
      {
        "id": "opt-k1-inq-m8-1",
        "label": {
          "th": "สุนัข",
          "en": "Dog",
          "zh": "小狗"
        },
        "icon": "🐶"
      },
      {
        "id": "opt-k1-inq-m8-2",
        "label": {
          "th": "แม่วัว",
          "en": "Cow",
          "zh": "奶牛"
        },
        "icon": "🐄"
      },
      {
        "id": "opt-k1-inq-m8-3",
        "label": {
          "th": "แม่ไก่ 🐔",
          "en": "Hen",
          "zh": "母鸡 🐔"
        },
        "icon": "🐔"
      }
    ],
    "correctOptionId": "opt-k1-inq-m8-3",
    "explanation": {
      "th": "แม่ไก่ออกไข่แล้วกกจนฟักเป็นลูกเจี๊ยบ เก่งมากครับ!",
      "en": "Right! Hens lay eggs that hatch into chicks.",
      "zh": "答对啦！母鸡会生鸡蛋孵出小鸡。"
    }
  },
  {
    "id": "k1-inq-m9",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "ผลไม้ชนิดใดมี \"รสเปรี้ยวจี๊ด\" เมื่อกัดชิม? 🍋 🆚 🍉 🆚 🍌",
      "en": "Which fruit has a sharply \"SOUR\" taste? 🍋 vs 🍉 vs 🍌",
      "zh": "哪一种水果咬上一口会让人酸得眨眼睛？🍋 🆚 🍉 🆚 🍌"
    },
    "illustration": "🍋 👅 🍋",
    "illustrationSubtitle": {
      "th": "รสชาติเปรี้ยวของผลไม้",
      "en": "Sour taste: Lemon/Lime",
      "zh": "水果味道：柠檬酸溜溜"
    },
    "options": [
      {
        "id": "opt-k1-inq-m9-1",
        "label": {
          "th": "มะนาว / เลมอน 🍋",
          "en": "Lemon / Lime",
          "zh": "柠檬 / 酸橙 🍋"
        },
        "icon": "🍋"
      },
      {
        "id": "opt-k1-inq-m9-2",
        "label": {
          "th": "กล้วยหอมหวาน",
          "en": "Sweet banana",
          "zh": "香甜的熟香蕉"
        },
        "icon": "🍌"
      },
      {
        "id": "opt-k1-inq-m9-3",
        "label": {
          "th": "แตงโมหวานฉ่ำ",
          "en": "Sweet watermelon",
          "zh": "甜津津的西瓜"
        },
        "icon": "🍉"
      }
    ],
    "correctOptionId": "opt-k1-inq-m9-1",
    "explanation": {
      "th": "มะนาวมีกรดธรรมชาติจึงมีรสเปรี้ยวจี๊ด เก่งมากครับ!",
      "en": "Spot on! Lemons are famously sour.",
      "zh": "太棒了！柠檬的味道非常酸。"
    }
  },
  {
    "id": "k1-inq-m10",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "เวลากลางวัน ท้องฟ้าสว่างสดใส เหมาะสำหรับการทำกิจกรรมใดมากที่สุด? ☀️",
      "en": "Daytime is bright and sunny. What activity is best suited for it? ☀️",
      "zh": "白天阳光普照、光线充足，最适合开展下列哪一项活动？☀️"
    },
    "illustration": "☀️ 🏫 🏃",
    "illustrationSubtitle": {
      "th": "กิจกรรมในเวลากลางวัน",
      "en": "Daytime activities: School & play",
      "zh": "白天的作息：上学运动"
    },
    "options": [
      {
        "id": "opt-k1-inq-m10-1",
        "label": {
          "th": "นอนหลับสนิทตลอดวันคลุมโปง",
          "en": "Sleep under blanket all day",
          "zh": "拉紧窗帘蒙头大睡一整天"
        },
        "icon": "🛌"
      },
      {
        "id": "opt-k1-inq-m10-2",
        "label": {
          "th": "ไปโรงเรียน เรียนหนังสือ และวิ่งเล่นออกกำลังกาย 🎒",
          "en": "Go to school, learn, and play sports",
          "zh": "背书包去上学、认真听课、在操场锻炼 🎒"
        },
        "icon": "🏫"
      },
      {
        "id": "opt-k1-inq-m10-3",
        "label": {
          "th": "มองหาดาวตกในความมืด",
          "en": "Look for shooting stars in dark",
          "zh": "打着手电筒找夜空流星"
        },
        "icon": "🌌"
      }
    ],
    "correctOptionId": "opt-k1-inq-m10-2",
    "explanation": {
      "th": "กลางวันร่างกายตื่นตัว ได้รับวิตามินดีจากแสงแดด เหมาะกับการเรียนและเล่น เก่งมากครับ!",
      "en": "Correct! Daytime is great for school and active play.",
      "zh": "答对了！白天光线充足，适合学习和户外活动。"
    }
  },
  {
    "id": "k1-inq-h1",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "ปลาสามารถ \"ว่ายน้ำและหายใจในน้ำ\" ได้ด้วยอวัยวะพิเศษข้อใด? 🐟",
      "en": "Fish can swim and breathe underwater using which special features? 🐟",
      "zh": "小鱼 🐟 能够在水中自由畅游、呼吸水里的氧气，靠的是什么特殊器官？"
    },
    "illustration": "🐟 🌊 🐟",
    "illustrationSubtitle": {
      "th": "อวัยวะในการว่ายน้ำและหายใจของปลา",
      "en": "Fish anatomy: Fins & gills",
      "zh": "鱼的特征：鳍和鳃"
    },
    "options": [
      {
        "id": "opt-k1-inq-h1-1",
        "label": {
          "th": "มีขา 4 ขาเหมือนม้า",
          "en": "4 legs like horse",
          "zh": "长着像骏马一样的四条腿"
        },
        "icon": "🐎"
      },
      {
        "id": "opt-k1-inq-h1-2",
        "label": {
          "th": "มีปีกบินบนฟ้า",
          "en": "Wings to fly in sky",
          "zh": "长着宽大羽毛翅膀"
        },
        "icon": "🕊️"
      },
      {
        "id": "opt-k1-inq-h1-3",
        "label": {
          "th": "มีครีบว่ายน้ำ และมีเหงือกหายใจ 🐟",
          "en": "Fins for swimming & gills for breathing",
          "zh": "用鱼鳍划水游动，用鱼鳃在水里呼吸 🐟"
        },
        "icon": "🐟"
      }
    ],
    "correctOptionId": "opt-k1-inq-h1-3",
    "explanation": {
      "th": "ปลาใช้ครีบพยุงว่ายน้ำ และใช้เหงือกกรองออกซิเจนในน้ำ เก่งมากครับ!",
      "en": "Correct! Fins help fish swim, and gills let them breathe in water.",
      "zh": "答对了！鱼靠鱼鳍游泳，靠鱼鳃呼吸。"
    }
  },
  {
    "id": "k1-inq-h2",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "เมื่อนำ \"แม่เหล็ก\" 🧲 ไปจ่อใกล้สิ่งของ สิ่งใดจะถูกแม่เหล็กดูดติดทันที?",
      "en": "When a magnet 🧲 is near items, which one snaps onto it instantly?",
      "zh": "把一块小磁铁 🧲 凑近下列生活用品，哪一样会被瞬间紧紧吸附住？"
    },
    "illustration": "🧲 📎 🧲",
    "illustrationSubtitle": {
      "th": "แรงแม่เหล็กดึงดูดโลหะเหล็ก",
      "en": "Magnetic attraction: Metal clip",
      "zh": "磁力吸铁特性"
    },
    "options": [
      {
        "id": "opt-k1-inq-h2-1",
        "label": {
          "th": "คลิปหนีบกระดาษโลหะ 📎",
          "en": "Metal paperclip",
          "zh": "铁质金属回形针 📎"
        },
        "icon": "📎"
      },
      {
        "id": "opt-k1-inq-h2-2",
        "label": {
          "th": "ยางลบพลาสติก",
          "en": "Rubber eraser",
          "zh": "橡胶橡皮擦"
        },
        "icon": "🧼"
      },
      {
        "id": "opt-k1-inq-h2-3",
        "label": {
          "th": "กระดาษชำระ",
          "en": "Tissue paper",
          "zh": "干纸巾"
        },
        "icon": "🧻"
      }
    ],
    "correctOptionId": "opt-k1-inq-h2-1",
    "explanation": {
      "th": "แม่เหล็กมีพลังดึงดูดเหล็กและโลหะบางชนิด เก่งมากครับ!",
      "en": "Right! Magnets attract iron metals like paperclips.",
      "zh": "答对啦！磁铁能吸引铁质金属。"
    }
  },
  {
    "id": "k1-inq-h3",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "สัตว์ชนิดใด \"ออกหากินในเวลากลางคืน\" มีดวงตากลมโตมองเห็นในความมืด? 🦉",
      "en": "Which animal has big round eyes and hunts at night? 🦉",
      "zh": "哪一种飞禽长着又大又圆的眼睛，专在“黑夜里外出捕食”？🦉"
    },
    "illustration": "🦉 🌙 🦉",
    "illustrationSubtitle": {
      "th": "สัตว์หากินกลางคืน: นกฮูก",
      "en": "Nocturnal animal: Owl",
      "zh": "夜行性动物：猫头鹰"
    },
    "options": [
      {
        "id": "opt-k1-inq-h3-1",
        "label": {
          "th": "แม่ไก่แจ้",
          "en": "Rooster",
          "zh": "大公鸡"
        },
        "icon": "🐓"
      },
      {
        "id": "opt-k1-inq-h3-2",
        "label": {
          "th": "นกฮูก (นกเค้าแมว) 🦉",
          "en": "Owl",
          "zh": "猫头鹰 🦉"
        },
        "icon": "🦉"
      },
      {
        "id": "opt-k1-inq-h3-3",
        "label": {
          "th": "นกกระจอกเทศ",
          "en": "Ostrich",
          "zh": "驼鸟"
        },
        "icon": "🪶"
      }
    ],
    "correctOptionId": "opt-k1-inq-h3-2",
    "explanation": {
      "th": "นกฮูกมีสายตาดีมากในความมืด ออกล่าเหยื่อเวลากลางคืน เก่งมากครับ!",
      "en": "Awesome! Owls are nocturnal birds that hunt at night.",
      "zh": "太棒了！猫头鹰具有出色的夜视能力。"
    }
  },
  {
    "id": "k1-inq-h4",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "เมื่อเราเป่าลมเข้าไปใน \"ลูกโป่งยาง\" 🎈 ลูกโป่งจะพองโตขึ้นเพราะอะไร?",
      "en": "When blowing air into a rubber balloon 🎈, why does it expand bigger?",
      "zh": "当我们用力往气球 🎈 里吹气时，气球为什么会鼓鼓地膨胀变大？"
    },
    "illustration": "🎈 💨 🎈",
    "illustrationSubtitle": {
      "th": "อากาศมีตัวตนและต้องการที่อยู่",
      "en": "Air takes up space in balloon",
      "zh": "空气占据空间"
    },
    "options": [
      {
        "id": "opt-k1-inq-h4-1",
        "label": {
          "th": "ลูกโป่งกินอาหารอิ่ม",
          "en": "Ate food",
          "zh": "气球吃饱了饭"
        },
        "icon": "🍰"
      },
      {
        "id": "opt-k1-inq-h4-2",
        "label": {
          "th": "มีน้ำหนักเหล็กถ่วงอยู่",
          "en": "Heavy metal inside",
          "zh": "里面装满了铁块"
        },
        "icon": "🪨"
      },
      {
        "id": "opt-k1-inq-h4-3",
        "label": {
          "th": "มีอากาศเข้าไปอยู่ข้างในลูกโป่ง 💨",
          "en": "Air fills the inside space",
          "zh": "吹进去的空气占据了气球内部空间 💨"
        },
        "icon": "💨"
      }
    ],
    "correctOptionId": "opt-k1-inq-h4-3",
    "explanation": {
      "th": "อากาศเป็นก๊าซที่ต้องการที่อยู่ จึงดันลูกโป่งให้พองออก เก่งมากครับ!",
      "en": "Spot on! Air has volume and inflates the balloon.",
      "zh": "答对了！吹入的空气占据空间，把气球撑大。"
    }
  },
  {
    "id": "k1-inq-h5",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "แหล่งกำเนิดแสงใดเกิดจาก \"ธรรมชาติ\" ไม่ได้สร้างขึ้นด้วยฝีมือมนุษย์? ☀️ 🆚 💡",
      "en": "Which light source is NATURAL (not man-made)? ☀️ vs 💡",
      "zh": "下列哪一种光源属于“大自然天然生成”，而非人类工厂制造？☀️ 🆚 💡"
    },
    "illustration": "☀️ 💡 🔦",
    "illustrationSubtitle": {
      "th": "แหล่งกำเนิดแสงธรรมชาติ",
      "en": "Natural light source: Sun",
      "zh": "自然光源：太阳"
    },
    "options": [
      {
        "id": "opt-k1-inq-h5-1",
        "label": {
          "th": "ดวงอาทิตย์ ☀️",
          "en": "The Sun",
          "zh": "太阳公公 ☀️"
        },
        "icon": "☀️"
      },
      {
        "id": "opt-k1-inq-h5-2",
        "label": {
          "th": "ไฟฉายใส่ถ่าน",
          "en": "Battery flashlight",
          "zh": "手电筒"
        },
        "icon": "🔦"
      },
      {
        "id": "opt-k1-inq-h5-3",
        "label": {
          "th": "หลอดไฟนีออน",
          "en": "Fluorescent bulb",
          "zh": "天花板日光灯"
        },
        "icon": "💡"
      }
    ],
    "correctOptionId": "opt-k1-inq-h5-1",
    "explanation": {
      "th": "ดวงอาทิตย์และดวงดาวเป็นแหล่งกำเนิดแสงตามธรรมชาติ เก่งมากครับ!",
      "en": "Correct! The sun is a magnificent natural light source.",
      "zh": "太棒了！太阳是巨大的天然光源。"
    }
  },
  {
    "id": "k1-inq-h6",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "พืชต้องการสิ่งใดต่อไปนี้ เพื่อการเจริญเติบโตแข็งแรง? 🌱",
      "en": "What do green plants need in order to grow healthy and strong? 🌱",
      "zh": "绿色小植物要健康茁壮地长大，必须吸收下列哪些要素？🌱"
    },
    "illustration": "🌱 💧 ☀️",
    "illustrationSubtitle": {
      "th": "ปัจจัยในการเจริญเติบโตของพืช",
      "en": "Plant growth needs: Water, sun, air",
      "zh": "植物生长三要素"
    },
    "options": [
      {
        "id": "opt-k1-inq-h6-1",
        "label": {
          "th": "น้ำอัดลมและลูกอมหวาน",
          "en": "Soda and candy",
          "zh": "冰可乐和太妃糖"
        },
        "icon": "🥤"
      },
      {
        "id": "opt-k1-inq-h6-2",
        "label": {
          "th": "น้ำ แสงแดด และอากาศ 💧 ☀️",
          "en": "Water, sunlight, and air",
          "zh": "清水、适度阳光和新鲜空气 💧 ☀️"
        },
        "icon": "🌱"
      },
      {
        "id": "opt-k1-inq-h6-3",
        "label": {
          "th": "ห้องมืดที่ไม่มีอากาศ",
          "en": "Dark airless room",
          "zh": "阴暗不通风的铁盒"
        },
        "icon": "📦"
      }
    ],
    "correctOptionId": "opt-k1-inq-h6-2",
    "explanation": {
      "th": "พืชใช้น้ำ แสงแดด และอากาศ ในการสังเคราะห์แสงสร้างอาหาร เก่งมากครับ!",
      "en": "Right! Plants need water, light, and air to flourish.",
      "zh": "答对啦！植物需要水、阳光和空气来生长。"
    }
  },
  {
    "id": "k1-inq-h7",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "สัตว์ชนิดใดจำแนกเป็น \"สัตว์เลื้อยคลาน\" มีเกล็ดแข็งปกคลุมผิวหนัง? 🐊 🆚 🐕 🆚 🐥",
      "en": "Which animal is a REPTILE covered in scales? 🐊 vs 🐕 vs 🐥",
      "zh": "下列哪一种动物属于“身体覆盖鳞甲的爬行动物”？🐊 🆚 🐕 🆚 🐥"
    },
    "illustration": "🐊 🐢 🦎",
    "illustrationSubtitle": {
      "th": "สัตว์เลื้อยคลาน",
      "en": "Reptiles: Crocodile",
      "zh": "爬行动物特征"
    },
    "options": [
      {
        "id": "opt-k1-inq-h7-1",
        "label": {
          "th": "สุนัขมีขนปุย",
          "en": "Fluffy dog",
          "zh": "长毛的小狗"
        },
        "icon": "🐕"
      },
      {
        "id": "opt-k1-inq-h7-2",
        "label": {
          "th": "ลูกเป็ดขนเหลือง",
          "en": "Duckling",
          "zh": "毛茸茸的小鸭"
        },
        "icon": "🐥"
      },
      {
        "id": "opt-k1-inq-h7-3",
        "label": {
          "th": "จระเข้ / กิ้งก่า 🐊",
          "en": "Crocodile / Lizard",
          "zh": "鳄鱼 / 蜥蜴 🐊"
        },
        "icon": "🐊"
      }
    ],
    "correctOptionId": "opt-k1-inq-h7-3",
    "explanation": {
      "th": "จระเข้และเต่าจัดเป็นสัตว์เลื้อยคลาน ผิวหนังมีเกล็ดปกคลุม เก่งมากครับ!",
      "en": "Awesome! Crocodiles and lizards are scaly reptiles.",
      "zh": "太棒了！鳄鱼和蜥蜴是爬行动物。"
    }
  },
  {
    "id": "k1-inq-h8",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "เมื่อเอามือไปแตะที่ \"ลำคอขณะกำลังส่งเสียงพูดหรือร้องเพลง\" 🗣️ มือจะรู้สึกอย่างไร?",
      "en": "Touch your throat while speaking or singing loudly 🗣️. What do you feel?",
      "zh": "当你大声说话或唱歌时，把手轻轻贴在喉咙上 🗣️，手会感觉到什么？"
    },
    "illustration": "🗣️ 📳 🗣️",
    "illustrationSubtitle": {
      "th": "การเกิดเสียงจากการสั่นสะเทือน",
      "en": "Sound comes from vibration",
      "zh": "发声原理：声带震动"
    },
    "options": [
      {
        "id": "opt-k1-inq-h8-1",
        "label": {
          "th": "รู้สึกมีการสั่นสะเทือนที่ลำคอ 📳",
          "en": "Feel vibration in throat",
          "zh": "感觉到喉咙声带有规律地轻微震动 📳"
        },
        "icon": "📳"
      },
      {
        "id": "opt-k1-inq-h8-2",
        "label": {
          "th": "มีน้ำแข็งงอกออกมาจากคอ",
          "en": "Ice growing",
          "zh": "脖子上长出冷冰块"
        },
        "icon": "🧊"
      },
      {
        "id": "opt-k1-inq-h8-3",
        "label": {
          "th": "คอจะลอยขึ้นไปบนฟ้า",
          "en": "Neck floats",
          "zh": "脖子飘向天空"
        },
        "icon": "🎈"
      }
    ],
    "correctOptionId": "opt-k1-inq-h8-1",
    "explanation": {
      "th": "เสียงเกิดจากการสั่นสะเทือนของเส้นเสียงในลำคอ เก่งมากครับ!",
      "en": "Correct! Sound is produced by vocal cords vibrating.",
      "zh": "答对了！声音是由喉部声带震动产生的。"
    }
  },
  {
    "id": "k1-inq-h9",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "ฤดูใดในประเทศไทยที่มี \"ฝนตกชุก ท้องฟ้ามืดครึ้ม ต้นไม้เขียวชอุ่ม\"? 🌧️",
      "en": "Which season in Thailand has frequent rains, dark clouds, and lush greens? 🌧️",
      "zh": "泰国气候常识：降雨充沛、雷雨连连、草木格外苍翠的季节是哪一个？🌧️"
    },
    "illustration": "🌧️ ☔ 🌧️",
    "illustrationSubtitle": {
      "th": "ฤดูฝนในประเทศไทย",
      "en": "Rainy season",
      "zh": "热带雨季"
    },
    "options": [
      {
        "id": "opt-k1-inq-h9-1",
        "label": {
          "th": "ฤดูร้อนแดดเปรี้ยง",
          "en": "Hot dry summer",
          "zh": "炎热少雨的夏季"
        },
        "icon": "☀️"
      },
      {
        "id": "opt-k1-inq-h9-2",
        "label": {
          "th": "ฤดูฝน 🌧️",
          "en": "Rainy season",
          "zh": "绿意盎然的雨季 🌧️"
        },
        "icon": "🌧️"
      },
      {
        "id": "opt-k1-inq-h9-3",
        "label": {
          "th": "ฤดูหิมะตกหนัก",
          "en": "Snow blizzard",
          "zh": "大雪纷飞的寒冬"
        },
        "icon": "❄️"
      }
    ],
    "correctOptionId": "opt-k1-inq-h9-2",
    "explanation": {
      "th": "ฤดูฝนมีเมฆฝน พืชได้รับน้ำอุดมสมบูรณ์ เก่งมากครับ!",
      "en": "Spot on! The rainy season brings abundant water for nature.",
      "zh": "太棒啦！雨季雨水充沛，滋养万物。"
    }
  },
  {
    "id": "k1-inq-h10",
    "grade": "K1",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "ดักแด้ตัวน้อยที่เกาะนิ่งบนกิ่งไม้ 🐛 ในอนาคตจะเปลี่ยนแปลงกลายเป็นสิ่งใด?",
      "en": "A chrysalis / cocoon hanging on a twig 🐛. What does it become?",
      "zh": "挂在树枝上静止不动的蛹 🐛，破茧而出后会蜕变成什么美丽的生灵？"
    },
    "illustration": "🐛 ➡️ 🦋",
    "illustrationSubtitle": {
      "th": "วงจรชีวิตของผีเสื้อ",
      "en": "Butterfly life cycle",
      "zh": "蝴蝶变态发育：破茧成蝶"
    },
    "options": [
      {
        "id": "opt-k1-inq-h10-1",
        "label": {
          "th": "ลูกอ๊อดว่ายน้ำ",
          "en": "Tadpole",
          "zh": "小蝌蚪"
        },
        "icon": "🐸"
      },
      {
        "id": "opt-k1-inq-h10-2",
        "label": {
          "th": "ลูกเจี๊ยบ",
          "en": "Chick",
          "zh": "黄色小鸡"
        },
        "icon": "🐥"
      },
      {
        "id": "opt-k1-inq-h10-3",
        "label": {
          "th": "ผีเสื้อแสนสวย 🦋",
          "en": "Beautiful butterfly",
          "zh": "美丽翩跹的彩蝶 🦋"
        },
        "icon": "🦋"
      }
    ],
    "correctOptionId": "opt-k1-inq-h10-3",
    "explanation": {
      "th": "หนอนกลายเป็นดักแด้ แล้วกางปีกเป็นผีเสื้อแสนสวย เก่งมากครับ!",
      "en": "Right! Caterpillars form a chrysalis and emerge as butterflies.",
      "zh": "答对啦！破茧化作美丽的蝴蝶。"
    }
  },
  {
    "id": "k2-inq-e1",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "สัตว์ครึ่งบกครึ่งน้ำ เช่น \"กบ\" 🐸 มีวัยเด็กที่อาศัยอยู่ในน้ำเรียกว่าอะไร?",
      "en": "Amphibians like frogs 🐸 have a baby water stage called what?",
      "zh": "两栖动物青蛙 🐸 幼年时期生活在水中、拖着小尾巴的小生命叫什么？"
    },
    "illustration": "🐸 🫧 🐸",
    "illustrationSubtitle": {
      "th": "วงจรชีวิตของกบ: ลูกอ๊อด",
      "en": "Frog lifecycle: Tadpole",
      "zh": "青蛙生命周期：小蝌蚪"
    },
    "options": [
      {
        "id": "opt-k2-inq-e1-1",
        "label": {
          "th": "ลูกอ๊อด (มีหางว่ายน้ำ)",
          "en": "Tadpole (has tail)",
          "zh": "小蝌蚪（游水长尾巴）"
        },
        "icon": "🫧"
      },
      {
        "id": "opt-k2-inq-e1-2",
        "label": {
          "th": "ลูกหนอน",
          "en": "Caterpillar",
          "zh": "毛毛虫"
        },
        "icon": "🐛"
      },
      {
        "id": "opt-k2-inq-e1-3",
        "label": {
          "th": "ลูกปลาทู",
          "en": "Mackerel fry",
          "zh": "小沙丁鱼"
        },
        "icon": "🐟"
      }
    ],
    "correctOptionId": "opt-k2-inq-e1-1",
    "explanation": {
      "th": "ลูกอ๊อดว่ายน้ำในบ่อ ก่อนจะหดหางและกระโดดขึ้นบกเป็นกบ เก่งมากครับ!",
      "en": "Correct! Frogs hatch from eggs as swimming tadpoles.",
      "zh": "答对了！青蛙的幼体是水中游泳的小蝌蚪。"
    }
  },
  {
    "id": "k2-inq-e2",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "ส่วนประกอบใดของดอกไม้ที่มีสีสันสวยงามและส่งกลิ่นหอมเพื่อ \"ล่อแมลงมาผสมเกสร\"? 🌸",
      "en": "Which colorful part of a flower attracts bees and insects for pollination? 🌸",
      "zh": "花朵上色彩最艳丽、散发阵阵芬芳、专门吸引蜜蜂蝴蝶传粉的是什么部位？🌸"
    },
    "illustration": "🌸 🐝 🌸",
    "illustrationSubtitle": {
      "th": "ส่วนประกอบของดอก: กลีบดอก",
      "en": "Flower petals",
      "zh": "花朵结构：花瓣"
    },
    "options": [
      {
        "id": "opt-k2-inq-e2-1",
        "label": {
          "th": "รากใต้ดิน",
          "en": "Roots underground",
          "zh": "地底下的粗根"
        },
        "icon": "🪴"
      },
      {
        "id": "opt-k2-inq-e2-2",
        "label": {
          "th": "กลีบดอกไม้ 🌸",
          "en": "Flower petals",
          "zh": "艳丽芬芳的花瓣 🌸"
        },
        "icon": "🌸"
      },
      {
        "id": "opt-k2-inq-e2-3",
        "label": {
          "th": "ก้อนดิน",
          "en": "Soil lump",
          "zh": "泥土块"
        },
        "icon": "🟤"
      }
    ],
    "correctOptionId": "opt-k2-inq-e2-2",
    "explanation": {
      "th": "กลีบดอกมีสีสันสดใสชวนให้ผึ้งและผีเสื้อบินมาดูดน้ำหวาน เก่งมากครับ!",
      "en": "Right! Bright petals attract pollinating insects.",
      "zh": "答对啦！花瓣鲜艳芳香，吸引昆虫传粉。"
    }
  },
  {
    "id": "k2-inq-e3",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "เมื่อเราเปิด \"ไฟฉาย\" 🔦 ส่องไปข้างหน้า สิ่งที่พุ่งออกจากไฟฉายคืออะไร?",
      "en": "Turn on a flashlight 🔦. What travels forward in a straight line?",
      "zh": "按下手电筒 🔦 开关，从灯头沿直线向前射出照亮暗处的是什么？"
    },
    "illustration": "🔦 💡 🔦",
    "illustrationSubtitle": {
      "th": "แสงเดินทางเป็นเส้นตรง",
      "en": "Light travels straight",
      "zh": "光线沿直线传播"
    },
    "options": [
      {
        "id": "opt-k2-inq-e3-1",
        "label": {
          "th": "ลมหนาวพัดกรู",
          "en": "Cold breeze",
          "zh": "寒冷的风"
        },
        "icon": "🍃"
      },
      {
        "id": "opt-k2-inq-e3-2",
        "label": {
          "th": "หยดน้ำเย็น",
          "en": "Water spray",
          "zh": "喷水珠"
        },
        "icon": "💦"
      },
      {
        "id": "opt-k2-inq-e3-3",
        "label": {
          "th": "ลำแสงสว่าง 💡",
          "en": "Beam of light",
          "zh": "明亮的光束 / 光线 💡"
        },
        "icon": "💡"
      }
    ],
    "correctOptionId": "opt-k2-inq-e3-3",
    "explanation": {
      "th": "ไฟฉายปล่อยลำแสงสว่างเพื่อช่วยให้เรามองเห็นในที่มืด เก่งมากครับ!",
      "en": "Spot on! Flashlights project a beam of light.",
      "zh": "太棒了！手电筒发出笔直的光线照亮黑暗。"
    }
  },
  {
    "id": "k2-inq-e4",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "แมลงทั่วไป เช่น มด หรือ ผึ้ง 🐜 🐝 มีจำนวนขาทั้งหมดกี่ขา?",
      "en": "How many legs do typical adult insects (ants, bees) have? 🐜 🐝",
      "zh": "绝大多数昆虫（比如蚂蚁、蜜蜂、蝴蝶）成虫一共有几条腿？🐜 🐝"
    },
    "illustration": "🐜 🔬 🐜",
    "illustrationSubtitle": {
      "th": "ลักษณะของแมลง: มี 6 ขา",
      "en": "Insects have 6 legs",
      "zh": "昆虫特征：6条腿"
    },
    "options": [
      {
        "id": "opt-k2-inq-e4-1",
        "label": {
          "th": "6 ขา 🐜",
          "en": "6 legs",
          "zh": "6 条腿（3对足）🐜"
        },
        "icon": "6️⃣"
      },
      {
        "id": "opt-k2-inq-e4-2",
        "label": {
          "th": "4 ขา",
          "en": "4 legs",
          "zh": "4 条腿"
        },
        "icon": "4️⃣"
      },
      {
        "id": "opt-k2-inq-e4-3",
        "label": {
          "th": "8 ขา",
          "en": "8 legs",
          "zh": "8 条腿"
        },
        "icon": "8️⃣"
      }
    ],
    "correctOptionId": "opt-k2-inq-e4-1",
    "explanation": {
      "th": "แมลงทุกชนิดมี 6 ขา และแบ่งลำตัวเป็น 3 ส่วน เก่งมากครับ!",
      "en": "Correct! Insects have 6 jointed legs.",
      "zh": "答对了！昆虫的标志性特征是有 6 条腿。"
    }
  },
  {
    "id": "k2-inq-e5",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "ปรากฏการณ์ธรรมชาติใดที่มีแถบสี 7 สีโค้งพาดผ่านท้องฟ้าหลังฝนตกแดดออก? 🌈",
      "en": "What 7-colored arch appears in the sky when sun shines after rain? 🌈",
      "zh": "大雨初晴、阳光洒在水汽弥漫的天空中时，出现的七彩美丽光弧叫什么？🌈"
    },
    "illustration": "🌈 🌦️ 🌈",
    "illustrationSubtitle": {
      "th": "รุ้งกินน้ำ 7 สี",
      "en": "Rainbow: 7 colors",
      "zh": "天边美丽的七色彩虹"
    },
    "options": [
      {
        "id": "opt-k2-inq-e5-1",
        "label": {
          "th": "พายุหิมะ",
          "en": "Snowstorm",
          "zh": "暴风雪"
        },
        "icon": "❄️"
      },
      {
        "id": "opt-k2-inq-e5-2",
        "label": {
          "th": "รุ้งกินน้ำ 🌈",
          "en": "Rainbow",
          "zh": "七色彩虹 🌈"
        },
        "icon": "🌈"
      },
      {
        "id": "opt-k2-inq-e5-3",
        "label": {
          "th": "ภูเขาไฟระเบิด",
          "en": "Volcano",
          "zh": "火山爆发"
        },
        "icon": "🌋"
      }
    ],
    "correctOptionId": "opt-k2-inq-e5-2",
    "explanation": {
      "th": "รุ้งกินน้ำเกิดจากแสงอาทิตย์หักเหผ่านละอองน้ำในอากาศ เก่งมากครับ!",
      "en": "Awesome! Rainbows form when light refracts in water droplets.",
      "zh": "太棒了！彩虹在雨过天晴时展现七彩光辉。"
    }
  },
  {
    "id": "k2-inq-e6",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "สัตว์ชนิดใดจัดเป็น \"สัตว์เลี้ยงลูกด้วยน้ำนม\"? 🐄 🆚 🐟 🆚 🐸",
      "en": "Which animal is a MAMMAL that nurses its young with milk? 🐄 vs 🐟 vs 🐸",
      "zh": "下列哪一种动物属于“用甘甜乳汁哺育幼崽的哺乳动物”？🐄 🆚 🐟 🆚 🐸"
    },
    "illustration": "🐄 🥛 🐄",
    "illustrationSubtitle": {
      "th": "สัตว์เลี้ยงลูกด้วยนม: วัว",
      "en": "Mammals nurse with milk",
      "zh": "哺乳动物特征：母乳哺育"
    },
    "options": [
      {
        "id": "opt-k2-inq-e6-1",
        "label": {
          "th": "กบเขียว",
          "en": "Green frog",
          "zh": "绿色青蛙"
        },
        "icon": "🐸"
      },
      {
        "id": "opt-k2-inq-e6-2",
        "label": {
          "th": "ปลากัด",
          "en": "Betta fish",
          "zh": "斗鱼"
        },
        "icon": "🐟"
      },
      {
        "id": "opt-k2-inq-e6-3",
        "label": {
          "th": "แม่วัว 🐄",
          "en": "Cow",
          "zh": "母牛 / 奶牛 🐄"
        },
        "icon": "🐄"
      }
    ],
    "correctOptionId": "opt-k2-inq-e6-3",
    "explanation": {
      "th": "วัวออกลูกเป็นตัวและเลี้ยงลูกด้วยน้ำนมแม่ เก่งมากครับ!",
      "en": "Right! Cows give birth to live calves and produce milk.",
      "zh": "答对啦！奶牛生小牛并用母乳哺育。"
    }
  },
  {
    "id": "k2-inq-e7",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "เมื่อต้มน้ำในกาจนร้อนจัด ♨️ จะมีไอน้ำสีขาวลอยขึ้นมา ไอน้ำนั้นจัดเป็นสถานะใด?",
      "en": "Boiling water kettle ♨️ produces rising white steam. What state is steam?",
      "zh": "烧开水的水壶 ♨️ 冒出滚滚白色热气，水蒸气属于物质的哪种状态？"
    },
    "illustration": "♨️ 💨 ♨️",
    "illustrationSubtitle": {
      "th": "สถานะของสสาร: ก๊าซ (ไอน้ำ)",
      "en": "State of matter: Gas / Steam",
      "zh": "物态变化：气态水蒸气"
    },
    "options": [
      {
        "id": "opt-k2-inq-e7-1",
        "label": {
          "th": "ก๊าซ / ไอระเหย 💨",
          "en": "Gas / Vapor",
          "zh": "气体 / 水蒸气 💨"
        },
        "icon": "💨"
      },
      {
        "id": "opt-k2-inq-e7-2",
        "label": {
          "th": "ของแข็งแข็งเป๊ก",
          "en": "Solid hard",
          "zh": "坚硬的固体"
        },
        "icon": "🧱"
      },
      {
        "id": "opt-k2-inq-e7-3",
        "label": {
          "th": "ผงทราย",
          "en": "Sand powder",
          "zh": "干燥粉末"
        },
        "icon": "🟤"
      }
    ],
    "correctOptionId": "opt-k2-inq-e7-1",
    "explanation": {
      "th": "ไอน้ำคือน้ำที่เปลี่ยนสถานะกลายเป็นก๊าซลอยตัวในอากาศ เก่งมากครับ!",
      "en": "Spot on! Steam is water in gaseous vapor state.",
      "zh": "太棒了！水蒸气是水受热变成的气态。"
    }
  },
  {
    "id": "k2-inq-e8",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "โลกของเรา 🌍 หมุนรอบตัวเองทำให้เกิดปรากฏการณ์สำคัญใด?",
      "en": "The Earth 🌍 rotates on its axis, causing what daily cycle?",
      "zh": "我们居住的地球 🌍 自西向东不停自转，导致了什么重要的日常自然现象？"
    },
    "illustration": "🌍 ☀️ 🌙",
    "illustrationSubtitle": {
      "th": "การหมุนรอบตัวเองของโลก: กลางวันและกลางคืน",
      "en": "Day & Night cycle from Earth rotation",
      "zh": "地球自转产生昼夜交替"
    },
    "options": [
      {
        "id": "opt-k2-inq-e8-1",
        "label": {
          "th": "น้ำทะเลแห้งหายไปหมด",
          "en": "Oceans vanish",
          "zh": "海水全部蒸发干涸"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-inq-e8-2",
        "label": {
          "th": "กลางวันและกลางคืน ☀️ 🌙",
          "en": "Day and Night cycle",
          "zh": "昼夜交替（白天与黑夜）☀️ 🌙"
        },
        "icon": "🌍"
      },
      {
        "id": "opt-k2-inq-e8-3",
        "label": {
          "th": "ต้นไม้เดินได้",
          "en": "Trees walking",
          "zh": "树木长出双脚走路"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-inq-e8-2",
    "explanation": {
      "th": "ด้านที่หันหาดวงอาทิตย์เป็นกลางวัน ด้านที่หันหนีเป็นกลางคืน เก่งมากครับ!",
      "en": "Correct! Earth's rotation creates the cycle of day and night.",
      "zh": "答对了！地球自转使得朝向太阳的一面是白天，背光面是黑夜。"
    }
  },
  {
    "id": "k2-inq-e9",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "พืชมี \"ใบไม้สีเขียว\" 🍃 เพราะมีสารสีพิเศษช่วยสร้างอาหาร สารนั้นชื่ออะไร?",
      "en": "Leaves are green 🍃 due to a pigment that helps make plant food. What is it?",
      "zh": "大多数植物的叶子都呈现青翠的绿色 🍃，是因为含有一种制造养分的光合色素，它叫？"
    },
    "illustration": "🍃 🔬 🍃",
    "illustrationSubtitle": {
      "th": "สารคลอโรฟิลล์ในใบไม้",
      "en": "Chlorophyll pigment",
      "zh": "植物叶绿素"
    },
    "options": [
      {
        "id": "opt-k2-inq-e9-1",
        "label": {
          "th": "สีโปสเตอร์",
          "en": "Poster paint",
          "zh": "水粉广告色"
        },
        "icon": "🎨"
      },
      {
        "id": "opt-k2-inq-e9-2",
        "label": {
          "th": "น้ำตาลทราย",
          "en": "White sugar",
          "zh": "食用白砂糖"
        },
        "icon": "🧂"
      },
      {
        "id": "opt-k2-inq-e9-3",
        "label": {
          "th": "คลอโรฟิลล์ (Chlorophyll) 🍃",
          "en": "Chlorophyll",
          "zh": "叶绿素 🍃"
        },
        "icon": "🍃"
      }
    ],
    "correctOptionId": "opt-k2-inq-e9-3",
    "explanation": {
      "th": "คลอโรฟิลล์ดักจับพลังงานแสงอาทิตย์มาสร้างอาหารให้พืช เก่งมากครับ!",
      "en": "Awesome! Chlorophyll absorbs sunlight for photosynthesis.",
      "zh": "太棒了！叶绿素帮助植物吸收阳光进行光合作用。"
    }
  },
  {
    "id": "k2-inq-e10",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "สัตว์ชนิดใดใช้ \"กระดองแข็งแกร่งบนหลัง\" ปกป้องตัวเองจากศัตรู? 🐢",
      "en": "Which animal retreats into a strong shell on its back for protection? 🐢",
      "zh": "哪一种行动从容的动物背着坚硬厚重的保护壳，遇到危险会缩头缩脚？🐢"
    },
    "illustration": "🐢 🛡️ 🐢",
    "illustrationSubtitle": {
      "th": "การปรับตัวของสัตว์: เต่าและกระดอง",
      "en": "Animal defense: Turtle shell",
      "zh": "动物自我防御：乌龟硬壳"
    },
    "options": [
      {
        "id": "opt-k2-inq-e10-1",
        "label": {
          "th": "เต่า 🐢",
          "en": "Turtle",
          "zh": "小乌龟 🐢"
        },
        "icon": "🐢"
      },
      {
        "id": "opt-k2-inq-e10-2",
        "label": {
          "th": "ลิงจ๋อ",
          "en": "Monkey",
          "zh": "调皮小猴"
        },
        "icon": "🐒"
      },
      {
        "id": "opt-k2-inq-e10-3",
        "label": {
          "th": "เสือโคร่ง",
          "en": "Tiger",
          "zh": "威猛大老虎"
        },
        "icon": "🐅"
      }
    ],
    "correctOptionId": "opt-k2-inq-e10-1",
    "explanation": {
      "th": "กระดองเต่าทำจากกระดูกแข็งแรง ช่วยกำบังอันตราย เก่งมากครับ!",
      "en": "Right! Turtle shells protect their soft bodies.",
      "zh": "答对啦！坚硬的龟壳是乌龟天生的防身铠甲。"
    }
  },
  {
    "id": "k2-inq-m1",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "เมื่อตีกลอง 🥁 แล้วเอานิ้วไปแตะที่หน้ากลองเบาๆ เราจะรู้สึกถึงอะไร?",
      "en": "Hit a drum 🥁 and gently touch the drumskin. What do you feel?",
      "zh": "重重敲击一面大鼓 🥁 后把手指轻放在鼓面上，会感受到什么？"
    },
    "illustration": "🥁 📳 🥁",
    "illustrationSubtitle": {
      "th": "การสั่นสะเทือนของแหล่งกำเนิดเสียง",
      "en": "Vibrating drum surface",
      "zh": "声音震动原理"
    },
    "options": [
      {
        "id": "opt-k2-inq-m1-1",
        "label": {
          "th": "หน้ากลองกลายเป็นไอศกรีม",
          "en": "Turns into ice cream",
          "zh": "鼓皮变成了冰淇淋"
        },
        "icon": "🍦"
      },
      {
        "id": "opt-k2-inq-m1-2",
        "label": {
          "th": "หน้ากลองกำลังสั่นสะเทือนถี่ๆ 📳",
          "en": "Drum skin vibrating rapidly",
          "zh": "鼓面正在快速轻微震动 📳"
        },
        "icon": "📳"
      },
      {
        "id": "opt-k2-inq-m1-3",
        "label": {
          "th": "ไม่มีความรู้สึกอะไรเลยนิ่งสนิท",
          "en": "Completely still",
          "zh": "纹丝不动没有任何动静"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-inq-m1-2",
    "explanation": {
      "th": "เสียงกลองเกิดจากการสั่นสะเทือนของหน้ากลองและอากาศ เก่งมากครับ!",
      "en": "Correct! Sound is vibration travelling through air.",
      "zh": "答对了！敲击使鼓面震动，带动空气振动产生声音。"
    }
  },
  {
    "id": "k2-inq-m2",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "ทำไม \"เรือสำเภาลำใหญ่ที่ทำจากเหล็ก\" 🚢 จึงสามารถลอยอยู่บนผิวน้ำทะเลได้?",
      "en": "Why can a huge, heavy steel ship 🚢 float on ocean water?",
      "zh": "庞大沉重的不锈钢钢铁巨轮 🚢 为什么能在汹涌的大海中安然漂浮？"
    },
    "illustration": "🚢 🌊 🚢",
    "illustrationSubtitle": {
      "th": "แรงลอยตัวและรูปร่างของเรือ",
      "en": "Buoyancy and displacement",
      "zh": "浮力原理与空腔排水"
    },
    "options": [
      {
        "id": "opt-k2-inq-m2-1",
        "label": {
          "th": "เพราะมีปลาช่วยกันแบกไว้ใต้ท้องเรือ",
          "en": "Fish carry it underneath",
          "zh": "成千上万条小鱼在底下用背驮着"
        },
        "icon": "🐟"
      },
      {
        "id": "opt-k2-inq-m2-2",
        "label": {
          "th": "เพราะน้ำทะเลยึดแม่เหล็กไว้",
          "en": "Magnets in ocean",
          "zh": "因为海底装有大磁铁吸住"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-inq-m2-3",
        "label": {
          "th": "เรือมีท้องเรือกลวงกักเก็บอากาศไว้มาก ทำให้เบากว่าปริมาตรน้ำที่ถูกแทนที่ 🚢",
          "en": "Hollow shape traps air, creating buoyant force",
          "zh": "船体设计成巨大中空结构，充满空气产生巨大浮力 🚢"
        },
        "icon": "🚢"
      }
    ],
    "correctOptionId": "opt-k2-inq-m2-3",
    "explanation": {
      "th": "รูปทรงท้องเรือที่กลวงและกว้างช่วยสร้างแรงลอยตัวมหาศาล เก่งมากครับ!",
      "en": "Awesome! Hollow shape displaces water, creating buoyant upward force.",
      "zh": "太棒了！中空船身排开大量水，产生的浮力大于重力。"
    }
  },
  {
    "id": "k2-inq-m3",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "สัตว์ชนิดใดจัดเป็น \"แมลงปีกแข็ง\" มีเปลือกเงางามบนแผ่นหลัง? 🪲",
      "en": "Which insect is a BEETLE with shiny hard wing covers? 🪲",
      "zh": "哪一种小昆虫属于“甲虫”，背上长着硬如坚盔的外壳？🪲"
    },
    "illustration": "🪲 🔬 🪲",
    "illustrationSubtitle": {
      "th": "แมลงปีกแข็ง: ด้วงกว่าง",
      "en": "Beetle insect",
      "zh": "硬翅昆虫：甲虫"
    },
    "options": [
      {
        "id": "opt-k2-inq-m3-1",
        "label": {
          "th": "ด้วงกว่าง / แมลงเต่าทอง 🪲",
          "en": "Rhinoceros beetle / Ladybug",
          "zh": "独角仙甲虫 / 瓢虫 🪲"
        },
        "icon": "🪲"
      },
      {
        "id": "opt-k2-inq-m3-2",
        "label": {
          "th": "แมงมุม 8 ขา",
          "en": "Spider (8 legs)",
          "zh": "八条腿的蜘蛛"
        },
        "icon": "🕷️"
      },
      {
        "id": "opt-k2-inq-m3-3",
        "label": {
          "th": "ไส้เดือน",
          "en": "Earthworm",
          "zh": "软绵绵的蚯蚓"
        },
        "icon": "🪱"
      }
    ],
    "correctOptionId": "opt-k2-inq-m3-1",
    "explanation": {
      "th": "ด้วงและแมลงเต่าทองมีปีกแข็งปกป้องปีกบินบางๆ ด้านใน เก่งมากครับ!",
      "en": "Right! Beetles have tough protective elytra shell covers.",
      "zh": "答对啦！独角仙和瓢虫都是背覆硬甲的甲虫。"
    }
  },
  {
    "id": "k2-inq-m4",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "เมื่อนำวัตถุสีเข้มไปวาง \"กลางแดดจ้า\" เทียบกับวัตถุสีขาว ☀️ วัตถุชิ้นใดจะร้อนเร็วกว่า?",
      "en": "Place black vs white objects in blazing sun ☀️. Which gets HOTTER faster?",
      "zh": "烈日暴晒下同时放一块“深黑色毛巾”和一块“洁白毛巾” ☀️，哪一块吸热升温更快？"
    },
    "illustration": "☀️ ⬛ ⬜",
    "illustrationSubtitle": {
      "th": "การดูดกลืนความร้อนของสี",
      "en": "Dark colors absorb more heat",
      "zh": "深色与浅色物体的吸热性能"
    },
    "options": [
      {
        "id": "opt-k2-inq-m4-1",
        "label": {
          "th": "วัตถุสีขาวบริสุทธิ์",
          "en": "Pure white object",
          "zh": "白色反光物体"
        },
        "icon": "⬜"
      },
      {
        "id": "opt-k2-inq-m4-2",
        "label": {
          "th": "วัตถุสีเข้ม (สีดำ) ⬛",
          "en": "Dark black object",
          "zh": "深黑色物体（吸热快）⬛"
        },
        "icon": "⬛"
      },
      {
        "id": "opt-k2-inq-m4-3",
        "label": {
          "th": "ทั้งสองชิ้นเย็นเป็นน้ำแข็ง",
          "en": "Both stay cold as ice",
          "zh": "两件都冷得结冰"
        },
        "icon": "🧊"
      }
    ],
    "correctOptionId": "opt-k2-inq-m4-2",
    "explanation": {
      "th": "สีเข้มดูดกลืนรังสีความร้อนจากแสงแดดได้ดีกว่าสีอ่อน เก่งมากครับ!",
      "en": "Correct! Dark colors absorb more solar radiation.",
      "zh": "答对了！深色物体吸收光热能力更强，升温迅速。"
    }
  },
  {
    "id": "k2-inq-m5",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "เครื่องมือวิทยาศาสตร์ชนิดใดช่วยให้เรา \"ส่องดูมดตัวจิ๋วให้ขยายใหญ่ชัดเจน\"? 🔍",
      "en": "Which scientific tool magnifies tiny ants so we can examine them clearly? 🔍",
      "zh": "哪一种便携的光学科学小仪器能帮我们把“细小的蚂蚁触角放大看得清清楚楚”？🔍"
    },
    "illustration": "🔍 🐜 🔍",
    "illustrationSubtitle": {
      "th": "แว่นขยายช่วยส่องดูสิ่งเล็กๆ",
      "en": "Magnifying glass",
      "zh": "放大镜观察微观细节"
    },
    "options": [
      {
        "id": "opt-k2-inq-m5-1",
        "label": {
          "th": "ช้อนส้อม",
          "en": "Fork & spoon",
          "zh": "吃面的铁叉"
        },
        "icon": "🍴"
      },
      {
        "id": "opt-k2-inq-m5-2",
        "label": {
          "th": "ไม้บรรทัดเหล็ก",
          "en": "Steel ruler",
          "zh": "铁尺子"
        },
        "icon": "📏"
      },
      {
        "id": "opt-k2-inq-m5-3",
        "label": {
          "th": "แว่นขยาย 🔍",
          "en": "Magnifying glass",
          "zh": "放大镜 🔍"
        },
        "icon": "🔍"
      }
    ],
    "correctOptionId": "opt-k2-inq-m5-3",
    "explanation": {
      "th": "แว่นขยายมีเลนส์นูนรวมแสงช่วยขยายภาพสิ่งเล็กๆ ให้ใหญ่ขึ้น เก่งมากครับ!",
      "en": "Spot on! Convex lenses in magnifying glasses enlarge tiny details.",
      "zh": "太棒了！凸透镜做成的放大镜能放大细小物体。"
    }
  },
  {
    "id": "k2-inq-m6",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "สัตว์ชนิดใดมีกระเป๋าหน้าท้องสำหรับ \"อุ้มเลี้ยงลูกน้อย\"? 🦘",
      "en": "Which Australian animal carries its baby joey in a front pouch? 🦘",
      "zh": "哪一种大洋洲特有的袋类动物肚皮前长着温暖育儿袋，随身保护小宝宝？🦘"
    },
    "illustration": "🦘 🐾 🦘",
    "illustrationSubtitle": {
      "th": "สัตว์มีกระเป๋าหน้าท้อง: จิงโจ้",
      "en": "Marsupials: Kangaroo pouch",
      "zh": "有袋类动物：袋鼠妈妈"
    },
    "options": [
      {
        "id": "opt-k2-inq-m6-1",
        "label": {
          "th": "จิงโจ้ 🦘",
          "en": "Kangaroo",
          "zh": "袋鼠 🦘"
        },
        "icon": "🦘"
      },
      {
        "id": "opt-k2-inq-m6-2",
        "label": {
          "th": "ช้างแอฟริกา",
          "en": "African elephant",
          "zh": "非洲大象"
        },
        "icon": "🐘"
      },
      {
        "id": "opt-k2-inq-m6-3",
        "label": {
          "th": "เสือชีตาห์",
          "en": "Cheetah",
          "zh": "猎豹"
        },
        "icon": "🐆"
      }
    ],
    "correctOptionId": "opt-k2-inq-m6-1",
    "explanation": {
      "th": "จิงโจ้และโคอาล่าเป็นสัตว์มีกระเป๋าหน้าท้องดูแลลูก เก่งมากครับ!",
      "en": "Awesome! Kangaroos are marsupials with maternal pouches.",
      "zh": "答对啦！袋鼠妈妈用腹部育儿袋保护小幼崽。"
    }
  },
  {
    "id": "k2-inq-m7",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "เมื่อน้ำในหม้อเดือดพล่านระเหยเป็นไอขึ้นไปกระทบ \"ฝาหม้อที่เย็น\" จะเกิดสิ่งใดเกาะอยู่ใต้ฝา? 💧",
      "en": "Steam hits a cool pot lid. What forms underneath the lid? 💧",
      "zh": "滚沸的水蒸气升腾，遇到“冰凉的金属锅盖”表面冷凝时，锅盖内侧会凝结出什么？💧"
    },
    "illustration": "♨️ ➡️ 💧",
    "illustrationSubtitle": {
      "th": "การควบแน่นของไอน้ำกลายเป็นหยดน้ำ",
      "en": "Condensation: Steam to droplets",
      "zh": "气体冷凝成液体水珠"
    },
    "options": [
      {
        "id": "opt-k2-inq-m7-1",
        "label": {
          "th": "ก้อนดินเหนียว",
          "en": "Clay mud",
          "zh": "泥土块"
        },
        "icon": "🟤"
      },
      {
        "id": "opt-k2-inq-m7-2",
        "label": {
          "th": "หยดน้ำกลมๆ เกาะเต็มฝาหม้อ 💧",
          "en": "Droplets of condensed water",
          "zh": "晶莹剔透的水珠滴流 💧"
        },
        "icon": "💧"
      },
      {
        "id": "opt-k2-inq-m7-3",
        "label": {
          "th": "ก้อนหินแข็ง",
          "en": "Hard rocks",
          "zh": "硬石头"
        },
        "icon": "🪨"
      }
    ],
    "correctOptionId": "opt-k2-inq-m7-2",
    "explanation": {
      "th": "ไอน้ำร้อนเมื่อกระทบความเย็นจะควบแน่นกลายเป็นหยดน้ำ เก่งมากครับ!",
      "en": "Correct! Warm vapor condenses into liquid drops on cool surfaces.",
      "zh": "答对了！水蒸气遇冷凝结成了液态水滴。"
    }
  },
  {
    "id": "k2-inq-m8",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "ต้นกระบองเพชร 🌵 สามารถเติบโตในทะเลทรายที่แห้งแล้งได้เพราะปรับ \"ใบ\" ให้กลายเป็นสิ่งใด?",
      "en": "Desert cactus 🌵 survives harsh dry heat by transforming leaves into what?",
      "zh": "在干旱炎热的沙漠里，仙人掌 🌵 为了减少水分蒸发，把叶子退化演变成了什么？"
    },
    "illustration": "🌵 🏜️ 🌵",
    "illustrationSubtitle": {
      "th": "การปรับตัวของพืชทะเลทราย: กระบองเพชร",
      "en": "Cactus adaptation: Spines",
      "zh": "仙人掌环境适应：针刺叶"
    },
    "options": [
      {
        "id": "opt-k2-inq-m8-1",
        "label": {
          "th": "แผ่นปีกบิน",
          "en": "Wings",
          "zh": "大飞翅"
        },
        "icon": "🪶"
      },
      {
        "id": "opt-k2-inq-m8-2",
        "label": {
          "th": "ดอกไม้กลีบหนา",
          "en": "Thick petals",
          "zh": "肥大花瓣"
        },
        "icon": "🌸"
      },
      {
        "id": "opt-k2-inq-m8-3",
        "label": {
          "th": "หนามแหลมคม 🌵",
          "en": "Sharp spines / thorns",
          "zh": "尖锐防水分流失的针刺 🌵"
        },
        "icon": "🌵"
      }
    ],
    "correctOptionId": "opt-k2-inq-m8-3",
    "explanation": {
      "th": "หนามของกระบองเพชรช่วยลดการคายน้ำและป้องกันสัตว์มากัดกิน เก่งมากครับ!",
      "en": "Spot on! Cactus spines reduce water evaporation in deserts.",
      "zh": "太棒了！针状刺极大减少了水分蒸腾，还能防动物啃咬。"
    }
  },
  {
    "id": "k2-inq-m9",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "สัตว์ชนิดใดจัดเป็นสัตว์กินพืช (กินเฉพาะหญ้าและใบไม้เป็นอาหาร)? 🦓 🆚 🦁 🆚 🐊",
      "en": "Which animal is a HERBIVORE (eats only grass and plants)? 🦓 vs 🦁 vs 🐊",
      "zh": "下列哪一种食草动物“只吃青草嫩叶植物”，从不捕杀其他动物？🦓 🆚 🦁 🆚 🐊"
    },
    "illustration": "🦓 🌿 🦁",
    "illustrationSubtitle": {
      "th": "สัตว์กินพืช สัตว์กินเนื้อ",
      "en": "Herbivore vs Carnivore",
      "zh": "食草动物与食肉动物"
    },
    "options": [
      {
        "id": "opt-k2-inq-m9-1",
        "label": {
          "th": "ม้าลาย / กระต่าย 🦓",
          "en": "Zebra / Rabbit",
          "zh": "斑马 / 小兔子 🦓"
        },
        "icon": "🦓"
      },
      {
        "id": "opt-k2-inq-m9-2",
        "label": {
          "th": "สิงโตเจ้าป่า",
          "en": "Lion",
          "zh": "草原雄狮"
        },
        "icon": "🦁"
      },
      {
        "id": "opt-k2-inq-m9-3",
        "label": {
          "th": "จระเข้น้ำเค็ม",
          "en": "Saltwater crocodile",
          "zh": "咸水鳄鱼"
        },
        "icon": "🐊"
      }
    ],
    "correctOptionId": "opt-k2-inq-m9-1",
    "explanation": {
      "th": "ม้าลาย ช้าง ยีราฟ เป็นสัตว์กินพืช ฟันมีลักษณะบดเคี้ยวหญ้า เก่งมากครับ!",
      "en": "Right! Zebras are herbivores that feed on grasses.",
      "zh": "答对啦！斑马和兔子是典型的温和食草动物。"
    }
  },
  {
    "id": "k2-inq-m10",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "แรงโน้มถ่วงของโลก (Gravity) 🍎 มีหน้าที่อย่างไรต่อสิ่งต่างๆ บนโลก?",
      "en": "What does Earth's GRAVITY 🍎 do to objects on our planet?",
      "zh": "地球母亲无时无刻不在施加的神奇“地心引力/重力” 🍎 对我们有什么作用？"
    },
    "illustration": "🍎 ⬇️ 🌍",
    "illustrationSubtitle": {
      "th": "แรงโน้มถ่วงดึงดูดสิ่งของลงสู่พื้นดิน",
      "en": "Earth's gravitational pull downward",
      "zh": "万有引力：将物体向下吸引"
    },
    "options": [
      {
        "id": "opt-k2-inq-m10-1",
        "label": {
          "th": "ผลักให้คนลอยขึ้นฟ้าตลอดเวลา",
          "en": "Pushes people into space",
          "zh": "随时随地把所有人朝天空中猛推"
        },
        "icon": "🚀"
      },
      {
        "id": "opt-k2-inq-m10-2",
        "label": {
          "th": "ดึงดูดสิ่งของและตัวเราให้ตกลงสู่พื้น ไม่ลอยเคว้งคว้างในอากาศ 🌍",
          "en": "Pulls objects and us downward toward the ground",
          "zh": "将所有物体牢牢向下吸引吸在地面上，不让人物漂浮飞入太空 🌍"
        },
        "icon": "🍎"
      },
      {
        "id": "opt-k2-inq-m10-3",
        "label": {
          "th": "ทำให้วัตถุทุกชนิดระเบิด",
          "en": "Blows everything up",
          "zh": "让所有东西像鞭炮一样自爆"
        },
        "icon": "💥"
      }
    ],
    "correctOptionId": "opt-k2-inq-m10-2",
    "explanation": {
      "th": "แรงโน้มถ่วงดึงดูดวัตถุให้ติดพื้น ทำให้เราเดินได้มั่นคง เก่งมากครับ!",
      "en": "Correct! Gravity pulls all mass toward Earth's center.",
      "zh": "答对了！重力将我们牢牢吸在地面上，保证平稳行走生活。"
    }
  },
  {
    "id": "k2-inq-h1",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "โซ่อาหารในธรรมชาติ: ต้นหญ้า 🌱 ➡️ ตั๊กแตน 🦗 ➡️ กบ 🐸 สัตว์ใดกินตั๊กแตนเป็นอาหาร?",
      "en": "Food chain: Grass 🌱 ➡️ Grasshopper 🦗 ➡️ Frog 🐸. Who eats grasshoppers?",
      "zh": "自然界简单食物链：青草 🌱 ➡️ 蚱蜢蝗虫 🦗 ➡️ 青蛙 🐸。谁捕食蚱蜢？"
    },
    "illustration": "🌱 ➡️ 🦗 ➡️ 🐸",
    "illustrationSubtitle": {
      "th": "ห่วงโซ่อาหารในธรรมชาติ",
      "en": "Simple food chain",
      "zh": "食物链关系分析"
    },
    "options": [
      {
        "id": "opt-k2-inq-h1-1",
        "label": {
          "th": "ก้อนหิน",
          "en": "Rock",
          "zh": "石头"
        },
        "icon": "🪨"
      },
      {
        "id": "opt-k2-inq-h1-2",
        "label": {
          "th": "ต้นหญ้า",
          "en": "Grass",
          "zh": "青草"
        },
        "icon": "🌱"
      },
      {
        "id": "opt-k2-inq-h1-3",
        "label": {
          "th": "กบ 🐸",
          "en": "Frog",
          "zh": "青蛙 🐸"
        },
        "icon": "🐸"
      }
    ],
    "correctOptionId": "opt-k2-inq-h1-3",
    "explanation": {
      "th": "กบแลบลิ้นจับแมลงและตั๊กแตนกินเป็นอาหาร เก่งมากครับ!",
      "en": "Correct! Frogs eat grasshoppers in this food chain.",
      "zh": "答对啦！青蛙用长长的舌头捕食蚱蜢。"
    }
  },
  {
    "id": "k2-inq-h2",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "เมื่อเดินบน \"พื้นกระเบื้องเปียกน้ำสบู่\" 🧼 เรามักจะลื่นล้มง่าย เพราะสาเหตุใด?",
      "en": "Why do we easily slip and fall on soap-wet tile floors 🧼?",
      "zh": "走在沾满滑腻肥皂水的瓷砖地面 🧼 上极易滑倒，从科学摩擦力角度解释是因为？"
    },
    "illustration": "🧼 👣 ⚠️",
    "illustrationSubtitle": {
      "th": "แรงเสียดทานลดลงทำให้ลื่น",
      "en": "Reduced friction causes slips",
      "zh": "摩擦力大大减小导致滑倒"
    },
    "options": [
      {
        "id": "opt-k2-inq-h2-1",
        "label": {
          "th": "แรงเสียดทานระหว่างพื้นกับรองเท้าลดลงอย่างมาก 🧼",
          "en": "Friction between shoes and floor is greatly reduced",
          "zh": "地面与鞋底之间的“摩擦力”骤减，抓地力消失 🧼"
        },
        "icon": "🧼"
      },
      {
        "id": "opt-k2-inq-h2-2",
        "label": {
          "th": "แรงโน้มถ่วงหายไป",
          "en": "Gravity vanished",
          "zh": "地心引力突然完全消失了"
        },
        "icon": "🚀"
      },
      {
        "id": "opt-k2-inq-h2-3",
        "label": {
          "th": "รองเท้าขยายใหญ่ขึ้น",
          "en": "Shoes grew huge",
          "zh": "鞋子瞬间膨胀成大船"
        },
        "icon": "👟"
      }
    ],
    "correctOptionId": "opt-k2-inq-h2-1",
    "explanation": {
      "th": "น้ำสบู่เป็นสารหล่อลื่น ลดแรงเสียดทาน ทำให้รองเท้าไม่เกาะพื้น เก่งมากครับ!",
      "en": "Spot on! Soapy water minimizes friction, causing slick slips.",
      "zh": "太棒了！肥皂水润滑导致摩擦力大幅下降，脚底打滑。"
    }
  },
  {
    "id": "k2-inq-h3",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "สิ่งใดต่อไปนี้จัดเป็น \"ดาวเคราะห์บริวารที่โคจรรอบโลก\" ของเรา? 🌕",
      "en": "Which celestial body is the natural satellite ORBITING OUR EARTH? 🌕",
      "zh": "哪一颗在夜空中散发柔和银光的星球是常年“环绕我们地球公转的天然卫星”？🌕"
    },
    "illustration": "🌍 🔄 🌕",
    "illustrationSubtitle": {
      "th": "ดวงจันทร์เป็นบริวารของโลก",
      "en": "The Moon orbits Earth",
      "zh": "月球是地球的卫星"
    },
    "options": [
      {
        "id": "opt-k2-inq-h3-1",
        "label": {
          "th": "ดาวอังคาร",
          "en": "Mars",
          "zh": "火星"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k2-inq-h3-2",
        "label": {
          "th": "ดวงจันทร์ 🌕",
          "en": "The Moon",
          "zh": "月球（月亮）🌕"
        },
        "icon": "🌕"
      },
      {
        "id": "opt-k2-inq-h3-3",
        "label": {
          "th": "ดวงอาทิตย์ยักษ์",
          "en": "Giant Sun",
          "zh": "太阳恒星"
        },
        "icon": "☀️"
      }
    ],
    "correctOptionId": "opt-k2-inq-h3-2",
    "explanation": {
      "th": "ดวงจันทร์เป็นดาวบริวารเพียงดวงเดียวที่โคจรรอบโลก เก่งมากครับ!",
      "en": "Awesome! The Moon is Earth's only natural satellite.",
      "zh": "答对了！月亮是地球忠实的天然卫星。"
    }
  },
  {
    "id": "k2-inq-h4",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "การที่นกกระสาหรือห่านป่า \"บินอพยพเป็นฝูงรูปตัว V ย้ายไปถิ่นอบอุ่น\" 🪿 มักเกิดขึ้นในฤดูใด?",
      "en": "Migratory birds fly in V-formation to warmer lands 🪿 during which season onset?",
      "zh": "大雁等候鸟排成人字形“成群结队往南方温暖地区迁徙越冬” 🪿，通常发生于？"
    },
    "illustration": "🪿 ❄️ 🪿",
    "illustrationSubtitle": {
      "th": "การอพยพของสัตว์หนีหนาว",
      "en": "Bird migration before winter",
      "zh": "候鸟迁徙避寒"
    },
    "options": [
      {
        "id": "opt-k2-inq-h4-1",
        "label": {
          "th": "ฤดูว่ายน้ำกลางหน้าร้อน",
          "en": "Midsummer swim",
          "zh": "盛夏游泳时节"
        },
        "icon": "🏊"
      },
      {
        "id": "opt-k2-inq-h4-2",
        "label": {
          "th": "ฤดูเก็บเกี่ยวผลไม้",
          "en": "Fruit harvest",
          "zh": "果实大丰收季节"
        },
        "icon": "🍎"
      },
      {
        "id": "opt-k2-inq-h4-3",
        "label": {
          "th": "ก่อนเข้าสู่ฤดูหนาวที่อากาศหนาวจัดขาดแคลนอาหาร ❄️",
          "en": "Before freezing winter when food becomes scarce",
          "zh": "在严冬来临、气候酷寒食物匮乏之前 ❄️"
        },
        "icon": "❄️"
      }
    ],
    "correctOptionId": "opt-k2-inq-h4-3",
    "explanation": {
      "th": "นกอพยพหนีความหนาวเย็นไปยังดินแดนที่มีอาหารอุดมสมบูรณ์ เก่งมากครับ!",
      "en": "Correct! Birds migrate toward warmth and abundant food.",
      "zh": "答对啦！候鸟飞向温暖南方寻找充足食物度冬。"
    }
  },
  {
    "id": "k2-inq-h5",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "เมื่อมองดู \"ปลาทองที่ว่ายอยู่ในตู้ปลาแก้ว\" 🐠 ภาพปลาจะดูตัวใหญ่กว่าความเป็นจริง เกิดจากอะไร?",
      "en": "A goldfish inside a round bowl 🐠 looks larger than real life. Why?",
      "zh": "透过注满清水的圆形玻璃鱼缸观察小金鱼 🐠，小鱼的身形看起来被放大了，这是因为？"
    },
    "illustration": "🐠 🔍 💧",
    "illustrationSubtitle": {
      "th": "การหักเหของแสงผ่านน้ำและแก้วโค้ง",
      "en": "Light refraction in curved water bowl",
      "zh": "光线折射透镜放大效应"
    },
    "options": [
      {
        "id": "opt-k2-inq-h5-1",
        "label": {
          "th": "ตู้ปลาทรงโค้งที่มีน้ำทำหน้าที่เสมือนเลนส์นูนหักเหแสงขยายภาพ 🔍",
          "en": "Curved glass with water acts as a magnifying convex lens",
          "zh": "装水的弧形鱼缸如同一个凸透镜，光线折射放大了图像 🔍"
        },
        "icon": "🔍"
      },
      {
        "id": "opt-k2-inq-h5-2",
        "label": {
          "th": "ปลาทองกินน้ำจนพุงระเบิด",
          "en": "Fish drank too much",
          "zh": "金鱼喝饱了水瞬间撑大肚皮"
        },
        "icon": "🐡"
      },
      {
        "id": "opt-k2-inq-h5-3",
        "label": {
          "th": "ตาเราเล็กลง",
          "en": "Eyes shrunk",
          "zh": "观察者的眼睛突然变小了"
        },
        "icon": "👀"
      }
    ],
    "correctOptionId": "opt-k2-inq-h5-1",
    "explanation": {
      "th": "น้ำและกระจกโค้งทำหน้าที่หักเหแสงเหมือนแว่นขยาย เก่งมากครับ!",
      "en": "Spot on! The curved water acts as a convex magnifying lens.",
      "zh": "太棒了！水和曲面玻璃组合起到了凸透镜放大的神奇效果。"
    }
  },
  {
    "id": "k2-inq-h6",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "สัตว์ชนิดใด \"จำศีล (หลับยาวตลอดฤดูหนาว)\" เพื่อประหยัดพลังงาน? 🐻",
      "en": "Which animal HIBERNATES (sleeps deeply all winter long) to conserve energy? 🐻",
      "zh": "下列哪一种森林大型动物在酷寒漫长的冬天会“进入深沉冬眠”以节省能量？🐻"
    },
    "illustration": "🐻 ❄️ 💤",
    "illustrationSubtitle": {
      "th": "การจำศีลของสัตว์ในฤดูหนาว",
      "en": "Hibernation: Bears",
      "zh": "动物冬眠：黑熊棕熊"
    },
    "options": [
      {
        "id": "opt-k2-inq-h6-1",
        "label": {
          "th": "ลิงลม",
          "en": "Slow loris",
          "zh": "树顶小猴"
        },
        "icon": "🐒"
      },
      {
        "id": "opt-k2-inq-h6-2",
        "label": {
          "th": "หมีสีน้ำตาล 🐻",
          "en": "Brown bear",
          "zh": "棕熊 / 黑熊 🐻"
        },
        "icon": "🐻"
      },
      {
        "id": "opt-k2-inq-h6-3",
        "label": {
          "th": "สุนัขจิ้งจอกทะเลทราย",
          "en": "Desert fox",
          "zh": "撒哈拉耳廓狐"
        },
        "icon": "🦊"
      }
    ],
    "correctOptionId": "opt-k2-inq-h6-2",
    "explanation": {
      "th": "หมีสะสมไขมันก่อนฤดูหนาว แล้วนอนหลับจำศีลในถ้ำ เก่งมากครับ!",
      "en": "Right! Bears hibernate in winter dens to endure cold and food shortages.",
      "zh": "答对了！大熊在树洞岩洞中冬眠度过严冬。"
    }
  },
  {
    "id": "k2-inq-h7",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "วัสดุชนิดใดจัดเป็น \"ตัวนำไฟฟ้าที่ดี\" (ยอมให้กระแสไฟฟ้าไหลผ่านได้)? ⚡ 🪙 🆚 🪵 🆚 🪨",
      "en": "Which material is a GOOD CONDUCTOR OF ELECTRICITY? ⚡ 🪙 vs 🪵 vs 🪨",
      "zh": "下列哪一种材质属于“能够导电的优良电导体”？⚡ 🪙 🆚 🪵 🆚 🪨"
    },
    "illustration": "⚡ 🪙 🪵",
    "illustrationSubtitle": {
      "th": "ตัวนำไฟฟ้าและฉนวนไฟฟ้า",
      "en": "Conductors vs Insulators",
      "zh": "导体与绝缘体"
    },
    "options": [
      {
        "id": "opt-k2-inq-h7-1",
        "label": {
          "th": "ก้อนยางลบ",
          "en": "Rubber eraser",
          "zh": "橡胶橡皮擦"
        },
        "icon": "🧼"
      },
      {
        "id": "opt-k2-inq-h7-2",
        "label": {
          "th": "ท่อนไม้แห้ง",
          "en": "Dry wood",
          "zh": "干燥木头"
        },
        "icon": "🪵"
      },
      {
        "id": "opt-k2-inq-h7-3",
        "label": {
          "th": "โลหะ เช่น ลวดทองแดง หรือ เหรียญเงิน 🪙",
          "en": "Metals: Copper wire, coins",
          "zh": "金属（铜丝、铁丝、金属硬币）🪙"
        },
        "icon": "🪙"
      }
    ],
    "correctOptionId": "opt-k2-inq-h7-3",
    "explanation": {
      "th": "โลหะนำไฟฟ้าได้ดี ส่วนยางและไม้แห้งเป็นฉนวนไฟฟ้า เก่งมากครับ!",
      "en": "Awesome! Metals conduct electricity, while rubber and dry wood insulate.",
      "zh": "太棒啦！金属是优良的导电体，而橡胶木材是绝缘体。"
    }
  },
  {
    "id": "k2-inq-h8",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "เสียง \"ฟ้าร้อง\" 🌩️ เกิดขึ้นหลังจากที่เราเห็น \"แสงฟ้าแลบ\" ⚡ แวบหนึ่งเสมอ เพราะอะไร?",
      "en": "Why do we hear THUNDER 🌩️ slightly AFTER seeing the LIGHTNING flash ⚡?",
      "zh": "为什么暴风雨中我们总是“先看到耀眼的闪电 ⚡，随后才听到隆隆的雷声 🌩️”？"
    },
    "illustration": "⚡ ➡️ 🌩️",
    "illustrationSubtitle": {
      "th": "ความเร็วแสงเร็วกว่าความเร็วเสียง",
      "en": "Light travels faster than sound",
      "zh": "光速远快于声速"
    },
    "options": [
      {
        "id": "opt-k2-inq-h8-1",
        "label": {
          "th": "แสงเดินทางเร็วกว่าเสียงในอากาศอย่างมหาศาล ⚡",
          "en": "Light travels immensely faster than sound in air",
          "zh": "光在空气中的传播速度极其巨大，远比声音传播快得多 ⚡"
        },
        "icon": "⚡"
      },
      {
        "id": "opt-k2-inq-h8-2",
        "label": {
          "th": "เมฆฟ้าร้องเดินทางมาทีหลัง",
          "en": "Thunderclouds arrive late",
          "zh": "雷公公走得太慢赶不及"
        },
        "icon": "☁️"
      },
      {
        "id": "opt-k2-inq-h8-3",
        "label": {
          "th": "หูของเราทำงานช้ากว่าตา 10 เท่า",
          "en": "Ears are 10x slower",
          "zh": "人类耳朵接收系统天生延迟半小时"
        },
        "icon": "👂"
      }
    ],
    "correctOptionId": "opt-k2-inq-h8-1",
    "explanation": {
      "th": "แสงเร็วมาก (3 แสนกิโลเมตรต่อวินาที) จึงเห็นแสงก่อนได้ยินเสียงเสมอ เก่งมากครับ!",
      "en": "Spot on! Light travels at ~300,000 km/s, far outpacing sound waves.",
      "zh": "答对了！光速极快，因此我们先看见闪电，后听到雷声。"
    }
  },
  {
    "id": "k2-inq-h9",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "ไดโนเสาร์พันธุ์ใดมีลักษณะเป็น \"สัตว์กินพืชคอยาวตัวมหึมา\"? 🦕 🆚 🦖",
      "en": "Which dinosaur is the giant long-necked plant-eater? 🦕 vs 🦖",
      "zh": "哪一种史前巨兽拥有高耸入云的长脖子、以吃树冠嫩叶为生？🦕 🆚 🦖"
    },
    "illustration": "🦕 🌿 🦖",
    "illustrationSubtitle": {
      "th": "ไดโนเสาร์กินพืชคอยาว: แบรคิโอซอรัส",
      "en": "Herbivore dinosaur: Brachiosaurus",
      "zh": "长颈食草恐龙：腕龙/雷龙"
    },
    "options": [
      {
        "id": "opt-k2-inq-h9-1",
        "label": {
          "th": "ไทแรนโนซอรัส เร็กซ์ (ทีเร็กซ์) 🦖",
          "en": "T-Rex carnivore",
          "zh": "霸王龙（凶残食肉龙）🦖"
        },
        "icon": "🦖"
      },
      {
        "id": "opt-k2-inq-h9-2",
        "label": {
          "th": "แบรคิโอซอรัส (ซอโรพอดคอยาว) 🦕",
          "en": "Brachiosaurus / Sauropod",
          "zh": "腕龙 / 梁龙（长颈食草巨兽）🦕"
        },
        "icon": "🦕"
      },
      {
        "id": "opt-k2-inq-h9-3",
        "label": {
          "th": "เวโลซิแรปเตอร์",
          "en": "Velociraptor",
          "zh": "迅猛龙"
        },
        "icon": "🐾"
      }
    ],
    "correctOptionId": "opt-k2-inq-h9-2",
    "explanation": {
      "th": "ซอโรพอดมีคอยาวเหยียดเพื่อเอื้อมกินยอดไม้สูง เก่งมากครับ!",
      "en": "Correct! Sauropods like Brachiosaurus had long necks to browse high foliage.",
      "zh": "答对啦！腕龙拥有修长如吊车般的长脖子采食树梢。"
    }
  },
  {
    "id": "k2-inq-h10",
    "grade": "K2",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "เมื่อนำดินน้ำมันก้อนกลมตันมาหย่อนลงน้ำมันจะจม 🟤 แต่ถ้า \"ปั้นให้แบนเป็นรูปกระทงหรือเรือกลวง\" จะเกิดอะไรขึ้น?",
      "en": "Clay ball sinks 🟤, but if shaped into a hollow bowl/boat shape, what happens?",
      "zh": "把实心橡皮泥团扔进水里会沉底 🟤，但如果把它“捏成空心小碗或小船形状”，它会？"
    },
    "illustration": "🟤 ➡️ ⛵",
    "illustrationSubtitle": {
      "th": "การเปลี่ยนรูปร่างเพิ่มปริมาตรให้ลอยน้ำ",
      "en": "Shaping clay into hollow boat floats",
      "zh": "改变形状增大排水体积漂浮"
    },
    "options": [
      {
        "id": "opt-k2-inq-h10-1",
        "label": {
          "th": "กลายเป็นหินผุสลายตัว",
          "en": "Dissolves into dust",
          "zh": "在水里瞬间化为青烟"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-inq-h10-2",
        "label": {
          "th": "จมลงเร็วกว่าเดิม 10 เท่า",
          "en": "Sinks 10x faster",
          "zh": "立刻以火箭般速度加速下沉"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-inq-h10-3",
        "label": {
          "th": "สามารถลอยอยู่บนผิวน้ำได้ ⛵",
          "en": "It can now float on the water surface",
          "zh": "能够稳稳漂浮在水面上成了一艘小船 ⛵"
        },
        "icon": "⛵"
      }
    ],
    "correctOptionId": "opt-k2-inq-h10-3",
    "explanation": {
      "th": "การแผ่ให้กว้างและมีขอบกลวง ทำให้น้ำหนักเบากว่าน้ำที่ถูกแทนที่ จึงลอยน้ำได้ เก่งมากครับ!",
      "en": "Awesome! Expanding volume increases water displacement, producing buoyancy to float.",
      "zh": "太棒了！做成小船增加了排开水的体积，浮力变大就能漂起来了。"
    }
  },
  {
    "id": "k3-inq-e1",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "ระบบสุริยะของเรามีศูนย์กลางเป็นดาวฤกษ์ดวงใหญ่ที่ชื่อว่าอะไร? ☀️",
      "en": "At the center of our Solar System is a huge star named what? ☀️",
      "zh": "我们所在的太阳系中心，是一颗带来无穷光和热的巨大恒星，它叫什么？☀️"
    },
    "illustration": "☀️ 🪐 ☀️",
    "illustrationSubtitle": {
      "th": "ดวงอาทิตย์ศูนย์กลางระบบสุริยะ",
      "en": "Sun at center of Solar System",
      "zh": "太阳系的核心：太阳"
    },
    "options": [
      {
        "id": "opt-k3-inq-e1-1",
        "label": {
          "th": "ดวงอาทิตย์ (The Sun) ☀️",
          "en": "The Sun",
          "zh": "太阳（The Sun）☀️"
        },
        "icon": "☀️"
      },
      {
        "id": "opt-k3-inq-e1-2",
        "label": {
          "th": "ดาวอังคาร",
          "en": "Mars",
          "zh": "火星"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k3-inq-e1-3",
        "label": {
          "th": "ดาวพฤหัสบดี",
          "en": "Jupiter",
          "zh": "木星"
        },
        "icon": "🪐"
      }
    ],
    "correctOptionId": "opt-k3-inq-e1-1",
    "explanation": {
      "th": "ดวงอาทิตย์เป็นดาวฤกษ์ศูนย์กลางที่มีดาวเคราะห์โคจรล้อมรอบ เก่งมากครับ!",
      "en": "Correct! The Sun is the massive star anchoring our solar system.",
      "zh": "答对了！太阳是太阳系的核心恒星，所有行星围绕它公转。"
    }
  },
  {
    "id": "k3-inq-e2",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "น้ำในธรรมชาติเมื่อได้รับความร้อนจนเดือดที่อุณหภูมิ 100 องศาเซลเซียส จะเปลี่ยนเป็นอะไร? ♨️",
      "en": "Water boils at 100°C under heat. What does it turn into? ♨️",
      "zh": "在标准气压下，水加热到 100 摄氏度沸腾时，会剧烈汽化转变为什么？♨️"
    },
    "illustration": "♨️ 💨 ♨️",
    "illustrationSubtitle": {
      "th": "จุดเดือดของน้ำและไอน้ำ",
      "en": "Boiling water becomes steam",
      "zh": "水沸腾汽化变成水蒸气"
    },
    "options": [
      {
        "id": "opt-k3-inq-e2-1",
        "label": {
          "th": "ก้อนน้ำแข็ง",
          "en": "Ice block",
          "zh": "坚硬的冰块"
        },
        "icon": "🧊"
      },
      {
        "id": "opt-k3-inq-e2-2",
        "label": {
          "th": "ไอน้ำ (ก๊าซ) 💨",
          "en": "Steam / Vapor (Gas)",
          "zh": "无色透明的水蒸气（气体）💨"
        },
        "icon": "💨"
      },
      {
        "id": "opt-k3-inq-e2-3",
        "label": {
          "th": "น้ำเชื่อมข้น",
          "en": "Thick syrup",
          "zh": "粘稠糖浆"
        },
        "icon": "🍯"
      }
    ],
    "correctOptionId": "opt-k3-inq-e2-2",
    "explanation": {
      "th": "น้ำเดือดจะเปลี่ยนสถานะจากของเหลวกลายเป็นก๊าซไอระเหย เก่งมากครับ!",
      "en": "Right! Liquid water boils and vaporizes into gas.",
      "zh": "答对啦！液态水沸腾汽化变成气态水蒸气。"
    }
  },
  {
    "id": "k3-inq-e3",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "เครื่องมือวิทยาศาสตร์ชนิดใดใช้สำหรับ \"วัดอุณหภูมิความร้อนหนาวของร่างกายหรืออากาศ\"? 🌡️",
      "en": "Which scientific instrument measures hot/cold TEMPERATURE? 🌡️",
      "zh": "哪一种科学仪器是用来“精确测量体温或气温冷热数值”的？🌡️"
    },
    "illustration": "🌡️ 🥶 🌡️",
    "illustrationSubtitle": {
      "th": "เทอร์โมมิเตอร์วัดอุณหภูมิ",
      "en": "Thermometer measures temp",
      "zh": "温度计测量冷热"
    },
    "options": [
      {
        "id": "opt-k3-inq-e3-1",
        "label": {
          "th": "กล้องสลับลาย",
          "en": "Kaleidoscope",
          "zh": "万花筒"
        },
        "icon": "🎪"
      },
      {
        "id": "opt-k3-inq-e3-2",
        "label": {
          "th": "ตาชั่งสองแขน",
          "en": "Balance scale",
          "zh": "称重天平"
        },
        "icon": "⚖️"
      },
      {
        "id": "opt-k3-inq-e3-3",
        "label": {
          "th": "เทอร์โมมิเตอร์ (ปรอทวัดไข้) 🌡️",
          "en": "Thermometer",
          "zh": "温度计 / 体温计 🌡️"
        },
        "icon": "🌡️"
      }
    ],
    "correctOptionId": "opt-k3-inq-e3-3",
    "explanation": {
      "th": "เทอร์โมมิเตอร์มีหน่วยวัดเป็นองศาเซลเซียส เก่งมากครับ!",
      "en": "Spot on! Thermometers measure temperatures accurately.",
      "zh": "太棒了！温度计用来准确测定温度。"
    }
  },
  {
    "id": "k3-inq-e4",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "สัตว์ชนิดใดต่อไปนี้จัดเป็นสัตว์เลือดอุ่นที่ \"บินได้และเลี้ยงลูกด้วยนม\"? 🦇",
      "en": "Which mammal is warm-blooded and CAN FLY in the air? 🦇",
      "zh": "下列哪一种动物是货真价实的“能飞翔在空中的夜行动物，且属于哺乳动物”？🦇"
    },
    "illustration": "🦇 🌌 🦇",
    "illustrationSubtitle": {
      "th": "สัตว์เลี้ยงลูกด้วยนมที่บินได้: ค้างคาว",
      "en": "Flying mammal: Bat",
      "zh": "会飞的哺乳动物：蝙蝠"
    },
    "options": [
      {
        "id": "opt-k3-inq-e4-1",
        "label": {
          "th": "ค้างคาว 🦇",
          "en": "Bat",
          "zh": "蝙蝠 🦇"
        },
        "icon": "🦇"
      },
      {
        "id": "opt-k3-inq-e4-2",
        "label": {
          "th": "นกกระจอกเทศ",
          "en": "Ostrich",
          "zh": "鸵鸟"
        },
        "icon": "🪶"
      },
      {
        "id": "opt-k3-inq-e4-3",
        "label": {
          "th": "นกเพนกวิน",
          "en": "Penguin",
          "zh": "企鹅"
        },
        "icon": "🐧"
      }
    ],
    "correctOptionId": "opt-k3-inq-e4-1",
    "explanation": {
      "th": "ค้างคาวเป็นสัตว์เลี้ยงลูกด้วยนมเพียงชนิดเดียวที่บินได้อย่างแท้จริง เก่งมากครับ!",
      "en": "Awesome! Bats are the only mammals capable of true sustained flight.",
      "zh": "答对了！蝙蝠是唯一能够真正振翅飞翔的哺乳动物。"
    }
  },
  {
    "id": "k3-inq-e5",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "น้ำในบ่อน้ำและแม่น้ำระเหยกลายเป็นไอ ลอยขึ้นสู่ท้องฟ้า รวมตัวกันเป็นก้อนสีขาว เรียกว่าอะไร? ☁️",
      "en": "Water evaporates, rises into the sky, and condenses into white fluffy shapes called what? ☁️",
      "zh": "地表水蒸发升空，在高空遇冷凝结聚集在一起的壮丽白色漂浮团状物叫？☁️"
    },
    "illustration": "💧 ⬆️ ☁️",
    "illustrationSubtitle": {
      "th": "วัฏจักรน้ำ: เมฆบนท้องฟ้า",
      "en": "Water cycle: Clouds",
      "zh": "水循环：天空中聚集成云"
    },
    "options": [
      {
        "id": "opt-k3-inq-e5-1",
        "label": {
          "th": "ดวงดาว",
          "en": "Stars",
          "zh": "夜空星辰"
        },
        "icon": "⭐"
      },
      {
        "id": "opt-k3-inq-e5-2",
        "label": {
          "th": "ก้อนเมฆ ☁️",
          "en": "Clouds",
          "zh": "云朵 / 白云 ☁️"
        },
        "icon": "☁️"
      },
      {
        "id": "opt-k3-inq-e5-3",
        "label": {
          "th": "ลูกอุกกาบาต",
          "en": "Meteors",
          "zh": "天外流星陨石"
        },
        "icon": "☄️"
      }
    ],
    "correctOptionId": "opt-k3-inq-e5-2",
    "explanation": {
      "th": "ละอองน้ำล้านๆ หยดรวมกันกลายเป็นก้อนเมฆ เก่งมากครับ!",
      "en": "Correct! Clouds are vast collections of tiny condensed water droplets.",
      "zh": "答对啦！数以亿计的小水滴小冰晶在高空聚集成云。"
    }
  },
  {
    "id": "k3-inq-e6",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "สัตว์ชนิดใดใช้ \"การเปลี่ยนสีผิวกลมกลืนกับสภาพแวดล้อม\" เพื่อพรางตัว? 🦎",
      "en": "Which reptile CAMOUFLAGES by changing its skin color to match surroundings? 🦎",
      "zh": "哪一种爬行小动物能“迅速变换自身体表颜色，与周围枝叶融为一体”来隐蔽伪装？🦎"
    },
    "illustration": "🦎 🌿 🦎",
    "illustrationSubtitle": {
      "th": "การพรางตัวของสัตว์: กิ้งก่าคาเมเลียน",
      "en": "Camouflage: Chameleon",
      "zh": "动物拟态保护色：变色龙"
    },
    "options": [
      {
        "id": "opt-k3-inq-e6-1",
        "label": {
          "th": "ช้างป่า",
          "en": "Wild elephant",
          "zh": "大象"
        },
        "icon": "🐘"
      },
      {
        "id": "opt-k3-inq-e6-2",
        "label": {
          "th": "ม้าลาย",
          "en": "Zebra",
          "zh": "斑马"
        },
        "icon": "🦓"
      },
      {
        "id": "opt-k3-inq-e6-3",
        "label": {
          "th": "กิ้งก่าคาเมเลียน 🦎",
          "en": "Chameleon",
          "zh": "变色龙（避役）🦎"
        },
        "icon": "🦎"
      }
    ],
    "correctOptionId": "opt-k3-inq-e6-3",
    "explanation": {
      "th": "กิ้งก่าคาเมเลียนปรับเม็ดสีที่ผิวหนังเพื่อซ่อนตัวและสื่อสาร เก่งมากครับ!",
      "en": "Spot on! Chameleons shift chromatophore skin cells to camouflage.",
      "zh": "太棒了！变色龙通过调节皮肤色素细胞实现拟态伪装。"
    }
  },
  {
    "id": "k3-inq-e7",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "อวัยวะใดภายในร่างกายมนุษย์ที่ทำหน้าที่ \"สูบฉีดเลือดไปเลี้ยงทั่วร่างกาย\"? 🫀",
      "en": "Which internal organ pumps blood constantly throughout our entire body? 🫀",
      "zh": "我们人体胸腔内部，日夜不停扑通跳动、“把新鲜血液泵向全身”的核心器官是？🫀"
    },
    "illustration": "🫀 🩸 🫀",
    "illustrationSubtitle": {
      "th": "อวัยวะภายใน: หัวใจ",
      "en": "Human heart pumps blood",
      "zh": "人体核心器官：心脏泵血"
    },
    "options": [
      {
        "id": "opt-k3-inq-e7-1",
        "label": {
          "th": "หัวใจ 🫀",
          "en": "The Heart",
          "zh": "心脏 🫀"
        },
        "icon": "🫀"
      },
      {
        "id": "opt-k3-inq-e7-2",
        "label": {
          "th": "กระเพาะอาหาร",
          "en": "Stomach",
          "zh": "胃"
        },
        "icon": "🥣"
      },
      {
        "id": "opt-k3-inq-e7-3",
        "label": {
          "th": "กระดูกแขน",
          "en": "Arm bone",
          "zh": "手臂骨骼"
        },
        "icon": "🦴"
      }
    ],
    "correctOptionId": "opt-k3-inq-e7-1",
    "explanation": {
      "th": "หัวใจเต้นตลอดเวลาเพื่อสูบฉีดออกซิเจนและสารอาหารในเลือด เก่งมากครับ!",
      "en": "Right! The heart is a muscular pump circulating vital blood.",
      "zh": "答对了！心脏不知疲倦地跳动，向全身输送血液和养分。"
    }
  },
  {
    "id": "k3-inq-e8",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "ดาวเคราะห์ดวงใดในระบบสุริยะที่ได้ฉายาว่า \"ดาวเคราะห์สีแดง\"? 🔴",
      "en": "Which solar planet is famously known as the \"RED PLANET\"? 🔴",
      "zh": "在太阳系八大行星中，因地表布满氧化铁红锈砂石而被称为“红色的星球”的是？🔴"
    },
    "illustration": "🔴 🪐 🔴",
    "illustrationSubtitle": {
      "th": "ดาวอังคาร ดาวเคราะห์สีแดง",
      "en": "Mars: The Red Planet",
      "zh": "太阳系行星：红色的火星"
    },
    "options": [
      {
        "id": "opt-k3-inq-e8-1",
        "label": {
          "th": "ดาวศุกร์",
          "en": "Venus",
          "zh": "金星"
        },
        "icon": "✨"
      },
      {
        "id": "opt-k3-inq-e8-2",
        "label": {
          "th": "ดาวอังคาร (Mars) 🔴",
          "en": "Mars",
          "zh": "火星（Mars）🔴"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k3-inq-e8-3",
        "label": {
          "th": "ดาวเสาร์",
          "en": "Saturn",
          "zh": "土星"
        },
        "icon": "🪐"
      }
    ],
    "correctOptionId": "opt-k3-inq-e8-2",
    "explanation": {
      "th": "ดาวอังคารมีสนิมเหล็กบนผิวดินจำนวนมาก จึงเห็นเป็นสีแดงส้ม เก่งมากครับ!",
      "en": "Awesome! Mars appears reddish due to iron oxide rust on its surface.",
      "zh": "答对啦！火星表面覆盖大量氧化铁锈，呈现耀眼红色。"
    }
  },
  {
    "id": "k3-inq-e9",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "ในกระบวนการหายใจของคนและสัตว์ เราหายใจเอา \"ก๊าซชนิดใด\" เข้าสู่ปอด? 🌬️",
      "en": "When humans and animals breathe in, which vital GAS enters our lungs? 🌬️",
      "zh": "在人类和陆生动物的正常呼吸过程中，我们吸进肺部维持生命所必需的气体是？🌬️"
    },
    "illustration": "🌬️ 🫁 🌬️",
    "illustrationSubtitle": {
      "th": "ก๊าซออกซิเจนในการหายใจ",
      "en": "Oxygen gas for breathing",
      "zh": "生命呼吸必需：氧气"
    },
    "options": [
      {
        "id": "opt-k3-inq-e9-1",
        "label": {
          "th": "ก๊าซพิษ",
          "en": "Toxic fumes",
          "zh": "剧毒瓦斯"
        },
        "icon": "☠️"
      },
      {
        "id": "opt-k3-inq-e9-2",
        "label": {
          "th": "ควันดำท่อไอเสีย",
          "en": "Car exhaust smoke",
          "zh": "汽车尾气黑烟"
        },
        "icon": "💨"
      },
      {
        "id": "opt-k3-inq-e9-3",
        "label": {
          "th": "ก๊าซออกซิเจน (Oxygen) 🌬️",
          "en": "Oxygen gas",
          "zh": "氧气（Oxygen）🌬️"
        },
        "icon": "🌬️"
      }
    ],
    "correctOptionId": "opt-k3-inq-e9-3",
    "explanation": {
      "th": "ออกซิเจนถูกเม็ดเลือดแดงลำเลียงไปสร้างพลังงานให้เซลล์ร่างกาย เก่งมากครับ!",
      "en": "Spot on! Oxygen is absorbed into blood to fuel cells with energy.",
      "zh": "太棒了！我们吸入清新的氧气，呼出二氧化碳。"
    }
  },
  {
    "id": "k3-inq-e10",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 1,
    "question": {
      "th": "สัตว์ชนิดใดต่อไปนี้มี \"กระดูกสันหลัง\"? 🐟 🆚 🪱 🆚 🐌",
      "en": "Which animal is a VERTEBRATE (has an internal backbone / spine)? 🐟 vs 🪱 vs 🐌",
      "zh": "下列哪一种生物属于体内长有坚硬脊椎骨骼的“脊椎动物”？🐟 🆚 🪱 🆚 🐌"
    },
    "illustration": "🐟 🦴 🪱",
    "illustrationSubtitle": {
      "th": "สัตว์มีกระดูกสันหลัง",
      "en": "Vertebrates: Fish have backbones",
      "zh": "脊椎动物与无脊椎动物"
    },
    "options": [
      {
        "id": "opt-k3-inq-e10-1",
        "label": {
          "th": "ปลา (มีก้างปลาเป็นกระดูกสันหลัง) 🐟",
          "en": "Fish (has backbone spine)",
          "zh": "鱼类（体内有鱼骨脊椎）🐟"
        },
        "icon": "🐟"
      },
      {
        "id": "opt-k3-inq-e10-2",
        "label": {
          "th": "ไส้เดือนดินตัวนิ่ม",
          "en": "Earthworm (soft body)",
          "zh": "软体无骨的蚯蚓"
        },
        "icon": "🪱"
      },
      {
        "id": "opt-k3-inq-e10-3",
        "label": {
          "th": "หอยทากตัวนุ่ม",
          "en": "Snail",
          "zh": "粘液软体蜗牛"
        },
        "icon": "🐌"
      }
    ],
    "correctOptionId": "opt-k3-inq-e10-1",
    "explanation": {
      "th": "ปลา กบ สัตว์เลื้อยคลาน นก และสัตว์เลี้ยงลูกด้วยนม เป็นสัตว์มีกระดูกสันหลัง เก่งมากครับ!",
      "en": "Correct! Fish have an internal skeletal spinal column.",
      "zh": "答对了！鱼骨脊梁骨是鱼类作为脊椎动物的铁证。"
    }
  },
  {
    "id": "k3-inq-m1",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "พืชสร้างอาหารด้วยแสงแดด (การสังเคราะห์ด้วยแสง) จะคาย \"ก๊าซชนิดใด\" ออกมาให้สิ่งมีชีวิตหายใจ? 🍃",
      "en": "During photosynthesis, green plants produce food and release which LIFE-GIVING GAS? 🍃",
      "zh": "绿色植物通过神奇的光合作用制造养分时，会向大气中释放出哪种宝贵的气体供生物呼吸？🍃"
    },
    "illustration": "🍃 ☀️ 🌬️",
    "illustrationSubtitle": {
      "th": "การสังเคราะห์แสงคายออกซิเจน",
      "en": "Photosynthesis produces Oxygen",
      "zh": "光合作用释放氧气"
    },
    "options": [
      {
        "id": "opt-k3-inq-m1-1",
        "label": {
          "th": "ควันพิษกำมะถัน",
          "en": "Sulfur smoke",
          "zh": "浓烈硫磺毒气"
        },
        "icon": "☣️"
      },
      {
        "id": "opt-k3-inq-m1-2",
        "label": {
          "th": "ก๊าซออกซิเจน 🌬️",
          "en": "Oxygen gas",
          "zh": "富足清新的氧气 🌬️"
        },
        "icon": "🌬️"
      },
      {
        "id": "opt-k3-inq-m1-3",
        "label": {
          "th": "ผงถ่านดำ",
          "en": "Charcoal dust",
          "zh": "黑煤灰粉末"
        },
        "icon": "🟤"
      }
    ],
    "correctOptionId": "opt-k3-inq-m1-2",
    "explanation": {
      "th": "พืชดูดก๊าซคาร์บอนไดออกไซด์และปล่อยก๊าซออกซิเจนบริสุทธิ์ เก่งมากครับ!",
      "en": "Awesome! Photosynthesis consumes CO2 and yields oxygen for all life.",
      "zh": "太棒了！光合作用吸收二氧化碳，释放出氧气。"
    }
  },
  {
    "id": "k3-inq-m2",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "เมื่อแสงเดินทางมากระทบกระจกเงาราบ แสงจะ \"สะท้อนกลับมา\" เข้าตาเรา ทำให้เห็นสิ่งใด? 🪞",
      "en": "Light hits a flat mirror and REFLECTS back to our eyes. What do we see? 🪞",
      "zh": "光线照射在平整明亮的穿衣镜 🪞 表面并发生镜面反射入眼，我们会看到什么？"
    },
    "illustration": "🪞 ✨ 🪞",
    "illustrationSubtitle": {
      "th": "การสะท้อนของแสงบนกระจกเงา",
      "en": "Light reflection in flat mirror",
      "zh": "光的平面反射成像"
    },
    "options": [
      {
        "id": "opt-k3-inq-m2-1",
        "label": {
          "th": "กระจกจะดูดกลืนตัวเราหายไป",
          "en": "Mirror swallows you",
          "zh": "镜子变成无底黑洞把人吸入"
        },
        "icon": "🕳️"
      },
      {
        "id": "opt-k3-inq-m2-2",
        "label": {
          "th": "มองทะลุเห็นอีกฟากของกำแพง",
          "en": "See through wall",
          "zh": "直接透视看穿水泥墙壁后方"
        },
        "icon": "🧱"
      },
      {
        "id": "opt-k3-inq-m2-3",
        "label": {
          "th": "ภาพสะท้อนเงาของตัวเราเองอย่างชัดเจน 🪞",
          "en": "Clear reflected image of ourselves",
          "zh": "镜子里清晰映照出我们自己的英姿 🪞"
        },
        "icon": "🪞"
      }
    ],
    "correctOptionId": "opt-k3-inq-m2-3",
    "explanation": {
      "th": "การสะท้อนแสงที่สม่ำเสมอบนผิวกระจกทำให้เกิดภาพเสมือนที่เหมือนจริง เก่งมากครับ!",
      "en": "Right! Smooth reflective surfaces bounce light rays coherently to form images.",
      "zh": "答对啦！平整光滑的镜面发生镜面反射，形成清晰实像。"
    }
  },
  {
    "id": "k3-inq-m3",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "ทำไมขั้วโลกเหนือและขั้วโลกใต้ ❄️ จึงมีสภาพอากาศหนาวเย็นจัดและปกคลุมด้วยธารน้ำแข็ง?",
      "en": "Why are the Earth's North & South Poles ❄️ extremely cold with vast glaciers?",
      "zh": "为什么地球的南极和北极 ❄️ 终年严寒酷冷，千里冰封万里雪飘？"
    },
    "illustration": "❄️ 🧊 🌍",
    "illustrationSubtitle": {
      "th": "แสงแดดส่องเฉียงที่บริเวณขั้วโลก",
      "en": "Poles receive slanting indirect sunlight",
      "zh": "极地地区太阳高度角低受热少"
    },
    "options": [
      {
        "id": "opt-k3-inq-m3-1",
        "label": {
          "th": "ได้รับแสงแดดเฉียงๆ และความเข้มข้นของรังสีแสงอาทิตย์น้อยมาก ❄️",
          "en": "Sunlight strikes at a shallow angle, dispersing weak solar heat",
          "zh": "太阳光以极小倾斜角照射，地面吸收的太阳辐射热量极少 ❄️"
        },
        "icon": "❄️"
      },
      {
        "id": "opt-k3-inq-m3-2",
        "label": {
          "th": "เพราะมีเครื่องทำความเย็นยักษ์ฝังอยู่",
          "en": "Giant freezer buried",
          "zh": "地底埋伏着万米巨型冷库电冰箱"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-inq-m3-3",
        "label": {
          "th": "เพราะดวงอาทิตย์ไม่เคยขึ้นเลยสักวัน",
          "en": "Sun never ever rises",
          "zh": "两极百年来太阳从不曾露面半秒"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k3-inq-m3-1",
    "explanation": {
      "th": "บริเวณขั้วโลก แสงอาทิตย์ตกกระทบทำมุมเอียงมาก ความร้อนจึงเบาบาง เก่งมากครับ!",
      "en": "Correct! Solar energy is dispersed obliquely across polar latitudes.",
      "zh": "答对了！极地纬度高，阳光斜射热量分散，终年寒冷。"
    }
  },
  {
    "id": "k3-inq-m4",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "สิ่งมีชีวิตประเภทใดทำหน้าที่เป็น \"ผู้ย่อยสลายซากพืชซากสัตว์\" ในระบบนิเวศ? 🍄",
      "en": "Which organisms act as DECOMPOSERS, breaking down dead plants and animals? 🍄",
      "zh": "在自然生态系统中，哪一类生物扮演着无私的“分解者”，将动植物遗骸分解转化为腐殖质？🍄"
    },
    "illustration": "🍄 🍂 🍄",
    "illustrationSubtitle": {
      "th": "ผู้ย่อยสลายในระบบนิเวศ: เห็ด รา จุลินทรีย์",
      "en": "Decomposers: Fungi & bacteria",
      "zh": "生态系统中的分解者：真菌蘑菇"
    },
    "options": [
      {
        "id": "opt-k3-inq-m4-1",
        "label": {
          "th": "เสือโคร่งผู้ล่า",
          "en": "Apex tiger predator",
          "zh": "森林百兽之王老虎"
        },
        "icon": "🐅"
      },
      {
        "id": "opt-k3-inq-m4-2",
        "label": {
          "th": "เห็ด รา และจุลินทรีย์ในดิน 🍄",
          "en": "Fungi, molds, and soil microbes",
          "zh": "真菌蘑菇、霉菌及土壤有益微生物 🍄"
        },
        "icon": "🍄"
      },
      {
        "id": "opt-k3-inq-m4-3",
        "label": {
          "th": "เหยี่ยวเวหา",
          "en": "Soaring hawk",
          "zh": "翱翔的雄鹰"
        },
        "icon": "🦅"
      }
    ],
    "correctOptionId": "opt-k3-inq-m4-2",
    "explanation": {
      "th": "เห็ดและแบคทีเรียย่อยสลายซากอินทรีย์ให้กลายเป็นแร่ธาตุคืนสู่ดิน เก่งมากครับ!",
      "en": "Spot on! Decomposers recycle organic nutrients back into fertile soil.",
      "zh": "太棒了！真菌蘑菇分解枯枝落叶，为大地补充营养矿物质。"
    }
  },
  {
    "id": "k3-inq-m5",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "เมื่อนำวัตถุ 2 ชนิดมาถูกัน เช่น \"นำไม้บรรทัดพลาสติกไปถูกับผ้าขนสัตว์แห้ง\" ⚡ จะเกิดสิ่งใดขึ้น?",
      "en": "Rub a plastic ruler against dry wool fabric ⚡. What phenomenon occurs?",
      "zh": "用一把塑料直尺在干燥的羊毛毛衣上快速摩擦几十次 ⚡，会产生什么神奇的物理现象？"
    },
    "illustration": "⚡ 📏 ⚡",
    "illustrationSubtitle": {
      "th": "ไฟฟ้าสถิตจากการเสียดสี",
      "en": "Static electricity from friction",
      "zh": "摩擦起电产生静电吸引轻小物体"
    },
    "options": [
      {
        "id": "opt-k3-inq-m5-1",
        "label": {
          "th": "เกิดเปลวไฟลุกไหม้ห้องระเบิด",
          "en": "Room explodes into flames",
          "zh": "整个房间发生大爆炸化为灰烬"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k3-inq-m5-2",
        "label": {
          "th": "ไม้บรรทัดจะกลายเป็นทองคำ",
          "en": "Turns into pure gold",
          "zh": "塑料尺子瞬间变成沉甸甸的黄金"
        },
        "icon": "🪙"
      },
      {
        "id": "opt-k3-inq-m5-3",
        "label": {
          "th": "เกิด \"ไฟฟ้าสถิต\" สามารถดูดเศษกระดาษชิ้นเล็กๆ ให้ลอยติดขึ้นมาได้ ⚡",
          "en": "Static electricity attracts tiny paper bits",
          "zh": "产生“静电”，能够隔空将轻小的碎纸屑吸附起来 ⚡"
        },
        "icon": "⚡"
      }
    ],
    "correctOptionId": "opt-k3-inq-m5-3",
    "explanation": {
      "th": "การขัดถูทำให้เกิดการถ่ายเทประจุไฟฟ้า กลายเป็นแรงดึงดูดไฟฟ้าสถิต เก่งมากครับ!",
      "en": "Right! Friction transfers electrons, generating static electrical charges.",
      "zh": "答对啦！摩擦导致电子转移，产生静电吸引微小纸屑。"
    }
  },
  {
    "id": "k3-inq-m6",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "สัตว์ชนิดใดที่มีอุณหภูมิร่างกายเปลี่ยนแปลงตามสภาพแวดล้อม จัดเป็น \"สัตว์เลือดเย็น\"? 🦎 🆚 🐶 🆚 🐥",
      "en": "Which animal is COLD-BLOODED (body temperature changes with environment)? 🦎 vs 🐶 vs 🐥",
      "zh": "下列哪一种动物的体温会随着外界环境冷暖而变化，属于典型的“变温/冷血动物”？🦎 🆚 🐶 🆚 🐥"
    },
    "illustration": "🦎 ❄️ ☀️",
    "illustrationSubtitle": {
      "th": "สัตว์เลือดเย็น สัตว์เลือดอุ่น",
      "en": "Cold-blooded vs Warm-blooded",
      "zh": "变温动物（冷血动物）"
    },
    "options": [
      {
        "id": "opt-k3-inq-m6-1",
        "label": {
          "th": "งู กิ้งก่า จระเข้ (สัตว์เลื้อยคลาน) 🦎",
          "en": "Snakes, lizards, crocodiles (Reptiles)",
          "zh": "蛇、蜥蜴、鳄鱼（爬行及两栖类）🦎"
        },
        "icon": "🦎"
      },
      {
        "id": "opt-k3-inq-m6-2",
        "label": {
          "th": "สุนัขบ้านขนปุย",
          "en": "Fluffy domestic dog",
          "zh": "温血哺乳的小狗"
        },
        "icon": "🐶"
      },
      {
        "id": "opt-k3-inq-m6-3",
        "label": {
          "th": "แม่นกพิราบ",
          "en": "Pigeon bird",
          "zh": "恒温飞翔的小鸟"
        },
        "icon": "🕊️"
      }
    ],
    "correctOptionId": "opt-k3-inq-m6-1",
    "explanation": {
      "th": "สัตว์เลื้อยคลานและปลาเป็นสัตว์เลือดเย็น ต้องนอนอาบแดดเพื่อปรับอุณหภูมิร่างกาย เก่งมากครับ!",
      "en": "Awesome! Reptiles regulate body heat via external sunshine and shade.",
      "zh": "太棒了！爬行动物需要靠晒太阳来提升体温，属于变温动物。"
    }
  },
  {
    "id": "k3-inq-m7",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "เมื่อโลกเคลื่อนที่มาอยู่ตรงกลางระหว่างดวงอาทิตย์กับดวงจันทร์ จนเงาโลกบดบังดวงจันทร์ ปรากฏการณ์นี้เรียกว่าอะไร? 🌑",
      "en": "Earth passes directly between the Sun and Moon, casting a shadow on the Moon. What is it? 🌑",
      "zh": "当地球运行至太阳与月球正中间、地球的庞大黑影完全遮住整轮明月时，这一天文奇观叫作？🌑"
    },
    "illustration": "☀️ 🌍 🌑",
    "illustrationSubtitle": {
      "th": "ปรากฏการณ์จันทรุปราคา",
      "en": "Lunar eclipse",
      "zh": "月全食/月偏食天文现象"
    },
    "options": [
      {
        "id": "opt-k3-inq-m7-1",
        "label": {
          "th": "สุริยุปราคา",
          "en": "Solar Eclipse",
          "zh": "日食"
        },
        "icon": "☀️"
      },
      {
        "id": "opt-k3-inq-m7-2",
        "label": {
          "th": "จันทรุปราคา (จันทรคราส) 🌑",
          "en": "Lunar Eclipse",
          "zh": "月食（月全食/月偏食）🌑"
        },
        "icon": "🌑"
      },
      {
        "id": "opt-k3-inq-m7-3",
        "label": {
          "th": "ดาวหางชนโลก",
          "en": "Comet collision",
          "zh": "彗星撞地球"
        },
        "icon": "☄️"
      }
    ],
    "correctOptionId": "opt-k3-inq-m7-2",
    "explanation": {
      "th": "จันทรุปราคาเกิดเมื่อดวงจันทร์เคลื่อนเข้าสู่เงาของโลกในคืนเพ็ญ เก่งมากครับ!",
      "en": "Correct! A lunar eclipse occurs when Earth blocks sunlight from hitting the moon.",
      "zh": "答对了！月食是月球进入地球遮挡的阴影区引发的天文现象。"
    }
  },
  {
    "id": "k3-inq-m8",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "สารอาหารประเภท \"แคลเซียม\" ที่มีมากในนมสดและปลาตัวเล็ก 🥛 🐟 มีประโยชน์หลักต่อร่างกายอย่างไร?",
      "en": "Nutrient CALCIUM in milk and tiny fish 🥛 🐟 primarily benefits what body part?",
      "zh": "牛奶、奶酪及可连骨吃的小鱼干 🥛 🐟 中富含的微量元素“钙质”，最核心的生理功效是？"
    },
    "illustration": "🥛 🦴 🦷",
    "illustrationSubtitle": {
      "th": "ประโยชน์ของแคลเซียม: บำรุงกระดูกและฟัน",
      "en": "Calcium strengthens bones & teeth",
      "zh": "钙质强健骨骼与牙齿"
    },
    "options": [
      {
        "id": "opt-k3-inq-m8-1",
        "label": {
          "th": "ทำให้บินได้เหมือนนก",
          "en": "Enables flight like bird",
          "zh": "让人体背部长出飞翔翅膀"
        },
        "icon": "🪶"
      },
      {
        "id": "opt-k3-inq-m8-2",
        "label": {
          "th": "ทำให้ผมกลายเป็นสีเขียวสดใส",
          "en": "Turns hair neon green",
          "zh": "把头发染成亮闪闪的绿色"
        },
        "icon": "💚"
      },
      {
        "id": "opt-k3-inq-m8-3",
        "label": {
          "th": "เสริมสร้างกระดูกและฟันให้แข็งแรง ไม่เปราะหักง่าย 🦴 🦷",
          "en": "Strengthens bones and teeth against fractures",
          "zh": "强化骨骼与牙齿发育坚固，预防骨质疏松 🦴 🦷"
        },
        "icon": "🦴"
      }
    ],
    "correctOptionId": "opt-k3-inq-m8-3",
    "explanation": {
      "th": "แคลเซียมเป็นแร่ธาตุสำคัญในการสร้างมวลกระดูกและฟันในวัยเด็ก เก่งมากครับ!",
      "en": "Spot on! Calcium builds resilient bone density and strong enamel teeth.",
      "zh": "太棒了！补充充足的钙质是长高个子、骨骼牙齿强健的基石。"
    }
  },
  {
    "id": "k3-inq-m9",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "ชั้นบรรยากาศของโลกมี \"ชั้นโอโซน\" (Ozone Layer) 🛡️ คอยทำหน้าที่ปกป้องสิ่งมีชีวิตอย่างไร?",
      "en": "What crucial shield does the atmospheric OZONE LAYER 🛡️ provide for life on Earth?",
      "zh": "地球大气平流层中的“臭氧层” 🛡️，就像一把保护伞，它为地表生物阻挡了什么？"
    },
    "illustration": "🛡️ ☀️ 🌍",
    "illustrationSubtitle": {
      "th": "ชั้นโอโซนกรองรังสีอัลตราไวโอเลต (UV)",
      "en": "Ozone layer blocks harmful UV rays",
      "zh": "臭氧层阻挡致命紫外线"
    },
    "options": [
      {
        "id": "opt-k3-inq-m9-1",
        "label": {
          "th": "ช่วยกรองและดูดซับรังสีอัลตราไวโอเลต (UV) ที่เป็นอันตรายจากดวงอาทิตย์ 🛡️",
          "en": "Filters and absorbs dangerous solar ultraviolet (UV) radiation",
          "zh": "强力吸收过滤来自太阳的有害过量紫外线（UV）辐射 🛡️"
        },
        "icon": "🛡️"
      },
      {
        "id": "opt-k3-inq-m9-2",
        "label": {
          "th": "ปิดกั้นไม่ให้มีฝนตกลงมา",
          "en": "Blocks rain completely",
          "zh": "彻底堵截一切降雨云系"
        },
        "icon": "🌧️"
      },
      {
        "id": "opt-k3-inq-m9-3",
        "label": {
          "th": "กักเก็บกลิ่นหอมของดอกไม้",
          "en": "Traps flower perfumes",
          "zh": "专门收集锁住花朵香气"
        },
        "icon": "🌸"
      }
    ],
    "correctOptionId": "opt-k3-inq-m9-1",
    "explanation": {
      "th": "โอโซนช่วยดูดซับรังสี UV ป้องกันมะเร็งผิวหนังและการทำลายพืช เก่งมากครับ!",
      "en": "Awesome! The stratospheric ozone layer screens harmful mutagenic UV rays.",
      "zh": "答对了！臭氧层吸收太阳紫外线，保护地球万物免遭辐射灼伤。"
    }
  },
  {
    "id": "k3-inq-m10",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 2,
    "question": {
      "th": "ซากดึกดำบรรพ์ (Fossil) เช่น \"รอยเท้าไดโนเสาร์หรือโครงกระดูกหิน\" 🦕 ให้ประโยชน์ทางวิทยาศาสตร์อย่างไร?",
      "en": "FOSSILS like dinosaur footprints or petrified bones 🦕 provide what scientific value?",
      "zh": "在岩层中发掘出的恐龙骨骼化石或远古足迹 🦕，为人类科学研究带来了什么无价价值？"
    },
    "illustration": "🦕 🪨 🔬",
    "illustrationSubtitle": {
      "th": "ประโยชน์ของซากดึกดำบรรพ์ (ฟอสซิล)",
      "en": "Fossils reveal prehistoric life & history",
      "zh": "化石揭示史前生命演化历史"
    },
    "options": [
      {
        "id": "opt-k3-inq-m10-1",
        "label": {
          "th": "สามารถนำไปใช้ขับขี่แทนรถยนต์ได้",
          "en": "Can be driven like cars",
          "zh": "装上轮子可以直接当超级跑车开上路"
        },
        "icon": "🏎️"
      },
      {
        "id": "opt-k3-inq-m10-2",
        "label": {
          "th": "เป็นหลักฐานช่วยให้นักวิทยาศาสตร์เรียนรู้เกี่ยวกับสิ่งมีชีวิตและสภาพแวดล้อมในยุคดึกดำบรรพ์ 🦕",
          "en": "Evidence helping scientists uncover ancient life and prehistoric ecosystems",
          "zh": "是科学家研究亿万年前古生物物种、古气候与演化历史的铁证 🦕"
        },
        "icon": "🦕"
      },
      {
        "id": "opt-k3-inq-m10-3",
        "label": {
          "th": "ชุบชีวิตขึ้นมาทำเป็นของเล่นแจกฟรี",
          "en": "Revives into live toys",
          "zh": "一浇温水就能活过来变成活体玩具"
        },
        "icon": "🧸"
      }
    ],
    "correctOptionId": "opt-k3-inq-m10-2",
    "explanation": {
      "th": "ฟอสซิลคือบันทึกประวัติศาสตร์ธรรมชาติที่ช่วยให้เราเข้าใจวิวัฒนาการ เก่งมากครับ!",
      "en": "Correct! Fossils are windows into prehistoric life forms and ancient climates.",
      "zh": "答对啦！化石是解读地球生物演化密码、探索远古生态的科学钥匙。"
    }
  },
  {
    "id": "k3-inq-h1",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "การทดลองหยด \"สารละลายไอโอดีนสีน้ำตาล\" ลงบนกล้วยดิบหรือข้าวสุก 🍚 ถ้าพบว่าเปลี่ยนเป็น \"สีน้ำเงินอมม่วงเข้ม\" แสดงว่าในอาหารมีสารอาหารใด?",
      "en": "Drop brown iodine onto raw banana or rice 🍚. It turns DARK BLUE-PURPLE. What nutrient is present?",
      "zh": "科学试剂显色探究：在米饭粒或未熟香蕉切片上滴一滴棕褐色的碘液 🍚，瞬间变成深蓝紫色！这证明食物富含什么成分？"
    },
    "illustration": "🍚 🧪 🟣",
    "illustrationSubtitle": {
      "th": "การทดสอบแป้งด้วยสารละลายไอโอดีน",
      "en": "Iodine test detects Starch",
      "zh": "碘液遇淀粉变蓝紫色化学反应"
    },
    "options": [
      {
        "id": "opt-k3-inq-h1-1",
        "label": {
          "th": "โปรตีนไข่ขาว",
          "en": "Egg white protein",
          "zh": "鸡蛋清蛋白质"
        },
        "icon": "🥚"
      },
      {
        "id": "opt-k3-inq-h1-2",
        "label": {
          "th": "ไขมันสัตว์",
          "en": "Animal fat",
          "zh": "动物油脂"
        },
        "icon": "🧈"
      },
      {
        "id": "opt-k3-inq-h1-3",
        "label": {
          "th": "แป้ง (คาร์โบไฮเดรต) 🍞",
          "en": "Starch (Carbohydrate)",
          "zh": "淀粉（碳水化合物）🍞"
        },
        "icon": "🍞"
      }
    ],
    "correctOptionId": "opt-k3-inq-h1-3",
    "explanation": {
      "th": "สารละลายไอโอดีนใช้ทดสอบแป้ง โดยทำปฏิกิริยาเกิดสีน้ำเงินแกมม่วง เก่งมากครับ!",
      "en": "Spot on! Iodine solution specifically binds with starch coils to yield dark purple.",
      "zh": "太棒了！碘液是检验淀粉存在的经典科学试剂。"
    }
  },
  {
    "id": "k3-inq-h2",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "เมื่อเราเป่าฟองสบู่กลมๆ 🫧 ลอยเล่นกลางแสงแดด ทำไมผิวฟองสบู่จึงมีสีสันเหลือบเป็นสีรุ้ง?",
      "en": "Blow soap bubbles in sunlight 🫧. Why does the thin surface show shimmering RAINBOW colors?",
      "zh": "阳光下吹起的七彩肥皂泡泡 🫧 飘向蓝天，为什么薄薄的泡泡表面会泛出流光溢彩的彩虹色？"
    },
    "illustration": "🫧 🌈 ☀️",
    "illustrationSubtitle": {
      "th": "การแทรกสอดของแสงบนฟิล์มบางสบู่",
      "en": "Thin-film interference of light on soap",
      "zh": "薄膜干涉彩虹光干涉现象"
    },
    "options": [
      {
        "id": "opt-k3-inq-h2-1",
        "label": {
          "th": "เกิดจากการแทรกสอดของคลื่นแสงสะท้อนจากผิวนอกและผิวในของฟิล์มสบู่บางๆ 🫧",
          "en": "Thin-film optical interference between outer and inner bubble surfaces",
          "zh": "光波在薄薄的肥皂泡内外两层表面反射时发生了“薄膜干涉” 🫧"
        },
        "icon": "🫧"
      },
      {
        "id": "opt-k3-inq-h2-2",
        "label": {
          "th": "เพราะมีน้ำผลไม้ 7 สีผสมอยู่ข้างใน",
          "en": "Juice mixed inside",
          "zh": "因为洗洁精里混合了七彩水果果汁"
        },
        "icon": "🧃"
      },
      {
        "id": "opt-k3-inq-h2-3",
        "label": {
          "th": "มีหลอดไฟนีออนจิ๋วเปิดอยู่ข้างในฟอง",
          "en": "Mini bulbs inside",
          "zh": "泡泡空心内部悬浮安装了微型霓虹灯"
        },
        "icon": "💡"
      }
    ],
    "correctOptionId": "opt-k3-inq-h2-1",
    "explanation": {
      "th": "แสงสะท้อนจากผิวนอกและผิวในของฟิล์มสบู่รวมตัวกันเกิดปรากฏการณ์แทรกสอด เก่งมากครับ!",
      "en": "Correct! Thin-film interference causes constructive/destructive color wavelengths.",
      "zh": "答对了！光波在肥皂膜内外表面反射时发生干涉，形成了七彩薄膜色。"
    }
  },
  {
    "id": "k3-inq-h3",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "การเกิด \"น้ำขึ้น-น้ำลง\" 🌊 บริเวณชายฝั่งทะเล มีสาเหตุหลักมาจากแรงดึงดูดของสิ่งใด?",
      "en": "Ocean TIDES (high and low tide) 🌊 are primarily driven by the gravitational pull of what?",
      "zh": "海边每天发生的规律性潮起潮落、“海水涨潮与退潮” 🌊 现象，主要是由谁的天体引力引起的？"
    },
    "illustration": "🌊 🌕 🌊",
    "illustrationSubtitle": {
      "th": "แรงดึงดูดของดวงจันทร์ทำให้เกิดน้ำขึ้นน้ำลง",
      "en": "Moon's gravitational tidal pull",
      "zh": "月球与太阳的引潮力引起潮汐"
    },
    "options": [
      {
        "id": "opt-k3-inq-h3-1",
        "label": {
          "th": "พายุใต้ทะเลที่ปลาวาฬสร้างขึ้น",
          "en": "Whale storms",
          "zh": "深海万头抹香鲸集体翻滚排出的水浪"
        },
        "icon": "🐋"
      },
      {
        "id": "opt-k3-inq-h3-2",
        "label": {
          "th": "แรงดึงดูดของดวงจันทร์และดวงอาทิตย์ที่กระทำต่อผิวน้ำของโลก 🌕",
          "en": "Gravitational pull of the Moon (and Sun) on Earth's water bodies",
          "zh": "月球（及太阳）对地球海洋水体施加的强大引潮引力 🌕"
        },
        "icon": "🌕"
      },
      {
        "id": "opt-k3-inq-h3-3",
        "label": {
          "th": "เรือดำน้ำแล่นใต้น้ำ",
          "en": "Submarines cruising",
          "zh": "世界各国潜水艇在海底快速巡游推动"
        },
        "icon": "🚢"
      }
    ],
    "correctOptionId": "opt-k3-inq-h3-2",
    "explanation": {
      "th": "แรงโน้มถ่วงของดวงจันทร์ดึงน้ำทะเลในด้านที่หันหาดวงจันทร์ให้โป่งพองเป็นน้ำขึ้น เก่งมากครับ!",
      "en": "Awesome! The Moon's orbital gravity pulls Earth's oceans, creating high/low tides.",
      "zh": "太棒了！月球引力是主导地球海洋潮汐涨落的最主要动力。"
    }
  },
  {
    "id": "k3-inq-h4",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "ถ้าทดลอง \"ครอบต้นไม้ในกระถางด้วยถุงพลาสติกใสแล้วมัดปากถุงไว้กลางแดด\" 🪴 สักพักจะพบละอองน้ำเกาะเต็มถุง เป็นการพิสูจน์สิ่งใด?",
      "en": "Tie a clear plastic bag over potted leaves in sunlight 🪴. Droplets collect inside. What does this prove?",
      "zh": "探究实验：用透明塑料袋套住盆栽植物的绿色枝叶，扎紧袋口置于阳光下 🪴，不久袋壁布满水雾小水珠！这证实了植物具有什么生理作用？"
    },
    "illustration": "🪴 💦 🔬",
    "illustrationSubtitle": {
      "th": "การคายน้ำของพืชทางปากใบ",
      "en": "Plant transpiration through stomata",
      "zh": "植物通过气孔进行蒸腾作用"
    },
    "options": [
      {
        "id": "opt-k3-inq-h4-1",
        "label": {
          "th": "ถุงพลาสติกละลายกลายเป็นน้ำ",
          "en": "Bag turned to water",
          "zh": "透明塑料袋被晒化流出了塑料水"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-inq-h4-2",
        "label": {
          "th": "พืชสามารถร้องไห้ได้",
          "en": "Plants crying tears",
          "zh": "植物受到了惊吓在偷偷流眼泪"
        },
        "icon": "😢"
      },
      {
        "id": "opt-k3-inq-h4-3",
        "label": {
          "th": "พืชมีการ \"คายน้ำ\" ออกมาทางปากใบในรูปของไอน้ำ 💦",
          "en": "Plants TRANPIRE water vapor through leaf stomata pores",
          "zh": "植物会通过叶片上的气孔进行“蒸腾作用”散失水分 💦"
        },
        "icon": "💦"
      }
    ],
    "correctOptionId": "opt-k3-inq-h4-3",
    "explanation": {
      "th": "พืชคายน้ำทางปากใบเพื่อช่วยลดความร้อนและลำเลียงน้ำจากราก เก่งมากครับ!",
      "en": "Spot on! Transpiration pulls water upward from roots and cools leaves.",
      "zh": "太棒了！蒸腾作用通过气孔散发水分，拉动根系水分养分向上运输。"
    }
  },
  {
    "id": "k3-inq-h5",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "ทำไมยานอวกาศและดาวเทียม 🛰️ ที่โคจรอยู่ในอวกาศรอบโลก จึงลอยเคว้งคว้างในสภาวะไร้น้ำหนัก?",
      "en": "Why do satellites and astronauts 🛰️ orbit Earth in a state of continuous WEIGHTLESSNESS?",
      "zh": "为什么在近地轨道环绕地球飞行的航天员和空间站 🛰️，会处于神奇的完全失重悬浮状态？"
    },
    "illustration": "🛰️ 🧑‍🚀 🌍",
    "illustrationSubtitle": {
      "th": "สภาวะไร้น้ำหนักในการโคจร (การตกอย่างอิสระ)",
      "en": "Orbital free-fall weightlessness",
      "zh": "轨道自由落体造成完全失重"
    },
    "options": [
      {
        "id": "opt-k3-inq-h5-1",
        "label": {
          "th": "ยานอวกาศกำลังเคลื่อนที่ด้วยความเร็วสูงและ \"ตกอย่างอิสระรอบโลกตลอดเวลา\" 🛰️",
          "en": "Spacecraft is in perpetual high-speed free-fall around the curve of Earth",
          "zh": "飞船以第一宇宙速度高速前行，时刻处于绕地球引力的“持续自由落体”中 🛰️"
        },
        "icon": "🛰️"
      },
      {
        "id": "opt-k3-inq-h5-2",
        "label": {
          "th": "เพราะในอวกาศไม่มีแรงโน้มถ่วงแม้แต่นิดเดียว",
          "en": "Zero gravity exists",
          "zh": "因为太空中地心引力瞬间变成了绝对为零"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-inq-h5-3",
        "label": {
          "th": "เพราะนักบินอวกาศกินยาตัวเบา",
          "en": "Ate floating pills",
          "zh": "因为宇航员起飞前服用了特制轻身漂浮药"
        },
        "icon": "💊"
      }
    ],
    "correctOptionId": "opt-k3-inq-h5-1",
    "explanation": {
      "th": "การโคจรคือการตกอย่างอิสระที่มีความเร็วไปข้างหน้าอย่างสมดุล ทำให้ไม่ตกลงสู่พื้น เก่งมากครับ!",
      "en": "Correct! Orbiting is continuous free-fall curving around Earth without impacting.",
      "zh": "答对了！轨道绕行本质上是绕着地表曲率持续下落，形成失重状态。"
    }
  },
  {
    "id": "k3-inq-h6",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "การเกิด \"แผ่นดินไหว\" (Earthquake) 🌋 เกิดจากสาเหตุทางธรณีวิทยาข้อใด?",
      "en": "What geological event causes EARTHQUAKES 🌋 shaking the ground?",
      "zh": "剧烈摇晃大地的破坏性地质灾害“地震” 🌋，从地质科学角度其根本形成原因是？"
    },
    "illustration": "🌋 ⚡ 🪨",
    "illustrationSubtitle": {
      "th": "การเคลื่อนตัวของแผ่นเปลือกโลก",
      "en": "Tectonic plate movement & stress release",
      "zh": "地壳岩石板块碰撞断裂释放应力"
    },
    "options": [
      {
        "id": "opt-k3-inq-h6-1",
        "label": {
          "th": "ยักษ์ใต้พิภพตื่นขึ้นมาวิ่งเล่น",
          "en": "Giants running deep underground",
          "zh": "地幔深处沉睡万年的巨人翻身跑步"
        },
        "icon": "👹"
      },
      {
        "id": "opt-k3-inq-h6-2",
        "label": {
          "th": "แผ่นเปลือกโลกใต้ผืนดินเคลื่อนที่ชนกันหรือเลื่อนตัวจนปลดปล่อยพลังงานมหาศาล 🌋",
          "en": "Tectonic plates grind, slip, and suddenly release massive seismic strain energy",
          "zh": "地下板块构造发生挤压碰撞或错位断裂，积聚的能量瞬间爆发释放 🌋"
        },
        "icon": "🌋"
      },
      {
        "id": "opt-k3-inq-h6-3",
        "label": {
          "th": "ลมพัดแรงเกินไปบนยอดเขา",
          "en": "Wind on peaks too strong",
          "zh": "高山山顶风速太大吹动了地球"
        },
        "icon": "💨"
      }
    ],
    "correctOptionId": "opt-k3-inq-h6-2",
    "explanation": {
      "th": "แผ่นเปลือกโลกเคลื่อนที่ตลอดเวลา เมื่อเกิดการเสียดสีขัดกันจะสะสมพลังงานจนปลดปล่อยแผ่นดินไหว เก่งมากครับ!",
      "en": "Awesome! Plate tectonics cause crustal strain release along fault lines.",
      "zh": "太棒了！板块运动积累形变能量，岩层断裂释放出地震波使地面震颤。"
    }
  },
  {
    "id": "k3-inq-h7",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "เมื่อนำ \"เบกกิ้งโซดา (ด่าง)\" มาผสมกับ \"น้ำส้มสายชู (กรด)\" 🧪 จะเกิดฟองฟู่และเกิดก๊าซชนิดใด?",
      "en": "Mix baking soda with vinegar 🧪. Bubbles fizz vigorously, producing which GAS?",
      "zh": "化学小实验：在小苏打粉末中倒入白醋酸 🧪，杯中立刻剧烈咕噜咕噜翻滚冒泡！释放出的气体是？"
    },
    "illustration": "🧪 🫧 💨",
    "illustrationSubtitle": {
      "th": "ปฏิกิริยากรดกับด่างเกิดก๊าซคาร์บอนไดออกไซด์",
      "en": "Acid-base reaction yields CO2 gas",
      "zh": "酸碱反应释放二氧化碳气体"
    },
    "options": [
      {
        "id": "opt-k3-inq-h7-1",
        "label": {
          "th": "น้ำแข็งแห้งก้อนแข็ง",
          "en": "Solid ice blocks",
          "zh": "冷冻干冰方块"
        },
        "icon": "🧊"
      },
      {
        "id": "opt-k3-inq-h7-2",
        "label": {
          "th": "ก๊าซทองคำ",
          "en": "Gold gas",
          "zh": "纯金蒸汽"
        },
        "icon": "🪙"
      },
      {
        "id": "opt-k3-inq-h7-3",
        "label": {
          "th": "ก๊าซคาร์บอนไดออกไซด์ (Carbon Dioxide) 💨",
          "en": "Carbon Dioxide gas (CO2)",
          "zh": "二氧化碳气体（CO2）💨"
        },
        "icon": "💨"
      }
    ],
    "correctOptionId": "opt-k3-inq-h7-3",
    "explanation": {
      "th": "กรดน้ำส้มทำปฏิกิริยากับเบกกิ้งโซดาได้ก๊าซคาร์บอนไดออกไซด์ที่ดับไฟได้ เก่งมากครับ!",
      "en": "Spot on! Acetic acid + sodium bicarbonate yields bubbling carbon dioxide.",
      "zh": "答对了！醋酸与碳酸氢钠发生酸碱反应，释放出二氧化碳气泡。"
    }
  },
  {
    "id": "k3-inq-h8",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "นกเพนกวิน 🐧 ที่อาศัยอยู่ในทวีปแอนตาร์กติกาอันหนาวเหน็บ มีการปรับตัวทางสรีระอย่างไรเพื่อให้อบอุ่น?",
      "en": "How do Emperor PENGUINS 🐧 stay warm in freezing -50°C Antarctica?",
      "zh": "生活在零下数十度极寒南极大陆的帝企鹅 🐧，身体具备什么生理特化结构来御寒保暖？"
    },
    "illustration": "🐧 ❄️ 🐧",
    "illustrationSubtitle": {
      "th": "การปรับตัวของเพนกวินในเขตหนาว",
      "en": "Penguin cold adaptation: Blubber & feathers",
      "zh": "企鹅耐寒生理构造：厚脂肪与密羽"
    },
    "options": [
      {
        "id": "opt-k3-inq-h8-1",
        "label": {
          "th": "มีชั้นไขมันใต้ผิวหนังหนาแน่น และมีขนแน่นกันน้ำลมหนาวได้อย่างสมบูรณ์แบบ 🐧",
          "en": "Dense layer of subcutaneous blubber and overlapping wind/waterproof feathers",
          "zh": "皮下拥有极其丰厚的保暖脂肪层，体表覆盖紧密防水防风的短硬羽毛 🐧"
        },
        "icon": "🐧"
      },
      {
        "id": "opt-k3-inq-h8-2",
        "label": {
          "th": "สวมเสื้อโค้ตขนแกะที่ซื้อมา",
          "en": "Wears store-bought coats",
          "zh": "在南极百货商店购买加厚羊毛大衣"
        },
        "icon": "🧥"
      },
      {
        "id": "opt-k3-inq-h8-3",
        "label": {
          "th": "ก่อกองไฟผิงตลอดเวลา",
          "en": "Lights bonfires daily",
          "zh": "随身携带打火机在冰原上烤火堆"
        },
        "icon": "🔥"
      }
    ],
    "correctOptionId": "opt-k3-inq-h8-1",
    "explanation": {
      "th": "ไขมันหนาและขนที่เรียงซ้อนกันแน่นหนาช่วยเก็บกักความร้อนในร่างกายได้ยอดเยี่ยม เก่งมากครับ!",
      "en": "Correct! Thick blubber insulating layers and dense waterproof down plumage trap body heat.",
      "zh": "答对啦！企鹅依靠厚厚的皮下脂肪和高密度羽毛有效抵御严寒。"
    }
  },
  {
    "id": "k3-inq-h9",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "ทำไมท้องฟ้าในเวลากลางวันจึงมองเห็นเป็น \"สีฟ้าสดใส\" 🌤️ แทนที่จะเป็นสีดำมืด?",
      "en": "Why does the daytime sky appear bright BLUE 🌤️ instead of pitch black?",
      "zh": "为什么晴朗的白天天空呈现出令人心旷神怡的“湛蓝色” 🌤️，而不是漆黑一片？"
    },
    "illustration": "🌤️ 🔬 ☀️",
    "illustrationSubtitle": {
      "th": "การกระเจิงของแสงเรย์ลี (Rayleigh Scattering)",
      "en": "Rayleigh scattering of blue light in atmosphere",
      "zh": "瑞利散射：蓝光短波易散射"
    },
    "options": [
      {
        "id": "opt-k3-inq-h9-1",
        "label": {
          "th": "เพราะมีสีฟ้าทาไว้บนหลังคาโลก",
          "en": "Blue paint painted",
          "zh": "因为外太空中有人涂了一层厚厚的蓝色油漆"
        },
        "icon": "🎨"
      },
      {
        "id": "opt-k3-inq-h9-2",
        "label": {
          "th": "โมเลกุลของก๊าซในชั้นบรรยากาศกระเจิงแสงสีฟ้าที่มีความยาวคลื่นสั้นได้ดีกว่าสีอื่น (Rayleigh Scattering) 🌤️",
          "en": "Atmospheric gas molecules scatter shorter blue wavelengths more intensely across the sky",
          "zh": "空气中微小气体分子最容易将波长较短的蓝色光散射向四面八方（瑞利散射）🌤️"
        },
        "icon": "🌤️"
      },
      {
        "id": "opt-k3-inq-h9-3",
        "label": {
          "th": "เพราะแสงสะท้อนจากน้ำทะเลขึ้นไป",
          "en": "Ocean water reflections",
          "zh": "完全是由地表大海的海水倒影投映上去的"
        },
        "icon": "🌊"
      }
    ],
    "correctOptionId": "opt-k3-inq-h9-2",
    "explanation": {
      "th": "แสงสีฟ้ามีความยาวคลื่นสั้น จึงกระเจิงในชั้นบรรยากาศได้ดีที่สุด ทำให้ท้องฟ้าเป็นสีฟ้า เก่งมากครับ!",
      "en": "Awesome! Rayleigh scattering disperses blue light broadly throughout our atmosphere.",
      "zh": "太棒了！短波长的蓝光被大气分子强烈散射，让整个白天苍穹呈现蔚蓝。"
    }
  },
  {
    "id": "k3-inq-h10",
    "grade": "K3",
    "subject": "inquiry",
    "skillCode": "4",
    "difficulty": 3,
    "question": {
      "th": "ผึ้ง 🐝 สื่อสารบอกตำแหน่งของ \"ดงดอกไม้ที่มีน้ำหวานแสนอร่อย\" ให้เพื่อนในรังรู้ได้อย่างไร?",
      "en": "How do honeybees 🐝 communicate the precise distance and direction of rich nectar blossoms to hive-mates?",
      "zh": "工蜂 🐝 飞回蜂巢后，是通过什么不可思议的高超方式向同伴精确传递“蜜源花丛的方向与距离”？"
    },
    "illustration": "🐝 💃 🌸",
    "illustrationSubtitle": {
      "th": "การเต้นรำสื่อสารของผึ้ง (Waggle Dance)",
      "en": "Bee waggle dance communication",
      "zh": "蜜蜂的摇摆舞与圆舞语言"
    },
    "options": [
      {
        "id": "opt-k3-inq-h10-1",
        "label": {
          "th": "เขียนแผนที่ด้วยดินสอ",
          "en": "Drawing maps with pencils",
          "zh": "拿彩色铅笔在蜂巢壁上绘制详细藏宝图"
        },
        "icon": "🗺️"
      },
      {
        "id": "opt-k3-inq-h10-2",
        "label": {
          "th": "โทรศัพท์หากันด้วยมือถือ",
          "en": "Calling on smartphones",
          "zh": "用小巧的智能手机发语音微信沟通"
        },
        "icon": "📱"
      },
      {
        "id": "opt-k3-inq-h10-3",
        "label": {
          "th": "การเต้นระบำส่ายก้นเป็นรูปเลข 8 (Waggle Dance) โดยอาศัยมุมของแสงอาทิตย์เป็นตัวบอกทิศทาง 🐝",
          "en": "Performing a figure-8 \"Waggle Dance\" angled relative to the sun's coordinates",
          "zh": "通过跳有规律的“8字形摆尾舞（摇摆舞）”，借助太阳角度精确导航 🐝"
        },
        "icon": "🐝"
      }
    ],
    "correctOptionId": "opt-k3-inq-h10-3",
    "explanation": {
      "th": "การเต้นส่ายตัวของผึ้งบอกทั้งทิศทาง ระยะทาง และความอุดมสมบูรณ์ของดอกไม้ เก่งมากครับ!",
      "en": "Spot on! Karl von Frisch discovered the famous Waggle Dance language of honeybees.",
      "zh": "答对啦！蜜蜂通过神奇优美的“8字摆尾舞”向蜂群精准传达花源方位和距离！"
    }
  }
];
