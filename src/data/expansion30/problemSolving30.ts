import { Question } from '../../types';

export const EXPANSION_30_PROBLEM_SOLVING: Question[] = [
  {
    "id": "exp30-ps-k1-01",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "น้ำหกเลอะบนโต๊ะอาหาร 💧 หนูควรทำอย่างไรเพื่อแก้ปัญหา?",
      "en": "Water spilled on the table 💧. What should you do to fix this?",
      "zh": "餐桌上的水不小心打翻了 💧，小朋友应该怎么做？"
    },
    "illustration": "🥛 💧 🧻 🧼",
    "illustrationSubtitle": {
      "th": "การแก้ปัญหาในชีวิตประจำวัน",
      "en": "Clean up spilled water",
      "zh": "生活自理清洁桌面"
    },
    "options": [
      {
        "id": "opt-wipe",
        "label": {
          "th": "นำผ้าสะอาดหรือทิชชู่มาเช็ดให้แห้ง",
          "en": "Wipe with cloth or paper towel",
          "zh": "拿抹布或纸巾擦干净"
        },
        "icon": "🧻"
      },
      {
        "id": "opt-ignore",
        "label": {
          "th": "วิ่งหนีไปเล่น ไม่สนใจ",
          "en": "Run away and ignore it",
          "zh": "不管不顾直接跑开"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-splash",
        "label": {
          "th": "เอามือตีน้ำให้กระจายทั่วห้อง",
          "en": "Splash it everywhere",
          "zh": "用手到处拍打溅水"
        },
        "icon": "💦"
      }
    ],
    "correctOptionId": "opt-wipe",
    "explanation": {
      "th": "เก่งมากจ้ะ! เมื่อน้ำหก ต้องรีบใช้ผ้าเช็ดโต๊ะให้แห้งและสะอาดจ้ะ",
      "en": "Great job! Wiping up spills promptly keeps the area clean and safe!",
      "zh": "真棒！把打翻的水擦干净，既干净又不会滑倒！"
    }
  },
  {
    "id": "exp30-ps-k1-02",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เล่นปั้นดินน้ำมันเสร็จแล้ว มือเลอะเปื้อน 🖐️ หนูควรทำอย่างไรเป็นอันดับแรก?",
      "en": "Hands sticky and dirty after playing with clay 🖐️. What to do first?",
      "zh": "玩完彩泥粘土后双手脏兮兮的 🖐️，首先应该做什么？"
    },
    "illustration": "🎨 🖐️ 🧼 🚰",
    "illustrationSubtitle": {
      "th": "การดูแลความสะอาดของร่างกาย",
      "en": "Wash hands clean with soap",
      "zh": "用肥皂和水洗手"
    },
    "options": [
      {
        "id": "opt-wipe-shirt",
        "label": {
          "th": "เช็ดมือกับเสื้อผ้าของตัวเอง",
          "en": "Wipe hands on clothes",
          "zh": "直接在自己衣服上擦"
        },
        "icon": "👕"
      },
      {
        "id": "opt-wash-soap",
        "label": {
          "th": "ไปล้างมือด้วยสบู่และน้ำสะอาด",
          "en": "Wash hands with soap and water",
          "zh": "去用香皂和流动清水洗手"
        },
        "icon": "🧼"
      },
      {
        "id": "opt-eat-snack",
        "label": {
          "th": "หยิบขนมเข้าปากทันที",
          "en": "Eat snacks right away",
          "zh": "马上抓零食吃"
        },
        "icon": "🍪"
      }
    ],
    "correctOptionId": "opt-wash-soap",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! ต้องล้างมือด้วยสบู่ให้สะอาด ก่อนไปทำกิจกรรมอื่นจ้ะ",
      "en": "Correct! Washing hands with soap removes dirt and germs!",
      "zh": "完全正确！用肥皂把手洗干净才能保持健康卫生！"
    }
  },
  {
    "id": "exp30-ps-k1-03",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เล่นของเล่นเสร็จแล้ว 🧸 เพื่อไม่ให้ห้องรกและไม่เดินสะดุด ควรทำอย่างไร?",
      "en": "Finished playing with toys 🧸. What should you do with them?",
      "zh": "玩完好玩的玩具后 🧸，为了房间整洁且不摔跤，该怎么做？"
    },
    "illustration": "🧸 🚗 📦 ✨",
    "illustrationSubtitle": {
      "th": "การเก็บของเข้าที่หลังเลิกเล่น",
      "en": "Put toys back in their box",
      "zh": "收纳整理玩具归位"
    },
    "options": [
      {
        "id": "opt-leave-floor",
        "label": {
          "th": "วางทิ้งไว้เกลื่อนพื้นห้อง",
          "en": "Leave them all over the floor",
          "zh": "乱七八糟扔在地上"
        },
        "icon": "🚯"
      },
      {
        "id": "opt-kick",
        "label": {
          "th": "เตะของเล่นไปใต้เตียง โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Kick them under the bed",
          "zh": "一脚踢到床底下"
        },
        "icon": "🥾"
      },
      {
        "id": "opt-pack-box",
        "label": {
          "th": "เก็บของเล่นใส่กล่องเข้าที่ให้เรียบร้อย",
          "en": "Put toys neatly into toy box",
          "zh": "把玩具整齐收回收纳箱"
        },
        "icon": "📦"
      }
    ],
    "correctOptionId": "opt-pack-box",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! เด็กดีเมื่อเล่นของเล่นเสร็จแล้ว ต้องเก็บใส่กล่องให้เป็นระเบียบ",
      "en": "Awesome! Tidying up toys prevents accidents and keeps rooms neat!",
      "zh": "太棒了！自己玩完玩具自己收好，做个懂事的好宝宝！"
    }
  },
  {
    "id": "exp30-ps-k1-04",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "อากาศข้างนอกมีลมพัดแรงและหนาวมาก ❄️ หนูควรเลือกสวมใส่อะไรดี?",
      "en": "It is very cold and windy outside ❄️. What should you wear?",
      "zh": "外面刮大风、天气很冷 ❄️，出门时该穿什么合适？"
    },
    "illustration": "❄️ 🌬️ 🧥 🧣",
    "illustrationSubtitle": {
      "th": "การเลือกเสื้อผ้าตามสภาพอากาศ",
      "en": "Choose warm clothes for cold weather",
      "zh": "根据冷热天气选衣服"
    },
    "options": [
      {
        "id": "opt-jacket",
        "label": {
          "th": "เสื้อกันหนาวอุ่นๆ",
          "en": "Warm jacket or coat",
          "zh": "暖和的厚外套"
        },
        "icon": "🧥"
      },
      {
        "id": "opt-swimsuit",
        "label": {
          "th": "ชุดว่ายน้ำตัวบาง",
          "en": "Swimsuit",
          "zh": "薄薄的游泳衣"
        },
        "icon": "🩱"
      },
      {
        "id": "opt-singlet",
        "label": {
          "th": "เสื้อกล้ามตัวเดียว",
          "en": "Sleeveless tank top",
          "zh": "单薄的小背心"
        },
        "icon": "🎽"
      }
    ],
    "correctOptionId": "opt-jacket",
    "explanation": {
      "th": "เก่งมากจ้ะ! เมื่ออากาศหนาว ต้องสวมเสื้อกันหนาวเพื่อให้ร่างกายอบอุ่น",
      "en": "Great job! Warm clothes protect us from getting chilly colds!",
      "zh": "真聪明！天冷穿厚外套，身体才会暖暖和和不感冒！"
    }
  },
  {
    "id": "exp30-ps-k1-05",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เชือกรองเท้าหลุดขณะกำลังเดินเล่น 👟 หนูควรทำอย่างไรเพื่อไม่ให้หกล้ม?",
      "en": "Your shoelace came untied while walking 👟. What should you do?",
      "zh": "走路时鞋带散开了 👟，为了不被绊倒，应该怎么做？"
    },
    "illustration": "👟 〰️ 🚶 🛑",
    "illustrationSubtitle": {
      "th": "การหยุดและขอความช่วยเหลือ",
      "en": "Stop walking and tie shoelaces",
      "zh": "停下脚步系好鞋带"
    },
    "options": [
      {
        "id": "opt-run-faster",
        "label": {
          "th": "รีบวิ่งให้เร็วขึ้นไปข้างหน้า โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Run faster forward",
          "zh": "不管它反而加速飞跑"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-stop-tie",
        "label": {
          "th": "หยุดเดินแล้วขอให้คุณครูหรือผู้ใหญ่ช่วยผูกให้",
          "en": "Stop and ask adult to tie it",
          "zh": "停下来请老师或大人帮忙系好"
        },
        "icon": "🛑"
      },
      {
        "id": "opt-pull-hard",
        "label": {
          "th": "กระชากเชือกให้ขาด โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Rip the lace off",
          "zh": "使劲扯断鞋带"
        },
        "icon": "✂️"
      }
    ],
    "correctOptionId": "opt-stop-tie",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! ต้องหยุดเดินทันทีเพื่อป้องกันการสะดุดล้ม แล้วบอกผู้ใหญ่ช่วยผูกให้จ้ะ",
      "en": "Correct! Stop walking immediately and ask for help to prevent tripping!",
      "zh": "完全正确！停下来请大人帮忙系鞋带，避免踩到摔跤！"
    }
  },
  {
    "id": "exp30-ps-k1-06",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "ลูกบอลกลิ้งเข้าไปอยู่ใต้เตียงที่มือเอื้อมไม่ถึง ⚽ หนูควรทำอย่างไรดี?",
      "en": "Ball rolled under bed out of reach ⚽. What is the safest solution?",
      "zh": "小球滚进床底下，小手够不着 ⚽，怎样解决最安全？"
    },
    "illustration": "🛏️ ⚽ 🙋 💡",
    "illustrationSubtitle": {
      "th": "การขอความช่วยเหลือเมื่อแก้ปัญหาไม่ได้",
      "en": "Ask for adult assistance",
      "zh": "寻求家长或老师协助"
    },
    "options": [
      {
        "id": "opt-cry-loud",
        "label": {
          "th": "นั่งร้องไห้เสียงดังลั่น",
          "en": "Sit down and cry loudly",
          "zh": "坐在地上大哭大叫"
        },
        "icon": "😭"
      },
      {
        "id": "opt-break-bed",
        "label": {
          "th": "ทุบเตียงให้พัง",
          "en": "Bang and hit the bed",
          "zh": "乱敲乱砸床架"
        },
        "icon": "🔨"
      },
      {
        "id": "opt-ask-parent",
        "label": {
          "th": "บอกคุณพ่อคุณแม่ช่วยหยิบให้",
          "en": "Ask parents/teachers for help",
          "zh": "礼貌请爸爸妈妈帮忙拿"
        },
        "icon": "🙋"
      }
    ],
    "correctOptionId": "opt-ask-parent",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! เมื่อของอยู่ลึกหรือสูงเกินไป ให้ขอความช่วยเหลือจากผู้ใหญ่จ้ะ",
      "en": "Awesome! Asking an adult for help is the smartest, safest solution!",
      "zh": "太棒了！东西够不着时，主动找大人帮忙最聪明！"
    }
  },
  {
    "id": "exp30-ps-k1-07",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "มีเศษขยะซองขนมอยู่ในมือ 🧃 หนูควรนำไปทิ้งที่ใด?",
      "en": "You have an empty snack wrapper 🧃. Where should you throw it?",
      "zh": "手里吃完的零食包装袋 🧃，应该扔到哪里去？"
    },
    "illustration": "🧃 🗑️ 🚮 ✨",
    "illustrationSubtitle": {
      "th": "การทิ้งขยะลงถังให้ถูกต้อง",
      "en": "Throw trash in the trash bin",
      "zh": "垃圾入篓保持环境整洁"
    },
    "options": [
      {
        "id": "opt-trash-can",
        "label": {
          "th": "ทิ้งลงถังขยะให้เรียบร้อย",
          "en": "Throw into the trash bin",
          "zh": "扔进垃圾桶里"
        },
        "icon": "🗑️"
      },
      {
        "id": "opt-throw-floor",
        "label": {
          "th": "โยนลงพื้นทันที",
          "en": "Drop it right on the ground",
          "zh": "直接扔在地板上"
        },
        "icon": "🚯"
      },
      {
        "id": "opt-pocket-leave",
        "label": {
          "th": "ซ่อนไว้ในหมอนหนุน",
          "en": "Hide under a pillow",
          "zh": "偷偷塞进枕头底下"
        },
        "icon": "🛏️"
      }
    ],
    "correctOptionId": "opt-trash-can",
    "explanation": {
      "th": "เก่งมากจ้ะ! ขยะต้องทิ้งลงถังขยะเสมอ เพื่อโรงเรียนและบ้านที่สะอาดน่าอยู่",
      "en": "Great job! Always dispose of waste into a proper trash bin!",
      "zh": "真棒！把垃圾扔进垃圾桶，环境干净人人爱！"
    }
  },
  {
    "id": "exp30-ps-k1-08",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "อยากดื่มน้ำแต่กระติกน้ำปิดฝาแน่นเปิดไม่ออก 🥤 หนูควรทำอย่างไร?",
      "en": "Thirsty but your water bottle cap is stuck tight 🥤. What to do?",
      "zh": "口渴想喝水，但水壶盖子拧得太紧打不开 🥤，该怎么办？"
    },
    "illustration": "🥤 🔒 🙋 💧",
    "illustrationSubtitle": {
      "th": "การสื่อสารขอความช่วยเหลือ",
      "en": "Ask teacher to loosen cap",
      "zh": "礼貌请老师帮忙拧开水杯"
    },
    "options": [
      {
        "id": "opt-throw-bottle",
        "label": {
          "th": "ขว้างกระติกน้ำลงพื้น โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Throw bottle on the floor",
          "zh": "把水壶狠狠摔在地上"
        },
        "icon": "💥"
      },
      {
        "id": "opt-ask-teacher",
        "label": {
          "th": "เดินไปบอกคุณครูว่า \"ช่วยเปิดให้หน่อยครับ/ค่ะ\"",
          "en": "Ask teacher politely for help",
          "zh": "礼貌对老师说：“请帮我打开一下”"
        },
        "icon": "🙋"
      },
      {
        "id": "opt-bite-teeth",
        "label": {
          "th": "ใช้ฟันกัดฝาอย่างแรง โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Bite the cap with teeth",
          "zh": "用牙齿使劲啃盖子"
        },
        "icon": "🦷"
      }
    ],
    "correctOptionId": "opt-ask-teacher",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! พูดขอความช่วยเหลืออย่างสุภาพ ไม่ใช้ฟันกัดเพราะฟันอาจหักได้จ้ะ",
      "en": "Correct! Speaking politely gets help safely without hurting your teeth!",
      "zh": "完全正确！礼貌请老师帮忙拧开，不要用牙咬以免弄伤牙齿！"
    }
  },
  {
    "id": "exp30-ps-k1-09",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เดินชนเพื่อนโดยไม่ตั้งใจจนเพื่อนทำของตก 🥺 หนูควรพูดคำว่าอะไร?",
      "en": "Accidentally bumped into a friend who dropped their toy 🥺. What should you say?",
      "zh": "不小心撞到了小伙伴，导致东西掉落 🥺，应该说什么？"
    },
    "illustration": "🥺 🤝 ❤️ 🙇",
    "illustrationSubtitle": {
      "th": "การกล่าวคำขอโทษและช่วยเก็บของ",
      "en": "Say \"Sorry\" and help pick up",
      "zh": "真诚道歉并帮忙捡起"
    },
    "options": [
      {
        "id": "opt-laugh-friend",
        "label": {
          "th": "หัวเราะเยาะใส่เพื่อน ในห้องเรียนจนเกิดความวุ่นวาย",
          "en": "Laugh at them",
          "zh": "哈哈大笑嘲笑小伙伴"
        },
        "icon": "😆"
      },
      {
        "id": "opt-run-away",
        "label": {
          "th": "แกล้งทำเป็นไม่เห็นแล้ววิ่งหนี",
          "en": "Pretend not seeing and flee",
          "zh": "装作没看见飞快逃跑"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-say-sorry",
        "label": {
          "th": "พูดว่า \"ขอโทษนะ\" และช่วยเพื่อนเก็บของ",
          "en": "Say \"I’m sorry\" & help pick it up",
          "zh": "说：“对不起”，并帮忙捡起东西"
        },
        "icon": "🤝"
      }
    ],
    "correctOptionId": "opt-say-sorry",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! เมื่อทำผิดพลาด ต้องกล่าวคำว่า \"ขอโทษ\" และมีน้ำใจช่วยเพื่อนเสมอจ้ะ",
      "en": "Awesome! Saying sorry and offering help shows kindness and maturity!",
      "zh": "太棒了！知错道歉、主动伸手相助，是最棒的好朋友！"
    }
  },
  {
    "id": "exp30-ps-k1-10",
    "grade": "K1",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 1,
    "question": {
      "th": "เห็นเพื่อนกำลังเล่นม้าโยกอยู่คนเดียว 🎠 แต่หนูก็อยากเล่นด้วย ควรทำอย่างไร?",
      "en": "A friend is on the rocking horse 🎠 and you want to play too. What should you do?",
      "zh": "看到小朋友在玩摇摇木马 🎠，自己也想玩，应该怎么做？"
    },
    "illustration": "🎠 🧒 👧 ⏳",
    "illustrationSubtitle": {
      "th": "การรอคอยและการผลัดกันเล่น",
      "en": "Wait your turn politely",
      "zh": "耐心排队轮流玩耍"
    },
    "options": [
      {
        "id": "opt-wait-turn",
        "label": {
          "th": "ต่อคิวรอและขอว่า \"เล่นเสร็จแล้วขอเราเล่นต่อนะ\"",
          "en": "Wait turn and ask politely",
          "zh": "耐心等待并礼貌说：“等你玩完换我好吗”"
        },
        "icon": "⏳"
      },
      {
        "id": "opt-push-friend",
        "label": {
          "th": "ผลักเพื่อนให้ตกลงมา โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Push friend off",
          "zh": "用力把朋友推下去"
        },
        "icon": "🚫"
      },
      {
        "id": "opt-scream",
        "label": {
          "th": "ยืนกรี๊ดแย่งของเล่น กับเพื่อนๆ รอบตัว",
          "en": "Scream and snatch it",
          "zh": "大吵大闹动手硬抢"
        },
        "icon": "📢"
      }
    ],
    "correctOptionId": "opt-wait-turn",
    "explanation": {
      "th": "เก่งที่สุด! การรู้จักรอคอยคิวและแบ่งปันผลัดกันเล่น ทำให้ทุกคนเล่นด้วยกันอย่างมีความสุข",
      "en": "Splendid! Taking turns and waiting politely creates fun for everyone!",
      "zh": "回答精彩！耐心等待、礼貌轮流玩耍，大家都能开心享受！"
    }
  },
  {
    "id": "exp30-ps-k2-01",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "วันนี้มีฝนตกหนัก ออกไปวิ่งเล่นสนามหญ้าไม่ได้ 🌧️ หนูและเพื่อนควรเลือกทำอะไรแทน?",
      "en": "Heavy rain outside means no playground 🌧️. What indoor fun can you choose?",
      "zh": "外面下大暴雨不能去草地跑步 🌧️，小朋友们可以在室内玩什么？"
    },
    "illustration": "🌧️ 🏠 🧩 🎨 📚",
    "illustrationSubtitle": {
      "th": "การปรับเปลี่ยนกิจกรรมตามสถานการณ์",
      "en": "Choose fun indoor activity",
      "zh": "雨天室内趣味活动选择"
    },
    "options": [
      {
        "id": "opt-run-rain",
        "label": {
          "th": "แอบวิ่งตากฝนเปียกปอน",
          "en": "Sneak out in the storm",
          "zh": "偷溜出去淋暴雨"
        },
        "icon": "⛈️"
      },
      {
        "id": "opt-indoor-games",
        "label": {
          "th": "ต่อตัวต่อหรือวาดรูปเล่นในห้องเรียน",
          "en": "Play puzzles or draw indoors",
          "zh": "在教室里拼积木、画画或读绘本"
        },
        "icon": "🧩"
      },
      {
        "id": "opt-fight",
        "label": {
          "th": "โวยวายทะเลาะกับเพื่อน ในห้องเรียนจนเกิดความวุ่นวาย",
          "en": "Complain and fight friends",
          "zh": "哭闹发脾气找朋友打架"
        },
        "icon": "😠"
      }
    ],
    "correctOptionId": "opt-indoor-games",
    "explanation": {
      "th": "เก่งมากจ้ะ! เมื่อฝนตกข้างนอก กิจกรรมในร่มอย่างการต่อเลโก้หรือวาดรูปก็สนุกสนานและปลอดภัยจ้ะ",
      "en": "Great job! Rainy days are great opportunities for creative indoor games!",
      "zh": "真棒！下雨天在室内拼积木看书，既安全又好玩！"
    }
  },
  {
    "id": "exp30-ps-k2-02",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "ชิ้นส่วนจิ๊กซอว์ภาพสัตว์ขาดไป 1 ชิ้นทำให้ต่อไม่เสร็จ 🧩 หนูควรค้นหาอย่างไรให้เป็นระเบียบ?",
      "en": "One puzzle piece is missing 🧩. How should you search for it systematically?",
      "zh": "拼图还差最后一块没找到 🧩，怎么寻找最有条理？"
    },
    "illustration": "🧩 🔍 📦 🛋️",
    "illustrationSubtitle": {
      "th": "การค้นหาสิ่งของอย่างเป็นขั้นตอน",
      "en": "Systematic searching under desk and box",
      "zh": "有条不紊仔细查找"
    },
    "options": [
      {
        "id": "opt-throw-all",
        "label": {
          "th": "ขว้างชิ้นส่วนที่เหลือทิ้งทั้งหมด โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Throw all remaining pieces away",
          "zh": "把其他所有拼图全扔掉"
        },
        "icon": "🗑️"
      },
      {
        "id": "opt-kick-board",
        "label": {
          "th": "เหยียบกระดานจิ๊กซอว์ให้พัง โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Stomp on the puzzle board",
          "zh": "一脚把拼图板踩烂"
        },
        "icon": "🥾"
      },
      {
        "id": "opt-look-around",
        "label": {
          "th": "ก้มดูใต้โต๊ะ ใต้เก้าอี้ และตรวจดูในกล่องจิ๊กซอว์",
          "en": "Check under table, chairs, and box",
          "zh": "仔细观察桌底、椅子下和拼图盒"
        },
        "icon": "🔍"
      }
    ],
    "correctOptionId": "opt-look-around",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! การค่อยๆ ก้มดูรอบๆ โต๊ะและในกล่อง จะช่วยให้พบชิ้นส่วนที่หายไปได้จ้ะ",
      "en": "Correct! Looking carefully around the work area helps locate missing pieces!",
      "zh": "完全正确！耐心在周围和盒子里仔细寻找，通常很快就能找回缺失的拼图！"
    }
  },
  {
    "id": "exp30-ps-k2-03",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "มีกล่องดินสอสี 1 กล่อง แต่หนูกับเพื่อนอยากใช้สีแดงระบายพร้อมกัน 🖍️ ควรแก้ปัญหาอย่างไร?",
      "en": "Only 1 red crayon 🖍️, but both you and friend need it. How to solve fairly?",
      "zh": "只有唯一一支红色蜡笔 🖍️，你和小伙伴都想用，怎样解决最公平？"
    },
    "illustration": "🖍️ 🤝 ⏰ 🎨",
    "illustrationSubtitle": {
      "th": "การเจรจาและแบ่งปันทรัพยากร",
      "en": "Negotiate and take turns with colors",
      "zh": "协商轮流使用紧俏工具"
    },
    "options": [
      {
        "id": "opt-share-turns",
        "label": {
          "th": "ตกลงสลับกันใช้: เพื่อนระบายส่วนนี้ก่อน แล้วส่งต่อให้หนู",
          "en": "Take turns: friend uses first then hands over",
          "zh": "商量轮流用：一个人先涂这块，再递给另一个人"
        },
        "icon": "🤝"
      },
      {
        "id": "opt-break-crayon",
        "label": {
          "th": "หักดินสอสีเป็นสองท่อนทันที โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Snap crayon in half aggressively",
          "zh": "咔嚓一声直接把笔掰成两段"
        },
        "icon": "💥"
      },
      {
        "id": "opt-hide-crayon",
        "label": {
          "th": "แอบเอาไปซ่อนไม่ให้ใครได้ใช้ ใดๆ เลยทั้งสิ้น",
          "en": "Hide it away so no one can use",
          "zh": "偷偷藏起来谁也别想用"
        },
        "icon": "🙈"
      }
    ],
    "correctOptionId": "opt-share-turns",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! การแบ่งปันและผลัดกันใช้ ทำให้ทำงานศิลปะเสร็จสวยงามทั้งสองคน",
      "en": "Awesome! Taking turns cooperatively allows both friends to complete great art!",
      "zh": "太棒了！友好协商、依次轮流使用，两人都能画出漂亮的图画！"
    }
  },
  {
    "id": "exp30-ps-k2-04",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "ต่อบล็อกไม้สูงขึ้นเรื่อยๆ จนเริ่มเอียงจะล้ม 🧱 หนูควรทำอย่างไรเพื่อไม่ให้พัง?",
      "en": "Block tower is leaning precariously 🧱. What should you do to stabilize it?",
      "zh": "积木塔搭得太高开始倾斜摇晃 🧱，怎样加固才不会倒塌？"
    },
    "illustration": "🧱 🏗️ ⚖️ 💡",
    "illustrationSubtitle": {
      "th": "การสร้างความสมดุลและฐานที่มั่นคง",
      "en": "Widen base for better balance",
      "zh": "扩大底座加固平衡"
    },
    "options": [
      {
        "id": "opt-stack-faster",
        "label": {
          "th": "รีบต่อข้างบนให้สูงขึ้นไปอีกเร็วๆ",
          "en": "Keep piling higher rapidly",
          "zh": "在摇晃顶端拼命往上继续加"
        },
        "icon": "⬆️"
      },
      {
        "id": "opt-widen-base",
        "label": {
          "th": "ขยายฐานด้านล่างให้กว้างและแข็งแรงขึ้น",
          "en": "Widen and strengthen the base",
          "zh": "把底部的底座搭得更宽、更稳固"
        },
        "icon": "🧱"
      },
      {
        "id": "opt-blow-wind",
        "label": {
          "th": "เป่าลมใส่ให้ล้มลงมา โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Blow hard to knock it down",
          "zh": "使劲吹气把它吹倒"
        },
        "icon": "🌬️"
      }
    ],
    "correctOptionId": "opt-widen-base",
    "explanation": {
      "th": "เก่งกาจมาก! ฐานที่กว้างและมั่นคงจะช่วยรับน้ำหนักและทำให้ตึกบล็อกไม้ไม่ล้มจ้ะ",
      "en": "Brilliant! A wide, solid foundation provides stable balance for towers!",
      "zh": "太聪明了！把底部基座建得又宽又结实，高楼才能屹立不倒！"
    }
  },
  {
    "id": "exp30-ps-k2-05",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "เพื่อนกำลังร้องไห้เพราะหกล้มหัวเข่าถลอก 😢 หนูควรทำสิ่งใดเป็นอันดับแรก?",
      "en": "A friend tripped and scraped their knee, crying 😢. What should you do first?",
      "zh": "小伙伴摔倒擦破了膝盖正在伤心哭泣 😢，你首先应该做什么？"
    },
    "illustration": "😢 🩹 🧑‍🏫 🤝",
    "illustrationSubtitle": {
      "th": "การช่วยเหลือและแจ้งคุณครู",
      "en": "Comfort friend and notify teacher",
      "zh": "安慰同伴并报告老师处理伤口"
    },
    "options": [
      {
        "id": "opt-point-laugh",
        "label": {
          "th": "ชี้หน้าหัวเราะเยาะเสียงดัง",
          "en": "Point and mock loudly",
          "zh": "指着伤口大声嘲笑"
        },
        "icon": "😆"
      },
      {
        "id": "opt-run-away",
        "label": {
          "th": "เดินหนีไปทำเหมือนไม่มีอะไรเกิดขึ้น",
          "en": "Walk away pretending nothing happened",
          "zh": "假装没看见默默走开"
        },
        "icon": "🚶"
      },
      {
        "id": "opt-comfort-teacher",
        "label": {
          "th": "ปลอบใจเพื่อนและรีบไปบอกคุณครูมาช่วยทำแผล",
          "en": "Comfort them & call teacher for first aid",
          "zh": "安慰小伙伴，并快跑去叫老师来擦药"
        },
        "icon": "🧑‍🏫"
      }
    ],
    "correctOptionId": "opt-comfort-teacher",
    "explanation": {
      "th": "ถูกต้องนะคร้าบ! ช่วยปลอบใจเพื่อนและรีบแจ้งคุณครูให้มาทำแผลทันที ปลอดภัยที่สุดจ้ะ",
      "en": "Correct! Comforting your friend and calling an adult ensures safe first aid!",
      "zh": "完全正确！主动安慰并及时呼叫老师进行消毒包扎，是最温暖的做法！"
    }
  },
  {
    "id": "exp30-ps-k2-06",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "กรรไกรตัดกระดาษมีความคม ✂️ เวลาส่งกรรไกรให้เพื่อน ควรส่งอย่างไรให้ปลอดภัย?",
      "en": "Scissors are sharp ✂️. How should you safely hand them to a friend?",
      "zh": "小剪刀很锋利 ✂️，给小朋友递剪刀时，怎样传递最安全？"
    },
    "illustration": "✂️ ✋ 🤝 🛡️",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยในการใช้ของมีคม",
      "en": "Hand scissors by holding blades",
      "zh": "握住刀刃，将手柄递给他人"
    },
    "options": [
      {
        "id": "opt-hold-blades",
        "label": {
          "th": "จับส่วนปลายกรรไกร แล้วหันด้ามจับให้เพื่อน",
          "en": "Hold closed blades and offer handles",
          "zh": "用手握拢闭合刀刃，把圆手柄递过去"
        },
        "icon": "🤝"
      },
      {
        "id": "opt-point-sharp",
        "label": {
          "th": "ชี้ปลายแหลมใส่หน้าเพื่อน ในห้องเรียนจนเกิดความวุ่นวาย",
          "en": "Point sharp tip at friend",
          "zh": "用锋利尖头对着朋友"
        },
        "icon": "⚠️"
      },
      {
        "id": "opt-throw-scissors",
        "label": {
          "th": "โยนกรรไกรข้ามโต๊ะ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Toss scissors across table",
          "zh": "从桌子上直接扔过去"
        },
        "icon": "💥"
      }
    ],
    "correctOptionId": "opt-hold-blades",
    "explanation": {
      "th": "ยอดเยี่ยมจ้ะ! จับปลายแหลมที่ปิดสนิทไว้ แล้วยื่นด้ามจับให้เพื่อน เพื่อความปลอดภัย",
      "en": "Awesome! Holding the closed blades and offering the handles prevents accidents!",
      "zh": "太棒了！握紧刀刃，把手柄递给对方，绝不会戳伤别人！"
    }
  },
  {
    "id": "exp30-ps-k2-07",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "กำลังระบายสีอยู่แต่ไส้ดินสอสีหัก ✏️💥 หนูควรทำอย่างไรดี?",
      "en": "Colored pencil lead snapped while drawing ✏️. What is the solution?",
      "zh": "正在涂画画时，彩色铅笔芯突然断了 ✏️💥，应该怎么办？"
    },
    "illustration": "✏️ 💥 🪒 🗑️",
    "illustrationSubtitle": {
      "th": "การใช้กบเหลาดินสออย่างปลอดภัย",
      "en": "Use a pencil sharpener over trash bin",
      "zh": "在垃圾桶上方用卷笔刀削铅笔"
    },
    "options": [
      {
        "id": "opt-throw-away",
        "label": {
          "th": "โยนดินสอทิ้งลงพื้นทันที",
          "en": "Toss pencil on the floor",
          "zh": "把断掉的铅笔气冲冲扔掉"
        },
        "icon": "🗑️"
      },
      {
        "id": "opt-sharpen",
        "label": {
          "th": "นำไปเหลาด้วยกบเหลาดินสอเหนือถังขยะ",
          "en": "Sharpen with sharpener over trash bin",
          "zh": "拿到垃圾桶上方，用卷笔刀轻轻削好"
        },
        "icon": "🪒"
      },
      {
        "id": "opt-cry-paper",
        "label": {
          "th": "ขยำกระดาษวาดรูปทิ้ง",
          "en": "Crumple drawing paper",
          "zh": "把画纸狠狠揉烂"
        },
        "icon": "📄"
      }
    ],
    "correctOptionId": "opt-sharpen",
    "explanation": {
      "th": "เก่งมากจ้ะ! ใช้กบเหลาดินสอเหลาให้แหลมใหม่เหนือถังขยะ เศษดินสอจะได้ไม่เลอะห้อง",
      "en": "Great job! Sharpening over the bin makes it ready to draw without making a mess!",
      "zh": "真棒！在垃圾桶上方用转笔刀削尖，既恢复好用又干净！"
    }
  },
  {
    "id": "exp30-ps-k2-08",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "เห็นคุณยายกำลังถือตะกร้าของหนักเดินขึ้นบันได 👵🧺 หนูควรทำอย่างไร?",
      "en": "Grandma carrying a heavy basket up the stairs 👵. How can you help?",
      "zh": "看到老奶奶提着重重的菜篮上楼梯 👵🧺，懂事的小朋友应该怎么做？"
    },
    "illustration": "👵 🧺 🧒 🤝 🪜",
    "illustrationSubtitle": {
      "th": "การมีน้ำใจช่วยเหลือผู้สูงอายุ",
      "en": "Offer to hold small items and open doors",
      "zh": "主动礼貌帮助长辈"
    },
    "options": [
      {
        "id": "opt-run-past",
        "label": {
          "th": "วิ่งเบียดแซงตัดหน้าคุณยาย โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Sprint past and shove",
          "zh": "从旁边猛跑擦身挤过去"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-mock-heavy",
        "label": {
          "th": "แซวคุณยายว่าเดินช้าจัง โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Mock grandma for being slow",
          "zh": "笑话奶奶走得太慢"
        },
        "icon": "😜"
      },
      {
        "id": "opt-help-grandma",
        "label": {
          "th": "ถามคุณยายว่า \"ให้หนูช่วยถือของเบาๆ หรือเปิดประตูให้ไหมครับ/ค่ะ\"",
          "en": "Offer to carry lighter items or hold doors",
          "zh": "礼貌询问：“奶奶，我帮您拿轻的袋子或推门吧”"
        },
        "icon": "🤝"
      }
    ],
    "correctOptionId": "opt-help-grandma",
    "explanation": {
      "th": "ยอดเยี่ยมมาก! การมีน้ำใจและรู้จักช่วยเหลือผู้สูงอายุเป็นพฤติกรรมของเด็กดีจ้ะ",
      "en": "Awesome! Showing kindness and offering help to elders is wonderful behavior!",
      "zh": "太优秀了！尊敬关爱老人、主动搭把手，是人人夸赞的好孩子！"
    }
  },
  {
    "id": "exp30-ps-k2-09",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "ถ้าหนูเดินหลงกับคุณพ่อคุณแม่ในห้างสรรพสินค้า 🏬 สิ่งแรกที่ควรทำคืออะไร?",
      "en": "Got separated from parents in a shopping mall 🏬. What is the safest action?",
      "zh": "如果在热闹的商场里不小心和爸爸妈妈走散了 🏬，最安全的做法是？"
    },
    "illustration": "🏬 🛑 👮‍♂️ ℹ️",
    "illustrationSubtitle": {
      "th": "ความปลอดภัยเมื่อพลัดหลง",
      "en": "Stay in place & find security or info desk",
      "zh": "原地等待，找穿制服的保安或服务台"
    },
    "options": [
      {
        "id": "opt-stay-security",
        "label": {
          "th": "หยุดอยู่กับที่ และมองหาพี่รปภ. หรือเคาน์เตอร์ประชาสัมพันธ์",
          "en": "Stay put and seek uniformed security/info counter",
          "zh": "留在原地不动，寻找穿制服的保安叔叔或服务台"
        },
        "icon": "👮‍♂️"
      },
      {
        "id": "opt-run-outside",
        "label": {
          "th": "วิ่งออกไปตามถนนข้างนอกคนเดียว โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Run out alone into streets",
          "zh": "一个人飞奔跑到马路上"
        },
        "icon": "🛣️"
      },
      {
        "id": "opt-follow-stranger",
        "label": {
          "th": "เดินตามคนแปลกหน้าไปที่อื่น โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Follow a stranger away",
          "zh": "随便跟着不认识的陌生人走"
        },
        "icon": "🚶"
      }
    ],
    "correctOptionId": "opt-stay-security",
    "explanation": {
      "th": "ถูกต้องที่สุด! อย่าวิ่งไปที่อื่นไกล ให้หาพี่รปภ. หรือพนักงานร้านค้าเพื่อช่วยประกาศหาคุณแม่จ้ะ",
      "en": "Correct! Staying put and seeking official store staff or security keeps you safe!",
      "zh": "完全正确！千万不要乱跑或跟陌生人走，找身穿制服的保安最可靠！"
    }
  },
  {
    "id": "exp30-ps-k2-10",
    "grade": "K2",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 2,
    "question": {
      "th": "ทานไอศกรีมแล้วเลอะเหนียวเหนอะหนะเต็มปากและมือ 🍦 หนูควรทำอย่างไร?",
      "en": "Ice cream melted stickily on hands and mouth 🍦. What should you do?",
      "zh": "吃冰淇淋弄得嘴角和小手上黏糊糊的 🍦，应该怎么办？"
    },
    "illustration": "🍦 😋 🧻 🧼 🚰",
    "illustrationSubtitle": {
      "th": "การทำความสะอาดตนเองหลังทานขนม",
      "en": "Wipe with napkin and wash hands",
      "zh": "用纸巾擦嘴并去洗手"
    },
    "options": [
      {
        "id": "opt-wipe-sofa",
        "label": {
          "th": "ป้ายมือที่เหนียวลงบนเบาะโซฟา โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Wipe sticky hands on couch",
          "zh": "把黏手擦在客厅沙发垫上"
        },
        "icon": "🛋️"
      },
      {
        "id": "opt-wipe-wash",
        "label": {
          "th": "ใช้กระดาษเช็ดปาก แล้วไปล้างมือด้วยสบู่ให้สะอาด",
          "en": "Wipe with napkin, then wash hands with soap",
          "zh": "拿纸巾擦拭嘴角，然后去洗手台洗干净手"
        },
        "icon": "🧼"
      },
      {
        "id": "opt-lick-hands",
        "label": {
          "th": "เลียตามแขนเสื้อไปเรื่อยๆ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Lick sticky sauce on sleeves",
          "zh": "在衣服袖子上舔来舔去"
        },
        "icon": "👅"
      }
    ],
    "correctOptionId": "opt-wipe-wash",
    "explanation": {
      "th": "เก่งที่สุด! เช็ดปากด้วยกระดาษทิชชู่ แล้วล้างมือด้วยน้ำสบู่ จะสดชื่นไม่เหนียวตัวจ้ะ",
      "en": "Splendid! Wiping and washing with soap removes sweet stickiness completely!",
      "zh": "答得很棒！用纸巾擦好嘴巴并洗手，清清爽爽讲卫生！"
    }
  },
  {
    "id": "exp30-ps-k3-01",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "กลุ่มเพื่อนกำลังทะเลาะกันว่าจะเล่นซ่อนแอบหรือเตะฟุตบอลดี ⚽ ในฐานะผู้นำกลุ่ม หนูจะตัดสินใจอย่างไร?",
      "en": "Friends arguing whether to play hide-and-seek or soccer ⚽. How to resolve fairly?",
      "zh": "小伙伴们在争吵是玩捉迷藏还是踢足球 ⚽，作为小队长该如何公正解决？"
    },
    "illustration": "⚽ 🙈 🗳️ 🤝",
    "illustrationSubtitle": {
      "th": "การตัดสินใจอย่างเป็นประชาธิปไตยในห้องเรียน",
      "en": "Democratic voting or play one after the other",
      "zh": "举手表决多数或先后轮流玩耍"
    },
    "options": [
      {
        "id": "opt-yell-own",
        "label": {
          "th": "ตะโกนบังคับให้ทุกคนต้องเล่นตามใจตัวเองเท่านั้น",
          "en": "Yell and force everyone to obey",
          "zh": "大吼大叫逼所有人只能听自己的"
        },
        "icon": "📢"
      },
      {
        "id": "opt-walk-home",
        "label": {
          "th": "หนีกลับบ้านไม่ยอมเล่นกับใคร ใดๆ เลยทั้งสิ้น",
          "en": "Storm off home crying",
          "zh": "赌气扔下所有人直接跑回家"
        },
        "icon": "🚪"
      },
      {
        "id": "opt-vote-or-split",
        "label": {
          "th": "ให้ทุกคนโหวตออกเสียง หรือตกลงเล่นฟุตบอลก่อนแล้วต่อด้วยซ่อนแอบ",
          "en": "Vote democratically or play one first then the other",
          "zh": "大家举手投票决定，或者先踢会儿球再去捉迷藏"
        },
        "icon": "🗳️"
      }
    ],
    "correctOptionId": "opt-vote-or-split",
    "explanation": {
      "th": "ยอดเยี่ยมมาก! การใช้การโหวตออกเสียงหรือแบ่งเวลาเล่นทั้งสองอย่าง เป็นวิธีแก้ปัญหาที่ยุติธรรมที่สุด",
      "en": "Spot on! Voting or sequencing both games ensures every friend’s voice is honored fairly!",
      "zh": "精彩！通过民主表决或合理分配时间先后都玩，最公平也最能凝聚朋友！"
    }
  },
  {
    "id": "exp30-ps-k3-02",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "การทดลองลอย-จม: ทำไมเรือเหล็กขนาดใหญ่ถึงลอยน้ำได้ แต่ตะปูตัวเล็กกลับจมน้ำ? 🚢 🪛",
      "en": "Sink or Float: Why does a giant iron ship float 🚢, but a tiny iron nail sinks? 🪛",
      "zh": "沉浮科学思考：为什么巨大的钢铁轮船能浮在水面 🚢，而小小的铁钉却沉入水底？🪛"
    },
    "illustration": "🚢 (ลอย) 🌊  VS  🪛 ⬇️ (จม)",
    "illustrationSubtitle": {
      "th": "การคิดวิเคราะห์เหตุและผลทางวิทยาศาสตร์",
      "en": "Shape and air volume displacement",
      "zh": "船体造型与空气排开水浮力"
    },
    "options": [
      {
        "id": "opt-boat-hollow",
        "label": {
          "th": "เรือมีรูปร่างกลวงกว้างและมีอากาศอยู่ข้างใน ทำให้มีแรงพยุงลอยน้ำได้",
          "en": "Hollow wide shape traps air, creating buoyancy",
          "zh": "轮船做成中空凹型，内部有大量空气产生浮力"
        },
        "icon": "🚢"
      },
      {
        "id": "opt-nail-heavy",
        "label": {
          "th": "ตะปูมีเวทมนตร์วิเศษดึงดูดน้ำ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Nails have magic water power",
          "zh": "铁钉有魔法吸引水"
        },
        "icon": "🪄"
      },
      {
        "id": "opt-boat-light",
        "label": {
          "th": "เรือเบากว่าขนนก โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Ships weigh less than a feather",
          "zh": "巨轮比羽毛还要轻"
        },
        "icon": "🪶"
      }
    ],
    "correctOptionId": "opt-boat-hollow",
    "explanation": {
      "th": "เก่งกาจมาก! เรือถูกออกแบบให้กว้างและมีพื้นที่อากาศข้างในมาก จึงเกิดแรงลอยตัวพยุงเรือไว้",
      "en": "Brilliant! The hollow hull shape displaces enough water to produce upward buoyancy!",
      "zh": "太聪明了！中空的船体设计排开大量水，产生的向上浮力足以托起巨轮！"
    }
  },
  {
    "id": "exp30-ps-k3-03",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "หนูกำลังปลูกต้นทานตะวันในกระถาง 🌻 แต่สังเกตว่าใบเริ่มเหี่ยวเฉาแห้งกรอบ ควรแก้ไขอย่างไร?",
      "en": "Your potted sunflower leaves are wilting dry 🌻. How should you nurse it back?",
      "zh": "阳台花盆里种的向日葵叶子发蔫干枯 🌻，应该如何解决挽救它？"
    },
    "illustration": "🌻 🥀 ➡️ 🚿 ☀️ 🌿",
    "illustrationSubtitle": {
      "th": "การวิเคราะห์ปัญหาการเจริญเติบโตของพืช",
      "en": "Water the dry soil and place in proper sunlight",
      "zh": "给干燥土壤适量浇水并接受阳光"
    },
    "options": [
      {
        "id": "opt-pull-leaves",
        "label": {
          "th": "เด็ดใบเหี่ยวทิ้งทั้งหมดจนเหลือแต่ก้าน โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Rip off all leaves completely",
          "zh": "把发蔫的叶子全部拔光只剩光头"
        },
        "icon": "✂️"
      },
      {
        "id": "opt-water-soil",
        "label": {
          "th": "รดน้ำให้ดินชุ่มชื้นพอดี และวางในที่ที่มีแสงแดดส่องถึง",
          "en": "Water the soil adequately & ensure sunlight",
          "zh": "适量给干涸土壤浇水，并放在阳光充足通风处"
        },
        "icon": "🚿"
      },
      {
        "id": "opt-put-freezer",
        "label": {
          "th": "เอากระถางไปแช่ในตู้เย็นช่องแช่แข็ง โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Put plant in freezer",
          "zh": "搬进冰箱冷冻室冷藏"
        },
        "icon": "🧊"
      }
    ],
    "correctOptionId": "opt-water-soil",
    "explanation": {
      "th": "ยอดเยี่ยมมาก! พืชต้องการน้ำ แสงแดด และอากาศในการสังเคราะห์แสงเพื่อกลับมาสดชื่นจ้ะ",
      "en": "Awesome! Plants need water, balanced sunlight, and nutrients to revive healthy leaves!",
      "zh": "太棒了！植物需要水分滋润和适度阳光进行光合作用，很快就会恢复生机！"
    }
  },
  {
    "id": "exp30-ps-k3-04",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "ถ้าหนูเห็นควันไฟลอยออกมาจากห้องครัวและได้กลิ่นไหม้ 🚨 สิ่งที่ต้องทำทันทีคืออะไร?",
      "en": "You see smoke pouring from the kitchen and smell burning 🚨. What must you do?",
      "zh": "看到厨房冒出浓浓黑烟并闻到烧焦味 🚨，第一时间必须做什么？"
    },
    "illustration": "🚨 💨 🔥 🏃 🧑‍🚒",
    "illustrationSubtitle": {
      "th": "การตัดสินใจในสถานการณ์ฉุกเฉินไฟไหม้",
      "en": "Evacuate safely and alert adults immediately",
      "zh": "迅速逃离现场并大声呼喊大人求救"
    },
    "options": [
      {
        "id": "opt-hide-closet",
        "label": {
          "th": "มุดเข้าไปซ่อนตัวในตู้เสื้อผ้าคนเดียว โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Hide alone inside a closet",
          "zh": "一个人钻进衣柜紧紧躲起来"
        },
        "icon": "🚪"
      },
      {
        "id": "opt-touch-fire",
        "label": {
          "th": "เอามือเปล่าไปจับกระทะที่กำลังไหม้ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Touch burning pans with bare hands",
          "zh": "用小手去碰滚烫着火的锅底"
        },
        "icon": "🔥"
      },
      {
        "id": "opt-evacuate-call",
        "label": {
          "th": "รีบออกจากบริเวณนั้นไปที่ปลอดภัย แล้วตะโกนบอกผู้ใหญ่ทันที",
          "en": "Evacuate to safety & alert adults immediately",
          "zh": "立刻捂住口鼻跑到室外安全处，大声呼叫大人"
        },
        "icon": "🏃"
      }
    ],
    "correctOptionId": "opt-evacuate-call",
    "explanation": {
      "th": "ถูกต้องที่สุด! เรื่องไฟไหม้เป็นอันตรายร้ายแรง ต้องรีบหนีออกไปที่โล่งปลอดภัยแล้วแจ้งผู้ใหญ่ทันที",
      "en": "Correct! Never hide during fires—evacuate quickly to fresh air and alert adults!",
      "zh": "完全正确！火灾极为危险，绝不能躲藏，要立刻撤离到室外并告知大人！"
    }
  },
  {
    "id": "exp30-ps-k3-05",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "การข้ามถนนที่มีทางม้าลายและไฟคนข้าม 🚦 หนูควรตัดสินใจก้าวเดินข้ามเมื่อใด?",
      "en": "Crossing a crosswalk with pedestrian signal 🚦. When is it safe to cross?",
      "zh": "在有人行斑马线和行人红绿灯的路口 🚦，什么时候才可以安全过马路？"
    },
    "illustration": "🚶 🚦 🟢 🛑 🚗",
    "illustrationSubtitle": {
      "th": "การตัดสินใจข้ามถนนอย่างปลอดภัย",
      "en": "Cross when green pedestrian light is on and cars stop",
      "zh": "绿灯亮起且确认无来车时牵大人手走过"
    },
    "options": [
      {
        "id": "opt-green-light",
        "label": {
          "th": "เมื่อไฟคนข้ามเป็นสีเขียว 🟢 รถทุกคันจอดสนิท และเดินข้ามพร้อมผู้ใหญ่",
          "en": "Green pedestrian light on, cars stopped, with adult",
          "zh": "行人绿灯亮起 🟢、确认车辆停稳后，由大人牵手走过"
        },
        "icon": "🟢"
      },
      {
        "id": "opt-red-light",
        "label": {
          "th": "เมื่อไฟเป็นสีแดงและรถกำลังวิ่งเร็ว โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "When light is red and cars speed by",
          "zh": "红灯时硬闯"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-run-eyes-shut",
        "label": {
          "th": "หลับตาวิ่งตัดหน้ารถ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Close eyes and sprint blindly",
          "zh": "闭着眼睛往前猛冲"
        },
        "icon": "🙈"
      }
    ],
    "correctOptionId": "opt-green-light",
    "explanation": {
      "th": "ยอดเยี่ยมมาก! ข้ามเมื่อไฟเขียวคนข้าม มองซ้าย-ขวาให้แน่ใจว่ารถหยุดสนิท และมีผู้ใหญ่จูงมือข้าม",
      "en": "Awesome! Wait for the green walk signal, ensure all cars have stopped, and hold an adult’s hand!",
      "zh": "太棒了！绿灯亮起、左看右看确认车辆停下、由大人牵手走斑马线最安全！"
    }
  },
  {
    "id": "exp30-ps-k3-06",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "มีเศษขวดแก้วแตกตกอยู่บนทางเดินในห้องเรียน 🏺💥 หนูควรทำอย่างไรเป็นอันดับแรก?",
      "en": "Broken glass shards on the classroom floor 🏺💥. What should you do?",
      "zh": "教室过道上有打碎的花瓶玻璃碎片 🏺💥，小朋友应该怎么做？"
    },
    "illustration": "🏺 💥 ⚠️ 🛑 🧑‍🏫",
    "illustrationSubtitle": {
      "th": "การป้องกันอันตรายจากของมีคมแตก",
      "en": "Warn friends to stay back and call teacher",
      "zh": "提醒小朋友别靠近，立刻请老师用扫把清理"
    },
    "options": [
      {
        "id": "opt-bare-hands",
        "label": {
          "th": "ใช้มือเปล่าหยิบเศษแก้วเล่น กับเพื่อนๆ รอบตัว",
          "en": "Pick up sharp glass with bare hands",
          "zh": "直接用小手去抓锋利的碎玻璃玩"
        },
        "icon": "🖐️"
      },
      {
        "id": "opt-warn-teacher",
        "label": {
          "th": "บอกเพื่อนๆ ให้ถอยห่าง และรีบแจ้งคุณครูมาใช้ไม้กวาดทำความสะอาด",
          "en": "Warn peers to stay away & ask teacher to sweep",
          "zh": "大声提醒同伴别走过来，并立刻请老师拿扫把扫走"
        },
        "icon": "🧑‍🏫"
      },
      {
        "id": "opt-kick-under",
        "label": {
          "th": "ใช้เท้าเตะเศษแก้วไปใต้โต๊ะ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Kick shards under table",
          "zh": "用脚把碎玻璃踢到桌子底下"
        },
        "icon": "🥾"
      }
    ],
    "correctOptionId": "opt-warn-teacher",
    "explanation": {
      "th": "ถูกต้องที่สุด! ห้ามใช้มือเปล่าจับแก้วแตกเด็ดขาด ต้องกันเพื่อนให้อยู่ห่างๆ และให้ผู้ใหญ่มากวาดจ้ะ",
      "en": "Correct! Never touch broken glass with bare hands; keep everyone away and let adults sweep it!",
      "zh": "完全正确！碎玻璃极其锋利切忌用手捡，警告同伴后请老师用工具清扫！"
    }
  },
  {
    "id": "exp30-ps-k3-07",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "ต้องจัดกระเป๋านักเรียนสำหรับวันพรุ่งนี้ 🎒 หนูควรทำตามขั้นตอนใดเพื่อให้ได้ของครบถ้วน?",
      "en": "Packing school backpack for tomorrow 🎒. What is the most effective approach?",
      "zh": "整理明天上学要带的小书包 🎒，怎样做才能保证带齐所有文具用品？"
    },
    "illustration": "🎒 📋 ✏️ 📖 🕒",
    "illustrationSubtitle": {
      "th": "การวางแผนและจัดเตรียมของอย่างมีระบบ",
      "en": "Check timetable and tick checklist",
      "zh": "对照课程表和清单逐项整理"
    },
    "options": [
      {
        "id": "opt-pack-toys-only",
        "label": {
          "th": "ยัดของเล่นชิ้นโปรดใส่ให้เต็มกระเป๋า โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Stuff backpack only with toys",
          "zh": "把整袋玩具全部塞满书包"
        },
        "icon": "🧸"
      },
      {
        "id": "opt-wait-morning",
        "label": {
          "th": "รอไปหาใส่กระเป๋าตอนเช้าก่อนรถโรงเรียนมารับ 1 นาที",
          "en": "Scramble 1 minute before school bus arrives",
          "zh": "等明天校车快到前一分钟再手忙脚乱乱抓"
        },
        "icon": "⏰"
      },
      {
        "id": "opt-check-schedule",
        "label": {
          "th": "เปิดดูตารางเรียน และจัดหนังสือตามวิชาที่ต้องเรียนพรุ่งนี้",
          "en": "Check class schedule & pack required books/tools",
          "zh": "看清明天的课程表，对照科目装入课本与所需文具"
        },
        "icon": "📋"
      }
    ],
    "correctOptionId": "opt-check-schedule",
    "explanation": {
      "th": "เก่งกาจมาก! การตรวจดูตารางเรียนล่วงหน้าช่วยให้เราเตรียมหนังสือและอุปกรณ์ครบ ไม่ลืมของจ้ะ",
      "en": "Brilliant! Checking the timetable in advance ensures all necessary supplies are ready!",
      "zh": "太聪明了！前一天晚上对照课程表整理书包，自律自理又不会丢三落四！"
    }
  },
  {
    "id": "exp30-ps-k3-08",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "คุณครูกำหนดโจทย์สร้างสะพานจากกระดาษ 🌉 แผ่นกระดาษบางรับน้ำหนักของเล่นไม่ได้ หนูควรดัดแปลงกระดาษอย่างไร?",
      "en": "Engineering challenge: Paper bridge collapses under weight 🌉. How can you strengthen paper?",
      "zh": "小工程师挑战：纸桥太软承载不了小玩具 🌉，怎样折叠改造白纸能让它变结实？"
    },
    "illustration": "📄 ➡️ 〰️〰️ (พับจีบแบบพัด) ➡️ 🌉 💪",
    "illustrationSubtitle": {
      "th": "การคิดแก้ปัญหาเชิงวิศวกรรม",
      "en": "Fold paper like accordion fan / cylinders",
      "zh": "把平纸折成手风琴褶皱或卷成圆柱体"
    },
    "options": [
      {
        "id": "opt-fold-accordion",
        "label": {
          "th": "พับกระดาษทบไปมาเป็นรอยหยัก (แบบพัด) หรือม้วนเป็นแท่งทรงกระบอก",
          "en": "Fold into accordion pleats or roll into cylinders",
          "zh": "把纸折成锯齿波浪褶皱（折扇状）或卷成圆筒柱"
        },
        "icon": "📐"
      },
      {
        "id": "opt-tear-small",
        "label": {
          "th": "ฉีกกระดาษเป็นชิ้นเล็กชิ้นน้อยแล้วโปรย โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Tear paper into confetti shreds",
          "zh": "把纸全撕成碎纸屑扔掉"
        },
        "icon": "✂️"
      },
      {
        "id": "opt-soak-water",
        "label": {
          "th": "เอากระดาษไปแช่น้ำจนเปื่อยยุ่ย โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Soak paper in water until mushy",
          "zh": "把纸浸泡在水里变成烂纸泥"
        },
        "icon": "💧"
      }
    ],
    "correctOptionId": "opt-fold-accordion",
    "explanation": {
      "th": "ยอดเยี่ยมที่สุด! การพับเป็นลอนลูกฟูก (Corrugated) ช่วยกระจายน้ำหนัก ทำให้กระดาษแข็งแรงขึ้นมาก",
      "en": "Awesome! Accordion pleating creates structural ribs that dramatically increase paper strength!",
      "zh": "太绝了！折成波浪瓦楞形或圆柱体能极大分散重力，纸张立刻变得坚固无比！"
    }
  },
  {
    "id": "exp30-ps-k3-09",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "เพื่อนร่วมทีมในการทำงานศิลปะกลุ่มไม่ช่วยทำงานและนั่งเฉยๆ 🎨 หนูควรพูดจูงใจเพื่อนอย่างไร?",
      "en": "A teammate isn’t participating in group art project 🎨. How can you encourage them positively?",
      "zh": "小组美术合作时，有个小伙伴坐着不肯参与 🎨，你该怎样积极鼓励引导他？"
    },
    "illustration": "🎨 🤝 🗣️ 👧 🧒",
    "illustrationSubtitle": {
      "th": "การทำงานร่วมกันและสร้างแรงจูงใจเชิงบวก",
      "en": "Invite with specific fun role: \"You color the sky!\"",
      "zh": "友好分工并邀请：“你画画很棒，来帮我们涂蓝天好吗”"
    },
    "options": [
      {
        "id": "opt-scold-loud",
        "label": {
          "th": "ตะคอกด่าเพื่อนว่าขี้เกียจไปฟ้องครู โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Yell insults and threaten to tattle",
          "zh": "指着对方鼻子大骂大吵"
        },
        "icon": "😡"
      },
      {
        "id": "opt-invite-role",
        "label": {
          "th": "ชวนด้วยคำพูดดีๆ ว่า \"เธอช่วยระบายสีท้องฟ้าตรงนี้ได้ไหม ภาพเราจะได้สวยสมบูรณ์\"",
          "en": "Invite positively: \"Could you help color this sky? You’re great at it!\"",
          "zh": "温和邀请：“你涂色很好看，负责帮我们涂这片美丽的蓝天好不好？”"
        },
        "icon": "🤝"
      },
      {
        "id": "opt-exclude",
        "label": {
          "th": "ผลักเพื่อนออกจากกลุ่มไม่ให้มีชื่อ ใดๆ เลยทั้งสิ้น",
          "en": "Shove them away from the table",
          "zh": "把对方推开直接排除在外"
        },
        "icon": "🚪"
      }
    ],
    "correctOptionId": "opt-invite-role",
    "explanation": {
      "th": "สุดยอดภาวะผู้นำ! การมอบหมายหน้าที่ที่เพื่อนถนัดด้วยคำพูดสุภาพ จะช่วยดึงดูดให้เพื่อนอยากร่วมมือ",
      "en": "Super leadership! Giving friends an encouraging, specific role fosters warm team collaboration!",
      "zh": "极具领袖才华！用温暖肯定的话语赋予同伴擅长的小任务，团队合作更愉快高效！"
    }
  },
  {
    "id": "exp30-ps-k3-10",
    "grade": "K3",
    "subject": "problem_solving",
    "skillCode": "3",
    "difficulty": 3,
    "question": {
      "th": "ลืมเอากระเป๋าดินสอมาโรงเรียนในวันที่มีการวาดภาพระบายสี ✏️ ทางเลือกใดในการแก้ปัญหาดีที่สุด?",
      "en": "Forgot your pencil case on art day ✏️. What is the most mature problem-solving path?",
      "zh": "美术课时发现自己忘记带笔袋了 ✏️，哪一种解决问题的途径最成熟懂事？"
    },
    "illustration": "✏️ 🎒 ❓ 🙋 🤝",
    "illustrationSubtitle": {
      "th": "การขอความช่วยเหลือและการแก้ปัญหาเฉพาะหน้า",
      "en": "Politely borrow from teacher’s spare box or ask desk mate",
      "zh": "礼貌向老师备用盒借用或礼貌借同桌多余彩笔"
    },
    "options": [
      {
        "id": "opt-steal-secret",
        "label": {
          "th": "แอบขโมยดินสอของเพื่อนตอนเพื่อนเผลอ โดยไม่ได้คิดไตร่ตรองให้รอบคอบ",
          "en": "Steal peer’s pencils secretly",
          "zh": "趁同桌不注意悄悄偷拿别人的笔"
        },
        "icon": "🤫"
      },
      {
        "id": "opt-cry-refuse",
        "label": {
          "th": "นอนคว่ำหน้าร้องไห้ไม่ยอมเรียน ใดๆ เลยทั้งสิ้น",
          "en": "Lie face down crying all day",
          "zh": "趴在桌上大哭拒绝上课"
        },
        "icon": "😭"
      },
      {
        "id": "opt-borrow-politely",
        "label": {
          "th": "ยกมือบอกคุณครูขอหยิบจากกล่องส่วนกลาง หรือขอแบ่งปันยืมจากเพื่อนข้างๆ",
          "en": "Raise hand for classroom spare box or politely borrow from neighbor",
          "zh": "举手向老师借用班级备用笔，或礼貌向同桌借一支多余的彩笔"
        },
        "icon": "🙋"
      }
    ],
    "correctOptionId": "opt-borrow-politely",
    "explanation": {
      "th": "ยอดเยี่ยมมาก! การกล้าสื่อสารและขอความช่วยเหลืออย่างสุภาพ คือทักษะการแก้ปัญหาที่น่าชื่นชมที่สุด",
      "en": "Splendid! Communicating politely and borrowing spares calmly resolves the problem with dignity!",
      "zh": "太棒了！勇敢、礼貌地寻求支持与同伴分享，是解决突发小状况的最佳品质！"
    }
  }
];
