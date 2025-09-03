import Button from '@/components/TestButton';
import StatefulPlayground from '@/layouts/StatefulPlayground';

const code = `
function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("[log] count:", count);
  }, [count]);

  return (
    <button
      onClick={() => setCount(count + 1)}
    >
      Count: {count}
    </button>
  );
}

render(<Component />);
`;

const extraScopeCode = `
function Component() {
  // 실제 Button 컴포넌트에 대한 import는 extraScope로 처리
  return <Button>Click</Button>;
}

render(<Component />);
`;

export default function ColorDoc() {
  return (
    <div>
      <StatefulPlayground code={extraScopeCode} extraScope={{ Button }} />
    </div>
  );
}
