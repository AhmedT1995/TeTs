import { WAMessageStubType } from '@whiskeysockets/baileys';
import PhoneNumber from 'awesome-phonenumber';
import chalk from 'chalk';
import { watchFile } from 'fs';
import { fileURLToPath } from 'url';

// Dynamically import modules based on options
const terminalImage = global.opts?.img ? (await import('terminal-image')).default : null;
const urlRegexSafe = (await import('url-regex-safe')).default;
const urlRegex = urlRegexSafe({ strict: false });

/**
 * Format and log WhatsApp messages to the console
 * @param {Object} m - Message object
 * @param {Object} conn - Connection object
 * @returns {Promise<void>}
 */
export default async function logMessage(m, conn = { user: {} }) {
  try {
    // Get sender and chat information
    let _name = '';
    try {
      _name = await conn.getName(m.sender);
    } catch (e) {
      // Handle case where getName is not a Promise or doesn't exist
      _name = '';
    }
    
    const senderNumber = PhoneNumber(`+${m.sender.replace('@s.whatsapp.net', '')}`);
    const sender = `${senderNumber.getNumber('international')}${_name ? ` ~${_name}` : ''}`;
    
    let chat = '';
    try {
      chat = await conn.getName(m.chat);
    } catch (e) {
      // Handle case where getName is not a Promise or doesn't exist
      chat = '';
    }
    
    // Process image if enabled
    let img = null;
    if (global.opts?.img && /sticker|image/gi.test(m.mtype)) {
      try {
        const buffer = await m.download();
        img = buffer ? await terminalImage.buffer(buffer) : null;
      } catch (imageError) {
        console.error('Image processing error:', imageError);
      }
    }
    
    // Calculate file size
    const filesize = calculateFileSize(m);
    
    // Get user data
    const user = global.db.data.users?.[m.sender];
    
    // Format bot's own number
    const botJid = conn.user?.jid || '';
    const me = PhoneNumber(`+${botJid.replace('@s.whatsapp.net', '')}`).getNumber('international');
    const botName = conn.user?.name || 'Unknown';
    const isSub = botJid !== global.conn?.user?.jid;
    
    // Format timestamp
    const timestamp = m.messageTimestamp 
      ? new Date(1000 * (typeof m.messageTimestamp === 'object' ? m.messageTimestamp.low || m.messageTimestamp : m.messageTimestamp))
      : new Date();
    
    // Format file size for display
    const { formattedSize, sizeUnit } = formatFileSize(filesize);
    
    // Print message header
    console.log(`▣────────────────────────···
│ ${chalk.redBright('%s')}
│⏰ ${chalk.black(chalk.bgYellow('%s'))}
│📑 ${chalk.black(chalk.bgGreen('%s'))}
│📊 ${chalk.magenta('%s [%s %sB]')}
│📤 ${chalk.green('%s')}
│📃 ${chalk.yellow('%s%s')}
│📥 ${chalk.green('%s')}
│💬 ${chalk.black(chalk.bgYellow('%s'))}
▣────────────────────────···`.trim(),
      `${me} ~${botName}${isSub ? ' (Sub Bot)' : ''}`,
      timestamp.toTimeString(),
      m.messageStubType ? WAMessageStubType[m.messageStubType] : '',
      filesize,
      formattedSize,
      sizeUnit,
      sender,
      m?.exp ?? '?',
      user ? `|${user.exp}|${user.limit}` : '|--|--',
      `${m.chat}${chat ? ` ~${chat}` : ''}`,
      formatMessageType(m)
    );
    
    // Display image if available
    if (img) console.log(img.trimEnd());
    
    // Process and display message text with formatting
    logFormattedText(m, conn);
    
    // Log mentioned users if any
    logMentions(m, conn);
    
    // Log specific message type details
    logMessageTypeDetails(m);
    
    console.log(); // Add a line break at the end
  } catch (error) {
    console.error('Error in message logging:', error);
  }
}

// Safely get file size
function calculateFileSize(m) {
  if (!m) return 0;
  
  try {
    if (m.msg) {
      if (m.msg.vcard) return m.msg.vcard.length;
      
      if (m.msg.fileLength) {
        return typeof m.msg.fileLength === 'object' 
          ? m.msg.fileLength.low || Number(m.msg.fileLength)
          : Number(m.msg.fileLength);
      }
      
      if (m.msg.axolotlSenderKeyDistributionMessage) {
        return m.msg.axolotlSenderKeyDistributionMessage.length;
      }
      
      if (m.text) return m.text.length;
    }
    
    return m.text ? m.text.length : 0;
  } catch (error) {
    console.error('Error calculating file size:', error);
    return 0;
  }
}

/**
 * Format file size for display
 * @param {number} bytes - Size in bytes
 * @returns {Object} Formatted size and unit
 */
function formatFileSize(bytes) {
  if (bytes === 0) return { formattedSize: 0, sizeUnit: '' };
  
  const units = ['', 'K', 'M', 'G', 'T', 'P'];
  const power = Math.floor(Math.log(bytes) / Math.log(1000));
  const formattedSize = (bytes / Math.pow(1000, power)).toFixed(1);
  const sizeUnit = units[power] || '';
  
  return { formattedSize, sizeUnit };
}

/**
 * Format message type for display
 * @param {Object} m - Message object
 * @returns {string} Formatted message type
 */
function formatMessageType(m) {
  if (!m.mtype) return '';
  
  let type = m.mtype.replace(/message$/i, '');
  
  if (/audio/i.test(type)) {
    type = m.msg?.ptt ? 'PTT' : 'audio';
  }
  
  return type.charAt(0).toUpperCase() + type.slice(1);
}

/**
 * Log formatted message text
 * @param {Object} m - Message object
 * @param {Object} conn - Connection object
 */
function logFormattedText(m, conn) {
  if (typeof m.text !== 'string' || !m.text) return;
  
  // Clean text of invisible characters
  let log = m.text.replace(/\u200e+/g, '');
  
  // Regex for markdown formatting
  const mdRegex = /(?<=(?:^|[\s\n])\S?)(?:([*_~])(.+?)\1|```((?:.||[\n\r])+?)```)(?=\S?(?:[\s\n]|$))/g;
  
  // Format markdown text
  const mdFormat = (depth = 4) => (_, type, text, monospace) => {
    const types = {
      '_': 'italic',
      '*': 'bold',
      '~': 'strikethrough',
    };
    
    text = text || monospace;
    
    if (!types[type] || depth < 1) return text;
    
    const formatted = chalk[types[type]](text.replace(mdRegex, mdFormat(depth - 1)));
    return formatted;
  };
  
  // Format URLs in text (only for reasonably sized messages)
  if (log.length < 1024) {
    log = log.replace(urlRegex, (url, i, text) => {
      const end = url.length + i;
      return i === 0 || end === text.length || (/^\s$/.test(text[end]) && /^\s$/.test(text[i - 1])) 
        ? chalk.blueBright(url) 
        : url;
    });
  }
  
  // Apply markdown formatting
  log = log.replace(mdRegex, mdFormat(4));
  
  // Highlight mentions
  if (m.mentionedJid?.length) {
    for (const user of m.mentionedJid) {
      let userName;
      try {
        userName = await conn.getName(user);
      } catch (e) {
        userName = user.split('@')[0];
      }
      
      log = log.replace(
        `@${user.split('@')[0]}`, 
        chalk.blueBright(`@${userName}`)
      );
    }
  }
  
  // Color code based on message type
  const coloredLog = m.error != null 
    ? chalk.red(log) 
    : m.isCommand 
      ? chalk.yellow(log) 
      : log;
      
  console.log(coloredLog);
}

/**
 * Log mentioned users
 * @param {Object} m - Message object
 * @param {Object} conn - Connection object
 */
async function logMentions(m, conn) {
  if (!m.messageStubParameters?.length) return;
  
  try {
    const mentions = [];
    
    for (const jid of m.messageStubParameters) {
      const decodedJid = conn.decodeJid ? conn.decodeJid(jid) : jid;
      let name = '';
      
      try {
        name = await conn.getName(decodedJid);
      } catch (e) {
        // If getName is not a Promise or throws an error
        name = '';
      }
      
      const number = PhoneNumber(`+${decodedJid.replace('@s.whatsapp.net', '')}`).getNumber('international');
      mentions.push(chalk.gray(`${number}${name ? ` ~${name}` : ''}`));
    }
    
    console.log(mentions.join(', '));
  } catch (error) {
    console.error('Error logging mentions:', error);
  }
}

/**
 * Log details specific to message type
 * @param {Object} m - Message object
 */
function logMessageTypeDetails(m) {
  const mtype = m.mtype?.toLowerCase();
  
  if (!mtype) return;
  
  if (mtype.includes('document')) {
    console.log(`🗂️ ${m.msg?.fileName || m.msg?.displayName || 'Document'}`);
  } 
  else if (mtype.includes('contactsarray')) {
    console.log('👨‍👩‍👧‍👦 Contact List');
  } 
  else if (mtype.includes('contact')) {
    console.log(`👨 ${m.msg?.displayName || 'Contact'}`);
  } 
  else if (mtype.includes('audio')) {
    const duration = m.msg?.seconds || 0;
    const minutes = Math.floor(duration / 60).toString().padStart(2, '0');
    const seconds = (duration % 60).toString().padStart(2, '0');
    
    console.log(`${m.msg?.ptt ? '🎤 (PTT ' : '🎵 (AUDIO) '}${minutes}:${seconds}`);
  }
}

// Watch for file changes and reload
const __filename = fileURLToPath(import.meta.url);
watchFile(__filename, () => {
  console.log(chalk.redBright('Update detected in \'lib/print.js\''));
});