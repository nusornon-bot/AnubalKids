import { Question } from '../types';

/**
 * คลังข้อสอบภาษาอังกฤษปฐมวัย (English for Kids: Phonics, Alphabet, Sight Words)
 * ครบ 3 ระดับชั้น (K1, K2, K3) x 3 ระดับความยาก (ง่าย, ปานกลาง, ท้าทาย) x 10 ข้อ = 90 ข้อ
 */
export const QUESTIONS_ENGLISH: Question[] = [
  {
    "id": "k1-eng-e1",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "ตัวอักษรภาษาอังกฤษตัวนี้คือตัวอะไรเอ่ย? \"A\"",
      "en": "Which English letter is this? \"A\"",
      "zh": "这是哪个英文字母？“A”"
    },
    "illustration": "🍎 A 🍏",
    "illustrationSubtitle": {
      "th": "Letter A",
      "en": "Letter A",
      "zh": "字母 A"
    },
    "options": [
      {
        "id": "opt-k1-eng-e1-1",
        "label": {
          "th": "A (เอ)",
          "en": "A",
          "zh": "A"
        },
        "icon": "🍎"
      },
      {
        "id": "opt-k1-eng-e1-2",
        "label": {
          "th": "B (บี)",
          "en": "B",
          "zh": "B"
        },
        "icon": "🐝"
      },
      {
        "id": "opt-k1-eng-e1-3",
        "label": {
          "th": "C (ซี)",
          "en": "C",
          "zh": "C"
        },
        "icon": "🐱"
      }
    ],
    "correctOptionId": "opt-k1-eng-e1-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! นี่คือตัวอักษร A (A is for Apple 🍎)",
      "en": "Great job! This is letter A (A is for Apple 🍎)",
      "zh": "太棒了！这是字母 A 🍎"
    }
  },
  {
    "id": "k1-eng-e2",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "ตัวอักษรภาษาอังกฤษตัวนี้คือตัวอะไรเอ่ย? \"B\"",
      "en": "Which English letter is this? \"B\"",
      "zh": "这是哪个英文字母？“B”"
    },
    "illustration": "🐝 B 🐻",
    "illustrationSubtitle": {
      "th": "Letter B",
      "en": "Letter B",
      "zh": "字母 B"
    },
    "options": [
      {
        "id": "opt-k1-eng-e2-1",
        "label": {
          "th": "C (ซี)",
          "en": "C",
          "zh": "C"
        },
        "icon": "🐱"
      },
      {
        "id": "opt-k1-eng-e2-2",
        "label": {
          "th": "B (บี)",
          "en": "B",
          "zh": "B"
        },
        "icon": "🐝"
      },
      {
        "id": "opt-k1-eng-e2-3",
        "label": {
          "th": "A (เอ)",
          "en": "A",
          "zh": "A"
        },
        "icon": "🍎"
      }
    ],
    "correctOptionId": "opt-k1-eng-e2-2",
    "explanation": {
      "th": "เก่งมากเลย! ตัวนี้คือ B (B is for Bear 🐻)",
      "en": "Well done! This is letter B (B is for Bear 🐻)",
      "zh": "太棒了！这是字母 B 🐻"
    }
  },
  {
    "id": "k1-eng-e3",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "ตัวอักษรภาษาอังกฤษตัวนี้คือตัวอะไรเอ่ย? \"C\"",
      "en": "Which English letter is this? \"C\"",
      "zh": "这是哪个英文字母？“C”"
    },
    "illustration": "🐱 C 🚗",
    "illustrationSubtitle": {
      "th": "Letter C",
      "en": "Letter C",
      "zh": "字母 C"
    },
    "options": [
      {
        "id": "opt-k1-eng-e3-1",
        "label": {
          "th": "D (ดี)",
          "en": "D",
          "zh": "D"
        },
        "icon": "🐶"
      },
      {
        "id": "opt-k1-eng-e3-2",
        "label": {
          "th": "A (เอ)",
          "en": "A",
          "zh": "A"
        },
        "icon": "🍎"
      },
      {
        "id": "opt-k1-eng-e3-3",
        "label": {
          "th": "C (ซี)",
          "en": "C",
          "zh": "C"
        },
        "icon": "🐱"
      }
    ],
    "correctOptionId": "opt-k1-eng-e3-3",
    "explanation": {
      "th": "ยอดเยี่ยมมาก! C is for Cat เจ้าเหมียว 🐱",
      "en": "Awesome! C is for Cat 🐱",
      "zh": "很好！C 是小猫 Cat 🐱"
    }
  },
  {
    "id": "k1-eng-e4",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "สีแดง ในภาษาอังกฤษเรียกว่าอะไรจ๊ะ? 🔴",
      "en": "What color is red in English? 🔴",
      "zh": "红色用英语怎么说？🔴"
    },
    "illustration": "🔴 RED 🔴",
    "illustrationSubtitle": {
      "th": "Color Red",
      "en": "Color Red",
      "zh": "红色"
    },
    "options": [
      {
        "id": "opt-k1-eng-e4-1",
        "label": {
          "th": "RED (เรด)",
          "en": "RED",
          "zh": "RED (红色)"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k1-eng-e4-2",
        "label": {
          "th": "BLUE (บลู)",
          "en": "BLUE",
          "zh": "BLUE (蓝色)"
        },
        "icon": "🔵"
      },
      {
        "id": "opt-k1-eng-e4-3",
        "label": {
          "th": "GREEN (กรีน)",
          "en": "GREEN",
          "zh": "GREEN (绿色)"
        },
        "icon": "🟢"
      }
    ],
    "correctOptionId": "opt-k1-eng-e4-1",
    "explanation": {
      "th": "ถูกต้องจ้ะ! RED แปลว่าสีแดง 🔴",
      "en": "Correct! RED means red color 🔴",
      "zh": "答对了！RED 是红色 🔴"
    }
  },
  {
    "id": "k1-eng-e5",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "สีน้ำเงิน ในภาษาอังกฤษเรียกว่าอะไรเอ่ย? 🔵",
      "en": "What color is blue in English? 🔵",
      "zh": "蓝色用英语怎么说？🔵"
    },
    "illustration": "🔵 BLUE 🔵",
    "illustrationSubtitle": {
      "th": "Color Blue",
      "en": "Color Blue",
      "zh": "蓝色"
    },
    "options": [
      {
        "id": "opt-k1-eng-e5-1",
        "label": {
          "th": "YELLOW (เยลโล)",
          "en": "YELLOW",
          "zh": "YELLOW (黄色)"
        },
        "icon": "🟡"
      },
      {
        "id": "opt-k1-eng-e5-2",
        "label": {
          "th": "BLUE (บลู)",
          "en": "BLUE",
          "zh": "BLUE (蓝色)"
        },
        "icon": "🔵"
      },
      {
        "id": "opt-k1-eng-e5-3",
        "label": {
          "th": "RED (เรด)",
          "en": "RED",
          "zh": "RED (红色)"
        },
        "icon": "🔴"
      }
    ],
    "correctOptionId": "opt-k1-eng-e5-2",
    "explanation": {
      "th": "เก่งมากจ้า! BLUE คือสีน้ำเงินหรือสีฟ้า 🔵",
      "en": "Super! BLUE is the color blue 🔵",
      "zh": "真棒！BLUE 是蓝色 🔵"
    }
  },
  {
    "id": "k1-eng-e6",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "เจ้าตูบแสนรู้ \"สุนัข\" ภาษาอังกฤษคือคำว่าอะไร? 🐶",
      "en": "What is \"Dog\" in English? 🐶",
      "zh": "小狗用英语怎么说？🐶"
    },
    "illustration": "🐶 DOG 🐕",
    "illustrationSubtitle": {
      "th": "Puppy dog",
      "en": "Puppy dog",
      "zh": "小狗"
    },
    "options": [
      {
        "id": "opt-k1-eng-e6-1",
        "label": {
          "th": "CAT",
          "en": "CAT",
          "zh": "CAT (小猫)"
        },
        "icon": "🐱"
      },
      {
        "id": "opt-k1-eng-e6-2",
        "label": {
          "th": "BIRD",
          "en": "BIRD",
          "zh": "BIRD (小鸟)"
        },
        "icon": "🐦"
      },
      {
        "id": "opt-k1-eng-e6-3",
        "label": {
          "th": "DOG",
          "en": "DOG",
          "zh": "DOG (小狗)"
        },
        "icon": "🐶"
      }
    ],
    "correctOptionId": "opt-k1-eng-e6-3",
    "explanation": {
      "th": "ถูกต้องจ้า! DOG คือเจ้าตูบสุนัข 🐶",
      "en": "Spot on! DOG means puppy/dog 🐶",
      "zh": "答对了！DOG 是小狗 🐶"
    }
  },
  {
    "id": "k1-eng-e7",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "ตัวเลขภาษาอังกฤษ \"ONE\" ตรงกับจำนวนเท่าใด? ☝️",
      "en": "What number is \"ONE\"? ☝️",
      "zh": "“ONE”代表数字几？☝️"
    },
    "illustration": "☝️ ONE (1) ☝️",
    "illustrationSubtitle": {
      "th": "Number 1",
      "en": "Number 1",
      "zh": "数字 1"
    },
    "options": [
      {
        "id": "opt-k1-eng-e7-1",
        "label": {
          "th": "1 (หนึ่ง)",
          "en": "1 (One)",
          "zh": "1 (一)"
        },
        "icon": "1️⃣"
      },
      {
        "id": "opt-k1-eng-e7-2",
        "label": {
          "th": "2 (สอง)",
          "en": "2 (Two)",
          "zh": "2 (二)"
        },
        "icon": "2️⃣"
      },
      {
        "id": "opt-k1-eng-e7-3",
        "label": {
          "th": "3 (สาม)",
          "en": "3 (Three)",
          "zh": "3 (三)"
        },
        "icon": "3️⃣"
      }
    ],
    "correctOptionId": "opt-k1-eng-e7-1",
    "explanation": {
      "th": "ยอดเยี่ยมจ้า! ONE คือเลข 1 ☝️",
      "en": "Awesome! ONE is number 1 ☝️",
      "zh": "太棒了！ONE 是数字 1 ☝️"
    }
  },
  {
    "id": "k1-eng-e8",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "ตัวเลขภาษาอังกฤษ \"TWO\" ตรงกับจำนวนเท่าใด? ✌️",
      "en": "What number is \"TWO\"? ✌️",
      "zh": "“TWO”代表数字几？✌️"
    },
    "illustration": "✌️ TWO (2) ✌️",
    "illustrationSubtitle": {
      "th": "Number 2",
      "en": "Number 2",
      "zh": "数字 2"
    },
    "options": [
      {
        "id": "opt-k1-eng-e8-1",
        "label": {
          "th": "3 (สาม)",
          "en": "3 (Three)",
          "zh": "3 (三)"
        },
        "icon": "3️⃣"
      },
      {
        "id": "opt-k1-eng-e8-2",
        "label": {
          "th": "2 (สอง)",
          "en": "2 (Two)",
          "zh": "2 (二)"
        },
        "icon": "2️⃣"
      },
      {
        "id": "opt-k1-eng-e8-3",
        "label": {
          "th": "1 (หนึ่ง)",
          "en": "1 (One)",
          "zh": "1 (一)"
        },
        "icon": "1️⃣"
      }
    ],
    "correctOptionId": "opt-k1-eng-e8-2",
    "explanation": {
      "th": "ถูกต้องแล้วจ้ะ! TWO คือเลข 2 ✌️",
      "en": "That's right! TWO is number 2 ✌️",
      "zh": "答对了！TWO 是数字 2 ✌️"
    }
  },
  {
    "id": "k1-eng-e9",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำทักทายภาษาอังกฤษเมื่อพบกันคือคำว่าอะไรเอ่ย? 👋",
      "en": "Which word is a friendly English greeting? 👋",
      "zh": "见面打招呼用哪个英语单词？👋"
    },
    "illustration": "👋 HELLO! 👋",
    "illustrationSubtitle": {
      "th": "Friendly greeting",
      "en": "Friendly greeting",
      "zh": "问候"
    },
    "options": [
      {
        "id": "opt-k1-eng-e9-1",
        "label": {
          "th": "GOODBYE",
          "en": "GOODBYE",
          "zh": "GOODBYE (再见)"
        },
        "icon": "👋"
      },
      {
        "id": "opt-k1-eng-e9-2",
        "label": {
          "th": "SLEEP",
          "en": "SLEEP",
          "zh": "SLEEP (睡觉)"
        },
        "icon": "😴"
      },
      {
        "id": "opt-k1-eng-e9-3",
        "label": {
          "th": "HELLO",
          "en": "HELLO",
          "zh": "HELLO (你好)"
        },
        "icon": "👋"
      }
    ],
    "correctOptionId": "opt-k1-eng-e9-3",
    "explanation": {
      "th": "เก่งมากจ้า! HELLO แปลว่าสวัสดี 👋",
      "en": "Wonderful! HELLO means hi/greetings 👋",
      "zh": "太好了！HELLO 是你好的意思 👋"
    }
  },
  {
    "id": "k1-eng-e10",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "ผลไม้ \"แอปเปิ้ล\" ภาษาอังกฤษเรียกว่าอะไรเอ่ย? 🍎",
      "en": "What is an \"Apple\" in English? 🍎",
      "zh": "苹果用英语怎么说？🍎"
    },
    "illustration": "🍎 APPLE 🍏",
    "illustrationSubtitle": {
      "th": "Fresh apple",
      "en": "Fresh apple",
      "zh": "新鲜苹果"
    },
    "options": [
      {
        "id": "opt-k1-eng-e10-1",
        "label": {
          "th": "APPLE",
          "en": "APPLE",
          "zh": "APPLE (苹果)"
        },
        "icon": "🍎"
      },
      {
        "id": "opt-k1-eng-e10-2",
        "label": {
          "th": "BANANA",
          "en": "BANANA",
          "zh": "BANANA (香蕉)"
        },
        "icon": "🍌"
      },
      {
        "id": "opt-k1-eng-e10-3",
        "label": {
          "th": "ORANGE",
          "en": "ORANGE",
          "zh": "ORANGE (橙子)"
        },
        "icon": "🍊"
      }
    ],
    "correctOptionId": "opt-k1-eng-e10-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้ะ! APPLE คือแอปเปิ้ล 🍎",
      "en": "Brilliant! APPLE is apple 🍎",
      "zh": "真棒！APPLE 是苹果 🍎"
    }
  },
  {
    "id": "k1-eng-m1",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "ตัวอักษรภาษาอังกฤษตัวนี้คือตัวอะไร? \"D\"",
      "en": "Which English letter is this? \"D\"",
      "zh": "这是哪个英文字母？“D”"
    },
    "illustration": "🐶 D 🚪",
    "illustrationSubtitle": {
      "th": "Letter D",
      "en": "Letter D",
      "zh": "字母 D"
    },
    "options": [
      {
        "id": "opt-k1-eng-m1-1",
        "label": {
          "th": "B (บี)",
          "en": "B",
          "zh": "B"
        },
        "icon": "🐝"
      },
      {
        "id": "opt-k1-eng-m1-2",
        "label": {
          "th": "D (ดี)",
          "en": "D",
          "zh": "D"
        },
        "icon": "🐶"
      },
      {
        "id": "opt-k1-eng-m1-3",
        "label": {
          "th": "O (โอ)",
          "en": "O",
          "zh": "O"
        },
        "icon": "⭕"
      }
    ],
    "correctOptionId": "opt-k1-eng-m1-2",
    "explanation": {
      "th": "ถูกต้องจ้า! D is for Dog โฮ่งๆ 🐶",
      "en": "Great! D is for Dog 🐶",
      "zh": "真棒！D 是小狗 Dog 🐶"
    }
  },
  {
    "id": "k1-eng-m2",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "ตัวอักษรภาษาอังกฤษตัวนี้คือตัวอะไร? \"E\"",
      "en": "Which English letter is this? \"E\"",
      "zh": "这是哪个英文字母？“E”"
    },
    "illustration": "🐘 E 🥚",
    "illustrationSubtitle": {
      "th": "Letter E",
      "en": "Letter E",
      "zh": "字母 E"
    },
    "options": [
      {
        "id": "opt-k1-eng-m2-1",
        "label": {
          "th": "F (เอฟ)",
          "en": "F",
          "zh": "F"
        },
        "icon": "🐟"
      },
      {
        "id": "opt-k1-eng-m2-2",
        "label": {
          "th": "C (ซี)",
          "en": "C",
          "zh": "C"
        },
        "icon": "🐱"
      },
      {
        "id": "opt-k1-eng-m2-3",
        "label": {
          "th": "E (อี)",
          "en": "E",
          "zh": "E"
        },
        "icon": "🐘"
      }
    ],
    "correctOptionId": "opt-k1-eng-m2-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! E is for Elephant ช้างตัวใหญ่ 🐘",
      "en": "Spot on! E is for Elephant 🐘",
      "zh": "太棒了！E 代表大象 Elephant 🐘"
    }
  },
  {
    "id": "k1-eng-m3",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "ปลาว่ายน้ำดุ๊กดิ๊ก ภาษาอังกฤษคือคำว่าอะไรเอ่ย? 🐟",
      "en": "What is \"Fish\" in English? 🐟",
      "zh": "小鱼用英语怎么说？🐟"
    },
    "illustration": "🐟 FISH 🐠",
    "illustrationSubtitle": {
      "th": "Swimming fish",
      "en": "Swimming fish",
      "zh": "游动的小鱼"
    },
    "options": [
      {
        "id": "opt-k1-eng-m3-1",
        "label": {
          "th": "FISH",
          "en": "FISH",
          "zh": "FISH (鱼)"
        },
        "icon": "🐟"
      },
      {
        "id": "opt-k1-eng-m3-2",
        "label": {
          "th": "DUCK",
          "en": "DUCK",
          "zh": "DUCK (鸭子)"
        },
        "icon": "🦆"
      },
      {
        "id": "opt-k1-eng-m3-3",
        "label": {
          "th": "FROG",
          "en": "FROG",
          "zh": "FROG (青蛙)"
        },
        "icon": "🐸"
      }
    ],
    "correctOptionId": "opt-k1-eng-m3-1",
    "explanation": {
      "th": "ถูกต้องจ้า! FISH คือคุณปลา 🐟",
      "en": "Perfect! FISH is fish 🐟",
      "zh": "答对了！FISH 是鱼 🐟"
    }
  },
  {
    "id": "k1-eng-m4",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "ตัวเลขภาษาอังกฤษ \"THREE\" ตรงกับจำนวนเท่าใด? 3️⃣",
      "en": "What number is \"THREE\"? 3️⃣",
      "zh": "“THREE”代表数字几？3️⃣"
    },
    "illustration": "3️⃣ THREE (3) 3️⃣",
    "illustrationSubtitle": {
      "th": "Number 3",
      "en": "Number 3",
      "zh": "数字 3"
    },
    "options": [
      {
        "id": "opt-k1-eng-m4-1",
        "label": {
          "th": "1 (หนึ่ง)",
          "en": "1 (One)",
          "zh": "1 (一)"
        },
        "icon": "1️⃣"
      },
      {
        "id": "opt-k1-eng-m4-2",
        "label": {
          "th": "3 (สาม)",
          "en": "3 (Three)",
          "zh": "3 (三)"
        },
        "icon": "3️⃣"
      },
      {
        "id": "opt-k1-eng-m4-3",
        "label": {
          "th": "4 (สี่)",
          "en": "4 (Four)",
          "zh": "4 (四)"
        },
        "icon": "4️⃣"
      }
    ],
    "correctOptionId": "opt-k1-eng-m4-2",
    "explanation": {
      "th": "เก่งมากจ้า! THREE คือเลข 3 🤟",
      "en": "Correct! THREE is number 3 🤟",
      "zh": "太棒了！THREE 是数字 3 🤟"
    }
  },
  {
    "id": "k1-eng-m5",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "สีเหลืองสดใส ภาษาอังกฤษเรียกว่าสีอะไรเอ่ย? 🟡",
      "en": "What color is yellow in English? 🟡",
      "zh": "黄色用英语怎么说？🟡"
    },
    "illustration": "🟡 YELLOW 🍌",
    "illustrationSubtitle": {
      "th": "Bright Yellow",
      "en": "Bright Yellow",
      "zh": "明亮的黄色"
    },
    "options": [
      {
        "id": "opt-k1-eng-m5-1",
        "label": {
          "th": "GREEN",
          "en": "GREEN",
          "zh": "GREEN (绿色)"
        },
        "icon": "🟢"
      },
      {
        "id": "opt-k1-eng-m5-2",
        "label": {
          "th": "RED",
          "en": "RED",
          "zh": "RED (红色)"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k1-eng-m5-3",
        "label": {
          "th": "YELLOW",
          "en": "YELLOW",
          "zh": "YELLOW (黄色)"
        },
        "icon": "🟡"
      }
    ],
    "correctOptionId": "opt-k1-eng-m5-3",
    "explanation": {
      "th": "ถูกต้องจ้ะ! YELLOW คือสีเหลือง 🟡",
      "en": "Awesome! YELLOW is yellow 🟡",
      "zh": "真聪明！YELLOW 是黄色 🟡"
    }
  },
  {
    "id": "k1-eng-m6",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "หนังสือสำหรับเปิดอ่าน ภาษาอังกฤษคือคำว่าอะไร? 📚",
      "en": "What is \"Book\" in English? 📚",
      "zh": "书本用英语怎么说？📚"
    },
    "illustration": "📚 BOOK 📖",
    "illustrationSubtitle": {
      "th": "Reading book",
      "en": "Reading book",
      "zh": "课本"
    },
    "options": [
      {
        "id": "opt-k1-eng-m6-1",
        "label": {
          "th": "BOOK",
          "en": "BOOK",
          "zh": "BOOK (书)"
        },
        "icon": "📚"
      },
      {
        "id": "opt-k1-eng-m6-2",
        "label": {
          "th": "PEN",
          "en": "PEN",
          "zh": "PEN (笔)"
        },
        "icon": "🖊️"
      },
      {
        "id": "opt-k1-eng-m6-3",
        "label": {
          "th": "CAR",
          "en": "CAR",
          "zh": "CAR (汽车)"
        },
        "icon": "🚗"
      }
    ],
    "correctOptionId": "opt-k1-eng-m6-1",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! BOOK คือหนังสือ 📚",
      "en": "Super! BOOK is book 📚",
      "zh": "答对了！BOOK 是书本 📚"
    }
  },
  {
    "id": "k1-eng-m7",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "ดวงอาทิตย์ส่องแสง ภาษาอังกฤษคือคำว่าอะไรเอ่ย? ☀️",
      "en": "What is the \"Sun\" in English? ☀️",
      "zh": "太阳用英语怎么说？☀️"
    },
    "illustration": "☀️ SUN ☀️",
    "illustrationSubtitle": {
      "th": "Bright Sun",
      "en": "Bright Sun",
      "zh": "太阳"
    },
    "options": [
      {
        "id": "opt-k1-eng-m7-1",
        "label": {
          "th": "MOON",
          "en": "MOON",
          "zh": "MOON (月亮)"
        },
        "icon": "🌙"
      },
      {
        "id": "opt-k1-eng-m7-2",
        "label": {
          "th": "SUN",
          "en": "SUN",
          "zh": "SUN (太阳)"
        },
        "icon": "☀️"
      },
      {
        "id": "opt-k1-eng-m7-3",
        "label": {
          "th": "STAR",
          "en": "STAR",
          "zh": "STAR (星星)"
        },
        "icon": "⭐"
      }
    ],
    "correctOptionId": "opt-k1-eng-m7-2",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! SUN คือดวงอาทิตย์ ☀️",
      "en": "Brilliant! SUN is sun ☀️",
      "zh": "太棒了！SUN 是太阳 ☀️"
    }
  },
  {
    "id": "k1-eng-m8",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "แมวน้อยร้องเหมียวๆ ภาษาอังกฤษคือคำว่าอะไร? 🐱",
      "en": "Which animal says meow in English? 🐱",
      "zh": "小猫用英语怎么说？🐱"
    },
    "illustration": "🐱 CAT 🐾",
    "illustrationSubtitle": {
      "th": "Little kitten",
      "en": "Little kitten",
      "zh": "小猫"
    },
    "options": [
      {
        "id": "opt-k1-eng-m8-1",
        "label": {
          "th": "DOG",
          "en": "DOG",
          "zh": "DOG (小狗)"
        },
        "icon": "🐶"
      },
      {
        "id": "opt-k1-eng-m8-2",
        "label": {
          "th": "BIRD",
          "en": "BIRD",
          "zh": "BIRD (小鸟)"
        },
        "icon": "🐦"
      },
      {
        "id": "opt-k1-eng-m8-3",
        "label": {
          "th": "CAT",
          "en": "CAT",
          "zh": "CAT (小猫)"
        },
        "icon": "🐱"
      }
    ],
    "correctOptionId": "opt-k1-eng-m8-3",
    "explanation": {
      "th": "ถูกต้องจ้า! CAT คือแมวน้อย 🐱",
      "en": "Great job! CAT is cat 🐱",
      "zh": "完全正确！CAT 是小猫 🐱"
    }
  },
  {
    "id": "k1-eng-m9",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "ตัวเลขภาษาอังกฤษ \"FOUR\" ตรงกับจำนวนเท่าใด? 4️⃣",
      "en": "What number is \"FOUR\"? 4️⃣",
      "zh": "“FOUR”代表数字几？4️⃣"
    },
    "illustration": "4️⃣ FOUR (4) 4️⃣",
    "illustrationSubtitle": {
      "th": "Number 4",
      "en": "Number 4",
      "zh": "数字 4"
    },
    "options": [
      {
        "id": "opt-k1-eng-m9-1",
        "label": {
          "th": "4 (สี่)",
          "en": "4 (Four)",
          "zh": "4 (四)"
        },
        "icon": "4️⃣"
      },
      {
        "id": "opt-k1-eng-m9-2",
        "label": {
          "th": "2 (สอง)",
          "en": "2 (Two)",
          "zh": "2 (二)"
        },
        "icon": "2️⃣"
      },
      {
        "id": "opt-k1-eng-m9-3",
        "label": {
          "th": "5 (ห้า)",
          "en": "5 (Five)",
          "zh": "5 (五)"
        },
        "icon": "5️⃣"
      }
    ],
    "correctOptionId": "opt-k1-eng-m9-1",
    "explanation": {
      "th": "เก่งมากจ้า! FOUR คือเลข 4 🍀",
      "en": "That's it! FOUR is number 4 🍀",
      "zh": "答对了！FOUR 是数字 4 🍀"
    }
  },
  {
    "id": "k1-eng-m10",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "สีเขียวใบไม้ ภาษาอังกฤษเรียกว่าสีอะไรเอ่ย? 🟢",
      "en": "What color is green in English? 🟢",
      "zh": "绿色用英语怎么说？🟢"
    },
    "illustration": "🟢 GREEN 🍃",
    "illustrationSubtitle": {
      "th": "Fresh Green",
      "en": "Fresh Green",
      "zh": "绿色"
    },
    "options": [
      {
        "id": "opt-k1-eng-m10-1",
        "label": {
          "th": "BLUE",
          "en": "BLUE",
          "zh": "BLUE (蓝色)"
        },
        "icon": "🔵"
      },
      {
        "id": "opt-k1-eng-m10-2",
        "label": {
          "th": "GREEN",
          "en": "GREEN",
          "zh": "GREEN (绿色)"
        },
        "icon": "🟢"
      },
      {
        "id": "opt-k1-eng-m10-3",
        "label": {
          "th": "RED",
          "en": "RED",
          "zh": "RED (红色)"
        },
        "icon": "🔴"
      }
    ],
    "correctOptionId": "opt-k1-eng-m10-2",
    "explanation": {
      "th": "ถูกต้องจ้า! GREEN คือสีเขียว 🟢",
      "en": "Well done! GREEN is green 🟢",
      "zh": "真棒！GREEN 是绿色 🟢"
    }
  },
  {
    "id": "k1-eng-h1",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "ตัวพิมพ์ใหญ่ \"A\" ตรงกับตัวพิมพ์เล็กตัวใดเอ่ย? 🔤",
      "en": "Which lowercase letter matches uppercase \"A\"? 🔤",
      "zh": "大写“A”对应哪个小写字母？🔤"
    },
    "illustration": "A ➡️ ? 🍎",
    "illustrationSubtitle": {
      "th": "Uppercase to Lowercase",
      "en": "Uppercase to Lowercase",
      "zh": "大小写配对"
    },
    "options": [
      {
        "id": "opt-k1-eng-h1-1",
        "label": {
          "th": "b",
          "en": "b",
          "zh": "b"
        },
        "icon": "🐝"
      },
      {
        "id": "opt-k1-eng-h1-2",
        "label": {
          "th": "d",
          "en": "d",
          "zh": "d"
        },
        "icon": "🐶"
      },
      {
        "id": "opt-k1-eng-h1-3",
        "label": {
          "th": "a",
          "en": "a",
          "zh": "a"
        },
        "icon": "🍎"
      }
    ],
    "correctOptionId": "opt-k1-eng-h1-3",
    "explanation": {
      "th": "เก่งมากจ้า! A ตัวใหญ่คู่กับ a ตัวเล็ก (A-a) 🍎",
      "en": "Awesome! Uppercase A matches lowercase a (A-a) 🍎",
      "zh": "太棒了！大写 A 对应小写 a (A-a) 🍎"
    }
  },
  {
    "id": "k1-eng-h2",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "ตัวพิมพ์ใหญ่ \"B\" ตรงกับตัวพิมพ์เล็กตัวใดเอ่ย? 🐻",
      "en": "Which lowercase letter matches uppercase \"B\"? 🐻",
      "zh": "大写“B”对应哪个小写字母？🐻"
    },
    "illustration": "B ➡️ ? 🐻",
    "illustrationSubtitle": {
      "th": "Uppercase to Lowercase",
      "en": "Uppercase to Lowercase",
      "zh": "大小写配对"
    },
    "options": [
      {
        "id": "opt-k1-eng-h2-1",
        "label": {
          "th": "b",
          "en": "b",
          "zh": "b"
        },
        "icon": "🐻"
      },
      {
        "id": "opt-k1-eng-h2-2",
        "label": {
          "th": "d",
          "en": "d",
          "zh": "d"
        },
        "icon": "🐶"
      },
      {
        "id": "opt-k1-eng-h2-3",
        "label": {
          "th": "p",
          "en": "p",
          "zh": "p"
        },
        "icon": "🅿️"
      }
    ],
    "correctOptionId": "opt-k1-eng-h2-1",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! B ตัวใหญ่คู่กับ b ตัวเล็ก (B-b) 🐻",
      "en": "Spot on! Uppercase B matches lowercase b (B-b) 🐻",
      "zh": "真聪明！大写 B 对应小写 b (B-b) 🐻"
    }
  },
  {
    "id": "k1-eng-h3",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "เสียงโฟนิกส์ /b/ ออกเสียงนำหน้าคำศัพท์ใด? 🐻",
      "en": "Which word starts with the phonics sound /b/? 🐻",
      "zh": "哪个单词以发音 /b/ 开头？🐻"
    },
    "illustration": "🔊 /b/ ... ? 🐻",
    "illustrationSubtitle": {
      "th": "Phonics initial sound",
      "en": "Phonics initial sound",
      "zh": "首音发音"
    },
    "options": [
      {
        "id": "opt-k1-eng-h3-1",
        "label": {
          "th": "Apple",
          "en": "Apple",
          "zh": "Apple (苹果)"
        },
        "icon": "🍎"
      },
      {
        "id": "opt-k1-eng-h3-2",
        "label": {
          "th": "Bear",
          "en": "Bear",
          "zh": "Bear (熊)"
        },
        "icon": "🐻"
      },
      {
        "id": "opt-k1-eng-h3-3",
        "label": {
          "th": "Cat",
          "en": "Cat",
          "zh": "Cat (猫)"
        },
        "icon": "🐱"
      }
    ],
    "correctOptionId": "opt-k1-eng-h3-2",
    "explanation": {
      "th": "ถูกต้องจ้ะ! /b/ Bear เจ้าหมีตัวใหญ่ 🐻",
      "en": "Correct! /b/ Bear begins with sound /b/ 🐻",
      "zh": "答对了！Bear 以发音 /b/ 开头 🐻"
    }
  },
  {
    "id": "k1-eng-h4",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "ตัวเลขภาษาอังกฤษ \"FIVE\" ตรงกับนิ้วมือกี่นิ้วเอ่ย? 🖐️",
      "en": "How many fingers is \"FIVE\"? 🖐️",
      "zh": "“FIVE”代表多少只手指？🖐️"
    },
    "illustration": "🖐️ FIVE (5) 🖐️",
    "illustrationSubtitle": {
      "th": "Number 5",
      "en": "Number 5",
      "zh": "数字 5"
    },
    "options": [
      {
        "id": "opt-k1-eng-h4-1",
        "label": {
          "th": "3 นิ้ว",
          "en": "3 fingers",
          "zh": "3 根手指"
        },
        "icon": "3️⃣"
      },
      {
        "id": "opt-k1-eng-h4-2",
        "label": {
          "th": "4 นิ้ว",
          "en": "4 fingers",
          "zh": "4 根手指"
        },
        "icon": "4️⃣"
      },
      {
        "id": "opt-k1-eng-h4-3",
        "label": {
          "th": "5 นิ้ว",
          "en": "5 fingers",
          "zh": "5 根手指"
        },
        "icon": "🖐️"
      }
    ],
    "correctOptionId": "opt-k1-eng-h4-3",
    "explanation": {
      "th": "เก่งมากจ้า! FIVE คือ 5 นิ้วเต็มมือพอดี 🖐️",
      "en": "Brilliant! FIVE is 5 fingers 🖐️",
      "zh": "太棒了！FIVE 是 5 根手指 🖐️"
    }
  },
  {
    "id": "k1-eng-h5",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "เมื่อมีคนให้ขนม เราควรพูดขอบคุณภาษาอังกฤษว่าอย่างไร? 🎁",
      "en": "How do you say thank you in English? 🎁",
      "zh": "收到礼物时，英语怎么说谢谢？🎁"
    },
    "illustration": "🎁 Thank you! 🙏",
    "illustrationSubtitle": {
      "th": "Polite words",
      "en": "Polite words",
      "zh": "礼貌用语"
    },
    "options": [
      {
        "id": "opt-k1-eng-h5-1",
        "label": {
          "th": "Thank you!",
          "en": "Thank you!",
          "zh": "Thank you! (谢谢)"
        },
        "icon": "🙏"
      },
      {
        "id": "opt-k1-eng-h5-2",
        "label": {
          "th": "Goodbye!",
          "en": "Goodbye!",
          "zh": "Goodbye! (再见)"
        },
        "icon": "👋"
      },
      {
        "id": "opt-k1-eng-h5-3",
        "label": {
          "th": "No!",
          "en": "No!",
          "zh": "No! (不要)"
        },
        "icon": "🙅"
      }
    ],
    "correctOptionId": "opt-k1-eng-h5-1",
    "explanation": {
      "th": "ยอดเยี่ยมมากจ้า! Thank you แปลว่า ขอบคุณครับ/ค่ะ 🙏",
      "en": "Well done! Thank you shows gratitude 🙏",
      "zh": "完全正确！Thank you 是谢谢的意思 🙏"
    }
  },
  {
    "id": "k1-eng-h6",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "สัตว์ที่ร้อง จิ๊บๆ \"นก\" ภาษาอังกฤษคือคำว่าอะไร? 🐦",
      "en": "Which animal is \"Bird\" in English? 🐦",
      "zh": "小鸟用英语怎么说？🐦"
    },
    "illustration": "🐦 BIRD 🌳",
    "illustrationSubtitle": {
      "th": "Singing bird",
      "en": "Singing bird",
      "zh": "小鸟"
    },
    "options": [
      {
        "id": "opt-k1-eng-h6-1",
        "label": {
          "th": "FISH",
          "en": "FISH",
          "zh": "FISH (鱼)"
        },
        "icon": "🐟"
      },
      {
        "id": "opt-k1-eng-h6-2",
        "label": {
          "th": "BIRD",
          "en": "BIRD",
          "zh": "BIRD (小鸟)"
        },
        "icon": "🐦"
      },
      {
        "id": "opt-k1-eng-h6-3",
        "label": {
          "th": "LION",
          "en": "LION",
          "zh": "LION (狮子)"
        },
        "icon": "🦁"
      }
    ],
    "correctOptionId": "opt-k1-eng-h6-2",
    "explanation": {
      "th": "ถูกต้องจ้ะ! BIRD คือคุณนกบินบนฟ้า 🐦",
      "en": "Spot on! BIRD is bird 🐦",
      "zh": "真聪明！BIRD 是小鸟 🐦"
    }
  },
  {
    "id": "k1-eng-h7",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "ลูกบอลกลมๆ สำหรับเล่นกีฬา ภาษาอังกฤษเรียกว่าอะไร? ⚽",
      "en": "What is a \"Ball\" in English? ⚽",
      "zh": "球用英语怎么说？⚽"
    },
    "illustration": "⚽ BALL 🏀",
    "illustrationSubtitle": {
      "th": "Round ball",
      "en": "Round ball",
      "zh": "皮球"
    },
    "options": [
      {
        "id": "opt-k1-eng-h7-1",
        "label": {
          "th": "CAR",
          "en": "CAR",
          "zh": "CAR (汽车)"
        },
        "icon": "🚗"
      },
      {
        "id": "opt-k1-eng-h7-2",
        "label": {
          "th": "CUP",
          "en": "CUP",
          "zh": "CUP (杯子)"
        },
        "icon": "🥛"
      },
      {
        "id": "opt-k1-eng-h7-3",
        "label": {
          "th": "BALL",
          "en": "BALL",
          "zh": "BALL (球)"
        },
        "icon": "⚽"
      }
    ],
    "correctOptionId": "opt-k1-eng-h7-3",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! BALL คือลูกบอลกลมๆ ⚽",
      "en": "Great job! BALL is ball ⚽",
      "zh": "答对了！BALL 是皮球 ⚽"
    }
  },
  {
    "id": "k1-eng-h8",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"BIG\" ในภาษาอังกฤษ มีความหมายว่าอย่างไรเอ่ย? 🐘",
      "en": "What does \"BIG\" mean? 🐘",
      "zh": "“BIG”是什么意思？🐘"
    },
    "illustration": "🐘 BIG vs 🐭 small",
    "illustrationSubtitle": {
      "th": "Size comparison",
      "en": "Size comparison",
      "zh": "大小对比"
    },
    "options": [
      {
        "id": "opt-k1-eng-h8-1",
        "label": {
          "th": "ตัวใหญ่",
          "en": "Big / Large",
          "zh": "大"
        },
        "icon": "🐘"
      },
      {
        "id": "opt-k1-eng-h8-2",
        "label": {
          "th": "ตัวเล็ก",
          "en": "Small / Tiny",
          "zh": "小"
        },
        "icon": "🐭"
      },
      {
        "id": "opt-k1-eng-h8-3",
        "label": {
          "th": "สีแดง",
          "en": "Red",
          "zh": "红色"
        },
        "icon": "🔴"
      }
    ],
    "correctOptionId": "opt-k1-eng-h8-1",
    "explanation": {
      "th": "ถูกต้องจ้ะ! BIG แปลว่าตัวใหญ่ เช่น ช้างตัวใหญ่ 🐘",
      "en": "That's right! BIG means large size 🐘",
      "zh": "真棒！BIG 是大的意思 🐘"
    }
  },
  {
    "id": "k1-eng-h9",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"SMALL\" ในภาษาอังกฤษ มีความหมายว่าอย่างไรเอ่ย? 🐭",
      "en": "What does \"SMALL\" mean? 🐭",
      "zh": "“SMALL”是什么意思？🐭"
    },
    "illustration": "🐭 SMALL 🧀",
    "illustrationSubtitle": {
      "th": "Small mouse",
      "en": "Small mouse",
      "zh": "小老鼠"
    },
    "options": [
      {
        "id": "opt-k1-eng-h9-1",
        "label": {
          "th": "ตัวโต",
          "en": "Big",
          "zh": "大"
        },
        "icon": "🐘"
      },
      {
        "id": "opt-k1-eng-h9-2",
        "label": {
          "th": "ตัวเล็ก",
          "en": "Small",
          "zh": "小"
        },
        "icon": "🐭"
      },
      {
        "id": "opt-k1-eng-h9-3",
        "label": {
          "th": "วิ่งเร็ว",
          "en": "Fast",
          "zh": "快"
        },
        "icon": "⚡"
      }
    ],
    "correctOptionId": "opt-k1-eng-h9-2",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! SMALL แปลว่าตัวเล็ก เช่น หนูน้อยตัวเล็ก 🐭",
      "en": "Correct! SMALL means little in size 🐭",
      "zh": "答对了！SMALL 是小的意思 🐭"
    }
  },
  {
    "id": "k1-eng-h10",
    "grade": "K1",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำกล่าวทักทาย \"อรุณสวัสดิ์ตอนเช้า\" ภาษาอังกฤษคือข้อใด? 🌅",
      "en": "How do you say good morning in English? 🌅",
      "zh": "早上问好用哪句英语？🌅"
    },
    "illustration": "🌅 Morning greeting ☀️",
    "illustrationSubtitle": {
      "th": "Good Morning",
      "en": "Good Morning",
      "zh": "早上好"
    },
    "options": [
      {
        "id": "opt-k1-eng-h10-1",
        "label": {
          "th": "Good Night",
          "en": "Good Night",
          "zh": "Good Night (晚安)"
        },
        "icon": "🌙"
      },
      {
        "id": "opt-k1-eng-h10-2",
        "label": {
          "th": "Goodbye",
          "en": "Goodbye",
          "zh": "Goodbye (再见)"
        },
        "icon": "👋"
      },
      {
        "id": "opt-k1-eng-h10-3",
        "label": {
          "th": "Good Morning",
          "en": "Good Morning",
          "zh": "Good Morning (早上好)"
        },
        "icon": "🌅"
      }
    ],
    "correctOptionId": "opt-k1-eng-h10-3",
    "explanation": {
      "th": "เก่งมากจ้า! Good Morning แปลว่า สวัสดีตอนเช้า 🌅",
      "en": "Super! Good Morning is the morning greeting 🌅",
      "zh": "太棒了！Good Morning 是早上好 🌅"
    }
  },
  {
    "id": "k2-eng-e1",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "อวัยวะ \"ดวงตา\" สำหรับมองดู ภาษาอังกฤษคือคำว่าอะไร? 👀",
      "en": "Which word means \"Eyes\"? 👀",
      "zh": "眼睛用英语怎么说？👀"
    },
    "illustration": "👀 EYES 👁️",
    "illustrationSubtitle": {
      "th": "Seeing eyes",
      "en": "Seeing eyes",
      "zh": "眼睛"
    },
    "options": [
      {
        "id": "opt-k2-eng-e1-1",
        "label": {
          "th": "EYES",
          "en": "EYES",
          "zh": "EYES (眼睛)"
        },
        "icon": "👀"
      },
      {
        "id": "opt-k2-eng-e1-2",
        "label": {
          "th": "NOSE",
          "en": "NOSE",
          "zh": "NOSE (鼻子)"
        },
        "icon": "👃"
      },
      {
        "id": "opt-k2-eng-e1-3",
        "label": {
          "th": "EARS",
          "en": "EARS",
          "zh": "EARS (耳朵)"
        },
        "icon": "👂"
      }
    ],
    "correctOptionId": "opt-k2-eng-e1-1",
    "explanation": {
      "th": "ถูกต้องจ้า! EYES คือดวงตาสำหรับมองดู 👀",
      "en": "Spot on! EYES are for seeing 👀",
      "zh": "答对了！EYES 是眼睛 👀"
    }
  },
  {
    "id": "k2-eng-e2",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "อวัยวะ \"จมูก\" สำหรับดมกลิ่น ภาษาอังกฤษคือคำว่าอะไร? 👃",
      "en": "Which word means \"Nose\"? 👃",
      "zh": "鼻子用英语怎么说？👃"
    },
    "illustration": "👃 NOSE 🌸",
    "illustrationSubtitle": {
      "th": "Smelling nose",
      "en": "Smelling nose",
      "zh": "鼻子"
    },
    "options": [
      {
        "id": "opt-k2-eng-e2-1",
        "label": {
          "th": "MOUTH",
          "en": "MOUTH",
          "zh": "MOUTH (嘴巴)"
        },
        "icon": "👄"
      },
      {
        "id": "opt-k2-eng-e2-2",
        "label": {
          "th": "NOSE",
          "en": "NOSE",
          "zh": "NOSE (鼻子)"
        },
        "icon": "👃"
      },
      {
        "id": "opt-k2-eng-e2-3",
        "label": {
          "th": "HAND",
          "en": "HAND",
          "zh": "HAND (手)"
        },
        "icon": "✋"
      }
    ],
    "correctOptionId": "opt-k2-eng-e2-2",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! NOSE คือจมูกสำหรับดมกลิ่น 👃",
      "en": "Great! NOSE is for smelling 👃",
      "zh": "太棒了！NOSE 是鼻子 👃"
    }
  },
  {
    "id": "k2-eng-e3",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "อวัยวะ \"มือ\" สองข้างของเรา ภาษาอังกฤษคือคำว่าอะไร? ✋",
      "en": "What is \"Hand\" in English? ✋",
      "zh": "手用英语怎么说？✋"
    },
    "illustration": "✋ HAND 🖐️",
    "illustrationSubtitle": {
      "th": "Hand and fingers",
      "en": "Hand and fingers",
      "zh": "手掌"
    },
    "options": [
      {
        "id": "opt-k2-eng-e3-1",
        "label": {
          "th": "FOOT",
          "en": "FOOT",
          "zh": "FOOT (脚)"
        },
        "icon": "🦶"
      },
      {
        "id": "opt-k2-eng-e3-2",
        "label": {
          "th": "HEAD",
          "en": "HEAD",
          "zh": "HEAD (头)"
        },
        "icon": "🧒"
      },
      {
        "id": "opt-k2-eng-e3-3",
        "label": {
          "th": "HAND",
          "en": "HAND",
          "zh": "HAND (手)"
        },
        "icon": "✋"
      }
    ],
    "correctOptionId": "opt-k2-eng-e3-3",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! HAND คือมือแสนขยัน ✋",
      "en": "Correct! HAND is hand ✋",
      "zh": "真聪明！HAND 是手 ✋"
    }
  },
  {
    "id": "k2-eng-e4",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "ตัวเลขภาษาอังกฤษ \"SIX\" ตรงกับจำนวนเท่าใด? 6️⃣",
      "en": "What number is \"SIX\"? 6️⃣",
      "zh": "“SIX”代表数字几？6️⃣"
    },
    "illustration": "6️⃣ SIX (6) 6️⃣",
    "illustrationSubtitle": {
      "th": "Number 6",
      "en": "Number 6",
      "zh": "数字 6"
    },
    "options": [
      {
        "id": "opt-k2-eng-e4-1",
        "label": {
          "th": "6 (หก)",
          "en": "6 (Six)",
          "zh": "6 (六)"
        },
        "icon": "6️⃣"
      },
      {
        "id": "opt-k2-eng-e4-2",
        "label": {
          "th": "7 (เจ็ด)",
          "en": "7 (Seven)",
          "zh": "7 (七)"
        },
        "icon": "7️⃣"
      },
      {
        "id": "opt-k2-eng-e4-3",
        "label": {
          "th": "8 (แปด)",
          "en": "8 (Eight)",
          "zh": "8 (八)"
        },
        "icon": "8️⃣"
      }
    ],
    "correctOptionId": "opt-k2-eng-e4-1",
    "explanation": {
      "th": "เก่งมากจ้า! SIX คือเลข 6 🎲",
      "en": "Awesome! SIX is number 6 🎲",
      "zh": "答对了！SIX 是数字 6 🎲"
    }
  },
  {
    "id": "k2-eng-e5",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "ตัวเลขภาษาอังกฤษ \"SEVEN\" ตรงกับจำนวนเท่าใด? 7️⃣",
      "en": "What number is \"SEVEN\"? 7️⃣",
      "zh": "“SEVEN”代表数字几？7️⃣"
    },
    "illustration": "7️⃣ SEVEN (7) 7️⃣",
    "illustrationSubtitle": {
      "th": "Number 7",
      "en": "Number 7",
      "zh": "数字 7"
    },
    "options": [
      {
        "id": "opt-k2-eng-e5-1",
        "label": {
          "th": "5 (ห้า)",
          "en": "5 (Five)",
          "zh": "5 (五)"
        },
        "icon": "5️⃣"
      },
      {
        "id": "opt-k2-eng-e5-2",
        "label": {
          "th": "7 (เจ็ด)",
          "en": "7 (Seven)",
          "zh": "7 (七)"
        },
        "icon": "7️⃣"
      },
      {
        "id": "opt-k2-eng-e5-3",
        "label": {
          "th": "9 (เก้า)",
          "en": "9 (Nine)",
          "zh": "9 (九)"
        },
        "icon": "9️⃣"
      }
    ],
    "correctOptionId": "opt-k2-eng-e5-2",
    "explanation": {
      "th": "ถูกต้องแล้วจ้ะ! SEVEN คือเลข 7 🌈",
      "en": "That's it! SEVEN is number 7 🌈",
      "zh": "真棒！SEVEN 是数字 7 🌈"
    }
  },
  {
    "id": "k2-eng-e6",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "สีส้มผลส้มสดใส ภาษาอังกฤษเรียกว่าสีอะไรเอ่ย? 🍊",
      "en": "What color is orange in English? 🍊",
      "zh": "橙色用英语怎么说？🍊"
    },
    "illustration": "🍊 ORANGE 🧡",
    "illustrationSubtitle": {
      "th": "Bright Orange",
      "en": "Bright Orange",
      "zh": "橙色"
    },
    "options": [
      {
        "id": "opt-k2-eng-e6-1",
        "label": {
          "th": "PINK",
          "en": "PINK",
          "zh": "PINK (粉红)"
        },
        "icon": "🌸"
      },
      {
        "id": "opt-k2-eng-e6-2",
        "label": {
          "th": "PURPLE",
          "en": "PURPLE",
          "zh": "PURPLE (紫色)"
        },
        "icon": "🍇"
      },
      {
        "id": "opt-k2-eng-e6-3",
        "label": {
          "th": "ORANGE",
          "en": "ORANGE",
          "zh": "ORANGE (橙色)"
        },
        "icon": "🍊"
      }
    ],
    "correctOptionId": "opt-k2-eng-e6-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ORANGE คือสีส้ม 🍊",
      "en": "Super! ORANGE is orange 🍊",
      "zh": "答对了！ORANGE 是橙色 🍊"
    }
  },
  {
    "id": "k2-eng-e7",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "สีชมพูดอกไม้แสนสวย ภาษาอังกฤษเรียกว่าสีอะไรเอ่ย? 🌸",
      "en": "What color is pink in English? 🌸",
      "zh": "粉红色用英语怎么说？🌸"
    },
    "illustration": "🌸 PINK 💖",
    "illustrationSubtitle": {
      "th": "Pretty Pink",
      "en": "Pretty Pink",
      "zh": "粉色"
    },
    "options": [
      {
        "id": "opt-k2-eng-e7-1",
        "label": {
          "th": "PINK",
          "en": "PINK",
          "zh": "PINK (粉红)"
        },
        "icon": "🌸"
      },
      {
        "id": "opt-k2-eng-e7-2",
        "label": {
          "th": "BLACK",
          "en": "BLACK",
          "zh": "BLACK (黑色)"
        },
        "icon": "🖤"
      },
      {
        "id": "opt-k2-eng-e7-3",
        "label": {
          "th": "WHITE",
          "en": "WHITE",
          "zh": "WHITE (白色)"
        },
        "icon": "🤍"
      }
    ],
    "correctOptionId": "opt-k2-eng-e7-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! PINK คือสีชมพูหวานแหวว 🌸",
      "en": "Brilliant! PINK is pink 🌸",
      "zh": "真棒！PINK 是粉红色 🌸"
    }
  },
  {
    "id": "k2-eng-e8",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คุณครูผู้ใจดีในโรงเรียน ภาษาอังกฤษคือคำว่าอะไรเอ่ย? 👩‍🏫",
      "en": "What is \"Teacher\" in English? 👩‍🏫",
      "zh": "老师用英语怎么说？👩‍🏫"
    },
    "illustration": "👩‍🏫 TEACHER 🏫",
    "illustrationSubtitle": {
      "th": "Kind teacher",
      "en": "Kind teacher",
      "zh": "老师"
    },
    "options": [
      {
        "id": "opt-k2-eng-e8-1",
        "label": {
          "th": "STUDENT",
          "en": "STUDENT",
          "zh": "STUDENT (学生)"
        },
        "icon": "🧒"
      },
      {
        "id": "opt-k2-eng-e8-2",
        "label": {
          "th": "TEACHER",
          "en": "TEACHER",
          "zh": "TEACHER (老师)"
        },
        "icon": "👩‍🏫"
      },
      {
        "id": "opt-k2-eng-e8-3",
        "label": {
          "th": "DOCTOR",
          "en": "DOCTOR",
          "zh": "DOCTOR (医生)"
        },
        "icon": "🩺"
      }
    ],
    "correctOptionId": "opt-k2-eng-e8-2",
    "explanation": {
      "th": "เก่งมากจ้า! TEACHER คือคุณครู 👩‍🏫",
      "en": "Spot on! TEACHER is teacher 👩‍🏫",
      "zh": "答对了！TEACHER 是老师 👩‍🏫"
    }
  },
  {
    "id": "k2-eng-e9",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "โรงเรียนแสนสุขของเรา ภาษาอังกฤษเรียกว่าอะไร? 🏫",
      "en": "What is \"School\" in English? 🏫",
      "zh": "学校用英语怎么说？🏫"
    },
    "illustration": "🏫 SCHOOL 🎒",
    "illustrationSubtitle": {
      "th": "Happy school",
      "en": "Happy school",
      "zh": "学校"
    },
    "options": [
      {
        "id": "opt-k2-eng-e9-1",
        "label": {
          "th": "PARK",
          "en": "PARK",
          "zh": "PARK (公园)"
        },
        "icon": "🌳"
      },
      {
        "id": "opt-k2-eng-e9-2",
        "label": {
          "th": "HOSPITAL",
          "en": "HOSPITAL",
          "zh": "HOSPITAL (医院)"
        },
        "icon": "🏥"
      },
      {
        "id": "opt-k2-eng-e9-3",
        "label": {
          "th": "SCHOOL",
          "en": "SCHOOL",
          "zh": "SCHOOL (学校)"
        },
        "icon": "🏫"
      }
    ],
    "correctOptionId": "opt-k2-eng-e9-3",
    "explanation": {
      "th": "ถูกต้องจ้ะ! SCHOOL คือโรงเรียน 🏫",
      "en": "Perfect! SCHOOL is school 🏫",
      "zh": "太好了！SCHOOL 是学校 🏫"
    }
  },
  {
    "id": "k2-eng-e10",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "ดินสอสำหรับขีดเขียน ภาษาอังกฤษคือคำว่าอะไร? ✏️",
      "en": "What is a \"Pencil\" in English? ✏️",
      "zh": "铅笔用英语怎么说？✏️"
    },
    "illustration": "✏️ PENCIL 📝",
    "illustrationSubtitle": {
      "th": "Writing pencil",
      "en": "Writing pencil",
      "zh": "铅笔"
    },
    "options": [
      {
        "id": "opt-k2-eng-e10-1",
        "label": {
          "th": "PENCIL",
          "en": "PENCIL",
          "zh": "PENCIL (铅笔)"
        },
        "icon": "✏️"
      },
      {
        "id": "opt-k2-eng-e10-2",
        "label": {
          "th": "ERASER",
          "en": "ERASER",
          "zh": "ERASER (橡皮)"
        },
        "icon": "🧼"
      },
      {
        "id": "opt-k2-eng-e10-3",
        "label": {
          "th": "RULER",
          "en": "RULER",
          "zh": "RULER (直尺)"
        },
        "icon": "📏"
      }
    ],
    "correctOptionId": "opt-k2-eng-e10-1",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! PENCIL คือดินสอ ✏️",
      "en": "Great! PENCIL is pencil ✏️",
      "zh": "答对了！PENCIL 是铅笔 ✏️"
    }
  },
  {
    "id": "k2-eng-m1",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "ตัวเลขภาษาอังกฤษ \"TEN\" ตรงกับจำนวนเท่าใด? 🔟",
      "en": "What number is \"TEN\"? 🔟",
      "zh": "“TEN”代表数字几？🔟"
    },
    "illustration": "🔟 TEN (10) 🔟",
    "illustrationSubtitle": {
      "th": "Number 10",
      "en": "Number 10",
      "zh": "数字 10"
    },
    "options": [
      {
        "id": "opt-k2-eng-m1-1",
        "label": {
          "th": "8 (แปด)",
          "en": "8 (Eight)",
          "zh": "8 (八)"
        },
        "icon": "8️⃣"
      },
      {
        "id": "opt-k2-eng-m1-2",
        "label": {
          "th": "10 (สิบ)",
          "en": "10 (Ten)",
          "zh": "10 (十)"
        },
        "icon": "🔟"
      },
      {
        "id": "opt-k2-eng-m1-3",
        "label": {
          "th": "12 (สิบสอง)",
          "en": "12 (Twelve)",
          "zh": "12 (十二)"
        },
        "icon": "1️⃣2️⃣"
      }
    ],
    "correctOptionId": "opt-k2-eng-m1-2",
    "explanation": {
      "th": "เก่งมากจ้า! TEN คือเลข 10 ครบสองมือ 🔟",
      "en": "Spot on! TEN is number 10 🔟",
      "zh": "太棒了！TEN 是数字 10 🔟"
    }
  },
  {
    "id": "k2-eng-m2",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "ผลไม้ \"กล้วยหอม\" สีเหลืองอร่อย ภาษาอังกฤษคือข้อใด? 🍌",
      "en": "What is a \"Banana\" in English? 🍌",
      "zh": "香蕉用英语怎么说？🍌"
    },
    "illustration": "🍌 BANANA 🍌",
    "illustrationSubtitle": {
      "th": "Sweet banana",
      "en": "Sweet banana",
      "zh": "香蕉"
    },
    "options": [
      {
        "id": "opt-k2-eng-m2-1",
        "label": {
          "th": "APPLE",
          "en": "APPLE",
          "zh": "APPLE (苹果)"
        },
        "icon": "🍎"
      },
      {
        "id": "opt-k2-eng-m2-2",
        "label": {
          "th": "MANGO",
          "en": "MANGO",
          "zh": "MANGO (芒果)"
        },
        "icon": "🥭"
      },
      {
        "id": "opt-k2-eng-m2-3",
        "label": {
          "th": "BANANA",
          "en": "BANANA",
          "zh": "BANANA (香蕉)"
        },
        "icon": "🍌"
      }
    ],
    "correctOptionId": "opt-k2-eng-m2-3",
    "explanation": {
      "th": "ถูกต้องจ้ะ! BANANA คือกล้วยหอมอร่อย 🍌",
      "en": "Correct! BANANA is banana 🍌",
      "zh": "答对了！BANANA 是香蕉 🍌"
    }
  },
  {
    "id": "k2-eng-m3",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "น้ำดื่มสะอาดชื่นใจ ภาษาอังกฤษคือคำว่าอะไรเอ่ย? 💧",
      "en": "What is \"Water\" in English? 💧",
      "zh": "水用英语怎么说？💧"
    },
    "illustration": "💧 WATER 🥛",
    "illustrationSubtitle": {
      "th": "Clean water",
      "en": "Clean water",
      "zh": "水"
    },
    "options": [
      {
        "id": "opt-k2-eng-m3-1",
        "label": {
          "th": "WATER",
          "en": "WATER",
          "zh": "WATER (水)"
        },
        "icon": "💧"
      },
      {
        "id": "opt-k2-eng-m3-2",
        "label": {
          "th": "MILK",
          "en": "MILK",
          "zh": "MILK (牛奶)"
        },
        "icon": "🥛"
      },
      {
        "id": "opt-k2-eng-m3-3",
        "label": {
          "th": "JUICE",
          "en": "JUICE",
          "zh": "JUICE (果汁)"
        },
        "icon": "🧃"
      }
    ],
    "correctOptionId": "opt-k2-eng-m3-1",
    "explanation": {
      "th": "ยอดเยี่ยมมากจ้า! WATER คือน้ำดื่ม 💧",
      "en": "Awesome! WATER is water 💧",
      "zh": "完全正确！WATER 是水 💧"
    }
  },
  {
    "id": "k2-eng-m4",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "นมกล่องบำรุงร่างกาย ภาษาอังกฤษคือคำว่าอะไร? 🥛",
      "en": "What is \"Milk\" in English? 🥛",
      "zh": "牛奶用英语怎么说？🥛"
    },
    "illustration": "🥛 MILK 🐮",
    "illustrationSubtitle": {
      "th": "Healthy milk",
      "en": "Healthy milk",
      "zh": "营养牛奶"
    },
    "options": [
      {
        "id": "opt-k2-eng-m4-1",
        "label": {
          "th": "TEA",
          "en": "TEA",
          "zh": "TEA (茶)"
        },
        "icon": "🍵"
      },
      {
        "id": "opt-k2-eng-m4-2",
        "label": {
          "th": "MILK",
          "en": "MILK",
          "zh": "MILK (牛奶)"
        },
        "icon": "🥛"
      },
      {
        "id": "opt-k2-eng-m4-3",
        "label": {
          "th": "COFFEE",
          "en": "COFFEE",
          "zh": "COFFEE (咖啡)"
        },
        "icon": "☕"
      }
    ],
    "correctOptionId": "opt-k2-eng-m4-2",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! MILK ดื่มแล้วตัวสูงแข็งแรง 🥛",
      "en": "That's it! MILK is milk 🥛",
      "zh": "真棒！MILK 是牛奶 🥛"
    }
  },
  {
    "id": "k2-eng-m5",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "ยานพาหนะ \"รถยนต์\" ภาษาอังกฤษคือคำว่าอะไรเอ่ย? 🚗",
      "en": "What is \"Car\" in English? 🚗",
      "zh": "汽车用英语怎么说？🚗"
    },
    "illustration": "🚗 CAR 🚙",
    "illustrationSubtitle": {
      "th": "Moving car",
      "en": "Moving car",
      "zh": "小汽车"
    },
    "options": [
      {
        "id": "opt-k2-eng-m5-1",
        "label": {
          "th": "BUS",
          "en": "BUS",
          "zh": "BUS (公交车)"
        },
        "icon": "🚌"
      },
      {
        "id": "opt-k2-eng-m5-2",
        "label": {
          "th": "TRAIN",
          "en": "TRAIN",
          "zh": "TRAIN (火车)"
        },
        "icon": "🚆"
      },
      {
        "id": "opt-k2-eng-m5-3",
        "label": {
          "th": "CAR",
          "en": "CAR",
          "zh": "CAR (汽车)"
        },
        "icon": "🚗"
      }
    ],
    "correctOptionId": "opt-k2-eng-m5-3",
    "explanation": {
      "th": "เก่งมากจ้า! CAR คือรถยนต์ บรื้นๆ 🚗",
      "en": "Brilliant! CAR is car 🚗",
      "zh": "答对了！CAR 是汽车 🚗"
    }
  },
  {
    "id": "k2-eng-m6",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำว่า \"HAPPY\" ในภาษาอังกฤษ มีความหมายตรงกับความรู้สึกใด? 😊",
      "en": "What emotion does \"HAPPY\" mean? 😊",
      "zh": "“HAPPY”代表哪种心情？😊"
    },
    "illustration": "😊 HAPPY 😄",
    "illustrationSubtitle": {
      "th": "Happy face",
      "en": "Happy face",
      "zh": "开心笑脸"
    },
    "options": [
      {
        "id": "opt-k2-eng-m6-1",
        "label": {
          "th": "มีความสุข / ดีใจ",
          "en": "Happy / Joyful",
          "zh": "高兴 / 开心"
        },
        "icon": "😊"
      },
      {
        "id": "opt-k2-eng-m6-2",
        "label": {
          "th": "เศร้าใจ / ร้องไห้",
          "en": "Sad / Crying",
          "zh": "难过 / 伤心"
        },
        "icon": "😢"
      },
      {
        "id": "opt-k2-eng-m6-3",
        "label": {
          "th": "โกรธ / โมโห",
          "en": "Angry / Mad",
          "zh": "生气"
        },
        "icon": "😡"
      }
    ],
    "correctOptionId": "opt-k2-eng-m6-1",
    "explanation": {
      "th": "ถูกต้องจ้า! HAPPY แปลว่ามีความสุข ยิ้มสดใส 😊",
      "en": "Spot on! HAPPY means joyful 😊",
      "zh": "真聪明！HAPPY 是高兴、开心的意思 😊"
    }
  },
  {
    "id": "k2-eng-m7",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำตรงข้ามของ \"HOT (ร้อน)\" คือคำว่าอะไรเอ่ย? ❄️",
      "en": "What is the opposite of \"HOT\"? ❄️",
      "zh": "“HOT (热)”的反义词是什么？❄️"
    },
    "illustration": "🔥 HOT vs ❄️ ?",
    "illustrationSubtitle": {
      "th": "Opposites",
      "en": "Opposites",
      "zh": "反义词"
    },
    "options": [
      {
        "id": "opt-k2-eng-m7-1",
        "label": {
          "th": "WARM",
          "en": "WARM",
          "zh": "WARM (温暖)"
        },
        "icon": "🌤️"
      },
      {
        "id": "opt-k2-eng-m7-2",
        "label": {
          "th": "COLD",
          "en": "COLD",
          "zh": "COLD (寒冷)"
        },
        "icon": "❄️"
      },
      {
        "id": "opt-k2-eng-m7-3",
        "label": {
          "th": "FAST",
          "en": "FAST",
          "zh": "FAST (快速)"
        },
        "icon": "⚡"
      }
    ],
    "correctOptionId": "opt-k2-eng-m7-2",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! HOT (ร้อน) ตรงข้ามกับ COLD (หนาว/เย็น) ❄️",
      "en": "Super! COLD is the opposite of HOT ❄️",
      "zh": "答对了！HOT 的反义词是 COLD (冷) ❄️"
    }
  },
  {
    "id": "k2-eng-m8",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "ต้นไม้สีเขียวให้ร่มเงา ภาษาอังกฤษคือคำว่าอะไร? 🌳",
      "en": "What is \"Tree\" in English? 🌳",
      "zh": "大树用英语怎么说？🌳"
    },
    "illustration": "🌳 TREE 🍃",
    "illustrationSubtitle": {
      "th": "Green tree",
      "en": "Green tree",
      "zh": "绿色大树"
    },
    "options": [
      {
        "id": "opt-k2-eng-m8-1",
        "label": {
          "th": "FLOWER",
          "en": "FLOWER",
          "zh": "FLOWER (花)"
        },
        "icon": "🌸"
      },
      {
        "id": "opt-k2-eng-m8-2",
        "label": {
          "th": "GRASS",
          "en": "GRASS",
          "zh": "GRASS (草地)"
        },
        "icon": "🌱"
      },
      {
        "id": "opt-k2-eng-m8-3",
        "label": {
          "th": "TREE",
          "en": "TREE",
          "zh": "TREE (树)"
        },
        "icon": "🌳"
      }
    ],
    "correctOptionId": "opt-k2-eng-m8-3",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! TREE คือต้นไม้ 🌳",
      "en": "Great job! TREE is tree 🌳",
      "zh": "真棒！TREE 是大树 🌳"
    }
  },
  {
    "id": "k2-eng-m9",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "พระจันทร์ส่องแสงยามค่ำคืน ภาษาอังกฤษคือคำว่าอะไร? 🌙",
      "en": "What is the \"Moon\" in English? 🌙",
      "zh": "月亮用英语怎么说？🌙"
    },
    "illustration": "🌙 MOON ⭐",
    "illustrationSubtitle": {
      "th": "Night moon",
      "en": "Night moon",
      "zh": "月亮"
    },
    "options": [
      {
        "id": "opt-k2-eng-m9-1",
        "label": {
          "th": "MOON",
          "en": "MOON",
          "zh": "MOON (月亮)"
        },
        "icon": "🌙"
      },
      {
        "id": "opt-k2-eng-m9-2",
        "label": {
          "th": "STAR",
          "en": "STAR",
          "zh": "STAR (星星)"
        },
        "icon": "⭐"
      },
      {
        "id": "opt-k2-eng-m9-3",
        "label": {
          "th": "CLOUD",
          "en": "CLOUD",
          "zh": "CLOUD (云朵)"
        },
        "icon": "☁️"
      }
    ],
    "correctOptionId": "opt-k2-eng-m9-1",
    "explanation": {
      "th": "เก่งมากจ้า! MOON คือดวงจันทร์ 🌙",
      "en": "Awesome! MOON is moon 🌙",
      "zh": "答对了！MOON 是月亮 🌙"
    }
  },
  {
    "id": "k2-eng-m10",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "ดวงดาวระยิบระยับบนท้องฟ้า ภาษาอังกฤษคือคำว่าอะไร? ⭐",
      "en": "What is a \"Star\" in English? ⭐",
      "zh": "星星用英语怎么说？⭐"
    },
    "illustration": "⭐ STAR ✨",
    "illustrationSubtitle": {
      "th": "Twinkling star",
      "en": "Twinkling star",
      "zh": "闪烁的星星"
    },
    "options": [
      {
        "id": "opt-k2-eng-m10-1",
        "label": {
          "th": "SUN",
          "en": "SUN",
          "zh": "SUN (太阳)"
        },
        "icon": "☀️"
      },
      {
        "id": "opt-k2-eng-m10-2",
        "label": {
          "th": "STAR",
          "en": "STAR",
          "zh": "STAR (星星)"
        },
        "icon": "⭐"
      },
      {
        "id": "opt-k2-eng-m10-3",
        "label": {
          "th": "SKY",
          "en": "SKY",
          "zh": "SKY (天空)"
        },
        "icon": "🌌"
      }
    ],
    "correctOptionId": "opt-k2-eng-m10-2",
    "explanation": {
      "th": "ยอดเยี่ยมจ้า! STAR คือดวงดาว ⭐ (Twinkle twinkle little star)",
      "en": "Brilliant! STAR is star ⭐",
      "zh": "太好了！STAR 是星星 ⭐"
    }
  },
  {
    "id": "k2-eng-h1",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "สะกดคำโฟนิกส์ C-A-T อ่านรวมกันเป็นคำว่าอะไรเอ่ย? 🐱",
      "en": "Phonics blend: C-A-T spells which word? 🐱",
      "zh": "自然拼读：C-A-T 拼成哪个单词？🐱"
    },
    "illustration": "C + A + T = ? 🐱",
    "illustrationSubtitle": {
      "th": "Phonics blending",
      "en": "Phonics blending",
      "zh": "自然拼音拼读"
    },
    "options": [
      {
        "id": "opt-k2-eng-h1-1",
        "label": {
          "th": "DOG",
          "en": "DOG",
          "zh": "DOG (狗)"
        },
        "icon": "🐶"
      },
      {
        "id": "opt-k2-eng-h1-2",
        "label": {
          "th": "BAT",
          "en": "BAT",
          "zh": "BAT (球棒/蝙蝠)"
        },
        "icon": "🦇"
      },
      {
        "id": "opt-k2-eng-h1-3",
        "label": {
          "th": "CAT",
          "en": "CAT",
          "zh": "CAT (猫)"
        },
        "icon": "🐱"
      }
    ],
    "correctOptionId": "opt-k2-eng-h1-3",
    "explanation": {
      "th": "ถูกต้องจ้า! /k/ /æ/ /t/ คือ CAT เจ้าแมว 🐱",
      "en": "Super! /k/ /æ/ /t/ spells CAT 🐱",
      "zh": "答对了！C-A-T 拼读为 CAT 🐱"
    }
  },
  {
    "id": "k2-eng-h2",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "สะกดคำโฟนิกส์ D-O-G อ่านรวมกันเป็นคำว่าอะไรเอ่ย? 🐶",
      "en": "Phonics blend: D-O-G spells which word? 🐶",
      "zh": "自然拼读：D-O-G 拼成哪个单词？🐶"
    },
    "illustration": "D + O + G = ? 🐶",
    "illustrationSubtitle": {
      "th": "Phonics blending",
      "en": "Phonics blending",
      "zh": "自然拼音拼读"
    },
    "options": [
      {
        "id": "opt-k2-eng-h2-1",
        "label": {
          "th": "DOG",
          "en": "DOG",
          "zh": "DOG (狗)"
        },
        "icon": "🐶"
      },
      {
        "id": "opt-k2-eng-h2-2",
        "label": {
          "th": "PIG",
          "en": "PIG",
          "zh": "PIG (猪)"
        },
        "icon": "🐷"
      },
      {
        "id": "opt-k2-eng-h2-3",
        "label": {
          "th": "FOX",
          "en": "FOX",
          "zh": "FOX (狐狸)"
        },
        "icon": "🦊"
      }
    ],
    "correctOptionId": "opt-k2-eng-h2-1",
    "explanation": {
      "th": "เก่งมากจ้า! /d/ /ɒ/ /ɡ/ คือ DOG สุนัข 🐶",
      "en": "Spot on! /d/ /ɒ/ /ɡ/ spells DOG 🐶",
      "zh": "真聪明！D-O-G 拼读为 DOG 🐶"
    }
  },
  {
    "id": "k2-eng-h3",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "ตัวพิมพ์ใหญ่ \"M\" ตรงกับตัวพิมพ์เล็กตัวใดเอ่ย? 🐒",
      "en": "Which lowercase letter matches uppercase \"M\"? 🐒",
      "zh": "大写“M”对应哪个小写字母？🐒"
    },
    "illustration": "M ➡️ ? 🐒",
    "illustrationSubtitle": {
      "th": "Uppercase to Lowercase",
      "en": "Uppercase to Lowercase",
      "zh": "大小写配对"
    },
    "options": [
      {
        "id": "opt-k2-eng-h3-1",
        "label": {
          "th": "w",
          "en": "w",
          "zh": "w"
        },
        "icon": "🌊"
      },
      {
        "id": "opt-k2-eng-h3-2",
        "label": {
          "th": "m",
          "en": "m",
          "zh": "m"
        },
        "icon": "🐒"
      },
      {
        "id": "opt-k2-eng-h3-3",
        "label": {
          "th": "n",
          "en": "n",
          "zh": "n"
        },
        "icon": "🥜"
      }
    ],
    "correctOptionId": "opt-k2-eng-h3-2",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! M คู่กับ m ตัวเล็ก (Monkey 🐒)",
      "en": "Correct! Uppercase M matches lowercase m 🐒",
      "zh": "答对了！大写 M 对应小写 m 🐒"
    }
  },
  {
    "id": "k2-eng-h4",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "สัตว์ตัวโต คอยาว ลายจุด \"ยีราฟ\" ภาษาอังกฤษคือข้อใด? 🦒",
      "en": "Which tall animal is \"Giraffe\" in English? 🦒",
      "zh": "长颈鹿用英语怎么说？🦒"
    },
    "illustration": "🦒 GIRAFFE 🌿",
    "illustrationSubtitle": {
      "th": "Tall giraffe",
      "en": "Tall giraffe",
      "zh": "长颈鹿"
    },
    "options": [
      {
        "id": "opt-k2-eng-h4-1",
        "label": {
          "th": "ZEBRA",
          "en": "ZEBRA",
          "zh": "ZEBRA (斑马)"
        },
        "icon": "🦓"
      },
      {
        "id": "opt-k2-eng-h4-2",
        "label": {
          "th": "HIPPO",
          "en": "HIPPO",
          "zh": "HIPPO (河马)"
        },
        "icon": "🦛"
      },
      {
        "id": "opt-k2-eng-h4-3",
        "label": {
          "th": "GIRAFFE",
          "en": "GIRAFFE",
          "zh": "GIRAFFE (长颈鹿)"
        },
        "icon": "🦒"
      }
    ],
    "correctOptionId": "opt-k2-eng-h4-3",
    "explanation": {
      "th": "ถูกต้องจ้า! GIRAFFE คือพี่ยีราฟคอยาว 🦒",
      "en": "Awesome! GIRAFFE is giraffe 🦒",
      "zh": "太棒了！GIRAFFE 是长颈鹿 🦒"
    }
  },
  {
    "id": "k2-eng-h5",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำกริยา \"RUN (วิ่ง)\" ตรงกับภาพการกระทำใดเอ่ย? 🏃",
      "en": "Which action matches the word \"RUN\"? 🏃",
      "zh": "“RUN”代表哪个动作？🏃"
    },
    "illustration": "🏃 RUN 💨",
    "illustrationSubtitle": {
      "th": "Action verb run",
      "en": "Action verb run",
      "zh": "跑步动作"
    },
    "options": [
      {
        "id": "opt-k2-eng-h5-1",
        "label": {
          "th": "วิ่ง (Run)",
          "en": "Running",
          "zh": "跑步"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k2-eng-h5-2",
        "label": {
          "th": "นอนหลับ (Sleep)",
          "en": "Sleeping",
          "zh": "睡觉"
        },
        "icon": "😴"
      },
      {
        "id": "opt-k2-eng-h5-3",
        "label": {
          "th": "นั่ง (Sit)",
          "en": "Sitting",
          "zh": "坐下"
        },
        "icon": "🪑"
      }
    ],
    "correctOptionId": "opt-k2-eng-h5-1",
    "explanation": {
      "th": "เก่งมากจ้า! RUN แปลว่า วิ่งออกกำลังกาย 🏃",
      "en": "Brilliant! RUN means moving fast on foot 🏃",
      "zh": "答对了！RUN 是跑步的意思 🏃"
    }
  },
  {
    "id": "k2-eng-h6",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำกริยา \"JUMP (กระโดด)\" ตรงกับภาพการกระทำใดเอ่ย? 🦘",
      "en": "Which action matches \"JUMP\"? 🦘",
      "zh": "“JUMP”代表哪个动作？🦘"
    },
    "illustration": "🦘 JUMP ⬆️",
    "illustrationSubtitle": {
      "th": "Action verb jump",
      "en": "Action verb jump",
      "zh": "跳跃动作"
    },
    "options": [
      {
        "id": "opt-k2-eng-h6-1",
        "label": {
          "th": "ว่ายน้ำ (Swim)",
          "en": "Swimming",
          "zh": "游泳"
        },
        "icon": "🏊"
      },
      {
        "id": "opt-k2-eng-h6-2",
        "label": {
          "th": "กระโดด (Jump)",
          "en": "Jumping",
          "zh": "跳跃"
        },
        "icon": "🦘"
      },
      {
        "id": "opt-k2-eng-h6-3",
        "label": {
          "th": "เดิน (Walk)",
          "en": "Walking",
          "zh": "走路"
        },
        "icon": "🚶"
      }
    ],
    "correctOptionId": "opt-k2-eng-h6-2",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! JUMP แปลว่า กระโดดสูงๆ 🦘",
      "en": "That's it! JUMP means hopping or leaping up 🦘",
      "zh": "真棒！JUMP 是跳跃的意思 🦘"
    }
  },
  {
    "id": "k2-eng-h7",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "ลูกไก่ตัวจ้อย ออกเสียงร้องเจี๊ยบๆ เริ่มต้นด้วยเสียงตัวอักษรใด? 🐣",
      "en": "What letter does \"Chicken\" begin with? 🐣",
      "zh": "单词“Chicken”以哪个字母开头？🐣"
    },
    "illustration": "🐣 C-H-I-C-K-E-N 🐥",
    "illustrationSubtitle": {
      "th": "Initial letter",
      "en": "Initial letter",
      "zh": "首字母"
    },
    "options": [
      {
        "id": "opt-k2-eng-h7-1",
        "label": {
          "th": "A",
          "en": "A",
          "zh": "A"
        },
        "icon": "🍎"
      },
      {
        "id": "opt-k2-eng-h7-2",
        "label": {
          "th": "B",
          "en": "B",
          "zh": "B"
        },
        "icon": "🐻"
      },
      {
        "id": "opt-k2-eng-h7-3",
        "label": {
          "th": "C",
          "en": "C",
          "zh": "C"
        },
        "icon": "🐣"
      }
    ],
    "correctOptionId": "opt-k2-eng-h7-3",
    "explanation": {
      "th": "เก่งมากจ้า! Chicken เริ่มต้นด้วยตัว C 🐣",
      "en": "Spot on! Chicken starts with letter C 🐣",
      "zh": "太棒了！Chicken 以字母 C 开头 🐣"
    }
  },
  {
    "id": "k2-eng-h8",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "เมื่อต้องการขออนุญาตอย่างสุภาพ ควรเติมคำว่าอะไรข้างหน้า? 🙏",
      "en": "Which polite word do we say when asking nicely? 🙏",
      "zh": "礼貌提出请求时用哪个词？🙏"
    },
    "illustration": "🙏 Polite Word ✨",
    "illustrationSubtitle": {
      "th": "Magic word",
      "en": "Magic word",
      "zh": "礼貌用语"
    },
    "options": [
      {
        "id": "opt-k2-eng-h8-1",
        "label": {
          "th": "Please",
          "en": "Please",
          "zh": "Please (请)"
        },
        "icon": "🙏"
      },
      {
        "id": "opt-k2-eng-h8-2",
        "label": {
          "th": "Stop",
          "en": "Stop",
          "zh": "Stop (停下)"
        },
        "icon": "🛑"
      },
      {
        "id": "opt-k2-eng-h8-3",
        "label": {
          "th": "Go away",
          "en": "Go away",
          "zh": "Go away (走开)"
        },
        "icon": "🚫"
      }
    ],
    "correctOptionId": "opt-k2-eng-h8-1",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! Please (พลีส) คือคำสุภาพ แปลว่า ได้โปรด / กรุณา 🙏",
      "en": "Super! Please is the polite magic word 🙏",
      "zh": "答对了！Please 是礼貌的请的意思 🙏"
    }
  },
  {
    "id": "k2-eng-h9",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำสัมผัสคล้องจอง: คำว่า \"HAT (หมวก)\" สัมผัสเสียงกับคำใด? 🎩",
      "en": "Rhyming word: Which word rhymes with \"HAT\"? 🎩",
      "zh": "哪个单词和“HAT”押韵？🎩"
    },
    "illustration": "🎩 HAT rhymes with ... ? 🐱",
    "illustrationSubtitle": {
      "th": "Rhyming sounds",
      "en": "Rhyming sounds",
      "zh": "押韵单词"
    },
    "options": [
      {
        "id": "opt-k2-eng-h9-1",
        "label": {
          "th": "DOG",
          "en": "DOG",
          "zh": "DOG"
        },
        "icon": "🐶"
      },
      {
        "id": "opt-k2-eng-h9-2",
        "label": {
          "th": "CAT",
          "en": "CAT",
          "zh": "CAT"
        },
        "icon": "🐱"
      },
      {
        "id": "opt-k2-eng-h9-3",
        "label": {
          "th": "SUN",
          "en": "SUN",
          "zh": "SUN"
        },
        "icon": "☀️"
      }
    ],
    "correctOptionId": "opt-k2-eng-h9-2",
    "explanation": {
      "th": "เก่งมากจ้า! HAT สัมผัสเสียงกับ CAT (-at sound) 🎩🐱",
      "en": "Awesome! HAT and CAT rhyme together (-at sound) 🎩🐱",
      "zh": "真聪明！HAT 和 CAT 押韵 (-at) 🎩🐱"
    }
  },
  {
    "id": "k2-eng-h10",
    "grade": "K2",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "เวลาคุณครูถาม \"How are you?\" เราควรตอบว่าอย่างไรเมื่อสบายดี? 😊",
      "en": "When asked \"How are you?\", how do you reply when feeling great? 😊",
      "zh": "当被问到“How are you?”时，身体很好该怎么回答？😊"
    },
    "illustration": "🗣️ \"How are you?\" 👉 ?",
    "illustrationSubtitle": {
      "th": "Daily conversation",
      "en": "Daily conversation",
      "zh": "日常会话"
    },
    "options": [
      {
        "id": "opt-k2-eng-h10-1",
        "label": {
          "th": "I am hungry",
          "en": "I am hungry",
          "zh": "我肚子饿了"
        },
        "icon": "🥣"
      },
      {
        "id": "opt-k2-eng-h10-2",
        "label": {
          "th": "Good night",
          "en": "Good night",
          "zh": "晚安"
        },
        "icon": "🌙"
      },
      {
        "id": "opt-k2-eng-h10-3",
        "label": {
          "th": "I am fine, thank you!",
          "en": "I am fine, thank you!",
          "zh": "我很好，谢谢！"
        },
        "icon": "😊"
      }
    ],
    "correctOptionId": "opt-k2-eng-h10-3",
    "explanation": {
      "th": "ยอดเยี่ยมมากจ้า! \"I am fine, thank you!\" แปลว่า ฉันสบายดี ขอบคุณครับ/ค่ะ 😊",
      "en": "Brilliant! \"I am fine, thank you!\" is the perfect response 😊",
      "zh": "完全正确！“I am fine, thank you!”代表我很好，谢谢！😊"
    }
  },
  {
    "id": "k3-eng-e1",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "ตัวเลขภาษาอังกฤษ \"ELEVEN\" ตรงกับจำนวนเท่าใด? 🔢",
      "en": "What number is \"ELEVEN\"? 🔢",
      "zh": "“ELEVEN”代表数字几？🔢"
    },
    "illustration": "🔢 ELEVEN (11) 🔢",
    "illustrationSubtitle": {
      "th": "Number 11",
      "en": "Number 11",
      "zh": "数字 11"
    },
    "options": [
      {
        "id": "opt-k3-eng-e1-1",
        "label": {
          "th": "11 (สิบเอ็ด)",
          "en": "11 (Eleven)",
          "zh": "11 (十一)"
        },
        "icon": "1️⃣1️⃣"
      },
      {
        "id": "opt-k3-eng-e1-2",
        "label": {
          "th": "12 (สิบสอง)",
          "en": "12 (Twelve)",
          "zh": "12 (十二)"
        },
        "icon": "1️⃣2️⃣"
      },
      {
        "id": "opt-k3-eng-e1-3",
        "label": {
          "th": "15 (สิบห้า)",
          "en": "15 (Fifteen)",
          "zh": "15 (十五)"
        },
        "icon": "1️⃣5️⃣"
      }
    ],
    "correctOptionId": "opt-k3-eng-e1-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! ELEVEN คือเลข 11 🔢",
      "en": "Spot on! ELEVEN is number 11 🔢",
      "zh": "答对了！ELEVEN 是数字 11 🔢"
    }
  },
  {
    "id": "k3-eng-e2",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "ตัวเลขภาษาอังกฤษ \"TWELVE\" ตรงกับจำนวนเท่าใด? ⏰",
      "en": "What number is \"TWELVE\"? ⏰",
      "zh": "“TWELVE”代表数字几？⏰"
    },
    "illustration": "⏰ TWELVE (12) ⏰",
    "illustrationSubtitle": {
      "th": "Number 12",
      "en": "Number 12",
      "zh": "数字 12"
    },
    "options": [
      {
        "id": "opt-k3-eng-e2-1",
        "label": {
          "th": "10 (สิบ)",
          "en": "10 (Ten)",
          "zh": "10 (十)"
        },
        "icon": "🔟"
      },
      {
        "id": "opt-k3-eng-e2-2",
        "label": {
          "th": "12 (สิบสอง)",
          "en": "12 (Twelve)",
          "zh": "12 (十二)"
        },
        "icon": "1️⃣2️⃣"
      },
      {
        "id": "opt-k3-eng-e2-3",
        "label": {
          "th": "20 (ยี่สิบ)",
          "en": "20 (Twenty)",
          "zh": "20 (二十)"
        },
        "icon": "2️⃣0️⃣"
      }
    ],
    "correctOptionId": "opt-k3-eng-e2-2",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! TWELVE คือเลข 12 ⏰",
      "en": "Great! TWELVE is number 12 ⏰",
      "zh": "真棒！TWELVE 是数字 12 ⏰"
    }
  },
  {
    "id": "k3-eng-e3",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "ตัวเลขภาษาอังกฤษ \"TWENTY\" ตรงกับจำนวนเท่าใด? 🎯",
      "en": "What number is \"TWENTY\"? 🎯",
      "zh": "“TWENTY”代表数字几？🎯"
    },
    "illustration": "🎯 TWENTY (20) 🎯",
    "illustrationSubtitle": {
      "th": "Number 20",
      "en": "Number 20",
      "zh": "数字 20"
    },
    "options": [
      {
        "id": "opt-k3-eng-e3-1",
        "label": {
          "th": "12 (สิบสอง)",
          "en": "12 (Twelve)",
          "zh": "12 (十二)"
        },
        "icon": "1️⃣2️⃣"
      },
      {
        "id": "opt-k3-eng-e3-2",
        "label": {
          "th": "15 (สิบห้า)",
          "en": "15 (Fifteen)",
          "zh": "15 (十五)"
        },
        "icon": "1️⃣5️⃣"
      },
      {
        "id": "opt-k3-eng-e3-3",
        "label": {
          "th": "20 (ยี่สิบ)",
          "en": "20 (Twenty)",
          "zh": "20 (二十)"
        },
        "icon": "2️⃣0️⃣"
      }
    ],
    "correctOptionId": "opt-k3-eng-e3-3",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! TWENTY คือเลข 20 🎯",
      "en": "Correct! TWENTY is number 20 🎯",
      "zh": "答对了！TWENTY 是数字 20 🎯"
    }
  },
  {
    "id": "k3-eng-e4",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "สมาชิกในครอบครัว \"คุณพ่อ\" ภาษาอังกฤษคือคำว่าอะไร? 👨",
      "en": "What is \"Father\" in English? 👨",
      "zh": "爸爸用英语怎么说？👨"
    },
    "illustration": "👨 FATHER 👔",
    "illustrationSubtitle": {
      "th": "Family Father",
      "en": "Family Father",
      "zh": "父亲"
    },
    "options": [
      {
        "id": "opt-k3-eng-e4-1",
        "label": {
          "th": "FATHER",
          "en": "FATHER",
          "zh": "FATHER (父亲)"
        },
        "icon": "👨"
      },
      {
        "id": "opt-k3-eng-e4-2",
        "label": {
          "th": "MOTHER",
          "en": "MOTHER",
          "zh": "MOTHER (母亲)"
        },
        "icon": "👩"
      },
      {
        "id": "opt-k3-eng-e4-3",
        "label": {
          "th": "BABY",
          "en": "BABY",
          "zh": "BABY (婴儿)"
        },
        "icon": "👶"
      }
    ],
    "correctOptionId": "opt-k3-eng-e4-1",
    "explanation": {
      "th": "เก่งมากจ้า! FATHER คือคุณพ่อ 👨",
      "en": "Super! FATHER is father/dad 👨",
      "zh": "真聪明！FATHER 是爸爸 👨"
    }
  },
  {
    "id": "k3-eng-e5",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "สมาชิกในครอบครัว \"คุณแม่\" ภาษาอังกฤษคือคำว่าอะไร? 👩",
      "en": "What is \"Mother\" in English? 👩",
      "zh": "妈妈用英语怎么说？👩"
    },
    "illustration": "👩 MOTHER 🌸",
    "illustrationSubtitle": {
      "th": "Family Mother",
      "en": "Family Mother",
      "zh": "母亲"
    },
    "options": [
      {
        "id": "opt-k3-eng-e5-1",
        "label": {
          "th": "BROTHER",
          "en": "BROTHER",
          "zh": "BROTHER (兄弟)"
        },
        "icon": "👦"
      },
      {
        "id": "opt-k3-eng-e5-2",
        "label": {
          "th": "MOTHER",
          "en": "MOTHER",
          "zh": "MOTHER (母亲)"
        },
        "icon": "👩"
      },
      {
        "id": "opt-k3-eng-e5-3",
        "label": {
          "th": "SISTER",
          "en": "SISTER",
          "zh": "SISTER (姐妹)"
        },
        "icon": "👧"
      }
    ],
    "correctOptionId": "opt-k3-eng-e5-2",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! MOTHER คือคุณแม่แสนอบอุ่น 👩",
      "en": "Spot on! MOTHER is mother/mom 👩",
      "zh": "太棒了！MOTHER 是妈妈 👩"
    }
  },
  {
    "id": "k3-eng-e6",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "อาหารหลักของคนไทย \"ข้าวสวย\" ภาษาอังกฤษเรียกว่าอะไร? 🍚",
      "en": "What is \"Rice\" in English? 🍚",
      "zh": "米饭用英语怎么说？🍚"
    },
    "illustration": "🍚 RICE 🌾",
    "illustrationSubtitle": {
      "th": "Warm white rice",
      "en": "Warm white rice",
      "zh": "米饭"
    },
    "options": [
      {
        "id": "opt-k3-eng-e6-1",
        "label": {
          "th": "BREAD",
          "en": "BREAD",
          "zh": "BREAD (面包)"
        },
        "icon": "🍞"
      },
      {
        "id": "opt-k3-eng-e6-2",
        "label": {
          "th": "SOUP",
          "en": "SOUP",
          "zh": "SOUP (汤)"
        },
        "icon": "🥣"
      },
      {
        "id": "opt-k3-eng-e6-3",
        "label": {
          "th": "RICE",
          "en": "RICE",
          "zh": "RICE (米饭)"
        },
        "icon": "🍚"
      }
    ],
    "correctOptionId": "opt-k3-eng-e6-3",
    "explanation": {
      "th": "ถูกต้องจ้า! RICE คือข้าวสวยอร่อย 🍚",
      "en": "Awesome! RICE is rice 🍚",
      "zh": "答对了！RICE 是米饭 🍚"
    }
  },
  {
    "id": "k3-eng-e7",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "ขนมปังแสนอร่อย ภาษาอังกฤษคือคำว่าอะไรเอ่ย? 🍞",
      "en": "What is \"Bread\" in English? 🍞",
      "zh": "面包用英语怎么说？🍞"
    },
    "illustration": "🍞 BREAD 🥪",
    "illustrationSubtitle": {
      "th": "Delicious bread",
      "en": "Delicious bread",
      "zh": "美味面包"
    },
    "options": [
      {
        "id": "opt-k3-eng-e7-1",
        "label": {
          "th": "BREAD",
          "en": "BREAD",
          "zh": "BREAD (面包)"
        },
        "icon": "🍞"
      },
      {
        "id": "opt-k3-eng-e7-2",
        "label": {
          "th": "CAKE",
          "en": "CAKE",
          "zh": "CAKE (蛋糕)"
        },
        "icon": "🍰"
      },
      {
        "id": "opt-k3-eng-e7-3",
        "label": {
          "th": "PIZZA",
          "en": "PIZZA",
          "zh": "PIZZA (比萨)"
        },
        "icon": "🍕"
      }
    ],
    "correctOptionId": "opt-k3-eng-e7-1",
    "explanation": {
      "th": "เก่งมากจ้า! BREAD คือขนมปัง 🍞",
      "en": "Brilliant! BREAD is bread 🍞",
      "zh": "真棒！BREAD 是面包 🍞"
    }
  },
  {
    "id": "k3-eng-e8",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำบอกตำแหน่ง: \"IN\" ในภาษาอังกฤษ มีความหมายว่าอย่างไร? 📦",
      "en": "What does the preposition \"IN\" mean? 📦",
      "zh": "介词“IN”是什么意思？📦"
    },
    "illustration": "📦 Ball IN the box ⚽",
    "illustrationSubtitle": {
      "th": "Preposition IN",
      "en": "Preposition IN",
      "zh": "在……里面"
    },
    "options": [
      {
        "id": "opt-k3-eng-e8-1",
        "label": {
          "th": "บน",
          "en": "On",
          "zh": "在……上面"
        },
        "icon": "🔝"
      },
      {
        "id": "opt-k3-eng-e8-2",
        "label": {
          "th": "ข้างใน",
          "en": "In / Inside",
          "zh": "在……里面"
        },
        "icon": "📦"
      },
      {
        "id": "opt-k3-eng-e8-3",
        "label": {
          "th": "ข้างใต้",
          "en": "Under",
          "zh": "在……下面"
        },
        "icon": "⬇️"
      }
    ],
    "correctOptionId": "opt-k3-eng-e8-2",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! IN แปลว่า ข้างใน (เช่น ลูกบอลอยู่ในกล่อง) 📦",
      "en": "Correct! IN means inside 📦",
      "zh": "答对了！IN 是在……里面的意思 📦"
    }
  },
  {
    "id": "k3-eng-e9",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำบอกตำแหน่ง: \"ON\" ในภาษาอังกฤษ มีความหมายว่าอย่างไร? 🪑",
      "en": "What does the preposition \"ON\" mean? 🪑",
      "zh": "介词“ON”是什么意思？🪑"
    },
    "illustration": "🪑 Book ON the table 📚",
    "illustrationSubtitle": {
      "th": "Preposition ON",
      "en": "Preposition ON",
      "zh": "在……上面"
    },
    "options": [
      {
        "id": "opt-k3-eng-e9-1",
        "label": {
          "th": "ข้างใต้",
          "en": "Under",
          "zh": "在……下面"
        },
        "icon": "⬇️"
      },
      {
        "id": "opt-k3-eng-e9-2",
        "label": {
          "th": "ข้างใน",
          "en": "In",
          "zh": "在……里面"
        },
        "icon": "📦"
      },
      {
        "id": "opt-k3-eng-e9-3",
        "label": {
          "th": "ข้างบน",
          "en": "On / Above",
          "zh": "在……上面"
        },
        "icon": "🔝"
      }
    ],
    "correctOptionId": "opt-k3-eng-e9-3",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! ON แปลว่า ข้างบน (เช่น หนังสืออยู่บนโต๊ะ) 📚",
      "en": "Spot on! ON means on top of 🔝",
      "zh": "太好了！ON 是在……上面的意思 🔝"
    }
  },
  {
    "id": "k3-eng-e10",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "วันทั้งเจ็ด: วันแรกของสัปดาห์ \"SUNDAY (วันอาทิตย์)\" ตรงกับสีประจำวันใด? 🔴",
      "en": "What is \"SUNDAY\" in Thai week tradition? 🔴",
      "zh": "星期天“SUNDAY”代表哪一天？🔴"
    },
    "illustration": "🔴 SUNDAY ☀️",
    "illustrationSubtitle": {
      "th": "Day of the week",
      "en": "Day of the week",
      "zh": "星期天"
    },
    "options": [
      {
        "id": "opt-k3-eng-e10-1",
        "label": {
          "th": "วันอาทิตย์",
          "en": "Sunday",
          "zh": "星期日"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k3-eng-e10-2",
        "label": {
          "th": "วันจันทร์",
          "en": "Monday",
          "zh": "星期一"
        },
        "icon": "🟡"
      },
      {
        "id": "opt-k3-eng-e10-3",
        "label": {
          "th": "วันศุกร์",
          "en": "Friday",
          "zh": "星期五"
        },
        "icon": "🔵"
      }
    ],
    "correctOptionId": "opt-k3-eng-e10-1",
    "explanation": {
      "th": "เก่งมากจ้า! SUNDAY คือวันอาทิตย์ สีแดงสดใส 🔴",
      "en": "That's it! SUNDAY is Sunday 🔴",
      "zh": "真棒！SUNDAY 是星期天 🔴"
    }
  },
  {
    "id": "k3-eng-m1",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำกริยา \"SLEEP (นอนหลับ)\" ตรงกับภาพใดเอ่ย? 😴",
      "en": "Which picture matches the verb \"SLEEP\"? 😴",
      "zh": "动词“SLEEP”对应哪张图片？😴"
    },
    "illustration": "😴 SLEEP 🌙",
    "illustrationSubtitle": {
      "th": "Action verb sleep",
      "en": "Action verb sleep",
      "zh": "睡觉动作"
    },
    "options": [
      {
        "id": "opt-k3-eng-m1-1",
        "label": {
          "th": "วิ่งเล่น (Play)",
          "en": "Play",
          "zh": "玩耍"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k3-eng-m1-2",
        "label": {
          "th": "นอนหลับ (Sleep)",
          "en": "Sleep",
          "zh": "睡觉"
        },
        "icon": "😴"
      },
      {
        "id": "opt-k3-eng-m1-3",
        "label": {
          "th": "รับประทาน (Eat)",
          "en": "Eat",
          "zh": "吃东西"
        },
        "icon": "🍽️"
      }
    ],
    "correctOptionId": "opt-k3-eng-m1-2",
    "explanation": {
      "th": "ถูกต้องจ้า! SLEEP แปลว่า นอนหลับพักผ่อน 😴",
      "en": "Super! SLEEP means resting and sleeping 😴",
      "zh": "答对了！SLEEP 是睡觉的意思 😴"
    }
  },
  {
    "id": "k3-eng-m2",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำกริยา \"EAT (กิน / รับประทาน)\" ตรงกับภาพใดเอ่ย? 🍽️",
      "en": "Which picture matches the verb \"EAT\"? 🍽️",
      "zh": "动词“EAT”对应哪张图片？🍽️"
    },
    "illustration": "🍽️ EAT 🍎",
    "illustrationSubtitle": {
      "th": "Action verb eat",
      "en": "Action verb eat",
      "zh": "吃东西"
    },
    "options": [
      {
        "id": "opt-k3-eng-m2-1",
        "label": {
          "th": "ดื่มน้ำ (Drink)",
          "en": "Drink",
          "zh": "喝水"
        },
        "icon": "🥤"
      },
      {
        "id": "opt-k3-eng-m2-2",
        "label": {
          "th": "อ่านหนังสือ (Read)",
          "en": "Read",
          "zh": "看书"
        },
        "icon": "📖"
      },
      {
        "id": "opt-k3-eng-m2-3",
        "label": {
          "th": "กินอาหาร (Eat)",
          "en": "Eat",
          "zh": "吃东西"
        },
        "icon": "🍽️"
      }
    ],
    "correctOptionId": "opt-k3-eng-m2-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! EAT แปลว่า รับประทานอาหาร 🍽️",
      "en": "Spot on! EAT means eating food 🍽️",
      "zh": "太棒了！EAT 是吃的意思 🍽️"
    }
  },
  {
    "id": "k3-eng-m3",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำศัพท์กลุ่มคำโฟนิกส์สระ -an: P-A-N หมายถึงเครื่องครัวชนิดใด? 🍳",
      "en": "Phonics word P-A-N means which cookware? 🍳",
      "zh": "自然拼读单词 P-A-N 指的是哪种厨具？🍳"
    },
    "illustration": "🍳 P-A-N = ? 🍳",
    "illustrationSubtitle": {
      "th": "Kitchen pan",
      "en": "Kitchen pan",
      "zh": "平底锅"
    },
    "options": [
      {
        "id": "opt-k3-eng-m3-1",
        "label": {
          "th": "กระทะ (Pan)",
          "en": "Pan",
          "zh": "平底锅"
        },
        "icon": "🍳"
      },
      {
        "id": "opt-k3-eng-m3-2",
        "label": {
          "th": "หม้อ (Pot)",
          "en": "Pot",
          "zh": "锅"
        },
        "icon": "🍲"
      },
      {
        "id": "opt-k3-eng-m3-3",
        "label": {
          "th": "ช้อน (Spoon)",
          "en": "Spoon",
          "zh": "汤匙"
        },
        "icon": "🥄"
      }
    ],
    "correctOptionId": "opt-k3-eng-m3-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! PAN คือกระทะสำหรับทำไข่ดาว 🍳",
      "en": "Brilliant! PAN is a cooking pan 🍳",
      "zh": "真聪明！PAN 是平底锅 🍳"
    }
  },
  {
    "id": "k3-eng-m4",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำศัพท์กลุ่มคำโฟนิกส์สระ -an: F-A-N หมายถึงสิ่งของใดเอ่ย? 🌀",
      "en": "Phonics word F-A-N means which object? 🌀",
      "zh": "自然拼读单词 F-A-N 指的是什么物品？🌀"
    },
    "illustration": "🌀 F-A-N = ? 💨",
    "illustrationSubtitle": {
      "th": "Cooling fan",
      "en": "Cooling fan",
      "zh": "风扇"
    },
    "options": [
      {
        "id": "opt-k3-eng-m4-1",
        "label": {
          "th": "หน้าต่าง (Window)",
          "en": "Window",
          "zh": "窗户"
        },
        "icon": "🪟"
      },
      {
        "id": "opt-k3-eng-m4-2",
        "label": {
          "th": "พัดลม (Fan)",
          "en": "Fan",
          "zh": "风扇"
        },
        "icon": "🌀"
      },
      {
        "id": "opt-k3-eng-m4-3",
        "label": {
          "th": "ประตู (Door)",
          "en": "Door",
          "zh": "门"
        },
        "icon": "🚪"
      }
    ],
    "correctOptionId": "opt-k3-eng-m4-2",
    "explanation": {
      "th": "เก่งมากจ้า! FAN คือพัดลมพัดเย็นสบาย 🌀",
      "en": "Correct! FAN blows cool breeze 🌀",
      "zh": "答对了！FAN 是风扇 🌀"
    }
  },
  {
    "id": "k3-eng-m5",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำสัมผัสคล้องจอง: คำว่า \"SUN (ดวงอาทิตย์)\" สัมผัสเสียงกับคำใด? ☀️",
      "en": "Which word rhymes with \"SUN\"? ☀️",
      "zh": "哪个单词和“SUN”押韵？☀️"
    },
    "illustration": "☀️ SUN rhymes with ... ? 🏃",
    "illustrationSubtitle": {
      "th": "Rhyming phonics -un",
      "en": "Rhyming phonics -un",
      "zh": "押韵词 -un"
    },
    "options": [
      {
        "id": "opt-k3-eng-m5-1",
        "label": {
          "th": "CAT",
          "en": "CAT",
          "zh": "CAT"
        },
        "icon": "🐱"
      },
      {
        "id": "opt-k3-eng-m5-2",
        "label": {
          "th": "PEN",
          "en": "PEN",
          "zh": "PEN"
        },
        "icon": "🖊️"
      },
      {
        "id": "opt-k3-eng-m5-3",
        "label": {
          "th": "RUN",
          "en": "RUN",
          "zh": "RUN"
        },
        "icon": "🏃"
      }
    ],
    "correctOptionId": "opt-k3-eng-m5-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! SUN สัมผัสเสียงกับ RUN (-un sound) ☀️🏃",
      "en": "Awesome! SUN and RUN rhyme together (-un sound) ☀️🏃",
      "zh": "太棒了！SUN 和 RUN 押韵 (-un) ☀️🏃"
    }
  },
  {
    "id": "k3-eng-m6",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "ประโยคบอกความชอบ: \"I like apples.\" มีความหมายว่าอย่างไร? 🍎",
      "en": "What does \"I like apples.\" mean? 🍎",
      "zh": "“I like apples.”是什么意思？🍎"
    },
    "illustration": "🍎 \"I like apples.\" 😋",
    "illustrationSubtitle": {
      "th": "Simple English sentence",
      "en": "Simple English sentence",
      "zh": "简单英语句型"
    },
    "options": [
      {
        "id": "opt-k3-eng-m6-1",
        "label": {
          "th": "ฉันชอบกินแอปเปิ้ล",
          "en": "I like apples",
          "zh": "我喜欢苹果"
        },
        "icon": "🍎"
      },
      {
        "id": "opt-k3-eng-m6-2",
        "label": {
          "th": "ฉันมีแอปเปิ้ลสีเขียว",
          "en": "I have green apples",
          "zh": "我有青苹果"
        },
        "icon": "🍏"
      },
      {
        "id": "opt-k3-eng-m6-3",
        "label": {
          "th": "ฉันกำลังซื้อแอปเปิ้ล",
          "en": "I am buying apples",
          "zh": "我在买苹果"
        },
        "icon": "🛒"
      }
    ],
    "correctOptionId": "opt-k3-eng-m6-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! \"I like apples.\" แปลว่า ฉันชอบกินแอปเปิ้ล 🍎",
      "en": "Super! \"I like apples.\" expresses fondness for apples 🍎",
      "zh": "答对了！“I like apples.”代表我喜欢苹果 🍎"
    }
  },
  {
    "id": "k3-eng-m7",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำถาม \"What is your name?\" มีความหมายว่าอย่างไรเอ่ย? 🙋",
      "en": "What does the question \"What is your name?\" ask? 🙋",
      "zh": "“What is your name?”问的是什么？🙋"
    },
    "illustration": "🙋 \"What is your name?\" 🏷️",
    "illustrationSubtitle": {
      "th": "Asking name",
      "en": "Asking name",
      "zh": "询问姓名"
    },
    "options": [
      {
        "id": "opt-k3-eng-m7-1",
        "label": {
          "th": "เธออายุเท่าไร",
          "en": "How old are you?",
          "zh": "你几岁？"
        },
        "icon": "🎂"
      },
      {
        "id": "opt-k3-eng-m7-2",
        "label": {
          "th": "เธอชื่ออะไร",
          "en": "What is your name?",
          "zh": "你叫什么名字？"
        },
        "icon": "🏷️"
      },
      {
        "id": "opt-k3-eng-m7-3",
        "label": {
          "th": "เธอสบายดีไหม",
          "en": "How are you?",
          "zh": "你身体好吗？"
        },
        "icon": "😊"
      }
    ],
    "correctOptionId": "opt-k3-eng-m7-2",
    "explanation": {
      "th": "เก่งมากจ้า! \"What is your name?\" แปลว่า เธอชื่ออะไรจ๊ะ 🏷️",
      "en": "Spot on! It asks for someone's name 🏷️",
      "zh": "真聪明！这句话是问对方叫什么名字 🏷️"
    }
  },
  {
    "id": "k3-eng-m8",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำตรงข้ามของ \"UP (ขึ้นข้างบน)\" คือคำว่าอะไรเอ่ย? ⬇️",
      "en": "What is the opposite of \"UP\"? ⬇️",
      "zh": "“UP (向上)”的反义词是什么？⬇️"
    },
    "illustration": "⬆️ UP vs ⬇️ ?",
    "illustrationSubtitle": {
      "th": "Opposites up and down",
      "en": "Opposites up and down",
      "zh": "相反词上下"
    },
    "options": [
      {
        "id": "opt-k3-eng-m8-1",
        "label": {
          "th": "IN",
          "en": "IN",
          "zh": "IN (里面)"
        },
        "icon": "📦"
      },
      {
        "id": "opt-k3-eng-m8-2",
        "label": {
          "th": "ON",
          "en": "ON",
          "zh": "ON (上面)"
        },
        "icon": "🔝"
      },
      {
        "id": "opt-k3-eng-m8-3",
        "label": {
          "th": "DOWN",
          "en": "DOWN",
          "zh": "DOWN (向下)"
        },
        "icon": "⬇️"
      }
    ],
    "correctOptionId": "opt-k3-eng-m8-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! UP (ขึ้น) ตรงข้ามกับ DOWN (ลง) ⬇️",
      "en": "Correct! DOWN is the opposite of UP ⬇️",
      "zh": "答对了！UP 的反义词是 DOWN (向下) ⬇️"
    }
  },
  {
    "id": "k3-eng-m9",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำว่า \"CLEAN (สะอาด)\" ตรงข้ามกับคำว่าอะไรเอ่ย? 🧼",
      "en": "What is the opposite of \"CLEAN\"? 🧼",
      "zh": "“CLEAN (干净)”的反义词是什么？🧼"
    },
    "illustration": "🧼 CLEAN vs 🧦 ?",
    "illustrationSubtitle": {
      "th": "Clean and dirty",
      "en": "Clean and dirty",
      "zh": "干净与脏"
    },
    "options": [
      {
        "id": "opt-k3-eng-m9-1",
        "label": {
          "th": "DIRTY (สกปรก)",
          "en": "DIRTY",
          "zh": "DIRTY (脏)"
        },
        "icon": "🧦"
      },
      {
        "id": "opt-k3-eng-m9-2",
        "label": {
          "th": "HOT (ร้อน)",
          "en": "HOT",
          "zh": "HOT (热)"
        },
        "icon": "🔥"
      },
      {
        "id": "opt-k3-eng-m9-3",
        "label": {
          "th": "SWEET (หวาน)",
          "en": "SWEET",
          "zh": "SWEET (甜)"
        },
        "icon": "🍬"
      }
    ],
    "correctOptionId": "opt-k3-eng-m9-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! CLEAN (สะอาด) ตรงข้ามกับ DIRTY (สกปรก) 🧼",
      "en": "Brilliant! DIRTY is the opposite of CLEAN 🧼",
      "zh": "真棒！CLEAN 的反义词是 DIRTY (脏) 🧼"
    }
  },
  {
    "id": "k3-eng-m10",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "สัตว์น้ำตัวโต พ่นน้ำได้ \"วาฬ\" ภาษาอังกฤษคือคำว่าอะไร? 🐳",
      "en": "Which ocean animal is \"Whale\" in English? 🐳",
      "zh": "鲸鱼用英语怎么说？🐳"
    },
    "illustration": "🐳 WHALE 🌊",
    "illustrationSubtitle": {
      "th": "Ocean whale",
      "en": "Ocean whale",
      "zh": "蓝鲸"
    },
    "options": [
      {
        "id": "opt-k3-eng-m10-1",
        "label": {
          "th": "SHARK",
          "en": "SHARK",
          "zh": "SHARK (鲨鱼)"
        },
        "icon": "🦈"
      },
      {
        "id": "opt-k3-eng-m10-2",
        "label": {
          "th": "WHALE",
          "en": "WHALE",
          "zh": "WHALE (鲸鱼)"
        },
        "icon": "🐳"
      },
      {
        "id": "opt-k3-eng-m10-3",
        "label": {
          "th": "CRAB",
          "en": "CRAB",
          "zh": "CRAB (螃蟹)"
        },
        "icon": "🦀"
      }
    ],
    "correctOptionId": "opt-k3-eng-m10-2",
    "explanation": {
      "th": "เก่งมากจ้า! WHALE คือปลาวาฬตัวยักษ์พ่นน้ำ 🐳",
      "en": "Spot on! WHALE is whale 🐳",
      "zh": "太好了！WHALE 是鲸鱼 🐳"
    }
  },
  {
    "id": "k3-eng-h1",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "เมื่อเห็นแสงแดดสดใสยามเช้า ควรทักทายคุณครูและเพื่อนๆ ว่าอย่างไร? ☀️",
      "en": "Which greeting is suitable on a sunny morning? ☀️",
      "zh": "清晨阳光明媚，该怎么向老师同学打招呼？☀️"
    },
    "illustration": "☀️ Morning Sunshine 🏫",
    "illustrationSubtitle": {
      "th": "Morning Greeting",
      "en": "Morning Greeting",
      "zh": "早安问候"
    },
    "options": [
      {
        "id": "opt-k3-eng-h1-1",
        "label": {
          "th": "Good night!",
          "en": "Good night!",
          "zh": "晚安！"
        },
        "icon": "🌙"
      },
      {
        "id": "opt-k3-eng-h1-2",
        "label": {
          "th": "Goodbye!",
          "en": "Goodbye!",
          "zh": "再见！"
        },
        "icon": "👋"
      },
      {
        "id": "opt-k3-eng-h1-3",
        "label": {
          "th": "Good morning!",
          "en": "Good morning!",
          "zh": "早上好！"
        },
        "icon": "☀️"
      }
    ],
    "correctOptionId": "opt-k3-eng-h1-3",
    "explanation": {
      "th": "เก่งมากจ้า! Good morning! แปลว่า อรุณสวัสดิ์ยามเช้า ☀️",
      "en": "Brilliant! Good morning! is the proper greeting ☀️",
      "zh": "答对了！Good morning 是早上好！☀️"
    }
  },
  {
    "id": "k3-eng-h2",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "ประโยค \"The cat is on the mat.\" หมายถึงสิ่งใดเอ่ย? 🐱",
      "en": "What does \"The cat is on the mat.\" mean? 🐱",
      "zh": "“The cat is on the mat.”是什么意思？🐱"
    },
    "illustration": "🐱 Cat ON Mat 🧶",
    "illustrationSubtitle": {
      "th": "Reading simple sentence",
      "en": "Reading simple sentence",
      "zh": "阅读短句"
    },
    "options": [
      {
        "id": "opt-k3-eng-h2-1",
        "label": {
          "th": "แมวนอนอยู่บนพรม",
          "en": "The cat is on the mat",
          "zh": "小猫在垫子上"
        },
        "icon": "🐱"
      },
      {
        "id": "opt-k3-eng-h2-2",
        "label": {
          "th": "สุนัขวิ่งอยู่ในสวน",
          "en": "The dog is in the garden",
          "zh": "小狗在花园里"
        },
        "icon": "🐶"
      },
      {
        "id": "opt-k3-eng-h2-3",
        "label": {
          "th": "นกเกาะอยู่บนต้นไม้",
          "en": "The bird is on the tree",
          "zh": "小鸟在树上"
        },
        "icon": "🐦"
      }
    ],
    "correctOptionId": "opt-k3-eng-h2-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! Cat (แมว) is on (อยู่บน) the mat (พรมเช็ดเท้า) 🐱",
      "en": "Spot on! It means the cat is on the mat 🐱",
      "zh": "完全正确！小猫在垫子上 🐱"
    }
  },
  {
    "id": "k3-eng-h3",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำถามนับจำนวน: \"How many stars? ⭐⭐⭐\" คำตอบคือข้อใด? ⭐",
      "en": "Count: \"How many stars? ⭐⭐⭐\"",
      "zh": "数一数：“How many stars? ⭐⭐⭐”一共有几颗星星？"
    },
    "illustration": "⭐⭐⭐ 3 STARS ✨",
    "illustrationSubtitle": {
      "th": "Counting question",
      "en": "Counting question",
      "zh": "数数提问"
    },
    "options": [
      {
        "id": "opt-k3-eng-h3-1",
        "label": {
          "th": "Two stars",
          "en": "Two stars",
          "zh": "两颗星星"
        },
        "icon": "2️⃣"
      },
      {
        "id": "opt-k3-eng-h3-2",
        "label": {
          "th": "Three stars",
          "en": "Three stars",
          "zh": "三颗星星"
        },
        "icon": "3️⃣"
      },
      {
        "id": "opt-k3-eng-h3-3",
        "label": {
          "th": "Four stars",
          "en": "Four stars",
          "zh": "四颗星星"
        },
        "icon": "4️⃣"
      }
    ],
    "correctOptionId": "opt-k3-eng-h3-2",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! One, Two, Three = Three stars 3 ดวง ⭐",
      "en": "Awesome! 1, 2, 3 = Three stars ⭐",
      "zh": "太棒了！一共是 3 颗星星 Three stars ⭐"
    }
  },
  {
    "id": "k3-eng-h4",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"FAST (รวดเร็ว)\" ตรงข้ามกับคำว่าอะไรเอ่ย? 🐢",
      "en": "What is the opposite of \"FAST\"? 🐢",
      "zh": "“FAST (快)”的反义词是什么？🐢"
    },
    "illustration": "⚡ FAST vs 🐢 ?",
    "illustrationSubtitle": {
      "th": "Fast and slow",
      "en": "Fast and slow",
      "zh": "快与慢"
    },
    "options": [
      {
        "id": "opt-k3-eng-h4-1",
        "label": {
          "th": "BIG (ใหญ่)",
          "en": "BIG",
          "zh": "大"
        },
        "icon": "🐘"
      },
      {
        "id": "opt-k3-eng-h4-2",
        "label": {
          "th": "HARD (แข็ง)",
          "en": "HARD",
          "zh": "硬"
        },
        "icon": "🪨"
      },
      {
        "id": "opt-k3-eng-h4-3",
        "label": {
          "th": "SLOW (ช้า)",
          "en": "SLOW",
          "zh": "慢"
        },
        "icon": "🐢"
      }
    ],
    "correctOptionId": "opt-k3-eng-h4-3",
    "explanation": {
      "th": "ถูกต้องจ้า! FAST (เร็วเหมือนสายฟ้า) ตรงข้ามกับ SLOW (เชื่องช้าเหมือนเต่า) 🐢",
      "en": "Correct! SLOW is the opposite of FAST 🐢",
      "zh": "答对了！FAST 的反义词是 SLOW (慢) 🐢"
    }
  },
  {
    "id": "k3-eng-h5",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำศัพท์สะกดคำ: B-O-O-K คือสิ่งของใดที่ช่วยให้เราฉลาดรอบรู้? 📚",
      "en": "Spelling word B-O-O-K: What gives us knowledge? 📚",
      "zh": "拼写单词 B-O-O-K：带给我们知识的是什么？📚"
    },
    "illustration": "B-O-O-K = ? 📖",
    "illustrationSubtitle": {
      "th": "Book of knowledge",
      "en": "Book of knowledge",
      "zh": "书本"
    },
    "options": [
      {
        "id": "opt-k3-eng-h5-1",
        "label": {
          "th": "BOOK (หนังสือ)",
          "en": "Book",
          "zh": "书本"
        },
        "icon": "📚"
      },
      {
        "id": "opt-k3-eng-h5-2",
        "label": {
          "th": "BAG (กระเป๋า)",
          "en": "Bag",
          "zh": "书包"
        },
        "icon": "🎒"
      },
      {
        "id": "opt-k3-eng-h5-3",
        "label": {
          "th": "DESK (โต๊ะเรียน)",
          "en": "Desk",
          "zh": "课桌"
        },
        "icon": "🪑"
      }
    ],
    "correctOptionId": "opt-k3-eng-h5-1",
    "explanation": {
      "th": "เก่งมากจ้า! B-O-O-K คือ BOOK หนังสือแสนรัก 📚",
      "en": "Super! B-O-O-K spells BOOK 📚",
      "zh": "真聪明！B-O-O-K 是书本 BOOK 📚"
    }
  },
  {
    "id": "k3-eng-h6",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำศัพท์ที่มีตัวอักษรพิมพ์ใหญ่ \"L\" ตรงกับสัตว์เจ้าป่าชนิดใด? 🦁",
      "en": "Which majestic wild animal begins with letter \"L\"? 🦁",
      "zh": "哪个丛林之王以字母“L”开头？🦁"
    },
    "illustration": "🦁 Letter L Animal 👑",
    "illustrationSubtitle": {
      "th": "L is for ... ?",
      "en": "L is for ... ?",
      "zh": "以字母 L 开头"
    },
    "options": [
      {
        "id": "opt-k3-eng-h6-1",
        "label": {
          "th": "TIGER",
          "en": "TIGER",
          "zh": "老虎"
        },
        "icon": "🐅"
      },
      {
        "id": "opt-k3-eng-h6-2",
        "label": {
          "th": "LION",
          "en": "LION",
          "zh": "狮子"
        },
        "icon": "🦁"
      },
      {
        "id": "opt-k3-eng-h6-3",
        "label": {
          "th": "BEAR",
          "en": "BEAR",
          "zh": "狗熊"
        },
        "icon": "🐻"
      }
    ],
    "correctOptionId": "opt-k3-eng-h6-2",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! L is for Lion เจ้าป่าสิงโต 🦁",
      "en": "Spot on! L is for Lion 🦁",
      "zh": "太棒了！L 代表狮子 Lion 🦁"
    }
  },
  {
    "id": "k3-eng-h7",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "ประโยคบอกลาเพื่อนๆ ก่อนกลับบ้าน ภาษาอังกฤษคือข้อใด? 👋",
      "en": "How do you say goodbye to friends before going home? 👋",
      "zh": "放学回家前向朋友告别怎么说？👋"
    },
    "illustration": "👋 Going home greeting 🏠",
    "illustrationSubtitle": {
      "th": "Goodbye friends",
      "en": "Goodbye friends",
      "zh": "再见告别"
    },
    "options": [
      {
        "id": "opt-k3-eng-h7-1",
        "label": {
          "th": "Good morning",
          "en": "Good morning",
          "zh": "早上好"
        },
        "icon": "🌅"
      },
      {
        "id": "opt-k3-eng-h7-2",
        "label": {
          "th": "Thank you",
          "en": "Thank you",
          "zh": "谢谢"
        },
        "icon": "🙏"
      },
      {
        "id": "opt-k3-eng-h7-3",
        "label": {
          "th": "See you tomorrow / Goodbye",
          "en": "See you tomorrow / Goodbye",
          "zh": "明天见 / 再见"
        },
        "icon": "👋"
      }
    ],
    "correctOptionId": "opt-k3-eng-h7-3",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! Goodbye / See you tomorrow แปลว่า บ๊ายบายเจอกันพรุ่งนี้นะ 👋",
      "en": "Brilliant! Goodbye / See you tomorrow is parting farewell 👋",
      "zh": "完全正确！再见，明天见 👋"
    }
  },
  {
    "id": "k3-eng-h8",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำสัมผัสคล้องจอง: คำว่า \"BED (เตียงนอน)\" สัมผัสเสียงกับคำใด? 🛏️",
      "en": "Which word rhymes with \"BED\"? 🛏️",
      "zh": "哪个单词和“BED”押韵？🛏️"
    },
    "illustration": "🛏️ BED rhymes with ... ? 🔴",
    "illustrationSubtitle": {
      "th": "Rhyming sounds -ed",
      "en": "Rhyming sounds -ed",
      "zh": "押韵词 -ed"
    },
    "options": [
      {
        "id": "opt-k3-eng-h8-1",
        "label": {
          "th": "RED (สีแดง)",
          "en": "RED",
          "zh": "红色"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k3-eng-h8-2",
        "label": {
          "th": "BLUE (สีฟ้า)",
          "en": "BLUE",
          "zh": "蓝色"
        },
        "icon": "🔵"
      },
      {
        "id": "opt-k3-eng-h8-3",
        "label": {
          "th": "PIG (หมู)",
          "en": "PIG",
          "zh": "小猪"
        },
        "icon": "🐷"
      }
    ],
    "correctOptionId": "opt-k3-eng-h8-1",
    "explanation": {
      "th": "เก่งมากจ้า! BED สัมผัสเสียงกับ RED (-ed sound) 🛏️🔴",
      "en": "Awesome! BED and RED rhyme together (-ed sound) 🛏️🔴",
      "zh": "答对了！BED 和 RED 押韵 (-ed) 🛏️🔴"
    }
  },
  {
    "id": "k3-eng-h9",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "ประโยค \"Open the door, please.\" มีความหมายว่าอย่างไรเอ่ย? 🚪",
      "en": "What does \"Open the door, please.\" mean? 🚪",
      "zh": "“Open the door, please.”是什么意思？🚪"
    },
    "illustration": "🚪 \"Open the door, please.\" 🔑",
    "illustrationSubtitle": {
      "th": "Polite classroom instruction",
      "en": "Polite classroom instruction",
      "zh": "礼貌指令"
    },
    "options": [
      {
        "id": "opt-k3-eng-h9-1",
        "label": {
          "th": "กรุณาปิดหน้าต่าง",
          "en": "Close the window",
          "zh": "请关窗户"
        },
        "icon": "🪟"
      },
      {
        "id": "opt-k3-eng-h9-2",
        "label": {
          "th": "กรุณาเปิดประตูครับ/ค่ะ",
          "en": "Open the door, please",
          "zh": "请开门"
        },
        "icon": "🚪"
      },
      {
        "id": "opt-k3-eng-h9-3",
        "label": {
          "th": "กรุณานั่งลง",
          "en": "Sit down, please",
          "zh": "请坐下"
        },
        "icon": "🪑"
      }
    ],
    "correctOptionId": "opt-k3-eng-h9-2",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! Open (เปิด) the door (ประตู) please (ได้โปรด/กรุณา) 🚪",
      "en": "Spot on! It politely asks to open the door 🚪",
      "zh": "真棒！请开门的意思 🚪"
    }
  },
  {
    "id": "k3-eng-h10",
    "grade": "K3",
    "subject": "english",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "เวลาคุณหมอตรวจฟัน และบอกว่า \"Open your mouth.\" หนูควรทำอย่างไร? 👄",
      "en": "When dentist says \"Open your mouth.\", what should you do? 👄",
      "zh": "牙医说“Open your mouth.”时，你应该怎么做？👄"
    },
    "illustration": "👄 \"Open your mouth.\" 🩺",
    "illustrationSubtitle": {
      "th": "Understanding English instructions",
      "en": "Understanding English instructions",
      "zh": "听从英语指令"
    },
    "options": [
      {
        "id": "opt-k3-eng-h10-1",
        "label": {
          "th": "หลับตาสองข้าง",
          "en": "Close your eyes",
          "zh": "闭上眼睛"
        },
        "icon": "🙈"
      },
      {
        "id": "opt-k3-eng-h10-2",
        "label": {
          "th": "ส่ายศีรษะ",
          "en": "Shake your head",
          "zh": "摇摇头"
        },
        "icon": "👧"
      },
      {
        "id": "opt-k3-eng-h10-3",
        "label": {
          "th": "อ้าปากกว้างๆ ให้คุณหมอดูฟัน",
          "en": "Open your mouth wide",
          "zh": "张开大嘴巴"
        },
        "icon": "👄"
      }
    ],
    "correctOptionId": "opt-k3-eng-h10-3",
    "explanation": {
      "th": "เก่งมากจ้า! \"Open your mouth.\" แปลว่า อ้าปากกว้างๆ จ้า 👄",
      "en": "Perfect! \"Open your mouth.\" means open mouth wide 👄",
      "zh": "太棒了！“Open your mouth.”是张大嘴巴 👄"
    }
  }
];
