import { extendTailwindMerge } from 'tailwind-merge';

/** index.css에서 사용자 정의한 유틸리티 클래스의 twMerge를 위해 합성 방식 설정 */
export const twm = extendTailwindMerge<string>({
  extend: {
    classGroups: {
      'ds-typography': [
        'ds-typ-heading-1',
        'ds-typ-heading-2',
        'ds-typ-heading-3',
        'ds-typ-title-1',
        'ds-typ-title-2',
        'ds-typ-body-1',
        'ds-typ-body-2',
        'ds-typ-body-3',
      ],
      'ds-text-color': ['ds-text-strong', 'ds-text-normal', 'ds-text-caption'],
      'ds-theme-bg': ['ds-theme-bg-base', 'ds-theme-bg-muted', 'ds-theme-bg-strong', 'ds-theme-bg-backdrop'],
      'ds-theme-border': ['ds-theme-border-base', 'ds-theme-border-focus'],
    },
    // 커스텀 그룹 간 충돌 관계 정의
    conflictingClassGroups: {
      // ds-typography 그룹은 font-size, font-weight, leading과 충돌
      'ds-typography': ['font-size', 'font-weight', 'leading'],
      'font-size': ['ds-typography'],
      'font-weight': ['ds-typography'],
      leading: ['ds-typography'],

      // ds-text-color 그룹은 text-color와 충돌
      'ds-text-color': ['text-color'],
      'text-color': ['ds-text-color'],

      // ds-theme-bg 그룹은 background-color와 충돌
      'ds-theme-bg': ['bg'],
      bg: ['ds-theme-bg'],

      // ds-theme-border 그룹은 border-color와 충돌
      'ds-theme-border': ['border-color'],
      'border-color': ['ds-theme-border'],
    },
  },
});
