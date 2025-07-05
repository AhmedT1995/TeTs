import fetch from 'node-fetch';
import { Sticker } from 'wa-sticker-formatter';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let sticker = false;
  try {
    let [packname, ...author] = args.join(' ').split(/!|\|/);
    author = (author || []).join('|');
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/webp/g.test(mime)) {
      let img = await q.download?.();
      sticker = await createSticker(img, null, packname || global.packname, author || global.author, false);
    } else if (/image/g.test(mime)) {
      let img = await q.download?.();
      sticker = await createSticker(img, null, packname || global.packname, author || global.author, false);
    } else if (/video|gif/g.test(mime)) {
      let video = await q.download?.();
      if ((q.msg || q).seconds > 7) return m.reply('*⚠️ لا يمكن أن يتجاوز الفيديو 7 ثوانٍ*');
      sticker = await createSticker(video, null, packname || global.packname, author || global.author, true);
    } else if (args[0] && isUrl(args[0])) {
      sticker = await createSticker(null, args[0], packname || global.packname, author || global.author, false);
    } else {
      throw `*🔁 أرسل صورة، فيديو (أقل من 7 ثواني)، أو رابط صورة مع الأمر: ${usedPrefix + command}*`;
    }
  } catch (e) {
    console.error(e);
    sticker = '*❌ فشل إنشاء الملصق*';
  } finally {
    if (sticker instanceof Buffer) {
      await conn.sendMessage(m.chat, { sticker }, { quoted: m });
    } else {
      m.reply(sticker);
    }
  }
};

handler.help = ['ملصق', 'ملصقي'];
handler.tags = ['sticker'];
handler.command = ['ملصق', 'ملصقي'];

export default handler;

const isUrl = (text) => {
  return /https?:\/\/\S+\.(jpg|jpeg|png|gif|webp)/i.test(text);
};

async function createSticker(img, url, packName, authorName, animated = false, quality = 80) {
  const sticker = new Sticker(img || url, {
    pack: packName || "بوت احمد",
    author: authorName || "AhmadT",
    type: animated ? 'full' : 'default',
    categories: ['💬'],
    id: `sticker-${Date.now()}`,
    quality,
    background: '#00000000'
  });

  return await sticker.toBuffer();
}
