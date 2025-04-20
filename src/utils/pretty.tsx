import React from 'react';

const getLineNumber = (i: number) => {
  const n = (i + 1).toString();
  const label = ' '.repeat(3 - n.length);
  return <span style={{ color: '#888' }}>{`${label}${n}  `} </span>;
};

export function sanitize(text: string) {
  return text.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

export function PrettyJson({ data }: { data: string }) {
  const parsed = (() => {
    try {
      const json = JSON.parse(data);
      const parsed = JSON.stringify(json, null, 2).split('\n');
      return parsed;
    } catch {
      return null;
    }
  })();

  if (!parsed) {
    return <pre>{data}</pre>;
  }

  const prettifyLine = (line: string) => {
    const regex = /"([^"]+)": /g;
    const match = line.match(regex);
    if (match) {
      const index = line.indexOf(match[0]);
      const space = ' '.repeat(index);
      const rest = line.slice(index + match[0].length);
      let restElement: React.ReactNode = rest;
      if (rest.charCodeAt(0) >= 48 && rest.charCodeAt(0) <= 57) {
        restElement = <span style={{ color: 'var(--code-number)' }}>{rest}</span>;
      }
      if (rest[0] === '"' || rest[0] === 'n') {
        restElement = <span style={{ color: 'var(--code-string)' }}>{rest}</span>;
      }
      return (
        <>
          {space}
          <span style={{ color: 'var(--code-tag)' }}>{match[0]}</span>
          {restElement}
        </>
      );
    }
    return line;
  };

  return (
    <pre>
      {parsed.map((line, i) => (
        <div key={i}>
          {getLineNumber(i)}
          {prettifyLine(line)}
        </div>
      ))}
    </pre>
  );
}

export function PrettyHtml({ data }: { data: string }) {
  const lines = data.split('\n');
  const prettifyLine = (line: string): React.ReactNode => {
    const regex = /<([^>]+)>/g;
    const match = line.match(regex);
    if (match) {
      const index = line.indexOf(match[0]);
      const prev = line.slice(0, index);
      const rest = line.slice(index + match[0].length);
      const last = prettifyLine(rest);
      return (
        <>
          {prev}
          <span style={{ color: 'var(--code-tag)' }}>{match[0]}</span>
          {last}
        </>
      );
    }
    return line;
  };

  return (
    <pre>
      {lines.map((line, i) => (
        <div key={i}>
          {getLineNumber(i)}
          {prettifyLine(line)}
        </div>
      ))}
    </pre>
  );
}

export function prettify(data: string) {
  if (data.startsWith('{') || data.startsWith('[')) {
    return { format: 'JSON', result: <PrettyJson data={data} /> };
  }
  if (data.startsWith('<')) {
    return { format: 'XML', result: <PrettyHtml data={data} /> };
  }
  return { format: 'plain', result: <pre>{data}</pre> };
}

export function PrettyJsonString(data: string) {
  const parsed = (() => {
    try {
      const json = JSON.parse(data);
      const parsed = JSON.stringify(json, null, 2).split('\n');
      return parsed;
    } catch {
      return null;
    }
  })();

  if (!parsed) {
    return { format: 'plain', result: sanitize(data).split('\n') };
  }

  const prettifyLine = (line: string) => {
    const regex = /"([^"]+)": /g;
    const match = line.match(regex);
    if (match) {
      const index = line.indexOf(match[0]);
      const space = ' '.repeat(index);
      const rest = line.slice(index + match[0].length);
      let restElement: React.ReactNode = rest;
      if (rest.charCodeAt(0) >= 48 && rest.charCodeAt(0) <= 57) {
        restElement = `<span style="color: var(--code-number);">${sanitize(rest)}</span>`;
      }
      if (rest[0] === '"' || rest[0] === 'n') {
        restElement = `<span style="color: var(--code-string);">${sanitize(rest)}</span>`;
      }
      return `${space}<span style="color: var(--code-tag);">${sanitize(match[0])}</span>${restElement}`;
    }
    return sanitize(line);
  };

  return { format: 'JSON', result: parsed.map(line => prettifyLine(line)) };
}

export function prettyHtmlString(data: string) {
  const lines = data.split('\n');
  const replaceValues = (str: string): string => {
    const regex = /"([^"]+)"/g;
    const match = str.match(regex);
    if (match) {
      const index = str.indexOf(match[0]);
      const prev = str.slice(0, index);
      const rest = str.slice(index + match[0].length);
      const last = replaceValues(rest);
      return `${prev}<span style="color: var(--code-string);">${sanitize(match[0])}</span>${last}`;
    }
    return str;
  };

  const prettifyLine = (line: string): string => {
    const regex = /<([^>]+)>/g;
    const match = line.match(regex);
    if (match) {
      const index = line.indexOf(match[0]);
      const prev = line.slice(0, index);
      const rest = line.slice(index + match[0].length);
      const last = prettifyLine(rest);
      return `${prev}<span style="color: var(--code-tag);">${replaceValues(sanitize(match[0]))}</span>${last}`;
    }
    return line;
  };

  let indent = 0;
  return lines.map(line => {
    const l = line.trim();
    if (l.startsWith('</')) {
      indent = Math.max(0, indent - 2);
    } else if (l.startsWith('<') && l.indexOf('</') === -1 && l.indexOf('/>') === -1) {
      indent += 2;
      return `${' '.repeat(indent - 2)}${prettifyLine(l)}`;
    }
    return `${' '.repeat(indent)}${prettifyLine(l)}`;
  });
}

export function prettifyString(data: string): { format: string; result: string[] } {
  if (data.trimStart().startsWith('{') || data.trimStart().startsWith('[')) {
    return PrettyJsonString(data);
  }
  if (data.trimStart().startsWith('<')) {
    return { format: 'XML', result: prettyHtmlString(data) };
  }
  return { format: 'plain', result: data.split('\n') };
}
