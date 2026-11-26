import { Question } from '../types';

/**
 * คลังข้อสอบภาษาไทยปฐมวัย (Thai Language Mastery: พยัญชนะ สระ วรรณยุกต์ คำคล้องจอง)
 * ครบ 3 ระดับชั้น (K1, K2, K3) x 3 ระดับความยาก (ง่าย, ปานกลาง, ท้าทาย) x 10 ข้อ = 90 ข้อ
 */
export const QUESTIONS_THAI: Question[] = [
  {
    "id": "k1-thai-e1",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "พยัญชนะไทยตัวแรกของพยัญชนะ 44 ตัว คือตัวใดเอ่ย? 🐔",
      "en": "Which is the very first Thai consonant? 🐔",
      "zh": "44个泰文字母中的第一个是什么？🐔"
    },
    "illustration": "🐔 ก ไก่ 🐔",
    "illustrationSubtitle": {
      "th": "ก ไก่ กุ๊กกุ๊ก",
      "en": "Gor Kai",
      "zh": "字母 ก"
    },
    "options": [
      {
        "id": "opt-k1-thai-e1-1",
        "label": {
          "th": "ก (ก ไก่)",
          "en": "ก (Gor Kai)",
          "zh": "ก (小鸡)"
        },
        "icon": "🐔"
      },
      {
        "id": "opt-k1-thai-e1-2",
        "label": {
          "th": "ข (ข ไข่)",
          "en": "ข (Khor Khai)",
          "zh": "ข (鸡蛋)"
        },
        "icon": "🥚"
      },
      {
        "id": "opt-k1-thai-e1-3",
        "label": {
          "th": "ค (ค ควาย)",
          "en": "ค (Khor Khwai)",
          "zh": "ค (水牛)"
        },
        "icon": "🐃"
      }
    ],
    "correctOptionId": "opt-k1-thai-e1-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! ก ไก่ คือพยัญชนะตัวแรกในภาษาไทย 🐔",
      "en": "Correct! ก (Gor Kai) is the first Thai consonant 🐔",
      "zh": "答对了！ก 是泰文第一个字母 🐔"
    }
  },
  {
    "id": "k1-thai-e2",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "ภาพนี้ตรงกับพยัญชนะไทยตัวใดเอ่ย? 🥚",
      "en": "Which Thai consonant matches this egg picture? 🥚",
      "zh": "这张鸡蛋图片对应哪个泰文字母？🥚"
    },
    "illustration": "🥚 ข ไข่ ในเล้า 🥚",
    "illustrationSubtitle": {
      "th": "ข ไข่",
      "en": "Khor Khai",
      "zh": "字母 ข"
    },
    "options": [
      {
        "id": "opt-k1-thai-e2-1",
        "label": {
          "th": "ก (ก ไก่)",
          "en": "ก",
          "zh": "ก"
        },
        "icon": "🐔"
      },
      {
        "id": "opt-k1-thai-e2-2",
        "label": {
          "th": "ข (ข ไข่)",
          "en": "ข",
          "zh": "ข"
        },
        "icon": "🥚"
      },
      {
        "id": "opt-k1-thai-e2-3",
        "label": {
          "th": "ช (ช ช้าง)",
          "en": "ช",
          "zh": "ช"
        },
        "icon": "🐘"
      }
    ],
    "correctOptionId": "opt-k1-thai-e2-2",
    "explanation": {
      "th": "เก่งมากจ้า! ข ไข่ อยู่ในเล้า 🥚",
      "en": "Great! ข (Khor Khai) represents egg 🥚",
      "zh": "太棒了！ข 代表鸡蛋 🥚"
    }
  },
  {
    "id": "k1-thai-e3",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "พยัญชนะไทยตัวนี้คือตัวอะไรเอ่ย? \"ง\"",
      "en": "Which Thai consonant is this? \"ง\"",
      "zh": "这个泰文字母是什么？“ง”"
    },
    "illustration": "🐍 ง งู ใจกล้า 🐍",
    "illustrationSubtitle": {
      "th": "ง งู",
      "en": "Ngor Ngu",
      "zh": "字母 ง"
    },
    "options": [
      {
        "id": "opt-k1-thai-e3-1",
        "label": {
          "th": "จ (จ จาน)",
          "en": "จ",
          "zh": "จ"
        },
        "icon": "🍽️"
      },
      {
        "id": "opt-k1-thai-e3-2",
        "label": {
          "th": "ค (ค ควาย)",
          "en": "ค",
          "zh": "ค"
        },
        "icon": "🐃"
      },
      {
        "id": "opt-k1-thai-e3-3",
        "label": {
          "th": "ง (ง งู)",
          "en": "ง",
          "zh": "ง"
        },
        "icon": "🐍"
      }
    ],
    "correctOptionId": "opt-k1-thai-e3-3",
    "explanation": {
      "th": "ถูกต้องจ้า! ง งู ใจกล้า เลื้อยไว 🐍",
      "en": "Spot on! ง (Ngor Ngu) is snake 🐍",
      "zh": "真聪明！ง 是蛇 🐍"
    }
  },
  {
    "id": "k1-thai-e4",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "ภาพนี้คือ \"จาน\" ใส่อาหาร ตรงกับพยัญชนะตัวใด? 🍽️",
      "en": "Which consonant matches a plate? 🍽️",
      "zh": "盘子对应哪个泰文字母？🍽️"
    },
    "illustration": "🍽️ จ จาน ใช้ดี 🍽️",
    "illustrationSubtitle": {
      "th": "จ จาน",
      "en": "Jor Jan",
      "zh": "字母 จ"
    },
    "options": [
      {
        "id": "opt-k1-thai-e4-1",
        "label": {
          "th": "จ (จ จาน)",
          "en": "จ",
          "zh": "จ"
        },
        "icon": "🍽️"
      },
      {
        "id": "opt-k1-thai-e4-2",
        "label": {
          "th": "ฉ (ฉ ฉิ่ง)",
          "en": "ฉ",
          "zh": "ฉ"
        },
        "icon": "🎵"
      },
      {
        "id": "opt-k1-thai-e4-3",
        "label": {
          "th": "ด (ด เด็ก)",
          "en": "ด",
          "zh": "ด"
        },
        "icon": "👶"
      }
    ],
    "correctOptionId": "opt-k1-thai-e4-1",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! จ จาน ใช้ใส่อาหารแสนอร่อย 🍽️",
      "en": "Awesome! จ (Jor Jan) matches plate 🍽️",
      "zh": "答对了！จ 代表盘子 🍽️"
    }
  },
  {
    "id": "k1-thai-e5",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "สระเสียงยาวสระนี้ มีชื่อเรียกว่าสระอะไรเอ่ย? \"-า\"",
      "en": "What is the name of this Thai long vowel? \"-า\"",
      "zh": "这个泰文长元音叫什么名字？“-า”"
    },
    "illustration": "✨ สระ อา (-า) ✨",
    "illustrationSubtitle": {
      "th": "สระ อา ลากข้าง",
      "en": "Vowel Ah",
      "zh": "元音 อา"
    },
    "options": [
      {
        "id": "opt-k1-thai-e5-1",
        "label": {
          "th": "สระ อะ (-ะ)",
          "en": "Sara Ah (Short)",
          "zh": "短元音 ะ"
        },
        "icon": "⚡"
      },
      {
        "id": "opt-k1-thai-e5-2",
        "label": {
          "th": "สระ อา (-า)",
          "en": "Sara Ah (Long)",
          "zh": "长元音 า"
        },
        "icon": "✨"
      },
      {
        "id": "opt-k1-thai-e5-3",
        "label": {
          "th": "สระ อี (-ี)",
          "en": "Sara Ee",
          "zh": "元音 ี"
        },
        "icon": "👑"
      }
    ],
    "correctOptionId": "opt-k1-thai-e5-2",
    "explanation": {
      "th": "เก่งมากจ้า! สระ อา ลากข้าง ออกเสียง อา 🗣️",
      "en": "Brilliant! สระ อา (-า) is long vowel Ah 🗣️",
      "zh": "真棒！这是长元音 อา 🗣️"
    }
  },
  {
    "id": "k1-thai-e6",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "พยัญชนะตัวใดที่คู่กับสัตว์ตัวโต มีงวงและงา? 🐘",
      "en": "Which consonant matches the elephant with a trunk? 🐘",
      "zh": "大象对应哪个泰文字母？🐘"
    },
    "illustration": "🐘 ช ช้าง ตัวโต 🐘",
    "illustrationSubtitle": {
      "th": "ช ช้าง วิ่งหนี",
      "en": "Chor Chang",
      "zh": "字母 ช"
    },
    "options": [
      {
        "id": "opt-k1-thai-e6-1",
        "label": {
          "th": "ต (ต เต่า)",
          "en": "ต",
          "zh": "ต"
        },
        "icon": "🐢"
      },
      {
        "id": "opt-k1-thai-e6-2",
        "label": {
          "th": "บ (บ ใบไม้)",
          "en": "บ",
          "zh": "บ"
        },
        "icon": "🍃"
      },
      {
        "id": "opt-k1-thai-e6-3",
        "label": {
          "th": "ช (ช ช้าง)",
          "en": "ช",
          "zh": "ช"
        },
        "icon": "🐘"
      }
    ],
    "correctOptionId": "opt-k1-thai-e6-3",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! ช ช้าง ตัวโตวิ่งหนี 🐘",
      "en": "Spot on! ช (Chor Chang) matches elephant 🐘",
      "zh": "答对了！ช 代表大象 🐘"
    }
  },
  {
    "id": "k1-thai-e7",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "เมื่อคุณครูนำ ก + สระ อา = ? อ่านว่าอะไรเอ่ย? 🗣️",
      "en": "Blend consonant Gor + vowel Ah: ก + -า = ?",
      "zh": "拼读：ก + -า 读作什么？"
    },
    "illustration": "ก + -า = กา 🐦",
    "illustrationSubtitle": {
      "th": "การประสมคำ",
      "en": "Word blending",
      "zh": "拼音"
    },
    "options": [
      {
        "id": "opt-k1-thai-e7-1",
        "label": {
          "th": "กา",
          "en": "Ka (Crow / Kettle)",
          "zh": "嘎 (乌鸦)"
        },
        "icon": "🐦"
      },
      {
        "id": "opt-k1-thai-e7-2",
        "label": {
          "th": "ขา",
          "en": "Kha (Leg)",
          "zh": "卡 (腿)"
        },
        "icon": "🦵"
      },
      {
        "id": "opt-k1-thai-e7-3",
        "label": {
          "th": "มา",
          "en": "Ma (Come)",
          "zh": "马 (来)"
        },
        "icon": "🏃"
      }
    ],
    "correctOptionId": "opt-k1-thai-e7-1",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ก ไก่ สระ อา อ่านว่า กา (ก-อา-กา) 🐦",
      "en": "Super! ก + -า spells กา (Ka) 🐦",
      "zh": "太棒了！ก-า 拼读为 กา 🐦"
    }
  },
  {
    "id": "k1-thai-e8",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "ภาพสัตว์กระดองแข็ง ว่ายน้ำช้าๆ ตรงกับพยัญชนะตัวใด? 🐢",
      "en": "Which consonant matches the slow-swimming turtle? 🐢",
      "zh": "乌龟对应哪个泰文字母？🐢"
    },
    "illustration": "🐢 ต เต่า หลังตุง 🐢",
    "illustrationSubtitle": {
      "th": "ต เต่า",
      "en": "Tor Tao",
      "zh": "字母 ต"
    },
    "options": [
      {
        "id": "opt-k1-thai-e8-1",
        "label": {
          "th": "ด (ด เด็ก)",
          "en": "ด",
          "zh": "ด"
        },
        "icon": "👶"
      },
      {
        "id": "opt-k1-thai-e8-2",
        "label": {
          "th": "ต (ต เต่า)",
          "en": "ต",
          "zh": "ต"
        },
        "icon": "🐢"
      },
      {
        "id": "opt-k1-thai-e8-3",
        "label": {
          "th": "ถ (ถ ถุง)",
          "en": "ถ",
          "zh": "ถ"
        },
        "icon": "🛍️"
      }
    ],
    "correctOptionId": "opt-k1-thai-e8-2",
    "explanation": {
      "th": "เก่งมากจ้า! ต เต่า หลังตุง 🐢",
      "en": "Correct! ต (Tor Tao) is turtle 🐢",
      "zh": "真聪明！ต 代表乌龟 🐢"
    }
  },
  {
    "id": "k1-thai-e9",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "พยัญชนะไทยตัวนี้คือตัวอะไรเอ่ย? \"ม\"",
      "en": "Which Thai consonant is this? \"ม\"",
      "zh": "这个泰文字母是什么？“ม”"
    },
    "illustration": "🐴 ม ม้า คึกคัก 🐴",
    "illustrationSubtitle": {
      "th": "ม ม้า",
      "en": "Mor Ma",
      "zh": "字母 ม"
    },
    "options": [
      {
        "id": "opt-k1-thai-e9-1",
        "label": {
          "th": "ย (ย ยักษ์)",
          "en": "ย",
          "zh": "ย"
        },
        "icon": "👹"
      },
      {
        "id": "opt-k1-thai-e9-2",
        "label": {
          "th": "ร (ร เรือ)",
          "en": "ร",
          "zh": "ร"
        },
        "icon": "⛵"
      },
      {
        "id": "opt-k1-thai-e9-3",
        "label": {
          "th": "ม (ม ม้า)",
          "en": "ม",
          "zh": "ม"
        },
        "icon": "🐴"
      }
    ],
    "correctOptionId": "opt-k1-thai-e9-3",
    "explanation": {
      "th": "ถูกต้องจ้า! ม ม้า วิ่งคึกคัก 🐴",
      "en": "Awesome! ม (Mor Ma) is horse 🐴",
      "zh": "太好了！ม 代表马 🐴"
    }
  },
  {
    "id": "k1-thai-e10",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "ภาพใบไม้สีเขียว ตรงกับพยัญชนะไทยตัวใดเอ่ย? 🍃",
      "en": "Which consonant matches a green leaf? 🍃",
      "zh": "树叶对应哪个泰文字母？🍃"
    },
    "illustration": "🍃 บ ใบไม้ ทับถม 🍃",
    "illustrationSubtitle": {
      "th": "บ ใบไม้",
      "en": "Bor Baimai",
      "zh": "字母 บ"
    },
    "options": [
      {
        "id": "opt-k1-thai-e10-1",
        "label": {
          "th": "บ (บ ใบไม้)",
          "en": "บ",
          "zh": "บ"
        },
        "icon": "🍃"
      },
      {
        "id": "opt-k1-thai-e10-2",
        "label": {
          "th": "ป (ป ปลา)",
          "en": "ป",
          "zh": "ป"
        },
        "icon": "🐟"
      },
      {
        "id": "opt-k1-thai-e10-3",
        "label": {
          "th": "ผ (ผ ผึ้ง)",
          "en": "ผ",
          "zh": "ผ"
        },
        "icon": "🐝"
      }
    ],
    "correctOptionId": "opt-k1-thai-e10-1",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! บ ใบไม้ สีเขียวขจี 🍃",
      "en": "Spot on! บ (Bor Baimai) is leaf 🍃",
      "zh": "答对了！บ 代表树叶 🍃"
    }
  },
  {
    "id": "k1-thai-m1",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "พยัญชนะตัวใดมีหางยาวชี้ขึ้นข้างบน? \"ป ปลา\" 🐟",
      "en": "Which letter has a long tail pointing upwards? \"ป\"",
      "zh": "哪个字母有向上伸的长尾巴？“ป”"
    },
    "illustration": "🐟 ป ปลา ตากลม 🐟",
    "illustrationSubtitle": {
      "th": "ป ปลา หางยาว",
      "en": "Por Pla",
      "zh": "字母 ป"
    },
    "options": [
      {
        "id": "opt-k1-thai-m1-1",
        "label": {
          "th": "บ (บ ใบไม้)",
          "en": "บ",
          "zh": "บ"
        },
        "icon": "🍃"
      },
      {
        "id": "opt-k1-thai-m1-2",
        "label": {
          "th": "ป (ป ปลา)",
          "en": "ป",
          "zh": "ป"
        },
        "icon": "🐟"
      },
      {
        "id": "opt-k1-thai-m1-3",
        "label": {
          "th": "ข (ข ไข่)",
          "en": "ข",
          "zh": "ข"
        },
        "icon": "🥚"
      }
    ],
    "correctOptionId": "opt-k1-thai-m1-2",
    "explanation": {
      "th": "เก่งมากจ้า! ป ปลา ลากหางยาวชี้ขึ้นด้านบน 🐟",
      "en": "Great! ป (Por Pla) has an upward tall stem 🐟",
      "zh": "真聪明！ป 的尾巴长长地向上伸 🐟"
    }
  },
  {
    "id": "k1-thai-m2",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "สระตัวนี้อยู่ข้างบน มีรูปเหมือนร่ม มีชื่อว่าสระอะไร? \"-ิ\"",
      "en": "What is this top vowel shaped like a tiny umbrella? \"-ิ\"",
      "zh": "这个像小伞一样在上面的元音叫什么？“-ิ”"
    },
    "illustration": "☂️ สระ อิ (-ิ) ☂️",
    "illustrationSubtitle": {
      "th": "สระ อิ อยู่ข้างบน",
      "en": "Vowel Ih",
      "zh": "元音 อิ"
    },
    "options": [
      {
        "id": "opt-k1-thai-m2-1",
        "label": {
          "th": "สระ อะ (-ะ)",
          "en": "Sara Ah",
          "zh": "短元音 ะ"
        },
        "icon": "⚡"
      },
      {
        "id": "opt-k1-thai-m2-2",
        "label": {
          "th": "สระ อู (-ู)",
          "en": "Sara Oo",
          "zh": "元音 ู"
        },
        "icon": "🐌"
      },
      {
        "id": "opt-k1-thai-m2-3",
        "label": {
          "th": "สระ อิ (-ิ)",
          "en": "Sara Ih",
          "zh": "短元音 ิ"
        },
        "icon": "☂️"
      }
    ],
    "correctOptionId": "opt-k1-thai-m2-3",
    "explanation": {
      "th": "ถูกต้องจ้า! สระ อิ อยู่ข้างบนพยัญชนะ ไม่มีขีด ☂️",
      "en": "Correct! สระ อิ (-ิ) sits on top ☂️",
      "zh": "答对了！这是上面的短元音 อิ ☂️"
    }
  },
  {
    "id": "k1-thai-m3",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "นำ ต + สระ อา = ? เป็นคำว่าอะไรเอ่ย มีไว้ดูสิ่งต่างๆ 👀",
      "en": "Blend Tor + Vowel Ah: ต + -า = ? (used for seeing)",
      "zh": "拼读：ต + -า = ？（用来观察事物）"
    },
    "illustration": "ต + -า = ตา 👀",
    "illustrationSubtitle": {
      "th": "คำว่า ตา",
      "en": "Word Ta (Eyes)",
      "zh": "眼睛 ตา"
    },
    "options": [
      {
        "id": "opt-k1-thai-m3-1",
        "label": {
          "th": "ตา (ดวงตา)",
          "en": "Ta (Eye)",
          "zh": "眼睛 (ตา)"
        },
        "icon": "👀"
      },
      {
        "id": "opt-k1-thai-m3-2",
        "label": {
          "th": "กา (กาน้ำ)",
          "en": "Ka (Kettle)",
          "zh": "水壶 (กา)"
        },
        "icon": "🫖"
      },
      {
        "id": "opt-k1-thai-m3-3",
        "label": {
          "th": "มา (มานี่)",
          "en": "Ma (Come)",
          "zh": "过来 (มา)"
        },
        "icon": "🏃"
      }
    ],
    "correctOptionId": "opt-k1-thai-m3-1",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ต-อา-ตา คือดวงตาสำหรับมองดู 👀",
      "en": "Awesome! ต + -า spells ตา (Eye) 👀",
      "zh": "太棒了！ต + -า 是眼睛 ตา 👀"
    }
  },
  {
    "id": "k1-thai-m4",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "พยัญชนะตัวใดมีเสียงร้องขยัน \"หึ่งๆ บินตอมดอกไม้\"? 🐝",
      "en": "Which consonant represents the busy bee? 🐝",
      "zh": "哪只勤劳采蜜的小蜜蜂对应哪个字母？🐝"
    },
    "illustration": "🐝 ผ ผึ้ง ทำรัง 🐝",
    "illustrationSubtitle": {
      "th": "ผ ผึ้ง",
      "en": "Phor Phueng",
      "zh": "字母 ผ"
    },
    "options": [
      {
        "id": "opt-k1-thai-m4-1",
        "label": {
          "th": "ฝ (ฝ ฝา)",
          "en": "ฝ",
          "zh": "ฝ"
        },
        "icon": "🍲"
      },
      {
        "id": "opt-k1-thai-m4-2",
        "label": {
          "th": "ผ (ผ ผึ้ง)",
          "en": "ผ",
          "zh": "ผ"
        },
        "icon": "🐝"
      },
      {
        "id": "opt-k1-thai-m4-3",
        "label": {
          "th": "ฟ (ฟ ฟัน)",
          "en": "ฟ",
          "zh": "ฟ"
        },
        "icon": "🦷"
      }
    ],
    "correctOptionId": "opt-k1-thai-m4-2",
    "explanation": {
      "th": "เก่งมากจ้า! ผ ผึ้ง ขยันทำรังหาน้ำหวาน 🐝",
      "en": "Spot on! ผ (Phor Phueng) matches bee 🐝",
      "zh": "真棒！ผ 代表小蜜蜂 🐝"
    }
  },
  {
    "id": "k1-thai-m5",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "สระตัวนี้อยู่ข้างใต้พยัญชนะ เหมือนตัว ข เล็กๆ คือสระอะไร? \"-ู\"",
      "en": "What is the vowel under the consonant that looks like a small Khor? \"-ู\"",
      "zh": "在字母下方像小 ข 一样的元音是什么？“-ู”"
    },
    "illustration": "🐌 สระ อู (-ู) 🐌",
    "illustrationSubtitle": {
      "th": "สระ อู อยู่ข้างล่าง",
      "en": "Vowel Oo",
      "zh": "元音 อู"
    },
    "options": [
      {
        "id": "opt-k1-thai-m5-1",
        "label": {
          "th": "สระ อา (-า)",
          "en": "Sara Ah",
          "zh": "元音 า"
        },
        "icon": "✨"
      },
      {
        "id": "opt-k1-thai-m5-2",
        "label": {
          "th": "สระ อิ (-ิ)",
          "en": "Sara Ih",
          "zh": "元音 ิ"
        },
        "icon": "☂️"
      },
      {
        "id": "opt-k1-thai-m5-3",
        "label": {
          "th": "สระ อู (-ู)",
          "en": "Sara Oo",
          "zh": "长元音 ู"
        },
        "icon": "🐌"
      }
    ],
    "correctOptionId": "opt-k1-thai-m5-3",
    "explanation": {
      "th": "ถูกต้องจ้า! สระ อู ลากเสียงยาว อยู่ใต้พยัญชนะ 🐌",
      "en": "Brilliant! สระ อู (-ู) sits below the consonant 🐌",
      "zh": "答对了！这是在下方的长元音 อู 🐌"
    }
  },
  {
    "id": "k1-thai-m6",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "นำ ป + สระ อู = ? สัตว์น้ำมีก้ามเดินเปะปะ 🦀",
      "en": "Blend Por + Vowel Oo: ป + -ู = ? (claw animal)",
      "zh": "拼读：ป + -ู = ？（有螯的小动物）"
    },
    "illustration": "ป + -ู = ปู 🦀",
    "illustrationSubtitle": {
      "th": "คำว่า ปู",
      "en": "Word Poo (Crab)",
      "zh": "螃蟹 ปู"
    },
    "options": [
      {
        "id": "opt-k1-thai-m6-1",
        "label": {
          "th": "ปู (ปูทะเล)",
          "en": "Poo (Crab)",
          "zh": "螃蟹 (ปู)"
        },
        "icon": "🦀"
      },
      {
        "id": "opt-k1-thai-m6-2",
        "label": {
          "th": "งู (งูเลื้อย)",
          "en": "Ngoo (Snake)",
          "zh": "蛇 (งู)"
        },
        "icon": "🐍"
      },
      {
        "id": "opt-k1-thai-m6-3",
        "label": {
          "th": "ดู (มองดู)",
          "en": "Doo (Look)",
          "zh": "看 (ดู)"
        },
        "icon": "👀"
      }
    ],
    "correctOptionId": "opt-k1-thai-m6-1",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ป-อู-ปู คือปูทะเลมีก้าม 🦀",
      "en": "Super! ป + -ู spells ปู (Crab) 🦀",
      "zh": "太好了！ป + -ู 是螃蟹 ปู 🦀"
    }
  },
  {
    "id": "k1-thai-m7",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "พยัญชนะตัวใดที่มีหัวหยักเหมือน ด เด็ก แต่มีหยักบนหัว? \"ต เต่า\" 🐢",
      "en": "Which consonant has a dented head? \"ต\"",
      "zh": "哪个字母头上带凹折？“ต”"
    },
    "illustration": "🐢 ด เด็ก vs ต เต่า 🐢",
    "illustrationSubtitle": {
      "th": "เปรียบเทียบ ด และ ต",
      "en": "Dented head Tor",
      "zh": "凹头字母 ต"
    },
    "options": [
      {
        "id": "opt-k1-thai-m7-1",
        "label": {
          "th": "ด (ด เด็ก หัวกลม)",
          "en": "ด (Dor Dek)",
          "zh": "ด (小孩子)"
        },
        "icon": "👶"
      },
      {
        "id": "opt-k1-thai-m7-2",
        "label": {
          "th": "ต (ต เต่า หัวหยัก)",
          "en": "ต (Tor Tao)",
          "zh": "ต (小乌龟)"
        },
        "icon": "🐢"
      },
      {
        "id": "opt-k1-thai-m7-3",
        "label": {
          "th": "ค (ค ควาย)",
          "en": "ค (Khor Khwai)",
          "zh": "ค (水牛)"
        },
        "icon": "🐃"
      }
    ],
    "correctOptionId": "opt-k1-thai-m7-2",
    "explanation": {
      "th": "เก่งมากจ้า! ต เต่า หัวหยัก ส่วน ด เด็ก หัวมน 🐢",
      "en": "Spot on! ต has a notched head while ด is smooth 🐢",
      "zh": "真聪明！ต เต่า 头上有折，ด เด็ก 没有 🐢"
    }
  },
  {
    "id": "k1-thai-m8",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "สระตัวนี้อยู่ข้างบน มี 1 ขีดเหมือนหมวกติดขนนก คือสระอะไร? \"-ี\"",
      "en": "Which top vowel has one upright stroke on top? \"-ี\"",
      "zh": "上面带一竖像小羽毛帽子的元音叫什么？“-ี”"
    },
    "illustration": "👑 สระ อี (-ี) 👑",
    "illustrationSubtitle": {
      "th": "สระ อี มีหนึ่งขีด",
      "en": "Vowel Ee",
      "zh": "长元音 อี"
    },
    "options": [
      {
        "id": "opt-k1-thai-m8-1",
        "label": {
          "th": "สระ อะ (-ะ)",
          "en": "Sara Ah",
          "zh": "短元音 ะ"
        },
        "icon": "⚡"
      },
      {
        "id": "opt-k1-thai-m8-2",
        "label": {
          "th": "สระ อิ (-ิ)",
          "en": "Sara Ih",
          "zh": "短元音 ิ"
        },
        "icon": "☂️"
      },
      {
        "id": "opt-k1-thai-m8-3",
        "label": {
          "th": "สระ อี (-ี)",
          "en": "Sara Ee",
          "zh": "长元音 ี"
        },
        "icon": "👑"
      }
    ],
    "correctOptionId": "opt-k1-thai-m8-3",
    "explanation": {
      "th": "ถูกต้องจ้า! สระ อี มี 1 ขีด ลากเสียงยาว (อี) 👑",
      "en": "Correct! สระ อี (-ี) has one stroke and sounds long Ee 👑",
      "zh": "答对了！上面带一竖的是长元音 อี 👑"
    }
  },
  {
    "id": "k1-thai-m9",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "นำ ม + สระ อี = ? แปลว่าสิ่งของอยู่ในมือเรา 🤲",
      "en": "Blend Mor + Vowel Ee: ม + -ี = ? (to have / possess)",
      "zh": "拼读：ม + -ี = ？（代表拥有）"
    },
    "illustration": "ม + -ี = มี 🤲",
    "illustrationSubtitle": {
      "th": "คำว่า มี",
      "en": "Word Mee (Have)",
      "zh": "拥有 มี"
    },
    "options": [
      {
        "id": "opt-k1-thai-m9-1",
        "label": {
          "th": "มี (มีของ)",
          "en": "Mee (Have)",
          "zh": "有 (มี)"
        },
        "icon": "🤲"
      },
      {
        "id": "opt-k1-thai-m9-2",
        "label": {
          "th": "ดี (คนดี)",
          "en": "Dee (Good)",
          "zh": "好 (ดี)"
        },
        "icon": "👍"
      },
      {
        "id": "opt-k1-thai-m9-3",
        "label": {
          "th": "ตี (ตีกลอง)",
          "en": "Tee (Hit)",
          "zh": "打 (ตี)"
        },
        "icon": "🥁"
      }
    ],
    "correctOptionId": "opt-k1-thai-m9-1",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ม-อี-มี เช่น ฉันมีดินสอ 🤲",
      "en": "Awesome! ม + -ี spells มี (Mee - to have) 🤲",
      "zh": "太棒了！ม + -ี 读作 มี (拥有) 🤲"
    }
  },
  {
    "id": "k1-thai-m10",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "พยัญชนะไทยตัวใดที่พายแล่นในแม่น้ำลำคลอง? ⛵",
      "en": "Which consonant represents a boat sailing on water? ⛵",
      "zh": "在河流里航行的帆船对应哪个泰文字母？⛵"
    },
    "illustration": "⛵ ร เรือ พายไป ⛵",
    "illustrationSubtitle": {
      "th": "ร เรือ",
      "en": "Ror Ruea",
      "zh": "字母 ร"
    },
    "options": [
      {
        "id": "opt-k1-thai-m10-1",
        "label": {
          "th": "ว (ว แหวน)",
          "en": "ว",
          "zh": "ว"
        },
        "icon": "💍"
      },
      {
        "id": "opt-k1-thai-m10-2",
        "label": {
          "th": "ร (ร เรือ)",
          "en": "ร",
          "zh": "ร"
        },
        "icon": "⛵"
      },
      {
        "id": "opt-k1-thai-m10-3",
        "label": {
          "th": "ล (ล ลิง)",
          "en": "ล",
          "zh": "ล"
        },
        "icon": "🐒"
      }
    ],
    "correctOptionId": "opt-k1-thai-m10-2",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! ร เรือ พายไปในสายน้ำ ⛵",
      "en": "Brilliant! ร (Ror Ruea) is boat ⛵",
      "zh": "答对了！ร 代表小船 ⛵"
    }
  },
  {
    "id": "k1-thai-h1",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำคล้องจอง: \"กา\" คล้องจองสัมผัสสระกับคำใดเอ่ย? 🐦",
      "en": "Which word rhymes with \"กา\" (Ka)? 🐦",
      "zh": "哪个词和“กา”押韵？🐦"
    },
    "illustration": "🐦 กา คล้องจองกับ ... ? 👀",
    "illustrationSubtitle": {
      "th": "คำคล้องจองสระ อา",
      "en": "Rhyming with Ka",
      "zh": "押韵词"
    },
    "options": [
      {
        "id": "opt-k1-thai-h1-1",
        "label": {
          "th": "ปู (สระอู)",
          "en": "Poo",
          "zh": "螃蟹"
        },
        "icon": "🦀"
      },
      {
        "id": "opt-k1-thai-h1-2",
        "label": {
          "th": "ดี (สระอี)",
          "en": "Dee",
          "zh": "好"
        },
        "icon": "👍"
      },
      {
        "id": "opt-k1-thai-h1-3",
        "label": {
          "th": "ตา (สระอา)",
          "en": "Ta",
          "zh": "眼睛"
        },
        "icon": "👀"
      }
    ],
    "correctOptionId": "opt-k1-thai-h1-3",
    "explanation": {
      "th": "เก่งมากจ้า! กา กับ ตา ใช้สระ อา เหมือนกัน จึงสัมผัสคล้องจองกัน 🐦👀",
      "en": "Spot on! กา and ตา both use vowel Ah 🐦👀",
      "zh": "真棒！กา 和 ตา 都是สระ อา，所以押韵 🐦👀"
    }
  },
  {
    "id": "k1-thai-h2",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"มา\" คล้องจองสัมผัสสระกับคำใดเอ่ย? 🏃",
      "en": "Which word rhymes with \"มา\" (Ma)? 🏃",
      "zh": "哪个词和“มา”押韵？🏃"
    },
    "illustration": "🏃 มา คล้องจองกับ ... ? 🫖",
    "illustrationSubtitle": {
      "th": "คำคล้องจองสระ อา",
      "en": "Rhyming with Ma",
      "zh": "押韵词"
    },
    "options": [
      {
        "id": "opt-k1-thai-h2-1",
        "label": {
          "th": "ขา (สระอา)",
          "en": "Kha",
          "zh": "腿"
        },
        "icon": "🦵"
      },
      {
        "id": "opt-k1-thai-h2-2",
        "label": {
          "th": "ดู (สระอู)",
          "en": "Doo",
          "zh": "看"
        },
        "icon": "👀"
      },
      {
        "id": "opt-k1-thai-h2-3",
        "label": {
          "th": "ตี (สระอี)",
          "en": "Tee",
          "zh": "击打"
        },
        "icon": "🥁"
      }
    ],
    "correctOptionId": "opt-k1-thai-h2-1",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! มา กับ ขา สัมผัสสระ อา เหมือนกัน 🏃🦵",
      "en": "Awesome! มา and ขา rhyme together 🏃🦵",
      "zh": "答对了！มา 和 ขา 都是长元音 อา 🏃🦵"
    }
  },
  {
    "id": "k1-thai-h3",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"รู\" (รูหนู) สัมผัสเสียงสระกับคำใดเอ่ย? 🕳️",
      "en": "Which word rhymes with \"รู\" (Roo)? 🕳️",
      "zh": "哪个词和“รู”押韵？🕳️"
    },
    "illustration": "🕳️ รู คล้องจองกับ ... ? 🐍",
    "illustrationSubtitle": {
      "th": "คำคล้องจองสระ อู",
      "en": "Rhyming with Roo",
      "zh": "押韵词"
    },
    "options": [
      {
        "id": "opt-k1-thai-h3-1",
        "label": {
          "th": "กา",
          "en": "Ka",
          "zh": "乌鸦"
        },
        "icon": "🐦"
      },
      {
        "id": "opt-k1-thai-h3-2",
        "label": {
          "th": "งู",
          "en": "Ngoo",
          "zh": "蛇"
        },
        "icon": "🐍"
      },
      {
        "id": "opt-k1-thai-h3-3",
        "label": {
          "th": "มี",
          "en": "Mee",
          "zh": "有"
        },
        "icon": "🤲"
      }
    ],
    "correctOptionId": "opt-k1-thai-h3-2",
    "explanation": {
      "th": "ถูกต้องจ้า! รู สัมผัสเสียงกับ งู สระ อู เหมือนกัน 🕳️🐍",
      "en": "Super! รู and งู both share vowel Oo 🕳️🐍",
      "zh": "太聪明了！รู 和 งู 都是元音 อู 🕳️🐍"
    }
  },
  {
    "id": "k1-thai-h4",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "พยัญชนะที่มีเสียงคล้ายกัน: ข้อใดคือ \"ข ไข่\" ไม่ใช่ \"ช ช้าง\"? 🥚",
      "en": "Which is \"ข\" (Khor Khai) and not \"ช\" (Chor Chang)? 🥚",
      "zh": "哪个是“ข ไข่”而不是“ช ช้าง”？🥚"
    },
    "illustration": "🥚 ข ไข่ vs 🐘 ช ช้าง",
    "illustrationSubtitle": {
      "th": "เปรียบเทียบ ข และ ช",
      "en": "Distinguish Khor and Chor",
      "zh": "辨别字母 ข 与 ช"
    },
    "options": [
      {
        "id": "opt-k1-thai-h4-1",
        "label": {
          "th": "ข",
          "en": "ข",
          "zh": "ข"
        },
        "icon": "🥚"
      },
      {
        "id": "opt-k1-thai-h4-2",
        "label": {
          "th": "ช",
          "en": "ช",
          "zh": "ช"
        },
        "icon": "🐘"
      },
      {
        "id": "opt-k1-thai-h4-3",
        "label": {
          "th": "ซ",
          "en": "ซ",
          "zh": "ซ"
        },
        "icon": "⛓️"
      }
    ],
    "correctOptionId": "opt-k1-thai-h4-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! ข ไข่ ไม่มีหางยาว ส่วน ช ช้าง มีหางชี้ตวัดขึ้น 🥚",
      "en": "Great! ข has no upper tail, while ช has a tail 🥚",
      "zh": "答对了！ข 没有尾巴，ช 有长尾巴 🥚"
    }
  },
  {
    "id": "k1-thai-h5",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "สระสองจุดฝาแฝดข้างหลังพยัญชนะนี้ เรียกว่าสระอะไร? \"-ะ\"",
      "en": "What is this twin-dots short vowel? \"-ะ\"",
      "zh": "在字母后面的双点短元音叫什么？“-ะ”"
    },
    "illustration": "⚡ สระ อะ (-ะ) ⚡",
    "illustrationSubtitle": {
      "th": "สระ อะ สองจุด",
      "en": "Sara Ah (Short)",
      "zh": "短元音 อะ"
    },
    "options": [
      {
        "id": "opt-k1-thai-h5-1",
        "label": {
          "th": "สระ อา (-า)",
          "en": "Sara Ah (Long)",
          "zh": "长元音 า"
        },
        "icon": "✨"
      },
      {
        "id": "opt-k1-thai-h5-2",
        "label": {
          "th": "สระ อะ (-ะ)",
          "en": "Sara Ah (Short)",
          "zh": "短元音 ะ"
        },
        "icon": "⚡"
      },
      {
        "id": "opt-k1-thai-h5-3",
        "label": {
          "th": "สระ โอ (โ-)",
          "en": "Sara Oh",
          "zh": "元音 โ"
        },
        "icon": "🦒"
      }
    ],
    "correctOptionId": "opt-k1-thai-h5-2",
    "explanation": {
      "th": "เก่งมากจ้า! สระ อะ เป็นสระเสียงสั้น มีสองจุดคู่กัน ⚡",
      "en": "Spot on! สระ อะ (-ะ) is the short vowel Ah ⚡",
      "zh": "真聪明！这是短元音 อะ ⚡"
    }
  },
  {
    "id": "k1-thai-h6",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "นำ ก + สระ อะ = ? อ่านว่าอย่างไรเอ่ย? 🥣",
      "en": "Blend Gor + Short Vowel Ah: ก + -ะ = ?",
      "zh": "拼读：ก + -ะ = ？"
    },
    "illustration": "ก + -ะ = กะ 🥣",
    "illustrationSubtitle": {
      "th": "กะทิ กะละมัง",
      "en": "Blend Ka",
      "zh": "短拼音 กะ"
    },
    "options": [
      {
        "id": "opt-k1-thai-h6-1",
        "label": {
          "th": "กิ",
          "en": "Ki",
          "zh": "吉"
        },
        "icon": "☂️"
      },
      {
        "id": "opt-k1-thai-h6-2",
        "label": {
          "th": "กู",
          "en": "Koo",
          "zh": "咕"
        },
        "icon": "🐌"
      },
      {
        "id": "opt-k1-thai-h6-3",
        "label": {
          "th": "กะ",
          "en": "Ka (Short)",
          "zh": "嘎 (短)"
        },
        "icon": "🥣"
      }
    ],
    "correctOptionId": "opt-k1-thai-h6-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ก-อะ-กะ เช่น กะทิ กะทะ 🥣",
      "en": "Brilliant! ก + -ะ spells กะ (Ka) 🥣",
      "zh": "太棒了！ก + -ะ 读作 กะ 🥣"
    }
  },
  {
    "id": "k1-thai-h7",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำตรงข้าม: คำว่า \"ดี\" ตรงข้ามกับคำว่าอะไรเอ่ย? 👍",
      "en": "What is the opposite of \"ดี\" (Good)? 👍",
      "zh": "“ดี (好)”的反义词是什么？👍"
    },
    "illustration": "👍 ดี vs 👎 ?",
    "illustrationSubtitle": {
      "th": "คำตรงข้าม",
      "en": "Opposites",
      "zh": "反义词"
    },
    "options": [
      {
        "id": "opt-k1-thai-h7-1",
        "label": {
          "th": "ชั่ว / ร้าย",
          "en": "Bad / Evil",
          "zh": "坏 / 恶"
        },
        "icon": "👎"
      },
      {
        "id": "opt-k1-thai-h7-2",
        "label": {
          "th": "สุข",
          "en": "Happy",
          "zh": "快乐"
        },
        "icon": "😊"
      },
      {
        "id": "opt-k1-thai-h7-3",
        "label": {
          "th": "โต",
          "en": "Big",
          "zh": "长大"
        },
        "icon": "🌳"
      }
    ],
    "correctOptionId": "opt-k1-thai-h7-1",
    "explanation": {
      "th": "ถูกต้องจ้า! คนดี ตรงข้ามกับ คนร้าย/ชั่ว 👍👎",
      "en": "Spot on! ดี (Good) is opposite of ชั่ว/ร้าย (Bad) 👍👎",
      "zh": "答对了！“ดี”的反义词是“ร้าย / ชั่ว” 👎"
    }
  },
  {
    "id": "k1-thai-h8",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำตรงข้าม: คำว่า \"สูง\" ตรงข้ามกับคำว่าอะไรเอ่ย? 🦒",
      "en": "What is the opposite of \"สูง\" (Tall)? 🦒",
      "zh": "“สูง (高)”的反义词是什么？🦒"
    },
    "illustration": "🦒 สูง vs 🐭 ?",
    "illustrationSubtitle": {
      "th": "คำตรงข้าม สูง-เตี้ย",
      "en": "Opposite Tall vs Short",
      "zh": "反义词 高与矮"
    },
    "options": [
      {
        "id": "opt-k1-thai-h8-1",
        "label": {
          "th": "ยาว",
          "en": "Long",
          "zh": "长"
        },
        "icon": "📏"
      },
      {
        "id": "opt-k1-thai-h8-2",
        "label": {
          "th": "เตี้ย",
          "en": "Short (Height)",
          "zh": "矮"
        },
        "icon": "🐭"
      },
      {
        "id": "opt-k1-thai-h8-3",
        "label": {
          "th": "กว้าง",
          "en": "Wide",
          "zh": "宽"
        },
        "icon": "↔️"
      }
    ],
    "correctOptionId": "opt-k1-thai-h8-2",
    "explanation": {
      "th": "เก่งมากจ้า! สูง ตรงข้ามกับ เตี้ย 🦒🐭",
      "en": "Awesome! สูง (Tall) is opposite to เตี้ย (Short) 🦒🐭",
      "zh": "真聪明！高 (สูง) 的反义词是矮 (เตี้ย) 🐭"
    }
  },
  {
    "id": "k1-thai-h9",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "ปริศนาคำทาย: \"ตัวฉันมีสี่ขา ร้องมอมอ ให้นมดื่ม\" คือสัตว์ใด? 🐄",
      "en": "Riddle: \"Four legs, says moo-moo, gives fresh milk.\" Who am I? 🐄",
      "zh": "谜语：“四条腿，哞哞叫，能产奶。”我是谁？🐄"
    },
    "illustration": "🐄 มอมอ ให้นมขาว 🥛",
    "illustrationSubtitle": {
      "th": "วัวตัวลาย",
      "en": "Cow",
      "zh": "奶牛"
    },
    "options": [
      {
        "id": "opt-k1-thai-h9-1",
        "label": {
          "th": "แพะ",
          "en": "Goat",
          "zh": "山羊"
        },
        "icon": "🐐"
      },
      {
        "id": "opt-k1-thai-h9-2",
        "label": {
          "th": "ม้า",
          "en": "Horse",
          "zh": "马"
        },
        "icon": "🐴"
      },
      {
        "id": "opt-k1-thai-h9-3",
        "label": {
          "th": "วัว",
          "en": "Cow",
          "zh": "奶牛"
        },
        "icon": "🐄"
      }
    ],
    "correctOptionId": "opt-k1-thai-h9-3",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! วัว ร้องมอมอ มีนมบำรุงสุขภาพ 🐄🥛",
      "en": "Super! Cow (วัว) gives milk and says moo 🐄🥛",
      "zh": "太棒了！是奶牛 วัว 🐄"
    }
  },
  {
    "id": "k1-thai-h10",
    "grade": "K1",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "พยัญชนะไทยตัวสุดท้ายของพยัญชนะ 44 ตัว คือตัวใดเอ่ย? 🦉",
      "en": "Which is the 44th and final Thai consonant? 🦉",
      "zh": "44个泰文字母中的最后一个是哪一个？🦉"
    },
    "illustration": "🦉 ฮ นกฮูก ตาโต 🦉",
    "illustrationSubtitle": {
      "th": "ฮ นกฮูก ตัวสุดท้าย",
      "en": "Hor Nok-hook",
      "zh": "最后一个字母 ฮ"
    },
    "options": [
      {
        "id": "opt-k1-thai-h10-1",
        "label": {
          "th": "ฮ (ฮ นกฮูก)",
          "en": "ฮ (Hor Nok-hook)",
          "zh": "ฮ (猫头鹰)"
        },
        "icon": "🦉"
      },
      {
        "id": "opt-k1-thai-h10-2",
        "label": {
          "th": "อ (อ อ่าง)",
          "en": "อ (Or Ang)",
          "zh": "อ (水盆)"
        },
        "icon": "🥣"
      },
      {
        "id": "opt-k1-thai-h10-3",
        "label": {
          "th": "ศ (ศ ศาลา)",
          "en": "ศ (Sor Sala)",
          "zh": "ศ (凉亭)"
        },
        "icon": "🏛️"
      }
    ],
    "correctOptionId": "opt-k1-thai-h10-1",
    "explanation": {
      "th": "ยอดเยี่ยมที่สุดจ้ะ! ฮ นกฮูก ตาโต คือตัวสุดท้ายตัวที่ 44 🦉",
      "en": "Brilliant! ฮ (Hor Nok-hook) is the 44th Thai consonant 🦉",
      "zh": "答对了！ฮ นกฮูก 是第44个泰文字母 🦉"
    }
  },
  {
    "id": "k2-thai-e1",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"มาลี\" มีความหมายตรงกับข้อใดเอ่ย? 🌸",
      "en": "What does \"มาลี\" (Malee) mean? 🌸",
      "zh": "“มาลี”是什么意思？🌸"
    },
    "illustration": "🌸 ดอกมาลีแสนสวย 🌸",
    "illustrationSubtitle": {
      "th": "ความหมายคำศัพท์",
      "en": "Flower meaning",
      "zh": "花朵词义"
    },
    "options": [
      {
        "id": "opt-k2-thai-e1-1",
        "label": {
          "th": "ดอกไม้",
          "en": "Flower",
          "zh": "花朵"
        },
        "icon": "🌸"
      },
      {
        "id": "opt-k2-thai-e1-2",
        "label": {
          "th": "สายน้ำ",
          "en": "River",
          "zh": "河流"
        },
        "icon": "🌊"
      },
      {
        "id": "opt-k2-thai-e1-3",
        "label": {
          "th": "ภูเขา",
          "en": "Mountain",
          "zh": "山丘"
        },
        "icon": "⛰️"
      }
    ],
    "correctOptionId": "opt-k2-thai-e1-1",
    "explanation": {
      "th": "ถูกต้องจ้า! มาลี มีความหมายว่า ดอกไม้ 🌸",
      "en": "Great! มาลี means flower 🌸",
      "zh": "答对了！มาลี 是花朵的意思 🌸"
    }
  },
  {
    "id": "k2-thai-e2",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "รูปวรรณยุกต์รูปนี้ เรียกว่าไม้เอกหรือไม้โทเอ่ย? \"-่\"",
      "en": "What is this tone mark called? \"-่\"",
      "zh": "这个泰文声调符号叫什么？“-่”"
    },
    "illustration": "✨ ไม้เอก (-่) ✨",
    "illustrationSubtitle": {
      "th": "วรรณยุกต์ ไม้เอก",
      "en": "Mai Ek tone mark",
      "zh": "声调符号 ไม้เอก"
    },
    "options": [
      {
        "id": "opt-k2-thai-e2-1",
        "label": {
          "th": "ไม้โท (-้)",
          "en": "Mai Tho",
          "zh": "第二声 ไม้โท"
        },
        "icon": "✌️"
      },
      {
        "id": "opt-k2-thai-e2-2",
        "label": {
          "th": "ไม้เอก (-่)",
          "en": "Mai Ek",
          "zh": "第一声 ไม้เอก"
        },
        "icon": "☝️"
      },
      {
        "id": "opt-k2-thai-e2-3",
        "label": {
          "th": "ไม้ตรี (-๊)",
          "en": "Mai Tri",
          "zh": "第三声 ไม้ตรี"
        },
        "icon": "🤟"
      }
    ],
    "correctOptionId": "opt-k2-thai-e2-2",
    "explanation": {
      "th": "เก่งมากจ้า! ขีดตรงสั้นๆ ข้างบน เรียกว่า ไม้เอก (-่) ☝️",
      "en": "Spot on! It is called Mai Ek (-่) ☝️",
      "zh": "真聪明！这一短划是第一声 ไม้เอก ☝️"
    }
  },
  {
    "id": "k2-thai-e3",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "รูปวรรณยุกต์รูปนี้ เรียกว่าอะไรเอ่ย? \"-้\"",
      "en": "What is this tone mark called? \"-้\"",
      "zh": "这个泰文声调符号叫什么？“-้”"
    },
    "illustration": "✌️ ไม้โท (-้) ✌️",
    "illustrationSubtitle": {
      "th": "วรรณยุกต์ ไม้โท",
      "en": "Mai Tho tone mark",
      "zh": "声调符号 ไม้โท"
    },
    "options": [
      {
        "id": "opt-k2-thai-e3-1",
        "label": {
          "th": "ไม้จัตวา (-๋)",
          "en": "Mai Chattawa",
          "zh": "第四声 ไม้จัตวา"
        },
        "icon": "➕"
      },
      {
        "id": "opt-k2-thai-e3-2",
        "label": {
          "th": "ไม้เอก (-่)",
          "en": "Mai Ek",
          "zh": "第一声 ไม้เอก"
        },
        "icon": "☝️"
      },
      {
        "id": "opt-k2-thai-e3-3",
        "label": {
          "th": "ไม้โท (-้)",
          "en": "Mai Tho",
          "zh": "第二声 ไม้โท"
        },
        "icon": "✌️"
      }
    ],
    "correctOptionId": "opt-k2-thai-e3-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ขดหัวตวัดหาง เรียกว่า ไม้โท (-้) ✌️",
      "en": "Awesome! It is Mai Tho (-้) ✌️",
      "zh": "太棒了！这是第二声 ไม้โท ✌️"
    }
  },
  {
    "id": "k2-thai-e4",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"บ้าน\" ใช้รูปวรรณยุกต์รูปใดเอ่ย? 🏠",
      "en": "Which tone mark is used in \"บ้าน\" (House)? 🏠",
      "zh": "“บ้าน (房子)”使用了哪个声调符号？🏠"
    },
    "illustration": "🏠 บ-า-น-ไม้โท บ้าน 🏠",
    "illustrationSubtitle": {
      "th": "วรรณยุกต์ในคำว่าบ้าน",
      "en": "Tone mark in Baan",
      "zh": "词中的声调"
    },
    "options": [
      {
        "id": "opt-k2-thai-e4-1",
        "label": {
          "th": "ไม้โท (-้)",
          "en": "Mai Tho",
          "zh": "ไม้โท (-้)"
        },
        "icon": "🏠"
      },
      {
        "id": "opt-k2-thai-e4-2",
        "label": {
          "th": "ไม้เอก (-่)",
          "en": "Mai Ek",
          "zh": "ไม้เอก (-่)"
        },
        "icon": "☝️"
      },
      {
        "id": "opt-k2-thai-e4-3",
        "label": {
          "th": "ไม้ตรี (-๊)",
          "en": "Mai Tri",
          "zh": "ไม้ตรี (-๊)"
        },
        "icon": "⭐"
      }
    ],
    "correctOptionId": "opt-k2-thai-e4-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! บ-า-น-บาน-ไม้โท-บ้าน 🏠",
      "en": "Spot on! \"บ้าน\" uses Mai Tho (-้) 🏠",
      "zh": "答对了！“บ้าน”使用 ไม้โท 🏠"
    }
  },
  {
    "id": "k2-thai-e5",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "สระตัวนี้อยู่ข้างหน้าพยัญชนะ เรียกว่าสระอะไรเอ่ย? \"เ-\"",
      "en": "What is this front vowel called? \"เ-\"",
      "zh": "这个在字母前面的元音叫什么？“เ-”"
    },
    "illustration": "✨ สระ เอ (เ-) ✨",
    "illustrationSubtitle": {
      "th": "สระ เอ อยู่ข้างหน้า",
      "en": "Sara Eh",
      "zh": "前置元音 เอ"
    },
    "options": [
      {
        "id": "opt-k2-thai-e5-1",
        "label": {
          "th": "สระ แอ (แ-)",
          "en": "Sara Ae",
          "zh": "元音 แอ"
        },
        "icon": "👯"
      },
      {
        "id": "opt-k2-thai-e5-2",
        "label": {
          "th": "สระ เอ (เ-)",
          "en": "Sara Eh",
          "zh": "前置元音 เอ"
        },
        "icon": "✨"
      },
      {
        "id": "opt-k2-thai-e5-3",
        "label": {
          "th": "สระ โอ (โ-)",
          "en": "Sara Oh",
          "zh": "元音 โอ"
        },
        "icon": "🦒"
      }
    ],
    "correctOptionId": "opt-k2-thai-e5-2",
    "explanation": {
      "th": "เก่งมากจ้า! สระ เอ วางอยู่ข้างหน้าพยัญชนะ เช่น เท เก เม ✨",
      "en": "Brilliant! สระ เอ (เ-) stands in front 👏",
      "zh": "真聪明！这是在前面的元音 เอ ✨"
    }
  },
  {
    "id": "k2-thai-e6",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "สระตัวนี้มี 2 ขาอยู่ข้างหน้าพยัญชนะ เรียกว่าสระอะไร? \"แ-\"",
      "en": "What is this twin front vowel called? \"แ-\"",
      "zh": "这个前面带两竖的元音叫什么？“แ-”"
    },
    "illustration": "👯 สระ แอ (แ-) 👯",
    "illustrationSubtitle": {
      "th": "สระ แอ สองขา",
      "en": "Sara Ae",
      "zh": "前置双元音 แอ"
    },
    "options": [
      {
        "id": "opt-k2-thai-e6-1",
        "label": {
          "th": "สระ โอ (โ-)",
          "en": "Sara Oh",
          "zh": "元音 โอ"
        },
        "icon": "🦒"
      },
      {
        "id": "opt-k2-thai-e6-2",
        "label": {
          "th": "สระ เอ (เ-)",
          "en": "Sara Eh",
          "zh": "元音 เอ"
        },
        "icon": "✨"
      },
      {
        "id": "opt-k2-thai-e6-3",
        "label": {
          "th": "สระ แอ (แ-)",
          "en": "Sara Ae",
          "zh": "前置元音 แอ"
        },
        "icon": "👯"
      }
    ],
    "correctOptionId": "opt-k2-thai-e6-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! สระ แอ เหมือนสระ เอ สองตัวคู่กัน เช่น แมว แพ 👯",
      "en": "Super! สระ แอ (แ-) has double stems 👯",
      "zh": "太棒了！这是长元音 แอ 👯"
    }
  },
  {
    "id": "k2-thai-e7",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "นำ ม + สระ แอ + ว = ? สัตว์เลี้ยงน่ารักร้องเหมียวๆ 🐱",
      "en": "Blend Mor + Sara Ae + Wor: ม + แ- + ว = ?",
      "zh": "拼读：ม + แ- + ว = ？（可爱会叫喵喵的宠物）"
    },
    "illustration": "🐱 ม-แ-ว = แมว 🐾",
    "illustrationSubtitle": {
      "th": "คำว่า แมว",
      "en": "Spelling Cat in Thai",
      "zh": "拼读 小猫"
    },
    "options": [
      {
        "id": "opt-k2-thai-e7-1",
        "label": {
          "th": "แมว (แมวน้อย)",
          "en": "Maew (Cat)",
          "zh": "猫 (แมว)"
        },
        "icon": "🐱"
      },
      {
        "id": "opt-k2-thai-e7-2",
        "label": {
          "th": "หมู (หมูอ้วน)",
          "en": "Moo (Pig)",
          "zh": "猪 (หมู)"
        },
        "icon": "🐷"
      },
      {
        "id": "opt-k2-thai-e7-3",
        "label": {
          "th": "ม้า (ม้าวิ่ง)",
          "en": "Ma (Horse)",
          "zh": "马 (ม้า)"
        },
        "icon": "🐴"
      }
    ],
    "correctOptionId": "opt-k2-thai-e7-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! ม-แอ-ว-แมว เหมียวๆ 🐱",
      "en": "Awesome! spells แมว (Cat) 🐱",
      "zh": "答对了！拼写出来是小猫 แมว 🐱"
    }
  },
  {
    "id": "k2-thai-e8",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"รัก\" ตรงข้ามกับคำว่าอะไรเอ่ย? ❤️",
      "en": "What is the opposite of \"รัก\" (Love)? ❤️",
      "zh": "“รัก (爱)”的反义词是什么？❤️"
    },
    "illustration": "❤️ รัก vs 💔 ?",
    "illustrationSubtitle": {
      "th": "คำตรงข้าม",
      "en": "Opposite of Love",
      "zh": "反义词"
    },
    "options": [
      {
        "id": "opt-k2-thai-e8-1",
        "label": {
          "th": "ชอบ",
          "en": "Like",
          "zh": "喜欢"
        },
        "icon": "🥰"
      },
      {
        "id": "opt-k2-thai-e8-2",
        "label": {
          "th": "เกลียด",
          "en": "Hate",
          "zh": "讨厌 / 恨"
        },
        "icon": "💔"
      },
      {
        "id": "opt-k2-thai-e8-3",
        "label": {
          "th": "สุข",
          "en": "Happy",
          "zh": "开心"
        },
        "icon": "😊"
      }
    ],
    "correctOptionId": "opt-k2-thai-e8-2",
    "explanation": {
      "th": "เก่งมากจ้า! รัก ตรงข้ามกับ เกลียด ❤️💔",
      "en": "Spot on! รัก (Love) is opposite to เกลียด (Hate) ❤️💔",
      "zh": "真聪明！爱 (รัก) 的反义词是恨 (เกลียด) ❤️💔"
    }
  },
  {
    "id": "k2-thai-e9",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "พยัญชนะตัวใดมีหัวอยู่ข้างใน: \"ผ ผึ้ง\" หรือ \"พ พาน\"? 🐝",
      "en": "Which letter has an inward circle head: \"ผ\" or \"พ\"?",
      "zh": "哪个字母圆头朝内：“ผ”还是“พ”？"
    },
    "illustration": "🐝 ผ หัวเข้า vs 🍽️ พ หัวออก",
    "illustrationSubtitle": {
      "th": "การสังเกตหัวพยัญชนะ",
      "en": "Inward vs Outward head",
      "zh": "辨别字母圆头朝向"
    },
    "options": [
      {
        "id": "opt-k2-thai-e9-1",
        "label": {
          "th": "พ พาน (หัวออก)",
          "en": "Phor Phan (Out)",
          "zh": "พ (朝外)"
        },
        "icon": "🍽️"
      },
      {
        "id": "opt-k2-thai-e9-2",
        "label": {
          "th": "ฟ ฟัน (หัวออก)",
          "en": "For Fan (Out)",
          "zh": "ฟ (朝外)"
        },
        "icon": "🦷"
      },
      {
        "id": "opt-k2-thai-e9-3",
        "label": {
          "th": "ผ ผึ้ง (หัวเข้า)",
          "en": "Phor Phueng (Inward)",
          "zh": "ผ (朝内)"
        },
        "icon": "🐝"
      }
    ],
    "correctOptionId": "opt-k2-thai-e9-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ผ ผึ้ง ม้วนหัวเข้าข้างใน ส่วน พ พาน ม้วนหัวออกข้างนอก 🐝",
      "en": "Brilliant! ผ has an inward head, while พ faces outward 🐝",
      "zh": "太棒了！ผ หัวม้วนเข้าใน 🐝"
    }
  },
  {
    "id": "k2-thai-e10",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"ยิ้ม\" สัมผัสคล้องจองกับคำใดเอ่ย? 😊",
      "en": "Which word rhymes with \"ยิ้ม\" (Yim - Smile)? 😊",
      "zh": "哪个词和“ยิ้ม (微笑)”押韵？😊"
    },
    "illustration": "😊 ยิ้ม คล้องจองกับ ... ? 🥣",
    "illustrationSubtitle": {
      "th": "คำคล้องจองสระอิ+แม่กม",
      "en": "Rhyming with Smile",
      "zh": "押韵词"
    },
    "options": [
      {
        "id": "opt-k2-thai-e10-1",
        "label": {
          "th": "อิ่ม (กินอิ่ม)",
          "en": "Im (Full)",
          "zh": "饱 (อิ่ม)"
        },
        "icon": "🥣"
      },
      {
        "id": "opt-k2-thai-e10-2",
        "label": {
          "th": "นอน (นอนหลับ)",
          "en": "Non (Sleep)",
          "zh": "睡 (นอน)"
        },
        "icon": "😴"
      },
      {
        "id": "opt-k2-thai-e10-3",
        "label": {
          "th": "วิ่ง (วิ่งเล่น)",
          "en": "Wing (Run)",
          "zh": "跑 (วิ่ง)"
        },
        "icon": "🏃"
      }
    ],
    "correctOptionId": "opt-k2-thai-e10-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! ยิ้ม กับ อิ่ม สัมผัสสระ อิ แม่กม เหมือนกัน 😊🥣",
      "en": "Spot on! ยิ้ม and อิ่ม rhyme together 😊🥣",
      "zh": "答对了！ยิ้ม 和 อิ่ม 押韵 😊🥣"
    }
  },
  {
    "id": "k2-thai-m1",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "สระตัวนี้สูงยาวกว่าพยัญชนะ วางข้างหน้า เรียกว่าสระอะไร? \"โ-\"",
      "en": "What is this tall front vowel called? \"โ-\"",
      "zh": "这个长得高高的前置元音叫什么？“โ-”"
    },
    "illustration": "🦒 สระ โอ (โ-) 🦒",
    "illustrationSubtitle": {
      "th": "สระ โอ ตัวสูงโย่ง",
      "en": "Sara Oh",
      "zh": "前置元音 โอ"
    },
    "options": [
      {
        "id": "opt-k2-thai-m1-1",
        "label": {
          "th": "สระ ไอ (ไ-)",
          "en": "Sara Ai",
          "zh": "元音 ไ"
        },
        "icon": "🌿"
      },
      {
        "id": "opt-k2-thai-m1-2",
        "label": {
          "th": "สระ โอ (โ-)",
          "en": "Sara Oh",
          "zh": "高元音 โอ"
        },
        "icon": "🦒"
      },
      {
        "id": "opt-k2-thai-m1-3",
        "label": {
          "th": "สระ เอ (เ-)",
          "en": "Sara Eh",
          "zh": "元音 เอ"
        },
        "icon": "✨"
      }
    ],
    "correctOptionId": "opt-k2-thai-m1-2",
    "explanation": {
      "th": "เก่งมากจ้า! สระ โอ รูปร่างสูงชะลูด วางข้างหน้าพยัญชนะ เช่น โต๊ะ โบ โมโห 🦒",
      "en": "Super! สระ โอ (โ-) is the tall front vowel 🦒",
      "zh": "真聪明！这是长得高高的元音 โอ 🦒"
    }
  },
  {
    "id": "k2-thai-m2",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "นำ ต + สระ โอ = ? มีความหมายว่า ร่างกายเติบใหญ่ 🌳",
      "en": "Blend Tor + Sara Oh: ต + โ- = ? (means grow big)",
      "zh": "拼读：ต + โ- = ？（代表长大）"
    },
    "illustration": "ต + โ- = โต 🌳",
    "illustrationSubtitle": {
      "th": "คำว่า โต",
      "en": "Word To (Grow)",
      "zh": "长大 โต"
    },
    "options": [
      {
        "id": "opt-k2-thai-m2-1",
        "label": {
          "th": "ใจ",
          "en": "Jai",
          "zh": "心"
        },
        "icon": "❤️"
      },
      {
        "id": "opt-k2-thai-m2-2",
        "label": {
          "th": "ไป",
          "en": "Pai",
          "zh": "去"
        },
        "icon": "🚶"
      },
      {
        "id": "opt-k2-thai-m2-3",
        "label": {
          "th": "โต (เติบโต)",
          "en": "To (Grow)",
          "zh": "大 (โต)"
        },
        "icon": "🌳"
      }
    ],
    "correctOptionId": "opt-k2-thai-m2-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ต-โอ-โต เช่น เด็กๆ เติบโตแข็งแรง 🌳",
      "en": "Correct! ต + โ- spells โต (To - grow big) 🌳",
      "zh": "太棒了！拼读出来是 โต (长大) 🌳"
    }
  },
  {
    "id": "k2-thai-m3",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำว่า \"แม่\" สะกดด้วยพยัญชนะต้นและสระใดเอ่ย? 👩",
      "en": "Consonant and vowel in \"แม่\" (Mother)? 👩",
      "zh": "“แม่ (妈妈)”由什么字母和元音组成？👩"
    },
    "illustration": "👩 ม + แ- + ไม้เอก = แม่ 🌸",
    "illustrationSubtitle": {
      "th": "ส่วนประกอบของคำว่าแม่",
      "en": "Spelling Mae (Mom)",
      "zh": "词汇结构"
    },
    "options": [
      {
        "id": "opt-k2-thai-m3-1",
        "label": {
          "th": "ม ม้า + สระ แอ + ไม้เอก",
          "en": "Mor + Sara Ae + Mai Ek",
          "zh": "ม + สระ แอ + ไม้เอก"
        },
        "icon": "👩"
      },
      {
        "id": "opt-k2-thai-m3-2",
        "label": {
          "th": "ม ม้า + สระ เอ + ไม้โท",
          "en": "Mor + Sara Eh + Mai Tho",
          "zh": "ม + สระ เอ + ไม้โท"
        },
        "icon": "✨"
      },
      {
        "id": "opt-k2-thai-m3-3",
        "label": {
          "th": "น หนู + สระ แอ + ไม้เอก",
          "en": "Nor + Sara Ae + Mai Ek",
          "zh": "น + สระ แอ + ไม้เอก"
        },
        "icon": "🐭"
      }
    ],
    "correctOptionId": "opt-k2-thai-m3-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! ม-แอ-แม-ไม้เอก-แม่ 👩❤️",
      "en": "Brilliant! ม + แ- with Mai Ek spells แม่ 👩❤️",
      "zh": "答对了！ม + สระ แอ + ไม้เอก 拼成 แม่ 👩"
    }
  },
  {
    "id": "k2-thai-m4",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำว่า \"น้ำ\" มีเสียงสระใดเอ่ย? 💧",
      "en": "Which vowel sound is in \"น้ำ\" (Water)? 💧",
      "zh": "“น้ำ (水)”是什么元音？💧"
    },
    "illustration": "💧 สระ อำ (-ำ) 💧",
    "illustrationSubtitle": {
      "th": "สระ อำ มีหยดน้ำกลมๆ",
      "en": "Sara Am",
      "zh": "元音 อำ"
    },
    "options": [
      {
        "id": "opt-k2-thai-m4-1",
        "label": {
          "th": "สระ เอา (เ-า)",
          "en": "Sara Ao",
          "zh": "元音 เ-า"
        },
        "icon": "🔥"
      },
      {
        "id": "opt-k2-thai-m4-2",
        "label": {
          "th": "สระ อำ (-ำ)",
          "en": "Sara Am",
          "zh": "元音 -ำ"
        },
        "icon": "💧"
      },
      {
        "id": "opt-k2-thai-m4-3",
        "label": {
          "th": "สระ อัว (-ัว)",
          "en": "Sara Oua",
          "zh": "元音 -ัว"
        },
        "icon": "🐮"
      }
    ],
    "correctOptionId": "opt-k2-thai-m4-2",
    "explanation": {
      "th": "เก่งมากจ้า! สระ อำ มีวงกลมข้างบนและสระอาข้างหลัง เช่น น้ำ ขำ ดำ 💧",
      "en": "Spot on! สระ อำ (-ำ) sounds Am 💧",
      "zh": "真聪明！这是带有圆圈的元音 อำ 💧"
    }
  },
  {
    "id": "k2-thai-m5",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำตรงข้าม: \"มืด\" ตรงข้ามกับคำว่าอะไรเอ่ย? ☀️",
      "en": "What is the opposite of \"มืด\" (Dark)? ☀️",
      "zh": "“มืด (黑暗)”的反义词是什么？☀️"
    },
    "illustration": "🌑 มืด vs ☀️ ?",
    "illustrationSubtitle": {
      "th": "คำตรงข้าม มืด-สว่าง",
      "en": "Dark vs Bright",
      "zh": "反义词 暗与亮"
    },
    "options": [
      {
        "id": "opt-k2-thai-m5-1",
        "label": {
          "th": "ดำ",
          "en": "Black",
          "zh": "黑"
        },
        "icon": "🖤"
      },
      {
        "id": "opt-k2-thai-m5-2",
        "label": {
          "th": "หนาว",
          "en": "Cold",
          "zh": "冷"
        },
        "icon": "❄️"
      },
      {
        "id": "opt-k2-thai-m5-3",
        "label": {
          "th": "สว่าง",
          "en": "Bright / Light",
          "zh": "明亮"
        },
        "icon": "☀️"
      }
    ],
    "correctOptionId": "opt-k2-thai-m5-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! กลางคืนมืด ตรงข้ามกับ กลางวันสว่าง ☀️",
      "en": "Super! มืด (Dark) is opposite to สว่าง (Bright) ☀️",
      "zh": "答对了！มืด 的反义词是 สว่าง (亮) ☀️"
    }
  },
  {
    "id": "k2-thai-m6",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำสัมผัสคล้องจอง: \"เด็กดี\" คล้องจองกับข้อความใด? 🌟",
      "en": "Rhyme: \"เด็กดี\" (Good child) rhymes with which phrase? 🌟",
      "zh": "押韵：“เด็กดี”和哪个短语押韵？🌟"
    },
    "illustration": "🌟 เด็กดี คล้องจองกับ ... ? 📚",
    "illustrationSubtitle": {
      "th": "คำคล้องจอง 2 พยางค์",
      "en": "2-syllable rhyming",
      "zh": "双音节押韵"
    },
    "options": [
      {
        "id": "opt-k2-thai-m6-1",
        "label": {
          "th": "มีวินัย",
          "en": "Mee Wi-nai (Disciplined)",
          "zh": "有纪律"
        },
        "icon": "📚"
      },
      {
        "id": "opt-k2-thai-m6-2",
        "label": {
          "th": "ใจร้าย",
          "en": "Jai Rai (Cruel)",
          "zh": "心肠坏"
        },
        "icon": "😡"
      },
      {
        "id": "opt-k2-thai-m6-3",
        "label": {
          "th": "วิ่งเร็ว",
          "en": "Wing Reo (Run fast)",
          "zh": "跑得快"
        },
        "icon": "🏃"
      }
    ],
    "correctOptionId": "opt-k2-thai-m6-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! เด็ก\"ดี\" คล้องจองกับ \"มี\"วินัย สระอี เหมือนกัน 🌟📚",
      "en": "Awesome! \"ดี\" and \"มี\" rhyme on vowel Ee 🌟📚",
      "zh": "太棒了！ดี 和 มี 押韵 🌟📚"
    }
  },
  {
    "id": "k2-thai-m7",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "สัญลักษณ์นี้ในภาษาไทย มีชื่อเรียกว่าอะไรเอ่ย? \"ฯ\"",
      "en": "What is this Thai punctuation mark called? \"ฯ\"",
      "zh": "这个泰文符号叫什么？“ฯ”"
    },
    "illustration": "📜 ไปยาลน้อย (ฯ) 📜",
    "illustrationSubtitle": {
      "th": "เครื่องหมายวรรคตอน",
      "en": "Paiyannoi mark",
      "zh": "缩写符号"
    },
    "options": [
      {
        "id": "opt-k2-thai-m7-1",
        "label": {
          "th": "ไม้ยมก (ๆ)",
          "en": "Maiyamok",
          "zh": "重复符号 ๆ"
        },
        "icon": "🔁"
      },
      {
        "id": "opt-k2-thai-m7-2",
        "label": {
          "th": "ไปยาลน้อย (ฯ)",
          "en": "Paiyannoi",
          "zh": "简写符号 ฯ"
        },
        "icon": "📜"
      },
      {
        "id": "opt-k2-thai-m7-3",
        "label": {
          "th": "อัศเจรีย์ (!)",
          "en": "Exclamation mark",
          "zh": "感叹号 !"
        },
        "icon": "❗"
      }
    ],
    "correctOptionId": "opt-k2-thai-m7-2",
    "explanation": {
      "th": "เก่งมากจ้า! เครื่องหมายนี้เรียกว่า ไปยาลน้อย ใช้ละคำให้สั้นลง 📜",
      "en": "Spot on! It is called Paiyannoi (ฯ) 📜",
      "zh": "真聪明！这是泰文的缩写符号 ไปยาลน้อย 📜"
    }
  },
  {
    "id": "k2-thai-m8",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "เครื่องหมายไม้ยมก \"ๆ\" มีหน้าที่ทำอะไรในภาษาไทย? 🔁",
      "en": "What is the function of Maiyamok (ๆ)? 🔁",
      "zh": "符号“ๆ”在泰语中有什么作用？🔁"
    },
    "illustration": "🔁 เด็กๆ วิ่งเร็วๆ 🔁",
    "illustrationSubtitle": {
      "th": "ไม้ยมก ซ้ำคำ",
      "en": "Repeating mark",
      "zh": "重叠词符号"
    },
    "options": [
      {
        "id": "opt-k2-thai-m8-1",
        "label": {
          "th": "ใช้ตั้งคำถาม",
          "en": "Ask question",
          "zh": "用于提问"
        },
        "icon": "❓"
      },
      {
        "id": "opt-k2-thai-m8-2",
        "label": {
          "th": "ใช้บอกว่าตกใจ",
          "en": "Exclamation",
          "zh": "表示感叹"
        },
        "icon": "❗"
      },
      {
        "id": "opt-k2-thai-m8-3",
        "label": {
          "th": "ใช้อ่านซ้ำคำหรือข้อความ",
          "en": "Repeat word twice",
          "zh": "重复朗读该词"
        },
        "icon": "🔁"
      }
    ],
    "correctOptionId": "opt-k2-thai-m8-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ไม้ยมก (ๆ) ใช้อ่านซ้ำคำ เช่น เด็กๆ เพื่อนๆ 🔁",
      "en": "Brilliant! Maiyamok repeats words 🔁",
      "zh": "太棒了！ไม้ยมก 用来重复该词，如เด็กๆ 🔁"
    }
  },
  {
    "id": "k2-thai-m9",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำว่า \"ใจดี\" มีความหมายตรงกับพฤติกรรมใดเอ่ย? 🎁",
      "en": "What behavior represents \"ใจดี\" (Kind-hearted)? 🎁",
      "zh": "“ใจดี (善良)”代表哪种行为？🎁"
    },
    "illustration": "🎁 มีน้ำใจแบ่งปัน 🤝",
    "illustrationSubtitle": {
      "th": "ความหมายของใจดี",
      "en": "Kindness meaning",
      "zh": "善良的含义"
    },
    "options": [
      {
        "id": "opt-k2-thai-m9-1",
        "label": {
          "th": "แบ่งปันของเล่นและขนมให้เพื่อน",
          "en": "Share toys and snacks",
          "zh": "与朋友分享玩具零食"
        },
        "icon": "🎁"
      },
      {
        "id": "opt-k2-thai-m9-2",
        "label": {
          "th": "แย่งของเล่นเพื่อน",
          "en": "Snatch toys",
          "zh": "抢朋友玩具"
        },
        "icon": "🙅"
      },
      {
        "id": "opt-k2-thai-m9-3",
        "label": {
          "th": "แกล้งคนอื่นให้ร้องไห้",
          "en": "Bully others",
          "zh": "欺负别人"
        },
        "icon": "😢"
      }
    ],
    "correctOptionId": "opt-k2-thai-m9-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! ใจดี คือมีเมตตา มีน้ำใจเอื้อเฟื้อเผื่อแผ่ 🎁🤝",
      "en": "Awesome! Being kind means sharing and helping 🎁🤝",
      "zh": "答对了！心好善良就是乐于助人、懂得分享 🎁"
    }
  },
  {
    "id": "k2-thai-m10",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำตรงข้าม: \"หนัก\" ตรงข้ามกับคำว่าอะไรเอ่ย? 🪨",
      "en": "What is the opposite of \"หนัก\" (Heavy)? 🪨",
      "zh": "“หนัก (重)”的反义词是什么？🪨"
    },
    "illustration": "🪨 หนัก vs 🪶 ?",
    "illustrationSubtitle": {
      "th": "คำตรงข้าม หนัก-เบา",
      "en": "Heavy vs Light",
      "zh": "反义词 重与轻"
    },
    "options": [
      {
        "id": "opt-k2-thai-m10-1",
        "label": {
          "th": "ใหญ่",
          "en": "Big",
          "zh": "大"
        },
        "icon": "🐘"
      },
      {
        "id": "opt-k2-thai-m10-2",
        "label": {
          "th": "เบา",
          "en": "Light (Weight)",
          "zh": "轻"
        },
        "icon": "🪶"
      },
      {
        "id": "opt-k2-thai-m10-3",
        "label": {
          "th": "แข็ง",
          "en": "Hard",
          "zh": "硬"
        },
        "icon": "💎"
      }
    ],
    "correctOptionId": "opt-k2-thai-m10-2",
    "explanation": {
      "th": "เก่งมากจ้า! หินก้อนใหญ่หนัก ขนนกสีขาวเบา 🪨🪶",
      "en": "Spot on! หนัก (Heavy) is opposite to เบา (Light) 🪨🪶",
      "zh": "真聪明！重 (หนัก) 的反义词是轻 (เบา) 🪶"
    }
  },
  {
    "id": "k2-thai-h1",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำประสม: \"ตู้\" + \"เย็น\" รวมกันเป็นคำว่าอะไรเอ่ย? 🧊",
      "en": "Compound word: \"ตู้\" (Cabinet) + \"เย็น\" (Cold) = ?",
      "zh": "复合词：“ตู้ (柜子)” + “เย็น (凉)”组合成什么？"
    },
    "illustration": "🧊 ตู้ + เย็น = ? 🥛",
    "illustrationSubtitle": {
      "th": "การสร้างคำประสม",
      "en": "Compound word",
      "zh": "复合词"
    },
    "options": [
      {
        "id": "opt-k2-thai-h1-1",
        "label": {
          "th": "เครื่องซักผ้า",
          "en": "Washing machine",
          "zh": "洗衣机"
        },
        "icon": "🧺"
      },
      {
        "id": "opt-k2-thai-h1-2",
        "label": {
          "th": "พัดลม",
          "en": "Fan",
          "zh": "风扇"
        },
        "icon": "🌀"
      },
      {
        "id": "opt-k2-thai-h1-3",
        "label": {
          "th": "ตู้เย็น",
          "en": "Refrigerator",
          "zh": "冰箱"
        },
        "icon": "🧊"
      }
    ],
    "correctOptionId": "opt-k2-thai-h1-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ตู้ + เย็น = ตู้เย็น สำหรับแช่น้ำและอาหารสด 🧊",
      "en": "Brilliant! Cabinet + Cold = Refrigerator (ตู้เย็น) 🧊",
      "zh": "太棒了！组合在一起是冰箱 ตู้เย็น 🧊"
    }
  },
  {
    "id": "k2-thai-h2",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำประสม: \"แม่\" + \"น้ำ\" รวมกันเป็นคำว่าอะไรเอ่ย? 🌊",
      "en": "Compound word: \"แม่\" + \"น้ำ\" = ?",
      "zh": "复合词：“แม่” + “น้ำ (水)”组合成什么？"
    },
    "illustration": "🌊 แม่ + น้ำ = ? ⛵",
    "illustrationSubtitle": {
      "th": "คำประสม แม่น้ำ",
      "en": "River compound",
      "zh": "河流复合词"
    },
    "options": [
      {
        "id": "opt-k2-thai-h2-1",
        "label": {
          "th": "แม่น้ำ (สายน้ำใหญ่)",
          "en": "Mae-nam (River)",
          "zh": "河流 (แม่น้ำ)"
        },
        "icon": "🌊"
      },
      {
        "id": "opt-k2-thai-h2-2",
        "label": {
          "th": "น้ำตก (น้ำไหลจากผา)",
          "en": "Nam-tok (Waterfall)",
          "zh": "瀑布"
        },
        "icon": "🏞️"
      },
      {
        "id": "opt-k2-thai-h2-3",
        "label": {
          "th": "ทะเล (น้ำเค็ม)",
          "en": "Tha-le (Sea)",
          "zh": "大海"
        },
        "icon": "🏖️"
      }
    ],
    "correctOptionId": "opt-k2-thai-h2-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! แม่ + น้ำ รวมกันเป็น แม่น้ำ สายน้ำไหลผ่าน 🌊",
      "en": "Awesome! แม่ + น้ำ forms River (แม่น้ำ) 🌊",
      "zh": "答对了！组合成河流 แม่น้ำ 🌊"
    }
  },
  {
    "id": "k2-thai-h3",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"เรียน\" สัมผัสคล้องจองกับคำใดเอ่ย? ✍️",
      "en": "Which word rhymes with \"เรียน\" (Rian - Study)? ✍️",
      "zh": "哪个词和“เรียน (学习)”押韵？✍️"
    },
    "illustration": "✍️ เรียน คล้องจองกับ ... ? 📝",
    "illustrationSubtitle": {
      "th": "คำคล้องจองสระเอีย+แม่กน",
      "en": "Rhyme with Study",
      "zh": "押韵词"
    },
    "options": [
      {
        "id": "opt-k2-thai-h3-1",
        "label": {
          "th": "อ่าน",
          "en": "An (Read)",
          "zh": "读"
        },
        "icon": "📖"
      },
      {
        "id": "opt-k2-thai-h3-2",
        "label": {
          "th": "เขียน",
          "en": "Khian (Write)",
          "zh": "写 (เขียน)"
        },
        "icon": "📝"
      },
      {
        "id": "opt-k2-thai-h3-3",
        "label": {
          "th": "พูด",
          "en": "Phoot (Speak)",
          "zh": "说"
        },
        "icon": "🗣️"
      }
    ],
    "correctOptionId": "opt-k2-thai-h3-2",
    "explanation": {
      "th": "เก่งมากจ้า! เรียน กับ เขียน สัมผัสสระเอีย ตัวสะกดแม่กน ✍️📝",
      "en": "Spot on! เรียน and เขียน rhyme together ✍️📝",
      "zh": "真聪明！เรียน 和 เขียน 押韵 📝"
    }
  },
  {
    "id": "k2-thai-h4",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "ปริศนาคำทาย: \"อะไรเอ่ย ลำตัวเป็นปล้อง บินฉวัดเฉวียน มีปีกใส ดูดน้ำหวาน\"? 🐝",
      "en": "Riddle: \"Striped body, buzzing wings, drinks flower nectar.\" Who am I? 🐝",
      "zh": "谜语：“身上带花纹，嗡嗡飞舞，翅膀透明，爱采花蜜。”我是谁？"
    },
    "illustration": "🌸 บินดูดน้ำหวาน 🍯",
    "illustrationSubtitle": {
      "th": "ปริศนาคำทาย ผึ้ง",
      "en": "Bee riddle",
      "zh": "猜谜 蜜蜂"
    },
    "options": [
      {
        "id": "opt-k2-thai-h4-1",
        "label": {
          "th": "นกกระจอก",
          "en": "Sparrow",
          "zh": "麻雀"
        },
        "icon": "🐦"
      },
      {
        "id": "opt-k2-thai-h4-2",
        "label": {
          "th": "มดแดง",
          "en": "Red ant",
          "zh": "红蚂蚁"
        },
        "icon": "🐜"
      },
      {
        "id": "opt-k2-thai-h4-3",
        "label": {
          "th": "ผึ้ง",
          "en": "Bee",
          "zh": "蜜蜂"
        },
        "icon": "🐝"
      }
    ],
    "correctOptionId": "opt-k2-thai-h4-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ผึ้ง ทำรังหาน้ำหวาน 🐝🍯",
      "en": "Super! Bee (ผึ้ง) sips nectar and buzzes 🐝🍯",
      "zh": "太棒了！是勤劳的小蜜蜂 ผึ้ง 🐝"
    }
  },
  {
    "id": "k2-thai-h5",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำตรงข้าม: \"สะอาด\" ตรงข้ามกับคำว่าอะไรเอ่ย? 🧼",
      "en": "What is the opposite of \"สะอาด\" (Clean)? 🧼",
      "zh": "“สะอาด (干净)”的反义词是什么？🧼"
    },
    "illustration": "🧼 สะอาด vs 🧦 ?",
    "illustrationSubtitle": {
      "th": "คำตรงข้าม สะอาด-สกปรก",
      "en": "Clean vs Dirty",
      "zh": "反义词 干净与脏"
    },
    "options": [
      {
        "id": "opt-k2-thai-h5-1",
        "label": {
          "th": "สกปรก",
          "en": "Dirty",
          "zh": "脏 (สกปรก)"
        },
        "icon": "🧦"
      },
      {
        "id": "opt-k2-thai-h5-2",
        "label": {
          "th": "หอม",
          "en": "Fragrant",
          "zh": "香"
        },
        "icon": "🌸"
      },
      {
        "id": "opt-k2-thai-h5-3",
        "label": {
          "th": "สวย",
          "en": "Pretty",
          "zh": "漂亮"
        },
        "icon": "✨"
      }
    ],
    "correctOptionId": "opt-k2-thai-h5-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! สะอาด ตรงข้ามกับ สกปรก 🧼🧦",
      "en": "Awesome! สะอาด (Clean) is opposite to สกปรก (Dirty) 🧼🧦",
      "zh": "答对了！干净的反义词是脏 (สกปรก) 🧦"
    }
  },
  {
    "id": "k2-thai-h6",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"กล้วย\" สะกดด้วยตัวสะกดมาตราใดเอ่ย? (-ย) 🍌",
      "en": "Which final consonant group does \"กล้วย\" (Banana) end in? (-ย)",
      "zh": "“กล้วย (香蕉)”的尾音字母属于哪个组？(-ย)"
    },
    "illustration": "🍌 ก-ล-ว-ย-กล้วย-ไม้โท 🍌",
    "illustrationSubtitle": {
      "th": "มาตราเกย (ย สะกด)",
      "en": "Mae Koey final -y",
      "zh": "泰文韵尾 แม่เกย"
    },
    "options": [
      {
        "id": "opt-k2-thai-h6-1",
        "label": {
          "th": "แม่กม (ม สะกด)",
          "en": "Mae Kom (-m)",
          "zh": "韵尾 ม"
        },
        "icon": "🥣"
      },
      {
        "id": "opt-k2-thai-h6-2",
        "label": {
          "th": "แม่เกย (ย สะกด)",
          "en": "Mae Koey (-y)",
          "zh": "韵尾 ย"
        },
        "icon": "🍌"
      },
      {
        "id": "opt-k2-thai-h6-3",
        "label": {
          "th": "แม่กบ (บ สะกด)",
          "en": "Mae Kob (-b)",
          "zh": "韵尾 บ"
        },
        "icon": "🐸"
      }
    ],
    "correctOptionId": "opt-k2-thai-h6-2",
    "explanation": {
      "th": "เก่งมากจ้า! กล้วย มี ย ยักษ์ สะกด อยู่ในมาตราเกย 🍌",
      "en": "Spot on! \"กล้วย\" ends in -y sound (แม่เกย) 🍌",
      "zh": "真聪明！กล้วย 是 ย 结尾，属于 แม่เกย 🍌"
    }
  },
  {
    "id": "k2-thai-h7",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"ข้าว\" สะกดด้วยตัวสะกดมาตราใดเอ่ย? (-ว) 🍚",
      "en": "Which final consonant group does \"ข้าว\" (Rice) end in? (-ว)",
      "zh": "“ข้าว (米饭)”的尾音字母属于哪个组？(-ว)"
    },
    "illustration": "🍚 ข-า-ว-ขาว-ไม้โท-ข้าว 🌾",
    "illustrationSubtitle": {
      "th": "มาตราเกอว (ว สะกด)",
      "en": "Mae Keow final -w",
      "zh": "泰文韵尾 แม่เกอว"
    },
    "options": [
      {
        "id": "opt-k2-thai-h7-1",
        "label": {
          "th": "แม่กด (ด สะกด)",
          "en": "Mae Kot (-d)",
          "zh": "韵尾 ด"
        },
        "icon": "🛑"
      },
      {
        "id": "opt-k2-thai-h7-2",
        "label": {
          "th": "แม่กง (ง สะกด)",
          "en": "Mae Kong (-ng)",
          "zh": "韵尾 ง"
        },
        "icon": "🔔"
      },
      {
        "id": "opt-k2-thai-h7-3",
        "label": {
          "th": "แม่เกอว (ว สะกด)",
          "en": "Mae Keow (-w)",
          "zh": "韵尾 ว"
        },
        "icon": "🍚"
      }
    ],
    "correctOptionId": "opt-k2-thai-h7-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ข้าว มี ว แหวน สะกด อยู่ในมาตราเกอว 🍚",
      "en": "Brilliant! \"ข้าว\" ends with -w sound (แม่เกอว) 🍚",
      "zh": "太棒了！ข้าว 是 ว 结尾，属于 แม่เกอว 🍚"
    }
  },
  {
    "id": "k2-thai-h8",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "ข้อใดเป็นคำที่มีความหมายแสดงความขอบคุณอย่างสุภาพ? 🙏",
      "en": "Which phrase expresses polite gratitude in Thai? 🙏",
      "zh": "哪句话在泰语中表达礼貌的感谢？🙏"
    },
    "illustration": "🙏 ไหว้อย่างสุภาพ ✨",
    "illustrationSubtitle": {
      "th": "คำสุภาพ ขอบคุณ",
      "en": "Polite thank you",
      "zh": "礼貌感谢"
    },
    "options": [
      {
        "id": "opt-k2-thai-h8-1",
        "label": {
          "th": "ขอบคุณครับ / ขอบคุณค่ะ",
          "en": "Thank you",
          "zh": "谢谢 (ขอบคุณ)"
        },
        "icon": "🙏"
      },
      {
        "id": "opt-k2-thai-h8-2",
        "label": {
          "th": "ไม่เป็นไร",
          "en": "You are welcome",
          "zh": "没关系"
        },
        "icon": "👌"
      },
      {
        "id": "opt-k2-thai-h8-3",
        "label": {
          "th": "ขอโทษครับ / ขอโทษค่ะ",
          "en": "Sorry",
          "zh": "对不起"
        },
        "icon": "🙇"
      }
    ],
    "correctOptionId": "opt-k2-thai-h8-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! เมื่อผู้ใหญ่ให้ของ ควรไหว้และกล่าว \"ขอบคุณครับ/ค่ะ\" 🙏",
      "en": "Awesome! \"ขอบคุณ\" means Thank you politely 🙏",
      "zh": "答对了！收到帮助或礼物说“ขอบคุณครับ/ค่ะ” 🙏"
    }
  },
  {
    "id": "k2-thai-h9",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "ข้อใดเป็นคำที่ควรพูดเมื่อเราเผลอชนเพื่อนโดยไม่ได้ตั้งใจ? 🙇",
      "en": "What should you politely say if accidentally bumping into a friend? 🙇",
      "zh": "不小心碰到朋友时，应该礼貌地说什么？🙇"
    },
    "illustration": "🙇 ขอโทษด้วยความจริงใจ 🤝",
    "illustrationSubtitle": {
      "th": "คำกล่าวขอโทษ",
      "en": "Polite apology",
      "zh": "道歉礼貌用语"
    },
    "options": [
      {
        "id": "opt-k2-thai-h9-1",
        "label": {
          "th": "ไม่เห็นเป็นไรเลย",
          "en": "It's nothing",
          "zh": "没什么大不了"
        },
        "icon": "🤷"
      },
      {
        "id": "opt-k2-thai-h9-2",
        "label": {
          "th": "ขอโทษครับ / ขอโทษค่ะ",
          "en": "I am sorry",
          "zh": "对不起 (ขอโทษ)"
        },
        "icon": "🙇"
      },
      {
        "id": "opt-k2-thai-h9-3",
        "label": {
          "th": "หัวเราะเสียงดัง",
          "en": "Laugh loud",
          "zh": "大声嘲笑"
        },
        "icon": "😆"
      }
    ],
    "correctOptionId": "opt-k2-thai-h9-2",
    "explanation": {
      "th": "เก่งมากจ้า! เมื่อทำผิดหรือชนเพื่อน ต้องรีบกล่าว \"ขอโทษครับ/ค่ะ\" 🙇",
      "en": "Spot on! Apologize sincerely by saying \"ขอโทษ\" 🙇",
      "zh": "真聪明！做错事要说“ขอโทษครับ/ค่ะ” 🙇"
    }
  },
  {
    "id": "k2-thai-h10",
    "grade": "K2",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"กลม\" ตรงข้ามกับคำว่าอะไรเอ่ย? ⚪",
      "en": "What is the opposite of \"กลม\" (Round)? ⚪",
      "zh": "“กลม (圆形)”的反义词是什么？⚪"
    },
    "illustration": "⚪ ทรงกลม vs 🔲 ?",
    "illustrationSubtitle": {
      "th": "คำตรงข้าม กลม-เหลี่ยม",
      "en": "Round vs Square",
      "zh": "反义词 圆与方"
    },
    "options": [
      {
        "id": "opt-k2-thai-h10-1",
        "label": {
          "th": "ยาว",
          "en": "Long",
          "zh": "长"
        },
        "icon": "📏"
      },
      {
        "id": "opt-k2-thai-h10-2",
        "label": {
          "th": "หนา",
          "en": "Thick",
          "zh": "厚"
        },
        "icon": "📚"
      },
      {
        "id": "opt-k2-thai-h10-3",
        "label": {
          "th": "เหลี่ยม",
          "en": "Square / Angular",
          "zh": "方形 / 有棱角"
        },
        "icon": "🔲"
      }
    ],
    "correctOptionId": "opt-k2-thai-h10-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ทรงกลม ไร้มุม ตรงข้ามกับ ทรงเหลี่ยม ที่มีมุมชัดเจน ⚪🔲",
      "en": "Super! กลม (Round) is opposite to เหลี่ยม (Angular/Square) ⚪🔲",
      "zh": "太棒了！圆形 (กลม) 的反义词是有棱角/方形 (เหลี่ยม) 🔲"
    }
  },
  {
    "id": "k3-thai-e1",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"หนังสือ\" มีพยางค์กี่พยางค์เอ่ย? 📚",
      "en": "How many syllables in \"หนังสือ\" (Book)? 📚",
      "zh": "“หนังสือ (书本)”有几个音节？📚"
    },
    "illustration": "📚 หนัง-สือ 📖",
    "illustrationSubtitle": {
      "th": "การนับพยางค์",
      "en": "Counting syllables",
      "zh": "数音节"
    },
    "options": [
      {
        "id": "opt-k3-thai-e1-1",
        "label": {
          "th": "2 พยางค์",
          "en": "2 syllables",
          "zh": "2 个音节"
        },
        "icon": "2️⃣"
      },
      {
        "id": "opt-k3-thai-e1-2",
        "label": {
          "th": "1 พยางค์",
          "en": "1 syllable",
          "zh": "1 个音节"
        },
        "icon": "1️⃣"
      },
      {
        "id": "opt-k3-thai-e1-3",
        "label": {
          "th": "3 พยางค์",
          "en": "3 syllables",
          "zh": "3 个音节"
        },
        "icon": "3️⃣"
      }
    ],
    "correctOptionId": "opt-k3-thai-e1-1",
    "explanation": {
      "th": "ถูกต้องจ้า! หนัง (1) - สือ (2) มี 2 พยางค์ 📚",
      "en": "Great! หนัง-สือ has 2 syllables 📚",
      "zh": "答对了！หนัง-สือ 一共有 2 个音节 📚"
    }
  },
  {
    "id": "k3-thai-e2",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"โรงเรียน\" มีพยางค์กี่พยางค์เอ่ย? 🏫",
      "en": "How many syllables in \"โรงเรียน\" (School)? 🏫",
      "zh": "“โรงเรียน (学校)”有几个音节？🏫"
    },
    "illustration": "🏫 โรง-เรียน 🎒",
    "illustrationSubtitle": {
      "th": "การนับพยางค์",
      "en": "Counting syllables",
      "zh": "数音节"
    },
    "options": [
      {
        "id": "opt-k3-thai-e2-1",
        "label": {
          "th": "1 พยางค์",
          "en": "1 syllable",
          "zh": "1 个音节"
        },
        "icon": "1️⃣"
      },
      {
        "id": "opt-k3-thai-e2-2",
        "label": {
          "th": "2 พยางค์",
          "en": "2 syllables",
          "zh": "2 个音节"
        },
        "icon": "2️⃣"
      },
      {
        "id": "opt-k3-thai-e2-3",
        "label": {
          "th": "3 พยางค์",
          "en": "3 syllables",
          "zh": "3 个音节"
        },
        "icon": "3️⃣"
      }
    ],
    "correctOptionId": "opt-k3-thai-e2-2",
    "explanation": {
      "th": "เก่งมากจ้า! โรง (1) - เรียน (2) มี 2 พยางค์ 🏫",
      "en": "Spot on! โรง-เรียน has 2 syllables 🏫",
      "zh": "真聪明！โรง-เรียน 有 2 个音节 🏫"
    }
  },
  {
    "id": "k3-thai-e3",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำใดมีความหมายว่า \"พระอาทิตย์\" ส่องแสงยามเช้า? ☀️",
      "en": "Which poetic word means the \"Sun\"? ☀️",
      "zh": "哪个词代表“太阳”？☀️"
    },
    "illustration": "☀️ ตะวัน ส่องแสง ☀️",
    "illustrationSubtitle": {
      "th": "คำศัพท์พระอาทิตย์",
      "en": "Synonym for Sun",
      "zh": "太阳同义词"
    },
    "options": [
      {
        "id": "opt-k3-thai-e3-1",
        "label": {
          "th": "ดวงจันทร์",
          "en": "Moon",
          "zh": "月亮"
        },
        "icon": "🌙"
      },
      {
        "id": "opt-k3-thai-e3-2",
        "label": {
          "th": "ดวงดาว",
          "en": "Star",
          "zh": "星星"
        },
        "icon": "⭐"
      },
      {
        "id": "opt-k3-thai-e3-3",
        "label": {
          "th": "ดวงตะวัน",
          "en": "Sun (Tawan)",
          "zh": "太阳 (ตะวัน)"
        },
        "icon": "☀️"
      }
    ],
    "correctOptionId": "opt-k3-thai-e3-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ดวงตะวัน แปลว่า พระอาทิตย์ ☀️",
      "en": "Awesome! ดวงตะวัน is the sun ☀️",
      "zh": "太棒了！ดวงตะวัน 就是太阳的意思 ☀️"
    }
  },
  {
    "id": "k3-thai-e4",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"นกกระจิบ\" มีเสียงเริ่มต้นด้วยพยัญชนะตัวใด? 🐦",
      "en": "What is the initial consonant of \"นก\"? 🐦",
      "zh": "“นก (鸟)”以哪个字母作为声母？🐦"
    },
    "illustration": "🐦 น-ก นก 🐦",
    "illustrationSubtitle": {
      "th": "พยัญชนะต้น",
      "en": "Initial consonant",
      "zh": "声母字母"
    },
    "options": [
      {
        "id": "opt-k3-thai-e4-1",
        "label": {
          "th": "น (น หนู)",
          "en": "Nor Noo",
          "zh": "น (老鼠)"
        },
        "icon": "🐭"
      },
      {
        "id": "opt-k3-thai-e4-2",
        "label": {
          "th": "บ (บ ใบไม้)",
          "en": "Bor Baimai",
          "zh": "บ"
        },
        "icon": "🍃"
      },
      {
        "id": "opt-k3-thai-e4-3",
        "label": {
          "th": "ม (ม ม้า)",
          "en": "Mor Ma",
          "zh": "ม"
        },
        "icon": "🐴"
      }
    ],
    "correctOptionId": "opt-k3-thai-e4-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! นก ขึ้นต้นด้วย น หนู 🐦",
      "en": "Spot on! นก begins with letter น 🐦",
      "zh": "答对了！นก 以 น 开头 🐦"
    }
  },
  {
    "id": "k3-thai-e5",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"เพื่อน\" มีความหมายตรงกับข้อใดเอ่ย? 🤝",
      "en": "What does \"เพื่อน\" (Friend) mean? 🤝",
      "zh": "“เพื่อน (朋友)”是什么意思？🤝"
    },
    "illustration": "🤝 เพื่อนรักร่วมชั้นเรียน 👭",
    "illustrationSubtitle": {
      "th": "ความหมายคำว่าเพื่อน",
      "en": "Friend meaning",
      "zh": "朋友的含义"
    },
    "options": [
      {
        "id": "opt-k3-thai-e5-1",
        "label": {
          "th": "คนแปลกหน้า",
          "en": "Stranger",
          "zh": "陌生人"
        },
        "icon": "👤"
      },
      {
        "id": "opt-k3-thai-e5-2",
        "label": {
          "th": "มิตรผู้ร่วมเล่นร่วมเรียนด้วยความสนิทสนม",
          "en": "Friend / Playmate",
          "zh": "朋友、伙伴"
        },
        "icon": "🤝"
      },
      {
        "id": "opt-k3-thai-e5-3",
        "label": {
          "th": "คนทะเลาะกัน",
          "en": "Enemies",
          "zh": "吵架的人"
        },
        "icon": "😡"
      }
    ],
    "correctOptionId": "opt-k3-thai-e5-2",
    "explanation": {
      "th": "เก่งมากจ้า! เพื่อน คือมิตรที่รักใคร่แบ่งปันกัน 🤝",
      "en": "Brilliant! เพื่อน means friend and playmate 🤝",
      "zh": "真聪明！เพื่อน 就是朋友伙伴 🤝"
    }
  },
  {
    "id": "k3-thai-e6",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำตรงข้าม: \"ขยัน\" ตรงข้ามกับคำว่าอะไรเอ่ย? 🐝",
      "en": "What is the opposite of \"ขยัน\" (Diligent)? 🐝",
      "zh": "“ขยัน (勤劳)”的反义词是什么？🐝"
    },
    "illustration": "🐝 ขยัน vs 🦥 ?",
    "illustrationSubtitle": {
      "th": "คำตรงข้าม ขยัน-ขี้เกียจ",
      "en": "Diligent vs Lazy",
      "zh": "反义词 勤劳与懒惰"
    },
    "options": [
      {
        "id": "opt-k3-thai-e6-1",
        "label": {
          "th": "ใจดี",
          "en": "Kind",
          "zh": "善良"
        },
        "icon": "😊"
      },
      {
        "id": "opt-k3-thai-e6-2",
        "label": {
          "th": "ฉลาด",
          "en": "Smart",
          "zh": "聪明"
        },
        "icon": "💡"
      },
      {
        "id": "opt-k3-thai-e6-3",
        "label": {
          "th": "ขี้เกียจ",
          "en": "Lazy",
          "zh": "懒惰 (ขี้เกียจ)"
        },
        "icon": "🦥"
      }
    ],
    "correctOptionId": "opt-k3-thai-e6-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ขยันทำงาน ตรงข้ามกับ ขี้เกียจนอนเฉย 🦥",
      "en": "Super! ขยัน (Diligent) is opposite of ขี้เกียจ (Lazy) 🦥",
      "zh": "太棒了！勤劳的反义词是懒惰 (ขี้เกียจ) 🦥"
    }
  },
  {
    "id": "k3-thai-e7",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำสัมผัสคล้องจอง: \"กอบัว\" สัมผัสสระกับคำใดเอ่ย? 🪷",
      "en": "Rhyme: \"กอบัว\" (Lotus pond) rhymes with which word? 🪷",
      "zh": "哪个词和“กอบัว”押韵？🪷"
    },
    "illustration": "🪷 กอบัว สระอัว คล้องจองกับ ... ? 🐮",
    "illustrationSubtitle": {
      "th": "คำคล้องจองสระอัว",
      "en": "Rhyme with Bua",
      "zh": "押韵词"
    },
    "options": [
      {
        "id": "opt-k3-thai-e7-1",
        "label": {
          "th": "วัวตัวโต",
          "en": "Wua (Cow)",
          "zh": "牛 (วัว)"
        },
        "icon": "🐮"
      },
      {
        "id": "opt-k3-thai-e7-2",
        "label": {
          "th": "ม้าวิ่งเร็ว",
          "en": "Horse running",
          "zh": "快马"
        },
        "icon": "🐴"
      },
      {
        "id": "opt-k3-thai-e7-3",
        "label": {
          "th": "ไก่ขันเจื้อยแจ้ว",
          "en": "Rooster crowing",
          "zh": "公鸡叫"
        },
        "icon": "🐔"
      }
    ],
    "correctOptionId": "opt-k3-thai-e7-1",
    "explanation": {
      "th": "ถูกต้องจ้า! กอ\"บัว\" สัมผัสกับ \"วัว\"ตัวโต สระอัว เหมือนกัน 🪷🐮",
      "en": "Awesome! บัว and วัว rhyme on vowel Oua 🪷🐮",
      "zh": "答对了！บัว 和 วัว 都是元音 อัว 🪷🐮"
    }
  },
  {
    "id": "k3-thai-e8",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"ฝนตก\" เกิดจากสิ่งใดบนท้องฟ้า? 🌧️",
      "en": "What brings \"ฝนตก\" (Rainfall)? 🌧️",
      "zh": "“ฝนตก (下雨)”从天空中的什么落下来？🌧️"
    },
    "illustration": "🌧️ ฝนตกโปรยปราย ☁️",
    "illustrationSubtitle": {
      "th": "ความหมาย ฝนตก",
      "en": "Rainfall meaning",
      "zh": "下雨的常识"
    },
    "options": [
      {
        "id": "opt-k3-thai-e8-1",
        "label": {
          "th": "ดวงอาทิตย์",
          "en": "Sun",
          "zh": "太阳"
        },
        "icon": "☀️"
      },
      {
        "id": "opt-k3-thai-e8-2",
        "label": {
          "th": "เมฆฝนรวมตัวกันหนาแน่น",
          "en": "Rain clouds",
          "zh": "云层聚积成雨"
        },
        "icon": "🌧️"
      },
      {
        "id": "opt-k3-thai-e8-3",
        "label": {
          "th": "ดวงดาว",
          "en": "Stars",
          "zh": "星星"
        },
        "icon": "⭐"
      }
    ],
    "correctOptionId": "opt-k3-thai-e8-2",
    "explanation": {
      "th": "เก่งมากจ้า! เมฆฝนรวมตัวกลั่นเป็นหยดน้ำฝนตกโปรยปราย 🌧️",
      "en": "Spot on! Clouds condense into rainfall 🌧️",
      "zh": "真聪明！雨滴是从厚厚的雨云落下的 🌧️"
    }
  },
  {
    "id": "k3-thai-e9",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำตรงข้าม: \"กว้าง\" ตรงข้ามกับคำว่าอะไรเอ่ย? ↔️",
      "en": "What is the opposite of \"กว้าง\" (Wide)? ↔️",
      "zh": "“กว้าง (宽阔)”的反义词是什么？↔️"
    },
    "illustration": "↔️ กว้าง vs 🤏 ?",
    "illustrationSubtitle": {
      "th": "คำตรงข้าม กว้าง-แคบ",
      "en": "Wide vs Narrow",
      "zh": "反义词 宽与窄"
    },
    "options": [
      {
        "id": "opt-k3-thai-e9-1",
        "label": {
          "th": "ยาว",
          "en": "Long",
          "zh": "长"
        },
        "icon": "📏"
      },
      {
        "id": "opt-k3-thai-e9-2",
        "label": {
          "th": "หนา",
          "en": "Thick",
          "zh": "厚"
        },
        "icon": "📚"
      },
      {
        "id": "opt-k3-thai-e9-3",
        "label": {
          "th": "แคบ",
          "en": "Narrow",
          "zh": "狭窄 (แคบ)"
        },
        "icon": "🤏"
      }
    ],
    "correctOptionId": "opt-k3-thai-e9-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ถนนกว้างใหญ่ ตรงข้ามกับ ซอยแคบ ↔️🤏",
      "en": "Brilliant! กว้าง (Wide) is opposite to แคบ (Narrow) 🤏",
      "zh": "太棒了！宽 (กว้าง) 的反义词是窄 (แคบ) 🤏"
    }
  },
  {
    "id": "k3-thai-e10",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 1,
    "question": {
      "th": "คำประสม: \"รถ\" + \"ไฟ\" รวมกันเป็นยานพาหนะใด? 🚆",
      "en": "Compound word: \"รถ\" (Car) + \"ไฟ\" (Fire/Power) = ?",
      "zh": "复合词：“รถ (车)” + “ไฟ (火)”组合成什么车？"
    },
    "illustration": "🚆 ปู๊นๆ ฉึกฉัก 🚆",
    "illustrationSubtitle": {
      "th": "คำประสม รถไฟ",
      "en": "Train compound",
      "zh": "火车复合词"
    },
    "options": [
      {
        "id": "opt-k3-thai-e10-1",
        "label": {
          "th": "รถไฟ",
          "en": "Train (Rot-fai)",
          "zh": "火车 (รถไฟ)"
        },
        "icon": "🚆"
      },
      {
        "id": "opt-k3-thai-e10-2",
        "label": {
          "th": "เครื่องบิน",
          "en": "Airplane",
          "zh": "飞机"
        },
        "icon": "✈️"
      },
      {
        "id": "opt-k3-thai-e10-3",
        "label": {
          "th": "เรือพาย",
          "en": "Boat",
          "zh": "小木船"
        },
        "icon": "🛶"
      }
    ],
    "correctOptionId": "opt-k3-thai-e10-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! รถ + ไฟ รวมกันเป็น รถไฟ ปู๊นๆ ฉึกฉัก 🚆",
      "en": "Awesome! รถ + ไฟ forms Train (รถไฟ) 🚆",
      "zh": "答对了！组合在一起是火车 รถไฟ 🚆"
    }
  },
  {
    "id": "k3-thai-m1",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำว่า \"นิทาน\" มักขึ้นต้นด้วยประโยคใดที่เด็กๆ คุ้นเคย? 📖",
      "en": "How do classic Thai fairy tales often begin? 📖",
      "zh": "泰语童话故事常常以哪句开篇？📖"
    },
    "illustration": "📖 กาลครั้งหนึ่งนานมาแล้ว ✨",
    "illustrationSubtitle": {
      "th": "การเปิดเรื่องนิทาน",
      "en": "Once upon a time in Thai",
      "zh": "童话故事开头"
    },
    "options": [
      {
        "id": "opt-k3-thai-m1-1",
        "label": {
          "th": "พรุ่งนี้เช้า",
          "en": "Tomorrow morning",
          "zh": "明天早上"
        },
        "icon": "🌅"
      },
      {
        "id": "opt-k3-thai-m1-2",
        "label": {
          "th": "กาลครั้งหนึ่งนานมาแล้ว",
          "en": "Once upon a time",
          "zh": "很久很久以前"
        },
        "icon": "🏰"
      },
      {
        "id": "opt-k3-thai-m1-3",
        "label": {
          "th": "สิ้นสุดลงแล้ว",
          "en": "The end",
          "zh": "故事结束了"
        },
        "icon": "🏁"
      }
    ],
    "correctOptionId": "opt-k3-thai-m1-2",
    "explanation": {
      "th": "เก่งมากจ้า! นิทานมักเปิดเรื่องด้วย \"กาลครั้งหนึ่งนานมาแล้ว\" 🏰📖",
      "en": "Super! Classic tales start with \"Once upon a time\" 🏰📖",
      "zh": "真聪明！童话故事常常以“很久很久以前”开头 📖"
    }
  },
  {
    "id": "k3-thai-m2",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำสัมผัสสี่สุภาพ: \"รักชาติ\" คล้องจองกับข้อใดเอ่ย? 🇹🇭",
      "en": "Rhyming: \"รักชาติ\" rhymes with which phrase? 🇹🇭",
      "zh": "押韵：“รักชาติ”和哪个短语押韵？🇹🇭"
    },
    "illustration": "🇹🇭 ชาติ คล้องจองกับ ... ? ศาสน์",
    "illustrationSubtitle": {
      "th": "คำคล้องจองแม่กด",
      "en": "Rhyming on -at",
      "zh": "押韵词"
    },
    "options": [
      {
        "id": "opt-k3-thai-m2-1",
        "label": {
          "th": "รักครอบครัว",
          "en": "Love family",
          "zh": "爱家庭"
        },
        "icon": "👨‍👩‍👧"
      },
      {
        "id": "opt-k3-thai-m2-2",
        "label": {
          "th": "ไปโรงเรียน",
          "en": "Go to school",
          "zh": "去上学"
        },
        "icon": "🏫"
      },
      {
        "id": "opt-k3-thai-m2-3",
        "label": {
          "th": "ศาสน์กษัตริย์",
          "en": "Sat-kasat",
          "zh": "宗教与国王"
        },
        "icon": "👑"
      }
    ],
    "correctOptionId": "opt-k3-thai-m2-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ชาติ กับ ศาสน์ สัมผัสสระอา แม่กด เหมือนกัน 🇹🇭👑",
      "en": "Spot on! ชาติ and ศาสน์ rhyme on vowel Ah + -d 🇹🇭👑",
      "zh": "太棒了！ชาติ 和 ศาสน์ 押韵 🇹🇭"
    }
  },
  {
    "id": "k3-thai-m3",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำตรงข้าม: \"สัจจะ (ความจริง)\" ตรงข้ามกับคำว่าอะไร? 💎",
      "en": "What is the opposite of truth (ความจริง)? 💎",
      "zh": "“ความจริง (真实)”的反义词是什么？💎"
    },
    "illustration": "💎 ความจริง vs 🤥 ?",
    "illustrationSubtitle": {
      "th": "คำตรงข้าม จริง-โกหก",
      "en": "Truth vs Lie",
      "zh": "反义词 真与假"
    },
    "options": [
      {
        "id": "opt-k3-thai-m3-1",
        "label": {
          "th": "ความเท็จ / โกหก",
          "en": "Lie / Falsehood",
          "zh": "虚假 / 说谎"
        },
        "icon": "🤥"
      },
      {
        "id": "opt-k3-thai-m3-2",
        "label": {
          "th": "ความสุข",
          "en": "Happiness",
          "zh": "幸福"
        },
        "icon": "😊"
      },
      {
        "id": "opt-k3-thai-m3-3",
        "label": {
          "th": "ความรัก",
          "en": "Love",
          "zh": "爱心"
        },
        "icon": "❤️"
      }
    ],
    "correctOptionId": "opt-k3-thai-m3-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! ความจริง ตรงข้ามกับ ความเท็จ หรือคำโกหก 💎🤥",
      "en": "Awesome! Truth is opposite to lies 💎🤥",
      "zh": "答对了！真实的反义词是虚假/说谎 🤥"
    }
  },
  {
    "id": "k3-thai-m4",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำว่า \"กล้าหาญ\" มีความหมายตรงกับข้อใดเอ่ย? 🦁",
      "en": "What does \"กล้าหาญ\" (Brave) mean? 🦁",
      "zh": "“กล้าหาญ (勇敢)”是什么意思？🦁"
    },
    "illustration": "🦁 มีใจกล้าหาญ 🛡️",
    "illustrationSubtitle": {
      "th": "ความหมายของกล้าหาญ",
      "en": "Brave meaning",
      "zh": "勇敢的含义"
    },
    "options": [
      {
        "id": "opt-k3-thai-m4-1",
        "label": {
          "th": "กลัวทุกอย่างจนร้องไห้",
          "en": "Frightened easily",
          "zh": "害怕胆小"
        },
        "icon": "😨"
      },
      {
        "id": "opt-k3-thai-m4-2",
        "label": {
          "th": "ไม่กลัวอุปสรรค กล้าทำสิ่งที่ถูกต้อง",
          "en": "Courageous to do right",
          "zh": "勇敢面对，敢作敢当"
        },
        "icon": "🦁"
      },
      {
        "id": "opt-k3-thai-m4-3",
        "label": {
          "th": "วิ่งหนีปัญหา",
          "en": "Run away",
          "zh": "逃跑"
        },
        "icon": "🏃"
      }
    ],
    "correctOptionId": "opt-k3-thai-m4-2",
    "explanation": {
      "th": "เก่งมากจ้า! กล้าหาญ คือมีความมั่นใจ ไม่กลัวความยากลำบาก 🦁🛡️",
      "en": "Brilliant! Brave means having courage to do what is right 🦁🛡️",
      "zh": "真聪明！勇敢就是敢于战胜困难、做正确的事 🦁"
    }
  },
  {
    "id": "k3-thai-m5",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "ประโยค \"น้องกินข้าว\" ใครเป็นประธานผู้กระทำ? 🧒",
      "en": "In \"น้องกินข้าว\" (Sister eats rice), who is the subject? 🧒",
      "zh": "在句子“น้องกินข้าว (弟弟/妹妹吃饭)”中，谁是主语？🧒"
    },
    "illustration": "🧒 น้อง กิน ข้าว 🍚",
    "illustrationSubtitle": {
      "th": "โครงสร้างประโยค ประธาน-กริยา-กรรม",
      "en": "Sentence subject",
      "zh": "句子主语"
    },
    "options": [
      {
        "id": "opt-k3-thai-m5-1",
        "label": {
          "th": "ข้าว (กรรม)",
          "en": "Rice (Object)",
          "zh": "米饭 (宾语)"
        },
        "icon": "🍚"
      },
      {
        "id": "opt-k3-thai-m5-2",
        "label": {
          "th": "กิน (กริยา)",
          "en": "Eat (Verb)",
          "zh": "吃 (谓语动词)"
        },
        "icon": "🍽️"
      },
      {
        "id": "opt-k3-thai-m5-3",
        "label": {
          "th": "น้อง (ประธาน)",
          "en": "Younger sibling (Subject)",
          "zh": "弟弟/妹妹 (主语)"
        },
        "icon": "🧒"
      }
    ],
    "correctOptionId": "opt-k3-thai-m5-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! \"น้อง\" เป็นประธาน ส่วน \"กิน\" เป็นกริยา และ \"ข้าว\" เป็นกรรม 🧒🍚",
      "en": "Spot on! \"น้อง\" is the actor/subject of the sentence 🧒",
      "zh": "太棒了！“น้อง”是做动作的主语 🧒"
    }
  },
  {
    "id": "k3-thai-m6",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "ประโยค \"แม่รดน้ำต้นไม้\" กริยาการกระทำคือคำว่าอะไร? 👩",
      "en": "In \"แม่รดน้ำต้นไม้\" (Mom waters trees), what is the action verb? 👩",
      "zh": "在句子“แม่รดน้ำต้นไม้ (妈妈给植物浇水)”中，哪个词是动作？👩"
    },
    "illustration": "👩 รดน้ำ 🌺",
    "illustrationSubtitle": {
      "th": "คำกริยาในประโยค",
      "en": "Action verb",
      "zh": "句中动作谓语"
    },
    "options": [
      {
        "id": "opt-k3-thai-m6-1",
        "label": {
          "th": "รดน้ำ (กริยา)",
          "en": "Waters (Verb)",
          "zh": "浇水 (动作动词)"
        },
        "icon": "🚿"
      },
      {
        "id": "opt-k3-thai-m6-2",
        "label": {
          "th": "แม่ (ประธาน)",
          "en": "Mother (Subject)",
          "zh": "妈妈 (主语)"
        },
        "icon": "👩"
      },
      {
        "id": "opt-k3-thai-m6-3",
        "label": {
          "th": "ต้นไม้ (กรรม)",
          "en": "Trees (Object)",
          "zh": "树木 (宾语)"
        },
        "icon": "🌳"
      }
    ],
    "correctOptionId": "opt-k3-thai-m6-1",
    "explanation": {
      "th": "ถูกต้องจ้า! \"รดน้ำ\" คือกริยาแสดงการรดน้ำต้นไม้ 🚿🌸",
      "en": "Awesome! \"รดน้ำ\" is the action verb 🚿🌸",
      "zh": "答对了！“รดน้ำ”是浇水的动作 🚿"
    }
  },
  {
    "id": "k3-thai-m7",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำสุภาพ: เมื่อผู้ใหญ่ถามคำถาม เด็กผู้ชายควรลงท้ายด้วยคำว่าอะไร? 👦",
      "en": "What polite particle should young boys end sentences with? 👦",
      "zh": "男孩子回答长辈提问时，句尾应加什么礼貌词？👦"
    },
    "illustration": "👦 พูดจาไพเราะน่ารัก ✨",
    "illustrationSubtitle": {
      "th": "คำลงท้ายสุภาพเด็กชาย",
      "en": "Polite particle for boys",
      "zh": "男性礼貌语气词"
    },
    "options": [
      {
        "id": "opt-k3-thai-m7-1",
        "label": {
          "th": "จ้ะ",
          "en": "Ja",
          "zh": "亲切语气 ะ"
        },
        "icon": "🌸"
      },
      {
        "id": "opt-k3-thai-m7-2",
        "label": {
          "th": "ครับ",
          "en": "Khrab",
          "zh": "礼貌语气 ครับ"
        },
        "icon": "👦"
      },
      {
        "id": "opt-k3-thai-m7-3",
        "label": {
          "th": "ค่ะ",
          "en": "Kha",
          "zh": "女性礼貌语气 ค่ะ"
        },
        "icon": "👧"
      }
    ],
    "correctOptionId": "opt-k3-thai-m7-2",
    "explanation": {
      "th": "เก่งมากจ้า! เด็กผู้ชายพูดลงท้ายว่า \"ครับ\" อย่างสุภาพ 👦👍",
      "en": "Spot on! Boys politely conclude with \"ครับ\" (Khrab) 👦",
      "zh": "真聪明！小男孩句尾礼貌词用 ครับ 👦"
    }
  },
  {
    "id": "k3-thai-m8",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำสุภาพ: เมื่อผู้ใหญ่ถามคำถาม เด็กผู้หญิงควรลงท้ายด้วยคำว่าอะไร? 👧",
      "en": "What polite particle should young girls end sentences with? 👧",
      "zh": "女孩子回答长辈提问时，句尾应加什么礼貌词？👧"
    },
    "illustration": "👧 พูดจาไพเราะอ่อนหวาน ✨",
    "illustrationSubtitle": {
      "th": "คำลงท้ายสุภาพเด็กหญิง",
      "en": "Polite particle for girls",
      "zh": "女性礼貌语气词"
    },
    "options": [
      {
        "id": "opt-k3-thai-m8-1",
        "label": {
          "th": "ครับ",
          "en": "Khrab",
          "zh": "男性礼貌语气 ครับ"
        },
        "icon": "👦"
      },
      {
        "id": "opt-k3-thai-m8-2",
        "label": {
          "th": "ฮะ",
          "en": "Ha",
          "zh": "随意语气"
        },
        "icon": "🗣️"
      },
      {
        "id": "opt-k3-thai-m8-3",
        "label": {
          "th": "ค่ะ / คะ",
          "en": "Kha / Kha",
          "zh": "女性礼貌语气 ค่ะ/คะ"
        },
        "icon": "👧"
      }
    ],
    "correctOptionId": "opt-k3-thai-m8-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! เด็กผู้หญิงพูดลงท้ายว่า \"ค่ะ / คะ\" น่ารักไพเราะ 👧🌸",
      "en": "Super! Girls politely conclude with \"ค่ะ / คะ\" 👧🌸",
      "zh": "太棒了！小女孩句尾礼貌词用 ค่ะ / คะ 👧"
    }
  },
  {
    "id": "k3-thai-m9",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "คำว่า \"นอบน้อม\" มีความหมายตรงกับกิริยามารยาทใด? 🙏",
      "en": "What gesture shows \"นอบน้อม\" (Humble respect)? 🙏",
      "zh": "“นอบน้อม (谦逊礼貌)”体现为哪种举止？🙏"
    },
    "illustration": "🙏 นอบน้อมถ่อมตน ✨",
    "illustrationSubtitle": {
      "th": "มารยาทไทย",
      "en": "Humble respect in Thai etiquette",
      "zh": "泰式谦逊礼仪"
    },
    "options": [
      {
        "id": "opt-k3-thai-m9-1",
        "label": {
          "th": "ก้มศีรษะ ไหว้ทักทายผู้ใหญ่ด้วยความเคารพ",
          "en": "Bow head and Wai respectfully",
          "zh": "恭敬向长辈行合十礼"
        },
        "icon": "🙏"
      },
      {
        "id": "opt-k3-thai-m9-2",
        "label": {
          "th": "เดินผ่านผู้ใหญ่โดยไม่มอง",
          "en": "Ignore elders",
          "zh": "无视长辈走过"
        },
        "icon": "🚶"
      },
      {
        "id": "opt-k3-thai-m9-3",
        "label": {
          "th": "ส่งเสียงเอะอะโวยวาย",
          "en": "Yell loudly",
          "zh": "大声喧哗"
        },
        "icon": "📢"
      }
    ],
    "correctOptionId": "opt-k3-thai-m9-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! นอบน้อม คือการมีสัมมาคารวะ ไหว้และก้มตัวผ่านผู้ใหญ่ 🙏✨",
      "en": "Brilliant! Bowing politely with Wai shows Thai respect 🙏✨",
      "zh": "完全正确！对长辈谦逊行礼并低头走过 🙏"
    }
  },
  {
    "id": "k3-thai-m10",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 2,
    "question": {
      "th": "สุภาษิตสอนใจ: \"ความพยายามอยู่ที่ไหน ... อยู่ที่นั่น\" ควรเติมคำใด? 🏆",
      "en": "Thai proverb: \"Where there is effort, there is ...\"? 🏆",
      "zh": "泰国谚语：“有志者，事竟……”应该填哪个词？🏆"
    },
    "illustration": "🏆 ความพยายามนำพาไปสู่สิ่งใด 🌟",
    "illustrationSubtitle": {
      "th": "สุภาษิตไทย",
      "en": "Thai proverb on success",
      "zh": "泰国谚语"
    },
    "options": [
      {
        "id": "opt-k3-thai-m10-1",
        "label": {
          "th": "ความล้มเหลว",
          "en": "Failure",
          "zh": "失败"
        },
        "icon": "🌧️"
      },
      {
        "id": "opt-k3-thai-m10-2",
        "label": {
          "th": "ความสำเร็จ",
          "en": "Success",
          "zh": "成功 (ความสำเร็จ)"
        },
        "icon": "🏆"
      },
      {
        "id": "opt-k3-thai-m10-3",
        "label": {
          "th": "ความมืด",
          "en": "Darkness",
          "zh": "黑暗"
        },
        "icon": "🌑"
      }
    ],
    "correctOptionId": "opt-k3-thai-m10-2",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ความพยายามอยู่ที่ไหน ความสำเร็จอยู่ที่นั่น 🏆✨",
      "en": "Awesome! Effort brings success (ความสำเร็จ) 🏆✨",
      "zh": "太棒了！世上无难事，功到自然成 🏆✨"
    }
  },
  {
    "id": "k3-thai-h1",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำประสมสามส่วน: \"โรง\" + \"พยา\" + \"บาล\" หมายถึงสถานที่ใด? 🏥",
      "en": "Compound word: \"โรงพยาบาล\" refers to which place? 🏥",
      "zh": "“โรงพยาบาล (医院)”指什么场所？🏥"
    },
    "illustration": "🏥 โรงพยาบาล 🩺",
    "illustrationSubtitle": {
      "th": "สถานที่บำบัดรักษา",
      "en": "Hospital compound",
      "zh": "医院复合词"
    },
    "options": [
      {
        "id": "opt-k3-thai-h1-1",
        "label": {
          "th": "โรงหนัง",
          "en": "Cinema",
          "zh": "电影院"
        },
        "icon": "🎬"
      },
      {
        "id": "opt-k3-thai-h1-2",
        "label": {
          "th": "โรงเรียน",
          "en": "School",
          "zh": "学校"
        },
        "icon": "🏫"
      },
      {
        "id": "opt-k3-thai-h1-3",
        "label": {
          "th": "โรงพยาบาล (ที่รักษาคนป่วย)",
          "en": "Hospital",
          "zh": "医院"
        },
        "icon": "🏥"
      }
    ],
    "correctOptionId": "opt-k3-thai-h1-3",
    "explanation": {
      "th": "ถูกต้องจ้า! โรงพยาบาล คือสถานที่ที่คุณหมอและพยาบาลช่วยดูแลรักษาคนไข้ 🏥🩺",
      "en": "Spot on! โรงพยาบาล is hospital 🏥🩺",
      "zh": "答对了！โรงพยาบาล 是医院 🏥"
    }
  },
  {
    "id": "k3-thai-h2",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"กตัญญู\" มีความหมายตรงกับการกระทำของใครเอ่ย? 💐",
      "en": "Which action displays \"กตัญญู\" (Gratitude to parents)? 💐",
      "zh": "哪个行为体现了“กตัญญู (孝顺感恩)”？💐"
    },
    "illustration": "💐 กตัญญูกตเวที 🙏",
    "illustrationSubtitle": {
      "th": "ความกตัญญู",
      "en": "Gratitude to parents",
      "zh": "孝顺常识"
    },
    "options": [
      {
        "id": "opt-k3-thai-h2-1",
        "label": {
          "th": "ช่วยคุณพ่อคุณแม่ทำงานบ้าน และดูแลยามท่านเหนื่อย",
          "en": "Help parents with chores",
          "zh": "帮父母做家务、关心父母"
        },
        "icon": "💐"
      },
      {
        "id": "opt-k3-thai-h2-2",
        "label": {
          "th": "ดื้อรั้น ไม่ยอมฟังคำสั่งสอน",
          "en": "Disobedient",
          "zh": "任性不听话"
        },
        "icon": "🙅"
      },
      {
        "id": "opt-k3-thai-h2-3",
        "label": {
          "th": "แอบเอาขนมไปกินคนเดียว",
          "en": "Eat snacks secretly",
          "zh": "偷偷一个人吃零食"
        },
        "icon": "🍬"
      }
    ],
    "correctOptionId": "opt-k3-thai-h2-1",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! กตัญญู คือการรู้คุณและตอบแทนคุณพ่อแม่ผู้มีพระคุณ 💐🙏",
      "en": "Super! Helping parents shows gratitude and filial piety 💐🙏",
      "zh": "太棒了！孝顺感恩就是体贴父母、帮做家务 💐"
    }
  },
  {
    "id": "k3-thai-h3",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"ซื่อสัตย์\" ตรงกับพฤติกรรมในข้อใดมากที่สุด? 💎",
      "en": "Which action best demonstrates \"ซื่อสัตย์\" (Honesty)? 💎",
      "zh": "哪种行为最能体现“ซื่อสัตย์ (诚实守信)”？💎"
    },
    "illustration": "💎 ความซื่อสัตย์สุจริต ✨",
    "illustrationSubtitle": {
      "th": "ความซื่อสัตย์",
      "en": "Honesty meaning",
      "zh": "诚实的品质"
    },
    "options": [
      {
        "id": "opt-k3-thai-h3-1",
        "label": {
          "th": "โกหกเมื่อทำแก้วแตก",
          "en": "Lie about breaking a glass",
          "zh": "打碎玻璃杯后撒谎"
        },
        "icon": "🥛"
      },
      {
        "id": "opt-k3-thai-h3-2",
        "label": {
          "th": "เก็บเงินได้แล้วนำส่งคืนคุณครูเพื่อตามหาเจ้าของ",
          "en": "Return found money to owner",
          "zh": "捡到钱交给老师物归原主"
        },
        "icon": "💰"
      },
      {
        "id": "opt-k3-thai-h3-3",
        "label": {
          "th": "แอบหยิบดินสอเพื่อนไปใช้",
          "en": "Take friend's pencil without asking",
          "zh": "偷偷拿同学的铅笔"
        },
        "icon": "✏️"
      }
    ],
    "correctOptionId": "opt-k3-thai-h3-2",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! ซื่อสัตย์ คือไม่พูดปด ไม่หยิบของผู้อื่น และคืนของที่เก็บได้ 💎💰",
      "en": "Spot on! Returning lost items proves true honesty 💎💰",
      "zh": "完全正确！捡到东西归还就是诚实守信 💎"
    }
  },
  {
    "id": "k3-thai-h4",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำคล้องจองสามวรรค: \"น้ำใส - ไหลเย็น - ...\" ควรต่อด้วยข้อความใด? 🏞️",
      "en": "Rhyme continuation: \"น้ำใส - ไหลเย็น - ...\"? 🏞️",
      "zh": "押韵接龙：“น้ำใส - ไหลเย็น - ……”接下来接哪句？🏞️"
    },
    "illustration": "🏞️ น้ำใส ไหลเย็น ... 🐟",
    "illustrationSubtitle": {
      "th": "คำคล้องจองเชื่อมโยงเสียง",
      "en": "Continuous rhyming",
      "zh": "连贯押韵"
    },
    "options": [
      {
        "id": "opt-k3-thai-h4-1",
        "label": {
          "th": "คนวิ่งเร็ว",
          "en": "People run fast",
          "zh": "人跑得快"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k3-thai-h4-2",
        "label": {
          "th": "เมฆลอยสูง",
          "en": "Clouds float high",
          "zh": "白云飘得高"
        },
        "icon": "☁️"
      },
      {
        "id": "opt-k3-thai-h4-3",
        "label": {
          "th": "เห็นตัวปลา",
          "en": "Hen tua pla (See fishes)",
          "zh": "清澈见鱼游"
        },
        "icon": "🐟"
      }
    ],
    "correctOptionId": "opt-k3-thai-h4-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! น้ำใส ไหล\"เย็น\" - \"เห็น\"ตัวปลา (เย็น สัมผัสกับ เห็น สระเอะ+แม่กน) 🏞️🐟",
      "en": "Awesome! \"เย็น\" and \"เห็น\" rhyme smoothly 🏞️🐟",
      "zh": "太棒了！เย็น 和 เห็น 押韵，读起来朗朗上口 🏞️🐟"
    }
  },
  {
    "id": "k3-thai-h5",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"สามัคคี\" มีความสำคัญอย่างไรต่อสังคมและโรงเรียน? 🤝",
      "en": "Why is \"สามัคคี\" (Unity / Teamwork) important? 🤝",
      "zh": "“สามัคคี (团结协作)”对班级和学校有什么意义？🤝"
    },
    "illustration": "🤝 รวมพลังสามัคคี 🏆",
    "illustrationSubtitle": {
      "th": "ความสามัคคี",
      "en": "Unity meaning",
      "zh": "团结的意义"
    },
    "options": [
      {
        "id": "opt-k3-thai-h5-1",
        "label": {
          "th": "ทำให้ทุกคนร่วมมือกัน ทำงานใหญ่สำเร็จลุล่วง",
          "en": "Everyone unites to achieve great success",
          "zh": "大家齐心协力，共同完成目标"
        },
        "icon": "🤝"
      },
      {
        "id": "opt-k3-thai-h5-2",
        "label": {
          "th": "ทำให้คนทะเลาะเบาะแว้งกัน",
          "en": "Causes fights",
          "zh": "导致吵架冲突"
        },
        "icon": "😡"
      },
      {
        "id": "opt-k3-thai-h5-3",
        "label": {
          "th": "ทำให้ต่างคนต่างอยู่",
          "en": "Isolates people",
          "zh": "让大家各自孤立"
        },
        "icon": "🚶"
      }
    ],
    "correctOptionId": "opt-k3-thai-h5-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! สามัคคีคือพลัง ช่วยให้งานสำเร็จและอยู่ร่วมกันอย่างมีความสุข 🤝🏆",
      "en": "Brilliant! Unity brings harmony and success 🤝🏆",
      "zh": "答对了！团结就是力量，大家齐心协力创造成功 🤝"
    }
  },
  {
    "id": "k3-thai-h6",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำใดเป็นคำประสมที่หมายถึง \"ผู้ขับขี่ยานพาหนะบนท้องถนน\"? 🚗",
      "en": "Which Thai word means a vehicle driver? 🚗",
      "zh": "哪个泰语词指代“汽车驾驶员/司机”？🚗"
    },
    "illustration": "🚗 คนขับรถ 🚦",
    "illustrationSubtitle": {
      "th": "คำประสม คนขับรถ",
      "en": "Driver compound",
      "zh": "驾驶员复合词"
    },
    "options": [
      {
        "id": "opt-k3-thai-h6-1",
        "label": {
          "th": "คนเดินถนน",
          "en": "Pedestrian",
          "zh": "行人"
        },
        "icon": "🚶"
      },
      {
        "id": "opt-k3-thai-h6-2",
        "label": {
          "th": "คนขับรถ",
          "en": "Driver (Khon-khap-rot)",
          "zh": "司机 (คนขับรถ)"
        },
        "icon": "🚗"
      },
      {
        "id": "opt-k3-thai-h6-3",
        "label": {
          "th": "คนซ่อมรถ",
          "en": "Mechanic",
          "zh": "修车工"
        },
        "icon": "🔧"
      }
    ],
    "correctOptionId": "opt-k3-thai-h6-2",
    "explanation": {
      "th": "เก่งมากจ้า! คน + ขับ + รถ รวมเป็น \"คนขับรถ\" 🚗",
      "en": "Spot on! คนขับรถ is driver 🚗",
      "zh": "真聪明！คน + ขับ + รถ 是驾驶员 🚗"
    }
  },
  {
    "id": "k3-thai-h7",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำตรงข้าม: \"สงบ\" ตรงข้ามกับคำว่าอะไรเอ่ย? 🕊️",
      "en": "What is the opposite of \"สงบ\" (Peaceful)? 🕊️",
      "zh": "“สงบ (宁静安详)”的反义词是什么？🕊️"
    },
    "illustration": "🕊️ สงบ vs 💥 ?",
    "illustrationSubtitle": {
      "th": "คำตรงข้าม สงบ-วุ่นวาย",
      "en": "Peaceful vs Chaotic",
      "zh": "反义词 宁静与混乱"
    },
    "options": [
      {
        "id": "opt-k3-thai-h7-1",
        "label": {
          "th": "เงียบ",
          "en": "Quiet",
          "zh": "安静"
        },
        "icon": "🤫"
      },
      {
        "id": "opt-k3-thai-h7-2",
        "label": {
          "th": "สุข",
          "en": "Happy",
          "zh": "幸福"
        },
        "icon": "😊"
      },
      {
        "id": "opt-k3-thai-h7-3",
        "label": {
          "th": "วุ่นวาย",
          "en": "Chaotic / Restless",
          "zh": "混乱喧嚣 (วุ่นวาย)"
        },
        "icon": "💥"
      }
    ],
    "correctOptionId": "opt-k3-thai-h7-3",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! สงบเงียบ ตรงข้ามกับ วุ่นวายสับสน 🕊️💥",
      "en": "Super! สงบ (Peaceful) is opposite to วุ่นวาย (Chaotic) 🕊️💥",
      "zh": "太棒了！宁静的反义词是混乱喧闹 (วุ่นวาย) 💥"
    }
  },
  {
    "id": "k3-thai-h8",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"วันแม่แห่งชาติ\" ของประเทศไทย ตรงกับวันสำคัญในเดือนใด? 💙",
      "en": "Which month is Thailand's National Mother's Day? 💙",
      "zh": "泰国的“国家母亲节”在公历几月份？💙"
    },
    "illustration": "💙 วันแม่แห่งชาติ ดอกมะลิขาว 🌸",
    "illustrationSubtitle": {
      "th": "วันสำคัญของไทย",
      "en": "Mother's Day Thailand",
      "zh": "泰国母亲节常识"
    },
    "options": [
      {
        "id": "opt-k3-thai-h8-1",
        "label": {
          "th": "เดือนสิงหาคม (12 สิงหาคม)",
          "en": "August (12 Aug)",
          "zh": "八月份 (8月12日)"
        },
        "icon": "💙"
      },
      {
        "id": "opt-k3-thai-h8-2",
        "label": {
          "th": "เดือนมกราคม",
          "en": "January",
          "zh": "一月份"
        },
        "icon": "❄️"
      },
      {
        "id": "opt-k3-thai-h8-3",
        "label": {
          "th": "เดือนเมษายน",
          "en": "April",
          "zh": "四月份"
        },
        "icon": "💦"
      }
    ],
    "correctOptionId": "opt-k3-thai-h8-1",
    "explanation": {
      "th": "ถูกต้องแล้วจ้า! วันแม่แห่งชาติ ตรงกับวันที่ 12 สิงหาคม พร้อมมอบดอกมะลิขาว 💙🌸",
      "en": "Awesome! 12 August is Mother's Day with white jasmine 💙🌸",
      "zh": "答对了！泰国母亲节是8月12日，佩戴白茉莉花 💙"
    }
  },
  {
    "id": "k3-thai-h9",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"วันพ่อแห่งชาติ\" ของประเทศไทย ตรงกับวันสำคัญในเดือนใด? 💛",
      "en": "Which month is Thailand's National Father's Day? 💛",
      "zh": "泰国的“国家父亲节”在公历几月份？💛"
    },
    "illustration": "💛 วันพ่อแห่งชาติ ดอกพุทธรักษา 🌼",
    "illustrationSubtitle": {
      "th": "วันสำคัญของไทย",
      "en": "Father's Day Thailand",
      "zh": "泰国父亲节常识"
    },
    "options": [
      {
        "id": "opt-k3-thai-h9-1",
        "label": {
          "th": "เดือนมิถุนายน",
          "en": "June",
          "zh": "六月份"
        },
        "icon": "🌧️"
      },
      {
        "id": "opt-k3-thai-h9-2",
        "label": {
          "th": "เดือนธันวาคม (5 ธันวาคม)",
          "en": "December (5 Dec)",
          "zh": "十二月份 (12月5日)"
        },
        "icon": "💛"
      },
      {
        "id": "opt-k3-thai-h9-3",
        "label": {
          "th": "เดือนตุลาคม",
          "en": "October",
          "zh": "十月份"
        },
        "icon": "🍂"
      }
    ],
    "correctOptionId": "opt-k3-thai-h9-2",
    "explanation": {
      "th": "เก่งมากจ้า! วันพ่อแห่งชาติ ตรงกับวันที่ 5 ธันวาคม พร้อมมอบดอกพุทธรักษา 💛🌼",
      "en": "Spot on! 5 December is Father's Day in Thailand 💛🌼",
      "zh": "真聪明！泰国父亲节是12月5日 💛"
    }
  },
  {
    "id": "k3-thai-h10",
    "grade": "K3",
    "subject": "thai",
    "skillCode": "1",
    "difficulty": 3,
    "question": {
      "th": "การอ่านหนังสือเป็นประจำทุกวัน ให้ประโยชน์แก่เด็กๆ อย่างไร? 📖",
      "en": "What is the greatest benefit of reading daily? 📖",
      "zh": "每天坚持阅读给小朋友带来什么好处？📖"
    },
    "illustration": "📖 คลังปัญญาแห่งการอ่าน 🌟",
    "illustrationSubtitle": {
      "th": "ประโยชน์ของการอ่าน",
      "en": "Reading benefits",
      "zh": "阅读的益处"
    },
    "options": [
      {
        "id": "opt-k3-thai-h10-1",
        "label": {
          "th": "ทำให้สายตาสั้นลงอย่างเดียว",
          "en": "Only hurts eyes",
          "zh": "只会近视"
        },
        "icon": "👓"
      },
      {
        "id": "opt-k3-thai-h10-2",
        "label": {
          "th": "ทำให้ง่วงนอนทั้งวัน",
          "en": "Makes you sleepy",
          "zh": "让人整天打瞌睡"
        },
        "icon": "😴"
      },
      {
        "id": "opt-k3-thai-h10-3",
        "label": {
          "th": "เปิดโลกการเรียนรู้ ได้คำศัพท์ใหม่ และคิดเก่งขึ้น",
          "en": "Expands knowledge, vocab, and thinking",
          "zh": "开阔视野、学新词、思维更敏捷"
        },
        "icon": "🌟"
      }
    ],
    "correctOptionId": "opt-k3-thai-h10-3",
    "explanation": {
      "th": "ยอดเยี่ยมที่สุดจ้ะ! การอ่านเปิดประตูสู่ความรอบรู้ ช่วยให้เรียนเก่งและมีจินตนาการกว้างไกล 📖🌟",
      "en": "Brilliant! Daily reading builds vocabulary, intelligence, and imagination 📖🌟",
      "zh": "太棒了！坚持阅读能开拓视野，积累词汇，让思维更活跃 📖🌟"
    }
  }
];
