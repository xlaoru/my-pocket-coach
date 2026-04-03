import { IPeriodization, IProgram } from './types/models'

export const programs: IProgram[] = [
  {
    name: 'Push Strength A',
    description:
      'Heavy upper-body push day focused on bench strength with shoulder and triceps volume.',
    workout: [
      {
        name: 'Barbell Bench Press',
        sets: [
          { weight: 80, reps: 6 },
          { weight: 85, reps: 5 },
          { weight: 85, reps: 5 },
          { weight: 80, reps: 6 },
        ],
      },
      {
        name: 'Standing Overhead Press',
        sets: [
          { weight: 45, reps: 6 },
          { weight: 47.5, reps: 5 },
          { weight: 47.5, reps: 5 },
        ],
      },
      {
        name: 'Chest + Triceps Finisher',
        exercises: [
          {
            name: 'Incline Dumbbell Press',
            sets: [
              { weight: 30, reps: 10 },
              { weight: 30, reps: 10 },
              { weight: 27.5, reps: 12 },
            ],
          },
          {
            name: 'Cable Triceps Pushdown',
            sets: [
              { weight: 35, reps: 12 },
              { weight: 35, reps: 12 },
              { weight: 30, reps: 15 },
            ],
          },
        ],
      },
      {
        name: 'Dumbbell Lateral Raise',
        sets: [
          { weight: 10, reps: 15 },
          { weight: 10, reps: 15 },
          { weight: 8, reps: 20 },
        ],
      },
    ],
    date: new Date('2026-04-03'),
  },
  {
    name: 'Pull Hypertrophy B',
    description:
      'Posterior-chain and back-focused session combining deadlift strength and pull hypertrophy.',
    workout: [
      {
        name: 'Conventional Deadlift',
        sets: [
          { weight: 120, reps: 5 },
          { weight: 125, reps: 4 },
          { weight: 125, reps: 4 },
        ],
      },
      {
        name: 'Weighted Pull-up',
        sets: [
          { weight: 10, reps: 6 },
          { weight: 10, reps: 6 },
          { weight: 5, reps: 8 },
        ],
      },
      {
        name: 'Row + Rear Delts',
        exercises: [
          {
            name: 'Chest-Supported Row',
            sets: [
              { weight: 50, reps: 10 },
              { weight: 50, reps: 10 },
              { weight: 45, reps: 12 },
            ],
          },
          {
            name: 'Face Pull',
            sets: [
              { weight: 25, reps: 15 },
              { weight: 25, reps: 15 },
              { weight: 20, reps: 18 },
            ],
          },
        ],
      },
      {
        name: 'EZ-Bar Curl',
        sets: [
          { weight: 30, reps: 10 },
          { weight: 30, reps: 10 },
          { weight: 25, reps: 12 },
        ],
      },
    ],
    date: new Date('2026-04-05'),
  },
  {
    name: 'Leg Day Power C',
    description:
      'Lower-body power and hypertrophy session built around squats, hinges, and unilateral work.',
    workout: [
      {
        name: 'Back Squat',
        sets: [
          { weight: 110, reps: 5 },
          { weight: 115, reps: 5 },
          { weight: 115, reps: 5 },
          { weight: 110, reps: 6 },
        ],
      },
      {
        name: 'Romanian Deadlift',
        sets: [
          { weight: 90, reps: 8 },
          { weight: 95, reps: 8 },
          { weight: 95, reps: 8 },
        ],
      },
      {
        name: 'Quad + Calf Superset',
        exercises: [
          {
            name: 'Leg Press',
            sets: [
              { weight: 180, reps: 12 },
              { weight: 180, reps: 12 },
              { weight: 170, reps: 15 },
            ],
          },
          {
            name: 'Standing Calf Raise',
            sets: [
              { weight: 70, reps: 15 },
              { weight: 70, reps: 15 },
              { weight: 60, reps: 20 },
            ],
          },
        ],
      },
      {
        name: 'Walking Lunge',
        sets: [
          { weight: 20, reps: 12 },
          { weight: 20, reps: 12 },
          { weight: 16, reps: 14 },
        ],
      },
    ],
    date: new Date('2026-04-07'),
  },
  {
    name: 'Upper Body Volume D',
    description:
      'High-volume upper-body day targeting chest, back, delts, and arms for muscle growth.',
    workout: [
      {
        name: 'Incline Barbell Press',
        sets: [
          { weight: 70, reps: 8 },
          { weight: 70, reps: 8 },
          { weight: 67.5, reps: 10 },
        ],
      },
      {
        name: 'Lat Pulldown',
        sets: [
          { weight: 65, reps: 10 },
          { weight: 65, reps: 10 },
          { weight: 60, reps: 12 },
        ],
      },
      {
        name: 'Delts + Arms Superset',
        exercises: [
          {
            name: 'Seated Dumbbell Shoulder Press',
            sets: [
              { weight: 24, reps: 10 },
              { weight: 24, reps: 10 },
              { weight: 22, reps: 12 },
            ],
          },
          {
            name: 'Alternating Dumbbell Curl',
            sets: [
              { weight: 14, reps: 12 },
              { weight: 14, reps: 12 },
              { weight: 12, reps: 14 },
            ],
          },
        ],
      },
      {
        name: 'Overhead Cable Triceps Extension',
        sets: [
          { weight: 27.5, reps: 12 },
          { weight: 27.5, reps: 12 },
          { weight: 25, reps: 15 },
        ],
      },
    ],
    date: new Date('2026-04-09'),
  },
  {
    name: 'Full Body Athletic E',
    description:
      'Athletic full-body session blending strength, explosiveness, and core stability work.',
    workout: [
      {
        name: 'Front Squat',
        sets: [
          { weight: 80, reps: 5 },
          { weight: 82.5, reps: 5 },
          { weight: 82.5, reps: 5 },
        ],
      },
      {
        name: 'Push Press',
        sets: [
          { weight: 55, reps: 5 },
          { weight: 57.5, reps: 4 },
          { weight: 55, reps: 5 },
        ],
      },
      {
        name: 'Athletic Pull + Core Superset',
        exercises: [
          {
            name: 'Chin-up',
            sets: [
              { weight: 0, reps: 10 },
              { weight: 0, reps: 9 },
              { weight: 0, reps: 8 },
            ],
          },
          {
            name: 'Hanging Knee Raise',
            sets: [
              { weight: 0, reps: 15 },
              { weight: 0, reps: 15 },
              { weight: 0, reps: 12 },
            ],
          },
        ],
      },
      {
        name: 'Farmer Carry (meters)',
        sets: [
          { weight: 32, reps: 30 },
          { weight: 32, reps: 30 },
          { weight: 28, reps: 40 },
        ],
      },
    ],
    date: new Date('2026-04-11'),
  },
]

export const periodizations: IPeriodization[] = [
  {
    name: 'Wave Strength 12 Weeks',
    description: 'Linear wave-based approach to increase strength in compound lifts.',
    stages: [
      {
        name: 'Accumulation (Weeks 1-4)',
        description: 'Volume block: 65-75% 1RM, 6-10 reps, with a strong focus on technique.',
      },
      {
        name: 'Intensification (Weeks 5-8)',
        description: 'Strength block: 75-85% 1RM, 4-6 reps, with reduced overall volume.',
      },
      {
        name: 'Peak (Weeks 9-11)',
        description: 'Peak block: 85-92% 1RM, 2-4 reps, with recovery as a top priority.',
      },
      {
        name: 'Deload + Test (Week 12)',
        description: 'Deload at 50-60% 1RM and perform controlled 1-3RM test sets at week end.',
      },
    ],
  },
  {
    name: 'Hypertrophy Block 10 Weeks',
    description: 'Periodized hypertrophy cycle designed for muscle gain with planned progression.',
    stages: [
      {
        name: 'Base Volume (Weeks 1-3)',
        description: '8-12 reps, RPE 6-7, moderate loads, and tempo control practice.',
      },
      {
        name: 'Progressive Overload (Weeks 4-6)',
        description: 'Increase total tonnage via +1 set and/or +2.5-5% load each week.',
      },
      {
        name: 'Metabolic Stress (Weeks 7-8)',
        description: '12-20 reps, short rest periods, plus drop sets and supersets at session end.',
      },
      {
        name: 'Recovery Pivot (Week 9)',
        description: 'Reduce volume by 40-50% while maintaining technical intensity.',
      },
      {
        name: 'Rebound Week (Week 10)',
        description: 'Return to week-6 working weights with lower perceived effort.',
      },
    ],
  },
  {
    name: 'Athletic Performance 8 Weeks',
    description: 'Mixed cycle for strength, power, and work capacity in field and court sports.',
    stages: [
      {
        name: 'Movement Quality (Weeks 1-2)',
        description: 'Mobility, trunk control, light strength patterns, and basic coordination.',
      },
      {
        name: 'Strength Foundation (Weeks 3-4)',
        description: 'Strength base: squat/hinge/press at 70-80% 1RM, 4-6 reps, 3-5 sets.',
      },
      {
        name: 'Power Conversion (Weeks 5-6)',
        description:
          'Power conversion: jumps, explosive presses, and contrast strength-power pairs.',
      },
      {
        name: 'Competition Readiness (Week 7)',
        description: 'Maintain intensity at low volume with emphasis on movement speed.',
      },
      {
        name: 'Taper (Week 8)',
        description: 'Reduce fatigue before competition with short sessions and high freshness.',
      },
    ],
  },
]
