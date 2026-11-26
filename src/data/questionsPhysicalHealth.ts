import { Question } from '../types';

/**
 * คลังแบบทดสอบ: สุขภาวะทางกายและการเคลื่อนไหว (Physical Health) จำนวน 90 ข้อ
 * ครบ 3 ระดับชั้น (อ.1 - อ.3) ระดับความยากละ 10 ข้อ (ง่าย, ปานกลาง, ท้าทาย)
 * กระจายตำแหน่งคำตอบถูกต้อง A, B, C อย่างสมดุลเท่าเทียมกัน
 */
export const QUESTIONS_PHYSICAL_HEALTH: Question[] = [
  {
    "id": "k1-hea-e1",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "ก่อนรับประทานอาหารทุกมื้อ เด็กๆ ควรทำความสะอาดอวัยวะใดด้วยสบู่? 🧼",
      "en": "Before every meal, which body part should children wash thoroughly with soap? 🧼",
      "zh": "在享用每一顿美味的饭菜之前，小朋友们应该用洗手液仔细清洗哪一个器官？🧼"
    },
    "illustration": "🧼 🖐️ 💦",
    "illustrationSubtitle": {
      "th": "สุขอนามัย: การล้างมือก่อนทานอาหาร",
      "en": "Handwashing with soap before meals",
      "zh": "卫生习惯：饭前用洗手液洗手"
    },
    "options": [
      {
        "id": "opt-k1-hea-e1-1",
        "label": {
          "th": "ล้างมือทั้งสองข้างให้สะอาด 🖐️",
          "en": "Wash both hands clean",
          "zh": "把双手各处搓洗得干干净净 🖐️"
        },
        "icon": "🖐️"
      },
      {
        "id": "opt-k1-hea-e1-2",
        "label": {
          "th": "ล้างปลายผม",
          "en": "Wash hair ends",
          "zh": "只洗发梢末端"
        },
        "icon": "💇"
      },
      {
        "id": "opt-k1-hea-e1-3",
        "label": {
          "th": "ล้างหัวเข่า",
          "en": "Wash knees only",
          "zh": "只洗双侧膝盖"
        },
        "icon": "🦵"
      }
    ],
    "correctOptionId": "opt-k1-hea-e1-1",
    "explanation": {
      "th": "การล้างมือด้วยสบู่ช่วยขจัดเชื้อโรค ป้องกันอาการท้องเสีย เก่งมากครับ!",
      "en": "Correct! Washing hands with soap banishes germs.",
      "zh": "答对了！用肥皂把双手洗干净能预防病从口入。"
    }
  },
  {
    "id": "k1-hea-e2",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "เราควร \"แปรงฟัน\" 🪥 อย่างน้อยวันละกี่ครั้งเพื่อป้องกันฟันผุ?",
      "en": "How many times a day should we BRUSH OUR TEETH 🪥 to prevent cavities?",
      "zh": "为了拥有一口洁白健康的小牙齿、远离蛀牙，每天至少应当刷几次牙？🪥"
    },
    "illustration": "🪥 🦷 ✨",
    "illustrationSubtitle": {
      "th": "การดูแลสุขภาพฟัน: แปรงฟันอย่างน้อยวันละ 2 ครั้ง",
      "en": "Brushing teeth: At least twice a day",
      "zh": "护齿习惯：早晚至少刷牙两次"
    },
    "options": [
      {
        "id": "opt-k1-hea-e2-1",
        "label": {
          "th": "1 ครั้งต่อเดือน",
          "en": "Once a month",
          "zh": "每月只刷一次"
        },
        "icon": "📅"
      },
      {
        "id": "opt-k1-hea-e2-2",
        "label": {
          "th": "อย่างน้อย 2 ครั้ง (ตอนเช้าและก่อนนอน) 🪥",
          "en": "At least 2 times (morning & before bed)",
          "zh": "每天至少早晚两次（早晨起床与晚上睡前）🪥"
        },
        "icon": "🪥"
      },
      {
        "id": "opt-k1-hea-e2-3",
        "label": {
          "th": "ไม่ต้องแปรงเลยตลอดปี",
          "en": "Never brush all year",
          "zh": "一整年都坚决不刷牙"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k1-hea-e2-2",
    "explanation": {
      "th": "แปรงฟันตอนเช้าและก่อนนอน ช่วยให้ฟันขาวสะอาดและไม่มีกลิ่นปาก เก่งมากครับ!",
      "en": "Awesome! Brushing twice daily keeps teeth clean and healthy.",
      "zh": "太棒了！早晚认真刷牙能有效清除牙菌斑，远离龋齿。"
    }
  },
  {
    "id": "k1-hea-e3",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "อาหารชนิดใดในตัวเลือกนี้มีประโยชน์ต่อการเจริญเติบโตของร่างกาย? 🥦 🍎 🆚 🍭",
      "en": "Which wholesome food is GREAT for growing strong and healthy? 🥦 🍎 vs 🍭",
      "zh": "下列哪一种天然食物富含维生素和纤维素，对身体茁壮成长最有益？🥦 🍎 🆚 🍭"
    },
    "illustration": "🥦 🍎 🥕",
    "illustrationSubtitle": {
      "th": "อาหารที่มีประโยชน์ต่อร่างกาย",
      "en": "Nutritious foods: Fruits & vegetables",
      "zh": "健康饮食：新鲜蔬菜与水果"
    },
    "options": [
      {
        "id": "opt-k1-hea-e3-1",
        "label": {
          "th": "น้ำอัดลมซ่าสีเข้ม",
          "en": "Fizzy sugary sodas",
          "zh": "高糖碳酸饮料汽水"
        },
        "icon": "🥤"
      },
      {
        "id": "opt-k1-hea-e3-2",
        "label": {
          "th": "ลูกอมหลากสีหวานเจี๊ยบ",
          "en": "Sugary hard candies",
          "zh": "甜腻黏牙的各种硬糖果"
        },
        "icon": "🍭"
      },
      {
        "id": "opt-k1-hea-e3-3",
        "label": {
          "th": "ผักสดและผลไม้หลากสี 🥦 🍎",
          "en": "Fresh veggies and colorful fruits",
          "zh": "新鲜应季的各种蔬菜和水果 🥦 🍎"
        },
        "icon": "🥦"
      }
    ],
    "correctOptionId": "opt-k1-hea-e3-3",
    "explanation": {
      "th": "ผักและผลไม้มีวิตามินและเกลือแร่ ช่วยให้ร่างกายแข็งแรงและขับถ่ายง่าย เก่งมากครับ!",
      "en": "Spot on! Fresh vegetables and fruits build radiant vitality.",
      "zh": "答对了！多吃新鲜蔬菜水果能补充维生素，增强抵抗力。"
    }
  },
  {
    "id": "k1-hea-e4",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "เมื่อเรารู้สึก \"ง่วงนอนในเวลากลางคืน\" 😴 สิ่งที่ดีที่สุดที่ร่างกายต้องการคืออะไร?",
      "en": "When you feel sleepy at night 😴, what does your growing body need most?",
      "zh": "到了宁静的夜晚，当你揉揉眼睛感到困倦 😴 时，成长中的身体最需要什么？"
    },
    "illustration": "😴 🛌 💤",
    "illustrationSubtitle": {
      "th": "การพักผ่อนนอนหลับให้เพียงพอ",
      "en": "Adequate night sleep for health",
      "zh": "充足睡眠助力身心健康"
    },
    "options": [
      {
        "id": "opt-k1-hea-e4-1",
        "label": {
          "th": "เข้านอนพักผ่อนหลับสนิทแต่หัวค่ำ 🛌",
          "en": "Go to sleep early and rest deeply",
          "zh": "按时熄灯上床安稳睡觉，保证充沛休息 🛌"
        },
        "icon": "🛌"
      },
      {
        "id": "opt-k1-hea-e4-2",
        "label": {
          "th": "เปิดเล่นโทรศัพท์มือถือจนถึงเช้า",
          "en": "Play smartphone till dawn",
          "zh": "躲在被窝里通宵刷智能手机"
        },
        "icon": "📱"
      },
      {
        "id": "opt-k1-hea-e4-3",
        "label": {
          "th": "กระโดดโลดเต้นบนเตียงทั้งคืน",
          "en": "Jump on bed all night",
          "zh": "在床架上疯狂蹦跳一整宿"
        },
        "icon": "🏃"
      }
    ],
    "correctOptionId": "opt-k1-hea-e4-1",
    "explanation": {
      "th": "การนอนหลับ 9-10 ชั่วโมงช่วยให้สมองแจ่มใสและร่างกายเจริญเติบโต เก่งมากครับ!",
      "en": "Right! Sound sleep fuels healthy growth hormone release.",
      "zh": "答对啦！早睡早起身体好，充足睡眠促进生长发育。"
    }
  },
  {
    "id": "k1-hea-e5",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "เมื่อมีอาการ \"ไอหรือจาม\" 🤧 มารยาทและสุขอนามัยที่ถูกต้องคือข้อใด?",
      "en": "When you COUGH or SNEEZE 🤧, what is the hygienic way to cover up?",
      "zh": "当你忍不住要咳嗽或打喷嚏 🤧 时，讲文明、讲卫生的正确遮掩方法是？"
    },
    "illustration": "🤧 🧻 😷",
    "illustrationSubtitle": {
      "th": "สุขอนามัย: การปิดปากปิดจมูกเมื่อไอจาม",
      "en": "Cover mouth and nose when sneezing",
      "zh": "卫生常识：咳嗽喷嚏遮掩口鼻"
    },
    "options": [
      {
        "id": "opt-k1-hea-e5-1",
        "label": {
          "th": "จามใส่หน้าเพื่อนข้างๆ เต็มแรง",
          "en": "Sneeze directly in friend's face",
          "zh": "对着旁边同学的面颊全力猛打喷嚏"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k1-hea-e5-2",
        "label": {
          "th": "ใช้กระดาษทิชชู่หรือท่อนแขนเสื้อปิดปากและจมูก 🧻 😷",
          "en": "Use a tissue or inner elbow to cover mouth & nose",
          "zh": "用干净纸巾或手肘内侧衣袖紧紧捂住口鼻 🧻 😷"
        },
        "icon": "🧻"
      },
      {
        "id": "opt-k1-hea-e5-3",
        "label": {
          "th": "อ้าปากกว้างแล้วไอเสียงดังลั่นห้อง",
          "en": "Cough wide-open loudly",
          "zh": "张大嘴巴任由飞沫四处喷溅"
        },
        "icon": "📢"
      }
    ],
    "correctOptionId": "opt-k1-hea-e5-2",
    "explanation": {
      "th": "ปิดปากเมื่อไอจามช่วยป้องกันการแพร่กระจายของเชื้อโรคไปยังผู้อื่น เก่งมากครับ!",
      "en": "Correct! Covering sneezes stops airborne germs from spreading.",
      "zh": "答对了！用手肘衣袖或纸巾遮住口鼻，防范飞沫传染他人。"
    }
  },
  {
    "id": "k1-hea-e6",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "การดื่มเครื่องดื่มชนิดใดเป็นประจำทุกวัน ช่วยให้ \"กระดูกและฟันแข็งแรง\"? 🥛",
      "en": "Drinking which nutritious beverage daily builds STRONG BONES and TEETH? 🥛",
      "zh": "每天坚持早晚饮用哪种富含优质蛋白质与钙质的营养饮品，能让骨骼和牙齿坚固有力？🥛"
    },
    "illustration": "🥛 🦴 🦷",
    "illustrationSubtitle": {
      "th": "การดื่มนมบำรุงกระดูกและฟัน",
      "en": "Drinking plain milk daily",
      "zh": "健康饮品：鲜牛奶强健骨骼"
    },
    "options": [
      {
        "id": "opt-k1-hea-e6-1",
        "label": {
          "th": "กาแฟดำรสขม",
          "en": "Bitter black coffee",
          "zh": "成人苦味浓缩黑咖啡"
        },
        "icon": "☕"
      },
      {
        "id": "opt-k1-hea-e6-2",
        "label": {
          "th": "น้ำหวานแต่งกลิ่นสีเข้ม",
          "en": "Sugary cordial drink",
          "zh": "色素添加剂极多的浓缩糖水"
        },
        "icon": "🧃"
      },
      {
        "id": "opt-k1-hea-e6-3",
        "label": {
          "th": "นมจืดที่มีแคลเซียมสูง 🥛",
          "en": "Nutritious plain milk with calcium",
          "zh": "富含高钙质与蛋白质的纯鲜牛奶 🥛"
        },
        "icon": "🥛"
      }
    ],
    "correctOptionId": "opt-k1-hea-e6-3",
    "explanation": {
      "th": "นมสดอุดมด้วยแคลเซียมและโปรตีน ช่วยให้ตัวสูงและกระดูกแข็งแรง เก่งมากครับ!",
      "en": "Spot on! Fresh milk supplies calcium for resilient bone growth.",
      "zh": "太棒了！每天喝一杯纯牛奶，补钙助长高。"
    }
  },
  {
    "id": "k1-hea-e7",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "เมื่อขี่รถจักรยานสองล้อหรือนั่งซ้อนท้ายมอเตอร์ไซค์ 🚲 🛵 เด็กๆ ต้องสวมอุปกรณ์นิรภัยใด?",
      "en": "Riding a bicycle or motorcycle 🚲 🛵: Which protective headgear is MANDATORY?",
      "zh": "骑小自行车或者坐在家长摩托车后座 🚲 🛵 时，头上必须规范佩戴哪种安全护具？"
    },
    "illustration": "🚲 ⛑️ 🦺",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยทางถนน: สวมหมวกนิรภัย",
      "en": "Wear safety helmet when cycling",
      "zh": "交通安全防护：佩戴安全头盔"
    },
    "options": [
      {
        "id": "opt-k1-hea-e7-1",
        "label": {
          "th": "หมวกกันน็อกนิรภัย (หมวกกันกระแทก) ⛑️",
          "en": "Certified protective safety helmet",
          "zh": "标准认证的防撞防护安全头盔 ⛑️"
        },
        "icon": "⛑️"
      },
      {
        "id": "opt-k1-hea-e7-2",
        "label": {
          "th": "หมวกกระดาษพับบางๆ",
          "en": "Folded paper party hat",
          "zh": "单层薄报纸折叠的生日帽"
        },
        "icon": "🎉"
      },
      {
        "id": "opt-k1-hea-e7-3",
        "label": {
          "th": "หน้ากากแฟนซีวันฮาโลวีน",
          "en": "Halloween fancy mask",
          "zh": "万圣节塑料鬼脸面具"
        },
        "icon": "🎭"
      }
    ],
    "correctOptionId": "opt-k1-hea-e7-1",
    "explanation": {
      "th": "หมวกกันน็อกช่วยปกป้องศีรษะและสมองจากอุบัติเหตุ เก่งมากครับ!",
      "en": "Right! Helmets protect developing skulls and brains from impacts.",
      "zh": "答对啦！佩戴安全头盔能保护头部安全，预防撞击伤害。"
    }
  },
  {
    "id": "k1-hea-e8",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "ท่าทางใดต่อไปนี้ช่วยฝึก \"การทรงตัวของร่างกาย\" ได้ดีที่สุด? 🦩",
      "en": "Which physical exercise best trains your core BALANCE? 🦩",
      "zh": "下列哪一种趣味运动姿势，最能有效训练身体的核心“平衡控制协调力”？🦩"
    },
    "illustration": "🦩 🧘 🏃",
    "illustrationSubtitle": {
      "th": "การทรงตัว: ยืนขาเดียว",
      "en": "Balancing: Standing on one foot",
      "zh": "身体平衡技巧：单脚站立金鸡独立"
    },
    "options": [
      {
        "id": "opt-k1-hea-e8-1",
        "label": {
          "th": "นอนกลิ้งไปมาบนพื้นดินเปียก",
          "en": "Rolling on wet mud",
          "zh": "在湿漉漉泥巴地上来回翻滚"
        },
        "icon": "🟤"
      },
      {
        "id": "opt-k1-hea-e8-2",
        "label": {
          "th": "ยืนทรงตัวบนขาข้างเดียวเหมือนนกกระเรียน 🦩",
          "en": "Stand balanced on one leg like a flamingo",
          "zh": "像优雅的红鹤一样单脚平稳站立 🦩"
        },
        "icon": "🦩"
      },
      {
        "id": "opt-k1-hea-e8-3",
        "label": {
          "th": "นั่งเก้าอี้โยกตัวไปข้างหลังจนล้ม",
          "en": "Tipping chair backward to fall",
          "zh": "在椅子上拼命向后仰翘导致倒地摔跤"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k1-hea-e8-2",
    "explanation": {
      "th": "การยืนขาเดียวช่วยเสริมสร้างความแข็งแรงของกล้ามเนื้อขาและการทรงตัว เก่งมากครับ!",
      "en": "Awesome! One-legged balances hone vestibular stability and muscular control.",
      "zh": "太棒了！单脚站立能锻炼下肢力量和小脑平衡中枢。"
    }
  },
  {
    "id": "k1-hea-e9",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "เพื่อสุขอนามัยที่ดีและป้องกันเชื้อโรคสะสม \"เล็บมือและเล็บเท้า\" 💅 ควรดูแลอย่างไร?",
      "en": "To prevent dirt and bacteria traps, how should NAILS 💅 be maintained?",
      "zh": "为了个人卫生与健康、防止指甲缝窝藏污垢病菌，对“手指甲和脚趾甲” 💅 应当怎样护理？"
    },
    "illustration": "💅 ✂️ 🧼",
    "illustrationSubtitle": {
      "th": "การดูแลความสะอาดของเล็บ: ตัดให้สั้นเสมอ",
      "en": "Trim nails short and clean",
      "zh": "卫生习惯：定期修剪指甲"
    },
    "options": [
      {
        "id": "opt-k1-hea-e9-1",
        "label": {
          "th": "ใช้ปากกัดแทะเล็บตลอดเวลา",
          "en": "Bite nails constantly with mouth",
          "zh": "整天用牙齿用力啃咬撕扯指甲"
        },
        "icon": "🦷"
      },
      {
        "id": "opt-k1-hea-e9-2",
        "label": {
          "th": "ปล่อยให้ยาวเฟื้อยดำปี๋",
          "en": "Let them grow super long & black with dirt",
          "zh": "留得又长又尖、塞满黑色脏泥垢"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k1-hea-e9-3",
        "label": {
          "th": "ให้คุณพ่อคุณแม่ช่วยตัดให้สั้นและล้างสิ่งสกปรกออกเสมอ ✂️",
          "en": "Ask parents to trim them short and scrub clean",
          "zh": "请爸爸妈妈帮忙定期修剪短剪平整，洗净污垢 ✂️"
        },
        "icon": "✂️"
      }
    ],
    "correctOptionId": "opt-k1-hea-e9-3",
    "explanation": {
      "th": "ตัดเล็บให้สั้นช่วยให้มือสะอาด ไม่มีเชื้อโรคติดไปกับอาหาร เก่งมากครับ!",
      "en": "Correct! Short, tidy nails stop dirt and microbes from accumulating.",
      "zh": "答对了！定期剪短指甲，饭前洗手洗净，远离病从口入。"
    }
  },
  {
    "id": "k1-hea-e10",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "เมื่ออยู่ในบ้าน สิ่งใด \"ห้ามนำนิ้วมือหรือสิ่งของโลหะแหย่เข้าไปเด็ดขาด\" เพราะอันตรายจากไฟฟ้าช็อต? 🔌 ⚡",
      "en": "At home, what must you NEVER poke fingers or metal into due to electric shock danger? 🔌 ⚡",
      "zh": "在家庭室内，哪一种带电设施“绝对禁止用手指或金属铁丝掏戳”，否则会有触电致命危险？🔌 ⚡"
    },
    "illustration": "🔌 ⚡ ⚠️",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยในบ้าน: ปลั๊กไฟและเต้ารับไฟฟ้า",
      "en": "Electrical safety: Wall outlets",
      "zh": "用电安全常识：严禁触摸电插座"
    },
    "options": [
      {
        "id": "opt-k1-hea-e10-1",
        "label": {
          "th": "รูปลั๊กไฟและเต้ารับไฟฟ้าตามผนัง 🔌 ⚡",
          "en": "Wall electrical power sockets / plugs",
          "zh": "墙壁上的通电电源插座与插孔 🔌 ⚡"
        },
        "icon": "🔌"
      },
      {
        "id": "opt-k1-hea-e10-2",
        "label": {
          "th": "หมอนหนุนนอนนุ่มๆ",
          "en": "Soft bed pillow",
          "zh": "软绵绵的棉花睡眠枕头"
        },
        "icon": "🛏️"
      },
      {
        "id": "opt-k1-hea-e10-3",
        "label": {
          "th": "กล่องใส่ของเล่นพลาสติก",
          "en": "Plastic toy bin",
          "zh": "塑料玩具收纳箱"
        },
        "icon": "🧸"
      }
    ],
    "correctOptionId": "opt-k1-hea-e10-1",
    "explanation": {
      "th": "ปลั๊กไฟมีกระแสไฟฟ้าแรงสูง ห้ามสัมผัสหรือแหย่เล่นเด็ดขาด เก่งมากครับ!",
      "en": "Spot on! Wall power sockets carry dangerous electrical voltage.",
      "zh": "太棒了！电源插座有高压电，绝对不能乱碰乱摸，安全第一。"
    }
  },
  {
    "id": "k1-hea-m1",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "การนั่งดูหน้าจอโทรทัศน์หรือแท็บเล็ต 📱 เป็นเวลานานหลายชั่วโมงติดต่อกัน ส่งผลเสียต่อสิ่งใดมากที่สุด?",
      "en": "Staring at TV or tablet screens 📱 continuously for hours harms what most?",
      "zh": "一动不动连续好几个小时紧盯手机或平板屏幕 📱，对身体哪一部分造成的伤害最为严重？"
    },
    "illustration": "📱 👁️ 👓",
    "illustrationSubtitle": {
      "th": "สุขอนามัยสายตา: การจำกัดเวลาหน้าจอ",
      "en": "Screen time limit: Protect eyesight",
      "zh": "用眼健康：控制电子屏幕时间"
    },
    "options": [
      {
        "id": "opt-k1-hea-m1-1",
        "label": {
          "th": "ทำให้ผมยาวเร็วขึ้น 10 เท่า",
          "en": "Hair grows 10x faster",
          "zh": "能让头发在一夜之间飞速疯长"
        },
        "icon": "💇"
      },
      {
        "id": "opt-k1-hea-m1-2",
        "label": {
          "th": "ทำให้สายตาล้า พร่ามัว ปวดตา และส่งผลให้สายตาสั้น 👁️",
          "en": "Strains eyes, blurs vision, causes headaches, and leads to myopia",
          "zh": "造成睫状肌过度疲劳、双眼干涩酸痛，引发视力过早下降近视 👁️"
        },
        "icon": "👁️"
      },
      {
        "id": "opt-k1-hea-m1-3",
        "label": {
          "th": "ทำให้ฟันแท้งอกออกมาใหม่",
          "en": "New teeth sprout",
          "zh": "促使牙龈瞬间长出十颗崭新牙齿"
        },
        "icon": "🦷"
      }
    ],
    "correctOptionId": "opt-k1-hea-m1-2",
    "explanation": {
      "th": "ควรพักสายตาทุก 20 นาที และจำกัดเวลาหน้าจอไม่เกิน 1 ชั่วโมงต่อวัน เก่งมากครับ!",
      "en": "Correct! Excessive screen exposure causes severe digital eye fatigue.",
      "zh": "答对了！长时间盯屏幕伤眼睛，应控制时长并多向远方眺望。"
    }
  },
  {
    "id": "k1-hea-m2",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "การถือดินสอหรือสีเทียนในการเขียนและระบายสี ควรจับด้วยนิ้วมือท่าใดจึงถูกต้องและมั่นคงที่สุด? ✍️",
      "en": "Holding a pencil or crayon ✍️: Which finger grip is optimal and ergonomic?",
      "zh": "书写绘画时，正确的“三指握笔姿势（动态三脚架握法）” ✍️ 是用哪三根手指协同稳定掌控笔杆？"
    },
    "illustration": "✍️ ✏️ 🖐️",
    "illustrationSubtitle": {
      "th": "กล้ามเนื้อมัดเล็ก: การจับดินสอถูกวิธี",
      "en": "Fine motor: Dynamic tripod pencil grip",
      "zh": "精细动作发展：规范三指握笔法"
    },
    "options": [
      {
        "id": "opt-k1-hea-m2-1",
        "label": {
          "th": "ใช้ข้อศอกหนีบดินสอ",
          "en": "Clamping with elbow joint",
          "zh": "用两只手肘关节死死夹住笔尖写字"
        },
        "icon": "💪"
      },
      {
        "id": "opt-k1-hea-m2-2",
        "label": {
          "th": "กำดินสอด้วยกำปั้นทั้งมือเหมือนถือค้อนทุบ",
          "en": "Fist grip like wielding a heavy hammer",
          "zh": "五指攥紧拳头全掌死死握住笔尾当铁锤敲"
        },
        "icon": "✊"
      },
      {
        "id": "opt-k1-hea-m2-3",
        "label": {
          "th": "ใช้นิ้วหัวแม่มือ นิ้วชี้ และนิ้วกลาง ประคองจับแท่งดินสออย่างผ่อนคลาย (ท่าสามนิ้ว) ✍️",
          "en": "Thumb, index, and middle finger gently pinching the shaft (tripod grip)",
          "zh": "用大拇指与食指捏住笔杆，中指在下方托住辅助支承（三指握笔）✍️"
        },
        "icon": "✍️"
      }
    ],
    "correctOptionId": "opt-k1-hea-m2-3",
    "explanation": {
      "th": "การจับดินสอแบบสามนิ้วช่วยผ่อนคลายกล้ามเนื้อมือ เขียนได้คล่องแคล่วและไม่เมื่อย เก่งมากครับ!",
      "en": "Awesome! The tripod pencil grip enables fluid fine-motor coordination.",
      "zh": "太棒了！标准三指握笔能平稳发力，写字工整持久不手酸。"
    }
  },
  {
    "id": "k1-hea-m3",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "เมื่อวิ่งเล่นออกกำลังกายกลางแจ้งจน \"เหงื่อออกมากและรู้สึกกระหายน้ำ\" 💦 เครื่องดื่มที่ควรเลือกดื่มคือ?",
      "en": "Running and sweating outdoors under the sun 💦: What is the BEST thirst-quencher?",
      "zh": "在操场上尽情奔跑运动后满头大汗、感到口渴难耐 💦，最健康安全的补水饮品是？"
    },
    "illustration": "💦 🚰 🏃",
    "illustrationSubtitle": {
      "th": "การดื่มน้ำสะอาดชดเชยเหงื่อ",
      "en": "Hydration: Clean drinking water",
      "zh": "运动补水：清澈卫生的温开水"
    },
    "options": [
      {
        "id": "opt-k1-hea-m3-1",
        "label": {
          "th": "น้ำเปล่าสะอาดที่สะอาดบริสุทธิ์ 🚰",
          "en": "Fresh, clean, pure drinking water",
          "zh": "洁净卫生、温热适口的纯净白开水 🚰"
        },
        "icon": "🚰"
      },
      {
        "id": "opt-k1-hea-m3-2",
        "label": {
          "th": "น้ำอัดลมใส่น้ำแข็งหวานจัด",
          "en": "Icy sugary soda",
          "zh": "含糖极高的冰冻冒泡碳酸可乐"
        },
        "icon": "🥤"
      },
      {
        "id": "opt-k1-hea-m3-3",
        "label": {
          "th": "น้ำเชื่อมข้นๆ ไม่ผสมน้ำ",
          "en": "Pure sugar syrup",
          "zh": "未经稀释的纯甜水果糖浆"
        },
        "icon": "🍯"
      }
    ],
    "correctOptionId": "opt-k1-hea-m3-1",
    "explanation": {
      "th": "น้ำเปล่าสะอาดช่วยชดเชยน้ำที่สูญเสียไปทางเหงื่อได้ดีที่สุด เก่งมากครับ!",
      "en": "Spot on! Pure drinking water replenishes lost fluids and rehydrates cells.",
      "zh": "答对了！白开水是身体运动后最天然、最无负担的优良补水之源。"
    }
  },
  {
    "id": "k1-hea-m4",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "การเดินข้ามถนนอย่างปลอดภัยที่สุด 🚸 ควรข้ามที่ใดเมื่อมีผู้ปกครองหรือครูจูงมือ?",
      "en": "Crossing a busy city street safely 🚸 with parents: Where is the CORRECT place to cross?",
      "zh": "在家长或老师牵手带领下穿越马路 🚸 时，必须选择在什么规范安全的交通标志设施上通行？"
    },
    "illustration": "🚸 🦓 🚦",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยทางถนน: ทางม้าลายและสะพานลอย",
      "en": "Pedestrian safety: Zebra crosswalk",
      "zh": "交通安全规则：走斑马线或天桥"
    },
    "options": [
      {
        "id": "opt-k1-hea-m4-1",
        "label": {
          "th": "วิ่งตัดหน้ารถยนต์ที่กำลังแล่นมาเร็วๆ",
          "en": "Darting right in front of speeding cars",
          "zh": "迎着飞驰而来的汽车强行横冲直撞"
        },
        "icon": "🚗"
      },
      {
        "id": "opt-k1-hea-m4-2",
        "label": {
          "th": "ทางม้าลายที่มีสัญญาณไฟคนข้าม หรือเดินบนสะพานลอยคนข้าม 🦓 🚦",
          "en": "Zebra crosswalk with pedestrian lights, or overpass footbridge",
          "zh": "清晰划设的斑马线（人行横道）或立体过街人行天桥 🦓 🚦"
        },
        "icon": "🦓"
      },
      {
        "id": "opt-k1-hea-m4-3",
        "label": {
          "th": "มุดใต้ท้องรถบรรทุกที่จอดติดไฟแดง",
          "en": "Crawling under giant trucks",
          "zh": "从正在等红灯的泥头大卡车车底钻过"
        },
        "icon": "🚚"
      }
    ],
    "correctOptionId": "opt-k1-hea-m4-2",
    "explanation": {
      "th": "ข้ามทางม้าลายและสะพานลอยช่วยลดอุบัติเหตุ และปลอดภัยที่สุด เก่งมากครับ!",
      "en": "Right! Zebra crossings and pedestrian footbridges ensure safe passage.",
      "zh": "答对啦！遵守交规走斑马线或过街天桥，确保出行平平安安。"
    }
  },
  {
    "id": "k1-hea-m5",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการใช้กรรไกรตัดกระดาษ ✂️ เพื่อความปลอดภัยสูงสุด ควรปฏิบัติตามข้อใด?",
      "en": "Using scissors safely in craft class ✂️: What safety rule MUST you follow?",
      "zh": "在手工课上使用少儿专用安全小剪刀 ✂️ 剪纸时，必须严守的绝对安全守则是？"
    },
    "illustration": "✂️ 📄 🖐️",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยในการใช้อุปกรณ์: กรรไกรตัดกระดาษ",
      "en": "Scissor safety rules for kids",
      "zh": "手工安全常识：安全用剪刀"
    },
    "options": [
      {
        "id": "opt-k1-hea-m5-1",
        "label": {
          "th": "เอากรรไกรไปตัดสายไฟในบ้านเล่น",
          "en": "Cut household power cords for fun",
          "zh": "用剪刀用力去剪插在插座上的通电电线"
        },
        "icon": "🔌"
      },
      {
        "id": "opt-k1-hea-m5-2",
        "label": {
          "th": "ถือกรรไกรวิ่งไล่จี้เพื่อนรอบห้อง",
          "en": "Run chasing friends brandishing blades",
          "zh": "手握锋利剪刀在教室里开怀狂奔追逐同伴"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k1-hea-m5-3",
        "label": {
          "th": "ใช้กรรไกรปลายมน หันปลายแหลมออกจากตัว และไม่วิ่งเล่นขณะถือกรรไกร ✂️",
          "en": "Use rounded safety tips, point blades away from self, and NEVER run with scissors",
          "zh": "使用圆头安全剪刀，刀尖向外，绝对禁止拿着剪刀四处奔跑打闹 ✂️"
        },
        "icon": "✂️"
      }
    ],
    "correctOptionId": "opt-k1-hea-m5-3",
    "explanation": {
      "th": "ใช้กรรไกรด้วยความระมัดระวัง มีสมาธิ และเก็บเข้าที่หลังใช้งาน เก่งมากครับ!",
      "en": "Correct! Mindful cutting and rounded blades prevent unfortunate accidents.",
      "zh": "答对了！专注用剪刀，刀口朝外不奔跑，用毕妥善收纳。"
    }
  },
  {
    "id": "k1-hea-m6",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "การนั่งรับประทานอาหารหรือนั่งเรียนหนังสือ ท่าทางหลังตรง (Good Posture) 🪑 มีประโยชน์อย่างไร?",
      "en": "Sitting upright with straight back (GOOD POSTURE) 🪑 benefits your body how?",
      "zh": "在书桌前学习写字或餐桌前就餐时，保持“抬头挺胸背部直挺的良好坐姿” 🪑 对健康有何益处？"
    },
    "illustration": "🪑 🧍 🦴",
    "illustrationSubtitle": {
      "th": "บุคลิกภาพและการทรงตัว: การนั่งหลังตรง",
      "en": "Good posture supports spine",
      "zh": "体态塑造：抬头挺胸脊椎健康"
    },
    "options": [
      {
        "id": "opt-k1-hea-m6-1",
        "label": {
          "th": "ช่วยให้กระดูกสันหลังยืดตรงสวยงาม ไม่คดงอ และหายใจได้โล่งเต็มปอด 🦴",
          "en": "Aligns spine naturally, prevents hunchback, and facilitates deep breathing",
          "zh": "促进脊椎骨骼健康笔直发育，预防驼背脊柱侧弯，呼吸通畅 🦴"
        },
        "icon": "🦴"
      },
      {
        "id": "opt-k1-hea-m6-2",
        "label": {
          "th": "ทำให้ง่วงนอนหลับคางเกยโต๊ะทันที",
          "en": "Makes you collapse asleep on desk",
          "zh": "让人脑袋发沉瞬间趴在桌上沉睡"
        },
        "icon": "😴"
      },
      {
        "id": "opt-k1-hea-m6-3",
        "label": {
          "th": "ทำให้เก้าอี้หักพังทลายลงมา",
          "en": "Breaks chair into splinters",
          "zh": "把屁股底下结实的实木椅子当场坐断"
        },
        "icon": "🪑"
      }
    ],
    "correctOptionId": "opt-k1-hea-m6-1",
    "explanation": {
      "th": "การนั่งหลังตรงช่วยพัฒนาบุคลิกภาพที่ดีและปกป้องแนวกระดูกสันหลัง เก่งมากครับ!",
      "en": "Awesome! Upright ergonomics nurture spine alignment and lung expansion.",
      "zh": "太棒了！坐姿端正能保护骨骼生理弯曲，展现少年昂扬风采。"
    }
  },
  {
    "id": "k1-hea-m7",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "สิ่งของแปลกปลอม เช่น เมล็ดผลไม้ ลูกปัด หรือของเล่นชิ้นเล็ก 🍒 🟤 \"ห้ามนำไปยัดใส่ในอวัยวะใดเด็ดขาด\"?",
      "en": "Small beads, fruit seeds, or toy parts 🍒 🟤: What body cavities must they NEVER be shoved into?",
      "zh": "西瓜籽、玩具小塑料圆珠或小纽扣 🍒 🟤，“绝对禁止塞入身体的哪类腔孔器官”，以免发生窒息堵塞？"
    },
    "illustration": "🍒 👃 👂",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยของร่างกาย: ป้องกันสิ่งแปลกปลอมอุดตัน",
      "en": "Never insert objects into nose/ears",
      "zh": "幼儿安全自护：严禁异物塞入耳鼻"
    },
    "options": [
      {
        "id": "opt-k1-hea-m7-1",
        "label": {
          "th": "ฝ่ามือที่เปิดกว้าง",
          "en": "Open palms",
          "zh": "平展的宽大手掌心中"
        },
        "icon": "🖐️"
      },
      {
        "id": "opt-k1-hea-m7-2",
        "label": {
          "th": "รูจมูก รูหู และช่องปาก 👃 👂 👄",
          "en": "Nose nostrils, ear canals, and mouth throat",
          "zh": "鼻孔、耳道及含在嘴巴深处 👃 👂 👄"
        },
        "icon": "👃"
      },
      {
        "id": "opt-k1-hea-m7-3",
        "label": {
          "th": "พื้นดินสนามหญ้า",
          "en": "Lawn soil ground",
          "zh": "幼儿园室外的开阔草坪上"
        },
        "icon": "🌱"
      }
    ],
    "correctOptionId": "opt-k1-hea-m7-2",
    "explanation": {
      "th": "สิ่งแปลกปลอมในรูจมูกหรือหลอดลมอาจอุดกั้นทางเดินหายใจจนเป็นอันตรายถึงชีวิต เก่งมากครับ!",
      "en": "Spot on! Inserting foreign objects risks severe airway choking and ear injury.",
      "zh": "太棒了！异物卡入呼吸道会导致剧烈呛咳和窒息，极其危险！"
    }
  },
  {
    "id": "k1-hea-m8",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "เมื่อเราออกไปเล่นที่สวนสาธารณะ แล้วมี \"สุนัขหรือสัตว์แปลกหน้าท่าทางดุร้าย\" 🐕 เดินเข้ามาใกล้ ควรปฏิบัติตนอย่างไร?",
      "en": "In a park, a strange growling aggressive dog 🐕 approaches. How should you react safely?",
      "zh": "在小区花园游玩时，如果有一只“眼神凶狠、低吼狂吠的无主陌生烈犬” 🐕 逼近，最保命的安全自护做法是？"
    },
    "illustration": "🐕 🧍 ⚠️",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยจากสัตว์เลี้ยงและสัตว์จรจัด",
      "en": "Safety around aggressive animals",
      "zh": "防范恶犬伤人：保持冷静站立"
    },
    "options": [
      {
        "id": "opt-k1-hea-m8-1",
        "label": {
          "th": "เอาก้อนหินหรือไม้ไปแหย่ตีหัวสุนัข",
          "en": "Poke and hit the dog with heavy sticks",
          "zh": "拿起枯树枝和泥块大力扔过去击打恶犬头部"
        },
        "icon": "🪵"
      },
      {
        "id": "opt-k1-hea-m8-2",
        "label": {
          "th": "หันหลังแล้ววิ่งหนีสุดแรงเกิดพร้อมกรีดร้อง",
          "en": "Turn around and sprint away screaming loudly",
          "zh": "吓得转身狂奔飞逃，一路扯开嗓门凄厉高声尖叫"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k1-hea-m8-3",
        "label": {
          "th": "ยืนนิ่งๆ ไม่ส่งเสียงกรีดร้อง ไม่จ้องตามัน และค่อยๆ เดินถอยหลังช้าๆ หาผู้ปกครอง 🧍",
          "en": "Stand still like a tree, don't scream or stare, and calmly step back toward adults",
          "zh": "像树木一样安静站立不奔跑，不直视犬眼，不大声尖叫，缓慢退向家长 🧍"
        },
        "icon": "🧍"
      }
    ],
    "correctOptionId": "opt-k1-hea-m8-3",
    "explanation": {
      "th": "การวิ่งหนีจะกระตุ้นสัญชาตญาณนักล่าของสุนัขให้วิ่งไล่กวด ควรรักษาความสงบและให้ผู้ใหญ่ช่วย เก่งมากครับ!",
      "en": "Correct! Standing still like a tree diffuses predatory pursuit triggers.",
      "zh": "答对了！保持冷静如树木，不奔跑尖叫，避免激发动物扑咬猎犬本能。"
    }
  },
  {
    "id": "k1-hea-m9",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "การรับประทานอาหารที่มีประโยชน์ตามหลัก \"ธงโภชนาการ 5 หมู่\" ช่วยให้ร่างกายได้สิ่งใด?",
      "en": "Eating a balanced diet across ALL 5 ESSENTIAL FOOD GROUPS fuels your body with what?",
      "zh": "日常饮食均衡摄取蛋白质、碳水化合物、维生素、矿物质及健康油脂“五大营养素”，会带给身体？"
    },
    "illustration": "🥗 🍲 🍎",
    "illustrationSubtitle": {
      "th": "อาหารหลัก 5 หมู่และโภชนาการที่สมดุล",
      "en": "Balanced nutrition across 5 food groups",
      "zh": "均衡膳食五大类营养全面吸收"
    },
    "options": [
      {
        "id": "opt-k1-hea-m9-1",
        "label": {
          "th": "ได้พลังงาน สารอาหารครบถ้วน ร่างกายแข็งแรง มีภูมิต้านทานโรค 🥗 🍲",
          "en": "Comprehensive nutrients, abundant vitality, strong immunity, and robust growth",
          "zh": "获得充沛的日常活动能量、全方位的生理养分，免疫力强不生病 🥗 🍲"
        },
        "icon": "🥗"
      },
      {
        "id": "opt-k1-hea-m9-2",
        "label": {
          "th": "ทำให้ตัวหดเล็กลงเหมือนมด",
          "en": "Shrinks body to size of an ant",
          "zh": "让整个人的身体急速萎缩退化成小蚂蚁"
        },
        "icon": "🐜"
      },
      {
        "id": "opt-k1-hea-m9-3",
        "label": {
          "th": "ทำให้ผิวหนังเปลี่ยนเป็นเปลือกหอย",
          "en": "Skin hardens to seashells",
          "zh": "使全身皮肤迅速钙化长出坚硬贝壳"
        },
        "icon": "🐚"
      }
    ],
    "correctOptionId": "opt-k1-hea-m9-1",
    "explanation": {
      "th": "อาหารครบ 5 หมู่เสริมสร้างเซลล์ อวัยวะ และภูมิต้านทานให้สมบูรณ์ เก่งมากครับ!",
      "en": "Awesome! Wholesome balanced nutrition powers immune resilience and holistic growth.",
      "zh": "太棒了！均衡营养是身体生长发育、抵御疾病侵害的最坚实堡垒。"
    }
  },
  {
    "id": "k1-hea-m10",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "ในวันที่มี \"แสงแดดแรงจัดตอนเที่ยงวัน\" ☀️ หากจำเป็นต้องออกไปข้างนอก ควรเตรียมสิ่งใดเพื่อป้องกันผิวหนังและดวงตา?",
      "en": "Stepping outdoors under scorching MIDDAY SUN ☀️: What gear shields your skin and eyes?",
      "zh": "在盛夏“紫外线强烈爆表的中午烈日” ☀️ 下必须外出时，应当备好哪些防晒防护用品？"
    },
    "illustration": "☀️ 🧢 🕶️",
    "illustrationSubtitle": {
      "th": "การป้องกันแสงแดดและรังสี UV",
      "en": "Sun protection: Hat & sunscreen",
      "zh": "防晒防护常识：遮阳帽与防晒霜"
    },
    "options": [
      {
        "id": "opt-k1-hea-m10-1",
        "label": {
          "th": "สวมเสื้อโค้ตขนแกะหนาเตอะ 3 ชั้น",
          "en": "Wear 3 heavy wool winter parkas",
          "zh": "一口气套上三件厚重不透气的高级羊皮防寒大衣"
        },
        "icon": "🧥"
      },
      {
        "id": "opt-k1-hea-m10-2",
        "label": {
          "th": "สวมหมวกปีกกว้าง กางร่มกันแดด ทาครีมกันแดด และสวมแว่นตากันแดด 🧢 🕶️ ⛱️",
          "en": "Wear wide-brim hat, carry umbrella, apply sunscreen, and wear UV sunglasses",
          "zh": "戴上宽边遮阳帽、撑起防紫外线遮阳伞、涂抹防晒霜并佩戴墨镜 🧢 🕶️ ⛱️"
        },
        "icon": "🧢"
      },
      {
        "id": "opt-k1-hea-m10-3",
        "label": {
          "th": "ถือไฟฉายเปิดส่องแข่งกับดวงอาทิตย์",
          "en": "Shine flashlight into blazing sun",
          "zh": "手里紧握手电筒拼命朝大太阳对射"
        },
        "icon": "🔦"
      }
    ],
    "correctOptionId": "opt-k1-hea-m10-2",
    "explanation": {
      "th": "การปกป้องร่างกายจากแดดจัด ช่วยป้องกันอาการลมแดด (Heatstroke) และผิวหนังไหม้ เก่งมากครับ!",
      "en": "Spot on! Hats, UV sunglasses, and sunscreen shield delicate skin from sunburns.",
      "zh": "答对了！做好遮阳防晒措施，谨防晒伤与户外中暑脱水。"
    }
  },
  {
    "id": "k1-hea-h1",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "เมื่อเพื่อนหกล้มจน \"หัวเข่าถลอกมีเลือดออกเล็กน้อย\" 🩹 ขั้นตอนแรกในการปฐมพยาบาลเบื้องต้นคือข้อใด?",
      "en": "Friend trips and gets a scraped bleeding knee 🩹. What is the FIRST AID initial step?",
      "zh": "小伙伴在操场上不慎跌倒，“膝盖擦破皮流出少许鲜血” 🩹，科学的第一步应急初步护理是？"
    },
    "illustration": "🩹 💧 🧼",
    "illustrationSubtitle": {
      "th": "การปฐมพยาบาลเบื้องต้น: แผลถลอก",
      "en": "First aid: Clean wound with water",
      "zh": "急救小常识：清水冲洗伤口污物"
    },
    "options": [
      {
        "id": "opt-k1-hea-h1-1",
        "label": {
          "th": "ให้เพื่อนเอาน้ำลายป้ายแผล",
          "en": "Spit on wound",
          "zh": "让旁边同学往流血伤口上吐唾沫消毒"
        },
        "icon": "💦"
      },
      {
        "id": "opt-k1-hea-h1-2",
        "label": {
          "th": "เอาดินโคลนข้างทางมาพอกแผลให้มิด",
          "en": "Smear roadside mud on open wound",
          "zh": "随手从花坛抓一把黑脏泥巴重重糊在流血伤口上"
        },
        "icon": "🟤"
      },
      {
        "id": "opt-k1-hea-h1-3",
        "label": {
          "th": "ล้างบาดแผลด้วยน้ำสะอาดหรือน้ำเกลือล้างแผลเพื่อขจัดสิ่งสกปรก แล้วบอกครูหรือผู้ใหญ่ 💧 🩹",
          "en": "Rinse wound clean with running water or saline to clear dirt, then notify an adult",
          "zh": "立刻用流动温清水或生理盐水轻柔冲洗掉创口泥沙，并迅速报告老师 💧 🩹"
        },
        "icon": "🩹"
      }
    ],
    "correctOptionId": "opt-k1-hea-h1-3",
    "explanation": {
      "th": "การล้างสิ่งสกปรกออกทันทีช่วยป้องกันแผลติดเชื้อ จากนั้นใส่ยาและปิดพลาสเตอร์ เก่งมากครับ!",
      "en": "Correct! Cleansing minor abrasions with clean water prevents bacterial infections.",
      "zh": "答对了！首要任务是用清水或生理盐水洗净伤口泥垢，防范细菌感染。"
    }
  },
  {
    "id": "k1-hea-h2",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "ยาประจำบ้านที่มีฉลากยา 💊 เด็กๆ สามารถหยิบมารับประทานเองตามใจชอบได้หรือไม่ เพราะเหตุใด?",
      "en": "Can children take MEDICINES 💊 by themselves whenever they wish? Why or why not?",
      "zh": "家里药箱里红红绿绿的药片、止咳糖浆 💊，小朋友可以自己擅自拿来当零食吃吗？为什么？"
    },
    "illustration": "💊 ⚠️ 👨‍⚕️",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยในการใช้ยา",
      "en": "Medicine safety: Adults must supervise",
      "zh": "用药安全常识：须在成人严格指导下服用"
    },
    "options": [
      {
        "id": "opt-k1-hea-h2-1",
        "label": {
          "th": "ไม่ได้เด็ดขาด ต้องให้คุณหมอสั่ง และมีผู้ปกครองหรือครูเป็นผู้ดูแลป้อนยาให้เท่านั้น 💊 👨‍⚕️",
          "en": "NEVER! Medicines must only be administered by parents, nurses, or doctors safely",
          "zh": "绝对不可以！药品不是糖果，必须严格遵医嘱并在家长或校医看管监护下服用 💊 👨‍⚕️"
        },
        "icon": "💊"
      },
      {
        "id": "opt-k1-hea-h2-2",
        "label": {
          "th": "กินได้ตามใจชอบเพราะรสชาติเหมือนขนมหวาน",
          "en": "Eat freely like yummy candy",
          "zh": "完全可以大把随便吃，因为甜甜的像草莓软糖"
        },
        "icon": "🍬"
      },
      {
        "id": "opt-k1-hea-h2-3",
        "label": {
          "th": "นำไปละลายน้ำสาดใส่กันเล่น",
          "en": "Dissolve in water gun fights",
          "zh": "倒进大水枪里互相喷射射击着玩"
        },
        "icon": "🔫"
      }
    ],
    "correctOptionId": "opt-k1-hea-h2-1",
    "explanation": {
      "th": "การกินยาผิดชนิดหรือเกินขนาดเป็นอันตรายร้ายแรงต่อชีวิต ต้องให้ผู้ใหญ่ดูแลเสมอ เก่งมากครับ!",
      "en": "Awesome! Medicine dosages are strictly clinical and dangerous if misused.",
      "zh": "太棒了！药物滥用会危害生命器官，唯有成年监护人才能协助服药。"
    }
  },
  {
    "id": "k1-hea-h3",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "เมื่อโดยสาร \"รถยนต์ส่วนบุคคลหรือรถตู้โรงเรียน\" 🚗 สิ่งที่เด็กทุกคนต้องปฏิบัติทันทีที่นั่งประจำที่คือข้อใด?",
      "en": "Riding inside a family car or school van 🚗: What is the FIRST essential safety habit?",
      "zh": "每次坐进私家轿车或幼儿园校车 🚗 坐席后，第一件必须立刻自觉完成的安全动作是？"
    },
    "illustration": "🚗 🔒 🦺",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยในยานพาหนะ: รัดเข็มขัดนิรภัย",
      "en": "Vehicle safety: Fasten seatbelt immediately",
      "zh": "乘车安全习惯：坐稳立刻系好安全带"
    },
    "options": [
      {
        "id": "opt-k1-hea-h3-1",
        "label": {
          "th": "เปิดประตูรถเล่นขณะที่รถกำลังแล่นเร็ว",
          "en": "Swing car doors wide open at high speed",
          "zh": "在车辆高速飞驰时好奇地伸手去扳动拉开车门"
        },
        "icon": "🚪"
      },
      {
        "id": "opt-k1-hea-h3-2",
        "label": {
          "th": "คาด \"เข็มขัดนิรภัย\" (Seatbelt) ให้กระชับล็อกแน่นเรียบร้อย 🔒 🚗",
          "en": "Fasten and click your SAFETY SEATBELT snugly",
          "zh": "双手拉开“车用安全带（Seatbelt）”，咔哒一声牢牢扣紧锁止 🔒 🚗"
        },
        "icon": "🔒"
      },
      {
        "id": "opt-k1-hea-h3-3",
        "label": {
          "th": "ปีนป่ายขึ้นไปยืนบนเบาะหน้ารถ",
          "en": "Climb standing on dashboard seat",
          "zh": "在副驾驶座位上上蹿下跳站立玩耍"
        },
        "icon": "🏃"
      }
    ],
    "correctOptionId": "opt-k1-hea-h3-2",
    "explanation": {
      "th": "เข็มขัดนิรภัยช่วยรั้งร่างกายไม่ให้พุ่งไปข้างหน้าเมื่อเกิดการเบรกกะทันหัน เก่งมากครับ!",
      "en": "Spot on! Seatbelts provide critical restraint during abrupt deceleration.",
      "zh": "答对了！安全带是生命的守护带，上车坐定必须规范系好安全带。"
    }
  },
  {
    "id": "k1-hea-h4",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "เมื่ออยู่ในน้ำหรือสระว่ายน้ำ 🏊 กฎความปลอดภัยที่สำคัญที่สุดของเด็กคือข้อใด?",
      "en": "Swimming in a pool or beach water 🏊: What is the NUMBER ONE life-saving rule?",
      "zh": "在幼儿园泳池戏水或去海边游泳 🏊 时，小朋友必须牢记在心的第一保命铁律是？"
    },
    "illustration": "🏊 🛟 👨‍🏫",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยทางน้ำ: มีผู้ใหญ่ดูแลใกล้ชิดและสวมชูชีพ",
      "en": "Water safety: Adult supervision & life jackets",
      "zh": "防溺水安全守则：时刻须有监护人近距离陪同"
    },
    "options": [
      {
        "id": "opt-k1-hea-h4-1",
        "label": {
          "th": "แกล้งกดหัวเพื่อนให้มิดน้ำเพื่อความสะใจ",
          "en": "Dunk friends' heads underwater for fun",
          "zh": "嬉笑打闹时用全身力气把小伙伴的头死死按入水中"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k1-hea-h4-2",
        "label": {
          "th": "แอบกระโดดลงสระน้ำลึกคนเดียวตอนไม่มีคนมอง",
          "en": "Sneak jump into deep pool alone silently",
          "zh": "趁着四下无人，偷偷摸摸纵身跳进两米深水区"
        },
        "icon": "🏊"
      },
      {
        "id": "opt-k1-hea-h4-3",
        "label": {
          "th": "ต้องมีผู้ปกครองหรือครูผู้เชี่ยวชาญดูแลอย่างใกล้ชิดเสมอ และสวมเสื้อชูชีพหากยังว่ายน้ำไม่แข็ง 🛟 🏊",
          "en": "ALWAYS have adult supervision within arm's reach, and wear an approved life vest",
          "zh": "必须时刻有家长或专业教练寸步不离在身旁看护，穿戴合格救生浮具 🛟 🏊"
        },
        "icon": "🛟"
      }
    ],
    "correctOptionId": "opt-k1-hea-h4-3",
    "explanation": {
      "th": "ห้ามเล่นน้ำตามลำพังเด็ดขาด เพื่อป้องกันอุบัติเหตุการจมน้ำ เก่งมากครับ!",
      "en": "Correct! Constant adult vigilance and flotation devices prevent drowning disasters.",
      "zh": "答对啦！严禁私自下水游泳，时刻在监护人视线内活动，远离溺水危险。"
    }
  },
  {
    "id": "k1-hea-h5",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "การออกกำลังกายเป็นประจำอย่างสม่ำเสมอ เช่น การวิ่ง กระโดดเชือก หรือเตะฟุตบอล ⚽ ส่งผลดีต่อหัวใจและปอดอย่างไร?",
      "en": "Regular aerobic play like running, skipping, or soccer ⚽ empowers your HEART and LUNGS how?",
      "zh": "坚持每周参加慢跑、跳绳、拍球或踢足球 ⚽ 等有氧运动，对我们的“心脏和肺部”有何深远好处？"
    },
    "illustration": "⚽ 🏃 🫀",
    "illustrationSubtitle": {
      "th": "การออกกำลังกายเสริมสร้างสมรรถภาพหัวใจและปอด",
      "en": "Cardiovascular fitness strengthens heart & lungs",
      "zh": "有氧运动强健心肺功能与耐力"
    },
    "options": [
      {
        "id": "opt-k1-hea-h5-1",
        "label": {
          "th": "ทำให้กล้ามเนื้อหัวใจสูบฉีดเลือดได้แข็งแรงขึ้น และปอดสามารถรับก๊าซออกซิเจนได้เต็มที่ 🫀 🫁",
          "en": "Strengthens cardiac pumping efficiency and increases lung oxygen capacity",
          "zh": "极大地锻炼心肌收缩力量、扩大肺活量，使心肺血液循环充满澎湃动力 🫀 🫁"
        },
        "icon": "🫀"
      },
      {
        "id": "opt-k1-hea-h5-2",
        "label": {
          "th": "ทำให้หัวใจหยุดเต้นไปตลอดกาล",
          "en": "Makes heart stop forever",
          "zh": "让心脏彻底停止跳动"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k1-hea-h5-3",
        "label": {
          "th": "ทำให้ปอดกลายเป็นน้ำแข็ง",
          "en": "Freezes lungs solid",
          "zh": "使双肺冻结成一团冰块"
        },
        "icon": "❄️"
      }
    ],
    "correctOptionId": "opt-k1-hea-h5-1",
    "explanation": {
      "th": "การออกกำลังกายช่วยให้ระบบไหลเวียนโลหิตแข็งแรง ร่างกายสดชื่นกระปรี้กระเปร่า เก่งมากครับ!",
      "en": "Awesome! Aerobic exercise strengthens myocardium and respiratory stamina.",
      "zh": "太棒了！经常运动能强化心肌收缩力，增大肺活量，身体棒棒少生病。"
    }
  },
  {
    "id": "k1-hea-h6",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "เมื่อเกิดเหตุฉุกเฉินไฟไหม้ในอาคารและมีควันหนาทึบ 🔥 🌫️ วิธีการเคลื่อนที่เอาชีวิตรอดที่ถูกต้องคือข้อใด?",
      "en": "In building fire emergencies with dense toxic smoke 🔥 🌫️: What evacuation posture is correct?",
      "zh": "在火灾疏散演练中，当走廊弥漫着刺鼻的滚滚浓烟 🔥 🌫️ 时，唯一科学逃生的身体姿态是？"
    },
    "illustration": "🔥 🌫️ 🏃",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยจากอัคคีภัย: ก้มต่ำหนีควันไฟ",
      "en": "Fire escape: Crawl low under smoke",
      "zh": "火场逃生自救：湿毛巾捂口鼻弯腰低姿前行"
    },
    "options": [
      {
        "id": "opt-k1-hea-h6-1",
        "label": {
          "th": "ยืนชูมือกระโดดร้องเพลงท่ามกลางกลุ่มควันดำ",
          "en": "Stand jumping and singing in thick smoke",
          "zh": "高举双手在滚滚黑烟最浓处大跳芭蕾舞欢唱"
        },
        "icon": "💃"
      },
      {
        "id": "opt-k1-hea-h6-2",
        "label": {
          "th": "ใช้ผ้าชุบน้ำปิดปากและจมูก แล้วก้มตัวต่ำหรือคลานราบไปกับพื้นเพื่อสูดอากาศบริสุทธิ์หนีออกทางหนีไฟ 🌫️ 🏃",
          "en": "Cover mouth/nose with damp cloth, bend low or crawl along floor beneath rising smoke",
          "zh": "用浸湿的毛巾捂紧口鼻，迅速压低身姿贴地匍匐前进，朝安全出口撤离 🌫️ 🏃"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k1-hea-h6-3",
        "label": {
          "th": "วิ่งเข้าไปหลบซ่อนตัวในตู้เสื้อผ้าปิดประตูแน่น",
          "en": "Hide inside wooden closet locking doors",
          "zh": "惊慌失措地钻进木制大衣柜里把门从内死死反锁"
        },
        "icon": "🚪"
      }
    ],
    "correctOptionId": "opt-k1-hea-h6-2",
    "explanation": {
      "th": "ควันไฟร้อนและลอยตัวขึ้นสู่ที่สูง ด้านล่างใกล้พื้นดินจะมีออกซิเจนมากที่สุด เก่งมากครับ!",
      "en": "Spot on! Toxic heated smoke rises; the cleanest breathable air is close to the floor.",
      "zh": "答对了！烟雾上浮，贴近地面的空气相对清新含氧，低姿爬行能挽救生命。"
    }
  },
  {
    "id": "k1-hea-h7",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "การรับประทานอาหารรส \"หวานจัด เค็มจัด หรือมันเยิ้มจัด\" เป็นประจำทุกวัน ส่งผลเสียระยะยาวต่อสุขภาพอย่างไร? 🍟 🍩",
      "en": "Consuming foods extremely HIGH IN SUGAR, SALT, or GREASE daily 🍟 🍩 leads to what long-term harm?",
      "zh": "长期偏食、每天大量贪吃“高糖、高盐、重度油炸油腻”的垃圾食品 🍟 🍩，对体质有什么严重负面危害？"
    },
    "illustration": "🍟 🍩 ⚠️",
    "illustrationSubtitle": {
      "th": "ผลเสียของอาหารรสหวาน มัน เค็ม",
      "en": "Risks of junk food: Obesity & tooth decay",
      "zh": "垃圾食品危害：导致肥胖与慢性健康隐患"
    },
    "options": [
      {
        "id": "opt-k1-hea-h7-1",
        "label": {
          "th": "ทำให้กลายเป็นมนุษย์ล่องหน",
          "en": "Turns you invisible",
          "zh": "身体瞬间透明变成隐形超人"
        },
        "icon": "✨"
      },
      {
        "id": "opt-k1-hea-h7-2",
        "label": {
          "th": "ทำให้บินได้สูงเหนือท้องฟ้า",
          "en": "Grants superpower to fly",
          "zh": "身体获得神秘超能力，能在空中翱翔"
        },
        "icon": "🪽"
      },
      {
        "id": "opt-k1-hea-h7-3",
        "label": {
          "th": "ทำให้เสี่ยงต่อภาวะโรคอ้วน ฟันผุ หลอดเลือดและไตทำงานหนักเกินไป ⚠️",
          "en": "Increases severe risks of childhood obesity, dental cavities, and organ stress",
          "zh": "极易导致少儿过度肥胖、满口蛀牙龋齿，并极大加重心脏血管与肾脏代谢负荷 ⚠️"
        },
        "icon": "⚠️"
      }
    ],
    "correctOptionId": "opt-k1-hea-h7-3",
    "explanation": {
      "th": "ควรเลือกรับประทานอาหารปรุงสุก สะอาด รสชาติกลมกล่อมตามธรรมชาติ เก่งมากครับ!",
      "en": "Right! High sodium, refined sugar, and trans fats strain metabolic health.",
      "zh": "答对啦！过度摄入高盐高糖油腻食物会导致肥胖症和龋齿，影响长远健康。"
    }
  },
  {
    "id": "k1-hea-h8",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "เมื่อมีคนแปลกหน้าชักชวนให้ไปเที่ยวด้วย หรือยื่นขนมลูกอมให้ที่หน้าโรงเรียน 🍭 🚗 เด็กๆ ควรปฏิบัติตามหลักความปลอดภัยข้อใด?",
      "en": "A stranger offers candy or invites you to their car 🍭 🚗 outside school. What MUST you do?",
      "zh": "放学时校门口若有素未谋面的陌生人主动搭讪，硬塞好吃的糖果并热情邀请你“上他的轿车兜风” 🍭 🚗，应如何自护？"
    },
    "illustration": "🍭 🚗 ✋",
    "illustrationSubtitle": {
      "th": "การป้องกันตนเองจากคนแปลกหน้า (Stranger Danger)",
      "en": "Stranger danger: Refuse & tell teachers",
      "zh": "儿童防诱拐防拐骗安全守则：果断拒绝告知大人"
    },
    "options": [
      {
        "id": "opt-k1-hea-h8-1",
        "label": {
          "th": "ปฏิเสธเสียงดังว่า \"ไม่ไปครับ/ค่ะ\" ไม่รับสิ่งของ แล้วรีบวิ่งไปหาคุณครูหรือเจ้าหน้าที่รักษาความปลอดภัยทันที ✋ 🏃",
          "en": "Shout \"NO!\", refuse treats, and run straight to teachers or security officers",
          "zh": "坚定大声拒绝：“我不去！”，坚决不收礼品，转身飞快跑向老师或校门口保安 ✋ 🏃"
        },
        "icon": "✋"
      },
      {
        "id": "opt-k1-hea-h8-2",
        "label": {
          "th": "รีบขึ้นรถไปกับคนแปลกหน้าทันทีเพราะอยากได้ของเล่น",
          "en": "Hop into stranger's car happily",
          "zh": "欣喜若狂立刻拉开车门坐上去，迫不及待要拿玩具"
        },
        "icon": "🚗"
      },
      {
        "id": "opt-k1-hea-h8-3",
        "label": {
          "th": "เดินตามคนแปลกหน้าไปในที่มืดๆ เปลี่ยวๆ",
          "en": "Follow stranger into dark alleys",
          "zh": "高高兴兴跟着陌生人往偏僻阴暗无人的深巷走"
        },
        "icon": "🕳️"
      }
    ],
    "correctOptionId": "opt-k1-hea-h8-1",
    "explanation": {
      "th": "ห้ามรับของและห้ามไปกับคนแปลกหน้าเด็ดขาด หากถูกดึงตัวให้ร้องตะโกนขอความช่วยเหลือดังๆ เก่งมากครับ!",
      "en": "Awesome! Say NO, maintain safe boundaries, and alert trusted adult authorities instantly.",
      "zh": "太棒了！牢记防拐口诀：陌生人糖果绝不吃，陌生人车辆绝不上，立刻报告求助！"
    }
  },
  {
    "id": "k1-hea-h9",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "เมื่อรู้สึกเครียด โกรธ หรือโมโหเพื่อน 😤 เทคนิคการดูแลสุขภาพจิตและอารมณ์ตนเองที่ได้ผลดีคือข้อใด?",
      "en": "Feeling overwhelmed, furious, or mad at friends 😤: What healthy emotional technique helps calm down?",
      "zh": "当在游戏中与同伴发生摩擦争执、内心感到愤怒委屈、火冒三丈 😤 时，最健康的心理自愈平复技巧是？"
    },
    "illustration": "😤 🧘 🌬️",
    "illustrationSubtitle": {
      "th": "การจัดการอารมณ์และความเครียด: ฝึกหายใจเข้าออกช้าๆ",
      "en": "Emotional regulation: Deep breathing pauses",
      "zh": "情绪管理技巧：深呼吸静心自我调节"
    },
    "options": [
      {
        "id": "opt-k1-hea-h9-1",
        "label": {
          "th": "ลงไปนอนดิ้นกรีดร้องทุบตีเพื่อนข้างๆ",
          "en": "Drop to floor screaming and punching",
          "zh": "躺倒在地上打滚耍赖、挥舞拳头殴打撕咬旁人"
        },
        "icon": "🥊"
      },
      {
        "id": "opt-k1-hea-h9-2",
        "label": {
          "th": "สูดลมหายใจเข้าลึกๆ ทางจมูก แล้วผ่อนลมหายใจออกช้าๆ นับ 1 ถึง 10 ในใจอย่างสงบ 🧘 🌬️",
          "en": "Inhale deeply through nose, exhale slowly, and count 1 to 10 peacefully",
          "zh": "停下手中的争执，闭上双眼做三次悠长的深呼吸，在心中默默从1数到10平复心绪 🧘 🌬️"
        },
        "icon": "🧘"
      },
      {
        "id": "opt-k1-hea-h9-3",
        "label": {
          "th": "ขว้างปาสิ่งของเครื่องใช้ในห้องเรียนให้พังเสียหาย",
          "en": "Hurl classroom materials breaking them",
          "zh": "把课桌上的文具书本全砸在地上摔得粉碎"
        },
        "icon": "💥"
      }
    ],
    "correctOptionId": "opt-k1-hea-h9-2",
    "explanation": {
      "th": "การหายใจลึกๆ ช่วยส่งออกซิเจนไปเลี้ยงสมอง ทำให้จิตใจสงบลงและคิดอย่างมีเหตุผล เก่งมากครับ!",
      "en": "Spot on! Deep diaphragmatic breathing activates the parasympathetic calm response.",
      "zh": "答对了！深呼吸和数数能激活理智脑，帮助我们从冲动狂躁中重归冷静温和。"
    }
  },
  {
    "id": "k1-hea-h10",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "การรักษาความสะอาดของร่างกายด้วยการ \"อาบน้ำ สระผม และสวมเสื้อผ้าที่ซักสะอาดตากแดด\" 🚿 มีประโยชน์ต่อสุขภาพกายอย่างไร?",
      "en": "Bathing with soap, washing hair, and wearing sun-dried clean clothes 🚿 benefits you how?",
      "zh": "坚持每日全身洗澡打肥皂、勤洗头、穿换经阳光杀菌暴晒过的整洁衣物 🚿，对身体健康的直接好处是？"
    },
    "illustration": "🚿 🧼 ✨",
    "illustrationSubtitle": {
      "th": "สุขอนามัยส่วนบุคคล: การอาบน้ำทำความสะอาดร่างกาย",
      "en": "Personal cleanliness prevents skin diseases",
      "zh": "个人全身卫生：沐浴更衣预防皮肤疾病"
    },
    "options": [
      {
        "id": "opt-k1-hea-h10-1",
        "label": {
          "th": "ทำให้เดินทะลุกำแพงบ้านได้",
          "en": "Allows walking through concrete walls",
          "zh": "赋予人体穿透水泥实心砖墙的奇异魔法"
        },
        "icon": "🧱"
      },
      {
        "id": "opt-k1-hea-h10-2",
        "label": {
          "th": "ทำให้ร่างกายหนักขึ้น 100 กิโลกรัม",
          "en": "Makes body weigh 100 kg heavier",
          "zh": "让身体在一瞬间突然重上一百公斤"
        },
        "icon": "🐘"
      },
      {
        "id": "opt-k1-hea-h10-3",
        "label": {
          "th": "ขจัดเหงื่อไคล ฝุ่นละออง ป้องกันผื่นคันและโรคผิวหนัง ทำให้ร่างกายสดชื่นสบายตัว 🚿 ✨",
          "en": "Removes grime, sweat, prevents itchy rashes and skin infections, feeling fresh",
          "zh": "彻底清除汗渍灰尘污垢，有效预防皮肤湿疹、红斑瘙痒与感染，周身舒爽 🚿 ✨"
        },
        "icon": "🚿"
      }
    ],
    "correctOptionId": "opt-k1-hea-h10-3",
    "explanation": {
      "th": "ร่างกายที่สะอาดช่วยให้เรามั่นใจ สุขภาพดี และนอนหลับสนิทตลอดคืน เก่งมากครับ!",
      "en": "Correct! Immaculate hygiene eliminates pathogens, odor, and dermatological rashes.",
      "zh": "答对啦！良好的个人沐浴更衣习惯远离皮肤病，让人神清气爽、自信阳光！"
    }
  },
  {
    "id": "k2-hea-e1",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "สุขบัญญัติและการดูแลสุขภาพระดับชั้นอนุบาล 2 ชุดที่ 1: การขับถ่ายอุจจาระและปัสสาวะเป็นประจำทุกวัน 🚽 มีความสำคัญอย่างไร?",
      "en": "K2 Hygiene Practice #1: Why is regular daily bowel and bladder excretion 🚽 essential for wellness?",
      "zh": "幼儿园中班健康素养第 1 题：每天养成定时在马桶排便和排尿的优良卫生习惯 🚽，对体内健康的生理意义是？"
    },
    "illustration": "🚽 🧻 💧",
    "illustrationSubtitle": {
      "th": "การขับถ่ายเป็นเวลาเพื่อสุขภาพลำไส้",
      "en": "Daily excretion removes bodily waste",
      "zh": "排泄规律常识：定时排毒保障肠道健康"
    },
    "options": [
      {
        "id": "opt-k2-hea-e1-1",
        "label": {
          "th": "ช่วยขับของเสียและสารพิษออกจากร่างกาย ทำให้ลำไส้ทำงานปกติ ไม่อึดอัดแน่นท้อง 🚽 🌿",
          "en": "Flushes wastes and toxins naturally, keeping intestines healthy and comfortable",
          "zh": "及时将体内的消化代谢废弃物排出体外，维持肠道菌群健康通畅不积滞 🚽 🌿"
        },
        "icon": "🚽"
      },
      {
        "id": "opt-k2-hea-e1-2",
        "label": {
          "th": "ทำให้ร่างกายไม่ต้องการอาหารอีกต่อไป",
          "en": "Body never needs food again",
          "zh": "让人体终生都不再需要进食任何食物"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-hea-e1-3",
        "label": {
          "th": "ทำให้นิ้วมืองอกเพิ่มขึ้นเป็น 20 นิ้ว",
          "en": "Sprouts 20 extra fingers",
          "zh": "促使双手十指暴增到二十根奇形怪指"
        },
        "icon": "🖐️"
      }
    ],
    "correctOptionId": "opt-k2-hea-e1-1",
    "explanation": {
      "th": "การขับถ่ายเป็นประจำและดื่มน้ำมากๆ ช่วยป้องกันอาการท้องผูก เก่งมากครับ!",
      "en": "Correct! Regular elimination expels metabolic waste and safeguards bowel health.",
      "zh": "答对了！多喝水多吃蔬菜纤维，定时排便保持肠道健康通畅。"
    }
  },
  {
    "id": "k2-hea-e2",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "สุขบัญญัติและการดูแลสุขภาพระดับชั้นอนุบาล 2 ชุดที่ 2: การขับถ่ายอุจจาระและปัสสาวะเป็นประจำทุกวัน 🚽 มีความสำคัญอย่างไร?",
      "en": "K2 Hygiene Practice #2: Why is regular daily bowel and bladder excretion 🚽 essential for wellness?",
      "zh": "幼儿园中班健康素养第 2 题：每天养成定时在马桶排便和排尿的优良卫生习惯 🚽，对体内健康的生理意义是？"
    },
    "illustration": "🚽 🧻 💧",
    "illustrationSubtitle": {
      "th": "การขับถ่ายเป็นเวลาเพื่อสุขภาพลำไส้",
      "en": "Daily excretion removes bodily waste",
      "zh": "排泄规律常识：定时排毒保障肠道健康"
    },
    "options": [
      {
        "id": "opt-k2-hea-e2-1",
        "label": {
          "th": "ทำให้ร่างกายไม่ต้องการอาหารอีกต่อไป",
          "en": "Body never needs food again",
          "zh": "让人体终生都不再需要进食任何食物"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-hea-e2-2",
        "label": {
          "th": "ช่วยขับของเสียและสารพิษออกจากร่างกาย ทำให้ลำไส้ทำงานปกติ ไม่อึดอัดแน่นท้อง 🚽 🌿",
          "en": "Flushes wastes and toxins naturally, keeping intestines healthy and comfortable",
          "zh": "及时将体内的消化代谢废弃物排出体外，维持肠道菌群健康通畅不积滞 🚽 🌿"
        },
        "icon": "🚽"
      },
      {
        "id": "opt-k2-hea-e2-3",
        "label": {
          "th": "ทำให้นิ้วมืองอกเพิ่มขึ้นเป็น 20 นิ้ว",
          "en": "Sprouts 20 extra fingers",
          "zh": "促使双手十指暴增到二十根奇形怪指"
        },
        "icon": "🖐️"
      }
    ],
    "correctOptionId": "opt-k2-hea-e2-2",
    "explanation": {
      "th": "การขับถ่ายเป็นประจำและดื่มน้ำมากๆ ช่วยป้องกันอาการท้องผูก เก่งมากครับ!",
      "en": "Correct! Regular elimination expels metabolic waste and safeguards bowel health.",
      "zh": "答对了！多喝水多吃蔬菜纤维，定时排便保持肠道健康通畅。"
    }
  },
  {
    "id": "k2-hea-e3",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "สุขบัญญัติและการดูแลสุขภาพระดับชั้นอนุบาล 2 ชุดที่ 3: การขับถ่ายอุจจาระและปัสสาวะเป็นประจำทุกวัน 🚽 มีความสำคัญอย่างไร?",
      "en": "K2 Hygiene Practice #3: Why is regular daily bowel and bladder excretion 🚽 essential for wellness?",
      "zh": "幼儿园中班健康素养第 3 题：每天养成定时在马桶排便和排尿的优良卫生习惯 🚽，对体内健康的生理意义是？"
    },
    "illustration": "🚽 🧻 💧",
    "illustrationSubtitle": {
      "th": "การขับถ่ายเป็นเวลาเพื่อสุขภาพลำไส้",
      "en": "Daily excretion removes bodily waste",
      "zh": "排泄规律常识：定时排毒保障肠道健康"
    },
    "options": [
      {
        "id": "opt-k2-hea-e3-1",
        "label": {
          "th": "ทำให้นิ้วมืองอกเพิ่มขึ้นเป็น 20 นิ้ว",
          "en": "Sprouts 20 extra fingers",
          "zh": "促使双手十指暴增到二十根奇形怪指"
        },
        "icon": "🖐️"
      },
      {
        "id": "opt-k2-hea-e3-2",
        "label": {
          "th": "ทำให้ร่างกายไม่ต้องการอาหารอีกต่อไป",
          "en": "Body never needs food again",
          "zh": "让人体终生都不再需要进食任何食物"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-hea-e3-3",
        "label": {
          "th": "ช่วยขับของเสียและสารพิษออกจากร่างกาย ทำให้ลำไส้ทำงานปกติ ไม่อึดอัดแน่นท้อง 🚽 🌿",
          "en": "Flushes wastes and toxins naturally, keeping intestines healthy and comfortable",
          "zh": "及时将体内的消化代谢废弃物排出体外，维持肠道菌群健康通畅不积滞 🚽 🌿"
        },
        "icon": "🚽"
      }
    ],
    "correctOptionId": "opt-k2-hea-e3-3",
    "explanation": {
      "th": "การขับถ่ายเป็นประจำและดื่มน้ำมากๆ ช่วยป้องกันอาการท้องผูก เก่งมากครับ!",
      "en": "Correct! Regular elimination expels metabolic waste and safeguards bowel health.",
      "zh": "答对了！多喝水多吃蔬菜纤维，定时排便保持肠道健康通畅。"
    }
  },
  {
    "id": "k2-hea-e4",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "สุขบัญญัติและการดูแลสุขภาพระดับชั้นอนุบาล 2 ชุดที่ 4: การขับถ่ายอุจจาระและปัสสาวะเป็นประจำทุกวัน 🚽 มีความสำคัญอย่างไร?",
      "en": "K2 Hygiene Practice #4: Why is regular daily bowel and bladder excretion 🚽 essential for wellness?",
      "zh": "幼儿园中班健康素养第 4 题：每天养成定时在马桶排便和排尿的优良卫生习惯 🚽，对体内健康的生理意义是？"
    },
    "illustration": "🚽 🧻 💧",
    "illustrationSubtitle": {
      "th": "การขับถ่ายเป็นเวลาเพื่อสุขภาพลำไส้",
      "en": "Daily excretion removes bodily waste",
      "zh": "排泄规律常识：定时排毒保障肠道健康"
    },
    "options": [
      {
        "id": "opt-k2-hea-e4-1",
        "label": {
          "th": "ช่วยขับของเสียและสารพิษออกจากร่างกาย ทำให้ลำไส้ทำงานปกติ ไม่อึดอัดแน่นท้อง 🚽 🌿",
          "en": "Flushes wastes and toxins naturally, keeping intestines healthy and comfortable",
          "zh": "及时将体内的消化代谢废弃物排出体外，维持肠道菌群健康通畅不积滞 🚽 🌿"
        },
        "icon": "🚽"
      },
      {
        "id": "opt-k2-hea-e4-2",
        "label": {
          "th": "ทำให้ร่างกายไม่ต้องการอาหารอีกต่อไป",
          "en": "Body never needs food again",
          "zh": "让人体终生都不再需要进食任何食物"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-hea-e4-3",
        "label": {
          "th": "ทำให้นิ้วมืองอกเพิ่มขึ้นเป็น 20 นิ้ว",
          "en": "Sprouts 20 extra fingers",
          "zh": "促使双手十指暴增到二十根奇形怪指"
        },
        "icon": "🖐️"
      }
    ],
    "correctOptionId": "opt-k2-hea-e4-1",
    "explanation": {
      "th": "การขับถ่ายเป็นประจำและดื่มน้ำมากๆ ช่วยป้องกันอาการท้องผูก เก่งมากครับ!",
      "en": "Correct! Regular elimination expels metabolic waste and safeguards bowel health.",
      "zh": "答对了！多喝水多吃蔬菜纤维，定时排便保持肠道健康通畅。"
    }
  },
  {
    "id": "k2-hea-e5",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "สุขบัญญัติและการดูแลสุขภาพระดับชั้นอนุบาล 2 ชุดที่ 5: การขับถ่ายอุจจาระและปัสสาวะเป็นประจำทุกวัน 🚽 มีความสำคัญอย่างไร?",
      "en": "K2 Hygiene Practice #5: Why is regular daily bowel and bladder excretion 🚽 essential for wellness?",
      "zh": "幼儿园中班健康素养第 5 题：每天养成定时在马桶排便和排尿的优良卫生习惯 🚽，对体内健康的生理意义是？"
    },
    "illustration": "🚽 🧻 💧",
    "illustrationSubtitle": {
      "th": "การขับถ่ายเป็นเวลาเพื่อสุขภาพลำไส้",
      "en": "Daily excretion removes bodily waste",
      "zh": "排泄规律常识：定时排毒保障肠道健康"
    },
    "options": [
      {
        "id": "opt-k2-hea-e5-1",
        "label": {
          "th": "ทำให้ร่างกายไม่ต้องการอาหารอีกต่อไป",
          "en": "Body never needs food again",
          "zh": "让人体终生都不再需要进食任何食物"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-hea-e5-2",
        "label": {
          "th": "ช่วยขับของเสียและสารพิษออกจากร่างกาย ทำให้ลำไส้ทำงานปกติ ไม่อึดอัดแน่นท้อง 🚽 🌿",
          "en": "Flushes wastes and toxins naturally, keeping intestines healthy and comfortable",
          "zh": "及时将体内的消化代谢废弃物排出体外，维持肠道菌群健康通畅不积滞 🚽 🌿"
        },
        "icon": "🚽"
      },
      {
        "id": "opt-k2-hea-e5-3",
        "label": {
          "th": "ทำให้นิ้วมืองอกเพิ่มขึ้นเป็น 20 นิ้ว",
          "en": "Sprouts 20 extra fingers",
          "zh": "促使双手十指暴增到二十根奇形怪指"
        },
        "icon": "🖐️"
      }
    ],
    "correctOptionId": "opt-k2-hea-e5-2",
    "explanation": {
      "th": "การขับถ่ายเป็นประจำและดื่มน้ำมากๆ ช่วยป้องกันอาการท้องผูก เก่งมากครับ!",
      "en": "Correct! Regular elimination expels metabolic waste and safeguards bowel health.",
      "zh": "答对了！多喝水多吃蔬菜纤维，定时排便保持肠道健康通畅。"
    }
  },
  {
    "id": "k2-hea-e6",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "สุขบัญญัติและการดูแลสุขภาพระดับชั้นอนุบาล 2 ชุดที่ 6: การขับถ่ายอุจจาระและปัสสาวะเป็นประจำทุกวัน 🚽 มีความสำคัญอย่างไร?",
      "en": "K2 Hygiene Practice #6: Why is regular daily bowel and bladder excretion 🚽 essential for wellness?",
      "zh": "幼儿园中班健康素养第 6 题：每天养成定时在马桶排便和排尿的优良卫生习惯 🚽，对体内健康的生理意义是？"
    },
    "illustration": "🚽 🧻 💧",
    "illustrationSubtitle": {
      "th": "การขับถ่ายเป็นเวลาเพื่อสุขภาพลำไส้",
      "en": "Daily excretion removes bodily waste",
      "zh": "排泄规律常识：定时排毒保障肠道健康"
    },
    "options": [
      {
        "id": "opt-k2-hea-e6-1",
        "label": {
          "th": "ทำให้นิ้วมืองอกเพิ่มขึ้นเป็น 20 นิ้ว",
          "en": "Sprouts 20 extra fingers",
          "zh": "促使双手十指暴增到二十根奇形怪指"
        },
        "icon": "🖐️"
      },
      {
        "id": "opt-k2-hea-e6-2",
        "label": {
          "th": "ทำให้ร่างกายไม่ต้องการอาหารอีกต่อไป",
          "en": "Body never needs food again",
          "zh": "让人体终生都不再需要进食任何食物"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-hea-e6-3",
        "label": {
          "th": "ช่วยขับของเสียและสารพิษออกจากร่างกาย ทำให้ลำไส้ทำงานปกติ ไม่อึดอัดแน่นท้อง 🚽 🌿",
          "en": "Flushes wastes and toxins naturally, keeping intestines healthy and comfortable",
          "zh": "及时将体内的消化代谢废弃物排出体外，维持肠道菌群健康通畅不积滞 🚽 🌿"
        },
        "icon": "🚽"
      }
    ],
    "correctOptionId": "opt-k2-hea-e6-3",
    "explanation": {
      "th": "การขับถ่ายเป็นประจำและดื่มน้ำมากๆ ช่วยป้องกันอาการท้องผูก เก่งมากครับ!",
      "en": "Correct! Regular elimination expels metabolic waste and safeguards bowel health.",
      "zh": "答对了！多喝水多吃蔬菜纤维，定时排便保持肠道健康通畅。"
    }
  },
  {
    "id": "k2-hea-e7",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "สุขบัญญัติและการดูแลสุขภาพระดับชั้นอนุบาล 2 ชุดที่ 7: การขับถ่ายอุจจาระและปัสสาวะเป็นประจำทุกวัน 🚽 มีความสำคัญอย่างไร?",
      "en": "K2 Hygiene Practice #7: Why is regular daily bowel and bladder excretion 🚽 essential for wellness?",
      "zh": "幼儿园中班健康素养第 7 题：每天养成定时在马桶排便和排尿的优良卫生习惯 🚽，对体内健康的生理意义是？"
    },
    "illustration": "🚽 🧻 💧",
    "illustrationSubtitle": {
      "th": "การขับถ่ายเป็นเวลาเพื่อสุขภาพลำไส้",
      "en": "Daily excretion removes bodily waste",
      "zh": "排泄规律常识：定时排毒保障肠道健康"
    },
    "options": [
      {
        "id": "opt-k2-hea-e7-1",
        "label": {
          "th": "ช่วยขับของเสียและสารพิษออกจากร่างกาย ทำให้ลำไส้ทำงานปกติ ไม่อึดอัดแน่นท้อง 🚽 🌿",
          "en": "Flushes wastes and toxins naturally, keeping intestines healthy and comfortable",
          "zh": "及时将体内的消化代谢废弃物排出体外，维持肠道菌群健康通畅不积滞 🚽 🌿"
        },
        "icon": "🚽"
      },
      {
        "id": "opt-k2-hea-e7-2",
        "label": {
          "th": "ทำให้ร่างกายไม่ต้องการอาหารอีกต่อไป",
          "en": "Body never needs food again",
          "zh": "让人体终生都不再需要进食任何食物"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-hea-e7-3",
        "label": {
          "th": "ทำให้นิ้วมืองอกเพิ่มขึ้นเป็น 20 นิ้ว",
          "en": "Sprouts 20 extra fingers",
          "zh": "促使双手十指暴增到二十根奇形怪指"
        },
        "icon": "🖐️"
      }
    ],
    "correctOptionId": "opt-k2-hea-e7-1",
    "explanation": {
      "th": "การขับถ่ายเป็นประจำและดื่มน้ำมากๆ ช่วยป้องกันอาการท้องผูก เก่งมากครับ!",
      "en": "Correct! Regular elimination expels metabolic waste and safeguards bowel health.",
      "zh": "答对了！多喝水多吃蔬菜纤维，定时排便保持肠道健康通畅。"
    }
  },
  {
    "id": "k2-hea-e8",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "สุขบัญญัติและการดูแลสุขภาพระดับชั้นอนุบาล 2 ชุดที่ 8: การขับถ่ายอุจจาระและปัสสาวะเป็นประจำทุกวัน 🚽 มีความสำคัญอย่างไร?",
      "en": "K2 Hygiene Practice #8: Why is regular daily bowel and bladder excretion 🚽 essential for wellness?",
      "zh": "幼儿园中班健康素养第 8 题：每天养成定时在马桶排便和排尿的优良卫生习惯 🚽，对体内健康的生理意义是？"
    },
    "illustration": "🚽 🧻 💧",
    "illustrationSubtitle": {
      "th": "การขับถ่ายเป็นเวลาเพื่อสุขภาพลำไส้",
      "en": "Daily excretion removes bodily waste",
      "zh": "排泄规律常识：定时排毒保障肠道健康"
    },
    "options": [
      {
        "id": "opt-k2-hea-e8-1",
        "label": {
          "th": "ทำให้ร่างกายไม่ต้องการอาหารอีกต่อไป",
          "en": "Body never needs food again",
          "zh": "让人体终生都不再需要进食任何食物"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-hea-e8-2",
        "label": {
          "th": "ช่วยขับของเสียและสารพิษออกจากร่างกาย ทำให้ลำไส้ทำงานปกติ ไม่อึดอัดแน่นท้อง 🚽 🌿",
          "en": "Flushes wastes and toxins naturally, keeping intestines healthy and comfortable",
          "zh": "及时将体内的消化代谢废弃物排出体外，维持肠道菌群健康通畅不积滞 🚽 🌿"
        },
        "icon": "🚽"
      },
      {
        "id": "opt-k2-hea-e8-3",
        "label": {
          "th": "ทำให้นิ้วมืองอกเพิ่มขึ้นเป็น 20 นิ้ว",
          "en": "Sprouts 20 extra fingers",
          "zh": "促使双手十指暴增到二十根奇形怪指"
        },
        "icon": "🖐️"
      }
    ],
    "correctOptionId": "opt-k2-hea-e8-2",
    "explanation": {
      "th": "การขับถ่ายเป็นประจำและดื่มน้ำมากๆ ช่วยป้องกันอาการท้องผูก เก่งมากครับ!",
      "en": "Correct! Regular elimination expels metabolic waste and safeguards bowel health.",
      "zh": "答对了！多喝水多吃蔬菜纤维，定时排便保持肠道健康通畅。"
    }
  },
  {
    "id": "k2-hea-e9",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "สุขบัญญัติและการดูแลสุขภาพระดับชั้นอนุบาล 2 ชุดที่ 9: การขับถ่ายอุจจาระและปัสสาวะเป็นประจำทุกวัน 🚽 มีความสำคัญอย่างไร?",
      "en": "K2 Hygiene Practice #9: Why is regular daily bowel and bladder excretion 🚽 essential for wellness?",
      "zh": "幼儿园中班健康素养第 9 题：每天养成定时在马桶排便和排尿的优良卫生习惯 🚽，对体内健康的生理意义是？"
    },
    "illustration": "🚽 🧻 💧",
    "illustrationSubtitle": {
      "th": "การขับถ่ายเป็นเวลาเพื่อสุขภาพลำไส้",
      "en": "Daily excretion removes bodily waste",
      "zh": "排泄规律常识：定时排毒保障肠道健康"
    },
    "options": [
      {
        "id": "opt-k2-hea-e9-1",
        "label": {
          "th": "ทำให้นิ้วมืองอกเพิ่มขึ้นเป็น 20 นิ้ว",
          "en": "Sprouts 20 extra fingers",
          "zh": "促使双手十指暴增到二十根奇形怪指"
        },
        "icon": "🖐️"
      },
      {
        "id": "opt-k2-hea-e9-2",
        "label": {
          "th": "ทำให้ร่างกายไม่ต้องการอาหารอีกต่อไป",
          "en": "Body never needs food again",
          "zh": "让人体终生都不再需要进食任何食物"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-hea-e9-3",
        "label": {
          "th": "ช่วยขับของเสียและสารพิษออกจากร่างกาย ทำให้ลำไส้ทำงานปกติ ไม่อึดอัดแน่นท้อง 🚽 🌿",
          "en": "Flushes wastes and toxins naturally, keeping intestines healthy and comfortable",
          "zh": "及时将体内的消化代谢废弃物排出体外，维持肠道菌群健康通畅不积滞 🚽 🌿"
        },
        "icon": "🚽"
      }
    ],
    "correctOptionId": "opt-k2-hea-e9-3",
    "explanation": {
      "th": "การขับถ่ายเป็นประจำและดื่มน้ำมากๆ ช่วยป้องกันอาการท้องผูก เก่งมากครับ!",
      "en": "Correct! Regular elimination expels metabolic waste and safeguards bowel health.",
      "zh": "答对了！多喝水多吃蔬菜纤维，定时排便保持肠道健康通畅。"
    }
  },
  {
    "id": "k2-hea-e10",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "สุขบัญญัติและการดูแลสุขภาพระดับชั้นอนุบาล 2 ชุดที่ 10: การขับถ่ายอุจจาระและปัสสาวะเป็นประจำทุกวัน 🚽 มีความสำคัญอย่างไร?",
      "en": "K2 Hygiene Practice #10: Why is regular daily bowel and bladder excretion 🚽 essential for wellness?",
      "zh": "幼儿园中班健康素养第 10 题：每天养成定时在马桶排便和排尿的优良卫生习惯 🚽，对体内健康的生理意义是？"
    },
    "illustration": "🚽 🧻 💧",
    "illustrationSubtitle": {
      "th": "การขับถ่ายเป็นเวลาเพื่อสุขภาพลำไส้",
      "en": "Daily excretion removes bodily waste",
      "zh": "排泄规律常识：定时排毒保障肠道健康"
    },
    "options": [
      {
        "id": "opt-k2-hea-e10-1",
        "label": {
          "th": "ช่วยขับของเสียและสารพิษออกจากร่างกาย ทำให้ลำไส้ทำงานปกติ ไม่อึดอัดแน่นท้อง 🚽 🌿",
          "en": "Flushes wastes and toxins naturally, keeping intestines healthy and comfortable",
          "zh": "及时将体内的消化代谢废弃物排出体外，维持肠道菌群健康通畅不积滞 🚽 🌿"
        },
        "icon": "🚽"
      },
      {
        "id": "opt-k2-hea-e10-2",
        "label": {
          "th": "ทำให้ร่างกายไม่ต้องการอาหารอีกต่อไป",
          "en": "Body never needs food again",
          "zh": "让人体终生都不再需要进食任何食物"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-hea-e10-3",
        "label": {
          "th": "ทำให้นิ้วมืองอกเพิ่มขึ้นเป็น 20 นิ้ว",
          "en": "Sprouts 20 extra fingers",
          "zh": "促使双手十指暴增到二十根奇形怪指"
        },
        "icon": "🖐️"
      }
    ],
    "correctOptionId": "opt-k2-hea-e10-1",
    "explanation": {
      "th": "การขับถ่ายเป็นประจำและดื่มน้ำมากๆ ช่วยป้องกันอาการท้องผูก เก่งมากครับ!",
      "en": "Correct! Regular elimination expels metabolic waste and safeguards bowel health.",
      "zh": "答对了！多喝水多吃蔬菜纤维，定时排便保持肠道健康通畅。"
    }
  },
  {
    "id": "k2-hea-m1",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "สมรรถภาพทางกายและการเคลื่อนไหวระดับชั้นอนุบาล 2 ชุดที่ 1: การฝึก \"กระโดดข้ามสิ่งกีดขวางเตี้ยๆ ด้วยสองเท้าพร้อมกัน\" 🏃 ช่วยเสริมสร้างสิ่งใด?",
      "en": "K2 Physical Fitness #1: Two-footed jumping over soft low hurdles 🏃 cultivates what physical capacity?",
      "zh": "幼儿园中班体能发展第 1 题：在体育游戏中开展“双脚同时并拢向前起跳、越过柔软低矮障碍物” 🏃 的练习，主要促进了什么能力？"
    },
    "illustration": "🏃 🤸 🦵",
    "illustrationSubtitle": {
      "th": "การกระโดดสองเท้าเสริมสร้างกล้ามเนื้อขาและการประสานสัมพันธ์",
      "en": "Jumping develops leg power and motor coordination",
      "zh": "体能游戏训练：双脚跳跃提升下肢爆发力与协调性"
    },
    "options": [
      {
        "id": "opt-k2-hea-m1-1",
        "label": {
          "th": "ทำให้ตัวเตี้ยลงเรื่อยๆ จนเหลือตัวนิดเดียว",
          "en": "Makes you shrink tiny",
          "zh": "使得身体越跳越矮，最后缩成一寸丁"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-hea-m1-2",
        "label": {
          "th": "เสริมสร้างพลังกล้ามเนื้อขา ความยืดหยุ่น และการประสานงานของสายตากับเท้า 🦵 🏃",
          "en": "Builds leg muscular power, dynamic balance, and eye-foot coordination",
          "zh": "极大地锻炼双腿肌肉群爆发力量、脚踝弹跳缓冲力及手眼脚运动协调性 🦵 🏃"
        },
        "icon": "🦵"
      },
      {
        "id": "opt-k2-hea-m1-3",
        "label": {
          "th": "ทำให้ข้อเท้าบิดหักตลอดไป",
          "en": "Permanently snaps ankles",
          "zh": "导致双脚脚踝永久性骨折报废"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-hea-m1-2",
    "explanation": {
      "th": "การกระโดดสองเท้าช่วยฝึกแรงสปริงของข้อเท้าและเสริมสร้างความแข็งแกร่งของกระดูก เก่งมากครับ!",
      "en": "Awesome! Jumping hurdles reinforces bone density and plyometric spring elasticity.",
      "zh": "太棒了！双脚连续跳跃能有效锻炼腿部弹跳力与落地下肢缓冲协调技巧。"
    }
  },
  {
    "id": "k2-hea-m2",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "สมรรถภาพทางกายและการเคลื่อนไหวระดับชั้นอนุบาล 2 ชุดที่ 2: การฝึก \"กระโดดข้ามสิ่งกีดขวางเตี้ยๆ ด้วยสองเท้าพร้อมกัน\" 🏃 ช่วยเสริมสร้างสิ่งใด?",
      "en": "K2 Physical Fitness #2: Two-footed jumping over soft low hurdles 🏃 cultivates what physical capacity?",
      "zh": "幼儿园中班体能发展第 2 题：在体育游戏中开展“双脚同时并拢向前起跳、越过柔软低矮障碍物” 🏃 的练习，主要促进了什么能力？"
    },
    "illustration": "🏃 🤸 🦵",
    "illustrationSubtitle": {
      "th": "การกระโดดสองเท้าเสริมสร้างกล้ามเนื้อขาและการประสานสัมพันธ์",
      "en": "Jumping develops leg power and motor coordination",
      "zh": "体能游戏训练：双脚跳跃提升下肢爆发力与协调性"
    },
    "options": [
      {
        "id": "opt-k2-hea-m2-1",
        "label": {
          "th": "ทำให้ข้อเท้าบิดหักตลอดไป",
          "en": "Permanently snaps ankles",
          "zh": "导致双脚脚踝永久性骨折报废"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-hea-m2-2",
        "label": {
          "th": "ทำให้ตัวเตี้ยลงเรื่อยๆ จนเหลือตัวนิดเดียว",
          "en": "Makes you shrink tiny",
          "zh": "使得身体越跳越矮，最后缩成一寸丁"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-hea-m2-3",
        "label": {
          "th": "เสริมสร้างพลังกล้ามเนื้อขา ความยืดหยุ่น และการประสานงานของสายตากับเท้า 🦵 🏃",
          "en": "Builds leg muscular power, dynamic balance, and eye-foot coordination",
          "zh": "极大地锻炼双腿肌肉群爆发力量、脚踝弹跳缓冲力及手眼脚运动协调性 🦵 🏃"
        },
        "icon": "🦵"
      }
    ],
    "correctOptionId": "opt-k2-hea-m2-3",
    "explanation": {
      "th": "การกระโดดสองเท้าช่วยฝึกแรงสปริงของข้อเท้าและเสริมสร้างความแข็งแกร่งของกระดูก เก่งมากครับ!",
      "en": "Awesome! Jumping hurdles reinforces bone density and plyometric spring elasticity.",
      "zh": "太棒了！双脚连续跳跃能有效锻炼腿部弹跳力与落地下肢缓冲协调技巧。"
    }
  },
  {
    "id": "k2-hea-m3",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "สมรรถภาพทางกายและการเคลื่อนไหวระดับชั้นอนุบาล 2 ชุดที่ 3: การฝึก \"กระโดดข้ามสิ่งกีดขวางเตี้ยๆ ด้วยสองเท้าพร้อมกัน\" 🏃 ช่วยเสริมสร้างสิ่งใด?",
      "en": "K2 Physical Fitness #3: Two-footed jumping over soft low hurdles 🏃 cultivates what physical capacity?",
      "zh": "幼儿园中班体能发展第 3 题：在体育游戏中开展“双脚同时并拢向前起跳、越过柔软低矮障碍物” 🏃 的练习，主要促进了什么能力？"
    },
    "illustration": "🏃 🤸 🦵",
    "illustrationSubtitle": {
      "th": "การกระโดดสองเท้าเสริมสร้างกล้ามเนื้อขาและการประสานสัมพันธ์",
      "en": "Jumping develops leg power and motor coordination",
      "zh": "体能游戏训练：双脚跳跃提升下肢爆发力与协调性"
    },
    "options": [
      {
        "id": "opt-k2-hea-m3-1",
        "label": {
          "th": "เสริมสร้างพลังกล้ามเนื้อขา ความยืดหยุ่น และการประสานงานของสายตากับเท้า 🦵 🏃",
          "en": "Builds leg muscular power, dynamic balance, and eye-foot coordination",
          "zh": "极大地锻炼双腿肌肉群爆发力量、脚踝弹跳缓冲力及手眼脚运动协调性 🦵 🏃"
        },
        "icon": "🦵"
      },
      {
        "id": "opt-k2-hea-m3-2",
        "label": {
          "th": "ทำให้ตัวเตี้ยลงเรื่อยๆ จนเหลือตัวนิดเดียว",
          "en": "Makes you shrink tiny",
          "zh": "使得身体越跳越矮，最后缩成一寸丁"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-hea-m3-3",
        "label": {
          "th": "ทำให้ข้อเท้าบิดหักตลอดไป",
          "en": "Permanently snaps ankles",
          "zh": "导致双脚脚踝永久性骨折报废"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-hea-m3-1",
    "explanation": {
      "th": "การกระโดดสองเท้าช่วยฝึกแรงสปริงของข้อเท้าและเสริมสร้างความแข็งแกร่งของกระดูก เก่งมากครับ!",
      "en": "Awesome! Jumping hurdles reinforces bone density and plyometric spring elasticity.",
      "zh": "太棒了！双脚连续跳跃能有效锻炼腿部弹跳力与落地下肢缓冲协调技巧。"
    }
  },
  {
    "id": "k2-hea-m4",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "สมรรถภาพทางกายและการเคลื่อนไหวระดับชั้นอนุบาล 2 ชุดที่ 4: การฝึก \"กระโดดข้ามสิ่งกีดขวางเตี้ยๆ ด้วยสองเท้าพร้อมกัน\" 🏃 ช่วยเสริมสร้างสิ่งใด?",
      "en": "K2 Physical Fitness #4: Two-footed jumping over soft low hurdles 🏃 cultivates what physical capacity?",
      "zh": "幼儿园中班体能发展第 4 题：在体育游戏中开展“双脚同时并拢向前起跳、越过柔软低矮障碍物” 🏃 的练习，主要促进了什么能力？"
    },
    "illustration": "🏃 🤸 🦵",
    "illustrationSubtitle": {
      "th": "การกระโดดสองเท้าเสริมสร้างกล้ามเนื้อขาและการประสานสัมพันธ์",
      "en": "Jumping develops leg power and motor coordination",
      "zh": "体能游戏训练：双脚跳跃提升下肢爆发力与协调性"
    },
    "options": [
      {
        "id": "opt-k2-hea-m4-1",
        "label": {
          "th": "ทำให้ตัวเตี้ยลงเรื่อยๆ จนเหลือตัวนิดเดียว",
          "en": "Makes you shrink tiny",
          "zh": "使得身体越跳越矮，最后缩成一寸丁"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-hea-m4-2",
        "label": {
          "th": "เสริมสร้างพลังกล้ามเนื้อขา ความยืดหยุ่น และการประสานงานของสายตากับเท้า 🦵 🏃",
          "en": "Builds leg muscular power, dynamic balance, and eye-foot coordination",
          "zh": "极大地锻炼双腿肌肉群爆发力量、脚踝弹跳缓冲力及手眼脚运动协调性 🦵 🏃"
        },
        "icon": "🦵"
      },
      {
        "id": "opt-k2-hea-m4-3",
        "label": {
          "th": "ทำให้ข้อเท้าบิดหักตลอดไป",
          "en": "Permanently snaps ankles",
          "zh": "导致双脚脚踝永久性骨折报废"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-hea-m4-2",
    "explanation": {
      "th": "การกระโดดสองเท้าช่วยฝึกแรงสปริงของข้อเท้าและเสริมสร้างความแข็งแกร่งของกระดูก เก่งมากครับ!",
      "en": "Awesome! Jumping hurdles reinforces bone density and plyometric spring elasticity.",
      "zh": "太棒了！双脚连续跳跃能有效锻炼腿部弹跳力与落地下肢缓冲协调技巧。"
    }
  },
  {
    "id": "k2-hea-m5",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "สมรรถภาพทางกายและการเคลื่อนไหวระดับชั้นอนุบาล 2 ชุดที่ 5: การฝึก \"กระโดดข้ามสิ่งกีดขวางเตี้ยๆ ด้วยสองเท้าพร้อมกัน\" 🏃 ช่วยเสริมสร้างสิ่งใด?",
      "en": "K2 Physical Fitness #5: Two-footed jumping over soft low hurdles 🏃 cultivates what physical capacity?",
      "zh": "幼儿园中班体能发展第 5 题：在体育游戏中开展“双脚同时并拢向前起跳、越过柔软低矮障碍物” 🏃 的练习，主要促进了什么能力？"
    },
    "illustration": "🏃 🤸 🦵",
    "illustrationSubtitle": {
      "th": "การกระโดดสองเท้าเสริมสร้างกล้ามเนื้อขาและการประสานสัมพันธ์",
      "en": "Jumping develops leg power and motor coordination",
      "zh": "体能游戏训练：双脚跳跃提升下肢爆发力与协调性"
    },
    "options": [
      {
        "id": "opt-k2-hea-m5-1",
        "label": {
          "th": "ทำให้ข้อเท้าบิดหักตลอดไป",
          "en": "Permanently snaps ankles",
          "zh": "导致双脚脚踝永久性骨折报废"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-hea-m5-2",
        "label": {
          "th": "ทำให้ตัวเตี้ยลงเรื่อยๆ จนเหลือตัวนิดเดียว",
          "en": "Makes you shrink tiny",
          "zh": "使得身体越跳越矮，最后缩成一寸丁"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-hea-m5-3",
        "label": {
          "th": "เสริมสร้างพลังกล้ามเนื้อขา ความยืดหยุ่น และการประสานงานของสายตากับเท้า 🦵 🏃",
          "en": "Builds leg muscular power, dynamic balance, and eye-foot coordination",
          "zh": "极大地锻炼双腿肌肉群爆发力量、脚踝弹跳缓冲力及手眼脚运动协调性 🦵 🏃"
        },
        "icon": "🦵"
      }
    ],
    "correctOptionId": "opt-k2-hea-m5-3",
    "explanation": {
      "th": "การกระโดดสองเท้าช่วยฝึกแรงสปริงของข้อเท้าและเสริมสร้างความแข็งแกร่งของกระดูก เก่งมากครับ!",
      "en": "Awesome! Jumping hurdles reinforces bone density and plyometric spring elasticity.",
      "zh": "太棒了！双脚连续跳跃能有效锻炼腿部弹跳力与落地下肢缓冲协调技巧。"
    }
  },
  {
    "id": "k2-hea-m6",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "สมรรถภาพทางกายและการเคลื่อนไหวระดับชั้นอนุบาล 2 ชุดที่ 6: การฝึก \"กระโดดข้ามสิ่งกีดขวางเตี้ยๆ ด้วยสองเท้าพร้อมกัน\" 🏃 ช่วยเสริมสร้างสิ่งใด?",
      "en": "K2 Physical Fitness #6: Two-footed jumping over soft low hurdles 🏃 cultivates what physical capacity?",
      "zh": "幼儿园中班体能发展第 6 题：在体育游戏中开展“双脚同时并拢向前起跳、越过柔软低矮障碍物” 🏃 的练习，主要促进了什么能力？"
    },
    "illustration": "🏃 🤸 🦵",
    "illustrationSubtitle": {
      "th": "การกระโดดสองเท้าเสริมสร้างกล้ามเนื้อขาและการประสานสัมพันธ์",
      "en": "Jumping develops leg power and motor coordination",
      "zh": "体能游戏训练：双脚跳跃提升下肢爆发力与协调性"
    },
    "options": [
      {
        "id": "opt-k2-hea-m6-1",
        "label": {
          "th": "เสริมสร้างพลังกล้ามเนื้อขา ความยืดหยุ่น และการประสานงานของสายตากับเท้า 🦵 🏃",
          "en": "Builds leg muscular power, dynamic balance, and eye-foot coordination",
          "zh": "极大地锻炼双腿肌肉群爆发力量、脚踝弹跳缓冲力及手眼脚运动协调性 🦵 🏃"
        },
        "icon": "🦵"
      },
      {
        "id": "opt-k2-hea-m6-2",
        "label": {
          "th": "ทำให้ตัวเตี้ยลงเรื่อยๆ จนเหลือตัวนิดเดียว",
          "en": "Makes you shrink tiny",
          "zh": "使得身体越跳越矮，最后缩成一寸丁"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-hea-m6-3",
        "label": {
          "th": "ทำให้ข้อเท้าบิดหักตลอดไป",
          "en": "Permanently snaps ankles",
          "zh": "导致双脚脚踝永久性骨折报废"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-hea-m6-1",
    "explanation": {
      "th": "การกระโดดสองเท้าช่วยฝึกแรงสปริงของข้อเท้าและเสริมสร้างความแข็งแกร่งของกระดูก เก่งมากครับ!",
      "en": "Awesome! Jumping hurdles reinforces bone density and plyometric spring elasticity.",
      "zh": "太棒了！双脚连续跳跃能有效锻炼腿部弹跳力与落地下肢缓冲协调技巧。"
    }
  },
  {
    "id": "k2-hea-m7",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "สมรรถภาพทางกายและการเคลื่อนไหวระดับชั้นอนุบาล 2 ชุดที่ 7: การฝึก \"กระโดดข้ามสิ่งกีดขวางเตี้ยๆ ด้วยสองเท้าพร้อมกัน\" 🏃 ช่วยเสริมสร้างสิ่งใด?",
      "en": "K2 Physical Fitness #7: Two-footed jumping over soft low hurdles 🏃 cultivates what physical capacity?",
      "zh": "幼儿园中班体能发展第 7 题：在体育游戏中开展“双脚同时并拢向前起跳、越过柔软低矮障碍物” 🏃 的练习，主要促进了什么能力？"
    },
    "illustration": "🏃 🤸 🦵",
    "illustrationSubtitle": {
      "th": "การกระโดดสองเท้าเสริมสร้างกล้ามเนื้อขาและการประสานสัมพันธ์",
      "en": "Jumping develops leg power and motor coordination",
      "zh": "体能游戏训练：双脚跳跃提升下肢爆发力与协调性"
    },
    "options": [
      {
        "id": "opt-k2-hea-m7-1",
        "label": {
          "th": "ทำให้ตัวเตี้ยลงเรื่อยๆ จนเหลือตัวนิดเดียว",
          "en": "Makes you shrink tiny",
          "zh": "使得身体越跳越矮，最后缩成一寸丁"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-hea-m7-2",
        "label": {
          "th": "เสริมสร้างพลังกล้ามเนื้อขา ความยืดหยุ่น และการประสานงานของสายตากับเท้า 🦵 🏃",
          "en": "Builds leg muscular power, dynamic balance, and eye-foot coordination",
          "zh": "极大地锻炼双腿肌肉群爆发力量、脚踝弹跳缓冲力及手眼脚运动协调性 🦵 🏃"
        },
        "icon": "🦵"
      },
      {
        "id": "opt-k2-hea-m7-3",
        "label": {
          "th": "ทำให้ข้อเท้าบิดหักตลอดไป",
          "en": "Permanently snaps ankles",
          "zh": "导致双脚脚踝永久性骨折报废"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-hea-m7-2",
    "explanation": {
      "th": "การกระโดดสองเท้าช่วยฝึกแรงสปริงของข้อเท้าและเสริมสร้างความแข็งแกร่งของกระดูก เก่งมากครับ!",
      "en": "Awesome! Jumping hurdles reinforces bone density and plyometric spring elasticity.",
      "zh": "太棒了！双脚连续跳跃能有效锻炼腿部弹跳力与落地下肢缓冲协调技巧。"
    }
  },
  {
    "id": "k2-hea-m8",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "สมรรถภาพทางกายและการเคลื่อนไหวระดับชั้นอนุบาล 2 ชุดที่ 8: การฝึก \"กระโดดข้ามสิ่งกีดขวางเตี้ยๆ ด้วยสองเท้าพร้อมกัน\" 🏃 ช่วยเสริมสร้างสิ่งใด?",
      "en": "K2 Physical Fitness #8: Two-footed jumping over soft low hurdles 🏃 cultivates what physical capacity?",
      "zh": "幼儿园中班体能发展第 8 题：在体育游戏中开展“双脚同时并拢向前起跳、越过柔软低矮障碍物” 🏃 的练习，主要促进了什么能力？"
    },
    "illustration": "🏃 🤸 🦵",
    "illustrationSubtitle": {
      "th": "การกระโดดสองเท้าเสริมสร้างกล้ามเนื้อขาและการประสานสัมพันธ์",
      "en": "Jumping develops leg power and motor coordination",
      "zh": "体能游戏训练：双脚跳跃提升下肢爆发力与协调性"
    },
    "options": [
      {
        "id": "opt-k2-hea-m8-1",
        "label": {
          "th": "ทำให้ข้อเท้าบิดหักตลอดไป",
          "en": "Permanently snaps ankles",
          "zh": "导致双脚脚踝永久性骨折报废"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-hea-m8-2",
        "label": {
          "th": "ทำให้ตัวเตี้ยลงเรื่อยๆ จนเหลือตัวนิดเดียว",
          "en": "Makes you shrink tiny",
          "zh": "使得身体越跳越矮，最后缩成一寸丁"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-hea-m8-3",
        "label": {
          "th": "เสริมสร้างพลังกล้ามเนื้อขา ความยืดหยุ่น และการประสานงานของสายตากับเท้า 🦵 🏃",
          "en": "Builds leg muscular power, dynamic balance, and eye-foot coordination",
          "zh": "极大地锻炼双腿肌肉群爆发力量、脚踝弹跳缓冲力及手眼脚运动协调性 🦵 🏃"
        },
        "icon": "🦵"
      }
    ],
    "correctOptionId": "opt-k2-hea-m8-3",
    "explanation": {
      "th": "การกระโดดสองเท้าช่วยฝึกแรงสปริงของข้อเท้าและเสริมสร้างความแข็งแกร่งของกระดูก เก่งมากครับ!",
      "en": "Awesome! Jumping hurdles reinforces bone density and plyometric spring elasticity.",
      "zh": "太棒了！双脚连续跳跃能有效锻炼腿部弹跳力与落地下肢缓冲协调技巧。"
    }
  },
  {
    "id": "k2-hea-m9",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "สมรรถภาพทางกายและการเคลื่อนไหวระดับชั้นอนุบาล 2 ชุดที่ 9: การฝึก \"กระโดดข้ามสิ่งกีดขวางเตี้ยๆ ด้วยสองเท้าพร้อมกัน\" 🏃 ช่วยเสริมสร้างสิ่งใด?",
      "en": "K2 Physical Fitness #9: Two-footed jumping over soft low hurdles 🏃 cultivates what physical capacity?",
      "zh": "幼儿园中班体能发展第 9 题：在体育游戏中开展“双脚同时并拢向前起跳、越过柔软低矮障碍物” 🏃 的练习，主要促进了什么能力？"
    },
    "illustration": "🏃 🤸 🦵",
    "illustrationSubtitle": {
      "th": "การกระโดดสองเท้าเสริมสร้างกล้ามเนื้อขาและการประสานสัมพันธ์",
      "en": "Jumping develops leg power and motor coordination",
      "zh": "体能游戏训练：双脚跳跃提升下肢爆发力与协调性"
    },
    "options": [
      {
        "id": "opt-k2-hea-m9-1",
        "label": {
          "th": "เสริมสร้างพลังกล้ามเนื้อขา ความยืดหยุ่น และการประสานงานของสายตากับเท้า 🦵 🏃",
          "en": "Builds leg muscular power, dynamic balance, and eye-foot coordination",
          "zh": "极大地锻炼双腿肌肉群爆发力量、脚踝弹跳缓冲力及手眼脚运动协调性 🦵 🏃"
        },
        "icon": "🦵"
      },
      {
        "id": "opt-k2-hea-m9-2",
        "label": {
          "th": "ทำให้ตัวเตี้ยลงเรื่อยๆ จนเหลือตัวนิดเดียว",
          "en": "Makes you shrink tiny",
          "zh": "使得身体越跳越矮，最后缩成一寸丁"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-hea-m9-3",
        "label": {
          "th": "ทำให้ข้อเท้าบิดหักตลอดไป",
          "en": "Permanently snaps ankles",
          "zh": "导致双脚脚踝永久性骨折报废"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-hea-m9-1",
    "explanation": {
      "th": "การกระโดดสองเท้าช่วยฝึกแรงสปริงของข้อเท้าและเสริมสร้างความแข็งแกร่งของกระดูก เก่งมากครับ!",
      "en": "Awesome! Jumping hurdles reinforces bone density and plyometric spring elasticity.",
      "zh": "太棒了！双脚连续跳跃能有效锻炼腿部弹跳力与落地下肢缓冲协调技巧。"
    }
  },
  {
    "id": "k2-hea-m10",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "สมรรถภาพทางกายและการเคลื่อนไหวระดับชั้นอนุบาล 2 ชุดที่ 10: การฝึก \"กระโดดข้ามสิ่งกีดขวางเตี้ยๆ ด้วยสองเท้าพร้อมกัน\" 🏃 ช่วยเสริมสร้างสิ่งใด?",
      "en": "K2 Physical Fitness #10: Two-footed jumping over soft low hurdles 🏃 cultivates what physical capacity?",
      "zh": "幼儿园中班体能发展第 10 题：在体育游戏中开展“双脚同时并拢向前起跳、越过柔软低矮障碍物” 🏃 的练习，主要促进了什么能力？"
    },
    "illustration": "🏃 🤸 🦵",
    "illustrationSubtitle": {
      "th": "การกระโดดสองเท้าเสริมสร้างกล้ามเนื้อขาและการประสานสัมพันธ์",
      "en": "Jumping develops leg power and motor coordination",
      "zh": "体能游戏训练：双脚跳跃提升下肢爆发力与协调性"
    },
    "options": [
      {
        "id": "opt-k2-hea-m10-1",
        "label": {
          "th": "ทำให้ตัวเตี้ยลงเรื่อยๆ จนเหลือตัวนิดเดียว",
          "en": "Makes you shrink tiny",
          "zh": "使得身体越跳越矮，最后缩成一寸丁"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-hea-m10-2",
        "label": {
          "th": "เสริมสร้างพลังกล้ามเนื้อขา ความยืดหยุ่น และการประสานงานของสายตากับเท้า 🦵 🏃",
          "en": "Builds leg muscular power, dynamic balance, and eye-foot coordination",
          "zh": "极大地锻炼双腿肌肉群爆发力量、脚踝弹跳缓冲力及手眼脚运动协调性 🦵 🏃"
        },
        "icon": "🦵"
      },
      {
        "id": "opt-k2-hea-m10-3",
        "label": {
          "th": "ทำให้ข้อเท้าบิดหักตลอดไป",
          "en": "Permanently snaps ankles",
          "zh": "导致双脚脚踝永久性骨折报废"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k2-hea-m10-2",
    "explanation": {
      "th": "การกระโดดสองเท้าช่วยฝึกแรงสปริงของข้อเท้าและเสริมสร้างความแข็งแกร่งของกระดูก เก่งมากครับ!",
      "en": "Awesome! Jumping hurdles reinforces bone density and plyometric spring elasticity.",
      "zh": "太棒了！双脚连续跳跃能有效锻炼腿部弹跳力与落地下肢缓冲协调技巧。"
    }
  },
  {
    "id": "k2-hea-h1",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "ความปลอดภัยและสุขนิสัยระดับชั้นอนุบาล 2 ชุดที่ 1: เมื่อต้องเดินผ่าน \"พื้นที่ที่มีการก่อสร้างหรือปรับปรุงอาคาร\" 🚧 ข้อควรระวังสูงสุดคืออะไร?",
      "en": "K2 Safety Awareness #1: Walking near an active construction or renovation zone 🚧: What is paramount?",
      "zh": "幼儿园中班安全隐患防范第 1 题：放学路上途径“正在搭脚手架施工或旧楼翻修的建筑工地周围” 🚧 时，最核心的避险防范措施是？"
    },
    "illustration": "🚧 🦺 ⚠️",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยในเขตก่อสร้าง: อยู่ห่างและระวังวัตถุตกหล่น",
      "en": "Construction zone hazards: Keep clear distance",
      "zh": "工地施工安全防护：远离高空坠物与机械危险区"
    },
    "options": [
      {
        "id": "opt-k2-hea-h1-1",
        "label": {
          "th": "เก็บเศษเหล็กแหลมและตะปูสนิมขึ้นมาปาเล่น",
          "en": "Pick up rusty nails to throw at friends",
          "zh": "在地上随手捡拾带锈迹的尖锐长铁钉和碎玻璃互相扔掷打闹"
        },
        "icon": "🔩"
      },
      {
        "id": "opt-k2-hea-h1-2",
        "label": {
          "th": "แอบมุดรั้วเข้าไปวิ่งเล่นบนกองทราย",
          "en": "Sneak past fence to play in sand piles",
          "zh": "趁工人们不注意，偷溜钻过铁丝网爬到高高砂石堆上打滚滑滑梯"
        },
        "icon": "🟤"
      },
      {
        "id": "opt-k2-hea-h1-3",
        "label": {
          "th": "เดินห่างจากแนวก่อสร้าง ไม่เข้าไปในเขตกั้น และระมัดระวังวัตถุที่อาจตกหล่นจากที่สูง 🚧 ⛑️",
          "en": "Keep far away from barricades, never trespass, and beware falling debris hazards",
          "zh": "在家长牵引下快步绕开安全警示线、绝不进入围栏内，警惕上方可能坠落的重物 🚧 ⛑️"
        },
        "icon": "🚧"
      }
    ],
    "correctOptionId": "opt-k2-hea-h1-3",
    "explanation": {
      "th": "เขตก่อสร้างมีอันตรายจากเครื่องจักรและของตกใส่ศีรษะ ต้องหลีกเลี่ยงเสมอ เก่งมากครับ!",
      "en": "Correct! Construction perimeters contain crush hazards, heavy machinery, and falling debris.",
      "zh": "答对了！施工重地危险莫测，严禁翻越护栏玩耍，时刻防范高空坠物。"
    }
  },
  {
    "id": "k2-hea-h2",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "ความปลอดภัยและสุขนิสัยระดับชั้นอนุบาล 2 ชุดที่ 2: เมื่อต้องเดินผ่าน \"พื้นที่ที่มีการก่อสร้างหรือปรับปรุงอาคาร\" 🚧 ข้อควรระวังสูงสุดคืออะไร?",
      "en": "K2 Safety Awareness #2: Walking near an active construction or renovation zone 🚧: What is paramount?",
      "zh": "幼儿园中班安全隐患防范第 2 题：放学路上途径“正在搭脚手架施工或旧楼翻修的建筑工地周围” 🚧 时，最核心的避险防范措施是？"
    },
    "illustration": "🚧 🦺 ⚠️",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยในเขตก่อสร้าง: อยู่ห่างและระวังวัตถุตกหล่น",
      "en": "Construction zone hazards: Keep clear distance",
      "zh": "工地施工安全防护：远离高空坠物与机械危险区"
    },
    "options": [
      {
        "id": "opt-k2-hea-h2-1",
        "label": {
          "th": "เดินห่างจากแนวก่อสร้าง ไม่เข้าไปในเขตกั้น และระมัดระวังวัตถุที่อาจตกหล่นจากที่สูง 🚧 ⛑️",
          "en": "Keep far away from barricades, never trespass, and beware falling debris hazards",
          "zh": "在家长牵引下快步绕开安全警示线、绝不进入围栏内，警惕上方可能坠落的重物 🚧 ⛑️"
        },
        "icon": "🚧"
      },
      {
        "id": "opt-k2-hea-h2-2",
        "label": {
          "th": "แอบมุดรั้วเข้าไปวิ่งเล่นบนกองทราย",
          "en": "Sneak past fence to play in sand piles",
          "zh": "趁工人们不注意，偷溜钻过铁丝网爬到高高砂石堆上打滚滑滑梯"
        },
        "icon": "🟤"
      },
      {
        "id": "opt-k2-hea-h2-3",
        "label": {
          "th": "เก็บเศษเหล็กแหลมและตะปูสนิมขึ้นมาปาเล่น",
          "en": "Pick up rusty nails to throw at friends",
          "zh": "在地上随手捡拾带锈迹的尖锐长铁钉和碎玻璃互相扔掷打闹"
        },
        "icon": "🔩"
      }
    ],
    "correctOptionId": "opt-k2-hea-h2-1",
    "explanation": {
      "th": "เขตก่อสร้างมีอันตรายจากเครื่องจักรและของตกใส่ศีรษะ ต้องหลีกเลี่ยงเสมอ เก่งมากครับ!",
      "en": "Correct! Construction perimeters contain crush hazards, heavy machinery, and falling debris.",
      "zh": "答对了！施工重地危险莫测，严禁翻越护栏玩耍，时刻防范高空坠物。"
    }
  },
  {
    "id": "k2-hea-h3",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "ความปลอดภัยและสุขนิสัยระดับชั้นอนุบาล 2 ชุดที่ 3: เมื่อต้องเดินผ่าน \"พื้นที่ที่มีการก่อสร้างหรือปรับปรุงอาคาร\" 🚧 ข้อควรระวังสูงสุดคืออะไร?",
      "en": "K2 Safety Awareness #3: Walking near an active construction or renovation zone 🚧: What is paramount?",
      "zh": "幼儿园中班安全隐患防范第 3 题：放学路上途径“正在搭脚手架施工或旧楼翻修的建筑工地周围” 🚧 时，最核心的避险防范措施是？"
    },
    "illustration": "🚧 🦺 ⚠️",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยในเขตก่อสร้าง: อยู่ห่างและระวังวัตถุตกหล่น",
      "en": "Construction zone hazards: Keep clear distance",
      "zh": "工地施工安全防护：远离高空坠物与机械危险区"
    },
    "options": [
      {
        "id": "opt-k2-hea-h3-1",
        "label": {
          "th": "แอบมุดรั้วเข้าไปวิ่งเล่นบนกองทราย",
          "en": "Sneak past fence to play in sand piles",
          "zh": "趁工人们不注意，偷溜钻过铁丝网爬到高高砂石堆上打滚滑滑梯"
        },
        "icon": "🟤"
      },
      {
        "id": "opt-k2-hea-h3-2",
        "label": {
          "th": "เดินห่างจากแนวก่อสร้าง ไม่เข้าไปในเขตกั้น และระมัดระวังวัตถุที่อาจตกหล่นจากที่สูง 🚧 ⛑️",
          "en": "Keep far away from barricades, never trespass, and beware falling debris hazards",
          "zh": "在家长牵引下快步绕开安全警示线、绝不进入围栏内，警惕上方可能坠落的重物 🚧 ⛑️"
        },
        "icon": "🚧"
      },
      {
        "id": "opt-k2-hea-h3-3",
        "label": {
          "th": "เก็บเศษเหล็กแหลมและตะปูสนิมขึ้นมาปาเล่น",
          "en": "Pick up rusty nails to throw at friends",
          "zh": "在地上随手捡拾带锈迹的尖锐长铁钉和碎玻璃互相扔掷打闹"
        },
        "icon": "🔩"
      }
    ],
    "correctOptionId": "opt-k2-hea-h3-2",
    "explanation": {
      "th": "เขตก่อสร้างมีอันตรายจากเครื่องจักรและของตกใส่ศีรษะ ต้องหลีกเลี่ยงเสมอ เก่งมากครับ!",
      "en": "Correct! Construction perimeters contain crush hazards, heavy machinery, and falling debris.",
      "zh": "答对了！施工重地危险莫测，严禁翻越护栏玩耍，时刻防范高空坠物。"
    }
  },
  {
    "id": "k2-hea-h4",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "ความปลอดภัยและสุขนิสัยระดับชั้นอนุบาล 2 ชุดที่ 4: เมื่อต้องเดินผ่าน \"พื้นที่ที่มีการก่อสร้างหรือปรับปรุงอาคาร\" 🚧 ข้อควรระวังสูงสุดคืออะไร?",
      "en": "K2 Safety Awareness #4: Walking near an active construction or renovation zone 🚧: What is paramount?",
      "zh": "幼儿园中班安全隐患防范第 4 题：放学路上途径“正在搭脚手架施工或旧楼翻修的建筑工地周围” 🚧 时，最核心的避险防范措施是？"
    },
    "illustration": "🚧 🦺 ⚠️",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยในเขตก่อสร้าง: อยู่ห่างและระวังวัตถุตกหล่น",
      "en": "Construction zone hazards: Keep clear distance",
      "zh": "工地施工安全防护：远离高空坠物与机械危险区"
    },
    "options": [
      {
        "id": "opt-k2-hea-h4-1",
        "label": {
          "th": "เก็บเศษเหล็กแหลมและตะปูสนิมขึ้นมาปาเล่น",
          "en": "Pick up rusty nails to throw at friends",
          "zh": "在地上随手捡拾带锈迹的尖锐长铁钉和碎玻璃互相扔掷打闹"
        },
        "icon": "🔩"
      },
      {
        "id": "opt-k2-hea-h4-2",
        "label": {
          "th": "แอบมุดรั้วเข้าไปวิ่งเล่นบนกองทราย",
          "en": "Sneak past fence to play in sand piles",
          "zh": "趁工人们不注意，偷溜钻过铁丝网爬到高高砂石堆上打滚滑滑梯"
        },
        "icon": "🟤"
      },
      {
        "id": "opt-k2-hea-h4-3",
        "label": {
          "th": "เดินห่างจากแนวก่อสร้าง ไม่เข้าไปในเขตกั้น และระมัดระวังวัตถุที่อาจตกหล่นจากที่สูง 🚧 ⛑️",
          "en": "Keep far away from barricades, never trespass, and beware falling debris hazards",
          "zh": "在家长牵引下快步绕开安全警示线、绝不进入围栏内，警惕上方可能坠落的重物 🚧 ⛑️"
        },
        "icon": "🚧"
      }
    ],
    "correctOptionId": "opt-k2-hea-h4-3",
    "explanation": {
      "th": "เขตก่อสร้างมีอันตรายจากเครื่องจักรและของตกใส่ศีรษะ ต้องหลีกเลี่ยงเสมอ เก่งมากครับ!",
      "en": "Correct! Construction perimeters contain crush hazards, heavy machinery, and falling debris.",
      "zh": "答对了！施工重地危险莫测，严禁翻越护栏玩耍，时刻防范高空坠物。"
    }
  },
  {
    "id": "k2-hea-h5",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "ความปลอดภัยและสุขนิสัยระดับชั้นอนุบาล 2 ชุดที่ 5: เมื่อต้องเดินผ่าน \"พื้นที่ที่มีการก่อสร้างหรือปรับปรุงอาคาร\" 🚧 ข้อควรระวังสูงสุดคืออะไร?",
      "en": "K2 Safety Awareness #5: Walking near an active construction or renovation zone 🚧: What is paramount?",
      "zh": "幼儿园中班安全隐患防范第 5 题：放学路上途径“正在搭脚手架施工或旧楼翻修的建筑工地周围” 🚧 时，最核心的避险防范措施是？"
    },
    "illustration": "🚧 🦺 ⚠️",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยในเขตก่อสร้าง: อยู่ห่างและระวังวัตถุตกหล่น",
      "en": "Construction zone hazards: Keep clear distance",
      "zh": "工地施工安全防护：远离高空坠物与机械危险区"
    },
    "options": [
      {
        "id": "opt-k2-hea-h5-1",
        "label": {
          "th": "เดินห่างจากแนวก่อสร้าง ไม่เข้าไปในเขตกั้น และระมัดระวังวัตถุที่อาจตกหล่นจากที่สูง 🚧 ⛑️",
          "en": "Keep far away from barricades, never trespass, and beware falling debris hazards",
          "zh": "在家长牵引下快步绕开安全警示线、绝不进入围栏内，警惕上方可能坠落的重物 🚧 ⛑️"
        },
        "icon": "🚧"
      },
      {
        "id": "opt-k2-hea-h5-2",
        "label": {
          "th": "แอบมุดรั้วเข้าไปวิ่งเล่นบนกองทราย",
          "en": "Sneak past fence to play in sand piles",
          "zh": "趁工人们不注意，偷溜钻过铁丝网爬到高高砂石堆上打滚滑滑梯"
        },
        "icon": "🟤"
      },
      {
        "id": "opt-k2-hea-h5-3",
        "label": {
          "th": "เก็บเศษเหล็กแหลมและตะปูสนิมขึ้นมาปาเล่น",
          "en": "Pick up rusty nails to throw at friends",
          "zh": "在地上随手捡拾带锈迹的尖锐长铁钉和碎玻璃互相扔掷打闹"
        },
        "icon": "🔩"
      }
    ],
    "correctOptionId": "opt-k2-hea-h5-1",
    "explanation": {
      "th": "เขตก่อสร้างมีอันตรายจากเครื่องจักรและของตกใส่ศีรษะ ต้องหลีกเลี่ยงเสมอ เก่งมากครับ!",
      "en": "Correct! Construction perimeters contain crush hazards, heavy machinery, and falling debris.",
      "zh": "答对了！施工重地危险莫测，严禁翻越护栏玩耍，时刻防范高空坠物。"
    }
  },
  {
    "id": "k2-hea-h6",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "ความปลอดภัยและสุขนิสัยระดับชั้นอนุบาล 2 ชุดที่ 6: เมื่อต้องเดินผ่าน \"พื้นที่ที่มีการก่อสร้างหรือปรับปรุงอาคาร\" 🚧 ข้อควรระวังสูงสุดคืออะไร?",
      "en": "K2 Safety Awareness #6: Walking near an active construction or renovation zone 🚧: What is paramount?",
      "zh": "幼儿园中班安全隐患防范第 6 题：放学路上途径“正在搭脚手架施工或旧楼翻修的建筑工地周围” 🚧 时，最核心的避险防范措施是？"
    },
    "illustration": "🚧 🦺 ⚠️",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยในเขตก่อสร้าง: อยู่ห่างและระวังวัตถุตกหล่น",
      "en": "Construction zone hazards: Keep clear distance",
      "zh": "工地施工安全防护：远离高空坠物与机械危险区"
    },
    "options": [
      {
        "id": "opt-k2-hea-h6-1",
        "label": {
          "th": "แอบมุดรั้วเข้าไปวิ่งเล่นบนกองทราย",
          "en": "Sneak past fence to play in sand piles",
          "zh": "趁工人们不注意，偷溜钻过铁丝网爬到高高砂石堆上打滚滑滑梯"
        },
        "icon": "🟤"
      },
      {
        "id": "opt-k2-hea-h6-2",
        "label": {
          "th": "เดินห่างจากแนวก่อสร้าง ไม่เข้าไปในเขตกั้น และระมัดระวังวัตถุที่อาจตกหล่นจากที่สูง 🚧 ⛑️",
          "en": "Keep far away from barricades, never trespass, and beware falling debris hazards",
          "zh": "在家长牵引下快步绕开安全警示线、绝不进入围栏内，警惕上方可能坠落的重物 🚧 ⛑️"
        },
        "icon": "🚧"
      },
      {
        "id": "opt-k2-hea-h6-3",
        "label": {
          "th": "เก็บเศษเหล็กแหลมและตะปูสนิมขึ้นมาปาเล่น",
          "en": "Pick up rusty nails to throw at friends",
          "zh": "在地上随手捡拾带锈迹的尖锐长铁钉和碎玻璃互相扔掷打闹"
        },
        "icon": "🔩"
      }
    ],
    "correctOptionId": "opt-k2-hea-h6-2",
    "explanation": {
      "th": "เขตก่อสร้างมีอันตรายจากเครื่องจักรและของตกใส่ศีรษะ ต้องหลีกเลี่ยงเสมอ เก่งมากครับ!",
      "en": "Correct! Construction perimeters contain crush hazards, heavy machinery, and falling debris.",
      "zh": "答对了！施工重地危险莫测，严禁翻越护栏玩耍，时刻防范高空坠物。"
    }
  },
  {
    "id": "k2-hea-h7",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "ความปลอดภัยและสุขนิสัยระดับชั้นอนุบาล 2 ชุดที่ 7: เมื่อต้องเดินผ่าน \"พื้นที่ที่มีการก่อสร้างหรือปรับปรุงอาคาร\" 🚧 ข้อควรระวังสูงสุดคืออะไร?",
      "en": "K2 Safety Awareness #7: Walking near an active construction or renovation zone 🚧: What is paramount?",
      "zh": "幼儿园中班安全隐患防范第 7 题：放学路上途径“正在搭脚手架施工或旧楼翻修的建筑工地周围” 🚧 时，最核心的避险防范措施是？"
    },
    "illustration": "🚧 🦺 ⚠️",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยในเขตก่อสร้าง: อยู่ห่างและระวังวัตถุตกหล่น",
      "en": "Construction zone hazards: Keep clear distance",
      "zh": "工地施工安全防护：远离高空坠物与机械危险区"
    },
    "options": [
      {
        "id": "opt-k2-hea-h7-1",
        "label": {
          "th": "เก็บเศษเหล็กแหลมและตะปูสนิมขึ้นมาปาเล่น",
          "en": "Pick up rusty nails to throw at friends",
          "zh": "在地上随手捡拾带锈迹的尖锐长铁钉和碎玻璃互相扔掷打闹"
        },
        "icon": "🔩"
      },
      {
        "id": "opt-k2-hea-h7-2",
        "label": {
          "th": "แอบมุดรั้วเข้าไปวิ่งเล่นบนกองทราย",
          "en": "Sneak past fence to play in sand piles",
          "zh": "趁工人们不注意，偷溜钻过铁丝网爬到高高砂石堆上打滚滑滑梯"
        },
        "icon": "🟤"
      },
      {
        "id": "opt-k2-hea-h7-3",
        "label": {
          "th": "เดินห่างจากแนวก่อสร้าง ไม่เข้าไปในเขตกั้น และระมัดระวังวัตถุที่อาจตกหล่นจากที่สูง 🚧 ⛑️",
          "en": "Keep far away from barricades, never trespass, and beware falling debris hazards",
          "zh": "在家长牵引下快步绕开安全警示线、绝不进入围栏内，警惕上方可能坠落的重物 🚧 ⛑️"
        },
        "icon": "🚧"
      }
    ],
    "correctOptionId": "opt-k2-hea-h7-3",
    "explanation": {
      "th": "เขตก่อสร้างมีอันตรายจากเครื่องจักรและของตกใส่ศีรษะ ต้องหลีกเลี่ยงเสมอ เก่งมากครับ!",
      "en": "Correct! Construction perimeters contain crush hazards, heavy machinery, and falling debris.",
      "zh": "答对了！施工重地危险莫测，严禁翻越护栏玩耍，时刻防范高空坠物。"
    }
  },
  {
    "id": "k2-hea-h8",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "ความปลอดภัยและสุขนิสัยระดับชั้นอนุบาล 2 ชุดที่ 8: เมื่อต้องเดินผ่าน \"พื้นที่ที่มีการก่อสร้างหรือปรับปรุงอาคาร\" 🚧 ข้อควรระวังสูงสุดคืออะไร?",
      "en": "K2 Safety Awareness #8: Walking near an active construction or renovation zone 🚧: What is paramount?",
      "zh": "幼儿园中班安全隐患防范第 8 题：放学路上途径“正在搭脚手架施工或旧楼翻修的建筑工地周围” 🚧 时，最核心的避险防范措施是？"
    },
    "illustration": "🚧 🦺 ⚠️",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยในเขตก่อสร้าง: อยู่ห่างและระวังวัตถุตกหล่น",
      "en": "Construction zone hazards: Keep clear distance",
      "zh": "工地施工安全防护：远离高空坠物与机械危险区"
    },
    "options": [
      {
        "id": "opt-k2-hea-h8-1",
        "label": {
          "th": "เดินห่างจากแนวก่อสร้าง ไม่เข้าไปในเขตกั้น และระมัดระวังวัตถุที่อาจตกหล่นจากที่สูง 🚧 ⛑️",
          "en": "Keep far away from barricades, never trespass, and beware falling debris hazards",
          "zh": "在家长牵引下快步绕开安全警示线、绝不进入围栏内，警惕上方可能坠落的重物 🚧 ⛑️"
        },
        "icon": "🚧"
      },
      {
        "id": "opt-k2-hea-h8-2",
        "label": {
          "th": "แอบมุดรั้วเข้าไปวิ่งเล่นบนกองทราย",
          "en": "Sneak past fence to play in sand piles",
          "zh": "趁工人们不注意，偷溜钻过铁丝网爬到高高砂石堆上打滚滑滑梯"
        },
        "icon": "🟤"
      },
      {
        "id": "opt-k2-hea-h8-3",
        "label": {
          "th": "เก็บเศษเหล็กแหลมและตะปูสนิมขึ้นมาปาเล่น",
          "en": "Pick up rusty nails to throw at friends",
          "zh": "在地上随手捡拾带锈迹的尖锐长铁钉和碎玻璃互相扔掷打闹"
        },
        "icon": "🔩"
      }
    ],
    "correctOptionId": "opt-k2-hea-h8-1",
    "explanation": {
      "th": "เขตก่อสร้างมีอันตรายจากเครื่องจักรและของตกใส่ศีรษะ ต้องหลีกเลี่ยงเสมอ เก่งมากครับ!",
      "en": "Correct! Construction perimeters contain crush hazards, heavy machinery, and falling debris.",
      "zh": "答对了！施工重地危险莫测，严禁翻越护栏玩耍，时刻防范高空坠物。"
    }
  },
  {
    "id": "k2-hea-h9",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "ความปลอดภัยและสุขนิสัยระดับชั้นอนุบาล 2 ชุดที่ 9: เมื่อต้องเดินผ่าน \"พื้นที่ที่มีการก่อสร้างหรือปรับปรุงอาคาร\" 🚧 ข้อควรระวังสูงสุดคืออะไร?",
      "en": "K2 Safety Awareness #9: Walking near an active construction or renovation zone 🚧: What is paramount?",
      "zh": "幼儿园中班安全隐患防范第 9 题：放学路上途径“正在搭脚手架施工或旧楼翻修的建筑工地周围” 🚧 时，最核心的避险防范措施是？"
    },
    "illustration": "🚧 🦺 ⚠️",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยในเขตก่อสร้าง: อยู่ห่างและระวังวัตถุตกหล่น",
      "en": "Construction zone hazards: Keep clear distance",
      "zh": "工地施工安全防护：远离高空坠物与机械危险区"
    },
    "options": [
      {
        "id": "opt-k2-hea-h9-1",
        "label": {
          "th": "แอบมุดรั้วเข้าไปวิ่งเล่นบนกองทราย",
          "en": "Sneak past fence to play in sand piles",
          "zh": "趁工人们不注意，偷溜钻过铁丝网爬到高高砂石堆上打滚滑滑梯"
        },
        "icon": "🟤"
      },
      {
        "id": "opt-k2-hea-h9-2",
        "label": {
          "th": "เดินห่างจากแนวก่อสร้าง ไม่เข้าไปในเขตกั้น และระมัดระวังวัตถุที่อาจตกหล่นจากที่สูง 🚧 ⛑️",
          "en": "Keep far away from barricades, never trespass, and beware falling debris hazards",
          "zh": "在家长牵引下快步绕开安全警示线、绝不进入围栏内，警惕上方可能坠落的重物 🚧 ⛑️"
        },
        "icon": "🚧"
      },
      {
        "id": "opt-k2-hea-h9-3",
        "label": {
          "th": "เก็บเศษเหล็กแหลมและตะปูสนิมขึ้นมาปาเล่น",
          "en": "Pick up rusty nails to throw at friends",
          "zh": "在地上随手捡拾带锈迹的尖锐长铁钉和碎玻璃互相扔掷打闹"
        },
        "icon": "🔩"
      }
    ],
    "correctOptionId": "opt-k2-hea-h9-2",
    "explanation": {
      "th": "เขตก่อสร้างมีอันตรายจากเครื่องจักรและของตกใส่ศีรษะ ต้องหลีกเลี่ยงเสมอ เก่งมากครับ!",
      "en": "Correct! Construction perimeters contain crush hazards, heavy machinery, and falling debris.",
      "zh": "答对了！施工重地危险莫测，严禁翻越护栏玩耍，时刻防范高空坠物。"
    }
  },
  {
    "id": "k2-hea-h10",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "ความปลอดภัยและสุขนิสัยระดับชั้นอนุบาล 2 ชุดที่ 10: เมื่อต้องเดินผ่าน \"พื้นที่ที่มีการก่อสร้างหรือปรับปรุงอาคาร\" 🚧 ข้อควรระวังสูงสุดคืออะไร?",
      "en": "K2 Safety Awareness #10: Walking near an active construction or renovation zone 🚧: What is paramount?",
      "zh": "幼儿园中班安全隐患防范第 10 题：放学路上途径“正在搭脚手架施工或旧楼翻修的建筑工地周围” 🚧 时，最核心的避险防范措施是？"
    },
    "illustration": "🚧 🦺 ⚠️",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยในเขตก่อสร้าง: อยู่ห่างและระวังวัตถุตกหล่น",
      "en": "Construction zone hazards: Keep clear distance",
      "zh": "工地施工安全防护：远离高空坠物与机械危险区"
    },
    "options": [
      {
        "id": "opt-k2-hea-h10-1",
        "label": {
          "th": "เก็บเศษเหล็กแหลมและตะปูสนิมขึ้นมาปาเล่น",
          "en": "Pick up rusty nails to throw at friends",
          "zh": "在地上随手捡拾带锈迹的尖锐长铁钉和碎玻璃互相扔掷打闹"
        },
        "icon": "🔩"
      },
      {
        "id": "opt-k2-hea-h10-2",
        "label": {
          "th": "แอบมุดรั้วเข้าไปวิ่งเล่นบนกองทราย",
          "en": "Sneak past fence to play in sand piles",
          "zh": "趁工人们不注意，偷溜钻过铁丝网爬到高高砂石堆上打滚滑滑梯"
        },
        "icon": "🟤"
      },
      {
        "id": "opt-k2-hea-h10-3",
        "label": {
          "th": "เดินห่างจากแนวก่อสร้าง ไม่เข้าไปในเขตกั้น และระมัดระวังวัตถุที่อาจตกหล่นจากที่สูง 🚧 ⛑️",
          "en": "Keep far away from barricades, never trespass, and beware falling debris hazards",
          "zh": "在家长牵引下快步绕开安全警示线、绝不进入围栏内，警惕上方可能坠落的重物 🚧 ⛑️"
        },
        "icon": "🚧"
      }
    ],
    "correctOptionId": "opt-k2-hea-h10-3",
    "explanation": {
      "th": "เขตก่อสร้างมีอันตรายจากเครื่องจักรและของตกใส่ศีรษะ ต้องหลีกเลี่ยงเสมอ เก่งมากครับ!",
      "en": "Correct! Construction perimeters contain crush hazards, heavy machinery, and falling debris.",
      "zh": "答对了！施工重地危险莫测，严禁翻越护栏玩耍，时刻防范高空坠物。"
    }
  },
  {
    "id": "k3-hea-e1",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "วิทยาศาสตร์สุขภาพและร่างกายระดับชั้นอนุบาล 3 ชุดที่ 1: การที่ร่างกายของเด็กๆ \"ได้รับแสงแดดอ่อนๆ ยามเช้า\" 🌅 ช่วยสังเคราะห์วิตามินสำคัญใด?",
      "en": "K3 Health Science #1: Gentle MORNING SUNSHINE 🌅 on skin enables synthesis of which crucial vitamin?",
      "zh": "幼儿园大班健康科学素养第 1 题：清晨户外的“柔和朝阳温和光照” 🌅 照射在皮肤上，能激发我们人体自然合成哪种对骨骼至关重要的维生素？"
    },
    "illustration": "🌅 ☀️ 🦴",
    "illustrationSubtitle": {
      "th": "วิตามินดีจากแสงแดดยามเช้าบำรุงกระดูก",
      "en": "Morning sunlight synthesizes Vitamin D",
      "zh": "健康科普常识：清晨晒太阳促成合成维生素D"
    },
    "options": [
      {
        "id": "opt-k3-hea-e1-1",
        "label": {
          "th": "วิตามินดี (Vitamin D) ช่วยในการดูดซึมแคลเซียมเพื่อเสริมสร้างกระดูกและฟัน 🦴 ☀️",
          "en": "Vitamin D, which aids calcium absorption for dense bones and teeth",
          "zh": "珍贵的维生素 D，能强力促进肠道对钙质的吸收，使骨骼牙齿坚韧挺拔 🦴 ☀️"
        },
        "icon": "☀️"
      },
      {
        "id": "opt-k3-hea-e1-2",
        "label": {
          "th": "วิตามินซีสำหรับทาเล็บ",
          "en": "Vitamin C for polishing fingernails",
          "zh": "用来涂染指甲的奇特外用维生素C"
        },
        "icon": "💅"
      },
      {
        "id": "opt-k3-hea-e1-3",
        "label": {
          "th": "น้ำตาลกลูโคสทำให้เหงื่อออกเป็นน้ำหวาน",
          "en": "Glucose making sweet sweat",
          "zh": "使人体排出的汗液变成甜滋滋糖浆的葡萄糖"
        },
        "icon": "🍯"
      }
    ],
    "correctOptionId": "opt-k3-hea-e1-1",
    "explanation": {
      "th": "แสงแดดยามเช้ากระตุ้นการสร้างวิตามินดี ช่วยให้ร่างกายดูดซึมแคลเซียมได้เต็มประสิทธิภาพ เก่งมากครับ!",
      "en": "Awesome! Sun exposure on skin triggers endogenous Vitamin D synthesis.",
      "zh": "太棒了！适度沐浴清晨阳光能补充天然维生素D，助力骨骼钙质沉淀。"
    }
  },
  {
    "id": "k3-hea-e2",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "วิทยาศาสตร์สุขภาพและร่างกายระดับชั้นอนุบาล 3 ชุดที่ 2: การที่ร่างกายของเด็กๆ \"ได้รับแสงแดดอ่อนๆ ยามเช้า\" 🌅 ช่วยสังเคราะห์วิตามินสำคัญใด?",
      "en": "K3 Health Science #2: Gentle MORNING SUNSHINE 🌅 on skin enables synthesis of which crucial vitamin?",
      "zh": "幼儿园大班健康科学素养第 2 题：清晨户外的“柔和朝阳温和光照” 🌅 照射在皮肤上，能激发我们人体自然合成哪种对骨骼至关重要的维生素？"
    },
    "illustration": "🌅 ☀️ 🦴",
    "illustrationSubtitle": {
      "th": "วิตามินดีจากแสงแดดยามเช้าบำรุงกระดูก",
      "en": "Morning sunlight synthesizes Vitamin D",
      "zh": "健康科普常识：清晨晒太阳促成合成维生素D"
    },
    "options": [
      {
        "id": "opt-k3-hea-e2-1",
        "label": {
          "th": "วิตามินซีสำหรับทาเล็บ",
          "en": "Vitamin C for polishing fingernails",
          "zh": "用来涂染指甲的奇特外用维生素C"
        },
        "icon": "💅"
      },
      {
        "id": "opt-k3-hea-e2-2",
        "label": {
          "th": "วิตามินดี (Vitamin D) ช่วยในการดูดซึมแคลเซียมเพื่อเสริมสร้างกระดูกและฟัน 🦴 ☀️",
          "en": "Vitamin D, which aids calcium absorption for dense bones and teeth",
          "zh": "珍贵的维生素 D，能强力促进肠道对钙质的吸收，使骨骼牙齿坚韧挺拔 🦴 ☀️"
        },
        "icon": "☀️"
      },
      {
        "id": "opt-k3-hea-e2-3",
        "label": {
          "th": "น้ำตาลกลูโคสทำให้เหงื่อออกเป็นน้ำหวาน",
          "en": "Glucose making sweet sweat",
          "zh": "使人体排出的汗液变成甜滋滋糖浆的葡萄糖"
        },
        "icon": "🍯"
      }
    ],
    "correctOptionId": "opt-k3-hea-e2-2",
    "explanation": {
      "th": "แสงแดดยามเช้ากระตุ้นการสร้างวิตามินดี ช่วยให้ร่างกายดูดซึมแคลเซียมได้เต็มประสิทธิภาพ เก่งมากครับ!",
      "en": "Awesome! Sun exposure on skin triggers endogenous Vitamin D synthesis.",
      "zh": "太棒了！适度沐浴清晨阳光能补充天然维生素D，助力骨骼钙质沉淀。"
    }
  },
  {
    "id": "k3-hea-e3",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "วิทยาศาสตร์สุขภาพและร่างกายระดับชั้นอนุบาล 3 ชุดที่ 3: การที่ร่างกายของเด็กๆ \"ได้รับแสงแดดอ่อนๆ ยามเช้า\" 🌅 ช่วยสังเคราะห์วิตามินสำคัญใด?",
      "en": "K3 Health Science #3: Gentle MORNING SUNSHINE 🌅 on skin enables synthesis of which crucial vitamin?",
      "zh": "幼儿园大班健康科学素养第 3 题：清晨户外的“柔和朝阳温和光照” 🌅 照射在皮肤上，能激发我们人体自然合成哪种对骨骼至关重要的维生素？"
    },
    "illustration": "🌅 ☀️ 🦴",
    "illustrationSubtitle": {
      "th": "วิตามินดีจากแสงแดดยามเช้าบำรุงกระดูก",
      "en": "Morning sunlight synthesizes Vitamin D",
      "zh": "健康科普常识：清晨晒太阳促成合成维生素D"
    },
    "options": [
      {
        "id": "opt-k3-hea-e3-1",
        "label": {
          "th": "น้ำตาลกลูโคสทำให้เหงื่อออกเป็นน้ำหวาน",
          "en": "Glucose making sweet sweat",
          "zh": "使人体排出的汗液变成甜滋滋糖浆的葡萄糖"
        },
        "icon": "🍯"
      },
      {
        "id": "opt-k3-hea-e3-2",
        "label": {
          "th": "วิตามินซีสำหรับทาเล็บ",
          "en": "Vitamin C for polishing fingernails",
          "zh": "用来涂染指甲的奇特外用维生素C"
        },
        "icon": "💅"
      },
      {
        "id": "opt-k3-hea-e3-3",
        "label": {
          "th": "วิตามินดี (Vitamin D) ช่วยในการดูดซึมแคลเซียมเพื่อเสริมสร้างกระดูกและฟัน 🦴 ☀️",
          "en": "Vitamin D, which aids calcium absorption for dense bones and teeth",
          "zh": "珍贵的维生素 D，能强力促进肠道对钙质的吸收，使骨骼牙齿坚韧挺拔 🦴 ☀️"
        },
        "icon": "☀️"
      }
    ],
    "correctOptionId": "opt-k3-hea-e3-3",
    "explanation": {
      "th": "แสงแดดยามเช้ากระตุ้นการสร้างวิตามินดี ช่วยให้ร่างกายดูดซึมแคลเซียมได้เต็มประสิทธิภาพ เก่งมากครับ!",
      "en": "Awesome! Sun exposure on skin triggers endogenous Vitamin D synthesis.",
      "zh": "太棒了！适度沐浴清晨阳光能补充天然维生素D，助力骨骼钙质沉淀。"
    }
  },
  {
    "id": "k3-hea-e4",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "วิทยาศาสตร์สุขภาพและร่างกายระดับชั้นอนุบาล 3 ชุดที่ 4: การที่ร่างกายของเด็กๆ \"ได้รับแสงแดดอ่อนๆ ยามเช้า\" 🌅 ช่วยสังเคราะห์วิตามินสำคัญใด?",
      "en": "K3 Health Science #4: Gentle MORNING SUNSHINE 🌅 on skin enables synthesis of which crucial vitamin?",
      "zh": "幼儿园大班健康科学素养第 4 题：清晨户外的“柔和朝阳温和光照” 🌅 照射在皮肤上，能激发我们人体自然合成哪种对骨骼至关重要的维生素？"
    },
    "illustration": "🌅 ☀️ 🦴",
    "illustrationSubtitle": {
      "th": "วิตามินดีจากแสงแดดยามเช้าบำรุงกระดูก",
      "en": "Morning sunlight synthesizes Vitamin D",
      "zh": "健康科普常识：清晨晒太阳促成合成维生素D"
    },
    "options": [
      {
        "id": "opt-k3-hea-e4-1",
        "label": {
          "th": "วิตามินดี (Vitamin D) ช่วยในการดูดซึมแคลเซียมเพื่อเสริมสร้างกระดูกและฟัน 🦴 ☀️",
          "en": "Vitamin D, which aids calcium absorption for dense bones and teeth",
          "zh": "珍贵的维生素 D，能强力促进肠道对钙质的吸收，使骨骼牙齿坚韧挺拔 🦴 ☀️"
        },
        "icon": "☀️"
      },
      {
        "id": "opt-k3-hea-e4-2",
        "label": {
          "th": "วิตามินซีสำหรับทาเล็บ",
          "en": "Vitamin C for polishing fingernails",
          "zh": "用来涂染指甲的奇特外用维生素C"
        },
        "icon": "💅"
      },
      {
        "id": "opt-k3-hea-e4-3",
        "label": {
          "th": "น้ำตาลกลูโคสทำให้เหงื่อออกเป็นน้ำหวาน",
          "en": "Glucose making sweet sweat",
          "zh": "使人体排出的汗液变成甜滋滋糖浆的葡萄糖"
        },
        "icon": "🍯"
      }
    ],
    "correctOptionId": "opt-k3-hea-e4-1",
    "explanation": {
      "th": "แสงแดดยามเช้ากระตุ้นการสร้างวิตามินดี ช่วยให้ร่างกายดูดซึมแคลเซียมได้เต็มประสิทธิภาพ เก่งมากครับ!",
      "en": "Awesome! Sun exposure on skin triggers endogenous Vitamin D synthesis.",
      "zh": "太棒了！适度沐浴清晨阳光能补充天然维生素D，助力骨骼钙质沉淀。"
    }
  },
  {
    "id": "k3-hea-e5",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "วิทยาศาสตร์สุขภาพและร่างกายระดับชั้นอนุบาล 3 ชุดที่ 5: การที่ร่างกายของเด็กๆ \"ได้รับแสงแดดอ่อนๆ ยามเช้า\" 🌅 ช่วยสังเคราะห์วิตามินสำคัญใด?",
      "en": "K3 Health Science #5: Gentle MORNING SUNSHINE 🌅 on skin enables synthesis of which crucial vitamin?",
      "zh": "幼儿园大班健康科学素养第 5 题：清晨户外的“柔和朝阳温和光照” 🌅 照射在皮肤上，能激发我们人体自然合成哪种对骨骼至关重要的维生素？"
    },
    "illustration": "🌅 ☀️ 🦴",
    "illustrationSubtitle": {
      "th": "วิตามินดีจากแสงแดดยามเช้าบำรุงกระดูก",
      "en": "Morning sunlight synthesizes Vitamin D",
      "zh": "健康科普常识：清晨晒太阳促成合成维生素D"
    },
    "options": [
      {
        "id": "opt-k3-hea-e5-1",
        "label": {
          "th": "วิตามินซีสำหรับทาเล็บ",
          "en": "Vitamin C for polishing fingernails",
          "zh": "用来涂染指甲的奇特外用维生素C"
        },
        "icon": "💅"
      },
      {
        "id": "opt-k3-hea-e5-2",
        "label": {
          "th": "วิตามินดี (Vitamin D) ช่วยในการดูดซึมแคลเซียมเพื่อเสริมสร้างกระดูกและฟัน 🦴 ☀️",
          "en": "Vitamin D, which aids calcium absorption for dense bones and teeth",
          "zh": "珍贵的维生素 D，能强力促进肠道对钙质的吸收，使骨骼牙齿坚韧挺拔 🦴 ☀️"
        },
        "icon": "☀️"
      },
      {
        "id": "opt-k3-hea-e5-3",
        "label": {
          "th": "น้ำตาลกลูโคสทำให้เหงื่อออกเป็นน้ำหวาน",
          "en": "Glucose making sweet sweat",
          "zh": "使人体排出的汗液变成甜滋滋糖浆的葡萄糖"
        },
        "icon": "🍯"
      }
    ],
    "correctOptionId": "opt-k3-hea-e5-2",
    "explanation": {
      "th": "แสงแดดยามเช้ากระตุ้นการสร้างวิตามินดี ช่วยให้ร่างกายดูดซึมแคลเซียมได้เต็มประสิทธิภาพ เก่งมากครับ!",
      "en": "Awesome! Sun exposure on skin triggers endogenous Vitamin D synthesis.",
      "zh": "太棒了！适度沐浴清晨阳光能补充天然维生素D，助力骨骼钙质沉淀。"
    }
  },
  {
    "id": "k3-hea-e6",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "วิทยาศาสตร์สุขภาพและร่างกายระดับชั้นอนุบาล 3 ชุดที่ 6: การที่ร่างกายของเด็กๆ \"ได้รับแสงแดดอ่อนๆ ยามเช้า\" 🌅 ช่วยสังเคราะห์วิตามินสำคัญใด?",
      "en": "K3 Health Science #6: Gentle MORNING SUNSHINE 🌅 on skin enables synthesis of which crucial vitamin?",
      "zh": "幼儿园大班健康科学素养第 6 题：清晨户外的“柔和朝阳温和光照” 🌅 照射在皮肤上，能激发我们人体自然合成哪种对骨骼至关重要的维生素？"
    },
    "illustration": "🌅 ☀️ 🦴",
    "illustrationSubtitle": {
      "th": "วิตามินดีจากแสงแดดยามเช้าบำรุงกระดูก",
      "en": "Morning sunlight synthesizes Vitamin D",
      "zh": "健康科普常识：清晨晒太阳促成合成维生素D"
    },
    "options": [
      {
        "id": "opt-k3-hea-e6-1",
        "label": {
          "th": "น้ำตาลกลูโคสทำให้เหงื่อออกเป็นน้ำหวาน",
          "en": "Glucose making sweet sweat",
          "zh": "使人体排出的汗液变成甜滋滋糖浆的葡萄糖"
        },
        "icon": "🍯"
      },
      {
        "id": "opt-k3-hea-e6-2",
        "label": {
          "th": "วิตามินซีสำหรับทาเล็บ",
          "en": "Vitamin C for polishing fingernails",
          "zh": "用来涂染指甲的奇特外用维生素C"
        },
        "icon": "💅"
      },
      {
        "id": "opt-k3-hea-e6-3",
        "label": {
          "th": "วิตามินดี (Vitamin D) ช่วยในการดูดซึมแคลเซียมเพื่อเสริมสร้างกระดูกและฟัน 🦴 ☀️",
          "en": "Vitamin D, which aids calcium absorption for dense bones and teeth",
          "zh": "珍贵的维生素 D，能强力促进肠道对钙质的吸收，使骨骼牙齿坚韧挺拔 🦴 ☀️"
        },
        "icon": "☀️"
      }
    ],
    "correctOptionId": "opt-k3-hea-e6-3",
    "explanation": {
      "th": "แสงแดดยามเช้ากระตุ้นการสร้างวิตามินดี ช่วยให้ร่างกายดูดซึมแคลเซียมได้เต็มประสิทธิภาพ เก่งมากครับ!",
      "en": "Awesome! Sun exposure on skin triggers endogenous Vitamin D synthesis.",
      "zh": "太棒了！适度沐浴清晨阳光能补充天然维生素D，助力骨骼钙质沉淀。"
    }
  },
  {
    "id": "k3-hea-e7",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "วิทยาศาสตร์สุขภาพและร่างกายระดับชั้นอนุบาล 3 ชุดที่ 7: การที่ร่างกายของเด็กๆ \"ได้รับแสงแดดอ่อนๆ ยามเช้า\" 🌅 ช่วยสังเคราะห์วิตามินสำคัญใด?",
      "en": "K3 Health Science #7: Gentle MORNING SUNSHINE 🌅 on skin enables synthesis of which crucial vitamin?",
      "zh": "幼儿园大班健康科学素养第 7 题：清晨户外的“柔和朝阳温和光照” 🌅 照射在皮肤上，能激发我们人体自然合成哪种对骨骼至关重要的维生素？"
    },
    "illustration": "🌅 ☀️ 🦴",
    "illustrationSubtitle": {
      "th": "วิตามินดีจากแสงแดดยามเช้าบำรุงกระดูก",
      "en": "Morning sunlight synthesizes Vitamin D",
      "zh": "健康科普常识：清晨晒太阳促成合成维生素D"
    },
    "options": [
      {
        "id": "opt-k3-hea-e7-1",
        "label": {
          "th": "วิตามินดี (Vitamin D) ช่วยในการดูดซึมแคลเซียมเพื่อเสริมสร้างกระดูกและฟัน 🦴 ☀️",
          "en": "Vitamin D, which aids calcium absorption for dense bones and teeth",
          "zh": "珍贵的维生素 D，能强力促进肠道对钙质的吸收，使骨骼牙齿坚韧挺拔 🦴 ☀️"
        },
        "icon": "☀️"
      },
      {
        "id": "opt-k3-hea-e7-2",
        "label": {
          "th": "วิตามินซีสำหรับทาเล็บ",
          "en": "Vitamin C for polishing fingernails",
          "zh": "用来涂染指甲的奇特外用维生素C"
        },
        "icon": "💅"
      },
      {
        "id": "opt-k3-hea-e7-3",
        "label": {
          "th": "น้ำตาลกลูโคสทำให้เหงื่อออกเป็นน้ำหวาน",
          "en": "Glucose making sweet sweat",
          "zh": "使人体排出的汗液变成甜滋滋糖浆的葡萄糖"
        },
        "icon": "🍯"
      }
    ],
    "correctOptionId": "opt-k3-hea-e7-1",
    "explanation": {
      "th": "แสงแดดยามเช้ากระตุ้นการสร้างวิตามินดี ช่วยให้ร่างกายดูดซึมแคลเซียมได้เต็มประสิทธิภาพ เก่งมากครับ!",
      "en": "Awesome! Sun exposure on skin triggers endogenous Vitamin D synthesis.",
      "zh": "太棒了！适度沐浴清晨阳光能补充天然维生素D，助力骨骼钙质沉淀。"
    }
  },
  {
    "id": "k3-hea-e8",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "วิทยาศาสตร์สุขภาพและร่างกายระดับชั้นอนุบาล 3 ชุดที่ 8: การที่ร่างกายของเด็กๆ \"ได้รับแสงแดดอ่อนๆ ยามเช้า\" 🌅 ช่วยสังเคราะห์วิตามินสำคัญใด?",
      "en": "K3 Health Science #8: Gentle MORNING SUNSHINE 🌅 on skin enables synthesis of which crucial vitamin?",
      "zh": "幼儿园大班健康科学素养第 8 题：清晨户外的“柔和朝阳温和光照” 🌅 照射在皮肤上，能激发我们人体自然合成哪种对骨骼至关重要的维生素？"
    },
    "illustration": "🌅 ☀️ 🦴",
    "illustrationSubtitle": {
      "th": "วิตามินดีจากแสงแดดยามเช้าบำรุงกระดูก",
      "en": "Morning sunlight synthesizes Vitamin D",
      "zh": "健康科普常识：清晨晒太阳促成合成维生素D"
    },
    "options": [
      {
        "id": "opt-k3-hea-e8-1",
        "label": {
          "th": "วิตามินซีสำหรับทาเล็บ",
          "en": "Vitamin C for polishing fingernails",
          "zh": "用来涂染指甲的奇特外用维生素C"
        },
        "icon": "💅"
      },
      {
        "id": "opt-k3-hea-e8-2",
        "label": {
          "th": "วิตามินดี (Vitamin D) ช่วยในการดูดซึมแคลเซียมเพื่อเสริมสร้างกระดูกและฟัน 🦴 ☀️",
          "en": "Vitamin D, which aids calcium absorption for dense bones and teeth",
          "zh": "珍贵的维生素 D，能强力促进肠道对钙质的吸收，使骨骼牙齿坚韧挺拔 🦴 ☀️"
        },
        "icon": "☀️"
      },
      {
        "id": "opt-k3-hea-e8-3",
        "label": {
          "th": "น้ำตาลกลูโคสทำให้เหงื่อออกเป็นน้ำหวาน",
          "en": "Glucose making sweet sweat",
          "zh": "使人体排出的汗液变成甜滋滋糖浆的葡萄糖"
        },
        "icon": "🍯"
      }
    ],
    "correctOptionId": "opt-k3-hea-e8-2",
    "explanation": {
      "th": "แสงแดดยามเช้ากระตุ้นการสร้างวิตามินดี ช่วยให้ร่างกายดูดซึมแคลเซียมได้เต็มประสิทธิภาพ เก่งมากครับ!",
      "en": "Awesome! Sun exposure on skin triggers endogenous Vitamin D synthesis.",
      "zh": "太棒了！适度沐浴清晨阳光能补充天然维生素D，助力骨骼钙质沉淀。"
    }
  },
  {
    "id": "k3-hea-e9",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "วิทยาศาสตร์สุขภาพและร่างกายระดับชั้นอนุบาล 3 ชุดที่ 9: การที่ร่างกายของเด็กๆ \"ได้รับแสงแดดอ่อนๆ ยามเช้า\" 🌅 ช่วยสังเคราะห์วิตามินสำคัญใด?",
      "en": "K3 Health Science #9: Gentle MORNING SUNSHINE 🌅 on skin enables synthesis of which crucial vitamin?",
      "zh": "幼儿园大班健康科学素养第 9 题：清晨户外的“柔和朝阳温和光照” 🌅 照射在皮肤上，能激发我们人体自然合成哪种对骨骼至关重要的维生素？"
    },
    "illustration": "🌅 ☀️ 🦴",
    "illustrationSubtitle": {
      "th": "วิตามินดีจากแสงแดดยามเช้าบำรุงกระดูก",
      "en": "Morning sunlight synthesizes Vitamin D",
      "zh": "健康科普常识：清晨晒太阳促成合成维生素D"
    },
    "options": [
      {
        "id": "opt-k3-hea-e9-1",
        "label": {
          "th": "น้ำตาลกลูโคสทำให้เหงื่อออกเป็นน้ำหวาน",
          "en": "Glucose making sweet sweat",
          "zh": "使人体排出的汗液变成甜滋滋糖浆的葡萄糖"
        },
        "icon": "🍯"
      },
      {
        "id": "opt-k3-hea-e9-2",
        "label": {
          "th": "วิตามินซีสำหรับทาเล็บ",
          "en": "Vitamin C for polishing fingernails",
          "zh": "用来涂染指甲的奇特外用维生素C"
        },
        "icon": "💅"
      },
      {
        "id": "opt-k3-hea-e9-3",
        "label": {
          "th": "วิตามินดี (Vitamin D) ช่วยในการดูดซึมแคลเซียมเพื่อเสริมสร้างกระดูกและฟัน 🦴 ☀️",
          "en": "Vitamin D, which aids calcium absorption for dense bones and teeth",
          "zh": "珍贵的维生素 D，能强力促进肠道对钙质的吸收，使骨骼牙齿坚韧挺拔 🦴 ☀️"
        },
        "icon": "☀️"
      }
    ],
    "correctOptionId": "opt-k3-hea-e9-3",
    "explanation": {
      "th": "แสงแดดยามเช้ากระตุ้นการสร้างวิตามินดี ช่วยให้ร่างกายดูดซึมแคลเซียมได้เต็มประสิทธิภาพ เก่งมากครับ!",
      "en": "Awesome! Sun exposure on skin triggers endogenous Vitamin D synthesis.",
      "zh": "太棒了！适度沐浴清晨阳光能补充天然维生素D，助力骨骼钙质沉淀。"
    }
  },
  {
    "id": "k3-hea-e10",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "วิทยาศาสตร์สุขภาพและร่างกายระดับชั้นอนุบาล 3 ชุดที่ 10: การที่ร่างกายของเด็กๆ \"ได้รับแสงแดดอ่อนๆ ยามเช้า\" 🌅 ช่วยสังเคราะห์วิตามินสำคัญใด?",
      "en": "K3 Health Science #10: Gentle MORNING SUNSHINE 🌅 on skin enables synthesis of which crucial vitamin?",
      "zh": "幼儿园大班健康科学素养第 10 题：清晨户外的“柔和朝阳温和光照” 🌅 照射在皮肤上，能激发我们人体自然合成哪种对骨骼至关重要的维生素？"
    },
    "illustration": "🌅 ☀️ 🦴",
    "illustrationSubtitle": {
      "th": "วิตามินดีจากแสงแดดยามเช้าบำรุงกระดูก",
      "en": "Morning sunlight synthesizes Vitamin D",
      "zh": "健康科普常识：清晨晒太阳促成合成维生素D"
    },
    "options": [
      {
        "id": "opt-k3-hea-e10-1",
        "label": {
          "th": "วิตามินดี (Vitamin D) ช่วยในการดูดซึมแคลเซียมเพื่อเสริมสร้างกระดูกและฟัน 🦴 ☀️",
          "en": "Vitamin D, which aids calcium absorption for dense bones and teeth",
          "zh": "珍贵的维生素 D，能强力促进肠道对钙质的吸收，使骨骼牙齿坚韧挺拔 🦴 ☀️"
        },
        "icon": "☀️"
      },
      {
        "id": "opt-k3-hea-e10-2",
        "label": {
          "th": "วิตามินซีสำหรับทาเล็บ",
          "en": "Vitamin C for polishing fingernails",
          "zh": "用来涂染指甲的奇特外用维生素C"
        },
        "icon": "💅"
      },
      {
        "id": "opt-k3-hea-e10-3",
        "label": {
          "th": "น้ำตาลกลูโคสทำให้เหงื่อออกเป็นน้ำหวาน",
          "en": "Glucose making sweet sweat",
          "zh": "使人体排出的汗液变成甜滋滋糖浆的葡萄糖"
        },
        "icon": "🍯"
      }
    ],
    "correctOptionId": "opt-k3-hea-e10-1",
    "explanation": {
      "th": "แสงแดดยามเช้ากระตุ้นการสร้างวิตามินดี ช่วยให้ร่างกายดูดซึมแคลเซียมได้เต็มประสิทธิภาพ เก่งมากครับ!",
      "en": "Awesome! Sun exposure on skin triggers endogenous Vitamin D synthesis.",
      "zh": "太棒了！适度沐浴清晨阳光能补充天然维生素D，助力骨骼钙质沉淀。"
    }
  },
  {
    "id": "k3-hea-m1",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "สุขภาวะทางอารมณ์และสังคมระดับชั้นอนุบาล 3 ชุดที่ 1: เมื่อเพื่อนในห้องรู้สึกเสียใจและกำลังร้องไห้ 😢 การแสดง \"ความเห็นอกเห็นใจและมีน้ำใจ\" (Empathy) ที่ดีที่สุดคืออะไร?",
      "en": "K3 Social-Emotional Wellness #1: A classmate is crying sadly 😢: How can you show warm EMPATHY?",
      "zh": "幼儿园大班共情素养第 1 题：同班的小朋友遇到了伤心事坐在课桌前委屈抽泣 😢，展现温情、友爱与“共情关怀（Empathy）”的最佳做法是？"
    },
    "illustration": "😢 🤝 ❤️",
    "illustrationSubtitle": {
      "th": "ความเห็นอกเห็นใจผู้อื่น (Empathy)",
      "en": "Showing empathy and comforting crying friends",
      "zh": "共情与关爱：温言安慰陪伴伤心伙伴"
    },
    "options": [
      {
        "id": "opt-k3-hea-m1-1",
        "label": {
          "th": "ยืนหัวเราะเยาะเสียงดังล้อเลียนให้อาย",
          "en": "Laugh loudly and mock them to shame",
          "zh": "双手叉腰站在一旁拍手放声嘲弄大笑，在班级里四处宣扬取笑"
        },
        "icon": "😆"
      },
      {
        "id": "opt-k3-hea-m1-2",
        "label": {
          "th": "เข้าไปนั่งใกล้ๆ ส่งกระดาษทิชชู่ให้ ถามด้วยความห่วงใย และรับฟังอย่างตั้งใจ 🤝 ❤️",
          "en": "Sit gently beside them, offer a tissue, ask with care, and listen warmly",
          "zh": "轻轻走上前坐在同伴身边，递上一张干净纸巾，轻声细语关切询问并耐心倾听陪伴 🤝 ❤️"
        },
        "icon": "❤️"
      },
      {
        "id": "opt-k3-hea-m1-3",
        "label": {
          "th": "เอาทรายมาปาใส่หน้าให้ร้องดังขึ้น",
          "en": "Throw sand in their face to cry harder",
          "zh": "抓起一把地上的干燥沙土扔进对方眼睛里逼他哭得更大声"
        },
        "icon": "🟤"
      }
    ],
    "correctOptionId": "opt-k3-hea-m1-2",
    "explanation": {
      "th": "ความเห็นอกเห็นใจและการรับฟังด้วยความเข้าใจ ช่วยให้เพื่อนรู้สึกอบอุ่นใจและหายเศร้า เก่งมากครับ!",
      "en": "Correct! True empathy listens empathetically and offers comforting reassurance.",
      "zh": "答对了！递上纸巾温言细语倾听安慰，体现出真正高尚的共情同理心。"
    }
  },
  {
    "id": "k3-hea-m2",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "สุขภาวะทางอารมณ์และสังคมระดับชั้นอนุบาล 3 ชุดที่ 2: เมื่อเพื่อนในห้องรู้สึกเสียใจและกำลังร้องไห้ 😢 การแสดง \"ความเห็นอกเห็นใจและมีน้ำใจ\" (Empathy) ที่ดีที่สุดคืออะไร?",
      "en": "K3 Social-Emotional Wellness #2: A classmate is crying sadly 😢: How can you show warm EMPATHY?",
      "zh": "幼儿园大班共情素养第 2 题：同班的小朋友遇到了伤心事坐在课桌前委屈抽泣 😢，展现温情、友爱与“共情关怀（Empathy）”的最佳做法是？"
    },
    "illustration": "😢 🤝 ❤️",
    "illustrationSubtitle": {
      "th": "ความเห็นอกเห็นใจผู้อื่น (Empathy)",
      "en": "Showing empathy and comforting crying friends",
      "zh": "共情与关爱：温言安慰陪伴伤心伙伴"
    },
    "options": [
      {
        "id": "opt-k3-hea-m2-1",
        "label": {
          "th": "เอาทรายมาปาใส่หน้าให้ร้องดังขึ้น",
          "en": "Throw sand in their face to cry harder",
          "zh": "抓起一把地上的干燥沙土扔进对方眼睛里逼他哭得更大声"
        },
        "icon": "🟤"
      },
      {
        "id": "opt-k3-hea-m2-2",
        "label": {
          "th": "ยืนหัวเราะเยาะเสียงดังล้อเลียนให้อาย",
          "en": "Laugh loudly and mock them to shame",
          "zh": "双手叉腰站在一旁拍手放声嘲弄大笑，在班级里四处宣扬取笑"
        },
        "icon": "😆"
      },
      {
        "id": "opt-k3-hea-m2-3",
        "label": {
          "th": "เข้าไปนั่งใกล้ๆ ส่งกระดาษทิชชู่ให้ ถามด้วยความห่วงใย และรับฟังอย่างตั้งใจ 🤝 ❤️",
          "en": "Sit gently beside them, offer a tissue, ask with care, and listen warmly",
          "zh": "轻轻走上前坐在同伴身边，递上一张干净纸巾，轻声细语关切询问并耐心倾听陪伴 🤝 ❤️"
        },
        "icon": "❤️"
      }
    ],
    "correctOptionId": "opt-k3-hea-m2-3",
    "explanation": {
      "th": "ความเห็นอกเห็นใจและการรับฟังด้วยความเข้าใจ ช่วยให้เพื่อนรู้สึกอบอุ่นใจและหายเศร้า เก่งมากครับ!",
      "en": "Correct! True empathy listens empathetically and offers comforting reassurance.",
      "zh": "答对了！递上纸巾温言细语倾听安慰，体现出真正高尚的共情同理心。"
    }
  },
  {
    "id": "k3-hea-m3",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "สุขภาวะทางอารมณ์และสังคมระดับชั้นอนุบาล 3 ชุดที่ 3: เมื่อเพื่อนในห้องรู้สึกเสียใจและกำลังร้องไห้ 😢 การแสดง \"ความเห็นอกเห็นใจและมีน้ำใจ\" (Empathy) ที่ดีที่สุดคืออะไร?",
      "en": "K3 Social-Emotional Wellness #3: A classmate is crying sadly 😢: How can you show warm EMPATHY?",
      "zh": "幼儿园大班共情素养第 3 题：同班的小朋友遇到了伤心事坐在课桌前委屈抽泣 😢，展现温情、友爱与“共情关怀（Empathy）”的最佳做法是？"
    },
    "illustration": "😢 🤝 ❤️",
    "illustrationSubtitle": {
      "th": "ความเห็นอกเห็นใจผู้อื่น (Empathy)",
      "en": "Showing empathy and comforting crying friends",
      "zh": "共情与关爱：温言安慰陪伴伤心伙伴"
    },
    "options": [
      {
        "id": "opt-k3-hea-m3-1",
        "label": {
          "th": "เข้าไปนั่งใกล้ๆ ส่งกระดาษทิชชู่ให้ ถามด้วยความห่วงใย และรับฟังอย่างตั้งใจ 🤝 ❤️",
          "en": "Sit gently beside them, offer a tissue, ask with care, and listen warmly",
          "zh": "轻轻走上前坐在同伴身边，递上一张干净纸巾，轻声细语关切询问并耐心倾听陪伴 🤝 ❤️"
        },
        "icon": "❤️"
      },
      {
        "id": "opt-k3-hea-m3-2",
        "label": {
          "th": "ยืนหัวเราะเยาะเสียงดังล้อเลียนให้อาย",
          "en": "Laugh loudly and mock them to shame",
          "zh": "双手叉腰站在一旁拍手放声嘲弄大笑，在班级里四处宣扬取笑"
        },
        "icon": "😆"
      },
      {
        "id": "opt-k3-hea-m3-3",
        "label": {
          "th": "เอาทรายมาปาใส่หน้าให้ร้องดังขึ้น",
          "en": "Throw sand in their face to cry harder",
          "zh": "抓起一把地上的干燥沙土扔进对方眼睛里逼他哭得更大声"
        },
        "icon": "🟤"
      }
    ],
    "correctOptionId": "opt-k3-hea-m3-1",
    "explanation": {
      "th": "ความเห็นอกเห็นใจและการรับฟังด้วยความเข้าใจ ช่วยให้เพื่อนรู้สึกอบอุ่นใจและหายเศร้า เก่งมากครับ!",
      "en": "Correct! True empathy listens empathetically and offers comforting reassurance.",
      "zh": "答对了！递上纸巾温言细语倾听安慰，体现出真正高尚的共情同理心。"
    }
  },
  {
    "id": "k3-hea-m4",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "สุขภาวะทางอารมณ์และสังคมระดับชั้นอนุบาล 3 ชุดที่ 4: เมื่อเพื่อนในห้องรู้สึกเสียใจและกำลังร้องไห้ 😢 การแสดง \"ความเห็นอกเห็นใจและมีน้ำใจ\" (Empathy) ที่ดีที่สุดคืออะไร?",
      "en": "K3 Social-Emotional Wellness #4: A classmate is crying sadly 😢: How can you show warm EMPATHY?",
      "zh": "幼儿园大班共情素养第 4 题：同班的小朋友遇到了伤心事坐在课桌前委屈抽泣 😢，展现温情、友爱与“共情关怀（Empathy）”的最佳做法是？"
    },
    "illustration": "😢 🤝 ❤️",
    "illustrationSubtitle": {
      "th": "ความเห็นอกเห็นใจผู้อื่น (Empathy)",
      "en": "Showing empathy and comforting crying friends",
      "zh": "共情与关爱：温言安慰陪伴伤心伙伴"
    },
    "options": [
      {
        "id": "opt-k3-hea-m4-1",
        "label": {
          "th": "ยืนหัวเราะเยาะเสียงดังล้อเลียนให้อาย",
          "en": "Laugh loudly and mock them to shame",
          "zh": "双手叉腰站在一旁拍手放声嘲弄大笑，在班级里四处宣扬取笑"
        },
        "icon": "😆"
      },
      {
        "id": "opt-k3-hea-m4-2",
        "label": {
          "th": "เข้าไปนั่งใกล้ๆ ส่งกระดาษทิชชู่ให้ ถามด้วยความห่วงใย และรับฟังอย่างตั้งใจ 🤝 ❤️",
          "en": "Sit gently beside them, offer a tissue, ask with care, and listen warmly",
          "zh": "轻轻走上前坐在同伴身边，递上一张干净纸巾，轻声细语关切询问并耐心倾听陪伴 🤝 ❤️"
        },
        "icon": "❤️"
      },
      {
        "id": "opt-k3-hea-m4-3",
        "label": {
          "th": "เอาทรายมาปาใส่หน้าให้ร้องดังขึ้น",
          "en": "Throw sand in their face to cry harder",
          "zh": "抓起一把地上的干燥沙土扔进对方眼睛里逼他哭得更大声"
        },
        "icon": "🟤"
      }
    ],
    "correctOptionId": "opt-k3-hea-m4-2",
    "explanation": {
      "th": "ความเห็นอกเห็นใจและการรับฟังด้วยความเข้าใจ ช่วยให้เพื่อนรู้สึกอบอุ่นใจและหายเศร้า เก่งมากครับ!",
      "en": "Correct! True empathy listens empathetically and offers comforting reassurance.",
      "zh": "答对了！递上纸巾温言细语倾听安慰，体现出真正高尚的共情同理心。"
    }
  },
  {
    "id": "k3-hea-m5",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "สุขภาวะทางอารมณ์และสังคมระดับชั้นอนุบาล 3 ชุดที่ 5: เมื่อเพื่อนในห้องรู้สึกเสียใจและกำลังร้องไห้ 😢 การแสดง \"ความเห็นอกเห็นใจและมีน้ำใจ\" (Empathy) ที่ดีที่สุดคืออะไร?",
      "en": "K3 Social-Emotional Wellness #5: A classmate is crying sadly 😢: How can you show warm EMPATHY?",
      "zh": "幼儿园大班共情素养第 5 题：同班的小朋友遇到了伤心事坐在课桌前委屈抽泣 😢，展现温情、友爱与“共情关怀（Empathy）”的最佳做法是？"
    },
    "illustration": "😢 🤝 ❤️",
    "illustrationSubtitle": {
      "th": "ความเห็นอกเห็นใจผู้อื่น (Empathy)",
      "en": "Showing empathy and comforting crying friends",
      "zh": "共情与关爱：温言安慰陪伴伤心伙伴"
    },
    "options": [
      {
        "id": "opt-k3-hea-m5-1",
        "label": {
          "th": "เอาทรายมาปาใส่หน้าให้ร้องดังขึ้น",
          "en": "Throw sand in their face to cry harder",
          "zh": "抓起一把地上的干燥沙土扔进对方眼睛里逼他哭得更大声"
        },
        "icon": "🟤"
      },
      {
        "id": "opt-k3-hea-m5-2",
        "label": {
          "th": "ยืนหัวเราะเยาะเสียงดังล้อเลียนให้อาย",
          "en": "Laugh loudly and mock them to shame",
          "zh": "双手叉腰站在一旁拍手放声嘲弄大笑，在班级里四处宣扬取笑"
        },
        "icon": "😆"
      },
      {
        "id": "opt-k3-hea-m5-3",
        "label": {
          "th": "เข้าไปนั่งใกล้ๆ ส่งกระดาษทิชชู่ให้ ถามด้วยความห่วงใย และรับฟังอย่างตั้งใจ 🤝 ❤️",
          "en": "Sit gently beside them, offer a tissue, ask with care, and listen warmly",
          "zh": "轻轻走上前坐在同伴身边，递上一张干净纸巾，轻声细语关切询问并耐心倾听陪伴 🤝 ❤️"
        },
        "icon": "❤️"
      }
    ],
    "correctOptionId": "opt-k3-hea-m5-3",
    "explanation": {
      "th": "ความเห็นอกเห็นใจและการรับฟังด้วยความเข้าใจ ช่วยให้เพื่อนรู้สึกอบอุ่นใจและหายเศร้า เก่งมากครับ!",
      "en": "Correct! True empathy listens empathetically and offers comforting reassurance.",
      "zh": "答对了！递上纸巾温言细语倾听安慰，体现出真正高尚的共情同理心。"
    }
  },
  {
    "id": "k3-hea-m6",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "สุขภาวะทางอารมณ์และสังคมระดับชั้นอนุบาล 3 ชุดที่ 6: เมื่อเพื่อนในห้องรู้สึกเสียใจและกำลังร้องไห้ 😢 การแสดง \"ความเห็นอกเห็นใจและมีน้ำใจ\" (Empathy) ที่ดีที่สุดคืออะไร?",
      "en": "K3 Social-Emotional Wellness #6: A classmate is crying sadly 😢: How can you show warm EMPATHY?",
      "zh": "幼儿园大班共情素养第 6 题：同班的小朋友遇到了伤心事坐在课桌前委屈抽泣 😢，展现温情、友爱与“共情关怀（Empathy）”的最佳做法是？"
    },
    "illustration": "😢 🤝 ❤️",
    "illustrationSubtitle": {
      "th": "ความเห็นอกเห็นใจผู้อื่น (Empathy)",
      "en": "Showing empathy and comforting crying friends",
      "zh": "共情与关爱：温言安慰陪伴伤心伙伴"
    },
    "options": [
      {
        "id": "opt-k3-hea-m6-1",
        "label": {
          "th": "เข้าไปนั่งใกล้ๆ ส่งกระดาษทิชชู่ให้ ถามด้วยความห่วงใย และรับฟังอย่างตั้งใจ 🤝 ❤️",
          "en": "Sit gently beside them, offer a tissue, ask with care, and listen warmly",
          "zh": "轻轻走上前坐在同伴身边，递上一张干净纸巾，轻声细语关切询问并耐心倾听陪伴 🤝 ❤️"
        },
        "icon": "❤️"
      },
      {
        "id": "opt-k3-hea-m6-2",
        "label": {
          "th": "ยืนหัวเราะเยาะเสียงดังล้อเลียนให้อาย",
          "en": "Laugh loudly and mock them to shame",
          "zh": "双手叉腰站在一旁拍手放声嘲弄大笑，在班级里四处宣扬取笑"
        },
        "icon": "😆"
      },
      {
        "id": "opt-k3-hea-m6-3",
        "label": {
          "th": "เอาทรายมาปาใส่หน้าให้ร้องดังขึ้น",
          "en": "Throw sand in their face to cry harder",
          "zh": "抓起一把地上的干燥沙土扔进对方眼睛里逼他哭得更大声"
        },
        "icon": "🟤"
      }
    ],
    "correctOptionId": "opt-k3-hea-m6-1",
    "explanation": {
      "th": "ความเห็นอกเห็นใจและการรับฟังด้วยความเข้าใจ ช่วยให้เพื่อนรู้สึกอบอุ่นใจและหายเศร้า เก่งมากครับ!",
      "en": "Correct! True empathy listens empathetically and offers comforting reassurance.",
      "zh": "答对了！递上纸巾温言细语倾听安慰，体现出真正高尚的共情同理心。"
    }
  },
  {
    "id": "k3-hea-m7",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "สุขภาวะทางอารมณ์และสังคมระดับชั้นอนุบาล 3 ชุดที่ 7: เมื่อเพื่อนในห้องรู้สึกเสียใจและกำลังร้องไห้ 😢 การแสดง \"ความเห็นอกเห็นใจและมีน้ำใจ\" (Empathy) ที่ดีที่สุดคืออะไร?",
      "en": "K3 Social-Emotional Wellness #7: A classmate is crying sadly 😢: How can you show warm EMPATHY?",
      "zh": "幼儿园大班共情素养第 7 题：同班的小朋友遇到了伤心事坐在课桌前委屈抽泣 😢，展现温情、友爱与“共情关怀（Empathy）”的最佳做法是？"
    },
    "illustration": "😢 🤝 ❤️",
    "illustrationSubtitle": {
      "th": "ความเห็นอกเห็นใจผู้อื่น (Empathy)",
      "en": "Showing empathy and comforting crying friends",
      "zh": "共情与关爱：温言安慰陪伴伤心伙伴"
    },
    "options": [
      {
        "id": "opt-k3-hea-m7-1",
        "label": {
          "th": "ยืนหัวเราะเยาะเสียงดังล้อเลียนให้อาย",
          "en": "Laugh loudly and mock them to shame",
          "zh": "双手叉腰站在一旁拍手放声嘲弄大笑，在班级里四处宣扬取笑"
        },
        "icon": "😆"
      },
      {
        "id": "opt-k3-hea-m7-2",
        "label": {
          "th": "เข้าไปนั่งใกล้ๆ ส่งกระดาษทิชชู่ให้ ถามด้วยความห่วงใย และรับฟังอย่างตั้งใจ 🤝 ❤️",
          "en": "Sit gently beside them, offer a tissue, ask with care, and listen warmly",
          "zh": "轻轻走上前坐在同伴身边，递上一张干净纸巾，轻声细语关切询问并耐心倾听陪伴 🤝 ❤️"
        },
        "icon": "❤️"
      },
      {
        "id": "opt-k3-hea-m7-3",
        "label": {
          "th": "เอาทรายมาปาใส่หน้าให้ร้องดังขึ้น",
          "en": "Throw sand in their face to cry harder",
          "zh": "抓起一把地上的干燥沙土扔进对方眼睛里逼他哭得更大声"
        },
        "icon": "🟤"
      }
    ],
    "correctOptionId": "opt-k3-hea-m7-2",
    "explanation": {
      "th": "ความเห็นอกเห็นใจและการรับฟังด้วยความเข้าใจ ช่วยให้เพื่อนรู้สึกอบอุ่นใจและหายเศร้า เก่งมากครับ!",
      "en": "Correct! True empathy listens empathetically and offers comforting reassurance.",
      "zh": "答对了！递上纸巾温言细语倾听安慰，体现出真正高尚的共情同理心。"
    }
  },
  {
    "id": "k3-hea-m8",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "สุขภาวะทางอารมณ์และสังคมระดับชั้นอนุบาล 3 ชุดที่ 8: เมื่อเพื่อนในห้องรู้สึกเสียใจและกำลังร้องไห้ 😢 การแสดง \"ความเห็นอกเห็นใจและมีน้ำใจ\" (Empathy) ที่ดีที่สุดคืออะไร?",
      "en": "K3 Social-Emotional Wellness #8: A classmate is crying sadly 😢: How can you show warm EMPATHY?",
      "zh": "幼儿园大班共情素养第 8 题：同班的小朋友遇到了伤心事坐在课桌前委屈抽泣 😢，展现温情、友爱与“共情关怀（Empathy）”的最佳做法是？"
    },
    "illustration": "😢 🤝 ❤️",
    "illustrationSubtitle": {
      "th": "ความเห็นอกเห็นใจผู้อื่น (Empathy)",
      "en": "Showing empathy and comforting crying friends",
      "zh": "共情与关爱：温言安慰陪伴伤心伙伴"
    },
    "options": [
      {
        "id": "opt-k3-hea-m8-1",
        "label": {
          "th": "เอาทรายมาปาใส่หน้าให้ร้องดังขึ้น",
          "en": "Throw sand in their face to cry harder",
          "zh": "抓起一把地上的干燥沙土扔进对方眼睛里逼他哭得更大声"
        },
        "icon": "🟤"
      },
      {
        "id": "opt-k3-hea-m8-2",
        "label": {
          "th": "ยืนหัวเราะเยาะเสียงดังล้อเลียนให้อาย",
          "en": "Laugh loudly and mock them to shame",
          "zh": "双手叉腰站在一旁拍手放声嘲弄大笑，在班级里四处宣扬取笑"
        },
        "icon": "😆"
      },
      {
        "id": "opt-k3-hea-m8-3",
        "label": {
          "th": "เข้าไปนั่งใกล้ๆ ส่งกระดาษทิชชู่ให้ ถามด้วยความห่วงใย และรับฟังอย่างตั้งใจ 🤝 ❤️",
          "en": "Sit gently beside them, offer a tissue, ask with care, and listen warmly",
          "zh": "轻轻走上前坐在同伴身边，递上一张干净纸巾，轻声细语关切询问并耐心倾听陪伴 🤝 ❤️"
        },
        "icon": "❤️"
      }
    ],
    "correctOptionId": "opt-k3-hea-m8-3",
    "explanation": {
      "th": "ความเห็นอกเห็นใจและการรับฟังด้วยความเข้าใจ ช่วยให้เพื่อนรู้สึกอบอุ่นใจและหายเศร้า เก่งมากครับ!",
      "en": "Correct! True empathy listens empathetically and offers comforting reassurance.",
      "zh": "答对了！递上纸巾温言细语倾听安慰，体现出真正高尚的共情同理心。"
    }
  },
  {
    "id": "k3-hea-m9",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "สุขภาวะทางอารมณ์และสังคมระดับชั้นอนุบาล 3 ชุดที่ 9: เมื่อเพื่อนในห้องรู้สึกเสียใจและกำลังร้องไห้ 😢 การแสดง \"ความเห็นอกเห็นใจและมีน้ำใจ\" (Empathy) ที่ดีที่สุดคืออะไร?",
      "en": "K3 Social-Emotional Wellness #9: A classmate is crying sadly 😢: How can you show warm EMPATHY?",
      "zh": "幼儿园大班共情素养第 9 题：同班的小朋友遇到了伤心事坐在课桌前委屈抽泣 😢，展现温情、友爱与“共情关怀（Empathy）”的最佳做法是？"
    },
    "illustration": "😢 🤝 ❤️",
    "illustrationSubtitle": {
      "th": "ความเห็นอกเห็นใจผู้อื่น (Empathy)",
      "en": "Showing empathy and comforting crying friends",
      "zh": "共情与关爱：温言安慰陪伴伤心伙伴"
    },
    "options": [
      {
        "id": "opt-k3-hea-m9-1",
        "label": {
          "th": "เข้าไปนั่งใกล้ๆ ส่งกระดาษทิชชู่ให้ ถามด้วยความห่วงใย และรับฟังอย่างตั้งใจ 🤝 ❤️",
          "en": "Sit gently beside them, offer a tissue, ask with care, and listen warmly",
          "zh": "轻轻走上前坐在同伴身边，递上一张干净纸巾，轻声细语关切询问并耐心倾听陪伴 🤝 ❤️"
        },
        "icon": "❤️"
      },
      {
        "id": "opt-k3-hea-m9-2",
        "label": {
          "th": "ยืนหัวเราะเยาะเสียงดังล้อเลียนให้อาย",
          "en": "Laugh loudly and mock them to shame",
          "zh": "双手叉腰站在一旁拍手放声嘲弄大笑，在班级里四处宣扬取笑"
        },
        "icon": "😆"
      },
      {
        "id": "opt-k3-hea-m9-3",
        "label": {
          "th": "เอาทรายมาปาใส่หน้าให้ร้องดังขึ้น",
          "en": "Throw sand in their face to cry harder",
          "zh": "抓起一把地上的干燥沙土扔进对方眼睛里逼他哭得更大声"
        },
        "icon": "🟤"
      }
    ],
    "correctOptionId": "opt-k3-hea-m9-1",
    "explanation": {
      "th": "ความเห็นอกเห็นใจและการรับฟังด้วยความเข้าใจ ช่วยให้เพื่อนรู้สึกอบอุ่นใจและหายเศร้า เก่งมากครับ!",
      "en": "Correct! True empathy listens empathetically and offers comforting reassurance.",
      "zh": "答对了！递上纸巾温言细语倾听安慰，体现出真正高尚的共情同理心。"
    }
  },
  {
    "id": "k3-hea-m10",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "สุขภาวะทางอารมณ์และสังคมระดับชั้นอนุบาล 3 ชุดที่ 10: เมื่อเพื่อนในห้องรู้สึกเสียใจและกำลังร้องไห้ 😢 การแสดง \"ความเห็นอกเห็นใจและมีน้ำใจ\" (Empathy) ที่ดีที่สุดคืออะไร?",
      "en": "K3 Social-Emotional Wellness #10: A classmate is crying sadly 😢: How can you show warm EMPATHY?",
      "zh": "幼儿园大班共情素养第 10 题：同班的小朋友遇到了伤心事坐在课桌前委屈抽泣 😢，展现温情、友爱与“共情关怀（Empathy）”的最佳做法是？"
    },
    "illustration": "😢 🤝 ❤️",
    "illustrationSubtitle": {
      "th": "ความเห็นอกเห็นใจผู้อื่น (Empathy)",
      "en": "Showing empathy and comforting crying friends",
      "zh": "共情与关爱：温言安慰陪伴伤心伙伴"
    },
    "options": [
      {
        "id": "opt-k3-hea-m10-1",
        "label": {
          "th": "ยืนหัวเราะเยาะเสียงดังล้อเลียนให้อาย",
          "en": "Laugh loudly and mock them to shame",
          "zh": "双手叉腰站在一旁拍手放声嘲弄大笑，在班级里四处宣扬取笑"
        },
        "icon": "😆"
      },
      {
        "id": "opt-k3-hea-m10-2",
        "label": {
          "th": "เข้าไปนั่งใกล้ๆ ส่งกระดาษทิชชู่ให้ ถามด้วยความห่วงใย และรับฟังอย่างตั้งใจ 🤝 ❤️",
          "en": "Sit gently beside them, offer a tissue, ask with care, and listen warmly",
          "zh": "轻轻走上前坐在同伴身边，递上一张干净纸巾，轻声细语关切询问并耐心倾听陪伴 🤝 ❤️"
        },
        "icon": "❤️"
      },
      {
        "id": "opt-k3-hea-m10-3",
        "label": {
          "th": "เอาทรายมาปาใส่หน้าให้ร้องดังขึ้น",
          "en": "Throw sand in their face to cry harder",
          "zh": "抓起一把地上的干燥沙土扔进对方眼睛里逼他哭得更大声"
        },
        "icon": "🟤"
      }
    ],
    "correctOptionId": "opt-k3-hea-m10-2",
    "explanation": {
      "th": "ความเห็นอกเห็นใจและการรับฟังด้วยความเข้าใจ ช่วยให้เพื่อนรู้สึกอบอุ่นใจและหายเศร้า เก่งมากครับ!",
      "en": "Correct! True empathy listens empathetically and offers comforting reassurance.",
      "zh": "答对了！递上纸巾温言细语倾听安慰，体现出真正高尚的共情同理心。"
    }
  },
  {
    "id": "k3-hea-h1",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "การปฐมพยาบาลขั้นสูงระดับชั้นอนุบาล 3 ชุดที่ 1: หากเกิดอุบัติเหตุ \"น้ำร้อนลวกผิวหนังหรือโดนของร้อนสัมผัส\" 🔥 💧 ขั้นตอนการปฐมพยาบาลที่ถูกต้องและปลอดภัยที่สุดคือข้อใด?",
      "en": "K3 First Aid Excellence #1: ACCIDENTAL SCALDING / BURN from boiling liquids 🔥 💧: What is the proven first aid protocol?",
      "zh": "幼儿园大班应急自救素养第 1 题：日常不慎被“滚烫开水严重烫伤或被高温电熨斗灼伤红肿” 🔥 💧 时，最科学标准的黄金自救处置法则是？"
    },
    "illustration": "🔥 💧 🚿",
    "illustrationSubtitle": {
      "th": "การปฐมพยาบาลแผลน้ำร้อนลวก: ล้างด้วยน้ำเย็นไหลผ่าน",
      "en": "Scald first aid: Cool running tap water for 15-20 min",
      "zh": "烫伤科学急救守则：冷水持续冲洗降温防起泡"
    },
    "options": [
      {
        "id": "opt-k3-hea-h1-1",
        "label": {
          "th": "เอาไฟแช็กมาจุดลนซ้ำเพื่อให้แห้ง",
          "en": "Use a lighter flame to dry the burn",
          "zh": "顺手拿打火机明火在破皮创面上再次烘烤干燥消毒"
        },
        "icon": "🔥"
      },
      {
        "id": "opt-k3-hea-h1-2",
        "label": {
          "th": "เอาเกลือป่นและพริกขี้หนูมาโปะทับบนแผล",
          "en": "Rub raw salt and chili powder onto burn",
          "zh": "直接抓起一大把粗盐和红辣椒粉使劲涂抹揉搓在水泡创口上"
        },
        "icon": "🌶️"
      },
      {
        "id": "opt-k3-hea-h1-3",
        "label": {
          "th": "รีบนำแผลไปแช่หรือเปิดน้ำสะอาดอุณหภูมิห้องให้ไหลผ่านอย่างต่อเนื่อง 15-20 นาทีเพื่อลดความร้อน ห้ามทายาสีฟันหรือน้ำปลา 💧 🚿",
          "en": "Flush immediately under gentle cool running tap water for 15-20 mins; NEVER apply toothpaste or fish sauce",
          "zh": "立刻将烫伤创面置于清洁流动的常温冷水下持续轻柔冲洗 15-20 分钟降温，严禁涂抹牙膏、香油或酱油 💧 🚿"
        },
        "icon": "💧"
      }
    ],
    "correctOptionId": "opt-k3-hea-h1-3",
    "explanation": {
      "th": "การใช้น้ำเย็นไหลผ่านช่วยหยุดการทำลายเนื้อเยื่อจากความร้อน และป้องกันการติดเชื้อ เก่งมากครับ!",
      "en": "Spot on! Immediate cool water perfusion dissipates residual thermal energy and preserves tissue integrity.",
      "zh": "太棒了！牢记烫伤“冲、脱、泡、盖、送”黄金法则，绝不可听信偏方抹牙膏酱油！"
    }
  },
  {
    "id": "k3-hea-h2",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "การปฐมพยาบาลขั้นสูงระดับชั้นอนุบาล 3 ชุดที่ 2: หากเกิดอุบัติเหตุ \"น้ำร้อนลวกผิวหนังหรือโดนของร้อนสัมผัส\" 🔥 💧 ขั้นตอนการปฐมพยาบาลที่ถูกต้องและปลอดภัยที่สุดคือข้อใด?",
      "en": "K3 First Aid Excellence #2: ACCIDENTAL SCALDING / BURN from boiling liquids 🔥 💧: What is the proven first aid protocol?",
      "zh": "幼儿园大班应急自救素养第 2 题：日常不慎被“滚烫开水严重烫伤或被高温电熨斗灼伤红肿” 🔥 💧 时，最科学标准的黄金自救处置法则是？"
    },
    "illustration": "🔥 💧 🚿",
    "illustrationSubtitle": {
      "th": "การปฐมพยาบาลแผลน้ำร้อนลวก: ล้างด้วยน้ำเย็นไหลผ่าน",
      "en": "Scald first aid: Cool running tap water for 15-20 min",
      "zh": "烫伤科学急救守则：冷水持续冲洗降温防起泡"
    },
    "options": [
      {
        "id": "opt-k3-hea-h2-1",
        "label": {
          "th": "รีบนำแผลไปแช่หรือเปิดน้ำสะอาดอุณหภูมิห้องให้ไหลผ่านอย่างต่อเนื่อง 15-20 นาทีเพื่อลดความร้อน ห้ามทายาสีฟันหรือน้ำปลา 💧 🚿",
          "en": "Flush immediately under gentle cool running tap water for 15-20 mins; NEVER apply toothpaste or fish sauce",
          "zh": "立刻将烫伤创面置于清洁流动的常温冷水下持续轻柔冲洗 15-20 分钟降温，严禁涂抹牙膏、香油或酱油 💧 🚿"
        },
        "icon": "💧"
      },
      {
        "id": "opt-k3-hea-h2-2",
        "label": {
          "th": "เอาเกลือป่นและพริกขี้หนูมาโปะทับบนแผล",
          "en": "Rub raw salt and chili powder onto burn",
          "zh": "直接抓起一大把粗盐和红辣椒粉使劲涂抹揉搓在水泡创口上"
        },
        "icon": "🌶️"
      },
      {
        "id": "opt-k3-hea-h2-3",
        "label": {
          "th": "เอาไฟแช็กมาจุดลนซ้ำเพื่อให้แห้ง",
          "en": "Use a lighter flame to dry the burn",
          "zh": "顺手拿打火机明火在破皮创面上再次烘烤干燥消毒"
        },
        "icon": "🔥"
      }
    ],
    "correctOptionId": "opt-k3-hea-h2-1",
    "explanation": {
      "th": "การใช้น้ำเย็นไหลผ่านช่วยหยุดการทำลายเนื้อเยื่อจากความร้อน และป้องกันการติดเชื้อ เก่งมากครับ!",
      "en": "Spot on! Immediate cool water perfusion dissipates residual thermal energy and preserves tissue integrity.",
      "zh": "太棒了！牢记烫伤“冲、脱、泡、盖、送”黄金法则，绝不可听信偏方抹牙膏酱油！"
    }
  },
  {
    "id": "k3-hea-h3",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "การปฐมพยาบาลขั้นสูงระดับชั้นอนุบาล 3 ชุดที่ 3: หากเกิดอุบัติเหตุ \"น้ำร้อนลวกผิวหนังหรือโดนของร้อนสัมผัส\" 🔥 💧 ขั้นตอนการปฐมพยาบาลที่ถูกต้องและปลอดภัยที่สุดคือข้อใด?",
      "en": "K3 First Aid Excellence #3: ACCIDENTAL SCALDING / BURN from boiling liquids 🔥 💧: What is the proven first aid protocol?",
      "zh": "幼儿园大班应急自救素养第 3 题：日常不慎被“滚烫开水严重烫伤或被高温电熨斗灼伤红肿” 🔥 💧 时，最科学标准的黄金自救处置法则是？"
    },
    "illustration": "🔥 💧 🚿",
    "illustrationSubtitle": {
      "th": "การปฐมพยาบาลแผลน้ำร้อนลวก: ล้างด้วยน้ำเย็นไหลผ่าน",
      "en": "Scald first aid: Cool running tap water for 15-20 min",
      "zh": "烫伤科学急救守则：冷水持续冲洗降温防起泡"
    },
    "options": [
      {
        "id": "opt-k3-hea-h3-1",
        "label": {
          "th": "เอาเกลือป่นและพริกขี้หนูมาโปะทับบนแผล",
          "en": "Rub raw salt and chili powder onto burn",
          "zh": "直接抓起一大把粗盐和红辣椒粉使劲涂抹揉搓在水泡创口上"
        },
        "icon": "🌶️"
      },
      {
        "id": "opt-k3-hea-h3-2",
        "label": {
          "th": "รีบนำแผลไปแช่หรือเปิดน้ำสะอาดอุณหภูมิห้องให้ไหลผ่านอย่างต่อเนื่อง 15-20 นาทีเพื่อลดความร้อน ห้ามทายาสีฟันหรือน้ำปลา 💧 🚿",
          "en": "Flush immediately under gentle cool running tap water for 15-20 mins; NEVER apply toothpaste or fish sauce",
          "zh": "立刻将烫伤创面置于清洁流动的常温冷水下持续轻柔冲洗 15-20 分钟降温，严禁涂抹牙膏、香油或酱油 💧 🚿"
        },
        "icon": "💧"
      },
      {
        "id": "opt-k3-hea-h3-3",
        "label": {
          "th": "เอาไฟแช็กมาจุดลนซ้ำเพื่อให้แห้ง",
          "en": "Use a lighter flame to dry the burn",
          "zh": "顺手拿打火机明火在破皮创面上再次烘烤干燥消毒"
        },
        "icon": "🔥"
      }
    ],
    "correctOptionId": "opt-k3-hea-h3-2",
    "explanation": {
      "th": "การใช้น้ำเย็นไหลผ่านช่วยหยุดการทำลายเนื้อเยื่อจากความร้อน และป้องกันการติดเชื้อ เก่งมากครับ!",
      "en": "Spot on! Immediate cool water perfusion dissipates residual thermal energy and preserves tissue integrity.",
      "zh": "太棒了！牢记烫伤“冲、脱、泡、盖、送”黄金法则，绝不可听信偏方抹牙膏酱油！"
    }
  },
  {
    "id": "k3-hea-h4",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "การปฐมพยาบาลขั้นสูงระดับชั้นอนุบาล 3 ชุดที่ 4: หากเกิดอุบัติเหตุ \"น้ำร้อนลวกผิวหนังหรือโดนของร้อนสัมผัส\" 🔥 💧 ขั้นตอนการปฐมพยาบาลที่ถูกต้องและปลอดภัยที่สุดคือข้อใด?",
      "en": "K3 First Aid Excellence #4: ACCIDENTAL SCALDING / BURN from boiling liquids 🔥 💧: What is the proven first aid protocol?",
      "zh": "幼儿园大班应急自救素养第 4 题：日常不慎被“滚烫开水严重烫伤或被高温电熨斗灼伤红肿” 🔥 💧 时，最科学标准的黄金自救处置法则是？"
    },
    "illustration": "🔥 💧 🚿",
    "illustrationSubtitle": {
      "th": "การปฐมพยาบาลแผลน้ำร้อนลวก: ล้างด้วยน้ำเย็นไหลผ่าน",
      "en": "Scald first aid: Cool running tap water for 15-20 min",
      "zh": "烫伤科学急救守则：冷水持续冲洗降温防起泡"
    },
    "options": [
      {
        "id": "opt-k3-hea-h4-1",
        "label": {
          "th": "เอาไฟแช็กมาจุดลนซ้ำเพื่อให้แห้ง",
          "en": "Use a lighter flame to dry the burn",
          "zh": "顺手拿打火机明火在破皮创面上再次烘烤干燥消毒"
        },
        "icon": "🔥"
      },
      {
        "id": "opt-k3-hea-h4-2",
        "label": {
          "th": "เอาเกลือป่นและพริกขี้หนูมาโปะทับบนแผล",
          "en": "Rub raw salt and chili powder onto burn",
          "zh": "直接抓起一大把粗盐和红辣椒粉使劲涂抹揉搓在水泡创口上"
        },
        "icon": "🌶️"
      },
      {
        "id": "opt-k3-hea-h4-3",
        "label": {
          "th": "รีบนำแผลไปแช่หรือเปิดน้ำสะอาดอุณหภูมิห้องให้ไหลผ่านอย่างต่อเนื่อง 15-20 นาทีเพื่อลดความร้อน ห้ามทายาสีฟันหรือน้ำปลา 💧 🚿",
          "en": "Flush immediately under gentle cool running tap water for 15-20 mins; NEVER apply toothpaste or fish sauce",
          "zh": "立刻将烫伤创面置于清洁流动的常温冷水下持续轻柔冲洗 15-20 分钟降温，严禁涂抹牙膏、香油或酱油 💧 🚿"
        },
        "icon": "💧"
      }
    ],
    "correctOptionId": "opt-k3-hea-h4-3",
    "explanation": {
      "th": "การใช้น้ำเย็นไหลผ่านช่วยหยุดการทำลายเนื้อเยื่อจากความร้อน และป้องกันการติดเชื้อ เก่งมากครับ!",
      "en": "Spot on! Immediate cool water perfusion dissipates residual thermal energy and preserves tissue integrity.",
      "zh": "太棒了！牢记烫伤“冲、脱、泡、盖、送”黄金法则，绝不可听信偏方抹牙膏酱油！"
    }
  },
  {
    "id": "k3-hea-h5",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "การปฐมพยาบาลขั้นสูงระดับชั้นอนุบาล 3 ชุดที่ 5: หากเกิดอุบัติเหตุ \"น้ำร้อนลวกผิวหนังหรือโดนของร้อนสัมผัส\" 🔥 💧 ขั้นตอนการปฐมพยาบาลที่ถูกต้องและปลอดภัยที่สุดคือข้อใด?",
      "en": "K3 First Aid Excellence #5: ACCIDENTAL SCALDING / BURN from boiling liquids 🔥 💧: What is the proven first aid protocol?",
      "zh": "幼儿园大班应急自救素养第 5 题：日常不慎被“滚烫开水严重烫伤或被高温电熨斗灼伤红肿” 🔥 💧 时，最科学标准的黄金自救处置法则是？"
    },
    "illustration": "🔥 💧 🚿",
    "illustrationSubtitle": {
      "th": "การปฐมพยาบาลแผลน้ำร้อนลวก: ล้างด้วยน้ำเย็นไหลผ่าน",
      "en": "Scald first aid: Cool running tap water for 15-20 min",
      "zh": "烫伤科学急救守则：冷水持续冲洗降温防起泡"
    },
    "options": [
      {
        "id": "opt-k3-hea-h5-1",
        "label": {
          "th": "รีบนำแผลไปแช่หรือเปิดน้ำสะอาดอุณหภูมิห้องให้ไหลผ่านอย่างต่อเนื่อง 15-20 นาทีเพื่อลดความร้อน ห้ามทายาสีฟันหรือน้ำปลา 💧 🚿",
          "en": "Flush immediately under gentle cool running tap water for 15-20 mins; NEVER apply toothpaste or fish sauce",
          "zh": "立刻将烫伤创面置于清洁流动的常温冷水下持续轻柔冲洗 15-20 分钟降温，严禁涂抹牙膏、香油或酱油 💧 🚿"
        },
        "icon": "💧"
      },
      {
        "id": "opt-k3-hea-h5-2",
        "label": {
          "th": "เอาเกลือป่นและพริกขี้หนูมาโปะทับบนแผล",
          "en": "Rub raw salt and chili powder onto burn",
          "zh": "直接抓起一大把粗盐和红辣椒粉使劲涂抹揉搓在水泡创口上"
        },
        "icon": "🌶️"
      },
      {
        "id": "opt-k3-hea-h5-3",
        "label": {
          "th": "เอาไฟแช็กมาจุดลนซ้ำเพื่อให้แห้ง",
          "en": "Use a lighter flame to dry the burn",
          "zh": "顺手拿打火机明火在破皮创面上再次烘烤干燥消毒"
        },
        "icon": "🔥"
      }
    ],
    "correctOptionId": "opt-k3-hea-h5-1",
    "explanation": {
      "th": "การใช้น้ำเย็นไหลผ่านช่วยหยุดการทำลายเนื้อเยื่อจากความร้อน และป้องกันการติดเชื้อ เก่งมากครับ!",
      "en": "Spot on! Immediate cool water perfusion dissipates residual thermal energy and preserves tissue integrity.",
      "zh": "太棒了！牢记烫伤“冲、脱、泡、盖、送”黄金法则，绝不可听信偏方抹牙膏酱油！"
    }
  },
  {
    "id": "k3-hea-h6",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "การปฐมพยาบาลขั้นสูงระดับชั้นอนุบาล 3 ชุดที่ 6: หากเกิดอุบัติเหตุ \"น้ำร้อนลวกผิวหนังหรือโดนของร้อนสัมผัส\" 🔥 💧 ขั้นตอนการปฐมพยาบาลที่ถูกต้องและปลอดภัยที่สุดคือข้อใด?",
      "en": "K3 First Aid Excellence #6: ACCIDENTAL SCALDING / BURN from boiling liquids 🔥 💧: What is the proven first aid protocol?",
      "zh": "幼儿园大班应急自救素养第 6 题：日常不慎被“滚烫开水严重烫伤或被高温电熨斗灼伤红肿” 🔥 💧 时，最科学标准的黄金自救处置法则是？"
    },
    "illustration": "🔥 💧 🚿",
    "illustrationSubtitle": {
      "th": "การปฐมพยาบาลแผลน้ำร้อนลวก: ล้างด้วยน้ำเย็นไหลผ่าน",
      "en": "Scald first aid: Cool running tap water for 15-20 min",
      "zh": "烫伤科学急救守则：冷水持续冲洗降温防起泡"
    },
    "options": [
      {
        "id": "opt-k3-hea-h6-1",
        "label": {
          "th": "เอาเกลือป่นและพริกขี้หนูมาโปะทับบนแผล",
          "en": "Rub raw salt and chili powder onto burn",
          "zh": "直接抓起一大把粗盐和红辣椒粉使劲涂抹揉搓在水泡创口上"
        },
        "icon": "🌶️"
      },
      {
        "id": "opt-k3-hea-h6-2",
        "label": {
          "th": "รีบนำแผลไปแช่หรือเปิดน้ำสะอาดอุณหภูมิห้องให้ไหลผ่านอย่างต่อเนื่อง 15-20 นาทีเพื่อลดความร้อน ห้ามทายาสีฟันหรือน้ำปลา 💧 🚿",
          "en": "Flush immediately under gentle cool running tap water for 15-20 mins; NEVER apply toothpaste or fish sauce",
          "zh": "立刻将烫伤创面置于清洁流动的常温冷水下持续轻柔冲洗 15-20 分钟降温，严禁涂抹牙膏、香油或酱油 💧 🚿"
        },
        "icon": "💧"
      },
      {
        "id": "opt-k3-hea-h6-3",
        "label": {
          "th": "เอาไฟแช็กมาจุดลนซ้ำเพื่อให้แห้ง",
          "en": "Use a lighter flame to dry the burn",
          "zh": "顺手拿打火机明火在破皮创面上再次烘烤干燥消毒"
        },
        "icon": "🔥"
      }
    ],
    "correctOptionId": "opt-k3-hea-h6-2",
    "explanation": {
      "th": "การใช้น้ำเย็นไหลผ่านช่วยหยุดการทำลายเนื้อเยื่อจากความร้อน และป้องกันการติดเชื้อ เก่งมากครับ!",
      "en": "Spot on! Immediate cool water perfusion dissipates residual thermal energy and preserves tissue integrity.",
      "zh": "太棒了！牢记烫伤“冲、脱、泡、盖、送”黄金法则，绝不可听信偏方抹牙膏酱油！"
    }
  },
  {
    "id": "k3-hea-h7",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "การปฐมพยาบาลขั้นสูงระดับชั้นอนุบาล 3 ชุดที่ 7: หากเกิดอุบัติเหตุ \"น้ำร้อนลวกผิวหนังหรือโดนของร้อนสัมผัส\" 🔥 💧 ขั้นตอนการปฐมพยาบาลที่ถูกต้องและปลอดภัยที่สุดคือข้อใด?",
      "en": "K3 First Aid Excellence #7: ACCIDENTAL SCALDING / BURN from boiling liquids 🔥 💧: What is the proven first aid protocol?",
      "zh": "幼儿园大班应急自救素养第 7 题：日常不慎被“滚烫开水严重烫伤或被高温电熨斗灼伤红肿” 🔥 💧 时，最科学标准的黄金自救处置法则是？"
    },
    "illustration": "🔥 💧 🚿",
    "illustrationSubtitle": {
      "th": "การปฐมพยาบาลแผลน้ำร้อนลวก: ล้างด้วยน้ำเย็นไหลผ่าน",
      "en": "Scald first aid: Cool running tap water for 15-20 min",
      "zh": "烫伤科学急救守则：冷水持续冲洗降温防起泡"
    },
    "options": [
      {
        "id": "opt-k3-hea-h7-1",
        "label": {
          "th": "เอาไฟแช็กมาจุดลนซ้ำเพื่อให้แห้ง",
          "en": "Use a lighter flame to dry the burn",
          "zh": "顺手拿打火机明火在破皮创面上再次烘烤干燥消毒"
        },
        "icon": "🔥"
      },
      {
        "id": "opt-k3-hea-h7-2",
        "label": {
          "th": "เอาเกลือป่นและพริกขี้หนูมาโปะทับบนแผล",
          "en": "Rub raw salt and chili powder onto burn",
          "zh": "直接抓起一大把粗盐和红辣椒粉使劲涂抹揉搓在水泡创口上"
        },
        "icon": "🌶️"
      },
      {
        "id": "opt-k3-hea-h7-3",
        "label": {
          "th": "รีบนำแผลไปแช่หรือเปิดน้ำสะอาดอุณหภูมิห้องให้ไหลผ่านอย่างต่อเนื่อง 15-20 นาทีเพื่อลดความร้อน ห้ามทายาสีฟันหรือน้ำปลา 💧 🚿",
          "en": "Flush immediately under gentle cool running tap water for 15-20 mins; NEVER apply toothpaste or fish sauce",
          "zh": "立刻将烫伤创面置于清洁流动的常温冷水下持续轻柔冲洗 15-20 分钟降温，严禁涂抹牙膏、香油或酱油 💧 🚿"
        },
        "icon": "💧"
      }
    ],
    "correctOptionId": "opt-k3-hea-h7-3",
    "explanation": {
      "th": "การใช้น้ำเย็นไหลผ่านช่วยหยุดการทำลายเนื้อเยื่อจากความร้อน และป้องกันการติดเชื้อ เก่งมากครับ!",
      "en": "Spot on! Immediate cool water perfusion dissipates residual thermal energy and preserves tissue integrity.",
      "zh": "太棒了！牢记烫伤“冲、脱、泡、盖、送”黄金法则，绝不可听信偏方抹牙膏酱油！"
    }
  },
  {
    "id": "k3-hea-h8",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "การปฐมพยาบาลขั้นสูงระดับชั้นอนุบาล 3 ชุดที่ 8: หากเกิดอุบัติเหตุ \"น้ำร้อนลวกผิวหนังหรือโดนของร้อนสัมผัส\" 🔥 💧 ขั้นตอนการปฐมพยาบาลที่ถูกต้องและปลอดภัยที่สุดคือข้อใด?",
      "en": "K3 First Aid Excellence #8: ACCIDENTAL SCALDING / BURN from boiling liquids 🔥 💧: What is the proven first aid protocol?",
      "zh": "幼儿园大班应急自救素养第 8 题：日常不慎被“滚烫开水严重烫伤或被高温电熨斗灼伤红肿” 🔥 💧 时，最科学标准的黄金自救处置法则是？"
    },
    "illustration": "🔥 💧 🚿",
    "illustrationSubtitle": {
      "th": "การปฐมพยาบาลแผลน้ำร้อนลวก: ล้างด้วยน้ำเย็นไหลผ่าน",
      "en": "Scald first aid: Cool running tap water for 15-20 min",
      "zh": "烫伤科学急救守则：冷水持续冲洗降温防起泡"
    },
    "options": [
      {
        "id": "opt-k3-hea-h8-1",
        "label": {
          "th": "รีบนำแผลไปแช่หรือเปิดน้ำสะอาดอุณหภูมิห้องให้ไหลผ่านอย่างต่อเนื่อง 15-20 นาทีเพื่อลดความร้อน ห้ามทายาสีฟันหรือน้ำปลา 💧 🚿",
          "en": "Flush immediately under gentle cool running tap water for 15-20 mins; NEVER apply toothpaste or fish sauce",
          "zh": "立刻将烫伤创面置于清洁流动的常温冷水下持续轻柔冲洗 15-20 分钟降温，严禁涂抹牙膏、香油或酱油 💧 🚿"
        },
        "icon": "💧"
      },
      {
        "id": "opt-k3-hea-h8-2",
        "label": {
          "th": "เอาเกลือป่นและพริกขี้หนูมาโปะทับบนแผล",
          "en": "Rub raw salt and chili powder onto burn",
          "zh": "直接抓起一大把粗盐和红辣椒粉使劲涂抹揉搓在水泡创口上"
        },
        "icon": "🌶️"
      },
      {
        "id": "opt-k3-hea-h8-3",
        "label": {
          "th": "เอาไฟแช็กมาจุดลนซ้ำเพื่อให้แห้ง",
          "en": "Use a lighter flame to dry the burn",
          "zh": "顺手拿打火机明火在破皮创面上再次烘烤干燥消毒"
        },
        "icon": "🔥"
      }
    ],
    "correctOptionId": "opt-k3-hea-h8-1",
    "explanation": {
      "th": "การใช้น้ำเย็นไหลผ่านช่วยหยุดการทำลายเนื้อเยื่อจากความร้อน และป้องกันการติดเชื้อ เก่งมากครับ!",
      "en": "Spot on! Immediate cool water perfusion dissipates residual thermal energy and preserves tissue integrity.",
      "zh": "太棒了！牢记烫伤“冲、脱、泡、盖、送”黄金法则，绝不可听信偏方抹牙膏酱油！"
    }
  },
  {
    "id": "k3-hea-h9",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "การปฐมพยาบาลขั้นสูงระดับชั้นอนุบาล 3 ชุดที่ 9: หากเกิดอุบัติเหตุ \"น้ำร้อนลวกผิวหนังหรือโดนของร้อนสัมผัส\" 🔥 💧 ขั้นตอนการปฐมพยาบาลที่ถูกต้องและปลอดภัยที่สุดคือข้อใด?",
      "en": "K3 First Aid Excellence #9: ACCIDENTAL SCALDING / BURN from boiling liquids 🔥 💧: What is the proven first aid protocol?",
      "zh": "幼儿园大班应急自救素养第 9 题：日常不慎被“滚烫开水严重烫伤或被高温电熨斗灼伤红肿” 🔥 💧 时，最科学标准的黄金自救处置法则是？"
    },
    "illustration": "🔥 💧 🚿",
    "illustrationSubtitle": {
      "th": "การปฐมพยาบาลแผลน้ำร้อนลวก: ล้างด้วยน้ำเย็นไหลผ่าน",
      "en": "Scald first aid: Cool running tap water for 15-20 min",
      "zh": "烫伤科学急救守则：冷水持续冲洗降温防起泡"
    },
    "options": [
      {
        "id": "opt-k3-hea-h9-1",
        "label": {
          "th": "เอาเกลือป่นและพริกขี้หนูมาโปะทับบนแผล",
          "en": "Rub raw salt and chili powder onto burn",
          "zh": "直接抓起一大把粗盐和红辣椒粉使劲涂抹揉搓在水泡创口上"
        },
        "icon": "🌶️"
      },
      {
        "id": "opt-k3-hea-h9-2",
        "label": {
          "th": "รีบนำแผลไปแช่หรือเปิดน้ำสะอาดอุณหภูมิห้องให้ไหลผ่านอย่างต่อเนื่อง 15-20 นาทีเพื่อลดความร้อน ห้ามทายาสีฟันหรือน้ำปลา 💧 🚿",
          "en": "Flush immediately under gentle cool running tap water for 15-20 mins; NEVER apply toothpaste or fish sauce",
          "zh": "立刻将烫伤创面置于清洁流动的常温冷水下持续轻柔冲洗 15-20 分钟降温，严禁涂抹牙膏、香油或酱油 💧 🚿"
        },
        "icon": "💧"
      },
      {
        "id": "opt-k3-hea-h9-3",
        "label": {
          "th": "เอาไฟแช็กมาจุดลนซ้ำเพื่อให้แห้ง",
          "en": "Use a lighter flame to dry the burn",
          "zh": "顺手拿打火机明火在破皮创面上再次烘烤干燥消毒"
        },
        "icon": "🔥"
      }
    ],
    "correctOptionId": "opt-k3-hea-h9-2",
    "explanation": {
      "th": "การใช้น้ำเย็นไหลผ่านช่วยหยุดการทำลายเนื้อเยื่อจากความร้อน และป้องกันการติดเชื้อ เก่งมากครับ!",
      "en": "Spot on! Immediate cool water perfusion dissipates residual thermal energy and preserves tissue integrity.",
      "zh": "太棒了！牢记烫伤“冲、脱、泡、盖、送”黄金法则，绝不可听信偏方抹牙膏酱油！"
    }
  },
  {
    "id": "k3-hea-h10",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "การปฐมพยาบาลขั้นสูงระดับชั้นอนุบาล 3 ชุดที่ 10: หากเกิดอุบัติเหตุ \"น้ำร้อนลวกผิวหนังหรือโดนของร้อนสัมผัส\" 🔥 💧 ขั้นตอนการปฐมพยาบาลที่ถูกต้องและปลอดภัยที่สุดคือข้อใด?",
      "en": "K3 First Aid Excellence #10: ACCIDENTAL SCALDING / BURN from boiling liquids 🔥 💧: What is the proven first aid protocol?",
      "zh": "幼儿园大班应急自救素养第 10 题：日常不慎被“滚烫开水严重烫伤或被高温电熨斗灼伤红肿” 🔥 💧 时，最科学标准的黄金自救处置法则是？"
    },
    "illustration": "🔥 💧 🚿",
    "illustrationSubtitle": {
      "th": "การปฐมพยาบาลแผลน้ำร้อนลวก: ล้างด้วยน้ำเย็นไหลผ่าน",
      "en": "Scald first aid: Cool running tap water for 15-20 min",
      "zh": "烫伤科学急救守则：冷水持续冲洗降温防起泡"
    },
    "options": [
      {
        "id": "opt-k3-hea-h10-1",
        "label": {
          "th": "เอาไฟแช็กมาจุดลนซ้ำเพื่อให้แห้ง",
          "en": "Use a lighter flame to dry the burn",
          "zh": "顺手拿打火机明火在破皮创面上再次烘烤干燥消毒"
        },
        "icon": "🔥"
      },
      {
        "id": "opt-k3-hea-h10-2",
        "label": {
          "th": "เอาเกลือป่นและพริกขี้หนูมาโปะทับบนแผล",
          "en": "Rub raw salt and chili powder onto burn",
          "zh": "直接抓起一大把粗盐和红辣椒粉使劲涂抹揉搓在水泡创口上"
        },
        "icon": "🌶️"
      },
      {
        "id": "opt-k3-hea-h10-3",
        "label": {
          "th": "รีบนำแผลไปแช่หรือเปิดน้ำสะอาดอุณหภูมิห้องให้ไหลผ่านอย่างต่อเนื่อง 15-20 นาทีเพื่อลดความร้อน ห้ามทายาสีฟันหรือน้ำปลา 💧 🚿",
          "en": "Flush immediately under gentle cool running tap water for 15-20 mins; NEVER apply toothpaste or fish sauce",
          "zh": "立刻将烫伤创面置于清洁流动的常温冷水下持续轻柔冲洗 15-20 分钟降温，严禁涂抹牙膏、香油或酱油 💧 🚿"
        },
        "icon": "💧"
      }
    ],
    "correctOptionId": "opt-k3-hea-h10-3",
    "explanation": {
      "th": "การใช้น้ำเย็นไหลผ่านช่วยหยุดการทำลายเนื้อเยื่อจากความร้อน และป้องกันการติดเชื้อ เก่งมากครับ!",
      "en": "Spot on! Immediate cool water perfusion dissipates residual thermal energy and preserves tissue integrity.",
      "zh": "太棒了！牢记烫伤“冲、脱、泡、盖、送”黄金法则，绝不可听信偏方抹牙膏酱油！"
    }
  }
];
