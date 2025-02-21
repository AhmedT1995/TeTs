import axios from 'axios';

let handler = async (m, { conn }) => {
  try {
    let res = (await axios.get(`https://raw.githubusercontent.com/Seiyra/imagesfjsfasfa/refs/heads/main/okay.js`)).data;

    // Log the response to check its structure
    console.log(res);

    // Assuming res is an array of URLs
    if (!Array.isArray(res)) {
      throw new Error('Response is not an array.');
    }

    let url = res[Math.floor(Math.random() * res.length)];

    await conn.sendFile(m.chat, url, 'image.jpg', '', m);
  } catch (error) {
    console.error(error);
    await conn.sendMessage(m.chat, { text: `❌ *Error:* ${error.message}` }, { quoted: m });
  }
};

handler.help = ['messi'];
handler.tags = ['img'];
handler.command = /^(ص)$/i;

export default handler;
