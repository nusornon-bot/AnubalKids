import { Question } from '../types';

/**
 * คลังแบบทดสอบ: อารมณ์และสังคม (Socio-Emotional) จำนวน 90 ข้อ
 * ครบ 3 ระดับชั้น (อ.1 - อ.3) ระดับความยากละ 10 ข้อ (ง่าย, ปานกลาง, ท้าทาย)
 * กระจายตำแหน่งคำตอบถูกต้อง A, B, C อย่างสมดุลเท่าเทียมกัน
 */
export const QUESTIONS_SOCIO_EMOTIONAL: Question[] = [
  {
    "id": "k1-soc-e1",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "เมื่อมีคนมอบของขวัญหรือช่วยเหลือเรา 🎁 คำพูดที่สุภาพน่ารักที่เราควรกล่าวคือคำว่าอะไร?",
      "en": "When someone gives you a lovely gift or helps you 🎁, what polite magic words do you say?",
      "zh": "当长辈或朋友赠送给你一份心仪的礼物或给予热情帮助 🎁 时，最文明礼貌的道谢用语是？"
    },
    "illustration": "🎁 😊 🤝",
    "illustrationSubtitle": {
      "th": "คำขอบคุณเมื่อได้รับสิ่งของหรือความช่วยเหลือ",
      "en": "Saying \"Thank You\" politely",
      "zh": "礼貌用语：“谢谢您/感谢你”"
    },
    "options": [
      {
        "id": "opt-k1-soc-e1-1",
        "label": {
          "th": "กล่าวคำว่า \"ขอบคุณครับ / ขอบคุณค่ะ\" พร้อมยกมือไหว้ด้วยรอยยิ้ม 🙏",
          "en": "Say \"Thank you!\" with a polite bow and warm smile",
          "zh": "双手合十面带微笑、诚恳地说：“非常感谢您！/ 谢谢你！” 🙏"
        },
        "icon": "🙏"
      },
      {
        "id": "opt-k1-soc-e1-2",
        "label": {
          "th": "เดินหนีไปเงียบๆ ไม่สนใจ",
          "en": "Walk away silently without looking",
          "zh": "面无表情抓起东西扭头就跑，一言不发"
        },
        "icon": "🚶"
      },
      {
        "id": "opt-k1-soc-e1-3",
        "label": {
          "th": "แย่งมาแล้วตะโกนด่าทอ",
          "en": "Snatch roughly and scream insults",
          "zh": "一把夺过礼物并恶狠狠破口大骂"
        },
        "icon": "😡"
      }
    ],
    "correctOptionId": "opt-k1-soc-e1-1",
    "explanation": {
      "th": "การกล่าวขอบคุณแสดงถึงความกตัญญูและมารยาทอันงดงาม เก่งมากครับ!",
      "en": "Correct! Saying \"Thank you\" shows heartfelt appreciation.",
      "zh": "答对了！常说“谢谢”让彼此心里充满温暖与善意。"
    }
  },
  {
    "id": "k1-soc-e2",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "เมื่อเราเผลอเดินไปชนเพื่อนจนเพื่อนเจ็บ 🥺 คำพูดที่จริงใจที่เราควรกล่าวทันทีคือคำว่าอะไร?",
      "en": "When you accidentally bump into a classmate and hurt them 🥺, what should you say immediately?",
      "zh": "课间活动时如果不小心撞到了旁边的同学并造成对方疼痛 🥺，应当立刻真诚地说哪句话？"
    },
    "illustration": "🥺 🤝 🩹",
    "illustrationSubtitle": {
      "th": "การกล่าวคำขอโทษเมื่อทำผิดพลาด",
      "en": "Saying \"I am sorry\" sincerely",
      "zh": "知错就改礼貌用语：“对不起，请原谅”"
    },
    "options": [
      {
        "id": "opt-k1-soc-e2-1",
        "label": {
          "th": "หัวเราะเยาะใส่แล้ววิ่งหนี",
          "en": "Laugh at them and sprint away",
          "zh": "拍手狂笑大声起哄，然后撒腿逃跑"
        },
        "icon": "😆"
      },
      {
        "id": "opt-k1-soc-e2-2",
        "label": {
          "th": "กล่าวคำว่า \"ขอโทษครับ / ขอโทษค่ะ เป็นอะไรมากไหม\" 🥺 🤝",
          "en": "Say \"I am so sorry! Are you okay?\"",
          "zh": "立刻主动上前搀扶并真切道歉：“对不起！我不是故意的，你受伤了吗？” 🥺 🤝"
        },
        "icon": "🤝"
      },
      {
        "id": "opt-k1-soc-e2-3",
        "label": {
          "th": "โทษว่าเพื่อนมายืนขวางทางเอง",
          "en": "Blame them for standing there",
          "zh": "恶人先告状，怪对方长了眼睛不会躲闪"
        },
        "icon": "👉"
      }
    ],
    "correctOptionId": "opt-k1-soc-e2-2",
    "explanation": {
      "th": "การยอมรับผิดและขอโทษอย่างจริงใจเป็นคุณธรรมที่กล้าหาญและน่าชื่นชม เก่งมากครับ!",
      "en": "Awesome! Apologizing sincerely heals feelings and restores friendship.",
      "zh": "太棒了！做错事勇敢承认、真诚说“对不起”，是富有担当的高尚品质。"
    }
  },
  {
    "id": "k1-soc-e3",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "ใบหน้าที่มี \"รอยยิ้มกว้าง ดวงตาเป็นประกาย หัวเราะร่าเริง\" 😄 แสดงถึงอารมณ์ความรู้สึกใด?",
      "en": "A face with a wide beaming smile, sparkling eyes, and chuckles 😄 expresses what emotion?",
      "zh": "脸蛋上洋溢着大大的灿烂笑容、双眼弯弯如月牙、充满欢笑声 😄，代表着什么情绪？"
    },
    "illustration": "😄 ✨ 🎈",
    "illustrationSubtitle": {
      "th": "การรับรู้อารมณ์: ความสุขและความดีใจ",
      "en": "Recognizing emotions: Happiness and Joy",
      "zh": "基础情绪识别：开心与快乐"
    },
    "options": [
      {
        "id": "opt-k1-soc-e3-1",
        "label": {
          "th": "ความรู้สึกหวาดกลัวตัวสั่น",
          "en": "Terrified and trembling with fear",
          "zh": "吓得魂飞魄散、双腿发抖的恐惧"
        },
        "icon": "😨"
      },
      {
        "id": "opt-k1-soc-e3-2",
        "label": {
          "th": "ความรู้สึกโกรธแค้นเกรี้ยวกราด",
          "en": "Furious and outraged anger",
          "zh": "怒火万丈、咬牙切齿的大发雷霆"
        },
        "icon": "😡"
      },
      {
        "id": "opt-k1-soc-e3-3",
        "label": {
          "th": "ความรู้สึก \"มีความสุขและดีใจ\" 😄 💖",
          "en": "Feeling HAPPY and JOYFUL",
          "zh": "内心充满了“无比开心、快乐与喜悦” 😄 💖"
        },
        "icon": "😄"
      }
    ],
    "correctOptionId": "opt-k1-soc-e3-3",
    "explanation": {
      "th": "รอยยิ้มบ่งบอกถึงความสุขและความเบิกบานใจ แบ่งปันพลังบวกให้คนรอบข้าง เก่งมากครับ!",
      "en": "Spot on! Beaming smiles indicate happiness, joy, and friendliness.",
      "zh": "答对了！笑脸是快乐最真挚的流露，把阳光与温暖带给大家。"
    }
  },
  {
    "id": "k1-soc-e4",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "เมื่อมีของเล่นชิ้นโปรดเพียงชิ้นเดียวในห้อง และเพื่อนก็อยากเล่นด้วย 🧸 การกระทำที่น่ารักที่สุดคือข้อใด?",
      "en": "There is only one favorite toy in the classroom 🧸, and a friend wants to play. What is the kindest action?",
      "zh": "班级活动角里只有一件好玩的发光小熊玩具 🧸，旁边的同学也眼巴巴想玩，最显爱心的做法是？"
    },
    "illustration": "🧸 🤝 👫",
    "illustrationSubtitle": {
      "th": "การแบ่งปันและการผลัดกันเล่น",
      "en": "Sharing and taking turns kindly",
      "zh": "社会交往品质：懂得分享与轮流玩耍"
    },
    "options": [
      {
        "id": "opt-k1-soc-e4-1",
        "label": {
          "th": "ชวนเพื่อนมา \"ผลัดกันเล่น แบ่งปันกัน หรือเล่นด้วยกันอย่างสนุกสนาน\" 🧸 🤝",
          "en": "Invite them: \"Let's share, take turns, and play together happily!\"",
          "zh": "主动拉住朋友的手：“我们一起轮流玩，或者分工合作开心地玩吧！” 🧸 🤝"
        },
        "icon": "🤝"
      },
      {
        "id": "opt-k1-soc-e4-2",
        "label": {
          "th": "กอดของเล่นไว้แน่นไม่ยอมให้ใครจับแม้แต่น้อย",
          "en": "Clutch it greedily refusing anyone near",
          "zh": "死死抱在怀里不放，谁要是敢靠近就狠咬一口"
        },
        "icon": "🙅"
      },
      {
        "id": "opt-k1-soc-e4-3",
        "label": {
          "th": "ปาของเล่นทิ้งลงถังขยะประชดเพื่อน",
          "en": "Throw toy in trash bin in spite",
          "zh": "一气之下把玩具狠狠砸进垃圾桶同归于尽"
        },
        "icon": "🗑️"
      }
    ],
    "correctOptionId": "opt-k1-soc-e4-1",
    "explanation": {
      "th": "การแบ่งปันและการผลัดกันเล่นช่วยสร้างมิตรภาพและความสุขร่วมกัน เก่งมากครับ!",
      "en": "Correct! Sharing toys turns solitary fun into joyful communal friendship.",
      "zh": "答对了！懂得分享能收获双倍快乐，结交真诚深厚的友谊。"
    }
  },
  {
    "id": "k1-soc-e5",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "เมื่อเข้าแถวซื้อขนมหรือรอเล่นเครื่องเล่นในสนามเด็กเล่น 🛝 ระเบียบวินัยที่ดีคือข้อใด?",
      "en": "Waiting in line to buy snacks or slide down the playground slide 🛝: What is proper conduct?",
      "zh": "在小卖部排队买点心，或在操场排队等候玩大型滑梯 🛝 时，应当遵守的优秀文明规则是？"
    },
    "illustration": "🛝 🚶‍♂️ 🚶‍♀️",
    "illustrationSubtitle": {
      "th": "การเข้าแถวตามลำดับก่อนหลัง",
      "en": "Queueing politely and waiting one's turn",
      "zh": "社会公德素养：自觉排队按秩序等候"
    },
    "options": [
      {
        "id": "opt-k1-soc-e5-1",
        "label": {
          "th": "วิ่งแทรกดันเพื่อนข้างหน้าให้ล้มเพื่อแย่งคิวแรก",
          "en": "Push friends down to steal the front spot",
          "zh": "野蛮推搡前面排队的小伙伴致其跌倒，强行抢先插到最前排"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k1-soc-e5-2",
        "label": {
          "th": "เข้าแถวอย่างเป็นระเบียบตามลำดับก่อน-หลัง ไม่แซงคิวเพื่อน 🚶‍♂️ 🚶‍♀️",
          "en": "Stand neatly in queue, wait patiently, and never cut in line",
          "zh": "井然有序地排在队伍后面，耐心等待轮到自己，坚决不插队 🚶‍♂️ 🚶‍♀️"
        },
        "icon": "🚶‍♂️"
      },
      {
        "id": "opt-k1-soc-e5-3",
        "label": {
          "th": "ลงไปนอนขวางบันไดสไลเดอร์ไม่ให้ใครเล่น",
          "en": "Lie blocking stairs so no one slides",
          "zh": "直接四仰八叉横躺在滑梯梯级上阻止任何人上滑梯"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k1-soc-e5-2",
    "explanation": {
      "th": "การเข้าแถวเคารพสิทธิ์ของผู้อื่น เป็นวินัยขั้นพื้นฐานที่น่าภาคภูมิใจ เก่งมากครับ!",
      "en": "Awesome! Queueing courteously shows mutual respect and ensures fair turns.",
      "zh": "太棒了！文明排队不插队、礼让他人，是高素质文明好少年的体现。"
    }
  },
  {
    "id": "k1-soc-e6",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "เมื่อคุณครูหรือผู้ใหญ่กำลังพูดคุยหรือสอนบทเรียนอยู่หน้าห้อง 👩‍🏫 การเป็นผู้ฟังที่ดีต้องทำอย่างไร?",
      "en": "Teacher or adult is speaking or teaching in front of class 👩‍🏫. How does a GOOD LISTENER behave?",
      "zh": "当老师或长辈在讲台前绘声绘色讲课或交代重要事情 👩‍🏫 时，“优秀的倾听者”应当做到？"
    },
    "illustration": "👩‍🏫 👂 🤫",
    "illustrationSubtitle": {
      "th": "มารยาทการเป็นผู้ฟังที่ดี",
      "en": "Listening etiquette in classroom",
      "zh": "课堂礼仪：专心致志倾听不插嘴"
    },
    "options": [
      {
        "id": "opt-k1-soc-e6-1",
        "label": {
          "th": "โยนกระดาษปาใส่กระดานดำเล่น",
          "en": "Throw paper airplanes at blackboard",
          "zh": "折许多纸飞机乱砸讲台和黑板"
        },
        "icon": "✈️"
      },
      {
        "id": "opt-k1-soc-e6-2",
        "label": {
          "th": "ส่งเสียงร้องตะโกนแข่งกับคุณครู",
          "en": "Shout loudly competing with teacher",
          "zh": "扯开嗓子在台下大声怪叫与老师飙嗓门"
        },
        "icon": "📢"
      },
      {
        "id": "opt-k1-soc-e6-3",
        "label": {
          "th": "ตั้งใจฟัง ไม่พูดคุยแทรก และยกมือก่อนถามเมื่อมีข้อสงสัย 👂 🙋‍♂️",
          "en": "Listen attentively, don't interrupt, and raise hand politely to ask questions",
          "zh": "专注倾听，不交头接耳做小动作，有问题时先礼貌举手示意 👂 🙋‍♂️"
        },
        "icon": "🙋‍♂️"
      }
    ],
    "correctOptionId": "opt-k1-soc-e6-3",
    "explanation": {
      "th": "การตั้งใจฟังแสดงถึงการให้เกียรติผู้พูด และช่วยให้เราได้รับความรู้อย่างครบถ้วน เก่งมากครับ!",
      "en": "Spot on! Respectful listeners pay attention and raise hands before speaking.",
      "zh": "答对了！专心倾听是对授课老师的尊重，也能让自己高效吸取知识。"
    }
  },
  {
    "id": "k1-soc-e7",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "เมื่อเห็นเพื่อนคนหนึ่งนั่งอยู่คนเดียวเหงาๆ ไม่มีใครเล่นด้วยในสนามเด็กเล่น 🥺 สิ่งที่เด็กดีควรทำคือ?",
      "en": "A classmate is sitting all alone looking lonely on the playground bench 🥺. What should a kind child do?",
      "zh": "看到一位新转学来的小伙伴独自一人孤零零坐在操场长椅上发呆 🥺，富有同情心的小朋友会？"
    },
    "illustration": "🥺 🤝 ⚽",
    "illustrationSubtitle": {
      "th": "การโอบอ้อมอารีและการชักชวนเพื่อนเข้าร่วมกิจกรรม",
      "en": "Inclusivity: Inviting lonely friends to play",
      "zh": "关爱同伴：主动邀请落单伙伴一起玩"
    },
    "options": [
      {
        "id": "opt-k1-soc-e7-1",
        "label": {
          "th": "เดินเข้าไปทักทายด้วยรอยยิ้ม แล้วชวนว่า \"มาเล่นด้วยกันไหมจ๊ะ\" 🤝 ⚽",
          "en": "Walk up with a warm smile and ask: \"Would you like to come play with us?\"",
          "zh": "热情走上前微笑着打招呼：“你好！你想加入我们一起玩捉迷藏踢球吗？” 🤝 ⚽"
        },
        "icon": "🤝"
      },
      {
        "id": "opt-k1-soc-e7-2",
        "label": {
          "th": "ชวนเพื่อนคนอื่นมาร่วมกันชี้หน้าล้อเลียน",
          "en": "Gather others to point fingers and mock",
          "zh": "拉来一帮同学围着他指指点点、大声起哄排挤"
        },
        "icon": "👉"
      },
      {
        "id": "opt-k1-soc-e7-3",
        "label": {
          "th": "แกล้งเตะทรายใส่แล้วเดินเชิดหน้าหนี",
          "en": "Kick sand in their face and strut away",
          "zh": "一脚把操场的尘土踢到对方新衣服上，然后得意地扬长而去"
        },
        "icon": "🟤"
      }
    ],
    "correctOptionId": "opt-k1-soc-e7-1",
    "explanation": {
      "th": "การเปิดใจต้อนรับและชวนเพื่อนมาเล่นด้วยกัน ช่วยสร้างมิตรภาพและความอบอุ่นในโรงเรียน เก่งมากครับ!",
      "en": "Right! Welcoming lonely peers with open arms builds inclusive communities.",
      "zh": "答对啦！一句温暖的邀请能驱散孤独，让班集体充满友爱与温情。"
    }
  },
  {
    "id": "k1-soc-e8",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "เมื่อเรารู้สึก \"โกรธจัดจนอยากกรีดร้อง\" 😡 วิธีการควบคุมอารมณ์ที่ถูกต้องและปลอดภัยคือข้อใด?",
      "en": "Feeling SO ANGRY you want to scream 😡: What is the safest self-regulation method?",
      "zh": "当你遇到极其不如意的事情、气得小脸通红火冒三丈 😡 时，唯一正确安全的自我冷静方法是？"
    },
    "illustration": "😡 🧘 🌬️",
    "illustrationSubtitle": {
      "th": "การควบคุมอารมณ์โกรธ: นับเลขและหายใจลึกๆ",
      "en": "Anger management: Pause, breathe, count",
      "zh": "情绪自控守则：暂停深呼吸平复怒火"
    },
    "options": [
      {
        "id": "opt-k1-soc-e8-1",
        "label": {
          "th": "ใช้กำปั้นชกหน้าอกเพื่อนทันที",
          "en": "Punch friend directly in the chest",
          "zh": "二话不说挥舞铁拳狠狠砸向对方胸口"
        },
        "icon": "🥊"
      },
      {
        "id": "opt-k1-soc-e8-2",
        "label": {
          "th": "หยุดการกระทำ สูดลมหายใจเข้าลึกๆ ผ่อนลมหายใจออกช้าๆ แล้วบอกความรู้สึกด้วยคำพูดสุภาพ 🧘 🗣️",
          "en": "Pause, take slow deep breaths, count calmly, and voice feelings politely",
          "zh": "停下肢体冲突，深深吸气慢慢呼气，数数到十，用礼貌平静的语言说出诉求 🧘 🗣️"
        },
        "icon": "🧘"
      },
      {
        "id": "opt-k1-soc-e8-3",
        "label": {
          "th": "ทุ่มเก้าอี้เรียนลงกับพื้นจนพัง",
          "en": "Slam classroom chair to the ground",
          "zh": "举起木质课桌朝地面上死命摔砸"
        },
        "icon": "💥"
      }
    ],
    "correctOptionId": "opt-k1-soc-e8-2",
    "explanation": {
      "th": "การหยุดคิดและหายใจเข้าลึกๆ ช่วยลดความโกรธและป้องกันไม่ให้เกิดความรุนแรง เก่งมากครับ!",
      "en": "Awesome! Deep breathing cools heated rage and invites reasoned resolution.",
      "zh": "太棒了！做深呼吸能平息冲动的怒火，用理智和语言化解矛盾。"
    }
  },
  {
    "id": "k1-soc-e9",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "เมื่อเพื่อนในห้องทำสิ่งใดได้สำเร็จ เช่น วาดภาพสวยงาม หรือวิ่งเข้าเส้นชัย 🎨 🏆 เราควรแสดงความรู้สึกอย่างไร?",
      "en": "A friend succeeds, winning a race or finishing a lovely painting 🎨 🏆. How should we react?",
      "zh": "同桌的小伙伴在绘画比赛中荣获佳绩，或者跑步比赛冲过终点线 🎨 🏆 时，我们应当怀揣何种心态？"
    },
    "illustration": "🎨 👏 🌟",
    "illustrationSubtitle": {
      "th": "การแสดงความยินดีในความสำเร็จของผู้อื่น (Empathetic Joy)",
      "en": "Celebrating others' successes with joy",
      "zh": "欣赏与祝福他人：由衷为伙伴鼓掌喝彩"
    },
    "options": [
      {
        "id": "opt-k1-soc-e9-1",
        "label": {
          "th": "ทำหน้าบึ้งตึงแล้วบอกว่า \"ไม่เห็นเก่งเลย ใครๆ ก็ทำได้\"",
          "en": "Scowl and scoff: \"That's nothing special\"",
          "zh": "撇嘴冷哼阴阳怪气：“切！这有什么了不起的，狗都会画！”"
        },
        "icon": "😒"
      },
      {
        "id": "opt-k1-soc-e9-2",
        "label": {
          "th": "แอบฉีกผลงานของเพื่อนทิ้งเพราะอิจฉา",
          "en": "Tear their artwork secretly out of jealousy",
          "zh": "心生嫉妒，趁着旁人不注意偷偷把同桌的获奖画作撕得粉碎"
        },
        "icon": "✂️"
      },
      {
        "id": "opt-k1-soc-e9-3",
        "label": {
          "th": "ปรบมือแสดงความยินดีจากใจจริงและกล่าวชมเชยว่า \"เก่งมากเลย ยินดีด้วยนะ!\" 👏 🎉",
          "en": "Clap heartily and praise: \"Awesome job! Congratulations to you!\"",
          "zh": "发自内心地热情鼓掌喝彩，由衷夸奖赞美：“太棒了！真为你感到高兴骄傲！” 👏 🎉"
        },
        "icon": "👏"
      }
    ],
    "correctOptionId": "opt-k1-soc-e9-3",
    "explanation": {
      "th": "การชื่นชมยินดีในความสำเร็จของเพื่อน แสดงถึงจิตใจที่กว้างขวางและงดงาม เก่งมากครับ!",
      "en": "Correct! Celebrating peers' achievements fosters wholesome bonds and high self-worth.",
      "zh": "答对了！真心实意为他人的成功鼓掌喝彩，展现了豁达开朗的美好心灵。"
    }
  },
  {
    "id": "k1-soc-e10",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "ในครอบครัว การแสดงความรักและความกตัญญูต่อ \"คุณพ่อ คุณแม่ หรือคุณปู่คุณย่าคุณตาคุณยาย\" 👨‍👩‍👧 สามารถทำได้อย่างไรในชีวิตประจำวัน?",
      "en": "How can young children express daily love and gratitude toward PARENTS & GRANDPARENTS 👨‍👩‍👧?",
      "zh": "在温馨的家庭生活中，小朋友们在日常中怎样表达对爸爸妈妈、爷爷奶奶 👨‍👩‍👧 的孝顺与爱意？"
    },
    "illustration": "👨‍👩‍👧 ❤️ 🧹",
    "illustrationSubtitle": {
      "th": "ความกตัญญูและความรักในครอบครัว",
      "en": "Family love: Helping with chores and hugs",
      "zh": "感恩家庭亲情：主动做力所能及的家务"
    },
    "options": [
      {
        "id": "opt-k1-soc-e10-1",
        "label": {
          "th": "เป็นเด็กดี เชื่อฟังคำสั่งสอน ช่วยเหลืองานบ้านเล็กๆ น้อยๆ และกอดบอกรักท่านสม่ำเสมอ ❤️ 🧹",
          "en": "Be well-behaved, listen lovingly, help with small chores, and offer warm hugs",
          "zh": "听从长辈教导做懂事好孩子，主动帮忙端水扫地分担家务，给长辈温暖拥抱 ❤️ 🧹"
        },
        "icon": "❤️"
      },
      {
        "id": "opt-k1-soc-e10-2",
        "label": {
          "th": "แผลงฤทธิ์ร้องไห้ทึ้งหัวเพื่อบังคับให้ผู้ปกครองซื้อของเล่นแพงๆ ให้",
          "en": "Throw tantrum fits demanding luxury toys",
          "zh": "在超市地板上撒泼打滚要挟父母非买昂贵玩具不可"
        },
        "icon": "😭"
      },
      {
        "id": "opt-k1-soc-e10-3",
        "label": {
          "th": "หนีออกจากบ้านเมื่อไม่ได้ดั่งใจ",
          "en": "Run away from home when sulking",
          "zh": "稍微有点不顺心就背起书包离家出走"
        },
        "icon": "🏃"
      }
    ],
    "correctOptionId": "opt-k1-soc-e10-1",
    "explanation": {
      "th": "การช่วยงานบ้านและการแสดงความรักทำให้ครอบครัวอบอุ่นและมีความสุข เก่งมากครับ!",
      "en": "Spot on! Respect, filial warmth, and helpful chores nurture joyful homes.",
      "zh": "太棒了！体贴孝顺父母长辈、力所能及帮忙做家务，让家庭洋溢着幸福暖流。"
    }
  },
  {
    "id": "k1-soc-m1",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการเข้าใจตนเองและผู้อื่น อนุบาล 1 ระดับปานกลาง ชุดที่ 1: เมื่อเพื่อนกำลังร้องไห้เพราะคิดถึงคุณแม่ 🥺 สิ่งที่ควรทำเพื่อช่วยปลอบใจคืออะไร?",
      "en": "K1 Mid Socio-Emotional #1: A friend is weeping missing their mother 🥺: How can you comfort them warmly?",
      "zh": "幼儿园小班同理心素养第 1 题：初入园时同桌因为想念妈妈而伤心掉眼泪 🥺，你能为他做些什么来温暖安慰他？"
    },
    "illustration": "🥺 🧸 🤝",
    "illustrationSubtitle": {
      "th": "การปลอบใจเพื่อนและสร้างความอุ่นใจ",
      "en": "Comforting an upset friend gently",
      "zh": "同理心关怀：贴心陪伴抚慰想家伙伴"
    },
    "options": [
      {
        "id": "opt-k1-soc-m1-1",
        "label": {
          "th": "ตะโกนด่าว่าขี้แยน่ารำคาญ",
          "en": "Yell that they are a crybaby",
          "zh": "站在课桌上指着对方鼻子大吼：“你真爱哭，吵死人了！”"
        },
        "icon": "📢"
      },
      {
        "id": "opt-k1-soc-m1-2",
        "label": {
          "th": "นั่งเป็นเพื่อน ส่งของเล่นน่ารักให้ และพูดให้กำลังใจว่า \"เดี๋ยวตอนเย็นคุณแม่ก็มารับแล้วนะ\" 🧸 🤝",
          "en": "Sit beside them, offer a favorite toy, and reassure: \"Mommy will come pick you up this afternoon!\"",
          "zh": "轻柔坐在他身边，递给他喜欢的安抚玩偶，温和地安慰：“别怕，老师和我们都在，傍晚妈妈就会接你回家啦！” 🧸 🤝"
        },
        "icon": "🤝"
      },
      {
        "id": "opt-k1-soc-m1-3",
        "label": {
          "th": "แย่งกระเป๋าเพื่อนไปซ่อนในห้องน้ำ",
          "en": "Hide their backpack in bathroom",
          "zh": "趁机抢过对方的小书包藏进阴暗卫生间"
        },
        "icon": "🎒"
      }
    ],
    "correctOptionId": "opt-k1-soc-m1-2",
    "explanation": {
      "th": "คำพูดที่อ่อนโยนและความเอาใจใส่ช่วยบรรเทาความกลัวและความเหงาได้ เก่งมากครับ!",
      "en": "Correct! Gentle companionship and soothing words ease separation anxiety.",
      "zh": "答对了！温言细语的陪伴和鼓励能给予伙伴莫大的安全感与温情。"
    }
  },
  {
    "id": "k1-soc-m2",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการเข้าใจตนเองและผู้อื่น อนุบาล 1 ระดับปานกลาง ชุดที่ 2: เมื่อเพื่อนกำลังร้องไห้เพราะคิดถึงคุณแม่ 🥺 สิ่งที่ควรทำเพื่อช่วยปลอบใจคืออะไร?",
      "en": "K1 Mid Socio-Emotional #2: A friend is weeping missing their mother 🥺: How can you comfort them warmly?",
      "zh": "幼儿园小班同理心素养第 2 题：初入园时同桌因为想念妈妈而伤心掉眼泪 🥺，你能为他做些什么来温暖安慰他？"
    },
    "illustration": "🥺 🧸 🤝",
    "illustrationSubtitle": {
      "th": "การปลอบใจเพื่อนและสร้างความอุ่นใจ",
      "en": "Comforting an upset friend gently",
      "zh": "同理心关怀：贴心陪伴抚慰想家伙伴"
    },
    "options": [
      {
        "id": "opt-k1-soc-m2-1",
        "label": {
          "th": "แย่งกระเป๋าเพื่อนไปซ่อนในห้องน้ำ",
          "en": "Hide their backpack in bathroom",
          "zh": "趁机抢过对方的小书包藏进阴暗卫生间"
        },
        "icon": "🎒"
      },
      {
        "id": "opt-k1-soc-m2-2",
        "label": {
          "th": "ตะโกนด่าว่าขี้แยน่ารำคาญ",
          "en": "Yell that they are a crybaby",
          "zh": "站在课桌上指着对方鼻子大吼：“你真爱哭，吵死人了！”"
        },
        "icon": "📢"
      },
      {
        "id": "opt-k1-soc-m2-3",
        "label": {
          "th": "นั่งเป็นเพื่อน ส่งของเล่นน่ารักให้ และพูดให้กำลังใจว่า \"เดี๋ยวตอนเย็นคุณแม่ก็มารับแล้วนะ\" 🧸 🤝",
          "en": "Sit beside them, offer a favorite toy, and reassure: \"Mommy will come pick you up this afternoon!\"",
          "zh": "轻柔坐在他身边，递给他喜欢的安抚玩偶，温和地安慰：“别怕，老师和我们都在，傍晚妈妈就会接你回家啦！” 🧸 🤝"
        },
        "icon": "🤝"
      }
    ],
    "correctOptionId": "opt-k1-soc-m2-3",
    "explanation": {
      "th": "คำพูดที่อ่อนโยนและความเอาใจใส่ช่วยบรรเทาความกลัวและความเหงาได้ เก่งมากครับ!",
      "en": "Correct! Gentle companionship and soothing words ease separation anxiety.",
      "zh": "答对了！温言细语的陪伴和鼓励能给予伙伴莫大的安全感与温情。"
    }
  },
  {
    "id": "k1-soc-m3",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการเข้าใจตนเองและผู้อื่น อนุบาล 1 ระดับปานกลาง ชุดที่ 3: เมื่อเพื่อนกำลังร้องไห้เพราะคิดถึงคุณแม่ 🥺 สิ่งที่ควรทำเพื่อช่วยปลอบใจคืออะไร?",
      "en": "K1 Mid Socio-Emotional #3: A friend is weeping missing their mother 🥺: How can you comfort them warmly?",
      "zh": "幼儿园小班同理心素养第 3 题：初入园时同桌因为想念妈妈而伤心掉眼泪 🥺，你能为他做些什么来温暖安慰他？"
    },
    "illustration": "🥺 🧸 🤝",
    "illustrationSubtitle": {
      "th": "การปลอบใจเพื่อนและสร้างความอุ่นใจ",
      "en": "Comforting an upset friend gently",
      "zh": "同理心关怀：贴心陪伴抚慰想家伙伴"
    },
    "options": [
      {
        "id": "opt-k1-soc-m3-1",
        "label": {
          "th": "นั่งเป็นเพื่อน ส่งของเล่นน่ารักให้ และพูดให้กำลังใจว่า \"เดี๋ยวตอนเย็นคุณแม่ก็มารับแล้วนะ\" 🧸 🤝",
          "en": "Sit beside them, offer a favorite toy, and reassure: \"Mommy will come pick you up this afternoon!\"",
          "zh": "轻柔坐在他身边，递给他喜欢的安抚玩偶，温和地安慰：“别怕，老师和我们都在，傍晚妈妈就会接你回家啦！” 🧸 🤝"
        },
        "icon": "🤝"
      },
      {
        "id": "opt-k1-soc-m3-2",
        "label": {
          "th": "ตะโกนด่าว่าขี้แยน่ารำคาญ",
          "en": "Yell that they are a crybaby",
          "zh": "站在课桌上指着对方鼻子大吼：“你真爱哭，吵死人了！”"
        },
        "icon": "📢"
      },
      {
        "id": "opt-k1-soc-m3-3",
        "label": {
          "th": "แย่งกระเป๋าเพื่อนไปซ่อนในห้องน้ำ",
          "en": "Hide their backpack in bathroom",
          "zh": "趁机抢过对方的小书包藏进阴暗卫生间"
        },
        "icon": "🎒"
      }
    ],
    "correctOptionId": "opt-k1-soc-m3-1",
    "explanation": {
      "th": "คำพูดที่อ่อนโยนและความเอาใจใส่ช่วยบรรเทาความกลัวและความเหงาได้ เก่งมากครับ!",
      "en": "Correct! Gentle companionship and soothing words ease separation anxiety.",
      "zh": "答对了！温言细语的陪伴和鼓励能给予伙伴莫大的安全感与温情。"
    }
  },
  {
    "id": "k1-soc-m4",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการเข้าใจตนเองและผู้อื่น อนุบาล 1 ระดับปานกลาง ชุดที่ 4: เมื่อเพื่อนกำลังร้องไห้เพราะคิดถึงคุณแม่ 🥺 สิ่งที่ควรทำเพื่อช่วยปลอบใจคืออะไร?",
      "en": "K1 Mid Socio-Emotional #4: A friend is weeping missing their mother 🥺: How can you comfort them warmly?",
      "zh": "幼儿园小班同理心素养第 4 题：初入园时同桌因为想念妈妈而伤心掉眼泪 🥺，你能为他做些什么来温暖安慰他？"
    },
    "illustration": "🥺 🧸 🤝",
    "illustrationSubtitle": {
      "th": "การปลอบใจเพื่อนและสร้างความอุ่นใจ",
      "en": "Comforting an upset friend gently",
      "zh": "同理心关怀：贴心陪伴抚慰想家伙伴"
    },
    "options": [
      {
        "id": "opt-k1-soc-m4-1",
        "label": {
          "th": "ตะโกนด่าว่าขี้แยน่ารำคาญ",
          "en": "Yell that they are a crybaby",
          "zh": "站在课桌上指着对方鼻子大吼：“你真爱哭，吵死人了！”"
        },
        "icon": "📢"
      },
      {
        "id": "opt-k1-soc-m4-2",
        "label": {
          "th": "นั่งเป็นเพื่อน ส่งของเล่นน่ารักให้ และพูดให้กำลังใจว่า \"เดี๋ยวตอนเย็นคุณแม่ก็มารับแล้วนะ\" 🧸 🤝",
          "en": "Sit beside them, offer a favorite toy, and reassure: \"Mommy will come pick you up this afternoon!\"",
          "zh": "轻柔坐在他身边，递给他喜欢的安抚玩偶，温和地安慰：“别怕，老师和我们都在，傍晚妈妈就会接你回家啦！” 🧸 🤝"
        },
        "icon": "🤝"
      },
      {
        "id": "opt-k1-soc-m4-3",
        "label": {
          "th": "แย่งกระเป๋าเพื่อนไปซ่อนในห้องน้ำ",
          "en": "Hide their backpack in bathroom",
          "zh": "趁机抢过对方的小书包藏进阴暗卫生间"
        },
        "icon": "🎒"
      }
    ],
    "correctOptionId": "opt-k1-soc-m4-2",
    "explanation": {
      "th": "คำพูดที่อ่อนโยนและความเอาใจใส่ช่วยบรรเทาความกลัวและความเหงาได้ เก่งมากครับ!",
      "en": "Correct! Gentle companionship and soothing words ease separation anxiety.",
      "zh": "答对了！温言细语的陪伴和鼓励能给予伙伴莫大的安全感与温情。"
    }
  },
  {
    "id": "k1-soc-m5",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการเข้าใจตนเองและผู้อื่น อนุบาล 1 ระดับปานกลาง ชุดที่ 5: เมื่อเพื่อนกำลังร้องไห้เพราะคิดถึงคุณแม่ 🥺 สิ่งที่ควรทำเพื่อช่วยปลอบใจคืออะไร?",
      "en": "K1 Mid Socio-Emotional #5: A friend is weeping missing their mother 🥺: How can you comfort them warmly?",
      "zh": "幼儿园小班同理心素养第 5 题：初入园时同桌因为想念妈妈而伤心掉眼泪 🥺，你能为他做些什么来温暖安慰他？"
    },
    "illustration": "🥺 🧸 🤝",
    "illustrationSubtitle": {
      "th": "การปลอบใจเพื่อนและสร้างความอุ่นใจ",
      "en": "Comforting an upset friend gently",
      "zh": "同理心关怀：贴心陪伴抚慰想家伙伴"
    },
    "options": [
      {
        "id": "opt-k1-soc-m5-1",
        "label": {
          "th": "แย่งกระเป๋าเพื่อนไปซ่อนในห้องน้ำ",
          "en": "Hide their backpack in bathroom",
          "zh": "趁机抢过对方的小书包藏进阴暗卫生间"
        },
        "icon": "🎒"
      },
      {
        "id": "opt-k1-soc-m5-2",
        "label": {
          "th": "ตะโกนด่าว่าขี้แยน่ารำคาญ",
          "en": "Yell that they are a crybaby",
          "zh": "站在课桌上指着对方鼻子大吼：“你真爱哭，吵死人了！”"
        },
        "icon": "📢"
      },
      {
        "id": "opt-k1-soc-m5-3",
        "label": {
          "th": "นั่งเป็นเพื่อน ส่งของเล่นน่ารักให้ และพูดให้กำลังใจว่า \"เดี๋ยวตอนเย็นคุณแม่ก็มารับแล้วนะ\" 🧸 🤝",
          "en": "Sit beside them, offer a favorite toy, and reassure: \"Mommy will come pick you up this afternoon!\"",
          "zh": "轻柔坐在他身边，递给他喜欢的安抚玩偶，温和地安慰：“别怕，老师和我们都在，傍晚妈妈就会接你回家啦！” 🧸 🤝"
        },
        "icon": "🤝"
      }
    ],
    "correctOptionId": "opt-k1-soc-m5-3",
    "explanation": {
      "th": "คำพูดที่อ่อนโยนและความเอาใจใส่ช่วยบรรเทาความกลัวและความเหงาได้ เก่งมากครับ!",
      "en": "Correct! Gentle companionship and soothing words ease separation anxiety.",
      "zh": "答对了！温言细语的陪伴和鼓励能给予伙伴莫大的安全感与温情。"
    }
  },
  {
    "id": "k1-soc-m6",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการเข้าใจตนเองและผู้อื่น อนุบาล 1 ระดับปานกลาง ชุดที่ 6: เมื่อเพื่อนกำลังร้องไห้เพราะคิดถึงคุณแม่ 🥺 สิ่งที่ควรทำเพื่อช่วยปลอบใจคืออะไร?",
      "en": "K1 Mid Socio-Emotional #6: A friend is weeping missing their mother 🥺: How can you comfort them warmly?",
      "zh": "幼儿园小班同理心素养第 6 题：初入园时同桌因为想念妈妈而伤心掉眼泪 🥺，你能为他做些什么来温暖安慰他？"
    },
    "illustration": "🥺 🧸 🤝",
    "illustrationSubtitle": {
      "th": "การปลอบใจเพื่อนและสร้างความอุ่นใจ",
      "en": "Comforting an upset friend gently",
      "zh": "同理心关怀：贴心陪伴抚慰想家伙伴"
    },
    "options": [
      {
        "id": "opt-k1-soc-m6-1",
        "label": {
          "th": "นั่งเป็นเพื่อน ส่งของเล่นน่ารักให้ และพูดให้กำลังใจว่า \"เดี๋ยวตอนเย็นคุณแม่ก็มารับแล้วนะ\" 🧸 🤝",
          "en": "Sit beside them, offer a favorite toy, and reassure: \"Mommy will come pick you up this afternoon!\"",
          "zh": "轻柔坐在他身边，递给他喜欢的安抚玩偶，温和地安慰：“别怕，老师和我们都在，傍晚妈妈就会接你回家啦！” 🧸 🤝"
        },
        "icon": "🤝"
      },
      {
        "id": "opt-k1-soc-m6-2",
        "label": {
          "th": "ตะโกนด่าว่าขี้แยน่ารำคาญ",
          "en": "Yell that they are a crybaby",
          "zh": "站在课桌上指着对方鼻子大吼：“你真爱哭，吵死人了！”"
        },
        "icon": "📢"
      },
      {
        "id": "opt-k1-soc-m6-3",
        "label": {
          "th": "แย่งกระเป๋าเพื่อนไปซ่อนในห้องน้ำ",
          "en": "Hide their backpack in bathroom",
          "zh": "趁机抢过对方的小书包藏进阴暗卫生间"
        },
        "icon": "🎒"
      }
    ],
    "correctOptionId": "opt-k1-soc-m6-1",
    "explanation": {
      "th": "คำพูดที่อ่อนโยนและความเอาใจใส่ช่วยบรรเทาความกลัวและความเหงาได้ เก่งมากครับ!",
      "en": "Correct! Gentle companionship and soothing words ease separation anxiety.",
      "zh": "答对了！温言细语的陪伴和鼓励能给予伙伴莫大的安全感与温情。"
    }
  },
  {
    "id": "k1-soc-m7",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการเข้าใจตนเองและผู้อื่น อนุบาล 1 ระดับปานกลาง ชุดที่ 7: เมื่อเพื่อนกำลังร้องไห้เพราะคิดถึงคุณแม่ 🥺 สิ่งที่ควรทำเพื่อช่วยปลอบใจคืออะไร?",
      "en": "K1 Mid Socio-Emotional #7: A friend is weeping missing their mother 🥺: How can you comfort them warmly?",
      "zh": "幼儿园小班同理心素养第 7 题：初入园时同桌因为想念妈妈而伤心掉眼泪 🥺，你能为他做些什么来温暖安慰他？"
    },
    "illustration": "🥺 🧸 🤝",
    "illustrationSubtitle": {
      "th": "การปลอบใจเพื่อนและสร้างความอุ่นใจ",
      "en": "Comforting an upset friend gently",
      "zh": "同理心关怀：贴心陪伴抚慰想家伙伴"
    },
    "options": [
      {
        "id": "opt-k1-soc-m7-1",
        "label": {
          "th": "ตะโกนด่าว่าขี้แยน่ารำคาญ",
          "en": "Yell that they are a crybaby",
          "zh": "站在课桌上指着对方鼻子大吼：“你真爱哭，吵死人了！”"
        },
        "icon": "📢"
      },
      {
        "id": "opt-k1-soc-m7-2",
        "label": {
          "th": "นั่งเป็นเพื่อน ส่งของเล่นน่ารักให้ และพูดให้กำลังใจว่า \"เดี๋ยวตอนเย็นคุณแม่ก็มารับแล้วนะ\" 🧸 🤝",
          "en": "Sit beside them, offer a favorite toy, and reassure: \"Mommy will come pick you up this afternoon!\"",
          "zh": "轻柔坐在他身边，递给他喜欢的安抚玩偶，温和地安慰：“别怕，老师和我们都在，傍晚妈妈就会接你回家啦！” 🧸 🤝"
        },
        "icon": "🤝"
      },
      {
        "id": "opt-k1-soc-m7-3",
        "label": {
          "th": "แย่งกระเป๋าเพื่อนไปซ่อนในห้องน้ำ",
          "en": "Hide their backpack in bathroom",
          "zh": "趁机抢过对方的小书包藏进阴暗卫生间"
        },
        "icon": "🎒"
      }
    ],
    "correctOptionId": "opt-k1-soc-m7-2",
    "explanation": {
      "th": "คำพูดที่อ่อนโยนและความเอาใจใส่ช่วยบรรเทาความกลัวและความเหงาได้ เก่งมากครับ!",
      "en": "Correct! Gentle companionship and soothing words ease separation anxiety.",
      "zh": "答对了！温言细语的陪伴和鼓励能给予伙伴莫大的安全感与温情。"
    }
  },
  {
    "id": "k1-soc-m8",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการเข้าใจตนเองและผู้อื่น อนุบาล 1 ระดับปานกลาง ชุดที่ 8: เมื่อเพื่อนกำลังร้องไห้เพราะคิดถึงคุณแม่ 🥺 สิ่งที่ควรทำเพื่อช่วยปลอบใจคืออะไร?",
      "en": "K1 Mid Socio-Emotional #8: A friend is weeping missing their mother 🥺: How can you comfort them warmly?",
      "zh": "幼儿园小班同理心素养第 8 题：初入园时同桌因为想念妈妈而伤心掉眼泪 🥺，你能为他做些什么来温暖安慰他？"
    },
    "illustration": "🥺 🧸 🤝",
    "illustrationSubtitle": {
      "th": "การปลอบใจเพื่อนและสร้างความอุ่นใจ",
      "en": "Comforting an upset friend gently",
      "zh": "同理心关怀：贴心陪伴抚慰想家伙伴"
    },
    "options": [
      {
        "id": "opt-k1-soc-m8-1",
        "label": {
          "th": "แย่งกระเป๋าเพื่อนไปซ่อนในห้องน้ำ",
          "en": "Hide their backpack in bathroom",
          "zh": "趁机抢过对方的小书包藏进阴暗卫生间"
        },
        "icon": "🎒"
      },
      {
        "id": "opt-k1-soc-m8-2",
        "label": {
          "th": "ตะโกนด่าว่าขี้แยน่ารำคาญ",
          "en": "Yell that they are a crybaby",
          "zh": "站在课桌上指着对方鼻子大吼：“你真爱哭，吵死人了！”"
        },
        "icon": "📢"
      },
      {
        "id": "opt-k1-soc-m8-3",
        "label": {
          "th": "นั่งเป็นเพื่อน ส่งของเล่นน่ารักให้ และพูดให้กำลังใจว่า \"เดี๋ยวตอนเย็นคุณแม่ก็มารับแล้วนะ\" 🧸 🤝",
          "en": "Sit beside them, offer a favorite toy, and reassure: \"Mommy will come pick you up this afternoon!\"",
          "zh": "轻柔坐在他身边，递给他喜欢的安抚玩偶，温和地安慰：“别怕，老师和我们都在，傍晚妈妈就会接你回家啦！” 🧸 🤝"
        },
        "icon": "🤝"
      }
    ],
    "correctOptionId": "opt-k1-soc-m8-3",
    "explanation": {
      "th": "คำพูดที่อ่อนโยนและความเอาใจใส่ช่วยบรรเทาความกลัวและความเหงาได้ เก่งมากครับ!",
      "en": "Correct! Gentle companionship and soothing words ease separation anxiety.",
      "zh": "答对了！温言细语的陪伴和鼓励能给予伙伴莫大的安全感与温情。"
    }
  },
  {
    "id": "k1-soc-m9",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการเข้าใจตนเองและผู้อื่น อนุบาล 1 ระดับปานกลาง ชุดที่ 9: เมื่อเพื่อนกำลังร้องไห้เพราะคิดถึงคุณแม่ 🥺 สิ่งที่ควรทำเพื่อช่วยปลอบใจคืออะไร?",
      "en": "K1 Mid Socio-Emotional #9: A friend is weeping missing their mother 🥺: How can you comfort them warmly?",
      "zh": "幼儿园小班同理心素养第 9 题：初入园时同桌因为想念妈妈而伤心掉眼泪 🥺，你能为他做些什么来温暖安慰他？"
    },
    "illustration": "🥺 🧸 🤝",
    "illustrationSubtitle": {
      "th": "การปลอบใจเพื่อนและสร้างความอุ่นใจ",
      "en": "Comforting an upset friend gently",
      "zh": "同理心关怀：贴心陪伴抚慰想家伙伴"
    },
    "options": [
      {
        "id": "opt-k1-soc-m9-1",
        "label": {
          "th": "นั่งเป็นเพื่อน ส่งของเล่นน่ารักให้ และพูดให้กำลังใจว่า \"เดี๋ยวตอนเย็นคุณแม่ก็มารับแล้วนะ\" 🧸 🤝",
          "en": "Sit beside them, offer a favorite toy, and reassure: \"Mommy will come pick you up this afternoon!\"",
          "zh": "轻柔坐在他身边，递给他喜欢的安抚玩偶，温和地安慰：“别怕，老师和我们都在，傍晚妈妈就会接你回家啦！” 🧸 🤝"
        },
        "icon": "🤝"
      },
      {
        "id": "opt-k1-soc-m9-2",
        "label": {
          "th": "ตะโกนด่าว่าขี้แยน่ารำคาญ",
          "en": "Yell that they are a crybaby",
          "zh": "站在课桌上指着对方鼻子大吼：“你真爱哭，吵死人了！”"
        },
        "icon": "📢"
      },
      {
        "id": "opt-k1-soc-m9-3",
        "label": {
          "th": "แย่งกระเป๋าเพื่อนไปซ่อนในห้องน้ำ",
          "en": "Hide their backpack in bathroom",
          "zh": "趁机抢过对方的小书包藏进阴暗卫生间"
        },
        "icon": "🎒"
      }
    ],
    "correctOptionId": "opt-k1-soc-m9-1",
    "explanation": {
      "th": "คำพูดที่อ่อนโยนและความเอาใจใส่ช่วยบรรเทาความกลัวและความเหงาได้ เก่งมากครับ!",
      "en": "Correct! Gentle companionship and soothing words ease separation anxiety.",
      "zh": "答对了！温言细语的陪伴和鼓励能给予伙伴莫大的安全感与温情。"
    }
  },
  {
    "id": "k1-soc-m10",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการเข้าใจตนเองและผู้อื่น อนุบาล 1 ระดับปานกลาง ชุดที่ 10: เมื่อเพื่อนกำลังร้องไห้เพราะคิดถึงคุณแม่ 🥺 สิ่งที่ควรทำเพื่อช่วยปลอบใจคืออะไร?",
      "en": "K1 Mid Socio-Emotional #10: A friend is weeping missing their mother 🥺: How can you comfort them warmly?",
      "zh": "幼儿园小班同理心素养第 10 题：初入园时同桌因为想念妈妈而伤心掉眼泪 🥺，你能为他做些什么来温暖安慰他？"
    },
    "illustration": "🥺 🧸 🤝",
    "illustrationSubtitle": {
      "th": "การปลอบใจเพื่อนและสร้างความอุ่นใจ",
      "en": "Comforting an upset friend gently",
      "zh": "同理心关怀：贴心陪伴抚慰想家伙伴"
    },
    "options": [
      {
        "id": "opt-k1-soc-m10-1",
        "label": {
          "th": "ตะโกนด่าว่าขี้แยน่ารำคาญ",
          "en": "Yell that they are a crybaby",
          "zh": "站在课桌上指着对方鼻子大吼：“你真爱哭，吵死人了！”"
        },
        "icon": "📢"
      },
      {
        "id": "opt-k1-soc-m10-2",
        "label": {
          "th": "นั่งเป็นเพื่อน ส่งของเล่นน่ารักให้ และพูดให้กำลังใจว่า \"เดี๋ยวตอนเย็นคุณแม่ก็มารับแล้วนะ\" 🧸 🤝",
          "en": "Sit beside them, offer a favorite toy, and reassure: \"Mommy will come pick you up this afternoon!\"",
          "zh": "轻柔坐在他身边，递给他喜欢的安抚玩偶，温和地安慰：“别怕，老师和我们都在，傍晚妈妈就会接你回家啦！” 🧸 🤝"
        },
        "icon": "🤝"
      },
      {
        "id": "opt-k1-soc-m10-3",
        "label": {
          "th": "แย่งกระเป๋าเพื่อนไปซ่อนในห้องน้ำ",
          "en": "Hide their backpack in bathroom",
          "zh": "趁机抢过对方的小书包藏进阴暗卫生间"
        },
        "icon": "🎒"
      }
    ],
    "correctOptionId": "opt-k1-soc-m10-2",
    "explanation": {
      "th": "คำพูดที่อ่อนโยนและความเอาใจใส่ช่วยบรรเทาความกลัวและความเหงาได้ เก่งมากครับ!",
      "en": "Correct! Gentle companionship and soothing words ease separation anxiety.",
      "zh": "答对了！温言细语的陪伴和鼓励能给予伙伴莫大的安全感与温情。"
    }
  },
  {
    "id": "k1-soc-h1",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "ทักษะการแก้ไขความขัดแย้ง อนุบาล 1 ระดับท้าทาย ชุดที่ 1: เมื่อเกิดการแย่งกันเล่นชิงช้าในสนามเด็กเล่น 🎠 วิธีตัดสินปัญหาที่ยุติธรรมและเป็นมิตรที่สุดคือข้อใด?",
      "en": "K1 High Conflict Resolution #1: Disputing over who swings next on the playground swing 🎠: What is the fairest method?",
      "zh": "幼儿园小班冲突协商第 1 题：两个人同时都想坐操场上唯一一把秋千荡高高 🎠，最公平合理、不动干戈的协商方案是？"
    },
    "illustration": "🎠 ✊ ✌️ 🖐️",
    "illustrationSubtitle": {
      "th": "การเป่ายิ้งฉุบและการกำหนดเวลาผลัดกันเล่น",
      "en": "Rock-Paper-Scissors and setting a fair timer",
      "zh": "公平协商机制：猜拳决定先后顺序与定时轮换"
    },
    "options": [
      {
        "id": "opt-k1-soc-h1-1",
        "label": {
          "th": "วิ่งไปฟ้องคุณครูโดยแต่งเรื่องโกหกว่าเพื่อนขโมยของ",
          "en": "Fabricate lies to teacher that friend stole",
          "zh": "跑去向老师告假状、恶毒栽赃陷害同伴偷东西"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k1-soc-h1-2",
        "label": {
          "th": "ดึงผมกระชากตัวเพื่อนให้ตกลงมาจากชิงช้า",
          "en": "Yank friend's hair pulling them off swing",
          "zh": "猛抓同伴的头发把对方从快速荡漾的秋千座板上重重拽翻在地"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k1-soc-h1-3",
        "label": {
          "th": "ตกลงกันด้วยการเป่ายิ้งฉุบอย่างเป็นมิตร ผู้ชนะเล่นก่อน 10 ครั้งแล้วสลับให้อีกคนเล่นต่ออย่างเท่าเทียม ✊ ✌️ 🖐️ 🎠",
          "en": "Play a friendly Rock-Paper-Scissors: Winner swings 10 times, then swap fairly",
          "zh": "大家友好地通过“剪刀石头布”决定先后顺序，赢的先荡十下，然后自觉换另一人荡十下 ✊ ✌️ 🖐️ 🎠"
        },
        "icon": "🎠"
      }
    ],
    "correctOptionId": "opt-k1-soc-h1-3",
    "explanation": {
      "th": "การตกลงกติการ่วมกันอย่างสันติทำให้ทุกคนได้เล่นอย่างมีความสุขและไม่มีใครเจ็บตัว เก่งมากครับ!",
      "en": "Awesome! Rock-paper-scissors and structured time-swapping build civic diplomacy early.",
      "zh": "太棒了！遵守公认的协商规则轮流游玩，既公平又维护了珍贵的同伴情谊。"
    }
  },
  {
    "id": "k1-soc-h2",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "ทักษะการแก้ไขความขัดแย้ง อนุบาล 1 ระดับท้าทาย ชุดที่ 2: เมื่อเกิดการแย่งกันเล่นชิงช้าในสนามเด็กเล่น 🎠 วิธีตัดสินปัญหาที่ยุติธรรมและเป็นมิตรที่สุดคือข้อใด?",
      "en": "K1 High Conflict Resolution #2: Disputing over who swings next on the playground swing 🎠: What is the fairest method?",
      "zh": "幼儿园小班冲突协商第 2 题：两个人同时都想坐操场上唯一一把秋千荡高高 🎠，最公平合理、不动干戈的协商方案是？"
    },
    "illustration": "🎠 ✊ ✌️ 🖐️",
    "illustrationSubtitle": {
      "th": "การเป่ายิ้งฉุบและการกำหนดเวลาผลัดกันเล่น",
      "en": "Rock-Paper-Scissors and setting a fair timer",
      "zh": "公平协商机制：猜拳决定先后顺序与定时轮换"
    },
    "options": [
      {
        "id": "opt-k1-soc-h2-1",
        "label": {
          "th": "ตกลงกันด้วยการเป่ายิ้งฉุบอย่างเป็นมิตร ผู้ชนะเล่นก่อน 10 ครั้งแล้วสลับให้อีกคนเล่นต่ออย่างเท่าเทียม ✊ ✌️ 🖐️ 🎠",
          "en": "Play a friendly Rock-Paper-Scissors: Winner swings 10 times, then swap fairly",
          "zh": "大家友好地通过“剪刀石头布”决定先后顺序，赢的先荡十下，然后自觉换另一人荡十下 ✊ ✌️ 🖐️ 🎠"
        },
        "icon": "🎠"
      },
      {
        "id": "opt-k1-soc-h2-2",
        "label": {
          "th": "ดึงผมกระชากตัวเพื่อนให้ตกลงมาจากชิงช้า",
          "en": "Yank friend's hair pulling them off swing",
          "zh": "猛抓同伴的头发把对方从快速荡漾的秋千座板上重重拽翻在地"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k1-soc-h2-3",
        "label": {
          "th": "วิ่งไปฟ้องคุณครูโดยแต่งเรื่องโกหกว่าเพื่อนขโมยของ",
          "en": "Fabricate lies to teacher that friend stole",
          "zh": "跑去向老师告假状、恶毒栽赃陷害同伴偷东西"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k1-soc-h2-1",
    "explanation": {
      "th": "การตกลงกติการ่วมกันอย่างสันติทำให้ทุกคนได้เล่นอย่างมีความสุขและไม่มีใครเจ็บตัว เก่งมากครับ!",
      "en": "Awesome! Rock-paper-scissors and structured time-swapping build civic diplomacy early.",
      "zh": "太棒了！遵守公认的协商规则轮流游玩，既公平又维护了珍贵的同伴情谊。"
    }
  },
  {
    "id": "k1-soc-h3",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "ทักษะการแก้ไขความขัดแย้ง อนุบาล 1 ระดับท้าทาย ชุดที่ 3: เมื่อเกิดการแย่งกันเล่นชิงช้าในสนามเด็กเล่น 🎠 วิธีตัดสินปัญหาที่ยุติธรรมและเป็นมิตรที่สุดคือข้อใด?",
      "en": "K1 High Conflict Resolution #3: Disputing over who swings next on the playground swing 🎠: What is the fairest method?",
      "zh": "幼儿园小班冲突协商第 3 题：两个人同时都想坐操场上唯一一把秋千荡高高 🎠，最公平合理、不动干戈的协商方案是？"
    },
    "illustration": "🎠 ✊ ✌️ 🖐️",
    "illustrationSubtitle": {
      "th": "การเป่ายิ้งฉุบและการกำหนดเวลาผลัดกันเล่น",
      "en": "Rock-Paper-Scissors and setting a fair timer",
      "zh": "公平协商机制：猜拳决定先后顺序与定时轮换"
    },
    "options": [
      {
        "id": "opt-k1-soc-h3-1",
        "label": {
          "th": "ดึงผมกระชากตัวเพื่อนให้ตกลงมาจากชิงช้า",
          "en": "Yank friend's hair pulling them off swing",
          "zh": "猛抓同伴的头发把对方从快速荡漾的秋千座板上重重拽翻在地"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k1-soc-h3-2",
        "label": {
          "th": "ตกลงกันด้วยการเป่ายิ้งฉุบอย่างเป็นมิตร ผู้ชนะเล่นก่อน 10 ครั้งแล้วสลับให้อีกคนเล่นต่ออย่างเท่าเทียม ✊ ✌️ 🖐️ 🎠",
          "en": "Play a friendly Rock-Paper-Scissors: Winner swings 10 times, then swap fairly",
          "zh": "大家友好地通过“剪刀石头布”决定先后顺序，赢的先荡十下，然后自觉换另一人荡十下 ✊ ✌️ 🖐️ 🎠"
        },
        "icon": "🎠"
      },
      {
        "id": "opt-k1-soc-h3-3",
        "label": {
          "th": "วิ่งไปฟ้องคุณครูโดยแต่งเรื่องโกหกว่าเพื่อนขโมยของ",
          "en": "Fabricate lies to teacher that friend stole",
          "zh": "跑去向老师告假状、恶毒栽赃陷害同伴偷东西"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k1-soc-h3-2",
    "explanation": {
      "th": "การตกลงกติการ่วมกันอย่างสันติทำให้ทุกคนได้เล่นอย่างมีความสุขและไม่มีใครเจ็บตัว เก่งมากครับ!",
      "en": "Awesome! Rock-paper-scissors and structured time-swapping build civic diplomacy early.",
      "zh": "太棒了！遵守公认的协商规则轮流游玩，既公平又维护了珍贵的同伴情谊。"
    }
  },
  {
    "id": "k1-soc-h4",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "ทักษะการแก้ไขความขัดแย้ง อนุบาล 1 ระดับท้าทาย ชุดที่ 4: เมื่อเกิดการแย่งกันเล่นชิงช้าในสนามเด็กเล่น 🎠 วิธีตัดสินปัญหาที่ยุติธรรมและเป็นมิตรที่สุดคือข้อใด?",
      "en": "K1 High Conflict Resolution #4: Disputing over who swings next on the playground swing 🎠: What is the fairest method?",
      "zh": "幼儿园小班冲突协商第 4 题：两个人同时都想坐操场上唯一一把秋千荡高高 🎠，最公平合理、不动干戈的协商方案是？"
    },
    "illustration": "🎠 ✊ ✌️ 🖐️",
    "illustrationSubtitle": {
      "th": "การเป่ายิ้งฉุบและการกำหนดเวลาผลัดกันเล่น",
      "en": "Rock-Paper-Scissors and setting a fair timer",
      "zh": "公平协商机制：猜拳决定先后顺序与定时轮换"
    },
    "options": [
      {
        "id": "opt-k1-soc-h4-1",
        "label": {
          "th": "วิ่งไปฟ้องคุณครูโดยแต่งเรื่องโกหกว่าเพื่อนขโมยของ",
          "en": "Fabricate lies to teacher that friend stole",
          "zh": "跑去向老师告假状、恶毒栽赃陷害同伴偷东西"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k1-soc-h4-2",
        "label": {
          "th": "ดึงผมกระชากตัวเพื่อนให้ตกลงมาจากชิงช้า",
          "en": "Yank friend's hair pulling them off swing",
          "zh": "猛抓同伴的头发把对方从快速荡漾的秋千座板上重重拽翻在地"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k1-soc-h4-3",
        "label": {
          "th": "ตกลงกันด้วยการเป่ายิ้งฉุบอย่างเป็นมิตร ผู้ชนะเล่นก่อน 10 ครั้งแล้วสลับให้อีกคนเล่นต่ออย่างเท่าเทียม ✊ ✌️ 🖐️ 🎠",
          "en": "Play a friendly Rock-Paper-Scissors: Winner swings 10 times, then swap fairly",
          "zh": "大家友好地通过“剪刀石头布”决定先后顺序，赢的先荡十下，然后自觉换另一人荡十下 ✊ ✌️ 🖐️ 🎠"
        },
        "icon": "🎠"
      }
    ],
    "correctOptionId": "opt-k1-soc-h4-3",
    "explanation": {
      "th": "การตกลงกติการ่วมกันอย่างสันติทำให้ทุกคนได้เล่นอย่างมีความสุขและไม่มีใครเจ็บตัว เก่งมากครับ!",
      "en": "Awesome! Rock-paper-scissors and structured time-swapping build civic diplomacy early.",
      "zh": "太棒了！遵守公认的协商规则轮流游玩，既公平又维护了珍贵的同伴情谊。"
    }
  },
  {
    "id": "k1-soc-h5",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "ทักษะการแก้ไขความขัดแย้ง อนุบาล 1 ระดับท้าทาย ชุดที่ 5: เมื่อเกิดการแย่งกันเล่นชิงช้าในสนามเด็กเล่น 🎠 วิธีตัดสินปัญหาที่ยุติธรรมและเป็นมิตรที่สุดคือข้อใด?",
      "en": "K1 High Conflict Resolution #5: Disputing over who swings next on the playground swing 🎠: What is the fairest method?",
      "zh": "幼儿园小班冲突协商第 5 题：两个人同时都想坐操场上唯一一把秋千荡高高 🎠，最公平合理、不动干戈的协商方案是？"
    },
    "illustration": "🎠 ✊ ✌️ 🖐️",
    "illustrationSubtitle": {
      "th": "การเป่ายิ้งฉุบและการกำหนดเวลาผลัดกันเล่น",
      "en": "Rock-Paper-Scissors and setting a fair timer",
      "zh": "公平协商机制：猜拳决定先后顺序与定时轮换"
    },
    "options": [
      {
        "id": "opt-k1-soc-h5-1",
        "label": {
          "th": "ตกลงกันด้วยการเป่ายิ้งฉุบอย่างเป็นมิตร ผู้ชนะเล่นก่อน 10 ครั้งแล้วสลับให้อีกคนเล่นต่ออย่างเท่าเทียม ✊ ✌️ 🖐️ 🎠",
          "en": "Play a friendly Rock-Paper-Scissors: Winner swings 10 times, then swap fairly",
          "zh": "大家友好地通过“剪刀石头布”决定先后顺序，赢的先荡十下，然后自觉换另一人荡十下 ✊ ✌️ 🖐️ 🎠"
        },
        "icon": "🎠"
      },
      {
        "id": "opt-k1-soc-h5-2",
        "label": {
          "th": "ดึงผมกระชากตัวเพื่อนให้ตกลงมาจากชิงช้า",
          "en": "Yank friend's hair pulling them off swing",
          "zh": "猛抓同伴的头发把对方从快速荡漾的秋千座板上重重拽翻在地"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k1-soc-h5-3",
        "label": {
          "th": "วิ่งไปฟ้องคุณครูโดยแต่งเรื่องโกหกว่าเพื่อนขโมยของ",
          "en": "Fabricate lies to teacher that friend stole",
          "zh": "跑去向老师告假状、恶毒栽赃陷害同伴偷东西"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k1-soc-h5-1",
    "explanation": {
      "th": "การตกลงกติการ่วมกันอย่างสันติทำให้ทุกคนได้เล่นอย่างมีความสุขและไม่มีใครเจ็บตัว เก่งมากครับ!",
      "en": "Awesome! Rock-paper-scissors and structured time-swapping build civic diplomacy early.",
      "zh": "太棒了！遵守公认的协商规则轮流游玩，既公平又维护了珍贵的同伴情谊。"
    }
  },
  {
    "id": "k1-soc-h6",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "ทักษะการแก้ไขความขัดแย้ง อนุบาล 1 ระดับท้าทาย ชุดที่ 6: เมื่อเกิดการแย่งกันเล่นชิงช้าในสนามเด็กเล่น 🎠 วิธีตัดสินปัญหาที่ยุติธรรมและเป็นมิตรที่สุดคือข้อใด?",
      "en": "K1 High Conflict Resolution #6: Disputing over who swings next on the playground swing 🎠: What is the fairest method?",
      "zh": "幼儿园小班冲突协商第 6 题：两个人同时都想坐操场上唯一一把秋千荡高高 🎠，最公平合理、不动干戈的协商方案是？"
    },
    "illustration": "🎠 ✊ ✌️ 🖐️",
    "illustrationSubtitle": {
      "th": "การเป่ายิ้งฉุบและการกำหนดเวลาผลัดกันเล่น",
      "en": "Rock-Paper-Scissors and setting a fair timer",
      "zh": "公平协商机制：猜拳决定先后顺序与定时轮换"
    },
    "options": [
      {
        "id": "opt-k1-soc-h6-1",
        "label": {
          "th": "ดึงผมกระชากตัวเพื่อนให้ตกลงมาจากชิงช้า",
          "en": "Yank friend's hair pulling them off swing",
          "zh": "猛抓同伴的头发把对方从快速荡漾的秋千座板上重重拽翻在地"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k1-soc-h6-2",
        "label": {
          "th": "ตกลงกันด้วยการเป่ายิ้งฉุบอย่างเป็นมิตร ผู้ชนะเล่นก่อน 10 ครั้งแล้วสลับให้อีกคนเล่นต่ออย่างเท่าเทียม ✊ ✌️ 🖐️ 🎠",
          "en": "Play a friendly Rock-Paper-Scissors: Winner swings 10 times, then swap fairly",
          "zh": "大家友好地通过“剪刀石头布”决定先后顺序，赢的先荡十下，然后自觉换另一人荡十下 ✊ ✌️ 🖐️ 🎠"
        },
        "icon": "🎠"
      },
      {
        "id": "opt-k1-soc-h6-3",
        "label": {
          "th": "วิ่งไปฟ้องคุณครูโดยแต่งเรื่องโกหกว่าเพื่อนขโมยของ",
          "en": "Fabricate lies to teacher that friend stole",
          "zh": "跑去向老师告假状、恶毒栽赃陷害同伴偷东西"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k1-soc-h6-2",
    "explanation": {
      "th": "การตกลงกติการ่วมกันอย่างสันติทำให้ทุกคนได้เล่นอย่างมีความสุขและไม่มีใครเจ็บตัว เก่งมากครับ!",
      "en": "Awesome! Rock-paper-scissors and structured time-swapping build civic diplomacy early.",
      "zh": "太棒了！遵守公认的协商规则轮流游玩，既公平又维护了珍贵的同伴情谊。"
    }
  },
  {
    "id": "k1-soc-h7",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "ทักษะการแก้ไขความขัดแย้ง อนุบาล 1 ระดับท้าทาย ชุดที่ 7: เมื่อเกิดการแย่งกันเล่นชิงช้าในสนามเด็กเล่น 🎠 วิธีตัดสินปัญหาที่ยุติธรรมและเป็นมิตรที่สุดคือข้อใด?",
      "en": "K1 High Conflict Resolution #7: Disputing over who swings next on the playground swing 🎠: What is the fairest method?",
      "zh": "幼儿园小班冲突协商第 7 题：两个人同时都想坐操场上唯一一把秋千荡高高 🎠，最公平合理、不动干戈的协商方案是？"
    },
    "illustration": "🎠 ✊ ✌️ 🖐️",
    "illustrationSubtitle": {
      "th": "การเป่ายิ้งฉุบและการกำหนดเวลาผลัดกันเล่น",
      "en": "Rock-Paper-Scissors and setting a fair timer",
      "zh": "公平协商机制：猜拳决定先后顺序与定时轮换"
    },
    "options": [
      {
        "id": "opt-k1-soc-h7-1",
        "label": {
          "th": "วิ่งไปฟ้องคุณครูโดยแต่งเรื่องโกหกว่าเพื่อนขโมยของ",
          "en": "Fabricate lies to teacher that friend stole",
          "zh": "跑去向老师告假状、恶毒栽赃陷害同伴偷东西"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k1-soc-h7-2",
        "label": {
          "th": "ดึงผมกระชากตัวเพื่อนให้ตกลงมาจากชิงช้า",
          "en": "Yank friend's hair pulling them off swing",
          "zh": "猛抓同伴的头发把对方从快速荡漾的秋千座板上重重拽翻在地"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k1-soc-h7-3",
        "label": {
          "th": "ตกลงกันด้วยการเป่ายิ้งฉุบอย่างเป็นมิตร ผู้ชนะเล่นก่อน 10 ครั้งแล้วสลับให้อีกคนเล่นต่ออย่างเท่าเทียม ✊ ✌️ 🖐️ 🎠",
          "en": "Play a friendly Rock-Paper-Scissors: Winner swings 10 times, then swap fairly",
          "zh": "大家友好地通过“剪刀石头布”决定先后顺序，赢的先荡十下，然后自觉换另一人荡十下 ✊ ✌️ 🖐️ 🎠"
        },
        "icon": "🎠"
      }
    ],
    "correctOptionId": "opt-k1-soc-h7-3",
    "explanation": {
      "th": "การตกลงกติการ่วมกันอย่างสันติทำให้ทุกคนได้เล่นอย่างมีความสุขและไม่มีใครเจ็บตัว เก่งมากครับ!",
      "en": "Awesome! Rock-paper-scissors and structured time-swapping build civic diplomacy early.",
      "zh": "太棒了！遵守公认的协商规则轮流游玩，既公平又维护了珍贵的同伴情谊。"
    }
  },
  {
    "id": "k1-soc-h8",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "ทักษะการแก้ไขความขัดแย้ง อนุบาล 1 ระดับท้าทาย ชุดที่ 8: เมื่อเกิดการแย่งกันเล่นชิงช้าในสนามเด็กเล่น 🎠 วิธีตัดสินปัญหาที่ยุติธรรมและเป็นมิตรที่สุดคือข้อใด?",
      "en": "K1 High Conflict Resolution #8: Disputing over who swings next on the playground swing 🎠: What is the fairest method?",
      "zh": "幼儿园小班冲突协商第 8 题：两个人同时都想坐操场上唯一一把秋千荡高高 🎠，最公平合理、不动干戈的协商方案是？"
    },
    "illustration": "🎠 ✊ ✌️ 🖐️",
    "illustrationSubtitle": {
      "th": "การเป่ายิ้งฉุบและการกำหนดเวลาผลัดกันเล่น",
      "en": "Rock-Paper-Scissors and setting a fair timer",
      "zh": "公平协商机制：猜拳决定先后顺序与定时轮换"
    },
    "options": [
      {
        "id": "opt-k1-soc-h8-1",
        "label": {
          "th": "ตกลงกันด้วยการเป่ายิ้งฉุบอย่างเป็นมิตร ผู้ชนะเล่นก่อน 10 ครั้งแล้วสลับให้อีกคนเล่นต่ออย่างเท่าเทียม ✊ ✌️ 🖐️ 🎠",
          "en": "Play a friendly Rock-Paper-Scissors: Winner swings 10 times, then swap fairly",
          "zh": "大家友好地通过“剪刀石头布”决定先后顺序，赢的先荡十下，然后自觉换另一人荡十下 ✊ ✌️ 🖐️ 🎠"
        },
        "icon": "🎠"
      },
      {
        "id": "opt-k1-soc-h8-2",
        "label": {
          "th": "ดึงผมกระชากตัวเพื่อนให้ตกลงมาจากชิงช้า",
          "en": "Yank friend's hair pulling them off swing",
          "zh": "猛抓同伴的头发把对方从快速荡漾的秋千座板上重重拽翻在地"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k1-soc-h8-3",
        "label": {
          "th": "วิ่งไปฟ้องคุณครูโดยแต่งเรื่องโกหกว่าเพื่อนขโมยของ",
          "en": "Fabricate lies to teacher that friend stole",
          "zh": "跑去向老师告假状、恶毒栽赃陷害同伴偷东西"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k1-soc-h8-1",
    "explanation": {
      "th": "การตกลงกติการ่วมกันอย่างสันติทำให้ทุกคนได้เล่นอย่างมีความสุขและไม่มีใครเจ็บตัว เก่งมากครับ!",
      "en": "Awesome! Rock-paper-scissors and structured time-swapping build civic diplomacy early.",
      "zh": "太棒了！遵守公认的协商规则轮流游玩，既公平又维护了珍贵的同伴情谊。"
    }
  },
  {
    "id": "k1-soc-h9",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "ทักษะการแก้ไขความขัดแย้ง อนุบาล 1 ระดับท้าทาย ชุดที่ 9: เมื่อเกิดการแย่งกันเล่นชิงช้าในสนามเด็กเล่น 🎠 วิธีตัดสินปัญหาที่ยุติธรรมและเป็นมิตรที่สุดคือข้อใด?",
      "en": "K1 High Conflict Resolution #9: Disputing over who swings next on the playground swing 🎠: What is the fairest method?",
      "zh": "幼儿园小班冲突协商第 9 题：两个人同时都想坐操场上唯一一把秋千荡高高 🎠，最公平合理、不动干戈的协商方案是？"
    },
    "illustration": "🎠 ✊ ✌️ 🖐️",
    "illustrationSubtitle": {
      "th": "การเป่ายิ้งฉุบและการกำหนดเวลาผลัดกันเล่น",
      "en": "Rock-Paper-Scissors and setting a fair timer",
      "zh": "公平协商机制：猜拳决定先后顺序与定时轮换"
    },
    "options": [
      {
        "id": "opt-k1-soc-h9-1",
        "label": {
          "th": "ดึงผมกระชากตัวเพื่อนให้ตกลงมาจากชิงช้า",
          "en": "Yank friend's hair pulling them off swing",
          "zh": "猛抓同伴的头发把对方从快速荡漾的秋千座板上重重拽翻在地"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k1-soc-h9-2",
        "label": {
          "th": "ตกลงกันด้วยการเป่ายิ้งฉุบอย่างเป็นมิตร ผู้ชนะเล่นก่อน 10 ครั้งแล้วสลับให้อีกคนเล่นต่ออย่างเท่าเทียม ✊ ✌️ 🖐️ 🎠",
          "en": "Play a friendly Rock-Paper-Scissors: Winner swings 10 times, then swap fairly",
          "zh": "大家友好地通过“剪刀石头布”决定先后顺序，赢的先荡十下，然后自觉换另一人荡十下 ✊ ✌️ 🖐️ 🎠"
        },
        "icon": "🎠"
      },
      {
        "id": "opt-k1-soc-h9-3",
        "label": {
          "th": "วิ่งไปฟ้องคุณครูโดยแต่งเรื่องโกหกว่าเพื่อนขโมยของ",
          "en": "Fabricate lies to teacher that friend stole",
          "zh": "跑去向老师告假状、恶毒栽赃陷害同伴偷东西"
        },
        "icon": "❌"
      }
    ],
    "correctOptionId": "opt-k1-soc-h9-2",
    "explanation": {
      "th": "การตกลงกติการ่วมกันอย่างสันติทำให้ทุกคนได้เล่นอย่างมีความสุขและไม่มีใครเจ็บตัว เก่งมากครับ!",
      "en": "Awesome! Rock-paper-scissors and structured time-swapping build civic diplomacy early.",
      "zh": "太棒了！遵守公认的协商规则轮流游玩，既公平又维护了珍贵的同伴情谊。"
    }
  },
  {
    "id": "k1-soc-h10",
    "grade": "K1",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "ทักษะการแก้ไขความขัดแย้ง อนุบาล 1 ระดับท้าทาย ชุดที่ 10: เมื่อเกิดการแย่งกันเล่นชิงช้าในสนามเด็กเล่น 🎠 วิธีตัดสินปัญหาที่ยุติธรรมและเป็นมิตรที่สุดคือข้อใด?",
      "en": "K1 High Conflict Resolution #10: Disputing over who swings next on the playground swing 🎠: What is the fairest method?",
      "zh": "幼儿园小班冲突协商第 10 题：两个人同时都想坐操场上唯一一把秋千荡高高 🎠，最公平合理、不动干戈的协商方案是？"
    },
    "illustration": "🎠 ✊ ✌️ 🖐️",
    "illustrationSubtitle": {
      "th": "การเป่ายิ้งฉุบและการกำหนดเวลาผลัดกันเล่น",
      "en": "Rock-Paper-Scissors and setting a fair timer",
      "zh": "公平协商机制：猜拳决定先后顺序与定时轮换"
    },
    "options": [
      {
        "id": "opt-k1-soc-h10-1",
        "label": {
          "th": "วิ่งไปฟ้องคุณครูโดยแต่งเรื่องโกหกว่าเพื่อนขโมยของ",
          "en": "Fabricate lies to teacher that friend stole",
          "zh": "跑去向老师告假状、恶毒栽赃陷害同伴偷东西"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k1-soc-h10-2",
        "label": {
          "th": "ดึงผมกระชากตัวเพื่อนให้ตกลงมาจากชิงช้า",
          "en": "Yank friend's hair pulling them off swing",
          "zh": "猛抓同伴的头发把对方从快速荡漾的秋千座板上重重拽翻在地"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k1-soc-h10-3",
        "label": {
          "th": "ตกลงกันด้วยการเป่ายิ้งฉุบอย่างเป็นมิตร ผู้ชนะเล่นก่อน 10 ครั้งแล้วสลับให้อีกคนเล่นต่ออย่างเท่าเทียม ✊ ✌️ 🖐️ 🎠",
          "en": "Play a friendly Rock-Paper-Scissors: Winner swings 10 times, then swap fairly",
          "zh": "大家友好地通过“剪刀石头布”决定先后顺序，赢的先荡十下，然后自觉换另一人荡十下 ✊ ✌️ 🖐️ 🎠"
        },
        "icon": "🎠"
      }
    ],
    "correctOptionId": "opt-k1-soc-h10-3",
    "explanation": {
      "th": "การตกลงกติการ่วมกันอย่างสันติทำให้ทุกคนได้เล่นอย่างมีความสุขและไม่มีใครเจ็บตัว เก่งมากครับ!",
      "en": "Awesome! Rock-paper-scissors and structured time-swapping build civic diplomacy early.",
      "zh": "太棒了！遵守公认的协商规则轮流游玩，既公平又维护了珍贵的同伴情谊。"
    }
  },
  {
    "id": "k2-soc-e1",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การตระหนักรู้ในตนเองระดับชั้นอนุบาล 2 ชุดที่ 1: เมื่อเรารู้สึก \"ประหม่า ไม่มั่นใจ หรือกลัวการพูดหน้าห้อง\" 🎤 ความคิดเชิงบวก (Positive Self-Talk) ที่ควรบอกตัวเองคืออะไร?",
      "en": "K2 Self-Awareness #1: Feeling NERVOUS or stage-fright speaking to class 🎤: What encouraging POSITIVE SELF-TALK empowers you?",
      "zh": "幼儿园中班心理成长素养第 1 题：轮到自己走上讲台面向全班同学做少儿演讲 🎤 时感到双腿发软心跳加速，最棒的“积极心理暗示自我鼓励语”是？"
    },
    "illustration": "🎤 🌟 💪",
    "illustrationSubtitle": {
      "th": "การเสริมสร้างความมั่นใจและการคิดเชิงบวก",
      "en": "Positive self-talk: \"I am brave and I can do this!\"",
      "zh": "自信心塑造：积极正向自我心理赋能"
    },
    "options": [
      {
        "id": "opt-k2-soc-e1-1",
        "label": {
          "th": "สูดหายใจลึกๆ แล้วบอกตัวเองในใจว่า \"เราฝึกซ้อมมาอย่างดี เราทำได้และกล้าหาญมาก!\" 🌟 💪",
          "en": "Breathe deeply and tell yourself: \"I practiced well, I am brave, and I can do this!\"",
          "zh": "挺起胸膛长吸一口气，在心底对自己说：“我认真练习过，我很勇敢，我一定能精彩讲出来！” 🌟 💪"
        },
        "icon": "🌟"
      },
      {
        "id": "opt-k2-soc-e1-2",
        "label": {
          "th": "บอกตัวเองว่าเราเป็นคนโง่และแย่ที่สุดในโลก",
          "en": "Tell yourself you are the dumbest loser",
          "zh": "在心里贬低自弃：“我肯定是全天下最蠢最没用的人，我死定了”"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-soc-e1-3",
        "label": {
          "th": "เป็นลมล้มพับลงไปแกล้งสลบ",
          "en": "Fake fainting onto the floor",
          "zh": "两眼一闭直接假装昏倒在地瘫成烂泥"
        },
        "icon": "😴"
      }
    ],
    "correctOptionId": "opt-k2-soc-e1-1",
    "explanation": {
      "th": "การให้กำลังใจตัวเองช่วยลดความวิตกกังวลและดึงศักยภาพที่ยอดเยี่ยมออกมา เก่งมากครับ!",
      "en": "Correct! Courageous positive self-talk builds resilient inner agency.",
      "zh": "答对了！积极正面的心理暗示能够驱散恐惧焦虑，激发勇敢坚毅的表达能力。"
    }
  },
  {
    "id": "k2-soc-e2",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การตระหนักรู้ในตนเองระดับชั้นอนุบาล 2 ชุดที่ 2: เมื่อเรารู้สึก \"ประหม่า ไม่มั่นใจ หรือกลัวการพูดหน้าห้อง\" 🎤 ความคิดเชิงบวก (Positive Self-Talk) ที่ควรบอกตัวเองคืออะไร?",
      "en": "K2 Self-Awareness #2: Feeling NERVOUS or stage-fright speaking to class 🎤: What encouraging POSITIVE SELF-TALK empowers you?",
      "zh": "幼儿园中班心理成长素养第 2 题：轮到自己走上讲台面向全班同学做少儿演讲 🎤 时感到双腿发软心跳加速，最棒的“积极心理暗示自我鼓励语”是？"
    },
    "illustration": "🎤 🌟 💪",
    "illustrationSubtitle": {
      "th": "การเสริมสร้างความมั่นใจและการคิดเชิงบวก",
      "en": "Positive self-talk: \"I am brave and I can do this!\"",
      "zh": "自信心塑造：积极正向自我心理赋能"
    },
    "options": [
      {
        "id": "opt-k2-soc-e2-1",
        "label": {
          "th": "บอกตัวเองว่าเราเป็นคนโง่และแย่ที่สุดในโลก",
          "en": "Tell yourself you are the dumbest loser",
          "zh": "在心里贬低自弃：“我肯定是全天下最蠢最没用的人，我死定了”"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-soc-e2-2",
        "label": {
          "th": "สูดหายใจลึกๆ แล้วบอกตัวเองในใจว่า \"เราฝึกซ้อมมาอย่างดี เราทำได้และกล้าหาญมาก!\" 🌟 💪",
          "en": "Breathe deeply and tell yourself: \"I practiced well, I am brave, and I can do this!\"",
          "zh": "挺起胸膛长吸一口气，在心底对自己说：“我认真练习过，我很勇敢，我一定能精彩讲出来！” 🌟 💪"
        },
        "icon": "🌟"
      },
      {
        "id": "opt-k2-soc-e2-3",
        "label": {
          "th": "เป็นลมล้มพับลงไปแกล้งสลบ",
          "en": "Fake fainting onto the floor",
          "zh": "两眼一闭直接假装昏倒在地瘫成烂泥"
        },
        "icon": "😴"
      }
    ],
    "correctOptionId": "opt-k2-soc-e2-2",
    "explanation": {
      "th": "การให้กำลังใจตัวเองช่วยลดความวิตกกังวลและดึงศักยภาพที่ยอดเยี่ยมออกมา เก่งมากครับ!",
      "en": "Correct! Courageous positive self-talk builds resilient inner agency.",
      "zh": "答对了！积极正面的心理暗示能够驱散恐惧焦虑，激发勇敢坚毅的表达能力。"
    }
  },
  {
    "id": "k2-soc-e3",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การตระหนักรู้ในตนเองระดับชั้นอนุบาล 2 ชุดที่ 3: เมื่อเรารู้สึก \"ประหม่า ไม่มั่นใจ หรือกลัวการพูดหน้าห้อง\" 🎤 ความคิดเชิงบวก (Positive Self-Talk) ที่ควรบอกตัวเองคืออะไร?",
      "en": "K2 Self-Awareness #3: Feeling NERVOUS or stage-fright speaking to class 🎤: What encouraging POSITIVE SELF-TALK empowers you?",
      "zh": "幼儿园中班心理成长素养第 3 题：轮到自己走上讲台面向全班同学做少儿演讲 🎤 时感到双腿发软心跳加速，最棒的“积极心理暗示自我鼓励语”是？"
    },
    "illustration": "🎤 🌟 💪",
    "illustrationSubtitle": {
      "th": "การเสริมสร้างความมั่นใจและการคิดเชิงบวก",
      "en": "Positive self-talk: \"I am brave and I can do this!\"",
      "zh": "自信心塑造：积极正向自我心理赋能"
    },
    "options": [
      {
        "id": "opt-k2-soc-e3-1",
        "label": {
          "th": "เป็นลมล้มพับลงไปแกล้งสลบ",
          "en": "Fake fainting onto the floor",
          "zh": "两眼一闭直接假装昏倒在地瘫成烂泥"
        },
        "icon": "😴"
      },
      {
        "id": "opt-k2-soc-e3-2",
        "label": {
          "th": "บอกตัวเองว่าเราเป็นคนโง่และแย่ที่สุดในโลก",
          "en": "Tell yourself you are the dumbest loser",
          "zh": "在心里贬低自弃：“我肯定是全天下最蠢最没用的人，我死定了”"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-soc-e3-3",
        "label": {
          "th": "สูดหายใจลึกๆ แล้วบอกตัวเองในใจว่า \"เราฝึกซ้อมมาอย่างดี เราทำได้และกล้าหาญมาก!\" 🌟 💪",
          "en": "Breathe deeply and tell yourself: \"I practiced well, I am brave, and I can do this!\"",
          "zh": "挺起胸膛长吸一口气，在心底对自己说：“我认真练习过，我很勇敢，我一定能精彩讲出来！” 🌟 💪"
        },
        "icon": "🌟"
      }
    ],
    "correctOptionId": "opt-k2-soc-e3-3",
    "explanation": {
      "th": "การให้กำลังใจตัวเองช่วยลดความวิตกกังวลและดึงศักยภาพที่ยอดเยี่ยมออกมา เก่งมากครับ!",
      "en": "Correct! Courageous positive self-talk builds resilient inner agency.",
      "zh": "答对了！积极正面的心理暗示能够驱散恐惧焦虑，激发勇敢坚毅的表达能力。"
    }
  },
  {
    "id": "k2-soc-e4",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การตระหนักรู้ในตนเองระดับชั้นอนุบาล 2 ชุดที่ 4: เมื่อเรารู้สึก \"ประหม่า ไม่มั่นใจ หรือกลัวการพูดหน้าห้อง\" 🎤 ความคิดเชิงบวก (Positive Self-Talk) ที่ควรบอกตัวเองคืออะไร?",
      "en": "K2 Self-Awareness #4: Feeling NERVOUS or stage-fright speaking to class 🎤: What encouraging POSITIVE SELF-TALK empowers you?",
      "zh": "幼儿园中班心理成长素养第 4 题：轮到自己走上讲台面向全班同学做少儿演讲 🎤 时感到双腿发软心跳加速，最棒的“积极心理暗示自我鼓励语”是？"
    },
    "illustration": "🎤 🌟 💪",
    "illustrationSubtitle": {
      "th": "การเสริมสร้างความมั่นใจและการคิดเชิงบวก",
      "en": "Positive self-talk: \"I am brave and I can do this!\"",
      "zh": "自信心塑造：积极正向自我心理赋能"
    },
    "options": [
      {
        "id": "opt-k2-soc-e4-1",
        "label": {
          "th": "สูดหายใจลึกๆ แล้วบอกตัวเองในใจว่า \"เราฝึกซ้อมมาอย่างดี เราทำได้และกล้าหาญมาก!\" 🌟 💪",
          "en": "Breathe deeply and tell yourself: \"I practiced well, I am brave, and I can do this!\"",
          "zh": "挺起胸膛长吸一口气，在心底对自己说：“我认真练习过，我很勇敢，我一定能精彩讲出来！” 🌟 💪"
        },
        "icon": "🌟"
      },
      {
        "id": "opt-k2-soc-e4-2",
        "label": {
          "th": "บอกตัวเองว่าเราเป็นคนโง่และแย่ที่สุดในโลก",
          "en": "Tell yourself you are the dumbest loser",
          "zh": "在心里贬低自弃：“我肯定是全天下最蠢最没用的人，我死定了”"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-soc-e4-3",
        "label": {
          "th": "เป็นลมล้มพับลงไปแกล้งสลบ",
          "en": "Fake fainting onto the floor",
          "zh": "两眼一闭直接假装昏倒在地瘫成烂泥"
        },
        "icon": "😴"
      }
    ],
    "correctOptionId": "opt-k2-soc-e4-1",
    "explanation": {
      "th": "การให้กำลังใจตัวเองช่วยลดความวิตกกังวลและดึงศักยภาพที่ยอดเยี่ยมออกมา เก่งมากครับ!",
      "en": "Correct! Courageous positive self-talk builds resilient inner agency.",
      "zh": "答对了！积极正面的心理暗示能够驱散恐惧焦虑，激发勇敢坚毅的表达能力。"
    }
  },
  {
    "id": "k2-soc-e5",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การตระหนักรู้ในตนเองระดับชั้นอนุบาล 2 ชุดที่ 5: เมื่อเรารู้สึก \"ประหม่า ไม่มั่นใจ หรือกลัวการพูดหน้าห้อง\" 🎤 ความคิดเชิงบวก (Positive Self-Talk) ที่ควรบอกตัวเองคืออะไร?",
      "en": "K2 Self-Awareness #5: Feeling NERVOUS or stage-fright speaking to class 🎤: What encouraging POSITIVE SELF-TALK empowers you?",
      "zh": "幼儿园中班心理成长素养第 5 题：轮到自己走上讲台面向全班同学做少儿演讲 🎤 时感到双腿发软心跳加速，最棒的“积极心理暗示自我鼓励语”是？"
    },
    "illustration": "🎤 🌟 💪",
    "illustrationSubtitle": {
      "th": "การเสริมสร้างความมั่นใจและการคิดเชิงบวก",
      "en": "Positive self-talk: \"I am brave and I can do this!\"",
      "zh": "自信心塑造：积极正向自我心理赋能"
    },
    "options": [
      {
        "id": "opt-k2-soc-e5-1",
        "label": {
          "th": "บอกตัวเองว่าเราเป็นคนโง่และแย่ที่สุดในโลก",
          "en": "Tell yourself you are the dumbest loser",
          "zh": "在心里贬低自弃：“我肯定是全天下最蠢最没用的人，我死定了”"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-soc-e5-2",
        "label": {
          "th": "สูดหายใจลึกๆ แล้วบอกตัวเองในใจว่า \"เราฝึกซ้อมมาอย่างดี เราทำได้และกล้าหาญมาก!\" 🌟 💪",
          "en": "Breathe deeply and tell yourself: \"I practiced well, I am brave, and I can do this!\"",
          "zh": "挺起胸膛长吸一口气，在心底对自己说：“我认真练习过，我很勇敢，我一定能精彩讲出来！” 🌟 💪"
        },
        "icon": "🌟"
      },
      {
        "id": "opt-k2-soc-e5-3",
        "label": {
          "th": "เป็นลมล้มพับลงไปแกล้งสลบ",
          "en": "Fake fainting onto the floor",
          "zh": "两眼一闭直接假装昏倒在地瘫成烂泥"
        },
        "icon": "😴"
      }
    ],
    "correctOptionId": "opt-k2-soc-e5-2",
    "explanation": {
      "th": "การให้กำลังใจตัวเองช่วยลดความวิตกกังวลและดึงศักยภาพที่ยอดเยี่ยมออกมา เก่งมากครับ!",
      "en": "Correct! Courageous positive self-talk builds resilient inner agency.",
      "zh": "答对了！积极正面的心理暗示能够驱散恐惧焦虑，激发勇敢坚毅的表达能力。"
    }
  },
  {
    "id": "k2-soc-e6",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การตระหนักรู้ในตนเองระดับชั้นอนุบาล 2 ชุดที่ 6: เมื่อเรารู้สึก \"ประหม่า ไม่มั่นใจ หรือกลัวการพูดหน้าห้อง\" 🎤 ความคิดเชิงบวก (Positive Self-Talk) ที่ควรบอกตัวเองคืออะไร?",
      "en": "K2 Self-Awareness #6: Feeling NERVOUS or stage-fright speaking to class 🎤: What encouraging POSITIVE SELF-TALK empowers you?",
      "zh": "幼儿园中班心理成长素养第 6 题：轮到自己走上讲台面向全班同学做少儿演讲 🎤 时感到双腿发软心跳加速，最棒的“积极心理暗示自我鼓励语”是？"
    },
    "illustration": "🎤 🌟 💪",
    "illustrationSubtitle": {
      "th": "การเสริมสร้างความมั่นใจและการคิดเชิงบวก",
      "en": "Positive self-talk: \"I am brave and I can do this!\"",
      "zh": "自信心塑造：积极正向自我心理赋能"
    },
    "options": [
      {
        "id": "opt-k2-soc-e6-1",
        "label": {
          "th": "เป็นลมล้มพับลงไปแกล้งสลบ",
          "en": "Fake fainting onto the floor",
          "zh": "两眼一闭直接假装昏倒在地瘫成烂泥"
        },
        "icon": "😴"
      },
      {
        "id": "opt-k2-soc-e6-2",
        "label": {
          "th": "บอกตัวเองว่าเราเป็นคนโง่และแย่ที่สุดในโลก",
          "en": "Tell yourself you are the dumbest loser",
          "zh": "在心里贬低自弃：“我肯定是全天下最蠢最没用的人，我死定了”"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-soc-e6-3",
        "label": {
          "th": "สูดหายใจลึกๆ แล้วบอกตัวเองในใจว่า \"เราฝึกซ้อมมาอย่างดี เราทำได้และกล้าหาญมาก!\" 🌟 💪",
          "en": "Breathe deeply and tell yourself: \"I practiced well, I am brave, and I can do this!\"",
          "zh": "挺起胸膛长吸一口气，在心底对自己说：“我认真练习过，我很勇敢，我一定能精彩讲出来！” 🌟 💪"
        },
        "icon": "🌟"
      }
    ],
    "correctOptionId": "opt-k2-soc-e6-3",
    "explanation": {
      "th": "การให้กำลังใจตัวเองช่วยลดความวิตกกังวลและดึงศักยภาพที่ยอดเยี่ยมออกมา เก่งมากครับ!",
      "en": "Correct! Courageous positive self-talk builds resilient inner agency.",
      "zh": "答对了！积极正面的心理暗示能够驱散恐惧焦虑，激发勇敢坚毅的表达能力。"
    }
  },
  {
    "id": "k2-soc-e7",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การตระหนักรู้ในตนเองระดับชั้นอนุบาล 2 ชุดที่ 7: เมื่อเรารู้สึก \"ประหม่า ไม่มั่นใจ หรือกลัวการพูดหน้าห้อง\" 🎤 ความคิดเชิงบวก (Positive Self-Talk) ที่ควรบอกตัวเองคืออะไร?",
      "en": "K2 Self-Awareness #7: Feeling NERVOUS or stage-fright speaking to class 🎤: What encouraging POSITIVE SELF-TALK empowers you?",
      "zh": "幼儿园中班心理成长素养第 7 题：轮到自己走上讲台面向全班同学做少儿演讲 🎤 时感到双腿发软心跳加速，最棒的“积极心理暗示自我鼓励语”是？"
    },
    "illustration": "🎤 🌟 💪",
    "illustrationSubtitle": {
      "th": "การเสริมสร้างความมั่นใจและการคิดเชิงบวก",
      "en": "Positive self-talk: \"I am brave and I can do this!\"",
      "zh": "自信心塑造：积极正向自我心理赋能"
    },
    "options": [
      {
        "id": "opt-k2-soc-e7-1",
        "label": {
          "th": "สูดหายใจลึกๆ แล้วบอกตัวเองในใจว่า \"เราฝึกซ้อมมาอย่างดี เราทำได้และกล้าหาญมาก!\" 🌟 💪",
          "en": "Breathe deeply and tell yourself: \"I practiced well, I am brave, and I can do this!\"",
          "zh": "挺起胸膛长吸一口气，在心底对自己说：“我认真练习过，我很勇敢，我一定能精彩讲出来！” 🌟 💪"
        },
        "icon": "🌟"
      },
      {
        "id": "opt-k2-soc-e7-2",
        "label": {
          "th": "บอกตัวเองว่าเราเป็นคนโง่และแย่ที่สุดในโลก",
          "en": "Tell yourself you are the dumbest loser",
          "zh": "在心里贬低自弃：“我肯定是全天下最蠢最没用的人，我死定了”"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-soc-e7-3",
        "label": {
          "th": "เป็นลมล้มพับลงไปแกล้งสลบ",
          "en": "Fake fainting onto the floor",
          "zh": "两眼一闭直接假装昏倒在地瘫成烂泥"
        },
        "icon": "😴"
      }
    ],
    "correctOptionId": "opt-k2-soc-e7-1",
    "explanation": {
      "th": "การให้กำลังใจตัวเองช่วยลดความวิตกกังวลและดึงศักยภาพที่ยอดเยี่ยมออกมา เก่งมากครับ!",
      "en": "Correct! Courageous positive self-talk builds resilient inner agency.",
      "zh": "答对了！积极正面的心理暗示能够驱散恐惧焦虑，激发勇敢坚毅的表达能力。"
    }
  },
  {
    "id": "k2-soc-e8",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การตระหนักรู้ในตนเองระดับชั้นอนุบาล 2 ชุดที่ 8: เมื่อเรารู้สึก \"ประหม่า ไม่มั่นใจ หรือกลัวการพูดหน้าห้อง\" 🎤 ความคิดเชิงบวก (Positive Self-Talk) ที่ควรบอกตัวเองคืออะไร?",
      "en": "K2 Self-Awareness #8: Feeling NERVOUS or stage-fright speaking to class 🎤: What encouraging POSITIVE SELF-TALK empowers you?",
      "zh": "幼儿园中班心理成长素养第 8 题：轮到自己走上讲台面向全班同学做少儿演讲 🎤 时感到双腿发软心跳加速，最棒的“积极心理暗示自我鼓励语”是？"
    },
    "illustration": "🎤 🌟 💪",
    "illustrationSubtitle": {
      "th": "การเสริมสร้างความมั่นใจและการคิดเชิงบวก",
      "en": "Positive self-talk: \"I am brave and I can do this!\"",
      "zh": "自信心塑造：积极正向自我心理赋能"
    },
    "options": [
      {
        "id": "opt-k2-soc-e8-1",
        "label": {
          "th": "บอกตัวเองว่าเราเป็นคนโง่และแย่ที่สุดในโลก",
          "en": "Tell yourself you are the dumbest loser",
          "zh": "在心里贬低自弃：“我肯定是全天下最蠢最没用的人，我死定了”"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-soc-e8-2",
        "label": {
          "th": "สูดหายใจลึกๆ แล้วบอกตัวเองในใจว่า \"เราฝึกซ้อมมาอย่างดี เราทำได้และกล้าหาญมาก!\" 🌟 💪",
          "en": "Breathe deeply and tell yourself: \"I practiced well, I am brave, and I can do this!\"",
          "zh": "挺起胸膛长吸一口气，在心底对自己说：“我认真练习过，我很勇敢，我一定能精彩讲出来！” 🌟 💪"
        },
        "icon": "🌟"
      },
      {
        "id": "opt-k2-soc-e8-3",
        "label": {
          "th": "เป็นลมล้มพับลงไปแกล้งสลบ",
          "en": "Fake fainting onto the floor",
          "zh": "两眼一闭直接假装昏倒在地瘫成烂泥"
        },
        "icon": "😴"
      }
    ],
    "correctOptionId": "opt-k2-soc-e8-2",
    "explanation": {
      "th": "การให้กำลังใจตัวเองช่วยลดความวิตกกังวลและดึงศักยภาพที่ยอดเยี่ยมออกมา เก่งมากครับ!",
      "en": "Correct! Courageous positive self-talk builds resilient inner agency.",
      "zh": "答对了！积极正面的心理暗示能够驱散恐惧焦虑，激发勇敢坚毅的表达能力。"
    }
  },
  {
    "id": "k2-soc-e9",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การตระหนักรู้ในตนเองระดับชั้นอนุบาล 2 ชุดที่ 9: เมื่อเรารู้สึก \"ประหม่า ไม่มั่นใจ หรือกลัวการพูดหน้าห้อง\" 🎤 ความคิดเชิงบวก (Positive Self-Talk) ที่ควรบอกตัวเองคืออะไร?",
      "en": "K2 Self-Awareness #9: Feeling NERVOUS or stage-fright speaking to class 🎤: What encouraging POSITIVE SELF-TALK empowers you?",
      "zh": "幼儿园中班心理成长素养第 9 题：轮到自己走上讲台面向全班同学做少儿演讲 🎤 时感到双腿发软心跳加速，最棒的“积极心理暗示自我鼓励语”是？"
    },
    "illustration": "🎤 🌟 💪",
    "illustrationSubtitle": {
      "th": "การเสริมสร้างความมั่นใจและการคิดเชิงบวก",
      "en": "Positive self-talk: \"I am brave and I can do this!\"",
      "zh": "自信心塑造：积极正向自我心理赋能"
    },
    "options": [
      {
        "id": "opt-k2-soc-e9-1",
        "label": {
          "th": "เป็นลมล้มพับลงไปแกล้งสลบ",
          "en": "Fake fainting onto the floor",
          "zh": "两眼一闭直接假装昏倒在地瘫成烂泥"
        },
        "icon": "😴"
      },
      {
        "id": "opt-k2-soc-e9-2",
        "label": {
          "th": "บอกตัวเองว่าเราเป็นคนโง่และแย่ที่สุดในโลก",
          "en": "Tell yourself you are the dumbest loser",
          "zh": "在心里贬低自弃：“我肯定是全天下最蠢最没用的人，我死定了”"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-soc-e9-3",
        "label": {
          "th": "สูดหายใจลึกๆ แล้วบอกตัวเองในใจว่า \"เราฝึกซ้อมมาอย่างดี เราทำได้และกล้าหาญมาก!\" 🌟 💪",
          "en": "Breathe deeply and tell yourself: \"I practiced well, I am brave, and I can do this!\"",
          "zh": "挺起胸膛长吸一口气，在心底对自己说：“我认真练习过，我很勇敢，我一定能精彩讲出来！” 🌟 💪"
        },
        "icon": "🌟"
      }
    ],
    "correctOptionId": "opt-k2-soc-e9-3",
    "explanation": {
      "th": "การให้กำลังใจตัวเองช่วยลดความวิตกกังวลและดึงศักยภาพที่ยอดเยี่ยมออกมา เก่งมากครับ!",
      "en": "Correct! Courageous positive self-talk builds resilient inner agency.",
      "zh": "答对了！积极正面的心理暗示能够驱散恐惧焦虑，激发勇敢坚毅的表达能力。"
    }
  },
  {
    "id": "k2-soc-e10",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การตระหนักรู้ในตนเองระดับชั้นอนุบาล 2 ชุดที่ 10: เมื่อเรารู้สึก \"ประหม่า ไม่มั่นใจ หรือกลัวการพูดหน้าห้อง\" 🎤 ความคิดเชิงบวก (Positive Self-Talk) ที่ควรบอกตัวเองคืออะไร?",
      "en": "K2 Self-Awareness #10: Feeling NERVOUS or stage-fright speaking to class 🎤: What encouraging POSITIVE SELF-TALK empowers you?",
      "zh": "幼儿园中班心理成长素养第 10 题：轮到自己走上讲台面向全班同学做少儿演讲 🎤 时感到双腿发软心跳加速，最棒的“积极心理暗示自我鼓励语”是？"
    },
    "illustration": "🎤 🌟 💪",
    "illustrationSubtitle": {
      "th": "การเสริมสร้างความมั่นใจและการคิดเชิงบวก",
      "en": "Positive self-talk: \"I am brave and I can do this!\"",
      "zh": "自信心塑造：积极正向自我心理赋能"
    },
    "options": [
      {
        "id": "opt-k2-soc-e10-1",
        "label": {
          "th": "สูดหายใจลึกๆ แล้วบอกตัวเองในใจว่า \"เราฝึกซ้อมมาอย่างดี เราทำได้และกล้าหาญมาก!\" 🌟 💪",
          "en": "Breathe deeply and tell yourself: \"I practiced well, I am brave, and I can do this!\"",
          "zh": "挺起胸膛长吸一口气，在心底对自己说：“我认真练习过，我很勇敢，我一定能精彩讲出来！” 🌟 💪"
        },
        "icon": "🌟"
      },
      {
        "id": "opt-k2-soc-e10-2",
        "label": {
          "th": "บอกตัวเองว่าเราเป็นคนโง่และแย่ที่สุดในโลก",
          "en": "Tell yourself you are the dumbest loser",
          "zh": "在心里贬低自弃：“我肯定是全天下最蠢最没用的人，我死定了”"
        },
        "icon": "❌"
      },
      {
        "id": "opt-k2-soc-e10-3",
        "label": {
          "th": "เป็นลมล้มพับลงไปแกล้งสลบ",
          "en": "Fake fainting onto the floor",
          "zh": "两眼一闭直接假装昏倒在地瘫成烂泥"
        },
        "icon": "😴"
      }
    ],
    "correctOptionId": "opt-k2-soc-e10-1",
    "explanation": {
      "th": "การให้กำลังใจตัวเองช่วยลดความวิตกกังวลและดึงศักยภาพที่ยอดเยี่ยมออกมา เก่งมากครับ!",
      "en": "Correct! Courageous positive self-talk builds resilient inner agency.",
      "zh": "答对了！积极正面的心理暗示能够驱散恐惧焦虑，激发勇敢坚毅的表达能力。"
    }
  },
  {
    "id": "k2-soc-m1",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการทำงานเป็นทีมระดับชั้นอนุบาล 2 ชุดที่ 1: ในกิจกรรม \"สร้างปราสาทบล็อกไม้ร่วมกันเป็นกลุ่ม\" 🏰 เพื่อให้ผลงานสำเร็จสวยงาม สมาชิกทุกคนควรปฏิบัติอย่างไร?",
      "en": "K2 Team Collaboration #1: Group activity \"Building a giant block castle together\" 🏰: How should teammates cooperate?",
      "zh": "幼儿园中班团队合作第 1 题：小组合作开展“通力协作搭建一座宏伟壮观的木积木城堡” 🏰 活动，要想作品大获成功，成员间应如何配合？"
    },
    "illustration": "🏰 🧱 🤝",
    "illustrationSubtitle": {
      "th": "การทำงานเป็นทีม: ร่วมมือแบ่งหน้าที่และรับฟัง",
      "en": "Teamwork: Divide roles, listen, and cooperate",
      "zh": "团队协同合作：明确分工、互相包容倾听"
    },
    "options": [
      {
        "id": "opt-k2-soc-m1-1",
        "label": {
          "th": "แอบทุบปราสาทของเพื่อนร่วมทีมให้พังทลาย",
          "en": "Smash teammates' towers behind their back",
          "zh": "趁同组同学不注意，偷偷一脚踹碎队友刚搭好的侧翼防御塔"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-soc-m1-2",
        "label": {
          "th": "ร่วมมือกัน วางแผนแบ่งหน้าที่ คอยส่งบล็อกไม้ให้กัน และรับฟังความคิดเห็นของเพื่อน 🏰 🤝",
          "en": "Collaborate, divide responsibilities, pass blocks smoothly, and listen to everyone's ideas",
          "zh": "大家友好商议、明确各自搭基座或修塔尖的分工，递送积木，虚心吸纳同伴创意 🏰 🤝"
        },
        "icon": "🏰"
      },
      {
        "id": "opt-k2-soc-m1-3",
        "label": {
          "th": "กักตุนบล็อกไม้ทั้งหมดไว้คนเดียวใต้เก้าอี้",
          "en": "Hoard all blocks under own chair secretly",
          "zh": "把全班所有的积木都霸道地抢塞在自己屁股底下一块不给别人用"
        },
        "icon": "📦"
      }
    ],
    "correctOptionId": "opt-k2-soc-m1-2",
    "explanation": {
      "th": "การทำงานร่วมกันเป็นทีมช่วยให้ผลงานยิ่งใหญ่กว่าการทำคนเดียว และสร้างความภาคภูมิใจร่วมกัน เก่งมากครับ!",
      "en": "Awesome! Cohesive teamwork synchronizes strengths and achieves creative masterworks.",
      "zh": "太棒了！团队合作讲求分工与包容，同心协力才能筑起坚固美丽的宏伟城堡。"
    }
  },
  {
    "id": "k2-soc-m2",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการทำงานเป็นทีมระดับชั้นอนุบาล 2 ชุดที่ 2: ในกิจกรรม \"สร้างปราสาทบล็อกไม้ร่วมกันเป็นกลุ่ม\" 🏰 เพื่อให้ผลงานสำเร็จสวยงาม สมาชิกทุกคนควรปฏิบัติอย่างไร?",
      "en": "K2 Team Collaboration #2: Group activity \"Building a giant block castle together\" 🏰: How should teammates cooperate?",
      "zh": "幼儿园中班团队合作第 2 题：小组合作开展“通力协作搭建一座宏伟壮观的木积木城堡” 🏰 活动，要想作品大获成功，成员间应如何配合？"
    },
    "illustration": "🏰 🧱 🤝",
    "illustrationSubtitle": {
      "th": "การทำงานเป็นทีม: ร่วมมือแบ่งหน้าที่และรับฟัง",
      "en": "Teamwork: Divide roles, listen, and cooperate",
      "zh": "团队协同合作：明确分工、互相包容倾听"
    },
    "options": [
      {
        "id": "opt-k2-soc-m2-1",
        "label": {
          "th": "กักตุนบล็อกไม้ทั้งหมดไว้คนเดียวใต้เก้าอี้",
          "en": "Hoard all blocks under own chair secretly",
          "zh": "把全班所有的积木都霸道地抢塞在自己屁股底下一块不给别人用"
        },
        "icon": "📦"
      },
      {
        "id": "opt-k2-soc-m2-2",
        "label": {
          "th": "แอบทุบปราสาทของเพื่อนร่วมทีมให้พังทลาย",
          "en": "Smash teammates' towers behind their back",
          "zh": "趁同组同学不注意，偷偷一脚踹碎队友刚搭好的侧翼防御塔"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-soc-m2-3",
        "label": {
          "th": "ร่วมมือกัน วางแผนแบ่งหน้าที่ คอยส่งบล็อกไม้ให้กัน และรับฟังความคิดเห็นของเพื่อน 🏰 🤝",
          "en": "Collaborate, divide responsibilities, pass blocks smoothly, and listen to everyone's ideas",
          "zh": "大家友好商议、明确各自搭基座或修塔尖的分工，递送积木，虚心吸纳同伴创意 🏰 🤝"
        },
        "icon": "🏰"
      }
    ],
    "correctOptionId": "opt-k2-soc-m2-3",
    "explanation": {
      "th": "การทำงานร่วมกันเป็นทีมช่วยให้ผลงานยิ่งใหญ่กว่าการทำคนเดียว และสร้างความภาคภูมิใจร่วมกัน เก่งมากครับ!",
      "en": "Awesome! Cohesive teamwork synchronizes strengths and achieves creative masterworks.",
      "zh": "太棒了！团队合作讲求分工与包容，同心协力才能筑起坚固美丽的宏伟城堡。"
    }
  },
  {
    "id": "k2-soc-m3",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการทำงานเป็นทีมระดับชั้นอนุบาล 2 ชุดที่ 3: ในกิจกรรม \"สร้างปราสาทบล็อกไม้ร่วมกันเป็นกลุ่ม\" 🏰 เพื่อให้ผลงานสำเร็จสวยงาม สมาชิกทุกคนควรปฏิบัติอย่างไร?",
      "en": "K2 Team Collaboration #3: Group activity \"Building a giant block castle together\" 🏰: How should teammates cooperate?",
      "zh": "幼儿园中班团队合作第 3 题：小组合作开展“通力协作搭建一座宏伟壮观的木积木城堡” 🏰 活动，要想作品大获成功，成员间应如何配合？"
    },
    "illustration": "🏰 🧱 🤝",
    "illustrationSubtitle": {
      "th": "การทำงานเป็นทีม: ร่วมมือแบ่งหน้าที่และรับฟัง",
      "en": "Teamwork: Divide roles, listen, and cooperate",
      "zh": "团队协同合作：明确分工、互相包容倾听"
    },
    "options": [
      {
        "id": "opt-k2-soc-m3-1",
        "label": {
          "th": "ร่วมมือกัน วางแผนแบ่งหน้าที่ คอยส่งบล็อกไม้ให้กัน และรับฟังความคิดเห็นของเพื่อน 🏰 🤝",
          "en": "Collaborate, divide responsibilities, pass blocks smoothly, and listen to everyone's ideas",
          "zh": "大家友好商议、明确各自搭基座或修塔尖的分工，递送积木，虚心吸纳同伴创意 🏰 🤝"
        },
        "icon": "🏰"
      },
      {
        "id": "opt-k2-soc-m3-2",
        "label": {
          "th": "แอบทุบปราสาทของเพื่อนร่วมทีมให้พังทลาย",
          "en": "Smash teammates' towers behind their back",
          "zh": "趁同组同学不注意，偷偷一脚踹碎队友刚搭好的侧翼防御塔"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-soc-m3-3",
        "label": {
          "th": "กักตุนบล็อกไม้ทั้งหมดไว้คนเดียวใต้เก้าอี้",
          "en": "Hoard all blocks under own chair secretly",
          "zh": "把全班所有的积木都霸道地抢塞在自己屁股底下一块不给别人用"
        },
        "icon": "📦"
      }
    ],
    "correctOptionId": "opt-k2-soc-m3-1",
    "explanation": {
      "th": "การทำงานร่วมกันเป็นทีมช่วยให้ผลงานยิ่งใหญ่กว่าการทำคนเดียว และสร้างความภาคภูมิใจร่วมกัน เก่งมากครับ!",
      "en": "Awesome! Cohesive teamwork synchronizes strengths and achieves creative masterworks.",
      "zh": "太棒了！团队合作讲求分工与包容，同心协力才能筑起坚固美丽的宏伟城堡。"
    }
  },
  {
    "id": "k2-soc-m4",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการทำงานเป็นทีมระดับชั้นอนุบาล 2 ชุดที่ 4: ในกิจกรรม \"สร้างปราสาทบล็อกไม้ร่วมกันเป็นกลุ่ม\" 🏰 เพื่อให้ผลงานสำเร็จสวยงาม สมาชิกทุกคนควรปฏิบัติอย่างไร?",
      "en": "K2 Team Collaboration #4: Group activity \"Building a giant block castle together\" 🏰: How should teammates cooperate?",
      "zh": "幼儿园中班团队合作第 4 题：小组合作开展“通力协作搭建一座宏伟壮观的木积木城堡” 🏰 活动，要想作品大获成功，成员间应如何配合？"
    },
    "illustration": "🏰 🧱 🤝",
    "illustrationSubtitle": {
      "th": "การทำงานเป็นทีม: ร่วมมือแบ่งหน้าที่และรับฟัง",
      "en": "Teamwork: Divide roles, listen, and cooperate",
      "zh": "团队协同合作：明确分工、互相包容倾听"
    },
    "options": [
      {
        "id": "opt-k2-soc-m4-1",
        "label": {
          "th": "แอบทุบปราสาทของเพื่อนร่วมทีมให้พังทลาย",
          "en": "Smash teammates' towers behind their back",
          "zh": "趁同组同学不注意，偷偷一脚踹碎队友刚搭好的侧翼防御塔"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-soc-m4-2",
        "label": {
          "th": "ร่วมมือกัน วางแผนแบ่งหน้าที่ คอยส่งบล็อกไม้ให้กัน และรับฟังความคิดเห็นของเพื่อน 🏰 🤝",
          "en": "Collaborate, divide responsibilities, pass blocks smoothly, and listen to everyone's ideas",
          "zh": "大家友好商议、明确各自搭基座或修塔尖的分工，递送积木，虚心吸纳同伴创意 🏰 🤝"
        },
        "icon": "🏰"
      },
      {
        "id": "opt-k2-soc-m4-3",
        "label": {
          "th": "กักตุนบล็อกไม้ทั้งหมดไว้คนเดียวใต้เก้าอี้",
          "en": "Hoard all blocks under own chair secretly",
          "zh": "把全班所有的积木都霸道地抢塞在自己屁股底下一块不给别人用"
        },
        "icon": "📦"
      }
    ],
    "correctOptionId": "opt-k2-soc-m4-2",
    "explanation": {
      "th": "การทำงานร่วมกันเป็นทีมช่วยให้ผลงานยิ่งใหญ่กว่าการทำคนเดียว และสร้างความภาคภูมิใจร่วมกัน เก่งมากครับ!",
      "en": "Awesome! Cohesive teamwork synchronizes strengths and achieves creative masterworks.",
      "zh": "太棒了！团队合作讲求分工与包容，同心协力才能筑起坚固美丽的宏伟城堡。"
    }
  },
  {
    "id": "k2-soc-m5",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการทำงานเป็นทีมระดับชั้นอนุบาล 2 ชุดที่ 5: ในกิจกรรม \"สร้างปราสาทบล็อกไม้ร่วมกันเป็นกลุ่ม\" 🏰 เพื่อให้ผลงานสำเร็จสวยงาม สมาชิกทุกคนควรปฏิบัติอย่างไร?",
      "en": "K2 Team Collaboration #5: Group activity \"Building a giant block castle together\" 🏰: How should teammates cooperate?",
      "zh": "幼儿园中班团队合作第 5 题：小组合作开展“通力协作搭建一座宏伟壮观的木积木城堡” 🏰 活动，要想作品大获成功，成员间应如何配合？"
    },
    "illustration": "🏰 🧱 🤝",
    "illustrationSubtitle": {
      "th": "การทำงานเป็นทีม: ร่วมมือแบ่งหน้าที่และรับฟัง",
      "en": "Teamwork: Divide roles, listen, and cooperate",
      "zh": "团队协同合作：明确分工、互相包容倾听"
    },
    "options": [
      {
        "id": "opt-k2-soc-m5-1",
        "label": {
          "th": "กักตุนบล็อกไม้ทั้งหมดไว้คนเดียวใต้เก้าอี้",
          "en": "Hoard all blocks under own chair secretly",
          "zh": "把全班所有的积木都霸道地抢塞在自己屁股底下一块不给别人用"
        },
        "icon": "📦"
      },
      {
        "id": "opt-k2-soc-m5-2",
        "label": {
          "th": "แอบทุบปราสาทของเพื่อนร่วมทีมให้พังทลาย",
          "en": "Smash teammates' towers behind their back",
          "zh": "趁同组同学不注意，偷偷一脚踹碎队友刚搭好的侧翼防御塔"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-soc-m5-3",
        "label": {
          "th": "ร่วมมือกัน วางแผนแบ่งหน้าที่ คอยส่งบล็อกไม้ให้กัน และรับฟังความคิดเห็นของเพื่อน 🏰 🤝",
          "en": "Collaborate, divide responsibilities, pass blocks smoothly, and listen to everyone's ideas",
          "zh": "大家友好商议、明确各自搭基座或修塔尖的分工，递送积木，虚心吸纳同伴创意 🏰 🤝"
        },
        "icon": "🏰"
      }
    ],
    "correctOptionId": "opt-k2-soc-m5-3",
    "explanation": {
      "th": "การทำงานร่วมกันเป็นทีมช่วยให้ผลงานยิ่งใหญ่กว่าการทำคนเดียว และสร้างความภาคภูมิใจร่วมกัน เก่งมากครับ!",
      "en": "Awesome! Cohesive teamwork synchronizes strengths and achieves creative masterworks.",
      "zh": "太棒了！团队合作讲求分工与包容，同心协力才能筑起坚固美丽的宏伟城堡。"
    }
  },
  {
    "id": "k2-soc-m6",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการทำงานเป็นทีมระดับชั้นอนุบาล 2 ชุดที่ 6: ในกิจกรรม \"สร้างปราสาทบล็อกไม้ร่วมกันเป็นกลุ่ม\" 🏰 เพื่อให้ผลงานสำเร็จสวยงาม สมาชิกทุกคนควรปฏิบัติอย่างไร?",
      "en": "K2 Team Collaboration #6: Group activity \"Building a giant block castle together\" 🏰: How should teammates cooperate?",
      "zh": "幼儿园中班团队合作第 6 题：小组合作开展“通力协作搭建一座宏伟壮观的木积木城堡” 🏰 活动，要想作品大获成功，成员间应如何配合？"
    },
    "illustration": "🏰 🧱 🤝",
    "illustrationSubtitle": {
      "th": "การทำงานเป็นทีม: ร่วมมือแบ่งหน้าที่และรับฟัง",
      "en": "Teamwork: Divide roles, listen, and cooperate",
      "zh": "团队协同合作：明确分工、互相包容倾听"
    },
    "options": [
      {
        "id": "opt-k2-soc-m6-1",
        "label": {
          "th": "ร่วมมือกัน วางแผนแบ่งหน้าที่ คอยส่งบล็อกไม้ให้กัน และรับฟังความคิดเห็นของเพื่อน 🏰 🤝",
          "en": "Collaborate, divide responsibilities, pass blocks smoothly, and listen to everyone's ideas",
          "zh": "大家友好商议、明确各自搭基座或修塔尖的分工，递送积木，虚心吸纳同伴创意 🏰 🤝"
        },
        "icon": "🏰"
      },
      {
        "id": "opt-k2-soc-m6-2",
        "label": {
          "th": "แอบทุบปราสาทของเพื่อนร่วมทีมให้พังทลาย",
          "en": "Smash teammates' towers behind their back",
          "zh": "趁同组同学不注意，偷偷一脚踹碎队友刚搭好的侧翼防御塔"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-soc-m6-3",
        "label": {
          "th": "กักตุนบล็อกไม้ทั้งหมดไว้คนเดียวใต้เก้าอี้",
          "en": "Hoard all blocks under own chair secretly",
          "zh": "把全班所有的积木都霸道地抢塞在自己屁股底下一块不给别人用"
        },
        "icon": "📦"
      }
    ],
    "correctOptionId": "opt-k2-soc-m6-1",
    "explanation": {
      "th": "การทำงานร่วมกันเป็นทีมช่วยให้ผลงานยิ่งใหญ่กว่าการทำคนเดียว และสร้างความภาคภูมิใจร่วมกัน เก่งมากครับ!",
      "en": "Awesome! Cohesive teamwork synchronizes strengths and achieves creative masterworks.",
      "zh": "太棒了！团队合作讲求分工与包容，同心协力才能筑起坚固美丽的宏伟城堡。"
    }
  },
  {
    "id": "k2-soc-m7",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการทำงานเป็นทีมระดับชั้นอนุบาล 2 ชุดที่ 7: ในกิจกรรม \"สร้างปราสาทบล็อกไม้ร่วมกันเป็นกลุ่ม\" 🏰 เพื่อให้ผลงานสำเร็จสวยงาม สมาชิกทุกคนควรปฏิบัติอย่างไร?",
      "en": "K2 Team Collaboration #7: Group activity \"Building a giant block castle together\" 🏰: How should teammates cooperate?",
      "zh": "幼儿园中班团队合作第 7 题：小组合作开展“通力协作搭建一座宏伟壮观的木积木城堡” 🏰 活动，要想作品大获成功，成员间应如何配合？"
    },
    "illustration": "🏰 🧱 🤝",
    "illustrationSubtitle": {
      "th": "การทำงานเป็นทีม: ร่วมมือแบ่งหน้าที่และรับฟัง",
      "en": "Teamwork: Divide roles, listen, and cooperate",
      "zh": "团队协同合作：明确分工、互相包容倾听"
    },
    "options": [
      {
        "id": "opt-k2-soc-m7-1",
        "label": {
          "th": "แอบทุบปราสาทของเพื่อนร่วมทีมให้พังทลาย",
          "en": "Smash teammates' towers behind their back",
          "zh": "趁同组同学不注意，偷偷一脚踹碎队友刚搭好的侧翼防御塔"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-soc-m7-2",
        "label": {
          "th": "ร่วมมือกัน วางแผนแบ่งหน้าที่ คอยส่งบล็อกไม้ให้กัน และรับฟังความคิดเห็นของเพื่อน 🏰 🤝",
          "en": "Collaborate, divide responsibilities, pass blocks smoothly, and listen to everyone's ideas",
          "zh": "大家友好商议、明确各自搭基座或修塔尖的分工，递送积木，虚心吸纳同伴创意 🏰 🤝"
        },
        "icon": "🏰"
      },
      {
        "id": "opt-k2-soc-m7-3",
        "label": {
          "th": "กักตุนบล็อกไม้ทั้งหมดไว้คนเดียวใต้เก้าอี้",
          "en": "Hoard all blocks under own chair secretly",
          "zh": "把全班所有的积木都霸道地抢塞在自己屁股底下一块不给别人用"
        },
        "icon": "📦"
      }
    ],
    "correctOptionId": "opt-k2-soc-m7-2",
    "explanation": {
      "th": "การทำงานร่วมกันเป็นทีมช่วยให้ผลงานยิ่งใหญ่กว่าการทำคนเดียว และสร้างความภาคภูมิใจร่วมกัน เก่งมากครับ!",
      "en": "Awesome! Cohesive teamwork synchronizes strengths and achieves creative masterworks.",
      "zh": "太棒了！团队合作讲求分工与包容，同心协力才能筑起坚固美丽的宏伟城堡。"
    }
  },
  {
    "id": "k2-soc-m8",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการทำงานเป็นทีมระดับชั้นอนุบาล 2 ชุดที่ 8: ในกิจกรรม \"สร้างปราสาทบล็อกไม้ร่วมกันเป็นกลุ่ม\" 🏰 เพื่อให้ผลงานสำเร็จสวยงาม สมาชิกทุกคนควรปฏิบัติอย่างไร?",
      "en": "K2 Team Collaboration #8: Group activity \"Building a giant block castle together\" 🏰: How should teammates cooperate?",
      "zh": "幼儿园中班团队合作第 8 题：小组合作开展“通力协作搭建一座宏伟壮观的木积木城堡” 🏰 活动，要想作品大获成功，成员间应如何配合？"
    },
    "illustration": "🏰 🧱 🤝",
    "illustrationSubtitle": {
      "th": "การทำงานเป็นทีม: ร่วมมือแบ่งหน้าที่และรับฟัง",
      "en": "Teamwork: Divide roles, listen, and cooperate",
      "zh": "团队协同合作：明确分工、互相包容倾听"
    },
    "options": [
      {
        "id": "opt-k2-soc-m8-1",
        "label": {
          "th": "กักตุนบล็อกไม้ทั้งหมดไว้คนเดียวใต้เก้าอี้",
          "en": "Hoard all blocks under own chair secretly",
          "zh": "把全班所有的积木都霸道地抢塞在自己屁股底下一块不给别人用"
        },
        "icon": "📦"
      },
      {
        "id": "opt-k2-soc-m8-2",
        "label": {
          "th": "แอบทุบปราสาทของเพื่อนร่วมทีมให้พังทลาย",
          "en": "Smash teammates' towers behind their back",
          "zh": "趁同组同学不注意，偷偷一脚踹碎队友刚搭好的侧翼防御塔"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-soc-m8-3",
        "label": {
          "th": "ร่วมมือกัน วางแผนแบ่งหน้าที่ คอยส่งบล็อกไม้ให้กัน และรับฟังความคิดเห็นของเพื่อน 🏰 🤝",
          "en": "Collaborate, divide responsibilities, pass blocks smoothly, and listen to everyone's ideas",
          "zh": "大家友好商议、明确各自搭基座或修塔尖的分工，递送积木，虚心吸纳同伴创意 🏰 🤝"
        },
        "icon": "🏰"
      }
    ],
    "correctOptionId": "opt-k2-soc-m8-3",
    "explanation": {
      "th": "การทำงานร่วมกันเป็นทีมช่วยให้ผลงานยิ่งใหญ่กว่าการทำคนเดียว และสร้างความภาคภูมิใจร่วมกัน เก่งมากครับ!",
      "en": "Awesome! Cohesive teamwork synchronizes strengths and achieves creative masterworks.",
      "zh": "太棒了！团队合作讲求分工与包容，同心协力才能筑起坚固美丽的宏伟城堡。"
    }
  },
  {
    "id": "k2-soc-m9",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการทำงานเป็นทีมระดับชั้นอนุบาล 2 ชุดที่ 9: ในกิจกรรม \"สร้างปราสาทบล็อกไม้ร่วมกันเป็นกลุ่ม\" 🏰 เพื่อให้ผลงานสำเร็จสวยงาม สมาชิกทุกคนควรปฏิบัติอย่างไร?",
      "en": "K2 Team Collaboration #9: Group activity \"Building a giant block castle together\" 🏰: How should teammates cooperate?",
      "zh": "幼儿园中班团队合作第 9 题：小组合作开展“通力协作搭建一座宏伟壮观的木积木城堡” 🏰 活动，要想作品大获成功，成员间应如何配合？"
    },
    "illustration": "🏰 🧱 🤝",
    "illustrationSubtitle": {
      "th": "การทำงานเป็นทีม: ร่วมมือแบ่งหน้าที่และรับฟัง",
      "en": "Teamwork: Divide roles, listen, and cooperate",
      "zh": "团队协同合作：明确分工、互相包容倾听"
    },
    "options": [
      {
        "id": "opt-k2-soc-m9-1",
        "label": {
          "th": "ร่วมมือกัน วางแผนแบ่งหน้าที่ คอยส่งบล็อกไม้ให้กัน และรับฟังความคิดเห็นของเพื่อน 🏰 🤝",
          "en": "Collaborate, divide responsibilities, pass blocks smoothly, and listen to everyone's ideas",
          "zh": "大家友好商议、明确各自搭基座或修塔尖的分工，递送积木，虚心吸纳同伴创意 🏰 🤝"
        },
        "icon": "🏰"
      },
      {
        "id": "opt-k2-soc-m9-2",
        "label": {
          "th": "แอบทุบปราสาทของเพื่อนร่วมทีมให้พังทลาย",
          "en": "Smash teammates' towers behind their back",
          "zh": "趁同组同学不注意，偷偷一脚踹碎队友刚搭好的侧翼防御塔"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-soc-m9-3",
        "label": {
          "th": "กักตุนบล็อกไม้ทั้งหมดไว้คนเดียวใต้เก้าอี้",
          "en": "Hoard all blocks under own chair secretly",
          "zh": "把全班所有的积木都霸道地抢塞在自己屁股底下一块不给别人用"
        },
        "icon": "📦"
      }
    ],
    "correctOptionId": "opt-k2-soc-m9-1",
    "explanation": {
      "th": "การทำงานร่วมกันเป็นทีมช่วยให้ผลงานยิ่งใหญ่กว่าการทำคนเดียว และสร้างความภาคภูมิใจร่วมกัน เก่งมากครับ!",
      "en": "Awesome! Cohesive teamwork synchronizes strengths and achieves creative masterworks.",
      "zh": "太棒了！团队合作讲求分工与包容，同心协力才能筑起坚固美丽的宏伟城堡。"
    }
  },
  {
    "id": "k2-soc-m10",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ทักษะการทำงานเป็นทีมระดับชั้นอนุบาล 2 ชุดที่ 10: ในกิจกรรม \"สร้างปราสาทบล็อกไม้ร่วมกันเป็นกลุ่ม\" 🏰 เพื่อให้ผลงานสำเร็จสวยงาม สมาชิกทุกคนควรปฏิบัติอย่างไร?",
      "en": "K2 Team Collaboration #10: Group activity \"Building a giant block castle together\" 🏰: How should teammates cooperate?",
      "zh": "幼儿园中班团队合作第 10 题：小组合作开展“通力协作搭建一座宏伟壮观的木积木城堡” 🏰 活动，要想作品大获成功，成员间应如何配合？"
    },
    "illustration": "🏰 🧱 🤝",
    "illustrationSubtitle": {
      "th": "การทำงานเป็นทีม: ร่วมมือแบ่งหน้าที่และรับฟัง",
      "en": "Teamwork: Divide roles, listen, and cooperate",
      "zh": "团队协同合作：明确分工、互相包容倾听"
    },
    "options": [
      {
        "id": "opt-k2-soc-m10-1",
        "label": {
          "th": "แอบทุบปราสาทของเพื่อนร่วมทีมให้พังทลาย",
          "en": "Smash teammates' towers behind their back",
          "zh": "趁同组同学不注意，偷偷一脚踹碎队友刚搭好的侧翼防御塔"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k2-soc-m10-2",
        "label": {
          "th": "ร่วมมือกัน วางแผนแบ่งหน้าที่ คอยส่งบล็อกไม้ให้กัน และรับฟังความคิดเห็นของเพื่อน 🏰 🤝",
          "en": "Collaborate, divide responsibilities, pass blocks smoothly, and listen to everyone's ideas",
          "zh": "大家友好商议、明确各自搭基座或修塔尖的分工，递送积木，虚心吸纳同伴创意 🏰 🤝"
        },
        "icon": "🏰"
      },
      {
        "id": "opt-k2-soc-m10-3",
        "label": {
          "th": "กักตุนบล็อกไม้ทั้งหมดไว้คนเดียวใต้เก้าอี้",
          "en": "Hoard all blocks under own chair secretly",
          "zh": "把全班所有的积木都霸道地抢塞在自己屁股底下一块不给别人用"
        },
        "icon": "📦"
      }
    ],
    "correctOptionId": "opt-k2-soc-m10-2",
    "explanation": {
      "th": "การทำงานร่วมกันเป็นทีมช่วยให้ผลงานยิ่งใหญ่กว่าการทำคนเดียว และสร้างความภาคภูมิใจร่วมกัน เก่งมากครับ!",
      "en": "Awesome! Cohesive teamwork synchronizes strengths and achieves creative masterworks.",
      "zh": "太棒了！团队合作讲求分工与包容，同心协力才能筑起坚固美丽的宏伟城堡。"
    }
  },
  {
    "id": "k2-soc-h1",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "การเคารพความแตกต่างหลากหลายระดับชั้นอนุบาล 2 ชุดที่ 1: เมื่อมีเพื่อนร่วมห้องที่มี \"สีผิว สำเนียงภาษา หรือการแต่งกายตามวัฒนธรรมที่ไม่เหมือนเรา\" 🌍 ทัศนคติที่ถูกต้องคือข้อใด?",
      "en": "K2 Respecting Diversity #1: A peer has a DIFFERENT skin tone, accent, or cultural clothing 🌍: What is the respectful attitude?",
      "zh": "幼儿园中班包容多元素养第 1 题：班级里有新来的少数民族或外国小朋友，其“肤色发色、方言口音或民族特色服饰与大家不同” 🌍，应抱持怎样的胸怀？"
    },
    "illustration": "🌍 🤝 🌈",
    "illustrationSubtitle": {
      "th": "การยอมรับและเคารพความแตกต่างหลากหลาย (Diversity & Inclusion)",
      "en": "Embracing diversity and cultural inclusion",
      "zh": "多元包容素养：尊重并接纳多元文化与差异"
    },
    "options": [
      {
        "id": "opt-k2-soc-h1-1",
        "label": {
          "th": "โยนสีดำปาใส่เสื้อผ้าเพื่อนเพื่อลบความต่าง",
          "en": "Throw black paint ruining their clothes",
          "zh": "用黑色水彩去故意泼洒弄脏对方的传统节日民族服装"
        },
        "icon": "🎨"
      },
      {
        "id": "opt-k2-soc-h1-2",
        "label": {
          "th": "ชี้หน้าหัวเราะเยาะและรวมกลุ่มกีดกันไม่คุยด้วย",
          "en": "Point, laugh, and form exclusionary cliques",
          "zh": "聚在一起对他指指点点、嘲笑其外貌口音，并在班里搞小团体孤立他"
        },
        "icon": "🙅"
      },
      {
        "id": "opt-k2-soc-h1-3",
        "label": {
          "th": "เคารพ ให้เกียรติ ยิ้มแย้มต้อนรับ และเรียนรู้วัฒนธรรมที่งดงามร่วมกันอย่างเท่าเทียม 🌍 🤝",
          "en": "Respect, welcome warmly, and appreciate learning about beautiful cultural heritage together",
          "zh": "怀揣平等与尊重，热情微笑接纳为好伙伴，共同领略多元文化的奇妙与斑斓魅力 🌍 🤝"
        },
        "icon": "🌍"
      }
    ],
    "correctOptionId": "opt-k2-soc-h1-3",
    "explanation": {
      "th": "ความหลากหลายทำให้โลกนี้งดงาม มนุษย์ทุกคนมีคุณค่าและศักดิ์ศรีความเป็นมนุษย์เท่าเทียมกัน เก่งมากครับ!",
      "en": "Spot on! Respecting cultural diversity enriches human empathy and worldly wisdom.",
      "zh": "答对了！大千世界因多元差异而丰富多彩，尊重每一种民族文化是现代文明的基石。"
    }
  },
  {
    "id": "k2-soc-h2",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "การเคารพความแตกต่างหลากหลายระดับชั้นอนุบาล 2 ชุดที่ 2: เมื่อมีเพื่อนร่วมห้องที่มี \"สีผิว สำเนียงภาษา หรือการแต่งกายตามวัฒนธรรมที่ไม่เหมือนเรา\" 🌍 ทัศนคติที่ถูกต้องคือข้อใด?",
      "en": "K2 Respecting Diversity #2: A peer has a DIFFERENT skin tone, accent, or cultural clothing 🌍: What is the respectful attitude?",
      "zh": "幼儿园中班包容多元素养第 2 题：班级里有新来的少数民族或外国小朋友，其“肤色发色、方言口音或民族特色服饰与大家不同” 🌍，应抱持怎样的胸怀？"
    },
    "illustration": "🌍 🤝 🌈",
    "illustrationSubtitle": {
      "th": "การยอมรับและเคารพความแตกต่างหลากหลาย (Diversity & Inclusion)",
      "en": "Embracing diversity and cultural inclusion",
      "zh": "多元包容素养：尊重并接纳多元文化与差异"
    },
    "options": [
      {
        "id": "opt-k2-soc-h2-1",
        "label": {
          "th": "เคารพ ให้เกียรติ ยิ้มแย้มต้อนรับ และเรียนรู้วัฒนธรรมที่งดงามร่วมกันอย่างเท่าเทียม 🌍 🤝",
          "en": "Respect, welcome warmly, and appreciate learning about beautiful cultural heritage together",
          "zh": "怀揣平等与尊重，热情微笑接纳为好伙伴，共同领略多元文化的奇妙与斑斓魅力 🌍 🤝"
        },
        "icon": "🌍"
      },
      {
        "id": "opt-k2-soc-h2-2",
        "label": {
          "th": "ชี้หน้าหัวเราะเยาะและรวมกลุ่มกีดกันไม่คุยด้วย",
          "en": "Point, laugh, and form exclusionary cliques",
          "zh": "聚在一起对他指指点点、嘲笑其外貌口音，并在班里搞小团体孤立他"
        },
        "icon": "🙅"
      },
      {
        "id": "opt-k2-soc-h2-3",
        "label": {
          "th": "โยนสีดำปาใส่เสื้อผ้าเพื่อนเพื่อลบความต่าง",
          "en": "Throw black paint ruining their clothes",
          "zh": "用黑色水彩去故意泼洒弄脏对方的传统节日民族服装"
        },
        "icon": "🎨"
      }
    ],
    "correctOptionId": "opt-k2-soc-h2-1",
    "explanation": {
      "th": "ความหลากหลายทำให้โลกนี้งดงาม มนุษย์ทุกคนมีคุณค่าและศักดิ์ศรีความเป็นมนุษย์เท่าเทียมกัน เก่งมากครับ!",
      "en": "Spot on! Respecting cultural diversity enriches human empathy and worldly wisdom.",
      "zh": "答对了！大千世界因多元差异而丰富多彩，尊重每一种民族文化是现代文明的基石。"
    }
  },
  {
    "id": "k2-soc-h3",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "การเคารพความแตกต่างหลากหลายระดับชั้นอนุบาล 2 ชุดที่ 3: เมื่อมีเพื่อนร่วมห้องที่มี \"สีผิว สำเนียงภาษา หรือการแต่งกายตามวัฒนธรรมที่ไม่เหมือนเรา\" 🌍 ทัศนคติที่ถูกต้องคือข้อใด?",
      "en": "K2 Respecting Diversity #3: A peer has a DIFFERENT skin tone, accent, or cultural clothing 🌍: What is the respectful attitude?",
      "zh": "幼儿园中班包容多元素养第 3 题：班级里有新来的少数民族或外国小朋友，其“肤色发色、方言口音或民族特色服饰与大家不同” 🌍，应抱持怎样的胸怀？"
    },
    "illustration": "🌍 🤝 🌈",
    "illustrationSubtitle": {
      "th": "การยอมรับและเคารพความแตกต่างหลากหลาย (Diversity & Inclusion)",
      "en": "Embracing diversity and cultural inclusion",
      "zh": "多元包容素养：尊重并接纳多元文化与差异"
    },
    "options": [
      {
        "id": "opt-k2-soc-h3-1",
        "label": {
          "th": "ชี้หน้าหัวเราะเยาะและรวมกลุ่มกีดกันไม่คุยด้วย",
          "en": "Point, laugh, and form exclusionary cliques",
          "zh": "聚在一起对他指指点点、嘲笑其外貌口音，并在班里搞小团体孤立他"
        },
        "icon": "🙅"
      },
      {
        "id": "opt-k2-soc-h3-2",
        "label": {
          "th": "เคารพ ให้เกียรติ ยิ้มแย้มต้อนรับ และเรียนรู้วัฒนธรรมที่งดงามร่วมกันอย่างเท่าเทียม 🌍 🤝",
          "en": "Respect, welcome warmly, and appreciate learning about beautiful cultural heritage together",
          "zh": "怀揣平等与尊重，热情微笑接纳为好伙伴，共同领略多元文化的奇妙与斑斓魅力 🌍 🤝"
        },
        "icon": "🌍"
      },
      {
        "id": "opt-k2-soc-h3-3",
        "label": {
          "th": "โยนสีดำปาใส่เสื้อผ้าเพื่อนเพื่อลบความต่าง",
          "en": "Throw black paint ruining their clothes",
          "zh": "用黑色水彩去故意泼洒弄脏对方的传统节日民族服装"
        },
        "icon": "🎨"
      }
    ],
    "correctOptionId": "opt-k2-soc-h3-2",
    "explanation": {
      "th": "ความหลากหลายทำให้โลกนี้งดงาม มนุษย์ทุกคนมีคุณค่าและศักดิ์ศรีความเป็นมนุษย์เท่าเทียมกัน เก่งมากครับ!",
      "en": "Spot on! Respecting cultural diversity enriches human empathy and worldly wisdom.",
      "zh": "答对了！大千世界因多元差异而丰富多彩，尊重每一种民族文化是现代文明的基石。"
    }
  },
  {
    "id": "k2-soc-h4",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "การเคารพความแตกต่างหลากหลายระดับชั้นอนุบาล 2 ชุดที่ 4: เมื่อมีเพื่อนร่วมห้องที่มี \"สีผิว สำเนียงภาษา หรือการแต่งกายตามวัฒนธรรมที่ไม่เหมือนเรา\" 🌍 ทัศนคติที่ถูกต้องคือข้อใด?",
      "en": "K2 Respecting Diversity #4: A peer has a DIFFERENT skin tone, accent, or cultural clothing 🌍: What is the respectful attitude?",
      "zh": "幼儿园中班包容多元素养第 4 题：班级里有新来的少数民族或外国小朋友，其“肤色发色、方言口音或民族特色服饰与大家不同” 🌍，应抱持怎样的胸怀？"
    },
    "illustration": "🌍 🤝 🌈",
    "illustrationSubtitle": {
      "th": "การยอมรับและเคารพความแตกต่างหลากหลาย (Diversity & Inclusion)",
      "en": "Embracing diversity and cultural inclusion",
      "zh": "多元包容素养：尊重并接纳多元文化与差异"
    },
    "options": [
      {
        "id": "opt-k2-soc-h4-1",
        "label": {
          "th": "โยนสีดำปาใส่เสื้อผ้าเพื่อนเพื่อลบความต่าง",
          "en": "Throw black paint ruining their clothes",
          "zh": "用黑色水彩去故意泼洒弄脏对方的传统节日民族服装"
        },
        "icon": "🎨"
      },
      {
        "id": "opt-k2-soc-h4-2",
        "label": {
          "th": "ชี้หน้าหัวเราะเยาะและรวมกลุ่มกีดกันไม่คุยด้วย",
          "en": "Point, laugh, and form exclusionary cliques",
          "zh": "聚在一起对他指指点点、嘲笑其外貌口音，并在班里搞小团体孤立他"
        },
        "icon": "🙅"
      },
      {
        "id": "opt-k2-soc-h4-3",
        "label": {
          "th": "เคารพ ให้เกียรติ ยิ้มแย้มต้อนรับ และเรียนรู้วัฒนธรรมที่งดงามร่วมกันอย่างเท่าเทียม 🌍 🤝",
          "en": "Respect, welcome warmly, and appreciate learning about beautiful cultural heritage together",
          "zh": "怀揣平等与尊重，热情微笑接纳为好伙伴，共同领略多元文化的奇妙与斑斓魅力 🌍 🤝"
        },
        "icon": "🌍"
      }
    ],
    "correctOptionId": "opt-k2-soc-h4-3",
    "explanation": {
      "th": "ความหลากหลายทำให้โลกนี้งดงาม มนุษย์ทุกคนมีคุณค่าและศักดิ์ศรีความเป็นมนุษย์เท่าเทียมกัน เก่งมากครับ!",
      "en": "Spot on! Respecting cultural diversity enriches human empathy and worldly wisdom.",
      "zh": "答对了！大千世界因多元差异而丰富多彩，尊重每一种民族文化是现代文明的基石。"
    }
  },
  {
    "id": "k2-soc-h5",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "การเคารพความแตกต่างหลากหลายระดับชั้นอนุบาล 2 ชุดที่ 5: เมื่อมีเพื่อนร่วมห้องที่มี \"สีผิว สำเนียงภาษา หรือการแต่งกายตามวัฒนธรรมที่ไม่เหมือนเรา\" 🌍 ทัศนคติที่ถูกต้องคือข้อใด?",
      "en": "K2 Respecting Diversity #5: A peer has a DIFFERENT skin tone, accent, or cultural clothing 🌍: What is the respectful attitude?",
      "zh": "幼儿园中班包容多元素养第 5 题：班级里有新来的少数民族或外国小朋友，其“肤色发色、方言口音或民族特色服饰与大家不同” 🌍，应抱持怎样的胸怀？"
    },
    "illustration": "🌍 🤝 🌈",
    "illustrationSubtitle": {
      "th": "การยอมรับและเคารพความแตกต่างหลากหลาย (Diversity & Inclusion)",
      "en": "Embracing diversity and cultural inclusion",
      "zh": "多元包容素养：尊重并接纳多元文化与差异"
    },
    "options": [
      {
        "id": "opt-k2-soc-h5-1",
        "label": {
          "th": "เคารพ ให้เกียรติ ยิ้มแย้มต้อนรับ และเรียนรู้วัฒนธรรมที่งดงามร่วมกันอย่างเท่าเทียม 🌍 🤝",
          "en": "Respect, welcome warmly, and appreciate learning about beautiful cultural heritage together",
          "zh": "怀揣平等与尊重，热情微笑接纳为好伙伴，共同领略多元文化的奇妙与斑斓魅力 🌍 🤝"
        },
        "icon": "🌍"
      },
      {
        "id": "opt-k2-soc-h5-2",
        "label": {
          "th": "ชี้หน้าหัวเราะเยาะและรวมกลุ่มกีดกันไม่คุยด้วย",
          "en": "Point, laugh, and form exclusionary cliques",
          "zh": "聚在一起对他指指点点、嘲笑其外貌口音，并在班里搞小团体孤立他"
        },
        "icon": "🙅"
      },
      {
        "id": "opt-k2-soc-h5-3",
        "label": {
          "th": "โยนสีดำปาใส่เสื้อผ้าเพื่อนเพื่อลบความต่าง",
          "en": "Throw black paint ruining their clothes",
          "zh": "用黑色水彩去故意泼洒弄脏对方的传统节日民族服装"
        },
        "icon": "🎨"
      }
    ],
    "correctOptionId": "opt-k2-soc-h5-1",
    "explanation": {
      "th": "ความหลากหลายทำให้โลกนี้งดงาม มนุษย์ทุกคนมีคุณค่าและศักดิ์ศรีความเป็นมนุษย์เท่าเทียมกัน เก่งมากครับ!",
      "en": "Spot on! Respecting cultural diversity enriches human empathy and worldly wisdom.",
      "zh": "答对了！大千世界因多元差异而丰富多彩，尊重每一种民族文化是现代文明的基石。"
    }
  },
  {
    "id": "k2-soc-h6",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "การเคารพความแตกต่างหลากหลายระดับชั้นอนุบาล 2 ชุดที่ 6: เมื่อมีเพื่อนร่วมห้องที่มี \"สีผิว สำเนียงภาษา หรือการแต่งกายตามวัฒนธรรมที่ไม่เหมือนเรา\" 🌍 ทัศนคติที่ถูกต้องคือข้อใด?",
      "en": "K2 Respecting Diversity #6: A peer has a DIFFERENT skin tone, accent, or cultural clothing 🌍: What is the respectful attitude?",
      "zh": "幼儿园中班包容多元素养第 6 题：班级里有新来的少数民族或外国小朋友，其“肤色发色、方言口音或民族特色服饰与大家不同” 🌍，应抱持怎样的胸怀？"
    },
    "illustration": "🌍 🤝 🌈",
    "illustrationSubtitle": {
      "th": "การยอมรับและเคารพความแตกต่างหลากหลาย (Diversity & Inclusion)",
      "en": "Embracing diversity and cultural inclusion",
      "zh": "多元包容素养：尊重并接纳多元文化与差异"
    },
    "options": [
      {
        "id": "opt-k2-soc-h6-1",
        "label": {
          "th": "ชี้หน้าหัวเราะเยาะและรวมกลุ่มกีดกันไม่คุยด้วย",
          "en": "Point, laugh, and form exclusionary cliques",
          "zh": "聚在一起对他指指点点、嘲笑其外貌口音，并在班里搞小团体孤立他"
        },
        "icon": "🙅"
      },
      {
        "id": "opt-k2-soc-h6-2",
        "label": {
          "th": "เคารพ ให้เกียรติ ยิ้มแย้มต้อนรับ และเรียนรู้วัฒนธรรมที่งดงามร่วมกันอย่างเท่าเทียม 🌍 🤝",
          "en": "Respect, welcome warmly, and appreciate learning about beautiful cultural heritage together",
          "zh": "怀揣平等与尊重，热情微笑接纳为好伙伴，共同领略多元文化的奇妙与斑斓魅力 🌍 🤝"
        },
        "icon": "🌍"
      },
      {
        "id": "opt-k2-soc-h6-3",
        "label": {
          "th": "โยนสีดำปาใส่เสื้อผ้าเพื่อนเพื่อลบความต่าง",
          "en": "Throw black paint ruining their clothes",
          "zh": "用黑色水彩去故意泼洒弄脏对方的传统节日民族服装"
        },
        "icon": "🎨"
      }
    ],
    "correctOptionId": "opt-k2-soc-h6-2",
    "explanation": {
      "th": "ความหลากหลายทำให้โลกนี้งดงาม มนุษย์ทุกคนมีคุณค่าและศักดิ์ศรีความเป็นมนุษย์เท่าเทียมกัน เก่งมากครับ!",
      "en": "Spot on! Respecting cultural diversity enriches human empathy and worldly wisdom.",
      "zh": "答对了！大千世界因多元差异而丰富多彩，尊重每一种民族文化是现代文明的基石。"
    }
  },
  {
    "id": "k2-soc-h7",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "การเคารพความแตกต่างหลากหลายระดับชั้นอนุบาล 2 ชุดที่ 7: เมื่อมีเพื่อนร่วมห้องที่มี \"สีผิว สำเนียงภาษา หรือการแต่งกายตามวัฒนธรรมที่ไม่เหมือนเรา\" 🌍 ทัศนคติที่ถูกต้องคือข้อใด?",
      "en": "K2 Respecting Diversity #7: A peer has a DIFFERENT skin tone, accent, or cultural clothing 🌍: What is the respectful attitude?",
      "zh": "幼儿园中班包容多元素养第 7 题：班级里有新来的少数民族或外国小朋友，其“肤色发色、方言口音或民族特色服饰与大家不同” 🌍，应抱持怎样的胸怀？"
    },
    "illustration": "🌍 🤝 🌈",
    "illustrationSubtitle": {
      "th": "การยอมรับและเคารพความแตกต่างหลากหลาย (Diversity & Inclusion)",
      "en": "Embracing diversity and cultural inclusion",
      "zh": "多元包容素养：尊重并接纳多元文化与差异"
    },
    "options": [
      {
        "id": "opt-k2-soc-h7-1",
        "label": {
          "th": "โยนสีดำปาใส่เสื้อผ้าเพื่อนเพื่อลบความต่าง",
          "en": "Throw black paint ruining their clothes",
          "zh": "用黑色水彩去故意泼洒弄脏对方的传统节日民族服装"
        },
        "icon": "🎨"
      },
      {
        "id": "opt-k2-soc-h7-2",
        "label": {
          "th": "ชี้หน้าหัวเราะเยาะและรวมกลุ่มกีดกันไม่คุยด้วย",
          "en": "Point, laugh, and form exclusionary cliques",
          "zh": "聚在一起对他指指点点、嘲笑其外貌口音，并在班里搞小团体孤立他"
        },
        "icon": "🙅"
      },
      {
        "id": "opt-k2-soc-h7-3",
        "label": {
          "th": "เคารพ ให้เกียรติ ยิ้มแย้มต้อนรับ และเรียนรู้วัฒนธรรมที่งดงามร่วมกันอย่างเท่าเทียม 🌍 🤝",
          "en": "Respect, welcome warmly, and appreciate learning about beautiful cultural heritage together",
          "zh": "怀揣平等与尊重，热情微笑接纳为好伙伴，共同领略多元文化的奇妙与斑斓魅力 🌍 🤝"
        },
        "icon": "🌍"
      }
    ],
    "correctOptionId": "opt-k2-soc-h7-3",
    "explanation": {
      "th": "ความหลากหลายทำให้โลกนี้งดงาม มนุษย์ทุกคนมีคุณค่าและศักดิ์ศรีความเป็นมนุษย์เท่าเทียมกัน เก่งมากครับ!",
      "en": "Spot on! Respecting cultural diversity enriches human empathy and worldly wisdom.",
      "zh": "答对了！大千世界因多元差异而丰富多彩，尊重每一种民族文化是现代文明的基石。"
    }
  },
  {
    "id": "k2-soc-h8",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "การเคารพความแตกต่างหลากหลายระดับชั้นอนุบาล 2 ชุดที่ 8: เมื่อมีเพื่อนร่วมห้องที่มี \"สีผิว สำเนียงภาษา หรือการแต่งกายตามวัฒนธรรมที่ไม่เหมือนเรา\" 🌍 ทัศนคติที่ถูกต้องคือข้อใด?",
      "en": "K2 Respecting Diversity #8: A peer has a DIFFERENT skin tone, accent, or cultural clothing 🌍: What is the respectful attitude?",
      "zh": "幼儿园中班包容多元素养第 8 题：班级里有新来的少数民族或外国小朋友，其“肤色发色、方言口音或民族特色服饰与大家不同” 🌍，应抱持怎样的胸怀？"
    },
    "illustration": "🌍 🤝 🌈",
    "illustrationSubtitle": {
      "th": "การยอมรับและเคารพความแตกต่างหลากหลาย (Diversity & Inclusion)",
      "en": "Embracing diversity and cultural inclusion",
      "zh": "多元包容素养：尊重并接纳多元文化与差异"
    },
    "options": [
      {
        "id": "opt-k2-soc-h8-1",
        "label": {
          "th": "เคารพ ให้เกียรติ ยิ้มแย้มต้อนรับ และเรียนรู้วัฒนธรรมที่งดงามร่วมกันอย่างเท่าเทียม 🌍 🤝",
          "en": "Respect, welcome warmly, and appreciate learning about beautiful cultural heritage together",
          "zh": "怀揣平等与尊重，热情微笑接纳为好伙伴，共同领略多元文化的奇妙与斑斓魅力 🌍 🤝"
        },
        "icon": "🌍"
      },
      {
        "id": "opt-k2-soc-h8-2",
        "label": {
          "th": "ชี้หน้าหัวเราะเยาะและรวมกลุ่มกีดกันไม่คุยด้วย",
          "en": "Point, laugh, and form exclusionary cliques",
          "zh": "聚在一起对他指指点点、嘲笑其外貌口音，并在班里搞小团体孤立他"
        },
        "icon": "🙅"
      },
      {
        "id": "opt-k2-soc-h8-3",
        "label": {
          "th": "โยนสีดำปาใส่เสื้อผ้าเพื่อนเพื่อลบความต่าง",
          "en": "Throw black paint ruining their clothes",
          "zh": "用黑色水彩去故意泼洒弄脏对方的传统节日民族服装"
        },
        "icon": "🎨"
      }
    ],
    "correctOptionId": "opt-k2-soc-h8-1",
    "explanation": {
      "th": "ความหลากหลายทำให้โลกนี้งดงาม มนุษย์ทุกคนมีคุณค่าและศักดิ์ศรีความเป็นมนุษย์เท่าเทียมกัน เก่งมากครับ!",
      "en": "Spot on! Respecting cultural diversity enriches human empathy and worldly wisdom.",
      "zh": "答对了！大千世界因多元差异而丰富多彩，尊重每一种民族文化是现代文明的基石。"
    }
  },
  {
    "id": "k2-soc-h9",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "การเคารพความแตกต่างหลากหลายระดับชั้นอนุบาล 2 ชุดที่ 9: เมื่อมีเพื่อนร่วมห้องที่มี \"สีผิว สำเนียงภาษา หรือการแต่งกายตามวัฒนธรรมที่ไม่เหมือนเรา\" 🌍 ทัศนคติที่ถูกต้องคือข้อใด?",
      "en": "K2 Respecting Diversity #9: A peer has a DIFFERENT skin tone, accent, or cultural clothing 🌍: What is the respectful attitude?",
      "zh": "幼儿园中班包容多元素养第 9 题：班级里有新来的少数民族或外国小朋友，其“肤色发色、方言口音或民族特色服饰与大家不同” 🌍，应抱持怎样的胸怀？"
    },
    "illustration": "🌍 🤝 🌈",
    "illustrationSubtitle": {
      "th": "การยอมรับและเคารพความแตกต่างหลากหลาย (Diversity & Inclusion)",
      "en": "Embracing diversity and cultural inclusion",
      "zh": "多元包容素养：尊重并接纳多元文化与差异"
    },
    "options": [
      {
        "id": "opt-k2-soc-h9-1",
        "label": {
          "th": "ชี้หน้าหัวเราะเยาะและรวมกลุ่มกีดกันไม่คุยด้วย",
          "en": "Point, laugh, and form exclusionary cliques",
          "zh": "聚在一起对他指指点点、嘲笑其外貌口音，并在班里搞小团体孤立他"
        },
        "icon": "🙅"
      },
      {
        "id": "opt-k2-soc-h9-2",
        "label": {
          "th": "เคารพ ให้เกียรติ ยิ้มแย้มต้อนรับ และเรียนรู้วัฒนธรรมที่งดงามร่วมกันอย่างเท่าเทียม 🌍 🤝",
          "en": "Respect, welcome warmly, and appreciate learning about beautiful cultural heritage together",
          "zh": "怀揣平等与尊重，热情微笑接纳为好伙伴，共同领略多元文化的奇妙与斑斓魅力 🌍 🤝"
        },
        "icon": "🌍"
      },
      {
        "id": "opt-k2-soc-h9-3",
        "label": {
          "th": "โยนสีดำปาใส่เสื้อผ้าเพื่อนเพื่อลบความต่าง",
          "en": "Throw black paint ruining their clothes",
          "zh": "用黑色水彩去故意泼洒弄脏对方的传统节日民族服装"
        },
        "icon": "🎨"
      }
    ],
    "correctOptionId": "opt-k2-soc-h9-2",
    "explanation": {
      "th": "ความหลากหลายทำให้โลกนี้งดงาม มนุษย์ทุกคนมีคุณค่าและศักดิ์ศรีความเป็นมนุษย์เท่าเทียมกัน เก่งมากครับ!",
      "en": "Spot on! Respecting cultural diversity enriches human empathy and worldly wisdom.",
      "zh": "答对了！大千世界因多元差异而丰富多彩，尊重每一种民族文化是现代文明的基石。"
    }
  },
  {
    "id": "k2-soc-h10",
    "grade": "K2",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "การเคารพความแตกต่างหลากหลายระดับชั้นอนุบาล 2 ชุดที่ 10: เมื่อมีเพื่อนร่วมห้องที่มี \"สีผิว สำเนียงภาษา หรือการแต่งกายตามวัฒนธรรมที่ไม่เหมือนเรา\" 🌍 ทัศนคติที่ถูกต้องคือข้อใด?",
      "en": "K2 Respecting Diversity #10: A peer has a DIFFERENT skin tone, accent, or cultural clothing 🌍: What is the respectful attitude?",
      "zh": "幼儿园中班包容多元素养第 10 题：班级里有新来的少数民族或外国小朋友，其“肤色发色、方言口音或民族特色服饰与大家不同” 🌍，应抱持怎样的胸怀？"
    },
    "illustration": "🌍 🤝 🌈",
    "illustrationSubtitle": {
      "th": "การยอมรับและเคารพความแตกต่างหลากหลาย (Diversity & Inclusion)",
      "en": "Embracing diversity and cultural inclusion",
      "zh": "多元包容素养：尊重并接纳多元文化与差异"
    },
    "options": [
      {
        "id": "opt-k2-soc-h10-1",
        "label": {
          "th": "โยนสีดำปาใส่เสื้อผ้าเพื่อนเพื่อลบความต่าง",
          "en": "Throw black paint ruining their clothes",
          "zh": "用黑色水彩去故意泼洒弄脏对方的传统节日民族服装"
        },
        "icon": "🎨"
      },
      {
        "id": "opt-k2-soc-h10-2",
        "label": {
          "th": "ชี้หน้าหัวเราะเยาะและรวมกลุ่มกีดกันไม่คุยด้วย",
          "en": "Point, laugh, and form exclusionary cliques",
          "zh": "聚在一起对他指指点点、嘲笑其外貌口音，并在班里搞小团体孤立他"
        },
        "icon": "🙅"
      },
      {
        "id": "opt-k2-soc-h10-3",
        "label": {
          "th": "เคารพ ให้เกียรติ ยิ้มแย้มต้อนรับ และเรียนรู้วัฒนธรรมที่งดงามร่วมกันอย่างเท่าเทียม 🌍 🤝",
          "en": "Respect, welcome warmly, and appreciate learning about beautiful cultural heritage together",
          "zh": "怀揣平等与尊重，热情微笑接纳为好伙伴，共同领略多元文化的奇妙与斑斓魅力 🌍 🤝"
        },
        "icon": "🌍"
      }
    ],
    "correctOptionId": "opt-k2-soc-h10-3",
    "explanation": {
      "th": "ความหลากหลายทำให้โลกนี้งดงาม มนุษย์ทุกคนมีคุณค่าและศักดิ์ศรีความเป็นมนุษย์เท่าเทียมกัน เก่งมากครับ!",
      "en": "Spot on! Respecting cultural diversity enriches human empathy and worldly wisdom.",
      "zh": "答对了！大千世界因多元差异而丰富多彩，尊重每一种民族文化是现代文明的基石。"
    }
  },
  {
    "id": "k3-soc-e1",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การมีวินัยในตนเองระดับชั้นอนุบาล 3 ชุดที่ 1: เมื่อเล่นของเล่นเสร็จแล้วหรือทำงานศิลปะเสร็จเรียบร้อย 🎨 🧸 หน้าที่และความรับผิดชอบของเด็กที่ดีคือข้อใด?",
      "en": "K3 Personal Responsibility #1: Finished playing with toys or completing art projects 🎨 🧸: What is your civic duty?",
      "zh": "幼儿园大班自我责任素养第 1 题：在区角活动中玩完积木玩具或美工课完成剪纸贴画 🎨 🧸 之后，优秀少年应具备的主动责任习惯是？"
    },
    "illustration": "🧸 📦 🧹",
    "illustrationSubtitle": {
      "th": "ความรับผิดชอบต่อตนเอง: การเก็บของเล่นเข้าที่",
      "en": "Taking responsibility: Clean up and pack toys",
      "zh": "自律好习惯：主动收拾整理物品归位"
    },
    "options": [
      {
        "id": "opt-k3-soc-e1-1",
        "label": {
          "th": "เก็บของเล่นและอุปกรณ์เข้ากล่อง คืนที่เดิมให้เป็นระเบียบเรียบร้อย และทำความสะอาดโต๊ะ 📦 🧹",
          "en": "Pack toys and tools neatly into designated bins, wipe table, and tidy workspace",
          "zh": "主动把玩具与画具分门别类整齐收纳归位进储物箱，擦净桌面纸屑垃圾 📦 🧹"
        },
        "icon": "📦"
      },
      {
        "id": "opt-k3-soc-e1-2",
        "label": {
          "th": "ทิ้งเกลื่อนกลาดไว้เต็มพื้นห้องแล้ววิ่งหนีไปเล่นอย่างอื่น",
          "en": "Leave mess strewn across floor and run away",
          "zh": "不管不顾随手扔得满地都是杂物，自己拍拍屁股飞奔跑开"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k3-soc-e1-3",
        "label": {
          "th": "สั่งให้คุณครูเป็นคนมาคอยก้มเก็บกวาดให้แทน",
          "en": "Boss teachers around to clean up after them",
          "zh": "把两手一插，像小皇帝一样吆喝命令老师蹲在地上替自己善后"
        },
        "icon": "😤"
      }
    ],
    "correctOptionId": "opt-k3-soc-e1-1",
    "explanation": {
      "th": "การรับผิดชอบเก็บของของตนเองเป็นการฝึกวินัยและความเป็นผู้ใหญ่ที่น่าชื่นชม เก่งมากครับ!",
      "en": "Correct! Tidying up personal materials develops lifelong conscientious accountability.",
      "zh": "答对了！自己的玩具自己收、物归原位爱整洁，是迈入小学阶段最重要的自理自律能力。"
    }
  },
  {
    "id": "k3-soc-e2",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การมีวินัยในตนเองระดับชั้นอนุบาล 3 ชุดที่ 2: เมื่อเล่นของเล่นเสร็จแล้วหรือทำงานศิลปะเสร็จเรียบร้อย 🎨 🧸 หน้าที่และความรับผิดชอบของเด็กที่ดีคือข้อใด?",
      "en": "K3 Personal Responsibility #2: Finished playing with toys or completing art projects 🎨 🧸: What is your civic duty?",
      "zh": "幼儿园大班自我责任素养第 2 题：在区角活动中玩完积木玩具或美工课完成剪纸贴画 🎨 🧸 之后，优秀少年应具备的主动责任习惯是？"
    },
    "illustration": "🧸 📦 🧹",
    "illustrationSubtitle": {
      "th": "ความรับผิดชอบต่อตนเอง: การเก็บของเล่นเข้าที่",
      "en": "Taking responsibility: Clean up and pack toys",
      "zh": "自律好习惯：主动收拾整理物品归位"
    },
    "options": [
      {
        "id": "opt-k3-soc-e2-1",
        "label": {
          "th": "ทิ้งเกลื่อนกลาดไว้เต็มพื้นห้องแล้ววิ่งหนีไปเล่นอย่างอื่น",
          "en": "Leave mess strewn across floor and run away",
          "zh": "不管不顾随手扔得满地都是杂物，自己拍拍屁股飞奔跑开"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k3-soc-e2-2",
        "label": {
          "th": "เก็บของเล่นและอุปกรณ์เข้ากล่อง คืนที่เดิมให้เป็นระเบียบเรียบร้อย และทำความสะอาดโต๊ะ 📦 🧹",
          "en": "Pack toys and tools neatly into designated bins, wipe table, and tidy workspace",
          "zh": "主动把玩具与画具分门别类整齐收纳归位进储物箱，擦净桌面纸屑垃圾 📦 🧹"
        },
        "icon": "📦"
      },
      {
        "id": "opt-k3-soc-e2-3",
        "label": {
          "th": "สั่งให้คุณครูเป็นคนมาคอยก้มเก็บกวาดให้แทน",
          "en": "Boss teachers around to clean up after them",
          "zh": "把两手一插，像小皇帝一样吆喝命令老师蹲在地上替自己善后"
        },
        "icon": "😤"
      }
    ],
    "correctOptionId": "opt-k3-soc-e2-2",
    "explanation": {
      "th": "การรับผิดชอบเก็บของของตนเองเป็นการฝึกวินัยและความเป็นผู้ใหญ่ที่น่าชื่นชม เก่งมากครับ!",
      "en": "Correct! Tidying up personal materials develops lifelong conscientious accountability.",
      "zh": "答对了！自己的玩具自己收、物归原位爱整洁，是迈入小学阶段最重要的自理自律能力。"
    }
  },
  {
    "id": "k3-soc-e3",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การมีวินัยในตนเองระดับชั้นอนุบาล 3 ชุดที่ 3: เมื่อเล่นของเล่นเสร็จแล้วหรือทำงานศิลปะเสร็จเรียบร้อย 🎨 🧸 หน้าที่และความรับผิดชอบของเด็กที่ดีคือข้อใด?",
      "en": "K3 Personal Responsibility #3: Finished playing with toys or completing art projects 🎨 🧸: What is your civic duty?",
      "zh": "幼儿园大班自我责任素养第 3 题：在区角活动中玩完积木玩具或美工课完成剪纸贴画 🎨 🧸 之后，优秀少年应具备的主动责任习惯是？"
    },
    "illustration": "🧸 📦 🧹",
    "illustrationSubtitle": {
      "th": "ความรับผิดชอบต่อตนเอง: การเก็บของเล่นเข้าที่",
      "en": "Taking responsibility: Clean up and pack toys",
      "zh": "自律好习惯：主动收拾整理物品归位"
    },
    "options": [
      {
        "id": "opt-k3-soc-e3-1",
        "label": {
          "th": "สั่งให้คุณครูเป็นคนมาคอยก้มเก็บกวาดให้แทน",
          "en": "Boss teachers around to clean up after them",
          "zh": "把两手一插，像小皇帝一样吆喝命令老师蹲在地上替自己善后"
        },
        "icon": "😤"
      },
      {
        "id": "opt-k3-soc-e3-2",
        "label": {
          "th": "ทิ้งเกลื่อนกลาดไว้เต็มพื้นห้องแล้ววิ่งหนีไปเล่นอย่างอื่น",
          "en": "Leave mess strewn across floor and run away",
          "zh": "不管不顾随手扔得满地都是杂物，自己拍拍屁股飞奔跑开"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k3-soc-e3-3",
        "label": {
          "th": "เก็บของเล่นและอุปกรณ์เข้ากล่อง คืนที่เดิมให้เป็นระเบียบเรียบร้อย และทำความสะอาดโต๊ะ 📦 🧹",
          "en": "Pack toys and tools neatly into designated bins, wipe table, and tidy workspace",
          "zh": "主动把玩具与画具分门别类整齐收纳归位进储物箱，擦净桌面纸屑垃圾 📦 🧹"
        },
        "icon": "📦"
      }
    ],
    "correctOptionId": "opt-k3-soc-e3-3",
    "explanation": {
      "th": "การรับผิดชอบเก็บของของตนเองเป็นการฝึกวินัยและความเป็นผู้ใหญ่ที่น่าชื่นชม เก่งมากครับ!",
      "en": "Correct! Tidying up personal materials develops lifelong conscientious accountability.",
      "zh": "答对了！自己的玩具自己收、物归原位爱整洁，是迈入小学阶段最重要的自理自律能力。"
    }
  },
  {
    "id": "k3-soc-e4",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การมีวินัยในตนเองระดับชั้นอนุบาล 3 ชุดที่ 4: เมื่อเล่นของเล่นเสร็จแล้วหรือทำงานศิลปะเสร็จเรียบร้อย 🎨 🧸 หน้าที่และความรับผิดชอบของเด็กที่ดีคือข้อใด?",
      "en": "K3 Personal Responsibility #4: Finished playing with toys or completing art projects 🎨 🧸: What is your civic duty?",
      "zh": "幼儿园大班自我责任素养第 4 题：在区角活动中玩完积木玩具或美工课完成剪纸贴画 🎨 🧸 之后，优秀少年应具备的主动责任习惯是？"
    },
    "illustration": "🧸 📦 🧹",
    "illustrationSubtitle": {
      "th": "ความรับผิดชอบต่อตนเอง: การเก็บของเล่นเข้าที่",
      "en": "Taking responsibility: Clean up and pack toys",
      "zh": "自律好习惯：主动收拾整理物品归位"
    },
    "options": [
      {
        "id": "opt-k3-soc-e4-1",
        "label": {
          "th": "เก็บของเล่นและอุปกรณ์เข้ากล่อง คืนที่เดิมให้เป็นระเบียบเรียบร้อย และทำความสะอาดโต๊ะ 📦 🧹",
          "en": "Pack toys and tools neatly into designated bins, wipe table, and tidy workspace",
          "zh": "主动把玩具与画具分门别类整齐收纳归位进储物箱，擦净桌面纸屑垃圾 📦 🧹"
        },
        "icon": "📦"
      },
      {
        "id": "opt-k3-soc-e4-2",
        "label": {
          "th": "ทิ้งเกลื่อนกลาดไว้เต็มพื้นห้องแล้ววิ่งหนีไปเล่นอย่างอื่น",
          "en": "Leave mess strewn across floor and run away",
          "zh": "不管不顾随手扔得满地都是杂物，自己拍拍屁股飞奔跑开"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k3-soc-e4-3",
        "label": {
          "th": "สั่งให้คุณครูเป็นคนมาคอยก้มเก็บกวาดให้แทน",
          "en": "Boss teachers around to clean up after them",
          "zh": "把两手一插，像小皇帝一样吆喝命令老师蹲在地上替自己善后"
        },
        "icon": "😤"
      }
    ],
    "correctOptionId": "opt-k3-soc-e4-1",
    "explanation": {
      "th": "การรับผิดชอบเก็บของของตนเองเป็นการฝึกวินัยและความเป็นผู้ใหญ่ที่น่าชื่นชม เก่งมากครับ!",
      "en": "Correct! Tidying up personal materials develops lifelong conscientious accountability.",
      "zh": "答对了！自己的玩具自己收、物归原位爱整洁，是迈入小学阶段最重要的自理自律能力。"
    }
  },
  {
    "id": "k3-soc-e5",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การมีวินัยในตนเองระดับชั้นอนุบาล 3 ชุดที่ 5: เมื่อเล่นของเล่นเสร็จแล้วหรือทำงานศิลปะเสร็จเรียบร้อย 🎨 🧸 หน้าที่และความรับผิดชอบของเด็กที่ดีคือข้อใด?",
      "en": "K3 Personal Responsibility #5: Finished playing with toys or completing art projects 🎨 🧸: What is your civic duty?",
      "zh": "幼儿园大班自我责任素养第 5 题：在区角活动中玩完积木玩具或美工课完成剪纸贴画 🎨 🧸 之后，优秀少年应具备的主动责任习惯是？"
    },
    "illustration": "🧸 📦 🧹",
    "illustrationSubtitle": {
      "th": "ความรับผิดชอบต่อตนเอง: การเก็บของเล่นเข้าที่",
      "en": "Taking responsibility: Clean up and pack toys",
      "zh": "自律好习惯：主动收拾整理物品归位"
    },
    "options": [
      {
        "id": "opt-k3-soc-e5-1",
        "label": {
          "th": "ทิ้งเกลื่อนกลาดไว้เต็มพื้นห้องแล้ววิ่งหนีไปเล่นอย่างอื่น",
          "en": "Leave mess strewn across floor and run away",
          "zh": "不管不顾随手扔得满地都是杂物，自己拍拍屁股飞奔跑开"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k3-soc-e5-2",
        "label": {
          "th": "เก็บของเล่นและอุปกรณ์เข้ากล่อง คืนที่เดิมให้เป็นระเบียบเรียบร้อย และทำความสะอาดโต๊ะ 📦 🧹",
          "en": "Pack toys and tools neatly into designated bins, wipe table, and tidy workspace",
          "zh": "主动把玩具与画具分门别类整齐收纳归位进储物箱，擦净桌面纸屑垃圾 📦 🧹"
        },
        "icon": "📦"
      },
      {
        "id": "opt-k3-soc-e5-3",
        "label": {
          "th": "สั่งให้คุณครูเป็นคนมาคอยก้มเก็บกวาดให้แทน",
          "en": "Boss teachers around to clean up after them",
          "zh": "把两手一插，像小皇帝一样吆喝命令老师蹲在地上替自己善后"
        },
        "icon": "😤"
      }
    ],
    "correctOptionId": "opt-k3-soc-e5-2",
    "explanation": {
      "th": "การรับผิดชอบเก็บของของตนเองเป็นการฝึกวินัยและความเป็นผู้ใหญ่ที่น่าชื่นชม เก่งมากครับ!",
      "en": "Correct! Tidying up personal materials develops lifelong conscientious accountability.",
      "zh": "答对了！自己的玩具自己收、物归原位爱整洁，是迈入小学阶段最重要的自理自律能力。"
    }
  },
  {
    "id": "k3-soc-e6",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การมีวินัยในตนเองระดับชั้นอนุบาล 3 ชุดที่ 6: เมื่อเล่นของเล่นเสร็จแล้วหรือทำงานศิลปะเสร็จเรียบร้อย 🎨 🧸 หน้าที่และความรับผิดชอบของเด็กที่ดีคือข้อใด?",
      "en": "K3 Personal Responsibility #6: Finished playing with toys or completing art projects 🎨 🧸: What is your civic duty?",
      "zh": "幼儿园大班自我责任素养第 6 题：在区角活动中玩完积木玩具或美工课完成剪纸贴画 🎨 🧸 之后，优秀少年应具备的主动责任习惯是？"
    },
    "illustration": "🧸 📦 🧹",
    "illustrationSubtitle": {
      "th": "ความรับผิดชอบต่อตนเอง: การเก็บของเล่นเข้าที่",
      "en": "Taking responsibility: Clean up and pack toys",
      "zh": "自律好习惯：主动收拾整理物品归位"
    },
    "options": [
      {
        "id": "opt-k3-soc-e6-1",
        "label": {
          "th": "สั่งให้คุณครูเป็นคนมาคอยก้มเก็บกวาดให้แทน",
          "en": "Boss teachers around to clean up after them",
          "zh": "把两手一插，像小皇帝一样吆喝命令老师蹲在地上替自己善后"
        },
        "icon": "😤"
      },
      {
        "id": "opt-k3-soc-e6-2",
        "label": {
          "th": "ทิ้งเกลื่อนกลาดไว้เต็มพื้นห้องแล้ววิ่งหนีไปเล่นอย่างอื่น",
          "en": "Leave mess strewn across floor and run away",
          "zh": "不管不顾随手扔得满地都是杂物，自己拍拍屁股飞奔跑开"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k3-soc-e6-3",
        "label": {
          "th": "เก็บของเล่นและอุปกรณ์เข้ากล่อง คืนที่เดิมให้เป็นระเบียบเรียบร้อย และทำความสะอาดโต๊ะ 📦 🧹",
          "en": "Pack toys and tools neatly into designated bins, wipe table, and tidy workspace",
          "zh": "主动把玩具与画具分门别类整齐收纳归位进储物箱，擦净桌面纸屑垃圾 📦 🧹"
        },
        "icon": "📦"
      }
    ],
    "correctOptionId": "opt-k3-soc-e6-3",
    "explanation": {
      "th": "การรับผิดชอบเก็บของของตนเองเป็นการฝึกวินัยและความเป็นผู้ใหญ่ที่น่าชื่นชม เก่งมากครับ!",
      "en": "Correct! Tidying up personal materials develops lifelong conscientious accountability.",
      "zh": "答对了！自己的玩具自己收、物归原位爱整洁，是迈入小学阶段最重要的自理自律能力。"
    }
  },
  {
    "id": "k3-soc-e7",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การมีวินัยในตนเองระดับชั้นอนุบาล 3 ชุดที่ 7: เมื่อเล่นของเล่นเสร็จแล้วหรือทำงานศิลปะเสร็จเรียบร้อย 🎨 🧸 หน้าที่และความรับผิดชอบของเด็กที่ดีคือข้อใด?",
      "en": "K3 Personal Responsibility #7: Finished playing with toys or completing art projects 🎨 🧸: What is your civic duty?",
      "zh": "幼儿园大班自我责任素养第 7 题：在区角活动中玩完积木玩具或美工课完成剪纸贴画 🎨 🧸 之后，优秀少年应具备的主动责任习惯是？"
    },
    "illustration": "🧸 📦 🧹",
    "illustrationSubtitle": {
      "th": "ความรับผิดชอบต่อตนเอง: การเก็บของเล่นเข้าที่",
      "en": "Taking responsibility: Clean up and pack toys",
      "zh": "自律好习惯：主动收拾整理物品归位"
    },
    "options": [
      {
        "id": "opt-k3-soc-e7-1",
        "label": {
          "th": "เก็บของเล่นและอุปกรณ์เข้ากล่อง คืนที่เดิมให้เป็นระเบียบเรียบร้อย และทำความสะอาดโต๊ะ 📦 🧹",
          "en": "Pack toys and tools neatly into designated bins, wipe table, and tidy workspace",
          "zh": "主动把玩具与画具分门别类整齐收纳归位进储物箱，擦净桌面纸屑垃圾 📦 🧹"
        },
        "icon": "📦"
      },
      {
        "id": "opt-k3-soc-e7-2",
        "label": {
          "th": "ทิ้งเกลื่อนกลาดไว้เต็มพื้นห้องแล้ววิ่งหนีไปเล่นอย่างอื่น",
          "en": "Leave mess strewn across floor and run away",
          "zh": "不管不顾随手扔得满地都是杂物，自己拍拍屁股飞奔跑开"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k3-soc-e7-3",
        "label": {
          "th": "สั่งให้คุณครูเป็นคนมาคอยก้มเก็บกวาดให้แทน",
          "en": "Boss teachers around to clean up after them",
          "zh": "把两手一插，像小皇帝一样吆喝命令老师蹲在地上替自己善后"
        },
        "icon": "😤"
      }
    ],
    "correctOptionId": "opt-k3-soc-e7-1",
    "explanation": {
      "th": "การรับผิดชอบเก็บของของตนเองเป็นการฝึกวินัยและความเป็นผู้ใหญ่ที่น่าชื่นชม เก่งมากครับ!",
      "en": "Correct! Tidying up personal materials develops lifelong conscientious accountability.",
      "zh": "答对了！自己的玩具自己收、物归原位爱整洁，是迈入小学阶段最重要的自理自律能力。"
    }
  },
  {
    "id": "k3-soc-e8",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การมีวินัยในตนเองระดับชั้นอนุบาล 3 ชุดที่ 8: เมื่อเล่นของเล่นเสร็จแล้วหรือทำงานศิลปะเสร็จเรียบร้อย 🎨 🧸 หน้าที่และความรับผิดชอบของเด็กที่ดีคือข้อใด?",
      "en": "K3 Personal Responsibility #8: Finished playing with toys or completing art projects 🎨 🧸: What is your civic duty?",
      "zh": "幼儿园大班自我责任素养第 8 题：在区角活动中玩完积木玩具或美工课完成剪纸贴画 🎨 🧸 之后，优秀少年应具备的主动责任习惯是？"
    },
    "illustration": "🧸 📦 🧹",
    "illustrationSubtitle": {
      "th": "ความรับผิดชอบต่อตนเอง: การเก็บของเล่นเข้าที่",
      "en": "Taking responsibility: Clean up and pack toys",
      "zh": "自律好习惯：主动收拾整理物品归位"
    },
    "options": [
      {
        "id": "opt-k3-soc-e8-1",
        "label": {
          "th": "ทิ้งเกลื่อนกลาดไว้เต็มพื้นห้องแล้ววิ่งหนีไปเล่นอย่างอื่น",
          "en": "Leave mess strewn across floor and run away",
          "zh": "不管不顾随手扔得满地都是杂物，自己拍拍屁股飞奔跑开"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k3-soc-e8-2",
        "label": {
          "th": "เก็บของเล่นและอุปกรณ์เข้ากล่อง คืนที่เดิมให้เป็นระเบียบเรียบร้อย และทำความสะอาดโต๊ะ 📦 🧹",
          "en": "Pack toys and tools neatly into designated bins, wipe table, and tidy workspace",
          "zh": "主动把玩具与画具分门别类整齐收纳归位进储物箱，擦净桌面纸屑垃圾 📦 🧹"
        },
        "icon": "📦"
      },
      {
        "id": "opt-k3-soc-e8-3",
        "label": {
          "th": "สั่งให้คุณครูเป็นคนมาคอยก้มเก็บกวาดให้แทน",
          "en": "Boss teachers around to clean up after them",
          "zh": "把两手一插，像小皇帝一样吆喝命令老师蹲在地上替自己善后"
        },
        "icon": "😤"
      }
    ],
    "correctOptionId": "opt-k3-soc-e8-2",
    "explanation": {
      "th": "การรับผิดชอบเก็บของของตนเองเป็นการฝึกวินัยและความเป็นผู้ใหญ่ที่น่าชื่นชม เก่งมากครับ!",
      "en": "Correct! Tidying up personal materials develops lifelong conscientious accountability.",
      "zh": "答对了！自己的玩具自己收、物归原位爱整洁，是迈入小学阶段最重要的自理自律能力。"
    }
  },
  {
    "id": "k3-soc-e9",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การมีวินัยในตนเองระดับชั้นอนุบาล 3 ชุดที่ 9: เมื่อเล่นของเล่นเสร็จแล้วหรือทำงานศิลปะเสร็จเรียบร้อย 🎨 🧸 หน้าที่และความรับผิดชอบของเด็กที่ดีคือข้อใด?",
      "en": "K3 Personal Responsibility #9: Finished playing with toys or completing art projects 🎨 🧸: What is your civic duty?",
      "zh": "幼儿园大班自我责任素养第 9 题：在区角活动中玩完积木玩具或美工课完成剪纸贴画 🎨 🧸 之后，优秀少年应具备的主动责任习惯是？"
    },
    "illustration": "🧸 📦 🧹",
    "illustrationSubtitle": {
      "th": "ความรับผิดชอบต่อตนเอง: การเก็บของเล่นเข้าที่",
      "en": "Taking responsibility: Clean up and pack toys",
      "zh": "自律好习惯：主动收拾整理物品归位"
    },
    "options": [
      {
        "id": "opt-k3-soc-e9-1",
        "label": {
          "th": "สั่งให้คุณครูเป็นคนมาคอยก้มเก็บกวาดให้แทน",
          "en": "Boss teachers around to clean up after them",
          "zh": "把两手一插，像小皇帝一样吆喝命令老师蹲在地上替自己善后"
        },
        "icon": "😤"
      },
      {
        "id": "opt-k3-soc-e9-2",
        "label": {
          "th": "ทิ้งเกลื่อนกลาดไว้เต็มพื้นห้องแล้ววิ่งหนีไปเล่นอย่างอื่น",
          "en": "Leave mess strewn across floor and run away",
          "zh": "不管不顾随手扔得满地都是杂物，自己拍拍屁股飞奔跑开"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k3-soc-e9-3",
        "label": {
          "th": "เก็บของเล่นและอุปกรณ์เข้ากล่อง คืนที่เดิมให้เป็นระเบียบเรียบร้อย และทำความสะอาดโต๊ะ 📦 🧹",
          "en": "Pack toys and tools neatly into designated bins, wipe table, and tidy workspace",
          "zh": "主动把玩具与画具分门别类整齐收纳归位进储物箱，擦净桌面纸屑垃圾 📦 🧹"
        },
        "icon": "📦"
      }
    ],
    "correctOptionId": "opt-k3-soc-e9-3",
    "explanation": {
      "th": "การรับผิดชอบเก็บของของตนเองเป็นการฝึกวินัยและความเป็นผู้ใหญ่ที่น่าชื่นชม เก่งมากครับ!",
      "en": "Correct! Tidying up personal materials develops lifelong conscientious accountability.",
      "zh": "答对了！自己的玩具自己收、物归原位爱整洁，是迈入小学阶段最重要的自理自律能力。"
    }
  },
  {
    "id": "k3-soc-e10",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 1,
    "question": {
      "th": "การมีวินัยในตนเองระดับชั้นอนุบาล 3 ชุดที่ 10: เมื่อเล่นของเล่นเสร็จแล้วหรือทำงานศิลปะเสร็จเรียบร้อย 🎨 🧸 หน้าที่และความรับผิดชอบของเด็กที่ดีคือข้อใด?",
      "en": "K3 Personal Responsibility #10: Finished playing with toys or completing art projects 🎨 🧸: What is your civic duty?",
      "zh": "幼儿园大班自我责任素养第 10 题：在区角活动中玩完积木玩具或美工课完成剪纸贴画 🎨 🧸 之后，优秀少年应具备的主动责任习惯是？"
    },
    "illustration": "🧸 📦 🧹",
    "illustrationSubtitle": {
      "th": "ความรับผิดชอบต่อตนเอง: การเก็บของเล่นเข้าที่",
      "en": "Taking responsibility: Clean up and pack toys",
      "zh": "自律好习惯：主动收拾整理物品归位"
    },
    "options": [
      {
        "id": "opt-k3-soc-e10-1",
        "label": {
          "th": "เก็บของเล่นและอุปกรณ์เข้ากล่อง คืนที่เดิมให้เป็นระเบียบเรียบร้อย และทำความสะอาดโต๊ะ 📦 🧹",
          "en": "Pack toys and tools neatly into designated bins, wipe table, and tidy workspace",
          "zh": "主动把玩具与画具分门别类整齐收纳归位进储物箱，擦净桌面纸屑垃圾 📦 🧹"
        },
        "icon": "📦"
      },
      {
        "id": "opt-k3-soc-e10-2",
        "label": {
          "th": "ทิ้งเกลื่อนกลาดไว้เต็มพื้นห้องแล้ววิ่งหนีไปเล่นอย่างอื่น",
          "en": "Leave mess strewn across floor and run away",
          "zh": "不管不顾随手扔得满地都是杂物，自己拍拍屁股飞奔跑开"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k3-soc-e10-3",
        "label": {
          "th": "สั่งให้คุณครูเป็นคนมาคอยก้มเก็บกวาดให้แทน",
          "en": "Boss teachers around to clean up after them",
          "zh": "把两手一插，像小皇帝一样吆喝命令老师蹲在地上替自己善后"
        },
        "icon": "😤"
      }
    ],
    "correctOptionId": "opt-k3-soc-e10-1",
    "explanation": {
      "th": "การรับผิดชอบเก็บของของตนเองเป็นการฝึกวินัยและความเป็นผู้ใหญ่ที่น่าชื่นชม เก่งมากครับ!",
      "en": "Correct! Tidying up personal materials develops lifelong conscientious accountability.",
      "zh": "答对了！自己的玩具自己收、物归原位爱整洁，是迈入小学阶段最重要的自理自律能力。"
    }
  },
  {
    "id": "k3-soc-m1",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ภาวะผู้นำและการแก้ปัญหาทางสังคม อนุบาล 3 ชุดที่ 1: เมื่อเห็นเพื่อนสองคนในกลุ่มกำลังทะเลาะทุ่มเถียงกันอย่างรุนแรง 🗣️ 💥 การเป็น \"ผู้ไกล่เกลี่ยสันติวิธี\" ควรทำอย่างไร?",
      "en": "K3 Social Mediation #1: Two friends are having an explosive screaming argument 🗣️ 💥: How can you mediate peacefully?",
      "zh": "幼儿园大班调解冲突能力第 1 题：班级里有两个要好的同桌为了争论谁先发言而吵得不可开交、面红耳赤 🗣️ 💥，身为热心和事佬应如何和平劝解？"
    },
    "illustration": "🗣️ 🤝 🕊️",
    "illustrationSubtitle": {
      "th": "การไกล่เกลี่ยข้อพิพาทด้วยสันติวิธี",
      "en": "Peaceful dispute mediation between peers",
      "zh": "同伴矛盾化解：冷静倾听、寻找双赢折中方案"
    },
    "options": [
      {
        "id": "opt-k3-soc-m1-1",
        "label": {
          "th": "ยุยงให้ทั้งสองคนต่อยตีกันให้รู้แพ้รู้ชนะ",
          "en": "Urge them to brawl with fists to see who wins",
          "zh": "在旁边煽风点火吹口哨起哄：“快打！使劲打！谁打赢了算谁的！”"
        },
        "icon": "🥊"
      },
      {
        "id": "opt-k3-soc-m1-2",
        "label": {
          "th": "ช่วยเตือนให้ทั้งสองฝ่ายสงบสติอารมณ์ ชวนรับฟังเหตุผลของกันและกัน หรือชวนไปปรึกษาคุณครู 🤝 🕊️",
          "en": "Help both take calming breaths, facilitate mutual active listening, or seek teacher guidance",
          "zh": "温和上前劝阻双方冷静深呼吸，引导各自心平气和说出想法，或陪同一起寻求老师公正调解 🤝 🕊️"
        },
        "icon": "🕊️"
      },
      {
        "id": "opt-k3-soc-m1-3",
        "label": {
          "th": "หยิบกล้องมาถ่ายคลิปหัวเราะเยาะ",
          "en": "Film videos laughing mockingly",
          "zh": "掏出手机拍摄吵架视频发朋友圈恶搞取乐"
        },
        "icon": "📱"
      }
    ],
    "correctOptionId": "opt-k3-soc-m1-2",
    "explanation": {
      "th": "การเป็นสะพานเชื่อมความเข้าใจและส่งเสริมสันติภาพ เป็นทักษะความเป็นผู้นำที่ยอดเยี่ยม เก่งมากครับ!",
      "en": "Awesome! De-escalating tensions and fostering dialogue reflects mature social leadership.",
      "zh": "太棒了！息事宁人、促进沟通对话与理解，是极具领袖气质的高情商大智慧。"
    }
  },
  {
    "id": "k3-soc-m2",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ภาวะผู้นำและการแก้ปัญหาทางสังคม อนุบาล 3 ชุดที่ 2: เมื่อเห็นเพื่อนสองคนในกลุ่มกำลังทะเลาะทุ่มเถียงกันอย่างรุนแรง 🗣️ 💥 การเป็น \"ผู้ไกล่เกลี่ยสันติวิธี\" ควรทำอย่างไร?",
      "en": "K3 Social Mediation #2: Two friends are having an explosive screaming argument 🗣️ 💥: How can you mediate peacefully?",
      "zh": "幼儿园大班调解冲突能力第 2 题：班级里有两个要好的同桌为了争论谁先发言而吵得不可开交、面红耳赤 🗣️ 💥，身为热心和事佬应如何和平劝解？"
    },
    "illustration": "🗣️ 🤝 🕊️",
    "illustrationSubtitle": {
      "th": "การไกล่เกลี่ยข้อพิพาทด้วยสันติวิธี",
      "en": "Peaceful dispute mediation between peers",
      "zh": "同伴矛盾化解：冷静倾听、寻找双赢折中方案"
    },
    "options": [
      {
        "id": "opt-k3-soc-m2-1",
        "label": {
          "th": "หยิบกล้องมาถ่ายคลิปหัวเราะเยาะ",
          "en": "Film videos laughing mockingly",
          "zh": "掏出手机拍摄吵架视频发朋友圈恶搞取乐"
        },
        "icon": "📱"
      },
      {
        "id": "opt-k3-soc-m2-2",
        "label": {
          "th": "ยุยงให้ทั้งสองคนต่อยตีกันให้รู้แพ้รู้ชนะ",
          "en": "Urge them to brawl with fists to see who wins",
          "zh": "在旁边煽风点火吹口哨起哄：“快打！使劲打！谁打赢了算谁的！”"
        },
        "icon": "🥊"
      },
      {
        "id": "opt-k3-soc-m2-3",
        "label": {
          "th": "ช่วยเตือนให้ทั้งสองฝ่ายสงบสติอารมณ์ ชวนรับฟังเหตุผลของกันและกัน หรือชวนไปปรึกษาคุณครู 🤝 🕊️",
          "en": "Help both take calming breaths, facilitate mutual active listening, or seek teacher guidance",
          "zh": "温和上前劝阻双方冷静深呼吸，引导各自心平气和说出想法，或陪同一起寻求老师公正调解 🤝 🕊️"
        },
        "icon": "🕊️"
      }
    ],
    "correctOptionId": "opt-k3-soc-m2-3",
    "explanation": {
      "th": "การเป็นสะพานเชื่อมความเข้าใจและส่งเสริมสันติภาพ เป็นทักษะความเป็นผู้นำที่ยอดเยี่ยม เก่งมากครับ!",
      "en": "Awesome! De-escalating tensions and fostering dialogue reflects mature social leadership.",
      "zh": "太棒了！息事宁人、促进沟通对话与理解，是极具领袖气质的高情商大智慧。"
    }
  },
  {
    "id": "k3-soc-m3",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ภาวะผู้นำและการแก้ปัญหาทางสังคม อนุบาล 3 ชุดที่ 3: เมื่อเห็นเพื่อนสองคนในกลุ่มกำลังทะเลาะทุ่มเถียงกันอย่างรุนแรง 🗣️ 💥 การเป็น \"ผู้ไกล่เกลี่ยสันติวิธี\" ควรทำอย่างไร?",
      "en": "K3 Social Mediation #3: Two friends are having an explosive screaming argument 🗣️ 💥: How can you mediate peacefully?",
      "zh": "幼儿园大班调解冲突能力第 3 题：班级里有两个要好的同桌为了争论谁先发言而吵得不可开交、面红耳赤 🗣️ 💥，身为热心和事佬应如何和平劝解？"
    },
    "illustration": "🗣️ 🤝 🕊️",
    "illustrationSubtitle": {
      "th": "การไกล่เกลี่ยข้อพิพาทด้วยสันติวิธี",
      "en": "Peaceful dispute mediation between peers",
      "zh": "同伴矛盾化解：冷静倾听、寻找双赢折中方案"
    },
    "options": [
      {
        "id": "opt-k3-soc-m3-1",
        "label": {
          "th": "ช่วยเตือนให้ทั้งสองฝ่ายสงบสติอารมณ์ ชวนรับฟังเหตุผลของกันและกัน หรือชวนไปปรึกษาคุณครู 🤝 🕊️",
          "en": "Help both take calming breaths, facilitate mutual active listening, or seek teacher guidance",
          "zh": "温和上前劝阻双方冷静深呼吸，引导各自心平气和说出想法，或陪同一起寻求老师公正调解 🤝 🕊️"
        },
        "icon": "🕊️"
      },
      {
        "id": "opt-k3-soc-m3-2",
        "label": {
          "th": "ยุยงให้ทั้งสองคนต่อยตีกันให้รู้แพ้รู้ชนะ",
          "en": "Urge them to brawl with fists to see who wins",
          "zh": "在旁边煽风点火吹口哨起哄：“快打！使劲打！谁打赢了算谁的！”"
        },
        "icon": "🥊"
      },
      {
        "id": "opt-k3-soc-m3-3",
        "label": {
          "th": "หยิบกล้องมาถ่ายคลิปหัวเราะเยาะ",
          "en": "Film videos laughing mockingly",
          "zh": "掏出手机拍摄吵架视频发朋友圈恶搞取乐"
        },
        "icon": "📱"
      }
    ],
    "correctOptionId": "opt-k3-soc-m3-1",
    "explanation": {
      "th": "การเป็นสะพานเชื่อมความเข้าใจและส่งเสริมสันติภาพ เป็นทักษะความเป็นผู้นำที่ยอดเยี่ยม เก่งมากครับ!",
      "en": "Awesome! De-escalating tensions and fostering dialogue reflects mature social leadership.",
      "zh": "太棒了！息事宁人、促进沟通对话与理解，是极具领袖气质的高情商大智慧。"
    }
  },
  {
    "id": "k3-soc-m4",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ภาวะผู้นำและการแก้ปัญหาทางสังคม อนุบาล 3 ชุดที่ 4: เมื่อเห็นเพื่อนสองคนในกลุ่มกำลังทะเลาะทุ่มเถียงกันอย่างรุนแรง 🗣️ 💥 การเป็น \"ผู้ไกล่เกลี่ยสันติวิธี\" ควรทำอย่างไร?",
      "en": "K3 Social Mediation #4: Two friends are having an explosive screaming argument 🗣️ 💥: How can you mediate peacefully?",
      "zh": "幼儿园大班调解冲突能力第 4 题：班级里有两个要好的同桌为了争论谁先发言而吵得不可开交、面红耳赤 🗣️ 💥，身为热心和事佬应如何和平劝解？"
    },
    "illustration": "🗣️ 🤝 🕊️",
    "illustrationSubtitle": {
      "th": "การไกล่เกลี่ยข้อพิพาทด้วยสันติวิธี",
      "en": "Peaceful dispute mediation between peers",
      "zh": "同伴矛盾化解：冷静倾听、寻找双赢折中方案"
    },
    "options": [
      {
        "id": "opt-k3-soc-m4-1",
        "label": {
          "th": "ยุยงให้ทั้งสองคนต่อยตีกันให้รู้แพ้รู้ชนะ",
          "en": "Urge them to brawl with fists to see who wins",
          "zh": "在旁边煽风点火吹口哨起哄：“快打！使劲打！谁打赢了算谁的！”"
        },
        "icon": "🥊"
      },
      {
        "id": "opt-k3-soc-m4-2",
        "label": {
          "th": "ช่วยเตือนให้ทั้งสองฝ่ายสงบสติอารมณ์ ชวนรับฟังเหตุผลของกันและกัน หรือชวนไปปรึกษาคุณครู 🤝 🕊️",
          "en": "Help both take calming breaths, facilitate mutual active listening, or seek teacher guidance",
          "zh": "温和上前劝阻双方冷静深呼吸，引导各自心平气和说出想法，或陪同一起寻求老师公正调解 🤝 🕊️"
        },
        "icon": "🕊️"
      },
      {
        "id": "opt-k3-soc-m4-3",
        "label": {
          "th": "หยิบกล้องมาถ่ายคลิปหัวเราะเยาะ",
          "en": "Film videos laughing mockingly",
          "zh": "掏出手机拍摄吵架视频发朋友圈恶搞取乐"
        },
        "icon": "📱"
      }
    ],
    "correctOptionId": "opt-k3-soc-m4-2",
    "explanation": {
      "th": "การเป็นสะพานเชื่อมความเข้าใจและส่งเสริมสันติภาพ เป็นทักษะความเป็นผู้นำที่ยอดเยี่ยม เก่งมากครับ!",
      "en": "Awesome! De-escalating tensions and fostering dialogue reflects mature social leadership.",
      "zh": "太棒了！息事宁人、促进沟通对话与理解，是极具领袖气质的高情商大智慧。"
    }
  },
  {
    "id": "k3-soc-m5",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ภาวะผู้นำและการแก้ปัญหาทางสังคม อนุบาล 3 ชุดที่ 5: เมื่อเห็นเพื่อนสองคนในกลุ่มกำลังทะเลาะทุ่มเถียงกันอย่างรุนแรง 🗣️ 💥 การเป็น \"ผู้ไกล่เกลี่ยสันติวิธี\" ควรทำอย่างไร?",
      "en": "K3 Social Mediation #5: Two friends are having an explosive screaming argument 🗣️ 💥: How can you mediate peacefully?",
      "zh": "幼儿园大班调解冲突能力第 5 题：班级里有两个要好的同桌为了争论谁先发言而吵得不可开交、面红耳赤 🗣️ 💥，身为热心和事佬应如何和平劝解？"
    },
    "illustration": "🗣️ 🤝 🕊️",
    "illustrationSubtitle": {
      "th": "การไกล่เกลี่ยข้อพิพาทด้วยสันติวิธี",
      "en": "Peaceful dispute mediation between peers",
      "zh": "同伴矛盾化解：冷静倾听、寻找双赢折中方案"
    },
    "options": [
      {
        "id": "opt-k3-soc-m5-1",
        "label": {
          "th": "หยิบกล้องมาถ่ายคลิปหัวเราะเยาะ",
          "en": "Film videos laughing mockingly",
          "zh": "掏出手机拍摄吵架视频发朋友圈恶搞取乐"
        },
        "icon": "📱"
      },
      {
        "id": "opt-k3-soc-m5-2",
        "label": {
          "th": "ยุยงให้ทั้งสองคนต่อยตีกันให้รู้แพ้รู้ชนะ",
          "en": "Urge them to brawl with fists to see who wins",
          "zh": "在旁边煽风点火吹口哨起哄：“快打！使劲打！谁打赢了算谁的！”"
        },
        "icon": "🥊"
      },
      {
        "id": "opt-k3-soc-m5-3",
        "label": {
          "th": "ช่วยเตือนให้ทั้งสองฝ่ายสงบสติอารมณ์ ชวนรับฟังเหตุผลของกันและกัน หรือชวนไปปรึกษาคุณครู 🤝 🕊️",
          "en": "Help both take calming breaths, facilitate mutual active listening, or seek teacher guidance",
          "zh": "温和上前劝阻双方冷静深呼吸，引导各自心平气和说出想法，或陪同一起寻求老师公正调解 🤝 🕊️"
        },
        "icon": "🕊️"
      }
    ],
    "correctOptionId": "opt-k3-soc-m5-3",
    "explanation": {
      "th": "การเป็นสะพานเชื่อมความเข้าใจและส่งเสริมสันติภาพ เป็นทักษะความเป็นผู้นำที่ยอดเยี่ยม เก่งมากครับ!",
      "en": "Awesome! De-escalating tensions and fostering dialogue reflects mature social leadership.",
      "zh": "太棒了！息事宁人、促进沟通对话与理解，是极具领袖气质的高情商大智慧。"
    }
  },
  {
    "id": "k3-soc-m6",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ภาวะผู้นำและการแก้ปัญหาทางสังคม อนุบาล 3 ชุดที่ 6: เมื่อเห็นเพื่อนสองคนในกลุ่มกำลังทะเลาะทุ่มเถียงกันอย่างรุนแรง 🗣️ 💥 การเป็น \"ผู้ไกล่เกลี่ยสันติวิธี\" ควรทำอย่างไร?",
      "en": "K3 Social Mediation #6: Two friends are having an explosive screaming argument 🗣️ 💥: How can you mediate peacefully?",
      "zh": "幼儿园大班调解冲突能力第 6 题：班级里有两个要好的同桌为了争论谁先发言而吵得不可开交、面红耳赤 🗣️ 💥，身为热心和事佬应如何和平劝解？"
    },
    "illustration": "🗣️ 🤝 🕊️",
    "illustrationSubtitle": {
      "th": "การไกล่เกลี่ยข้อพิพาทด้วยสันติวิธี",
      "en": "Peaceful dispute mediation between peers",
      "zh": "同伴矛盾化解：冷静倾听、寻找双赢折中方案"
    },
    "options": [
      {
        "id": "opt-k3-soc-m6-1",
        "label": {
          "th": "ช่วยเตือนให้ทั้งสองฝ่ายสงบสติอารมณ์ ชวนรับฟังเหตุผลของกันและกัน หรือชวนไปปรึกษาคุณครู 🤝 🕊️",
          "en": "Help both take calming breaths, facilitate mutual active listening, or seek teacher guidance",
          "zh": "温和上前劝阻双方冷静深呼吸，引导各自心平气和说出想法，或陪同一起寻求老师公正调解 🤝 🕊️"
        },
        "icon": "🕊️"
      },
      {
        "id": "opt-k3-soc-m6-2",
        "label": {
          "th": "ยุยงให้ทั้งสองคนต่อยตีกันให้รู้แพ้รู้ชนะ",
          "en": "Urge them to brawl with fists to see who wins",
          "zh": "在旁边煽风点火吹口哨起哄：“快打！使劲打！谁打赢了算谁的！”"
        },
        "icon": "🥊"
      },
      {
        "id": "opt-k3-soc-m6-3",
        "label": {
          "th": "หยิบกล้องมาถ่ายคลิปหัวเราะเยาะ",
          "en": "Film videos laughing mockingly",
          "zh": "掏出手机拍摄吵架视频发朋友圈恶搞取乐"
        },
        "icon": "📱"
      }
    ],
    "correctOptionId": "opt-k3-soc-m6-1",
    "explanation": {
      "th": "การเป็นสะพานเชื่อมความเข้าใจและส่งเสริมสันติภาพ เป็นทักษะความเป็นผู้นำที่ยอดเยี่ยม เก่งมากครับ!",
      "en": "Awesome! De-escalating tensions and fostering dialogue reflects mature social leadership.",
      "zh": "太棒了！息事宁人、促进沟通对话与理解，是极具领袖气质的高情商大智慧。"
    }
  },
  {
    "id": "k3-soc-m7",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ภาวะผู้นำและการแก้ปัญหาทางสังคม อนุบาล 3 ชุดที่ 7: เมื่อเห็นเพื่อนสองคนในกลุ่มกำลังทะเลาะทุ่มเถียงกันอย่างรุนแรง 🗣️ 💥 การเป็น \"ผู้ไกล่เกลี่ยสันติวิธี\" ควรทำอย่างไร?",
      "en": "K3 Social Mediation #7: Two friends are having an explosive screaming argument 🗣️ 💥: How can you mediate peacefully?",
      "zh": "幼儿园大班调解冲突能力第 7 题：班级里有两个要好的同桌为了争论谁先发言而吵得不可开交、面红耳赤 🗣️ 💥，身为热心和事佬应如何和平劝解？"
    },
    "illustration": "🗣️ 🤝 🕊️",
    "illustrationSubtitle": {
      "th": "การไกล่เกลี่ยข้อพิพาทด้วยสันติวิธี",
      "en": "Peaceful dispute mediation between peers",
      "zh": "同伴矛盾化解：冷静倾听、寻找双赢折中方案"
    },
    "options": [
      {
        "id": "opt-k3-soc-m7-1",
        "label": {
          "th": "ยุยงให้ทั้งสองคนต่อยตีกันให้รู้แพ้รู้ชนะ",
          "en": "Urge them to brawl with fists to see who wins",
          "zh": "在旁边煽风点火吹口哨起哄：“快打！使劲打！谁打赢了算谁的！”"
        },
        "icon": "🥊"
      },
      {
        "id": "opt-k3-soc-m7-2",
        "label": {
          "th": "ช่วยเตือนให้ทั้งสองฝ่ายสงบสติอารมณ์ ชวนรับฟังเหตุผลของกันและกัน หรือชวนไปปรึกษาคุณครู 🤝 🕊️",
          "en": "Help both take calming breaths, facilitate mutual active listening, or seek teacher guidance",
          "zh": "温和上前劝阻双方冷静深呼吸，引导各自心平气和说出想法，或陪同一起寻求老师公正调解 🤝 🕊️"
        },
        "icon": "🕊️"
      },
      {
        "id": "opt-k3-soc-m7-3",
        "label": {
          "th": "หยิบกล้องมาถ่ายคลิปหัวเราะเยาะ",
          "en": "Film videos laughing mockingly",
          "zh": "掏出手机拍摄吵架视频发朋友圈恶搞取乐"
        },
        "icon": "📱"
      }
    ],
    "correctOptionId": "opt-k3-soc-m7-2",
    "explanation": {
      "th": "การเป็นสะพานเชื่อมความเข้าใจและส่งเสริมสันติภาพ เป็นทักษะความเป็นผู้นำที่ยอดเยี่ยม เก่งมากครับ!",
      "en": "Awesome! De-escalating tensions and fostering dialogue reflects mature social leadership.",
      "zh": "太棒了！息事宁人、促进沟通对话与理解，是极具领袖气质的高情商大智慧。"
    }
  },
  {
    "id": "k3-soc-m8",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ภาวะผู้นำและการแก้ปัญหาทางสังคม อนุบาล 3 ชุดที่ 8: เมื่อเห็นเพื่อนสองคนในกลุ่มกำลังทะเลาะทุ่มเถียงกันอย่างรุนแรง 🗣️ 💥 การเป็น \"ผู้ไกล่เกลี่ยสันติวิธี\" ควรทำอย่างไร?",
      "en": "K3 Social Mediation #8: Two friends are having an explosive screaming argument 🗣️ 💥: How can you mediate peacefully?",
      "zh": "幼儿园大班调解冲突能力第 8 题：班级里有两个要好的同桌为了争论谁先发言而吵得不可开交、面红耳赤 🗣️ 💥，身为热心和事佬应如何和平劝解？"
    },
    "illustration": "🗣️ 🤝 🕊️",
    "illustrationSubtitle": {
      "th": "การไกล่เกลี่ยข้อพิพาทด้วยสันติวิธี",
      "en": "Peaceful dispute mediation between peers",
      "zh": "同伴矛盾化解：冷静倾听、寻找双赢折中方案"
    },
    "options": [
      {
        "id": "opt-k3-soc-m8-1",
        "label": {
          "th": "หยิบกล้องมาถ่ายคลิปหัวเราะเยาะ",
          "en": "Film videos laughing mockingly",
          "zh": "掏出手机拍摄吵架视频发朋友圈恶搞取乐"
        },
        "icon": "📱"
      },
      {
        "id": "opt-k3-soc-m8-2",
        "label": {
          "th": "ยุยงให้ทั้งสองคนต่อยตีกันให้รู้แพ้รู้ชนะ",
          "en": "Urge them to brawl with fists to see who wins",
          "zh": "在旁边煽风点火吹口哨起哄：“快打！使劲打！谁打赢了算谁的！”"
        },
        "icon": "🥊"
      },
      {
        "id": "opt-k3-soc-m8-3",
        "label": {
          "th": "ช่วยเตือนให้ทั้งสองฝ่ายสงบสติอารมณ์ ชวนรับฟังเหตุผลของกันและกัน หรือชวนไปปรึกษาคุณครู 🤝 🕊️",
          "en": "Help both take calming breaths, facilitate mutual active listening, or seek teacher guidance",
          "zh": "温和上前劝阻双方冷静深呼吸，引导各自心平气和说出想法，或陪同一起寻求老师公正调解 🤝 🕊️"
        },
        "icon": "🕊️"
      }
    ],
    "correctOptionId": "opt-k3-soc-m8-3",
    "explanation": {
      "th": "การเป็นสะพานเชื่อมความเข้าใจและส่งเสริมสันติภาพ เป็นทักษะความเป็นผู้นำที่ยอดเยี่ยม เก่งมากครับ!",
      "en": "Awesome! De-escalating tensions and fostering dialogue reflects mature social leadership.",
      "zh": "太棒了！息事宁人、促进沟通对话与理解，是极具领袖气质的高情商大智慧。"
    }
  },
  {
    "id": "k3-soc-m9",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ภาวะผู้นำและการแก้ปัญหาทางสังคม อนุบาล 3 ชุดที่ 9: เมื่อเห็นเพื่อนสองคนในกลุ่มกำลังทะเลาะทุ่มเถียงกันอย่างรุนแรง 🗣️ 💥 การเป็น \"ผู้ไกล่เกลี่ยสันติวิธี\" ควรทำอย่างไร?",
      "en": "K3 Social Mediation #9: Two friends are having an explosive screaming argument 🗣️ 💥: How can you mediate peacefully?",
      "zh": "幼儿园大班调解冲突能力第 9 题：班级里有两个要好的同桌为了争论谁先发言而吵得不可开交、面红耳赤 🗣️ 💥，身为热心和事佬应如何和平劝解？"
    },
    "illustration": "🗣️ 🤝 🕊️",
    "illustrationSubtitle": {
      "th": "การไกล่เกลี่ยข้อพิพาทด้วยสันติวิธี",
      "en": "Peaceful dispute mediation between peers",
      "zh": "同伴矛盾化解：冷静倾听、寻找双赢折中方案"
    },
    "options": [
      {
        "id": "opt-k3-soc-m9-1",
        "label": {
          "th": "ช่วยเตือนให้ทั้งสองฝ่ายสงบสติอารมณ์ ชวนรับฟังเหตุผลของกันและกัน หรือชวนไปปรึกษาคุณครู 🤝 🕊️",
          "en": "Help both take calming breaths, facilitate mutual active listening, or seek teacher guidance",
          "zh": "温和上前劝阻双方冷静深呼吸，引导各自心平气和说出想法，或陪同一起寻求老师公正调解 🤝 🕊️"
        },
        "icon": "🕊️"
      },
      {
        "id": "opt-k3-soc-m9-2",
        "label": {
          "th": "ยุยงให้ทั้งสองคนต่อยตีกันให้รู้แพ้รู้ชนะ",
          "en": "Urge them to brawl with fists to see who wins",
          "zh": "在旁边煽风点火吹口哨起哄：“快打！使劲打！谁打赢了算谁的！”"
        },
        "icon": "🥊"
      },
      {
        "id": "opt-k3-soc-m9-3",
        "label": {
          "th": "หยิบกล้องมาถ่ายคลิปหัวเราะเยาะ",
          "en": "Film videos laughing mockingly",
          "zh": "掏出手机拍摄吵架视频发朋友圈恶搞取乐"
        },
        "icon": "📱"
      }
    ],
    "correctOptionId": "opt-k3-soc-m9-1",
    "explanation": {
      "th": "การเป็นสะพานเชื่อมความเข้าใจและส่งเสริมสันติภาพ เป็นทักษะความเป็นผู้นำที่ยอดเยี่ยม เก่งมากครับ!",
      "en": "Awesome! De-escalating tensions and fostering dialogue reflects mature social leadership.",
      "zh": "太棒了！息事宁人、促进沟通对话与理解，是极具领袖气质的高情商大智慧。"
    }
  },
  {
    "id": "k3-soc-m10",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 2,
    "question": {
      "th": "ภาวะผู้นำและการแก้ปัญหาทางสังคม อนุบาล 3 ชุดที่ 10: เมื่อเห็นเพื่อนสองคนในกลุ่มกำลังทะเลาะทุ่มเถียงกันอย่างรุนแรง 🗣️ 💥 การเป็น \"ผู้ไกล่เกลี่ยสันติวิธี\" ควรทำอย่างไร?",
      "en": "K3 Social Mediation #10: Two friends are having an explosive screaming argument 🗣️ 💥: How can you mediate peacefully?",
      "zh": "幼儿园大班调解冲突能力第 10 题：班级里有两个要好的同桌为了争论谁先发言而吵得不可开交、面红耳赤 🗣️ 💥，身为热心和事佬应如何和平劝解？"
    },
    "illustration": "🗣️ 🤝 🕊️",
    "illustrationSubtitle": {
      "th": "การไกล่เกลี่ยข้อพิพาทด้วยสันติวิธี",
      "en": "Peaceful dispute mediation between peers",
      "zh": "同伴矛盾化解：冷静倾听、寻找双赢折中方案"
    },
    "options": [
      {
        "id": "opt-k3-soc-m10-1",
        "label": {
          "th": "ยุยงให้ทั้งสองคนต่อยตีกันให้รู้แพ้รู้ชนะ",
          "en": "Urge them to brawl with fists to see who wins",
          "zh": "在旁边煽风点火吹口哨起哄：“快打！使劲打！谁打赢了算谁的！”"
        },
        "icon": "🥊"
      },
      {
        "id": "opt-k3-soc-m10-2",
        "label": {
          "th": "ช่วยเตือนให้ทั้งสองฝ่ายสงบสติอารมณ์ ชวนรับฟังเหตุผลของกันและกัน หรือชวนไปปรึกษาคุณครู 🤝 🕊️",
          "en": "Help both take calming breaths, facilitate mutual active listening, or seek teacher guidance",
          "zh": "温和上前劝阻双方冷静深呼吸，引导各自心平气和说出想法，或陪同一起寻求老师公正调解 🤝 🕊️"
        },
        "icon": "🕊️"
      },
      {
        "id": "opt-k3-soc-m10-3",
        "label": {
          "th": "หยิบกล้องมาถ่ายคลิปหัวเราะเยาะ",
          "en": "Film videos laughing mockingly",
          "zh": "掏出手机拍摄吵架视频发朋友圈恶搞取乐"
        },
        "icon": "📱"
      }
    ],
    "correctOptionId": "opt-k3-soc-m10-2",
    "explanation": {
      "th": "การเป็นสะพานเชื่อมความเข้าใจและส่งเสริมสันติภาพ เป็นทักษะความเป็นผู้นำที่ยอดเยี่ยม เก่งมากครับ!",
      "en": "Awesome! De-escalating tensions and fostering dialogue reflects mature social leadership.",
      "zh": "太棒了！息事宁人、促进沟通对话与理解，是极具领袖气质的高情商大智慧。"
    }
  },
  {
    "id": "k3-soc-h1",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "ความฉลาดทางอารมณ์และการฟื้นฟูจิตใจ (Resilience) อนุบาล 3 ชุดที่ 1: เมื่อเรา \"พยายามแข่งขันหรือทำสิ่งใดสิ่งหนึ่งแล้วไม่ประสบความสำเร็จ (แพ้)\" 💔 ทัศนคติที่ทำให้เราเติบโตแข็งแกร่งคือข้อใด?",
      "en": "K3 Emotional Resilience #1: You tried your hardest in a contest but DID NOT WIN (faced defeat) 💔: What resilient mindset spurs growth?",
      "zh": "幼儿园大班逆商抗挫力（Resilience）第 1 题：当全力以赴参加拔河比拼或益智速算大赛却不幸失利落败 💔 时，最能让自己蜕变成长的心态是？"
    },
    "illustration": "💔 ➡️ 🌱 🏆",
    "illustrationSubtitle": {
      "th": "การสร้างพลังใจและการฟื้นตัวจากความล้มเหลว (Growth Mindset)",
      "en": "Resilience and Growth Mindset: Learn from defeat",
      "zh": "挫折成长逆商：接纳失败、总结经验、继续奋斗"
    },
    "options": [
      {
        "id": "opt-k3-soc-h1-1",
        "label": {
          "th": "พังเวทีทำลายถ้วยรางวัลของงานให้แหลกละเอียด",
          "en": "Smash trophies and demolish the competition stage",
          "zh": "怒不可遏冲上颁奖台把金光闪闪的大奖杯一脚踹翻踩碎"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k3-soc-h1-2",
        "label": {
          "th": "ร้องไห้ทุบพื้นแล้วสัญญาว่าจะไม่เรียนหนังสืออีกตลอดชีวิต",
          "en": "Weep banging floor swearing never to learn again",
          "zh": "趴在地上嚎啕大哭绝食抗议，发誓从此退学再也不学任何本领"
        },
        "icon": "😭"
      },
      {
        "id": "opt-k3-soc-h1-3",
        "label": {
          "th": "ยอมรับผลการแข่งขัน แสดงความยินดีกับผู้ชนะ ทบทวนจุดบกพร่องเพื่อฝึกซ้อมให้เก่งขึ้นในครั้งต่อไป 🏆 🌱",
          "en": "Accept the outcome gracefully, congratulate the winner, and practice harder for next time",
          "zh": "坦然接纳比赛结果，微笑为获胜者由衷鼓掌，虚心总结不足并更加刻苦练习，永不言弃 🏆 🌱"
        },
        "icon": "🌱"
      }
    ],
    "correctOptionId": "opt-k3-soc-h1-3",
    "explanation": {
      "th": "ความล้มเหลวเป็นบันไดสู่ความสำเร็จ ผู้ที่มี Growth Mindset จะเรียนรู้จากข้อผิดพลาดและเก่งขึ้นเสมอ เก่งมากครับ!",
      "en": "Spot on! Growth mindset reframes setbacks into stepping stones toward ultimate mastery.",
      "zh": "太棒了！胜不骄败不馁，在挫折中汲取前进的力量，拥有坚不可摧的强大内心！"
    }
  },
  {
    "id": "k3-soc-h2",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "ความฉลาดทางอารมณ์และการฟื้นฟูจิตใจ (Resilience) อนุบาล 3 ชุดที่ 2: เมื่อเรา \"พยายามแข่งขันหรือทำสิ่งใดสิ่งหนึ่งแล้วไม่ประสบความสำเร็จ (แพ้)\" 💔 ทัศนคติที่ทำให้เราเติบโตแข็งแกร่งคือข้อใด?",
      "en": "K3 Emotional Resilience #2: You tried your hardest in a contest but DID NOT WIN (faced defeat) 💔: What resilient mindset spurs growth?",
      "zh": "幼儿园大班逆商抗挫力（Resilience）第 2 题：当全力以赴参加拔河比拼或益智速算大赛却不幸失利落败 💔 时，最能让自己蜕变成长的心态是？"
    },
    "illustration": "💔 ➡️ 🌱 🏆",
    "illustrationSubtitle": {
      "th": "การสร้างพลังใจและการฟื้นตัวจากความล้มเหลว (Growth Mindset)",
      "en": "Resilience and Growth Mindset: Learn from defeat",
      "zh": "挫折成长逆商：接纳失败、总结经验、继续奋斗"
    },
    "options": [
      {
        "id": "opt-k3-soc-h2-1",
        "label": {
          "th": "ยอมรับผลการแข่งขัน แสดงความยินดีกับผู้ชนะ ทบทวนจุดบกพร่องเพื่อฝึกซ้อมให้เก่งขึ้นในครั้งต่อไป 🏆 🌱",
          "en": "Accept the outcome gracefully, congratulate the winner, and practice harder for next time",
          "zh": "坦然接纳比赛结果，微笑为获胜者由衷鼓掌，虚心总结不足并更加刻苦练习，永不言弃 🏆 🌱"
        },
        "icon": "🌱"
      },
      {
        "id": "opt-k3-soc-h2-2",
        "label": {
          "th": "ร้องไห้ทุบพื้นแล้วสัญญาว่าจะไม่เรียนหนังสืออีกตลอดชีวิต",
          "en": "Weep banging floor swearing never to learn again",
          "zh": "趴在地上嚎啕大哭绝食抗议，发誓从此退学再也不学任何本领"
        },
        "icon": "😭"
      },
      {
        "id": "opt-k3-soc-h2-3",
        "label": {
          "th": "พังเวทีทำลายถ้วยรางวัลของงานให้แหลกละเอียด",
          "en": "Smash trophies and demolish the competition stage",
          "zh": "怒不可遏冲上颁奖台把金光闪闪的大奖杯一脚踹翻踩碎"
        },
        "icon": "💥"
      }
    ],
    "correctOptionId": "opt-k3-soc-h2-1",
    "explanation": {
      "th": "ความล้มเหลวเป็นบันไดสู่ความสำเร็จ ผู้ที่มี Growth Mindset จะเรียนรู้จากข้อผิดพลาดและเก่งขึ้นเสมอ เก่งมากครับ!",
      "en": "Spot on! Growth mindset reframes setbacks into stepping stones toward ultimate mastery.",
      "zh": "太棒了！胜不骄败不馁，在挫折中汲取前进的力量，拥有坚不可摧的强大内心！"
    }
  },
  {
    "id": "k3-soc-h3",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "ความฉลาดทางอารมณ์และการฟื้นฟูจิตใจ (Resilience) อนุบาล 3 ชุดที่ 3: เมื่อเรา \"พยายามแข่งขันหรือทำสิ่งใดสิ่งหนึ่งแล้วไม่ประสบความสำเร็จ (แพ้)\" 💔 ทัศนคติที่ทำให้เราเติบโตแข็งแกร่งคือข้อใด?",
      "en": "K3 Emotional Resilience #3: You tried your hardest in a contest but DID NOT WIN (faced defeat) 💔: What resilient mindset spurs growth?",
      "zh": "幼儿园大班逆商抗挫力（Resilience）第 3 题：当全力以赴参加拔河比拼或益智速算大赛却不幸失利落败 💔 时，最能让自己蜕变成长的心态是？"
    },
    "illustration": "💔 ➡️ 🌱 🏆",
    "illustrationSubtitle": {
      "th": "การสร้างพลังใจและการฟื้นตัวจากความล้มเหลว (Growth Mindset)",
      "en": "Resilience and Growth Mindset: Learn from defeat",
      "zh": "挫折成长逆商：接纳失败、总结经验、继续奋斗"
    },
    "options": [
      {
        "id": "opt-k3-soc-h3-1",
        "label": {
          "th": "ร้องไห้ทุบพื้นแล้วสัญญาว่าจะไม่เรียนหนังสืออีกตลอดชีวิต",
          "en": "Weep banging floor swearing never to learn again",
          "zh": "趴在地上嚎啕大哭绝食抗议，发誓从此退学再也不学任何本领"
        },
        "icon": "😭"
      },
      {
        "id": "opt-k3-soc-h3-2",
        "label": {
          "th": "ยอมรับผลการแข่งขัน แสดงความยินดีกับผู้ชนะ ทบทวนจุดบกพร่องเพื่อฝึกซ้อมให้เก่งขึ้นในครั้งต่อไป 🏆 🌱",
          "en": "Accept the outcome gracefully, congratulate the winner, and practice harder for next time",
          "zh": "坦然接纳比赛结果，微笑为获胜者由衷鼓掌，虚心总结不足并更加刻苦练习，永不言弃 🏆 🌱"
        },
        "icon": "🌱"
      },
      {
        "id": "opt-k3-soc-h3-3",
        "label": {
          "th": "พังเวทีทำลายถ้วยรางวัลของงานให้แหลกละเอียด",
          "en": "Smash trophies and demolish the competition stage",
          "zh": "怒不可遏冲上颁奖台把金光闪闪的大奖杯一脚踹翻踩碎"
        },
        "icon": "💥"
      }
    ],
    "correctOptionId": "opt-k3-soc-h3-2",
    "explanation": {
      "th": "ความล้มเหลวเป็นบันไดสู่ความสำเร็จ ผู้ที่มี Growth Mindset จะเรียนรู้จากข้อผิดพลาดและเก่งขึ้นเสมอ เก่งมากครับ!",
      "en": "Spot on! Growth mindset reframes setbacks into stepping stones toward ultimate mastery.",
      "zh": "太棒了！胜不骄败不馁，在挫折中汲取前进的力量，拥有坚不可摧的强大内心！"
    }
  },
  {
    "id": "k3-soc-h4",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "ความฉลาดทางอารมณ์และการฟื้นฟูจิตใจ (Resilience) อนุบาล 3 ชุดที่ 4: เมื่อเรา \"พยายามแข่งขันหรือทำสิ่งใดสิ่งหนึ่งแล้วไม่ประสบความสำเร็จ (แพ้)\" 💔 ทัศนคติที่ทำให้เราเติบโตแข็งแกร่งคือข้อใด?",
      "en": "K3 Emotional Resilience #4: You tried your hardest in a contest but DID NOT WIN (faced defeat) 💔: What resilient mindset spurs growth?",
      "zh": "幼儿园大班逆商抗挫力（Resilience）第 4 题：当全力以赴参加拔河比拼或益智速算大赛却不幸失利落败 💔 时，最能让自己蜕变成长的心态是？"
    },
    "illustration": "💔 ➡️ 🌱 🏆",
    "illustrationSubtitle": {
      "th": "การสร้างพลังใจและการฟื้นตัวจากความล้มเหลว (Growth Mindset)",
      "en": "Resilience and Growth Mindset: Learn from defeat",
      "zh": "挫折成长逆商：接纳失败、总结经验、继续奋斗"
    },
    "options": [
      {
        "id": "opt-k3-soc-h4-1",
        "label": {
          "th": "พังเวทีทำลายถ้วยรางวัลของงานให้แหลกละเอียด",
          "en": "Smash trophies and demolish the competition stage",
          "zh": "怒不可遏冲上颁奖台把金光闪闪的大奖杯一脚踹翻踩碎"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k3-soc-h4-2",
        "label": {
          "th": "ร้องไห้ทุบพื้นแล้วสัญญาว่าจะไม่เรียนหนังสืออีกตลอดชีวิต",
          "en": "Weep banging floor swearing never to learn again",
          "zh": "趴在地上嚎啕大哭绝食抗议，发誓从此退学再也不学任何本领"
        },
        "icon": "😭"
      },
      {
        "id": "opt-k3-soc-h4-3",
        "label": {
          "th": "ยอมรับผลการแข่งขัน แสดงความยินดีกับผู้ชนะ ทบทวนจุดบกพร่องเพื่อฝึกซ้อมให้เก่งขึ้นในครั้งต่อไป 🏆 🌱",
          "en": "Accept the outcome gracefully, congratulate the winner, and practice harder for next time",
          "zh": "坦然接纳比赛结果，微笑为获胜者由衷鼓掌，虚心总结不足并更加刻苦练习，永不言弃 🏆 🌱"
        },
        "icon": "🌱"
      }
    ],
    "correctOptionId": "opt-k3-soc-h4-3",
    "explanation": {
      "th": "ความล้มเหลวเป็นบันไดสู่ความสำเร็จ ผู้ที่มี Growth Mindset จะเรียนรู้จากข้อผิดพลาดและเก่งขึ้นเสมอ เก่งมากครับ!",
      "en": "Spot on! Growth mindset reframes setbacks into stepping stones toward ultimate mastery.",
      "zh": "太棒了！胜不骄败不馁，在挫折中汲取前进的力量，拥有坚不可摧的强大内心！"
    }
  },
  {
    "id": "k3-soc-h5",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "ความฉลาดทางอารมณ์และการฟื้นฟูจิตใจ (Resilience) อนุบาล 3 ชุดที่ 5: เมื่อเรา \"พยายามแข่งขันหรือทำสิ่งใดสิ่งหนึ่งแล้วไม่ประสบความสำเร็จ (แพ้)\" 💔 ทัศนคติที่ทำให้เราเติบโตแข็งแกร่งคือข้อใด?",
      "en": "K3 Emotional Resilience #5: You tried your hardest in a contest but DID NOT WIN (faced defeat) 💔: What resilient mindset spurs growth?",
      "zh": "幼儿园大班逆商抗挫力（Resilience）第 5 题：当全力以赴参加拔河比拼或益智速算大赛却不幸失利落败 💔 时，最能让自己蜕变成长的心态是？"
    },
    "illustration": "💔 ➡️ 🌱 🏆",
    "illustrationSubtitle": {
      "th": "การสร้างพลังใจและการฟื้นตัวจากความล้มเหลว (Growth Mindset)",
      "en": "Resilience and Growth Mindset: Learn from defeat",
      "zh": "挫折成长逆商：接纳失败、总结经验、继续奋斗"
    },
    "options": [
      {
        "id": "opt-k3-soc-h5-1",
        "label": {
          "th": "ยอมรับผลการแข่งขัน แสดงความยินดีกับผู้ชนะ ทบทวนจุดบกพร่องเพื่อฝึกซ้อมให้เก่งขึ้นในครั้งต่อไป 🏆 🌱",
          "en": "Accept the outcome gracefully, congratulate the winner, and practice harder for next time",
          "zh": "坦然接纳比赛结果，微笑为获胜者由衷鼓掌，虚心总结不足并更加刻苦练习，永不言弃 🏆 🌱"
        },
        "icon": "🌱"
      },
      {
        "id": "opt-k3-soc-h5-2",
        "label": {
          "th": "ร้องไห้ทุบพื้นแล้วสัญญาว่าจะไม่เรียนหนังสืออีกตลอดชีวิต",
          "en": "Weep banging floor swearing never to learn again",
          "zh": "趴在地上嚎啕大哭绝食抗议，发誓从此退学再也不学任何本领"
        },
        "icon": "😭"
      },
      {
        "id": "opt-k3-soc-h5-3",
        "label": {
          "th": "พังเวทีทำลายถ้วยรางวัลของงานให้แหลกละเอียด",
          "en": "Smash trophies and demolish the competition stage",
          "zh": "怒不可遏冲上颁奖台把金光闪闪的大奖杯一脚踹翻踩碎"
        },
        "icon": "💥"
      }
    ],
    "correctOptionId": "opt-k3-soc-h5-1",
    "explanation": {
      "th": "ความล้มเหลวเป็นบันไดสู่ความสำเร็จ ผู้ที่มี Growth Mindset จะเรียนรู้จากข้อผิดพลาดและเก่งขึ้นเสมอ เก่งมากครับ!",
      "en": "Spot on! Growth mindset reframes setbacks into stepping stones toward ultimate mastery.",
      "zh": "太棒了！胜不骄败不馁，在挫折中汲取前进的力量，拥有坚不可摧的强大内心！"
    }
  },
  {
    "id": "k3-soc-h6",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "ความฉลาดทางอารมณ์และการฟื้นฟูจิตใจ (Resilience) อนุบาล 3 ชุดที่ 6: เมื่อเรา \"พยายามแข่งขันหรือทำสิ่งใดสิ่งหนึ่งแล้วไม่ประสบความสำเร็จ (แพ้)\" 💔 ทัศนคติที่ทำให้เราเติบโตแข็งแกร่งคือข้อใด?",
      "en": "K3 Emotional Resilience #6: You tried your hardest in a contest but DID NOT WIN (faced defeat) 💔: What resilient mindset spurs growth?",
      "zh": "幼儿园大班逆商抗挫力（Resilience）第 6 题：当全力以赴参加拔河比拼或益智速算大赛却不幸失利落败 💔 时，最能让自己蜕变成长的心态是？"
    },
    "illustration": "💔 ➡️ 🌱 🏆",
    "illustrationSubtitle": {
      "th": "การสร้างพลังใจและการฟื้นตัวจากความล้มเหลว (Growth Mindset)",
      "en": "Resilience and Growth Mindset: Learn from defeat",
      "zh": "挫折成长逆商：接纳失败、总结经验、继续奋斗"
    },
    "options": [
      {
        "id": "opt-k3-soc-h6-1",
        "label": {
          "th": "ร้องไห้ทุบพื้นแล้วสัญญาว่าจะไม่เรียนหนังสืออีกตลอดชีวิต",
          "en": "Weep banging floor swearing never to learn again",
          "zh": "趴在地上嚎啕大哭绝食抗议，发誓从此退学再也不学任何本领"
        },
        "icon": "😭"
      },
      {
        "id": "opt-k3-soc-h6-2",
        "label": {
          "th": "ยอมรับผลการแข่งขัน แสดงความยินดีกับผู้ชนะ ทบทวนจุดบกพร่องเพื่อฝึกซ้อมให้เก่งขึ้นในครั้งต่อไป 🏆 🌱",
          "en": "Accept the outcome gracefully, congratulate the winner, and practice harder for next time",
          "zh": "坦然接纳比赛结果，微笑为获胜者由衷鼓掌，虚心总结不足并更加刻苦练习，永不言弃 🏆 🌱"
        },
        "icon": "🌱"
      },
      {
        "id": "opt-k3-soc-h6-3",
        "label": {
          "th": "พังเวทีทำลายถ้วยรางวัลของงานให้แหลกละเอียด",
          "en": "Smash trophies and demolish the competition stage",
          "zh": "怒不可遏冲上颁奖台把金光闪闪的大奖杯一脚踹翻踩碎"
        },
        "icon": "💥"
      }
    ],
    "correctOptionId": "opt-k3-soc-h6-2",
    "explanation": {
      "th": "ความล้มเหลวเป็นบันไดสู่ความสำเร็จ ผู้ที่มี Growth Mindset จะเรียนรู้จากข้อผิดพลาดและเก่งขึ้นเสมอ เก่งมากครับ!",
      "en": "Spot on! Growth mindset reframes setbacks into stepping stones toward ultimate mastery.",
      "zh": "太棒了！胜不骄败不馁，在挫折中汲取前进的力量，拥有坚不可摧的强大内心！"
    }
  },
  {
    "id": "k3-soc-h7",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "ความฉลาดทางอารมณ์และการฟื้นฟูจิตใจ (Resilience) อนุบาล 3 ชุดที่ 7: เมื่อเรา \"พยายามแข่งขันหรือทำสิ่งใดสิ่งหนึ่งแล้วไม่ประสบความสำเร็จ (แพ้)\" 💔 ทัศนคติที่ทำให้เราเติบโตแข็งแกร่งคือข้อใด?",
      "en": "K3 Emotional Resilience #7: You tried your hardest in a contest but DID NOT WIN (faced defeat) 💔: What resilient mindset spurs growth?",
      "zh": "幼儿园大班逆商抗挫力（Resilience）第 7 题：当全力以赴参加拔河比拼或益智速算大赛却不幸失利落败 💔 时，最能让自己蜕变成长的心态是？"
    },
    "illustration": "💔 ➡️ 🌱 🏆",
    "illustrationSubtitle": {
      "th": "การสร้างพลังใจและการฟื้นตัวจากความล้มเหลว (Growth Mindset)",
      "en": "Resilience and Growth Mindset: Learn from defeat",
      "zh": "挫折成长逆商：接纳失败、总结经验、继续奋斗"
    },
    "options": [
      {
        "id": "opt-k3-soc-h7-1",
        "label": {
          "th": "พังเวทีทำลายถ้วยรางวัลของงานให้แหลกละเอียด",
          "en": "Smash trophies and demolish the competition stage",
          "zh": "怒不可遏冲上颁奖台把金光闪闪的大奖杯一脚踹翻踩碎"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k3-soc-h7-2",
        "label": {
          "th": "ร้องไห้ทุบพื้นแล้วสัญญาว่าจะไม่เรียนหนังสืออีกตลอดชีวิต",
          "en": "Weep banging floor swearing never to learn again",
          "zh": "趴在地上嚎啕大哭绝食抗议，发誓从此退学再也不学任何本领"
        },
        "icon": "😭"
      },
      {
        "id": "opt-k3-soc-h7-3",
        "label": {
          "th": "ยอมรับผลการแข่งขัน แสดงความยินดีกับผู้ชนะ ทบทวนจุดบกพร่องเพื่อฝึกซ้อมให้เก่งขึ้นในครั้งต่อไป 🏆 🌱",
          "en": "Accept the outcome gracefully, congratulate the winner, and practice harder for next time",
          "zh": "坦然接纳比赛结果，微笑为获胜者由衷鼓掌，虚心总结不足并更加刻苦练习，永不言弃 🏆 🌱"
        },
        "icon": "🌱"
      }
    ],
    "correctOptionId": "opt-k3-soc-h7-3",
    "explanation": {
      "th": "ความล้มเหลวเป็นบันไดสู่ความสำเร็จ ผู้ที่มี Growth Mindset จะเรียนรู้จากข้อผิดพลาดและเก่งขึ้นเสมอ เก่งมากครับ!",
      "en": "Spot on! Growth mindset reframes setbacks into stepping stones toward ultimate mastery.",
      "zh": "太棒了！胜不骄败不馁，在挫折中汲取前进的力量，拥有坚不可摧的强大内心！"
    }
  },
  {
    "id": "k3-soc-h8",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "ความฉลาดทางอารมณ์และการฟื้นฟูจิตใจ (Resilience) อนุบาล 3 ชุดที่ 8: เมื่อเรา \"พยายามแข่งขันหรือทำสิ่งใดสิ่งหนึ่งแล้วไม่ประสบความสำเร็จ (แพ้)\" 💔 ทัศนคติที่ทำให้เราเติบโตแข็งแกร่งคือข้อใด?",
      "en": "K3 Emotional Resilience #8: You tried your hardest in a contest but DID NOT WIN (faced defeat) 💔: What resilient mindset spurs growth?",
      "zh": "幼儿园大班逆商抗挫力（Resilience）第 8 题：当全力以赴参加拔河比拼或益智速算大赛却不幸失利落败 💔 时，最能让自己蜕变成长的心态是？"
    },
    "illustration": "💔 ➡️ 🌱 🏆",
    "illustrationSubtitle": {
      "th": "การสร้างพลังใจและการฟื้นตัวจากความล้มเหลว (Growth Mindset)",
      "en": "Resilience and Growth Mindset: Learn from defeat",
      "zh": "挫折成长逆商：接纳失败、总结经验、继续奋斗"
    },
    "options": [
      {
        "id": "opt-k3-soc-h8-1",
        "label": {
          "th": "ยอมรับผลการแข่งขัน แสดงความยินดีกับผู้ชนะ ทบทวนจุดบกพร่องเพื่อฝึกซ้อมให้เก่งขึ้นในครั้งต่อไป 🏆 🌱",
          "en": "Accept the outcome gracefully, congratulate the winner, and practice harder for next time",
          "zh": "坦然接纳比赛结果，微笑为获胜者由衷鼓掌，虚心总结不足并更加刻苦练习，永不言弃 🏆 🌱"
        },
        "icon": "🌱"
      },
      {
        "id": "opt-k3-soc-h8-2",
        "label": {
          "th": "ร้องไห้ทุบพื้นแล้วสัญญาว่าจะไม่เรียนหนังสืออีกตลอดชีวิต",
          "en": "Weep banging floor swearing never to learn again",
          "zh": "趴在地上嚎啕大哭绝食抗议，发誓从此退学再也不学任何本领"
        },
        "icon": "😭"
      },
      {
        "id": "opt-k3-soc-h8-3",
        "label": {
          "th": "พังเวทีทำลายถ้วยรางวัลของงานให้แหลกละเอียด",
          "en": "Smash trophies and demolish the competition stage",
          "zh": "怒不可遏冲上颁奖台把金光闪闪的大奖杯一脚踹翻踩碎"
        },
        "icon": "💥"
      }
    ],
    "correctOptionId": "opt-k3-soc-h8-1",
    "explanation": {
      "th": "ความล้มเหลวเป็นบันไดสู่ความสำเร็จ ผู้ที่มี Growth Mindset จะเรียนรู้จากข้อผิดพลาดและเก่งขึ้นเสมอ เก่งมากครับ!",
      "en": "Spot on! Growth mindset reframes setbacks into stepping stones toward ultimate mastery.",
      "zh": "太棒了！胜不骄败不馁，在挫折中汲取前进的力量，拥有坚不可摧的强大内心！"
    }
  },
  {
    "id": "k3-soc-h9",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "ความฉลาดทางอารมณ์และการฟื้นฟูจิตใจ (Resilience) อนุบาล 3 ชุดที่ 9: เมื่อเรา \"พยายามแข่งขันหรือทำสิ่งใดสิ่งหนึ่งแล้วไม่ประสบความสำเร็จ (แพ้)\" 💔 ทัศนคติที่ทำให้เราเติบโตแข็งแกร่งคือข้อใด?",
      "en": "K3 Emotional Resilience #9: You tried your hardest in a contest but DID NOT WIN (faced defeat) 💔: What resilient mindset spurs growth?",
      "zh": "幼儿园大班逆商抗挫力（Resilience）第 9 题：当全力以赴参加拔河比拼或益智速算大赛却不幸失利落败 💔 时，最能让自己蜕变成长的心态是？"
    },
    "illustration": "💔 ➡️ 🌱 🏆",
    "illustrationSubtitle": {
      "th": "การสร้างพลังใจและการฟื้นตัวจากความล้มเหลว (Growth Mindset)",
      "en": "Resilience and Growth Mindset: Learn from defeat",
      "zh": "挫折成长逆商：接纳失败、总结经验、继续奋斗"
    },
    "options": [
      {
        "id": "opt-k3-soc-h9-1",
        "label": {
          "th": "ร้องไห้ทุบพื้นแล้วสัญญาว่าจะไม่เรียนหนังสืออีกตลอดชีวิต",
          "en": "Weep banging floor swearing never to learn again",
          "zh": "趴在地上嚎啕大哭绝食抗议，发誓从此退学再也不学任何本领"
        },
        "icon": "😭"
      },
      {
        "id": "opt-k3-soc-h9-2",
        "label": {
          "th": "ยอมรับผลการแข่งขัน แสดงความยินดีกับผู้ชนะ ทบทวนจุดบกพร่องเพื่อฝึกซ้อมให้เก่งขึ้นในครั้งต่อไป 🏆 🌱",
          "en": "Accept the outcome gracefully, congratulate the winner, and practice harder for next time",
          "zh": "坦然接纳比赛结果，微笑为获胜者由衷鼓掌，虚心总结不足并更加刻苦练习，永不言弃 🏆 🌱"
        },
        "icon": "🌱"
      },
      {
        "id": "opt-k3-soc-h9-3",
        "label": {
          "th": "พังเวทีทำลายถ้วยรางวัลของงานให้แหลกละเอียด",
          "en": "Smash trophies and demolish the competition stage",
          "zh": "怒不可遏冲上颁奖台把金光闪闪的大奖杯一脚踹翻踩碎"
        },
        "icon": "💥"
      }
    ],
    "correctOptionId": "opt-k3-soc-h9-2",
    "explanation": {
      "th": "ความล้มเหลวเป็นบันไดสู่ความสำเร็จ ผู้ที่มี Growth Mindset จะเรียนรู้จากข้อผิดพลาดและเก่งขึ้นเสมอ เก่งมากครับ!",
      "en": "Spot on! Growth mindset reframes setbacks into stepping stones toward ultimate mastery.",
      "zh": "太棒了！胜不骄败不馁，在挫折中汲取前进的力量，拥有坚不可摧的强大内心！"
    }
  },
  {
    "id": "k3-soc-h10",
    "grade": "K3",
    "subject": "socio_emotional",
    "skillCode": "7",
    "difficulty": 3,
    "question": {
      "th": "ความฉลาดทางอารมณ์และการฟื้นฟูจิตใจ (Resilience) อนุบาล 3 ชุดที่ 10: เมื่อเรา \"พยายามแข่งขันหรือทำสิ่งใดสิ่งหนึ่งแล้วไม่ประสบความสำเร็จ (แพ้)\" 💔 ทัศนคติที่ทำให้เราเติบโตแข็งแกร่งคือข้อใด?",
      "en": "K3 Emotional Resilience #10: You tried your hardest in a contest but DID NOT WIN (faced defeat) 💔: What resilient mindset spurs growth?",
      "zh": "幼儿园大班逆商抗挫力（Resilience）第 10 题：当全力以赴参加拔河比拼或益智速算大赛却不幸失利落败 💔 时，最能让自己蜕变成长的心态是？"
    },
    "illustration": "💔 ➡️ 🌱 🏆",
    "illustrationSubtitle": {
      "th": "การสร้างพลังใจและการฟื้นตัวจากความล้มเหลว (Growth Mindset)",
      "en": "Resilience and Growth Mindset: Learn from defeat",
      "zh": "挫折成长逆商：接纳失败、总结经验、继续奋斗"
    },
    "options": [
      {
        "id": "opt-k3-soc-h10-1",
        "label": {
          "th": "พังเวทีทำลายถ้วยรางวัลของงานให้แหลกละเอียด",
          "en": "Smash trophies and demolish the competition stage",
          "zh": "怒不可遏冲上颁奖台把金光闪闪的大奖杯一脚踹翻踩碎"
        },
        "icon": "💥"
      },
      {
        "id": "opt-k3-soc-h10-2",
        "label": {
          "th": "ร้องไห้ทุบพื้นแล้วสัญญาว่าจะไม่เรียนหนังสืออีกตลอดชีวิต",
          "en": "Weep banging floor swearing never to learn again",
          "zh": "趴在地上嚎啕大哭绝食抗议，发誓从此退学再也不学任何本领"
        },
        "icon": "😭"
      },
      {
        "id": "opt-k3-soc-h10-3",
        "label": {
          "th": "ยอมรับผลการแข่งขัน แสดงความยินดีกับผู้ชนะ ทบทวนจุดบกพร่องเพื่อฝึกซ้อมให้เก่งขึ้นในครั้งต่อไป 🏆 🌱",
          "en": "Accept the outcome gracefully, congratulate the winner, and practice harder for next time",
          "zh": "坦然接纳比赛结果，微笑为获胜者由衷鼓掌，虚心总结不足并更加刻苦练习，永不言弃 🏆 🌱"
        },
        "icon": "🌱"
      }
    ],
    "correctOptionId": "opt-k3-soc-h10-3",
    "explanation": {
      "th": "ความล้มเหลวเป็นบันไดสู่ความสำเร็จ ผู้ที่มี Growth Mindset จะเรียนรู้จากข้อผิดพลาดและเก่งขึ้นเสมอ เก่งมากครับ!",
      "en": "Spot on! Growth mindset reframes setbacks into stepping stones toward ultimate mastery.",
      "zh": "太棒了！胜不骄败不馁，在挫折中汲取前进的力量，拥有坚不可摧的强大内心！"
    }
  }
];
