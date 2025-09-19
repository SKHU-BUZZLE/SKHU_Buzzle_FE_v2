import Button from '@components/Button';
import TimeProgressBar from '@components/TimeProgressBar';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';
import StatefulPlayground from '@layouts/StatefulPlayground';
import { useState } from 'react';

export default function TimeProgressBarDoc() {
  // 3️⃣ 인터랙티브 예시용 상태
  const [paused3, setPaused3] = useState(false);
  const [keySeed3, setKeySeed3] = useState(0);

  // 예시별 종료 상태 결과
  const [ended1, setEnded1] = useState(false);
  const [ended2, setEnded2] = useState(false);
  const [ended3, setEnded3] = useState(false);

  return (
    <div className='flex flex-col gap-20'>
      {/* 1️⃣ 제목 & 설명 */}
      <MarkdownViewer content={description} />

      {/* 2️⃣ Props 스펙 */}
      <PropsSpecTable specs={propsSpecs} />

      {/* 3️⃣ 실제 컴포넌트 */}
      <div className='flex flex-col gap-12'>
        {/* 예시1 */}
        <p className='text-sm text-gray-500'>예시1 · 기본 10초 진행바 (자동 시작)</p>
        <TimeProgressBar
          key='example-1'
          onStateChange={({ ended }) => setEnded1(ended)}
          duration={10}
          // alert 제거, 종료 상태를 화면에 반영
          onTimerEnd={() => setEnded1(true)}
        />
        <p className='text-xs text-gray-600'>
          예시1 결과: <strong>{ended1 ? '종료됨' : '진행 중'}</strong>
        </p>

        {/* 예시2 */}
        <p className='text-sm text-gray-500'>예시2 · 일시정지 상태</p>
        <TimeProgressBar key='example-2' isPaused duration={10} onStateChange={({ ended }) => setEnded2(ended)} />
        <p className='text-xs text-gray-600'>
          예시2 결과: <strong>종료={ended2 ? 'true' : 'false'}</strong> / <strong>일시정지=true</strong>
        </p>

        {/* 예시3: 일시정지/재개 + key 리셋 */}
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-500'>예시3 · 인터랙티브 (일시정지/재개 + key 리셋)</p>
            <code className='text-xs text-gray-400'>key: example-3-{keySeed3}</code>
          </div>

          <TimeProgressBar
            key={`example-3-${keySeed3}`} // key 변경 → 리마운트(초기화)
            duration={10}
            isPaused={paused3} // 버튼으로 일시정지/재개
            onStateChange={({ ended }) => setEnded3(ended)}
            onTimerEnd={() => setEnded3(true)}
          />
          <p className='text-xs text-gray-600'>
            예시3 결과: <strong>{ended3 ? '종료됨' : paused3 ? '일시정지' : '진행 중'}</strong>
          </p>

          <div className='flex gap-3'>
            <button
              className='bg-black-600 rounded-xl px-3 py-2 text-white hover:opacity-90'
              type='button'
              onClick={() => setPaused3((p) => !p)}
            >
              {paused3 ? '재개' : '일시정지'}
            </button>

            <button
              className='bg-white-200 text-black-600 rounded-xl px-3 py-2 hover:opacity-90'
              title='key를 바꾸면 컴포넌트가 리마운트되어 타이머가 초기화됩니다.'
              type='button'
              onClick={() => {
                // ✅ 새 타이머는 실행 상태로 시작하도록 pause 해제
                setPaused3(false);
                // ✅ 결과도 초기화
                setEnded3(false);
                // ✅ key 변경으로 리마운트 → 타이머 초기화
                setKeySeed3((k) => k + 1);
              }}
            >
              key 변경(리셋)
            </button>
          </div>
        </div>
      </div>

      {/* 4️⃣ 미리보기 (선택) : StatelessPlayground / StatefulPlayground */}
      <StatefulPlayground code={code} extraScope={{ TimeProgressBar, Button }} />
    </div>
  );
}

const description = `
# TimeProgressBar
**막대(progress bar)** 형태로 남은 시간을 시각화하는 카운트다운 컴포넌트입니다.  
\`requestAnimationFrame\` 기반으로 동작해 \`setInterval\`의 드리프트(시간 밀림)를 최소화합니다. 

## 동작 요약
- 내부적으로 \`duration(초)\`을 ms로 환산해 기준 시각과 누적 일시정지 시간을 보정하며 진행률을 계산합니다.
- 진행률은 막대의 \`width\`로만 반영됩니다(동적 값이므로 **inline style** 사용).
- 시간이 0이 되면 \`onTimerEnd\`가 **단 한 번** 호출되고, \`onStateChange({ ended: true })\`도 함께 통지됩니다(구현되어 있다면).

---

## Props 핵심
- **\`duration: number\`**  
  총 시간(초). 0 미만이면 0으로 보정합니다.  
  - \`duration\`이 **변경되면 자동으로 초기화**됩니다.
  - 모든 문제에서 \`duration\`이 **동일**(예: 10초 고정)한 경우, 문제 전환 시 **\`key\`를 변경**해 리마운트를 유도하여 초기화하세요.

- **\`isPaused?: boolean\`** (기본값: \`false\`)  
  \`true\`면 카운트다운을 **일시정지**하고, \`false\`면 **재개**합니다.  
  - **중요:** \`key\`로 새 타이머를 만들 때, **\`isPaused\`를 반드시 \`false\`로 내려** 새 타이머가 즉시 시작되도록 하세요.  
    (예: \`setPaused(false); setKeySeed(k => k+1);\`)

- **\`onTimerEnd?: () => void\`**  
  남은 시간이 0이 되는 순간 **1회 호출**됩니다. 언마운트로 인한 취소 시에는 호출되지 않습니다.

- **\`onStateChange?: (state: { ended: boolean }) => void\`**  
  타이머의 종료 여부를 외부로 통지합니다. \`{ ended: true }\`는 종료 시 **한 번**만 전달됩니다.  
  진행률을 상위로 매 프레임 올리는 용도로 사용하지 마세요(비권장).

---  
`;

const propsSpecs = [
  {
    propName: 'duration',
    type: ['number'],
    description: '총 카운트다운 시간(초). 예: 10 → 10초',
    required: true,
    defaultValue: '-',
    options: [],
  },
  {
    propName: 'isPaused',
    type: ['boolean'],
    description: 'true일 경우 타이머를 일시정지합니다.',
    required: false,
    defaultValue: 'false',
    options: [],
  },
  {
    propName: 'onTimerEnd',
    type: ['() => void'],
    description: '타이머가 0초에 도달했을 때 단 한 번 호출되는 콜백',
    required: false,
    defaultValue: '-',
    options: [],
  },
  {
    propName: 'onStateChange',
    type: ['(state: { ended: boolean }) => void'],
    description: '`ended` 상태 변화를 외부로 통지합니다. 타이머 종료 시 `{ ended: true }`로 한 번 호출됩니다.',
    required: false,
    defaultValue: '-',
  },
];

const code = `
function TimeProgressBarDemo() {
  const [paused, setPaused] = React.useState(false);
  const [keySeed, setKeySeed] = React.useState(0);
  const [ended, setEnded] = React.useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span>StatefulPlayground · 일시정지/재개 + key 리셋</span>
        <code>key: demo-\${keySeed}</code>
      </div>

      {/* 여기서 duration을 바꿔서 테스트 해볼 수 있습니다! */}
      <TimeProgressBar
        key={\`demo-\${keySeed}\`}
        duration={10}
        isPaused={paused}
        onStateChange={({ ended }) => setEnded(ended)}
      />

      <p>결과: <strong>{ended ? '종료됨' : paused ? '일시정지' : '진행 중'}</strong></p>

      <div className="flex gap-10">
        <Button
          variant="secondary"
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? '재개' : '일시정지'}
        </Button>

        <Button
          onClick={() => {
            setPaused(false);
            setEnded(false);
            setKeySeed((k) => k + 1);
          }}
        >
          key 변경(리셋)
        </Button>
      </div>
    </div>
  );
}
render(<TimeProgressBarDemo/>);
`;
