import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function toPascalCase(str: string) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

rl.question(
  `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    _____  _     _  ______  ______  _       ______   
   |  ___ \| |   | ||___  / |___  / | |     |  ____|  
   | |__) | |   | |   / /     / /  | |     | |      
   |  __ <| |   | |  / /     / /   | |     |  __|   
   | |__) | |___| | / /__   / /__  | |____ | |____  
   |______/ \_____/ /_____| /_____| |______||______| 

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ 아래 5가지를 자동으로 처리해드릴게요!
  1) 컴포넌트 생성 
     └ 디렉토리 + index.tsx 조합으로 생성됩니다.
  2) 컴포넌트 Export 
     └ components/index.ts에 barrel export 방식으로 추가됩니다.
  3) 디자인 문서 생성 및 템플릿 제공
     ├─ a. 제목 및 컴포넌트 설명 (필수)
     ├─ b. Props 스펙 설명 (Props가 있다면 필수)
     ├─ c. 실제 컴포넌트 (선택, 개발 공간)
     └─ d. 미리보기(Playground) (선택, StatelessPlayground / StatefulPlayground)
  4) 디자인 문서 라우트 등록
  5) 사이드바에 디자인 문서 링크 추가

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  컴포넌트명은 반드시 "대문자"로 시작해야 합니다.
⚠️  동일한 이름이 있으면 기존 작업이 덮어씌워집니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👉 문서화할 컴포넌트 이름을 입력해주세요. (예: Button): `,
  (input) => {
    const name = input.trim();
    if (!name) {
      console.error('❌ 컴포넌트 이름이 필요합니다.');
      rl.close();
      return;
    }

    const pascalName = toPascalCase(name);

    // ---- 컴포넌트 파일 생성
    const componentDir = path.resolve(__dirname, `../src/components/${pascalName}`);
    const componentPath = path.join(componentDir, 'index.tsx');

    // 동일명의 디렉토리가 이미 있으면 에러 안 나게 recursive: true 옵션
    fs.mkdirSync(componentDir, { recursive: true });

    const componentTemplate = `
    export default function ${pascalName}() {
      return <></>;
    }
    `;
    fs.writeFileSync(componentPath, componentTemplate.trim());
    console.log(`\n✅ ${pascalName} 컴포넌트 생성 완료!`);

    // ---- 컴포넌트 Export
    const exportPath = path.resolve(__dirname, '../src/components/index.ts');
    const exportStatement = `export { default as ${pascalName} } from './${pascalName}';`;

    let content = fs.readFileSync(exportPath, 'utf-8').trim();

    // 중복 추가 방지
    if (!content.includes(exportStatement)) {
      // 마지막에 줄바꿈 + export 구문 추가
      content += `\n${exportStatement}\n`;
      fs.writeFileSync(exportPath, content, 'utf-8');
      console.log(`✅ ${pascalName} 컴포넌트 export 완료!`);
    } else {
      console.log(`⚠️ components/index.ts에 ${pascalName} export가 이미 존재합니다.`);
    }

    // ---- 디자인 문서 생성
    const filePath = path.resolve(__dirname, `../src/pages/components/${pascalName}Doc.tsx`);
    const template = `
import ${pascalName} from '@components/${pascalName}';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';

export default function ${pascalName}Doc() {
  return (
    <div className='flex flex-col gap-20'>
      {/* 1️⃣ 제목 & 설명 */}
      <MarkdownViewer content={description} />

      {/* 2️⃣ Props 스펙 */}
      <PropsSpecTable specs={propsSpecs} />

      {/* 3️⃣ 실제 컴포넌트 */}
      <${pascalName} />

      {/* 4️⃣ 미리보기 (선택) : StatelessPlayground / StatefulPlayground */}
    </div>
  );
}

const description = \`
# ${pascalName}
${pascalName} 컴포넌트입니다.  
~~이곳에 자유롭게 설명을 작성합니다.~~
\`;

const propsSpecs = [
  {
    propName: 'name',
    type: ['string', 'number', 'boolean'],
    description: 'prop에 대한 설명을 적어주세요.',
    required: true,
    defaultValue: 'value',
    options: ['1', '2', '3'],
  },
];
`;
    fs.writeFileSync(filePath, template.trim());
    console.log(`✅ ${pascalName} 디자인 문서 생성 완료!`);

    // ---- 디자인 문서 라우터 등록
    const routesPath = path.resolve(__dirname, '../src/routes/index.tsx');
    let routesFile = fs.readFileSync(routesPath, 'utf-8');
    const newRoute = `          { path: '${pascalName}', element: <${pascalName}Doc /> },`;

    // 중복 방지
    if (!routesFile.includes(newRoute)) {
      routesFile = routesFile.replace(
        /(path:\s*'component',[\s\S]*?children:\s*\[)([\s\S]*?)(\])/,
        (match, start, body, end) => {
          // body 끝에 새 route 추가
          return `${start}${body.trimEnd()}\n${newRoute}\n        ${end}`;
        },
      );

      // import도 위쪽에 추가
      const importStatement = `import ${pascalName}Doc from '@pages/components/${pascalName}Doc';`;
      if (!routesFile.includes(importStatement)) {
        routesFile = routesFile.replace(
          /(import .*?;)(\s*import)/s, // 가장 위 import 블록 끝 직전에 삽입
          `$1\n${importStatement}$2`,
        );
      }

      fs.writeFileSync(routesPath, routesFile);
      console.log(`✅ ${pascalName} 디자인 문서의 라우트 추가 완료!`);
    } else {
      console.log(`⚠️ ${pascalName}Doc 라우트가 이미 존재합니다.`);
    }

    // ---- Sidebar에 추가
    const sidebarPath = path.resolve(__dirname, '../src/layouts/Sidebar.tsx');
    let sidebarFile = fs.readFileSync(sidebarPath, 'utf-8');

    const itemPath = `/docs/component/${pascalName}`;
    const newNavItemObj = `{ label: '${pascalName}', to: '${itemPath}' }`;

    // 이미 같은 링크가 있으면 추가 안 함
    if (sidebarFile.includes(`to: '${itemPath}'`)) {
      console.log(`⚠️ Sidebar.tsx에 '${pascalName}' Nav Item이 이미 존재합니다.`);
    } else {
      const marker = 'component: [';
      const start = sidebarFile.indexOf(marker);
      if (start === -1) {
        console.error('❌ Sidebar.tsx에서 component 배열을 찾지 못했습니다.');
      } else {
        // 여는 '['와 닫는 ']' 찾기 (현재 파일은 한 줄 배열 형태)
        const openIdx = sidebarFile.indexOf('[', start);
        const closeIdx = sidebarFile.indexOf(']', openIdx);
        if (openIdx === -1 || closeIdx === -1) {
          console.error('❌ component 배열의 구문을 파싱하지 못했습니다.');
        } else {
          let insertion = '';
          insertion = `  ${newNavItemObj},\n`;

          const before = sidebarFile.slice(0, closeIdx);
          const after = sidebarFile.slice(closeIdx);

          sidebarFile = before + insertion + after;

          fs.writeFileSync(sidebarPath, sidebarFile, 'utf-8');
          console.log(`✅ 사이드바에 '${pascalName}' 링크 추가 완료!`);
        }
      }
    }

    rl.close();
  },
);
