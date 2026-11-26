import React, { useState, useEffect, useMemo } from 'react';
import { Grade } from '../../types';
import { soundEffects, speakText } from '../../services/audioService';
import { SkillGameLevelSelector } from './SkillGameLevelSelector';
import confetti from 'canvas-confetti';
import {
  Smile,
  Frown,
  Angry,
  Sparkles,
  CheckCircle2,
  XCircle,
  Volume2,
  Heart,
  Wind,
  RotateCcw,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface EmotionDetectiveViewProps {
  currentGrade: Grade;
  soundVolume: number;
  onEarnStar?: () => void;
}

interface EmotionQuestion {
  id: string;
  grade: Grade;
  levelNumber: number;
  title: string;
  characterAvatar: string;
  characterName: string;
  scenarioText: string;
  correctEmotionName: string;
  correctEmotionEmoji: string;
  emotionOptions: {
    id: string;
    name: string;
    emoji: string;
    isCorrect: boolean;
  }[];
  calmingTechnique: {
    title: string;
    instruction: string;
    emoji: string;
  };
}

const EMOTION_QUESTIONS: EmotionQuestion[] = [
  // ================= K1 (อ.1) - 20 ด่าน =================
  {
    id: 'k1-1',
    grade: 'K1',
    levelNumber: 1,
    title: 'ด่าน 1: วันเกิดแสนวิเศษ',
    characterAvatar: '👧',
    characterName: 'น้องแก้มใส',
    scenarioText: 'คุณแม่ทำเค้กวันเกิดก้อนโตมาให้ น้องแก้มใสยิ้มกว้าง ตาเป็นประกาย',
    correctEmotionName: 'มีความสุข / ดีใจ',
    correctEmotionEmoji: '😊',
    emotionOptions: [
      { id: 'happy', name: 'มีความสุข (ดีใจ)', emoji: '😊', isCorrect: true },
      { id: 'sad', name: 'เสียใจ (ร้องไห้)', emoji: '😢', isCorrect: false },
      { id: 'angry', name: 'โกรธ (หน้าบึ้ง)', emoji: '😡', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'แบ่งปันรอยยิ้ม',
      instruction: 'ส่งยิ้มหวานๆ กอดคุณแม่ และร้องเพลงสุขสันต์วันเกิดไปด้วยกันนะจ๊ะ',
      emoji: '💖',
    },
  },
  {
    id: 'k1-2',
    grade: 'K1',
    levelNumber: 2,
    title: 'ด่าน 2: ไอศกรีมหล่นพื้น',
    characterAvatar: '👦',
    characterName: 'น้องภูผา',
    scenarioText: 'ไอศกรีมรสสตรอว์เบอร์รีหลุดมือหล่นพื้น น้องภูผาน้ำตาไหล มุมปากคว่ำลง',
    correctEmotionName: 'เสียใจ / ร้องไห้',
    correctEmotionEmoji: '😢',
    emotionOptions: [
      { id: 'happy', name: 'มีความสุข', emoji: '😊', isCorrect: false },
      { id: 'sad', name: 'เสียใจ (ร้องไห้)', emoji: '😢', isCorrect: true },
      { id: 'scared', name: 'หวาดกลัว', emoji: '😨', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'กอดอุ่นๆ ปลอบใจ',
      instruction: 'สูดหายใจลึกๆ ดื่มน้ำเย็น 1 แก้ว คุณแม่ช่วยเช็ดน้ำตาให้ ไม่เป็นไรนะลูก',
      emoji: '🤗',
    },
  },
  {
    id: 'k1-3',
    grade: 'K1',
    levelNumber: 3,
    title: 'ด่าน 3: ได้ตุ๊กตาหมีตัวโปรด',
    characterAvatar: '👧',
    characterName: 'น้องน้ำใส',
    scenarioText: 'คุณยายนำตุ๊กตาหมีขนนุ่มมาฝาก น้องน้ำใสกระโดดโลดเต้น ยิ้มร่าเริง',
    correctEmotionName: 'ตื่นเต้น / ดีใจมาก',
    correctEmotionEmoji: '😆',
    emotionOptions: [
      { id: 'excited', name: 'ตื่นเต้นดีใจ', emoji: '😆', isCorrect: true },
      { id: 'sleepy', name: 'ง่วงนอน', emoji: '😴', isCorrect: false },
      { id: 'angry', name: 'โกรธเคือง', emoji: '😡', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'กอดตุ๊กตาขอบคุณ',
      instruction: 'ยกมือไหว้ขอบคุณคุณยายอย่างสุภาพ แล้วกอดน้องหมีนุ่มๆ ไว้นะจ๊ะ',
      emoji: '🧸',
    },
  },
  {
    id: 'k1-4',
    grade: 'K1',
    levelNumber: 4,
    title: 'ด่าน 4: หกล้มหัวเข่าถลอก',
    characterAvatar: '👦',
    characterName: 'น้องต้นกล้า',
    scenarioText: 'วิ่งในสนามแล้วสะดุดหิน ล้มลงเจ็บหัวเข่า เบะปาก น้ำตาเริ่มคลอเบ้า',
    correctEmotionName: 'เจ็บปวด / เสียใจ',
    correctEmotionEmoji: '😭',
    emotionOptions: [
      { id: 'hurt', name: 'เจ็บปวด เสียใจ', emoji: '😭', isCorrect: true },
      { id: 'happy', name: 'หัวเราะชอบใจ', emoji: '😄', isCorrect: false },
      { id: 'surprised', name: 'ประหลาดใจ', emoji: '😲', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'เป่าแผลเบาๆ หายไวๆ',
      instruction: 'ลุกขึ้นนั่งช้าๆ สูดหายใจเข้า 1 2 3 บอกคุณครูช่วยทายา เดี๋ยวก็หายเจ็บแล้วจ้า',
      emoji: '🩹',
    },
  },
  {
    id: 'k1-5',
    grade: 'K1',
    levelNumber: 5,
    title: 'ด่าน 5: แย่งของเล่นชิ้นโปรด',
    characterAvatar: '👦',
    characterName: 'น้องวิน',
    scenarioText: 'เพื่อนดึงตัวต่อรถไฟไป น้องวินหน้าบึ้ง คิ้วขมวด แก้มป่อง ไม่ยอมพูดจา',
    correctEmotionName: 'โกรธ / ขุ่นเคือง',
    correctEmotionEmoji: '😡',
    emotionOptions: [
      { id: 'angry', name: 'โกรธ (ไม่พอใจ)', emoji: '😡', isCorrect: true },
      { id: 'happy', name: 'สดใสร่าเริง', emoji: '😊', isCorrect: false },
      { id: 'sleepy', name: 'อยากนอนหลับ', emoji: '😴', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'เป่าลมหายใจผ่อนคลาย',
      instruction: 'กำมือแล้วคลายออก สูดลมหายใจเข้าลึกๆ แล้วเป่าออกทางปาก ใจเย็นลงแล้วชวนเพื่อนแบ่งกันเล่นนะ',
      emoji: '🌬️',
    },
  },
  {
    id: 'k1-6',
    grade: 'K1',
    levelNumber: 6,
    title: 'ด่าน 6: ฟ้าร้องเสียงดังสนั่น',
    characterAvatar: '👧',
    characterName: 'น้องมะลิ',
    scenarioText: 'ฝนตกหนัก มีเสียงฟ้าร้องเปรี้ยง น้องมะลิตัวสั่น เอาสองมืออุดหู ตาโต',
    correctEmotionName: 'หวาดกลัว / ตกใจ',
    correctEmotionEmoji: '😨',
    emotionOptions: [
      { id: 'scared', name: 'หวาดกลัว ตกใจ', emoji: '😨', isCorrect: true },
      { id: 'angry', name: 'โมโหฉุนเฉียว', emoji: '😠', isCorrect: false },
      { id: 'happy', name: 'สนุกสนาน', emoji: '😁', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'กอดคุณครูอบอุ่น',
      instruction: 'จับมือคุณครูหรือเพื่อนไว้ เราอยู่ในห้องเรียนปลอดภัย ฟ้าร้องทำอะไรเราไม่ได้จ้า',
      emoji: '🤗',
    },
  },
  {
    id: 'k1-7',
    grade: 'K1',
    levelNumber: 7,
    title: 'ด่าน 7: ฟังเพลงกล่อมเด็กยามบ่าย',
    characterAvatar: '👦',
    characterName: 'น้องข้าวปั้น',
    scenarioText: 'เสียงเพลงบรรเลงนุ่มนวลเปิดเบาๆ แอร์เย็นสบาย น้องข้าวปั้นหาวหวอด ตาเริ่มปรือ',
    correctEmotionName: 'ง่วงนอน / ผ่อนคลาย',
    correctEmotionEmoji: '😴',
    emotionOptions: [
      { id: 'sleepy', name: 'ง่วงนอน ผ่อนคลาย', emoji: '😴', isCorrect: true },
      { id: 'excited', name: 'กระโดดโลดเต้น', emoji: '🤩', isCorrect: false },
      { id: 'angry', name: 'หงุดหงิด', emoji: '😤', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'นอนหลับฝันดี',
      instruction: 'หลับตาสบายๆ หายใจเข้า-ออกช้าๆ ให้ร่างกายได้พักผ่อนอย่างเต็มอิ่มนะลูก',
      emoji: '🌙',
    },
  },
  {
    id: 'k1-8',
    grade: 'K1',
    levelNumber: 8,
    title: 'ด่าน 8: คุณแม่มารับกลับบ้าน',
    characterAvatar: '👧',
    characterName: 'น้องพิมพ์',
    scenarioText: 'เห็นคุณแม่โบกมืออยู่หน้าประตูห้องเรียน น้องพิมพ์ยิ้มแป้น วิ่งไปกอดขาคุณแม่',
    correctEmotionName: 'อบอุ่นใจ / ดีใจ',
    correctEmotionEmoji: '🥰',
    emotionOptions: [
      { id: 'warm', name: 'อบอุ่นใจ ดีใจ', emoji: '🥰', isCorrect: true },
      { id: 'sad', name: 'เศร้าหมอง', emoji: '😢', isCorrect: false },
      { id: 'scared', name: 'หวาดผวา', emoji: '😱', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'ไหว้สวัสดีคุณแม่',
      instruction: 'ยกมือไหว้อย่างสวยงาม พูดว่า "สวัสดีค่ะคุณแม่" แล้วกอดกันแน่นๆ นะจ๊ะ',
      emoji: '🙏',
    },
  },
  {
    id: 'k1-9',
    grade: 'K1',
    levelNumber: 9,
    title: 'ด่าน 9: ลูกโป่งสวรรค์หลุดลอยขึ้นฟ้า',
    characterAvatar: '👦',
    characterName: 'น้องพีช',
    scenarioText: 'เชือกลูกโป่งหลุดมือ ลอยขึ้นไปบนก้อนเมฆ น้องพีชแหงนมองตาละห้อย ปากเบะลง',
    correctEmotionName: 'เสียดาย / เศร้าใจ',
    correctEmotionEmoji: '😞',
    emotionOptions: [
      { id: 'sad', name: 'เสียดาย เศร้าใจ', emoji: '😞', isCorrect: true },
      { id: 'happy', name: 'ร่าเริงยินดี', emoji: '😄', isCorrect: false },
      { id: 'angry', name: 'เคียดแค้น', emoji: '😡', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'โบกมือบ๊ายบายลูกโป่ง',
      instruction: 'โบกมือบ๊ายบายส่งลูกโป่งไปเที่ยวบนท้องฟ้า ไม่เป็นไรนะ คราวหน้าจับให้แน่นขึ้นจ้า',
      emoji: '🎈',
    },
  },
  {
    id: 'k1-10',
    grade: 'K1',
    levelNumber: 10,
    title: 'ด่าน 10: สุนัขตัวโตเห่าเสียงดัง',
    characterAvatar: '👧',
    characterName: 'น้องแพร',
    scenarioText: 'เดินผ่านหน้ารั้ว สุนัขตัวใหญ่เห่า "โฮ่ง!" เสียงดัง น้องแพรสะดุ้งสุดตัว ถอยหลังไปหลบหลังแม่',
    correctEmotionName: 'ตกใจ / กลัว',
    correctEmotionEmoji: '😨',
    emotionOptions: [
      { id: 'scared', name: 'ตกใจ กลัว', emoji: '😨', isCorrect: true },
      { id: 'sleepy', name: 'เซื่องซึม', emoji: '😴', isCorrect: false },
      { id: 'happy', name: 'หัวเราะเริงร่า', emoji: '😆', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'จับมือคุณแม่แน่นๆ',
      instruction: 'เกาะมือคุณแม่ไว้ เดินผ่านไปช้าๆ ไม่ต้องวิ่ง เดี๋ยวคุณหมาก็หยุดเห่าแล้วจ้า',
      emoji: '🤝',
    },
  },
  {
    id: 'k1-11',
    grade: 'K1',
    levelNumber: 11,
    title: 'ด่าน 11: ได้ชิมแตงโมหวานฉ่ำ',
    characterAvatar: '👦',
    characterName: 'น้องกัส',
    scenarioText: 'หลังวิ่งเล่นเหนื่อยๆ คุณครูแจกแตงโมสีแดงหวานเจี๊ยบ น้องกัสกัดคำโต เคี้ยวตุ้ยๆ ยิ้มแก้มตุ่ย',
    correctEmotionName: 'อร่อย / สดชื่น',
    correctEmotionEmoji: '😋',
    emotionOptions: [
      { id: 'yummy', name: 'อร่อย สดชื่น', emoji: '😋', isCorrect: true },
      { id: 'angry', name: 'ไม่พอใจ', emoji: '😠', isCorrect: false },
      { id: 'sad', name: 'ร้องไห้', emoji: '😢', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'เคี้ยวช้าๆ อย่างมีความสุข',
      instruction: 'เคี้ยวแตงโมละเอียดๆ ระวังเม็ด แล้วดื่มน้ำตาม สดชื่นกระปรี้กระเปร่าจ้า',
      emoji: '🍉',
    },
  },
  {
    id: 'k1-12',
    grade: 'K1',
    levelNumber: 12,
    title: 'ด่าน 12: คุณครูชมว่าวาดรูปสวย',
    characterAvatar: '👧',
    characterName: 'น้องใบเตย',
    scenarioText: 'คุณครูยกภาพวาดดอกไม้ของน้องใบเตยให้เพื่อนดูแล้วชม น้องใบเตยยิ้มเอียงอาย แก้มแดงระเรื่อ',
    correctEmotionName: 'เขินอาย / ภูมิใจ',
    correctEmotionEmoji: '☺️',
    emotionOptions: [
      { id: 'shy_proud', name: 'เขินอาย ภูมิใจ', emoji: '☺️', isCorrect: true },
      { id: 'angry', name: 'โกรธจัด', emoji: '😡', isCorrect: false },
      { id: 'scared', name: 'หวาดกลัว', emoji: '😨', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'ยิ้มรับคำชม',
      instruction: 'ยกมือไหว้ขอบคุณคุณครูอย่างน่ารัก แล้วตั้งใจฝึกฝนวาดรูปต่อไปนะจ๊ะ',
      emoji: '🌸',
    },
  },
  {
    id: 'k1-13',
    grade: 'K1',
    levelNumber: 13,
    title: 'ด่าน 13: ของเล่นที่อยากเล่นมีคนเล่นอยู่',
    characterAvatar: '👦',
    characterName: 'น้องกันต์',
    scenarioText: 'อยากเล่นม้าโยก แต่น้องโอ๊คกำลังเล่นอยู่ น้องกันต์ยืนเม้มปาก เท้าสะเอวมอง',
    correctEmotionName: 'อยากเล่น / รอคอย',
    correctEmotionEmoji: '🥺',
    emotionOptions: [
      { id: 'waiting', name: 'อยากเล่น / รอคอย', emoji: '🥺', isCorrect: true },
      { id: 'happy', name: 'ยินดีปรีดา', emoji: '😄', isCorrect: false },
      { id: 'sleepy', name: 'หลับสบาย', emoji: '😴', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'อดทนรอคอยเข้าคิว',
      instruction: 'นับ 1 ถึง 10 ในใจ หรือไปเล่นของเล่นชิ้นอื่นรอ เดี๋ยวก็ได้เล่นแล้วจ้า',
      emoji: '⏳',
    },
  },
  {
    id: 'k1-14',
    grade: 'K1',
    levelNumber: 14,
    title: 'ด่าน 14: ได้ลูกโป่งรูปกระต่าย',
    characterAvatar: '👧',
    characterName: 'น้องเนย',
    scenarioText: 'ตัวตลกบิดลูกโป่งเป็นรูปกระต่ายสีชมพูยื่นให้ น้องเนยตาโต อ้าปากว้าว ยิ้มไม่หุบ',
    correctEmotionName: 'ตื่นตาตื่นใจ / ดีใจ',
    correctEmotionEmoji: '😍',
    emotionOptions: [
      { id: 'amazed', name: 'ตื่นตาตื่นใจ ดีใจ', emoji: '😍', isCorrect: true },
      { id: 'sad', name: 'หม่นหมอง', emoji: '😢', isCorrect: false },
      { id: 'angry', name: 'ฉุนเฉียว', emoji: '😡', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'ทะนุถนอมของขวัญ',
      instruction: 'ถือเชือกลูกโป่งให้แน่นๆ ระวังโดนของแหลม แล้วพากระต่ายไปอวดคุณแม่นะจ๊ะ',
      emoji: '🐰',
    },
  },
  {
    id: 'k1-15',
    grade: 'K1',
    levelNumber: 15,
    title: 'ด่าน 15: ฝนตกอดออกไปวิ่งเล่นสนาม',
    characterAvatar: '👦',
    characterName: 'น้องบอส',
    scenarioText: 'กำลังจะไปเล่นสไลเดอร์ แต่ฝนเทลงมาจั้กกวาง น้องบอสถอนหายใจ นั่งเท้าคางมองหน้าต่าง',
    correctEmotionName: 'เบื่อหน่าย / ผิดหวัง',
    correctEmotionEmoji: '🥱',
    emotionOptions: [
      { id: 'bored', name: 'เบื่อหน่าย ผิดหวัง', emoji: '🥱', isCorrect: true },
      { id: 'excited', name: 'สนุกสุดเหวี่ยง', emoji: '😆', isCorrect: false },
      { id: 'scared', name: 'ตื่นตระหนก', emoji: '😨', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'หากิจกรรมในร่มสนุกๆ ทำ',
      instruction: 'หยิบกระดาษมาพับเรือใบหรือวาดภาพสายรุ้ง เล่นในห้องก็สนุกได้เหมือนกันนะ',
      emoji: '🎨',
    },
  },
  {
    id: 'k1-16',
    grade: 'K1',
    levelNumber: 16,
    title: 'ด่าน 16: ได้กอดคุณยายที่ไม่ได้เจอกันนาน',
    characterAvatar: '👧',
    characterName: 'น้องพลอย',
    scenarioText: 'คุณยายเดินทางมาจากต่างจังหวัด น้องพลอยโผเข้ากอดคุณยายแน่น น้ำตาซึมด้วยความรัก',
    correctEmotionName: 'คิดถึง / ซาบซึ้งใจ',
    correctEmotionEmoji: '🥺',
    emotionOptions: [
      { id: 'loving', name: 'คิดถึง ซาบซึ้งใจ', emoji: '🥺', isCorrect: true },
      { id: 'angry', name: 'เคืองโกรธ', emoji: '😠', isCorrect: false },
      { id: 'scared', name: 'กลัวเกรง', emoji: '😨', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'หอมแก้มคุณยาย',
      instruction: 'หอมแก้มคุณยายฟอดใหญ่ แล้วเล่าเรื่องสนุกๆ ที่โรงเรียนให้คุณยายฟังอย่างมีความสุข',
      emoji: '👵',
    },
  },
  {
    id: 'k1-17',
    grade: 'K1',
    levelNumber: 17,
    title: 'ด่าน 17: เพื่อนแบ่งขนมเค้กให้กิน',
    characterAvatar: '👦',
    characterName: 'น้องแทน',
    scenarioText: 'น้องแทนไม่มีขนม เพื่อนยื่นคุกกี้ชิ้นโตให้ น้องแทนยิ้มกว้าง แววตาเป็นประกายขอบคุณ',
    correctEmotionName: 'ซาบซึ้ง / ดีใจ',
    correctEmotionEmoji: '🥰',
    emotionOptions: [
      { id: 'grateful', name: 'ซาบซึ้ง ดีใจ', emoji: '🥰', isCorrect: true },
      { id: 'angry', name: 'ไม่พอใจ', emoji: '😡', isCorrect: false },
      { id: 'sleepy', name: 'ง่วงเหงา', emoji: '😴', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'กล่าวขอบคุณด้วยรอยยิ้ม',
      instruction: 'พูดว่า "ขอบใจนะจ๊ะ" แล้วแบ่งปันความสุขร่วมกัน มิตรภาพสวยงามเสมอ',
      emoji: '🍪',
    },
  },
  {
    id: 'k1-18',
    grade: 'K1',
    levelNumber: 18,
    title: 'ด่าน 18: ชิงช้าแกว่งสูงเกินไป',
    characterAvatar: '👧',
    characterName: 'น้องทิพย์',
    scenarioText: 'ชิงช้าแกว่งลอยขึ้นสูง น้องทิพย์เกาะเชือกแน่น หลับตาปี๋ หัวใจเต้นตึกตัก',
    correctEmotionName: 'หวาดเสียว / กลัว',
    correctEmotionEmoji: '😣',
    emotionOptions: [
      { id: 'frightened', name: 'หวาดเสียว กลัว', emoji: '😣', isCorrect: true },
      { id: 'happy', name: 'หัวเราะชอบใจ', emoji: '😊', isCorrect: false },
      { id: 'angry', name: 'ฉุนเฉียว', emoji: '😠', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'บอกให้แกว่งช้าลง',
      instruction: 'ตะโกนบอกเพื่อนเบาๆ ว่า "แกว่งช้าลงหน่อยจ้า" แล้วค่อยๆ ใช้เท้ายันพื้นหยุดชิงช้า',
      emoji: '🎪',
    },
  },
  {
    id: 'k1-19',
    grade: 'K1',
    levelNumber: 19,
    title: 'ด่าน 19: เล่นน้ำสงกรานต์กับเพื่อนๆ',
    characterAvatar: '👦',
    characterName: 'น้องโอม',
    scenarioText: 'ละอองน้ำเย็นฉ่ำสาดใส่ น้องโอมหัวเราะลั่น กระโดดหลบน้ำอย่างสนุกสนาน',
    correctEmotionName: 'ร่าเริง / มีความสุขมาก',
    correctEmotionEmoji: '😆',
    emotionOptions: [
      { id: 'joyful', name: 'ร่าเริง มีความสุข', emoji: '😆', isCorrect: true },
      { id: 'sad', name: 'เศร้าซึม', emoji: '😢', isCorrect: false },
      { id: 'angry', name: 'โกรธเกรี้ยว', emoji: '😡', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'เช็ดหน้าเช็ดตาให้แห้ง',
      instruction: 'เล่นเสร็จแล้วใช้ผ้าขนหนูเช็ดตัวให้แห้ง เปลี่ยนเสื้อผ้าเพื่อสุขภาพที่ดีนะจ๊ะ',
      emoji: '💦',
    },
  },
  {
    id: 'k1-20',
    grade: 'K1',
    levelNumber: 20,
    title: 'ด่าน 20: พิชิต 20 ด่านนักสืบสีหน้า K1',
    characterAvatar: '👧',
    characterName: 'น้องแก้มใส & เพื่อนๆ',
    scenarioText: 'เด็กๆ ทุกคนจับมือล้อมวง ร้องเพลงจบการเล่น ยิ้มแย้มสดใส หัวใจเบิกบาน',
    correctEmotionName: 'ภาคภูมิใจ / สุขล้นใจ',
    correctEmotionEmoji: '🥰',
    emotionOptions: [
      { id: 'proud_happy', name: 'ภาคภูมิใจ สุขล้นใจ', emoji: '🥰', isCorrect: true },
      { id: 'angry', name: 'ขุ่นเคือง', emoji: '😡', isCorrect: false },
      { id: 'scared', name: 'หวาดผวา', emoji: '😨', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'ปรบมือให้ตนเอง',
      instruction: 'ปรบมือรัวๆ ให้ตัวเองและเพื่อนๆ หนูคือสุดยอดนักสืบสีหน้าระดับแชมเปี้ยน!',
      emoji: '🏆',
    },
  },

  // ================= K2 (อ.2) - 20 ด่าน =================
  {
    id: 'k2-1',
    grade: 'K2',
    levelNumber: 1,
    title: 'ด่าน 1: โดนแย่งของเล่นกะทันหัน',
    characterAvatar: '👦',
    characterName: 'น้องวิน',
    scenarioText: 'กำลังต่อรถไฟอยู่ดีๆ มีเพื่อนวิ่งมาแย่งรถไฟไป น้องวินคิ้วขมวด แก้มแดงก่ำ กำหมัดแน่น',
    correctEmotionName: 'โกรธ / ขุ่นเคือง',
    correctEmotionEmoji: '😡',
    emotionOptions: [
      { id: 'angry', name: 'โกรธ (ไม่พอใจ)', emoji: '😡', isCorrect: true },
      { id: 'sleepy', name: 'ง่วงนอน', emoji: '😴', isCorrect: false },
      { id: 'happy', name: 'ดีใจ', emoji: '😄', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'เทคนิคเป่าเทียนวันเกิด 3 ฟู่',
      instruction: 'เมื่อโกรธ อย่าเพิ่งตีหรือแย่งคืน สูดลมหายใจเข้าลึกๆ แล้วเป่าลมออกทางปาก ฟู่... ฟู่... ฟู่... ใจจะเย็นลงจ้า',
      emoji: '🕯️',
    },
  },
  {
    id: 'k2-2',
    grade: 'K2',
    levelNumber: 2,
    title: 'ด่าน 2: เสียงฟ้าร้องดังเปรี้ยง!',
    characterAvatar: '👧',
    characterName: 'น้องมะลิ',
    scenarioText: 'ฝนตกหนัก มีเสียงฟ้าร้องดังสนั่น น้องมะลิตัวสั่น เอามือปิดหู ตาเบิกกว้าง',
    correctEmotionName: 'หวาดกลัว / ตกใจ',
    correctEmotionEmoji: '😨',
    emotionOptions: [
      { id: 'scared', name: 'หวาดกลัว (ตกใจ)', emoji: '😨', isCorrect: true },
      { id: 'happy', name: 'ร่าเริง', emoji: '😆', isCorrect: false },
      { id: 'bored', name: 'เบื่อหน่าย', emoji: '😑', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'กอดตุ๊กตาตัวโปรด',
      instruction: 'จับมือคุณครูหรือกอดตุ๊กตานุ่มๆ ฟ้าร้องอยู่ในก้อนเมฆ เราอยู่ในบ้านปลอดภัยแล้วนะจ๊ะ',
      emoji: '🧸',
    },
  },
  {
    id: 'k2-3',
    grade: 'K2',
    levelNumber: 3,
    title: 'ด่าน 3: ต้องออกไปพูดหน้าชั้นเรียน',
    characterAvatar: '👦',
    characterName: 'น้องภูผา',
    scenarioText: 'คุณครูเรียกให้ออกไปเล่าเรื่องวันหยุดหน้าห้อง น้องภูผาบิดมือไปมา ยิ้มแห้งๆ ก้มหน้ามองเท้า',
    correctEmotionName: 'ประหม่า / เขินอาย',
    correctEmotionEmoji: '😳',
    emotionOptions: [
      { id: 'nervous', name: 'ประหม่า เขินอาย', emoji: '😳', isCorrect: true },
      { id: 'angry', name: 'โมโหฉุนเฉียว', emoji: '😡', isCorrect: false },
      { id: 'sleepy', name: 'ง่วงซึม', emoji: '😴', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'สูดหายใจลึกๆ ยืดอกมั่นใจ',
      instruction: 'สูดหายใจลึกๆ 3 ครั้ง สบตาคุณครู ยิ้มหวานๆ แล้วเล่าเรื่องสนุกๆ ให้เพื่อนฟังจ้า',
      emoji: '🌟',
    },
  },
  {
    id: 'k2-4',
    grade: 'K2',
    levelNumber: 4,
    title: 'ด่าน 4: เห็นเพื่อนมีกล่องดินสอไฟกะพริบใหม่',
    characterAvatar: '👧',
    characterName: 'น้องฟ้าใส',
    scenarioText: 'เพื่อนมีกล่องดินสอวิเศษมีไฟวิบวับ น้องฟ้าใสมองตาละห้อย ในใจอยากได้บ้าง รู้สึกน้อยใจ',
    correctEmotionName: 'อิจฉา / อยากมีบ้าง',
    correctEmotionEmoji: '🥺',
    emotionOptions: [
      { id: 'jealous', name: 'อิจฉา / อยากได้บ้าง', emoji: '🥺', isCorrect: true },
      { id: 'angry', name: 'โกรธแค้น', emoji: '😠', isCorrect: false },
      { id: 'happy', name: 'ยินดีสุดขีด', emoji: '😆', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'ชื่นชมของเพื่อนและรักของตนเอง',
      instruction: 'ชมเพื่อนว่า "กล่องดินสอน่ารักจัง" แล้วมองดูของตัวเอง สิ่งที่เรามีก็น่ารักและมีประโยชน์เช่นกันจ้า',
      emoji: '✏️',
    },
  },
  {
    id: 'k2-5',
    grade: 'K2',
    levelNumber: 5,
    title: 'ด่าน 5: แอบทำแจกันดอกไม้คุณแม่ตกแตก',
    characterAvatar: '👦',
    characterName: 'น้องอาร์ต',
    scenarioText: 'เผลอเตะลูกบอลโดนแจกันแตก น้องอาร์ตตาโต เอามือกุมปาก หัวใจเต้นตึกตัก กลัวคุณแม่ดุ',
    correctEmotionName: 'รู้สึกผิด / กังวลใจ',
    correctEmotionEmoji: '😰',
    emotionOptions: [
      { id: 'guilty', name: 'รู้สึกผิด กังวลใจ', emoji: '😰', isCorrect: true },
      { id: 'happy', name: 'สะใจหัวเราะ', emoji: '😝', isCorrect: false },
      { id: 'sleepy', name: 'ง่วงนอน', emoji: '😴', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'ยอมรับผิดและขอโทษด้วยความจริงใจ',
      instruction: 'อย่าเพิ่งจับเศษแก้ว รีบไปบอกคุณแม่ด้วยความจริงใจว่า "หนูขอโทษครับ หนูไม่ได้ตั้งใจ"',
      emoji: '🙏',
    },
  },
  {
    id: 'k2-6',
    grade: 'K2',
    levelNumber: 6,
    title: 'ด่าน 6: ต่อเลโก้บ้านในฝันเสร็จสมบูรณ์',
    characterAvatar: '👧',
    characterName: 'น้องมายด์',
    scenarioText: 'ตั้งใจต่อเลโก้มาเป็นชั่วโมง ในที่สุดปราสาทก็เสร็จสวยงาม น้องมายด์ยิ้มกว้าง ปรบมือรัวๆ',
    correctEmotionName: 'ภาคภูมิใจ / สำเร็จ',
    correctEmotionEmoji: '🥰',
    emotionOptions: [
      { id: 'proud', name: 'ภาคภูมิใจ สำเร็จ', emoji: '🥰', isCorrect: true },
      { id: 'sad', name: 'ผิดหวัง', emoji: '😞', isCorrect: false },
      { id: 'angry', name: 'หงุดหงิด', emoji: '😤', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'ชวนเพื่อนมาชื่นชม',
      instruction: 'ถ่ายรูปเก็บไว้เป็นที่ระลึก และชวนเพื่อนๆ มาร่วมเล่นอย่างมีความสุข',
      emoji: '🏰',
    },
  },
  {
    id: 'k2-7',
    grade: 'K2',
    levelNumber: 7,
    title: 'ด่าน 7: นั่งมองวิวริมทะเลลมพัดเย็น',
    characterAvatar: '👦',
    characterName: 'น้องเจมส์',
    scenarioText: 'นั่งบนผืนทราย ฟังเสียงคลื่นซัดเบาๆ ลมทะเลพัดผ่าน น้องเจมส์ยิ้มบางๆ หลับตาสบายใจ',
    correctEmotionName: 'สงบ / ผ่อนคลาย',
    correctEmotionEmoji: '😌',
    emotionOptions: [
      { id: 'peaceful', name: 'สงบ ผ่อนคลาย', emoji: '😌', isCorrect: true },
      { id: 'excited', name: 'ลนลานตื่นตระหนก', emoji: '😱', isCorrect: false },
      { id: 'angry', name: 'โมโหฉุนเฉียว', emoji: '😡', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'หายใจรับลมทะเล',
      instruction: 'สูดลมหายใจบริสุทธิ์เข้าลึกๆ ผ่อนลมหายใจออกช้าๆ ให้จิตใจสงบเย็นดั่งสายน้ำ',
      emoji: '🌊',
    },
  },
  {
    id: 'k2-8',
    grade: 'K2',
    levelNumber: 8,
    title: 'ด่าน 8: ถูกเพื่อนผลักล้มตอนเล่นวิ่งไล่จับ',
    characterAvatar: '👦',
    characterName: 'น้องเต้',
    scenarioText: 'วิ่งเล่นอยู่ดีๆ เพื่อนผลักจนล้มเปื้อนฝุ่น น้องเต้ลุกขึ้นมาหน้าแดง กำหมัดแน่น มองตาเขม็ง',
    correctEmotionName: 'โกรธเคือง / เจ็บใจ',
    correctEmotionEmoji: '😠',
    emotionOptions: [
      { id: 'angry', name: 'โกรธเคือง เจ็บใจ', emoji: '😠', isCorrect: true },
      { id: 'happy', name: 'สนุกสนาน', emoji: '😊', isCorrect: false },
      { id: 'bored', name: 'เบื่อหน่าย', emoji: '😑', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'หยุดนิ่ง 5 วินาทีก่อนพูด',
      instruction: 'อย่าเพิ่งผลักเพื่อนคืน นับ 1 ถึง 5 บอกเพื่อนตรงๆ ว่า "อย่าผลักนะเราเจ็บ" หรือบอกคุณครู',
      emoji: '🛑',
    },
  },
  {
    id: 'k2-9',
    grade: 'K2',
    levelNumber: 9,
    title: 'ด่าน 9: เพื่อนคนโปรดต้องย้ายโรงเรียน',
    characterAvatar: '👧',
    characterName: 'น้องโบว์',
    scenarioText: 'เพื่อนสนิทต้องย้ายบ้านไปต่างจังหวัด น้องโบว์กอดเพื่อนแน่น น้ำตาไหลพราก ไม่อยากจากกัน',
    correctEmotionName: 'เศร้าโศก / อาลัย',
    correctEmotionEmoji: '😢',
    emotionOptions: [
      { id: 'sad', name: 'เศร้าโศก อาลัย', emoji: '😢', isCorrect: true },
      { id: 'happy', name: 'ยินดีที่เพื่อนไป', emoji: '😄', isCorrect: false },
      { id: 'angry', name: 'โกรธเพื่อน', emoji: '😠', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'เขียนการ์ดอวยพรความทรงจำ',
      instruction: 'วาดภาพและเขียนการ์ดมอบให้เพื่อน แม้ตัวไกลแต่มิตรภาพยังอยู่ในใจเสมอจ้า',
      emoji: '💌',
    },
  },
  {
    id: 'k2-10',
    grade: 'K2',
    levelNumber: 10,
    title: 'ด่าน 10: คุณครูทำมายากลเสกนกพิราบ',
    characterAvatar: '👦',
    characterName: 'น้องซี',
    scenarioText: 'คุณครูดึงผ้าคลุมออก แล้วมีนกพิราบสีขาวบินพรึ่บออกมา น้องซีตาค้าง อ้าปากกว้าง ตบมือรัวๆ',
    correctEmotionName: 'ประหลาดใจ / ทึ่งมาก',
    correctEmotionEmoji: '😲',
    emotionOptions: [
      { id: 'surprised', name: 'ประหลาดใจ ทึ่งมาก', emoji: '😲', isCorrect: true },
      { id: 'sleepy', name: 'ง่วงซึม', emoji: '😴', isCorrect: false },
      { id: 'sad', name: 'เศร้าสลด', emoji: '😞', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'สงสัยและเรียนรู้',
      instruction: 'ส่งเสียงเชียร์ ปรบมือให้คุณครู และตั้งคำถามด้วยความอยากรู้อยากเห็นทางวิทยาศาสตร์',
      emoji: '🪄',
    },
  },
  {
    id: 'k2-11',
    grade: 'K2',
    levelNumber: 11,
    title: 'ด่าน 11: อาหารกลางวันเป็นผักขมที่หนูไม่ชอบ',
    characterAvatar: '👧',
    characterName: 'น้องออย',
    scenarioText: 'ตักผักมะระขมเข้าปาก น้องออยย่นจมูก หยีตา เบือนหน้าหนี แลบลิ้นออกมา',
    correctEmotionName: 'รังเกียจ / ไม่ชอบรสชาติ',
    correctEmotionEmoji: '😣',
    emotionOptions: [
      { id: 'disgusted', name: 'รังเกียจ ไม่ชอบ', emoji: '😣', isCorrect: true },
      { id: 'happy', name: 'เอร็ดอร่อย', emoji: '😋', isCorrect: false },
      { id: 'scared', name: 'หวาดกลัว', emoji: '😨', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'ดื่มน้ำตามและเปิดใจลองคำเล็กๆ',
      instruction: 'ดื่มน้ำสะอาดตาม ดมกลิ่นอาหาร และจำไว้ว่าผักมีวิตามินบำรุงร่างกายให้แข็งแรงนะจ๊ะ',
      emoji: '🥦',
    },
  },
  {
    id: 'k2-12',
    grade: 'K2',
    levelNumber: 12,
    title: 'ด่าน 12: กางเกงขาดตอนเล่นปีนป่าย',
    characterAvatar: '👦',
    characterName: 'น้องนนท์',
    scenarioText: 'ปีนเครื่องเล่นแล้วกางเกงเกี่ยวกับตะปูจนขาดเป็นรู น้องนนท์เอามือปิดก้น หน้าแดงก่ำ อายเพื่อน',
    correctEmotionName: 'อับอาย / เขิน',
    correctEmotionEmoji: '😳',
    emotionOptions: [
      { id: 'embarrassed', name: 'อับอาย เขิน', emoji: '😳', isCorrect: true },
      { id: 'proud', name: 'ภาคภูมิใจ', emoji: '🥰', isCorrect: false },
      { id: 'angry', name: 'ด่าทอเพื่อน', emoji: '😡', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'บอกคุณครูช่วยเปลี่ยนชุด',
      instruction: 'ไม่ต้องกังวลใจไป อุบัติเหตุเกิดขึ้นได้ รีบเดินไปบอกคุณครูช่วยนำกางเกงสำรองมาเปลี่ยนจ้า',
      emoji: '🩳',
    },
  },
  {
    id: 'k2-13',
    grade: 'K2',
    levelNumber: 13,
    title: 'ด่าน 13: หาแม่ไม่เจอในห้างสรรพสินค้า',
    characterAvatar: '👧',
    characterName: 'น้องน้ำ',
    scenarioText: 'หันไปดูของเล่นแป๊บเดียว หันกลับมาไม่เจอแม่ น้องน้ำตาเบิกกว้าง หัวใจเต้นรัว เริ่มน้ำตาไหล',
    correctEmotionName: 'ตื่นตระหนก / หวาดกลัว',
    correctEmotionEmoji: '😱',
    emotionOptions: [
      { id: 'panicked', name: 'ตื่นตระหนก หวาดกลัว', emoji: '😱', isCorrect: true },
      { id: 'sleepy', name: 'ง่วงนอน', emoji: '😴', isCorrect: false },
      { id: 'happy', name: 'ดีใจที่อยู่คนเดียว', emoji: '😆', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'ยืนอยู่กับที่และมองหาพี่พนักงาน',
      instruction: 'อย่าวิ่งสะเปะสะปะ ยืนนิ่งๆ อยู่กับที่ หรือเดินไปหาพี่พนักงานแคชเชียร์ช่วยประกาศตามหาแม่',
      emoji: '🏬',
    },
  },
  {
    id: 'k2-14',
    grade: 'K2',
    levelNumber: 14,
    title: 'ด่าน 14: ได้รางวัลเด็กดีประจำสัปดาห์',
    characterAvatar: '👦',
    characterName: 'น้องบีม',
    scenarioText: 'คุณครูติดดาวทองคนดีบนเสื้อ น้องบีมยืดอกตรง ยิ้มปลื้มใจอย่างอบอุ่นและมั่นใจ',
    correctEmotionName: 'ภาคภูมิใจ / มีกำลังใจ',
    correctEmotionEmoji: '🥰',
    emotionOptions: [
      { id: 'proud', name: 'ภาคภูมิใจ มีกำลังใจ', emoji: '🥰', isCorrect: true },
      { id: 'sad', name: 'เสียใจ', emoji: '😢', isCorrect: false },
      { id: 'angry', name: 'ไม่พอใจ', emoji: '😡', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'รักษาความดีอย่างสม่ำเสมอ',
      instruction: 'ยิ้มขอบคุณคุณครูและมุ่งมั่นทำความดี ช่วยเหลือเพื่อนๆ ต่อไปอย่างถ่อมตน',
      emoji: '⭐',
    },
  },
  {
    id: 'k2-15',
    grade: 'K2',
    levelNumber: 15,
    title: 'ด่าน 15: ฝนตกฟ้าร้องจนไฟดับมืดมิด',
    characterAvatar: '👧',
    characterName: 'น้องมีนา',
    scenarioText: 'ในห้องเรียนมืดสนิททันที น้องมีนาตัวแข็งทื่อ คว้าแขนเพื่อนข้างๆ แน่น ขนลุกซู่',
    correctEmotionName: 'กลัวความมืด / หวาดผวา',
    correctEmotionEmoji: '😨',
    emotionOptions: [
      { id: 'scared', name: 'กลัวความมืด หวาดผวา', emoji: '😨', isCorrect: true },
      { id: 'happy', name: 'หัวเราะชอบใจ', emoji: '😆', isCorrect: false },
      { id: 'bored', name: 'เบื่อหน่าย', emoji: '😑', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'จับมือเพื่อนร้องเพลงรอไฟมา',
      instruction: 'จับมือกันเป็นวงกลม คุณครูจะจุดไฟฉาย ร้องเพลงไปด้วยกัน เดี๋ยวไฟก็ติดแล้วจ้า',
      emoji: '🔦',
    },
  },
  {
    id: 'k2-16',
    grade: 'K2',
    levelNumber: 16,
    title: 'ด่าน 16: ถูกสั่งให้ทำการบ้านก่อนออกไปเล่น',
    characterAvatar: '👦',
    characterName: 'น้องเคน',
    scenarioText: 'อยากออกไปเตะบอลแต่คุณแม่บอกให้ทำการบ้านให้เสร็จก่อน น้องเคนทำแก้มป่อง ถอนหายใจเฮือก',
    correctEmotionName: 'ขัดใจ / อึดอัด',
    correctEmotionEmoji: '😤',
    emotionOptions: [
      { id: 'frustrated', name: 'ขัดใจ อึดอัด', emoji: '😤', isCorrect: true },
      { id: 'happy', name: 'ดีใจล้นพ้น', emoji: '😊', isCorrect: false },
      { id: 'scared', name: 'ตกใจกลัว', emoji: '😱', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'ตั้งใจทำแป๊บเดียวเสร็จ',
      instruction: 'ยิ่งเริ่มทำเร็ว ยิ่งเสร็จไว ตั้งสมาธิทำ 10 นาที เสร็จแล้วค่อยออกไปเล่นอย่างสบายใจนะ',
      emoji: '⚽',
    },
  },
  {
    id: 'k2-17',
    grade: 'K2',
    levelNumber: 17,
    title: 'ด่าน 17: เพื่อนทำภาพวาดของเราขาดโดยไม่ได้ตั้งใจ',
    characterAvatar: '👧',
    characterName: 'น้องเค้ก',
    scenarioText: 'รูปคุณแม่ที่เพิ่งวาดเสร็จ เพื่อนเผลอเดินสะดุดจนกระดาษขาด น้องเค้กตกใจ ปากสั่น น้ำตาไหล',
    correctEmotionName: 'เสียใจ / ตกใจ',
    correctEmotionEmoji: '😢',
    emotionOptions: [
      { id: 'sad_shocked', name: 'เสียใจ ตกใจ', emoji: '😢', isCorrect: true },
      { id: 'happy', name: 'สะใจ', emoji: '😝', isCorrect: false },
      { id: 'sleepy', name: 'อยากนอน', emoji: '😴', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'ฟังคำขอโทษและซ่อมแซม',
      instruction: 'เพื่อนไม่ได้ตั้งใจและขอโทษแล้ว ใช้เทปกาวช่วยกันติดซ่อม หรือวาดใหม่ด้วยกันนะจ๊ะ',
      emoji: '🩹',
    },
  },
  {
    id: 'k2-18',
    grade: 'K2',
    levelNumber: 18,
    title: 'ด่าน 18: ได้ยินนิทานตอนที่คุณปู่เล่าสมัยเด็ก',
    characterAvatar: '👦',
    characterName: 'น้องจอย',
    scenarioText: 'คุณปู่นั่งเก้าอี้โยก เล่านิทานพื้นบ้านให้ฟัง น้องจอยนั่งกอดเข่า ตาแป๋ว ฟังอย่างเคลิบเคลิ้ม',
    correctEmotionName: 'เพลิดเพลิน / อบอุ่น',
    correctEmotionEmoji: '🥰',
    emotionOptions: [
      { id: 'enchanted', name: 'เพลิดเพลิน อบอุ่น', emoji: '🥰', isCorrect: true },
      { id: 'angry', name: 'ขุ่นเคือง', emoji: '😡', isCorrect: false },
      { id: 'scared', name: 'ตื่นกลัว', emoji: '😨', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'ซักถามและจดจำเรื่องราว',
      instruction: 'ฟังอย่างตั้งอกตั้งใจ แล้วกอดคุณปู่แน่นๆ บอกว่าหนูชอบนิทานของคุณปู่ที่สุดเลย',
      emoji: '👴',
    },
  },
  {
    id: 'k2-19',
    grade: 'K2',
    levelNumber: 19,
    title: 'ด่าน 19: เล่นซ่อนหาแล้วแอบในที่มืดนานเกินไป',
    characterAvatar: '👦',
    characterName: 'น้องจัสติน',
    scenarioText: 'แอบในตู้เก็บของคนเดียวนานมาก ยังไม่มีใครหาเจอ เริ่มรู้สึกอึดอัด วังเวงและเหงา',
    correctEmotionName: 'ว้าเหว่ / กังวล',
    correctEmotionEmoji: '🥺',
    emotionOptions: [
      { id: 'lonely', name: 'ว้าเหว่ กังวล', emoji: '🥺', isCorrect: true },
      { id: 'happy', name: 'สนุกสุดขีด', emoji: '😄', isCorrect: false },
      { id: 'angry', name: 'โกรธจัด', emoji: '😠', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'เดินออกมาในที่สว่าง',
      instruction: 'เปิดประตูตู้เดินออกมาในที่สว่าง ไม่ต้องกลัวแพ้เกม ความปลอดภัยและสบายใจสำคัญที่สุดจ้า',
      emoji: '🚪',
    },
  },
  {
    id: 'k2-20',
    grade: 'K2',
    levelNumber: 20,
    title: 'ด่าน 20: สำเร็จการศึกษานักสืบสีหน้า 20 ด่าน K2',
    characterAvatar: '👦',
    characterName: 'น้องวิน & คณะนักสืบ',
    scenarioText: 'นักสืบตัวน้อยอ่านอารมณ์สีหน้าเพื่อนๆ ได้ถูกต้องแม่นยำ พร้อมช่วยดูแลใจทุกคนอย่างอ่อนโยน',
    correctEmotionName: 'ยอดเยี่ยม / ภูมิใจในตนเอง',
    correctEmotionEmoji: '🏆',
    emotionOptions: [
      { id: 'champion', name: 'ยอดเยี่ยม ภูมิใจในตนเอง', emoji: '🏆', isCorrect: true },
      { id: 'angry', name: 'เคืองแค้น', emoji: '😡', isCorrect: false },
      { id: 'sad', name: 'ท้อแท้', emoji: '😢', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'ส่งต่อพลังแห่งความเข้าใจ',
      instruction: 'นำความเข้าใจอารมณ์ตนเองและผู้อื่น ไปสร้างรอยยิ้มและความสุขให้ทุกคนรอบตัวนะจ๊ะ!',
      emoji: '💖',
    },
  },

  // ================= K3 (อ.3) - 20 ด่าน =================
  {
    id: 'k3-1',
    grade: 'K3',
    levelNumber: 1,
    title: 'ด่าน 1: กล่องของขวัญปริศนา',
    characterAvatar: '👧',
    characterName: 'น้องไหมมุก',
    scenarioText: 'เปิดกล่องของขวัญแล้วมีผีเสื้อกระดาษบินพรึ่บออกมา น้องไหมมุกอ้าปากค้าง ตาโต ยิ้มกว้าง',
    correctEmotionName: 'ประหลาดใจ / ตื่นเต้น',
    correctEmotionEmoji: '😲',
    emotionOptions: [
      { id: 'surprised', name: 'ประหลาดใจ (ตื่นเต้น)', emoji: '😲', isCorrect: true },
      { id: 'sad', name: 'เศร้าหมอง', emoji: '😞', isCorrect: false },
      { id: 'angry', name: 'ฉุนเฉียว', emoji: '😠', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'ส่งเสียงเย้ สนุกสนาน',
      instruction: 'ปรบมือดังๆ 3 ครั้ง แล้วบอกความรู้สึกตื่นเต้นนี้ให้คุณพ่อคุณแม่ฟังอย่างมีความสุข',
      emoji: '✨',
    },
  },
  {
    id: 'k3-2',
    grade: 'K3',
    levelNumber: 2,
    title: 'ด่าน 2: ได้รับเหรียญรางวัลคนเก่ง',
    characterAvatar: '👦',
    characterName: 'น้องกันต์',
    scenarioText: 'คุณครูมอบเกียรติบัตรและเหรียญรางวัลให้หน้าเสาธง น้องกันต์ยืดตัวตรง ยิ้มอย่างอบอุ่นและมั่นใจ',
    correctEmotionName: 'ภาคภูมิใจในตนเอง',
    correctEmotionEmoji: '🥰',
    emotionOptions: [
      { id: 'proud', name: 'ภาคภูมิใจ (อบอุ่นใจ)', emoji: '🥰', isCorrect: true },
      { id: 'angry', name: 'ไม่พอใจ', emoji: '😡', isCorrect: false },
      { id: 'scared', name: 'กลัว', emoji: '😨', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'ขอบคุณตนเองและเพื่อนๆ',
      instruction: 'ยิ้มอย่างถ่อมตัว ไหว้ขอบคุณคุณครู และให้กำลังใจเพื่อนๆ คนอื่นให้สู้ไปด้วยกัน',
      emoji: '🏆',
    },
  },
  {
    id: 'k3-3',
    grade: 'K3',
    levelNumber: 3,
    title: 'ด่าน 3: ซ้อมการแสดงใหญ่เวทีจริงพรุ่งนี้',
    characterAvatar: '👧',
    characterName: 'น้องต้นหม่อน',
    scenarioText: 'ยืนอยู่บนเวทีใหญ่ที่มีสปอตไลต์ส่อง น้องต้นหม่อนมือเย็นเฉียบ เหงื่อซึมที่ฝ่ามือ หัวใจเต้นรัว',
    correctEmotionName: 'ตื่นเต้นกังวล / ประหม่า',
    correctEmotionEmoji: '😰',
    emotionOptions: [
      { id: 'anxious', name: 'ตื่นเต้นกังวล ประหม่า', emoji: '😰', isCorrect: true },
      { id: 'angry', name: 'โกรธผู้กำกับ', emoji: '😡', isCorrect: false },
      { id: 'sleepy', name: 'อยากหลับบนเวที', emoji: '😴', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'เทคนิคหายใจแบบสี่เหลี่ยม (Box Breathing)',
      instruction: 'หายใจเข้า 4 วินาที กลั้นไว้ 4 วินาที หายใจออก 4 วินาที พัก 4 วินาที หนูทำได้แน่นอน!',
      emoji: '🧘',
    },
  },
  {
    id: 'k3-4',
    grade: 'K3',
    levelNumber: 4,
    title: 'ด่าน 4: โดนล้อเลียนเรื่องแว่นตาใหม่',
    characterAvatar: '👦',
    characterName: 'น้องภัทร',
    scenarioText: 'ใส่แว่นสายตามาโรงเรียนวันแรก เพื่อนแซวว่าเหมือนคุณปู่ น้องภัทรก้มหน้า น้ำตาซึม เม้มปากแน่น',
    correctEmotionName: 'เสียใจ / น้อยใจ',
    correctEmotionEmoji: '🥺',
    emotionOptions: [
      { id: 'hurt', name: 'เสียใจ น้อยใจ', emoji: '🥺', isCorrect: true },
      { id: 'happy', name: 'ดีใจที่โดนล้อ', emoji: '😆', isCorrect: false },
      { id: 'bored', name: 'เบื่อเฉยๆ', emoji: '😑', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'มั่นใจในตนเองและบอกเพื่อนตรงๆ',
      instruction: 'แว่นตาช่วยให้เรามองโลกชัดเจน บอกเพื่อนอย่างหนักแน่นว่า "อย่าล้อกันนะ เราไม่ชอบ"',
      emoji: '👓',
    },
  },
  {
    id: 'k3-5',
    grade: 'K3',
    levelNumber: 5,
    title: 'ด่าน 5: แย่งกันตอบคำถามชิงรางวัล',
    characterAvatar: '👦',
    characterName: 'น้องท็อป',
    scenarioText: 'คุณครูถามคำถามยาก น้องท็อปยกมือสุดแขน แต่คุณครูเรียกเพื่อนอีกคน น้องท็อปหน้าบึ้ง กอดอก',
    correctEmotionName: 'หงุดหงิด / ผิดหวัง',
    correctEmotionEmoji: '😤',
    emotionOptions: [
      { id: 'frustrated', name: 'หงุดหงิด ผิดหวัง', emoji: '😤', isCorrect: true },
      { id: 'scared', name: 'หวาดกลัว', emoji: '😨', isCorrect: false },
      { id: 'happy', name: 'ยินดีกับเพื่อน', emoji: '😊', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'ปรบมือยินดีกับเพื่อน',
      instruction: 'การที่เรารู้คำตอบก็เก่งมากแล้ว ปรบมือให้เพื่อนที่ได้ตอบ คราวหน้ายังมีโอกาสอีกเยอะจ้า',
      emoji: '👏',
    },
  },
  {
    id: 'k3-6',
    grade: 'K3',
    levelNumber: 6,
    title: 'ด่าน 6: ลูกสุนัขตัวโปรดที่บ้านไม่สบาย',
    characterAvatar: '👧',
    characterName: 'น้องทิพย์',
    scenarioText: 'น้องหมาที่บ้านนอนซึมไม่ยอมกินข้าว น้องทิพย์นั่งเหม่อลอย น้ำตาคลอเบ้า คิดถึงน้องหมาตลอดเวลา',
    correctEmotionName: 'เป็นห่วง / เศร้าใจ',
    correctEmotionEmoji: '😢',
    emotionOptions: [
      { id: 'worried_sad', name: 'เป็นห่วง เศร้าใจ', emoji: '😢', isCorrect: true },
      { id: 'angry', name: 'โกรธสุนัข', emoji: '😡', isCorrect: false },
      { id: 'happy', name: 'หัวเราะเริงร่า', emoji: '😄', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'ส่งพลังใจและดูแลใกล้ชิด',
      instruction: 'คุณหมอกำลังช่วยรักษา ลูบหัวน้องหมาเบาๆ ส่งกำลังใจและความรัก น้องหมาจะหายไวขึ้นจ้า',
      emoji: '🐶',
    },
  },
  {
    id: 'k3-7',
    grade: 'K3',
    levelNumber: 7,
    title: 'ด่าน 7: เพื่อนทำดินสอสีแท่งโปรดของเราหัก',
    characterAvatar: '👦',
    characterName: 'น้องเท็น',
    scenarioText: 'เพื่อนยืมสีไปแล้วกดแรงจนสีทองหักครึ่ง น้องเท็นกัดฟันแน่น มือสั่น ควันแทบออกหู',
    correctEmotionName: 'โกรธจัด / เสียดาย',
    correctEmotionEmoji: '🤬',
    emotionOptions: [
      { id: 'furious', name: 'โกรธจัด เสียดาย', emoji: '🤬', isCorrect: true },
      { id: 'happy', name: 'ชอบใจ', emoji: '😊', isCorrect: false },
      { id: 'sleepy', name: 'ง่วงเหงา', emoji: '😴', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'นับ 1 ถึง 10 ก่อนพูดจา',
      instruction: 'ถอยหลัง 2 ก้าว สูดหายใจเข้าลึกๆ สีที่หักยังใช้กบเหลาเหลาใช้ต่อได้ อย่าให้ความโกรธทำลายมิตรภาพนะ',
      emoji: '🔟',
    },
  },
  {
    id: 'k3-8',
    grade: 'K3',
    levelNumber: 8,
    title: 'ด่าน 8: ถูกเลือกเป็นหัวหน้าห้องวันแรก',
    characterAvatar: '👧',
    characterName: 'น้องข้าวเจ้า',
    scenarioText: 'เพื่อนๆ โหวตเลือกให้เป็นหัวหน้าห้อง น้องข้าวเจ้ายิ้มอย่างอบอุ่น หัวใจพองโต พร้อมดูแลทุกคน',
    correctEmotionName: 'ภาคภูมิใจ / มุ่งมั่น',
    correctEmotionEmoji: '🥰',
    emotionOptions: [
      { id: 'proud_determined', name: 'ภาคภูมิใจ มุ่งมั่น', emoji: '🥰', isCorrect: true },
      { id: 'scared', name: 'กลัวจนตัวสั่น', emoji: '😨', isCorrect: false },
      { id: 'bored', name: 'เบื่อหน่าย', emoji: '😑', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'ตั้งใจทำหน้าที่ด้วยความเมตตา',
      instruction: 'ยิ้มทักทายเพื่อนๆ ทุกคน เป็นแบบอย่างที่ดี และคอยช่วยเหลือเพื่อนร่วมห้องด้วยความจริงใจ',
      emoji: '👑',
    },
  },
  {
    id: 'k3-9',
    grade: 'K3',
    levelNumber: 9,
    title: 'ด่าน 9: เดินหลงทางกับกลุ่มในสวนสัตว์',
    characterAvatar: '👦',
    characterName: 'น้องข้าวตัง',
    scenarioText: 'มัวแต่ดูกรงเสือ หันมาอีกทีเพื่อนๆ เดินไปหมดแล้ว น้องข้าวตังตาเหลือก ตาเบิกกว้าง เหงื่อแตกซิก',
    correctEmotionName: 'ตื่นตระหนก / หวาดผวา',
    correctEmotionEmoji: '😱',
    emotionOptions: [
      { id: 'panicked', name: 'ตื่นตระหนก หวาดผวา', emoji: '😱', isCorrect: true },
      { id: 'happy', name: 'ดีใจได้เที่ยวคนเดียว', emoji: '😄', isCorrect: false },
      { id: 'sleepy', name: 'อยากนอนหลับ', emoji: '😴', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'หยุดอยู่กับที่และขอความช่วยเหลือจากเจ้าหน้าที่',
      instruction: 'ตั้งสติ อย่าวิ่งตามมั่วซั่ว มองหาพนักงานสวนสัตว์ในเครื่องแบบ แจ้งชื่อและโรงเรียนทันทีจ้า',
      emoji: '👮',
    },
  },
  {
    id: 'k3-10',
    grade: 'K3',
    levelNumber: 10,
    title: 'ด่าน 10: ประดิษฐ์หุ่นยนต์กระดาษสำเร็จครั้งแรก',
    characterAvatar: '👦',
    characterName: 'น้องการ์ตูน',
    scenarioText: 'ตัดกระดาษ แปะกาวหลายรอบในที่สุดหุ่นยนต์ขยับแขนได้ น้องการ์ตูนชูกำปั้นขึ้นฟ้า ยิ้มกว้าง',
    correctEmotionName: 'ตื่นเต้นดีใจ / มั่นใจ',
    correctEmotionEmoji: '🤩',
    emotionOptions: [
      { id: 'triumphant', name: 'ตื่นเต้นดีใจ มั่นใจ', emoji: '🤩', isCorrect: true },
      { id: 'sad', name: 'เศร้าซึม', emoji: '😢', isCorrect: false },
      { id: 'angry', name: 'โมโหฉุนเฉียว', emoji: '😠', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'ชื่นชมความพยายามของตนเอง',
      instruction: 'บอกตัวเองว่า "หนูทำได้เพราะไม่ยอมแพ้!" แล้วนำไปอวดเพื่อนๆ ในกลุ่ม',
      emoji: '🤖',
    },
  },
  {
    id: 'k3-11',
    grade: 'K3',
    levelNumber: 11,
    title: 'ด่าน 11: เห็นเพื่อนไม่มีเงินซื้อขนม',
    characterAvatar: '👧',
    characterName: 'น้องวิว',
    scenarioText: 'เพื่อนยืนมองตู้ขนมแล้วล้วงกระเป๋าไม่มีเงิน น้องวิวมองด้วยความรู้สึกอบอุ่นในใจและอยากช่วยเหลือ',
    correctEmotionName: 'เห็นอกเห็นใจ / เมตตา',
    correctEmotionEmoji: '🥺',
    emotionOptions: [
      { id: 'empathy', name: 'เห็นอกเห็นใจ เมตตา', emoji: '🥺', isCorrect: true },
      { id: 'happy', name: 'สมน้ำหน้าเพื่อน', emoji: '😝', isCorrect: false },
      { id: 'angry', name: 'โกรธเพื่อน', emoji: '😡', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'แบ่งปันขนมอย่างนุ่มนวล',
      instruction: 'เดินเข้าไปแบ่งขนมให้เพื่อนครึ่งหนึ่ง บอกว่า "เราทานด้วยกันนะ อร่อยดี"',
      emoji: '🥪',
    },
  },
  {
    id: 'k3-12',
    grade: 'K3',
    levelNumber: 12,
    title: 'ด่าน 12: คุณหมอฟันถือเข็มยาชาเข้ามาใกล้',
    characterAvatar: '👦',
    characterName: 'น้องเวียร์',
    scenarioText: 'นอนอ้าปากบนเก้าอี้ทำฟัน เห็นคุณหมอถืออุปกรณ์ น้องเวียร์ตัวเกร็ง กำพนักแขนแน่น ตาเบิกกว้าง',
    correctEmotionName: 'หวาดกลัว / ตื่นตระหนก',
    correctEmotionEmoji: '😨',
    emotionOptions: [
      { id: 'fearful', name: 'หวาดกลัว ตื่นตระหนก', emoji: '😨', isCorrect: true },
      { id: 'happy', name: 'ร่าเริงสนุกสนาน', emoji: '😊', isCorrect: false },
      { id: 'bored', name: 'เบื่อหน่าย', emoji: '😑', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'หลับตานึกถึงทุ่งดอกไม้',
      instruction: 'หลับตาเบาๆ นึกถึงสิ่งที่ชอบ คุณหมอใจดีจะช่วยให้ฟันของหนูแข็งแรง ไม่เจ็บอย่างที่คิดจ้า',
      emoji: '🦷',
    },
  },
  {
    id: 'k3-13',
    grade: 'K3',
    levelNumber: 13,
    title: 'ด่าน 13: ถูกเข้าใจผิดว่าขโมยสีของคนอื่น',
    characterAvatar: '👧',
    characterName: 'น้องวาวา',
    scenarioText: 'เพื่อนชี้หน้าหาว่าน้องวาวาหยิบสีไป ทั้งที่สีนั้นเป็นของวาวาเอง น้องวาวาอึดอัด คับแค้นใจ น้ำตาคลอ',
    correctEmotionName: 'น้อยใจ / อึดอัดคับแค้น',
    correctEmotionEmoji: '😣',
    emotionOptions: [
      { id: 'wronged', name: 'น้อยใจ อึดอัดคับแค้น', emoji: '😣', isCorrect: true },
      { id: 'happy', name: 'ยินดีปรีดา', emoji: '😄', isCorrect: false },
      { id: 'sleepy', name: 'ง่วงซึม', emoji: '😴', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'อธิบายด้วยเหตุผลอย่างสงบ',
      instruction: 'อย่าเพิ่งตะโกน ชี้ชื่อที่เขียนไว้บนแท่งสีให้คุณครูดู ความจริงจะพิสูจน์ความบริสุทธิ์เสมอจ้า',
      emoji: '💡',
    },
  },
  {
    id: 'k3-14',
    grade: 'K3',
    levelNumber: 14,
    title: 'ด่าน 14: โดนฝนตกตัวเปียกโชกและหนาวสั่น',
    characterAvatar: '👦',
    characterName: 'น้องปังปอนด์',
    scenarioText: 'วิ่งลุยฝนมาขึ้นรถ ฟันกระทบกันกึกๆ ตัวสั่นสะท้าน กอดอกแน่น',
    correctEmotionName: 'หนาวสั่น / ทรมาน',
    correctEmotionEmoji: '🥶',
    emotionOptions: [
      { id: 'freezing', name: 'หนาวสั่น ทรมาน', emoji: '🥶', isCorrect: true },
      { id: 'hot', name: 'ร้อนรุ่ม', emoji: '🥵', isCorrect: false },
      { id: 'happy', name: 'สดชื่น', emoji: '😊', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'ห่มผ้าอุ่นๆ ดื่มน้ำอุ่น',
      instruction: 'เช็ดผมให้แห้งทันที ห่มผ้าหนาๆ ดื่มนมอุ่นๆ ร่างกายจะค่อยๆ อบอุ่นขึ้นนะลูก',
      emoji: '🍵',
    },
  },
  {
    id: 'k3-15',
    grade: 'K3',
    levelNumber: 15,
    title: 'ด่าน 15: วันเปิดกล่องของขวัญปีใหม่ในห้องเรียน',
    characterAvatar: '👧',
    characterName: 'น้องเปีย',
    scenarioText: 'จับสลากได้ของขวัญกล่องโต แกะออกมาเป็นชุดระบายสี 100 ชิ้น น้องเปียยิ้มกว้าง ร้องว้าวอย่างมีความสุข',
    correctEmotionName: 'ดีใจล้นพ้น / ตื่นตา',
    correctEmotionEmoji: '🤩',
    emotionOptions: [
      { id: 'thrilled', name: 'ดีใจล้นพ้น ตื่นตา', emoji: '🤩', isCorrect: true },
      { id: 'sad', name: 'เศร้าหมอง', emoji: '😢', isCorrect: false },
      { id: 'angry', name: 'โกรธจัด', emoji: '😠', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'ขอบคุณเพื่อนเจ้าของของขวัญ',
      instruction: 'เดินไปขอบคุณเพื่อนที่นำของขวัญมาจับสลาก และชวนเพื่อนๆ มาวาดรูปเล่นด้วยกัน',
      emoji: '🎁',
    },
  },
  {
    id: 'k3-16',
    grade: 'K3',
    levelNumber: 16,
    title: 'ด่าน 16: ทะเลาะกับเพื่อนสนิทจนไม่พูดกัน',
    characterAvatar: '👦',
    characterName: 'น้องปอ',
    scenarioText: 'เถียงกันเรื่องตัวการ์ตูนจนงอนกันทั้งคู่ ต่างคนต่างนั่งหันหลังให้กัน แต่ในใจเหงามาก',
    correctEmotionName: 'เหงา / อยากคืนดี',
    correctEmotionEmoji: '🥺',
    emotionOptions: [
      { id: 'lonely_reconcile', name: 'เหงา อยากคืนดี', emoji: '🥺', isCorrect: true },
      { id: 'happy', name: 'สะใจที่ไม่ได้คุย', emoji: '😆', isCorrect: false },
      { id: 'sleepy', name: 'อยากนอน', emoji: '😴', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'ก้าวไปข้างหน้าแล้วพูดขอโทษ',
      instruction: 'การขอโทษก่อนคือความกล้าหาญ เดินไปแตะไหล่เพื่อนแล้วบอกว่า "เราดีกันนะ" มิตรภาพจะกลับมาอบอุ่น',
      emoji: '🤝',
    },
  },
  {
    id: 'k3-17',
    grade: 'K3',
    levelNumber: 17,
    title: 'ด่าน 17: กำลังแข่งขันต่อตัวต่อประชันเวลา',
    characterAvatar: '👧',
    characterName: 'น้องปุ๊ก',
    scenarioText: 'เหลือเวลาอีก 30 วินาที น้องปุ๊กมองนาฬิกา มือหยิบตัวต่ออย่างรวดเร็ว กัดริมฝีปาก แน่วแน่',
    correctEmotionName: 'มุ่งมั่น / มีสมาธิสูง',
    correctEmotionEmoji: '🧐',
    emotionOptions: [
      { id: 'focused', name: 'มุ่งมั่น มีสมาธิสูง', emoji: '🧐', isCorrect: true },
      { id: 'sleepy', name: 'ง่วงหาว', emoji: '🥱', isCorrect: false },
      { id: 'sad', name: 'ร้องไห้ท้อถอย', emoji: '😭', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'จดจ่อที่เป้าหมายทีละชิ้น',
      instruction: 'หายใจเข้าลึกๆ นิ่งสงบ ไม่ว่อกแว่ก วางชิ้นส่วนอย่างมั่นคง หนูทำสำเร็จแน่นอน!',
      emoji: '🎯',
    },
  },
  {
    id: 'k3-18',
    grade: 'K3',
    levelNumber: 18,
    title: 'ด่าน 18: คุณครูเล่านิทานสอนใจเรื่องความกตัญญู',
    characterAvatar: '👦',
    characterName: 'น้องธารา',
    scenarioText: 'ฟังนิทานลูกกวางที่คอยดูแลแม่กวางแก่ชรา น้องธารานั่งนิ่ง น้ำตาซึม ซาบซึ้งในพระคุณพ่อแม่',
    correctEmotionName: 'ซาบซึ้ง / กตัญญู',
    correctEmotionEmoji: '🥺',
    emotionOptions: [
      { id: 'touched', name: 'ซาบซึ้ง กตัญญู', emoji: '🥺', isCorrect: true },
      { id: 'angry', name: 'หงุดหงิด', emoji: '😡', isCorrect: false },
      { id: 'bored', name: 'เบื่อหน่าย', emoji: '😑', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'กลับบ้านไปกอดพ่อแม่',
      instruction: 'นำความซาบซึ้งนี้ไปปฏิบัติจริง กอดคุณพ่อคุณแม่ บอกรักท่าน และเป็นเด็กดีของครอบครัวนะจ๊ะ',
      emoji: '💖',
    },
  },
  {
    id: 'k3-19',
    grade: 'K3',
    levelNumber: 19,
    title: 'ด่าน 19: ซ้อมวิ่งผลัดแล้วไม้หลุดมือเกือบแพ้',
    characterAvatar: '👦',
    characterName: 'น้องเวหา',
    scenarioText: 'ส่งไม้ผลัดแล้วไม้หล่นพื้น ตกใจมาก แต่รีบก้มเก็บแล้ววิ่งเต็มฝีเท้าจนเข้าเส้นชัยเฉียดฉิว',
    correctEmotionName: 'โล่งอก / ดีใจสุดขีด',
    correctEmotionEmoji: '😅',
    emotionOptions: [
      { id: 'relieved', name: 'โล่งอก ดีใจสุดขีด', emoji: '😅', isCorrect: true },
      { id: 'angry', name: 'โกรธเพื่อนร่วมทีม', emoji: '😡', isCorrect: false },
      { id: 'sleepy', name: 'ง่วงนอน', emoji: '😴', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'ชื่นชมการไม่ยอมแพ้',
      instruction: 'แม้เกิดข้อผิดพลาดแต่หนูก็สู้จนถึงที่สุด กอดเพื่อนร่วมทีมและเรียนรู้เพื่อพัฒนาให้ดียิ่งขึ้น!',
      emoji: '🏃',
    },
  },
  {
    id: 'k3-20',
    grade: 'K3',
    levelNumber: 20,
    title: 'ด่าน 20: พิธีอำลาปฐมวัย ก้าวสู่ประถม 1',
    characterAvatar: '👧',
    characterName: 'น้องไหมมุก & เพื่อนๆ อ.3',
    scenarioText: 'สวมชุดครุยบัณฑิตน้อย กอดคุณครูและเพื่อนๆ ร้องเพลงอำลา น้ำตาไหลด้วยความรักและความภาคภูมิใจ',
    correctEmotionName: 'ซาบซึ้ง / ภาคภูมิใจสูงสุด',
    correctEmotionEmoji: '🎓',
    emotionOptions: [
      { id: 'proud_graduate', name: 'ซาบซึ้ง ภาคภูมิใจสูงสุด', emoji: '🎓', isCorrect: true },
      { id: 'angry', name: 'โมโหฉุนเฉียว', emoji: '😡', isCorrect: false },
      { id: 'bored', name: 'ไม่สนใจใคร', emoji: '😑', isCorrect: false },
    ],
    calmingTechnique: {
      title: 'เก็บความทรงจำและก้าวต่อไปอย่างมั่นใจ',
      instruction: 'ไหว้ขอบคุณคุณครู กอดเพื่อนๆ แล้วก้าวสู่วัยเรียนประถมด้วยหัวใจที่เข้มแข็ง อ่อนโยน และงดงาม!',
      emoji: '🏆',
    },
  },
];

export const EmotionDetectiveView: React.FC<EmotionDetectiveViewProps> = ({
  currentGrade,
  soundVolume,
  onEarnStar,
}) => {
  const [levelIndex, setLevelIndex] = useState(0);

  const gradeLevels = useMemo(() => {
    const list = EMOTION_QUESTIONS.filter((q) => q.grade === currentGrade);
    return list.length > 0 ? list : EMOTION_QUESTIONS;
  }, [currentGrade]);

  const activeQuestion = gradeLevels[levelIndex] || gradeLevels[0];

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showTechniquePractice, setShowTechniquePractice] = useState(false);

  useEffect(() => {
    setSelectedOptionId(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowTechniquePractice(false);

    if (soundVolume > 0) {
      speakText(
        `${activeQuestion.scenarioText} เอ... เพื่อนคนนี้กำลังรู้สึกอย่างไรจ๊ะ?`,
        'th',
        soundVolume
      );
    }
  }, [activeQuestion, soundVolume]);

  const handleSelectOption = (option: { id: string; name: string; emoji: string; isCorrect: boolean }) => {
    if (isAnswered) return;

    setSelectedOptionId(option.id);
    setIsAnswered(true);
    setIsCorrect(option.isCorrect);

    if (option.isCorrect) {
      soundEffects.playVictory(soundVolume);
      if (onEarnStar) onEarnStar();
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
      speakText(
        `ถูกต้องแล้วจ้า! เป็นความรู้สึก "${option.name}" เก่งมากที่อ่านใจเพื่อนออก!`,
        'th',
        soundVolume
      );
    } else {
      soundEffects.playIncorrect(soundVolume);
      speakText(`ยังไม่ใช่จ้า ลองสังเกตสีหน้าและแววตาของเพื่อนอีกครั้งนะ`, 'th', soundVolume);
    }
  };

  const handleReset = () => {
    soundEffects.playTap(soundVolume);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowTechniquePractice(false);
  };

  const handleNextLevel = () => {
    soundEffects.playTap(soundVolume);
    if (levelIndex < gradeLevels.length - 1) {
      setLevelIndex((prev) => prev + 1);
    } else {
      setLevelIndex(0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4">
      {/* Level Selector */}
      <SkillGameLevelSelector
        levels={gradeLevels.map((q) => ({ level: q.levelNumber, name: q.title }))}
        currentLevel={levelIndex + 1}
        onSelectLevel={(num) => setLevelIndex(num - 1)}
        accentColor="pink"
        prefix="ด่าน"
      />

      {/* Main Container */}
      <div className="w-full bg-white rounded-3xl p-4 sm:p-6 border-2 border-pink-200 shadow-sm flex flex-col items-center gap-4">
        {/* Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-pink-100 flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 border border-pink-300 flex items-center justify-center text-2xl shadow-2xs">
              🔍
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-pink-950">
                {activeQuestion.title}
              </h2>
              <div className="text-xs text-pink-700 font-bold">
                นักสืบสีหน้า & อ่านความรู้สึกทางอารมณ์
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              speakText(
                `${activeQuestion.scenarioText} เพื่อนคนนี้กำลังรู้สึกอย่างไรจ๊ะ?`,
                'th',
                soundVolume
              )
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-800 text-xs font-bold border border-pink-200 cursor-pointer"
            title="ฟังเสียงโจทย์"
          >
            <Volume2 className="w-4 h-4" />
            <span>ฟังเสียง</span>
          </button>
        </div>

        {/* Character Scene Spotlight */}
        <div className="w-full bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 rounded-3xl p-5 border-2 border-pink-200 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-white border-3 border-pink-300 flex items-center justify-center text-6xl shadow-sm shrink-0">
              {activeQuestion.characterAvatar}
            </div>
            {isAnswered && isCorrect && (
              <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-pink-500 text-white flex items-center justify-center text-xl shadow-md animate-bounce">
                {activeQuestion.correctEmotionEmoji}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-xs font-black text-pink-900 bg-white/90 inline-block px-3 py-1 rounded-full border border-pink-200 mb-1.5 shadow-2xs">
              👤 {activeQuestion.characterName}
            </div>
            <p className="text-sm sm:text-base font-black text-slate-800 leading-snug">
              {activeQuestion.scenarioText}
            </p>
            <p className="text-xs sm:text-sm font-bold text-pink-900 mt-1.5">
              ❓ สังเกตสีหน้าและท่าทาง: คิดว่าเพื่อนกำลังรู้สึกอย่างไรเอ่ย?
            </p>
          </div>
        </div>

        {/* Emotion Options Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
          {activeQuestion.emotionOptions.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            let btnStyle =
              'bg-slate-50 hover:bg-pink-50/70 border-slate-200 hover:border-pink-300';

            if (isSelected) {
              btnStyle = opt.isCorrect
                ? 'bg-emerald-50 border-emerald-400 ring-4 ring-emerald-100 shadow-md'
                : 'bg-rose-50 border-rose-300 ring-4 ring-rose-100';
            }

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt)}
                disabled={isAnswered}
                className={`p-4 rounded-3xl border-3 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${btnStyle}`}
              >
                <span className="text-4xl sm:text-5xl">{opt.emoji}</span>
                <span className="text-xs sm:text-sm font-black text-slate-800 text-center">
                  {opt.name}
                </span>

                {isSelected && (
                  <div className="mt-1">
                    {opt.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-500" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback & Calming Technique Practice */}
        {isAnswered && (
          <div className="w-full flex flex-col gap-3 animate-in zoom-in-95 duration-200">
            {isCorrect ? (
              <div className="w-full bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <span className="text-4xl">🌟</span>
                  <div>
                    <div className="font-black text-emerald-950 text-sm sm:text-base">
                      เก่งมาก! ทายอารมณ์ถูกต้อง ได้รับ +1 ดาว ⭐
                    </div>
                    <div className="text-xs text-emerald-700 font-medium mt-0.5">
                      หนูรู้จักสังเกตสีหน้าผู้อื่น ทำให้เข้าใจความรู้สึกของเพื่อนๆ ได้ดี
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playTap(soundVolume);
                      setShowTechniquePractice(true);
                      speakText(
                        `${activeQuestion.calmingTechnique.title}: ${activeQuestion.calmingTechnique.instruction}`,
                        'th',
                        soundVolume
                      );
                    }}
                    className="px-4 py-2 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-900 font-black text-xs border border-pink-300 cursor-pointer shadow-2xs flex items-center gap-1"
                  >
                    <span>💡 ดูวิธีดูแลใจ</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextLevel}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md cursor-pointer active:scale-95"
                  >
                    <span>ด่านต่อไป</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-rose-950 text-xs font-bold">
                  <span className="text-xl">💡</span>
                  <span>ยังไม่ตรงกับสีหน้าของเพื่อนนะจ๊ะ ลองสังเกตรอยยิ้มหรือน้ำตาอีกที</span>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-1.5 rounded-xl bg-white text-rose-700 font-black text-xs border border-rose-300 cursor-pointer"
                >
                  ลองใหม่
                </button>
              </div>
            )}

            {/* Calming Technique Card */}
            {showTechniquePractice && (
              <div className="w-full bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100 border-2 border-pink-300 rounded-3xl p-4 flex items-start gap-3 animate-in fade-in duration-200">
                <span className="text-3xl shrink-0">
                  {activeQuestion.calmingTechnique.emoji}
                </span>
                <div>
                  <div className="text-xs sm:text-sm font-black text-pink-950">
                    💖 วิธีดูแลอารมณ์: {activeQuestion.calmingTechnique.title}
                  </div>
                  <div className="text-xs text-pink-900 font-medium mt-1">
                    {activeQuestion.calmingTechnique.instruction}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Psychological Educational Note */}
        <div className="w-full bg-pink-50/70 border border-pink-200 rounded-2xl p-3 flex items-start gap-2 text-xs text-pink-900 font-medium">
          <Heart className="w-4 h-4 text-pink-600 shrink-0 mt-0.5 fill-pink-200" />
          <span>
            <strong>พัฒนาการด้านอารมณ์-จิตใจ:</strong> การฝึกตั้งชื่ออารมณ์ (Name It to Tame It) ช่วยให้เด็กตระหนักรู้สภาวะอารมณ์ของตนเองและผู้อื่น ซึ่งเป็นบันไดขั้นแรกของการควบคุมอารมณ์และการสร้างความสัมพันธ์ที่ดี
          </span>
        </div>
      </div>
    </div>
  );
};
