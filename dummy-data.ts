import { IPeriodization, IProgram } from './types/models'

export const programs: IProgram[] = [
  {
    _id: 'program-push-strength-a',
    name: 'Push Strength A',
    description:
      'Heavy upper-body push day focused on bench strength with shoulder and triceps volume.',
    workout: [
      {
        _id: 'ex-bench-press',
        type: 'exercise',
        name: 'Barbell Bench Press',
        components: [
          {
            _id: 'ex-bench-press',
            name: 'Barbell Bench Press',
            sets: [
              { weight: 80, reps: 6 },
              { weight: 85, reps: 5 },
              { weight: 85, reps: 5 },
              { weight: 80, reps: 6 },
            ],
          },
        ],
      },
      {
        _id: 'ex-standing-overhead-press',
        type: 'exercise',
        name: 'Standing Overhead Press',
        components: [
          {
            _id: 'ex-standing-overhead-press',
            name: 'Standing Overhead Press',
            sets: [
              { weight: 45, reps: 6 },
              { weight: 47.5, reps: 5 },
              { weight: 47.5, reps: 5 },
            ],
          },
        ],
      },
      {
        _id: 'ss-chest-triceps-finisher',
        type: 'superset',
        name: 'Chest + Triceps Finisher',
        components: [
          {
            _id: 'ex-incline-dumbbell-press',
            name: 'Incline Dumbbell Press',
            sets: [
              { weight: 30, reps: 10 },
              { weight: 30, reps: 10 },
              { weight: 27.5, reps: 12 },
            ],
          },
          {
            _id: 'ex-cable-triceps-pushdown',
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
        _id: 'ex-dumbbell-lateral-raise',
        type: 'exercise',
        name: 'Dumbbell Lateral Raise',
        components: [
          {
            _id: 'ex-dumbbell-lateral-raise',
            name: 'Dumbbell Lateral Raise',
            sets: [
              { weight: 10, reps: 15 },
              { weight: 10, reps: 15 },
              { weight: 8, reps: 20 },
            ],
          },
        ],
      },
    ],
    date: new Date('2026-04-03'),
  },
  {
    _id: 'program-pull-hypertrophy-b',
    name: 'Pull Hypertrophy B',
    description:
      'Posterior-chain and back-focused session combining deadlift strength and pull hypertrophy.',
    workout: [
      {
        _id: 'ex-conventional-deadlift',
        type: 'exercise',
        name: 'Conventional Deadlift',
        components: [
          {
            _id: 'ex-conventional-deadlift',
            name: 'Conventional Deadlift',
            sets: [
              { weight: 120, reps: 5 },
              { weight: 125, reps: 4 },
              { weight: 125, reps: 4 },
            ],
          },
        ],
      },
      {
        _id: 'ex-weighted-pull-up',
        type: 'exercise',
        name: 'Weighted Pull-up',
        components: [
          {
            _id: 'ex-weighted-pull-up',
            name: 'Weighted Pull-up',
            sets: [
              { weight: 10, reps: 6 },
              { weight: 10, reps: 6 },
              { weight: 5, reps: 8 },
            ],
          },
        ],
      },
      {
        _id: 'ss-row-rear-delts',
        type: 'superset',
        name: 'Row + Rear Delts',
        components: [
          {
            _id: 'ex-chest-supported-row',
            name: 'Chest-Supported Row',
            sets: [
              { weight: 50, reps: 10 },
              { weight: 50, reps: 10 },
              { weight: 45, reps: 12 },
            ],
          },
          {
            _id: 'ex-face-pull',
            name: 'Face Pull',
            sets: [
              { weight: 25, reps: 15 },
              { weight: 25, reps: 15 },
              { weight: 20, reps: 18 },
            ],
          },
        ],
      },
    ],
    date: new Date('2026-04-05'),
  },
  {
    _id: 'program-leg-day-power-c',
    name: 'Leg Day Power C',
    description:
      'Lower-body power and hypertrophy session built around squats, hinges, and unilateral work.',
    workout: [
      {
        _id: 'ex-back-squat',
        type: 'exercise',
        name: 'Back Squat',
        components: [
          {
            _id: 'ex-back-squat',
            name: 'Back Squat',
            sets: [
              { weight: 110, reps: 5 },
              { weight: 115, reps: 5 },
              { weight: 115, reps: 5 },
              { weight: 110, reps: 6 },
            ],
          },
        ],
      },
      {
        _id: 'ex-romanian-deadlift',
        type: 'exercise',
        name: 'Romanian Deadlift',
        components: [
          {
            _id: 'ex-romanian-deadlift',
            name: 'Romanian Deadlift',
            sets: [
              { weight: 90, reps: 8 },
              { weight: 95, reps: 8 },
              { weight: 95, reps: 8 },
            ],
          },
        ],
      },
      {
        _id: 'ss-quad-calf-superset',
        type: 'superset',
        name: 'Quad + Calf Superset',
        components: [
          {
            _id: 'ex-leg-press',
            name: 'Leg Press',
            sets: [
              { weight: 180, reps: 12 },
              { weight: 180, reps: 12 },
              { weight: 170, reps: 15 },
            ],
          },
          {
            _id: 'ex-standing-calf-raise',
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
        _id: 'ss-hamstring-glute-superset',
        type: 'superset',
        name: 'Hamstring + Glute Superset',
        components: [
          {
            _id: 'ex-lying-leg-curl',
            name: 'Lying Leg Curl',
            sets: [
              { weight: 45, reps: 12 },
              { weight: 45, reps: 12 },
              { weight: 40, reps: 15 },
            ],
          },
          {
            _id: 'ex-hip-thrust',
            name: 'Hip Thrust',
            sets: [
              { weight: 90, reps: 10 },
              { weight: 90, reps: 10 },
              { weight: 80, reps: 12 },
            ],
          },
        ],
      },
    ],
    date: new Date('2026-04-07'),
  },
  {
    _id: 'program-upper-body-volume-d',
    name: 'Upper Body Volume D',
    description:
      'High-volume upper-body day targeting chest, back, delts, and arms for muscle growth.',
    workout: [
      {
        _id: 'ex-incline-barbell-press',
        type: 'exercise',
        name: 'Incline Barbell Press',
        components: [
          {
            _id: 'ex-incline-barbell-press',
            name: 'Incline Barbell Press',
            sets: [
              { weight: 70, reps: 8 },
              { weight: 70, reps: 8 },
              { weight: 67.5, reps: 10 },
            ],
          },
        ],
      },
      {
        _id: 'ex-lat-pulldown',
        type: 'exercise',
        name: 'Lat Pulldown',
        components: [
          {
            _id: 'ex-lat-pulldown',
            name: 'Lat Pulldown',
            sets: [
              { weight: 65, reps: 10 },
              { weight: 65, reps: 10 },
              { weight: 60, reps: 12 },
            ],
          },
        ],
      },
      {
        _id: 'ex-seated-dumbbell-shoulder-press',
        type: 'exercise',
        name: 'Seated Dumbbell Shoulder Press',
        components: [
          {
            _id: 'ex-seated-dumbbell-shoulder-press',
            name: 'Seated Dumbbell Shoulder Press',
            sets: [
              { weight: 24, reps: 10 },
              { weight: 24, reps: 10 },
              { weight: 22, reps: 12 },
            ],
          },
        ],
      },
      {
        _id: 'ex-overhead-cable-triceps-extension',
        type: 'exercise',
        name: 'Overhead Cable Triceps Extension',
        components: [
          {
            _id: 'ex-overhead-cable-triceps-extension',
            name: 'Overhead Cable Triceps Extension',
            sets: [
              { weight: 27.5, reps: 12 },
              { weight: 27.5, reps: 12 },
              { weight: 25, reps: 15 },
            ],
          },
        ],
      },
    ],
    date: new Date('2026-04-09'),
  },
  {
    _id: 'program-full-body-athletic-e',
    name: 'Full Body Athletic E',
    description:
      'Athletic full-body session blending strength, explosiveness, and core stability work.',
    workout: [
      {
        _id: 'ex-front-squat',
        type: 'exercise',
        name: 'Front Squat',
        components: [
          {
            _id: 'ex-front-squat',
            name: 'Front Squat',
            sets: [
              { weight: 80, reps: 5 },
              { weight: 82.5, reps: 5 },
              { weight: 82.5, reps: 5 },
            ],
          },
        ],
      },
      {
        _id: 'ex-push-press',
        type: 'exercise',
        name: 'Push Press',
        components: [
          {
            _id: 'ex-push-press',
            name: 'Push Press',
            sets: [
              { weight: 55, reps: 5 },
              { weight: 57.5, reps: 4 },
              { weight: 55, reps: 5 },
            ],
          },
        ],
      },
      {
        _id: 'ss-athletic-pull-core-superset',
        type: 'superset',
        name: 'Athletic Pull + Core Superset',
        components: [
          {
            _id: 'ex-chin-up',
            name: 'Chin-up',
            sets: [
              { weight: 0, reps: 10 },
              { weight: 0, reps: 9 },
              { weight: 0, reps: 8 },
            ],
          },
          {
            _id: 'ex-hanging-knee-raise',
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
        _id: 'ss-shoulders-conditioning-finisher',
        type: 'superset',
        name: 'Shoulders + Conditioning Finisher',
        components: [
          {
            _id: 'ex-kettlebell-push-press',
            name: 'Kettlebell Push Press',
            sets: [
              { weight: 20, reps: 10 },
              { weight: 20, reps: 10 },
              { weight: 16, reps: 12 },
            ],
          },
          {
            _id: 'ex-battle-rope-slams',
            name: 'Battle Rope Slams',
            sets: [
              { weight: 0, reps: 30 },
              { weight: 0, reps: 30 },
              { weight: 0, reps: 40 },
            ],
          },
        ],
      },
      {
        _id: 'ex-farmer-carry',
        type: 'exercise',
        name: 'Farmer Carry (meters)',
        components: [
          {
            _id: 'ex-farmer-carry',
            name: 'Farmer Carry (meters)',
            sets: [
              { weight: 32, reps: 30 },
              { weight: 32, reps: 30 },
              { weight: 28, reps: 40 },
            ],
          },
        ],
      },
    ],
    date: new Date('2026-04-11'),
  },
]

export const periodizations: IPeriodization[] = [
  {
    _id: 'periodization-wave-strength-12-weeks',
    name: 'Wave Strength 12 Weeks',
    description: 'Linear wave-based approach to increase strength in compound lifts.',
    stages: [
      {
        _id: 'stage-wave-accumulation-weeks-1-4',
        name: 'Accumulation (Weeks 1-4)',
        description: 'Volume block: 65-75% 1RM, 6-10 reps, with a strong focus on technique.',
      },
      {
        _id: 'stage-wave-intensification-weeks-5-8',
        name: 'Intensification (Weeks 5-8)',
        description: 'Strength block: 75-85% 1RM, 4-6 reps, with reduced overall volume.',
      },
      {
        _id: 'stage-wave-peak-weeks-9-11',
        name: 'Peak (Weeks 9-11)',
        description: 'Peak block: 85-92% 1RM, 2-4 reps, with recovery as a top priority.',
      },
    ],
  },
  {
    _id: 'periodization-hypertrophy-block-10-weeks',
    name: 'Hypertrophy Block 10 Weeks',
    description: 'Periodized hypertrophy cycle designed for muscle gain with planned progression.',
    stages: [
      {
        _id: 'stage-hypertrophy-base-volume-weeks-1-3',
        name: 'Base Volume (Weeks 1-3)',
        description: '8-12 reps, RPE 6-7, moderate loads, and tempo control practice.',
      },
      {
        _id: 'stage-hypertrophy-progressive-overload-weeks-4-6',
        name: 'Progressive Overload (Weeks 4-6)',
        description: 'Increase total tonnage via +1 set and/or +2.5-5% load each week.',
      },
      {
        _id: 'stage-hypertrophy-metabolic-stress-weeks-7-8',
        name: 'Metabolic Stress (Weeks 7-8)',
        description: '12-20 reps, short rest periods, plus drop sets and supersets at session end.',
      },
      {
        _id: 'stage-hypertrophy-recovery-pivot-week-9',
        name: 'Recovery Pivot (Week 9)',
        description: 'Reduce volume by 40-50% while maintaining technical intensity.',
      },
      {
        _id: 'stage-hypertrophy-rebound-week-10',
        name: 'Rebound Week (Week 10)',
        description: 'Return to week-6 working weights with lower perceived effort.',
      },
    ],
  },
  {
    _id: 'periodization-athletic-performance-8-weeks',
    name: 'Athletic Performance 8 Weeks',
    description: 'Mixed cycle for strength, power, and work capacity in field and court sports.',
    stages: [
      {
        _id: 'stage-athletic-movement-quality-weeks-1-2',
        name: 'Movement Quality (Weeks 1-2)',
        description: 'Mobility, trunk control, light strength patterns, and basic coordination.',
      },
      {
        _id: 'stage-athletic-strength-foundation-weeks-3-4',
        name: 'Strength Foundation (Weeks 3-4)',
        description: 'Strength base: squat/hinge/press at 70-80% 1RM, 4-6 reps, 3-5 sets.',
      },
      {
        _id: 'stage-athletic-power-conversion-weeks-5-6',
        name: 'Power Conversion (Weeks 5-6)',
        description:
          'Power conversion: jumps, explosive presses, and contrast strength-power pairs.',
      },
      {
        _id: 'stage-athletic-taper-week-8',
        name: 'Taper (Week 8)',
        description: 'Reduce fatigue before competition with short sessions and high freshness.',
      },
    ],
  },
]
