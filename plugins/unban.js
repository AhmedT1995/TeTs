import fs from 'fs';

const handler = async (m) => {
  // إلغاء الحظر عن الشات
  global.db.data.chats[m.chat].isBanned = false;
  m.reply("✅ The chat has been unbanned."); // رسالة بعد فك الحظر
};

// معلومات الأمر
handler.help = ['unbanchat'];
handler.tags = ['owner'];
handler.command = /^unbanchat$/i; 
handler.rowner = true; // بس الـ owner يقدر يستخدمه

export default handler;
