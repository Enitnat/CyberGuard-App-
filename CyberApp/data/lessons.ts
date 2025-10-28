// data/lessons.ts

export type Question = {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'spot-the-phish';
  questionText: string;
  options?: string[]; // For multiple choice
  correctAnswer: string; // For multiple choice (value), true/false (string 'true' or 'false')
  image?: string; // For spot-the-phish
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  icon: string; // Emoji or image URL
  questions: Question[];
};

const PHISHING_EMAIL_EXAMPLE = 'https://i.imgur.com/your-phishing-image.png'; // Placeholder for an actual phishing email image

export const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Phishing Awareness',
    description: 'Learn to identify and avoid common phishing scams.',
    icon: '🎣',
    questions: [
      {
        id: '1-1',
        type: 'multiple-choice',
        questionText: 'What is phishing?',
        options: [
          'A type of online fishing game.',
          'An attempt to trick you into revealing personal information.',
          'A new social media platform.',
          'A way to securely share files.'
        ],
        correctAnswer: 'An attempt to trick you into revealing personal information.',
        explanation: 'Phishing is a cybercrime where attackers try to steal sensitive information by impersonating a trustworthy entity.'
      },
      {
        id: '1-2',
        type: 'true-false',
        questionText: 'Phishing emails often contain urgent language and threats.',
        correctAnswer: 'true',
        explanation: 'Attackers use urgency to make you act without thinking, preventing you from scrutinizing the email for red flags.'
      },
      {
        id: '1-3',
        type: 'spot-the-phish',
        questionText: 'Identify a red flag in this email:',
        image: 'https://cdn.openai.com/dall-e/decoded/prompt-01.html', // Replace with a real phishing email image (e.g., a fake login page)
        options: [
            "Generic greeting instead of your name",
            "Urgent call to action (e.g., 'Update your account now')",
            "Sender's email address doesn't match the company",
            "All of the above"
        ],
        correctAnswer: 'All of the above',
        explanation: 'Generic greetings, urgent requests, and suspicious sender addresses are common red flags in phishing emails.'
      },
    ],
  },
  {
    id: '2',
    title: 'Strong Passwords',
    description: 'Master the art of creating and managing strong, unique passwords.',
    icon: '🔑',
    questions: [
      {
        id: '2-1',
        type: 'multiple-choice',
        questionText: 'Which password is generally considered the strongest?',
        options: [
          'password123',
          'MyBirthday1990',
          'Tj@W9p!LqZ6yRk',
          'Admin123!'
        ],
        correctAnswer: 'Tj@W9p!LqZ6yRk',
        explanation: 'Strong passwords are long, complex, and contain a mix of uppercase, lowercase, numbers, and symbols.'
      },
      {
        id: '2-2',
        type: 'true-false',
        questionText: 'It is safe to use the same password for all your online accounts.',
        correctAnswer: 'false',
        explanation: 'Reusing passwords is a major security risk. If one account is compromised, all others using the same password become vulnerable.'
      },
    ],
  },
  {
    id: '3',
    title: 'Multi-Factor Authentication (MFA)',
    description: 'Add an extra layer of security to your accounts with MFA.',
    icon: '📱',
    questions: [
      {
        id: '3-1',
        type: 'multiple-choice',
        questionText: 'What does MFA add to your login process?',
        options: [
          'A faster login time.',
          'An additional verification step.',
          'Better password encryption.',
          'Automatic password changes.'
        ],
        correctAnswer: 'An additional verification step.',
        explanation: 'MFA requires more than one method of verification, making it much harder for unauthorized users to access your accounts.'
      },
      {
        id: '3-2',
        type: 'true-false',
        questionText: 'MFA makes your accounts completely unhackable.',
        correctAnswer: 'false',
        explanation: 'While MFA significantly improves security, no system is 100% unhackable. It\'s a strong deterrent, but not foolproof.'
      },
    ],
  },
];

// data/lessons.ts
// ... (keep all your existing code)

// --- NEW DATA FOR LESSON DETAIL SCREEN ---

export type SubTopic = {
  id: string;
  title: string;
  // We can add a 'completed' field later
};

export type LessonModule = {
  moduleId: string;
  title: string;
  subTopics: SubTopic[];
};

export type LessonDetail = {
  id: string; // This should match the lesson ID (e.g., '1' for Phishing)
  title: string; // The main lesson title
  modules: LessonModule[];
};

export const lessonDetails: LessonDetail[] = [
  // --- LESSON 1: PHISHING ---
  {
    id: '1',
    title: 'Phishing Awareness',
    modules: [
      {
        moduleId: '1.1',
        title: 'The Importance of Phishing Awareness',
        subTopics: [
          { id: '1.1.1', title: 'What is Phishing?' },
          { id: '1.1.2', title: 'Why attackers use Phishing' },
          { id: '1.1.3', title: 'Common goals of an attack' },
          { id: '1.1.4', title: 'Real-world impact' },
        ],
      },
      {
        moduleId: '1.2',
        title: 'Types of Phishing Attacks',
        subTopics: [
          { id: '1.2.1', title: 'Email Phishing (Vishing)' },
          { id: '1.2.2', title: 'SMS Phishing (Smishing)' },
          { id: '1.2.3', title: 'Voice Phishing' },
          { id: '1.2.4', title: 'Spear Phishing' },
        ],
      },
    ],
  },
  
  // --- LESSON 2: STRONG PASSWORDS ---
  {
    id: '2',
    title: 'Strong Passwords',
    modules: [
      {
        moduleId: '2.1',
        title: 'Why Passwords Matter',
        subTopics: [
          { id: '2.1.1', title: 'Passwords as a first defense' },
          { id: '2.1.2', title: 'How attackers crack passwords' },
          { id: '2.1.3', title: 'The risk of reusing passwords' },
        ],
      },
      {
        moduleId: '2.2',
        title: 'Creating & Managing Passwords',
        subTopics: [
          { id: '2.2.1', title: 'Using passphrases' },
          { id: '2.2.2', title: 'Introduction to Password Managers' },
          { id: '2.2.3', title: 'Why length is better than complexity' },
        ],
      },
    ],
  },

  // --- LESSON 3: MFA ---
  {
    id: '3',
    title: 'Multi-Factor Authentication',
    modules: [
      {
        moduleId: '3.1',
        title: 'What is MFA?',
        subTopics: [
          { id: '3.1.1', title: 'Defining Multi-Factor' },
          { id: '3.1.2', title: 'The 3 Factors of Authentication' },
          { id: '3.1.3', title: 'Why passwords are not enough' },
        ],
      },
      {
        moduleId: '3.2',
        title: 'Types of MFA',
        subTopics: [
          { id: '3.2.1', title: 'Authenticator Apps' },
          { id: '3.2.2', title: 'SMS & Email Codes' },
          { id: '3.2.3', title: 'Physical Keys (YubiKey)' },
          { id: '3.2.4', title: 'Biometrics (Face/Fingerprint)' },
        ],
      },
    ],
  },
];

// data/lessons.ts
// ... (keep all your other code)

// --- NEW DATA FOR TOPIC CONTENT ---

export const topicContent = new Map<string, { title: string, content: string }>([
  // --- Phishing Lesson ---
  ['1.1.1', {
    title: 'What is Phishing?',
    content: 'Phishing is a type of cybercrime where an attacker attempts to trick a victim into revealing sensitive information. This can include usernames, passwords, credit card numbers, or other personal data.'
  }],
  ['1.1.2', {
    title: 'Why attackers use Phishing',
    content: 'Attackers use phishing because it is a simple, cheap, and effective way to steal data. It exploits human psychology—like trust, fear, and urgency—rather than complex software vulnerabilities.'
  }],
  ['1.1.3', {
    title: 'Common goals of an attack',
    content: 'The primary goals are often: \n1. Stealing money via credit card or bank details. \n2. Gaining access to private accounts (email, social media). \n3. Stealing a person\'s identity. \n4. Installing malware, like ransomware, on a victim\'s computer.'
  }],
  
  // --- Password Lesson ---
  ['2.1.1', {
    title: 'Passwords as a first defense',
    content: 'Think of your password as the main lock on your digital front door. It is the first and most common barrier protecting your personal information, files, and identity from unauthorized access.'
  }],
  ['2.1.2', {
    title: 'How attackers crack passwords',
    content: 'Attackers use automated software to try millions of password combinations per second (a "brute force" attack). They also use "dictionary attacks" that try common words, or "credential stuffing" where they use passwords stolen from other websites.'
  }],
]);