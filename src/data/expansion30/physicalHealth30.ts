import { Question } from '../../types';

export const EXPANSION_30_PHYSICAL_HEALTH: Question[] = [
  {
    "id": "exp30-ph-k1-01",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "สุขอนามัยประจำวัน: ก่อนรับประทานอาหารทุกมื้อ 🍽️ เด็กๆ ควรทำสิ่งใดก่อนเสมอ?",
      "en": "Daily hygiene: What should children always do before eating any meal 🍽️?",
      "zh": "日常卫生习惯：在坐下来准备享用美味饭菜之前 🍽️，小朋友必须先做什么？"
    },
    "illustration": "🧼 🚰 🖐️ 🍽️ ✨",
    "illustrationSubtitle": {
      "th": "การล้างมือด้วยสบู่ก่อนทานอาหาร",
      "en": "Wash hands clean with soap and water",
      "zh": "用肥皂和流动清水把小手洗干净"
    },
    "options": [
      {
        "id": "opt-wash-hands",
        "label": {
          "th": "ล้างมือด้วยสบู่และน้ำสะอาดให้สะอาด",
          "en": "Wash hands with soap and water",
          "zh": "用肥皂和水彻底清洗双手"
        },
        "icon": "🧼"
      },
      {
        "id": "opt-wipe-pants",
        "label": {
          "th": "เช็ดมือกับกางเกงที่ใส่อยู่",
          "en": "Wipe hands on pants",
          "zh": "直接在裤腿上抹两把"
        },
        "icon": "👖"
      },
      {
        "id": "opt-play-dirt",
        "label": {
          "th": "เอามือไปกอบทรายเล่นก่อน",
          "en": "Scoop sand with bare hands",
          "zh": "先去沙坑抓把泥沙"
        },
        "icon": "🏖️"
      }
    ],
    "correctOptionId": "opt-wash-hands",
    "explanation": {
      "th": "เก่งมากจ้ะ! ล้างมือด้วยสบู่ช่วยกำจัดเชื้อโรค ป้องกันไม่ให้เชื้อโรคปนเปื้อนลงในอาหารจ้า",
      "en": "Great job! Washing hands with soap removes germs and prevents tummy aches!",
      "zh": "真棒！饭前用香皂洗净双手，能有效防止病从口入，健康成长！"
    }
  },
  {
    "id": "exp30-ph-k1-02",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "การดูแลช่องปาก: เพื่อให้ฟันขาวสะอาดแข็งแรง ไม่ผุ 🪥 เราควรแปรงฟันวันละอย่างน้อยกี่ครั้ง?",
      "en": "Dental care: To keep teeth strong and cavity-free 🪥, brush at least how many times a day?",
      "zh": "牙齿保健：为了牙齿洁白坚固没有蛀牙虫 🪥，我们每天至少应该刷牙几次？"
    },
    "illustration": "🪥 🦷 🫧 ✨ 🌞 🌙",
    "illustrationSubtitle": {
      "th": "แปรงฟันเช้าและก่อนนอนอย่างน้อยวันละ 2 ครั้ง",
      "en": "Brush at least twice daily (morning & night)",
      "zh": "早晚各一次，每天至少刷牙两次"
    },
    "options": [
      {
        "id": "opt-once-a-week",
        "label": {
          "th": "สัปดาห์ละ 1 ครั้งเท่านั้น โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Only once a week",
          "zh": "每周仅刷一次"
        },
        "icon": "📅"
      },
      {
        "id": "opt-two-times",
        "label": {
          "th": "อย่างน้อยวันละ 2 ครั้ง (ตอนเช้าและก่อนนอน)",
          "en": "At least twice daily (morning & bedtime)",
          "zh": "每天至少 2 次（早晨起床和晚上睡前）"
        },
        "icon": "🪥"
      },
      {
        "id": "opt-never-brush",
        "label": {
          "th": "ไม่ต้องแปรงเลยตลอดปี โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Never brush all year",
          "zh": "一整年都从来不刷牙"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-two-times",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! แปรงฟันตอนเช้าและก่อนนอน ช่วยขจัดเศษอาหารและป้องกันฟันผุได้ดีที่สุด",
      "en": "Correct! Brushing morning and night keeps teeth sparkling clean and protects against decay!",
      "zh": "完全正确！早晚用含氟牙膏认真刷牙，细菌无处藏身，笑容甜美牙齿棒！"
    }
  },
  {
    "id": "exp30-ph-k1-03",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "อาหารที่มีประโยชน์: ภาพใดเป็นอาหารที่ช่วยให้ร่างกายแข็งแรงและขับถ่ายสะดวก? 🥦 🍎 🍭",
      "en": "Healthy eating: Which food group keeps bodies strong and aids healthy digestion? 🥦 🍎 🍭",
      "zh": "健康营养：哪种食物能为身体补充充足维生素、帮助健康消化排便？🥦 🍎 🍭"
    },
    "illustration": "🥦 🥕 🍎 🍌 ✨",
    "illustrationSubtitle": {
      "th": "ผักและผลไม้สดหลากสีสัน",
      "en": "Fresh colorful fruits and vegetables",
      "zh": "新鲜蔬菜与营养水果"
    },
    "options": [
      {
        "id": "opt-candies-soda",
        "label": {
          "th": "ลูกอมและน้ำอัดลมรสหวานจัด",
          "en": "Sugary candies and carbonated soda",
          "zh": "甜腻的糖果与碳酸汽水"
        },
        "icon": "🍭"
      },
      {
        "id": "opt-fried-chips-only",
        "label": {
          "th": "ขนมกรุบกรอบรสเค็มจัด",
          "en": "Salty processed potato chips",
          "zh": "重盐高油的油炸膨化薯片"
        },
        "icon": "🍟"
      },
      {
        "id": "opt-fruits-veggies",
        "label": {
          "th": "ผักสดและผลไม้หลากสี 🥦🍎",
          "en": "Fresh fruits and vegetables 🥦🍎",
          "zh": "新鲜的绿色蔬菜与多汁水果 🥦🍎"
        },
        "icon": "🥦"
      }
    ],
    "correctOptionId": "opt-fruits-veggies",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ผักและผลไม้มีวิตามินและกากใย ช่วยให้ระบบย่อยทำงานดี ร่างกายสดชื่นแข็งแรง",
      "en": "Awesome! Fruits and veggies are packed with vitamins and dietary fiber for tip-top health!",
      "zh": "太棒了！新鲜蔬果富含维生素与丰富膳食纤维，增强免疫力，小肚子舒舒服服！"
    }
  },
  {
    "id": "exp30-ph-k1-04",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "การนอนหลับพักผ่อน: เด็กๆ วัยเจริญเติบโต ควรเข้านอนในเวลาใดเพื่อให้ร่างกายหลั่งฮอร์โมนสูงขึ้น? 🌙",
      "en": "Bedtime hygiene: Growing children should head to bed at what hour for optimal growth? 🌙",
      "zh": "睡眠健康：处于生长发育黄金期的小朋友，应该什么时候上床安睡以促进长高？🌙"
    },
    "illustration": "🌙 🛌 😴 💤 ✨",
    "illustrationSubtitle": {
      "th": "เข้านอนแต่หัวค่ำ พักผ่อนเต็มอิ่ม",
      "en": "Sleep early (around 8-9 PM) for full rest",
      "zh": "早睡早起，晚上 8 到 9 点按时睡觉"
    },
    "options": [
      {
        "id": "opt-sleep-early",
        "label": {
          "th": "เข้านอนแต่หัวค่ำ (ประมาณ 2 ทุ่ม ถึง 3 ทุ่ม) และนอนหลับเต็มอิ่ม",
          "en": "Sleep early (around 8-9 PM) for full 10 hours",
          "zh": "早早上床睡觉（约晚上 8-9 点），保证充足安稳睡眠"
        },
        "icon": "😴"
      },
      {
        "id": "opt-stay-midnight",
        "label": {
          "th": "เล่นเกมมือถือจนถึงตีสอง โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Play smartphone games until 2 AM",
          "zh": "抱着手机玩游戏熬夜到凌晨两点"
        },
        "icon": "📱"
      },
      {
        "id": "opt-no-sleep",
        "label": {
          "th": "ไม่ยอมนอนเลยทั้งคืน โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Stay awake all night long",
          "zh": "彻夜不睡通宵闹腾"
        },
        "icon": "🦉"
      }
    ],
    "correctOptionId": "opt-sleep-early",
    "explanation": {
      "th": "เก่งมากจ้ะ! การเข้านอนแต่หัวค่ำช่วยให้ฮอร์โมนการเจริญเติบโต (Growth Hormone) ทำงาน ทำให้หนูตัวสูงและฉลาด",
      "en": "Great job! Sleeping early releases growth hormones, helping muscles grow and brains recharge!",
      "zh": "真聪明！早睡能让生长激素充分分泌，促进骨骼长高、大脑发育，精力充沛！"
    }
  },
  {
    "id": "exp30-ph-k1-05",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "การออกกำลังกาย: กิจกรรมใดช่วยให้กล้ามเนื้อขาแข็งแรงและหัวใจสูบฉีดเลือดได้ดี? 🏃 🚴",
      "en": "Physical play: Which activity strengthens leg muscles and builds healthy hearts? 🏃 🚴",
      "zh": "体育运动：哪一种户外活动最能锻炼腿部肌肉、增强心肺功能？🏃 🚴"
    },
    "illustration": "🏃 🚴 ⚽ 🤸 ✨",
    "illustrationSubtitle": {
      "th": "การวิ่งเล่น ปั่นจักรยาน และเตะฟุตบอล",
      "en": "Running, cycling, and playing ball games",
      "zh": "跑步、骑小车和草地踢球"
    },
    "options": [
      {
        "id": "opt-sit-still-all-day",
        "label": {
          "th": "นั่งนิ่งๆ หน้าจอทีวีตลอดทั้งวัน",
          "en": "Sitting motionless watching TV all day",
          "zh": "一整天瘫在沙发上看电视不动弹"
        },
        "icon": "📺"
      },
      {
        "id": "opt-run-cycle",
        "label": {
          "th": "การวิ่งเล่นกลางแจ้งและปั่นจักรยานสามล้อ",
          "en": "Running outdoors and cycling tricycle",
          "zh": "在户外快乐奔跑、骑三轮小自行车"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-eat-lying-down",
        "label": {
          "th": "นอนกินขนมไม่ขยับตัว ใดๆ เลยทั้งสิ้น",
          "en": "Lying down eating snacks lazily",
          "zh": "躺在床上边嚼零食边发呆"
        },
        "icon": "🛋️"
      }
    ],
    "correctOptionId": "opt-run-cycle",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! การวิ่งเล่นและปั่นจักรยานทำให้กล้ามเนื้อแข็งแรง ปอดและหัวใจทำงานดีเยี่ยม",
      "en": "Correct! Outdoor running and cycling builds strong bones, muscles, and cheerful energy!",
      "zh": "完全正确！户外奔跑和蹬自行车强健骨骼与肺活量，呼吸新鲜空气身体棒！"
    }
  },
  {
    "id": "exp30-ph-k1-06",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "การดื่มน้ำ: เครื่องดื่มชนิดใดดีที่สุดต่อสุขภาพร่างกายของเด็กๆ ตลอดทั้งวัน? 💧 🥤",
      "en": "Hydration: What is the very healthiest beverage to drink throughout the day? 💧",
      "zh": "健康补水：每天最健康、最适合小朋友身体发育的常备饮品是哪一种？💧"
    },
    "illustration": "🥛 💧 🚰 ✨ 😋",
    "illustrationSubtitle": {
      "th": "น้ำเปล่าสะอาดบริสุทธิ์",
      "en": "Pure, clean drinking water",
      "zh": "纯净温开水或白开水"
    },
    "options": [
      {
        "id": "opt-sugary-fizzy",
        "label": {
          "th": "น้ำอัดลมน้ำตาลสูงผสมสี",
          "en": "Sugary colored fizzy soda",
          "zh": "高糖高添加剂的彩色汽水"
        },
        "icon": "🥤"
      },
      {
        "id": "opt-coffee-tea",
        "label": {
          "th": "กาแฟดำขมจัด",
          "en": "Bitter black coffee",
          "zh": "苦涩浓咖啡"
        },
        "icon": "☕"
      },
      {
        "id": "opt-clean-water",
        "label": {
          "th": "น้ำเปล่าสะอาดบริสุทธิ์ 💧",
          "en": "Pure clean drinking water 💧",
          "zh": "清澈纯净的温开水 💧"
        },
        "icon": "💧"
      }
    ],
    "correctOptionId": "opt-clean-water",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! น้ำเปล่าสะอาดช่วยดับกระหาย ช่วยให้ระบบไหลเวียนโลหิตดีและไม่มีน้ำตาลส่วนเกิน",
      "en": "Awesome! Pure water hydrates cells perfectly without cavities or excess sugars!",
      "zh": "太棒了！白开水最解渴、促进新陈代谢，无添加无糖分，是健康的最佳燃料！"
    }
  },
  {
    "id": "exp30-ph-k1-07",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "การแต่งกายป้องกันเชื้อโรค: เวลาออกไปเดินเล่นนอกบ้าน หนูควรสวมใส่อะไรที่เท้าเสมอ? 👟",
      "en": "Foot protection: What must you always wear on your feet when walking outside? 👟",
      "zh": "足部保护：走出家门到室外散步或玩耍时，小脚丫上必须穿戴什么？👟"
    },
    "illustration": "👟 🧦 🦶 🛡️",
    "illustrationSubtitle": {
      "th": "สวมรองเท้าป้องกันเชื้อโรคและของมีคม",
      "en": "Wear shoes to protect feet from sharps & germs",
      "zh": "穿好运动鞋袜，防止尖锐石子扎脚和细菌感染"
    },
    "options": [
      {
        "id": "opt-wear-shoes",
        "label": {
          "th": "สวมถุงเท้าและรองเท้าที่พอดีเท้า 👟",
          "en": "Wear fitting socks and shoes 👟",
          "zh": "穿好舒适合脚的袜子与运动鞋 👟"
        },
        "icon": "👟"
      },
      {
        "id": "opt-barefoot-street",
        "label": {
          "th": "เดินเท้าเปล่าบนถนนที่มีเศษหิน",
          "en": "Walk barefoot on gravel streets",
          "zh": "光着脚丫踩碎石子马路"
        },
        "icon": "🦶"
      },
      {
        "id": "opt-plastic-bags",
        "label": {
          "th": "ผูกถุงขยะที่เท้าแทนรองเท้า",
          "en": "Tie trash bags to feet",
          "zh": "脚上套两个破塑料袋"
        },
        "icon": "🛍️"
      }
    ],
    "correctOptionId": "opt-wear-shoes",
    "explanation": {
      "th": "เก่งมากจ้ะ! รองเท้าช่วยป้องกันไม่ให้เศษแก้ว เศษหิน หรือเชื้อโรคในดินบาดและแทงเท้าเรา",
      "en": "Great job! Shoes protect sensitive soles from sharp pebbles, glass, and dirt parasites!",
      "zh": "真棒！穿上合脚的小鞋子，能全面抵挡碎石玻璃扎伤与地面脏污，安全又舒适！"
    }
  },
  {
    "id": "exp30-ph-k1-08",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "มารยาทเมื่อไอหรือจาม: เมื่อรู้สึกอยากจาม \"ฮัดชิ่ว!\" 🤧 หนูควรทำอย่างไรเพื่อไม่ให้เชื้อโรคกระจายใส่เพื่อน?",
      "en": "Cough etiquette: When you feel a sneeze coming \"Achoo!\" 🤧, how should you block it?",
      "zh": "咳嗽喷嚏卫生礼仪：当想打喷嚏“阿嚏！”时 🤧，该怎么遮挡才不把病菌飞沫传染给小朋友？"
    },
    "illustration": "🤧 🧻 👕 🧼 😷",
    "illustrationSubtitle": {
      "th": "ใช้ทิชชู่หรือข้อศอกปิดปากและจมูก",
      "en": "Cover mouth & nose with tissue or inner elbow",
      "zh": "用纸巾或弯曲手肘臂弯遮挡口鼻"
    },
    "options": [
      {
        "id": "opt-sneeze-friends",
        "label": {
          "th": "จามใส่หน้าเพื่อนตรงๆ เต็มแรง โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Sneeze directly into a friend’s face",
          "zh": "正对着同伴的脸使劲喷"
        },
        "icon": "💨"
      },
      {
        "id": "opt-cover-elbow",
        "label": {
          "th": "ใช้ทิชชู่หรือยกข้อพับแขนเสื้อขึ้นมาปิดปากและจมูก",
          "en": "Cover mouth/nose with tissue or elbow crook",
          "zh": "用纸巾或抬起衣袖内侧手肘遮住口鼻"
        },
        "icon": "😷"
      },
      {
        "id": "opt-spit-floor",
        "label": {
          "th": "บ้วนน้ำลายลงพื้นห้องเรียน โดยไม่สนใจฟังคุณครู",
          "en": "Spit on classroom floor",
          "zh": "直接往教室地板上吐口水"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-cover-elbow",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! การใช้ข้อพับแขนหรือทิชชู่ปิด จะช่วยป้องกันไม่ให้ละอองเชื้อโรคฟุ้งกระจายไปในอากาศจ้า",
      "en": "Correct! Sneezing into your inner elbow or a tissue traps aerosol droplets safely!",
      "zh": "完全正确！用手肘内侧或纸巾遮挡口鼻，飞沫不会飞溅，是最有教养的卫生习惯！"
    }
  },
  {
    "id": "exp30-ph-k1-09",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "การดูแลเล็บมือเล็บเท้า: เมื่อเล็บมือยาวและเริ่มมีขี้เล็บดำติดอยู่ 🖐️ ควรให้คุณพ่อคุณแม่ช่วยทำอะไร?",
      "en": "Nail hygiene: When fingernails grow long with dirt underneath 🖐️, what should parents do?",
      "zh": "指甲护理：当发现手指甲长长了、里面藏有黑黑的污垢时 🖐️，应该请爸爸妈妈做什么？"
    },
    "illustration": "🖐️ ✂️ 💅 ✨ 🧼",
    "illustrationSubtitle": {
      "th": "การตัดเล็บให้สั้นและสะอาด",
      "en": "Trim fingernails neatly and keep clean",
      "zh": "用指甲剪剪短指甲并彻底洗净"
    },
    "options": [
      {
        "id": "opt-bite-nails",
        "label": {
          "th": "ใช้ฟันกัดแทะเล็บกินเข้าไป โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Chew and swallow dirty nails",
          "zh": "用嘴巴牙齿把脏指甲啃下来吞掉"
        },
        "icon": "🦷"
      },
      {
        "id": "opt-scratch-face",
        "label": {
          "th": "เอาไปข่วนหน้าเพื่อนเล่น กับเพื่อนๆ รอบตัว",
          "en": "Scratch friends’ faces",
          "zh": "拿去挠小朋友的脸蛋"
        },
        "icon": "🐱"
      },
      {
        "id": "opt-trim-nails",
        "label": {
          "th": "ใช้กรรไกรตัดเล็บตัดให้สั้นและล้างมือให้สะอาด",
          "en": "Use nail clippers to trim and wash clean",
          "zh": "用专用指甲剪把指甲修剪平整并洗手"
        },
        "icon": "✂️"
      }
    ],
    "correctOptionId": "opt-trim-nails",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! การตัดเล็บให้สั้นช่วยไม่ให้เป็นที่สะสมของเชื้อโรค และไม่เผลอข่วนตัวเองจนเป็นแผล",
      "en": "Awesome! Trimming nails prevents dirt buildup and stops accidental scratching!",
      "zh": "太棒了！定期修剪短指甲，细菌虫卵无处躲藏，小手干净健康，也不会抓破皮肤！"
    }
  },
  {
    "id": "exp30-ph-k1-10",
    "grade": "K1",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 1,
    "question": {
      "th": "การเล่นเครื่องเล่นสนามอย่างปลอดภัย: เวลาเล่นสไลเดอร์ (กระดานลื่น) 🛝 ท่าทางใดถูกต้องและปลอดภัยที่สุด?",
      "en": "Playground safety: What is the safest, correct way to slide down a slide 🛝?",
      "zh": "户外滑梯安全：在幼儿园玩大滑梯时 🛝，哪一种下滑姿势最规范、最安全？"
    },
    "illustration": "🛝 🧒 ⬇️ 👟 ✨",
    "illustrationSubtitle": {
      "th": "นั่งหย่อนเท้าไปข้างหน้าแล้วค่อยๆ ลื่นลงมา",
      "en": "Sit upright with feet forward and slide down",
      "zh": "坐稳上身、双脚朝前、顺畅滑下"
    },
    "options": [
      {
        "id": "opt-feet-first",
        "label": {
          "th": "นั่งตัวตรง ยื่นเท้าไปข้างหน้า แล้วค่อยๆ ลื่นลงมา",
          "en": "Sit upright, feet forward, slide down seated",
          "zh": "端正坐好，双脚伸向前方自然滑下"
        },
        "icon": "🛝"
      },
      {
        "id": "opt-head-first",
        "label": {
          "th": "เอาหัวทิ่มพุ่งลงมาก่อน โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Dive headfirst on your belly",
          "zh": "头朝下趴着俯冲滑下"
        },
        "icon": "⚠️"
      },
      {
        "id": "opt-stand-up",
        "label": {
          "th": "ยืนกระโดดบนราวสไลเดอร์ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Stand and jump off the top rails",
          "zh": "站在最高处的护栏上跳跃"
        },
        "icon": "🚫"
      }
    ],
    "correctOptionId": "opt-feet-first",
    "explanation": {
      "th": "เก่งที่สุด! การนั่งหันเท้าไปข้างหน้า ช่วยให้ทรงตัวได้มั่นคงและเบรกเท้าได้เมื่อถึงพื้นอย่างปลอดภัย",
      "en": "Splendid! Sliding feet-first seated upright allows safe balancing and soft landings!",
      "zh": "回答精彩！脚朝前坐着滑最平稳，到底后小脚平稳着地，开心安全不受伤！"
    }
  },
  {
    "id": "exp30-ph-k2-01",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "โภชนาการอาหาร 5 หมู่: นมสด 🥛 ไข่ไก่ 🥚 และเนื้อปลา 🐟 จัดอยู่ในอาหารหมู่ใดที่ช่วยซ่อมแซมร่างกาย?",
      "en": "Nutrition: Milk 🥛, eggs 🥚, and fish 🐟 belong to which food group that builds muscle?",
      "zh": "五大营养素：鲜牛奶 🥛、鸡蛋 🥚 与清蒸鱼 🐟 属于哪种帮助长高长肉的食物类别？"
    },
    "illustration": "🥛 🥚 🐟 🍗 💪",
    "illustrationSubtitle": {
      "th": "โปรตีน: เสริมสร้างกล้ามเนื้อและซ่อมแซมร่างกาย",
      "en": "Protein: Builds muscles & tissue growth",
      "zh": "优质蛋白质：构筑强壮肌肉与组织修复"
    },
    "options": [
      {
        "id": "opt-fat-only",
        "label": {
          "th": "ไขมันทอดเกรียม โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Fried fat only",
          "zh": "纯油脂类"
        },
        "icon": "🧈"
      },
      {
        "id": "opt-protein",
        "label": {
          "th": "โปรตีน (ช่วยสร้างกล้ามเนื้อและทำให้ตัวสูง)",
          "en": "Protein (Muscle building & height)",
          "zh": "蛋白质类 (帮助长高长肌肉)"
        },
        "icon": "💪"
      },
      {
        "id": "opt-sugar-candy",
        "label": {
          "th": "น้ำตาลสังเคราะห์ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Refined sugar",
          "zh": "纯白糖"
        },
        "icon": "🍬"
      }
    ],
    "correctOptionId": "opt-protein",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! โปรตีนจากนม ไข่ และเนื้อสัตว์ จำเป็นต่อการเจริญเติบโตของเด็กๆ ในวัยเรียนรู้",
      "en": "Correct! Protein from milk, eggs, and lean meats fuels bone and muscle development!",
      "zh": "完全正确！牛奶、鸡蛋和鱼肉富含丰富优质蛋白质，是长高变壮不可或缺的基石！"
    }
  },
  {
    "id": "exp30-ph-k2-02",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "สุขอนามัยสายตา: เวลาดูแท็บเล็ตหรืออ่านนิทาน 📖 ควรนั่งในท่าทางและระยะห่างอย่างไร?",
      "en": "Eye care: Reading storybooks or screens 📖, what is the healthy distance and posture?",
      "zh": "用眼卫生习惯：读绘本或者看屏幕时 📖，怎样的坐姿和距离最能保护明亮双眼？"
    },
    "illustration": "🪑 📖 👁️ 📏 💡",
    "illustrationSubtitle": {
      "th": "นั่งหลังตรง ระยะห่างพอเหมาะ และมีแสงสว่างเพียงพอ",
      "en": "Sit upright, arm’s length away, with good light",
      "zh": "坐姿端正、保持一臂远距离、光线柔和明亮"
    },
    "options": [
      {
        "id": "opt-lie-dark",
        "label": {
          "th": "นอนคว่ำหน้าจ้องในห้องมืดสนิท โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Lie face down staring closely in total dark",
          "zh": "趴在黑漆漆的被窝里贴着眼睛看"
        },
        "icon": "🛏️"
      },
      {
        "id": "opt-touch-screen",
        "label": {
          "th": "เอาลูกตาแนบชิดติดหน้าจอ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Press eyeballs directly onto the screen",
          "zh": "把眼皮贴在屏幕玻璃上"
        },
        "icon": "📱"
      },
      {
        "id": "opt-upright-distance",
        "label": {
          "th": "นั่งหลังตรง มีแสงสว่างเพียงพอ และห่างจากตาประมาณ 1 ฟุต (ช่วงแขน)",
          "en": "Sit upright, well-lit, an arm’s length away",
          "zh": "端正坐直、室内光线充足、距离眼睛保持一臂左右远"
        },
        "icon": "📖"
      }
    ],
    "correctOptionId": "opt-upright-distance",
    "explanation": {
      "th": "เก่งกาจมาก! การนั่งหลังตรง มีแสงสว่างพอ และเว้นระยะห่าง จะช่วยถนอมสายตาไม่ให้สั้นหรือเมื่อยล้า",
      "en": "Brilliant! Proper posture, sufficient ambient light, and arm’s-length distance protect growing vision!",
      "zh": "太聪明了！保持一臂距离、端正坐姿、充足光线，双眼明亮不疲劳、不近视！"
    }
  },
  {
    "id": "exp30-ph-k2-03",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "การทรงตัวและการประสานสัมพันธ์: การเดินต่อเท้าบนเส้นตรงบนพื้น 🚶 โดยไม่กางแขนเซไปมา ช่วยฝึกทักษะใด?",
      "en": "Balance coordination: Walking heel-to-toe along a straight floor line 🚶 trains which physical skill?",
      "zh": "平衡协调能力：沿着地面上的直线脚尖挨着脚跟往前走 🚶，主要锻炼身体什么素质？"
    },
    "illustration": "🚶 ⚖️ 〰️ 🦶 ✨",
    "illustrationSubtitle": {
      "th": "การทรงตัวและการควบคุมกล้ามเนื้อใหญ่",
      "en": "Dynamic body balance and gross motor control",
      "zh": "身体动态平衡与核心肌肉协调"
    },
    "options": [
      {
        "id": "opt-balance-control",
        "label": {
          "th": "การทรงตัวและความแข็งแรงของกล้ามเนื้อทรงตัว",
          "en": "Balance equilibrium and core stability",
          "zh": "身体平衡感与大肌肉协调控制能力"
        },
        "icon": "⚖️"
      },
      {
        "id": "opt-digging-soil",
        "label": {
          "th": "การขุดดินปลูกผัก โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Digging garden soil",
          "zh": "挥铁锹挖泥巴"
        },
        "icon": "🪴"
      },
      {
        "id": "opt-sleeping-sound",
        "label": {
          "th": "การนอนกรนเสียงดัง โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Loud bedtime snoring",
          "zh": "打呼噜声响"
        },
        "icon": "😴"
      }
    ],
    "correctOptionId": "opt-balance-control",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! การฝึกเดินบนเส้นช่วยพัฒนาการทรงตัว การทำงานประสานกันของสายตา เท้า และสมอง",
      "en": "Awesome! Heel-to-toe balance line walking hones vestibular coordination and core stability!",
      "zh": "太棒了！走平衡直线极大激活小脑平衡中枢，让步态更稳健轻快！"
    }
  },
  {
    "id": "exp30-ph-k2-04",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "ความปลอดภัยจากของร้อนในครัว: เมื่อเห็นกาน้ำร้อนกำลังเดือดมีควันพุ่ง 🫖 เด็กๆ ควรปฏิบัติตนอย่างไร?",
      "en": "Kitchen safety: You spot a boiling kettle steaming on the stove 🫖. What must you do?",
      "zh": "厨房高温安全常识：看见炉灶上正烧开滚水的大水壶咕嘟咕嘟冒热气 🫖，应该怎样？"
    },
    "illustration": "🫖 💨 🔥 ⚠️ 🛑",
    "illustrationSubtitle": {
      "th": "อยู่ห่างจากของร้อนและเตาไฟ",
      "en": "Stay far back from hot stoves and boiling liquids",
      "zh": "远离滚烫灶台，绝不伸手触碰"
    },
    "options": [
      {
        "id": "opt-touch-spout",
        "label": {
          "th": "เอานิ้วไปอุดที่พวยกาน้ำร้อน โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Plug the steaming spout with a finger",
          "zh": "用手指去堵喷热气的水壶嘴"
        },
        "icon": "🖐️"
      },
      {
        "id": "opt-stay-away-hot",
        "label": {
          "th": "อยู่ห่างๆ ไม่เข้าใกล้ และไม่เอามือไปจับเด็ดขาด",
          "en": "Keep distance and never touch with bare hands",
          "zh": "保持安全远距离，绝对不靠近、不用手碰"
        },
        "icon": "🛑"
      },
      {
        "id": "opt-pull-cord",
        "label": {
          "th": "กระตุกสายไฟให้กาน้ำล้มลงมา โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Yank electrical cords to topple it",
          "zh": "扯电线把热水壶拽下来"
        },
        "icon": "⚡"
      }
    ],
    "correctOptionId": "opt-stay-away-hot",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! น้ำเดือดและไอร้อนสามารถลวกผิวหนังให้พองเจ็บปวดมาก ต้องอยู่ห่างจากเตาไฟเสมอ",
      "en": "Correct! Boiling liquids cause severe burns; always stay safely away from cooking surfaces!",
      "zh": "完全正确！开水和高温蒸汽极易造成严重烫伤，小朋友在厨房一定要远离炉灶！"
    }
  },
  {
    "id": "exp30-ph-k2-05",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "การว่ายน้ำอย่างปลอดภัย: เมื่อไปเล่นน้ำที่สระว่ายน้ำ 🏊 เด็กที่ยังว่ายน้ำไม่เป็นควรใส่อุปกรณ์ใด?",
      "en": "Water safety: Non-swimming children playing in swimming pools 🏊 must wear which safety gear?",
      "zh": "防溺水游泳安全：去游泳池玩耍时 🏊，还不会游泳的小朋友必须穿戴什么安全救生装备？"
    },
    "illustration": "🦺 🏊 🛟 🫧 ✨",
    "illustrationSubtitle": {
      "th": "สวมเสื้อชูชีพและมีผู้ใหญ่ดูแลใกล้ชิด",
      "en": "Wear certified life jacket under adult watch",
      "zh": "穿戴正规救生衣并有大人寸步不离看护"
    },
    "options": [
      {
        "id": "opt-heavy-boots",
        "label": {
          "th": "ใส่รองเท้าบูทเหล็กหนาเตอะ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Wear heavy lead boots",
          "zh": "穿沉重的大铁靴下水"
        },
        "icon": "🥾"
      },
      {
        "id": "opt-jump-alone-deep",
        "label": {
          "th": "แอบกระโดดลงสระน้ำลึกคนเดียวเงียบๆ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Sneak into deep end alone",
          "zh": "背着大人偷偷跳进深水区"
        },
        "icon": "⚠️"
      },
      {
        "id": "opt-life-jacket",
        "label": {
          "th": "สวมเสื้อชูชีพที่ได้มาตรฐาน และมีผู้ใหญ่ดูแลใกล้ชิด",
          "en": "Wear certified life vest under direct adult watch",
          "zh": "穿戴合格的救生衣，且由大人全程在身边看护"
        },
        "icon": "🦺"
      }
    ],
    "correctOptionId": "opt-life-jacket",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! เสื้อชูชีพช่วยพยุงตัวให้ลอยน้ำ และต้องมีผู้ใหญ่คอยดูแลใกล้ชิดตลอดเวลาเพื่อความปลอดภัย",
      "en": "Awesome! A certified life jacket provides vital buoyancy, and adult supervision is essential!",
      "zh": "太棒了！救生衣提供关键安全浮力，同时大人在池边时刻看护，戏水安全第一！"
    }
  },
  {
    "id": "exp30-ph-k2-06",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "การนั่งเขียนหนังสือ: ท่านั่งที่ถูกต้องเพื่อไม่ให้กระดูกสันหลังคดงอ 🪑 คือท่าทางใด?",
      "en": "Ergonomic posture: How should children sit while drawing/writing 🪑 to protect spinal health?",
      "zh": "正确读写姿势：坐着画画写字时 🪑，怎样坐才能让脊椎骨骼笔直健康发育？"
    },
    "illustration": "🪑 🧒 📐 ✏️ 📄 ✨",
    "illustrationSubtitle": {
      "th": "นั่งหลังตรง เท้าวางราบกับพื้น ไม่ก้มชิดโต๊ะ",
      "en": "Sit upright, feet flat on floor, chest away from desk",
      "zh": "身坐直、脚放平、胸口离桌一拳远"
    },
    "options": [
      {
        "id": "opt-sit-straight",
        "label": {
          "th": "นั่งหลังตรง เท้าวางแนบพื้น อกห่างจากโต๊ะประมาณ 1 กำปั้น",
          "en": "Sit straight, feet flat, chest a fist away from desk",
          "zh": "后背挺直、双脚平踏地面、胸口离桌边一拳距离"
        },
        "icon": "🪑"
      },
      {
        "id": "opt-slouch-face",
        "label": {
          "th": "ก้มหน้าฟุบจนคางเกยโต๊ะ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Slouch with chin resting on paper",
          "zh": "弯腰驼背把下巴垫在桌子上"
        },
        "icon": "😴"
      },
      {
        "id": "opt-sit-upside",
        "label": {
          "th": "ห้อยหัวเอาขาชี้ฟ้าบนเก้าอี้ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Hang upside down on chair",
          "zh": "头下脚上倒挂在椅子上"
        },
        "icon": "🙃"
      }
    ],
    "correctOptionId": "opt-sit-straight",
    "explanation": {
      "th": "เก่งมากจ้ะ! \"หลังตรง เท้าแนบพื้น อกห่าง 1 กำปั้น ตาห่าง 1 ฟุต\" ช่วยให้บุคลิกภาพดีและไม่ปวดหลัง",
      "en": "Great job! Upright posture with grounded feet preserves spine alignment and prevents neck strain!",
      "zh": "真棒！“一拳一尺一寸”的标准健康坐姿，让脊梁挺拔如松，保护视力不驼背！"
    }
  },
  {
    "id": "exp30-ph-k2-07",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "อาหารเสริมสร้างกระดูกและฟัน: สารอาหาร \"แคลเซียม\" 🦴 มีอยู่มากในอาหารชนิดใด?",
      "en": "Bone strength: The mineral CALCIUM 🦴 is abundantly found in which wholesome food?",
      "zh": "强健骨骼与牙齿：能够让骨骼发育坚固的“钙质” 🦴，在下列哪种天然食物中含量最丰富？"
    },
    "illustration": "🥛 🧀 🦴 💪 ✨",
    "illustrationSubtitle": {
      "th": "นมสดและผลิตภัณฑ์จากนมให้แคลเซียมสูง",
      "en": "Milk and dairy are rich in calcium for strong bones",
      "zh": "鲜牛奶、奶酪富含高钙，强韧骨骼"
    },
    "options": [
      {
        "id": "opt-lollipop-only",
        "label": {
          "th": "อมยิ้มกลิ่นผลไม้สังเคราะห์",
          "en": "Artificial sugary lollipops",
          "zh": "彩色香精棒棒糖"
        },
        "icon": "🍭"
      },
      {
        "id": "opt-milk-dairy",
        "label": {
          "th": "นมสด ปลาตัวเล็ก และผักใบเขียวเข้ม 🥛",
          "en": "Fresh milk, tiny crispy fish & dark leafy greens",
          "zh": "鲜牛奶、富钙小鱼干与深绿色蔬菜 🥛"
        },
        "icon": "🥛"
      },
      {
        "id": "opt-cola-black",
        "label": {
          "th": "น้ำโคล่าสีดำหวานจัด โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Sweet black cola drinks",
          "zh": "甜可乐"
        },
        "icon": "🥤"
      }
    ],
    "correctOptionId": "opt-milk-dairy",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! นมและปลาตัวเล็กมีแคลเซียมสูง ช่วยให้กระดูกยาวขึ้น ทำให้เด็กๆ ตัวสูงและฟันแข็งแรง",
      "en": "Correct! Calcium in dairy milk builds dense bones and sparkling durable tooth enamel!",
      "zh": "完全正确！每天坚持喝纯牛奶、吃适量深绿蔬菜，补充充沛钙质，长成健壮大高个！"
    }
  },
  {
    "id": "exp30-ph-k2-08",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "ความปลอดภัยในการนั่งรถยนต์ 🚗: เมื่อเด็กๆ นั่งในรถยนต์ ต้องปฏิบัติตามกฎความปลอดภัยข้อใด?",
      "en": "Car passenger safety: Riding inside a car 🚗, what rule must children always follow?",
      "zh": "汽车乘车安全常识：小朋友坐在私家车或者校车内 🚗，必须遵守哪项至关重要的安全规则？"
    },
    "illustration": "🚗 🧒 💺 🔒 ✨",
    "illustrationSubtitle": {
      "th": "นั่งเบาะหลังและคาดเข็มขัดนิรภัยเสมอ",
      "en": "Sit in back seat and buckle seatbelt securely",
      "zh": "坐在后排儿童座椅、全程系好安全带"
    },
    "options": [
      {
        "id": "opt-stick-head-out",
        "label": {
          "th": "ยื่นหัวและแขนออกไปนอกหน้าต่างรถที่กำลังวิ่ง โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Poke head and arms out open moving windows",
          "zh": "把脑袋和双手探出疾驰的车窗外兜风"
        },
        "icon": "⚠️"
      },
      {
        "id": "opt-jump-seats",
        "label": {
          "th": "ยืนกระโดดข้ามเบาะไปมาขณะรถแล่น โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Jump back and forth between seats while driving",
          "zh": "在开动的汽车座椅间乱蹦乱跳"
        },
        "icon": "🚫"
      },
      {
        "id": "opt-buckle-seatbelt",
        "label": {
          "th": "นั่งเบาะหลังและคาดเข็มขัดนิรภัย (หรือนั่งคาร์ซีท) ตลอดการเดินทาง",
          "en": "Sit in back seat with seatbelt buckled securely",
          "zh": "坐在后排（使用儿童安全座椅），全程系好安全带"
        },
        "icon": "💺"
      }
    ],
    "correctOptionId": "opt-buckle-seatbelt",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! คาดเข็มขัดนิรภัยและนั่งเบาะหลัง ช่วยปกป้องเราจากการเบรกกะทันหันหรืออุบัติเหตุได้ปลอดภัย",
      "en": "Awesome! Fastening seatbelts in the rear cabin saves lives during sudden stops and bumps!",
      "zh": "太棒了！后排就座并牢牢扣好安全带，能在紧急刹车或颠簸中提供最坚实的保护！"
    }
  },
  {
    "id": "exp30-ph-k2-09",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "การป้องกันยุงลายกัด: เพื่อป้องกันโรคไข้เลือดออก 🦟 เราควรช่วยคุณพ่อคุณแม่ดูแลบ้านอย่างไร?",
      "en": "Dengue prevention: To prevent mosquito bites and breeding 🦟, how should we protect our home?",
      "zh": "防蚊灭蚊小常识：为了预防蚊虫叮咬和登革热 🦟，小朋友可以帮家长做些什么？"
    },
    "illustration": "🦟 🚫 🪣 💧 🪴 🐟",
    "illustrationSubtitle": {
      "th": "คว่ำภาชนะที่มีน้ำขังไม่ให้ยุงวางไข่",
      "en": "Flip water-holding containers to stop larvae",
      "zh": "清理翻倒积水容器，不让蚊子产卵繁殖"
    },
    "options": [
      {
        "id": "opt-flip-water-pots",
        "label": {
          "th": "คว่ำกะละมังและภาชนะที่มีน้ำขัง เพื่อไม่ให้ยุงมาวางไข่",
          "en": "Empty or overturn standing water containers",
          "zh": "清理倒掉花盆底等积水，扣翻所有盛水器皿"
        },
        "icon": "🪣"
      },
      {
        "id": "opt-invite-mosquitoes",
        "label": {
          "th": "ตักน้ำใส่ถังวางทิ้งไว้ให้ยุงมาว่ายน้ำเล่น",
          "en": "Leave standing water buckets to breed bugs",
          "zh": "盛满大盆死水放在阴暗处吸引蚊子"
        },
        "icon": "🦟"
      },
      {
        "id": "opt-wear-no-clothes",
        "label": {
          "th": "ถอดเสื้อผ้าไปนอนในพงหญ้ารก โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Sleep shirtless in tall weeds",
          "zh": "光着身子去杂草丛生的地方睡觉"
        },
        "icon": "🌿"
      }
    ],
    "correctOptionId": "opt-flip-water-pots",
    "explanation": {
      "th": "เก่งกาจมาก! ยุงลายชอบวางไข่ในน้ำนิ่ง เมื่อเราคว่ำภาชนะ ยุงจะไม่มีที่เพาะพันธุ์ ปลอดภัยจากไข้เลือดออกจ้ะ",
      "en": "Brilliant! Eliminating stagnant standing water stops mosquito larvae from developing into biting pests!",
      "zh": "太聪明了！清倒积水无处滋生孑孓幼虫，从源头消灭伊蚊，有效远离登革热！"
    }
  },
  {
    "id": "exp30-ph-k2-10",
    "grade": "K2",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 2,
    "question": {
      "th": "การว่ายน้ำหรือเล่นกีฬากลางแจ้ง: หลังจากออกกำลังกายจนเหงื่อออกท่วมตัว 💦 สิ่งที่ไม่ควรทำทันทีคืออะไร?",
      "en": "Post-workout cooldown: Sweating profusely after intense physical play 💦, what should you NOT do abruptly?",
      "zh": "运动后冷身防护：大汗淋漓剧烈运动后 💦，千万不能马上做什么冒险的事情？"
    },
    "illustration": "💦 🏃 ➡️ 🥤 🧊 ⚠️ (ไม่ดื่มน้ำเย็นจัดทันที)",
    "illustrationSubtitle": {
      "th": "พักให้หายเหนื่อยก่อน ค่อยๆ จิบน้ำอุณหภูมิห้อง",
      "en": "Catch your breath and sip room-temp water slowly",
      "zh": "先坐下平复呼吸擦汗，小口慢饮常温水"
    },
    "options": [
      {
        "id": "opt-rest-sip",
        "label": {
          "th": "นั่งพักคลายกล้ามเนื้อ เช็ดเหงื่อ แล้วค่อยๆ จิบน้ำเปล่า",
          "en": "Rest, wipe sweat, and sip room-temp water",
          "zh": "停下步行放松，擦干汗水，慢慢小口喝常温水"
        },
        "icon": "🚶"
      },
      {
        "id": "opt-gulps-ice",
        "label": {
          "th": "ดื่มน้ำเย็นจัดพรวดพราด หรือกระโดดเข้าตู้แช่เย็นทันที",
          "en": "Chug ice-cold water instantly or jump into freezers",
          "zh": "猛灌冰镇冷饮，或者直接对着冰冷空调大风狂吹"
        },
        "icon": "🧊"
      },
      {
        "id": "opt-deep-breathe",
        "label": {
          "th": "สูดหายใจเข้าออกลึกๆ ช้าๆ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Breathe deeply and calm heart rate",
          "zh": "调整深呼吸，让心跳逐渐平复"
        },
        "icon": "🫁"
      }
    ],
    "correctOptionId": "opt-gulps-ice",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! เมื่อตัวร้อนจัด ไม่ควรดื่มน้ำเย็นจัดทันทีเพราะอาจทำให้หลอดเลือดหดตัวเฉียบพลันและจุกเสียดได้จ้ะ",
      "en": "Correct! Chugging ice water when overheated shocks internal organs; cool down and sip gently instead!",
      "zh": "完全正确！满头大汗时突然狂喝冰水会强烈刺激血管和肠胃引起痉挛，应先休息慢饮常温水！"
    }
  },
  {
    "id": "exp30-ph-k3-01",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "จานอาหารสุขภาพ (Healthy Plate): ใน 1 มื้ออาหาร สัดส่วนของ \"ผักและผลไม้\" 🥦🍎 ควรมีปริมาณเท่าใดของจาน?",
      "en": "Healthy Plate proportion: Fruits and vegetables 🥦🍎 should make up what portion of your plate?",
      "zh": "平衡健康餐盘黄金比例：在一顿营养均衡的正餐中，新鲜果蔬 🥦🍎 应该占满整个餐盘的多少比例？"
    },
    "illustration": "🍽️ [ 🥦🍎 ครึ่งจาน (1/2) ] + [ 🍚 ข้าว 1/4 ] + [ 🍗 เนื้อสัตว์ 1/4 ]",
    "illustrationSubtitle": {
      "th": "หลักโภชนาการ 2:1:1 ผักผลไม้ครึ่งจาน",
      "en": "Half the plate filled with colorful fruits & veggies",
      "zh": "健康 2:1:1 原则：果蔬占半盘，主食蛋白质各占四分之一"
    },
    "options": [
      {
        "id": "opt-tiny-crumb",
        "label": {
          "th": "เศษเสี้ยวใบผัก 1 ชิ้นเล็กจิ๋ว",
          "en": "A tiny microscopic flake",
          "zh": "只有指甲盖大的一小片碎菜叶"
        },
        "icon": "🤏"
      },
      {
        "id": "opt-none-sweets",
        "label": {
          "th": "ไม่ต้องมีเลย มีแต่ลูกกวาดเต็มจาน",
          "en": "Zero veggies, only candies",
          "zh": "完全不吃蔬菜，全装满彩色糖果"
        },
        "icon": "🍭"
      },
      {
        "id": "opt-half-plate",
        "label": {
          "th": "ครึ่งหนึ่งของจาน (1/2 ของจานอาหาร)",
          "en": "Half of the plate (1/2)",
          "zh": "整整一半餐盘 (1/2)"
        },
        "icon": "🥗"
      }
    ],
    "correctOptionId": "opt-half-plate",
    "explanation": {
      "th": "ยอดเยี่ยมมาก! ตามหลักโภชนาการสากล ครึ่งหนึ่งของจานควรเป็นผักและผลไม้หลากสี เพื่อสุขภาพที่แข็งแรงสมบูรณ์",
      "en": "Spot on! The global Healthy Plate model recommends filling half your plate with vibrant fruits and veggies!",
      "zh": "精彩！国际公认的健康餐盘标准：半盘新鲜彩虹蔬果、四分之一全谷主食、四分之一优质蛋白，营养最均衡！"
    }
  },
  {
    "id": "exp30-ph-k3-02",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "การปฐมพยาบาลเบื้องต้น: เมื่อเดินสะดุดหกล้มแล้วเกิด \"รอยฟกช้ำบวมแดง\" (ไม่มีแผลเปิด) 🧊 ขั้นแรกควรทำอย่างไร?",
      "en": "First aid for blunt bruises: Tripped with a swollen bump (no open cut) 🧊. What is the first treatment?",
      "zh": "急救小常识：不小心磕碰肿起一个大青包（皮肤未破皮出血）🧊，黄金前24小时首先应该怎么做？"
    },
    "illustration": "🧊 🩹 🦵 ⏱️ (ประคบเย็นลดบวม)",
    "illustrationSubtitle": {
      "th": "การประคบเย็นช่วยลดอาการบวมและปวด",
      "en": "Cold compress reduces swelling and dulls pain",
      "zh": "用毛巾包裹冰袋冷敷消肿止痛"
    },
    "options": [
      {
        "id": "opt-cold-compress",
        "label": {
          "th": "ใช้ผ้าห่อน้ำแข็งประคบเย็นเบาๆ เพื่อลดอาการบวมและปวด",
          "en": "Apply cold compress gently to reduce swelling",
          "zh": "用干净毛巾包裹冰袋或冷毛巾冷敷，帮助收缩血管消肿"
        },
        "icon": "🧊"
      },
      {
        "id": "opt-rub-hard",
        "label": {
          "th": "เอามือกดขยี้บวมอย่างแรง โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Pound and rub bruise vigorously",
          "zh": "用大力使劲揉搓按压肿块"
        },
        "icon": "👊"
      },
      {
        "id": "opt-boiling-water",
        "label": {
          "th": "เอาน้ำร้อนลวกแผลทันที โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Pour scalding boiling water on it",
          "zh": "倒滚烫的热开水浇在伤口上"
        },
        "icon": "🔥"
      }
    ],
    "correctOptionId": "opt-cold-compress",
    "explanation": {
      "th": "เก่งกาจมาก! ความเย็นช่วยให้เส้นเลือดหดตัว ลดอาการบวมและบรรเทาความเจ็บปวด ห้ามถูขยี้เพราะจะยิ่งบวมช้ำจ้ะ",
      "en": "Brilliant! Cold constricts blood vessels, minimizing internal swelling and numbing soreness effectively!",
      "zh": "太聪明了！冷敷能促使局部毛细血管收缩，显著减少皮下渗血和水肿，切记不可揉搓！"
    }
  },
  {
    "id": "exp30-ph-k3-03",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "เบอร์โทรศัพท์ฉุกเฉินในประเทศไทย: เมื่อเกิดเหตุเจ็บป่วยฉุกเฉินต้องการ \"เรียกรถพยาบาลกู้ชีพ\" 🚑 ต้องโทรหมายเลขใด?",
      "en": "Emergency medical hotline in Thailand: To call an urgent ambulance 🚑, which number do you dial?",
      "zh": "泰国急救应急电话常识：遇到突发重病或意外伤害需要呼叫“医疗救护车” 🚑，应该拨打哪个紧急号码？"
    },
    "illustration": "📞 1️⃣ 6️⃣ 6️⃣ 9️⃣ 🚑 🏥 💨",
    "illustrationSubtitle": {
      "th": "สายด่วนการแพทย์ฉุกเฉิน 1669",
      "en": "Emergency Medical Services hotline: 1669",
      "zh": "泰国国家急救医疗绿色通道：1669"
    },
    "options": [
      {
        "id": "opt-1111",
        "label": {
          "th": "1111 โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "1111",
          "zh": "1111"
        },
        "icon": "📞"
      },
      {
        "id": "opt-1669",
        "label": {
          "th": "1669 (สายด่วนแพทย์ฉุกเฉิน กู้ชีพ)",
          "en": "1669 (Medical Emergency Ambulance)",
          "zh": "1669 (急救医疗与救护车专线)"
        },
        "icon": "🚑"
      },
      {
        "id": "opt-9999",
        "label": {
          "th": "9999 โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "9999",
          "zh": "9999"
        },
        "icon": "📞"
      }
    ],
    "correctOptionId": "opt-1669",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! 1669 คือเบอร์โทรเรียกรถพยาบาลและหน่วยกู้ชีพฉุกเฉินทั่วประเทศไทยตลอด 24 ชั่วโมง",
      "en": "Correct! 1669 is Thailand’s nationwide 24/7 free medical ambulance emergency dispatch number!",
      "zh": "完全正确！1669 是泰国全境24小时急救专线，有专职医护救护车迅速驰援！"
    }
  },
  {
    "id": "exp30-ph-k3-04",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "การดูแลฟันและเหงือกขั้นสูง: นอกจากการแปรงฟันแล้ว การใช้ \"ไหมขัดฟัน\" (Dental Floss) 🧵 มีประโยชน์อย่างไร?",
      "en": "Advanced dental care: Besides brushing, why is using DENTAL FLOSS 🧵 important?",
      "zh": "牙缝深度清洁：除了认真刷牙，每天在大人协助下使用“牙线” 🧵 能够起到什么独特作用？"
    },
    "illustration": "🦷 🧵 🪥 🫧 ✨",
    "illustrationSubtitle": {
      "th": "ไหมขัดฟันทำความสะอาดซอกฟันที่ขนแปรงเข้าไม่ถึง",
      "en": "Floss removes plaque between tight teeth gaps",
      "zh": "清理牙刷刷毛进不去的牙缝深处食物残渣"
    },
    "options": [
      {
        "id": "opt-pull-teeth-out",
        "label": {
          "th": "เอาไว้ดึงกระชากฟันดีๆ ให้หลุดออกมา โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "To yank healthy teeth out",
          "zh": "把健康长着的好牙生生拔掉"
        },
        "icon": "🦷"
      },
      {
        "id": "opt-tie-fingers",
        "label": {
          "th": "เอาไว้มัดนิ้วมือเล่นให้เจ็บ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "To tie fingers painfully",
          "zh": "拿来把手指绑起来玩"
        },
        "icon": "🖐️"
      },
      {
        "id": "opt-clean-interdental",
        "label": {
          "th": "ทำความสะอาดคราบเศษอาหารระหว่างซอกฟันที่ขนแปรงเข้าไม่ถึง",
          "en": "Cleans plaque and food between tight teeth where brushes can’t reach",
          "zh": "清洁紧密牙缝深处牙刷毛无法触及的牙菌斑与残渣"
        },
        "icon": "🧵"
      }
    ],
    "correctOptionId": "opt-clean-interdental",
    "explanation": {
      "th": "ยอดเยี่ยมมาก! ซอกฟันเป็นจุดที่ขนแปรงฟันเข้าไม่ถึง การใช้ไหมขัดฟันจึงช่วยป้องกันฟันผุด้านข้างได้ดีเยี่ยม",
      "en": "Awesome! Floss slides between tight interdental spaces, stopping hidden cavities and gingivitis!",
      "zh": "太棒了！牙缝是最容易积存食物残渣形成邻面蛀牙的盲区，牙线能够轻松刮净死角！"
    }
  },
  {
    "id": "exp30-ph-k3-05",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "การป้องกันแสงแดดและรังสียูวี ☀️: เวลาออกไปทำกิจกรรมกลางแดดจัด สิ่งใดช่วยปกป้องผิวหนังและดวงตาได้ดีที่สุด?",
      "en": "Sun safety: Playing under blistering afternoon sun ☀️, what best shields skin and eyes?",
      "zh": "防晒与紫外线防护：在烈日炙烤的大夏天户外活动 ☀️，哪些装备能最好地保护娇嫩皮肤和眼睛？"
    },
    "illustration": "☀️ 🧢 🕶️ 🧴 (ครีมกันแดด) ☂️",
    "illustrationSubtitle": {
      "th": "ทาครีมกันแดด สวมหมวกปีกกว้าง และสวมแว่นกันแดด",
      "en": "Sunscreen SPF, wide-brim hat, and UV sunglasses",
      "zh": "涂抹儿童防晒霜、戴遮阳帽与防紫外线墨镜"
    },
    "options": [
      {
        "id": "opt-sunscreen-hat",
        "label": {
          "th": "ทาครีมกันแดด สวมหมวกปีกกว้าง และดื่มน้ำสม่ำเสมอ",
          "en": "Apply sunscreen, wear a wide-brim hat, and drink water",
          "zh": "涂抹防晒霜、戴上宽檐遮阳帽、随身多喝水补充流失"
        },
        "icon": "🧴"
      },
      {
        "id": "opt-black-coat-fire",
        "label": {
          "th": "สวมเสื้อโค้ตหนังหนาสีดำทึบไม่ดื่มน้ำเลย",
          "en": "Heavy black winter coat with zero water",
          "zh": "裹着厚厚的黑大衣顶着烈日暴晒且滴水不喝"
        },
        "icon": "🧥"
      },
      {
        "id": "opt-stare-sun",
        "label": {
          "th": "เงยหน้าจ้องมองดวงอาทิตย์ตรงๆ โดยไม่กะพริบตา",
          "en": "Stare directly at the Sun unblinking",
          "zh": "抬头睁大眼睛直视太阳不眨眼"
        },
        "icon": "☀️"
      }
    ],
    "correctOptionId": "opt-sunscreen-hat",
    "explanation": {
      "th": "เก่งกาจมาก! ครีมกันแดดและหมวกช่วยป้องกันรังสีอัลตราไวโอเลต (UV) ไม่ให้เผาไหม้ผิวและป้องกันโรคลมแดด",
      "en": "Brilliant! Broad-spectrum sunscreen and shaded hats prevent painful sunburns and heat exhaustion!",
      "zh": "太聪明了！遮阳帽阻挡直射阳光，防晒霜阻隔紫外线晒伤皮肤，多喝水预防中暑脱水！"
    }
  },
  {
    "id": "exp30-ph-k3-06",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "การเลือกรับประทานอาหารว่าง: อาหารว่างข้อใดมีคุณค่าทางโภชนาการสูง เหมาะกับเด็กวัยเรียนรู้มากที่สุด? 🍎 🥛",
      "en": "Smart snacking: Which afternoon snack provides sustained, clean energy and high nutrition?",
      "zh": "健康加餐点心：放学后肚子饿了，下列哪一种课间点心最营养健康、最适合成长中的大脑？"
    },
    "illustration": "🍎 🥛 🍌 🥣 (ผลไม้สด นม ข้าวโอ๊ต)",
    "illustrationSubtitle": {
      "th": "ผลไม้สดคู่กับนมจืดหรือโยเกิร์ตธรรมชาติ",
      "en": "Fresh sliced apple with plain milk or yogurt",
      "zh": "新鲜苹果切片搭配纯鲜奶或原味酸奶"
    },
    "options": [
      {
        "id": "opt-fried-donut-sugar",
        "label": {
          "th": "โดนัททอดเคลือบน้ำตาลหนาเตอะ 3 ชิ้น",
          "en": "Three deep-fried donuts coated in glazed sugar",
          "zh": "裹满厚厚白糖霜的油炸大甜甜圈三只"
        },
        "icon": "🍩"
      },
      {
        "id": "opt-apple-milk",
        "label": {
          "th": "แอปเปิ้ลสดหั่นชิ้น คู่กับนมจืดรสธรรมชาติ 🍎🥛",
          "en": "Fresh sliced apple with plain milk 🍎🥛",
          "zh": "新鲜爽脆的苹果切片搭配纯牛奶 🍎🥛"
        },
        "icon": "🍎"
      },
      {
        "id": "opt-salty-chips-bag",
        "label": {
          "th": "มันฝรั่งทอดกรอบถุงยักษ์รสเค็มจัด",
          "en": "Giant jumbo bag of ultra-salty chips",
          "zh": "一大包加满味精和重盐的油炸薯片"
        },
        "icon": "🍟"
      }
    ],
    "correctOptionId": "opt-apple-milk",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! แอปเปิ้ลให้วิตามินและกากใย นมให้แคลเซียมและโปรตีน เป็นของว่างคุณภาพเยี่ยมของเด็กฉลาด",
      "en": "Correct! Fresh fruit combined with wholesome milk delivers protein, fiber, and steady energy without sugar crashes!",
      "zh": "完全正确！新鲜水果提供丰富维生素与纤维，纯牛奶补充优质蛋白与钙质，大脑运转更敏锐！"
    }
  },
  {
    "id": "exp30-ph-k3-07",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "ความปลอดภัยในการปั่นจักรยาน 🚲: ก่อนเริ่มปั่นจักรยานทุกครั้ง อุปกรณ์ป้องกันส่วนหัวที่สำคัญที่สุดคืออะไร?",
      "en": "Bicycle safety: What essential protective headgear must you wear every time before cycling 🚲?",
      "zh": "骑行安全黄金准则：每次跨上自行车或者滑板车出发前 🚲，头上必须佩戴哪样最关键的安全护具？"
    },
    "illustration": "🚲 🧒 🪖 🛡️ ✨",
    "illustrationSubtitle": {
      "th": "หมวกกันน็อกนิรภัยพอดีศีรษะ",
      "en": "Properly strapped safety bicycle helmet",
      "zh": "尺寸贴合、扣好卡扣的自行车安全头盔"
    },
    "options": [
      {
        "id": "opt-party-hat",
        "label": {
          "th": "หมวกกรวยกระดาษงานวันเกิด โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Paper party cone hat",
          "zh": "薄纸板做的生日聚会尖角帽"
        },
        "icon": "🎉"
      },
      {
        "id": "opt-water-bucket",
        "label": {
          "th": "ถังน้ำพลาสติกครอบหัว โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Plastic water bucket over head",
          "zh": "塑料小水桶反扣在头上"
        },
        "icon": "🪣"
      },
      {
        "id": "opt-helmet",
        "label": {
          "th": "หมวกกันน็อกนิรภัยที่กระชับพอดีและรัดสายใต้คาง 🪖",
          "en": "Certified bicycle helmet strapped under chin 🪖",
          "zh": "尺寸合适、系紧下巴安全扣的骑行头盔 🪖"
        },
        "icon": "🪖"
      }
    ],
    "correctOptionId": "opt-helmet",
    "explanation": {
      "th": "ยอดเยี่ยมมาก! หมวกกันน็อกช่วยดูดซับแรงกระแทก ปกป้องศีรษะและสมองหากเกิดอุบัติเหตุล้มหรือชน",
      "en": "Awesome! A certified helmet cushions impacts, preventing traumatic head and brain injuries!",
      "zh": "太棒了！安全头盔能有效吸收缓冲撞击力度，是骑行时保护脆弱头颅与大脑最重要的生命盾牌！"
    }
  },
  {
    "id": "exp30-ph-k3-08",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "การล้างมือ 7 ขั้นตอนให้สะอาดหมดจด 🧼: ระยะเวลาที่เหมาะสมในการฟอกสบู่ให้ทั่วทุกซอกนิ้วควรนานเท่าใด?",
      "en": "Proper handwashing duration: How long should you scrub hands with soap to destroy germs effectively?",
      "zh": "七步洗手法标准：用肥皂细致揉搓手心、手背、指缝、指甲尖，整个清洗过程应该持续多长时间？"
    },
    "illustration": "🧼 ⏱️ 20 วินาที (ร้องเพลงช้างจบ 2 รอบ)",
    "illustrationSubtitle": {
      "th": "ฟอกสบู่ถูมือนานอย่างน้อย 20 วินาที",
      "en": "Scrub thoroughly for at least 20 seconds",
      "zh": "揉搓至少 20 秒（唱两遍生日快乐歌或小象歌的时间）"
    },
    "options": [
      {
        "id": "opt-20-seconds",
        "label": {
          "th": "อย่างน้อย 20 วินาที (เท่ากับการร้องเพลงสุขสันต์วันเกิด 2 รอบ)",
          "en": "At least 20 seconds (sing Happy Birthday twice)",
          "zh": "至少 20 秒钟（相当于认真唱两遍生日歌的时间）"
        },
        "icon": "⏱️"
      },
      {
        "id": "opt-one-second",
        "label": {
          "th": "แตะน้ำเพียง 1 วินาทีแล้วสะบัดมือ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "1 second quick splash and flick",
          "zh": "蘸一下水 1 秒钟甩甩手就跑"
        },
        "icon": "⚡"
      },
      {
        "id": "opt-two-hours",
        "label": {
          "th": "ฟอกสบู่นาน 2 ชั่วโมงติดกัน โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Scrub non-stop for 2 full hours",
          "zh": "连续揉搓两个小时不间断"
        },
        "icon": "⌛"
      }
    ],
    "correctOptionId": "opt-20-seconds",
    "explanation": {
      "th": "เก่งกาจมาก! การฟอกสบู่อย่างน้อย 20 วินาทีจะช่วยทำลายเกราะหุ้มของไวรัสและแบคทีเรียได้อย่างสมบูรณ์",
      "en": "Brilliant! Lathering for 20 seconds allows soap molecules to fully dissolve viral lipid coats and wash germs away!",
      "zh": "太聪明了！科学证明持续揉搓 20 秒以上，肥皂分子才能彻底瓦解细菌病毒的脂肪外膜将其冲刷干净！"
    }
  },
  {
    "id": "exp30-ph-k3-09",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "การอบอุ่นร่างกาย (Warm-up): ก่อนลงเล่นกีฬาหรือวิ่งแข่ง 🏃 ทำไมเด็กๆ ต้องทำการอบอุ่นร่างกายและยืดเหยียดกล้ามเนื้อก่อน?",
      "en": "Sports warm-up: Why must children warm up and stretch muscles before running or sports 🏃?",
      "zh": "热身运动的重要性：在进行激烈跑步比赛或体育运动前 🏃，为什么必须做热身拉伸？"
    },
    "illustration": "🤸 🧘 🏃 🫀 🌡️ ✨",
    "illustrationSubtitle": {
      "th": "การยืดเหยียดป้องกันการบาดเจ็บและเตรียมพร้อมหัวใจ",
      "en": "Warming up prevents muscle cramps and prepares the heart",
      "zh": "活动关节韧带预防拉伤抽筋，使心跳平稳进入运动状态"
    },
    "options": [
      {
        "id": "opt-make-tired",
        "label": {
          "th": "เพื่อให้หมดแรงจนวิ่งต่อไม่ไหว ใดๆ เลยทั้งสิ้น",
          "en": "To exhaust energy so you cannot run",
          "zh": "为了把力气全耗尽走不动路"
        },
        "icon": "😫"
      },
      {
        "id": "opt-prevent-injury",
        "label": {
          "th": "เพื่อเตรียมกล้ามเนื้อและหัวใจให้พร้อม ป้องกันอาการบาดเจ็บและตะคริว",
          "en": "Prepares muscles & heart, preventing strains and cramps",
          "zh": "让肌肉韧带预热柔软，预防肌肉拉伤抽筋与关节扭伤"
        },
        "icon": "🤸"
      },
      {
        "id": "opt-sleepy-ground",
        "label": {
          "th": "เพื่อให้ง่วงนอนหลับคาสนาม โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "To induce falling asleep on the track",
          "zh": "为了在塑胶跑道上睡个大觉"
        },
        "icon": "😴"
      }
    ],
    "correctOptionId": "opt-prevent-injury",
    "explanation": {
      "th": "ถูกต้องที่สุด! การอบอุ่นร่างกายช่วยเพิ่มอุณหภูมิในกล้ามเนื้อและข้อต่อ ทำให้เคลื่อนไหวได้อย่างยืดหยุ่นและปลอดภัย",
      "en": "Correct! Warm-ups increase blood flow and elasticity in tendons, significantly shielding athletes from injuries!",
      "zh": "完全正确！热身使体温与肌肉弹性升高，血液加速输送氧气，动作舒展自如且不易受伤！"
    }
  },
  {
    "id": "exp30-ph-k3-10",
    "grade": "K3",
    "subject": "physical_health",
    "skillCode": "6",
    "difficulty": 3,
    "question": {
      "th": "การดูแลตนเองเมื่อมีไข้ 🤒: เมื่อวัดอุณหภูมิร่างกายแล้วพบว่าตัวร้อนมีไข้สูง เด็กๆ ควรปฏิบัติตนอย่างไร?",
      "en": "Fever management 🤒: When your body temperature registers a high fever, what is the proper care?",
      "zh": "发烧护理常识：当体温计显示体温升高发烧体热时 🤒，正确的应对护理办法是？"
    },
    "illustration": "🤒 🌡️ 🛏️ 💧 🧑‍⚕️ ✨",
    "illustrationSubtitle": {
      "th": "เช็ดตัวลดไข้ พักผ่อน ดื่มน้ำ และพบแพทย์",
      "en": "Rest, hydrate, sponge with lukewarm cloth, consult doctor",
      "zh": "温水擦身散热、多喝温水、静卧休息并看医生"
    },
    "options": [
      {
        "id": "opt-run-marathon",
        "label": {
          "th": "ออกไปวิ่งกลางแดดจ้า 10 รอบ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Run a marathon under scorching sun",
          "zh": "顶着烈日去操场狂跑十圈"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-eat-freezer-ice",
        "label": {
          "th": "กินน้ำแข็งก้อนเต็มปากแล้วไม่บอกใคร ใดๆ เลยทั้งสิ้น",
          "en": "Chew ice cubes secretly without telling anyone",
          "zh": "偷偷塞满一嘴冰块嚼着吃且瞒着大人"
        },
        "icon": "🧊"
      },
      {
        "id": "opt-sponge-rest-doctor",
        "label": {
          "th": "เช็ดตัวด้วยน้ำอุ่น ดื่มน้ำมากๆ นอนพักผ่อน และให้ผู้ใหญ่พาไปพบคุณหมอ",
          "en": "Sponge with lukewarm water, hydrate, rest, and see a doctor",
          "zh": "用温水轻轻擦拭身体散热，多喝温开水，多卧床休息并就医"
        },
        "icon": "🤒"
      }
    ],
    "correctOptionId": "opt-sponge-rest-doctor",
    "explanation": {
      "th": "สุดยอดการดูแลสุขภาพ! การเช็ดตัวด้วยน้ำอุณหภูมิห้องหรือน้ำอุ่นจะช่วยระบายความร้อน และการดื่มน้ำช่วยป้องกันภาวะขาดน้ำจ้ะ",
      "en": "Splendid health knowledge! Lukewarm sponging dilates surface capillaries to safely shed excess fever heat!",
      "zh": "非常出色的护理常识！温水擦浴能温和蒸发散热，多喝水加速排毒降温，休息加遵医嘱最安全！"
    }
  }
];
