import { Question } from '../../types';

export const EXPANSION_30_SOCIO_EMOTIONAL: Question[] = [
  {
    "id": "exp30-se-k1-01",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "สีหน้าแสดงอารมณ์: ภาพใบหน้านี้กำลังยิ้มกว้างอย่างสดใส 😊 บ่งบอกถึงอารมณ์ใด?",
      "en": "Emotions: This smiling face 😊 shows which happy feeling?",
      "zh": "情绪识别：画面里笑得合不拢嘴的小脸蛋 😊，表达的是什么心情？"
    },
    "illustration": "😊 🎈 🌟 💖 ✨",
    "illustrationSubtitle": {
      "th": "ความสุข ความดีใจ และร่าเริง",
      "en": "Happy, joyful, and cheerful feelings",
      "zh": "开心快乐、高兴愉悦的情感"
    },
    "options": [
      {
        "id": "opt-happy",
        "label": {
          "th": "มีความสุข ดีใจ ยิ้มแย้มแจ่มใส 😊",
          "en": "Happy and joyful 😊",
          "zh": "高兴快乐、开心笑眯眯 😊"
        },
        "icon": "😊"
      },
      {
        "id": "opt-angry",
        "label": {
          "th": "โกรธจัดหน้าบึ้งตึง",
          "en": "Furious and angry",
          "zh": "气呼呼大发脾气"
        },
        "icon": "😠"
      },
      {
        "id": "opt-scared",
        "label": {
          "th": "ตกใจกลัวตัวสั่น โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Terrified and scared",
          "zh": "吓得发抖害怕"
        },
        "icon": "😨"
      }
    ],
    "correctOptionId": "opt-happy",
    "explanation": {
      "th": "เก่งมากจ้ะ! รอยยิ้มและแววตาสดใส คือสีหน้าของความสุขและความเบิกบานใจจ้า",
      "en": "Great job! A bright smile and twinkling eyes express pure happiness!",
      "zh": "真棒！弯弯的笑眼和高扬的嘴角，正是快乐开心的标志表情！"
    }
  },
  {
    "id": "exp30-se-k1-02",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การเข้าแถวรอคอย: เมื่อเด็กๆ จะดื่มน้ำที่ตู้กดน้ำ 🚰 ควรทำอย่างไรให้เป็นระเบียบเรียบร้อย?",
      "en": "Waiting in line: How should children queue up at the water cooler 🚰?",
      "zh": "文明排队礼仪：小朋友们排队去直饮水龙头接水喝时 🚰，应该怎么做？"
    },
    "illustration": "🚰 🚶 🚶 🚶 ⏳ ✨",
    "illustrationSubtitle": {
      "th": "การเข้าแถวตามลำดับก่อน-หลัง",
      "en": "Line up patiently in single file",
      "zh": "按先来后到顺序耐心排成整齐队伍"
    },
    "options": [
      {
        "id": "opt-push-front",
        "label": {
          "th": "วิ่งเบียดแทรกแถวไปหน้าสุด",
          "en": "Shove to the front and cut line",
          "zh": "使劲用手推挤同伴插到最前面"
        },
        "icon": "🚫"
      },
      {
        "id": "opt-line-up",
        "label": {
          "th": "เข้าแถวเรียงหนึ่งต่อคิวอย่างอดทนตามลำดับ",
          "en": "Queue up in an orderly single line",
          "zh": "按顺序一个挨着一个耐心排队等待"
        },
        "icon": "🚶"
      },
      {
        "id": "opt-spill-water",
        "label": {
          "th": "กดน้ำเล่นสาดใส่เพื่อน ในห้องเรียนจนเกิดความวุ่นวาย",
          "en": "Spray water at classmates",
          "zh": "故意按压龙头四处泼水捣乱"
        },
        "icon": "💦"
      }
    ],
    "correctOptionId": "opt-line-up",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! การเข้าแถวรอคอยอย่างเป็นระเบียบ ทำให้ทุกคนได้ดื่มน้ำอย่างปลอดภัยและรวดเร็ว",
      "en": "Correct! Standing patiently in line ensures everyone gets water safely and fairly!",
      "zh": "完全正确！排队礼让、不推不挤，人人都能安全有序喝上健康的水！"
    }
  },
  {
    "id": "exp30-se-k1-03",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การแบ่งปันของเล่น: มีบล็อกไม้กองโต 🧱 หนูและเพื่อนควรเล่นร่วมกันอย่างไร?",
      "en": "Sharing toys: When there is a pile of wooden blocks 🧱, how should you and friends play?",
      "zh": "乐于分享合作：地毯上有一大堆积木 🧱，你和同伴应该怎样一起玩？"
    },
    "illustration": "🧱 🧒 👧 🤝 🏰 ✨",
    "illustrationSubtitle": {
      "th": "การแบ่งปันและสร้างเมืองด้วยกัน",
      "en": "Share blocks and build a castle together",
      "zh": "分享积木，同心协力搭造大城堡"
    },
    "options": [
      {
        "id": "opt-hoard-all",
        "label": {
          "th": "กอดบล็อกไม้ไว้คนเดียวไม่ยอมให้ใครจับ ใดๆ เลยทั้งสิ้น",
          "en": "Hoard all blocks greedily",
          "zh": "把所有积木全搂在怀里一个人霸占"
        },
        "icon": "🙅"
      },
      {
        "id": "opt-throw-blocks",
        "label": {
          "th": "ขว้างบล็อกไม้ใส่หัวเพื่อน ในห้องเรียนจนเกิดความวุ่นวาย",
          "en": "Throw blocks at friend’s head",
          "zh": "抓起坚硬积木砸向小朋友"
        },
        "icon": "💥"
      },
      {
        "id": "opt-share-build",
        "label": {
          "th": "แบ่งปันบล็อกไม้และช่วยกันสร้างปราสาทหลังใหญ่ร่วมกัน",
          "en": "Share blocks and build together happily",
          "zh": "相互分享积木，开心地一起合作搭建大城堡"
        },
        "icon": "🏰"
      }
    ],
    "correctOptionId": "opt-share-build",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! การแบ่งปันและเล่นด้วยกัน ทำให้ปราสาทสร้างเสร็จใหญ่โตและมีความสุขทวีคูณ",
      "en": "Awesome! Sharing and building together creates friendships and magnificent castles!",
      "zh": "太棒了！学会分享与合作，搭建的城堡更高更壮观，友谊更深厚！"
    }
  },
  {
    "id": "exp30-se-k1-04",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "คำพูดที่น่ารัก: เมื่อคุณครูหรือผู้ใหญ่มอบขนมหรือของขวัญให้ 🎁 เด็กๆ ควรกล่าวคำว่าอะไร?",
      "en": "Polite words: When a teacher or elder gives you a gift or treat 🎁, what magic words do you say?",
      "zh": "懂礼貌好孩子：当老师或长辈奖励给你小点心或礼物时 🎁，小朋友应该甜甜地说什么？"
    },
    "illustration": "🎁 🤲 👦 👧 🙏 ❤️",
    "illustrationSubtitle": {
      "th": "กล่าว \"ขอบคุณครับ / ขอบคุณค่ะ\" อย่างสุภาพ",
      "en": "Say \"Thank you\" politely with a gentle bow",
      "zh": "双手接过并礼貌说：“谢谢老师 / 谢谢您！”"
    },
    "options": [
      {
        "id": "opt-thank-you",
        "label": {
          "th": "กล่าว \"ขอบคุณครับ / ขอบคุณค่ะ\" อย่างไพเราะ",
          "en": "Say \"Thank you very much\" politely",
          "zh": "礼貌端正地说：“谢谢您！”"
        },
        "icon": "🙏"
      },
      {
        "id": "opt-snatch-run",
        "label": {
          "th": "กระชากแย่งมาแล้ววิ่งหนี โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Snatch rudely and sprint away",
          "zh": "一把硬抢过来扭头就跑"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-yell-little",
        "label": {
          "th": "ตะโกนว่า \"ให้น้อยจัง\" โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Yell complaints: \"Too tiny!\"",
          "zh": "大声嫌弃抱怨：“给得太少了！”"
        },
        "icon": "📢"
      }
    ],
    "correctOptionId": "opt-thank-you",
    "explanation": {
      "th": "เก่งมากจ้ะ! การกล่าว \"ขอบคุณ\" แสดงถึงความกตัญญูและมารยาทที่งดงาม ใครเห็นก็เอ็นดู",
      "en": "Great job! Saying \"Thank you\" shows gratitude, good manners, and respect!",
      "zh": "真棒！常说“谢谢”，懂得感恩，礼貌的小朋友到哪里都深受大家喜爱！"
    }
  },
  {
    "id": "exp30-se-k1-05",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "ความเห็นอกเห็นใจ: เห็นเพื่อนคนใหม่ยืนร้องไห้คิดถึงคุณแม่ในวันเปิดเทอมวันแรก 🥺 หนูควรทำอย่างไร?",
      "en": "Empathy: A new classmate is crying missing their mom on the first school day 🥺. How can you be kind?",
      "zh": "同理心与友善：开学第一天看到新同学站在教室角落想妈妈伤心抹眼泪 🥺，你会怎样安慰他？"
    },
    "illustration": "🥺 🤝 🧸 😊 🏫",
    "illustrationSubtitle": {
      "th": "เข้าไปทักทายและชวนเล่นอย่างอบอุ่น",
      "en": "Smile, say hello, and invite to play with toys",
      "zh": "微笑着走过去友好问候，递上小玩具一起玩"
    },
    "options": [
      {
        "id": "opt-tease-crybaby",
        "label": {
          "th": "ล้อเลียนเพื่อนว่า \"ขี้แงจังเลย\" โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Point and tease: \"Crybaby!\"",
          "zh": "围着指指点点嘲笑：“爱哭鬼真丢人！”"
        },
        "icon": "😜"
      },
      {
        "id": "opt-comfort-invite",
        "label": {
          "th": "ยิ้มให้ ยื่นของเล่นให้ และพูดว่า \"มาเล่นของเล่นด้วยกันนะ\"",
          "en": "Smile warmly, hand a toy, and invite to play together",
          "zh": "温柔递上可爱小玩具，微笑着说：“我们一起玩吧！”"
        },
        "icon": "🤝"
      },
      {
        "id": "opt-push-away",
        "label": {
          "th": "ผลักเพื่อนให้ออกไปนอกห้อง โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Push friend out of the room",
          "zh": "用力推赶对方出去"
        },
        "icon": "🚪"
      }
    ],
    "correctOptionId": "opt-comfort-invite",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! การยิ้มและชวนเพื่อนเล่น จะช่วยให้เพื่อนรู้สึกอุ่นใจ หายกลัว และมีความสุขที่โรงเรียน",
      "en": "Correct! Welcoming an upset friend warmly eases fears and sparks lasting friendships!",
      "zh": "完全正确！主动送上微笑和玩伴邀请，能迅速驱散同伴心中的陌生与不安，成为亲密好友！"
    }
  },
  {
    "id": "exp30-se-k1-06",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การจัดการอารมณ์โกรธ: เมื่อรู้สึกหงุดหงิดหรือโกรธ 😤 สิ่งที่ดีที่สุดที่ช่วยให้ใจเย็นลงคืออะไร?",
      "en": "Anger self-regulation: When feeling mad or frustrated 😤, what helps you calm down peacefully?",
      "zh": "情绪自我调节：感到心烦急躁、想发脾气时 😤，哪种方式最能让自己平静下来？"
    },
    "illustration": "😤 ➡️ 🌬️ 🫁 ➡️ 😊 (สูดลมหายใจเข้าลึกๆ)",
    "illustrationSubtitle": {
      "th": "หยุดนิ่งแล้วสูดลมหายใจเข้าลึกๆ นับ 1 ถึง 5",
      "en": "Pause, take deep slow breaths, count 1 to 5",
      "zh": "停下来慢慢深呼吸，心里默默数 1 到 5"
    },
    "options": [
      {
        "id": "opt-hit-friend",
        "label": {
          "th": "ทุบตีเพื่อนที่อยู่ข้างๆ ทันที",
          "en": "Hit or punch people nearby",
          "zh": "挥起小拳头去打身旁无辜的人"
        },
        "icon": "🥊"
      },
      {
        "id": "opt-throw-things",
        "label": {
          "th": "กวาดข้าวของบนโต๊ะลงพื้นทั้งหมด",
          "en": "Smash objects off table",
          "zh": "把桌上的书本水杯狠狠扫翻在地上"
        },
        "icon": "💥"
      },
      {
        "id": "opt-deep-breaths",
        "label": {
          "th": "หยุดนิ่ง สูดลมหายใจเข้าลึกๆ ช้าๆ แล้วผ่อนออก",
          "en": "Stop, take slow deep breaths, and exhale gently",
          "zh": "停下手头动作，做几次深长缓慢的深呼吸平静身心"
        },
        "icon": "🌬️"
      }
    ],
    "correctOptionId": "opt-deep-breaths",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! การสูดหายใจลึกๆ ช่วยส่งออกซิเจนไปเลี้ยงสมอง ทำให้หัวใจเต้นช้าลงและอารมณ์สงบขึ้นจ้า",
      "en": "Awesome! Deep belly breathing brings calming oxygen, soothing racing heartbeats and angry surges!",
      "zh": "太棒了！慢慢深呼吸给大脑注入新鲜氧气，平复心跳，怒气和烦躁便烟消云散！"
    }
  },
  {
    "id": "exp30-se-k1-07",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การสัมผัสอย่างอ่อนโยน: เวลาที่เราเล่นกับสัตว์เลี้ยงตัวน้อย เช่น ลูกแมว 🐱 ควรลูบตัวอย่างไร?",
      "en": "Gentle touch: How should you gently pet a small animal like a kitten 🐱?",
      "zh": "温柔抚摸生命：和小猫咪等小动物玩耍时 🐱，应该怎样轻柔抚摸它？"
    },
    "illustration": "🐱 🖐️ ❤️ ✨ 🐾",
    "illustrationSubtitle": {
      "th": "ลูบขนเบาๆ ด้วยความอ่อนโยนและเมตตา",
      "en": "Stroke softly with caring gentleness",
      "zh": "顺着毛发轻轻抚摸，温柔呵护"
    },
    "options": [
      {
        "id": "opt-stroke-gently",
        "label": {
          "th": "ใช้ฝ่ามือลูบขนเบาๆ ตามแนวขนด้วยความทะนุถนอม",
          "en": "Stroke gently along its fur with loving care",
          "zh": "摊开手心顺着毛发轻轻抚摸，动作温和轻柔"
        },
        "icon": "❤️"
      },
      {
        "id": "opt-pull-tail-hard",
        "label": {
          "th": "ดึงหางลูกแมวอย่างแรง โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Yank kitten’s tail hard",
          "zh": "用力揪扯小猫的尾巴"
        },
        "icon": "🚫"
      },
      {
        "id": "opt-squeeze-tight",
        "label": {
          "th": "บีบคอลูกแมวแน่นๆ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Choke or squeeze painfully",
          "zh": "使劲掐紧猫咪的脖子"
        },
        "icon": "⚠️"
      }
    ],
    "correctOptionId": "opt-stroke-gently",
    "explanation": {
      "th": "เก่งมากจ้ะ! สัตว์ตัวเล็กก็รู้สึกเจ็บได้เหมือนเรา การลูบเบาๆ ทำให้สัตว์รู้สึกปลอดภัยและรักเราจ้ะ",
      "en": "Great job! Gentle touches show love and make pets feel safe and comforted!",
      "zh": "真棒！小动物也怕疼，轻柔抚摸让小猫感到温暖安心，乖乖依偎着你！"
    }
  },
  {
    "id": "exp30-se-k1-08",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การช่วยเหลือตนเอง: เมื่อถึงเวลารับประทานอาหารกลางวัน 🥣 พฤติกรรมใดแสดงถึงความเก่งและพึ่งพาตนเองได้?",
      "en": "Self-help autonomy: At lunchtime 🥣, which habit shows wonderful independence?",
      "zh": "生活自理能力：午餐时间到了 🥣，哪种表现说明小朋友具备优秀的自主自立好习惯？"
    },
    "illustration": "🥣 🥄 😋 🧒 ✨",
    "illustrationSubtitle": {
      "th": "ใช้ช้อนตักอาหารทานเองอย่างตั้งใจ",
      "en": "Eat neatly with your spoon independently",
      "zh": "自己握好小勺子，专注大口吃饭不挑食"
    },
    "options": [
      {
        "id": "opt-cry-wait-feed",
        "label": {
          "th": "นอนร้องไห้รอให้คุณครูคอยป้อนทุกคำ",
          "en": "Wail until teacher feeds every single bite",
          "zh": "哭着闹着必须老师一口一口喂"
        },
        "icon": "😭"
      },
      {
        "id": "opt-eat-by-self",
        "label": {
          "th": "ใช้ช้อนตักอาหารทานเองจนหมดจานอย่างตั้งใจ",
          "en": "Feed yourself with spoon attentively until empty",
          "zh": "自己稳稳拿着小勺，认真吃完盘子里的健康饭菜"
        },
        "icon": "🥄"
      },
      {
        "id": "opt-spill-food-floor",
        "label": {
          "th": "เทข้าวคว่ำลงบนพื้นแล้วเหยียบเล่น",
          "en": "Dump food onto floor to stomp",
          "zh": "把整盘饭菜掀翻在地板上乱踩"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-eat-by-self",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! การตักอาหารทานเอง ฝึกกล้ามเนื้อมือ และแสดงถึงการเติบโตเป็นเด็กเก่งที่ช่วยเหลือตนเองได้",
      "en": "Correct! Feeding yourself develops fine motor skills and fosters pride in growing independence!",
      "zh": "完全正确！自己专注进餐不仅锻炼手部协调，更是成长为自立独立小达人的骄傲标志！"
    }
  },
  {
    "id": "exp30-se-k1-09",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การยอมรับความพ่ายแพ้: เมื่อเล่นเกมวิ่งเปี้ยวหรือเป่ายิงฉุบแล้วแพ้ ✌️✊ หนูควรปฏิบัติตนอย่างไร?",
      "en": "Good sportsmanship: Losing a simple game of Rock-Paper-Scissors or tag ✌️✊, how should you react?",
      "zh": "胜不骄败不馁：在石头剪刀布 ✌️✊ 或趣味抢凳子游戏中输掉一轮，应该表现出怎样的大度态度？"
    },
    "illustration": "✌️ ✊ 🤝 😊 🏆",
    "illustrationSubtitle": {
      "th": "ยิ้มแย้มและแสดงความยินดีกับเพื่อนที่ชนะ",
      "en": "Smile, congratulate friend, and try again happily",
      "zh": "大方微笑向获胜同伴表示祝贺：“你真棒！”"
    },
    "options": [
      {
        "id": "opt-kick-board-scream",
        "label": {
          "th": "เตะกระดานเกมล้มแล้วกรี๊ดเสียงดัง โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Kick board down and screech furiously",
          "zh": "掀翻游戏盘扯着嗓子大吵大闹"
        },
        "icon": "😠"
      },
      {
        "id": "opt-punch-winner",
        "label": {
          "th": "ต่อยเพื่อนที่ชนะจนล้ม โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Hit the winner physically",
          "zh": "挥拳去打赢比赛的小伙伴"
        },
        "icon": "🥊"
      },
      {
        "id": "opt-smile-congratulate",
        "label": {
          "th": "ยิ้ม ปรบมือแสดงความยินดีกับเพื่อน แล้วบอกว่า \"ตาหน้าเล่นกันใหม่นะ\"",
          "en": "Smile, clap for friend, and say \"Let’s play again!\"",
          "zh": "真诚微笑着为朋友鼓掌：“恭喜你，下次我们再一起玩！”"
        },
        "icon": "🤝"
      }
    ],
    "correctOptionId": "opt-smile-congratulate",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! การมีน้ำใจนักกีฬา รู้แพ้ รู้ชนะ รู้อภัย ทำให้ทุกคนอยากเล่นกับหนูเสมอจ้ะ",
      "en": "Awesome! Good sportsmanship means celebrating friends graciously and enjoying the game itself!",
      "zh": "太棒了！有胜有负乃游戏常事，输得起、真诚为赢家喝彩，是最具魅力的大气好孩子！"
    }
  },
  {
    "id": "exp30-se-k1-10",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การทักทายเมื่อพบกัน: ในตอนเช้าเมื่อมาถึงโรงเรียนพบคุณครูและเพื่อนๆ 🏫 เด็กๆ ควรทำสิ่งใด?",
      "en": "Morning greeting: Arriving at preschool in the morning 🏫, what warm greeting should you give?",
      "zh": "晨间温暖问候：早晨迈进幼儿园校门见到亲爱的老师和小伙伴 🏫，应该怎样做？"
    },
    "illustration": "🏫 🧒 👧 🙏 😊 🌅",
    "illustrationSubtitle": {
      "th": "ยกมือไหว้ ยิ้มสดใส และกล่าวคำสวัสดี",
      "en": "Smile brightly, Wai with hands pressed, and say \"Sawasdee\"",
      "zh": "露出灿烂笑脸，双手合十问候：“老师早上好！”"
    },
    "options": [
      {
        "id": "opt-wai-sawasdee",
        "label": {
          "th": "ยกมือไหว้ ยิ้มสดใส และกล่าว \"สวัสดีครับ / สวัสดีค่ะ\"",
          "en": "Wai politely, smile, and say \"Sawasdee\" warmly",
          "zh": "双手合十礼貌致敬，大声问好：“老师早上好！”"
        },
        "icon": "🙏"
      },
      {
        "id": "opt-turn-back-hide",
        "label": {
          "th": "หันหลังหนีแล้วแลบลิ้นใส่ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Turn around and stick tongue out",
          "zh": "转过身背对老师吐舌头做鬼脸"
        },
        "icon": "😜"
      },
      {
        "id": "opt-run-bump",
        "label": {
          "th": "วิ่งพุ่งชนคุณครูอย่างแรง โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Charge and ram into teacher",
          "zh": "像小野牛一样猛烈撞向老师"
        },
        "icon": "💥"
      }
    ],
    "correctOptionId": "opt-wai-sawasdee",
    "explanation": {
      "th": "เก่งที่สุด! การไหว้และทักทายด้วยรอยยิ้ม เริ่มต้นวันใหม่อย่างสดใสและสร้างความสุขให้ทุกคน",
      "en": "Splendid! A warm, polite morning greeting spreads cheer and builds loving bonds at school!",
      "zh": "回答精彩！一声亲切礼貌的早安问候与灿烂笑脸，开启充满阳光与爱心的美好一天！"
    }
  },
  {
    "id": "exp30-se-k2-01",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "การควบคุมตนเอง (Self-Regulation): เมื่อเพื่อนกำลังเล่าเรื่องหน้าห้องเรียน 🗣️ เราควรทำหน้าที่เป็น \"ผู้ฟังที่ดี\" อย่างไร?",
      "en": "Self-regulation: When a classmate is speaking in front of the class 🗣️, how do you show good listening?",
      "zh": "自我约束与专注倾听：当同伴在讲台前分享绘本故事时 🗣️，优秀的“倾听小能手”应该怎么做？"
    },
    "illustration": "🗣️ 🧒 👂 🤫 🪑 ✨",
    "illustrationSubtitle": {
      "th": "นั่งฟังอย่างตั้งใจ ไม่พูดแทรก และสบตาผู้พูด",
      "en": "Listen attentively without interrupting, maintaining eye contact",
      "zh": "安静坐好认真注视，不打断插话，眼神鼓励支持"
    },
    "options": [
      {
        "id": "opt-yell-interrupt",
        "label": {
          "th": "ตะโกนแทรกขึ้นมาว่าเรื่องนี้น่าเบื่อ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Yell insults loudly: \"Boring story!\"",
          "zh": "大声插嘴叫唤说无聊"
        },
        "icon": "📢"
      },
      {
        "id": "opt-listen-attentively",
        "label": {
          "th": "นั่งฟังอย่างตั้งใจ ไม่พูดคุยแทรก และสบตาเพื่อนที่กำลังพูด",
          "en": "Listen quietly, avoid interrupting, and maintain eye contact",
          "zh": "安静坐好专心倾听，不窃窃私语插嘴，眼神充满鼓励"
        },
        "icon": "👂"
      },
      {
        "id": "opt-walk-crawl",
        "label": {
          "th": "ลุกขึ้นเดินเพ่นพ่านข้ามหัวเพื่อน ในห้องเรียนจนเกิดความวุ่นวาย",
          "en": "Get up and wander around the room",
          "zh": "在教室里四处乱晃踩别人脚"
        },
        "icon": "🚶"
      }
    ],
    "correctOptionId": "opt-listen-attentively",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! การตั้งใจฟังเป็นการให้เกียรติเพื่อน ทำให้เพื่อนมีความมั่นใจในการพูดจ้ะ",
      "en": "Correct! Attentive, respectful listening empowers the speaker and creates an encouraging classroom culture!",
      "zh": "完全正确！专注倾听是对台上演讲同伴最棒的尊重，让他更有自信分享表达！"
    }
  },
  {
    "id": "exp30-se-k2-02",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "การช่วยเหลือและร่วมมือในห้องเรียน: เมื่อถึงเวลาเก็บของเล่นและกวาดห้อง 🧹 หนูควรปฏิบัติอย่างไร?",
      "en": "Cooperation & teamwork: When cleanup time music plays 🧹, what shows true helpfulness?",
      "zh": "集体责任心与合作：整理收拾音乐响起了 🧹，大家准备清理玩具扫地，懂事的好朋友怎么做？"
    },
    "illustration": "🧹 📦 🧸 🤝 🏫 ✨",
    "illustrationSubtitle": {
      "th": "ช่วยกันคนละไม้คนละมือ เก็บของเข้าที่",
      "en": "Lend a hand eagerly to pack toys and tidy up",
      "zh": "齐心协力主动搭把手，把玩具用品分类物归原位"
    },
    "options": [
      {
        "id": "opt-hide-restroom",
        "label": {
          "th": "แอบหนีไปซ่อนตัวในห้องน้ำคนเดียวจนเพื่อนเก็บเสร็จ",
          "en": "Sneak off to hide in restroom until all clean",
          "zh": "一听打扫卫生立马溜进洗手间躲懒"
        },
        "icon": "🚪"
      },
      {
        "id": "opt-dump-more-toys",
        "label": {
          "th": "เทของเล่นจากกล่องอื่นออกมากระจายเพิ่มอีก โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Dump extra toy bins across the floor for fun",
          "zh": "趁乱把更多收拾好的玩具倒得满地都是"
        },
        "icon": "🚯"
      },
      {
        "id": "opt-help-clean",
        "label": {
          "th": "ช่วยเพื่อนๆ เก็บของเล่นเข้าที่ และช่วยกวาดเศษขยะอย่างเต็มใจ",
          "en": "Eagerly help pack toys into bins and sweep up trash",
          "zh": "主动帮伙伴把积木归类入箱，拿小扫把扫净垃圾"
        },
        "icon": "🧹"
      }
    ],
    "correctOptionId": "opt-help-clean",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! \"คนละไม้คนละมือ\" ช่วยให้ห้องเรียนสะอาดรวดเร็ว และแสดงถึงความรับผิดชอบร่วมกัน",
      "en": "Awesome! Pitching in cooperatively makes cleanup fast, fun, and fosters shared community pride!",
      "zh": "太棒了！人心齐泰山移，大家齐心协力分工打扫，既快速整洁又培养了宝贵的集体责任感！"
    }
  },
  {
    "id": "exp30-se-k2-03",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "การจัดการความกลัว: เมื่อต้องขึ้นไปพูดแนะนำตัวเองหน้าชั้นเรียนแล้วรู้สึกตื่นเต้นและกลัว 🎤 สิ่งใดช่วยสร้างความมั่นใจได้ดีที่สุด?",
      "en": "Overcoming performance anxiety: Feeling nervous speaking onstage 🎤, what builds your courage?",
      "zh": "战胜怯场紧张：第一次站在全班同学面前作自我介绍感到心跳加速好害怕 🎤，怎样给自己打气？"
    },
    "illustration": "🎤 🧒 🫀 🌬️ 😊 👏",
    "illustrationSubtitle": {
      "th": "สูดหายใจลึกๆ ยิ้มกว้าง และบอกตัวเองว่า \"เราทำได้!\"",
      "en": "Breathe deep, smile warmly, say: \"I can do this!\"",
      "zh": "深呼吸一口气，昂首微笑，心里默念：“我可以，我很棒！”"
    },
    "options": [
      {
        "id": "opt-breathe-self-talk",
        "label": {
          "th": "สูดหายใจเข้าลึกๆ ยิ้มกว้าง สบตาเพื่อนๆ และบอกตัวเองว่า \"เราทำได้\"",
          "en": "Breathe deeply, smile, look at friendly faces, think: \"I can do it!\"",
          "zh": "做个深呼吸，微笑着看着台下友善的笑脸，心里肯定自己：“我一定能行！”"
        },
        "icon": "💪"
      },
      {
        "id": "opt-drop-mic-run",
        "label": {
          "th": "ขว้างไมโครโฟนทิ้งแล้ววิ่งหนีออกจากโรงเรียน โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Drop the microphone and sprint off campus",
          "zh": "把话筒狠狠一扔大哭着逃出校门"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-curse-audience",
        "label": {
          "th": "ยืนด่าเพื่อนทุกคนที่มองเรา โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Scream angry insults at listeners",
          "zh": "指着台下看着自己的小朋友大声骂人"
        },
        "icon": "😡"
      }
    ],
    "correctOptionId": "opt-breathe-self-talk",
    "explanation": {
      "th": "เก่งกาจมาก! ความตื่นเต้นเป็นเรื่องธรรมชาติ การสูดหายใจลึกๆ และให้กำลังใจตัวเอง จะช่วยให้เรากล้าหาญขึ้น",
      "en": "Brilliant! Courage isn’t the absence of butterflies—deep breathing and positive self-talk turn nerves into strength!",
      "zh": "太勇敢了！上台紧张是正常天性，通过深呼吸放松身体、积极自我鼓励，你就是最棒的小演说家！"
    }
  },
  {
    "id": "exp30-se-k2-04",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "การเคารพความแตกต่าง: เพื่อนคนใหม่มีสีผิว วัฒนธรรม หรือพูดภาษาต่างจากเรา 🌍 เราควรปฏิบัติต่อเพื่อนอย่างไร?",
      "en": "Respecting diversity: A new friend looks, speaks, or eats differently from your family 🌍. How to treat them?",
      "zh": "尊重多元文化包容心：班里来了一位肤色不同、生活习俗和母语不同的小朋友 🌍，应该怎样对待他？"
    },
    "illustration": "🌍 🤝 🧒 👦 👧 ❤️ ✨",
    "illustrationSubtitle": {
      "th": "ยอมรับความแตกต่าง เป็นมิตร และเรียนรู้วัฒนธรรมใหม่ๆ",
      "en": "Embrace differences kindly and learn from each other",
      "zh": "友好包容每一个人，热情做朋友，互相探索新奇世界"
    },
    "options": [
      {
        "id": "opt-point-mock",
        "label": {
          "th": "ชี้หน้าล้อเลียนความแตกต่างของเพื่อน ในห้องเรียนจนเกิดความวุ่นวาย",
          "en": "Point fingers and mock their accents/looks",
          "zh": "聚在一起指指点点、嘲笑口音与外貌"
        },
        "icon": "😜"
      },
      {
        "id": "opt-embrace-friends",
        "label": {
          "th": "ต้อนรับด้วยรอยยิ้ม เป็นมิตรที่ดี และสนใจเรียนรู้สิ่งใหม่ๆ ร่วมกัน",
          "en": "Welcome with warm smiles, be a great friend, and learn together",
          "zh": "热情笑脸相迎，真诚交朋友，虚心了解彼此的新奇文化"
        },
        "icon": "❤️"
      },
      {
        "id": "opt-exclude-games",
        "label": {
          "th": "สั่งห้ามเพื่อนทุกคนไม่ให้คุยด้วย ใดๆ เลยทั้งสิ้น",
          "en": "Ban everyone from talking to them",
          "zh": "抱团孤立对方，警告大家不准理他"
        },
        "icon": "🚫"
      }
    ],
    "correctOptionId": "opt-embrace-friends",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! มนุษย์ทุกคนมีความหลากหลายและงดงาม การเปิดใจเป็นมิตรทำให้โลกนี้น่าอยู่และได้เรียนรู้สิ่งใหม่",
      "en": "Correct! Diversity enriches our world; embracing cultural differences with kindness creates beautiful friendships!",
      "zh": "完全正确！世界因色彩斑斓而美好，用宽广包容的胸怀拥抱不同文化的朋友，是文明优秀的品质！"
    }
  },
  {
    "id": "exp30-se-k2-05",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "การแสดงความยินดีกับผู้อื่น: เมื่อเพื่อนสนิทชนะการประกวดวาดภาพได้เหรียญรางวัล 🥇 หนูควรแสดงความรู้สึกอย่างไร?",
      "en": "Celebrating others: Your close friend won 1st prize in an art competition 🥇. How should you respond?",
      "zh": "为同伴喝彩：你的同桌在儿童美术绘画比赛中荣获了一等奖大金牌 🥇，懂事的你应该怎么表达？"
    },
    "illustration": "🥇 🎨 👏 🤝 😊 ❤️",
    "illustrationSubtitle": {
      "th": "ชื่นชมและร่วมแสดงความยินดีจากใจจริง",
      "en": "Clap joyfully and congratulate with sincere warmth",
      "zh": "热烈鼓掌、送上拥抱与发自内心的真诚祝贺"
    },
    "options": [
      {
        "id": "opt-jealous-rip",
        "label": {
          "th": "อิจฉาและแอบไปฉีกภาพวาดของเพื่อนทิ้ง โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Jealously sneak over and rip their winning art",
          "zh": "嫉妒眼红，趁无人注意悄悄把获奖画撕烂"
        },
        "icon": "✂️"
      },
      {
        "id": "opt-scoff-lucky",
        "label": {
          "th": "เบะปากพูดว่า \"ฟลุ๊คหรอกนะ\" โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Sneer and grumble: \"Just pure dumb luck!\"",
          "zh": "撇着嘴酸溜溜说：“不过是运气好罢了”"
        },
        "icon": "😒"
      },
      {
        "id": "opt-cheer-proud",
        "label": {
          "th": "ยิ้ม ปรบมือเสียงดัง และบอกว่า \"ยินดีด้วยนะ ภาพของเธอสวยมากจริงๆ\"",
          "en": "Clap enthusiastically and say: \"Congratulations! Your art is amazing!\"",
          "zh": "大声鼓掌并送上大拇指：“恭喜你！你的画画真有创意！”"
        },
        "icon": "👏"
      }
    ],
    "correctOptionId": "opt-cheer-proud",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! การร่วมยินดีกับความสำเร็จของเพื่อนโดยไม่อิจฉา แสดงถึงจิตใจที่งดงาม มั่นคง และเปี่ยมด้วยความสุข",
      "en": "Awesome! Genuine joy for friends’ milestones reveals an abundant, secure, and generous heart!",
      "zh": "太棒了！真心实意为朋友的成就欢呼雀跃，不嫉妒不狭隘，内心富足纯善，格局非凡！"
    }
  },
  {
    "id": "exp30-se-k2-06",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ความซื่อสัตย์สุจริต: เก็บกระเป๋าสตางค์ของใครไม่รู้ตกอยู่ใต้โต๊ะในห้องเรียน 👛 หนูควรทำอย่างไร?",
      "en": "Honesty & integrity: You spot an unclaimed wallet dropped under a classroom desk 👛. What should you do?",
      "zh": "诚实不贪心小美德：在教室课桌角落捡到一个不知是谁掉落的小钱包 👛，应该怎么做？"
    },
    "illustration": "👛 🪙 🙋 🧑‍🏫 🤝 ✨",
    "illustrationSubtitle": {
      "th": "นำไปส่งให้คุณครูเพื่อประกาศหาเจ้าของ",
      "en": "Turn it in to teacher to announce to rightful owner",
      "zh": "立刻双手交给老师，请老师广播寻找失主"
    },
    "options": [
      {
        "id": "opt-hand-to-teacher",
        "label": {
          "th": "นำไปมอบให้คุณครูทันที เพื่อช่วยประกาศหาเจ้าของที่ทำตก",
          "en": "Take it directly to teacher to return to the owner",
          "zh": "马上将钱包交给老师，帮丢东西的失主及时找回"
        },
        "icon": "🧑‍🏫"
      },
      {
        "id": "opt-pocket-secret",
        "label": {
          "th": "รีบยัดใส่กระเป๋ากางเกงตัวเองเงียบๆ เอาไปซื้อของเล่น",
          "en": "Shove in pocket secretly to spend on personal toys",
          "zh": "悄悄塞进自己裤兜里拿去买辣条玩具"
        },
        "icon": "🤫"
      },
      {
        "id": "opt-throw-trash",
        "label": {
          "th": "โยนทิ้งลงถังขยะเปียก โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Toss it into wet food trash bin",
          "zh": "直接扔进脏水垃圾桶里"
        },
        "icon": "🗑️"
      }
    ],
    "correctOptionId": "opt-hand-to-teacher",
    "explanation": {
      "th": "เก่งกาจมาก! ความซื่อสัตย์ไม่หยิบฉวยของผู้อื่นมาเป็นของตน คือคุณธรรมพื้นฐานที่น่าภาคภูมิใจที่สุด",
      "en": "Brilliant! Honesty and integrity are golden virtues that build trust and lifelong character pride!",
      "zh": "太优秀了！拾金不昧、诚实守信，主动归还遗失物品，做堂堂正正受人敬佩的小君子！"
    }
  },
  {
    "id": "exp30-se-k2-07",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "การปฏิบัติตามกติกาสังคม: เวลาอยู่ในห้องสมุด 📚 เพื่อไม่ให้รบกวนสมาธิผู้อื่นที่กำลังอ่านหนังสือ เราควรทำสิ่งใด?",
      "en": "Library etiquette: Inside a quiet library 📚, how should you behave so readers aren’t disturbed?",
      "zh": "公共场所规则遵守：在安静的图书馆里 📚，为了不打扰别人专心阅读，应该怎样要求自己？"
    },
    "illustration": "📚 📖 🤫 👣 ✨",
    "illustrationSubtitle": {
      "th": "เดินเบาๆ พูดกระซิบเสียงเบา และเปิดหนังสือทะนุถนอม",
      "en": "Walk softly, whisper quietly, turn pages gently",
      "zh": "轻声慢步、耳语轻言、轻翻书页"
    },
    "options": [
      {
        "id": "opt-run-shout-meg",
        "label": {
          "th": "วิ่งไล่จับกันแล้วเปิดลำโพงเพลงเสียงกระหึ่ม โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Play tag shouting through loud megaphones",
          "zh": "在书架间追逐打闹、大声播放手机外音"
        },
        "icon": "📢"
      },
      {
        "id": "opt-whisper-softly",
        "label": {
          "th": "เดินช้าๆ พูดด้วยเสียงกระซิบเบาๆ และเปิดหนังสืออย่างทะนุถนอม",
          "en": "Walk gently, speak in soft whispers, and turn pages carefully",
          "zh": "脚步放轻柔，说话使用微弱耳语音量，轻拿轻放书籍"
        },
        "icon": "🤫"
      },
      {
        "id": "opt-tear-books",
        "label": {
          "th": "ฉีกหน้าหนังสือทิ้งเล่น กับเพื่อนๆ รอบตัว",
          "en": "Rip book pages out for fun",
          "zh": "抓起图画书胡乱撕破"
        },
        "icon": "✂️"
      }
    ],
    "correctOptionId": "opt-whisper-softly",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! ห้องสมุดเป็นพื้นที่แห่งความเงียบสงบ การพูดเสียงเบาและเดินเบาๆ ช่วยให้ทุกคนมีสมาธิ",
      "en": "Correct! Maintaining whisper-quiet decorum in libraries respects readers and preserves cozy focus!",
      "zh": "完全正确！图书馆是知识的静谧圣殿，轻声细语、缓步漫行，体现了优秀的公共素养！"
    }
  },
  {
    "id": "exp30-se-k2-08",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "การแสดงความกตัญญู: เมื่อถึงวันแม่หรือวันพ่อ 💐 สิ่งใดเป็นการแสดงความรักที่ทำให้คุณพ่อคุณแม่ชื่นใจที่สุด?",
      "en": "Expressing filial love: On Parents’ Day 💐, what heartfelt gesture brings mom & dad greatest joy?",
      "zh": "孝敬父母感恩之心：在感恩节日或平常日子里 💐，做什么事情最能让辛苦的爸爸妈妈感到欣慰开怀？"
    },
    "illustration": "💐 👨‍👩‍👧 ❤️ 💌 🧹  ôm",
    "illustrationSubtitle": {
      "th": "กอดคุณพ่อคุณแม่ ตั้งใจเป็นเด็กดี และช่วยงานบ้านง่ายๆ",
      "en": "Hug lovingly, be well-behaved, and help with simple chores",
      "zh": "给父母一个温暖大拥抱，听话懂事，主动帮忙做家务"
    },
    "options": [
      {
        "id": "opt-demand-expensive",
        "label": {
          "th": "ร้องไห้ทุบโต๊ะบังคับให้ซื้อของเล่นราคาแพงให้",
          "en": "Tantrum demanding expensive luxury toys",
          "zh": "在商场地上打滚撒泼非逼着买昂贵变形金刚"
        },
        "icon": "😭"
      },
      {
        "id": "opt-ignore-run-away",
        "label": {
          "th": "แกล้งทำเป็นไม่สนใจและหนีออกจากบ้าน ใดๆ เลยทั้งสิ้น",
          "en": "Ignore parents coldly and storm out",
          "zh": "对父母的辛苦视若无睹还摔门发脾气"
        },
        "icon": "🚪"
      },
      {
        "id": "opt-hug-help-chores",
        "label": {
          "th": "กอดบอกรัก ตั้งใจเรียน เป็นเด็กดี และช่วยงานบ้านเล็กๆ น้อยๆ",
          "en": "Hug warmly, express love, study hard, and assist with light chores",
          "zh": "给父母一个深情拥抱说“我爱您”，听话懂事帮忙扫地擦桌"
        },
        "icon": "❤️"
      }
    ],
    "correctOptionId": "opt-hug-help-chores",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! ความรัก ความตั้งใจเป็นเด็กดี และความใส่ใจช่วยเหลืองานบ้านเล็กๆ คือของขวัญที่ล้ำค่าที่สุดสำหรับพ่อแม่",
      "en": "Awesome! Loving hugs, sweet smiles, diligence, and helpful hands are priceless treasures to loving parents!",
      "zh": "太孝顺懂事了！甜甜的爱心拥抱、体谅父母的辛劳、做好力所能及的家务，是世界上最好的报恩大礼！"
    }
  },
  {
    "id": "exp30-se-k2-09",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "การยอมรับความผิดพลาด: ทำแก้วน้ำตกแตกโดยไม่ได้ตั้งใจ 🥛💥 แทนที่จะซ่อนความจริง หนูควรบอกผู้ใหญ่อย่างไร?",
      "en": "Accountability: Accidentally knocked down a cup of water 🥛💥. Instead of lying, how do you confess bravely?",
      "zh": "敢于担当承认过错：不小心碰掉了桌上的水杯摔碎在地上 🥛💥，比起撒谎抵赖，怎样坦白最勇敢？"
    },
    "illustration": "🥛 💥 🥺 🗣️ 🧑‍🏫 🤝",
    "illustrationSubtitle": {
      "th": "ยอมรับความจริงอย่างกล้าหาญและขอโทษ",
      "en": "Confess truthfully, say sorry, and ask how to help",
      "zh": "诚实勇敢说出真相、真诚道歉并主动请教如何清理"
    },
    "options": [
      {
        "id": "opt-honest-confess",
        "label": {
          "th": "เดินไปบอกตามตรงว่า \"หนูขอโทษครับ/ค่ะ หนูไม่ระวังชนแก้วตก เดี๋ยวหนูช่วยเช็ดครับ\"",
          "en": "Tell the truth: \"I’m sorry, I was clumsy. Let me help clean it up.\"",
          "zh": "诚实对老师坦白：“对不起老师，我不小心碰倒了水杯，我帮您一起收拾”"
        },
        "icon": "🤝"
      },
      {
        "id": "opt-blame-innocent",
        "label": {
          "th": "ชี้โทษเพื่อนข้างๆ ที่นั่งเฉยๆ ว่าเพื่อนเป็นคนปา โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Falsely accuse an innocent classmate sitting nearby",
          "zh": "瞪着眼睛硬赖是旁边没动弹的小伙伴故意摔的"
        },
        "icon": "👉"
      },
      {
        "id": "opt-kick-under-hide",
        "label": {
          "th": "รีบเตะเศษแก้วซ่อนไว้ใต้เก้าอี้หนีไป โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Kick shards secretly under a chair and flee",
          "zh": "一脚把玻璃碎片踢进椅子缝里假装不知道"
        },
        "icon": "🥾"
      }
    ],
    "correctOptionId": "opt-honest-confess",
    "explanation": {
      "th": "เก่งกาจมาก! ความกล้าหาญในการยอมรับความจริงเมื่อทำพลาดและกล่าวคำขอโทษ คือคุณสมบัติของคนเก่งที่แท้จริง",
      "en": "Brilliant! Owning your mistakes bravely and offering to help clean up turns missteps into character triumphs!",
      "zh": "这才是真正有担当的小小男子汉/小雏鹰！敢作敢当、真诚道歉并承担清理责任，比任何借口都可敬！"
    }
  },
  {
    "id": "exp30-se-k2-10",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "การชวนเพื่อนที่อยู่ลำพังเข้ามาร่วมกลุ่ม: เห็นเพื่อนคนหนึ่งนั่งซึมคนเดียวใต้ร่มไม้ในสนาม 🌳 หนูและเพื่อนๆ ควรทำอย่างไร?",
      "en": "Inclusive kindness: Spotting a classmate sitting lonely and left out under a tree 🌳, what should you do?",
      "zh": "包容不冷落同伴：下课操场上，看到一个小朋友孤零零坐在大树底下发呆 🌳，你该怎么友善伸出橄榄枝？"
    },
    "illustration": "🌳 🧒 🤝 👧 👦 ⚽ ✨",
    "illustrationSubtitle": {
      "th": "เดินเข้าไปทักทายและชวนมาร่วมเล่นด้วยกัน",
      "en": "Walk over, smile, and warmly invite them to join the game",
      "zh": "跑过去拉起他的手，热情邀请：“一起来加入我们吧！”"
    },
    "options": [
      {
        "id": "opt-throw-mud",
        "label": {
          "th": "ปาโคลนใส่เพื่อนที่นั่งอยู่ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Throw mud at the lonely kid",
          "zh": "抓泥巴扔向孤单的朋友"
        },
        "icon": "🚯"
      },
      {
        "id": "opt-invite-join",
        "label": {
          "th": "เดินเข้าไปยิ้มทักทาย และชวนว่า \"มาเล่นเตะบอลสนุกๆ กับพวกเราไหม\"",
          "en": "Walk over with a smile and invite: \"Want to kick the ball with us?\"",
          "zh": "走上前热情微笑说：“我们正在踢球玩游戏，快来加入我们一起玩吧！”"
        },
        "icon": "🤝"
      },
      {
        "id": "opt-tell-others-ignore",
        "label": {
          "th": "สั่งเพื่อนทุกคนว่าห้ามใครไปคุยด้วยเด็ดขาด โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Command everyone to shun them completely",
          "zh": "命令所有伙伴都假装看不见他、不带他玩"
        },
        "icon": "🚫"
      }
    ],
    "correctOptionId": "opt-invite-join",
    "explanation": {
      "th": "เก่งที่สุด! การไม่ทอดทิ้งใครไว้ข้างหลัง และเปิดรับเพื่อนเข้ากลุ่ม ทำให้ทุกคนรู้สึกอบอุ่นและมีคุณค่า",
      "en": "Splendid! Inclusive kindness ensures no child feels lonely, creating a caring community of belonging!",
      "zh": "回答精彩！不冷落任何一个人、主动邀请孤单的朋友融入大家庭，阳光般的善意温暖了整个校园！"
    }
  },
  {
    "id": "exp30-se-k3-01",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "การไกล่เกลี่ยข้อพิพาทอย่างสันติ (Conflict Resolution): สมาชิก 2 คนในกลุ่มแย่งตัวต่อเลโก้ชิ้นสุดท้ายกันจนเกือบจะชกต่อย 🧱 ในฐานะหัวหน้ากลุ่ม หนูควรแก้ปัญหาอย่างไร?",
      "en": "Peaceful conflict mediation: Two group members fighting aggressively over the last golden Lego brick 🧱. How to mediate?",
      "zh": "和平化解冲突矛盾：小组两位伙伴因为抢夺最后一块黄金乐高积木 🧱 互不相让快要动手，小队长该如何和平调解？"
    },
    "illustration": "🧱 🧒 👧 ⚖️ 🤝 ⏰ 💡",
    "illustrationSubtitle": {
      "th": "รับฟังทั้งสองฝ่าย ใช้กติกาสลับกันเล่นคนละ 5 นาที",
      "en": "Listen to both sides calmly and establish a 5-minute timer turn swap",
      "zh": "请双方停手把话讲清楚，设定定时器每人轮流使用五分钟"
    },
    "options": [
      {
        "id": "opt-join-fight-punch",
        "label": {
          "th": "กระโดดเข้าไปช่วยรุมต่อยฝ่ายใดฝ่ายหนึ่ง โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Jump in and punch one side to win the fight",
          "zh": "卷起袖子帮其中一人揍另一个人"
        },
        "icon": "🥊"
      },
      {
        "id": "opt-break-lego",
        "label": {
          "th": "เอาค้อนทุบตัวต่อให้พังแหลกเป็นผง โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Smash the brick into dust with a hammer",
          "zh": "拿锤子把抢夺的积木砸得稀巴烂"
        },
        "icon": "🔨"
      },
      {
        "id": "opt-mediate-timer",
        "label": {
          "th": "ให้ทั้งสองคนวางตัวต่อลง พูดคุยด้วยเหตุผล และตกลงผลัดกันใช้คนละ 5 นาที",
          "en": "Have both set it down, speak calmly, and alternate using a 5-minute timer",
          "zh": "请两人先松手把积木放在中间，平心静气商量，用沙漏计时每人各用五分钟"
        },
        "icon": "⚖️"
      }
    ],
    "correctOptionId": "opt-mediate-timer",
    "explanation": {
      "th": "ยอดเยี่ยมมาก! การชะลออารมณ์ รับฟัง และตั้งกติกาสลับรอบที่เป็นธรรม คือทักษะการไกล่เกลี่ยข้อพิพาทระดับผู้นำ",
      "en": "Spot on! De-escalating heat, listening impartially, and establishing fair time-sharing is masterclass leadership!",
      "zh": "精彩！平息火气、客观倾听双方需求，并制定公正合理的轮流时间规则，展现出卓越的领导化解才能！"
    }
  },
  {
    "id": "exp30-se-k3-02",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "ความมานะพยายามและความมุ่งมั่น (Grit & Growth Mindset): พยายามฝึกปั่นจักรยานสองล้อ 🚲 แล้วล้มหลายครั้งจนท้อใจ ควรพูดกับตัวเองอย่างไร?",
      "en": "Growth Mindset: Struggling to balance a two-wheel bicycle 🚲 and falling repeatedly. What inner voice fuels resilience?",
      "zh": "成长型思维与坚毅品质：练习骑两轮自行车 🚲 摔倒了好几次磨破了皮想打退堂鼓，该怎样在内心激励自己？"
    },
    "illustration": "🚲 跌倒 ➡️ 站起 💪 🚴 🌟 (เราเก่งขึ้นทุกครั้งที่ฝึก)",
    "illustrationSubtitle": {
      "th": "ล้มแล้วลุกขึ้นใหม่ \"ความพยายามอยู่ที่ไหน ความสำเร็จอยู่ที่นั่น\"",
      "en": "Dust off and try again: \"Every mistake trains my brain stronger!\"",
      "zh": "拍拍尘土站起来：“每一次跌倒尝试，都在让我离学会更近一步！”"
    },
    "options": [
      {
        "id": "opt-growth-mindset",
        "label": {
          "th": "ลุกขึ้นมาใหม่และคิดว่า \"เราแค่ยังไม่ชิน ถ้าซ้อมอีกนิดเราจะทำได้อย่างแน่นอน\"",
          "en": "Rise again thinking: \"I’m not there YET, with practice I will conquer this!\"",
          "zh": "坚强站起身深呼吸：“我只是暂时还不熟练，只要多摸索练习，我一定能学会！”"
        },
        "icon": "💪"
      },
      {
        "id": "opt-smash-bike-cry",
        "label": {
          "th": "เตะจักรยานทุบพังแล้วบอกว่า \"หนูเกลียดจักรยานตลอดชีวิต\" โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Kick bike angrily shouting: \"I hate bikes forever!\"",
          "zh": "狠狠踹倒自行车大哭：“我一辈子都绝不再碰自行车了！”"
        },
        "icon": "😡"
      },
      {
        "id": "opt-lay-road-forever",
        "label": {
          "th": "นอนราบไปกับพื้นถนนไม่ยอมขยับลุกไปไหน ใดๆ เลยทั้งสิ้น",
          "en": "Lie on the asphalt refusing to move forever",
          "zh": "赖在地上打滚死活不肯起来"
        },
        "icon": "🛋️"
      }
    ],
    "correctOptionId": "opt-growth-mindset",
    "explanation": {
      "th": "เก่งกาจมาก! ความล้มเหลวคือบันไดสู่ความสำเร็จ เด็กที่มี Growth Mindset จะไม่ยอมแพ้และพัฒนาตนเองเสมอ",
      "en": "Brilliant! A Growth Mindset views setbacks as coaching steps; persistence turns wobbles into confident riding!",
      "zh": "太具坚毅毅力了！失败与摔跤是走向成功必须跨越的台阶，拥有成长型思维的孩子能战胜一切难关！"
    }
  },
  {
    "id": "exp30-se-k3-03",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "การมองในมุมของผู้อื่น (Perspective Taking): เพื่อนบังเอิญทำน้ำหวานหกใส่สมุดการบ้านของเราจนเปียก 🥺 เราควรมองเจตนาของเพื่อนอย่างไร?",
      "en": "Empathy & intent attribution: A friend accidentally spills fruit punch on your homework notebook 🥺. How to evaluate their intent?",
      "zh": "换位思考与理性归因：同伴不小心碰倒果汁溅湿了你的崭新作业本 🥺，他吓得连连道歉，你该如何看待他的意图？"
    },
    "illustration": "🥤 💦 📄 🥺 🤝 ❤️",
    "illustrationSubtitle": {
      "th": "เข้าใจว่าเพื่อนไม่ได้ตั้งใจ ให้อภัย และช่วยกันแก้ปัญหา",
      "en": "Recognize it was an unintentional accident, forgive, and solve together",
      "zh": "看清朋友并非故意恶作剧，大度宽恕原谅，一起拿吹风机吹干解决"
    },
    "options": [
      {
        "id": "opt-revenge-spill",
        "label": {
          "th": "เอาน้ำแดงสาดใส่หน้าเพื่อนเพื่อล้างแค้นทันที โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Splash red punch directly into friend’s face for revenge",
          "zh": "抓起整杯红果汁兜头泼在朋友脸上搞报复"
        },
        "icon": "🥊"
      },
      {
        "id": "opt-forgive-accidental",
        "label": {
          "th": "เข้าใจว่าเพื่อนไม่ได้ตั้งใจแกล้ง จึงให้อภัยและช่วยกันนำพัดลมมาเป่าให้แห้ง",
          "en": "Understand it was an honest accident, forgive, and blow-dry the pages together",
          "zh": "明白朋友完全无心之过，大度原谅宽慰他，并一起拿纸巾吸干吹风吹平"
        },
        "icon": "❤️"
      },
      {
        "id": "opt-shred-friend-book",
        "label": {
          "th": "แย่งสมุดของเพื่อนมาฉีกขยี้ทิ้งให้หมด โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Snatch friend’s backpack and shred all books",
          "zh": "抢夺同伴的书包把所有课本全撕个粉碎"
        },
        "icon": "✂️"
      }
    ],
    "correctOptionId": "opt-forgive-accidental",
    "explanation": {
      "th": "ยอดเยี่ยมมาก! การแยกแยะ \"อุบัติเหตุที่ไม่ได้ตั้งใจ\" ออกจาก \"การแกล้ง\" และการรู้จักให้อภัย คือวุฒิภาวะทางอารมณ์ขั้นสูง",
      "en": "Awesome! Distinguishing honest accidents from malicious intent and choosing forgiveness demonstrates mature EQ!",
      "zh": "太有涵养与胸襟了！明辨无心之失与恶意伤害的界限，用宽宏大度抚慰慌乱同伴，这正是高情商的核心！"
    }
  },
  {
    "id": "exp30-se-k3-04",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "การเป็นผู้นำที่ดี (Positive Leadership): ในการทำงานกลุ่มจัดบอร์ดวิทยาศาสตร์ 🔬 หัวหน้ากลุ่มที่ดีควรมีลักษณะการทำงานแบบใด?",
      "en": "Effective group leadership: Leading a team science project board 🔬, what defines a truly inspiring leader?",
      "zh": "卓越领导力：在组织全组同学共同制作科普科学展板时 🔬，一名优秀的组长应该如何带领大家？"
    },
    "illustration": "🔬 📋 🤝 👧 🧒 🎨 ✨",
    "illustrationSubtitle": {
      "th": "รับฟังความคิดเห็น แบ่งงานตามความถนัด และให้กำลังใจลูกทีม",
      "en": "Listen to ideas, assign roles based on strengths, and cheer teammates",
      "zh": "倾听全员金点子、根据特长合理分工、鼓劲加油全程相助"
    },
    "options": [
      {
        "id": "opt-bossy-dictator",
        "label": {
          "th": "ออกคำสั่งคนเดียว นั่งชี้นิ้ว และด่าว่าทุกคนที่ทำไม่ถูกใจ ใดๆ เลยทั้งสิ้น",
          "en": "Boss people around, finger-point, and insult members",
          "zh": "一个人独断专行颐指气使，坐在一边指手画脚大骂别人"
        },
        "icon": "📢"
      },
      {
        "id": "opt-do-nothing-sleep",
        "label": {
          "th": "ทิ้งงานให้เพื่อนทำทั้งหมดแล้วตัวเองไปวิ่งเล่น กับเพื่อนๆ รอบตัว",
          "en": "Dump all workload on others and ditch to play",
          "zh": "把所有任务全扔给组员，自己溜到操场玩耍逍遥"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-inspiring-leader",
        "label": {
          "th": "รับฟังทุกความเห็น แบ่งงานตามความถนัดของแต่ละคน และคอยช่วยเหลือให้กำลังใจ",
          "en": "Listens to all voices, assigns roles by strengths, and encourages everyone",
          "zh": "虚心倾听每个人想法，依据各自特长分工合作，时刻鼓劲加油给予援助"
        },
        "icon": "🌟"
      }
    ],
    "correctOptionId": "opt-inspiring-leader",
    "explanation": {
      "th": "เก่งกาจมาก! ผู้นำที่ดีไม่ใช่ผู้สั่งการ แต่เป็นผู้รับฟัง สร้างแรงบันดาลใจ และประสานพลังของทุกคนให้สำเร็จไปด้วยกัน",
      "en": "Brilliant! True leaders don’t dictate—they listen, elevate individual talents, and champion shared triumph!",
      "zh": "太优秀了！真正的领袖绝不是高高在上的发号施令者，而是点亮伙伴才智、协调整体并肩作战的引路人！"
    }
  },
  {
    "id": "exp30-se-k3-05",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "การยืนหยัดเพื่อความถูกต้อง (Upstander vs Bystander): เห็นเพื่อนคนหนึ่งกำลังถูกเด็กโตแกล้งผลักและแย่งขนมในสนาม 🛑 หนูควรทำอย่างไร?",
      "en": "Being an Upstander: You see an older kid bullying a smaller classmate, taking their snacks 🛑. How to stand up safely?",
      "zh": "见义勇为与反欺凌：在操场角落看见有高年级大孩子在欺负推搡同伴并抢夺他的点心 🛑，你该如何聪明制止？"
    },
    "illustration": "🛑 🗣️ 🧑‍🏫 🤝 🛡️ ✨",
    "illustrationSubtitle": {
      "th": "บอกให้หยุดด้วยเสียงหนักแน่น และรีบไปแจ้งคุณครูมาช่วยทันที",
      "en": "Say \"Stop it!\" firmly and quickly summon teachers/adults for help",
      "zh": "大声坚定喊出：“住手！请不要欺负他！”，并立刻飞奔呼叫老师前来解决"
    },
    "options": [
      {
        "id": "opt-upstander-call-teacher",
        "label": {
          "th": "พูดเตือนด้วยเสียงหนักแน่นว่า \"หยุดแกล้งเพื่อนนะ\" และรีบไปบอกคุณครูมาช่วยทันที",
          "en": "Speak firmly: \"Stop bullying him!\" and immediately call a teacher",
          "zh": "义正言辞制止：“住手！别欺负同伴！”，同时快步呼叫附近的巡查老师赶来"
        },
        "icon": "🛡️"
      },
      {
        "id": "opt-stand-laugh-cheer",
        "label": {
          "th": "ยืนหัวเราะถ่ายคลิปและเชียร์ให้ตีกันแรงขึ้น โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Stand clapping and cheering the bully to hit harder",
          "zh": "站在一旁起哄看热闹，鼓掌叫好怂恿打架"
        },
        "icon": "😆"
      },
      {
        "id": "opt-join-bully",
        "label": {
          "th": "เข้าไปช่วยเด็กโตแย่งขนมมากินด้วย โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Join the bully to steal and eat snacks together",
          "zh": "冲上去跟着大孩子一起抢零食分赃"
        },
        "icon": "🍫"
      }
    ],
    "correctOptionId": "opt-upstander-call-teacher",
    "explanation": {
      "th": "ถูกต้องที่สุด! การเป็น Upstander ที่กล้าปกป้องเพื่อนและแจ้งคุณครู คือการสร้างโรงเรียนที่ปลอดภัยไร้การรังแก",
      "en": "Correct! Standing up against bullying by speaking out and summoning adult help protects community safety!",
      "zh": "正义感爆棚！面对欺凌不做冷漠看客，勇敢发声制止并快速向老师求援，是有勇有谋的真正小英雄！"
    }
  },
  {
    "id": "exp30-se-k3-06",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "การจัดการความเครียดและการผิดหวัง (Emotional Coping): เมื่อตั้งใจอ่านหนังสือสอบหรือวาดรูปส่งประกวดแต่ไม่ได้รับรางวัล 🥺 หนูควรเยียวยาจิตใจตนเองอย่างไร?",
      "en": "Coping with disappointment: Worked hard on a competition but didn’t win an award 🥺. How to self-soothe constructively?",
      "zh": "积极面对遗憾与失落：全力以赴认真准备的比赛结果公布，自己没有拿到心仪的奖状 🥺，应该如何调整情绪重拾信心？"
    },
    "illustration": "🎨 🥺 ➡️ 🫂 ❤️ ➡️ 🌟 (เราเก่งขึ้นและภูมิใจในความพยายาม)",
    "illustrationSubtitle": {
      "th": "กอดคุณพ่อคุณแม่ ภูมิใจในความพยายาม และมุ่งมั่นพัฒนาต่อไป",
      "en": "Hug loved ones, take pride in your effort, and keep honing skills",
      "zh": "向亲爱的家人倾诉拥抱，为自己的全力以赴感到自豪，汲取经验继续前行"
    },
    "options": [
      {
        "id": "opt-tear-diplomas",
        "label": {
          "th": "ฉีกรูปวาดทิ้ง ด่าทอกรรมการผู้ตัดสิน โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Rip drawings up and scream curses at judges",
          "zh": "疯狂把心血画作撕烂，破口大骂评委不公"
        },
        "icon": "😡"
      },
      {
        "id": "opt-proud-of-effort",
        "label": {
          "th": "บอกตนเองว่า \"เราได้พยายามเต็มที่แล้ว และได้เก่งขึ้นกว่าเมื่อวาน\" แล้วฝึกฝนต่อไป",
          "en": "Tell yourself: \"I gave my best effort and learned so much!\" and keep growing",
          "zh": "微笑着宽慰自己：“我已经拼尽了全力，学到了很多新本领，过程比奖牌更珍贵！”"
        },
        "icon": "🌟"
      },
      {
        "id": "opt-give-up-forever",
        "label": {
          "th": "เลิกวาดรูป เลิกเรียนหนังสือ ไม่ทำอะไรอีกเลย โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Quit drawing and learning completely forever",
          "zh": "从此封笔罢工，觉得自己一无是处自暴自弃"
        },
        "icon": "🕳️"
      }
    ],
    "correctOptionId": "opt-proud-of-effort",
    "explanation": {
      "th": "ยอดเยี่ยมมาก! รางวัลที่แท้จริงคือทักษะและความรู้ที่เราได้พัฒนาขึ้นมา ความภาคภูมิใจในความพยายามจะทำให้เราเติบโตอย่างมั่นคง",
      "en": "Awesome! True mastery lies in the growth journey, not just shiny trophies; proud resilience is unstoppable!",
      "zh": "太具智慧与心力了！奖项只是瞬间的点缀，在全力奔跑中提升的硬本领与强韧心智才是伴随一生的无价之宝！"
    }
  },
  {
    "id": "exp30-se-k3-07",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "การยอมรับข้อตกลงทางประชาธิปไตยในห้องเรียน: เมื่อเสียงข้างมากในห้องโหวตเลือกปลูกต้นมะลิ 🌸 แต่หนูอยากปลูกต้นทานตะวัน 🌻 หนูควรปฏิบัติตนอย่างไร?",
      "en": "Democratic classroom governance: Class voted majority for Jasmine 🌸 while you voted Sunflower 🌻. How to accept gracefully?",
      "zh": "民主规则服从多数：班级多数表决决定在种植角栽种清香茉莉花 🌸，而你当初投的是向日葵 🌻，此时该持什么态度？"
    },
    "illustration": "🗳️ 🌸 (เสียงข้างมาก) 🤝 🌻 (เคารพมติกลุ่ม)",
    "illustrationSubtitle": {
      "th": "เคารพมติเสียงส่วนใหญ่ และร่วมมือดูแลแปลงดอกไม้ร่วมกัน",
      "en": "Respect majority vote cheerfully and nurture the Jasmine garden together",
      "zh": "尊重大众民主表决结果，乐呵呵与全班同学一起用心浇灌培育茉莉花"
    },
    "options": [
      {
        "id": "opt-sabotage-garden",
        "label": {
          "th": "แอบมาถอนต้นมะลิทิ้งตอนกลางคืน โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Sneak at night to rip out jasmine seedlings",
          "zh": "趁放学没人的时候偷偷把全班种下的花苗全拔光"
        },
        "icon": "🥀"
      },
      {
        "id": "opt-strike-scream",
        "label": {
          "th": "นอนขวางแปลงดินไม่ยอมให้ใครปลูกดอกไม้ ใดๆ เลยทั้งสิ้น",
          "en": "Block the garden patch screaming protests",
          "zh": "霸占花坛躺着不让任何人浇水"
        },
        "icon": "🚫"
      },
      {
        "id": "opt-respect-majority",
        "label": {
          "th": "เคารพมติเสียงส่วนใหญ่ และร่วมมือกับเพื่อนๆ รดน้ำดูแลต้นมะลิอย่างตั้งใจ",
          "en": "Respect majority decision and cheerfully help water & care for Jasmine",
          "zh": "真诚尊重多数决议，开开心心和大家一起动手栽种、浇水照料茉莉花"
        },
        "icon": "🌸"
      }
    ],
    "correctOptionId": "opt-respect-majority",
    "explanation": {
      "th": "เก่งกาจมาก! การยอมรับมติเสียงส่วนใหญ่และร่วมมือกันทำงาน เป็นหัวใจสำคัญของความเป็นพลเมืองที่ดีและระบอบประชาธิปไตย",
      "en": "Brilliant! Honoring majority democratic consensus while cooperating wholeheartedly is the bedrock of civic society!",
      "zh": "太懂事了！民主精髓在于“各抒己见投票表决，尘埃落定少数服从多数共同协作”，展现了极佳的集体公民涵养！"
    }
  },
  {
    "id": "exp30-se-k3-08",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "การเคารพสิทธิและพื้นที่ส่วนตัว (Personal Boundaries): ถ้าหนูอยากหยิบตุ๊กตาของเพื่อนมาดูเล่น 🧸 ขั้นตอนที่ถูกต้องตามมารยาทคืออะไร?",
      "en": "Respecting boundaries: You want to hold and look at a friend’s special doll 🧸. What is the respectful protocol?",
      "zh": "尊重他人界限与物权：看到同桌从家里带来一件非常心爱的小熊公仔 🧸，想拿过来看一看，规范做法是什么？"
    },
    "illustration": "🧸 🙋 🗣️ 🤝 ✨",
    "illustrationSubtitle": {
      "th": "เอ่ยปากขออนุญาตอย่างสุภาพ และรอฟังคำตอบก่อนจับ",
      "en": "Ask politely for permission and await consent before touching",
      "zh": "礼貌开口征得对方同意允许后，再轻拿轻放欣赏"
    },
    "options": [
      {
        "id": "opt-ask-permission",
        "label": {
          "th": "ถามอย่างสุภาพว่า \"เราขอขอดูตุ๊กตาตัวนี้หน่อยได้ไหม\" และรอจนเพื่อนอนุญาต",
          "en": "Ask politely: \"May I please see your doll?\" and wait for permission",
          "zh": "礼貌注视对方询问：“请问我可以借看看你的小熊吗？”耐心等对方点头同意"
        },
        "icon": "🙋"
      },
      {
        "id": "opt-grab-snatch",
        "label": {
          "th": "กระชากแย่งมาจากมือเพื่อนทันทีโดยไม่พูดอะไร ใดๆ เลยทั้งสิ้น",
          "en": "Snatch it from their hands with no words",
          "zh": "二话不说一把生拉硬拽直接夺走"
        },
        "icon": "🖐️"
      },
      {
        "id": "opt-steal-bag",
        "label": {
          "th": "แอบเปิดกระเป๋าเพื่อนหยิบมาตอนเพื่อนไปเข้าห้องน้ำ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Unzip their bag secretly when they go to restroom",
          "zh": "趁同伴上洗手间偷偷拉开书包拉链偷拿"
        },
        "icon": "🤫"
      }
    ],
    "correctOptionId": "opt-ask-permission",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! ของทุกชิ้นมีเจ้าของ การเอ่ยปากขออนุญาตและเคารพคำตอบของเพื่อน คือมารยาททางสังคมที่งดงาม",
      "en": "Correct! Everything belongs to someone; asking permission before touching honors personal property and boundaries!",
      "zh": "完全正确！尊重别人的所有权和界限，先礼貌问询征求同意，是文明交往的基本铁律！"
    }
  },
  {
    "id": "exp30-se-k3-09",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "การแสดงความขอบคุณต่อผู้ทำหน้าที่บริการสังคม: เมื่อคุณลุงนักการภารโรงช่วยซ่อมเก้าอี้ที่พังให้เรา 🪑 เด็กๆ ควรแสดงน้ำใจอย่างไร?",
      "en": "Gratitude towards school staff: The school janitor fixes your broken classroom chair 🪑. How should you show appreciation?",
      "zh": "尊重平凡奉献者：学校老校工爷爷顶着汗水帮你修好了摇晃破损的教室椅子 🪑，懂事的小朋友该怎样真诚致谢？"
    },
    "illustration": "🪑 🔨 👴 🧒 🙏 💧 (มอบน้ำดื่มและไหว้ขอบคุณ)",
    "illustrationSubtitle": {
      "th": "ยกมือไหว้ขอบคุณและยื่นน้ำดื่มเย็นๆ ให้",
      "en": "Wai respectfully, say heartfelt thanks, and offer a glass of water",
      "zh": "礼貌鞠躬行礼双手送上一杯水：“爷爷您辛苦了，谢谢您！”"
    },
    "options": [
      {
        "id": "opt-ignore-boss",
        "label": {
          "th": "เดินเชิดหน้าไม่สนใจ ทำเหมือนเป็นหน้าที่ต้องทำอยู่แล้ว ใดๆ เลยทั้งสิ้น",
          "en": "Snub coldly acting like it was their mandatory duty",
          "zh": "冷漠昂头走开，觉得别人理所应当服侍自己"
        },
        "icon": "😒"
      },
      {
        "id": "opt-thank-water-care",
        "label": {
          "th": "ยกมือไหว้กล่าว \"ขอบคุณมากครับ/ค่ะ\" และอาจส่งน้ำดื่มเย็นๆ ให้ชื่นใจ",
          "en": "Wai respectfully, say \"Thank you so much!\" and offer a cool cup of water",
          "zh": "双手合十恭敬道谢：“谢谢工友爷爷！您喝口水歇歇吧！”"
        },
        "icon": "🙏"
      },
      {
        "id": "opt-break-again",
        "label": {
          "th": "กระโดดกระทืบเก้าอี้ให้พังอีกรอบ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Stomp on chair to break it again on purpose",
          "zh": "当着爷爷的面故意再用脚踢断椅背"
        },
        "icon": "🥾"
      }
    ],
    "correctOptionId": "opt-thank-water-care",
    "explanation": {
      "th": "ยอดเยี่ยมที่สุด! ทุกอาชีพที่ทำประโยชน์มีเกียรติเท่าเทียมกัน การเห็นคุณค่าและขอบคุณผู้ดูแลโรงเรียนทำให้สังคมน่าอยู่และอบอุ่น",
      "en": "Awesome! All hardworking roles deserve honor; thanking custodians warmly nurtures human dignity and mutual respect!",
      "zh": "极具温润人格品质！尊重每一位默默付出的劳动者，体恤辛苦、感恩相待，社会因此充满人间温情！"
    }
  },
  {
    "id": "exp30-se-k3-10",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "การตั้งเป้าหมายและการกำกับตนเอง (Self-Directed Goal Setting): หนูตั้งใจจะฝึกเขียนพยัญชนะไทยให้สวยงามครบทุกตัว ✍️ แผนการปฏิบัติใดดีที่สุดที่จะพาไปสู่ความสำเร็จ?",
      "en": "Goal setting & perseverance: Setting a goal to master neat Thai handwriting ✍️, what action plan brings real triumph?",
      "zh": "自我目标管理与毅力坚持：立志要写出一手工整漂亮规范的汉字或泰文字母 ✍️，哪套执行计划最扎实有效？"
    },
    "illustration": "✍️ 📖 🗓️ ⏰ 🌟 🏆",
    "illustrationSubtitle": {
      "th": "ฝึกฝนวันละ 10 นาทีอย่างสม่ำเสมอทุกวัน",
      "en": "Practice consistently 10 minutes every day with focus",
      "zh": "制定每天专注练习10分钟小计划，持之以恒日积月累"
    },
    "options": [
      {
        "id": "opt-cram-once-year",
        "label": {
          "th": "ไม่เขียนเลย 364 วัน แล้วมานั่งเขียนรวดเดียวทั้งคืน 500 หน้า",
          "en": "Zero practice for a year, then cram 500 pages in one sleepless night",
          "zh": "平时一整年碰都不碰笔，期末最后一晚不睡觉狂抄五百页"
        },
        "icon": "😫"
      },
      {
        "id": "opt-scribble-messy",
        "label": {
          "th": "ขีดเขียนหวัดๆ เละเทะให้เสร็จเร็วที่สุดใน 3 วินาที โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Scribble illegibly in 3 seconds to rush away",
          "zh": "像狂风暴雨一样闭眼鬼画符3秒钟应付了事"
        },
        "icon": "🌀"
      },
      {
        "id": "opt-daily-10-min",
        "label": {
          "th": "ฝึกคัดวันละ 2-3 ตัว ใช้เวลาเพียงวันละ 10 นาที แต่ทำอย่างสม่ำเสมอทุกวัน",
          "en": "Practice neatly 2-3 letters for 10 minutes daily with steady consistency",
          "zh": "制定微习惯小目标：每天静心练习10分钟、工整写2-3个字，持之以恒天天坚持"
        },
        "icon": "✍️"
      }
    ],
    "correctOptionId": "opt-daily-10-min",
    "explanation": {
      "th": "สุดยอดการบริหารตนเอง! ความสม่ำเสมอทีละน้อยทุกวัน (Consistency) มีพลังยิ่งใหญ่กว่าการทำหักโหมเพียงครั้งเดียว ช่วยให้สมองและกล้ามเนื้อจดจำได้อย่างแม่นยำ",
      "en": "Splendid mastery! Daily focused micro-habits compound into extraordinary skill; small steps every day achieve great dreams!",
      "zh": "太具自律智慧了！“不积跬步无以至千里”，每天坚持专注十分钟的微小进步累积起来，终将收获惊艳众人的卓越成就！"
    }
  }
];
