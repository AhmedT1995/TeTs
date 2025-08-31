let handler = async (m, { conn, participants }) => {
    // التحقق إذا الشات موجود في قاعدة البيانات
    if (!(m.chat in global.DATABASE._data.chats)) 
        return m.reply('*هذا الشات غير مسجل في قاعدة البيانات!*');
    
    let chat = global.DATABASE._data.chats[m.chat];

    // التحقق إذا الشات محظور مسبقًا
    if (chat.isBanned) 
        return m.reply('*هذا الشات محظور مسبقًا*\n*إذا كنت تريد رفع الحظر استخدم /unbanchat*');

    // تفعيل الحظر
    chat.isBanned = true;
    m.reply('*تم حظر هذا الشات بقرار من مسؤول المجموعة*');
}

handler.command = /^banchat$/i;
handler.group = true;
handler.admin = true;

module.exports = handler;
