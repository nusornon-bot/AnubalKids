import { Question } from '../types';

/**
 * คลังแบบทดสอบ: ความเป็นพลเมืองและสิ่งแวดล้อม (Citizenship & Environment) จำนวน 90 ข้อ
 * ครบ 3 ระดับชั้น (อ.1 - อ.3) ระดับความยากละ 10 ข้อ (ง่าย, ปานกลาง, ท้าทาย)
 * กระจายตำแหน่งคำตอบถูกต้อง A, B, C อย่างสมดุลเท่าเทียมกัน
 */
export const QUESTIONS_CITIZENSHIP: Question[] = [
  {
    "id": "k1-cit-e1",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "เมื่อรับประทานขนมเสร็จแล้ว เปลือกขนมและถุงพลาสติก 🍬 🧃 ควรนำไปทิ้งที่ใด?",
      "en": "Finished eating snacks 🍬 🧃: Where MUST wrappers and plastic bags be thrown?",
      "zh": "吃完美味的糖果面包和牛奶饼干后，手里的零食包装袋和塑料盒 🍬 🧃 应该扔在何处？"
    },
    "illustration": "🍬 🧃 🗑️",
    "illustrationSubtitle": {
      "th": "การทิ้งขยะลงถังขยะอย่างถูกที่",
      "en": "Throwing garbage into trash bins",
      "zh": "文明卫生行为：垃圾务必投进垃圾桶"
    },
    "options": [
      {
        "id": "opt-k1-cit-e1-1",
        "label": {
          "th": "ทิ้งลงใน \"ถังขยะ\" ให้เรียบร้อย 🗑️",
          "en": "Throw neatly into a TRASH CAN",
          "zh": "自觉走上前、妥善扔进“分类垃圾桶”内 🗑️"
        },
        "icon": "🗑️"
      },
      {
        "id": "opt-k1-cit-e1-2",
        "label": {
          "th": "โยนทิ้งลงบนพื้นสนามหญ้าทันที",
          "en": "Drop carelessly onto lawn grass",
          "zh": "随手直接扔在脚下青翠的草坪上"
        },
        "icon": "🌱"
      },
      {
        "id": "opt-k1-cit-e1-3",
        "label": {
          "th": "แอบยัดไว้ใต้หมอนเพื่อนร่วมห้อง",
          "en": "Stuff under classmate's pillow secretly",
          "zh": "偷偷塞到旁边同学的午睡枕头底下"
        },
        "icon": "🛏️"
      }
    ],
    "correctOptionId": "opt-k1-cit-e1-1",
    "explanation": {
      "th": "การทิ้งขยะลงถังช่วยให้โรงเรียนและบ้านเมืองสะอาดน่าอยู่ เก่งมากครับ!",
      "en": "Correct! Putting litter into trash bins keeps our planet clean.",
      "zh": "答对了！垃圾投进垃圾桶，人人争当环保小卫士。"
    }
  },
  {
    "id": "k1-cit-e2",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "ขณะกำลัง \"แปรงฟัน\" 🪥 วิธีการใช้น้ำอย่างประหยัดและรู้คุณค่าคือข้อใด?",
      "en": "While BRUSHING TEETH 🪥: What is the eco-friendly way to save water?",
      "zh": "在洗手池边认真刷牙 🪥 的这几分钟时间里，最节约用水、珍惜水资源的正确做法是？"
    },
    "illustration": "🪥 🚰 🥛",
    "illustrationSubtitle": {
      "th": "การประหยัดน้ำขณะแปรงฟัน: ใช้แก้วรองน้ำและปิดก๊อก",
      "en": "Saving water: Turn off tap, use a rinse cup",
      "zh": "节水环保小妙招：刷牙用口杯接水关水龙头"
    },
    "options": [
      {
        "id": "opt-k1-cit-e2-1",
        "label": {
          "th": "เปิดก๊อกน้ำให้ไหลทิ้งแรงๆ ท่วมอ่างตลอดเวลา",
          "en": "Leave tap gushing water continuously at full blast",
          "zh": "任由水龙头哗啦啦大开，任清澈的自来水白白流失浪费"
        },
        "icon": "🌊"
      },
      {
        "id": "opt-k1-cit-e2-2",
        "label": {
          "th": "ใช้แก้วรองน้ำและ \"ปิดก๊อกน้ำให้สนิท\" ขณะกำลังแปรง 🚰 🥛",
          "en": "Use a cup and TURN OFF TAP tightly while brushing",
          "zh": "用刷牙漱口杯接水，在刷牙过程中“把水龙头彻底拧紧关闭” 🚰 🥛"
        },
        "icon": "🚰"
      },
      {
        "id": "opt-k1-cit-e2-3",
        "label": {
          "th": "เอาน้ำสะอาดมาสาดใส่เพื่อนให้เปียกทั้งห้อง",
          "en": "Splashing clean water all over friends",
          "zh": "把自来水盛在大盆里到处乱泼乱洒打水仗"
        },
        "icon": "💦"
      }
    ],
    "correctOptionId": "opt-k1-cit-e2-2",
    "explanation": {
      "th": "การปิดก๊อกน้ำขณะแปรงฟันช่วยประหยัดน้ำได้หลายลิตรในแต่ละวัน เก่งมากครับ!",
      "en": "Awesome! Turning off running taps conserves precious fresh water.",
      "zh": "太棒了！刷牙关水龙头用口杯接水，点滴节水汇成江河。"
    }
  },
  {
    "id": "k1-cit-e3",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "เมื่อเราเดินเล่นใน \"ห้องสมุดโรงเรียน\" 📚 มารยาทสำคัญที่ทุกคนต้องปฏิบัติตามคือข้อใด?",
      "en": "Inside the SCHOOL LIBRARY 📚: What is the most important golden rule to obey?",
      "zh": "走进安静庄重的“学校少儿图书馆/阅览室” 📚 借阅绘本时，每位小读者必须严格恪守的公德守则是？"
    },
    "illustration": "📚 🤫 📖",
    "illustrationSubtitle": {
      "th": "มารยาทในห้องสมุด: งดส่งเสียงดังและรักษาความเงียบ",
      "en": "Library etiquette: Keep quiet and whisper",
      "zh": "公共场所礼仪：图书馆内保持安静轻声细语"
    },
    "options": [
      {
        "id": "opt-k1-cit-e3-1",
        "label": {
          "th": "ฉีกหน้ากระดาษนิทานนำมาพับจรวดปาเล่น",
          "en": "Rip out book pages to fold paper planes",
          "zh": "把精美的立体儿童绘本纸页撕下来折成纸飞机在阅览室乱飞"
        },
        "icon": "✈️"
      },
      {
        "id": "opt-k1-cit-e3-2",
        "label": {
          "th": "วิ่งไล่จับและส่งเสียงกรีดร้องรอบตู้หนังสือ",
          "en": "Play tag sprinting and screeching around bookshelves",
          "zh": "在几米高的密集书架间大呼小叫、你追我赶疯狂玩抓人游戏"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k1-cit-e3-3",
        "label": {
          "th": "รักษาความเงียบ ไม่ส่งเสียงดังรบกวนผู้อื่นที่กำลังอ่านหนังสือ 🤫 📖",
          "en": "Maintain silence, walk softly, and read quietly without disturbing others",
          "zh": "保持室内安静，轻拿轻放、轻走慢步，绝不大声喧哗打扰他人专注阅读 🤫 📖"
        },
        "icon": "🤫"
      }
    ],
    "correctOptionId": "opt-k1-cit-e3-3",
    "explanation": {
      "th": "ความเงียบในห้องสมุดช่วยให้ทุกคนมีสมาธิในการอ่านและศึกษาหาความรู้ เก่งมากครับ!",
      "en": "Spot on! Quiet consideration in libraries respects everyone's love of reading.",
      "zh": "答对了！保持安静轻声细语是对知识和阅览者的基本尊重。"
    }
  },
  {
    "id": "k1-cit-e4",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "เมื่อเลิกใช้งานและเดินออกจากห้องเรียน 💡 สิ่งที่เด็กดีควรช่วยกันทำเพื่อ \"ประหยัดพลังงานไฟฟ้า\" คือข้อใด?",
      "en": "Leaving the classroom 💡: What simple duty saves electricity for our school and planet?",
      "zh": "放学或者离开教室去操场活动时 💡，少儿环保小助手应当主动帮班级完成哪项“随手节电”任务？"
    },
    "illustration": "💡 🔌 🚪",
    "illustrationSubtitle": {
      "th": "การประหยัดพลังงาน: ปิดไฟและพัดลมเมื่อไม่ใช้งาน",
      "en": "Energy conservation: Switch off lights & fans",
      "zh": "节能减排习惯：离室自觉关灯关风扇"
    },
    "options": [
      {
        "id": "opt-k1-cit-e4-1",
        "label": {
          "th": "ช่วยกัน \"ปิดไฟ ปิดพัดลม และปิดเครื่องปรับอากาศ\" ให้เรียบร้อย 💡 🌬️",
          "en": "Help SWITCH OFF lights, ceiling fans, and air conditioning",
          "zh": "主动检查并顺手“关闭电灯开关、吊扇及空调电源” 💡 🌬️"
        },
        "icon": "💡"
      },
      {
        "id": "opt-k1-cit-e4-2",
        "label": {
          "th": "เปิดไฟและพัดลมทิ้งไว้ข้ามคืนโดยไม่ดับ",
          "en": "Leave all lights and fans running all weekend",
          "zh": "把教室里所有的日光灯风扇空调大开通宵通月运转"
        },
        "icon": "⚡"
      },
      {
        "id": "opt-k1-cit-e4-3",
        "label": {
          "th": "เอาก้อนหินปาหลอดไฟให้แตกละเอียด",
          "en": "Throw stones smashing light bulbs into glass shards",
          "zh": "拿石子对准天花板灯管使劲砸，弄得到处是碎玻璃"
        },
        "icon": "💥"
      }
    ],
    "correctOptionId": "opt-k1-cit-e4-1",
    "explanation": {
      "th": "การปิดไฟเมื่อไม่ใช้ช่วยลดค่าไฟ ประหยัดพลังงาน และลดโลกร้อน เก่งมากครับ!",
      "en": "Correct! Switching off unused electrical devices conserves earth's power.",
      "zh": "答对了！随手关灯关电器，节约一度电，保护地球家园。"
    }
  },
  {
    "id": "k1-cit-e5",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "เมื่อเห็น \"ต้นไม้และดอกไม้แสนสวยในสวนสาธารณะ\" 🌸 🌱 พฤติกรรมที่แสดงถึงความรักธรรมชาติคือข้อใด?",
      "en": "Admiring gorgeous flowers in a public botanical garden 🌸 🌱: What demonstrates real love for nature?",
      "zh": "在公园或植物园欣赏大片姹紫嫣红、鲜艳芬芳的花草树木 🌸 🌱 时，彰显真正爱护自然的举止是？"
    },
    "illustration": "🌸 🌱 📸",
    "illustrationSubtitle": {
      "th": "การอนุรักษ์ธรรมชาติ: ชมด้วยตา ไม่เด็ดดอกไม้",
      "en": "Nature preservation: Admire without plucking",
      "zh": "生态保护素养：文明赏花不采摘花草"
    },
    "options": [
      {
        "id": "opt-k1-cit-e5-1",
        "label": {
          "th": "เด็ดขยี้ดอกไม้จนแหลกคามือแล้วโยนทิ้ง",
          "en": "Pluck and crush flower petals throwing them away",
          "zh": "伸手使劲一把把采摘下来用力揉搓碾碎踩在脚底"
        },
        "icon": "🥀"
      },
      {
        "id": "opt-k1-cit-e5-2",
        "label": {
          "th": "ชื่นชมความสวยงามด้วยสายตา ถ่ายภาพเป็นที่ระลึก และไม่เด็ดหรือเหยียบย่ำ 🌸 📸",
          "en": "Admire their natural beauty with eyes, take photos, and NEVER pluck or stomp",
          "zh": "用明亮双眸静静欣赏、拍照留念，绝不用手攀折花枝或随意践踏草坪 🌸 📸"
        },
        "icon": "🌸"
      },
      {
        "id": "opt-k1-cit-e5-3",
        "label": {
          "th": "ถอนรากต้นไม้ขึ้นมาฟาดเล่นกับเพื่อน",
          "en": "Uproot saplings and whip classmates with them",
          "zh": "连根拔起刚刚栽种的幼苗树苗，当做长鞭互相抽打"
        },
        "icon": "🟤"
      }
    ],
    "correctOptionId": "opt-k1-cit-e5-2",
    "explanation": {
      "th": "ดอกไม้จะสวยที่สุดเมื่ออยู่บนต้นตามธรรมชาติ เพื่อให้ทุกคนได้ชื่นชมร่วมกัน เก่งมากครับ!",
      "en": "Awesome! Flowers belong thriving on stems for all community members to enjoy.",
      "zh": "太棒了！一花一草皆有生命，只留足迹不留伤害，让美丽长存大自然。"
    }
  },
  {
    "id": "k1-cit-e6",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "เมื่อได้ยินเสียง \"เพลงชาติไทย\" 🇹🇭 ในเวลา 08.00 น. หรือ 18.00 น. การแสดงความเคารพที่ถูกต้องคือข้อใด?",
      "en": "Hearing the THAI NATIONAL ANTHEM 🇹🇭 at 8:00 AM or 6:00 PM: What is the respectful posture?",
      "zh": "早晨 8:00 或傍晚 18:00 伴随国旗升起、听到庄严的泰国国歌奏响 🇹🇭 时，标准的致敬仪态是？"
    },
    "illustration": "🇹🇭 🧍 🫡",
    "illustrationSubtitle": {
      "th": "การเคารพธงชาติและเพลงชาติ",
      "en": "Respecting the national anthem: Stand at attention",
      "zh": "爱国爱家公德素养：肃立向国旗致敬"
    },
    "options": [
      {
        "id": "opt-k1-cit-e6-1",
        "label": {
          "th": "ลงไปนอนคลานกลิ้งบนพื้นดิน",
          "en": "Roll slithering around on dirty dust",
          "zh": "直接趴在操场泥地上滚来滚去扮怪样"
        },
        "icon": "🟤"
      },
      {
        "id": "opt-k1-cit-e6-2",
        "label": {
          "th": "วิ่งเล่นเตะฟุตบอลต่อไปและส่งเสียงกรีดร้อง",
          "en": "Keep kicking soccer balls around screaming loudly",
          "zh": "嬉皮笑脸满不在乎，继续在升旗台前疯狂带球狂奔踢足球"
        },
        "icon": "⚽"
      },
      {
        "id": "opt-k1-cit-e6-3",
        "label": {
          "th": "หยุดกิจกรรมทั้งหมด ยืนตรงอย่างสงบนิ่ง สง่างาม ด้วยความเคารพ 🇹🇭 🧍",
          "en": "Halt activities immediately, stand straight, proud, and still with dignity",
          "zh": "立刻停下手中奔跑或嬉戏的一切活动，昂首挺胸、庄严肃立行注目礼 🇹🇭 🧍"
        },
        "icon": "🇹🇭"
      }
    ],
    "correctOptionId": "opt-k1-cit-e6-3",
    "explanation": {
      "th": "การยืนตรงเคารพธงชาติแสดงถึงความจงรักภักดี ความสามัคคี และความภาคภูมิใจในชาติ เก่งมากครับ!",
      "en": "Spot on! Standing at respectful attention honors national unity and shared heritage.",
      "zh": "答对了！听到国歌庄严肃立，展现出心中深沉的国家认同感与公民素养。"
    }
  },
  {
    "id": "k1-cit-e7",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "เมื่อคุณครูจัดกิจกรรม \"รดน้ำและพรวนดินต้นไม้รอบโรงเรียน\" 🪴 เด็กๆ ควรมีส่วนร่วมอย่างไร?",
      "en": "Teacher organizes a \"Watering and caring for school garden plants\" event 🪴: How should you participate?",
      "zh": "班级组织“手拉手为幼儿园小花园的小树苗浇水松土、拔除杂草”活动 🪴，小朋友应当？"
    },
    "illustration": "🪴 💧 🧤",
    "illustrationSubtitle": {
      "th": "จิตอาสาและการดูแลสิ่งแวดล้อมในโรงเรียน",
      "en": "School gardening and environmental volunteerism",
      "zh": "热爱劳动常识：积极参与校园花草绿化抚育"
    },
    "options": [
      {
        "id": "opt-k1-cit-e7-1",
        "label": {
          "th": "ช่วยกันตักน้ำรดที่โคนต้นไม้อย่างระมัดระวัง ช่วยเก็บใบไม้แห้งด้วยความสนุกสนาน 🪴 💧",
          "en": "Gently sprinkle water at the base of roots, rake dry leaves, and tend with joy",
          "zh": "开开心心提起小水壶轻柔浇灌树苗根部，合力捡拾落叶，细心呵护花草茁壮成长 🪴 💧"
        },
        "icon": "🪴"
      },
      {
        "id": "opt-k1-cit-e7-2",
        "label": {
          "th": "เทน้ำใส่รองเท้าของเพื่อนข้างๆ จนเปียกชุ่ม",
          "en": "Pour watering can into classmate's shoes",
          "zh": "把整壶清水故意哗啦一下精准灌进同伴穿的运动鞋袜里"
        },
        "icon": "👟"
      },
      {
        "id": "opt-k1-cit-e7-3",
        "label": {
          "th": "หักกิ่งต้นไม้เล่นจนต้นไม้หักพัง",
          "en": "Snap and break tree branches destructive play",
          "zh": "双手用力硬生生扳折刚刚成活的嫩绿小树干"
        },
        "icon": "🪵"
      }
    ],
    "correctOptionId": "opt-k1-cit-e7-1",
    "explanation": {
      "th": "การช่วยกันปลูกและดูแลต้นไม้ทำให้โรงเรียนร่มรื่น สดชื่น และอากาศบริสุทธิ์ เก่งมากครับ!",
      "en": "Right! Nurturing young seedlings cultivates environmental stewardship and empathy.",
      "zh": "答对啦！从小参与绿色植树护绿劳动，为校园增添一抹清新的盎然绿意。"
    }
  },
  {
    "id": "k1-cit-e8",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "เมื่อไปซื้อของที่ตลาดหรือร้านสะดวกซื้อ 🛒 การพก \"ถุงผ้า\" ไปใส่ของแทนถุงพลาสติก มีประโยชน์อย่างไร?",
      "en": "Carrying a REUSABLE CLOTH BAG 🛍️ instead of taking single-use plastic bags: Why is this great?",
      "zh": "跟着大人去菜市场或便利店购物 🛒 时，随身携带“结实可重复使用的环保布袋”，核心益处在于？"
    },
    "illustration": "🛍️ ♻️ 🐢",
    "illustrationSubtitle": {
      "th": "การลดขยะพลาสติก: การใช้ถุงผ้า (Say No to Plastic Bags)",
      "en": "Using reusable shopping bags reduces plastic pollution",
      "zh": "绿色低碳生活方式：自带布袋减少白色塑料污染"
    },
    "options": [
      {
        "id": "opt-k1-cit-e8-1",
        "label": {
          "th": "ทำให้ผักในถุงกลายเป็นเพชรเม็ดโต",
          "en": "Turns vegetables into huge sparkling diamonds",
          "zh": "能让袋子里新鲜的大白菜瞬间化为金光闪闪的大钻石"
        },
        "icon": "💎"
      },
      {
        "id": "opt-k1-cit-e8-2",
        "label": {
          "th": "ช่วยลดปริมาณขยะพลาสติกที่ย่อยสลายยาก และรักษาสิ่งแวดล้อมโลก 🛍️ 🌍",
          "en": "Reduces non-biodegradable plastic pollution, protecting marine life and ecosystems",
          "zh": "极大地减少不可降解的一次性白色塑料袋垃圾产生，守护江河海洋生物 🛍️ 🌍"
        },
        "icon": "🛍️"
      },
      {
        "id": "opt-k1-cit-e8-3",
        "label": {
          "th": "ทำให้รถเข็นในห้างลอยฟ้าได้",
          "en": "Makes supermarket shopping carts float into space",
          "zh": "赋予超市金属四轮手推车长出翅膀飞上九霄云外"
        },
        "icon": "🛒"
      }
    ],
    "correctOptionId": "opt-k1-cit-e8-2",
    "explanation": {
      "th": "ถุงพลาสติกใช้เวลาหลายร้อยปีในการย่อยสลาย การใช้ถุงผ้าช่วยปกป้องโลกได้มาก เก่งมากครับ!",
      "en": "Awesome! Reusable tote bags prevent discarded plastics from choking our oceans.",
      "zh": "太棒了！少用塑料袋、自备环保布袋，减塑从身边小事做起，善待地球母亲。"
    }
  },
  {
    "id": "k1-cit-e9",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "เมื่อใช้บริการ \"ห้องน้ำสาธารณะ\" ในโรงเรียนหรือห้างสรรพสินค้า 🚻 มารยาทสำคัญหลังเสร็จธุระคือข้อใด?",
      "en": "Using a PUBLIC RESTROOM in school or malls 🚻: What hygiene action is non-negotiable after use?",
      "zh": "在幼儿园或商场使用完公共卫生间马桶 🚻 方便之后，每位讲文明公民离开前必须彻底完成的动作是？"
    },
    "illustration": "🚻 🚽 🧼",
    "illustrationSubtitle": {
      "th": "มารยาทการใช้ห้องน้ำสาธารณะ: กดชักโครกและล้างมือ",
      "en": "Public restroom etiquette: Flush & wash hands",
      "zh": "公共卫生习惯：如厕后冲净马桶并规范洗手"
    },
    "options": [
      {
        "id": "opt-k1-cit-e9-1",
        "label": {
          "th": "เอาทิชชู่เปียกปาใส่เพดานให้ติดแน่น",
          "en": "Hurl wet toilet paper sticking to ceilings",
          "zh": "把大团湿透的脏纸巾团用力扔向天花板粘黏成大花脸"
        },
        "icon": "🧻"
      },
      {
        "id": "opt-k1-cit-e9-2",
        "label": {
          "th": "รีบวิ่งออกมาโดยปล่อยของเสียทิ้งไว้ในโถส้วม",
          "en": "Sprint out immediately leaving messy bowl unflushed",
          "zh": "不冲水大摇大摆拔腿就跑，留下污浊恶臭让下一个使用者难堪"
        },
        "icon": "🏃"
      },
      {
        "id": "opt-k1-cit-e9-3",
        "label": {
          "th": "กดชักโครกหรือราดน้ำทำความสะอาดสุขภัณฑ์ให้หมดจด และล้างมือด้วยสบู่ 🚽 🧼",
          "en": "FLUSH toilet completely, leave seat tidy, and wash hands with soap",
          "zh": "按下冲水马桶按钮或舀水将污物彻底冲刷冲净，并用洗手液洗手 🚽 🧼"
        },
        "icon": "🚽"
      }
    ],
    "correctOptionId": "opt-k1-cit-e9-3",
    "explanation": {
      "th": "การกดชักโครกและรักษาความสะอาดเป็นการเห็นอกเห็นใจและให้เกียรติผู้ใช้คนต่อไป เก่งมากครับ!",
      "en": "Correct! Flushing conscientiously and sanitizing hands preserves public sanitation.",
      "zh": "答对了！便后自觉冲水保持厕位洁净，是衡量社会文明公德素养的一面镜子。"
    }
  },
  {
    "id": "k1-cit-e10",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "สิ่งของเครื่องใช้สาธารณะในสนามเด็กเล่น เช่น \"ม้าหมุน ชิงช้า ไม้กระดก\" 🎠 เด็กๆ ควรใช้งานอย่างไร?",
      "en": "Public playground amenities like swings, merry-go-rounds, and seesaws 🎠: How should you treat them?",
      "zh": "操场公园里的公共休闲娱乐游乐设施（旋转木马、铁秋千、翘翘板）🎠，小朋友们应当怎样爱惜爱护？"
    },
    "illustration": "🎠 🤝 ✨",
    "illustrationSubtitle": {
      "th": "การดูแลรักษาสมบัติสาธารณะ (Public Property)",
      "en": "Care for public property and playground gear",
      "zh": "爱护公共设施公德：安全规范使用不蓄意毁坏"
    },
    "options": [
      {
        "id": "opt-k1-cit-e10-1",
        "label": {
          "th": "เล่นด้วยความระมัดระวัง ถนอมรักษา และไม่ขีดเขียนทำลายให้ชำรุดเสียหาย 🎠 ✨",
          "en": "Play safely, treat equipment with care, and NEVER vandalize or break them",
          "zh": "轻柔安全地玩耍，自觉爱惜养护，严禁拿小刀划刻或乱涂乱画故意损坏 🎠 ✨"
        },
        "icon": "🎠"
      },
      {
        "id": "opt-k1-cit-e10-2",
        "label": {
          "th": "ใช้มีดหรือหินมาขูดขีดชื่อตัวเองลงบนแผ่นไม้",
          "en": "Carve your initials into wooden seats with blades",
          "zh": "拿钥匙铁片在长椅刷有防锈漆的坐板上刻字涂鸦涂抹黑斑"
        },
        "icon": "🔪"
      },
      {
        "id": "opt-k1-cit-e10-3",
        "label": {
          "th": "เอาค้อนมาทุบข้อต่อเหล็กให้หักพัง",
          "en": "Smash metal swing joints with a heavy hammer",
          "zh": "特意找来大铁锤把秋千吊环关节零件彻底砸裂砸断"
        },
        "icon": "🔨"
      }
    ],
    "correctOptionId": "opt-k1-cit-e10-1",
    "explanation": {
      "th": "สมบัติสาธารณะเป็นของส่วนรวมที่ทุกคนต้องช่วยกันดูแลรักษาเพื่อให้ใช้งานได้ยาวนาน เก่งมากครับ!",
      "en": "Spot on! Respecting public park infrastructure ensures safe enjoyment for all youngsters.",
      "zh": "太棒了！公共设施属于全社会共有财富，文明使用、爱护公物，人人有责。"
    }
  },
  {
    "id": "k1-cit-m1",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "การคัดแยกขยะเบื้องต้น อนุบาล 1 ระดับปานกลาง ชุดที่ 1: \"เศษเปลือกผลไม้และเศษอาหาร\" 🍌 🍎 ควรทิ้งลงในถังขยะสีใด (ถังขยะเปียก/อินทรีย์)?",
      "en": "K1 Mid Waste Sorting #1: Fruit peels and leftover vegetable scraps 🍌 🍎 go into which colored COMPOST BIN?",
      "zh": "幼儿园小班垃圾分类实践第 1 题：吃剩下的香蕉皮、烂苹果核及菜叶果皮 🍌 🍎，应精准投入哪一种颜色的“厨余/易腐有机垃圾桶”？"
    },
    "illustration": "🍌 🍎 🟢",
    "illustrationSubtitle": {
      "th": "ถังขยะอินทรีย์ (ขยะเปียก): สีเขียว",
      "en": "Organic / Compost waste bin: Green",
      "zh": "垃圾分类标准：绿色厨余垃圾桶"
    },
    "options": [
      {
        "id": "opt-k1-cit-m1-1",
        "label": {
          "th": "ถังขยะสีแดงอันตราย",
          "en": "RED hazardous toxic bin",
          "zh": "红色有毒有害特种垃圾桶"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k1-cit-m1-2",
        "label": {
          "th": "ถังขยะสีเขียว (ขยะอินทรีย์ / ขยะเปียกที่ย่อยสลายได้) 🟢 🌿",
          "en": "GREEN BIN (Organic / Compostable food waste)",
          "zh": "绿色垃圾桶（易腐烂、可堆肥的厨余有机果蔬垃圾）🟢 🌿"
        },
        "icon": "🟢"
      },
      {
        "id": "opt-k1-cit-m1-3",
        "label": {
          "th": "โยนทิ้งลงในบ่อน้ำดื่ม",
          "en": "Toss into drinking well water",
          "zh": "直接扔进供全校饮用的小水井里"
        },
        "icon": "🌊"
      }
    ],
    "correctOptionId": "opt-k1-cit-m1-2",
    "explanation": {
      "th": "ขยะเปียกสีเขียวสามารถนำไปหมักทำปุ๋ยบำรุงดินและต้นไม้ได้อย่างยอดเยี่ยม เก่งมากครับ!",
      "en": "Correct! Green bins collect organic scraps for rich natural compost.",
      "zh": "答对了！厨余垃圾投进绿桶，可以堆肥变身滋养土地的有机肥料。"
    }
  },
  {
    "id": "k1-cit-m2",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "การคัดแยกขยะเบื้องต้น อนุบาล 1 ระดับปานกลาง ชุดที่ 2: \"เศษเปลือกผลไม้และเศษอาหาร\" 🍌 🍎 ควรทิ้งลงในถังขยะสีใด (ถังขยะเปียก/อินทรีย์)?",
      "en": "K1 Mid Waste Sorting #2: Fruit peels and leftover vegetable scraps 🍌 🍎 go into which colored COMPOST BIN?",
      "zh": "幼儿园小班垃圾分类实践第 2 题：吃剩下的香蕉皮、烂苹果核及菜叶果皮 🍌 🍎，应精准投入哪一种颜色的“厨余/易腐有机垃圾桶”？"
    },
    "illustration": "🍌 🍎 🟢",
    "illustrationSubtitle": {
      "th": "ถังขยะอินทรีย์ (ขยะเปียก): สีเขียว",
      "en": "Organic / Compost waste bin: Green",
      "zh": "垃圾分类标准：绿色厨余垃圾桶"
    },
    "options": [
      {
        "id": "opt-k1-cit-m2-1",
        "label": {
          "th": "โยนทิ้งลงในบ่อน้ำดื่ม",
          "en": "Toss into drinking well water",
          "zh": "直接扔进供全校饮用的小水井里"
        },
        "icon": "🌊"
      },
      {
        "id": "opt-k1-cit-m2-2",
        "label": {
          "th": "ถังขยะสีแดงอันตราย",
          "en": "RED hazardous toxic bin",
          "zh": "红色有毒有害特种垃圾桶"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k1-cit-m2-3",
        "label": {
          "th": "ถังขยะสีเขียว (ขยะอินทรีย์ / ขยะเปียกที่ย่อยสลายได้) 🟢 🌿",
          "en": "GREEN BIN (Organic / Compostable food waste)",
          "zh": "绿色垃圾桶（易腐烂、可堆肥的厨余有机果蔬垃圾）🟢 🌿"
        },
        "icon": "🟢"
      }
    ],
    "correctOptionId": "opt-k1-cit-m2-3",
    "explanation": {
      "th": "ขยะเปียกสีเขียวสามารถนำไปหมักทำปุ๋ยบำรุงดินและต้นไม้ได้อย่างยอดเยี่ยม เก่งมากครับ!",
      "en": "Correct! Green bins collect organic scraps for rich natural compost.",
      "zh": "答对了！厨余垃圾投进绿桶，可以堆肥变身滋养土地的有机肥料。"
    }
  },
  {
    "id": "k1-cit-m3",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "การคัดแยกขยะเบื้องต้น อนุบาล 1 ระดับปานกลาง ชุดที่ 3: \"เศษเปลือกผลไม้และเศษอาหาร\" 🍌 🍎 ควรทิ้งลงในถังขยะสีใด (ถังขยะเปียก/อินทรีย์)?",
      "en": "K1 Mid Waste Sorting #3: Fruit peels and leftover vegetable scraps 🍌 🍎 go into which colored COMPOST BIN?",
      "zh": "幼儿园小班垃圾分类实践第 3 题：吃剩下的香蕉皮、烂苹果核及菜叶果皮 🍌 🍎，应精准投入哪一种颜色的“厨余/易腐有机垃圾桶”？"
    },
    "illustration": "🍌 🍎 🟢",
    "illustrationSubtitle": {
      "th": "ถังขยะอินทรีย์ (ขยะเปียก): สีเขียว",
      "en": "Organic / Compost waste bin: Green",
      "zh": "垃圾分类标准：绿色厨余垃圾桶"
    },
    "options": [
      {
        "id": "opt-k1-cit-m3-1",
        "label": {
          "th": "ถังขยะสีเขียว (ขยะอินทรีย์ / ขยะเปียกที่ย่อยสลายได้) 🟢 🌿",
          "en": "GREEN BIN (Organic / Compostable food waste)",
          "zh": "绿色垃圾桶（易腐烂、可堆肥的厨余有机果蔬垃圾）🟢 🌿"
        },
        "icon": "🟢"
      },
      {
        "id": "opt-k1-cit-m3-2",
        "label": {
          "th": "ถังขยะสีแดงอันตราย",
          "en": "RED hazardous toxic bin",
          "zh": "红色有毒有害特种垃圾桶"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k1-cit-m3-3",
        "label": {
          "th": "โยนทิ้งลงในบ่อน้ำดื่ม",
          "en": "Toss into drinking well water",
          "zh": "直接扔进供全校饮用的小水井里"
        },
        "icon": "🌊"
      }
    ],
    "correctOptionId": "opt-k1-cit-m3-1",
    "explanation": {
      "th": "ขยะเปียกสีเขียวสามารถนำไปหมักทำปุ๋ยบำรุงดินและต้นไม้ได้อย่างยอดเยี่ยม เก่งมากครับ!",
      "en": "Correct! Green bins collect organic scraps for rich natural compost.",
      "zh": "答对了！厨余垃圾投进绿桶，可以堆肥变身滋养土地的有机肥料。"
    }
  },
  {
    "id": "k1-cit-m4",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "การคัดแยกขยะเบื้องต้น อนุบาล 1 ระดับปานกลาง ชุดที่ 4: \"เศษเปลือกผลไม้และเศษอาหาร\" 🍌 🍎 ควรทิ้งลงในถังขยะสีใด (ถังขยะเปียก/อินทรีย์)?",
      "en": "K1 Mid Waste Sorting #4: Fruit peels and leftover vegetable scraps 🍌 🍎 go into which colored COMPOST BIN?",
      "zh": "幼儿园小班垃圾分类实践第 4 题：吃剩下的香蕉皮、烂苹果核及菜叶果皮 🍌 🍎，应精准投入哪一种颜色的“厨余/易腐有机垃圾桶”？"
    },
    "illustration": "🍌 🍎 🟢",
    "illustrationSubtitle": {
      "th": "ถังขยะอินทรีย์ (ขยะเปียก): สีเขียว",
      "en": "Organic / Compost waste bin: Green",
      "zh": "垃圾分类标准：绿色厨余垃圾桶"
    },
    "options": [
      {
        "id": "opt-k1-cit-m4-1",
        "label": {
          "th": "ถังขยะสีแดงอันตราย",
          "en": "RED hazardous toxic bin",
          "zh": "红色有毒有害特种垃圾桶"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k1-cit-m4-2",
        "label": {
          "th": "ถังขยะสีเขียว (ขยะอินทรีย์ / ขยะเปียกที่ย่อยสลายได้) 🟢 🌿",
          "en": "GREEN BIN (Organic / Compostable food waste)",
          "zh": "绿色垃圾桶（易腐烂、可堆肥的厨余有机果蔬垃圾）🟢 🌿"
        },
        "icon": "🟢"
      },
      {
        "id": "opt-k1-cit-m4-3",
        "label": {
          "th": "โยนทิ้งลงในบ่อน้ำดื่ม",
          "en": "Toss into drinking well water",
          "zh": "直接扔进供全校饮用的小水井里"
        },
        "icon": "🌊"
      }
    ],
    "correctOptionId": "opt-k1-cit-m4-2",
    "explanation": {
      "th": "ขยะเปียกสีเขียวสามารถนำไปหมักทำปุ๋ยบำรุงดินและต้นไม้ได้อย่างยอดเยี่ยม เก่งมากครับ!",
      "en": "Correct! Green bins collect organic scraps for rich natural compost.",
      "zh": "答对了！厨余垃圾投进绿桶，可以堆肥变身滋养土地的有机肥料。"
    }
  },
  {
    "id": "k1-cit-m5",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "การคัดแยกขยะเบื้องต้น อนุบาล 1 ระดับปานกลาง ชุดที่ 5: \"เศษเปลือกผลไม้และเศษอาหาร\" 🍌 🍎 ควรทิ้งลงในถังขยะสีใด (ถังขยะเปียก/อินทรีย์)?",
      "en": "K1 Mid Waste Sorting #5: Fruit peels and leftover vegetable scraps 🍌 🍎 go into which colored COMPOST BIN?",
      "zh": "幼儿园小班垃圾分类实践第 5 题：吃剩下的香蕉皮、烂苹果核及菜叶果皮 🍌 🍎，应精准投入哪一种颜色的“厨余/易腐有机垃圾桶”？"
    },
    "illustration": "🍌 🍎 🟢",
    "illustrationSubtitle": {
      "th": "ถังขยะอินทรีย์ (ขยะเปียก): สีเขียว",
      "en": "Organic / Compost waste bin: Green",
      "zh": "垃圾分类标准：绿色厨余垃圾桶"
    },
    "options": [
      {
        "id": "opt-k1-cit-m5-1",
        "label": {
          "th": "โยนทิ้งลงในบ่อน้ำดื่ม",
          "en": "Toss into drinking well water",
          "zh": "直接扔进供全校饮用的小水井里"
        },
        "icon": "🌊"
      },
      {
        "id": "opt-k1-cit-m5-2",
        "label": {
          "th": "ถังขยะสีแดงอันตราย",
          "en": "RED hazardous toxic bin",
          "zh": "红色有毒有害特种垃圾桶"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k1-cit-m5-3",
        "label": {
          "th": "ถังขยะสีเขียว (ขยะอินทรีย์ / ขยะเปียกที่ย่อยสลายได้) 🟢 🌿",
          "en": "GREEN BIN (Organic / Compostable food waste)",
          "zh": "绿色垃圾桶（易腐烂、可堆肥的厨余有机果蔬垃圾）🟢 🌿"
        },
        "icon": "🟢"
      }
    ],
    "correctOptionId": "opt-k1-cit-m5-3",
    "explanation": {
      "th": "ขยะเปียกสีเขียวสามารถนำไปหมักทำปุ๋ยบำรุงดินและต้นไม้ได้อย่างยอดเยี่ยม เก่งมากครับ!",
      "en": "Correct! Green bins collect organic scraps for rich natural compost.",
      "zh": "答对了！厨余垃圾投进绿桶，可以堆肥变身滋养土地的有机肥料。"
    }
  },
  {
    "id": "k1-cit-m6",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "การคัดแยกขยะเบื้องต้น อนุบาล 1 ระดับปานกลาง ชุดที่ 6: \"เศษเปลือกผลไม้และเศษอาหาร\" 🍌 🍎 ควรทิ้งลงในถังขยะสีใด (ถังขยะเปียก/อินทรีย์)?",
      "en": "K1 Mid Waste Sorting #6: Fruit peels and leftover vegetable scraps 🍌 🍎 go into which colored COMPOST BIN?",
      "zh": "幼儿园小班垃圾分类实践第 6 题：吃剩下的香蕉皮、烂苹果核及菜叶果皮 🍌 🍎，应精准投入哪一种颜色的“厨余/易腐有机垃圾桶”？"
    },
    "illustration": "🍌 🍎 🟢",
    "illustrationSubtitle": {
      "th": "ถังขยะอินทรีย์ (ขยะเปียก): สีเขียว",
      "en": "Organic / Compost waste bin: Green",
      "zh": "垃圾分类标准：绿色厨余垃圾桶"
    },
    "options": [
      {
        "id": "opt-k1-cit-m6-1",
        "label": {
          "th": "ถังขยะสีเขียว (ขยะอินทรีย์ / ขยะเปียกที่ย่อยสลายได้) 🟢 🌿",
          "en": "GREEN BIN (Organic / Compostable food waste)",
          "zh": "绿色垃圾桶（易腐烂、可堆肥的厨余有机果蔬垃圾）🟢 🌿"
        },
        "icon": "🟢"
      },
      {
        "id": "opt-k1-cit-m6-2",
        "label": {
          "th": "ถังขยะสีแดงอันตราย",
          "en": "RED hazardous toxic bin",
          "zh": "红色有毒有害特种垃圾桶"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k1-cit-m6-3",
        "label": {
          "th": "โยนทิ้งลงในบ่อน้ำดื่ม",
          "en": "Toss into drinking well water",
          "zh": "直接扔进供全校饮用的小水井里"
        },
        "icon": "🌊"
      }
    ],
    "correctOptionId": "opt-k1-cit-m6-1",
    "explanation": {
      "th": "ขยะเปียกสีเขียวสามารถนำไปหมักทำปุ๋ยบำรุงดินและต้นไม้ได้อย่างยอดเยี่ยม เก่งมากครับ!",
      "en": "Correct! Green bins collect organic scraps for rich natural compost.",
      "zh": "答对了！厨余垃圾投进绿桶，可以堆肥变身滋养土地的有机肥料。"
    }
  },
  {
    "id": "k1-cit-m7",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "การคัดแยกขยะเบื้องต้น อนุบาล 1 ระดับปานกลาง ชุดที่ 7: \"เศษเปลือกผลไม้และเศษอาหาร\" 🍌 🍎 ควรทิ้งลงในถังขยะสีใด (ถังขยะเปียก/อินทรีย์)?",
      "en": "K1 Mid Waste Sorting #7: Fruit peels and leftover vegetable scraps 🍌 🍎 go into which colored COMPOST BIN?",
      "zh": "幼儿园小班垃圾分类实践第 7 题：吃剩下的香蕉皮、烂苹果核及菜叶果皮 🍌 🍎，应精准投入哪一种颜色的“厨余/易腐有机垃圾桶”？"
    },
    "illustration": "🍌 🍎 🟢",
    "illustrationSubtitle": {
      "th": "ถังขยะอินทรีย์ (ขยะเปียก): สีเขียว",
      "en": "Organic / Compost waste bin: Green",
      "zh": "垃圾分类标准：绿色厨余垃圾桶"
    },
    "options": [
      {
        "id": "opt-k1-cit-m7-1",
        "label": {
          "th": "ถังขยะสีแดงอันตราย",
          "en": "RED hazardous toxic bin",
          "zh": "红色有毒有害特种垃圾桶"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k1-cit-m7-2",
        "label": {
          "th": "ถังขยะสีเขียว (ขยะอินทรีย์ / ขยะเปียกที่ย่อยสลายได้) 🟢 🌿",
          "en": "GREEN BIN (Organic / Compostable food waste)",
          "zh": "绿色垃圾桶（易腐烂、可堆肥的厨余有机果蔬垃圾）🟢 🌿"
        },
        "icon": "🟢"
      },
      {
        "id": "opt-k1-cit-m7-3",
        "label": {
          "th": "โยนทิ้งลงในบ่อน้ำดื่ม",
          "en": "Toss into drinking well water",
          "zh": "直接扔进供全校饮用的小水井里"
        },
        "icon": "🌊"
      }
    ],
    "correctOptionId": "opt-k1-cit-m7-2",
    "explanation": {
      "th": "ขยะเปียกสีเขียวสามารถนำไปหมักทำปุ๋ยบำรุงดินและต้นไม้ได้อย่างยอดเยี่ยม เก่งมากครับ!",
      "en": "Correct! Green bins collect organic scraps for rich natural compost.",
      "zh": "答对了！厨余垃圾投进绿桶，可以堆肥变身滋养土地的有机肥料。"
    }
  },
  {
    "id": "k1-cit-m8",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "การคัดแยกขยะเบื้องต้น อนุบาล 1 ระดับปานกลาง ชุดที่ 8: \"เศษเปลือกผลไม้และเศษอาหาร\" 🍌 🍎 ควรทิ้งลงในถังขยะสีใด (ถังขยะเปียก/อินทรีย์)?",
      "en": "K1 Mid Waste Sorting #8: Fruit peels and leftover vegetable scraps 🍌 🍎 go into which colored COMPOST BIN?",
      "zh": "幼儿园小班垃圾分类实践第 8 题：吃剩下的香蕉皮、烂苹果核及菜叶果皮 🍌 🍎，应精准投入哪一种颜色的“厨余/易腐有机垃圾桶”？"
    },
    "illustration": "🍌 🍎 🟢",
    "illustrationSubtitle": {
      "th": "ถังขยะอินทรีย์ (ขยะเปียก): สีเขียว",
      "en": "Organic / Compost waste bin: Green",
      "zh": "垃圾分类标准：绿色厨余垃圾桶"
    },
    "options": [
      {
        "id": "opt-k1-cit-m8-1",
        "label": {
          "th": "โยนทิ้งลงในบ่อน้ำดื่ม",
          "en": "Toss into drinking well water",
          "zh": "直接扔进供全校饮用的小水井里"
        },
        "icon": "🌊"
      },
      {
        "id": "opt-k1-cit-m8-2",
        "label": {
          "th": "ถังขยะสีแดงอันตราย",
          "en": "RED hazardous toxic bin",
          "zh": "红色有毒有害特种垃圾桶"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k1-cit-m8-3",
        "label": {
          "th": "ถังขยะสีเขียว (ขยะอินทรีย์ / ขยะเปียกที่ย่อยสลายได้) 🟢 🌿",
          "en": "GREEN BIN (Organic / Compostable food waste)",
          "zh": "绿色垃圾桶（易腐烂、可堆肥的厨余有机果蔬垃圾）🟢 🌿"
        },
        "icon": "🟢"
      }
    ],
    "correctOptionId": "opt-k1-cit-m8-3",
    "explanation": {
      "th": "ขยะเปียกสีเขียวสามารถนำไปหมักทำปุ๋ยบำรุงดินและต้นไม้ได้อย่างยอดเยี่ยม เก่งมากครับ!",
      "en": "Correct! Green bins collect organic scraps for rich natural compost.",
      "zh": "答对了！厨余垃圾投进绿桶，可以堆肥变身滋养土地的有机肥料。"
    }
  },
  {
    "id": "k1-cit-m9",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "การคัดแยกขยะเบื้องต้น อนุบาล 1 ระดับปานกลาง ชุดที่ 9: \"เศษเปลือกผลไม้และเศษอาหาร\" 🍌 🍎 ควรทิ้งลงในถังขยะสีใด (ถังขยะเปียก/อินทรีย์)?",
      "en": "K1 Mid Waste Sorting #9: Fruit peels and leftover vegetable scraps 🍌 🍎 go into which colored COMPOST BIN?",
      "zh": "幼儿园小班垃圾分类实践第 9 题：吃剩下的香蕉皮、烂苹果核及菜叶果皮 🍌 🍎，应精准投入哪一种颜色的“厨余/易腐有机垃圾桶”？"
    },
    "illustration": "🍌 🍎 🟢",
    "illustrationSubtitle": {
      "th": "ถังขยะอินทรีย์ (ขยะเปียก): สีเขียว",
      "en": "Organic / Compost waste bin: Green",
      "zh": "垃圾分类标准：绿色厨余垃圾桶"
    },
    "options": [
      {
        "id": "opt-k1-cit-m9-1",
        "label": {
          "th": "ถังขยะสีเขียว (ขยะอินทรีย์ / ขยะเปียกที่ย่อยสลายได้) 🟢 🌿",
          "en": "GREEN BIN (Organic / Compostable food waste)",
          "zh": "绿色垃圾桶（易腐烂、可堆肥的厨余有机果蔬垃圾）🟢 🌿"
        },
        "icon": "🟢"
      },
      {
        "id": "opt-k1-cit-m9-2",
        "label": {
          "th": "ถังขยะสีแดงอันตราย",
          "en": "RED hazardous toxic bin",
          "zh": "红色有毒有害特种垃圾桶"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k1-cit-m9-3",
        "label": {
          "th": "โยนทิ้งลงในบ่อน้ำดื่ม",
          "en": "Toss into drinking well water",
          "zh": "直接扔进供全校饮用的小水井里"
        },
        "icon": "🌊"
      }
    ],
    "correctOptionId": "opt-k1-cit-m9-1",
    "explanation": {
      "th": "ขยะเปียกสีเขียวสามารถนำไปหมักทำปุ๋ยบำรุงดินและต้นไม้ได้อย่างยอดเยี่ยม เก่งมากครับ!",
      "en": "Correct! Green bins collect organic scraps for rich natural compost.",
      "zh": "答对了！厨余垃圾投进绿桶，可以堆肥变身滋养土地的有机肥料。"
    }
  },
  {
    "id": "k1-cit-m10",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "การคัดแยกขยะเบื้องต้น อนุบาล 1 ระดับปานกลาง ชุดที่ 10: \"เศษเปลือกผลไม้และเศษอาหาร\" 🍌 🍎 ควรทิ้งลงในถังขยะสีใด (ถังขยะเปียก/อินทรีย์)?",
      "en": "K1 Mid Waste Sorting #10: Fruit peels and leftover vegetable scraps 🍌 🍎 go into which colored COMPOST BIN?",
      "zh": "幼儿园小班垃圾分类实践第 10 题：吃剩下的香蕉皮、烂苹果核及菜叶果皮 🍌 🍎，应精准投入哪一种颜色的“厨余/易腐有机垃圾桶”？"
    },
    "illustration": "🍌 🍎 🟢",
    "illustrationSubtitle": {
      "th": "ถังขยะอินทรีย์ (ขยะเปียก): สีเขียว",
      "en": "Organic / Compost waste bin: Green",
      "zh": "垃圾分类标准：绿色厨余垃圾桶"
    },
    "options": [
      {
        "id": "opt-k1-cit-m10-1",
        "label": {
          "th": "ถังขยะสีแดงอันตราย",
          "en": "RED hazardous toxic bin",
          "zh": "红色有毒有害特种垃圾桶"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k1-cit-m10-2",
        "label": {
          "th": "ถังขยะสีเขียว (ขยะอินทรีย์ / ขยะเปียกที่ย่อยสลายได้) 🟢 🌿",
          "en": "GREEN BIN (Organic / Compostable food waste)",
          "zh": "绿色垃圾桶（易腐烂、可堆肥的厨余有机果蔬垃圾）🟢 🌿"
        },
        "icon": "🟢"
      },
      {
        "id": "opt-k1-cit-m10-3",
        "label": {
          "th": "โยนทิ้งลงในบ่อน้ำดื่ม",
          "en": "Toss into drinking well water",
          "zh": "直接扔进供全校饮用的小水井里"
        },
        "icon": "🌊"
      }
    ],
    "correctOptionId": "opt-k1-cit-m10-2",
    "explanation": {
      "th": "ขยะเปียกสีเขียวสามารถนำไปหมักทำปุ๋ยบำรุงดินและต้นไม้ได้อย่างยอดเยี่ยม เก่งมากครับ!",
      "en": "Correct! Green bins collect organic scraps for rich natural compost.",
      "zh": "答对了！厨余垃圾投进绿桶，可以堆肥变身滋养土地的有机肥料。"
    }
  },
  {
    "id": "k1-cit-h1",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "การอนุรักษ์สิ่งแวดล้อมทางน้ำ อนุบาล 1 ระดับท้าทาย ชุดที่ 1: การไม่ทิ้งขยะพลาสติกลงในแม่น้ำและทะเล 🌊 🐢 ช่วยปกป้องสัตว์น้ำได้อย่างไร?",
      "en": "K1 High Marine Conservation #1: Keeping plastic waste out of rivers and oceans 🌊 🐢 protects marine creatures how?",
      "zh": "幼儿园小班海洋环保素养第 1 题：坚决不向河道江海乱扔塑料薄膜与饮料吸管 🌊 🐢，对海龟海豚等海洋珍稀生物最直接的保护作用是？"
    },
    "illustration": "🌊 🐢 🐬",
    "illustrationSubtitle": {
      "th": "การอนุรักษ์สิ่งแวดล้อมทางทะเล: ลดขยะพลาสติกในทะเล",
      "en": "Ocean preservation: Stop sea animals eating plastic",
      "zh": "水生动物保护：防范海龟海豚误食塑料致死"
    },
    "options": [
      {
        "id": "opt-k1-cit-h1-1",
        "label": {
          "th": "ทำให้น้ำทะเลเปลี่ยนเป็นน้ำหวานกลิ่นส้ม",
          "en": "Turns seawater into orange juice",
          "zh": "把无边无际的汪洋苦涩海水全变成甘甜好喝的橙汁饮料"
        },
        "icon": "🍊"
      },
      {
        "id": "opt-k1-cit-h1-2",
        "label": {
          "th": "ทำให้ปลาวาฬกลายร่างเป็นมังกรพ่นไฟ",
          "en": "Causes whales to turn into dragons",
          "zh": "使得巨头座头鲸发生变异长成会喷火的飞天巨龙"
        },
        "icon": "🐉"
      },
      {
        "id": "opt-k1-cit-h1-3",
        "label": {
          "th": "ป้องกันไม่ให้เต่าทะเลและปลาวาฬเข้าใจผิดคิดว่าเป็นแมงกะพรุนแล้วกินเข้าไปจนเสียชีวิต 🐢 🌊",
          "en": "Prevents sea turtles and whales from mistaking plastics for jellyfish and suffocating",
          "zh": "有效防止海龟海豚等珍贵海洋动物误把塑料袋当水母吞食而肠道堵塞窒息身亡 🐢 🌊"
        },
        "icon": "🐢"
      }
    ],
    "correctOptionId": "opt-k1-cit-h1-3",
    "explanation": {
      "th": "เต่าทะเลมักเข้าใจผิดว่าถุงพลาสติกใสคือแมงกะพรุน การดูแลไม่ให้ขยะลงน้ำจึงช่วยชีวิตสัตว์ได้มหาศาล เก่งมากครับ!",
      "en": "Awesome! Plastic debris in oceans starves marine megafauna; clean waters save lives.",
      "zh": "太棒了！守护海洋蔚蓝，拒绝塑料入海，拯救无数海龟与海洋生物的鲜活生命！"
    }
  },
  {
    "id": "k1-cit-h2",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "การอนุรักษ์สิ่งแวดล้อมทางน้ำ อนุบาล 1 ระดับท้าทาย ชุดที่ 2: การไม่ทิ้งขยะพลาสติกลงในแม่น้ำและทะเล 🌊 🐢 ช่วยปกป้องสัตว์น้ำได้อย่างไร?",
      "en": "K1 High Marine Conservation #2: Keeping plastic waste out of rivers and oceans 🌊 🐢 protects marine creatures how?",
      "zh": "幼儿园小班海洋环保素养第 2 题：坚决不向河道江海乱扔塑料薄膜与饮料吸管 🌊 🐢，对海龟海豚等海洋珍稀生物最直接的保护作用是？"
    },
    "illustration": "🌊 🐢 🐬",
    "illustrationSubtitle": {
      "th": "การอนุรักษ์สิ่งแวดล้อมทางทะเล: ลดขยะพลาสติกในทะเล",
      "en": "Ocean preservation: Stop sea animals eating plastic",
      "zh": "水生动物保护：防范海龟海豚误食塑料致死"
    },
    "options": [
      {
        "id": "opt-k1-cit-h2-1",
        "label": {
          "th": "ป้องกันไม่ให้เต่าทะเลและปลาวาฬเข้าใจผิดคิดว่าเป็นแมงกะพรุนแล้วกินเข้าไปจนเสียชีวิต 🐢 🌊",
          "en": "Prevents sea turtles and whales from mistaking plastics for jellyfish and suffocating",
          "zh": "有效防止海龟海豚等珍贵海洋动物误把塑料袋当水母吞食而肠道堵塞窒息身亡 🐢 🌊"
        },
        "icon": "🐢"
      },
      {
        "id": "opt-k1-cit-h2-2",
        "label": {
          "th": "ทำให้ปลาวาฬกลายร่างเป็นมังกรพ่นไฟ",
          "en": "Causes whales to turn into dragons",
          "zh": "使得巨头座头鲸发生变异长成会喷火的飞天巨龙"
        },
        "icon": "🐉"
      },
      {
        "id": "opt-k1-cit-h2-3",
        "label": {
          "th": "ทำให้น้ำทะเลเปลี่ยนเป็นน้ำหวานกลิ่นส้ม",
          "en": "Turns seawater into orange juice",
          "zh": "把无边无际的汪洋苦涩海水全变成甘甜好喝的橙汁饮料"
        },
        "icon": "🍊"
      }
    ],
    "correctOptionId": "opt-k1-cit-h2-1",
    "explanation": {
      "th": "เต่าทะเลมักเข้าใจผิดว่าถุงพลาสติกใสคือแมงกะพรุน การดูแลไม่ให้ขยะลงน้ำจึงช่วยชีวิตสัตว์ได้มหาศาล เก่งมากครับ!",
      "en": "Awesome! Plastic debris in oceans starves marine megafauna; clean waters save lives.",
      "zh": "太棒了！守护海洋蔚蓝，拒绝塑料入海，拯救无数海龟与海洋生物的鲜活生命！"
    }
  },
  {
    "id": "k1-cit-h3",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "การอนุรักษ์สิ่งแวดล้อมทางน้ำ อนุบาล 1 ระดับท้าทาย ชุดที่ 3: การไม่ทิ้งขยะพลาสติกลงในแม่น้ำและทะเล 🌊 🐢 ช่วยปกป้องสัตว์น้ำได้อย่างไร?",
      "en": "K1 High Marine Conservation #3: Keeping plastic waste out of rivers and oceans 🌊 🐢 protects marine creatures how?",
      "zh": "幼儿园小班海洋环保素养第 3 题：坚决不向河道江海乱扔塑料薄膜与饮料吸管 🌊 🐢，对海龟海豚等海洋珍稀生物最直接的保护作用是？"
    },
    "illustration": "🌊 🐢 🐬",
    "illustrationSubtitle": {
      "th": "การอนุรักษ์สิ่งแวดล้อมทางทะเล: ลดขยะพลาสติกในทะเล",
      "en": "Ocean preservation: Stop sea animals eating plastic",
      "zh": "水生动物保护：防范海龟海豚误食塑料致死"
    },
    "options": [
      {
        "id": "opt-k1-cit-h3-1",
        "label": {
          "th": "ทำให้ปลาวาฬกลายร่างเป็นมังกรพ่นไฟ",
          "en": "Causes whales to turn into dragons",
          "zh": "使得巨头座头鲸发生变异长成会喷火的飞天巨龙"
        },
        "icon": "🐉"
      },
      {
        "id": "opt-k1-cit-h3-2",
        "label": {
          "th": "ป้องกันไม่ให้เต่าทะเลและปลาวาฬเข้าใจผิดคิดว่าเป็นแมงกะพรุนแล้วกินเข้าไปจนเสียชีวิต 🐢 🌊",
          "en": "Prevents sea turtles and whales from mistaking plastics for jellyfish and suffocating",
          "zh": "有效防止海龟海豚等珍贵海洋动物误把塑料袋当水母吞食而肠道堵塞窒息身亡 🐢 🌊"
        },
        "icon": "🐢"
      },
      {
        "id": "opt-k1-cit-h3-3",
        "label": {
          "th": "ทำให้น้ำทะเลเปลี่ยนเป็นน้ำหวานกลิ่นส้ม",
          "en": "Turns seawater into orange juice",
          "zh": "把无边无际的汪洋苦涩海水全变成甘甜好喝的橙汁饮料"
        },
        "icon": "🍊"
      }
    ],
    "correctOptionId": "opt-k1-cit-h3-2",
    "explanation": {
      "th": "เต่าทะเลมักเข้าใจผิดว่าถุงพลาสติกใสคือแมงกะพรุน การดูแลไม่ให้ขยะลงน้ำจึงช่วยชีวิตสัตว์ได้มหาศาล เก่งมากครับ!",
      "en": "Awesome! Plastic debris in oceans starves marine megafauna; clean waters save lives.",
      "zh": "太棒了！守护海洋蔚蓝，拒绝塑料入海，拯救无数海龟与海洋生物的鲜活生命！"
    }
  },
  {
    "id": "k1-cit-h4",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "การอนุรักษ์สิ่งแวดล้อมทางน้ำ อนุบาล 1 ระดับท้าทาย ชุดที่ 4: การไม่ทิ้งขยะพลาสติกลงในแม่น้ำและทะเล 🌊 🐢 ช่วยปกป้องสัตว์น้ำได้อย่างไร?",
      "en": "K1 High Marine Conservation #4: Keeping plastic waste out of rivers and oceans 🌊 🐢 protects marine creatures how?",
      "zh": "幼儿园小班海洋环保素养第 4 题：坚决不向河道江海乱扔塑料薄膜与饮料吸管 🌊 🐢，对海龟海豚等海洋珍稀生物最直接的保护作用是？"
    },
    "illustration": "🌊 🐢 🐬",
    "illustrationSubtitle": {
      "th": "การอนุรักษ์สิ่งแวดล้อมทางทะเล: ลดขยะพลาสติกในทะเล",
      "en": "Ocean preservation: Stop sea animals eating plastic",
      "zh": "水生动物保护：防范海龟海豚误食塑料致死"
    },
    "options": [
      {
        "id": "opt-k1-cit-h4-1",
        "label": {
          "th": "ทำให้น้ำทะเลเปลี่ยนเป็นน้ำหวานกลิ่นส้ม",
          "en": "Turns seawater into orange juice",
          "zh": "把无边无际的汪洋苦涩海水全变成甘甜好喝的橙汁饮料"
        },
        "icon": "🍊"
      },
      {
        "id": "opt-k1-cit-h4-2",
        "label": {
          "th": "ทำให้ปลาวาฬกลายร่างเป็นมังกรพ่นไฟ",
          "en": "Causes whales to turn into dragons",
          "zh": "使得巨头座头鲸发生变异长成会喷火的飞天巨龙"
        },
        "icon": "🐉"
      },
      {
        "id": "opt-k1-cit-h4-3",
        "label": {
          "th": "ป้องกันไม่ให้เต่าทะเลและปลาวาฬเข้าใจผิดคิดว่าเป็นแมงกะพรุนแล้วกินเข้าไปจนเสียชีวิต 🐢 🌊",
          "en": "Prevents sea turtles and whales from mistaking plastics for jellyfish and suffocating",
          "zh": "有效防止海龟海豚等珍贵海洋动物误把塑料袋当水母吞食而肠道堵塞窒息身亡 🐢 🌊"
        },
        "icon": "🐢"
      }
    ],
    "correctOptionId": "opt-k1-cit-h4-3",
    "explanation": {
      "th": "เต่าทะเลมักเข้าใจผิดว่าถุงพลาสติกใสคือแมงกะพรุน การดูแลไม่ให้ขยะลงน้ำจึงช่วยชีวิตสัตว์ได้มหาศาล เก่งมากครับ!",
      "en": "Awesome! Plastic debris in oceans starves marine megafauna; clean waters save lives.",
      "zh": "太棒了！守护海洋蔚蓝，拒绝塑料入海，拯救无数海龟与海洋生物的鲜活生命！"
    }
  },
  {
    "id": "k1-cit-h5",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "การอนุรักษ์สิ่งแวดล้อมทางน้ำ อนุบาล 1 ระดับท้าทาย ชุดที่ 5: การไม่ทิ้งขยะพลาสติกลงในแม่น้ำและทะเล 🌊 🐢 ช่วยปกป้องสัตว์น้ำได้อย่างไร?",
      "en": "K1 High Marine Conservation #5: Keeping plastic waste out of rivers and oceans 🌊 🐢 protects marine creatures how?",
      "zh": "幼儿园小班海洋环保素养第 5 题：坚决不向河道江海乱扔塑料薄膜与饮料吸管 🌊 🐢，对海龟海豚等海洋珍稀生物最直接的保护作用是？"
    },
    "illustration": "🌊 🐢 🐬",
    "illustrationSubtitle": {
      "th": "การอนุรักษ์สิ่งแวดล้อมทางทะเล: ลดขยะพลาสติกในทะเล",
      "en": "Ocean preservation: Stop sea animals eating plastic",
      "zh": "水生动物保护：防范海龟海豚误食塑料致死"
    },
    "options": [
      {
        "id": "opt-k1-cit-h5-1",
        "label": {
          "th": "ป้องกันไม่ให้เต่าทะเลและปลาวาฬเข้าใจผิดคิดว่าเป็นแมงกะพรุนแล้วกินเข้าไปจนเสียชีวิต 🐢 🌊",
          "en": "Prevents sea turtles and whales from mistaking plastics for jellyfish and suffocating",
          "zh": "有效防止海龟海豚等珍贵海洋动物误把塑料袋当水母吞食而肠道堵塞窒息身亡 🐢 🌊"
        },
        "icon": "🐢"
      },
      {
        "id": "opt-k1-cit-h5-2",
        "label": {
          "th": "ทำให้ปลาวาฬกลายร่างเป็นมังกรพ่นไฟ",
          "en": "Causes whales to turn into dragons",
          "zh": "使得巨头座头鲸发生变异长成会喷火的飞天巨龙"
        },
        "icon": "🐉"
      },
      {
        "id": "opt-k1-cit-h5-3",
        "label": {
          "th": "ทำให้น้ำทะเลเปลี่ยนเป็นน้ำหวานกลิ่นส้ม",
          "en": "Turns seawater into orange juice",
          "zh": "把无边无际的汪洋苦涩海水全变成甘甜好喝的橙汁饮料"
        },
        "icon": "🍊"
      }
    ],
    "correctOptionId": "opt-k1-cit-h5-1",
    "explanation": {
      "th": "เต่าทะเลมักเข้าใจผิดว่าถุงพลาสติกใสคือแมงกะพรุน การดูแลไม่ให้ขยะลงน้ำจึงช่วยชีวิตสัตว์ได้มหาศาล เก่งมากครับ!",
      "en": "Awesome! Plastic debris in oceans starves marine megafauna; clean waters save lives.",
      "zh": "太棒了！守护海洋蔚蓝，拒绝塑料入海，拯救无数海龟与海洋生物的鲜活生命！"
    }
  },
  {
    "id": "k1-cit-h6",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "การอนุรักษ์สิ่งแวดล้อมทางน้ำ อนุบาล 1 ระดับท้าทาย ชุดที่ 6: การไม่ทิ้งขยะพลาสติกลงในแม่น้ำและทะเล 🌊 🐢 ช่วยปกป้องสัตว์น้ำได้อย่างไร?",
      "en": "K1 High Marine Conservation #6: Keeping plastic waste out of rivers and oceans 🌊 🐢 protects marine creatures how?",
      "zh": "幼儿园小班海洋环保素养第 6 题：坚决不向河道江海乱扔塑料薄膜与饮料吸管 🌊 🐢，对海龟海豚等海洋珍稀生物最直接的保护作用是？"
    },
    "illustration": "🌊 🐢 🐬",
    "illustrationSubtitle": {
      "th": "การอนุรักษ์สิ่งแวดล้อมทางทะเล: ลดขยะพลาสติกในทะเล",
      "en": "Ocean preservation: Stop sea animals eating plastic",
      "zh": "水生动物保护：防范海龟海豚误食塑料致死"
    },
    "options": [
      {
        "id": "opt-k1-cit-h6-1",
        "label": {
          "th": "ทำให้ปลาวาฬกลายร่างเป็นมังกรพ่นไฟ",
          "en": "Causes whales to turn into dragons",
          "zh": "使得巨头座头鲸发生变异长成会喷火的飞天巨龙"
        },
        "icon": "🐉"
      },
      {
        "id": "opt-k1-cit-h6-2",
        "label": {
          "th": "ป้องกันไม่ให้เต่าทะเลและปลาวาฬเข้าใจผิดคิดว่าเป็นแมงกะพรุนแล้วกินเข้าไปจนเสียชีวิต 🐢 🌊",
          "en": "Prevents sea turtles and whales from mistaking plastics for jellyfish and suffocating",
          "zh": "有效防止海龟海豚等珍贵海洋动物误把塑料袋当水母吞食而肠道堵塞窒息身亡 🐢 🌊"
        },
        "icon": "🐢"
      },
      {
        "id": "opt-k1-cit-h6-3",
        "label": {
          "th": "ทำให้น้ำทะเลเปลี่ยนเป็นน้ำหวานกลิ่นส้ม",
          "en": "Turns seawater into orange juice",
          "zh": "把无边无际的汪洋苦涩海水全变成甘甜好喝的橙汁饮料"
        },
        "icon": "🍊"
      }
    ],
    "correctOptionId": "opt-k1-cit-h6-2",
    "explanation": {
      "th": "เต่าทะเลมักเข้าใจผิดว่าถุงพลาสติกใสคือแมงกะพรุน การดูแลไม่ให้ขยะลงน้ำจึงช่วยชีวิตสัตว์ได้มหาศาล เก่งมากครับ!",
      "en": "Awesome! Plastic debris in oceans starves marine megafauna; clean waters save lives.",
      "zh": "太棒了！守护海洋蔚蓝，拒绝塑料入海，拯救无数海龟与海洋生物的鲜活生命！"
    }
  },
  {
    "id": "k1-cit-h7",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "การอนุรักษ์สิ่งแวดล้อมทางน้ำ อนุบาล 1 ระดับท้าทาย ชุดที่ 7: การไม่ทิ้งขยะพลาสติกลงในแม่น้ำและทะเล 🌊 🐢 ช่วยปกป้องสัตว์น้ำได้อย่างไร?",
      "en": "K1 High Marine Conservation #7: Keeping plastic waste out of rivers and oceans 🌊 🐢 protects marine creatures how?",
      "zh": "幼儿园小班海洋环保素养第 7 题：坚决不向河道江海乱扔塑料薄膜与饮料吸管 🌊 🐢，对海龟海豚等海洋珍稀生物最直接的保护作用是？"
    },
    "illustration": "🌊 🐢 🐬",
    "illustrationSubtitle": {
      "th": "การอนุรักษ์สิ่งแวดล้อมทางทะเล: ลดขยะพลาสติกในทะเล",
      "en": "Ocean preservation: Stop sea animals eating plastic",
      "zh": "水生动物保护：防范海龟海豚误食塑料致死"
    },
    "options": [
      {
        "id": "opt-k1-cit-h7-1",
        "label": {
          "th": "ทำให้น้ำทะเลเปลี่ยนเป็นน้ำหวานกลิ่นส้ม",
          "en": "Turns seawater into orange juice",
          "zh": "把无边无际的汪洋苦涩海水全变成甘甜好喝的橙汁饮料"
        },
        "icon": "🍊"
      },
      {
        "id": "opt-k1-cit-h7-2",
        "label": {
          "th": "ทำให้ปลาวาฬกลายร่างเป็นมังกรพ่นไฟ",
          "en": "Causes whales to turn into dragons",
          "zh": "使得巨头座头鲸发生变异长成会喷火的飞天巨龙"
        },
        "icon": "🐉"
      },
      {
        "id": "opt-k1-cit-h7-3",
        "label": {
          "th": "ป้องกันไม่ให้เต่าทะเลและปลาวาฬเข้าใจผิดคิดว่าเป็นแมงกะพรุนแล้วกินเข้าไปจนเสียชีวิต 🐢 🌊",
          "en": "Prevents sea turtles and whales from mistaking plastics for jellyfish and suffocating",
          "zh": "有效防止海龟海豚等珍贵海洋动物误把塑料袋当水母吞食而肠道堵塞窒息身亡 🐢 🌊"
        },
        "icon": "🐢"
      }
    ],
    "correctOptionId": "opt-k1-cit-h7-3",
    "explanation": {
      "th": "เต่าทะเลมักเข้าใจผิดว่าถุงพลาสติกใสคือแมงกะพรุน การดูแลไม่ให้ขยะลงน้ำจึงช่วยชีวิตสัตว์ได้มหาศาล เก่งมากครับ!",
      "en": "Awesome! Plastic debris in oceans starves marine megafauna; clean waters save lives.",
      "zh": "太棒了！守护海洋蔚蓝，拒绝塑料入海，拯救无数海龟与海洋生物的鲜活生命！"
    }
  },
  {
    "id": "k1-cit-h8",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "การอนุรักษ์สิ่งแวดล้อมทางน้ำ อนุบาล 1 ระดับท้าทาย ชุดที่ 8: การไม่ทิ้งขยะพลาสติกลงในแม่น้ำและทะเล 🌊 🐢 ช่วยปกป้องสัตว์น้ำได้อย่างไร?",
      "en": "K1 High Marine Conservation #8: Keeping plastic waste out of rivers and oceans 🌊 🐢 protects marine creatures how?",
      "zh": "幼儿园小班海洋环保素养第 8 题：坚决不向河道江海乱扔塑料薄膜与饮料吸管 🌊 🐢，对海龟海豚等海洋珍稀生物最直接的保护作用是？"
    },
    "illustration": "🌊 🐢 🐬",
    "illustrationSubtitle": {
      "th": "การอนุรักษ์สิ่งแวดล้อมทางทะเล: ลดขยะพลาสติกในทะเล",
      "en": "Ocean preservation: Stop sea animals eating plastic",
      "zh": "水生动物保护：防范海龟海豚误食塑料致死"
    },
    "options": [
      {
        "id": "opt-k1-cit-h8-1",
        "label": {
          "th": "ป้องกันไม่ให้เต่าทะเลและปลาวาฬเข้าใจผิดคิดว่าเป็นแมงกะพรุนแล้วกินเข้าไปจนเสียชีวิต 🐢 🌊",
          "en": "Prevents sea turtles and whales from mistaking plastics for jellyfish and suffocating",
          "zh": "有效防止海龟海豚等珍贵海洋动物误把塑料袋当水母吞食而肠道堵塞窒息身亡 🐢 🌊"
        },
        "icon": "🐢"
      },
      {
        "id": "opt-k1-cit-h8-2",
        "label": {
          "th": "ทำให้ปลาวาฬกลายร่างเป็นมังกรพ่นไฟ",
          "en": "Causes whales to turn into dragons",
          "zh": "使得巨头座头鲸发生变异长成会喷火的飞天巨龙"
        },
        "icon": "🐉"
      },
      {
        "id": "opt-k1-cit-h8-3",
        "label": {
          "th": "ทำให้น้ำทะเลเปลี่ยนเป็นน้ำหวานกลิ่นส้ม",
          "en": "Turns seawater into orange juice",
          "zh": "把无边无际的汪洋苦涩海水全变成甘甜好喝的橙汁饮料"
        },
        "icon": "🍊"
      }
    ],
    "correctOptionId": "opt-k1-cit-h8-1",
    "explanation": {
      "th": "เต่าทะเลมักเข้าใจผิดว่าถุงพลาสติกใสคือแมงกะพรุน การดูแลไม่ให้ขยะลงน้ำจึงช่วยชีวิตสัตว์ได้มหาศาล เก่งมากครับ!",
      "en": "Awesome! Plastic debris in oceans starves marine megafauna; clean waters save lives.",
      "zh": "太棒了！守护海洋蔚蓝，拒绝塑料入海，拯救无数海龟与海洋生物的鲜活生命！"
    }
  },
  {
    "id": "k1-cit-h9",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "การอนุรักษ์สิ่งแวดล้อมทางน้ำ อนุบาล 1 ระดับท้าทาย ชุดที่ 9: การไม่ทิ้งขยะพลาสติกลงในแม่น้ำและทะเล 🌊 🐢 ช่วยปกป้องสัตว์น้ำได้อย่างไร?",
      "en": "K1 High Marine Conservation #9: Keeping plastic waste out of rivers and oceans 🌊 🐢 protects marine creatures how?",
      "zh": "幼儿园小班海洋环保素养第 9 题：坚决不向河道江海乱扔塑料薄膜与饮料吸管 🌊 🐢，对海龟海豚等海洋珍稀生物最直接的保护作用是？"
    },
    "illustration": "🌊 🐢 🐬",
    "illustrationSubtitle": {
      "th": "การอนุรักษ์สิ่งแวดล้อมทางทะเล: ลดขยะพลาสติกในทะเล",
      "en": "Ocean preservation: Stop sea animals eating plastic",
      "zh": "水生动物保护：防范海龟海豚误食塑料致死"
    },
    "options": [
      {
        "id": "opt-k1-cit-h9-1",
        "label": {
          "th": "ทำให้ปลาวาฬกลายร่างเป็นมังกรพ่นไฟ",
          "en": "Causes whales to turn into dragons",
          "zh": "使得巨头座头鲸发生变异长成会喷火的飞天巨龙"
        },
        "icon": "🐉"
      },
      {
        "id": "opt-k1-cit-h9-2",
        "label": {
          "th": "ป้องกันไม่ให้เต่าทะเลและปลาวาฬเข้าใจผิดคิดว่าเป็นแมงกะพรุนแล้วกินเข้าไปจนเสียชีวิต 🐢 🌊",
          "en": "Prevents sea turtles and whales from mistaking plastics for jellyfish and suffocating",
          "zh": "有效防止海龟海豚等珍贵海洋动物误把塑料袋当水母吞食而肠道堵塞窒息身亡 🐢 🌊"
        },
        "icon": "🐢"
      },
      {
        "id": "opt-k1-cit-h9-3",
        "label": {
          "th": "ทำให้น้ำทะเลเปลี่ยนเป็นน้ำหวานกลิ่นส้ม",
          "en": "Turns seawater into orange juice",
          "zh": "把无边无际的汪洋苦涩海水全变成甘甜好喝的橙汁饮料"
        },
        "icon": "🍊"
      }
    ],
    "correctOptionId": "opt-k1-cit-h9-2",
    "explanation": {
      "th": "เต่าทะเลมักเข้าใจผิดว่าถุงพลาสติกใสคือแมงกะพรุน การดูแลไม่ให้ขยะลงน้ำจึงช่วยชีวิตสัตว์ได้มหาศาล เก่งมากครับ!",
      "en": "Awesome! Plastic debris in oceans starves marine megafauna; clean waters save lives.",
      "zh": "太棒了！守护海洋蔚蓝，拒绝塑料入海，拯救无数海龟与海洋生物的鲜活生命！"
    }
  },
  {
    "id": "k1-cit-h10",
    "grade": "K1",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "การอนุรักษ์สิ่งแวดล้อมทางน้ำ อนุบาล 1 ระดับท้าทาย ชุดที่ 10: การไม่ทิ้งขยะพลาสติกลงในแม่น้ำและทะเล 🌊 🐢 ช่วยปกป้องสัตว์น้ำได้อย่างไร?",
      "en": "K1 High Marine Conservation #10: Keeping plastic waste out of rivers and oceans 🌊 🐢 protects marine creatures how?",
      "zh": "幼儿园小班海洋环保素养第 10 题：坚决不向河道江海乱扔塑料薄膜与饮料吸管 🌊 🐢，对海龟海豚等海洋珍稀生物最直接的保护作用是？"
    },
    "illustration": "🌊 🐢 🐬",
    "illustrationSubtitle": {
      "th": "การอนุรักษ์สิ่งแวดล้อมทางทะเล: ลดขยะพลาสติกในทะเล",
      "en": "Ocean preservation: Stop sea animals eating plastic",
      "zh": "水生动物保护：防范海龟海豚误食塑料致死"
    },
    "options": [
      {
        "id": "opt-k1-cit-h10-1",
        "label": {
          "th": "ทำให้น้ำทะเลเปลี่ยนเป็นน้ำหวานกลิ่นส้ม",
          "en": "Turns seawater into orange juice",
          "zh": "把无边无际的汪洋苦涩海水全变成甘甜好喝的橙汁饮料"
        },
        "icon": "🍊"
      },
      {
        "id": "opt-k1-cit-h10-2",
        "label": {
          "th": "ทำให้ปลาวาฬกลายร่างเป็นมังกรพ่นไฟ",
          "en": "Causes whales to turn into dragons",
          "zh": "使得巨头座头鲸发生变异长成会喷火的飞天巨龙"
        },
        "icon": "🐉"
      },
      {
        "id": "opt-k1-cit-h10-3",
        "label": {
          "th": "ป้องกันไม่ให้เต่าทะเลและปลาวาฬเข้าใจผิดคิดว่าเป็นแมงกะพรุนแล้วกินเข้าไปจนเสียชีวิต 🐢 🌊",
          "en": "Prevents sea turtles and whales from mistaking plastics for jellyfish and suffocating",
          "zh": "有效防止海龟海豚等珍贵海洋动物误把塑料袋当水母吞食而肠道堵塞窒息身亡 🐢 🌊"
        },
        "icon": "🐢"
      }
    ],
    "correctOptionId": "opt-k1-cit-h10-3",
    "explanation": {
      "th": "เต่าทะเลมักเข้าใจผิดว่าถุงพลาสติกใสคือแมงกะพรุน การดูแลไม่ให้ขยะลงน้ำจึงช่วยชีวิตสัตว์ได้มหาศาล เก่งมากครับ!",
      "en": "Awesome! Plastic debris in oceans starves marine megafauna; clean waters save lives.",
      "zh": "太棒了！守护海洋蔚蓝，拒绝塑料入海，拯救无数海龟与海洋生物的鲜活生命！"
    }
  },
  {
    "id": "k2-cit-e1",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "การคัดแยกขยะรีไซเคิลระดับชั้นอนุบาล 2 ชุดที่ 1: \"ขวดพลาสติกใส กระป๋องน้ำอัดลม และกล่องกระดาษลัง\" 🧴 🥫 📦 ควรคัดแยกทิ้งลงในถังขยะสีใด?",
      "en": "K2 Recycling Practice #1: Empty plastic bottles, aluminum beverage cans, and cardboard 🧴 🥫 📦 belong in which color bin?",
      "zh": "幼儿园中班资源循环回收第 1 题：喝空的透明矿泉水瓶、可乐易拉罐以及瓦楞纸箱 🧴 🥫 📦，应当清洗沥干后投放进哪种颜色的垃圾桶？"
    },
    "illustration": "🧴 🥫 🟡",
    "illustrationSubtitle": {
      "th": "ถังขยะรีไซเคิล: สีเหลือง",
      "en": "Recyclable waste bin: Yellow",
      "zh": "垃圾分类标准：黄色可回收物垃圾桶"
    },
    "options": [
      {
        "id": "opt-k2-cit-e1-1",
        "label": {
          "th": "ถังขยะสีเหลือง (ขยะรีไซเคิลที่นำกลับมาแปรรูปใหม่ได้) 🟡 ♻️",
          "en": "YELLOW BIN (Recyclables: plastic, metals, cardboard)",
          "zh": "黄色垃圾桶（可回收物：废纸张、废塑料、金属易拉罐）🟡 ♻️"
        },
        "icon": "🟡"
      },
      {
        "id": "opt-k2-cit-e1-2",
        "label": {
          "th": "ถังขยะสีแดงขยะติดเชื้อ",
          "en": "RED infectious hazardous bin",
          "zh": "深红色有毒有害及感染性医疗垃圾桶"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k2-cit-e1-3",
        "label": {
          "th": "เอาไปโยนใส่สระน้ำให้จม",
          "en": "Throw into lake to sink",
          "zh": "直接扔进公园荷花观赏水池底深埋"
        },
        "icon": "🌊"
      }
    ],
    "correctOptionId": "opt-k2-cit-e1-1",
    "explanation": {
      "th": "ขยะรีไซเคิลในถังสีเหลืองสามารถนำกลับมาหลอมขึ้นรูปใหม่ ประหยัดทรัพยากรธรรมชาติ เก่งมากครับ!",
      "en": "Correct! Yellow bins gather high-value recyclables for industrial reprocesing.",
      "zh": "答对了！黄色可回收物桶内的瓶罐纸盒能回炉再造，变废为宝造福人类。"
    }
  },
  {
    "id": "k2-cit-e2",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "การคัดแยกขยะรีไซเคิลระดับชั้นอนุบาล 2 ชุดที่ 2: \"ขวดพลาสติกใส กระป๋องน้ำอัดลม และกล่องกระดาษลัง\" 🧴 🥫 📦 ควรคัดแยกทิ้งลงในถังขยะสีใด?",
      "en": "K2 Recycling Practice #2: Empty plastic bottles, aluminum beverage cans, and cardboard 🧴 🥫 📦 belong in which color bin?",
      "zh": "幼儿园中班资源循环回收第 2 题：喝空的透明矿泉水瓶、可乐易拉罐以及瓦楞纸箱 🧴 🥫 📦，应当清洗沥干后投放进哪种颜色的垃圾桶？"
    },
    "illustration": "🧴 🥫 🟡",
    "illustrationSubtitle": {
      "th": "ถังขยะรีไซเคิล: สีเหลือง",
      "en": "Recyclable waste bin: Yellow",
      "zh": "垃圾分类标准：黄色可回收物垃圾桶"
    },
    "options": [
      {
        "id": "opt-k2-cit-e2-1",
        "label": {
          "th": "ถังขยะสีแดงขยะติดเชื้อ",
          "en": "RED infectious hazardous bin",
          "zh": "深红色有毒有害及感染性医疗垃圾桶"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k2-cit-e2-2",
        "label": {
          "th": "ถังขยะสีเหลือง (ขยะรีไซเคิลที่นำกลับมาแปรรูปใหม่ได้) 🟡 ♻️",
          "en": "YELLOW BIN (Recyclables: plastic, metals, cardboard)",
          "zh": "黄色垃圾桶（可回收物：废纸张、废塑料、金属易拉罐）🟡 ♻️"
        },
        "icon": "🟡"
      },
      {
        "id": "opt-k2-cit-e2-3",
        "label": {
          "th": "เอาไปโยนใส่สระน้ำให้จม",
          "en": "Throw into lake to sink",
          "zh": "直接扔进公园荷花观赏水池底深埋"
        },
        "icon": "🌊"
      }
    ],
    "correctOptionId": "opt-k2-cit-e2-2",
    "explanation": {
      "th": "ขยะรีไซเคิลในถังสีเหลืองสามารถนำกลับมาหลอมขึ้นรูปใหม่ ประหยัดทรัพยากรธรรมชาติ เก่งมากครับ!",
      "en": "Correct! Yellow bins gather high-value recyclables for industrial reprocesing.",
      "zh": "答对了！黄色可回收物桶内的瓶罐纸盒能回炉再造，变废为宝造福人类。"
    }
  },
  {
    "id": "k2-cit-e3",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "การคัดแยกขยะรีไซเคิลระดับชั้นอนุบาล 2 ชุดที่ 3: \"ขวดพลาสติกใส กระป๋องน้ำอัดลม และกล่องกระดาษลัง\" 🧴 🥫 📦 ควรคัดแยกทิ้งลงในถังขยะสีใด?",
      "en": "K2 Recycling Practice #3: Empty plastic bottles, aluminum beverage cans, and cardboard 🧴 🥫 📦 belong in which color bin?",
      "zh": "幼儿园中班资源循环回收第 3 题：喝空的透明矿泉水瓶、可乐易拉罐以及瓦楞纸箱 🧴 🥫 📦，应当清洗沥干后投放进哪种颜色的垃圾桶？"
    },
    "illustration": "🧴 🥫 🟡",
    "illustrationSubtitle": {
      "th": "ถังขยะรีไซเคิล: สีเหลือง",
      "en": "Recyclable waste bin: Yellow",
      "zh": "垃圾分类标准：黄色可回收物垃圾桶"
    },
    "options": [
      {
        "id": "opt-k2-cit-e3-1",
        "label": {
          "th": "เอาไปโยนใส่สระน้ำให้จม",
          "en": "Throw into lake to sink",
          "zh": "直接扔进公园荷花观赏水池底深埋"
        },
        "icon": "🌊"
      },
      {
        "id": "opt-k2-cit-e3-2",
        "label": {
          "th": "ถังขยะสีแดงขยะติดเชื้อ",
          "en": "RED infectious hazardous bin",
          "zh": "深红色有毒有害及感染性医疗垃圾桶"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k2-cit-e3-3",
        "label": {
          "th": "ถังขยะสีเหลือง (ขยะรีไซเคิลที่นำกลับมาแปรรูปใหม่ได้) 🟡 ♻️",
          "en": "YELLOW BIN (Recyclables: plastic, metals, cardboard)",
          "zh": "黄色垃圾桶（可回收物：废纸张、废塑料、金属易拉罐）🟡 ♻️"
        },
        "icon": "🟡"
      }
    ],
    "correctOptionId": "opt-k2-cit-e3-3",
    "explanation": {
      "th": "ขยะรีไซเคิลในถังสีเหลืองสามารถนำกลับมาหลอมขึ้นรูปใหม่ ประหยัดทรัพยากรธรรมชาติ เก่งมากครับ!",
      "en": "Correct! Yellow bins gather high-value recyclables for industrial reprocesing.",
      "zh": "答对了！黄色可回收物桶内的瓶罐纸盒能回炉再造，变废为宝造福人类。"
    }
  },
  {
    "id": "k2-cit-e4",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "การคัดแยกขยะรีไซเคิลระดับชั้นอนุบาล 2 ชุดที่ 4: \"ขวดพลาสติกใส กระป๋องน้ำอัดลม และกล่องกระดาษลัง\" 🧴 🥫 📦 ควรคัดแยกทิ้งลงในถังขยะสีใด?",
      "en": "K2 Recycling Practice #4: Empty plastic bottles, aluminum beverage cans, and cardboard 🧴 🥫 📦 belong in which color bin?",
      "zh": "幼儿园中班资源循环回收第 4 题：喝空的透明矿泉水瓶、可乐易拉罐以及瓦楞纸箱 🧴 🥫 📦，应当清洗沥干后投放进哪种颜色的垃圾桶？"
    },
    "illustration": "🧴 🥫 🟡",
    "illustrationSubtitle": {
      "th": "ถังขยะรีไซเคิล: สีเหลือง",
      "en": "Recyclable waste bin: Yellow",
      "zh": "垃圾分类标准：黄色可回收物垃圾桶"
    },
    "options": [
      {
        "id": "opt-k2-cit-e4-1",
        "label": {
          "th": "ถังขยะสีเหลือง (ขยะรีไซเคิลที่นำกลับมาแปรรูปใหม่ได้) 🟡 ♻️",
          "en": "YELLOW BIN (Recyclables: plastic, metals, cardboard)",
          "zh": "黄色垃圾桶（可回收物：废纸张、废塑料、金属易拉罐）🟡 ♻️"
        },
        "icon": "🟡"
      },
      {
        "id": "opt-k2-cit-e4-2",
        "label": {
          "th": "ถังขยะสีแดงขยะติดเชื้อ",
          "en": "RED infectious hazardous bin",
          "zh": "深红色有毒有害及感染性医疗垃圾桶"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k2-cit-e4-3",
        "label": {
          "th": "เอาไปโยนใส่สระน้ำให้จม",
          "en": "Throw into lake to sink",
          "zh": "直接扔进公园荷花观赏水池底深埋"
        },
        "icon": "🌊"
      }
    ],
    "correctOptionId": "opt-k2-cit-e4-1",
    "explanation": {
      "th": "ขยะรีไซเคิลในถังสีเหลืองสามารถนำกลับมาหลอมขึ้นรูปใหม่ ประหยัดทรัพยากรธรรมชาติ เก่งมากครับ!",
      "en": "Correct! Yellow bins gather high-value recyclables for industrial reprocesing.",
      "zh": "答对了！黄色可回收物桶内的瓶罐纸盒能回炉再造，变废为宝造福人类。"
    }
  },
  {
    "id": "k2-cit-e5",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "การคัดแยกขยะรีไซเคิลระดับชั้นอนุบาล 2 ชุดที่ 5: \"ขวดพลาสติกใส กระป๋องน้ำอัดลม และกล่องกระดาษลัง\" 🧴 🥫 📦 ควรคัดแยกทิ้งลงในถังขยะสีใด?",
      "en": "K2 Recycling Practice #5: Empty plastic bottles, aluminum beverage cans, and cardboard 🧴 🥫 📦 belong in which color bin?",
      "zh": "幼儿园中班资源循环回收第 5 题：喝空的透明矿泉水瓶、可乐易拉罐以及瓦楞纸箱 🧴 🥫 📦，应当清洗沥干后投放进哪种颜色的垃圾桶？"
    },
    "illustration": "🧴 🥫 🟡",
    "illustrationSubtitle": {
      "th": "ถังขยะรีไซเคิล: สีเหลือง",
      "en": "Recyclable waste bin: Yellow",
      "zh": "垃圾分类标准：黄色可回收物垃圾桶"
    },
    "options": [
      {
        "id": "opt-k2-cit-e5-1",
        "label": {
          "th": "ถังขยะสีแดงขยะติดเชื้อ",
          "en": "RED infectious hazardous bin",
          "zh": "深红色有毒有害及感染性医疗垃圾桶"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k2-cit-e5-2",
        "label": {
          "th": "ถังขยะสีเหลือง (ขยะรีไซเคิลที่นำกลับมาแปรรูปใหม่ได้) 🟡 ♻️",
          "en": "YELLOW BIN (Recyclables: plastic, metals, cardboard)",
          "zh": "黄色垃圾桶（可回收物：废纸张、废塑料、金属易拉罐）🟡 ♻️"
        },
        "icon": "🟡"
      },
      {
        "id": "opt-k2-cit-e5-3",
        "label": {
          "th": "เอาไปโยนใส่สระน้ำให้จม",
          "en": "Throw into lake to sink",
          "zh": "直接扔进公园荷花观赏水池底深埋"
        },
        "icon": "🌊"
      }
    ],
    "correctOptionId": "opt-k2-cit-e5-2",
    "explanation": {
      "th": "ขยะรีไซเคิลในถังสีเหลืองสามารถนำกลับมาหลอมขึ้นรูปใหม่ ประหยัดทรัพยากรธรรมชาติ เก่งมากครับ!",
      "en": "Correct! Yellow bins gather high-value recyclables for industrial reprocesing.",
      "zh": "答对了！黄色可回收物桶内的瓶罐纸盒能回炉再造，变废为宝造福人类。"
    }
  },
  {
    "id": "k2-cit-e6",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "การคัดแยกขยะรีไซเคิลระดับชั้นอนุบาล 2 ชุดที่ 6: \"ขวดพลาสติกใส กระป๋องน้ำอัดลม และกล่องกระดาษลัง\" 🧴 🥫 📦 ควรคัดแยกทิ้งลงในถังขยะสีใด?",
      "en": "K2 Recycling Practice #6: Empty plastic bottles, aluminum beverage cans, and cardboard 🧴 🥫 📦 belong in which color bin?",
      "zh": "幼儿园中班资源循环回收第 6 题：喝空的透明矿泉水瓶、可乐易拉罐以及瓦楞纸箱 🧴 🥫 📦，应当清洗沥干后投放进哪种颜色的垃圾桶？"
    },
    "illustration": "🧴 🥫 🟡",
    "illustrationSubtitle": {
      "th": "ถังขยะรีไซเคิล: สีเหลือง",
      "en": "Recyclable waste bin: Yellow",
      "zh": "垃圾分类标准：黄色可回收物垃圾桶"
    },
    "options": [
      {
        "id": "opt-k2-cit-e6-1",
        "label": {
          "th": "เอาไปโยนใส่สระน้ำให้จม",
          "en": "Throw into lake to sink",
          "zh": "直接扔进公园荷花观赏水池底深埋"
        },
        "icon": "🌊"
      },
      {
        "id": "opt-k2-cit-e6-2",
        "label": {
          "th": "ถังขยะสีแดงขยะติดเชื้อ",
          "en": "RED infectious hazardous bin",
          "zh": "深红色有毒有害及感染性医疗垃圾桶"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k2-cit-e6-3",
        "label": {
          "th": "ถังขยะสีเหลือง (ขยะรีไซเคิลที่นำกลับมาแปรรูปใหม่ได้) 🟡 ♻️",
          "en": "YELLOW BIN (Recyclables: plastic, metals, cardboard)",
          "zh": "黄色垃圾桶（可回收物：废纸张、废塑料、金属易拉罐）🟡 ♻️"
        },
        "icon": "🟡"
      }
    ],
    "correctOptionId": "opt-k2-cit-e6-3",
    "explanation": {
      "th": "ขยะรีไซเคิลในถังสีเหลืองสามารถนำกลับมาหลอมขึ้นรูปใหม่ ประหยัดทรัพยากรธรรมชาติ เก่งมากครับ!",
      "en": "Correct! Yellow bins gather high-value recyclables for industrial reprocesing.",
      "zh": "答对了！黄色可回收物桶内的瓶罐纸盒能回炉再造，变废为宝造福人类。"
    }
  },
  {
    "id": "k2-cit-e7",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "การคัดแยกขยะรีไซเคิลระดับชั้นอนุบาล 2 ชุดที่ 7: \"ขวดพลาสติกใส กระป๋องน้ำอัดลม และกล่องกระดาษลัง\" 🧴 🥫 📦 ควรคัดแยกทิ้งลงในถังขยะสีใด?",
      "en": "K2 Recycling Practice #7: Empty plastic bottles, aluminum beverage cans, and cardboard 🧴 🥫 📦 belong in which color bin?",
      "zh": "幼儿园中班资源循环回收第 7 题：喝空的透明矿泉水瓶、可乐易拉罐以及瓦楞纸箱 🧴 🥫 📦，应当清洗沥干后投放进哪种颜色的垃圾桶？"
    },
    "illustration": "🧴 🥫 🟡",
    "illustrationSubtitle": {
      "th": "ถังขยะรีไซเคิล: สีเหลือง",
      "en": "Recyclable waste bin: Yellow",
      "zh": "垃圾分类标准：黄色可回收物垃圾桶"
    },
    "options": [
      {
        "id": "opt-k2-cit-e7-1",
        "label": {
          "th": "ถังขยะสีเหลือง (ขยะรีไซเคิลที่นำกลับมาแปรรูปใหม่ได้) 🟡 ♻️",
          "en": "YELLOW BIN (Recyclables: plastic, metals, cardboard)",
          "zh": "黄色垃圾桶（可回收物：废纸张、废塑料、金属易拉罐）🟡 ♻️"
        },
        "icon": "🟡"
      },
      {
        "id": "opt-k2-cit-e7-2",
        "label": {
          "th": "ถังขยะสีแดงขยะติดเชื้อ",
          "en": "RED infectious hazardous bin",
          "zh": "深红色有毒有害及感染性医疗垃圾桶"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k2-cit-e7-3",
        "label": {
          "th": "เอาไปโยนใส่สระน้ำให้จม",
          "en": "Throw into lake to sink",
          "zh": "直接扔进公园荷花观赏水池底深埋"
        },
        "icon": "🌊"
      }
    ],
    "correctOptionId": "opt-k2-cit-e7-1",
    "explanation": {
      "th": "ขยะรีไซเคิลในถังสีเหลืองสามารถนำกลับมาหลอมขึ้นรูปใหม่ ประหยัดทรัพยากรธรรมชาติ เก่งมากครับ!",
      "en": "Correct! Yellow bins gather high-value recyclables for industrial reprocesing.",
      "zh": "答对了！黄色可回收物桶内的瓶罐纸盒能回炉再造，变废为宝造福人类。"
    }
  },
  {
    "id": "k2-cit-e8",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "การคัดแยกขยะรีไซเคิลระดับชั้นอนุบาล 2 ชุดที่ 8: \"ขวดพลาสติกใส กระป๋องน้ำอัดลม และกล่องกระดาษลัง\" 🧴 🥫 📦 ควรคัดแยกทิ้งลงในถังขยะสีใด?",
      "en": "K2 Recycling Practice #8: Empty plastic bottles, aluminum beverage cans, and cardboard 🧴 🥫 📦 belong in which color bin?",
      "zh": "幼儿园中班资源循环回收第 8 题：喝空的透明矿泉水瓶、可乐易拉罐以及瓦楞纸箱 🧴 🥫 📦，应当清洗沥干后投放进哪种颜色的垃圾桶？"
    },
    "illustration": "🧴 🥫 🟡",
    "illustrationSubtitle": {
      "th": "ถังขยะรีไซเคิล: สีเหลือง",
      "en": "Recyclable waste bin: Yellow",
      "zh": "垃圾分类标准：黄色可回收物垃圾桶"
    },
    "options": [
      {
        "id": "opt-k2-cit-e8-1",
        "label": {
          "th": "ถังขยะสีแดงขยะติดเชื้อ",
          "en": "RED infectious hazardous bin",
          "zh": "深红色有毒有害及感染性医疗垃圾桶"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k2-cit-e8-2",
        "label": {
          "th": "ถังขยะสีเหลือง (ขยะรีไซเคิลที่นำกลับมาแปรรูปใหม่ได้) 🟡 ♻️",
          "en": "YELLOW BIN (Recyclables: plastic, metals, cardboard)",
          "zh": "黄色垃圾桶（可回收物：废纸张、废塑料、金属易拉罐）🟡 ♻️"
        },
        "icon": "🟡"
      },
      {
        "id": "opt-k2-cit-e8-3",
        "label": {
          "th": "เอาไปโยนใส่สระน้ำให้จม",
          "en": "Throw into lake to sink",
          "zh": "直接扔进公园荷花观赏水池底深埋"
        },
        "icon": "🌊"
      }
    ],
    "correctOptionId": "opt-k2-cit-e8-2",
    "explanation": {
      "th": "ขยะรีไซเคิลในถังสีเหลืองสามารถนำกลับมาหลอมขึ้นรูปใหม่ ประหยัดทรัพยากรธรรมชาติ เก่งมากครับ!",
      "en": "Correct! Yellow bins gather high-value recyclables for industrial reprocesing.",
      "zh": "答对了！黄色可回收物桶内的瓶罐纸盒能回炉再造，变废为宝造福人类。"
    }
  },
  {
    "id": "k2-cit-e9",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "การคัดแยกขยะรีไซเคิลระดับชั้นอนุบาล 2 ชุดที่ 9: \"ขวดพลาสติกใส กระป๋องน้ำอัดลม และกล่องกระดาษลัง\" 🧴 🥫 📦 ควรคัดแยกทิ้งลงในถังขยะสีใด?",
      "en": "K2 Recycling Practice #9: Empty plastic bottles, aluminum beverage cans, and cardboard 🧴 🥫 📦 belong in which color bin?",
      "zh": "幼儿园中班资源循环回收第 9 题：喝空的透明矿泉水瓶、可乐易拉罐以及瓦楞纸箱 🧴 🥫 📦，应当清洗沥干后投放进哪种颜色的垃圾桶？"
    },
    "illustration": "🧴 🥫 🟡",
    "illustrationSubtitle": {
      "th": "ถังขยะรีไซเคิล: สีเหลือง",
      "en": "Recyclable waste bin: Yellow",
      "zh": "垃圾分类标准：黄色可回收物垃圾桶"
    },
    "options": [
      {
        "id": "opt-k2-cit-e9-1",
        "label": {
          "th": "เอาไปโยนใส่สระน้ำให้จม",
          "en": "Throw into lake to sink",
          "zh": "直接扔进公园荷花观赏水池底深埋"
        },
        "icon": "🌊"
      },
      {
        "id": "opt-k2-cit-e9-2",
        "label": {
          "th": "ถังขยะสีแดงขยะติดเชื้อ",
          "en": "RED infectious hazardous bin",
          "zh": "深红色有毒有害及感染性医疗垃圾桶"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k2-cit-e9-3",
        "label": {
          "th": "ถังขยะสีเหลือง (ขยะรีไซเคิลที่นำกลับมาแปรรูปใหม่ได้) 🟡 ♻️",
          "en": "YELLOW BIN (Recyclables: plastic, metals, cardboard)",
          "zh": "黄色垃圾桶（可回收物：废纸张、废塑料、金属易拉罐）🟡 ♻️"
        },
        "icon": "🟡"
      }
    ],
    "correctOptionId": "opt-k2-cit-e9-3",
    "explanation": {
      "th": "ขยะรีไซเคิลในถังสีเหลืองสามารถนำกลับมาหลอมขึ้นรูปใหม่ ประหยัดทรัพยากรธรรมชาติ เก่งมากครับ!",
      "en": "Correct! Yellow bins gather high-value recyclables for industrial reprocesing.",
      "zh": "答对了！黄色可回收物桶内的瓶罐纸盒能回炉再造，变废为宝造福人类。"
    }
  },
  {
    "id": "k2-cit-e10",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "การคัดแยกขยะรีไซเคิลระดับชั้นอนุบาล 2 ชุดที่ 10: \"ขวดพลาสติกใส กระป๋องน้ำอัดลม และกล่องกระดาษลัง\" 🧴 🥫 📦 ควรคัดแยกทิ้งลงในถังขยะสีใด?",
      "en": "K2 Recycling Practice #10: Empty plastic bottles, aluminum beverage cans, and cardboard 🧴 🥫 📦 belong in which color bin?",
      "zh": "幼儿园中班资源循环回收第 10 题：喝空的透明矿泉水瓶、可乐易拉罐以及瓦楞纸箱 🧴 🥫 📦，应当清洗沥干后投放进哪种颜色的垃圾桶？"
    },
    "illustration": "🧴 🥫 🟡",
    "illustrationSubtitle": {
      "th": "ถังขยะรีไซเคิล: สีเหลือง",
      "en": "Recyclable waste bin: Yellow",
      "zh": "垃圾分类标准：黄色可回收物垃圾桶"
    },
    "options": [
      {
        "id": "opt-k2-cit-e10-1",
        "label": {
          "th": "ถังขยะสีเหลือง (ขยะรีไซเคิลที่นำกลับมาแปรรูปใหม่ได้) 🟡 ♻️",
          "en": "YELLOW BIN (Recyclables: plastic, metals, cardboard)",
          "zh": "黄色垃圾桶（可回收物：废纸张、废塑料、金属易拉罐）🟡 ♻️"
        },
        "icon": "🟡"
      },
      {
        "id": "opt-k2-cit-e10-2",
        "label": {
          "th": "ถังขยะสีแดงขยะติดเชื้อ",
          "en": "RED infectious hazardous bin",
          "zh": "深红色有毒有害及感染性医疗垃圾桶"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k2-cit-e10-3",
        "label": {
          "th": "เอาไปโยนใส่สระน้ำให้จม",
          "en": "Throw into lake to sink",
          "zh": "直接扔进公园荷花观赏水池底深埋"
        },
        "icon": "🌊"
      }
    ],
    "correctOptionId": "opt-k2-cit-e10-1",
    "explanation": {
      "th": "ขยะรีไซเคิลในถังสีเหลืองสามารถนำกลับมาหลอมขึ้นรูปใหม่ ประหยัดทรัพยากรธรรมชาติ เก่งมากครับ!",
      "en": "Correct! Yellow bins gather high-value recyclables for industrial reprocesing.",
      "zh": "答对了！黄色可回收物桶内的瓶罐纸盒能回炉再造，变废为宝造福人类。"
    }
  },
  {
    "id": "k2-cit-m1",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "การเดินทางที่เป็นมิตรต่อสิ่งแวดล้อม (Green Transport) อนุบาล 2 ชุดที่ 1: เมื่อต้องเดินทางไปสถานที่ใกล้ๆ ในละแวกบ้าน 🚲 🚶 วิธีการเดินทางที่ช่วยลดมลพิษทางอากาศคือข้อใด?",
      "en": "K2 Green Mobility #1: Traveling to nearby neighborhood spots 🚲 🚶: What eco-friendly transport slashes air pollution?",
      "zh": "幼儿园中班低碳绿色出行第 1 题：去家门口附近几百米的社区生鲜小超市买文具 🚲 🚶 时，最环保减碳、杜绝尾气污染的出行方式是？"
    },
    "illustration": "🚲 🚶 🌿",
    "illustrationSubtitle": {
      "th": "การเดินทางสีเขียว: เดินหรือปั่นจักรยานลดมลพิษ",
      "en": "Green travel: Walk or bicycle to cut emissions",
      "zh": "绿色低碳出行：步行或骑自行车减少尾气排放"
    },
    "options": [
      {
        "id": "opt-k2-cit-m1-1",
        "label": {
          "th": "ให้ผู้ปกครองขับรถบรรทุกขนาดใหญ่ติดเครื่องเปิดแอร์รอ 3 ชั่วโมง",
          "en": "Idle a giant diesel truck running engine 3 hours",
          "zh": "非让爸爸开着十个轮子的重型柴油卡车怠速轰鸣排浓烟等候三小时"
        },
        "icon": "🚚"
      },
      {
        "id": "opt-k2-cit-m1-2",
        "label": {
          "th": "เดินเท้าหรือปั่นจักรยานอย่างเพลิดเพลิน ได้ออกกำลังกายและไม่ปล่อยควันพิษ 🚲 🚶 🌿",
          "en": "Walking or cycling merrily, getting healthy exercise with ZERO tailpipe emissions",
          "zh": "迈开轻快双腿步行散步，或脚踏环保自行车出行，健身环保零尾气 🚲 🚶 🌿"
        },
        "icon": "🚲"
      },
      {
        "id": "opt-k2-cit-m1-3",
        "label": {
          "th": "นั่งเฮลิคอปเตอร์ส่วนตัวบินไป",
          "en": "Fly a roaring jet helicopter",
          "zh": "开着震耳欲聋私人喷气式直升飞机在邻里低空盘旋降落"
        },
        "icon": "🚁"
      }
    ],
    "correctOptionId": "opt-k2-cit-m1-2",
    "explanation": {
      "th": "การเดินหรือปั่นจักรยานในระยะใกล้ช่วยลดก๊าซคาร์บอนไดออกไซด์ และทำให้สุขภาพแข็งแรง เก่งมากครับ!",
      "en": "Awesome! Active human transport cuts fossil emissions and clears our city air.",
      "zh": "太棒了！三公里以内优选步行或骑行，低碳环保无尾气，强健体魄益处多。"
    }
  },
  {
    "id": "k2-cit-m2",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "การเดินทางที่เป็นมิตรต่อสิ่งแวดล้อม (Green Transport) อนุบาล 2 ชุดที่ 2: เมื่อต้องเดินทางไปสถานที่ใกล้ๆ ในละแวกบ้าน 🚲 🚶 วิธีการเดินทางที่ช่วยลดมลพิษทางอากาศคือข้อใด?",
      "en": "K2 Green Mobility #2: Traveling to nearby neighborhood spots 🚲 🚶: What eco-friendly transport slashes air pollution?",
      "zh": "幼儿园中班低碳绿色出行第 2 题：去家门口附近几百米的社区生鲜小超市买文具 🚲 🚶 时，最环保减碳、杜绝尾气污染的出行方式是？"
    },
    "illustration": "🚲 🚶 🌿",
    "illustrationSubtitle": {
      "th": "การเดินทางสีเขียว: เดินหรือปั่นจักรยานลดมลพิษ",
      "en": "Green travel: Walk or bicycle to cut emissions",
      "zh": "绿色低碳出行：步行或骑自行车减少尾气排放"
    },
    "options": [
      {
        "id": "opt-k2-cit-m2-1",
        "label": {
          "th": "นั่งเฮลิคอปเตอร์ส่วนตัวบินไป",
          "en": "Fly a roaring jet helicopter",
          "zh": "开着震耳欲聋私人喷气式直升飞机在邻里低空盘旋降落"
        },
        "icon": "🚁"
      },
      {
        "id": "opt-k2-cit-m2-2",
        "label": {
          "th": "ให้ผู้ปกครองขับรถบรรทุกขนาดใหญ่ติดเครื่องเปิดแอร์รอ 3 ชั่วโมง",
          "en": "Idle a giant diesel truck running engine 3 hours",
          "zh": "非让爸爸开着十个轮子的重型柴油卡车怠速轰鸣排浓烟等候三小时"
        },
        "icon": "🚚"
      },
      {
        "id": "opt-k2-cit-m2-3",
        "label": {
          "th": "เดินเท้าหรือปั่นจักรยานอย่างเพลิดเพลิน ได้ออกกำลังกายและไม่ปล่อยควันพิษ 🚲 🚶 🌿",
          "en": "Walking or cycling merrily, getting healthy exercise with ZERO tailpipe emissions",
          "zh": "迈开轻快双腿步行散步，或脚踏环保自行车出行，健身环保零尾气 🚲 🚶 🌿"
        },
        "icon": "🚲"
      }
    ],
    "correctOptionId": "opt-k2-cit-m2-3",
    "explanation": {
      "th": "การเดินหรือปั่นจักรยานในระยะใกล้ช่วยลดก๊าซคาร์บอนไดออกไซด์ และทำให้สุขภาพแข็งแรง เก่งมากครับ!",
      "en": "Awesome! Active human transport cuts fossil emissions and clears our city air.",
      "zh": "太棒了！三公里以内优选步行或骑行，低碳环保无尾气，强健体魄益处多。"
    }
  },
  {
    "id": "k2-cit-m3",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "การเดินทางที่เป็นมิตรต่อสิ่งแวดล้อม (Green Transport) อนุบาล 2 ชุดที่ 3: เมื่อต้องเดินทางไปสถานที่ใกล้ๆ ในละแวกบ้าน 🚲 🚶 วิธีการเดินทางที่ช่วยลดมลพิษทางอากาศคือข้อใด?",
      "en": "K2 Green Mobility #3: Traveling to nearby neighborhood spots 🚲 🚶: What eco-friendly transport slashes air pollution?",
      "zh": "幼儿园中班低碳绿色出行第 3 题：去家门口附近几百米的社区生鲜小超市买文具 🚲 🚶 时，最环保减碳、杜绝尾气污染的出行方式是？"
    },
    "illustration": "🚲 🚶 🌿",
    "illustrationSubtitle": {
      "th": "การเดินทางสีเขียว: เดินหรือปั่นจักรยานลดมลพิษ",
      "en": "Green travel: Walk or bicycle to cut emissions",
      "zh": "绿色低碳出行：步行或骑自行车减少尾气排放"
    },
    "options": [
      {
        "id": "opt-k2-cit-m3-1",
        "label": {
          "th": "เดินเท้าหรือปั่นจักรยานอย่างเพลิดเพลิน ได้ออกกำลังกายและไม่ปล่อยควันพิษ 🚲 🚶 🌿",
          "en": "Walking or cycling merrily, getting healthy exercise with ZERO tailpipe emissions",
          "zh": "迈开轻快双腿步行散步，或脚踏环保自行车出行，健身环保零尾气 🚲 🚶 🌿"
        },
        "icon": "🚲"
      },
      {
        "id": "opt-k2-cit-m3-2",
        "label": {
          "th": "ให้ผู้ปกครองขับรถบรรทุกขนาดใหญ่ติดเครื่องเปิดแอร์รอ 3 ชั่วโมง",
          "en": "Idle a giant diesel truck running engine 3 hours",
          "zh": "非让爸爸开着十个轮子的重型柴油卡车怠速轰鸣排浓烟等候三小时"
        },
        "icon": "🚚"
      },
      {
        "id": "opt-k2-cit-m3-3",
        "label": {
          "th": "นั่งเฮลิคอปเตอร์ส่วนตัวบินไป",
          "en": "Fly a roaring jet helicopter",
          "zh": "开着震耳欲聋私人喷气式直升飞机在邻里低空盘旋降落"
        },
        "icon": "🚁"
      }
    ],
    "correctOptionId": "opt-k2-cit-m3-1",
    "explanation": {
      "th": "การเดินหรือปั่นจักรยานในระยะใกล้ช่วยลดก๊าซคาร์บอนไดออกไซด์ และทำให้สุขภาพแข็งแรง เก่งมากครับ!",
      "en": "Awesome! Active human transport cuts fossil emissions and clears our city air.",
      "zh": "太棒了！三公里以内优选步行或骑行，低碳环保无尾气，强健体魄益处多。"
    }
  },
  {
    "id": "k2-cit-m4",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "การเดินทางที่เป็นมิตรต่อสิ่งแวดล้อม (Green Transport) อนุบาล 2 ชุดที่ 4: เมื่อต้องเดินทางไปสถานที่ใกล้ๆ ในละแวกบ้าน 🚲 🚶 วิธีการเดินทางที่ช่วยลดมลพิษทางอากาศคือข้อใด?",
      "en": "K2 Green Mobility #4: Traveling to nearby neighborhood spots 🚲 🚶: What eco-friendly transport slashes air pollution?",
      "zh": "幼儿园中班低碳绿色出行第 4 题：去家门口附近几百米的社区生鲜小超市买文具 🚲 🚶 时，最环保减碳、杜绝尾气污染的出行方式是？"
    },
    "illustration": "🚲 🚶 🌿",
    "illustrationSubtitle": {
      "th": "การเดินทางสีเขียว: เดินหรือปั่นจักรยานลดมลพิษ",
      "en": "Green travel: Walk or bicycle to cut emissions",
      "zh": "绿色低碳出行：步行或骑自行车减少尾气排放"
    },
    "options": [
      {
        "id": "opt-k2-cit-m4-1",
        "label": {
          "th": "ให้ผู้ปกครองขับรถบรรทุกขนาดใหญ่ติดเครื่องเปิดแอร์รอ 3 ชั่วโมง",
          "en": "Idle a giant diesel truck running engine 3 hours",
          "zh": "非让爸爸开着十个轮子的重型柴油卡车怠速轰鸣排浓烟等候三小时"
        },
        "icon": "🚚"
      },
      {
        "id": "opt-k2-cit-m4-2",
        "label": {
          "th": "เดินเท้าหรือปั่นจักรยานอย่างเพลิดเพลิน ได้ออกกำลังกายและไม่ปล่อยควันพิษ 🚲 🚶 🌿",
          "en": "Walking or cycling merrily, getting healthy exercise with ZERO tailpipe emissions",
          "zh": "迈开轻快双腿步行散步，或脚踏环保自行车出行，健身环保零尾气 🚲 🚶 🌿"
        },
        "icon": "🚲"
      },
      {
        "id": "opt-k2-cit-m4-3",
        "label": {
          "th": "นั่งเฮลิคอปเตอร์ส่วนตัวบินไป",
          "en": "Fly a roaring jet helicopter",
          "zh": "开着震耳欲聋私人喷气式直升飞机在邻里低空盘旋降落"
        },
        "icon": "🚁"
      }
    ],
    "correctOptionId": "opt-k2-cit-m4-2",
    "explanation": {
      "th": "การเดินหรือปั่นจักรยานในระยะใกล้ช่วยลดก๊าซคาร์บอนไดออกไซด์ และทำให้สุขภาพแข็งแรง เก่งมากครับ!",
      "en": "Awesome! Active human transport cuts fossil emissions and clears our city air.",
      "zh": "太棒了！三公里以内优选步行或骑行，低碳环保无尾气，强健体魄益处多。"
    }
  },
  {
    "id": "k2-cit-m5",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "การเดินทางที่เป็นมิตรต่อสิ่งแวดล้อม (Green Transport) อนุบาล 2 ชุดที่ 5: เมื่อต้องเดินทางไปสถานที่ใกล้ๆ ในละแวกบ้าน 🚲 🚶 วิธีการเดินทางที่ช่วยลดมลพิษทางอากาศคือข้อใด?",
      "en": "K2 Green Mobility #5: Traveling to nearby neighborhood spots 🚲 🚶: What eco-friendly transport slashes air pollution?",
      "zh": "幼儿园中班低碳绿色出行第 5 题：去家门口附近几百米的社区生鲜小超市买文具 🚲 🚶 时，最环保减碳、杜绝尾气污染的出行方式是？"
    },
    "illustration": "🚲 🚶 🌿",
    "illustrationSubtitle": {
      "th": "การเดินทางสีเขียว: เดินหรือปั่นจักรยานลดมลพิษ",
      "en": "Green travel: Walk or bicycle to cut emissions",
      "zh": "绿色低碳出行：步行或骑自行车减少尾气排放"
    },
    "options": [
      {
        "id": "opt-k2-cit-m5-1",
        "label": {
          "th": "นั่งเฮลิคอปเตอร์ส่วนตัวบินไป",
          "en": "Fly a roaring jet helicopter",
          "zh": "开着震耳欲聋私人喷气式直升飞机在邻里低空盘旋降落"
        },
        "icon": "🚁"
      },
      {
        "id": "opt-k2-cit-m5-2",
        "label": {
          "th": "ให้ผู้ปกครองขับรถบรรทุกขนาดใหญ่ติดเครื่องเปิดแอร์รอ 3 ชั่วโมง",
          "en": "Idle a giant diesel truck running engine 3 hours",
          "zh": "非让爸爸开着十个轮子的重型柴油卡车怠速轰鸣排浓烟等候三小时"
        },
        "icon": "🚚"
      },
      {
        "id": "opt-k2-cit-m5-3",
        "label": {
          "th": "เดินเท้าหรือปั่นจักรยานอย่างเพลิดเพลิน ได้ออกกำลังกายและไม่ปล่อยควันพิษ 🚲 🚶 🌿",
          "en": "Walking or cycling merrily, getting healthy exercise with ZERO tailpipe emissions",
          "zh": "迈开轻快双腿步行散步，或脚踏环保自行车出行，健身环保零尾气 🚲 🚶 🌿"
        },
        "icon": "🚲"
      }
    ],
    "correctOptionId": "opt-k2-cit-m5-3",
    "explanation": {
      "th": "การเดินหรือปั่นจักรยานในระยะใกล้ช่วยลดก๊าซคาร์บอนไดออกไซด์ และทำให้สุขภาพแข็งแรง เก่งมากครับ!",
      "en": "Awesome! Active human transport cuts fossil emissions and clears our city air.",
      "zh": "太棒了！三公里以内优选步行或骑行，低碳环保无尾气，强健体魄益处多。"
    }
  },
  {
    "id": "k2-cit-m6",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "การเดินทางที่เป็นมิตรต่อสิ่งแวดล้อม (Green Transport) อนุบาล 2 ชุดที่ 6: เมื่อต้องเดินทางไปสถานที่ใกล้ๆ ในละแวกบ้าน 🚲 🚶 วิธีการเดินทางที่ช่วยลดมลพิษทางอากาศคือข้อใด?",
      "en": "K2 Green Mobility #6: Traveling to nearby neighborhood spots 🚲 🚶: What eco-friendly transport slashes air pollution?",
      "zh": "幼儿园中班低碳绿色出行第 6 题：去家门口附近几百米的社区生鲜小超市买文具 🚲 🚶 时，最环保减碳、杜绝尾气污染的出行方式是？"
    },
    "illustration": "🚲 🚶 🌿",
    "illustrationSubtitle": {
      "th": "การเดินทางสีเขียว: เดินหรือปั่นจักรยานลดมลพิษ",
      "en": "Green travel: Walk or bicycle to cut emissions",
      "zh": "绿色低碳出行：步行或骑自行车减少尾气排放"
    },
    "options": [
      {
        "id": "opt-k2-cit-m6-1",
        "label": {
          "th": "เดินเท้าหรือปั่นจักรยานอย่างเพลิดเพลิน ได้ออกกำลังกายและไม่ปล่อยควันพิษ 🚲 🚶 🌿",
          "en": "Walking or cycling merrily, getting healthy exercise with ZERO tailpipe emissions",
          "zh": "迈开轻快双腿步行散步，或脚踏环保自行车出行，健身环保零尾气 🚲 🚶 🌿"
        },
        "icon": "🚲"
      },
      {
        "id": "opt-k2-cit-m6-2",
        "label": {
          "th": "ให้ผู้ปกครองขับรถบรรทุกขนาดใหญ่ติดเครื่องเปิดแอร์รอ 3 ชั่วโมง",
          "en": "Idle a giant diesel truck running engine 3 hours",
          "zh": "非让爸爸开着十个轮子的重型柴油卡车怠速轰鸣排浓烟等候三小时"
        },
        "icon": "🚚"
      },
      {
        "id": "opt-k2-cit-m6-3",
        "label": {
          "th": "นั่งเฮลิคอปเตอร์ส่วนตัวบินไป",
          "en": "Fly a roaring jet helicopter",
          "zh": "开着震耳欲聋私人喷气式直升飞机在邻里低空盘旋降落"
        },
        "icon": "🚁"
      }
    ],
    "correctOptionId": "opt-k2-cit-m6-1",
    "explanation": {
      "th": "การเดินหรือปั่นจักรยานในระยะใกล้ช่วยลดก๊าซคาร์บอนไดออกไซด์ และทำให้สุขภาพแข็งแรง เก่งมากครับ!",
      "en": "Awesome! Active human transport cuts fossil emissions and clears our city air.",
      "zh": "太棒了！三公里以内优选步行或骑行，低碳环保无尾气，强健体魄益处多。"
    }
  },
  {
    "id": "k2-cit-m7",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "การเดินทางที่เป็นมิตรต่อสิ่งแวดล้อม (Green Transport) อนุบาล 2 ชุดที่ 7: เมื่อต้องเดินทางไปสถานที่ใกล้ๆ ในละแวกบ้าน 🚲 🚶 วิธีการเดินทางที่ช่วยลดมลพิษทางอากาศคือข้อใด?",
      "en": "K2 Green Mobility #7: Traveling to nearby neighborhood spots 🚲 🚶: What eco-friendly transport slashes air pollution?",
      "zh": "幼儿园中班低碳绿色出行第 7 题：去家门口附近几百米的社区生鲜小超市买文具 🚲 🚶 时，最环保减碳、杜绝尾气污染的出行方式是？"
    },
    "illustration": "🚲 🚶 🌿",
    "illustrationSubtitle": {
      "th": "การเดินทางสีเขียว: เดินหรือปั่นจักรยานลดมลพิษ",
      "en": "Green travel: Walk or bicycle to cut emissions",
      "zh": "绿色低碳出行：步行或骑自行车减少尾气排放"
    },
    "options": [
      {
        "id": "opt-k2-cit-m7-1",
        "label": {
          "th": "ให้ผู้ปกครองขับรถบรรทุกขนาดใหญ่ติดเครื่องเปิดแอร์รอ 3 ชั่วโมง",
          "en": "Idle a giant diesel truck running engine 3 hours",
          "zh": "非让爸爸开着十个轮子的重型柴油卡车怠速轰鸣排浓烟等候三小时"
        },
        "icon": "🚚"
      },
      {
        "id": "opt-k2-cit-m7-2",
        "label": {
          "th": "เดินเท้าหรือปั่นจักรยานอย่างเพลิดเพลิน ได้ออกกำลังกายและไม่ปล่อยควันพิษ 🚲 🚶 🌿",
          "en": "Walking or cycling merrily, getting healthy exercise with ZERO tailpipe emissions",
          "zh": "迈开轻快双腿步行散步，或脚踏环保自行车出行，健身环保零尾气 🚲 🚶 🌿"
        },
        "icon": "🚲"
      },
      {
        "id": "opt-k2-cit-m7-3",
        "label": {
          "th": "นั่งเฮลิคอปเตอร์ส่วนตัวบินไป",
          "en": "Fly a roaring jet helicopter",
          "zh": "开着震耳欲聋私人喷气式直升飞机在邻里低空盘旋降落"
        },
        "icon": "🚁"
      }
    ],
    "correctOptionId": "opt-k2-cit-m7-2",
    "explanation": {
      "th": "การเดินหรือปั่นจักรยานในระยะใกล้ช่วยลดก๊าซคาร์บอนไดออกไซด์ และทำให้สุขภาพแข็งแรง เก่งมากครับ!",
      "en": "Awesome! Active human transport cuts fossil emissions and clears our city air.",
      "zh": "太棒了！三公里以内优选步行或骑行，低碳环保无尾气，强健体魄益处多。"
    }
  },
  {
    "id": "k2-cit-m8",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "การเดินทางที่เป็นมิตรต่อสิ่งแวดล้อม (Green Transport) อนุบาล 2 ชุดที่ 8: เมื่อต้องเดินทางไปสถานที่ใกล้ๆ ในละแวกบ้าน 🚲 🚶 วิธีการเดินทางที่ช่วยลดมลพิษทางอากาศคือข้อใด?",
      "en": "K2 Green Mobility #8: Traveling to nearby neighborhood spots 🚲 🚶: What eco-friendly transport slashes air pollution?",
      "zh": "幼儿园中班低碳绿色出行第 8 题：去家门口附近几百米的社区生鲜小超市买文具 🚲 🚶 时，最环保减碳、杜绝尾气污染的出行方式是？"
    },
    "illustration": "🚲 🚶 🌿",
    "illustrationSubtitle": {
      "th": "การเดินทางสีเขียว: เดินหรือปั่นจักรยานลดมลพิษ",
      "en": "Green travel: Walk or bicycle to cut emissions",
      "zh": "绿色低碳出行：步行或骑自行车减少尾气排放"
    },
    "options": [
      {
        "id": "opt-k2-cit-m8-1",
        "label": {
          "th": "นั่งเฮลิคอปเตอร์ส่วนตัวบินไป",
          "en": "Fly a roaring jet helicopter",
          "zh": "开着震耳欲聋私人喷气式直升飞机在邻里低空盘旋降落"
        },
        "icon": "🚁"
      },
      {
        "id": "opt-k2-cit-m8-2",
        "label": {
          "th": "ให้ผู้ปกครองขับรถบรรทุกขนาดใหญ่ติดเครื่องเปิดแอร์รอ 3 ชั่วโมง",
          "en": "Idle a giant diesel truck running engine 3 hours",
          "zh": "非让爸爸开着十个轮子的重型柴油卡车怠速轰鸣排浓烟等候三小时"
        },
        "icon": "🚚"
      },
      {
        "id": "opt-k2-cit-m8-3",
        "label": {
          "th": "เดินเท้าหรือปั่นจักรยานอย่างเพลิดเพลิน ได้ออกกำลังกายและไม่ปล่อยควันพิษ 🚲 🚶 🌿",
          "en": "Walking or cycling merrily, getting healthy exercise with ZERO tailpipe emissions",
          "zh": "迈开轻快双腿步行散步，或脚踏环保自行车出行，健身环保零尾气 🚲 🚶 🌿"
        },
        "icon": "🚲"
      }
    ],
    "correctOptionId": "opt-k2-cit-m8-3",
    "explanation": {
      "th": "การเดินหรือปั่นจักรยานในระยะใกล้ช่วยลดก๊าซคาร์บอนไดออกไซด์ และทำให้สุขภาพแข็งแรง เก่งมากครับ!",
      "en": "Awesome! Active human transport cuts fossil emissions and clears our city air.",
      "zh": "太棒了！三公里以内优选步行或骑行，低碳环保无尾气，强健体魄益处多。"
    }
  },
  {
    "id": "k2-cit-m9",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "การเดินทางที่เป็นมิตรต่อสิ่งแวดล้อม (Green Transport) อนุบาล 2 ชุดที่ 9: เมื่อต้องเดินทางไปสถานที่ใกล้ๆ ในละแวกบ้าน 🚲 🚶 วิธีการเดินทางที่ช่วยลดมลพิษทางอากาศคือข้อใด?",
      "en": "K2 Green Mobility #9: Traveling to nearby neighborhood spots 🚲 🚶: What eco-friendly transport slashes air pollution?",
      "zh": "幼儿园中班低碳绿色出行第 9 题：去家门口附近几百米的社区生鲜小超市买文具 🚲 🚶 时，最环保减碳、杜绝尾气污染的出行方式是？"
    },
    "illustration": "🚲 🚶 🌿",
    "illustrationSubtitle": {
      "th": "การเดินทางสีเขียว: เดินหรือปั่นจักรยานลดมลพิษ",
      "en": "Green travel: Walk or bicycle to cut emissions",
      "zh": "绿色低碳出行：步行或骑自行车减少尾气排放"
    },
    "options": [
      {
        "id": "opt-k2-cit-m9-1",
        "label": {
          "th": "เดินเท้าหรือปั่นจักรยานอย่างเพลิดเพลิน ได้ออกกำลังกายและไม่ปล่อยควันพิษ 🚲 🚶 🌿",
          "en": "Walking or cycling merrily, getting healthy exercise with ZERO tailpipe emissions",
          "zh": "迈开轻快双腿步行散步，或脚踏环保自行车出行，健身环保零尾气 🚲 🚶 🌿"
        },
        "icon": "🚲"
      },
      {
        "id": "opt-k2-cit-m9-2",
        "label": {
          "th": "ให้ผู้ปกครองขับรถบรรทุกขนาดใหญ่ติดเครื่องเปิดแอร์รอ 3 ชั่วโมง",
          "en": "Idle a giant diesel truck running engine 3 hours",
          "zh": "非让爸爸开着十个轮子的重型柴油卡车怠速轰鸣排浓烟等候三小时"
        },
        "icon": "🚚"
      },
      {
        "id": "opt-k2-cit-m9-3",
        "label": {
          "th": "นั่งเฮลิคอปเตอร์ส่วนตัวบินไป",
          "en": "Fly a roaring jet helicopter",
          "zh": "开着震耳欲聋私人喷气式直升飞机在邻里低空盘旋降落"
        },
        "icon": "🚁"
      }
    ],
    "correctOptionId": "opt-k2-cit-m9-1",
    "explanation": {
      "th": "การเดินหรือปั่นจักรยานในระยะใกล้ช่วยลดก๊าซคาร์บอนไดออกไซด์ และทำให้สุขภาพแข็งแรง เก่งมากครับ!",
      "en": "Awesome! Active human transport cuts fossil emissions and clears our city air.",
      "zh": "太棒了！三公里以内优选步行或骑行，低碳环保无尾气，强健体魄益处多。"
    }
  },
  {
    "id": "k2-cit-m10",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "การเดินทางที่เป็นมิตรต่อสิ่งแวดล้อม (Green Transport) อนุบาล 2 ชุดที่ 10: เมื่อต้องเดินทางไปสถานที่ใกล้ๆ ในละแวกบ้าน 🚲 🚶 วิธีการเดินทางที่ช่วยลดมลพิษทางอากาศคือข้อใด?",
      "en": "K2 Green Mobility #10: Traveling to nearby neighborhood spots 🚲 🚶: What eco-friendly transport slashes air pollution?",
      "zh": "幼儿园中班低碳绿色出行第 10 题：去家门口附近几百米的社区生鲜小超市买文具 🚲 🚶 时，最环保减碳、杜绝尾气污染的出行方式是？"
    },
    "illustration": "🚲 🚶 🌿",
    "illustrationSubtitle": {
      "th": "การเดินทางสีเขียว: เดินหรือปั่นจักรยานลดมลพิษ",
      "en": "Green travel: Walk or bicycle to cut emissions",
      "zh": "绿色低碳出行：步行或骑自行车减少尾气排放"
    },
    "options": [
      {
        "id": "opt-k2-cit-m10-1",
        "label": {
          "th": "ให้ผู้ปกครองขับรถบรรทุกขนาดใหญ่ติดเครื่องเปิดแอร์รอ 3 ชั่วโมง",
          "en": "Idle a giant diesel truck running engine 3 hours",
          "zh": "非让爸爸开着十个轮子的重型柴油卡车怠速轰鸣排浓烟等候三小时"
        },
        "icon": "🚚"
      },
      {
        "id": "opt-k2-cit-m10-2",
        "label": {
          "th": "เดินเท้าหรือปั่นจักรยานอย่างเพลิดเพลิน ได้ออกกำลังกายและไม่ปล่อยควันพิษ 🚲 🚶 🌿",
          "en": "Walking or cycling merrily, getting healthy exercise with ZERO tailpipe emissions",
          "zh": "迈开轻快双腿步行散步，或脚踏环保自行车出行，健身环保零尾气 🚲 🚶 🌿"
        },
        "icon": "🚲"
      },
      {
        "id": "opt-k2-cit-m10-3",
        "label": {
          "th": "นั่งเฮลิคอปเตอร์ส่วนตัวบินไป",
          "en": "Fly a roaring jet helicopter",
          "zh": "开着震耳欲聋私人喷气式直升飞机在邻里低空盘旋降落"
        },
        "icon": "🚁"
      }
    ],
    "correctOptionId": "opt-k2-cit-m10-2",
    "explanation": {
      "th": "การเดินหรือปั่นจักรยานในระยะใกล้ช่วยลดก๊าซคาร์บอนไดออกไซด์ และทำให้สุขภาพแข็งแรง เก่งมากครับ!",
      "en": "Awesome! Active human transport cuts fossil emissions and clears our city air.",
      "zh": "太棒了！三公里以内优选步行或骑行，低碳环保无尾气，强健体魄益处多。"
    }
  },
  {
    "id": "k2-cit-h1",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "ขยะอันตรายและสารพิษระดับชั้นอนุบาล 2 ชุดที่ 1: \"ถ่านไฟฉายเก่า หลอดไฟนีออนแตก และกระป๋องยาฆ่าแมลง\" 🔋 💡 ☠️ ต้องทิ้งลงในถังขยะสีใดเพื่อความปลอดภัยสูงสุด?",
      "en": "K2 Hazardous Materials #1: Expired batteries, broken mercury bulbs, and pesticide cans 🔋 💡 ☠️ MUST go into which color bin?",
      "zh": "幼儿园中班危废安全防范第 1 题：用完废弃的干电池纽扣电池、碎荧光灯管及杀虫剂喷雾铁罐 🔋 💡 ☠️，严禁混投，必须严谨投放在？"
    },
    "illustration": "🔋 💡 🔴",
    "illustrationSubtitle": {
      "th": "ถังขยะอันตราย: สีแดง",
      "en": "Hazardous waste bin: Red",
      "zh": "特种垃圾分类：红色有害垃圾桶"
    },
    "options": [
      {
        "id": "opt-k2-cit-h1-1",
        "label": {
          "th": "โยนใส่กระถางต้นไม้เพื่อทำปุ๋ย",
          "en": "Bury in potted soil for plant food",
          "zh": "直接敲碎埋进家里阳台娇嫩的杜鹃花盆栽里当肥料"
        },
        "icon": "🪴"
      },
      {
        "id": "opt-k2-cit-h1-2",
        "label": {
          "th": "ถังขยะสีฟ้าทั่วไป",
          "en": "BLUE general waste bin",
          "zh": "蓝色普通无毒日用一般垃圾桶"
        },
        "icon": "🟦"
      },
      {
        "id": "opt-k2-cit-h1-3",
        "label": {
          "th": "ถังขยะสีแดง (ขยะอันตราย / สารพิษที่มีสารเคมีรั่วไหล) 🔴 ☠️",
          "en": "RED BIN (Hazardous / Toxic household waste)",
          "zh": "红色垃圾桶（有害垃圾：含重金属电池、荧光灯管及化学毒害物）🔴 ☠️"
        },
        "icon": "🔴"
      }
    ],
    "correctOptionId": "opt-k2-cit-h1-3",
    "explanation": {
      "th": "ขยะอันตรายมีสารตะกั่วและปรอท ต้องคัดแยกใส่ถังสีแดงเพื่อนำไปกำจัดอย่างถูกวิธี ไม่ให้ปนเปื้อนแหล่งน้ำ เก่งมากครับ!",
      "en": "Spot on! Toxic heavy metals require specialized isolation in RED bins to prevent soil/water toxicity.",
      "zh": "答对了！红色是有害垃圾的专属警示色，规范收运妥善无害化处理重金属危废。"
    }
  },
  {
    "id": "k2-cit-h2",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "ขยะอันตรายและสารพิษระดับชั้นอนุบาล 2 ชุดที่ 2: \"ถ่านไฟฉายเก่า หลอดไฟนีออนแตก และกระป๋องยาฆ่าแมลง\" 🔋 💡 ☠️ ต้องทิ้งลงในถังขยะสีใดเพื่อความปลอดภัยสูงสุด?",
      "en": "K2 Hazardous Materials #2: Expired batteries, broken mercury bulbs, and pesticide cans 🔋 💡 ☠️ MUST go into which color bin?",
      "zh": "幼儿园中班危废安全防范第 2 题：用完废弃的干电池纽扣电池、碎荧光灯管及杀虫剂喷雾铁罐 🔋 💡 ☠️，严禁混投，必须严谨投放在？"
    },
    "illustration": "🔋 💡 🔴",
    "illustrationSubtitle": {
      "th": "ถังขยะอันตราย: สีแดง",
      "en": "Hazardous waste bin: Red",
      "zh": "特种垃圾分类：红色有害垃圾桶"
    },
    "options": [
      {
        "id": "opt-k2-cit-h2-1",
        "label": {
          "th": "ถังขยะสีแดง (ขยะอันตราย / สารพิษที่มีสารเคมีรั่วไหล) 🔴 ☠️",
          "en": "RED BIN (Hazardous / Toxic household waste)",
          "zh": "红色垃圾桶（有害垃圾：含重金属电池、荧光灯管及化学毒害物）🔴 ☠️"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k2-cit-h2-2",
        "label": {
          "th": "ถังขยะสีฟ้าทั่วไป",
          "en": "BLUE general waste bin",
          "zh": "蓝色普通无毒日用一般垃圾桶"
        },
        "icon": "🟦"
      },
      {
        "id": "opt-k2-cit-h2-3",
        "label": {
          "th": "โยนใส่กระถางต้นไม้เพื่อทำปุ๋ย",
          "en": "Bury in potted soil for plant food",
          "zh": "直接敲碎埋进家里阳台娇嫩的杜鹃花盆栽里当肥料"
        },
        "icon": "🪴"
      }
    ],
    "correctOptionId": "opt-k2-cit-h2-1",
    "explanation": {
      "th": "ขยะอันตรายมีสารตะกั่วและปรอท ต้องคัดแยกใส่ถังสีแดงเพื่อนำไปกำจัดอย่างถูกวิธี ไม่ให้ปนเปื้อนแหล่งน้ำ เก่งมากครับ!",
      "en": "Spot on! Toxic heavy metals require specialized isolation in RED bins to prevent soil/water toxicity.",
      "zh": "答对了！红色是有害垃圾的专属警示色，规范收运妥善无害化处理重金属危废。"
    }
  },
  {
    "id": "k2-cit-h3",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "ขยะอันตรายและสารพิษระดับชั้นอนุบาล 2 ชุดที่ 3: \"ถ่านไฟฉายเก่า หลอดไฟนีออนแตก และกระป๋องยาฆ่าแมลง\" 🔋 💡 ☠️ ต้องทิ้งลงในถังขยะสีใดเพื่อความปลอดภัยสูงสุด?",
      "en": "K2 Hazardous Materials #3: Expired batteries, broken mercury bulbs, and pesticide cans 🔋 💡 ☠️ MUST go into which color bin?",
      "zh": "幼儿园中班危废安全防范第 3 题：用完废弃的干电池纽扣电池、碎荧光灯管及杀虫剂喷雾铁罐 🔋 💡 ☠️，严禁混投，必须严谨投放在？"
    },
    "illustration": "🔋 💡 🔴",
    "illustrationSubtitle": {
      "th": "ถังขยะอันตราย: สีแดง",
      "en": "Hazardous waste bin: Red",
      "zh": "特种垃圾分类：红色有害垃圾桶"
    },
    "options": [
      {
        "id": "opt-k2-cit-h3-1",
        "label": {
          "th": "ถังขยะสีฟ้าทั่วไป",
          "en": "BLUE general waste bin",
          "zh": "蓝色普通无毒日用一般垃圾桶"
        },
        "icon": "🟦"
      },
      {
        "id": "opt-k2-cit-h3-2",
        "label": {
          "th": "ถังขยะสีแดง (ขยะอันตราย / สารพิษที่มีสารเคมีรั่วไหล) 🔴 ☠️",
          "en": "RED BIN (Hazardous / Toxic household waste)",
          "zh": "红色垃圾桶（有害垃圾：含重金属电池、荧光灯管及化学毒害物）🔴 ☠️"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k2-cit-h3-3",
        "label": {
          "th": "โยนใส่กระถางต้นไม้เพื่อทำปุ๋ย",
          "en": "Bury in potted soil for plant food",
          "zh": "直接敲碎埋进家里阳台娇嫩的杜鹃花盆栽里当肥料"
        },
        "icon": "🪴"
      }
    ],
    "correctOptionId": "opt-k2-cit-h3-2",
    "explanation": {
      "th": "ขยะอันตรายมีสารตะกั่วและปรอท ต้องคัดแยกใส่ถังสีแดงเพื่อนำไปกำจัดอย่างถูกวิธี ไม่ให้ปนเปื้อนแหล่งน้ำ เก่งมากครับ!",
      "en": "Spot on! Toxic heavy metals require specialized isolation in RED bins to prevent soil/water toxicity.",
      "zh": "答对了！红色是有害垃圾的专属警示色，规范收运妥善无害化处理重金属危废。"
    }
  },
  {
    "id": "k2-cit-h4",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "ขยะอันตรายและสารพิษระดับชั้นอนุบาล 2 ชุดที่ 4: \"ถ่านไฟฉายเก่า หลอดไฟนีออนแตก และกระป๋องยาฆ่าแมลง\" 🔋 💡 ☠️ ต้องทิ้งลงในถังขยะสีใดเพื่อความปลอดภัยสูงสุด?",
      "en": "K2 Hazardous Materials #4: Expired batteries, broken mercury bulbs, and pesticide cans 🔋 💡 ☠️ MUST go into which color bin?",
      "zh": "幼儿园中班危废安全防范第 4 题：用完废弃的干电池纽扣电池、碎荧光灯管及杀虫剂喷雾铁罐 🔋 💡 ☠️，严禁混投，必须严谨投放在？"
    },
    "illustration": "🔋 💡 🔴",
    "illustrationSubtitle": {
      "th": "ถังขยะอันตราย: สีแดง",
      "en": "Hazardous waste bin: Red",
      "zh": "特种垃圾分类：红色有害垃圾桶"
    },
    "options": [
      {
        "id": "opt-k2-cit-h4-1",
        "label": {
          "th": "โยนใส่กระถางต้นไม้เพื่อทำปุ๋ย",
          "en": "Bury in potted soil for plant food",
          "zh": "直接敲碎埋进家里阳台娇嫩的杜鹃花盆栽里当肥料"
        },
        "icon": "🪴"
      },
      {
        "id": "opt-k2-cit-h4-2",
        "label": {
          "th": "ถังขยะสีฟ้าทั่วไป",
          "en": "BLUE general waste bin",
          "zh": "蓝色普通无毒日用一般垃圾桶"
        },
        "icon": "🟦"
      },
      {
        "id": "opt-k2-cit-h4-3",
        "label": {
          "th": "ถังขยะสีแดง (ขยะอันตราย / สารพิษที่มีสารเคมีรั่วไหล) 🔴 ☠️",
          "en": "RED BIN (Hazardous / Toxic household waste)",
          "zh": "红色垃圾桶（有害垃圾：含重金属电池、荧光灯管及化学毒害物）🔴 ☠️"
        },
        "icon": "🔴"
      }
    ],
    "correctOptionId": "opt-k2-cit-h4-3",
    "explanation": {
      "th": "ขยะอันตรายมีสารตะกั่วและปรอท ต้องคัดแยกใส่ถังสีแดงเพื่อนำไปกำจัดอย่างถูกวิธี ไม่ให้ปนเปื้อนแหล่งน้ำ เก่งมากครับ!",
      "en": "Spot on! Toxic heavy metals require specialized isolation in RED bins to prevent soil/water toxicity.",
      "zh": "答对了！红色是有害垃圾的专属警示色，规范收运妥善无害化处理重金属危废。"
    }
  },
  {
    "id": "k2-cit-h5",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "ขยะอันตรายและสารพิษระดับชั้นอนุบาล 2 ชุดที่ 5: \"ถ่านไฟฉายเก่า หลอดไฟนีออนแตก และกระป๋องยาฆ่าแมลง\" 🔋 💡 ☠️ ต้องทิ้งลงในถังขยะสีใดเพื่อความปลอดภัยสูงสุด?",
      "en": "K2 Hazardous Materials #5: Expired batteries, broken mercury bulbs, and pesticide cans 🔋 💡 ☠️ MUST go into which color bin?",
      "zh": "幼儿园中班危废安全防范第 5 题：用完废弃的干电池纽扣电池、碎荧光灯管及杀虫剂喷雾铁罐 🔋 💡 ☠️，严禁混投，必须严谨投放在？"
    },
    "illustration": "🔋 💡 🔴",
    "illustrationSubtitle": {
      "th": "ถังขยะอันตราย: สีแดง",
      "en": "Hazardous waste bin: Red",
      "zh": "特种垃圾分类：红色有害垃圾桶"
    },
    "options": [
      {
        "id": "opt-k2-cit-h5-1",
        "label": {
          "th": "ถังขยะสีแดง (ขยะอันตราย / สารพิษที่มีสารเคมีรั่วไหล) 🔴 ☠️",
          "en": "RED BIN (Hazardous / Toxic household waste)",
          "zh": "红色垃圾桶（有害垃圾：含重金属电池、荧光灯管及化学毒害物）🔴 ☠️"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k2-cit-h5-2",
        "label": {
          "th": "ถังขยะสีฟ้าทั่วไป",
          "en": "BLUE general waste bin",
          "zh": "蓝色普通无毒日用一般垃圾桶"
        },
        "icon": "🟦"
      },
      {
        "id": "opt-k2-cit-h5-3",
        "label": {
          "th": "โยนใส่กระถางต้นไม้เพื่อทำปุ๋ย",
          "en": "Bury in potted soil for plant food",
          "zh": "直接敲碎埋进家里阳台娇嫩的杜鹃花盆栽里当肥料"
        },
        "icon": "🪴"
      }
    ],
    "correctOptionId": "opt-k2-cit-h5-1",
    "explanation": {
      "th": "ขยะอันตรายมีสารตะกั่วและปรอท ต้องคัดแยกใส่ถังสีแดงเพื่อนำไปกำจัดอย่างถูกวิธี ไม่ให้ปนเปื้อนแหล่งน้ำ เก่งมากครับ!",
      "en": "Spot on! Toxic heavy metals require specialized isolation in RED bins to prevent soil/water toxicity.",
      "zh": "答对了！红色是有害垃圾的专属警示色，规范收运妥善无害化处理重金属危废。"
    }
  },
  {
    "id": "k2-cit-h6",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "ขยะอันตรายและสารพิษระดับชั้นอนุบาล 2 ชุดที่ 6: \"ถ่านไฟฉายเก่า หลอดไฟนีออนแตก และกระป๋องยาฆ่าแมลง\" 🔋 💡 ☠️ ต้องทิ้งลงในถังขยะสีใดเพื่อความปลอดภัยสูงสุด?",
      "en": "K2 Hazardous Materials #6: Expired batteries, broken mercury bulbs, and pesticide cans 🔋 💡 ☠️ MUST go into which color bin?",
      "zh": "幼儿园中班危废安全防范第 6 题：用完废弃的干电池纽扣电池、碎荧光灯管及杀虫剂喷雾铁罐 🔋 💡 ☠️，严禁混投，必须严谨投放在？"
    },
    "illustration": "🔋 💡 🔴",
    "illustrationSubtitle": {
      "th": "ถังขยะอันตราย: สีแดง",
      "en": "Hazardous waste bin: Red",
      "zh": "特种垃圾分类：红色有害垃圾桶"
    },
    "options": [
      {
        "id": "opt-k2-cit-h6-1",
        "label": {
          "th": "ถังขยะสีฟ้าทั่วไป",
          "en": "BLUE general waste bin",
          "zh": "蓝色普通无毒日用一般垃圾桶"
        },
        "icon": "🟦"
      },
      {
        "id": "opt-k2-cit-h6-2",
        "label": {
          "th": "ถังขยะสีแดง (ขยะอันตราย / สารพิษที่มีสารเคมีรั่วไหล) 🔴 ☠️",
          "en": "RED BIN (Hazardous / Toxic household waste)",
          "zh": "红色垃圾桶（有害垃圾：含重金属电池、荧光灯管及化学毒害物）🔴 ☠️"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k2-cit-h6-3",
        "label": {
          "th": "โยนใส่กระถางต้นไม้เพื่อทำปุ๋ย",
          "en": "Bury in potted soil for plant food",
          "zh": "直接敲碎埋进家里阳台娇嫩的杜鹃花盆栽里当肥料"
        },
        "icon": "🪴"
      }
    ],
    "correctOptionId": "opt-k2-cit-h6-2",
    "explanation": {
      "th": "ขยะอันตรายมีสารตะกั่วและปรอท ต้องคัดแยกใส่ถังสีแดงเพื่อนำไปกำจัดอย่างถูกวิธี ไม่ให้ปนเปื้อนแหล่งน้ำ เก่งมากครับ!",
      "en": "Spot on! Toxic heavy metals require specialized isolation in RED bins to prevent soil/water toxicity.",
      "zh": "答对了！红色是有害垃圾的专属警示色，规范收运妥善无害化处理重金属危废。"
    }
  },
  {
    "id": "k2-cit-h7",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "ขยะอันตรายและสารพิษระดับชั้นอนุบาล 2 ชุดที่ 7: \"ถ่านไฟฉายเก่า หลอดไฟนีออนแตก และกระป๋องยาฆ่าแมลง\" 🔋 💡 ☠️ ต้องทิ้งลงในถังขยะสีใดเพื่อความปลอดภัยสูงสุด?",
      "en": "K2 Hazardous Materials #7: Expired batteries, broken mercury bulbs, and pesticide cans 🔋 💡 ☠️ MUST go into which color bin?",
      "zh": "幼儿园中班危废安全防范第 7 题：用完废弃的干电池纽扣电池、碎荧光灯管及杀虫剂喷雾铁罐 🔋 💡 ☠️，严禁混投，必须严谨投放在？"
    },
    "illustration": "🔋 💡 🔴",
    "illustrationSubtitle": {
      "th": "ถังขยะอันตราย: สีแดง",
      "en": "Hazardous waste bin: Red",
      "zh": "特种垃圾分类：红色有害垃圾桶"
    },
    "options": [
      {
        "id": "opt-k2-cit-h7-1",
        "label": {
          "th": "โยนใส่กระถางต้นไม้เพื่อทำปุ๋ย",
          "en": "Bury in potted soil for plant food",
          "zh": "直接敲碎埋进家里阳台娇嫩的杜鹃花盆栽里当肥料"
        },
        "icon": "🪴"
      },
      {
        "id": "opt-k2-cit-h7-2",
        "label": {
          "th": "ถังขยะสีฟ้าทั่วไป",
          "en": "BLUE general waste bin",
          "zh": "蓝色普通无毒日用一般垃圾桶"
        },
        "icon": "🟦"
      },
      {
        "id": "opt-k2-cit-h7-3",
        "label": {
          "th": "ถังขยะสีแดง (ขยะอันตราย / สารพิษที่มีสารเคมีรั่วไหล) 🔴 ☠️",
          "en": "RED BIN (Hazardous / Toxic household waste)",
          "zh": "红色垃圾桶（有害垃圾：含重金属电池、荧光灯管及化学毒害物）🔴 ☠️"
        },
        "icon": "🔴"
      }
    ],
    "correctOptionId": "opt-k2-cit-h7-3",
    "explanation": {
      "th": "ขยะอันตรายมีสารตะกั่วและปรอท ต้องคัดแยกใส่ถังสีแดงเพื่อนำไปกำจัดอย่างถูกวิธี ไม่ให้ปนเปื้อนแหล่งน้ำ เก่งมากครับ!",
      "en": "Spot on! Toxic heavy metals require specialized isolation in RED bins to prevent soil/water toxicity.",
      "zh": "答对了！红色是有害垃圾的专属警示色，规范收运妥善无害化处理重金属危废。"
    }
  },
  {
    "id": "k2-cit-h8",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "ขยะอันตรายและสารพิษระดับชั้นอนุบาล 2 ชุดที่ 8: \"ถ่านไฟฉายเก่า หลอดไฟนีออนแตก และกระป๋องยาฆ่าแมลง\" 🔋 💡 ☠️ ต้องทิ้งลงในถังขยะสีใดเพื่อความปลอดภัยสูงสุด?",
      "en": "K2 Hazardous Materials #8: Expired batteries, broken mercury bulbs, and pesticide cans 🔋 💡 ☠️ MUST go into which color bin?",
      "zh": "幼儿园中班危废安全防范第 8 题：用完废弃的干电池纽扣电池、碎荧光灯管及杀虫剂喷雾铁罐 🔋 💡 ☠️，严禁混投，必须严谨投放在？"
    },
    "illustration": "🔋 💡 🔴",
    "illustrationSubtitle": {
      "th": "ถังขยะอันตราย: สีแดง",
      "en": "Hazardous waste bin: Red",
      "zh": "特种垃圾分类：红色有害垃圾桶"
    },
    "options": [
      {
        "id": "opt-k2-cit-h8-1",
        "label": {
          "th": "ถังขยะสีแดง (ขยะอันตราย / สารพิษที่มีสารเคมีรั่วไหล) 🔴 ☠️",
          "en": "RED BIN (Hazardous / Toxic household waste)",
          "zh": "红色垃圾桶（有害垃圾：含重金属电池、荧光灯管及化学毒害物）🔴 ☠️"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k2-cit-h8-2",
        "label": {
          "th": "ถังขยะสีฟ้าทั่วไป",
          "en": "BLUE general waste bin",
          "zh": "蓝色普通无毒日用一般垃圾桶"
        },
        "icon": "🟦"
      },
      {
        "id": "opt-k2-cit-h8-3",
        "label": {
          "th": "โยนใส่กระถางต้นไม้เพื่อทำปุ๋ย",
          "en": "Bury in potted soil for plant food",
          "zh": "直接敲碎埋进家里阳台娇嫩的杜鹃花盆栽里当肥料"
        },
        "icon": "🪴"
      }
    ],
    "correctOptionId": "opt-k2-cit-h8-1",
    "explanation": {
      "th": "ขยะอันตรายมีสารตะกั่วและปรอท ต้องคัดแยกใส่ถังสีแดงเพื่อนำไปกำจัดอย่างถูกวิธี ไม่ให้ปนเปื้อนแหล่งน้ำ เก่งมากครับ!",
      "en": "Spot on! Toxic heavy metals require specialized isolation in RED bins to prevent soil/water toxicity.",
      "zh": "答对了！红色是有害垃圾的专属警示色，规范收运妥善无害化处理重金属危废。"
    }
  },
  {
    "id": "k2-cit-h9",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "ขยะอันตรายและสารพิษระดับชั้นอนุบาล 2 ชุดที่ 9: \"ถ่านไฟฉายเก่า หลอดไฟนีออนแตก และกระป๋องยาฆ่าแมลง\" 🔋 💡 ☠️ ต้องทิ้งลงในถังขยะสีใดเพื่อความปลอดภัยสูงสุด?",
      "en": "K2 Hazardous Materials #9: Expired batteries, broken mercury bulbs, and pesticide cans 🔋 💡 ☠️ MUST go into which color bin?",
      "zh": "幼儿园中班危废安全防范第 9 题：用完废弃的干电池纽扣电池、碎荧光灯管及杀虫剂喷雾铁罐 🔋 💡 ☠️，严禁混投，必须严谨投放在？"
    },
    "illustration": "🔋 💡 🔴",
    "illustrationSubtitle": {
      "th": "ถังขยะอันตราย: สีแดง",
      "en": "Hazardous waste bin: Red",
      "zh": "特种垃圾分类：红色有害垃圾桶"
    },
    "options": [
      {
        "id": "opt-k2-cit-h9-1",
        "label": {
          "th": "ถังขยะสีฟ้าทั่วไป",
          "en": "BLUE general waste bin",
          "zh": "蓝色普通无毒日用一般垃圾桶"
        },
        "icon": "🟦"
      },
      {
        "id": "opt-k2-cit-h9-2",
        "label": {
          "th": "ถังขยะสีแดง (ขยะอันตราย / สารพิษที่มีสารเคมีรั่วไหล) 🔴 ☠️",
          "en": "RED BIN (Hazardous / Toxic household waste)",
          "zh": "红色垃圾桶（有害垃圾：含重金属电池、荧光灯管及化学毒害物）🔴 ☠️"
        },
        "icon": "🔴"
      },
      {
        "id": "opt-k2-cit-h9-3",
        "label": {
          "th": "โยนใส่กระถางต้นไม้เพื่อทำปุ๋ย",
          "en": "Bury in potted soil for plant food",
          "zh": "直接敲碎埋进家里阳台娇嫩的杜鹃花盆栽里当肥料"
        },
        "icon": "🪴"
      }
    ],
    "correctOptionId": "opt-k2-cit-h9-2",
    "explanation": {
      "th": "ขยะอันตรายมีสารตะกั่วและปรอท ต้องคัดแยกใส่ถังสีแดงเพื่อนำไปกำจัดอย่างถูกวิธี ไม่ให้ปนเปื้อนแหล่งน้ำ เก่งมากครับ!",
      "en": "Spot on! Toxic heavy metals require specialized isolation in RED bins to prevent soil/water toxicity.",
      "zh": "答对了！红色是有害垃圾的专属警示色，规范收运妥善无害化处理重金属危废。"
    }
  },
  {
    "id": "k2-cit-h10",
    "grade": "K2",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "ขยะอันตรายและสารพิษระดับชั้นอนุบาล 2 ชุดที่ 10: \"ถ่านไฟฉายเก่า หลอดไฟนีออนแตก และกระป๋องยาฆ่าแมลง\" 🔋 💡 ☠️ ต้องทิ้งลงในถังขยะสีใดเพื่อความปลอดภัยสูงสุด?",
      "en": "K2 Hazardous Materials #10: Expired batteries, broken mercury bulbs, and pesticide cans 🔋 💡 ☠️ MUST go into which color bin?",
      "zh": "幼儿园中班危废安全防范第 10 题：用完废弃的干电池纽扣电池、碎荧光灯管及杀虫剂喷雾铁罐 🔋 💡 ☠️，严禁混投，必须严谨投放在？"
    },
    "illustration": "🔋 💡 🔴",
    "illustrationSubtitle": {
      "th": "ถังขยะอันตราย: สีแดง",
      "en": "Hazardous waste bin: Red",
      "zh": "特种垃圾分类：红色有害垃圾桶"
    },
    "options": [
      {
        "id": "opt-k2-cit-h10-1",
        "label": {
          "th": "โยนใส่กระถางต้นไม้เพื่อทำปุ๋ย",
          "en": "Bury in potted soil for plant food",
          "zh": "直接敲碎埋进家里阳台娇嫩的杜鹃花盆栽里当肥料"
        },
        "icon": "🪴"
      },
      {
        "id": "opt-k2-cit-h10-2",
        "label": {
          "th": "ถังขยะสีฟ้าทั่วไป",
          "en": "BLUE general waste bin",
          "zh": "蓝色普通无毒日用一般垃圾桶"
        },
        "icon": "🟦"
      },
      {
        "id": "opt-k2-cit-h10-3",
        "label": {
          "th": "ถังขยะสีแดง (ขยะอันตราย / สารพิษที่มีสารเคมีรั่วไหล) 🔴 ☠️",
          "en": "RED BIN (Hazardous / Toxic household waste)",
          "zh": "红色垃圾桶（有害垃圾：含重金属电池、荧光灯管及化学毒害物）🔴 ☠️"
        },
        "icon": "🔴"
      }
    ],
    "correctOptionId": "opt-k2-cit-h10-3",
    "explanation": {
      "th": "ขยะอันตรายมีสารตะกั่วและปรอท ต้องคัดแยกใส่ถังสีแดงเพื่อนำไปกำจัดอย่างถูกวิธี ไม่ให้ปนเปื้อนแหล่งน้ำ เก่งมากครับ!",
      "en": "Spot on! Toxic heavy metals require specialized isolation in RED bins to prevent soil/water toxicity.",
      "zh": "答对了！红色是有害垃圾的专属警示色，规范收运妥善无害化处理重金属危废。"
    }
  },
  {
    "id": "k3-cit-e1",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "หลักการ 3R รักษ์โลก ระดับชั้นอนุบาล 3 ชุดที่ 1: การนำ \"กระดาษที่พิมพ์หน้าเดียวมาใช้เขียนหรือวาดรูปในหน้าที่สองที่ยังว่าง\" ตรงกับหลักการข้อใด? 📄 ♻️",
      "en": "K3 3R Environmental Ethics #1: Using the BLANK BACKSIDE of single-printed paper for scratch notes 📄 ♻️ aligns with which 3R principle?",
      "zh": "幼儿园大班环保3R原则第 1 题：把学校打印过单面的废通知单翻过来，在干干净净的背面草稿纸上练字涂鸦 📄 ♻️，这践行了哪项环保准则？"
    },
    "illustration": "📄 ♻️ ✍️",
    "illustrationSubtitle": {
      "th": "หลักการ 3R: Reuse (การนำกลับมาใช้ซ้ำ)",
      "en": "3Rs: REUSE (using paper double-sided)",
      "zh": "绿色环保3R法则：Reuse（再利用/重复使用）"
    },
    "options": [
      {
        "id": "opt-k3-cit-e1-1",
        "label": {
          "th": "Reuse (การนำกลับมาใช้ซ้ำให้เกิดประโยชน์คุ้มค่าที่สุด) 📄 ♻️",
          "en": "REUSE: utilizing materials multiple times to maximize value",
          "zh": "Reuse（再利用/重复利用：让尚有价值的纸张充分发挥双面效能）📄 ♻️"
        },
        "icon": "📄"
      },
      {
        "id": "opt-k3-cit-e1-2",
        "label": {
          "th": "การทิ้งลงแม่น้ำทันที",
          "en": "Dumping into rivers instantly",
          "zh": "二话不说一把火直接烧光扬灰"
        },
        "icon": "🔥"
      },
      {
        "id": "opt-k3-cit-e1-3",
        "label": {
          "th": "การนำไปแช่น้ำยาพิษ",
          "en": "Soaking in toxic poisons",
          "zh": "浸泡在剧毒化学试剂里腐蚀"
        },
        "icon": "☠️"
      }
    ],
    "correctOptionId": "opt-k3-cit-e1-1",
    "explanation": {
      "th": "การใช้กระดาษทั้งสองหน้าช่วยลดการตัดต้นไม้และประหยัดทรัพยากรโลก เก่งมากครับ!",
      "en": "Correct! Double-sided paper usage is a textbook hallmark of responsible REUSE.",
      "zh": "答对了！两面用纸、物尽其用，减少木材砍伐，是践行再利用（Reuse）的生动写照。"
    }
  },
  {
    "id": "k3-cit-e2",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "หลักการ 3R รักษ์โลก ระดับชั้นอนุบาล 3 ชุดที่ 2: การนำ \"กระดาษที่พิมพ์หน้าเดียวมาใช้เขียนหรือวาดรูปในหน้าที่สองที่ยังว่าง\" ตรงกับหลักการข้อใด? 📄 ♻️",
      "en": "K3 3R Environmental Ethics #2: Using the BLANK BACKSIDE of single-printed paper for scratch notes 📄 ♻️ aligns with which 3R principle?",
      "zh": "幼儿园大班环保3R原则第 2 题：把学校打印过单面的废通知单翻过来，在干干净净的背面草稿纸上练字涂鸦 📄 ♻️，这践行了哪项环保准则？"
    },
    "illustration": "📄 ♻️ ✍️",
    "illustrationSubtitle": {
      "th": "หลักการ 3R: Reuse (การนำกลับมาใช้ซ้ำ)",
      "en": "3Rs: REUSE (using paper double-sided)",
      "zh": "绿色环保3R法则：Reuse（再利用/重复使用）"
    },
    "options": [
      {
        "id": "opt-k3-cit-e2-1",
        "label": {
          "th": "การทิ้งลงแม่น้ำทันที",
          "en": "Dumping into rivers instantly",
          "zh": "二话不说一把火直接烧光扬灰"
        },
        "icon": "🔥"
      },
      {
        "id": "opt-k3-cit-e2-2",
        "label": {
          "th": "Reuse (การนำกลับมาใช้ซ้ำให้เกิดประโยชน์คุ้มค่าที่สุด) 📄 ♻️",
          "en": "REUSE: utilizing materials multiple times to maximize value",
          "zh": "Reuse（再利用/重复利用：让尚有价值的纸张充分发挥双面效能）📄 ♻️"
        },
        "icon": "📄"
      },
      {
        "id": "opt-k3-cit-e2-3",
        "label": {
          "th": "การนำไปแช่น้ำยาพิษ",
          "en": "Soaking in toxic poisons",
          "zh": "浸泡在剧毒化学试剂里腐蚀"
        },
        "icon": "☠️"
      }
    ],
    "correctOptionId": "opt-k3-cit-e2-2",
    "explanation": {
      "th": "การใช้กระดาษทั้งสองหน้าช่วยลดการตัดต้นไม้และประหยัดทรัพยากรโลก เก่งมากครับ!",
      "en": "Correct! Double-sided paper usage is a textbook hallmark of responsible REUSE.",
      "zh": "答对了！两面用纸、物尽其用，减少木材砍伐，是践行再利用（Reuse）的生动写照。"
    }
  },
  {
    "id": "k3-cit-e3",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "หลักการ 3R รักษ์โลก ระดับชั้นอนุบาล 3 ชุดที่ 3: การนำ \"กระดาษที่พิมพ์หน้าเดียวมาใช้เขียนหรือวาดรูปในหน้าที่สองที่ยังว่าง\" ตรงกับหลักการข้อใด? 📄 ♻️",
      "en": "K3 3R Environmental Ethics #3: Using the BLANK BACKSIDE of single-printed paper for scratch notes 📄 ♻️ aligns with which 3R principle?",
      "zh": "幼儿园大班环保3R原则第 3 题：把学校打印过单面的废通知单翻过来，在干干净净的背面草稿纸上练字涂鸦 📄 ♻️，这践行了哪项环保准则？"
    },
    "illustration": "📄 ♻️ ✍️",
    "illustrationSubtitle": {
      "th": "หลักการ 3R: Reuse (การนำกลับมาใช้ซ้ำ)",
      "en": "3Rs: REUSE (using paper double-sided)",
      "zh": "绿色环保3R法则：Reuse（再利用/重复使用）"
    },
    "options": [
      {
        "id": "opt-k3-cit-e3-1",
        "label": {
          "th": "การนำไปแช่น้ำยาพิษ",
          "en": "Soaking in toxic poisons",
          "zh": "浸泡在剧毒化学试剂里腐蚀"
        },
        "icon": "☠️"
      },
      {
        "id": "opt-k3-cit-e3-2",
        "label": {
          "th": "การทิ้งลงแม่น้ำทันที",
          "en": "Dumping into rivers instantly",
          "zh": "二话不说一把火直接烧光扬灰"
        },
        "icon": "🔥"
      },
      {
        "id": "opt-k3-cit-e3-3",
        "label": {
          "th": "Reuse (การนำกลับมาใช้ซ้ำให้เกิดประโยชน์คุ้มค่าที่สุด) 📄 ♻️",
          "en": "REUSE: utilizing materials multiple times to maximize value",
          "zh": "Reuse（再利用/重复利用：让尚有价值的纸张充分发挥双面效能）📄 ♻️"
        },
        "icon": "📄"
      }
    ],
    "correctOptionId": "opt-k3-cit-e3-3",
    "explanation": {
      "th": "การใช้กระดาษทั้งสองหน้าช่วยลดการตัดต้นไม้และประหยัดทรัพยากรโลก เก่งมากครับ!",
      "en": "Correct! Double-sided paper usage is a textbook hallmark of responsible REUSE.",
      "zh": "答对了！两面用纸、物尽其用，减少木材砍伐，是践行再利用（Reuse）的生动写照。"
    }
  },
  {
    "id": "k3-cit-e4",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "หลักการ 3R รักษ์โลก ระดับชั้นอนุบาล 3 ชุดที่ 4: การนำ \"กระดาษที่พิมพ์หน้าเดียวมาใช้เขียนหรือวาดรูปในหน้าที่สองที่ยังว่าง\" ตรงกับหลักการข้อใด? 📄 ♻️",
      "en": "K3 3R Environmental Ethics #4: Using the BLANK BACKSIDE of single-printed paper for scratch notes 📄 ♻️ aligns with which 3R principle?",
      "zh": "幼儿园大班环保3R原则第 4 题：把学校打印过单面的废通知单翻过来，在干干净净的背面草稿纸上练字涂鸦 📄 ♻️，这践行了哪项环保准则？"
    },
    "illustration": "📄 ♻️ ✍️",
    "illustrationSubtitle": {
      "th": "หลักการ 3R: Reuse (การนำกลับมาใช้ซ้ำ)",
      "en": "3Rs: REUSE (using paper double-sided)",
      "zh": "绿色环保3R法则：Reuse（再利用/重复使用）"
    },
    "options": [
      {
        "id": "opt-k3-cit-e4-1",
        "label": {
          "th": "Reuse (การนำกลับมาใช้ซ้ำให้เกิดประโยชน์คุ้มค่าที่สุด) 📄 ♻️",
          "en": "REUSE: utilizing materials multiple times to maximize value",
          "zh": "Reuse（再利用/重复利用：让尚有价值的纸张充分发挥双面效能）📄 ♻️"
        },
        "icon": "📄"
      },
      {
        "id": "opt-k3-cit-e4-2",
        "label": {
          "th": "การทิ้งลงแม่น้ำทันที",
          "en": "Dumping into rivers instantly",
          "zh": "二话不说一把火直接烧光扬灰"
        },
        "icon": "🔥"
      },
      {
        "id": "opt-k3-cit-e4-3",
        "label": {
          "th": "การนำไปแช่น้ำยาพิษ",
          "en": "Soaking in toxic poisons",
          "zh": "浸泡在剧毒化学试剂里腐蚀"
        },
        "icon": "☠️"
      }
    ],
    "correctOptionId": "opt-k3-cit-e4-1",
    "explanation": {
      "th": "การใช้กระดาษทั้งสองหน้าช่วยลดการตัดต้นไม้และประหยัดทรัพยากรโลก เก่งมากครับ!",
      "en": "Correct! Double-sided paper usage is a textbook hallmark of responsible REUSE.",
      "zh": "答对了！两面用纸、物尽其用，减少木材砍伐，是践行再利用（Reuse）的生动写照。"
    }
  },
  {
    "id": "k3-cit-e5",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "หลักการ 3R รักษ์โลก ระดับชั้นอนุบาล 3 ชุดที่ 5: การนำ \"กระดาษที่พิมพ์หน้าเดียวมาใช้เขียนหรือวาดรูปในหน้าที่สองที่ยังว่าง\" ตรงกับหลักการข้อใด? 📄 ♻️",
      "en": "K3 3R Environmental Ethics #5: Using the BLANK BACKSIDE of single-printed paper for scratch notes 📄 ♻️ aligns with which 3R principle?",
      "zh": "幼儿园大班环保3R原则第 5 题：把学校打印过单面的废通知单翻过来，在干干净净的背面草稿纸上练字涂鸦 📄 ♻️，这践行了哪项环保准则？"
    },
    "illustration": "📄 ♻️ ✍️",
    "illustrationSubtitle": {
      "th": "หลักการ 3R: Reuse (การนำกลับมาใช้ซ้ำ)",
      "en": "3Rs: REUSE (using paper double-sided)",
      "zh": "绿色环保3R法则：Reuse（再利用/重复使用）"
    },
    "options": [
      {
        "id": "opt-k3-cit-e5-1",
        "label": {
          "th": "การทิ้งลงแม่น้ำทันที",
          "en": "Dumping into rivers instantly",
          "zh": "二话不说一把火直接烧光扬灰"
        },
        "icon": "🔥"
      },
      {
        "id": "opt-k3-cit-e5-2",
        "label": {
          "th": "Reuse (การนำกลับมาใช้ซ้ำให้เกิดประโยชน์คุ้มค่าที่สุด) 📄 ♻️",
          "en": "REUSE: utilizing materials multiple times to maximize value",
          "zh": "Reuse（再利用/重复利用：让尚有价值的纸张充分发挥双面效能）📄 ♻️"
        },
        "icon": "📄"
      },
      {
        "id": "opt-k3-cit-e5-3",
        "label": {
          "th": "การนำไปแช่น้ำยาพิษ",
          "en": "Soaking in toxic poisons",
          "zh": "浸泡在剧毒化学试剂里腐蚀"
        },
        "icon": "☠️"
      }
    ],
    "correctOptionId": "opt-k3-cit-e5-2",
    "explanation": {
      "th": "การใช้กระดาษทั้งสองหน้าช่วยลดการตัดต้นไม้และประหยัดทรัพยากรโลก เก่งมากครับ!",
      "en": "Correct! Double-sided paper usage is a textbook hallmark of responsible REUSE.",
      "zh": "答对了！两面用纸、物尽其用，减少木材砍伐，是践行再利用（Reuse）的生动写照。"
    }
  },
  {
    "id": "k3-cit-e6",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "หลักการ 3R รักษ์โลก ระดับชั้นอนุบาล 3 ชุดที่ 6: การนำ \"กระดาษที่พิมพ์หน้าเดียวมาใช้เขียนหรือวาดรูปในหน้าที่สองที่ยังว่าง\" ตรงกับหลักการข้อใด? 📄 ♻️",
      "en": "K3 3R Environmental Ethics #6: Using the BLANK BACKSIDE of single-printed paper for scratch notes 📄 ♻️ aligns with which 3R principle?",
      "zh": "幼儿园大班环保3R原则第 6 题：把学校打印过单面的废通知单翻过来，在干干净净的背面草稿纸上练字涂鸦 📄 ♻️，这践行了哪项环保准则？"
    },
    "illustration": "📄 ♻️ ✍️",
    "illustrationSubtitle": {
      "th": "หลักการ 3R: Reuse (การนำกลับมาใช้ซ้ำ)",
      "en": "3Rs: REUSE (using paper double-sided)",
      "zh": "绿色环保3R法则：Reuse（再利用/重复使用）"
    },
    "options": [
      {
        "id": "opt-k3-cit-e6-1",
        "label": {
          "th": "การนำไปแช่น้ำยาพิษ",
          "en": "Soaking in toxic poisons",
          "zh": "浸泡在剧毒化学试剂里腐蚀"
        },
        "icon": "☠️"
      },
      {
        "id": "opt-k3-cit-e6-2",
        "label": {
          "th": "การทิ้งลงแม่น้ำทันที",
          "en": "Dumping into rivers instantly",
          "zh": "二话不说一把火直接烧光扬灰"
        },
        "icon": "🔥"
      },
      {
        "id": "opt-k3-cit-e6-3",
        "label": {
          "th": "Reuse (การนำกลับมาใช้ซ้ำให้เกิดประโยชน์คุ้มค่าที่สุด) 📄 ♻️",
          "en": "REUSE: utilizing materials multiple times to maximize value",
          "zh": "Reuse（再利用/重复利用：让尚有价值的纸张充分发挥双面效能）📄 ♻️"
        },
        "icon": "📄"
      }
    ],
    "correctOptionId": "opt-k3-cit-e6-3",
    "explanation": {
      "th": "การใช้กระดาษทั้งสองหน้าช่วยลดการตัดต้นไม้และประหยัดทรัพยากรโลก เก่งมากครับ!",
      "en": "Correct! Double-sided paper usage is a textbook hallmark of responsible REUSE.",
      "zh": "答对了！两面用纸、物尽其用，减少木材砍伐，是践行再利用（Reuse）的生动写照。"
    }
  },
  {
    "id": "k3-cit-e7",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "หลักการ 3R รักษ์โลก ระดับชั้นอนุบาล 3 ชุดที่ 7: การนำ \"กระดาษที่พิมพ์หน้าเดียวมาใช้เขียนหรือวาดรูปในหน้าที่สองที่ยังว่าง\" ตรงกับหลักการข้อใด? 📄 ♻️",
      "en": "K3 3R Environmental Ethics #7: Using the BLANK BACKSIDE of single-printed paper for scratch notes 📄 ♻️ aligns with which 3R principle?",
      "zh": "幼儿园大班环保3R原则第 7 题：把学校打印过单面的废通知单翻过来，在干干净净的背面草稿纸上练字涂鸦 📄 ♻️，这践行了哪项环保准则？"
    },
    "illustration": "📄 ♻️ ✍️",
    "illustrationSubtitle": {
      "th": "หลักการ 3R: Reuse (การนำกลับมาใช้ซ้ำ)",
      "en": "3Rs: REUSE (using paper double-sided)",
      "zh": "绿色环保3R法则：Reuse（再利用/重复使用）"
    },
    "options": [
      {
        "id": "opt-k3-cit-e7-1",
        "label": {
          "th": "Reuse (การนำกลับมาใช้ซ้ำให้เกิดประโยชน์คุ้มค่าที่สุด) 📄 ♻️",
          "en": "REUSE: utilizing materials multiple times to maximize value",
          "zh": "Reuse（再利用/重复利用：让尚有价值的纸张充分发挥双面效能）📄 ♻️"
        },
        "icon": "📄"
      },
      {
        "id": "opt-k3-cit-e7-2",
        "label": {
          "th": "การทิ้งลงแม่น้ำทันที",
          "en": "Dumping into rivers instantly",
          "zh": "二话不说一把火直接烧光扬灰"
        },
        "icon": "🔥"
      },
      {
        "id": "opt-k3-cit-e7-3",
        "label": {
          "th": "การนำไปแช่น้ำยาพิษ",
          "en": "Soaking in toxic poisons",
          "zh": "浸泡在剧毒化学试剂里腐蚀"
        },
        "icon": "☠️"
      }
    ],
    "correctOptionId": "opt-k3-cit-e7-1",
    "explanation": {
      "th": "การใช้กระดาษทั้งสองหน้าช่วยลดการตัดต้นไม้และประหยัดทรัพยากรโลก เก่งมากครับ!",
      "en": "Correct! Double-sided paper usage is a textbook hallmark of responsible REUSE.",
      "zh": "答对了！两面用纸、物尽其用，减少木材砍伐，是践行再利用（Reuse）的生动写照。"
    }
  },
  {
    "id": "k3-cit-e8",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "หลักการ 3R รักษ์โลก ระดับชั้นอนุบาล 3 ชุดที่ 8: การนำ \"กระดาษที่พิมพ์หน้าเดียวมาใช้เขียนหรือวาดรูปในหน้าที่สองที่ยังว่าง\" ตรงกับหลักการข้อใด? 📄 ♻️",
      "en": "K3 3R Environmental Ethics #8: Using the BLANK BACKSIDE of single-printed paper for scratch notes 📄 ♻️ aligns with which 3R principle?",
      "zh": "幼儿园大班环保3R原则第 8 题：把学校打印过单面的废通知单翻过来，在干干净净的背面草稿纸上练字涂鸦 📄 ♻️，这践行了哪项环保准则？"
    },
    "illustration": "📄 ♻️ ✍️",
    "illustrationSubtitle": {
      "th": "หลักการ 3R: Reuse (การนำกลับมาใช้ซ้ำ)",
      "en": "3Rs: REUSE (using paper double-sided)",
      "zh": "绿色环保3R法则：Reuse（再利用/重复使用）"
    },
    "options": [
      {
        "id": "opt-k3-cit-e8-1",
        "label": {
          "th": "การทิ้งลงแม่น้ำทันที",
          "en": "Dumping into rivers instantly",
          "zh": "二话不说一把火直接烧光扬灰"
        },
        "icon": "🔥"
      },
      {
        "id": "opt-k3-cit-e8-2",
        "label": {
          "th": "Reuse (การนำกลับมาใช้ซ้ำให้เกิดประโยชน์คุ้มค่าที่สุด) 📄 ♻️",
          "en": "REUSE: utilizing materials multiple times to maximize value",
          "zh": "Reuse（再利用/重复利用：让尚有价值的纸张充分发挥双面效能）📄 ♻️"
        },
        "icon": "📄"
      },
      {
        "id": "opt-k3-cit-e8-3",
        "label": {
          "th": "การนำไปแช่น้ำยาพิษ",
          "en": "Soaking in toxic poisons",
          "zh": "浸泡在剧毒化学试剂里腐蚀"
        },
        "icon": "☠️"
      }
    ],
    "correctOptionId": "opt-k3-cit-e8-2",
    "explanation": {
      "th": "การใช้กระดาษทั้งสองหน้าช่วยลดการตัดต้นไม้และประหยัดทรัพยากรโลก เก่งมากครับ!",
      "en": "Correct! Double-sided paper usage is a textbook hallmark of responsible REUSE.",
      "zh": "答对了！两面用纸、物尽其用，减少木材砍伐，是践行再利用（Reuse）的生动写照。"
    }
  },
  {
    "id": "k3-cit-e9",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "หลักการ 3R รักษ์โลก ระดับชั้นอนุบาล 3 ชุดที่ 9: การนำ \"กระดาษที่พิมพ์หน้าเดียวมาใช้เขียนหรือวาดรูปในหน้าที่สองที่ยังว่าง\" ตรงกับหลักการข้อใด? 📄 ♻️",
      "en": "K3 3R Environmental Ethics #9: Using the BLANK BACKSIDE of single-printed paper for scratch notes 📄 ♻️ aligns with which 3R principle?",
      "zh": "幼儿园大班环保3R原则第 9 题：把学校打印过单面的废通知单翻过来，在干干净净的背面草稿纸上练字涂鸦 📄 ♻️，这践行了哪项环保准则？"
    },
    "illustration": "📄 ♻️ ✍️",
    "illustrationSubtitle": {
      "th": "หลักการ 3R: Reuse (การนำกลับมาใช้ซ้ำ)",
      "en": "3Rs: REUSE (using paper double-sided)",
      "zh": "绿色环保3R法则：Reuse（再利用/重复使用）"
    },
    "options": [
      {
        "id": "opt-k3-cit-e9-1",
        "label": {
          "th": "การนำไปแช่น้ำยาพิษ",
          "en": "Soaking in toxic poisons",
          "zh": "浸泡在剧毒化学试剂里腐蚀"
        },
        "icon": "☠️"
      },
      {
        "id": "opt-k3-cit-e9-2",
        "label": {
          "th": "การทิ้งลงแม่น้ำทันที",
          "en": "Dumping into rivers instantly",
          "zh": "二话不说一把火直接烧光扬灰"
        },
        "icon": "🔥"
      },
      {
        "id": "opt-k3-cit-e9-3",
        "label": {
          "th": "Reuse (การนำกลับมาใช้ซ้ำให้เกิดประโยชน์คุ้มค่าที่สุด) 📄 ♻️",
          "en": "REUSE: utilizing materials multiple times to maximize value",
          "zh": "Reuse（再利用/重复利用：让尚有价值的纸张充分发挥双面效能）📄 ♻️"
        },
        "icon": "📄"
      }
    ],
    "correctOptionId": "opt-k3-cit-e9-3",
    "explanation": {
      "th": "การใช้กระดาษทั้งสองหน้าช่วยลดการตัดต้นไม้และประหยัดทรัพยากรโลก เก่งมากครับ!",
      "en": "Correct! Double-sided paper usage is a textbook hallmark of responsible REUSE.",
      "zh": "答对了！两面用纸、物尽其用，减少木材砍伐，是践行再利用（Reuse）的生动写照。"
    }
  },
  {
    "id": "k3-cit-e10",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 1,
    "question": {
      "th": "หลักการ 3R รักษ์โลก ระดับชั้นอนุบาล 3 ชุดที่ 10: การนำ \"กระดาษที่พิมพ์หน้าเดียวมาใช้เขียนหรือวาดรูปในหน้าที่สองที่ยังว่าง\" ตรงกับหลักการข้อใด? 📄 ♻️",
      "en": "K3 3R Environmental Ethics #10: Using the BLANK BACKSIDE of single-printed paper for scratch notes 📄 ♻️ aligns with which 3R principle?",
      "zh": "幼儿园大班环保3R原则第 10 题：把学校打印过单面的废通知单翻过来，在干干净净的背面草稿纸上练字涂鸦 📄 ♻️，这践行了哪项环保准则？"
    },
    "illustration": "📄 ♻️ ✍️",
    "illustrationSubtitle": {
      "th": "หลักการ 3R: Reuse (การนำกลับมาใช้ซ้ำ)",
      "en": "3Rs: REUSE (using paper double-sided)",
      "zh": "绿色环保3R法则：Reuse（再利用/重复使用）"
    },
    "options": [
      {
        "id": "opt-k3-cit-e10-1",
        "label": {
          "th": "Reuse (การนำกลับมาใช้ซ้ำให้เกิดประโยชน์คุ้มค่าที่สุด) 📄 ♻️",
          "en": "REUSE: utilizing materials multiple times to maximize value",
          "zh": "Reuse（再利用/重复利用：让尚有价值的纸张充分发挥双面效能）📄 ♻️"
        },
        "icon": "📄"
      },
      {
        "id": "opt-k3-cit-e10-2",
        "label": {
          "th": "การทิ้งลงแม่น้ำทันที",
          "en": "Dumping into rivers instantly",
          "zh": "二话不说一把火直接烧光扬灰"
        },
        "icon": "🔥"
      },
      {
        "id": "opt-k3-cit-e10-3",
        "label": {
          "th": "การนำไปแช่น้ำยาพิษ",
          "en": "Soaking in toxic poisons",
          "zh": "浸泡在剧毒化学试剂里腐蚀"
        },
        "icon": "☠️"
      }
    ],
    "correctOptionId": "opt-k3-cit-e10-1",
    "explanation": {
      "th": "การใช้กระดาษทั้งสองหน้าช่วยลดการตัดต้นไม้และประหยัดทรัพยากรโลก เก่งมากครับ!",
      "en": "Correct! Double-sided paper usage is a textbook hallmark of responsible REUSE.",
      "zh": "答对了！两面用纸、物尽其用，减少木材砍伐，是践行再利用（Reuse）的生动写照。"
    }
  },
  {
    "id": "k3-cit-m1",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "บทบาทหน้าที่พลเมืองดีระดับชั้นอนุบาล 3 ชุดที่ 1: เมื่อเดินเล่นในสวนแล้วพบเห็น \"ก๊อกน้ำสาธารณะปิดไม่สนิท มีน้ำหยดไหลทิ้งตลอดเวลา\" 🚰 พลเมืองตัวน้อยที่มีจิตสาธารณะควรทำอย่างไร?",
      "en": "K3 Civic Engagement #1: You spot a public park faucet dripping and wasting water 🚰: What should an active young citizen do?",
      "zh": "幼儿园大班社区主人翁责任第 1 题：在社区公园玩耍时，敏锐发现公用洗手池的水龙头由于年久松动正“滴答滴答不停漏水浪费” 🚰，小公民应当？"
    },
    "illustration": "🚰 🤝 🔧",
    "illustrationSubtitle": {
      "th": "จิตสาธารณะ: ช่วยปิดหรือแจ้งเจ้าหน้าที่ซ่อมแซม",
      "en": "Civic duty: Tighten leaky tap or notify park maintenance",
      "zh": "公共责任素养：主动拧紧或通知工作人员检修"
    },
    "options": [
      {
        "id": "opt-k3-cit-m1-1",
        "label": {
          "th": "เปิดก๊อกให้กว้างขึ้นจนน้ำกระฉูดท่วมถนน",
          "en": "Twist valve wide open spraying the streets",
          "zh": "淘气地伸手把旋钮逆时针死死拧到底，让高压水柱狂喷四溅淹没马路"
        },
        "icon": "🌊"
      },
      {
        "id": "opt-k3-cit-m1-2",
        "label": {
          "th": "เข้าไปช่วยหมุนปิดให้สนิท หากชำรุดให้รีบไปแจ้งเจ้าหน้าที่ดูแลสวนทันที 🚰 🏃",
          "en": "Help tighten it shut; if damaged, immediately notify park maintenance staff",
          "zh": "快步上前尝试用力拧紧水阀门；若损坏无法止水，迅速主动报告公园管理处检修 🚰 🏃"
        },
        "icon": "🚰"
      },
      {
        "id": "opt-k3-cit-m1-3",
        "label": {
          "th": "ยืนเต้นรำหัวเราะชอบใจในความเสียหาย",
          "en": "Dance laughing at wasted water merrily",
          "zh": "站在喷水池边拍手大笑手舞足蹈看热闹"
        },
        "icon": "😆"
      }
    ],
    "correctOptionId": "opt-k3-cit-m1-2",
    "explanation": {
      "th": "จิตสาธารณะคือการช่วยดูแลรักษาสิ่งของส่วนรวม แม้เป็นเรื่องเล็กๆ แต่สร้างประโยชน์อันยิ่งใหญ่ เก่งมากครับ!",
      "en": "Awesome! Proactive civic initiative fixes small community hazards before they compound.",
      "zh": "太棒了！随手关紧滴水龙头，或主动向管理员报修，体现出高度的主人翁社会公德心！"
    }
  },
  {
    "id": "k3-cit-m2",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "บทบาทหน้าที่พลเมืองดีระดับชั้นอนุบาล 3 ชุดที่ 2: เมื่อเดินเล่นในสวนแล้วพบเห็น \"ก๊อกน้ำสาธารณะปิดไม่สนิท มีน้ำหยดไหลทิ้งตลอดเวลา\" 🚰 พลเมืองตัวน้อยที่มีจิตสาธารณะควรทำอย่างไร?",
      "en": "K3 Civic Engagement #2: You spot a public park faucet dripping and wasting water 🚰: What should an active young citizen do?",
      "zh": "幼儿园大班社区主人翁责任第 2 题：在社区公园玩耍时，敏锐发现公用洗手池的水龙头由于年久松动正“滴答滴答不停漏水浪费” 🚰，小公民应当？"
    },
    "illustration": "🚰 🤝 🔧",
    "illustrationSubtitle": {
      "th": "จิตสาธารณะ: ช่วยปิดหรือแจ้งเจ้าหน้าที่ซ่อมแซม",
      "en": "Civic duty: Tighten leaky tap or notify park maintenance",
      "zh": "公共责任素养：主动拧紧或通知工作人员检修"
    },
    "options": [
      {
        "id": "opt-k3-cit-m2-1",
        "label": {
          "th": "ยืนเต้นรำหัวเราะชอบใจในความเสียหาย",
          "en": "Dance laughing at wasted water merrily",
          "zh": "站在喷水池边拍手大笑手舞足蹈看热闹"
        },
        "icon": "😆"
      },
      {
        "id": "opt-k3-cit-m2-2",
        "label": {
          "th": "เปิดก๊อกให้กว้างขึ้นจนน้ำกระฉูดท่วมถนน",
          "en": "Twist valve wide open spraying the streets",
          "zh": "淘气地伸手把旋钮逆时针死死拧到底，让高压水柱狂喷四溅淹没马路"
        },
        "icon": "🌊"
      },
      {
        "id": "opt-k3-cit-m2-3",
        "label": {
          "th": "เข้าไปช่วยหมุนปิดให้สนิท หากชำรุดให้รีบไปแจ้งเจ้าหน้าที่ดูแลสวนทันที 🚰 🏃",
          "en": "Help tighten it shut; if damaged, immediately notify park maintenance staff",
          "zh": "快步上前尝试用力拧紧水阀门；若损坏无法止水，迅速主动报告公园管理处检修 🚰 🏃"
        },
        "icon": "🚰"
      }
    ],
    "correctOptionId": "opt-k3-cit-m2-3",
    "explanation": {
      "th": "จิตสาธารณะคือการช่วยดูแลรักษาสิ่งของส่วนรวม แม้เป็นเรื่องเล็กๆ แต่สร้างประโยชน์อันยิ่งใหญ่ เก่งมากครับ!",
      "en": "Awesome! Proactive civic initiative fixes small community hazards before they compound.",
      "zh": "太棒了！随手关紧滴水龙头，或主动向管理员报修，体现出高度的主人翁社会公德心！"
    }
  },
  {
    "id": "k3-cit-m3",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "บทบาทหน้าที่พลเมืองดีระดับชั้นอนุบาล 3 ชุดที่ 3: เมื่อเดินเล่นในสวนแล้วพบเห็น \"ก๊อกน้ำสาธารณะปิดไม่สนิท มีน้ำหยดไหลทิ้งตลอดเวลา\" 🚰 พลเมืองตัวน้อยที่มีจิตสาธารณะควรทำอย่างไร?",
      "en": "K3 Civic Engagement #3: You spot a public park faucet dripping and wasting water 🚰: What should an active young citizen do?",
      "zh": "幼儿园大班社区主人翁责任第 3 题：在社区公园玩耍时，敏锐发现公用洗手池的水龙头由于年久松动正“滴答滴答不停漏水浪费” 🚰，小公民应当？"
    },
    "illustration": "🚰 🤝 🔧",
    "illustrationSubtitle": {
      "th": "จิตสาธารณะ: ช่วยปิดหรือแจ้งเจ้าหน้าที่ซ่อมแซม",
      "en": "Civic duty: Tighten leaky tap or notify park maintenance",
      "zh": "公共责任素养：主动拧紧或通知工作人员检修"
    },
    "options": [
      {
        "id": "opt-k3-cit-m3-1",
        "label": {
          "th": "เข้าไปช่วยหมุนปิดให้สนิท หากชำรุดให้รีบไปแจ้งเจ้าหน้าที่ดูแลสวนทันที 🚰 🏃",
          "en": "Help tighten it shut; if damaged, immediately notify park maintenance staff",
          "zh": "快步上前尝试用力拧紧水阀门；若损坏无法止水，迅速主动报告公园管理处检修 🚰 🏃"
        },
        "icon": "🚰"
      },
      {
        "id": "opt-k3-cit-m3-2",
        "label": {
          "th": "เปิดก๊อกให้กว้างขึ้นจนน้ำกระฉูดท่วมถนน",
          "en": "Twist valve wide open spraying the streets",
          "zh": "淘气地伸手把旋钮逆时针死死拧到底，让高压水柱狂喷四溅淹没马路"
        },
        "icon": "🌊"
      },
      {
        "id": "opt-k3-cit-m3-3",
        "label": {
          "th": "ยืนเต้นรำหัวเราะชอบใจในความเสียหาย",
          "en": "Dance laughing at wasted water merrily",
          "zh": "站在喷水池边拍手大笑手舞足蹈看热闹"
        },
        "icon": "😆"
      }
    ],
    "correctOptionId": "opt-k3-cit-m3-1",
    "explanation": {
      "th": "จิตสาธารณะคือการช่วยดูแลรักษาสิ่งของส่วนรวม แม้เป็นเรื่องเล็กๆ แต่สร้างประโยชน์อันยิ่งใหญ่ เก่งมากครับ!",
      "en": "Awesome! Proactive civic initiative fixes small community hazards before they compound.",
      "zh": "太棒了！随手关紧滴水龙头，或主动向管理员报修，体现出高度的主人翁社会公德心！"
    }
  },
  {
    "id": "k3-cit-m4",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "บทบาทหน้าที่พลเมืองดีระดับชั้นอนุบาล 3 ชุดที่ 4: เมื่อเดินเล่นในสวนแล้วพบเห็น \"ก๊อกน้ำสาธารณะปิดไม่สนิท มีน้ำหยดไหลทิ้งตลอดเวลา\" 🚰 พลเมืองตัวน้อยที่มีจิตสาธารณะควรทำอย่างไร?",
      "en": "K3 Civic Engagement #4: You spot a public park faucet dripping and wasting water 🚰: What should an active young citizen do?",
      "zh": "幼儿园大班社区主人翁责任第 4 题：在社区公园玩耍时，敏锐发现公用洗手池的水龙头由于年久松动正“滴答滴答不停漏水浪费” 🚰，小公民应当？"
    },
    "illustration": "🚰 🤝 🔧",
    "illustrationSubtitle": {
      "th": "จิตสาธารณะ: ช่วยปิดหรือแจ้งเจ้าหน้าที่ซ่อมแซม",
      "en": "Civic duty: Tighten leaky tap or notify park maintenance",
      "zh": "公共责任素养：主动拧紧或通知工作人员检修"
    },
    "options": [
      {
        "id": "opt-k3-cit-m4-1",
        "label": {
          "th": "เปิดก๊อกให้กว้างขึ้นจนน้ำกระฉูดท่วมถนน",
          "en": "Twist valve wide open spraying the streets",
          "zh": "淘气地伸手把旋钮逆时针死死拧到底，让高压水柱狂喷四溅淹没马路"
        },
        "icon": "🌊"
      },
      {
        "id": "opt-k3-cit-m4-2",
        "label": {
          "th": "เข้าไปช่วยหมุนปิดให้สนิท หากชำรุดให้รีบไปแจ้งเจ้าหน้าที่ดูแลสวนทันที 🚰 🏃",
          "en": "Help tighten it shut; if damaged, immediately notify park maintenance staff",
          "zh": "快步上前尝试用力拧紧水阀门；若损坏无法止水，迅速主动报告公园管理处检修 🚰 🏃"
        },
        "icon": "🚰"
      },
      {
        "id": "opt-k3-cit-m4-3",
        "label": {
          "th": "ยืนเต้นรำหัวเราะชอบใจในความเสียหาย",
          "en": "Dance laughing at wasted water merrily",
          "zh": "站在喷水池边拍手大笑手舞足蹈看热闹"
        },
        "icon": "😆"
      }
    ],
    "correctOptionId": "opt-k3-cit-m4-2",
    "explanation": {
      "th": "จิตสาธารณะคือการช่วยดูแลรักษาสิ่งของส่วนรวม แม้เป็นเรื่องเล็กๆ แต่สร้างประโยชน์อันยิ่งใหญ่ เก่งมากครับ!",
      "en": "Awesome! Proactive civic initiative fixes small community hazards before they compound.",
      "zh": "太棒了！随手关紧滴水龙头，或主动向管理员报修，体现出高度的主人翁社会公德心！"
    }
  },
  {
    "id": "k3-cit-m5",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "บทบาทหน้าที่พลเมืองดีระดับชั้นอนุบาล 3 ชุดที่ 5: เมื่อเดินเล่นในสวนแล้วพบเห็น \"ก๊อกน้ำสาธารณะปิดไม่สนิท มีน้ำหยดไหลทิ้งตลอดเวลา\" 🚰 พลเมืองตัวน้อยที่มีจิตสาธารณะควรทำอย่างไร?",
      "en": "K3 Civic Engagement #5: You spot a public park faucet dripping and wasting water 🚰: What should an active young citizen do?",
      "zh": "幼儿园大班社区主人翁责任第 5 题：在社区公园玩耍时，敏锐发现公用洗手池的水龙头由于年久松动正“滴答滴答不停漏水浪费” 🚰，小公民应当？"
    },
    "illustration": "🚰 🤝 🔧",
    "illustrationSubtitle": {
      "th": "จิตสาธารณะ: ช่วยปิดหรือแจ้งเจ้าหน้าที่ซ่อมแซม",
      "en": "Civic duty: Tighten leaky tap or notify park maintenance",
      "zh": "公共责任素养：主动拧紧或通知工作人员检修"
    },
    "options": [
      {
        "id": "opt-k3-cit-m5-1",
        "label": {
          "th": "ยืนเต้นรำหัวเราะชอบใจในความเสียหาย",
          "en": "Dance laughing at wasted water merrily",
          "zh": "站在喷水池边拍手大笑手舞足蹈看热闹"
        },
        "icon": "😆"
      },
      {
        "id": "opt-k3-cit-m5-2",
        "label": {
          "th": "เปิดก๊อกให้กว้างขึ้นจนน้ำกระฉูดท่วมถนน",
          "en": "Twist valve wide open spraying the streets",
          "zh": "淘气地伸手把旋钮逆时针死死拧到底，让高压水柱狂喷四溅淹没马路"
        },
        "icon": "🌊"
      },
      {
        "id": "opt-k3-cit-m5-3",
        "label": {
          "th": "เข้าไปช่วยหมุนปิดให้สนิท หากชำรุดให้รีบไปแจ้งเจ้าหน้าที่ดูแลสวนทันที 🚰 🏃",
          "en": "Help tighten it shut; if damaged, immediately notify park maintenance staff",
          "zh": "快步上前尝试用力拧紧水阀门；若损坏无法止水，迅速主动报告公园管理处检修 🚰 🏃"
        },
        "icon": "🚰"
      }
    ],
    "correctOptionId": "opt-k3-cit-m5-3",
    "explanation": {
      "th": "จิตสาธารณะคือการช่วยดูแลรักษาสิ่งของส่วนรวม แม้เป็นเรื่องเล็กๆ แต่สร้างประโยชน์อันยิ่งใหญ่ เก่งมากครับ!",
      "en": "Awesome! Proactive civic initiative fixes small community hazards before they compound.",
      "zh": "太棒了！随手关紧滴水龙头，或主动向管理员报修，体现出高度的主人翁社会公德心！"
    }
  },
  {
    "id": "k3-cit-m6",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "บทบาทหน้าที่พลเมืองดีระดับชั้นอนุบาล 3 ชุดที่ 6: เมื่อเดินเล่นในสวนแล้วพบเห็น \"ก๊อกน้ำสาธารณะปิดไม่สนิท มีน้ำหยดไหลทิ้งตลอดเวลา\" 🚰 พลเมืองตัวน้อยที่มีจิตสาธารณะควรทำอย่างไร?",
      "en": "K3 Civic Engagement #6: You spot a public park faucet dripping and wasting water 🚰: What should an active young citizen do?",
      "zh": "幼儿园大班社区主人翁责任第 6 题：在社区公园玩耍时，敏锐发现公用洗手池的水龙头由于年久松动正“滴答滴答不停漏水浪费” 🚰，小公民应当？"
    },
    "illustration": "🚰 🤝 🔧",
    "illustrationSubtitle": {
      "th": "จิตสาธารณะ: ช่วยปิดหรือแจ้งเจ้าหน้าที่ซ่อมแซม",
      "en": "Civic duty: Tighten leaky tap or notify park maintenance",
      "zh": "公共责任素养：主动拧紧或通知工作人员检修"
    },
    "options": [
      {
        "id": "opt-k3-cit-m6-1",
        "label": {
          "th": "เข้าไปช่วยหมุนปิดให้สนิท หากชำรุดให้รีบไปแจ้งเจ้าหน้าที่ดูแลสวนทันที 🚰 🏃",
          "en": "Help tighten it shut; if damaged, immediately notify park maintenance staff",
          "zh": "快步上前尝试用力拧紧水阀门；若损坏无法止水，迅速主动报告公园管理处检修 🚰 🏃"
        },
        "icon": "🚰"
      },
      {
        "id": "opt-k3-cit-m6-2",
        "label": {
          "th": "เปิดก๊อกให้กว้างขึ้นจนน้ำกระฉูดท่วมถนน",
          "en": "Twist valve wide open spraying the streets",
          "zh": "淘气地伸手把旋钮逆时针死死拧到底，让高压水柱狂喷四溅淹没马路"
        },
        "icon": "🌊"
      },
      {
        "id": "opt-k3-cit-m6-3",
        "label": {
          "th": "ยืนเต้นรำหัวเราะชอบใจในความเสียหาย",
          "en": "Dance laughing at wasted water merrily",
          "zh": "站在喷水池边拍手大笑手舞足蹈看热闹"
        },
        "icon": "😆"
      }
    ],
    "correctOptionId": "opt-k3-cit-m6-1",
    "explanation": {
      "th": "จิตสาธารณะคือการช่วยดูแลรักษาสิ่งของส่วนรวม แม้เป็นเรื่องเล็กๆ แต่สร้างประโยชน์อันยิ่งใหญ่ เก่งมากครับ!",
      "en": "Awesome! Proactive civic initiative fixes small community hazards before they compound.",
      "zh": "太棒了！随手关紧滴水龙头，或主动向管理员报修，体现出高度的主人翁社会公德心！"
    }
  },
  {
    "id": "k3-cit-m7",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "บทบาทหน้าที่พลเมืองดีระดับชั้นอนุบาล 3 ชุดที่ 7: เมื่อเดินเล่นในสวนแล้วพบเห็น \"ก๊อกน้ำสาธารณะปิดไม่สนิท มีน้ำหยดไหลทิ้งตลอดเวลา\" 🚰 พลเมืองตัวน้อยที่มีจิตสาธารณะควรทำอย่างไร?",
      "en": "K3 Civic Engagement #7: You spot a public park faucet dripping and wasting water 🚰: What should an active young citizen do?",
      "zh": "幼儿园大班社区主人翁责任第 7 题：在社区公园玩耍时，敏锐发现公用洗手池的水龙头由于年久松动正“滴答滴答不停漏水浪费” 🚰，小公民应当？"
    },
    "illustration": "🚰 🤝 🔧",
    "illustrationSubtitle": {
      "th": "จิตสาธารณะ: ช่วยปิดหรือแจ้งเจ้าหน้าที่ซ่อมแซม",
      "en": "Civic duty: Tighten leaky tap or notify park maintenance",
      "zh": "公共责任素养：主动拧紧或通知工作人员检修"
    },
    "options": [
      {
        "id": "opt-k3-cit-m7-1",
        "label": {
          "th": "เปิดก๊อกให้กว้างขึ้นจนน้ำกระฉูดท่วมถนน",
          "en": "Twist valve wide open spraying the streets",
          "zh": "淘气地伸手把旋钮逆时针死死拧到底，让高压水柱狂喷四溅淹没马路"
        },
        "icon": "🌊"
      },
      {
        "id": "opt-k3-cit-m7-2",
        "label": {
          "th": "เข้าไปช่วยหมุนปิดให้สนิท หากชำรุดให้รีบไปแจ้งเจ้าหน้าที่ดูแลสวนทันที 🚰 🏃",
          "en": "Help tighten it shut; if damaged, immediately notify park maintenance staff",
          "zh": "快步上前尝试用力拧紧水阀门；若损坏无法止水，迅速主动报告公园管理处检修 🚰 🏃"
        },
        "icon": "🚰"
      },
      {
        "id": "opt-k3-cit-m7-3",
        "label": {
          "th": "ยืนเต้นรำหัวเราะชอบใจในความเสียหาย",
          "en": "Dance laughing at wasted water merrily",
          "zh": "站在喷水池边拍手大笑手舞足蹈看热闹"
        },
        "icon": "😆"
      }
    ],
    "correctOptionId": "opt-k3-cit-m7-2",
    "explanation": {
      "th": "จิตสาธารณะคือการช่วยดูแลรักษาสิ่งของส่วนรวม แม้เป็นเรื่องเล็กๆ แต่สร้างประโยชน์อันยิ่งใหญ่ เก่งมากครับ!",
      "en": "Awesome! Proactive civic initiative fixes small community hazards before they compound.",
      "zh": "太棒了！随手关紧滴水龙头，或主动向管理员报修，体现出高度的主人翁社会公德心！"
    }
  },
  {
    "id": "k3-cit-m8",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "บทบาทหน้าที่พลเมืองดีระดับชั้นอนุบาล 3 ชุดที่ 8: เมื่อเดินเล่นในสวนแล้วพบเห็น \"ก๊อกน้ำสาธารณะปิดไม่สนิท มีน้ำหยดไหลทิ้งตลอดเวลา\" 🚰 พลเมืองตัวน้อยที่มีจิตสาธารณะควรทำอย่างไร?",
      "en": "K3 Civic Engagement #8: You spot a public park faucet dripping and wasting water 🚰: What should an active young citizen do?",
      "zh": "幼儿园大班社区主人翁责任第 8 题：在社区公园玩耍时，敏锐发现公用洗手池的水龙头由于年久松动正“滴答滴答不停漏水浪费” 🚰，小公民应当？"
    },
    "illustration": "🚰 🤝 🔧",
    "illustrationSubtitle": {
      "th": "จิตสาธารณะ: ช่วยปิดหรือแจ้งเจ้าหน้าที่ซ่อมแซม",
      "en": "Civic duty: Tighten leaky tap or notify park maintenance",
      "zh": "公共责任素养：主动拧紧或通知工作人员检修"
    },
    "options": [
      {
        "id": "opt-k3-cit-m8-1",
        "label": {
          "th": "ยืนเต้นรำหัวเราะชอบใจในความเสียหาย",
          "en": "Dance laughing at wasted water merrily",
          "zh": "站在喷水池边拍手大笑手舞足蹈看热闹"
        },
        "icon": "😆"
      },
      {
        "id": "opt-k3-cit-m8-2",
        "label": {
          "th": "เปิดก๊อกให้กว้างขึ้นจนน้ำกระฉูดท่วมถนน",
          "en": "Twist valve wide open spraying the streets",
          "zh": "淘气地伸手把旋钮逆时针死死拧到底，让高压水柱狂喷四溅淹没马路"
        },
        "icon": "🌊"
      },
      {
        "id": "opt-k3-cit-m8-3",
        "label": {
          "th": "เข้าไปช่วยหมุนปิดให้สนิท หากชำรุดให้รีบไปแจ้งเจ้าหน้าที่ดูแลสวนทันที 🚰 🏃",
          "en": "Help tighten it shut; if damaged, immediately notify park maintenance staff",
          "zh": "快步上前尝试用力拧紧水阀门；若损坏无法止水，迅速主动报告公园管理处检修 🚰 🏃"
        },
        "icon": "🚰"
      }
    ],
    "correctOptionId": "opt-k3-cit-m8-3",
    "explanation": {
      "th": "จิตสาธารณะคือการช่วยดูแลรักษาสิ่งของส่วนรวม แม้เป็นเรื่องเล็กๆ แต่สร้างประโยชน์อันยิ่งใหญ่ เก่งมากครับ!",
      "en": "Awesome! Proactive civic initiative fixes small community hazards before they compound.",
      "zh": "太棒了！随手关紧滴水龙头，或主动向管理员报修，体现出高度的主人翁社会公德心！"
    }
  },
  {
    "id": "k3-cit-m9",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "บทบาทหน้าที่พลเมืองดีระดับชั้นอนุบาล 3 ชุดที่ 9: เมื่อเดินเล่นในสวนแล้วพบเห็น \"ก๊อกน้ำสาธารณะปิดไม่สนิท มีน้ำหยดไหลทิ้งตลอดเวลา\" 🚰 พลเมืองตัวน้อยที่มีจิตสาธารณะควรทำอย่างไร?",
      "en": "K3 Civic Engagement #9: You spot a public park faucet dripping and wasting water 🚰: What should an active young citizen do?",
      "zh": "幼儿园大班社区主人翁责任第 9 题：在社区公园玩耍时，敏锐发现公用洗手池的水龙头由于年久松动正“滴答滴答不停漏水浪费” 🚰，小公民应当？"
    },
    "illustration": "🚰 🤝 🔧",
    "illustrationSubtitle": {
      "th": "จิตสาธารณะ: ช่วยปิดหรือแจ้งเจ้าหน้าที่ซ่อมแซม",
      "en": "Civic duty: Tighten leaky tap or notify park maintenance",
      "zh": "公共责任素养：主动拧紧或通知工作人员检修"
    },
    "options": [
      {
        "id": "opt-k3-cit-m9-1",
        "label": {
          "th": "เข้าไปช่วยหมุนปิดให้สนิท หากชำรุดให้รีบไปแจ้งเจ้าหน้าที่ดูแลสวนทันที 🚰 🏃",
          "en": "Help tighten it shut; if damaged, immediately notify park maintenance staff",
          "zh": "快步上前尝试用力拧紧水阀门；若损坏无法止水，迅速主动报告公园管理处检修 🚰 🏃"
        },
        "icon": "🚰"
      },
      {
        "id": "opt-k3-cit-m9-2",
        "label": {
          "th": "เปิดก๊อกให้กว้างขึ้นจนน้ำกระฉูดท่วมถนน",
          "en": "Twist valve wide open spraying the streets",
          "zh": "淘气地伸手把旋钮逆时针死死拧到底，让高压水柱狂喷四溅淹没马路"
        },
        "icon": "🌊"
      },
      {
        "id": "opt-k3-cit-m9-3",
        "label": {
          "th": "ยืนเต้นรำหัวเราะชอบใจในความเสียหาย",
          "en": "Dance laughing at wasted water merrily",
          "zh": "站在喷水池边拍手大笑手舞足蹈看热闹"
        },
        "icon": "😆"
      }
    ],
    "correctOptionId": "opt-k3-cit-m9-1",
    "explanation": {
      "th": "จิตสาธารณะคือการช่วยดูแลรักษาสิ่งของส่วนรวม แม้เป็นเรื่องเล็กๆ แต่สร้างประโยชน์อันยิ่งใหญ่ เก่งมากครับ!",
      "en": "Awesome! Proactive civic initiative fixes small community hazards before they compound.",
      "zh": "太棒了！随手关紧滴水龙头，或主动向管理员报修，体现出高度的主人翁社会公德心！"
    }
  },
  {
    "id": "k3-cit-m10",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 2,
    "question": {
      "th": "บทบาทหน้าที่พลเมืองดีระดับชั้นอนุบาล 3 ชุดที่ 10: เมื่อเดินเล่นในสวนแล้วพบเห็น \"ก๊อกน้ำสาธารณะปิดไม่สนิท มีน้ำหยดไหลทิ้งตลอดเวลา\" 🚰 พลเมืองตัวน้อยที่มีจิตสาธารณะควรทำอย่างไร?",
      "en": "K3 Civic Engagement #10: You spot a public park faucet dripping and wasting water 🚰: What should an active young citizen do?",
      "zh": "幼儿园大班社区主人翁责任第 10 题：在社区公园玩耍时，敏锐发现公用洗手池的水龙头由于年久松动正“滴答滴答不停漏水浪费” 🚰，小公民应当？"
    },
    "illustration": "🚰 🤝 🔧",
    "illustrationSubtitle": {
      "th": "จิตสาธารณะ: ช่วยปิดหรือแจ้งเจ้าหน้าที่ซ่อมแซม",
      "en": "Civic duty: Tighten leaky tap or notify park maintenance",
      "zh": "公共责任素养：主动拧紧或通知工作人员检修"
    },
    "options": [
      {
        "id": "opt-k3-cit-m10-1",
        "label": {
          "th": "เปิดก๊อกให้กว้างขึ้นจนน้ำกระฉูดท่วมถนน",
          "en": "Twist valve wide open spraying the streets",
          "zh": "淘气地伸手把旋钮逆时针死死拧到底，让高压水柱狂喷四溅淹没马路"
        },
        "icon": "🌊"
      },
      {
        "id": "opt-k3-cit-m10-2",
        "label": {
          "th": "เข้าไปช่วยหมุนปิดให้สนิท หากชำรุดให้รีบไปแจ้งเจ้าหน้าที่ดูแลสวนทันที 🚰 🏃",
          "en": "Help tighten it shut; if damaged, immediately notify park maintenance staff",
          "zh": "快步上前尝试用力拧紧水阀门；若损坏无法止水，迅速主动报告公园管理处检修 🚰 🏃"
        },
        "icon": "🚰"
      },
      {
        "id": "opt-k3-cit-m10-3",
        "label": {
          "th": "ยืนเต้นรำหัวเราะชอบใจในความเสียหาย",
          "en": "Dance laughing at wasted water merrily",
          "zh": "站在喷水池边拍手大笑手舞足蹈看热闹"
        },
        "icon": "😆"
      }
    ],
    "correctOptionId": "opt-k3-cit-m10-2",
    "explanation": {
      "th": "จิตสาธารณะคือการช่วยดูแลรักษาสิ่งของส่วนรวม แม้เป็นเรื่องเล็กๆ แต่สร้างประโยชน์อันยิ่งใหญ่ เก่งมากครับ!",
      "en": "Awesome! Proactive civic initiative fixes small community hazards before they compound.",
      "zh": "太棒了！随手关紧滴水龙头，或主动向管理员报修，体现出高度的主人翁社会公德心！"
    }
  },
  {
    "id": "k3-cit-h1",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "การพัฒนาที่ยั่งยืน (SDGs) ระดับชั้นอนุบาล 3 ชุดที่ 1: การช่วยกัน \"ปลูกต้นไม้และเพิ่มพื้นที่สีเขียวในชุมชน\" 🌳 🌍 มีประโยชน์สูงสุดต่อโลกและมนุษย์อย่างไร?",
      "en": "K3 Global Sustainability #1: Planting trees and expanding community urban greenery 🌳 🌍: What is the grandest ecological blessing?",
      "zh": "幼儿园大班全球可持续发展理念第 1 题：全社会大力提倡“共植一片绿荫，为我们的社区与地球广植林木增添绿色” 🌳 🌍，其最伟大的生态福祉是？"
    },
    "illustration": "🌳 🌍 🌬️",
    "illustrationSubtitle": {
      "th": "การเพิ่มพื้นที่สีเขียว: ดักจับคาร์บอน ผลิตออกซิเจน ลดโลกร้อน",
      "en": "Reforestation cleans air, absorbs CO2, and curbs global warming",
      "zh": "植树造林固碳释氧，减缓气候变暖与保持水土"
    },
    "options": [
      {
        "id": "opt-k3-cit-h1-1",
        "label": {
          "th": "ทำให้ใบไม้บินขึ้นไปชนดวงดาวร่วงหล่น",
          "en": "Leaves fly striking stars down from heaven",
          "zh": "大树叶片脱离枝头直接像飞镖一样把天上的星星撞碎"
        },
        "icon": "⭐"
      },
      {
        "id": "opt-k3-cit-h1-2",
        "label": {
          "th": "ทำให้ฝนตกลงมาเป็นลูกอมสายไหม",
          "en": "Causes rain to fall as sweet cotton candy",
          "zh": "使得倾盆大雨全部化作漫天掉落的五彩棉花糖果"
        },
        "icon": "🍭"
      },
      {
        "id": "opt-k3-cit-h1-3",
        "label": {
          "th": "ต้นไม้ช่วยดูดซับก๊าซคาร์บอนไดออกไซด์ สร้างออกซิเจนบริสุทธิ์ ลดภาวะโลกร้อน และเป็นบ้านของสัตว์ป่า 🌳 🦜",
          "en": "Trees sequester carbon dioxide, generate pure oxygen, curb global warming, and shelter wildlife",
          "zh": "树木能强力吸收二氧化碳温室气体、释放甘甜氧气、涵养水源防风固沙、缓解全球气候变暖 🌳 🦜"
        },
        "icon": "🌳"
      }
    ],
    "correctOptionId": "opt-k3-cit-h1-3",
    "explanation": {
      "th": "ต้นไม้คือปอดของโลก การปลูกต้นไม้เพียง 1 ต้นช่วยดูดซับก๊าซเรือนกระจกและให้ร่มเงาตลอดหลายสิบปี เก่งมากครับ!",
      "en": "Spot on! Reforestation stabilizes planetary climate, purifies air, and nurtures biodiversity for generations.",
      "zh": "太棒了！绿水青山就是金山银山，植树造林功在当代利在千秋，为子孙后代留下美丽宜居的地球家园！"
    }
  },
  {
    "id": "k3-cit-h2",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "การพัฒนาที่ยั่งยืน (SDGs) ระดับชั้นอนุบาล 3 ชุดที่ 2: การช่วยกัน \"ปลูกต้นไม้และเพิ่มพื้นที่สีเขียวในชุมชน\" 🌳 🌍 มีประโยชน์สูงสุดต่อโลกและมนุษย์อย่างไร?",
      "en": "K3 Global Sustainability #2: Planting trees and expanding community urban greenery 🌳 🌍: What is the grandest ecological blessing?",
      "zh": "幼儿园大班全球可持续发展理念第 2 题：全社会大力提倡“共植一片绿荫，为我们的社区与地球广植林木增添绿色” 🌳 🌍，其最伟大的生态福祉是？"
    },
    "illustration": "🌳 🌍 🌬️",
    "illustrationSubtitle": {
      "th": "การเพิ่มพื้นที่สีเขียว: ดักจับคาร์บอน ผลิตออกซิเจน ลดโลกร้อน",
      "en": "Reforestation cleans air, absorbs CO2, and curbs global warming",
      "zh": "植树造林固碳释氧，减缓气候变暖与保持水土"
    },
    "options": [
      {
        "id": "opt-k3-cit-h2-1",
        "label": {
          "th": "ต้นไม้ช่วยดูดซับก๊าซคาร์บอนไดออกไซด์ สร้างออกซิเจนบริสุทธิ์ ลดภาวะโลกร้อน และเป็นบ้านของสัตว์ป่า 🌳 🦜",
          "en": "Trees sequester carbon dioxide, generate pure oxygen, curb global warming, and shelter wildlife",
          "zh": "树木能强力吸收二氧化碳温室气体、释放甘甜氧气、涵养水源防风固沙、缓解全球气候变暖 🌳 🦜"
        },
        "icon": "🌳"
      },
      {
        "id": "opt-k3-cit-h2-2",
        "label": {
          "th": "ทำให้ฝนตกลงมาเป็นลูกอมสายไหม",
          "en": "Causes rain to fall as sweet cotton candy",
          "zh": "使得倾盆大雨全部化作漫天掉落的五彩棉花糖果"
        },
        "icon": "🍭"
      },
      {
        "id": "opt-k3-cit-h2-3",
        "label": {
          "th": "ทำให้ใบไม้บินขึ้นไปชนดวงดาวร่วงหล่น",
          "en": "Leaves fly striking stars down from heaven",
          "zh": "大树叶片脱离枝头直接像飞镖一样把天上的星星撞碎"
        },
        "icon": "⭐"
      }
    ],
    "correctOptionId": "opt-k3-cit-h2-1",
    "explanation": {
      "th": "ต้นไม้คือปอดของโลก การปลูกต้นไม้เพียง 1 ต้นช่วยดูดซับก๊าซเรือนกระจกและให้ร่มเงาตลอดหลายสิบปี เก่งมากครับ!",
      "en": "Spot on! Reforestation stabilizes planetary climate, purifies air, and nurtures biodiversity for generations.",
      "zh": "太棒了！绿水青山就是金山银山，植树造林功在当代利在千秋，为子孙后代留下美丽宜居的地球家园！"
    }
  },
  {
    "id": "k3-cit-h3",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "การพัฒนาที่ยั่งยืน (SDGs) ระดับชั้นอนุบาล 3 ชุดที่ 3: การช่วยกัน \"ปลูกต้นไม้และเพิ่มพื้นที่สีเขียวในชุมชน\" 🌳 🌍 มีประโยชน์สูงสุดต่อโลกและมนุษย์อย่างไร?",
      "en": "K3 Global Sustainability #3: Planting trees and expanding community urban greenery 🌳 🌍: What is the grandest ecological blessing?",
      "zh": "幼儿园大班全球可持续发展理念第 3 题：全社会大力提倡“共植一片绿荫，为我们的社区与地球广植林木增添绿色” 🌳 🌍，其最伟大的生态福祉是？"
    },
    "illustration": "🌳 🌍 🌬️",
    "illustrationSubtitle": {
      "th": "การเพิ่มพื้นที่สีเขียว: ดักจับคาร์บอน ผลิตออกซิเจน ลดโลกร้อน",
      "en": "Reforestation cleans air, absorbs CO2, and curbs global warming",
      "zh": "植树造林固碳释氧，减缓气候变暖与保持水土"
    },
    "options": [
      {
        "id": "opt-k3-cit-h3-1",
        "label": {
          "th": "ทำให้ฝนตกลงมาเป็นลูกอมสายไหม",
          "en": "Causes rain to fall as sweet cotton candy",
          "zh": "使得倾盆大雨全部化作漫天掉落的五彩棉花糖果"
        },
        "icon": "🍭"
      },
      {
        "id": "opt-k3-cit-h3-2",
        "label": {
          "th": "ต้นไม้ช่วยดูดซับก๊าซคาร์บอนไดออกไซด์ สร้างออกซิเจนบริสุทธิ์ ลดภาวะโลกร้อน และเป็นบ้านของสัตว์ป่า 🌳 🦜",
          "en": "Trees sequester carbon dioxide, generate pure oxygen, curb global warming, and shelter wildlife",
          "zh": "树木能强力吸收二氧化碳温室气体、释放甘甜氧气、涵养水源防风固沙、缓解全球气候变暖 🌳 🦜"
        },
        "icon": "🌳"
      },
      {
        "id": "opt-k3-cit-h3-3",
        "label": {
          "th": "ทำให้ใบไม้บินขึ้นไปชนดวงดาวร่วงหล่น",
          "en": "Leaves fly striking stars down from heaven",
          "zh": "大树叶片脱离枝头直接像飞镖一样把天上的星星撞碎"
        },
        "icon": "⭐"
      }
    ],
    "correctOptionId": "opt-k3-cit-h3-2",
    "explanation": {
      "th": "ต้นไม้คือปอดของโลก การปลูกต้นไม้เพียง 1 ต้นช่วยดูดซับก๊าซเรือนกระจกและให้ร่มเงาตลอดหลายสิบปี เก่งมากครับ!",
      "en": "Spot on! Reforestation stabilizes planetary climate, purifies air, and nurtures biodiversity for generations.",
      "zh": "太棒了！绿水青山就是金山银山，植树造林功在当代利在千秋，为子孙后代留下美丽宜居的地球家园！"
    }
  },
  {
    "id": "k3-cit-h4",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "การพัฒนาที่ยั่งยืน (SDGs) ระดับชั้นอนุบาล 3 ชุดที่ 4: การช่วยกัน \"ปลูกต้นไม้และเพิ่มพื้นที่สีเขียวในชุมชน\" 🌳 🌍 มีประโยชน์สูงสุดต่อโลกและมนุษย์อย่างไร?",
      "en": "K3 Global Sustainability #4: Planting trees and expanding community urban greenery 🌳 🌍: What is the grandest ecological blessing?",
      "zh": "幼儿园大班全球可持续发展理念第 4 题：全社会大力提倡“共植一片绿荫，为我们的社区与地球广植林木增添绿色” 🌳 🌍，其最伟大的生态福祉是？"
    },
    "illustration": "🌳 🌍 🌬️",
    "illustrationSubtitle": {
      "th": "การเพิ่มพื้นที่สีเขียว: ดักจับคาร์บอน ผลิตออกซิเจน ลดโลกร้อน",
      "en": "Reforestation cleans air, absorbs CO2, and curbs global warming",
      "zh": "植树造林固碳释氧，减缓气候变暖与保持水土"
    },
    "options": [
      {
        "id": "opt-k3-cit-h4-1",
        "label": {
          "th": "ทำให้ใบไม้บินขึ้นไปชนดวงดาวร่วงหล่น",
          "en": "Leaves fly striking stars down from heaven",
          "zh": "大树叶片脱离枝头直接像飞镖一样把天上的星星撞碎"
        },
        "icon": "⭐"
      },
      {
        "id": "opt-k3-cit-h4-2",
        "label": {
          "th": "ทำให้ฝนตกลงมาเป็นลูกอมสายไหม",
          "en": "Causes rain to fall as sweet cotton candy",
          "zh": "使得倾盆大雨全部化作漫天掉落的五彩棉花糖果"
        },
        "icon": "🍭"
      },
      {
        "id": "opt-k3-cit-h4-3",
        "label": {
          "th": "ต้นไม้ช่วยดูดซับก๊าซคาร์บอนไดออกไซด์ สร้างออกซิเจนบริสุทธิ์ ลดภาวะโลกร้อน และเป็นบ้านของสัตว์ป่า 🌳 🦜",
          "en": "Trees sequester carbon dioxide, generate pure oxygen, curb global warming, and shelter wildlife",
          "zh": "树木能强力吸收二氧化碳温室气体、释放甘甜氧气、涵养水源防风固沙、缓解全球气候变暖 🌳 🦜"
        },
        "icon": "🌳"
      }
    ],
    "correctOptionId": "opt-k3-cit-h4-3",
    "explanation": {
      "th": "ต้นไม้คือปอดของโลก การปลูกต้นไม้เพียง 1 ต้นช่วยดูดซับก๊าซเรือนกระจกและให้ร่มเงาตลอดหลายสิบปี เก่งมากครับ!",
      "en": "Spot on! Reforestation stabilizes planetary climate, purifies air, and nurtures biodiversity for generations.",
      "zh": "太棒了！绿水青山就是金山银山，植树造林功在当代利在千秋，为子孙后代留下美丽宜居的地球家园！"
    }
  },
  {
    "id": "k3-cit-h5",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "การพัฒนาที่ยั่งยืน (SDGs) ระดับชั้นอนุบาล 3 ชุดที่ 5: การช่วยกัน \"ปลูกต้นไม้และเพิ่มพื้นที่สีเขียวในชุมชน\" 🌳 🌍 มีประโยชน์สูงสุดต่อโลกและมนุษย์อย่างไร?",
      "en": "K3 Global Sustainability #5: Planting trees and expanding community urban greenery 🌳 🌍: What is the grandest ecological blessing?",
      "zh": "幼儿园大班全球可持续发展理念第 5 题：全社会大力提倡“共植一片绿荫，为我们的社区与地球广植林木增添绿色” 🌳 🌍，其最伟大的生态福祉是？"
    },
    "illustration": "🌳 🌍 🌬️",
    "illustrationSubtitle": {
      "th": "การเพิ่มพื้นที่สีเขียว: ดักจับคาร์บอน ผลิตออกซิเจน ลดโลกร้อน",
      "en": "Reforestation cleans air, absorbs CO2, and curbs global warming",
      "zh": "植树造林固碳释氧，减缓气候变暖与保持水土"
    },
    "options": [
      {
        "id": "opt-k3-cit-h5-1",
        "label": {
          "th": "ต้นไม้ช่วยดูดซับก๊าซคาร์บอนไดออกไซด์ สร้างออกซิเจนบริสุทธิ์ ลดภาวะโลกร้อน และเป็นบ้านของสัตว์ป่า 🌳 🦜",
          "en": "Trees sequester carbon dioxide, generate pure oxygen, curb global warming, and shelter wildlife",
          "zh": "树木能强力吸收二氧化碳温室气体、释放甘甜氧气、涵养水源防风固沙、缓解全球气候变暖 🌳 🦜"
        },
        "icon": "🌳"
      },
      {
        "id": "opt-k3-cit-h5-2",
        "label": {
          "th": "ทำให้ฝนตกลงมาเป็นลูกอมสายไหม",
          "en": "Causes rain to fall as sweet cotton candy",
          "zh": "使得倾盆大雨全部化作漫天掉落的五彩棉花糖果"
        },
        "icon": "🍭"
      },
      {
        "id": "opt-k3-cit-h5-3",
        "label": {
          "th": "ทำให้ใบไม้บินขึ้นไปชนดวงดาวร่วงหล่น",
          "en": "Leaves fly striking stars down from heaven",
          "zh": "大树叶片脱离枝头直接像飞镖一样把天上的星星撞碎"
        },
        "icon": "⭐"
      }
    ],
    "correctOptionId": "opt-k3-cit-h5-1",
    "explanation": {
      "th": "ต้นไม้คือปอดของโลก การปลูกต้นไม้เพียง 1 ต้นช่วยดูดซับก๊าซเรือนกระจกและให้ร่มเงาตลอดหลายสิบปี เก่งมากครับ!",
      "en": "Spot on! Reforestation stabilizes planetary climate, purifies air, and nurtures biodiversity for generations.",
      "zh": "太棒了！绿水青山就是金山银山，植树造林功在当代利在千秋，为子孙后代留下美丽宜居的地球家园！"
    }
  },
  {
    "id": "k3-cit-h6",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "การพัฒนาที่ยั่งยืน (SDGs) ระดับชั้นอนุบาล 3 ชุดที่ 6: การช่วยกัน \"ปลูกต้นไม้และเพิ่มพื้นที่สีเขียวในชุมชน\" 🌳 🌍 มีประโยชน์สูงสุดต่อโลกและมนุษย์อย่างไร?",
      "en": "K3 Global Sustainability #6: Planting trees and expanding community urban greenery 🌳 🌍: What is the grandest ecological blessing?",
      "zh": "幼儿园大班全球可持续发展理念第 6 题：全社会大力提倡“共植一片绿荫，为我们的社区与地球广植林木增添绿色” 🌳 🌍，其最伟大的生态福祉是？"
    },
    "illustration": "🌳 🌍 🌬️",
    "illustrationSubtitle": {
      "th": "การเพิ่มพื้นที่สีเขียว: ดักจับคาร์บอน ผลิตออกซิเจน ลดโลกร้อน",
      "en": "Reforestation cleans air, absorbs CO2, and curbs global warming",
      "zh": "植树造林固碳释氧，减缓气候变暖与保持水土"
    },
    "options": [
      {
        "id": "opt-k3-cit-h6-1",
        "label": {
          "th": "ทำให้ฝนตกลงมาเป็นลูกอมสายไหม",
          "en": "Causes rain to fall as sweet cotton candy",
          "zh": "使得倾盆大雨全部化作漫天掉落的五彩棉花糖果"
        },
        "icon": "🍭"
      },
      {
        "id": "opt-k3-cit-h6-2",
        "label": {
          "th": "ต้นไม้ช่วยดูดซับก๊าซคาร์บอนไดออกไซด์ สร้างออกซิเจนบริสุทธิ์ ลดภาวะโลกร้อน และเป็นบ้านของสัตว์ป่า 🌳 🦜",
          "en": "Trees sequester carbon dioxide, generate pure oxygen, curb global warming, and shelter wildlife",
          "zh": "树木能强力吸收二氧化碳温室气体、释放甘甜氧气、涵养水源防风固沙、缓解全球气候变暖 🌳 🦜"
        },
        "icon": "🌳"
      },
      {
        "id": "opt-k3-cit-h6-3",
        "label": {
          "th": "ทำให้ใบไม้บินขึ้นไปชนดวงดาวร่วงหล่น",
          "en": "Leaves fly striking stars down from heaven",
          "zh": "大树叶片脱离枝头直接像飞镖一样把天上的星星撞碎"
        },
        "icon": "⭐"
      }
    ],
    "correctOptionId": "opt-k3-cit-h6-2",
    "explanation": {
      "th": "ต้นไม้คือปอดของโลก การปลูกต้นไม้เพียง 1 ต้นช่วยดูดซับก๊าซเรือนกระจกและให้ร่มเงาตลอดหลายสิบปี เก่งมากครับ!",
      "en": "Spot on! Reforestation stabilizes planetary climate, purifies air, and nurtures biodiversity for generations.",
      "zh": "太棒了！绿水青山就是金山银山，植树造林功在当代利在千秋，为子孙后代留下美丽宜居的地球家园！"
    }
  },
  {
    "id": "k3-cit-h7",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "การพัฒนาที่ยั่งยืน (SDGs) ระดับชั้นอนุบาล 3 ชุดที่ 7: การช่วยกัน \"ปลูกต้นไม้และเพิ่มพื้นที่สีเขียวในชุมชน\" 🌳 🌍 มีประโยชน์สูงสุดต่อโลกและมนุษย์อย่างไร?",
      "en": "K3 Global Sustainability #7: Planting trees and expanding community urban greenery 🌳 🌍: What is the grandest ecological blessing?",
      "zh": "幼儿园大班全球可持续发展理念第 7 题：全社会大力提倡“共植一片绿荫，为我们的社区与地球广植林木增添绿色” 🌳 🌍，其最伟大的生态福祉是？"
    },
    "illustration": "🌳 🌍 🌬️",
    "illustrationSubtitle": {
      "th": "การเพิ่มพื้นที่สีเขียว: ดักจับคาร์บอน ผลิตออกซิเจน ลดโลกร้อน",
      "en": "Reforestation cleans air, absorbs CO2, and curbs global warming",
      "zh": "植树造林固碳释氧，减缓气候变暖与保持水土"
    },
    "options": [
      {
        "id": "opt-k3-cit-h7-1",
        "label": {
          "th": "ทำให้ใบไม้บินขึ้นไปชนดวงดาวร่วงหล่น",
          "en": "Leaves fly striking stars down from heaven",
          "zh": "大树叶片脱离枝头直接像飞镖一样把天上的星星撞碎"
        },
        "icon": "⭐"
      },
      {
        "id": "opt-k3-cit-h7-2",
        "label": {
          "th": "ทำให้ฝนตกลงมาเป็นลูกอมสายไหม",
          "en": "Causes rain to fall as sweet cotton candy",
          "zh": "使得倾盆大雨全部化作漫天掉落的五彩棉花糖果"
        },
        "icon": "🍭"
      },
      {
        "id": "opt-k3-cit-h7-3",
        "label": {
          "th": "ต้นไม้ช่วยดูดซับก๊าซคาร์บอนไดออกไซด์ สร้างออกซิเจนบริสุทธิ์ ลดภาวะโลกร้อน และเป็นบ้านของสัตว์ป่า 🌳 🦜",
          "en": "Trees sequester carbon dioxide, generate pure oxygen, curb global warming, and shelter wildlife",
          "zh": "树木能强力吸收二氧化碳温室气体、释放甘甜氧气、涵养水源防风固沙、缓解全球气候变暖 🌳 🦜"
        },
        "icon": "🌳"
      }
    ],
    "correctOptionId": "opt-k3-cit-h7-3",
    "explanation": {
      "th": "ต้นไม้คือปอดของโลก การปลูกต้นไม้เพียง 1 ต้นช่วยดูดซับก๊าซเรือนกระจกและให้ร่มเงาตลอดหลายสิบปี เก่งมากครับ!",
      "en": "Spot on! Reforestation stabilizes planetary climate, purifies air, and nurtures biodiversity for generations.",
      "zh": "太棒了！绿水青山就是金山银山，植树造林功在当代利在千秋，为子孙后代留下美丽宜居的地球家园！"
    }
  },
  {
    "id": "k3-cit-h8",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "การพัฒนาที่ยั่งยืน (SDGs) ระดับชั้นอนุบาล 3 ชุดที่ 8: การช่วยกัน \"ปลูกต้นไม้และเพิ่มพื้นที่สีเขียวในชุมชน\" 🌳 🌍 มีประโยชน์สูงสุดต่อโลกและมนุษย์อย่างไร?",
      "en": "K3 Global Sustainability #8: Planting trees and expanding community urban greenery 🌳 🌍: What is the grandest ecological blessing?",
      "zh": "幼儿园大班全球可持续发展理念第 8 题：全社会大力提倡“共植一片绿荫，为我们的社区与地球广植林木增添绿色” 🌳 🌍，其最伟大的生态福祉是？"
    },
    "illustration": "🌳 🌍 🌬️",
    "illustrationSubtitle": {
      "th": "การเพิ่มพื้นที่สีเขียว: ดักจับคาร์บอน ผลิตออกซิเจน ลดโลกร้อน",
      "en": "Reforestation cleans air, absorbs CO2, and curbs global warming",
      "zh": "植树造林固碳释氧，减缓气候变暖与保持水土"
    },
    "options": [
      {
        "id": "opt-k3-cit-h8-1",
        "label": {
          "th": "ต้นไม้ช่วยดูดซับก๊าซคาร์บอนไดออกไซด์ สร้างออกซิเจนบริสุทธิ์ ลดภาวะโลกร้อน และเป็นบ้านของสัตว์ป่า 🌳 🦜",
          "en": "Trees sequester carbon dioxide, generate pure oxygen, curb global warming, and shelter wildlife",
          "zh": "树木能强力吸收二氧化碳温室气体、释放甘甜氧气、涵养水源防风固沙、缓解全球气候变暖 🌳 🦜"
        },
        "icon": "🌳"
      },
      {
        "id": "opt-k3-cit-h8-2",
        "label": {
          "th": "ทำให้ฝนตกลงมาเป็นลูกอมสายไหม",
          "en": "Causes rain to fall as sweet cotton candy",
          "zh": "使得倾盆大雨全部化作漫天掉落的五彩棉花糖果"
        },
        "icon": "🍭"
      },
      {
        "id": "opt-k3-cit-h8-3",
        "label": {
          "th": "ทำให้ใบไม้บินขึ้นไปชนดวงดาวร่วงหล่น",
          "en": "Leaves fly striking stars down from heaven",
          "zh": "大树叶片脱离枝头直接像飞镖一样把天上的星星撞碎"
        },
        "icon": "⭐"
      }
    ],
    "correctOptionId": "opt-k3-cit-h8-1",
    "explanation": {
      "th": "ต้นไม้คือปอดของโลก การปลูกต้นไม้เพียง 1 ต้นช่วยดูดซับก๊าซเรือนกระจกและให้ร่มเงาตลอดหลายสิบปี เก่งมากครับ!",
      "en": "Spot on! Reforestation stabilizes planetary climate, purifies air, and nurtures biodiversity for generations.",
      "zh": "太棒了！绿水青山就是金山银山，植树造林功在当代利在千秋，为子孙后代留下美丽宜居的地球家园！"
    }
  },
  {
    "id": "k3-cit-h9",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "การพัฒนาที่ยั่งยืน (SDGs) ระดับชั้นอนุบาล 3 ชุดที่ 9: การช่วยกัน \"ปลูกต้นไม้และเพิ่มพื้นที่สีเขียวในชุมชน\" 🌳 🌍 มีประโยชน์สูงสุดต่อโลกและมนุษย์อย่างไร?",
      "en": "K3 Global Sustainability #9: Planting trees and expanding community urban greenery 🌳 🌍: What is the grandest ecological blessing?",
      "zh": "幼儿园大班全球可持续发展理念第 9 题：全社会大力提倡“共植一片绿荫，为我们的社区与地球广植林木增添绿色” 🌳 🌍，其最伟大的生态福祉是？"
    },
    "illustration": "🌳 🌍 🌬️",
    "illustrationSubtitle": {
      "th": "การเพิ่มพื้นที่สีเขียว: ดักจับคาร์บอน ผลิตออกซิเจน ลดโลกร้อน",
      "en": "Reforestation cleans air, absorbs CO2, and curbs global warming",
      "zh": "植树造林固碳释氧，减缓气候变暖与保持水土"
    },
    "options": [
      {
        "id": "opt-k3-cit-h9-1",
        "label": {
          "th": "ทำให้ฝนตกลงมาเป็นลูกอมสายไหม",
          "en": "Causes rain to fall as sweet cotton candy",
          "zh": "使得倾盆大雨全部化作漫天掉落的五彩棉花糖果"
        },
        "icon": "🍭"
      },
      {
        "id": "opt-k3-cit-h9-2",
        "label": {
          "th": "ต้นไม้ช่วยดูดซับก๊าซคาร์บอนไดออกไซด์ สร้างออกซิเจนบริสุทธิ์ ลดภาวะโลกร้อน และเป็นบ้านของสัตว์ป่า 🌳 🦜",
          "en": "Trees sequester carbon dioxide, generate pure oxygen, curb global warming, and shelter wildlife",
          "zh": "树木能强力吸收二氧化碳温室气体、释放甘甜氧气、涵养水源防风固沙、缓解全球气候变暖 🌳 🦜"
        },
        "icon": "🌳"
      },
      {
        "id": "opt-k3-cit-h9-3",
        "label": {
          "th": "ทำให้ใบไม้บินขึ้นไปชนดวงดาวร่วงหล่น",
          "en": "Leaves fly striking stars down from heaven",
          "zh": "大树叶片脱离枝头直接像飞镖一样把天上的星星撞碎"
        },
        "icon": "⭐"
      }
    ],
    "correctOptionId": "opt-k3-cit-h9-2",
    "explanation": {
      "th": "ต้นไม้คือปอดของโลก การปลูกต้นไม้เพียง 1 ต้นช่วยดูดซับก๊าซเรือนกระจกและให้ร่มเงาตลอดหลายสิบปี เก่งมากครับ!",
      "en": "Spot on! Reforestation stabilizes planetary climate, purifies air, and nurtures biodiversity for generations.",
      "zh": "太棒了！绿水青山就是金山银山，植树造林功在当代利在千秋，为子孙后代留下美丽宜居的地球家园！"
    }
  },
  {
    "id": "k3-cit-h10",
    "grade": "K3",
    "subject": "citizenship",
    "skillCode": "8",
    "difficulty": 3,
    "question": {
      "th": "การพัฒนาที่ยั่งยืน (SDGs) ระดับชั้นอนุบาล 3 ชุดที่ 10: การช่วยกัน \"ปลูกต้นไม้และเพิ่มพื้นที่สีเขียวในชุมชน\" 🌳 🌍 มีประโยชน์สูงสุดต่อโลกและมนุษย์อย่างไร?",
      "en": "K3 Global Sustainability #10: Planting trees and expanding community urban greenery 🌳 🌍: What is the grandest ecological blessing?",
      "zh": "幼儿园大班全球可持续发展理念第 10 题：全社会大力提倡“共植一片绿荫，为我们的社区与地球广植林木增添绿色” 🌳 🌍，其最伟大的生态福祉是？"
    },
    "illustration": "🌳 🌍 🌬️",
    "illustrationSubtitle": {
      "th": "การเพิ่มพื้นที่สีเขียว: ดักจับคาร์บอน ผลิตออกซิเจน ลดโลกร้อน",
      "en": "Reforestation cleans air, absorbs CO2, and curbs global warming",
      "zh": "植树造林固碳释氧，减缓气候变暖与保持水土"
    },
    "options": [
      {
        "id": "opt-k3-cit-h10-1",
        "label": {
          "th": "ทำให้ใบไม้บินขึ้นไปชนดวงดาวร่วงหล่น",
          "en": "Leaves fly striking stars down from heaven",
          "zh": "大树叶片脱离枝头直接像飞镖一样把天上的星星撞碎"
        },
        "icon": "⭐"
      },
      {
        "id": "opt-k3-cit-h10-2",
        "label": {
          "th": "ทำให้ฝนตกลงมาเป็นลูกอมสายไหม",
          "en": "Causes rain to fall as sweet cotton candy",
          "zh": "使得倾盆大雨全部化作漫天掉落的五彩棉花糖果"
        },
        "icon": "🍭"
      },
      {
        "id": "opt-k3-cit-h10-3",
        "label": {
          "th": "ต้นไม้ช่วยดูดซับก๊าซคาร์บอนไดออกไซด์ สร้างออกซิเจนบริสุทธิ์ ลดภาวะโลกร้อน และเป็นบ้านของสัตว์ป่า 🌳 🦜",
          "en": "Trees sequester carbon dioxide, generate pure oxygen, curb global warming, and shelter wildlife",
          "zh": "树木能强力吸收二氧化碳温室气体、释放甘甜氧气、涵养水源防风固沙、缓解全球气候变暖 🌳 🦜"
        },
        "icon": "🌳"
      }
    ],
    "correctOptionId": "opt-k3-cit-h10-3",
    "explanation": {
      "th": "ต้นไม้คือปอดของโลก การปลูกต้นไม้เพียง 1 ต้นช่วยดูดซับก๊าซเรือนกระจกและให้ร่มเงาตลอดหลายสิบปี เก่งมากครับ!",
      "en": "Spot on! Reforestation stabilizes planetary climate, purifies air, and nurtures biodiversity for generations.",
      "zh": "太棒了！绿水青山就是金山银山，植树造林功在当代利在千秋，为子孙后代留下美丽宜居的地球家园！"
    }
  }
];
