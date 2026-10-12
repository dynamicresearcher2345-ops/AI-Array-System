export const aiArray = {
  name: 'AI Array',
  type: 'Advanced AI Data System',
  description:
    'A multi-layer intelligence platform with voice, image search, deep research, and specialized labs for science, stock tracking, research workflows, and music creation.',
  coreFeatures: [
    'Voice-enabled chatbot',
    'Image search and visual analysis',
    'Deep research and document synthesis',
    'Lab-based AI workflows',
    'Smart data organization',
    'Adaptive reasoning and summary generation',
  ],
  chatbot: {
    voiceFeature: true,
    imageSearch: true,
    deepResearch: true,
    labOptions: [
      {
        name: 'Science Lab',
        description: 'Search scientific topics, explain concepts, and organize knowledge into structured insights.',
        features: ['Scientific search', 'Concept breakdown', 'Research summaries'],
      },
      {
        name: 'Stock Lab',
        description: 'Track the stock market of a selected country and monitor broader trend signals.',
        features: ['Market tracking', 'Country-level analysis', 'Trend summaries'],
      },
      {
        name: 'Research Lab',
        description: 'Search research topics, synthesize findings, and generate concise summaries.',
        features: ['Research query', 'Summary generation', 'Brief extraction'],
      },
      {
        name: 'Music Lab',
        description: 'Generate song concepts, tune direction, and creative prompts for musical production.',
        features: ['Song prompts', 'Tune ideas', 'Composition guidance'],
      },
    ],
  },
};
