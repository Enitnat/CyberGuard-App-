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