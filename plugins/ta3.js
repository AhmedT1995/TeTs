let questionsAndAnswers = [
  { question: 'هاشيرا', answers: ['غيو', 'غيومي', 'سانيمي', 'شينوبو', 'متسوري', 'تينغن', 'تنغن', 'اوباناي', 'سانيمي', 'توكيتو'] },
  { question: 'قبعة القش', answers: ['لوفي', 'زورو', 'نامي', 'روبين', 'تشوبر', 'بروك', 'سانجي', 'اوسوب', 'فرانكي'] },
  { question: 'طاقم روجر', answers: ['روجر', 'رايلي', 'باغي', 'كروكس', 'شانكس'] },
  { question: 'طاقم اللحيه', answers: ['ماركو', 'ايس', 'تيتش', 'ساتش'] },
  { question: 'بحرية', answers: ['غارب', 'شو', 'هينا', 'كوبي', 'اوكيجي', 'كوزان', 'كيزارو', 'اكاينو'] },
  { question: 'هوكاجي', answers: ['ميناتو', 'ناروتو', 'كاكاشي', 'تسونادي', 'هاشيراما', 'توبيراما', 'هيروزين', 'ساروتوبي'] },
  { question: 'كاجي', answers: ['اي', 'مو', 'مي'] },
  { question: 'سانين', answers: ['تسونادي', 'جيرايا', 'اوروتشيمارو'] },
  { question: 'بليتش', answers: ['ايزن', 'روز', 'لوف', 'قين', 'توسين', 'ايتشيفو', 'ايشين', 'يوزو', 'كارين', 'فوسو', 'ميتوا', 'ماساكي', 'ياماموتو', 'زاراكي', 'كيوراكو', 'موموي', 'هيوري', 'هوري'] },
  { question: 'قادة', answers: ['ايزن', 'روز', 'لوف', 'لوفي', 'توسين', 'جين'] },
  { question: 'جنرالات', answers: ['هيو', 'كيو', 'تو'] },
  { question: 'كينقدوم', answers: ['نيل', 'تيا', 'يامي', 'لوبي', 'هيو', 'كيو', 'تو', 'اوكي', 'رينبا', 'اوهون', 'توسين', 'كانكي'] },
  { question: 'ارانكار', answers: ['نيل', 'تيا', 'يامي', 'لوبي', 'ايزن'] },
  { question: 'شياطين', answers: ['روي', 'دوما', 'داكي', 'غيو', 'غيومي', 'سانيمي', 'شينوبو', 'نيزوكو', 'تانجيرو'] },
  { question: 'بلاك كلوفر', answers: ['استا', 'ريل', 'يونوا', 'جاك', 'لاك', 'غوش', 'ماغنا', 'يوليوس'] },
  { question: 'قمر علوي', answers: ['داكي', 'غيوتارو', 'دوما', 'اكازا', 'كوكوشيبو'] },
  { question: 'ثالوث اعظم', answers: ['زينون', 'دانتي', 'فانيكا'] },
  { question: 'اسبادا', answers: ['نيل', 'تيا', 'لوبي', 'يامي'] },
  { question: 'نواب', answers: ['زورو', 'كوين', 'كينغ', 'بارا', 'رينجي'] },
  { question: 'معجزات', answers: ['اكاشي', 'اوميني', 'كيسي', 'دايكي', 'ريوتا', 'اتسوشي', 'كوروكو'] },
  { question: 'فايزارد', answers: ['روز', 'لوف', 'شينجي', 'هيوري', 'كينسي'] },
  { question: 'يونكو', answers: ['تيتش', 'كايدو', 'لوفي', 'باغي', 'شانكس'] },
  { question: 'اوزوماكي', answers: ['ميتوا', 'فوسو', 'كارين', 'كوشينا'] },
  { question: 'تشيبوكاي', answers: ['كروكودايل', 'دوفلامينغو', 'لاو', 'هانكوك', 'كوما', 'تيتش', 'ميهوك', 'باغي', 'موريا'] },
  { question: 'طاقم شانكس', answers: ['لاكي رو', 'شانكس', 'ياسوب', 'بيكمان'] },
  { question: 'سون', answers: ['غوكو', 'غوهان', 'غوتين'] },
  { question: 'سينجو', answers: ['ايتاما', 'ناواكي', 'توكا', 'ميتوا', 'تسونادي', 'هاشيراما', 'توبيراما'] },
  { question: 'سوبرنوفا', answers: ['ابو', 'كيد', 'لاو'] },
  { question: 'سفن', answers: ['نوا', 'ماكسيم', 'ساني غو', 'ميري', 'غونغ', 'ميس لوف', 'موبي ديك', 'ريد فورس'] },
  { question: 'طاقم تيتش', answers: ['تيتش', 'شوت', 'كيو', 'اوجر'] },
  { question: 'اخوة الساكي', answers: ['ايس', 'سابو', 'لوفي'] },
  { question: 'اوتشيها', answers: ['راي', 'بارو', 'شين', 'ناكا', 'تيكا', 'ساسكي', 'مادارا', 'ايتاتشي', 'ايتاشي', 'ايزانا', 'ايزومي', 'اوبيتو', 'سارادا'] },
  { question: 'اكatsuki', answers: ['باين', 'توبي', 'زيتسو', 'كونان', 'ايتاشي', 'ساسوري'] },
  { question: 'قادة', answers: ['تيتش', 'ايزن', 'جين', 'قين', 'غين', 'توسين'] },
  { question: 'غيلان', answers: ['روز', 'ماريا', 'سينا'] },
  { question: 'تنانين', answers: ['اغنيل', 'كايدو', 'ليفايا', 'ايرين', 'اكنولوغيا'] },
  { question: 'فريكس', answers: ['غون', 'غين', 'ابي', 'ميتوا', 'جين', 'قين', 'جون'] },
  { question: 'هايكيو', answers: ['يو', 'ريو', 'كي', 'شويو'] },
  { question: 'كوارث كايدو', answers: ['كينغ', 'جاك', 'كوين'] },
  { question: 'هيوغا', answers: ['نيجي', 'هياشي', 'كو', 'ناتسو'] },
  { question: 'دريار', answers: ['يوري', 'ريتا', 'ايفان', 'ماكاروف', 'لاكسوس', 'لاكسس'] },
  { question: 'كونوها', answers: ['ساي', 'قاي', 'لي', 'داي', 'تن تن', 'ساسكي', 'ناروتو'] },
  { question: 'الفريق السابع', answers: ['رين', 'توبي', 'ساي', 'ساسكي', 'ساكورا', 'ناروتو', 'اوبيتو'] },
  { question: 'السانين الاسطورين', answers: ['جيرايا', 'اوروتشيمارو', 'تسونادي'] },
  { question: 'مدربين ناروتو', answers: ['ايروكا', 'كاكاشي', 'جيرايا'] },
  { question: 'نمل', answers: ['ميرويم', 'يوبي', 'بوف', 'بيتو'] },
  { question: 'سيراف النهاية', answers: ['يو', 'شينوا', 'غورين'] },
  { question: 'حراس الملك', answers: ['يوبي', 'بوف', 'بيتو'] },
  { question: 'عمالقة', answers: ['اني', 'زيكي', 'بيك', 'زيك', 'رود'] },
  { question: 'اكرمان', answers: ['كيني', 'ليفاي', 'ريتشل', 'ميكاسا'] },
  { question: 'قادة سحره', answers: ['ريل', 'جاك', 'يامي', 'يونوا'] },
  { question: 'سحره', answers: ['ريل', 'جاك', 'يامي', 'يونوا', 'استا', 'لاك', 'غوش'] },
  { question: 'مونكي', answers: ['لوفي', 'دراغون', 'غارب'] },
  { question: 'زودياك', answers: ['غين', 'جين', 'هيل', 'بيون', 'قين', 'سايو'] },
  { question: 'دي', answers: ['لامي', 'لاو', 'تيتش', 'ايس', 'لوفي', 'غارب'] },
  { question: 'ديث نوت', answers: ['رم', 'نير', 'ال', 'ريم', 'لايت', 'ريوك'] },
  { question: 'ثوار', answers: ['كوما', 'باجي', 'دراغون', 'كوالا', 'سابو'] },
  { question: 'يوجين', answers: ['هاك', 'هودي', 'جيمبي'] },
  { question: 'كوتشيكي', answers: ['بياكويا', 'روكيا', 'غينري'] },
  { question: 'محققين', answers: ['هيجي', 'نير', 'ال', 'اي', 'كونان', 'ميلو'] },
  { question: 'قرية الرمل', answers: ['غارا', 'راسا', 'باكي', 'تيماري'] },
  { question: 'شينيغامي', answers: ['ريوك', 'بارا', 'لايت', 'كيرا', 'ايزن', 'روز', 'لوف'] },
  { question: 'وصايا', answers: ['زيلدريس', 'درول', 'جالان', 'غوثر', 'جوثر', 'استاروسا'] },
  { question: 'خطايا', answers: ['كينغ', 'بان', 'ديان', 'ميليوداس', 'كينق', 'كينج'] },
  { question: 'فرقة استطلاع', answers: ['ليفاي', 'هانجي', 'ارمين', 'ايرين', 'ميكاسا', 'جان', 'كوني', 'ساشا'] },
  { question: 'ابطال بنها', answers: ['ديكو', 'مومو', 'جيرو', 'ايدا', 'شوتو'] },
  { question: 'ادميرالات', answers: ['ايشو', 'كونغ', 'كوزان', 'اكاينو', 'اوكيجي', 'كيزارو'] },
  { question: 'اطفال', answers: ['فيل', 'ايما', 'راي'] },
  { question: 'كهنة اينيل', answers: ['شورا', 'اوم', 'جيداتسو'] },
  { question: 'مفجرين', answers: ['ساب', 'بارا', 'جينثيرو'] },
];
  
  let handler = m => m;
  
  let currentCount = 1;
  let gameState = {
    active: false,
    currentQuestion: '',
    responses: {} // { jid: points }
  };
  
  async function isAdmin(m, conn) {
    if (!m.isGroup) return false;
    try {
      let groupMetadata = await conn.groupMetadata(m.chat);
      let participants = groupMetadata.participants;
      let admins = participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin');
      return admins.some(admin => admin.id === m.sender);
    } catch (error) {
      console.error('Error fetching group metadata:', error);
      return false;
    }
  }
  
  handler.all = async function(m, { conn }) {
    if (/^\.متع$/i.test(m.text)) {
      if (gameState.active) {
        return m.reply('اللعبة قيد التشغيل بالفعل.');
      }
  
      gameState.active = true;
      gameState.responses = {}; // Reset responses
      let randomIndex = Math.floor(Math.random() * questionsAndAnswers.length);
      gameState.currentQuestion = questionsAndAnswers[randomIndex].question;
      await m.reply(`*${gameState.currentQuestion} 3/تع*`);
    } else if (/^\.ستع$/i.test(m.text)) {
      if (!gameState.active) {
        return m.reply('لا توجد لعبة قيد التشغيل حالياً.');
      }
  
      gameState.active = false;
  
      if (Object.keys(gameState.responses).length === 0) {
        await m.reply('لم يربح أحد نقاطاً في هذه اللعبة.');
      } else {
        let result = Object.entries(gameState.responses).map(([jid, points]) => {
          return `@${jid.split('@')[0]}: ${points} نقطة`;
        }).join('\n');
  
        await m.reply(`اللعبة انتهت!\n\nالنقاط:\n${result}`, null, {
          mentions: Object.keys(gameState.responses)
        });
      }
  
      gameState.currentQuestion = ''; // Clear the current question
    } else if (gameState.active && gameState.currentQuestion) {
      let correctAnswers = questionsAndAnswers.find(q => q.question === gameState.currentQuestion).answers;
  
      // Check if the user's message contains at least 3 correct answers
      let userAnswers = m.text.split(' ').map(answer => answer.trim());
      let correctCount = userAnswers.filter(answer => correctAnswers.includes(answer)).length;
  
      if (correctCount >= 3) {
        if (!gameState.responses[m.sender]) {
          gameState.responses[m.sender] = 1;
        } else {
          gameState.responses[m.sender] += 1;
        }
  
        // Move to the next question
        let randomIndex = Math.floor(Math.random() * questionsAndAnswers.length);
        gameState.currentQuestion = questionsAndAnswers[randomIndex].question;
  
        // Delay sending the next question to give users time to see the previous response
        setTimeout(async () => {
          await m.reply(`*${gameState.currentQuestion} 3/تع*`);
        }, 500); // Adjust the delay if needed (e.g., 500ms)
      }
    }
  };
  
  export default handler;
  