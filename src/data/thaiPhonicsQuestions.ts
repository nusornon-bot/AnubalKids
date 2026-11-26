import { Question } from '../types';
import { QUESTIONS_THAI_PHONICS_EXPANSION_3600 } from './thaiPhonicsExpansion/index';

export const BASE_THAI_PHONICS_QUESTIONS: Question[] = [
  {
    "id": "tp1-01",
    "grade": "P1",
    "subject": "phonics_consonant",
    "skillCode": "TP1",
    "difficulty": 1,
    "question": {
      "th": "พยัญชนะไทยมีทั้งหมดกี่ตัว ?",
      "en": "How many Thai consonant letters are there in total?",
      "zh": "泰语共有多少个辅音字母？"
    },
    "illustration": "🔤",
    "illustrationSubtitle": {
      "th": "ก ไก่ ถึง ฮ นกฮูก",
      "en": "From Kor Kai to Hor Nok-huk",
      "zh": "从 Kor Kai 到 Hor Nok-huk"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "๔๔ ตัว",
          "en": "44 letters",
          "zh": "44 个"
        },
        "icon": "⭐"
      },
      {
        "id": "opt2",
        "label": {
          "th": "๓๒ ตัว",
          "en": "32 letters",
          "zh": "32 个"
        },
        "icon": "📘"
      },
      {
        "id": "opt3",
        "label": {
          "th": "๒๖ ตัว",
          "en": "26 letters",
          "zh": "26 个"
        },
        "icon": "📙"
      }
    ],
    "correctOptionId": "opt1",
    "explanation": {
      "th": "พยัญชนะไทยมีทั้งหมด ๔๔ ตัว เริ่มจาก ก ไก่ ถึง ฮ นกฮูก",
      "en": "There are 44 Thai consonants starting from Kor Kai to Hor Nok-huk.",
      "zh": "泰语共有44个辅音字母，从 ก 到 ฮ。"
    }
  },
  {
    "id": "tp1-02",
    "grade": "P1",
    "subject": "phonics_consonant",
    "skillCode": "TP1",
    "difficulty": 1,
    "question": {
      "th": "พยัญชนะในข้อใดจัดเป็น \"อักษรกลาง\" ทั้งหมด ?",
      "en": "Which group contains only Middle-class consonants (Akson Klang)?",
      "zh": "以下哪组全部是中辅音？"
    },
    "illustration": "🐥",
    "illustrationSubtitle": {
      "th": "ไก่ จิก เด็ก ตาย บน ปาก โอ่ง",
      "en": "Memory mnemonic for Middle class",
      "zh": "中辅音口诀"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "ข ฉ ถ ผ ฝ ส ห",
          "en": "Khor, Chor, Thor, Phor, For, Sor, Hor",
          "zh": "ข ฉ ถ ผ ฝ ส ห"
        },
        "icon": "🔺"
      },
      {
        "id": "opt2",
        "label": {
          "th": "ก จ ด ต บ ป อ",
          "en": "Kor, Jor, Dor, Tor, Bor, Por, Or",
          "zh": "ก จ ด ต บ ป อ"
        },
        "icon": "🎯"
      },
      {
        "id": "opt3",
        "label": {
          "th": "ค ช ท พ ฟ ม ร",
          "en": "Khor, Chor, Thor, Phor, For, Mor, Ror",
          "zh": "ค ช ท พ ฟ ม ร"
        },
        "icon": "🔷"
      }
    ],
    "correctOptionId": "opt2",
    "explanation": {
      "th": "อักษรกลางมี ๙ ตัว ได้แก่ ก จ ด ต บ ป อ ฎ ฏ จำง่ายๆ: ไก่จิกเด็กตายเด็กตายบนปากโอ่ง",
      "en": "There are 9 middle-class consonants: ก จ ด ต บ ป อ ฎ ฏ.",
      "zh": "中辅音共有9个：ก จ ด ต บ ป อ ฎ ฏ。"
    }
  },
  {
    "id": "tp1-03",
    "grade": "P2",
    "subject": "phonics_consonant",
    "skillCode": "TP1",
    "difficulty": 2,
    "question": {
      "th": "พยัญชนะ \"ผ ฝ ถ ข ส ห\" จัดอยู่ในอักษรหมู่ใดของไตรยางศ์ ?",
      "en": "Which consonant class do \"ผ ฝ ถ ข ส ห\" belong to?",
      "zh": "字母 \"ผ ฝ ถ ข ส ห\" 属于三类辅音中的哪一类？"
    },
    "illustration": "🏔️",
    "illustrationSubtitle": {
      "th": "ผี ฝาก ถุง ข้าว สาร ให้ ฉัน",
      "en": "High-class consonants (Akson Sung)",
      "zh": "高辅音"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "อักษรกลาง (๙ ตัว)",
          "en": "Middle Class (9 letters)",
          "zh": "中辅音 (9个)"
        },
        "icon": "🎯"
      },
      {
        "id": "opt2",
        "label": {
          "th": "อักษรต่ำ (๒๔ ตัว)",
          "en": "Low Class (24 letters)",
          "zh": "低辅音 (24个)"
        },
        "icon": "🔷"
      },
      {
        "id": "opt3",
        "label": {
          "th": "อักษรสูง (๑๑ ตัว)",
          "en": "High Class (11 letters)",
          "zh": "高辅音 (11个)"
        },
        "icon": "🔺"
      }
    ],
    "correctOptionId": "opt3",
    "explanation": {
      "th": "อักษรสูงมี ๑๑ ตัว ได้แก่ ข ฃ ฉ ฐ ถ ผ ฝ ศ ษ ส ห ท่องจำ: ผีฝากถุงข้าวสารให้ฉัน",
      "en": "High-class consonants have 11 letters: ข ฃ ฉ ฐ ถ ผ ฝ ศ ษ ส ห.",
      "zh": "高辅音共有11个：ข ฃ ฉ ฐ ถ ผ ฝ ศ ษ ส ห。"
    }
  },
  {
    "id": "tp1-04",
    "grade": "P3",
    "subject": "phonics_consonant",
    "skillCode": "TP1",
    "difficulty": 2,
    "question": {
      "th": "พยัญชนะอักษรต่ำเดี่ยว (มี ๑๐ ตัว) ได้แก่พยัญชนะในข้อใด ?",
      "en": "Which group represents single low-class consonants (Akson Tam Diew)?",
      "zh": "单低辅音（共10个）是以下哪一组？"
    },
    "illustration": "🐍",
    "illustrationSubtitle": {
      "th": "งู ใหญ่ นอน อยู่ ณ ริม วัด โม ฬี โลก",
      "en": "Mnemonic for 10 single low consonants",
      "zh": "单低辅音口诀"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "ง ญ น ย ณ ร ว ม ฬ ล",
          "en": "Ngo, Yor, Nor, Yor, Nor, Ror, Wor, Mor, Lor, Lor",
          "zh": "ง ญ น ย ณ ร ว ม ฬ ล"
        },
        "icon": "🐍"
      },
      {
        "id": "opt2",
        "label": {
          "th": "ก จ ด ต บ ป อ ฎ ฏ",
          "en": "Middle class",
          "zh": "中辅音"
        },
        "icon": "🐥"
      },
      {
        "id": "opt3",
        "label": {
          "th": "พ ฟ ภ ค ต ช ซ ฮ",
          "en": "Paired low consonants",
          "zh": "双低辅音"
        },
        "icon": "🦁"
      }
    ],
    "correctOptionId": "opt1",
    "explanation": {
      "th": "อักษรต่ำเดี่ยวมี ๑๐ ตัว คือ ง ญ น ย ณ ร ว ม ฬ ล ท่องจำ: \"งูใหญ่นอนอยู่ ณ ริมวัดโมฬีโลก\"",
      "en": "Single low-class consonants (10 letters): ง ญ น ย ณ ร ว ม ฬ ล.",
      "zh": "单低辅音共10个：ง ญ น ย ณ ร ว ม ฬ ล。"
    }
  },
  {
    "id": "tp1-p4-01",
    "grade": "P4",
    "subject": "phonics_consonant",
    "skillCode": "TP1",
    "difficulty": 3,
    "question": {
      "th": "อักษรต่ำคู่ \"ค ฅ ฆ\" มีคู่เทียบเสียงเพื่อช่วยในการผันวรรณยุกต์ตรงกับอักษรสูงตัวใด ?",
      "en": "Which High-class consonants pair phonologically with Low-class \"ค ฅ ฆ\"?",
      "zh": "双低辅音 \"ค ฅ ฆ\" 与哪个高辅音配对以辅助变调？"
    },
    "illustration": "⚖️",
    "illustrationSubtitle": {
      "th": "การจับคู่อักษรต่ำคู่กับอักษรสูง",
      "en": "Paired Low Consonants with High Consonants",
      "zh": "双低辅音与高辅音配对"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "ข ฃ (อักษรสูง ๒ ตัว)",
          "en": "Chor Ching, Thor Than (High)",
          "zh": "高辅音 2 个"
        },
        "icon": "🔔"
      },
      {
        "id": "opt2",
        "label": {
          "th": "ฉ ฐ (อักษรสูง ๒ ตัว)",
          "en": "Khor Khai, Khor Khuat",
          "zh": "ข ฃ"
        },
        "icon": "⚖️"
      },
      {
        "id": "opt3",
        "label": {
          "th": "ผ ฝ (อักษรสูง ๒ ตัว)",
          "en": "Phor Phueng, For Fa",
          "zh": "ผ ฝ"
        },
        "icon": "🐝"
      }
    ],
    "correctOptionId": "opt2",
    "explanation": {
      "th": "อักษรต่ำคู่ คืออักษรต่ำที่มีเสียงคู่กับอักษรสูง โดย ค ฅ ฆ มีเสียงคู่กับ ข ฃ เพื่อช่วยกันผันวรรณยุกต์ได้ครบ ๕ เสียง (คา ข่า ข้า/ค่า ค้า ขา)",
      "en": "Paired low consonants ค ฅ ฆ pair with high consonants ข ฃ to inflect all 5 tones.",
      "zh": "双低辅音 ค ฅ ฆ 与高辅音 ข ฃ 配对发音，共同完成五个声调的变调。"
    }
  },
  {
    "id": "tp1-p5-01",
    "grade": "P5",
    "subject": "phonics_consonant",
    "skillCode": "TP1",
    "difficulty": 3,
    "question": {
      "th": "พยัญชนะในข้อใดส่วนใหญ่พบเฉพาะในคำที่มาจาก \"ภาษาบาลี-สันสกฤต\" ?",
      "en": "Which set of consonants is typically found in Pali-Sanskrit loanwords?",
      "zh": "以下哪组辅音多用于巴利-梵语借词？"
    },
    "illustration": "📜",
    "illustrationSubtitle": {
      "th": "พยัญชนะวรรคในภาษาบาลี-สันสกฤต",
      "en": "Pali-Sanskrit Consonants in Thai",
      "zh": "泰语中的巴利-梵语辅音"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "ฆ ฌ ฎ ฏ ฐ ฑ ฒ ณ ศ ษ ฬ (อักษรต่ำ ๑๑ ตัว)",
          "en": "Kor Jor Dor Tor Bor Por Or (Mid)",
          "zh": "中辅音 9 个"
        },
        "icon": "🐥"
      },
      {
        "id": "opt2",
        "label": {
          "th": "ก จ ด ต บ ป อ ฎ ฏ (อักษรกลาง ๙ ตัวทั้งหมด)",
          "en": "Ngor Nor Mor Yor Ror (Low)",
          "zh": "低辅音 10 个"
        },
        "icon": "🌾"
      },
      {
        "id": "opt3",
        "label": {
          "th": "ง น ม ย ร ล ว ณ ญ ฬ (อักษรต่ำเดี่ยว ๑๐ ตัว)",
          "en": "Khor, Chor, Dor, Tor, Thor, etc.",
          "zh": "ฆ ฌ ฎ ฏ ฐ ฑ ฒ ณ ศ ษ ฬ"
        },
        "icon": "📜"
      }
    ],
    "correctOptionId": "opt3",
    "explanation": {
      "th": "พยัญชนะ ฆ ฌ ฎ ฏ ฐ ฑ ฒ ณ ศ ษ ฬ มักปรากฏในคำยืมภาษาบาลีและสันสกฤต เช่น ภิกษุ, อัชฌาสัย, พญา, กาลเวลา, รัชกาล",
      "en": "Consonants like ฆ, ฌ, ฎ, ฏ, ฐ, ฑ, ฒ, ณ, ศ, ษ, ฬ predominantly appear in classical Indic loanwords.",
      "zh": "ฆ, ฌ, ฎ, ฏ, ฐ, ฑ, ฒ, ณ, ศ, ษ, ฬ 等字母多用于源自巴利语和梵语的高级词汇中。"
    }
  },
  {
    "id": "tp1-p6-01",
    "grade": "P6",
    "subject": "phonics_consonant",
    "skillCode": "TP1",
    "difficulty": 3,
    "question": {
      "th": "ตามหลักสัทศาสตร์และไวยากรณ์ไทย พยัญชนะ \"บ ป ผ ฝ พ ฟ ภ ม\" มีฐานเกิดของเสียงจากอวัยวะส่วนใด ?",
      "en": "According to Thai phonology, where is the place of articulation for \"บ ป ผ ฝ พ ฟ ภ ม\"?",
      "zh": "根据泰语语音学，辅音 \"บ ป ผ ฝ พ ฟ ภ ม\" 的发音部位是哪里？"
    },
    "illustration": "👄",
    "illustrationSubtitle": {
      "th": "ฐานที่เกิดของเสียงพยัญชนะ (โอษฐชะ)",
      "en": "Bilabial / Labial Articulation (Osthacha)",
      "zh": "双唇音/唇音发音部位"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "ฐานริมฝีปากบนและล่าง (โอษฐชะ)",
          "en": "Lips (Bilabial / Labial)",
          "zh": "双唇音 (โอษฐชะ)"
        },
        "icon": "👄"
      },
      {
        "id": "opt2",
        "label": {
          "th": "ฐานลำคอและหลอดลมส่วนลึก (กัณฐชะ)",
          "en": "Throat base",
          "zh": "喉音"
        },
        "icon": "🗣️"
      },
      {
        "id": "opt3",
        "label": {
          "th": "ฐานฟันหน้าและเหงือกบนล่าง (ทันตชะ)",
          "en": "Dental base",
          "zh": "齿音"
        },
        "icon": "🦷"
      }
    ],
    "correctOptionId": "opt1",
    "explanation": {
      "th": "พยัญชนะ บ ป ผ ฝ พ ฟ ภ ม เปล่งเสียงโดยใช้ริมฝีปากบนและล่างกระทบกัน เรียกว่า \"ฐานริมฝีปาก\" (โอษฐชะ) ในระบบสัทอักษรไทย",
      "en": "Sounds บ, ป, ผ, ฝ, พ, ฟ, ภ, ม are articulated at the lips (Labials / โอษฐชะ).",
      "zh": "บ, ป, ผ, ฝ, พ, ฟ, ภ, ม 由上下唇闭合或摩擦发音，称为“双唇音/唇音”（โอษฐชะ）。"
    }
  },
  {
    "id": "tp2-01",
    "grade": "P1",
    "subject": "phonics_vowel",
    "skillCode": "TP2",
    "difficulty": 1,
    "question": {
      "th": "สระในข้อใดเป็น \"สระเสียงยาว\" (ทีฆสระ) ทั้งหมด ?",
      "en": "Which pair consists of Long Vowels (Theekhasara)?",
      "zh": "以下哪组全部是长元音？"
    },
    "illustration": "📏",
    "illustrationSubtitle": {
      "th": "เปรียบเทียบสระเสียงสั้นและยาว",
      "en": "Short vs Long Vowels",
      "zh": "短元音与长元音比较"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "สระ อะ , สระ อิ",
          "en": "-a , -i (Short)",
          "zh": "短元音 -a, -i"
        },
        "icon": "⚡"
      },
      {
        "id": "opt2",
        "label": {
          "th": "สระ อา , สระ อี",
          "en": "-aa , -ee (Long)",
          "zh": "长元音 -aa, -ee"
        },
        "icon": "✨"
      },
      {
        "id": "opt3",
        "label": {
          "th": "สระ อุ , สระ เอะ",
          "en": "-u , -e (Short)",
          "zh": "短元音 -u, -e"
        },
        "icon": "🔹"
      }
    ],
    "correctOptionId": "opt2",
    "explanation": {
      "th": "สระ อา และ สระ อี เป็นสระเสียงยาว สามารถลากเสียงยาวได้ เช่น กา, ดี ส่วน สระ อะ และ อิ เป็นสระเสียงสั้น",
      "en": "Vowels \"-aa\" and \"-ee\" are long vowels, while \"-a\" and \"-i\" are short.",
      "zh": "สระ อา 与 สระ อี 为长元音，发音可以拉长。"
    }
  },
  {
    "id": "tp2-02",
    "grade": "P1",
    "subject": "phonics_vowel",
    "skillCode": "TP2",
    "difficulty": 2,
    "question": {
      "th": "เมื่อคำว่า \"กะ\" มีตัวสะกด ง (ก + อะ + ง) สระ อะ จะเปลี่ยนรูปเป็นอะไร ?",
      "en": "When adding final consonant \"ง\" to short vowel \"-a\", what does it transform into?",
      "zh": "当短元音 -a 加上尾音 ง 时，元音会变成什么形式？"
    },
    "illustration": "🔄",
    "illustrationSubtitle": {
      "th": "ก + ะ + ง = กัง",
      "en": "Vowel mutation rule (สระเปลี่ยนรูป)",
      "zh": "元音变形规则"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "ไม้ไต่คู้ ( ก็ง )",
          "en": "Mai Tai-Khu (ก็ง)",
          "zh": "Mai Tai-Khu"
        },
        "icon": "☁️"
      },
      {
        "id": "opt2",
        "label": {
          "th": "สระ อา ( กาง )",
          "en": "Sara Aa (กาง)",
          "zh": "Sara Aa"
        },
        "icon": "🌧️"
      },
      {
        "id": "opt3",
        "label": {
          "th": "ไม้หันอากาศ ( กัง )",
          "en": "Mai Han-Akat (กัง)",
          "zh": "Mai Han-Akat (กัง)"
        },
        "icon": "☀️"
      }
    ],
    "correctOptionId": "opt3",
    "explanation": {
      "th": "สระ อะ เมื่อมีตัวสะกดจะเปลี่ยนรูปเป็น \"ไม้หันอากาศ ( ั )\" วางไว้ข้างบน เช่น ก + ะ + ง = กัง, ว + ะ + น = วัน",
      "en": "Short vowel \"-a\" turns into Mai Han-Akat ( ั ) above the consonant when followed by a final consonant.",
      "zh": "短元音 ะ 在有尾音时，会变形为上面的 Mai Han-Akat ( ั )，如 กัง, วัน。"
    }
  },
  {
    "id": "tp2-03",
    "grade": "P2",
    "subject": "phonics_vowel",
    "skillCode": "TP2",
    "difficulty": 2,
    "question": {
      "th": "สระในข้อใดจัดเป็น \"สระประสม\" ทั้งหมด ?",
      "en": "Which set contains Thai Diphthongs (สระประสม)?",
      "zh": "以下哪组全部是复合元音？"
    },
    "illustration": "🎨",
    "illustrationSubtitle": {
      "th": "เอียะ-เอีย, เอือะ-เอือ, อัวะ-อัว",
      "en": "3 pairs of compound vowels",
      "zh": "三对复合元音"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "สระเอีย , สระเอือ , สระอัว",
          "en": "Ia, Uea, Ua",
          "zh": "สระเอีย, สระเอือ, สระอัว"
        },
        "icon": "🌟"
      },
      {
        "id": "opt2",
        "label": {
          "th": "สระอา , สระอี , สระอู",
          "en": "Aa, Ee, Oo",
          "zh": "สระอา, สระอี, สระอู"
        },
        "icon": "🔷"
      },
      {
        "id": "opt3",
        "label": {
          "th": "สระเอ , สระแอ , สระโอ",
          "en": "E, Ae, O",
          "zh": "สระเอ, สระแอ, สระโอ"
        },
        "icon": "🔸"
      }
    ],
    "correctOptionId": "opt1",
    "explanation": {
      "th": "สระประสมมี ๓ คู่ ๖ เสียง ได้แก่ เอียะ-เอีย, เอือะ-เอือ, และ อัวะ-อัว เกิดจากสระเดี่ยว ๒ ตัวเปล่งเสียงต่อกัน",
      "en": "Compound vowels are combinations of single vowels: -ia, -uea, and -ua.",
      "zh": "泰语复合元音共有3对6个：เอียะ-เอีย, เอือะ-เอือ, อัวะ-อัว。"
    }
  },
  {
    "id": "tp2-p3-01",
    "grade": "P3",
    "subject": "phonics_vowel",
    "skillCode": "TP2",
    "difficulty": 2,
    "question": {
      "th": "คำว่า \"นก\" (น + โอะ + ก) และ \"ลม\" (ล + โอะ + ม) สระโอะเกิดการเปลี่ยนแปลงอย่างไร ?",
      "en": "In words \"นก\" and \"ลม\", what happens to the vowel \"-o\" (โอะ)?",
      "zh": "在单词 \"นก\" 与 \"ลม\" 中，元音 โอะ 发生了什么变化？"
    },
    "illustration": "🕊️",
    "illustrationSubtitle": {
      "th": "สระโอะลดรูปหมดเมื่อมีตัวสะกด",
      "en": "Vowel Reduction (สระลดรูป)",
      "zh": "元音隐形缩合"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "สระโอะลดรูป ไม่ปรากฏรูปสระให้เห็นในคำ",
          "en": "Turns into Mai Tai Khu",
          "zh": "变成ไม้ไต่คู้"
        },
        "icon": "⚡"
      },
      {
        "id": "opt2",
        "label": {
          "th": "สระโอะเปลี่ยนรูปกลายเป็นรูปไม้ไต่คู้",
          "en": "Vowel completely elides (Disappears)",
          "zh": "元音 완전 缩减不显示"
        },
        "icon": "🕊️"
      },
      {
        "id": "opt3",
        "label": {
          "th": "สระโอะกลายเป็นรูปสระออแทนที่รูปสระเดิม",
          "en": "Turns into vowel Or",
          "zh": "变成สระออ"
        },
        "icon": "🔄"
      }
    ],
    "correctOptionId": "opt2",
    "explanation": {
      "th": "สระโอะ เมื่อมีตัวสะกดจะ \"ลดรูปหมด\" โดยไม่ต้องเขียนรูปสระ โ-ะ ปรากฏเหลือเพียงพยัญชนะต้นกับตัวสะกด เช่น น + โอะ + ก = นก",
      "en": "Short vowel \"-o\" (โอะ) completely drops its written form when a coda consonant is present.",
      "zh": "短元音 โอะ 在有尾音时会完全隐去不写，如 น + โอะ + ก = นก。"
    }
  },
  {
    "id": "tp2-p4-01",
    "grade": "P4",
    "subject": "phonics_vowel",
    "skillCode": "TP2",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"เป็ด\" และ \"เล็ก\" เกิดจากการประสมสระใดและเปลี่ยนรูปอย่างไร ?",
      "en": "What vowel is used in \"เป็ด\" and \"เล็ก\", and how does it transform?",
      "zh": "单词 \"เป็ด\" 和 \"เล็ก\" 是由什么元音变形而来的？"
    },
    "illustration": "🦆",
    "illustrationSubtitle": {
      "th": "ป + เอะ + ด = เป็ด",
      "en": "Sara E (เอะ) transforms with coda",
      "zh": "短元音 เอะ 变形规则"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "สระเอะ เปลี่ยนรูป อะ เป็นไม้ไต่คู้",
          "en": "Sara Ae transforms into Mai Han-Akat",
          "zh": "Sara Ae 变形"
        },
        "icon": "⚡"
      },
      {
        "id": "opt2",
        "label": {
          "th": "สระแอะ เปลี่ยนรูปสระเป็นไม้หันอากาศ",
          "en": "Sara Ia reduces to Sara E",
          "zh": "Sara Ia 缩减"
        },
        "icon": "📘"
      },
      {
        "id": "opt3",
        "label": {
          "th": "สระเอีย ลดรูปสระเหลือเพียงรูปสระเอ",
          "en": "Sara E transforms into Mai Tai-khu ( เ-็ )",
          "zh": "短元音 เอะ 将 ะ 变为ไม้ไต่คู้ ( เ-็ )"
        },
        "icon": "🦆"
      }
    ],
    "correctOptionId": "opt3",
    "explanation": {
      "th": "สระเอะ (เ-ะ) เมื่อมีตัวสะกดจะเปลี่ยนรูปวิสรรชนีย์ (ะ) เป็นไม้ไต่คู้ ( ็ ) วางไว้บนพยัญชนะต้น เช่น ป + เอะ + ด = เป็ด, ล + เอะ + ก = เล็ก",
      "en": "Vowel Sara E (เ-ะ) changes its final mark into Mai Tai-khu ( ็ ) when a final consonant follows.",
      "zh": "元音 เ-ะ 在有尾音时，将后面的 ะ 变为上面的ไม้ไต่คู้ ( ็ )，如 เป็ด, เล็ก。"
    }
  },
  {
    "id": "tp2-p5-01",
    "grade": "P5",
    "subject": "phonics_vowel",
    "skillCode": "TP2",
    "difficulty": 3,
    "question": {
      "th": "สระเกินตัว \"ฤ\" ในคำว่า \"ฤทธิ์\" , \"ฤดู\" , \"ฤกษ์\" ออกเสียงตามลำดับอย่างไร ?",
      "en": "How is the vowel \"ฤ\" pronounced in \"ฤทธิ์\", \"ฤดู\", and \"ฤกษ์\"?",
      "zh": "元音 \"ฤ\" 在词汇 \"ฤทธิ์\"、\"ฤดู\"、\"ฤกษ์\" 中分别发什么音？"
    },
    "illustration": "🗓️",
    "illustrationSubtitle": {
      "th": "การออกเสียงตัว ฤ ทั้ง ๓ แบบ",
      "en": "Three phonetic sounds of ฤ (Ri, Rue, Roe)",
      "zh": "ฤ 的三种发音 (Ri, Rue, Roe)"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "ริ (ฤทธิ์) - รึ (ฤดู) - เรอ (ฤกษ์) ครบ ๓ เสียง",
          "en": "Ri (Rit) - Rue (Ruedu) - Roe (Roek)",
          "zh": "ริ (ฤทธิ์) - รึ (ฤดู) - เรอ (ฤกษ์)"
        },
        "icon": "✨"
      },
      {
        "id": "opt2",
        "label": {
          "th": "รึ (ฤทธิ์) - รึ (ฤดู) - รึ (ฤกษ์) ออกเสียง รึ ทั้งหมด",
          "en": "All pronounced as Rue",
          "zh": "全部发 Rue 音"
        },
        "icon": "🔹"
      },
      {
        "id": "opt3",
        "label": {
          "th": "ริ (ฤทธิ์) - ริ (ฤดู) - เรอ (ฤกษ์) ออกเสียง ริ ทั้งหมด",
          "en": "Ri - Ri - Roe",
          "zh": "Ri - Ri - Roe"
        },
        "icon": "🔸"
      }
    ],
    "correctOptionId": "opt1",
    "explanation": {
      "th": "ตัว ฤ ออกเสียงได้ ๓ แบบ คือ: ออกเสียง \"ริ\" (ฤทธิ์), ออกเสียง \"รึ\" (ฤดู, พฤษภาคม), และออกเสียง \"เรอ\" (ฤกษ์)",
      "en": "The vocalic symbol ฤ can be pronounced as \"Ri\" (Rit), \"Rue\" (Ruedu), or \"Roe\" (Roek).",
      "zh": "字母 ฤ 有三种发音方式：发 ริ (ฤทธิ์)、发 รึ (ฤดู) 以及发 เรอ (ฤกษ์)。"
    }
  },
  {
    "id": "tp2-p6-01",
    "grade": "P6",
    "subject": "phonics_vowel",
    "skillCode": "TP2",
    "difficulty": 3,
    "question": {
      "th": "ตามหลักไวยากรณ์ภาษาไทย สระแท้ในภาษาไทยมีทั้งหมดกี่เสียง ?",
      "en": "According to Thai standard grammar, how many Pure Vowels (Sara Thae) are there?",
      "zh": "根据泰语标准语法，泰语中的“真正元音”共有多少个音位？"
    },
    "illustration": "🎼",
    "illustrationSubtitle": {
      "th": "สระเดี่ยว ๑๘ + สระประสม ๖ = สระแท้ ๒๔ เสียง",
      "en": "18 Single + 6 Diphthongs = 24 Pure Vowels",
      "zh": "18个单元音 + 6个复合元音 = 24个纯元音"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "๒๔ เสียง (สระเดี่ยว ๑๘ + สระประสม ๖ เสียง)",
          "en": "32 sounds (traditional count)",
          "zh": "32 个传统包含สระเกิน"
        },
        "icon": "📘"
      },
      {
        "id": "opt2",
        "label": {
          "th": "๓๒ เสียง (นับรวมสระเกินและสระประสมพิเศษ)",
          "en": "24 sounds (18 Monophthongs + 6 Diphthongs)",
          "zh": "24 个发音 (18单元音 + 6复元音)"
        },
        "icon": "🎼"
      },
      {
        "id": "opt3",
        "label": {
          "th": "๑๖ เสียง (นับเฉพาะสระแท้เดี่ยวเสียงยาวเท่านั้น)",
          "en": "16 sounds",
          "zh": "16 个发音"
        },
        "icon": "📙"
      }
    ],
    "correctOptionId": "opt2",
    "explanation": {
      "th": "ตามหลักภาษาศาสตร์ สระแท้มี ๒๔ เสียง (สระเดี่ยว ๑๘ เสียง + สระประสม ๖ เสียง) ส่วน อำ ไอ ใอ เอา ฤ ฤๅ ฦ ฦๅ จัดเป็นสระเกินเพราะมีเสียงพยัญชนะประสมอยู่",
      "en": "Thai has 24 pure vowel sounds. Extra vowels (อำ, ไอ, ใอ, เอา, ฤ, ฤๅ) have consonant elements attached.",
      "zh": "语言学上泰语纯元音为24个（18个单元音+6个复合元音），其余为带有辅音特征的特殊元音。"
    }
  },
  {
    "id": "tp3-01",
    "grade": "P1",
    "subject": "phonics_tone",
    "skillCode": "TP3",
    "difficulty": 1,
    "question": {
      "th": "วรรณยุกต์ไทยมีกี่รูป และกี่เสียง ?",
      "en": "How many tone marks and tone sounds are there in Thai?",
      "zh": "泰语有几个声调符号和几个声调？"
    },
    "illustration": "🎵",
    "illustrationSubtitle": {
      "th": "รูปวรรณยุกต์ vs เสียงวรรณยุกต์",
      "en": "Tone marks vs Tone pitches",
      "zh": "声调符号与声调"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "๕ รูป ๕ เสียง",
          "en": "5 marks, 5 tones",
          "zh": "5个符号，5个声调"
        },
        "icon": "🎵"
      },
      {
        "id": "opt2",
        "label": {
          "th": "๔ รูป ๔ เสียง",
          "en": "4 marks, 4 tones",
          "zh": "4个符号，4个声调"
        },
        "icon": "🎼"
      },
      {
        "id": "opt3",
        "label": {
          "th": "๔ รูป ๕ เสียง",
          "en": "4 marks, 5 tones",
          "zh": "4个符号，5个声调"
        },
        "icon": "🏆"
      }
    ],
    "correctOptionId": "opt3",
    "explanation": {
      "th": "วรรณยุกต์ไทยมี ๔ รูป (ไม้เอก ่, ไม้โท ้, ไม้ตรี ๊, ไม้จัตวา ๋) และมี ๕ เสียง (สามัญ, เอก, โท, ตรี, จัตวา) โดยเสียงสามัญไม่มีรูป",
      "en": "Thai has 4 tone marks and 5 tones. The Common tone (Samanya) has no written mark.",
      "zh": "泰语有4个声调符号（เอก โท ตรี จัตวา）和5个声调（สามัญ เอก โท ตรี จัตวา），其中第一调普通调无调号。"
    }
  },
  {
    "id": "tp3-02",
    "grade": "P2",
    "subject": "phonics_tone",
    "skillCode": "TP3",
    "difficulty": 2,
    "question": {
      "th": "คำว่า \"กว้าง\" และ \"หว่าน\" รูปวรรณยุกต์ต้องวางอยู่บนพยัญชนะตัวใด ?",
      "en": "In words \"กว้าง\" and \"หว่าน\", on which consonant should the tone mark be placed?",
      "zh": "在词语 \"กว้าง\" 和 \"หว่าน\" 中，声调符号应该写在哪一个辅音上方？"
    },
    "illustration": "🎯",
    "illustrationSubtitle": {
      "th": "ตำแหน่งวางรูปวรรณยุกต์ในอักษรควบและอักษรนำ",
      "en": "Tone Mark Placement in Clusters",
      "zh": "复辅音与前导辅音的调号位置"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "พยัญชนะต้นตัวที่สอง (เช่น ตัว ว ในคำ)",
          "en": "On the second consonant (ว)",
          "zh": "在第二个声母辅音 (ว) 上方"
        },
        "icon": "🎯"
      },
      {
        "id": "opt2",
        "label": {
          "th": "พยัญชนะต้นตัวแรก (เช่น ตัว ก หรือ ห)",
          "en": "On the first consonant",
          "zh": "在第一个辅音上方"
        },
        "icon": "1️⃣"
      },
      {
        "id": "opt3",
        "label": {
          "th": "ตัวสะกดท้ายพยางค์ (เช่น ตัว น หรือ ม)",
          "en": "On the coda consonant",
          "zh": "在尾音上方"
        },
        "icon": "🔚"
      }
    ],
    "correctOptionId": "opt1",
    "explanation": {
      "th": "คำที่มีพยัญชนะต้น ๒ ตัว (อักษรควบหรืออักษรนำ) ต้องวางรูปวรรณยุกต์ไว้เหนือพยัญชนะต้นตัวที่สอง เช่น กว้าง, หว่าน, สร้อย, ขลุ่ย",
      "en": "In clusters or leading consonants, tone marks must be positioned above the second initial consonant.",
      "zh": "对于有两个声母字母的复辅音或前导辅音词，声调符号必须写在第二个辅音字母上方。"
    }
  },
  {
    "id": "tp3-p4-01",
    "grade": "P4",
    "subject": "phonics_tone",
    "skillCode": "TP3",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"นะ\" และ \"คะ\" (อักษรต่ำ คำตาย สระสั้น) มีเสียงวรรณยุกต์ใดโดยไม่ต้องมีรูปวรรณยุกต์ ?",
      "en": "What tone pitch do words \"นะ\" and \"คะ\" have without any written tone mark?",
      "zh": "单词 \"นะ\" 与 \"คะ\" 无需任何调号，其本身的基调是什么声调？"
    },
    "illustration": "🗣️",
    "illustrationSubtitle": {
      "th": "คำตายอักษรต่ำ สระเสียงสั้น พื้นเสียงตรี",
      "en": "Low Consonant + Short Vowel Dead Syllable = High Tone (Tri)",
      "zh": "低辅音短元音死音 = 高调 (ตรี)"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "เสียงโท",
          "en": "Falling Tone (Tho)",
          "zh": "第三调/降调 (โท)"
        },
        "icon": "📉"
      },
      {
        "id": "opt2",
        "label": {
          "th": "เสียงตรี",
          "en": "High Tone (Tri)",
          "zh": "第四调/高调 (ตรี)"
        },
        "icon": "⚡"
      },
      {
        "id": "opt3",
        "label": {
          "th": "เสียงสามัญ",
          "en": "Common Tone (Samanya)",
          "zh": "第一调/平调 (สามัญ)"
        },
        "icon": "🍃"
      }
    ],
    "correctOptionId": "opt2",
    "explanation": {
      "th": "อักษรต่ำ คำตาย ประสมสระเสียงสั้น (เช่น นะ, คะ, ชิ, ทุ) พื้นเสียงวรรณยุกต์เป็น \"เสียงตรี\" โดยไม่ต้องมีรูปวรรณยุกต์กำกับ",
      "en": "Dead syllables with low-class consonants and short vowels naturally sound High Tone (Tri) without any mark.",
      "zh": "低辅音短元音死音（如 นะ, คะ, ชิ）其基本发音即为第四调（เสียงตรี），无需标注声调符号。"
    }
  },
  {
    "id": "tp3-p5-01",
    "grade": "P5",
    "subject": "phonics_tone",
    "skillCode": "TP3",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"กตัญญู\" (กะ - ตัน - ยู) มีเสียงวรรณยุกต์ประจำแต่ละพยางค์ตรงกับข้อใด ?",
      "en": "What are the tone pitches of the syllables in \"กตัญญู\" (Ka - Tan - Yoo)?",
      "zh": "词语 \"กตัญญู\"（Ka - Tan - Yoo）各音节的声调分别是什么？"
    },
    "illustration": "🙏",
    "illustrationSubtitle": {
      "th": "การวิเคราะห์เสียงวรรณยุกต์คำหลายพยางค์",
      "en": "Polysyllabic Tone Analysis",
      "zh": "多音节词声调分析"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "สามัญ - สามัญ - สามัญ",
          "en": "All Samanya",
          "zh": "全为平调"
        },
        "icon": "🍃"
      },
      {
        "id": "opt2",
        "label": {
          "th": "เอก - โท - สามัญ",
          "en": "Ek - Tho - Samanya",
          "zh": "低调 - 降调 - 平调"
        },
        "icon": "⭐"
      },
      {
        "id": "opt3",
        "label": {
          "th": "เอก - สามัญ - สามัญ",
          "en": "Ek - Samanya - Samanya",
          "zh": "低调 - 平调 - 平调"
        },
        "icon": "🙏"
      }
    ],
    "correctOptionId": "opt3",
    "explanation": {
      "th": "กะ (อักษรกลางคำตายสระสั้น = เสียงเอก), ตัน (อักษรกลางคำเป็นสะกดแม่กน = เสียงสามัญ), ยู (อักษรต่ำคำเป็นสระยาว = เสียงสามัญ) จึงเป็น เอก - สามัญ - สามัญ",
      "en": "กะ is Low Tone (Ek), ตัน is Common Tone (Samanya), and ยู is Common Tone (Samanya).",
      "zh": "กะ 为低辅音短元音死音 = เอก 调，ตัน 为中辅音活音 = สามัญ 调，ยู 为低辅音长元音活音 = สามัญ 调。"
    }
  },
  {
    "id": "tp3-p6-01",
    "grade": "P6",
    "subject": "phonics_tone",
    "skillCode": "TP3",
    "difficulty": 3,
    "question": {
      "th": "คำตายอักษรต่ำ สระเสียงยาว (เช่น มาก, ชาติ, ลาภ, พูด) มีพื้นเสียงวรรณยุกต์ใดโดยไม่ต้องใส่รูป ?",
      "en": "What tone pitch do Low-class dead syllables with Long vowels (e.g. มาก, ชาติ) naturally possess?",
      "zh": "低辅音长元音死音（如 มาก, ชาติ, ลาภ）无需调号的自然声调是什么？"
    },
    "illustration": "💎",
    "illustrationSubtitle": {
      "th": "คำตายอักษรต่ำสระยาว พื้นเสียงโท",
      "en": "Low Consonant + Long Vowel Dead Syllable = Falling Tone (Tho)",
      "zh": "低辅音长元音死音 = 降调 (โท)"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "เสียงโท",
          "en": "Falling Tone (Tho)",
          "zh": "第三调/降调 (โท)"
        },
        "icon": "💎"
      },
      {
        "id": "opt2",
        "label": {
          "th": "เสียงเอก",
          "en": "Low Tone (Ek)",
          "zh": "第二调/低调 (เอก)"
        },
        "icon": "🔹"
      },
      {
        "id": "opt3",
        "label": {
          "th": "เสียงตรี",
          "en": "High Tone (Tri)",
          "zh": "第四调/高调 (ตรี)"
        },
        "icon": "⚡"
      }
    ],
    "correctOptionId": "opt1",
    "explanation": {
      "th": "อักษรต่ำ คำตาย ประสมสระเสียงยาว (มาก, มีด, ลูก, โชค) พื้นเสียงวรรณยุกต์จะเป็น \"เสียงโท\" เสมอโดยไม่ต้องมีรูปวรรณยุกต์",
      "en": "Low-class consonants with long vowels in dead syllables (stop finals) naturally have Falling Tone (Tho).",
      "zh": "低辅音搭配长元音的死音词（如 มาก, มีด, ลูก）其基础声调必然为第三调（降调 เสียงโท）。"
    }
  },
  {
    "id": "tp4-01",
    "grade": "P1",
    "subject": "phonics_korkaa",
    "skillCode": "TP4",
    "difficulty": 1,
    "question": {
      "th": "สะกดคำว่า \"ตา\" แจกลูกเสียงอย่างไร ?",
      "en": "How to spell out the word \"ตา\" using Phonics decomposition?",
      "zh": "单词 \"ตา\" 如何拼读？"
    },
    "illustration": "👀",
    "illustrationSubtitle": {
      "th": "ตอ - อา - ตา",
      "en": "Tor - Aa - Taa",
      "zh": "Tor - Aa - Taa"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "ตอ - โอ - โต",
          "en": "Tor - Oh - Toh",
          "zh": "ตอ - โอ - โต"
        },
        "icon": "🐘"
      },
      {
        "id": "opt2",
        "label": {
          "th": "ตอ - อา - ตา",
          "en": "Tor - Aa - Taa",
          "zh": "ตอ - อา - ตา"
        },
        "icon": "👀"
      },
      {
        "id": "opt3",
        "label": {
          "th": "กอ - อา - กา",
          "en": "Kor - Aa - Kaa",
          "zh": "กอ - อา - กา"
        },
        "icon": "🐦"
      }
    ],
    "correctOptionId": "opt2",
    "explanation": {
      "th": "คำว่า \"ตา\" ประกอบด้วย พยัญชนะ ต (ออกเสียง ตอ) ประสม สระ อา สะกดว่า \"ตอ - อา - ตา\"",
      "en": "The word \"ตา\" spells Tor + Sara Aa = Taa.",
      "zh": "คำว่า \"ตา\" 由辅音 ต 与元音 อา 拼成，读作 ตอ - อา - ตา。"
    }
  },
  {
    "id": "tp4-02",
    "grade": "P2",
    "subject": "phonics_korkaa",
    "skillCode": "TP4",
    "difficulty": 2,
    "question": {
      "th": "คำในข้อใดเป็นคำในมาตรา \"แม่ ก กา\" (ไม่มีตัวสะกด) ทั้งหมด ?",
      "en": "Which group contains only words in Mae Kor Kaa (No final consonant)?",
      "zh": "以下哪组词全部属于 Mae Kor Kaa（开音节，无尾音）？"
    },
    "illustration": "🦀",
    "illustrationSubtitle": {
      "th": "คำไม่มีตัวสะกดท้ายพยางค์",
      "en": "Words without coda consonants",
      "zh": "无结尾辅音的词"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "บ้าน , นก , ข้าว , ดิน",
          "en": "Baan, Nok, Khao, Din",
          "zh": "บ้าน, นก, ข้าว, ดิน"
        },
        "icon": "🏠"
      },
      {
        "id": "opt2",
        "label": {
          "th": "กิน , ลม , แมว , ลิง",
          "en": "Kin, Lom, Maew, Ling",
          "zh": "กิน, ลม, แมว, ลิง"
        },
        "icon": "🐒"
      },
      {
        "id": "opt3",
        "label": {
          "th": "ปู , ม้า , กา , เรือ",
          "en": "Poo, Maa, Kaa, Ruea",
          "zh": "ปู, ม้า, กา, เรือ"
        },
        "icon": "🦀"
      }
    ],
    "correctOptionId": "opt3",
    "explanation": {
      "th": "คำแม่ ก กา คือคำที่ไม่มีตัวสะกดท้ายพยางค์ เช่น ปู ม้า กา เรือ ส่วนคำที่มี ง น ม ด ฯลฯ สะกดจะอยู่ในมาตราตัวสะกด",
      "en": "Words in Mae Kor Kaa have only initial consonants and vowels without final consonants.",
      "zh": "Mae Kor Kaa 是指只有声母和元音、没有尾音辅音的词，如 ปู ม้า กา เรือ。"
    }
  },
  {
    "id": "tp4-p3-01",
    "grade": "P3",
    "subject": "phonics_korkaa",
    "skillCode": "TP4",
    "difficulty": 2,
    "question": {
      "th": "สะกดคำว่า \"หัวใจ\" แจกลูกเสียงตามหลักการอ่านอย่างไร ?",
      "en": "How to spell out \"หัวใจ\" into phonetic syllables?",
      "zh": "词汇 \"หัวใจ\" 如何按照拼读规则拼读？"
    },
    "illustration": "💖",
    "illustrationSubtitle": {
      "th": "หอ-อัว-หัว , จอ-ใอ-ใจ",
      "en": "Hor-Ua-Hua , Jor-Ai-Jai",
      "zh": "หอ-อัว-หัว , จอ-ใอ-ใจ"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "หอ - อัว - หัว , จอ - ใอ - ใจ",
          "en": "Hor-Ua-Hua , Jor-Ai-Jai",
          "zh": "หอ - อัว - หัว , จอ - ใอ - ใจ"
        },
        "icon": "💖"
      },
      {
        "id": "opt2",
        "label": {
          "th": "หอ - ออ - หอ , จอ - ไอ - ใจ",
          "en": "Hor-Or-Hor",
          "zh": "หอ - ออ - หอ"
        },
        "icon": "🔹"
      },
      {
        "id": "opt3",
        "label": {
          "th": "หอ - อะ - หัว , จอ - ไอ - ใจ",
          "en": "Hua-A-Jai",
          "zh": "หัว - อะ - ใจ"
        },
        "icon": "🔸"
      }
    ],
    "correctOptionId": "opt1",
    "explanation": {
      "th": "คำว่า \"หัวใจ\" เป็นคำในแม่ ก กา ทั้งสองพยางค์: หอ-อัว-หัว และ จอ-ใอ-ใจ รวมเป็น หัวใจ",
      "en": "\"หัวใจ\" consists of two Mae Kor Kaa syllables: Hor + Ua = Hua, Jor + Ai = Jai.",
      "zh": "\"หัวใจ\" 的两个音节均属于无尾音的 Mae Kor Kaa：หอ-อัว-หัว 与 จอ-ใอ-ใจ。"
    }
  },
  {
    "id": "tp4-p4-01",
    "grade": "P4",
    "subject": "phonics_korkaa",
    "skillCode": "TP4",
    "difficulty": 3,
    "question": {
      "th": "คำในข้อใดเป็นคำในแม่ ก กา ที่มี \"พยัญชนะต้น ๒ ตัว\" ทั้งหมด ?",
      "en": "Which set consists of Mae Kor Kaa words having Two Initial Consonants (Clusters/Leading)?",
      "zh": "以下哪一组全部是包含“双声母”的 Mae Kor Kaa 词汇？"
    },
    "illustration": "🐟",
    "illustrationSubtitle": {
      "th": "อักษรควบและอักษรนำในแม่ ก กา",
      "en": "Clusters and Leading Consonants in Mae Kor Kaa",
      "zh": "Mae Kor Kaa 中的复辅音与前导辅音词"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "ปลา , ตะกร้า , หญ้า , หน้า (มีพยัญชนะต้น ๒ ตัว)",
          "en": "Words with finals",
          "zh": "有尾音的词"
        },
        "icon": "📚"
      },
      {
        "id": "opt2",
        "label": {
          "th": "กางเกง , บ้านเรือน , หนังสือ (เป็นคำที่มีตัวสะกด)",
          "en": "Plaa, Ta-kraa, Yaa, Naa",
          "zh": "ปลา, ตะกร้า, หญ้า, หน้า"
        },
        "icon": "🐟"
      },
      {
        "id": "opt3",
        "label": {
          "th": "ตา , มา , ดู , ปู (เป็นคำพยัญชนะเดี่ยวแม่ ก กา)",
          "en": "Single initial consonants",
          "zh": "单声母词"
        },
        "icon": "👀"
      }
    ],
    "correctOptionId": "opt2",
    "explanation": {
      "th": "ปลา (ปล ควบ), ตะกร้า (กร ควบ), หญ้า (ห นำ ญ), หน้า (ห นำ น) ล้วนเป็นคำในแม่ ก กา ที่มีพยัญชนะต้น ๒ ตัวและไม่มีตัวสะกด",
      "en": "Words like ปลา, ตะกร้า, หญ้า, and หน้า have cluster/leading initial consonants without final consonants.",
      "zh": "ปลา, ตะกร้า, หญ้า, หน้า 均为包含复辅音或前导辅音且没有尾音辅音的 Mae Kor Kaa 词。"
    }
  },
  {
    "id": "tp4-p5-01",
    "grade": "P5",
    "subject": "phonics_korkaa",
    "skillCode": "TP4",
    "difficulty": 3,
    "question": {
      "th": "คำในข้อใดเป็นคำในแม่ ก กา ที่ยืมมาจาก \"ภาษาบาลี-สันสกฤต\" ทั้งหมด ?",
      "en": "Which group contains Mae Kor Kaa words derived from Pali-Sanskrit?",
      "zh": "以下哪组词全部是源自巴利-梵语且属于 Mae Kor Kaa 的词？"
    },
    "illustration": "🏛️",
    "illustrationSubtitle": {
      "th": "คำยืมภาษาบาลี-สันสกฤตในแม่ ก กา",
      "en": "Pali-Sanskrit loanwords in open syllables",
      "zh": "开音节巴利-梵语借词"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "กินข้าว , นอนหลับ , ดูหนัง",
          "en": "Native Thai words with codas",
          "zh": "泰语原生词"
        },
        "icon": "🍚"
      },
      {
        "id": "opt2",
        "label": {
          "th": "คอมพิวเตอร์ , เค้ก , ไอศกรีม",
          "en": "English loanwords",
          "zh": "英语借词"
        },
        "icon": "💻"
      },
      {
        "id": "opt3",
        "label": {
          "th": "ราชา , มยุรา , วาจา , ศิลา",
          "en": "Racha, Mayura, Vacha, Sila",
          "zh": "ราชา, มยุรา, วาจา, ศิลา"
        },
        "icon": "🏛️"
      }
    ],
    "correctOptionId": "opt3",
    "explanation": {
      "th": "ราชา (พระราชา), มยุรา (นกยูง), วาจา (คำพูด), ศิลา (หิน) เป็นคำยืมภาษาบาลี-สันสกฤตที่ไม่มีตัวสะกดท้ายพยางค์ จึงจัดอยู่ในแม่ ก กา",
      "en": "Words like ราชา, มยุรา, วาจา, ศิลา are classical Indic loanwords in open syllables (Mae Kor Kaa).",
      "zh": "ราชา, มยุรา, วาจา, ศิลา 均为巴利-梵语借词，各音节均无尾音辅音，归属 Mae Kor Kaa。"
    }
  },
  {
    "id": "tp4-p6-01",
    "grade": "P6",
    "subject": "phonics_korkaa",
    "skillCode": "TP4",
    "difficulty": 3,
    "question": {
      "th": "สำนวนไทยในข้อใดประกอบด้วยคำในมาตรา \"แม่ ก กา\" ทุกคำ ?",
      "en": "Which Thai idiom consists entirely of words in Mae Kor Kaa (No codas)?",
      "zh": "以下哪个泰国成语中的每一个字全部都属于 Mae Kor Kaa？"
    },
    "illustration": "📜",
    "illustrationSubtitle": {
      "th": "สำนวนไทยคำแม่ ก กา ล้วน",
      "en": "Thai Idioms in Pure Mae Kor Kaa",
      "zh": "纯 Mae Kor Kaa 泰国成语"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "ไปมาหาสู่กันเป็นประจำ",
          "en": "Pai Maa Haa Soo (Visiting each other)",
          "zh": "ไปมาหาสู่"
        },
        "icon": "📜"
      },
      {
        "id": "opt2",
        "label": {
          "th": "น้ำขึ้นให้รีบตักทันที",
          "en": "Strike while the iron is hot",
          "zh": "น้ำขึ้นให้รีบตัก"
        },
        "icon": "🌊"
      },
      {
        "id": "opt3",
        "label": {
          "th": "ขี่ช้างจับตั๊กแตนในนา",
          "en": "Using big effort for small gain",
          "zh": "ขี่ช้างจับตั๊กแตน"
        },
        "icon": "🐘"
      }
    ],
    "correctOptionId": "opt1",
    "explanation": {
      "th": "สำนวน \"ไปมาหาสู่\" ประกอบด้วยคำว่า ไป (ป+ไอ), มา (ม+อา), หา (ห+อา), สู่ (ส+อู+เอก) ทุกคำไม่มีตัวสะกด จัดอยู่ในแม่ ก กา ทั้งหมด",
      "en": "Every word in \"ไป-มา-หา-สู่\" is an open syllable in Mae Kor Kaa without coda consonants.",
      "zh": "成语 \"ไปมาหาสู่\" 中的 ไป, มา, หา, สู่ 均无尾音辅音，全为纯粹的 Mae Kor Kaa。"
    }
  },
  {
    "id": "tp5-01",
    "grade": "P1",
    "subject": "phonics_tone_korkaa",
    "skillCode": "TP5",
    "difficulty": 1,
    "question": {
      "th": "อักษรกลางประสมสระเสียงยาวในแม่ ก กา (เช่น กา) สามารถผันวรรณยุกต์ได้กี่เสียง ?",
      "en": "How many tones can Middle consonants with long vowels inflect in Mae Kor Kaa?",
      "zh": "中辅音配长元音在 Mae Kor Kaa 中可以变几个声调？"
    },
    "illustration": "🖐️",
    "illustrationSubtitle": {
      "th": "กา ก่า ก้า ก๊า ก๋า",
      "en": "5 full tones with 4 marks",
      "zh": "五全调"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "๕ เสียง (ผันครบ สามัญ เอก โท ตรี จัตวา)",
          "en": "3 tones",
          "zh": "3 个调"
        },
        "icon": "✌️"
      },
      {
        "id": "opt2",
        "label": {
          "th": "๓ เสียง (ผันได้เฉพาะ สามัญ เอก และ โท)",
          "en": "5 tones (full set)",
          "zh": "5 个调 (全部)"
        },
        "icon": "🖐️"
      },
      {
        "id": "opt3",
        "label": {
          "th": "๔ เสียง (ผันได้เฉพาะ เอก โท ตรี จัตวา)",
          "en": "4 tones",
          "zh": "4 个调"
        },
        "icon": "🖖"
      }
    ],
    "correctOptionId": "opt2",
    "explanation": {
      "th": "อักษรกลางคำเป็น สามารถผันวรรณยุกต์ได้ครบ ๕ เสียง รูปและเสียงตรงกัน: สามัญ เอก โท ตรี จัตวา (กา ก่า ก้า ก๊า ก๋า)",
      "en": "Middle consonants can inflect all 5 tones with matching tone marks: Kaa, Kàa, Kâa, Káa, Kǎa.",
      "zh": "中辅音活音可发全5个声调，声调符号与声调完全对应。"
    }
  },
  {
    "id": "tp5-02",
    "grade": "P2",
    "subject": "phonics_tone_korkaa",
    "skillCode": "TP5",
    "difficulty": 2,
    "question": {
      "th": "คำว่า \"ม้า\" (อักษรต่ำ ไม้โท) ออกเสียงวรรณยุกต์ใด ?",
      "en": "What tone pitch does the word \"ม้า\" (Low class + Mai Tho) have?",
      "zh": "低辅音词 \"ม้า\"（带有二号调号 ไม้โท）发什么声调？"
    },
    "illustration": "🐴",
    "illustrationSubtitle": {
      "th": "มา (สามัญ) - ม่า (เอก/เสียงโท) - ม้า (ตรี)",
      "en": "Low consonant tone rule: Mai Tho = Tri pitch",
      "zh": "低辅音声调规则：ไม้โท 发 ตรี 声"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "เสียงโท",
          "en": "Falling Tone (Tho)",
          "zh": "第三调/降调 (เสียงโท)"
        },
        "icon": "📉"
      },
      {
        "id": "opt2",
        "label": {
          "th": "เสียงเอก",
          "en": "Low Tone (Ek)",
          "zh": "第二调/低调 (เสียงเอก)"
        },
        "icon": "➖"
      },
      {
        "id": "opt3",
        "label": {
          "th": "เสียงตรี",
          "en": "High Tone (Tri)",
          "zh": "第四调/高调 (เสียงตรี)"
        },
        "icon": "⚡"
      }
    ],
    "correctOptionId": "opt3",
    "explanation": {
      "th": "อักษรต่ำมีกฎการผัน: รูปเอกออกเสียงโท, รูปโทออกเสียงตรี! ดังนั้นคำว่า \"ม้า\" รูปไม้โทจึงออกเสียง \"ตรี\"",
      "en": "Low-class consonants shift: Mai Ek sounds Falling (Tho), and Mai Tho sounds High (Tri). Thus \"ม้า\" is Tri tone.",
      "zh": "低辅音变调规则：写ไม้เอก发เสียงโท，写ไม้โท发เสียงตรี！因此 \"ม้า\" 发เสียงตรี。"
    }
  },
  {
    "id": "tp5-p3-01",
    "grade": "P3",
    "subject": "phonics_tone_korkaa",
    "skillCode": "TP5",
    "difficulty": 2,
    "question": {
      "th": "อักษรสูงคำเป็นในแม่ ก กา (เช่น ขา) สามารถผันวรรณยุกต์ได้กี่เสียง และมีเสียงใดบ้าง ?",
      "en": "How many tones can High-class consonants inflect in Mae Kor Kaa, and what are they?",
      "zh": "高辅音活音在 Mae Kor Kaa 中可以变哪几个声调？"
    },
    "illustration": "🔺",
    "illustrationSubtitle": {
      "th": "ขา (จัตวา) - ข่า (เอก) - ข้า (โท)",
      "en": "High Consonants: Ek, Tho, Chattawa",
      "zh": "高辅音变调：เอก, โท, จัตวา"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "๓ เสียง (ผันได้เฉพาะเสียง เอก โท จัตวา)",
          "en": "3 tones (Ek, Tho, Chattawa)",
          "zh": "3 个调 (เอก, โท, จัตวา)"
        },
        "icon": "🔺"
      },
      {
        "id": "opt2",
        "label": {
          "th": "๕ เสียง (ผันได้ครบทุกเสียงวรรณยุกต์)",
          "en": "5 tones",
          "zh": "5 个调"
        },
        "icon": "🖐️"
      },
      {
        "id": "opt3",
        "label": {
          "th": "๓ เสียง (ผันได้เฉพาะเสียง สามัญ เอก โท)",
          "en": "3 tones (Samanya, Ek, Tho)",
          "zh": "3 个调 (สามัญ, เอก, โท)"
        },
        "icon": "🔹"
      }
    ],
    "correctOptionId": "opt1",
    "explanation": {
      "th": "อักษรสูงคำเป็น ผันได้ ๓ เสียง: พื้นเสียงไม่มีรูปเป็น \"เสียงจัตวา\" (ขา), รูปเอกเป็น \"เสียงเอก\" (ข่า), รูปโทเป็น \"เสียงโท\" (ข้า)",
      "en": "High consonants inflect 3 tones: Chattawa (unmarked), Ek (marked with Mai Ek), and Tho (marked with Mai Tho).",
      "zh": "高辅音活音可变3个调：无调号为第五调（จัตวา），加ไม้เอก为เอก，加ไม้โท为โท。"
    }
  },
  {
    "id": "tp5-p4-01",
    "grade": "P4",
    "subject": "phonics_tone_korkaa",
    "skillCode": "TP5",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"จะ\" (อักษรกลางสระสั้น) มีพื้นเสียงวรรณยุกต์ใดโดยไม่ต้องใส่รูปวรรณยุกต์ ?",
      "en": "What tone pitch does \"จะ\" (Middle consonant dead syllable) have naturally?",
      "zh": "中辅音短元音词 \"จะ\" 自然发什么声调？"
    },
    "illustration": "🎯",
    "illustrationSubtitle": {
      "th": "อักษรกลางคำตาย พื้นเสียงเอก",
      "en": "Middle Class Dead Syllables = Low Tone (Ek)",
      "zh": "中辅音死音 = 第二调 (เอก)"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "เสียงสามัญ",
          "en": "Common Tone (Samanya)",
          "zh": "第一调/平调 (เสียงสามัญ)"
        },
        "icon": "🍃"
      },
      {
        "id": "opt2",
        "label": {
          "th": "เสียงเอก",
          "en": "Low Tone (Ek)",
          "zh": "第二调/低调 (เสียงเอก)"
        },
        "icon": "🎯"
      },
      {
        "id": "opt3",
        "label": {
          "th": "เสียงโท",
          "en": "Falling Tone (Tho)",
          "zh": "第三调/降调 (เสียงโท)"
        },
        "icon": "📉"
      }
    ],
    "correctOptionId": "opt2",
    "explanation": {
      "th": "อักษรกลาง คำตาย (เช่น จะ, ปะ, ติ, กุ) พื้นเสียงวรรณยุกต์จะเป็น \"เสียงเอก\" เสมอ เมื่อใส่ไม้โทเป็นเสียงโท (จ้ะ) ใส่ไม้ตรีเป็นเสียงตรี (จ๊ะ)",
      "en": "Middle consonants in dead syllables naturally sound Low Tone (Ek).",
      "zh": "中辅音死音词（如 จะ, ปะ）自然发第二调（เสียงเอก）。"
    }
  },
  {
    "id": "tp5-p5-01",
    "grade": "P5",
    "subject": "phonics_tone_korkaa",
    "skillCode": "TP5",
    "difficulty": 3,
    "question": {
      "th": "หากต้องการผันเสียงวรรณยุกต์ของคำว่า \"คา\" (อักษรต่ำ) ให้ครบ ๕ เสียง ต้องนำอักษรใดมาช่วยคู่กัน ?",
      "en": "To inflect \"คา\" across all 5 tones, which consonant pair must be used?",
      "zh": "若要将低辅音 \"คา\" 变齐5个声调，需要配对哪个高辅音？"
    },
    "illustration": "🤝",
    "illustrationSubtitle": {
      "th": "คา (สามัญ) ข่า (เอก) ค่า/ข้า (โท) ค้า (ตรี) ขา (จัตวา)",
      "en": "Paired tone inflection: ค + ข = 5 complete tones",
      "zh": "双低与高辅音协同变齐五调"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "อักษรสูง \"ข\" ( คา - ข่า - ค่า/ข้า - ค้า - ขา )",
          "en": "Middle consonant \"ก\"",
          "zh": "中辅音 \"ก\""
        },
        "icon": "🐥"
      },
      {
        "id": "opt2",
        "label": {
          "th": "อักษรกลาง \"ก\" ( กา - ก่า - ก้า - ก๊า - ก๋า )",
          "en": "Low consonant \"ช\"",
          "zh": "低辅音 \"ช\""
        },
        "icon": "🐘"
      },
      {
        "id": "opt3",
        "label": {
          "th": "อักษรต่ำ \"ช\" ( ชา - ช่า - ช่า/ช้า - ช้า - ชา )",
          "en": "High consonant \"ข\"",
          "zh": "高辅音 \"ข\""
        },
        "icon": "🤝"
      }
    ],
    "correctOptionId": "opt3",
    "explanation": {
      "th": "อักษรต่ำคู่ ค จับคู่กับอักษรสูง ข เพื่อผันได้ครบ ๕ เสียง: คา (สามัญ), ข่า (เอก), ค่า/ข้า (โท), ค้า (ตรี), ขา (จัตวา)",
      "en": "Pairing low-class ค with high-class ข yields all 5 tones: Khaa (Mid), Khàa (Low), Khâa (Fall), Kháa (High), Khǎa (Rise).",
      "zh": "低辅音 ค 与高辅音 ข 联合拼读即可发全五个声调：คา (平), ข่า (低), ค่า/ข้า (降), ค้า (高), ขา (升)。"
    }
  },
  {
    "id": "tp5-p6-01",
    "grade": "P6",
    "subject": "phonics_tone_korkaa",
    "skillCode": "TP5",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"เกศา\" และ \"นที\" มีเสียงวรรณยุกต์ในแต่ละพยางค์ตรงกับข้อใด ?",
      "en": "What are the tone pitches of the syllables in \"เกศา\" (Ke-saa) and \"นที\" (Na-thee)?",
      "zh": "单词 \"เกศา\" 与 \"นที\" 各音节的声调分别是什么？"
    },
    "illustration": "🌊",
    "illustrationSubtitle": {
      "th": "การผันเสียงวรรณยุกต์ในคำร้อยกรองแม่ ก กา",
      "en": "Tone pitch identification in poetic words",
      "zh": "诗歌词汇中的声调辨析"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "เกศา (เอก-จัตวา) , นที (สามัญ-สามัญ)",
          "en": "Ke-saa (Ek-Chattawa), Na-thee (Samanya-Samanya)",
          "zh": "เกศา (低-升), นที (平-平)"
        },
        "icon": "🌊"
      },
      {
        "id": "opt2",
        "label": {
          "th": "เกศา (สามัญ-สามัญ) , นที (เอก-โท)",
          "en": "Samanya-Samanya, Ek-Tho",
          "zh": "平-平, 低-降"
        },
        "icon": "🔹"
      },
      {
        "id": "opt3",
        "label": {
          "th": "เกศา (โท-ตรี) , นที (สามัญ-จัตวา)",
          "en": "Tho-Tri, Samanya-Chattawa",
          "zh": "降-高, 平-升"
        },
        "icon": "🔸"
      }
    ],
    "correctOptionId": "opt1",
    "explanation": {
      "th": "เกศา: เก (อักษรกลางสระสั้นเป็นเสียงเอก), ศา (อักษรสูงสระยาวพื้นเสียงจัตวา); นที: น (ต่ำสระสั้นเสียงตรีหรืออะกึ่งเสียง), ที (ต่ำสระยาวเสียงสามัญ)",
      "en": "เก-ศา sounds Ek-Chattawa, while น-ที sounds Samanya-Samanya in poetic rhythm.",
      "zh": "เก-ศา 为 เอก-จัตวา，น-ที 在诗律发音中通常对应平调 สามัญ-สามัญ。"
    }
  },
  {
    "id": "tp6-01",
    "grade": "P1",
    "subject": "phonics_direct_spelling",
    "skillCode": "TP6",
    "difficulty": 1,
    "question": {
      "th": "คำว่า \"กางเกง\" สะกดด้วยตัว ง จัดอยู่ในมาตราตัวสะกดแม่ใด ?",
      "en": "The word \"กางเกง\" has final consonant ง. Which Matra does it belong to?",
      "zh": "单词 \"กางเกง\" 尾音为 ง，属于哪个尾音门类？"
    },
    "illustration": "👖",
    "illustrationSubtitle": {
      "th": "แม่กง มี ง เป็นตัวสะกด",
      "en": "Mae Kong uses consonant Ng",
      "zh": "Mae Kong 以 ง 为尾音"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "แม่กน",
          "en": "Mae Kon (-n)",
          "zh": "Mae Kon (แม่กน)"
        },
        "icon": "🏠"
      },
      {
        "id": "opt2",
        "label": {
          "th": "แม่กง",
          "en": "Mae Kong (-ng)",
          "zh": "Mae Kong (แม่กง)"
        },
        "icon": "👖"
      },
      {
        "id": "opt3",
        "label": {
          "th": "แม่กม",
          "en": "Mae Kom (-m)",
          "zh": "Mae Kom (แม่กม)"
        },
        "icon": "🍊"
      }
    ],
    "correctOptionId": "opt2",
    "explanation": {
      "th": "มาตราแม่กง คือคำที่มีพยัญชนะ ง เป็นตัวสะกดท้ายพยางค์ เช่น กาง, เกง, ช้าง, ลิง, ยุง",
      "en": "Mae Kong consists of syllables ending with the consonant ง (ng).",
      "zh": "แม่กง 是以辅音 ง 为尾音的音节，如 กาง, เกง, ช้าง。"
    }
  },
  {
    "id": "tp6-02",
    "grade": "P2",
    "subject": "phonics_direct_spelling",
    "skillCode": "TP6",
    "difficulty": 2,
    "question": {
      "th": "คำว่า \"แมว\" และ \"ข้าว\" มีตัว ว สะกด จัดอยู่ในมาตราใด ?",
      "en": "Words \"แมว\" and \"ข้าว\" end with ว. What Matra are they?",
      "zh": "词语 \"แมว\" 与 \"ข้าว\" 以 ว 结尾，属于哪一个尾音类别？"
    },
    "illustration": "🐱",
    "illustrationSubtitle": {
      "th": "แม่เกอว มี ว เป็นตัวสะกด",
      "en": "Mae Keow with final W",
      "zh": "Mae Keow 尾音 ว"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "แม่เกย",
          "en": "Mae Koey (-y)",
          "zh": "Mae Koey (แม่เกย)"
        },
        "icon": "🍌"
      },
      {
        "id": "opt2",
        "label": {
          "th": "แม่กบ",
          "en": "Mae Kob (-b)",
          "zh": "Mae Kob (แม่กบ)"
        },
        "icon": "🐸"
      },
      {
        "id": "opt3",
        "label": {
          "th": "แม่เกอว",
          "en": "Mae Keow (-w)",
          "zh": "Mae Keow (แม่เกอว)"
        },
        "icon": "🐱"
      }
    ],
    "correctOptionId": "opt3",
    "explanation": {
      "th": "มาตราแม่เกอว คือคำที่มีพยัญชนะ ว เป็นตัวสะกด เช่น แมว, ข้าว, ดาว, นิ้ว, แก้ว",
      "en": "Mae Keow comprises words ending with the letter ว (w sound).",
      "zh": "แม่เกอว 是指以字母 ว 结尾的词，如 แมว, ข้าว, ดาว。"
    }
  },
  {
    "id": "tp6-p3-01",
    "grade": "P3",
    "subject": "phonics_direct_spelling",
    "skillCode": "TP6",
    "difficulty": 2,
    "question": {
      "th": "คำในข้อใดสะกดด้วยตัวสะกดตรงตามมาตรา \"แม่กม\" (ม สะกด) ทั้งหมด ?",
      "en": "Which group contains only words directly spelled in Mae Kom (Final M)?",
      "zh": "以下哪一组全部是规则以 ม 结尾的 Mae Kom 词？"
    },
    "illustration": "🍊",
    "illustrationSubtitle": {
      "th": "แม่กม สะกดด้วย ม",
      "en": "Mae Kom with M coda",
      "zh": "Mae Kom 尾音 ม"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "ลม , แก้ม , ส้ม , ยิ้ม",
          "en": "Lom, Kaem, Som, Yim",
          "zh": "ลม, แก้ม, ส้ม, ยิ้ม"
        },
        "icon": "🍊"
      },
      {
        "id": "opt2",
        "label": {
          "th": "กล้วย , ยาย , เนย , หอย",
          "en": "Mae Koey (-y)",
          "zh": "Mae Koey"
        },
        "icon": "🍌"
      },
      {
        "id": "opt3",
        "label": {
          "th": "บ้าน , ช้อน , จาน , ดิน",
          "en": "Mae Kon (-n)",
          "zh": "Mae Kon"
        },
        "icon": "🏠"
      }
    ],
    "correctOptionId": "opt1",
    "explanation": {
      "th": "คำแม่กม มีพยัญชนะ ม เป็นตัวสะกดตรงมาตรา เช่น ลม, แก้ม, ส้ม, ยิ้ม, ร่ม, จาม",
      "en": "Mae Kom consists of words with coda ม (m): ลม, แก้ม, ส้ม, ยิ้ม.",
      "zh": "แม่กม 是以字母 ม 为结尾辅音的词，如 ลม, แก้ม, ส้ม, ยิ้ม。"
    }
  },
  {
    "id": "tp6-p4-01",
    "grade": "P4",
    "subject": "phonics_direct_spelling",
    "skillCode": "TP6",
    "difficulty": 3,
    "question": {
      "th": "เมื่อคำประสมสระอัว (เช่น วัว) มีตัวสะกดตรงมาตรา (เช่น ง ใน \"ว + อัว + ง\") รูปสระจะเปลี่ยนแปลงอย่างไร ?",
      "en": "When vowel \"-ua\" (สระอัว) is followed by a final consonant, how does it reduce?",
      "zh": "当元音 สระอัว 加上尾音辅音时，其书写形式会如何缩减？"
    },
    "illustration": "🐮",
    "illustrationSubtitle": {
      "th": "ว + อัว + ง = วง (ไม้หันอากาศลดรูปหายไป)",
      "en": "Reduction of Sara Ua with coda",
      "zh": "สระอัว 带尾音时缩减"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "ไม้หันอากาศลดรูปหายไป เหลือเพียงตัว ว ( กวน )",
          "en": "Transforms into Sara Aa",
          "zh": "变成สระ อา"
        },
        "icon": "⚡"
      },
      {
        "id": "opt2",
        "label": {
          "th": "รูปสระเปลี่ยนเป็นสระ อา เมื่อมีตัวสะกดตามหลัง",
          "en": "Mai Han-akat drops, leaving only ว",
          "zh": "上方 Mai Han-akat 隐去，仅保留字母 ว"
        },
        "icon": "🐮"
      },
      {
        "id": "opt3",
        "label": {
          "th": "คงรูปสระอัวไว้เหมือนเดิมโดยไม่ตัดไม้หันอากาศ",
          "en": "Remains unchanged",
          "zh": "保持不变"
        },
        "icon": "📘"
      }
    ],
    "correctOptionId": "opt2",
    "explanation": {
      "th": "สระอัว (-ัว) เมื่อมีตัวสะกด ไม้หันอากาศจะลดรูปหายไป เหลือเพียงตัว ว ตรงกลาง เช่น ก + อัว + น = กวน, ส + อัว + น = สวน, ด + อัว + ง = ดวง",
      "en": "With a final consonant, the upper mark of -ัว drops, leaving only letter ว.",
      "zh": "元音 สระอัว 在有尾音时，上面的 Mai Han-akat 会隐去，只留中间的 ว，如 กวน, สวน, ดวง。"
    }
  },
  {
    "id": "tp6-p5-01",
    "grade": "P5",
    "subject": "phonics_direct_spelling",
    "skillCode": "TP6",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"สมบูรณ์\" และ \"งดงาม\" มีพยางค์หน้าและพยางค์หลังสะกดตรงตามมาตราใดตามลำดับ ?",
      "en": "Which Matras are the syllables in \"สมบูรณ์\" and \"งดงาม\" directly spelled in?",
      "zh": "词汇 \"สมบูรณ์\" 和 \"งดงาม\" 的前后音节分别属于什么尾音门类？"
    },
    "illustration": "🌟",
    "illustrationSubtitle": {
      "th": "สม (กม) - บูรณ์ (กน) , งด (กด) - งาม (กม)",
      "en": "Direct Matra Identification in 2-syllable words",
      "zh": "双音节词规则尾音辨析"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "สมบูรณ์ (แม่กง - แม่เกย) , งดงาม (แม่กบ - แม่กน)",
          "en": "Kong-Koey , Kob-Kon",
          "zh": "แม่กง - แม่เกย"
        },
        "icon": "🔹"
      },
      {
        "id": "opt2",
        "label": {
          "th": "สมบูรณ์ (แม่กม - แม่กม) , งดงาม (แม่กด - แม่กด)",
          "en": "Kom-Kom , Kot-Kot",
          "zh": "แม่กม - แม่กม"
        },
        "icon": "🔸"
      },
      {
        "id": "opt3",
        "label": {
          "th": "สมบูรณ์ (แม่กม - แม่กน) , งดงาม (แม่กด - แม่กม)",
          "en": "Kom-Kon , Kot-Kom",
          "zh": "แม่กม - แม่กน , แม่กด - แม่กม"
        },
        "icon": "🌟"
      }
    ],
    "correctOptionId": "opt3",
    "explanation": {
      "th": "สม (ม สะกด = แม่กม), บูรณ์ (ร สะกดออกเสียง น = แม่กน); งด (ด สะกด = แม่กด), งาม (ม สะกด = แม่กม)",
      "en": "สม is Mae Kom, บูรณ์ sounds Mae Kon; งด is Mae Kot, งาม is Mae Kom.",
      "zh": "สม 为 แม่กม，บูรณ์ 发 แม่กน 音；งด 为 แม่กด，งาม 为 แม่กม。"
    }
  },
  {
    "id": "tp6-p6-01",
    "grade": "P6",
    "subject": "phonics_direct_spelling",
    "skillCode": "TP6",
    "difficulty": 3,
    "question": {
      "th": "ในทางสัทศาสตร์ภาษาไทย คำที่มีตัวสะกดจัดเป็นพยางค์ประเภทใด ?",
      "en": "In Thai phonology, what type of syllable is a syllable with a coda consonant called?",
      "zh": "在泰语语音学中，带有尾音辅音的音节称为什么音节？"
    },
    "illustration": "🚪",
    "illustrationSubtitle": {
      "th": "พยางค์เปิด (ไม่มีตัวสะกด) vs พยางค์ปิด (มีตัวสะกด)",
      "en": "Open Syllables vs Closed Syllables",
      "zh": "开音节与闭音节"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "พยางค์ปิด (Closed Syllable)",
          "en": "Closed Syllable",
          "zh": "闭音节 (Closed Syllable)"
        },
        "icon": "🚪"
      },
      {
        "id": "opt2",
        "label": {
          "th": "พยางค์เปิด (Open Syllable)",
          "en": "Open Syllable",
          "zh": "开音节 (Open Syllable)"
        },
        "icon": "🪟"
      },
      {
        "id": "opt3",
        "label": {
          "th": "พยางค์กึ่งเปิดกึ่งปิด",
          "en": "Semi-open Syllable",
          "zh": "半开音节"
        },
        "icon": "⚖️"
      }
    ],
    "correctOptionId": "opt1",
    "explanation": {
      "th": "พยางค์ที่มีพยัญชนะท้าย (ตัวสะกด) มาปิดเสียง เรียกว่า \"พยางค์ปิด\" (Closed Syllable) ส่วนคำในแม่ ก กา ที่ไม่มีตัวสะกดเรียกว่า \"พยางค์เปิด\" (Open Syllable)",
      "en": "A syllable ending with a coda consonant is linguistically termed a \"Closed Syllable\".",
      "zh": "带有结尾尾音辅音的音节在语音学中称为“闭音节”（Closed Syllable），无尾音的开音节为“开音节”。"
    }
  },
  {
    "id": "tp7-01",
    "grade": "P2",
    "subject": "phonics_tone_spelling",
    "skillCode": "TP7",
    "difficulty": 2,
    "question": {
      "th": "คำว่า \"บ้าน\" (บ + า + น + ้) เป็นคำอักษรกลางในมาตราแม่กน ออกเสียงวรรณยุกต์ใด ?",
      "en": "The word \"บ้าน\" (Middle class + Mae Kon + Mai Tho) sounds what tone?",
      "zh": "单词 \"บ้าน\"（中辅音 + 尾音 น + 调号 ไม้โท）发什么声调？"
    },
    "illustration": "🏡",
    "illustrationSubtitle": {
      "th": "บาน - บ่าน - บ้าน - บ๊าน - บ๋าน",
      "en": "Middle consonant with sonorant final inflects all 5 tones",
      "zh": "中辅音活音变调"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "เสียงเอก",
          "en": "Low Tone (Ek)",
          "zh": "第二调 (เสียงเอก)"
        },
        "icon": "🌲"
      },
      {
        "id": "opt2",
        "label": {
          "th": "เสียงโท",
          "en": "Falling Tone (Tho)",
          "zh": "第三调 (เสียงโท)"
        },
        "icon": "🏡"
      },
      {
        "id": "opt3",
        "label": {
          "th": "เสียงตรี",
          "en": "High Tone (Tri)",
          "zh": "第四调 (เสียงตรี)"
        },
        "icon": "⭐"
      }
    ],
    "correctOptionId": "opt2",
    "explanation": {
      "th": "อักษรกลางเป็นคำเป็น (สะกดด้วยแม่กน) รูปวรรณยุกต์ตรงกับเสียง เมื่อใส่ไม้โท จึงออกเสียงวรรณยุกต์ \"โท\"",
      "en": "Middle-class words in sonorant Matra have direct tone matching. Mai Tho gives Falling Tone (Tho).",
      "zh": "中辅音活音调号与声调一致，加ไม้โท即发เสียงโท。"
    }
  },
  {
    "id": "tp7-02",
    "grade": "P3",
    "subject": "phonics_tone_spelling",
    "skillCode": "TP7",
    "difficulty": 3,
    "question": {
      "th": "คำในข้อใดจัดเป็น \"คำตาย\" (สะกดด้วยแม่กก แม่กด หรือแม่กบ) ทั้งหมด ?",
      "en": "Which set consists solely of Dead Syllables (Kham Tai: Matra Kok, Kot, Kob)?",
      "zh": "以下哪一组全部是\"死音词\"（以 ก, ด, บ 结尾）？"
    },
    "illustration": "🛑",
    "illustrationSubtitle": {
      "th": "คำตาย: จำง่ายๆ ก-บ-ด (กบฏ)",
      "en": "Mnemonic: K-B-D (Stop sounds)",
      "zh": "死音记忆口诀：กบฏ (K-B-D)"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "คน , ลม , ดาว",
          "en": "Khon, Lom, Dao (Live)",
          "zh": "คน, ลม, ดาว"
        },
        "icon": "🌾"
      },
      {
        "id": "opt2",
        "label": {
          "th": "ช้าง , ยาย , แดน",
          "en": "Chang, Yai, Daen (Live)",
          "zh": "ช้าง, ยาย, แดน"
        },
        "icon": "🐘"
      },
      {
        "id": "opt3",
        "label": {
          "th": "นก , เป็ด , กบ",
          "en": "Nok, Ped, Kob",
          "zh": "นก, เป็ด, กบ"
        },
        "icon": "🦆"
      }
    ],
    "correctOptionId": "opt3",
    "explanation": {
      "th": "คำตาย คือคำที่ประสมสระเสียงสั้นไม่มีตัวสะกด หรือสะกดด้วยแม่ กก กด กบ (ท่องว่า \"กบด/กบฏ\") เช่น นก เป็ด กบ",
      "en": "Dead syllables end in stop consonants K, T, P (Kok, Kot, Kob) or short vowels.",
      "zh": "死音是指以塞音尾音 ก, ด, บ 结尾或短元音无尾音的词，如 นก, เป็ด, กบ。"
    }
  },
  {
    "id": "tp7-p4-01",
    "grade": "P4",
    "subject": "phonics_tone_spelling",
    "skillCode": "TP7",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"ช้าง\" (อักษรต่ำ + แม่กง + ไม้โท) ออกเสียงวรรณยุกต์ใด ?",
      "en": "What tone pitch does the word \"ช้าง\" (Low class + Mae Kong + Mai Tho) have?",
      "zh": "低辅音词 \"ช้าง\"（带尾音 ง + 调号 ไม้โท）发什么声调？"
    },
    "illustration": "🐘",
    "illustrationSubtitle": {
      "th": "ชาง (สามัญ) - ช่าง (เอก/เสียงโท) - ช้าง (ตรี)",
      "en": "Low consonant tone rule with sonorant coda",
      "zh": "低辅音带活音尾音变调"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "เสียงตรี",
          "en": "High Tone (Tri)",
          "zh": "第四调/高调 (เสียงตรี)"
        },
        "icon": "🐘"
      },
      {
        "id": "opt2",
        "label": {
          "th": "เสียงโท",
          "en": "Falling Tone (Tho)",
          "zh": "第三调/降调 (เสียงโท)"
        },
        "icon": "📉"
      },
      {
        "id": "opt3",
        "label": {
          "th": "เสียงจัตวา",
          "en": "Rising Tone (Chattawa)",
          "zh": "第五调/升调 (เสียงจัตวา)"
        },
        "icon": "🔺"
      }
    ],
    "correctOptionId": "opt1",
    "explanation": {
      "th": "คำอักษรต่ำคำเป็น เมื่อใส่ไม้เอกจะออกเสียงโท (ช่าง) และเมื่อใส่ไม้โทจะออกเสียงตรี (ช้าง)",
      "en": "Low consonants with sonorant codas shift: Mai Tho produces High Tone (Tri), as in ช้าง.",
      "zh": "低辅音活音词变调规则：加ไม้เอก发เสียงโท，加ไม้โท发เสียงตรี，因此 \"ช้าง\" 发เสียงตรี。"
    }
  },
  {
    "id": "tp7-p5-01",
    "grade": "P5",
    "subject": "phonics_tone_spelling",
    "skillCode": "TP7",
    "difficulty": 3,
    "question": {
      "th": "หากต้องการผันวรรณยุกต์คำว่า \"งาม\" (อักษรต่ำเดี่ยว) ให้ครบ ๕ เสียง ต้องใช้อักษรนำใดมาช่วยผัน ?",
      "en": "To inflect single low consonant \"งาม\" across all 5 tones, which leading consonant is needed?",
      "zh": "要使单低辅音 \"งาม\" 变齐5个声调，需要借助哪一个前导字母？"
    },
    "illustration": "🌺",
    "illustrationSubtitle": {
      "th": "งาม (สามัญ) หง่าม (เอก) ง่าม/หง้าม (โท) ง้าม (ตรี) หงาม (จัตวา)",
      "en": "Using \"ห\" leading low sonorant to get all 5 tones",
      "zh": "借助 \"ห\" 引导单低辅音变齐五调"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "ห นำ (หง่าม , หงาม ช่วยผันเสียงเอกและจัตวา)",
          "en": "Or Nam (อ)",
          "zh": "อ 前导"
        },
        "icon": "🌱"
      },
      {
        "id": "opt2",
        "label": {
          "th": "อ นำ (อย่า อยู่ อย่าง อยาก ช่วยผันเสียงตรี)",
          "en": "Ho Nam (ห)",
          "zh": "ห 前导 (หง่าม, หงาม)"
        },
        "icon": "🌺"
      },
      {
        "id": "opt3",
        "label": {
          "th": "ร หัน (กรรไกร บรรทัด ช่วยในการเปลี่ยนรูปเสียง)",
          "en": "Ror Han",
          "zh": "ร หัน"
        },
        "icon": "🌿"
      }
    ],
    "correctOptionId": "opt2",
    "explanation": {
      "th": "อักษรต่ำเดี่ยว (ง น ม ย ร ล ว ฯลฯ) เมื่อต้องการผันเสียงเอกและเสียงจัตวา ต้องใช้ ห นำ มาช่วย เช่น งาม, หง่าม, ง่าม/หง้าม, ง้าม, หงาม ครบ ๕ เสียง",
      "en": "Single low consonants rely on Ho Nam (ห นำ) to complete Low (Ek) and Rising (Chattawa) tones.",
      "zh": "单低辅音需借助 ห นำ 才能发出第二调（เอก）与第五调（จัตวา），如 งาม, หง่าม, ง่าม, ง้าม, หงาม。"
    }
  },
  {
    "id": "tp7-p6-01",
    "grade": "P6",
    "subject": "phonics_tone_spelling",
    "skillCode": "TP7",
    "difficulty": 3,
    "question": {
      "th": "คำทับศัพท์ภาษาอังกฤษ \"โน้ต\" และ \"การ์ด\" มีรูปและเสียงวรรณยุกต์สัมพันธ์กันอย่างไร ?",
      "en": "How are written tone marks and phonetic pitches related in loanwords \"โน้ต\" and \"การ์ด\"?",
      "zh": "英语外来词 \"โน้ต\" 和 \"การ์ด\" 的调号与实际声调是什么关系？"
    },
    "illustration": "📝",
    "illustrationSubtitle": {
      "th": "การผันเสียงวรรณยุกต์ในคำทับศัพท์",
      "en": "Tone inflections in English loanwords",
      "zh": "外来词声调标注与实际发音"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "โน้ต (รูปโท เสียงตรี) , การ์ด (รูปโท เสียงโท)",
          "en": "Both have direct matching",
          "zh": "调号与声调全一致"
        },
        "icon": "🔹"
      },
      {
        "id": "opt2",
        "label": {
          "th": "ทั้งสองคำมีรูปและเสียงวรรณยุกต์ตรงกันพอดี",
          "en": "Both are common tone",
          "zh": "全为平调"
        },
        "icon": "🔸"
      },
      {
        "id": "opt3",
        "label": {
          "th": "ทั้งสองคำออกเสียงเป็นเสียงสามัญคู่กันทั้งสองคำ",
          "en": "Note (Tho mark -> Tri sound) , Card (Tho mark -> Tho sound)",
          "zh": "โน้ต (二号调号-发第四调) , การ์ด (二号调号-发第三调)"
        },
        "icon": "📝"
      }
    ],
    "correctOptionId": "opt3",
    "explanation": {
      "th": "โน้ต: น เป็นอักษรต่ำ รูปโทออกเสียงตรี; การ์ด: ก เป็นอักษรกลาง รูปโทออกเสียงโทตรงรูป",
      "en": "In \"โน้ต\", low consonant น with Mai Tho sounds High (Tri). In \"การ์ด\", middle consonant ก with Mai Tho sounds Falling (Tho).",
      "zh": "\"โน้ต\" 中 น 为低辅音，写ไม้โท发เสียงตรี；\"การ์ด\" 中 ก 为中辅音，写ไม้โท发เสียงโท。"
    }
  },
  {
    "id": "tp8-01",
    "grade": "P2",
    "subject": "phonics_indirect_spelling",
    "skillCode": "TP8",
    "difficulty": 2,
    "question": {
      "th": "คำว่า \"เลข\" สะกดด้วย ข ไข่ จัดอยู่ในมาตราตัวสะกดแม่ใด ?",
      "en": "The word \"เลข\" ends with consonant ข. Which Matra does it sound like?",
      "zh": "单词 \"เลข\" 结尾为 ข，属于哪一个尾音类别？"
    },
    "illustration": "🔢",
    "illustrationSubtitle": {
      "th": "ข ค ฆ อยู่ในแม่กก ออกเสียงเหมือน ก สะกด",
      "en": "Indirect Mae Kok (sounds like K)",
      "zh": "不规则 Mae Kok (发 k 音)"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "แม่กก (ออกเสียงเหมือน ก สะกด)",
          "en": "Mae Kok (Sounds like K)",
          "zh": "Mae Kok (发 ก 尾音)"
        },
        "icon": "🔢"
      },
      {
        "id": "opt2",
        "label": {
          "th": "แม่กด (ออกเสียงเหมือน ด สะกด)",
          "en": "Mae Kot (Sounds like D)",
          "zh": "Mae Kot (发 ด 尾音)"
        },
        "icon": "📝"
      },
      {
        "id": "opt3",
        "label": {
          "th": "แม่กน (ออกเสียงเหมือน น สะกด)",
          "en": "Mae Kon (Sounds like N)",
          "zh": "Mae Kon (发 น 尾音)"
        },
        "icon": "📖"
      }
    ],
    "correctOptionId": "opt1",
    "explanation": {
      "th": "มาตราแม่กก มี ข ค ฆ เป็นตัวสะกดไม่ตรงตามมาตรา เช่น เลข (เลก), สุนัข (สุ-นัก), เมฆ (เมก)",
      "en": "Mae Kok indirect consonants are ข, ค, ฆ, all pronounced as K finals.",
      "zh": "Mae Kok 的不规则尾音有 ข, ค, ฆ，均发 k 音，如 เลข, สุนัข, เมฆ。"
    }
  },
  {
    "id": "tp8-02",
    "grade": "P3",
    "subject": "phonics_indirect_spelling",
    "skillCode": "TP8",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"ตำรวจ\" และ \"อากาศ\" อยู่ในมาตราตัวสะกดแม่ใด ?",
      "en": "Which Matra do the words \"ตำรวจ\" and \"อากาศ\" belong to?",
      "zh": "单词 \"ตำรวจ\" 与 \"อากาศ\" 属于哪一个尾音类别？"
    },
    "illustration": "👮",
    "illustrationSubtitle": {
      "th": "จ ช ซ ฎ ฏ ฐ ฑ ฒ ต ถ ท ธ ศ ษ ส อยู่ในแม่กด",
      "en": "Consonants pronounced as D finals",
      "zh": "发 d 音的各不规则字母"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "แม่กบ (ออกเสียงเหมือน บ สะกด)",
          "en": "Mae Kob (Sounds like B)",
          "zh": "Mae Kob (发 บ 音)"
        },
        "icon": "🐸"
      },
      {
        "id": "opt2",
        "label": {
          "th": "แม่กด (ออกเสียงเหมือน ด สะกด)",
          "en": "Mae Kot (Sounds like D)",
          "zh": "Mae Kot (发 ด 音)"
        },
        "icon": "👮"
      },
      {
        "id": "opt3",
        "label": {
          "th": "แม่กน (ออกเสียงเหมือน น สะกด)",
          "en": "Mae Kon (Sounds like N)",
          "zh": "Mae Kon (发 น 音)"
        },
        "icon": "📦"
      }
    ],
    "correctOptionId": "opt2",
    "explanation": {
      "th": "คำว่า \"ตำรวจ\" (จ สะกด) และ \"อากาศ\" (ศ สะกด) ต่างออกเสียงตัวสะกดเหมือนเสียง ด จึงอยู่ในมาตราแม่กด",
      "en": "Consonants จ and ศ when acting as codas are pronounced as \"ด\" (Mae Kot).",
      "zh": "字母 จ 和 ศ 作为词尾时，发音同 ด，均属于 แม่กด。"
    }
  },
  {
    "id": "tp8-p4-01",
    "grade": "P4",
    "subject": "phonics_indirect_spelling",
    "skillCode": "TP8",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"ปรากฏ\" และ \"กฎหมาย\" สะกดด้วย ฏ ปฏัก และ ฎ ชฎา อยู่ในมาตราตัวสะกดใด ?",
      "en": "Words \"ปรากฏ\" and \"กฎหมาย\" ending with ฏ and ฎ belong to which Matra?",
      "zh": "单词 \"ปรากฏ\" 和 \"กฎหมาย\" 分别以 ฏ 和 ฎ 结尾，属于哪一个尾音类别？"
    },
    "illustration": "⚖️",
    "illustrationSubtitle": {
      "th": "ฎ และ ฏ อยู่ในมาตราแม่กด",
      "en": "Dor Chada and Tor Patak belong to Mae Kot",
      "zh": "ฎ 和 ฏ 均属于 แม่กด"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "แม่กก (ออกเสียงเหมือน ก สะกด)",
          "en": "Mae Kok (Sounds like K)",
          "zh": "Mae Kok (发 ก 音)"
        },
        "icon": "📘"
      },
      {
        "id": "opt2",
        "label": {
          "th": "แม่กน (ออกเสียงเหมือน น สะกด)",
          "en": "Mae Kon (Sounds like N)",
          "zh": "Mae Kon (发 น 音)"
        },
        "icon": "📙"
      },
      {
        "id": "opt3",
        "label": {
          "th": "แม่กด (ออกเสียงเหมือน ด สะกด)",
          "en": "Mae Kot (Sounds like D)",
          "zh": "Mae Kot (发 ด 音)"
        },
        "icon": "⚖️"
      }
    ],
    "correctOptionId": "opt3",
    "explanation": {
      "th": "ทั้ง ฎ ชฎา และ ฏ ปฏัก เมื่อทำหน้าที่เป็นตัวสะกดท้ายพยางค์ จะออกเสียงเหมือน ด เด็กสะกด จึงอยู่ในมาตราแม่กด",
      "en": "Both ฎ and ฏ function as final codas sounding like \"ด\" (Mae Kot).",
      "zh": "ฎ 与 ฏ 作为尾音时，发音均等同于 ด เด็ก，属于 แม่กด。"
    }
  },
  {
    "id": "tp8-p5-01",
    "grade": "P5",
    "subject": "phonics_indirect_spelling",
    "skillCode": "TP8",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"วาฬ\" , \"กุญแจ\" , \"ขอบคุณ\" , \"ฟุตบอล\" ทั้งหมดอยู่ในมาตราตัวสะกดแม่ใด ?",
      "en": "Which Matra do the words \"วาฬ\", \"กุญแจ\", \"ขอบคุณ\", and \"ฟุตบอล\" belong to?",
      "zh": "单词 \"วาฬ\"、\"กุญแจ\"、\"ขอบคุณ\"、\"ฟุตบอล\" 全部属于哪个尾音门类？"
    },
    "illustration": "🐋",
    "illustrationSubtitle": {
      "th": "ญ ณ ร ล ฬ อยู่ในมาตราแม่กน (เสียง น สะกด)",
      "en": "Consonants ญ, ณ, ร, ล, ฬ sound like N",
      "zh": "ญ, ณ, ร, ล, ฬ 均发 N 音"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "แม่กน (ออกเสียงเหมือน น สะกด)",
          "en": "Mae Kon (Sounds like N)",
          "zh": "Mae Kon (发 น 音)"
        },
        "icon": "🐋"
      },
      {
        "id": "opt2",
        "label": {
          "th": "แม่กม (ออกเสียงเหมือน ม สะกด)",
          "en": "Mae Kom (Sounds like M)",
          "zh": "Mae Kom (发 ม 音)"
        },
        "icon": "🍊"
      },
      {
        "id": "opt3",
        "label": {
          "th": "แม่เกย (ออกเสียงเหมือน ย สะกด)",
          "en": "Mae Koey (Sounds like Y)",
          "zh": "Mae Koey (发 ย 音)"
        },
        "icon": "🍌"
      }
    ],
    "correctOptionId": "opt1",
    "explanation": {
      "th": "มาตราแม่กน มีตัวสะกดไม่ตรงมาตรา ๕ ตัว ได้แก่ ญ ณ ร ล ฬ เช่น วาฬ (วาน), กุญแจ (กุน), ขอบคุณ (คุน), ฟุตบอล (บอน)",
      "en": "Mae Kon includes indirect codas ญ, ณ, ร, ล, ฬ, all pronounced as N finals.",
      "zh": "แม่กน 的不规则尾音有 ญ, ณ, ร, ล, ฬ，均发 n 尾音，如 วาฬ, กุญแจ, ขอบคุณ, บอล。"
    }
  },
  {
    "id": "tp8-p6-01",
    "grade": "P6",
    "subject": "phonics_indirect_spelling",
    "skillCode": "TP8",
    "difficulty": 3,
    "question": {
      "th": "คำพ้องเสียง \"กาล\" , \"กานต์\" , \"กาฬ\" , \"การณ์\" ทั้งหมดมีเสียงตัวสะกดในมาตราใด ?",
      "en": "In homophones \"กาล\", \"กานต์\", \"กาฬ\", \"การณ์\", which Matra do they all sound like?",
      "zh": "同音词 \"กาล\"、\"กานต์\"、\"กาฬ\"、\"การณ์\" 其尾音属于哪个尾音门类？"
    },
    "illustration": "⏳",
    "illustrationSubtitle": {
      "th": "คำพ้องเสียงที่มีตัวสะกดต่างรูปในแม่กน",
      "en": "Homophones in Mae Kon",
      "zh": "Mae Kon 中的同音异形字"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "แม่กน (ออกเสียงตัวสะกดเป็นแม่กน ทุกคำ)",
          "en": "Mae Kot",
          "zh": "Mae Kot"
        },
        "icon": "📝"
      },
      {
        "id": "opt2",
        "label": {
          "th": "แม่กด (ออกเสียงตัวสะกดเป็นแม่กด ทุกคำ)",
          "en": "Mae Kon (All sound as \"Kaan\")",
          "zh": "Mae Kon (全部读作 Kaan)"
        },
        "icon": "⏳"
      },
      {
        "id": "opt3",
        "label": {
          "th": "แม่กก (ออกเสียงตัวสะกดเป็นแม่กก ทุกคำ)",
          "en": "Mae Kok",
          "zh": "Mae Kok"
        },
        "icon": "📘"
      }
    ],
    "correctOptionId": "opt2",
    "explanation": {
      "th": "กาล (ล สะกด), กานต์ (น สะกด ต การันต์), กาฬ (ฬ สะกด), การณ์ (ร สะกด ณ การันต์) ล้วนออกเสียง \"กาน\" อยู่ในมาตราแม่กนทั้งสิ้น แต่มีความหมายต่างกันตามรูปคำ",
      "en": "All 4 homophones end with phoneme /n/ (Mae Kon): กาล (time), กานต์ (beloved), กาฬ (black), การณ์ (event).",
      "zh": "กาล (时间), กานต์ (挚爱), กาฬ (黑色), การณ์ (事由) 尾音发音均为 /n/，同属 แม่กน。"
    }
  },
  {
    "id": "tp9-01",
    "grade": "P2",
    "subject": "phonics_cluster",
    "skillCode": "TP9",
    "difficulty": 2,
    "question": {
      "th": "คำในข้อใดจัดเป็น \"อักษรควบแท้\" (ออกเสียงกล้ำพร้อมกัน) ทั้งหมด ?",
      "en": "Which group contains only True Consonant Clusters (Akson Khwuap Thae)?",
      "zh": "以下哪一组全部是\"真辅音丛/真复辅音\"（同时清晰发音）？"
    },
    "illustration": "🥁",
    "illustrationSubtitle": {
      "th": "ควบกล้ำ ร ล ว พร้อมกัน",
      "en": "Blended with R, L, W",
      "zh": "与 R, L, W 连读"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "จริง , สร้าง , ทราย",
          "en": "Jring, Saang, Saai (False)",
          "zh": "จริง, สร้าง, ทราย"
        },
        "icon": "🏖️"
      },
      {
        "id": "opt2",
        "label": {
          "th": "ขนม , ฉลาม , ตลาด",
          "en": "Leading consonants",
          "zh": "前导辅音"
        },
        "icon": "🍬"
      },
      {
        "id": "opt3",
        "label": {
          "th": "กราบ , กลอง , กวาด",
          "en": "Kraap, Klong, Kwaat",
          "zh": "กราบ, กลอง, กวาด"
        },
        "icon": "🥁"
      }
    ],
    "correctOptionId": "opt3",
    "explanation": {
      "th": "อักษรควบแท้ คือพยัญชนะต้น ๒ ตัวประสมสระเดียวกัน ออกเสียงกล้ำพร้อมกัน เช่น กราบ (กร-), กลอง (กล-), กวาด (กว-)",
      "en": "True clusters blend the initial consonants with R, L, or W simultaneously.",
      "zh": "真复辅音是将两个辅音与同一元音同时拼读连发，如 กราบ (กร), กลอง (กล), กวาด (กว)。"
    }
  },
  {
    "id": "tp9-02",
    "grade": "P3",
    "subject": "phonics_cluster",
    "skillCode": "TP9",
    "difficulty": 2,
    "question": {
      "th": "คำว่า \"ทราย\" และ \"ทราบ\" พยัญชนะ \"ทร\" ออกเสียงเป็นเสียงใด ?",
      "en": "In words \"ทราย\" and \"ทราบ\", what sound does the cluster \"ทร\" produce?",
      "zh": "在单词 \"ทราย\" 和 \"ทราบ\" 中，字母组合 \"ทร\" 发什么音？"
    },
    "illustration": "🏖️",
    "illustrationSubtitle": {
      "th": "ทร เปลี่ยนเสียงเป็น ซ",
      "en": "Thor + Ror sounds like Sor (S)",
      "zh": "ทร 变音为 ซ (S)"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "ออกเสียงเป็น ซ (ทราย = ซาย)",
          "en": "Pronounced as S sound (Saai)",
          "zh": "发音为 ซ (Saai)"
        },
        "icon": "🏖️"
      },
      {
        "id": "opt2",
        "label": {
          "th": "ออกเสียงเป็น ทร ควบกล้ำ",
          "en": "Pronounced as Tr cluster",
          "zh": "发 Tr 复辅音"
        },
        "icon": "🌊"
      },
      {
        "id": "opt3",
        "label": {
          "th": "ออกเสียงเป็น ร เรือ ตัวเดียว",
          "en": "Pronounced as R alone",
          "zh": "只发 R 单音"
        },
        "icon": "⛵"
      }
    ],
    "correctOptionId": "opt1",
    "explanation": {
      "th": "ทร เป็นอักษรควบไม่แท้ เมื่อเขียน ทร ให้ออกเสียงเป็น ซ เช่น ทราย (ซาย), ทราบ (ซาบ), พุทรา (พุด-ซา)",
      "en": "The cluster \"ทร\" is an irregular/false cluster pronounced as \"ซ\" (s sound).",
      "zh": "\"ทร\" 是非真复辅音，发音转变为 \"ซ\" (s 音)，如 ทราย 读作 ซาย，ทราบ 读作 ซาบ。"
    }
  },
  {
    "id": "tp9-p4-01",
    "grade": "P4",
    "subject": "phonics_cluster",
    "skillCode": "TP9",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"จริง\" , \"สร้าง\" , \"สร้อย\" , \"ศรัทธา\" จัดเป็นอักษรควบประเภทใด ?",
      "en": "What type of consonant cluster are \"จริง\", \"สร้าง\", \"สร้อย\", and \"ศรัทธา\"?",
      "zh": "单词 \"จริง\"、\"สร้าง\"、\"สร้อย\"、\"ศรัทธา\" 属于哪一类复辅音？"
    },
    "illustration": "💎",
    "illustrationSubtitle": {
      "th": "อักษรควบไม่แท้ (ออกเสียงเฉพาะพยัญชนะหน้า)",
      "en": "Pseudo/False Cluster (Pronounces only first consonant)",
      "zh": "非真复辅音（仅发首辅音）"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "อักษรควบไม่แท้ (ไม่ออกเสียงพยัญชนะ ร)",
          "en": "True cluster",
          "zh": "真复辅音"
        },
        "icon": "🥁"
      },
      {
        "id": "opt2",
        "label": {
          "th": "อักษรควบแท้ (ออกเสียงพยัญชนะพร้อมกัน)",
          "en": "False cluster (R is silent)",
          "zh": "非真复辅音（不发 R 音）"
        },
        "icon": "💎"
      },
      {
        "id": "opt3",
        "label": {
          "th": "อักษรนำ (ออกเสียงพยางค์นำกึ่งเสียงสระอะ)",
          "en": "Leading consonant",
          "zh": "前导辅音"
        },
        "icon": "👑"
      }
    ],
    "correctOptionId": "opt2",
    "explanation": {
      "th": "เมื่อ จ ซ ศ ส ควบกับ ร จะจัดเป็น \"อักษรควบไม่แท้\" โดยออกเสียงเฉพาะพยัญชนะตัวหน้า ไม่ออกเสียงตัว ร เช่น จริง (จิง), สร้าง (ส้าง), สร้อย (ส้อย), ศรัทธา (สัด-ทา)",
      "en": "When จ, ซ, ศ, ส are paired with ร, they form false clusters where ร is silent.",
      "zh": "当 จ, ซ, ศ, ส 与 ร 组合时属于非真复辅音，只发前一个字母的声音，如 จริง (จิง), สร้าง (ส้าง)。"
    }
  },
  {
    "id": "tp9-p5-01",
    "grade": "P5",
    "subject": "phonics_cluster",
    "skillCode": "TP9",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"บล็อก\" , \"เบรก\" , \"ดรัม\" , \"ฟลุต\" เป็นคำควบกล้ำที่ได้รับอิทธิพลมาจากภาษาใด ?",
      "en": "Which language do the loanword clusters \"บล็อก\", \"เบรก\", \"ดรัม\", and \"ฟลุต\" come from?",
      "zh": "复辅音借词 \"บล็อก\"、\"เบรก\"、\"ดรัม\"、\"ฟลุต\" 受哪个语言的影响？"
    },
    "illustration": "🎶",
    "illustrationSubtitle": {
      "th": "คำควบกล้ำภาษาต่างประเทศ (ภาษาอังกฤษ)",
      "en": "English Loanword Consonant Clusters",
      "zh": "英语外来复辅音"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "ภาษาอังกฤษร่วมสมัย",
          "en": "Pali-Sanskrit",
          "zh": "巴利-梵语"
        },
        "icon": "📜"
      },
      {
        "id": "opt2",
        "label": {
          "th": "ภาษาบาลี-ภาษาสันสกฤต",
          "en": "Khmer",
          "zh": "高棉/柬埔寨语"
        },
        "icon": "🏛️"
      },
      {
        "id": "opt3",
        "label": {
          "th": "ภาษาเขมรโบราณในไทย",
          "en": "English",
          "zh": "英语"
        },
        "icon": "🎶"
      }
    ],
    "correctOptionId": "opt3",
    "explanation": {
      "th": "คำควบกล้ำ บล (บล็อก), บร (เบรก), ดร (ดรัม), ฟล (ฟลุต), ฟร (ฟรี) เป็นคำควบกล้ำที่ยืมมาจากภาษาอังกฤษ ซึ่งแต่เดิมภาษาไทยไม่มีเสียงควบเหล่านี้",
      "en": "Clusters like บล, บร, ดร, ฟล, ฟร entered Thai through modern English borrowings (Block, Brake, Drum, Flute).",
      "zh": "บล, บร, ดร, ฟล, ฟร 是源自英语借词（Block, Brake, Drum, Flute）的新型复辅音组合。"
    }
  },
  {
    "id": "tp9-p6-01",
    "grade": "P6",
    "subject": "phonics_cluster",
    "skillCode": "TP9",
    "difficulty": 3,
    "question": {
      "th": "ประโยค \"นกอินทรีบินข้ามลำคลองไปเกาะต้นไทร\" มีคำอักษรควบแท้ และ อักษรควบไม่แท้ กี่คำตามลำดับ ?",
      "en": "In \"นกอินทรีบินข้ามลำคลองไปเกาะต้นไทร\", how many True and False clusters are there?",
      "zh": "在句子 \"นกอินทรีบินข้ามลำคลองไปเกาะต้นไทร\" 中，分别有几个真复辅音和非真复辅音？"
    },
    "illustration": "🦅",
    "illustrationSubtitle": {
      "th": "คลอง (ควบแท้) vs อินทรี, ไทร (ควบไม่แท้ ทร=ซ)",
      "en": "True cluster: คลอง ; False clusters: อินทรี, ไทร",
      "zh": "真复辅音：คลอง ；非真复辅音：อินทรี, ไทร"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "ควบแท้ ๑ คำ (คลอง) , ควบไม่แท้ ๒ คำ (อินทรี , ไทร)",
          "en": "1 True (คลอง), 2 False (อินทรี, ไทร)",
          "zh": "真复辅音 1 个 (คลอง)，非真复辅音 2 个 (อินทรี, ไทร)"
        },
        "icon": "🦅"
      },
      {
        "id": "opt2",
        "label": {
          "th": "ควบแท้ ๒ คำ (คลอง , ไทร) , ควบไม่แท้ ๑ คำ (อินทรี)",
          "en": "2 True, 1 False",
          "zh": "真 2 个，非真 1 个"
        },
        "icon": "🔹"
      },
      {
        "id": "opt3",
        "label": {
          "th": "ควบแท้ ๓ คำ (ครบทุกคำ) , ควบไม่แท้ ๐ คำ (ไม่มีเลย)",
          "en": "3 True, 0 False",
          "zh": "真 3 个，非真 0 个"
        },
        "icon": "🔸"
      }
    ],
    "correctOptionId": "opt1",
    "explanation": {
      "th": "คำควบแท้คือ \"คลอง\" (คล ควบกล้ำ); ส่วนคำควบไม่แท้คือ \"อินทรี\" (ทร=ซ) และ \"ไทร\" (ทร=ซ) มี ๒ คำ",
      "en": "\"คลอง\" is a True cluster; \"อินทรี\" and \"ไทร\" are False clusters (ทร pronounced as S).",
      "zh": "\"คลอง\" 为真复辅音；\"อินทรี\" 和 \"ไทร\" 中 ทร 均变音为 ซ，为非真复辅音。"
    }
  },
  {
    "id": "tp10-01",
    "grade": "P2",
    "subject": "phonics_leading_consonant",
    "skillCode": "TP10",
    "difficulty": 2,
    "question": {
      "th": "คำที่มี \"อ นำ ย\" ในภาษาไทยมีกี่คำ และได้แก่คำใดบ้าง ?",
      "en": "How many words in Thai have \"อ leading ย\" (Or Nam Yor), and what are they?",
      "zh": "泰语中 \"อ 引导 ย\" 的词共有几个，分别是哪些？"
    },
    "illustration": "👑",
    "illustrationSubtitle": {
      "th": "อย่า อยู่ อย่าง อยาก",
      "en": "4 specific words in Thai",
      "zh": "4个特定词汇"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "๔ คำ (อย่า อยู่ อย่าง อยาก ครบถ้วน)",
          "en": "3 words",
          "zh": "3个词"
        },
        "icon": "🌱"
      },
      {
        "id": "opt2",
        "label": {
          "th": "๓ คำ (ยา ยู ยาย เป็นอักษรต่ำเดี่ยว)",
          "en": "4 words (Yaa, Yoo, Yaang, Yaak)",
          "zh": "4个词 (อย่า อยู่ อย่าง อยาก)"
        },
        "icon": "👑"
      },
      {
        "id": "opt3",
        "label": {
          "th": "๕ คำ (อย่าง อยาก ยิ้ม ยืน ยาว ทั้งหมด)",
          "en": "5 words",
          "zh": "5个词"
        },
        "icon": "🌿"
      }
    ],
    "correctOptionId": "opt2",
    "explanation": {
      "th": "คำที่มี \"อ นำ ย\" ในภาษาไทยมีเพียง ๔ คำเท่านั้น ได้แก่: อย่า, อยู่, อย่าง, อยาก",
      "en": "There are exactly 4 words with \"อ leading ย\" in the entire Thai language: อย่า, อยู่, อย่าง, อยาก.",
      "zh": "泰语中 \"อ 引导 ย\" 的词只有4个：อย่า, อยู่, อย่าง, อยาก。"
    }
  },
  {
    "id": "tp10-02",
    "grade": "P3",
    "subject": "phonics_leading_consonant",
    "skillCode": "TP10",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"ขนม\" และ \"ฉลาม\" มีพยัญชนะต้นลักษณะใด ?",
      "en": "What phonological feature do the words \"ขนม\" and \"ฉลาม\" exhibit?",
      "zh": "单词 \"ขนม\" 与 \"ฉลาม\" 的声母具有什么特征？"
    },
    "illustration": "🍬",
    "illustrationSubtitle": {
      "th": "อักษรสูงนำอักษรต่ำเดี่ยว (ออกเสียง ๒ พยางค์)",
      "en": "High consonant leading low single consonant",
      "zh": "高辅音引导单低辅音"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "อักษรสูงนำอักษรต่ำเดี่ยว (ออกเสียง ๒ พยางค์)",
          "en": "True cluster",
          "zh": "真复辅音"
        },
        "icon": "🥁"
      },
      {
        "id": "opt2",
        "label": {
          "th": "อักษรควบแท้ (ออกเสียงพยัญชนะสองตัวพร้อมกัน)",
          "en": "Normal Mae Kor Kaa",
          "zh": "普通开音节"
        },
        "icon": "📘"
      },
      {
        "id": "opt3",
        "label": {
          "th": "คำในมาตราแม่ ก กา ธรรมดาไม่มีเสียงนำหรือควบ",
          "en": "High consonant leading (Kha-nom, Cha-laam)",
          "zh": "高辅音引导低辅音 (ขะ-หนม, ฉะ-หลาม)"
        },
        "icon": "🍬"
      }
    ],
    "correctOptionId": "opt3",
    "explanation": {
      "th": "คำว่า \"ขนม\" อ่านว่า ขะ-หนม และ \"ฉลาม\" อ่านว่า ฉะ-หลาม เป็นอักษรสูงนำอักษรต่ำเดี่ยว พยางค์แรกออกเสียง อะ กึ่งเสียง พยางค์หลังผันเสียงตามอักษรนำ (ออกเสียงมี ห นำ)",
      "en": "High consonants (ข, ฉ) leading low sonorant consonants produce a 2-syllable word where the second syllable adopts the high consonant tone.",
      "zh": "ขนม (ขะ-หนม) 与 ฉลาม (ฉะ-หลาม) 属于高辅音引导单低辅音，第二音节根据高辅音变调。"
    }
  },
  {
    "id": "tp10-p4-01",
    "grade": "P4",
    "subject": "phonics_leading_consonant",
    "skillCode": "TP10",
    "difficulty": 3,
    "question": {
      "th": "คำว่า \"ตลาด\" , \"จมูก\" , \"องุ่น\" , \"อร่อย\" จัดเป็นอักษรนำในลักษณะใด ?",
      "en": "What type of leading consonant structure is present in \"ตลาด\", \"จมูก\", \"องุ่น\", \"อร่อย\"?",
      "zh": "单词 \"ตลาด\"、\"จมูก\"、\"องุ่น\"、\"อร่อย\" 属于哪种类型的前导辅音？"
    },
    "illustration": "🍇",
    "illustrationSubtitle": {
      "th": "อักษรกลางนำอักษรต่ำเดี่ยว (ตะ-หลาด , จะ-หมูก , อะ-หงุ่น)",
      "en": "Middle consonant leading single low consonant",
      "zh": "中辅音引导单低辅音"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "อักษรกลางนำอักษรต่ำเดี่ยว ออกเสียง ๒ พยางค์",
          "en": "Middle consonant leading low single consonant",
          "zh": "中辅音引导单低辅音（发两音节）"
        },
        "icon": "🍇"
      },
      {
        "id": "opt2",
        "label": {
          "th": "อักษรสูงนำอักษรต่ำเดี่ยว ออกเสียง ๒ พยางค์",
          "en": "High consonant leading",
          "zh": "高辅音引导"
        },
        "icon": "🏔️"
      },
      {
        "id": "opt3",
        "label": {
          "th": "อักษรควบแท้ ออกเสียงพยัญชนะสองตัวพร้อมกัน",
          "en": "True cluster",
          "zh": "真复辅音"
        },
        "icon": "🥁"
      }
    ],
    "correctOptionId": "opt1",
    "explanation": {
      "th": "ต (ตลาด), จ (จมูก), อ (องุ่น, อร่อย) เป็นอักษรกลางนำอักษรต่ำเดี่ยว พยางค์แรกออกเสียง อะ กึ่งเสียง พยางค์หลังผันตามเสียงอักษรกลางนำ (มีเสียง ห นำ)",
      "en": "Middle-class consonants leading low sonorant consonants: ตะ-หลาด, จะ-หมูก, อะ-หงุ่น, อะ-หร่อย.",
      "zh": "ต, จ, อ 为中辅音，引导后面的单低辅音，第一音节发半音 อะ，第二音节按中辅音规则变调。"
    }
  },
  {
    "id": "tp10-p5-01",
    "grade": "P5",
    "subject": "phonics_leading_consonant",
    "skillCode": "TP5",
    "difficulty": 3,
    "question": {
      "th": "พยัญชนะตัว \"ห\" สามารถนำอักษรต่ำเดี่ยวได้กี่ตัว (เช่น หนู , หมอน , หญ้า) ?",
      "en": "How many single low consonants can \"ห\" lead (Ho Nam)?",
      "zh": "字母 \"ห\" 可以作为前导字母引导多少个单低辅音？"
    },
    "illustration": "🐭",
    "illustrationSubtitle": {
      "th": "ห นำ ง ญ น ย ร ล ว ม (๘ ตัว)",
      "en": "Ho Nam leads 8 single low consonants",
      "zh": "ห 引导 8 个单低辅音"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "๘ ตัว (ได้แก่พยัญชนะ ง ญ น ย ม ร ล ว)",
          "en": "10 consonants",
          "zh": "10 个"
        },
        "icon": "🔟"
      },
      {
        "id": "opt2",
        "label": {
          "th": "๑๐ ตัว (นับรวมอักษรต่ำเดี่ยวทั้งหมดที่มี)",
          "en": "8 consonants (Ngo, Yor, Nor, Yor, Mor, Ror, Lor, Wor)",
          "zh": "8 个辅音 (ง ญ น ย ม ร ล ว)"
        },
        "icon": "🐭"
      },
      {
        "id": "opt3",
        "label": {
          "th": "๔ ตัว (นับเฉพาะพยัญชนะ ย ร ล ว เท่านั้น)",
          "en": "4 consonants",
          "zh": "4 个"
        },
        "icon": "4️⃣"
      }
    ],
    "correctOptionId": "opt2",
    "explanation": {
      "th": "ห นำ อักษรต่ำเดี่ยวได้ ๘ ตัว ได้แก่ ง (หงาย), ญ (หญิง, หญ้า), น (หนู), ย (หยิบ), ม (หมอน), ร (หรูหรา), ล (หลาน), ว (แหวน)",
      "en": "Ho Nam (ห นำ) can lead 8 low sonorants: ง, ญ, น, ย, ม, ร, ล, ว.",
      "zh": "前导辅音 ห 可引导 8 个单低辅音：ง, ญ, น, ย, ม, ร, ล, ว。"
    }
  },
  {
    "id": "tp10-p6-01",
    "grade": "P6",
    "subject": "phonics_leading_consonant",
    "skillCode": "TP10",
    "difficulty": 3,
    "question": {
      "th": "คำในข้อใดแม้จะมีพยัญชนะต้น ๒ ตัว แต่ \"ไม่อ่านออกเสียงแบบอักษรนำ\" (ไม่ออกเสียงมี ห นำในพยางค์หลัง) ?",
      "en": "Which word has two initial consonants but is NOT pronounced as a leading consonant (no Ho Nam in 2nd syllable)?",
      "zh": "以下哪个词虽然含有双辅音，但“不按前导辅音方式发音”（第二音节无 ห 变调）？"
    },
    "illustration": "🏛️",
    "illustrationSubtitle": {
      "th": "คำสมาสหรือคำยกเว้นที่ไม่อ่านเป็นอักษรนำ",
      "en": "Non-leading pronunciation exceptions (Samaas/Indic words)",
      "zh": "非前导辅音规则特例词"
    },
    "options": [
      {
        "id": "opt1",
        "label": {
          "th": "ขนม (ขะ-หนม) และ ฉลาด (ฉะ-หลาด)",
          "en": "Kha-nom and Cha-laad (Leading)",
          "zh": "ขนม 与 ฉลาด"
        },
        "icon": "🍬"
      },
      {
        "id": "opt2",
        "label": {
          "th": "ตลาด (ตะ-หลาด) และ อร่อย (อะ-หร่อย)",
          "en": "Ta-laad and A-roy (Leading)",
          "zh": "ตลาด 与 อร่อย"
        },
        "icon": "🍇"
      },
      {
        "id": "opt3",
        "label": {
          "th": "สมาคม (สะ-มา-คม) และ สบาย (สะ-บาย)",
          "en": "Samakhom (Sa-maa-khom) and Sabaai",
          "zh": "สมาคม (สะ-มา-คม) 与 สบาย (สะ-บาย)"
        },
        "icon": "🏛️"
      }
    ],
    "correctOptionId": "opt3",
    "explanation": {
      "th": "คำว่า \"สมาคม\" อ่านว่า สะ-มา-คม (ไม่อ่าน สะ-หมา-คม) และ \"สบาย\" อ่านว่า สะ-บาย (ไม่อ่าน สะ-หบาย) เพราะเป็นคำยืมบาลี-สันสกฤตที่ไม่อ่านตามกฎอักษรนำ",
      "en": "\"สมาคม\" and \"สบาย\" are read as Sa-maa-khom and Sa-baai without tone shift because they are Indic borrowings.",
      "zh": "สมาคม 读作 สะ-มา-คม（不读 สะ-หมา-คม），สบาย 读作 สะ-บาย（不读 สะ-หบาย），属于不按前导辅音规则变调的借词。"
    }
  }
];

export const THAI_PHONICS_QUESTIONS: Question[] = [
  ...BASE_THAI_PHONICS_QUESTIONS,
  ...QUESTIONS_THAI_PHONICS_EXPANSION_3600,
];
