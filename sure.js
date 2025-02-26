let questionsAndAnswers = [
    { question: "إطلاق نيل", answers: ["غاميوزا"] },
    { question: "إطلاق ستارك", answers: ["لوس لوبوس"] },
    { question: "إطلاق غريمجو", answers: ["بانترا"] },
    { question: "إطلاق زايلو أبورو", answers: ["فورنيكاراس"] },
    { question: "إطلاق يامي", answers: ["ارا"] },
    { question: "إطلاق باراغان", answers: ["اوروغانتي"] },
    { question: "إطلاق الكيورا", answers: ["مورشيلاجو", "مورشيلاغو"] },
    { question: "الإسبادا 3", answers: ["نيل"] },
    { question: "الإسبادا 4", answers: ["الكيورا"] },
    { question: "الإسبادا 2", answers: ["باراغان"] },
    { question: "الإسبادا 1", answers: ["ستارك"] },
    { question: "أخت نامي", answers: ["نوجيكو", "نوغيكو"] },
    { question: "قائد العناكب", answers: ["كرولو"] },
    { question: "قائد الثيران السوداء", answers: ["يامي"] },
    { question: "مستخدم شينرا تينسي", answers: ["باين"] },
    { question: "مستخدم إيدو تينسي", answers: ["اوروتشيمارو", "كابوتو", "توبيراما"] },
    { question: "قبضة اللهب", answers: ["ايس"] },
    { question: "جراح الموت", answers: ["لاو"] },
    { question: "أخت لاو", answers: ["لامي"] },
    { question: "خال ليفاي", answers: ["كيني"] },
    { question: "معد كاراسونو", answers: ["توبيو"] },
    { question: "نجم كاراسونو", answers: ["اساهي"] },
    { question: "معذب العناكب", answers: ["فيتان"] },
    { question: "مكنسة شيزوكو", answers: ["ديمي"] }
  ];
  
  // Function to add the other two letters
  function addVariants(answers) {
    const variants = { 'غ': ['ج', 'ق'], 'ج': ['غ', 'ق'], 'ق': ['غ', 'ج'] };
    
    return answers.flatMap(answer => {
      let newAnswers = [answer];
      for (const letter of answer) {
        if (variants[letter]) {
          for (const variant of variants[letter]) {
            const newAnswer = answer.replace(letter, variant);
            if (!newAnswers.includes(newAnswer)) {
              newAnswers.push(newAnswer);
            }
          }
        }
      }
      return newAnswers;
    });
  }
  
  // Updating answers with variants
  questionsAndAnswers.forEach(q => {
    q.answers = addVariants(q.answers);
  });
  
  // Check the modified questionsAndAnswers
  console.log(questionsAndAnswers);
  