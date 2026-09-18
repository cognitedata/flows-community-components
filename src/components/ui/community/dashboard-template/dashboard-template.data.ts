export type DocumentRow = {
  id: number;
  header: string;
  type: string;
  status: 'Done' | 'In Process';
  target: string;
  limit: string;
  reviewer: string;
};

export type VisitorPoint = {
  date: string;
  desktop: number;
  mobile: number;
};

export const documentRows: DocumentRow[] = [
  {
    id: 1,
    header: 'Cover page',
    type: 'Cover page',
    status: 'In Process',
    target: '18',
    limit: '5',
    reviewer: 'Eddie Lake',
  },
  {
    id: 2,
    header: 'Table of contents',
    type: 'Table of contents',
    status: 'Done',
    target: '29',
    limit: '24',
    reviewer: 'Eddie Lake',
  },
  {
    id: 3,
    header: 'Executive summary',
    type: 'Narrative',
    status: 'Done',
    target: '10',
    limit: '13',
    reviewer: 'Eddie Lake',
  },
  {
    id: 4,
    header: 'Technical approach',
    type: 'Narrative',
    status: 'Done',
    target: '27',
    limit: '23',
    reviewer: 'Jamik Tashpulatov',
  },
  {
    id: 5,
    header: 'Design',
    type: 'Narrative',
    status: 'In Process',
    target: '2',
    limit: '16',
    reviewer: 'Jamik Tashpulatov',
  },
  {
    id: 6,
    header: 'Capabilities',
    type: 'Narrative',
    status: 'In Process',
    target: '20',
    limit: '8',
    reviewer: 'Jamik Tashpulatov',
  },
  {
    id: 7,
    header: 'Integration with existing systems',
    type: 'Narrative',
    status: 'In Process',
    target: '19',
    limit: '21',
    reviewer: 'Jamik Tashpulatov',
  },
  {
    id: 8,
    header: 'Innovation and Advantages',
    type: 'Narrative',
    status: 'Done',
    target: '25',
    limit: '26',
    reviewer: 'Assign reviewer',
  },
  {
    id: 9,
    header: "Overview of EMR's Innovative Solutions",
    type: 'Technical content',
    status: 'Done',
    target: '7',
    limit: '23',
    reviewer: 'Assign reviewer',
  },
  {
    id: 10,
    header: 'Advanced Algorithms and Machine Learning',
    type: 'Narrative',
    status: 'Done',
    target: '30',
    limit: '28',
    reviewer: 'Assign reviewer',
  },
  {
    id: 11,
    header: 'Adaptive Communication Protocols',
    type: 'Narrative',
    status: 'Done',
    target: '9',
    limit: '31',
    reviewer: 'Assign reviewer',
  },
  {
    id: 12,
    header: 'Advantages Over Current Technologies',
    type: 'Narrative',
    status: 'Done',
    target: '12',
    limit: '0',
    reviewer: 'Assign reviewer',
  },
  {
    id: 13,
    header: 'Past Performance',
    type: 'Narrative',
    status: 'Done',
    target: '22',
    limit: '33',
    reviewer: 'Assign reviewer',
  },
  {
    id: 14,
    header: 'Customer Feedback and Satisfaction Levels',
    type: 'Narrative',
    status: 'Done',
    target: '15',
    limit: '34',
    reviewer: 'Assign reviewer',
  },
  {
    id: 15,
    header: 'Implementation Challenges and Solutions',
    type: 'Narrative',
    status: 'Done',
    target: '3',
    limit: '35',
    reviewer: 'Assign reviewer',
  },
  {
    id: 16,
    header: 'Security Measures and Data Protection Policies',
    type: 'Technical content',
    status: 'In Process',
    target: '6',
    limit: '36',
    reviewer: 'Assign reviewer',
  },
  {
    id: 17,
    header: 'Scalability and Future Proofing',
    type: 'Narrative',
    status: 'Done',
    target: '4',
    limit: '37',
    reviewer: 'Assign reviewer',
  },
  {
    id: 18,
    header: 'Cost-Benefit Analysis',
    type: 'Plain language',
    status: 'Done',
    target: '14',
    limit: '38',
    reviewer: 'Assign reviewer',
  },
  {
    id: 19,
    header: 'User Training and Onboarding Experience',
    type: 'Narrative',
    status: 'Done',
    target: '17',
    limit: '39',
    reviewer: 'Assign reviewer',
  },
  {
    id: 20,
    header: 'Future Development Roadmap',
    type: 'Narrative',
    status: 'Done',
    target: '11',
    limit: '40',
    reviewer: 'Assign reviewer',
  },
];

export const visitorChartData: VisitorPoint[] = Array.from(
  { length: 91 },
  (_, index) => {
    const date = new Date(Date.UTC(2024, 3, 1 + index));
    return {
      date: date.toISOString().slice(0, 10),
      desktop: 80 + ((index * 37) % 420),
      mobile: 70 + ((index * 53) % 460),
    };
  }
);

export const chartReferenceDate = '2024-06-30';
