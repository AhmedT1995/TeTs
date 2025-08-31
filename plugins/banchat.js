const handler = async (m) => {
  if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {};
  global.db.data.chats[m.chat].isBanned = true;
  m.reply("✅ هذا الشات تم حظره، البوت ما راح يرد هنا.");
};

handler.help = ['banchat'];
handler.tags = ['owner'];
handler.command = /^banchat$/i;
handler.rowner = true;

export default handler;
