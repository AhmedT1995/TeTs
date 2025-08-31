let handler = async (m, { conn }) => {
    // التحقق إذا الشات موجود في قاعدة البيانات
    if (!(m.chat in global.DATABASE._data.chats)) 
        return m.reply('*هذا الشات غير مسجل في قاعدة البيانات!*');
    
    let chat = global.DATABASE._data.chats[m.chat];

    // التحقق إذا الشات غير محظور أصلاً
    if (!chat.isBanned) 
        return m.reply('*هذا الشات غير محظور أصلاً!*');

    // رفع الحظر
    chat.isBanned = false;
    m.reply('*✅ تم رفع الحظر عن هذا الشات!*');
}

handler.help = ['unbanchat'];
handler.tags = ['عام'];
handler.command = /^unbanchat$/i;
handler.owner = false;
handler.admin = true;

module.exports = handler;
