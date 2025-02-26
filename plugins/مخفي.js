import _0x22d1c0 from '@whiskeysockets/baileys';
const {
  proto,
  generateWAMessageFromContent
} = _0x22d1c0;
let handler = async (_0x536d7c, {
  conn: _0xea95c2,
  text: _0x13b364,
  participants: _0x3cac5a
}) => {
  if (!_0x3cac5a.find(_0x3cc05b => _0x3cc05b.id === _0x536d7c.sender && _0x3cc05b.admin)) {
    return _0xea95c2.reply(_0x536d7c.chat, "This command can only be used by group admins.", _0x536d7c);
  }
  let _0x108f69 = _0x13b364;
  if (_0x536d7c.quoted) {
    _0x108f69 = _0x536d7c.quoted.text || "ضع رسالة";
  } else {
    _0x108f69 = _0x13b364 || "ضع رسالة";
  }
  let _0x59dbab = _0x3cac5a.map(_0x2b6ea8 => _0x2b6ea8.id);
  const _0x1f7fdd = {
    'extendedTextMessage': {
      'text': _0x108f69,
      'contextInfo': {
        'mentionedJid': _0x59dbab
      }
    }
  };
  const _0x357919 = generateWAMessageFromContent(_0x536d7c.chat, proto.Message.fromObject(_0x1f7fdd), {
    'quoted': _0x536d7c,
    'userJid': _0xea95c2.user.id
  });
  await _0xea95c2.relayMessage(_0x536d7c.chat, _0x357919.message, {
    'messageId': _0x357919.key.id
  });
};
handler.help = ['broadcast'];
handler.tags = ['group'];
handler.command = ["مخفي"];
handler.group = true;
handler.admin = true;
export default handler;