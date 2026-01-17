import { AuditReport, AuditScore, AuditIssue } from './types';

const getRandomScore = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getStatus = (score: number): 'critical' | 'warning' | 'good' => {
  if (score < 50) return 'critical';
  if (score < 75) return 'warning';
  return 'good';
};

const seoIssues: AuditIssue[] = [
  {
    severity: 'critical',
    title: 'Missing Meta Description',
    description: 'Your page lacks a meta description, reducing click-through rates from search results.',
    tip: 'Add a compelling 150-160 character meta description that includes your main keyword.',
  },
  {
    severity: 'important',
    title: 'Missing H1 Tag',
    description: 'No H1 heading found on the page, hurting SEO and accessibility.',
    tip: 'Add a single, keyword-rich H1 tag that describes your page content.',
  },
  {
    severity: 'suggested',
    title: 'Images Missing Alt Text',
    description: '3 images are missing alt attributes, reducing accessibility and image SEO.',
    tip: 'Add descriptive alt text to all images that describes what they show.',
  },
];

const pageSpeedIssues: AuditIssue[] = [
  {
    severity: 'critical',
    title: 'Large Image Files',
    description: 'Unoptimized images are adding 2.3MB to your page load.',
    tip: 'Compress images using WebP format and implement lazy loading.',
  },
  {
    severity: 'important',
    title: 'Render-Blocking Resources',
    description: 'CSS and JavaScript files are blocking initial render.',
    tip: 'Defer non-critical scripts and inline critical CSS.',
  },
  {
    severity: 'suggested',
    title: 'Browser Caching Not Configured',
    description: 'Static assets are being re-downloaded on each visit.',
    tip: 'Set cache-control headers to leverage browser caching.',
  },
];

const mobileIssues: AuditIssue[] = [
  {
    severity: 'critical',
    title: 'Touch Targets Too Small',
    description: 'Buttons and links are smaller than 48x48px, making them hard to tap.',
    tip: 'Increase button sizes and add adequate spacing between interactive elements.',
  },
  {
    severity: 'important',
    title: 'Text Too Small on Mobile',
    description: 'Some text is below 16px, requiring users to zoom.',
    tip: 'Use a minimum font size of 16px for body text on mobile.',
  },
  {
    severity: 'suggested',
    title: 'Horizontal Scrolling Detected',
    description: 'Content extends beyond the viewport on mobile devices.',
    tip: 'Use responsive design and avoid fixed-width elements.',
  },
];

const uxIssues: AuditIssue[] = [
  {
    severity: 'critical',
    title: 'Confusing Navigation',
    description: 'Menu structure is unclear, making it hard for visitors to find information.',
    tip: 'Simplify navigation to 5-7 main items and use clear, descriptive labels.',
  },
  {
    severity: 'important',
    title: 'Low Color Contrast',
    description: 'Text-to-background contrast is below WCAG standards in some areas.',
    tip: 'Ensure a minimum contrast ratio of 4.5:1 for normal text.',
  },
  {
    severity: 'suggested',
    title: 'No Visual Hierarchy',
    description: 'Important content doesn\'t stand out from secondary information.',
    tip: 'Use size, color, and spacing to create clear visual hierarchy.',
  },
];

const conversionIssues: AuditIssue[] = [
  {
    severity: 'critical',
    title: 'No Clear CTA Above Fold',
    description: 'Visitors can\'t immediately see what action to take.',
    tip: 'Add a prominent, contrasting call-to-action button in your hero section.',
  },
  {
    severity: 'important',
    title: 'Too Many Form Fields',
    description: 'Your contact form has 8+ fields, causing abandonment.',
    tip: 'Reduce form fields to essential ones only (3-5 fields maximum).',
  },
  {
    severity: 'suggested',
    title: 'Weak Value Proposition',
    description: 'It\'s unclear what makes your business unique.',
    tip: 'Add a clear headline that communicates your unique benefit in 6 words or less.',
  },
];

const trustIssues: AuditIssue[] = [
  {
    severity: 'critical',
    title: 'No Customer Testimonials',
    description: 'Missing social proof reduces trust and conversions.',
    tip: 'Add 3-5 customer testimonials with names, photos, and specific results.',
  },
  {
    severity: 'important',
    title: 'Contact Information Hard to Find',
    description: 'Visitors can\'t easily verify your business is legitimate.',
    tip: 'Display phone number, email, and address prominently in header or footer.',
  },
  {
    severity: 'suggested',
    title: 'No Trust Badges',
    description: 'Missing security and certification badges reduce confidence.',
    tip: 'Add SSL badge, payment security icons, and relevant certifications.',
  },
];

const generateAuditScore = (
  title: string,
  description: string,
  issues: AuditIssue[],
  minScore: number,
  maxScore: number
): AuditScore => {
  const score = getRandomScore(minScore, maxScore);
  const selectedIssues = issues.slice(0, score < 50 ? 3 : score < 75 ? 2 : 1);
  
  return {
    score,
    status: getStatus(score),
    title,
    description,
    issues: selectedIssues,
  };
};

export const generateMockReport = (url: string): AuditReport => {
  return {
    url,
    overallScore: getRandomScore(45, 78),
    analyzedAt: new Date(),
    seo: generateAuditScore(
      'SEO Score',
      'How well your site is optimized for search engines',
      seoIssues,
      40,
      85
    ),
    pageSpeed: generateAuditScore(
      'Page Speed',
      'How fast your website loads for visitors',
      pageSpeedIssues,
      35,
      80
    ),
    mobileFriendly: generateAuditScore(
      'Mobile Friendliness',
      'How well your site works on mobile devices',
      mobileIssues,
      50,
      90
    ),
    uxDesign: generateAuditScore(
      'UX & Design',
      'User experience and visual design quality',
      uxIssues,
      45,
      85
    ),
    conversionOptimization: generateAuditScore(
      'Conversion Optimization',
      'How effectively your site converts visitors',
      conversionIssues,
      30,
      75
    ),
    trustCredibility: generateAuditScore(
      'Trust & Credibility',
      'How trustworthy your site appears to visitors',
      trustIssues,
      40,
      80
    ),
  };
};
