// Mock data for Matrimony by Hana demo
// TODO: Replace with actual backend integration

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  churchAffiliation?: string
  relationshipStage: "engaged" | "newly-married" | "married-years"
}

export interface Couple {
  id: string
  partner1: User
  partner2: User
  joinedDate: string
  currentCourse?: string
  overallProgress: number
}

export interface Course {
  id: string
  title: string
  description: string
  image: string
  modules: Module[]
  duration: string
  progress: number
  isLocked: boolean
  order: number
}

export interface Module {
  id: string
  title: string
  lessons: Lesson[]
  isCompleted: boolean
}

export interface Lesson {
  id: string
  title: string
  type: "video" | "reading" | "activity"
  duration: string
  isCompleted: boolean
  scriptureReference?: string
  content?: string
  videoProgress?: number // Percentage of video watched (0-100)
  lastWatchedAt?: string // ISO timestamp of when video was last watched
}

export interface Activity {
  id: string
  title: string
  description: string
  type: "weekly-task" | "journal" | "prayer" | "discussion"
  dueDate?: string
  isCompleted: boolean
  partnerCompleted: boolean
  icon: string
}

export interface Quiz {
  id: string
  title: string
  courseId: string
  questions: Question[]
  score?: number
  isCompleted: boolean
}

export interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
}

export interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
  isSaved: boolean
  image?: string // Optional image URL
}

export interface Notification {
  id: string
  type: "lesson" | "partner" | "event" | "motivation"
  title: string
  message: string
  timestamp: string
  isRead: boolean
}

// Community Posts
export interface CommunityPost {
  id: string
  author: string
  authorRole: "deacon" | "couple" | "leader"
  content: string
  timestamp: string
  likes: number
  avatar?: string
}

// Mock Current User
export const mockUser: User = {
  id: "1",
  name: "Sarah",
  email: "sarah@example.com",
  avatar: "/images/sarah-profile.png",
  churchAffiliation: "St. Mary Ethiopian Orthodox Church",
  relationshipStage: "newly-married",
}

export const mockPartner: User = {
  id: "2",
  name: "Abraham",
  email: "abraham@example.com",
  avatar: "/images/abraham-profile.png",
  churchAffiliation: "St. Mary Ethiopian Orthodox Church",
  relationshipStage: "newly-married",
}

export const mockCouple: Couple = {
  id: "couple-1",
  partner1: mockUser,
  partner2: mockPartner,
  joinedDate: "2024-01-15",
  currentCourse: "pre-marriage",
  overallProgress: 45,
}

// Mock Courses
export const mockCourses: Course[] = [
  // PRE-MARRIAGE (4 Lessons)
  {
    id: "pre-marriage",
    title: "Pre-Marriage",
    description: "Prepare your heart and mind for the sacred journey of marriage through faith and wisdom.",
    image: "/ethiopian-couple-courtship-prayer.jpg",
    duration: "4 weeks",
    progress: 65,
    isLocked: false,
    order: 1,
    modules: [
      {
        id: "mod-1",
        title: "Why Marriage Matters",
        isCompleted: true,
        lessons: [
          {
            id: "l1",
            title: "God's Design for Marriage",
            type: "video",
            duration: "15 min",
            isCompleted: true,
            scriptureReference: "Genesis 2:24",
          },
          { id: "l2", title: "The Purpose of Holy Matrimony", type: "reading", duration: "10 min", isCompleted: true },
          {
            id: "l3",
            title: "Reflection: Why Marriage Matters to Us",
            type: "activity",
            duration: "20 min",
            isCompleted: true,
          },
        ],
      },
      {
        id: "mod-2",
        title: "Prepare Yourself",
        isCompleted: true,
        lessons: [
          {
            id: "l4",
            title: "Personal Spiritual Readiness",
            type: "video",
            duration: "18 min",
            isCompleted: true,
            scriptureReference: "Proverbs 4:23",
          },
          { id: "l5", title: "Examining Your Heart", type: "reading", duration: "12 min", isCompleted: true },
          { id: "l6", title: "Self-Assessment Activity", type: "activity", duration: "25 min", isCompleted: false },
        ],
      },
      {
        id: "mod-3",
        title: "Choosing Wisely",
        isCompleted: false,
        lessons: [
          {
            id: "l7",
            title: "Biblical Criteria for a Spouse",
            type: "video",
            duration: "20 min",
            isCompleted: false,
            scriptureReference: "Proverbs 31:10-31",
            videoProgress: 45, // User paused at 45% of the video
            lastWatchedAt: "2024-12-10T14:30:00",
          },
          { id: "l8", title: "Discerning God's Will", type: "reading", duration: "15 min", isCompleted: false },
        ],
      },
      {
        id: "mod-4",
        title: "Holy Courtship",
        isCompleted: false,
        lessons: [
          {
            id: "l9",
            title: "Courtship in the Orthodox Tradition",
            type: "video",
            duration: "18 min",
            isCompleted: false,
            scriptureReference: "Song of Solomon 2:7",
          },
          { id: "l10", title: "Setting Boundaries with Love", type: "reading", duration: "12 min", isCompleted: false },
          { id: "l11", title: "Courtship Discussion Guide", type: "activity", duration: "30 min", isCompleted: false },
        ],
      },
    ],
  },
  // MARRIAGE (4 Lessons)
  {
    id: "marriage",
    title: "Marriage",
    description: "Discover the sacred responsibilities and blessings of the marital covenant.",
    image: "/ethiopian-orthodox-wedding-ceremony-church.jpg",
    duration: "4 weeks",
    progress: 20,
    isLocked: false,
    order: 2,
    modules: [
      {
        id: "mod-5",
        title: "The Holy Union",
        isCompleted: false,
        lessons: [
          {
            id: "l12",
            title: "The Sacrament of Marriage",
            type: "video",
            duration: "20 min",
            isCompleted: true,
            scriptureReference: "Ephesians 5:31-32",
          },
          {
            id: "l13",
            title: "Understanding the Wedding Ceremony",
            type: "reading",
            duration: "15 min",
            isCompleted: false,
          },
        ],
      },
      {
        id: "mod-6",
        title: "Husband & Wife",
        isCompleted: false,
        lessons: [
          {
            id: "l14",
            title: "Roles and Responsibilities",
            type: "video",
            duration: "22 min",
            isCompleted: false,
            scriptureReference: "Ephesians 5:22-28",
          },
          { id: "l15", title: "Mutual Submission in Love", type: "reading", duration: "12 min", isCompleted: false },
          {
            id: "l16",
            title: "Couple Discussion: Our Roles",
            type: "activity",
            duration: "25 min",
            isCompleted: false,
          },
        ],
      },
      {
        id: "mod-7",
        title: "Talk & Resolve",
        isCompleted: false,
        lessons: [
          {
            id: "l17",
            title: "Communication with Grace",
            type: "video",
            duration: "18 min",
            isCompleted: false,
            scriptureReference: "Colossians 4:6",
          },
          {
            id: "l18",
            title: "Resolving Conflict Biblically",
            type: "reading",
            duration: "15 min",
            isCompleted: false,
          },
          { id: "l19", title: "Active Listening Exercise", type: "activity", duration: "30 min", isCompleted: false },
        ],
      },
      {
        id: "mod-8",
        title: "Peaceful Home",
        isCompleted: false,
        lessons: [
          {
            id: "l20",
            title: "Creating a Christ-Centered Home",
            type: "video",
            duration: "20 min",
            isCompleted: false,
            scriptureReference: "Joshua 24:15",
          },
          { id: "l21", title: "Daily Rhythms of Faith", type: "reading", duration: "10 min", isCompleted: false },
        ],
      },
    ],
  },
  // POST-WEDDING (4 Lessons)
  {
    id: "post-wedding",
    title: "Post-Wedding",
    description: "Navigate the seasons of married life with wisdom, faith, and enduring love.",
    image: "/ethiopian-family-children-blessing.jpg",
    duration: "4 weeks",
    progress: 0,
    isLocked: true,
    order: 3,
    modules: [
      {
        id: "mod-9",
        title: "Raising Godly Kids",
        isCompleted: false,
        lessons: [
          {
            id: "l22",
            title: "Parenting with Purpose",
            type: "video",
            duration: "22 min",
            isCompleted: false,
            scriptureReference: "Proverbs 22:6",
          },
          { id: "l23", title: "Teaching Faith to Children", type: "reading", duration: "15 min", isCompleted: false },
          { id: "l24", title: "Family Devotion Plan", type: "activity", duration: "20 min", isCompleted: false },
        ],
      },
      {
        id: "mod-10",
        title: "Smart Family Finance",
        isCompleted: false,
        lessons: [
          {
            id: "l25",
            title: "Biblical Stewardship",
            type: "video",
            duration: "18 min",
            isCompleted: false,
            scriptureReference: "Proverbs 21:5",
          },
          { id: "l26", title: "Budgeting as a Couple", type: "reading", duration: "12 min", isCompleted: false },
        ],
      },
      {
        id: "mod-11",
        title: "Guard Your Marriage",
        isCompleted: false,
        lessons: [
          {
            id: "l27",
            title: "Protecting Your Covenant",
            type: "video",
            duration: "20 min",
            isCompleted: false,
            scriptureReference: "Malachi 2:16",
          },
          { id: "l28", title: "Building Boundaries", type: "reading", duration: "15 min", isCompleted: false },
          { id: "l29", title: "Accountability Discussion", type: "activity", duration: "25 min", isCompleted: false },
        ],
      },
      {
        id: "mod-12",
        title: "Growing Old Together",
        isCompleted: false,
        lessons: [
          {
            id: "l30",
            title: "A Lifetime of Love",
            type: "video",
            duration: "18 min",
            isCompleted: false,
            scriptureReference: "Ecclesiastes 9:9",
          },
          { id: "l31", title: "Legacy and Blessing", type: "reading", duration: "12 min", isCompleted: false },
          { id: "l32", title: "Vision for Our Future", type: "activity", duration: "30 min", isCompleted: false },
        ],
      },
    ],
  },
]

// Mock Activities
export const mockActivities: Activity[] = [
  {
    id: "act-1",
    title: "Weekly Gratitude Journal",
    description: "Write three things you appreciate about your partner this week.",
    type: "journal",
    dueDate: "2024-12-15",
    isCompleted: false,
    partnerCompleted: false,
    icon: "heart",
  },
  {
    id: "act-2",
    title: "Evening Prayer Together",
    description: "Spend 10 minutes in prayer together before bed.",
    type: "prayer",
    dueDate: "2024-12-12",
    isCompleted: true,
    partnerCompleted: true,
    icon: "hands-praying",
  },
  {
    id: "act-3",
    title: "Communication Exercise",
    description: "Practice active listening using the techniques from Lesson 5.",
    type: "weekly-task",
    dueDate: "2024-12-14",
    isCompleted: true,
    partnerCompleted: false,
    icon: "message-circle",
  },
  {
    id: "act-4",
    title: "Discussion: Our Dreams",
    description: "Share your hopes and dreams for the next five years.",
    type: "discussion",
    isCompleted: false,
    partnerCompleted: false,
    icon: "sparkles",
  },
]

// Mock Quiz
export const mockQuiz: Quiz = {
  id: "quiz-1",
  title: "Module 1 Assessment",
  courseId: "foundations-of-marriage",
  isCompleted: false,
  questions: [
    {
      id: "q1",
      text: "According to Ephesians 5:25, how should husbands love their wives?",
      options: [
        "As they love themselves",
        "As Christ loved the church",
        "As they love their parents",
        "As they love their friends",
      ],
      correctAnswer: 1,
    },
    {
      id: "q2",
      text: "What is the primary foundation of a Christian marriage?",
      options: ["Financial stability", "Physical attraction", "Faith in God", "Cultural compatibility"],
      correctAnswer: 2,
    },
    {
      id: "q3",
      text: "Which virtue is essential for effective communication in marriage?",
      options: ["Pride", "Patience", "Independence", "Competition"],
      correctAnswer: 1,
    },
  ],
}

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: "m1",
    senderId: "2",
    text: "I really enjoyed today's lesson on communication. The scripture reference was so meaningful.",
    timestamp: "2024-12-10T14:30:00",
    isSaved: true,
  },
  {
    id: "m2",
    senderId: "1",
    text: "Me too! I think we should try the active listening exercise tonight.",
    timestamp: "2024-12-10T14:32:00",
    isSaved: false,
  },
  {
    id: "m3",
    senderId: "2",
    text: "That sounds wonderful. I'll be home by 6pm. ❤️",
    timestamp: "2024-12-10T14:35:00",
    isSaved: false,
  },
  {
    id: "m4",
    senderId: "1",
    text: "Perfect! I'll prepare some tea and we can sit in the garden.",
    timestamp: "2024-12-10T14:36:00",
    isSaved: true,
  },
  {
    id: "m5",
    senderId: "2",
    text: "Hey! I just left the church. The service was beautiful today 🙏",
    timestamp: "2024-12-11T11:45:00",
    isSaved: false,
  },
  {
    id: "m6",
    senderId: "1",
    text: "Oh that's wonderful! How was it? I wish I could have joined you.",
    timestamp: "2024-12-11T11:47:00",
    isSaved: false,
  },
  {
    id: "m7",
    senderId: "2",
    text: "It was really peaceful. The priest spoke about the importance of prayer in marriage. Made me think of us ❤️",
    timestamp: "2024-12-11T11:48:00",
    isSaved: true,
  },
  {
    id: "m8",
    senderId: "2",
    image: "https://i.pinimg.com/1200x/f7/ef/73/f7ef73074b2cc41bc771c6b6bd2c43d9.jpg",
    text: "Look how beautiful the church looks today!",
    timestamp: "2024-12-11T11:50:00",
    isSaved: true,
  },
  {
    id: "m9",
    senderId: "1",
    text: "Wow, that's stunning! 😍 We should visit together this weekend. I'd love to pray there with you.",
    timestamp: "2024-12-11T11:52:00",
    isSaved: false,
  },
  {
    id: "m10",
    senderId: "2",
    text: "Yes! That would be perfect. Let's go together on Saturday morning. I know you'll love the atmosphere there.",
    timestamp: "2024-12-11T11:53:00",
    isSaved: false,
  },
  {
    id: "m11",
    senderId: "1",
    text: "Perfect! I'm already looking forward to it. It'll be a beautiful way to start our weekend together 🙏",
    timestamp: "2024-12-11T11:55:00",
    isSaved: false,
  },
]

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: "n1",
    type: "lesson",
    title: "New Lesson Available",
    message: 'Continue your journey with "Listening with the Heart"',
    timestamp: "2024-12-10T09:00:00",
    isRead: false,
  },
  {
    id: "n2",
    type: "partner",
    title: "Abraham completed an activity",
    message: "Your partner finished the Evening Prayer activity!",
    timestamp: "2024-12-09T20:00:00",
    isRead: false,
  },
  {
    id: "n3",
    type: "motivation",
    title: "Weekly Inspiration",
    message: '"Love is patient, love is kind..." - 1 Corinthians 13:4',
    timestamp: "2024-12-09T08:00:00",
    isRead: true,
  },
  {
    id: "n4",
    type: "event",
    title: "Upcoming Live Session",
    message: "Join Deacon Yohannes for Q&A this Saturday at 3pm",
    timestamp: "2024-12-08T10:00:00",
    isRead: true,
  },
]

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: "post-1",
    author: "Deacon Yohannes",
    authorRole: "deacon",
    content:
      "Blessed are those who trust in the Lord. Remember, your marriage is a journey of faith. Keep growing together! 🙏",
    timestamp: "2024-12-10T08:00:00",
    likes: 24,
    avatar: "/ethiopian-man-portrait.jpg",
  },
  {
    id: "post-2",
    author: "Solomon & Sarah",
    authorRole: "couple",
    content:
      "We just completed the Pre-Marriage course and it has been such a blessing! The lessons on communication and prayer have transformed our relationship. Thank you to everyone in this community for your support! 🙏❤️",
    timestamp: "2024-12-09T15:00:00",
    likes: 18,
    avatar: "/ethiopian-couple-courtship-prayer.jpg",
  },
  {
    id: "post-3",
    author: "Daniel & Ruth",
    authorRole: "couple",
    content:
      "Reminder: Our monthly couples fellowship is this Sunday after service. Light refreshments will be served. Looking forward to seeing everyone!",
    timestamp: "2024-12-08T10:00:00",
    likes: 32,
    avatar: "/ethiopian-orthodox-wedding-couple-church.jpg",
  },
  {
    id: "post-4",
    author: "Michael & Mary",
    authorRole: "couple",
    content:
      "Three years of marriage and we're still learning! The Post-Wedding course has been so helpful. Marriage truly is a journey of growth together in Christ. 🙏",
    timestamp: "2024-12-07T14:30:00",
    likes: 28,
    avatar: "/ethiopian-orthodox-wedding-ceremony-church.jpg",
  },
  {
    id: "post-5",
    author: "David & Hannah",
    authorRole: "couple",
    content:
      "Grateful for this ministry and the community. The activities we do together have brought us so much closer. God bless all the couples on this journey! ❤️",
    timestamp: "2024-12-06T09:15:00",
    likes: 21,
    avatar: "/ethiopian-family-children-blessing.jpg",
  },
]

export function isCourseUnlocked(courseId: string, courses: Course[]): boolean {
  const course = courses.find((c) => c.id === courseId)
  if (!course) return false

  // First course is always unlocked
  if (course.order === 1) return true

  // Find the previous course
  const previousCourse = courses.find((c) => c.order === course.order - 1)
  if (!previousCourse) return true

  // Check if ALL lessons in the previous course are completed
  const allLessonsCompleted = previousCourse.modules.every((module) =>
    module.lessons.every((lesson) => lesson.isCompleted),
  )

  return allLessonsCompleted
}

export function getPreviousCourseName(courseId: string, courses: Course[]): string | null {
  const course = courses.find((c) => c.id === courseId)
  if (!course || course.order === 1) return null

  const previousCourse = courses.find((c) => c.order === course.order - 1)
  return previousCourse?.title || null
}
