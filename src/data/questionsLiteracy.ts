import { Question } from '../types';

/**
 * คลังแบบทดสอบ: ภาษาและการรู้หนังสือ (Literacy) จำนวน 90 ข้อ
 * ครบ 3 ระดับชั้น (อ.1 - อ.3) ระดับความยากละ 10 ข้อ (ง่าย, ปานกลาง, ท้าทาย)
 * กระจายตำแหน่งคำตอบถูกต้อง A, B, C อย่างสมดุลเท่าเทียมกัน
 */
export const QUESTIONS_LITERACY: Question[] = [
  {
    "id": "k1-lit-e1",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "พยัญชนะไทยตัวนี้คือตัวอะไรเอ่ย? \"ก\"",
      "en": "Which Thai consonant is this? \"ก\"",
      "zh": "这个泰文字母是什么？“ก”"
    },
    "illustration": "🐔 ก 🐔",
    "illustrationSubtitle": {
      "th": "ก ไก่ กุ๊กกุ๊ก",
      "en": "Gor Kai (Chicken)",
      "zh": "小鸡 ก"
    },
    "options": [
      {
        "id": "opt-k1-lit-e1-1",
        "label": {
          "th": "ก ไก่",
          "en": "Gor Kai",
          "zh": "ก 小鸡"
        },
        "icon": "🐔"
      },
      {
        "id": "opt-k1-lit-e1-2",
        "label": {
          "th": "ข ไข่",
          "en": "Khor Khai",
          "zh": "ข 鸡蛋"
        },
        "icon": "🥚"
      },
      {
        "id": "opt-k1-lit-e1-3",
        "label": {
          "th": "ง งู",
          "en": "Ngor Ngu",
          "zh": "ง 大蛇"
        },
        "icon": "🐍"
      }
    ],
    "correctOptionId": "opt-k1-lit-e1-1",
    "explanation": {
      "th": "ยอดเยี่ยมมากครับ! \"ก\" คือ ก ไก่ ไม่มีหัวจ้ะ",
      "en": "Great job! \"ก\" is Gor Kai!",
      "zh": "太棒了！“ก” 就是小鸡！"
    }
  },
  {
    "id": "k1-lit-e2",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "ภาพไข่ไก่นี้ ตรงกับพยัญชนะตัวใด? \"🥚\"",
      "en": "Which consonant matches this egg? \"🥚\"",
      "zh": "这个鸡蛋对应哪一个泰文字母？“🥚”"
    },
    "illustration": "🥚 ✨ 🥚",
    "illustrationSubtitle": {
      "th": "ไข่ฟองกลม",
      "en": "Egg",
      "zh": "鸡蛋"
    },
    "options": [
      {
        "id": "opt-k1-lit-e2-1",
        "label": {
          "th": "ก ไก่",
          "en": "Gor Kai",
          "zh": "ก 小鸡"
        },
        "icon": "🐔"
      },
      {
        "id": "opt-k1-lit-e2-2",
        "label": {
          "th": "ข ไข่",
          "en": "Khor Khai",
          "zh": "ข 鸡蛋"
        },
        "icon": "🥚"
      },
      {
        "id": "opt-k1-lit-e2-3",
        "label": {
          "th": "จ จาน",
          "en": "Jor Jan",
          "zh": "จ 盘子"
        },
        "icon": "🍽️"
      }
    ],
    "correctOptionId": "opt-k1-lit-e2-2",
    "explanation": {
      "th": "ถูกต้องเลย! \"ข\" คือ ข ไข่ มีหัวม้วนกลมข้างบน",
      "en": "Correct! \"ข\" matches egg.",
      "zh": "答对了！“ข” 对应鸡蛋。"
    }
  },
  {
    "id": "k1-lit-e3",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "สัตว์เลื้อยคลานลำตัวยาว 🐍 ตรงกับพยัญชนะตัวใด?",
      "en": "Which consonant matches this snake? 🐍",
      "zh": "长长的蛇 🐍 对应哪一个字母？"
    },
    "illustration": "🐍 〰️ 🐍",
    "illustrationSubtitle": {
      "th": "งูเลื้อยไปมา",
      "en": "Slithering snake",
      "zh": "蜿蜒的长蛇"
    },
    "options": [
      {
        "id": "opt-k1-lit-e3-1",
        "label": {
          "th": "ก ไก่",
          "en": "Gor Kai",
          "zh": "ก 小鸡"
        },
        "icon": "🐔"
      },
      {
        "id": "opt-k1-lit-e3-2",
        "label": {
          "th": "จ จาน",
          "en": "Jor Jan",
          "zh": "จ 盘子"
        },
        "icon": "🍽️"
      },
      {
        "id": "opt-k1-lit-e3-3",
        "label": {
          "th": "ง งู",
          "en": "Ngor Ngu",
          "zh": "ง 大蛇"
        },
        "icon": "🐍"
      }
    ],
    "correctOptionId": "opt-k1-lit-e3-3",
    "explanation": {
      "th": "เก่งมากเลย! \"ง\" คือง งู ลำตัวยาว",
      "en": "Awesome! \"ง\" is Ngor Ngu (Snake).",
      "zh": "真聪明！“ง” 就是长蛇。"
    }
  },
  {
    "id": "k1-lit-e4",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "สิ่งของใส่อาหารนี้ 🍽️ ตรงกับพยัญชนะตัวใด?",
      "en": "Which consonant matches this plate? 🍽️",
      "zh": "这个餐盘 🍽️ 对应哪个字母？"
    },
    "illustration": "🍽️ 🍛 🍽️",
    "illustrationSubtitle": {
      "th": "จานใส่อาหาร",
      "en": "Plate for food",
      "zh": "盛菜的盘子"
    },
    "options": [
      {
        "id": "opt-k1-lit-e4-1",
        "label": {
          "th": "จ จาน",
          "en": "Jor Jan",
          "zh": "จ 盘子"
        },
        "icon": "🍽️"
      },
      {
        "id": "opt-k1-lit-e4-2",
        "label": {
          "th": "ด เด็ก",
          "en": "Dor Dek",
          "zh": "ด 孩子"
        },
        "icon": "🧒"
      },
      {
        "id": "opt-k1-lit-e4-3",
        "label": {
          "th": "ข ไข่",
          "en": "Khor Khai",
          "zh": "ข 鸡蛋"
        },
        "icon": "🥚"
      }
    ],
    "correctOptionId": "opt-k1-lit-e4-1",
    "explanation": {
      "th": "เก่งมากครับ! จ จาน ใช้ใส่อาหารอร่อยๆ",
      "en": "Spot on! จ is Jor Jan (Plate).",
      "zh": "非常好！จ 就是盘子。"
    }
  },
  {
    "id": "k1-lit-e5",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "สัตว์ตัวใหญ่ มีงวงและงา 🐘 ตรงกับพยัญชนะตัวใด?",
      "en": "Which consonant matches the elephant? 🐘",
      "zh": "长着长鼻子的大象 🐘 对应哪个字母？"
    },
    "illustration": "🐘 🌳 🐘",
    "illustrationSubtitle": {
      "th": "ช้างตัวใหญ่",
      "en": "Big elephant",
      "zh": "高大的大象"
    },
    "options": [
      {
        "id": "opt-k1-lit-e5-1",
        "label": {
          "th": "ก ไก่",
          "en": "Gor Kai",
          "zh": "ก 小鸡"
        },
        "icon": "🐔"
      },
      {
        "id": "opt-k1-lit-e5-2",
        "label": {
          "th": "ช ช้าง",
          "en": "Chor Chang",
          "zh": "ช 大象"
        },
        "icon": "🐘"
      },
      {
        "id": "opt-k1-lit-e5-3",
        "label": {
          "th": "ม ม้า",
          "en": "Mor Ma",
          "zh": "ม 骏马"
        },
        "icon": "🐎"
      }
    ],
    "correctOptionId": "opt-k1-lit-e5-2",
    "explanation": {
      "th": "ช ช้าง ตัวใหญ่ใจดี ถูกต้องแล้วครับ!",
      "en": "Correct! ช is Chor Chang (Elephant).",
      "zh": "大象 ช，答对啦！"
    }
  },
  {
    "id": "k1-lit-e6",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "เด็กๆ น่ารักอย่างพวกเรา 🧒 ตรงกับพยัญชนะตัวใด?",
      "en": "Which consonant matches happy children? 🧒",
      "zh": "活泼可爱的小朋友 🧒 对应哪个字母？"
    },
    "illustration": "🧒 🎒 🧒",
    "illustrationSubtitle": {
      "th": "เด็กนักเรียนน่ารัก",
      "en": "Cute student",
      "zh": "可爱的小朋友"
    },
    "options": [
      {
        "id": "opt-k1-lit-e6-1",
        "label": {
          "th": "ต เต่า",
          "en": "Tor Tao",
          "zh": "ต 乌龟"
        },
        "icon": "🐢"
      },
      {
        "id": "opt-k1-lit-e6-2",
        "label": {
          "th": "บ ใบไม้",
          "en": "Bor Baimai",
          "zh": "บ 树叶"
        },
        "icon": "🍃"
      },
      {
        "id": "opt-k1-lit-e6-3",
        "label": {
          "th": "ด เด็ก",
          "en": "Dor Dek",
          "zh": "ด 孩子"
        },
        "icon": "🧒"
      }
    ],
    "correctOptionId": "opt-k1-lit-e6-3",
    "explanation": {
      "th": "ด เด็ก ต้องขยันเรียน ถูกต้องนะคร้าบ!",
      "en": "Well done! ด is Dor Dek (Child).",
      "zh": "太棒了！ด 就是小朋友。"
    }
  },
  {
    "id": "k1-lit-e7",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "สัตว์สี่ขาเดินช้ามีกระดอง 🐢 ตรงกับพยัญชนะตัวใด?",
      "en": "Which consonant matches this slow turtle? 🐢",
      "zh": "背着硬壳爬得慢的小乌龟 🐢 对应哪个字母？"
    },
    "illustration": "🐢 🌊 🐢",
    "illustrationSubtitle": {
      "th": "เต่าเดินต้วมเตี้ยม",
      "en": "Slow turtle",
      "zh": "慢吞吞的小乌龟"
    },
    "options": [
      {
        "id": "opt-k1-lit-e7-1",
        "label": {
          "th": "ต เต่า",
          "en": "Tor Tao",
          "zh": "ต 乌龟"
        },
        "icon": "🐢"
      },
      {
        "id": "opt-k1-lit-e7-2",
        "label": {
          "th": "ด เด็ก",
          "en": "Dor Dek",
          "zh": "ด 孩子"
        },
        "icon": "🧒"
      },
      {
        "id": "opt-k1-lit-e7-3",
        "label": {
          "th": "ป ปลา",
          "en": "Por Pla",
          "zh": "ป 鱼儿"
        },
        "icon": "🐟"
      }
    ],
    "correctOptionId": "opt-k1-lit-e7-1",
    "explanation": {
      "th": "ต เต่า หลังตุง ถูกต้องเลยครับ!",
      "en": "Correct! ต is Tor Tao (Turtle).",
      "zh": "答对啦！ต 就是乌龟。"
    }
  },
  {
    "id": "k1-lit-e8",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "ใบไม้สีเขียวบนต้นไม้ 🍃 ตรงกับพยัญชนะตัวใด?",
      "en": "Which consonant matches green leaves? 🍃",
      "zh": "树上的绿叶 🍃 对应哪个字母？"
    },
    "illustration": "🍃 🌳 🍃",
    "illustrationSubtitle": {
      "th": "ใบไม้ร่มรื่น",
      "en": "Green leaf",
      "zh": "绿色的树叶"
    },
    "options": [
      {
        "id": "opt-k1-lit-e8-1",
        "label": {
          "th": "ป ปลา",
          "en": "Por Pla",
          "zh": "ป 鱼儿"
        },
        "icon": "🐟"
      },
      {
        "id": "opt-k1-lit-e8-2",
        "label": {
          "th": "บ ใบไม้",
          "en": "Bor Baimai",
          "zh": "บ 树叶"
        },
        "icon": "🍃"
      },
      {
        "id": "opt-k1-lit-e8-3",
        "label": {
          "th": "ม ม้า",
          "en": "Mor Ma",
          "zh": "ม 骏马"
        },
        "icon": "🐎"
      }
    ],
    "correctOptionId": "opt-k1-lit-e8-2",
    "explanation": {
      "th": "บ ใบไม้ ทับถม เก่งมากเลยครับ!",
      "en": "Great! บ is Bor Baimai (Leaf).",
      "zh": "真聪明！บ 就是树叶。"
    }
  },
  {
    "id": "k1-lit-e9",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "สัตว์ที่ว่ายน้ำอยู่ในสระ 🐟 มีหางยาว ตรงกับพยัญชนะใด?",
      "en": "Which consonant matches swimming fish? 🐟",
      "zh": "在水里游动的小鱼 🐟 对应哪个字母？"
    },
    "illustration": "🐟 💦 🐟",
    "illustrationSubtitle": {
      "th": "ปลาว่ายน้ำตากลม",
      "en": "Swimming fish",
      "zh": "游来游去的小鱼"
    },
    "options": [
      {
        "id": "opt-k1-lit-e9-1",
        "label": {
          "th": "บ ใบไม้",
          "en": "Bor Baimai",
          "zh": "บ 树叶"
        },
        "icon": "🍃"
      },
      {
        "id": "opt-k1-lit-e9-2",
        "label": {
          "th": "ก ไก่",
          "en": "Gor Kai",
          "zh": "ก 小鸡"
        },
        "icon": "🐔"
      },
      {
        "id": "opt-k1-lit-e9-3",
        "label": {
          "th": "ป ปลา",
          "en": "Por Pla",
          "zh": "ป 鱼儿"
        },
        "icon": "🐟"
      }
    ],
    "correctOptionId": "opt-k1-lit-e9-3",
    "explanation": {
      "th": "ป ปลา ตากลม หางยาวชี้ขึ้นฟ้า เก่งมากครับ!",
      "en": "Awesome! ป is Por Pla (Fish) with a long tail.",
      "zh": "太棒了！ป 就是游鱼。"
    }
  },
  {
    "id": "k1-lit-e10",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "สัตว์ที่วิ่งเร็ว ร้อง \"ฮี้ๆ กับกับ\" 🐎 ตรงกับพยัญชนะใด?",
      "en": "Which consonant matches this galloping horse? 🐎",
      "zh": "奔跑飞快的骏马 🐎 对应哪个字母？"
    },
    "illustration": "🐎 💨 🐎",
    "illustrationSubtitle": {
      "th": "ม้าวิ่งเร็วรี่",
      "en": "Fast horse",
      "zh": "飞奔的骏马"
    },
    "options": [
      {
        "id": "opt-k1-lit-e10-1",
        "label": {
          "th": "ม ม้า",
          "en": "Mor Ma",
          "zh": "ม 骏马"
        },
        "icon": "🐎"
      },
      {
        "id": "opt-k1-lit-e10-2",
        "label": {
          "th": "บ ใบไม้",
          "en": "Bor Baimai",
          "zh": "บ 树叶"
        },
        "icon": "🍃"
      },
      {
        "id": "opt-k1-lit-e10-3",
        "label": {
          "th": "ช ช้าง",
          "en": "Chor Chang",
          "zh": "ช 大象"
        },
        "icon": "🐘"
      }
    ],
    "correctOptionId": "opt-k1-lit-e10-1",
    "explanation": {
      "th": "ม ม้า คึกคัก ถูกต้องแล้วครับ!",
      "en": "Excellent! ม is Mor Ma (Horse).",
      "zh": "答对啦！ม 就是骏马。"
    }
  },
  {
    "id": "k1-lit-m1",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "สัตว์ชนิดใดส่งเสียงร้อง \"โฮ่ง โฮ่ง\"?",
      "en": "Which animal makes the sound \"Woof Woof\"?",
      "zh": "哪种小动物的叫声是“汪汪汪”？"
    },
    "illustration": "🐶 🦴 🐶",
    "illustrationSubtitle": {
      "th": "เสียงร้องของสัตว์เลี้ยง",
      "en": "Animal sound",
      "zh": "宠物的叫声"
    },
    "options": [
      {
        "id": "opt-k1-lit-m1-1",
        "label": {
          "th": "แมว",
          "en": "Cat",
          "zh": "小猫"
        },
        "icon": "🐱"
      },
      {
        "id": "opt-k1-lit-m1-2",
        "label": {
          "th": "สุนัข (หมา)",
          "en": "Dog",
          "zh": "小狗"
        },
        "icon": "🐶"
      },
      {
        "id": "opt-k1-lit-m1-3",
        "label": {
          "th": "เป็ด",
          "en": "Duck",
          "zh": "小鸭"
        },
        "icon": "🦆"
      }
    ],
    "correctOptionId": "opt-k1-lit-m1-2",
    "explanation": {
      "th": "ถูกต้องครับ! เจ้าตูบสุนัขส่งเสียงร้องโฮ่งๆ",
      "en": "Right! Dogs bark woof-woof!",
      "zh": "答对啦！小狗汪汪叫。"
    }
  },
  {
    "id": "k1-lit-m2",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "สัตว์ชนิดใดส่งเสียงร้อง \"เหมียว เหมียว\"?",
      "en": "Which animal makes the sound \"Meow Meow\"?",
      "zh": "哪种动物的叫声是“喵喵喵”？"
    },
    "illustration": "🐱 🧶 🐱",
    "illustrationSubtitle": {
      "th": "สัตว์เลี้ยงขนปุย",
      "en": "Fluffy pet",
      "zh": "毛茸茸的宠物"
    },
    "options": [
      {
        "id": "opt-k1-lit-m2-1",
        "label": {
          "th": "นก",
          "en": "Bird",
          "zh": "小鸟"
        },
        "icon": "🐦"
      },
      {
        "id": "opt-k1-lit-m2-2",
        "label": {
          "th": "วัว",
          "en": "Cow",
          "zh": "奶牛"
        },
        "icon": "🐮"
      },
      {
        "id": "opt-k1-lit-m2-3",
        "label": {
          "th": "แมว",
          "en": "Cat",
          "zh": "小猫"
        },
        "icon": "🐱"
      }
    ],
    "correctOptionId": "opt-k1-lit-m2-3",
    "explanation": {
      "th": "แมวเหมียว ร้องเหมียวๆ เก่งมากจ้ะ!",
      "en": "Meow! Cats say meow!",
      "zh": "聪明！猫咪喵喵叫。"
    }
  },
  {
    "id": "k1-lit-m3",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "พยัญชนะตัวใดในตัวเลือกนี้ \"ไม่มีหัวม้วนกลม\"?",
      "en": "Which of these consonants has NO circular head loop?",
      "zh": "下列哪一个泰文字母“没有小圆圈（头）”？"
    },
    "illustration": "✍️ ✨ ✍️",
    "illustrationSubtitle": {
      "th": "สังเกตรูปร่างพยัญชนะ",
      "en": "Observe letter shape",
      "zh": "观察字母形状"
    },
    "options": [
      {
        "id": "opt-k1-lit-m3-1",
        "label": {
          "th": "ก",
          "en": "Gor",
          "zh": "ก"
        },
        "icon": "🐔"
      },
      {
        "id": "opt-k1-lit-m3-2",
        "label": {
          "th": "ง",
          "en": "Ngor",
          "zh": "ง"
        },
        "icon": "🐍"
      },
      {
        "id": "opt-k1-lit-m3-3",
        "label": {
          "th": "ข",
          "en": "Khor",
          "zh": "ข"
        },
        "icon": "🥚"
      }
    ],
    "correctOptionId": "opt-k1-lit-m3-1",
    "explanation": {
      "th": "สุดยอดมาก! ตัว \"ก\" ไม่มีหัวม้วนกลมเลย",
      "en": "Brilliant! \"ก\" has no circle loop.",
      "zh": "太厉害了！“ก” 没有圆圈头。"
    }
  },
  {
    "id": "k1-lit-m4",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "พยัญชนะตัวใดมี \"หางยาวชี้ขึ้นฟ้า\"?",
      "en": "Which letter has a long tail pointing up?",
      "zh": "哪一个字母有一条“长长向上伸的小尾巴”？"
    },
    "illustration": "🐟 📏 🐟",
    "illustrationSubtitle": {
      "th": "หางยาวชี้ขึ้นบน",
      "en": "Long tail up",
      "zh": "尾巴朝上长"
    },
    "options": [
      {
        "id": "opt-k1-lit-m4-1",
        "label": {
          "th": "บ (บ ใบไม้)",
          "en": "Bor Baimai",
          "zh": "บ (叶)"
        },
        "icon": "🍃"
      },
      {
        "id": "opt-k1-lit-m4-2",
        "label": {
          "th": "ป (ป ปลา)",
          "en": "Por Pla",
          "zh": "ป (鱼)"
        },
        "icon": "🐟"
      },
      {
        "id": "opt-k1-lit-m4-3",
        "label": {
          "th": "ก (ก ไก่)",
          "en": "Gor Kai",
          "zh": "ก (鸡)"
        },
        "icon": "🐔"
      }
    ],
    "correctOptionId": "opt-k1-lit-m4-2",
    "explanation": {
      "th": "เก่งมากจ้า! \"ป ปลา\" มีหางยาวชี้สูงกว่า บ ใบไม้",
      "en": "Super! ป has a tall tail.",
      "zh": "真棒！ป 比 บ 的尾巴更长。"
    }
  },
  {
    "id": "k1-lit-m5",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "พยัญชนะ \"ด\" กับ \"ต\" ตัวใดมี \"รอยหยักบนหัว\"?",
      "en": "Between \"ด\" and \"ต\", which one has an indented notch on top?",
      "zh": "字母“ด”和“ต”中，哪一个头顶上有“凹进去的凹槽”？"
    },
    "illustration": "🐢 🆚 🧒",
    "illustrationSubtitle": {
      "th": "สังเกตหัวพยัญชนะ",
      "en": "Notch on the head",
      "zh": "观察头部的凹槽"
    },
    "options": [
      {
        "id": "opt-k1-lit-m5-1",
        "label": {
          "th": "ด เด็ก",
          "en": "Dor Dek",
          "zh": "ด 孩子"
        },
        "icon": "🧒"
      },
      {
        "id": "opt-k1-lit-m5-2",
        "label": {
          "th": "ก ไก่",
          "en": "Gor Kai",
          "zh": "ก 小鸡"
        },
        "icon": "🐔"
      },
      {
        "id": "opt-k1-lit-m5-3",
        "label": {
          "th": "ต เต่า",
          "en": "Tor Tao",
          "zh": "ต 乌龟"
        },
        "icon": "🐢"
      }
    ],
    "correctOptionId": "opt-k1-lit-m5-3",
    "explanation": {
      "th": "ต เต่า หลังตุง หัวแตกมีรอยหยัก เก่งมากครับ!",
      "en": "Tor Tao (ต) has a notch on top!",
      "zh": "答对啦！ต 头顶有凹槽。"
    }
  },
  {
    "id": "k1-lit-m6",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "สัตว์ชนิดใดส่งเสียงร้อง \"ก๊าบ ก๊าบ\"?",
      "en": "Which animal says \"Quack Quack\"?",
      "zh": "哪种动物的叫声是“嘎嘎嘎”？"
    },
    "illustration": "🦆 💦 🦆",
    "illustrationSubtitle": {
      "th": "สัตว์ปีกชอบว่ายน้ำ",
      "en": "Water bird",
      "zh": "喜欢玩水的小鸭"
    },
    "options": [
      {
        "id": "opt-k1-lit-m6-1",
        "label": {
          "th": "เป็ด",
          "en": "Duck",
          "zh": "鸭子"
        },
        "icon": "🦆"
      },
      {
        "id": "opt-k1-lit-m6-2",
        "label": {
          "th": "ไก่",
          "en": "Chicken",
          "zh": "小鸡"
        },
        "icon": "🐔"
      },
      {
        "id": "opt-k1-lit-m6-3",
        "label": {
          "th": "ช้าง",
          "en": "Elephant",
          "zh": "大象"
        },
        "icon": "🐘"
      }
    ],
    "correctOptionId": "opt-k1-lit-m6-1",
    "explanation": {
      "th": "เป็ดอาบน้ำในคลอง ร้องก๊าบๆ ถูกต้องเลยครับ!",
      "en": "Quack quack! Ducks say quack!",
      "zh": "正确！鸭子嘎嘎叫。"
    }
  },
  {
    "id": "k1-lit-m7",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "รูปภาพ \"ดวงตา\" 👀 ใช้พยัญชนะตัวใดเป็นเสียงแรก?",
      "en": "What is the starting consonant for eyes (ตา)? 👀",
      "zh": "眼睛 👀 对应的第一个声母是什么？"
    },
    "illustration": "👀 ✨ 👀",
    "illustrationSubtitle": {
      "th": "ดวงตาคู่งาม",
      "en": "Eyes",
      "zh": "明亮的眼睛"
    },
    "options": [
      {
        "id": "opt-k1-lit-m7-1",
        "label": {
          "th": "ก ไก่",
          "en": "Gor Kai",
          "zh": "ก 小鸡"
        },
        "icon": "🐔"
      },
      {
        "id": "opt-k1-lit-m7-2",
        "label": {
          "th": "ต เต่า (ตา)",
          "en": "Tor Tao (Ta)",
          "zh": "ต 乌龟 (ตา 眼睛)"
        },
        "icon": "👀"
      },
      {
        "id": "opt-k1-lit-m7-3",
        "label": {
          "th": "ป ปลา",
          "en": "Por Pla",
          "zh": "ป 鱼儿"
        },
        "icon": "🐟"
      }
    ],
    "correctOptionId": "opt-k1-lit-m7-2",
    "explanation": {
      "th": "ต อา ตา ยอดเยี่ยมมากครับ!",
      "en": "Awesome! ต is the starting letter for ตา (Eyes).",
      "zh": "太棒啦！ต 就是眼睛 (ตา)。"
    }
  },
  {
    "id": "k1-lit-m8",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "สัตว์ชนิดใดส่งเสียงร้อง \"มอ มอ\"?",
      "en": "Which animal makes the sound \"Moo Moo\"?",
      "zh": "哪种动物会发出“哞哞”的叫声？"
    },
    "illustration": "🐮 🥛 🐮",
    "illustrationSubtitle": {
      "th": "สัตว์กินหญ้าให้นม",
      "en": "Gives milk",
      "zh": "吃草挤奶的水牛/黄牛"
    },
    "options": [
      {
        "id": "opt-k1-lit-m8-1",
        "label": {
          "th": "ลิง",
          "en": "Monkey",
          "zh": "猴子"
        },
        "icon": "🐵"
      },
      {
        "id": "opt-k1-lit-m8-2",
        "label": {
          "th": "หมู",
          "en": "Pig",
          "zh": "小猪"
        },
        "icon": "🐷"
      },
      {
        "id": "opt-k1-lit-m8-3",
        "label": {
          "th": "วัว",
          "en": "Cow",
          "zh": "奶牛"
        },
        "icon": "🐮"
      }
    ],
    "correctOptionId": "opt-k1-lit-m8-3",
    "explanation": {
      "th": "วัวใจดี ร้องมอๆ ให้นมดื่ม เก่งมากครับ!",
      "en": "Moo! Cows say moo!",
      "zh": "答对啦！奶牛哞哞叫。"
    }
  },
  {
    "id": "k1-lit-m9",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำว่า \"ปาก\" 👄 เริ่มต้นด้วยพยัญชนะตัวใด?",
      "en": "What is the initial consonant of mouth (ปาก)? 👄",
      "zh": "嘴巴 (ปาก) 👄 的首字母是哪个？"
    },
    "illustration": "👄 🗣️ 👄",
    "illustrationSubtitle": {
      "th": "ปากพูดจาไพเราะ",
      "en": "Mouth",
      "zh": "说话的小嘴巴"
    },
    "options": [
      {
        "id": "opt-k1-lit-m9-1",
        "label": {
          "th": "ป ปลา (ปาก)",
          "en": "Por Pla",
          "zh": "ป (嘴巴)"
        },
        "icon": "👄"
      },
      {
        "id": "opt-k1-lit-m9-2",
        "label": {
          "th": "ม ม้า",
          "en": "Mor Ma",
          "zh": "ม 骏马"
        },
        "icon": "🐎"
      },
      {
        "id": "opt-k1-lit-m9-3",
        "label": {
          "th": "ข ไข่",
          "en": "Khor Khai",
          "zh": "ข 鸡蛋"
        },
        "icon": "🥚"
      }
    ],
    "correctOptionId": "opt-k1-lit-m9-1",
    "explanation": {
      "th": "ป ปลา ปาก เก่งมากเลยครับ!",
      "en": "Well done! ป is for ปาก (Mouth).",
      "zh": "真聪明！ป 就是嘴巴。"
    }
  },
  {
    "id": "k1-lit-m10",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "สิ่งของที่ใช้ \"เขียนหนังสือ\" ✏️ คืออะไร?",
      "en": "What tool do we use to write letters? ✏️",
      "zh": "我们写字画画用什么文具？✏️"
    },
    "illustration": "✏️ 📝 ✏️",
    "illustrationSubtitle": {
      "th": "อุปกรณ์เครื่องเขียน",
      "en": "Writing tool",
      "zh": "写字画画的笔"
    },
    "options": [
      {
        "id": "opt-k1-lit-m10-1",
        "label": {
          "th": "ไม้กวาด",
          "en": "Broom",
          "zh": "扫把"
        },
        "icon": "🧹"
      },
      {
        "id": "opt-k1-lit-m10-2",
        "label": {
          "th": "ดินสอ",
          "en": "Pencil",
          "zh": "铅笔"
        },
        "icon": "✏️"
      },
      {
        "id": "opt-k1-lit-m10-3",
        "label": {
          "th": "ช้อนส้อม",
          "en": "Spoon",
          "zh": "餐勺"
        },
        "icon": "🥄"
      }
    ],
    "correctOptionId": "opt-k1-lit-m10-2",
    "explanation": {
      "th": "ดินสอใช้เขียนหนังสือและวาดรูป ถูกต้องครับ!",
      "en": "Correct! A pencil is used for writing.",
      "zh": "答对了！铅笔用来写字。"
    }
  },
  {
    "id": "k1-lit-h1",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"กา\" 🐦 ผสมด้วยพยัญชนะ ก และสระใด?",
      "en": "In the word \"กา\", what vowel combines with ก?",
      "zh": "单词“กา”（乌鸦）由声母 ก 和哪个元音组成？"
    },
    "illustration": "🐦 ก + า 🐦",
    "illustrationSubtitle": {
      "th": "ก - อา - กา",
      "en": "Gor + Ah = Ga",
      "zh": "ก + า = กา"
    },
    "options": [
      {
        "id": "opt-k1-lit-h1-1",
        "label": {
          "th": "สระ อู ( -ู )",
          "en": "Vowel Oo",
          "zh": "元音 ู"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k1-lit-h1-2",
        "label": {
          "th": "สระ อี ( -ี )",
          "en": "Vowel Ee",
          "zh": "元音 ี"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k1-lit-h1-3",
        "label": {
          "th": "สระ อา ( -า )",
          "en": "Vowel Ah",
          "zh": "元音 า"
        },
        "icon": "🔤"
      }
    ],
    "correctOptionId": "opt-k1-lit-h1-3",
    "explanation": {
      "th": "ก - อา - กา เก่งมากครับ! สระอาลากข้าง",
      "en": "Spot on! The vowel is Ah (-า).",
      "zh": "太棒了！元音是 -า。"
    }
  },
  {
    "id": "k1-lit-h2",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำตรงข้าม: คำว่า \"เปิดประตู\" 🚪 ตรงข้ามกับคำว่าอะไร?",
      "en": "Opposite: What is the opposite of \"Open the door\"?",
      "zh": "反义词：“开门” 🚪 的反义词是什么？"
    },
    "illustration": "🚪 ↔️ 🚪",
    "illustrationSubtitle": {
      "th": "คำตรงข้าม",
      "en": "Opposite action",
      "zh": "相反的动作"
    },
    "options": [
      {
        "id": "opt-k1-lit-h2-1",
        "label": {
          "th": "ปิดประตู",
          "en": "Close door",
          "zh": "关门"
        },
        "icon": "🚪"
      },
      {
        "id": "opt-k1-lit-h2-2",
        "label": {
          "th": "พังประตู",
          "en": "Break",
          "zh": "踢门"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k1-lit-h2-3",
        "label": {
          "th": "เคาะประตู",
          "en": "Knock",
          "zh": "敲门"
        },
        "icon": "✊"
      }
    ],
    "correctOptionId": "opt-k1-lit-h2-1",
    "explanation": {
      "th": "เปิด ตรงข้ามกับ ปิด เก่งมากครับ!",
      "en": "Correct! Open is opposite to Close.",
      "zh": "答对啦！开门的反义词是关门。"
    }
  },
  {
    "id": "k1-lit-h3",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำตรงข้าม: คำว่า \"สูง\" 🦒 ตรงข้ามกับคำว่าอะไร?",
      "en": "Opposite: What is the opposite of \"Tall\" (สูง)?",
      "zh": "反义词：“高” 🦒 的反义词是什么？"
    },
    "illustration": "🦒 ↔️ 🐢",
    "illustrationSubtitle": {
      "th": "เปรียบเทียบความสูง",
      "en": "Opposite of Tall",
      "zh": "比较高矮"
    },
    "options": [
      {
        "id": "opt-k1-lit-h3-1",
        "label": {
          "th": "ใหญ่",
          "en": "Big",
          "zh": "大"
        },
        "icon": "🐘"
      },
      {
        "id": "opt-k1-lit-h3-2",
        "label": {
          "th": "เตี้ย",
          "en": "Short",
          "zh": "矮"
        },
        "icon": "🐢"
      },
      {
        "id": "opt-k1-lit-h3-3",
        "label": {
          "th": "เร็ว",
          "en": "Fast",
          "zh": "快"
        },
        "icon": "⚡"
      }
    ],
    "correctOptionId": "opt-k1-lit-h3-2",
    "explanation": {
      "th": "สูง ตรงข้ามกับ เตี้ย ยอดเยี่ยมมากครับ!",
      "en": "Awesome! Tall is opposite to Short.",
      "zh": "真棒！高的反义词是矮。"
    }
  },
  {
    "id": "k1-lit-h4",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"มา\" มีเสียงสระเหมือนกับคำว่าอะไร?",
      "en": "Which word has the same vowel sound as \"มา\" (Ma)?",
      "zh": "哪一个词的发音元音和“มา”相同？"
    },
    "illustration": "🗣️ มา - ? 🗣️",
    "illustrationSubtitle": {
      "th": "เสียงสระเดียวกัน",
      "en": "Same vowel sound",
      "zh": "相同元音"
    },
    "options": [
      {
        "id": "opt-k1-lit-h4-1",
        "label": {
          "th": "ดู (ด-อู-ดู)",
          "en": "Doo",
          "zh": "ดู (Doo)"
        },
        "icon": "📺"
      },
      {
        "id": "opt-k1-lit-h4-2",
        "label": {
          "th": "ตี (ต-อี-ตี)",
          "en": "Tee",
          "zh": "ตี (Tee)"
        },
        "icon": "🔨"
      },
      {
        "id": "opt-k1-lit-h4-3",
        "label": {
          "th": "ตา (ต-อา-ตา)",
          "en": "Ta",
          "zh": "ตา (Ta)"
        },
        "icon": "👀"
      }
    ],
    "correctOptionId": "opt-k1-lit-h4-3",
    "explanation": {
      "th": "มา และ ตา มีสระ อา เหมือนกัน เก่งมากครับ!",
      "en": "Both มา and ตา use the vowel Ah (-า)!",
      "zh": "太棒了！มา 和 ตา 都是元音 า。"
    }
  },
  {
    "id": "k1-lit-h5",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"ปู\" 🦀 ผสมด้วยสระตัวใดที่อยู่ \"ข้างล่าง\"?",
      "en": "In the word \"ปู\" (Crab), which bottom vowel is used?",
      "zh": "单词“ปู”（螃蟹）下方带的是哪个元音？"
    },
    "illustration": "🦀 ป + ู 🦀",
    "illustrationSubtitle": {
      "th": "ป - อู - ปู",
      "en": "Por + Oo = Poo",
      "zh": "ป + ู = ปู"
    },
    "options": [
      {
        "id": "opt-k1-lit-h5-1",
        "label": {
          "th": "สระ อู ( -ู )",
          "en": "Vowel Oo",
          "zh": "元音 ู"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k1-lit-h5-2",
        "label": {
          "th": "สระ อี",
          "en": "Vowel Ee",
          "zh": "元音 ี"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k1-lit-h5-3",
        "label": {
          "th": "สระ อา",
          "en": "Vowel Ah",
          "zh": "元音 า"
        },
        "icon": "🔤"
      }
    ],
    "correctOptionId": "opt-k1-lit-h5-1",
    "explanation": {
      "th": "ป - อู - ปู สระอูอยู่ข้างล่าง เก่งมากครับ!",
      "en": "Correct! Vowel Oo (-ู) sits below.",
      "zh": "答对啦！元音 ู 位于下方。"
    }
  },
  {
    "id": "k1-lit-h6",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำตรงข้าม: คำว่า \"ร้อน\" ☀️ ตรงข้ามกับคำว่าอะไร?",
      "en": "Opposite: What is the opposite of \"Hot\" (ร้อน)?",
      "zh": "反义词：“热” ☀️ 的反义词是什么？"
    },
    "illustration": "☀️ ↔️ ❄️",
    "illustrationSubtitle": {
      "th": "คำตรงข้ามอุณหภูมิ",
      "en": "Hot vs Cold",
      "zh": "冷热反义词"
    },
    "options": [
      {
        "id": "opt-k1-lit-h6-1",
        "label": {
          "th": "เผ็ด",
          "en": "Spicy",
          "zh": "辣"
        },
        "icon": "🌶️"
      },
      {
        "id": "opt-k1-lit-h6-2",
        "label": {
          "th": "เย็น",
          "en": "Cold",
          "zh": "冷"
        },
        "icon": "❄️"
      },
      {
        "id": "opt-k1-lit-h6-3",
        "label": {
          "th": "อุ่น",
          "en": "Warm",
          "zh": "温"
        },
        "icon": "🍵"
      }
    ],
    "correctOptionId": "opt-k1-lit-h6-2",
    "explanation": {
      "th": "ร้อน ตรงข้ามกับ เย็น ถูกต้องที่สุด!",
      "en": "Hot is opposite to Cold!",
      "zh": "答对啦！热的反义词是冷。"
    }
  },
  {
    "id": "k1-lit-h7",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "ภาพเด็กยิ้มสดใส 😊 ตรงกับคำว่าอะไร?",
      "en": "Which word matches this beaming happy face? 😊",
      "zh": "开心笑脸 😊 对应哪一个词语？"
    },
    "illustration": "😊 ✨ 😊",
    "illustrationSubtitle": {
      "th": "อารมณ์ความรู้สึก",
      "en": "Happy feeling",
      "zh": "快乐的情绪"
    },
    "options": [
      {
        "id": "opt-k1-lit-h7-1",
        "label": {
          "th": "โกรธ",
          "en": "Angry",
          "zh": "生气"
        },
        "icon": "😠"
      },
      {
        "id": "opt-k1-lit-h7-2",
        "label": {
          "th": "ร้องไห้",
          "en": "Cry",
          "zh": "哭泣"
        },
        "icon": "😢"
      },
      {
        "id": "opt-k1-lit-h7-3",
        "label": {
          "th": "ดีใจ",
          "en": "Happy",
          "zh": "开心"
        },
        "icon": "😊"
      }
    ],
    "correctOptionId": "opt-k1-lit-h7-3",
    "explanation": {
      "th": "ดีใจ ยิ้มกว้าง มีความสุข เก่งมากครับ!",
      "en": "Right! ดีใจ means happy and joyful.",
      "zh": "答对了！ดีใจ 表示高兴。"
    }
  },
  {
    "id": "k1-lit-h8",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"ขา\" 🦵 เริ่มต้นด้วยพยัญชนะตัวใด?",
      "en": "Which initial letter does leg (ขา) start with?",
      "zh": "腿 (ขา) 🦵 的第一个字母是什么？"
    },
    "illustration": "🦵 🚶 🦵",
    "illustrationSubtitle": {
      "th": "ขาใช้เดินและวิ่ง",
      "en": "Leg for walking",
      "zh": "走路的双腿"
    },
    "options": [
      {
        "id": "opt-k1-lit-h8-1",
        "label": {
          "th": "ข ไข่ (ขา)",
          "en": "Khor Khai",
          "zh": "ข (ขา 腿)"
        },
        "icon": "🦵"
      },
      {
        "id": "opt-k1-lit-h8-2",
        "label": {
          "th": "ก ไก่",
          "en": "Gor Kai",
          "zh": "ก 小鸡"
        },
        "icon": "🐔"
      },
      {
        "id": "opt-k1-lit-h8-3",
        "label": {
          "th": "จ จาน",
          "en": "Jor Jan",
          "zh": "จ 盘子"
        },
        "icon": "🍽️"
      }
    ],
    "correctOptionId": "opt-k1-lit-h8-1",
    "explanation": {
      "th": "ข อา ขา ถูกต้องแล้วครับ!",
      "en": "Spot on! ข is for ขา (Leg).",
      "zh": "答对啦！ข 就是 ขา (腿)。"
    }
  },
  {
    "id": "k1-lit-h9",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "สัญลักษณ์ป้ายวงกลมสีแดงมีขีดฆ่า 🚫 หมายถึงอะไร?",
      "en": "What does this red prohibition sign mean? 🚫",
      "zh": "红色禁止标志 🚫 代表什么意思？"
    },
    "illustration": "🚫 🛑 🚫",
    "illustrationSubtitle": {
      "th": "ป้ายสัญลักษณ์รอบตัว",
      "en": "Warning sign",
      "zh": "禁止标识"
    },
    "options": [
      {
        "id": "opt-k1-lit-h9-1",
        "label": {
          "th": "ให้ทำได้",
          "en": "Allowed",
          "zh": "允许做"
        },
        "icon": "✅"
      },
      {
        "id": "opt-k1-lit-h9-2",
        "label": {
          "th": "ห้ามทำ",
          "en": "Forbidden",
          "zh": "禁止"
        },
        "icon": "🚫"
      },
      {
        "id": "opt-k1-lit-h9-3",
        "label": {
          "th": "ให้วิ่งเล่น",
          "en": "Run free",
          "zh": "快跑"
        },
        "icon": "🏃"
      }
    ],
    "correctOptionId": "opt-k1-lit-h9-2",
    "explanation": {
      "th": "ป้ายวงกลมขีดฆ่าหมายถึง \"ห้ามทำ\" เก่งมากครับ!",
      "en": "Correct! It means forbidden or do not enter.",
      "zh": "答对了！代表“禁止”。"
    }
  },
  {
    "id": "k1-lit-h10",
    "grade": "K1",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"ยา\" 💊 ผสมด้วยพยัญชนะ ย และสระอะไร?",
      "en": "In the word \"ยา\" (Medicine), what vowel is used?",
      "zh": "单词“ยา”（药物）中除了字母 ย 还带有哪个元音？"
    },
    "illustration": "💊 ย + า 💊",
    "illustrationSubtitle": {
      "th": "ย - อา - ยา",
      "en": "Yor + Ah = Ya",
      "zh": "ย + า = ยา"
    },
    "options": [
      {
        "id": "opt-k1-lit-h10-1",
        "label": {
          "th": "สระ ไอ ( ไ- )",
          "en": "Vowel Ai",
          "zh": "元音 ไ"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k1-lit-h10-2",
        "label": {
          "th": "สระ อู ( -ู )",
          "en": "Vowel Oo",
          "zh": "元音 ู"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k1-lit-h10-3",
        "label": {
          "th": "สระ อา ( -า )",
          "en": "Vowel Ah",
          "zh": "元音 า"
        },
        "icon": "🔤"
      }
    ],
    "correctOptionId": "opt-k1-lit-h10-3",
    "explanation": {
      "th": "ย - อา - ยา ยอดเยี่ยมมากครับ!",
      "en": "Awesome! It uses vowel Ah (-า).",
      "zh": "太棒啦！元音是 -า。"
    }
  },
  {
    "id": "k2-lit-e1",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"ตา\" 👁️ ผสมด้วยพยัญชนะและสระอะไร?",
      "en": "How is the word \"ตา\" (eye) spelled?",
      "zh": "单词“ตา”（眼睛）由什么声母和元音拼写？"
    },
    "illustration": "👁️ ต - อา - ตา 👁️",
    "illustrationSubtitle": {
      "th": "สะกดคำง่ายๆ",
      "en": "Spelling Ta",
      "zh": "拼读 ต-อา-ตา"
    },
    "options": [
      {
        "id": "opt-k2-lit-e1-1",
        "label": {
          "th": "ต + สระ อา",
          "en": "Tor + Ah",
          "zh": "ต + 元音 า"
        },
        "icon": "👁️"
      },
      {
        "id": "opt-k2-lit-e1-2",
        "label": {
          "th": "ต + สระ อี",
          "en": "Tor + Ee",
          "zh": "ต + 元音 ี"
        },
        "icon": "👁️"
      },
      {
        "id": "opt-k2-lit-e1-3",
        "label": {
          "th": "ต + สระ อู",
          "en": "Tor + Oo",
          "zh": "ต + 元音 ู"
        },
        "icon": "👁️"
      }
    ],
    "correctOptionId": "opt-k2-lit-e1-1",
    "explanation": {
      "th": "ต - อา - ตา ดวงตา เก่งมากจ้า!",
      "en": "Tor + Ah = Ta (Eye). Well done!",
      "zh": "答对啦！ต 加上元音 า 读作 ตา。"
    }
  },
  {
    "id": "k2-lit-e2",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"ดี\" ผสมด้วยสระอะไรอยู่ \"ข้างบน\"?",
      "en": "What top vowel is in the word \"ดี\" (Good)?",
      "zh": "单词“ดี”（好）上面带的是什么元音？"
    },
    "illustration": "👍 ด + ี 👍",
    "illustrationSubtitle": {
      "th": "ด - อี - ดี",
      "en": "Dor + Ee = Dee",
      "zh": "ด + ี = ดี"
    },
    "options": [
      {
        "id": "opt-k2-lit-e2-1",
        "label": {
          "th": "สระ อา",
          "en": "Vowel Ah",
          "zh": "元音 า"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k2-lit-e2-2",
        "label": {
          "th": "สระ อี ( -ี )",
          "en": "Vowel Ee",
          "zh": "元音 ี"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k2-lit-e2-3",
        "label": {
          "th": "สระ อู",
          "en": "Vowel Oo",
          "zh": "元音 ู"
        },
        "icon": "🔤"
      }
    ],
    "correctOptionId": "opt-k2-lit-e2-2",
    "explanation": {
      "th": "ด - อี - ดี สระอีอยู่ข้างบน เก่งมากครับ!",
      "en": "Correct! Vowel Ee (-ี) is on top.",
      "zh": "答对了！上面的元音是 ี。"
    }
  },
  {
    "id": "k2-lit-e3",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"นา\" 🌾 มีความหมายตรงกับรูปภาพใด?",
      "en": "Which picture matches the word \"นา\" (Rice field)? 🌾",
      "zh": "单词“นา”（稻田）对应哪张图片？🌾"
    },
    "illustration": "🌾 🚜 🌾",
    "illustrationSubtitle": {
      "th": "ทุ่งนาสีเขียวขจี",
      "en": "Rice field",
      "zh": "绿油油的水稻田"
    },
    "options": [
      {
        "id": "opt-k2-lit-e3-1",
        "label": {
          "th": "ทะเล",
          "en": "Sea",
          "zh": "大海"
        },
        "icon": "🌊"
      },
      {
        "id": "opt-k2-lit-e3-2",
        "label": {
          "th": "ภูเขา",
          "en": "Mountain",
          "zh": "高山"
        },
        "icon": "⛰️"
      },
      {
        "id": "opt-k2-lit-e3-3",
        "label": {
          "th": "ทุ่งนาข้าว",
          "en": "Rice paddy",
          "zh": "水稻田"
        },
        "icon": "🌾"
      }
    ],
    "correctOptionId": "opt-k2-lit-e3-3",
    "explanation": {
      "th": "นา คือ ทุ่งนาที่ปลูกข้าว เก่งมากครับ!",
      "en": "Correct! นา is a rice field.",
      "zh": "答对啦！นา 就是水稻田。"
    }
  },
  {
    "id": "k2-lit-e4",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"ไป\" 🚶 ผสมด้วยสระใดข้างหน้า?",
      "en": "Which front vowel is used in \"ไป\" (Go)? 🚶",
      "zh": "单词“ไป”（去）前面用的是哪个前置元音？"
    },
    "illustration": "🚶 ไ + ป 🚶",
    "illustrationSubtitle": {
      "th": "สระไอไม้มลาย",
      "en": "Sara Ai",
      "zh": "元音 ไ"
    },
    "options": [
      {
        "id": "opt-k2-lit-e4-1",
        "label": {
          "th": "สระไอไม้มลาย ( ไ- )",
          "en": "Sara Ai",
          "zh": "前置元音 ไ-"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k2-lit-e4-2",
        "label": {
          "th": "สระเอ ( เ- )",
          "en": "Sara Eh",
          "zh": "前置元音 เ-"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k2-lit-e4-3",
        "label": {
          "th": "สระโอ ( โ- )",
          "en": "Sara Oh",
          "zh": "前置元音 โ-"
        },
        "icon": "🔤"
      }
    ],
    "correctOptionId": "opt-k2-lit-e4-1",
    "explanation": {
      "th": "ไป ใช้สระไอไม้มลาย ยอดเยี่ยมมากครับ!",
      "en": "Spot on! ไป uses Sara Ai (ไ-).",
      "zh": "太棒了！用的是元音 ไ-。"
    }
  },
  {
    "id": "k2-lit-e5",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"ใจ\" ❤️ ใช้สระไอชนิดใด?",
      "en": "Which type of Sara Ai is used in \"ใจ\" (Heart)? ❤️",
      "zh": "单词“ใจ”（心）用的是哪一种爱心元音？❤️"
    },
    "illustration": "❤️ ใ + จ ❤️",
    "illustrationSubtitle": {
      "th": "สระไอไม้ม้วน",
      "en": "Sara Ai Maimuan",
      "zh": "卷卷前置元音 ใ"
    },
    "options": [
      {
        "id": "opt-k2-lit-e5-1",
        "label": {
          "th": "สระไอไม้มลาย",
          "en": "Sara Ai Maimalai",
          "zh": "元音 ไ-"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k2-lit-e5-2",
        "label": {
          "th": "สระไอไม้ม้วน ( ใ- )",
          "en": "Sara Ai Maimuan",
          "zh": "卷卷元音 ใ-"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k2-lit-e5-3",
        "label": {
          "th": "สระอู",
          "en": "Sara Oo",
          "zh": "元音 ู"
        },
        "icon": "🔤"
      }
    ],
    "correctOptionId": "opt-k2-lit-e5-2",
    "explanation": {
      "th": "ใจ ใช้สระไอไม้ม้วน ถูกต้องนะคร้าบ!",
      "en": "Correct! ใจ uses Sara Ai Maimuan (ใ-).",
      "zh": "答对啦！ใจ 用的是元音 ใ-。"
    }
  },
  {
    "id": "k2-lit-e6",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "ภาพสัตว์น้ำ \"ปูนา\" 🦀 สะกดอย่างไร?",
      "en": "How do we spell crab (ปู)? 🦀",
      "zh": "螃蟹 (ปู) 🦀 应该怎样拼写？"
    },
    "illustration": "🦀 🌊 🦀",
    "illustrationSubtitle": {
      "th": "ปลาว่ายน้ำ ปูเดินเซ",
      "en": "Crab",
      "zh": "横着爬的小螃蟹"
    },
    "options": [
      {
        "id": "opt-k2-lit-e6-1",
        "label": {
          "th": "ต - อา - ตา",
          "en": "Tor-Ah-Ta",
          "zh": "ต-อา-ตา"
        },
        "icon": "👁️"
      },
      {
        "id": "opt-k2-lit-e6-2",
        "label": {
          "th": "ข - อา - ขา",
          "en": "Khor-Ah-Kha",
          "zh": "ข-อา-ขา"
        },
        "icon": "🦵"
      },
      {
        "id": "opt-k2-lit-e6-3",
        "label": {
          "th": "ป - อู - ปู",
          "en": "Por-Oo-Poo",
          "zh": "ป-อู-ปู"
        },
        "icon": "🦀"
      }
    ],
    "correctOptionId": "opt-k2-lit-e6-3",
    "explanation": {
      "th": "ป - อู - ปู เก่งมากจ้ะ!",
      "en": "Well done! Por + Oo = Poo (Crab).",
      "zh": "太棒了！ป-อู-ปู 就是螃蟹。"
    }
  },
  {
    "id": "k2-lit-e7",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"กะลา\" 🥥 มีกี่พยางค์?",
      "en": "How many syllables in \"กะ-ลา\" (Kala)? 🥥",
      "zh": "单词“กะลา”（椰壳）一共有几个音节？🥥"
    },
    "illustration": "🥥 🥥 🥥",
    "illustrationSubtitle": {
      "th": "นับพยางค์คำ",
      "en": "Count syllables",
      "zh": "数音节"
    },
    "options": [
      {
        "id": "opt-k2-lit-e7-1",
        "label": {
          "th": "2 พยางค์ (กะ-ลา)",
          "en": "2 syllables",
          "zh": "2 个音节"
        },
        "icon": "✌️"
      },
      {
        "id": "opt-k2-lit-e7-2",
        "label": {
          "th": "1 พยางค์",
          "en": "1 syllable",
          "zh": "1 个音节"
        },
        "icon": "☝️"
      },
      {
        "id": "opt-k2-lit-e7-3",
        "label": {
          "th": "3 พยางค์",
          "en": "3 syllables",
          "zh": "3 个音节"
        },
        "icon": "👌"
      }
    ],
    "correctOptionId": "opt-k2-lit-e7-1",
    "explanation": {
      "th": "กะ - ลา ออกเสียง 2 ครั้ง คือ 2 พยางค์ เก่งมากครับ!",
      "en": "Correct! กะ-ลา has 2 syllables.",
      "zh": "答对了！กะ-ลา 有两个音节。"
    }
  },
  {
    "id": "k2-lit-e8",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "สัญลักษณ์ป้าย \"ห้องน้ำ\" 🚻 มักมีรูปภาพใด?",
      "en": "What symbol represents a restroom? 🚻",
      "zh": "卫生间洗手间的指示牌 🚻 通常画着什么？"
    },
    "illustration": "🚻 🚹 🚺",
    "illustrationSubtitle": {
      "th": "ป้ายสัญลักษณ์สากล",
      "en": "Restroom sign",
      "zh": "洗手间指示牌"
    },
    "options": [
      {
        "id": "opt-k2-lit-e8-1",
        "label": {
          "th": "ช้อนส้อม",
          "en": "Fork & Spoon",
          "zh": "刀叉"
        },
        "icon": "🍴"
      },
      {
        "id": "opt-k2-lit-e8-2",
        "label": {
          "th": "รูปผู้ชายและผู้หญิง",
          "en": "Man and Woman",
          "zh": "男女小人像"
        },
        "icon": "🚻"
      },
      {
        "id": "opt-k2-lit-e8-3",
        "label": {
          "th": "หนังสือนิทาน",
          "en": "Book",
          "zh": "书本"
        },
        "icon": "📚"
      }
    ],
    "correctOptionId": "opt-k2-lit-e8-2",
    "explanation": {
      "th": "ป้ายห้องน้ำมีรูปชายและหญิง ถูกต้องครับ!",
      "en": "Correct! Restroom signs show male and female figures.",
      "zh": "答对啦！卫生间是男女小人像。"
    }
  },
  {
    "id": "k2-lit-e9",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"โต\" 🐘 ผสมด้วยสระใดข้างหน้า?",
      "en": "Which front vowel is in the word \"โต\" (Big)?",
      "zh": "单词“โต”（大/高大）前面带有哪个元音？"
    },
    "illustration": "🐘 โ + ต 🐘",
    "illustrationSubtitle": {
      "th": "สระโอลำตัวยาว",
      "en": "Sara Oh",
      "zh": "高高的元音 โ"
    },
    "options": [
      {
        "id": "opt-k2-lit-e9-1",
        "label": {
          "th": "สระเอ ( เ- )",
          "en": "Sara Eh",
          "zh": "元音 เ"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k2-lit-e9-2",
        "label": {
          "th": "สระแอะ",
          "en": "Sara Aeh",
          "zh": "元音 แ-ะ"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k2-lit-e9-3",
        "label": {
          "th": "สระโอ ( โ- )",
          "en": "Sara Oh",
          "zh": "元音 โ"
        },
        "icon": "🔤"
      }
    ],
    "correctOptionId": "opt-k2-lit-e9-3",
    "explanation": {
      "th": "ต - โอ - โต สระโอตัวสูง เก่งมากครับ!",
      "en": "Awesome! It uses Sara Oh (โ-).",
      "zh": "太棒啦！前面是元音 โ-。"
    }
  },
  {
    "id": "k2-lit-e10",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "สิ่งของเครื่องใช้ใดมีไว้สำหรับ \"อ่านหาความรู้\"? 📖",
      "en": "Which item do we read to learn stories? 📖",
      "zh": "我们阅读学习、看故事用什么？📖"
    },
    "illustration": "📖 📚 📖",
    "illustrationSubtitle": {
      "th": "เปิดอ่านหน้ากระดาษ",
      "en": "Read books",
      "zh": "阅读书本"
    },
    "options": [
      {
        "id": "opt-k2-lit-e10-1",
        "label": {
          "th": "หนังสือ",
          "en": "Book",
          "zh": "书本"
        },
        "icon": "📖"
      },
      {
        "id": "opt-k2-lit-e10-2",
        "label": {
          "th": "รองเท้า",
          "en": "Shoes",
          "zh": "鞋子"
        },
        "icon": "👟"
      },
      {
        "id": "opt-k2-lit-e10-3",
        "label": {
          "th": "ลูกฟุตบอล",
          "en": "Ball",
          "zh": "足球"
        },
        "icon": "⚽"
      }
    ],
    "correctOptionId": "opt-k2-lit-e10-1",
    "explanation": {
      "th": "หนังสือเปิดอ่านเพื่อเรียนรู้ ถูกต้องครับ!",
      "en": "Right! Books are for reading!",
      "zh": "答对了！书本用来阅读。"
    }
  },
  {
    "id": "k2-lit-m1",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำคล้องจอง: \"ปู\" 🦀 คล้องจองกับคำว่าอะไร?",
      "en": "Rhyme: Which word rhymes with \"ปู\" (Poo)?",
      "zh": "押韵词：哪一个词和“ปู”（螃蟹）押韵？"
    },
    "illustration": "🦀 〰️ 🐍",
    "illustrationSubtitle": {
      "th": "คำสัมผัสสระ อู",
      "en": "Rhyme with Poo",
      "zh": "与 ปู 押韵的词"
    },
    "options": [
      {
        "id": "opt-k2-lit-m1-1",
        "label": {
          "th": "กา",
          "en": "Ga",
          "zh": "กา"
        },
        "icon": "🐦"
      },
      {
        "id": "opt-k2-lit-m1-2",
        "label": {
          "th": "งู",
          "en": "Ngoo (Snake)",
          "zh": "งู (蛇)"
        },
        "icon": "🐍"
      },
      {
        "id": "opt-k2-lit-m1-3",
        "label": {
          "th": "โต",
          "en": "Toh",
          "zh": "โต"
        },
        "icon": "🐘"
      }
    ],
    "correctOptionId": "opt-k2-lit-m1-2",
    "explanation": {
      "th": "ปู คล้องจองกับ งู เพราะใช้สระอูเหมือนกัน เก่งมากครับ!",
      "en": "Right! ปู rhymes with งู (both have vowel Oo).",
      "zh": "答对啦！ปู 和 งู 都是元音 ู。"
    }
  },
  {
    "id": "k2-lit-m2",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำตรงข้าม: คำว่า \"มืด\" 🌙 ตรงข้ามกับคำว่าอะไร?",
      "en": "Opposite: What is the opposite of \"Dark\" (มืด)? 🌙",
      "zh": "反义词：“黑暗” 🌙 的反义词是什么？"
    },
    "illustration": "🌙 ↔️ ☀️",
    "illustrationSubtitle": {
      "th": "มืด กับ สว่าง",
      "en": "Dark vs Bright",
      "zh": "明亮与黑暗"
    },
    "options": [
      {
        "id": "opt-k2-lit-m2-1",
        "label": {
          "th": "หนาว",
          "en": "Cold",
          "zh": "寒冷"
        },
        "icon": "❄️"
      },
      {
        "id": "opt-k2-lit-m2-2",
        "label": {
          "th": "เปียก",
          "en": "Wet",
          "zh": "潮湿"
        },
        "icon": "💧"
      },
      {
        "id": "opt-k2-lit-m2-3",
        "label": {
          "th": "สว่าง",
          "en": "Bright",
          "zh": "明亮"
        },
        "icon": "☀️"
      }
    ],
    "correctOptionId": "opt-k2-lit-m2-3",
    "explanation": {
      "th": "มืด ตรงข้ามกับ สว่าง ถูกต้องนะคร้าบ!",
      "en": "Correct! Dark is opposite to Bright.",
      "zh": "答对了！黑暗的反义词是明亮。"
    }
  },
  {
    "id": "k2-lit-m3",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำคล้องจอง: \"กา\" 🐦 คล้องจองกับคำว่าอะไร?",
      "en": "Rhyme: Which word rhymes with \"กา\" (Ga)?",
      "zh": "押韵词：哪一个词和“กา”押韵？"
    },
    "illustration": "🐦 👁️ 🐦",
    "illustrationSubtitle": {
      "th": "สัมผัสสระ อา",
      "en": "Rhymes with Ga",
      "zh": "与 กา 押韵的词"
    },
    "options": [
      {
        "id": "opt-k2-lit-m3-1",
        "label": {
          "th": "ตา",
          "en": "Ta (Eye)",
          "zh": "ตา (眼睛)"
        },
        "icon": "👁️"
      },
      {
        "id": "opt-k2-lit-m3-2",
        "label": {
          "th": "ดู",
          "en": "Doo",
          "zh": "ดู"
        },
        "icon": "👀"
      },
      {
        "id": "opt-k2-lit-m3-3",
        "label": {
          "th": "ดี",
          "en": "Dee",
          "zh": "ดี"
        },
        "icon": "👍"
      }
    ],
    "correctOptionId": "opt-k2-lit-m3-1",
    "explanation": {
      "th": "กา คล้องจองกับ ตา สระอาเหมือนกัน เก่งมากครับ!",
      "en": "Great! กา rhymes with ตา.",
      "zh": "太棒了！กา 和 ตา 押韵。"
    }
  },
  {
    "id": "k2-lit-m4",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำใดมีความหมายว่า \"คุณแม่ของคุณพ่อ\"? 👵",
      "en": "Which word means \"father’s mother\" (paternal grandmother)? 👵",
      "zh": "哪一个词代表“爸爸的妈妈”（亲奶奶）？👵"
    },
    "illustration": "👵 💖 👵",
    "illustrationSubtitle": {
      "th": "ความสัมพันธ์ในครอบครัว",
      "en": "Grandmother",
      "zh": "亲切的奶奶"
    },
    "options": [
      {
        "id": "opt-k2-lit-m4-1",
        "label": {
          "th": "คุณป้า",
          "en": "Aunt",
          "zh": "阿姨/姑姑"
        },
        "icon": "👩"
      },
      {
        "id": "opt-k2-lit-m4-2",
        "label": {
          "th": "คุณย่า",
          "en": "Paternal Grandma",
          "zh": "亲奶奶"
        },
        "icon": "👵"
      },
      {
        "id": "opt-k2-lit-m4-3",
        "label": {
          "th": "คุณน้า",
          "en": "Younger Aunt",
          "zh": "小姨"
        },
        "icon": "👱‍♀️"
      }
    ],
    "correctOptionId": "opt-k2-lit-m4-2",
    "explanation": {
      "th": "คุณแม่ของพ่อ เรียกว่า คุณย่า เก่งมากครับ!",
      "en": "Correct! Father's mother is คุณย่า.",
      "zh": "答对啦！爸爸的妈妈是奶奶 (คุณย่า)。"
    }
  },
  {
    "id": "k2-lit-m5",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "ดอกไม้สีขาวกลิ่นหอม สัญลักษณ์วันแม่ คือดอกอะไร? 🤍",
      "en": "Which fragrant white flower is the symbol of Mother's Day? 🤍",
      "zh": "泰国母亲节象征纯洁母爱的白色芳香花朵是哪一种？🤍"
    },
    "illustration": "🤍 🌸 🤍",
    "illustrationSubtitle": {
      "th": "ดอกไม้สัญลักษณ์วันแม่",
      "en": "Mother's Day flower",
      "zh": "母亲节之花茉莉花"
    },
    "options": [
      {
        "id": "opt-k2-lit-m5-1",
        "label": {
          "th": "ดอกกุหลาบ",
          "en": "Rose",
          "zh": "玫瑰花"
        },
        "icon": "🌹"
      },
      {
        "id": "opt-k2-lit-m5-2",
        "label": {
          "th": "ดอกทานตะวัน",
          "en": "Sunflower",
          "zh": "向日葵"
        },
        "icon": "🌻"
      },
      {
        "id": "opt-k2-lit-m5-3",
        "label": {
          "th": "ดอกมะลิ",
          "en": "Jasmine",
          "zh": "茉莉花"
        },
        "icon": "🤍"
      }
    ],
    "correctOptionId": "opt-k2-lit-m5-3",
    "explanation": {
      "th": "ดอกมะลิสีขาวบริสุทธิ์ กลิ่นหอมชื่นใจ ถูกต้องครับ!",
      "en": "Right! White Jasmine represents Mother's Day.",
      "zh": "答对了！白色茉莉花代表母亲节。"
    }
  },
  {
    "id": "k2-lit-m6",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำตรงข้าม: คำว่า \"สะอาด\" ✨ ตรงข้ามกับคำว่าอะไร?",
      "en": "Opposite: What is the opposite of \"Clean\" (สะอาด)? ✨",
      "zh": "反义词：“干净” ✨ 的反义词是什么？"
    },
    "illustration": "✨ ↔️ 🟤",
    "illustrationSubtitle": {
      "th": "สะอาด กับ สกปรก",
      "en": "Clean vs Dirty",
      "zh": "干净与脏乱"
    },
    "options": [
      {
        "id": "opt-k2-lit-m6-1",
        "label": {
          "th": "สกปรก",
          "en": "Dirty",
          "zh": "脏乱"
        },
        "icon": "🟤"
      },
      {
        "id": "opt-k2-lit-m6-2",
        "label": {
          "th": "หอม",
          "en": "Fragrant",
          "zh": "芳香"
        },
        "icon": "🌸"
      },
      {
        "id": "opt-k2-lit-m6-3",
        "label": {
          "th": "เงางาม",
          "en": "Shiny",
          "zh": "闪亮"
        },
        "icon": "💎"
      }
    ],
    "correctOptionId": "opt-k2-lit-m6-1",
    "explanation": {
      "th": "สะอาด ตรงข้ามกับ สกปรก เก่งมากครับ!",
      "en": "Spot on! Clean is opposite to Dirty.",
      "zh": "太棒了！干净的反义词是脏乱。"
    }
  },
  {
    "id": "k2-lit-m7",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำว่า \"มะนาว\" 🍋 มีรสชาติอย่างไร?",
      "en": "What taste does lime (มะนาว) have? 🍋",
      "zh": "青柠檬 (มะนาว) 🍋 是什么味道？"
    },
    "illustration": "🍋 😋 🍋",
    "illustrationSubtitle": {
      "th": "รสชาติของผลไม้",
      "en": "Sour taste",
      "zh": "酸酸的味道"
    },
    "options": [
      {
        "id": "opt-k2-lit-m7-1",
        "label": {
          "th": "หวานเจี๊ยบ",
          "en": "Sweet",
          "zh": "甜甜的"
        },
        "icon": "🍬"
      },
      {
        "id": "opt-k2-lit-m7-2",
        "label": {
          "th": "เปรี้ยวจี๊ด",
          "en": "Sour",
          "zh": "酸溜溜"
        },
        "icon": "🍋"
      },
      {
        "id": "opt-k2-lit-m7-3",
        "label": {
          "th": "เค็ม",
          "en": "Salty",
          "zh": "咸咸的"
        },
        "icon": "🧂"
      }
    ],
    "correctOptionId": "opt-k2-lit-m7-2",
    "explanation": {
      "th": "มะนาวมีรสเปรี้ยวจี๊ด ถูกต้องที่สุด!",
      "en": "Correct! Limes taste sour!",
      "zh": "答对啦！柠檬是酸溜溜的。"
    }
  },
  {
    "id": "k2-lit-m8",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำว่า \"กระทะ\" 🍳 ประสมด้วยสระอะไรทั้งสองพยางค์?",
      "en": "What short vowel is in both syllables of \"ก-ระ-ท-ะ\"? 🍳",
      "zh": "单词“กระทะ”（平底锅）前后两个音节都带有哪个元音？🍳"
    },
    "illustration": "🍳 🍳 🍳",
    "illustrationSubtitle": {
      "th": "กะ-ทะ สระอะ",
      "en": "Vowel Ah (short)",
      "zh": "短元音 ะ"
    },
    "options": [
      {
        "id": "opt-k2-lit-m8-1",
        "label": {
          "th": "สระอา ( -า )",
          "en": "Sara Ah",
          "zh": "元音 า"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k2-lit-m8-2",
        "label": {
          "th": "สระอี ( -ี )",
          "en": "Sara Ee",
          "zh": "元音 ี"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k2-lit-m8-3",
        "label": {
          "th": "สระอะ ( -ะ )",
          "en": "Sara Ah (short)",
          "zh": "短元音 ะ"
        },
        "icon": "🔤"
      }
    ],
    "correctOptionId": "opt-k2-lit-m8-3",
    "explanation": {
      "th": "กระทะ ประสมด้วยสระอะ ออกเสียงสั้น เก่งมากครับ!",
      "en": "Awesome! กระทะ uses short vowel Sara Ah (-ะ).",
      "zh": "答对了！前后都是短元音 ะ。"
    }
  },
  {
    "id": "k2-lit-m9",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำว่า \"คุณตา\" 👴 มีความหมายว่าใครในครอบครัว?",
      "en": "Who is \"คุณตา\" (Khun Ta)? 👴",
      "zh": "单词“คุณตา”（外公）代表家里哪位长辈？👴"
    },
    "illustration": "👴 👓 👴",
    "illustrationSubtitle": {
      "th": "ญาติผู้ใหญ่ใจดี",
      "en": "Maternal grandfather",
      "zh": "慈祥的外公"
    },
    "options": [
      {
        "id": "opt-k2-lit-m9-1",
        "label": {
          "th": "คุณพ่อของคุณแม่",
          "en": "Mother's father",
          "zh": "妈妈的爸爸（外公）"
        },
        "icon": "👴"
      },
      {
        "id": "opt-k2-lit-m9-2",
        "label": {
          "th": "คุณพ่อของคุณพ่อ",
          "en": "Father's father",
          "zh": "爸爸的爸爸（爷爷）"
        },
        "icon": "👨‍🦳"
      },
      {
        "id": "opt-k2-lit-m9-3",
        "label": {
          "th": "พี่ชายของคุณแม่",
          "en": "Mother's brother",
          "zh": "妈妈的哥哥（舅舅）"
        },
        "icon": "👨"
      }
    ],
    "correctOptionId": "opt-k2-lit-m9-1",
    "explanation": {
      "th": "คุณพ่อของแม่ เรียกว่า คุณตา ยอดเยี่ยมมากครับ!",
      "en": "Spot on! Mother's father is คุณตา (Grandfather).",
      "zh": "太棒啦！妈妈的爸爸叫外公 (คุณตา)。"
    }
  },
  {
    "id": "k2-lit-m10",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "ยานพาหนะใดแล่นอยู่บน \"รางเหล็กยาว\"? 🚂",
      "en": "Which vehicle runs on long iron railway tracks? 🚂",
      "zh": "哪一种交通工具是在长长的铁轨上行驶的？🚂"
    },
    "illustration": "🚂 🛤️ 🚂",
    "illustrationSubtitle": {
      "th": "รถไฟปู๊นๆ",
      "en": "Train on tracks",
      "zh": "开在铁轨上的火车"
    },
    "options": [
      {
        "id": "opt-k2-lit-m10-1",
        "label": {
          "th": "เครื่องบิน",
          "en": "Airplane",
          "zh": "飞机"
        },
        "icon": "✈️"
      },
      {
        "id": "opt-k2-lit-m10-2",
        "label": {
          "th": "รถไฟ",
          "en": "Train",
          "zh": "火车"
        },
        "icon": "🚂"
      },
      {
        "id": "opt-k2-lit-m10-3",
        "label": {
          "th": "เรือพาย",
          "en": "Rowboat",
          "zh": "木舟"
        },
        "icon": "🛶"
      }
    ],
    "correctOptionId": "opt-k2-lit-m10-2",
    "explanation": {
      "th": "รถไฟแล่นบนราง ฉึกฉักปู๊นๆ ถูกต้องครับ!",
      "en": "Correct! Trains run on tracks.",
      "zh": "答对啦！火车在轨道上行驶。"
    }
  },
  {
    "id": "k2-lit-h1",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"มะละกอ\" 🍈 มีจำนวนพยางค์กี่พยางค์?",
      "en": "How many syllables in \"มะ-ละ-กอ\" (Papaya)? 🍈",
      "zh": "单词“มะละกอ”（木瓜）一共有几个音节？🍈"
    },
    "illustration": "🍈 🍈 🍈",
    "illustrationSubtitle": {
      "th": "มะ - ละ - กอ",
      "en": "3 syllables",
      "zh": "数音节 มะ-ละ-กอ"
    },
    "options": [
      {
        "id": "opt-k2-lit-h1-1",
        "label": {
          "th": "1 พยางค์",
          "en": "1 syllable",
          "zh": "1 个音节"
        },
        "icon": "☝️"
      },
      {
        "id": "opt-k2-lit-h1-2",
        "label": {
          "th": "2 พยางค์",
          "en": "2 syllables",
          "zh": "2 个音节"
        },
        "icon": "✌️"
      },
      {
        "id": "opt-k2-lit-h1-3",
        "label": {
          "th": "3 พยางค์",
          "en": "3 syllables",
          "zh": "3 个音节"
        },
        "icon": "👌"
      }
    ],
    "correctOptionId": "opt-k2-lit-h1-3",
    "explanation": {
      "th": "มะ - ละ - กอ ออกเสียง 3 ครั้ง คือ 3 พยางค์ เก่งมากครับ!",
      "en": "Correct! มะ-ละ-กอ has 3 syllables.",
      "zh": "答对啦！一共有3个音节。"
    }
  },
  {
    "id": "k2-lit-h2",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "เรียงคำให้เป็นประโยคที่ถูกต้อง: \"ข้าว / น้อง / กิน\"",
      "en": "Arrange into a correct sentence: Rice / Little sibling / Eats",
      "zh": "把词语排列成通顺的句子：“饭 / 弟弟妹妹 / 吃”"
    },
    "illustration": "🥣 🧒 😋",
    "illustrationSubtitle": {
      "th": "เรียงประโยคประธาน กริยา กรรม",
      "en": "Arrange sentence",
      "zh": "语序排列"
    },
    "options": [
      {
        "id": "opt-k2-lit-h2-1",
        "label": {
          "th": "น้องกินข้าว",
          "en": "Nong eats rice",
          "zh": "弟弟妹妹吃饭"
        },
        "icon": "🥣"
      },
      {
        "id": "opt-k2-lit-h2-2",
        "label": {
          "th": "ข้าวน้องกิน",
          "en": "Rice eats nong",
          "zh": "饭吃弟弟妹妹"
        },
        "icon": "❓"
      },
      {
        "id": "opt-k2-lit-h2-3",
        "label": {
          "th": "กินข้าวน้อง",
          "en": "Eats rice nong",
          "zh": "吃饭弟弟妹妹"
        },
        "icon": "❓"
      }
    ],
    "correctOptionId": "opt-k2-lit-h2-1",
    "explanation": {
      "th": "ประธานคือน้อง กริยาคือกิน กรรมคือข้าว เก่งมากครับ!",
      "en": "Well done! \"น้องกินข้าว\" is the correct order.",
      "zh": "太棒了！主谓宾正确顺序是“น้องกินข้าว”。"
    }
  },
  {
    "id": "k2-lit-h3",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "นิทานเรื่องกระต่ายกับเต่า: ใครเดินช้าแต่มุ่งมั่นจนชนะการแข่งขัน? 🐢",
      "en": "Tortoise and Hare: Who walked slowly with determination and won? 🐢",
      "zh": "龟兔赛跑故事中，谁走得慢却坚持不懈最终赢得了比赛？🐢"
    },
    "illustration": "🐢 🏁 🐇",
    "illustrationSubtitle": {
      "th": "นิทานอีสปสอนใจ",
      "en": "Fable of Tortoise & Hare",
      "zh": "龟兔赛跑伊索寓言"
    },
    "options": [
      {
        "id": "opt-k2-lit-h3-1",
        "label": {
          "th": "กระต่าย",
          "en": "Hare",
          "zh": "兔子"
        },
        "icon": "🐇"
      },
      {
        "id": "opt-k2-lit-h3-2",
        "label": {
          "th": "เต่า",
          "en": "Tortoise",
          "zh": "乌龟"
        },
        "icon": "🐢"
      },
      {
        "id": "opt-k2-lit-h3-3",
        "label": {
          "th": "สุนัขจิ้งจอก",
          "en": "Fox",
          "zh": "狐狸"
        },
        "icon": "🦊"
      }
    ],
    "correctOptionId": "opt-k2-lit-h3-2",
    "explanation": {
      "th": "เจ้าเต่าไม่ยอมแพ้เดินช้าๆ จนเข้าเส้นชัยก่อน เก่งมากครับ!",
      "en": "Correct! The steady tortoise won the race.",
      "zh": "答对啦！坚持不懈的乌龟赢了。"
    }
  },
  {
    "id": "k2-lit-h4",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"แม่น้ำ\" 🌊 คำหน้าคือคำว่า \"แม่\" ใช้วรรณยุกต์ใด?",
      "en": "In the word \"แม่\" (Mae), what tone mark is used?",
      "zh": "单词“แม่น้ำ”（河流）中的第一个字“แม่”（妈妈/主干）用的是哪个声调符号？"
    },
    "illustration": "🌊 ม + แ- + ่ 🌊",
    "illustrationSubtitle": {
      "th": "ไม้เอกบน ม ม้า",
      "en": "Mai Ek tone mark",
      "zh": "第一声调符号 ไม้เอก"
    },
    "options": [
      {
        "id": "opt-k2-lit-h4-1",
        "label": {
          "th": "ไม้โท ( -้ )",
          "en": "Mai Tho",
          "zh": "第二调 -้"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k2-lit-h4-2",
        "label": {
          "th": "ไม้ตรี ( -๊ )",
          "en": "Mai Tri",
          "zh": "第三调 -๊"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k2-lit-h4-3",
        "label": {
          "th": "ไม้เอก ( -่ )",
          "en": "Mai Ek",
          "zh": "第一调 -่"
        },
        "icon": "🔤"
      }
    ],
    "correctOptionId": "opt-k2-lit-h4-3",
    "explanation": {
      "th": "ม - แอ - แม - ไม้เอก - แม่ ถูกต้องแล้วครับ!",
      "en": "Spot on! It uses Mai Ek (-่).",
      "zh": "答对了！用的是ไม้เอก (-่)。"
    }
  },
  {
    "id": "k2-lit-h5",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำใดในตัวเลือกนี้มีความหมายว่า \"เพื่อนรักร่วมห้องเรียน\"? 👫",
      "en": "Which word means \"classmate / fellow friend\"? 👫",
      "zh": "下列哪一个词语的意思是“可爱的同班同学/好朋友”？👫"
    },
    "illustration": "👫 🏫 👫",
    "illustrationSubtitle": {
      "th": "มิตรภาพในโรงเรียน",
      "en": "Classmate friend",
      "zh": "同班好朋友"
    },
    "options": [
      {
        "id": "opt-k2-lit-h5-1",
        "label": {
          "th": "เพื่อน",
          "en": "Friend",
          "zh": "好朋友"
        },
        "icon": "👫"
      },
      {
        "id": "opt-k2-lit-h5-2",
        "label": {
          "th": "โจร",
          "en": "Thief",
          "zh": "小偷"
        },
        "icon": "🥷"
      },
      {
        "id": "opt-k2-lit-h5-3",
        "label": {
          "th": "คนแปลกหน้า",
          "en": "Stranger",
          "zh": "陌生人"
        },
        "icon": "👤"
      }
    ],
    "correctOptionId": "opt-k2-lit-h5-1",
    "explanation": {
      "th": "เพื่อนรักคอยช่วยเหลือและเล่นด้วยกัน เก่งมากครับ!",
      "en": "Correct! เพื่อน means friend.",
      "zh": "答对啦！เพื่อน 是好朋友。"
    }
  },
  {
    "id": "k2-lit-h6",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำคล้องจอง: \"คนดี\" 😇 คล้องจองกับคำว่าอะไร?",
      "en": "Rhyme: Which phrase rhymes with \"คนดี\" (Khon Dee)? 😇",
      "zh": "押韵词：哪一个短语和“คนดี”（好人）押韵？😇"
    },
    "illustration": "😇 💖 😇",
    "illustrationSubtitle": {
      "th": "สัมผัสสระ อี",
      "en": "Rhyme with Dee",
      "zh": "与 ดี 押韵"
    },
    "options": [
      {
        "id": "opt-k2-lit-h6-1",
        "label": {
          "th": "กินข้าว",
          "en": "Eat rice",
          "zh": "吃米饭"
        },
        "icon": "🍚"
      },
      {
        "id": "opt-k2-lit-h6-2",
        "label": {
          "th": "มีสุข",
          "en": "Mee Sook (Has joy)",
          "zh": "拥有快乐 (มีสุข)"
        },
        "icon": "🌈"
      },
      {
        "id": "opt-k2-lit-h6-3",
        "label": {
          "th": "ไปโรงเรียน",
          "en": "Go to school",
          "zh": "去上学"
        },
        "icon": "🏫"
      }
    ],
    "correctOptionId": "opt-k2-lit-h6-2",
    "explanation": {
      "th": "คนดี - มีสุข คำว่า \"ดี\" คล้องจองกับ \"มี\" เก่งมากครับ!",
      "en": "Awesome! ดี and มี share the same vowel sound.",
      "zh": "太棒了！ดี 和 มี 押韵。"
    }
  },
  {
    "id": "k2-lit-h7",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "ป้ายสัญลักษณ์รูป \"ทางม้าลาย\" 🦓 มีไว้เพื่ออะไร?",
      "en": "What is the pedestrian zebra crossing sign used for? 🦓",
      "zh": "人行斑马线指示标志 🦓 是用来做什么的？"
    },
    "illustration": "🦓 🚶 🦓",
    "illustrationSubtitle": {
      "th": "ป้ายความปลอดภัยจราจร",
      "en": "Cross the road safely",
      "zh": "斑马线安全过马路"
    },
    "options": [
      {
        "id": "opt-k2-lit-h7-1",
        "label": {
          "th": "ที่วิ่งเล่นฟุตบอล",
          "en": "Play soccer",
          "zh": "踢球场地"
        },
        "icon": "⚽"
      },
      {
        "id": "opt-k2-lit-h7-2",
        "label": {
          "th": "ที่จอดรถบรรทุก",
          "en": "Park trucks",
          "zh": "停卡车"
        },
        "icon": "🚛"
      },
      {
        "id": "opt-k2-lit-h7-3",
        "label": {
          "th": "ที่ข้ามถนนปลอดภัย",
          "en": "Cross road safely",
          "zh": "安全过马路"
        },
        "icon": "🚶"
      }
    ],
    "correctOptionId": "opt-k2-lit-h7-3",
    "explanation": {
      "th": "ทางม้าลายใช้เดินข้ามถนนอย่างปลอดภัย ถูกต้องครับ!",
      "en": "Right! Zebra crossings are for crossing the road safely.",
      "zh": "答对啦！斑马线是用来安全过马路的。"
    }
  },
  {
    "id": "k2-lit-h8",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"กาแฟ\" ☕ พยางค์หลังคือ \"แฟ\" ผสมด้วยสระอะไร?",
      "en": "In \"กาแฟ\" (Coffee), which vowel is in the second syllable \"แฟ\"? ☕",
      "zh": "在单词“กาแฟ”（咖啡）中，后一个音节“แฟ”用的是哪个元音？☕"
    },
    "illustration": "☕ ฟ + แ- ☕",
    "illustrationSubtitle": {
      "th": "สระแอสองขา",
      "en": "Sara Ae",
      "zh": "双腿元音 แ-"
    },
    "options": [
      {
        "id": "opt-k2-lit-h8-1",
        "label": {
          "th": "สระแอ ( แ- )",
          "en": "Sara Ae",
          "zh": "元音 แ-"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k2-lit-h8-2",
        "label": {
          "th": "สระเอ ( เ- )",
          "en": "Sara Eh",
          "zh": "元音 เ-"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k2-lit-h8-3",
        "label": {
          "th": "สระโอ ( โ- )",
          "en": "Sara Oh",
          "zh": "元音 โ-"
        },
        "icon": "🔤"
      }
    ],
    "correctOptionId": "opt-k2-lit-h8-1",
    "explanation": {
      "th": "ฟ - แอ - แฟ สระแอมีสองขา เก่งมากครับ!",
      "en": "Correct! Sara Ae (แ-) has two front legs.",
      "zh": "答对了！用的是双腿元音 แ-。"
    }
  },
  {
    "id": "k2-lit-h9",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "ปริศนาคำทาย: \"อะไรเอ่ย ตัวใหญ่เท่าบ้าน มีงวงมีงา หางยาวหูใหญ่\"? 🐘",
      "en": "Riddle: Big as a house, has a trunk and tusks, long tail and huge ears? 🐘",
      "zh": "猜谜语：“身体大如房，长鼻又长牙，大耳像蒲扇”是什么动物？🐘"
    },
    "illustration": "🐘 ❓ 🐘",
    "illustrationSubtitle": {
      "th": "ปริศนาคำทายสัตว์",
      "en": "Animal riddle",
      "zh": "动物猜谜语"
    },
    "options": [
      {
        "id": "opt-k2-lit-h9-1",
        "label": {
          "th": "สิงโต",
          "en": "Lion",
          "zh": "狮子"
        },
        "icon": "🦁"
      },
      {
        "id": "opt-k2-lit-h9-2",
        "label": {
          "th": "ช้าง",
          "en": "Elephant",
          "zh": "大象"
        },
        "icon": "🐘"
      },
      {
        "id": "opt-k2-lit-h9-3",
        "label": {
          "th": "ยีราฟ",
          "en": "Giraffe",
          "zh": "长颈鹿"
        },
        "icon": "🦒"
      }
    ],
    "correctOptionId": "opt-k2-lit-h9-2",
    "explanation": {
      "th": "ช้าง มีงวงยาวและงาสวยงาม ถูกต้องที่สุดครับ!",
      "en": "Spot on! The elephant matches all clues.",
      "zh": "太棒啦！是大象。"
    }
  },
  {
    "id": "k2-lit-h10",
    "grade": "K2",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"นาฬิกา\" ⏰ มีจำนวนพยางค์กี่พยางค์?",
      "en": "How many syllables in \"นา-ฬิ-กา\" (Clock)? ⏰",
      "zh": "单词“นาฬิกา”（时钟）一共有几个音节？⏰"
    },
    "illustration": "⏰ ⏰ ⏰",
    "illustrationSubtitle": {
      "th": "นา - ฬิ - กา",
      "en": "3 syllables",
      "zh": "数音节 นา-ฬิ-กา"
    },
    "options": [
      {
        "id": "opt-k2-lit-h10-1",
        "label": {
          "th": "1 พยางค์",
          "en": "1 syllable",
          "zh": "1 个音节"
        },
        "icon": "☝️"
      },
      {
        "id": "opt-k2-lit-h10-2",
        "label": {
          "th": "2 พยางค์",
          "en": "2 syllables",
          "zh": "2 个音节"
        },
        "icon": "✌️"
      },
      {
        "id": "opt-k2-lit-h10-3",
        "label": {
          "th": "3 พยางค์",
          "en": "3 syllables",
          "zh": "3 个音节"
        },
        "icon": "👌"
      }
    ],
    "correctOptionId": "opt-k2-lit-h10-3",
    "explanation": {
      "th": "นา - ฬิ - กา ออกเสียง 3 จังหวะ คือ 3 พยางค์ เก่งมากครับ!",
      "en": "Correct! นา-ฬิ-กา has 3 syllables.",
      "zh": "答对啦！时钟有三个音节。"
    }
  },
  {
    "id": "k3-lit-e1",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"บ้าน\" 🏠 มีพยัญชนะตัวสะกดท้ายคือตัวใด?",
      "en": "What is the ending consonant letter in \"บ้าน\" (House)? 🏠",
      "zh": "单词“บ้าน”（房子）末尾的尾辅音是哪个字母？🏠"
    },
    "illustration": "🏠 บ + า + น + ้ 🏠",
    "illustrationSubtitle": {
      "th": "แม่กน น หนูสะกด",
      "en": "Final letter Nor Nu",
      "zh": "尾辅音 น"
    },
    "options": [
      {
        "id": "opt-k3-lit-e1-1",
        "label": {
          "th": "น หนู",
          "en": "Nor Nu",
          "zh": "字母 น"
        },
        "icon": "🏠"
      },
      {
        "id": "opt-k3-lit-e1-2",
        "label": {
          "th": "ก ไก่",
          "en": "Gor Kai",
          "zh": "字母 ก"
        },
        "icon": "🐔"
      },
      {
        "id": "opt-k3-lit-e1-3",
        "label": {
          "th": "ม ม้า",
          "en": "Mor Ma",
          "zh": "字母 ม"
        },
        "icon": "🐎"
      }
    ],
    "correctOptionId": "opt-k3-lit-e1-1",
    "explanation": {
      "th": "บ - อา - น - บาน - ไม้โท - บ้าน น หนูสะกด เก่งมากครับ!",
      "en": "Correct! The ending consonant is น.",
      "zh": "答对了！尾辅音是 น。"
    }
  },
  {
    "id": "k3-lit-e2",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"ลิง\" 🐵 สะกดด้วยตัวสะกดมาตราใด (ง สะกด)?",
      "en": "What spelling section (Matra) does \"ลิง\" (Monkey) belong to? 🐵",
      "zh": "单词“ลิง”（猴子）是以字母 ง 结尾的，属于哪一个韵尾部？🐵"
    },
    "illustration": "🐵 ล + ิ + ง 🐵",
    "illustrationSubtitle": {
      "th": "มาตราแม่กง",
      "en": "Mae Kong section",
      "zh": "แม่กง 韵尾"
    },
    "options": [
      {
        "id": "opt-k3-lit-e2-1",
        "label": {
          "th": "แม่กน",
          "en": "Mae Kon",
          "zh": "แม่กน 部"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k3-lit-e2-2",
        "label": {
          "th": "แม่กง (ง สะกด)",
          "en": "Mae Kong (Ng)",
          "zh": "แม่กง 部 (ง 结尾)"
        },
        "icon": "🐵"
      },
      {
        "id": "opt-k3-lit-e2-3",
        "label": {
          "th": "แม่กด",
          "en": "Mae Kot",
          "zh": "แม่กด 部"
        },
        "icon": "🔤"
      }
    ],
    "correctOptionId": "opt-k3-lit-e2-2",
    "explanation": {
      "th": "คำที่มี ง งู สะกด เรียกว่า แม่กง เก่งมากครับ!",
      "en": "Spot on! Words ending in ง belong to Mae Kong.",
      "zh": "答对啦！ง 结尾的是แม่กง。"
    }
  },
  {
    "id": "k3-lit-e3",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"เป็ด\" 🦆 มีตัวสะกดคือตัว ด เด็ก อยู่ในมาตราใด?",
      "en": "Which spelling section does \"เป็ด\" (Duck, ending in ด) belong to? 🦆",
      "zh": "单词“เป็ด”（鸭子）是以字母 ด 结尾的，属于哪一部？🦆"
    },
    "illustration": "🦆 ป + เ-ะ + ด 🦆",
    "illustrationSubtitle": {
      "th": "มาตราแม่กด",
      "en": "Mae Kot section",
      "zh": "แม่กด 韵尾"
    },
    "options": [
      {
        "id": "opt-k3-lit-e3-1",
        "label": {
          "th": "แม่กบ",
          "en": "Mae Kop",
          "zh": "แม่กบ 部"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k3-lit-e3-2",
        "label": {
          "th": "แม่เกย",
          "en": "Mae Koey",
          "zh": "แม่เกย 部"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k3-lit-e3-3",
        "label": {
          "th": "แม่กด (ด สะกด)",
          "en": "Mae Kot (D)",
          "zh": "แม่กด 部 (ด 结尾)"
        },
        "icon": "🦆"
      }
    ],
    "correctOptionId": "opt-k3-lit-e3-3",
    "explanation": {
      "th": "ตัว ด เด็ก สะกด อยู่ในมาตราแม่กด เก่งมากครับ!",
      "en": "Correct! Ending with ด belongs to Mae Kot.",
      "zh": "答对了！ด 结尾属于 แม่กด。"
    }
  },
  {
    "id": "k3-lit-e4",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"กบ\" 🐸 มีตัวสะกดคือ บ ใบไม้ อยู่ในมาตราใด?",
      "en": "Which spelling section does \"กบ\" (Frog, ending in บ) belong to? 🐸",
      "zh": "单词“กบ”（青蛙）以字母 บ 结尾，属于哪一个尾音分类？🐸"
    },
    "illustration": "🐸 ก + บ 🐸",
    "illustrationSubtitle": {
      "th": "มาตราแม่กบ",
      "en": "Mae Kop section",
      "zh": "แม่กบ 韵尾"
    },
    "options": [
      {
        "id": "opt-k3-lit-e4-1",
        "label": {
          "th": "แม่กบ (บ สะกด)",
          "en": "Mae Kop",
          "zh": "แม่กบ 部 (บ 结尾)"
        },
        "icon": "🐸"
      },
      {
        "id": "opt-k3-lit-e4-2",
        "label": {
          "th": "แม่กง",
          "en": "Mae Kong",
          "zh": "แม่กง 部"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k3-lit-e4-3",
        "label": {
          "th": "แม่กม",
          "en": "Mae Kom",
          "zh": "แม่กม 部"
        },
        "icon": "🔤"
      }
    ],
    "correctOptionId": "opt-k3-lit-e4-1",
    "explanation": {
      "th": "บ ใบไม้ สะกด อยู่ในมาตราแม่กบ เก่งมากครับ!",
      "en": "Well done! Words ending in บ belong to Mae Kop.",
      "zh": "答对啦！บ 结尾属于 แม่กบ。"
    }
  },
  {
    "id": "k3-lit-e5",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"ชาม\" 🥣 มีตัวสะกดคือ ม ม้า อยู่ในมาตราใด?",
      "en": "Which section does \"ชาม\" (Bowl, ending in ม) belong to? 🥣",
      "zh": "单词“ชาม”（大碗）以字母 ม 结尾，属于哪一部？🥣"
    },
    "illustration": "🥣 ช + า + ม 🥣",
    "illustrationSubtitle": {
      "th": "มาตราแม่กม",
      "en": "Mae Kom section",
      "zh": "แม่กม 韵尾"
    },
    "options": [
      {
        "id": "opt-k3-lit-e5-1",
        "label": {
          "th": "แม่เกย",
          "en": "Mae Koey",
          "zh": "แม่เกย 部"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k3-lit-e5-2",
        "label": {
          "th": "แม่กม (ม สะกด)",
          "en": "Mae Kom",
          "zh": "แม่กม 部 (ม 结尾)"
        },
        "icon": "🥣"
      },
      {
        "id": "opt-k3-lit-e5-3",
        "label": {
          "th": "แม่กน",
          "en": "Mae Kon",
          "zh": "แม่กน 部"
        },
        "icon": "🔤"
      }
    ],
    "correctOptionId": "opt-k3-lit-e5-2",
    "explanation": {
      "th": "ม ม้า สะกด อยู่ในมาตราแม่กม เก่งมากครับ!",
      "en": "Correct! Words ending in ม are in Mae Kom.",
      "zh": "答对了！ม 结尾属于 แม่กม。"
    }
  },
  {
    "id": "k3-lit-e6",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"ดาว\" ⭐ มีตัวสะกดคือ ว แหวน อยู่ในมาตราใด?",
      "en": "Which section does \"ดาว\" (Star, ending in ว) belong to? ⭐",
      "zh": "单词“ดาว”（星星）以字母 ว 结尾，属于哪一部？⭐"
    },
    "illustration": "⭐ ด + า + ว ⭐",
    "illustrationSubtitle": {
      "th": "มาตราแม่เกอว",
      "en": "Mae Keow section",
      "zh": "แม่เกอว 韵尾"
    },
    "options": [
      {
        "id": "opt-k3-lit-e6-1",
        "label": {
          "th": "แม่กง",
          "en": "Mae Kong",
          "zh": "แม่กง 部"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k3-lit-e6-2",
        "label": {
          "th": "แม่กบ",
          "en": "Mae Kop",
          "zh": "แม่กบ 部"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k3-lit-e6-3",
        "label": {
          "th": "แม่เกอว (ว สะกด)",
          "en": "Mae Keow",
          "zh": "แม่เกอว 部 (ว 结尾)"
        },
        "icon": "⭐"
      }
    ],
    "correctOptionId": "opt-k3-lit-e6-3",
    "explanation": {
      "th": "ว แหวน สะกด อยู่ในมาตราแม่เกอว เก่งมากครับ!",
      "en": "Awesome! Words ending in ว are in Mae Keow.",
      "zh": "太棒啦！ว 结尾属于 แม่เกอว。"
    }
  },
  {
    "id": "k3-lit-e7",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"ไก่\" 🐔 มีเครื่องหมายวรรณยุกต์ใด?",
      "en": "What tone mark does \"ไก่\" (Chicken) have? 🐔",
      "zh": "单词“ไก่”（小鸡）头上带有哪个声调符号？🐔"
    },
    "illustration": "🐔 ก + ไ- + ่ 🐔",
    "illustrationSubtitle": {
      "th": "ไม้เอกบนตัว ก",
      "en": "Tone mark Mai Ek",
      "zh": "第一调 ไม้เอก"
    },
    "options": [
      {
        "id": "opt-k3-lit-e7-1",
        "label": {
          "th": "ไม้เอก ( -่ )",
          "en": "Mai Ek",
          "zh": "第一调 ไม้เอก (-่)"
        },
        "icon": "🐔"
      },
      {
        "id": "opt-k3-lit-e7-2",
        "label": {
          "th": "ไม้โท ( -้ )",
          "en": "Mai Tho",
          "zh": "第二调 ไม้โท (-้)"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k3-lit-e7-3",
        "label": {
          "th": "ไม้จัตวา ( -๋ )",
          "en": "Mai Chattawa",
          "zh": "第四调 ไม้จัตวา (-๋)"
        },
        "icon": "🔤"
      }
    ],
    "correctOptionId": "opt-k3-lit-e7-1",
    "explanation": {
      "th": "ก - ไอ - ไก - ไม้เอก - ไก่ ถูกต้องครับ!",
      "en": "Right! ไก่ has Mai Ek (-่).",
      "zh": "答对啦！声调符号是 ไม้เอก。"
    }
  },
  {
    "id": "k3-lit-e8",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"ม้า\" 🐎 มีเครื่องหมายวรรณยุกต์ใด?",
      "en": "What tone mark does \"ม้า\" (Horse) have? 🐎",
      "zh": "单词“ม้า”（马）头上带有哪个声调符号？🐎"
    },
    "illustration": "🐎 ม + า + ้ 🐎",
    "illustrationSubtitle": {
      "th": "ไม้โทบนตัว ม",
      "en": "Tone mark Mai Tho",
      "zh": "第二调 ไม้โท"
    },
    "options": [
      {
        "id": "opt-k3-lit-e8-1",
        "label": {
          "th": "ไม้เอก ( -่ )",
          "en": "Mai Ek",
          "zh": "第一调 ไม้เอก"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k3-lit-e8-2",
        "label": {
          "th": "ไม้โท ( -้ )",
          "en": "Mai Tho",
          "zh": "第二调 ไม้โท (-้)"
        },
        "icon": "🐎"
      },
      {
        "id": "opt-k3-lit-e8-3",
        "label": {
          "th": "ไม้ตรี ( -๊ )",
          "en": "Mai Tri",
          "zh": "第三调 ไม้ตรี"
        },
        "icon": "🔤"
      }
    ],
    "correctOptionId": "opt-k3-lit-e8-2",
    "explanation": {
      "th": "ม - อา - มา - ไม้โท - ม้า เก่งมากครับ!",
      "en": "Correct! ม้า uses Mai Tho (-้).",
      "zh": "答对了！声调符号是 ไม้โท。"
    }
  },
  {
    "id": "k3-lit-e9",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"โต๊ะ\" 🪑 มีเครื่องหมายวรรณยุกต์ใด?",
      "en": "What tone mark does \"โต๊ะ\" (Table) have? 🪑",
      "zh": "单词“โต๊ะ”（桌子）头上带有哪个声调符号？🪑"
    },
    "illustration": "🪑 ต + โ-ะ + ๊ 🪑",
    "illustrationSubtitle": {
      "th": "ไม้ตรีบนตัว ต",
      "en": "Tone mark Mai Tri",
      "zh": "第三调 ไม้ตรี"
    },
    "options": [
      {
        "id": "opt-k3-lit-e9-1",
        "label": {
          "th": "ไม้เอก ( -่ )",
          "en": "Mai Ek",
          "zh": "第一调 ไม้เอก"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k3-lit-e9-2",
        "label": {
          "th": "ไม้โท ( -้ )",
          "en": "Mai Tho",
          "zh": "第二调 ไม้โท"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k3-lit-e9-3",
        "label": {
          "th": "ไม้ตรี ( -๊ )",
          "en": "Mai Tri",
          "zh": "第三调 ไม้ตรี (-๊)"
        },
        "icon": "🪑"
      }
    ],
    "correctOptionId": "opt-k3-lit-e9-3",
    "explanation": {
      "th": "ต - โอะ - โตะ - ไม้ตรี - โต๊ะ เก่งมากครับ!",
      "en": "Awesome! โต๊ะ uses Mai Tri (-๊).",
      "zh": "太棒了！声调符号是 ไม้ตรี。"
    }
  },
  {
    "id": "k3-lit-e10",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"กระเป๋า\" 🎒 พยางค์หลังคือ \"เป๋า\" ใช้วรรณยุกต์ใด?",
      "en": "In \"กระเป๋า\" (Bag), what tone mark is on \"เป๋า\"? 🎒",
      "zh": "单词“กระเป๋า”（书包）后一个音节“เป๋า”用的是哪个声调符号？🎒"
    },
    "illustration": "🎒 ป + เ-า + ๋ 🎒",
    "illustrationSubtitle": {
      "th": "ไม้จัตวาเหมือนเครื่องหมายบวก",
      "en": "Tone mark Mai Chattawa",
      "zh": "第四调 ไม้จัตวา"
    },
    "options": [
      {
        "id": "opt-k3-lit-e10-1",
        "label": {
          "th": "ไม้จัตวา ( -๋ )",
          "en": "Mai Chattawa",
          "zh": "第四调 ไม้จัตวา (-๋)"
        },
        "icon": "🎒"
      },
      {
        "id": "opt-k3-lit-e10-2",
        "label": {
          "th": "ไม้เอก ( -่ )",
          "en": "Mai Ek",
          "zh": "第一调 ไม้เอก"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k3-lit-e10-3",
        "label": {
          "th": "ไม้โท ( -้ )",
          "en": "Mai Tho",
          "zh": "第二调 ไม้โท"
        },
        "icon": "🔤"
      }
    ],
    "correctOptionId": "opt-k3-lit-e10-1",
    "explanation": {
      "th": "ป - เอา - เปา - ไม้จัตวา - เป๋า ยอดเยี่ยมมากครับ!",
      "en": "Correct! It uses Mai Chattawa (-๋).",
      "zh": "答对了！用的是第四调 ไม้จัตวา。"
    }
  },
  {
    "id": "k3-lit-m1",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำประสม: คำว่า \"น้ำ\" รวมกับ \"แข็ง\" กลายเป็น \"น้ำแข็ง\" 🧊 หมายถึงอะไร?",
      "en": "Compound word: \"น้ำ\" (Water) + \"แข็ง\" (Hard) = \"น้ำแข็ง\" (Ice) means what? 🧊",
      "zh": "复合词：“น้ำ”（水）+“แข็ง”（硬）合成“น้ำแข็ง”（冰块）🧊 是什么意思？"
    },
    "illustration": "🧊 💧 🧊",
    "illustrationSubtitle": {
      "th": "คำประสมความหมายใหม่",
      "en": "Compound word: Ice",
      "zh": "复合词：冰块"
    },
    "options": [
      {
        "id": "opt-k3-lit-m1-1",
        "label": {
          "th": "น้ำร้อนเดือด",
          "en": "Boiling water",
          "zh": "沸水"
        },
        "icon": "♨️"
      },
      {
        "id": "opt-k3-lit-m1-2",
        "label": {
          "th": "น้ำที่เย็นจัดจนกลายเป็นก้อนแข็ง",
          "en": "Frozen solid ice",
          "zh": "冷冻结成冰块的水"
        },
        "icon": "🧊"
      },
      {
        "id": "opt-k3-lit-m1-3",
        "label": {
          "th": "น้ำผลไม้รสหวาน",
          "en": "Sweet juice",
          "zh": "甜果汁"
        },
        "icon": "🧃"
      }
    ],
    "correctOptionId": "opt-k3-lit-m1-2",
    "explanation": {
      "th": "น้ำแข็ง คือน้ำที่เย็นจัดจนแข็งเป็นก้อน เก่งมากครับ!",
      "en": "Spot on! น้ำแข็ง is frozen solid water (ice).",
      "zh": "答对啦！น้ำแข็ง 是结冰的固体水。"
    }
  },
  {
    "id": "k3-lit-m2",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำประสม: คำว่า \"ตู้\" รวมกับ \"เย็น\" กลายเป็น \"ตู้เย็น\" ❄️ หมายถึงอะไร?",
      "en": "Compound word: \"ตู้\" (Cabinet) + \"เย็น\" (Cold) = \"ตู้เย็น\" (Refrigerator) ❄️ means?",
      "zh": "复合词：“ตู้”（柜子）+“เย็น”（冷）合成“ตู้เย็น”（冰箱）❄️ 是什么意思？"
    },
    "illustration": "❄️ 🥫 ❄️",
    "illustrationSubtitle": {
      "th": "ตู้เก็บรักษาความเย็น",
      "en": "Refrigerator",
      "zh": "保鲜冰箱"
    },
    "options": [
      {
        "id": "opt-k3-lit-m2-1",
        "label": {
          "th": "ตู้ใส่เสื้อผ้า",
          "en": "Wardrobe",
          "zh": "衣柜"
        },
        "icon": "👗"
      },
      {
        "id": "opt-k3-lit-m2-2",
        "label": {
          "th": "ตู้เก็บรองเท้า",
          "en": "Shoe rack",
          "zh": "鞋柜"
        },
        "icon": "👟"
      },
      {
        "id": "opt-k3-lit-m2-3",
        "label": {
          "th": "ตู้เครื่องใช้ไฟฟ้าที่รักษาความเย็นให้อาหารสด",
          "en": "Electric appliance to keep food cold",
          "zh": "保鲜冷藏食物的冰箱"
        },
        "icon": "❄️"
      }
    ],
    "correctOptionId": "opt-k3-lit-m2-3",
    "explanation": {
      "th": "ตู้เย็น ใช้แช่ของสดและน้ำดื่มให้เย็นชื่นใจ เก่งมากครับ!",
      "en": "Correct! ตู้เย็น is a refrigerator for preserving food.",
      "zh": "答对了！ตู้เย็น 是保鲜食物的冰箱。"
    }
  },
  {
    "id": "k3-lit-m3",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำว่า \"ตะวัน\" ☀️ มีความหมายเหมือนกับคำว่าอะไร?",
      "en": "Which word has the same meaning as \"ตะวัน\" (Tawan)? ☀️",
      "zh": "单词“ตะวัน”（太阳）和下列哪一个词语同义？☀️"
    },
    "illustration": "☀️ 🌅 ☀️",
    "illustrationSubtitle": {
      "th": "คำที่มีความหมายเหมือนกัน",
      "en": "Synonym for sun",
      "zh": "太阳的同义词"
    },
    "options": [
      {
        "id": "opt-k3-lit-m3-1",
        "label": {
          "th": "ดวงอาทิตย์",
          "en": "Sun",
          "zh": "太阳 (ดวงอาทิตย์)"
        },
        "icon": "☀️"
      },
      {
        "id": "opt-k3-lit-m3-2",
        "label": {
          "th": "ดวงจันทร์",
          "en": "Moon",
          "zh": "月亮"
        },
        "icon": "🌙"
      },
      {
        "id": "opt-k3-lit-m3-3",
        "label": {
          "th": "ก้อนเมฆ",
          "en": "Cloud",
          "zh": "白云"
        },
        "icon": "☁️"
      }
    ],
    "correctOptionId": "opt-k3-lit-m3-1",
    "explanation": {
      "th": "ตะวัน หมายถึง ดวงอาทิตย์ ที่ส่องแสงยามกลางวัน เก่งมากครับ!",
      "en": "Right! ตะวัน and ดวงอาทิตย์ both mean the Sun.",
      "zh": "答对啦！ตะวัน 就是太阳。"
    }
  },
  {
    "id": "k3-lit-m4",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำว่า \"พระจันทร์\" 🌙 มีความหมายเหมือนกับคำว่าอะไร?",
      "en": "Which word has the same meaning as \"พระจันทร์\" (Moon)? 🌙",
      "zh": "单词“พระจันทร์”（月亮）和下列哪一个词语同义？🌙"
    },
    "illustration": "🌙 ✨ 🌙",
    "illustrationSubtitle": {
      "th": "คำที่มีความหมายเหมือนกัน",
      "en": "Synonym for moon",
      "zh": "月亮的同义词"
    },
    "options": [
      {
        "id": "opt-k3-lit-m4-1",
        "label": {
          "th": "สายรุ้ง",
          "en": "Rainbow",
          "zh": "彩虹"
        },
        "icon": "🌈"
      },
      {
        "id": "opt-k3-lit-m4-2",
        "label": {
          "th": "ดวงจันทร์",
          "en": "Moon",
          "zh": "月亮 (ดวงจันทร์)"
        },
        "icon": "🌙"
      },
      {
        "id": "opt-k3-lit-m4-3",
        "label": {
          "th": "ดวงดาว",
          "en": "Stars",
          "zh": "繁星"
        },
        "icon": "⭐"
      }
    ],
    "correctOptionId": "opt-k3-lit-m4-2",
    "explanation": {
      "th": "พระจันทร์ หมายถึง ดวงจันทร์ ส่องแสงยามค่ำคืน เก่งมากครับ!",
      "en": "Correct! พระจันทร์ means the moon.",
      "zh": "答对了！就是月亮。"
    }
  },
  {
    "id": "k3-lit-m5",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำคล้องจอง: \"ดอกไม้\" 🌸 คล้องจองกับคำว่าอะไร?",
      "en": "Rhyme: Which word rhymes with \"ดอกไม้\" (Dok-mai)? 🌸",
      "zh": "押韵词：哪一个词语和“ดอกไม้”（花朵）押韵？🌸"
    },
    "illustration": "🌸 🍃 🌸",
    "illustrationSubtitle": {
      "th": "สัมผัสสระไอ",
      "en": "Rhyme with Mai",
      "zh": "与 ดอกไม้ 押韵"
    },
    "options": [
      {
        "id": "opt-k3-lit-m5-1",
        "label": {
          "th": "ต้นไม้",
          "en": "Tree",
          "zh": "树木"
        },
        "icon": "🌳"
      },
      {
        "id": "opt-k3-lit-m5-2",
        "label": {
          "th": "ผลไม้",
          "en": "Fruit",
          "zh": "水果"
        },
        "icon": "🍎"
      },
      {
        "id": "opt-k3-lit-m5-3",
        "label": {
          "th": "ใบหญ้า",
          "en": "Bai-ya (Grass)",
          "zh": "青草 (ใบหญ้า)"
        },
        "icon": "🌿"
      }
    ],
    "correctOptionId": "opt-k3-lit-m5-3",
    "explanation": {
      "th": "ดอกไม้ - ใบหญ้า คำว่า \"ไม้\" คล้องจองกับ \"ใบ\" สระไอเหมือนกัน เก่งมากครับ!",
      "en": "Awesome! ดอกไม้ and ใบหญ้า rhyme on Mai / Bai.",
      "zh": "太棒啦！ไม้ 和 ใบ 押韵。"
    }
  },
  {
    "id": "k3-lit-m6",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำตรงข้าม: คำว่า \"ขยัน\" 📚 ตรงข้ามกับคำว่าอะไร?",
      "en": "Opposite: What is the opposite of \"Diligent\" (ขยัน)? 📚",
      "zh": "反义词：“勤劳” 📚 的反义词是什么？"
    },
    "illustration": "📚 ↔️ 😴",
    "illustrationSubtitle": {
      "th": "คำตรงข้ามความประพฤติ",
      "en": "Diligent vs Lazy",
      "zh": "勤劳与懒惰"
    },
    "options": [
      {
        "id": "opt-k3-lit-m6-1",
        "label": {
          "th": "ขี้เกียจ",
          "en": "Lazy",
          "zh": "懒惰"
        },
        "icon": "😴"
      },
      {
        "id": "opt-k3-lit-m6-2",
        "label": {
          "th": "อดทน",
          "en": "Patient",
          "zh": "耐劳"
        },
        "icon": "💪"
      },
      {
        "id": "opt-k3-lit-m6-3",
        "label": {
          "th": "กล้าหาญ",
          "en": "Brave",
          "zh": "勇敢"
        },
        "icon": "🦁"
      }
    ],
    "correctOptionId": "opt-k3-lit-m6-1",
    "explanation": {
      "th": "ขยัน ตรงข้ามกับ ขี้เกียจ ถูกต้องครับ!",
      "en": "Spot on! Diligent is opposite to Lazy.",
      "zh": "答对啦！勤劳的反义词是懒惰。"
    }
  },
  {
    "id": "k3-lit-m7",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำตรงข้าม: คำว่า \"กล้าหาญ\" 🦁 ตรงข้ามกับคำว่าอะไร?",
      "en": "Opposite: What is the opposite of \"Brave\" (กล้าหาญ)? 🦁",
      "zh": "反义词：“勇敢” 🦁 的反义词是什么？"
    },
    "illustration": "🦁 ↔️ 🐭",
    "illustrationSubtitle": {
      "th": "กล้าหาญ กับ ขลาดกลัว",
      "en": "Brave vs Cowardly",
      "zh": "勇敢与胆小"
    },
    "options": [
      {
        "id": "opt-k3-lit-m7-1",
        "label": {
          "th": "เข้มแข็ง",
          "en": "Strong",
          "zh": "坚强"
        },
        "icon": "💪"
      },
      {
        "id": "opt-k3-lit-m7-2",
        "label": {
          "th": "ขลาดกลัว",
          "en": "Fearful / Cowardly",
          "zh": "胆小胆怯"
        },
        "icon": "🐭"
      },
      {
        "id": "opt-k3-lit-m7-3",
        "label": {
          "th": "ร่าเริง",
          "en": "Cheerful",
          "zh": "开朗"
        },
        "icon": "😄"
      }
    ],
    "correctOptionId": "opt-k3-lit-m7-2",
    "explanation": {
      "th": "กล้าหาญ ตรงข้ามกับ ขลาดกลัว เก่งมากครับ!",
      "en": "Correct! Brave is opposite to Cowardly.",
      "zh": "答对了！勇敢的反义词是胆小害怕。"
    }
  },
  {
    "id": "k3-lit-m8",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำใดเขียนสะกดถูกต้องตามพจนานุกรมไทย? 🌿",
      "en": "Which spelling of holy basil (Kaprao) is correct? 🌿",
      "zh": "泰语中“九层塔/打抛叶”（กะเพรา）正确的拼写是哪一个？🌿"
    },
    "illustration": "🌿 🍲 🌿",
    "illustrationSubtitle": {
      "th": "การสะกดคำที่มักเขียนผิด",
      "en": "Correct spelling",
      "zh": "规范泰语拼写"
    },
    "options": [
      {
        "id": "opt-k3-lit-m8-1",
        "label": {
          "th": "กระเพรา",
          "en": "Kraprao (incorrect)",
          "zh": "กระเพรา (错误)"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-lit-m8-2",
        "label": {
          "th": "กระเพลา",
          "en": "Kraphela (incorrect)",
          "zh": "กระเพลา (错误)"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k3-lit-m8-3",
        "label": {
          "th": "กะเพรา",
          "en": "Kaprao (correct)",
          "zh": "กะเพรา (正确规范)"
        },
        "icon": "🌿"
      }
    ],
    "correctOptionId": "opt-k3-lit-m8-3",
    "explanation": {
      "th": "กะเพรา เขียนด้วย กะ (ไม่มี ร ควบกล้ำ) เก่งมากครับ!",
      "en": "Awesome! กะเพรา has no R in the first syllable.",
      "zh": "太厉害了！正确规范是 กะเพรา。"
    }
  },
  {
    "id": "k3-lit-m9",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำว่า \"น้ำใจ\" ❤️ มีความหมายตรงกับข้อใดมากที่สุด?",
      "en": "What does \"น้ำใจ\" (Generosity / Kindness) mean? ❤️",
      "zh": "词语“น้ำใจ”（心意/热心肠）最贴切的意思是什么？❤️"
    },
    "illustration": "❤️ 🤝 ❤️",
    "illustrationSubtitle": {
      "th": "คุณธรรมการมีน้ำใจ",
      "en": "Kindness & generosity",
      "zh": "关怀与热心肠"
    },
    "options": [
      {
        "id": "opt-k3-lit-m9-1",
        "label": {
          "th": "ความมีจิตเมตตาเอื้อเฟื้อเผื่อแผ่ต่อผู้อื่น",
          "en": "Kindness and helping others",
          "zh": "关爱他人、乐于助人的美德"
        },
        "icon": "❤️"
      },
      {
        "id": "opt-k3-lit-m9-2",
        "label": {
          "th": "น้ำดื่มในแก้ว",
          "en": "Drinking water",
          "zh": "杯子里的饮用水"
        },
        "icon": "🥤"
      },
      {
        "id": "opt-k3-lit-m9-3",
        "label": {
          "th": "น้ำตกในป่า",
          "en": "Waterfall",
          "zh": "森林里的瀑布"
        },
        "icon": "🏞️"
      }
    ],
    "correctOptionId": "opt-k3-lit-m9-1",
    "explanation": {
      "th": "น้ำใจ คือความเอื้อเฟื้อเผื่อแผ่ช่วยเหลือกัน เก่งมากครับ!",
      "en": "Correct! น้ำใจ means kindness and generosity.",
      "zh": "答对啦！就是热心善良的美德。"
    }
  },
  {
    "id": "k3-lit-m10",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำว่า \"รถพยาบาล\" 🚑 มีหน้าที่สำหรับทำสิ่งใด?",
      "en": "What is an ambulance (รถพยาบาล) used for? 🚑",
      "zh": "救护车 (รถพยาบาล) 🚑 的主要职责是什么？"
    },
    "illustration": "🚑 🏥 🚑",
    "illustrationSubtitle": {
      "th": "ยานพาหนะช่วยเหลือชีวิต",
      "en": "Ambulance service",
      "zh": "救死扶伤的救护车"
    },
    "options": [
      {
        "id": "opt-k3-lit-m10-1",
        "label": {
          "th": "ไปเที่ยวทะเล",
          "en": "Go to beach",
          "zh": "去海边旅游"
        },
        "icon": "🏖️"
      },
      {
        "id": "opt-k3-lit-m10-2",
        "label": {
          "th": "รับส่งผู้ป่วยฉุกเฉินไปโรงพยาบาล",
          "en": "Transport emergency patients",
          "zh": "紧急接送病人去医院救治"
        },
        "icon": "🚑"
      },
      {
        "id": "opt-k3-lit-m10-3",
        "label": {
          "th": "ส่งพัสดุกล่องใหญ่",
          "en": "Deliver parcels",
          "zh": "送大件快递包裹"
        },
        "icon": "📦"
      }
    ],
    "correctOptionId": "opt-k3-lit-m10-2",
    "explanation": {
      "th": "รถพยาบาลเปิดไซเรนช่วยชีวิตผู้ป่วยฉุกเฉิน ถูกต้องครับ!",
      "en": "Right! Ambulances transport patients quickly.",
      "zh": "答对了！用来救治接送急诊病人。"
    }
  },
  {
    "id": "k3-lit-h1",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "ประโยค: \"น้องปลูกต้นมะลิหน้าบ้าน\" ใครเป็น \"ประธาน\" (ผู้กระทำ) ของประโยค? 👧",
      "en": "Sentence: \"Nong plants jasmine in front of the house.\" Who is the subject? 👧",
      "zh": "句子：“妹妹在屋前栽种茉莉花”中，谁是句子的“主语”（动作执行者）？👧"
    },
    "illustration": "👧 🌸 🏡",
    "illustrationSubtitle": {
      "th": "วิเคราะห์ส่วนประกอบประโยค",
      "en": "Sentence subject",
      "zh": "分析句子成分"
    },
    "options": [
      {
        "id": "opt-k3-lit-h1-1",
        "label": {
          "th": "ต้นมะลิ",
          "en": "Jasmine",
          "zh": "茉莉花"
        },
        "icon": "🌸"
      },
      {
        "id": "opt-k3-lit-h1-2",
        "label": {
          "th": "หน้าบ้าน",
          "en": "In front of house",
          "zh": "屋前"
        },
        "icon": "🏡"
      },
      {
        "id": "opt-k3-lit-h1-3",
        "label": {
          "th": "น้อง",
          "en": "Nong (little sister)",
          "zh": "妹妹/弟弟 (น้อง)"
        },
        "icon": "👧"
      }
    ],
    "correctOptionId": "opt-k3-lit-h1-3",
    "explanation": {
      "th": "น้อง เป็นผู้กระทำ จึงเป็นประธานของประโยค เก่งมากครับ!",
      "en": "Correct! น้อง is the subject of the sentence.",
      "zh": "答对啦！น้อง 是句子主语。"
    }
  },
  {
    "id": "k3-lit-h2",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "ประโยค: \"คุณแม่ทำต้มยำกุ้งในครัว\" คำใดคือ \"คำกริยา\" (การกระทำ)? 👩‍🍳",
      "en": "Sentence: \"Mom cooks tom yum in the kitchen.\" Which word is the verb? 👩‍🍳",
      "zh": "句子：“妈妈在厨房煮冬阴功虾汤”中，哪一个是表示动作的“动词”？👩‍🍳"
    },
    "illustration": "👩‍🍳 🍲 👩‍🍳",
    "illustrationSubtitle": {
      "th": "คำกริยาแสดงการกระทำ",
      "en": "Action verb",
      "zh": "表示动作的动词"
    },
    "options": [
      {
        "id": "opt-k3-lit-h2-1",
        "label": {
          "th": "ทำ (ปรุงอาหาร)",
          "en": "Makes / Cooks",
          "zh": "做/烹煮 (ทำ)"
        },
        "icon": "👩‍🍳"
      },
      {
        "id": "opt-k3-lit-h2-2",
        "label": {
          "th": "คุณแม่",
          "en": "Mother",
          "zh": "妈妈"
        },
        "icon": "👩"
      },
      {
        "id": "opt-k3-lit-h2-3",
        "label": {
          "th": "ห้องครัว",
          "en": "Kitchen",
          "zh": "厨房"
        },
        "icon": "🏠"
      }
    ],
    "correctOptionId": "opt-k3-lit-h2-1",
    "explanation": {
      "th": "คำว่า \"ทำ\" แสดงการกระทำ จึงเป็นคำกริยา เก่งมากครับ!",
      "en": "Spot on! \"ทำ\" (cook/make) is the verb.",
      "zh": "太棒啦！“ทำ”（做/煮）是动词。"
    }
  },
  {
    "id": "k3-lit-h3",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำใดในตัวเลือกนี้เป็น \"คำควบกล้ำแท้\"? 🍌",
      "en": "Which word is a true consonant cluster (คำควบกล้ำ)? 🍌",
      "zh": "下列哪一个词语是双辅音发音的“真复辅音词”（คำควบกล้ำ）？🍌"
    },
    "illustration": "🍌 🔤 🍌",
    "illustrationSubtitle": {
      "th": "พยัญชนะควบกล้ำ",
      "en": "Consonant cluster",
      "zh": "泰语复辅音词"
    },
    "options": [
      {
        "id": "opt-k3-lit-h3-1",
        "label": {
          "th": "ตลาด",
          "en": "Talad",
          "zh": "市场 (ตลาด)"
        },
        "icon": "🏬"
      },
      {
        "id": "opt-k3-lit-h3-2",
        "label": {
          "th": "กล้วย (กล-)",
          "en": "Kluay (Banana)",
          "zh": "香蕉 (กล้วย - กล)"
        },
        "icon": "🍌"
      },
      {
        "id": "opt-k3-lit-h3-3",
        "label": {
          "th": "ฉลาม",
          "en": "Chalam",
          "zh": "鲨鱼 (ฉลาม)"
        },
        "icon": "🦈"
      }
    ],
    "correctOptionId": "opt-k3-lit-h3-2",
    "explanation": {
      "th": "คำว่า \"กล้วย\" ควบกล้ำ กล- ออกเสียงพร้อมกัน เก่งมากครับ!",
      "en": "Correct! \"กล้วย\" has the cluster กล-.",
      "zh": "答对了！กล้วย 是真正的复辅音词。"
    }
  },
  {
    "id": "k3-lit-h4",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำใดในตัวเลือกนี้เป็น \"อักษรนำ\" (ห นำ)? 🐭",
      "en": "Which word has a leading \"ห\" (อักษรนำ)? 🐭",
      "zh": "下列哪一个词属于泰语中的“高辅音领头词”（อักษรนำ - ห นำ）？🐭"
    },
    "illustration": "🐭 🔤 🐭",
    "illustrationSubtitle": {
      "th": "อักษรนำ ห นำ น",
      "en": "Leading Ho-Heep",
      "zh": "前引字母 ห"
    },
    "options": [
      {
        "id": "opt-k3-lit-h4-1",
        "label": {
          "th": "ปลา",
          "en": "Pla",
          "zh": "鱼儿 (ปลา)"
        },
        "icon": "🐟"
      },
      {
        "id": "opt-k3-lit-h4-2",
        "label": {
          "th": "ดาว",
          "en": "Dao",
          "zh": "星星 (ดาว)"
        },
        "icon": "⭐"
      },
      {
        "id": "opt-k3-lit-h4-3",
        "label": {
          "th": "หนู (ห นำ น)",
          "en": "Noo (Mouse)",
          "zh": "小老鼠 (หนู)"
        },
        "icon": "🐭"
      }
    ],
    "correctOptionId": "opt-k3-lit-h4-3",
    "explanation": {
      "th": "คำว่า \"หนู\" มี ห นำ น เป็นอักษรนำ เก่งมากครับ!",
      "en": "Awesome! \"หนู\" has leading ห before น.",
      "zh": "太棒了！หนู 是 ห 领头的词。"
    }
  },
  {
    "id": "k3-lit-h5",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำใดมีเครื่องหมาย \"ทัณฑฆาต (การันต์)\" กำกับบนตัวอักษร? 📺",
      "en": "Which word contains the silence mark (Garan / ตัวการันต์)? 📺",
      "zh": "下列哪个词带有泰语静音符号（ตัวการันต์ - ์）？📺"
    },
    "illustration": "📺 🎨 📺",
    "illustrationSubtitle": {
      "th": "ไม้ทัณฑฆาตการันต์",
      "en": "Garan silence mark",
      "zh": "静音符号"
    },
    "options": [
      {
        "id": "opt-k3-lit-h5-1",
        "label": {
          "th": "การ์ตูน (ร การันต์)",
          "en": "Cartoon",
          "zh": "动画片 (การ์ตูน)"
        },
        "icon": "📺"
      },
      {
        "id": "opt-k3-lit-h5-2",
        "label": {
          "th": "ดินสอ",
          "en": "Pencil",
          "zh": "铅笔"
        },
        "icon": "✏️"
      },
      {
        "id": "opt-k3-lit-h5-3",
        "label": {
          "th": "กระดาษ",
          "en": "Paper",
          "zh": "纸张"
        },
        "icon": "📄"
      }
    ],
    "correctOptionId": "opt-k3-lit-h5-1",
    "explanation": {
      "th": "การ์ตูน มีไม้ทัณฑฆาตบนตัว ร เก่งมากครับ!",
      "en": "Correct! การ์ตูน has a Garan mark on ร.",
      "zh": "答对啦！การ์ตูน 上的 ร 带有静音符号。"
    }
  },
  {
    "id": "k3-lit-h6",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "เรียงลำดับขั้นตอนในชีวิตประจำวัน: (1) ทานข้าว (2) แปรงฟัน (3) เข้านอน 🪥",
      "en": "Order the bedtime steps: (1) Eat dinner (2) Brush teeth (3) Go to bed 🪥",
      "zh": "睡前生活习惯正确顺序排列：(1) 吃晚餐 (2) 刷牙 (3) 上床睡觉 🪥"
    },
    "illustration": "🥣 🪥 🛌",
    "illustrationSubtitle": {
      "th": "ลำดับเหตุการณ์ตามเวลา",
      "en": "Logical sequence",
      "zh": "按逻辑顺序排列"
    },
    "options": [
      {
        "id": "opt-k3-lit-h6-1",
        "label": {
          "th": "แปรงฟัน -> ทานข้าว -> เข้านอน",
          "en": "Brush -> Eat -> Bed",
          "zh": "刷牙 -> 吃饭 -> 睡觉"
        },
        "icon": "❓"
      },
      {
        "id": "opt-k3-lit-h6-2",
        "label": {
          "th": "ทานข้าว -> แปรงฟัน -> เข้านอน",
          "en": "Eat -> Brush -> Bed",
          "zh": "吃饭 -> 刷牙 -> 睡觉"
        },
        "icon": "✅"
      },
      {
        "id": "opt-k3-lit-h6-3",
        "label": {
          "th": "เข้านอน -> แปรงฟัน -> ทานข้าว",
          "en": "Bed -> Brush -> Eat",
          "zh": "睡觉 -> 刷牙 -> 吃饭"
        },
        "icon": "❓"
      }
    ],
    "correctOptionId": "opt-k3-lit-h6-2",
    "explanation": {
      "th": "ทานข้าวเสร็จ แปรงฟันให้สะอาด แล้วค่อยเข้านอน ยอดเยี่ยมครับ!",
      "en": "Right! Eat dinner first, brush teeth, then sleep.",
      "zh": "答对啦！先吃晚饭，再刷牙清洁，然后安心上床睡觉。"
    }
  },
  {
    "id": "k3-lit-h7",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "ปริศนาคำทาย: \"สี่ขาเดินมา หลังคามุงกระเบื้อง หดหัวได้เมื่อมีภัย\"? 🐢",
      "en": "Riddle: Four legs walking, tiled roof on back, tucks head in when in danger? 🐢",
      "zh": "猜谜语：“四脚慢慢爬，背上背青瓦，遇到危险头缩下”是什么小动物？🐢"
    },
    "illustration": "🐢 ❓ 🐢",
    "illustrationSubtitle": {
      "th": "คำทายโบราณไทย",
      "en": "Thai classic riddle",
      "zh": "泰国传统童趣谜语"
    },
    "options": [
      {
        "id": "opt-k3-lit-h7-1",
        "label": {
          "th": "ปู",
          "en": "Crab",
          "zh": "螃蟹"
        },
        "icon": "🦀"
      },
      {
        "id": "opt-k3-lit-h7-2",
        "label": {
          "th": "จระเข้",
          "en": "Crocodile",
          "zh": "鳄鱼"
        },
        "icon": "🐊"
      },
      {
        "id": "opt-k3-lit-h7-3",
        "label": {
          "th": "เต่า",
          "en": "Turtle",
          "zh": "乌龟"
        },
        "icon": "🐢"
      }
    ],
    "correctOptionId": "opt-k3-lit-h7-3",
    "explanation": {
      "th": "เต่า มีกระดองแข็งและหดหัวได้ เก่งมากครับ!",
      "en": "Spot on! The turtle has a shell and tucks its head in.",
      "zh": "太聪明了！是缩头乌龟。"
    }
  },
  {
    "id": "k3-lit-h8",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำใดในตัวเลือกนี้มี \"เสียงสระยาว\" (เช่น อา อี อู)? 🐟",
      "en": "Which word has a LONG vowel sound (like Ah, Ee, Oo)? 🐟",
      "zh": "下列哪一个词语的发音是长元音（如 อา、อี、อู）？🐟"
    },
    "illustration": "🐟 🔤 🐟",
    "illustrationSubtitle": {
      "th": "สระเสียงสั้นและสระเสียงยาว",
      "en": "Long vowel sound",
      "zh": "长元音发音"
    },
    "options": [
      {
        "id": "opt-k3-lit-h8-1",
        "label": {
          "th": "ปลา (สระ อา เสียงยาว)",
          "en": "Pla (Long vowel Ah)",
          "zh": "ปลา (长元音 า)"
        },
        "icon": "🐟"
      },
      {
        "id": "opt-k3-lit-h8-2",
        "label": {
          "th": "กะ (สระ อะ เสียงสั้น)",
          "en": "Ka (Short vowel)",
          "zh": "กะ (短元音 ะ)"
        },
        "icon": "🔤"
      },
      {
        "id": "opt-k3-lit-h8-3",
        "label": {
          "th": "เตะ (สระ เอะ เสียงสั้น)",
          "en": "Teh (Short vowel)",
          "zh": "เตะ (短元音 เ-ะ)"
        },
        "icon": "🔤"
      }
    ],
    "correctOptionId": "opt-k3-lit-h8-1",
    "explanation": {
      "th": "คำว่า \"ปลา\" ประสมด้วยสระอา เป็นสระเสียงยาว เก่งมากครับ!",
      "en": "Correct! ปลา has the long vowel Ah (-า).",
      "zh": "答对啦！ปลา 中的 า 是长元音。"
    }
  },
  {
    "id": "k3-lit-h9",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "อ่านข้อความ: \"ฝนตกพรำๆ มดแดงพากันขนไข่หนีน้ำขึ้นที่สูง\" ทำไมมดต้องขนไข่? 🐜",
      "en": "Read: \"It rains softly. Red ants carry eggs to high ground.\" Why do ants move eggs? 🐜",
      "zh": "阅读理解：“细雨下个不停，红蚂蚁纷纷把蚁卵搬到高处。”蚂蚁为什么要搬卵？🐜"
    },
    "illustration": "🐜 🌧️ 🐜",
    "illustrationSubtitle": {
      "th": "การอ่านจับใจความสั้นๆ",
      "en": "Reading comprehension",
      "zh": "简短阅读理解"
    },
    "options": [
      {
        "id": "opt-k3-lit-h9-1",
        "label": {
          "th": "ขนไปเล่นน้ำฝน",
          "en": "To play in the rain",
          "zh": "去雨里玩耍"
        },
        "icon": "🌧️"
      },
      {
        "id": "opt-k3-lit-h9-2",
        "label": {
          "th": "ขนหนีน้ำท่วมรัง",
          "en": "To escape floodwaters",
          "zh": "躲避雨水淹没洞穴"
        },
        "icon": "🐜"
      },
      {
        "id": "opt-k3-lit-h9-3",
        "label": {
          "th": "ขนไปให้เพื่อนกิน",
          "en": "To feed friends",
          "zh": "拿去给朋友吃"
        },
        "icon": "🍬"
      }
    ],
    "correctOptionId": "opt-k3-lit-h9-2",
    "explanation": {
      "th": "มดขนไข่หนีน้ำท่วมรังเพื่อความปลอดภัย เก่งมากครับ!",
      "en": "Right! Ants move their eggs to avoid flooding.",
      "zh": "答对了！搬卵去高处是为了躲避大水。"
    }
  },
  {
    "id": "k3-lit-h10",
    "grade": "K3",
    "subject": "literacy",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"โรงเรียน\" 🏫 ทำหน้าที่เป็นอะไรในประโยค \"พวกเราไปโรงเรียน\"?",
      "en": "In \"We go to school\", what role does \"โรงเรียน\" (School) play?",
      "zh": "在句子“我们去学校”（พวกเราไปโรงเรียน）中，“学校”（โรงเรียน）充当什么成分？"
    },
    "illustration": "🏫 🎒 🏫",
    "illustrationSubtitle": {
      "th": "สถานที่ปลายทางของการไป",
      "en": "Destination / object",
      "zh": "目的地/宾语"
    },
    "options": [
      {
        "id": "opt-k3-lit-h10-1",
        "label": {
          "th": "ประธาน (ผู้กระทำ)",
          "en": "Subject",
          "zh": "句子主语"
        },
        "icon": "👤"
      },
      {
        "id": "opt-k3-lit-h10-2",
        "label": {
          "th": "คำกริยา (การกระทำ)",
          "en": "Verb",
          "zh": "动作动词"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k3-lit-h10-3",
        "label": {
          "th": "สถานที่ปลายทาง (กรรมของประโยค)",
          "en": "Destination object",
          "zh": "目的地（句子宾语）"
        },
        "icon": "🏫"
      }
    ],
    "correctOptionId": "opt-k3-lit-h10-3",
    "explanation": {
      "th": "โรงเรียนเป็นสถานที่ปลายทางที่พวกเรามุ่งหน้าไป ยอดเยี่ยมมากครับ!",
      "en": "Awesome! โรงเรียน is the destination of the action.",
      "zh": "太棒了！โรงเรียน 是动作的目的地。"
    }
  }
];
